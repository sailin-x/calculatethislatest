import { ValidationResult } from '../../types/calculator';

/**
 * Validate commercial lease buyout calculator inputs
 */
export function validateLeaseBuyoutInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyValue', 'buyoutPrice', 'downPayment', 'loanAmount', 
    'interestRate', 'loanTerm', 'currentRent', 'marketRent', 'remainingLeaseTerm'
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

  // Buyout price validation
  if (inputs.buyoutPrice < 50000) {
    errors.push('Buyout price must be at least $50,000');
  } else if (inputs.buyoutPrice > 100000000) {
    errors.push('Buyout price cannot exceed $100 million');
  }

  // Down payment validation
  if (inputs.downPayment < 25000) {
    errors.push('Down payment must be at least $25,000');
  } else if (inputs.downPayment > 20000000) {
    errors.push('Down payment cannot exceed $20 million');
  }

  // Loan amount validation
  if (inputs.loanAmount < 25000) {
    errors.push('Loan amount must be at least $25,000');
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

  // Current rent validation
  if (inputs.currentRent < 500) {
    errors.push('Current rent must be at least $500 per month');
  } else if (inputs.currentRent > 500000) {
    errors.push('Current rent cannot exceed $500,000 per month');
  }

  // Market rent validation
  if (inputs.marketRent < 500) {
    errors.push('Market rent must be at least $500 per month');
  } else if (inputs.marketRent > 500000) {
    errors.push('Market rent cannot exceed $500,000 per month');
  }

  // Remaining lease term validation
  if (inputs.remainingLeaseTerm < 1) {
    errors.push('Remaining lease term must be at least 1 year');
  } else if (inputs.remainingLeaseTerm > 20) {
    errors.push('Remaining lease term cannot exceed 20 years');
  }

  // Optional field validation
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  } else if (inputs.closingCosts > 100000) {
    errors.push('Closing costs cannot exceed $100,000');
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

  if (inputs.taxRate !== undefined) {
    if (inputs.taxRate < 0) {
      errors.push('Tax rate cannot be negative');
    } else if (inputs.taxRate > 50) {
      errors.push('Tax rate cannot exceed 50%');
    }
  }

  // Cross-field validation
  if (inputs.downPayment + inputs.loanAmount !== inputs.buyoutPrice) {
    warnings.push('Down payment + loan amount should equal buyout price');
  }

  const loanToValue = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (loanToValue > 85) {
    errors.push('Loan-to-value ratio cannot exceed 85% for commercial properties');
  } else if (loanToValue > 75) {
    warnings.push('High loan-to-value ratio increases risk');
  }

  const downPaymentPercentage = (inputs.downPayment / inputs.buyoutPrice) * 100;
  if (downPaymentPercentage < 15) {
    errors.push('Down payment must be at least 15% of buyout price for commercial properties');
  } else if (downPaymentPercentage < 20) {
    warnings.push('Low down payment may require additional guarantees');
  }

  // Buyout price vs property value validation
  if (inputs.buyoutPrice > inputs.propertyValue * 1.1) {
    warnings.push('Buyout price significantly exceeds property value');
  } else if (inputs.buyoutPrice < inputs.propertyValue * 0.7) {
    warnings.push('Buyout price significantly below property value - verify accuracy');
  }

  // Rent validation
  if (inputs.marketRent < inputs.currentRent * 0.5) {
    warnings.push('Market rent significantly below current rent - verify accuracy');
  } else if (inputs.marketRent > inputs.currentRent * 2) {
    warnings.push('Market rent significantly above current rent - verify accuracy');
  }

  // Business rule validation
  if (inputs.closingCosts > inputs.buyoutPrice * 0.05) {
    warnings.push('Closing costs exceed 5% of buyout price - consider alternatives');
  }

  // Interest rate business rules
  if (inputs.interestRate > 8) {
    warnings.push('High interest rate may make buyout less attractive');
  }

  // Lease term business rules
  if (inputs.remainingLeaseTerm < 2) {
    warnings.push('Short remaining lease term may limit buyout benefits');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate lease buyout reasonableness
 */
export function validateLeaseBuyoutReasonableness(
  rentSavings: number,
  breakEvenMonths: number,
  capRate: number,
  debtServiceCoverage: number,
  cashOnCashReturn: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rent savings validation
  if (rentSavings < -2000) {
    warnings.push('Very negative rent savings indicates expensive buyout');
  } else if (rentSavings > 5000) {
    warnings.push('Very high rent savings may indicate unrealistic assumptions');
  }

  // Break-even validation
  if (breakEvenMonths > 200) {
    warnings.push('Very long break-even period increases investment risk');
  }

  // Cap rate validation
  if (capRate < 3) {
    warnings.push('Very low cap rate may indicate overvaluation');
  } else if (capRate > 15) {
    warnings.push('Very high cap rate may indicate high-risk area or property issues');
  }

  // Debt service coverage validation
  if (debtServiceCoverage < 1.0) {
    errors.push('Debt service coverage ratio below 1.0 indicates inability to cover debt');
  } else if (debtServiceCoverage < 1.1) {
    warnings.push('Low debt service coverage ratio increases default risk');
  }

  // Cash-on-cash return validation
  if (cashOnCashReturn < -15) {
    warnings.push('Very negative cash-on-cash return indicates high-risk investment');
  } else if (cashOnCashReturn > 20) {
    warnings.push('Very high cash-on-cash return may indicate unrealistic assumptions');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
