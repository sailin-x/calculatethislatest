import { RequiredMinimumDistributionRMDInputs } from './types';

export function validateAccountBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Account balance cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Account balance cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateBirthYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const currentYear = new Date().getFullYear();
  if (!value || value < 1900) {
    return { isValid: false, message: 'Birth year must be 1900 or later' };
  }
  if (value > currentYear) {
    return { isValid: false, message: 'Birth year cannot be in the future' };
  }
  return { isValid: true };
}

export function validateAccountType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['traditional_ira', '401k', 'roth_ira', 'sep_ira', 'simple_ira'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid account type' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && value !== null && (value < 0 || value > 150)) {
    return { isValid: false, message: 'Current age must be between 0 and 150' };
  }
  return { isValid: true };
}

export function validateSpouseBirthYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: true }; // Optional field

  const currentYear = new Date().getFullYear();
  if (value < 1900) {
    return { isValid: false, message: 'Spouse birth year must be 1900 or later' };
  }
  if (value > currentYear) {
    return { isValid: false, message: 'Spouse birth year cannot be in the future' };
  }
  return { isValid: true };
}