import { QuickValidationResult } from '../../../types/calculator';
import { OpportunityZoneInvestmentInputs } from './formulas';

export function quickValidateInitialInvestment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Initial Investment Amount is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Initial Investment Amount must be positive', severity: 'error' };
  }
  if (value < 1000) {
    return { isValid: true, message: 'Initial Investment Amount seems low for Opportunity Zone investment', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: true, message: 'Initial Investment Amount seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateInvestmentDate(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Investment Date is required', severity: 'error' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Investment Date must be a valid date', severity: 'error' };
  }
  const today = new Date();
  if (date > today) {
    return { isValid: true, message: 'Investment Date is in the future', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePropertyValue(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Property Value is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Property Value must be positive', severity: 'error' };
  }
  if (value < 10000) {
    return { isValid: true, message: 'Property Value seems low for Opportunity Zone property', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: true, message: 'Property Value seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAnnualRentalIncome(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Annual Rental Income is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Annual Rental Income must be non-negative', severity: 'error' };
  }
  if (value === 0) {
    return { isValid: true, message: 'No rental income - consider development or appreciation strategy', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAnnualOperatingExpenses(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Annual Operating Expenses is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Annual Operating Expenses must be non-negative', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAnnualAppreciation(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Annual Appreciation Rate is required', severity: 'error' };
  }
  if (value < -20 || value > 30) {
    return { isValid: false, message: 'Annual Appreciation Rate must be between -20% and 30%', severity: 'error' };
  }
  if (value < -10) {
    return { isValid: true, message: 'High negative appreciation rate may indicate declining market', severity: 'warning' };
  }
  if (value > 15) {
    return { isValid: true, message: 'High appreciation rate may be optimistic', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateHoldingPeriod(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Holding Period is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Holding Period must be positive', severity: 'error' };
  }
  if (value < 5) {
    return { isValid: true, message: 'Short holding period may limit Opportunity Zone tax benefits', severity: 'warning' };
  }
  if (value >= 10) {
    return { isValid: true, message: 'Long-term hold maximizes Opportunity Zone tax benefits', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateOriginalCapitalGain(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Original Capital Gain Amount is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Original Capital Gain Amount must be non-negative', severity: 'error' };
  }
  if (value === 0) {
    return { isValid: true, message: 'No original capital gain - Opportunity Zone benefits may be limited', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateOriginalGainDate(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Original Gain Date is required', severity: 'error' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Original Gain Date must be a valid date', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateTaxBracket(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Tax Bracket is required', severity: 'error' };
  }
  if (value < 10 || value > 37) {
    return { isValid: false, message: 'Tax Bracket must be between 10% and 37%', severity: 'error' };
  }
  if (value >= 32) {
    return { isValid: true, message: 'High tax bracket - Opportunity Zone benefits will be significant', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateStateTaxRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0 || value > 15) {
    return { isValid: false, message: 'State Tax Rate must be between 0% and 15%', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateExitStrategy(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Exit Strategy is required', severity: 'error' };
  }
  const validStrategies = ['sale', 'refinance', 'exchange', 'hold'];
  if (!validStrategies.includes(value)) {
    return { isValid: false, message: 'Exit Strategy must be one of the valid options', severity: 'error' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateManagementFees(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Management Fees must be between 0% and 10%', severity: 'error' };
  }
  if (value > 8) {
    return { isValid: true, message: 'Management fees seem high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateFinancingCosts(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Financing Costs must be non-negative', severity: 'error' };
  }
  if (value > 50000) {
    return { isValid: true, message: 'Financing costs seem high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateRenovationCosts(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Renovation Costs must be non-negative', severity: 'error' };
  }
  if (value > 500000) {
    return { isValid: true, message: 'Renovation costs seem high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateInflationRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Inflation Rate must be between 0% and 10%', severity: 'error' };
  }
  if (value > 5) {
    return { isValid: true, message: 'High inflation rate may impact real returns', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAllInputs(inputs: Partial<OpportunityZoneInvestmentInputs>): QuickValidationResult[] {
  return [
    quickValidateInitialInvestment(inputs.initialInvestment),
    quickValidateInvestmentDate(inputs.investmentDate),
    quickValidatePropertyValue(inputs.propertyValue),
    quickValidateAnnualRentalIncome(inputs.annualRentalIncome),
    quickValidateAnnualOperatingExpenses(inputs.annualOperatingExpenses),
    quickValidateAnnualAppreciation(inputs.annualAppreciation),
    quickValidateHoldingPeriod(inputs.holdingPeriod),
    quickValidateOriginalCapitalGain(inputs.originalCapitalGain),
    quickValidateOriginalGainDate(inputs.originalGainDate),
    quickValidateTaxBracket(inputs.taxBracket),
    quickValidateStateTaxRate(inputs.stateTaxRate),
    quickValidateExitStrategy(inputs.exitStrategy),
    quickValidateManagementFees(inputs.managementFees),
    quickValidateFinancingCosts(inputs.financingCosts),
    quickValidateRenovationCosts(inputs.renovationCosts),
    quickValidateInflationRate(inputs.inflationRate)
  ];
}