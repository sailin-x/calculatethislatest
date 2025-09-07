import { LoanToCostInputs, LoanToCostMetrics, LoanToCostAnalysis } from './types';

export function calculateLoanToCostRatio(inputs: LoanToCostInputs): number {
  return (inputs.loanAmount / inputs.totalProjectCost) * 100;
}

export function calculateEquityContribution(inputs: LoanToCostInputs): number {
  return inputs.totalProjectCost - inputs.loanAmount;
}

export function calculateEquityPercentage(inputs: LoanToCostInputs): number {
  return ((inputs.totalProjectCost - inputs.loanAmount) / inputs.totalProjectCost) * 100;
}

export function calculateLeverageRatio(inputs: LoanToCostInputs): number {
  return inputs.loanAmount / (inputs.totalProjectCost - inputs.loanAmount);
}

export function calculateCostBreakdown(inputs: LoanToCostInputs): Array<{category: string, amount: number, percentage: number}> {
  const totalCost = inputs.totalProjectCost;
  return [
    { category: 'Land', amount: inputs.landCost, percentage: (inputs.landCost / totalCost) * 100 },
    { category: 'Construction', amount: inputs.constructionCost, percentage: (inputs.constructionCost / totalCost) * 100 },
    { category: 'Soft Costs', amount: inputs.softCosts, percentage: (inputs.softCosts / totalCost) * 100 },
    { category: 'Contingency', amount: inputs.contingencyCost, percentage: (inputs.contingencyCost / totalCost) * 100 }
  ];
}

export function calculateCostPerSquareFoot(inputs: LoanToCostInputs): number {
  return inputs.totalProjectCost / inputs.projectSize;
}

export function calculateCostVariance(inputs: LoanToCostInputs): number {
  const actualCost = inputs.landCost + inputs.constructionCost + inputs.softCosts + inputs.contingencyCost;
  return ((actualCost - inputs.totalProjectCost) / inputs.totalProjectCost) * 100;
}

export function calculateLoanPercentage(inputs: LoanToCostInputs): number {
  return (inputs.loanAmount / inputs.totalProjectCost) * 100;
}

export function calculateInterestExpense(inputs: LoanToCostInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  if (inputs.paymentType === 'interest_only') {
    return inputs.loanAmount * monthlyRate * numPayments;
  }

  // Standard loan calculation
  const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment * numPayments - inputs.loanAmount;
}

export function calculateTotalLoanCost(inputs: LoanToCostInputs): number {
  return inputs.loanAmount + calculateInterestExpense(inputs);
}

export function calculateConstructionCashFlow(inputs: LoanToCostInputs): Array<{
  period: number,
  drawAmount: number,
  interestExpense: number,
  totalCost: number,
  cumulativeCost: number
}> {
  const cashFlow = [];
  let cumulativeCost = 0;
  const monthlyRate = inputs.interestRate / 100 / 12;

  for (let i = 0; i < inputs.drawSchedule.length; i++) {
    const draw = inputs.drawSchedule[i];
    const interestExpense = cumulativeCost * monthlyRate;
    cumulativeCost += draw.amount;

    cashFlow.push({
      period: i + 1,
      drawAmount: draw.amount,
      interestExpense,
      totalCost: draw.amount + interestExpense,
      cumulativeCost
    });
  }

  return cashFlow;
}

export function calculateMonthlyInterestExpense(inputs: LoanToCostInputs): number {
  return (inputs.loanAmount * (inputs.interestRate / 100)) / 12;
}

export function calculateTotalInterestExpense(inputs: LoanToCostInputs): number {
  return calculateInterestExpense(inputs);
}

export function calculateRiskScore(inputs: LoanToCostInputs): number {
  let score = 0;

  // Construction risk
  if (inputs.constructionRisk === 'low') score += 25;
  else if (inputs.constructionRisk === 'medium') score += 50;
  else if (inputs.constructionRisk === 'high') score += 75;

  // Market risk
  if (inputs.marketRisk === 'low') score += 25;
  else if (inputs.marketRisk === 'medium') score += 50;
  else if (inputs.marketRisk === 'high') score += 75;

  // Borrower risk
  if (inputs.borrowerRisk === 'low') score += 25;
  else if (inputs.borrowerRisk === 'medium') score += 50;
  else if (inputs.borrowerRisk === 'high') score += 75;

  // Project risk
  if (inputs.projectRisk === 'low') score += 25;
  else if (inputs.projectRisk === 'medium') score += 50;
  else if (inputs.projectRisk === 'high') score += 75;

  return score;
}

export function calculateProbabilityOfCompletion(inputs: LoanToCostInputs): number {
  const riskScore = calculateRiskScore(inputs);
  return Math.max(0, 100 - riskScore);
}

export function calculateProbabilityOfDefault(inputs: LoanToCostInputs): number {
  const riskScore = calculateRiskScore(inputs);
  return Math.min(100, riskScore * 0.8);
}

