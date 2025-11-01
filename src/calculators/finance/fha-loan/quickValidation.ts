import { FHALoanInputs } from './types';

export function validatePropertyValue(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value < 50000) {
    errors.push('Property value must be at least $50,000');
  }

  if (value > 10000000) {
    errors.push('Property value cannot exceed $10,000,000');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateDownPayment(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value < 0) {
    errors.push('Down payment cannot be negative');
  }

  // FHA requires minimum 3.5% down payment
  if (allInputs?.propertyValue && (value / allInputs.propertyValue) < 0.035) {
    errors.push('FHA requires minimum 3.5% down payment');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateLoanAmount(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  // FHA loan limits vary by county - using conservative estimate
  if (value > 1000000) {
    errors.push('Loan amount exceeds FHA limits for most areas');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateInterestRate(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value <= 0) {
    errors.push('Interest rate must be greater than 0');
  }

  if (value > 15) {
    errors.push('Interest rate cannot exceed 15%');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateLoanTerm(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value < 15) {
    errors.push('FHA loans must have minimum 15-year term');
  }

  if (value > 30) {
    errors.push('FHA loans cannot exceed 30-year term');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateBorrowerIncome(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateCreditScore(value: number, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (value < 300) {
    errors.push('Credit score cannot be below 300');
  }

  if (value > 850) {
    errors.push('Credit score cannot exceed 850');
  }

  if (value < 500) {
    errors.push('FHA requires minimum credit score of 500');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateAllFHALoanInputs(inputs: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyValue', 'downPayment', 'loanAmount', 'interestRate',
    'loanTerm', 'borrowerIncome', 'monthlyDebt', 'propertyTaxes',
    'homeownersInsurance', 'creditScore', 'occupancyType'
  ];

  for (const field of requiredFields) {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Individual field validation
  if (inputs.propertyValue !== undefined) {
    const result = validatePropertyValue(inputs.propertyValue, inputs);
    errors.push(...result.errors);
  }

  if (inputs.downPayment !== undefined) {
    const result = validateDownPayment(inputs.downPayment, inputs);
    errors.push(...result.errors);
  }

  if (inputs.loanAmount !== undefined) {
    const result = validateLoanAmount(inputs.loanAmount, inputs);
    errors.push(...result.errors);
  }

  if (inputs.interestRate !== undefined) {
    const result = validateInterestRate(inputs.interestRate, inputs);
    errors.push(...result.errors);
  }

  if (inputs.loanTerm !== undefined) {
    const result = validateLoanTerm(inputs.loanTerm, inputs);
    errors.push(...result.errors);
  }

  if (inputs.borrowerIncome !== undefined) {
    const result = validateBorrowerIncome(inputs.borrowerIncome, inputs);
    errors.push(...result.errors);
  }

  if (inputs.creditScore !== undefined) {
    const result = validateCreditScore(inputs.creditScore, inputs);
    errors.push(...result.errors);
  }

  // Business rule validation
  if (inputs.loanAmount && inputs.propertyValue) {
    const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (inputs.occupancyType === 'primary_residence' && ltvRatio > 96.5) {
      errors.push('LTV ratio cannot exceed 96.5% for primary residence');
    }
    if (inputs.occupancyType === 'second_home' && ltvRatio > 90) {
      errors.push('LTV ratio cannot exceed 90% for second home');
    }
  }

  return { isValid: errors.length === 0, errors };
}
