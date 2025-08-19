import { QuickValidationResult } from '../../../types/calculator';
import { MortgageClosingCostInputs } from './formulas';

export function quickValidateLoanAmount(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Loan amount must be positive',
      severity: 'error'
    };
  }
  
  if (value < 10000) {
    return {
      isValid: false,
      message: 'Loan amount must be at least $10,000',
      severity: 'error'
    };
  }
  
  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Loan amount cannot exceed $10,000,000',
      severity: 'error'
    };
  }
  
  if (value > 5000000) {
    return {
      isValid: true,
      message: 'Large loan amount - consider jumbo loan requirements',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid loan amount',
    severity: 'success'
  };
}

export function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Property value must be positive',
      severity: 'error'
    };
  }
  
  if (value < 10000) {
    return {
      isValid: false,
      message: 'Property value must be at least $10,000',
      severity: 'error'
    };
  }
  
  if (value > 10000000) {
    return {
      isValid: false,
      message: 'Property value cannot exceed $10,000,000',
      severity: 'error'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid property value',
    severity: 'success'
  };
}

export function quickValidateDownPayment(value: number, loanAmount?: number, propertyValue?: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Down payment cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 5000000) {
    return {
      isValid: false,
      message: 'Down payment cannot exceed $5,000,000',
      severity: 'error'
    };
  }
  
  if (loanAmount && value >= loanAmount) {
    return {
      isValid: false,
      message: 'Down payment cannot be greater than or equal to loan amount',
      severity: 'error'
    };
  }
  
  if (propertyValue && loanAmount) {
    const ltvRatio = ((loanAmount - value) / propertyValue) * 100;
    if (ltvRatio > 100) {
      return {
        isValid: false,
        message: 'Loan amount minus down payment cannot exceed property value',
        severity: 'error'
      };
    }
    
    if (ltvRatio > 80) {
      return {
        isValid: true,
        message: 'High LTV ratio - PMI may be required',
        severity: 'warning'
      };
    }
  }
  
  return {
    isValid: true,
    message: 'Valid down payment',
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

export function quickValidatePoints(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Points cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 10) {
    return {
      isValid: false,
      message: 'Points cannot exceed 10',
      severity: 'error'
    };
  }
  
  if (value > 3) {
    return {
      isValid: true,
      message: 'High points cost - consider if worth the rate reduction',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid points',
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

export function quickValidateOriginationFee(value: number, loanAmount?: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Origination fee cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 10000) {
    return {
      isValid: false,
      message: 'Origination fee cannot exceed $10,000',
      severity: 'error'
    };
  }
  
  if (loanAmount && value > loanAmount * 0.01) {
    return {
      isValid: true,
      message: 'High origination fee - consider negotiating or shopping around',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid origination fee',
    severity: 'success'
  };
}

export function quickValidateTitleInsurance(value: number, loanAmount?: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Title insurance cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 5000) {
    return {
      isValid: false,
      message: 'Title insurance cannot exceed $5,000',
      severity: 'error'
    };
  }
  
  if (loanAmount && value > loanAmount * 0.005) {
    return {
      isValid: true,
      message: 'High title insurance cost - shop around for better rates',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid title insurance cost',
    severity: 'success'
  };
}

export function quickValidateAppraisalFee(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Appraisal fee cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 1000) {
    return {
      isValid: true,
      message: 'High appraisal fee - may be negotiable',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid appraisal fee',
    severity: 'success'
  };
}

export function quickValidatePropertyTax(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Property tax cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 100000) {
    return {
      isValid: false,
      message: 'Property tax cannot exceed $100,000',
      severity: 'error'
    };
  }
  
  if (value > 20000) {
    return {
      isValid: true,
      message: 'High property tax - consider tax implications',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid property tax',
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

export function quickValidatePMIRate(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'PMI rate cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 5) {
    return {
      isValid: false,
      message: 'PMI rate cannot exceed 5%',
      severity: 'error'
    };
  }
  
  if (value > 1) {
    return {
      isValid: true,
      message: 'High PMI rate - consider larger down payment',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid PMI rate',
    severity: 'success'
  };
}

export function quickValidateEscrowMonths(value: number): QuickValidationResult {
  if (value < 0) {
    return {
      isValid: false,
      message: 'Escrow months cannot be negative',
      severity: 'error'
    };
  }
  
  if (value > 12) {
    return {
      isValid: false,
      message: 'Escrow months cannot exceed 12',
      severity: 'error'
    };
  }
  
  if (value > 6) {
    return {
      isValid: true,
      message: 'High escrow requirement - increases closing costs',
      severity: 'warning'
    };
  }
  
  return {
    isValid: true,
    message: 'Valid escrow months',
    severity: 'success'
  };
}

export function quickValidateAllInputs(inputs: Partial<MortgageClosingCostInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  if (inputs.loanAmount !== undefined) {
    results.push(quickValidateLoanAmount(inputs.loanAmount));
  }
  
  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  }
  
  if (inputs.downPayment !== undefined) {
    results.push(quickValidateDownPayment(inputs.downPayment, inputs.loanAmount, inputs.propertyValue));
  }
  
  if (inputs.interestRate !== undefined) {
    results.push(quickValidateInterestRate(inputs.interestRate));
  }
  
  if (inputs.points !== undefined) {
    results.push(quickValidatePoints(inputs.points));
  }
  
  if (inputs.creditScore !== undefined) {
    results.push(quickValidateCreditScore(inputs.creditScore));
  }
  
  if (inputs.originationFee !== undefined) {
    results.push(quickValidateOriginationFee(inputs.originationFee, inputs.loanAmount));
  }
  
  if (inputs.titleInsurance !== undefined) {
    results.push(quickValidateTitleInsurance(inputs.titleInsurance, inputs.loanAmount));
  }
  
  if (inputs.appraisalFee !== undefined) {
    results.push(quickValidateAppraisalFee(inputs.appraisalFee));
  }
  
  if (inputs.propertyTax !== undefined) {
    results.push(quickValidatePropertyTax(inputs.propertyTax));
  }
  
  if (inputs.homeInsurance !== undefined) {
    results.push(quickValidateHomeInsurance(inputs.homeInsurance));
  }
  
  if (inputs.pmiRate !== undefined) {
    results.push(quickValidatePMIRate(inputs.pmiRate));
  }
  
  if (inputs.escrowMonths !== undefined) {
    results.push(quickValidateEscrowMonths(inputs.escrowMonths));
  }
  
  return results;
}