import { HELOCInputs } from './types';

export function validatePropertyValue(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'Property value must be greater than 0';
  }
  if (allInputs.currentMortgageBalance && value < allInputs.currentMortgageBalance) {
    return 'Property value must be greater than current mortgage balance';
  }
  return null;
}

export function validatePropertyAddress(value: string, allInputs: HELOCInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.trim().length < 10) {
    return 'Property address seems too short';
  }
  return null;
}

export function validatePropertyType(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Property type is required';
  }
  const validTypes = ['single_family', 'condo', 'townhouse', 'multi_family', 'commercial'];
  if (!validTypes.includes(value)) {
    return 'Invalid property type';
  }
  return null;
}

export function validatePropertyAge(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property age must be 0 or greater';
  }
  if (value > 100) {
    return 'Property age cannot exceed 100 years';
  }
  return null;
}

export function validatePropertyCondition(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Property condition is required';
  }
  const validConditions = ['excellent', 'good', 'fair', 'poor'];
  if (!validConditions.includes(value)) {
    return 'Invalid property condition';
  }
  return null;
}

export function validateCurrentMortgageBalance(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Current mortgage balance must be 0 or greater';
  }
  if (allInputs.propertyValue && value > allInputs.propertyValue) {
    return 'Current mortgage balance cannot exceed property value';
  }
  return null;
}

export function validateCurrentMortgageRate(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Current mortgage rate must be 0 or greater';
  }
  if (value > 20) {
    return 'Current mortgage rate cannot exceed 20%';
  }
  return null;
}

export function validateCurrentMortgagePayment(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Current mortgage payment must be 0 or greater';
  }
  return null;
}

export function validateMortgageType(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Mortgage type is required';
  }
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!validTypes.includes(value)) {
    return 'Invalid mortgage type';
  }
  return null;
}

export function validateHELOCAmount(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'HELOC amount must be greater than 0';
  }
  if (value > 1000000) {
    return 'HELOC amount cannot exceed $1,000,000';
  }
  if (allInputs.propertyValue && allInputs.currentMortgageBalance) {
    const totalEquity = allInputs.propertyValue - allInputs.currentMortgageBalance;
    const availableEquity = totalEquity * 0.85;
    if (value > availableEquity) {
      return 'HELOC amount exceeds typical available equity limit';
    }
  }
  return null;
}

export function validateHELOCRate(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'HELOC rate must be greater than 0';
  }
  if (value > 15) {
    return 'HELOC rate cannot exceed 15%';
  }
  return null;
}

export function validateHELOCRateType(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'HELOC rate type is required';
  }
  const validTypes = ['variable', 'fixed', 'introductory'];
  if (!validTypes.includes(value)) {
    return 'Invalid HELOC rate type';
  }
  return null;
}

export function validateDrawPeriod(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'Draw period must be greater than 0';
  }
  if (value > 15) {
    return 'Draw period cannot exceed 15 years';
  }
  return null;
}

export function validateRepaymentPeriod(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'Repayment period must be greater than 0';
  }
  if (value > 20) {
    return 'Repayment period cannot exceed 20 years';
  }
  return null;
}

export function validateMinimumPayment(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Minimum payment must be 0 or greater';
  }
  return null;
}

export function validateMinimumPaymentType(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Minimum payment type is required';
  }
  const validTypes = ['interest_only', 'principal_interest', 'percentage'];
  if (!validTypes.includes(value)) {
    return 'Invalid minimum payment type';
  }
  return null;
}

export function validateBorrowerCreditScore(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value < 300 || value > 850) {
    return 'Borrower credit score must be between 300 and 850';
  }
  if (value < 650) {
    return 'Poor credit score may affect approval';
  }
  return null;
}

export function validateBorrowerIncome(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'Borrower income must be greater than 0';
  }
  if (value < 20000) {
    return 'Borrower income seems unusually low';
  }
  return null;
}

