```typescript
import { FreeCashFlowToEquityValuationInputs, FreeCashFlowToEquityValuationMetrics, FreeCashFlowToEquityValuationAnalysis } from './types';

/**
 * Calculates the present value of explicit forecast period FCFEs.
 * @param initialFCFE - FCFE at time 0 (current or last reported)
 * @param explicitGrowthRate - Annual growth rate during explicit forecast period
 * @param explicitYears - Number of years in explicit forecast
 * @param costOfEquity - Cost of equity (discount rate)
 * @returns Present value of explicit FCFE stream
 */
function calculatePVExplicit(initialFCFE: number, explicitGrowthRate: number, explicitYears: number, costOfEquity: number): number {
  let pvExplicit = 0;
  let fcfeCurrent = initialFCFE;

  for (let t = 1; t <= explicitYears; t++) {
    fcfeCurrent *= (1 + explicitGrowthRate);
    pvExplicit += fcfeCurrent / Math.pow(1 + costOfEquity, t);
  }

  return pvExplicit;
}

/**
 * Calculates the terminal value using the Gordon Growth Model.
 * @param fcfeN - FCFE at the end of explicit period (year n)
 * @param perpetualGrowthRate - Perpetual growth rate
 * @param costOfEquity - Cost of equity
 * @param explicitYears - Number of years in explicit forecast (for discounting TV)
 * @returns Present value of terminal value
 */
function calculatePVTerminal(fcfeN: number, perpetualGrowthRate: number, costOfEquity: number, explicitYears: number): number {
  if (costOfEquity <= perpetualGrowthRate) {
    throw new Error('Cost of equity must exceed perpetual growth rate for stable terminal value calculation.');
  }

  const fcfeN1 = fcfeN * (1 + perpetualGrowthRate);
  const terminalValue = fcfeN1 / (costOfEquity - perpetualGrowthRate);
  return terminalValue / Math.pow(1 + costOfEquity, explicitYears);
}

export function calculateResult(inputs: FreeCashFlowToEquityValuationInputs): number {
  const { initialFCFE, explicitGrowthRate, explicitYears, costOfEquity, perpetualGrowthRate } = inputs;

  if (explicitYears <= 0 || initialFCFE <= 0 || costOfEquity <= 0 || explicitGrowthRate < -1 || perpetualGrowthRate < -1) {
    throw new Error('Invalid inputs: Ensure positive FCFE, cost of equity, years, and growth rates within reasonable bounds.');
  }

  // Calculate FCFE at end of explicit period (after loop in PVExplicit, but we need it for TV)
  let fcfeN = initialFCFE;
  for (let t = 1; t <= explicitYears; t++) {
    fcfeN *= (1 + explicitGrowthRate);
  }

  const pvExplicit = calculatePVExplicit(initialFCFE, explicitGrowthRate, explicitYears, costOfEquity);
  const pvTerminal = calculatePVTerminal(fcfeN, perpetualGrowthRate, costOfEquity, explicitYears);

  return pvExplicit + pvTerminal;
}

export function generateAnalysis(
  inputs: FreeCashFlowToEquityValuationInputs,
  metrics: FreeCashFlowToEquityValuationMetrics
): FreeCashFlowToEquityValuationAnalysis {
  const result = metrics.result;
  const { explicitGrowthRate, explicitYears, costOfEquity, perpetualGrowthRate } = inputs;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const growthDiff = costOfEquity - perpetualGrowthRate;

  if (growthDiff <= 0) {
    riskLevel = 'High';
  } else if (growthDiff < 0.02) {
    riskLevel = 'High'; // Narrow margin increases sensitivity to assumptions
  } else if (growthDiff < 0.05 || explicitGrowthRate > costOfEquity || explicitYears < 5) {
    riskLevel = 'Medium'; // Moderate risk from assumptions or short horizon
  } else {
    riskLevel = 'Low';
  }

  const recommendation = `The FCFE valuation model estimates the intrinsic equity value at $${result.toFixed(2)}. This is based on an initial FCFE of $${inputs.initialFCFE.toFixed(2)}, ${explicitYears} years of ${(explicitGrowthRate * 100).toFixed(1)}% explicit growth, followed by ${(perpetualGrowthRate * 100).toFixed(1)}% perpetual growth, discounted at ${(costOfEquity * 100).toFixed(1)}% cost of equity. Compare this value to the current market capitalization to assess if the stock is undervalued or overvalued. The risk level is ${riskLevel.toLowerCase()} due to growth and discount rate assumptions.`;

  return { recommendation, riskLevel };
}
```