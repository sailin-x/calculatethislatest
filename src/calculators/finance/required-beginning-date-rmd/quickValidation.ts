import { RequiredBeginningDateRMDInputs } from './types';

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