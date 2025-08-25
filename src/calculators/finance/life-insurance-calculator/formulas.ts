import { Formula, CalculationResult } from '../../../types/calculator';
import { LifeInsuranceCalculatorInputs, LifeInsuranceCalculatorResults } from './types';

/**
 * Advanced life insurance calculation formulas
 */
export class LifeInsuranceFormulas {
  
  /**
   * Calculate base premium rate based on age, gender, and health
   */
  static calculateBaseRate(
    age: number,
    gender: 'male' | 'female',
    healthStatus: 'excellent' | 'very-good' | 'good' | 'fair' | 'poor',
    smokingStatus: 'non-smoker' | 'smoker' | 'former-smoker'
  ): number {
    // Base rates per $1000 of coverage (simplified)
    let baseRate = 0;
    
    // Age-based rates
    if (age < 30) baseRate = 0.5;
    else if (age < 40) baseRate = 0.8;
    else if (age < 50) baseRate = 1.5;
    else if (age < 60) baseRate = 3.0;
    else if (age < 70) baseRate = 6.0;
    else baseRate = 12.0;
    
    // Gender adjustment
    if (gender === 'female') baseRate *= 0.8;
    
    // Health status multiplier
    const healthMultipliers = {
      'excellent': 0.7,
      'very-good': 0.85,
      'good': 1.0,
      'fair': 1.5,
      'poor': 2.5
    };
    baseRate *= healthMultipliers[healthStatus];
    
    // Smoking status multiplier
    const smokingMultipliers = {
      'non-smoker': 1.0,
      'former-smoker': 1.3,
      'smoker': 2.5
    };
    baseRate *= smokingMultipliers[smokingStatus];
    
    return baseRate;
  }

  /**
   * Calculate term life insurance premium
   */
  static calculateTermPremium(
    coverageAmount: number,
    baseRate: number,
    policyTerm: number,
    paymentFrequency: number
  ): { monthlyPremium: number; annualPremium: number; totalPremiums: number } {
    const annualPremium = (coverageAmount / 1000) * baseRate;
    const monthlyPremium = annualPremium / 12;
    const totalPremiums = annualPremium * policyTerm;
    
    return { monthlyPremium, annualPremium, totalPremiums };
  }

  /**
   * Calculate whole life insurance premium
   */
  static calculateWholeLifePremium(
    coverageAmount: number,
    baseRate: number,
    age: number,
    paymentFrequency: number
  ): { monthlyPremium: number; annualPremium: number; totalPremiums: number } {
    // Whole life premiums are higher but guaranteed
    const termRate = baseRate;
    const wholeLifeRate = termRate * 8; // Whole life is typically 6-10x more expensive
    
    const annualPremium = (coverageAmount / 1000) * wholeLifeRate;
    const monthlyPremium = annualPremium / 12;
    const totalPremiums = annualPremium * (100 - age); // Pay until age 100
    
    return { monthlyPremium, annualPremium, totalPremiums };
  }

  /**
   * Calculate universal life insurance premium
   */
  static calculateUniversalLifePremium(
    coverageAmount: number,
    baseRate: number,
    age: number,
    cashValueGrowth: number,
    paymentFrequency: number
  ): { monthlyPremium: number; annualPremium: number; totalPremiums: number } {
    // Universal life has flexible premiums
    const termRate = baseRate;
    const universalRate = termRate * 4; // Universal life is typically 3-5x more expensive than term
    
    const annualPremium = (coverageAmount / 1000) * universalRate;
    const monthlyPremium = annualPremium / 12;
    const totalPremiums = annualPremium * (100 - age);
    
    return { monthlyPremium, annualPremium, totalPremiums };
  }

  /**
   * Calculate cash value for permanent policies
   */
  static calculateCashValue(
    annualPremium: number,
    years: number,
    growthRate: number,
    surrenderCharges: number[]
  ): { cashValue: number; surrenderValue: number; netCashValue: number } {
    let cashValue = 0;
    
    for (let year = 1; year <= years; year++) {
      const premiumPortion = annualPremium * 0.3; // 30% goes to cash value
      cashValue += premiumPortion;
      cashValue *= (1 + growthRate / 100);
    }
    
    // Apply surrender charges
    const surrenderCharge = years <= surrenderCharges.length ? 
      surrenderCharges[years - 1] : 0;
    const surrenderValue = cashValue * (1 - surrenderCharge / 100);
    const netCashValue = surrenderValue;
    
    return { cashValue, surrenderValue, netCashValue };
  }

