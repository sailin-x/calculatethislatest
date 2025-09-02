import { MortgageRefinanceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateMortgageRefinanceInputs(inputs: MortgageRefinanceInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Current Loan Information validation
  if (!inputs.currentLoanAmount || inputs.currentLoanAmount <= 0) {
    errors.currentLoanAmount = 'Current loan amount must be greater than 0';
  } else if (inputs.currentLoanAmount > 10000000) {
    errors.currentLoanAmount = 'Current loan amount cannot exceed $10,000,000';
  }

  if (!inputs.currentInterestRate || inputs.currentInterestRate <= 0) {
    errors.currentInterestRate = 'Current interest rate must be greater than 0';
  } else if (inputs.currentInterestRate > 25) {
    errors.currentInterestRate = 'Current interest rate cannot exceed 25%';
  }

  if (!inputs.currentLoanTerm || inputs.currentLoanTerm <= 0) {
    errors.currentLoanTerm = 'Current loan term must be greater than 0';
  } else if (inputs.currentLoanTerm > 50) {
    errors.currentLoanTerm = 'Current loan term cannot exceed 50 years';
  }

  const validCurrentLoanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validCurrentLoanTypes.includes(inputs.currentLoanType)) {
    errors.currentLoanType = 'Invalid current loan type';
  }

  const validCurrentPaymentTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validCurrentPaymentTypes.includes(inputs.currentPaymentType)) {
    errors.currentPaymentType = 'Invalid current payment type';
  }

  if (!inputs.currentMonthlyPayment || inputs.currentMonthlyPayment <= 0) {
    errors.currentMonthlyPayment = 'Current monthly payment must be greater than 0';
  } else if (inputs.currentMonthlyPayment > 50000) {
    errors.currentMonthlyPayment = 'Current monthly payment cannot exceed $50,000';
  }

  if (!inputs.currentRemainingTerm || inputs.currentRemainingTerm <= 0) {
    errors.currentRemainingTerm = 'Current remaining term must be greater than 0';
  } else if (inputs.currentRemainingTerm > 50) {
    errors.currentRemainingTerm = 'Current remaining term cannot exceed 50 years';
  }

  if (!inputs.currentPrincipalBalance || inputs.currentPrincipalBalance <= 0) {
    errors.currentPrincipalBalance = 'Current principal balance must be greater than 0';
  } else if (inputs.currentPrincipalBalance > 10000000) {
    errors.currentPrincipalBalance = 'Current principal balance cannot exceed $10,000,000';
  }

  // New Loan Information validation
  if (!inputs.newLoanAmount || inputs.newLoanAmount <= 0) {
    errors.newLoanAmount = 'New loan amount must be greater than 0';
  } else if (inputs.newLoanAmount > 10000000) {
    errors.newLoanAmount = 'New loan amount cannot exceed $10,000,000';
  }

  if (!inputs.newInterestRate || inputs.newInterestRate <= 0) {
    errors.newInterestRate = 'New interest rate must be greater than 0';
  } else if (inputs.newInterestRate > 25) {
    errors.newInterestRate = 'New interest rate cannot exceed 25%';
  }

  if (!inputs.newLoanTerm || inputs.newLoanTerm <= 0) {
    errors.newLoanTerm = 'New loan term must be greater than 0';
  } else if (inputs.newLoanTerm > 50) {
    errors.newLoanTerm = 'New loan term cannot exceed 50 years';
  }

  const validNewLoanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validNewLoanTypes.includes(inputs.newLoanType)) {
    errors.newLoanType = 'Invalid new loan type';
  }

  const validNewPaymentTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validNewPaymentTypes.includes(inputs.newPaymentType)) {
    errors.newPaymentType = 'Invalid new payment type';
  }

  const validRefinanceTypes = ['rate_term', 'cash_out', 'cash_in', 'streamline', 'fha_to_conventional'];
  if (!validRefinanceTypes.includes(inputs.refinanceType)) {
    errors.refinanceType = 'Invalid refinance type';
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

  // Refinance Costs validation
  if (inputs.closingCosts < 0) {
    errors.closingCosts = 'Closing costs cannot be negative';
  } else if (inputs.closingCosts > 50000) {
    errors.closingCosts = 'Closing costs cannot exceed $50,000';
  }

  if (inputs.originationFee < 0) {
    errors.originationFee = 'Origination fee cannot be negative';
  } else if (inputs.originationFee > 20000) {
    errors.originationFee = 'Origination fee cannot exceed $20,000';
  }

  if (inputs.appraisalFee < 0) {
    errors.appraisalFee = 'Appraisal fee cannot be negative';
  } else if (inputs.appraisalFee > 5000) {
    errors.appraisalFee = 'Appraisal fee cannot exceed $5,000';
  }

  if (inputs.titleInsuranceFee < 0) {
    errors.titleInsuranceFee = 'Title insurance fee cannot be negative';
  } else if (inputs.titleInsuranceFee > 10000) {
    errors.titleInsuranceFee = 'Title insurance fee cannot exceed $10,000';
  }

  if (inputs.recordingFee < 0) {
    errors.recordingFee = 'Recording fee cannot be negative';
  } else if (inputs.recordingFee > 2000) {
    errors.recordingFee = 'Recording fee cannot exceed $2,000';
  }

  if (inputs.attorneyFee < 0) {
    errors.attorneyFee = 'Attorney fee cannot be negative';
  } else if (inputs.attorneyFee > 5000) {
    errors.attorneyFee = 'Attorney fee cannot exceed $5,000';
  }

  if (inputs.creditReportFee < 0) {
    errors.creditReportFee = 'Credit report fee cannot be negative';
  } else if (inputs.creditReportFee > 1000) {
    errors.creditReportFee = 'Credit report fee cannot exceed $1,000';
  }

  if (inputs.floodCertificationFee < 0) {
    errors.floodCertificationFee = 'Flood certification fee cannot be negative';
  } else if (inputs.floodCertificationFee > 500) {
    errors.floodCertificationFee = 'Flood certification fee cannot exceed $500';
  }

  if (inputs.taxServiceFee < 0) {
    errors.taxServiceFee = 'Tax service fee cannot be negative';
  } else if (inputs.taxServiceFee > 2000) {
    errors.taxServiceFee = 'Tax service fee cannot exceed $2,000';
  }

  if (inputs.otherFees < 0) {
    errors.otherFees = 'Other fees cannot be negative';
  } else if (inputs.otherFees > 10000) {
    errors.otherFees = 'Other fees cannot exceed $10,000';
  }

  // Borrower Information validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income must be greater than 0';
  } else if (inputs.borrowerIncome > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10,000,000';
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.borrowerCreditScore = 'Borrower credit score must be at least 300';
  } else if (inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Borrower credit score cannot exceed 850';
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

  if (inputs.taxDeductionPeriod <= 0) {
    errors.taxDeductionPeriod = 'Tax deduction period must be greater than 0';
  } else if (inputs.taxDeductionPeriod > 50) {
    errors.taxDeductionPeriod = 'Tax deduction period cannot exceed 50 years';
  }

  // Refinance Goals validation
  const validRefinanceGoals = ['lower_payment', 'lower_rate', 'cash_out', 'shorter_term', 'remove_pmi', 'consolidate_debt'];
  if (!validRefinanceGoals.includes(inputs.refinanceGoal)) {
    errors.refinanceGoal = 'Invalid refinance goal';
  }

  if (inputs.targetMonthlySavings < 0) {
    errors.targetMonthlySavings = 'Target monthly savings cannot be negative';
  } else if (inputs.targetMonthlySavings > 10000) {
    errors.targetMonthlySavings = 'Target monthly savings cannot exceed $10,000';
  }

  if (inputs.targetRate <= 0) {
    errors.targetRate = 'Target rate must be greater than 0';
  } else if (inputs.targetRate > 25) {
    errors.targetRate = 'Target rate cannot exceed 25%';
  }

  if (inputs.cashOutAmount < 0) {
    errors.cashOutAmount = 'Cash out amount cannot be negative';
  } else if (inputs.cashOutAmount > 1000000) {
    errors.cashOutAmount = 'Cash out amount cannot exceed $1,000,000';
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
  // New loan amount should not exceed property value
  if (inputs.newLoanAmount > inputs.propertyValue) {
    errors.newLoanAmount = 'New loan amount cannot exceed property value';
  }

  // Current principal balance should not exceed current loan amount
  if (inputs.currentPrincipalBalance > inputs.currentLoanAmount) {
    errors.currentPrincipalBalance = 'Current principal balance cannot exceed current loan amount';
  }

  // Remaining term should not exceed original loan term
  if (inputs.currentRemainingTerm > inputs.currentLoanTerm) {
    errors.currentRemainingTerm = 'Remaining term cannot exceed original loan term';
  }

  // Cash out amount should not exceed new loan amount
  if (inputs.cashOutAmount > inputs.newLoanAmount) {
    errors.cashOutAmount = 'Cash out amount cannot exceed new loan amount';
  }

  // For cash-out refinance, new loan amount should be greater than current principal balance
  if (inputs.refinanceType === 'cash_out' && inputs.newLoanAmount <= inputs.currentPrincipalBalance) {
    errors.newLoanAmount = 'Cash-out refinance requires new loan amount to exceed current principal balance';
  }

  // For cash-in refinance, new loan amount should be less than current principal balance
  if (inputs.refinanceType === 'cash_in' && inputs.newLoanAmount >= inputs.currentPrincipalBalance) {
    errors.newLoanAmount = 'Cash-in refinance requires new loan amount to be less than current principal balance';
  }

  // Rate and term refinance should have similar loan amounts
  if (inputs.refinanceType === 'rate_term' && Math.abs(inputs.newLoanAmount - inputs.currentPrincipalBalance) > inputs.currentPrincipalBalance * 0.1) {
    errors.newLoanAmount = 'Rate and term refinance should have similar loan amounts';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateMortgageRefinanceOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core metrics
  if (!outputs.monthlyPaymentSavings || outputs.monthlyPaymentSavings < 0) {
    errors.monthlyPaymentSavings = 'Monthly payment savings must be non-negative';
  }

  if (!outputs.interestSavings || outputs.interestSavings < 0) {
    errors.interestSavings = 'Interest savings must be non-negative';
  }

  if (!outputs.breakEvenMonths || outputs.breakEvenMonths < 0) {
    errors.breakEvenMonths = 'Break-even months must be non-negative';
  }

  if (typeof outputs.netSavings !== 'number') {
    errors.netSavings = 'Net savings must be a number';
  }

  if (typeof outputs.returnOnInvestment !== 'number') {
    errors.returnOnInvestment = 'Return on investment must be a number';
  }

  if (!outputs.riskScore || outputs.riskScore < 0) {
    errors.riskScore = 'Risk score must be non-negative';
  } else if (outputs.riskScore > 100) {
    errors.riskScore = 'Risk score cannot exceed 100';
  }

  if (!outputs.newMonthlyPayment || outputs.newMonthlyPayment <= 0) {
    errors.newMonthlyPayment = 'New monthly payment must be greater than 0';
  }

  if (!outputs.totalRefinanceCost || outputs.totalRefinanceCost < 0) {
    errors.totalRefinanceCost = 'Total refinance cost must be non-negative';
  }

  // Validate analysis object
  if (!outputs.analysis) {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.refinanceRating) {
      errors.refinanceRating = 'Refinance rating is required';
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