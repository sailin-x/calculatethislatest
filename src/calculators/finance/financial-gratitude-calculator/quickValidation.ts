import { FinancialGratitudeInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof FinancialGratitudeInputs, value: any, inputs: FinancialGratitudeInputs): FieldValidationResult {
  switch (field) {
    case 'age':
      return validateAge(value);
    case 'income':
      return validateIncome(value);
    case 'expenses':
      return validateExpenses(value, inputs);
    case 'savings':
      return validateSavings(value, inputs);
    case 'debt':
      return validateDebt(value, inputs);
    case 'gratitudeLevel':
      return validateGratitudeLevel(value);
    case 'financialSatisfaction':
      return validateFinancialSatisfaction(value);
    case 'lifeSatisfaction':
      return validateLifeSatisfaction(value);
    case 'stressLevel':
      return validateStressLevel(value);
    case 'optimismLevel':
      return validateOptimismLevel(value);
    case 'spendingAlignment':
      return validateSpendingAlignment(value);
    case 'savingMotivation':
      return validateSavingMotivation(value);
    case 'impulseControl':
      return validateImpulseControl(value);
    case 'delayedGratification':
      return validateDelayedGratification(value);
    case 'financialLiteracy':
      return validateFinancialLiteracy(value);
    case 'riskTolerance':
      return validateRiskTolerance(value);
    case 'socialComparison':
      return validateSocialComparison(value);
    case 'economicOutlook':
      return validateEconomicOutlook(value);
    case 'jobSecurity':
      return validateJobSecurity(value);
    case 'marketConditions':
      return validateMarketConditions(value);
    case 'inflationExpectations':
      return validateInflationExpectations(value);
    case 'interestRateOutlook':
      return validateInterestRateOutlook(value);
    case 'gratitudeFrequency':
      return validateGratitudeFrequency(value);
    case 'reflectionTime':
      return validateReflectionTime(value);
    case 'appreciationExpressions':
      return validateAppreciationExpressions(value);
    case 'familySupport':
      return validateFamilySupport(value);
    case 'friendSupport':
      return validateFriendSupport(value);
    case 'professionalSupport':
      return validateProfessionalSupport(value);
    case 'communityInvolvement':
      return validateCommunityInvolvement(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'confidenceLevel':
      return validateConfidenceLevel(value);
    case 'scenarioCount':
      return validateScenarioCount(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validateAge(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 18 || numValue > 120) {
    return { isValid: false, error: 'Age must be between 18 and 120' };
  }
  if (numValue < 25) {
    return { isValid: false, warning: 'Young age may affect financial experience' };
  }
  return { isValid: true };
}

function validateIncome(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Income cannot be negative' };
  }
  if (numValue > 10000000) {
    return { isValid: false, warning: 'Income seems unusually high' };
  }
  if (numValue < 10000) {
    return { isValid: false, warning: 'Income seems unusually low' };
  }
  return { isValid: true };
}

function validateExpenses(value: any, inputs: FinancialGratitudeInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Expenses cannot be negative' };
  }
  if (inputs.income && numValue > inputs.income * 2) {
    return { isValid: false, warning: 'Expenses seem unusually high relative to income' };
  }
  return { isValid: true };
}

function validateSavings(value: any, inputs: FinancialGratitudeInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Savings cannot be negative' };
  }
  if (inputs.income && numValue > inputs.income * 10) {
    return { isValid: false, warning: 'Savings seem unusually high relative to income' };
  }
  return { isValid: true };
}

function validateDebt(value: any, inputs: FinancialGratitudeInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Debt cannot be negative' };
  }
  if (inputs.income && numValue > inputs.income * 5) {
    return { isValid: false, warning: 'Debt seems unusually high relative to income' };
  }
  return { isValid: true };
}

function validateGratitudeLevel(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Gratitude level must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low gratitude level may impact financial mindset' };
  }
  return { isValid: true };
}

function validateFinancialSatisfaction(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Financial satisfaction must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low financial satisfaction indicates need for improvement' };
  }
  return { isValid: true };
}

function validateLifeSatisfaction(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Life satisfaction must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low life satisfaction may affect overall well-being' };
  }
  return { isValid: true };
}

function validateStressLevel(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Stress level must be between 1 and 10' };
  }
  if (numValue >= 8) {
    return { isValid: false, warning: 'High stress level may impact financial decision-making' };
  }
  return { isValid: true };
}

function validateOptimismLevel(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Optimism level must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low optimism level may affect financial outlook' };
  }
  return { isValid: true };
}

