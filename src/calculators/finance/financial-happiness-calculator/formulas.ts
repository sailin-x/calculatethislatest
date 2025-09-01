import { FinancialHappinessInputs, FinancialHappinessOutputs, HappinessMetric, HappinessAnalysis, HappinessInsight, HappinessRecommendation, Strength, AreaForImprovement, RiskFactor } from './types';

export function calculateFinancialHappiness(inputs: FinancialHappinessInputs): FinancialHappinessOutputs {
  // Calculate basic financial metrics
  const netWorth = inputs.currentSavings - inputs.currentDebt;
  const debtToIncomeRatio = inputs.currentDebt / inputs.currentIncome;

  // Calculate happiness score components
  const financialWellnessScore = calculateFinancialWellnessScore(inputs);
  const lifeSatisfactionScore = calculateLifeSatisfactionScore(inputs);
  const stressLevelScore = calculateStressLevelScore(inputs);
  const careerSatisfactionScore = calculateCareerSatisfactionScore(inputs);
  const socialWellnessScore = calculateSocialWellnessScore(inputs);
  const healthWellnessScore = calculateHealthWellnessScore(inputs);
  const valueAlignmentScore = calculateValueAlignmentScore(inputs);

  // Calculate overall happiness score (weighted average)
  const happinessScore = Math.round(
    (financialWellnessScore * 0.25) +
    (lifeSatisfactionScore * 0.20) +
    (stressLevelScore * 0.20) +
    (careerSatisfactionScore * 0.15) +
    (socialWellnessScore * 0.10) +
    (healthWellnessScore * 0.05) +
    (valueAlignmentScore * 0.05)
  );

  // Calculate happiness metrics
  const happinessMetrics = calculateHappinessMetrics(inputs, netWorth, debtToIncomeRatio);

  // Generate happiness analysis
  const happinessAnalysis = generateHappinessAnalysis(inputs, happinessScore, happinessMetrics);

  // Generate happiness insights
  const happinessInsights = generateHappinessInsights(inputs, happinessScore, happinessMetrics);

  // Generate happiness recommendations
  const happinessRecommendations = generateHappinessRecommendations(inputs, happinessScore, happinessAnalysis);

  return {
    happinessScore,
    financialWellnessScore,
    lifeSatisfactionScore,
    stressLevelScore,
    happinessMetrics,
    happinessAnalysis,
    happinessInsights,
    happinessRecommendations
  };
}

function calculateFinancialWellnessScore(inputs: FinancialHappinessInputs): number {
  const savingsToIncomeRatio = inputs.currentSavings / inputs.currentIncome;
  const debtToIncomeRatio = inputs.currentDebt / inputs.currentIncome;
  const netWorth = inputs.currentSavings - inputs.currentDebt;

  let score = 0;

  // Savings ratio scoring (0-30 points)
  if (savingsToIncomeRatio >= 1) score += 30;
  else if (savingsToIncomeRatio >= 0.5) score += 25;
  else if (savingsToIncomeRatio >= 0.25) score += 20;
  else if (savingsToIncomeRatio >= 0.1) score += 15;
  else if (savingsToIncomeRatio >= 0) score += 10;

  // Debt ratio scoring (0-30 points)
  if (debtToIncomeRatio === 0) score += 30;
  else if (debtToIncomeRatio <= 0.1) score += 25;
  else if (debtToIncomeRatio <= 0.2) score += 20;
  else if (debtToIncomeRatio <= 0.3) score += 15;
  else if (debtToIncomeRatio <= 0.4) score += 10;
  else if (debtToIncomeRatio <= 0.5) score += 5;

  // Net worth scoring (0-40 points)
  if (netWorth > 0) {
    if (netWorth >= inputs.currentIncome) score += 40;
    else if (netWorth >= inputs.currentIncome * 0.5) score += 30;
    else if (netWorth >= inputs.currentIncome * 0.25) score += 20;
    else if (netWorth >= inputs.currentIncome * 0.1) score += 10;
  }

  return Math.min(score, 100);
}

