import { MezzanineFinancingRealEstateInputs } from './types';
import { ValidationResult } from '../../../types/validation';

export function validateMezzanineFinancingRealEstateInputs(inputs: MezzanineFinancingRealEstateInputs): ValidationResult {
  const errors: string[] = [];

  // Property validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.purchasePrice || inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  }

  if (inputs.purchasePrice > inputs.propertyValue) {
    errors.push('Purchase price cannot exceed property value');
  }

  // Financing validation
  if (!inputs.seniorLoanAmount || inputs.seniorLoanAmount <= 0) {
    errors.push('Senior loan amount must be greater than 0');
  }

  if (!inputs.mezzanineLoanAmount || inputs.mezzanineLoanAmount <= 0) {
    errors.push('Mezzanine loan amount must be greater than 0');
  }

  if (!inputs.equityContribution || inputs.equityContribution <= 0) {
    errors.push('Equity contribution must be greater than 0');
  }

  // Rate validation
  if (inputs.seniorInterestRate <= 0 || inputs.seniorInterestRate > 20) {
    errors.push('Senior interest rate must be between 0% and 20%');
  }

  if (inputs.mezzanineInterestRate <= 0 || inputs.mezzanineInterestRate > 30) {
    errors.push('Mezzanine interest rate must be between 0% and 30%');
  }

  if (inputs.mezzanineInterestRate <= inputs.seniorInterestRate) {
    errors.push('Mezzanine interest rate must be higher than senior interest rate');
  }

  // Term validation
  if (inputs.seniorLoanTerm <= 0 || inputs.seniorLoanTerm > 30) {
    errors.push('Senior loan term must be between 1 and 30 years');
  }

  if (inputs.mezzanineLoanTerm <= 0 || inputs.mezzanineLoanTerm > 10) {
    errors.push('Mezzanine loan term must be between 1 and 10 years');
  }

  if (inputs.mezzanineLoanTerm > inputs.seniorLoanTerm) {
    errors.push('Mezzanine loan term cannot exceed senior loan term');
  }

  // Cash flow validation
  if (!inputs.netOperatingIncome || inputs.netOperatingIncome <= 0) {
    errors.push('Net operating income must be greater than 0');
  }

  // Total financing validation
  const totalFinancing = inputs.seniorLoanAmount + inputs.mezzanineLoanAmount + inputs.equityContribution;
  if (Math.abs(totalFinancing - inputs.purchasePrice) > 1000) {
    errors.push('Total financing must equal purchase price');
  }

  // LTV validation
  const totalLTV = ((inputs.seniorLoanAmount + inputs.mezzanineLoanAmount) / inputs.propertyValue) * 100;
  if (totalLTV > 95) {
    errors.push('Total loan-to-value ratio cannot exceed 95%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
