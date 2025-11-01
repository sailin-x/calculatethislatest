import { SEPIRAInputs, SEPIRAOutputs } from './types';

// SEP IRA contribution limits (2024)
const SEP_CONTRIBUTION_LIMIT_2024 = 69000; // 25% of compensation, max $69,000

export function calculateSEPContributionLimit(selfEmploymentIncome: number): number {
  // SEP IRA contribution limit is 25% of net self-employment income
  const maxContribution = Math.min(selfEmploymentIncome * 0.25, SEP_CONTRIBUTION_LIMIT_2024);
  return Math.max(0, maxContribution);
}

export function calculateSEPIRA(inputs: SEPIRAInputs): SEPIRAOutputs {
  // Calculate contribution limits
  const contributionLimit = calculateSEPContributionLimit(inputs.selfEmploymentIncome);

  // Adjust contributions to not exceed limits
  const actualEmployerContribution = Math.min(inputs.employerContribution, contributionLimit);
  const actualEmployeeContribution = Math.min(inputs.employeeContribution, contributionLimit - actualEmployerContribution);

  const totalAnnualContribution = actualEmployerContribution + actualEmployeeContribution;
  const totalContributions = inputs.currentBalance + (totalAnnualContribution * inputs.yearsToContribute);

  // Calculate future value
  const currentBalanceFutureValue = inputs.currentBalance * Math.pow(1 + inputs.expectedAnnualReturn / 100, inputs.yearsToContribute);
  const contributionsFutureValue = totalAnnualContribution * (Math.pow(1 + inputs.expectedAnnualReturn / 100, inputs.yearsToContribute) - 1) / (inputs.expectedAnnualReturn / 100);

  const futureValue = currentBalanceFutureValue + contributionsFutureValue;
  const totalEarnings = futureValue - totalContributions;

  // Tax calculations
  // Employer contributions are deductible, employee contributions may be deductible
  const taxSavings = actualEmployerContribution * (inputs.taxBracket / 100);

  // Eligibility check
  let eligibilityStatus = 'Eligible for SEP IRA contributions';
  if (inputs.businessType === 'corporation' && inputs.numberOfEmployees > 0) {
    eligibilityStatus = 'SEP IRAs are typically for self-employed individuals and small businesses, not corporations with employees';
  }

  // Project balance by year
  const projectedBalanceByYear: Array<{ year: number; balance: number; contributions: number }> = [];
  let balance = inputs.currentBalance;
  let cumulativeContributions = inputs.currentBalance;

  for (let year = 0; year <= inputs.yearsToContribute; year++) {
    if (year > 0) {
      const yearContribution = Math.min(totalAnnualContribution, contributionLimit);
      balance = (balance + yearContribution) * (1 + inputs.expectedAnnualReturn / 100);
      cumulativeContributions += yearContribution;
    }

    projectedBalanceByYear.push({
      year: year,
      balance: Math.round(balance),
      contributions: Math.round(cumulativeContributions)
    });
  }

  return {
    totalEmployerContribution: actualEmployerContribution * inputs.yearsToContribute,
    totalEmployeeContribution: actualEmployeeContribution * inputs.yearsToContribute,
    futureValue,
    totalContributions,
    totalEarnings,
    taxSavings: taxSavings * inputs.yearsToContribute,
    effectiveReturn: inputs.expectedAnnualReturn,
    contributionLimit,
    eligibilityStatus,
    projectedBalanceByYear
  };
}

export function calculateResult(inputs: SEPIRAInputs): number {
  const result = calculateSEPIRA(inputs);
  return result.futureValue;
}