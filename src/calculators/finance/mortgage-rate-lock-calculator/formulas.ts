import { MortgageRateLockInputs, MortgageRateLockOutputs } from './types';

// Calculate days remaining in rate lock
export function calculateDaysRemaining(lockExpirationDate: string): number {
  const expiration = new Date(lockExpirationDate);
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

// Calculate lock status
export function calculateLockStatus(daysRemaining: number): 'Active' | 'Expired' | 'Expiring Soon' {
  if (daysRemaining <= 0) return 'Expired';
  if (daysRemaining <= 7) return 'Expiring Soon';
  return 'Active';
}

// Calculate rate lock value (potential savings)
export function calculateRateLockValue(
  lockedRate: number,
  currentMarketRate: number,
  loanAmount: number,
  loanTerm: number
): number {
  const rateDifference = currentMarketRate - lockedRate; // positive means locked rate is better
  if (rateDifference <= 0) return 0;

  // Calculate monthly payment difference over loan term
  const monthlyRateLocked = lockedRate / 100 / 12;
  const monthlyRateMarket = currentMarketRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyPaymentLocked = loanAmount * (monthlyRateLocked * Math.pow(1 + monthlyRateLocked, numPayments)) /
                               (Math.pow(1 + monthlyRateLocked, numPayments) - 1);

  const monthlyPaymentMarket = loanAmount * (monthlyRateMarket * Math.pow(1 + monthlyRateMarket, numPayments)) /
                               (Math.pow(1 + monthlyRateMarket, numPayments) - 1);

  const monthlySavings = monthlyPaymentMarket - monthlyPaymentLocked;
  const totalSavings = monthlySavings * numPayments;

  return totalSavings;
}

// Calculate potential savings if rates move
export function calculatePotentialSavings(
  inputs: MortgageRateLockInputs,
  expectedRateChange: number // basis points
): number {
  const newMarketRate = inputs.currentMarketRate + (expectedRateChange / 100);
  return calculateRateLockValue(inputs.lockedInterestRate, newMarketRate, inputs.loanAmount, 30); // Assume 30-year term
}

// Calculate risk assessment
export function calculateRiskAssessment(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['riskAssessment'] {
  const daysRemaining = calculateDaysRemaining(inputs.lockExpirationDate);

  // Rate increase risk
  let rateIncreaseRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.marketVolatility === 'High' || inputs.expectedRateMovement > 50) {
    rateIncreaseRisk = 'High';
  } else if (inputs.marketVolatility === 'Medium' || inputs.expectedRateMovement > 25) {
    rateIncreaseRisk = 'Medium';
  }

  // Lock break risk
  let lockBreakRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (daysRemaining < 30) {
    lockBreakRisk = 'High';
  } else if (daysRemaining < 60) {
    lockBreakRisk = 'Medium';
  }

  // Market timing risk
  let marketTimingRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.historicalRateData.volatilityIndex > 70) {
    marketTimingRisk = 'High';
  } else if (inputs.historicalRateData.volatilityIndex > 40) {
    marketTimingRisk = 'Medium';
  }

  // Overall risk
  const riskScores = { Low: 1, Medium: 2, High: 3 };
  const averageRisk = (riskScores[rateIncreaseRisk] + riskScores[lockBreakRisk] + riskScores[marketTimingRisk]) / 3;

  let overallRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (averageRisk >= 2.5) overallRisk = 'High';
  else if (averageRisk >= 1.5) overallRisk = 'Medium';

  return {
    rateIncreaseRisk,
    lockBreakRisk,
    marketTimingRisk,
    overallRisk
  };
}

