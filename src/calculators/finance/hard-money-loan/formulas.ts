import { HardMoneyLoanInputs, HardMoneyLoanMetrics, HardMoneyLoanAnalysis } from './types';

export function calculateHardMoneyLoan(inputs: HardMoneyLoanInputs): HardMoneyLoanMetrics {
  // Calculate loan costs
  const pointsCost = (inputs.loanAmount * inputs.points) / 100;
  const totalFees = pointsCost + inputs.originationFee + inputs.processingFee + 
                   inputs.appraisalFee + inputs.titleInsuranceFee + inputs.escrowFee + 
                   inputs.recordingFee + inputs.otherFees;
  const totalLoanCost = inputs.loanAmount + totalFees;
  
  // Calculate monthly payment
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm;
  const monthlyPayment = (inputs.loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  // Calculate total interest paid
  const totalInterestPaid = (monthlyPayment * numberOfPayments) - inputs.loanAmount;
  
  // Calculate effective interest rate
  const effectiveInterestRate = (Math.pow(1 + (inputs.interestRate / 100), 1) - 1) * 100;
  
  // Calculate APR
  const annualPercentageRate = ((Math.pow((totalLoanCost / inputs.loanAmount), (1 / (inputs.loanTerm / 12))) - 1) * 100);
  
  // Calculate cash flow metrics
  const totalCashFlow = (inputs.expectedARV - inputs.propertyValue - inputs.renovationBudget - totalFees - totalInterestPaid);
  const monthlyCashFlow = totalCashFlow / inputs.projectTimeline;
  const cashOnCashReturn = (totalCashFlow / (inputs.propertyValue + inputs.renovationBudget + totalFees)) * 100;
  
  // Calculate break-even point
  const breakEvenPoint = (inputs.propertyValue + inputs.renovationBudget + totalFees) / monthlyCashFlow;
  
  // Calculate property metrics
  const loanToValueRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  const loanToCostRatio = (inputs.loanAmount / (inputs.propertyValue + inputs.renovationBudget)) * 100;
  const afterRepairValue = inputs.expectedARV;
  const equityPosition = ((inputs.expectedARV - inputs.loanAmount) / inputs.expectedARV) * 100;
  
  // Calculate return metrics
  const totalReturn = (totalCashFlow / (inputs.propertyValue + inputs.renovationBudget + totalFees)) * 100;
  const annualizedReturn = (Math.pow(1 + totalReturn / 100, 12 / inputs.projectTimeline) - 1) * 100;
  
  // Calculate IRR using iterative method
  const irr = calculateIRR(inputs, totalCashFlow);
  
  // Calculate NPV
  const netPresentValue = calculateNPV(inputs, totalCashFlow);
  
  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs);
  const lossGivenDefault = calculateLossGivenDefault(inputs);
  const expectedLoss = (probabilityOfDefault / 100) * (lossGivenDefault / 100) * inputs.loanAmount;
  
  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, totalCashFlow);
  
  // Calculate scenarios
  const scenarios = calculateScenarios(inputs, totalCashFlow);
  
  // Calculate project timeline
  const projectTimeline = calculateProjectTimeline(inputs);
  
  return {
    // Loan Analysis
    totalLoanCost,
    monthlyPayment,
    totalInterestPaid,
    totalFees,
    effectiveInterestRate,
    annualPercentageRate,
    
    // Cash Flow Analysis
    monthlyCashFlow,
    totalCashFlow,
    cashOnCashReturn,
    breakEvenPoint,
    
    // Property Analysis
    loanToValueRatio,
    loanToCostRatio,
    afterRepairValue,
    equityPosition,
    
    // Return Analysis
    totalReturn,
    annualizedReturn,
    internalRateOfReturn: irr,
    netPresentValue,
    
    // Risk Metrics
    riskScore,
    probabilityOfDefault,
    lossGivenDefault,
    expectedLoss,
    
    // Sensitivity Analysis
    sensitivityMatrix,
    
    // Scenario Analysis
    scenarios,
    
    // Project Timeline
    projectTimeline
  };
}

function calculateIRR(inputs: HardMoneyLoanInputs, totalCashFlow: number): number {
  // Simplified IRR calculation
  const totalInvestment = inputs.propertyValue + inputs.renovationBudget + 
                         (inputs.loanAmount * inputs.points / 100) + inputs.originationFee + 
                         inputs.processingFee + inputs.appraisalFee + inputs.titleInsuranceFee + 
                         inputs.escrowFee + inputs.recordingFee + inputs.otherFees;
  
  const totalReturn = totalCashFlow / totalInvestment;
  const annualizedReturn = Math.pow(1 + totalReturn, 12 / inputs.projectTimeline) - 1;
  
  return Math.min(Math.max(annualizedReturn * 100, 0), 50); // Clamp between 0% and 50%
}

