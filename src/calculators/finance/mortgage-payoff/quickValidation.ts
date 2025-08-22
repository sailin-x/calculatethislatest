import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Individual field validation functions for Mortgage Payoff Calculator
 */

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 10000 && num <= 10000000;
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0.1 && num <= 20;
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

export function validateAdditionalMonthlyPayment(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000;
}

export function validateLumpSumPayment(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 1000000;
}

export function validateBiweeklyPayment(value: any, allInputs?: Record<string, any>): boolean {
  return typeof value === 'boolean';
}

export function validateExtraPaymentFrequency(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validFrequencies = ['monthly', 'quarterly', 'annually', 'one-time'];
  return validFrequencies.includes(value);
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateEmergencyFund(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 1000000;
}

export function validateOtherDebts(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 1000000;
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 20;
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 50;
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10;
}

export function validateHomeValue(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 10000000;
}

export function validateRefinanceRate(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0.1 && num <= 20;
}

export function validateRefinanceCosts(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 100000;
}

export function validatePayoffGoal(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const validGoals = ['minimum-time', 'minimum-cost', 'balanced', 'specific-date'];
  return validGoals.includes(value);
}

export function validateTargetPayoffDate(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && date > new Date();
}

export function validatePrepaymentPenalty(value: any, allInputs?: Record<string, any>): boolean {
  return typeof value === 'boolean';
}

export function validatePenaltyAmount(value: any, allInputs?: Record<string, any>): boolean {
  if (value === null || value === undefined) return false;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 100000;
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

/**
 * Cross-field validation functions
 */

export function validateCurrentBalanceNotExceedingLoanAmount(value: any, allInputs?: Record<string, any>): boolean {
  if (!allInputs) return true;
  const currentBalance = allInputs.currentBalance;
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

export function validateLumpSumNotExceedingBalance(value: any, allInputs?: Record<string, any>): boolean {
  if (!allInputs) return true;
  const lumpSum = allInputs.lumpSumPayment;
  const currentBalance = allInputs.currentBalance;
  if (lumpSum === undefined || currentBalance === undefined) return true;
  return lumpSum <= currentBalance;
}

export function validateRefinanceRateLowerThanCurrent(value: any, allInputs?: Record<string, any>): boolean {
  if (!allInputs) return true;
  const refinanceRate = allInputs.refinanceRate;
  const currentRate = allInputs.interestRate;
  if (refinanceRate === undefined || currentRate === undefined) return true;
  return refinanceRate < currentRate;
}

/**
 * Consolidated validation function
 */
export function validateAllMortgagePayoffInputs(inputs: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {};

  // Individual field validations
  if (!validateLoanAmount(inputs.loanAmount)) {
    errors.loanAmount = 'Loan amount must be between $10,000 and $10,000,000';
  }

  if (!validateCurrentBalance(inputs.currentBalance)) {
    errors.currentBalance = 'Current balance must be between $0 and $10,000,000';
  }

  if (!validateInterestRate(inputs.interestRate)) {
    errors.interestRate = 'Interest rate must be between 0.1% and 20%';
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

  if (!validateAdditionalMonthlyPayment(inputs.additionalMonthlyPayment)) {
    errors.additionalMonthlyPayment = 'Additional monthly payment must be between $0 and $10,000';
  }

  if (!validateLumpSumPayment(inputs.lumpSumPayment)) {
    errors.lumpSumPayment = 'Lump sum payment must be between $0 and $1,000,000';
  }

  if (!validateBiweeklyPayment(inputs.biweeklyPayment)) {
    errors.biweeklyPayment = 'Please select whether to use biweekly payments';
  }

  if (!validateExtraPaymentFrequency(inputs.extraPaymentFrequency)) {
    errors.extraPaymentFrequency = 'Please select a valid payment frequency';
  }

  if (!validateAnnualIncome(inputs.annualIncome)) {
    errors.annualIncome = 'Annual income must be between $0 and $10,000,000';
  }

  if (!validateEmergencyFund(inputs.emergencyFund)) {
    errors.emergencyFund = 'Emergency fund must be between $0 and $1,000,000';
  }

  if (!validateOtherDebts(inputs.otherDebts)) {
    errors.otherDebts = 'Other debts must be between $0 and $1,000,000';
  }

  if (!validateInvestmentReturn(inputs.investmentReturn)) {
    errors.investmentReturn = 'Investment return must be between 0% and 20%';
  }

  if (!validateTaxRate(inputs.taxRate)) {
    errors.taxRate = 'Tax rate must be between 0% and 50%';
  }

  if (!validateInflationRate(inputs.inflationRate)) {
    errors.inflationRate = 'Inflation rate must be between 0% and 10%';
  }

  if (!validateHomeValue(inputs.homeValue)) {
    errors.homeValue = 'Home value must be between $0 and $10,000,000';
  }

  if (!validateRefinanceRate(inputs.refinanceRate)) {
    errors.refinanceRate = 'Refinance rate must be between 0.1% and 20%';
  }

  if (!validateRefinanceCosts(inputs.refinanceCosts)) {
    errors.refinanceCosts = 'Refinance costs must be between $0 and $100,000';
  }

  if (!validatePayoffGoal(inputs.payoffGoal)) {
    errors.payoffGoal = 'Please select a valid payoff goal';
  }

  if (!validateTargetPayoffDate(inputs.targetPayoffDate)) {
    errors.targetPayoffDate = 'Target payoff date must be in the future';
  }

  if (!validatePrepaymentPenalty(inputs.prepaymentPenalty)) {
    errors.prepaymentPenalty = 'Please select whether prepayment penalty applies';
  }

  if (!validatePenaltyAmount(inputs.penaltyAmount)) {
    errors.penaltyAmount = 'Penalty amount must be between $0 and $100,000';
  }

  if (!validateState(inputs.state)) {
    errors.state = 'Please select a valid state';
  }

  // Cross-field validations
  if (!validateCurrentBalanceNotExceedingLoanAmount(inputs.currentBalance, inputs)) {
    errors.currentBalance = 'Current balance cannot exceed original loan amount';
  }

  if (!validateYearsRemainingNotExceedingLoanTerm(inputs.yearsRemaining, inputs)) {
    errors.yearsRemaining = 'Years remaining cannot exceed original loan term';
  }

  if (!validateLumpSumNotExceedingBalance(inputs.lumpSumPayment, inputs)) {
    errors.lumpSumPayment = 'Lump sum payment cannot exceed current balance';
  }

  if (!validateRefinanceRateLowerThanCurrent(inputs.refinanceRate, inputs)) {
    errors.refinanceRate = 'Refinance rate should be lower than current rate';
  }

  return errors;
}
