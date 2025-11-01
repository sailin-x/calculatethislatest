import { PmiCancellationInputs } from './types';

export function validatePmiCancellationInputs(inputs: PmiCancellationInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan amount validation
  if (!inputs.originalLoanAmount || inputs.originalLoanAmount <= 0) {
    errors.push({ field: 'originalLoanAmount', message: 'Original loan amount must be greater than 0' });
  }
  if (inputs.originalLoanAmount && inputs.originalLoanAmount > 10000000) {
    errors.push({ field: 'originalLoanAmount', message: 'Original loan amount cannot exceed $10,000,000' });
  }

  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.push({ field: 'currentLoanBalance', message: 'Current loan balance must be greater than 0' });
  }
  if (inputs.currentLoanBalance && inputs.currentLoanBalance > inputs.originalLoanAmount) {
    errors.push({ field: 'currentLoanBalance', message: 'Current loan balance cannot exceed original loan amount' });
  }

  // Interest rate validation
  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0% and 20%' });
  }

  // Property value validation
  if (!inputs.originalPropertyValue || inputs.originalPropertyValue <= 0) {
    errors.push({ field: 'originalPropertyValue', message: 'Original property value must be greater than 0' });
  }

  if (!inputs.currentPropertyValue || inputs.currentPropertyValue <= 0) {
    errors.push({ field: 'currentPropertyValue', message: 'Current property value must be greater than 0' });
  }

  // PMI validation
  if (inputs.pmiRate < 0 || inputs.pmiRate > 5) {
    errors.push({ field: 'pmiRate', message: 'PMI rate must be between 0% and 5%' });
  }

  if (!inputs.monthlyPmiPayment || inputs.monthlyPmiPayment < 0) {
    errors.push({ field: 'monthlyPmiPayment', message: 'Monthly PMI payment cannot be negative' });
  }

  // Equity validation
  if (inputs.currentEquity < 0) {
    errors.push({ field: 'currentEquity', message: 'Current equity cannot be negative' });
  }

  if (inputs.loanToValueRatio < 0 || inputs.loanToValueRatio > 100) {
    errors.push({ field: 'loanToValueRatio', message: 'Loan-to-value ratio must be between 0% and 100%' });
  }

  // Timeline validation
  if (inputs.monthsSinceOrigination < 0) {
    errors.push({ field: 'monthsSinceOrigination', message: 'Months since origination cannot be negative' });
  }

  if (inputs.yearsSinceOrigination < 0) {
    errors.push({ field: 'yearsSinceOrigination', message: 'Years since origination cannot be negative' });
  }

  // Cancellation LTV validation
  if (inputs.automaticCancellationLtv < 0 || inputs.automaticCancellationLtv > 100) {
    errors.push({ field: 'automaticCancellationLtv', message: 'Automatic cancellation LTV must be between 0% and 100%' });
  }

  if (inputs.lenderCancellationLtv < 0 || inputs.lenderCancellationLtv > 100) {
    errors.push({ field: 'lenderCancellationLtv', message: 'Lender cancellation LTV must be between 0% and 100%' });
  }

  if (inputs.automaticCancellationLtv < inputs.lenderCancellationLtv) {
    errors.push({ field: 'automaticCancellationLtv', message: 'Automatic cancellation LTV should be higher than lender cancellation LTV' });
  }

  // Cost validation
  if (inputs.appraisalFee < 0) {
    errors.push({ field: 'appraisalFee', message: 'Appraisal fee cannot be negative' });
  }

  if (inputs.titleSearchFee < 0) {
    errors.push({ field: 'titleSearchFee', message: 'Title search fee cannot be negative' });
  }

  if (inputs.otherFees < 0) {
    errors.push({ field: 'otherFees', message: 'Other fees cannot be negative' });
  }

  // Tax rate validation
  if (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50) {
    errors.push({ field: 'marginalTaxRate', message: 'Marginal tax rate must be between 0% and 50%' });
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push({ field: 'stateTaxRate', message: 'State tax rate must be between 0% and 20%' });
  }

  // Future projections validation
  if (inputs.expectedPropertyAppreciation < -10 || inputs.expectedPropertyAppreciation > 30) {
    errors.push({ field: 'expectedPropertyAppreciation', message: 'Expected property appreciation must be between -10% and 30%' });
  }

  // Loan term validation
  if (!inputs.originalLoanTerm || inputs.originalLoanTerm <= 0) {
    errors.push({ field: 'originalLoanTerm', message: 'Original loan term must be greater than 0 years' });
  }
  if (inputs.originalLoanTerm && inputs.originalLoanTerm > 50) {
    errors.push({ field: 'originalLoanTerm', message: 'Original loan term cannot exceed 50 years' });
  }

  if (!inputs.remainingTerm || inputs.remainingTerm < 0) {
    errors.push({ field: 'remainingTerm', message: 'Remaining term cannot be negative' });
  }
  if (inputs.remainingTerm && inputs.remainingTerm > inputs.originalLoanTerm) {
    errors.push({ field: 'remainingTerm', message: 'Remaining term cannot exceed original loan term' });
  }

  return errors;
}

