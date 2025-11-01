import { NetOperatingIncomeInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateRentalIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Rental income cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Rental income seems unusually high' };
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
  if (value < 0) {
    return { isValid: false, message: 'Property management expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Maintenance expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateRepairs(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Repairs expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Utilities expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Insurance expense cannot be negative' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  return { isValid: true };
}

export function validateLegalFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Legal fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateAdvertising(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Advertising expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateSupplies(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Supplies expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateOtherExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Other expenses cannot be negative' };
  }
  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.includeVacancyAllowance) {
    if (value < 0 || value > 100) {
      return { isValid: false, message: 'Vacancy rate must be between 0% and 100%' };
    }
  }
  return { isValid: true };
}

export function validateReplacementReserveRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.includeReplacementReserve) {
    if (value < 0 || value > 50) {
      return { isValid: false, message: 'Replacement reserve rate must be between 0% and 50%' };
    }
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validPeriods = ['monthly', 'annual'];
  if (!validPeriods.includes(value)) {
    return { isValid: false, message: 'Analysis period must be monthly or annual' };
  }
  return { isValid: true };
}