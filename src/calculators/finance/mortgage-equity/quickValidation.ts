import { MortgageEquityInputs } from './validation';

export const quickValidateMortgageEquity = (inputs: Partial<MortgageEquityInputs>): boolean => {
  // Basic required field checks
  if (!inputs.propertyValue || inputs.propertyValue <= 0) return false;
  if (!inputs.currentMortgageBalance || inputs.currentMortgageBalance < 0) return false;

  // Basic logical checks
  if (inputs.propertyValue && inputs.currentMortgageBalance && inputs.currentMortgageBalance > inputs.propertyValue) return false;

  // Basic range checks
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) return false;
  if (inputs.currentMortgageBalance && inputs.currentMortgageBalance > 10000000) return false;

  // Basic validation for optional fields
  if (inputs.originalPurchasePrice && (inputs.originalPurchasePrice < 10000 || inputs.originalPurchasePrice > 10000000)) return false;
  if (inputs.originalLoanAmount && (inputs.originalLoanAmount < 0 || inputs.originalLoanAmount > 10000000)) return false;
  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) return false;
  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) return false;
  if (inputs.monthlyPayment && (inputs.monthlyPayment < 0 || inputs.monthlyPayment > 50000)) return false;
  if (inputs.appreciationRate && (inputs.appreciationRate < -10 || inputs.appreciationRate > 20)) return false;
  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) return false;
  if (inputs.debtToIncomeRatio && (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100)) return false;
  if (inputs.income && (inputs.income < 0 || inputs.income > 10000000)) return false;
  if (inputs.timeHorizon && (inputs.timeHorizon < 1 || inputs.timeHorizon > 30)) return false;

  // Basic validation for debt-related fields
  if (inputs.existingHELOC && (inputs.existingHELOC < 0 || inputs.existingHELOC > 1000000)) return false;
  if (inputs.existingHomeEquityLoan && (inputs.existingHomeEquityLoan < 0 || inputs.existingHomeEquityLoan > 1000000)) return false;
  if (inputs.otherLiens && (inputs.otherLiens < 0 || inputs.otherLiens > 1000000)) return false;

  return true;
};