// import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCAPMInputs(inputs: any): ValidationResult {
  const errors: string[] = [];

  // Risk-free rate validation
  if (inputs.riskFreeRate === undefined || inputs.riskFreeRate === null || typeof inputs.riskFreeRate !== 'number' || inputs.riskFreeRate < 0) {
    errors.push('Risk-free rate must be a non-negative number');
  } else if (inputs.riskFreeRate > 0.2) {
    errors.push('Risk-free rate must be 20% or less');
  }

  // Market risk premium validation
  if (inputs.marketRiskPremium === undefined || inputs.marketRiskPremium === null || typeof inputs.marketRiskPremium !== 'number' || inputs.marketRiskPremium < 0) {
    errors.push('Market risk premium must be a non-negative number');
  } else if (inputs.marketRiskPremium > 0.2) {
    errors.push('Market risk premium must be 20% or less');
  }

  // Beta validation
  if (inputs.beta === undefined || inputs.beta === null || typeof inputs.beta !== 'number' || inputs.beta < 0) {
    errors.push('Beta must be a non-negative number');
  } else if (inputs.beta > 5) {
    errors.push('Beta must be 5 or less');
  }

  // Optional fields validation
  if (inputs.companyName !== undefined && (typeof inputs.companyName !== 'string' || inputs.companyName.trim().length === 0)) {
    errors.push('Company name must be a non-empty string');
  }

  if (inputs.industry !== undefined && (typeof inputs.industry !== 'string' || inputs.industry.trim().length === 0)) {
    errors.push('Industry must be a non-empty string');
  }

  if (inputs.analysisPeriod !== undefined && (typeof inputs.analysisPeriod !== 'number' || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.historicalBeta !== undefined && (typeof inputs.historicalBeta !== 'number' || inputs.historicalBeta < 0 || inputs.historicalBeta > 5)) {
    errors.push('Historical beta must be between 0 and 5');
  }

  if (inputs.taxRate !== undefined && (typeof inputs.taxRate !== 'number' || inputs.taxRate < 0 || inputs.taxRate > 1)) {
    errors.push('Tax rate must be between 0 and 100%');
  }

  if (inputs.debtRatio !== undefined && (typeof inputs.debtRatio !== 'number' || inputs.debtRatio < 0 || inputs.debtRatio > 1)) {
    errors.push('Debt ratio must be between 0 and 100%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateCAPMInput(field: string, value: any): string | null {
  switch (field) {
    case 'riskFreeRate':
      if (value === undefined || value === null) return 'Risk-free rate is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.2) return 'Must be 20% or less';
      break;

    case 'marketRiskPremium':
      if (value === undefined || value === null) return 'Market risk premium is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.2) return 'Must be 20% or less';
      break;

    case 'beta':
      if (value === undefined || value === null) return 'Beta is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5) return 'Must be 5 or less';
      break;

    case 'companyName':
      if (value !== undefined && (typeof value !== 'string' || value.trim().length === 0)) return 'Must be a non-empty string';
      break;

    case 'industry':
      if (value !== undefined && (typeof value !== 'string' || value.trim().length === 0)) return 'Must be a non-empty string';
      break;

    case 'analysisPeriod':
      if (value !== undefined && (typeof value !== 'number' || value < 1 || value > 50)) return 'Must be between 1 and 50 years';
      break;

    case 'historicalBeta':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 5)) return 'Must be between 0 and 5';
      break;

    case 'taxRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 1)) return 'Must be between 0 and 100%';
      break;

    case 'debtRatio':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 1)) return 'Must be between 0 and 100%';
      break;
  }

  return null;
}