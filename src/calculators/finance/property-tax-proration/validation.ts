import { PropertyTaxProrationInputs, PropertyTaxProrationValidation } from './types';

export function validatePropertyTaxProrationInputs(inputs: PropertyTaxProrationInputs): PropertyTaxProrationValidation {
  return {
    annualPropertyTax: validateAnnualPropertyTax(inputs.annualPropertyTax),
    closingDate: validateClosingDate(inputs.closingDate),
    taxYear: validateTaxYear(inputs.taxYear),
    paymentSchedule: validatePaymentSchedule(inputs.paymentSchedule),
    sellerPaidMonths: validatePaidMonths(inputs.sellerPaidMonths),
    buyerPaidMonths: validatePaidMonths(inputs.buyerPaidMonths),
    prorationMethod: validateProrationMethod(inputs.prorationMethod),
    sellerCredits: validateCredits(inputs.sellerCredits),
    buyerCredits: validateCredits(inputs.buyerCredits),
    specialAssessments: validateSpecialAssessments(inputs.specialAssessments)
  };
}

export function validateAnnualPropertyTax(value: number): boolean {
  return value > 0 && value <= 10000000; // Max $10 million
}

export function validateClosingDate(date: string): boolean {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const currentYear = new Date().getFullYear();
  
  return !isNaN(dateObj.getTime()) && 
         dateObj.getFullYear() >= currentYear - 5 && 
         dateObj.getFullYear() <= currentYear + 5;
}

export function validateTaxYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= currentYear - 5 && year <= currentYear + 5;
}

export function validatePaymentSchedule(schedule: string): boolean {
  return ['annual', 'semi-annual', 'quarterly', 'monthly'].includes(schedule);
}

export function validatePaidMonths(months: number | undefined): boolean {
  if (months === undefined) return true;
  return months >= 0 && months <= 12;
}

export function validateProrationMethod(method: string): boolean {
  return ['365-day', '360-day', 'actual-days'].includes(method);
}

export function validateCredits(credits: number | undefined): boolean {
  if (credits === undefined) return true;
  return credits >= -1000000 && credits <= 1000000; // Max $1 million credit/debit
}

export function validateSpecialAssessments(assessments: number | undefined): boolean {
  if (assessments === undefined) return true;
  return assessments >= 0 && assessments <= 1000000; // Max $1 million
}

export function getValidationErrors(inputs: PropertyTaxProrationInputs): string[] {
  const errors: string[] = [];
  const validation = validatePropertyTaxProrationInputs(inputs);

  if (!validation.annualPropertyTax) {
    errors.push('Annual property tax must be greater than $0 and less than $10 million');
  }

  if (!validation.closingDate) {
    errors.push('Closing date must be a valid date within 5 years of current year');
  }

  if (!validation.taxYear) {
    errors.push('Tax year must be within 5 years of current year');
  }

  if (!validation.paymentSchedule) {
    errors.push('Payment schedule must be annual, semi-annual, quarterly, or monthly');
  }

  if (!validation.sellerPaidMonths) {
    errors.push('Seller paid months must be between 0 and 12');
  }

  if (!validation.buyerPaidMonths) {
    errors.push('Buyer paid months must be between 0 and 12');
  }

  if (!validation.prorationMethod) {
    errors.push('Proration method must be 365-day, 360-day, or actual-days');
  }

  if (!validation.sellerCredits) {
    errors.push('Seller credits must be between -$1 million and $1 million');
  }

  if (!validation.buyerCredits) {
    errors.push('Buyer credits must be between -$1 million and $1 million');
  }

  if (!validation.specialAssessments) {
    errors.push('Special assessments must be between $0 and $1 million');
  }

  return errors;
}

export function validatePropertyTaxProrationCalculation(inputs: PropertyTaxProrationInputs): boolean {
  const validation = validatePropertyTaxProrationInputs(inputs);
  return Object.values(validation).every(Boolean);
}