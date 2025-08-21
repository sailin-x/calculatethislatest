import { MortgageInsuranceInputs } from './validation';

export const quickValidateMortgageInsurance = (inputs: Partial<MortgageInsuranceInputs>): boolean => {
  // Check required fields
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    return false;
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    return false;
  }

  if (!inputs.loanType) {
    return false;
  }

  // Check basic range validation
  if (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000) {
    return false;
  }

  if (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000) {
    return false;
  }

  // Check logical validation
  if (inputs.loanAmount > inputs.propertyValue) {
    return false;
  }

  if (inputs.downPayment && inputs.downPayment > inputs.propertyValue) {
    return false;
  }

  // Check loan type specific validation
  if (inputs.loanType === 'FHA') {
    if (inputs.fhaUpfrontMIP && (inputs.fhaUpfrontMIP < 0 || inputs.fhaUpfrontMIP > 10)) {
      return false;
    }
    if (inputs.fhaAnnualMIP && (inputs.fhaAnnualMIP < 0 || inputs.fhaAnnualMIP > 5)) {
      return false;
    }
  }

  if (inputs.loanType === 'VA') {
    if (inputs.vaFundingFee && (inputs.vaFundingFee < 0 || inputs.vaFundingFee > 10)) {
      return false;
    }
  }

  if (inputs.loanType === 'USDA') {
    if (inputs.usdaGuaranteeFee && (inputs.usdaGuaranteeFee < 0 || inputs.usdaGuaranteeFee > 5)) {
      return false;
    }
  }

  if (inputs.loanType === 'Conventional' || inputs.loanType === 'Jumbo') {
    if (inputs.pmiRate && (inputs.pmiRate < 0 || inputs.pmiRate > 2)) {
      return false;
    }
  }

  // Check credit score validation
  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    return false;
  }

  // Check debt-to-income ratio validation
  if (inputs.debtToIncomeRatio && (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100)) {
    return false;
  }

  // Check loan term validation
  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    return false;
  }

  // Check interest rate validation
  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    return false;
  }

  // Check monthly payment validation
  if (inputs.monthlyPayment && (inputs.monthlyPayment < 0 || inputs.monthlyPayment > 50000)) {
    return false;
  }

  // Check PMI cancellation threshold validation
  if (inputs.pmiCancellationThreshold && (inputs.pmiCancellationThreshold < 70 || inputs.pmiCancellationThreshold > 85)) {
    return false;
  }

  // Check property appreciation rate validation
  if (inputs.propertyAppreciationRate && (inputs.propertyAppreciationRate < -10 || inputs.propertyAppreciationRate > 20)) {
    return false;
  }

  // Check additional principal payment validation
  if (inputs.additionalPrincipalPayment && (inputs.additionalPrincipalPayment < 0 || inputs.additionalPrincipalPayment > 10000)) {
    return false;
  }

  // Check refinance rate validation
  if (inputs.refinanceRate && (inputs.refinanceRate < 0 || inputs.refinanceRate > 25)) {
    return false;
  }

  // Check refinance closing costs validation
  if (inputs.refinanceClosingCosts && (inputs.refinanceClosingCosts < 0 || inputs.refinanceClosingCosts > 50000)) {
    return false;
  }

  // Check time horizon validation
  if (inputs.timeHorizon && (inputs.timeHorizon < 1 || inputs.timeHorizon > 30)) {
    return false;
  }

  // Check down payment percentage validation
  if (inputs.downPaymentPercentage && (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100)) {
    return false;
  }

  // Check down payment consistency
  if (inputs.downPayment && inputs.downPaymentPercentage && inputs.propertyValue) {
    const calculatedDownPayment = inputs.propertyValue * (inputs.downPaymentPercentage / 100);
    const difference = Math.abs(inputs.downPayment - calculatedDownPayment);
    if (difference > 1000) {
      return false;
    }
  }

  return true;
};