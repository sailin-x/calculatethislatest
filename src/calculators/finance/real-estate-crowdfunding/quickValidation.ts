import { RealEstateCrowdfundingInputs } from './types';

export function validateInvestmentAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Investment amount must be a positive number' };
  }

  if (allInputs?.minimumInvestment && value < allInputs.minimumInvestment) {
    return { isValid: false, error: `Investment amount cannot be less than minimum investment of $${allInputs.minimumInvestment.toLocaleString()}` };
  }

  if (allInputs?.maximumInvestment && value > allInputs.maximumInvestment) {
    return { isValid: false, error: `Investment amount cannot exceed maximum investment of $${allInputs.maximumInvestment.toLocaleString()}` };
  }

  if (allInputs?.totalProjectCost && value > allInputs.totalProjectCost) {
    return { isValid: false, error: 'Investment amount cannot exceed total project cost' };
  }

  return { isValid: true };
}

export function validateTotalProjectCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Total project cost must be a positive number' };
  }

  if (allInputs?.investmentAmount && value < allInputs.investmentAmount) {
    return { isValid: false, error: 'Total project cost cannot be less than investment amount' };
  }

  return { isValid: true };
}

export function validateAnnualRentIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual rent income must be a non-negative number' };
  }

  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Operating expenses must be a non-negative number' };
  }

  return { isValid: true };
}

export function validateLoanToValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'LoanToValue ratio must be between 0 and 100' };
  }

  if (value > 80) {
    return { isValid: true, error: 'Warning: High LTV ratio may increase investment risk' };
  }

  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 30)) {
    return { isValid: false, error: 'Interest rate must be between 0 and 30 percent' };
  }

  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Loan term must be a positive number' };
  }

  if (allInputs?.expectedHoldPeriod && value > allInputs.expectedHoldPeriod) {
    return { isValid: false, error: 'Loan term cannot exceed expected hold period' };
  }

  return { isValid: true };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Occupancy rate must be between 0 and 100 percent' };
  }

  if (value < 90) {
    return { isValid: true, error: 'Warning: Low occupancy rate may impact cash flow' };
  }

  return { isValid: true };
}

export function validateCapRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0 || value > 20)) {
    return { isValid: false, error: 'Cap rate must be between 0 and 20 percent' };
  }

  if (allInputs?.marketCapRate && value > allInputs.marketCapRate * 1.2) {
    return { isValid: true, error: 'Warning: Cap rate significantly above market average' };
  }

  return { isValid: true };
}

export function validateExpectedHoldPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Expected hold period must be a positive number' };
  }

  if (value < 36) {
    return { isValid: true, error: 'Warning: Short hold period may limit appreciation potential' };
  }

  return { isValid: true };
}

export function validateExpectedExitValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Expected exit value must be a positive number' };
  }

  if (allInputs?.totalProjectCost && value < allInputs.totalProjectCost * 0.8) {
    return { isValid: true, error: 'Warning: Expected exit value is significantly below project cost' };
  }

  return { isValid: true };
}

export function validatePlatformFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Platform fee must be between 0 and 100 percent' };
  }

  if (value > 5) {
    return { isValid: true, error: 'Warning: High platform fee may reduce investor returns' };
  }

  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Property value must be a positive number' };
  }

  return { isValid: true };
}

export function validateMinimumInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Minimum investment must be a positive number' };
  }

  if (allInputs?.maximumInvestment && value > allInputs.maximumInvestment) {
    return { isValid: false, error: 'Minimum investment cannot exceed maximum investment' };
  }

  return { isValid: true };
}

export function validateMaximumInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Maximum investment must be a positive number' };
  }

  if (allInputs?.minimumInvestment && value < allInputs.minimumInvestment) {
    return { isValid: false, error: 'Maximum investment cannot be less than minimum investment' };
  }

  return { isValid: true };
}

export function validateNumberOfInvestors(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Number of investors must be a positive number' };
  }

  return { isValid: true };
}

export function validateInvestorEquity(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Investor equity must be a positive number' };
  }

  return { isValid: true };
}

export function validatePropertyLocation(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return { isValid: false, error: 'Property location is required' };
  }

  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['residential', 'commercial', 'mixed_use', 'industrial'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid property type' };
  }

  return { isValid: true };
}

export function validateProjectStage(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validStages = ['pre_construction', 'under_construction', 'stabilized', 'redevelopment'];
  if (!value || !validStages.includes(value)) {
    return { isValid: false, error: 'Please select a valid project stage' };
  }

  return { isValid: true };
}

export function validateTenantQuality(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validQualities = ['A', 'B', 'C', 'D'];
  if (!value || !validQualities.includes(value)) {
    return { isValid: false, error: 'Please select a valid tenant quality rating' };
  }

  return { isValid: true };
}

export function validateLocationRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Please select a valid location risk level' };
  }

  return { isValid: true };
}

export function validateMarketRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Please select a valid market risk level' };
  }

  return { isValid: true };
}

export function validateRegulatoryRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Please select a valid regulatory risk level' };
  }

  return { isValid: true };
}

export function validateDepreciationSchedule(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Depreciation schedule must be a positive number' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Analysis period must be a positive number' };
  }

  return { isValid: true };
}

export function validateCurrency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid currency' };
  }

  return { isValid: true };
}