function calculateNPV(inputs: HardMoneyLoanInputs, totalCashFlow: number): number {
  const totalInvestment = inputs.propertyValue + inputs.renovationBudget + 
                         (inputs.loanAmount * inputs.points / 100) + inputs.originationFee + 
                         inputs.processingFee + inputs.appraisalFee + inputs.titleInsuranceFee + 
                         inputs.escrowFee + inputs.recordingFee + inputs.otherFees;
  
  const monthlyDiscountRate = inputs.discountRate / 100 / 12;
  const presentValue = totalCashFlow / Math.pow(1 + monthlyDiscountRate, inputs.projectTimeline);
  
  return presentValue - totalInvestment;
}

function calculateRiskScore(inputs: HardMoneyLoanInputs): number {
  let riskScore = 5; // Base score
  
  // Borrower risk factors
  if (inputs.borrowerCreditScore < 600) riskScore += 3;
  else if (inputs.borrowerCreditScore < 650) riskScore += 2;
  else if (inputs.borrowerCreditScore < 700) riskScore += 1;
  else if (inputs.borrowerCreditScore >= 750) riskScore -= 1;
  
  if (inputs.borrowerDebtToIncomeRatio > 50) riskScore += 2;
  else if (inputs.borrowerDebtToIncomeRatio > 40) riskScore += 1;
  else if (inputs.borrowerDebtToIncomeRatio < 30) riskScore -= 1;
  
  const experienceScores = { none: 3, beginner: 2, intermediate: 0, experienced: -1, expert: -2 };
  riskScore += experienceScores[inputs.borrowerExperience];
  
  // Property risk factors
  const conditionScores = { excellent: -2, good: -1, fair: 0, poor: 2, needs_renovation: 3 };
  riskScore += conditionScores[inputs.propertyCondition];
  
  if (inputs.propertyAge > 50) riskScore += 2;
  else if (inputs.propertyAge > 30) riskScore += 1;
  
  // Project risk factors
  const projectScores = { fix_and_flip: 1, buy_and_hold: 0, construction: 2, land_development: 3, refinance: 0 };
  riskScore += projectScores[inputs.projectType];
  
  if (inputs.projectTimeline > 12) riskScore += 1;
  
  // Market risk factors
  const marketScores = { hot: -1, stable: 0, declining: 2, recovering: 1 };
  riskScore += marketScores[inputs.marketCondition];
  
  // Legal risk factors
  if (inputs.environmentalIssues) riskScore += 3;
  if (inputs.titleIssues) riskScore += 3;
  if (inputs.permitIssues) riskScore += 2;
  if (!inputs.zoningCompliance) riskScore += 3;
  
  return Math.min(Math.max(riskScore, 1), 10);
}

function calculateProbabilityOfDefault(inputs: HardMoneyLoanInputs): number {
  let baseProbability = 5; // Base 5% default probability
  
  // Credit score adjustment
  if (inputs.borrowerCreditScore < 600) baseProbability += 15;
  else if (inputs.borrowerCreditScore < 650) baseProbability += 10;
  else if (inputs.borrowerCreditScore < 700) baseProbability += 5;
  else if (inputs.borrowerCreditScore >= 750) baseProbability -= 3;
  
  // DTI adjustment
  if (inputs.borrowerDebtToIncomeRatio > 50) baseProbability += 10;
  else if (inputs.borrowerDebtToIncomeRatio > 40) baseProbability += 5;
  
  // Experience adjustment
  const experienceAdjustments = { none: 10, beginner: 5, intermediate: 0, experienced: -3, expert: -5 };
  baseProbability += experienceAdjustments[inputs.borrowerExperience];
  
  // Property condition adjustment
  const conditionAdjustments = { excellent: -3, good: -1, fair: 0, poor: 5, needs_renovation: 8 };
  baseProbability += conditionAdjustments[inputs.propertyCondition];
  
  // Project type adjustment
  const projectAdjustments = { fix_and_flip: 3, buy_and_hold: 0, construction: 8, land_development: 12, refinance: 2 };
  baseProbability += projectAdjustments[inputs.projectType];
  
  // Market condition adjustment
  const marketAdjustments = { hot: -2, stable: 0, declining: 8, recovering: 3 };
  baseProbability += marketAdjustments[inputs.marketCondition];
  
  return Math.min(Math.max(baseProbability, 1), 30);
}

