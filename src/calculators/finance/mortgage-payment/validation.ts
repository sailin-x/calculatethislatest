import { MortgagePaymentInputs } from './types';

export function validateMortgagePaymentInputs(inputs: MortgagePaymentInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Interest Rate Validation
  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be 0 or greater' });
  }
  if (inputs.interestRate && inputs.interestRate > 30) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 30%' });
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

  // Down Payment Validation
  if (inputs.downPayment && inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }
  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment >= inputs.propertyValue) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be greater than or equal to property value' });
  }

  // Loan-to-Value Ratio Validation
  if (inputs.loanAmount && inputs.propertyValue) {
    const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltv > 100) {
      errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed property value (LTV > 100%)' });
    }
    if (inputs.loanType === 'conventional' && ltv > 97) {
      errors.push({ field: 'loanAmount', message: 'Conventional loans typically require LTV ≤ 97%' });
    }
    if (inputs.loanType === 'fha' && ltv > 96.5) {
      errors.push({ field: 'loanAmount', message: 'FHA loans require LTV ≤ 96.5%' });
    }
    if (inputs.loanType === 'va' && ltv > 100) {
      errors.push({ field: 'loanAmount', message: 'VA loans can exceed 100% LTV' });
    }
  }

  // Credit Score Validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.push({ field: 'borrowerCreditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.borrowerCreditScore && inputs.borrowerCreditScore > 850) {
    errors.push({ field: 'borrowerCreditScore', message: 'Credit score cannot exceed 850' });
  }

  // Debt-to-Income Ratio Validation
  if (inputs.borrowerDebtToIncomeRatio && inputs.borrowerDebtToIncomeRatio < 0) {
    errors.push({ field: 'borrowerDebtToIncomeRatio', message: 'DTI ratio cannot be negative' });
  }
  if (inputs.borrowerDebtToIncomeRatio && inputs.borrowerDebtToIncomeRatio > 100) {
    errors.push({ field: 'borrowerDebtToIncomeRatio', message: 'DTI ratio cannot exceed 100%' });
  }

  // ARM-specific Validation
  if (inputs.paymentType === 'arm') {
    if (!inputs.initialFixedPeriod || inputs.initialFixedPeriod < 1) {
      errors.push({ field: 'initialFixedPeriod', message: 'Initial fixed period must be at least 1 year for ARM loans' });
    }
    if (!inputs.adjustmentPeriod || inputs.adjustmentPeriod < 1) {
      errors.push({ field: 'adjustmentPeriod', message: 'Adjustment period must be at least 1 year for ARM loans' });
    }
    if (inputs.lifetimeCap && inputs.lifetimeCap < inputs.interestRate) {
      errors.push({ field: 'lifetimeCap', message: 'Lifetime cap must be greater than current interest rate' });
    }
    if (inputs.periodicCap && inputs.periodicCap <= 0) {
      errors.push({ field: 'periodicCap', message: 'Periodic cap must be greater than 0' });
    }
  }

  // Property Insurance Validation
  if (inputs.propertyInsurance && inputs.propertyInsurance < 0) {
    errors.push({ field: 'propertyInsurance', message: 'Property insurance cannot be negative' });
  }

  // Property Taxes Validation
  if (inputs.propertyTaxes && inputs.propertyTaxes < 0) {
    errors.push({ field: 'propertyTaxes', message: 'Property taxes cannot be negative' });
  }

  // HOA Fees Validation
  if (inputs.hoaFees && inputs.hoaFees < 0) {
    errors.push({ field: 'hoaFees', message: 'HOA fees cannot be negative' });
  }

  // Flood Insurance Validation
  if (inputs.floodInsurance && inputs.floodInsurance < 0) {
    errors.push({ field: 'floodInsurance', message: 'Flood insurance cannot be negative' });
  }

  // Mortgage Insurance Validation
  if (inputs.mortgageInsurance && inputs.mortgageInsurance < 0) {
    errors.push({ field: 'mortgageInsurance', message: 'Mortgage insurance cannot be negative' });
  }

  // Borrower Income Validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push({ field: 'borrowerIncome', message: 'Borrower income must be greater than 0' });
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

  return errors;
}

export function validateMortgagePaymentBusinessRules(inputs: MortgagePaymentInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Front-end DTI Warning
  if (inputs.borrowerDebtToIncomeRatio && inputs.borrowerDebtToIncomeRatio > 43) {
    warnings.push({ field: 'borrowerDebtToIncomeRatio', message: 'DTI ratio above 43% may affect loan approval' });
  }

  // Credit Score Warnings
  if (inputs.borrowerCreditScore && inputs.borrowerCreditScore < 620) {
    warnings.push({ field: 'borrowerCreditScore', message: 'Credit score below 620 may require manual underwriting' });
  } else if (inputs.borrowerCreditScore && inputs.borrowerCreditScore < 680) {
    warnings.push({ field: 'borrowerCreditScore', message: 'Credit score below 680 may result in higher interest rates' });
  }

  // LTV Ratio Warnings
  if (inputs.loanAmount && inputs.propertyValue) {
    const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltv > 90) {
      warnings.push({ field: 'loanAmount', message: 'LTV above 90% may require PMI and affect approval' });
    }
    if (ltv > 95) {
      warnings.push({ field: 'loanAmount', message: 'LTV above 95% is considered high risk' });
    }
  }

  // Down Payment Warnings
  if (inputs.downPayment && inputs.propertyValue) {
    const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
    if (inputs.loanType === 'conventional' && downPaymentPercent < 3) {
      warnings.push({ field: 'downPayment', message: 'Conventional loans typically require 3% minimum down payment' });
    }
    if (inputs.loanType === 'fha' && downPaymentPercent < 3.5) {
      warnings.push({ field: 'downPayment', message: 'FHA loans require 3.5% minimum down payment' });
    }
  }

  // ARM Warnings
  if (inputs.paymentType === 'arm') {
    if (inputs.adjustmentPeriod && inputs.adjustmentPeriod < 1) {
      warnings.push({ field: 'adjustmentPeriod', message: 'Short adjustment periods increase payment risk' });
    }
    if (inputs.lifetimeCap && inputs.lifetimeCap - inputs.interestRate > 5) {
      warnings.push({ field: 'lifetimeCap', message: 'Large lifetime cap increases long-term risk' });
    }
  }

  // Interest Rate Warnings
  if (inputs.interestRate && inputs.interestRate > 8) {
    warnings.push({ field: 'interestRate', message: 'High interest rate may indicate increased risk or market conditions' });
  }

  // Loan Term Warnings
  if (inputs.loanTerm && inputs.loanTerm > 30) {
    warnings.push({ field: 'loanTerm', message: 'Long loan terms increase total interest paid' });
  }

  // Property Age Warnings
  if (inputs.propertyAge && inputs.propertyAge > 50) {
    warnings.push({ field: 'propertyAge', message: 'Older properties may require additional inspections and repairs' });
  }

  // Market Condition Warnings
  if (inputs.marketCondition === 'declining') {
    warnings.push({ field: 'marketCondition', message: 'Declining market may affect property value and refinance options' });
  }

  // Borrower Income Warnings
  if (inputs.borrowerIncome && inputs.borrowerIncome < 30000) {
    warnings.push({ field: 'borrowerIncome', message: 'Low income may affect loan approval and payment ability' });
  }

  return warnings;
}