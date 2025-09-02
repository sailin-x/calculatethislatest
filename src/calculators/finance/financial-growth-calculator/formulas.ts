import { FinancialGrowthInputs, FinancialGrowthOutputs, GrowthMetric, GrowthProjection, GrowthAnalysis, GrowthInsight, GrowthRecommendation, Strength, AreaForImprovement, RiskFactor } from './types';

export function calculateFinancialGrowth(inputs: FinancialGrowthInputs): FinancialGrowthOutputs {
  // Calculate basic financial metrics
  const netWorth = inputs.currentSavings + inputs.currentInvestments - inputs.currentDebt;
  const yearsToRetirement = inputs.retirementAge - inputs.age;
  const yearsToLifeExpectancy = inputs.lifeExpectancy - inputs.age;

  // Calculate growth score components
  const savingsScore = calculateSavingsScore(inputs);
  const investmentScore = calculateInvestmentScore(inputs);
  const debtScore = calculateDebtScore(inputs);
  const incomeScore = calculateIncomeScore(inputs);
  const habitsScore = calculateHabitsScore(inputs);
  const goalsScore = calculateGoalsScore(inputs);
  const marketScore = calculateMarketScore(inputs);

  // Calculate overall growth score (weighted average)
  const growthScore = Math.round(
    (savingsScore * 0.25) +
    (investmentScore * 0.25) +
    (debtScore * 0.15) +
    (incomeScore * 0.15) +
    (habitsScore * 0.1) +
    (goalsScore * 0.05) +
    (marketScore * 0.05)
  );

  // Calculate retirement savings projection
  const retirementSavings = calculateRetirementSavings(inputs);

  // Calculate financial independence age
  const financialIndependenceAge = calculateFinancialIndependenceAge(inputs);

  // Calculate growth metrics
  const growthMetrics = calculateGrowthMetrics(inputs, netWorth);

  // Calculate growth projections
  const growthProjections = calculateGrowthProjections(inputs, netWorth);

  // Generate growth analysis
  const growthAnalysis = generateGrowthAnalysis(inputs, growthScore, growthMetrics);

  // Generate growth insights
  const growthInsights = generateGrowthInsights(inputs, growthScore, growthMetrics);

  // Generate growth recommendations
  const growthRecommendations = generateGrowthRecommendations(inputs, growthScore, growthAnalysis);

  return {
    growthScore,
    netWorth,
    retirementSavings,
    financialIndependenceAge,
    growthMetrics,
    growthProjections,
    growthAnalysis,
    growthInsights,
    growthRecommendations
  };
}

function calculateSavingsScore(inputs: FinancialGrowthInputs): number {
  const savingsRate = inputs.savingsRate;
  const emergencyFundRatio = inputs.currentSavings / (inputs.currentIncome * 0.25); // 6 months of expenses

  let score = 0;

  // Savings rate scoring (0-40 points)
  if (savingsRate >= 20) score += 40;
  else if (savingsRate >= 15) score += 30;
  else if (savingsRate >= 10) score += 20;
  else if (savingsRate >= 5) score += 10;

  // Emergency fund scoring (0-30 points)
  if (emergencyFundRatio >= 1) score += 30;
  else if (emergencyFundRatio >= 0.75) score += 25;
  else if (emergencyFundRatio >= 0.5) score += 20;
  else if (emergencyFundRatio >= 0.25) score += 10;

  // Current savings scoring (0-30 points)
  const savingsToIncomeRatio = inputs.currentSavings / inputs.currentIncome;
  if (savingsToIncomeRatio >= 1) score += 30;
  else if (savingsToIncomeRatio >= 0.5) score += 20;
  else if (savingsToIncomeRatio >= 0.25) score += 10;

  return Math.min(score, 100);
}

