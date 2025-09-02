import { FinancialHarmonyInputs, FinancialHarmonyOutputs, HarmonyMetric, HarmonyAnalysis, HarmonyInsight, HarmonyRecommendation, Strength, AreaForImprovement, RiskFactor } from './types';

export function calculateFinancialHarmony(inputs: FinancialHarmonyInputs): FinancialHarmonyOutputs {
  // Calculate basic financial metrics
  const netWorth = inputs.currentSavings + inputs.currentInvestments - inputs.currentDebt;
  const debtToIncomeRatio = inputs.currentDebt / inputs.currentIncome;

  // Calculate harmony score components
  const financialBalanceScore = calculateFinancialBalanceScore(inputs);
  const lifeBalanceScore = calculateLifeBalanceScore(inputs);
  const alignmentScore = calculateAlignmentScore(inputs);
  const wellnessScore = calculateWellnessScore(inputs);
  const relationshipScore = calculateRelationshipScore(inputs);
  const careerHarmonyScore = calculateCareerHarmonyScore(inputs);

  // Calculate overall harmony score (weighted average)
  const harmonyScore = Math.round(
    (financialBalanceScore * 0.25) +
    (lifeBalanceScore * 0.20) +
    (alignmentScore * 0.20) +
    (wellnessScore * 0.15) +
    (relationshipScore * 0.10) +
    (careerHarmonyScore * 0.10)
  );

  // Calculate harmony metrics
  const harmonyMetrics = calculateHarmonyMetrics(inputs, netWorth, debtToIncomeRatio);

  // Generate harmony analysis
  const harmonyAnalysis = generateHarmonyAnalysis(inputs, harmonyScore, harmonyMetrics);

  // Generate harmony insights
  const harmonyInsights = generateHarmonyInsights(inputs, harmonyScore, harmonyMetrics);

  // Generate harmony recommendations
  const harmonyRecommendations = generateHarmonyRecommendations(inputs, harmonyScore, harmonyAnalysis);

  return {
    harmonyScore,
    financialBalanceScore,
    lifeBalanceScore,
    alignmentScore,
    harmonyMetrics,
    harmonyAnalysis,
    harmonyInsights,
    harmonyRecommendations
  };
}

function calculateFinancialBalanceScore(inputs: FinancialHarmonyInputs): number {
  const savingsToIncomeRatio = inputs.currentSavings / inputs.currentIncome;
  const debtToIncomeRatio = inputs.currentDebt / inputs.currentIncome;
  const netWorth = inputs.currentSavings + inputs.currentInvestments - inputs.currentDebt;
  const financialFlow = inputs.financialFlow;

  let score = 0;

  // Savings ratio scoring (0-25 points)
  if (savingsToIncomeRatio >= 1) score += 25;
  else if (savingsToIncomeRatio >= 0.5) score += 20;
  else if (savingsToIncomeRatio >= 0.25) score += 15;
  else if (savingsToIncomeRatio >= 0.1) score += 10;
  else if (savingsToIncomeRatio >= 0) score += 5;

  // Debt ratio scoring (0-25 points)
  if (debtToIncomeRatio === 0) score += 25;
  else if (debtToIncomeRatio <= 0.1) score += 20;
  else if (debtToIncomeRatio <= 0.2) score += 15;
  else if (debtToIncomeRatio <= 0.3) score += 10;
  else if (debtToIncomeRatio <= 0.4) score += 5;

  // Net worth scoring (0-25 points)
  if (netWorth > 0) {
    if (netWorth >= inputs.currentIncome) score += 25;
    else if (netWorth >= inputs.currentIncome * 0.5) score += 20;
    else if (netWorth >= inputs.currentIncome * 0.25) score += 15;
    else if (netWorth >= inputs.currentIncome * 0.1) score += 10;
  }

  // Financial flow scoring (0-25 points)
  score += financialFlow * 2.5;

  return Math.min(score, 100);
}

