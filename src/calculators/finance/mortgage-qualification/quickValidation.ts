import { ValidationResult } from '../../types/calculator';

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.borrowerIncome = 'Borrower income is required';
  } else if (typeof value !== 'number' || value <= 0) {
    errors.borrowerIncome = 'Borrower income must be a positive number';
  } else if (value > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10,000,000';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCoBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value !== undefined && value !== null && value !== '') {
    if (typeof value !== 'number' || value < 0) {
      errors.coBorrowerIncome = 'Co-borrower income must be a non-negative number';
    } else if (value > 10000000) {
      errors.coBorrowerIncome = 'Co-borrower income cannot exceed $10,000,000';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.borrowerCreditScore = 'Borrower credit score is required';
  } else if (typeof value !== 'number' || value < 300 || value > 850) {
    errors.borrowerCreditScore = 'Borrower credit score must be between 300 and 850';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCoBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value !== undefined && value !== null && value !== '') {
    if (typeof value !== 'number' || value < 300 || value > 850) {
      errors.coBorrowerCreditScore = 'Co-borrower credit score must be between 300 and 850';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateBorrowerEmploymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner', 'unemployed'];

  if (!value || !validTypes.includes(value)) {
    errors.borrowerEmploymentType = 'Please select a valid employment type';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCoBorrowerEmploymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner', 'unemployed'];

  if (value && !validTypes.includes(value)) {
    errors.coBorrowerEmploymentType = 'Please select a valid employment type for co-borrower';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateBorrowerEmploymentLength(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.borrowerEmploymentLength = 'Borrower employment length is required';
  } else if (typeof value !== 'number' || value < 0 || value > 50) {
    errors.borrowerEmploymentLength = 'Borrower employment length must be between 0 and 50 years';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCoBorrowerEmploymentLength(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value !== undefined && value !== null && value !== '') {
    if (typeof value !== 'number' || value < 0 || value > 50) {
      errors.coBorrowerEmploymentLength = 'Co-borrower employment length must be between 0 and 50 years';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateBaseSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.baseSalary = 'Base salary is required';
  } else if (typeof value !== 'number' || value < 0) {
    errors.baseSalary = 'Base salary must be a non-negative number';
  } else if (value > 10000000) {
    errors.baseSalary = 'Base salary cannot exceed $10,000,000';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.propertyValue = 'Property value is required';
  } else if (typeof value !== 'number' || value <= 0) {
    errors.propertyValue = 'Property value must be a positive number';
  } else if (value > 100000000) {
    errors.propertyValue = 'Property value cannot exceed $100,000,000';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.loanAmount = 'Loan amount is required';
  } else if (typeof value !== 'number' || value <= 0) {
    errors.loanAmount = 'Loan amount must be a positive number';
  } else if (value > 100000000) {
    errors.loanAmount = 'Loan amount cannot exceed $100,000,000';
  }

  // Check against property value if available
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    errors.loanAmount = 'Loan amount cannot exceed property value';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.interestRate = 'Interest rate is required';
  } else if (typeof value !== 'number' || value <= 0 || value > 30) {
    errors.interestRate = 'Interest rate must be between 0.01% and 30%';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.loanTerm = 'Loan term is required';
  } else if (typeof value !== 'number' || value < 1 || value > 50) {
    errors.loanTerm = 'Loan term must be between 1 and 50 years';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];

  if (!value || !validTypes.includes(value)) {
    errors.loanType = 'Please select a valid loan type';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.downPayment = 'Down payment is required';
  } else if (typeof value !== 'number' || value < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  } else if (value > 100000000) {
    errors.downPayment = 'Down payment cannot exceed $100,000,000';
  }

  // Check against property value if available
  if (allInputs?.propertyValue && value >= allInputs.propertyValue) {
    errors.downPayment = 'Down payment cannot equal or exceed property value';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.propertyInsurance = 'Property insurance is required';
  } else if (typeof value !== 'number' || value < 0) {
    errors.propertyInsurance = 'Property insurance cannot be negative';
  } else if (value > 100000) {
    errors.propertyInsurance = 'Property insurance cannot exceed $100,000';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.propertyTaxes = 'Property taxes is required';
  } else if (typeof value !== 'number' || value < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  } else if (value > 1000000) {
    errors.propertyTaxes = 'Property taxes cannot exceed $1,000,000';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}