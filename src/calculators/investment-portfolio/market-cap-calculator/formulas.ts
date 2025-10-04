```typescript
import { MarketCapCalculatorInputs, MarketCapCalculatorMetrics, MarketCapCalculatorAnalysis } from './types';

export function calculateResult(inputs: MarketCapCalculatorInputs): number {
  const { sharePrice, outstandingShares } = inputs;
  
  // Market Capitalization = Share Price × Number of Outstanding Shares
  // Assumes sharePrice and outstandingShares are provided in consistent units (e.g., USD per share and total shares)
  // Returns the result in the same unit as sharePrice (e.g., total USD)
  if (sharePrice < 0 || outstandingShares < 0) {
    throw new Error('Share price and outstanding shares must be non-negative');
  }
  
  return sharePrice * outstandingShares;
}

export function generateAnalysis(
  inputs: MarketCapCalculatorInputs, 
  metrics: MarketCapCalculatorMetrics
): MarketCapCalculatorAnalysis {
  const result = metrics.result;
  
  // Categorize market cap (in USD, assuming standard thresholds)
  // Small-cap: < $2B, Mid-cap: $2B-$10B, Large-cap: > $10B
  // Risk level based on category: Small-cap (High risk, high growth potential), Mid-cap (Medium), Large-cap (Low risk, stability)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (result < 2_000_000_000) {
    riskLevel = 'High';
    recommendation = 'This is a small-cap stock with market cap under $2 billion. It may offer high growth potential but comes with elevated volatility and risk. Consider for aggressive growth portfolios.';
  } else if (result < 10_000_000_000) {
    riskLevel = 'Medium';
    recommendation = 'This is a mid-cap stock with market cap between $2 billion and $10 billion. It provides a balance of growth opportunities and moderate stability. Suitable for diversified portfolios seeking moderate risk.';
  } else {
    riskLevel = 'Low';
    recommendation = 'This is a large-cap stock with market cap over $10 billion. It typically offers stability and lower volatility, making it ideal for conservative or long-term investment strategies.';
  }

  return { recommendation, riskLevel };
}
```