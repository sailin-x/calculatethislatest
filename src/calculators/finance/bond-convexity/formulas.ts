import { BondConvexityInputs, BondConvexityMetrics, BondConvexityAnalysis } from './types';

export function calculateDuration(inputs: BondConvexityInputs): number {
  const { faceValue, couponRate, yearsToMaturity, yieldToMaturity, couponFrequency } = inputs;
  const ytm = yieldToMaturity / 100;
  const coupon = (couponRate / 100) * faceValue / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  let duration = 0;
  let pvTotal = 0;

  for (let t = 1; t <= periods; t++) {
    const pv = coupon / Math.pow(1 + ytm / couponFrequency, t);
    duration += (t / couponFrequency) * pv;
    pvTotal += pv;
  }

  // Add principal payment
  const principalPV = faceValue / Math.pow(1 + ytm / couponFrequency, periods);
  duration += (periods / couponFrequency) * principalPV;
  pvTotal += principalPV;

  return duration / pvTotal;
}

export function calculateConvexity(inputs: BondConvexityInputs): number {
  const { faceValue, couponRate, yearsToMaturity, yieldToMaturity, couponFrequency } = inputs;
  const ytm = yieldToMaturity / 100;
  const coupon = (couponRate / 100) * faceValue / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  let convexity = 0;
  let pvTotal = 0;

  for (let t = 1; t <= periods; t++) {
    const timeFactor = t / couponFrequency;
    const discountFactor = Math.pow(1 + ytm / couponFrequency, t);
    const pv = coupon / discountFactor;
    convexity += (timeFactor * (timeFactor + 1)) * pv / Math.pow(1 + ytm / couponFrequency, 2);
    pvTotal += pv;
  }

  // Add principal payment
  const principalPV = faceValue / Math.pow(1 + ytm / couponFrequency, periods);
  const principalTime = periods / couponFrequency;
  convexity += (principalTime * (principalTime + 1)) * principalPV / Math.pow(1 + ytm / couponFrequency, 2);
  pvTotal += principalPV;

  return convexity / pvTotal;
}

export function calculateModifiedDuration(inputs: BondConvexityInputs): number {
  const duration = calculateDuration(inputs);
  const ytm = inputs.yieldToMaturity / 100;
  const couponFrequency = inputs.couponFrequency;

  return duration / (1 + ytm / couponFrequency);
}

export function calculateModifiedConvexity(inputs: BondConvexityInputs): number {
  const convexity = calculateConvexity(inputs);
  const ytm = inputs.yieldToMaturity / 100;
  const couponFrequency = inputs.couponFrequency;

  return convexity / Math.pow(1 + ytm / couponFrequency, 2);
}

export function calculateEffectiveConvexity(inputs: BondConvexityInputs): number {
  // For simplicity, return the same as convexity for non-callable bonds
  // In practice, this would require price calculations at different yields
  return calculateConvexity(inputs);
}

export function calculatePriceChange(inputs: BondConvexityInputs, yieldChange: number = 0.01): number {
  const duration = calculateDuration(inputs);
  const convexity = calculateConvexity(inputs);
  const currentPrice = inputs.currentPrice || calculateBondPrice(inputs);

  const durationEffect = -duration * yieldChange;
  const convexityEffect = 0.5 * convexity * Math.pow(yieldChange, 2);

  return currentPrice * (durationEffect + convexityEffect);
}

export function calculatePercentagePriceChange(inputs: BondConvexityInputs, yieldChange: number = 0.01): number {
  const priceChange = calculatePriceChange(inputs, yieldChange);
  const currentPrice = inputs.currentPrice || calculateBondPrice(inputs);

  return (priceChange / currentPrice) * 100;
}

export function calculateConvexityAdjustment(inputs: BondConvexityInputs, yieldChange: number = 0.01): number {
  const convexity = calculateConvexity(inputs);
  const currentPrice = inputs.currentPrice || calculateBondPrice(inputs);

  return 0.5 * convexity * Math.pow(yieldChange, 2) * currentPrice;
}

function calculateBondPrice(inputs: BondConvexityInputs): number {
  const { faceValue, couponRate, yearsToMaturity, yieldToMaturity, couponFrequency } = inputs;
  const ytm = yieldToMaturity / 100;
  const coupon = (couponRate / 100) * faceValue / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  let price = 0;
  for (let t = 1; t <= periods; t++) {
    price += coupon / Math.pow(1 + ytm / couponFrequency, t);
  }
  price += faceValue / Math.pow(1 + ytm / couponFrequency, periods);

  return price;
}

export function calculateResult(inputs: BondConvexityInputs): number {
  return calculateConvexity(inputs);
}

export function generateAnalysis(inputs: BondConvexityInputs, metrics: BondConvexityMetrics): BondConvexityAnalysis {
  const convexity = metrics.convexity;
  const duration = metrics.duration;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (duration > 10) riskLevel = 'High';
  else if (duration > 5) riskLevel = 'Medium';

  const interestRateSensitivity = duration;
  const convexityBenefit = convexity > 0 ? 'Positive convexity provides cushion against rate changes' : 'Negative convexity increases risk';
  const stabilityScore = Math.min(100, Math.max(0, (1 - duration / 20) * 100));

  let recommendation = '';
  if (convexity > duration) {
    recommendation = 'High convexity provides good protection against interest rate volatility.';
  } else if (convexity > 0) {
    recommendation = 'Moderate convexity offers some protection but monitor interest rate environment.';
  } else {
    recommendation = 'Low or negative convexity increases interest rate risk. Consider duration management.';
  }

  return { recommendation, riskLevel, interestRateSensitivity, convexityBenefit, stabilityScore };
}