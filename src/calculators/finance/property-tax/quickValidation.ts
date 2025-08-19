import { QuickValidationResult } from '../../types/QuickValidationResult';
import { PropertyTaxInputs } from './formulas';

/**
 * Quick validate property value
 */
export function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Property value must be positive', severity: 'error' };
  }
  if (value < 10000) {
    return { isValid: false, message: 'Property value seems too low', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Property value seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid property value', severity: 'success' };
}

/**
 * Quick validate assessed value
 */
export function quickValidateAssessedValue(value: number, propertyValue: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Assessed value must be positive', severity: 'error' };
  }
  if (value > propertyValue * 1.5) {
    return { isValid: false, message: 'Assessed value is unusually high compared to property value', severity: 'warning' };
  }
  if (value < propertyValue * 0.5) {
    return { isValid: false, message: 'Assessed value is unusually low compared to property value', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid assessed value', severity: 'success' };
}

/**
 * Quick validate tax rate
 */
export function quickValidateTaxRate(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Tax rate must be positive', severity: 'error' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Tax rate seems unusually high', severity: 'warning' };
  }
  if (value < 0.1) {
    return { isValid: false, message: 'Tax rate seems unusually low', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid tax rate', severity: 'success' };
}

/**
 * Quick validate homestead exemption
 */
export function quickValidateHomesteadExemption(value: number, propertyValue: number, propertyType: string): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Homestead exemption cannot be negative', severity: 'error' };
  }
  if (propertyType !== 'residential' && value > 0) {
    return { isValid: false, message: 'Homestead exemption not applicable to this property type', severity: 'warning' };
  }
  if (value > propertyValue * 0.3) {
    return { isValid: false, message: 'Homestead exemption seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid homestead exemption', severity: 'success' };
}

/**
 * Quick validate senior exemption
 */
export function quickValidateSeniorExemption(value: number, propertyValue: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Senior exemption cannot be negative', severity: 'error' };
  }
  if (value > propertyValue * 0.2) {
    return { isValid: false, message: 'Senior exemption seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid senior exemption', severity: 'success' };
}

/**
 * Quick validate veteran exemption
 */
export function quickValidateVeteranExemption(value: number, propertyValue: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Veteran exemption cannot be negative', severity: 'error' };
  }
  if (value > propertyValue * 0.15) {
    return { isValid: false, message: 'Veteran exemption seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid veteran exemption', severity: 'success' };
}

/**
 * Quick validate disability exemption
 */
export function quickValidateDisabilityExemption(value: number, propertyValue: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Disability exemption cannot be negative', severity: 'error' };
  }
  if (value > propertyValue * 0.25) {
    return { isValid: false, message: 'Disability exemption seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid disability exemption', severity: 'success' };
}

/**
 * Quick validate green energy exemption
 */
export function quickValidateGreenEnergyExemption(value: number, propertyValue: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Green energy exemption cannot be negative', severity: 'error' };
  }
  if (value > propertyValue * 0.2) {
    return { isValid: false, message: 'Green energy exemption seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid green energy exemption', severity: 'success' };
}

/**
 * Quick validate assessment ratio
 */
export function quickValidateAssessmentRatio(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Assessment ratio must be positive', severity: 'error' };
  }
  if (value < 50) {
    return { isValid: false, message: 'Assessment ratio seems unusually low', severity: 'warning' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Assessment ratio cannot exceed 100%', severity: 'error' };
  }
  return { isValid: true, message: 'Valid assessment ratio', severity: 'success' };
}

/**
 * Quick validate late payment penalty
 */
export function quickValidateLatePaymentPenalty(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Late payment penalty cannot be negative', severity: 'error' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Late payment penalty seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid late payment penalty', severity: 'success' };
}

/**
 * Quick validate early payment discount
 */
export function quickValidateEarlyPaymentDiscount(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Early payment discount cannot be negative', severity: 'error' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Early payment discount seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid early payment discount', severity: 'success' };
}

/**
 * Quick validate special assessments
 */
export function quickValidateSpecialAssessments(value: number, propertyValue: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Special assessments cannot be negative', severity: 'error' };
  }
  if (value > propertyValue * 0.1) {
    return { isValid: false, message: 'Special assessments seem unusually high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid special assessments', severity: 'success' };
}

