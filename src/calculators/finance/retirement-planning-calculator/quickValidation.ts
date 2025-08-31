import { RetirementPlanningCalculatorInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: string,
  value: any,
  allInputs: RetirementPlanningCalculatorInputs
): QuickValidationResult {
  // Handle nested field paths
  const fieldPath = fieldName.split('.');
  
  // Personal info validation
  if (fieldPath[0] === 'personalInfo') {
    if (fieldPath[1] === 'basicInfo') {
      return validateBasicInfoField(fieldPath[2], value);
    }
    if (fieldPath[1] === 'taxInfo') {
      return validateTaxInfoField(fieldPath[2], value);
    }
  }
  
  // Income info validation
  if (fieldPath[0] === 'incomeInfo') {
    return validateIncomeInfoField(fieldPath[1], value);
  }
  
  // Assets info validation
  if (fieldPath[0] === 'assetsInfo') {
    return validateAssetsInfoField(fieldPath[1], value);
  }
  
  // Expenses info validation
  if (fieldPath[0] === 'expensesInfo') {
    if (fieldPath[1] === 'currentExpenses') {
      return validateCurrentExpensesField(fieldPath[2], value);
    }
    if (fieldPath[1] === 'retirementExpenses') {
      return validateRetirementExpensesField(fieldPath[2], value);
    }
    return validateExpensesInfoField(fieldPath[1], value);
  }
  
  // Goals info validation
  if (fieldPath[0] === 'goalsInfo') {
    return validateGoalsInfoField(fieldPath[1], value);
  }
  
  // Risk info validation
  if (fieldPath[0] === 'riskInfo') {
    return validateRiskInfoField(fieldPath[1], value);
  }
  
  // Strategy info validation
  if (fieldPath[0] === 'strategyInfo') {
    if (fieldPath[1] === 'savingsStrategy') {
      return validateSavingsStrategyField(fieldPath[2], value);
    }
    if (fieldPath[1] === 'investmentStrategy') {
      return validateInvestmentStrategyField(fieldPath[2], value);
    }
    if (fieldPath[1] === 'withdrawalStrategy') {
      return validateWithdrawalStrategyField(fieldPath[2], value);
    }
  }
  
  return { isValid: true };
}

function validateBasicInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'firstName':
      return validateFirstName(value);
    case 'lastName':
      return validateLastName(value);
    case 'dateOfBirth':
      return validateDateOfBirth(value);
    case 'age':
      return validateAge(value);
    case 'gender':
      return validateGender(value);
    case 'maritalStatus':
      return validateMaritalStatus(value);
    case 'dependents':
      return validateDependents(value);
    case 'lifeExpectancy':
      return validateLifeExpectancy(value);
    case 'expectedRetirementAge':
      return validateExpectedRetirementAge(value);
    case 'yearsToRetirement':
      return validateYearsToRetirement(value);
    default:
      return { isValid: true };
  }
}

function validateTaxInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'taxFilingStatus':
      return validateTaxFilingStatus(value);
    case 'taxBracket':
      return validateTaxBracket(value);
    case 'stateTaxRate':
      return validateStateTaxRate(value);
    case 'localTaxRate':
      return validateLocalTaxRate(value);
    case 'taxDeductions':
      return validateTaxDeductions(value);
    case 'taxCredits':
      return validateTaxCredits(value);
    default:
      return { isValid: true };
  }
}

function validateIncomeInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'totalIncome':
      return validateTotalIncome(value);
    default:
      return { isValid: true };
  }
}

function validateAssetsInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'totalAssets':
      return validateTotalAssets(value);
    default:
      return { isValid: true };
  }
}

function validateCurrentExpensesField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'housing':
      return validateHousingExpenses(value);
    case 'transportation':
      return validateTransportationExpenses(value);
    case 'food':
      return validateFoodExpenses(value);
    case 'healthcare':
      return validateHealthcareExpenses(value);
    case 'insurance':
      return validateInsuranceExpenses(value);
    case 'utilities':
      return validateUtilitiesExpenses(value);
    case 'entertainment':
      return validateEntertainmentExpenses(value);
    case 'debtPayments':
      return validateDebtPayments(value);
    case 'otherExpenses':
      return validateOtherExpenses(value);
    case 'totalExpenses':
      return validateTotalExpenses(value);
    default:
      return { isValid: true };
  }
}

