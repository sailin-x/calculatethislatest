import { QuickValidationResult } from '../../../types/calculator';
import { MortgageEquityInputs } from './formulas';

export function quickValidateCurrentPropertyValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Current property value must be positive',
      severity: 'error'
    };
  }

  if (value < 10000) {
    return {
      isValid: false,
      message: 'Current property value must be at least $10,000',
      severity: 'error'
    };
  }

  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Current property value cannot exceed $10,000,000',
      severity: 'error'
    };
  }

  if (value > 5000000) {
    return {
      isValid: true,
      message: 'High property value - consider jumbo loan requirements',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid current property value',
    severity: 'success'
  };
}

export function quickValidateOriginalPurchasePrice(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Original purchase price must be positive',
      severity: 'error'
    };
  }

  if (value < 10000) {
    return {
      isValid: false,
      message: 'Original purchase price must be at least $10,000',
      severity: 'error'
    };
  }

  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Original purchase price cannot exceed $10,000,000',
      severity: 'error'
    };
  }

  return {
    isValid: true,
    message: 'Valid original purchase price',
    severity: 'success'
  };
}

export function quickValidateOriginalDownPayment(value: number, originalPurchasePrice?: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Original down payment cannot be negative',
      severity: 'error'
    };
  }

  if (value > 5000000) {
    return {
      isValid: false,
      message: 'Original down payment cannot exceed $5,000,000',
      severity: 'error'
    };
  }

  if (originalPurchasePrice && value >= originalPurchasePrice) {
    return {
      isValid: false,
      message: 'Original down payment cannot be greater than or equal to original purchase price',
      severity: 'error'
    };
  }

  if (originalPurchasePrice) {
    const downPaymentPercentage = (value / originalPurchasePrice) * 100;
    if (downPaymentPercentage < 3.5) {
      return {
        isValid: true,
        message: 'Very low down payment - may require FHA loan',
        severity: 'warning'
      };
    } else if (downPaymentPercentage < 20) {
      return {
        isValid: true,
        message: 'Low down payment - PMI may be required',
        severity: 'warning'
      };
    } else if (downPaymentPercentage >= 20) {
      return {
        isValid: true,
        message: 'Good down payment - no PMI required',
        severity: 'success'
      };
    }
  }

  return {
    isValid: true,
    message: 'Valid original down payment',
    severity: 'success'
  };
}

export function quickValidateCurrentMortgageBalance(value: number, currentPropertyValue?: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Current mortgage balance cannot be negative',
      severity: 'error'
    };
  }

  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Current mortgage balance cannot exceed $10,000,000',
      severity: 'error'
    };
  }

  if (currentPropertyValue && value > currentPropertyValue) {
    return {
      isValid: false,
      message: 'Current mortgage balance cannot exceed current property value',
      severity: 'error'
    };
  }

  if (currentPropertyValue) {
    const ltvRatio = (value / currentPropertyValue) * 100;
    if (ltvRatio > 95) {
      return {
        isValid: true,
        message: 'Very high LTV ratio - underwater on mortgage',
        severity: 'error'
      };
    } else if (ltvRatio > 80) {
      return {
        isValid: true,
        message: 'High LTV ratio - PMI may be required',
        severity: 'warning'
      };
    } else if (ltvRatio <= 60) {
      return {
        isValid: true,
        message: 'Good LTV ratio - excellent refinancing opportunities',
        severity: 'success'
      };
    }
  }

  return {
    isValid: true,
    message: 'Valid current mortgage balance',
    severity: 'success'
  };
}

export function quickValidatePropertyImprovements(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Property improvements cannot be negative',
      severity: 'error'
    };
  }

  if (value > 2000000) {
    return {
      isValid: false,
      message: 'Property improvements cannot exceed $2,000,000',
      severity: 'error'
    };
  }

  if (value > 500000) {
    return {
      isValid: true,
      message: 'High improvement costs - verify against property value',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid property improvements',
    severity: 'success'
  };
}

