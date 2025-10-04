```typescript
import { WarrantCalculatorInputs, WarrantCalculatorMetrics, WarrantCalculatorAnalysis } from './types';

function normCDF(x: number): number {
  // Approximation of the cumulative distribution function for the standard normal distribution
  // Based on the Abramowitz and Stegun approximation for the complementary error function
  if (x < 0) {
    return 1 - normCDF(-x);
  }
  const t = 1 / (1 + 0.2316419 * x);
  const d = 0.39894228 * Math.exp(-0.5 * x * x);
  const poly = t * (0.31938153 - t * (-0.356563782 + t * (1.781477937 - t * (1.821255978 - t * 1.330274429))));
  return 1 - d * poly;
}

function blackScholesCall(S: number, K: number, T: number, r: number, sigma: number, q: number = 0): number {
  if (T <= 0) {
    return Math.max(S - K, 0);
  }
  if (sigma <= 0) {
    return S * Math.exp(-q * T) - K * Math.exp(-r * T);
  }
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return S * Math.exp(-q * T) * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
}

function blackScholesPut(S: number, K: number, T: number, r: number, sigma: number, q: number = 0): number {
  if (T <= 0) {
    return Math.max(K - S, 0);
  }
  if (sigma <= 0) {
    return K * Math.exp(-r * T) - S * Math.exp(-q * T);
  }
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return K * Math.exp(-r * T) * normCDF(-d2) - S * Math.exp(-q * T) * normCDF(-d1);
}

function calculateIntrinsicValue(inputs: WarrantCalculatorInputs): number {
  const underlying = inputs.underlyingPrice;
  const strike = inputs.strikePrice;
  const ratio = inputs.conversionRatio;
  if (inputs.isCall) {
    return Math.max(underlying - strike, 0) / ratio;
  } else {
    return Math.max(strike - underlying, 0) / ratio;
  }
}

export function calculateResult(inputs: WarrantCalculatorInputs): number {
  const T = inputs.timeToExpiry / 365.25; // Account for leap years
  const r = inputs.riskFreeRate / 100;
  const sigma = inputs.volatility / 100;
  const q = inputs.dividendYield / 100;
  const S = inputs.underlyingPrice;
  const K = inputs.strikePrice;
  const ratio = inputs.conversionRatio;

  let optionValue: number;
  if (inputs.isCall) {
    optionValue = blackScholesCall(S, K, T, r, sigma, q);
  } else {
    optionValue = blackScholesPut(S, K, T, r, sigma, q);
  }

  // At expiration, revert to intrinsic value
  if (T <= 0) {
    return calculateIntrinsicValue(inputs);
  }

  return optionValue / ratio;
}

export function generateAnalysis(inputs: WarrantCalculatorInputs, metrics: WarrantCalculatorMetrics): WarrantCalculatorAnalysis {
  const theoreticalPrice = metrics.result;
  const marketPrice = inputs.warrantPrice;
  const intrinsicValue = calculateIntrinsicValue(inputs);
  const timeValue = marketPrice - intrinsicValue;
  const T = inputs.timeToExpiry / 365.25;
  const sigma = inputs.volatility / 100;

  let recommendation: string;
  const valuationDiff = (theoreticalPrice - marketPrice) / marketPrice * 100;
  if (valuationDiff > 5) {
    recommendation = `The warrant is undervalued by approximately ${valuationDiff.toFixed(1)}%. Consider buying if it aligns with your portfolio strategy and risk tolerance.`;
  } else if (valuationDiff < -5) {
    recommendation = `The warrant is overvalued by approximately ${Math.abs(valuationDiff).toFixed(1)}%. Consider selling or avoiding to prevent potential losses.`;
  } else {
    recommendation = `The warrant is fairly valued with a time value of $${timeValue.toFixed(2)}. Monitor underlying asset movements and volatility changes.`;
  }

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  // Risk assessment based on volatility and time to expiry for warrants
  const volatilityRisk = sigma > 0.3 ? 'High' : sigma > 0.15 ? 'Medium' : 'Low';
  const timeRisk = T < 0.083 ? 'High' : T < 0.5 ? 'Medium' : 'Low'; // <1 month high, <6 months medium
  // Combine: highest risk prevails
  if (volatilityRisk === 'High' || timeRisk === 'High') {
    riskLevel = 'High';
  } else if (volatilityRisk === 'Medium' || timeRisk === 'Medium') {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  return { recommendation, riskLevel };
}
```