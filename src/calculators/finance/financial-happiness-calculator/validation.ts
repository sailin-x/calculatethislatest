import { FinancialHappinessInputs, FinancialHappinessOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateFinancialHappinessInputs(inputs: FinancialHappinessInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Basic validation
  if (inputs.currentIncome <= 0) {
    errors.currentIncome = 'Current income must be greater than 0';
  }

  if (inputs.currentIncome > 10000000) {
    errors.currentIncome = 'Current income seems unusually high';
  }

  if (inputs.currentSavings < 0) {
    errors.currentSavings = 'Current savings cannot be negative';
  }

  if (inputs.currentSavings > 10000000) {
    errors.currentSavings = 'Current savings seems unusually high';
  }

  if (inputs.currentDebt < 0) {
    errors.currentDebt = 'Current debt cannot be negative';
  }

  if (inputs.currentDebt > 10000000) {
    errors.currentDebt = 'Current debt seems unusually high';
  }

  if (inputs.age <= 0 || inputs.age > 120) {
    errors.age = 'Age must be between 1 and 120';
  }

  if (!['single', 'married', 'divorced', 'widowed', 'partnered'].includes(inputs.maritalStatus)) {
    errors.maritalStatus = 'Invalid marital status value';
  }

  if (inputs.dependents < 0 || inputs.dependents > 10) {
    errors.dependents = 'Number of dependents must be between 0 and 10';
  }

  if (!['high_school', 'some_college', 'bachelors', 'masters', 'doctorate', 'trade_school'].includes(inputs.education)) {
    errors.education = 'Invalid education level value';
  }

  if (inputs.jobSatisfaction < 1 || inputs.jobSatisfaction > 10) {
    errors.jobSatisfaction = 'Job satisfaction must be between 1 and 10';
  }

  if (inputs.workLifeBalance < 1 || inputs.workLifeBalance > 10) {
    errors.workLifeBalance = 'Work-life balance must be between 1 and 10';
  }

  if (inputs.careerGrowth < 1 || inputs.careerGrowth > 10) {
    errors.careerGrowth = 'Career growth potential must be between 1 and 10';
  }

  if (inputs.financialStress < 1 || inputs.financialStress > 10) {
    errors.financialStress = 'Financial stress level must be between 1 and 10';
  }

  if (inputs.lifeSatisfaction < 1 || inputs.lifeSatisfaction > 10) {
    errors.lifeSatisfaction = 'Life satisfaction must be between 1 and 10';
  }

  if (inputs.socialConnections < 1 || inputs.socialConnections > 10) {
    errors.socialConnections = 'Social connections quality must be between 1 and 10';
  }

  if (!['excellent', 'very_good', 'good', 'fair', 'poor'].includes(inputs.healthStatus)) {
    errors.healthStatus = 'Invalid health status value';
  }

  if (!Array.isArray(inputs.personalGoals) || inputs.personalGoals.length === 0) {
    errors.personalGoals = 'At least one personal goal must be selected';
  }

  // Validate personal goals
  const validGoals = ['career_advancement', 'financial_security', 'work_life_balance', 'personal_development', 'relationships', 'health_wellness', 'community_contribution'];
  inputs.personalGoals.forEach(goal => {
    if (!validGoals.includes(goal)) {
      errors.personalGoals = `Invalid personal goal: ${goal}`;
    }
  });

  // Validate goal priorities
  if (!inputs.goalPriorities || typeof inputs.goalPriorities !== 'object') {
    errors.goalPriorities = 'Goal priorities must be defined';
  } else {
    const priorities = Object.values(inputs.goalPriorities);
    const uniquePriorities = new Set(priorities);
    if (priorities.length !== uniquePriorities.size) {
      errors.goalPriorities = 'Goal priorities must be unique';
    }
    
    priorities.forEach(priority => {
      if (typeof priority !== 'number' || priority < 1 || priority > 7) {
        errors.goalPriorities = 'Goal priorities must be numbers between 1 and 7';
      }
    });
  }

  // Validate current lifestyle
  if (!inputs.currentLifestyle || typeof inputs.currentLifestyle !== 'object') {
    errors.currentLifestyle = 'Current lifestyle must be defined';
  } else {
    const validLifestyleLevels = ['luxury', 'comfortable', 'moderate', 'basic', 'minimal'];
    const validLifestyleAspects = ['housing', 'transportation', 'entertainment', 'dining', 'travel', 'shopping', 'health_care'];
    
    Object.entries(inputs.currentLifestyle).forEach(([aspect, level]) => {
      if (!validLifestyleAspects.includes(aspect)) {
        errors.currentLifestyle = `Invalid lifestyle aspect: ${aspect}`;
      }
      if (!validLifestyleLevels.includes(level)) {
        errors.currentLifestyle = `Invalid lifestyle level for ${aspect}: ${level}`;
      }
    });
  }

  // Validate financial values
  if (!inputs.financialValues || typeof inputs.financialValues !== 'object') {
    errors.financialValues = 'Financial values must be defined';
  } else {
    const validValues = ['security', 'freedom', 'growth', 'stability', 'flexibility', 'legacy', 'experiences'];
    
    Object.entries(inputs.financialValues).forEach(([value, importance]) => {
      if (!validValues.includes(value)) {
        errors.financialValues = `Invalid financial value: ${value}`;
      }
      if (typeof importance !== 'number' || importance < 1 || importance > 10) {
        errors.financialValues = `Value importance for ${value} must be between 1 and 10`;
      }
    });
  }

  if (!['improving', 'stable', 'challenging', 'uncertain'].includes(inputs.lifeCircumstances)) {
    errors.lifeCircumstances = 'Invalid life circumstances value';
  }

  if (!['very_strong', 'strong', 'moderate', 'weak', 'very_weak'].includes(inputs.supportNetwork)) {
    errors.supportNetwork = 'Invalid support network value';
  }

  if (!['very_active', 'active', 'moderate', 'inactive', 'very_inactive'].includes(inputs.personalGrowth)) {
    errors.personalGrowth = 'Invalid personal growth value';
  }

  // Business logic validations
  if (inputs.currentDebt > inputs.currentIncome * 2) {
    errors.currentDebt = 'Debt amount seems unusually high relative to income';
  }

  if (inputs.financialStress >= 8 && inputs.currentSavings < inputs.currentIncome * 0.1) {
    errors.financialStress = 'High financial stress with low savings suggests need for emergency fund';
  }

  if (inputs.workLifeBalance <= 3 && inputs.jobSatisfaction >= 8) {
    errors.workLifeBalance = 'High job satisfaction with poor work-life balance may indicate workaholic tendencies';
  }

  if (inputs.age < 25 && inputs.currentSavings > inputs.currentIncome * 2) {
    errors.currentSavings = 'Savings amount seems unusually high for your age and income';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateFinancialHappinessOutputs(outputs: FinancialHappinessOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate outputs
  if (outputs.happinessScore < 0 || outputs.happinessScore > 100) {
    errors.happinessScore = 'Happiness score must be between 0 and 100';
  }

  if (outputs.financialWellnessScore < 0 || outputs.financialWellnessScore > 100) {
    errors.financialWellnessScore = 'Financial wellness score must be between 0 and 100';
  }

  if (outputs.lifeSatisfactionScore < 0 || outputs.lifeSatisfactionScore > 100) {
    errors.lifeSatisfactionScore = 'Life satisfaction score must be between 0 and 100';
  }

  if (outputs.stressLevelScore < 0 || outputs.stressLevelScore > 100) {
    errors.stressLevelScore = 'Stress level score must be between 0 and 100';
  }

  // Validate happiness metrics
  if (!outputs.happinessMetrics || typeof outputs.happinessMetrics !== 'object') {
    errors.happinessMetrics = 'Happiness metrics must be defined';
  } else {
    Object.entries(outputs.happinessMetrics).forEach(([metric, value]) => {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.happinessMetrics = `Invalid value for metric ${metric}`;
      }
      if (value < 0 || value > 100) {
        errors.happinessMetrics = `Metric ${metric} must be between 0 and 100`;
      }
    });
  }

  // Validate happiness analysis
  if (!outputs.happinessAnalysis || typeof outputs.happinessAnalysis !== 'object') {
    errors.happinessAnalysis = 'Happiness analysis must be defined';
  } else {
    const { strengths, areasForImprovement, riskFactors } = outputs.happinessAnalysis;
    
    if (!Array.isArray(strengths)) {
      errors.happinessAnalysis = 'Strengths must be an array';
    }
    
    if (!Array.isArray(areasForImprovement)) {
      errors.happinessAnalysis = 'Areas for improvement must be an array';
    }
    
    if (!Array.isArray(riskFactors)) {
      errors.happinessAnalysis = 'Risk factors must be an array';
    }
  }

  // Validate happiness insights
  if (!Array.isArray(outputs.happinessInsights)) {
    errors.happinessInsights = 'Happiness insights must be an array';
  }

  // Validate happiness recommendations
  if (!Array.isArray(outputs.happinessRecommendations)) {
    errors.happinessRecommendations = 'Happiness recommendations must be an array';
  }

  // Cross-validation checks
  if (outputs.happinessScore >= 80 && outputs.stressLevelScore < 60) {
    errors.happinessScore = 'High happiness score with low stress level score suggests calculation error';
  }

  if (outputs.financialWellnessScore >= 80 && outputs.happinessScore < 60) {
    errors.financialWellnessScore = 'High financial wellness with low happiness score suggests calculation error';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}