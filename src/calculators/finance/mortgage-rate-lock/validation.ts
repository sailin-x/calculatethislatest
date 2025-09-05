import { MortgageRateLockInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMortgageRateLockInputs(inputs: MortgageRateLockInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan Information Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  } else if (inputs.loanAmount < 50000) {
    warnings.push('Loan amount is below typical minimum thresholds');
  } else if (inputs.loanAmount > 10000000) {
    warnings.push('Loan amount exceeds typical maximum thresholds');
  }

  if (!inputs.lockedRate || inputs.lockedRate < 0 || inputs.lockedRate > 50) {
    errors.push('Locked rate must be between 0% and 50%');
  }

  if (!inputs.currentMarketRate || inputs.currentMarketRate < 0 || inputs.currentMarketRate > 50) {
    errors.push('Current market rate must be between 0% and 50%');
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'].includes(inputs.loanType)) {
    errors.push('Invalid loan type');
  }

  if (!inputs.paymentType || !['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.paymentType)) {
    errors.push('Invalid payment type');
  }

  // Rate Lock Information Validation
  if (!inputs.lockDate) {
    errors.push('Lock date is required');
  } else {
    const lockDate = new Date(inputs.lockDate);
    const today = new Date();
    if (lockDate > today) {
      warnings.push('Lock date is in the future');
    }
  }

  if (!inputs.lockExpirationDate) {
    errors.push('Lock expiration date is required');
  } else {
    const expirationDate = new Date(inputs.lockExpirationDate);
    const lockDate = new Date(inputs.lockDate);
    if (expirationDate <= lockDate) {
      errors.push('Lock expiration date must be after lock date');
    }
    
    const today = new Date();
    if (expirationDate < today) {
      warnings.push('Lock has already expired');
    }
  }

  if (!inputs.lockDuration || inputs.lockDuration < 1 || inputs.lockDuration > 365) {
    errors.push('Lock duration must be between 1 and 365 days');
  }

  if (!inputs.lockType || !['free', 'paid', 'float_down', 'extended'].includes(inputs.lockType)) {
    errors.push('Invalid lock type');
  }

  if (inputs.lockFee < 0) {
    errors.push('Lock fee cannot be negative');
  }

  if (!inputs.lockFeeType || !['percentage', 'fixed', 'none'].includes(inputs.lockFeeType)) {
    errors.push('Invalid lock fee type');
  }

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType || !['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'].includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }

  // Closing Information Validation
  if (!inputs.estimatedClosingDate) {
    errors.push('Estimated closing date is required');
  } else {
    const closingDate = new Date(inputs.estimatedClosingDate);
    const expirationDate = new Date(inputs.lockExpirationDate);
    if (closingDate > expirationDate) {
      warnings.push('Estimated closing date is after lock expiration');
    }
  }

  if (inputs.actualClosingDate) {
    const actualClosing = new Date(inputs.actualClosingDate);
    const estimatedClosing = new Date(inputs.estimatedClosingDate);
    if (actualClosing < estimatedClosing) {
      warnings.push('Actual closing date is before estimated closing date');
    }
  }

  if (inputs.closingDelay < 0) {
    errors.push('Closing delay cannot be negative');
  }

  if (inputs.extensionFee < 0) {
    errors.push('Extension fee cannot be negative');
  }

  if (!inputs.extensionFeeType || !['percentage', 'fixed', 'daily'].includes(inputs.extensionFeeType)) {
    errors.push('Invalid extension fee type');
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.push('Market location is required');
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'volatile'].includes(inputs.marketCondition)) {
    errors.push('Invalid market condition');
  }

  if (inputs.marketVolatility < 0 || inputs.marketVolatility > 100) {
    errors.push('Market volatility must be between 0% and 100%');
  }

  if (!inputs.rateTrend || !['falling', 'stable', 'rising', 'volatile'].includes(inputs.rateTrend)) {
    errors.push('Invalid rate trend');
  }

  // Rate Forecast Validation
  if (inputs.rateForecast && inputs.rateForecast.length > 0) {
    inputs.rateForecast.forEach((forecast, index) => {
      if (!forecast.date) {
        errors.push(`Rate forecast ${index + 1}: Date is required`);
      }
      if (forecast.predictedRate < 0 || forecast.predictedRate > 50) {
        errors.push(`Rate forecast ${index + 1}: Predicted rate must be between 0% and 50%`);
      }
      if (forecast.confidence < 0 || forecast.confidence > 100) {
        errors.push(`Rate forecast ${index + 1}: Confidence must be between 0% and 100%`);
      }
    });
  }

  // Borrower Information Validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 100) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  if (!inputs.borrowerEmploymentType || !['employed', 'self_employed', 'retired', 'business_owner'].includes(inputs.borrowerEmploymentType)) {
    errors.push('Invalid employment type');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  if (inputs.inflationRate < 0 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between 0% and 20%');
  }

  if (inputs.propertyAppreciationRate < -50 || inputs.propertyAppreciationRate > 50) {
    errors.push('Property appreciation rate must be between -50% and 50%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 50) {
    errors.push('Discount rate must be between 0% and 50%');
  }

  // Risk Tolerance Validation
  if (!inputs.riskTolerance || !['conservative', 'moderate', 'aggressive'].includes(inputs.riskTolerance)) {
    errors.push('Invalid risk tolerance');
  }

  if (inputs.maxRateIncrease < 0 || inputs.maxRateIncrease > 10) {
    errors.push('Maximum rate increase must be between 0% and 10%');
  }

  if (inputs.minRateDecrease < 0 || inputs.minRateDecrease > 5) {
    errors.push('Minimum rate decrease must be between 0% and 5%');
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.push('Invalid currency');
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.push('Invalid display format');
  }

  // Cross-field validation
  if (inputs.loanAmount > inputs.propertyValue) {
    warnings.push('Loan amount exceeds property value (negative equity)');
  }

  const loanToValueRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (loanToValueRatio > 95) {
    warnings.push('Loan-to-value ratio is very high (>95%)');
  }

  if (inputs.borrowerDebtToIncomeRatio > 43) {
    warnings.push('Debt-to-income ratio exceeds typical qualification limits');
  }

  // Rate comparison validation
  const rateDifference = Math.abs(inputs.currentMarketRate - inputs.lockedRate);
  if (rateDifference > 2) {
    warnings.push('Large difference between locked rate and current market rate');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateRequiredFields(inputs: Partial<MortgageRateLockInputs>): string[] {
  const requiredFields = [
    'loanAmount',
    'lockedRate',
    'currentMarketRate',
    'loanTerm',
    'loanType',
    'paymentType',
    'lockDate',
    'lockExpirationDate',
    'lockDuration',
    'lockType',
    'propertyValue',
    'propertyAddress',
    'propertyType',
    'propertySize',
    'estimatedClosingDate',
    'marketLocation',
    'marketCondition',
    'borrowerIncome',
    'borrowerCreditScore',
    'borrowerDebtToIncomeRatio',
    'borrowerEmploymentType',
    'analysisPeriod',
    'riskTolerance',
    'currency',
    'displayFormat'
  ];

  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    if (inputs[field as keyof MortgageRateLockInputs] === undefined || 
        inputs[field as keyof MortgageRateLockInputs] === null ||
        inputs[field as keyof MortgageRateLockInputs] === '') {
      missingFields.push(field);
    }
  });

  return missingFields;
}

export function validateBusinessRules(inputs: MortgageRateLockInputs): string[] {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.loanType === 'jumbo' && inputs.loanAmount < 647200) {
    warnings.push('Loan amount may not qualify as jumbo loan');
  }

  if (inputs.loanType === 'fha' && inputs.loanAmount > 420680) {
    warnings.push('Loan amount may exceed FHA limits');
  }

  if (inputs.loanType === 'va' && inputs.borrowerDebtToIncomeRatio > 41) {
    warnings.push('Debt-to-income ratio may exceed VA loan guidelines');
  }

  if (inputs.lockType === 'paid' && inputs.lockFee === 0) {
    warnings.push('Paid lock type selected but no lock fee specified');
  }

  if (inputs.lockType === 'free' && inputs.lockFee > 0) {
    warnings.push('Free lock type selected but lock fee is specified');
  }

  const daysUntilExpiration = Math.ceil((new Date(inputs.lockExpirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilExpiration < 7) {
    warnings.push('Lock expires in less than 7 days');
  }

  if (inputs.closingDelay > daysUntilExpiration) {
    warnings.push('Closing delay exceeds lock expiration period');
  }

  return warnings;
}