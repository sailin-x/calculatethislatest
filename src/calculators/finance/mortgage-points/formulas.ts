import { MortgagePointsInputs, MortgagePointsOutputs } from './types';

export function calculateMortgagePoints(inputs: MortgagePointsInputs): MortgagePointsOutputs {
  const { loanAmount, baseInterestRate, loanTerm, discountPoints, originationPoints, borrowerTaxRate } = inputs;
  
  // Calculate total points
  const totalPoints = discountPoints + originationPoints;
  
  // Calculate point cost
  const totalPointCost = (totalPoints / 100) * loanAmount;
  
  // Calculate effective interest rate (assuming 0.25% reduction per point)
  const effectiveRate = baseInterestRate - (discountPoints * 0.0025);
  
  // Calculate monthly payments
  const monthlyRate = effectiveRate / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate payment without points
  const baseMonthlyRate = baseInterestRate / 12;
  const baseMonthlyPayment = (loanAmount * baseMonthlyRate * Math.pow(1 + baseMonthlyRate, totalPayments)) /
                            (Math.pow(1 + baseMonthlyRate, totalPayments) - 1);
  
  // Calculate savings
  const monthlyPaymentSavings = baseMonthlyPayment - monthlyPayment;
  const annualPaymentSavings = monthlyPaymentSavings * 12;
  const totalPaymentSavings = annualPaymentSavings * loanTerm;
  
  // Calculate interest savings
  const totalInterestPaid = (monthlyPayment * totalPayments) - loanAmount;
  const baseTotalInterest = (baseMonthlyPayment * totalPayments) - loanAmount;
  const interestSavings = baseTotalInterest - totalInterestPaid;
  const interestSavingsPercentage = (interestSavings / baseTotalInterest) * 100;
  
  // Calculate break-even point
  const breakEvenMonths = totalPointCost / monthlyPaymentSavings;
  const breakEvenYears = breakEvenMonths / 12;
  const breakEvenPoint = breakEvenMonths;
  
  // Calculate tax benefits
  const taxDeduction = totalPointCost * (borrowerTaxRate / 100);
  const afterTaxCost = totalPointCost - taxDeduction;
  const afterTaxSavings = totalPaymentSavings - afterTaxCost;
  const effectiveTaxRate = borrowerTaxRate;
  
  // Calculate ROI
  const returnOnInvestment = (interestSavings / totalPointCost) * 100;
  const paybackPeriod = breakEvenMonths;
  
  // Calculate NPV
  const discountRate = inputs.discountRate / 100;
  const netPresentValue = calculateNPV(monthlyPaymentSavings, totalPointCost, discountRate, loanTerm);
  
  // Calculate IRR
  const internalRateOfReturn = calculateIRR(monthlyPaymentSavings, totalPointCost, loanTerm);
  
  // Calculate point value
  const pointValue = interestSavings / totalPoints;
  
  // Calculate total cost
  const totalCost = totalPointCost;
  const netSavings = totalPaymentSavings - totalPointCost;
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs);
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  
  // Generate scenarios
  const scenarios = generateScenarios(inputs);
  
  // Generate amortization comparison
  const amortizationComparison = generateAmortizationComparison(inputs, baseMonthlyPayment, monthlyPayment);
  
  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfBenefit = calculateProbabilityOfBenefit(inputs, breakEvenMonths);
  const worstCaseScenario = calculateWorstCaseScenario(inputs);
  const bestCaseScenario = calculateBestCaseScenario(inputs);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    totalPoints,
    totalPointCost,
    interestSavings,
    breakEvenMonths,
    returnOnInvestment,
    netPresentValue,
    riskScore,
    probabilityOfBenefit
  });
  
  return {
    totalPoints,
    totalPointCost: parseFloat(totalPointCost.toFixed(2)),
    effectiveRate: parseFloat(effectiveRate.toFixed(4)),
    monthlyPaymentSavings: parseFloat(monthlyPaymentSavings.toFixed(2)),
    interestSavings: parseFloat(interestSavings.toFixed(2)),
    breakEvenMonths: Math.ceil(breakEvenMonths),
    returnOnInvestment: parseFloat(returnOnInvestment.toFixed(2)),
    netPresentValue: parseFloat(netPresentValue.toFixed(2)),
    analysis,
    pointValue: parseFloat(pointValue.toFixed(2)),
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    annualPaymentSavings: parseFloat(annualPaymentSavings.toFixed(2)),
    totalPaymentSavings: parseFloat(totalPaymentSavings.toFixed(2)),
    totalInterestPaid: parseFloat(totalInterestPaid.toFixed(2)),
    interestSavingsPercentage: parseFloat(interestSavingsPercentage.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    netSavings: parseFloat(netSavings.toFixed(2)),
    breakEvenPoint,
    breakEvenYears: parseFloat(breakEvenYears.toFixed(2)),
    taxDeduction: parseFloat(taxDeduction.toFixed(2)),
    afterTaxCost: parseFloat(afterTaxCost.toFixed(2)),
    afterTaxSavings: parseFloat(afterTaxSavings.toFixed(2)),
    effectiveTaxRate: parseFloat(effectiveTaxRate.toFixed(2)),
    paybackPeriod: Math.ceil(paybackPeriod),
    internalRateOfReturn: parseFloat(internalRateOfReturn.toFixed(4)),
    comparisonAnalysis,
    sensitivityMatrix,
    scenarios,
    amortizationComparison,
    riskScore,
    probabilityOfBenefit,
    worstCaseScenario,
    bestCaseScenario
  };
}

