import { FinancialGratitudeInputs, FinancialGratitudeOutputs, FinancialGratitudeMetrics, GratitudeAnalysis, FinancialAnalysis, KeyInsight, Recommendation } from './types';

export function calculateFinancialGratitude(inputs: FinancialGratitudeInputs): FinancialGratitudeOutputs {
  // Calculate core metrics
  const metrics = calculateFinancialGratitudeMetrics(inputs);

  // Calculate gratitude analysis
  const gratitudeAnalysis = calculateGratitudeAnalysis(inputs, metrics);

  // Calculate financial analysis
  const financialAnalysis = calculateFinancialAnalysis(inputs, metrics);

  // Generate key insights
  const keyInsights = generateKeyInsights(inputs, metrics);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, metrics);

  return {
    metrics,
    gratitudeAnalysis,
    financialAnalysis,
    keyInsights,
    recommendations
  };
}

function calculateFinancialGratitudeMetrics(inputs: FinancialGratitudeInputs): FinancialGratitudeMetrics {
  // Calculate gratitude score (weighted average of gratitude-related metrics)
  const gratitudeScore = (
    inputs.gratitudeLevel * 0.3 +
    inputs.lifeSatisfaction * 0.25 +
    inputs.optimismLevel * 0.25 +
    (11 - inputs.stressLevel) * 0.2
  );

  // Calculate financial wellness (composite of financial metrics)
  const savingsRate = inputs.income > 0 ? (inputs.savings / inputs.income) * 100 : 0;
  const debtToIncome = inputs.income > 0 ? (inputs.debt / inputs.income) * 100 : 0;
  
  const financialWellness = (
    inputs.financialSatisfaction * 0.3 +
    (Math.max(0, 10 - debtToIncome / 10)) * 0.3 +
    (Math.min(10, savingsRate / 5)) * 0.2 +
    (inputs.netWorth > 0 ? Math.min(10, Math.log10(inputs.netWorth / 1000 + 1) * 2) : 0) * 0.2
  );

  // Calculate life satisfaction (overall life quality)
  const lifeSatisfaction = (
    inputs.lifeSatisfaction * 0.4 +
    inputs.financialSatisfaction * 0.3 +
    inputs.optimismLevel * 0.2 +
    (11 - inputs.stressLevel) * 0.1
  );

  // Calculate stress level (inverted for positive scoring)
  const stressLevel = 11 - inputs.stressLevel;

  // Calculate optimism index
  const optimismIndex = (
    inputs.optimismLevel * 0.4 +
    inputs.gratitudeLevel * 0.3 +
    (11 - inputs.stressLevel) * 0.3
  );

  // Calculate financial health metrics
  const financialSecurity = calculateFinancialSecurity(inputs);
  const financialFreedom = calculateFinancialFreedom(inputs);

  // Calculate behavioral metrics
  const selfControl = (
    inputs.impulseControl * 0.4 +
    inputs.delayedGratification * 0.4 +
    inputs.financialLiteracy * 0.2
  );

  const goalAchievement = calculateGoalAchievement(inputs);
  const valueAlignment = calculateValueAlignment(inputs);
  const socialComparison = 11 - inputs.socialComparison; // Inverted for positive scoring
  const gratitudePractice = calculateGratitudePractice(inputs);

  return {
    // Core gratitude metrics
    gratitudeScore,
    financialWellness,
    lifeSatisfaction,
    stressLevel,
    optimismIndex,

    // Financial health metrics
    savingsRate,
    debtToIncome,
    netWorth: inputs.netWorth,
    financialSecurity,
    financialFreedom,

    // Behavioral metrics
    selfControl,
    goalAchievement,
    valueAlignment,
    socialComparison,
    gratitudePractice
  };
}

function calculateFinancialSecurity(inputs: FinancialGratitudeInputs): number {
  // Calculate financial security based on emergency fund, debt levels, and income stability
  const emergencyFundRatio = inputs.savings / inputs.expenses;
  const debtRatio = inputs.debt / inputs.income;
  const incomeStability = inputs.jobSecurity / 10;

  let security = 5; // Base score

  // Emergency fund impact
  if (emergencyFundRatio >= 6) security += 3;
  else if (emergencyFundRatio >= 3) security += 2;
  else if (emergencyFundRatio >= 1) security += 1;

  // Debt impact
  if (debtRatio <= 0.1) security += 2;
  else if (debtRatio <= 0.3) security += 1;
  else if (debtRatio >= 0.5) security -= 1;

  // Income stability impact
  security += (incomeStability - 0.5) * 2;

  return Math.max(1, Math.min(10, security));
}

