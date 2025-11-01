import { BondConvexityInputs } from './types';

export function validateBondConvexityInputs(inputs: BondConvexityInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Face Value Validation
  if (!inputs.faceValue || inputs.faceValue <= 0) {
    errors.push({ field: 'faceValue', message: 'Face value must be a positive number' });
  }
  if (inputs.faceValue > 10000000) {
    errors.push({ field: 'faceValue', message: 'Face value cannot exceed $10,000,000' });
  }

  // Coupon Rate Validation
  if (inputs.couponRate < 0 || inputs.couponRate > 50) {
    errors.push({ field: 'couponRate', message: 'Coupon rate must be between 0% and 50%' });
  }

  // Years to Maturity Validation
  if (!inputs.yearsToMaturity || inputs.yearsToMaturity <= 0) {
    errors.push({ field: 'yearsToMaturity', message: 'Years to maturity must be a positive number' });
  }
  if (inputs.yearsToMaturity > 100) {
    errors.push({ field: 'yearsToMaturity', message: 'Years to maturity cannot exceed 100 years' });
  }

  // Yield to Maturity Validation
  if (inputs.yieldToMaturity <= 0 || inputs.yieldToMaturity > 50) {
    errors.push({ field: 'yieldToMaturity', message: 'Yield to maturity must be between 0% and 50%' });
  }

  // Coupon Frequency Validation
  if (!inputs.couponFrequency || ![1, 2, 4, 12].includes(inputs.couponFrequency)) {
    errors.push({ field: 'couponFrequency', message: 'Coupon frequency must be 1, 2, 4, or 12 payments per year' });
  }

  // Current Price Validation (if provided)
  if (inputs.currentPrice !== undefined) {
    if (inputs.currentPrice <= 0) {
      errors.push({ field: 'currentPrice', message: 'Current price must be a positive number' });
    }
    if (inputs.currentPrice > inputs.faceValue * 2) {
      errors.push({ field: 'currentPrice', message: 'Current price seems unreasonably high' });
    }
  }

  return errors;
}

export function validateBondConvexityBusinessRules(inputs: BondConvexityInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Maturity Warnings
  if (inputs.yearsToMaturity < 1) {
    warnings.push({ field: 'yearsToMaturity', message: 'Very short maturity may have limited convexity effects' });
  }
  if (inputs.yearsToMaturity > 30) {
    warnings.push({ field: 'yearsToMaturity', message: 'Long maturity increases interest rate risk significantly' });
  }

  // Yield Warnings
  if (inputs.yieldToMaturity < 1) {
    warnings.push({ field: 'yieldToMaturity', message: 'Very low yield may indicate special circumstances' });
  }
  if (inputs.yieldToMaturity > 20) {
    warnings.push({ field: 'yieldToMaturity', message: 'Very high yield may indicate high risk or distressed security' });
  }

  // Coupon Rate vs Yield Warnings
  if (inputs.couponRate > inputs.yieldToMaturity + 5) {
    warnings.push({ field: 'couponRate', message: 'High coupon relative to yield suggests premium pricing' });
  }
  if (inputs.couponRate < inputs.yieldToMaturity - 5) {
    warnings.push({ field: 'couponRate', message: 'Low coupon relative to yield suggests discount pricing' });
  }

  // Zero Coupon Bond Warning
  if (inputs.couponRate === 0) {
    warnings.push({ field: 'couponRate', message: 'Zero coupon bonds have different convexity characteristics' });
  }

  return warnings;
}