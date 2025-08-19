import { QuickValidationResult } from '../../../types/QuickValidationResult';
import { RealEstateDevelopmentProFormaInputs } from './formulas';

export function quickValidateAllInputs(inputs: RealEstateDevelopmentProFormaInputs): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  results.push(quickValidateProjectType(inputs.projectType));
  results.push(quickValidateTotalUnits(inputs.totalUnits));
  results.push(quickValidateLandAcquisitionCost(inputs.landAcquisitionCost));
  results.push(quickValidateHardCosts(inputs.hardCosts));
  results.push(quickValidateSoftCosts(inputs.softCosts));
  results.push(quickValidateContingency(inputs.contingency));
  results.push(quickValidateCarryingCosts(inputs.carryingCosts));
  results.push(quickValidateDevelopmentTimeline(inputs.developmentTimeline));
  results.push(quickValidateSalesPricePerUnit(inputs.salesPricePerUnit));
  results.push(quickValidateRentalIncomePerUnit(inputs.rentalIncomePerUnit));
  results.push(quickValidateVacancyRate(inputs.vacancyRate));
  results.push(quickValidateOperatingExpenses(inputs.operatingExpenses));
  results.push(quickValidateFinancingAmount(inputs.financingAmount));
  results.push(quickValidateInterestRate(inputs.interestRate));
  results.push(quickValidateEquityContribution(inputs.equityContribution));
  results.push(quickValidateExitStrategy(inputs.exitStrategy));
  results.push(quickValidateMarketAppreciation(inputs.marketAppreciation));
  results.push(quickValidateSalesCommission(inputs.salesCommission));
  results.push(quickValidateTaxRate(inputs.taxRate));

  return results;
}

function quickValidateProjectType(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'projectType', status: 'error', message: 'Project type is required' };
  }
  
  const validTypes = ['residential', 'commercial', 'mixed_use', 'industrial', 'retail', 'office', 'hotel', 'land_development'];
  if (!validTypes.includes(value)) {
    return { field: 'projectType', status: 'error', message: 'Invalid project type' };
  }
  
  return { field: 'projectType', status: 'success', message: 'Valid project type' };
}

function quickValidateTotalUnits(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'totalUnits', status: 'error', message: 'Total units must be greater than 0' };
  }
  
  if (value > 10000) {
    return { field: 'totalUnits', status: 'warning', message: 'Very large number of units - verify accuracy' };
  }
  
  if (value > 1000) {
    return { field: 'totalUnits', status: 'warning', message: 'Large number of units - typical for major developments' };
  }
  
  return { field: 'totalUnits', status: 'success', message: 'Valid total units' };
}

function quickValidateLandAcquisitionCost(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'landAcquisitionCost', status: 'error', message: 'Land acquisition cost must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'landAcquisitionCost', status: 'warning', message: 'Very high land cost - verify accuracy' };
  }
  
  if (value > 10000000) {
    return { field: 'landAcquisitionCost', status: 'success', message: 'High-value land acquisition' };
  }
  
  return { field: 'landAcquisitionCost', status: 'success', message: 'Valid land acquisition cost' };
}

function quickValidateHardCosts(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'hardCosts', status: 'error', message: 'Hard costs must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'hardCosts', status: 'warning', message: 'Very high hard costs - verify accuracy' };
  }
  
  return { field: 'hardCosts', status: 'success', message: 'Valid hard costs' };
}

function quickValidateSoftCosts(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'softCosts', status: 'error', message: 'Soft costs must be non-negative' };
  }
  
  if (value > 50000000) {
    return { field: 'softCosts', status: 'warning', message: 'Very high soft costs - verify accuracy' };
  }
  
  return { field: 'softCosts', status: 'success', message: 'Valid soft costs' };
}

function quickValidateContingency(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'contingency', status: 'error', message: 'Contingency must be non-negative' };
  }
  
  if (value > 50) {
    return { field: 'contingency', status: 'error', message: 'Contingency cannot exceed 50%' };
  }
  
  if (value < 5) {
    return { field: 'contingency', status: 'warning', message: 'Low contingency - consider increasing for risk management' };
  }
  
  if (value > 25) {
    return { field: 'contingency', status: 'warning', message: 'High contingency - verify necessity' };
  }
  
  return { field: 'contingency', status: 'success', message: 'Valid contingency percentage' };
}

function quickValidateCarryingCosts(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'carryingCosts', status: 'error', message: 'Carrying costs must be non-negative' };
  }
  
  if (value > 500000) {
    return { field: 'carryingCosts', status: 'warning', message: 'Very high monthly carrying costs - verify accuracy' };
  }
  
  return { field: 'carryingCosts', status: 'success', message: 'Valid carrying costs' };
}

function quickValidateDevelopmentTimeline(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'developmentTimeline', status: 'error', message: 'Development timeline must be greater than 0' };
  }
  
  if (value > 120) {
    return { field: 'developmentTimeline', status: 'error', message: 'Development timeline cannot exceed 120 months' };
  }
  
  if (value < 6) {
    return { field: 'developmentTimeline', status: 'warning', message: 'Very short timeline - verify feasibility' };
  }
  
  if (value > 60) {
    return { field: 'developmentTimeline', status: 'warning', message: 'Very long timeline - consider risks' };
  }
  
  return { field: 'developmentTimeline', status: 'success', message: 'Valid development timeline' };
}