function validateRetirementExpensesField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'housing':
      return validateRetirementHousingExpenses(value);
    case 'transportation':
      return validateRetirementTransportationExpenses(value);
    case 'food':
      return validateRetirementFoodExpenses(value);
    case 'healthcare':
      return validateRetirementHealthcareExpenses(value);
    case 'insurance':
      return validateRetirementInsuranceExpenses(value);
    case 'utilities':
      return validateRetirementUtilitiesExpenses(value);
    case 'entertainment':
      return validateRetirementEntertainmentExpenses(value);
    case 'travel':
      return validateTravelExpenses(value);
    case 'otherExpenses':
      return validateRetirementOtherExpenses(value);
    case 'totalExpenses':
      return validateRetirementTotalExpenses(value);
    default:
      return { isValid: true };
  }
}

function validateExpensesInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'inflationRate':
      return validateInflationRate(value);
    default:
      return { isValid: true };
  }
}

function validateGoalsInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'retirementIncomeNeeds':
      return validateRetirementIncomeNeeds(value);
    case 'retirementLifestyle':
      return validateRetirementLifestyle(value);
    case 'retirementAge':
      return validateRetirementAge(value);
    case 'retirementDuration':
      return validateRetirementDuration(value);
    case 'legacyGoals':
      return validateLegacyGoals(value);
    default:
      return { isValid: true };
  }
}

function validateRiskInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'riskTolerance':
      return validateRiskTolerance(value);
    case 'investmentHorizon':
      return validateInvestmentHorizon(value);
    case 'liquidityNeeds':
      return validateLiquidityNeeds(value);
    case 'inflationRisk':
      return validateInflationRisk(value);
    case 'marketRisk':
      return validateMarketRisk(value);
    case 'longevityRisk':
      return validateLongevityRisk(value);
    case 'healthcareRisk':
      return validateHealthcareRisk(value);
    default:
      return { isValid: true };
  }
}

function validateSavingsStrategyField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'currentSavingsRate':
      return validateCurrentSavingsRate(value);
    case 'targetSavingsRate':
      return validateTargetSavingsRate(value);
    case 'employerMatch':
      return validateEmployerMatch(value);
    default:
      return { isValid: true };
  }
}

function validateInvestmentStrategyField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'assetAllocation':
      return validateAssetAllocation(value);
    case 'targetReturn':
      return validateTargetReturn(value);
    case 'rebalancingFrequency':
      return validateRebalancingFrequency(value);
    default:
      return { isValid: true };
  }
}

function validateWithdrawalStrategyField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'withdrawalRate':
      return validateWithdrawalRate(value);
    case 'withdrawalMethod':
      return validateWithdrawalMethod(value);
    default:
      return { isValid: true };
  }
}

// Personal Info Validation Functions
function validateFirstName(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'First name is required' };
  }
  
  if (value.trim().length === 0) {
    return { isValid: false, error: 'First name cannot be empty' };
  }
  
  if (value.length > 50) {
    return { isValid: false, error: 'First name cannot exceed 50 characters' };
  }
  
  return { isValid: true };
}

function validateLastName(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Last name is required' };
  }
  
  if (value.trim().length === 0) {
    return { isValid: false, error: 'Last name cannot be empty' };
  }
  
  if (value.length > 50) {
    return { isValid: false, error: 'Last name cannot exceed 50 characters' };
  }
  
  return { isValid: true };
}

function validateDateOfBirth(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Date of birth is required' };
  }
  
  const birthDate = new Date(value);
  if (isNaN(birthDate.getTime())) {
    return { isValid: false, error: 'Invalid date of birth format' };
  }
  
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  
  if (age < 18) {
    return { isValid: false, error: 'Age must be at least 18' };
  }
  
  if (age > 120) {
    return { isValid: false, error: 'Age cannot exceed 120' };
  }
  
  return { isValid: true };
}

function validateAge(value: number): QuickValidationResult {
  if (value < 18) {
    return { isValid: false, error: 'Age must be at least 18' };
  }
  
  if (value > 120) {
    return { isValid: false, error: 'Age cannot exceed 120' };
  }
  
  return { isValid: true };
}

