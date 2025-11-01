import { MortgageRateLockInputs } from './types';

export function validateMortgageRateLockInputs(inputs: MortgageRateLockInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Interest Rates Validation
  if (inputs.lockedInterestRate < 0) {
    errors.push({ field: 'lockedInterestRate', message: 'Locked interest rate cannot be negative' });
  }
  if (inputs.lockedInterestRate > 30) {
    errors.push({ field: 'lockedInterestRate', message: 'Locked interest rate cannot exceed 30%' });
  }

  if (inputs.currentMarketRate < 0) {
    errors.push({ field: 'currentMarketRate', message: 'Current market rate cannot be negative' });
  }
  if (inputs.currentMarketRate > 30) {
    errors.push({ field: 'currentMarketRate', message: 'Current market rate cannot exceed 30%' });
  }

  // Lock Period Validation
  if (!inputs.lockPeriod || inputs.lockPeriod <= 0) {
    errors.push({ field: 'lockPeriod', message: 'Lock period must be greater than 0 days' });
  }
  if (inputs.lockPeriod > 180) {
    errors.push({ field: 'lockPeriod', message: 'Lock period cannot exceed 180 days' });
  }

  // Dates Validation
  if (!inputs.lockExpirationDate) {
    errors.push({ field: 'lockExpirationDate', message: 'Lock expiration date is required' });
  } else {
    const expirationDate = new Date(inputs.lockExpirationDate);
    const today = new Date();
    if (expirationDate <= today) {
      errors.push({ field: 'lockExpirationDate', message: 'Lock expiration date must be in the future' });
    }
  }

  if (!inputs.estimatedClosingDate) {
    errors.push({ field: 'estimatedClosingDate', message: 'Estimated closing date is required' });
  } else {
    const closingDate = new Date(inputs.estimatedClosingDate);
    const today = new Date();
    if (closingDate <= today) {
      errors.push({ field: 'estimatedClosingDate', message: 'Estimated closing date must be in the future' });
    }
  }

  // Rate Adjustment Caps Validation
  if (inputs.rateAdjustmentCaps.initial < 0) {
    errors.push({ field: 'rateAdjustmentCaps.initial', message: 'Initial rate adjustment cap cannot be negative' });
  }
  if (inputs.rateAdjustmentCaps.periodic < 0) {
    errors.push({ field: 'rateAdjustmentCaps.periodic', message: 'Periodic rate adjustment cap cannot be negative' });
  }
  if (inputs.rateAdjustmentCaps.lifetime < 0) {
    errors.push({ field: 'rateAdjustmentCaps.lifetime', message: 'Lifetime rate adjustment cap cannot be negative' });
  }

  // Costs Validation
  if (inputs.rateLockCost < 0) {
    errors.push({ field: 'rateLockCost', message: 'Rate lock cost cannot be negative' });
  }

  if (inputs.lenderCredit < 0) {
    errors.push({ field: 'lenderCredit', message: 'Lender credit cannot be negative' });
  }

  // Float Down Validation
  if (inputs.floatDownOption && inputs.floatDownRate < 0) {
    errors.push({ field: 'floatDownRate', message: 'Float down rate cannot be negative' });
  }

  // Expected Rate Movement Validation
  if (Math.abs(inputs.expectedRateMovement) > 500) {
    errors.push({ field: 'expectedRateMovement', message: 'Expected rate movement cannot exceed 500 basis points' });
  }

  // Confidence Level Validation
  if (inputs.confidenceLevel < 0 || inputs.confidenceLevel > 100) {
    errors.push({ field: 'confidenceLevel', message: 'Confidence level must be between 0 and 100' });
  }

  // Alternative Lock Periods Validation
  if (inputs.alternativeRateLockPeriods.length > 0) {
    inputs.alternativeRateLockPeriods.forEach((period, index) => {
      if (period <= 0) {
        errors.push({ field: 'alternativeRateLockPeriods', message: `Alternative lock period ${index + 1} must be greater than 0` });
      }
      if (period > 180) {
        errors.push({ field: 'alternativeRateLockPeriods', message: `Alternative lock period ${index + 1} cannot exceed 180 days` });
      }
    });
  }

  // Historical Rate Data Validation
  if (inputs.historicalRateData.averageMovement < -200 || inputs.historicalRateData.averageMovement > 200) {
    errors.push({ field: 'historicalRateData.averageMovement', message: 'Average movement must be between -200 and 200 basis points per day' });
  }

  if (inputs.historicalRateData.volatilityIndex < 0 || inputs.historicalRateData.volatilityIndex > 100) {
    errors.push({ field: 'historicalRateData.volatilityIndex', message: 'Volatility index must be between 0 and 100' });
  }

  return errors;
}