function calculateLifeSatisfactionScore(inputs: FinancialHappinessInputs): number {
  const lifeSatisfaction = inputs.lifeSatisfaction;
  const socialConnections = inputs.socialConnections;
  const healthStatus = inputs.healthStatus;
  const supportNetwork = inputs.supportNetwork;
  const personalGrowth = inputs.personalGrowth;

  let score = 0;

  // Life satisfaction scoring (0-30 points)
  score += lifeSatisfaction * 3;

  // Social connections scoring (0-20 points)
  score += socialConnections * 2;

  // Health status scoring (0-20 points)
  const healthScores: Record<string, number> = {
    excellent: 20,
    very_good: 16,
    good: 12,
    fair: 8,
    poor: 4
  };
  score += healthScores[healthStatus] || 0;

  // Support network scoring (0-15 points)
  const supportScores: Record<string, number> = {
    very_strong: 15,
    strong: 12,
    moderate: 9,
    weak: 6,
    very_weak: 3
  };
  score += supportScores[supportNetwork] || 0;

  // Personal growth scoring (0-15 points)
  const growthScores: Record<string, number> = {
    very_active: 15,
    active: 12,
    moderate: 9,
    inactive: 6,
    very_inactive: 3
  };
  score += growthScores[personalGrowth] || 0;

  return Math.min(score, 100);
}

function calculateStressLevelScore(inputs: FinancialHappinessInputs): number {
  const financialStress = inputs.financialStress;
  const workLifeBalance = inputs.workLifeBalance;
  const lifeCircumstances = inputs.lifeCircumstances;
  const debtToIncomeRatio = inputs.currentDebt / inputs.currentIncome;

  let score = 100; // Start with perfect score

  // Financial stress penalties (0-40 points)
  score -= (financialStress - 1) * 4.44; // Scale 1-10 to 0-40

  // Work-life balance penalties (0-30 points)
  score -= (10 - workLifeBalance) * 3.33; // Scale 1-10 to 0-30

  // Life circumstances penalties (0-20 points)
  const circumstancePenalties: Record<string, number> = {
    improving: 0,
    stable: 0,
    challenging: 10,
    uncertain: 5
  };
  score -= circumstancePenalties[lifeCircumstances] || 0;

  // Debt stress penalties (0-10 points)
  if (debtToIncomeRatio > 0.5) score -= 10;
  else if (debtToIncomeRatio > 0.3) score -= 7;
  else if (debtToIncomeRatio > 0.2) score -= 5;
  else if (debtToIncomeRatio > 0.1) score -= 2;

  return Math.max(score, 0);
}

function calculateCareerSatisfactionScore(inputs: FinancialHappinessInputs): number {
  const jobSatisfaction = inputs.jobSatisfaction;
  const workLifeBalance = inputs.workLifeBalance;
  const careerGrowth = inputs.careerGrowth;
  const education = inputs.education;
  const age = inputs.age;

  let score = 0;

  // Job satisfaction scoring (0-30 points)
  score += jobSatisfaction * 3;

  // Work-life balance scoring (0-25 points)
  score += workLifeBalance * 2.5;

  // Career growth scoring (0-25 points)
  score += careerGrowth * 2.5;

  // Education-appropriate income scoring (0-20 points)
  const educationIncomeExpectations: Record<string, number> = {
    high_school: 40000,
    some_college: 50000,
    bachelors: 60000,
    masters: 75000,
    doctorate: 90000,
    trade_school: 55000
  };
  
  const expectedIncome = educationIncomeExpectations[inputs.education] || 60000;
  const incomeRatio = inputs.currentIncome / expectedIncome;
  
  if (incomeRatio >= 1.2) score += 20;
  else if (incomeRatio >= 1.0) score += 18;
  else if (incomeRatio >= 0.8) score += 15;
  else if (incomeRatio >= 0.6) score += 10;
  else score += 5;

  return Math.min(score, 100);
}

