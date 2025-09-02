import { RetirementPlanningCalculatorInputs, RetirementPlanningCalculatorOutputs } from './types';

export function calculateRetirementPlanning(inputs: RetirementPlanningCalculatorInputs): RetirementPlanningCalculatorOutputs {
  // Calculate basic financial metrics
  const totalIncome = calculateTotalIncome(inputs);
  const totalAssets = calculateTotalAssets(inputs);
  const currentExpenses = inputs.expensesInfo.currentExpenses.totalExpenses;
  const retirementExpenses = inputs.expensesInfo.retirementExpenses.totalExpenses;
  
  // Calculate years to retirement
  const yearsToRetirement = calculateYearsToRetirement(inputs);
  
  // Calculate projected retirement assets
  const projectedRetirementAssets = calculateProjectedRetirementAssets(inputs, totalAssets, yearsToRetirement);
  
  // Calculate projected retirement income
  const projectedRetirementIncome = calculateProjectedRetirementIncome(inputs, totalIncome, yearsToRetirement);
  
  // Calculate retirement income gap
  const retirementIncomeGap = Math.max(0, retirementExpenses - projectedRetirementIncome);
  
  // Calculate required retirement savings
  const requiredRetirementSavings = calculateRequiredRetirementSavings(inputs, retirementIncomeGap);
  
  // Calculate retirement readiness score
  const retirementReadinessScore = calculateRetirementReadinessScore(inputs, projectedRetirementAssets, requiredRetirementSavings);
  
  // Calculate retirement income replacement rate
  const retirementIncomeReplacement = projectedRetirementIncome / retirementExpenses;
  
  // Calculate retirement success probability
  const retirementSuccessProbability = calculateRetirementSuccessProbability(inputs, retirementReadinessScore);
  
  // Calculate savings analysis
  const currentSavingsRate = inputs.strategyInfo.savingsStrategy.currentSavingsRate;
  const targetSavingsRate = inputs.strategyInfo.savingsStrategy.targetSavingsRate;
  const savingsGap = targetSavingsRate - currentSavingsRate;
  
  // Calculate investment analysis
  const expectedInvestmentReturn = inputs.strategyInfo.investmentStrategy.targetReturn;
  const inflationAdjustedReturn = expectedInvestmentReturn - inputs.expensesInfo.inflationRate;
  const portfolioGrowth = calculatePortfolioGrowth(inputs, totalAssets, yearsToRetirement);
  
  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(inputs);
  
  // Calculate Monte Carlo results
  const monteCarloResults = calculateMonteCarloResults(inputs, retirementReadinessScore);
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, retirementReadinessScore, savingsGap, retirementIncomeGap);
  
  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs, totalIncome, currentExpenses);
  
  // Calculate timeline analysis
  const timelineAnalysis = calculateTimelineAnalysis(inputs, totalAssets, totalIncome, currentExpenses);
  
  // Determine recommendation level
  const recommendation = determineRecommendation(retirementReadinessScore, retirementSuccessProbability, savingsGap);
  
  return {
    retirementReadinessScore,
    retirementIncomeGap,
    requiredRetirementSavings,
    retirementIncomeReplacement,
    retirementSuccessProbability,
    recommendation,
    projectedRetirementAssets,
    projectedRetirementIncome,
    projectedRetirementExpenses: retirementExpenses,
    currentSavingsRate,
    targetSavingsRate,
    savingsGap,
    yearsToRetirement,
    expectedInvestmentReturn,
    inflationAdjustedReturn,
    portfolioGrowth,
    riskAssessment,
    monteCarloResults,
    recommendations,
    keyMetrics,
    timelineAnalysis
  };
}

