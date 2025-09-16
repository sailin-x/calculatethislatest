import { PlannedGivingInputs, PlannedGivingResults, PlannedGivingMetrics } from './types';

export function calculatePlannedGiving(inputs: PlannedGivingInputs): PlannedGivingResults {
  const {
    giftAmount,
    donorAge,
    lifeExpectancy,
    givingMethod,
    taxBracket,
    expectedReturn,
    inflationRate,
    charitableDeductionRate,
    trustType,
    payoutRate,
    trustTerm,
    includeSpouse,
    spouseAge
  } = inputs;

  // Calculate tax savings based on giving method
  const taxSavings = calculateTaxSavings(giftAmount, taxBracket, charitableDeductionRate, givingMethod);

  // Calculate net cost after tax savings
  const netCost = giftAmount - taxSavings;

  // Calculate charitable impact
  const charitableImpact = giftAmount;

  // Calculate income generated (for trusts)
  const incomeGenerated = calculateIncomeGenerated(giftAmount, payoutRate, trustTerm, expectedReturn, givingMethod);

  // Calculate remainder value (for CRTs/CLTs)
  const remainderValue = calculateRemainderValue(giftAmount, payoutRate, trustTerm, expectedReturn, givingMethod);

  // Calculate effective tax rate
  const effectiveTaxRate = giftAmount > 0 ? ((giftAmount - netCost) / giftAmount) * 100 : 0;

  // Calculate break-even years
  const breakEvenYears = calculateBreakEvenYears(giftAmount, taxSavings, expectedReturn);

  // Calculate lifetime giving value
  const lifetimeGivingValue = calculateLifetimeGivingValue(giftAmount, lifeExpectancy - donorAge, expectedReturn);

  // Determine optimal giving strategy
  const optimalGivingStrategy = determineOptimalGivingStrategy(
    givingMethod,
    taxBracket,
    lifeExpectancy - donorAge,
    expectedReturn
  );

  return {
    taxSavings,
    netCost,
    charitableImpact,
    incomeGenerated,
    remainderValue,
    effectiveTaxRate,
    breakEvenYears,
    lifetimeGivingValue,
    optimalGivingStrategy
  };
}

function calculateTaxSavings(
  giftAmount: number,
  taxBracket: number,
  charitableDeductionRate: number,
  givingMethod: string
): number {
  let deductionRate = charitableDeductionRate / 100;

  // Adjust deduction rate based on giving method
  if (givingMethod === 'charitable_remainder_trust') {
    deductionRate = Math.min(deductionRate, 0.5); // CRT deduction limit
  } else if (givingMethod === 'charitable_lead_trust') {
    deductionRate = Math.min(deductionRate, 0.6); // CLT deduction limit
  }

  return giftAmount * deductionRate * (taxBracket / 100);
}

function calculateIncomeGenerated(
  giftAmount: number,
  payoutRate: number,
  trustTerm: number,
  expectedReturn: number,
  givingMethod: string
): number {
  if (givingMethod === 'outright' || givingMethod === 'bequest') {
    return 0;
  }

  const annualPayout = giftAmount * (payoutRate / 100);
  let totalIncome = 0;

  for (let year = 1; year <= trustTerm; year++) {
    totalIncome += annualPayout;
  }

  return totalIncome;
}

function calculateRemainderValue(
  giftAmount: number,
  payoutRate: number,
  trustTerm: number,
  expectedReturn: number,
  givingMethod: string
): number {
  if (givingMethod === 'outright' || givingMethod === 'bequest') {
    return 0;
  }

  const annualPayout = giftAmount * (payoutRate / 100);
  let remainingValue = giftAmount;

  for (let year = 1; year <= trustTerm; year++) {
    const investmentGrowth = remainingValue * (expectedReturn / 100);
    remainingValue = remainingValue + investmentGrowth - annualPayout;
  }

  return Math.max(0, remainingValue);
}

