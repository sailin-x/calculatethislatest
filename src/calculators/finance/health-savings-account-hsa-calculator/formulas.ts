import { HSAInputs, HSAResults, HSAMetrics } from './types';

export function calculateHSA(inputs: HSAInputs): HSAResults {
  const {
    annualContribution,
    currentBalance,
    age,
    coverageType,
    contributionType,
    investmentReturn,
    inflationRate,
    yearsUntilRetirement,
    qualifiedExpenses,
    nonQualifiedWithdrawals,
    penaltyRate,
    incomeTaxRate
  } = inputs;

  // Calculate total contributions over time
  const totalContributions = currentBalance + (annualContribution * yearsUntilRetirement);

  // Calculate investment growth
  const futureValueFactor = Math.pow(1 + investmentReturn / 100, yearsUntilRetirement);
  const investmentGrowth = (currentBalance + annualContribution * ((futureValueFactor - 1) / (investmentReturn / 100))) * futureValueFactor - totalContributions;

  // Total balance before withdrawals
  const totalBalance = totalContributions + investmentGrowth;

  // Calculate qualified withdrawals (tax-free)
  const qualifiedWithdrawals = Math.min(qualifiedExpenses, totalBalance);

  // Calculate non-qualified withdrawals
  const nonQualifiedWithdrawalsAmount = Math.min(nonQualifiedWithdrawals, totalBalance - qualifiedWithdrawals);

  // Calculate penalties for non-qualified withdrawals before age 65
  const penaltiesPaid = age < 65 ? nonQualifiedWithdrawalsAmount * (penaltyRate / 100) : 0;

  // Calculate taxes on non-qualified withdrawals
  const taxableAmount = nonQualifiedWithdrawalsAmount;
  const taxesPaid = taxableAmount * (incomeTaxRate / 100);

  // Net benefit after penalties and taxes
  const netBenefit = qualifiedWithdrawals + (nonQualifiedWithdrawalsAmount - penaltiesPaid - taxesPaid);

  // Tax savings from pre-tax contributions
  const taxSavings = totalContributions * (incomeTaxRate / 100);

  // Future value of remaining balance
  const remainingBalance = totalBalance - qualifiedWithdrawals - nonQualifiedWithdrawalsAmount;
  const futureValue = remainingBalance * Math.pow(1 + investmentReturn / 100, 30); // 30 years post-retirement

  // Break-even age for withdrawals
  const breakEvenAge = age + yearsUntilRetirement;

  return {
    totalContributions,
    investmentGrowth,
    totalBalance,
    qualifiedWithdrawals,
    nonQualifiedWithdrawals: nonQualifiedWithdrawalsAmount,
    penaltiesPaid,
    taxesPaid,
    netBenefit,
    taxSavings,
    futureValue,
    breakEvenAge
  };
}

export function calculateHSAMetrics(
  inputs: HSAInputs,
  results: HSAResults
): HSAMetrics {
  const { annualContribution, qualifiedExpenses, nonQualifiedWithdrawals } = inputs;
  const { totalContributions, netBenefit, penaltiesPaid, taxesPaid } = results;

  // Contribution utilization rate
  const totalWithdrawals = qualifiedExpenses + nonQualifiedWithdrawals;
  const contributionUtilization = totalContributions > 0 ? (totalWithdrawals / totalContributions) * 100 : 0;

  // Tax efficiency score
  const taxEfficiency = netBenefit > 0 ? ((netBenefit - penaltiesPaid - taxesPaid) / netBenefit) * 100 : 0;

  // Risk assessment
  let riskAssessment: 'low' | 'medium' | 'high' = 'low';
  if (penaltiesPaid > 0) {
    riskAssessment = 'high';
  } else if (contributionUtilization < 50) {
    riskAssessment = 'medium';
  }

  // Savings potential
  const savingsPotential = annualContribution * 10; // 10 years of contributions

  return {
    contributionUtilization,
    taxEfficiency,
    riskAssessment,
    savingsPotential
  };
}

export function validateHSAInputs(inputs: HSAInputs): string[] {
  const errors: string[] = [];

  if (inputs.annualContribution <= 0) {
    errors.push('Annual contribution must be greater than $0');
  }

  if (inputs.age < 0 || inputs.age > 120) {
    errors.push('Age must be between 0 and 120');
  }

  if (inputs.investmentReturn < -20 || inputs.investmentReturn > 50) {
    errors.push('Investment return must be between -20% and 50%');
  }

  if (inputs.yearsUntilRetirement < 0 || inputs.yearsUntilRetirement > 100) {
    errors.push('Years until retirement must be between 0 and 100');
  }

  if (inputs.qualifiedExpenses < 0) {
    errors.push('Qualified expenses cannot be negative');
  }

  if (inputs.nonQualifiedWithdrawals < 0) {
    errors.push('Non-qualified withdrawals cannot be negative');
  }

  return errors;
}