function calculateTotalIncome(inputs: RetirementPlanningCalculatorInputs): number {
  let totalIncome = 0;
  
  // Employment income
  inputs.incomeInfo.employmentIncome.forEach(income => {
    totalIncome += income.amount;
  });
  
  // Self-employment income
  inputs.incomeInfo.selfEmploymentIncome.forEach(income => {
    totalIncome += income.amount;
  });
  
  // Investment income
  inputs.incomeInfo.investmentIncome.forEach(income => {
    totalIncome += income.amount;
  });
  
  // Other income
  inputs.incomeInfo.otherIncome.forEach(income => {
    totalIncome += income.amount;
  });
  
  return totalIncome;
}

function calculateTotalAssets(inputs: RetirementPlanningCalculatorInputs): number {
  let totalAssets = 0;
  
  // Retirement accounts
  inputs.assetsInfo.retirementAccounts.forEach(account => {
    totalAssets += account.balance;
  });
  
  // Investment accounts
  inputs.assetsInfo.investmentAccounts.forEach(account => {
    totalAssets += account.balance;
  });
  
  // Real estate
  inputs.assetsInfo.realEstate.forEach(property => {
    totalAssets += property.currentValue;
  });
  
  // Business interests
  inputs.assetsInfo.businessInterests.forEach(business => {
    totalAssets += business.currentValue;
  });
  
  // Other assets
  inputs.assetsInfo.otherAssets.forEach(asset => {
    totalAssets += asset.currentValue;
  });
  
  return totalAssets;
}

function calculateYearsToRetirement(inputs: RetirementPlanningCalculatorInputs): number {
  const currentAge = inputs.personalInfo.basicInfo.age;
  const retirementAge = inputs.goalsInfo.retirementAge;
  return Math.max(0, retirementAge - currentAge);
}

function calculateProjectedRetirementAssets(inputs: RetirementPlanningCalculatorInputs, currentAssets: number, yearsToRetirement: number): number {
  const expectedReturn = inputs.strategyInfo.investmentStrategy.targetReturn;
  const inflationRate = inputs.expensesInfo.inflationRate;
  const realReturn = expectedReturn - inflationRate;
  
  // Project current assets
  let projectedAssets = currentAssets * Math.pow(1 + realReturn, yearsToRetirement);
  
  // Add projected savings
  const currentSavingsRate = inputs.strategyInfo.savingsStrategy.currentSavingsRate;
  const totalIncome = calculateTotalIncome(inputs);
  const annualSavings = totalIncome * currentSavingsRate;
  
  // Project savings with compound growth
  for (let year = 1; year <= yearsToRetirement; year++) {
    const savingsGrowth = Math.pow(1 + realReturn, year);
    projectedAssets += annualSavings * savingsGrowth;
  }
  
  return projectedAssets;
}

function calculateProjectedRetirementIncome(inputs: RetirementPlanningCalculatorInputs, currentIncome: number, yearsToRetirement: number): number {
  // Calculate Social Security income (simplified)
  const socialSecurityIncome = calculateSocialSecurityIncome(inputs, currentIncome);
  
  // Calculate pension income
  const pensionIncome = calculatePensionIncome(inputs);
  
  // Calculate investment income from retirement assets
  const projectedRetirementAssets = calculateProjectedRetirementAssets(inputs, calculateTotalAssets(inputs), yearsToRetirement);
  const withdrawalRate = inputs.strategyInfo.withdrawalStrategy.withdrawalRate;
  const investmentIncome = projectedRetirementAssets * withdrawalRate;
  
  // Calculate other retirement income
  const otherRetirementIncome = calculateOtherRetirementIncome(inputs);
  
  return socialSecurityIncome + pensionIncome + investmentIncome + otherRetirementIncome;
}