function calculateBreakEvenYears(
  giftAmount: number,
  taxSavings: number,
  expectedReturn: number
): number {
  if (taxSavings <= 0) return 0;

  // Simplified break-even calculation
  const annualReturn = expectedReturn / 100;
  const years = Math.log(giftAmount / taxSavings) / Math.log(1 + annualReturn);

  return Math.max(0, Math.ceil(years));
}

function calculateLifetimeGivingValue(
  giftAmount: number,
  yearsRemaining: number,
  expectedReturn: number
): number {
  if (yearsRemaining <= 0) return giftAmount;

  // Calculate future value of the gift
  return giftAmount * Math.pow(1 + expectedReturn / 100, yearsRemaining);
}

function determineOptimalGivingStrategy(
  givingMethod: string,
  taxBracket: number,
  yearsRemaining: number,
  expectedReturn: number
): string {
  if (givingMethod === 'charitable_remainder_trust' && taxBracket > 30) {
    return 'Excellent for high-income donors seeking income and tax benefits';
  } else if (givingMethod === 'charitable_lead_trust' && yearsRemaining > 20) {
    return 'Ideal for multi-generational charitable planning';
  } else if (givingMethod === 'outright' && taxBracket > 35) {
    return 'Maximize tax deductions with immediate giving';
  } else if (givingMethod === 'life_insurance') {
    return 'Leverage life insurance for large charitable gifts';
  } else {
    return 'Consider your specific financial situation and charitable goals';
  }
}

export function calculatePlannedGivingMetrics(
  inputs: PlannedGivingInputs,
  results: PlannedGivingResults
): PlannedGivingMetrics {
  const { giftAmount, taxBracket, expectedReturn, givingMethod } = inputs;
  const { taxSavings, netCost, incomeGenerated, charitableImpact } = results;

  // Calculate tax efficiency
  const taxEfficiency = giftAmount > 0 ? (taxSavings / giftAmount) * 100 : 0;

  // Calculate charitable leverage
  const charitableLeverage = giftAmount > 0 ? (charitableImpact / netCost) * 100 : 0;

  // Calculate income replacement
  const incomeReplacement = netCost > 0 ? (incomeGenerated / netCost) * 100 : 0;

  // Determine wealth transfer efficiency
  let wealthTransferEfficiency: 'low' | 'medium' | 'high' = 'medium';
  if (taxEfficiency > 30) wealthTransferEfficiency = 'high';
  else if (taxEfficiency < 15) wealthTransferEfficiency = 'low';

  // Determine giving strategy
  let givingStrategy: 'immediate' | 'deferred' | 'legacy' = 'immediate';
  if (givingMethod === 'bequest') givingStrategy = 'legacy';
  else if (givingMethod.includes('trust')) givingStrategy = 'deferred';

  return {
    taxEfficiency,
    charitableLeverage,
    incomeReplacement,
    wealthTransferEfficiency,
    givingStrategy
  };
}

export function validatePlannedGivingInputs(inputs: PlannedGivingInputs): string[] {
  const errors: string[] = [];

  if (inputs.giftAmount <= 0) {
    errors.push('Gift amount must be greater than $0');
  }

  if (inputs.donorAge < 0 || inputs.donorAge > 120) {
    errors.push('Donor age must be between 0 and 120');
  }

  if (inputs.lifeExpectancy <= inputs.donorAge) {
    errors.push('Life expectancy must be greater than donor age');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.charitableDeductionRate < 0 || inputs.charitableDeductionRate > 100) {
    errors.push('Charitable deduction rate must be between 0% and 100%');
  }

  if (inputs.payoutRate < 0 || inputs.payoutRate > 100) {
    errors.push('Payout rate must be between 0% and 100%');
  }

  if (inputs.trustTerm < 0 || inputs.trustTerm > 100) {
    errors.push('Trust term must be between 0 and 100 years');
  }

  if (inputs.includeSpouse && (inputs.spouseAge < 0 || inputs.spouseAge > 120)) {
    errors.push('Spouse age must be between 0 and 120 when spouse is included');
  }

  return errors;
}