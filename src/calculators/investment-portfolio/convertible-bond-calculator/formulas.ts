```typescript
import { 
  ConvertibleBondCalculatorInputs, 
  ConvertibleBondCalculatorMetrics, 
  ConvertibleBondCalculatorAnalysis 
} from './types';

/**
 * Calculates the straight bond value (investment value) using the present value of coupons and principal.
 * Assumes coupon payments are made at the specified frequency (default semi-annual).
 * @param inputs - The calculator inputs
 * @returns The straight bond value
 */
function calculateStraightBondValue(inputs: ConvertibleBondCalculatorInputs): number {
  const { 
    parValue, 
    annualCouponRate, 
    yearsToMaturity, 
    frequency = 2, 
    straightBondYield 
  } = inputs;

  const couponPayment = parValue * annualCouponRate / frequency;
  const numPeriods = yearsToMaturity * frequency;
  const periodicRate = straightBondYield / frequency;

  if (periodicRate === 0) {
    // If no discount, sum of undiscounted cash flows
    return parValue * (1 + annualCouponRate * yearsToMaturity);
  }

  // PV of annuity (coupons)
  const pvCoupons = couponPayment * (1 - Math.pow(1 + periodicRate, -numPeriods)) / periodicRate;
  
  // PV of principal
  const pvPrincipal = parValue * Math.pow(1 + periodicRate, -numPeriods);

  return pvCoupons + pvPrincipal;
}

/**
 * Calculates the conversion value based on the conversion ratio and current stock price.
 * Conversion ratio = parValue / conversionPrice
 * @param inputs - The calculator inputs
 * @returns The conversion value
 */
function calculateConversionValue(inputs: ConvertibleBondCalculatorInputs): number {
  const { parValue, conversionPrice, stockPrice } = inputs;
  const conversionRatio = parValue / conversionPrice;
  return conversionRatio * stockPrice;
}

/**
 * Calculates the primary result for the convertible bond: the floor value, which is the maximum of 
 * the straight bond value and the conversion value. This represents the minimum theoretical value 
 * of the convertible bond.
 * @param inputs - The calculator inputs
 * @returns The floor value of the convertible bond
 */
export function calculateResult(inputs: ConvertibleBondCalculatorInputs): number {
  const straightValue = calculateStraightBondValue(inputs);
  const conversionValue = calculateConversionValue(inputs);
  return Math.max(straightValue, conversionValue);
}

/**
 * Generates an analysis for the convertible bond, including a recommendation and risk level.
 * The analysis is based on the relative magnitudes of the straight bond value and conversion value.
 * Higher conversion value relative to straight value indicates more equity-like behavior (higher risk/upside).
 * @param inputs - The calculator inputs
 * @param metrics - The computed metrics (at minimum includes result)
 * @returns The analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: ConvertibleBondCalculatorInputs, 
  metrics: ConvertibleBondCalculatorMetrics
): ConvertibleBondCalculatorAnalysis {
  const result = metrics.result;
  const straightValue = calculateStraightBondValue(inputs);
  const conversionValue = calculateConversionValue(inputs);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  const conversionPremiumRatio = conversionValue / straightValue;

  if (conversionValue <= straightValue) {
    // Bond-like: lower risk, focus on income
    riskLevel = 'Low';
    recommendation = 'This convertible bond behaves primarily like a traditional bond, offering stable income with limited conversion upside. Suitable for conservative investors seeking yield with downside protection.';
  } else if (conversionPremiumRatio > 1.3) {
    // Highly equity-like: higher risk
    riskLevel = 'High';
    recommendation = 'The conversion value significantly exceeds the straight bond value, making this bond equity-like with substantial upside potential from stock conversion. Consider for growth-oriented portfolios, but be aware of increased volatility.';
  } else {
    // Balanced: medium risk
    riskLevel = 'Medium';
    recommendation = 'The bond offers a balance between fixed income security and conversion potential. Monitor stock price movements, as conversion value is approaching or exceeding bond value. Ideal for diversified portfolios.';
  }

  // Additional context if result is near par value
  if (Math.abs(result - inputs.parValue) / inputs.parValue < 0.05) {
    recommendation += ' The value is close to par, indicating fair pricing relative to fundamentals.';
  }

  return { recommendation, riskLevel };
}
```