import { PMICancellationInputs, PMICancellationMetrics, PMICancellationAnalysis } from './types';

export function calculateCurrentLtvRatio(inputs: PMICancellationInputs): number {
  return inputs.currentPropertyValue > 0 ? (inputs.currentLoanBalance / inputs.currentPropertyValue) * 100 : 0;
}

export function calculateRequiredLtvRatio(inputs: PMICancellationInputs): number {
  return inputs.ltvThreshold;
}

export function calculateLtvGap(inputs: PMICancellationInputs): number {
  const currentLtv = calculateCurrentLtvRatio(inputs);
  const requiredLtv = calculateRequiredLtvRatio(inputs);
  return requiredLtv - currentLtv;
}

export function calculatePMIEligibility(inputs: PMICancellationInputs): boolean {
  const currentLtv = calculateCurrentLtvRatio(inputs);
  const requiredLtv = calculateRequiredLtvRatio(inputs);
  return currentLtv <= requiredLtv;
}

export function calculateTotalPMIPaid(inputs: PMICancellationInputs): number {
  const pmiStartDate = new Date(inputs.pmiStartDate);
  const pmiCancellationDate = new Date(inputs.pmiCancellationDate);
  const monthsPMI = Math.max(0, (pmiCancellationDate.getTime() - pmiStartDate.getTime()) / (1000 * 60 * 60 * 24 * 30));

  return inputs.pmiMonthlyPayment * monthsPMI;
}

export function calculateRemainingPMICost(inputs: PMICancellationInputs): number {
  if (calculatePMIEligibility(inputs)) {
    return 0;
  }

  const currentDate = new Date();
  const automaticCancellationDate = calculateAutomaticCancellationDate(inputs);
  const monthsRemaining = Math.max(0, (automaticCancellationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30));

  return inputs.pmiMonthlyPayment * monthsRemaining;
}

export function calculatePMISavings(inputs: PMICancellationInputs): number {
  if (!calculatePMIEligibility(inputs)) {
    return 0;
  }

  const remainingCost = calculateRemainingPMICost(inputs);
  return remainingCost;
}

export function calculateMonthlyPMISavings(inputs: PMICancellationInputs): number {
  return calculatePMIEligibility(inputs) ? inputs.pmiMonthlyPayment : 0;
}

export function calculateAnnualPMISavings(inputs: PMICancellationInputs): number {
  return calculateMonthlyPMISavings(inputs) * 12;
}

export function calculateAutomaticCancellationDate(inputs: PMICancellationInputs): Date {
  // PMI automatically cancels when LTV reaches threshold
  const targetEquity = inputs.originalLoanAmount * (1 - inputs.ltvThreshold / 100);
  const currentEquity = inputs.currentPropertyValue - inputs.currentLoanBalance;
  const equityNeeded = targetEquity - currentEquity;

  if (equityNeeded <= 0) {
    return new Date(); // Already eligible
  }

  // Estimate months needed based on principal payments
  const monthlyPrincipal = calculateMonthlyPrincipalPayment(inputs);
  const monthsNeeded = equityNeeded / monthlyPrincipal;

  const result = new Date();
  result.setMonth(result.getMonth() + monthsNeeded);
  return result;
}

export function calculateRequestCancellationDate(inputs: PMICancellationInputs): Date {
  // Can request cancellation earlier than automatic
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const requestDate = new Date(automaticDate);
  requestDate.setMonth(requestDate.getMonth() - 2); // 2 months earlier typically
  return requestDate;
}

