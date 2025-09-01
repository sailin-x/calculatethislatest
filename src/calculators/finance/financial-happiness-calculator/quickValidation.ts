import { FinancialHappinessInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof FinancialHappinessInputs, value: any, inputs: FinancialHappinessInputs): FieldValidationResult {
  switch (field) {
    case 'currentIncome':
      return validateCurrentIncome(value);
    case 'currentSavings':
      return validateCurrentSavings(value);
    case 'currentDebt':
      return validateCurrentDebt(value, inputs);
    case 'age':
      return validateAge(value);
    case 'maritalStatus':
      return validateMaritalStatus(value);
    case 'dependents':
      return validateDependents(value);
    case 'education':
      return validateEducation(value);
    case 'jobSatisfaction':
      return validateJobSatisfaction(value);
    case 'workLifeBalance':
      return validateWorkLifeBalance(value);
    case 'careerGrowth':
      return validateCareerGrowth(value);
    case 'financialStress':
      return validateFinancialStress(value, inputs);
    case 'lifeSatisfaction':
      return validateLifeSatisfaction(value);
    case 'socialConnections':
      return validateSocialConnections(value);
    case 'healthStatus':
      return validateHealthStatus(value);
    case 'personalGoals':
      return validatePersonalGoals(value);
    case 'goalPriorities':
      return validateGoalPriorities(value);
    case 'currentLifestyle':
      return validateCurrentLifestyle(value);
    case 'financialValues':
      return validateFinancialValues(value);
    case 'lifeCircumstances':
      return validateLifeCircumstances(value);
    case 'supportNetwork':
      return validateSupportNetwork(value);
    case 'personalGrowth':
      return validatePersonalGrowth(value);
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

function validateCurrentDebt(value: any, inputs: FinancialHappinessInputs): FieldValidationResult {
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

function validateMaritalStatus(value: any): FieldValidationResult {
  const validValues = ['single', 'married', 'divorced', 'widowed', 'partnered'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid marital status value' };
  }
  return { isValid: true };
}

function validateDependents(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Number of dependents must be between 0 and 10' };
  }
  return { isValid: true };
}

function validateEducation(value: any): FieldValidationResult {
  const validValues = ['high_school', 'some_college', 'bachelors', 'masters', 'doctorate', 'trade_school'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid education level value' };
  }
  return { isValid: true };
}

function validateJobSatisfaction(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Job satisfaction must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: true, warning: 'Low job satisfaction may significantly impact happiness' };
  }
  return { isValid: true };
}

function validateWorkLifeBalance(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Work-life balance must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: true, warning: 'Poor work-life balance can lead to burnout' };
  }
  return { isValid: true };
}

function validateCareerGrowth(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Career growth potential must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: true, warning: 'Low career growth potential may affect long-term satisfaction' };
  }
  return { isValid: true };
}

function validateFinancialStress(value: any, inputs: FinancialHappinessInputs): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Financial stress level must be between 1 and 10' };
  }
  if (numValue >= 8 && inputs.currentSavings < inputs.currentIncome * 0.1) {
    return { isValid: true, warning: 'High financial stress with low savings suggests need for emergency fund' };
  }
  return { isValid: true };
}

function validateLifeSatisfaction(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Life satisfaction must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: true, warning: 'Low life satisfaction may indicate need for lifestyle changes' };
  }
  return { isValid: true };
}

function validateSocialConnections(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Social connections quality must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: true, warning: 'Weak social connections can significantly impact happiness' };
  }
  return { isValid: true };
}

function validateHealthStatus(value: any): FieldValidationResult {
  const validValues = ['excellent', 'very_good', 'good', 'fair', 'poor'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid health status value' };
  }
  if (value === 'poor' || value === 'fair') {
    return { isValid: true, warning: 'Health concerns may significantly impact happiness' };
  }
  return { isValid: true };
}

function validatePersonalGoals(value: any): FieldValidationResult {
  if (!Array.isArray(value) || value.length === 0) {
    return { isValid: false, error: 'At least one personal goal must be selected' };
  }
  const validGoals = ['career_advancement', 'financial_security', 'work_life_balance', 'personal_development', 'relationships', 'health_wellness', 'community_contribution'];
  const invalidGoals = value.filter(goal => !validGoals.includes(goal));
  if (invalidGoals.length > 0) {
    return { isValid: false, error: `Invalid personal goals: ${invalidGoals.join(', ')}` };
  }
  if (value.length < 3) {
    return { isValid: true, warning: 'Consider adding more diverse personal goals' };
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

function validateCurrentLifestyle(value: any): FieldValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Current lifestyle must be defined' };
  }
  
  const validLifestyleLevels = ['luxury', 'comfortable', 'moderate', 'basic', 'minimal'];
  const validLifestyleAspects = ['housing', 'transportation', 'entertainment', 'dining', 'travel', 'shopping', 'health_care'];
  
  for (const [aspect, level] of Object.entries(value)) {
    if (!validLifestyleAspects.includes(aspect)) {
      return { isValid: false, error: `Invalid lifestyle aspect: ${aspect}` };
    }
    if (!validLifestyleLevels.includes(level as string)) {
      return { isValid: false, error: `Invalid lifestyle level for ${aspect}: ${level}` };
    }
  }
  
  return { isValid: true };
}

function validateFinancialValues(value: any): FieldValidationResult {
  if (!value || typeof value !== 'object') {
    return { isValid: false, error: 'Financial values must be defined' };
  }
  
  const validValues = ['security', 'freedom', 'growth', 'stability', 'flexibility', 'legacy', 'experiences'];
  
  for (const [valueName, importance] of Object.entries(value)) {
    if (!validValues.includes(valueName)) {
      return { isValid: false, error: `Invalid financial value: ${valueName}` };
    }
    if (typeof importance !== 'number' || importance < 1 || importance > 10) {
      return { isValid: false, error: `Value importance for ${valueName} must be between 1 and 10` };
    }
  }
  
  return { isValid: true };
}

function validateLifeCircumstances(value: any): FieldValidationResult {
  const validValues = ['improving', 'stable', 'challenging', 'uncertain'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid life circumstances value' };
  }
  if (value === 'challenging') {
    return { isValid: true, warning: 'Challenging circumstances may require additional support' };
  }
  return { isValid: true };
}

function validateSupportNetwork(value: any): FieldValidationResult {
  const validValues = ['very_strong', 'strong', 'moderate', 'weak', 'very_weak'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid support network value' };
  }
  if (value === 'weak' || value === 'very_weak') {
    return { isValid: true, warning: 'Weak support network may make challenges more difficult' };
  }
  return { isValid: true };
}

function validatePersonalGrowth(value: any): FieldValidationResult {
  const validValues = ['very_active', 'active', 'moderate', 'inactive', 'very_inactive'];
  if (!validValues.includes(value)) {
    return { isValid: false, error: 'Invalid personal growth value' };
  }
  if (value === 'inactive' || value === 'very_inactive') {
    return { isValid: true, warning: 'Low personal growth activity may impact long-term happiness' };
  }
  return { isValid: true };
}