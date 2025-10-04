```typescript
import { BondYieldCalculatorInputs, BondYieldCalculatorMetrics, BondYieldCalculatorAnalysis } from './types';

export function calculateResult(inputs: BondYieldCalculatorInputs): number {
  const { parValue, couponRate, yearsToMaturity, currentPrice } = inputs;
  
  // Validate inputs
  if (parValue <= 0 || couponRate < 0 || yearsToMaturity <= 0 || currentPrice <= 0) {
    return 0;
  }

  const frequency = 2; // Semi-annual payments standard for bonds
  const annualCouponPayment = (couponRate / 100) * parValue;
  const coupon = annualCouponPayment / frequency;
  const periods = yearsToMaturity * frequency;

  // Closed-form bond price function given annual yield y
  const bondPrice = (y: number): number => {
    const r = y / frequency;
    if (Math.abs(r) < 1e-10) { // Handle y ≈ 0
      return coupon * periods + parValue;
    }
    const pvCoupons = coupon * (1 - Math.pow(1 + r, -periods)) / r;
    const pvPar = parValue * Math.pow(1 + r, -periods);
    return pvCoupons + pvPar;
  };

  // Bisection method to solve for YTM
  let low = -0.5; // Allow slightly negative yields for edge cases
  let high = 2.0; // Upper bound 200%
  const tolerance = 1e-8;
  let maxIterations = 100;
  let y: number;

  while (high - low > tolerance && maxIterations-- > 0) {
    y = (low + high) / 2;
    const calculatedPrice = bondPrice(y);
    if (calculatedPrice > currentPrice) {
      low = y; // Yield too low, increase it
    } else {
      high = y; // Yield too high, decrease it
    }
  }

  return Math.max(0, y * 100); // Return as percentage, floor at 0
}

export function generateAnalysis(
  inputs: BondYieldCalculatorInputs,
  metrics: BondYieldCalculatorMetrics
): BondYieldCalculatorAnalysis {
  const result = metrics.result; // YTM in %
  const { couponRate, yearsToMaturity } = inputs;

  // Risk level based on yield (higher yield indicates higher risk)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 3) {
    riskLevel = 'Low';
  } else if (result < 7) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Adjust for short maturity (higher liquidity risk)
  if (yearsToMaturity < 1) {
    riskLevel = 'Medium' as const; // Override for very short-term
  }

  // Recommendation based on YTM vs. coupon rate
  let recommendation: string;
  const yieldDiff = result - couponRate;
  if (yieldDiff > 1) {
    recommendation = 'The bond is trading at a discount, providing a higher yield to maturity than the coupon rate. This could be an attractive buy for income-focused investors, provided the issuer\'s credit risk aligns with the assessed level.';
  } else if (yieldDiff < -1) {
    recommendation = 'The bond is trading at a premium, resulting in a lower yield to maturity than the coupon rate. Consider holding if already owned, but new purchases may offer better alternatives in the current market.';
  } else {
    recommendation = 'The bond is trading near par value, with yield to maturity closely matching the coupon rate. This suggests a stable, predictable return suitable for conservative portfolios.';
  }

  // Append risk-specific advice
  if (riskLevel === 'High') {
    recommendation += ' High yield indicates elevated credit or market risk—perform thorough due diligence.';
  } else if (riskLevel === 'Medium') {
    recommendation += ' Moderate yield suggests balanced risk; diversify within fixed income.';
  } else {
    recommendation += ' Low yield reflects safety; ideal for capital preservation.';
  }

  return { recommendation, riskLevel };
}
```