function calculateFinancialFreedom(inputs: FinancialGratitudeInputs): number {
  // Calculate financial freedom based on passive income potential and lifestyle flexibility
  const passiveIncomePotential = inputs.savings * 0.04 / inputs.expenses; // 4% rule
  const lifestyleFlexibility = 1 - (inputs.expenses / inputs.income);

  let freedom = 5; // Base score

  // Passive income impact
  if (passiveIncomePotential >= 0.5) freedom += 3;
  else if (passiveIncomePotential >= 0.25) freedom += 2;
  else if (passiveIncomePotential >= 0.1) freedom += 1;

  // Lifestyle flexibility impact
  freedom += lifestyleFlexibility * 2;

  return Math.max(1, Math.min(10, freedom));
}

function calculateGoalAchievement(inputs: FinancialGratitudeInputs): number {
  // Calculate goal achievement based on goal priorities and current progress
  if (inputs.goalPriorities.length === 0) return 5;

  const averagePriority = inputs.goalPriorities.reduce((sum, priority) => sum + priority, 0) / inputs.goalPriorities.length;
  const goalComplexity = inputs.goalPriorities.length;
  
  // Higher priority goals and more goals indicate better goal achievement
  let achievement = 5; // Base score
  achievement += (averagePriority - 5) * 0.2;
  achievement += Math.min(2, goalComplexity * 0.5);

  return Math.max(1, Math.min(10, achievement));
}

function calculateValueAlignment(inputs: FinancialGratitudeInputs): number {
  // Calculate value alignment based on spending alignment and value priorities
  if (inputs.valuePriorities.length === 0) return inputs.spendingAlignment;

  const averageValuePriority = inputs.valuePriorities.reduce((sum, priority) => sum + priority, 0) / inputs.valuePriorities.length;
  
  // Weighted average of spending alignment and value priorities
  const alignment = (inputs.spendingAlignment * 0.6) + (averageValuePriority * 0.4);
  
  return Math.max(1, Math.min(10, alignment));
}

function calculateGratitudePractice(inputs: FinancialGratitudeInputs): number {
  // Calculate gratitude practice score based on various gratitude activities
  let practice = 5; // Base score

  // Gratitude journaling
  if (inputs.gratitudeJournaling) practice += 1;

  // Gratitude frequency
  switch (inputs.gratitudeFrequency) {
    case 'daily': practice += 2; break;
    case 'weekly': practice += 1; break;
    case 'monthly': practice += 0.5; break;
  }

  // Reflection time
  if (inputs.reflectionTime >= 30) practice += 1;
  else if (inputs.reflectionTime >= 15) practice += 0.5;

  // Mindfulness practice
  if (inputs.mindfulnessPractice) practice += 1;

  // Appreciation expressions
  practice += (inputs.appreciationExpressions - 5) * 0.2;

  return Math.max(1, Math.min(10, practice));
}

function calculateGratitudeAnalysis(inputs: FinancialGratitudeInputs, metrics: FinancialGratitudeMetrics): GratitudeAnalysis {
  let overallAssessment: 'high' | 'medium' | 'low' = 'medium';
  let confidenceLevel = 5;
  const keyStrengths: string[] = [];
  const areasForImprovement: string[] = [];
  const opportunities: string[] = [];

  // Assess overall gratitude level
  if (metrics.gratitudeScore >= 8) {
    overallAssessment = 'high';
    confidenceLevel += 2;
    keyStrengths.push('High overall gratitude level');
    opportunities.push('Leverage gratitude for financial success');
  } else if (metrics.gratitudeScore >= 6) {
    overallAssessment = 'medium';
    confidenceLevel += 1;
    keyStrengths.push('Moderate gratitude foundation');
    opportunities.push('Build on existing gratitude practices');
  } else {
    overallAssessment = 'low';
    confidenceLevel -= 1;
    areasForImprovement.push('Low gratitude level');
    opportunities.push('Develop gratitude practices');
  }

  // Analyze specific strengths
  if (metrics.optimismIndex >= 8) {
    keyStrengths.push('High optimism level');
    confidenceLevel += 1;
  }
  if (metrics.lifeSatisfaction >= 8) {
    keyStrengths.push('High life satisfaction');
    confidenceLevel += 1;
  }
  if (metrics.gratitudePractice >= 8) {
    keyStrengths.push('Strong gratitude practices');
    confidenceLevel += 1;
  }

  // Analyze areas for improvement
  if (metrics.stressLevel <= 3) {
    areasForImprovement.push('High stress levels');
    confidenceLevel -= 1;
    opportunities.push('Stress management techniques');
  }
  if (metrics.socialComparison <= 3) {
    areasForImprovement.push('High social comparison');
    confidenceLevel -= 1;
    opportunities.push('Focus on personal progress');
  }
  if (metrics.valueAlignment <= 4) {
    areasForImprovement.push('Low value alignment');
    confidenceLevel -= 1;
    opportunities.push('Align spending with values');
  }

  // Analyze financial wellness
  if (metrics.financialWellness >= 8) {
    keyStrengths.push('Strong financial wellness');
    confidenceLevel += 1;
  } else if (metrics.financialWellness <= 4) {
    areasForImprovement.push('Low financial wellness');
    confidenceLevel -= 1;
    opportunities.push('Improve financial health');
  }

  // Analyze behavioral factors
  if (metrics.selfControl >= 8) {
    keyStrengths.push('Strong self-control');
    confidenceLevel += 1;
  } else if (metrics.selfControl <= 4) {
    areasForImprovement.push('Low self-control');
    confidenceLevel -= 1;
    opportunities.push('Develop self-control strategies');
  }

  // Clamp confidence level
  confidenceLevel = Math.max(1, Math.min(10, confidenceLevel));

  return {
    overallAssessment,
    confidenceLevel,
    keyStrengths,
    areasForImprovement,
    opportunities
  };
}

