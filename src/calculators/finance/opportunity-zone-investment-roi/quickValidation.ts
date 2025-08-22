import { OpportunityZoneInvestmentROIInputs } from './validation';

export const quickValidateOpportunityZoneInvestmentROI = (inputs: Partial<OpportunityZoneInvestmentROIInputs>): boolean => {
  // Check required fields
  if (!inputs.initialInvestment || inputs.initialInvestment <= 0) {
    return false;
  }

  if (!inputs.capitalGainsAmount || inputs.capitalGainsAmount <= 0) {
    return false;
  }

  if (!inputs.investmentPeriod || inputs.investmentPeriod <= 0) {
    return false;
  }

  if (!inputs.annualReturn || inputs.annualReturn <= 0) {
    return false;
  }

  if (!inputs.taxRate || inputs.taxRate < 0) {
    return false;
  }

  // Check basic logical constraints
  if (inputs.capitalGainsAmount && inputs.initialInvestment && inputs.capitalGainsAmount > inputs.initialInvestment) {
    return false;
  }

  if (inputs.annualIncome && inputs.operatingExpenses && inputs.operatingExpenses > inputs.annualIncome) {
    return false;
  }

  if (inputs.exitValue && inputs.exitCosts && inputs.exitCosts > inputs.exitValue) {
    return false;
  }

  // Check investment period for tax benefits
  if (inputs.investmentPeriod && inputs.investmentPeriod < 5) {
    return false;
  }

  return true;
};