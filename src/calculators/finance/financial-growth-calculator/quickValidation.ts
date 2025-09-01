import { FinancialGrowthInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof FinancialGrowthInputs, value: any, inputs: FinancialGrowthInputs): FieldValidationResult {
  switch (field) {
    case 'currentIncome':
      return validateCurrentIncome(value);
    case 'currentSavings':
      return validateCurrentSavings(value);
    case 'currentInvestments':
      return validateCurrentInvestments(value);
    case 'currentDebt':
      return validateCurrentDebt(value, inputs);
    case 'age':
      return validateAge(value);
    case 'retirementAge':
      return validateRetirementAge(value, inputs);
    case 'lifeExpectancy':
      return validateLifeExpectancy(value, inputs);
    case 'incomeGrowthRate':
      return validateIncomeGrowthRate(value);
    case 'savingsRate':
      return validateSavingsRate(value, inputs);
    case 'investmentReturn':
      return validateInvestmentReturn(value, inputs);
    case 'debtInterestRate':
      return validateDebtInterestRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'riskTolerance':
      return validateRiskTolerance(value);
    case 'financialGoals':
      return validateFinancialGoals(value);
    case 'goalPriorities':
      return validateGoalPriorities(value);
    case 'currentFinancialHabits':
      return validateCurrentFinancialHabits(value);
    case 'marketConditions':
      return validateMarketConditions(value);
    case 'economicOutlook':
      return validateEconomicOutlook(value);
    case 'personalCircumstances':
      return validatePersonalCircumstances(value);
    default:
      return { isValid: true };
  }
}

function validateCurrentIncome(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Current income must be greater than 0' };
  }
  if (numValue > 10000000) {
    return { isValid: false, warning: 'Current income seems unusually high' };
  }
  return { isValid: true };
}

function validateCurrentSavings(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Current savings cannot be negative' };
  }
  if (numValue > 10000000) {
    return { isValid: false, warning: 'Current savings seems unusually high' };
  }
  return { isValid: true };
}

function validateCurrentInvestments(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Current investments cannot be negative' };
  }
  if (numValue > 10000000) {
    return { isValid: false, warning: 'Current investments seem unusually high' };
  }
  return { isValid: true };
}

function validateCurrentDebt(value: any, inputs: FinancialGrowthInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Current debt cannot be negative' };
  }
  if (numValue > 10000000) {
    return { isValid: false, warning: 'Current debt seems unusually high' };
  }
  if (inputs.currentIncome && numValue > inputs.currentIncome * 2) {
    return { isValid: false, warning: 'Debt amount seems unusually high relative to income' };
  }
  return { isValid: true };
}

function validateAge(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0 || numValue > 120) {
    return { isValid: false, error: 'Age must be between 1 and 120' };
  }
  return { isValid: true };
}

function validateRetirementAge(value: any, inputs: FinancialGrowthInputs): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0 || numValue > 100) {
    return { isValid: false, error: 'Retirement age must be between 1 and 100' };
  }
  if (inputs.age && numValue <= inputs.age) {
    return { isValid: false, error: 'Retirement age must be greater than current age' };
  }
  return { isValid: true };
}

function validateLifeExpectancy(value: any, inputs: FinancialGrowthInputs): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0 || numValue > 120) {
    return { isValid: false, error: 'Life expectancy must be between 1 and 120' };
  }
  if (inputs.retirementAge && numValue <= inputs.retirementAge) {
    return { isValid: false, error: 'Life expectancy must be greater than retirement age' };
  }
  return { isValid: true };
}

function validateIncomeGrowthRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -50 || numValue > 100) {
    return { isValid: false, error: 'Income growth rate must be between -50% and 100%' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Income growth rate seems unusually high' };
  }
  return { isValid: true };
}

