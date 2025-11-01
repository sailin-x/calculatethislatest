import { ViaticalSettlementInputs } from './types';

export function validateViaticalSettlementInputs(inputs: ViaticalSettlementInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Face Value Validation
  if (!inputs.faceValue || inputs.faceValue <= 0) {
    errors.push({ field: 'faceValue', message: 'Face value must be greater than 0' });
  }
  if (inputs.faceValue && inputs.faceValue > 10000000) {
    errors.push({ field: 'faceValue', message: 'Face value cannot exceed $10,000,000' });
  }

  // Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  // Life Expectancy Validation
  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= 0) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy must be greater than 0 months' });
  }
  if (inputs.lifeExpectancy && inputs.lifeExpectancy > 600) { // 50 years
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy cannot exceed 600 months (50 years)' });
  }

  // Health Condition Validation
  if (!inputs.healthCondition || !['terminal', 'critical', 'serious'].includes(inputs.healthCondition)) {
    errors.push({ field: 'healthCondition', message: 'Health condition must be terminal, critical, or serious' });
  }

  // Policy Type Validation
  if (!inputs.policyType || !['whole_life', 'universal', 'term'].includes(inputs.policyType)) {
    errors.push({ field: 'policyType', message: 'Policy type must be whole_life, universal, or term' });
  }

  // Premium Amount Validation
  if (!inputs.premiumAmount || inputs.premiumAmount < 0) {
    errors.push({ field: 'premiumAmount', message: 'Premium amount must be 0 or greater' });
  }
  if (inputs.premiumAmount && inputs.premiumAmount > 100000) {
    errors.push({ field: 'premiumAmount', message: 'Annual premium amount cannot exceed $100,000' });
  }

  // Years Owned Validation
  if (inputs.yearsOwned < 0) {
    errors.push({ field: 'yearsOwned', message: 'Years owned cannot be negative' });
  }
  if (inputs.yearsOwned > 50) {
    errors.push({ field: 'yearsOwned', message: 'Years owned cannot exceed 50' });
  }

  // Discount Rate Validation
  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be between 0% and 20%' });
  }

  // Settlement Fees Validation
  if (inputs.settlementFees < 0) {
    errors.push({ field: 'settlementFees', message: 'Settlement fees cannot be negative' });
  }
  if (inputs.settlementFees > 50000) {
    errors.push({ field: 'settlementFees', message: 'Settlement fees cannot exceed $50,000' });
  }

  // State Validation
  if (!inputs.state || inputs.state.length !== 2) {
    errors.push({ field: 'state', message: 'Please select a valid state' });
  }

  // Tax Bracket Validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be between 0% and 50%' });
  }

  return errors;
}

export function validateViaticalSettlementBusinessRules(inputs: ViaticalSettlementInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Life Expectancy Warnings
  if (inputs.lifeExpectancy > 120) { // 10 years
    warnings.push({ field: 'lifeExpectancy', message: 'Long life expectancy may reduce settlement value significantly' });
  }

  // Health Condition and Life Expectancy Mismatch
  if (inputs.healthCondition === 'terminal' && inputs.lifeExpectancy > 24) {
    warnings.push({ field: 'lifeExpectancy', message: 'Terminal condition with long life expectancy may not qualify for viatical settlement' });
  }

  // Policy Age Warnings
  if (inputs.yearsOwned < 2) {
    warnings.push({ field: 'yearsOwned', message: 'New policies may have lower settlement values and higher fees' });
  }

  // Face Value Warnings
  if (inputs.faceValue < 100000) {
    warnings.push({ field: 'faceValue', message: 'Low face value policies may have higher relative fees' });
  }

  // Premium Amount Warnings
  if (inputs.premiumAmount > inputs.faceValue * 0.01) {
    warnings.push({ field: 'premiumAmount', message: 'High premium relative to face value may affect settlement viability' });
  }

  // State Regulatory Warnings
  const regulatedStates = ['CA', 'NY', 'FL', 'TX'];
  if (!regulatedStates.includes(inputs.state)) {
    warnings.push({ field: 'state', message: 'Ensure state allows viatical settlements and check local regulations' });
  }

  // Tax Bracket Warnings
  if (inputs.taxBracket > 35) {
    warnings.push({ field: 'taxBracket', message: 'High tax bracket may affect after-tax settlement value' });
  }

  // Settlement Fees Warnings
  if (inputs.settlementFees > inputs.faceValue * 0.05) {
    warnings.push({ field: 'settlementFees', message: 'High settlement fees may reduce net benefit' });
  }

  // Discount Rate Warnings
  if (inputs.discountRate > 15) {
    warnings.push({ field: 'discountRate', message: 'High discount rate significantly reduces settlement value' });
  }

  return warnings;
}