```typescript
import { FundLevelIrrTvpiDpiCalculatorInputs, FundLevelIrrTvpiDpiCalculatorMetrics, FundLevelIrrTvpiDpiCalculatorAnalysis } from './types';

interface CashFlow {
  date: Date;
  amount: number;
}

function getYears(date: Date, baseDate: Date): number {
  const diffTime = date.getTime() - baseDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays / 365.25;
}

function npv(rate: number, cfs: CashFlow[], baseDate: Date): number {
  return cfs.reduce((sum, cf) => {
    const y = getYears(cf.date, baseDate);
    return sum + cf.amount / Math.pow(1 + rate, y);
  }, 0);
}

function npvDerivative(rate: number, cfs: CashFlow[], baseDate: Date): number {
  return cfs.reduce((sum, cf) => {
    const y = getYears(cf.date, baseDate);
    if (y === 0) return sum; // Avoid division issues
    const pow = Math.pow(1 + rate, y);
    return sum - (cf.amount * y) / (pow * (1 + rate));
  }, 0);
}

function calculateXIRR(cfs: CashFlow[], tolerance: number = 1e-7, maxIterations: number = 200): number {
  if (cfs.length < 2) return 0;

  // Sort by date to ensure order
  const sortedCfs = [...cfs].sort((a, b) => a.date.getTime() - b.getTime());
  const baseDate = sortedCfs[0].date;

  // Filter non-zero for efficiency
  const nonZeroCfs = sortedCfs.filter(cf => Math.abs(cf.amount) > 1e-10);

  if (nonZeroCfs.length < 2) return 0;

  // Newton-Raphson method
  let rate = 0.1; // Initial guess
  for (let i = 0; i < maxIterations; i++) {
    const currentNPV = npv(rate, nonZeroCfs, baseDate);
    if (Math.abs(currentNPV) < tolerance) {
      return rate;
    }

    const deriv = npvDerivative(rate, nonZeroCfs, baseDate);
    if (Math.abs(deriv) < 1e-10) {
      break; // Fallback to bisection
    }

    const delta = currentNPV / deriv;
    const newRate = rate - delta;

    if (Math.abs(newRate - rate) < tolerance) {
      const finalNPV = npv(newRate, nonZeroCfs, baseDate);
      if (Math.abs(finalNPV) < tolerance * 10) { // Slightly relaxed for final check
        return newRate;
      }
      break;
    }

    rate = newRate;
    if (rate < -0.99) rate = -0.99;
    if (isNaN(rate)) break;
  }

  // Fallback to bisection method if Newton fails
  let low = -0.95;
  let high = 2.0;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const npvMid = npv(mid, nonZeroCfs, baseDate);
    if (Math.abs(npvMid) < tolerance) {
      return mid;
    }
    const npvLow = npv(low, nonZeroCfs, baseDate);
    if (npvLow * npvMid > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2; // Approximate
}

function calculatePaidIn(cashFlows: CashFlow[]): number {
  return -cashFlows
    .filter(cf => cf.amount < 0)
    .reduce((sum, cf) => sum + cf.amount, 0);
}

function calculateDistributions(cashFlows: CashFlow[]): number {
  return cashFlows
    .filter(cf => cf.amount > 0)
    .reduce((sum, cf) => sum + cf.amount, 0);
}

export function calculateResult(inputs: FundLevelIrrTvpiDpiCalculatorInputs): number {
  const { cashFlows, residualValue, valuationDate = new Date() } = inputs;

  const fullCfs: CashFlow[] = [
    ...cashFlows,
    { date: valuationDate, amount: Math.max(residualValue, 0) } // Assume non-negative NAV
  ];

  const nonZeroCfs = fullCfs.filter(cf => Math.abs(cf.amount) > 1e-10);
  if (nonZeroCfs.length < 2) {
    return 0;
  }

  const irrValue = calculateXIRR(nonZeroCfs);
  return isNaN(irrValue) ? 0 : irrValue;
}

export function calculateTVPI(inputs: FundLevelIrrTvpiDpiCalculatorInputs): number {
  const { cashFlows, residualValue } = inputs;
  const paidIn = calculatePaidIn(cashFlows);
  if (paidIn <= 0) {
    return residualValue > 0 ? Infinity : 0;
  }
  const distributions = calculateDistributions(cashFlows);
  return (distributions + Math.max(residualValue, 0)) / paidIn;
}

export function calculateDPI(inputs: FundLevelIrrTvpiDpiCalculatorInputs): number {
  const { cashFlows } = inputs;
  const paidIn = calculatePaidIn(cashFlows);
  if (paidIn <= 0) {
    return 0;
  }
  const distributions = calculateDistributions(cashFlows);
  return distributions / paidIn;
}

export function generateAnalysis(
  inputs: FundLevelIrrTvpiDpiCalculatorInputs,
  metrics: FundLevelIrrTvpiDpiCalculatorMetrics
): FundLevelIrrTvpiDpiCalculatorAnalysis {
  const result = metrics.result; // IRR
  const tvpi = metrics.tvpi ?? 0;
  const dpi = metrics.dpi ?? 0;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let recommendation = 'Fund metrics are unavailable or invalid.';

  if (tvpi > 0 && !isNaN(tvpi) && !isFinite(tvpi) === false) {
    const distributedRatio = tvpi > 0 ? dpi / tvpi : 0;
    if (distributedRatio > 0.7) {
      riskLevel = 'Low';
    } else if (distributedRatio > 0.3) {
      riskLevel = 'Medium';
    } else {
      riskLevel = 'High';
    }

    const irrPct = (result * 100).toFixed(2);
    const tvpiStr = isFinite(tvpi) ? tvpi.toFixed(2) : '∞';
    const dpiStr = dpi.toFixed(2);
    let performance = '';
    if (result > 0.15) {
      performance = 'strong';
    } else if (result > 0.05) {
      performance = 'adequate';
    } else {
      performance = 'poor';
    }
    recommendation = `The fund exhibits an IRR of ${irrPct}%, TVPI of ${tvpiStr}x, and DPI of ${dpiStr}x. This suggests ${performance} performance. The risk level is ${riskLevel.toLowerCase()} based on the distribution ratio of approximately ${(distributedRatio * 100).toFixed(0)}%.`;
  } else if (isFinite(tvpi) && tvpi === 0) {
    riskLevel = 'High';
    recommendation = 'The fund has no value creation observed (TVPI = 0). High risk; consider exit or review.';
  }

  return { recommendation, riskLevel };
}
```