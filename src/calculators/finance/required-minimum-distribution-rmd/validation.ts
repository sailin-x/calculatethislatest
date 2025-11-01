import { RequiredMinimumDistributionRMDInputs } from './types';

export function validateRequiredMinimumDistributionRMDInputs(inputs: RequiredMinimumDistributionRMDInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  const currentYear = new Date().getFullYear();

  // Account Balance Validation
  if (!inputs.accountBalance || inputs.accountBalance < 0) {
    errors.push({ field: 'accountBalance', message: 'Account balance must be 0 or greater' });
  }
  if (inputs.accountBalance && inputs.accountBalance > 100000000) {
    errors.push({ field: 'accountBalance', message: 'Account balance cannot exceed $100,000,000' });
  }

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

  // Current Age Validation (if provided)
  if (inputs.currentAge && (inputs.currentAge < 0 || inputs.currentAge > 150)) {
    errors.push({ field: 'currentAge', message: 'Current age must be between 0 and 150' });
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

export function validateRequiredMinimumDistributionRMDBusinessRules(inputs: RequiredMinimumDistributionRMDInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  const currentYear = new Date().getFullYear();
  const age = inputs.currentAge || (currentYear - inputs.birthYear);

  // Roth IRA Warning
  if (inputs.accountType === 'roth_ira') {
    warnings.push({
      field: 'accountType',
      message: 'Roth IRAs do not require minimum distributions during lifetime'
    });
  }

  // Age Warnings
  if (age < 70 && inputs.accountType !== 'roth_ira') {
    warnings.push({
      field: 'birthYear',
      message: 'RMDs typically begin at age 72 (or 70½ if born before 1951)'
    });
  }

  // High Balance Warning
  if (inputs.accountBalance > 5000000) {
    warnings.push({
      field: 'accountBalance',
      message: 'Large account balances may result in substantial RMD amounts. Consider Qualified Charitable Distributions.'
    });
  }

  // Joint Life Expectancy Warning
  if (inputs.isSpouseBeneficialOwner && inputs.spouseBirthYear) {
    const spouseAge = currentYear - inputs.spouseBirthYear;
    if (spouseAge < 65) {
      warnings.push({
        field: 'spouseBirthYear',
        message: 'Spouse must be at least age 65 for joint life expectancy calculations'
      });
    }
  }

  // Multiple Accounts Warning
  if (inputs.hasMultipleAccounts) {
    warnings.push({
      field: 'hasMultipleAccounts',
      message: 'If you have multiple accounts, RMDs must be calculated separately for each account'
    });
  }

  return warnings;
}