```typescript
import { CrowdfundingCalculatorInputs, CrowdfundingCalculatorMetrics, CrowdfundingCalculatorAnalysis } from './types';

/**
 * Calculates the ownership fraction based on the investment relative to the funding goal
 * and the equity percentage offered for the entire goal.
 */
function calculateOwnershipFraction(
  investmentAmount: number,
  fundingGoal: number,
  equityOfferedPercent: number
): number {
  if (fundingGoal <= 0 || investmentAmount < 0 || equityOfferedPercent < 0 || equityOfferedPercent > 100) {
    throw new Error('Invalid input values for ownership calculation');
  }
  return (investmentAmount / fundingGoal) * (equityOfferedPercent / 100);
}

/**
 * Calculates the annualized ROI using the compound annual growth rate (CAGR) formula.
 * Formula: ((potentialPayout / investmentAmount) ^ (1 / timeToExitYears) - 1) * 100
 * Handles edge cases like timeToExitYears <= 0 by falling back to simple ROI.
 */
function calculateAnnualizedROI(
  investmentAmount: number,
  potentialPayout: number,
  timeToExitYears: number
): number {
  if (investmentAmount <= 0) {
    throw new Error('Investment amount must be positive');
  }
  const simpleROI = ((potentialPayout - investmentAmount) / investmentAmount) * 100;
  if (timeToExitYears <= 0) {
    return simpleROI;
  }
  const growthFactor = potentialPayout / investmentAmount;
  const annualized = (Math.pow(growthFactor, 1 / timeToExitYears) - 1) * 100;
  return isNaN(annualized) ? simpleROI : annualized;
}

export function calculateResult(inputs: CrowdfundingCalculatorInputs): number {
  const { investmentAmount, fundingGoal, equityOfferedPercent, expectedExitValuation, timeToExitYears = 5 } = inputs;

  const ownershipFraction = calculateOwnershipFraction(investmentAmount, fundingGoal, equityOfferedPercent);
  const potentialPayout = ownershipFraction * expectedExitValuation;
  const roi = calculateAnnualizedROI(investmentAmount, potentialPayout, timeToExitYears);

  return roi;
}

export function generateAnalysis(
  inputs: CrowdfundingCalculatorInputs,
  metrics: CrowdfundingCalculatorMetrics
): CrowdfundingCalculatorAnalysis {
  const result = metrics.result; // Annualized ROI percentage
  const { investmentAmount, timeToExitYears = 5 } = inputs;

  // Risk level assessment: Crowdfunding is inherently risky; adjust based on investment size and ROI
  // Small investments with moderate ROI: Low-Medium; Large with high ROI: High
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium'; // Default for typical crowdfunding
  if (investmentAmount > 25000 || result > 50) {
    riskLevel = 'High';
  } else if (investmentAmount < 1000 && result < 15) {
    riskLevel = 'Low';
  } else {
    riskLevel = 'Medium';
  }

  // Recommendation based on ROI and time horizon
  let recommendation: string;
  if (result > 30) {
    recommendation = `Strong potential for high returns (${result.toFixed(1)}% annualized over ${timeToExitYears} years). Suitable for risk-tolerant investors in early-stage ventures. Diversify to mitigate crowdfunding risks.`;
  } else if (result > 10) {
    recommendation = `Moderate return potential (${result.toFixed(1)}% annualized). Consider if aligned with your portfolio; crowdfunding involves illiquidity and failure risks.`;
  } else {
    recommendation = `Low projected returns (${result.toFixed(1)}% annualized). Proceed with caution—evaluate team, market, and legal aspects thoroughly before investing.`;
  }

  return { recommendation, riskLevel };
}
```