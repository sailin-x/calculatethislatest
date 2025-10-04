```typescript
import { SIMPLEIRACalculatorInputs, SIMPLEIRACalculatorMetrics, SIMPLEIRACalculatorAnalysis } from './types';

/**
 * Calculates the annual contribution for a SIMPLE IRA based on salary and contribution rates.
 * Assumes matching contributions and ignores annual IRS limits for simplicity (validate inputs externally).
 */
function calculateAnnualContribution(
  annualSalary: number,
  employeeContributionPercentage: number,
  employerContributionPercentage: number
): number {
  const employeeContribution = annualSalary * (employeeContributionPercentage / 100);
  const employerContribution = annualSalary * (employerContributionPercentage / 100);
  return employeeContribution + employerContribution;
}

/**
 * Calculates the future value of the current balance after compounding over the given years.
 */
function calculateFutureValueOfBalance(
  currentBalance: number,
  years: number,
  annualReturnRate: number
): number {
  if (years <= 0) return currentBalance;
  const r = annualReturnRate / 100;
  return currentBalance * Math.pow(1 + r, years);
}

/**
 * Calculates the future value of annual contributions as an ordinary annuity.
 */
function calculateFutureValueOfContributions(
  annualContribution: number,
  years: number,
  annualReturnRate: number
): number {
  if (years <= 0) return 0;
  const r = annualReturnRate / 100;
  if (r === 0) {
    return annualContribution * years;
  }
  return annualContribution * ((Math.pow(1 + r, years) - 1) / r);
}

export function calculateResult(inputs: SIMPLEIRACalculatorInputs): number {
  const {
    currentBalance = 0,
    currentAge = 0,
    retirementAge = 65,
    annualSalary = 0,
    employeeContributionPercentage = 0,
    employerContributionPercentage = 3, // Default to typical 3% match
    expectedAnnualReturn = 0,
  } = inputs;

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);

  const annualContribution = calculateAnnualContribution(
    annualSalary,
    employeeContributionPercentage,
    employerContributionPercentage
  );

  const futureValueCurrentBalance = calculateFutureValueOfBalance(
    currentBalance,
    yearsToRetirement,
    expectedAnnualReturn
  );

  const futureValueContributions = calculateFutureValueOfContributions(
    annualContribution,
    yearsToRetirement,
    expectedAnnualReturn
  );

  return futureValueCurrentBalance + futureValueContributions;
}

export function generateAnalysis(
  inputs: SIMPLEIRACalculatorInputs,
  metrics: SIMPLEIRACalculatorMetrics
): SIMPLEIRACalculatorAnalysis {
  const result = metrics.result;
  const {
    employeeContributionPercentage = 0,
    employerContributionPercentage = 3,
  } = inputs;

  const totalContributionRate = employeeContributionPercentage + employerContributionPercentage;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Risk assessment: Higher risk if total contribution rate is low (potential shortfall in retirement savings)
  if (totalContributionRate < 5) {
    riskLevel = 'High';
  } else if (totalContributionRate < 8) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  let recommendation = '';
  if (totalContributionRate < 5) {
    recommendation = `Your total contribution rate of ${totalContributionRate}% is relatively low, projecting a balance of $${result.toLocaleString()} at retirement. Consider increasing your employee contributions to at least 5-6% to reduce risk and build a stronger nest egg. Consult a financial advisor for personalized advice.`;
  } else if (totalContributionRate < 8) {
    recommendation = `With a total contribution rate of ${totalContributionRate}%, your projected balance is $${result.toLocaleString()}. This is a moderate start—aim to boost contributions if possible to enhance long-term security.`;
  } else {
    recommendation = `Excellent planning with a ${totalContributionRate}% total contribution rate, projecting $${result.toLocaleString()} at retirement. Continue this strategy and review annually to account for salary changes or market conditions.`;
  }

  return { recommendation, riskLevel };
}
```