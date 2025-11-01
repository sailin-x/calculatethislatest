import { ViaticalSettlementInputs, ViaticalSettlementMetrics, ViaticalSettlementAnalysis } from './types';

// Viatical settlement discount rates based on health condition and life expectancy
const VIATICAL_DISCOUNT_RATES = {
  terminal: {
    lifeExpectancy0to6: 0.85,
    lifeExpectancy6to12: 0.75,
    lifeExpectancy12to24: 0.65,
    lifeExpectancy24plus: 0.50
  },
  critical: {
    lifeExpectancy0to6: 0.75,
    lifeExpectancy6to12: 0.65,
    lifeExpectancy12to24: 0.55,
    lifeExpectancy24plus: 0.40
  },
  serious: {
    lifeExpectancy0to6: 0.65,
    lifeExpectancy6to12: 0.55,
    lifeExpectancy12to24: 0.45,
    lifeExpectancy24plus: 0.30
  }
};

// State-specific regulations and fees
const STATE_FEES: Record<string, number> = {
  'CA': 0.03,
  'NY': 0.025,
  'FL': 0.02,
  'TX': 0.015,
  // Add more states as needed
};

// Tax rates for life insurance proceeds (simplified)
const TAX_RATES = {
  federalEstate: 0.40,
  stateEstate: 0.05,
  incomeTax: 0.37 // Top federal rate
};

export function calculateSettlementValue(inputs: ViaticalSettlementInputs): number {
  const { faceValue, lifeExpectancy, healthCondition, policyType, yearsOwned } = inputs;

  // Get base discount rate based on health condition and life expectancy
  let discountRate = 0;
  const rates = VIATICAL_DISCOUNT_RATES[healthCondition];

  if (lifeExpectancy <= 6) {
    discountRate = rates.lifeExpectancy0to6;
  } else if (lifeExpectancy <= 12) {
    discountRate = rates.lifeExpectancy6to12;
  } else if (lifeExpectancy <= 24) {
    discountRate = rates.lifeExpectancy12to24;
  } else {
    discountRate = rates.lifeExpectancy24plus;
  }

  // Adjust for policy type
  if (policyType === 'term') {
    discountRate *= 0.8; // Term policies typically have lower settlement values
  } else if (policyType === 'universal') {
    discountRate *= 0.9; // Universal policies have some cash value
  }

  // Adjust for policy age (older policies may have higher settlement values)
  const ageAdjustment = Math.min(yearsOwned * 0.01, 0.1);
  discountRate += ageAdjustment;

  return faceValue * discountRate;
}

export function calculateNetSettlementAmount(inputs: ViaticalSettlementInputs, settlementValue: number): number {
  const { settlementFees } = inputs;
  const stateFees = STATE_FEES[inputs.state] || 0.02;

  const totalFees = settlementFees + (settlementValue * stateFees);
  return settlementValue - totalFees;
}

export function calculateViaticalDiscount(inputs: ViaticalSettlementInputs): number {
  const settlementValue = calculateSettlementValue(inputs);
  return (inputs.faceValue - settlementValue) / inputs.faceValue;
}

export function calculateMonthlyPremiumSavings(inputs: ViaticalSettlementInputs): number {
  const { premiumAmount, premiumFrequency } = inputs;

  switch (premiumFrequency) {
    case 'monthly':
      return premiumAmount;
    case 'quarterly':
      return premiumAmount / 3;
    case 'annually':
      return premiumAmount / 12;
    default:
      return premiumAmount;
  }
}

export function calculateAnnualPremiumSavings(inputs: ViaticalSettlementInputs): number {
  return calculateMonthlyPremiumSavings(inputs) * 12;
}

export function calculateBreakEvenPeriod(inputs: ViaticalSettlementInputs): number {
  const settlementValue = calculateSettlementValue(inputs);
  const annualPremiumSavings = calculateAnnualPremiumSavings(inputs);

  if (annualPremiumSavings <= 0) return Infinity;

  return settlementValue / annualPremiumSavings;
}

export function calculateTaxLiability(inputs: ViaticalSettlementInputs, settlementValue: number): number {
  const { taxBracket } = inputs;

  // Life insurance proceeds are generally income tax-free, but may be subject to estate tax
  // This is a simplified calculation
  const taxableAmount = Math.max(0, settlementValue - inputs.premiumAmount * inputs.yearsOwned);
  return taxableAmount * taxBracket / 100;
}

