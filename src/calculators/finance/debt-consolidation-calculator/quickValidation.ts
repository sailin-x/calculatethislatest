import { ValidationResult } from '../../../types/calculator';

// Consolidation Amount Validators
export function validateConsolidationAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.consolidationAmount = 'Consolidation amount is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.consolidationAmount = 'Consolidation amount must be a valid number';
  } else if (value < 1000) {
    errors.consolidationAmount = 'Consolidation amount must be at least $1,000';
  } else if (value > 100000) {
    errors.consolidationAmount = 'Consolidation amount cannot exceed $100,000';
  }

  // Check if it matches total current debt
  if (allInputs && value) {
    const totalCurrentDebt = (allInputs.creditCardBalance || 0) +
                            (allInputs.personalLoanBalance || 0) +
                            (allInputs.otherDebts?.reduce((sum: number, debt: any) => sum + debt.balance, 0) || 0);
    if (totalCurrentDebt > 0) {
      const difference = Math.abs(value - totalCurrentDebt) / totalCurrentDebt;
      if (difference > 0.1) { // More than 10% difference
        errors.consolidationAmount = 'Consolidation amount should match your total current debt';
      }
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Consolidation Rate Validators
export function validateConsolidationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.consolidationRate = 'Consolidation interest rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.consolidationRate = 'Consolidation rate must be a valid number';
  } else if (value < 0) {
    errors.consolidationRate = 'Consolidation rate cannot be negative';
  } else if (value > 40) {
    errors.consolidationRate = 'Consolidation rate cannot exceed 40%';
  }

  // Check if it's lower than current average rate
  if (allInputs && value) {
    const totalDebt = (allInputs.creditCardBalance || 0) +
                     (allInputs.personalLoanBalance || 0) +
                     (allInputs.otherDebts?.reduce((sum: number, debt: any) => sum + debt.balance, 0) || 0);
    const weightedRate = totalDebt > 0 ?
      ((allInputs.creditCardRate || 0) * (allInputs.creditCardBalance || 0) +
       (allInputs.personalLoanRate || 0) * (allInputs.personalLoanBalance || 0) +
       (allInputs.otherDebts?.reduce((sum: number, debt: any) => sum + debt.rate * debt.balance, 0) || 0)) / totalDebt
      : 0;
    if (value > weightedRate && weightedRate > 0) {
      errors.consolidationRate = 'Consolidation rate should be lower than your current average rate';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Consolidation Term Validators
export function validateConsolidationTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.consolidationTerm = 'Consolidation term is required';
  } else if (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value)) {
    errors.consolidationTerm = 'Consolidation term must be a whole number';
  } else if (value < 6) {
    errors.consolidationTerm = 'Consolidation term must be at least 6 months';
  } else if (value > 120) {
    errors.consolidationTerm = 'Consolidation term cannot exceed 120 months (10 years)';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Consolidation Fees Validators
export function validateConsolidationFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Fees are optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.consolidationFees = 'Consolidation fees must be a valid number';
  } else if (value < 0) {
    errors.consolidationFees = 'Consolidation fees cannot be negative';
  } else if (value > 5000) {
    errors.consolidationFees = 'Consolidation fees cannot exceed $5,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Credit Card Balance Validators
export function validateCreditCardBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Credit card balance is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.creditCardBalance = 'Credit card balance must be a valid number';
  } else if (value < 0) {
    errors.creditCardBalance = 'Credit card balance cannot be negative';
  } else if (value > 50000) {
    errors.creditCardBalance = 'Credit card balance cannot exceed $50,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Credit Card Rate Validators
export function validateCreditCardRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Credit card rate is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.creditCardRate = 'Credit card rate must be a valid number';
  } else if (value < 0) {
    errors.creditCardRate = 'Credit card rate cannot be negative';
  } else if (value > 50) {
    errors.creditCardRate = 'Credit card rate cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Personal Loan Balance Validators
export function validatePersonalLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Personal loan balance is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.personalLoanBalance = 'Personal loan balance must be a valid number';
  } else if (value < 0) {
    errors.personalLoanBalance = 'Personal loan balance cannot be negative';
  } else if (value > 50000) {
    errors.personalLoanBalance = 'Personal loan balance cannot exceed $50,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Personal Loan Rate Validators
export function validatePersonalLoanRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Personal loan rate is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.personalLoanRate = 'Personal loan rate must be a valid number';
  } else if (value < 0) {
    errors.personalLoanRate = 'Personal loan rate cannot be negative';
  } else if (value > 40) {
    errors.personalLoanRate = 'Personal loan rate cannot exceed 40%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Monthly Income Validators
export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Monthly income is optional but recommended
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.monthlyIncome = 'Monthly income must be a valid number';
  } else if (value <= 0) {
    errors.monthlyIncome = 'Monthly income must be greater than zero';
  } else if (value > 50000) {
    errors.monthlyIncome = 'Monthly income cannot exceed $50,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Monthly Expenses Validators
export function validateMonthlyExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Monthly expenses are optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.monthlyExpenses = 'Monthly expenses must be a valid number';
  } else if (value < 0) {
    errors.monthlyExpenses = 'Monthly expenses cannot be negative';
  } else if (value > 50000) {
    errors.monthlyExpenses = 'Monthly expenses cannot exceed $50,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Payoff Priority Validators
export function validatePayoffPriority(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const validPriorities = ['lowest_rate', 'highest_balance', 'lowest_payment'];

  if (value === undefined || value === null) {
    errors.payoffPriority = 'Payoff priority is required';
  } else if (!validPriorities.includes(value)) {
    errors.payoffPriority = 'Please select a valid payoff priority';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Target Monthly Payment Validators
export function validateTargetMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Target payment is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.targetMonthlyPayment = 'Target monthly payment must be a valid number';
  } else if (value <= 0) {
    errors.targetMonthlyPayment = 'Target monthly payment must be greater than zero';
  } else if (value > 10000) {
    errors.targetMonthlyPayment = 'Target monthly payment cannot exceed $10,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Other Debts Validators
export function validateOtherDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Other debts are optional
  } else if (!Array.isArray(value)) {
    errors.otherDebts = 'Other debts must be a list';
  } else {
    value.forEach((debt: any, index: number) => {
      if (!debt.name || !debt.balance || !debt.rate || !debt.minimumPayment) {
        errors.otherDebts = `Debt #${index + 1} is missing required information`;
      }
      if (debt.balance < 0 || debt.rate < 0 || debt.minimumPayment < 0) {
        errors.otherDebts = `Debt #${index + 1} has invalid values`;
      }
    });
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}