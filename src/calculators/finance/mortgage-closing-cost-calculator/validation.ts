import { MortgageClosingCostInputs } from './types';

export function validateMortgageClosingCostInputs(inputs: MortgageClosingCostInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
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
  }

  // Credit Score Validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore && inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
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

  // Down Payment Validation
  if (inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }

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

  // Fee Validations
  const feeFields = [
    'originationFees', 'appraisalFee', 'titleInsurance', 'escrowFees',
    'recordingFees', 'transferTaxes', 'homeownersInsurance', 'floodInsurance',
    'propertyTaxes', 'prepaidInterest', 'otherFees', 'earnestMoneyDeposit', 'cashReserves'
  ];

  feeFields.forEach(field => {
    const value = inputs[field as keyof MortgageClosingCostInputs];
    if (typeof value === 'number' && value < 0) {
      errors.push({ field, message: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} cannot be negative` });
    }
  });

  // Seller Concessions Validation
  if (inputs.sellerConcessions < 0) {
    errors.push({ field: 'sellerConcessions', message: 'Seller concessions cannot be negative' });
  }

  // Location Validation
  if (!inputs.propertyState || inputs.propertyState.trim().length === 0) {
    errors.push({ field: 'propertyState', message: 'Property state is required' });
  }
  if (!inputs.propertyCounty || inputs.propertyCounty.trim().length === 0) {
    errors.push({ field: 'propertyCounty', message: 'Property county is required' });
  }
  if (!inputs.propertyZipCode || inputs.propertyZipCode.trim().length === 0) {
    errors.push({ field: 'propertyZipCode', message: 'Property ZIP code is required' });
  } else {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(inputs.propertyZipCode.trim())) {
      errors.push({ field: 'propertyZipCode', message: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)' });
    }
  }

  return errors;
}

export function validateMortgageClosingCostBusinessRules(inputs: MortgageClosingCostInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Credit Score Warnings
  if (inputs.creditScore < 620) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 620 may result in higher closing costs' });
  } else if (inputs.creditScore < 680) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 680 may limit financing options' });
  }

  // LTV Ratio Warnings
  if (inputs.loanAmount && inputs.propertyValue) {
    const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltv > 90) {
      warnings.push({ field: 'loanAmount', message: 'High LTV ratio may require PMI and affect closing costs' });
    }
    if (ltv > 95) {
      warnings.push({ field: 'loanAmount', message: 'Very high LTV ratio may limit loan options' });
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

  // Discount Points Warnings
  if (inputs.discountPoints > 2) {
    warnings.push({ field: 'discountPoints', message: 'High discount points increase upfront costs' });
  }

  // Seller Concessions Warnings
  if (inputs.sellerConcessions > inputs.loanAmount * 0.06) {
    warnings.push({ field: 'sellerConcessions', message: 'Seller concessions typically limited to 6% of loan amount' });
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