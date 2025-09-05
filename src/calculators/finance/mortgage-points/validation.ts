import { MortgagePointsInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMortgagePointsInputs(inputs: MortgagePointsInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan amount validation
  if (!inputs.loanAmount || inputs.loanAmount < 10000) {
    errors.push('Loan amount must be at least $10,000');
  }
  if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
  }

  // Base interest rate validation
  if (inputs.baseInterestRate < 0 || inputs.baseInterestRate > 0.5) {
    errors.push('Base interest rate must be between 0% and 50%');
  }

  // Loan term validation
  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  // Points validation
  if (inputs.discountPoints < 0 || inputs.discountPoints > 10) {
    errors.push('Discount points must be between 0 and 10');
  }
  if (inputs.originationPoints < 0 || inputs.originationPoints > 10) {
    errors.push('Origination points must be between 0 and 10');
  }

  // Point cost validation
  if (inputs.pointCost < 0) {
    errors.push('Point cost cannot be negative');
  }
  if (inputs.pointCost > inputs.loanAmount) {
    errors.push('Point cost cannot exceed loan amount');
  }

  // Point value validation
  if (inputs.pointValue < 0) {
    errors.push('Point value cannot be negative');
  }

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue < 10000) {
    errors.push('Property value must be at least $10,000');
  }
  if (inputs.propertyValue > 50000000) {
    errors.push('Property value cannot exceed $50,000,000');
  }

  // Property address validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  // Down payment validation
  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  // Down payment percentage validation
  if (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100) {
    errors.push('Down payment percentage must be between 0% and 100%');
  }

  // Property size validation
  if (inputs.propertySize < 100) {
    errors.push('Property size must be at least 100 sq ft');
  }
  if (inputs.propertySize > 100000) {
    errors.push('Property size cannot exceed 100,000 sq ft');
  }

  // Property age validation
  if (inputs.propertyAge < 0 || inputs.propertyAge > 200) {
    errors.push('Property age must be between 0 and 200 years');
  }

  // Insurance and taxes validation
  if (inputs.propertyInsurance < 0) {
    errors.push('Property insurance cannot be negative');
  }
  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }
  if (inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }
  if (inputs.floodInsurance < 0) {
    errors.push('Flood insurance cannot be negative');
  }
  if (inputs.mortgageInsurance < 0) {
    errors.push('Mortgage insurance cannot be negative');
  }
  if (inputs.mortgageInsuranceRate < 0 || inputs.mortgageInsuranceRate > 0.1) {
    errors.push('Mortgage insurance rate must be between 0% and 10%');
  }

  // Borrower information validation
  if (inputs.borrowerIncome < 0) {
    errors.push('Borrower income cannot be negative');
  }
  if (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }
  if (inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 1) {
    errors.push('Borrower debt-to-income ratio must be between 0% and 100%');
  }
  if (inputs.borrowerTaxRate < 0 || inputs.borrowerTaxRate > 100) {
    errors.push('Borrower tax rate must be between 0% and 100%');
  }

  // Market information validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length < 2) {
    errors.push('Market location is required and must be at least 2 characters');
  }
  if (inputs.marketGrowthRate < -0.2 || inputs.marketGrowthRate > 0.3) {
    errors.push('Market growth rate must be between -20% and 30%');
  }

  // Analysis parameters validation
  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }
  if (inputs.inflationRate < -0.1 || inputs.inflationRate > 0.2) {
    errors.push('Inflation rate must be between -10% and 20%');
  }
  if (inputs.propertyAppreciationRate < -0.2 || inputs.propertyAppreciationRate > 0.3) {
    errors.push('Property appreciation rate must be between -20% and 30%');
  }
  if (inputs.discountRate < 0 || inputs.discountRate > 0.3) {
    errors.push('Discount rate must be between 0% and 30%');
  }
  if (inputs.taxDeductionPeriod < 1 || inputs.taxDeductionPeriod > 50) {
    errors.push('Tax deduction period must be between 1 and 50 years');
  }

  // Rate options validation
  if (inputs.rateOptions && inputs.rateOptions.length > 0) {
    for (const option of inputs.rateOptions) {
      if (option.points < 0 || option.points > 10) {
        errors.push('Rate option points must be between 0 and 10');
      }
      if (option.rate < 0 || option.rate > 0.5) {
        errors.push('Rate option rate must be between 0% and 50%');
      }
      if (option.payment < 0) {
        errors.push('Rate option payment cannot be negative');
      }
      if (option.totalInterest < 0) {
        errors.push('Rate option total interest cannot be negative');
      }
    }
  }

  // Warnings
  if (inputs.discountPoints > 3) {
    warnings.push('Discount points above 3 may not provide proportional savings');
  }
  if (inputs.originationPoints > 2) {
    warnings.push('Origination points above 2% may be high');
  }
  if (inputs.borrowerDebtToIncomeRatio > 0.43) {
    warnings.push('Debt-to-income ratio exceeds recommended 43%');
  }
  if (inputs.loanAmount / inputs.propertyValue > 0.95) {
    warnings.push('Loan-to-value ratio exceeds 95%');
  }
  if (inputs.borrowerCreditScore < 620) {
    warnings.push('Credit score below 620 may limit loan options');
  }
  if (inputs.loanTerm < 10) {
    warnings.push('Short loan term may limit point benefits');
  }
  if (inputs.borrowerTaxRate < 20) {
    warnings.push('Low tax rate limits deduction benefit');
  }
  if (inputs.marketCondition === 'declining') {
    warnings.push('Declining market conditions may affect property value');
  }
  if (inputs.borrowerEmploymentType === 'self_employed') {
    warnings.push('Self-employed borrowers may face stricter qualification requirements');
  }
  if (inputs.propertyType === 'commercial') {
    warnings.push('Commercial properties may have different loan terms and requirements');
  }
  if (inputs.loanType === 'hard_money') {
    warnings.push('Hard money loans typically have higher rates and shorter terms');
  }
  if (inputs.loanType === 'private') {
    warnings.push('Private loans may have different terms and requirements');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