// Calculate break-even analysis
export function calculateBreakEvenAnalysis(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['breakEvenAnalysis'] {
  const totalLockCost = inputs.rateLockCost - inputs.lenderCredit;
  const loanTerm = 30; // Assume 30-year loan for break-even calculation

  // Calculate break-even rate difference (basis points)
  const monthlyRate = inputs.lockedInterestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  // Simplified: break-even when savings equal cost
  // This is an approximation - actual calculation would be more complex
  const breakEvenRateIncrease = (totalLockCost * 12) / (inputs.loanAmount * loanTerm) * 100 * 100; // Convert to basis points

  const breakEvenDays = Math.ceil(totalLockCost / (calculatePotentialSavings(inputs, 25) / 365)); // Daily savings estimate

  return {
    breakEvenDays,
    breakEvenRate: inputs.lockedInterestRate + (breakEvenRateIncrease / 100),
    currentValue: calculateRateLockValue(inputs.lockedInterestRate, inputs.currentMarketRate, inputs.loanAmount, loanTerm),
    projectedValue: calculatePotentialSavings(inputs, inputs.expectedRateMovement)
  };
}

// Generate alternative scenarios
export function generateAlternativeScenarios(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['alternativeScenarios'] {
  const scenarios = [];

  // Current lock scenario
  scenarios.push({
    scenario: 'Current Lock',
    lockPeriod: inputs.lockPeriod,
    projectedRate: inputs.lockedInterestRate,
    cost: inputs.rateLockCost,
    value: calculateRateLockValue(inputs.lockedInterestRate, inputs.currentMarketRate, inputs.loanAmount, 30),
    recommendation: 'Maintain current lock if comfortable with terms'
  });

  // Alternative lock periods
  inputs.alternativeRateLockPeriods.forEach(period => {
    const periodMultiplier = period / inputs.lockPeriod;
    const adjustedCost = inputs.rateLockCost * periodMultiplier;

    scenarios.push({
      scenario: `${period}-Day Lock`,
      lockPeriod: period,
      projectedRate: inputs.lockedInterestRate,
      cost: adjustedCost,
      value: calculateRateLockValue(inputs.lockedInterestRate, inputs.currentMarketRate, inputs.loanAmount, 30),
      recommendation: period > inputs.lockPeriod ? 'Longer lock for peace of mind' : 'Shorter lock to reduce costs'
    });
  });

  // Float down option
  if (inputs.floatDownOption) {
    scenarios.push({
      scenario: 'Float Down Option',
      lockPeriod: inputs.lockPeriod,
      projectedRate: inputs.floatDownRate,
      cost: inputs.rateLockCost + 500, // Assume additional cost
      value: calculateRateLockValue(inputs.floatDownRate, inputs.currentMarketRate, inputs.loanAmount, 30),
      recommendation: 'Consider if rates drop significantly'
    });
  }

  // No lock scenario
  scenarios.push({
    scenario: 'No Lock (Float)',
    lockPeriod: 0,
    projectedRate: inputs.currentMarketRate + (inputs.expectedRateMovement / 100),
    cost: 0,
    value: 0,
    recommendation: 'Riskier but potentially cheaper if rates fall'
  });

  return scenarios;
}

// Calculate market analysis
export function calculateMarketAnalysis(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['marketAnalysis'] {
  let currentTrend = '';
  if (inputs.historicalRateData.trendDirection === 'Rising') {
    currentTrend = 'Rates are trending upward - locking now protects against increases';
  } else if (inputs.historicalRateData.trendDirection === 'Falling') {
    currentTrend = 'Rates are trending downward - consider waiting or float down option';
  } else {
    currentTrend = 'Rates are stable - current lock provides good protection';
  }

  const expectedMovement = inputs.expectedRateMovement;

  let volatilityAssessment = '';
  if (inputs.marketVolatility === 'High') {
    volatilityAssessment = 'High volatility - lock provides valuable protection';
  } else if (inputs.marketVolatility === 'Medium') {
    volatilityAssessment = 'Moderate volatility - monitor closely';
  } else {
    volatilityAssessment = 'Low volatility - more flexibility available';
  }

  let optimalTiming = '';
  const daysRemaining = calculateDaysRemaining(inputs.lockExpirationDate);

  if (daysRemaining < 30) {
    optimalTiming = 'Extend lock soon to avoid expiration risk';
  } else if (inputs.historicalRateData.trendDirection === 'Falling') {
    optimalTiming = 'Consider float down option or monitor for better rates';
  } else {
    optimalTiming = 'Current timing is good - maintain lock';
  }

  return {
    currentTrend,
    expectedMovement,
    volatilityAssessment,
    optimalTiming
  };
}

// Calculate cost-benefit analysis
export function calculateCostBenefitAnalysis(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['costBenefitAnalysis'] {
  const totalLockCost = inputs.rateLockCost - inputs.lenderCredit;
  const potentialBenefit = calculatePotentialSavings(inputs, inputs.expectedRateMovement);
  const netValue = potentialBenefit - totalLockCost;
  const roi = totalLockCost > 0 ? (netValue / totalLockCost) * 100 : 0;
  const payBackPeriod = totalLockCost > 0 ? (totalLockCost / (potentialBenefit / 365)) : 0; // Days

  return {
    totalLockCost,
    potentialBenefit,
    netValue,
    roi,
    payBackPeriod
  };
}

// Generate recommendations
export function generateRecommendations(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['recommendations'] {
  const daysRemaining = calculateDaysRemaining(inputs.lockExpirationDate);
  const riskAssessment = calculateRiskAssessment(inputs);
  const costBenefit = calculateCostBenefitAnalysis(inputs);

  let primaryRecommendation = '';

  if (daysRemaining < 30) {
    primaryRecommendation = 'Extend your rate lock immediately to avoid losing your locked rate';
  } else if (riskAssessment.overallRisk === 'High' && costBenefit.roi > 20) {
    primaryRecommendation = 'Maintain current lock - the protection outweighs the cost';
  } else if (inputs.historicalRateData.trendDirection === 'Falling' && inputs.floatDownOption) {
    primaryRecommendation = 'Consider float down option to potentially get a lower rate';
  } else {
    primaryRecommendation = 'Monitor market conditions and be prepared to extend if rates rise';
  }

  const alternativeActions = [
    'Shop around for better lock terms from other lenders',
    'Consider a shorter lock period to reduce costs',
    'Look for lenders offering lock extensions at no cost',
    'Consider an adjustable-rate mortgage if lock costs are too high'
  ];

  const riskMitigation = [
    'Have backup lender options ready',
    'Keep emergency funds available for potential rate increases',
    'Stay informed about market conditions',
    'Consider professional advice from a mortgage advisor'
  ];

  const timingAdvice = daysRemaining < 60 ?
    'Act within the next few weeks to secure your rate' :
    'Monitor market conditions over the next few months';

  return {
    primaryRecommendation,
    alternativeActions,
    riskMitigation,
    timingAdvice
  };
}

// Generate sensitivity analysis
export function generateSensitivityAnalysis(inputs: MortgageRateLockInputs): MortgageRateLockOutputs['sensitivityAnalysis'] {
  const analysis = [];
  const rateChanges = [-50, -25, 0, 25, 50, 75, 100]; // basis points

  rateChanges.forEach(change => {
    const newRate = inputs.currentMarketRate + (change / 100);
    const impact = calculateRateLockValue(inputs.lockedInterestRate, newRate, inputs.loanAmount, 30);

    // Simple probability estimation based on historical data
    let probability = 50; // Base 50%
    if (change > 0 && inputs.historicalRateData.trendDirection === 'Rising') probability += 20;
    if (change < 0 && inputs.historicalRateData.trendDirection === 'Falling') probability += 20;
    if (inputs.marketVolatility === 'High') probability = Math.min(probability + 10, 90);

    analysis.push({
      rateChange: change,
      impact,
      probability: Math.max(5, Math.min(95, probability))
    });
  });

  return analysis;
}

// Main calculation function
export function calculateMortgageRateLock(inputs: MortgageRateLockInputs): MortgageRateLockOutputs {
  const daysRemaining = calculateDaysRemaining(inputs.lockExpirationDate);
  const lockStatus = calculateLockStatus(daysRemaining);
  const rateLockValue = calculateRateLockValue(inputs.lockedInterestRate, inputs.currentMarketRate, inputs.loanAmount, 30);
  const potentialSavings = calculatePotentialSavings(inputs, inputs.expectedRateMovement);

  const riskAssessment = calculateRiskAssessment(inputs);
  const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs);
  const alternativeScenarios = generateAlternativeScenarios(inputs);
  const marketAnalysis = calculateMarketAnalysis(inputs);
  const costBenefitAnalysis = calculateCostBenefitAnalysis(inputs);
  const recommendations = generateRecommendations(inputs);
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs);

  return {
    lockStatus,
    daysRemaining,
    rateLockValue,
    potentialSavings,
    riskAssessment,
    breakEvenAnalysis,
    alternativeScenarios,
    marketAnalysis,
    costBenefitAnalysis,
    recommendations,
    sensitivityAnalysis
  };
}