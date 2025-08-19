import { ValidationRuleFactory } from '../../../utils/validation';
import { PropertyTaxProrationInputs } from './formulas';

/**
 * Validate property tax proration calculator inputs
 */
export function validatePropertyTaxProrationInputs(inputs: Partial<PropertyTaxProrationInputs>): string[] {
  const errors: string[] = [];

  // Required field validations
  if (inputs.annualPropertyTax === undefined) {
    errors.push('Annual Property Tax is required');
  }

  if (inputs.closingDate === undefined) {
    errors.push('Closing Date is required');
  }

  if (inputs.taxYear === undefined) {
    errors.push('Tax Year is required');
  }

  if (inputs.taxPaymentSchedule === undefined) {
    errors.push('Tax Payment Schedule is required');
  }

  if (inputs.prorationMethod === undefined) {
    errors.push('Proration Method is required');
  }

  if (inputs.calculationType === undefined) {
    errors.push('Calculation Type is required');
  }

  // Range validations
  if (inputs.annualPropertyTax !== undefined) {
    const annualPropertyTaxPositiveRule = ValidationRuleFactory.positive('annualPropertyTax', 'Annual Property Tax must be positive');
    if (!annualPropertyTaxPositiveRule.validator(inputs.annualPropertyTax)) {
      errors.push(annualPropertyTaxPositiveRule.message);
    }
    
    const annualPropertyTaxRangeRule = ValidationRuleFactory.range('annualPropertyTax', 100, 100000, 'Annual Property Tax must be between $100 and $100,000');
    if (!annualPropertyTaxRangeRule.validator(inputs.annualPropertyTax)) {
      errors.push(annualPropertyTaxRangeRule.message);
    }
  }

  if (inputs.taxYear !== undefined) {
    const taxYearRangeRule = ValidationRuleFactory.range('taxYear', 2020, 2030, 'Tax Year must be between 2020 and 2030');
    if (!taxYearRangeRule.validator(inputs.taxYear)) {
      errors.push(taxYearRangeRule.message);
    }
  }

  if (inputs.sellerPaidTaxes !== undefined) {
    const sellerPaidTaxesNonNegativeRule = ValidationRuleFactory.nonNegative('sellerPaidTaxes', 'Seller Paid Taxes cannot be negative');
    if (!sellerPaidTaxesNonNegativeRule.validator(inputs.sellerPaidTaxes)) {
      errors.push(sellerPaidTaxesNonNegativeRule.message);
    }
    
    const sellerPaidTaxesRangeRule = ValidationRuleFactory.range('sellerPaidTaxes', 0, 100000, 'Seller Paid Taxes must be between $0 and $100,000');
    if (!sellerPaidTaxesRangeRule.validator(inputs.sellerPaidTaxes)) {
      errors.push(sellerPaidTaxesRangeRule.message);
    }
  }

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

  if (inputs.exemptions !== undefined) {
    const exemptionsNonNegativeRule = ValidationRuleFactory.nonNegative('exemptions', 'Exemptions cannot be negative');
    if (!exemptionsNonNegativeRule.validator(inputs.exemptions)) {
      errors.push(exemptionsNonNegativeRule.message);
    }
    
    const exemptionsRangeRule = ValidationRuleFactory.range('exemptions', 0, 100000, 'Exemptions must be between $0 and $100,000');
    if (!exemptionsRangeRule.validator(inputs.exemptions)) {
      errors.push(exemptionsRangeRule.message);
    }
  }

  if (inputs.specialAssessments !== undefined) {
    const specialAssessmentsNonNegativeRule = ValidationRuleFactory.nonNegative('specialAssessments', 'Special Assessments cannot be negative');
    if (!specialAssessmentsNonNegativeRule.validator(inputs.specialAssessments)) {
      errors.push(specialAssessmentsNonNegativeRule.message);
    }
    
    const specialAssessmentsRangeRule = ValidationRuleFactory.range('specialAssessments', 0, 50000, 'Special Assessments must be between $0 and $50,000');
    if (!specialAssessmentsRangeRule.validator(inputs.specialAssessments)) {
      errors.push(specialAssessmentsRangeRule.message);
    }
  }

  if (inputs.latePaymentPenalty !== undefined) {
    const latePaymentPenaltyNonNegativeRule = ValidationRuleFactory.nonNegative('latePaymentPenalty', 'Late Payment Penalty cannot be negative');
    if (!latePaymentPenaltyNonNegativeRule.validator(inputs.latePaymentPenalty)) {
      errors.push(latePaymentPenaltyNonNegativeRule.message);
    }
    
    const latePaymentPenaltyRangeRule = ValidationRuleFactory.range('latePaymentPenalty', 0, 25, 'Late Payment Penalty must be between 0% and 25%');
    if (!latePaymentPenaltyRangeRule.validator(inputs.latePaymentPenalty)) {
      errors.push(latePaymentPenaltyRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.closingDate !== undefined) {
    const closingDate = new Date(inputs.closingDate);
    if (isNaN(closingDate.getTime())) {
      errors.push('Closing Date must be a valid date');
    } else {
      const currentYear = new Date().getFullYear();
      if (closingDate.getFullYear() < 2020 || closingDate.getFullYear() > 2030) {
        errors.push('Closing Date must be between 2020 and 2030');
      }
    }
  }

  if (inputs.assessmentDate !== undefined) {
    const assessmentDate = new Date(inputs.assessmentDate);
    if (isNaN(assessmentDate.getTime())) {
      errors.push('Assessment Date must be a valid date');
    } else {
      const currentYear = new Date().getFullYear();
      if (assessmentDate.getFullYear() < 2020 || assessmentDate.getFullYear() > 2030) {
        errors.push('Assessment Date must be between 2020 and 2030');
      }
    }
  }

  if (inputs.taxPaymentDates !== undefined && inputs.taxPaymentDates.trim() !== '') {
    const dates = inputs.taxPaymentDates.split(',').map(date => date.trim());
    for (const date of dates) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        errors.push(`Invalid tax payment date: ${date}`);
      }
    }
  }

  // Cross-field validations
  if (inputs.sellerPaidTaxes !== undefined && inputs.annualPropertyTax !== undefined) {
    if (inputs.sellerPaidTaxes > inputs.annualPropertyTax) {
      errors.push('Seller paid taxes cannot exceed annual property tax amount');
    }
  }

  if (inputs.exemptions !== undefined && inputs.propertyValue !== undefined) {
    if (inputs.exemptions > inputs.propertyValue * 0.5) {
      errors.push('Exemptions seem unusually high compared to property value');
    }
  }

  if (inputs.taxRate !== undefined && inputs.propertyValue !== undefined && inputs.annualPropertyTax !== undefined) {
    const calculatedTax = (inputs.propertyValue * (inputs.taxRate / 100));
    const difference = Math.abs(calculatedTax - inputs.annualPropertyTax) / inputs.annualPropertyTax;
    
    if (difference > 0.5) {
      errors.push('Tax rate and property value do not align with annual property tax amount');
    }
  }

  // Date consistency validations
  if (inputs.closingDate !== undefined && inputs.assessmentDate !== undefined) {
    const closingDate = new Date(inputs.closingDate);
    const assessmentDate = new Date(inputs.assessmentDate);
    
    if (assessmentDate > closingDate) {
      errors.push('Assessment date cannot be after closing date');
    }
  }

  if (inputs.closingDate !== undefined && inputs.taxYear !== undefined) {
    const closingDate = new Date(inputs.closingDate);
    const closingYear = closingDate.getFullYear();
    
    if (closingYear !== inputs.taxYear && closingYear !== inputs.taxYear + 1) {
      errors.push('Closing date should be in the tax year or the following year');
    }
  }

  // Tax payment schedule validation
  if (inputs.taxPaymentSchedule === 'monthly' && inputs.annualPropertyTax !== undefined) {
    if (inputs.annualPropertyTax < 1200) {
      errors.push('Monthly tax payments are unusual for low annual tax amounts');
    }
  }

  return errors;
}