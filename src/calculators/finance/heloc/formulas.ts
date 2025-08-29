import { HELOCInputs, HELOCMetrics, HELOCAnalysis } from './types';

export function calculateHELOC(inputs: HELOCInputs): HELOCMetrics {
  // Calculate equity metrics
  const totalEquity = inputs.propertyValue - inputs.currentMortgageBalance;
  const availableEquity = totalEquity * 0.85; // Typical HELOC limit is 85% of equity
  const combinedLTV = ((inputs.currentMortgageBalance + inputs.helocAmount) / inputs.propertyValue) * 100;
  const helocLTV = (inputs.helocAmount / inputs.propertyValue) * 100;
  
  // Calculate payment metrics
  const monthlyInterestRate = inputs.helocRate / 100 / 12;
  const monthlyPayment = inputs.drawAmount * monthlyInterestRate;
  const totalPayments = monthlyPayment * inputs.analysisPeriod * 12;
  const totalInterestPaid = totalPayments - inputs.drawAmount;
  
  // Calculate effective interest rate
  const effectiveInterestRate = (Math.pow(1 + (inputs.helocRate / 100), 1) - 1) * 100;
  
  // Calculate fees and costs
  const totalFees = inputs.originationFee + inputs.appraisalFee + inputs.titleInsuranceFee + 
                   inputs.recordingFee + inputs.otherFees;
  const totalCost = totalFees + totalInterestPaid;
  const costOfCredit = (totalCost / inputs.drawAmount) * 100;
  
  // Calculate cash flow metrics
  const monthlyCashFlow = -monthlyPayment; // Negative because it's an expense
  const totalCashFlow = monthlyCashFlow * inputs.analysisPeriod * 12;
  const breakEvenPoint = totalFees / Math.abs(monthlyCashFlow);
  
  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs);
  const lossGivenDefault = calculateLossGivenDefault(inputs);
  const expectedLoss = (probabilityOfDefault / 100) * (lossGivenDefault / 100) * inputs.helocAmount;
  
  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, monthlyPayment);
  
  // Calculate scenarios
  const scenarios = calculateScenarios(inputs, monthlyPayment);
  
  // Calculate payment schedule
  const paymentSchedule = calculatePaymentSchedule(inputs);
  
  return {
    // Equity Analysis
    totalEquity,
    availableEquity,
    combinedLTV,
    helocLTV,
    
    // Payment Analysis
    monthlyPayment,
    totalPayments,
    totalInterestPaid,
    effectiveInterestRate,
    
    // Cost Analysis
    totalFees,
    totalCost,
    costOfCredit,
    
    // Cash Flow Analysis
    monthlyCashFlow,
    totalCashFlow,
    breakEvenPoint,
    
    // Risk Metrics
    riskScore,
    probabilityOfDefault,
    lossGivenDefault,
    expectedLoss,
    
    // Sensitivity Analysis
    sensitivityMatrix,
    
    // Scenario Analysis
    scenarios,
    
    // Payment Schedule
    paymentSchedule
  };
}

function calculateRiskScore(inputs: HELOCInputs): number {
  let riskScore = 5; // Base score
  
  // Borrower risk factors
  if (inputs.borrowerCreditScore < 600) riskScore += 3;
  else if (inputs.borrowerCreditScore < 650) riskScore += 2;
  else if (inputs.borrowerCreditScore < 700) riskScore += 1;
  else if (inputs.borrowerCreditScore >= 750) riskScore -= 1;
  
  if (inputs.borrowerDebtToIncomeRatio > 50) riskScore += 2;
  else if (inputs.borrowerDebtToIncomeRatio > 40) riskScore += 1;
  else if (inputs.borrowerDebtToIncomeRatio < 30) riskScore -= 1;
  
  const employmentScores = { employed: 0, self_employed: 1, retired: -1, unemployed: 3 };
  riskScore += employmentScores[inputs.borrowerEmploymentType];
  
  if (inputs.borrowerEmploymentLength < 2) riskScore += 1;
  else if (inputs.borrowerEmploymentLength >= 10) riskScore -= 1;
  
  // Property risk factors
  const conditionScores = { excellent: -2, good: -1, fair: 0, poor: 2 };
  riskScore += conditionScores[inputs.propertyCondition];
  
  if (inputs.propertyAge > 50) riskScore += 1;
  else if (inputs.propertyAge > 30) riskScore += 0.5;
  
  // HELOC risk factors
  if (inputs.combinedLTV > 85) riskScore += 2;
  else if (inputs.combinedLTV > 80) riskScore += 1;
  else if (inputs.combinedLTV < 70) riskScore -= 1;
  
  if (inputs.helocRate > 10) riskScore += 1;
  
  // Market risk factors
  const marketScores = { appreciating: -1, stable: 0, declining: 2 };
  riskScore += marketScores[inputs.marketCondition];
  
  return Math.min(Math.max(riskScore, 1), 10);
}

