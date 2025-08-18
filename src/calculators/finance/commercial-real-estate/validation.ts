import { ValidationResult } from '../../types/calculator';

/**
 * Validate commercial real estate calculator inputs
 */
export function validateCommercialRealEstateInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyValue', 'purchasePrice', 'downPayment', 'loanAmount', 
    'interestRate', 'loanTerm', 'annualRent'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Property value validation
  if (inputs.propertyValue < 100000) {
    errors.push('Property value must be at least $100,000');
  } else if (inputs.propertyValue > 100000000) {
    errors.push('Property value cannot exceed $100 million');
  }

  // Purchase price validation
  if (inputs.purchasePrice < 100000) {
    errors.push('Purchase price must be at least $100,000');
  } else if (inputs.purchasePrice > 100000000) {
    errors.push('Purchase price cannot exceed $100 million');
  }

  // Down payment validation
  if (inputs.downPayment < 50000) {
    errors.push('Down payment must be at least $50,000');
  } else if (inputs.downPayment > 20000000) {
    errors.push('Down payment cannot exceed $20 million');
  }

  // Loan amount validation
  if (inputs.loanAmount < 50000) {
    errors.push('Loan amount must be at least $50,000');
  } else if (inputs.loanAmount > 80000000) {
    errors.push('Loan amount cannot exceed $80 million');
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
  } else if (inputs.loanTerm > 30) {
    errors.push('Loan term cannot exceed 30 years');
  }

  // Annual rent validation
  if (inputs.annualRent < 10000) {
    errors.push('Annual rent must be at least $10,000');
  } else if (inputs.annualRent > 5000000) {
    errors.push('Annual rent cannot exceed $5 million');
  }

  // Optional field validation
  if (inputs.vacancyRate !== undefined) {
    if (inputs.vacancyRate < 0) {
      errors.push('Vacancy rate cannot be negative');
    } else if (inputs.vacancyRate > 50) {
      errors.push('Vacancy rate cannot exceed 50%');
    }
  }

  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  } else if (inputs.propertyTax > 1000000) {
    errors.push('Property tax cannot exceed $1 million');
  }

  if (inputs.insurance !== undefined && inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  } else if (inputs.insurance > 500000) {
    errors.push('Insurance cannot exceed $500,000');
  }

  if (inputs.utilities !== undefined && inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  } else if (inputs.utilities > 500000) {
    errors.push('Utilities cannot exceed $500,000');
  }

  if (inputs.maintenance !== undefined && inputs.maintenance < 0) {
    errors.push('Maintenance cannot be negative');
  } else if (inputs.maintenance > 1000000) {
    errors.push('Maintenance cannot exceed $1 million');
  }

  if (inputs.propertyManagement !== undefined) {
    if (inputs.propertyManagement < 0) {
      errors.push('Property management fee cannot be negative');
    } else if (inputs.propertyManagement > 15) {
      errors.push('Property management fee cannot exceed 15%');
    }
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  } else if (inputs.hoaFees > 200000) {
    errors.push('HOA fees cannot exceed $200,000');
  }

  if (inputs.otherExpenses !== undefined && inputs.otherExpenses < 0) {
    errors.push('Other expenses cannot be negative');
  } else if (inputs.otherExpenses > 500000) {
    errors.push('Other expenses cannot exceed $500,000');
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

  const loanToValue = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (loanToValue > 80) {
    errors.push('Loan-to-value ratio cannot exceed 80% for commercial properties');
  } else if (loanToValue > 70) {
    warnings.push('High loan-to-value ratio increases risk');
  }

  const downPaymentPercentage = (inputs.downPayment / inputs.purchasePrice) * 100;
  if (downPaymentPercentage < 20) {
    errors.push('Down payment must be at least 20% of purchase price for commercial properties');
  } else if (downPaymentPercentage < 25) {
    warnings.push('Low down payment may require additional guarantees');
  }

  // Rent-to-value ratio validation
  const rentToValueRatio = (inputs.annualRent / inputs.propertyValue) * 100;
  if (rentToValueRatio < 6) {
    warnings.push('Low rent-to-value ratio may indicate overvaluation');
  } else if (rentToValueRatio > 25) {
    warnings.push('High rent-to-value ratio may indicate undervaluation or high-risk area');
  }

  // Business rule validation
  const totalExpenses = (inputs.propertyTax || 0) + (inputs.insurance || 0) + 
    (inputs.utilities || 0) + (inputs.maintenance || 0) + (inputs.hoaFees || 0) + 
    (inputs.otherExpenses || 0);
  
  if (totalExpenses > inputs.annualRent * 0.7) {
    warnings.push('Total expenses exceed 70% of annual rent - may indicate poor profitability');
  }

  // Vacancy rate business rules
  if (inputs.vacancyRate > 20) {
    warnings.push('High vacancy rate may indicate market or property issues');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate commercial real estate reasonableness
 */
export function validateCommercialRealEstateReasonableness(
  capRate: number,
  cashOnCashReturn: number,
  debtServiceCoverageRatio: number,
  operatingExpenseRatio: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Cap rate validation
  if (capRate < 3) {
    warnings.push('Very low cap rate may indicate overvaluation');
  } else if (capRate > 15) {
    warnings.push('Very high cap rate may indicate high-risk area or property issues');
  }

  // Cash-on-cash return validation
  if (cashOnCashReturn < -10) {
    warnings.push('Very negative cash-on-cash return indicates high-risk investment');
  } else if (cashOnCashReturn > 20) {
    warnings.push('Very high cash-on-cash return may indicate unrealistic assumptions');
  }

  // Debt service coverage ratio validation
  if (debtServiceCoverageRatio < 1.0) {
    errors.push('Debt service coverage ratio below 1.0 indicates inability to cover debt');
  } else if (debtServiceCoverageRatio < 1.1) {
    warnings.push('Low debt service coverage ratio increases default risk');
  }

  // Operating expense ratio validation
  if (operatingExpenseRatio > 80) {
    warnings.push('Very high operating expense ratio indicates poor efficiency');
  } else if (operatingExpenseRatio < 30) {
    warnings.push('Very low operating expense ratio may indicate unrealistic assumptions');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
