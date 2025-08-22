import { PMICancellationInputs } from './validation';

export const quickValidatePMICancellation = (inputs: Partial<PMICancellationInputs>): boolean => {
  // Check required fields
  if (!inputs.originalLoanAmount || inputs.originalLoanAmount <= 0) {
    return false;
  }

  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    return false;
  }

  if (!inputs.originalPropertyValue || inputs.originalPropertyValue <= 0) {
    return false;
  }

  if (!inputs.pmiRate || inputs.pmiRate <= 0) {
    return false;
  }

  if (!inputs.loanType) {
    return false;
  }

  if (!inputs.loanStartDate) {
    return false;
  }

  // Check basic logical constraints
  if (inputs.currentLoanBalance > inputs.originalLoanAmount) {
    return false;
  }

  if (inputs.currentPropertyValue && inputs.currentLoanBalance > inputs.currentPropertyValue) {
    return false;
  }

  if (inputs.currentPropertyValue && inputs.currentPropertyValue < inputs.originalPropertyValue * 0.5) {
    return false;
  }

  // Check date validity
  const loanStartDate = new Date(inputs.loanStartDate);
  const now = new Date();
  
  if (isNaN(loanStartDate.getTime()) || loanStartDate > now) {
    return false;
  }

  // Check LTV is reasonable
  if (inputs.currentLoanBalance && inputs.currentPropertyValue) {
    const currentLTV = (inputs.currentLoanBalance / inputs.currentPropertyValue) * 100;
    if (currentLTV > 100 || currentLTV < 50) {
      return false;
    }
  }

  return true;
};