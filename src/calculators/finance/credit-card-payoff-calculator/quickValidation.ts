import { ValidationResult } from '../../types/calculator';

// Current Balance Validators
export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentBalance = 'Current balance is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentBalance = 'Current balance must be a valid number';
  } else if (value <= 0) {
    errors.currentBalance = 'Current balance must be greater than zero';
  } else if (value > 100000) {
    errors.currentBalance = 'Current balance cannot exceed $100,000';
  }

  // High balance warning
  if (value > 20000) {
    // This is informational, not an error
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Monthly Payment Validators
export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.monthlyPayment = 'Monthly payment is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.monthlyPayment = 'Monthly payment must be a valid number';
  } else if (value <= 0) {
    errors.monthlyPayment = 'Monthly payment must be greater than zero';
  }

  // Check against minimum payment
  if (allInputs?.minimumPayment && value < allInputs.minimumPayment) {
    errors.monthlyPayment = 'Monthly payment cannot be less than minimum payment';
  }

  // Check if payment is sufficient
  if (allInputs?.currentBalance && allInputs?.annualInterestRate) {
    const monthlyRate = allInputs.annualInterestRate / 100 / 12;
    const minEffectivePayment = allInputs.currentBalance * monthlyRate + 1;
    if (value < minEffectivePayment) {
      errors.monthlyPayment = 'Payment is too low to make progress on the balance';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Minimum Payment Validators
export function validateMinimumPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.minimumPayment = 'Minimum payment is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.minimumPayment = 'Minimum payment must be a valid number';
  } else if (value <= 0) {
    errors.minimumPayment = 'Minimum payment must be greater than zero';
  }

  // Check if minimum payment is reasonable for balance
  if (allInputs?.currentBalance) {
    const minPercent = (value / allInputs.currentBalance) * 100;
    if (minPercent < 2) {
      errors.minimumPayment = 'Minimum payment seems unusually low for the balance';
    } else if (minPercent > 10) {
      errors.minimumPayment = 'Minimum payment seems unusually high - please verify';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Annual Interest Rate Validators
export function validateAnnualInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.annualInterestRate = 'Interest rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.annualInterestRate = 'Interest rate must be a valid number';
  } else if (value < 0) {
    errors.annualInterestRate = 'Interest rate cannot be negative';
  } else if (value > 50) {
    errors.annualInterestRate = 'Interest rate cannot exceed 50%';
  }

  // High interest rate warning
  if (value > 20) {
    // This is informational, not an error
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Payoff Strategy Validators
export function validatePayoffStrategy(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const validStrategies = ['minimum', 'fixed', 'avalanche', 'snowball'];

  if (value === undefined || value === null) {
    errors.payoffStrategy = 'Payoff strategy is required';
  } else if (!validStrategies.includes(value)) {
    errors.payoffStrategy = 'Please select a valid payoff strategy';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Include Fees Validators
export function validateIncludeFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (typeof value !== 'boolean') {
    errors.includeFees = 'Include fees must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Late Fees Validators
export function validateLateFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Late fees are optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.lateFees = 'Late fees must be a valid number';
  } else if (value < 0) {
    errors.lateFees = 'Late fees cannot be negative';
  } else if (value > 500) {
    errors.lateFees = 'Late fees cannot exceed $500';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Cash Advance Fees Validators
export function validateCashAdvanceFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Cash advance fees are optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.cashAdvanceFees = 'Cash advance fees must be a valid number';
  } else if (value < 0) {
    errors.cashAdvanceFees = 'Cash advance fees cannot be negative';
  } else if (value > 1000) {
    errors.cashAdvanceFees = 'Cash advance fees cannot exceed $1,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Extra Payment Validators
export function validateExtraPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Extra payment is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.extraPayment = 'Extra payment must be a valid number';
  } else if (value < 0) {
    errors.extraPayment = 'Extra payment cannot be negative';
  } else if (allInputs?.currentBalance && value > allInputs.currentBalance) {
    errors.extraPayment = 'Extra payment cannot exceed current balance';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Extra Payment Frequency Validators
export function validateExtraPaymentFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const validFrequencies = ['monthly', 'biweekly', 'weekly'];

  if (value === undefined || value === null) {
    // Frequency is optional if no extra payment
  } else if (!validFrequencies.includes(value)) {
    errors.extraPaymentFrequency = 'Please select a valid payment frequency';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Payoff Goal Months Validators
export function validatePayoffGoalMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Payoff goal is optional
  } else if (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value)) {
    errors.payoffGoalMonths = 'Payoff goal must be a whole number';
  } else if (value < 1) {
    errors.payoffGoalMonths = 'Payoff goal must be at least 1 month';
  } else if (value > 600) {
    errors.payoffGoalMonths = 'Payoff goal cannot exceed 600 months (50 years)';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Target Payoff Date Validators
export function validateTargetPayoffDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null || value === '') {
    // Target date is optional
  } else {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      errors.targetPayoffDate = 'Please enter a valid date';
    } else if (date < new Date()) {
      errors.targetPayoffDate = 'Target date cannot be in the past';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}