function validateGender(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Gender is required' };
  }
  
  const validGenders = ['male', 'female', 'other'];
  if (!validGenders.includes(value)) {
    return { isValid: false, error: 'Invalid gender' };
  }
  
  return { isValid: true };
}

function validateMaritalStatus(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Marital status is required' };
  }
  
  const validStatuses = ['single', 'married', 'divorced', 'widowed'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, error: 'Invalid marital status' };
  }
  
  return { isValid: true };
}

function validateDependents(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Number of dependents cannot be negative' };
  }
  
  if (value > 20) {
    return { isValid: false, error: 'Number of dependents cannot exceed 20' };
  }
  
  return { isValid: true };
}

function validateLifeExpectancy(value: number): QuickValidationResult {
  if (value < 50) {
    return { isValid: false, error: 'Life expectancy must be at least 50 years' };
  }
  
  if (value > 120) {
    return { isValid: false, error: 'Life expectancy cannot exceed 120 years' };
  }
  
  return { isValid: true };
}

function validateExpectedRetirementAge(value: number): QuickValidationResult {
  if (value < 50) {
    return { isValid: false, error: 'Expected retirement age must be at least 50' };
  }
  
  if (value > 85) {
    return { isValid: false, error: 'Expected retirement age cannot exceed 85' };
  }
  
  return { isValid: true };
}

function validateYearsToRetirement(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Years to retirement cannot be negative' };
  }
  
  if (value > 50) {
    return { isValid: true, warning: 'Years to retirement seems unusually high' };
  }
  
  return { isValid: true };
}

// Tax Info Validation Functions
function validateTaxFilingStatus(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Tax filing status is required' };
  }
  
  const validStatuses = ['single', 'married_filing_jointly', 'married_filing_separately', 'head_of_household', 'qualifying_widow'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, error: 'Invalid tax filing status' };
  }
  
  return { isValid: true };
}

function validateTaxBracket(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax bracket cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Tax bracket cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateStateTaxRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'State tax rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'State tax rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateLocalTaxRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Local tax rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Local tax rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateTaxDeductions(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax deductions cannot be negative' };
  }
  
  return { isValid: true };
}

function validateTaxCredits(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax credits cannot be negative' };
  }
  
  return { isValid: true };
}

// Income Info Validation Functions
function validateTotalIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total income cannot be negative' };
  }
  
  if (value > 10000000) {
    return { isValid: true, warning: 'Total income seems unusually high' };
  }
  
  return { isValid: true };
}

// Assets Info Validation Functions
function validateTotalAssets(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total assets cannot be negative' };
  }
  
  if (value > 100000000) {
    return { isValid: true, warning: 'Total assets seems unusually high' };
  }
  
  return { isValid: true };
}

// Current Expenses Validation Functions
function validateHousingExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Housing expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateTransportationExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Transportation expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateFoodExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Food expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateHealthcareExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Healthcare expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateInsuranceExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Insurance expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateUtilitiesExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Utilities expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateEntertainmentExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Entertainment expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateDebtPayments(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Debt payments cannot be negative' };
  }
  
  return { isValid: true };
}

function validateOtherExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateTotalExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total expenses cannot be negative' };
  }
  
  return { isValid: true };
}

// Retirement Expenses Validation Functions
function validateRetirementHousingExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement housing expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementTransportationExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement transportation expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementFoodExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement food expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementHealthcareExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement healthcare expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementInsuranceExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement insurance expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementUtilitiesExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement utilities expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementEntertainmentExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement entertainment expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateTravelExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Travel expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementOtherExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement other expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetirementTotalExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement total expenses cannot be negative' };
  }
  
  return { isValid: true };
}

