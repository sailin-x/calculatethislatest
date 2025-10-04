```typescript
import { StretchIRACalculatorInputs, StretchIRACalculatorMetrics, StretchIRACalculatorAnalysis } from './types';

const lifeExpectancyTable: Record<number, number> = {
  0: 85.0,
  10: 75.0,
  20: 66.0,
  30: 57.0,
  40: 48.0,
  50: 39.0,
  60: 30.0,
  70: 22.0,
  80: 15.0,
  90: 9.0,
  100: 4.0,
};

function getLifeExpectancy(age: number): number {
  if (age < 0) return 0;
  const table = lifeExpectancyTable;
  const ages = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (age <= ages[0]) return table[ages[0]];
  if (age >= ages[ages.length - 1]) return table[ages[ages.length - 1]];

  for (let i = 0; i < ages.length - 1; i++) {
    if (ages[i] <= age && age < ages[i + 1]) {
      const lowerAge = ages[i];
      const upperAge = ages[i + 1];
      const lowerLE = table[lowerAge];
      const upperLE = table[upperAge];
      const ratio = (age - lowerAge) / (upperAge - lowerAge);
      return lowerLE + ratio * (upperLE - lowerLE);
    }
  }
  return 1.0; // Fallback for edge cases
}

export function calculateResult(inputs: StretchIRACalculatorInputs): number {
  const { iraBalance, beneficiaryAge, annualReturnRate } = inputs;
  if (iraBalance <= 0) return 0;

  let balance = iraBalance;
  let totalReceived = 0;
  let currentFactor = getLifeExpectancy(beneficiaryAge);

  // Prevent infinite loop in extreme cases
  let maxYears = 120;
  let year = 0;

  while (balance > 0 && currentFactor > 0 && year < maxYears) {
    let rmd: number;
    if (currentFactor <= 1) {
      rmd = balance;
    } else {
      rmd = balance / currentFactor;
    }
    totalReceived += rmd;
    balance -= rmd;
    balance *= (1 + annualReturnRate);
    currentFactor -= 1;
    year++;
  }

  // If balance remains after max years (unlikely), add it
  if (balance > 0) {
    totalReceived += balance;
  }

  return totalReceived;
}

export function generateAnalysis(
  inputs: StretchIRACalculatorInputs,
  metrics: StretchIRACalculatorMetrics
): StretchIRACalculatorAnalysis {
  const result = metrics.result;
  const { iraBalance, beneficiaryAge } = inputs;
  const lumpSum = iraBalance;
  const additionalAmount = result - lumpSum;

  let riskLevel: 'Low' | 'Medium' | 'High';
  if (beneficiaryAge < 40) {
    riskLevel = 'Low';
  } else if (beneficiaryAge < 65) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  const recommendation = `Stretching the inherited IRA over your life expectancy allows for continued tax-deferred growth within the account. Based on the assumptions, you could receive a total of $${result.toFixed(0)} in distributions over time, which is $${additionalAmount.toFixed(0)} more than the initial balance of $${lumpSum.toFixed(0)} if taken as a lump sum. This approach maximizes inheritance value but requires discipline to take only the required minimum distributions annually. Consult a tax advisor to confirm eligibility under current IRS rules (e.g., for eligible designated beneficiaries).`;

  return { recommendation, riskLevel };
}
```