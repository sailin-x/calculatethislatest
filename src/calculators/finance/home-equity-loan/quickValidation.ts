import { HomeEquityLoanInputs } from './types';

export function validatePropertyValue(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Property value must be greater than 0';
  }
  if (value < 50000) {
    return 'Property value seems unusually low';
  }
  return null;
}

export function validatePropertyAddress(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.trim().length < 10) {
    return 'Property address seems too short';
  }
  return null;
}

export function validatePropertyType(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Property type is required';
  }
  const validTypes = ['single_family', 'condo', 'townhouse', 'multi_family', 'commercial'];
  if (!validTypes.includes(value)) {
    return 'Invalid property type';
  }
  return null;
}

export function validatePropertyAge(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property age must be 0 or greater';
  }
  if (value > 100) {
    return 'Property age cannot exceed 100 years';
  }
  if (value > 50) {
    return 'Older property may affect loan terms';
  }
  return null;
}

export function validatePropertyCondition(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Property condition is required';
  }
  const validConditions = ['excellent', 'good', 'fair', 'poor'];
  if (!validConditions.includes(value)) {
    return 'Invalid property condition';
  }
  if (value === 'poor') {
    return 'Poor property condition may affect loan approval';
  }
  return null;
}

export function validateCurrentMortgageBalance(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Current mortgage balance must be 0 or greater';
  }
  if (allInputs.propertyValue && value > allInputs.propertyValue) {
    return 'Current mortgage balance cannot exceed property value';
  }
  return null;
}

export function validateCurrentMortgageRate(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Current mortgage rate must be greater than 0';
  }
  if (value > 20) {
    return 'Current mortgage rate cannot exceed 20%';
  }
  return null;
}

export function validateCurrentMortgagePayment(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Current mortgage payment must be 0 or greater';
  }
  return null;
}

export function validateMortgageType(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Mortgage type is required';
  }
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!validTypes.includes(value)) {
    return 'Invalid mortgage type';
  }
  return null;
}

export function validateLoanAmount(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Loan amount must be greater than 0';
  }
  if (value > 1000000) {
    return 'Loan amount cannot exceed $1,000,000';
  }
  if (allInputs.propertyValue && allInputs.currentMortgageBalance) {
    const totalEquity = allInputs.propertyValue - allInputs.currentMortgageBalance;
    if (value > totalEquity * 0.9) {
      return 'Loan amount cannot exceed 90% of available equity';
    }
  }
  if (allInputs.borrowerIncome && value > allInputs.borrowerIncome * 2) {
    return 'High loan-to-income ratio may affect approval';
  }
  return null;
}

export function validateInterestRate(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Interest rate must be greater than 0';
  }
  if (value > 15) {
    return 'Interest rate cannot exceed 15%';
  }
  if (value > 10) {
    return 'High interest rate may indicate risk';
  }
  return null;
}

export function validateLoanTerm(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Loan term must be greater than 0';
  }
  if (value > 30) {
    return 'Loan term cannot exceed 30 years';
  }
  return null;
}

export function validatePaymentType(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Payment type is required';
  }
  const validTypes = ['fixed', 'variable', 'interest_only', 'balloon'];
  if (!validTypes.includes(value)) {
    return 'Invalid payment type';
  }
  if (value === 'balloon') {
    return 'Balloon payment structure increases risk';
  }
  if (value === 'interest_only') {
    return 'Interest-only payments may increase long-term risk';
  }
  return null;
}

export function validatePaymentFrequency(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Payment frequency is required';
  }
  const validFrequencies = ['monthly', 'biweekly', 'weekly'];
  if (!validFrequencies.includes(value)) {
    return 'Invalid payment frequency';
  }
  return null;
}

export function validateBorrowerCreditScore(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value < 300 || value > 850) {
    return 'Borrower credit score must be between 300 and 850';
  }
  if (value < 620) {
    return 'Credit score below 620 may affect loan approval';
  }
  return null;
}

