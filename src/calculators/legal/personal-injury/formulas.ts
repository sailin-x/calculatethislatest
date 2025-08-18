import { Formula, CalculationResult } from '../../../types/calculator';

export interface PersonalInjuryInputs {
  // Medical costs
  pastMedicalCosts: number;
  futureMedicalCosts: number;
  lifeCareCost?: number;
  
  // Lost wages
  pastLostWages: number;
  futureLostWages: number;
  ageAtInjury: number;
  retirementAge: number;
  annualSalary: number;
  careerGrowthRate: number; // annual percentage
  
  // Injury details
  injurySeverity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  isPermanent: boolean;
  disabilityPercentage?: number; // 0-100%
  
  // Legal factors
  jurisdiction: string;
  comparativeNegligence?: number; // percentage of fault
  insurancePolicyLimit?: number;
  
  // Economic factors
  discountRate: number; // for present value calculations
  medicalInflationRate: number;
  wageInflationRate: number;
  lifeExpectancy: number; // years from injury date
}

export interface SettlementBreakdown {
  economicDamages: {
    pastMedical: number;
    futureMedical: number;
    pastWages: number;
    futureWages: number;
    lifeCareCosts: number;
    total: number;
  };
  nonEconomicDamages: {
    painAndSuffering: number;
    lossOfConsortium: number;
    lossOfEnjoyment: number;
    total: number;
  };
  punitiveDamages?: number;
  grossSettlement: number;
  comparativeNegligenceReduction: number;
  netSettlement: number;
  attorneyFees: number;
  clientReceives: number;
}

/**
 * Personal injury settlement calculation formulas based on legal standards
 */
export class PersonalInjuryFormulas {
  
  /**
   * Jurisdiction-specific multiplier tables for pain and suffering
   */
  static readonly JURISDICTION_MULTIPLIERS = {
    'california': { minor: 2.5, moderate: 4.0, severe: 6.0, catastrophic: 8.0 },
    'texas': { minor: 2.0, moderate: 3.5, severe: 5.5, catastrophic: 7.5 },
    'florida': { minor: 2.2, moderate: 3.8, severe: 5.8, catastrophic: 7.8 },
    'new-york': { minor: 3.0, moderate: 4.5, severe: 6.5, catastrophic: 8.5 },
    'illinois': { minor: 2.8, moderate: 4.2, severe: 6.2, catastrophic: 8.2 },
    'pennsylvania': { minor: 2.6, moderate: 4.0, severe: 6.0, catastrophic: 8.0 },
    'ohio': { minor: 2.3, moderate: 3.7, severe: 5.7, catastrophic: 7.7 },
    'georgia': { minor: 2.1, moderate: 3.4, severe: 5.4, catastrophic: 7.4 },
    'north-carolina': { minor: 2.0, moderate: 3.2, severe: 5.2, catastrophic: 7.2 },
    'michigan': { minor: 2.4, moderate: 3.9, severe: 5.9, catastrophic: 7.9 },
    'default': { minor: 2.5, moderate: 3.8, severe: 5.8, catastrophic: 7.8 }
  };

  /**
   * Medical cost inflation rates by category
   */
  static readonly MEDICAL_INFLATION_RATES = {
    'hospital-care': 4.2,
    'physician-services': 3.8,
    'prescription-drugs': 5.1,
    'medical-equipment': 3.5,
    'long-term-care': 4.8,
    'rehabilitation': 4.0,
    'default': 4.2
  };

  /**
   * Calculate present value of future medical costs with inflation
   */
  static calculateFutureMedicalPV(
    annualCost: number,
    years: number,
    discountRate: number,
    inflationRate: number
  ): number {
    let presentValue = 0;
    const realDiscountRate = (discountRate - inflationRate) / 100;
    
    for (let year = 1; year <= years; year++) {
      const inflatedCost = annualCost * Math.pow(1 + inflationRate / 100, year);
      const discountedCost = inflatedCost / Math.pow(1 + realDiscountRate, year);
      presentValue += discountedCost;
    }
    
    return presentValue;
  }

