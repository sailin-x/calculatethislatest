import { QuickValidationResult } from '../../../types/QuickValidationResult';
import { RealEstateSyndicationInputs } from './formulas';

export function quickValidateAllInputs(inputs: RealEstateSyndicationInputs): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  results.push(quickValidatePropertyType(inputs.propertyType));
  results.push(quickValidateTotalProjectCost(inputs.totalProjectCost));
  results.push(quickValidateSponsorEquity(inputs.sponsorEquity));
  results.push(quickValidateInvestorEquity(inputs.investorEquity));
  results.push(quickValidateDebtAmount(inputs.debtAmount));
  results.push(quickValidateDebtRate(inputs.debtRate));
  results.push(quickValidateDebtTerm(inputs.debtTerm));
  results.push(quickValidateHoldingPeriod(inputs.holdingPeriod));
  results.push(quickValidateAnnualNOI(inputs.annualNOI));
  results.push(quickValidateNOIGrowthRate(inputs.noiGrowthRate));
  results.push(quickValidateExitCapRate(inputs.exitCapRate));
  results.push(quickValidateSponsorPromote(inputs.sponsorPromote));
  results.push(quickValidateInvestorPreferredReturn(inputs.investorPreferredReturn));
  results.push(quickValidateSponsorManagementFee(inputs.sponsorManagementFee));
  results.push(quickValidateAcquisitionFee(inputs.acquisitionFee));
  results.push(quickValidateDispositionFee(inputs.dispositionFee));
  results.push(quickValidateOperatingExpenses(inputs.operatingExpenses));
  results.push(quickValidateTaxRate(inputs.taxRate));

  return results;
}

function quickValidatePropertyType(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'propertyType', status: 'error', message: 'Property type is required' };
  }
  
  const validTypes = ['multifamily', 'office', 'retail', 'industrial', 'hotel', 'mixed_use', 'land', 'self_storage'];
  if (!validTypes.includes(value)) {
    return { field: 'propertyType', status: 'error', message: 'Invalid property type' };
  }
  
  return { field: 'propertyType', status: 'success', message: 'Valid property type' };
}

function quickValidateTotalProjectCost(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'totalProjectCost', status: 'error', message: 'Total project cost must be greater than 0' };
  }
  
  if (value > 100000000) {
    return { field: 'totalProjectCost', status: 'warning', message: 'Very high project cost - verify accuracy' };
  }
  
  return { field: 'totalProjectCost', status: 'success', message: 'Valid total project cost' };
}

function quickValidateSponsorEquity(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'sponsorEquity', status: 'error', message: 'Sponsor equity must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'sponsorEquity', status: 'warning', message: 'Very high sponsor equity - verify accuracy' };
  }
  
  return { field: 'sponsorEquity', status: 'success', message: 'Valid sponsor equity' };
}

function quickValidateInvestorEquity(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'investorEquity', status: 'error', message: 'Investor equity must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'investorEquity', status: 'warning', message: 'Very high investor equity - verify accuracy' };
  }
  
  return { field: 'investorEquity', status: 'success', message: 'Valid investor equity' };
}

function quickValidateDebtAmount(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'debtAmount', status: 'error', message: 'Debt amount must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'debtAmount', status: 'warning', message: 'Very high debt amount - verify accuracy' };
  }
  
  return { field: 'debtAmount', status: 'success', message: 'Valid debt amount' };
}

function quickValidateDebtRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'debtRate', status: 'error', message: 'Debt rate must be greater than 0' };
  }
  
  if (value > 20) {
    return { field: 'debtRate', status: 'error', message: 'Debt rate cannot exceed 20%' };
  }
  
  if (value < 3) {
    return { field: 'debtRate', status: 'warning', message: 'Debt rate seems unusually low' };
  }
  
  if (value > 15) {
    return { field: 'debtRate', status: 'warning', message: 'Debt rate seems unusually high' };
  }
  
  return { field: 'debtRate', status: 'success', message: 'Valid debt rate' };
}

function quickValidateDebtTerm(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'debtTerm', status: 'error', message: 'Debt term must be greater than 0' };
  }
  
  if (value > 30) {
    return { field: 'debtTerm', status: 'error', message: 'Debt term cannot exceed 30 years' };
  }
  
  if (value < 1) {
    return { field: 'debtTerm', status: 'error', message: 'Debt term must be at least 1 year' };
  }
  
  return { field: 'debtTerm', status: 'success', message: 'Valid debt term' };
}

function quickValidateHoldingPeriod(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'holdingPeriod', status: 'error', message: 'Holding period must be greater than 0' };
  }
  
  if (value > 20) {
    return { field: 'holdingPeriod', status: 'error', message: 'Holding period cannot exceed 20 years' };
  }
  
  if (value < 2) {
    return { field: 'holdingPeriod', status: 'warning', message: 'Holding period seems unusually short' };
  }
  
  return { field: 'holdingPeriod', status: 'success', message: 'Valid holding period' };
}