function calculateProbabilityOfDefault(inputs: HELOCInputs): number {
  let baseProbability = 3; // Base 3% default probability
  
  // Credit score adjustment
  if (inputs.borrowerCreditScore < 600) baseProbability += 12;
  else if (inputs.borrowerCreditScore < 650) baseProbability += 8;
  else if (inputs.borrowerCreditScore < 700) baseProbability += 4;
  else if (inputs.borrowerCreditScore >= 750) baseProbability -= 2;
  
  // DTI adjustment
  if (inputs.borrowerDebtToIncomeRatio > 50) baseProbability += 8;
  else if (inputs.borrowerDebtToIncomeRatio > 40) baseProbability += 4;
  
  // Employment adjustment
  const employmentAdjustments = { employed: 0, self_employed: 2, retired: -1, unemployed: 10 };
  baseProbability += employmentAdjustments[inputs.borrowerEmploymentType];
  
  // LTV adjustment
  if (inputs.combinedLTV > 85) baseProbability += 5;
  else if (inputs.combinedLTV > 80) baseProbability += 2;
  
  // Market condition adjustment
  const marketAdjustments = { appreciating: -1, stable: 0, declining: 3 };
  baseProbability += marketAdjustments[inputs.marketCondition];
  
  return Math.min(Math.max(baseProbability, 1), 20);
}

function calculateLossGivenDefault(inputs: HELOCInputs): number {
  let baseLoss = 30; // Base 30% loss
  
  // Property condition adjustment
  const conditionAdjustments = { excellent: 0.8, good: 0.9, fair: 1.0, poor: 1.3 };
  baseLoss *= conditionAdjustments[inputs.propertyCondition];
  
  // Market condition adjustment
  const marketAdjustments = { appreciating: 0.8, stable: 1.0, declining: 1.4 };
  baseLoss *= marketAdjustments[inputs.marketCondition];
  
  // LTV adjustment
  if (inputs.combinedLTV > 85) baseLoss *= 1.2;
  else if (inputs.combinedLTV < 70) baseLoss *= 0.8;
  
  return Math.min(Math.max(baseLoss, 15), 60);
}

function calculateSensitivityMatrix(inputs: HELOCInputs, basePayment: number): any[] {
  const variables = [
    { name: 'HELOC Rate', base: inputs.helocRate, range: [-2, 2] },
    { name: 'Property Value', base: inputs.propertyValue, range: [-10, 10] },
    { name: 'Draw Amount', base: inputs.drawAmount, range: [-20, 20] },
    { name: 'Market Growth', base: inputs.marketGrowthRate, range: [-2, 2] }
  ];
  
  return variables.map(variable => {
    const values = [];
    const impacts = [];
    
    for (let i = variable.range[0]; i <= variable.range[1]; i++) {
      const testInputs = { ...inputs };
      const adjustment = 1 + (i / 100);
      
      if (variable.name === 'HELOC Rate') {
        testInputs.helocRate = variable.base + i;
      } else if (variable.name === 'Property Value') {
        testInputs.propertyValue = variable.base * adjustment;
      } else if (variable.name === 'Draw Amount') {
        testInputs.drawAmount = variable.base * adjustment;
      } else if (variable.name === 'Market Growth') {
        testInputs.marketGrowthRate = variable.base + i;
      }
      
      const testMetrics = calculateHELOC(testInputs);
      values.push(variable.base + i);
      impacts.push(testMetrics.monthlyPayment);
    }
    
    return {
      variable: variable.name,
      values,
      impacts
    };
  });
}

function calculateScenarios(inputs: HELOCInputs, basePayment: number): any[] {
  return [
    {
      scenario: 'Best Case',
      probability: 20,
      value: basePayment * 0.8,
      cost: inputs.totalFees * 0.8
    },
    {
      scenario: 'Base Case',
      probability: 60,
      value: basePayment,
      cost: inputs.totalFees
    },
    {
      scenario: 'Worst Case',
      probability: 20,
      value: basePayment * 1.3,
      cost: inputs.totalFees * 1.2
    }
  ];
}

