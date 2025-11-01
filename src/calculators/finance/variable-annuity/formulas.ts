import { VariableAnnuityInputs, VariableAnnuityMetrics, VariableAnnuityAnalysis } from './types';

// Standard annuity payout rates (approximate)
const ANNUITY_PAYOUT_RATES = {
  immediate: {
    single: { male: 0.055, female: 0.052 },
    joint: 0.045
  },
  deferred: {
    single: { male: 0.065, female: 0.062 },
    joint: 0.055
  }
};

// Mortality tables (simplified - would use full actuarial tables in production)
const MORTALITY_RATES = {
  male: [
    { age: 60, rate: 0.008 },
    { age: 65, rate: 0.012 },
    { age: 70, rate: 0.020 },
    { age: 75, rate: 0.035 },
    { age: 80, rate: 0.060 },
    { age: 85, rate: 0.100 },
    { age: 90, rate: 0.150 }
  ],
  female: [
    { age: 60, rate: 0.006 },
    { age: 65, rate: 0.009 },
    { age: 70, rate: 0.015 },
    { age: 75, rate: 0.025 },
    { age: 80, rate: 0.045 },
    { age: 85, rate: 0.080 },
    { age: 90, rate: 0.120 }
  ]
};

export function calculateProjectedValue(inputs: VariableAnnuityInputs): number {
  const { initialInvestment, monthlyContribution, investmentHorizon, expectedReturnRate, volatility } = inputs;

  const monthlyRate = expectedReturnRate / 100 / 12;
  const monthlyVolatility = volatility / 100 / Math.sqrt(12);

  let projectedValue = initialInvestment;
  const months = investmentHorizon * 12;

  for (let month = 0; month < months; month++) {
    // Add monthly contribution at beginning of month
    projectedValue += monthlyContribution;

    // Apply investment return with volatility
    const randomReturn = Math.random() * 2 - 1; // -1 to 1
    const monthlyReturn = monthlyRate + (randomReturn * monthlyVolatility);
    projectedValue *= (1 + monthlyReturn);
  }

  return Math.max(0, projectedValue);
}

export function calculateAnnuityIncome(inputs: VariableAnnuityInputs, projectedValue: number): number {
  const { annuityPayoutRate, annuityType, payoutType } = inputs;

  let baseRate = annuityPayoutRate / 100;

  // Adjust for annuity type
  if (annuityType === 'immediate') {
    baseRate *= 0.9; // Immediate annuities typically have lower payout rates
  }

  // Adjust for payout type
  if (payoutType === 'joint_survivor') {
    baseRate *= 0.85; // Joint survivor reduces monthly payment
  } else if (payoutType === 'period_certain') {
    baseRate *= 0.95; // Period certain slightly reduces payment
  }

  return projectedValue * baseRate / 12; // Monthly income
}

export function calculateTotalContributions(inputs: VariableAnnuityInputs): number {
  const { initialInvestment, monthlyContribution, investmentHorizon } = inputs;
  return initialInvestment + (monthlyContribution * investmentHorizon * 12);
}

export function calculateTaxLiability(inputs: VariableAnnuityInputs, projectedValue: number): number {
  const { taxBracket } = inputs;
  const totalContributions = calculateTotalContributions(inputs);
  const earnings = projectedValue - totalContributions;

  if (earnings <= 0) return 0;

  // Simplified tax calculation - assumes earnings are taxed as ordinary income
  return earnings * (taxBracket / 100);
}

export function calculateBreakEvenAge(inputs: VariableAnnuityInputs): number {
  const { currentAge, annuityStartAge, monthlyContribution } = inputs;
  const projectedValue = calculateProjectedValue(inputs);
  const annuityIncome = calculateAnnuityIncome(inputs, projectedValue);

  if (annuityIncome <= monthlyContribution) return Infinity;

  const yearsToBreakEven = (projectedValue / annuityIncome) / 12;
  return annuityStartAge + yearsToBreakEven;
}

export function calculateInternalRateOfReturn(inputs: VariableAnnuityInputs): number {
  const totalContributions = calculateTotalContributions(inputs);
  const projectedValue = calculateProjectedValue(inputs);
  const years = inputs.investmentHorizon;

  if (years === 0 || totalContributions === 0) return 0;

  // Simplified IRR calculation
  const irr = Math.pow(projectedValue / totalContributions, 1 / years) - 1;
  return irr * 100;
}

export function calculateLifetimeIncome(inputs: VariableAnnuityInputs): number {
  const projectedValue = calculateProjectedValue(inputs);
  const annuityIncome = calculateAnnuityIncome(inputs, projectedValue);
  const { annuityStartAge, payoutType } = inputs;

  let lifeExpectancy = 85; // Default life expectancy

  if (payoutType === 'joint_survivor') {
    lifeExpectancy += 5; // Joint life expectancy
  }

  const payoutYears = Math.max(0, lifeExpectancy - annuityStartAge);
  return annuityIncome * 12 * payoutYears;
}

export function calculateResult(inputs: VariableAnnuityInputs): number {
  return calculateProjectedValue(inputs);
}

export function generateAnalysis(inputs: VariableAnnuityInputs, metrics: VariableAnnuityMetrics): VariableAnnuityAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.volatility > 20) riskLevel = 'High';
  else if (inputs.volatility > 15) riskLevel = 'Medium';

  const suitabilityScore = Math.min(100, Math.max(0,
    (inputs.currentAge > 50 ? 30 : 0) +
    (inputs.expectedReturnRate > 6 ? 20 : 0) +
    (inputs.volatility < 15 ? 25 : 0) +
    (inputs.investmentHorizon > 20 ? 25 : 0)
  ));

  const taxEfficiency = (metrics.netValue / (metrics.totalContributions + metrics.totalEarnings)) * 100;
  const incomeStability = inputs.volatility < 15 ? 80 : inputs.volatility < 25 ? 60 : 40;

  let recommendation = '';
  if (suitabilityScore > 70) {
    recommendation = 'Variable annuity appears suitable for your risk tolerance and time horizon. Consider consulting a financial advisor.';
  } else if (suitabilityScore > 40) {
    recommendation = 'Variable annuity may be acceptable but review alternatives. Consider guaranteed income options for stability.';
  } else {
    recommendation = 'Variable annuity may not be suitable. Consider lower-risk alternatives or extend investment horizon.';
  }

  return { recommendation, riskLevel, suitabilityScore, taxEfficiency, incomeStability };
}