export function calculateMonthsToAutomaticCancellation(inputs: PMICancellationInputs): number {
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const currentDate = new Date();
  return Math.max(0, (automaticDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export function calculateMonthsToRequestCancellation(inputs: PMICancellationInputs): number {
  const requestDate = calculateRequestCancellationDate(inputs);
  const currentDate = new Date();
  return Math.max(0, (requestDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export function calculateMonthlyPayment(inputs: PMICancellationInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  const principalInterest = inputs.currentLoanBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

  return principalInterest + inputs.pmiMonthlyPayment;
}

export function calculateMonthlyPaymentWithoutPMI(inputs: PMICancellationInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  return inputs.currentLoanBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculatePaymentReduction(inputs: PMICancellationInputs): number {
  return calculateMonthlyPayment(inputs) - calculateMonthlyPaymentWithoutPMI(inputs);
}

export function calculateTotalPaymentSavings(inputs: PMICancellationInputs): number {
  const monthsRemaining = calculateMonthsToAutomaticCancellation(inputs);
  return calculateMonthlyPMISavings(inputs) * monthsRemaining;
}

export function calculateCurrentEquity(inputs: PMICancellationInputs): number {
  return inputs.currentPropertyValue - inputs.currentLoanBalance;
}

export function calculateEquityPercentage(inputs: PMICancellationInputs): number {
  return inputs.currentPropertyValue > 0 ? (calculateCurrentEquity(inputs) / inputs.currentPropertyValue) * 100 : 0;
}

export function calculateEquityGrowth(inputs: PMICancellationInputs): number {
  const originalEquity = inputs.originalPropertyValue - inputs.originalLoanAmount;
  const currentEquity = calculateCurrentEquity(inputs);
  return currentEquity - originalEquity;
}

export function calculateEquityRequired(inputs: PMICancellationInputs): number {
  return inputs.originalLoanAmount * (1 - inputs.ltvThreshold / 100);
}

export function calculateBreakEvenPoint(inputs: PMICancellationInputs): number {
  const appraisalCost = inputs.appraisalRequired ? inputs.appraisalCost : 0;
  const monthlySavings = calculateMonthlyPMISavings(inputs);

  if (monthlySavings <= 0) {
    return Infinity;
  }

  return appraisalCost / monthlySavings;
}

export function calculateBreakEvenMonths(inputs: PMICancellationInputs): number {
  return calculateBreakEvenPoint(inputs);
}

export function calculateBreakEvenCost(inputs: PMICancellationInputs): number {
  return inputs.appraisalRequired ? inputs.appraisalCost : 0;
}

export function calculateNetSavings(inputs: PMICancellationInputs): number {
  const totalSavings = calculateTotalPaymentSavings(inputs);
  const breakEvenCost = calculateBreakEvenCost(inputs);
  return totalSavings - breakEvenCost;
}

export function calculateMonthlyPrincipalPayment(inputs: PMICancellationInputs): number {
  const monthlyPayment = calculateMonthlyPaymentWithoutPMI(inputs);
  const monthlyRate = inputs.interestRate / 100 / 12;

  return monthlyPayment - (inputs.currentLoanBalance * monthlyRate);
}

export function calculateSensitivityMatrix(inputs: PMICancellationInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Property value sensitivity
  const propertyValues = [inputs.currentPropertyValue * 0.95, inputs.currentPropertyValue, inputs.currentPropertyValue * 1.05];
  const propertyImpacts = propertyValues.map(value => {
    const testInputs = { ...inputs, currentPropertyValue: value };
    return calculateLtvGap(testInputs) - calculateLtvGap(inputs);
  });

  matrix.push({
    variable: 'Property Value',
    values: propertyValues,
    impacts: propertyImpacts
  });

  // PMI rate sensitivity
  const pmiRates = [inputs.pmiRate * 0.8, inputs.pmiRate, inputs.pmiRate * 1.2];
  const pmiImpacts = pmiRates.map(rate => {
    const testInputs = { ...inputs, pmiRate: rate, pmiMonthlyPayment: (rate / 100) * inputs.originalLoanAmount / 12 };
    return calculateMonthlyPMISavings(testInputs) - calculateMonthlyPMISavings(inputs);
  });

  matrix.push({
    variable: 'PMI Rate',
    values: pmiRates,
    impacts: pmiImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: PMICancellationInputs): Array<{
  scenario: string;
  probability: number;
  cancellationDate: string;
  savings: number;
  cost: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.5,
    cancellationDate: calculateAutomaticCancellationDate(inputs).toISOString().split('T')[0],
    savings: calculateTotalPaymentSavings(inputs),
    cost: calculateBreakEvenCost(inputs)
  });

  // Property appreciation scenario
  const appreciationInputs = { ...inputs, currentPropertyValue: inputs.currentPropertyValue * 1.1 };
  scenarios.push({
    scenario: '10% Appreciation',
    probability: 0.3,
    cancellationDate: calculateAutomaticCancellationDate(appreciationInputs).toISOString().split('T')[0],
    savings: calculateTotalPaymentSavings(appreciationInputs),
    cost: calculateBreakEvenCost(appreciationInputs)
  });

  // Property depreciation scenario
  const depreciationInputs = { ...inputs, currentPropertyValue: inputs.currentPropertyValue * 0.9 };
  scenarios.push({
    scenario: '10% Depreciation',
    probability: 0.2,
    cancellationDate: calculateAutomaticCancellationDate(depreciationInputs).toISOString().split('T')[0],
    savings: calculateTotalPaymentSavings(depreciationInputs),
    cost: calculateBreakEvenCost(depreciationInputs)
  });

  return scenarios;
}

export function calculateTimelineAnalysis(inputs: PMICancellationInputs): Array<{
  month: number;
  date: string;
  ltvRatio: number;
  pmiPayment: number;
  cumulativePMI: number;
  eligibility: boolean;
}> {
  const analysis = [];
  const startDate = new Date();
  let cumulativePMI = 0;
  let currentBalance = inputs.currentLoanBalance;
  const monthlyPrincipal = calculateMonthlyPrincipalPayment(inputs);
  const monthlyPMI = inputs.pmiMonthlyPayment;

  for (let month = 1; month <= 60; month++) { // 5 year projection
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + month);

    currentBalance -= monthlyPrincipal;
    cumulativePMI += monthlyPMI;

    const ltvRatio = inputs.currentPropertyValue > 0 ? (currentBalance / inputs.currentPropertyValue) * 100 : 0;
    const eligibility = ltvRatio <= inputs.ltvThreshold;

    analysis.push({
      month,
      date: currentDate.toISOString().split('T')[0],
      ltvRatio,
      pmiPayment: eligibility ? 0 : monthlyPMI,
      cumulativePMI,
      eligibility
    });

    if (eligibility) {
      break; // Stop when eligible
    }
  }

  return analysis;
}

export function calculateComparisonAnalysis(inputs: PMICancellationInputs): Array<{
  option: string;
  cancellationDate: string;
  totalCost: number;
  totalSavings: number;
  netBenefit: number;
}> {
  const analysis = [];

  // Automatic cancellation
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const automaticSavings = calculateTotalPaymentSavings(inputs);
  const automaticCost = 0; // No cost for automatic

  analysis.push({
    option: 'Automatic Cancellation',
    cancellationDate: automaticDate.toISOString().split('T')[0],
    totalCost: automaticCost,
    totalSavings: automaticSavings,
    netBenefit: automaticSavings - automaticCost
  });

  // Request cancellation
  const requestDate = calculateRequestCancellationDate(inputs);
  const requestSavings = calculateTotalPaymentSavings(inputs);
  const requestCost = inputs.appraisalRequired ? inputs.appraisalCost : 0;

  analysis.push({
    option: 'Request Cancellation',
    cancellationDate: requestDate.toISOString().split('T')[0],
    totalCost: requestCost,
    totalSavings: requestSavings,
    netBenefit: requestSavings - requestCost
  });

  // Continue PMI
  analysis.push({
    option: 'Continue PMI',
    cancellationDate: 'Never',
    totalCost: calculateRemainingPMICost(inputs),
    totalSavings: 0,
    netBenefit: -calculateRemainingPMICost(inputs)
  });

  return analysis;
}

export function calculateRiskScore(inputs: PMICancellationInputs): number {
  let score = 0;

  // LTV risk
  const ltvGap = calculateLtvGap(inputs);
  if (ltvGap > 10) score += 30;
  else if (ltvGap > 5) score += 15;

  // Market risk
  if (inputs.marketCondition === 'declining') score += 20;
  else if (inputs.marketCondition === 'hot') score += 10;

  // Payment history risk
  const onTimePayments = inputs.paymentHistory.filter(p => p.onTime).length;
  const totalPayments = inputs.paymentHistory.length;
  const paymentRatio = totalPayments > 0 ? onTimePayments / totalPayments : 1;

  if (paymentRatio < 0.95) score += 15;
  else if (paymentRatio < 0.98) score += 8;

  // Property age risk
  if (inputs.propertyAge > 30) score += 10;
  else if (inputs.propertyAge > 20) score += 5;

  return Math.min(100, score);
}

export function calculateProbabilityOfCancellation(inputs: PMICancellationInputs): number {
  const eligibility = calculatePMIEligibility(inputs);
  const riskScore = calculateRiskScore(inputs);
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);

  let probability = 50;

  // Eligibility factor
  if (eligibility) probability += 40;
  else if (monthsToCancellation < 12) probability += 20;
  else if (monthsToCancellation < 24) probability += 10;

  // Risk factor
  probability -= riskScore * 0.3;

  // Market factor
  if (inputs.marketCondition === 'growing') probability += 10;
  else if (inputs.marketCondition === 'hot') probability += 5;

  return Math.max(0, Math.min(100, probability));
}

export function calculateWorstCaseScenario(inputs: PMICancellationInputs): number {
  const worstInputs = {
    ...inputs,
    currentPropertyValue: inputs.currentPropertyValue * 0.9,
    appraisalCost: inputs.appraisalCost * 1.5
  };

  return calculateNetSavings(worstInputs);
}

export function calculateBestCaseScenario(inputs: PMICancellationInputs): number {
  const bestInputs = {
    ...inputs,
    currentPropertyValue: inputs.currentPropertyValue * 1.1,
    appraisalCost: inputs.appraisalCost * 0.8
  };

  return calculateNetSavings(bestInputs);
}

export function calculateMarketAnalysis(inputs: PMICancellationInputs): Array<{
  factor: string;
  impact: number;
  risk: string;
  opportunity: string;
}> {
  const analysis = [];

  // Property appreciation
  const appreciationImpact = inputs.propertyAppreciationRate;
  analysis.push({
    factor: 'Property Appreciation',
    impact: appreciationImpact,
    risk: appreciationImpact < 2 ? 'High' : 'Low',
    opportunity: appreciationImpact > 4 ? 'High' : 'Moderate'
  });

  // Market growth
  analysis.push({
    factor: 'Market Growth',
    impact: inputs.marketGrowthRate,
    risk: inputs.marketGrowthRate < 1 ? 'High' : 'Low',
    opportunity: inputs.marketGrowthRate > 3 ? 'High' : 'Moderate'
  });

  // Market condition
  const conditionImpact = inputs.marketCondition === 'hot' ? 8 : inputs.marketCondition === 'growing' ? 6 : 4;
  analysis.push({
    factor: 'Market Condition',
    impact: conditionImpact,
    risk: inputs.marketCondition === 'declining' ? 'High' : 'Low',
    opportunity: inputs.marketCondition === 'hot' ? 'High' : 'Moderate'
  });

  return analysis;
}

export function generatePMICancellationAnalysis(inputs: PMICancellationInputs, metrics: PMICancellationMetrics): PMICancellationAnalysis {
  const eligibility = calculatePMIEligibility(inputs);
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const netSavings = calculateNetSavings(inputs);

  let cancellationRating: 'Eligible Now' | 'Eligible Soon' | 'Not Yet Eligible' | 'Requires Action' | 'Not Eligible';
  if (eligibility) cancellationRating = 'Eligible Now';
  else if (monthsToCancellation <= 12) cancellationRating = 'Eligible Soon';
  else if (monthsToCancellation <= 24) cancellationRating = 'Not Yet Eligible';
  else if (monthsToCancellation <= 36) cancellationRating = 'Requires Action';
  else cancellationRating = 'Not Eligible';

  let savingsRating: 'High Savings' | 'Good Savings' | 'Moderate Savings' | 'Low Savings' | 'No Savings';
  if (netSavings > 10000) savingsRating = 'High Savings';
  else if (netSavings > 5000) savingsRating = 'Good Savings';
  else if (netSavings > 2000) savingsRating = 'Moderate Savings';
  else if (netSavings > 0) savingsRating = 'Low Savings';
  else savingsRating = 'No Savings';

  const recommendation = eligibility ? 'Cancel Now' :
                        monthsToCancellation <= 6 ? 'Request Cancellation' :
                        monthsToCancellation <= 12 ? 'Wait' : 'Requires Review';

  return {
    cancellationRating,
    savingsRating,
    recommendation,
    keyStrengths: [
      eligibility ? 'Eligible for PMI cancellation' : `Eligible in ${monthsToCancellation.toFixed(1)} months`,
      `Monthly savings: $${metrics.monthlyPMISavings.toLocaleString()}`,
      `Net savings: $${netSavings.toLocaleString()}`
    ],
    keyWeaknesses: [
      `Current LTV: ${metrics.currentLtvRatio.toFixed(1)}%`,
      `Required LTV: ${metrics.requiredLtvRatio.toFixed(1)}%`,
      `Risk score: ${metrics.riskScore}`
    ],
    eligibilityFactors: [
      'Loan-to-value ratio analysis',
      'Payment history review',
      'Property value assessment',
      'Time since loan origination'
    ],
    opportunities: [
      'Monthly payment reduction',
      'Long-term savings accumulation',
      'Cash flow improvement',
      'Equity preservation'
    ],
    cancellationSummary: `PMI cancellation analysis shows ${cancellationRating.toLowerCase()} with ${savingsRating.toLowerCase()} and ${recommendation.toLowerCase()} recommendation.`,
    eligibilityAnalysis: `Eligibility analysis indicates ${eligibility ? 'immediate eligibility' : `${monthsToCancellation.toFixed(1)} months until automatic eligibility`} with current LTV of ${metrics.currentLtvRatio.toFixed(1)}% and required LTV of ${metrics.requiredLtvRatio.toFixed(1)}%.`,
    timelineAnalysis: `Timeline analysis shows automatic cancellation in ${monthsToCancellation.toFixed(1)} months and request cancellation possible in ${metrics.monthsToRequestCancellation.toFixed(1)} months.`,
    costSummary: `Cost analysis indicates total PMI paid of $${metrics.totalPMIPaid.toLocaleString()} with remaining cost of $${metrics.remainingPMICost.toLocaleString()} and break-even in ${metrics.breakEvenMonths.toFixed(1)} months.`,
    savingsAnalysis: `Savings analysis shows monthly PMI savings of $${metrics.monthlyPMISavings.toLocaleString()} and total savings of $${metrics.pmiSavings.toLocaleString()}.`,
    breakEvenAnalysis: `Break-even analysis indicates ${metrics.breakEvenMonths.toFixed(1)} months to recover ${metrics.breakEvenCost.toLocaleString()} cancellation cost.`,
    equitySummary: `Equity analysis shows current equity of $${metrics.currentEquity.toLocaleString()} (${metrics.equityPercentage.toFixed(1)}% of property value) with required equity of $${metrics.equityRequired.toLocaleString()}.`,
    equityGrowthAnalysis: `Equity growth analysis indicates $${metrics.equityGrowth.toLocaleString()} equity accumulation since loan origination.`,
    ltvAnalysis: `LTV analysis shows current ratio of ${metrics.currentLtvRatio.toFixed(1)}% with gap of ${metrics.ltvGap.toFixed(1)}% to reach required ${metrics.requiredLtvRatio.toFixed(1)}% threshold.`,
    paymentSummary: `Payment analysis indicates current monthly payment of $${metrics.monthlyPayment.toLocaleString()} reducing to $${metrics.monthlyPaymentWithoutPMI.toLocaleString()} without PMI.`,
    reductionAnalysis: `Payment reduction analysis shows $${metrics.paymentReduction.toLocaleString()} monthly savings and $${metrics.totalPaymentSavings.toLocaleString()} total savings.`,
    cashFlowAnalysis: `Cash flow analysis indicates ${metrics.paymentReduction > 0 ? 'positive' : 'neutral'} impact with ${metrics.paymentReduction.toLocaleString()} monthly improvement.`,
    marketSummary: `Market analysis indicates ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate in ${inputs.marketLocation}.`,
    appreciationAnalysis: `Property appreciation analysis shows ${inputs.propertyAppreciationRate}% annual appreciation potential.`,
    comparableAnalysis: `Comparable analysis indicates ${inputs.comparableSales.length} comparable sales with average price of $${inputs.comparableSales.reduce((sum, comp) => sum + comp.salePrice, 0) / inputs.comparableSales.length}.`,
    riskAssessment: `Overall risk assessment of ${metrics.riskScore} with ${metrics.probabilityOfCancellation.toFixed(1)}% probability of successful cancellation.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions.`,
    appraisalRisk: `Appraisal risk assessment ${inputs.appraisalRequired ? 'requires' : 'does not require'} appraisal with ${inputs.appraisalCost.toLocaleString()} cost.`,
    timingRisk: `Timing risk assessment with ${monthsToCancellation.toFixed(1)} months until automatic eligibility.`,
    cancellationRecommendations: [
      eligibility ? 'Cancel PMI immediately to start saving' : `Wait ${monthsToCancellation.toFixed(1)} months for automatic cancellation`,
      inputs.appraisalRequired ? 'Consider appraisal for earlier cancellation' : 'No appraisal required for cancellation'
    ],
    optimizationSuggestions: [
      'Monitor property value changes',
      'Track payment history carefully',
      'Consider refinance if needed',
      'Plan for appraisal costs'
    ],
    riskMitigation: [
      'Regular LTV monitoring',
      'Payment history maintenance',
      'Market condition awareness',
      'Professional consultation'
    ],
    implementationPlan: `Implementation plan includes ${recommendation.toLowerCase()} with ${monthsToCancellation.toFixed(1)} month timeline.`,
    nextSteps: [
      eligibility ? 'Contact lender to cancel PMI' : 'Monitor equity growth progress',
      'Gather required documentation',
      inputs.appraisalRequired ? 'Schedule property appraisal' : 'Prepare cancellation request',
      'Verify cancellation with lender'
    ],
    timeline: `${inputs.analysisPeriod} month analysis period with ${monthsToCancellation.toFixed(1)} months until automatic cancellation.`,
    monitoringPlan: 'Monthly LTV monitoring and quarterly equity assessment.',
    keyMetrics: [
      'LTV ratio',
      'Equity percentage',
      'Monthly PMI payment',
      'Cancellation eligibility'
    ],
    reviewSchedule: 'Monthly eligibility check and quarterly comprehensive review.',
    riskManagement: `Risk management includes monitoring ${metrics.riskScore} risk score and ${metrics.probabilityOfCancellation.toFixed(1)}% cancellation probability.`,
    mitigationStrategies: [
      'LTV ratio monitoring',
      'Payment history maintenance',
      'Market condition tracking',
      'Professional advisor consultation'
    ],
    contingencyPlans: [
      'Appraisal cost coverage',
      'Extended timeline planning',
      'Alternative cancellation methods',
      'Refinance option preparation'
    ],
    performanceBenchmarks: [
      {
        metric: 'LTV Ratio',
        target: inputs.ltvThreshold,
        benchmark: metrics.currentLtvRatio,
        industry: 'Mortgage PMI'
      },
      {
        metric: 'Monthly Savings',
        target: inputs.pmiMonthlyPayment,
        benchmark: metrics.monthlyPMISavings,
        industry: 'Mortgage PMI'
      },
      {
        metric: 'Break-Even Period',
        target: 12,
        benchmark: metrics.breakEvenMonths,
        industry: 'Mortgage PMI'
      }
    ],
    decisionRecommendation: `${recommendation} with ${cancellationRating.toLowerCase()} and ${savingsRating.toLowerCase()}.`,
    presentationPoints: [
      `Eligibility: ${eligibility ? 'Eligible Now' : 'Not Yet Eligible'}`,
      `Monthly Savings: $${metrics.monthlyPMISavings.toLocaleString()}`,
      `Break-even: ${metrics.breakEvenMonths.toFixed(1)} months`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'LTV ratio analysis',
      'Eligibility determination',
      'Cost-benefit analysis',
      'Timeline consideration',
      'Risk assessment'
    ]
  };
}