function validateSavingsRate(value: any, inputs: FinancialGrowthInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Savings rate must be between 0% and 100%' };
  }
  if (inputs.currentDebt && inputs.currentIncome) {
    const debtPaymentRatio = (inputs.currentDebt / inputs.currentIncome) * 100;
    if (numValue + debtPaymentRatio > 100) {
      return { isValid: false, warning: 'Savings rate plus debt payments cannot exceed 100% of income' };
    }
  }
  if (numValue < 10) {
    return { isValid: false, warning: 'Consider increasing savings rate to at least 10% for better growth' };
  }
  return { isValid: true };
}

function validateInvestmentReturn(value: any, inputs: FinancialGrowthInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -50 || numValue > 100) {
    return { isValid: false, error: 'Investment return must be between -50% and 100%' };
  }
  if (inputs.riskTolerance === 'conservative' && numValue > 50) {
    return { isValid: false, warning: 'Investment return seems too high for conservative risk tolerance' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Investment return seems unusually high' };
  }
  return { isValid: true };
}

function validateDebtInterestRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Debt interest rate must be between 0% and 100%' };
  }
  if (numValue > 15) {
    return { isValid: false, warning: 'Consider refinancing high-interest debt' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -50 || numValue > 100) {
    return { isValid: false, error: 'Inflation rate must be between -50% and 100%' };
  }
  if (numValue > 10) {
    return { isValid: false, warning: 'Inflation rate seems unusually high' };
  }
  return { isValid: true };
}

function validateRiskTolerance(value: any): FieldValidationResult {
  const validValues = ['conservative', 'moderate', 'aggressive'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid risk tolerance value' };
  }
  return { isValid: true };
}

function validateFinancialGoals(value: any): FieldValidationResult {
  if (!Array.isArray(value) || value.length === 0) {
    return { isValid: false, error: 'At least one financial goal must be selected' };
  }
  const validGoals = ['retirement', 'emergency_fund', 'debt_payoff', 'home_purchase', 'education', 'business_startup', 'legacy_planning'];
  const invalidGoals = value.filter(goal => !validGoals.includes(goal));
  if (invalidGoals.length > 0) {
    return { isValid: false, error: `Invalid financial goals: ${invalidGoals.join(', ')}` };
  }
  return { isValid: true };
}

function validateGoalPriorities(value: any): FieldValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Goal priorities must be defined' };
  }
  
  const priorities = Object.values(value);
  const uniquePriorities = new Set(priorities);
  
  if (priorities.length !== uniquePriorities.size) {
    return { isValid: false, error: 'Goal priorities must be unique' };
  }
  
  for (const priority of priorities) {
    if (typeof priority !== 'number' || priority < 1 || priority > 7) {
      return { isValid: false, error: 'Goal priorities must be numbers between 1 and 7' };
    }
  }
  
  return { isValid: true };
}

function validateCurrentFinancialHabits(value: any): FieldValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Financial habits must be defined' };
  }
  
  const validHabitLevels = ['excellent', 'good', 'fair', 'poor'];
  const validHabits = ['budgeting', 'saving', 'investing', 'debt_management', 'insurance', 'tax_planning', 'estate_planning'];
  
  for (const [habit, level] of Object.entries(value)) {
    if (!validHabits.includes(habit)) {
      return { isValid: false, error: `Invalid financial habit: ${habit}` };
    }
    if (!validHabitLevels.includes(level as string)) {
      return { isValid: false, error: `Invalid habit level for ${habit}: ${level}` };
    }
  }
  
  return { isValid: true };
}

function validateMarketConditions(value: any): FieldValidationResult {
  const validValues = ['bullish', 'stable', 'bearish', 'volatile'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid market conditions value' };
  }
  return { isValid: true };
}

function validateEconomicOutlook(value: any): FieldValidationResult {
  const validValues = ['very_positive', 'positive', 'neutral', 'negative', 'very_negative'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid economic outlook value' };
  }
  return { isValid: true };
}

function validatePersonalCircumstances(value: any): FieldValidationResult {
  const validValues = ['improving', 'stable', 'challenging', 'uncertain'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid personal circumstances value' };
  }
  return { isValid: true };
}