export function calculateNetBenefit(inputs: ViaticalSettlementInputs): number {
  const settlementValue = calculateSettlementValue(inputs);
  const netSettlement = calculateNetSettlementAmount(inputs, settlementValue);
  const taxLiability = calculateTaxLiability(inputs, settlementValue);
  const futurePremiums = calculateAnnualPremiumSavings(inputs) * Math.max(0, inputs.lifeExpectancy / 12);

  return netSettlement - taxLiability + futurePremiums;
}

export function calculateSettlementRatio(inputs: ViaticalSettlementInputs): number {
  const settlementValue = calculateSettlementValue(inputs);
  return settlementValue / inputs.faceValue;
}

export function calculateInternalRateOfReturn(inputs: ViaticalSettlementInputs): number {
  const settlementValue = calculateSettlementValue(inputs);
  const annualPremiumSavings = calculateAnnualPremiumSavings(inputs);
  const years = Math.max(inputs.lifeExpectancy / 12, 1);

  if (annualPremiumSavings === 0) return 0;

  // Simplified IRR calculation
  const totalPremiumsPaid = inputs.premiumAmount * inputs.yearsOwned;
  const netCashFlow = settlementValue - totalPremiumsPaid;

  if (netCashFlow <= 0) return 0;

  return (Math.pow(netCashFlow / totalPremiumsPaid + 1, 1 / years) - 1) * 100;
}

export function calculateRiskAdjustedValue(inputs: ViaticalSettlementInputs): number {
  const settlementValue = calculateSettlementValue(inputs);
  const { lifeExpectancy, healthCondition } = inputs;

  // Risk adjustment based on health condition and life expectancy
  let riskMultiplier = 1;

  if (healthCondition === 'terminal') {
    riskMultiplier = lifeExpectancy > 12 ? 0.9 : 1.0;
  } else if (healthCondition === 'critical') {
    riskMultiplier = lifeExpectancy > 24 ? 0.8 : 0.9;
  } else {
    riskMultiplier = 0.7; // Serious condition has higher uncertainty
  }

  return settlementValue * riskMultiplier;
}

export function calculateResult(inputs: ViaticalSettlementInputs): number {
  return calculateNetBenefit(inputs);
}

export function generateAnalysis(inputs: ViaticalSettlementInputs, metrics: ViaticalSettlementMetrics): ViaticalSettlementAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.healthCondition === 'serious') riskLevel = 'High';
  else if (inputs.healthCondition === 'critical') riskLevel = 'Medium';

  let urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
  if (inputs.lifeExpectancy <= 6) urgencyLevel = 'Critical';
  else if (inputs.lifeExpectancy <= 12) urgencyLevel = 'High';
  else if (inputs.lifeExpectancy <= 24) urgencyLevel = 'Medium';

  const viabilityScore = Math.min(100, Math.max(0,
    (inputs.healthCondition === 'terminal' ? 40 : inputs.healthCondition === 'critical' ? 25 : 10) +
    (inputs.lifeExpectancy <= 12 ? 30 : inputs.lifeExpectancy <= 24 ? 20 : 10) +
    (inputs.yearsOwned > 5 ? 20 : inputs.yearsOwned > 2 ? 10 : 0) +
    (inputs.faceValue > 100000 ? 20 : inputs.faceValue > 50000 ? 10 : 0)
  ));

  let marketCondition: 'Favorable' | 'Neutral' | 'Unfavorable' = 'Neutral';
  if (inputs.lifeExpectancy <= 6 && inputs.healthCondition === 'terminal') {
    marketCondition = 'Favorable';
  } else if (inputs.lifeExpectancy > 24) {
    marketCondition = 'Unfavorable';
  }

  let recommendation = '';
  if (viabilityScore > 70) {
    recommendation = 'Strong candidate for viatical settlement. Consider proceeding with professional evaluation.';
  } else if (viabilityScore > 40) {
    recommendation = 'Moderate viability. Compare with other options and consult financial advisor.';
  } else {
    recommendation = 'Low viability for viatical settlement. Consider traditional policy loans or other alternatives.';
  }

  return { recommendation, riskLevel, viabilityScore, urgencyLevel, marketCondition };
}