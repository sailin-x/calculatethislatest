import { QuickValidationResult } from '../../../types/calculator';
import { NetOperatingIncomeInputs } from './formulas';

export function quickValidateGrossRentalIncome(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Gross Rental Income is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Gross Rental Income must be non-negative', severity: 'error' };
  }
  if (value > 10000000) {
    return { isValid: true, message: 'Gross Rental Income seems unusually high - please verify', severity: 'warning' };
  }
  if (value === 0) {
    return { isValid: true, message: 'Gross Rental Income of zero may indicate an issue', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateOtherIncome(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Other Income must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateVacancyLoss(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Vacancy Loss is required', severity: 'error' };
  }
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Vacancy Loss must be between 0% and 100%', severity: 'error' };
  }
  if (value > 50) {
    return { isValid: true, message: 'Vacancy Loss above 50% indicates significant issues', severity: 'warning' };
  }
  if (value > 20) {
    return { isValid: true, message: 'High vacancy rate may indicate market or management issues', severity: 'warning' };
  }
  if (value < 2) {
    return { isValid: true, message: 'Very low vacancy rate - excellent tenant retention', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePropertyManagementFee(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Property Management Fee must be between 0% and 20%', severity: 'error' };
  }
  if (value > 15) {
    return { isValid: true, message: 'Property management fee seems high', severity: 'warning' };
  }
  if (value > 10) {
    return { isValid: true, message: 'Above average property management fee', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePropertyTaxes(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Property Taxes is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property Taxes must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateInsurance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Insurance is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Insurance must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateUtilities(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Utilities is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Utilities must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateMaintenance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Maintenance is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Maintenance must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLandscaping(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Landscaping must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateCleaning(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Cleaning must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAdvertising(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Advertising must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLegalFees(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Legal Fees must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAccountingFees(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Accounting Fees must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateHoaFees(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'HOA Fees must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateTrashRemoval(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Trash Removal must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateSecurity(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Security must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateOtherExpenses(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Other Expenses must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAllInputs(inputs: Partial<NetOperatingIncomeInputs>): QuickValidationResult[] {
  return [
    quickValidateGrossRentalIncome(inputs.grossRentalIncome),
    quickValidateOtherIncome(inputs.otherIncome),
    quickValidateVacancyLoss(inputs.vacancyLoss),
    quickValidatePropertyManagementFee(inputs.propertyManagementFee),
    quickValidatePropertyTaxes(inputs.propertyTaxes),
    quickValidateInsurance(inputs.insurance),
    quickValidateUtilities(inputs.utilities),
    quickValidateMaintenance(inputs.maintenance),
    quickValidateLandscaping(inputs.landscaping),
    quickValidateCleaning(inputs.cleaning),
    quickValidateAdvertising(inputs.advertising),
    quickValidateLegalFees(inputs.legalFees),
    quickValidateAccountingFees(inputs.accountingFees),
    quickValidateHoaFees(inputs.hoaFees),
    quickValidateTrashRemoval(inputs.trashRemoval),
    quickValidateSecurity(inputs.security),
    quickValidateOtherExpenses(inputs.otherExpenses)
  ];
}