function calculateSocialSecurityIncome(inputs: RetirementPlanningCalculatorInputs, currentIncome: number): number {
  // Simplified Social Security calculation
  // In reality, this would be much more complex based on earnings history
  const averageIndexedMonthlyEarnings = Math.min(currentIncome / 12, 10000); // Cap at $10,000/month
  const primaryInsuranceAmount = averageIndexedMonthlyEarnings * 0.4; // Simplified PIA calculation
  const annualSocialSecurity = primaryInsuranceAmount * 12;
  
  // Apply early/late retirement adjustments
  const fullRetirementAge = 67;
  const retirementAge = inputs.goalsInfo.retirementAge;
  
  if (retirementAge < fullRetirementAge) {
    const reductionFactor = 1 - (0.05 * (fullRetirementAge - retirementAge));
    return annualSocialSecurity * Math.max(0.7, reductionFactor);
  } else if (retirementAge > fullRetirementAge) {
    const increaseFactor = 1 + (0.08 * (retirementAge - fullRetirementAge));
    return annualSocialSecurity * Math.min(1.24, increaseFactor);
  }
  
  return annualSocialSecurity;
}

function calculatePensionIncome(inputs: RetirementPlanningCalculatorInputs): number {
  // Simplified pension calculation
  // In reality, this would depend on specific pension plan details
  let totalPensionIncome = 0;
  
  inputs.incomeInfo.employmentIncome.forEach(income => {
    // Assume 1.5% per year of service for defined benefit plans
    const yearsOfService = Math.min(30, inputs.personalInfo.basicInfo.expectedRetirementAge - inputs.personalInfo.basicInfo.age);
    const pensionBenefit = income.amount * 0.015 * yearsOfService;
    totalPensionIncome += pensionBenefit;
  });
  
  return totalPensionIncome;
}

function calculateOtherRetirementIncome(inputs: RetirementPlanningCalculatorInputs): number {
  // Calculate income from other sources (rental properties, part-time work, etc.)
  let otherIncome = 0;
  
  // Rental income from real estate
  inputs.assetsInfo.realEstate.forEach(property => {
    if (property.rentalIncome) {
      otherIncome += property.rentalIncome;
    }
  });
  
  // Business income
  inputs.assetsInfo.businessInterests.forEach(business => {
    if (business.annualIncome) {
      otherIncome += business.annualIncome;
    }
  });
  
  return otherIncome;
}

function calculateRequiredRetirementSavings(inputs: RetirementPlanningCalculatorInputs, retirementIncomeGap: number): number {
  if (retirementIncomeGap <= 0) return 0;
  
  const retirementDuration = inputs.goalsInfo.retirementDuration;
  const inflationRate = inputs.expensesInfo.inflationRate;
  const expectedReturn = inputs.strategyInfo.investmentStrategy.targetReturn;
  const realReturn = expectedReturn - inflationRate;
  
  // Calculate required savings using the 4% rule as a starting point
  const requiredSavings = retirementIncomeGap / 0.04;
  
  // Adjust for retirement duration and real return
  const adjustmentFactor = (1 - Math.pow(1 + realReturn, -retirementDuration)) / realReturn;
  const adjustedRequiredSavings = requiredSavings * adjustmentFactor;
  
  return adjustedRequiredSavings;
}

function calculateRetirementReadinessScore(inputs: RetirementPlanningCalculatorInputs, projectedAssets: number, requiredSavings: number): number {
  if (requiredSavings <= 0) return 1.0;
  
  const readinessRatio = projectedAssets / requiredSavings;
  
  // Convert to a 0-1 scale
  if (readinessRatio >= 1.0) return 1.0;
  if (readinessRatio <= 0) return 0;
  
  // Use a sigmoid-like function for smooth scaling
  return 1 / (1 + Math.exp(-5 * (readinessRatio - 0.5)));
}

function calculateRetirementSuccessProbability(inputs: RetirementPlanningCalculatorInputs, readinessScore: number): number {
  // Base probability on readiness score
  let baseProbability = readinessScore;
  
  // Adjust for risk factors
  const riskAdjustment = calculateRiskAdjustment(inputs);
  baseProbability *= (1 - riskAdjustment);
  
  // Adjust for time horizon (longer time = more uncertainty)
  const yearsToRetirement = calculateYearsToRetirement(inputs);
  const timeAdjustment = Math.min(0.2, yearsToRetirement * 0.01);
  baseProbability *= (1 - timeAdjustment);
  
  return Math.max(0, Math.min(1, baseProbability));
}

