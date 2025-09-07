import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceMetrics, PrivateMortgageInsuranceAnalysis } from './types';

export function calculateLoanToValueRatio(inputs: PrivateMortgageInsuranceInputs): number {
  return inputs.propertyValue > 0 ? (inputs.loanAmount / inputs.propertyValue) * 100 : 0;
}

export function calculateCurrentLtvRatio(inputs: PrivateMortgageInsuranceInputs): number {
  return inputs.propertyValue > 0 ? (inputs.currentPrincipalBalance / inputs.propertyValue) * 100 : 0;
}

export function calculateLtvGap(inputs: PrivateMortgageInsuranceInputs): number {
  const currentLtv = calculateCurrentLtvRatio(inputs);
  return inputs.ltvThreshold - currentLtv;
}

export function calculatePMIRequired(inputs: PrivateMortgageInsuranceInputs): boolean {
  const ltvRatio = calculateLoanToValueRatio(inputs);
  return ltvRatio > 80; // Standard PMI requirement threshold
}

export function calculatePMIMonthlyPayment(inputs: PrivateMortgageInsuranceInputs): number {
  if (!inputs.pmiRequired) return 0;

  const annualPMI = (inputs.pmiRate / 100) * inputs.loanAmount;
  return annualPMI / 12;
}

export function calculatePMIAnnualCost(inputs: PrivateMortgageInsuranceInputs): number {
  return calculatePMIMonthlyPayment(inputs) * 12;
}

export function calculatePMITotalCost(inputs: PrivateMortgageInsuranceInputs): number {
  const monthlyPayment = calculatePMIMonthlyPayment(inputs);
  return monthlyPayment * inputs.analysisPeriod * 12;
}

export function calculateEquityPosition(inputs: PrivateMortgageInsuranceInputs): number {
  return inputs.propertyValue - inputs.currentPrincipalBalance;
}

export function calculateEquityPercentage(inputs: PrivateMortgageInsuranceInputs): number {
  return inputs.propertyValue > 0 ? (calculateEquityPosition(inputs) / inputs.propertyValue) * 100 : 0;
}

export function calculateMonthlyPayment(inputs: PrivateMortgageInsuranceInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  const principalInterest = inputs.currentPrincipalBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

  return principalInterest + calculatePMIMonthlyPayment(inputs);
}

