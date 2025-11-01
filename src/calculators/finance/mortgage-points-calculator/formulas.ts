import { MortgagePointsInputs, MortgagePointsOutputs } from './types';

// Calculate the total cost of purchasing discount points
export function calculatePointsCost(inputs: MortgagePointsInputs): number {
  const discountPointsCost = inputs.discountPoints * (inputs.loanAmount * 0.01); // 1% of loan amount per point
  const originationPointsCost = inputs.originationPoints * (inputs.loanAmount * 0.01);
  return discountPointsCost + originationPointsCost - inputs.lenderCredits;
}

// Calculate monthly payment without points
export function calculateMonthlyPaymentWithoutPoints(
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  if (monthlyRate === 0) return loanAmount / numPayments;

  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

// Calculate monthly payment with points (lower interest rate)
export function calculateMonthlyPaymentWithPoints(
  loanAmount: number,
  baseRate: number,
  points: number,
  loanTerm: number
): number {
  // Each point typically reduces rate by 0.25%
  const rateReduction = points * 0.25;
  const adjustedRate = Math.max(0, baseRate - rateReduction);

  return calculateMonthlyPaymentWithoutPoints(loanAmount, adjustedRate, loanTerm);
}

// Calculate monthly savings from points
export function calculateMonthlySavings(inputs: MortgagePointsInputs): number {
  const paymentWithoutPoints = inputs.monthlyPaymentWithoutPoints ||
    calculateMonthlyPaymentWithoutPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.loanTerm);

  const paymentWithPoints = inputs.monthlyPaymentWithPoints ||
    calculateMonthlyPaymentWithPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.discountPoints, inputs.loanTerm);

  return paymentWithoutPoints - paymentWithPoints;
}

// Calculate breakeven period in months
export function calculateBreakevenPeriod(inputs: MortgagePointsInputs): number {
  const pointsCost = calculatePointsCost(inputs);
  const monthlySavings = calculateMonthlySavings(inputs);

  if (monthlySavings <= 0) return Infinity;

  return Math.ceil(pointsCost / monthlySavings);
}

// Calculate total savings over holding period
export function calculateTotalSavings(inputs: MortgagePointsInputs): number {
  const monthlySavings = calculateMonthlySavings(inputs);
  const totalMonths = Math.min(inputs.expectedHoldingPeriod * 12, inputs.loanTerm * 12);

  return monthlySavings * totalMonths;
}

// Calculate return on investment for points
export function calculateReturnOnInvestment(inputs: MortgagePointsInputs): number {
  const pointsCost = calculatePointsCost(inputs);
  const totalSavings = calculateTotalSavings(inputs);

  if (pointsCost <= 0) return 0;

  return ((totalSavings - pointsCost) / pointsCost) * 100;
}

// Calculate effective interest rate after points
export function calculateEffectiveRateWithPoints(inputs: MortgagePointsInputs): number {
  const rateReduction = inputs.discountPoints * 0.25; // 0.25% per point
  return Math.max(0, inputs.baseInterestRate - rateReduction);
}

// Calculate cost per basis point reduction
export function calculateCostPerBasisPoint(inputs: MortgagePointsInputs): number {
  const pointsCost = calculatePointsCost(inputs);
  const basisPointsReduced = inputs.discountPoints * 25; // 25 basis points per point

  if (basisPointsReduced <= 0) return 0;

  return pointsCost / basisPointsReduced;
}

// Generate break-even analysis
export function generateBreakEvenAnalysis(inputs: MortgagePointsInputs): MortgagePointsOutputs['breakEvenAnalysis'] {
  const monthsToBreakEven = calculateBreakevenPeriod(inputs);
  const yearsToBreakEven = monthsToBreakEven / 12;

  const monthlySavings = calculateMonthlySavings(inputs);
  const totalSavingsAtBreakEven = monthlySavings * monthsToBreakEven;

  const propertyValueAtBreakEven = inputs.propertyValue *
    Math.pow(1 + inputs.propertyAppreciationRate / 100, yearsToBreakEven);

  return {
    monthsToBreakEven,
    yearsToBreakEven,
    totalSavingsAtBreakEven,
    propertyValueAtBreakEven
  };
}

// Calculate cash flow impact
export function calculateCashFlowImpact(inputs: MortgagePointsInputs): MortgagePointsOutputs['cashFlowImpact'] {
  const monthlySavings = calculateMonthlySavings(inputs);

  // Assume cash flow is monthly income minus mortgage payment
  // This is a simplified calculation - in reality would need full financials
  const monthlyCashFlowWithoutPoints = 0; // Would need income data
  const monthlyCashFlowWithPoints = monthlySavings; // Simplified

  const annualCashFlowDifference = monthlySavings * 12;
  const totalCashFlowOverHoldingPeriod = monthlySavings * inputs.expectedHoldingPeriod * 12;

  return {
    monthlyCashFlowWithoutPoints,
    monthlyCashFlowWithPoints: monthlyCashFlowWithoutPoints + monthlySavings,
    annualCashFlowDifference,
    totalCashFlowOverHoldingPeriod
  };
}