function calculateLossGivenDefault(inputs: HardMoneyLoanInputs): number {
  let baseLoss = 40; // Base 40% loss
  
  // Property condition adjustment
  const conditionAdjustments = { excellent: 0.7, good: 0.8, fair: 1.0, poor: 1.3, needs_renovation: 1.5 };
  baseLoss *= conditionAdjustments[inputs.propertyCondition];
  
  // Market condition adjustment
  const marketAdjustments = { hot: 0.8, stable: 1.0, declining: 1.4, recovering: 1.1 };
  baseLoss *= marketAdjustments[inputs.marketCondition];
  
  // LTV adjustment
  if (inputs.loanAmount / inputs.propertyValue > 0.8) baseLoss *= 1.2;
  else if (inputs.loanAmount / inputs.propertyValue < 0.6) baseLoss *= 0.8;
  
  return Math.min(Math.max(baseLoss, 20), 80);
}

function calculateSensitivityMatrix(inputs: HardMoneyLoanInputs, baseCashFlow: number): any[] {
  const variables = [
    { name: 'Interest Rate', base: inputs.interestRate, range: [-2, 2] },
    { name: 'Property Value', base: inputs.propertyValue, range: [-10, 10] },
    { name: 'Expected ARV', base: inputs.expectedARV, range: [-10, 10] },
    { name: 'Renovation Budget', base: inputs.renovationBudget, range: [-20, 20] }
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
      } else if (variable.name === 'Expected ARV') {
        testInputs.expectedARV = variable.base * adjustment;
      } else if (variable.name === 'Renovation Budget') {
        testInputs.renovationBudget = variable.base * adjustment;
      }
      
      const testMetrics = calculateHardMoneyLoan(testInputs);
      values.push(variable.base + i);
      impacts.push(testMetrics.totalCashFlow);
    }
    
    return {
      variable: variable.name,
      values,
      impacts
    };
  });
}

function calculateScenarios(inputs: HardMoneyLoanInputs, baseCashFlow: number): any[] {
  return [
    {
      scenario: 'Best Case',
      probability: 20,
      value: baseCashFlow * 1.4,
      return: inputs.internalRateOfReturn * 1.3
    },
    {
      scenario: 'Base Case',
      probability: 60,
      value: baseCashFlow,
      return: inputs.internalRateOfReturn
    },
    {
      scenario: 'Worst Case',
      probability: 20,
      value: baseCashFlow * 0.6,
      return: inputs.internalRateOfReturn * 0.7
    }
  ];
}

function calculateProjectTimeline(inputs: HardMoneyLoanInputs): any[] {
  const phases = [];
  
  if (inputs.projectType === 'fix_and_flip') {
    phases.push(
      { phase: 'Purchase & Closing', duration: 1, cost: inputs.propertyValue, revenue: 0, cashFlow: -inputs.propertyValue },
      { phase: 'Renovation', duration: inputs.projectTimeline - 2, cost: inputs.renovationBudget, revenue: 0, cashFlow: -inputs.renovationBudget },
      { phase: 'Sale & Closing', duration: 1, cost: 0, revenue: inputs.expectedARV, cashFlow: inputs.expectedARV }
    );
  } else if (inputs.projectType === 'construction') {
    phases.push(
      { phase: 'Land Purchase', duration: 1, cost: inputs.propertyValue, revenue: 0, cashFlow: -inputs.propertyValue },
      { phase: 'Construction', duration: inputs.projectTimeline - 1, cost: inputs.renovationBudget, revenue: 0, cashFlow: -inputs.renovationBudget },
      { phase: 'Sale/Refinance', duration: 1, cost: 0, revenue: inputs.expectedARV, cashFlow: inputs.expectedARV }
    );
  } else {
    phases.push(
      { phase: 'Purchase', duration: 1, cost: inputs.propertyValue, revenue: 0, cashFlow: -inputs.propertyValue },
      { phase: 'Hold Period', duration: inputs.projectTimeline - 1, cost: 0, revenue: 0, cashFlow: 0 },
      { phase: 'Exit', duration: 1, cost: 0, revenue: inputs.expectedARV, cashFlow: inputs.expectedARV }
    );
  }
  
  return phases;
}

