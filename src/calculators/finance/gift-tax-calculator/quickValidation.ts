import { GiftTaxCalculatorInputs } from './types';

export function validateGiftAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Gift amount must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Gift amount cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateAnnualExclusionUsed(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual exclusion used cannot be negative' };
  }
  if (value > 18400) {
    return { isValid: false, message: 'Annual exclusion used cannot exceed the current annual exclusion limit' };
  }
  return { isValid: true };
}

export function validateLifetimeExclusionUsed(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Lifetime exclusion used cannot be negative' };
  }
  if (value > 13470000) {
    return { isValid: false, message: 'Lifetime exclusion used cannot exceed the current lifetime exclusion limit' };
  }
  return { isValid: true };
}

export function validateGiftTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Gift tax rate must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Gift tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateRelationship(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validRelationships = ['spouse', 'child', 'grandchild', 'other'];
  if (!value || !validRelationships.includes(value)) {
    return { isValid: false, message: 'Please select a valid relationship' };
  }
  return { isValid: true };
}