export function validateBorrowerIncome(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Borrower income must be greater than 0';
  }
  if (value < 20000) {
    return 'Borrower income seems unusually low';
  }
  return null;
}

export function validateBorrowerDebtToIncomeRatio(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Debt-to-income ratio must be 0 or greater';
  }
  if (value > 100) {
    return 'Debt-to-income ratio cannot exceed 100%';
  }
  if (value > 50) {
    return 'High debt-to-income ratio may affect loan approval';
  }
  return null;
}

export function validateBorrowerEmploymentType(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Employment type is required';
  }
  const validTypes = ['employed', 'self_employed', 'retired', 'unemployed'];
  if (!validTypes.includes(value)) {
    return 'Invalid employment type';
  }
  if (value === 'unemployed') {
    return 'Unemployment may affect loan approval';
  }
  return null;
}

export function validateBorrowerEmploymentLength(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Employment length must be 0 or greater';
  }
  if (value > 50) {
    return 'Employment length cannot exceed 50 years';
  }
  if (value < 2) {
    return 'Short employment history may affect loan approval';
  }
  return null;
}

export function validateOriginationFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Origination fee must be 0 or greater';
  }
  return null;
}

export function validateAppraisalFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Appraisal fee must be 0 or greater';
  }
  return null;
}

export function validateTitleInsuranceFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Title insurance fee must be 0 or greater';
  }
  return null;
}

export function validateRecordingFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Recording fee must be 0 or greater';
  }
  return null;
}

export function validateAttorneyFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Attorney fee must be 0 or greater';
  }
  return null;
}

export function validateCreditReportFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Credit report fee must be 0 or greater';
  }
  return null;
}

export function validateFloodCertificationFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Flood certification fee must be 0 or greater';
  }
  return null;
}

export function validateTaxServiceFee(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Tax service fee must be 0 or greater';
  }
  return null;
}

export function validateOtherFees(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Other fees must be 0 or greater';
  }
  return null;
}

export function validateLoanPurpose(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Loan purpose is required';
  }
  const validPurposes = ['home_improvement', 'debt_consolidation', 'education', 'medical', 'business', 'investment', 'other'];
  if (!validPurposes.includes(value)) {
    return 'Invalid loan purpose';
  }
  return null;
}

export function validatePurposeDescription(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Purpose description is required';
  }
  if (value.trim().length < 10) {
    return 'Purpose description seems too short';
  }
  return null;
}

export function validateMarketCondition(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Market condition is required';
  }
  const validConditions = ['appreciating', 'stable', 'declining'];
  if (!validConditions.includes(value)) {
    return 'Invalid market condition';
  }
  if (value === 'declining') {
    return 'Declining market conditions increase risk';
  }
  return null;
}

export function validateMarketGrowthRate(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined) {
    return 'Market growth rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Market growth rate must be between -10% and 20%';
  }
  return null;
}

export function validateMarketRisk(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Market risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid market risk level';
  }
  return null;
}

export function validatePropertyRisk(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Property risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid property risk level';
  }
  return null;
}

export function validateBorrowerRisk(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Borrower risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid borrower risk level';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Analysis period must be greater than 0';
  }
  if (value > 30) {
    return 'Analysis period cannot exceed 30 years';
  }
  return null;
}

export function validateInflationRate(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined) {
    return 'Inflation rate is required';
  }
  if (value < -5 || value > 15) {
    return 'Inflation rate must be between -5% and 15%';
  }
  return null;
}

export function validateTaxRate(value: number, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Tax rate must be 0 or greater';
  }
  if (value > 50) {
    return 'Tax rate cannot exceed 50%';
  }
  return null;
}

export function validateCurrency(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Currency is required';
  }
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return 'Invalid currency';
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs: HomeEquityLoanInputs): string | null {
  if (!value) {
    return 'Display format is required';
  }
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return 'Invalid display format';
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs: HomeEquityLoanInputs): string | null {
  if (value === undefined) {
    return 'Include charts field is required';
  }
  return null;
}
