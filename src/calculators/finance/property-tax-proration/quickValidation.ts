import { QuickValidationResult } from '../../types/QuickValidationResult';
import { PropertyTaxProrationInputs } from './formulas';

/**
 * Quick validate annual property tax
 */
export function quickValidateAnnualPropertyTax(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Annual property tax must be positive', severity: 'error' };
  }
  if (value < 100) {
    return { isValid: false, message: 'Annual property tax seems too low', severity: 'warning' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Annual property tax seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid annual property tax', severity: 'success' };
}

/**
 * Quick validate closing date
 */
export function quickValidateClosingDate(value: string): QuickValidationResult {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Closing date must be a valid date', severity: 'error' };
  }
  
  const currentYear = new Date().getFullYear();
  if (date.getFullYear() < 2020 || date.getFullYear() > 2030) {
    return { isValid: false, message: 'Closing date should be between 2020 and 2030', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Valid closing date', severity: 'success' };
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
 * Quick validate seller paid taxes
 */
export function quickValidateSellerPaidTaxes(value: number, annualPropertyTax?: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Seller paid taxes cannot be negative', severity: 'error' };
  }
  if (annualPropertyTax && value > annualPropertyTax) {
    return { isValid: false, message: 'Seller paid taxes cannot exceed annual property tax', severity: 'error' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Seller paid taxes seem too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid seller paid taxes', severity: 'success' };
}

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
 * Quick validate exemptions
 */
export function quickValidateExemptions(value: number, propertyValue?: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Exemptions cannot be negative', severity: 'error' };
  }
  if (propertyValue && value > propertyValue * 0.5) {
    return { isValid: false, message: 'Exemptions seem unusually high compared to property value', severity: 'warning' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Exemptions seem too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid exemptions', severity: 'success' };
}

/**
 * Quick validate special assessments
 */
export function quickValidateSpecialAssessments(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Special assessments cannot be negative', severity: 'error' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Special assessments seem too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid special assessments', severity: 'success' };
}

/**
 * Quick validate late payment penalty
 */
export function quickValidateLatePaymentPenalty(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Late payment penalty cannot be negative', severity: 'error' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Late payment penalty seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid late payment penalty', severity: 'success' };
}

/**
 * Quick validate tax payment dates
 */
export function quickValidateTaxPaymentDates(value: string): QuickValidationResult {
  if (!value.trim()) {
    return { isValid: true, message: 'Tax payment dates (optional)', severity: 'info' };
  }
  
  const dates = value.split(',').map(date => date.trim());
  for (const date of dates) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return { isValid: false, message: `Invalid date format: ${date}`, severity: 'error' };
    }
  }
  
  if (dates.length > 12) {
    return { isValid: false, message: 'Too many payment dates specified', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Valid tax payment dates', severity: 'success' };
}

/**
 * Quick validate assessment date
 */
export function quickValidateAssessmentDate(value: string): QuickValidationResult {
  if (!value.trim()) {
    return { isValid: true, message: 'Assessment date (optional)', severity: 'info' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Assessment date must be a valid date', severity: 'error' };
  }
  
  const currentYear = new Date().getFullYear();
  if (date.getFullYear() < 2020 || date.getFullYear() > 2030) {
    return { isValid: false, message: 'Assessment date should be between 2020 and 2030', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Valid assessment date', severity: 'success' };
}

/**
 * Quick validate date consistency
 */
export function quickValidateDateConsistency(
  closingDate?: string,
  assessmentDate?: string,
  taxYear?: number
): QuickValidationResult {
  if (!closingDate || !assessmentDate) {
    return { isValid: true, message: 'Date consistency (requires both dates)', severity: 'info' };
  }
  
  const closing = new Date(closingDate);
  const assessment = new Date(assessmentDate);
  
  if (assessment > closing) {
    return { isValid: false, message: 'Assessment date cannot be after closing date', severity: 'error' };
  }
  
  if (taxYear && closing.getFullYear() !== taxYear && closing.getFullYear() !== taxYear + 1) {
    return { isValid: false, message: 'Closing date should be in tax year or following year', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Dates are consistent', severity: 'success' };
}

/**
 * Quick validate all property tax proration inputs
 */
export function quickValidateAllInputs(inputs: Partial<PropertyTaxProrationInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  // Annual Property Tax
  if (inputs.annualPropertyTax !== undefined) {
    results.push(quickValidateAnnualPropertyTax(inputs.annualPropertyTax));
  } else {
    results.push({ isValid: false, message: 'Annual property tax is required', severity: 'error' });
  }

  // Closing Date
  if (inputs.closingDate !== undefined) {
    results.push(quickValidateClosingDate(inputs.closingDate));
  } else {
    results.push({ isValid: false, message: 'Closing date is required', severity: 'error' });
  }

  // Tax Year
  if (inputs.taxYear !== undefined) {
    results.push(quickValidateTaxYear(inputs.taxYear));
  } else {
    results.push({ isValid: false, message: 'Tax year is required', severity: 'error' });
  }

  // Tax Payment Schedule
  if (inputs.taxPaymentSchedule !== undefined) {
    results.push({ isValid: true, message: 'Valid tax payment schedule', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Tax payment schedule is required', severity: 'error' });
  }

  // Proration Method
  if (inputs.prorationMethod !== undefined) {
    results.push({ isValid: true, message: 'Valid proration method', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Proration method is required', severity: 'error' });
  }

  // Seller Paid Taxes
  if (inputs.sellerPaidTaxes !== undefined) {
    results.push(quickValidateSellerPaidTaxes(inputs.sellerPaidTaxes, inputs.annualPropertyTax));
  } else {
    results.push({ isValid: true, message: 'Seller paid taxes (optional)', severity: 'info' });
  }

  // Tax Payment Dates
  if (inputs.taxPaymentDates !== undefined) {
    results.push(quickValidateTaxPaymentDates(inputs.taxPaymentDates));
  } else {
    results.push({ isValid: true, message: 'Tax payment dates (optional)', severity: 'info' });
  }

  // Assessment Date
  if (inputs.assessmentDate !== undefined) {
    results.push(quickValidateAssessmentDate(inputs.assessmentDate));
  } else {
    results.push({ isValid: true, message: 'Assessment date (optional)', severity: 'info' });
  }

  // Property Value
  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Property value (optional)', severity: 'info' });
  }

  // Tax Rate
  if (inputs.taxRate !== undefined) {
    results.push(quickValidateTaxRate(inputs.taxRate));
  } else {
    results.push({ isValid: true, message: 'Tax rate (optional)', severity: 'info' });
  }

  // Exemptions
  if (inputs.exemptions !== undefined) {
    results.push(quickValidateExemptions(inputs.exemptions, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Exemptions (optional)', severity: 'info' });
  }

  // Special Assessments
  if (inputs.specialAssessments !== undefined) {
    results.push(quickValidateSpecialAssessments(inputs.specialAssessments));
  } else {
    results.push({ isValid: true, message: 'Special assessments (optional)', severity: 'info' });
  }

  // Escrow Account
  if (inputs.escrowAccount !== undefined) {
    results.push({ isValid: true, message: 'Valid escrow account setting', severity: 'success' });
  } else {
    results.push({ isValid: true, message: 'Escrow account (optional)', severity: 'info' });
  }

  // Late Payment Penalty
  if (inputs.latePaymentPenalty !== undefined) {
    results.push(quickValidateLatePaymentPenalty(inputs.latePaymentPenalty));
  } else {
    results.push({ isValid: true, message: 'Late payment penalty (optional)', severity: 'info' });
  }

  // Calculation Type
  if (inputs.calculationType !== undefined) {
    results.push({ isValid: true, message: 'Valid calculation type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Calculation type is required', severity: 'error' });
  }

  // Date Consistency
  results.push(quickValidateDateConsistency(inputs.closingDate, inputs.assessmentDate, inputs.taxYear));

  return results;
}