function calculateSocialWellnessScore(inputs: FinancialHappinessInputs): number {
  const socialConnections = inputs.socialConnections;
  const supportNetwork = inputs.supportNetwork;
  const maritalStatus = inputs.maritalStatus;
  const dependents = inputs.dependents;

  let score = 0;

  // Social connections scoring (0-40 points)
  score += socialConnections * 4;

  // Support network scoring (0-30 points)
  const supportScores: Record<string, number> = {
    very_strong: 30,
    strong: 25,
    moderate: 20,
    weak: 15,
    very_weak: 10
  };
  score += supportScores[supportNetwork] || 0;

  // Marital status scoring (0-20 points)
  const maritalScores: Record<string, number> = {
    married: 20,
    partnered: 18,
    single: 15,
    divorced: 12,
    widowed: 10
  };
  score += maritalScores[maritalStatus] || 0;

  // Dependents scoring (0-10 points)
  if (dependents === 0) score += 5;
  else if (dependents === 1) score += 8;
  else if (dependents === 2) score += 10;
  else if (dependents === 3) score += 8;
  else score += 5;

  return Math.min(score, 100);
}

function calculateHealthWellnessScore(inputs: FinancialHappinessInputs): number {
  const healthStatus = inputs.healthStatus;
  const age = inputs.age;
  const workLifeBalance = inputs.workLifeBalance;

  let score = 0;

  // Health status scoring (0-50 points)
  const healthScores: Record<string, number> = {
    excellent: 50,
    very_good: 40,
    good: 30,
    fair: 20,
    poor: 10
  };
  score += healthScores[healthStatus] || 0;

  // Age-appropriate health scoring (0-30 points)
  if (age < 30) score += 30;
  else if (age < 40) score += 28;
  else if (age < 50) score += 25;
  else if (age < 60) score += 20;
  else if (age < 70) score += 15;
  else score += 10;

  // Work-life balance impact on health (0-20 points)
  score += workLifeBalance * 2;

  return Math.min(score, 100);
}

function calculateValueAlignmentScore(inputs: FinancialHappinessInputs): number {
  const financialValues = inputs.financialValues;
  const currentLifestyle = inputs.currentLifestyle;
  const personalGoals = inputs.personalGoals;

  let score = 0;

  // Value importance scoring (0-40 points)
  const totalValueImportance = Object.values(financialValues).reduce((sum, value) => sum + value, 0);
  score += (totalValueImportance / Object.keys(financialValues).length) * 4;

  // Goal alignment scoring (0-30 points)
  const goalValues = {
    career_advancement: 'growth',
    financial_security: 'security',
    work_life_balance: 'flexibility',
    personal_development: 'growth',
    relationships: 'experiences',
    health_wellness: 'stability',
    community_contribution: 'legacy'
  };

  let alignedGoals = 0;
  inputs.personalGoals.forEach(goal => {
    const relatedValue = goalValues[goal as keyof typeof goalValues];
    if (relatedValue && inputs.financialValues[relatedValue as keyof typeof inputs.financialValues] >= 7) {
      alignedGoals++;
    }
  });

  score += (alignedGoals / inputs.personalGoals.length) * 30;

  // Lifestyle-value alignment scoring (0-30 points)
  const lifestyleValueAlignment = {
    housing: 'security',
    transportation: 'reliability',
    entertainment: 'experiences',
    dining: 'experiences',
    travel: 'experiences',
    shopping: 'flexibility',
    health_care: 'stability'
  };

  let lifestyleScore = 0;
  Object.entries(currentLifestyle).forEach(([aspect, level]) => {
    const relatedValue = lifestyleValueAlignment[aspect as keyof typeof lifestyleValueAlignment];
    if (relatedValue && inputs.financialValues[relatedValue as keyof typeof inputs.financialValues] >= 7) {
      lifestyleScore += 4;
    }
  });

  score += Math.min(lifestyleScore, 30);

  return Math.min(score, 100);
}

function calculateHappinessMetrics(inputs: FinancialHappinessInputs, netWorth: number, debtToIncomeRatio: number): Record<string, number> {
  const savingsRate = (inputs.currentSavings / inputs.currentIncome) * 100;
  const emergencyFundRatio = inputs.currentSavings / (inputs.currentIncome * 0.25);
  const netWorthRatio = (netWorth / inputs.currentIncome) * 100;

  return {
    savingsRate,
    debtToIncomeRatio: debtToIncomeRatio * 100,
    emergencyFundRatio: emergencyFundRatio * 100,
    netWorthRatio,
    jobSatisfaction: inputs.jobSatisfaction * 10,
    workLifeBalance: inputs.workLifeBalance * 10,
    careerGrowth: inputs.careerGrowth * 10,
    financialStress: (11 - inputs.financialStress) * 10, // Invert so higher is better
    lifeSatisfaction: inputs.lifeSatisfaction * 10,
    socialConnections: inputs.socialConnections * 10,
    healthWellness: calculateHealthWellnessScore(inputs),
    valueAlignment: calculateValueAlignmentScore(inputs)
  };
}

