import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Personal injury settlement calculator validation rules
 */
export const personalInjuryValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('pastMedicalCosts', 'Past medical costs are required'),
  ValidationRuleFactory.required('futureMedicalCosts', 'Future medical costs are required'),
  ValidationRuleFactory.required('pastLostWages', 'Past lost wages are required'),
  ValidationRuleFactory.required('futureLostWages', 'Future lost wages are required'),
  ValidationRuleFactory.required('ageAtInjury', 'Age at injury is required'),
  ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
  ValidationRuleFactory.required('annualSalary', 'Annual salary is required'),
  ValidationRuleFactory.required('injurySeverity', 'Injury severity is required'),
  ValidationRuleFactory.required('jurisdiction', 'Jurisdiction is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),

  // Medical costs validation
  ValidationRuleFactory.nonNegative('pastMedicalCosts', 'Past medical costs cannot be negative'),
  ValidationRuleFactory.range('pastMedicalCosts', 0, 10000000, 'Past medical costs seem unreasonably high'),
  ValidationRuleFactory.nonNegative('futureMedicalCosts', 'Future medical costs cannot be negative'),
  ValidationRuleFactory.range('futureMedicalCosts', 0, 50000000, 'Future medical costs seem unreasonably high'),

  // Life care costs validation
  ValidationRuleFactory.businessRule(
    'lifeCareCost',
    (lifeCareCost, allInputs) => {
      if (lifeCareCost === undefined || lifeCareCost === null || lifeCareCost === '') return true;
      return lifeCareCost >= 0 && lifeCareCost <= 20000000;
    },
    'Life care costs must be between $0 and $20,000,000'
  ),

  // Lost wages validation
  ValidationRuleFactory.nonNegative('pastLostWages', 'Past lost wages cannot be negative'),
  ValidationRuleFactory.range('pastLostWages', 0, 5000000, 'Past lost wages seem unreasonably high'),
  ValidationRuleFactory.nonNegative('futureLostWages', 'Future lost wages cannot be negative'),
  ValidationRuleFactory.range('futureLostWages', 0, 20000000, 'Future lost wages seem unreasonably high'),

  // Age validation
  ValidationRuleFactory.range('ageAtInjury', 0, 120, 'Age at injury must be between 0 and 120'),
  ValidationRuleFactory.range('retirementAge', 50, 85, 'Retirement age must be between 50 and 85'),

  // Age consistency check
  ValidationRuleFactory.businessRule(
    'retirementAge',
    (retirementAge, allInputs) => {
      if (!allInputs?.ageAtInjury) return true;
      return retirementAge > allInputs.ageAtInjury;
    },
    'Retirement age must be greater than age at injury'
  ),

  // Salary validation
  ValidationRuleFactory.range('annualSalary', 15000, 10000000, 'Annual salary must be between $15,000 and $10,000,000'),

  // Career growth rate validation
  ValidationRuleFactory.range('careerGrowthRate', -5, 20, 'Career growth rate must be between -5% and 20%'),

  // Disability percentage validation
  ValidationRuleFactory.businessRule(
    'disabilityPercentage',
    (disabilityPercentage) => {
      if (disabilityPercentage === undefined || disabilityPercentage === null || disabilityPercentage === '') return true;
      return disabilityPercentage >= 0 && disabilityPercentage <= 100;
    },
    'Disability percentage must be between 0% and 100%'
  ),

  // Comparative negligence validation
  ValidationRuleFactory.businessRule(
    'comparativeNegligence',
    (comparativeNegligence) => {
      if (comparativeNegligence === undefined || comparativeNegligence === null || comparativeNegligence === '') return true;
      return comparativeNegligence >= 0 && comparativeNegligence <= 100;
    },
    'Comparative negligence must be between 0% and 100%'
  ),

  // Insurance policy limit validation
  ValidationRuleFactory.businessRule(
    'insurancePolicyLimit',
    (insurancePolicyLimit) => {
      if (insurancePolicyLimit === undefined || insurancePolicyLimit === null || insurancePolicyLimit === '') return true;
      return insurancePolicyLimit >= 25000 && insurancePolicyLimit <= 100000000;
    },
    'Insurance policy limit must be between $25,000 and $100,000,000'
  ),

  // Discount rate validation
  ValidationRuleFactory.range('discountRate', 1, 15, 'Discount rate must be between 1% and 15%'),

  // Medical inflation rate validation
  ValidationRuleFactory.range('medicalInflationRate', 0, 15, 'Medical inflation rate must be between 0% and 15%'),

  // Wage inflation rate validation
  ValidationRuleFactory.range('wageInflationRate', 0, 10, 'Wage inflation rate must be between 0% and 10%'),

  // Life expectancy validation
  ValidationRuleFactory.range('lifeExpectancy', 1, 100, 'Life expectancy must be between 1 and 100 years'),

  // Life expectancy consistency check
  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.ageAtInjury) return true;
      const currentAge = new Date().getFullYear() - (new Date().getFullYear() - allInputs.ageAtInjury);
      return lifeExpectancy > (currentAge - allInputs.ageAtInjury);
    },
    'Life expectancy must be greater than current age'
  ),

  // Severity vs permanent injury consistency
  ValidationRuleFactory.businessRule(
    'isPermanent',
    (isPermanent, allInputs) => {
      if (!allInputs?.injurySeverity) return true;
      // Catastrophic injuries should typically be permanent
      if (allInputs.injurySeverity === 'catastrophic' && !isPermanent) {
        // This is a warning, not an error
        return true;
      }
      return true;
    },
    'Catastrophic injuries are typically permanent'
  ),

  // Medical costs reasonableness check
  ValidationRuleFactory.businessRule(
    'futureMedicalCosts',
    (futureMedicalCosts, allInputs) => {
      if (!allInputs?.pastMedicalCosts || !allInputs?.injurySeverity) return true;
      
      const pastMedical = allInputs.pastMedicalCosts;
      const ratio = futureMedicalCosts / pastMedical;
      
      // Future medical costs should be reasonable relative to past costs
      if (allInputs.injurySeverity === 'minor' && ratio > 5) {
        return false;
      }
      if (allInputs.injurySeverity === 'moderate' && ratio > 10) {
        return false;
      }
      if (allInputs.injurySeverity === 'severe' && ratio > 20) {
        return false;
      }
      if (allInputs.injurySeverity === 'catastrophic' && ratio > 50) {
        return false;
      }
      
      return true;
    },
    'Future medical costs seem disproportionate to past costs for this injury severity'
  ),

  // Lost wages reasonableness check
  ValidationRuleFactory.businessRule(
    'futureLostWages',
    (futureLostWages, allInputs) => {
      if (!allInputs?.annualSalary || !allInputs?.ageAtInjury || !allInputs?.retirementAge) return true;
      
      const yearsToRetirement = allInputs.retirementAge - allInputs.ageAtInjury;
      const maxPossibleWages = allInputs.annualSalary * yearsToRetirement * 2; // Allow for growth
      
      if (futureLostWages > maxPossibleWages) {
        return false;
      }
      
      return true;
    },
    'Future lost wages exceed reasonable projections based on salary and working years'
  ),

  // High comparative negligence warning
  ValidationRuleFactory.businessRule(
    'comparativeNegligence',
    (comparativeNegligence, allInputs) => {
      if (!comparativeNegligence || !allInputs?.jurisdiction) return true;
      
      // Warning for high comparative negligence that might bar recovery
      if (comparativeNegligence >= 50) {
        // This is a warning about potential recovery bar
        return true;
      }
      
      return true;
    },
    'High comparative negligence may bar recovery in some jurisdictions'
  )
];