function calculateInvestmentScore(inputs: FinancialGrowthInputs): number {
  const investmentToIncomeRatio = inputs.currentInvestments / inputs.currentIncome;
  const expectedReturn = inputs.investmentReturn;
  const riskTolerance = inputs.riskTolerance;

  let score = 0;

  // Investment amount scoring (0-40 points)
  if (investmentToIncomeRatio >= 1) score += 40;
  else if (investmentToIncomeRatio >= 0.5) score += 30;
  else if (investmentToIncomeRatio >= 0.25) score += 20;
  else if (investmentToIncomeRatio >= 0.1) score += 10;

  // Expected return scoring (0-30 points)
  if (expectedReturn >= 8) score += 30;
  else if (expectedReturn >= 6) score += 25;
  else if (expectedReturn >= 4) score += 20;
  else if (expectedReturn >= 2) score += 10;

  // Risk tolerance alignment scoring (0-30 points)
  if (riskTolerance === 'aggressive' && expectedReturn >= 8) score += 30;
  else if (riskTolerance === 'moderate' && expectedReturn >= 6) score += 30;
  else if (riskTolerance === 'conservative' && expectedReturn >= 4) score += 30;
  else score += 15;

  return Math.min(score, 100);
}

function calculateDebtScore(inputs: FinancialGrowthInputs): number {
  const debtToIncomeRatio = inputs.currentDebt / inputs.currentIncome;
  const debtInterestRate = inputs.debtInterestRate;

  let score = 100; // Start with perfect score

  // Debt amount penalties
  if (debtToIncomeRatio > 0.5) score -= 40;
  else if (debtToIncomeRatio > 0.3) score -= 30;
  else if (debtToIncomeRatio > 0.2) score -= 20;
  else if (debtToIncomeRatio > 0.1) score -= 10;

  // High interest rate penalties
  if (debtInterestRate > 10) score -= 30;
  else if (debtInterestRate > 7) score -= 20;
  else if (debtInterestRate > 5) score -= 10;

  return Math.max(score, 0);
}

function calculateIncomeScore(inputs: FinancialGrowthInputs): number {
  const incomeGrowthRate = inputs.incomeGrowthRate;
  const age = inputs.age;

  let score = 0;

  // Income growth rate scoring (0-50 points)
  if (incomeGrowthRate >= 5) score += 50;
  else if (incomeGrowthRate >= 3) score += 40;
  else if (incomeGrowthRate >= 1) score += 30;
  else if (incomeGrowthRate >= 0) score += 20;

  // Age-appropriate income scoring (0-50 points)
  if (age < 30 && inputs.currentIncome >= 50000) score += 50;
  else if (age < 40 && inputs.currentIncome >= 70000) score += 50;
  else if (age < 50 && inputs.currentIncome >= 90000) score += 50;
  else if (age < 60 && inputs.currentIncome >= 100000) score += 50;
  else if (age >= 60 && inputs.currentIncome >= 80000) score += 50;
  else score += 25;

  return Math.min(score, 100);
}

function calculateHabitsScore(inputs: FinancialGrowthInputs): number {
  const habits = inputs.currentFinancialHabits;
  let score = 0;

  // Score each habit (excellent=15, good=12, fair=8, poor=4)
  const habitScores: Record<string, number> = {
    excellent: 15,
    good: 12,
    fair: 8,
    poor: 4
  };

  Object.values(habits).forEach(habit => {
    score += habitScores[habit] || 0;
  });

  // Normalize to 100-point scale
  return Math.round((score / (Object.keys(habits).length * 15)) * 100);
}

function calculateGoalsScore(inputs: FinancialGrowthInputs): number {
  const goals = inputs.financialGoals;
  const priorities = inputs.goalPriorities;

  let score = 0;

  // Number of goals (0-30 points)
  if (goals.length >= 5) score += 30;
  else if (goals.length >= 3) score += 20;
  else if (goals.length >= 1) score += 10;

  // Goal priority alignment (0-40 points)
  const highPriorityGoals = goals.filter(goal => priorities[goal] <= 3);
  if (highPriorityGoals.length >= 2) score += 40;
  else if (highPriorityGoals.length >= 1) score += 25;

  // Goal diversity (0-30 points)
  const goalCategories = new Set(goals.map(goal => goal.split('_')[0]));
  if (goalCategories.size >= 4) score += 30;
  else if (goalCategories.size >= 2) score += 20;
  else if (goalCategories.size >= 1) score += 10;

  return Math.min(score, 100);
}

