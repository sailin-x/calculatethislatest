import {
  EmergencyFundCalculatorInputs,
  EmergencyFundCalculatorOutputs,
  EmergencyFundMetrics,
  EmergencyFundAnalysis
} from './types';

// Helper function to calculate risk score
function calculateRiskScore(inputs: EmergencyFundCalculatorInputs): number {
  let riskScore = 0;

  // Job stability risk
  const jobStabilityScores = {
    'very_stable': 10,
    'stable': 20,
    'moderate': 40,
    'unstable': 70,
    'very_unstable': 90
  };
  riskScore += jobStabilityScores[inputs.jobStability] || 50;

  // Health risk
  const healthScores = {
    'excellent': 10,
    'good': 20,
    'fair': 40,
    'poor': 70,
    'critical': 90
  };
  riskScore += healthScores[inputs.healthStatus] || 50;

  // Location risk
  const locationScores = {
    'low': 10,
    'moderate': 30,
    'high': 60,
    'very_high': 90
  };
  riskScore += locationScores[inputs.locationRisk] || 50;

  // Industry risk
  const industryScores = {
    'low': 10,
    'moderate': 30,
    'high': 60,
    'very_high': 90
  };
  riskScore += industryScores[inputs.industryRisk] || 50;

  // Employment type risk
  const employmentScores = {
    'salaried': 20,
    'self_employed': 60,
    'contractor': 70,
    'unemployed': 100,
    'retired': 30
  };
  riskScore += employmentScores[inputs.employmentType] || 50;

  // Dependents risk
  riskScore += inputs.dependents * 10;

  // Debt load risk
  const debtRatio = inputs.monthlyDebtPayments / inputs.monthlyIncome;
  riskScore += Math.min(debtRatio * 50, 50);

  return Math.min(riskScore / 7, 100); // Average and cap at 100
}

// Helper function to calculate recommended emergency fund
function calculateRecommendedEmergencyFund(inputs: EmergencyFundCalculatorInputs): number {
  const {
    monthlyExpenses,
    monthlyIncome,
    dependents,
    timeToFindNewJob,
    desiredCoveragePeriod,
    riskTolerance,
    costOfLivingIndex
  } = inputs;

  // Base calculation: 3-6 months of expenses
  let baseMonths = 3;

  // Adjust for risk factors
  const riskScore = calculateRiskScore(inputs);
  if (riskScore > 70) baseMonths = 9;
  else if (riskScore > 50) baseMonths = 6;
  else if (riskScore > 30) baseMonths = 4;

  // Adjust for dependents
  baseMonths += dependents * 0.5;

  // Adjust for employment type
  if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'contractor') {
    baseMonths += 2;
  }

  // Adjust for desired coverage period
  if (desiredCoveragePeriod > baseMonths) {
    baseMonths = desiredCoveragePeriod;
  }

  // Adjust for time to find new job
  if (timeToFindNewJob > baseMonths) {
    baseMonths = timeToFindNewJob;
  }

  // Adjust for risk tolerance
  if (riskTolerance === 'conservative') baseMonths += 2;
  else if (riskTolerance === 'aggressive') baseMonths -= 1;

  // Adjust for cost of living
  const costAdjustment = costOfLivingIndex / 100;

  // Calculate recommended amount
  const recommendedAmount = monthlyExpenses * baseMonths * costAdjustment;

  // Cap at reasonable maximum (24 months of expenses)
  return Math.min(recommendedAmount, monthlyExpenses * 24);
}

// Helper function to calculate coverage score
function calculateCoverageScore(currentAmount: number, recommendedAmount: number): number {
  if (recommendedAmount === 0) return 100;

  const ratio = currentAmount / recommendedAmount;
  if (ratio >= 1) return 100;
  if (ratio >= 0.8) return 80;
  if (ratio >= 0.6) return 60;
  if (ratio >= 0.4) return 40;
  if (ratio >= 0.2) return 20;
  return 0;
}

