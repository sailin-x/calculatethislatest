import { RequiredBeginningDateRMDInputs } from './types';

export function validateRequiredBeginningDateRMDInputs(inputs: RequiredBeginningDateRMDInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  const currentYear = new Date().getFullYear();

  // Birth Year Validation
  if (!inputs.birthYear || inputs.birthYear < 1900) {
    errors.push({ field: 'birthYear', message: 'Birth year must be 1900 or later' });
  }
  if (inputs.birthYear && inputs.birthYear > currentYear) {
    errors.push({ field: 'birthYear', message: 'Birth year cannot be in the future' });
  }

  // Account Type Validation
  const validAccountTypes = ['traditional_ira', '401k', 'roth_ira', 'sep_ira', 'simple_ira'];
  if (!inputs.accountType || !validAccountTypes.includes(inputs.accountType)) {
    errors.push({ field: 'accountType', message: 'Please select a valid account type' });
  }

  // Spouse Birth Year Validation (if provided)
  if (inputs.spouseBirthYear) {
    if (inputs.spouseBirthYear < 1900) {
      errors.push({ field: 'spouseBirthYear', message: 'Spouse birth year must be 1900 or later' });
    }
    if (inputs.spouseBirthYear > currentYear) {
      errors.push({ field: 'spouseBirthYear', message: 'Spouse birth year cannot be in the future' });
    }
  }

  return errors;
}

export function validateRequiredBeginningDateRMDBusinessRules(inputs: RequiredBeginningDateRMDInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Roth IRA Warning
  if (inputs.accountType === 'roth_ira') {
    warnings.push({
      field: 'accountType',
      message: 'Roth IRAs do not have required beginning dates for lifetime distributions'
    });
  }

  // Age Warnings
  const currentYear = new Date().getFullYear();
  const age = currentYear - inputs.birthYear;

  if (age >= 70 && inputs.accountType !== 'roth_ira') {
    warnings.push({
      field: 'birthYear',
      message: 'You may already be subject to RMD requirements. Consult a tax professional.'
    });
  }

  // Spouse Age Difference Warning
  if (inputs.spouseBirthYear && inputs.isSpouseBeneficialOwner) {
    const ageDifference = inputs.birthYear - inputs.spouseBirthYear;
    if (ageDifference > 10) {
      warnings.push({
        field: 'spouseBirthYear',
        message: 'Spouse beneficiary rule may apply due to age difference'
      });
    }
  }

  return warnings;
}