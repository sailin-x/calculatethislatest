```typescript
import { ConvertibleBondPricingCalculatorInputs, ConvertibleBondPricingCalculatorMetrics, ConvertibleBondPricingCalculatorAnalysis } from './types';

// Helper function: Cumulative distribution function for standard normal distribution (approximation)
function cnd(x: number): number {
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (x >= 0.0) {
    const t = 1.0 / (1.0 + p * x);
    return 1.0 - c * Math.exp(-x * x / 2.0) * t *
      (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  } else {
    const t = 1.0 / (1.0 + p * (-x));
    return c * Math.exp(-x * x / 2.0) * t *
      (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
}

// Helper function: Black-Scholes call option price
function blackScholesCall(S: number, K: number, T: number, r: number, sigma: number, q: number = 0): number {
  if (T <= 0) {
    return Math.max(S * Math.exp(-q * T) - K * Math.exp(-r * T), 0);
  }
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return S * Math.exp(-q * T) * cnd(d1) - K * Math.exp(-r * T) * cnd(d2);
}

// Helper function: Calculate straight bond value (annual coupons, annual compounding)
function calculateStraightBondValue(faceValue: number, couponRate: number, yearsToMaturity: number, riskFreeRate: number): number {
  const coupon = faceValue * couponRate;
  let pvCoupons: number;
  let pvFace: number;

  if (riskFreeRate === 0) {
    pvCoupons = coupon * yearsToMaturity;
    pvFace = faceValue;
  } else {
    pvCoupons = coupon * (1 - Math.pow(1 + riskFreeRate, -yearsToMaturity)) / riskFreeRate;
    pvFace = faceValue * Math.pow(1 + riskFreeRate, -yearsToMaturity);
  }

  return pvCoupons + pvFace;
}

export function calculateResult(inputs: ConvertibleBondPricingCalculatorInputs): number {
  const { faceValue, couponRate, yearsToMaturity, conversionRatio, currentStockPrice, volatility, riskFreeRate, dividendYield = 0 } = inputs;

  // Calculate straight bond value
  const straightValue = calculateStraightBondValue(faceValue, couponRate, yearsToMaturity, riskFreeRate);

  // Calculate conversion price per share
  const conversionPrice = faceValue / conversionRatio;

  // Calculate embedded call option value (scaled by conversion ratio)
  const optionValue = conversionRatio * blackScholesCall(
    currentStockPrice,
    conversionPrice,
    yearsToMaturity,
    riskFreeRate,
    volatility,
    dividendYield
  );

  // Convertible bond price = straight value + option value
  return straightValue + optionValue;
}

export function generateAnalysis(
  inputs: ConvertibleBondPricingCalculatorInputs,
  metrics: ConvertibleBondPricingCalculatorMetrics
): ConvertibleBondPricingCalculatorAnalysis {
  const result = metrics.result;
  const { conversionRatio, currentStockPrice, volatility } = inputs;

  // Recompute for analysis (assuming metrics may not include all intermediates)
  const conversionValue = conversionRatio * currentStockPrice;
  const straightValue = calculateStraightBondValue(
    inputs.faceValue,
    inputs.couponRate,
    inputs.yearsToMaturity,
    inputs.riskFreeRate
  );
  const premiumToConversion = result - conversionValue;
  const premiumToStraight = result - straightValue;

  // Risk level based on volatility
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (volatility > 0.4) {
    riskLevel = 'High';
  } else if (volatility > 0.2) {
    riskLevel = 'Medium';
  }

  // Recommendation logic
  let recommendation: string;
  if (result < conversionValue) {
    recommendation = 'The calculated price is below the conversion value. This suggests the bond may be undervalued or conversion is advisable if permitted.';
  } else if (premiumToConversion / conversionValue < 0.05) {
    recommendation = 'Low premium over conversion value. Attractive for investors seeking equity upside with bond protection.';
  } else if (premiumToStraight > 0 && result > conversionValue) {
    recommendation = 'Trading at a premium to both straight bond and conversion values. Suitable for income-focused investors, but monitor stock volatility.';
  } else {
    recommendation = 'The pricing indicates balanced value. Assess yield to maturity and conversion potential against market conditions.';
  }

  return { recommendation, riskLevel };
}
```