  /**
   * Calculate needs analysis
   */
  static calculateNeedsAnalysis(
    annualIncome: number,
    outstandingDebts: number,
    funeralExpenses: number,
    childrenEducationCosts: number,
    mortgageBalance: number,
    currentSavings: number
  ): {
    incomeReplacement: number;
    debtPayoff: number;
    educationFunding: number;
    emergencyFund: number;
    totalNeeds: number;
    coverageGap: number;
  } {
    // Income replacement (10x annual income)
    const incomeReplacement = annualIncome * 10;
    
    // Debt payoff
    const debtPayoff = outstandingDebts;
    
    // Education funding
    const educationFunding = childrenEducationCosts;
    
    // Emergency fund (6 months of income)
    const emergencyFund = annualIncome * 0.5;
    
    // Total needs
    const totalNeeds = incomeReplacement + debtPayoff + educationFunding + 
                      funeralExpenses + emergencyFund;
    
    // Coverage gap
    const coverageGap = Math.max(0, totalNeeds - currentSavings);
    
    return {
      incomeReplacement,
      debtPayoff,
      educationFunding,
      emergencyFund,
      totalNeeds,
      coverageGap
    };
  }

  /**
   * Calculate rider costs
   */
  static calculateRiderCosts(
    basePremium: number,
    accidentalDeathBenefit: boolean,
    disabilityWaiver: boolean,
    criticalIllnessRider: boolean,
    longTermCareRider: boolean
  ): {
    accidentalDeathCost: number;
    disabilityWaiverCost: number;
    criticalIllnessCost: number;
    longTermCareCost: number;
    totalRiderCost: number;
  } {
    let totalRiderCost = 0;
    
    const accidentalDeathCost = accidentalDeathBenefit ? basePremium * 0.1 : 0;
    const disabilityWaiverCost = disabilityWaiver ? basePremium * 0.05 : 0;
    const criticalIllnessCost = criticalIllnessRider ? basePremium * 0.15 : 0;
    const longTermCareCost = longTermCareRider ? basePremium * 0.2 : 0;
    
    totalRiderCost = accidentalDeathCost + disabilityWaiverCost + 
                     criticalIllnessCost + longTermCareCost;
    
    return {
      accidentalDeathCost,
      disabilityWaiverCost,
      criticalIllnessCost,
      longTermCareCost,
      totalRiderCost
    };
  }

  /**
   * Calculate probability of death
   */
  static calculateDeathProbability(
    age: number,
    gender: 'male' | 'female',
    healthStatus: 'excellent' | 'very-good' | 'good' | 'fair' | 'poor'
  ): number {
    // Simplified mortality rates (per 1000 people)
    let baseRate = 0;
    
    if (age < 30) baseRate = 1;
    else if (age < 40) baseRate = 2;
    else if (age < 50) baseRate = 5;
    else if (age < 60) baseRate = 15;
    else if (age < 70) baseRate = 40;
    else if (age < 80) baseRate = 100;
    else baseRate = 250;
    
    // Gender adjustment
    if (gender === 'female') baseRate *= 0.7;
    
    // Health status adjustment
    const healthMultipliers = {
      'excellent': 0.5,
      'very-good': 0.7,
      'good': 1.0,
      'fair': 1.5,
      'poor': 3.0
    };
    baseRate *= healthMultipliers[healthStatus];
    
    return baseRate / 1000; // Convert to decimal
  }

  /**
   * Calculate inflation-adjusted values
   */
  static calculateInflationAdjusted(
    value: number,
    inflationRate: number,
    years: number
  ): { inflationAdjustedValue: number; purchasingPower: number; realValue: number } {
    const inflationAdjustedValue = value * Math.pow(1 + inflationRate / 100, years);
    const purchasingPower = value / inflationAdjustedValue;
    const realValue = value / Math.pow(1 + inflationRate / 100, years);
    
    return { inflationAdjustedValue, purchasingPower, realValue };
  }

