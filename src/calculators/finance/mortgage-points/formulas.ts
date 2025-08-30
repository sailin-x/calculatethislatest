import { MortgagePointsInputs, MortgagePointsOutputs, MortgagePointsAnalysis } from './types';

export function calculateMortgagePoints(inputs: MortgagePointsInputs): MortgagePointsOutputs {
  // Calculate total points and costs
  const totalPoints = inputs.discountPoints + inputs.originationPoints;
  const totalPointCost = totalPoints * inputs.pointCost;
  
  // Calculate effective rate reduction
  const effectiveRateReduction = inputs.discountPoints * inputs.pointValue;
  const effectiveRate = inputs.baseInterestRate - effectiveRateReduction;
  
  // Calculate payments with and without points
  const noPointsPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.baseInterestRate, inputs.loanTerm);
  const withPointsPayment = calculateMonthlyPayment(inputs.loanAmount, effectiveRate, inputs.loanTerm);
  
  // Calculate savings
  const monthlyPaymentSavings = noPointsPayment - withPointsPayment;
  const annualPaymentSavings = monthlyPaymentSavings * 12;
  const totalPaymentSavings = annualPaymentSavings * inputs.analysisPeriod;
  
  // Calculate interest savings
  const noPointsTotalInterest = (noPointsPayment * inputs.loanTerm * 12) - inputs.loanAmount;
  const withPointsTotalInterest = (withPointsPayment * inputs.loanTerm * 12) - inputs.loanAmount;
  const interestSavings = noPointsTotalInterest - withPointsTotalInterest;
  const interestSavingsPercentage = (interestSavings / noPointsTotalInterest) * 100;
  
  // Calculate break-even analysis
  const breakEvenMonths = totalPointCost / monthlyPaymentSavings;
  const breakEvenYears = breakEvenMonths / 12;
  const breakEvenPoint = totalPointCost + (monthlyPaymentSavings * breakEvenMonths);
  
  // Calculate tax analysis
  const taxDeduction = totalPointCost * (inputs.borrowerTaxRate / 100);
  const afterTaxCost = totalPointCost - taxDeduction;
  const afterTaxSavings = totalPaymentSavings + taxDeduction;
  const effectiveTaxRate = inputs.borrowerTaxRate;
  
  // Calculate ROI and NPV
  const returnOnInvestment = ((totalPaymentSavings - totalPointCost) / totalPointCost) * 100;
  const paybackPeriod = breakEvenMonths;
  const netPresentValue = calculateNPV(monthlyPaymentSavings, totalPointCost, inputs.discountRate, inputs.analysisPeriod);
  const internalRateOfReturn = calculateIRR(monthlyPaymentSavings, totalPointCost, inputs.analysisPeriod);
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, noPointsPayment, withPointsPayment);
  
  // Generate sensitivity analysis
  const sensitivityMatrix = generateSensitivityMatrix(inputs, monthlyPaymentSavings, totalPointCost);
  
  // Generate scenario analysis
  const scenarios = generateScenarioAnalysis(inputs, monthlyPaymentSavings, totalPointCost);
  
  // Generate amortization comparison
  const amortizationComparison = generateAmortizationComparison(inputs, noPointsPayment, withPointsPayment);
  
  // Calculate risk metrics
  const riskMetrics = calculateRiskMetrics(inputs, monthlyPaymentSavings, totalPointCost, breakEvenMonths);
  
  // Generate comprehensive analysis
  const analysis = generatePointsAnalysis(inputs, {
    totalPointCost,
    monthlyPaymentSavings,
    interestSavings,
    breakEvenMonths,
    returnOnInvestment,
    netPresentValue,
    riskMetrics
  });
  
  return {
    // Core Metrics
    totalPoints,
    totalPointCost,
    effectiveRate,
    monthlyPaymentSavings,
    interestSavings,
    breakEvenMonths,
    returnOnInvestment,
    netPresentValue,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    pointValue: inputs.pointValue,
    monthlyPayment: withPointsPayment,
    annualPaymentSavings,
    totalPaymentSavings,
    totalInterestPaid: withPointsTotalInterest,
    interestSavingsPercentage,
    totalCost: totalPointCost,
    netSavings: totalPaymentSavings - totalPointCost,
    breakEvenPoint,
    breakEvenYears,
    taxDeduction,
    afterTaxCost,
    afterTaxSavings,
    effectiveTaxRate,
    paybackPeriod,
    internalRateOfReturn,
    comparisonAnalysis,
    sensitivityMatrix,
    scenarios,
    amortizationComparison,
    riskScore: riskMetrics.riskScore,
    probabilityOfBenefit: riskMetrics.probabilityOfBenefit,
    worstCaseScenario: riskMetrics.worstCaseScenario,
    bestCaseScenario: riskMetrics.bestCaseScenario,
  };
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateNPV(monthlyCashFlow: number, initialInvestment: number, discountRate: number, years: number): number {
  const monthlyDiscountRate = discountRate / 100 / 12;
  let npv = -initialInvestment;
  
  for (let i = 1; i <= years * 12; i++) {
    npv += monthlyCashFlow / Math.pow(1 + monthlyDiscountRate, i);
  }
  
  return npv;
}

