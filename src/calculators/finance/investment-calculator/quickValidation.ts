import { ValidationResult } from '../../../types/calculator';

// Initial Investment Validators
export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.initialInvestment = 'Initial investment is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.initialInvestment = 'Initial investment must be a valid number';
  } else if (value < 0) {
    errors.initialInvestment = 'Initial investment cannot be negative';
  } else if (value > 10000000) {
    errors.initialInvestment = 'Initial investment cannot exceed $10,000,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.monthlyContribution = 'Monthly contribution must be a valid number';
  } else if (value < 0) {
    errors.monthlyContribution = 'Monthly contribution cannot be negative';
  } else if (value > 100000) {
    errors.monthlyContribution = 'Monthly contribution cannot exceed $100,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Time Horizon Validators
export function validateInvestmentPeriodYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.investmentPeriodYears = 'Investment period is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.investmentPeriodYears = 'Investment period must be a valid number';
  } else if (value < 1) {
    errors.investmentPeriodYears = 'Investment period must be at least 1 year';
  } else if (value > 100) {
    errors.investmentPeriodYears = 'Investment period cannot exceed 100 years';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateInvestmentPeriodMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.investmentPeriodMonths = 'Additional months must be a valid number';
  } else if (value < 0) {
    errors.investmentPeriodMonths = 'Additional months cannot be negative';
  } else if (value > 11) {
    errors.investmentPeriodMonths = 'Additional months cannot exceed 11';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Expected Returns Validators
export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.expectedAnnualReturn = 'Expected annual return is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expectedAnnualReturn = 'Expected annual return must be a valid number';
  } else if (value < -10) {
    errors.expectedAnnualReturn = 'Expected annual return cannot be less than -10%';
  } else if (value > 50) {
    errors.expectedAnnualReturn = 'Expected annual return cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateExpectedAnnualReturnMin(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expectedAnnualReturnMin = 'Minimum expected return must be a valid number';
  } else if (value < -10) {
    errors.expectedAnnualReturnMin = 'Minimum expected return cannot be less than -10%';
  } else if (value > 50) {
    errors.expectedAnnualReturnMin = 'Minimum expected return cannot exceed 50%';
  } else if (allInputs?.expectedAnnualReturnMax && value > allInputs.expectedAnnualReturnMax) {
    errors.expectedAnnualReturnMin = 'Minimum return cannot exceed maximum return';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateExpectedAnnualReturnMax(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expectedAnnualReturnMax = 'Maximum expected return must be a valid number';
  } else if (value < -10) {
    errors.expectedAnnualReturnMax = 'Maximum expected return cannot be less than -10%';
  } else if (value > 50) {
    errors.expectedAnnualReturnMax = 'Maximum expected return cannot exceed 50%';
  } else if (allInputs?.expectedAnnualReturnMin && value < allInputs.expectedAnnualReturnMin) {
    errors.expectedAnnualReturnMax = 'Maximum return cannot be less than minimum return';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Risk Parameters Validators
export function validateVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.volatility = 'Volatility is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.volatility = 'Volatility must be a valid number';
  } else if (value < 0) {
    errors.volatility = 'Volatility cannot be negative';
  } else if (value > 100) {
    errors.volatility = 'Volatility cannot exceed 100%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.riskTolerance = 'Risk tolerance is required';
  } else if (!['conservative', 'moderate', 'aggressive'].includes(value)) {
    errors.riskTolerance = 'Risk tolerance must be conservative, moderate, or aggressive';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Inflation & Taxes Validators
export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.inflationRate = 'Inflation rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.inflationRate = 'Inflation rate must be a valid number';
  } else if (value < -5) {
    errors.inflationRate = 'Inflation rate cannot be less than -5%';
  } else if (value > 20) {
    errors.inflationRate = 'Inflation rate cannot exceed 20%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.taxRate = 'Tax rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.taxRate = 'Tax rate must be a valid number';
  } else if (value < 0) {
    errors.taxRate = 'Tax rate cannot be negative';
  } else if (value > 50) {
    errors.taxRate = 'Tax rate cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateTaxDeferred(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.taxDeferred = 'Tax deferred must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Investment Strategy Validators
export function validateInvestmentStrategy(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.investmentStrategy = 'Investment strategy is required';
  } else if (!['lump_sum', 'monthly_contributions', 'both'].includes(value)) {
    errors.investmentStrategy = 'Investment strategy must be lump_sum, monthly_contributions, or both';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRebalanceFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.rebalanceFrequency = 'Rebalance frequency is required';
  } else if (!['never', 'quarterly', 'annually'].includes(value)) {
    errors.rebalanceFrequency = 'Rebalance frequency must be never, quarterly, or annually';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Asset Allocation Validators
export function validateStockAllocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.stockAllocation = 'Stock allocation is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.stockAllocation = 'Stock allocation must be a valid number';
  } else if (value < 0) {
    errors.stockAllocation = 'Stock allocation cannot be negative';
  } else if (value > 100) {
    errors.stockAllocation = 'Stock allocation cannot exceed 100%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateBondAllocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.bondAllocation = 'Bond allocation is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.bondAllocation = 'Bond allocation must be a valid number';
  } else if (value < 0) {
    errors.bondAllocation = 'Bond allocation cannot be negative';
  } else if (value > 100) {
    errors.bondAllocation = 'Bond allocation cannot exceed 100%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateCashAllocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.cashAllocation = 'Cash allocation is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.cashAllocation = 'Cash allocation must be a valid number';
  } else if (value < 0) {
    errors.cashAllocation = 'Cash allocation cannot be negative';
  } else if (value > 100) {
    errors.cashAllocation = 'Cash allocation cannot exceed 100%';
  } else if (allInputs?.stockAllocation !== undefined && allInputs?.bondAllocation !== undefined) {
    const total = value + allInputs.stockAllocation + allInputs.bondAllocation;
    if (Math.abs(total - 100) > 0.1) {
      errors.cashAllocation = 'Asset allocations must total 100%';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Advanced Options Validators
export function validateIncludeDividends(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.includeDividends = 'Include dividends must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateDividendYield(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.dividendYield = 'Dividend yield must be a valid number';
  } else if (value < 0) {
    errors.dividendYield = 'Dividend yield cannot be negative';
  } else if (value > 20) {
    errors.dividendYield = 'Dividend yield cannot exceed 20%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateExpenseRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expenseRatio = 'Expense ratio must be a valid number';
  } else if (value < 0) {
    errors.expenseRatio = 'Expense ratio cannot be negative';
  } else if (value > 5) {
    errors.expenseRatio = 'Expense ratio cannot exceed 5%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateManagementFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.managementFee = 'Management fee must be a valid number';
  } else if (value < 0) {
    errors.managementFee = 'Management fee cannot be negative';
  } else if (value > 5) {
    errors.managementFee = 'Management fee cannot exceed 5%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Goal Setting Validators
export function validateTargetAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.targetAmount = 'Target amount must be a valid number';
  } else if (value <= 0) {
    errors.targetAmount = 'Target amount must be greater than $0';
  } else if (value > 100000000) {
    errors.targetAmount = 'Target amount cannot exceed $100,000,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRiskAdjustedTarget(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.riskAdjustedTarget = 'Risk adjusted target must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Scenario Analysis Validators
export function validateMarketCrashScenario(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.marketCrashScenario = 'Market crash scenario must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateBearMarketDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.marketCrashScenario) {
    if (value === undefined || value === null) {
      errors.bearMarketDuration = 'Bear market duration is required for crash scenario';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.bearMarketDuration = 'Bear market duration must be a valid number';
    } else if (value < 1) {
      errors.bearMarketDuration = 'Bear market duration must be at least 1 month';
    } else if (value > 120) {
      errors.bearMarketDuration = 'Bear market duration cannot exceed 120 months';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRecoveryTime(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.marketCrashScenario) {
    if (value === undefined || value === null) {
      errors.recoveryTime = 'Recovery time is required for crash scenario';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.recoveryTime = 'Recovery time must be a valid number';
    } else if (value < 1) {
      errors.recoveryTime = 'Recovery time must be at least 1 month';
    } else if (value > 120) {
      errors.recoveryTime = 'Recovery time cannot exceed 120 months';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Withdrawal Planning Validators
export function validateWithdrawalRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.withdrawalRate = 'Withdrawal rate must be a valid number';
  } else if (value < 2) {
    errors.withdrawalRate = 'Withdrawal rate must be at least 2%';
  } else if (value > 10) {
    errors.withdrawalRate = 'Withdrawal rate cannot exceed 10%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateWithdrawalStartYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.withdrawalStartYear = 'Withdrawal start year must be a valid number';
  } else if (value < 1) {
    errors.withdrawalStartYear = 'Withdrawal start year must be at least 1';
  } else if (value > 100) {
    errors.withdrawalStartYear = 'Withdrawal start year cannot exceed 100';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateWithdrawalInflationAdjusted(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.withdrawalInflationAdjusted = 'Withdrawal inflation adjustment must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Comparison Options Validators
export function validateCompareStrategies(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.compareStrategies = 'Compare strategies must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateBenchmarkIndex(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (!['sp500', 'nasdaq', 'dow_jones', 'custom'].includes(value)) {
    errors.benchmarkIndex = 'Benchmark index must be sp500, nasdaq, dow_jones, or custom';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateCustomBenchmarkReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.benchmarkIndex === 'custom') {
    if (value === undefined || value === null) {
      errors.customBenchmarkReturn = 'Custom benchmark return is required when using custom benchmark';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.customBenchmarkReturn = 'Custom benchmark return must be a valid number';
    } else if (value < -10) {
      errors.customBenchmarkReturn = 'Custom benchmark return cannot be less than -10%';
    } else if (value > 50) {
      errors.customBenchmarkReturn = 'Custom benchmark return cannot exceed 50%';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Analysis Options Validators
export function validatePrepaymentAnalysis(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.prepaymentAnalysis = 'Prepayment analysis must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.analysisPeriod = 'Analysis period must be a valid number';
  } else if (value < 1) {
    errors.analysisPeriod = 'Analysis period must be at least 1 year';
  } else if (value > 100) {
    errors.analysisPeriod = 'Analysis period cannot exceed 100 years';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}