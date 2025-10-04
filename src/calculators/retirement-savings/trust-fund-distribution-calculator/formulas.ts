```typescript
import { TrustFundDistributionCalculatorInputs, TrustFundDistributionCalculatorMetrics, TrustFundDistributionCalculatorAnalysis } from './types';

/**
 * Calculates the annuity payment (annual distribution) for a trust fund using the formula for the fixed payment
 * from a present value annuity, adjusted for real return rate to account for inflation.
 * 
 * Formula: PMT = PV * (r * (1 + r)^n) / ((1 + r)^n - 1)
 * Where:
 * - PV = initial trust fund amount
 * - r = real annual return rate (expected return - inflation)
 * - n = number of years
 * 
 * If r = 0, falls back to equal distribution: PV / n
 * 
 * This assumes annual compounding and distributions, providing a constant real annual withdrawal
 * that depletes the fund over the specified years.
 */
function calculateAnnuityPayment(
  pv: number,
  realRate: number,
  periods: number
): number {
  if (periods <= 0) {
    return 0;
  }
  if (realRate === 0) {
    return pv / periods;
  }
  const numerator = realRate * Math.pow(1 + realRate, periods);
  const denominator = Math.pow(1 + realRate, periods) - 1;
  return pv * (numerator / denominator);
}

export function calculateResult(inputs: TrustFundDistributionCalculatorInputs): number {
  const { initialTrustFund, expectedAnnualReturn, inflationRate, retirementYears } = inputs;

  // Validate inputs
  if (initialTrustFund <= 0 || retirementYears <= 0) {
    return 0;
  }

  const realRate = expectedAnnualReturn - inflationRate;
  // Ensure real rate is not negative for calculation (clamp to 0 to avoid unrealistic depletion)
  const effectiveRealRate = Math.max(0, realRate);

  const annualDistribution = calculateAnnuityPayment(initialTrustFund, effectiveRealRate, retirementYears);

  return Math.round(annualDistribution * 100) / 100; // Round to 2 decimal places for currency
}

export function generateAnalysis(
  inputs: TrustFundDistributionCalculatorInputs,
  metrics: TrustFundDistributionCalculatorMetrics
): TrustFundDistributionCalculatorAnalysis {
  const { initialTrustFund, expectedAnnualReturn, inflationRate, retirementYears } = inputs;
  const result = metrics.result;
  const realRate = expectedAnnualReturn - inflationRate;

  // Calculate initial withdrawal rate for risk assessment
  const initialWithdrawalRate = result / initialTrustFund;

  // Risk level based on initial withdrawal rate (common benchmark: >7% high risk, 5-7% medium, <5% low for sustainable retirement)
  // Adjusts for finite period depletion
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (initialWithdrawalRate > 0.07) {
    riskLevel = 'High';
  } else if (initialWithdrawalRate > 0.05) {
    riskLevel = 'Medium';
  }

  // Additional risk factor: if real rate < 2%, increase risk
  if (realRate < 0.02) {
    if (riskLevel === 'Low') {
      riskLevel = 'Medium';
    } else if (riskLevel === 'Medium') {
      riskLevel = 'High';
    }
  }

  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = `With your inputs, the trust fund supports a sustainable annual distribution of $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. This plan has low risk of depletion over ${retirementYears} years, assuming steady returns. Consider consulting a financial advisor for tax implications in trust distributions.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `The calculated annual distribution of $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} carries medium risk. Your assumed real return (${(realRate * 100).toFixed(1)}%) is reasonable but monitor market volatility. Diversify investments and review annually to ensure the fund lasts ${retirementYears} years.`;
  } else {
    recommendation = `High risk detected for the annual distribution of $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. The withdrawal rate exceeds safe benchmarks. Lower expectations, increase the initial fund, or extend the timeline beyond ${retirementYears} years. Professional financial planning is strongly recommended to avoid early depletion.`;
  }

  return { recommendation, riskLevel };
}
```