function calculateIRR(monthlyCashFlow: number, initialInvestment: number, years: number): number {
  // Simplified IRR calculation using trial and error
  let lowRate = 0;
  let highRate = 100;
  let midRate = 50;
  
  for (let i = 0; i < 100; i++) {
    const npv = calculateNPV(monthlyCashFlow, initialInvestment, midRate, years);
    
    if (Math.abs(npv) < 1) {
      break;
    }
    
    if (npv > 0) {
      lowRate = midRate;
    } else {
      highRate = midRate;
    }
    
    midRate = (lowRate + highRate) / 2;
  }
  
  return midRate;
}

function generateComparisonAnalysis(inputs: MortgagePointsInputs, noPointsPayment: number, withPointsPayment: number): any[] {
  const scenarios = [
    { name: 'No Points', points: 0, rate: inputs.baseInterestRate },
    { name: 'With Points', points: inputs.discountPoints, rate: inputs.baseInterestRate - (inputs.discountPoints * inputs.pointValue) },
  ];
  
  return scenarios.map(scenario => {
    const payment = calculateMonthlyPayment(inputs.loanAmount, scenario.rate, inputs.loanTerm);
    const totalInterest = (payment * inputs.loanTerm * 12) - inputs.loanAmount;
    const totalCost = scenario.points * inputs.pointCost;
    const netSavings = scenario.points > 0 ? (noPointsPayment - payment) * inputs.loanTerm * 12 - totalCost : 0;
    const breakEvenMonths = scenario.points > 0 ? totalCost / (noPointsPayment - payment) : 0;
    
    return {
      scenario: scenario.name,
      points: scenario.points,
      rate: scenario.rate,
      payment,
      totalInterest,
      totalCost,
      netSavings,
      breakEvenMonths,
    };
  });
}

function generateSensitivityMatrix(inputs: MortgagePointsInputs, monthlySavings: number, pointCost: number): any[] {
  const variables = [
    { name: 'Point Cost', field: 'pointCost', base: inputs.pointCost, range: [-500, -250, 0, 250, 500] },
    { name: 'Rate Reduction', field: 'pointValue', base: inputs.pointValue, range: [-0.1, -0.05, 0, 0.05, 0.1] },
    { name: 'Loan Amount', field: 'loanAmount', base: inputs.loanAmount, range: [-50000, -25000, 0, 25000, 50000] },
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      const testInputs = { ...inputs };
      if (variable.field === 'pointCost') {
        testInputs.pointCost = variable.base + change;
      } else if (variable.field === 'pointValue') {
        testInputs.pointValue = variable.base + change;
      } else if (variable.field === 'loanAmount') {
        testInputs.loanAmount = variable.base + change;
      }
      
      const testResults = calculateMortgagePoints(testInputs);
      return testResults.breakEvenMonths;
    });
    
    return {
      variable: variable.name,
      values: variable.range.map(v => variable.base + v),
      impacts,
    };
  });
}

function generateScenarioAnalysis(inputs: MortgagePointsInputs, monthlySavings: number, pointCost: number): any[] {
  const scenarios = [
    {
      scenario: 'Conservative',
      probability: 0.25,
      points: inputs.discountPoints * 0.8,
      rate: inputs.baseInterestRate - (inputs.discountPoints * inputs.pointValue * 0.8),
      savings: monthlySavings * 0.8,
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      points: inputs.discountPoints,
      rate: inputs.baseInterestRate - (inputs.discountPoints * inputs.pointValue),
      savings: monthlySavings,
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      points: inputs.discountPoints * 1.2,
      rate: inputs.baseInterestRate - (inputs.discountPoints * inputs.pointValue * 1.2),
      savings: monthlySavings * 1.2,
    },
  ];
  
  return scenarios.map(scenario => ({
    scenario: scenario.scenario,
    probability: scenario.probability,
    points: scenario.points,
    rate: scenario.rate,
    savings: scenario.savings,
  }));
}