function calculateNPV(monthlySavings: number, initialCost: number, discountRate: number, years: number): number {
  let npv = -initialCost;
  const monthlyRate = discountRate / 12;
  
  for (let i = 1; i <= years * 12; i++) {
    npv += monthlySavings / Math.pow(1 + monthlyRate, i);
  }
  
  return npv;
}

function calculateIRR(monthlySavings: number, initialCost: number, years: number): number {
  // Simple IRR calculation using approximation
  const totalSavings = monthlySavings * years * 12;
  const irr = Math.pow(totalSavings / initialCost, 1 / years) - 1;
  return Math.max(0, irr);
}

function generateComparisonAnalysis(inputs: MortgagePointsInputs): any[] {
  const analysis = [];
  const pointOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  
  for (const points of pointOptions) {
    const rate = inputs.baseInterestRate - (points * 0.0025);
    const monthlyRate = rate / 12;
    const totalPayments = inputs.loanTerm * 12;
    const payment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                   (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalInterest = (payment * totalPayments) - inputs.loanAmount;
    const pointCost = (points / 100) * inputs.loanAmount;
    const netSavings = totalInterest - pointCost;
    const breakEvenMonths = pointCost / (payment * 0.0025 * inputs.loanAmount / 12);
    
    analysis.push({
      scenario: `${points} Points`,
      points,
      rate: parseFloat(rate.toFixed(4)),
      payment: parseFloat(payment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalCost: parseFloat(pointCost.toFixed(2)),
      netSavings: parseFloat(netSavings.toFixed(2)),
      breakEvenMonths: Math.ceil(breakEvenMonths)
    });
  }
  
  return analysis;
}

function generateSensitivityMatrix(inputs: MortgagePointsInputs): any[] {
  const variables = ['baseInterestRate', 'loanTerm', 'borrowerTaxRate'];
  const matrix = [];
  
  for (const variable of variables) {
    const values = [];
    const impacts = [];
    
    // Generate test values
    for (let i = -0.02; i <= 0.02; i += 0.005) {
      let testValue = inputs[variable as keyof MortgagePointsInputs] as number;
      if (variable === 'baseInterestRate') {
        testValue = Math.max(0, testValue + i);
      } else if (variable === 'loanTerm') {
        testValue = Math.max(1, testValue + i * 12);
      } else if (variable === 'borrowerTaxRate') {
        testValue = Math.max(0, Math.min(100, testValue + i * 100));
      }
      
      values.push(testValue);
      
      // Calculate impact on break-even point
      const rate = testValue - (inputs.discountPoints * 0.0025);
      const monthlyRate = rate / 12;
      const totalPayments = inputs.loanTerm * 12;
      const payment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
      const basePayment = (inputs.loanAmount * (testValue / 12) * Math.pow(1 + (testValue / 12), totalPayments)) /
                         (Math.pow(1 + (testValue / 12), totalPayments) - 1);
      const savings = basePayment - payment;
      const breakEven = (inputs.discountPoints / 100 * inputs.loanAmount) / savings;
      
      impacts.push(Math.ceil(breakEven));
    }
    
    matrix.push({
      variable,
      values,
      impacts
    });
  }
  
  return matrix;
}

function generateScenarios(inputs: MortgagePointsInputs): any[] {
  const scenarios = [
    {
      scenario: 'Base Case',
      probability: 0.5,
      points: inputs.discountPoints,
      rate: inputs.baseInterestRate - (inputs.discountPoints * 0.0025),
      savings: (inputs.discountPoints / 100 * inputs.loanAmount) * 0.1
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      points: inputs.discountPoints,
      rate: inputs.baseInterestRate - (inputs.discountPoints * 0.0025) - 0.01,
      savings: (inputs.discountPoints / 100 * inputs.loanAmount) * 0.15
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      points: inputs.discountPoints,
      rate: inputs.baseInterestRate - (inputs.discountPoints * 0.0025) + 0.01,
      savings: (inputs.discountPoints / 100 * inputs.loanAmount) * 0.05
    }
  ];
  
  return scenarios;
}

function generateAmortizationComparison(inputs: MortgagePointsInputs, basePayment: number, withPointsPayment: number): any[] {
  const comparison = [];
  const monthlyRate = (inputs.baseInterestRate - (inputs.discountPoints * 0.0025)) / 12;
  const baseMonthlyRate = inputs.baseInterestRate / 12;
  
  for (let i = 1; i <= Math.min(60, inputs.loanTerm * 12); i++) {
    const date = new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const savings = basePayment - withPointsPayment;
    const cumulativeSavings = savings * i;
    
    comparison.push({
      paymentNumber: i,
      date,
      noPointsPayment: parseFloat(basePayment.toFixed(2)),
      withPointsPayment: parseFloat(withPointsPayment.toFixed(2)),
      savings: parseFloat(savings.toFixed(2)),
      cumulativeSavings: parseFloat(cumulativeSavings.toFixed(2))
    });
  }
  
  return comparison;
}

function calculateRiskScore(inputs: MortgagePointsInputs): number {
  let score = 0;
  
  // Break-even point risk
  const breakEvenMonths = (inputs.discountPoints / 100 * inputs.loanAmount) / 
                         ((inputs.discountPoints * 0.0025 * inputs.loanAmount / 12));
  if (breakEvenMonths > 60) score += 3;
  else if (breakEvenMonths > 36) score += 2;
  else if (breakEvenMonths > 24) score += 1;
  
  // Loan term risk
  if (inputs.loanTerm < 10) score += 2;
  else if (inputs.loanTerm < 15) score += 1;
  
  // Market condition risk
  if (inputs.marketCondition === 'declining') score += 2;
  else if (inputs.marketCondition === 'stable') score += 1;
  
  // Borrower risk
  if (inputs.borrowerCreditScore < 680) score += 2;
  else if (inputs.borrowerCreditScore < 720) score += 1;
  
  if (inputs.borrowerDebtToIncomeRatio > 0.43) score += 2;
  else if (inputs.borrowerDebtToIncomeRatio > 0.36) score += 1;
  
  return Math.min(score, 10);
}

function calculateProbabilityOfBenefit(inputs: MortgagePointsInputs, breakEvenMonths: number): number {
  // Base probability based on break-even point
  let probability = 0.8;
  
  if (breakEvenMonths > 60) probability = 0.3;
  else if (breakEvenMonths > 36) probability = 0.5;
  else if (breakEvenMonths > 24) probability = 0.7;
  
  // Adjust based on loan term
  if (inputs.loanTerm < 10) probability *= 0.5;
  else if (inputs.loanTerm < 15) probability *= 0.7;
  
  // Adjust based on market conditions
  if (inputs.marketCondition === 'declining') probability *= 0.6;
  else if (inputs.marketCondition === 'growing') probability *= 1.2;
  
  return Math.min(probability, 1);
}

function calculateWorstCaseScenario(inputs: MortgagePointsInputs): number {
  // Worst case: refinance early, lose all point benefits
  return -(inputs.discountPoints / 100 * inputs.loanAmount);
}

function calculateBestCaseScenario(inputs: MortgagePointsInputs): number {
  // Best case: keep loan for full term, maximum savings
  const rate = inputs.baseInterestRate - (inputs.discountPoints * 0.0025);
  const monthlyRate = rate / 12;
  const totalPayments = inputs.loanTerm * 12;
  const payment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                 (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const basePayment = (inputs.loanAmount * (inputs.baseInterestRate / 12) * Math.pow(1 + (inputs.baseInterestRate / 12), totalPayments)) /
                     (Math.pow(1 + (inputs.baseInterestRate / 12), totalPayments) - 1);
  const totalSavings = (basePayment - payment) * totalPayments;
  const pointCost = inputs.discountPoints / 100 * inputs.loanAmount;
  
  return totalSavings - pointCost;
}

function generateAnalysis(inputs: MortgagePointsInputs, metrics: any): any {
  return {
    pointsRating: getPointsRating(metrics.totalPoints, metrics.breakEvenMonths),
    valueRating: getValueRating(metrics.returnOnInvestment, metrics.breakEvenMonths),
    recommendation: getRecommendation(metrics.breakEvenMonths, metrics.returnOnInvestment, metrics.riskScore),
    keyStrengths: getKeyStrengths(inputs, metrics),
    keyWeaknesses: getKeyWeaknesses(inputs, metrics),
    valueFactors: getValueFactors(inputs, metrics),
    opportunities: getOpportunities(inputs, metrics),
    pointsSummary: `${metrics.totalPoints} points costing $${metrics.totalPointCost.toFixed(2)}`,
    costAnalysis: `Point cost represents ${((metrics.totalPointCost / inputs.loanAmount) * 100).toFixed(2)}% of loan amount`,
    savingsAnalysis: `Total interest savings of $${metrics.interestSavings.toFixed(2)} over ${inputs.loanTerm} years`,
    breakEvenSummary: `Break-even point reached in ${Math.ceil(metrics.breakEvenMonths)} months`,
    timelineAnalysis: `Points pay for themselves in ${Math.ceil(metrics.breakEvenMonths / 12)} years`,
    riskAnalysis: `Risk score of ${metrics.riskScore}/10`,
    taxSummary: `Tax deduction of $${(metrics.totalPointCost * (inputs.borrowerTaxRate / 100)).toFixed(2)}`,
    deductionAnalysis: `After-tax cost of $${(metrics.totalPointCost * (1 - inputs.borrowerTaxRate / 100)).toFixed(2)}`,
    afterTaxAnalysis: `After-tax savings of $${(metrics.interestSavings - metrics.totalPointCost * (1 - inputs.borrowerTaxRate / 100)).toFixed(2)}`,
    roiSummary: `Return on investment of ${metrics.returnOnInvestment.toFixed(2)}%`,
    investmentAnalysis: `NPV of $${metrics.netPresentValue.toFixed(2)}`,
    returnAnalysis: `IRR of ${(metrics.internalRateOfReturn * 100).toFixed(2)}%`,
    comparisonSummary: 'Comparison of different point options',
    scenarioAnalysis: 'Analysis of different market scenarios',
    optionAnalysis: 'Analysis of different point options',
    riskAssessment: `Risk score of ${metrics.riskScore}/10`,
    marketRisk: `Market condition: ${inputs.marketCondition}`,
    timingRisk: `Break-even point: ${Math.ceil(metrics.breakEvenMonths)} months`,
    refinanceRisk: 'Risk of refinancing before break-even point',
    marketAnalysis: `Property located in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions`,
    competitiveAnalysis: 'Competitive analysis of point options',
    marketPosition: 'Market position analysis',
    purchaseRecommendations: getPurchaseRecommendations(inputs, metrics),
    optimizationSuggestions: getOptimizationSuggestions(inputs, metrics),
    riskMitigation: getRiskMitigation(inputs, metrics),
    implementationPlan: 'Implementation plan for purchasing points',
    nextSteps: ['Evaluate point options', 'Consider tax implications', 'Assess break-even timeline'],
    timeline: 'Timeline for point purchase decision',
    monitoringPlan: 'Plan for monitoring point performance',
    keyMetrics: ['Break-even point', 'Total savings', 'ROI', 'Risk score'],
    reviewSchedule: 'Annual review of point performance',
    riskManagement: 'Risk management strategies for points',
    mitigationStrategies: ['Monitor refinancing opportunities', 'Track market conditions', 'Review tax implications'],
    contingencyPlans: ['Refinancing options', 'Tax planning', 'Market timing'],
    performanceBenchmarks: [
      { metric: 'Break-even Point', target: metrics.breakEvenMonths, benchmark: 36, industry: 'Industry Average' },
      { metric: 'ROI', target: metrics.returnOnInvestment, benchmark: 15, industry: 'Industry Average' }
    ],
    decisionRecommendation: getDecisionRecommendation(metrics.breakEvenMonths, metrics.returnOnInvestment, metrics.riskScore),
    presentationPoints: ['Point cost', 'Interest savings', 'Break-even analysis', 'Tax benefits'],
    decisionFactors: ['Loan term', 'Interest rate', 'Tax rate', 'Market conditions']
  };
}

function getPointsRating(points: number, breakEvenMonths: number): string {
  if (points <= 1 && breakEvenMonths <= 24) return 'Excellent';
  if (points <= 2 && breakEvenMonths <= 36) return 'Good';
  if (points <= 3 && breakEvenMonths <= 48) return 'Average';
  if (points <= 4 && breakEvenMonths <= 60) return 'Poor';
  return 'Very Poor';
}

function getValueRating(roi: number, breakEvenMonths: number): string {
  if (roi > 20 && breakEvenMonths <= 24) return 'High Value';
  if (roi > 15 && breakEvenMonths <= 36) return 'Good Value';
  if (roi > 10 && breakEvenMonths <= 48) return 'Moderate Value';
  if (roi > 5 && breakEvenMonths <= 60) return 'Low Value';
  return 'No Value';
}

function getRecommendation(breakEvenMonths: number, roi: number, riskScore: number): string {
  if (breakEvenMonths <= 24 && roi > 15 && riskScore <= 3) return 'Buy Points';
  if (breakEvenMonths <= 36 && roi > 10 && riskScore <= 5) return 'Consider Points';
  if (breakEvenMonths <= 48 && roi > 5 && riskScore <= 7) return 'Don\'t Buy Points';
  return 'Requires Review';
}

function getKeyStrengths(inputs: MortgagePointsInputs, metrics: any): string[] {
  const strengths = [];
  if (metrics.breakEvenMonths <= 24) strengths.push('Quick break-even point');
  if (metrics.returnOnInvestment > 15) strengths.push('High return on investment');
  if (inputs.loanTerm >= 15) strengths.push('Long loan term for maximum savings');
  if (inputs.borrowerTaxRate > 25) strengths.push('High tax rate for maximum deduction');
  return strengths;
}

function getKeyWeaknesses(inputs: MortgagePointsInputs, metrics: any): string[] {
  const weaknesses = [];
  if (metrics.breakEvenMonths > 48) weaknesses.push('Long break-even period');
  if (metrics.returnOnInvestment < 10) weaknesses.push('Low return on investment');
  if (inputs.loanTerm < 10) weaknesses.push('Short loan term limits savings');
  if (inputs.borrowerTaxRate < 20) weaknesses.push('Low tax rate limits deduction benefit');
  return weaknesses;
}

function getValueFactors(inputs: MortgagePointsInputs, metrics: any): string[] {
  const factors = [];
  if (inputs.loanTerm >= 15) factors.push('Long loan term maximizes savings');
  if (inputs.borrowerTaxRate > 25) factors.push('High tax rate maximizes deduction');
  if (inputs.marketCondition === 'stable') factors.push('Stable market reduces refinancing risk');
  if (inputs.borrowerCreditScore >= 720) factors.push('Good credit score reduces risk');
  return factors;
}

function getOpportunities(inputs: MortgagePointsInputs, metrics: any): string[] {
  const opportunities = [];
  if (inputs.marketCondition === 'growing') opportunities.push('Growing market may increase property value');
  if (inputs.borrowerTaxRate > 30) opportunities.push('High tax rate maximizes deduction benefit');
  if (inputs.loanTerm >= 20) opportunities.push('Long loan term maximizes interest savings');
  return opportunities;
}

function getPurchaseRecommendations(inputs: MortgagePointsInputs, metrics: any): string[] {
  const recommendations = [];
  if (metrics.breakEvenMonths <= 24) {
    recommendations.push('Points provide excellent value with quick break-even');
  }
  if (metrics.returnOnInvestment > 15) {
    recommendations.push('High ROI makes points a good investment');
  }
  if (inputs.loanTerm < 10) {
    recommendations.push('Consider shorter loan term or fewer points');
  }
  if (inputs.borrowerTaxRate < 20) {
    recommendations.push('Low tax rate limits deduction benefit');
  }
  return recommendations;
}

function getOptimizationSuggestions(inputs: MortgagePointsInputs, metrics: any): string[] {
  const suggestions = [];
  if (metrics.breakEvenMonths > 36) {
    suggestions.push('Consider fewer points for faster break-even');
  }
  if (inputs.borrowerTaxRate > 25) {
    suggestions.push('Maximize tax deduction by purchasing points');
  }
  if (inputs.loanTerm >= 20) {
    suggestions.push('Long loan term maximizes point benefits');
  }
  return suggestions;
}

function getRiskMitigation(inputs: MortgagePointsInputs, metrics: any): string[] {
  const mitigation = [];
  if (metrics.breakEvenMonths > 36) {
    mitigation.push('Monitor refinancing opportunities');
    mitigation.push('Consider shorter break-even options');
  }
  if (inputs.marketCondition === 'declining') {
    mitigation.push('Monitor market conditions');
    mitigation.push('Consider market timing');
  }
  if (inputs.borrowerDebtToIncomeRatio > 0.4) {
    mitigation.push('Monitor debt-to-income ratio');
    mitigation.push('Consider debt reduction strategies');
  }
  return mitigation;
}

function getDecisionRecommendation(breakEvenMonths: number, roi: number, riskScore: number): string {
  if (breakEvenMonths <= 24 && roi > 15 && riskScore <= 3) {
    return 'Strong recommendation to purchase points - excellent value and low risk';
  }
  if (breakEvenMonths <= 36 && roi > 10 && riskScore <= 5) {
    return 'Good recommendation to purchase points - good value and moderate risk';
  }
  if (breakEvenMonths <= 48 && roi > 5 && riskScore <= 7) {
    return 'Consider purchasing points - moderate value and moderate risk';
  }
  return 'Requires careful review - high risk or low value';
}
