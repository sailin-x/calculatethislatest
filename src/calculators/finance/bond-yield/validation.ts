import { BondYieldInputs } from './types';

export function validateBondYieldInputs(inputs: BondYieldInputs): Array<{ field: string; message: string }> {
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

  // Current Price Validation
  if (!inputs.currentPrice || inputs.currentPrice <= 0) {
    errors.push({ field: 'currentPrice', message: 'Current price must be a positive number' });
  }
  if (inputs.currentPrice > inputs.faceValue * 2) {
    errors.push({ field: 'currentPrice', message: 'Current price seems unreasonably high' });
  }

  // Coupon Frequency Validation
  if (!inputs.couponFrequency || ![1, 2, 4, 12].includes(inputs.couponFrequency)) {
    errors.push({ field: 'couponFrequency', message: 'Coupon frequency must be 1, 2, 4, or 12 payments per year' });
  }

  // Date Validation (if provided)
  if (inputs.settlementDate) {
    const settlementDate = new Date(inputs.settlementDate);
    if (isNaN(settlementDate.getTime())) {
      errors.push({ field: 'settlementDate', message: 'Settlement date must be a valid date' });
    }
  }

  if (inputs.maturityDate) {
    const maturityDate = new Date(inputs.maturityDate);
    if (isNaN(maturityDate.getTime())) {
      errors.push({ field: 'maturityDate', message: 'Maturity date must be a valid date' });
    }
    if (inputs.settlementDate) {
      const settlementDate = new Date(inputs.settlementDate);
      const maturityDateObj = new Date(inputs.maturityDate);
      if (maturityDateObj <= settlementDate) {
        errors.push({ field: 'maturityDate', message: 'Maturity date must be after settlement date' });
      }
    }
  }

  return errors;
}

export function validateBondYieldBusinessRules(inputs: BondYieldInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Price vs Face Value Warnings
  if (inputs.currentPrice > inputs.faceValue * 1.1) {
    warnings.push({ field: 'currentPrice', message: 'Bond is trading at a significant premium to face value' });
  } else if (inputs.currentPrice < inputs.faceValue * 0.9) {
    warnings.push({ field: 'currentPrice', message: 'Bond is trading at a significant discount to face value' });
  }

  // Maturity Warnings
  if (inputs.yearsToMaturity < 1) {
    warnings.push({ field: 'yearsToMaturity', message: 'Very short maturity may have limited yield characteristics' });
  }
  if (inputs.yearsToMaturity > 30) {
    warnings.push({ field: 'yearsToMaturity', message: 'Long maturity increases interest rate risk significantly' });
  }

  // Coupon Rate Warnings
  if (inputs.couponRate === 0) {
    warnings.push({ field: 'couponRate', message: 'Zero coupon bonds have different yield characteristics' });
  }
  if (inputs.couponRate > 15) {
    warnings.push({ field: 'couponRate', message: 'Very high coupon rate may indicate higher credit risk' });
  }

  // Price Warnings
  if (inputs.currentPrice < inputs.faceValue * 0.5) {
    warnings.push({ field: 'currentPrice', message: 'Extremely low price may indicate distressed security' });
  }

  // Frequency Warnings
  if (inputs.couponFrequency === 12) {
    warnings.push({ field: 'couponFrequency', message: 'Monthly payments may complicate yield calculations' });
  }

  return warnings;
}