import { LoanToCostInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  field?: string;
}

export function validateLoanToCostInputs(inputs: LoanToCostInputs): ValidationResult[] {
  const errors: ValidationResult[] = [];

  // Loan Amount Validation
  if (inputs.loanAmount <= 0) {
    errors.push({
      isValid: false,
      message: 'Loan amount must be greater than 0',
      field: 'loanAmount'
    });
  }

  if (inputs.loanAmount > inputs.totalProjectCost) {
    errors.push({
      isValid: false,
      message: 'Loan amount cannot exceed total project cost',
      field: 'loanAmount'
    });
  }

  // Interest Rate Validation
  if (inputs.interestRate < 0 || inputs.interestRate > 30) {
    errors.push({
      isValid: false,
      message: 'Interest rate must be between 0% and 30%',
      field: 'interestRate'
    });
  }

  // Loan Term Validation
  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push({
      isValid: false,
      message: 'Loan term must be between 1 and 50 years',
      field: 'loanTerm'
    });
  }

  // Project Cost Validation
  if (inputs.totalProjectCost <= 0) {
    errors.push({
      isValid: false,
      message: 'Total project cost must be greater than 0',
      field: 'totalProjectCost'
    });
  }

  // Cost Breakdown Validation
  const calculatedTotal = inputs.landCost + inputs.constructionCost + inputs.softCosts + inputs.contingencyCost;
  if (Math.abs(calculatedTotal - inputs.totalProjectCost) > 1000) {
    errors.push({
      isValid: false,
      message: 'Cost breakdown does not match total project cost',
      field: 'totalProjectCost'
    });
  }

  // Borrower Equity Validation
  const requiredEquity = inputs.totalProjectCost - inputs.loanAmount;
  if (inputs.borrowerEquity < requiredEquity * 0.8) {
    errors.push({
      isValid: false,
      message: 'Borrower equity may be insufficient for project requirements',
      field: 'borrowerEquity'
    });
  }

  // Credit Score Validation
  if (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push({
      isValid: false,
      message: 'Credit score must be between 300 and 850',
      field: 'borrowerCreditScore'
    });
  }

  // Construction Duration Validation
  if (inputs.constructionDuration < 1 || inputs.constructionDuration > 36) {
    errors.push({
      isValid: false,
      message: 'Construction duration must be between 1 and 36 months',
      field: 'constructionDuration'
    });
  }

  // Draw Schedule Validation
  if (inputs.drawSchedule.length === 0) {
    errors.push({
      isValid: false,
      message: 'At least one draw must be scheduled',
      field: 'drawSchedule'
    });
  }

  let totalDrawPercentage = 0;
  inputs.drawSchedule.forEach((draw, index) => {
    totalDrawPercentage += draw.percentage;
    if (draw.percentage <= 0 || draw.percentage > 100) {
      errors.push({
        isValid: false,
        message: `Draw ${index + 1} percentage must be between 1% and 100%`,
        field: 'drawSchedule'
      });
    }
  });

  if (Math.abs(totalDrawPercentage - 100) > 1) {
    errors.push({
      isValid: false,
      message: 'Draw schedule percentages must total 100%',
      field: 'drawSchedule'
    });
  }

  // Market Growth Rate Validation
  if (inputs.marketGrowthRate < -20 || inputs.marketGrowthRate > 50) {
    errors.push({
      isValid: false,
      message: 'Market growth rate must be between -20% and 50%',
      field: 'marketGrowthRate'
    });
  }

  // Exit Value Validation
  if (inputs.expectedExitValue <= inputs.totalProjectCost) {
    errors.push({
      isValid: false,
      message: 'Expected exit value should exceed total project cost',
      field: 'expectedExitValue'
    });
  }

  // Timeline Validation
  if (inputs.exitTimeline < inputs.constructionDuration) {
    errors.push({
      isValid: false,
      message: 'Exit timeline should be longer than construction duration',
      field: 'exitTimeline'
    });
  }

  return errors;
}

export function validateLoanToCostBusinessRules(inputs: LoanToCostInputs): ValidationResult[] {
  const warnings: ValidationResult[] = [];

  // LTC Ratio Warnings
  const ltcRatio = (inputs.loanAmount / inputs.totalProjectCost) * 100;
  if (ltcRatio > 85) {
    warnings.push({
      isValid: true,
      message: 'LTC ratio above 85% may indicate high risk',
      field: 'loanAmount'
    });
  }

  // Equity Contribution Warnings
  const equityPercentage = ((inputs.totalProjectCost - inputs.loanAmount) / inputs.totalProjectCost) * 100;
  if (equityPercentage < 15) {
    warnings.push({
      isValid: true,
      message: 'Equity contribution below 15% may be insufficient',
      field: 'borrowerEquity'
    });
  }

  // Borrower Experience Warnings
  if (inputs.borrowerExperience === 'none') {
    warnings.push({
      isValid: true,
      message: 'First-time borrower may require additional oversight',
      field: 'borrowerExperience'
    });
  }

  // Credit Score Warnings
  if (inputs.borrowerCreditScore < 680) {
    warnings.push({
      isValid: true,
      message: 'Credit score below 680 may affect loan terms',
      field: 'borrowerCreditScore'
    });
  }

  // Market Condition Warnings
  if (inputs.marketCondition === 'declining') {
    warnings.push({
      isValid: true,
      message: 'Declining market conditions increase project risk',
      field: 'marketCondition'
    });
  }

  // Construction Risk Warnings
  if (inputs.constructionRisk === 'high') {
    warnings.push({
      isValid: true,
      message: 'High construction risk requires additional contingencies',
      field: 'constructionRisk'
    });
  }

  return warnings;
}