function calculateRiskAdjustment(inputs: RetirementPlanningCalculatorInputs): number {
  const riskTolerance = inputs.riskInfo.riskTolerance;
  const marketRisk = inputs.riskInfo.marketRisk;
  const inflationRisk = inputs.riskInfo.inflationRisk;
  
  let riskAdjustment = 0;
  
  // Risk tolerance adjustment
  switch (riskTolerance) {
    case 'conservative':
      riskAdjustment += 0.1;
      break;
    case 'moderate':
      riskAdjustment += 0.05;
      break;
    case 'aggressive':
      riskAdjustment += 0.02;
      break;
  }
  
  // Market risk adjustment
  riskAdjustment += marketRisk * 0.3;
  
  // Inflation risk adjustment
  riskAdjustment += inflationRisk * 0.2;
  
  return Math.min(0.5, riskAdjustment);
}

function calculatePortfolioGrowth(inputs: RetirementPlanningCalculatorInputs, currentAssets: number, yearsToRetirement: number): number {
  const expectedReturn = inputs.strategyInfo.investmentStrategy.targetReturn;
  const inflationRate = inputs.expensesInfo.inflationRate;
  const realReturn = expectedReturn - inflationRate;
  
  const projectedAssets = calculateProjectedRetirementAssets(inputs, currentAssets, yearsToRetirement);
  const growth = (projectedAssets - currentAssets) / currentAssets;
  
  return Math.max(0, growth);
}

function calculateRiskAssessment(inputs: RetirementPlanningCalculatorInputs) {
  return {
    inflationRisk: inputs.riskInfo.inflationRisk,
    marketRisk: inputs.riskInfo.marketRisk,
    longevityRisk: inputs.riskInfo.longevityRisk,
    healthcareRisk: inputs.riskInfo.healthcareRisk,
    totalRisk: (inputs.riskInfo.inflationRisk + inputs.riskInfo.marketRisk + 
                inputs.riskInfo.longevityRisk + inputs.riskInfo.healthcareRisk) / 4
  };
}

function calculateMonteCarloResults(inputs: RetirementPlanningCalculatorInputs, baseReadinessScore: number) {
  // Simplified Monte Carlo simulation
  const meanReadiness = baseReadinessScore;
  const standardDeviation = 0.15; // 15% volatility
  
  return {
    meanRetirementReadiness: meanReadiness,
    medianRetirementReadiness: meanReadiness,
    standardDeviation,
    percentiles: {
      p5: meanReadiness - 1.645 * standardDeviation,
      p10: meanReadiness - 1.282 * standardDeviation,
      p25: meanReadiness - 0.674 * standardDeviation,
      p50: meanReadiness,
      p75: meanReadiness + 0.674 * standardDeviation,
      p90: meanReadiness + 1.282 * standardDeviation,
      p95: meanReadiness + 1.645 * standardDeviation
    },
    successProbability: Math.max(0, Math.min(1, meanReadiness))
  };
}

