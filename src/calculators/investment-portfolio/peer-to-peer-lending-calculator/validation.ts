import { PeerToPeerLendingCalculatorInputs } from './types';

export function validatePeerToPeerLendingCalculatorInputs(inputs: PeerToPeerLendingCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Investment Amount Validation
  if (!inputs.investmentAmount || inputs.investmentAmount <= 0) {
    errors.push({ field: 'investmentAmount', message: 'Investment amount must be greater than 0' });
  }
  if (inputs.investmentAmount && inputs.investmentAmount > 1000000) {
    errors.push({ field: 'investmentAmount', message: 'Investment amount cannot exceed $1,000,000' });
  }

  // Annual Interest Rate Validation
  if (inputs.annualInterestRate === undefined || inputs.annualInterestRate < 0) {
    errors.push({ field: 'annualInterestRate', message: 'Annual interest rate cannot be negative' });
  }
  if (inputs.annualInterestRate && inputs.annualInterestRate > 50) {
    errors.push({ field: 'annualInterestRate', message: 'Annual interest rate cannot exceed 50%' });
  }

  // Expected Default Rate Validation
  if (inputs.expectedDefaultRate === undefined || inputs.expectedDefaultRate < 0) {
    errors.push({ field: 'expectedDefaultRate', message: 'Expected default rate cannot be negative' });
  }
  if (inputs.expectedDefaultRate && inputs.expectedDefaultRate > 100) {
    errors.push({ field: 'expectedDefaultRate', message: 'Expected default rate cannot exceed 100%' });
  }

  // Term in Years Validation
  if (!inputs.termInYears || inputs.termInYears <= 0) {
    errors.push({ field: 'termInYears', message: 'Term in years must be greater than 0' });
  }
  if (inputs.termInYears && inputs.termInYears > 30) {
    errors.push({ field: 'termInYears', message: 'Term in years cannot exceed 30' });
  }

  return errors;
}

export function validatePeerToPeerLendingCalculatorBusinessRules(inputs: PeerToPeerLendingCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // High Investment Amount Warning
  if (inputs.investmentAmount && inputs.investmentAmount > 500000) {
    warnings.push({ field: 'investmentAmount', message: 'High investment amounts may require additional risk assessment' });
  }

  // High Default Rate Warning
  if (inputs.expectedDefaultRate && inputs.expectedDefaultRate > 0.05) {
    warnings.push({ field: 'expectedDefaultRate', message: 'High expected default rate indicates significant risk' });
  }

  // Low Interest Rate Warning
  if (inputs.annualInterestRate && inputs.expectedDefaultRate && inputs.annualInterestRate <= inputs.expectedDefaultRate) {
    warnings.push({ field: 'annualInterestRate', message: 'Interest rate does not exceed expected default rate - consider higher return investments' });
  }

  // Long Term Warning
  if (inputs.termInYears && inputs.termInYears > 10) {
    warnings.push({ field: 'termInYears', message: 'Long investment terms increase exposure to default risk' });
  }

  return warnings;
}