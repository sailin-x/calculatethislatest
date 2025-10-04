```typescript
import { RightsOfferingCalculatorInputs, RightsOfferingCalculatorMetrics, RightsOfferingCalculatorAnalysis } from './types';

// Domain-specific helper functions for rights offering calculations
function calculateTERP(currentPrice: number, subscriptionPrice: number, ratio: number): number {
  // Theoretical Ex-Rights Price: Weighted average of cum-rights value and subscription proceeds
  // Formula: TERP = (Current Price * Ratio + Subscription Price) / (Ratio + 1)
  // Where Ratio is the number of rights (one per share) needed to subscribe to one new share
  return (currentPrice * ratio + subscriptionPrice) / (ratio + 1);
}

function calculateValuePerRightCum(currentPrice: number, subscriptionPrice: number, ratio: number): number {
  // Cum-rights value of one right: The discount amortized over the rights plus the new share
  // Formula: Value = (Current Price - Subscription Price) / (Ratio + 1)
  return (currentPrice - subscriptionPrice) / (ratio + 1);
}

function calculateValuePerRightEx(terp: number, subscriptionPrice: number, ratio: number): number {
  // Ex-rights value of one right: The intrinsic value based on ability to subscribe
  // Formula: Value = (TERP - Subscription Price) / Ratio
  return (terp - subscriptionPrice) / ratio;
}

function calculateTotalRights(existingShares: number): number {
  // One right per existing share
  return existingShares;
}

function calculateNewSharesPossible(existingShares: number, ratio: number): number {
  // Number of new shares the investor can subscribe to with their rights
  const totalRights = calculateTotalRights(existingShares);
  return Math.floor(totalRights / ratio);
}

function calculateTotalInvestmentRequired(newSharesPossible: number, subscriptionPrice: number): number {
  // Total cost to exercise all possible rights
  return newSharesPossible * subscriptionPrice;
}

function calculateDilutionPercentage(currentPrice: number, subscriptionPrice: number, ratio: number): number {
  // Dilution impact: Approximate percentage dilution from the offering
  // Formula: (1 / (Ratio + 1)) * 100
  return (1 / (ratio + 1)) * 100;
}

function calculateDiscountPercentage(currentPrice: number, subscriptionPrice: number): number {
  // Subscription discount relative to current price
  // Formula: ((Current Price - Subscription Price) / Current Price) * 100
  if (currentPrice === 0) return 0;
  return ((currentPrice - subscriptionPrice) / currentPrice) * 100;
}

export function calculateResult(inputs: RightsOfferingCalculatorInputs): number {
  // Main result: Theoretical Ex-Rights Price (TERP)
  // This is the expected share price post-offering, accounting for dilution
  const { currentPrice, subscriptionPrice, ratio } = inputs;
  if (ratio <= 0 || currentPrice < 0 || subscriptionPrice < 0) {
    throw new Error('Invalid inputs: Prices must be non-negative, ratio must be positive');
  }
  return calculateTERP(currentPrice, subscriptionPrice, ratio);
}

export function generateAnalysis(
  inputs: RightsOfferingCalculatorInputs,
  metrics: RightsOfferingCalculatorMetrics
): RightsOfferingCalculatorAnalysis {
  const { currentPrice, subscriptionPrice, existingShares, ratio } = inputs;
  const { result: terp, valuePerRightCum, valuePerRightEx, totalRightsValueCum, newSharesPossible, totalInvestmentRequired, dilutionPercentage } = metrics;

  // Investment-portfolio-specific risk assessment: Higher discount indicates potential company distress or aggressive capital raise, increasing portfolio risk
  const discountPercentage = calculateDiscountPercentage(currentPrice, subscriptionPrice);
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (discountPercentage > 20) {
    riskLevel = 'High'; // Deep discount suggests higher dilution risk or underlying issues
  } else if (discountPercentage > 10) {
    riskLevel = 'Medium'; // Moderate discount with balanced dilution
  } else {
    riskLevel = 'Low'; // Shallow discount, minimal immediate risk
  }

  // Domain-specific recommendation: Based on discount, TERP vs. subscription, and personal position
  // Exercise if subscription price < TERP (always true if discount > 0), but consider portfolio allocation and rights value
  let recommendation: string;
  if (discountPercentage > 15 && valuePerRightCum > 0) {
    const avgCostIfExercise = (currentPrice * existingShares + totalInvestmentRequired) / (existingShares + newSharesPossible);
    recommendation = `Strong opportunity: Exercise rights to acquire shares at a ${discountPercentage.toFixed(1)}% discount, lowering average cost to $${avgCostIfExercise.toFixed(2)} per share. Alternatively, sell rights for $${totalRightsValueCum.toFixed(2)} immediate value if cash-constrained.`;
  } else if (valuePerRightCum > 0.5) {
    recommendation = `Consider exercising or selling rights: The rights are worth $${valuePerRightCum.toFixed(2)} each cum-rights, providing a ${discountPercentage.toFixed(1)}% discount opportunity with ${dilutionPercentage.toFixed(1)}% portfolio dilution.`;
  } else {
    recommendation = `Monitor the offering: Low rights value ($${valuePerRightCum.toFixed(2)}) and minimal discount suggest limited upside; assess company fundamentals before participating to avoid over-dilution in your portfolio.`;
  }

  return { recommendation, riskLevel };
}
```