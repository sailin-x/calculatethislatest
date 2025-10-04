```typescript
import { 
  FCFFValuationInputs, 
  FCFFValuationMetrics, 
  FCFFValuationAnalysis 
} from './types';

/**
 * Calculates the present value of explicit period FCFF cash flows.
 * @param fcff0 - The base FCFF (last observed or year 0).
 * @param highGrowthRate - The growth rate during the high growth period.
 * @param highGrowthYears - The number of years in the high growth period.
 * @param wacc - The weighted average cost of capital (discount rate).
 * @returns The present value of the explicit period cash flows.
 */
function calculatePVExplicit(
  fcff0: number, 
  highGrowthRate: number, 
  highGrowthYears: number, 
  wacc: number
): number {
  let pvExplicit = 0;
  let fcff_t = fcff0;
  for (let t = 1; t <= highGrowthYears; t++) {
    fcff_t *= (1 + highGrowthRate);
    pvExplicit += fcff_t / Math.pow(1 + wacc, t);
  }
  return pvExplicit;
}

/**
 * Calculates the present value of the terminal value.
 * @param fcff_n - The FCFF in the last year of the explicit period.
 * @param terminalGrowthRate - The perpetual growth rate after the explicit period.
 * @param wacc - The weighted average cost of capital.
 * @param highGrowthYears - The number of years in the high growth period.
 * @returns The present value of the terminal value.
 */
function calculatePVTerminal(
  fcff_n: number, 
  terminalGrowthRate: number, 
  wacc: number, 
  highGrowthYears: number
): number {
  const tv = fcff_n * (1 + terminalGrowthRate) / (wacc - terminalGrowthRate);
  return tv / Math.pow(1 + wacc, highGrowthYears);
}

export function calculateResult(inputs: FCFFValuationInputs): number {
  const { fcff0, highGrowthRate, highGrowthYears, terminalGrowthRate, wacc } = inputs;

  // Input validation for production readiness
  if (fcff0 <= 0) {
    throw new Error('FCFF0 must be positive');
  }
  if (highGrowthYears < 0 || !Number.isInteger(highGrowthYears)) {
    throw new Error('High growth years must be a non-negative integer');
  }
  if (wacc <= 0) {
    throw new Error('WACC must be positive');
  }
  if (wacc <= terminalGrowthRate) {
    throw new Error('WACC must be greater than the terminal growth rate to avoid division by zero or negative denominator');
  }
  if (terminalGrowthRate < 0) {
    throw new Error('Terminal growth rate cannot be negative');
  }

  const pvExplicit = calculatePVExplicit(fcff0, highGrowthRate, highGrowthYears, wacc);
  
  let fcff_n = fcff0;
  for (let t = 1; t <= highGrowthYears; t++) {
    fcff_n *= (1 + highGrowthRate);
  }
  
  const pvTerminal = calculatePVTerminal(fcff_n, terminalGrowthRate, wacc, highGrowthYears);
  
  return pvExplicit + pvTerminal;
}

export function generateAnalysis(
  inputs: FCFFValuationInputs, 
  metrics: FCFFValuationMetrics
): FCFFValuationAnalysis {
  const result = metrics.result;
  const { highGrowthRate, highGrowthYears, terminalGrowthRate, wacc } = inputs;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Risk assessment based on key assumptions
  const spread = wacc - terminalGrowthRate;
  if (spread < 0.02) {
    riskLevel = 'High';
  } else if (spread < 0.05) {
    riskLevel = 'Medium';
  }

  if (highGrowthRate > 0.15) {
    riskLevel = 'High'; // Aggressive growth assumption increases uncertainty
  } else if (highGrowthRate > 0.10) {
    riskLevel = Math.max(riskLevel, 'Medium' as const);
  }

  if (highGrowthYears > 10) {
    riskLevel = 'High'; // Long explicit period increases forecasting risk
  } else if (highGrowthYears > 5) {
    riskLevel = Math.max(riskLevel, 'Medium' as const);
  }

  let recommendation = `The estimated enterprise value based on FCFF is $${result.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}. This valuation assumes a ${highGrowthYears}-year high-growth period at ${highGrowthRate * 100}% followed by perpetual growth at ${terminalGrowthRate * 100}%. `;

  switch (riskLevel) {
    case 'Low':
      recommendation += 'The assumptions are conservative, indicating a relatively stable and reliable valuation. Consider this as a strong baseline for investment decisions.';
      break;
    case 'Medium':
      recommendation += 'There is moderate risk in the growth and discount rate assumptions. Perform sensitivity analysis on key inputs like WACC and growth rates to validate robustness.';
      break;
    case 'High':
      recommendation += 'High risk due to aggressive growth projections or narrow spread between WACC and terminal growth. Approach with caution and incorporate scenario analysis or consult additional data sources.';
      break;
  }

  recommendation += ' Always compare this intrinsic value to the current market enterprise value (market cap + net debt - cash) for buy/sell/hold recommendations.';

  return { recommendation, riskLevel };
}
```