import { GiftTaxCalculatorInputs } from './types';

export function validateGiftTaxCalculatorInputs(inputs: GiftTaxCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Gift Amount Validation
  if (!inputs.giftAmount || inputs.giftAmount <= 0) {
    errors.push({ field: 'giftAmount', message: 'Gift amount must be greater than 0' });
  }
  if (inputs.giftAmount && inputs.giftAmount > 100000000) {
    errors.push({ field: 'giftAmount', message: 'Gift amount cannot exceed $100,000,000' });
  }

  // Annual Exclusion Used Validation
  if (inputs.annualExclusionUsed < 0) {
    errors.push({ field: 'annualExclusionUsed', message: 'Annual exclusion used cannot be negative' });
  }
  if (inputs.annualExclusionUsed > 18400) {
    errors.push({ field: 'annualExclusionUsed', message: 'Annual exclusion used cannot exceed the current annual exclusion limit' });
  }

  // Lifetime Exclusion Used Validation
  if (inputs.lifetimeExclusionUsed < 0) {
    errors.push({ field: 'lifetimeExclusionUsed', message: 'Lifetime exclusion used cannot be negative' });
  }
  if (inputs.lifetimeExclusionUsed > 13470000) {
    errors.push({ field: 'lifetimeExclusionUsed', message: 'Lifetime exclusion used cannot exceed the current lifetime exclusion limit' });
  }

  // Gift Tax Rate Validation
  if (!inputs.giftTaxRate || inputs.giftTaxRate <= 0) {
    errors.push({ field: 'giftTaxRate', message: 'Gift tax rate must be greater than 0' });
  }
  if (inputs.giftTaxRate > 100) {
    errors.push({ field: 'giftTaxRate', message: 'Gift tax rate cannot exceed 100%' });
  }

  // Relationship Validation
  const validRelationships = ['spouse', 'child', 'grandchild', 'other'];
  if (!inputs.relationship || !validRelationships.includes(inputs.relationship)) {
    errors.push({ field: 'relationship', message: 'Please select a valid relationship' });
  }

  return errors;
}

export function validateGiftTaxCalculatorBusinessRules(inputs: GiftTaxCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Warning for large gifts that may trigger tax
  if (inputs.giftAmount > 18400 && !inputs.isAnnualExclusion && !inputs.isLifetimeExclusion) {
    warnings.push({
      field: 'giftAmount',
      message: 'Large gift without applying exclusions will likely be subject to gift tax'
    });
  }

  // Warning for spousal gifts (generally unlimited)
  if (inputs.relationship === 'spouse' && inputs.giftTaxRate > 0) {
    warnings.push({
      field: 'relationship',
      message: 'Spousal gifts are generally unlimited and tax-free under federal law'
    });
  }

  // Warning for exceeding annual exclusion
  const remainingAnnual = 18400 - inputs.annualExclusionUsed;
  if (inputs.isAnnualExclusion && inputs.giftAmount > remainingAnnual) {
    warnings.push({
      field: 'giftAmount',
      message: `Gift exceeds remaining annual exclusion ($${remainingAnnual.toLocaleString()})`
    });
  }

  // Warning for significant lifetime exclusion usage
  const remainingLifetime = 13470000 - inputs.lifetimeExclusionUsed;
  if (inputs.isLifetimeExclusion && inputs.giftAmount > remainingLifetime) {
    warnings.push({
      field: 'giftAmount',
      message: `Gift exceeds remaining lifetime exclusion ($${remainingLifetime.toLocaleString()})`
    });
  }

  // Warning for gifts that use significant portion of lifetime exemption
  if (inputs.isLifetimeExclusion && inputs.giftAmount > 13470000 * 0.1) {
    warnings.push({
      field: 'giftAmount',
      message: 'Large gift will significantly reduce remaining lifetime exemption'
    });
  }

  return warnings;
}