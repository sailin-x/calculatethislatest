import { MortgageRefinanceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMortgageRefinanceInputs(inputs: MortgageRefinanceInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Current loan amount validation
  if (!inputs.currentLoanAmount || inputs.currentLoanAmount < 10000) {
    errors.push('Current loan amount must be at least $10,000');
  }
  if (inputs.currentLoanAmount > 10000000) {
    errors.push('Current loan amount cannot exceed $10,000,000');
  }

  // Current interest rate validation
  if (inputs.currentInterestRate < 0 || inputs.currentInterestRate > 0.5) {
    errors.push('Current interest rate must be between 0% and 50%');
  }

  // Current loan term validation
  if (inputs.currentLoanTerm < 1 || inputs.currentLoanTerm > 50) {
    errors.push('Current loan term must be between 1 and 50 years');
  }

  // Current monthly payment validation
  if (!inputs.currentMonthlyPayment || inputs.currentMonthlyPayment < 100) {
    errors.push('Current monthly payment must be at least $100');
  }
  if (inputs.currentMonthlyPayment > 50000) {
    errors.push('Current monthly payment cannot exceed $50,000');
  }

  // Current remaining term validation
  if (inputs.currentRemainingTerm < 1 || inputs.currentRemainingTerm > 50) {
    errors.push('Current remaining term must be between 1 and 50 years');
  }

  // Current principal balance validation
  if (!inputs.currentPrincipalBalance || inputs.currentPrincipalBalance < 1000) {
    errors.push('Current principal balance must be at least $1,000');
  }
  if (inputs.currentPrincipalBalance > 10000000) {
    errors.push('Current principal balance cannot exceed $10,000,000');
  }

  // New loan amount validation
  if (!inputs.newLoanAmount || inputs.newLoanAmount < 10000) {
    errors.push('New loan amount must be at least $10,000');
  }
  if (inputs.newLoanAmount > 10000000) {
    errors.push('New loan amount cannot exceed $10,000,000');
  }

  // New interest rate validation
  if (inputs.newInterestRate < 0 || inputs.newInterestRate > 0.5) {
    errors.push('New interest rate must be between 0% and 50%');
  }

  // New loan term validation
  if (inputs.newLoanTerm < 1 || inputs.newLoanTerm > 50) {
    errors.push('New loan term must be between 1 and 50 years');
  }

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue < 50000) {
    errors.push('Property value must be at least $50,000');
  }
  if (inputs.propertyValue > 50000000) {
    errors.push('Property value cannot exceed $50,000,000');
  }

  // Property size validation
  if (inputs.propertySize < 100 || inputs.propertySize > 50000) {
    errors.push('Property size must be between 100 and 50,000 square feet');
  }

  // Property age validation
  if (inputs.propertyAge < 0 || inputs.propertyAge > 200) {
    errors.push('Property age must be between 0 and 200 years');
  }

  // Closing costs validation
  if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }
  if (inputs.closingCosts > 50000) {
    warnings.push('Closing costs seem unusually high');
  }

  // Origination fee validation
  if (inputs.originationFee < 0) {
    errors.push('Origination fee cannot be negative');
  }
  if (inputs.originationFee > 10000) {
    warnings.push('Origination fee seems unusually high');
  }

  // Appraisal fee validation
  if (inputs.appraisalFee < 0) {
    errors.push('Appraisal fee cannot be negative');
  }
  if (inputs.appraisalFee > 2000) {
    warnings.push('Appraisal fee seems unusually high');
  }

  // Title insurance fee validation
  if (inputs.titleInsuranceFee < 0) {
    errors.push('Title insurance fee cannot be negative');
  }
  if (inputs.titleInsuranceFee > 5000) {
    warnings.push('Title insurance fee seems unusually high');
  }

  // Recording fee validation
  if (inputs.recordingFee < 0) {
    errors.push('Recording fee cannot be negative');
  }
  if (inputs.recordingFee > 1000) {
    warnings.push('Recording fee seems unusually high');
  }

  // Attorney fee validation
  if (inputs.attorneyFee < 0) {
    errors.push('Attorney fee cannot be negative');
  }
  if (inputs.attorneyFee > 5000) {
    warnings.push('Attorney fee seems unusually high');
  }

  // Credit report fee validation
  if (inputs.creditReportFee < 0) {
    errors.push('Credit report fee cannot be negative');
  }
  if (inputs.creditReportFee > 500) {
    warnings.push('Credit report fee seems unusually high');
  }

  // Flood certification fee validation
  if (inputs.floodCertificationFee < 0) {
    errors.push('Flood certification fee cannot be negative');
  }
  if (inputs.floodCertificationFee > 500) {
    warnings.push('Flood certification fee seems unusually high');
  }

  // Tax service fee validation
  if (inputs.taxServiceFee < 0) {
    errors.push('Tax service fee cannot be negative');
  }
  if (inputs.taxServiceFee > 500) {
    warnings.push('Tax service fee seems unusually high');
  }

  // Other fees validation
  if (inputs.otherFees < 0) {
    errors.push('Other fees cannot be negative');
  }
  if (inputs.otherFees > 10000) {
    warnings.push('Other fees seem unusually high');
  }

  // Borrower income validation
  if (inputs.borrowerIncome < 0) {
    errors.push('Borrower income cannot be negative');
  }
  if (inputs.borrowerIncome > 10000000) {
    warnings.push('Borrower income seems unusually high');
  }

  // Credit score validation
  if (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  // Debt-to-income ratio validation
  if (inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 1) {
    errors.push('Debt-to-income ratio must be between 0 and 1');
  }
  if (inputs.borrowerDebtToIncomeRatio > 0.5) {
    warnings.push('Debt-to-income ratio is above 50%, which may affect loan approval');
  }

  // Tax rate validation
  if (inputs.borrowerTaxRate < 0 || inputs.borrowerTaxRate > 100) {
    errors.push('Borrower tax rate must be between 0% and 100%');
  }

  // Market growth rate validation
  if (inputs.marketGrowthRate < -0.5 || inputs.marketGrowthRate > 1) {
    errors.push('Market growth rate must be between -50% and 100%');
  }

  // Analysis period validation
  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  // Rate validation
  if (inputs.inflationRate < -0.1 || inputs.inflationRate > 0.5) {
    errors.push('Inflation rate must be between -10% and 50%');
  }
  if (inputs.propertyAppreciationRate < -0.5 || inputs.propertyAppreciationRate > 1) {
    errors.push('Property appreciation rate must be between -50% and 100%');
  }
  if (inputs.discountRate < 0 || inputs.discountRate > 1) {
    errors.push('Discount rate must be between 0 and 100%');
  }

  // Tax deduction period validation
  if (inputs.taxDeductionPeriod < 1 || inputs.taxDeductionPeriod > 30) {
    errors.push('Tax deduction period must be between 1 and 30 years');
  }

  // Target monthly savings validation
  if (inputs.targetMonthlySavings < 0) {
    errors.push('Target monthly savings cannot be negative');
  }

  // Target rate validation
  if (inputs.targetRate < 0 || inputs.targetRate > 0.5) {
    errors.push('Target rate must be between 0% and 50%');
  }

  // Cash out amount validation
  if (inputs.cashOutAmount < 0) {
    errors.push('Cash out amount cannot be negative');
  }
  if (inputs.cashOutAmount > 1000000) {
    warnings.push('Cash out amount seems unusually high');
  }

  // Loan type validation
  if (!['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'].includes(inputs.currentLoanType)) {
    errors.push('Current loan type must be one of: conventional, fha, va, usda, jumbo, hard_money, private');
  }
  if (!['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'].includes(inputs.newLoanType)) {
    errors.push('New loan type must be one of: conventional, fha, va, usda, jumbo, hard_money, private');
  }

  // Payment type validation
  if (!['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.currentPaymentType)) {
    errors.push('Current payment type must be one of: principal_interest, interest_only, balloon, arm');
  }
  if (!['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.newPaymentType)) {
    errors.push('New payment type must be one of: principal_interest, interest_only, balloon, arm');
  }

  // Refinance type validation
  if (!['rate_term', 'cash_out', 'cash_in', 'streamline', 'fha_to_conventional'].includes(inputs.refinanceType)) {
    errors.push('Refinance type must be one of: rate_term, cash_out, cash_in, streamline, fha_to_conventional');
  }

  // Property type validation
  if (!['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'].includes(inputs.propertyType)) {
    errors.push('Property type must be one of: single_family, multi_family, condo, townhouse, commercial');
  }

  // Market condition validation
  if (!['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.push('Market condition must be one of: declining, stable, growing, hot');
  }

  // Employment type validation
  if (!['employed', 'self_employed', 'retired', 'business_owner'].includes(inputs.borrowerEmploymentType)) {
    errors.push('Employment type must be one of: employed, self_employed, retired, business_owner');
  }

  // Refinance goal validation
  if (!['lower_payment', 'lower_rate', 'cash_out', 'shorter_term', 'remove_pmi', 'consolidate_debt'].includes(inputs.refinanceGoal)) {
    errors.push('Refinance goal must be one of: lower_payment, lower_rate, cash_out, shorter_term, remove_pmi, consolidate_debt');
  }

  // Currency validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.push('Currency must be one of: USD, EUR, GBP, CAD, AUD');
  }

  // Display format validation
  if (!['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.push('Display format must be one of: percentage, decimal, currency');
  }

  // Include charts validation
  if (typeof inputs.includeCharts !== 'boolean') {
    errors.push('Include charts must be a boolean value');
  }

  // Cross-field validation
  if (inputs.currentLoanAmount && inputs.propertyValue && inputs.currentLoanAmount > inputs.propertyValue) {
    warnings.push('Current loan amount exceeds property value');
  }

  if (inputs.newLoanAmount && inputs.propertyValue && inputs.newLoanAmount > inputs.propertyValue) {
    warnings.push('New loan amount exceeds property value');
  }

  if (inputs.currentInterestRate && inputs.newInterestRate) {
    const rateDifference = Math.abs(inputs.currentInterestRate - inputs.newInterestRate);
    if (rateDifference > 0.1) {
      warnings.push('Rate difference between current and new rate is significant');
    }
  }

  if (inputs.currentLoanAmount && inputs.newLoanAmount) {
    const loanDifference = Math.abs(inputs.currentLoanAmount - inputs.newLoanAmount);
    if (loanDifference > inputs.currentLoanAmount * 0.2) {
      warnings.push('Significant difference between current and new loan amounts');
    }
  }

  if (inputs.borrowerIncome && inputs.newLoanAmount) {
    const incomeRatio = inputs.newLoanAmount / inputs.borrowerIncome;
    if (incomeRatio > 10) {
      warnings.push('New loan amount is more than 10 times borrower income');
    }
  }

  if (inputs.borrowerCreditScore < 620) {
    warnings.push('Credit score below 620 may affect loan approval');
  }

  if (inputs.borrowerDebtToIncomeRatio > 0.43) {
    warnings.push('Debt-to-income ratio above 43% may affect loan approval');
  }

  if (inputs.marketGrowthRate > 0.2) {
    warnings.push('High market growth rate may indicate market volatility');
  }

  if (inputs.analysisPeriod > 10) {
    warnings.push('Analysis period longer than 10 years may have high uncertainty');
  }

  if (inputs.refinanceType === 'cash_out' && inputs.cashOutAmount === 0) {
    warnings.push('Cash-out refinance selected but no cash-out amount specified');
  }

  if (inputs.refinanceType === 'cash_in' && inputs.cashOutAmount > 0) {
    warnings.push('Cash-in refinance selected but cash-out amount is specified');
  }

  if (inputs.targetMonthlySavings > 0 && inputs.newInterestRate >= inputs.currentInterestRate) {
    warnings.push('Target monthly savings specified but new rate is not lower than current rate');
  }

  if (inputs.targetRate > 0 && inputs.newInterestRate > inputs.targetRate) {
    warnings.push('New interest rate exceeds target rate');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}