function calculateLifeBalanceScore(inputs: FinancialHarmonyInputs): number {
  const workLifeBalance = inputs.workLifeBalance;
  const lifeSatisfaction = inputs.lifeSatisfaction;
  const socialConnections = inputs.socialConnections;
  const healthStatus = inputs.healthStatus;
  const supportNetwork = inputs.supportNetwork;
  const personalGrowth = inputs.personalGrowth;

  let score = 0;

  // Work-life balance scoring (0-25 points)
  score += workLifeBalance * 2.5;

  // Life satisfaction scoring (0-20 points)
  score += lifeSatisfaction * 2;

  // Social connections scoring (0-15 points)
  score += socialConnections * 1.5;

  // Health status scoring (0-15 points)
  const healthScores: Record<string, number> = {
    excellent: 15,
    very_good: 12,
    good: 9,
    fair: 6,
    poor: 3
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

  // Personal growth scoring (0-10 points)
  const growthScores: Record<string, number> = {
    very_active: 10,
    active: 8,
    moderate: 6,
    inactive: 4,
    very_inactive: 2
  };
  score += growthScores[personalGrowth] || 0;

  return Math.min(score, 100);
}

function calculateAlignmentScore(inputs: FinancialHarmonyInputs): number {
  const financialValues = inputs.financialValues;
  const currentLifestyle = inputs.currentLifestyle;
  const personalGoals = inputs.personalGoals;
  const spiritualWellness = inputs.spiritualWellness;
  const emotionalBalance = inputs.emotionalBalance;
  const mentalClarity = inputs.mentalClarity;

  let score = 0;

  // Value importance scoring (0-25 points)
  const totalValueImportance = Object.values(financialValues).reduce((sum, value) => sum + value, 0);
  score += (totalValueImportance / Object.keys(financialValues).length) * 2.5;

  // Goal alignment scoring (0-20 points)
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

  score += (alignedGoals / inputs.personalGoals.length) * 20;

  // Lifestyle-value alignment scoring (0-20 points)
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
      lifestyleScore += 2.86; // 20 points / 7 aspects
    }
  });

  score += Math.min(lifestyleScore, 20);

  // Wellness alignment scoring (0-15 points)
  const wellnessAverage = (spiritualWellness + emotionalBalance + mentalClarity) / 3;
  score += wellnessAverage * 1.5;

  return Math.min(score, 100);
}

function calculateWellnessScore(inputs: FinancialHarmonyInputs): number {
  const spiritualWellness = inputs.spiritualWellness;
  const emotionalBalance = inputs.emotionalBalance;
  const mentalClarity = inputs.mentalClarity;
  const physicalEnergy = inputs.physicalEnergy;
  const healthStatus = inputs.healthStatus;

  let score = 0;

  // Spiritual wellness scoring (0-25 points)
  score += spiritualWellness * 2.5;

  // Emotional balance scoring (0-25 points)
  score += emotionalBalance * 2.5;

  // Mental clarity scoring (0-20 points)
  score += mentalClarity * 2;

  // Physical energy scoring (0-20 points)
  score += physicalEnergy * 2;

  // Health status scoring (0-10 points)
  const healthScores: Record<string, number> = {
    excellent: 10,
    very_good: 8,
    good: 6,
    fair: 4,
    poor: 2
  };
  score += healthScores[healthStatus] || 0;

  return Math.min(score, 100);
}

function calculateRelationshipScore(inputs: FinancialHarmonyInputs): number {
  const relationshipHarmony = inputs.relationshipHarmony;
  const socialConnections = inputs.socialConnections;
  const supportNetwork = inputs.supportNetwork;
  const maritalStatus = inputs.maritalStatus;
  const dependents = inputs.dependents;

  let score = 0;

  // Relationship harmony scoring (0-30 points)
  score += relationshipHarmony * 3;

  // Social connections scoring (0-25 points)
  score += socialConnections * 2.5;

  // Support network scoring (0-25 points)
  const supportScores: Record<string, number> = {
    very_strong: 25,
    strong: 20,
    moderate: 15,
    weak: 10,
    very_weak: 5
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
  score += maritalScores[inputs.maritalStatus] || 0;

  return Math.min(score, 100);
}

function calculateCareerHarmonyScore(inputs: FinancialHarmonyInputs): number {
  const jobSatisfaction = inputs.jobSatisfaction;
  const workLifeBalance = inputs.workLifeBalance;
  const careerGrowth = inputs.careerGrowth;
  const careerAlignment = inputs.careerAlignment;
  const education = inputs.education;
  const age = inputs.age;

  let score = 0;

  // Job satisfaction scoring (0-25 points)
  score += jobSatisfaction * 2.5;

  // Work-life balance scoring (0-25 points)
  score += workLifeBalance * 2.5;

  // Career growth scoring (0-20 points)
  score += careerGrowth * 2;

  // Career alignment scoring (0-20 points)
  score += careerAlignment * 2;

  // Education-appropriate income scoring (0-10 points)
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
  
  if (incomeRatio >= 1.2) score += 10;
  else if (incomeRatio >= 1.0) score += 9;
  else if (incomeRatio >= 0.8) score += 7;
  else if (incomeRatio >= 0.6) score += 5;
  else score += 3;

  return Math.min(score, 100);
}

function calculateHarmonyMetrics(inputs: FinancialHarmonyInputs, netWorth: number, debtToIncomeRatio: number): Record<string, number> {
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
    spiritualWellness: inputs.spiritualWellness * 10,
    emotionalBalance: inputs.emotionalBalance * 10,
    mentalClarity: inputs.mentalClarity * 10,
    physicalEnergy: inputs.physicalEnergy * 10,
    relationshipHarmony: inputs.relationshipHarmony * 10,
    careerAlignment: inputs.careerAlignment * 10,
    financialFlow: inputs.financialFlow * 10,
    wellnessScore: calculateWellnessScore(inputs),
    relationshipScore: calculateRelationshipScore(inputs),
    careerHarmonyScore: calculateCareerHarmonyScore(inputs)
  };
}