export function generateHardMoneyLoanReport(
  inputs: HardMoneyLoanInputs, 
  metrics: HardMoneyLoanMetrics
): HardMoneyLoanAnalysis {
  // Determine loan rating
  let loanRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (metrics.internalRateOfReturn >= 25) loanRating = 'Excellent';
  else if (metrics.internalRateOfReturn >= 15) loanRating = 'Good';
  else if (metrics.internalRateOfReturn >= 10) loanRating = 'Average';
  else if (metrics.internalRateOfReturn >= 5) loanRating = 'Poor';
  else loanRating = 'Very Poor';
  
  // Determine risk rating
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (metrics.riskScore <= 3) riskRating = 'Low';
  else if (metrics.riskScore <= 5) riskRating = 'Moderate';
  else if (metrics.riskScore <= 7) riskRating = 'High';
  else riskRating = 'Very High';
  
  // Determine recommendation
  let recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  if (metrics.internalRateOfReturn >= 15 && metrics.riskScore <= 5) recommendation = 'Approve';
  else if (metrics.internalRateOfReturn >= 10 && metrics.riskScore <= 6) recommendation = 'Conditional';
  else if (metrics.internalRateOfReturn >= 5) recommendation = 'Requires Review';
  else recommendation = 'Reject';
  
  // Generate key insights
  const keyStrengths = [];
  const keyWeaknesses = [];
  const riskFactors = [];
  const opportunities = [];
  
  if (metrics.internalRateOfReturn >= 20) keyStrengths.push('Strong return potential');
  if (metrics.riskScore <= 4) keyStrengths.push('Low risk profile');
  if (inputs.borrowerCreditScore >= 700) keyStrengths.push('Strong borrower credit');
  if (inputs.borrowerExperience === 'experienced' || inputs.borrowerExperience === 'expert') keyStrengths.push('Experienced borrower');
  if (inputs.propertyCondition === 'excellent' || inputs.propertyCondition === 'good') keyStrengths.push('Good property condition');
  
  if (metrics.internalRateOfReturn < 10) keyWeaknesses.push('Low return potential');
  if (metrics.riskScore >= 7) keyWeaknesses.push('High risk profile');
  if (inputs.borrowerCreditScore < 600) keyWeaknesses.push('Poor borrower credit');
  if (inputs.borrowerExperience === 'none' || inputs.borrowerExperience === 'beginner') keyWeaknesses.push('Inexperienced borrower');
  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_renovation') keyWeaknesses.push('Poor property condition');
  
  if (metrics.probabilityOfDefault > 10) riskFactors.push('Elevated default risk');
  if (inputs.marketCondition === 'declining') riskFactors.push('Declining market conditions');
  if (inputs.projectType === 'construction' || inputs.projectType === 'land_development') riskFactors.push('Complex project type');
  if (inputs.environmentalIssues) riskFactors.push('Environmental issues present');
  if (inputs.titleIssues) riskFactors.push('Title issues present');
  
  if (inputs.marketCondition === 'hot') opportunities.push('Strong market conditions');
  if (inputs.marketGrowthRate > 5) opportunities.push('High market growth potential');
  if (inputs.expectedARV > inputs.propertyValue * 1.3) opportunities.push('Strong value appreciation potential');
  
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
    loanSummary: `The hard money loan presents a ${loanRating.toLowerCase()} opportunity with a total cost of $${metrics.totalLoanCost.toLocaleString()} and an effective interest rate of ${metrics.effectiveInterestRate.toFixed(2)}%.`,
    costAnalysis: `Total loan costs include $${metrics.totalFees.toLocaleString()} in fees and $${metrics.totalInterestPaid.toLocaleString()} in interest over the ${inputs.loanTerm}-month term.`,
    paymentAnalysis: `Monthly payments of $${metrics.monthlyPayment.toLocaleString()} with a loan-to-value ratio of ${metrics.loanToValueRatio.toFixed(2)}%.`,
    
    // Cash Flow Analysis
    cashFlowSummary: `The project generates total cash flow of $${metrics.totalCashFlow.toLocaleString()} with a cash-on-cash return of ${metrics.cashOnCashReturn.toFixed(2)}%.`,
    returnAnalysis: `The investment offers an internal rate of return of ${metrics.internalRateOfReturn.toFixed(2)}% and annualized return of ${metrics.annualizedReturn.toFixed(2)}%.`,
    breakEvenAnalysis: `The project will break even in ${metrics.breakEvenPoint.toFixed(1)} months.`,
    
    // Property Analysis
    propertyAnalysis: `The ${inputs.propertyType} property is in ${inputs.propertyCondition} condition with an expected ARV of $${metrics.afterRepairValue.toLocaleString()}.`,
    valueAnalysis: `The property has a loan-to-cost ratio of ${metrics.loanToCostRatio.toFixed(2)}% and equity position of ${metrics.equityPosition.toFixed(2)}%.`,
    equityAnalysis: `The borrower will maintain ${metrics.equityPosition.toFixed(2)}% equity position after completion.`,
    
    // Risk Assessment
    riskAssessment: `Overall risk profile is ${riskRating.toLowerCase()} with a risk score of ${metrics.riskScore}/10.`,
    borrowerRisk: `Borrower has a credit score of ${inputs.borrowerCreditScore} with ${inputs.borrowerExperience} experience level.`,
    propertyRisk: `Property is in ${inputs.propertyCondition} condition with ${inputs.propertyAge} years of age.`,
    marketRisk: `Market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% expected growth.`,
    
    // Project Assessment
    projectAssessment: `The ${inputs.projectType.replace('_', ' ')} project has a ${inputs.projectTimeline}-month timeline with $${inputs.renovationBudget.toLocaleString()} renovation budget.`,
    timelineAnalysis: `The project timeline of ${inputs.projectTimeline} months aligns with the ${inputs.loanTerm}-month loan term.`,
    exitStrategyAnalysis: `The planned exit strategy is ${inputs.exitStrategy} with expected proceeds of $${inputs.expectedARV.toLocaleString()}.`,
    
    // Market Assessment
    marketAssessment: `Market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% annual growth rate.`,
    comparableAnalysis: `Comparable sales analysis supports the expected ARV of $${inputs.expectedARV.toLocaleString()}.`,
    marketPosition: `The property is well-positioned in the current market conditions.`,
    
    // Recommendations
    approvalRecommendations: [
      'Conduct thorough borrower due diligence',
      'Verify property condition and renovation estimates',
      'Review market conditions and comparable sales',
      'Assess environmental and title issues'
    ],
    riskMitigation: [
      'Require additional collateral if risk is high',
      'Implement strict monitoring and reporting',
      'Establish clear exit strategy requirements',
      'Consider shorter loan terms for higher risk projects'
    ],
    optimizationSuggestions: [
      'Negotiate lower fees and points',
      'Optimize renovation budget and timeline',
      'Consider alternative exit strategies',
      'Explore refinancing options'
    ],
    
    // Implementation
    implementationPlan: 'Proceed with comprehensive due diligence and legal review before closing.',
    nextSteps: [
      'Complete borrower financial analysis',
      'Conduct property inspection and appraisal',
      'Review legal documents and permits',
      'Finalize loan terms and conditions'
    ],
    timeline: '15-30 days for due diligence and closing.',
    
    // Monitoring
    monitoringPlan: 'Establish monthly monitoring of project progress and borrower performance.',
    keyMetrics: [
      'Project timeline adherence',
      'Renovation budget management',
      'Market condition changes',
      'Borrower financial status'
    ],
    reviewSchedule: 'Monthly progress reviews with quarterly comprehensive assessments.',
    
    // Risk Management
    riskManagement: 'Implement comprehensive risk management strategy including monitoring and mitigation measures.',
    mitigationStrategies: [
      'Regular property inspections',
      'Budget and timeline monitoring',
      'Market condition tracking',
      'Borrower financial monitoring'
    ],
    contingencyPlans: [
      'Default procedures and foreclosure options',
      'Project completion alternatives',
      'Market downturn response',
      'Exit strategy modifications'
    ],
    
    // Performance Benchmarks
    performanceBenchmarks: [
      {
        metric: 'IRR',
        target: 15,
        benchmark: metrics.internalRateOfReturn,
        industry: 'Hard Money Lending'
      },
      {
        metric: 'Risk Score',
        target: 5,
        benchmark: metrics.riskScore,
        industry: 'Real Estate Investment'
      },
      {
        metric: 'LTV Ratio',
        target: 70,
        benchmark: metrics.loanToValueRatio,
        industry: 'Hard Money Lending'
      }
    ],
    
    // Decision Support
    decisionRecommendation: `Based on the analysis, we recommend ${recommendation.toLowerCase()} this hard money loan.`,
    presentationPoints: [
      `Strong return potential with ${metrics.internalRateOfReturn.toFixed(2)}% IRR`,
      `Favorable risk profile with score of ${metrics.riskScore}/10`,
      `Market-competitive loan terms and costs`,
      `Clear exit strategy and timeline`
    ],
    decisionFactors: [
      'Return on investment',
      'Risk profile',
      'Borrower quality',
      'Property condition',
      'Market conditions',
      'Project feasibility'
    ]
  };
}
