import { MortgageVsRentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateMortgageVsRentInputs(inputs: MortgageVsRentInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }
  if (inputs.propertyValue > 50000000) {
    errors.propertyValue = 'Property value cannot exceed $50,000,000';
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address is required';
  }

  if (!['single_family', 'multi_family', 'condo', 'townhouse', 'apartment'].includes(inputs.propertyType)) {
    errors.propertyType = 'Invalid property type';
  }

  if (inputs.propertySize < 0) {
    errors.propertySize = 'Property size cannot be negative';
  }
  if (inputs.propertySize > 100000) {
    errors.propertySize = 'Property size cannot exceed 100,000 sq ft';
  }

  if (inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age cannot be negative';
  }
  if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  // Mortgage Information Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  }
  if (inputs.loanAmount > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000';
  }
  if (inputs.loanAmount > inputs.propertyValue) {
    errors.loanAmount = 'Loan amount cannot exceed property value';
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.interestRate = 'Interest rate must be greater than 0';
  }
  if (inputs.interestRate > 25) {
    errors.interestRate = 'Interest rate cannot exceed 25%';
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  }
  if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }

  if (!['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'].includes(inputs.loanType)) {
    errors.loanType = 'Invalid loan type';
  }

  if (!['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.paymentType)) {
    errors.paymentType = 'Invalid payment type';
  }

  // Down Payment Information Validation
  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.downPayment = 'Down payment cannot exceed property value';
  }

  if (inputs.downPaymentPercentage < 0) {
    errors.downPaymentPercentage = 'Down payment percentage cannot be negative';
  }
  if (inputs.downPaymentPercentage > 100) {
    errors.downPaymentPercentage = 'Down payment percentage cannot exceed 100%';
  }

  if (!['savings', 'investment_sale', 'gift', 'inheritance', 'other'].includes(inputs.downPaymentSource)) {
    errors.downPaymentSource = 'Invalid down payment source';
  }

  // Rent Information Validation
  if (!inputs.monthlyRent || inputs.monthlyRent <= 0) {
    errors.monthlyRent = 'Monthly rent must be greater than 0';
  }
  if (inputs.monthlyRent > 50000) {
    errors.monthlyRent = 'Monthly rent cannot exceed $50,000';
  }

  if (!inputs.annualRent || inputs.annualRent <= 0) {
    errors.annualRent = 'Annual rent must be greater than 0';
  }
  if (inputs.annualRent > 600000) {
    errors.annualRent = 'Annual rent cannot exceed $600,000';
  }

  if (inputs.rentIncreaseRate < -20) {
    errors.rentIncreaseRate = 'Rent increase rate cannot be less than -20%';
  }
  if (inputs.rentIncreaseRate > 50) {
    errors.rentIncreaseRate = 'Rent increase rate cannot exceed 50%';
  }

  if (inputs.rentEscalationRate < -20) {
    errors.rentEscalationRate = 'Rent escalation rate cannot be less than -20%';
  }
  if (inputs.rentEscalationRate > 50) {
    errors.rentEscalationRate = 'Rent escalation rate cannot exceed 50%';
  }

  // Insurance and Taxes Validation
  if (inputs.propertyInsurance < 0) {
    errors.propertyInsurance = 'Property insurance cannot be negative';
  }
  if (inputs.propertyInsurance > 50000) {
    errors.propertyInsurance = 'Property insurance cannot exceed $50,000';
  }

  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  }
  if (inputs.propertyTaxes > 100000) {
    errors.propertyTaxes = 'Property taxes cannot exceed $100,000';
  }

  if (inputs.hoaFees < 0) {
    errors.hoaFees = 'HOA fees cannot be negative';
  }
  if (inputs.hoaFees > 50000) {
    errors.hoaFees = 'HOA fees cannot exceed $50,000';
  }

  if (inputs.floodInsurance < 0) {
    errors.floodInsurance = 'Flood insurance cannot be negative';
  }
  if (inputs.floodInsurance > 10000) {
    errors.floodInsurance = 'Flood insurance cannot exceed $10,000';
  }

  if (inputs.mortgageInsurance < 0) {
    errors.mortgageInsurance = 'Mortgage insurance cannot be negative';
  }
  if (inputs.mortgageInsurance > 20000) {
    errors.mortgageInsurance = 'Mortgage insurance cannot exceed $20,000';
  }

  if (inputs.rentersInsurance < 0) {
    errors.rentersInsurance = 'Renters insurance cannot be negative';
  }
  if (inputs.rentersInsurance > 5000) {
    errors.rentersInsurance = 'Renters insurance cannot exceed $5,000';
  }

  // Maintenance and Utilities Validation
  if (inputs.maintenanceCosts < 0) {
    errors.maintenanceCosts = 'Maintenance costs cannot be negative';
  }
  if (inputs.maintenanceCosts > 50000) {
    errors.maintenanceCosts = 'Maintenance costs cannot exceed $50,000';
  }

  if (inputs.utilityCosts < 0) {
    errors.utilityCosts = 'Utility costs cannot be negative';
  }
  if (inputs.utilityCosts > 20000) {
    errors.utilityCosts = 'Utility costs cannot exceed $20,000';
  }

  // Closing Costs and Fees Validation
  if (inputs.closingCosts < 0) {
    errors.closingCosts = 'Closing costs cannot be negative';
  }
  if (inputs.closingCosts > 50000) {
    errors.closingCosts = 'Closing costs cannot exceed $50,000';
  }

  if (inputs.originationFee < 0) {
    errors.originationFee = 'Origination fee cannot be negative';
  }
  if (inputs.originationFee > 20000) {
    errors.originationFee = 'Origination fee cannot exceed $20,000';
  }

  if (inputs.appraisalFee < 0) {
    errors.appraisalFee = 'Appraisal fee cannot be negative';
  }
  if (inputs.appraisalFee > 5000) {
    errors.appraisalFee = 'Appraisal fee cannot exceed $5,000';
  }

  if (inputs.titleInsuranceFee < 0) {
    errors.titleInsuranceFee = 'Title insurance fee cannot be negative';
  }
  if (inputs.titleInsuranceFee > 10000) {
    errors.titleInsuranceFee = 'Title insurance fee cannot exceed $10,000';
  }

  if (inputs.recordingFee < 0) {
    errors.recordingFee = 'Recording fee cannot be negative';
  }
  if (inputs.recordingFee > 2000) {
    errors.recordingFee = 'Recording fee cannot exceed $2,000';
  }

  if (inputs.attorneyFee < 0) {
    errors.attorneyFee = 'Attorney fee cannot be negative';
  }
  if (inputs.attorneyFee > 5000) {
    errors.attorneyFee = 'Attorney fee cannot exceed $5,000';
  }

  if (inputs.otherFees < 0) {
    errors.otherFees = 'Other fees cannot be negative';
  }
  if (inputs.otherFees > 10000) {
    errors.otherFees = 'Other fees cannot exceed $10,000';
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.marketLocation = 'Market location is required';
  }

  if (!['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.marketCondition = 'Invalid market condition';
  }

  if (inputs.marketGrowthRate < -20) {
    errors.marketGrowthRate = 'Market growth rate cannot be less than -20%';
  }
  if (inputs.marketGrowthRate > 50) {
    errors.marketGrowthRate = 'Market growth rate cannot exceed 50%';
  }

  if (inputs.propertyAppreciationRate < -20) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot be less than -20%';
  }
  if (inputs.propertyAppreciationRate > 50) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot exceed 50%';
  }

  if (inputs.rentGrowthRate < -20) {
    errors.rentGrowthRate = 'Rent growth rate cannot be less than -20%';
  }
  if (inputs.rentGrowthRate > 50) {
    errors.rentGrowthRate = 'Rent growth rate cannot exceed 50%';
  }

  // Borrower Information Validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income must be greater than 0';
  }
  if (inputs.borrowerIncome > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10,000,000';
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.borrowerCreditScore = 'Borrower credit score must be at least 300';
  }
  if (inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Borrower credit score cannot exceed 850';
  }

  if (inputs.borrowerDebtToIncomeRatio < 0) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot be negative';
  }
  if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot exceed 100%';
  }

  if (!['employed', 'self_employed', 'retired', 'business_owner'].includes(inputs.borrowerEmploymentType)) {
    errors.borrowerEmploymentType = 'Invalid employment type';
  }

  if (inputs.borrowerTaxRate < 0) {
    errors.borrowerTaxRate = 'Tax rate cannot be negative';
  }
  if (inputs.borrowerTaxRate > 50) {
    errors.borrowerTaxRate = 'Tax rate cannot exceed 50%';
  }

  // Investment Assumptions Validation
  if (inputs.investmentReturnRate < -20) {
    errors.investmentReturnRate = 'Investment return rate cannot be less than -20%';
  }
  if (inputs.investmentReturnRate > 50) {
    errors.investmentReturnRate = 'Investment return rate cannot exceed 50%';
  }

  if (inputs.inflationRate < -10) {
    errors.inflationRate = 'Inflation rate cannot be less than -10%';
  }
  if (inputs.inflationRate > 50) {
    errors.inflationRate = 'Inflation rate cannot exceed 50%';
  }

  if (inputs.discountRate < 0) {
    errors.discountRate = 'Discount rate cannot be negative';
  }
  if (inputs.discountRate > 50) {
    errors.discountRate = 'Discount rate cannot exceed 50%';
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  }
  if (inputs.analysisPeriod > 50) {
    errors.analysisPeriod = 'Analysis period cannot exceed 50 years';
  }

  // Lifestyle Factors Validation
  if (!inputs.expectedStayDuration || inputs.expectedStayDuration <= 0) {
    errors.expectedStayDuration = 'Expected stay duration must be greater than 0';
  }
  if (inputs.expectedStayDuration > 50) {
    errors.expectedStayDuration = 'Expected stay duration cannot exceed 50 years';
  }

  if (!['low', 'medium', 'high'].includes(inputs.maintenancePreference)) {
    errors.maintenancePreference = 'Invalid maintenance preference';
  }

  if (!['stable', 'moderate', 'unstable'].includes(inputs.locationStability)) {
    errors.locationStability = 'Invalid location stability';
  }

  // Reporting Preferences Validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be a boolean';
  }

  // Business Logic Validations
  if (inputs.loanAmount + inputs.downPayment > inputs.propertyValue) {
    errors.loanAmount = 'Loan amount plus down payment cannot exceed property value';
  }

  if (inputs.downPaymentPercentage > 0 && inputs.downPayment === 0) {
    errors.downPayment = 'Down payment amount must be provided when percentage is specified';
  }

  if (inputs.downPayment > 0 && inputs.downPaymentPercentage === 0) {
    errors.downPaymentPercentage = 'Down payment percentage must be calculated';
  }

  if (inputs.monthlyRent * 12 !== inputs.annualRent) {
    errors.annualRent = 'Annual rent should equal monthly rent times 12';
  }

  if (inputs.rentEscalationClause && inputs.rentEscalationRate === 0) {
    errors.rentEscalationRate = 'Rent escalation rate must be specified when escalation clause is enabled';
  }

  if (inputs.rentIncludesUtilities && inputs.utilityCosts > 0) {
    errors.utilityCosts = 'Utility costs should be 0 when rent includes utilities';
  }

  if (inputs.analysisPeriod < inputs.expectedStayDuration) {
    errors.analysisPeriod = 'Analysis period should be at least as long as expected stay duration';
  }

  if (inputs.borrowerDebtToIncomeRatio > 50 && inputs.loanAmount > inputs.borrowerIncome * 3) {
    errors.loanAmount = 'Loan amount may be too high for current debt-to-income ratio';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateMortgageVsRentOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core metrics
  if (typeof outputs.recommendation !== 'string') {
    errors.recommendation = 'Recommendation must be a string';
  }

  if (typeof outputs.monthlyCostDifference !== 'number') {
    errors.monthlyCostDifference = 'Monthly cost difference must be a number';
  }

  if (typeof outputs.breakEvenMonths !== 'number' || outputs.breakEvenMonths < 0) {
    errors.breakEvenMonths = 'Break-even months must be a non-negative number';
  }

  if (typeof outputs.totalCostDifference !== 'number') {
    errors.totalCostDifference = 'Total cost difference must be a number';
  }

  if (typeof outputs.equityBuildUp !== 'number') {
    errors.equityBuildUp = 'Equity build-up must be a number';
  }

  if (typeof outputs.opportunityCost !== 'number') {
    errors.opportunityCost = 'Opportunity cost must be a number';
  }

  if (typeof outputs.riskScore !== 'number' || outputs.riskScore < 0 || outputs.riskScore > 100) {
    errors.riskScore = 'Risk score must be a number between 0 and 100';
  }

  if (typeof outputs.probabilityOfBenefit !== 'number' || outputs.probabilityOfBenefit < 0 || outputs.probabilityOfBenefit > 100) {
    errors.probabilityOfBenefit = 'Probability of benefit must be a number between 0 and 100';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.recommendation) {
      errors.analysis = 'Analysis recommendation is required';
    }
    if (!outputs.analysis.valueRating) {
      errors.analysis = 'Analysis value rating is required';
    }
    if (!outputs.analysis.confidenceRating) {
      errors.analysis = 'Analysis confidence rating is required';
    }
  }

  // Validate arrays
  if (!Array.isArray(outputs.sensitivityMatrix)) {
    errors.sensitivityMatrix = 'Sensitivity matrix must be an array';
  }

  if (!Array.isArray(outputs.scenarios)) {
    errors.scenarios = 'Scenarios must be an array';
  }

  if (!Array.isArray(outputs.timelineAnalysis)) {
    errors.timelineAnalysis = 'Timeline analysis must be an array';
  }

  if (!Array.isArray(outputs.comparisonAnalysis)) {
    errors.comparisonAnalysis = 'Comparison analysis must be an array';
  }

  if (!Array.isArray(outputs.marketAnalysis)) {
    errors.marketAnalysis = 'Market analysis must be an array';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}