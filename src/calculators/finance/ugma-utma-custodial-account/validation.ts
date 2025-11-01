import { UGMACustodialAccountInputs } from './types';

export function validateUGMACustodialAccountInputs(inputs: UGMACustodialAccountInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Initial Contribution Validation
  if (!inputs.initialContribution || inputs.initialContribution < 0) {
    errors.push({ field: 'initialContribution', message: 'Initial contribution must be 0 or greater' });
  }
  if (inputs.initialContribution && inputs.initialContribution > 1000000) {
    errors.push({ field: 'initialContribution', message: 'Initial contribution cannot exceed $1,000,000' });
  }

  // Annual Contribution Validation
  if (!inputs.annualContribution || inputs.annualContribution < 0) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution must be 0 or greater' });
  }
  if (inputs.annualContribution && inputs.annualContribution > 18000) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution exceeds gift tax exclusion limit ($18,000 for 2024)' });
  }

  // Expected Return Rate Validation
  if (inputs.expectedReturnRate < -10 || inputs.expectedReturnRate > 25) {
    errors.push({ field: 'expectedReturnRate', message: 'Expected return rate must be between -10% and 25%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5 || inputs.inflationRate > 10) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 10%' });
  }

  // Child Age Validation
  if (!inputs.childAge || inputs.childAge < 0) {
    errors.push({ field: 'childAge', message: 'Child age must be 0 or greater' });
  }
  if (inputs.childAge && inputs.childAge > 17) {
    errors.push({ field: 'childAge', message: 'Child age should be under 18 for optimal custodial account benefits' });
  }

  // Custodial Account Type Validation
  if (!inputs.custodialAccountType || !['UGMA', 'UTMA'].includes(inputs.custodialAccountType)) {
    errors.push({ field: 'custodialAccountType', message: 'Custodial account type must be UGMA or UTMA' });
  }

  // State Validation
  if (!inputs.state || inputs.state.length !== 2) {
    errors.push({ field: 'state', message: 'Please select a valid state' });
  }

  // Tax Year Validation
  if (!inputs.taxYear || inputs.taxYear < 2020 || inputs.taxYear > 2030) {
    errors.push({ field: 'taxYear', message: 'Tax year must be between 2020 and 2030' });
  }

  // Gift Tax Exclusion Used Validation
  if (inputs.giftTaxExclusionUsed < 0 || inputs.giftTaxExclusionUsed > 18000) {
    errors.push({ field: 'giftTaxExclusionUsed', message: 'Gift tax exclusion used must be between 0 and $18,000' });
  }

  return errors;
}

export function validateUGMACustodialAccountBusinessRules(inputs: UGMACustodialAccountInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Gift Tax Warning
  const totalAnnualGifts = inputs.annualContribution + inputs.giftTaxExclusionUsed;
  if (totalAnnualGifts > 18000) {
    warnings.push({ field: 'annualContribution', message: 'Total annual gifts exceed $18,000 exclusion. Gift tax may apply.' });
  }

  // Age Warnings
  const transferAge = inputs.custodialAccountType === 'UGMA' ? 18 : 21;
  const yearsToTransfer = transferAge - inputs.childAge;
  if (yearsToTransfer < 5) {
    warnings.push({ field: 'childAge', message: 'Short time horizon may limit growth potential' });
  }

  // Return Rate Warnings
  if (inputs.expectedReturnRate > 12) {
    warnings.push({ field: 'expectedReturnRate', message: 'High expected return may indicate unrealistic assumptions' });
  }

  // State Tax Warnings
  const stateTaxRate = getStateTaxRate(inputs.state);
  if (stateTaxRate > 0.10) {
    warnings.push({ field: 'state', message: 'High state tax rate may reduce after-tax returns' });
  }

  // Contribution Frequency Warning
  if (inputs.contributionFrequency === 'annually' && inputs.annualContribution > 10000) {
    warnings.push({ field: 'contributionFrequency', message: 'Consider more frequent contributions for better compounding' });
  }

  return warnings;
}

function getStateTaxRate(state: string): number {
  const stateTaxRates: Record<string, number> = {
    'CA': 0.133,
    'NY': 0.109,
    'TX': 0.00,
    'FL': 0.00,
    'WA': 0.00,
    'NV': 0.00,
    'TN': 0.00,
    'NH': 0.00,
    'SD': 0.00,
    // Add more states as needed
  };
  return stateTaxRates[state] || 0.05; // Default to 5% if not found
}