function validateSpendingAlignment(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Spending alignment must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low spending alignment may indicate value conflicts' };
  }
  return { isValid: true };
}

function validateSavingMotivation(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Saving motivation must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low saving motivation may impact financial goals' };
  }
  return { isValid: true };
}

function validateImpulseControl(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Impulse control must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low impulse control may lead to unnecessary spending' };
  }
  return { isValid: true };
}

function validateDelayedGratification(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Delayed gratification must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low delayed gratification may impact long-term goals' };
  }
  return { isValid: true };
}

function validateFinancialLiteracy(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Financial literacy must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low financial literacy may affect decision-making' };
  }
  return { isValid: true };
}

function validateRiskTolerance(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Risk tolerance must be between 1 and 10' };
  }
  if (numValue >= 8) {
    return { isValid: false, warning: 'High risk tolerance may lead to excessive risk-taking' };
  }
  return { isValid: true };
}

function validateSocialComparison(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Social comparison must be between 1 and 10' };
  }
  if (numValue >= 8) {
    return { isValid: false, warning: 'High social comparison may lead to unnecessary spending' };
  }
  return { isValid: true };
}

function validateEconomicOutlook(value: any): FieldValidationResult {
  const validOutlooks = ['positive', 'neutral', 'negative'];
  if (!validOutlooks.includes(value)) {
    return { isValid: false, error: 'Invalid economic outlook' };
  }
  return { isValid: true };
}

function validateJobSecurity(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Job security must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low job security may affect financial planning' };
  }
  return { isValid: true };
}

function validateMarketConditions(value: any): FieldValidationResult {
  const validConditions = ['stable', 'volatile', 'declining'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid market conditions' };
  }
  return { isValid: true };
}

function validateInflationExpectations(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Inflation expectations must be between 1 and 10' };
  }
  if (numValue >= 8) {
    return { isValid: false, warning: 'High inflation expectations may affect purchasing decisions' };
  }
  return { isValid: true };
}

function validateInterestRateOutlook(value: any): FieldValidationResult {
  const validOutlooks = ['stable', 'rising', 'falling'];
  if (!validOutlooks.includes(value)) {
    return { isValid: false, error: 'Invalid interest rate outlook' };
  }
  return { isValid: true };
}

function validateGratitudeFrequency(value: any): FieldValidationResult {
  const validFrequencies = ['daily', 'weekly', 'monthly', 'rarely'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, error: 'Invalid gratitude frequency' };
  }
  if (value === 'rarely') {
    return { isValid: false, warning: 'Infrequent gratitude practice may limit benefits' };
  }
  return { isValid: true };
}

function validateReflectionTime(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 120) {
    return { isValid: false, error: 'Reflection time must be between 0 and 120 minutes' };
  }
  if (numValue < 5) {
    return { isValid: false, warning: 'Very short reflection time may limit effectiveness' };
  }
  return { isValid: true };
}

function validateAppreciationExpressions(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Appreciation expressions must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low appreciation expressions may limit gratitude benefits' };
  }
  return { isValid: true };
}

function validateFamilySupport(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Family support must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low family support may affect financial decisions' };
  }
  return { isValid: true };
}

function validateFriendSupport(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Friend support must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low friend support may limit financial perspectives' };
  }
  return { isValid: true };
}

function validateProfessionalSupport(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Professional support must be between 1 and 10' };
  }
  if (numValue <= 4) {
    return { isValid: false, warning: 'Low professional support may limit financial guidance' };
  }
  return { isValid: true };
}

function validateCommunityInvolvement(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Community involvement must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low community involvement may limit support networks' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 60) {
    return { isValid: false, error: 'Analysis period must be between 1 and 60 months' };
  }
  if (numValue > 24) {
    return { isValid: false, warning: 'Long analysis period may reduce accuracy' };
  }
  return { isValid: true };
}

function validateConfidenceLevel(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 50 || numValue > 99) {
    return { isValid: false, error: 'Confidence level must be between 50% and 99%' };
  }
  if (numValue < 70) {
    return { isValid: false, warning: 'Low confidence level may indicate uncertainty' };
  }
  return { isValid: true };
}

function validateScenarioCount(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Scenario count must be between 1 and 10' };
  }
  if (numValue < 3) {
    return { isValid: false, warning: 'Low scenario count may limit analysis depth' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): FieldValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): FieldValidationResult {
  const validFormats = ['currency', 'percentage', 'decimal'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}