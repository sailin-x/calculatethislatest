import { ValidationRuleFactory } from '../../../utils/validation';
import { PropertyTaxInputs } from './formulas';

/**
 * Validate property tax calculator inputs
 */
export function validatePropertyTaxInputs(inputs: Partial<PropertyTaxInputs>): string[] {
  const errors: string[] = [];

  // Required field validations
  if (inputs.propertyValue === undefined) {
    errors.push('Property Value is required');
  }

  if (inputs.taxRate === undefined) {
    errors.push('Property Tax Rate is required');
  }

  if (inputs.propertyType === undefined) {
    errors.push('Property Type is required');
  }

  if (inputs.paymentFrequency === undefined) {
    errors.push('Payment Frequency is required');
  }

  if (inputs.escrowIncluded === undefined) {
    errors.push('Escrow Inclusion is required');
  }

  // Range validations
  if (inputs.propertyValue !== undefined) {
    const propertyValuePositiveRule = ValidationRuleFactory.positive('propertyValue', 'Property Value must be positive');
    if (!propertyValuePositiveRule.validator(inputs.propertyValue)) {
      errors.push(propertyValuePositiveRule.message);
    }
    
    const propertyValueRangeRule = ValidationRuleFactory.range('propertyValue', 10000, 10000000, 'Property Value must be between $10,000 and $10,000,000');
    if (!propertyValueRangeRule.validator(inputs.propertyValue)) {
      errors.push(propertyValueRangeRule.message);
    }
  }

  if (inputs.assessedValue !== undefined) {
    const assessedValuePositiveRule = ValidationRuleFactory.positive('assessedValue', 'Assessed Value must be positive');
    if (!assessedValuePositiveRule.validator(inputs.assessedValue)) {
      errors.push(assessedValuePositiveRule.message);
    }
    
    const assessedValueRangeRule = ValidationRuleFactory.range('assessedValue', 10000, 10000000, 'Assessed Value must be between $10,000 and $10,000,000');
    if (!assessedValueRangeRule.validator(inputs.assessedValue)) {
      errors.push(assessedValueRangeRule.message);
    }
  }

  if (inputs.taxRate !== undefined) {
    const taxRatePositiveRule = ValidationRuleFactory.positive('taxRate', 'Tax Rate must be positive');
    if (!taxRatePositiveRule.validator(inputs.taxRate)) {
      errors.push(taxRatePositiveRule.message);
    }
    
    const taxRateRangeRule = ValidationRuleFactory.range('taxRate', 0.1, 10, 'Tax Rate must be between 0.1% and 10%');
    if (!taxRateRangeRule.validator(inputs.taxRate)) {
      errors.push(taxRateRangeRule.message);
    }
  }

  if (inputs.homesteadExemption !== undefined) {
    const homesteadExemptionNonNegativeRule = ValidationRuleFactory.nonNegative('homesteadExemption', 'Homestead Exemption must be non-negative');
    if (!homesteadExemptionNonNegativeRule.validator(inputs.homesteadExemption)) {
      errors.push(homesteadExemptionNonNegativeRule.message);
    }
    
    const homesteadExemptionRangeRule = ValidationRuleFactory.range('homesteadExemption', 0, 100000, 'Homestead Exemption must be between $0 and $100,000');
    if (!homesteadExemptionRangeRule.validator(inputs.homesteadExemption)) {
      errors.push(homesteadExemptionRangeRule.message);
    }
  }

  if (inputs.seniorExemption !== undefined) {
    const seniorExemptionNonNegativeRule = ValidationRuleFactory.nonNegative('seniorExemption', 'Senior Exemption must be non-negative');
    if (!seniorExemptionNonNegativeRule.validator(inputs.seniorExemption)) {
      errors.push(seniorExemptionNonNegativeRule.message);
    }
    
    const seniorExemptionRangeRule = ValidationRuleFactory.range('seniorExemption', 0, 100000, 'Senior Exemption must be between $0 and $100,000');
    if (!seniorExemptionRangeRule.validator(inputs.seniorExemption)) {
      errors.push(seniorExemptionRangeRule.message);
    }
  }

  if (inputs.veteranExemption !== undefined) {
    const veteranExemptionNonNegativeRule = ValidationRuleFactory.nonNegative('veteranExemption', 'Veteran Exemption must be non-negative');
    if (!veteranExemptionNonNegativeRule.validator(inputs.veteranExemption)) {
      errors.push(veteranExemptionNonNegativeRule.message);
    }
    
    const veteranExemptionRangeRule = ValidationRuleFactory.range('veteranExemption', 0, 100000, 'Veteran Exemption must be between $0 and $100,000');
    if (!veteranExemptionRangeRule.validator(inputs.veteranExemption)) {
      errors.push(veteranExemptionRangeRule.message);
    }
  }

  if (inputs.disabilityExemption !== undefined) {
    const disabilityExemptionNonNegativeRule = ValidationRuleFactory.nonNegative('disabilityExemption', 'Disability Exemption must be non-negative');
    if (!disabilityExemptionNonNegativeRule.validator(inputs.disabilityExemption)) {
      errors.push(disabilityExemptionNonNegativeRule.message);
    }
    
    const disabilityExemptionRangeRule = ValidationRuleFactory.range('disabilityExemption', 0, 100000, 'Disability Exemption must be between $0 and $100,000');
    if (!disabilityExemptionRangeRule.validator(inputs.disabilityExemption)) {
      errors.push(disabilityExemptionRangeRule.message);
    }
  }

  if (inputs.greenEnergyExemption !== undefined) {
    const greenEnergyExemptionNonNegativeRule = ValidationRuleFactory.nonNegative('greenEnergyExemption', 'Green Energy Exemption must be non-negative');
    if (!greenEnergyExemptionNonNegativeRule.validator(inputs.greenEnergyExemption)) {
      errors.push(greenEnergyExemptionNonNegativeRule.message);
    }
    
    const greenEnergyExemptionRangeRule = ValidationRuleFactory.range('greenEnergyExemption', 0, 100000, 'Green Energy Exemption must be between $0 and $100,000');
    if (!greenEnergyExemptionRangeRule.validator(inputs.greenEnergyExemption)) {
      errors.push(greenEnergyExemptionRangeRule.message);
    }
  }

  if (inputs.assessmentRatio !== undefined) {
    const assessmentRatioPositiveRule = ValidationRuleFactory.positive('assessmentRatio', 'Assessment Ratio must be positive');
    if (!assessmentRatioPositiveRule.validator(inputs.assessmentRatio)) {
      errors.push(assessmentRatioPositiveRule.message);
    }
    
    const assessmentRatioRangeRule = ValidationRuleFactory.range('assessmentRatio', 10, 100, 'Assessment Ratio must be between 10% and 100%');
    if (!assessmentRatioRangeRule.validator(inputs.assessmentRatio)) {
      errors.push(assessmentRatioRangeRule.message);
    }
  }

  if (inputs.latePaymentPenalty !== undefined) {
    const latePaymentPenaltyNonNegativeRule = ValidationRuleFactory.nonNegative('latePaymentPenalty', 'Late Payment Penalty must be non-negative');
    if (!latePaymentPenaltyNonNegativeRule.validator(inputs.latePaymentPenalty)) {
      errors.push(latePaymentPenaltyNonNegativeRule.message);
    }
    
    const latePaymentPenaltyRangeRule = ValidationRuleFactory.range('latePaymentPenalty', 0, 25, 'Late Payment Penalty must be between 0% and 25%');
    if (!latePaymentPenaltyRangeRule.validator(inputs.latePaymentPenalty)) {
      errors.push(latePaymentPenaltyRangeRule.message);
    }
  }

  if (inputs.earlyPaymentDiscount !== undefined) {
    const earlyPaymentDiscountNonNegativeRule = ValidationRuleFactory.nonNegative('earlyPaymentDiscount', 'Early Payment Discount must be non-negative');
    if (!earlyPaymentDiscountNonNegativeRule.validator(inputs.earlyPaymentDiscount)) {
      errors.push(earlyPaymentDiscountNonNegativeRule.message);
    }
    
    const earlyPaymentDiscountRangeRule = ValidationRuleFactory.range('earlyPaymentDiscount', 0, 10, 'Early Payment Discount must be between 0% and 10%');
    if (!earlyPaymentDiscountRangeRule.validator(inputs.earlyPaymentDiscount)) {
      errors.push(earlyPaymentDiscountRangeRule.message);
    }
  }

  if (inputs.specialAssessments !== undefined) {
    const specialAssessmentsNonNegativeRule = ValidationRuleFactory.nonNegative('specialAssessments', 'Special Assessments must be non-negative');
    if (!specialAssessmentsNonNegativeRule.validator(inputs.specialAssessments)) {
      errors.push(specialAssessmentsNonNegativeRule.message);
    }
    
    const specialAssessmentsRangeRule = ValidationRuleFactory.range('specialAssessments', 0, 50000, 'Special Assessments must be between $0 and $50,000');
    if (!specialAssessmentsRangeRule.validator(inputs.specialAssessments)) {
      errors.push(specialAssessmentsRangeRule.message);
    }
  }

  if (inputs.taxYear !== undefined) {
    const taxYearRangeRule = ValidationRuleFactory.range('taxYear', 2020, 2030, 'Tax Year must be between 2020 and 2030');
    if (!taxYearRangeRule.validator(inputs.taxYear)) {
      errors.push(taxYearRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.propertyValue !== undefined && inputs.assessedValue !== undefined) {
    if (inputs.assessedValue > inputs.propertyValue * 1.5) {
      errors.push('Assessed value should not exceed 150% of property value');
    }
    
    if (inputs.assessedValue < inputs.propertyValue * 0.5) {
      errors.push('Assessed value should not be less than 50% of property value');
    }
  }

  if (inputs.propertyValue !== undefined && inputs.homesteadExemption !== undefined) {
    if (inputs.homesteadExemption > inputs.propertyValue * 0.3) {
      errors.push('Homestead exemption should not exceed 30% of property value');
    }
  }

  // Total exemptions validation
  const totalExemptions = (inputs.homesteadExemption || 0) + 
    (inputs.seniorExemption || 0) + 
    (inputs.veteranExemption || 0) + 
    (inputs.disabilityExemption || 0) + 
    (inputs.greenEnergyExemption || 0);

  if (inputs.assessedValue !== undefined && totalExemptions > inputs.assessedValue) {
    errors.push('Total exemptions cannot exceed assessed value');
  }

  // Property type specific validations
  if (inputs.propertyType === 'commercial' && inputs.homesteadExemption && inputs.homesteadExemption > 0) {
    errors.push('Homestead exemption is not applicable to commercial properties');
  }

  if (inputs.propertyType === 'industrial' && inputs.homesteadExemption && inputs.homesteadExemption > 0) {
    errors.push('Homestead exemption is not applicable to industrial properties');
  }

  // Tax rate reasonableness check
  if (inputs.taxRate !== undefined && inputs.taxRate > 5) {
    errors.push('Tax rate seems unusually high. Please verify the rate');
  }

  // Assessment ratio validation
  if (inputs.assessmentRatio !== undefined && inputs.assessmentRatio < 50) {
    errors.push('Assessment ratio seems unusually low. Please verify the ratio');
  }

  return errors;
}