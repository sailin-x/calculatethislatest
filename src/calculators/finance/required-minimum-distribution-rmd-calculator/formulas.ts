import { RMDRMDInputs, RMDRMDResults, RMDRMDMetrics } from './types';

export function calculateRMDRMD(inputs: RMDRMDInputs): RMDRMDResults {
  const {
    accountBalance,
    currentAge,
    lifeExpectancy,
    accountType,
    beneficiaryType,
    spouseAge,
    includeSpouse,
    taxBracket,
    expectedReturn,
    inflationRate,
    previousYearBalance,
    qualifiedCharitableDistribution
  } = inputs;

  // Calculate remaining life expectancy
  const remainingLifeExpectancy = Math.max(1, lifeExpectancy - currentAge);

  // Calculate RMD percentage
  const rmdPercentage = 1 / remainingLifeExpectancy;

  // Calculate annual RMD
  const annualRMD = accountBalance * rmdPercentage;

  // Calculate monthly and quarterly RMDs
  const monthlyRMD = annualRMD / 12;
  const quarterlyRMD = annualRMD / 4;

  // Calculate tax on RMD (only for traditional accounts)
  const taxOnRMD = accountType === 'roth_ira' ? 0 : annualRMD * (taxBracket / 100);

  // Calculate net RMD after tax
  const netRMD = annualRMD - taxOnRMD;

  // Calculate penalty amount (if applicable)
  const penaltyAmount = calculatePenaltyAmount(annualRMD, accountBalance, currentAge, accountType);

  // Calculate total RMD required (accounting for QCDs)
  const totalRMDRequired = Math.max(0, annualRMD - qualifiedCharitableDistribution);

  // Determine RMD strategy
  const rmdStrategy = determineRMDStrategy(
    accountType,
    beneficiaryType,
    includeSpouse,
    currentAge,
    remainingLifeExpectancy,
    taxBracket
  );

  return {
    annualRMD,
    monthlyRMD,
    quarterlyRMD,
    remainingLifeExpectancy,
    rmdPercentage,
    taxOnRMD,
    netRMD,
    penaltyAmount,
    totalRMDRequired,
    rmdStrategy
  };
}

function calculatePenaltyAmount(rmdRequired: number, accountBalance: number, age: number, accountType: string): number {
  // 50% penalty for missing RMD (25% if corrected within 2 years)
  // Only applies to traditional accounts
  if (accountType === 'roth_ira' || age < 73) {
    return 0;
  }

  // Simplified penalty calculation - assumes 50% of shortfall
  const shortfall = Math.max(0, rmdRequired - (accountBalance * 0.04)); // Assuming 4% withdrawal
  return shortfall * 0.5;
}

function determineRMDStrategy(
  accountType: string,
  beneficiaryType: string,
  includeSpouse: boolean,
  currentAge: number,
  remainingYears: number,
  taxBracket: number
): string {
  if (accountType === 'roth_ira') {
    return 'No RMDs required during lifetime - consider Qualified Charitable Distributions for tax planning';
  }

  if (beneficiaryType === 'spouse' && includeSpouse) {
    return 'Spouse can delay RMDs - consider spousal rollover strategies';
  }

  if (taxBracket > 30) {
    return 'High tax bracket - consider Qualified Charitable Distributions to reduce taxable income';
  }

  if (remainingYears > 25) {
    return 'Long planning horizon - consider systematic monthly withdrawals to manage tax brackets';
  }

  if (remainingYears < 5) {
    return 'Short remaining lifespan - maximize RMDs for tax efficiency and required distributions';
  }

  return 'Standard annual RMD withdrawal - monitor account balance and life expectancy annually';
}

export function calculateRMDRMDMetrics(
  inputs: RMDRMDInputs,
  results: RMDRMDResults
): RMDRMDMetrics {
  const { accountBalance, taxBracket, accountType, beneficiaryType, includeSpouse } = inputs;
  const { annualRMD, penaltyAmount, totalRMDRequired } = results;

  // Calculate RMD efficiency
  const rmdEfficiency = accountBalance > 0 ? (annualRMD / accountBalance) * 100 : 0;

  // Calculate tax optimization
  const taxOptimization = annualRMD > 0 ? ((annualRMD - (annualRMD * taxBracket / 100)) / annualRMD) * 100 : 0;

  // Determine penalty risk
  let penaltyRisk: 'low' | 'medium' | 'high' = 'low';
  if (penaltyAmount > annualRMD * 0.1) penaltyRisk = 'high';
  else if (penaltyAmount > 0) penaltyRisk = 'medium';

  // Determine beneficiary optimization
  let beneficiaryOptimization: 'low' | 'medium' | 'high' = 'medium';
  if (beneficiaryType === 'spouse' && includeSpouse) beneficiaryOptimization = 'high';
  else if (beneficiaryType === 'charity') beneficiaryOptimization = 'high';
  else if (beneficiaryType === 'estate') beneficiaryOptimization = 'low';

  // Determine withdrawal strategy
  let withdrawalStrategy: 'lump_sum' | 'monthly' | 'quarterly' | 'annually' = 'annually';
  if (taxBracket > 35) withdrawalStrategy = 'monthly';
  else if (taxBracket > 25) withdrawalStrategy = 'quarterly';

  return {
    rmdEfficiency,
    taxOptimization,
    penaltyRisk,
    beneficiaryOptimization,
    withdrawalStrategy
  };
}

export function validateRMDRMDInputs(inputs: RMDRMDInputs): string[] {
  const errors: string[] = [];

  if (inputs.accountBalance < 0) {
    errors.push('Account balance cannot be negative');
  }

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.lifeExpectancy <= inputs.currentAge) {
    errors.push('Life expectancy must be greater than current age');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.previousYearBalance < 0) {
    errors.push('Previous year balance cannot be negative');
  }

  if (inputs.qualifiedCharitableDistribution < 0) {
    errors.push('Qualified charitable distribution cannot be negative');
  }

  if (inputs.includeSpouse && (inputs.spouseAge < 0 || inputs.spouseAge > 120)) {
    errors.push('Spouse age must be between 0 and 120 when spouse is included');
  }

  return errors;
}