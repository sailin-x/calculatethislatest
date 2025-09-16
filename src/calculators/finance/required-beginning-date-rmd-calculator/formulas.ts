import { RBDRMDInputs, RBDRMDResults, RBDRMDMetrics } from './types';

export function calculateRBDRMD(inputs: RBDRMDInputs): RBDRMDResults {
  const {
    birthYear,
    currentYear,
    accountBalance,
    lifeExpectancy,
    accountType,
    beneficiaryType,
    spouseBirthYear,
    includeSpouse,
    taxBracket,
    expectedReturn,
    inflationRate
  } = inputs;

  // Calculate Required Beginning Date (RBD)
  const requiredBeginningDate = calculateRequiredBeginningDate(birthYear, accountType);

  // Calculate remaining life expectancy
  const currentAge = currentYear - birthYear;
  const remainingLifeExpectancy = Math.max(1, lifeExpectancy - currentAge);

  // Calculate RMD percentage
  const rmdPercentage = 1 / remainingLifeExpectancy;

  // Calculate annual RMD
  const annualRMD = accountBalance * rmdPercentage;

  // Calculate monthly RMD
  const monthlyRMD = annualRMD / 12;

  // Calculate total lifetime RMDs
  const totalLifetimeRMDs = calculateTotalLifetimeRMDs(
    accountBalance,
    remainingLifeExpectancy,
    expectedReturn,
    inflationRate
  );

  // Calculate tax on RMD (only for traditional accounts)
  const taxOnRMD = accountType === 'roth_ira' ? 0 : annualRMD * (taxBracket / 100);

  // Calculate net RMD after tax
  const netRMD = annualRMD - taxOnRMD;

  // Determine RMD strategy
  const rmdStrategy = determineRMDStrategy(
    accountType,
    beneficiaryType,
    includeSpouse,
    currentAge,
    remainingLifeExpectancy
  );

  return {
    requiredBeginningDate,
    annualRMD,
    monthlyRMD,
    totalLifetimeRMDs,
    remainingLifeExpectancy,
    rmdPercentage,
    taxOnRMD,
    netRMD,
    rmdStrategy
  };
}

function calculateRequiredBeginningDate(birthYear: number, accountType: string): number {
  // SECURE Act 2.0 rules (2023+)
  if (accountType === 'roth_ira') {
    return birthYear + 73; // No RMDs required during lifetime for Roth IRAs
  }

  // For traditional IRAs and 401(k)s
  if (birthYear >= 1951) {
    return birthYear + 73; // SECURE Act 2.0
  } else {
    return birthYear + 72; // Pre-SECURE Act 2.0
  }
}

function calculateTotalLifetimeRMDs(
  currentBalance: number,
  remainingYears: number,
  expectedReturn: number,
  inflationRate: number
): number {
  let totalRMDs = 0;
  let balance = currentBalance;

  for (let year = 1; year <= remainingYears; year++) {
    const rmd = balance / (remainingYears - year + 1);
    totalRMDs += rmd;

    // Grow remaining balance
    balance = (balance - rmd) * (1 + expectedReturn / 100);

    // Adjust for inflation (simplified)
    balance = balance / (1 + inflationRate / 100);
  }

  return totalRMDs;
}

function determineRMDStrategy(
  accountType: string,
  beneficiaryType: string,
  includeSpouse: boolean,
  currentAge: number,
  remainingYears: number
): string {
  if (accountType === 'roth_ira') {
    return 'No RMDs required during lifetime - consider Qualified Charitable Distributions';
  }

  if (beneficiaryType === 'spouse' && includeSpouse) {
    return 'Spouse can delay RMDs using spousal rollover rules';
  }

  if (remainingYears > 30) {
    return 'Long planning horizon - consider Qualified Charitable Distributions to reduce taxable income';
  }

  if (currentAge >= 72 && remainingYears <= 10) {
    return 'Short remaining lifespan - maximize RMDs for tax efficiency';
  }

  return 'Standard RMD strategy - take required distributions annually';
}

export function calculateRBDRMDMetrics(
  inputs: RBDRMDInputs,
  results: RBDRMDResults
): RBDRMDMetrics {
  const { accountBalance, taxBracket, accountType, beneficiaryType, includeSpouse } = inputs;
  const { annualRMD, taxOnRMD, remainingLifeExpectancy } = results;

  // Calculate RMD efficiency
  const rmdEfficiency = accountBalance > 0 ? (annualRMD / accountBalance) * 100 : 0;

  // Calculate tax impact
  const taxImpact = annualRMD > 0 ? (taxOnRMD / annualRMD) * 100 : 0;

  // Determine longevity risk
  let longevityRisk: 'low' | 'medium' | 'high' = 'medium';
  if (remainingLifeExpectancy > 30) longevityRisk = 'high';
  else if (remainingLifeExpectancy < 10) longevityRisk = 'low';

  // Determine beneficiary optimization
  let beneficiaryOptimization: 'low' | 'medium' | 'high' = 'medium';
  if (beneficiaryType === 'spouse' && includeSpouse) beneficiaryOptimization = 'high';
  else if (beneficiaryType === 'charity') beneficiaryOptimization = 'high';
  else if (beneficiaryType === 'estate') beneficiaryOptimization = 'low';

  // Calculate planning horizon
  const planningHorizon = remainingLifeExpectancy;

  return {
    rmdEfficiency,
    taxImpact,
    longevityRisk,
    beneficiaryOptimization,
    planningHorizon
  };
}

export function validateRBDRMDInputs(inputs: RBDRMDInputs): string[] {
  const errors: string[] = [];

  if (inputs.birthYear < 1900 || inputs.birthYear > 2010) {
    errors.push('Birth year must be between 1900 and 2010');
  }

  if (inputs.currentYear < 2020 || inputs.currentYear > 2050) {
    errors.push('Current year must be between 2020 and 2050');
  }

  if (inputs.accountBalance < 0) {
    errors.push('Account balance cannot be negative');
  }

  if (inputs.lifeExpectancy < 1 || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be between 1 and 120 years');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.includeSpouse && (inputs.spouseBirthYear < 1900 || inputs.spouseBirthYear > 2010)) {
    errors.push('Spouse birth year must be between 1900 and 2010');
  }

  return errors;
}