  /**
   * Calculate present value of future lost wages with career progression
   */
  static calculateFutureLostWagesPV(
    currentSalary: number,
    yearsToRetirement: number,
    careerGrowthRate: number,
    wageInflationRate: number,
    discountRate: number,
    disabilityPercentage: number = 100
  ): number {
    let presentValue = 0;
    const realDiscountRate = (discountRate - wageInflationRate) / 100;
    const realGrowthRate = (careerGrowthRate - wageInflationRate) / 100;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      // Calculate salary with career growth and inflation
      const projectedSalary = currentSalary * 
        Math.pow(1 + careerGrowthRate / 100, year) * 
        Math.pow(1 + wageInflationRate / 100, year);
      
      // Apply disability percentage
      const lostWages = projectedSalary * (disabilityPercentage / 100);
      
      // Discount to present value
      const discountedWages = lostWages / Math.pow(1 + discountRate / 100, year);
      presentValue += discountedWages;
    }
    
    return presentValue;
  }

  /**
   * Calculate pain and suffering using jurisdiction-specific multipliers
   */
  static calculatePainAndSuffering(
    totalMedicalCosts: number,
    injurySeverity: string,
    jurisdiction: string,
    isPermanent: boolean,
    customMultiplier?: number
  ): number {
    const jurisdictionKey = jurisdiction.toLowerCase().replace(/\s+/g, '-');
    const multipliers = this.JURISDICTION_MULTIPLIERS[jurisdictionKey as keyof typeof this.JURISDICTION_MULTIPLIERS] || 
                      this.JURISDICTION_MULTIPLIERS.default;
    
    let baseMultiplier = multipliers[injurySeverity as keyof typeof multipliers] || multipliers.moderate;
    
    // Adjust for permanent injury
    if (isPermanent) {
      baseMultiplier *= 1.3; // 30% increase for permanent injuries
    }
    
    // Use custom multiplier if provided
    if (customMultiplier) {
      baseMultiplier = customMultiplier;
    }
    
    return totalMedicalCosts * baseMultiplier;
  }

  /**
   * Calculate loss of consortium damages
   */
  static calculateLossOfConsortium(
    injurySeverity: string,
    ageAtInjury: number,
    isPermanent: boolean,
    isMarried: boolean = true
  ): number {
    if (!isMarried || !isPermanent) return 0;
    
    const baseDamages = {
      minor: 15000,
      moderate: 35000,
      severe: 75000,
      catastrophic: 150000
    };
    
    let damages = baseDamages[injurySeverity as keyof typeof baseDamages] || baseDamages.moderate;
    
    // Age adjustment - younger victims typically receive higher awards
    if (ageAtInjury < 30) {
      damages *= 1.4;
    } else if (ageAtInjury < 45) {
      damages *= 1.2;
    } else if (ageAtInjury > 65) {
      damages *= 0.7;
    }
    
    return damages;
  }

  /**
   * Calculate loss of enjoyment of life damages
   */
  static calculateLossOfEnjoyment(
    injurySeverity: string,
    ageAtInjury: number,
    lifeExpectancy: number,
    isPermanent: boolean
  ): number {
    if (!isPermanent) return 0;
    
    const annualValues = {
      minor: 2000,
      moderate: 5000,
      severe: 12000,
      catastrophic: 25000
    };
    
    const annualValue = annualValues[injurySeverity as keyof typeof annualValues] || annualValues.moderate;
    const remainingYears = Math.max(0, lifeExpectancy - (new Date().getFullYear() - (new Date().getFullYear() - ageAtInjury)));
    
    // Age adjustment
    let ageMultiplier = 1.0;
    if (ageAtInjury < 25) {
      ageMultiplier = 1.5;
    } else if (ageAtInjury < 45) {
      ageMultiplier = 1.2;
    } else if (ageAtInjury > 65) {
      ageMultiplier = 0.8;
    }
    
    return annualValue * remainingYears * ageMultiplier;
  }

  /**
   * Apply comparative negligence reduction
   */
  static applyComparativeNegligence(
    grossSettlement: number,
    negligencePercentage: number,
    jurisdiction: string
  ): { netSettlement: number; reduction: number; isBarred: boolean } {
    const negligence = negligencePercentage / 100;
    
    // Pure comparative negligence states
    const pureComparativeStates = ['california', 'florida', 'new-york', 'alaska', 'arizona', 'kentucky', 'louisiana', 'mississippi', 'missouri', 'new-mexico', 'rhode-island', 'south-dakota', 'washington'];
    
    // Modified comparative negligence (50% rule) states
    const modified50States = ['arkansas', 'colorado', 'georgia', 'idaho', 'iowa', 'kansas', 'maine', 'minnesota', 'montana', 'nebraska', 'nevada', 'new-hampshire', 'north-dakota', 'oklahoma', 'oregon', 'pennsylvania', 'south-carolina', 'tennessee', 'utah', 'vermont', 'west-virginia', 'wyoming'];
    
    // Modified comparative negligence (51% rule) states
    const modified51States = ['connecticut', 'delaware', 'hawaii', 'illinois', 'indiana', 'massachusetts', 'michigan', 'minnesota', 'ohio', 'texas', 'wisconsin'];
    
    const jurisdictionKey = jurisdiction.toLowerCase().replace(/\s+/g, '-');
    
    let isBarred = false;
    let reduction = 0;
    let netSettlement = grossSettlement;
    
    if (pureComparativeStates.includes(jurisdictionKey)) {
      // Pure comparative negligence - reduce by percentage of fault
      reduction = grossSettlement * negligence;
      netSettlement = grossSettlement - reduction;
    } else if (modified50States.includes(jurisdictionKey)) {
      // Modified comparative negligence (50% rule)
      if (negligencePercentage >= 50) {
        isBarred = true;
        netSettlement = 0;
        reduction = grossSettlement;
      } else {
        reduction = grossSettlement * negligence;
        netSettlement = grossSettlement - reduction;
      }
    } else if (modified51States.includes(jurisdictionKey)) {
      // Modified comparative negligence (51% rule)
      if (negligencePercentage > 50) {
        isBarred = true;
        netSettlement = 0;
        reduction = grossSettlement;
      } else {
        reduction = grossSettlement * negligence;
        netSettlement = grossSettlement - reduction;
      }
    } else {
      // Default to pure comparative negligence
      reduction = grossSettlement * negligence;
      netSettlement = grossSettlement - reduction;
    }
    
    return { netSettlement, reduction, isBarred };
  }

  /**
   * Calculate attorney fees (typically contingency)
   */
  static calculateAttorneyFees(
    settlement: number,
    contingencyRate: number = 33.33,
    expenses: number = 0
  ): { attorneyFees: number; expenses: number; clientReceives: number } {
    const attorneyFees = settlement * (contingencyRate / 100);
    const clientReceives = settlement - attorneyFees - expenses;
    
    return { attorneyFees, expenses, clientReceives };
  }

  /**
   * Apply insurance policy limits
   */
  static applyPolicyLimits(
    calculatedSettlement: number,
    policyLimit?: number
  ): { limitedSettlement: number; isLimited: boolean; excessAmount: number } {
    if (!policyLimit || calculatedSettlement <= policyLimit) {
      return {
        limitedSettlement: calculatedSettlement,
        isLimited: false,
        excessAmount: 0
      };
    }
    
    return {
      limitedSettlement: policyLimit,
      isLimited: true,
      excessAmount: calculatedSettlement - policyLimit
    };
  }

  /**
   * Calculate structured settlement present value
   */
  static calculateStructuredSettlement(
    totalSettlement: number,
    annualPayment: number,
    years: number,
    discountRate: number
  ): { presentValue: number; totalPayments: number; impliedReturn: number } {
    const totalPayments = annualPayment * years;
    
    // Calculate present value of annuity
    const rate = discountRate / 100;
    const presentValue = annualPayment * ((1 - Math.pow(1 + rate, -years)) / rate);
    
    // Calculate implied return rate
    const impliedReturn = Math.pow(totalPayments / totalSettlement, 1 / years) - 1;
    
    return {
      presentValue,
      totalPayments,
      impliedReturn: impliedReturn * 100
    };
  }
}