export function calculateExpectedLoss(inputs: LoanToCostInputs): number {
  const defaultProb = calculateProbabilityOfDefault(inputs) / 100;
  return inputs.loanAmount * defaultProb * 0.5; // Assuming 50% recovery rate
}

export function calculateExpectedProfit(inputs: LoanToCostInputs): number {
  return inputs.expectedExitValue - inputs.totalProjectCost - calculateTotalLoanCost(inputs);
}

export function calculateProfitMargin(inputs: LoanToCostInputs): number {
  const profit = calculateExpectedProfit(inputs);
  return (profit / inputs.totalProjectCost) * 100;
}

export function calculateReturnOnEquity(inputs: LoanToCostInputs): number {
  const profit = calculateExpectedProfit(inputs);
  const equity = inputs.totalProjectCost - inputs.loanAmount;
  return equity > 0 ? (profit / equity) * 100 : 0;
}

export function calculateReturnOnCost(inputs: LoanToCostInputs): number {
  const profit = calculateExpectedProfit(inputs);
  return (profit / inputs.totalProjectCost) * 100;
}

export function calculateSensitivityMatrix(inputs: LoanToCostInputs): Array<{
  variable: string,
  values: number[],
  impacts: number[]
}> {
  return [
    {
      variable: 'Interest Rate',
      values: [inputs.interestRate - 1, inputs.interestRate, inputs.interestRate + 1],
      impacts: [
        calculateLoanToCostRatio({...inputs, interestRate: inputs.interestRate - 1}),
        calculateLoanToCostRatio(inputs),
        calculateLoanToCostRatio({...inputs, interestRate: inputs.interestRate + 1})
      ]
    },
    {
      variable: 'Construction Cost',
      values: [inputs.constructionCost * 0.9, inputs.constructionCost, inputs.constructionCost * 1.1],
      impacts: [
        calculateLoanToCostRatio({...inputs, constructionCost: inputs.constructionCost * 0.9}),
        calculateLoanToCostRatio(inputs),
        calculateLoanToCostRatio({...inputs, constructionCost: inputs.constructionCost * 1.1})
      ]
    }
  ];
}

export function calculateScenarios(inputs: LoanToCostInputs): Array<{
  scenario: string,
  probability: number,
  ltcRatio: number,
  profit: number
}> {
  return [
    {
      scenario: 'Base Case',
      probability: 0.5,
      ltcRatio: calculateLoanToCostRatio(inputs),
      profit: calculateExpectedProfit(inputs)
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      ltcRatio: calculateLoanToCostRatio({...inputs, expectedExitValue: inputs.expectedExitValue * 1.1}),
      profit: calculateExpectedProfit({...inputs, expectedExitValue: inputs.expectedExitValue * 1.1})
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      ltcRatio: calculateLoanToCostRatio({...inputs, expectedExitValue: inputs.expectedExitValue * 0.9}),
      profit: calculateExpectedProfit({...inputs, expectedExitValue: inputs.expectedExitValue * 0.9})
    }
  ];
}

export function calculateIndustryBenchmarks(inputs: LoanToCostInputs): Array<{
  metric: string,
  industry: string,
  average: number,
  range: string
}> {
  return [
    {
      metric: 'LTC Ratio',
      industry: inputs.projectType,
      average: 75,
      range: '60-85%'
    },
    {
      metric: 'Equity Contribution',
      industry: inputs.projectType,
      average: 25,
      range: '15-40%'
    }
  ];
}

