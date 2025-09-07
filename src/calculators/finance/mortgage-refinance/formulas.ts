import { MortgageRefinanceInputs, MortgageRefinanceMetrics, MortgageRefinanceAnalysis } from './types';

export function calculateCurrentMonthlyPayment(inputs: MortgageRefinanceInputs): number {
  if (inputs.currentMonthlyPayment > 0) {
    return inputs.currentMonthlyPayment;
  }

  // Calculate if not provided
  const monthlyRate = inputs.currentInterestRate / 100 / 12;
  const numPayments = inputs.currentRemainingTerm * 12;

  return inputs.currentPrincipalBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateNewMonthlyPayment(inputs: MortgageRefinanceInputs): number {
  const monthlyRate = inputs.newInterestRate / 100 / 12;
  const numPayments = inputs.newLoanTerm * 12;

  return inputs.newLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateMonthlyPaymentDifference(inputs: MortgageRefinanceInputs): number {
  return calculateCurrentMonthlyPayment(inputs) - calculateNewMonthlyPayment(inputs);
}

export function calculateMonthlyPaymentSavings(inputs: MortgageRefinanceInputs): number {
  const difference = calculateMonthlyPaymentDifference(inputs);
  return difference > 0 ? difference : 0;
}

export function calculateAnnualPaymentSavings(inputs: MortgageRefinanceInputs): number {
  return calculateMonthlyPaymentSavings(inputs) * 12;
}

export function calculateCurrentTotalInterest(inputs: MortgageRefinanceInputs): number {
  const monthlyPayment = calculateCurrentMonthlyPayment(inputs);
  const totalPayments = monthlyPayment * inputs.currentRemainingTerm * 12;
  return totalPayments - inputs.currentPrincipalBalance;
}

export function calculateNewTotalInterest(inputs: MortgageRefinanceInputs): number {
  const monthlyPayment = calculateNewMonthlyPayment(inputs);
  const totalPayments = monthlyPayment * inputs.newLoanTerm * 12;
  return totalPayments - inputs.newLoanAmount;
}

export function calculateInterestSavings(inputs: MortgageRefinanceInputs): number {
  return calculateCurrentTotalInterest(inputs) - calculateNewTotalInterest(inputs);
}

export function calculateInterestSavingsPercentage(inputs: MortgageRefinanceInputs): number {
  const currentInterest = calculateCurrentTotalInterest(inputs);
  const savings = calculateInterestSavings(inputs);

  return currentInterest > 0 ? (savings / currentInterest) * 100 : 0;
}

export function calculateTotalRefinanceCost(inputs: MortgageRefinanceInputs): number {
  return inputs.closingCosts + inputs.originationFee + inputs.appraisalFee +
         inputs.titleInsuranceFee + inputs.recordingFee + inputs.attorneyFee +
         inputs.creditReportFee + inputs.floodCertificationFee + inputs.taxServiceFee +
         inputs.otherFees;
}

export function calculateBreakEvenPoint(inputs: MortgageRefinanceInputs): number {
  const monthlySavings = calculateMonthlyPaymentSavings(inputs);
  const totalCost = calculateTotalRefinanceCost(inputs);

  if (monthlySavings <= 0) {
    return Infinity;
  }

  return totalCost / monthlySavings;
}

export function calculateBreakEvenMonths(inputs: MortgageRefinanceInputs): number {
  return calculateBreakEvenPoint(inputs);
}

export function calculateBreakEvenYears(inputs: MortgageRefinanceInputs): number {
  return calculateBreakEvenMonths(inputs) / 12;
}

export function calculateNetSavings(inputs: MortgageRefinanceInputs): number {
  const totalSavings = calculateAnnualPaymentSavings(inputs) * inputs.analysisPeriod;
  const totalCost = calculateTotalRefinanceCost(inputs);

  return totalSavings - totalCost;
}

export function calculateMonthlyCashFlow(inputs: MortgageRefinanceInputs): number {
  return calculateMonthlyPaymentDifference(inputs);
}

export function calculateAnnualCashFlow(inputs: MortgageRefinanceInputs): number {
  return calculateAnnualPaymentSavings(inputs);
}

export function calculateTotalCashFlow(inputs: MortgageRefinanceInputs): number {
  return calculateAnnualCashFlow(inputs) * inputs.analysisPeriod;
}

export function calculateCashFlowImprovement(inputs: MortgageRefinanceInputs): number {
  const currentPayment = calculateCurrentMonthlyPayment(inputs);
  const improvement = calculateMonthlyCashFlow(inputs);

  return currentPayment > 0 ? (improvement / currentPayment) * 100 : 0;
}

export function calculateCurrentEquity(inputs: MortgageRefinanceInputs): number {
  return inputs.propertyValue - inputs.currentLoanAmount;
}

export function calculateNewEquity(inputs: MortgageRefinanceInputs): number {
  return inputs.propertyValue - inputs.newLoanAmount;
}

export function calculateEquityChange(inputs: MortgageRefinanceInputs): number {
  return calculateNewEquity(inputs) - calculateCurrentEquity(inputs);
}

export function calculateLoanToValueRatio(inputs: MortgageRefinanceInputs): number {
  return inputs.propertyValue > 0 ? (inputs.newLoanAmount / inputs.propertyValue) * 100 : 0;
}

export function calculateTaxDeduction(inputs: MortgageRefinanceInputs): number {
  const interestSavings = calculateInterestSavings(inputs);
  return interestSavings * (inputs.borrowerTaxRate / 100);
}

export function calculateAfterTaxSavings(inputs: MortgageRefinanceInputs): number {
  const savings = calculateAnnualPaymentSavings(inputs);
  const taxDeduction = calculateTaxDeduction(inputs);

  return savings - taxDeduction;
}

export function calculateEffectiveTaxRate(inputs: MortgageRefinanceInputs): number {
  const savings = calculateAnnualPaymentSavings(inputs);
  const taxDeduction = calculateTaxDeduction(inputs);

  return savings > 0 ? (taxDeduction / savings) * 100 : 0;
}

export function calculateTaxBenefit(inputs: MortgageRefinanceInputs): number {
  return calculateTaxDeduction(inputs) * inputs.taxDeductionPeriod;
}

export function calculateReturnOnInvestment(inputs: MortgageRefinanceInputs): number {
  const netSavings = calculateNetSavings(inputs);
  const totalCost = calculateTotalRefinanceCost(inputs);

  return totalCost > 0 ? (netSavings / totalCost) * 100 : 0;
}

export function calculatePaybackPeriod(inputs: MortgageRefinanceInputs): number {
  return calculateBreakEvenMonths(inputs);
}

export function calculateNetPresentValue(inputs: MortgageRefinanceInputs): number {
  const monthlySavings = calculateMonthlyPaymentSavings(inputs);
  const discountRate = inputs.discountRate / 100 / 12;
  const periods = inputs.analysisPeriod * 12;

  let npv = -calculateTotalRefinanceCost(inputs);

  for (let i = 1; i <= periods; i++) {
    npv += monthlySavings / Math.pow(1 + discountRate, i);
  }

  return npv;
}

export function calculateInternalRateOfReturn(inputs: MortgageRefinanceInputs): number {
  // Simplified IRR calculation
  const monthlySavings = calculateMonthlyPaymentSavings(inputs);
  const totalCost = calculateTotalRefinanceCost(inputs);
  const periods = inputs.analysisPeriod * 12;

  // Estimate IRR using approximation
  const totalCashFlow = monthlySavings * periods;
  const averageCashFlow = totalCashFlow / periods;

  if (averageCashFlow <= 0) {
    return 0;
  }

  return ((averageCashFlow / totalCost) * 12) * 100;
}

export function calculateAmortizationComparison(inputs: MortgageRefinanceInputs): Array<{
  paymentNumber: number;
  date: string;
  currentPayment: number;
  newPayment: number;
  savings: number;
  cumulativeSavings: number;
}> {
  const comparison = [];
  const currentPayment = calculateCurrentMonthlyPayment(inputs);
  const newPayment = calculateNewMonthlyPayment(inputs);
  const monthlySavings = currentPayment - newPayment;

  for (let i = 1; i <= 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);

    comparison.push({
      paymentNumber: i,
      date: date.toISOString().split('T')[0],
      currentPayment,
      newPayment,
      savings: monthlySavings,
      cumulativeSavings: monthlySavings * i
    });
  }

  return comparison;
}

export function calculateSensitivityMatrix(inputs: MortgageRefinanceInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Interest rate sensitivity
  const rateValues = [inputs.newInterestRate - 0.5, inputs.newInterestRate, inputs.newInterestRate + 0.5];
  const rateImpacts = rateValues.map(rate => {
    const testInputs = { ...inputs, newInterestRate: rate };
    return calculateMonthlyPaymentSavings(testInputs) - calculateMonthlyPaymentSavings(inputs);
  });

  matrix.push({
    variable: 'New Interest Rate',
    values: rateValues,
    impacts: rateImpacts
  });

  // Closing costs sensitivity
  const costValues = [inputs.closingCosts * 0.8, inputs.closingCosts, inputs.closingCosts * 1.2];
  const costImpacts = costValues.map(cost => {
    const testInputs = { ...inputs, closingCosts: cost };
    return calculateNetSavings(testInputs) - calculateNetSavings(inputs);
  });

  matrix.push({
    variable: 'Closing Costs',
    values: costValues,
    impacts: costImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: MortgageRefinanceInputs): Array<{
  scenario: string;
  probability: number;
  rate: number;
  payment: number;
  savings: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.5,
    rate: inputs.newInterestRate,
    payment: calculateNewMonthlyPayment(inputs),
    savings: calculateMonthlyPaymentSavings(inputs)
  });

  // Rate increase scenario
  const rateIncreaseInputs = { ...inputs, newInterestRate: inputs.newInterestRate + 0.5 };
  scenarios.push({
    scenario: 'Rate +0.5%',
    probability: 0.2,
    rate: inputs.newInterestRate + 0.5,
    payment: calculateNewMonthlyPayment(rateIncreaseInputs),
    savings: calculateMonthlyPaymentSavings(rateIncreaseInputs)
  });

  // Rate decrease scenario
  const rateDecreaseInputs = { ...inputs, newInterestRate: Math.max(0, inputs.newInterestRate - 0.5) };
  scenarios.push({
    scenario: 'Rate -0.5%',
    probability: 0.2,
    rate: Math.max(0, inputs.newInterestRate - 0.5),
    payment: calculateNewMonthlyPayment(rateDecreaseInputs),
    savings: calculateMonthlyPaymentSavings(rateDecreaseInputs)
  });

  // Higher costs scenario
  const highCostInputs = { ...inputs, closingCosts: inputs.closingCosts * 1.2 };
  scenarios.push({
    scenario: 'Higher Costs',
    probability: 0.1,
    rate: inputs.newInterestRate,
    payment: calculateNewMonthlyPayment(highCostInputs),
    savings: calculateMonthlyPaymentSavings(highCostInputs)
  });

  return scenarios;
}

export function calculateRiskScore(inputs: MortgageRefinanceInputs): number {
  let score = 0;

  // Break-even risk
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  if (breakEvenMonths > 24) score += 30;
  else if (breakEvenMonths > 12) score += 15;

  // Market risk
  if (inputs.marketCondition === 'declining') score += 20;
  else if (inputs.marketCondition === 'hot') score += 10;

  // Borrower risk
  if (inputs.borrowerCreditScore < 620) score += 25;
  else if (inputs.borrowerCreditScore < 740) score += 10;

  if (inputs.borrowerDebtToIncomeRatio > 43) score += 15;

  return Math.min(100, score);
}

export function calculateProbabilityOfBenefit(inputs: MortgageRefinanceInputs): number {
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const riskScore = calculateRiskScore(inputs);

  let probability = 50;

  // Break-even factor
  if (breakEvenMonths <= 12) probability += 30;
  else if (breakEvenMonths <= 24) probability += 15;
  else probability -= 20;

  // Risk factor
  probability -= riskScore * 0.3;

  // Market factor
  if (inputs.marketCondition === 'growing') probability += 10;
  else if (inputs.marketCondition === 'hot') probability += 15;

  return Math.max(0, Math.min(100, probability));
}

export function calculateWorstCaseScenario(inputs: MortgageRefinanceInputs): number {
  const highCostInputs = { ...inputs, closingCosts: inputs.closingCosts * 1.5, newInterestRate: inputs.newInterestRate + 0.75 };
  return calculateNetSavings(highCostInputs);
}

export function calculateBestCaseScenario(inputs: MortgageRefinanceInputs): number {
  const lowCostInputs = { ...inputs, closingCosts: inputs.closingCosts * 0.7, newInterestRate: inputs.newInterestRate - 0.25 };
  return calculateNetSavings(lowCostInputs);
}

export function calculateComparisonAnalysis(inputs: MortgageRefinanceInputs): Array<{
  option: string;
  rate: number;
  payment: number;
  totalCost: number;
  savings: number;
  breakEven: number;
}> {
  const analysis = [];

  // Current loan
  analysis.push({
    option: 'Current Loan',
    rate: inputs.currentInterestRate,
    payment: calculateCurrentMonthlyPayment(inputs),
    totalCost: calculateCurrentTotalInterest(inputs),
    savings: 0,
    breakEven: 0
  });

  // New loan
  analysis.push({
    option: 'New Loan',
    rate: inputs.newInterestRate,
    payment: calculateNewMonthlyPayment(inputs),
    totalCost: calculateNewTotalInterest(inputs) + calculateTotalRefinanceCost(inputs),
    savings: calculateNetSavings(inputs),
    breakEven: calculateBreakEvenMonths(inputs)
  });

  // No refinance
  analysis.push({
    option: 'No Refinance',
    rate: inputs.currentInterestRate,
    payment: calculateCurrentMonthlyPayment(inputs),
    totalCost: calculateCurrentTotalInterest(inputs),
    savings: 0,
    breakEven: 0
  });

  return analysis;
}

export function generateMortgageRefinanceAnalysis(inputs: MortgageRefinanceInputs, metrics: MortgageRefinanceMetrics): MortgageRefinanceAnalysis {
  const netSavings = calculateNetSavings(inputs);
  const breakEvenMonths = calculateBreakEvenMonths(inputs);
  const riskScore = calculateRiskScore(inputs);

  let refinanceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (netSavings > 50000 && breakEvenMonths < 12) refinanceRating = 'Excellent';
  else if (netSavings > 25000 && breakEvenMonths < 24) refinanceRating = 'Good';
  else if (netSavings > 10000) refinanceRating = 'Average';
  else if (netSavings > 0) refinanceRating = 'Poor';
  else refinanceRating = 'Very Poor';

  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  if (netSavings > 30000) valueRating = 'High Value';
  else if (netSavings > 15000) valueRating = 'Good Value';
  else if (netSavings > 5000) valueRating = 'Moderate Value';
  else if (netSavings > 0) valueRating = 'Low Value';
  else valueRating = 'No Value';

  const recommendation = netSavings > 0 && breakEvenMonths < inputs.currentRemainingTerm * 12 ? 'Proceed' :
                        netSavings > 0 ? 'Consider' : 'Don\'t Refinance';

  return {
    refinanceRating,
    valueRating,
    recommendation,
    keyStrengths: [
      `Monthly savings: $${metrics.monthlyPaymentSavings.toLocaleString()}`,
      `Net savings: $${netSavings.toLocaleString()}`,
      `Break-even: ${breakEvenMonths.toFixed(1)} months`
    ],
    keyWeaknesses: [
      riskScore > 50 ? 'High risk profile' : 'Acceptable risk profile',
      breakEvenMonths > 24 ? 'Long break-even period' : 'Reasonable break-even period'
    ],
    valueFactors: [
      'Interest rate differential',
      'Closing costs impact',
      'Loan term changes',
      'Cash flow improvement'
    ],
    opportunities: [
      'Rate optimization',
      'Term reduction',
      'Cash-out opportunities',
      'Tax benefit maximization'
    ],
    refinanceSummary: `Refinance analysis shows ${refinanceRating.toLowerCase()} rating with ${valueRating.toLowerCase()} and ${recommendation.toLowerCase()} recommendation.`,
    paymentAnalysis: `Monthly payment will ${metrics.monthlyPaymentDifference > 0 ? 'decrease' : 'increase'} by $${Math.abs(metrics.monthlyPaymentDifference).toLocaleString()} with new payment of $${metrics.newMonthlyPayment.toLocaleString()}.`,
    costAnalysis: `Total refinance cost of $${metrics.totalRefinanceCost.toLocaleString()} with break-even point at ${breakEvenMonths.toFixed(1)} months.`,
    breakEvenSummary: `Break-even analysis shows ${breakEvenMonths < inputs.currentRemainingTerm * 12 ? 'favorable' : 'unfavorable'} economics with ${breakEvenMonths.toFixed(1)} month break-even period.`,
    timelineAnalysis: `Timeline analysis covers ${inputs.analysisPeriod} year period with ${metrics.paybackPeriod.toFixed(1)} month payback period.`,
    riskAnalysis: `Risk analysis indicates ${riskScore} risk score with ${metrics.probabilityOfBenefit.toFixed(1)}% probability of benefit.`,
    cashFlowSummary: `Cash flow analysis shows $${metrics.monthlyCashFlow.toLocaleString()} monthly improvement and $${metrics.annualCashFlow.toLocaleString()} annual savings.`,
    savingsAnalysis: `Savings analysis indicates $${metrics.interestSavings.toLocaleString()} total interest savings and $${metrics.netSavings.toLocaleString()} net savings.`,
    improvementAnalysis: `Cash flow improvement of ${metrics.cashFlowImprovement.toFixed(1)}% with ${metrics.totalCashFlow.toLocaleString()} total cash flow over analysis period.`,
    taxSummary: `Tax analysis shows $${metrics.taxDeduction.toLocaleString()} annual deduction and $${metrics.afterTaxSavings.toLocaleString()} after-tax savings.`,
    deductionAnalysis: `Tax deduction analysis indicates ${metrics.effectiveTaxRate.toFixed(1)}% effective tax rate on savings.`,
    benefitAnalysis: `Tax benefit analysis shows $${metrics.taxBenefit.toLocaleString()} total tax benefit over ${inputs.taxDeductionPeriod} year period.`,
    roiSummary: `ROI analysis indicates ${metrics.returnOnInvestment.toFixed(1)}% return on investment with ${metrics.paybackPeriod.toFixed(1)} month payback period.`,
    investmentAnalysis: `Investment analysis shows $${metrics.netPresentValue.toLocaleString()} net present value and ${metrics.internalRateOfReturn.toFixed(1)}% internal rate of return.`,
    returnAnalysis: `Return analysis indicates ${metrics.returnOnInvestment > 0 ? 'positive' : 'negative'} return with ${metrics.paybackPeriod.toFixed(1)} month payback period.`,
    riskAssessment: `Overall risk assessment of ${riskScore} with ${metrics.probabilityOfBenefit.toFixed(1)}% probability of benefit.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions and ${inputs.marketGrowthRate}% growth rate.`,
    rateRisk: `Rate risk assessment based on ${inputs.newInterestRate}% new rate vs ${inputs.currentInterestRate}% current rate.`,
    timingRisk: `Timing risk assessment with ${breakEvenMonths} month break-even period vs ${inputs.currentRemainingTerm} year remaining term.`,
    marketAnalysis: `Market analysis indicates ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate in ${inputs.marketLocation}.`,
    competitiveAnalysis: `Competitive analysis shows ${inputs.newInterestRate < inputs.currentInterestRate ? 'favorable' : 'unfavorable'} rate environment.`,
    marketPosition: `Market position analysis indicates ${inputs.marketGrowthRate > 3 ? 'growth' : inputs.marketGrowthRate > 0 ? 'stable' : 'declining'} market conditions.`,
    refinanceRecommendations: [
      netSavings > 0 ? 'Proceed with refinance - positive net savings identified' : 'Reconsider refinance - negative net savings projected',
      breakEvenMonths < 24 ? 'Favorable break-even period' : 'Long break-even period - consider alternatives'
    ],
    optimizationSuggestions: [
      'Shop multiple lenders for best rates',
      'Consider points to lower rate further',
      'Evaluate cash-out opportunities',
      'Plan for closing timeline'
    ],
    riskMitigation: [
      'Rate lock strategy implementation',
      'Closing cost contingency planning',
      'Market condition monitoring',
      'Alternative financing backup plan'
    ],
    implementationPlan: `Refinance implementation plan includes ${recommendation.toLowerCase()} with ${breakEvenMonths.toFixed(1)} month break-even period.`,
    nextSteps: [
      'Shop lender rates and terms',
      'Gather required documentation',
      'Order appraisal and title work',
      'Schedule closing timeline'
    ],
    timeline: `${inputs.analysisPeriod} year analysis period with ${breakEvenMonths.toFixed(1)} month break-even point.`,
    monitoringPlan: 'Monthly payment monitoring and annual savings verification.',
    keyMetrics: [
      'Monthly payment savings',
      'Break-even period',
      'Net savings',
      'Cash flow improvement'
    ],
    reviewSchedule: 'Annual refinance analysis and market condition review.',
    riskManagement: `Risk management includes monitoring ${riskScore} risk score and ${metrics.probabilityOfBenefit.toFixed(1)}% probability of benefit.`,
    mitigationStrategies: [
      'Rate lock implementation',
      'Cost contingency planning',
      'Market monitoring',
      'Exit strategy planning'
    ],
    contingencyPlans: [
      'Rate increase contingency',
      'Cost overrun planning',
      'Market change response',
      'Alternative financing options'
    ],
    performanceBenchmarks: [
      {
        metric: 'Net Savings',
        target: 15000,
        benchmark: netSavings,
        industry: 'Mortgage Refinance'
      },
      {
        metric: 'Break-Even Period',
        target: 24,
        benchmark: breakEvenMonths,
        industry: 'Mortgage Refinance'
      },
      {
        metric: 'ROI',
        target: 100,
        benchmark: metrics.returnOnInvestment,
        industry: 'Mortgage Refinance'
      }
    ],
    decisionRecommendation: `${recommendation} with ${refinanceRating.toLowerCase()} refinance rating and ${valueRating.toLowerCase()}.`,
    presentationPoints: [
      `Net savings: $${netSavings.toLocaleString()}`,
      `Break-even: ${breakEvenMonths.toFixed(1)} months`,
      `Monthly savings: $${metrics.monthlyPaymentSavings.toLocaleString()}`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'Net savings analysis',
      'Break-even period evaluation',
      'Risk assessment',
      'Market condition review',
      'Cash flow impact'
    ]
  };
}