function calculateMarketScore(inputs: FinancialGrowthInputs): number {
  const marketConditions = inputs.marketConditions;
  const economicOutlook = inputs.economicOutlook;
  const personalCircumstances = inputs.personalCircumstances;

  let score = 50; // Start with neutral score

  // Market conditions adjustment
  switch (marketConditions) {
    case 'bullish': score += 20; break;
    case 'stable': score += 10; break;
    case 'bearish': score -= 10; break;
    case 'volatile': score -= 5; break;
  }

  // Economic outlook adjustment
  switch (economicOutlook) {
    case 'very_positive': score += 20; break;
    case 'positive': score += 10; break;
    case 'neutral': score += 0; break;
    case 'negative': score -= 10; break;
    case 'very_negative': score -= 20; break;
  }

  // Personal circumstances adjustment
  switch (personalCircumstances) {
    case 'improving': score += 10; break;
    case 'stable': score += 0; break;
    case 'challenging': score -= 10; break;
    case 'uncertain': score -= 5; break;
  }

  return Math.max(Math.min(score, 100), 0);
}

function calculateRetirementSavings(inputs: FinancialGrowthInputs): number {
  const yearsToRetirement = inputs.retirementAge - inputs.age;
  const monthlySavings = (inputs.currentIncome * (inputs.savingsRate / 100)) / 12;
  const monthlyInvestment = inputs.currentInvestments * (inputs.investmentReturn / 100) / 12;

  // Compound growth calculation
  let totalSavings = inputs.currentSavings + inputs.currentInvestments;
  
  for (let year = 1; year <= yearsToRetirement; year++) {
    const annualSavings = monthlySavings * 12;
    const annualInvestmentReturn = totalSavings * (inputs.investmentReturn / 100);
    
    totalSavings += annualSavings + annualInvestmentReturn;
    
    // Apply income growth to savings
    const incomeGrowth = Math.pow(1 + (inputs.incomeGrowthRate / 100), year);
    const newMonthlySavings = (inputs.currentIncome * incomeGrowth * (inputs.savingsRate / 100)) / 12;
    totalSavings += newMonthlySavings * 12;
  }

  return Math.round(totalSavings);
}

function calculateFinancialIndependenceAge(inputs: FinancialGrowthInputs): number {
  const targetNetWorth = inputs.currentIncome * 25; // 4% rule
  let currentNetWorth = inputs.currentSavings + inputs.currentInvestments - inputs.currentDebt;
  let age = inputs.age;
  let years = 0;

  while (currentNetWorth < targetNetWorth && age < inputs.lifeExpectancy) {
    const annualSavings = inputs.currentIncome * (inputs.savingsRate / 100);
    const annualInvestmentReturn = currentNetWorth * (inputs.investmentReturn / 100);
    
    currentNetWorth += annualSavings + annualInvestmentReturn;
    
    // Apply income growth
    const incomeGrowth = Math.pow(1 + (inputs.incomeGrowthRate / 100), years + 1);
    currentNetWorth += inputs.currentIncome * incomeGrowth * (inputs.savingsRate / 100);
    
    age++;
    years++;
  }

  return age;
}

function calculateGrowthMetrics(inputs: FinancialGrowthInputs, netWorth: number): Record<string, number> {
  const savingsRate = inputs.savingsRate;
  const investmentRatio = inputs.currentInvestments / inputs.currentIncome;
  const debtRatio = inputs.currentDebt / inputs.currentIncome;
  const emergencyFundRatio = inputs.currentSavings / (inputs.currentIncome * 0.25);
  const netWorthRatio = netWorth / inputs.currentIncome;

  return {
    savingsRate,
    investmentRatio: investmentRatio * 100,
    debtRatio: debtRatio * 100,
    emergencyFundRatio: emergencyFundRatio * 100,
    netWorthRatio: netWorthRatio * 100,
    investmentReturn: inputs.investmentReturn,
    incomeGrowthRate: inputs.incomeGrowthRate,
    debtToIncomeRatio: debtRatio * 100
  };
}

