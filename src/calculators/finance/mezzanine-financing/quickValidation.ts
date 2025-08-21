import { MezzanineFinancingInputs } from './validation';

export const quickValidateMezzanineFinancing = (inputs: Partial<MezzanineFinancingInputs>): boolean => {
  // Basic required field checks
  if (!inputs.projectValue || inputs.projectValue <= 0) return false;
  if (!inputs.seniorLoanAmount || inputs.seniorLoanAmount <= 0) return false;
  if (!inputs.mezzanineLoanAmount || inputs.mezzanineLoanAmount <= 0) return false;
  if (!inputs.seniorLoanRate || inputs.seniorLoanRate <= 0) return false;
  if (!inputs.mezzanineLoanRate || inputs.mezzanineLoanRate <= 0) return false;
  if (!inputs.seniorLoanTerm || inputs.seniorLoanTerm <= 0) return false;
  if (!inputs.mezzanineLoanTerm || inputs.mezzanineLoanTerm <= 0) return false;

  // Basic logical checks
  if (inputs.seniorLoanAmount && inputs.mezzanineLoanAmount && inputs.projectValue) {
    const totalDebt = inputs.seniorLoanAmount + inputs.mezzanineLoanAmount;
    if (totalDebt > inputs.projectValue) return false;
  }

  if (inputs.mezzanineLoanRate && inputs.seniorLoanRate) {
    if (inputs.mezzanineLoanRate <= inputs.seniorLoanRate) return false;
  }

  if (inputs.mezzanineLoanTerm && inputs.seniorLoanTerm) {
    if (inputs.mezzanineLoanTerm > inputs.seniorLoanTerm) return false;
  }

  return true;
};