import { MortgageAPRComparisonInputs } from './validation';

export const quickValidateMortgageAPRComparison = (inputs: Partial<MortgageAPRComparisonInputs>): boolean => {
  // Basic required field checks
  if (!inputs.loanAmount || inputs.loanAmount <= 0) return false;
  if (!inputs.loanTerm || inputs.loanTerm <= 0) return false;
  if (!inputs.mortgageOptions || inputs.mortgageOptions.length < 2) return false;

  // Basic validation for each mortgage option
  for (const option of inputs.mortgageOptions) {
    if (!option.id || !option.name || !option.interestRate || option.interestRate <= 0) {
      return false;
    }
  }

  // Check for duplicate option IDs
  const ids = inputs.mortgageOptions.map(option => option.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    return false;
  }

  return true;
};