function calculatePaymentSchedule(inputs: HELOCInputs): any[] {
  const schedule = [];
  const monthlyInterestRate = inputs.helocRate / 100 / 12;
  let balance = inputs.drawAmount;
  
  for (let month = 1; month <= inputs.analysisPeriod * 12; month++) {
    const interest = balance * monthlyInterestRate;
    let principal = 0;
    
    if (inputs.repaymentStrategy === 'interest_only') {
      principal = 0;
    } else if (inputs.repaymentStrategy === 'principal_interest') {
      const totalPayment = inputs.minimumPayment;
      principal = totalPayment - interest;
      if (principal < 0) principal = 0;
    } else {
      principal = balance / (inputs.analysisPeriod * 12);
    }
    
    balance -= principal;
    if (balance < 0) balance = 0;
    
    schedule.push({
      period: month,
      payment: interest + principal,
      principal,
      interest,
      balance
    });
  }
  
  return schedule;
}

export function generateHELOCReport(
  inputs: HELOCInputs, 
  metrics: HELOCMetrics
): HELOCAnalysis {
  // Determine HELOC rating
  let helocRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (metrics.combinedLTV <= 70 && inputs.borrowerCreditScore >= 750) helocRating = 'Excellent';
  else if (metrics.combinedLTV <= 80 && inputs.borrowerCreditScore >= 700) helocRating = 'Good';
  else if (metrics.combinedLTV <= 85 && inputs.borrowerCreditScore >= 650) helocRating = 'Average';
  else if (metrics.combinedLTV <= 90 && inputs.borrowerCreditScore >= 600) helocRating = 'Poor';
  else helocRating = 'Very Poor';
  
  // Determine risk rating
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (metrics.riskScore <= 3) riskRating = 'Low';
  else if (metrics.riskScore <= 5) riskRating = 'Moderate';
  else if (metrics.riskScore <= 7) riskRating = 'High';
  else riskRating = 'Very High';
  
  // Determine recommendation
  let recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  if (metrics.combinedLTV <= 80 && inputs.borrowerCreditScore >= 700) recommendation = 'Approve';
  else if (metrics.combinedLTV <= 85 && inputs.borrowerCreditScore >= 650) recommendation = 'Conditional';
  else if (metrics.combinedLTV <= 90 && inputs.borrowerCreditScore >= 600) recommendation = 'Requires Review';
  else recommendation = 'Reject';
  
  // Generate key insights
  const keyStrengths = [];
  const keyWeaknesses = [];
  const riskFactors = [];
  const opportunities = [];
  
  if (metrics.combinedLTV <= 75) keyStrengths.push('Low combined LTV ratio');
  if (inputs.borrowerCreditScore >= 750) keyStrengths.push('Excellent borrower credit');
  if (inputs.borrowerEmploymentType === 'employed') keyStrengths.push('Stable employment');
  if (inputs.propertyCondition === 'excellent' || inputs.propertyCondition === 'good') keyStrengths.push('Good property condition');
  if (inputs.marketCondition === 'appreciating') keyStrengths.push('Appreciating market conditions');
  
  if (metrics.combinedLTV > 85) keyWeaknesses.push('High combined LTV ratio');
  if (inputs.borrowerCreditScore < 650) keyWeaknesses.push('Poor borrower credit');
  if (inputs.borrowerDebtToIncomeRatio > 50) keyWeaknesses.push('High debt-to-income ratio');
  if (inputs.propertyCondition === 'poor') keyWeaknesses.push('Poor property condition');
  if (inputs.marketCondition === 'declining') keyWeaknesses.push('Declining market conditions');
  
  if (metrics.probabilityOfDefault > 8) riskFactors.push('Elevated default risk');
  if (inputs.borrowerEmploymentType === 'unemployed') riskFactors.push('Unemployed borrower');
  if (inputs.combinedLTV > 90) riskFactors.push('Very high LTV ratio');
  if (inputs.helocRate > 10) riskFactors.push('High interest rate');
  
  if (inputs.marketCondition === 'appreciating') opportunities.push('Property value appreciation potential');
  if (inputs.intendedUse === 'home_improvement') opportunities.push('Value-add through improvements');
  if (inputs.intendedUse === 'debt_consolidation') opportunities.push('Debt consolidation benefits');
  
  return {
    // Executive Summary
    helocRating,
    riskRating,
    recommendation,
    
    // Key Insights
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,
    
    // HELOC Analysis
    helocSummary: `The HELOC presents a ${helocRating.toLowerCase()} opportunity with a combined LTV of ${metrics.combinedLTV.toFixed(2)}% and available equity of $${metrics.availableEquity.toLocaleString()}.`,
    equityAnalysis: `Total equity in the property is $${metrics.totalEquity.toLocaleString()} with $${metrics.availableEquity.toLocaleString()} available for HELOC financing.`,
    paymentAnalysis: `Monthly payments of $${metrics.monthlyPayment.toLocaleString()} with an effective interest rate of ${metrics.effectiveInterestRate.toFixed(2)}%.`,
    
    // Cost Analysis
    costSummary: `Total costs include $${metrics.totalFees.toLocaleString()} in fees and $${metrics.totalInterestPaid.toLocaleString()} in interest over the analysis period.`,
    feeAnalysis: `Total fees of $${metrics.totalFees.toLocaleString()} represent ${metrics.costOfCredit.toFixed(2)}% of the draw amount.`,
    comparisonAnalysis: `The HELOC offers competitive terms compared to alternative financing options.`,
    
    // Risk Assessment
    riskAssessment: `Overall risk profile is ${riskRating.toLowerCase()} with a risk score of ${metrics.riskScore}/10.`,
    borrowerRisk: `Borrower has a credit score of ${inputs.borrowerCreditScore} with ${inputs.borrowerEmploymentType} employment status.`,
    propertyRisk: `Property is in ${inputs.propertyCondition} condition with ${inputs.propertyAge} years of age.`,
    marketRisk: `Market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% expected growth.`,
    
    // Usage Assessment
    usageAssessment: `The HELOC is intended for ${inputs.intendedUse.replace('_', ' ')} with initial draw of $${inputs.drawAmount.toLocaleString()}.`,
    drawAnalysis: `Draw frequency is ${inputs.drawFrequency.replace('_', ' ')} with ${inputs.repaymentStrategy.replace('_', ' ')} repayment strategy.`,
    repaymentAnalysis: `The repayment strategy provides flexibility while maintaining affordability.`,
    
    // Market Assessment
    marketAssessment: `Market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% annual growth rate.`,
    comparableAnalysis: `Comparable sales analysis supports the property value of $${inputs.propertyValue.toLocaleString()}.`,
    marketPosition: `The property is well-positioned in the current market conditions.`,
    
    // Recommendations
    approvalRecommendations: [
      'Conduct thorough borrower financial analysis',
      'Verify property condition and value',
      'Review market conditions and trends',
      'Assess repayment capacity and strategy'
    ],
    riskMitigation: [
      'Monitor combined LTV ratio regularly',
      'Establish clear repayment guidelines',
      'Maintain adequate property insurance',
      'Review borrower financial status annually'
    ],
    optimizationSuggestions: [
      'Consider interest-only payments during draw period',
      'Optimize draw timing and amounts',
      'Explore rate lock options if available',
      'Plan for repayment phase transition'
    ],
    
    // Implementation
    implementationPlan: 'Proceed with comprehensive underwriting and property appraisal.',
    nextSteps: [
      'Complete borrower financial analysis',
      'Conduct property appraisal',
      'Review title and insurance requirements',
      'Finalize HELOC terms and conditions'
    ],
    timeline: '15-30 days for underwriting and closing.',
    
    // Monitoring
    monitoringPlan: 'Establish quarterly monitoring of borrower performance and property value.',
    keyMetrics: [
      'Combined LTV ratio',
      'Borrower payment history',
      'Property value changes',
      'Market condition updates'
    ],
    reviewSchedule: 'Annual comprehensive review with quarterly updates.',
    
    // Risk Management
    riskManagement: 'Implement comprehensive risk management strategy including monitoring and mitigation measures.',
    mitigationStrategies: [
      'Regular property value assessments',
      'Borrower financial monitoring',
      'Market condition tracking',
      'Payment performance review'
    ],
    contingencyPlans: [
      'Default procedures and foreclosure options',
      'Property value decline response',
      'Rate increase management',
      'Exit strategy alternatives'
    ],
    
    // Performance Benchmarks
    performanceBenchmarks: [
      {
        metric: 'Combined LTV',
        target: 80,
        benchmark: metrics.combinedLTV,
        industry: 'HELOC Lending'
      },
      {
        metric: 'Credit Score',
        target: 700,
        benchmark: inputs.borrowerCreditScore,
        industry: 'Consumer Lending'
      },
      {
        metric: 'Risk Score',
        target: 5,
        benchmark: metrics.riskScore,
        industry: 'Risk Management'
      }
    ],
    
    // Decision Support
    decisionRecommendation: `Based on the analysis, we recommend ${recommendation.toLowerCase()} this HELOC application.`,
    presentationPoints: [
      `Strong equity position with ${metrics.combinedLTV.toFixed(2)}% combined LTV`,
      `Favorable risk profile with score of ${metrics.riskScore}/10`,
      `Competitive interest rate of ${inputs.helocRate}%`,
      `Flexible draw and repayment options`
    ],
    decisionFactors: [
      'Equity availability',
      'Borrower credit quality',
      'Property condition',
      'Market conditions',
      'Repayment capacity',
      'Risk tolerance'
    ]
  };
}
