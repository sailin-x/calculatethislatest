import { StructuredSettlementPayoutInputs } from './types';

export function validateStructuredSettlementPayoutInputs(inputs: StructuredSettlementPayoutInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Settlement Amount Validation
  if (!inputs.settlementAmount || inputs.settlementAmount <= 0) {
    errors.push({ field: 'settlementAmount', message: 'Settlement amount must be greater than 0' });
  }
  if (inputs.settlementAmount && inputs.settlementAmount > 100000000) {
    errors.push({ field: 'settlementAmount', message: 'Settlement amount cannot exceed $100,000,000' });
  }

  // Payout Period Validation
  if (!inputs.payoutPeriod || inputs.payoutPeriod < 1) {
    errors.push({ field: 'payoutPeriod', message: 'Payout period must be at least 1 year' });
  }
  if (inputs.payoutPeriod && inputs.payoutPeriod > 100) {
    errors.push({ field: 'payoutPeriod', message: 'Payout period cannot exceed 100 years' });
  }

  // Discount Rate Validation
  if (inputs.discountRate < 0 || inputs.discountRate > 25) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be between 0% and 25%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5 || inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Tax Rate Validation
  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0% and 50%' });
  }

  // Lump Sum Offer Validation
  if (inputs.lumpSumOffer && inputs.lumpSumOffer <= 0) {
    errors.push({ field: 'lumpSumOffer', message: 'Lump sum offer must be greater than 0' });
  }
  if (inputs.lumpSumOffer && inputs.settlementAmount && inputs.lumpSumOffer > inputs.settlementAmount) {
    errors.push({ field: 'lumpSumOffer', message: 'Lump sum offer cannot exceed settlement amount' });
  }

  // Current Age Validation
  if (!inputs.currentAge || inputs.currentAge < 0) {
    errors.push({ field: 'currentAge', message: 'Current age must be 0 or greater' });
  }
  if (inputs.currentAge && inputs.currentAge > 120) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 120' });
  }

  // Life Expectancy Validation
  if (!inputs.lifeExpectancy || inputs.lifeExpectancy < inputs.currentAge) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy must be greater than current age' });
  }
  if (inputs.lifeExpectancy && inputs.lifeExpectancy > 150) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy cannot exceed 150' });
  }

  // Investment Return Validation
  if (inputs.investmentReturn < -10 || inputs.investmentReturn > 50) {
    errors.push({ field: 'investmentReturn', message: 'Investment return must be between -10% and 50%' });
  }

  // Analysis Period Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period must be at least 1 year' });
  }
  if (inputs.analysisPeriod && inputs.analysisPeriod > 100) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period cannot exceed 100 years' });
  }

  return errors;
}

export function validateStructuredSettlementPayoutBusinessRules(inputs: StructuredSettlementPayoutInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Settlement Size Warnings
  if (inputs.settlementAmount > 10000000) {
    warnings.push({ field: 'settlementAmount', message: 'Large settlements may have different tax implications' });
  }

  // Payout Period Warnings
  if (inputs.payoutPeriod > 30) {
    warnings.push({ field: 'payoutPeriod', message: 'Long payout periods increase inflation risk' });
  }

  // Discount Rate Warnings
  if (inputs.discountRate > 10) {
    warnings.push({ field: 'discountRate', message: 'High discount rates heavily favor lump sum payments' });
  }

  // Age Warnings
  if (inputs.currentAge > 80) {
    warnings.push({ field: 'currentAge', message: 'Advanced age may favor lump sum to provide for beneficiaries' });
  }

  // Life Expectancy Warnings
  if (inputs.lifeExpectancy - inputs.currentAge < 10) {
    warnings.push({ field: 'lifeExpectancy', message: 'Short life expectancy may favor lump sum payment' });
  }

  // Tax Rate Warnings
  if (inputs.taxRate > 35) {
    warnings.push({ field: 'taxRate', message: 'High tax rates may favor structured settlements for tax deferral' });
  }

  // Lump Sum vs Structured Warnings
  if (inputs.lumpSumOffer && inputs.settlementAmount) {
    const lumpSumPercentage = (inputs.lumpSumOffer / inputs.settlementAmount) * 100;
    if (lumpSumPercentage < 50) {
      warnings.push({ field: 'lumpSumOffer', message: 'Very low lump sum offer may indicate structured settlement is better value' });
    }
  }

  // Risk Tolerance Warnings
  if (inputs.riskTolerance === 'high' && inputs.payoutPeriod > 20) {
    warnings.push({ field: 'riskTolerance', message: 'High risk tolerance with long payout period may favor lump sum investment' });
  }

  return warnings;
}