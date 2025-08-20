import { QuickValidationResult } from '../../../types/QuickValidationResult';
import { RealEstateWaterfallModelInputs } from './formulas';

export function quickValidateAllInputs(inputs: RealEstateWaterfallModelInputs): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  results.push(quickValidateTotalEquity(inputs.totalEquity));
  results.push(quickValidateInvestorEquity(inputs.investorEquity));
  results.push(quickValidateSponsorEquity(inputs.sponsorEquity));
  results.push(quickValidateTotalCashFlow(inputs.totalCashFlow));
  results.push(quickValidatePreferredReturn(inputs.preferredReturn));
  results.push(quickValidateHoldingPeriod(inputs.holdingPeriod));
  results.push(quickValidateCatchUpPercentage(inputs.catchUpPercentage));
  results.push(quickValidatePromotePercentage(inputs.promotePercentage));
  results.push(quickValidateHurdleRate(inputs.hurdleRate));
  results.push(quickValidateWaterfallType(inputs.waterfallType));
  results.push(quickValidateClawbackProvision(inputs.clawbackProvision));
  results.push(quickValidateClawbackPercentage(inputs.clawbackPercentage));
  results.push(quickValidateManagementFee(inputs.managementFee));
  results.push(quickValidateAcquisitionFee(inputs.acquisitionFee));
  results.push(quickValidateDispositionFee(inputs.dispositionFee));
  results.push(quickValidateOperatingExpenses(inputs.operatingExpenses));
  results.push(quickValidateDebtService(inputs.debtService));
  results.push(quickValidateTaxRate(inputs.taxRate));
  results.push(quickValidateInflationRate(inputs.inflationRate));
  results.push(quickValidateExitValue(inputs.exitValue));
  results.push(quickValidateRemainingDebt(inputs.remainingDebt));

  return results;
}

function quickValidateTotalEquity(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'totalEquity', status: 'error', message: 'Total equity must be greater than 0' };
  }
  
  if (value > 100000000) {
    return { field: 'totalEquity', status: 'warning', message: 'Very high total equity - verify accuracy' };
  }
  
  return { field: 'totalEquity', status: 'success', message: 'Valid total equity' };
}

function quickValidateInvestorEquity(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'investorEquity', status: 'error', message: 'Investor equity must be non-negative' };
  }
  
  return { field: 'investorEquity', status: 'success', message: 'Valid investor equity' };
}

function quickValidateSponsorEquity(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'sponsorEquity', status: 'error', message: 'Sponsor equity must be non-negative' };
  }
  
  return { field: 'sponsorEquity', status: 'success', message: 'Valid sponsor equity' };
}

function quickValidateTotalCashFlow(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'totalCashFlow', status: 'error', message: 'Total cash flow is required' };
  }
  
  if (value < -100000000) {
    return { field: 'totalCashFlow', status: 'warning', message: 'Very negative cash flow - verify accuracy' };
  }
  
  return { field: 'totalCashFlow', status: 'success', message: 'Valid total cash flow' };
}

function quickValidatePreferredReturn(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'preferredReturn', status: 'error', message: 'Preferred return must be non-negative' };
  }
  
  if (value > 20) {
    return { field: 'preferredReturn', status: 'warning', message: 'Very high preferred return rate' };
  }
  
  return { field: 'preferredReturn', status: 'success', message: 'Valid preferred return' };
}

function quickValidateHoldingPeriod(value: number): QuickValidationResult {
  if (!value || value < 1) {
    return { field: 'holdingPeriod', status: 'error', message: 'Holding period must be at least 1 year' };
  }
  
  if (value > 25) {
    return { field: 'holdingPeriod', status: 'warning', message: 'Very long holding period' };
  }
  
  return { field: 'holdingPeriod', status: 'success', message: 'Valid holding period' };
}

function quickValidateCatchUpPercentage(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'catchUpPercentage', status: 'error', message: 'Catch-up percentage is required' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'catchUpPercentage', status: 'error', message: 'Catch-up percentage must be between 0% and 100%' };
  }
  
  return { field: 'catchUpPercentage', status: 'success', message: 'Valid catch-up percentage' };
}

function quickValidatePromotePercentage(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'promotePercentage', status: 'error', message: 'Promote percentage is required' };
  }
  
  if (value < 0 || value > 50) {
    return { field: 'promotePercentage', status: 'error', message: 'Promote percentage must be between 0% and 50%' };
  }
  
  if (value > 35) {
    return { field: 'promotePercentage', status: 'warning', message: 'Very high promote percentage' };
  }
  
  return { field: 'promotePercentage', status: 'success', message: 'Valid promote percentage' };
}

function quickValidateHurdleRate(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'hurdleRate', status: 'error', message: 'Hurdle rate must be non-negative' };
  }
  
  if (value > 25) {
    return { field: 'hurdleRate', status: 'warning', message: 'Very high hurdle rate' };
  }
  
  return { field: 'hurdleRate', status: 'success', message: 'Valid hurdle rate' };
}

