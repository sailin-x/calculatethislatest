```typescript
import { TenderOfferValuationCalculatorInputs, TenderOfferValuationCalculatorMetrics, TenderOfferValuationCalculatorAnalysis } from './types';

// Domain-specific helper functions for tender offer valuation in investment portfolios
function calculatePremium(currentPrice: number, tenderPrice: number): number {
  if (currentPrice <= 0) {
    throw new Error('Current market price must be positive');
  }
  return (tenderPrice - currentPrice) / currentPrice;
}

function calculateTotalCurrentValue(currentPrice: number, sharesHeld: number): number {
  if (sharesHeld < 0) {
    throw new Error('Number of shares must be non-negative');
  }
  return currentPrice * sharesHeld;
}

function calculateTotalTenderValue(tenderPrice: number, sharesHeld: number): number {
  if (sharesHeld < 0) {
    throw new Error('Number of shares must be non-negative');
  }
  return tenderPrice * sharesHeld;
}

function calculateNetGain(currentValue: number, tenderValue: number): number {
  return tenderValue - currentValue;
}

function calculatePortfolioImpact(netGain: number, totalPortfolioValue: number): number {
  if (totalPortfolioValue <= 0) {
    return 0;
  }
  return (netGain / totalPortfolioValue) * 100; // as percentage
}

function calculateUnrealizedGainPerShare(currentPrice: number, costBasis: number): number {
  return currentPrice - costBasis;
}

export function calculateResult(inputs: TenderOfferValuationCalculatorInputs): number {
  // Validate inputs
  if (inputs.currentMarketPrice <= 0 || inputs.tenderOfferPrice <= 0 || inputs.sharesHeld < 0) {
    throw new Error('Invalid inputs: prices must be positive, shares non-negative');
  }

  const currentValue = calculateTotalCurrentValue(inputs.currentMarketPrice, inputs.sharesHeld);
  const tenderValue = calculateTotalTenderValue(inputs.tenderOfferPrice, inputs.sharesHeld);
  const netGain = calculateNetGain(currentValue, tenderValue);

  // The primary result is the net dollar gain (or loss) to the portfolio if the tender offer is accepted
  // This represents the immediate valuation impact on the portfolio position
  return netGain;
}

export function generateAnalysis(
  inputs: TenderOfferValuationCalculatorInputs,
  metrics: TenderOfferValuationCalculatorMetrics
): TenderOfferValuationCalculatorAnalysis {
  const result = metrics.result; // netGain from calculateResult
  const premium = calculatePremium(inputs.currentMarketPrice, inputs.tenderOfferPrice);
  const currentValue = calculateTotalCurrentValue(inputs.currentMarketPrice, inputs.sharesHeld);
  const portfolioImpactPct = calculatePortfolioImpact(result, inputs.totalPortfolioValue || 0);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  // Investment-portfolio-specific logic: Assess based on premium (common tender offer metric, typically 20-40% in takeovers)
  // and portfolio impact. High premium may signal acquisition risk (e.g., deal failure), low premium may not justify transaction costs.
  // Consider unrealized gains if cost basis provided, to evaluate overall position profitability.
  const hasCostBasis = inputs.costBasisPerShare !== undefined && inputs.costBasisPerShare > 0;
  const unrealizedGainPerShare = hasCostBasis ? calculateUnrealizedGainPerShare(inputs.currentMarketPrice, inputs.costBasisPerShare) : 0;

  if (premium > 0.30) { // >30% premium: Attractive but higher risk of deal scrutiny/regulatory issues
    riskLevel = 'Medium';
    recommendation = `Strongly recommend accepting the tender offer. The ${premium.toFixed(1)}% premium offers a significant portfolio uplift of $${result.toFixed(2)} (${portfolioImpactPct.toFixed(2)}% of portfolio). If cost basis is $${inputs.costBasisPerShare || 0}, this realizes gains beyond current unrealized position.`;
  } else if (premium > 0.10 && premium <= 0.30) { // 10-30% premium: Solid opportunity with moderate risk
    riskLevel = 'Low';
    recommendation = `Recommend accepting the tender offer. The ${premium.toFixed(1)}% premium provides a net gain of $${result.toFixed(2)} (${portfolioImpactPct.toFixed(2)}% of portfolio impact), improving portfolio value without excessive risk.`;
  } else if (premium > 0 && premium <= 0.10) { // <10% premium: Marginal, consider taxes/fees
    riskLevel = 'Low';
    recommendation = `Consider accepting if transaction costs are low. The modest ${premium.toFixed(1)}% premium yields $${result.toFixed(2)}, but evaluate against current unrealized gains of $${unrealizedGainPerShare * inputs.sharesHeld || 0}.`;
  } else { // Negative premium: Unfavorable, hold for market recovery
    riskLevel = 'High';
    recommendation = `Recommend declining the tender offer and holding the position. The negative ${premium.toFixed(1)}% premium would result in a portfolio loss of $${Math.abs(result).toFixed(2)} (${portfolioImpactPct.toFixed(2)}% impact). Monitor for better offers or market appreciation.`;
  }

  // Adjust risk if portfolio impact is significant (>5% of total portfolio)
  if (Math.abs(portfolioImpactPct) > 5) {
    riskLevel = 'High' as const; // High concentration risk in portfolio
    recommendation += ` Caution: This position represents a >5% portfolio impact, increasing overall volatility.`;
  }

  return { recommendation, riskLevel };
}
```