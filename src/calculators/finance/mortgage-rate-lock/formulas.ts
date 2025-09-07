import { MortgageRateLockInputs, MortgageRateLockMetrics, MortgageRateLockAnalysis } from './types';

export function calculateRateDifference(inputs: MortgageRateLockInputs): number {
  return inputs.currentMarketRate - inputs.lockedRate;
}

export function calculateRateSavings(inputs: MortgageRateLockInputs): number {
  const difference = calculateRateDifference(inputs);
  if (difference > 0) {
    return difference;
  }
  return 0;
}

export function calculateRateRisk(inputs: MortgageRateLockInputs): number {
  const difference = calculateRateDifference(inputs);
  if (difference < 0) {
    return Math.abs(difference);
  }
  return 0;
}

export function calculateEffectiveRate(inputs: MortgageRateLockInputs): number {
  return inputs.lockedRate;
}

export function calculateLockedPayment(inputs: MortgageRateLockInputs): number {
  const monthlyRate = inputs.lockedRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  return inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateCurrentPayment(inputs: MortgageRateLockInputs): number {
  const monthlyRate = inputs.currentMarketRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  return inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculatePaymentDifference(inputs: MortgageRateLockInputs): number {
  return calculateCurrentPayment(inputs) - calculateLockedPayment(inputs);
}

export function calculatePaymentSavings(inputs: MortgageRateLockInputs): number {
  const difference = calculatePaymentDifference(inputs);
  if (difference > 0) {
    return difference;
  }
  return 0;
}

export function calculateTotalInterestPaid(inputs: MortgageRateLockInputs): number {
  const monthlyPayment = calculateLockedPayment(inputs);
  const totalPayments = monthlyPayment * inputs.loanTerm * 12;
  return totalPayments - inputs.loanAmount;
}

export function calculateInterestSavings(inputs: MortgageRateLockInputs): number {
  const lockedInterest = calculateTotalInterestPaid(inputs);
  const currentInterest = calculateCurrentPayment(inputs) * inputs.loanTerm * 12 - inputs.loanAmount;
  return currentInterest - lockedInterest;
}

export function calculateLockCost(inputs: MortgageRateLockInputs): number {
  if (inputs.lockFeeType === 'percentage') {
    return inputs.loanAmount * (inputs.lockFee / 100);
  } else if (inputs.lockFeeType === 'fixed') {
    return inputs.lockFee;
  }
  return 0;
}

export function calculateNetSavings(inputs: MortgageRateLockInputs): number {
  const paymentSavings = calculatePaymentSavings(inputs);
  const lockCost = calculateLockCost(inputs);
  return paymentSavings - lockCost;
}

export function calculateLockRemainingDays(inputs: MortgageRateLockInputs): number {
  const lockDate = new Date(inputs.lockDate);
  const expirationDate = new Date(inputs.lockExpirationDate);
  const today = new Date();

  if (today > expirationDate) {
    return 0;
  }

  const diffTime = expirationDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateLockExpirationRisk(inputs: MortgageRateLockInputs): number {
  const remainingDays = calculateLockRemainingDays(inputs);
  const totalLockDays = inputs.lockDuration;

  if (remainingDays <= 0) {
    return 100;
  }

  return Math.max(0, (1 - remainingDays / totalLockDays) * 100);
}

export function calculateExtensionCost(inputs: MortgageRateLockInputs): number {
  if (inputs.closingDelay <= 0) {
    return 0;
  }

  if (inputs.extensionFeeType === 'percentage') {
    return inputs.loanAmount * (inputs.extensionFee / 100);
  } else if (inputs.extensionFeeType === 'fixed') {
    return inputs.extensionFee;
  } else if (inputs.extensionFeeType === 'daily') {
    return inputs.extensionFee * inputs.closingDelay;
  }

  return 0;
}

export function calculateBreakEvenPoint(inputs: MortgageRateLockInputs): number {
  const lockCost = calculateLockCost(inputs);
  const monthlySavings = calculatePaymentSavings(inputs);

  if (monthlySavings <= 0) {
    return Infinity;
  }

  return lockCost / monthlySavings;
}

export function calculateRiskScore(inputs: MortgageRateLockInputs): number {
  let score = 0;

  // Expiration risk
  const expirationRisk = calculateLockExpirationRisk(inputs);
  score += expirationRisk * 0.4;

  // Rate risk
  const rateRisk = calculateRateRisk(inputs);
  score += Math.min(rateRisk * 10, 30);

  // Market volatility risk
  score += inputs.marketVolatility * 0.3;

  // Borrower risk factors
  if (inputs.borrowerCreditScore < 620) {
    score += 20;
  } else if (inputs.borrowerCreditScore < 740) {
    score += 10;
  }

  if (inputs.borrowerDebtToIncomeRatio > 43) {
    score += 15;
  }

  return Math.min(100, score);
}

export function calculateProbabilityOfExpiration(inputs: MortgageRateLockInputs): number {
  const remainingDays = calculateLockRemainingDays(inputs);
  const closingDelay = inputs.closingDelay;

  if (remainingDays <= 0) {
    return 100;
  }

  if (closingDelay > remainingDays) {
    return 100;
  }

  // Estimate based on typical closing delays
  const riskFactor = closingDelay / remainingDays;
  return Math.min(100, riskFactor * 100);
}

export function calculateProbabilityOfRateIncrease(inputs: MortgageRateLockInputs): number {
  if (inputs.rateTrend === 'rising') {
    return 70;
  } else if (inputs.rateTrend === 'volatile') {
    return 50;
  } else if (inputs.rateTrend === 'stable') {
    return 30;
  } else {
    return 10;
  }
}

export function calculateProbabilityOfRateDecrease(inputs: MortgageRateLockInputs): number {
  if (inputs.rateTrend === 'falling') {
    return 70;
  } else if (inputs.rateTrend === 'volatile') {
    return 50;
  } else if (inputs.rateTrend === 'stable') {
    return 30;
  } else {
    return 10;
  }
}

export function calculateLockValue(inputs: MortgageRateLockInputs): number {
  const paymentSavings = calculatePaymentSavings(inputs);
  const lockCost = calculateLockCost(inputs);
  const remainingDays = calculateLockRemainingDays(inputs);
  const totalLockDays = inputs.lockDuration;

  if (remainingDays <= 0 || paymentSavings <= 0) {
    return 0;
  }

  const valuePerDay = paymentSavings / 30; // Monthly savings converted to daily
  const remainingValue = valuePerDay * remainingDays;
  const netValue = remainingValue - lockCost;

  return Math.max(0, netValue);
}

export function calculateLockValuePerDay(inputs: MortgageRateLockInputs): number {
  const lockValue = calculateLockValue(inputs);
  const remainingDays = calculateLockRemainingDays(inputs);

  if (remainingDays <= 0) {
    return 0;
  }

  return lockValue / remainingDays;
}

export function calculateLockValuePerMonth(inputs: MortgageRateLockInputs): number {
  return calculateLockValuePerDay(inputs) * 30;
}

export function calculateLockValuePerYear(inputs: MortgageRateLockInputs): number {
  return calculateLockValuePerDay(inputs) * 365;
}

export function calculateSensitivityMatrix(inputs: MortgageRateLockInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Rate change sensitivity
  const rateValues = [inputs.currentMarketRate - 0.5, inputs.currentMarketRate, inputs.currentMarketRate + 0.5];
  const rateImpacts = rateValues.map(rate => {
    const testInputs = { ...inputs, currentMarketRate: rate };
    return calculatePaymentSavings(testInputs) - calculatePaymentSavings(inputs);
  });

  matrix.push({
    variable: 'Market Rate',
    values: rateValues,
    impacts: rateImpacts
  });

  // Closing delay sensitivity
  const delayValues = [0, 15, 30, 60];
  const delayImpacts = delayValues.map(delay => {
    const testInputs = { ...inputs, closingDelay: delay };
    return calculateExtensionCost(testInputs) - calculateExtensionCost(inputs);
  });

  matrix.push({
    variable: 'Closing Delay',
    values: delayValues,
    impacts: delayImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: MortgageRateLockInputs): Array<{
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
    probability: 0.4,
    rate: inputs.currentMarketRate,
    payment: calculateCurrentPayment(inputs),
    savings: calculatePaymentSavings(inputs)
  });

  // Rate increase scenario
  const rateIncrease = inputs.currentMarketRate + 0.5;
  const rateIncreaseInputs = { ...inputs, currentMarketRate: rateIncrease };
  scenarios.push({
    scenario: 'Rate +0.5%',
    probability: calculateProbabilityOfRateIncrease(inputs) / 100,
    rate: rateIncrease,
    payment: calculateCurrentPayment(rateIncreaseInputs),
    savings: calculatePaymentSavings(rateIncreaseInputs)
  });

  // Rate decrease scenario
  const rateDecrease = Math.max(0, inputs.currentMarketRate - 0.5);
  const rateDecreaseInputs = { ...inputs, currentMarketRate: rateDecrease };
  scenarios.push({
    scenario: 'Rate -0.5%',
    probability: calculateProbabilityOfRateDecrease(inputs) / 100,
    rate: rateDecrease,
    payment: calculateCurrentPayment(rateDecreaseInputs),
    savings: calculatePaymentSavings(rateDecreaseInputs)
  });

  // Expiration scenario
  scenarios.push({
    scenario: 'Lock Expires',
    probability: calculateProbabilityOfExpiration(inputs) / 100,
    rate: inputs.currentMarketRate + 1, // Assume 1% increase if lock expires
    payment: calculateCurrentPayment({ ...inputs, currentMarketRate: inputs.currentMarketRate + 1 }),
    savings: 0
  });

  return scenarios;
}

export function calculateTimelineAnalysis(inputs: MortgageRateLockInputs): Array<{
  date: string;
  event: string;
  rate: number;
  payment: number;
  cost: number;
}> {
  const analysis = [];
  const lockDate = new Date(inputs.lockDate);
  const expirationDate = new Date(inputs.lockExpirationDate);
  const estimatedClosing = new Date(inputs.estimatedClosingDate);

  // Lock date
  analysis.push({
    date: inputs.lockDate,
    event: 'Rate Locked',
    rate: inputs.lockedRate,
    payment: calculateLockedPayment(inputs),
    cost: calculateLockCost(inputs)
  });

  // Mid-lock check
  const midDate = new Date(lockDate.getTime() + (expirationDate.getTime() - lockDate.getTime()) / 2);
  analysis.push({
    date: midDate.toISOString().split('T')[0],
    event: 'Mid-Lock Review',
    rate: inputs.lockedRate,
    payment: calculateLockedPayment(inputs),
    cost: calculateLockCost(inputs)
  });

  // Expiration date
  analysis.push({
    date: inputs.lockExpirationDate,
    event: 'Lock Expires',
    rate: inputs.lockedRate,
    payment: calculateLockedPayment(inputs),
    cost: calculateLockCost(inputs) + calculateExtensionCost(inputs)
  });

  // Estimated closing
  analysis.push({
    date: inputs.estimatedClosingDate,
    event: 'Estimated Closing',
    rate: inputs.lockedRate,
    payment: calculateLockedPayment(inputs),
    cost: calculateLockCost(inputs) + calculateExtensionCost(inputs)
  });

  return analysis;
}

export function calculateComparisonAnalysis(inputs: MortgageRateLockInputs): Array<{
  option: string;
  rate: number;
  payment: number;
  totalCost: number;
  risk: string;
}> {
  const analysis = [];

  // Locked rate option
  analysis.push({
    option: 'Locked Rate',
    rate: inputs.lockedRate,
    payment: calculateLockedPayment(inputs),
    totalCost: calculateTotalInterestPaid(inputs) + calculateLockCost(inputs),
    risk: 'Low'
  });

  // Current market rate option
  analysis.push({
    option: 'Current Market Rate',
    rate: inputs.currentMarketRate,
    payment: calculateCurrentPayment(inputs),
    totalCost: calculateCurrentPayment(inputs) * inputs.loanTerm * 12 - inputs.loanAmount,
    risk: 'Medium'
  });

  // Float until closing option
  analysis.push({
    option: 'Float Until Closing',
    rate: inputs.currentMarketRate + 0.25, // Assume slight increase
    payment: calculateCurrentPayment({ ...inputs, currentMarketRate: inputs.currentMarketRate + 0.25 }),
    totalCost: calculateCurrentPayment({ ...inputs, currentMarketRate: inputs.currentMarketRate + 0.25 }) * inputs.loanTerm * 12 - inputs.loanAmount,
    risk: 'High'
  });

  return analysis;
}

export function calculateBreakEvenAnalysis(inputs: MortgageRateLockInputs): Array<{
  days: number;
  rateIncrease: number;
  breakEvenRate: number;
  savings: number;
}> {
  const analysis = [];
  const lockCost = calculateLockCost(inputs);
  const monthlySavings = calculatePaymentSavings(inputs);

  if (monthlySavings <= 0) {
    return analysis;
  }

  const breakEvenMonths = lockCost / monthlySavings;
  const breakEvenDays = breakEvenMonths * 30;

  for (let days = 30; days <= 365; days += 30) {
    const rateIncrease = (lockCost / days) / (calculateLockedPayment(inputs) / 30) * 100;
    const breakEvenRate = inputs.lockedRate + rateIncrease;
    const savings = monthlySavings * (days / 30) - lockCost;

    analysis.push({
      days,
      rateIncrease,
      breakEvenRate,
      savings
    });
  }

  return analysis;
}

export function generateMortgageRateLockAnalysis(inputs: MortgageRateLockInputs, metrics: MortgageRateLockMetrics): MortgageRateLockAnalysis {
  const rateDifference = calculateRateDifference(inputs);
  const riskScore = calculateRiskScore(inputs);
  const lockValue = calculateLockValue(inputs);

  let lockRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (lockValue > 10000) lockRating = 'Excellent';
  else if (lockValue > 5000) lockRating = 'Good';
  else if (lockValue > 1000) lockRating = 'Average';
  else if (lockValue > 0) lockRating = 'Poor';
  else lockRating = 'Very Poor';

  let valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  if (lockValue > 5000) valueRating = 'High Value';
  else if (lockValue > 2000) valueRating = 'Good Value';
  else if (lockValue > 500) valueRating = 'Moderate Value';
  else if (lockValue > 0) valueRating = 'Low Value';
  else valueRating = 'No Value';

  const recommendation = rateDifference > 0 ? 'Maintain Lock' : rateDifference < -0.5 ? 'Consider Extension' : 'Let Expire';

  return {
    lockRating,
    valueRating,
    recommendation,
    keyStrengths: [
      `Rate savings: ${metrics.rateSavings.toFixed(2)}%`,
      `Payment savings: $${metrics.paymentSavings.toLocaleString()}`,
      `Lock value: $${lockValue.toLocaleString()}`
    ],
    keyWeaknesses: [
      riskScore > 50 ? 'High risk profile' : 'Acceptable risk profile',
      metrics.lockExpirationRisk > 50 ? 'High expiration risk' : 'Low expiration risk'
    ],
    riskFactors: [
      `Expiration risk: ${metrics.lockExpirationRisk.toFixed(1)}%`,
      `Rate risk: ${metrics.rateRisk.toFixed(2)}%`,
      `Market volatility: ${inputs.marketVolatility.toFixed(1)}%`
    ],
    opportunities: [
      'Rate monitoring and optimization',
      'Extension strategy planning',
      'Market timing opportunities'
    ],
    lockSummary: `Rate lock analysis shows ${lockRating.toLowerCase()} rating with ${valueRating.toLowerCase()} and ${recommendation.toLowerCase()} recommendation.`,
    rateAnalysis: `Current market rate of ${inputs.currentMarketRate}% compared to locked rate of ${inputs.lockedRate}% (${rateDifference > 0 ? 'favorable' : 'unfavorable'} difference of ${Math.abs(rateDifference).toFixed(2)}%).`,
    valueAnalysis: `Lock provides $${lockValue.toLocaleString()} in value with $${metrics.netSavings.toLocaleString()} net savings over ${inputs.analysisPeriod} year analysis period.`,
    riskAssessment: `Overall risk score of ${riskScore} with ${metrics.probabilityOfExpiration.toFixed(1)}% probability of expiration.`,
    expirationRisk: `Lock expires in ${metrics.lockRemainingDays} days with ${metrics.lockExpirationRisk.toFixed(1)}% risk of expiration.`,
    rateRisk: `Rate risk assessment of ${metrics.rateRisk.toFixed(2)}% based on market conditions and rate trends.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions and ${inputs.marketVolatility.toFixed(1)}% volatility.`,
    costSummary: `Total lock cost of $${metrics.lockCost.toLocaleString()} with break-even point at ${metrics.breakEvenPoint.toFixed(1)} months.`,
    savingsAnalysis: `Monthly payment savings of $${metrics.paymentSavings.toLocaleString()} and total interest savings of $${metrics.interestSavings.toLocaleString()}.`,
    breakEvenAnalysis: `Break-even analysis shows ${metrics.breakEvenPoint < inputs.loanTerm * 12 ? 'favorable' : 'unfavorable'} economics with ${metrics.breakEvenPoint.toFixed(1)} month break-even period.`,
    marketAnalysis: `Market analysis indicates ${inputs.rateTrend} rate trend with ${inputs.marketVolatility.toFixed(1)}% volatility in ${inputs.marketCondition} conditions.`,
    rateTrendAnalysis: `Rate trend analysis shows ${inputs.rateTrend} conditions with ${calculateProbabilityOfRateIncrease(inputs).toFixed(1)}% probability of rate increase.`,
    volatilityAnalysis: `Market volatility analysis indicates ${inputs.marketVolatility < 0.5 ? 'low' : inputs.marketVolatility < 1 ? 'moderate' : 'high'} volatility environment.`,
    timelineSummary: `Timeline analysis covers ${metrics.lockRemainingDays} days remaining until lock expiration.`,
    expirationAnalysis: `Expiration analysis shows ${metrics.probabilityOfExpiration.toFixed(1)}% probability of expiration with ${metrics.extensionCost.toLocaleString()} extension cost.`,
    extensionAnalysis: `Extension analysis recommends ${metrics.extensionCost > lockValue ? 'avoiding' : 'considering'} extension based on cost-benefit analysis.`,
    lockRecommendations: [
      rateDifference > 0 ? 'Maintain current lock - favorable rate achieved' : 'Monitor market rates closely',
      metrics.lockRemainingDays < 30 ? 'Consider extension or closing acceleration' : 'Continue with current lock strategy'
    ],
    extensionRecommendations: [
      'Evaluate extension costs vs. market rate changes',
      'Consider closing timeline acceleration',
      'Monitor market conditions for optimal timing'
    ],
    optimizationSuggestions: [
      'Regular rate monitoring and market analysis',
      'Timeline optimization for closing',
      'Cost-benefit analysis of extension options'
    ],
    implementationPlan: `Lock management plan includes monitoring for ${metrics.lockRemainingDays} days with ${recommendation.toLowerCase()} as primary strategy.`,
    nextSteps: [
      'Monitor market rate changes daily',
      'Track lock expiration timeline',
      'Evaluate extension options if needed',
      'Prepare for closing timeline'
    ],
    timeline: `${inputs.analysisPeriod} year analysis period with lock expiring in ${metrics.lockRemainingDays} days.`,
    monitoringPlan: 'Daily rate monitoring and weekly risk assessment.',
    keyMetrics: [
      'Market rate changes',
      'Lock expiration timeline',
      'Extension costs',
      'Payment savings'
    ],
    reviewSchedule: 'Daily market review and weekly strategy assessment.',
    riskManagement: `Risk management includes monitoring ${metrics.riskScore} risk score and ${metrics.probabilityOfExpiration.toFixed(1)}% expiration probability.`,
    mitigationStrategies: [
      'Regular market rate monitoring',
      'Extension cost analysis',
      'Timeline acceleration options',
      'Alternative financing contingency'
    ],
    contingencyPlans: [
      'Extension strategy if rates remain favorable',
      'Closing acceleration if lock expires',
      'Alternative rate lock options',
      'Market rate acceptance if lock expires'
    ],
    performanceBenchmarks: [
      {
        metric: 'Lock Value',
        target: 5000,
        benchmark: lockValue,
        industry: 'Mortgage Rate Lock'
      },
      {
        metric: 'Risk Score',
        target: 30,
        benchmark: riskScore,
        industry: 'Mortgage Rate Lock'
      },
      {
        metric: 'Break-Even Period',
        target: 24,
        benchmark: metrics.breakEvenPoint,
        industry: 'Mortgage Rate Lock'
      }
    ],
    decisionRecommendation: `${recommendation} with ${lockRating.toLowerCase()} lock rating and ${valueRating.toLowerCase()}.`,
    presentationPoints: [
      `Lock value: $${lockValue.toLocaleString()}`,
      `Risk score: ${riskScore}`,
      `Break-even: ${metrics.breakEvenPoint.toFixed(1)} months`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'Rate differential analysis',
      'Risk assessment',
      'Cost-benefit analysis',
      'Market condition review',
      'Timeline consideration'
    ]
  };
}