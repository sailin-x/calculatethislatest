import { Formula, CalculationResult } from '../../../types/calculator';
import { SocialSecurityCalculatorInputs, SocialSecurityCalculatorResults } from './types';

/**
 * Advanced Social Security calculation formulas
 */
export class SocialSecurityFormulas {
  
  /**
   * Calculate full retirement age based on birth year
   */
  static calculateFullRetirementAge(birthYear: number): number {
    if (birthYear <= 1937) return 65;
    if (birthYear <= 1954) return 66;
    if (birthYear <= 1959) return 66 + (birthYear - 1954) * 2/12;
    return 67;
  }

  /**
   * Calculate bend points for PIA calculation
   */
  static getBendPoints(year: number): { first: number; second: number } {
    // Simplified bend points (actual values change annually)
    const baseYear = 2023;
    const firstBendPoint = 1115;
    const secondBendPoint = 6721;
    
    // Adjust for inflation (simplified)
    const inflationFactor = Math.pow(1.025, year - baseYear);
    
    return {
      first: firstBendPoint * inflationFactor,
      second: secondBendPoint * inflationFactor
    };
  }

  /**
   * Calculate Primary Insurance Amount (PIA)
   */
  static calculatePIA(averageIndexedMonthlyEarnings: number, year: number): number {
    const bendPoints = this.getBendPoints(year);
    
    let pia = 0;
    
    // First bend point (90% of first $1,115 in 2023)
    const firstBendAmount = Math.min(averageIndexedMonthlyEarnings, bendPoints.first);
    pia += firstBendAmount * 0.90;
    
    // Second bend point (32% of earnings between $1,115 and $6,721 in 2023)
    if (averageIndexedMonthlyEarnings > bendPoints.first) {
      const secondBendAmount = Math.min(
        averageIndexedMonthlyEarnings - bendPoints.first,
        bendPoints.second - bendPoints.first
      );
      pia += secondBendAmount * 0.32;
    }
    
    // Third bend point (15% of earnings above $6,721 in 2023)
    if (averageIndexedMonthlyEarnings > bendPoints.second) {
      const thirdBendAmount = averageIndexedMonthlyEarnings - bendPoints.second;
      pia += thirdBendAmount * 0.15;
    }
    
    return Math.round(pia * 100) / 100; // Round to nearest cent
  }

  /**
   * Calculate benefit at specific retirement age
   */
  static calculateBenefitAtAge(
    pia: number,
    fullRetirementAge: number,
    retirementAge: number
  ): { benefit: number; reductionFactor: number; increaseFactor: number } {
    let benefit = pia;
    let reductionFactor = 1.0;
    let increaseFactor = 1.0;
    
    if (retirementAge < fullRetirementAge) {
      // Early retirement reduction
      const monthsEarly = (fullRetirementAge - retirementAge) * 12;
      const reductionPerMonth = 5/9; // 5/9 of 1% for first 36 months
      const additionalReductionPerMonth = 5/12; // 5/12 of 1% for months beyond 36
      
      let totalReduction = 0;
      for (let month = 1; month <= monthsEarly; month++) {
        if (month <= 36) {
          totalReduction += reductionPerMonth;
        } else {
          totalReduction += additionalReductionPerMonth;
        }
      }
      
      reductionFactor = 1 - (totalReduction / 100);
      benefit = pia * reductionFactor;
    } else if (retirementAge > fullRetirementAge) {
      // Delayed retirement credits
      const monthsDelayed = (retirementAge - fullRetirementAge) * 12;
      const creditPerMonth = 2/3; // 2/3 of 1% per month (8% per year)
      const maxMonths = 48; // Maximum 48 months of credits
      
      const actualMonths = Math.min(monthsDelayed, maxMonths);
      const totalCredit = actualMonths * creditPerMonth;
      
      increaseFactor = 1 + (totalCredit / 100);
      benefit = pia * increaseFactor;
    }
    
    return { benefit, reductionFactor, increaseFactor };
  }

  /**
   * Calculate spousal benefits
   */
  static calculateSpousalBenefits(
    workerPIA: number,
    spousePIA: number,
    spouseRetirementAge: number,
    fullRetirementAge: number
  ): { spousalBenefit: number; combinedBenefits: number } {
    // Spousal benefit is 50% of worker's PIA at full retirement age
    const spousalBenefitAtFRA = workerPIA * 0.5;
    
    // Apply early retirement reduction if applicable
    let spousalBenefit = spousalBenefitAtFRA;
    if (spouseRetirementAge < fullRetirementAge) {
      const monthsEarly = (fullRetirementAge - spouseRetirementAge) * 12;
      const reductionPerMonth = 25/36; // 25/36 of 1% per month
      const totalReduction = monthsEarly * reductionPerMonth;
      spousalBenefit *= (1 - totalReduction / 100);
    }
    
    // Spouse gets the higher of their own benefit or spousal benefit
    const finalSpousalBenefit = Math.max(spousePIA, spousalBenefit);
    const combinedBenefits = workerPIA + finalSpousalBenefit;
    
    return { spousalBenefit: finalSpousalBenefit, combinedBenefits };
  }

