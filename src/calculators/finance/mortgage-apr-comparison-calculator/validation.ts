import { MortgageAprComparisonInputs } from './types';

export function validateMortgageAprComparisonInputs(inputs: MortgageAprComparisonInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
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

  // Loan-to-Value Ratio Validation
  if (inputs.loanAmount && inputs.propertyValue) {
    const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltv > 100) {
      errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed property value' });
    }
    if (inputs.loanType === 'conventional' && ltv > 97) {
      errors.push({ field: 'loanAmount', message: 'Conventional loans typically require LTV ≤ 97%' });
    }
    if (inputs.loanType === 'fha' && ltv > 96.5) {
      errors.push({ field: 'loanAmount', message: 'FHA loans require LTV ≤ 96.5%' });
    }
  }

  // Credit Score Validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore && inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
  }

  // Interest Rate Validation
  Object.entries(inputs.currentMarketRates).forEach(([key, rate]) => {
    if (rate < 0) {
      errors.push({ field: `currentMarketRates.${key}`, message: `${key.replace('_', ' ')} rate must be 0 or greater` });
    }
    if (rate > 30) {
      errors.push({ field: `currentMarketRates.${key}`, message: `${key.replace('_', ' ')} rate cannot exceed 30%` });
    }
  });

  // Closing Costs Validation
  Object.entries(inputs.closingCosts).forEach(([key, cost]) => {
    if (cost < 0) {
      errors.push({ field: `closingCosts.${key}`, message: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} cannot be negative` });
    }
  });

  // Discount Points Validation
  if (inputs.discountPoints < 0) {
    errors.push({ field: 'discountPoints', message: 'Discount points cannot be negative' });
  }
  if (inputs.discountPoints > 5) {
    errors.push({ field: 'discountPoints', message: 'Discount points typically do not exceed 5' });
  }

  // Lender Credits Validation
  if (inputs.lenderCredits < 0) {
    errors.push({ field: 'lenderCredits', message: 'Lender credits cannot be negative' });
  }

  // Property Location Validation
  if (!inputs.propertyState || inputs.propertyState.trim().length === 0) {
    errors.push({ field: 'propertyState', message: 'Property state is required' });
  }
  if (!inputs.propertyZipCode || inputs.propertyZipCode.trim().length === 0) {
    errors.push({ field: 'propertyZipCode', message: 'Property ZIP code is required' });
  }

  return errors;
}

export function validateMortgageAprComparisonBusinessRules(inputs: MortgageAprComparisonInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Credit Score Warnings
  if (inputs.creditScore < 620) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 620 may result in higher interest rates' });
  } else if (inputs.creditScore < 680) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 680 may limit loan options' });
  }

  // LTV Ratio Warnings
  if (inputs.loanAmount && inputs.propertyValue) {
    const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltv > 90) {
      warnings.push({ field: 'loanAmount', message: 'High LTV ratio may require PMI and affect rates' });
    }
    if (ltv > 95) {
      warnings.push({ field: 'loanAmount', message: 'Very high LTV ratio may limit loan options' });
    }
  }

  // Interest Rate Warnings
  Object.entries(inputs.currentMarketRates).forEach(([key, rate]) => {
    if (rate > 8) {
      warnings.push({ field: `currentMarketRates.${key}`, message: `High ${key.replace('_', ' ')} rate may indicate market conditions` });
    }
  });

  // Closing Costs Warnings
  const totalClosingCosts = Object.values(inputs.closingCosts).reduce((sum, cost) => sum + cost, 0);
  if (totalClosingCosts > inputs.loanAmount * 0.05) {
    warnings.push({ field: 'closingCosts', message: 'High closing costs may impact affordability' });
  }

  // Discount Points Warnings
  if (inputs.discountPoints > 2) {
    warnings.push({ field: 'discountPoints', message: 'High discount points increase upfront costs' });
  }

  // Veteran Status Validation for VA Loans
  if (inputs.loanType === 'va' && !inputs.veteranStatus) {
    warnings.push({ field: 'veteranStatus', message: 'VA loans require veteran status' });
  }

  // First-Time Homebuyer Validation for FHA Loans
  if (inputs.loanType === 'fha' && !inputs.firstTimeHomebuyer) {
    warnings.push({ field: 'firstTimeHomebuyer', message: 'FHA loans have special requirements for repeat buyers' });
  }

  return warnings;
}