import { CalculatorInputs } from '../../../types/calculator';

export interface MezzanineFinancingInputs extends CalculatorInputs {
  projectValue: number;
  seniorLoanAmount: number;
  mezzanineLoanAmount: number;
  equityInvestment?: number;
  seniorLoanRate: number;
  mezzanineLoanRate: number;
  seniorLoanTerm: number;
  mezzanineLoanTerm: number;
  projectTimeline?: number;
  stabilizedNOI?: number;
  exitValue?: number;
  exitTimeline?: number;
  projectType?: string;
  propertyType?: string;
  location?: string;
  marketCondition?: string;
  lenderType?: string;
  borrowerCreditScore?: number;
  borrowerExperience?: string;
  preLeasing?: string;
  preLeasingPercentage?: number;
  environmentalIssues?: string;
  zoningIssues?: string;
  constructionRisk?: string;
  marketRisk?: string;
  exitStrategy?: string;
  seniorLenderApproval?: string;
  mezzanineFees?: number;
  mezzaninePoints?: number;
  prepaymentPenalty?: number;
  guaranteeRequired?: string;
}

export const validateMezzanineFinancingInputs = (inputs: Partial<MezzanineFinancingInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.projectValue || inputs.projectValue <= 0) {
    errors.push('Project value must be greater than 0');
  }

  if (!inputs.seniorLoanAmount || inputs.seniorLoanAmount <= 0) {
    errors.push('Senior loan amount must be greater than 0');
  }

  if (!inputs.mezzanineLoanAmount || inputs.mezzanineLoanAmount <= 0) {
    errors.push('Mezzanine loan amount must be greater than 0');
  }

  if (!inputs.seniorLoanRate || inputs.seniorLoanRate <= 0) {
    errors.push('Senior loan rate must be greater than 0');
  }

  if (!inputs.mezzanineLoanRate || inputs.mezzanineLoanRate <= 0) {
    errors.push('Mezzanine loan rate must be greater than 0');
  }

  if (!inputs.seniorLoanTerm || inputs.seniorLoanTerm <= 0) {
    errors.push('Senior loan term must be greater than 0');
  }

  if (!inputs.mezzanineLoanTerm || inputs.mezzanineLoanTerm <= 0) {
    errors.push('Mezzanine loan term must be greater than 0');
  }

  // Logical validation
  if (inputs.projectValue && inputs.seniorLoanAmount && inputs.mezzanineLoanAmount) {
    const totalDebt = inputs.seniorLoanAmount + inputs.mezzanineLoanAmount;
    if (totalDebt > inputs.projectValue) {
      errors.push('Total debt (senior + mezzanine) cannot exceed project value');
    }
  }

  if (inputs.seniorLoanAmount && inputs.mezzanineLoanAmount && inputs.projectValue) {
    const seniorLeverage = (inputs.seniorLoanAmount / inputs.projectValue) * 100;
    if (seniorLeverage > 75) {
      errors.push('Senior leverage should typically not exceed 75% of project value');
    }

    const totalLeverage = ((inputs.seniorLoanAmount + inputs.mezzanineLoanAmount) / inputs.projectValue) * 100;
    if (totalLeverage > 90) {
      errors.push('Total leverage should typically not exceed 90% of project value');
    }
  }

  if (inputs.mezzanineLoanRate && inputs.seniorLoanRate) {
    if (inputs.mezzanineLoanRate <= inputs.seniorLoanRate) {
      errors.push('Mezzanine loan rate should be higher than senior loan rate');
    }
  }

  if (inputs.mezzanineLoanTerm && inputs.seniorLoanTerm) {
    if (inputs.mezzanineLoanTerm > inputs.seniorLoanTerm) {
      errors.push('Mezzanine loan term should not exceed senior loan term');
    }
  }

  // Range validation
  if (inputs.projectValue && (inputs.projectValue < 100000 || inputs.projectValue > 1000000000)) {
    errors.push('Project value should be between $100,000 and $1,000,000,000');
  }

  if (inputs.seniorLoanAmount && (inputs.seniorLoanAmount < 100000 || inputs.seniorLoanAmount > 500000000)) {
    errors.push('Senior loan amount should be between $100,000 and $500,000,000');
  }

  if (inputs.mezzanineLoanAmount && (inputs.mezzanineLoanAmount < 100000 || inputs.mezzanineLoanAmount > 200000000)) {
    errors.push('Mezzanine loan amount should be between $100,000 and $200,000,000');
  }

  if (inputs.seniorLoanRate && (inputs.seniorLoanRate < 1 || inputs.seniorLoanRate > 15)) {
    errors.push('Senior loan rate should be between 1% and 15%');
  }

  if (inputs.mezzanineLoanRate && (inputs.mezzanineLoanRate < 8 || inputs.mezzanineLoanRate > 25)) {
    errors.push('Mezzanine loan rate should be between 8% and 25%');
  }

  if (inputs.seniorLoanTerm && (inputs.seniorLoanTerm < 1 || inputs.seniorLoanTerm > 40)) {
    errors.push('Senior loan term should be between 1 and 40 years');
  }

  if (inputs.mezzanineLoanTerm && (inputs.mezzanineLoanTerm < 1 || inputs.mezzanineLoanTerm > 10)) {
    errors.push('Mezzanine loan term should be between 1 and 10 years');
  }

  if (inputs.projectTimeline && (inputs.projectTimeline < 6 || inputs.projectTimeline > 60)) {
    errors.push('Project timeline should be between 6 and 60 months');
  }

  if (inputs.stabilizedNOI && inputs.stabilizedNOI < 0) {
    errors.push('Stabilized NOI cannot be negative');
  }

  if (inputs.exitValue && inputs.exitValue < 0) {
    errors.push('Exit value cannot be negative');
  }

  if (inputs.exitTimeline && (inputs.exitTimeline < 1 || inputs.exitTimeline > 15)) {
    errors.push('Exit timeline should be between 1 and 15 years');
  }

  if (inputs.borrowerCreditScore && (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850)) {
    errors.push('Borrower credit score should be between 300 and 850');
  }

  if (inputs.preLeasingPercentage && (inputs.preLeasingPercentage < 0 || inputs.preLeasingPercentage > 100)) {
    errors.push('Pre-leasing percentage should be between 0% and 100%');
  }

  if (inputs.mezzanineFees && inputs.mezzanineFees < 0) {
    errors.push('Mezzanine fees cannot be negative');
  }

  if (inputs.mezzaninePoints && (inputs.mezzaninePoints < 0 || inputs.mezzaninePoints > 10)) {
    errors.push('Mezzanine points should be between 0% and 10%');
  }

  if (inputs.prepaymentPenalty && (inputs.prepaymentPenalty < 0 || inputs.prepaymentPenalty > 20)) {
    errors.push('Prepayment penalty should be between 0% and 20%');
  }

  // DSCR validation
  if (inputs.stabilizedNOI && inputs.seniorLoanAmount && inputs.mezzanineLoanAmount && inputs.seniorLoanRate && inputs.mezzanineLoanRate) {
    const seniorAnnualPayment = inputs.seniorLoanAmount * (inputs.seniorLoanRate / 100);
    const mezzanineAnnualPayment = inputs.mezzanineLoanAmount * (inputs.mezzanineLoanRate / 100);
    const totalAnnualPayment = seniorAnnualPayment + mezzanineAnnualPayment;
    const dscr = inputs.stabilizedNOI / totalAnnualPayment;
    
    if (dscr < 1.0) {
      errors.push('Debt service coverage ratio should be at least 1.0 for mezzanine financing');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};