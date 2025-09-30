import { GrantorRetainedAnnuityTrustGratCalculatorInputs } from './types';

export function validateGrantorRetainedAnnuityTrustGratCalculatorInputs(inputs: GrantorRetainedAnnuityTrustGratCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  if (!inputs.initialValue || inputs.initialValue <= 0) {
    errors.push({ field: 'initialValue', message: 'Initial value must be greater than 0' });
  }
  if (inputs.initialValue && inputs.initialValue > 100000000) {
    errors.push({ field: 'initialValue', message: 'Initial value cannot exceed $100,000,000' });
  }

  if (!inputs.annuityRate || inputs.annuityRate <= 0) {
    errors.push({ field: 'annuityRate', message: 'Annuity rate must be greater than 0' });
  }
  if (inputs.annuityRate && inputs.annuityRate > 100) {
    errors.push({ field: 'annuityRate', message: 'Annuity rate cannot exceed 100%' });
  }

  if (!inputs.termYears || inputs.termYears <= 0) {
    errors.push({ field: 'termYears', message: 'Term years must be greater than 0' });
  }
  if (inputs.termYears && inputs.termYears > 50) {
    errors.push({ field: 'termYears', message: 'Term years cannot exceed 50' });
  }

  if (inputs.growthRate < -50 || inputs.growthRate > 50) {
    errors.push({ field: 'growthRate', message: 'Growth rate must be between -50% and 50%' });
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 50) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be between 0% and 50%' });
  }

  return errors;
}

export function validateGrantorRetainedAnnuityTrustGratCalculatorBusinessRules(inputs: GrantorRetainedAnnuityTrustGratCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  if (inputs.termYears < 2) {
    warnings.push({ field: 'termYears', message: 'Short terms may trigger IRS scrutiny under 7520 regulations' });
  }

  if (inputs.annuityRate < 10) {
    warnings.push({ field: 'annuityRate', message: 'Low annuity rate may result in minimal transfer to beneficiaries' });
  }

  if (inputs.growthRate > inputs.annuityRate) {
    warnings.push({ field: 'growthRate', message: 'High growth rate relative to annuity rate maximizes transfer efficiency' });
  }

  if (inputs.isZeroedOut && inputs.termYears < 5) {
    warnings.push({ field: 'isZeroedOut', message: 'Zeroed-out GRATs with short terms carry higher risk of failure' });
  }

  return warnings;
}