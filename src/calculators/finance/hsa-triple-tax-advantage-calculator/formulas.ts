import { HSATripleTaxInputs, HSATripleTaxResults, HSATripleTaxMetrics } from './types';

export function calculateHSATripleTax(inputs: HSATripleTaxInputs): HSATripleTaxResults {
  const {
    annualContribution,
    currentBalance,
    age,
    coverageType,
    contributionType,
    investmentReturn,
    yearsToRetirement,
    qualifiedMedicalExpenses,
    nonQualifiedWithdrawals,
    incomeTaxRate,
    capitalGainsTaxRate,
    comparisonInvestmentReturn
  } = inputs;

  // Calculate HSA benefits
  const hsaContributions = currentBalance + (annualContribution * yearsToRetirement);
  const hsaGrowth = hsaContributions * Math.pow(1 + investmentReturn / 100, yearsToRetirement);
  const hsaTaxSavings = hsaContributions * (incomeTaxRate / 100); // Pre-tax contributions
  const hsaQualifiedWithdrawals = Math.min(qualifiedMedicalExpenses, hsaGrowth);
  const hsaNonQualifiedWithdrawals = Math.min(nonQualifiedWithdrawals, hsaGrowth - hsaQualifiedWithdrawals);
  const hsaPenalties = age < 65 ? hsaNonQualifiedWithdrawals * 0.20 : 0;
  const hsaTaxes = hsaNonQualifiedWithdrawals * (incomeTaxRate / 100);
  const hsaNetBenefit = hsaQualifiedWithdrawals + (hsaNonQualifiedWithdrawals - hsaPenalties - hsaTaxes);

  // Calculate Traditional Savings benefits
  const traditionalContributions = hsaContributions;
  const traditionalAfterTaxContributions = traditionalContributions * (1 - incomeTaxRate / 100);
  const traditionalGrowth = traditionalAfterTaxContributions * Math.pow(1 + comparisonInvestmentReturn / 100, yearsToRetirement);
  const traditionalWithdrawals = Math.min(qualifiedMedicalExpenses + nonQualifiedWithdrawals, traditionalGrowth);
  const traditionalTaxes = traditionalWithdrawals * (capitalGainsTaxRate / 100);
  const traditionalNetBenefit = traditionalWithdrawals - traditionalTaxes;

  // Calculate Taxable Savings benefits
  const taxableContributions = hsaContributions;
  const taxableGrowth = taxableContributions * Math.pow(1 + comparisonInvestmentReturn / 100, yearsToRetirement);
  const taxableWithdrawals = Math.min(qualifiedMedicalExpenses + nonQualifiedWithdrawals, taxableGrowth);
  const taxableTaxes = (taxableWithdrawals - taxableContributions) * (capitalGainsTaxRate / 100);
  const taxableNetBenefit = taxableWithdrawals - taxableTaxes;

  // Calculate advantages
  const hsaVsTraditionalAdvantage = hsaNetBenefit - traditionalNetBenefit;
  const hsaVsTaxableAdvantage = hsaNetBenefit - taxableNetBenefit;

  // Calculate break-even years
  const breakEvenYears = yearsToRetirement;

  // Calculate lifetime tax savings
  const lifetimeTaxSavings = hsaTaxSavings + (traditionalTaxes - hsaTaxes);

  return {
    hsaTaxSavings,
    traditionalSavingsTaxSavings: 0,
    taxableSavingsTaxSavings: 0,
    hsaNetBenefit,
    traditionalSavingsNetBenefit: traditionalNetBenefit,
    taxableSavingsNetBenefit: taxableNetBenefit,
    hsaVsTraditionalAdvantage,
    hsaVsTaxableAdvantage,
    breakEvenYears,
    lifetimeTaxSavings
  };
}

export function calculateHSATripleTaxMetrics(
  inputs: HSATripleTaxInputs,
  results: HSATripleTaxResults
): HSATripleTaxMetrics {
  const { annualContribution, yearsToRetirement } = inputs;
  const { hsaNetBenefit, traditionalSavingsNetBenefit, taxableSavingsNetBenefit } = results;

  // Calculate tax advantage ratio
  const totalContributions = annualContribution * yearsToRetirement;
  const taxAdvantageRatio = results.lifetimeTaxSavings / totalContributions;

  // Calculate efficiency score
  const efficiencyScore = hsaNetBenefit / Math.max(traditionalSavingsNetBenefit, taxableSavingsNetBenefit, 1);

  // Calculate risk-adjusted return
  const riskAdjustedReturn = (hsaNetBenefit - traditionalSavingsNetBenefit) / yearsToRetirement;

  // Determine optimal strategy
  let optimalStrategy = 'HSA provides significant tax advantages';
  if (results.hsaVsTraditionalAdvantage < 0) {
    optimalStrategy = 'Traditional savings may be better for non-medical expenses';
  } else if (results.hsaVsTaxableAdvantage < 0) {
    optimalStrategy = 'Taxable account may be preferable for long-term growth';
  }

  return {
    taxAdvantageRatio,
    efficiencyScore,
    riskAdjustedReturn,
    optimalStrategy
  };
}

export function validateHSATripleTaxInputs(inputs: HSATripleTaxInputs): string[] {
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

  if (inputs.yearsToRetirement < 0 || inputs.yearsToRetirement > 100) {
    errors.push('Years to retirement must be between 0 and 100');
  }

  if (inputs.incomeTaxRate < 0 || inputs.incomeTaxRate > 50) {
    errors.push('Income tax rate must be between 0% and 50%');
  }

  if (inputs.capitalGainsTaxRate < 0 || inputs.capitalGainsTaxRate > 50) {
    errors.push('Capital gains tax rate must be between 0% and 50%');
  }

  return errors;
}