// Generate comparison scenarios
export function generateComparisonScenarios(inputs: MortgagePointsInputs): MortgagePointsOutputs['comparisonScenarios'] {
  const scenarios = [];

  // No points scenario
  scenarios.push({
    scenario: 'No Points',
    pointsPurchased: 0,
    interestRate: inputs.baseInterestRate,
    monthlyPayment: calculateMonthlyPaymentWithoutPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.loanTerm),
    totalCost: calculateMonthlyPaymentWithoutPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.loanTerm) * inputs.loanTerm * 12,
    netSavings: 0
  });

  // Current points scenario
  const withPointsPayment = calculateMonthlyPaymentWithPoints(inputs.loanAmount, inputs.baseInterestRate, inputs.discountPoints, inputs.loanTerm);
  const withPointsTotalCost = withPointsPayment * inputs.loanTerm * 12 + calculatePointsCost(inputs);
  const noPointsTotalCost = scenarios[0].totalCost;

  scenarios.push({
    scenario: `${inputs.discountPoints} Points`,
    pointsPurchased: inputs.discountPoints,
    interestRate: calculateEffectiveRateWithPoints(inputs),
    monthlyPayment: withPointsPayment,
    totalCost: withPointsTotalCost,
    netSavings: noPointsTotalCost - withPointsTotalCost
  });

  // Alternative scenarios
  for (let points = 1; points <= 3; points++) {
    if (points === inputs.discountPoints) continue;

    const altPayment = calculateMonthlyPaymentWithPoints(inputs.loanAmount, inputs.baseInterestRate, points, inputs.loanTerm);
    const altPointsCost = points * (inputs.loanAmount * 0.01);
    const altTotalCost = altPayment * inputs.loanTerm * 12 + altPointsCost;

    scenarios.push({
      scenario: `${points} Point${points > 1 ? 's' : ''}`,
      pointsPurchased: points,
      interestRate: Math.max(0, inputs.baseInterestRate - points * 0.25),
      monthlyPayment: altPayment,
      totalCost: altTotalCost,
      netSavings: noPointsTotalCost - altTotalCost
    });
  }

  return scenarios;
}

// Generate recommendation
export function generateRecommendation(inputs: MortgagePointsInputs): MortgagePointsOutputs['recommendation'] {
  const breakevenMonths = calculateBreakevenPeriod(inputs);
  const holdingPeriodMonths = inputs.expectedHoldingPeriod * 12;
  const roi = calculateReturnOnInvestment(inputs);

  let recommendedPoints = 0;
  let rationale = '';

  if (breakevenMonths <= holdingPeriodMonths && roi > 10) {
    recommendedPoints = inputs.discountPoints;
    rationale = `Points are recommended. You break even in ${breakevenMonths} months and will save money over your ${inputs.expectedHoldingPeriod}-year holding period.`;
  } else if (breakevenMonths > holdingPeriodMonths) {
    recommendedPoints = 0;
    rationale = `Points are not recommended. You won't break even within your ${inputs.expectedHoldingPeriod}-year holding period (${breakevenMonths} months needed).`;
  } else {
    recommendedPoints = Math.min(inputs.discountPoints, 1);
    rationale = `Consider purchasing fewer points. The ROI of ${roi.toFixed(1)}% may not justify the full ${inputs.discountPoints} points purchased.`;
  }

  const alternativeOptions = [
    'Shop around for lenders offering points for lower cost',
    'Consider a longer loan term to reduce monthly payments',
    'Look for lenders offering lender credits instead of requiring points',
    'Consider an adjustable-rate mortgage if planning to move soon'
  ];

  const riskConsiderations = [
    'Interest rates may change, affecting the value of points',
    'If you sell/move sooner than expected, points may not pay off',
    'Credit score changes could affect future refinancing options',
    'Property value changes affect equity position'
  ];

  return {
    recommendedPoints,
    rationale,
    alternativeOptions,
    riskConsiderations
  };
}

// Main calculation function
export function calculateMortgagePoints(inputs: MortgagePointsInputs): MortgagePointsOutputs {
  const pointsCost = calculatePointsCost(inputs);
  const monthlySavings = calculateMonthlySavings(inputs);
  const annualSavings = monthlySavings * 12;
  const totalSavings = calculateTotalSavings(inputs);
  const breakevenPeriod = calculateBreakevenPeriod(inputs);
  const breakevenMonths = breakevenPeriod;
  const netBenefit = totalSavings - pointsCost;
  const effectiveRateWithPoints = calculateEffectiveRateWithPoints(inputs);
  const effectiveRateWithoutPoints = inputs.baseInterestRate;
  const rateReduction = inputs.baseInterestRate - effectiveRateWithPoints;
  const costPerBasisPoint = calculateCostPerBasisPoint(inputs);
  const returnOnInvestment = calculateReturnOnInvestment(inputs);

  const breakEvenAnalysis = generateBreakEvenAnalysis(inputs);
  const cashFlowImpact = calculateCashFlowImpact(inputs);
  const comparisonScenarios = generateComparisonScenarios(inputs);
  const recommendation = generateRecommendation(inputs);

  return {
    pointsCost,
    monthlySavings,
    annualSavings,
    totalSavings,
    breakevenPeriod,
    breakevenMonths,
    netBenefit,
    effectiveRateWithPoints,
    effectiveRateWithoutPoints,
    rateReduction,
    costPerBasisPoint,
    returnOnInvestment,
    breakEvenAnalysis,
    cashFlowImpact,
    comparisonScenarios,
    recommendation
  };
}