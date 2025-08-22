import { MortgageRefinanceInputs } from './validation';

export const quickValidateMortgageRefinance = (inputs: Partial<MortgageRefinanceInputs>): boolean => {
  // Check essential required fields
  if (!inputs.currentLoanAmount && inputs.currentLoanAmount !== 0) return false;
  if (!inputs.currentRate && inputs.currentRate !== 0) return false;
  if (!inputs.currentTerm && inputs.currentTerm !== 0) return false;
  if (!inputs.currentMonthlyPayment && inputs.currentMonthlyPayment !== 0) return false;
  if (!inputs.newRate && inputs.newRate !== 0) return false;
  if (!inputs.newTerm && inputs.newTerm !== 0) return false;
  if (!inputs.refinanceCosts && inputs.refinanceCosts !== 0) return false;
  if (!inputs.propertyValue && inputs.propertyValue !== 0) return false;
  if (!inputs.refinanceType) return false;
  if (!inputs.loanType) return false;

  // Basic range checks
  if (inputs.currentRate !== undefined && (inputs.currentRate < 0 || inputs.currentRate > 25)) return false;
  if (inputs.newRate !== undefined && (inputs.newRate < 0 || inputs.newRate > 25)) return false;
  if (inputs.currentLoanAmount !== undefined && (inputs.currentLoanAmount < 1000 || inputs.currentLoanAmount > 10000000)) return false;
  if (inputs.propertyValue !== undefined && (inputs.propertyValue < 1000 || inputs.propertyValue > 10000000)) return false;
  if (inputs.currentTerm !== undefined && (inputs.currentTerm < 1 || inputs.currentTerm > 50)) return false;
  if (inputs.newTerm !== undefined && (inputs.newTerm < 1 || inputs.newTerm > 50)) return false;
  if (inputs.currentMonthlyPayment !== undefined && (inputs.currentMonthlyPayment < 100 || inputs.currentMonthlyPayment > 50000)) return false;
  if (inputs.refinanceCosts !== undefined && (inputs.refinanceCosts < 0 || inputs.refinanceCosts > 50000)) return false;

  // Basic logical checks
  if (inputs.currentLoanAmount !== undefined && inputs.propertyValue !== undefined && inputs.currentLoanAmount > inputs.propertyValue) return false;

  // Cash-out specific checks
  if (inputs.refinanceType === 'cash-out' && inputs.cashOutAmount !== undefined && inputs.cashOutAmount <= 0) return false;

  return true;
};