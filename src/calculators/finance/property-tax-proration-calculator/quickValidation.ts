import { ValidationResult } from '../../types/calculator';

/**
 * Quick validation functions for individual property tax proration calculator fields
 * Each function validates a single field and includes allInputs parameter
 */

export function validateCalculationType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { calculationType: 'Calculation type is required' } };
  }

  const validTypes = [
    'proration', 'from_assessed_value', 'appeal_savings',
    'escrow', 'assessment_change', 'tax_cap', 'comprehensive'
  ];

  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { calculationType: 'Please select a valid calculation type' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAnnualPropertyTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional for some calculation types
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 1000000) {
    return { isValid: false, errors: { annualPropertyTax: 'Annual property tax must be between $0 and $1,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateSalePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0 || numValue > 100000000) {
    return { isValid: false, errors: { salePrice: 'Sale price must be between $1 and $100,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100000000) {
    return { isValid: false, errors: { assessedValue: 'Assessed value must be between $0 and $100,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateMillageRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 500) {
    return { isValid: false, errors: { millageRate: 'Millage rate must be between 0 and 500 mills' } };
  }

  return { isValid: true, errors: {} };
}

export function validateExemptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { exemptions: 'Exemptions cannot be negative' } };
  }

  if (numValue > 1000000) {
    return { isValid: false, errors: { exemptions: 'Exemptions seem unreasonably high' } };
  }

  // Check if exemptions exceed assessed value
  if (allInputs?.assessedValue && numValue > allInputs.assessedValue) {
    return { isValid: false, errors: { exemptions: 'Exemptions cannot exceed assessed value' } };
  }

  return { isValid: true, errors: {} };
}

export function validateSpecialAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { specialAssessments: 'Special assessments cannot be negative' } };
  }

  if (numValue > 100000) {
    return { isValid: false, errors: { specialAssessments: 'Special assessments seem unreasonably high' } };
  }

  return { isValid: true, errors: {} };
}

export function validateCurrentAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100000000) {
    return { isValid: false, errors: { currentAssessedValue: 'Current assessed value must be between $0 and $100,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAppealedAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100000000) {
    return { isValid: false, errors: { appealedAssessedValue: 'Appealed assessed value must be between $0 and $100,000,000' } };
  }

  // Check if appealed value exceeds current value
  if (allInputs?.currentAssessedValue && numValue > allInputs.currentAssessedValue) {
    return { isValid: false, errors: { appealedAssessedValue: 'Appealed value cannot exceed current assessed value' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAppealCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { appealCost: 'Appeal cost cannot be negative' } };
  }

  if (numValue > 50000) {
    return { isValid: false, errors: { appealCost: 'Appeal cost seems unreasonably high' } };
  }

  return { isValid: true, errors: {} };
}

export function validateSuccessProbability(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, errors: { successProbability: 'Success probability must be between 0% and 100%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateEscrowMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 24) {
    return { isValid: false, errors: { escrowMonths: 'Escrow months must be between 1 and 24' } };
  }

  return { isValid: true, errors: {} };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot be negative' } };
  }

  return { isValid: true, errors: {} };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { monthlyPayment: 'Monthly payment cannot be negative' } };
  }

  return { isValid: true, errors: {} };
}

export function validateCushionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { cushionAmount: 'Cushion amount cannot be negative' } };
  }

  return { isValid: true, errors: {} };
}

export function validatePreviousAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100000000) {
    return { isValid: false, errors: { previousAssessedValue: 'Previous assessed value must be between $0 and $100,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateNewAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100000000) {
    return { isValid: false, errors: { newAssessedValue: 'New assessed value must be between $0 and $100,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAssessmentYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  const currentYear = new Date().getFullYear();
  if (isNaN(numValue) || numValue < 1900 || numValue > currentYear + 10) {
    return { isValid: false, errors: { assessmentYear: `Assessment year must be between 1900 and ${currentYear + 10}` } };
  }

  return { isValid: true, errors: {} };
}

export function validateHomesteadExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { homesteadExemption: 'Homestead exemption cannot be negative' } };
  }

  if (numValue > 100000) {
    return { isValid: false, errors: { homesteadExemption: 'Homestead exemption seems unreasonably high' } };
  }

  return { isValid: true, errors: {} };
}

export function validatePortabilityAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { portabilityAmount: 'Portability amount cannot be negative' } };
  }

  if (numValue > 1000000) {
    return { isValid: false, errors: { portabilityAmount: 'Portability amount seems unreasonably high' } };
  }

  // Check if portability amount exceeds new assessed value
  if (allInputs?.newAssessedValue && numValue > allInputs.newAssessedValue) {
    return { isValid: false, errors: { portabilityAmount: 'Portability amount cannot exceed new assessed value' } };
  }

  return { isValid: true, errors: {} };
}

export function validatePreviousYearTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 1000000) {
    return { isValid: false, errors: { previousYearTax: 'Previous year tax must be between $0 and $1,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateTaxCapPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, errors: { taxCapPercentage: 'Tax cap percentage must be between 0% and 100%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateCapType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const validTypes = ['hard_cap', 'soft_cap', 'no_cap'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { capType: 'Please select a valid cap type' } };
  }

  return { isValid: true, errors: {} };
}

export function validateProrationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const validMethods = ['365_day', '366_day', 'actual_days'];
  if (!validMethods.includes(value)) {
    return { isValid: false, errors: { prorationMethod: 'Please select a valid proration method' } };
  }

  return { isValid: true, errors: {} };
}

export function validateSellerPaysTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  // Boolean field - any value is acceptable as it will be coerced
  return { isValid: true, errors: {} };
}

export function validateClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { closingDate: 'Please enter a valid date' } };
  }

  // Check if within tax year period
  if (allInputs?.taxYearStart && allInputs?.taxYearEnd) {
    const start = new Date(allInputs.taxYearStart);
    const end = new Date(allInputs.taxYearEnd);
    if (date < start || date > end) {
      return { isValid: false, errors: { closingDate: 'Closing date must be within the tax year period' } };
    }
  }

  return { isValid: true, errors: {} };
}

export function validateTaxYearStart(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { taxYearStart: 'Please enter a valid date' } };
  }

  return { isValid: true, errors: {} };
}

export function validateTaxYearEnd(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { taxYearEnd: 'Please enter a valid date' } };
  }

  // Check if end date is after start date
  if (allInputs?.taxYearStart) {
    const start = new Date(allInputs.taxYearStart);
    if (date <= start) {
      return { isValid: false, errors: { taxYearEnd: 'Tax year end must be after tax year start' } };
    }
  }

  return { isValid: true, errors: {} };
}