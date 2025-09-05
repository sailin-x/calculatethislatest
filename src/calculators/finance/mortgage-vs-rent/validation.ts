import { MortgageVsRentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMortgageVsRentInputs(inputs: MortgageVsRentInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

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

  // Loan amount validation
  if (!inputs.loanAmount || inputs.loanAmount < 10000) {
    errors.push('Loan amount must be at least $10,000');
  }
  if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
  }

  // Interest rate validation
  if (inputs.interestRate < 0 || inputs.interestRate > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  // Loan term validation
  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  // Down payment validation
  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  // Down payment percentage validation
  if (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100) {
    errors.push('Down payment percentage must be between 0% and 100%');
  }

  // Monthly rent validation
  if (!inputs.monthlyRent || inputs.monthlyRent < 100) {
    errors.push('Monthly rent must be at least $100');
  }
  if (inputs.monthlyRent > 50000) {
    errors.push('Monthly rent cannot exceed $50,000');
  }

  // Annual rent validation
  if (inputs.annualRent < 0) {
    errors.push('Annual rent cannot be negative');
  }
  if (inputs.annualRent > 600000) {
    errors.push('Annual rent cannot exceed $600,000');
  }

  // Rent increase rate validation
  if (inputs.rentIncreaseRate < 0 || inputs.rentIncreaseRate > 1) {
    errors.push('Rent increase rate must be between 0% and 100%');
  }

  // Rent escalation rate validation
  if (inputs.rentEscalationRate < 0 || inputs.rentEscalationRate > 1) {
    errors.push('Rent escalation rate must be between 0% and 100%');
  }

  // Insurance and taxes validation
  if (inputs.propertyInsurance < 0) {
    errors.push('Property insurance cannot be negative');
  }
  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }
  if (inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }
  if (inputs.floodInsurance < 0) {
    errors.push('Flood insurance cannot be negative');
  }
  if (inputs.mortgageInsurance < 0) {
    errors.push('Mortgage insurance cannot be negative');
  }
  if (inputs.rentersInsurance < 0) {
    errors.push('Renters insurance cannot be negative');
  }

  // Maintenance and utilities validation
  if (inputs.maintenanceCosts < 0) {
    errors.push('Maintenance costs cannot be negative');
  }
  if (inputs.utilityCosts < 0) {
    errors.push('Utility costs cannot be negative');
  }

  // Closing costs and fees validation
  if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }
  if (inputs.originationFee < 0) {
    errors.push('Origination fee cannot be negative');
  }
  if (inputs.appraisalFee < 0) {
    errors.push('Appraisal fee cannot be negative');
  }
  if (inputs.titleInsuranceFee < 0) {
    errors.push('Title insurance fee cannot be negative');
  }
  if (inputs.recordingFee < 0) {
    errors.push('Recording fee cannot be negative');
  }
  if (inputs.attorneyFee < 0) {
    errors.push('Attorney fee cannot be negative');
  }
  if (inputs.otherFees < 0) {
    errors.push('Other fees cannot be negative');
  }

  // Market growth rate validation
  if (inputs.marketGrowthRate < -0.5 || inputs.marketGrowthRate > 1) {
    errors.push('Market growth rate must be between -50% and 100%');
  }

  // Property appreciation rate validation
  if (inputs.propertyAppreciationRate < -0.5 || inputs.propertyAppreciationRate > 1) {
    errors.push('Property appreciation rate must be between -50% and 100%');
  }

  // Rent growth rate validation
  if (inputs.rentGrowthRate < -0.5 || inputs.rentGrowthRate > 1) {
    errors.push('Rent growth rate must be between -50% and 100%');
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

  // Investment return rate validation
  if (inputs.investmentReturnRate < 0 || inputs.investmentReturnRate > 1) {
    errors.push('Investment return rate must be between 0% and 100%');
  }

  // Inflation rate validation
  if (inputs.inflationRate < -0.1 || inputs.inflationRate > 0.5) {
    errors.push('Inflation rate must be between -10% and 50%');
  }

  // Discount rate validation
  if (inputs.discountRate < 0 || inputs.discountRate > 1) {
    errors.push('Discount rate must be between 0 and 100%');
  }

  // Analysis period validation
  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  // Expected stay duration validation
  if (inputs.expectedStayDuration < 1 || inputs.expectedStayDuration > 30) {
    errors.push('Expected stay duration must be between 1 and 30 years');
  }

  // Property type validation
  if (!['single_family', 'multi_family', 'condo', 'townhouse', 'apartment'].includes(inputs.propertyType)) {
    errors.push('Property type must be one of: single_family, multi_family, condo, townhouse, apartment');
  }

  // Loan type validation
  if (!['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'].includes(inputs.loanType)) {
    errors.push('Loan type must be one of: conventional, fha, va, usda, jumbo, hard_money, private');
  }

  // Payment type validation
  if (!['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.paymentType)) {
    errors.push('Payment type must be one of: principal_interest, interest_only, balloon, arm');
  }

  // Down payment source validation
  if (!['savings', 'investment_sale', 'gift', 'inheritance', 'other'].includes(inputs.downPaymentSource)) {
    errors.push('Down payment source must be one of: savings, investment_sale, gift, inheritance, other');
  }

  // Market condition validation
  if (!['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.push('Market condition must be one of: declining, stable, growing, hot');
  }

  // Employment type validation
  if (!['employed', 'self_employed', 'retired', 'business_owner'].includes(inputs.borrowerEmploymentType)) {
    errors.push('Employment type must be one of: employed, self_employed, retired, business_owner');
  }

  // Maintenance preference validation
  if (!['low', 'medium', 'high'].includes(inputs.maintenancePreference)) {
    errors.push('Maintenance preference must be one of: low, medium, high');
  }

  // Location stability validation
  if (!['stable', 'moderate', 'unstable'].includes(inputs.locationStability)) {
    errors.push('Location stability must be one of: stable, moderate, unstable');
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

  // Rent escalation clause validation
  if (typeof inputs.rentEscalationClause !== 'boolean') {
    errors.push('Rent escalation clause must be a boolean value');
  }

  // Rent includes utilities validation
  if (typeof inputs.rentIncludesUtilities !== 'boolean') {
    errors.push('Rent includes utilities must be a boolean value');
  }

  // Flexibility needed validation
  if (typeof inputs.flexibilityNeeded !== 'boolean') {
    errors.push('Flexibility needed must be a boolean value');
  }

  // Cross-field validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    warnings.push('Loan amount exceeds property value');
  }

  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment > inputs.propertyValue) {
    warnings.push('Down payment exceeds property value');
  }

  if (inputs.monthlyRent && inputs.annualRent) {
    const calculatedAnnualRent = inputs.monthlyRent * 12;
    if (Math.abs(calculatedAnnualRent - inputs.annualRent) > 100) {
      warnings.push('Annual rent does not match monthly rent * 12');
    }
  }

  if (inputs.borrowerIncome && inputs.loanAmount) {
    const incomeRatio = inputs.loanAmount / inputs.borrowerIncome;
    if (incomeRatio > 10) {
      warnings.push('Loan amount is more than 10 times borrower income');
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

  if (inputs.expectedStayDuration < 2) {
    warnings.push('Expected stay duration less than 2 years may favor renting');
  }

  if (inputs.expectedStayDuration > 10) {
    warnings.push('Expected stay duration longer than 10 years may favor buying');
  }

  if (inputs.rentIncreaseRate > 0.1) {
    warnings.push('High rent increase rate may favor buying');
  }

  if (inputs.propertyAppreciationRate > 0.1) {
    warnings.push('High property appreciation rate may favor buying');
  }

  if (inputs.investmentReturnRate > 0.15) {
    warnings.push('High investment return rate may favor renting');
  }

  if (inputs.maintenancePreference === 'low' && inputs.propertyAge > 20) {
    warnings.push('Low maintenance preference with older property may increase costs');
  }

  if (inputs.locationStability === 'unstable' && inputs.expectedStayDuration > 5) {
    warnings.push('Unstable location with long stay duration may increase risk');
  }

  if (inputs.flexibilityNeeded && inputs.expectedStayDuration > 5) {
    warnings.push('High flexibility needs with long stay duration may favor renting');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}