/**
 * Quick validate tax year
 */
export function quickValidateTaxYear(value: number): QuickValidationResult {
  const currentYear = new Date().getFullYear();
  if (value < 2020 || value > 2030) {
    return { isValid: false, message: 'Tax year must be between 2020 and 2030', severity: 'error' };
  }
  if (value > currentYear + 1) {
    return { isValid: false, message: 'Tax year seems to be in the future', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid tax year', severity: 'success' };
}

/**
 * Quick validate all property tax inputs
 */
export function quickValidateAllInputs(inputs: Partial<PropertyTaxInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  // Property Value
  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  } else {
    results.push({ isValid: false, message: 'Property value is required', severity: 'error' });
  }

  // Assessed Value
  if (inputs.assessedValue !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateAssessedValue(inputs.assessedValue, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Assessed value (optional)', severity: 'info' });
  }

  // Tax Rate
  if (inputs.taxRate !== undefined) {
    results.push(quickValidateTaxRate(inputs.taxRate));
  } else {
    results.push({ isValid: false, message: 'Tax rate is required', severity: 'error' });
  }

  // Property Type
  if (inputs.propertyType !== undefined) {
    results.push({ isValid: true, message: 'Valid property type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Property type is required', severity: 'error' });
  }

  // Homestead Exemption
  if (inputs.homesteadExemption !== undefined && inputs.propertyValue !== undefined && inputs.propertyType !== undefined) {
    results.push(quickValidateHomesteadExemption(inputs.homesteadExemption, inputs.propertyValue, inputs.propertyType));
  } else {
    results.push({ isValid: true, message: 'Homestead exemption (optional)', severity: 'info' });
  }

  // Senior Exemption
  if (inputs.seniorExemption !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateSeniorExemption(inputs.seniorExemption, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Senior exemption (optional)', severity: 'info' });
  }

  // Veteran Exemption
  if (inputs.veteranExemption !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateVeteranExemption(inputs.veteranExemption, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Veteran exemption (optional)', severity: 'info' });
  }

  // Disability Exemption
  if (inputs.disabilityExemption !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateDisabilityExemption(inputs.disabilityExemption, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Disability exemption (optional)', severity: 'info' });
  }

  // Green Energy Exemption
  if (inputs.greenEnergyExemption !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateGreenEnergyExemption(inputs.greenEnergyExemption, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Green energy exemption (optional)', severity: 'info' });
  }

  // Assessment Ratio
  if (inputs.assessmentRatio !== undefined) {
    results.push(quickValidateAssessmentRatio(inputs.assessmentRatio));
  } else {
    results.push({ isValid: true, message: 'Assessment ratio (optional)', severity: 'info' });
  }

  // Payment Frequency
  if (inputs.paymentFrequency !== undefined) {
    results.push({ isValid: true, message: 'Valid payment frequency', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Payment frequency is required', severity: 'error' });
  }

  // Escrow Included
  if (inputs.escrowIncluded !== undefined) {
    results.push({ isValid: true, message: 'Valid escrow setting', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Escrow setting is required', severity: 'error' });
  }

  // Late Payment Penalty
  if (inputs.latePaymentPenalty !== undefined) {
    results.push(quickValidateLatePaymentPenalty(inputs.latePaymentPenalty));
  } else {
    results.push({ isValid: true, message: 'Late payment penalty (optional)', severity: 'info' });
  }

  // Early Payment Discount
  if (inputs.earlyPaymentDiscount !== undefined) {
    results.push(quickValidateEarlyPaymentDiscount(inputs.earlyPaymentDiscount));
  } else {
    results.push({ isValid: true, message: 'Early payment discount (optional)', severity: 'info' });
  }

  // Special Assessments
  if (inputs.specialAssessments !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateSpecialAssessments(inputs.specialAssessments, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Special assessments (optional)', severity: 'info' });
  }

  // Tax Year
  if (inputs.taxYear !== undefined) {
    results.push(quickValidateTaxYear(inputs.taxYear));
  } else {
    results.push({ isValid: true, message: 'Tax year (optional)', severity: 'info' });
  }

  return results;
}