function quickValidateWaterfallType(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'waterfallType', status: 'error', message: 'Waterfall type is required' };
  }
  
  const validTypes = ['american', 'european', 'hybrid'];
  if (!validTypes.includes(value)) {
    return { field: 'waterfallType', status: 'error', message: 'Invalid waterfall type' };
  }
  
  return { field: 'waterfallType', status: 'success', message: 'Valid waterfall type' };
}

function quickValidateClawbackProvision(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'clawbackProvision', status: 'error', message: 'Clawback provision is required' };
  }
  
  const validValues = ['yes', 'no'];
  if (!validValues.includes(value)) {
    return { field: 'clawbackProvision', status: 'error', message: 'Invalid clawback provision value' };
  }
  
  return { field: 'clawbackProvision', status: 'success', message: 'Valid clawback provision' };
}

function quickValidateClawbackPercentage(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'clawbackPercentage', status: 'error', message: 'Clawback percentage is required' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'clawbackPercentage', status: 'error', message: 'Clawback percentage must be between 0% and 100%' };
  }
  
  return { field: 'clawbackPercentage', status: 'success', message: 'Valid clawback percentage' };
}

function quickValidateManagementFee(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'managementFee', status: 'error', message: 'Management fee is required' };
  }
  
  if (value < 0 || value > 5) {
    return { field: 'managementFee', status: 'error', message: 'Management fee must be between 0% and 5%' };
  }
  
  if (value > 3) {
    return { field: 'managementFee', status: 'warning', message: 'High management fee' };
  }
  
  return { field: 'managementFee', status: 'success', message: 'Valid management fee' };
}

function quickValidateAcquisitionFee(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'acquisitionFee', status: 'error', message: 'Acquisition fee is required' };
  }
  
  if (value < 0 || value > 5) {
    return { field: 'acquisitionFee', status: 'error', message: 'Acquisition fee must be between 0% and 5%' };
  }
  
  if (value > 3) {
    return { field: 'acquisitionFee', status: 'warning', message: 'High acquisition fee' };
  }
  
  return { field: 'acquisitionFee', status: 'success', message: 'Valid acquisition fee' };
}

function quickValidateDispositionFee(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'dispositionFee', status: 'error', message: 'Disposition fee is required' };
  }
  
  if (value < 0 || value > 5) {
    return { field: 'dispositionFee', status: 'error', message: 'Disposition fee must be between 0% and 5%' };
  }
  
  if (value > 3) {
    return { field: 'dispositionFee', status: 'warning', message: 'High disposition fee' };
  }
  
  return { field: 'dispositionFee', status: 'success', message: 'Valid disposition fee' };
}

function quickValidateOperatingExpenses(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses is required' };
  }
  
  if (value < 0) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses cannot be negative' };
  }
  
  return { field: 'operatingExpenses', status: 'success', message: 'Valid operating expenses' };
}

function quickValidateDebtService(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'debtService', status: 'error', message: 'Debt service is required' };
  }
  
  if (value < 0) {
    return { field: 'debtService', status: 'error', message: 'Debt service cannot be negative' };
  }
  
  return { field: 'debtService', status: 'success', message: 'Valid debt service' };
}

function quickValidateTaxRate(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate must be non-negative' };
  }
  
  if (value > 50) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate must be between 0% and 50%' };
  }
  
  if (value < 10) {
    return { field: 'taxRate', status: 'warning', message: 'Very low tax rate' };
  }
  
  if (value > 40) {
    return { field: 'taxRate', status: 'warning', message: 'Very high tax rate' };
  }
  
  return { field: 'taxRate', status: 'success', message: 'Valid tax rate' };
}

function quickValidateInflationRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'inflationRate', status: 'error', message: 'Inflation rate is required' };
  }
  
  if (value < -5 || value > 15) {
    return { field: 'inflationRate', status: 'error', message: 'Inflation rate must be between -5% and 15%' };
  }
  
  if (Math.abs(value) > 10) {
    return { field: 'inflationRate', status: 'warning', message: 'Unusual inflation rate' };
  }
  
  return { field: 'inflationRate', status: 'success', message: 'Valid inflation rate' };
}

function quickValidateExitValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'exitValue', status: 'error', message: 'Exit value must be greater than 0' };
  }
  
  return { field: 'exitValue', status: 'success', message: 'Valid exit value' };
}

function quickValidateRemainingDebt(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'remainingDebt', status: 'error', message: 'Remaining debt is required' };
  }
  
  if (value < 0) {
    return { field: 'remainingDebt', status: 'error', message: 'Remaining debt cannot be negative' };
  }
  
  return { field: 'remainingDebt', status: 'success', message: 'Valid remaining debt' };
}