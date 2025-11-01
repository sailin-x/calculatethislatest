import { RequiredMinimumDistributionRMDInputs, RequiredMinimumDistributionRMDOutputs } from './types';

// IRS Single Life Expectancy Table (excerpt for common ages)
const LIFE_EXPECTANCY_TABLE: { [key: number]: number } = {
  70: 27.4, 71: 26.5, 72: 25.6, 73: 24.7, 74: 23.8, 75: 22.9,
  76: 22.0, 77: 21.2, 78: 20.3, 79: 19.5, 80: 18.7, 81: 17.9,
  82: 17.1, 83: 16.3, 84: 15.5, 85: 14.8, 86: 14.1, 87: 13.4,
  88: 12.7, 89: 12.0, 90: 11.4, 91: 10.8, 92: 10.2, 93: 9.6,
  94: 9.1, 95: 8.6, 96: 8.1, 97: 7.6, 98: 7.1, 99: 6.7, 100: 6.3
};

// Joint Life Expectancy Table (for married couples)
const JOINT_LIFE_EXPECTANCY_TABLE: { [key: string]: number } = {
  '70-65': 28.9, '70-70': 27.1, '71-66': 28.0, '71-71': 26.2,
  '72-67': 27.1, '72-72': 25.3, '73-68': 26.2, '73-73': 24.4,
  '74-69': 25.3, '74-74': 23.5, '75-70': 24.4, '75-75': 22.7
};

export function getLifeExpectancyFactor(age: number, spouseAge?: number): number {
  if (spouseAge && age <= 75 && spouseAge <= 75) {
    const key = `${age}-${spouseAge}`;
    return JOINT_LIFE_EXPECTANCY_TABLE[key] || LIFE_EXPECTANCY_TABLE[age] || 1;
  }
  return LIFE_EXPECTANCY_TABLE[age] || 1;
}

export function calculateRequiredMinimumDistribution(inputs: RequiredMinimumDistributionRMDInputs): RequiredMinimumDistributionRMDOutputs {
  // Roth IRAs don't require RMDs during lifetime
  if (inputs.accountType === 'roth_ira') {
    return {
      requiredMinimumDistribution: 0,
      distributionPercentage: 0,
      lifeExpectancyFactor: 0,
      remainingBalanceAfterRMD: inputs.accountBalance,
      taxImplications: 'Roth IRA distributions are not required during lifetime. Qualified distributions are tax-free.',
      rmdExplanation: 'Roth IRA owners are not subject to Required Minimum Distributions during their lifetime.'
    };
  }

  // Determine age for calculation
  const currentYear = new Date().getFullYear();
  const age = inputs.currentAge || (currentYear - inputs.birthYear);

  // Check if RBD has been reached
  const rbdYear = inputs.birthYear >= 1951 ? inputs.birthYear + 72 : inputs.birthYear + 71;
  if (currentYear < rbdYear) {
    return {
      requiredMinimumDistribution: 0,
      distributionPercentage: 0,
      lifeExpectancyFactor: 0,
      remainingBalanceAfterRMD: inputs.accountBalance,
      taxImplications: 'RMDs are not required until you reach your Required Beginning Date.',
      rmdExplanation: `Your Required Beginning Date is April 1, ${rbdYear}. No RMD required until then.`
    };
  }

  // Calculate life expectancy factor
  let lifeExpectancyFactor = getLifeExpectancyFactor(age, inputs.spouseBirthYear && inputs.isSpouseBeneficialOwner ? currentYear - inputs.spouseBirthYear : undefined);

  // For ages beyond the table, use the minimum distribution method
  if (age > 100) {
    lifeExpectancyFactor = Math.max(1, 100 - age + 1);
  }

  // Calculate RMD
  const distributionPercentage = 1 / lifeExpectancyFactor;
  const requiredMinimumDistribution = inputs.accountBalance * distributionPercentage;
  const remainingBalanceAfterRMD = inputs.accountBalance - requiredMinimumDistribution;

  // Tax implications
  let taxImplications = '';
  if (inputs.accountType === 'traditional_ira' || inputs.accountType === '401k' || inputs.accountType === 'sep_ira' || inputs.accountType === 'simple_ira') {
    taxImplications = 'RMDs are taxed as ordinary income. Consider Qualified Charitable Distributions (QCDs) for tax-free giving.';
  }

  const rmdExplanation = `RMD = Account Balance (${inputs.accountBalance.toLocaleString()}) ÷ Life Expectancy Factor (${lifeExpectancyFactor.toFixed(1)}) = ${requiredMinimumDistribution.toLocaleString(undefined, {maximumFractionDigits: 2})}`;

  return {
    requiredMinimumDistribution,
    distributionPercentage,
    lifeExpectancyFactor,
    remainingBalanceAfterRMD,
    taxImplications,
    rmdExplanation
  };
}

export function calculateResult(inputs: RequiredMinimumDistributionRMDInputs): number {
  const result = calculateRequiredMinimumDistribution(inputs);
  return result.requiredMinimumDistribution;
}