  /**
   * Calculate tax implications
   */
  static calculateTaxImplications(
    premium: number,
    deathBenefit: number,
    cashValue: number,
    taxRate: number
  ): {
    premiumTaxDeductibility: number;
    deathBenefitTaxFree: boolean;
    cashValueTaxDeferred: boolean;
    surrenderTaxLiability: number;
  } {
    // Premiums are generally not tax deductible for personal life insurance
    const premiumTaxDeductibility = 0;
    
    // Death benefits are generally tax-free
    const deathBenefitTaxFree = true;
    
    // Cash value grows tax-deferred
    const cashValueTaxDeferred = true;
    
    // Surrender tax liability (only on gains)
    const surrenderTaxLiability = Math.max(0, cashValue - premium) * (taxRate / 100);
    
    return {
      premiumTaxDeductibility,
      deathBenefitTaxFree,
      cashValueTaxDeferred,
      surrenderTaxLiability
    };
  }

  /**
   * Calculate comparison with other insurance types
   */
  static calculateComparison(
    currentPremium: number,
    currentType: string,
    coverageAmount: number,
    age: number,
    baseRate: number
  ): {
    vsTermInsurance: number;
    vsWholeInsurance: number;
    vsUniversalInsurance: number;
    vsSelfInsurance: number;
    vsInvestment: number;
  } {
    // Calculate premiums for other types
    const termPremium = (coverageAmount / 1000) * baseRate;
    const wholePremium = termPremium * 8;
    const universalPremium = termPremium * 4;
    
    // Self-insurance (saving the premium)
    const vsSelfInsurance = currentPremium * 20; // 20 years of premiums
    
    // Investment comparison (assuming 7% return)
    const vsInvestment = currentPremium * Math.pow(1.07, 20);
    
    return {
      vsTermInsurance: currentPremium - termPremium,
      vsWholeInsurance: currentPremium - wholePremium,
      vsUniversalInsurance: currentPremium - universalPremium,
      vsSelfInsurance,
      vsInvestment
    };
  }

  /**
   * Run Monte Carlo simulation for life insurance
   */
  static runMonteCarloSimulation(
    inputs: LifeInsuranceCalculatorInputs,
    samples: number = 10000
  ): {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  } {
    const results: number[] = [];
    
    for (let i = 0; i < samples; i++) {
      // Generate random mortality scenario
      const deathProbability = this.calculateDeathProbability(
        inputs.age,
        inputs.gender,
        inputs.healthStatus
      );
      
      // Simulate death timing
      const randomDeath = Math.random();
      let deathYear = 0;
      
      for (let year = 1; year <= 50; year++) {
        const cumulativeProbability = 1 - Math.pow(1 - deathProbability, year);
        if (randomDeath <= cumulativeProbability) {
          deathYear = year;
          break;
        }
      }
      
      // Calculate net benefit
      let netBenefit = 0;
      if (deathYear > 0 && deathYear <= inputs.policyTerm) {
        const totalPremiums = (inputs.coverageAmount / 1000) * 
          this.calculateBaseRate(inputs.age, inputs.gender, inputs.healthStatus, inputs.smokingStatus) * deathYear;
        netBenefit = inputs.coverageAmount - totalPremiums;
      }
      
      results.push(netBenefit);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const getPercentile = (p: number) => {
      const index = Math.floor(p * samples);
      return results[Math.min(index, samples - 1)];
    };
    
    const expectedValue = results.reduce((sum, val) => sum + val, 0) / samples;
    const variance = results.reduce((sum, val) => sum + Math.pow(val - expectedValue, 2), 0) / samples;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      percentile10: getPercentile(0.10),
      percentile25: getPercentile(0.25),
      percentile50: getPercentile(0.50),
      percentile75: getPercentile(0.75),
      percentile90: getPercentile(0.90),
      expectedValue,
      standardDeviation
    };
  }
}

/**
 * Main life insurance calculator formula
 */
