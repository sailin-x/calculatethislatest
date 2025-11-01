import { PrivateMortgageInsuranceInputs } from './types';

export function validatePrivateMortgageInsuranceInputs(inputs: PrivateMortgageInsuranceInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan amount validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Down payment validation
  if (inputs.downPaymentAmount < 0) {
    errors.push({ field: 'downPaymentAmount', message: 'Down payment amount cannot be negative' });
  }
  if (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100) {
    errors.push({ field: 'downPaymentPercentage', message: 'Down payment percentage must be between 0% and 100%' });
  }

  // LTV validation
  if (inputs.loanToValueRatio <= 0 || inputs.loanToValueRatio > 100) {
    errors.push({ field: 'loanToValueRatio', message: 'Loan-to-value ratio must be between 0% and 100%' });
  }
  if (inputs.loanToValueRatio > 97) {
    errors.push({ field: 'loanToValueRatio', message: 'LTV ratio above 97% typically requires PMI' });
  }

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Credit score validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.push({ field: 'borrowerCreditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.borrowerCreditScore && inputs.borrowerCreditScore > 850) {
    errors.push({ field: 'borrowerCreditScore', message: 'Credit score cannot exceed 850' });
  }

  // Income validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push({ field: 'borrowerIncome', message: 'Borrower income must be greater than 0' });
  }

  // DTI validation
  if (inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 100) {
    errors.push({ field: 'borrowerDebtToIncomeRatio', message: 'Debt-to-income ratio must be between 0% and 100%' });
  }

  // PMI rate validation
  if (inputs.pmiRate < 0 || inputs.pmiRate > 5) {
    errors.push({ field: 'pmiRate', message: 'PMI rate must be between 0% and 5%' });
  }

  // PMI term validation
  if (!inputs.pmiTerm || inputs.pmiTerm <= 0) {
    errors.push({ field: 'pmiTerm', message: 'PMI term must be greater than 0 years' });
  }
  if (inputs.pmiTerm && inputs.pmiTerm > 50) {
    errors.push({ field: 'pmiTerm', message: 'PMI term cannot exceed 50 years' });
  }

  // FHA upfront MIP validation
  if (inputs.loanType === 'FHA' && (inputs.upfrontMip < 0 || inputs.upfrontMip > 5)) {
    errors.push({ field: 'upfrontMip', message: 'FHA upfront MIP must be between 0% and 5%' });
  }

  // Market rate validation
  if (inputs.marketRate < 0 || inputs.marketRate > 20) {
    errors.push({ field: 'marketRate', message: 'Market rate must be between 0% and 20%' });
  }

  // Tax rate validation
  if (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50) {
    errors.push({ field: 'marginalTaxRate', message: 'Marginal tax rate must be between 0% and 50%' });
  }
  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push({ field: 'stateTaxRate', message: 'State tax rate must be between 0% and 20%' });
  }

  // Refinance validation
  if (inputs.refinanceInterestRate && (inputs.refinanceInterestRate < 0 || inputs.refinanceInterestRate > 20)) {
    errors.push({ field: 'refinanceInterestRate', message: 'Refinance interest rate must be between 0% and 20%' });
  }
  if (inputs.refinanceClosingCosts && inputs.refinanceClosingCosts < 0) {
    errors.push({ field: 'refinanceClosingCosts', message: 'Refinance closing costs cannot be negative' });
  }
  if (inputs.refinanceTerm && (inputs.refinanceTerm <= 0 || inputs.refinanceTerm > 50)) {
    errors.push({ field: 'refinanceTerm', message: 'Refinance term must be between 1 and 50 years' });
  }

  // Date validation
  if (!inputs.loanOriginationDate) {
    errors.push({ field: 'loanOriginationDate', message: 'Loan origination date is required' });
  } else {
    const originationDate = new Date(inputs.loanOriginationDate);
    const currentDate = new Date();
    if (originationDate > currentDate) {
      errors.push({ field: 'loanOriginationDate', message: 'Loan origination date cannot be in the future' });
    }
  }

  if (!inputs.analysisDate) {
    errors.push({ field: 'analysisDate', message: 'Analysis date is required' });
  }

  if (inputs.expectedPayoffDate) {
    const payoffDate = new Date(inputs.expectedPayoffDate);
    const originationDate = new Date(inputs.loanOriginationDate);
    if (payoffDate <= originationDate) {
      errors.push({ field: 'expectedPayoffDate', message: 'Expected payoff date must be after origination date' });
    }
  }

  // Number of units validation
  if (inputs.numberOfUnits < 1 || inputs.numberOfUnits > 10) {
    errors.push({ field: 'numberOfUnits', message: 'Number of units must be between 1 and 10' });
  }

  return errors;
}