/**
 * Get validation rules for personal injury calculator
 */
export function getPersonalInjuryValidationRules(): ValidationRule[] {
  return personalInjuryValidationRules;
}

/**
 * Jurisdiction information for validation context
 */
export const jurisdictionInfo = {
  'california': {
    negligenceRule: 'Pure Comparative',
    description: 'Damages reduced by percentage of fault, no bar to recovery'
  },
  'texas': {
    negligenceRule: 'Modified Comparative (51%)',
    description: 'No recovery if more than 50% at fault'
  },
  'florida': {
    negligenceRule: 'Pure Comparative',
    description: 'Damages reduced by percentage of fault, no bar to recovery'
  },
  'new-york': {
    negligenceRule: 'Pure Comparative',
    description: 'Damages reduced by percentage of fault, no bar to recovery'
  }
};

/**
 * Injury severity guidelines
 */
export const injurySeverityGuidelines = {
  minor: {
    description: 'Temporary injuries with full recovery expected',
    examples: 'Minor cuts, bruises, sprains, whiplash',
    typicalMultiplier: '2-3x medical costs'
  },
  moderate: {
    description: 'Significant injuries requiring extended treatment',
    examples: 'Broken bones, herniated discs, concussions',
    typicalMultiplier: '3-5x medical costs'
  },
  severe: {
    description: 'Serious injuries with long-term impact',
    examples: 'Multiple fractures, severe burns, organ damage',
    typicalMultiplier: '5-7x medical costs'
  },
  catastrophic: {
    description: 'Life-altering permanent injuries',
    examples: 'Spinal cord injuries, traumatic brain injury, amputations',
    typicalMultiplier: '7-10x medical costs'
  }
};