// Helper function to calculate monthly savings needed
function calculateMonthlySavingsNeeded(
  currentAmount: number,
  recommendedAmount: number,
  timeToGoal: number
): number {
  if (timeToGoal <= 0 || recommendedAmount <= currentAmount) return 0;

  const shortfall = recommendedAmount - currentAmount;
  return shortfall / timeToGoal;
}

// Helper function to calculate unemployment benefits
function calculateUnemploymentBenefits(inputs: EmergencyFundCalculatorInputs): number {
  const { monthlyIncome, stateOfResidence, localUnemploymentRate } = inputs;

  // Simplified calculation - in reality this would vary by state
  const baseBenefit = Math.min(monthlyIncome * 0.25, 1000); // 25% of income, max $1000
  const adjustedBenefit = baseBenefit * (1 - localUnemploymentRate / 100);

  return Math.max(adjustedBenefit, 0);
}

// Helper function to calculate essential vs discretionary expenses
function analyzeExpenses(monthlyExpenses: number, monthlyIncome: number): { essential: number; discretionary: number } {
  // Estimate essential expenses (housing, food, transportation, insurance, minimum debt)
  const essentialRatio = 0.7; // 70% of expenses are essential
  const essential = monthlyExpenses * essentialRatio;
  const discretionary = monthlyExpenses * (1 - essentialRatio);

  return { essential, discretionary };
}

// Helper function to calculate scenario impacts
function calculateScenarioImpacts(inputs: EmergencyFundCalculatorInputs): Array<{ scenario: string; probability: number; impact: number; coverage: number }> {
  const scenarios = [];
  const recommendedAmount = calculateRecommendedEmergencyFund(inputs);

  if (inputs.includeJobLoss) {
    const jobLossImpact = inputs.monthlyExpenses * inputs.timeToFindNewJob;
    const coverage = Math.min(inputs.currentEmergencyFund / jobLossImpact, 1) * 100;
    scenarios.push({
      scenario: 'Job Loss',
      probability: 0.15, // 15% probability
      impact: jobLossImpact,
      coverage: coverage
    });
  }

  if (inputs.includeMedicalEmergency) {
    const medicalImpact = 10000; // Average medical emergency cost
    const coverage = Math.min(inputs.currentEmergencyFund / medicalImpact, 1) * 100;
    scenarios.push({
      scenario: 'Medical Emergency',
      probability: 0.10,
      impact: medicalImpact,
      coverage: coverage
    });
  }

  if (inputs.includeHomeRepair) {
    const homeRepairImpact = 5000; // Average home repair cost
    const coverage = Math.min(inputs.currentEmergencyFund / homeRepairImpact, 1) * 100;
    scenarios.push({
      scenario: 'Home Repair',
      probability: 0.20,
      impact: homeRepairImpact,
      coverage: coverage
    });
  }

  if (inputs.includeCarRepair) {
    const carRepairImpact = 2000; // Average car repair cost
    const coverage = Math.min(inputs.currentEmergencyFund / carRepairImpact, 1) * 100;
    scenarios.push({
      scenario: 'Car Repair',
      probability: 0.25,
      impact: carRepairImpact,
      coverage: coverage
    });
  }

  if (inputs.includeFamilyEmergency) {
    const familyEmergencyImpact = 3000; // Average family emergency cost
    const coverage = Math.min(inputs.currentEmergencyFund / familyEmergencyImpact, 1) * 100;
    scenarios.push({
      scenario: 'Family Emergency',
      probability: 0.12,
      impact: familyEmergencyImpact,
      coverage: coverage
    });
  }

  return scenarios;
}

