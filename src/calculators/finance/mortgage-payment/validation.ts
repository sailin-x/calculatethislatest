import { MortgagePaymentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMortgagePaymentInputs(inputs: MortgagePaymentInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan amount validation
  if (!inputs.loanAmount || inputs.loanAmount < 10000) {
    errors.push('Loan amount must be at least $10,000');
  }
  if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
  }

  // Interest rate validation
  if (inputs.interestRate < 0 || inputs.interestRate > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  // Loan term validation
  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
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

  // Points and credits validation
  if (inputs.discountPoints < 0 || inputs.discountPoints > 10) {
    errors.push('Discount points must be between 0 and 10');
  }
  if (inputs.originationPoints < 0 || inputs.originationPoints > 10) {
    errors.push('Origination points must be between 0 and 10');
  }
  if (inputs.lenderCredits < 0) {
    errors.push('Lender credits cannot be negative');
  }
  if (inputs.sellerCredits < 0) {
    errors.push('Seller credits cannot be negative');
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

  // ARM specific validation
  if (inputs.paymentType === 'arm') {
    if (inputs.initialFixedPeriod < 1 || inputs.initialFixedPeriod > 30) {
      errors.push('Initial fixed period must be between 1 and 30 years');
    }
    if (inputs.adjustmentPeriod < 1 || inputs.adjustmentPeriod > 12) {
      errors.push('Adjustment period must be between 1 and 12 months');
    }
    if (inputs.margin < 0 || inputs.margin > 0.1) {
      errors.push('Margin must be between 0% and 10%');
    }
    if (inputs.indexRate < 0 || inputs.indexRate > 0.2) {
      errors.push('Index rate must be between 0% and 20%');
    }
    if (inputs.lifetimeCap < 0 || inputs.lifetimeCap > 0.2) {
      errors.push('Lifetime cap must be between 0% and 20%');
    }
    if (inputs.periodicCap < 0 || inputs.periodicCap > 0.1) {
      errors.push('Periodic cap must be between 0% and 10%');
    }
    if (inputs.floorRate < 0 || inputs.floorRate > 0.1) {
      errors.push('Floor rate must be between 0% and 10%');
    }
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

  // Market information validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length < 2) {
    errors.push('Market location is required and must be at least 2 characters');
  }
  if (inputs.marketGrowthRate < -0.2 || inputs.marketGrowthRate > 0.3) {
    errors.push('Market growth rate must be between -20% and 30%');
  }

  // Payment day validation
  if (inputs.paymentDay < 1 || inputs.paymentDay > 31) {
    errors.push('Payment day must be between 1 and 31');
  }

  // Warnings
  if (inputs.borrowerDebtToIncomeRatio > 0.43) {
    warnings.push('Debt-to-income ratio exceeds recommended 43%');
  }
  if (inputs.loanAmount / inputs.propertyValue > 0.95) {
    warnings.push('Loan-to-value ratio exceeds 95%');
  }
  if (inputs.borrowerCreditScore < 620) {
    warnings.push('Credit score below 620 may limit loan options');
  }
  if (inputs.paymentType === 'arm' && inputs.interestRate < 0.03) {
    warnings.push('ARM with very low initial rate may have high adjustment risk');
  }
  if (inputs.propertyAge > 50) {
    warnings.push('Property age over 50 years may affect loan terms');
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
