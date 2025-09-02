import { FinancialGratitudeInputs, FinancialGratitudeOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateFinancialGratitudeInputs(inputs: FinancialGratitudeInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Personal Information validation
  if (inputs.age < 18 || inputs.age > 120) {
    errors.age = 'Age must be between 18 and 120';
  }

  if (inputs.income < 0) {
    errors.income = 'Income cannot be negative';
  }

  if (inputs.income > 10000000) {
    errors.income = 'Income seems unusually high';
  }

  if (inputs.expenses < 0) {
    errors.expenses = 'Expenses cannot be negative';
  }

  if (inputs.expenses > inputs.income * 2) {
    errors.expenses = 'Expenses seem unusually high relative to income';
  }

  if (inputs.savings < 0) {
    errors.savings = 'Savings cannot be negative';
  }

  if (inputs.savings > inputs.income * 10) {
    errors.savings = 'Savings seem unusually high relative to income';
  }

  if (inputs.debt < 0) {
    errors.debt = 'Debt cannot be negative';
  }

  if (inputs.debt > inputs.income * 5) {
    errors.debt = 'Debt seems unusually high relative to income';
  }

  // Gratitude Assessment validation
  if (inputs.gratitudeLevel < 1 || inputs.gratitudeLevel > 10) {
    errors.gratitudeLevel = 'Gratitude level must be between 1 and 10';
  }

  if (inputs.financialSatisfaction < 1 || inputs.financialSatisfaction > 10) {
    errors.financialSatisfaction = 'Financial satisfaction must be between 1 and 10';
  }

  if (inputs.lifeSatisfaction < 1 || inputs.lifeSatisfaction > 10) {
    errors.lifeSatisfaction = 'Life satisfaction must be between 1 and 10';
  }

  if (inputs.stressLevel < 1 || inputs.stressLevel > 10) {
    errors.stressLevel = 'Stress level must be between 1 and 10';
  }

  if (inputs.optimismLevel < 1 || inputs.optimismLevel > 10) {
    errors.optimismLevel = 'Optimism level must be between 1 and 10';
  }

  // Financial Goals validation
  if (!inputs.shortTermGoals || inputs.shortTermGoals.length === 0) {
    errors.shortTermGoals = 'At least one short-term goal is required';
  }

  if (!inputs.mediumTermGoals || inputs.mediumTermGoals.length === 0) {
    errors.mediumTermGoals = 'At least one medium-term goal is required';
  }

  if (!inputs.longTermGoals || inputs.longTermGoals.length === 0) {
    errors.longTermGoals = 'At least one long-term goal is required';
  }

  if (inputs.goalPriorities.length !== inputs.shortTermGoals.length + inputs.mediumTermGoals.length + inputs.longTermGoals.length) {
    errors.goalPriorities = 'Number of goal priorities must match total number of goals';
  }

  inputs.goalPriorities.forEach((priority, index) => {
    if (priority < 1 || priority > 10) {
      errors[`goalPriorities[${index}]`] = 'Goal priority must be between 1 and 10';
    }
  });

  // Values and Priorities validation
  if (!inputs.coreValues || inputs.coreValues.length === 0) {
    errors.coreValues = 'At least one core value is required';
  }

  if (inputs.valuePriorities.length !== inputs.coreValues.length) {
    errors.valuePriorities = 'Number of value priorities must match number of core values';
  }

  inputs.valuePriorities.forEach((priority, index) => {
    if (priority < 1 || priority > 10) {
      errors[`valuePriorities[${index}]`] = 'Value priority must be between 1 and 10';
    }
  });

  if (inputs.spendingAlignment < 1 || inputs.spendingAlignment > 10) {
    errors.spendingAlignment = 'Spending alignment must be between 1 and 10';
  }

  if (inputs.savingMotivation < 1 || inputs.savingMotivation > 10) {
    errors.savingMotivation = 'Saving motivation must be between 1 and 10';
  }

  // Behavioral Factors validation
  if (inputs.impulseControl < 1 || inputs.impulseControl > 10) {
    errors.impulseControl = 'Impulse control must be between 1 and 10';
  }

  if (inputs.delayedGratification < 1 || inputs.delayedGratification > 10) {
    errors.delayedGratification = 'Delayed gratification must be between 1 and 10';
  }

  if (inputs.financialLiteracy < 1 || inputs.financialLiteracy > 10) {
    errors.financialLiteracy = 'Financial literacy must be between 1 and 10';
  }

  if (inputs.riskTolerance < 1 || inputs.riskTolerance > 10) {
    errors.riskTolerance = 'Risk tolerance must be between 1 and 10';
  }

  if (inputs.socialComparison < 1 || inputs.socialComparison > 10) {
    errors.socialComparison = 'Social comparison must be between 1 and 10';
  }

  // Environmental Factors validation
  if (!['positive', 'neutral', 'negative'].includes(inputs.economicOutlook)) {
    errors.economicOutlook = 'Invalid economic outlook';
  }

  if (inputs.jobSecurity < 1 || inputs.jobSecurity > 10) {
    errors.jobSecurity = 'Job security must be between 1 and 10';
  }

  if (!['stable', 'volatile', 'declining'].includes(inputs.marketConditions)) {
    errors.marketConditions = 'Invalid market conditions';
  }

  if (inputs.inflationExpectations < 1 || inputs.inflationExpectations > 10) {
    errors.inflationExpectations = 'Inflation expectations must be between 1 and 10';
  }

  if (!['stable', 'rising', 'falling'].includes(inputs.interestRateOutlook)) {
    errors.interestRateOutlook = 'Invalid interest rate outlook';
  }

  // Gratitude Practices validation
  if (!['daily', 'weekly', 'monthly', 'rarely'].includes(inputs.gratitudeFrequency)) {
    errors.gratitudeFrequency = 'Invalid gratitude frequency';
  }

  if (inputs.reflectionTime < 0 || inputs.reflectionTime > 120) {
    errors.reflectionTime = 'Reflection time must be between 0 and 120 minutes';
  }

  if (inputs.appreciationExpressions < 1 || inputs.appreciationExpressions > 10) {
    errors.appreciationExpressions = 'Appreciation expressions must be between 1 and 10';
  }

  // Social Support validation
  if (inputs.familySupport < 1 || inputs.familySupport > 10) {
    errors.familySupport = 'Family support must be between 1 and 10';
  }

  if (inputs.friendSupport < 1 || inputs.friendSupport > 10) {
    errors.friendSupport = 'Friend support must be between 1 and 10';
  }

  if (inputs.professionalSupport < 1 || inputs.professionalSupport > 10) {
    errors.professionalSupport = 'Professional support must be between 1 and 10';
  }

  if (inputs.communityInvolvement < 1 || inputs.communityInvolvement > 10) {
    errors.communityInvolvement = 'Community involvement must be between 1 and 10';
  }

  // Analysis Parameters validation
  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 60) {
    errors.analysisPeriod = 'Analysis period must be between 1 and 60 months';
  }

  if (inputs.confidenceLevel < 50 || inputs.confidenceLevel > 99) {
    errors.confidenceLevel = 'Confidence level must be between 50% and 99%';
  }

  if (inputs.scenarioCount < 1 || inputs.scenarioCount > 10) {
    errors.scenarioCount = 'Scenario count must be between 1 and 10';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateFinancialGratitudeOutputs(outputs: FinancialGratitudeOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.gratitudeScore < 0 || outputs.metrics.gratitudeScore > 10) {
    errors.gratitudeScore = 'Gratitude score must be between 0 and 10';
  }

  if (outputs.metrics.financialWellness < 0 || outputs.metrics.financialWellness > 10) {
    errors.financialWellness = 'Financial wellness must be between 0 and 10';
  }

  if (outputs.metrics.lifeSatisfaction < 0 || outputs.metrics.lifeSatisfaction > 10) {
    errors.lifeSatisfaction = 'Life satisfaction must be between 0 and 10';
  }

  if (outputs.metrics.stressLevel < 0 || outputs.metrics.stressLevel > 10) {
    errors.stressLevel = 'Stress level must be between 0 and 10';
  }

  if (outputs.metrics.optimismIndex < 0 || outputs.metrics.optimismIndex > 10) {
    errors.optimismIndex = 'Optimism index must be between 0 and 10';
  }

  if (outputs.metrics.savingsRate < 0 || outputs.metrics.savingsRate > 100) {
    errors.savingsRate = 'Savings rate must be between 0% and 100%';
  }

  if (outputs.metrics.debtToIncome < 0 || outputs.metrics.debtToIncome > 1000) {
    errors.debtToIncome = 'Debt-to-income ratio must be between 0% and 1000%';
  }

  if (outputs.metrics.financialSecurity < 0 || outputs.metrics.financialSecurity > 10) {
    errors.financialSecurity = 'Financial security must be between 0 and 10';
  }

  if (outputs.metrics.financialFreedom < 0 || outputs.metrics.financialFreedom > 10) {
    errors.financialFreedom = 'Financial freedom must be between 0 and 10';
  }

  if (outputs.metrics.selfControl < 0 || outputs.metrics.selfControl > 10) {
    errors.selfControl = 'Self-control must be between 0 and 10';
  }

  if (outputs.metrics.goalAchievement < 0 || outputs.metrics.goalAchievement > 10) {
    errors.goalAchievement = 'Goal achievement must be between 0 and 10';
  }

  if (outputs.metrics.valueAlignment < 0 || outputs.metrics.valueAlignment > 10) {
    errors.valueAlignment = 'Value alignment must be between 0 and 10';
  }

  if (outputs.metrics.socialComparison < 0 || outputs.metrics.socialComparison > 10) {
    errors.socialComparison = 'Social comparison must be between 0 and 10';
  }

  if (outputs.metrics.gratitudePractice < 0 || outputs.metrics.gratitudePractice > 10) {
    errors.gratitudePractice = 'Gratitude practice must be between 0 and 10';
  }

  // Validate gratitude analysis
  if (!outputs.gratitudeAnalysis) {
    errors.gratitudeAnalysis = 'Gratitude analysis is required';
  } else {
    if (!['high', 'medium', 'low'].includes(outputs.gratitudeAnalysis.overallAssessment)) {
      errors.overallAssessment = 'Invalid overall assessment';
    }
    if (outputs.gratitudeAnalysis.confidenceLevel < 1 || outputs.gratitudeAnalysis.confidenceLevel > 10) {
      errors.confidenceLevel = 'Confidence level must be between 1 and 10';
    }
    if (!outputs.gratitudeAnalysis.keyStrengths || outputs.gratitudeAnalysis.keyStrengths.length === 0) {
      errors.keyStrengths = 'Key strengths are required';
    }
    if (!outputs.gratitudeAnalysis.areasForImprovement || outputs.gratitudeAnalysis.areasForImprovement.length === 0) {
      errors.areasForImprovement = 'Areas for improvement are required';
    }
    if (!outputs.gratitudeAnalysis.opportunities || outputs.gratitudeAnalysis.opportunities.length === 0) {
      errors.opportunities = 'Opportunities are required';
    }
  }

  // Validate financial analysis
  if (!outputs.financialAnalysis) {
    errors.financialAnalysis = 'Financial analysis is required';
  } else {
    if (!['strong', 'stable', 'weak'].includes(outputs.financialAnalysis.financialPosition)) {
      errors.financialPosition = 'Invalid financial position';
    }
    if (!['low', 'medium', 'high'].includes(outputs.financialAnalysis.riskLevel)) {
      errors.riskLevel = 'Invalid risk level';
    }
    if (!outputs.financialAnalysis.financialFactors || outputs.financialAnalysis.financialFactors.length === 0) {
      errors.financialFactors = 'Financial factors are required';
    }
    if (!outputs.financialAnalysis.financialOutlook || outputs.financialAnalysis.financialOutlook.length === 0) {
      errors.financialOutlook = 'Financial outlook is required';
    }
  }

  // Validate key insights
  if (!outputs.keyInsights || outputs.keyInsights.length === 0) {
    errors.keyInsights = 'Key insights are required';
  } else {
    outputs.keyInsights.forEach((insight, index) => {
      if (!insight.title || insight.title.trim().length === 0) {
        errors[`keyInsights[${index}].title`] = 'Insight title is required';
      }
      if (!insight.description || insight.description.trim().length === 0) {
        errors[`keyInsights[${index}].description`] = 'Insight description is required';
      }
      if (!['positive', 'neutral', 'negative'].includes(insight.impact)) {
        errors[`keyInsights[${index}].impact`] = 'Invalid impact';
      }
    });
  }

  // Validate recommendations
  if (!outputs.recommendations || outputs.recommendations.length === 0) {
    errors.recommendations = 'Recommendations are required';
  } else {
    outputs.recommendations.forEach((recommendation, index) => {
      if (!recommendation.title || recommendation.title.trim().length === 0) {
        errors[`recommendations[${index}].title`] = 'Recommendation title is required';
      }
      if (!recommendation.description || recommendation.description.trim().length === 0) {
        errors[`recommendations[${index}].description`] = 'Recommendation description is required';
      }
      if (!['high', 'medium', 'low'].includes(recommendation.priority)) {
        errors[`recommendations[${index}].priority`] = 'Invalid priority';
      }
      if (!['high', 'medium', 'low'].includes(recommendation.effort)) {
        errors[`recommendations[${index}].effort`] = 'Invalid effort';
      }
      if (!['high', 'medium', 'low'].includes(recommendation.impact)) {
        errors[`recommendations[${index}].impact`] = 'Invalid impact';
      }
      if (!recommendation.timeframe || recommendation.timeframe.trim().length === 0) {
        errors[`recommendations[${index}].timeframe`] = 'Timeframe is required';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}