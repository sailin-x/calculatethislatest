import { HardMoneyLoanInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHardMoneyLoanInputs(inputs: HardMoneyLoanInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan Information Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (inputs.loanTerm > 36) {
    errors.push('Loan term cannot exceed 36 months');
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.push('Interest rate must be greater than 0');
  }

  if (inputs.interestRate > 25) {
    errors.push('Interest rate cannot exceed 25%');
  }

  if (inputs.points === undefined || inputs.points < 0) {
    errors.push('Points must be 0 or greater');
  }

  if (inputs.points > 10) {
    errors.push('Points cannot exceed 10%');
  }

  if (inputs.originationFee === undefined || inputs.originationFee < 0) {
    errors.push('Origination fee must be 0 or greater');
  }

  if (inputs.processingFee === undefined || inputs.processingFee < 0) {
    errors.push('Processing fee must be 0 or greater');
  }

  if (inputs.appraisalFee === undefined || inputs.appraisalFee < 0) {
    errors.push('Appraisal fee must be 0 or greater');
  }

  if (inputs.titleInsuranceFee === undefined || inputs.titleInsuranceFee < 0) {
    errors.push('Title insurance fee must be 0 or greater');
  }

  if (inputs.escrowFee === undefined || inputs.escrowFee < 0) {
    errors.push('Escrow fee must be 0 or greater');
  }

  if (inputs.recordingFee === undefined || inputs.recordingFee < 0) {
    errors.push('Recording fee must be 0 or greater');
  }

  if (inputs.otherFees === undefined || inputs.otherFees < 0) {
    errors.push('Other fees must be 0 or greater');
  }

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }

  if (!inputs.propertyCondition) {
    errors.push('Property condition is required');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (inputs.propertyAge === undefined || inputs.propertyAge < 0) {
    errors.push('Property age must be 0 or greater');
  }

  if (inputs.propertyAge > 100) {
    errors.push('Property age cannot exceed 100 years');
  }

  // Borrower Information Validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  if (inputs.borrowerDebtToIncomeRatio === undefined || inputs.borrowerDebtToIncomeRatio < 0) {
    errors.push('Debt-to-income ratio must be 0 or greater');
  }

  if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.push('Debt-to-income ratio cannot exceed 100%');
  }

  if (inputs.borrowerLiquidity === undefined || inputs.borrowerLiquidity < 0) {
    errors.push('Borrower liquidity must be 0 or greater');
  }

  if (!inputs.borrowerExperience) {
    errors.push('Borrower experience is required');
  }

  // Project Information Validation
  if (!inputs.projectType) {
    errors.push('Project type is required');
  }

  if (!inputs.projectTimeline || inputs.projectTimeline <= 0) {
    errors.push('Project timeline must be greater than 0');
  }

  if (inputs.projectTimeline > 36) {
    errors.push('Project timeline cannot exceed 36 months');
  }

  if (inputs.renovationBudget === undefined || inputs.renovationBudget < 0) {
    errors.push('Renovation budget must be 0 or greater');
  }

  if (!inputs.expectedARV || inputs.expectedARV <= 0) {
    errors.push('Expected ARV must be greater than 0');
  }

  if (!inputs.exitStrategy) {
    errors.push('Exit strategy is required');
  }

  // Market Information Validation
  if (!inputs.marketCondition) {
    errors.push('Market condition is required');
  }

  if (inputs.marketGrowthRate === undefined) {
    errors.push('Market growth rate is required');
  }

  if (inputs.marketGrowthRate < -10 || inputs.marketGrowthRate > 20) {
    errors.push('Market growth rate must be between -10% and 20%');
  }

  // Risk Factors Validation
  if (!inputs.marketRisk) {
    errors.push('Market risk is required');
  }

  if (!inputs.propertyRisk) {
    errors.push('Property risk is required');
  }

  if (!inputs.borrowerRisk) {
    errors.push('Borrower risk is required');
  }

  if (!inputs.projectRisk) {
    errors.push('Project risk is required');
  }

  // Legal and Regulatory Validation
  if (inputs.zoningCompliance === undefined) {
    errors.push('Zoning compliance field is required');
  }

  if (inputs.environmentalIssues === undefined) {
    errors.push('Environmental issues field is required');
  }

  if (inputs.titleIssues === undefined) {
    errors.push('Title issues field is required');
  }

  if (inputs.permitIssues === undefined) {
    errors.push('Permit issues field is required');
  }

  if (inputs.legalRestrictions && inputs.legalRestrictions.length > 0) {
    inputs.legalRestrictions.forEach((restriction, index) => {
      if (!restriction || restriction.trim().length === 0) {
        errors.push(`Legal restriction ${index + 1}: Description is required`);
      }
    });
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.analysisPeriod > 60) {
    errors.push('Analysis period cannot exceed 60 months');
  }

  if (!inputs.discountRate || inputs.discountRate <= 0) {
    errors.push('Discount rate must be greater than 0');
  }

  if (inputs.discountRate > 30) {
    errors.push('Discount rate cannot exceed 30%');
  }

  if (inputs.inflationRate === undefined) {
    errors.push('Inflation rate is required');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.taxRate === undefined || inputs.taxRate < 0) {
    errors.push('Tax rate must be 0 or greater');
  }

  if (inputs.taxRate > 50) {
    errors.push('Tax rate cannot exceed 50%');
  }

  // Reporting Preferences Validation
  if (!inputs.currency) {
    errors.push('Currency is required');
  }

  if (!inputs.displayFormat) {
    errors.push('Display format is required');
  }

  if (inputs.includeCharts === undefined) {
    errors.push('Include charts field is required');
  }

  // Business Logic Validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.loanAmount && inputs.expectedARV && inputs.loanAmount > inputs.expectedARV * 0.8) {
    warnings.push('Loan amount exceeds 80% of expected ARV, which may indicate high risk');
  }

  if (inputs.projectTimeline && inputs.loanTerm && inputs.projectTimeline > inputs.loanTerm) {
    warnings.push('Project timeline exceeds loan term, which may require extension or refinancing');
  }

  if (inputs.renovationBudget && inputs.propertyValue && inputs.renovationBudget > inputs.propertyValue * 0.5) {
    warnings.push('Renovation budget exceeds 50% of property value, which may indicate extensive work required');
  }

  if (inputs.borrowerCreditScore && inputs.borrowerCreditScore < 600) {
    warnings.push('Borrower has poor credit score, indicating higher default risk');
  }

  if (inputs.borrowerDebtToIncomeRatio && inputs.borrowerDebtToIncomeRatio > 50) {
    warnings.push('High debt-to-income ratio may indicate borrower financial stress');
  }

  if (inputs.borrowerExperience === 'none' || inputs.borrowerExperience === 'beginner') {
    warnings.push('Inexperienced borrower may require additional oversight and support');
  }

  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_renovation') {
    warnings.push('Poor property condition may require extensive renovation and higher costs');
  }

  if (inputs.projectType === 'construction' || inputs.projectType === 'land_development') {
    warnings.push('Complex project types carry higher execution risk');
  }

  if (inputs.marketCondition === 'declining') {
    warnings.push('Declining market conditions may affect property values and exit strategies');
  }

  if (inputs.environmentalIssues) {
    warnings.push('Environmental issues may require remediation and affect property value');
  }

  if (inputs.titleIssues) {
    warnings.push('Title issues may affect property ownership and loan security');
  }

  if (inputs.permitIssues) {
    warnings.push('Permit issues may delay project completion and increase costs');
  }

  // Cross-field Validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.renovationBudget) {
    const totalProjectCost = inputs.propertyValue + inputs.renovationBudget;
    const ltcRatio = (inputs.loanAmount / totalProjectCost) * 100;
    if (ltcRatio > 90) {
      warnings.push('Loan-to-cost ratio exceeds 90%, indicating high leverage');
    }
  }

  if (inputs.expectedARV && inputs.propertyValue && inputs.renovationBudget) {
    const totalInvestment = inputs.propertyValue + inputs.renovationBudget;
    const profitMargin = ((inputs.expectedARV - totalInvestment) / totalInvestment) * 100;
    if (profitMargin < 10) {
      warnings.push('Low profit margin may not provide adequate return for risk');
    }
  }

  if (inputs.borrowerLiquidity && inputs.loanAmount) {
    const liquidityRatio = (inputs.borrowerLiquidity / inputs.loanAmount) * 100;
    if (liquidityRatio < 10) {
      warnings.push('Low borrower liquidity may indicate limited financial reserves');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
