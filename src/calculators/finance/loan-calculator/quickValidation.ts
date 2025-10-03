export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined) {
    return { isValid: false, message: 'Interest rate is required' };
  }
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Interest rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!value || !validFrequencies.includes(value)) {
    return {
      isValid: false,
      message: 'Payment frequency must be monthly, quarterly, semi-annually, or annually'
    };
  }
  return { isValid: true };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['personal', 'business', 'student', 'auto', 'other'];
  if (value && !validTypes.includes(value)) {
    return {
      isValid: false,
      message: 'Loan type must be personal, business, student, auto, or other'
    };
  }
  return { isValid: true };
}

export function validateExtraPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Extra payment cannot be negative' };
  }
  if (allInputs?.loanAmount && value >= allInputs.loanAmount) {
    return { isValid: false, message: 'Extra payment cannot be greater than or equal to loan amount' };
  }
  return { isValid: true };
}