  /**
   * Calculate survivor benefits
   */
  static calculateSurvivorBenefits(
    workerPIA: number,
    survivorAge: number,
    fullRetirementAge: number
  ): number {
    // Survivor benefit is 100% of worker's PIA at full retirement age
    let survivorBenefit = workerPIA;
    
    // Apply early retirement reduction if survivor is under FRA
    if (survivorAge < fullRetirementAge) {
      const monthsEarly = (fullRetirementAge - survivorAge) * 12;
      const reductionPerMonth = 19/24; // 19/24 of 1% per month
      const totalReduction = monthsEarly * reductionPerMonth;
      survivorBenefit *= (1 - totalReduction / 100);
    }
    
    return survivorBenefit;
  }

  /**
   * Calculate family maximum benefits
   */
  static calculateFamilyMaximum(pia: number): number {
    // Simplified family maximum calculation
    // Actual formula is complex and varies by year
    return pia * 1.75; // Rough approximation
  }

  /**
   * Calculate average indexed monthly earnings
   */
  static calculateAIME(
    earningsHistory: Array<{ year: number; earnings: number; inflationAdjusted: number }>,
    currentEarnings: number,
    yearsToRetirement: number,
    expectedGrowth: number
  ): number {
    // Get highest 35 years of earnings
    const allEarnings = [...earningsHistory.map(e => e.inflationAdjusted)];
    
    // Add projected future earnings
    for (let year = 1; year <= yearsToRetirement; year++) {
      const projectedEarnings = currentEarnings * Math.pow(1 + expectedGrowth / 100, year);
      allEarnings.push(projectedEarnings);
    }
    
    // Sort in descending order and take top 35 years
    allEarnings.sort((a, b) => b - a);
    const top35Years = allEarnings.slice(0, 35);
    
    // Calculate average
    const totalEarnings = top35Years.reduce((sum, earnings) => sum + earnings, 0);
    return totalEarnings / 35 / 12; // Convert to monthly
  }

  /**
   * Calculate optimal retirement age
   */
  static calculateOptimalRetirementAge(
    pia: number,
    fullRetirementAge: number,
    lifeExpectancy: number,
    discountRate: number = 3
  ): { optimalAge: number; optimalBenefit: number; breakevenAge: number } {
    let maxPresentValue = 0;
    let optimalAge = fullRetirementAge;
    let optimalBenefit = pia;
    
    // Test retirement ages from 62 to 70
    for (let age = 62; age <= 70; age++) {
      const { benefit } = this.calculateBenefitAtAge(pia, fullRetirementAge, age);
      const yearsOfBenefits = lifeExpectancy - age;
      
      // Calculate present value of lifetime benefits
      let presentValue = 0;
      for (let year = 0; year < yearsOfBenefits; year++) {
        const annualBenefit = benefit * 12;
        presentValue += annualBenefit / Math.pow(1 + discountRate / 100, year);
      }
      
      if (presentValue > maxPresentValue) {
        maxPresentValue = presentValue;
        optimalAge = age;
        optimalBenefit = benefit;
      }
    }
    
    // Calculate breakeven age (when delayed retirement pays off)
    const earlyBenefit = this.calculateBenefitAtAge(pia, fullRetirementAge, 62).benefit;
    const delayedBenefit = this.calculateBenefitAtAge(pia, fullRetirementAge, 70).benefit;
    
    // Simple breakeven calculation
    const breakevenAge = 62 + ((earlyBenefit * 8) / (delayedBenefit - earlyBenefit));
    
    return { optimalAge, optimalBenefit, breakevenAge };
  }

  /**
   * Calculate tax impact on Social Security benefits
   */
  static calculateTaxImpact(
    annualBenefit: number,
    otherIncome: number,
    filingStatus: 'single' | 'married'
  ): { taxablePortion: number; taxFreePortion: number; afterTaxBenefit: number } {
    const combinedIncome = otherIncome + (annualBenefit * 0.5);
    
    let taxablePortion = 0;
    if (filingStatus === 'single') {
      if (combinedIncome > 34000) {
        taxablePortion = Math.min(annualBenefit * 0.85, annualBenefit);
      } else if (combinedIncome > 25000) {
        taxablePortion = Math.min(annualBenefit * 0.5, annualBenefit);
      }
    } else {
      if (combinedIncome > 44000) {
        taxablePortion = Math.min(annualBenefit * 0.85, annualBenefit);
      } else if (combinedIncome > 32000) {
        taxablePortion = Math.min(annualBenefit * 0.5, annualBenefit);
      }
    }
    
    const taxFreePortion = annualBenefit - taxablePortion;
    const afterTaxBenefit = taxFreePortion + (taxablePortion * 0.75); // Assume 25% tax rate
    
    return { taxablePortion, taxFreePortion, afterTaxBenefit };
  }