function generateHappinessAnalysis(inputs: FinancialHappinessInputs, happinessScore: number, happinessMetrics: Record<string, number>): HappinessAnalysis {
  const strengths: Strength[] = [];
  const areasForImprovement: AreaForImprovement[] = [];
  const riskFactors: RiskFactor[] = [];

  // Analyze strengths
  if (inputs.currentSavings > inputs.currentIncome * 0.5) {
    strengths.push({
      title: 'Strong Savings Foundation',
      description: 'You have excellent savings relative to your income',
      impact: 'High'
    });
  }

  if (inputs.jobSatisfaction >= 8) {
    strengths.push({
      title: 'High Job Satisfaction',
      description: 'You enjoy your work, which contributes significantly to happiness',
      impact: 'High'
    });
  }

  if (inputs.workLifeBalance >= 8) {
    strengths.push({
      title: 'Excellent Work-Life Balance',
      description: 'You maintain a healthy balance between work and personal life',
      impact: 'High'
    });
  }

  if (inputs.currentDebt < inputs.currentIncome * 0.1) {
    strengths.push({
      title: 'Low Debt Burden',
      description: 'Your minimal debt provides financial peace of mind',
      impact: 'Medium'
    });
  }

  // Analyze areas for improvement
  if (inputs.financialStress >= 7) {
    areasForImprovement.push({
      title: 'Reduce Financial Stress',
      description: 'High financial stress is significantly impacting your happiness',
      priority: 'High'
    });
  }

  if (inputs.currentSavings < inputs.currentIncome * 0.1) {
    areasForImprovement.push({
      title: 'Build Emergency Fund',
      description: 'Low savings can create financial anxiety and stress',
      priority: 'High'
    });
  }

  if (inputs.workLifeBalance <= 5) {
    areasForImprovement.push({
      title: 'Improve Work-Life Balance',
      description: 'Poor work-life balance can lead to burnout and unhappiness',
      priority: 'Medium'
    });
  }

  if (inputs.socialConnections <= 5) {
    areasForImprovement.push({
      title: 'Strengthen Social Connections',
      description: 'Social relationships are crucial for happiness and well-being',
      priority: 'Medium'
    });
  }

  // Analyze risk factors
  if (inputs.currentDebt > inputs.currentIncome * 0.4) {
    riskFactors.push({
      title: 'High Debt Load',
      description: 'Excessive debt can create significant financial stress',
      riskLevel: 'High'
    });
  }

  if (inputs.healthStatus === 'poor' || inputs.healthStatus === 'fair') {
    riskFactors.push({
      title: 'Health Concerns',
      description: 'Poor health can significantly impact overall happiness',
      riskLevel: 'Medium'
    });
  }

  if (inputs.supportNetwork === 'weak' || inputs.supportNetwork === 'very_weak') {
    riskFactors.push({
      title: 'Weak Support Network',
      description: 'Lack of support can make financial challenges more difficult',
      riskLevel: 'Medium'
    });
  }

  return {
    strengths,
    areasForImprovement,
    riskFactors
  };
}

