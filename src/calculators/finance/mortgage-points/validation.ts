import { MortgagePointsInputs } from './types';

export function validateMortgagePointsInputs(inputs: MortgagePointsInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Base Interest Rate Validation
  if (!inputs.baseInterestRate || inputs.baseInterestRate < 0) {
    errors.push({ field: 'baseInterestRate', message: 'Base interest rate must be 0 or greater' });
  }
  if (inputs.baseInterestRate && inputs.baseInterestRate > 30) {
    errors.push({ field: 'baseInterestRate', message: 'Base interest rate cannot exceed 30%' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm && inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Points Validation
  if (inputs.discountPoints && inputs.discountPoints < 0) {
    errors.push({ field: 'discountPoints', message: 'Discount points cannot be negative' });
  }
  if (inputs.originationPoints && inputs.originationPoints < 0) {
    errors.push({ field: 'originationPoints', message: 'Origination points cannot be negative' });
  }
  if (inputs.discountPoints && inputs.originationPoints && (inputs.discountPoints + inputs.originationPoints) > 10) {
    errors.push({ field: 'discountPoints', message: 'Total points cannot exceed 10' });
  }

  // Point Cost Validation
  if (!inputs.pointCost || inputs.pointCost <= 0) {
    errors.push({ field: 'pointCost', message: 'Point cost must be greater than 0' });
  }
  if (inputs.pointCost && inputs.pointCost > 10000) {
    errors.push({ field: 'pointCost', message: 'Point cost cannot exceed $10,000' });
  }

  // Borrower Income Validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push({ field: 'borrowerIncome', message: 'Borrower income must be greater than 0' });
  }

  // Borrower Credit Score Validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.push({ field: 'borrowerCreditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.borrowerCreditScore && inputs.borrowerCreditScore > 850) {
    errors.push({ field: 'borrowerCreditScore', message: 'Credit score cannot exceed 850' });
  }

  // Borrower Tax Rate Validation
  if (inputs.borrowerTaxRate && (inputs.borrowerTaxRate < 0 || inputs.borrowerTaxRate > 50)) {
    errors.push({ field: 'borrowerTaxRate', message: 'Tax rate must be between 0% and 50%' });
  }

  // Market Growth Rate Validation
  if (inputs.marketGrowthRate && (inputs.marketGrowthRate < -20 || inputs.marketGrowthRate > 50)) {
    errors.push({ field: 'marketGrowthRate', message: 'Market growth rate must be between -20% and 50%' });
  }

  // Analysis Period Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period must be at least 1 year' });
  }
  if (inputs.analysisPeriod && inputs.analysisPeriod > 30) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period cannot exceed 30 years' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate && (inputs.inflationRate < -5 || inputs.inflationRate > 20)) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Property Appreciation Rate Validation
  if (inputs.propertyAppreciationRate && (inputs.propertyAppreciationRate < -10 || inputs.propertyAppreciationRate > 30)) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate must be between -10% and 30%' });
  }

  // Discount Rate Validation
  if (!inputs.discountRate || inputs.discountRate < 0) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be 0 or greater' });
  }
  if (inputs.discountRate && inputs.discountRate > 25) {
    errors.push({ field: 'discountRate', message: 'Discount rate cannot exceed 25%' });
  }

  // Tax Deduction Period Validation
  if (inputs.taxDeductionPeriod && inputs.taxDeductionPeriod < 1) {
    errors.push({ field: 'taxDeductionPeriod', message: 'Tax deduction period must be at least 1 year' });
  }
  if (inputs.taxDeductionPeriod && inputs.taxDeductionPeriod > inputs.loanTerm) {
    errors.push({ field: 'taxDeductionPeriod', message: 'Tax deduction period cannot exceed loan term' });
  }

  return errors;
}

export function validateMortgagePointsBusinessRules(inputs: MortgagePointsInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Break-even Analysis Warning
  const totalPointCost = (inputs.discountPoints + inputs.originationPoints) * inputs.pointCost;
  const monthlyRate = inputs.baseInterestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;
  const monthlyPaymentWithoutPoints = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                                     (Math.pow(1 + monthlyRate, numPayments) - 1);

  const pointValue = inputs.discountPoints * 0.25; // Assume 0.25% per point
  const effectiveRate = inputs.baseInterestRate - pointValue;
  const monthlyRateWithPoints = effectiveRate / 100 / 12;
  const monthlyPaymentWithPoints = inputs.loanAmount * (monthlyRateWithPoints * Math.pow(1 + monthlyRateWithPoints, numPayments)) /
                                   (Math.pow(1 + monthlyRateWithPoints, numPayments) - 1);

  const monthlySavings = monthlyPaymentWithoutPoints - monthlyPaymentWithPoints;
  const breakEvenMonths = Math.ceil(totalPointCost / monthlySavings);

  if (breakEvenMonths > inputs.loanTerm * 12) {
    warnings.push({ field: 'discountPoints', message: 'Points may not break even before loan ends' });
  }

  // Credit Score Warnings
  if (inputs.borrowerCreditScore && inputs.borrowerCreditScore < 620) {
    warnings.push({ field: 'borrowerCreditScore', message: 'Low credit score may affect point pricing' });
  }

  // Point Cost Warnings
  if (inputs.pointCost && inputs.pointCost > inputs.loanAmount * 0.01) {
    warnings.push({ field: 'pointCost', message: 'Point cost seems high relative to loan amount' });
  }

  // Market Condition Warnings
  if (inputs.marketCondition === 'declining') {
    warnings.push({ field: 'marketCondition', message: 'Declining market may affect property value and refinance options' });
  }

  // Analysis Period Warnings
  if (inputs.analysisPeriod && inputs.analysisPeriod < inputs.loanTerm) {
    warnings.push({ field: 'analysisPeriod', message: 'Analysis period shorter than loan term may miss long-term benefits' });
  }

  // Tax Rate Warnings
  if (inputs.borrowerTaxRate && inputs.borrowerTaxRate < 15) {
    warnings.push({ field: 'borrowerTaxRate', message: 'Low tax rate reduces tax benefit of points' });
  }

  return warnings;
}