function generateRecommendations(inputs: RetirementPlanningCalculatorInputs, readinessScore: number, savingsGap: number, incomeGap: number) {
  const recommendations = [];
  
  // Savings recommendations
  if (savingsGap > 0.05) {
    recommendations.push({
      category: 'Savings',
      recommendation: 'Increase your savings rate to meet retirement goals',
      rationale: 'Current savings rate is below target for retirement readiness',
      expectedImprovement: savingsGap * 0.3,
      implementationSteps: [
        'Review your budget to identify areas to reduce expenses',
        'Set up automatic savings increases',
        'Consider catch-up contributions if eligible'
      ]
    });
  }
  
  // Investment recommendations
  if (readinessScore < 0.7) {
    recommendations.push({
      category: 'Investment',
      recommendation: 'Review and optimize your investment strategy',
      rationale: 'Investment strategy may need adjustment to improve returns',
      expectedImprovement: 0.1,
      implementationSteps: [
        'Assess your current asset allocation',
        'Consider increasing equity exposure if appropriate',
        'Review investment fees and expenses'
      ]
    });
  }
  
  // Income gap recommendations
  if (incomeGap > 0) {
    recommendations.push({
      category: 'Income',
      recommendation: 'Consider additional income sources or delayed retirement',
      rationale: 'Projected retirement income may not meet expenses',
      expectedImprovement: 0.15,
      implementationSteps: [
        'Explore part-time work opportunities',
        'Consider delaying retirement by 1-2 years',
        'Look into passive income sources'
      ]
    });
  }
  
  // Risk management recommendations
  if (inputs.riskInfo.healthcareRisk > 0.05) {
    recommendations.push({
      category: 'Risk Management',
      recommendation: 'Plan for healthcare costs in retirement',
      rationale: 'Healthcare costs are a significant retirement risk',
      expectedImprovement: 0.08,
      implementationSteps: [
        'Research Medicare and supplemental insurance options',
        'Consider a Health Savings Account (HSA)',
        'Budget for out-of-pocket healthcare expenses'
      ]
    });
  }
  
  return recommendations;
}

function calculateKeyMetrics(inputs: RetirementPlanningCalculatorInputs, totalIncome: number, currentExpenses: number) {
  const savingsRate = inputs.strategyInfo.savingsStrategy.currentSavingsRate;
  const investmentReturn = inputs.strategyInfo.investmentStrategy.targetReturn;
  const expenseRatio = currentExpenses / totalIncome;
  
  // Simplified debt-to-income calculation
  const debtToIncome = 0.2; // Placeholder - would need debt information
  
  // Emergency fund calculation (simplified)
  const emergencyFund = currentExpenses * 0.25; // 3 months of expenses
  
  return {
    savingsRate,
    investmentReturn,
    expenseRatio,
    debtToIncome,
    emergencyFund
  };
}

function calculateTimelineAnalysis(inputs: RetirementPlanningCalculatorInputs, currentAssets: number, currentIncome: number, currentExpenses: number) {
  const yearsToRetirement = calculateYearsToRetirement(inputs);
  const milestones = [];
  
  for (let year = 1; year <= Math.min(yearsToRetirement, 10); year++) {
    const age = inputs.personalInfo.basicInfo.age + year;
    const projectedAssets = calculateProjectedRetirementAssets(inputs, currentAssets, year);
    const projectedIncome = currentIncome * Math.pow(1 + 0.03, year); // Assume 3% annual growth
    const projectedExpenses = currentExpenses * Math.pow(1 + inputs.expensesInfo.inflationRate, year);
    const readinessScore = calculateRetirementReadinessScore(inputs, projectedAssets, calculateRequiredRetirementSavings(inputs, projectedExpenses - projectedIncome));
    
    milestones.push({
      year,
      age,
      projectedAssets,
      projectedIncome,
      projectedExpenses,
      readinessScore
    });
  }
  
  return { milestones };
}

function determineRecommendation(readinessScore: number, successProbability: number, savingsGap: number): 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement' {
  // Simple scoring system
  let score = 0;
  
  // Readiness score (40% weight)
  score += readinessScore * 0.4;
  
  // Success probability (30% weight)
  score += successProbability * 0.3;
  
  // Savings gap (30% weight)
  const savingsScore = Math.max(0, 1 - savingsGap);
  score += savingsScore * 0.3;
  
  // Determine recommendation based on score
  if (score >= 0.8) return 'excellent';
  if (score >= 0.6) return 'good';
  if (score >= 0.4) return 'fair';
  if (score >= 0.2) return 'needs_improvement';
  return 'poor';
}