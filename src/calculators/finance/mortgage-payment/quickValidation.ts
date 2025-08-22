import { MortgagePaymentInputs } from './validation';

export const quickValidateMortgagePayment = (inputs: Partial<MortgagePaymentInputs>): boolean => {
  // Check required fields
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    return false;
  }

  if (!inputs.interestRate || inputs.interestRate < 0 || inputs.interestRate > 25) {
    return false;
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    return false;
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda', 'jumbo', 'arm'].includes(inputs.loanType)) {
    return false;
  }

  // Check basic logical constraints
  if (inputs.loanAmount > 10000000) {
    return false;
  }

  if (inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    return false;
  }

  if (inputs.downPayment && inputs.downPayment < 0) {
    return false;
  }

  if (inputs.downPaymentPercent && (inputs.downPaymentPercent < 0 || inputs.downPaymentPercent > 100)) {
    return false;
  }

  if (inputs.propertyTax && inputs.propertyTax < 0) {
    return false;
  }

  if (inputs.homeInsurance && inputs.homeInsurance < 0) {
    return false;
  }

  if (inputs.pmi && (inputs.pmi < 0 || inputs.pmi > 5)) {
    return false;
  }

  if (inputs.hoaFees && inputs.hoaFees < 0) {
    return false;
  }

  if (inputs.closingCosts && inputs.closingCosts < 0) {
    return false;
  }

  return true;
};