import { ValidationResult } from './validation';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }

  if (allInputs?.totalProjectCost && value > allInputs.totalProjectCost) {
    return { isValid: false, message: 'Loan amount cannot exceed total project cost' };
  }

  return { isValid: true, message: 'Valid loan amount' };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 30) {
    return { isValid: false, message: 'Interest rate must be between 0% and 30%' };
  }

  return { isValid: true, message: 'Valid interest rate' };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 1 || value > 50) {
    return { isValid: false, message: 'Loan term must be between 1 and 50 years' };
  }

  return { isValid: true, message: 'Valid loan term' };
}

export function validateTotalProjectCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Total project cost must be greater than 0' };
  }

  return { isValid: true, message: 'Valid total project cost' };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Land cost cannot be negative' };
  }

  return { isValid: true, message: 'Valid land cost' };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Construction cost cannot be negative' };
  }

  return { isValid: true, message: 'Valid construction cost' };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Soft costs cannot be negative' };
  }

  return { isValid: true, message: 'Valid soft costs' };
}

export function validateContingencyCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Contingency cost cannot be negative' };
  }

  return { isValid: true, message: 'Valid contingency cost' };
}

export function validateProjectSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Project size must be greater than 0' };
  }

  return { isValid: true, message: 'Valid project size' };
}

export function validateBorrowerEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Borrower equity cannot be negative' };
  }

  if (allInputs?.totalProjectCost && allInputs?.loanAmount) {
    const requiredEquity = allInputs.totalProjectCost - allInputs.loanAmount;
    if (value < requiredEquity * 0.8) {
      return { isValid: true, message: 'Warning: Borrower equity may be insufficient' };
    }
  }

  return { isValid: true, message: 'Valid borrower equity' };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 300 || value > 850) {
    return { isValid: false, message: 'Credit score must be between 300 and 850' };
  }

  return { isValid: true, message: 'Valid credit score' };
}

export function validateBorrowerNetWorth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Net worth cannot be negative' };
  }

  return { isValid: true, message: 'Valid net worth' };
}

export function validateBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Liquidity cannot be negative' };
  }

  return { isValid: true, message: 'Valid liquidity' };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20 || value > 50) {
    return { isValid: false, message: 'Market growth rate must be between -20% and 50%' };
  }

  return { isValid: true, message: 'Valid market growth rate' };
}

export function validateExpectedExitValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Expected exit value must be greater than 0' };
  }

  if (allInputs?.totalProjectCost && value <= allInputs.totalProjectCost) {
    return { isValid: true, message: 'Warning: Expected exit value should exceed total project cost' };
  }

  return { isValid: true, message: 'Valid expected exit value' };
}

export function validateExitTimeline(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 1) {
    return { isValid: false, message: 'Exit timeline must be at least 1 month' };
  }

  if (allInputs?.constructionDuration && value < allInputs.constructionDuration) {
    return { isValid: true, message: 'Warning: Exit timeline should be longer than construction duration' };
  }

  return { isValid: true, message: 'Valid exit timeline' };
}

export function validateConstructionDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 1 || value > 36) {
    return { isValid: false, message: 'Construction duration must be between 1 and 36 months' };
  }

  return { isValid: true, message: 'Valid construction duration' };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }

  return { isValid: true, message: 'Valid inflation rate' };
}

export function validateConstructionInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -5 || value > 30) {
    return { isValid: false, message: 'Construction inflation rate must be between -5% and 30%' };
  }

  return { isValid: true, message: 'Valid construction inflation rate' };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 25) {
    return { isValid: false, message: 'Discount rate must be between 0% and 25%' };
  }

  return { isValid: true, message: 'Valid discount rate' };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 1 || value > 20) {
    return { isValid: false, message: 'Analysis period must be between 1 and 20 years' };
  }

  return { isValid: true, message: 'Valid analysis period' };
}