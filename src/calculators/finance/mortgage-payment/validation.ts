import { MortgagePaymentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateMortgagePaymentInputs(inputs: MortgagePaymentInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Loan Amount validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  } else if (inputs.loanAmount > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000';
  }

  // Interest Rate validation
  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.interestRate = 'Interest rate must be greater than 0';
  } else if (inputs.interestRate > 25) {
    errors.interestRate = 'Interest rate cannot exceed 25%';
  }

  // Loan Term validation
  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  } else if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }

  // Property Value validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  } else if (inputs.propertyValue > 50000000) {
    errors.propertyValue = 'Property value cannot exceed $50,000,000';
  }

  // Down Payment validation
  if (inputs.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  } else if (inputs.downPayment > inputs.propertyValue) {
    errors.downPayment = 'Down payment cannot exceed property value';
  }

  // Down Payment Percentage validation
  if (inputs.downPaymentPercentage < 0) {
    errors.downPaymentPercentage = 'Down payment percentage cannot be negative';
  } else if (inputs.downPaymentPercentage > 100) {
    errors.downPaymentPercentage = 'Down payment percentage cannot exceed 100%';
  }

  // Property Insurance validation
  if (inputs.propertyInsurance < 0) {
    errors.propertyInsurance = 'Property insurance cannot be negative';
  } else if (inputs.propertyInsurance > 50000) {
    errors.propertyInsurance = 'Property insurance cannot exceed $50,000 annually';
  }

  // Property Taxes validation
  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  } else if (inputs.propertyTaxes > 100000) {
    errors.propertyTaxes = 'Property taxes cannot exceed $100,000 annually';
  }

  // HOA Fees validation
  if (inputs.hoaFees < 0) {
    errors.hoaFees = 'HOA fees cannot be negative';
  } else if (inputs.hoaFees > 5000) {
    errors.hoaFees = 'HOA fees cannot exceed $5,000 monthly';
  }

  // Flood Insurance validation
  if (inputs.floodInsurance < 0) {
    errors.floodInsurance = 'Flood insurance cannot be negative';
  } else if (inputs.floodInsurance > 20000) {
    errors.floodInsurance = 'Flood insurance cannot exceed $20,000 annually';
  }

  // Mortgage Insurance validation
  if (inputs.mortgageInsurance < 0) {
    errors.mortgageInsurance = 'Mortgage insurance cannot be negative';
  } else if (inputs.mortgageInsurance > 10000) {
    errors.mortgageInsurance = 'Mortgage insurance cannot exceed $10,000 annually';
  }

  // Mortgage Insurance Rate validation
  if (inputs.mortgageInsuranceRate < 0) {
    errors.mortgageInsuranceRate = 'Mortgage insurance rate cannot be negative';
  } else if (inputs.mortgageInsuranceRate > 5) {
    errors.mortgageInsuranceRate = 'Mortgage insurance rate cannot exceed 5%';
  }

  // Borrower Income validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income must be greater than 0';
  } else if (inputs.borrowerIncome > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10,000,000';
  }

  // Credit Score validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.borrowerCreditScore = 'Credit score must be at least 300';
  } else if (inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Credit score cannot exceed 850';
  }

  // Debt-to-Income Ratio validation
  if (inputs.borrowerDebtToIncomeRatio < 0) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot be negative';
  } else if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot exceed 100%';
  }

  // ARM-specific validations
  if (inputs.paymentType === 'arm') {
    // Initial Fixed Period validation
    if (!inputs.initialFixedPeriod || inputs.initialFixedPeriod <= 0) {
      errors.initialFixedPeriod = 'Initial fixed period must be greater than 0';
    } else if (inputs.initialFixedPeriod > 30) {
      errors.initialFixedPeriod = 'Initial fixed period cannot exceed 30 years';
    }

    // Adjustment Period validation
    if (!inputs.adjustmentPeriod || inputs.adjustmentPeriod <= 0) {
      errors.adjustmentPeriod = 'Adjustment period must be greater than 0';
    } else if (inputs.adjustmentPeriod > 12) {
      errors.adjustmentPeriod = 'Adjustment period cannot exceed 12 months';
    }

    // Margin validation
    if (inputs.margin < 0) {
      errors.margin = 'Margin cannot be negative';
    } else if (inputs.margin > 10) {
      errors.margin = 'Margin cannot exceed 10%';
    }

    // Index Rate validation
    if (inputs.indexRate < 0) {
      errors.indexRate = 'Index rate cannot be negative';
    } else if (inputs.indexRate > 25) {
      errors.indexRate = 'Index rate cannot exceed 25%';
    }

    // Lifetime Cap validation
    if (inputs.lifetimeCap < 0) {
      errors.lifetimeCap = 'Lifetime cap cannot be negative';
    } else if (inputs.lifetimeCap > 15) {
      errors.lifetimeCap = 'Lifetime cap cannot exceed 15%';
    }

    // Periodic Cap validation
    if (inputs.periodicCap < 0) {
      errors.periodicCap = 'Periodic cap cannot be negative';
    } else if (inputs.periodicCap > 10) {
      errors.periodicCap = 'Periodic cap cannot exceed 10%';
    }

    // Floor Rate validation
    if (inputs.floorRate < 0) {
      errors.floorRate = 'Floor rate cannot be negative';
    } else if (inputs.floorRate > 15) {
      errors.floorRate = 'Floor rate cannot exceed 15%';
    }
  }

  // Property-specific validations
  if (inputs.propertySize < 0) {
    errors.propertySize = 'Property size cannot be negative';
  } else if (inputs.propertySize > 100000) {
    errors.propertySize = 'Property size cannot exceed 100,000 sq ft';
  }

  if (inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age cannot be negative';
  } else if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  // Payment-specific validations
  if (inputs.paymentDay < 1) {
    errors.paymentDay = 'Payment day must be at least 1';
  } else if (inputs.paymentDay > 31) {
    errors.paymentDay = 'Payment day cannot exceed 31';
  }

  // Points and Credits validations
  if (inputs.discountPoints < 0) {
    errors.discountPoints = 'Discount points cannot be negative';
  } else if (inputs.discountPoints > 10) {
    errors.discountPoints = 'Discount points cannot exceed 10';
  }

  if (inputs.originationPoints < 0) {
    errors.originationPoints = 'Origination points cannot be negative';
  } else if (inputs.originationPoints > 10) {
    errors.originationPoints = 'Origination points cannot exceed 10';
  }

  if (inputs.lenderCredits < 0) {
    errors.lenderCredits = 'Lender credits cannot be negative';
  } else if (inputs.lenderCredits > inputs.loanAmount * 0.1) {
    errors.lenderCredits = 'Lender credits cannot exceed 10% of loan amount';
  }

  if (inputs.sellerCredits < 0) {
    errors.sellerCredits = 'Seller credits cannot be negative';
  } else if (inputs.sellerCredits > inputs.propertyValue * 0.1) {
    errors.sellerCredits = 'Seller credits cannot exceed 10% of property value';
  }

  // Market-specific validations
  if (inputs.marketGrowthRate < -20) {
    errors.marketGrowthRate = 'Market growth rate cannot be less than -20%';
  } else if (inputs.marketGrowthRate > 50) {
    errors.marketGrowthRate = 'Market growth rate cannot exceed 50%';
  }

  // Analysis Parameters validations
  if (inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  } else if (inputs.analysisPeriod > 50) {
    errors.analysisPeriod = 'Analysis period cannot exceed 50 years';
  }

  if (inputs.inflationRate < -10) {
    errors.inflationRate = 'Inflation rate cannot be less than -10%';
  } else if (inputs.inflationRate > 50) {
    errors.inflationRate = 'Inflation rate cannot exceed 50%';
  }

  if (inputs.propertyAppreciationRate < -20) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot be less than -20%';
  } else if (inputs.propertyAppreciationRate > 50) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot exceed 50%';
  }

  if (inputs.discountRate < 0) {
    errors.discountRate = 'Discount rate cannot be negative';
  } else if (inputs.discountRate > 50) {
    errors.discountRate = 'Discount rate cannot exceed 50%';
  }

  // Business Logic Validations
  // Loan amount should not exceed property value
  if (inputs.loanAmount > inputs.propertyValue) {
    errors.loanAmount = 'Loan amount cannot exceed property value';
  }

  // Down payment should be consistent with down payment percentage
  const calculatedDownPayment = inputs.propertyValue * (inputs.downPaymentPercentage / 100);
  if (Math.abs(inputs.downPayment - calculatedDownPayment) > 1000) {
    errors.downPayment = 'Down payment should be consistent with down payment percentage';
  }

  // Loan-to-Value ratio should be reasonable
  const ltvRatio = ((inputs.loanAmount) / inputs.propertyValue) * 100;
  if (ltvRatio > 100) {
    errors.loanAmount = 'Loan-to-Value ratio cannot exceed 100%';
  }

  // Debt-to-Income ratio should be reasonable for mortgage qualification
  const monthlyPayment = calculateEstimatedMonthlyPayment(inputs);
  const monthlyIncome = inputs.borrowerIncome / 12;
  const calculatedDTI = (monthlyPayment / monthlyIncome) * 100;
  
  if (calculatedDTI > 50) {
    errors.borrowerIncome = 'Income may be insufficient for this loan amount';
  }

  // ARM-specific business logic
  if (inputs.paymentType === 'arm') {
    // Floor rate should be less than initial rate
    if (inputs.floorRate >= inputs.interestRate) {
      errors.floorRate = 'Floor rate should be less than initial interest rate';
    }

    // Lifetime cap should be reasonable
    if (inputs.lifetimeCap < inputs.interestRate) {
      errors.lifetimeCap = 'Lifetime cap should be higher than initial interest rate';
    }

    // Periodic cap should be less than lifetime cap
    if (inputs.periodicCap >= inputs.lifetimeCap) {
      errors.periodicCap = 'Periodic cap should be less than lifetime cap';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

function calculateEstimatedMonthlyPayment(inputs: MortgagePaymentInputs): number {
  const principal = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

export function validateMortgagePaymentOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core metrics
  if (!outputs.monthlyPayment || outputs.monthlyPayment <= 0) {
    errors.monthlyPayment = 'Monthly payment must be greater than 0';
  }

  if (!outputs.totalInterestPaid || outputs.totalInterestPaid < 0) {
    errors.totalInterestPaid = 'Total interest paid cannot be negative';
  }

  if (!outputs.effectiveInterestRate || outputs.effectiveInterestRate < 0) {
    errors.effectiveInterestRate = 'Effective interest rate cannot be negative';
  }

  if (!outputs.breakEvenMonths || outputs.breakEvenMonths < 0) {
    errors.breakEvenMonths = 'Break-even months cannot be negative';
  }

  if (!outputs.riskScore || outputs.riskScore < 0 || outputs.riskScore > 100) {
    errors.riskScore = 'Risk score must be between 0 and 100';
  }

  // Validate analysis object
  if (!outputs.analysis) {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.paymentRating) {
      errors.paymentRating = 'Payment rating is required';
    }
    if (!outputs.analysis.recommendation) {
      errors.recommendation = 'Recommendation is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}