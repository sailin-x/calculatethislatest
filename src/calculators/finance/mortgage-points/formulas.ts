import { MortgagePointsInputs, MortgagePointsMetrics, MortgagePointsAnalysis } from './types';

export function calculateTotalPoints(inputs: MortgagePointsInputs): number {
  return inputs.discountPoints + inputs.originationPoints;
}

export function calculateTotalPointCost(inputs: MortgagePointsInputs): number {
  return calculateTotalPoints(inputs) * inputs.pointCost;
}

export function calculatePointValue(inputs: MortgagePointsInputs): number {
  // Each point typically reduces the interest rate by 0.25%
  return inputs.discountPoints * 0.25;
}

export function calculateEffectiveRate(inputs: MortgagePointsInputs): number {
  return inputs.baseInterestRate - calculatePointValue(inputs);
}

export function calculateMonthlyPayment(inputs: MortgagePointsInputs): number {
  const effectiveRate = calculateEffectiveRate(inputs);
  const monthlyRate = effectiveRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  return inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateMonthlyPaymentWithoutPoints(inputs: MortgagePointsInputs): number {
  const monthlyRate = inputs.baseInterestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  return inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateMonthlyPaymentSavings(inputs: MortgagePointsInputs): number {
  const withPoints = calculateMonthlyPayment(inputs);
  const withoutPoints = calculateMonthlyPaymentWithoutPoints(inputs);
  return withoutPoints - withPoints;
}

export function calculateAnnualPaymentSavings(inputs: MortgagePointsInputs): number {
  return calculateMonthlyPaymentSavings(inputs) * 12;
}

export function calculateTotalPaymentSavings(inputs: MortgagePointsInputs): number {
  return calculateAnnualPaymentSavings(inputs) * inputs.loanTerm;
}

export function calculateTotalInterestPaid(inputs: MortgagePointsInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  return (monthlyPayment * inputs.loanTerm * 12) - inputs.loanAmount;
}

export function calculateTotalInterestPaidWithoutPoints(inputs: MortgagePointsInputs): number {
  const monthlyPayment = calculateMonthlyPaymentWithoutPoints(inputs);
  return (monthlyPayment * inputs.loanTerm * 12) - inputs.loanAmount;
}

export function calculateInterestSavings(inputs: MortgagePointsInputs): number {
  const withPoints = calculateTotalInterestPaid(inputs);
  const withoutPoints = calculateTotalInterestPaidWithoutPoints(inputs);
  return withoutPoints - withPoints;
}

export function calculateInterestSavingsPercentage(inputs: MortgagePointsInputs): number {
  const savings = calculateInterestSavings(inputs);
  const withoutPoints = calculateTotalInterestPaidWithoutPoints(inputs);
  return (savings / withoutPoints) * 100;
}

export function calculateTotalCost(inputs: MortgagePointsInputs): number {
  const pointCost = calculateTotalPointCost(inputs);
  const totalPayments = calculateMonthlyPayment(inputs) * inputs.loanTerm * 12;
  return pointCost + totalPayments;
}

export function calculateNetSavings(inputs: MortgagePointsInputs): number {
  const totalSavings = calculateTotalPaymentSavings(inputs);
  const pointCost = calculateTotalPointCost(inputs);
  return totalSavings - pointCost;
}

export function calculateBreakEvenPoint(inputs: MortgagePointsInputs): number {
  const monthlySavings = calculateMonthlyPaymentSavings(inputs);
  const pointCost = calculateTotalPointCost(inputs);
  return pointCost / monthlySavings;
}

export function calculateBreakEvenMonths(inputs: MortgagePointsInputs): number {
  return Math.ceil(calculateBreakEvenPoint(inputs));
}

export function calculateBreakEvenYears(inputs: MortgagePointsInputs): number {
  return calculateBreakEvenMonths(inputs) / 12;
}

export function calculateTaxDeduction(inputs: MortgagePointsInputs): number {
  const pointCost = calculateTotalPointCost(inputs);
  return pointCost * (inputs.borrowerTaxRate / 100);
}

export function calculateAfterTaxCost(inputs: MortgagePointsInputs): number {
  const pointCost = calculateTotalPointCost(inputs);
  const taxDeduction = calculateTaxDeduction(inputs);
  return pointCost - taxDeduction;
}

export function calculateAfterTaxSavings(inputs: MortgagePointsInputs): number {
  const netSavings = calculateNetSavings(inputs);
  const taxDeduction = calculateTaxDeduction(inputs);
  return netSavings + taxDeduction;
}

export function calculateEffectiveTaxRate(inputs: MortgagePointsInputs): number {
  return inputs.borrowerTaxRate;
}

export function calculateReturnOnInvestment(inputs: MortgagePointsInputs): number {
  const netSavings = calculateNetSavings(inputs);
  const pointCost = calculateTotalPointCost(inputs);
  return (netSavings / pointCost) * 100;
}

export function calculatePaybackPeriod(inputs: MortgagePointsInputs): number {
  return calculateBreakEvenPoint(inputs);
}

export function calculateNetPresentValue(inputs: MortgagePointsInputs): number {
  const monthlySavings = calculateMonthlyPaymentSavings(inputs);
  const discountRate = inputs.discountRate / 100 / 12;
  const pointCost = calculateTotalPointCost(inputs);
  let npv = -pointCost;

  for (let month = 1; month <= inputs.loanTerm * 12; month++) {
    npv += monthlySavings / Math.pow(1 + discountRate, month);
  }

  return npv;
}

export function calculateInternalRateOfReturn(inputs: MortgagePointsInputs): number {
  // Simplified IRR calculation
  const monthlySavings = calculateMonthlyPaymentSavings(inputs);
  const pointCost = calculateTotalPointCost(inputs);

  // Approximate IRR using the formula: IRR ≈ (Monthly Savings / Point Cost) * 12
  return (monthlySavings / pointCost) * 12 * 100;
}

export function calculateComparisonAnalysis(inputs: MortgagePointsInputs): Array<{
  scenario: string;
  points: number;
  rate: number;
  payment: number;
  totalInterest: number;
  totalCost: number;
  netSavings: number;
  breakEvenMonths: number;
}> {
  const analysis = [];

  // No points scenario
  analysis.push({
    scenario: 'No Points',
    points: 0,
    rate: inputs.baseInterestRate,
    payment: calculateMonthlyPaymentWithoutPoints(inputs),
    totalInterest: calculateTotalInterestPaidWithoutPoints(inputs),
    totalCost: calculateTotalInterestPaidWithoutPoints(inputs) + inputs.loanAmount,
    netSavings: 0,
    breakEvenMonths: 0
  });

  // Current points scenario
  analysis.push({
    scenario: 'With Points',
    points: calculateTotalPoints(inputs),
    rate: calculateEffectiveRate(inputs),
    payment: calculateMonthlyPayment(inputs),
    totalInterest: calculateTotalInterestPaid(inputs),
    totalCost: calculateTotalCost(inputs),
    netSavings: calculateNetSavings(inputs),
    breakEvenMonths: calculateBreakEvenMonths(inputs)
  });

  return analysis;
}

export function calculateSensitivityMatrix(inputs: MortgagePointsInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];
  const baseNPV = calculateNetPresentValue(inputs);

  // Interest rate sensitivity
  const rateValues = [inputs.baseInterestRate - 0.5, inputs.baseInterestRate, inputs.baseInterestRate + 0.5];
  const rateImpacts = rateValues.map(rate => {
    const testInputs = { ...inputs, baseInterestRate: rate };
    return calculateNetPresentValue(testInputs) - baseNPV;
  });

  matrix.push({
    variable: 'Interest Rate',
    values: rateValues,
    impacts: rateImpacts
  });

  // Point cost sensitivity
  const costValues = [inputs.pointCost * 0.8, inputs.pointCost, inputs.pointCost * 1.2];
  const costImpacts = costValues.map(cost => {
    const testInputs = { ...inputs, pointCost: cost };
    return calculateNetPresentValue(testInputs) - baseNPV;
  });

  matrix.push({
    variable: 'Point Cost',
    values: costValues,
    impacts: costImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: MortgagePointsInputs): Array<{
  scenario: string;
  probability: number;
  points: number;
  rate: number;
  savings: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.6,
    points: calculateTotalPoints(inputs),
    rate: calculateEffectiveRate(inputs),
    savings: calculateNetSavings(inputs)
  });

  // Rate increase scenario
  const rateIncreaseInputs = { ...inputs, baseInterestRate: inputs.baseInterestRate + 0.25 };
  scenarios.push({
    scenario: 'Rate +0.25%',
    probability: 0.2,
    points: calculateTotalPoints(rateIncreaseInputs),
    rate: calculateEffectiveRate(rateIncreaseInputs),
    savings: calculateNetSavings(rateIncreaseInputs)
  });

  // Rate decrease scenario
  const rateDecreaseInputs = { ...inputs, baseInterestRate: Math.max(0, inputs.baseInterestRate - 0.25) };
  scenarios.push({
    scenario: 'Rate -0.25%',
    probability: 0.2,
    points: calculateTotalPoints(rateDecreaseInputs),
    rate: calculateEffectiveRate(rateDecreaseInputs),
    savings: calculateNetSavings(rateDecreaseInputs)
  });

  return scenarios;
}

export function calculateAmortizationComparison(inputs: MortgagePointsInputs): Array<{
  paymentNumber: number;
  date: string;
  noPointsPayment: number;
  withPointsPayment: number;
  savings: number;
  cumulativeSavings: number;
}> {
  const comparison = [];
  const withPointsPayment = calculateMonthlyPayment(inputs);
  const noPointsPayment = calculateMonthlyPaymentWithoutPoints(inputs);
  const monthlySavings = noPointsPayment - withPointsPayment;
  let cumulativeSavings = 0;

  for (let i = 1; i <= Math.min(12, inputs.loanTerm * 12); i++) { // First year only for brevity
    cumulativeSavings += monthlySavings;
    const paymentDate = new Date('2024-01-01');
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);

    comparison.push({
      paymentNumber: i,
      date: paymentDate.toISOString().split('T')[0],
      noPointsPayment,
      withPointsPayment,
      savings: monthlySavings,
      cumulativeSavings
    });
  }

  return comparison;
}

