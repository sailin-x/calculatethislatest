```typescript
import { DividendDiscountModelInputs, DividendDiscountModelMetrics, DividendDiscountModelAnalysis } from './types';

/**
 * Calculates the intrinsic stock value using the Gordon Growth Model (a form of DDM).
 * Formula: P = D1 / (r - g), where D1 = D0 * (1 + g), D0 is current dividend,
 * g is perpetual growth rate, r is required rate of return.
 * Returns NaN if r <= g (invalid model assumptions).
 */
export function calculateResult(inputs: DividendDiscountModelInputs): number {
  const { currentDividend, growthRate, requiredReturn } = inputs;

  if (requiredReturn <= growthRate) {
    return NaN;
  }

  const d1 = currentDividend * (1 + growthRate);
  return d1 / (requiredReturn - growthRate);
}

export function generateAnalysis(
  inputs: DividendDiscountModelInputs,
  metrics: DividendDiscountModelMetrics
): DividendDiscountModelAnalysis {
  const result = metrics.result;
  const { growthRate, requiredReturn, currentPrice } = inputs;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (requiredReturn <= growthRate || isNaN(result)) {
    riskLevel = 'High';
    return {
      recommendation: 'Model invalid: Required rate of return must exceed growth rate for sustainable valuation.',
      riskLevel,
    };
  }

  // Assess risk based on the spread between r and g (smaller spread increases sensitivity to assumptions)
  const spread = requiredReturn - growthRate;
  if (spread < 0.02) {
    riskLevel = 'High'; // Very narrow spread: high sensitivity to changes in g or r
  } else if (spread < 0.05) {
    riskLevel = 'Medium'; // Moderate spread
  } else {
    riskLevel = 'Low'; // Comfortable spread
  }

  let recommendation: string;
  const formattedResult = result.toFixed(2);
  if (!currentPrice) {
    recommendation = `The estimated intrinsic value is $${formattedResult} based on the DDM assumptions. Consider comparing to current market price for investment decisions.`;
  } else {
    const formattedPrice = currentPrice.toFixed(2);
    const undervaluedThreshold = currentPrice * 1.1; // 10% buffer for strong signals
    const overvaluedThreshold = currentPrice * 0.9;

    if (result > undervaluedThreshold) {
      recommendation = `Strong Buy: Intrinsic value ($${formattedResult}) significantly exceeds current price ($${formattedPrice}), suggesting the stock is undervalued.`;
    } else if (result > currentPrice) {
      recommendation = `Buy: Intrinsic value ($${formattedResult}) exceeds current price ($${formattedPrice}), indicating undervaluation.`;
    } else if (result < overvaluedThreshold) {
      recommendation = `Strong Sell: Intrinsic value ($${formattedResult}) is significantly below current price ($${formattedPrice}), suggesting overvaluation.`;
    } else if (result < currentPrice) {
      recommendation = `Sell: Intrinsic value ($${formattedResult}) is below current price ($${formattedPrice}), indicating overvaluation.`;
    } else {
      recommendation = `Hold: Intrinsic value ($${formattedResult}) aligns closely with current price ($${formattedPrice}), suggesting fair valuation.`;
    }
  }

  return { recommendation, riskLevel };
}
```