export function validatePmiCancellationBusinessRules(inputs: PmiCancellationInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // LTV ratio consistency check
  const calculatedLtv = (inputs.currentLoanBalance / inputs.currentPropertyValue) * 100;
  if (Math.abs(calculatedLtv - inputs.loanToValueRatio) > 1) {
    warnings.push({ field: 'loanToValueRatio', message: 'LTV ratio does not match calculated value from loan balance and property value' });
  }

  // Equity consistency check
  const calculatedEquity = inputs.currentPropertyValue - inputs.currentLoanBalance;
  if (Math.abs(calculatedEquity - inputs.currentEquity) > 1) {
    warnings.push({ field: 'currentEquity', message: 'Current equity does not match calculated value' });
  }

  // PMI eligibility check
  if (inputs.originalLoanAmount / inputs.originalPropertyValue > 0.8) {
    warnings.push({ field: 'originalLoanAmount', message: 'PMI is typically required for loans above 80% LTV' });
  }

  // Timeline warnings
  if (inputs.monthsSinceOrigination < 24) {
    warnings.push({ field: 'monthsSinceOrigination', message: 'PMI cancellation typically requires 2 years of payments' });
  }

  // LTV threshold warnings
  if (inputs.automaticCancellationLtv > 80) {
    warnings.push({ field: 'automaticCancellationLtv', message: 'Automatic cancellation LTV above 80% may not be standard' });
  }

  if (inputs.lenderCancellationLtv > 78) {
    warnings.push({ field: 'lenderCancellationLtv', message: 'Lender cancellation LTV above 78% may not be standard' });
  }

  // Property value change warnings
  const propertyValueChange = ((inputs.currentPropertyValue - inputs.originalPropertyValue) / inputs.originalPropertyValue) * 100;
  if (propertyValueChange < -10) {
    warnings.push({ field: 'currentPropertyValue', message: 'Significant property value decline may affect cancellation eligibility' });
  }

  // PMI payment validation
  const estimatedPmiPayment = (inputs.originalLoanAmount * inputs.pmiRate / 100) / 12;
  if (Math.abs(estimatedPmiPayment - inputs.monthlyPmiPayment) > estimatedPmiPayment * 0.2) {
    warnings.push({ field: 'monthlyPmiPayment', message: 'PMI payment does not match estimated amount based on loan amount and rate' });
  }

  // Break-even analysis warnings
  const totalFees = inputs.appraisalFee + inputs.titleSearchFee + inputs.otherFees;
  const annualSavings = inputs.monthlyPmiPayment * 12;
  if (totalFees > annualSavings * 2) {
    warnings.push({ field: 'appraisalFee', message: 'Cancellation costs are high relative to PMI savings' });
  }

  // Interest rate warnings
  if (inputs.interestRate > 8) {
    warnings.push({ field: 'interestRate', message: 'High interest rate may indicate refinance opportunity' });
  }

  // Remaining term warnings
  if (inputs.remainingTerm < 5) {
    warnings.push({ field: 'remainingTerm', message: 'Short remaining term may make cancellation less beneficial' });
  }

  // Tax rate warnings
  if (inputs.marginalTaxRate > 37) {
    warnings.push({ field: 'marginalTaxRate', message: 'High marginal tax rate increases value of PMI deduction' });
  }

  // Appreciation rate warnings
  if (inputs.expectedPropertyAppreciation < 0) {
    warnings.push({ field: 'expectedPropertyAppreciation', message: 'Negative appreciation may delay natural cancellation' });
  }

  // Loan balance vs original amount
  const paydownPercentage = ((inputs.originalLoanAmount - inputs.currentLoanBalance) / inputs.originalLoanAmount) * 100;
  if (paydownPercentage < 5 && inputs.monthsSinceOrigination > 24) {
    warnings.push({ field: 'currentLoanBalance', message: 'Low principal paydown may indicate extra payments or loan modification' });
  }

  // PMI rate warnings
  if (inputs.pmiRate > 1.5) {
    warnings.push({ field: 'pmiRate', message: 'High PMI rate - consider if rate is correct for loan amount' });
  }

  // Property type considerations
  if (inputs.expectedPropertyAppreciation > 10) {
    warnings.push({ field: 'expectedPropertyAppreciation', message: 'Very high appreciation expectations may be unrealistic' });
  }

  // Cost breakdown warnings
  if (inputs.appraisalFee > 500) {
    warnings.push({ field: 'appraisalFee', message: 'High appraisal fee - shop around for better rates' });
  }

  // Federal vs state requirements
  if (inputs.automaticCancellationLtv !== 78 && inputs.automaticCancellationLtv !== 80) {
    warnings.push({ field: 'automaticCancellationLtv', message: 'Automatic cancellation LTV should typically be 78% or 80%' });
  }

  // Market condition warnings
  if (inputs.expectedPropertyAppreciation < 2) {
    warnings.push({ field: 'expectedPropertyAppreciation', message: 'Low appreciation may extend time to natural cancellation' });
  }

  return warnings;
}