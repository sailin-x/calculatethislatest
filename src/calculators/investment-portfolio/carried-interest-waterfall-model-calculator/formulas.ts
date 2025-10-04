```typescript
import {
  CarriedInterestWaterfallModelCalculatorInputs,
  CarriedInterestWaterfallModelCalculatorMetrics,
  CarriedInterestWaterfallModelCalculatorAnalysis
} from './types';

export function calculateResult(inputs: CarriedInterestWaterfallModelCalculatorInputs): number {
  const { investedCapital, totalProceeds, hurdleRate, carryRate } = inputs;

  // Validate inputs (basic sanity checks for production readiness)
  if (investedCapital <= 0 || totalProceeds < 0 || hurdleRate < 0 || carryRate < 0 || carryRate >= 1) {
    throw new Error('Invalid inputs: investedCapital must be positive, totalProceeds non-negative, hurdleRate and carryRate non-negative with carryRate < 1');
  }

  if (totalProceeds <= investedCapital) {
    // Tier 1: Return of capital to LPs only
    return 0;
  }

  let remainingProceeds = totalProceeds - investedCapital;
  const preferredReturn = hurdleRate * investedCapital;

  if (remainingProceeds <= preferredReturn) {
    // Tier 2: Preferred return to LPs only (partial)
    return 0;
  }

  remainingProceeds -= preferredReturn;

  // Tier 3: Catch-up to GP
  const catchUpAmount = preferredReturn * (carryRate / (1 - carryRate));
  if (remainingProceeds <= catchUpAmount) {
    // Partial catch-up
    return remainingProceeds;
  }

  remainingProceeds -= catchUpAmount;

  // Tier 4: Profit split (LPs get 1 - carryRate, GP gets carryRate)
  const gpSplit = remainingProceeds * carryRate;
  return catchUpAmount + gpSplit;
}

export function generateAnalysis(
  inputs: CarriedInterestWaterfallModelCalculatorInputs,
  metrics: CarriedInterestWaterfallModelCalculatorMetrics
): CarriedInterestWaterfallModelCalculatorAnalysis {
  const { investedCapital, totalProceeds, hurdleRate, carryRate } = inputs;
  const carriedInterest = metrics.result;
  const totalDistributedToGps = carriedInterest;
  const totalDistributedToLps = totalProceeds - carriedInterest;
  const carryAsPercentOfProceeds = (carriedInterest / totalProceeds) * 100;
  const effectiveCarryRate = carriedInterest / Math.max(1, totalProceeds - investedCapital); // Approximate effective rate on profits

  // Risk assessment: Based on carry rate and how much profit is needed to trigger carry
  // High risk if high carry rate or low hurdle (GP-favorable structure)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (carryRate > 0.25 || hurdleRate < 0.05) {
    riskLevel = 'High';
  } else if (carryRate > 0.20 || hurdleRate < 0.08) {
    riskLevel = 'Medium';
  }

  // Recommendation: Provide insights on distributions and structure fairness
  let recommendation = '';
  if (carriedInterest === 0) {
    recommendation = `No carried interest is distributed to the GP as total proceeds (${totalProceeds.toFixed(2)}) do not exceed the invested capital plus preferred return threshold. LPs receive all proceeds. This structure protects LP capital effectively at ${riskLevel} risk.`;
  } else if (effectiveCarryRate < carryRate * 0.8) {
    recommendation = `The GP receives $${carriedInterest.toFixed(2)} in carried interest (${carryAsPercentOfProceeds.toFixed(2)}% of total proceeds), which is below the full ${carryRate * 100}% target due to partial waterfall achievement. LPs receive $${totalDistributedToLps.toFixed(2)}. Consider higher exits for full GP alignment at ${riskLevel} risk.`;
  } else {
    recommendation = `Full waterfall achieved: GP entitled to $${carriedInterest.toFixed(2)} carried interest (${carryAsPercentOfProceeds.toFixed(2)}% of total proceeds, effective rate ${effectiveCarryRate.toFixed(2)}%). LPs receive $${totalDistributedToLps.toFixed(2)} including capital and preferred return. This ${riskLevel} risk structure aligns incentives post-hurdle of ${hurdleRate * 100}%.`;
  }

  if (carryRate > 0.20) {
    recommendation += ` Note: High carry rate (${carryRate * 100}%) may indicate aggressive GP compensation; review for LP alignment.`;
  }

  return { recommendation, riskLevel };
}
```