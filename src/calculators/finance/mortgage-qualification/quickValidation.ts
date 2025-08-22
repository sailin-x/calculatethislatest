import { MortgageQualificationInputs } from './validation';

export const quickValidateMortgageQualification = (inputs: Partial<MortgageQualificationInputs>): boolean => {
  // Check essential required fields
  if (!inputs.downPayment && inputs.downPayment !== 0) return false;
  if (!inputs.propertyPrice && inputs.propertyPrice !== 0) return false;
  if (!inputs.interestRate && inputs.interestRate !== 0) return false;
  if (!inputs.loanTerm && inputs.loanTerm !== 0) return false;
  if (!inputs.loanType) return false;
  if (!inputs.creditScore && inputs.creditScore !== 0) return false;
  if (!inputs.monthlyDebts && inputs.monthlyDebts !== 0) return false;
  if (!inputs.propertyTax && inputs.propertyTax !== 0) return false;
  if (!inputs.homeInsurance && inputs.homeInsurance !== 0) return false;
  if (!inputs.hoa && inputs.hoa !== 0) return false;
  if (!inputs.pmi && inputs.pmi !== 0) return false;
  if (!inputs.closingCosts && inputs.closingCosts !== 0) return false;
  if (!inputs.cashReserves && inputs.cashReserves !== 0) return false;
  if (!inputs.employmentType) return false;
  if (!inputs.employmentLength && inputs.employmentLength !== 0) return false;
  if (!inputs.debtTypes) return false;
  if (inputs.bankruptcyHistory === undefined) return false;
  if (inputs.foreclosureHistory === undefined) return false;
  if (inputs.includePropertyTax === undefined) return false;
  if (inputs.includeHomeInsurance === undefined) return false;
  if (inputs.includeHOA === undefined) return false;
  if (inputs.includePMI === undefined) return false;
  if (inputs.includeClosingCosts === undefined) return false;
  if (!inputs.qualificationMethod) return false;

  // Check that either annual or monthly income is provided
  if (!inputs.annualIncome && !inputs.monthlyIncome) return false;

  // Basic range checks
  if (inputs.downPayment !== undefined && inputs.downPayment < 0) return false;
  if (inputs.propertyPrice !== undefined && inputs.propertyPrice <= 0) return false;
  if (inputs.interestRate !== undefined && (inputs.interestRate < 0 || inputs.interestRate > 25)) return false;
  if (inputs.loanTerm !== undefined && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) return false;
  if (inputs.creditScore !== undefined && (inputs.creditScore < 300 || inputs.creditScore > 850)) return false;
  if (inputs.monthlyDebts !== undefined && inputs.monthlyDebts < 0) return false;

  // Basic logical checks
  if (inputs.downPayment !== undefined && inputs.propertyPrice !== undefined && inputs.downPayment > inputs.propertyPrice) return false;

  return true;
};