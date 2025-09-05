import { LoanToValueInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateLoanToValueInputs(inputs: LoanToValueInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (!inputs.interestRate || inputs.interestRate <= 0 || inputs.interestRate > 1) {
    errors.push('Interest rate must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim() === '') {
    errors.push('Property address is required');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (!inputs.propertyAge || inputs.propertyAge < 0) {
    errors.push('Property age must be non-negative');
  }

  // Valuation validations
  if (!inputs.appraisalValue || inputs.appraisalValue <= 0) {
    errors.push('Appraisal value must be greater than 0');
  }

  if (!inputs.marketValue || inputs.marketValue <= 0) {
    errors.push('Market value must be greater than 0');
  }

  if (!inputs.assessedValue || inputs.assessedValue <= 0) {
    errors.push('Assessed value must be greater than 0');
  }

  if (!inputs.purchasePrice || inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  }

  // Down payment validations
  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.push('Down payment must be non-negative');
  }

  if (!inputs.downPaymentPercentage || inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 1) {
    errors.push('Down payment percentage must be between 0 and 1 (0% to 100%)');
  }

  // Borrower validations
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (!inputs.borrowerDebtToIncomeRatio || inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 1) {
    errors.push('Borrower debt-to-income ratio must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.borrowerAssets || inputs.borrowerAssets < 0) {
    errors.push('Borrower assets must be non-negative');
  }

  if (!inputs.borrowerLiquidity || inputs.borrowerLiquidity < 0) {
    errors.push('Borrower liquidity must be non-negative');
  }

  // Insurance and tax validations
  if (!inputs.propertyInsurance || inputs.propertyInsurance < 0) {
    errors.push('Property insurance must be non-negative');
  }

  if (!inputs.propertyTaxes || inputs.propertyTaxes < 0) {
    errors.push('Property taxes must be non-negative');
  }

  if (!inputs.hoaFees || inputs.hoaFees < 0) {
    errors.push('HOA fees must be non-negative');
  }

  if (!inputs.floodInsurance || inputs.floodInsurance < 0) {
    errors.push('Flood insurance must be non-negative');
  }

  // Market validations
  if (!inputs.marketLocation || inputs.marketLocation.trim() === '') {
    errors.push('Market location is required');
  }

  if (!inputs.marketGrowthRate || inputs.marketGrowthRate < -1 || inputs.marketGrowthRate > 1) {
    errors.push('Market growth rate must be between -100% and 100%');
  }

  if (!inputs.daysOnMarket || inputs.daysOnMarket < 0) {
    errors.push('Days on market must be non-negative');
  }

  // Loan program validations
  if (!inputs.maxLtvRatio || inputs.maxLtvRatio <= 0 || inputs.maxLtvRatio > 1) {
    errors.push('Maximum LTV ratio must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.minDownPayment || inputs.minDownPayment < 0 || inputs.minDownPayment > 1) {
    errors.push('Minimum down payment must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.pmiRate || inputs.pmiRate < 0 || inputs.pmiRate > 1) {
    errors.push('PMI rate must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.pmiThreshold || inputs.pmiThreshold <= 0 || inputs.pmiThreshold > 1) {
    errors.push('PMI threshold must be between 0 and 1 (0% to 100%)');
  }

  // Analysis parameters validations
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (!inputs.inflationRate || inputs.inflationRate < -1 || inputs.inflationRate > 1) {
    errors.push('Inflation rate must be between -100% and 100%');
  }

  if (!inputs.propertyAppreciationRate || inputs.propertyAppreciationRate < -1 || inputs.propertyAppreciationRate > 1) {
    errors.push('Property appreciation rate must be between -100% and 100%');
  }

  if (!inputs.discountRate || inputs.discountRate < 0 || inputs.discountRate > 1) {
    errors.push('Discount rate must be between 0 and 1 (0% to 100%)');
  }

  // Enum validations
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.push(`Loan type must be one of: ${validLoanTypes.join(', ')}`);
  }

  const validPaymentTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validPaymentTypes.includes(inputs.paymentType)) {
    errors.push(`Payment type must be one of: ${validPaymentTypes.join(', ')}`);
  }

  const validPropertyTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'land', 'mixed_use'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.push(`Property type must be one of: ${validPropertyTypes.join(', ')}`);
  }

  const validPropertyConditions = ['excellent', 'good', 'average', 'poor', 'needs_repair'];
  if (!validPropertyConditions.includes(inputs.propertyCondition)) {
    errors.push(`Property condition must be one of: ${validPropertyConditions.join(', ')}`);
  }

  const validDownPaymentSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!validDownPaymentSources.includes(inputs.downPaymentSource)) {
    errors.push(`Down payment source must be one of: ${validDownPaymentSources.join(', ')}`);
  }

  const validEmploymentTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validEmploymentTypes.includes(inputs.borrowerEmploymentType)) {
    errors.push(`Borrower employment type must be one of: ${validEmploymentTypes.join(', ')}`);
  }

  const validMarketConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validMarketConditions.includes(inputs.marketCondition)) {
    errors.push(`Market condition must be one of: ${validMarketConditions.join(', ')}`);
  }

  const validRiskLevels = ['low', 'medium', 'high'];
  if (!validRiskLevels.includes(inputs.marketRisk)) {
    errors.push(`Market risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  if (!validRiskLevels.includes(inputs.propertyRisk)) {
    errors.push(`Property risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  if (!validRiskLevels.includes(inputs.borrowerRisk)) {
    errors.push(`Borrower risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  if (!validRiskLevels.includes(inputs.loanRisk)) {
    errors.push(`Loan risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(inputs.currency)) {
    errors.push(`Currency must be one of: ${validCurrencies.join(', ')}`);
  }

  const validDisplayFormats = ['percentage', 'decimal', 'currency'];
  if (!validDisplayFormats.includes(inputs.displayFormat)) {
    errors.push(`Display format must be one of: ${validDisplayFormats.join(', ')}`);
  }

  // Business logic validations
  if (inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.downPayment + inputs.loanAmount !== inputs.purchasePrice) {
    errors.push('Down payment plus loan amount must equal purchase price');
  }

  if (inputs.downPaymentPercentage !== inputs.downPayment / inputs.purchasePrice) {
    errors.push('Down payment percentage must equal down payment divided by purchase price');
  }

  const ltvRatio = inputs.loanAmount / inputs.propertyValue;
  if (ltvRatio > inputs.maxLtvRatio) {
    errors.push('Loan-to-value ratio exceeds maximum allowed ratio');
  }

  if (inputs.downPaymentPercentage < inputs.minDownPayment) {
    errors.push('Down payment percentage is below minimum required');
  }

  // Valuation consistency checks
  if (inputs.appraisalValue < inputs.propertyValue * 0.8) {
    warnings.push('Appraisal value is significantly below property value');
  }

  if (inputs.appraisalValue > inputs.propertyValue * 1.2) {
    warnings.push('Appraisal value is significantly above property value');
  }

  if (inputs.marketValue < inputs.propertyValue * 0.8) {
    warnings.push('Market value is significantly below property value');
  }

  if (inputs.marketValue > inputs.propertyValue * 1.2) {
    warnings.push('Market value is significantly above property value');
  }

  // Risk assessment validations
  if (inputs.additionalCollateral < 0) {
    errors.push('Additional collateral must be non-negative');
  }

  // Analysis period validation
  if (inputs.analysisPeriod > 60) {
    warnings.push('Analysis period longer than 5 years may have reduced accuracy');
  }

  // Property age validation
  if (inputs.propertyAge > 100) {
    warnings.push('Property age seems unusually high');
  }

  // Property size validation
  if (inputs.propertySize > 100000) {
    warnings.push('Property size seems unusually large');
  }

  // Income validation
  if (inputs.borrowerIncome > 10000000) {
    warnings.push('Borrower income seems unusually high');
  }

  // Credit score validation
  if (inputs.borrowerCreditScore < 500) {
    warnings.push('Borrower credit score is very low');
  }

  // Debt-to-income ratio validation
  if (inputs.borrowerDebtToIncomeRatio > 0.6) {
    warnings.push('Borrower debt-to-income ratio is very high');
  }

  // Market growth rate validation
  if (inputs.marketGrowthRate > 0.2) {
    warnings.push('Market growth rate above 20% is unusually high');
  }

  if (inputs.marketGrowthRate < -0.2) {
    warnings.push('Market growth rate below -20% indicates severe market decline');
  }

  // Days on market validation
  if (inputs.daysOnMarket > 365) {
    warnings.push('Property has been on market for over a year');
  }

  // Interest rate validation
  if (inputs.interestRate > 0.15) {
    warnings.push('Interest rate above 15% is unusually high');
  }

  // Loan term validation
  if (inputs.loanTerm > 480) {
    warnings.push('Loan term longer than 40 years is unusual');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}