import { EmergencyFundCalculatorInputs } from './types';

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Monthly income must be greater than 0' };
  }

  if (value > 100000) {
    return { isValid: true, error: 'Very high income - consider tax implications for emergency fund planning' };
  }

  return { isValid: true };
}

export function validateMonthlyExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Monthly expenses must be greater than 0' };
  }

  if (allInputs?.monthlyIncome && value > allInputs.monthlyIncome * 2) {
    return { isValid: true, error: 'Expenses are very high relative to income - review budget' };
  }

  return { isValid: true };
}

export function validateCurrentEmergencyFund(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current emergency fund cannot be negative' };
  }

  if (value === 0) {
    return { isValid: true, error: 'No emergency fund - this is a critical priority' };
  }

  if (allInputs?.monthlyExpenses && value < allInputs.monthlyExpenses) {
    return { isValid: true, error: 'Emergency fund covers less than 1 month of expenses' };
  }

  return { isValid: true };
}

export function validateMonthlyDebtPayments(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Monthly debt payments cannot be negative' };
  }

  if (allInputs?.monthlyIncome && value > allInputs.monthlyIncome * 0.8) {
    return { isValid: true, error: 'Debt payments exceed 80% of income - may be unsustainable' };
  }

  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 300 || value > 850)) {
    return { isValid: false, error: 'Credit score must be between 300 and 850' };
  }

  if (value < 580) {
    return { isValid: true, error: 'Poor credit score may limit emergency options' };
  }

  return { isValid: true };
}

export function validateDependents(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 15)) {
    return { isValid: false, error: 'Number of dependents must be between 0 and 15' };
  }

  if (value > 3) {
    return { isValid: true, error: 'Multiple dependents increase emergency fund needs' };
  }

  return { isValid: true };
}

export function validateTimeToFindNewJob(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 24) {
    return { isValid: false, error: 'Time to find new job must be between 1 and 24 months' };
  }

  if (value > 6) {
    return { isValid: true, error: 'Extended job search period requires larger emergency fund' };
  }

  return { isValid: true };
}

export function validateDesiredCoveragePeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 24) {
    return { isValid: false, error: 'Desired coverage period must be between 1 and 24 months' };
  }

  if (value < 3) {
    return { isValid: true, error: 'Less than 3 months coverage is below recommended minimum' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.05 || value > 0.1)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 10%' };
  }

  if (value > 0.04) {
    return { isValid: true, error: 'High inflation may erode emergency fund purchasing power' };
  }

  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.1 || value > 0.1)) {
    return { isValid: false, error: 'Expected return rate for emergency funds should be between -10% and 10%' };
  }

  if (value > 0.05) {
    return { isValid: true, error: 'High return expectations may not be appropriate for emergency funds' };
  }

  return { isValid: true };
}

export function validateCostOfLivingIndex(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 50 || value > 300)) {
    return { isValid: false, error: 'Cost of living index must be between 50 and 300' };
  }

  if (value > 150) {
    return { isValid: true, error: 'High cost of living increases emergency fund requirements' };
  }

  return { isValid: true };
}

export function validateLocalUnemploymentRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Local unemployment rate must be between 0% and 50%' };
  }

  if (value > 10) {
    return { isValid: true, error: 'High unemployment rate increases job loss risk' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 120) {
    return { isValid: false, error: 'Analysis period must be between 1 and 120 months' };
  }

  if (value < 12) {
    return { isValid: true, error: 'Short analysis period may not capture long-term emergency needs' };
  }

  return { isValid: true };
}

export function validateJobStability(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['very_stable', 'stable', 'moderate', 'unstable', 'very_unstable'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid job stability level' };
  }

  if (value === 'very_unstable') {
    return { isValid: true, error: 'Very unstable employment requires significant emergency fund' };
  }

  return { isValid: true };
}

export function validateHealthStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['excellent', 'good', 'fair', 'poor', 'critical'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid health status' };
  }

  if (value === 'poor' || value === 'critical') {
    return { isValid: true, error: 'Poor health increases emergency fund requirements' };
  }

  return { isValid: true };
}

export function validateLocationRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['low', 'moderate', 'high', 'very_high'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid location risk level' };
  }

  if (value === 'very_high') {
    return { isValid: true, error: 'Very high location risk requires larger emergency fund' };
  }

  return { isValid: true };
}

export function validateIndustryRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['low', 'moderate', 'high', 'very_high'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid industry risk level' };
  }

  if (value === 'very_high') {
    return { isValid: true, error: 'Very high industry risk increases emergency fund needs' };
  }

  return { isValid: true };
}

export function validateEmploymentType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['salaried', 'self_employed', 'contractor', 'unemployed', 'retired'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid employment type' };
  }

  if (value === 'self_employed' || value === 'contractor') {
    return { isValid: true, error: 'Self-employed/contract workers need larger emergency funds' };
  }

  return { isValid: true };
}

export function validateHousingType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['owned', 'rented', 'mortgaged', 'family_home'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid housing type' };
  }

  return { isValid: true };
}

export function validateTransportationType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['owned', 'leased', 'public', 'multiple_vehicles'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid transportation type' };
  }

  return { isValid: true };
}

export function validateInsuranceCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['comprehensive', 'basic', 'minimal', 'none'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid insurance coverage level' };
  }

  if (value === 'none' || value === 'minimal') {
    return { isValid: true, error: 'Limited insurance coverage increases emergency fund needs' };
  }

  return { isValid: true };
}

export function validateEmergencyFundInvestmentType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['savings_account', 'money_market', 'cd', 'high_yield_savings'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid emergency fund investment type' };
  }

  if (value === 'cd') {
    return { isValid: true, error: 'CDs have liquidity restrictions - ensure emergency access' };
  }

  return { isValid: true };
}

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['conservative', 'moderate', 'aggressive'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid risk tolerance level' };
  }

  return { isValid: true };
}

export function validateLiquidityNeeds(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['immediate', 'short_term', 'flexible'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select valid liquidity needs' };
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

export function validateDistributionStrategy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['equal', 'needs_based', 'percentage', 'discretionary'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid distribution strategy' };
  }

  return { isValid: true };
}