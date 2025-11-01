```typescript
import { StockOptionsValuationCalculatorInputs, StockOptionsValuationCalculatorMetrics, StockOptionsValuationCalculatorAnalysis } from './types';

/**
 * Approximates the cumulative distribution function (CDF) of the standard normal distribution.
 * Uses the Abramowitz and Stegun approximation for high accuracy in financial calculations.
 */
function normcdf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.SQRT2;

  const t = 1.0 / (1.0 + p * x);
  let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

/**
 * Calculates d1 in the Black-Scholes model.
 * d1 = [ln(S/K) + (r - q + σ²/2) * T] / (σ * √T)
 */
function calculateD1(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  q: number
): number {
  const numerator = Math.log(S / K) + (r - q + (sigma * sigma) / 2) * T;
  const denominator = sigma * Math.sqrt(T);
  return numerator / denominator;
}

/**
 * Calculates d2 in the Black-Scholes model.
 * d2 = d1 - σ * √T
 */
function calculateD2(d1: number, sigma: number, T: number): number {
  return d1 - sigma * Math.sqrt(T);
}

/**
 * Computes the theoretical fair value of a stock option using the Black-Scholes model.
 * Handles both call and put options, including dividend yield.
 * If T <= 0, returns intrinsic value.
 */
export function calculateResult(inputs: StockOptionsValuationCalculatorInputs): number {
  const S = inputs.currentPrice;
  const K = inputs.strikePrice;
  const T = inputs.timeToExpiration;
  const r = inputs.riskFreeRate;
  const sigma = inputs.volatility;
  const q = inputs.dividendYield || 0;
  const optionType = inputs.optionType;

  // Validate inputs
  if (S <= 0 || K <= 0 || T < 0 || r < 0 || sigma <= 0) {
    throw new Error('Invalid inputs: All prices, time, rate, and volatility must be positive; time >= 0');
  }

  // If expired, return intrinsic value
  if (T <= 0) {
    if (optionType === 'call') {
      return Math.max(S - K, 0);
    } else {
      return Math.max(K - S, 0);
    }
  }

  const d1 = calculateD1(S, K, T, r, sigma, q);
  const d2 = calculateD2(d1, sigma, T);

  const expNegQT = Math.exp(-q * T);
  const expNegRT = Math.exp(-r * T);

  const Nd1 = normcdf(d1);
  const Nd2 = normcdf(d2);
  const NNegD1 = normcdf(-d1);
  const NNegD2 = normcdf(-d2);

  let price: number;
  if (optionType === 'call') {
    price = S * expNegQT * Nd1 - K * expNegRT * Nd2;
  } else {
    price = K * expNegRT * NNegD2 - S * expNegQT * NNegD1;
  }

  return Math.max(price, 0); // Ensure non-negative
}

/**
 * Generates domain-specific analysis for the stock options valuation.
 * Assesses risk based on volatility and provides a recommendation based on intrinsic vs. time value.
 */
export function generateAnalysis(
  inputs: StockOptionsValuationCalculatorInputs,
  metrics: StockOptionsValuationCalculatorMetrics
): StockOptionsValuationCalculatorAnalysis {
  const result = metrics.result;
  const volatility = inputs.volatility;
  const optionType = inputs.optionType;
  const S = inputs.currentPrice;
  const K = inputs.strikePrice;

  // Risk level based on volatility (standard in options trading)
  let riskLevel: 'Low' | 'Medium' | 'High';
  if (volatility < 0.20) {
    riskLevel = 'Low';
  } else if (volatility < 0.50) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Intrinsic value
  const intrinsicValue = optionType === 'call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
  const timeValue = result - intrinsicValue;
  const isInTheMoney = intrinsicValue > 0;
  const moneyness = (S - K) / K; // Positive for ITM call, negative for OTM

  let recommendation: string;
  if (timeValue > 0.05 * result) { // Significant time premium (>5% of total value)
    if (isInTheMoney) {
      recommendation = 'The option has meaningful time value and is InTheMoney. Suitable for holding in a bullish (call) or bearish (put) portfolio if volatility materializes.';
    } else {
      recommendation = 'OutOfThe-money option with time premium. Consider for speculative strategies if expecting a directional move, but monitor high risk from volatility.';
    }
  } else if (isInTheMoney) {
    recommendation = 'Deep InTheMoney option with minimal time value. Evaluate early exercise or selling to capture intrinsic value, especially if dividends are involved.';
  } else {
    recommendation = 'OutOfThe-money option with low time value. Likely to expire worthless unless significant price movement; avoid unless part of a hedging strategy.';
  }

  return { recommendation, riskLevel };
}
```