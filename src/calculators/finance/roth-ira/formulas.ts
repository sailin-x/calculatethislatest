import { RothIRAInputs, RothIRAOutputs } from './types';

// 2024 Roth IRA contribution limits
const CONTRIBUTION_LIMITS_2024: { [key: string]: number } = {
  'single': 7500,
  'married_filing_jointly': 7500,
  'married_filing_separately': 3750,
  'head_of_household': 7500
};

// Income limits for Roth IRA contributions (2024)
const INCOME_LIMITS_2024: { [key: string]: { single: number; married: number } } = {
  'under_50': { single: 146000, married: 230000 },
  '50_and_over': { single: 161000, married: 240000 }
};

export function calculateFutureValueAnnuity(contribution: number, rate: number, periods: number): number {
  if (rate === 0) return contribution * periods;
  const r = rate / 100;
  return contribution * (Math.pow(1 + r, periods) - 1) / r;
}

export function calculateFutureValueLumpSum(principal: number, rate: number, periods: number): number {
  return principal * Math.pow(1 + rate / 100, periods);
}

export function getContributionLimit(filingStatus: string, age: number): number {
  const baseLimit = CONTRIBUTION_LIMITS_2024[filingStatus] || 7500;
  return age >= 50 ? baseLimit + 1000 : baseLimit; // Catch-up contribution
}

export function checkEligibility(income: number, filingStatus: string, age: number): { eligible: boolean; reason: string } {
  const isMarried = filingStatus.includes('married');
  const ageGroup = age >= 50 ? '50_and_over' : 'under_50';
  const limit = INCOME_LIMITS_2024[ageGroup][isMarried ? 'married' : 'single'];

  if (income <= limit) {
    return { eligible: true, reason: 'Income within limits for Roth IRA contributions' };
  } else {
    return {
      eligible: false,
      reason: `Modified AGI exceeds limit of $${limit.toLocaleString()}. Consider Backdoor Roth IRA strategy.`
    };
  }
}

export function calculateRothIRA(inputs: RothIRAInputs): RothIRAOutputs {
  const contributionLimit = getContributionLimit(inputs.filingStatus, inputs.currentAge);
  const eligibility = checkEligibility(inputs.income, inputs.filingStatus, inputs.currentAge);

  // Adjust contribution if it exceeds limit
  const actualContribution = Math.min(inputs.annualContribution, contributionLimit);
  const contributionLimitReached = inputs.annualContribution > contributionLimit;

  // Calculate future value of current balance
  const currentBalanceFutureValue = calculateFutureValueLumpSum(
    inputs.currentBalance,
    inputs.expectedAnnualReturn,
    inputs.yearsToContribute
  );

  // Calculate future value of contributions
  const contributionsFutureValue = calculateFutureValueAnnuity(
    actualContribution,
    inputs.expectedAnnualReturn,
    inputs.yearsToContribute
  );

  const futureValue = currentBalanceFutureValue + contributionsFutureValue;
  const totalContributions = inputs.currentBalance + (actualContribution * inputs.yearsToContribute);
  const totalEarnings = futureValue - totalContributions;

  // Calculate tax savings (Roth IRAs grow tax-free, so savings are on future withdrawals)
  const taxSavings = totalEarnings * (inputs.taxBracket / 100);

  // Effective return accounts for tax advantages
  const effectiveReturn = inputs.expectedAnnualReturn; // Roth IRAs have tax-free growth

  // Project balance by age
  const projectedBalanceByAge: Array<{ age: number; balance: number }> = [];
  let balance = inputs.currentBalance;
  let cumulativeContributions = inputs.currentBalance;

  for (let year = 0; year <= inputs.yearsToContribute; year++) {
    if (year > 0) {
      const yearContribution = Math.min(inputs.annualContribution, contributionLimit);
      balance = (balance + yearContribution) * (1 + inputs.expectedAnnualReturn / 100);
      cumulativeContributions += yearContribution;
    }

    projectedBalanceByAge.push({
      age: inputs.currentAge + year,
      balance: Math.round(balance)
    });
  }

  return {
    futureValue,
    totalContributions,
    totalEarnings,
    taxSavings,
    effectiveReturn,
    contributionLimitReached,
    eligibilityStatus: eligibility.reason,
    projectedBalanceByAge
  };
}

export function calculateResult(inputs: RothIRAInputs): number {
  const result = calculateRothIRA(inputs);
  return result.futureValue;
}