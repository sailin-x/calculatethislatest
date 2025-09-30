import { GenerationSkippingTransferGstTaxCalculatorInputs } from './types';

export function validateTransferAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Transfer amount must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Transfer amount cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateGstExemptionUsed(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'GST exemption used cannot be negative' };
  }
  if (value > 13610000) {
    return { isValid: false, message: 'GST exemption used cannot exceed the current exemption limit' };
  }
  return { isValid: true };
}

export function validateGstTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'GST tax rate must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'GST tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateRelationship(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validRelationships = ['grandchild', 'great-grandchild', 'great-great-grandchild', 'other-descendant'];
  if (!value || !validRelationships.includes(value)) {
    return { isValid: false, message: 'Please select a valid relationship' };
  }
  return { isValid: true };
}