function calculateFinancialAnalysis(inputs: FinancialGratitudeInputs, metrics: FinancialGratitudeMetrics): FinancialAnalysis {
  let financialPosition: 'strong' | 'stable' | 'weak' = 'stable';
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  const financialFactors: string[] = [];
  const financialOutlook: string[] = [];

  // Assess financial position
  if (metrics.financialWellness >= 8 && metrics.debtToIncome <= 20) {
    financialPosition = 'strong';
    financialFactors.push('Strong financial foundation');
    financialOutlook.push('Excellent financial prospects');
  } else if (metrics.financialWellness >= 6 && metrics.debtToIncome <= 40) {
    financialPosition = 'stable';
    financialFactors.push('Stable financial position');
    financialOutlook.push('Good financial outlook');
  } else {
    financialPosition = 'weak';
    financialFactors.push('Financial challenges present');
    financialOutlook.push('Need for financial improvement');
  }

  // Assess risk level
  if (metrics.debtToIncome <= 20 && metrics.savingsRate >= 20) {
    riskLevel = 'low';
    financialFactors.push('Low financial risk');
  } else if (metrics.debtToIncome <= 40 && metrics.savingsRate >= 10) {
    riskLevel = 'medium';
    financialFactors.push('Moderate financial risk');
  } else {
    riskLevel = 'high';
    financialFactors.push('High financial risk');
  }

  // Analyze specific financial factors
  if (metrics.savingsRate >= 20) {
    financialFactors.push('High savings rate');
    financialOutlook.push('Strong savings foundation');
  } else if (metrics.savingsRate <= 5) {
    financialFactors.push('Low savings rate');
    financialOutlook.push('Need to increase savings');
  }

  if (metrics.netWorth > 0) {
    financialFactors.push('Positive net worth');
    financialOutlook.push('Building wealth');
  } else {
    financialFactors.push('Negative net worth');
    financialOutlook.push('Need to build assets');
  }

  // Analyze environmental factors
  if (inputs.economicOutlook === 'positive') {
    financialFactors.push('Positive economic outlook');
    financialOutlook.push('Favorable economic conditions');
  } else if (inputs.economicOutlook === 'negative') {
    financialFactors.push('Negative economic outlook');
    financialOutlook.push('Economic challenges ahead');
  }

  if (inputs.jobSecurity >= 8) {
    financialFactors.push('High job security');
    financialOutlook.push('Stable income source');
  } else if (inputs.jobSecurity <= 4) {
    financialFactors.push('Low job security');
    financialOutlook.push('Income uncertainty');
  }

  return {
    financialPosition,
    riskLevel,
    financialFactors,
    financialOutlook
  };
}

