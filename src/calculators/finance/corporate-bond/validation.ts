import { CorporateBondInputs } from './types';

export function validateCorporateBondInputs(inputs: CorporateBondInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Face Value Validation
  if (!inputs.faceValue || inputs.faceValue <= 0) {
    errors.push({ field: 'faceValue', message: 'Face value must be greater than 0' });
  }
  if (inputs.faceValue && inputs.faceValue > 10000000) {
    errors.push({ field: 'faceValue', message: 'Face value cannot exceed $10,000,000' });
  }

  // Coupon Rate Validation
  if (inputs.couponRate === null || inputs.couponRate === undefined || inputs.couponRate < 0) {
    errors.push({ field: 'couponRate', message: 'Coupon rate must be 0 or greater' });
  }
  if (inputs.couponRate && inputs.couponRate > 50) {
    errors.push({ field: 'couponRate', message: 'Coupon rate cannot exceed 50%' });
  }

  // Market Price Validation
  if (!inputs.marketPrice || inputs.marketPrice <= 0) {
    errors.push({ field: 'marketPrice', message: 'Market price must be greater than 0' });
  }
  if (inputs.marketPrice && inputs.marketPrice > inputs.faceValue * 2) {
    errors.push({ field: 'marketPrice', message: 'Market price seems unreasonably high' });
  }

  // Years to Maturity Validation
  if (!inputs.yearsToMaturity || inputs.yearsToMaturity <= 0) {
    errors.push({ field: 'yearsToMaturity', message: 'Years to maturity must be greater than 0' });
  }
  if (inputs.yearsToMaturity && inputs.yearsToMaturity > 100) {
    errors.push({ field: 'yearsToMaturity', message: 'Years to maturity cannot exceed 100 years' });
  }

  // Yield to Maturity Validation
  if (inputs.yieldToMaturity === null || inputs.yieldToMaturity === undefined || inputs.yieldToMaturity < 0) {
    errors.push({ field: 'yieldToMaturity', message: 'Yield to maturity must be 0 or greater' });
  }
  if (inputs.yieldToMaturity && inputs.yieldToMaturity > 50) {
    errors.push({ field: 'yieldToMaturity', message: 'Yield to maturity cannot exceed 50%' });
  }

  // Coupon Frequency Validation
  if (!inputs.couponFrequency || inputs.couponFrequency < 1) {
    errors.push({ field: 'couponFrequency', message: 'Coupon frequency must be at least 1' });
  }
  if (inputs.couponFrequency && inputs.couponFrequency > 12) {
    errors.push({ field: 'couponFrequency', message: 'Coupon frequency cannot exceed 12 payments per year' });
  }

  // Credit Rating Validation
  const validRatings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
  if (!inputs.creditRating || !validRatings.includes(inputs.creditRating.toUpperCase())) {
    errors.push({ field: 'creditRating', message: 'Credit rating must be a valid rating (AAA, AA, A, BBB, BB, B, CCC, CC, C, D)' });
  }

  // Tax Rate Validation
  if (inputs.taxRate === null || inputs.taxRate === undefined || inputs.taxRate < 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be 0 or greater' });
  }
  if (inputs.taxRate && inputs.taxRate > 100) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 100%' });
  }

  // Market Risk Premium Validation
  if (inputs.marketRiskPremium === null || inputs.marketRiskPremium === undefined || inputs.marketRiskPremium < 0) {
    errors.push({ field: 'marketRiskPremium', message: 'Market risk premium must be 0 or greater' });
  }
  if (inputs.marketRiskPremium && inputs.marketRiskPremium > 20) {
    errors.push({ field: 'marketRiskPremium', message: 'Market risk premium cannot exceed 20%' });
  }

  // Beta Validation
  if (inputs.beta === null || inputs.beta === undefined || inputs.beta < -5) {
    errors.push({ field: 'beta', message: 'Beta must be -5 or greater' });
  }
  if (inputs.beta && inputs.beta > 5) {
    errors.push({ field: 'beta', message: 'Beta cannot exceed 5' });
  }

  // Risk Free Rate Validation
  if (inputs.riskFreeRate === null || inputs.riskFreeRate === undefined || inputs.riskFreeRate < 0) {
    errors.push({ field: 'riskFreeRate', message: 'Risk free rate must be 0 or greater' });
  }
  if (inputs.riskFreeRate && inputs.riskFreeRate > 20) {
    errors.push({ field: 'riskFreeRate', message: 'Risk free rate cannot exceed 20%' });
  }

  // Cross-field validations
  if (inputs.marketPrice && inputs.faceValue && inputs.marketPrice > inputs.faceValue * 1.5) {
    errors.push({ field: 'marketPrice', message: 'Market price significantly above face value may indicate premium pricing' });
  }

  if (inputs.yieldToMaturity && inputs.couponRate && inputs.yieldToMaturity < inputs.couponRate - 10) {
    errors.push({ field: 'yieldToMaturity', message: 'YTM significantly below coupon rate may indicate premium bond' });
  }

  if (inputs.yieldToMaturity && inputs.couponRate && inputs.yieldToMaturity > inputs.couponRate + 10) {
    errors.push({ field: 'yieldToMaturity', message: 'YTM significantly above coupon rate may indicate discount bond' });
  }

  return errors;
}

