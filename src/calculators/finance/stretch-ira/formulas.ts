import { StretchIRAInputs, StretchIRAOutputs } from './types';

// IRS Life Expectancy Table (2024) - Single Life Expectancy
const LIFE_EXPECTANCY_TABLE: { [age: number]: number } = {
  70: 27.4, 71: 26.5, 72: 25.6, 73: 24.7, 74: 23.8, 75: 22.9,
  76: 22.0, 77: 21.2, 78: 20.3, 79: 19.5, 80: 18.7, 81: 17.9,
  82: 17.1, 83: 16.3, 84: 15.5, 85: 14.8, 86: 14.1, 87: 13.4,
  88: 12.7, 89: 12.0, 90: 11.4, 91: 10.8, 92: 10.2, 93: 9.6,
  94: 9.1, 95: 8.6, 96: 8.1, 97: 7.6, 98: 7.1, 99: 6.7,
  100: 6.3, 101: 5.9, 102: 5.5, 103: 5.2, 104: 4.9, 105: 4.5,
  106: 4.2, 107: 3.9, 108: 3.7, 109: 3.4, 110: 3.1, 111: 2.9,
  112: 2.6, 113: 2.4, 114: 2.1, 115: 1.9
};

export function getLifeExpectancy(age: number): number {
  if (age < 70) return 27.4; // Maximum for under 70
  if (age > 115) return 1.9; // Minimum for over 115
  return LIFE_EXPECTANCY_TABLE[age] || 27.4;
}

export function calculateRequiredMinimumDistribution(balance: number, lifeExpectancy: number): number {
  return balance / lifeExpectancy;
}

export function calculateStretchIRADistribution(
  balance: number,
  age: number,
  taxBracket: number,
  withdrawalStrategy: string,
  fixedAmount?: number,
  fixedPercentage?: number
): { distribution: number; taxes: number; netAmount: number } {
  let distribution = 0;

  switch (withdrawalStrategy) {
    case 'required_minimum':
      const lifeExpectancy = getLifeExpectancy(age);
      distribution = calculateRequiredMinimumDistribution(balance, lifeExpectancy);
      break;
    case 'fixed_percentage':
      distribution = balance * (fixedPercentage! / 100);
      break;
    case 'fixed_amount':
      distribution = Math.min(fixedAmount!, balance);
      break;
  }

  // Calculate taxes (simplified - assuming ordinary income tax rate)
  const taxes = distribution * (taxBracket / 100);
  const netAmount = distribution - taxes;

  return { distribution, taxes, netAmount };
}

export function calculateStretchIRA(inputs: StretchIRAInputs): StretchIRAOutputs {
  let currentBalance = inputs.initialBalance;
  let totalDistributions = 0;
  let totalTaxesPaid = 0;
  let totalNetDistributions = 0;

  const yearByYearProjections: StretchIRAOutputs['yearByYearProjections'] = [];
  const beneficiaryAnalysis: StretchIRAOutputs['beneficiaryAnalysis'] = [];

  // Calculate for each beneficiary
  for (let b = 0; b < inputs.numberOfBeneficiaries; b++) {
    const beneficiaryAge = inputs.beneficiaryAges[b] || 70;
    let beneficiaryBalance = currentBalance / inputs.numberOfBeneficiaries; // Simplified split
    let beneficiaryDistributions = 0;
    let beneficiaryTaxes = 0;
    let beneficiaryNet = 0;

    const lifeExpectancy = getLifeExpectancy(beneficiaryAge);
    const beneficiaryYears = Math.min(inputs.analysisPeriod, lifeExpectancy);

    for (let year = 0; year < beneficiaryYears; year++) {
      const currentAge = beneficiaryAge + year;
      const lifeExp = getLifeExpectancy(currentAge);

      // Growth
      const growth = beneficiaryBalance * (inputs.expectedAnnualReturn / 100);
      beneficiaryBalance += growth;

      // Distribution
      const { distribution, taxes, netAmount } = calculateStretchIRADistribution(
        beneficiaryBalance,
        currentAge,
        inputs.taxBracket,
        inputs.withdrawalStrategy,
        inputs.fixedWithdrawalAmount,
        inputs.fixedWithdrawalPercentage
      );

      beneficiaryBalance -= distribution;
      beneficiaryDistributions += distribution;
      beneficiaryTaxes += taxes;
      beneficiaryNet += netAmount;

      // Add to year-by-year if this is the first beneficiary (for display)
      if (b === 0) {
        yearByYearProjections.push({
          year: year + 1,
          beginningBalance: beneficiaryBalance + distribution,
          growth,
          requiredMinimum: calculateRequiredMinimumDistribution(beneficiaryBalance + distribution, lifeExp),
          actualDistribution: distribution,
          taxes,
          netDistribution: netAmount,
          endingBalance: beneficiaryBalance
        });
      }
    }

    beneficiaryAnalysis.push({
      beneficiaryNumber: b + 1,
      age: beneficiaryAge,
      lifeExpectancy,
      totalDistributions: beneficiaryDistributions,
      totalTaxes: beneficiaryTaxes,
      netAmount: beneficiaryNet
    });

    totalDistributions += beneficiaryDistributions;
    totalTaxesPaid += beneficiaryTaxes;
    totalNetDistributions += beneficiaryNet;
  }

  const averageAnnualDistribution = totalDistributions / inputs.analysisPeriod;
  const effectiveTaxRate = totalDistributions > 0 ? (totalTaxesPaid / totalDistributions) * 100 : 0;
  const stretchDuration = Math.max(...beneficiaryAnalysis.map(b => b.lifeExpectancy));

  // Generate optimization recommendations
  const optimizationRecommendations: string[] = [];

  if (inputs.withdrawalStrategy === 'required_minimum') {
    optimizationRecommendations.push('Using Required Minimum Distributions maximizes stretch duration');
  }

  if (inputs.numberOfBeneficiaries > 1) {
    optimizationRecommendations.push('Multiple beneficiaries allow for longer stretch periods');
  }

  if (inputs.expectedAnnualReturn > 5) {
    optimizationRecommendations.push('Higher returns increase total distributions over time');
  }

  if (effectiveTaxRate > 30) {
    optimizationRecommendations.push('Consider tax-loss harvesting or Roth conversions to reduce tax burden');
  }

  return {
    totalDistributions,
    totalTaxesPaid,
    netDistributions: totalNetDistributions,
    remainingBalance: currentBalance,
    averageAnnualDistribution,
    effectiveTaxRate,
    stretchDuration,
    beneficiaryAnalysis,
    yearByYearProjections,
    optimizationRecommendations
  };
}

export function calculateResult(inputs: StretchIRAInputs): number {
  const result = calculateStretchIRA(inputs);
  return result.netDistributions;
}