export function quickValidateMarketAppreciation(value: number): QuickValidationResult {
  if (value < -50) {
    return {
      isValid: false,
      message: 'Market appreciation cannot be less than -50%',
      severity: 'error'
    };
  }

  if (value > 200) {
    return {
      isValid: false,
      message: 'Market appreciation cannot exceed 200%',
      severity: 'error'
    };
  }

  if (value < -20) {
    return {
      isValid: true,
      message: 'Significant market depreciation - verify property value',
      severity: 'warning'
    };
  }

  if (value > 100) {
    return {
      isValid: true,
      message: 'Very high appreciation - verify property value',
      severity: 'warning'
    };
  }

  if (value > 50) {
    return {
      isValid: true,
      message: 'Strong market appreciation',
      severity: 'success'
    };
  }

  return {
    isValid: true,
    message: 'Valid market appreciation',
    severity: 'success'
  };
}

export function quickValidateInterestRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Interest rate must be positive',
      severity: 'error'
    };
  }

  if (value < 0.1) {
    return {
      isValid: false,
      message: 'Interest rate must be at least 0.1%',
      severity: 'error'
    };
  }

  if (value > 20) {
    return {
      isValid: false,
      message: 'Interest rate cannot exceed 20%',
      severity: 'error'
    };
  }

  if (value > 8) {
    return {
      isValid: true,
      message: 'High interest rate - consider refinancing options',
      severity: 'warning'
    };
  }

  if (value < 3) {
    return {
      isValid: true,
      message: 'Excellent interest rate',
      severity: 'success'
    };
  }

  return {
    isValid: true,
    message: 'Valid interest rate',
    severity: 'success'
  };
}

export function quickValidateRemainingLoanTerm(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Remaining loan term must be positive',
      severity: 'error'
    };
  }

  if (value < 1) {
    return {
      isValid: false,
      message: 'Remaining loan term must be at least 1 year',
      severity: 'error'
    };
  }

  if (value > 50) {
    return {
      isValid: false,
      message: 'Remaining loan term cannot exceed 50 years',
      severity: 'error'
    };
  }

  if (value > 30) {
    return {
      isValid: true,
      message: 'Very long remaining term - consider refinancing to shorter term',
      severity: 'warning'
    };
  }

  if (value < 5) {
    return {
      isValid: true,
      message: 'Short remaining term - limited refinancing benefits',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid remaining loan term',
    severity: 'success'
  };
}

export function quickValidateCreditScore(value: number): QuickValidationResult {
  if (value < 300) {
    return {
      isValid: false,
      message: 'Credit score must be at least 300',
      severity: 'error'
    };
  }

  if (value > 850) {
    return {
      isValid: false,
      message: 'Credit score cannot exceed 850',
      severity: 'error'
    };
  }

  if (value < 580) {
    return {
      isValid: true,
      message: 'Poor credit score - limited loan options available',
      severity: 'warning'
    };
  }

  if (value < 620) {
    return {
      isValid: true,
      message: 'Fair credit score - may qualify for FHA loans',
      severity: 'warning'
    };
  }

  if (value < 680) {
    return {
      isValid: true,
      message: 'Good credit score',
      severity: 'success'
    };
  }

  if (value < 740) {
    return {
      isValid: true,
      message: 'Very good credit score',
      severity: 'success'
    };
  }

  return {
    isValid: true,
    message: 'Excellent credit score - best rates available',
    severity: 'success'
  };
}

export function quickValidateDebtToIncomeRatio(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Debt-to-income ratio cannot be negative',
      severity: 'error'
    };
  }

  if (value > 100) {
    return {
      isValid: false,
      message: 'Debt-to-income ratio cannot exceed 100%',
      severity: 'error'
    };
  }

  if (value > 43) {
    return {
      isValid: true,
      message: 'High DTI ratio - may not qualify for refinancing',
      severity: 'warning'
    };
  }

  if (value > 36) {
    return {
      isValid: true,
      message: 'Moderate DTI ratio - some lenders may have restrictions',
      severity: 'warning'
    };
  }

  if (value < 28) {
    return {
      isValid: true,
      message: 'Excellent DTI ratio - best loan terms available',
      severity: 'success'
    };
  }

  return {
    isValid: true,
    message: 'Valid debt-to-income ratio',
    severity: 'success'
  };
}

export function quickValidateMonthlyPayment(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Monthly payment cannot be negative',
      severity: 'error'
    };
  }

  if (value > 50000) {
    return {
      isValid: false,
      message: 'Monthly payment cannot exceed $50,000',
      severity: 'error'
    };
  }

  if (value > 10000) {
    return {
      isValid: true,
      message: 'Very high monthly payment - verify affordability',
      severity: 'warning'
    };
  }

  if (value < 500) {
    return {
      isValid: true,
      message: 'Very low monthly payment - may be interest-only or balloon loan',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid monthly payment',
    severity: 'success'
  };
}

