import { HomeEquityLoanInputs, HomeEquityLoanMetrics, HomeEquityLoanAnalysis } from './types';

export function calculateHomeEquityLoan(inputs: HomeEquityLoanInputs): HomeEquityLoanMetrics {
  // Calculate equity metrics
  const totalEquity = inputs.propertyValue - inputs.currentMortgageBalance;
  const availableEquity = totalEquity * 0.85; // Typical home equity loan limit is 85% of equity
  const combinedLTV = ((inputs.currentMortgageBalance + inputs.loanAmount) / inputs.propertyValue) * 100;
  const homeEquityLTV = (inputs.loanAmount / inputs.propertyValue) * 100;
  
  // Calculate payment metrics
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  
  // Calculate payment factor based on payment type
  let paymentFactor: number;
  if (inputs.paymentType === 'fixed') {
    paymentFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                   (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  } else if (inputs.paymentType === 'interest_only') {
    paymentFactor = monthlyInterestRate;
  } else {
    // Variable or balloon - use fixed for calculation
    paymentFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                   (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }
  
  const monthlyPayment = inputs.loanAmount * paymentFactor;
  const totalPayments = monthlyPayment * numberOfPayments;
  const totalInterestPaid = totalPayments - inputs.loanAmount;
  
  // Calculate effective interest rate
  const effectiveInterestRate = (Math.pow(1 + (inputs.interestRate / 100), 1) - 1) * 100;
  
  // Calculate fees and costs
  const totalFees = inputs.originationFee + inputs.appraisalFee + inputs.titleInsuranceFee + 
                   inputs.recordingFee + inputs.attorneyFee + inputs.creditReportFee + 
                   inputs.floodCertificationFee + inputs.taxServiceFee + inputs.otherFees;
  const totalCost = totalFees + totalInterestPaid;
  const costOfCredit = (totalCost / inputs.loanAmount) * 100;
  
  // Calculate cash flow metrics
  const monthlyCashFlow = -monthlyPayment; // Negative because it's an expense
  const totalCashFlow = monthlyCashFlow * inputs.analysisPeriod * 12;
  const breakEvenPoint = totalFees / Math.abs(monthlyCashFlow);
  
  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs);
  const lossGivenDefault = calculateLossGivenDefault(inputs);
  const expectedLoss = (probabilityOfDefault / 100) * (lossGivenDefault / 100) * inputs.loanAmount;
  
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
    homeEquityLTV,
    
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

function calculateRiskScore(inputs: HomeEquityLoanInputs): number {
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
  
  // Loan risk factors
  if (inputs.combinedLTV > 85) riskScore += 2;
  else if (inputs.combinedLTV > 80) riskScore += 1;
  else if (inputs.combinedLTV < 70) riskScore -= 1;
  
  if (inputs.interestRate > 10) riskScore += 1;
  
  if (inputs.paymentType === 'interest_only') riskScore += 1;
  if (inputs.paymentType === 'balloon') riskScore += 2;
  
  // Market risk factors
  const marketScores = { appreciating: -1, stable: 0, declining: 2 };
  riskScore += marketScores[inputs.marketCondition];
  
  return Math.min(Math.max(riskScore, 1), 10);
}

function calculateProbabilityOfDefault(inputs: HomeEquityLoanInputs): number {
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
  
  // Payment type adjustment
  if (inputs.paymentType === 'interest_only') baseProbability += 3;
  if (inputs.paymentType === 'balloon') baseProbability += 5;
  
  // Market condition adjustment
  const marketAdjustments = { appreciating: -1, stable: 0, declining: 3 };
  baseProbability += marketAdjustments[inputs.marketCondition];
  
  return Math.min(Math.max(baseProbability, 1), 20);
}

function calculateLossGivenDefault(inputs: HomeEquityLoanInputs): number {
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

function calculateSensitivityMatrix(inputs: HomeEquityLoanInputs, basePayment: number): any[] {
  const variables = [
    { name: 'Interest Rate', base: inputs.interestRate, range: [-2, 2] },
    { name: 'Property Value', base: inputs.propertyValue, range: [-10, 10] },
    { name: 'Loan Amount', base: inputs.loanAmount, range: [-20, 20] },
    { name: 'Market Growth', base: inputs.marketGrowthRate, range: [-2, 2] }
  ];
  
  return variables.map(variable => {
    const values = [];
    const impacts = [];
    
    for (let i = variable.range[0]; i <= variable.range[1]; i++) {
      const testInputs = { ...inputs };
      const adjustment = 1 + (i / 100);
      
      if (variable.name === 'Interest Rate') {
        testInputs.interestRate = variable.base + i;
      } else if (variable.name === 'Property Value') {
        testInputs.propertyValue = variable.base * adjustment;
      } else if (variable.name === 'Loan Amount') {
        testInputs.loanAmount = variable.base * adjustment;
      } else if (variable.name === 'Market Growth') {
        testInputs.marketGrowthRate = variable.base + i;
      }
      
      const testMetrics = calculateHomeEquityLoan(testInputs);
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

function calculateScenarios(inputs: HomeEquityLoanInputs, basePayment: number): any[] {
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

function calculatePaymentSchedule(inputs: HomeEquityLoanInputs): any[] {
  const schedule = [];
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  let balance = inputs.loanAmount;
  
  for (let month = 1; month <= inputs.loanTerm * 12; month++) {
    const interest = balance * monthlyInterestRate;
    let principal = 0;
    
    if (inputs.paymentType === 'interest_only') {
      principal = 0;
    } else if (inputs.paymentType === 'balloon') {
      if (month === inputs.loanTerm * 12) {
        principal = balance; // Balloon payment
      } else {
        principal = 0;
      }
    } else {
      // Fixed or variable payment
      const totalPayment = inputs.loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, inputs.loanTerm * 12)) / 
                          (Math.pow(1 + monthlyInterestRate, inputs.loanTerm * 12) - 1);
      principal = totalPayment - interest;
      if (principal < 0) principal = 0;
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

export function generateHomeEquityLoanReport(
  inputs: HomeEquityLoanInputs, 
  metrics: HomeEquityLoanMetrics
): HomeEquityLoanAnalysis {
  // Determine loan rating
  let loanRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (metrics.combinedLTV <= 70 && inputs.borrowerCreditScore >= 750) loanRating = 'Excellent';
  else if (metrics.combinedLTV <= 80 && inputs.borrowerCreditScore >= 700) loanRating = 'Good';
  else if (metrics.combinedLTV <= 85 && inputs.borrowerCreditScore >= 650) loanRating = 'Average';
  else if (metrics.combinedLTV <= 90 && inputs.borrowerCreditScore >= 600) loanRating = 'Poor';
  else loanRating = 'Very Poor';
  
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
  if (inputs.paymentType === 'fixed') keyStrengths.push('Fixed payment structure');
  
  if (metrics.combinedLTV > 85) keyWeaknesses.push('High combined LTV ratio');
  if (inputs.borrowerCreditScore < 650) keyWeaknesses.push('Poor borrower credit');
  if (inputs.borrowerDebtToIncomeRatio > 50) keyWeaknesses.push('High debt-to-income ratio');
  if (inputs.propertyCondition === 'poor') keyWeaknesses.push('Poor property condition');
  if (inputs.marketCondition === 'declining') keyWeaknesses.push('Declining market conditions');
  if (inputs.paymentType === 'balloon') keyWeaknesses.push('Balloon payment structure');
  
  if (metrics.probabilityOfDefault > 8) riskFactors.push('Elevated default risk');
  if (inputs.borrowerEmploymentType === 'unemployed') riskFactors.push('Unemployed borrower');
  if (inputs.combinedLTV > 90) riskFactors.push('Very high LTV ratio');
  if (inputs.interestRate > 10) riskFactors.push('High interest rate');
  if (inputs.paymentType === 'interest_only') riskFactors.push('Interest-only payments');
  
  if (inputs.marketCondition === 'appreciating') opportunities.push('Property value appreciation potential');
  if (inputs.loanPurpose === 'home_improvement') opportunities.push('Value-add through improvements');
  if (inputs.loanPurpose === 'debt_consolidation') opportunities.push('Debt consolidation benefits');
  if (inputs.paymentType === 'fixed') opportunities.push('Predictable payment structure');
  
  return {
    // Executive Summary
    loanRating,
    riskRating,
    recommendation,
    
    // Key Insights
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,
    
    // Loan Analysis
    loanSummary: `The home equity loan presents a ${loanRating.toLowerCase()} opportunity with a combined LTV of ${metrics.combinedLTV.toFixed(2)}% and available equity of $${metrics.availableEquity.toLocaleString()}.`,
    equityAnalysis: `Total equity in the property is $${metrics.totalEquity.toLocaleString()} with $${metrics.availableEquity.toLocaleString()} available for home equity financing.`,
    paymentAnalysis: `Monthly payments of $${metrics.monthlyPayment.toLocaleString()} with an effective interest rate of ${metrics.effectiveInterestRate.toFixed(2)}%.`,
    
    // Cost Analysis
    costSummary: `Total costs include $${metrics.totalFees.toLocaleString()} in fees and $${metrics.totalInterestPaid.toLocaleString()} in interest over the loan term.`,
    feeAnalysis: `Total fees of $${metrics.totalFees.toLocaleString()} represent ${metrics.costOfCredit.toFixed(2)}% of the loan amount.`,
    comparisonAnalysis: `The home equity loan offers competitive terms compared to alternative financing options.`,
    
    // Risk Assessment
    riskAssessment: `Overall risk profile is ${riskRating.toLowerCase()} with a risk score of ${metrics.riskScore}/10.`,
    borrowerRisk: `Borrower has a credit score of ${inputs.borrowerCreditScore} with ${inputs.borrowerEmploymentType} employment status.`,
    propertyRisk: `Property is in ${inputs.propertyCondition} condition with ${inputs.propertyAge} years of age.`,
    marketRisk: `Market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% expected growth.`,
    
    // Purpose Assessment
    purposeAssessment: `The loan is intended for ${inputs.loanPurpose.replace('_', ' ')}: ${inputs.purposeDescription}.`,
    benefitAnalysis: `The loan purpose provides clear benefits and value enhancement potential.`,
    repaymentAnalysis: `The ${inputs.paymentType.replace('_', ' ')} payment structure provides ${inputs.paymentFrequency} payments.`,
    
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
      'Consider fixed-rate payments for stability',
      'Optimize loan amount and term',
      'Explore rate lock options if available',
      'Plan for early repayment if possible'
    ],
    
    // Implementation
    implementationPlan: 'Proceed with comprehensive underwriting and property appraisal.',
    nextSteps: [
      'Complete borrower financial analysis',
      'Conduct property appraisal',
      'Review title and insurance requirements',
      'Finalize loan terms and conditions'
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
        industry: 'Home Equity Lending'
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
    decisionRecommendation: `Based on the analysis, we recommend ${recommendation.toLowerCase()} this home equity loan.`,
    presentationPoints: [
      `Strong equity position with ${metrics.combinedLTV.toFixed(2)}% combined LTV`,
      `Favorable risk profile with score of ${metrics.riskScore}/10`,
      `Competitive interest rate of ${inputs.interestRate}%`,
      `Clear loan purpose and benefit analysis`
    ],
    decisionFactors: [
      'Equity availability',
      'Borrower credit quality',
      'Property condition',
      'Market conditions',
      'Repayment capacity',
      'Loan purpose',
      'Risk tolerance'
    ]
  };
}