export function validateCorporateBondBusinessRules(inputs: CorporateBondInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Investment Grade Warnings
  const investmentGrade = ['AAA', 'AA', 'A', 'BBB'].includes(inputs.creditRating.toUpperCase());
  if (!investmentGrade) {
    warnings.push({ field: 'creditRating', message: 'Non-investment grade bonds carry higher default risk' });
  }

  // High Yield Warnings
  if (inputs.yieldToMaturity && inputs.yieldToMaturity > 10) {
    warnings.push({ field: 'yieldToMaturity', message: 'High yield may indicate significant credit risk' });
  }

  // Long Maturity Warnings
  if (inputs.yearsToMaturity && inputs.yearsToMaturity > 30) {
    warnings.push({ field: 'yearsToMaturity', message: 'Long maturity bonds are more sensitive to interest rate changes' });
  }

  // Low Coupon Rate Warnings
  if (inputs.couponRate && inputs.couponRate < 2) {
    warnings.push({ field: 'couponRate', message: 'Low coupon bonds may have higher interest rate risk' });
  }

  // High Beta Warnings
  if (inputs.beta && inputs.beta > 1.5) {
    warnings.push({ field: 'beta', message: 'High beta indicates higher market risk sensitivity' });
  }

  // Negative Beta Warnings
  if (inputs.beta && inputs.beta < 0) {
    warnings.push({ field: 'beta', message: 'Negative beta may indicate defensive characteristics' });
  }

  // Tax Rate Warnings
  if (inputs.taxRate && inputs.taxRate > 40) {
    warnings.push({ field: 'taxRate', message: 'High tax rate significantly reduces after-tax yield' });
  }

  // Market Price vs Face Value Warnings
  if (inputs.marketPrice && inputs.faceValue) {
    const premium = (inputs.marketPrice - inputs.faceValue) / inputs.faceValue;
    if (premium > 0.2) {
      warnings.push({ field: 'marketPrice', message: 'Significant premium may indicate strong demand or low yields' });
    } else if (premium < -0.2) {
      warnings.push({ field: 'marketPrice', message: 'Significant discount may indicate credit concerns' });
    }
  }

  // YTM vs Risk Free Rate Warnings
  if (inputs.yieldToMaturity && inputs.riskFreeRate) {
    const spread = inputs.yieldToMaturity - inputs.riskFreeRate;
    if (spread < 0.5) {
      warnings.push({ field: 'yieldToMaturity', message: 'Tight credit spread may not compensate for credit risk' });
    }
  }

  // Maturity Mismatch Warnings
  if (inputs.yearsToMaturity && inputs.yearsToMaturity < 1) {
    warnings.push({ field: 'yearsToMaturity', message: 'Short maturity bonds have limited yield potential' });
  }

  return warnings;
}