function calculateGrowthProjections(inputs: FinancialGrowthInputs, currentNetWorth: number): {
  netWorthProjections: GrowthProjection[];
  incomeProjections: GrowthProjection[];
  investmentProjections: GrowthProjection[];
} {
  const projections: GrowthProjection[] = [];
  const incomeProjections: GrowthProjection[] = [];
  const investmentProjections: GrowthProjection[] = [];

  let projectedNetWorth = currentNetWorth;
  let projectedIncome = inputs.currentIncome;
  let projectedInvestments = inputs.currentInvestments;

  // Generate 5, 10, 15, 20, 25, 30 year projections
  [5, 10, 15, 20, 25, 30].forEach(year => {
    // Net worth projection
    const netWorthGrowth = Math.pow(1 + (inputs.investmentReturn / 100), year);
    const savingsContribution = inputs.currentIncome * (inputs.savingsRate / 100) * year;
    const incomeGrowthFactor = Math.pow(1 + (inputs.incomeGrowthRate / 100), year);
    const additionalSavings = inputs.currentIncome * (inputs.savingsRate / 100) * (incomeGrowthFactor - 1) / (inputs.incomeGrowthRate / 100);
    
    projectedNetWorth = (currentNetWorth * netWorthGrowth) + savingsContribution + additionalSavings;
    
    projections.push({
      year,
      netWorth: Math.round(projectedNetWorth),
      growthRate: ((projectedNetWorth - currentNetWorth) / currentNetWorth) * 100
    });

    // Income projection
    projectedIncome = inputs.currentIncome * incomeGrowthFactor;
    incomeProjections.push({
      year,
      income: Math.round(projectedIncome),
      cumulativeGrowth: (incomeGrowthFactor - 1) * 100
    });

    // Investment projection
    projectedInvestments = inputs.currentInvestments * netWorthGrowth;
    investmentProjections.push({
      year,
      investmentValue: Math.round(projectedInvestments),
      annualReturn: inputs.investmentReturn
    });
  });

  return {
    netWorthProjections: projections,
    incomeProjections,
    investmentProjections
  };
}

function generateGrowthAnalysis(inputs: FinancialGrowthInputs, growthScore: number, growthMetrics: Record<string, number>): GrowthAnalysis {
  const strengths: Strength[] = [];
  const areasForImprovement: AreaForImprovement[] = [];
  const riskFactors: RiskFactor[] = [];

  // Analyze strengths
  if (inputs.savingsRate >= 20) {
    strengths.push({
      title: 'Strong Savings Rate',
      description: 'Your savings rate of 20%+ is excellent for building wealth',
      impact: 'High'
    });
  }

  if (inputs.currentInvestments > inputs.currentIncome * 0.5) {
    strengths.push({
      title: 'Solid Investment Base',
      description: 'You have a strong foundation of investments relative to income',
      impact: 'High'
    });
  }

  if (inputs.currentDebt < inputs.currentIncome * 0.1) {
    strengths.push({
      title: 'Low Debt Burden',
      description: 'Your debt-to-income ratio is very healthy',
      impact: 'Medium'
    });
  }

  // Analyze areas for improvement
  if (inputs.savingsRate < 15) {
    areasForImprovement.push({
      title: 'Increase Savings Rate',
      description: 'Aim to save at least 15-20% of your income for better growth',
      priority: 'High'
    });
  }

  if (inputs.currentInvestments < inputs.currentIncome * 0.25) {
    areasForImprovement.push({
      title: 'Build Investment Portfolio',
      description: 'Consider increasing your investment allocation',
      priority: 'Medium'
    });
  }

  if (inputs.debtInterestRate > 7) {
    areasForImprovement.push({
      title: 'Reduce High-Interest Debt',
      description: 'Focus on paying off high-interest debt first',
      priority: 'High'
    });
  }

  // Analyze risk factors
  if (inputs.currentDebt > inputs.currentIncome * 0.4) {
    riskFactors.push({
      title: 'High Debt Load',
      description: 'Your debt-to-income ratio may limit growth potential',
      riskLevel: 'Medium'
    });
  }

  if (inputs.investmentReturn < 5 && inputs.riskTolerance === 'aggressive') {
    riskFactors.push({
      title: 'Risk-Return Mismatch',
      description: 'Your investment returns don\'t align with your risk tolerance',
      riskLevel: 'Low'
    });
  }

  if (inputs.incomeGrowthRate < 2) {
    riskFactors.push({
      title: 'Low Income Growth',
      description: 'Slow income growth may limit long-term wealth building',
      riskLevel: 'Medium'
    });
  }

  return {
    strengths,
    areasForImprovement,
    riskFactors
  };
}