// Expenses Info Validation Functions
function validateInflationRate(value: number): QuickValidationResult {
  if (value < -0.5) {
    return { isValid: false, error: 'Inflation rate cannot be less than -50%' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Inflation rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

// Goals Info Validation Functions
function validateRetirementIncomeNeeds(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Retirement income needs cannot be negative' };
  }
  
  if (value > 10000000) {
    return { isValid: true, warning: 'Retirement income needs seems unusually high' };
  }
  
  return { isValid: true };
}

function validateRetirementLifestyle(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Retirement lifestyle is required' };
  }
  
  const validLifestyles = ['modest', 'comfortable', 'luxury'];
  if (!validLifestyles.includes(value)) {
    return { isValid: false, error: 'Invalid retirement lifestyle' };
  }
  
  return { isValid: true };
}

function validateRetirementAge(value: number): QuickValidationResult {
  if (value < 50) {
    return { isValid: false, error: 'Retirement age must be at least 50' };
  }
  
  if (value > 85) {
    return { isValid: false, error: 'Retirement age cannot exceed 85' };
  }
  
  return { isValid: true };
}

function validateRetirementDuration(value: number): QuickValidationResult {
  if (value < 1) {
    return { isValid: false, error: 'Retirement duration must be at least 1 year' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Retirement duration cannot exceed 50 years' };
  }
  
  return { isValid: true };
}

function validateLegacyGoals(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Legacy goals cannot be negative' };
  }
  
  if (value > 10000000) {
    return { isValid: true, warning: 'Legacy goals seems unusually high' };
  }
  
  return { isValid: true };
}

// Risk Info Validation Functions
function validateRiskTolerance(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Risk tolerance is required' };
  }
  
  const validTolerances = ['conservative', 'moderate', 'aggressive'];
  if (!validTolerances.includes(value)) {
    return { isValid: false, error: 'Invalid risk tolerance' };
  }
  
  return { isValid: true };
}

function validateInvestmentHorizon(value: number): QuickValidationResult {
  if (value < 1) {
    return { isValid: false, error: 'Investment horizon must be at least 1 year' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Investment horizon cannot exceed 50 years' };
  }
  
  return { isValid: true };
}

function validateLiquidityNeeds(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Liquidity needs is required' };
  }
  
  const validNeeds = ['low', 'medium', 'high'];
  if (!validNeeds.includes(value)) {
    return { isValid: false, error: 'Invalid liquidity needs' };
  }
  
  return { isValid: true };
}

function validateInflationRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inflation risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Inflation risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateMarketRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Market risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateLongevityRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Longevity risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Longevity risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateHealthcareRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Healthcare risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Healthcare risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

// Savings Strategy Validation Functions
function validateCurrentSavingsRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Current savings rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Current savings rate cannot exceed 100%' };
  }
  
  if (value < 0.05) {
    return { isValid: true, warning: 'Current savings rate seems low for retirement planning' };
  }
  
  return { isValid: true };
}

function validateTargetSavingsRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Target savings rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Target savings rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateEmployerMatch(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Employer match cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Employer match cannot exceed 100%' };
  }
  
  return { isValid: true };
}

// Investment Strategy Validation Functions
function validateAssetAllocation(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Asset allocation is required' };
  }
  
  const validAllocations = ['conservative', 'moderate', 'aggressive'];
  if (!validAllocations.includes(value)) {
    return { isValid: false, error: 'Invalid asset allocation' };
  }
  
  return { isValid: true };
}

function validateTargetReturn(value: number): QuickValidationResult {
  if (value < -1) {
    return { isValid: false, error: 'Target return cannot be less than -100%' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Target return cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateRebalancingFrequency(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Rebalancing frequency is required' };
  }
  
  const validFrequencies = ['monthly', 'quarterly', 'semi_annually', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, error: 'Invalid rebalancing frequency' };
  }
  
  return { isValid: true };
}

// Withdrawal Strategy Validation Functions
function validateWithdrawalRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Withdrawal rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Withdrawal rate cannot exceed 100%' };
  }
  
  if (value > 0.06) {
    return { isValid: true, warning: 'Withdrawal rate above 6% may be unsustainable' };
  }
  
  return { isValid: true };
}

function validateWithdrawalMethod(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Withdrawal method is required' };
  }
  
  const validMethods = ['systematic', 'percentage', 'fixed_amount'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Invalid withdrawal method' };
  }
  
  return { isValid: true };
}