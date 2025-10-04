```typescript
import { MusicRoyaltyInvestmentCalculatorInputs, MusicRoyaltyInvestmentCalculatorMetrics, MusicRoyaltyInvestmentCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the projected royalty cash flow for a given year.
 * Uses compound growth on initial expected royalties, adjusted for management fees.
 * Formula: CashFlow_t = ExpectedAnnualRoyalty * (1 + GrowthRate)^(t-1) * (1 - ManagementFee)
 */
function calculateYearlyCashFlow(
  expectedAnnualRoyalty: number,
  growthRate: number,
  managementFee: number,
  year: number
): number {
  return expectedAnnualRoyalty * Math.pow(1 + growthRate, year - 1) * (1 - managementFee);
}

/**
 * Helper function to calculate the Net Present Value (NPV) of royalty streams.
 * Standard NPV formula for uneven cash flows in royalty investments:
 * NPV = -InvestmentAmount + Σ [CashFlow_t / (1 + DiscountRate)^t] for t=1 to Duration
 * This accounts for the time value of money in music royalty portfolios.
 */
function calculateNPV(
  inputs: MusicRoyaltyInvestmentCalculatorInputs
): number {
  const { investmentAmount, expectedAnnualRoyalty, royaltyGrowthRate, investmentDuration, discountRate, managementFee } = inputs;
  let npv = -investmentAmount;

  for (let t = 1; t <= investmentDuration; t++) {
    const cashFlow = calculateYearlyCashFlow(expectedAnnualRoyalty, royaltyGrowthRate, managementFee, t);
    npv += cashFlow / Math.pow(1 + discountRate, t);
  }

  return npv;
}

/**
 * Helper function to estimate the Internal Rate of Return (IRR) approximation for royalty investments.
 * Uses a simplified Newton-Raphson method for IRR, common in portfolio analysis for irregular cash flows.
 * Initial guess based on average annual return; iterates to find rate where NPV ≈ 0.
 * Limited to 100 iterations for production stability.
 */
function calculateIRRApproximation(inputs: MusicRoyaltyInvestmentCalculatorInputs): number {
  const { investmentAmount, expectedAnnualRoyalty, royaltyGrowthRate, investmentDuration, managementFee } = inputs;
  const cashFlows: number[] = [-investmentAmount];
  
  for (let t = 1; t <= investmentDuration; t++) {
    cashFlows.push(calculateYearlyCashFlow(expectedAnnualRoyalty, royaltyGrowthRate, managementFee, t));
  }

  // Newton-Raphson approximation for IRR
  let irr = 0.1; // Initial guess: 10% typical for royalties
  const maxIterations = 100;
  const tolerance = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let npvDerivative = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const discountFactor = Math.pow(1 + irr, t);
      npv += cashFlows[t] / discountFactor;
      npvDerivative -= t * cashFlows[t] / Math.pow(discountFactor * (1 + irr), 2);
    }

    if (Math.abs(npv) < tolerance) {
      break;
    }

    irr -= npv / npvDerivative;
  }

  return Math.max(0, irr); // Ensure non-negative for production use
}

/**
 * Helper function to calculate the total projected royalty income over the investment duration.
 * Sum of all yearly cash flows, used for cumulative return assessment in music catalogs.
 * Formula: Σ CashFlow_t for t=1 to Duration
 */
function calculateTotalProjectedIncome(inputs: MusicRoyaltyInvestmentCalculatorInputs): number {
  const { investmentDuration } = inputs;
  let totalIncome = 0;

  for (let t = 1; t <= investmentDuration; t++) {
    totalIncome += calculateYearlyCashFlow(
      inputs.expectedAnnualRoyalty,
      inputs.royaltyGrowthRate,
      inputs.managementFee,
      t
    );
  }

  return totalIncome;
}

export function calculateResult(inputs: MusicRoyaltyInvestmentCalculatorInputs): number {
  // Core result: Net Present Value (NPV) as the primary investment viability metric for music royalty portfolios
  return calculateNPV(inputs);
}

export function generateAnalysis(
  inputs: MusicRoyaltyInvestmentCalculatorInputs,
  metrics: MusicRoyaltyInvestmentCalculatorMetrics
): MusicRoyaltyInvestmentCalculatorAnalysis {
  const npv = metrics.npv;
  const irr = metrics.irr;
  const totalIncome = metrics.totalProjectedIncome;
  const { investmentAmount, expectedAnnualRoyalty, royaltyGrowthRate, investmentDuration, discountRate } = inputs;

  // Risk level assessment specific to music royalties: High volatility due to streaming trends and artist popularity
  // Low: IRR > 12% and NPV > 0 with stable growth (<5%)
  // Medium: IRR 8-12% or NPV near 0
  // High: IRR <8% or negative NPV, or high growth assumptions (>10%) indicating speculation
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (irr > 0.12 && npv > 0 && royaltyGrowthRate < 0.05) {
    riskLevel = 'Low';
  } else if (irr < 0.08 || npv < 0) {
    riskLevel = 'High';
  } else if (royaltyGrowthRate > 0.10 || Math.abs(npv) < investmentAmount * 0.1) {
    riskLevel = 'High';
  }

  // Recommendation logic: Based on NPV relative to investment, IRR vs discount rate, and royalty-specific factors
  // Positive NPV and IRR > discount rate suggest buy/hold; consider catalog diversification for royalties
  let recommendation: string;
  const roi = (totalIncome / investmentAmount - 1) * 100;
  if (npv > investmentAmount * 0.2 && irr > discountRate + 0.02) {
    recommendation = `Strong buy recommendation for this music royalty investment. Projected ROI of ${roi.toFixed(1)}% over ${investmentDuration} years, with NPV of $${npv.toFixed(2)}. Diversify across multiple catalogs to mitigate artist-specific risks.`;
  } else if (npv > 0 && irr > discountRate) {
    recommendation = `Moderate buy for this royalty stream. Expected annual royalties of $${expectedAnnualRoyalty.toFixed(2)} with ${royaltyGrowthRate * 100}% growth yield a viable NPV of $${npv.toFixed(2)}. Monitor streaming metrics closely.`;
  } else {
    recommendation = `Avoid or reconsider this investment. Negative or low NPV of $${npv.toFixed(2)} indicates potential underperformance in the volatile music royalty market. Explore catalogs with higher proven stream counts.`;
  }

  return { recommendation, riskLevel };
}
```