  /**
   * Calculate inflation-adjusted benefits
   */
  static calculateInflationAdjusted(
    benefit: number,
    inflationRate: number,
    years: number
  ): { inflationAdjustedBenefit: number; purchasingPower: number; realValue: number } {
    const inflationAdjustedBenefit = benefit * Math.pow(1 + inflationRate / 100, years);
    const purchasingPower = benefit / inflationAdjustedBenefit;
    const realValue = benefit / Math.pow(1 + inflationRate / 100, years);
    
    return { inflationAdjustedBenefit, purchasingPower, realValue };
  }

  /**
   * Run Monte Carlo simulation for Social Security solvency
   */
  static runMonteCarloSimulation(
    inputs: SocialSecurityCalculatorInputs,
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
      // Generate random solvency scenario
      const solvencyFactor = 0.7 + Math.random() * 0.6; // 70% to 130% of current benefits
      
      // Calculate benefit with solvency adjustment
      const pia = this.calculatePIA(inputs.averageIndexedMonthlyEarnings, 2023);
      const { benefit } = this.calculateBenefitAtAge(
        pia,
        this.calculateFullRetirementAge(inputs.birthYear),
        inputs.plannedRetirementAge
      );
      
      const adjustedBenefit = benefit * solvencyFactor;
      results.push(adjustedBenefit);
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
 * Main Social Security calculator formula
 */
export const socialSecurityCalculatorFormula: Formula = {
  id: 'social-security-calculator',
  name: 'Social Security Benefits Calculator',
  description: 'Comprehensive Social Security benefit calculations with retirement age optimization and solvency analysis',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const ssInputs = inputs as SocialSecurityCalculatorInputs;
    
    try {
      const {
        birthYear,
        currentAge,
        plannedRetirementAge,
        currentAnnualEarnings,
        expectedEarningsGrowth,
        yearsToRetirement,
        averageIndexedMonthlyEarnings,
        maritalStatus,
        spouseEarnings,
        includeSpousalBenefits,
        includeInflation,
        inflationRate,
        includeTaxes,
        taxRate,
        optimizeRetirementAge,
        monteCarloSamples
      } = ssInputs;

      // Calculate full retirement age
      const fullRetirementAge = SocialSecurityFormulas.calculateFullRetirementAge(birthYear);
      
      // Calculate PIA
      const pia = SocialSecurityFormulas.calculatePIA(averageIndexedMonthlyEarnings, 2023);
      
      // Calculate benefits at different ages
      const age62 = SocialSecurityFormulas.calculateBenefitAtAge(pia, fullRetirementAge, 62);
      const age65 = SocialSecurityFormulas.calculateBenefitAtAge(pia, fullRetirementAge, 65);
      const age66 = SocialSecurityFormulas.calculateBenefitAtAge(pia, fullRetirementAge, 66);
      const age67 = SocialSecurityFormulas.calculateBenefitAtAge(pia, fullRetirementAge, 67);
      const age70 = SocialSecurityFormulas.calculateBenefitAtAge(pia, fullRetirementAge, 70);
      
      // Calculate benefit at planned retirement age
      const plannedBenefit = SocialSecurityFormulas.calculateBenefitAtAge(
        pia, fullRetirementAge, plannedRetirementAge
      );
      
      // Calculate optimal retirement age
      const lifeExpectancy = birthYear <= 1950 ? 85 : 87; // Simplified life expectancy
      const { optimalAge, optimalBenefit, breakevenAge } = 
        SocialSecurityFormulas.calculateOptimalRetirementAge(pia, fullRetirementAge, lifeExpectancy);
      
      // Calculate spousal benefits if applicable
      let spousalBenefits = null;
      if (includeSpousalBenefits && maritalStatus === 'married' && spouseEarnings) {
        const spousePIA = SocialSecurityFormulas.calculatePIA(spouseEarnings / 12, 2023);
        spousalBenefits = SocialSecurityFormulas.calculateSpousalBenefits(
          pia, spousePIA, plannedRetirementAge, fullRetirementAge
        );
      }
      
      // Calculate tax impact
      let taxAnalysis = null;
      if (includeTaxes) {
        const annualBenefit = plannedBenefit.benefit * 12;
        taxAnalysis = SocialSecurityFormulas.calculateTaxImpact(
          annualBenefit, 0, 'single' // Simplified - no other income
        );
      }
      
      // Calculate inflation impact
      let inflationAnalysis = null;
      if (includeInflation) {
        const yearsToInflation = lifeExpectancy - plannedRetirementAge;
        inflationAnalysis = SocialSecurityFormulas.calculateInflationAdjusted(
          plannedBenefit.benefit, inflationRate, yearsToInflation
        );
      }
      
      // Run Monte Carlo simulation
      const monteCarloResults = SocialSecurityFormulas.runMonteCarloSimulation(
        ssInputs, monteCarloSamples || 10000
      );
      
      // Calculate comparison metrics
      const annualBenefit = plannedBenefit.benefit * 12;
      const replacementRatio = (annualBenefit / currentAnnualEarnings) * 100;
      const adequacyScore = Math.min(100, replacementRatio * 2); // Simplified adequacy score
      
      // Generate recommendations
      const recommendations = [];
      if (plannedRetirementAge < fullRetirementAge) {
        recommendations.push('Consider delaying retirement to increase benefits');
      }
      if (replacementRatio < 30) {
        recommendations.push('Social Security may not provide adequate retirement income');
      }
      if (optimalAge !== plannedRetirementAge) {
        recommendations.push(`Optimal retirement age appears to be ${optimalAge}`);
      }
      
      const results: SocialSecurityCalculatorResults = {
        basicCalculation: {
          primaryInsuranceAmount: pia,
          fullRetirementAge,
          fullRetirementBenefit: age67.benefit,
          earlyRetirementBenefit: age62.benefit,
          delayedRetirementBenefit: age70.benefit,
          reductionFactor: age62.reductionFactor,
          increaseFactor: age70.increaseFactor
        },
        ageBasedBenefits: {
          age62: age62.benefit,
          age65: age65.benefit,
          age66: age66.benefit,
          age67: age67.benefit,
          age70: age70.benefit,
          optimalAge,
          optimalBenefit
        },
        earningsAnalysis: {
          totalLifetimeEarnings: currentAnnualEarnings * yearsToRetirement,
          averageIndexedMonthlyEarnings,
          bendPoints: {
            firstBendPoint: SocialSecurityFormulas.getBendPoints(2023).first,
            secondBendPoint: SocialSecurityFormulas.getBendPoints(2023).second,
            firstBendPointBenefit: pia * 0.9,
            secondBendPointBenefit: pia * 0.32,
            remainingBenefit: pia * 0.15
          },
          yearsOfCoverage: yearsToRetirement,
          quartersOfCoverage: yearsToRetirement * 4
        },
        spousalBenefits,
        taxAnalysis,
        inflationAnalysis,
        optimizationResults: {
          optimalRetirementAge: optimalAge,
          optimalMonthlyBenefit: optimalBenefit,
          optimalAnnualBenefit: optimalBenefit * 12,
          totalLifetimeBenefits: optimalBenefit * 12 * (lifeExpectancy - optimalAge),
          breakevenAge,
          recommendations
        },
        comparison: {
          vsPrivateAnnuity: annualBenefit * 25, // 4% rule
          vs401kWithdrawal: annualBenefit * 20, // 5% rule
          vsPension: annualBenefit * 1.2, // Pension typically higher
          replacementRatio,
          adequacyScore
        },
        riskAnalysis: {
          probabilityOfSolvency: 75, // Simplified estimate
          worstCaseScenario: monteCarloResults.percentile10,
          bestCaseScenario: monteCarloResults.percentile90,
          medianScenario: monteCarloResults.percentile50,
          fundingShortfall: 0 // Simplified
        },
        summary: {
          monthlyBenefit: plannedBenefit.benefit,
          annualBenefit,
          lifetimeBenefits: annualBenefit * (lifeExpectancy - plannedRetirementAge),
          benefitAdequacy: adequacyScore,
          keyRecommendations: recommendations
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Based on your earnings history and planned retirement at age ${plannedRetirementAge}, your estimated Social Security benefit would be $${plannedBenefit.benefit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} per month. Your full retirement age is ${fullRetirementAge}, and your Primary Insurance Amount (PIA) is $${pia.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`,
        intermediateSteps: {
          'Full Retirement Age': `${fullRetirementAge} years`,
          'Primary Insurance Amount': `$${pia.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          'Average Indexed Monthly Earnings': `$${averageIndexedMonthlyEarnings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          'Retirement Age': `${plannedRetirementAge} years`,
          'Monthly Benefit': `$${plannedBenefit.benefit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          'Annual Benefit': `$${annualBenefit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
        }
      };
    } catch (error) {
      throw new Error(`Social Security calculation failed: ${error}`);
    }
  }
};