/**
 * Main personal injury settlement calculator formula
 */
export const personalInjuryCalculatorFormula: Formula = {
  id: 'personal-injury-calculator',
  name: 'Personal Injury Settlement Calculator',
  description: 'Comprehensive personal injury settlement calculation with jurisdiction-specific multipliers and legal accuracy',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const injuryInputs = inputs as PersonalInjuryInputs;
    
    try {
      // Calculate economic damages
      const pastMedical = injuryInputs.pastMedicalCosts;
      const futureMedical = PersonalInjuryFormulas.calculateFutureMedicalPV(
        injuryInputs.futureMedicalCosts,
        injuryInputs.lifeExpectancy,
        injuryInputs.discountRate,
        injuryInputs.medicalInflationRate
      );
      
      const pastWages = injuryInputs.pastLostWages;
      const yearsToRetirement = Math.max(0, injuryInputs.retirementAge - injuryInputs.ageAtInjury);
      const futureWages = PersonalInjuryFormulas.calculateFutureLostWagesPV(
        injuryInputs.annualSalary,
        yearsToRetirement,
        injuryInputs.careerGrowthRate,
        injuryInputs.wageInflationRate,
        injuryInputs.discountRate,
        injuryInputs.disabilityPercentage || 100
      );
      
      const lifeCareCosts = injuryInputs.lifeCareCost || 0;
      
      const totalEconomicDamages = pastMedical + futureMedical + pastWages + futureWages + lifeCareCosts;
      
      // Calculate non-economic damages
      const totalMedicalCosts = pastMedical + futureMedical;
      const painAndSuffering = PersonalInjuryFormulas.calculatePainAndSuffering(
        totalMedicalCosts,
        injuryInputs.injurySeverity,
        injuryInputs.jurisdiction,
        injuryInputs.isPermanent
      );
      
      const lossOfConsortium = PersonalInjuryFormulas.calculateLossOfConsortium(
        injuryInputs.injurySeverity,
        injuryInputs.ageAtInjury,
        injuryInputs.isPermanent,
        true // Assume married for calculation
      );
      
      const lossOfEnjoyment = PersonalInjuryFormulas.calculateLossOfEnjoyment(
        injuryInputs.injurySeverity,
        injuryInputs.ageAtInjury,
        injuryInputs.lifeExpectancy,
        injuryInputs.isPermanent
      );
      
      const totalNonEconomicDamages = painAndSuffering + lossOfConsortium + lossOfEnjoyment;
      
      // Calculate gross settlement
      const grossSettlement = totalEconomicDamages + totalNonEconomicDamages;
      
      // Apply comparative negligence
      const negligenceResult = PersonalInjuryFormulas.applyComparativeNegligence(
        grossSettlement,
        injuryInputs.comparativeNegligence || 0,
        injuryInputs.jurisdiction
      );
      
      // Apply insurance policy limits
      const policyResult = PersonalInjuryFormulas.applyPolicyLimits(
        negligenceResult.netSettlement,
        injuryInputs.insurancePolicyLimit
      );
      
      // Calculate attorney fees
      const feeResult = PersonalInjuryFormulas.calculateAttorneyFees(
        policyResult.limitedSettlement,
        33.33, // Standard contingency rate
        5000   // Estimated expenses
      );
      
      const settlementBreakdown: SettlementBreakdown = {
        economicDamages: {
          pastMedical,
          futureMedical,
          pastWages,
          futureWages,
          lifeCareCosts,
          total: totalEconomicDamages
        },
        nonEconomicDamages: {
          painAndSuffering,
          lossOfConsortium,
          lossOfEnjoyment,
          total: totalNonEconomicDamages
        },
        grossSettlement,
        comparativeNegligenceReduction: negligenceResult.reduction,
        netSettlement: negligenceResult.netSettlement,
        attorneyFees: feeResult.attorneyFees,
        clientReceives: feeResult.clientReceives
      };
      
      return {
        outputs: {
          totalEconomicDamages,
          totalNonEconomicDamages,
          painAndSuffering,
          grossSettlement,
          netSettlement: policyResult.limitedSettlement,
          clientReceives: feeResult.clientReceives,
          attorneyFees: feeResult.attorneyFees,
          isLimitedByPolicy: policyResult.isLimited,
          excessAmount: policyResult.excessAmount,
          isBarredByNegligence: negligenceResult.isBarred,
          settlementBreakdown
        },
        explanation: `Settlement calculation for ${injuryInputs.injurySeverity} injury in ${injuryInputs.jurisdiction}. Economic damages: ${totalEconomicDamages.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}, Non-economic damages: ${totalNonEconomicDamages.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. ${injuryInputs.comparativeNegligence ? `Reduced by ${injuryInputs.comparativeNegligence}% comparative negligence.` : ''} Client receives: ${feeResult.clientReceives.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} after attorney fees.`,
        intermediateSteps: {
          'Past Medical Costs': `$${pastMedical.toLocaleString()}`,
          'Future Medical PV': `$${futureMedical.toLocaleString()}`,
          'Past Lost Wages': `$${pastWages.toLocaleString()}`,
          'Future Lost Wages PV': `$${futureWages.toLocaleString()}`,
          'Pain & Suffering Multiplier': `${(painAndSuffering / totalMedicalCosts).toFixed(1)}x medical costs`,
          'Gross Settlement': `$${grossSettlement.toLocaleString()}`,
          'Comparative Negligence': `${injuryInputs.comparativeNegligence || 0}% reduction`,
          'Attorney Fees (33.33%)': `$${feeResult.attorneyFees.toLocaleString()}`
        }
      };
    } catch (error) {
      throw new Error(`Personal injury settlement calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};