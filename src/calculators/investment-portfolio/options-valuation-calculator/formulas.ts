```typescript
import { OptionsValuationCalculatorInputs, OptionsValuationCalculatorMetrics, OptionsValuationCalculatorAnalysis } from './types';

/**
 * Approximates the cumulative distribution function (CDF) of the standard normal distribution.
 * Uses the Abramowitz and Stegun approximation for accuracy in Black-Scholes context.
 */
function normalCDF(x: number): number {
  const absX = Math.abs(x);
  const t = 1 / (1 + 0.2316419 * absX);
  const d = 0.39894228 * Math.exp(-x * x / 2);
  let probability = d * t * (
    0.319381530 * t -
    0.356563782 * t * t +
    1.781477937 * t * t * t -
    1.821255978 * t * t * t * t +
    1.330274429 * t * t * t * t * t
  );

  if (probability > 1) probability = 1;
  if (x >= 0) {
    return 1 - probability;
  }
  return probability;
}

/**
 * Calculates d1 in the Black-Scholes model.
 * d1 = [ln(S/K) + (r + σ²/2)T] / (σ √T)
 */
function calculateD1(inputs: OptionsValuationCalculatorInputs): number {
  const { stockPrice, strikePrice, timeToMaturity, riskFreeRate, volatility } = inputs;
  const sigmaSquared = volatility * volatility;
  const numerator = Math.log(stockPrice / strikePrice) + (riskFreeRate + sigmaSquared / 2) * timeToMaturity;
  const denominator = volatility * Math.sqrt(timeToMaturity);
  return denominator > 0 ? numerator / denominator : 0;
}

/**
 * Calculates d2 in the Black-Scholes model.
 * d2 = d1 - σ √T
 */
function calculateD2(d1: number, inputs: OptionsValuationCalculatorInputs): number {
  const { volatility, timeToMaturity } = inputs;
  return d1 - volatility * Math.sqrt(timeToMaturity);
}

/**
 * Calculates the Black-Scholes price for a European call option.
 * C = S * N(d1) - K * e^(-rT) * N(d2)
 */
function blackScholesCall(inputs: OptionsValuationCalculatorInputs): number {
  const d1 = calculateD1(inputs);
  const d2 = calculateD2(d1, inputs);
  const { stockPrice, strikePrice, timeToMaturity, riskFreeRate } = inputs;
  const discountFactor = Math.exp(-riskFreeRate * timeToMaturity);
  return stockPrice * normalCDF(d1) - strikePrice * discountFactor * normalCDF(d2);
}

/**
 * Calculates the Black-Scholes price for a European put option.
 * P = K * e^(-rT) * N(-d2) - S * N(-d1)
 */
function blackScholesPut(inputs: OptionsValuationCalculatorInputs): number {
  const d1 = calculateD1(inputs);
  const d2 = calculateD2(d1, inputs);
  const { stockPrice, strikePrice, timeToMaturity, riskFreeRate } = inputs;
  const discountFactor = Math.exp(-riskFreeRate * timeToMaturity);
  return strikePrice * discountFactor * normalCDF(-d2) - stockPrice * normalCDF(-d1);
}

/**
 * Calculates the intrinsic value of the option for comparison.
 */
function calculateIntrinsicValue(inputs: OptionsValuationCalculatorInputs): number {
  const { stockPrice, strikePrice, optionType } = inputs;
  if (optionType === 'call') {
    return Math.max(stockPrice - strikePrice, 0);
  }
  return Math.max(strikePrice - stockPrice, 0);
}

export function calculateResult(inputs: OptionsValuationCalculatorInputs): number {
  // Validate inputs
  if (inputs.timeToMaturity <= 0) {
    // At expiration, option value is intrinsic value
    return calculateIntrinsicValue(inputs);
  }
  if (inputs.volatility <= 0 || inputs.stockPrice <= 0 || inputs.strikePrice <= 0 || inputs.riskFreeRate < 0) {
    throw new Error('Invalid inputs: prices and volatility must be positive, risk-free rate non-negative');
  }

  // Compute Black-Scholes option price
  return inputs.optionType === 'call' ? blackScholesCall(inputs) : blackScholesPut(inputs);
}

export function generateAnalysis(
  inputs: OptionsValuationCalculatorInputs,
  metrics: OptionsValuationCalculatorMetrics
): OptionsValuationCalculatorAnalysis {
  const result = metrics.result;
  const intrinsicValue = calculateIntrinsicValue(inputs);
  const timeValue = result - intrinsicValue;
  const moneyness = inputs.stockPrice / inputs.strikePrice;

  // Risk level based on volatility (common in options trading)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.volatility < 0.20) {
    riskLevel = 'Low';
  } else if (inputs.volatility < 0.50) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Recommendation based on option pricing relative to intrinsic value and moneyness
  let recommendation: string;
  if (timeValue < 0) {
    // Theoretical mispricing (shouldn't happen with Black-Scholes, but flag)
    recommendation = 'Option appears underpriced relative to intrinsic value; consider arbitrage opportunities.';
  } else if (moneyness > 1.05 && inputs.optionType === 'call') {
    recommendation = `Call option is out-of-the-money with ${timeValue.toFixed(2)} time value. Suitable for bullish strategies if volatility increases.`;
  } else if (moneyness < 0.95 && inputs.optionType === 'put') {
    recommendation = `Put option is out-of-the-money with ${timeValue.toFixed(2)} time value. Suitable for bearish strategies if volatility increases.`;
  } else {
    recommendation = `Option priced at ${result.toFixed(2)}, with ${timeValue.toFixed(2)} time value. Evaluate Greeks for delta-neutral hedging.`;
  }

  return { recommendation, riskLevel };
}
```