function quickValidateSalesPricePerUnit(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'salesPricePerUnit', status: 'error', message: 'Sales price per unit must be non-negative' };
  }
  
  if (value > 10000000) {
    return { field: 'salesPricePerUnit', status: 'error', message: 'Sales price per unit cannot exceed $10 million' };
  }
  
  if (value > 2000000) {
    return { field: 'salesPricePerUnit', status: 'warning', message: 'Very high sales price - verify market comparables' };
  }
  
  return { field: 'salesPricePerUnit', status: 'success', message: 'Valid sales price per unit' };
}

function quickValidateRentalIncomePerUnit(value?: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'rentalIncomePerUnit', status: 'success', message: 'Optional field' };
  }
  
  if (value < 0) {
    return { field: 'rentalIncomePerUnit', status: 'error', message: 'Rental income per unit must be non-negative' };
  }
  
  if (value > 100000) {
    return { field: 'rentalIncomePerUnit', status: 'error', message: 'Rental income per unit cannot exceed $100,000' };
  }
  
  if (value > 20000) {
    return { field: 'rentalIncomePerUnit', status: 'warning', message: 'Very high rental income - verify market rates' };
  }
  
  return { field: 'rentalIncomePerUnit', status: 'success', message: 'Valid rental income per unit' };
}

function quickValidateVacancyRate(value?: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'vacancyRate', status: 'success', message: 'Optional field' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'vacancyRate', status: 'error', message: 'Vacancy rate must be between 0% and 100%' };
  }
  
  if (value > 20) {
    return { field: 'vacancyRate', status: 'warning', message: 'High vacancy rate - consider market conditions' };
  }
  
  return { field: 'vacancyRate', status: 'success', message: 'Valid vacancy rate' };
}

function quickValidateOperatingExpenses(value?: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'operatingExpenses', status: 'success', message: 'Optional field' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses must be between 0% and 100%' };
  }
  
  if (value > 60) {
    return { field: 'operatingExpenses', status: 'warning', message: 'Very high operating expenses - verify accuracy' };
  }
  
  if (value < 20) {
    return { field: 'operatingExpenses', status: 'warning', message: 'Low operating expenses - verify completeness' };
  }
  
  return { field: 'operatingExpenses', status: 'success', message: 'Valid operating expenses percentage' };
}

function quickValidateFinancingAmount(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'financingAmount', status: 'error', message: 'Financing amount must be non-negative' };
  }
  
  if (value > 1000000000) {
    return { field: 'financingAmount', status: 'error', message: 'Financing amount cannot exceed $1 billion' };
  }
  
  return { field: 'financingAmount', status: 'success', message: 'Valid financing amount' };
}

function quickValidateInterestRate(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'interestRate', status: 'error', message: 'Interest rate must be non-negative' };
  }
  
  if (value > 50) {
    return { field: 'interestRate', status: 'error', message: 'Interest rate cannot exceed 50%' };
  }
  
  if (value < 3) {
    return { field: 'interestRate', status: 'warning', message: 'Very low interest rate - verify accuracy' };
  }
  
  if (value > 25) {
    return { field: 'interestRate', status: 'warning', message: 'Very high interest rate - consider alternatives' };
  }
  
  return { field: 'interestRate', status: 'success', message: 'Valid interest rate' };
}

function quickValidateEquityContribution(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'equityContribution', status: 'error', message: 'Equity contribution must be non-negative' };
  }
  
  if (value > 1000000000) {
    return { field: 'equityContribution', status: 'error', message: 'Equity contribution cannot exceed $1 billion' };
  }
  
  return { field: 'equityContribution', status: 'success', message: 'Valid equity contribution' };
}

function quickValidateExitStrategy(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'exitStrategy', status: 'error', message: 'Exit strategy is required' };
  }
  
  const validStrategies = ['sell_all', 'sell_partial', 'hold_all', 'refinance'];
  if (!validStrategies.includes(value)) {
    return { field: 'exitStrategy', status: 'error', message: 'Invalid exit strategy' };
  }
  
  return { field: 'exitStrategy', status: 'success', message: 'Valid exit strategy' };
}

function quickValidateMarketAppreciation(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'marketAppreciation', status: 'error', message: 'Market appreciation rate is required' };
  }
  
  if (value < -50 || value > 50) {
    return { field: 'marketAppreciation', status: 'error', message: 'Market appreciation must be between -50% and 50%' };
  }
  
  if (Math.abs(value) > 20) {
    return { field: 'marketAppreciation', status: 'warning', message: 'Extreme market appreciation rate - verify assumptions' };
  }
  
  return { field: 'marketAppreciation', status: 'success', message: 'Valid market appreciation rate' };
}

function quickValidateSalesCommission(value?: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'salesCommission', status: 'success', message: 'Optional field' };
  }
  
  if (value < 0 || value > 20) {
    return { field: 'salesCommission', status: 'error', message: 'Sales commission must be between 0% and 20%' };
  }
  
  if (value > 10) {
    return { field: 'salesCommission', status: 'warning', message: 'High sales commission rate - verify market standards' };
  }
  
  return { field: 'salesCommission', status: 'success', message: 'Valid sales commission rate' };
}

function quickValidateTaxRate(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate must be non-negative' };
  }
  
  if (value > 50) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate cannot exceed 50%' };
  }
  
  if (value < 10) {
    return { field: 'taxRate', status: 'warning', message: 'Low tax rate - verify accuracy' };
  }
  
  if (value > 40) {
    return { field: 'taxRate', status: 'warning', message: 'High tax rate - verify accuracy' };
  }
  
  return { field: 'taxRate', status: 'success', message: 'Valid tax rate' };
}