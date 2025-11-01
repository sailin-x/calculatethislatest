import { ValidationResult } from '../../../types/calculator';

/**
 * Validate CashOnCash return calculator inputs
 */
export function validateCashOnCashReturnInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'purchasePrice', 'downPayment', 'monthlyRent', 'loanAmount', 
    'interestRate', 'loanTerm'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Purchase price validation
  if (inputs.purchasePrice < 50000) {
    errors.push('Purchase price must be at least $50,000');
  } else if (inputs.purchasePrice > 10000000) {
    errors.push('Purchase price cannot exceed $10 million');
  }

  // Down payment validation
  if (inputs.downPayment < 10000) {
    errors.push('Down payment must be at least $10,000');
  } else if (inputs.downPayment > 2000000) {
    errors.push('Down payment cannot exceed $2 million');
  }

  // Monthly rent validation
  if (inputs.monthlyRent < 500) {
    errors.push('Monthly rent must be at least $500');
  } else if (inputs.monthlyRent > 50000) {
    errors.push('Monthly rent cannot exceed $50,000');
  }

  // Loan amount validation
  if (inputs.loanAmount < 10000) {
    errors.push('Loan amount must be at least $10,000');
  } else if (inputs.loanAmount > 8000000) {
    errors.push('Loan amount cannot exceed $8 million');
  }

  // Interest rate validation
  if (inputs.interestRate < 1) {
    errors.push('Interest rate must be at least 1%');
  } else if (inputs.interestRate > 15) {
    errors.push('Interest rate cannot exceed 15%');
  }

  // Loan term validation
  if (inputs.loanTerm < 5) {
    errors.push('Loan term must be at least 5 years');
  } else if (inputs.loanTerm > 50) {
    errors.push('Loan term cannot exceed 50 years');
  }

  // Optional field validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 100000) {
    errors.push('Closing costs cannot exceed $100,000');
  }

  if (inputs.renovationCosts !== undefined && inputs.renovationCosts < 0) {
    errors.push('Renovation costs cannot be negative');
  } else if (inputs.renovationCosts > 500000) {
    errors.push('Renovation costs cannot exceed $500,000');
  }

  if (inputs.vacancyRate !== undefined) {
    if (inputs.vacancyRate < 0) {
      errors.push('Vacancy rate cannot be negative');
    } else if (inputs.vacancyRate > 50) {
      errors.push('Vacancy rate cannot exceed 50%');
    }
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

  if (inputs.utilities !== undefined && inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  } else if (inputs.utilities > 100000) {
    errors.push('Utilities cannot exceed $100,000');
  }

  if (inputs.maintenance !== undefined && inputs.maintenance < 0) {
    errors.push('Maintenance cannot be negative');
  } else if (inputs.maintenance > 100000) {
    errors.push('Maintenance cannot exceed $100,000');
  }

  if (inputs.propertyManagement !== undefined) {
    if (inputs.propertyManagement < 0) {
      errors.push('Property management fee cannot be negative');
    } else if (inputs.propertyManagement > 20) {
      errors.push('Property management fee cannot exceed 20%');
    }
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  } else if (inputs.hoaFees > 50000) {
    errors.push('HOA fees cannot exceed $50,000');
  }

  if (inputs.otherExpenses !== undefined && inputs.otherExpenses < 0) {
    errors.push('Other expenses cannot be negative');
  } else if (inputs.otherExpenses > 100000) {
    errors.push('Other expenses cannot exceed $100,000');
  }

  if (inputs.appreciationRate !== undefined) {
    if (inputs.appreciationRate < -10) {
      errors.push('Appreciation rate cannot be less than -10%');
    } else if (inputs.appreciationRate > 15) {
      errors.push('Appreciation rate cannot exceed 15%');
    }
  }

  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < 0) {
      errors.push('Inflation rate cannot be negative');
    } else if (inputs.inflationRate > 10) {
      errors.push('Inflation rate cannot exceed 10%');
    }
  }

  // Cross-field validation
  if (inputs.downPayment + inputs.loanAmount !== inputs.purchasePrice) {
    warnings.push('Down payment + loan amount should equal purchase price');
  }

  const loanToValue = (inputs.loanAmount / inputs.purchasePrice) * 100;
  if (loanToValue > 95) {
    errors.push('LoanToValue ratio cannot exceed 95%');
  } else if (loanToValue > 80) {
    warnings.push('High LoanToValue ratio increases risk');
  }

  const downPaymentPercentage = (inputs.downPayment / inputs.purchasePrice) * 100;
  if (downPaymentPercentage < 5) {
    errors.push('Down payment must be at least 5% of purchase price');
  } else if (downPaymentPercentage < 20) {
    warnings.push('Low down payment may require PMI and increases risk');
  }

  // RentToValue ratio validation
  const annualRent = inputs.monthlyRent * 12;
  const rentToValueRatio = (annualRent / inputs.purchasePrice) * 100;
  if (rentToValueRatio < 5) {
    warnings.push('Low RentToValue ratio may indicate overvaluation');
  } else if (rentToValueRatio > 20) {
    warnings.push('High RentToValue ratio may indicate undervaluation or high-risk area');
  }

  // Business rule validation
  const totalExpenses = (inputs.propertyTax || 0) + (inputs.insurance || 0) + 
    (inputs.utilities || 0) + (inputs.maintenance || 0) + (inputs.hoaFees || 0) + 
    (inputs.otherExpenses || 0);
  
  if (totalExpenses > annualRent * 0.8) {
    warnings.push('Total expenses exceed 80% of annual rent - may indicate poor profitability');
  }

  // Vacancy rate business rules
  if (inputs.vacancyRate > 15) {
    warnings.push('High vacancy rate may indicate market or property issues');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate CashOnCash return reasonableness
 */
export function validateCashOnCashReturnReasonableness(
  cashOnCashReturn: number,
  totalReturn: number,
  capRate: number,
  paybackPeriod: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // CashOnCash return validation
  if (cashOnCashReturn < -20) {
    warnings.push('Very negative CashOnCash return indicates high-risk investment');
  } else if (cashOnCashReturn > 25) {
    warnings.push('Very high CashOnCash return may indicate unrealistic assumptions');
  }

  // Total return validation
  if (totalReturn < -10) {
    warnings.push('Very negative total return indicates poor investment');
  } else if (totalReturn > 30) {
    warnings.push('Very high total return may indicate unrealistic assumptions');
  }

  // Cap rate validation
  if (capRate < 2) {
    warnings.push('Very low cap rate may indicate overvaluation');
  } else if (capRate > 15) {
    warnings.push('Very high cap rate may indicate high-risk area or property issues');
  }

  // Payback period validation
  if (paybackPeriod > 30) {
    warnings.push('Very long payback period increases investment risk');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
