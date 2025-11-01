import { NetOperatingIncomeNoiInputs } from './types';

export function validateGrossRentalIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Gross rental income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Gross rental income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateOtherIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Other income cannot be negative' };
  }
  return { isValid: true };
}

export function validatePropertyManagement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Property management fee must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Maintenance expense must be between 0% and 10% of gross income' };
  }
  return { isValid: true };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Utilities cannot be negative' };
  }
  return { isValid: true };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  if (value > 50000000) {
    return { isValid: false, message: 'Property value cannot exceed $50,000,000' };
  }
  return { isValid: true };
}

export function validateSquareFootage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Square footage must be greater than 0' };
  }
  return { isValid: true };
}

export function validateNumberOfUnits(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Number of units must be greater than 0' };
  }
  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Vacancy rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateMarketRentPerSqFt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Market rent per square foot cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpenseGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Expense growth rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateIncomeGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Income growth rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateMarketCapRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 20) {
    return { isValid: false, message: 'Market cap rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateTargetCapRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 20) {
    return { isValid: false, message: 'Target cap rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Loan amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Interest rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 50) {
    return { isValid: false, message: 'Loan term must be between 1 and 50 years' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Down payment must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateDepreciationYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 50) {
    return { isValid: false, message: 'Depreciation years must be between 1 and 50' };
  }
  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Marginal tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}