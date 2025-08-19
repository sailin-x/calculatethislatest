import { LoanToValueRatioInputs } from './formulas';

export interface QuickValidationResult {
  isValid: boolean;
  message?: string;
  severity: 'error' | 'warning' | 'info';
}

export function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Property value must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 10000) {
    return {
      isValid: false,
      message: 'Property value should be at least $10,000',
      severity: 'warning'
    };
  }
  
  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Property value should not exceed $10,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateLoanAmount(value: number, propertyValue?: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Loan amount must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1000) {
    return {
      isValid: false,
      message: 'Loan amount should be at least $1,000',
      severity: 'warning'
    };
  }
  
  if (propertyValue && value > propertyValue) {
    return {
      isValid: false,
      message: 'Loan amount cannot exceed property value',
      severity: 'error'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateLTVRatio(loanAmount: number, propertyValue: number, loanType?: string): QuickValidationResult {
  if (!loanAmount || !propertyValue) {
    return { isValid: true, severity: 'info' };
  }
  
  const ltvRatio = (loanAmount / propertyValue) * 100;
  
  if (ltvRatio > 100) {
    const loanTypeText = loanType || 'Conventional';
    if (loanTypeText !== 'VA' && loanTypeText !== 'USDA') {
      return {
        isValid: false,
        message: `LTV ratio cannot exceed 100% for ${loanTypeText} loans`,
        severity: 'error'
      };
    }
  }
  
  if (ltvRatio > 95) {
    return {
      isValid: false,
      message: 'Very high LTV ratio - may limit loan options and increase costs',
      severity: 'warning'
    };
  }
  
  if (ltvRatio > 80) {
    return {
      isValid: true,
      message: 'LTV ratio above 80% - PMI may be required',
      severity: 'warning'
    };
  }
  
  if (ltvRatio <= 70) {
    return {
      isValid: true,
      message: 'Excellent LTV ratio - favorable loan terms likely',
      severity: 'info'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateCreditScore(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 300 || value > 850) {
    return {
      isValid: false,
      message: 'Credit score must be between 300 and 850',
      severity: 'error'
    };
  }
  
  if (value < 620) {
    return {
      isValid: false,
      message: 'Very low credit score - may severely limit loan options',
      severity: 'error'
    };
  }
  
  if (value < 680) {
    return {
      isValid: true,
      message: 'Fair credit score - may result in higher rates',
      severity: 'warning'
    };
  }
  
  if (value < 720) {
    return {
      isValid: true,
      message: 'Good credit score - standard rates likely',
      severity: 'info'
    };
  }
  
  return {
    isValid: true,
    message: 'Excellent credit score - best rates available',
    severity: 'info'
  };
}

export function quickValidateDebtToIncomeRatio(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 100) {
    return {
      isValid: false,
      message: 'Debt-to-income ratio must be between 0% and 100%',
      severity: 'error'
    };
  }
  
  if (value > 50) {
    return {
      isValid: false,
      message: 'Very high debt-to-income ratio - loan approval unlikely',
      severity: 'error'
    };
  }
  
  if (value > 43) {
    return {
      isValid: true,
      message: 'High debt-to-income ratio - may limit loan options',
      severity: 'warning'
    };
  }
  
  if (value > 36) {
    return {
      isValid: true,
      message: 'Moderate debt-to-income ratio - standard approval likely',
      severity: 'info'
    };
  }
  
  return {
    isValid: true,
    message: 'Low debt-to-income ratio - excellent approval prospects',
    severity: 'info'
  };
}

export function quickValidateDownPayment(value: number, propertyValue?: number, loanAmount?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Down payment cannot be negative',
      severity: 'error'
    };
  }
  
  if (propertyValue && loanAmount) {
    const calculatedDownPayment = propertyValue - loanAmount;
    const difference = Math.abs(value - calculatedDownPayment);
    
    if (difference > 1000) {
      return {
        isValid: false,
        message: 'Down payment should equal property value minus loan amount',
        severity: 'warning'
      };
    }
  }
  
  if (propertyValue) {
    const downPaymentPercentage = (value / propertyValue) * 100;
    
    if (downPaymentPercentage < 3.5) {
      return {
        isValid: true,
        message: 'Very low down payment - FHA loan may be required',
        severity: 'warning'
      };
    }
    
    if (downPaymentPercentage < 20) {
      return {
        isValid: true,
        message: 'Down payment below 20% - PMI may be required',
        severity: 'warning'
      };
    }
    
    if (downPaymentPercentage >= 20) {
      return {
        isValid: true,
        message: 'Down payment of 20% or more - no PMI required',
        severity: 'info'
      };
    }
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateReserves(value: number, occupancyType?: string): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Reserves cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 60) {
    return {
      isValid: true,
      message: 'Very high reserves - excellent for loan approval',
      severity: 'info'
    };
  }
  
  if (occupancyType === 'Investment Property' && value < 6) {
    return {
      isValid: true,
      message: 'Investment properties typically require 6+ months of reserves',
      severity: 'warning'
    };
  }
  
  if (occupancyType === 'Secondary Home' && value < 3) {
    return {
      isValid: true,
      message: 'Secondary homes typically require 3+ months of reserves',
      severity: 'warning'
    };
  }
  
  if (value < 3) {
    return {
      isValid: true,
      message: 'Low reserves - may affect loan approval',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateInterestRate(value: number, loanType?: string): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 25) {
    return {
      isValid: false,
      message: 'Interest rate must be between 0% and 25%',
      severity: 'error'
    };
  }
  
  if (loanType === 'Hard Money' && value < 8) {
    return {
      isValid: true,
      message: 'Hard money loans typically have rates of 8% or higher',
      severity: 'warning'
    };
  }
  
  if (loanType === 'VA' && value > 12) {
    return {
      isValid: true,
      message: 'VA loans typically have rates below 12%',
      severity: 'warning'
    };
  }
  
  if (value > 15) {
    return {
      isValid: true,
      message: 'Very high interest rate - consider refinancing options',
      severity: 'warning'
    };
  }
  
  if (value > 10) {
    return {
      isValid: true,
      message: 'High interest rate - above current market averages',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateLoanTerm(value: number, loanType?: string): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 1 || value > 50) {
    return {
      isValid: false,
      message: 'Loan term must be between 1 and 50 years',
      severity: 'error'
    };
  }
  
  if (loanType === 'ARM' && value > 30) {
    return {
      isValid: true,
      message: 'ARM loans typically have terms of 30 years or less',
      severity: 'warning'
    };
  }
  
  if (loanType === 'Interest-Only' && value > 10) {
    return {
      isValid: true,
      message: 'Interest-only loans typically have terms of 10 years or less',
      severity: 'warning'
    };
  }
  
  if (value > 30) {
    return {
      isValid: true,
      message: 'Long loan term - higher total interest costs',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidatePropertyAge(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 200) {
    return {
      isValid: false,
      message: 'Property age must be between 0 and 200 years',
      severity: 'error'
    };
  }
  
  if (value > 50) {
    return {
      isValid: true,
      message: 'Older property - may affect appraisal and loan terms',
      severity: 'warning'
    };
  }
  
  if (value > 30) {
    return {
      isValid: true,
      message: 'Mature property - standard lending terms likely',
      severity: 'info'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidatePoints(value: number, loanAmount?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 10) {
    return {
      isValid: false,
      message: 'Points must be between 0 and 10',
      severity: 'error'
    };
  }
  
  if (value > 3 && loanAmount && loanAmount < 200000) {
    return {
      isValid: true,
      message: 'High points may not be cost-effective for smaller loans',
      severity: 'warning'
    };
  }
  
  if (value > 2) {
    return {
      isValid: true,
      message: 'High points - consider if cost savings justify upfront expense',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateClosingCosts(value: number, loanAmount?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 50000) {
    return {
      isValid: false,
      message: 'Closing costs must be between $0 and $50,000',
      severity: 'error'
    };
  }
  
  if (loanAmount) {
    const closingCostPercentage = (value / loanAmount) * 100;
    
    if (closingCostPercentage > 5) {
      return {
        isValid: true,
        message: 'High closing costs relative to loan amount',
        severity: 'warning'
      };
    }
    
    if (closingCostPercentage > 3) {
      return {
        isValid: true,
        message: 'Moderate closing costs - within typical range',
        severity: 'info'
      };
    }
  }
  
  return { isValid: true, severity: 'info' };
}

// Comprehensive validation for all inputs
export function quickValidateAllInputs(inputs: Partial<LoanToValueRatioInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  }
  
  if (inputs.loanAmount !== undefined) {
    results.push(quickValidateLoanAmount(inputs.loanAmount, inputs.propertyValue));
  }
  
  if (inputs.propertyValue !== undefined && inputs.loanAmount !== undefined) {
    results.push(quickValidateLTVRatio(inputs.loanAmount, inputs.propertyValue, inputs.loanType));
  }
  
  if (inputs.creditScore !== undefined) {
    results.push(quickValidateCreditScore(inputs.creditScore));
  }
  
  if (inputs.debtToIncomeRatio !== undefined) {
    results.push(quickValidateDebtToIncomeRatio(inputs.debtToIncomeRatio));
  }
  
  if (inputs.downPayment !== undefined) {
    results.push(quickValidateDownPayment(inputs.downPayment, inputs.propertyValue, inputs.loanAmount));
  }
  
  if (inputs.reserves !== undefined) {
    results.push(quickValidateReserves(inputs.reserves, inputs.occupancyType));
  }
  
  if (inputs.interestRate !== undefined) {
    results.push(quickValidateInterestRate(inputs.interestRate, inputs.loanType));
  }
  
  if (inputs.loanTerm !== undefined) {
    results.push(quickValidateLoanTerm(inputs.loanTerm, inputs.loanType));
  }
  
  if (inputs.propertyAge !== undefined) {
    results.push(quickValidatePropertyAge(inputs.propertyAge));
  }
  
  if (inputs.points !== undefined) {
    results.push(quickValidatePoints(inputs.points, inputs.loanAmount));
  }
  
  if (inputs.closingCosts !== undefined) {
    results.push(quickValidateClosingCosts(inputs.closingCosts, inputs.loanAmount));
  }
  
  return results;
}