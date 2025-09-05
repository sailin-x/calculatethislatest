import { ValidationResult } from './validation';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan amount is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Loan amount must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Loan amount must be greater than 0'], warnings: [] };
  }

  if (numValue > 100000000) {
    return { isValid: false, errors: ['Loan amount seems unusually high'], warnings: [] };
  }

  // Check against total project cost if available
  if (allInputs?.totalProjectCost && numValue > allInputs.totalProjectCost) {
    return { isValid: false, errors: ['Loan amount cannot exceed total project cost'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Interest rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Interest rate must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Interest rate must be greater than 0'], warnings: [] };
  }

  if (numValue > 1) {
    return { isValid: false, errors: ['Interest rate must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Interest rate above 15% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan term is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Loan term must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Loan term must be greater than 0'], warnings: [] };
  }

  if (numValue > 360) {
    return { isValid: false, errors: ['Loan term cannot exceed 360 months'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateProjectSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Project size is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Project size must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Project size must be greater than 0'], warnings: [] };
  }

  if (numValue > 1000000) {
    return { isValid: true, errors: [], warnings: ['Project size seems unusually large'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateProjectAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Project address is required'], warnings: [] };
  }

  if (value.length < 10) {
    return { isValid: true, errors: [], warnings: ['Project address seems too short'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateProjectDescription(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Project description is required'], warnings: [] };
  }

  if (value.length < 10) {
    return { isValid: true, errors: [], warnings: ['Project description seems too short'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Land cost is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Land cost must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Land cost must be non-negative'], warnings: [] };
  }

  if (numValue > 50000000) {
    return { isValid: true, errors: [], warnings: ['Land cost seems unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Construction cost is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Construction cost must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Construction cost must be greater than 0'], warnings: [] };
  }

  if (numValue > 100000000) {
    return { isValid: true, errors: [], warnings: ['Construction cost seems unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Soft costs are required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Soft costs must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Soft costs must be non-negative'], warnings: [] };
  }

  // Check if soft costs are reasonable percentage of construction cost
  if (allInputs?.constructionCost && numValue > allInputs.constructionCost * 0.5) {
    return { isValid: true, errors: [], warnings: ['Soft costs seem high relative to construction cost'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateContingencyCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Contingency cost is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Contingency cost must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Contingency cost must be non-negative'], warnings: [] };
  }

  // Check if contingency is reasonable percentage of total cost
  if (allInputs?.totalProjectCost && numValue > allInputs.totalProjectCost * 0.2) {
    return { isValid: true, errors: [], warnings: ['Contingency cost seems high relative to total project cost'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateTotalProjectCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Total project cost is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Total project cost must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Total project cost must be greater than 0'], warnings: [] };
  }

  // Check if total cost matches sum of components
  if (allInputs?.landCost !== undefined && allInputs?.constructionCost !== undefined && 
      allInputs?.softCosts !== undefined && allInputs?.contingencyCost !== undefined) {
    const calculatedTotal = allInputs.landCost + allInputs.constructionCost + allInputs.softCosts + allInputs.contingencyCost;
    if (Math.abs(numValue - calculatedTotal) > 1) {
      return { isValid: false, errors: ['Total project cost must equal sum of land cost, construction cost, soft costs, and contingency cost'], warnings: [] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateConstructionStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Construction start date is required'], warnings: [] };
  }

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, errors: ['Construction start date must be a valid date'], warnings: [] };
    }

    const today = new Date();
    if (date < today) {
      return { isValid: true, errors: [], warnings: ['Construction start date is in the past'] };
    }

    // Check against end date if available
    if (allInputs?.constructionEndDate) {
      const endDate = new Date(allInputs.constructionEndDate);
      if (date >= endDate) {
        return { isValid: false, errors: ['Construction start date must be before construction end date'], warnings: [] };
      }
    }

    return { isValid: true, errors: [], warnings: [] };
  } catch (error) {
    return { isValid: false, errors: ['Invalid date format'], warnings: [] };
  }
}

export function validateConstructionEndDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Construction end date is required'], warnings: [] };
  }

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, errors: ['Construction end date must be a valid date'], warnings: [] };
    }

    // Check against start date if available
    if (allInputs?.constructionStartDate) {
      const startDate = new Date(allInputs.constructionStartDate);
      if (date <= startDate) {
        return { isValid: false, errors: ['Construction end date must be after construction start date'], warnings: [] };
      }
    }

    return { isValid: true, errors: [], warnings: [] };
  } catch (error) {
    return { isValid: false, errors: ['Invalid date format'], warnings: [] };
  }
}

export function validateConstructionDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Construction duration is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Construction duration must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Construction duration must be greater than 0'], warnings: [] };
  }

  if (numValue > 60) {
    return { isValid: true, errors: [], warnings: ['Construction duration longer than 5 years seems unusual'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower equity is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower equity must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Borrower equity must be non-negative'], warnings: [] };
  }

  // Check if equity plus loan amount equals total project cost
  if (allInputs?.loanAmount !== undefined && allInputs?.totalProjectCost !== undefined) {
    if (numValue + allInputs.loanAmount < allInputs.totalProjectCost) {
      return { isValid: false, errors: ['Borrower equity plus loan amount must equal or exceed total project cost'], warnings: [] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower credit score is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower credit score must be a valid number'], warnings: [] };
  }

  if (numValue < 300 || numValue > 850) {
    return { isValid: false, errors: ['Borrower credit score must be between 300 and 850'], warnings: [] };
  }

  if (numValue < 620) {
    return { isValid: true, errors: [], warnings: ['Borrower credit score is below average'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerNetWorth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower net worth is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower net worth must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Borrower net worth must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower liquidity is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower liquidity must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Borrower liquidity must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Market location is required'], warnings: [] };
  }

  if (value.length < 5) {
    return { isValid: true, errors: [], warnings: ['Market location seems too short'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market growth rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Market growth rate must be a valid number'], warnings: [] };
  }

  if (numValue < -1 || numValue > 1) {
    return { isValid: false, errors: ['Market growth rate must be between -100% and 100%'], warnings: [] };
  }

  if (numValue < -0.1) {
    return { isValid: true, errors: [], warnings: ['Market growth rate indicates declining market'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateExpectedExitValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Expected exit value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Expected exit value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Expected exit value must be greater than 0'], warnings: [] };
  }

  // Check against total project cost
  if (allInputs?.totalProjectCost) {
    if (numValue < allInputs.totalProjectCost * 0.8) {
      return { isValid: true, errors: [], warnings: ['Expected exit value is significantly below total project cost'] };
    }
    if (numValue > allInputs.totalProjectCost * 2.0) {
      return { isValid: true, errors: [], warnings: ['Expected exit value is significantly above total project cost'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateExpectedExitDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Expected exit date is required'], warnings: [] };
  }

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, errors: ['Expected exit date must be a valid date'], warnings: [] };
    }

    // Check against construction end date if available
    if (allInputs?.constructionEndDate) {
      const endDate = new Date(allInputs.constructionEndDate);
      if (date <= endDate) {
        return { isValid: false, errors: ['Expected exit date must be after construction end date'], warnings: [] };
      }
    }

    return { isValid: true, errors: [], warnings: [] };
  } catch (error) {
    return { isValid: false, errors: ['Invalid date format'], warnings: [] };
  }
}

export function validateExitTimeline(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Exit timeline is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Exit timeline must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Exit timeline must be greater than 0'], warnings: [] };
  }

  if (numValue > 120) {
    return { isValid: true, errors: [], warnings: ['Exit timeline longer than 10 years seems unusual'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Analysis period is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Analysis period must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Analysis period must be greater than 0'], warnings: [] };
  }

  if (numValue > 60) {
    return { isValid: true, errors: [], warnings: ['Analysis period longer than 5 years may have reduced accuracy'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Inflation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Inflation rate must be a valid number'], warnings: [] };
  }

  if (numValue < -1 || numValue > 1) {
    return { isValid: false, errors: ['Inflation rate must be between -100% and 100%'], warnings: [] };
  }

  if (numValue > 0.1) {
    return { isValid: true, errors: [], warnings: ['Inflation rate above 10% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateConstructionInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Construction inflation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Construction inflation rate must be a valid number'], warnings: [] };
  }

  if (numValue < -1 || numValue > 1) {
    return { isValid: false, errors: ['Construction inflation rate must be between -100% and 100%'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Construction inflation rate above 15% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Discount rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Discount rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Discount rate must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Discount rate above 15% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}