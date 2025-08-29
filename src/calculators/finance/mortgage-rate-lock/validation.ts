import { MortgageRateLockInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateMortgageRateLockInputs(inputs: MortgageRateLockInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Loan Information validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  } else if (inputs.loanAmount > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000';
  }

  if (!inputs.lockedRate || inputs.lockedRate <= 0) {
    errors.lockedRate = 'Locked rate must be greater than 0';
  } else if (inputs.lockedRate > 25) {
    errors.lockedRate = 'Locked rate cannot exceed 25%';
  }

  if (!inputs.currentMarketRate || inputs.currentMarketRate <= 0) {
    errors.currentMarketRate = 'Current market rate must be greater than 0';
  } else if (inputs.currentMarketRate > 25) {
    errors.currentMarketRate = 'Current market rate cannot exceed 25%';
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

  // Rate Lock Information validation
  if (!inputs.lockDate) {
    errors.lockDate = 'Lock date is required';
  } else {
    const lockDate = new Date(inputs.lockDate);
    if (isNaN(lockDate.getTime())) {
      errors.lockDate = 'Invalid lock date format';
    }
  }

  if (!inputs.lockExpirationDate) {
    errors.lockExpirationDate = 'Lock expiration date is required';
  } else {
    const expirationDate = new Date(inputs.lockExpirationDate);
    if (isNaN(expirationDate.getTime())) {
      errors.lockExpirationDate = 'Invalid expiration date format';
    }
  }

  if (inputs.lockDuration <= 0) {
    errors.lockDuration = 'Lock duration must be greater than 0';
  } else if (inputs.lockDuration > 365) {
    errors.lockDuration = 'Lock duration cannot exceed 365 days';
  }

  const validLockTypes = ['free', 'paid', 'float_down', 'extended'];
  if (!validLockTypes.includes(inputs.lockType)) {
    errors.lockType = 'Invalid lock type';
  }

  if (inputs.lockFee < 0) {
    errors.lockFee = 'Lock fee cannot be negative';
  } else if (inputs.lockFee > 10000) {
    errors.lockFee = 'Lock fee cannot exceed $10,000';
  }

  const validLockFeeTypes = ['percentage', 'fixed', 'none'];
  if (!validLockFeeTypes.includes(inputs.lockFeeType)) {
    errors.lockFeeType = 'Invalid lock fee type';
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

  // Closing Information validation
  if (!inputs.estimatedClosingDate) {
    errors.estimatedClosingDate = 'Estimated closing date is required';
  } else {
    const estimatedClosing = new Date(inputs.estimatedClosingDate);
    if (isNaN(estimatedClosing.getTime())) {
      errors.estimatedClosingDate = 'Invalid estimated closing date format';
    }
  }

  if (inputs.actualClosingDate) {
    const actualClosing = new Date(inputs.actualClosingDate);
    if (isNaN(actualClosing.getTime())) {
      errors.actualClosingDate = 'Invalid actual closing date format';
    }
  }

  if (inputs.closingDelay < 0) {
    errors.closingDelay = 'Closing delay cannot be negative';
  } else if (inputs.closingDelay > 365) {
    errors.closingDelay = 'Closing delay cannot exceed 365 days';
  }

  if (inputs.extensionFee < 0) {
    errors.extensionFee = 'Extension fee cannot be negative';
  } else if (inputs.extensionFee > 10000) {
    errors.extensionFee = 'Extension fee cannot exceed $10,000';
  }

  const validExtensionFeeTypes = ['percentage', 'fixed', 'daily'];
  if (!validExtensionFeeTypes.includes(inputs.extensionFeeType)) {
    errors.extensionFeeType = 'Invalid extension fee type';
  }

  // Market Information validation
  if (typeof inputs.marketLocation !== 'string' || inputs.marketLocation.trim().length === 0) {
    errors.marketLocation = 'Market location must be a non-empty string';
  }

  const validMarketConditions = ['declining', 'stable', 'growing', 'volatile'];
  if (!validMarketConditions.includes(inputs.marketCondition)) {
    errors.marketCondition = 'Invalid market condition';
  }

  if (inputs.marketVolatility < 0) {
    errors.marketVolatility = 'Market volatility cannot be negative';
  } else if (inputs.marketVolatility > 100) {
    errors.marketVolatility = 'Market volatility cannot exceed 100%';
  }

  const validRateTrends = ['falling', 'stable', 'rising', 'volatile'];
  if (!validRateTrends.includes(inputs.rateTrend)) {
    errors.rateTrend = 'Invalid rate trend';
  }

  // Rate Forecast validation
  if (!Array.isArray(inputs.rateForecast)) {
    errors.rateForecast = 'Rate forecast must be an array';
  } else {
    inputs.rateForecast.forEach((forecast, index) => {
      if (!forecast.date) {
        errors[`rateForecast[${index}].date`] = 'Forecast date is required';
      } else {
        const forecastDate = new Date(forecast.date);
        if (isNaN(forecastDate.getTime())) {
          errors[`rateForecast[${index}].date`] = 'Invalid forecast date format';
        }
      }

      if (forecast.predictedRate <= 0) {
        errors[`rateForecast[${index}].predictedRate`] = 'Predicted rate must be greater than 0';
      } else if (forecast.predictedRate > 25) {
        errors[`rateForecast[${index}].predictedRate`] = 'Predicted rate cannot exceed 25%';
      }

      if (forecast.confidence < 0) {
        errors[`rateForecast[${index}].confidence`] = 'Confidence cannot be negative';
      } else if (forecast.confidence > 100) {
        errors[`rateForecast[${index}].confidence`] = 'Confidence cannot exceed 100%';
      }
    });
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

  // Risk Tolerance validation
  const validRiskTolerances = ['conservative', 'moderate', 'aggressive'];
  if (!validRiskTolerances.includes(inputs.riskTolerance)) {
    errors.riskTolerance = 'Invalid risk tolerance';
  }

  if (inputs.maxRateIncrease < 0) {
    errors.maxRateIncrease = 'Maximum rate increase cannot be negative';
  } else if (inputs.maxRateIncrease > 10) {
    errors.maxRateIncrease = 'Maximum rate increase cannot exceed 10%';
  }

  if (inputs.minRateDecrease < 0) {
    errors.minRateDecrease = 'Minimum rate decrease cannot be negative';
  } else if (inputs.minRateDecrease > 10) {
    errors.minRateDecrease = 'Minimum rate decrease cannot exceed 10%';
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
  // Lock expiration date should be after lock date
  if (inputs.lockDate && inputs.lockExpirationDate) {
    const lockDate = new Date(inputs.lockDate);
    const expirationDate = new Date(inputs.lockExpirationDate);
    if (expirationDate <= lockDate) {
      errors.lockExpirationDate = 'Lock expiration date must be after lock date';
    }
  }

  // Estimated closing date should be reasonable
  if (inputs.lockExpirationDate && inputs.estimatedClosingDate) {
    const expirationDate = new Date(inputs.lockExpirationDate);
    const estimatedClosing = new Date(inputs.estimatedClosingDate);
    const daysDifference = (estimatedClosing.getTime() - expirationDate.getTime()) / (1000 * 3600 * 24);
    if (daysDifference > 30) {
      errors.estimatedClosingDate = 'Estimated closing date should be within 30 days of lock expiration';
    }
  }

  // Lock fee should be reasonable for loan amount
  if (inputs.lockFeeType === 'percentage' && inputs.lockFee > 5) {
    errors.lockFee = 'Lock fee percentage should not exceed 5% of loan amount';
  }

  // Rate forecast dates should be in chronological order
  if (inputs.rateForecast && inputs.rateForecast.length > 1) {
    for (let i = 1; i < inputs.rateForecast.length; i++) {
      const prevDate = new Date(inputs.rateForecast[i - 1].date);
      const currDate = new Date(inputs.rateForecast[i].date);
      if (currDate <= prevDate) {
        errors[`rateForecast[${i}].date`] = 'Rate forecast dates must be in chronological order';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validateMortgageRateLockOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core metrics
  if (typeof outputs.rateDifference !== 'number') {
    errors.rateDifference = 'Rate difference must be a number';
  }

  if (!outputs.rateSavings || outputs.rateSavings < 0) {
    errors.rateSavings = 'Rate savings must be non-negative';
  }

  if (typeof outputs.paymentDifference !== 'number') {
    errors.paymentDifference = 'Payment difference must be a number';
  }

  if (!outputs.paymentSavings || outputs.paymentSavings < 0) {
    errors.paymentSavings = 'Payment savings must be non-negative';
  }

  if (!outputs.lockValue || outputs.lockValue < 0) {
    errors.lockValue = 'Lock value must be non-negative';
  }

  if (!outputs.riskScore || outputs.riskScore < 0) {
    errors.riskScore = 'Risk score must be non-negative';
  } else if (outputs.riskScore > 100) {
    errors.riskScore = 'Risk score cannot exceed 100';
  }

  if (!outputs.lockRemainingDays || outputs.lockRemainingDays < 0) {
    errors.lockRemainingDays = 'Lock remaining days must be non-negative';
  }

  if (!outputs.breakEvenPoint || outputs.breakEvenPoint < 0) {
    errors.breakEvenPoint = 'Break-even point must be non-negative';
  }

  // Validate analysis object
  if (!outputs.analysis) {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.lockRating) {
      errors.lockRating = 'Lock rating is required';
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