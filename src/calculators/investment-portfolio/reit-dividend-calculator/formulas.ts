```typescript
import { 
  REITDividendCalculatorInputs, 
  REITDividendCalculatorMetrics, 
  REITDividendCalculatorAnalysis 
} from './types';

/**
 * Calculates the dividend yield percentage for a REIT.
 * Formula: (annualDividendPerShare / currentPrice) * 100
 * @param currentPrice - Current market price per share
 * @param annualDividendPerShare - Annual dividend payout per share
 * @returns Dividend yield as a percentage
 */
function calculateDividendYield(
  currentPrice: number, 
  annualDividendPerShare: number
): number {
  if (currentPrice <= 0) {
    throw new Error('Current price must be greater than zero');
  }
  return (annualDividendPerShare / currentPrice) * 100;
}

/**
 * Calculates the total annual dividend income from REIT shares.
 * Formula: numberOfShares * annualDividendPerShare
 * @param numberOfShares - Number of REIT shares owned
 * @param annualDividendPerShare - Annual dividend payout per share
 * @returns Total annual dividend income
 */
function calculateAnnualDividendIncome(
  numberOfShares: number, 
  annualDividendPerShare: number
): number {
  if (numberOfShares < 0 || annualDividendPerShare < 0) {
    throw new Error('Number of shares and annual dividend per share must be non-negative');
  }
  return numberOfShares * annualDividendPerShare;
}

/**
 * Calculates the total investment value in the REIT.
 * Formula: numberOfShares * currentPrice
 * @param numberOfShares - Number of REIT shares owned
 * @param currentPrice - Current market price per share
 * @returns Total investment value
 */
function calculateTotalInvestmentValue(
  numberOfShares: number, 
  currentPrice: number
): number {
  if (numberOfShares < 0 || currentPrice <= 0) {
    throw new Error('Number of shares must be non-negative and current price must be greater than zero');
  }
  return numberOfShares * currentPrice;
}

/**
 * Assesses the REIT dividend sustainability score based on payout ratio.
 * REITs are required to distribute at least 90% of taxable income as dividends.
 * Score is higher if payout ratio is closer to 90% (sustainable), lower if much higher (riskier).
 * Formula: sustainabilityScore = 100 - (Math.abs(payoutRatio - 90) * 1.5)
 * Clamped between 0 and 100.
 * @param payoutRatio - Payout ratio as a percentage (e.g., 95 for 95%)
 * @returns Sustainability score (0-100)
 */
function calculateDividendSustainabilityScore(payoutRatio: number): number {
  if (payoutRatio < 0 || payoutRatio > 200) { // Reasonable bounds for REITs
    throw new Error('Payout ratio must be between 0 and 200');
  }
  const score = 100 - (Math.abs(payoutRatio - 90) * 1.5);
  return Math.max(0, Math.min(100, score));
}

export function calculateResult(inputs: REITDividendCalculatorInputs): number {
  // Primary result: Annual dividend income
  // This is the core output for a REIT Dividend Calculator, representing projected yearly income from dividends
  return calculateAnnualDividendIncome(
    inputs.numberOfShares,
    inputs.annualDividendPerShare
  );
}

export function generateAnalysis(
  inputs: REITDividendCalculatorInputs, 
  metrics: REITDividendCalculatorMetrics
): REITDividendCalculatorAnalysis {
  const { result: annualIncome } = metrics;
  const dividendYield = calculateDividendYield(
    inputs.currentPrice, 
    inputs.annualDividendPerShare
  );
  const totalInvestmentValue = calculateTotalInvestmentValue(
    inputs.numberOfShares, 
    inputs.currentPrice
  );
  const sustainabilityScore = calculateDividendSustainabilityScore(inputs.payoutRatio);

  // Risk level assessment specific to REITs:
  // - Low: Yield 3-5%, high sustainability (>80), stable income focus
  // - Medium: Yield 5-8%, moderate sustainability (50-80)
  // - High: Yield >8% or <3%, low sustainability (<50), potential for volatility due to real estate market or high payout
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (dividendYield > 8 || dividendYield < 3 || sustainabilityScore < 50) {
    riskLevel = 'High';
  } else if (dividendYield > 5 || sustainabilityScore < 80) {
    riskLevel = 'Medium';
  }

  // Recommendation logic specific to REIT dividend investing:
  // Consider yield attractiveness (benchmark ~4-6% for REITs), income relative to investment, and sustainability
  // REITs provide real estate exposure with high yields but interest rate and market risks
  let recommendation: string;
  if (dividendYield >= 6 && sustainabilityScore >= 80 && annualIncome > 0.05 * totalInvestmentValue) {
    recommendation = 'Strong Buy: This REIT offers an attractive dividend yield with sustainable payouts, ideal for income-focused portfolios seeking real estate diversification.';
  } else if (dividendYield >= 4 && sustainabilityScore >= 60) {
    recommendation = 'Hold: Moderate yield and reasonable sustainability; monitor for interest rate changes impacting REIT valuations.';
  } else {
    recommendation = 'Sell or Avoid: Low yield or high payout ratio suggests potential dividend cuts or overvaluation; consider more stable REIT alternatives.';
  }

  return { 
    recommendation, 
    riskLevel,
    // Additional analysis properties for completeness
    keyInsights: [
      `Projected Annual Income: $${annualIncome.toFixed(2)}`,
      `Dividend Yield: ${dividendYield.toFixed(2)}%`,
      `Sustainability Score: ${sustainabilityScore.toFixed(0)}/100`,
      `Total Investment Value: $${totalInvestmentValue.toFixed(2)}`
    ]
  };
}
```