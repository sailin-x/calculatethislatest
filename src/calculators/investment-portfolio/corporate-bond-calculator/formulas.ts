```typescript
import { CorporateBondCalculatorInputs, CorporateBondCalculatorMetrics, CorporateBondCalculatorAnalysis } from './types';

/**
 * Calculates the present value (price) of a corporate bond using the yield to maturity.
 * Formula: Price = Σ [C / (1 + r)^t] + FV / (1 + r)^n
 * Where C = periodic coupon payment, r = periodic discount rate, t = period, n = total periods, FV = face value.
 */
function calculateBondPrice(
  faceValue: number,
  annualCouponRate: number,
  yearsToMaturity: number,
  yieldToMaturity: number,
  paymentsPerYear: number
): number {
  const periodicCoupon = (faceValue * (annualCouponRate / 100)) / paymentsPerYear;
  const totalPeriods = yearsToMaturity * paymentsPerYear;
  const periodicRate = (yieldToMaturity / 100) / paymentsPerYear;

  if (periodicRate === 0) {
    // Edge case: no discounting
    return faceValue + (periodicCoupon * totalPeriods);
  }

  let price = 0;
  for (let t = 1; t <= totalPeriods; t++) {
    price += periodicCoupon / Math.pow(1 + periodicRate, t);
  }
  price += faceValue / Math.pow(1 + periodicRate, totalPeriods);

  return Math.round(price * 100) / 100; // Round to 2 decimal places for currency
}

/**
 * Determines the risk level based on the corporate bond's credit rating.
 * Standard rating categories:
 * - Investment grade (AAA to BBB-): Low to Medium
 * - High yield (BB+ and below): High
 */
function getRiskLevel(creditRating: string): 'Low' | 'Medium' | 'High' {
  const rating = creditRating.toUpperCase().trim();
  if (['AAA', 'AA', 'A'].some(r => rating.startsWith(r))) {
    return 'Low';
  } else if (['BBB', 'BB'].some(r => rating.startsWith(r))) {
    return 'Medium';
  } else {
    return 'High';
  }
}

/**
 * Generates a recommendation based on bond pricing relative to par value and yield comparison.
 */
function generateRecommendation(
  inputs: CorporateBondCalculatorInputs,
  bondPrice: number
): string {
  const { faceValue, annualCouponRate, yieldToMaturity } = inputs;
  const premiumDiscountThreshold = 0.98; // 2% threshold for classification
  const isDiscount = bondPrice < (faceValue * premiumDiscountThreshold);
  const isPremium = bondPrice > (faceValue / premiumDiscountThreshold);
  const higherYield = yieldToMaturity > annualCouponRate;

  if (isDiscount && higherYield) {
    return 'The bond is trading at a discount with a higher yield to maturity than the coupon rate, suggesting potential value for income-focused investors. Consider purchase if credit risk aligns with your portfolio.';
  } else if (isPremium) {
    return 'The bond is trading at a premium, which may indicate lower perceived risk but reduced yield. Suitable for conservative investors seeking stability.';
  } else if (higherYield) {
    return 'Yield to maturity exceeds coupon rate; attractive for yield-seeking but monitor credit rating for default risk.';
  } else {
    return 'Bond pricing is near par with balanced yield. Neutral hold or buy for diversification in corporate fixed income.';
  }
}

export function calculateResult(inputs: CorporateBondCalculatorInputs): number {
  const { faceValue, annualCouponRate, yearsToMaturity, yieldToMaturity, paymentsPerYear = 2 } = inputs;
  
  // Validate inputs
  if (faceValue <= 0 || annualCouponRate < 0 || yearsToMaturity <= 0 || yieldToMaturity < 0 || paymentsPerYear <= 0) {
    throw new Error('Invalid input values: All must be positive numbers.');
  }

  return calculateBondPrice(faceValue, annualCouponRate, yearsToMaturity, yieldToMaturity, paymentsPerYear);
}

export function generateAnalysis(
  inputs: CorporateBondCalculatorInputs,
  metrics: CorporateBondCalculatorMetrics
): CorporateBondCalculatorAnalysis {
  const bondPrice = metrics.result;
  const { creditRating } = inputs;
  const riskLevel = getRiskLevel(creditRating || 'BBB'); // Default to BBB if not provided
  const recommendation = generateRecommendation(inputs, bondPrice);

  return { recommendation, riskLevel };
}
```