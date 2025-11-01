import { OpportunityZoneInvestmentRoiInputs } from './types';

export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Initial investment must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Initial investment cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInvestmentDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Investment date is required' };
  }
  const investmentDate = new Date(value);
  const now = new Date();
  if (investmentDate > now) {
    return { isValid: false, message: 'Investment date cannot be in the future' };
  }
  return { isValid: true };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Holding period must be greater than 0 years' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Holding period cannot exceed 10 years' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateStepUpInBasis(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Step-up in basis must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateCapitalGainsTaxReduction(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Capital gains tax reduction must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateExpectedAppreciation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Expected appreciation must be between -10% and 30%' };
  }
  return { isValid: true };
}

export function validateExpectedRentalIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Expected rental income cannot be negative' };
  }
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Operating expenses cannot be negative' };
  }
  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Vacancy rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateLeverageRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 90) {
    return { isValid: false, message: 'Leverage ratio must be between 0% and 90%' };
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

export function validateExitCapRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 20) {
    return { isValid: false, message: 'Exit cap rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateExitYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 10) {
    return { isValid: false, message: 'Exit year must be between 1 and 10' };
  }
  return { isValid: true };
}

export function validateCapitalGainsTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Capital gains tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateOrdinaryIncomeTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Ordinary income tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'State tax rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateAcquisitionCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Acquisition costs must be between 0% and 10% of property value' };
  }
  return { isValid: true };
}

export function validateAnnualManagementFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Annual management fees must be between 0% and 20% of rental income' };
  }
  return { isValid: true };
}

export function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Property insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  return { isValid: true };
}

export function validateMaintenanceReserves(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Maintenance reserves must be between 0% and 10% of rental income' };
  }
  return { isValid: true };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Market growth rate must be between -10% and 30%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}