function generateKeyInsights(inputs: FinancialGratitudeInputs, metrics: FinancialGratitudeMetrics): KeyInsight[] {
  const insights: KeyInsight[] = [];

  // Gratitude insights
  if (metrics.gratitudeScore >= 8) {
    insights.push({
      title: 'High Gratitude Foundation',
      description: 'Your strong gratitude practices provide a solid foundation for financial success and life satisfaction.',
      impact: 'positive'
    });
  } else if (metrics.gratitudeScore <= 4) {
    insights.push({
      title: 'Gratitude Development Opportunity',
      description: 'Developing gratitude practices could significantly improve your financial mindset and decision-making.',
      impact: 'positive'
    });
  }

  // Financial wellness insights
  if (metrics.financialWellness >= 8) {
    insights.push({
      title: 'Strong Financial Health',
      description: 'Your excellent financial wellness indicates good money management and financial security.',
      impact: 'positive'
    });
  } else if (metrics.financialWellness <= 4) {
    insights.push({
      title: 'Financial Health Improvement Needed',
      description: 'Focusing on financial wellness could reduce stress and improve overall life satisfaction.',
      impact: 'positive'
    });
  }

  // Behavioral insights
  if (metrics.selfControl >= 8) {
    insights.push({
      title: 'Strong Self-Control',
      description: 'Your excellent self-control is a key asset for achieving financial goals and maintaining good habits.',
      impact: 'positive'
    });
  } else if (metrics.selfControl <= 4) {
    insights.push({
      title: 'Self-Control Development',
      description: 'Improving self-control could significantly enhance your financial decision-making and goal achievement.',
      impact: 'positive'
    });
  }

  // Value alignment insights
  if (metrics.valueAlignment <= 4) {
    insights.push({
      title: 'Value Alignment Opportunity',
      description: 'Aligning your spending with your core values could increase financial satisfaction and reduce wasteful spending.',
      impact: 'positive'
    });
  }

  // Social comparison insights
  if (metrics.socialComparison <= 3) {
    insights.push({
      title: 'Social Comparison Impact',
      description: 'High social comparison can lead to unnecessary spending and reduced financial satisfaction.',
      impact: 'neutral'
    });
  }

  return insights;
}

function generateRecommendations(inputs: FinancialGratitudeInputs, metrics: FinancialGratitudeMetrics): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Gratitude practice recommendations
  if (metrics.gratitudePractice <= 5) {
    recommendations.push({
      title: 'Start Gratitude Journaling',
      description: 'Begin a daily gratitude practice to improve financial mindset',
      priority: 'high',
      effort: 'low',
      impact: 'high',
      timeframe: 'Immediate'
    });
  }

  if (!inputs.gratitudeJournaling) {
    recommendations.push({
      title: 'Establish Gratitude Routine',
      description: 'Create a consistent gratitude practice for better financial decisions',
      priority: 'medium',
      effort: 'low',
      impact: 'medium',
      timeframe: '1-2 weeks'
    });
  }

  // Financial health recommendations
  if (metrics.savingsRate <= 10) {
    recommendations.push({
      title: 'Increase Savings Rate',
      description: 'Aim to save at least 20% of income for financial security',
      priority: 'high',
      effort: 'medium',
      impact: 'high',
      timeframe: '3-6 months'
    });
  }

  if (metrics.debtToIncome >= 40) {
    recommendations.push({
      title: 'Reduce Debt Burden',
      description: 'Focus on paying down high-interest debt to improve financial health',
      priority: 'high',
      effort: 'high',
      impact: 'high',
      timeframe: '6-12 months'
    });
  }

  // Behavioral recommendations
  if (metrics.selfControl <= 5) {
    recommendations.push({
      title: 'Develop Self-Control Strategies',
      description: 'Implement strategies to improve impulse control and delayed gratification',
      priority: 'medium',
      effort: 'medium',
      impact: 'high',
      timeframe: '1-3 months'
    });
  }

  if (metrics.valueAlignment <= 5) {
    recommendations.push({
      title: 'Align Spending with Values',
      description: 'Review spending patterns and align with core values for greater satisfaction',
      priority: 'medium',
      effort: 'low',
      impact: 'medium',
      timeframe: '1 month'
    });
  }

  // Social support recommendations
  if (inputs.familySupport <= 5) {
    recommendations.push({
      title: 'Strengthen Family Financial Communication',
      description: 'Improve family discussions about money and financial goals',
      priority: 'medium',
      effort: 'medium',
      impact: 'medium',
      timeframe: '1-2 months'
    });
  }

  if (!inputs.mentorship) {
    recommendations.push({
      title: 'Seek Financial Mentorship',
      description: 'Find a mentor to guide your financial journey and decisions',
      priority: 'low',
      effort: 'low',
      impact: 'high',
      timeframe: '1-3 months'
    });
  }

  // Stress management recommendations
  if (metrics.stressLevel <= 3) {
    recommendations.push({
      title: 'Implement Stress Management',
      description: 'Develop stress management techniques for better financial decision-making',
      priority: 'high',
      effort: 'medium',
      impact: 'high',
      timeframe: 'Immediate'
    });
  }

  return recommendations;
}