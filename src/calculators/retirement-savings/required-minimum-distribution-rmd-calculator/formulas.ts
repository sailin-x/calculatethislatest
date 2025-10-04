```typescript
import {
  RequiredMinimumDistributionCalculatorInputs,
  RequiredMinimumDistributionCalculatorMetrics,
  RequiredMinimumDistributionCalculatorAnalysis,
} from './types';

/**
 * Retrieves the IRS Uniform Lifetime Table life expectancy factor for the given age.
 * This table is used for most RMD calculations (account owner not more than 10 years younger than beneficiary).
 * Values are based on IRS Publication 590-B, Appendix B, Table III (Uniform Lifetime Table, updated for 2022+).
 * For ages below 72, returns null to indicate no RMD is required.
 * For ages above 120, extrapolates linearly from age 120 factor (5.0, approximate).
 */
function getLifeExpectancyFactor(age: number): number | null {
  if (age < 72) {
    return null;
  }

  const uniformLifetimeTable: Record<number, number> = {
    72: 27.4,
    73: 26.5,
    74: 25.5,
    75: 24.6,
    76: 23.7,
    77: 22.9,
    78: 22.0,
    79: 21.1,
    80: 20.2,
    81: 19.4,
    82: 18.5,
    83: 17.7,
    84: 16.8,
    85: 16.0,
    86: 15.2,
    87: 14.4,
    88: 13.7,
    89: 12.9,
    90: 12.2,
    91: 11.5,
    92: 10.8,
    93: 10.1,
    94: 9.5,
    95: 8.9,
    96: 8.4,
    97: 7.8,
    98: 7.3,
    99: 6.8,
    100: 6.4,
    101: 6.0,
    102: 5.6,
    103: 5.2,
    104: 4.9,
    105: 4.6,
    106: 4.3,
    107: 4.1,
    108: 3.9,
    109: 3.7,
    110: 3.5,
    111: 3.4,
    112: 3.3,
    113: 3.1,
    114: 3.0,
    115: 2.9,
    116: 2.8,
    117: 2.7,
    118: 2.6,
    119: 2.5,
    120: 2.4,
  };

  if (age in uniformLifetimeTable) {
    return uniformLifetimeTable[age as keyof typeof uniformLifetimeTable];
  }

  // Extrapolate for ages >120 (rare, but for completeness; decreases by ~0.1 per year)
  const maxAge = 120;
  const maxFactor = 2.4;
  const extrapolationFactor = maxFactor - 0.1 * (age - maxAge);
  return Math.max(extrapolationFactor, 1.0); // Minimum factor of 1.0 to avoid division by zero or negative
}

export function calculateResult(inputs: RequiredMinimumDistributionCalculatorInputs): number {
  const { age, balance } = inputs;

  if (typeof age !== 'number' || typeof balance !== 'number' || age < 0 || balance < 0) {
    throw new Error('Invalid inputs: age and balance must be non-negative numbers.');
  }

  const factor = getLifeExpectancyFactor(age);
  if (factor === null) {
    return 0; // No RMD required
  }

  // RMD = Account Balance (as of Dec 31 prior year) / Life Expectancy Factor
  const rmd = balance / factor;
  return Math.max(rmd, 0); // Ensure non-negative
}

export function generateAnalysis(
  inputs: RequiredMinimumDistributionCalculatorInputs,
  metrics: RequiredMinimumDistributionCalculatorMetrics,
): RequiredMinimumDistributionCalculatorAnalysis {
  const { age, balance } = inputs;
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (age < 72) {
    riskLevel = 'Low';
    recommendation = 'No Required Minimum Distribution (RMD) is required at this time. RMDs typically begin at age 72 (or 73 depending on birth year). Consult a tax advisor for your specific situation.';
  } else if (result > balance * 0.1) { // Arbitrary threshold: if RMD >10% of balance, higher risk (e.g., large withdrawal impact)
    riskLevel = 'High';
    recommendation = `Your calculated RMD is $${result.toFixed(2)}. This represents a significant portion of your balance. Withdrawing the RMD may impact your retirement funds—consider consulting a financial advisor to explore strategies like QCDs (Qualified Charitable Distributions) to meet RMD without taxable income. Failure to withdraw the full amount by December 31 may result in a 25% IRS penalty (reducible to 10% if corrected timely).`;
  } else {
    riskLevel = 'Medium';
    recommendation = `Your RMD for the year is $${result.toFixed(2)}, based on a balance of $${balance.toFixed(2)} and age ${age}. Ensure you withdraw at least this amount from your qualified retirement accounts by December 31 to comply with IRS rules. This calculation uses the Uniform Lifetime Table; if your spouse is the sole beneficiary and more than 10 years younger, a different table may apply for a potentially lower RMD.`;
  }

  return { recommendation, riskLevel };
}
```