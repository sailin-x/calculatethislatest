import { MortgageQualificationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMortgageQualificationInputs(inputs: MortgageQualificationInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Borrower income validation
  if (inputs.borrowerIncome < 0) {
    errors.push('Borrower income cannot be negative');
  }
  if (inputs.borrowerIncome < 20000) {
    warnings.push('Borrower income below $20,000 may limit loan options');
  }

  // Co-borrower income validation
  if (inputs.coBorrowerIncome < 0) {
    errors.push('Co-borrower income cannot be negative');
  }

  // Credit score validation
  if (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }
  if (inputs.coBorrowerCreditScore < 300 || inputs.coBorrowerCreditScore > 850) {
    errors.push('Co-borrower credit score must be between 300 and 850');
  }

  // Employment length validation
  if (inputs.borrowerEmploymentLength < 0 || inputs.borrowerEmploymentLength > 50) {
    errors.push('Borrower employment length must be between 0 and 50 years');
  }
  if (inputs.coBorrowerEmploymentLength < 0 || inputs.coBorrowerEmploymentLength > 50) {
    errors.push('Co-borrower employment length must be between 0 and 50 years');
  }

  // Income details validation
  if (inputs.baseSalary < 0) {
    errors.push('Base salary cannot be negative');
  }
  if (inputs.overtimeIncome < 0) {
    errors.push('Overtime income cannot be negative');
  }
  if (inputs.bonusIncome < 0) {
    errors.push('Bonus income cannot be negative');
  }
  if (inputs.commissionIncome < 0) {
    errors.push('Commission income cannot be negative');
  }
  if (inputs.rentalIncome < 0) {
    errors.push('Rental income cannot be negative');
  }
  if (inputs.investmentIncome < 0) {
    errors.push('Investment income cannot be negative');
  }
  if (inputs.otherIncome < 0) {
    errors.push('Other income cannot be negative');
  }

  // Assets and liabilities validation
  if (inputs.borrowerAssets < 0) {
    errors.push('Borrower assets cannot be negative');
  }
  if (inputs.coBorrowerAssets < 0) {
    errors.push('Co-borrower assets cannot be negative');
  }
  if (inputs.borrowerLiquidity < 0) {
    errors.push('Borrower liquidity cannot be negative');
  }
  if (inputs.coBorrowerLiquidity < 0) {
    errors.push('Co-borrower liquidity cannot be negative');
  }
  if (inputs.borrowerDebts < 0) {
    errors.push('Borrower debts cannot be negative');
  }
  if (inputs.coBorrowerDebts < 0) {
    errors.push('Co-borrower debts cannot be negative');
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

  // Debt validation
  if (inputs.creditCardDebt < 0) {
    errors.push('Credit card debt cannot be negative');
  }
  if (inputs.autoLoanDebt < 0) {
    errors.push('Auto loan debt cannot be negative');
  }
  if (inputs.studentLoanDebt < 0) {
    errors.push('Student loan debt cannot be negative');
  }
  if (inputs.personalLoanDebt < 0) {
    errors.push('Personal loan debt cannot be negative');
  }
  if (inputs.otherDebt < 0) {
    errors.push('Other debt cannot be negative');
  }

  // Loan program requirements validation
  if (inputs.maxDebtToIncomeRatio < 0 || inputs.maxDebtToIncomeRatio > 1) {
    errors.push('Max debt-to-income ratio must be between 0% and 100%');
  }
  if (inputs.maxHousingExpenseRatio < 0 || inputs.maxHousingExpenseRatio > 1) {
    errors.push('Max housing expense ratio must be between 0% and 100%');
  }
  if (inputs.minCreditScore < 300 || inputs.minCreditScore > 850) {
    errors.push('Min credit score must be between 300 and 850');
  }
  if (inputs.minDownPayment < 0 || inputs.minDownPayment > 100) {
    errors.push('Min down payment must be between 0% and 100%');
  }
  if (inputs.maxLoanAmount < 10000) {
    errors.push('Max loan amount must be at least $10,000');
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

  // Warnings
  if (inputs.borrowerCreditScore < 620) {
    warnings.push('Borrower credit score below 620 may limit loan options');
  }
  if (inputs.coBorrowerCreditScore < 620) {
    warnings.push('Co-borrower credit score below 620 may limit loan options');
  }
  if (inputs.borrowerEmploymentLength < 1) {
    warnings.push('Short employment history may affect qualification');
  }
  if (inputs.coBorrowerEmploymentLength < 1) {
    warnings.push('Short co-borrower employment history may affect qualification');
  }
  if (inputs.borrowerEmploymentType === 'unemployed') {
    warnings.push('Unemployed borrower may not qualify for loan');
  }
  if (inputs.coBorrowerEmploymentType === 'unemployed') {
    warnings.push('Unemployed co-borrower may not qualify for loan');
  }
  if (inputs.borrowerEmploymentType === 'self_employed') {
    warnings.push('Self-employed borrowers may face stricter qualification requirements');
  }
  if (inputs.coBorrowerEmploymentType === 'self_employed') {
    warnings.push('Self-employed co-borrowers may face stricter qualification requirements');
  }
  if (inputs.loanAmount / inputs.propertyValue > 0.95) {
    warnings.push('Loan-to-value ratio exceeds 95%');
  }
  if (inputs.marketCondition === 'declining') {
    warnings.push('Declining market conditions may affect property value');
  }
  if (inputs.loanType === 'hard_money') {
    warnings.push('Hard money loans typically have higher rates and shorter terms');
  }
  if (inputs.loanType === 'private') {
    warnings.push('Private loans may have different terms and requirements');
  }
  if (inputs.propertyType === 'commercial') {
    warnings.push('Commercial properties may have different loan terms and requirements');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
