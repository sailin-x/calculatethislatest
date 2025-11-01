import { HELOCInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHELOCInputs(inputs: HELOCInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }

  if (inputs.propertyAge === undefined || inputs.propertyAge < 0) {
    errors.push('Property age must be 0 or greater');
  }

  if (inputs.propertyAge > 100) {
    errors.push('Property age cannot exceed 100 years');
  }

  if (!inputs.propertyCondition) {
    errors.push('Property condition is required');
  }

  // Current Mortgage Information Validation
  if (inputs.currentMortgageBalance === undefined || inputs.currentMortgageBalance < 0) {
    errors.push('Current mortgage balance must be 0 or greater');
  }

  if (inputs.currentMortgageBalance > inputs.propertyValue) {
    errors.push('Current mortgage balance cannot exceed property value');
  }

  if (inputs.currentMortgageRate === undefined || inputs.currentMortgageRate < 0) {
    errors.push('Current mortgage rate must be 0 or greater');
  }

  if (inputs.currentMortgageRate > 20) {
    errors.push('Current mortgage rate cannot exceed 20%');
  }

  if (inputs.currentMortgagePayment === undefined || inputs.currentMortgagePayment < 0) {
    errors.push('Current mortgage payment must be 0 or greater');
  }

  if (!inputs.mortgageType) {
    errors.push('Mortgage type is required');
  }

  // HELOC Information Validation
  if (!inputs.helocAmount || inputs.helocAmount <= 0) {
    errors.push('HELOC amount must be greater than 0');
  }

  if (inputs.helocAmount > 1000000) {
    errors.push('HELOC amount cannot exceed $1,000,000');
  }

  if (!inputs.helocRate || inputs.helocRate <= 0) {
    errors.push('HELOC rate must be greater than 0');
  }

  if (inputs.helocRate > 15) {
    errors.push('HELOC rate cannot exceed 15%');
  }

  if (!inputs.helocRateType) {
    errors.push('HELOC rate type is required');
  }

  if (!inputs.drawPeriod || inputs.drawPeriod <= 0) {
    errors.push('Draw period must be greater than 0');
  }

  if (inputs.drawPeriod > 15) {
    errors.push('Draw period cannot exceed 15 years');
  }

  if (!inputs.repaymentPeriod || inputs.repaymentPeriod <= 0) {
    errors.push('Repayment period must be greater than 0');
  }

  if (inputs.repaymentPeriod > 20) {
    errors.push('Repayment period cannot exceed 20 years');
  }

  if (inputs.minimumPayment === undefined || inputs.minimumPayment < 0) {
    errors.push('Minimum payment must be 0 or greater');
  }

  if (!inputs.minimumPaymentType) {
    errors.push('Minimum payment type is required');
  }

  // Borrower Information Validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  if (inputs.borrowerDebtToIncomeRatio === undefined || inputs.borrowerDebtToIncomeRatio < 0) {
    errors.push('DebtToIncome ratio must be 0 or greater');
  }

  if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.push('DebtToIncome ratio cannot exceed 100%');
  }

  if (!inputs.borrowerEmploymentType) {
    errors.push('Employment type is required');
  }

  if (inputs.borrowerEmploymentLength === undefined || inputs.borrowerEmploymentLength < 0) {
    errors.push('Employment length must be 0 or greater');
  }

  if (inputs.borrowerEmploymentLength > 50) {
    errors.push('Employment length cannot exceed 50 years');
  }

  // Fees and Costs Validation
  if (inputs.originationFee === undefined || inputs.originationFee < 0) {
    errors.push('Origination fee must be 0 or greater');
  }

  if (inputs.appraisalFee === undefined || inputs.appraisalFee < 0) {
    errors.push('Appraisal fee must be 0 or greater');
  }

  if (inputs.titleInsuranceFee === undefined || inputs.titleInsuranceFee < 0) {
    errors.push('Title insurance fee must be 0 or greater');
  }

  if (inputs.recordingFee === undefined || inputs.recordingFee < 0) {
    errors.push('Recording fee must be 0 or greater');
  }

  if (inputs.annualFee === undefined || inputs.annualFee < 0) {
    errors.push('Annual fee must be 0 or greater');
  }

  if (inputs.inactivityFee === undefined || inputs.inactivityFee < 0) {
    errors.push('Inactivity fee must be 0 or greater');
  }

  if (inputs.earlyClosureFee === undefined || inputs.earlyClosureFee < 0) {
    errors.push('Early closure fee must be 0 or greater');
  }

  if (inputs.otherFees === undefined || inputs.otherFees < 0) {
    errors.push('Other fees must be 0 or greater');
  }

  // Usage Information Validation
  if (!inputs.intendedUse) {
    errors.push('Intended use is required');
  }

  if (inputs.drawAmount === undefined || inputs.drawAmount < 0) {
    errors.push('Draw amount must be 0 or greater');
  }

  if (inputs.drawAmount > inputs.helocAmount) {
    errors.push('Draw amount cannot exceed HELOC amount');
  }

  if (!inputs.drawFrequency) {
    errors.push('Draw frequency is required');
  }

  if (!inputs.repaymentStrategy) {
    errors.push('Repayment strategy is required');
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

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.analysisPeriod > 30) {
    errors.push('Analysis period cannot exceed 30 years');
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
  const totalEquity = inputs.propertyValue - inputs.currentMortgageBalance;
  const availableEquity = totalEquity * 0.85;
  
  if (inputs.helocAmount > availableEquity) {
    warnings.push('HELOC amount exceeds typical available equity limit');
  }

  const combinedLTV = ((inputs.currentMortgageBalance + inputs.helocAmount) / inputs.propertyValue) * 100;
  if (combinedLTV > 90) {
    warnings.push('Combined LTV exceeds 90%, which may affect approval');
  }

  if (inputs.borrowerCreditScore < 650) {
    warnings.push('Borrower has poor credit score, which may affect approval');
  }

  if (inputs.borrowerDebtToIncomeRatio > 50) {
    warnings.push('High DebtToIncome ratio may affect approval');
  }

  if (inputs.borrowerEmploymentType === 'unemployed') {
    warnings.push('Unemployed borrower may have difficulty obtaining approval');
  }

  if (inputs.propertyCondition === 'poor') {
    warnings.push('Poor property condition may affect property value and approval');
  }

  if (inputs.marketCondition === 'declining') {
    warnings.push('Declining market conditions may affect property value');
  }

  if (inputs.helocRate > 10) {
    warnings.push('High HELOC rate may indicate higher risk');
  }

  if (inputs.drawAmount > inputs.helocAmount * 0.8) {
    warnings.push('Large initial draw may indicate higher risk');
  }

  // Cross-field Validation
  if (inputs.drawPeriod && inputs.repaymentPeriod && inputs.drawPeriod + inputs.repaymentPeriod > 30) {
    warnings.push('Total loan term exceeds typical maximum of 30 years');
  }

  if (inputs.currentMortgageBalance && inputs.helocAmount && inputs.propertyValue) {
    const totalDebt = inputs.currentMortgageBalance + inputs.helocAmount;
    if (totalDebt > inputs.propertyValue * 0.95) {
      warnings.push('Total debt approaches property value, indicating high risk');
    }
  }

  if (inputs.borrowerIncome && inputs.currentMortgagePayment && inputs.minimumPayment) {
    const totalPayments = inputs.currentMortgagePayment + inputs.minimumPayment;
    const paymentRatio = (totalPayments * 12) / inputs.borrowerIncome;
    if (paymentRatio > 0.4) {
      warnings.push('High PaymentToIncome ratio may indicate affordability concerns');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