function generateHappinessInsights(inputs: FinancialHappinessInputs, happinessScore: number, happinessMetrics: Record<string, number>): HappinessInsight[] {
  const insights: HappinessInsight[] = [];

  // Financial insights
  if (happinessMetrics.savingsRate < 10) {
    insights.push({
      title: 'Savings Impact on Happiness',
      description: 'Low savings rate may be contributing to financial stress and reduced happiness',
      category: 'financial'
    });
  }

  if (happinessMetrics.debtToIncomeRatio > 30) {
    insights.push({
      title: 'Debt and Happiness Connection',
      description: 'High debt-to-income ratio is likely affecting your financial peace of mind',
      category: 'financial'
    });
  }

  // Career insights
  if (inputs.jobSatisfaction < 6) {
    insights.push({
      title: 'Job Satisfaction Matters',
      description: 'Low job satisfaction is a significant factor in overall happiness',
      category: 'career'
    });
  }

  if (inputs.workLifeBalance < 6) {
    insights.push({
      title: 'Work-Life Balance Impact',
      description: 'Poor work-life balance can lead to stress and reduced life satisfaction',
      category: 'career'
    });
  }

  // Social insights
  if (inputs.socialConnections < 6) {
    insights.push({
      title: 'Social Connections',
      description: 'Strong social connections are essential for happiness and well-being',
      category: 'social'
    });
  }

  // Health insights
  if (inputs.healthStatus === 'poor' || inputs.healthStatus === 'fair') {
    insights.push({
      title: 'Health and Happiness',
      description: 'Health status significantly impacts overall life satisfaction',
      category: 'health'
    });
  }

  // Value alignment insights
  if (happinessMetrics.valueAlignment < 60) {
    insights.push({
      title: 'Value Alignment',
      description: 'Your lifestyle may not be fully aligned with your core financial values',
      category: 'values'
    });
  }

  return insights;
}

function generateHappinessRecommendations(inputs: FinancialHappinessInputs, happinessScore: number, analysis: HappinessAnalysis): HappinessRecommendation[] {
  const recommendations: HappinessRecommendation[] = [];

  // High priority recommendations
  if (inputs.financialStress >= 7) {
    recommendations.push({
      title: 'Financial Stress Reduction Plan',
      description: 'Create a comprehensive plan to reduce financial stress and anxiety',
      priority: 'High',
      timeline: '1-3 months',
      implementationSteps: [
        'Create a detailed budget to understand your financial situation',
        'Build an emergency fund of 3-6 months of expenses',
        'Develop a debt repayment strategy',
        'Consider working with a financial advisor or counselor'
      ]
    });
  }

  if (inputs.currentSavings < inputs.currentIncome * 0.1) {
    recommendations.push({
      title: 'Emergency Fund Building',
      description: 'Establish a solid financial foundation to reduce anxiety',
      priority: 'High',
      timeline: '3-6 months',
      implementationSteps: [
        'Set up automatic transfers to savings account',
        'Cut non-essential expenses temporarily',
        'Aim for 10% of income savings rate',
        'Track progress and celebrate milestones'
      ]
    });
  }

  // Medium priority recommendations
  if (inputs.workLifeBalance <= 5) {
    recommendations.push({
      title: 'Work-Life Balance Improvement',
      description: 'Establish boundaries and routines for better balance',
      priority: 'Medium',
      timeline: '1-2 months',
      implementationSteps: [
        'Set clear work hours and stick to them',
        'Schedule regular breaks and time off',
        'Learn to say no to excessive work demands',
        'Prioritize activities that bring joy outside work'
      ]
    });
  }

  if (inputs.socialConnections <= 5) {
    recommendations.push({
      title: 'Social Connection Building',
      description: 'Strengthen relationships and build new connections',
      priority: 'Medium',
      timeline: '2-6 months',
      implementationSteps: [
        'Reach out to existing friends and family regularly',
        'Join clubs, groups, or organizations of interest',
        'Volunteer in your community',
        'Consider professional networking opportunities'
      ]
    });
  }

  // Low priority recommendations
  if (happinessMetrics.valueAlignment < 60) {
    recommendations.push({
      title: 'Value Alignment Review',
      description: 'Align your lifestyle choices with your core values',
      priority: 'Low',
      timeline: '3-6 months',
      implementationSteps: [
        'Review your financial values and priorities',
        'Assess current lifestyle choices against values',
        'Make small adjustments to better align choices',
        'Regularly review and adjust as values evolve'
      ]
    });
  }

  if (inputs.healthStatus === 'fair' || inputs.healthStatus === 'poor') {
    recommendations.push({
      title: 'Health Improvement Plan',
      description: 'Address health concerns to improve overall happiness',
      priority: 'Low',
      timeline: '6-12 months',
      implementationSteps: [
        'Schedule a comprehensive health checkup',
        'Develop a regular exercise routine',
        'Improve sleep habits and stress management',
        'Consider working with health professionals'
      ]
    });
  }

  return recommendations;
}