// Main calculation function
export function calculateEmergencyFundCalculator(inputs: EmergencyFundCalculatorInputs): EmergencyFundCalculatorOutputs {
  const {
    monthlyIncome,
    monthlyExpenses,
    currentEmergencyFund,
    monthlyDebtPayments,
    dependents,
    timeToFindNewJob,
    desiredCoveragePeriod,
    expectedReturnRate,
    analysisPeriod
  } = inputs;

  // Calculate recommended emergency fund
  const recommendedEmergencyFund = calculateRecommendedEmergencyFund(inputs);

  // Calculate current ratio
  const currentEmergencyFundRatio = recommendedEmergencyFund > 0
    ? currentEmergencyFund / recommendedEmergencyFund
    : 1;

  // Calculate shortfall
  const shortfallAmount = Math.max(0, recommendedEmergencyFund - currentEmergencyFund);

  // Calculate coverage months
  const coverageMonths = monthlyExpenses > 0 ? currentEmergencyFund / monthlyExpenses : 0;

  // Calculate coverage score
  const coverageScore = calculateCoverageScore(currentEmergencyFund, recommendedEmergencyFund);

  // Calculate risk-adjusted coverage
  const riskScore = calculateRiskScore(inputs);
  const riskAdjustedCoverage = coverageScore * (1 - riskScore / 200); // Reduce score based on risk

  // Analyze expenses
  const { essential, discretionary } = analyzeExpenses(monthlyExpenses, monthlyIncome);

  // Calculate debt service ratio
  const debtServiceRatio = monthlyIncome > 0 ? monthlyDebtPayments / monthlyIncome : 0;

  // Calculate income stability score
  const incomeStabilityScore = 100 - riskScore;

  // Calculate replacement income ratio
  const unemploymentBenefit = calculateUnemploymentBenefits(inputs);
  const replacementIncomeRatio = monthlyIncome > 0 ? unemploymentBenefit / monthlyIncome : 0;

  // Calculate emergency fund growth
  const emergencyFundGrowth = currentEmergencyFund * Math.pow(1 + expectedReturnRate, analysisPeriod / 12);

  // Calculate opportunity cost (simplified)
  const opportunityCost = emergencyFundGrowth - currentEmergencyFund;

  // Calculate liquidity score
  const liquidityScore = inputs.emergencyFundInvestmentType === 'savings_account' ? 100 :
                        inputs.emergencyFundInvestmentType === 'high_yield_savings' ? 90 :
                        inputs.emergencyFundInvestmentType === 'money_market' ? 80 : 70;

  // Calculate scenario analysis
  const scenarios = calculateScenarioImpacts(inputs);
  const bestCaseCoverage = Math.max(...scenarios.map(s => s.coverage));
  const worstCaseCoverage = Math.min(...scenarios.map(s => s.coverage));
  const averageCaseCoverage = scenarios.reduce((sum, s) => sum + s.coverage, 0) / scenarios.length;

  // Calculate benchmarks (simplified)
  const industryAverage = monthlyExpenses * 6; // 6 months average
  const locationAverage = industryAverage * (inputs.costOfLivingIndex / 100);
  const incomeLevelAverage = monthlyIncome < 5000 ? monthlyExpenses * 3 :
                            monthlyIncome < 10000 ? monthlyExpenses * 4 :
                            monthlyIncome < 15000 ? monthlyExpenses * 5 : monthlyExpenses * 6;

  // Calculate monthly savings needed
  const monthlySavingsNeeded = calculateMonthlySavingsNeeded(
    currentEmergencyFund,
    recommendedEmergencyFund,
    analysisPeriod
  );

  // Calculate time to goal
  const timeToGoal = monthlySavingsNeeded > 0 ? shortfallAmount / monthlySavingsNeeded : 0;

  // Create metrics object
  const metrics: EmergencyFundMetrics = {
    recommendedEmergencyFund,
    currentEmergencyFundRatio,
    shortfallAmount,
    monthlySavingsNeeded,
    coverageMonths,
    coverageScore,
    riskAdjustedCoverage,
    essentialExpenses: essential,
    discretionaryExpenses: discretionary,
    debtServiceRatio,
    incomeStabilityScore,
    replacementIncomeRatio,
    unemploymentBenefitAmount: unemploymentBenefit,
    overallRiskScore: riskScore,
    jobLossRisk: inputs.jobStability === 'very_unstable' ? 90 :
                 inputs.jobStability === 'unstable' ? 70 :
                 inputs.jobStability === 'moderate' ? 50 :
                 inputs.jobStability === 'stable' ? 30 : 10,
    healthRisk: inputs.healthStatus === 'critical' ? 90 :
                inputs.healthStatus === 'poor' ? 70 :
                inputs.healthStatus === 'fair' ? 50 :
                inputs.healthStatus === 'good' ? 30 : 10,
    financialRisk: debtServiceRatio > 0.4 ? 80 :
                   debtServiceRatio > 0.3 ? 60 :
                   debtServiceRatio > 0.2 ? 40 :
                   debtServiceRatio > 0.1 ? 20 : 10,
    emergencyFundGrowth,
    opportunityCost,
    liquidityScore,
    bestCaseCoverage,
    worstCaseCoverage,
    averageCaseCoverage,
    industryAverage,
    locationAverage,
    incomeLevelAverage
  };

  // Determine emergency fund rating
  const emergencyFundRating = coverageScore >= 90 && riskAdjustedCoverage >= 80 ? 'Excellent' :
                             coverageScore >= 75 && riskAdjustedCoverage >= 60 ? 'Good' :
                             coverageScore >= 50 && riskAdjustedCoverage >= 40 ? 'Fair' :
                             coverageScore >= 25 ? 'Poor' : 'Critical';

  // Determine priority level
  const priorityLevel = emergencyFundRating === 'Critical' ? 'High' :
                       emergencyFundRating === 'Poor' ? 'High' :
                       emergencyFundRating === 'Fair' ? 'Medium' : 'Low';

  // Create analysis object
  const analysis: EmergencyFundAnalysis = {
    emergencyFundRating: emergencyFundRating as any,
    recommendation: emergencyFundRating === 'Excellent'
      ? 'Your emergency fund is well-positioned. Continue monitoring and adjusting as needed.'
      : emergencyFundRating === 'Good'
      ? 'Your emergency fund is adequate but could be improved. Focus on increasing coverage.'
      : emergencyFundRating === 'Fair'
      ? 'Your emergency fund needs attention. Prioritize building it to at least 3 months of expenses.'
      : 'Your emergency fund is critically low. This should be your top financial priority.',
    priorityLevel: priorityLevel as any,

    coverageAssessment: `You have ${coverageMonths.toFixed(1)} months of expenses covered. Recommended: ${Math.ceil(recommendedEmergencyFund / monthlyExpenses)} months.`,
    riskAssessment: `Your overall risk score is ${riskScore.toFixed(0)}/100. ${riskScore > 60 ? 'High risk factors require larger emergency fund.' : 'Moderate risk factors suggest standard emergency fund size.'}`,
    adequacyAssessment: `Current coverage: ${Math.round(coverageScore)}%. ${coverageScore >= 80 ? 'Adequately funded.' : 'Under-funded - needs immediate attention.'}`,

    savingsRate: `Monthly savings needed: $${monthlySavingsNeeded.toFixed(0)}. ${monthlySavingsNeeded > monthlyIncome * 0.2 ? 'High savings rate required.' : 'Achievable savings goal.'}`,
    debtLoad: `Debt service ratio: ${Math.round(debtServiceRatio * 100)}%. ${debtServiceRatio > 0.4 ? 'High debt load increases emergency fund needs.' : 'Manageable debt level.'}`,
    incomeStability: `Income stability score: ${incomeStabilityScore.toFixed(0)}/100. ${incomeStabilityScore < 50 ? 'Unstable income requires larger emergency fund.' : 'Stable income supports standard emergency fund.'}`,

    jobLossImpact: `Time to find new job: ${timeToFindNewJob} months. Unemployment benefit: $${unemploymentBenefit.toFixed(0)}/month.`,
    healthImpact: `Health status: ${inputs.healthStatus}. ${inputs.healthStatus === 'poor' || inputs.healthStatus === 'critical' ? 'Health risks increase emergency fund needs.' : 'Good health reduces emergency fund requirements.'}`,
    locationImpact: `Location risk: ${inputs.locationRisk}. Cost of living index: ${inputs.costOfLivingIndex}.`,

    immediateActions: [
      'Assess current emergency fund adequacy',
      'Calculate monthly expenses accurately',
      'Set up automatic savings transfers',
      'Review and optimize insurance coverage',
      'Create a detailed budget'
    ],

    savingsStrategy: `Save $${monthlySavingsNeeded.toFixed(0)} monthly. Time to goal: ${Math.ceil(timeToGoal)} months.`,
    investmentStrategy: `Use ${inputs.emergencyFundInvestmentType} for liquidity. Expected return: ${Math.round(expectedReturnRate * 100)}%.`,

    longTermGoals: 'Build emergency fund to 6-12 months of expenses',
    wealthBuilding: 'Balance emergency fund with long-term investment goals',
    retirementPlanning: 'Emergency fund is foundation for retirement planning',

    scenarioAnalysis: scenarios,

    benchmarkComparison: `Industry average: $${Math.round(industryAverage)}. Your target: $${Math.round(recommendedEmergencyFund)}.`,
    peerComparison: `Income level average: $${Math.round(incomeLevelAverage)}. Location average: $${Math.round(locationAverage)}.`,
    industryComparison: 'Compared to similar households in your area and income bracket.',

    actionPlan: [
      'Set emergency fund savings goal',
      'Create monthly savings plan',
      'Automate savings transfers',
      'Track progress monthly',
      'Adjust plan as needed'
    ],

    timeline: `${Math.ceil(timeToGoal)} months to reach recommended emergency fund size.`,
    monitoringPlan: 'Review emergency fund quarterly and after major life changes.',

    recommendedResources: [
      'Emergency Fund Calculator Guide',
      'Budgeting and Savings Resources',
      'Insurance Coverage Review',
      'Financial Planning Books'
    ],

    nextSteps: [
      'Start saving immediately',
      'Cut unnecessary expenses',
      'Increase income if possible',
      'Consult financial advisor',
      'Monitor progress regularly'
    ]
  };

  // Determine overall risk level
  const overallRiskLevel = riskScore > 70 ? 'Very High' :
                          riskScore > 50 ? 'High' :
                          riskScore > 30 ? 'Medium' : 'Low';

  // Determine coverage status
  const coverageStatus = currentEmergencyFundRatio >= 1.2 ? 'Over-funded' :
                        currentEmergencyFundRatio >= 0.8 ? 'Adequately Funded' :
                        currentEmergencyFundRatio >= 0.5 ? 'Under-funded' : 'Severely Under-funded';

  return {
    metrics,
    analysis,
    recommendedAmount: recommendedEmergencyFund,
    currentAmount: currentEmergencyFund,
    monthlySavingsTarget: monthlySavingsNeeded,
    timeToGoal: Math.ceil(timeToGoal),
    overallRiskLevel: overallRiskLevel as any,
    coverageStatus: coverageStatus as any
  };
}

