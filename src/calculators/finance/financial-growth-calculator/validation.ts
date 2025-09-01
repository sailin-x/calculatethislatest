import { FinancialGrowthInputs, FinancialGrowthOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateFinancialGrowthInputs(inputs: FinancialGrowthInputs): ValidationResult {
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

  if (inputs.currentInvestments < 0) {
    errors.currentInvestments = 'Current investments cannot be negative';
  }

  if (inputs.currentInvestments > 10000000) {
    errors.currentInvestments = 'Current investments seem unusually high';
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

  if (inputs.retirementAge <= inputs.age) {
    errors.retirementAge = 'Retirement age must be greater than current age';
  }

  if (inputs.retirementAge > 100) {
    errors.retirementAge = 'Retirement age cannot exceed 100';
  }

  if (inputs.lifeExpectancy <= inputs.retirementAge) {
    errors.lifeExpectancy = 'Life expectancy must be greater than retirement age';
  }

  if (inputs.lifeExpectancy > 120) {
    errors.lifeExpectancy = 'Life expectancy cannot exceed 120';
  }

  if (inputs.incomeGrowthRate < -50 || inputs.incomeGrowthRate > 100) {
    errors.incomeGrowthRate = 'Income growth rate must be between -50% and 100%';
  }

  if (inputs.savingsRate < 0 || inputs.savingsRate > 100) {
    errors.savingsRate = 'Savings rate must be between 0% and 100%';
  }

  if (inputs.investmentReturn < -50 || inputs.investmentReturn > 100) {
    errors.investmentReturn = 'Investment return must be between -50% and 100%';
  }

  if (inputs.debtInterestRate < 0 || inputs.debtInterestRate > 100) {
    errors.debtInterestRate = 'Debt interest rate must be between 0% and 100%';
  }

  if (inputs.inflationRate < -50 || inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate must be between -50% and 100%';
  }

  if (!['conservative', 'moderate', 'aggressive'].includes(inputs.riskTolerance)) {
    errors.riskTolerance = 'Invalid risk tolerance value';
  }

  if (!Array.isArray(inputs.financialGoals) || inputs.financialGoals.length === 0) {
    errors.financialGoals = 'At least one financial goal must be selected';
  }

  // Validate financial goals
  const validGoals = ['retirement', 'emergency_fund', 'debt_payoff', 'home_purchase', 'education', 'business_startup', 'legacy_planning'];
  inputs.financialGoals.forEach(goal => {
    if (!validGoals.includes(goal)) {
      errors.financialGoals = `Invalid financial goal: ${goal}`;
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

  // Validate financial habits
  if (!inputs.currentFinancialHabits || typeof inputs.currentFinancialHabits !== 'object') {
    errors.currentFinancialHabits = 'Financial habits must be defined';
  } else {
    const validHabitLevels = ['excellent', 'good', 'fair', 'poor'];
    const validHabits = ['budgeting', 'saving', 'investing', 'debt_management', 'insurance', 'tax_planning', 'estate_planning'];
    
    Object.entries(inputs.currentFinancialHabits).forEach(([habit, level]) => {
      if (!validHabits.includes(habit)) {
        errors.currentFinancialHabits = `Invalid financial habit: ${habit}`;
      }
      if (!validHabitLevels.includes(level)) {
        errors.currentFinancialHabits = `Invalid habit level for ${habit}: ${level}`;
      }
    });
  }

  if (!['bullish', 'stable', 'bearish', 'volatile'].includes(inputs.marketConditions)) {
    errors.marketConditions = 'Invalid market conditions value';
  }

  if (!['very_positive', 'positive', 'neutral', 'negative', 'very_negative'].includes(inputs.economicOutlook)) {
    errors.economicOutlook = 'Invalid economic outlook value';
  }

  if (!['improving', 'stable', 'challenging', 'uncertain'].includes(inputs.personalCircumstances)) {
    errors.personalCircumstances = 'Invalid personal circumstances value';
  }

  // Business logic validations
  if (inputs.currentDebt > inputs.currentIncome * 2) {
    errors.currentDebt = 'Debt amount seems unusually high relative to income';
  }

  if (inputs.savingsRate + (inputs.currentDebt / inputs.currentIncome * 100) > 100) {
    errors.savingsRate = 'Savings rate plus debt payments cannot exceed 100% of income';
  }

  if (inputs.investmentReturn > 50 && inputs.riskTolerance === 'conservative') {
    errors.investmentReturn = 'Investment return seems too high for conservative risk tolerance';
  }

  if (inputs.incomeGrowthRate > 20) {
    errors.incomeGrowthRate = 'Income growth rate seems unusually high';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateFinancialGrowthOutputs(outputs: FinancialGrowthOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate outputs
  if (outputs.growthScore < 0 || outputs.growthScore > 100) {
    errors.growthScore = 'Growth score must be between 0 and 100';
  }

  if (outputs.netWorth < -10000000) {
    errors.netWorth = 'Net worth seems unusually low';
  }

  if (outputs.netWorth > 1000000000) {
    errors.netWorth = 'Net worth seems unusually high';
  }

  if (outputs.retirementSavings < 0) {
    errors.retirementSavings = 'Retirement savings cannot be negative';
  }

  if (outputs.retirementSavings > 1000000000) {
    errors.retirementSavings = 'Retirement savings seems unusually high';
  }

  if (outputs.financialIndependenceAge < 18) {
    errors.financialIndependenceAge = 'Financial independence age cannot be below 18';
  }

  if (outputs.financialIndependenceAge > 120) {
    errors.financialIndependenceAge = 'Financial independence age cannot exceed 120';
  }

  // Validate growth metrics
  if (!outputs.growthMetrics || typeof outputs.growthMetrics !== 'object') {
    errors.growthMetrics = 'Growth metrics must be defined';
  } else {
    Object.entries(outputs.growthMetrics).forEach(([metric, value]) => {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.growthMetrics = `Invalid value for metric ${metric}`;
      }
    });
  }

  // Validate growth projections
  if (!outputs.growthProjections || typeof outputs.growthProjections !== 'object') {
    errors.growthProjections = 'Growth projections must be defined';
  } else {
    const { netWorthProjections, incomeProjections, investmentProjections } = outputs.growthProjections;
    
    if (!Array.isArray(netWorthProjections) || netWorthProjections.length === 0) {
      errors.growthProjections = 'Net worth projections must be an array with at least one projection';
    }
    
    if (!Array.isArray(incomeProjections) || incomeProjections.length === 0) {
      errors.growthProjections = 'Income projections must be an array with at least one projection';
    }
    
    if (!Array.isArray(investmentProjections) || investmentProjections.length === 0) {
      errors.growthProjections = 'Investment projections must be an array with at least one projection';
    }
  }

  // Validate growth analysis
  if (!outputs.growthAnalysis || typeof outputs.growthAnalysis !== 'object') {
    errors.growthAnalysis = 'Growth analysis must be defined';
  } else {
    const { strengths, areasForImprovement, riskFactors } = outputs.growthAnalysis;
    
    if (!Array.isArray(strengths)) {
      errors.growthAnalysis = 'Strengths must be an array';
    }
    
    if (!Array.isArray(areasForImprovement)) {
      errors.growthAnalysis = 'Areas for improvement must be an array';
    }
    
    if (!Array.isArray(riskFactors)) {
      errors.growthAnalysis = 'Risk factors must be an array';
    }
  }

  // Validate growth insights
  if (!Array.isArray(outputs.growthInsights)) {
    errors.growthInsights = 'Growth insights must be an array';
  }

  // Validate growth recommendations
  if (!Array.isArray(outputs.growthRecommendations)) {
    errors.growthRecommendations = 'Growth recommendations must be an array';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}