import { MortgageQualificationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateMortgageQualificationInputs(inputs: MortgageQualificationInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Borrower Information validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income must be greater than 0';
  } else if (inputs.borrowerIncome > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10,000,000';
  }

  if (inputs.coBorrowerIncome < 0) {
    errors.coBorrowerIncome = 'Co-borrower income cannot be negative';
  } else if (inputs.coBorrowerIncome > 10000000) {
    errors.coBorrowerIncome = 'Co-borrower income cannot exceed $10,000,000';
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.borrowerCreditScore = 'Borrower credit score must be at least 300';
  } else if (inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Borrower credit score cannot exceed 850';
  }

  if (inputs.coBorrowerCreditScore < 0) {
    errors.coBorrowerCreditScore = 'Co-borrower credit score cannot be negative';
  } else if (inputs.coBorrowerCreditScore > 850) {
    errors.coBorrowerCreditScore = 'Co-borrower credit score cannot exceed 850';
  }

  const validEmploymentTypes = ['employed', 'self_employed', 'retired', 'business_owner', 'unemployed'];
  if (!validEmploymentTypes.includes(inputs.borrowerEmploymentType)) {
    errors.borrowerEmploymentType = 'Invalid borrower employment type';
  }

  if (!validEmploymentTypes.includes(inputs.coBorrowerEmploymentType)) {
    errors.coBorrowerEmploymentType = 'Invalid co-borrower employment type';
  }

  if (inputs.borrowerEmploymentLength < 0) {
    errors.borrowerEmploymentLength = 'Borrower employment length cannot be negative';
  } else if (inputs.borrowerEmploymentLength > 50) {
    errors.borrowerEmploymentLength = 'Borrower employment length cannot exceed 50 years';
  }

  if (inputs.coBorrowerEmploymentLength < 0) {
    errors.coBorrowerEmploymentLength = 'Co-borrower employment length cannot be negative';
  } else if (inputs.coBorrowerEmploymentLength > 50) {
    errors.coBorrowerEmploymentLength = 'Co-borrower employment length cannot exceed 50 years';
  }

  // Income Details validation
  if (inputs.baseSalary < 0) {
    errors.baseSalary = 'Base salary cannot be negative';
  } else if (inputs.baseSalary > 10000000) {
    errors.baseSalary = 'Base salary cannot exceed $10,000,000';
  }

  if (inputs.overtimeIncome < 0) {
    errors.overtimeIncome = 'Overtime income cannot be negative';
  } else if (inputs.overtimeIncome > 1000000) {
    errors.overtimeIncome = 'Overtime income cannot exceed $1,000,000';
  }

  if (inputs.bonusIncome < 0) {
    errors.bonusIncome = 'Bonus income cannot be negative';
  } else if (inputs.bonusIncome > 1000000) {
    errors.bonusIncome = 'Bonus income cannot exceed $1,000,000';
  }

  if (inputs.commissionIncome < 0) {
    errors.commissionIncome = 'Commission income cannot be negative';
  } else if (inputs.commissionIncome > 1000000) {
    errors.commissionIncome = 'Commission income cannot exceed $1,000,000';
  }

  if (inputs.rentalIncome < 0) {
    errors.rentalIncome = 'Rental income cannot be negative';
  } else if (inputs.rentalIncome > 1000000) {
    errors.rentalIncome = 'Rental income cannot exceed $1,000,000';
  }

  if (inputs.investmentIncome < 0) {
    errors.investmentIncome = 'Investment income cannot be negative';
  } else if (inputs.investmentIncome > 1000000) {
    errors.investmentIncome = 'Investment income cannot exceed $1,000,000';
  }

  if (inputs.otherIncome < 0) {
    errors.otherIncome = 'Other income cannot be negative';
  } else if (inputs.otherIncome > 1000000) {
    errors.otherIncome = 'Other income cannot exceed $1,000,000';
  }

  // Assets and Liabilities validation
  if (inputs.borrowerAssets < 0) {
    errors.borrowerAssets = 'Borrower assets cannot be negative';
  } else if (inputs.borrowerAssets > 100000000) {
    errors.borrowerAssets = 'Borrower assets cannot exceed $100,000,000';
  }

  if (inputs.coBorrowerAssets < 0) {
    errors.coBorrowerAssets = 'Co-borrower assets cannot be negative';
  } else if (inputs.coBorrowerAssets > 100000000) {
    errors.coBorrowerAssets = 'Co-borrower assets cannot exceed $100,000,000';
  }

  if (inputs.borrowerLiquidity < 0) {
    errors.borrowerLiquidity = 'Borrower liquidity cannot be negative';
  } else if (inputs.borrowerLiquidity > 10000000) {
    errors.borrowerLiquidity = 'Borrower liquidity cannot exceed $10,000,000';
  }

  if (inputs.coBorrowerLiquidity < 0) {
    errors.coBorrowerLiquidity = 'Co-borrower liquidity cannot be negative';
  } else if (inputs.coBorrowerLiquidity > 10000000) {
    errors.coBorrowerLiquidity = 'Co-borrower liquidity cannot exceed $10,000,000';
  }

  if (inputs.borrowerDebts < 0) {
    errors.borrowerDebts = 'Borrower debts cannot be negative';
  } else if (inputs.borrowerDebts > 10000000) {
    errors.borrowerDebts = 'Borrower debts cannot exceed $10,000,000';
  }

  if (inputs.coBorrowerDebts < 0) {
    errors.coBorrowerDebts = 'Co-borrower debts cannot be negative';
  } else if (inputs.coBorrowerDebts > 10000000) {
    errors.coBorrowerDebts = 'Co-borrower debts cannot exceed $10,000,000';
  }

  // Property Information validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  } else if (inputs.propertyValue > 50000000) {
    errors.propertyValue = 'Property value cannot exceed $50,000,000';
  }

  if (typeof inputs.propertyAddress !== 'string' || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address must be a non-empty string';
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

  // Loan Information validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  } else if (inputs.loanAmount > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000';
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.interestRate = 'Interest rate must be greater than 0';
  } else if (inputs.interestRate > 25) {
    errors.interestRate = 'Interest rate cannot exceed 25%';
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  } else if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }

  const validLoanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.loanType = 'Invalid loan type';
  }

  const validPaymentTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validPaymentTypes.includes(inputs.paymentType)) {
    errors.paymentType = 'Invalid payment type';
  }

  // Down Payment Information validation
  if (inputs.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  } else if (inputs.downPayment > inputs.propertyValue) {
    errors.downPayment = 'Down payment cannot exceed property value';
  }

  if (inputs.downPaymentPercentage < 0) {
    errors.downPaymentPercentage = 'Down payment percentage cannot be negative';
  } else if (inputs.downPaymentPercentage > 100) {
    errors.downPaymentPercentage = 'Down payment percentage cannot exceed 100%';
  }

  const validDownPaymentSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!validDownPaymentSources.includes(inputs.downPaymentSource)) {
    errors.downPaymentSource = 'Invalid down payment source';
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

  // Debt Information validation
  if (inputs.creditCardDebt < 0) {
    errors.creditCardDebt = 'Credit card debt cannot be negative';
  } else if (inputs.creditCardDebt > 100000) {
    errors.creditCardDebt = 'Credit card debt cannot exceed $100,000';
  }

  if (inputs.autoLoanDebt < 0) {
    errors.autoLoanDebt = 'Auto loan debt cannot be negative';
  } else if (inputs.autoLoanDebt > 200000) {
    errors.autoLoanDebt = 'Auto loan debt cannot exceed $200,000';
  }

  if (inputs.studentLoanDebt < 0) {
    errors.studentLoanDebt = 'Student loan debt cannot be negative';
  } else if (inputs.studentLoanDebt > 500000) {
    errors.studentLoanDebt = 'Student loan debt cannot exceed $500,000';
  }

  if (inputs.personalLoanDebt < 0) {
    errors.personalLoanDebt = 'Personal loan debt cannot be negative';
  } else if (inputs.personalLoanDebt > 100000) {
    errors.personalLoanDebt = 'Personal loan debt cannot exceed $100,000';
  }

  if (inputs.otherDebt < 0) {
    errors.otherDebt = 'Other debt cannot be negative';
  } else if (inputs.otherDebt > 100000) {
    errors.otherDebt = 'Other debt cannot exceed $100,000';
  }

  // Loan Program Requirements validation
  if (inputs.maxDebtToIncomeRatio <= 0) {
    errors.maxDebtToIncomeRatio = 'Maximum debt-to-income ratio must be greater than 0';
  } else if (inputs.maxDebtToIncomeRatio > 100) {
    errors.maxDebtToIncomeRatio = 'Maximum debt-to-income ratio cannot exceed 100%';
  }

  if (inputs.maxHousingExpenseRatio <= 0) {
    errors.maxHousingExpenseRatio = 'Maximum housing expense ratio must be greater than 0';
  } else if (inputs.maxHousingExpenseRatio > 100) {
    errors.maxHousingExpenseRatio = 'Maximum housing expense ratio cannot exceed 100%';
  }

  if (inputs.minCreditScore < 300) {
    errors.minCreditScore = 'Minimum credit score must be at least 300';
  } else if (inputs.minCreditScore > 850) {
    errors.minCreditScore = 'Minimum credit score cannot exceed 850';
  }

  if (inputs.minDownPayment < 0) {
    errors.minDownPayment = 'Minimum down payment cannot be negative';
  } else if (inputs.minDownPayment > 100) {
    errors.minDownPayment = 'Minimum down payment cannot exceed 100%';
  }

  if (inputs.maxLoanAmount <= 0) {
    errors.maxLoanAmount = 'Maximum loan amount must be greater than 0';
  } else if (inputs.maxLoanAmount > 10000000) {
    errors.maxLoanAmount = 'Maximum loan amount cannot exceed $10,000,000';
  }

  // Market Information validation
  if (typeof inputs.marketLocation !== 'string' || inputs.marketLocation.trim().length === 0) {
    errors.marketLocation = 'Market location must be a non-empty string';
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

  // Total income should be reasonable
  const totalIncome = inputs.borrowerIncome + inputs.coBorrowerIncome;
  if (totalIncome <= 0) {
    errors.borrowerIncome = 'Total income must be greater than 0';
  }

  // Credit score should be reasonable for loan type
  if (inputs.loanType === 'jumbo' && inputs.borrowerCreditScore < 700) {
    errors.borrowerCreditScore = 'Jumbo loans typically require credit scores of 700 or higher';
  }

  if (inputs.loanType === 'fha' && inputs.borrowerCreditScore < 580) {
    errors.borrowerCreditScore = 'FHA loans typically require credit scores of 580 or higher';
  }

  // Employment length should be reasonable
  if (inputs.borrowerEmploymentLength > inputs.borrowerEmploymentLength + 10) {
    errors.borrowerEmploymentLength = 'Employment length seems unrealistic';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateMortgageQualificationOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core metrics
  if (!outputs.qualificationScore || outputs.qualificationScore < 0) {
    errors.qualificationScore = 'Qualification score must be non-negative';
  } else if (outputs.qualificationScore > 100) {
    errors.qualificationScore = 'Qualification score cannot exceed 100';
  }

  if (!outputs.qualificationStatus) {
    errors.qualificationStatus = 'Qualification status is required';
  }

  if (!outputs.debtToIncomeRatio || outputs.debtToIncomeRatio < 0) {
    errors.debtToIncomeRatio = 'Debt-to-income ratio must be non-negative';
  }

  if (!outputs.housingExpenseRatio || outputs.housingExpenseRatio < 0) {
    errors.housingExpenseRatio = 'Housing expense ratio must be non-negative';
  }

  if (!outputs.averageCreditScore || outputs.averageCreditScore < 300) {
    errors.averageCreditScore = 'Average credit score must be at least 300';
  } else if (outputs.averageCreditScore > 850) {
    errors.averageCreditScore = 'Average credit score cannot exceed 850';
  }

  if (!outputs.maxAffordableLoan || outputs.maxAffordableLoan < 0) {
    errors.maxAffordableLoan = 'Maximum affordable loan must be non-negative';
  }

  if (!outputs.monthlyPayment || outputs.monthlyPayment < 0) {
    errors.monthlyPayment = 'Monthly payment must be non-negative';
  }

  if (!outputs.probabilityOfApproval || outputs.probabilityOfApproval < 0) {
    errors.probabilityOfApproval = 'Probability of approval must be non-negative';
  } else if (outputs.probabilityOfApproval > 100) {
    errors.probabilityOfApproval = 'Probability of approval cannot exceed 100';
  }

  // Validate analysis object
  if (!outputs.analysis) {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.qualificationRating) {
      errors.qualificationRating = 'Qualification rating is required';
    }
    if (!outputs.analysis.approvalRating) {
      errors.approvalRating = 'Approval rating is required';
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