function generateHarmonyAnalysis(inputs: FinancialHarmonyInputs, harmonyScore: number, harmonyMetrics: Record<string, number>): HarmonyAnalysis {
  const strengths: Strength[] = [];
  const areasForImprovement: AreaForImprovement[] = [];
  const riskFactors: RiskFactor[] = [];

  // Analyze strengths
  if (inputs.currentSavings > inputs.currentIncome * 0.5) {
    strengths.push({
      title: 'Strong Financial Foundation',
      description: 'You have excellent savings relative to your income',
      impact: 'High'
    });
  }

  if (inputs.jobSatisfaction >= 8) {
    strengths.push({
      title: 'High Job Satisfaction',
      description: 'You enjoy your work, which contributes significantly to harmony',
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

  if (inputs.spiritualWellness >= 8) {
    strengths.push({
      title: 'Strong Spiritual Wellness',
      description: 'Your spiritual well-being provides inner harmony',
      impact: 'Medium'
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
      description: 'High financial stress is significantly impacting your harmony',
      priority: 'High'
    });
  }

  if (inputs.currentSavings < inputs.currentIncome * 0.1) {
    areasForImprovement.push({
      title: 'Build Emergency Fund',
      description: 'Low savings can create financial anxiety and disrupt harmony',
      priority: 'High'
    });
  }

  if (inputs.workLifeBalance <= 5) {
    areasForImprovement.push({
      title: 'Improve Work-Life Balance',
      description: 'Poor work-life balance can lead to burnout and disharmony',
      priority: 'Medium'
    });
  }

  if (inputs.spiritualWellness <= 5) {
    areasForImprovement.push({
      title: 'Enhance Spiritual Wellness',
      description: 'Spiritual wellness is important for inner harmony and peace',
      priority: 'Medium'
    });
  }

  if (inputs.emotionalBalance <= 5) {
    areasForImprovement.push({
      title: 'Improve Emotional Balance',
      description: 'Emotional balance is crucial for overall harmony',
      priority: 'Medium'
    });
  }

  // Analyze risk factors
  if (inputs.currentDebt > inputs.currentIncome * 0.4) {
    riskFactors.push({
      title: 'High Debt Load',
      description: 'Excessive debt can create significant financial stress and disharmony',
      riskLevel: 'High'
    });
  }

  if (inputs.healthStatus === 'poor' || inputs.healthStatus === 'fair') {
    riskFactors.push({
      title: 'Health Concerns',
      description: 'Poor health can significantly impact overall harmony',
      riskLevel: 'Medium'
    });
  }

  if (inputs.supportNetwork === 'weak' || inputs.supportNetwork === 'very_weak') {
    riskFactors.push({
      title: 'Weak Support Network',
      description: 'Lack of support can make challenges more difficult and disrupt harmony',
      riskLevel: 'Medium'
    });
  }

  if (inputs.mentalClarity <= 5) {
    riskFactors.push({
      title: 'Mental Clarity Issues',
      description: 'Low mental clarity can affect decision-making and harmony',
      riskLevel: 'Low'
    });
  }

  return {
    strengths,
    areasForImprovement,
    riskFactors
  };
}

function generateHarmonyInsights(inputs: FinancialHarmonyInputs, harmonyScore: number, harmonyMetrics: Record<string, number>): HarmonyInsight[] {
  const insights: HarmonyInsight[] = [];

  // Financial insights
  if (harmonyMetrics.savingsRate < 10) {
    insights.push({
      title: 'Savings Impact on Harmony',
      description: 'Low savings rate may be contributing to financial stress and reduced harmony',
      category: 'financial'
    });
  }

  if (harmonyMetrics.debtToIncomeRatio > 30) {
    insights.push({
      title: 'Debt and Harmony Connection',
      description: 'High debt-to-income ratio is likely affecting your financial peace of mind',
      category: 'financial'
    });
  }

  // Career insights
  if (inputs.jobSatisfaction < 6) {
    insights.push({
      title: 'Job Satisfaction Matters',
      description: 'Low job satisfaction is a significant factor in overall harmony',
      category: 'career'
    });
  }

  if (inputs.workLifeBalance < 6) {
    insights.push({
      title: 'Work-Life Balance Impact',
      description: 'Poor work-life balance can lead to stress and reduced harmony',
      category: 'career'
    });
  }

  // Wellness insights
  if (inputs.spiritualWellness < 6) {
    insights.push({
      title: 'Spiritual Wellness',
      description: 'Spiritual wellness contributes to inner peace and harmony',
      category: 'wellness'
    });
  }

  if (inputs.emotionalBalance < 6) {
    insights.push({
      title: 'Emotional Balance',
      description: 'Emotional balance is essential for maintaining harmony in all areas',
      category: 'wellness'
    });
  }

  // Social insights
  if (inputs.socialConnections < 6) {
    insights.push({
      title: 'Social Connections',
      description: 'Strong social connections are essential for harmony and well-being',
      category: 'social'
    });
  }

  // Value alignment insights
  if (harmonyMetrics.relationshipScore < 60) {
    insights.push({
      title: 'Relationship Harmony',
      description: 'Relationship harmony significantly impacts overall life balance',
      category: 'relationships'
    });
  }

  return insights;
}

function generateHarmonyRecommendations(inputs: FinancialHarmonyInputs, harmonyScore: number, analysis: HarmonyAnalysis): HarmonyRecommendation[] {
  const recommendations: HarmonyRecommendation[] = [];

  // High priority recommendations
  if (inputs.financialStress >= 7) {
    recommendations.push({
      title: 'Financial Stress Reduction Plan',
      description: 'Create a comprehensive plan to reduce financial stress and restore harmony',
      priority: 'High',
      timeline: '1-3 months',
      implementationSteps: [
        'Create a detailed budget to understand your financial situation',
        'Build an emergency fund of 3-6 months of expenses',
        'Develop a debt repayment strategy',
        'Consider working with a financial advisor or counselor',
        'Practice stress-reduction techniques like meditation or exercise'
      ]
    });
  }

  if (inputs.currentSavings < inputs.currentIncome * 0.1) {
    recommendations.push({
      title: 'Emergency Fund Building',
      description: 'Establish a solid financial foundation to reduce anxiety and improve harmony',
      priority: 'High',
      timeline: '3-6 months',
      implementationSteps: [
        'Set up automatic transfers to savings account',
        'Cut non-essential expenses temporarily',
        'Aim for 10% of income savings rate',
        'Track progress and celebrate milestones',
        'Consider side income opportunities'
      ]
    });
  }

  // Medium priority recommendations
  if (inputs.workLifeBalance <= 5) {
    recommendations.push({
      title: 'Work-Life Balance Improvement',
      description: 'Establish boundaries and routines for better balance and harmony',
      priority: 'Medium',
      timeline: '1-2 months',
      implementationSteps: [
        'Set clear work hours and stick to them',
        'Schedule regular breaks and time off',
        'Learn to say no to excessive work demands',
        'Prioritize activities that bring joy outside work',
        'Practice mindfulness and presence in daily activities'
      ]
    });
  }

  if (inputs.spiritualWellness <= 5) {
    recommendations.push({
      title: 'Spiritual Wellness Enhancement',
      description: 'Develop practices that nurture your spiritual well-being',
      priority: 'Medium',
      timeline: '2-6 months',
      implementationSteps: [
        'Explore meditation or prayer practices',
        'Connect with nature regularly',
        'Read spiritual or philosophical literature',
        'Join spiritual communities or groups',
        'Practice gratitude and reflection'
      ]
    });
  }

  if (inputs.emotionalBalance <= 5) {
    recommendations.push({
      title: 'Emotional Balance Development',
      description: 'Build emotional resilience and balance for greater harmony',
      priority: 'Medium',
      timeline: '3-6 months',
      implementationSteps: [
        'Practice emotional awareness and mindfulness',
        'Develop healthy coping mechanisms',
        'Consider therapy or counseling if needed',
        'Practice self-compassion and self-care',
        'Build emotional support networks'
      ]
    });
  }

  // Low priority recommendations
  if (harmonyMetrics.relationshipScore < 60) {
    recommendations.push({
      title: 'Relationship Harmony Building',
      description: 'Strengthen relationships to improve overall harmony',
      priority: 'Low',
      timeline: '3-6 months',
      implementationSteps: [
        'Improve communication skills',
        'Spend quality time with loved ones',
        'Practice active listening and empathy',
        'Resolve conflicts constructively',
        'Build trust and mutual understanding'
      ]
    });
  }

  if (inputs.mentalClarity <= 5) {
    recommendations.push({
      title: 'Mental Clarity Improvement',
      description: 'Enhance mental clarity for better decision-making and harmony',
      priority: 'Low',
      timeline: '2-4 months',
      implementationSteps: [
        'Practice mindfulness and meditation',
        'Reduce information overload and distractions',
        'Get adequate sleep and rest',
        'Exercise regularly for mental clarity',
        'Consider brain-training activities'
      ]
    });
  }

  return recommendations;
}