export function validateMortgageRateLockBusinessRules(inputs: MortgageRateLockInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Lock Expiration Warnings
  const daysRemaining = Math.ceil((new Date(inputs.lockExpirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (daysRemaining < 30) {
    warnings.push({ field: 'lockExpirationDate', message: 'Rate lock expires soon - consider extending' });
  }

  // Rate Lock Cost Warnings
  const netCost = inputs.rateLockCost - inputs.lenderCredit;
  if (netCost > inputs.loanAmount * 0.005) { // More than 0.5% of loan amount
    warnings.push({ field: 'rateLockCost', message: 'Rate lock cost is relatively high - shop around for better terms' });
  }

  // Market Rate Comparison Warnings
  const rateDifference = inputs.currentMarketRate - inputs.lockedInterestRate;
  if (rateDifference > 1.0) { // Locked rate is more than 1% better than current market
    warnings.push({ field: 'lockedInterestRate', message: 'Locked rate is significantly better than current market - excellent timing!' });
  } else if (rateDifference < -0.5) { // Locked rate is worse than current market
    warnings.push({ field: 'lockedInterestRate', message: 'Current market rates are better than locked rate - consider float down option' });
  }

  // High Volatility Warnings
  if (inputs.marketVolatility === 'High') {
    warnings.push({ field: 'marketVolatility', message: 'High market volatility increases risk - rate lock provides valuable protection' });
  }

  // Expected Rate Movement Warnings
  if (Math.abs(inputs.expectedRateMovement) > 100) {
    warnings.push({ field: 'expectedRateMovement', message: 'Large expected rate movement increases uncertainty' });
  }

  // Historical Data Warnings
  if (inputs.historicalRateData.volatilityIndex > 70) {
    warnings.push({ field: 'historicalRateData', message: 'High historical volatility suggests rate lock is particularly valuable' });
  }

  // Float Down Option Warnings
  if (inputs.floatDownOption && inputs.floatDownRate >= inputs.lockedInterestRate) {
    warnings.push({ field: 'floatDownRate', message: 'Float down rate should be lower than locked rate to be beneficial' });
  }

  // Closing Timeline Warnings
  const closingDays = Math.ceil((new Date(inputs.estimatedClosingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (closingDays > daysRemaining) {
    warnings.push({ field: 'estimatedClosingDate', message: 'Estimated closing date is after lock expiration - extend lock or adjust timeline' });
  }

  // Rate Adjustment Caps Warnings
  if (inputs.rateAdjustmentCaps.lifetime < 200) { // Less than 2%
    warnings.push({ field: 'rateAdjustmentCaps', message: 'Low lifetime cap may limit future adjustments' });
  }

  // Confidence Level Warnings
  if (inputs.confidenceLevel < 30) {
    warnings.push({ field: 'confidenceLevel', message: 'Low confidence in rate movement suggests more caution needed' });
  }

  // Alternative Periods Warnings
  if (inputs.alternativeRateLockPeriods.length === 0) {
    warnings.push({ field: 'alternativeRateLockPeriods', message: 'Consider comparing different lock periods for cost savings' });
  }

  return warnings;
}