export function generateLoanToCostAnalysis(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): LoanToCostAnalysis {
  const ltcRatio = metrics.loanToCostRatio;
  const riskScore = metrics.riskScore;

  let ltcRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (ltcRatio <= 70) ltcRating = 'Excellent';
  else if (ltcRatio <= 75) ltcRating = 'Good';
  else if (ltcRatio <= 80) ltcRating = 'Average';
  else if (ltcRatio <= 85) ltcRating = 'Poor';
  else ltcRating = 'Very Poor';

  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (riskScore <= 50) riskRating = 'Low';
  else if (riskScore <= 75) riskRating = 'Moderate';
  else if (riskScore <= 100) riskRating = 'High';
  else riskRating = 'Very High';

  const recommendation = ltcRatio <= 80 && riskScore <= 75 ? 'Approve' :
                        ltcRatio <= 85 && riskScore <= 100 ? 'Conditional' :
                        'Requires Review';

  return {
    ltcRating,
    riskRating,
    recommendation,
    keyStrengths: [
      ltcRatio <= 75 ? 'Strong equity contribution' : 'Standard leverage levels',
      riskScore <= 50 ? 'Low risk profile' : 'Manageable risk factors'
    ],
    keyWeaknesses: [
      ltcRatio > 80 ? 'High leverage levels' : 'Standard leverage',
      riskScore > 75 ? 'Elevated risk factors' : 'Standard risk profile'
    ],
    riskFactors: [
      inputs.constructionRisk === 'high' ? 'High construction risk' : 'Standard construction risk',
      inputs.marketRisk === 'high' ? 'High market risk' : 'Standard market risk'
    ],
    opportunities: [
      inputs.marketCondition === 'growing' ? 'Growing market conditions' : 'Stable market conditions',
      inputs.borrowerExperience === 'extensive' ? 'Experienced borrower' : 'Standard borrower experience'
    ],
    ltcSummary: `Loan-to-Cost ratio of ${ltcRatio.toFixed(1)}% indicates ${ltcRating.toLowerCase()} leverage levels.`,
    costAnalysis: `Total project cost of $${inputs.totalProjectCost.toLocaleString()} with $${inputs.loanAmount.toLocaleString()} financed.`,
    loanAnalysis: `Loan amount represents ${metrics.loanPercentage.toFixed(1)}% of total project cost.`,
    riskAssessment: `Overall risk score of ${riskScore} indicates ${riskRating.toLowerCase()} risk profile.`,
    constructionRisk: `Construction risk assessed as ${inputs.constructionRisk}.`,
    marketRisk: `Market risk assessed as ${inputs.marketRisk}.`,
    borrowerRisk: `Borrower risk assessed as ${inputs.borrowerRisk}.`,
    projectRisk: `Project risk assessed as ${inputs.projectRisk}.`,
    financialSummary: `Expected profit of $${metrics.expectedProfit.toLocaleString()} with ${metrics.profitMargin.toFixed(1)}% margin.`,
    cashFlowAnalysis: `Construction financing requires ${inputs.drawSchedule.length} draws over ${inputs.constructionDuration} months.`,
    profitabilityAnalysis: `Return on equity of ${metrics.returnOnEquity.toFixed(1)}% with ${metrics.returnOnCost.toFixed(1)}% return on cost.`,
    marketAssessment: `Project located in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions.`,
    comparableAnalysis: `${inputs.comparableProjects.length} comparable projects analyzed.`,
    marketPosition: `Project positioned in ${inputs.marketCondition} market with ${inputs.marketGrowthRate}% growth rate.`,
    approvalRecommendations: [
      ltcRatio <= 80 ? 'Approve loan application' : 'Review equity contribution requirements',
      riskScore <= 75 ? 'Standard approval process' : 'Enhanced due diligence required'
    ],
    riskMitigation: [
      inputs.personalGuarantee ? 'Personal guarantee in place' : 'Consider requiring personal guarantee',
      inputs.completionGuarantee ? 'Completion guarantee secured' : 'Consider completion guarantee'
    ],
    optimizationSuggestions: [
      ltcRatio > 80 ? 'Consider reducing loan amount or increasing equity' : 'Loan structure optimized',
      riskScore > 75 ? 'Implement risk mitigation strategies' : 'Risk profile acceptable'
    ],
    implementationPlan: `Loan funding through ${inputs.drawSchedule.length} construction draws with interest reserve.`,
    nextSteps: [
      'Complete due diligence',
      'Finalize loan documentation',
      'Establish draw schedule',
      'Begin construction monitoring'
    ],
    timeline: `${inputs.constructionDuration} month construction period with ${inputs.exitTimeline} month exit timeline.`,
    monitoringPlan: 'Monthly construction draws with site inspections and cost certifications.',
    keyMetrics: [
      'Construction progress',
      'Cost variance',
      'Market conditions',
      'Borrower compliance'
    ],
    reviewSchedule: 'Monthly construction updates with quarterly comprehensive reviews.',
    riskManagement: `Risk management plan includes ${inputs.personalGuarantee ? 'personal' : 'no personal'} guarantee and ${inputs.completionGuarantee ? 'completion' : 'no completion'} guarantee.`,
    mitigationStrategies: [
      'Regular construction monitoring',
      'Cost control measures',
      'Market condition tracking',
      'Borrower financial monitoring'
    ],
    contingencyPlans: [
      'Cost overrun reserves',
      'Interest rate hedging',
      'Market downturn protection',
      'Borrower default scenarios'
    ],
    performanceBenchmarks: [
      {
        metric: 'LTC Ratio',
        target: 75,
        benchmark: ltcRatio,
        industry: inputs.projectType
      },
      {
        metric: 'Equity Contribution',
        target: 25,
        benchmark: metrics.equityPercentage,
        industry: inputs.projectType
      }
    ],
    decisionRecommendation: `${recommendation} loan application based on ${ltcRating.toLowerCase()} LTC ratio and ${riskRating.toLowerCase()} risk profile.`,
    presentationPoints: [
      `LTC ratio of ${ltcRatio.toFixed(1)}% (${ltcRating})`,
      `Risk score of ${riskScore} (${riskRating})`,
      `Expected profit of $${metrics.expectedProfit.toLocaleString()}`,
      `Return on equity of ${metrics.returnOnEquity.toFixed(1)}%`
    ],
    decisionFactors: [
      'Loan-to-cost ratio analysis',
      'Risk assessment results',
      'Borrower qualifications',
      'Market conditions',
      'Project feasibility'
    ]
  };
}