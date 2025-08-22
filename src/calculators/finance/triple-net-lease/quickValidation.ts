import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property value must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: true, message: 'Property value is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateDownPayment(value: any, propertyValue?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Down payment must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Down payment must be greater than 0' };
  }
  if (propertyValue && value >= propertyValue) {
    return { isValid: false, message: 'Down payment must be less than property value' };
  }
  if (propertyValue && value < propertyValue * 0.1) {
    return { isValid: true, message: 'Down payment is less than 10% of property value. This may affect loan approval' };
  }
  return { isValid: true, message: '' };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 25) {
    return { isValid: true, message: 'Interest rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Loan term must be greater than 0' };
  }
  if (value > 30) {
    return { isValid: true, message: 'Loan term is longer than typical commercial loans' };
  }
  return { isValid: true, message: '' };
}

export function validateAnnualRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Annual rent must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Annual rent must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: true, message: 'Annual rent is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: true, message: 'Property taxes are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Insurance cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: true, message: 'Insurance is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Maintenance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Maintenance cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: true, message: 'Maintenance costs are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyManagement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property management fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property management fee cannot be negative' };
  }
  if (value > 20) {
    return { isValid: true, message: 'Property management fee is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Vacancy rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Vacancy rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Vacancy rate cannot exceed 50%' };
  }
  return { isValid: true, message: '' };
}

export function validateAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Appreciation rate must be a valid number' };
  }
  if (value < -10) {
    return { isValid: false, message: 'Appreciation rate cannot be less than -10%' };
  }
  if (value > 15) {
    return { isValid: true, message: 'Appreciation rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateRentEscalation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Rent escalation rate must be a valid number' };
  }
  if (value < -5) {
    return { isValid: false, message: 'Rent escalation rate cannot be less than -5%' };
  }
  if (value > 10) {
    return { isValid: true, message: 'Rent escalation rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateLeaseTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Lease term must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Lease term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: true, message: 'Lease term is very long. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateTenantCreditRating(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Tenant credit rating must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Property type must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Analysis period must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Analysis period must be greater than 0' };
  }
  if (value > 30) {
    return { isValid: true, message: 'Analysis period is very long. Consider a shorter period' };
  }
  return { isValid: true, message: '' };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Closing costs must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: true, message: 'Closing costs are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateExitCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Exit cap rate must be a valid number' };
  }
  if (value < 3) {
    return { isValid: false, message: 'Exit cap rate cannot be less than 3%' };
  }
  if (value > 12) {
    return { isValid: false, message: 'Exit cap rate cannot exceed 12%' };
  }
  return { isValid: true, message: '' };
}

export function validateAllTripleNetLeaseROIInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    validatePropertyValue(inputs.propertyValue),
    validateDownPayment(inputs.downPayment, inputs.propertyValue),
    validateInterestRate(inputs.interestRate),
    validateLoanTerm(inputs.loanTerm),
    validateAnnualRent(inputs.annualRent),
    validatePropertyTaxes(inputs.propertyTaxes),
    validateInsurance(inputs.insurance),
    validateMaintenance(inputs.maintenance),
    validatePropertyManagement(inputs.propertyManagement),
    validateVacancyRate(inputs.vacancyRate),
    validateAppreciationRate(inputs.appreciationRate),
    validateRentEscalation(inputs.rentEscalation),
    validateLeaseTerm(inputs.leaseTerm),
    validateTenantCreditRating(inputs.tenantCreditRating),
    validatePropertyType(inputs.propertyType),
    validateAnalysisPeriod(inputs.analysisPeriod),
    validateClosingCosts(inputs.closingCosts),
    validateExitCapRate(inputs.exitCapRate)
  ];

  const errors = validations.filter(v => !v.isValid);
  const warnings = validations.filter(v => v.isValid && v.message);

  if (errors.length > 0) {
    return { isValid: false, message: errors[0].message };
  }

  if (warnings.length > 0) {
    return { isValid: true, message: warnings[0].message };
  }

  return { isValid: true, message: '' };
}