export function quickValidatePropertyTaxes(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Property taxes cannot be negative',
      severity: 'error'
    };
  }

  if (value > 100000) {
    return {
      isValid: false,
      message: 'Property taxes cannot exceed $100,000',
      severity: 'error'
    };
  }

  if (value > 20000) {
    return {
      isValid: true,
      message: 'High property taxes - consider tax implications',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid property taxes',
    severity: 'success'
  };
}

export function quickValidateHomeInsurance(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Home insurance cannot be negative',
      severity: 'error'
    };
  }

  if (value > 10000) {
    return {
      isValid: false,
      message: 'Home insurance cannot exceed $10,000',
      severity: 'error'
    };
  }

  if (value > 3000) {
    return {
      isValid: true,
      message: 'High insurance premium - shop around for better rates',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid home insurance premium',
    severity: 'success'
  };
}

export function quickValidateHoaFees(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'HOA fees cannot be negative',
      severity: 'error'
    };
  }

  if (value > 2000) {
    return {
      isValid: false,
      message: 'HOA fees cannot exceed $2,000 per month',
      severity: 'error'
    };
  }

  if (value > 500) {
    return {
      isValid: true,
      message: 'High HOA fees - consider impact on affordability',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid HOA fees',
    severity: 'success'
  };
}

export function quickValidateRentalIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Rental income cannot be negative',
      severity: 'error'
    };
  }

  if (value > 100000) {
    return {
      isValid: false,
      message: 'Rental income cannot exceed $100,000 annually',
      severity: 'error'
    };
  }

  if (value > 50000) {
    return {
      isValid: true,
      message: 'High rental income - verify market rates',
      severity: 'warning'
    };
  }

  return {
    isValid: true,
    message: 'Valid rental income',
    severity: 'success'
  };
}

export function quickValidateAllInputs(inputs: Partial<MortgageEquityInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  if (inputs.currentPropertyValue !== undefined) {
    results.push(quickValidateCurrentPropertyValue(inputs.currentPropertyValue));
  }

  if (inputs.originalPurchasePrice !== undefined) {
    results.push(quickValidateOriginalPurchasePrice(inputs.originalPurchasePrice));
  }

  if (inputs.originalDownPayment !== undefined) {
    results.push(quickValidateOriginalDownPayment(inputs.originalDownPayment, inputs.originalPurchasePrice));
  }

  if (inputs.currentMortgageBalance !== undefined) {
    results.push(quickValidateCurrentMortgageBalance(inputs.currentMortgageBalance, inputs.currentPropertyValue));
  }

  if (inputs.propertyImprovements !== undefined) {
    results.push(quickValidatePropertyImprovements(inputs.propertyImprovements));
  }

  if (inputs.marketAppreciation !== undefined) {
    results.push(quickValidateMarketAppreciation(inputs.marketAppreciation));
  }

  if (inputs.interestRate !== undefined) {
    results.push(quickValidateInterestRate(inputs.interestRate));
  }

  if (inputs.remainingLoanTerm !== undefined) {
    results.push(quickValidateRemainingLoanTerm(inputs.remainingLoanTerm));
  }

  if (inputs.creditScore !== undefined) {
    results.push(quickValidateCreditScore(inputs.creditScore));
  }

  if (inputs.debtToIncomeRatio !== undefined) {
    results.push(quickValidateDebtToIncomeRatio(inputs.debtToIncomeRatio));
  }

  if (inputs.monthlyPayment !== undefined) {
    results.push(quickValidateMonthlyPayment(inputs.monthlyPayment));
  }

  if (inputs.propertyTaxes !== undefined) {
    results.push(quickValidatePropertyTaxes(inputs.propertyTaxes));
  }

  if (inputs.homeInsurance !== undefined) {
    results.push(quickValidateHomeInsurance(inputs.homeInsurance));
  }

  if (inputs.hoaFees !== undefined) {
    results.push(quickValidateHoaFees(inputs.hoaFees));
  }

  if (inputs.rentalIncome !== undefined) {
    results.push(quickValidateRentalIncome(inputs.rentalIncome));
  }

  return results;
}