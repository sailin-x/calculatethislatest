import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateLoanAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan amount is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan amount must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Loan amount must be at least $100,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Interest rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  
  if (numValue > 25) {
    return { isValid: false, message: 'Interest rate cannot exceed 25%' };
  }
  
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan term is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  
  if (numValue < 6) {
    return { isValid: false, message: 'Loan term must be at least 6 months' };
  }
  
  if (numValue > 36) {
    return { isValid: false, message: 'Loan term cannot exceed 36 months' };
  }
  
  return { isValid: true };
}

export function validateConstructionPeriod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Construction period is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Construction period must be a valid number' };
  }
  
  if (numValue < 3) {
    return { isValid: false, message: 'Construction period must be at least 3 months' };
  }
  
  if (numValue > 24) {
    return { isValid: false, message: 'Construction period cannot exceed 24 months' };
  }
  
  return { isValid: true };
}

export function validateProjectCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Project cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Project cost must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Project cost must be at least $100,000' };
  }
  
  if (numValue > 200000000) {
    return { isValid: false, message: 'Project cost cannot exceed $200,000,000' };
  }
  
  return { isValid: true };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Land cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Land cost cannot be negative' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Land cost cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Construction cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Construction cost must be a valid number' };
  }
  
  if (numValue < 50000) {
    return { isValid: false, message: 'Construction cost must be at least $50,000' };
  }
  
  if (numValue > 150000000) {
    return { isValid: false, message: 'Construction cost cannot exceed $150,000,000' };
  }
  
  return { isValid: true };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Soft costs is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Soft costs must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Soft costs cannot be negative' };
  }
  
  if (numValue > 50000000) {
    return { isValid: false, message: 'Soft costs cannot exceed $50,000,000' };
  }
  
  return { isValid: true };
}

export function validateContingency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Contingency is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Contingency must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Contingency cannot be negative' };
  }
  
  if (numValue > 20000000) {
    return { isValid: false, message: 'Contingency cannot exceed $20,000,000' };
  }
  
  return { isValid: true };
}

export function validateEquityContribution(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Equity contribution is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Equity contribution must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Equity contribution cannot be negative' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Equity contribution cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateInterestReserve(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Interest reserve is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest reserve must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Interest reserve cannot be negative' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Interest reserve cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function validateOriginationFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Origination fee is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Origination fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Origination fee cannot be negative' };
  }
  
  if (numValue > 5) {
    return { isValid: false, message: 'Origination fee cannot exceed 5%' };
  }
  
  return { isValid: true };
}

export function validateAppraisalFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Appraisal fee is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Appraisal fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Appraisal fee cannot be negative' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Appraisal fee cannot exceed $10,000' };
  }
  
  return { isValid: true };
}

export function validateLegalFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Legal fee is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Legal fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Legal fee cannot be negative' };
  }
  
  if (numValue > 25000) {
    return { isValid: false, message: 'Legal fee cannot exceed $25,000' };
  }
  
  return { isValid: true };
}

export function validateTitleFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Title fee is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Title fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Title fee cannot be negative' };
  }
  
  if (numValue > 15000) {
    return { isValid: false, message: 'Title fee cannot exceed $15,000' };
  }
  
  return { isValid: true };
}

export function validateInspectionFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Inspection fee is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Inspection fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Inspection fee cannot be negative' };
  }
  
  if (numValue > 20000) {
    return { isValid: false, message: 'Inspection fee cannot exceed $20,000' };
  }
  
  return { isValid: true };
}

export function validateLoanToCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan-to-cost ratio is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan-to-cost ratio must be a valid number' };
  }
  
  if (numValue < 50) {
    return { isValid: false, message: 'Loan-to-cost ratio must be at least 50%' };
  }
  
  if (numValue > 90) {
    return { isValid: false, message: 'Loan-to-cost ratio cannot exceed 90%' };
  }
  
  return { isValid: true };
}

export function validateLoanToValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan-to-value ratio is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan-to-value ratio must be a valid number' };
  }
  
  if (numValue < 50) {
    return { isValid: false, message: 'Loan-to-value ratio must be at least 50%' };
  }
  
  if (numValue > 85) {
    return { isValid: false, message: 'Loan-to-value ratio cannot exceed 85%' };
  }
  
  return { isValid: true };
}

export function validateCompletionValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Completion value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Completion value must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Completion value must be at least $100,000' };
  }
  
  if (numValue > 300000000) {
    return { isValid: false, message: 'Completion value cannot exceed $300,000,000' };
  }
  
  return { isValid: true };
}

export function validateProjectType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'land-development', 'renovation'];
  
  if (!value) {
    return { isValid: false, message: 'Project type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid project type' };
  }
  
  return { isValid: true };
}

export function validateDrawSchedule(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validSchedules = ['monthly', 'bi-monthly', 'quarterly', 'milestone'];
  
  if (!value) {
    return { isValid: false, message: 'Draw schedule is required' };
  }
  
  if (!validSchedules.includes(value)) {
    return { isValid: false, message: 'Please select a valid draw schedule' };
  }
  
  return { isValid: true };
}