export function calculateMonthlyPaymentWithoutPMI(inputs: PrivateMortgageInsuranceInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  return inputs.currentPrincipalBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculatePaymentIncrease(inputs: PrivateMortgageInsuranceInputs): number {
  return calculateMonthlyPayment(inputs) - calculateMonthlyPaymentWithoutPMI(inputs);
}

export function calculatePaymentIncreasePercentage(inputs: PrivateMortgageInsuranceInputs): number {
  const basePayment = calculateMonthlyPaymentWithoutPMI(inputs);
  return basePayment > 0 ? (calculatePaymentIncrease(inputs) / basePayment) * 100 : 0;
}

export function calculateTotalPMICost(inputs: PrivateMortgageInsuranceInputs): number {
  return calculatePMITotalCost(inputs);
}

export function calculatePMISavings(inputs: PrivateMortgageInsuranceInputs): number {
  if (calculateCancellationEligibility(inputs)) {
    return calculatePMITotalCost(inputs);
  }
  return 0;
}

export function calculateEffectiveInterestRate(inputs: PrivateMortgageInsuranceInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const annualPayment = monthlyPayment * 12;
  const annualCost = annualPayment / inputs.loanAmount;

  return annualCost * 100;
}

export function calculateTotalLoanCost(inputs: PrivateMortgageInsuranceInputs): number {
  const principalInterestCost = calculateMonthlyPaymentWithoutPMI(inputs) * inputs.loanTerm * 12;
  const pmiCost = calculatePMITotalCost(inputs);

  return principalInterestCost + pmiCost;
}

export function calculateAutomaticCancellationDate(inputs: PrivateMortgageInsuranceInputs): Date {
  const targetEquity = inputs.loanAmount * (1 - inputs.ltvThreshold / 100);
  const currentEquity = calculateEquityPosition(inputs);
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

export function calculateRequestCancellationDate(inputs: PrivateMortgageInsuranceInputs): Date {
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const requestDate = new Date(automaticDate);
  requestDate.setMonth(requestDate.getMonth() - 2); // 2 months earlier typically
  return requestDate;
}

export function calculateMonthsToAutomaticCancellation(inputs: PrivateMortgageInsuranceInputs): number {
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const currentDate = new Date();
  return Math.max(0, (automaticDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export function calculateMonthsToRequestCancellation(inputs: PrivateMortgageInsuranceInputs): number {
  const requestDate = calculateRequestCancellationDate(inputs);
  const currentDate = new Date();
  return Math.max(0, (requestDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export function calculateCancellationEligibility(inputs: PrivateMortgageInsuranceInputs): boolean {
  const currentLtv = calculateCurrentLtvRatio(inputs);
  return currentLtv <= inputs.ltvThreshold;
}

export function calculateMonthlyPrincipalPayment(inputs: PrivateMortgageInsuranceInputs): number {
  const monthlyPayment = calculateMonthlyPaymentWithoutPMI(inputs);
  const monthlyRate = inputs.interestRate / 100 / 12;

  return monthlyPayment - (inputs.currentPrincipalBalance * monthlyRate);
}

export function calculateBreakEvenPoint(inputs: PrivateMortgageInsuranceInputs): number {
  const monthlySavings = calculatePMIMonthlyPayment(inputs);
  return monthlySavings > 0 ? 500 / monthlySavings : Infinity; // Assume $500 appraisal cost
}

export function calculateBreakEvenMonths(inputs: PrivateMortgageInsuranceInputs): number {
  return calculateBreakEvenPoint(inputs);
}

export function calculateBreakEvenCost(inputs: PrivateMortgageInsuranceInputs): number {
  return 500; // Assume $500 appraisal cost
}

export function calculateNetSavings(inputs: PrivateMortgageInsuranceInputs): number {
  const totalSavings = calculatePMISavings(inputs);
  const breakEvenCost = calculateBreakEvenCost(inputs);
  return totalSavings - breakEvenCost;
}

export function calculateTimelineAnalysis(inputs: PrivateMortgageInsuranceInputs): Array<{
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
  let currentBalance = inputs.currentPrincipalBalance;
  const monthlyPrincipal = calculateMonthlyPrincipalPayment(inputs);
  const monthlyPMI = calculatePMIMonthlyPayment(inputs);

  for (let month = 1; month <= 60; month++) { // 5 year projection
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + month);

    currentBalance -= monthlyPrincipal;
    cumulativePMI += monthlyPMI;

    const ltvRatio = inputs.propertyValue > 0 ? (currentBalance / inputs.propertyValue) * 100 : 0;
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

export function calculateSensitivityMatrix(inputs: PrivateMortgageInsuranceInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // PMI rate sensitivity
  const pmiRates = [inputs.pmiRate * 0.8, inputs.pmiRate, inputs.pmiRate * 1.2];
  const pmiImpacts = pmiRates.map(rate => {
    const testInputs = { ...inputs, pmiRate: rate };
    return calculatePMIMonthlyPayment(testInputs) - calculatePMIMonthlyPayment(inputs);
  });

  matrix.push({
    variable: 'PMI Rate',
    values: pmiRates,
    impacts: pmiImpacts
  });

  // Property value sensitivity
  const propertyValues = [inputs.propertyValue * 0.95, inputs.propertyValue, inputs.propertyValue * 1.05];
  const propertyImpacts = propertyValues.map(value => {
    const testInputs = { ...inputs, propertyValue: value };
    return calculateCurrentLtvRatio(testInputs) - calculateCurrentLtvRatio(inputs);
  });

  matrix.push({
    variable: 'Property Value',
    values: propertyValues,
    impacts: propertyImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: PrivateMortgageInsuranceInputs): Array<{
  scenario: string;
  probability: number;
  pmiCost: number;
  cancellationDate: string;
  savings: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.5,
    pmiCost: calculatePMITotalCost(inputs),
    cancellationDate: calculateAutomaticCancellationDate(inputs).toISOString().split('T')[0],
    savings: calculatePMISavings(inputs)
  });

  // Early cancellation scenario
  const earlyInputs = { ...inputs, ltvThreshold: inputs.ltvThreshold + 5 };
  scenarios.push({
    scenario: 'Early Cancellation',
    probability: 0.3,
    pmiCost: calculatePMITotalCost(earlyInputs),
    cancellationDate: calculateAutomaticCancellationDate(earlyInputs).toISOString().split('T')[0],
    savings: calculatePMISavings(earlyInputs)
  });

  // Delayed cancellation scenario
  const delayedInputs = { ...inputs, ltvThreshold: inputs.ltvThreshold - 5 };
  scenarios.push({
    scenario: 'Delayed Cancellation',
    probability: 0.2,
    pmiCost: calculatePMITotalCost(delayedInputs),
    cancellationDate: calculateAutomaticCancellationDate(delayedInputs).toISOString().split('T')[0],
    savings: calculatePMISavings(delayedInputs)
  });

  return scenarios;
}

export function calculateComparisonAnalysis(inputs: PrivateMortgageInsuranceInputs): Array<{
  option: string;
  pmiCost: number;
  totalCost: number;
  cancellationDate: string;
  savings: number;
}> {
  const analysis = [];

  // Automatic cancellation
  const automaticDate = calculateAutomaticCancellationDate(inputs);
  const automaticCost = 0; // No additional cost
  const automaticSavings = calculatePMISavings(inputs);

  analysis.push({
    option: 'Automatic Cancellation',
    pmiCost: calculatePMITotalCost(inputs),
    totalCost: automaticCost,
    cancellationDate: automaticDate.toISOString().split('T')[0],
    savings: automaticSavings
  });

  // Request cancellation
  const requestDate = calculateRequestCancellationDate(inputs);
  const requestCost = 500; // Assume $500 appraisal cost
  const requestSavings = calculatePMISavings(inputs);

  analysis.push({
    option: 'Request Cancellation',
    pmiCost: calculatePMITotalCost(inputs),
    totalCost: requestCost,
    cancellationDate: requestDate.toISOString().split('T')[0],
    savings: requestSavings
  });

  // Continue PMI
  analysis.push({
    option: 'Continue PMI',
    pmiCost: calculatePMITotalCost(inputs),
    totalCost: calculatePMITotalCost(inputs),
    cancellationDate: 'Never',
    savings: 0
  });

  return analysis;
}

export function calculateRiskScore(inputs: PrivateMortgageInsuranceInputs): number {
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

  // PMI rate risk
  if (inputs.pmiRate > 1.0) score += 10;
  else if (inputs.pmiRate > 0.8) score += 5;

  return Math.min(100, score);
}

export function calculateProbabilityOfCancellation(inputs: PrivateMortgageInsuranceInputs): number {
  const eligibility = calculateCancellationEligibility(inputs);
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
  if (inputs.marketCondition === 'growing') probability += 15;
  else if (inputs.marketCondition === 'hot') probability += 10;

  return Math.max(0, Math.min(100, probability));
}

export function calculateWorstCaseScenario(inputs: PrivateMortgageInsuranceInputs): number {
  const worstInputs = {
    ...inputs,
    propertyValue: inputs.propertyValue * 0.9,
    pmiRate: inputs.pmiRate * 1.5
  };

  return calculateNetSavings(worstInputs);
}

export function calculateBestCaseScenario(inputs: PrivateMortgageInsuranceInputs): number {
  const bestInputs = {
    ...inputs,
    propertyValue: inputs.propertyValue * 1.1,
    pmiRate: inputs.pmiRate * 0.7
  };

  return calculateNetSavings(bestInputs);
}

export function calculateTaxDeduction(inputs: PrivateMortgageInsuranceInputs): number {
  const annualPMI = calculatePMIAnnualCost(inputs);
  return annualPMI * (inputs.borrowerTaxRate / 100);
}

export function calculateAfterTaxCost(inputs: PrivateMortgageInsuranceInputs): number {
  const totalCost = calculateTotalLoanCost(inputs);
  const taxDeduction = calculateTaxDeduction(inputs);

  return totalCost - taxDeduction;
}

export function calculateTaxBenefit(inputs: PrivateMortgageInsuranceInputs): number {
  return calculateTaxDeduction(inputs);
}

export function calculateMarketAnalysis(inputs: PrivateMortgageInsuranceInputs): Array<{
  factor: string;
  impact: number;
  risk: string;
  opportunity: string;
}> {
  const analysis = [];

  // Property appreciation
  analysis.push({
    factor: 'Property Appreciation',
    impact: inputs.propertyAppreciationRate,
    risk: inputs.propertyAppreciationRate < 2 ? 'High' : 'Low',
    opportunity: inputs.propertyAppreciationRate > 4 ? 'High' : 'Moderate'
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

export function generatePrivateMortgageInsuranceAnalysis(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): PrivateMortgageInsuranceAnalysis {
  const pmiRequired = calculatePMIRequired(inputs);
  const eligibility = calculateCancellationEligibility(inputs);
  const monthsToCancellation = calculateMonthsToAutomaticCancellation(inputs);
  const netSavings = calculateNetSavings(inputs);

  let pmiRating: 'Required' | 'Not Required' | 'Eligible for Cancellation' | 'Consider Refinance' | 'Requires Review';
  if (pmiRequired && eligibility) pmiRating = 'Eligible for Cancellation';
  else if (pmiRequired && !eligibility) pmiRating = 'Required';
  else if (!pmiRequired) pmiRating = 'Not Required';
  else if (monthsToCancellation > 36) pmiRating = 'Consider Refinance';
  else pmiRating = 'Requires Review';

  let costRating: 'High Cost' | 'Moderate Cost' | 'Low Cost' | 'No Cost';
  if (metrics.pmiAnnualCost > 2000) costRating = 'High Cost';
  else if (metrics.pmiAnnualCost > 1000) costRating = 'Moderate Cost';
  else if (metrics.pmiAnnualCost > 0) costRating = 'Low Cost';
  else costRating = 'No Cost';

  const recommendation = eligibility ? 'Cancel PMI' :
                        monthsToCancellation <= 12 ? 'Keep PMI' :
                        monthsToCancellation <= 24 ? 'Refinance' : 'Requires Review';

  return {
    pmiRating,
    costRating,
    recommendation,
    keyStrengths: [
      eligibility ? 'Eligible for PMI cancellation' : `Cancellation in ${monthsToCancellation.toFixed(1)} months`,
      `Monthly PMI cost: $${metrics.pmiMonthlyPayment.toFixed(2)}`,
      `Potential savings: $${netSavings.toLocaleString()}`
    ],
    keyWeaknesses: [
      `Current LTV: ${metrics.currentLtvRatio.toFixed(1)}%`,
      `Risk score: ${metrics.riskScore}`,
      `Break-even: ${metrics.breakEvenMonths.toFixed(1)} months`
    ],
    costFactors: [
      'PMI rate analysis',
      'Loan-to-value ratio',
      'Cancellation eligibility',
      'Break-even analysis'
    ],
    opportunities: [
      'PMI cancellation savings',
      'Equity build-up acceleration',
      'Cash flow improvement',
      'Tax deduction benefits'
    ],
    pmiSummary: `PMI analysis shows ${pmiRating.toLowerCase()} with ${costRating.toLowerCase()} and ${recommendation.toLowerCase()} recommendation.`,
    costAnalysis: `Cost analysis indicates annual PMI cost of $${metrics.pmiAnnualCost.toFixed(2)} with total cost of $${metrics.totalPMICost.toLocaleString()} over ${inputs.analysisPeriod} years.`,
    requirementAnalysis: `Requirement analysis shows PMI ${pmiRequired ? 'required' : 'not required'} with current LTV of ${metrics.currentLtvRatio.toFixed(1)}% and threshold of ${inputs.ltvThreshold}%.`,
    cancellationSummary: `Cancellation analysis indicates ${eligibility ? 'immediate eligibility' : `${monthsToCancellation.toFixed(1)} months until automatic eligibility`} with ${metrics.probabilityOfCancellation.toFixed(1)}% probability of successful cancellation.`,
    eligibilityAnalysis: `Eligibility analysis shows ${eligibility ? 'current eligibility' : 'not yet eligible'} for PMI cancellation with LTV gap of ${metrics.ltvGap.toFixed(1)}%.`,
    timelineAnalysis: `Timeline analysis projects automatic cancellation in ${monthsToCancellation.toFixed(1)} months and request cancellation possible in ${metrics.monthsToRequestCancellation.toFixed(1)} months.`,
    costSummary: `Cost summary shows monthly payment increase of $${metrics.paymentIncrease.toFixed(2)} (${metrics.paymentIncreasePercentage.toFixed(1)}%) due to PMI.`,
    savingsAnalysis: `Savings analysis indicates potential savings of $${metrics.pmiSavings.toLocaleString()} with net savings of $${netSavings.toLocaleString()} after costs.`,
    breakEvenAnalysis: `Break-even analysis shows ${metrics.breakEvenMonths.toFixed(1)} months to recover $${metrics.breakEvenCost.toLocaleString()} cancellation cost.`,
    paymentSummary: `Payment analysis indicates current monthly payment of $${metrics.monthlyPayment.toFixed(2)} vs. $${metrics.monthlyPaymentWithoutPMI.toFixed(2)} without PMI.`,
    impactAnalysis: `Impact analysis shows payment increase of $${metrics.paymentIncrease.toFixed(2)} (${metrics.paymentIncreasePercentage.toFixed(1)}%) due to PMI.`,
    cashFlowAnalysis: `Cash flow analysis indicates ${metrics.paymentIncrease > 0 ? 'negative' : 'neutral'} impact on monthly cash flow.`,
    equitySummary: `Equity analysis shows current equity of $${metrics.equityPosition.toLocaleString()} (${metrics.equityPercentage.toFixed(1)}% of property value).`,
    equityGrowthAnalysis: `Equity growth analysis indicates equity will reach required threshold in ${monthsToCancellation.toFixed(1)} months.`,
    ltvAnalysis: `LTV analysis shows current ratio of ${metrics.currentLtvRatio.toFixed(1)}% with gap of ${metrics.ltvGap.toFixed(1)}% to reach required ${inputs.ltvThreshold}%.`,
    riskAssessment: `Overall risk assessment of ${metrics.riskScore} with ${metrics.probabilityOfCancellation.toFixed(1)}% probability of cancellation.`,
    cancellationRisk: `Cancellation risk assessment based on ${metrics.riskScore} risk score and ${metrics.probabilityOfCancellation.toFixed(1)}% success probability.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions and ${inputs.marketGrowthRate}% growth rate.`,
    timingRisk: `Timing risk assessment with ${monthsToCancellation.toFixed(1)} months until automatic eligibility.`,
    marketAnalysis: `Market analysis indicates ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate in ${inputs.marketLocation}.`,
    appreciationAnalysis: `Property appreciation analysis shows ${inputs.propertyAppreciationRate}% annual appreciation potential.`,
    competitiveAnalysis: `Competitive analysis indicates market PMI rates averaging ${inputs.pmiRate * 0.9}% to ${inputs.pmiRate * 1.1}%.`,
    taxSummary: `Tax analysis indicates PMI deduction of $${metrics.taxDeduction.toFixed(2)} annually with ${inputs.borrowerTaxRate}% tax rate.`,
    deductionAnalysis: `Tax deduction analysis shows $${metrics.taxDeduction.toFixed(2)} annual benefit from PMI payments.`,
    benefitAnalysis: `Tax benefit analysis indicates $${metrics.taxBenefit.toFixed(2)} total tax advantage from PMI deductibility.`,
    pmiRecommendations: [
      eligibility ? 'Cancel PMI immediately to eliminate monthly cost' : `Monitor equity growth for ${monthsToCancellation.toFixed(1)} months until eligible`,
      inputs.pmiCancellationMethod === 'automatic' ? 'Wait for automatic cancellation' : 'Consider requesting early cancellation'
    ],
    cancellationRecommendations: [
      eligibility ? 'Contact lender to initiate PMI cancellation' : 'Continue building equity through loan payments',
      'Factor appraisal cost into cancellation decision'
    ],
    optimizationSuggestions: [
      'Make extra principal payments to accelerate eligibility',
      'Monitor property value changes',
      'Review PMI rate annually',
      'Consider refinance if cancellation delayed'
    ],
    implementationPlan: `Implementation plan includes ${recommendation.toLowerCase()} with ${monthsToCancellation.toFixed(1)} month timeline.`,
    nextSteps: [
      eligibility ? 'Gather required documentation for cancellation' : 'Calculate timeline to eligibility',
      'Contact lender about cancellation process',
      'Prepare cancellation request',
      'Verify cancellation with lender'
    ],
    timeline: `${inputs.analysisPeriod} month analysis period with ${monthsToCancellation.toFixed(1)} months until PMI cancellation eligibility.`,
    monitoringPlan: 'Monthly LTV monitoring and quarterly PMI cost review.',
    keyMetrics: [
      'LTV ratio',
      'PMI monthly payment',
      'Cancellation eligibility',
      'Equity percentage'
    ],
    reviewSchedule: 'Monthly eligibility check and quarterly comprehensive review.',
    riskManagement: `Risk management includes monitoring ${metrics.riskScore} risk score and ${metrics.probabilityOfCancellation.toFixed(1)}% cancellation probability.`,
    mitigationStrategies: [
      'LTV ratio monitoring',
      'Equity build-up tracking',
      'Market condition assessment',
      'Payment history maintenance'
    ],
    contingencyPlans: [
      'Extended PMI period planning',
      'Refinance option preparation',
      'Extra payment strategies',
      'Market downturn response'
    ],
    performanceBenchmarks: [
      {
        metric: 'LTV Ratio',
        target: inputs.ltvThreshold,
        benchmark: metrics.currentLtvRatio,
        industry: 'Mortgage PMI'
      },
      {
        metric: 'PMI Cost',
        target: 1000,
        benchmark: metrics.pmiAnnualCost,
        industry: 'Mortgage PMI'
      },
      {
        metric: 'Risk Score',
        target: 30,
        benchmark: metrics.riskScore,
        industry: 'Mortgage PMI'
      }
    ],
    decisionRecommendation: `${recommendation} with ${pmiRating.toLowerCase()} and ${costRating.toLowerCase()}.`,
    presentationPoints: [
      `PMI Required: ${pmiRequired ? 'Yes' : 'No'}`,
      `Monthly Cost: $${metrics.pmiMonthlyPayment.toFixed(2)}`,
      `Cancellation Eligible: ${eligibility ? 'Yes' : 'No'}`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'PMI requirement analysis',
      'Cancellation eligibility determination',
      'Cost-benefit analysis',
      'Timeline consideration',
      'Risk assessment'
    ]
  };
}