```typescript
import { BondConvexityCalculatorInputs, BondConvexityCalculatorMetrics, BondConvexityCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the bond price.
 * @param parValue - Face value of the bond
 * @param couponRate - Annual coupon rate (decimal)
 * @param ytm - Yield to maturity (decimal)
 * @param yearsToMaturity - Years until maturity
 * @param paymentsPerYear - Number of coupon payments per year
 * @returns The bond price
 */
function calculateBondPrice(
  parValue: number,
  couponRate: number,
  ytm: number,
  yearsToMaturity: number,
  paymentsPerYear: number
): number {
  const periodicYield = ytm / paymentsPerYear;
  const periodicCoupon = (couponRate * parValue) / paymentsPerYear;
  const numPeriods = yearsToMaturity * paymentsPerYear;
  let price = 0;

  for (let t = 1; t <= numPeriods; t++) {
    const cashFlow = t === numPeriods ? periodicCoupon + parValue : periodicCoupon;
    price += cashFlow / Math.pow(1 + periodicYield, t);
  }

  return price;
}

/**
 * Helper function to calculate the convexity sum component.
 * @param parValue - Face value of the bond
 * @param couponRate - Annual coupon rate (decimal)
 * @param ytm - Yield to maturity (decimal)
 * @param yearsToMaturity - Years until maturity
 * @param paymentsPerYear - Number of coupon payments per year
 * @returns The sum for convexity calculation
 */
function calculateConvexitySum(
  parValue: number,
  couponRate: number,
  ytm: number,
  yearsToMaturity: number,
  paymentsPerYear: number
): number {
  const periodicYield = ytm / paymentsPerYear;
  const periodicCoupon = (couponRate * parValue) / paymentsPerYear;
  const numPeriods = yearsToMaturity * paymentsPerYear;
  let convexitySum = 0;

  for (let t = 1; t <= numPeriods; t++) {
    const cashFlow = t === numPeriods ? periodicCoupon + parValue : periodicCoupon;
    convexitySum += (t * (t + 1) * cashFlow) / Math.pow(1 + periodicYield, t);
  }

  return convexitySum;
}

export function calculateResult(inputs: BondConvexityCalculatorInputs): number {
  const { parValue, couponRate, ytm, yearsToMaturity, paymentsPerYear } = inputs;

  if (paymentsPerYear <= 0 || yearsToMaturity <= 0 || parValue <= 0) {
    throw new Error('Invalid inputs: parValue, yearsToMaturity, and paymentsPerYear must be positive');
  }

  const periodicYield = ytm / paymentsPerYear;
  const price = calculateBondPrice(parValue, couponRate, ytm, yearsToMaturity, paymentsPerYear);
  const convexitySum = calculateConvexitySum(parValue, couponRate, ytm, yearsToMaturity, paymentsPerYear);

  if (price <= 0) {
    throw new Error('Bond price calculation resulted in non-positive value');
  }

  const periodicConvexity = convexitySum / (price * Math.pow(1 + periodicYield, 2));
  const annualConvexity = periodicConvexity / (paymentsPerYear * paymentsPerYear);

  return annualConvexity;
}

export function generateAnalysis(
  inputs: BondConvexityCalculatorInputs,
  metrics: BondConvexityCalculatorMetrics
): BondConvexityCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Risk level based on convexity: lower convexity indicates less sensitivity to yield changes (lower risk in terms of rate volatility)
  if (result < 25) {
    riskLevel = 'Low';
  } else if (result < 100) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = 'The bond has low convexity, suggesting relatively linear price responses to interest rate changes. Suitable for conservative portfolios with minimal rate risk exposure.';
  } else if (riskLevel === 'Medium') {
    recommendation = 'The bond exhibits moderate convexity, providing some cushion against large yield shifts. Consider for balanced portfolios where moderate rate volatility is expected.';
  } else {
    recommendation = 'The bond has high convexity, offering significant protection (and potential upside) from interest rate decreases but amplified downside from increases. Ideal for portfolios seeking rate decline benefits, but monitor duration closely.';
  }

  return { recommendation, riskLevel };
}
```