import { TrustFundDistributionInputs } from './types';

export function validateTrustFundDistributionInputs(inputs: TrustFundDistributionInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Trust principal validation
  if (!inputs.trustPrincipal || inputs.trustPrincipal <= 0) {
    errors.push({ field: 'trustPrincipal', message: 'Trust principal must be greater than 0' });
  }
  if (inputs.trustPrincipal && inputs.trustPrincipal > 100000000) {
    errors.push({ field: 'trustPrincipal', message: 'Trust principal cannot exceed $100,000,000' });
  }

  // Annual income validation
  if (inputs.annualIncome && inputs.annualIncome < 0) {
    errors.push({ field: 'annualIncome', message: 'Annual income cannot be negative' });
  }

  // Beneficiary age validation
  if (!inputs.beneficiaryAge || inputs.beneficiaryAge < 0) {
    errors.push({ field: 'beneficiaryAge', message: 'Beneficiary age must be 0 or greater' });
  }
  if (inputs.beneficiaryAge && inputs.beneficiaryAge > 120) {
    errors.push({ field: 'beneficiaryAge', message: 'Beneficiary age cannot exceed 120' });
  }

  // Trust duration validation
  if (!inputs.trustDuration || inputs.trustDuration < 1) {
    errors.push({ field: 'trustDuration', message: 'Trust duration must be at least 1 year' });
  }
  if (inputs.trustDuration && inputs.trustDuration > 100) {
    errors.push({ field: 'trustDuration', message: 'Trust duration cannot exceed 100 years' });
  }

  // Inflation rate validation
  if (inputs.inflationRate && (inputs.inflationRate < -5 || inputs.inflationRate > 20)) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Tax rate validation
  if (!inputs.taxRate || inputs.taxRate < 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be 0 or greater' });
  }
  if (inputs.taxRate && inputs.taxRate > 50) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 50%' });
  }

  // Number of beneficiaries validation
  if (!inputs.numberOfBeneficiaries || inputs.numberOfBeneficiaries < 1) {
    errors.push({ field: 'numberOfBeneficiaries', message: 'Number of beneficiaries must be at least 1' });
  }
  if (inputs.numberOfBeneficiaries && inputs.numberOfBeneficiaries > 20) {
    errors.push({ field: 'numberOfBeneficiaries', message: 'Number of beneficiaries cannot exceed 20' });
  }

  // Investment return validation
  if (inputs.investmentReturn && (inputs.investmentReturn < -20 || inputs.investmentReturn > 30)) {
    errors.push({ field: 'investmentReturn', message: 'Investment return must be between -20% and 30%' });
  }

  // Administrative costs validation
  if (!inputs.administrativeCosts || inputs.administrativeCosts < 0) {
    errors.push({ field: 'administrativeCosts', message: 'Administrative costs must be 0 or greater' });
  }
  if (inputs.administrativeCosts && inputs.administrativeCosts > 10) {
    errors.push({ field: 'administrativeCosts', message: 'Administrative costs cannot exceed 10%' });
  }

  return errors;
}

export function validateTrustFundDistributionBusinessRules(inputs: TrustFundDistributionInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Trust duration warnings
  if (inputs.trustDuration > 50) {
    warnings.push({ field: 'trustDuration', message: 'Very long trust durations may have complex tax implications' });
  }

  // Beneficiary age warnings
  if (inputs.beneficiaryAge < 18 && inputs.trustType === 'irrevocable') {
    warnings.push({ field: 'beneficiaryAge', message: 'Minors as beneficiaries of irrevocable trusts require special considerations' });
  }

  // Tax rate warnings
  if (inputs.taxRate > 37) {
    warnings.push({ field: 'taxRate', message: 'High tax rates may make trust planning particularly beneficial' });
  }

  // Administrative cost warnings
  if (inputs.administrativeCosts > 2) {
    warnings.push({ field: 'administrativeCosts', message: 'High administrative costs may reduce trust efficiency' });
  }

  // Trust type specific warnings
  if (inputs.trustType === 'revocable') {
    warnings.push({ field: 'trustType', message: 'Revocable trusts do not provide asset protection from creditors' });
  }

  if (inputs.trustType === 'special_needs') {
    warnings.push({ field: 'trustType', message: 'Special needs trusts require specific language to maintain government benefits' });
  }

  // Generation skipping warnings
  if (inputs.generationSkipping && inputs.trustDuration > 50) {
    warnings.push({ field: 'generationSkipping', message: 'Generation-skipping trusts may have complex GST tax implications' });
  }

  // Required minimum distribution warnings
  if (inputs.requiredMinimumDistribution && inputs.beneficiaryAge < 73) {
    warnings.push({ field: 'requiredMinimumDistribution', message: 'RMDs not required until age 73' });
  }

  // Distribution frequency warnings
  if (inputs.distributionFrequency === 'monthly' && inputs.trustPrincipal < 100000) {
    warnings.push({ field: 'distributionFrequency', message: 'Monthly distributions may not be practical for smaller trusts' });
  }

  // Investment return warnings
  if (inputs.investmentReturn > 15) {
    warnings.push({ field: 'investmentReturn', message: 'High expected returns increase risk and volatility' });
  }

  // Inflation rate warnings
  if (inputs.inflationRate > 5) {
    warnings.push({ field: 'inflationRate', message: 'High inflation may erode purchasing power over time' });
  }

  // Principal vs income warnings
  if (inputs.annualIncome > inputs.trustPrincipal) {
    warnings.push({ field: 'annualIncome', message: 'Annual income exceeds principal - trust may distribute principal faster than intended' });
  }

  return warnings;
}