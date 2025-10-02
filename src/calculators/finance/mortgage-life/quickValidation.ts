import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Individual field validation functions for Mortgage Life Calculator
 */

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 10000 && num <= 10000000;
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateBorrowerAge(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 18 && num <= 85;
}

export function validateCoBorrowerAge(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 18 && num <= 85;
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 1 && num <= 50;
}

export function validateYearsRemaining(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 50;
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 50000;
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateOtherDebts(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 1000000;
}

export function validateSavings(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateDependents(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10;
}

export function validateHealthStatus(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validStatuses = ['excellent', 'very-good', 'good', 'fair', 'poor'];
  return validStatuses.includes(value);
}

export function validateSmokingStatus(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validStatuses = ['non-smoker', 'former-smoker', 'smoker'];
  return validStatuses.includes(value);
}

export function validateOccupation(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validOccupations = ['low-risk', 'medium-risk', 'high-risk'];
  return validOccupations.includes(value);
}

export function validateHobbies(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validHobbies = ['low-risk', 'medium-risk', 'high-risk'];
  return validHobbies.includes(value);
}

export function validateExistingLifeInsurance(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateMortgageLifePremium(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 1000;
}

export function validateTermLifePremium(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 1000;
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10;
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 20;
}

export function validateState(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  return validStates.includes(value);
}

export function validateCoverageType(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validTypes = ['decreasing', 'level', 'joint', 'survivorship'];
  return validTypes.includes(value);
}

export function validateBeneficiaryType(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validTypes = ['family', 'trust', 'estate', 'charity'];
  return validTypes.includes(value);
}

/**
 * Cross-field validation functions
 */

export function validateLoanBalanceNotExceedingLoanAmount(value: any, allInputs?: Record<string, any>): boolean {
  if (!allInputs) return true;
  const currentBalance = allInputs.currentLoanBalance;
  const loanAmount = allInputs.loanAmount;
  if (currentBalance === undefined || loanAmount === undefined) return true;
  return currentBalance <= loanAmount;
}

export function validateYearsRemainingNotExceedingLoanTerm(value: any, allInputs?: Record<string, any>): boolean {
  if (!allInputs) return true;
  const yearsRemaining = allInputs.yearsRemaining;
  const loanTerm = allInputs.loanTerm;
  if (yearsRemaining === undefined || loanTerm === undefined) return true;
  return yearsRemaining <= loanTerm;
}

export function validateCoBorrowerAgeReasonable(value: any, allInputs?: Record<string, any>): boolean {
  if (!allInputs) return true;
  const borrowerAge = allInputs.borrowerAge;
  const coBorrowerAge = allInputs.coBorrowerAge;
  if (borrowerAge === undefined || coBorrowerAge === undefined) return true;
  const ageDifference = Math.abs(borrowerAge - coBorrowerAge);
  return ageDifference <= 30; // Reasonable age difference
}

/**
 * Consolidated validation function
 */
export function validateAllMortgageLifeInputs(inputs: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {};

  // Individual field validations
  if (!validateLoanAmount(inputs.loanAmount)) {
    errors.loanAmount = 'Loan amount must be between $10,000 and $10,000,000';
  }

  if (!validateCurrentLoanBalance(inputs.currentLoanBalance)) {
    errors.currentLoanBalance = 'Current loan balance must be between $0 and $10,000,000';
  }

  if (!validateBorrowerAge(inputs.borrowerAge)) {
    errors.borrowerAge = 'Borrower age must be between 18 and 85 years';
  }

  if (!validateCoBorrowerAge(inputs.coBorrowerAge)) {
    errors.coBorrowerAge = 'Co-borrower age must be between 18 and 85 years';
  }

  if (!validateLoanTerm(inputs.loanTerm)) {
    errors.loanTerm = 'Loan term must be between 1 and 50 years';
  }

  if (!validateYearsRemaining(inputs.yearsRemaining)) {
    errors.yearsRemaining = 'Years remaining must be between 0 and 50 years';
  }

  if (!validateMonthlyPayment(inputs.monthlyPayment)) {
    errors.monthlyPayment = 'Monthly payment must be between $0 and $50,000';
  }

  if (!validateAnnualIncome(inputs.annualIncome)) {
    errors.annualIncome = 'Annual income must be between $0 and $10,000,000';
  }

  if (!validateOtherDebts(inputs.otherDebts)) {
    errors.otherDebts = 'Other debts must be between $0 and $1,000,000';
  }

  if (!validateSavings(inputs.savings)) {
    errors.savings = 'Savings must be between $0 and $10,000,000';
  }

  if (!validateDependents(inputs.dependents)) {
    errors.dependents = 'Number of dependents must be between 0 and 10';
  }

  if (!validateHealthStatus(inputs.healthStatus)) {
    errors.healthStatus = 'Please select a valid health status';
  }

  if (!validateSmokingStatus(inputs.smokingStatus)) {
    errors.smokingStatus = 'Please select a valid smoking status';
  }

  if (!validateOccupation(inputs.occupation)) {
    errors.occupation = 'Please select a valid occupation risk level';
  }

  if (!validateHobbies(inputs.hobbies)) {
    errors.hobbies = 'Please select a valid hobby risk level';
  }

  if (!validateExistingLifeInsurance(inputs.existingLifeInsurance)) {
    errors.existingLifeInsurance = 'Existing life insurance must be between $0 and $10,000,000';
  }

  if (!validateMortgageLifePremium(inputs.mortgageLifePremium)) {
    errors.mortgageLifePremium = 'Monthly premium must be between $0 and $1,000';
  }

  if (!validateTermLifePremium(inputs.termLifePremium)) {
    errors.termLifePremium = 'Monthly premium must be between $0 and $1,000';
  }

  if (!validateInflationRate(inputs.inflationRate)) {
    errors.inflationRate = 'Inflation rate must be between 0% and 10%';
  }

  if (!validateInvestmentReturn(inputs.investmentReturn)) {
    errors.investmentReturn = 'Investment return must be between 0% and 20%';
  }

  if (!validateState(inputs.state)) {
    errors.state = 'Please select a valid state';
  }

  if (!validateCoverageType(inputs.coverageType)) {
    errors.coverageType = 'Please select a valid coverage type';
  }

  if (!validateBeneficiaryType(inputs.beneficiaryType)) {
    errors.beneficiaryType = 'Please select a valid beneficiary type';
  }

  // Cross-field validations
  if (!validateLoanBalanceNotExceedingLoanAmount(inputs.currentLoanBalance, inputs)) {
    errors.currentLoanBalance = 'Current loan balance cannot exceed original loan amount';
  }

  if (!validateYearsRemainingNotExceedingLoanTerm(inputs.yearsRemaining, inputs)) {
    errors.yearsRemaining = 'Years remaining cannot exceed original loan term';
  }

  if (!validateCoBorrowerAgeReasonable(inputs.coBorrowerAge, inputs)) {
    errors.coBorrowerAge = 'Co-borrower age difference seems unreasonable (max 30 years)';
  }

  return errors;
}
