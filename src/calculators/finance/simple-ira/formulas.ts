import { SimpleIRAInputs, SimpleIRAOutputs } from './types';

// SIMPLE IRA contribution limits (2024)
const SIMPLE_CONTRIBUTION_LIMIT_2024 = 16000; // Employee limit
const SIMPLE_CATCHUP_LIMIT_2024 = 3500; // For age 50+
const SIMPLE_EMPLOYER_MATCH_LIMIT = 16000; // Employer match limit

export function calculateSimpleContributionLimit(annualSalary: number, age?: number): number {
  // SIMPLE IRA employee contribution limit is $16,000 for 2024, plus $3,500 catch-up if 50+
  const baseLimit = SIMPLE_CONTRIBUTION_LIMIT_2024;
  const catchUp = (age && age >= 50) ? SIMPLE_CATCHUP_LIMIT_2024 : 0;
  return Math.min(baseLimit + catchUp, annualSalary);
}

export function calculateEmployerMatch(employeeContribution: number, employerMatch: number): number {
  // Employer match is typically a percentage of employee contribution, up to the limit
  return Math.min(employeeContribution * (employerMatch / 100), SIMPLE_EMPLOYER_MATCH_LIMIT);
}

export function calculateSimpleIRA(inputs: SimpleIRAInputs): SimpleIRAOutputs {
  // Calculate contribution limits
  const employeeLimit = calculateSimpleContributionLimit(inputs.annualSalary);
  const employerMatchAmount = calculateEmployerMatch(inputs.employeeContribution, inputs.employerMatch);

  // Adjust contributions to not exceed limits
  const actualEmployeeContribution = Math.min(inputs.employeeContribution, employeeLimit);
  const actualEmployerContribution = employerMatchAmount;

  const totalAnnualContribution = actualEmployeeContribution + actualEmployerContribution;
  const totalContributions = inputs.currentBalance + (totalAnnualContribution * inputs.yearsToContribute);

  // Calculate future value
  const currentBalanceFutureValue = inputs.currentBalance * Math.pow(1 + inputs.expectedAnnualReturn / 100, inputs.yearsToContribute);
  const contributionsFutureValue = totalAnnualContribution * (Math.pow(1 + inputs.expectedAnnualReturn / 100, inputs.yearsToContribute) - 1) / (inputs.expectedAnnualReturn / 100);

  const futureValue = currentBalanceFutureValue + contributionsFutureValue;
  const totalEarnings = futureValue - totalContributions;

  // Tax calculations - SIMPLE IRA contributions are pre-tax
  const taxSavings = totalAnnualContribution * inputs.yearsToContribute * (inputs.taxBracket / 100);

  // Eligibility check
  let eligibilityStatus = 'Eligible for SIMPLE IRA contributions';
  if (inputs.numberOfEmployees > 100) {
    eligibilityStatus = 'SIMPLE IRAs are limited to businesses with 100 or fewer employees';
  }

  // Project balance by year
  const projectedBalanceByYear: Array<{ year: number; balance: number; contributions: number; employerMatch: number }> = [];
  let balance = inputs.currentBalance;
  let cumulativeContributions = inputs.currentBalance;
  let cumulativeEmployerMatch = 0;

  for (let year = 0; year <= inputs.yearsToContribute; year++) {
    if (year > 0) {
      const yearEmployeeContribution = Math.min(actualEmployeeContribution, employeeLimit);
      const yearEmployerMatch = calculateEmployerMatch(yearEmployeeContribution, inputs.employerMatch);
      const yearTotalContribution = yearEmployeeContribution + yearEmployerMatch;

      balance = (balance + yearTotalContribution) * (1 + inputs.expectedAnnualReturn / 100);
      cumulativeContributions += yearEmployeeContribution;
      cumulativeEmployerMatch += yearEmployerMatch;
    }

    projectedBalanceByYear.push({
      year: year,
      balance: Math.round(balance),
      contributions: Math.round(cumulativeContributions),
      employerMatch: Math.round(cumulativeEmployerMatch)
    });
  }

  return {
    totalEmployeeContribution: actualEmployeeContribution * inputs.yearsToContribute,
    totalEmployerContribution: actualEmployerContribution * inputs.yearsToContribute,
    futureValue,
    totalContributions,
    totalEarnings,
    taxSavings,
    effectiveReturn: inputs.expectedAnnualReturn,
    contributionLimit: employeeLimit,
    employerMatchAmount: actualEmployerContribution,
    eligibilityStatus,
    projectedBalanceByYear
  };
}

export function calculateResult(inputs: SimpleIRAInputs): number {
  const result = calculateSimpleIRA(inputs);
  return result.futureValue;
}