import { MortgageVsRentInputs } from './validation';

export const quickValidateMortgageVsRent = (inputs: Partial<MortgageVsRentInputs>): boolean => {
  // Check essential required fields
  if (!inputs.homePrice && inputs.homePrice !== 0) return false;
  if (!inputs.downPayment && inputs.downPayment !== 0) return false;
  if (!inputs.interestRate && inputs.interestRate !== 0) return false;
  if (!inputs.loanTerm && inputs.loanTerm !== 0) return false;
  if (!inputs.monthlyRent && inputs.monthlyRent !== 0) return false;
  if (!inputs.propertyTax && inputs.propertyTax !== 0) return false;
  if (!inputs.homeInsurance && inputs.homeInsurance !== 0) return false;
  if (!inputs.closingCosts && inputs.closingCosts !== 0) return false;

  // Basic range checks
  if (inputs.homePrice !== undefined && (inputs.homePrice < 50000 || inputs.homePrice > 10000000)) return false;
  if (inputs.downPayment !== undefined && (inputs.downPayment < 0 || inputs.downPayment > 1000000)) return false;
  if (inputs.interestRate !== undefined && (inputs.interestRate < 0 || inputs.interestRate > 25)) return false;
  if (inputs.loanTerm !== undefined && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) return false;
  if (inputs.monthlyRent !== undefined && (inputs.monthlyRent < 100 || inputs.monthlyRent > 50000)) return false;
  if (inputs.propertyTax !== undefined && (inputs.propertyTax < 0 || inputs.propertyTax > 100000)) return false;
  if (inputs.homeInsurance !== undefined && (inputs.homeInsurance < 0 || inputs.homeInsurance > 10000)) return false;
  if (inputs.closingCosts !== undefined && (inputs.closingCosts < 0 || inputs.closingCosts > 50000)) return false;

  // Basic logical checks
  if (inputs.downPayment !== undefined && inputs.homePrice !== undefined && inputs.downPayment > inputs.homePrice) return false;

  return true;
};