function generateAmortizationComparison(inputs: MortgagePointsInputs, noPointsPayment: number, withPointsPayment: number): any[] {
  const comparison = [];
  const startDate = new Date();
  
  for (let i = 1; i <= Math.min(60, inputs.loanTerm * 12); i++) { // First 5 years or loan term
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);
    
    const savings = noPointsPayment - withPointsPayment;
    const cumulativeSavings = savings * i;
    
    comparison.push({
      paymentNumber: i,
      date: paymentDate.toISOString().split('T')[0],
      noPointsPayment,
      withPointsPayment,
      savings,
      cumulativeSavings,
    });
  }
  
  return comparison;
}

function calculateRiskMetrics(inputs: MortgagePointsInputs, monthlySavings: number, pointCost: number, breakEvenMonths: number): any {
  // Calculate risk score based on multiple factors
  let riskScore = 50; // Base score
  
  // Break-even timeline impact
  if (breakEvenMonths < 12) riskScore -= 20;
  else if (breakEvenMonths < 24) riskScore -= 10;
  else if (breakEvenMonths < 36) riskScore += 0;
  else if (breakEvenMonths < 60) riskScore += 15;
  else riskScore += 25;
  
  // Loan term impact
  if (inputs.loanTerm < 15) riskScore += 20;
  else if (inputs.loanTerm < 20) riskScore += 10;
  else if (inputs.loanTerm < 30) riskScore += 0;
  else riskScore -= 10;
  
  // Interest rate impact
  if (inputs.baseInterestRate > 6) riskScore -= 15;
  else if (inputs.baseInterestRate > 5) riskScore -= 5;
  else if (inputs.baseInterestRate > 4) riskScore += 5;
  else riskScore += 15;
  
  // Point cost impact
  const pointCostRatio = pointCost / inputs.loanAmount;
  if (pointCostRatio > 0.02) riskScore += 20;
  else if (pointCostRatio > 0.01) riskScore += 10;
  else riskScore -= 10;
  
  // Market condition impact
  if (inputs.marketCondition === 'declining') riskScore += 15;
  else if (inputs.marketCondition === 'stable') riskScore += 0;
  else if (inputs.marketCondition === 'growing') riskScore -= 5;
  else if (inputs.marketCondition === 'hot') riskScore -= 10;
  
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  // Calculate probability of benefit
  const probabilityOfBenefit = Math.max(0, Math.min(1, (100 - riskScore) / 100));
  
  // Calculate worst and best case scenarios
  const worstCaseScenario = monthlySavings * 0.5 * inputs.analysisPeriod * 12 - pointCost;
  const bestCaseScenario = monthlySavings * 1.5 * inputs.analysisPeriod * 12 - pointCost;
  
  return {
    riskScore,
    probabilityOfBenefit,
    worstCaseScenario,
    bestCaseScenario,
  };
}