// Validation function
export function validateEmergencyFundCalculatorInputs(inputs: EmergencyFundCalculatorInputs): string[] {
  const errors: string[] = [];

  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push('Monthly income must be greater than 0');
  }

  if (!inputs.monthlyExpenses || inputs.monthlyExpenses <= 0) {
    errors.push('Monthly expenses must be greater than 0');
  }

  if (inputs.monthlyExpenses > inputs.monthlyIncome * 2) {
    errors.push('Monthly expenses seem unusually high compared to income');
  }

  if (inputs.currentEmergencyFund !== undefined && inputs.currentEmergencyFund < 0) {
    errors.push('Current emergency fund cannot be negative');
  }

  if (!inputs.dependents || inputs.dependents < 0 || inputs.dependents > 10) {
    errors.push('Number of dependents must be between 0 and 10');
  }

  if (!inputs.timeToFindNewJob || inputs.timeToFindNewJob < 1 || inputs.timeToFindNewJob > 24) {
    errors.push('Time to find new job must be between 1 and 24 months');
  }

  if (!inputs.desiredCoveragePeriod || inputs.desiredCoveragePeriod < 1 || inputs.desiredCoveragePeriod > 24) {
    errors.push('Desired coverage period must be between 1 and 24 months');
  }

  if (inputs.expectedReturnRate !== undefined && (inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.1)) {
    errors.push('Expected return rate must be between -10% and 10% for emergency funds');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 120) {
    errors.push('Analysis period must be between 1 and 120 months');
  }

  return errors;
}