function quickValidateAnnualNOI(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'annualNOI', status: 'error', message: 'Annual NOI is required' };
  }
  
  if (value < 0) {
    return { field: 'annualNOI', status: 'error', message: 'Annual NOI cannot be negative' };
  }
  
  if (value > 10000000) {
    return { field: 'annualNOI', status: 'warning', message: 'Very high NOI - verify accuracy' };
  }
  
  return { field: 'annualNOI', status: 'success', message: 'Valid annual NOI' };
}

function quickValidateNOIGrowthRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'noiGrowthRate', status: 'error', message: 'NOI growth rate is required' };
  }
  
  if (value < -10 || value > 20) {
    return { field: 'noiGrowthRate', status: 'error', message: 'NOI growth rate must be between -10% and 20%' };
  }
  
  if (Math.abs(value) > 15) {
    return { field: 'noiGrowthRate', status: 'warning', message: 'Extreme growth rate - verify accuracy' };
  }
  
  return { field: 'noiGrowthRate', status: 'success', message: 'Valid NOI growth rate' };
}

function quickValidateExitCapRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'exitCapRate', status: 'error', message: 'Exit cap rate must be greater than 0' };
  }
  
  if (value > 15) {
    return { field: 'exitCapRate', status: 'error', message: 'Exit cap rate cannot exceed 15%' };
  }
  
  if (value < 3) {
    return { field: 'exitCapRate', status: 'warning', message: 'Exit cap rate seems unusually low' };
  }
  
  if (value > 12) {
    return { field: 'exitCapRate', status: 'warning', message: 'Exit cap rate seems unusually high' };
  }
  
  return { field: 'exitCapRate', status: 'success', message: 'Valid exit cap rate' };
}

function quickValidateSponsorPromote(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'sponsorPromote', status: 'error', message: 'Sponsor promote is required' };
  }
  
  if (value < 0 || value > 50) {
    return { field: 'sponsorPromote', status: 'error', message: 'Sponsor promote must be between 0% and 50%' };
  }
  
  if (value > 40) {
    return { field: 'sponsorPromote', status: 'warning', message: 'High sponsor promote - verify terms' };
  }
  
  return { field: 'sponsorPromote', status: 'success', message: 'Valid sponsor promote' };
}

function quickValidateInvestorPreferredReturn(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'investorPreferredReturn', status: 'error', message: 'Investor preferred return is required' };
  }
  
  if (value < 0 || value > 20) {
    return { field: 'investorPreferredReturn', status: 'error', message: 'Preferred return must be between 0% and 20%' };
  }
  
  if (value > 15) {
    return { field: 'investorPreferredReturn', status: 'warning', message: 'High preferred return - verify terms' };
  }
  
  return { field: 'investorPreferredReturn', status: 'success', message: 'Valid preferred return' };
}

function quickValidateSponsorManagementFee(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'sponsorManagementFee', status: 'error', message: 'Sponsor management fee is required' };
  }
  
  if (value < 0 || value > 5) {
    return { field: 'sponsorManagementFee', status: 'error', message: 'Management fee must be between 0% and 5%' };
  }
  
  if (value > 3) {
    return { field: 'sponsorManagementFee', status: 'warning', message: 'High management fee - verify terms' };
  }
  
  return { field: 'sponsorManagementFee', status: 'success', message: 'Valid management fee' };
}

function quickValidateAcquisitionFee(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'acquisitionFee', status: 'error', message: 'Acquisition fee is required' };
  }
  
  if (value < 0 || value > 5) {
    return { field: 'acquisitionFee', status: 'error', message: 'Acquisition fee must be between 0% and 5%' };
  }
  
  if (value > 3) {
    return { field: 'acquisitionFee', status: 'warning', message: 'High acquisition fee - verify terms' };
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
    return { field: 'dispositionFee', status: 'warning', message: 'High disposition fee - verify terms' };
  }
  
  return { field: 'dispositionFee', status: 'success', message: 'Valid disposition fee' };
}

function quickValidateOperatingExpenses(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses is required' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses must be between 0% and 100%' };
  }
  
  if (value > 80) {
    return { field: 'operatingExpenses', status: 'warning', message: 'Very high operating expenses' };
  }
  
  return { field: 'operatingExpenses', status: 'success', message: 'Valid operating expenses' };
}

function quickValidateTaxRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate must be greater than 0' };
  }
  
  if (value > 50) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate cannot exceed 50%' };
  }
  
  if (value < 10) {
    return { field: 'taxRate', status: 'warning', message: 'Tax rate seems unusually low' };
  }
  
  if (value > 40) {
    return { field: 'taxRate', status: 'warning', message: 'Tax rate seems unusually high' };
  }
  
  return { field: 'taxRate', status: 'success', message: 'Valid tax rate' };
}