function generateGrowthInsights(inputs: FinancialGrowthInputs, growthScore: number, growthMetrics: Record<string, number>): GrowthInsight[] {
  const insights: GrowthInsight[] = [];

  // Net worth insights
  if (growthMetrics.netWorthRatio < 50) {
    insights.push({
      title: 'Build Net Worth Foundation',
      description: 'Your net worth is below the recommended 50% of income ratio',
      category: 'net_worth'
    });
  }

  // Savings insights
  if (inputs.savingsRate < 15) {
    insights.push({
      title: 'Optimize Savings Strategy',
      description: 'Increasing your savings rate to 15-20% could significantly accelerate wealth building',
      category: 'savings'
    });
  }

  // Investment insights
  if (inputs.currentInvestments < inputs.currentIncome * 0.3) {
    insights.push({
      title: 'Investment Opportunity',
      description: 'You have room to increase your investment allocation for better growth',
      category: 'investing'
    });
  }

  // Debt insights
  if (inputs.currentDebt > inputs.currentIncome * 0.3) {
    insights.push({
      title: 'Debt Management Priority',
      description: 'Reducing debt should be a priority to improve your growth potential',
      category: 'debt'
    });
  }

  // Age-based insights
  if (inputs.age < 35 && inputs.savingsRate < 10) {
    insights.push({
      title: 'Early Career Advantage',
      description: 'Starting to save early gives you a significant advantage due to compound growth',
      category: 'timing'
    });
  }

  return insights;
}

function generateGrowthRecommendations(inputs: FinancialGrowthInputs, growthScore: number, analysis: GrowthAnalysis): GrowthRecommendation[] {
  const recommendations: GrowthRecommendation[] = [];

  // High priority recommendations
  if (inputs.savingsRate < 15) {
    recommendations.push({
      title: 'Implement 15% Savings Rule',
      description: 'Gradually increase your savings rate to 15% of income',
      priority: 'High',
      timeline: '3-6 months',
      implementationSteps: [
        'Review your budget for non-essential expenses',
        'Set up automatic transfers to savings account',
        'Track your progress monthly',
        'Celebrate milestones to stay motivated'
      ]
    });
  }

  if (inputs.currentDebt > inputs.currentIncome * 0.3) {
    recommendations.push({
      title: 'Debt Reduction Plan',
      description: 'Create a systematic plan to reduce high-interest debt',
      priority: 'High',
      timeline: '6-12 months',
      implementationSteps: [
        'List all debts with interest rates',
        'Prioritize high-interest debt first',
        'Consider debt consolidation if beneficial',
        'Allocate extra income to debt payments'
      ]
    });
  }

  // Medium priority recommendations
  if (inputs.currentInvestments < inputs.currentIncome * 0.3) {
    recommendations.push({
      title: 'Investment Portfolio Building',
      description: 'Develop a diversified investment strategy aligned with your goals',
      priority: 'Medium',
      timeline: '3-12 months',
      implementationSteps: [
        'Assess your risk tolerance and time horizon',
        'Research low-cost index funds or ETFs',
        'Start with retirement accounts (401k, IRA)',
        'Consider working with a financial advisor'
      ]
    });
  }

  if (inputs.investmentReturn < 6 && inputs.riskTolerance === 'moderate') {
    recommendations.push({
      title: 'Optimize Investment Returns',
      description: 'Review your investment strategy for better return potential',
      priority: 'Medium',
      timeline: '1-3 months',
      implementationSteps: [
        'Review current investment allocations',
        'Consider rebalancing your portfolio',
        'Research higher-performing investment options',
        'Ensure proper diversification'
      ]
    });
  }

  // Low priority recommendations
  if (inputs.currentFinancialHabits.estate_planning === 'poor') {
    recommendations.push({
      title: 'Estate Planning Foundation',
      description: 'Begin basic estate planning to protect your wealth',
      priority: 'Low',
      timeline: '6-12 months',
      implementationSteps: [
        'Create or update your will',
        'Designate beneficiaries for accounts',
        'Consider basic life insurance',
        'Consult with an estate planning attorney'
      ]
    });
  }

  return recommendations;
}