export function calculateRiskScore(inputs: MortgagePointsInputs): number {
  let score = 0;

  // Break-even risk
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  if (breakEvenMonths > inputs.loanTerm * 12) score += 50;
  else if (breakEvenMonths > inputs.loanTerm * 6) score += 25;

  // Market condition risk
  if (inputs.marketCondition === 'declining') score += 20;
  else if (inputs.marketCondition === 'hot') score += 10;

  // Borrower plans risk
  if (inputs.analysisPeriod < inputs.loanTerm * 12) score += 15;

  return Math.min(100, score);
}

export function calculateProbabilityOfBenefit(inputs: MortgagePointsInputs): number {
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const totalMonths = inputs.loanTerm * 12;

  if (breakEvenMonths >= totalMonths) return 0;
  if (breakEvenMonths <= totalMonths * 0.5) return 0.9;
  if (breakEvenMonths <= totalMonths * 0.75) return 0.7;

  return 0.5;
}

export function calculateWorstCaseScenario(inputs: MortgagePointsInputs): number {
  // If they sell/move before break-even
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  return -calculateTotalPointCost(inputs) + (calculateMonthlyPaymentSavings(inputs) * breakEvenMonths);
}

export function calculateBestCaseScenario(inputs: MortgagePointsInputs): number {
  return calculateNetSavings(inputs);
}

