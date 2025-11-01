import { ValidationResult } from '../../../types/calculator';

/**
 * Validate cash-out refinance calculator inputs
 */
export function validateCashOutRefinanceInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'currentHomeValue', 'currentLoanBalance', 'currentInterestRate', 
    'currentMonthlyPayment', 'currentLoanTerm', 'newLoanAmount', 
    'newInterestRate', 'newLoanTerm'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Current home value validation
  if (inputs.currentHomeValue < 50000) {
    errors.push('Current home value must be at least $50,000');
  } else if (inputs.currentHomeValue > 10000000) {
    errors.push('Current home value cannot exceed $10 million');
  }

  // Current loan balance validation
  if (inputs.currentLoanBalance < 1000) {
    errors.push('Current loan balance must be at least $1,000');
  } else if (inputs.currentLoanBalance > 5000000) {
    errors.push('Current loan balance cannot exceed $5 million');
  }

  // Current interest rate validation
  if (inputs.currentInterestRate < 1) {
    errors.push('Current interest rate must be at least 1%');
  } else if (inputs.currentInterestRate > 15) {
    errors.push('Current interest rate cannot exceed 15%');
  }

  // Current monthly payment validation
  if (inputs.currentMonthlyPayment < 100) {
    errors.push('Current monthly payment must be at least $100');
  } else if (inputs.currentMonthlyPayment > 50000) {
    errors.push('Current monthly payment cannot exceed $50,000');
  }

  // Current loan term validation
  if (inputs.currentLoanTerm < 1) {
    errors.push('Current loan term must be at least 1 year');
  } else if (inputs.currentLoanTerm > 30) {
    errors.push('Current loan term cannot exceed 30 years');
  }

  // New loan amount validation
  if (inputs.newLoanAmount < 1000) {
    errors.push('New loan amount must be at least $1,000');
  } else if (inputs.newLoanAmount > 5000000) {
    errors.push('New loan amount cannot exceed $5 million');
  }

  // New interest rate validation
  if (inputs.newInterestRate < 1) {
    errors.push('New interest rate must be at least 1%');
  } else if (inputs.newInterestRate > 15) {
    errors.push('New interest rate cannot exceed 15%');
  }

  // New loan term validation
  if (inputs.newLoanTerm < 5) {
    errors.push('New loan term must be at least 5 years');
  } else if (inputs.newLoanTerm > 30) {
    errors.push('New loan term cannot exceed 30 years');
  }

  // Optional field validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 50000) {
    errors.push('Closing costs cannot exceed $50,000');
  }

  if (inputs.cashOutAmount !== undefined && inputs.cashOutAmount < 0) {
    errors.push('Cash-out amount cannot be negative');
  } else if (inputs.cashOutAmount > 2000000) {
    errors.push('Cash-out amount cannot exceed $2 million');
  }

  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  } else if (inputs.propertyTax > 100000) {
    errors.push('Property tax cannot exceed $100,000');
  }

  if (inputs.insurance !== undefined && inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  } else if (inputs.insurance > 50000) {
    errors.push('Insurance cannot exceed $50,000');
  }

  if (inputs.pmi !== undefined && inputs.pmi < 0) {
    errors.push('PMI cannot be negative');
  } else if (inputs.pmi > 1000) {
    errors.push('PMI cannot exceed $1,000 per month');
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  } else if (inputs.hoaFees > 2000) {
    errors.push('HOA fees cannot exceed $2,000 per month');
  }

  if (inputs.investmentReturn !== undefined) {
    if (inputs.investmentReturn < 0) {
      errors.push('Investment return cannot be negative');
    } else if (inputs.investmentReturn > 20) {
      errors.push('Investment return cannot exceed 20%');
    }
  }

  if (inputs.taxRate !== undefined) {
    if (inputs.taxRate < 0) {
      errors.push('Tax rate cannot be negative');
    } else if (inputs.taxRate > 50) {
      errors.push('Tax rate cannot exceed 50%');
    }
  }

  // Cross-field validation
  if (inputs.currentLoanBalance >= inputs.currentHomeValue) {
    errors.push('Current loan balance cannot exceed current home value');
  }

  const currentEquity = inputs.currentHomeValue - inputs.currentLoanBalance;
  if (currentEquity < 0) {
    errors.push('Current equity cannot be negative');
  }

  // New loan amount validation
  if (inputs.newLoanAmount > inputs.currentHomeValue * 0.95) {
    errors.push('New loan amount cannot exceed 95% of current home value');
  }

  // Cash-out amount validation
  if (inputs.cashOutAmount > currentEquity * 0.8) {
    errors.push('Cash-out amount cannot exceed 80% of current equity');
  }

  // LoanToValue ratio validation
  const newLoanToValue = (inputs.newLoanAmount / inputs.currentHomeValue) * 100;
  if (newLoanToValue > 95) {
    errors.push('New LoanToValue ratio cannot exceed 95%');
  } else if (newLoanToValue > 80) {
    warnings.push('High LoanToValue ratio may require PMI');
  }

  // Business rule validation
  if (inputs.closingCosts > inputs.currentHomeValue * 0.03) {
    warnings.push('Closing costs exceed 3% of home value - consider alternatives');
  }

  // Interest rate comparison
  if (inputs.newInterestRate > inputs.currentInterestRate + 2) {
    warnings.push('Significantly higher new interest rate may not be beneficial');
  }

  // Term extension validation
  if (inputs.newLoanTerm > inputs.currentLoanTerm + 10) {
    warnings.push('Significant term extension increases total interest paid');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate cash-out refinance reasonableness
 */
export function validateCashOutRefinanceReasonableness(
  paymentDifference: number,
  breakEvenMonths: number,
  newLoanToValue: number,
  netCashReceived: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Payment difference validation
  if (paymentDifference > 1000) {
    warnings.push('Large payment increase may strain budget');
  }

  // Break-even validation
  if (breakEvenMonths > 60) {
    warnings.push('Very long break-even period increases risk');
  }

  // LoanToValue validation
  if (newLoanToValue > 90) {
    warnings.push('Very high LoanToValue ratio increases default risk');
  }

  // Cash-out validation
  if (netCashReceived > 200000) {
    warnings.push('Very large cash-out amount increases debt burden');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
