```typescript
import { EquityValuationCalculatorInputs, EquityValuationCalculatorMetrics, EquityValuationCalculatorAnalysis } from './types';

/**
 * Calculates the present value of dividends during the high-growth period.
 * @param D0 Current dividend per share
 * @param g_h High growth rate
 * @param n Number of high-growth years
 * @param r Required rate of return
 * @returns Present value of high-growth dividends
 */
function calculateHighGrowthPV(D0: number, g_h: number, n: number, r: number): number {
  let pv = 0;
  let D_t = D0;
  for (let t = 1; t <= n; t++) {
    D_t *= (1 + g_h);
    pv += D_t / Math.pow(1 + r, t);
  }
  return pv;
}

/**
 * Calculates the present value of the terminal value.
 * @param Dn Dividend at the end of high-growth period
 * @param g_t Terminal growth rate
 * @param n Number of high-growth years
 * @param r Required rate of return
 * @returns Present value of terminal value
 */
function calculateTerminalPV(Dn: number, g_t: number, n: number, r: number): number {
  if (r <= g_t) {
    throw new Error('Required rate of return must be greater than terminal growth rate for model convergence.');
  }
  const D_n1 = Dn * (1 + g_t);
  const TV = D_n1 / (r - g_t);
  return TV / Math.pow(1 + r, n);
}

/**
 * Core calculation for the two-stage Dividend Discount Model (DDM) to estimate intrinsic equity value per share.
 * This uses real mathematical formulas from financial theory:
 * - High-growth phase: Sum of discounted dividends D_t = D0 * (1 + g_h)^t / (1 + r)^t for t=1 to n
 * - Terminal value: D_{n+1} / (r - g_t), discounted back to present
 * - Total intrinsic value = PV(high-growth) + PV(terminal)
 * Assumptions: Valid inputs where r > g_t; perpetual growth after high-growth period.
 */
export function calculateResult(inputs: EquityValuationCalculatorInputs): number {
  const { dividendPerShare: D0, highGrowthRate: g_h, highGrowthYears: n, terminalGrowthRate: g_t, requiredReturn: r } = inputs;

  if (n <= 0 || D0 <= 0 || g_h < 0 || g_t < 0 || r <= 0) {
    throw new Error('Invalid inputs: Growth rates and years must be non-negative; dividends and rate positive.');
  }

  const Dn = D0 * Math.pow(1 + g_h, n);
  const highGrowthPV = calculateHighGrowthPV(D0, g_h, n, r);
  const terminalPV = calculateTerminalPV(Dn, g_t, n, r);

  return highGrowthPV + terminalPV;
}

/**
 * Generates a qualitative analysis and recommendation based on the calculated intrinsic value.
 * Compares intrinsic value to current market price to assess undervaluation/overvaluation.
 * Risk level is determined by the growth rates and stability assumptions:
 * - Low: Conservative growth (g_h and g_t both <= 5%)
 * - Medium: Moderate growth (any g > 5% but < 10%)
 * - High: Aggressive growth (any g >= 10%) or wide spread between r and g_t
 */
export function generateAnalysis(
  inputs: EquityValuationCalculatorInputs,
  metrics: EquityValuationCalculatorMetrics
): EquityValuationCalculatorAnalysis {
  const intrinsicValue = metrics.result;
  const { currentPrice, highGrowthRate: g_h, terminalGrowthRate: g_t, requiredReturn: r } = inputs;

  if (typeof currentPrice === 'undefined' || currentPrice <= 0) {
    return {
      recommendation: 'Unable to provide recommendation without a valid current market price.',
      riskLevel: 'Medium'
    };
  }

  // Determine risk level based on growth assumptions
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  const maxGrowth = Math.max(g_h, g_t);
  const growthSpread = r - g_t;
  if (maxGrowth <= 0.05 && growthSpread >= 0.03) {
    riskLevel = 'Low';
  } else if (maxGrowth >= 0.10 || growthSpread < 0.02) {
    riskLevel = 'High';
  }

  // Recommendation based on valuation comparison (using 10% threshold for buy/sell signals)
  let recommendation: string;
  const undervaluationPct = ((intrinsicValue - currentPrice) / currentPrice) * 100;

  if (intrinsicValue > currentPrice * 1.10) {
    if (undervaluationPct > 20) {
      recommendation = `Strong Buy: Stock is undervalued by approximately ${undervaluationPct.toFixed(1)}%. Consider adding to portfolio for long-term growth.`;
    } else {
      recommendation = `Buy: Stock appears undervalued by ${undervaluationPct.toFixed(1)}%. Suitable for value investors.`;
    }
  } else if (intrinsicValue < currentPrice * 0.90) {
    recommendation = `Sell: Stock is overvalued by ${((currentPrice - intrinsicValue) / intrinsicValue * 100).toFixed(1)}%. Consider reducing exposure.`;
  } else {
    recommendation = `Hold: Stock is fairly valued within 10% of intrinsic value (${undervaluationPct.toFixed(1)}% deviation). Monitor for changes in fundamentals.`;
  }

  return { recommendation, riskLevel };
}
```