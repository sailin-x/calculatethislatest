import { MortgagePointsInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateMortgagePointsInputs(inputs: MortgagePointsInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Loan Amount validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  } else if (inputs.loanAmount > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000';
  }

  // Base Interest Rate validation
  if (!inputs.baseInterestRate || inputs.baseInterestRate <= 0) {
    errors.baseInterestRate = 'Base interest rate must be greater than 0';
  } else if (inputs.baseInterestRate > 25) {
    errors.baseInterestRate = 'Base interest rate cannot exceed 25%';
  }

  // Loan Term validation
  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  } else if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }

  // Loan Type validation
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.loanType = 'Invalid loan type';
  }

  // Payment Type validation
  const validPaymentTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validPaymentTypes.includes(inputs.paymentType)) {
    errors.paymentType = 'Invalid payment type';
  }

  // Points validation
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

  // Point Cost validation
  if (inputs.pointCost < 0) {
    errors.pointCost = 'Point cost cannot be negative';
  } else if (inputs.pointCost > 10000) {
    errors.pointCost = 'Point cost cannot exceed $10,000';
  }

  // Point Value validation
  if (inputs.pointValue < 0) {
    errors.pointValue = 'Point value cannot be negative';
  } else if (inputs.pointValue > 1) {
    errors.pointValue = 'Point value cannot exceed 1%';
  }

  // Rate Options validation
  if (!inputs.rateOptions || inputs.rateOptions.length === 0) {
    errors.rateOptions = 'At least one rate option must be provided';
  } else {
    inputs.rateOptions.forEach((option, index) => {
      if (option.points < 0) {
        errors[`rateOptions[${index}].points`] = 'Points cannot be negative';
      }
      if (option.rate <= 0) {
        errors[`rateOptions[${index}].rate`] = 'Rate must be greater than 0';
      }
      if (option.payment <= 0) {
        errors[`rateOptions[${index}].payment`] = 'Payment must be greater than 0';
      }
    });
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

  // Insurance and Taxes validation
  if (inputs.propertyInsurance < 0) {
    errors.propertyInsurance = 'Property insurance cannot be negative';
  } else if (inputs.propertyInsurance > 50000) {
    errors.propertyInsurance = 'Property insurance cannot exceed $50,000 annually';
  }

  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  } else if (inputs.propertyTaxes > 100000) {
    errors.propertyTaxes = 'Property taxes cannot exceed $100,000 annually';
  }

  if (inputs.hoaFees < 0) {
    errors.hoaFees = 'HOA fees cannot be negative';
  } else if (inputs.hoaFees > 5000) {
    errors.hoaFees = 'HOA fees cannot exceed $5,000 monthly';
  }

  if (inputs.floodInsurance < 0) {
    errors.floodInsurance = 'Flood insurance cannot be negative';
  } else if (inputs.floodInsurance > 20000) {
    errors.floodInsurance = 'Flood insurance cannot exceed $20,000 annually';
  }

  if (inputs.mortgageInsurance < 0) {
    errors.mortgageInsurance = 'Mortgage insurance cannot be negative';
  } else if (inputs.mortgageInsurance > 10000) {
    errors.mortgageInsurance = 'Mortgage insurance cannot exceed $10,000 annually';
  }

  if (inputs.mortgageInsuranceRate < 0) {
    errors.mortgageInsuranceRate = 'Mortgage insurance rate cannot be negative';
  } else if (inputs.mortgageInsuranceRate > 5) {
    errors.mortgageInsuranceRate = 'Mortgage insurance rate cannot exceed 5%';
  }

  // Borrower Information validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income must be greater than 0';
  } else if (inputs.borrowerIncome > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10,000,000';
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.borrowerCreditScore = 'Credit score must be at least 300';
  } else if (inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Credit score cannot exceed 850';
  }

  if (inputs.borrowerDebtToIncomeRatio < 0) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot be negative';
  } else if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot exceed 100%';
  }

  const validEmploymentTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validEmploymentTypes.includes(inputs.borrowerEmploymentType)) {
    errors.borrowerEmploymentType = 'Invalid employment type';
  }

  if (inputs.borrowerTaxRate < 0) {
    errors.borrowerTaxRate = 'Tax rate cannot be negative';
  } else if (inputs.borrowerTaxRate > 50) {
    errors.borrowerTaxRate = 'Tax rate cannot exceed 50%';
  }

  // Market Information validation
  if (typeof inputs.marketLocation !== 'string') {
    errors.marketLocation = 'Market location must be a string';
  }

  const validMarketConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validMarketConditions.includes(inputs.marketCondition)) {
    errors.marketCondition = 'Invalid market condition';
  }

  if (inputs.marketGrowthRate < -20) {
    errors.marketGrowthRate = 'Market growth rate cannot be less than -20%';
  } else if (inputs.marketGrowthRate > 50) {
    errors.marketGrowthRate = 'Market growth rate cannot exceed 50%';
  }

  // Analysis Parameters validation
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

  if (inputs.taxDeductionPeriod <= 0) {
    errors.taxDeductionPeriod = 'Tax deduction period must be greater than 0';
  } else if (inputs.taxDeductionPeriod > 50) {
    errors.taxDeductionPeriod = 'Tax deduction period cannot exceed 50 years';
  }

  // Reporting Preferences validation
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  const validDisplayFormats = ['percentage', 'decimal', 'currency'];
  if (!validDisplayFormats.includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be a boolean';
  }

  // Property-specific validations
  if (typeof inputs.propertyAddress !== 'string') {
    errors.propertyAddress = 'Property address must be a string';
  }

  const validPropertyTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.propertyType = 'Invalid property type';
  }

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

  const validDownPaymentSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!validDownPaymentSources.includes(inputs.downPaymentSource)) {
    errors.downPaymentSource = 'Invalid down payment source';
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

  // Points should not reduce rate below reasonable minimum
  const effectiveRate = inputs.baseInterestRate - (inputs.discountPoints * inputs.pointValue);
  if (effectiveRate < 0) {
    errors.discountPoints = 'Points cannot reduce rate below 0%';
  }

  // Point cost should be reasonable relative to loan amount
  const totalPointCost = (inputs.discountPoints + inputs.originationPoints) * inputs.pointCost;
  if (totalPointCost > inputs.loanAmount * 0.05) {
    errors.pointCost = 'Total point cost should not exceed 5% of loan amount';
  }

  // Rate options should be in descending order of points
  if (inputs.rateOptions.length > 1) {
    for (let i = 1; i < inputs.rateOptions.length; i++) {
      if (inputs.rateOptions[i].points <= inputs.rateOptions[i - 1].points) {
        errors.rateOptions = 'Rate options should be in descending order of points';
        break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateMortgagePointsOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core metrics
  if (!outputs.totalPoints || outputs.totalPoints < 0) {
    errors.totalPoints = 'Total points must be non-negative';
  }

  if (!outputs.totalPointCost || outputs.totalPointCost < 0) {
    errors.totalPointCost = 'Total point cost must be non-negative';
  }

  if (!outputs.effectiveRate || outputs.effectiveRate < 0) {
    errors.effectiveRate = 'Effective rate must be non-negative';
  }

  if (!outputs.monthlyPaymentSavings) {
    errors.monthlyPaymentSavings = 'Monthly payment savings is required';
  }

  if (!outputs.interestSavings || outputs.interestSavings < 0) {
    errors.interestSavings = 'Interest savings must be non-negative';
  }

  if (!outputs.breakEvenMonths || outputs.breakEvenMonths < 0) {
    errors.breakEvenMonths = 'Break-even months must be non-negative';
  }

  if (!outputs.returnOnInvestment) {
    errors.returnOnInvestment = 'Return on investment is required';
  }

  if (!outputs.netPresentValue) {
    errors.netPresentValue = 'Net present value is required';
  }

  // Validate analysis object
  if (!outputs.analysis) {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.pointsRating) {
      errors.pointsRating = 'Points rating is required';
    }
    if (!outputs.analysis.valueRating) {
      errors.valueRating = 'Value rating is required';
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