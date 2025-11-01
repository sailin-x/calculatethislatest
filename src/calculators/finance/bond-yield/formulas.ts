import { BondYieldInputs, BondYieldMetrics, BondYieldAnalysis } from './types';

export function calculateYieldToMaturity(inputs: BondYieldInputs): number {
  const { faceValue, couponRate, yearsToMaturity, currentPrice, couponFrequency } = inputs;
  const coupon = (couponRate / 100) * faceValue / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  // Newton-Raphson method for YTM calculation
  let ytm = 0.05; // Initial guess
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    let pv = 0;
    let dPv = 0;

    for (let t = 1; t <= periods; t++) {
      const discountFactor = Math.pow(1 + ytm / couponFrequency, t);
      pv += coupon / discountFactor;
      dPv -= t * coupon / Math.pow(1 + ytm / couponFrequency, t + 1);
    }

    const principalPV = faceValue / Math.pow(1 + ytm / couponFrequency, periods);
    pv += principalPV;
    dPv -= periods * faceValue / Math.pow(1 + ytm / couponFrequency, periods + 1);

    const f = pv - currentPrice;
    const df = dPv;

    const newYtm = ytm - f / df;

    if (Math.abs(newYtm - ytm) < tolerance) {
      return newYtm * 100; // Convert to percentage
    }

    ytm = newYtm;
  }

  return ytm * 100; // Return best estimate if convergence not reached
}

export function calculateCurrentYield(inputs: BondYieldInputs): number {
  const { faceValue, couponRate, currentPrice } = inputs;
  const annualCoupon = (couponRate / 100) * faceValue;

  return (annualCoupon / currentPrice) * 100;
}

export function calculateTotalReturn(inputs: BondYieldInputs): number {
  const ytm = calculateYieldToMaturity(inputs) / 100;
  const yearsToMaturity = inputs.yearsToMaturity;

  // Simple total return calculation (assuming no reinvestment risk)
  return Math.pow(1 + ytm, yearsToMaturity) - 1;
}

export function calculateAverageAnnualReturn(inputs: BondYieldInputs): number {
  const totalReturn = calculateTotalReturn(inputs);
  const yearsToMaturity = inputs.yearsToMaturity;

  return (Math.pow(1 + totalReturn, 1 / yearsToMaturity) - 1) * 100;
}

export function calculateMacaulayDuration(inputs: BondYieldInputs): number {
  const { faceValue, couponRate, yearsToMaturity, currentPrice, couponFrequency } = inputs;
  const ytm = calculateYieldToMaturity(inputs) / 100;
  const coupon = (couponRate / 100) * faceValue / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  let duration = 0;
  let pvTotal = 0;

  for (let t = 1; t <= periods; t++) {
    const timeFactor = t / couponFrequency;
    const pv = coupon / Math.pow(1 + ytm / couponFrequency, t);
    duration += timeFactor * pv;
    pvTotal += pv;
  }

  const principalPV = faceValue / Math.pow(1 + ytm / couponFrequency, periods);
  duration += (periods / couponFrequency) * principalPV;
  pvTotal += principalPV;

  return duration / pvTotal;
}

export function calculateModifiedDuration(inputs: BondYieldInputs): number {
  const duration = calculateMacaulayDuration(inputs);
  const ytm = calculateYieldToMaturity(inputs) / 100;
  const couponFrequency = inputs.couponFrequency;

  return duration / (1 + ytm / couponFrequency);
}

export function calculateConvexity(inputs: BondYieldInputs): number {
  const { faceValue, couponRate, yearsToMaturity, currentPrice, couponFrequency } = inputs;
  const ytm = calculateYieldToMaturity(inputs) / 100;
  const coupon = (couponRate / 100) * faceValue / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;

  let convexity = 0;
  let pvTotal = 0;

  for (let t = 1; t <= periods; t++) {
    const timeFactor = t / couponFrequency;
    const pv = coupon / Math.pow(1 + ytm / couponFrequency, t);
    convexity += (timeFactor * (timeFactor + 1)) * pv / Math.pow(1 + ytm / couponFrequency, 2);
    pvTotal += pv;
  }

  const principalPV = faceValue / Math.pow(1 + ytm / couponFrequency, periods);
  const principalTime = periods / couponFrequency;
  convexity += (principalTime * (principalTime + 1)) * principalPV / Math.pow(1 + ytm / couponFrequency, 2);
  pvTotal += principalPV;

  return convexity / pvTotal;
}

export function calculateResult(inputs: BondYieldInputs): number {
  return calculateYieldToMaturity(inputs);
}

export function generateAnalysis(inputs: BondYieldInputs, metrics: BondYieldMetrics): BondYieldAnalysis {
  const ytm = metrics.yieldToMaturity;
  const currentYield = metrics.currentYield;
  const duration = calculateMacaulayDuration(inputs);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (duration > 10) riskLevel = 'High';
  else if (duration > 5) riskLevel = 'Medium';

  const durationRisk = duration;
  const convexity = calculateConvexity(inputs);
  const convexityBenefit = convexity > 0 ? 'Positive convexity provides protection' : 'Negative convexity increases risk';

  let yieldQuality = '';
  if (ytm > currentYield + 2) {
    yieldQuality = 'Attractive yield premium over current yield';
  } else if (ytm < currentYield - 2) {
    yieldQuality = 'Yield below current yield - potential discount';
  } else {
    yieldQuality = 'Yield in line with current yield';
  }

  let recommendation = '';
  if (ytm > 6) {
    recommendation = 'High yield suggests good income potential but evaluate credit risk.';
  } else if (ytm > 4) {
    recommendation = 'Moderate yield with reasonable risk-return profile.';
  } else {
    recommendation = 'Low yield may not compensate for interest rate risk.';
  }

  return { recommendation, riskLevel, yieldQuality, durationRisk, convexityBenefit };
}