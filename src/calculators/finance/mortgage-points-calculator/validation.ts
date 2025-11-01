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

  // Interest Rate Validation
  if (inputs.baseInterestRate < 0) {
    errors.push({ field: 'baseInterestRate', message: 'Base interest rate cannot be negative' });
  }
  if (inputs.baseInterestRate > 30) {
    errors.push({ field: 'baseInterestRate', message: 'Base interest rate cannot exceed 30%' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Points Validation
  if (inputs.discountPoints < 0) {
    errors.push({ field: 'discountPoints', message: 'Discount points cannot be negative' });
  }
  if (inputs.discountPoints > 10) {
    errors.push({ field: 'discountPoints', message: 'Discount points cannot exceed 10' });
  }

  if (inputs.originationPoints < 0) {
    errors.push({ field: 'originationPoints', message: 'Origination points cannot be negative' });
  }
  if (inputs.originationPoints > 5) {
    errors.push({ field: 'originationPoints', message: 'Origination points cannot exceed 5' });
  }

  // Lender Credits Validation
  if (inputs.lenderCredits < 0) {
    errors.push({ field: 'lenderCredits', message: 'Lender credits cannot be negative' });
  }

  // Holding Period Validation
  if (!inputs.expectedHoldingPeriod || inputs.expectedHoldingPeriod < 1) {
    errors.push({ field: 'expectedHoldingPeriod', message: 'Expected holding period must be at least 1 year' });
  }
  if (inputs.expectedHoldingPeriod > 50) {
    errors.push({ field: 'expectedHoldingPeriod', message: 'Expected holding period cannot exceed 50 years' });
  }

  // Appreciation Rate Validation
  if (inputs.propertyAppreciationRate < -20) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate cannot be less than -20%' });
  }
  if (inputs.propertyAppreciationRate > 50) {
    errors.push({ field: 'propertyAppreciationRate', message: 'Property appreciation rate cannot exceed 50%' });
  }

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Down Payment Validation
  if (inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot exceed property value' });
  }

  // Credit Score Validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
  }

  // Monthly Payment Validation
  if (inputs.monthlyPaymentWithoutPoints && inputs.monthlyPaymentWithoutPoints <= 0) {
    errors.push({ field: 'monthlyPaymentWithoutPoints', message: 'Monthly payment without points must be greater than 0' });
  }

  if (inputs.monthlyPaymentWithPoints && inputs.monthlyPaymentWithPoints <= 0) {
    errors.push({ field: 'monthlyPaymentWithPoints', message: 'Monthly payment with points must be greater than 0' });
  }

  // Cost Validation
  if (inputs.closingCosts < 0) {
    errors.push({ field: 'closingCosts', message: 'Closing costs cannot be negative' });
  }

  if (inputs.otherFees < 0) {
    errors.push({ field: 'otherFees', message: 'Other fees cannot be negative' });
  }

  // Market Rate Validation
  if (inputs.currentMarketRate < 0) {
    errors.push({ field: 'currentMarketRate', message: 'Current market rate cannot be negative' });
  }
  if (inputs.currentMarketRate > 30) {
    errors.push({ field: 'currentMarketRate', message: 'Current market rate cannot exceed 30%' });
  }

  return errors;
}

export function validateMortgagePointsBusinessRules(inputs: MortgagePointsInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Points vs Holding Period Warning
  const breakevenMonths = calculateBreakevenMonths(inputs);
  const holdingPeriodMonths = inputs.expectedHoldingPeriod * 12;

  if (breakevenMonths > holdingPeriodMonths) {
    warnings.push({
      field: 'expectedHoldingPeriod',
      message: `Breakeven period (${breakevenMonths} months) exceeds expected holding period (${holdingPeriodMonths} months)`
    });
  }

  // High Points Cost Warning
  const pointsCost = calculatePointsCost(inputs);
  const annualSavings = calculateMonthlySavings(inputs) * 12;

  if (pointsCost > annualSavings * 2) {
    warnings.push({
      field: 'discountPoints',
      message: 'Points cost exceeds 2 years of savings - consider fewer points'
    });
  }

  // Low Credit Score Warning
  if (inputs.creditScore < 680) {
    warnings.push({
      field: 'creditScore',
      message: 'Lower credit scores may result in higher point costs or fewer options'
    });
  }

  // High Interest Rate Environment Warning
  if (inputs.baseInterestRate > 8) {
    warnings.push({
      field: 'baseInterestRate',
      message: 'High interest rate environment may make points less valuable'
    });
  }

  // Short Holding Period Warning
  if (inputs.expectedHoldingPeriod < 3) {
    warnings.push({
      field: 'expectedHoldingPeriod',
      message: 'Short holding periods typically don\'t benefit from discount points'
    });
  }

  // High LTV Warning
  const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltv > 90) {
    warnings.push({
      field: 'loanAmount',
      message: 'High loan-to-value ratio may limit point purchasing options'
    });
  }

  // Negative Appreciation Warning
  if (inputs.propertyAppreciationRate < 0) {
    warnings.push({
      field: 'propertyAppreciationRate',
      message: 'Expected property depreciation may reduce benefits of points'
    });
  }

  // FHA Loan Considerations
  if (inputs.loanType === 'fha') {
    if (inputs.discountPoints > 0) {
      warnings.push({
        field: 'loanType',
        message: 'FHA loans have restrictions on discount points - verify lender requirements'
      });
    }
  }

  // VA Loan Considerations
  if (inputs.loanType === 'va') {
    warnings.push({
      field: 'loanType',
      message: 'VA loans have funding fees instead of traditional points - compare costs'
    });
  }

  return warnings;
}

// Helper functions for validation
function calculateBreakevenMonths(inputs: MortgagePointsInputs): number {
  const pointsCost = calculatePointsCost(inputs);
  const monthlySavings = calculateMonthlySavings(inputs);
  return monthlySavings > 0 ? Math.ceil(pointsCost / monthlySavings) : Infinity;
}

function calculatePointsCost(inputs: MortgagePointsInputs): number {
  const discountPointsCost = inputs.discountPoints * (inputs.loanAmount * 0.01);
  const originationPointsCost = inputs.originationPoints * (inputs.loanAmount * 0.01);
  return discountPointsCost + originationPointsCost - inputs.lenderCredits;
}

function calculateMonthlySavings(inputs: MortgagePointsInputs): number {
  const paymentWithoutPoints = inputs.monthlyPaymentWithoutPoints ||
    calculateMonthlyPaymentWithoutPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.loanTerm);

  const paymentWithPoints = inputs.monthlyPaymentWithPoints ||
    calculateMonthlyPaymentWithPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.discountPoints, inputs.loanTerm);

  return paymentWithoutPoints - paymentWithPoints;
}

function calculateMonthlyPaymentWithoutPoints(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  if (monthlyRate === 0) return loanAmount / numPayments;

  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateMonthlyPaymentWithPoints(loanAmount: number, baseRate: number, points: number, loanTerm: number): number {
  const rateReduction = points * 0.25;
  const adjustedRate = Math.max(0, baseRate - rateReduction);
  return calculateMonthlyPaymentWithoutPoints(loanAmount, adjustedRate, loanTerm);
}