export function validatePrivateMortgageInsuranceBusinessRules(inputs: PrivateMortgageInsuranceInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // PMI requirement check
  if (inputs.loanToValueRatio > 80 && inputs.pmiRate === 0) {
    warnings.push({ field: 'pmiRate', message: 'PMI is typically required for loans above 80% LTV' });
  }

  // Credit score warnings
  if (inputs.borrowerCreditScore < 620) {
    warnings.push({ field: 'borrowerCreditScore', message: 'Low credit score may result in higher PMI rates' });
  } else if (inputs.borrowerCreditScore < 680) {
    warnings.push({ field: 'borrowerCreditScore', message: 'Credit score below 680 may affect PMI eligibility' });
  }

  // DTI warnings
  if (inputs.borrowerDebtToIncomeRatio > 43) {
    warnings.push({ field: 'borrowerDebtToIncomeRatio', message: 'High DTI ratio may affect loan approval and PMI rates' });
  }

  // LTV warnings
  if (inputs.loanToValueRatio > 95) {
    warnings.push({ field: 'loanToValueRatio', message: 'Very high LTV ratio increases default risk and PMI costs' });
  }

  // FHA specific warnings
  if (inputs.loanType === 'FHA') {
    if (inputs.loanToValueRatio > 96.5) {
      warnings.push({ field: 'loanToValueRatio', message: 'FHA loans cannot exceed 96.5% LTV' });
    }
    if (inputs.borrowerCreditScore < 580) {
      warnings.push({ field: 'borrowerCreditScore', message: 'FHA loans typically require minimum credit score of 580' });
    }
  }

  // VA loan warnings
  if (inputs.loanType === 'VA') {
    if (inputs.loanToValueRatio > 100) {
      warnings.push({ field: 'loanToValueRatio', message: 'VA loans can exceed 100% LTV but may require funding fee' });
    }
  }

  // Conventional loan warnings
  if (inputs.loanType === 'Conventional') {
    if (inputs.loanToValueRatio > 97) {
      warnings.push({ field: 'loanToValueRatio', message: 'Conventional loans typically cannot exceed 97% LTV' });
    }
  }

  // PMI rate warnings
  if (inputs.pmiRate > 1.5) {
    warnings.push({ field: 'pmiRate', message: 'PMI rate seems high - verify with lender' });
  }

  // Down payment warnings
  if (inputs.downPaymentPercentage < 3 && inputs.loanType === 'Conventional') {
    warnings.push({ field: 'downPaymentPercentage', message: 'Conventional loans typically require 3% minimum down payment' });
  }
  if (inputs.downPaymentPercentage < 3.5 && inputs.loanType === 'FHA') {
    warnings.push({ field: 'downPaymentPercentage', message: 'FHA loans require 3.5% minimum down payment' });
  }

  // Income warnings
  if (inputs.borrowerIncome < 25000) {
    warnings.push({ field: 'borrowerIncome', message: 'Low income may affect loan approval and PMI rates' });
  }

  // Property type warnings
  if (inputs.propertyType === 'Commercial' && inputs.loanType !== 'Commercial') {
    warnings.push({ field: 'propertyType', message: 'Commercial properties require commercial loan products' });
  }

  // Market condition warnings
  if (inputs.marketTrend === 'Decreasing') {
    warnings.push({ field: 'marketTrend', message: 'Declining market may affect property value and PMI cancellation' });
  }

  // State-specific warnings
  if (inputs.propertyState === 'HI' || inputs.propertyState === 'AK') {
    warnings.push({ field: 'propertyState', message: 'High-cost areas may have different PMI requirements' });
  }

  // Refinance warnings
  if (inputs.refinanceInterestRate && inputs.refinanceInterestRate > inputs.marketRate + 2) {
    warnings.push({ field: 'refinanceInterestRate', message: 'Refinance rate significantly higher than market rate' });
  }

  // Term warnings
  if (inputs.pmiTerm > 30) {
    warnings.push({ field: 'pmiTerm', message: 'Long PMI terms increase total cost - consider paying down loan faster' });
  }

  // Multi-unit warnings
  if (inputs.numberOfUnits > 4) {
    warnings.push({ field: 'numberOfUnits', message: 'Multi-unit properties may require different loan programs' });
  }

  // Rural area warnings
  if (inputs.propertyLocation === 'Rural') {
    warnings.push({ field: 'propertyLocation', message: 'Rural properties may have limited lender options and higher rates' });
  }

  return warnings;
}