export const lifeInsuranceCalculatorFormula: Formula = {
  id: 'life-insurance-calculator',
  name: 'Life Insurance Calculator',
  description: 'Comprehensive life insurance calculations including term, whole, universal, and variable life insurance with needs analysis',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const liInputs = inputs as LifeInsuranceCalculatorInputs;
    
    try {
      const {
        age,
        gender,
        healthStatus,
        smokingStatus,
        insuranceType,
        coverageAmount,
        policyTerm,
        premiumPaymentFrequency,
        annualIncome,
        currentSavings,
        outstandingDebts,
        funeralExpenses,
        childrenEducationCosts,
        mortgageBalance,
        includeRiders,
        accidentalDeathBenefit,
        disabilityWaiver,
        criticalIllnessRider,
        longTermCareRider,
        includeInflation,
        inflationRate,
        includeTaxes,
        taxRate,
        expectedReturn,
        volatility,
        cashValueGrowth,
        monteCarloSamples
      } = liInputs;

      // Calculate base rate
      const baseRate = LifeInsuranceFormulas.calculateBaseRate(
        age, gender, healthStatus, smokingStatus
      );
      
      // Calculate premiums based on insurance type
      let premiumCalculation;
      if (insuranceType === 'term') {
        premiumCalculation = LifeInsuranceFormulas.calculateTermPremium(
          coverageAmount, baseRate, policyTerm, 12
        );
      } else if (insuranceType === 'whole') {
        premiumCalculation = LifeInsuranceFormulas.calculateWholeLifePremium(
          coverageAmount, baseRate, age, 12
        );
      } else if (insuranceType === 'universal') {
        premiumCalculation = LifeInsuranceFormulas.calculateUniversalLifePremium(
          coverageAmount, baseRate, age, cashValueGrowth || 4, 12
        );
      } else {
        // Default to term
        premiumCalculation = LifeInsuranceFormulas.calculateTermPremium(
          coverageAmount, baseRate, policyTerm, 12
        );
      }
      
      // Calculate cash value for permanent policies
      let cashValueAnalysis = null;
      if (insuranceType !== 'term') {
        const surrenderCharges = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]; // Declining surrender charges
        cashValueAnalysis = {
          year1Value: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 1, cashValueGrowth || 4, surrenderCharges).cashValue,
          year5Value: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 5, cashValueGrowth || 4, surrenderCharges).cashValue,
          year10Value: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 10, cashValueGrowth || 4, surrenderCharges).cashValue,
          year20Value: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 20, cashValueGrowth || 4, surrenderCharges).cashValue,
          year30Value: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 30, cashValueGrowth || 4, surrenderCharges).cashValue,
          projectedCashValue: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 20, cashValueGrowth || 4, surrenderCharges).cashValue,
          surrenderCharges: surrenderCharges[0],
          netCashValue: LifeInsuranceFormulas.calculateCashValue(premiumCalculation.annualPremium, 20, cashValueGrowth || 4, surrenderCharges).netCashValue
        };
      }
      
      // Calculate needs analysis
      const needsAnalysis = LifeInsuranceFormulas.calculateNeedsAnalysis(
        annualIncome,
        outstandingDebts,
        funeralExpenses,
        childrenEducationCosts,
        mortgageBalance,
        currentSavings
      );
      
      // Calculate rider costs
      let riderAnalysis = null;
      if (includeRiders) {
        riderAnalysis = LifeInsuranceFormulas.calculateRiderCosts(
          premiumCalculation.annualPremium,
          accidentalDeathBenefit,
          disabilityWaiver,
          criticalIllnessRider,
          longTermCareRider
        );
      }
      
      // Calculate death probability
      const deathProbability = LifeInsuranceFormulas.calculateDeathProbability(
        age, gender, healthStatus
      );
      
      // Calculate inflation adjustments
      let inflationAnalysis = null;
      if (includeInflation) {
        const yearsToInflation = 20;
        inflationAnalysis = LifeInsuranceFormulas.calculateInflationAdjusted(
          coverageAmount, inflationRate, yearsToInflation
        );
      }
      
      // Calculate tax implications
      let taxAnalysis = null;
      if (includeTaxes) {
        taxAnalysis = LifeInsuranceFormulas.calculateTaxImplications(
          premiumCalculation.annualPremium,
          coverageAmount,
          cashValueAnalysis?.projectedCashValue || 0,
          taxRate
        );
      }
      
      // Calculate comparison
      const comparison = LifeInsuranceFormulas.calculateComparison(
        premiumCalculation.annualPremium,
        insuranceType,
        coverageAmount,
        age,
        baseRate
      );
      
      // Run Monte Carlo simulation
      const monteCarloResults = LifeInsuranceFormulas.runMonteCarloSimulation(
        liInputs, monteCarloSamples || 10000
      );
      
      // Generate recommendations
      const recommendations = [];
      if (needsAnalysis.coverageGap > 0) {
        recommendations.push(`Consider increasing coverage by $${needsAnalysis.coverageGap.toLocaleString()}`);
      }
      if (insuranceType === 'term' && age > 50) {
        recommendations.push('Consider permanent insurance for estate planning');
      }
      if (includeRiders && riderAnalysis && riderAnalysis.totalRiderCost > premiumCalculation.annualPremium * 0.3) {
        recommendations.push('Review rider costs - they may be too expensive');
      }
      
      const results: LifeInsuranceCalculatorResults = {
        basicCalculation: {
          monthlyPremium: premiumCalculation.monthlyPremium,
          annualPremium: premiumCalculation.annualPremium,
          totalPremiums: premiumCalculation.totalPremiums,
          deathBenefit: coverageAmount,
          netDeathBenefit: coverageAmount - premiumCalculation.totalPremiums,
          costPerThousand: (premiumCalculation.annualPremium / (coverageAmount / 1000))
        },
        policyAnalysis: {
          policyType: insuranceType,
          coveragePeriod: insuranceType === 'term' ? policyTerm : 100 - age,
          premiumGuarantee: insuranceType !== 'term',
          cashValueProjection: cashValueAnalysis?.projectedCashValue || 0,
          surrenderValue: cashValueAnalysis?.netCashValue || 0,
          loanValue: (cashValueAnalysis?.projectedCashValue || 0) * 0.9
        },
        costAnalysis: {
          totalCost: premiumCalculation.totalPremiums,
          averageAnnualCost: premiumCalculation.annualPremium,
          costPerYear: premiumCalculation.annualPremium,
          costPerMonth: premiumCalculation.monthlyPremium,
          costPerDay: premiumCalculation.monthlyPremium / 30,
          breakevenPeriod: insuranceType === 'term' ? policyTerm : 20
        },
        cashValueAnalysis,
        deathBenefitAnalysis: {
          immediateDeathBenefit: coverageAmount,
          deathBenefitAt65: coverageAmount,
          deathBenefitAt75: coverageAmount,
          deathBenefitAt85: coverageAmount,
          inflationAdjustedBenefit: inflationAnalysis?.inflationAdjustedValue || coverageAmount,
          realValue: inflationAnalysis?.realValue || coverageAmount
        },
        needsAnalysis: {
          ...needsAnalysis,
          emergencyFund: needsAnalysis.emergencyFund
        },
        taxAnalysis,
        inflationAnalysis,
        riskAnalysis: {
          probabilityOfDeath: deathProbability * 100,
          expectedValue: coverageAmount * deathProbability,
          riskPremium: premiumCalculation.annualPremium - (coverageAmount * deathProbability),
          insuranceEfficiency: (coverageAmount / premiumCalculation.annualPremium),
          coverageAdequacy: Math.min(100, (coverageAmount / needsAnalysis.totalNeeds) * 100)
        },
        comparison,
        riderAnalysis,
        summary: {
          recommendedCoverage: needsAnalysis.totalNeeds,
          recommendedPolicyType: age < 40 ? 'term' : 'whole',
          monthlyCost: premiumCalculation.monthlyPremium,
          annualCost: premiumCalculation.annualPremium,
          totalLifetimeCost: premiumCalculation.totalPremiums,
          keyRecommendations: recommendations
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Based on your profile (age ${age}, ${gender}, ${healthStatus} health), a ${insuranceType} life insurance policy with $${coverageAmount.toLocaleString()} coverage would cost $${premiumCalculation.monthlyPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} per month. Your insurance needs analysis suggests $${needsAnalysis.totalNeeds.toLocaleString()} in coverage.`,
        intermediateSteps: {
          'Age': `${age} years`,
          'Gender': gender,
          'Health Status': healthStatus,
          'Insurance Type': insuranceType,
          'Coverage Amount': `$${coverageAmount.toLocaleString()}`,
          'Monthly Premium': `$${premiumCalculation.monthlyPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          'Annual Premium': `$${premiumCalculation.annualPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
        }
      };
    } catch (error) {
      throw new Error(`Life insurance calculation failed: ${error}`);
    }
  }
};
