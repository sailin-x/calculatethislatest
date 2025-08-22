import { NetOperatingIncomeInputs } from './validation';

export const quickValidateNetOperatingIncome = (inputs: Partial<NetOperatingIncomeInputs>): boolean => {
  // Check required fields
  if (!inputs.grossRentalIncome || inputs.grossRentalIncome <= 0) {
    return false;
  }

  if (!inputs.propertyTax || inputs.propertyTax < 0) {
    return false;
  }

  if (!inputs.insurance || inputs.insurance < 0) {
    return false;
  }

  // Check basic logical constraints
  if (inputs.vacancyLoss && inputs.vacancyLoss > inputs.grossRentalIncome) {
    return false;
  }

  if (inputs.concessions && inputs.concessions > inputs.grossRentalIncome) {
    return false;
  }

  // Check that total deductions don't exceed gross income
  if (inputs.vacancyLoss && inputs.concessions && inputs.grossRentalIncome) {
    const totalDeductions = inputs.vacancyLoss + inputs.concessions;
    if (totalDeductions > inputs.grossRentalIncome) {
      return false;
    }
  }

  // Check that required expenses don't exceed gross income
  const totalRequiredExpenses = inputs.propertyTax + inputs.insurance;
  if (totalRequiredExpenses > inputs.grossRentalIncome) {
    return false;
  }

  return true;
};