function generatePointsAnalysis(inputs: MortgagePointsInputs, metrics: any): MortgagePointsAnalysis {
  const { totalPointCost, monthlyPaymentSavings, interestSavings, breakEvenMonths, returnOnInvestment, netPresentValue, riskMetrics } = metrics;
  
  // Determine points rating
  let pointsRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  
  if (breakEvenMonths < 12 && returnOnInvestment > 200) pointsRating = 'Excellent';
  else if (breakEvenMonths < 24 && returnOnInvestment > 100) pointsRating = 'Good';
  else if (breakEvenMonths < 36 && returnOnInvestment > 50) pointsRating = 'Average';
  else if (breakEvenMonths < 60 && returnOnInvestment > 0) pointsRating = 'Poor';
  else pointsRating = 'Very Poor';
  
  // Determine value rating
  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value' = 'Moderate Value';
  
  if (netPresentValue > 10000 && returnOnInvestment > 150) valueRating = 'High Value';
  else if (netPresentValue > 5000 && returnOnInvestment > 100) valueRating = 'Good Value';
  else if (netPresentValue > 0 && returnOnInvestment > 50) valueRating = 'Moderate Value';
  else if (netPresentValue > -5000 && returnOnInvestment > 0) valueRating = 'Low Value';
  else valueRating = 'No Value';
  
  // Determine recommendation
  let recommendation: 'Buy Points' | 'Consider Points' | 'Don\'t Buy Points' | 'Requires Review' = 'Consider Points';
  
  if (breakEvenMonths < 24 && returnOnInvestment > 100 && netPresentValue > 0) recommendation = 'Buy Points';
  else if (breakEvenMonths < 48 && returnOnInvestment > 50 && netPresentValue > -2000) recommendation = 'Consider Points';
  else if (breakEvenMonths > 60 || returnOnInvestment < 0 || netPresentValue < -5000) recommendation = 'Don\'t Buy Points';
  else recommendation = 'Requires Review';
  
  // Generate key insights
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];
  const valueFactors: string[] = [];
  const opportunities: string[] = [];
  
  if (breakEvenMonths < 24) keyStrengths.push('Quick break-even point indicates good value');
  if (returnOnInvestment > 100) keyStrengths.push('High return on investment');
  if (netPresentValue > 0) keyStrengths.push('Positive net present value');
  if (interestSavings > totalPointCost * 2) keyStrengths.push('Significant interest savings');
  
  if (breakEvenMonths > 48) keyWeaknesses.push('Long break-even period increases risk');
  if (returnOnInvestment < 50) keyWeaknesses.push('Low return on investment');
  if (netPresentValue < 0) keyWeaknesses.push('Negative net present value');
  if (inputs.loanTerm < 15) keyWeaknesses.push('Short loan term reduces benefit period');
  
  if (monthlyPaymentSavings > 100) valueFactors.push('Substantial monthly payment reduction');
  if (interestSavings > totalPointCost * 3) valueFactors.push('Excellent interest savings ratio');
  if (inputs.baseInterestRate > 5) valueFactors.push('High base rate increases point value');
  if (inputs.loanTerm >= 30) valueFactors.push('Long loan term maximizes savings');
  
  if (inputs.marketCondition === 'growing') opportunities.push('Growing market may increase property value');
  if (inputs.inflationRate > 2) opportunities.push('Inflation may reduce real cost of points');
  if (inputs.borrowerTaxRate > 20) opportunities.push('High tax rate increases deduction value');
  
  return {
    pointsRating,
    valueRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    valueFactors,
    opportunities,
    pointsSummary: `Buying ${inputs.discountPoints} discount points for ${formatCurrency(totalPointCost)} reduces rate from ${inputs.baseInterestRate}% to ${(inputs.baseInterestRate - (inputs.discountPoints * inputs.pointValue)).toFixed(2)}%.`,
    costAnalysis: `Total cost of ${formatCurrency(totalPointCost)} with ${formatCurrency(totalPointCost * (inputs.borrowerTaxRate / 100))} in tax deductions.`,
    savingsAnalysis: `Monthly savings of ${formatCurrency(monthlyPaymentSavings)} and total interest savings of ${formatCurrency(interestSavings)}.`,
    breakEvenSummary: `Break-even occurs in ${breakEvenMonths.toFixed(0)} months (${(breakEvenMonths / 12).toFixed(1)} years).`,
    timelineAnalysis: `Points pay for themselves in ${breakEvenMonths.toFixed(0)} months with ${formatPercentage(returnOnInvestment)} ROI.`,
    riskAnalysis: `Risk score of ${riskMetrics.riskScore}/100 with ${(riskMetrics.probabilityOfBenefit * 100).toFixed(0)}% probability of benefit.`,
    taxSummary: `Tax deduction of ${formatCurrency(totalPointCost * (inputs.borrowerTaxRate / 100))} reduces effective cost to ${formatCurrency(totalPointCost * (1 - inputs.borrowerTaxRate / 100))}.`,
    deductionAnalysis: `Points are deductible as mortgage interest over the life of the loan.`,
    afterTaxAnalysis: `After-tax cost is ${formatCurrency(totalPointCost * (1 - inputs.borrowerTaxRate / 100))} with after-tax savings of ${formatCurrency(monthlyPaymentSavings * inputs.loanTerm * 12 + totalPointCost * (inputs.borrowerTaxRate / 100))}.`,
    roiSummary: `Return on investment of ${formatPercentage(returnOnInvestment)} with net present value of ${formatCurrency(netPresentValue)}.`,
    investmentAnalysis: `Points represent an investment in lower future payments with ${formatPercentage(returnOnInvestment)} total return.`,
    returnAnalysis: `Investment pays for itself in ${breakEvenMonths.toFixed(0)} months and generates ${formatCurrency(monthlyPaymentSavings * inputs.loanTerm * 12 - totalPointCost)} in net savings.`,
    comparisonSummary: `Comparison shows ${formatCurrency(monthlyPaymentSavings)} monthly savings and ${formatCurrency(interestSavings)} total interest savings.`,
    scenarioAnalysis: `Best case scenario: ${formatCurrency(riskMetrics.bestCaseScenario)}. Worst case scenario: ${formatCurrency(riskMetrics.worstCaseScenario)}.`,
    optionAnalysis: `Points provide ${formatCurrency(monthlyPaymentSavings)} monthly cash flow improvement.`,
    riskAssessment: `Overall risk assessment: ${riskMetrics.riskScore < 30 ? 'Low' : riskMetrics.riskScore < 50 ? 'Moderate' : 'High'} risk with ${(riskMetrics.probabilityOfBenefit * 100).toFixed(0)}% probability of benefit.`,
    marketRisk: `Market risk is ${inputs.marketCondition === 'stable' ? 'low' : inputs.marketCondition === 'growing' ? 'moderate' : 'high'}.`,
    timingRisk: `Timing risk is ${breakEvenMonths < 24 ? 'low' : breakEvenMonths < 48 ? 'moderate' : 'high'} based on break-even timeline.`,
    refinanceRisk: `Refinance risk is ${inputs.loanTerm < 15 ? 'high' : inputs.loanTerm < 20 ? 'moderate' : 'low'} based on loan term.`,
    marketAnalysis: `Current market conditions are ${inputs.marketCondition} with ${inputs.marketGrowthRate}% growth rate.`,
    competitiveAnalysis: `Point costs are ${totalPointCost / inputs.loanAmount * 100 < 1 ? 'competitive' : 'above average'} at ${(totalPointCost / inputs.loanAmount * 100).toFixed(2)}% of loan amount.`,
    marketPosition: `Points offer ${formatPercentage((monthlyPaymentSavings / (inputs.loanAmount / 12)) * 100)} monthly payment reduction relative to loan amount.`,
    purchaseRecommendations: [
      'Consider buying points if you plan to keep the loan for the full term',
      'Evaluate break-even timeline against your expected holding period',
      'Factor in tax deductions when calculating effective cost',
    ],
    optimizationSuggestions: [
      'Negotiate point costs with multiple lenders',
      'Consider partial point purchases for better break-even',
      'Time point purchase with rate lock periods',
    ],
    riskMitigation: [
      'Ensure you can afford the upfront cost',
      'Plan to hold the loan beyond break-even point',
      'Consider refinancing risk in your decision',
    ],
    implementationPlan: 'Proceed with points purchase if recommendation is favorable and you can afford the upfront cost.',
    nextSteps: [
      'Lock in rate and points pricing',
      'Ensure sufficient funds for closing costs',
      'Coordinate with lender on point purchase',
    ],
    timeline: 'Points must be purchased at closing and cannot be added later.',
    monitoringPlan: 'Track actual savings against projections and review if refinancing becomes attractive.',
    keyMetrics: [
      'Break-even timeline',
      'Monthly payment savings',
      'Total interest savings',
      'Return on investment',
    ],
    reviewSchedule: 'Review point value annually and when considering refinancing.',
    riskManagement: 'Maintain emergency fund to cover point costs and monitor refinancing opportunities.',
    mitigationStrategies: [
      'Ensure stable income before purchasing points',
      'Consider shorter loan terms to reduce refinance risk',
      'Monitor interest rate trends for refinancing opportunities',
    ],
    contingencyPlans: [
      'Refinance if rates drop significantly',
      'Sell property if financial situation changes',
      'Consider loan modification if needed',
    ],
    performanceBenchmarks: [
      {
        metric: 'Break-Even Months',
        target: 24,
        benchmark: breakEvenMonths,
        industry: 'Mortgage Points',
      },
      {
        metric: 'ROI',
        target: 100,
        benchmark: returnOnInvestment,
        industry: 'Mortgage Points',
      },
      {
        metric: 'NPV',
        target: 0,
        benchmark: netPresentValue,
        industry: 'Mortgage Points',
      },
    ],
    decisionRecommendation: recommendation === 'Buy Points' ? 'Proceed with points purchase' : 
                            recommendation === 'Consider Points' ? 'Consider points if conditions are favorable' :
                            recommendation === 'Don\'t Buy Points' ? 'Avoid points purchase' : 'Requires additional analysis',
    presentationPoints: [
      `Monthly savings: ${formatCurrency(monthlyPaymentSavings)}`,
      `Break-even: ${breakEvenMonths.toFixed(0)} months`,
      `Total savings: ${formatCurrency(monthlyPaymentSavings * inputs.loanTerm * 12 - totalPointCost)}`,
      `ROI: ${formatPercentage(returnOnInvestment)}`,
    ],
    decisionFactors: [
      'Expected loan holding period',
      'Available funds for upfront costs',
      'Tax situation and deduction benefits',
      'Interest rate environment and refinancing risk',
    ],
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}