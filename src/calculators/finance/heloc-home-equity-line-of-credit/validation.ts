import { HelocInputs } from './types';

export function validateHelocInputs(inputs: HelocInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate home value
  if (!inputs.homeValue || inputs.homeValue <= 0) {
    errors.push({ field: 'homeValue', message: 'Home value must be greater than 0' });
  }
  if (inputs.homeValue && inputs.homeValue > 10000000) {
    errors.push({ field: 'homeValue', message: 'Home value cannot exceed $10,000,000' });
  }

  // Validate outstanding mortgage balance
  if (inputs.outstandingMortgageBalance === undefined || inputs.outstandingMortgageBalance < 0) {
    errors.push({ field: 'outstandingMortgageBalance', message: 'Outstanding mortgage balance cannot be negative' });
  }
  if (inputs.outstandingMortgageBalance && inputs.homeValue && inputs.outstandingMortgageBalance > inputs.homeValue) {
    errors.push({ field: 'outstandingMortgageBalance', message: 'Outstanding mortgage balance cannot exceed home value' });
  }

  // Validate credit limit percentage
  if (!inputs.creditLimitPercentage || inputs.creditLimitPercentage <= 0) {
    errors.push({ field: 'creditLimitPercentage', message: 'Credit limit percentage must be greater than 0' });
  }
  if (inputs.creditLimitPercentage && inputs.creditLimitPercentage > 100) {
    errors.push({ field: 'creditLimitPercentage', message: 'Credit limit percentage cannot exceed 100%' });
  }

  // Validate interest rate
  if (inputs.interestRate === undefined || inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate && inputs.interestRate > 25) {
    errors.push({ field: 'interestRate', message: 'Interest rate seems unusually high (>25%)' });
  }

  // Validate draw period
  if (!inputs.drawPeriodYears || inputs.drawPeriodYears <= 0) {
    errors.push({ field: 'drawPeriodYears', message: 'Draw period must be greater than 0 years' });
  }
  if (inputs.drawPeriodYears && inputs.drawPeriodYears > 30) {
    errors.push({ field: 'drawPeriodYears', message: 'Draw period cannot exceed 30 years' });
  }

  // Validate repayment period
  if (!inputs.repaymentPeriodYears || inputs.repaymentPeriodYears <= 0) {
    errors.push({ field: 'repaymentPeriodYears', message: 'Repayment period must be greater than 0 years' });
  }
  if (inputs.repaymentPeriodYears && inputs.repaymentPeriodYears > 30) {
    errors.push({ field: 'repaymentPeriodYears', message: 'Repayment period cannot exceed 30 years' });
  }

  // Validate draw amounts (if provided)
  if (inputs.monthlyDrawAmount !== undefined && inputs.monthlyDrawAmount < 0) {
    errors.push({ field: 'monthlyDrawAmount', message: 'Monthly draw amount cannot be negative' });
  }

  if (inputs.oneTimeDrawAmount !== undefined && inputs.oneTimeDrawAmount < 0) {
    errors.push({ field: 'oneTimeDrawAmount', message: 'One-time draw amount cannot be negative' });
  }

  return errors;
}

export function validateHelocBusinessRules(inputs: HelocInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.homeValue && inputs.outstandingMortgageBalance) {
    const equity = inputs.homeValue - inputs.outstandingMortgageBalance;
    const loanToValueRatio = (inputs.outstandingMortgageBalance / inputs.homeValue) * 100;

    if (loanToValueRatio > 90) {
      warnings.push({
        field: 'outstandingMortgageBalance',
        message: 'High loan-to-value ratio may limit HELOC approval or terms'
      });
    }

    if (equity < 50000) {
      warnings.push({
        field: 'homeValue',
        message: 'Limited equity may restrict HELOC availability'
      });
    }
  }

  if (inputs.creditLimitPercentage && inputs.creditLimitPercentage > 85) {
    warnings.push({
      field: 'creditLimitPercentage',
      message: 'High credit limit percentage increases risk of default'
    });
  }

  if (inputs.interestRate && inputs.interestRate > 10) {
    warnings.push({
      field: 'interestRate',
      message: 'High interest rate - consider shopping for better terms'
    });
  }

  if (inputs.drawPeriodYears && inputs.repaymentPeriodYears &&
      (inputs.drawPeriodYears + inputs.repaymentPeriodYears) > 30) {
    warnings.push({
      field: 'repaymentPeriodYears',
      message: 'Total HELOC term exceeds typical limits - review terms'
    });
  }

  return warnings;
}