export function validateBorrowerDebtToIncomeRatio(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'DebtToIncome ratio must be 0 or greater';
  }
  if (value > 100) {
    return 'DebtToIncome ratio cannot exceed 100%';
  }
  if (value > 50) {
    return 'High DebtToIncome ratio may affect approval';
  }
  return null;
}

export function validateBorrowerEmploymentType(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Employment type is required';
  }
  const validTypes = ['employed', 'self_employed', 'retired', 'unemployed'];
  if (!validTypes.includes(value)) {
    return 'Invalid employment type';
  }
  return null;
}

export function validateBorrowerEmploymentLength(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Employment length must be 0 or greater';
  }
  if (value > 50) {
    return 'Employment length cannot exceed 50 years';
  }
  return null;
}

export function validateOriginationFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Origination fee must be 0 or greater';
  }
  return null;
}

export function validateAppraisalFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Appraisal fee must be 0 or greater';
  }
  return null;
}

export function validateTitleInsuranceFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Title insurance fee must be 0 or greater';
  }
  return null;
}

export function validateRecordingFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Recording fee must be 0 or greater';
  }
  return null;
}

export function validateAnnualFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Annual fee must be 0 or greater';
  }
  return null;
}

export function validateInactivityFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Inactivity fee must be 0 or greater';
  }
  return null;
}

export function validateEarlyClosureFee(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Early closure fee must be 0 or greater';
  }
  return null;
}

export function validateOtherFees(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Other fees must be 0 or greater';
  }
  return null;
}

export function validateIntendedUse(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Intended use is required';
  }
  const validUses = ['home_improvement', 'debt_consolidation', 'education', 'emergency_fund', 'investment', 'other'];
  if (!validUses.includes(value)) {
    return 'Invalid intended use';
  }
  return null;
}

export function validateDrawAmount(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Draw amount must be 0 or greater';
  }
  if (allInputs.helocAmount && value > allInputs.helocAmount) {
    return 'Draw amount cannot exceed HELOC amount';
  }
  return null;
}

export function validateDrawFrequency(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Draw frequency is required';
  }
  const validFrequencies = ['monthly', 'quarterly', 'annually', 'as_needed'];
  if (!validFrequencies.includes(value)) {
    return 'Invalid draw frequency';
  }
  return null;
}

export function validateRepaymentStrategy(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Repayment strategy is required';
  }
  const validStrategies = ['interest_only', 'principal_interest', 'balloon', 'custom'];
  if (!validStrategies.includes(value)) {
    return 'Invalid repayment strategy';
  }
  return null;
}

export function validateMarketCondition(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Market condition is required';
  }
  const validConditions = ['appreciating', 'stable', 'declining'];
  if (!validConditions.includes(value)) {
    return 'Invalid market condition';
  }
  return null;
}

export function validateMarketGrowthRate(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined) {
    return 'Market growth rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Market growth rate must be between -10% and 20%';
  }
  return null;
}

export function validateMarketRisk(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Market risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid market risk level';
  }
  return null;
}

export function validatePropertyRisk(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Property risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid property risk level';
  }
  return null;
}

export function validateBorrowerRisk(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Borrower risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid borrower risk level';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs: HELOCInputs): string | null {
  if (!value || value <= 0) {
    return 'Analysis period must be greater than 0';
  }
  if (value > 30) {
    return 'Analysis period cannot exceed 30 years';
  }
  return null;
}

export function validateInflationRate(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined) {
    return 'Inflation rate is required';
  }
  if (value < -5 || value > 15) {
    return 'Inflation rate must be between -5% and 15%';
  }
  return null;
}

export function validateTaxRate(value: number, allInputs: HELOCInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Tax rate must be 0 or greater';
  }
  if (value > 50) {
    return 'Tax rate cannot exceed 50%';
  }
  return null;
}

export function validateCurrency(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Currency is required';
  }
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return 'Invalid currency';
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs: HELOCInputs): string | null {
  if (!value) {
    return 'Display format is required';
  }
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return 'Invalid display format';
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs: HELOCInputs): string | null {
  if (value === undefined) {
    return 'Include charts field is required';
  }
  return null;
}