export function generateMortgagePointsAnalysis(inputs: MortgagePointsInputs, metrics: MortgagePointsMetrics): MortgagePointsAnalysis {
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const roi = calculateReturnOnInvestment(inputs);
  const riskScore = calculateRiskScore(inputs);

  let pointsRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (roi > 20) pointsRating = 'Excellent';
  else if (roi > 10) pointsRating = 'Good';
  else if (roi > 0) pointsRating = 'Average';
  else if (roi > -10) pointsRating = 'Poor';
  else pointsRating = 'Very Poor';

  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  if (roi > 15) valueRating = 'High Value';
  else if (roi > 5) valueRating = 'Good Value';
  else if (roi > -5) valueRating = 'Moderate Value';
  else if (roi > -15) valueRating = 'Low Value';
  else valueRating = 'No Value';

  const recommendation = roi > 5 ? 'Buy Points' : roi > -5 ? 'Consider Points' : 'Don\'t Buy Points';

  return {
    pointsRating,
    valueRating,
    recommendation,
    keyStrengths: [
      `$${metrics.monthlyPaymentSavings.toLocaleString()} monthly savings`,
      `${breakEvenMonths} month break-even period`,
      `${roi.toFixed(1)}% return on investment`
    ],
    keyWeaknesses: [
      riskScore > 50 ? 'High risk due to long break-even period' : 'Acceptable risk profile',
      breakEvenMonths > inputs.loanTerm * 12 ? 'May not break even before loan ends' : 'Reasonable break-even timeline'
    ],
    valueFactors: [
      `Interest rate reduction: ${calculatePointValue(inputs).toFixed(2)}%`,
      `Tax deduction: $${calculateTaxDeduction(inputs).toLocaleString()}`,
      `Total savings: $${metrics.netSavings.toLocaleString()}`
    ],
    opportunities: [
      'Long-term interest savings',
      'Tax benefits from point deduction',
      'Potential for loan refinance'
    ],
    pointsSummary: `Purchasing ${calculateTotalPoints(inputs)} points reduces the interest rate by ${calculatePointValue(inputs).toFixed(2)}% for a total cost of $${calculateTotalPointCost(inputs).toLocaleString()}.`,
    costAnalysis: `Point cost of $${calculateTotalPointCost(inputs).toLocaleString()} with after-tax cost of $${calculateAfterTaxCost(inputs).toLocaleString()} after $${calculateTaxDeduction(inputs).toLocaleString()} tax deduction.`,
    savingsAnalysis: `Monthly savings of $${metrics.monthlyPaymentSavings.toLocaleString()} leading to total savings of $${metrics.netSavings.toLocaleString()} over ${inputs.loanTerm} years.`,
    breakEvenSummary: `Points break even in ${breakEvenMonths} months (${calculateBreakEvenYears(inputs).toFixed(1)} years) with ${calculateProbabilityOfBenefit(inputs) * 100}% probability of benefit.`,
    timelineAnalysis: `Break-even occurs at ${breakEvenMonths} months with ${calculateProbabilityOfBenefit(inputs) * 100}% likelihood of realizing savings.`,
    riskAnalysis: `Risk score of ${riskScore} indicates ${riskScore < 30 ? 'low' : riskScore < 60 ? 'moderate' : 'high'} risk profile.`,
    taxSummary: `Points are tax deductible, reducing the after-tax cost to $${calculateAfterTaxCost(inputs).toLocaleString()} at ${inputs.borrowerTaxRate}% tax rate.`,
    deductionAnalysis: `$${calculateTaxDeduction(inputs).toLocaleString()} tax deduction reduces the effective cost of points.`,
    afterTaxAnalysis: `After-tax savings of $${calculateAfterTaxSavings(inputs).toLocaleString()} improves the investment return.`,
    roiSummary: `${roi.toFixed(1)}% return on investment with ${calculateNetPresentValue(inputs).toLocaleString()} net present value.`,
    investmentAnalysis: `Points represent an investment with ${roi.toFixed(1)}% return and ${calculatePaybackPeriod(inputs).toFixed(1)} month payback period.`,
    returnAnalysis: `Investment returns ${roi.toFixed(1)}% annually with positive NPV of $${calculateNetPresentValue(inputs).toLocaleString()}.`,
    comparisonSummary: `Points provide $${metrics.monthlyPaymentSavings.toLocaleString()} monthly savings compared to no points scenario.`,
    scenarioAnalysis: `Multiple scenarios show ${calculateProbabilityOfBenefit(inputs) * 100}% probability of positive return on points investment.`,
    optionAnalysis: `Points option provides ${valueRating.toLowerCase()} with ${roi.toFixed(1)}% ROI.`,
    riskAssessment: `Overall risk assessment of ${riskScore} with ${calculateProbabilityOfBenefit(inputs) * 100}% probability of benefit.`,
    marketRisk: `Market risk assessed as ${inputs.marketCondition} with ${inputs.marketGrowthRate}% growth rate.`,
    timingRisk: `Timing risk of ${breakEvenMonths > inputs.analysisPeriod ? 'high' : 'low'} due to ${breakEvenMonths} month break-even period.`,
    refinanceRisk: `Refinance risk of ${inputs.analysisPeriod < inputs.loanTerm * 12 ? 'moderate' : 'low'} based on planned ownership period.`,
    marketAnalysis: `Property in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions.`,
    competitiveAnalysis: `Market analysis shows ${inputs.marketGrowthRate > 3 ? 'favorable' : inputs.marketGrowthRate > 0 ? 'neutral' : 'unfavorable'} conditions for points investment.`,
    marketPosition: `Market positioned for ${inputs.marketGrowthRate > 3 ? 'growth' : 'stability'} with ${inputs.marketGrowthRate}% annual appreciation.`,
    purchaseRecommendations: [
      roi > 10 ? 'Strong recommendation to purchase points' : 'Consider purchasing points for long-term savings',
      breakEvenMonths < inputs.loanTerm * 6 ? 'Favorable break-even timeline' : 'Evaluate break-even period carefully'
    ],
    optimizationSuggestions: [
      'Consider tax implications of point purchase',
      'Evaluate break-even period against ownership plans',
      'Compare with other rate reduction options'
    ],
    riskMitigation: [
      'Ensure sufficient ownership period to realize savings',
      'Consider market conditions and potential rate changes',
      'Evaluate tax benefits and deduction timing'
    ],
    implementationPlan: `Purchase ${calculateTotalPoints(inputs)} points for $${calculateTotalPointCost(inputs).toLocaleString()} to reduce rate by ${calculatePointValue(inputs).toFixed(2)}%.`,
    nextSteps: [
      'Review point purchase agreement',
      'Confirm tax deductibility of points',
      'Monitor break-even progress',
      'Consider refinance opportunities'
    ],
    timeline: `${inputs.loanTerm} year loan with ${breakEvenMonths} month break-even period.`,
    monitoringPlan: 'Monthly payment monitoring with annual break-even assessment.',
    keyMetrics: [
      'Monthly payment savings',
      'Break-even progress',
      'Tax deduction realization',
      'Market condition changes'
    ],
    reviewSchedule: 'Annual review of points investment performance.',
    riskManagement: `Risk management includes monitoring ${breakEvenMonths} month break-even period and ${inputs.marketGrowthRate}% market growth.`,
    mitigationStrategies: [
      'Maintain sufficient emergency reserves',
      'Monitor interest rate environment',
      'Plan for potential early sale or refinance'
    ],
    contingencyPlans: [
      'Early sale contingency if break-even not achieved',
      'Refinance option if rates decline significantly',
      'Tax strategy adjustment if deduction timing changes'
    ],
    performanceBenchmarks: [
      {
        metric: 'ROI',
        target: 10,
        benchmark: roi,
        industry: 'Mortgage Points'
      },
      {
        metric: 'Break-Even Period',
        target: inputs.loanTerm * 6,
        benchmark: breakEvenMonths,
        industry: 'Mortgage Points'
      },
      {
        metric: 'Risk Score',
        target: 50,
        benchmark: riskScore,
        industry: 'Mortgage Points'
      }
    ],
    decisionRecommendation: `${recommendation} based on ${roi.toFixed(1)}% ROI and ${breakEvenMonths} month break-even period.`,
    presentationPoints: [
      `$${metrics.monthlyPaymentSavings.toLocaleString()} monthly savings`,
      `${breakEvenMonths} month break-even period`,
      `${roi.toFixed(1)}% return on investment`,
      `${calculateProbabilityOfBenefit(inputs) * 100}% probability of benefit`
    ],
    decisionFactors: [
      'Return on investment analysis',
      'Break-even period evaluation',
      'Risk assessment review',
      'Tax implication consideration',
      'Market condition analysis'
    ]
  };
}