export function validateExitStrategy(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStrategies = ['sale', 'refinance', 'hold', 'lease'];
  
  if (!value) {
    return { isValid: false, message: 'Exit strategy is required' };
  }
  
  if (!validStrategies.includes(value)) {
    return { isValid: false, message: 'Please select a valid exit strategy' };
  }
  
  return { isValid: true };
}

export function validateConstructionStartDate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Construction start date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Please enter a valid date' };
  }
  
  return { isValid: true };
}

export function validateCompletionDate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Completion date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Please enter a valid date' };
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllConstructionLoanInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const loanAmountValidation = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountValidation.isValid) {
    errors.push(loanAmountValidation.message!);
  }
  
  const interestRateValidation = validateInterestRate(inputs.interestRate);
  if (!interestRateValidation.isValid) {
    errors.push(interestRateValidation.message!);
  }
  
  const loanTermValidation = validateLoanTerm(inputs.loanTerm);
  if (!loanTermValidation.isValid) {
    errors.push(loanTermValidation.message!);
  }
  
  const constructionPeriodValidation = validateConstructionPeriod(inputs.constructionPeriod);
  if (!constructionPeriodValidation.isValid) {
    errors.push(constructionPeriodValidation.message!);
  }
  
  const projectCostValidation = validateProjectCost(inputs.projectCost);
  if (!projectCostValidation.isValid) {
    errors.push(projectCostValidation.message!);
  }
  
  const landCostValidation = validateLandCost(inputs.landCost);
  if (!landCostValidation.isValid) {
    errors.push(landCostValidation.message!);
  }
  
  const constructionCostValidation = validateConstructionCost(inputs.constructionCost);
  if (!constructionCostValidation.isValid) {
    errors.push(constructionCostValidation.message!);
  }
  
  const softCostsValidation = validateSoftCosts(inputs.softCosts);
  if (!softCostsValidation.isValid) {
    errors.push(softCostsValidation.message!);
  }
  
  const contingencyValidation = validateContingency(inputs.contingency);
  if (!contingencyValidation.isValid) {
    errors.push(contingencyValidation.message!);
  }
  
  const equityContributionValidation = validateEquityContribution(inputs.equityContribution);
  if (!equityContributionValidation.isValid) {
    errors.push(equityContributionValidation.message!);
  }
  
  const interestReserveValidation = validateInterestReserve(inputs.interestReserve);
  if (!interestReserveValidation.isValid) {
    errors.push(interestReserveValidation.message!);
  }
  
  const originationFeeValidation = validateOriginationFee(inputs.originationFee);
  if (!originationFeeValidation.isValid) {
    errors.push(originationFeeValidation.message!);
  }
  
  const appraisalFeeValidation = validateAppraisalFee(inputs.appraisalFee);
  if (!appraisalFeeValidation.isValid) {
    errors.push(appraisalFeeValidation.message!);
  }
  
  const legalFeeValidation = validateLegalFee(inputs.legalFee);
  if (!legalFeeValidation.isValid) {
    errors.push(legalFeeValidation.message!);
  }
  
  const titleFeeValidation = validateTitleFee(inputs.titleFee);
  if (!titleFeeValidation.isValid) {
    errors.push(titleFeeValidation.message!);
  }
  
  const inspectionFeeValidation = validateInspectionFee(inputs.inspectionFee);
  if (!inspectionFeeValidation.isValid) {
    errors.push(inspectionFeeValidation.message!);
  }
  
  const loanToCostValidation = validateLoanToCost(inputs.loanToCost);
  if (!loanToCostValidation.isValid) {
    errors.push(loanToCostValidation.message!);
  }
  
  const loanToValueValidation = validateLoanToValue(inputs.loanToValue);
  if (!loanToValueValidation.isValid) {
    errors.push(loanToValueValidation.message!);
  }
  
  const completionValueValidation = validateCompletionValue(inputs.completionValue);
  if (!completionValueValidation.isValid) {
    errors.push(completionValueValidation.message!);
  }
  
  const projectTypeValidation = validateProjectType(inputs.projectType);
  if (!projectTypeValidation.isValid) {
    errors.push(projectTypeValidation.message!);
  }
  
  const drawScheduleValidation = validateDrawSchedule(inputs.drawSchedule);
  if (!drawScheduleValidation.isValid) {
    errors.push(drawScheduleValidation.message!);
  }
  
  const exitStrategyValidation = validateExitStrategy(inputs.exitStrategy);
  if (!exitStrategyValidation.isValid) {
    errors.push(exitStrategyValidation.message!);
  }
  
  const constructionStartDateValidation = validateConstructionStartDate(inputs.constructionStartDate);
  if (!constructionStartDateValidation.isValid) {
    errors.push(constructionStartDateValidation.message!);
  }
  
  const completionDateValidation = validateCompletionDate(inputs.completionDate);
  if (!completionDateValidation.isValid) {
    errors.push(completionDateValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
