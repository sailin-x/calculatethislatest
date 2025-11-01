import { StretchIRAInputs } from './types';

export function validateStretchIRAInputs(inputs: StretchIRAInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Initial Balance Validation
  if (!inputs.initialBalance || inputs.initialBalance <= 0) {
    errors.push({ field: 'initialBalance', message: 'Initial balance must be greater than 0' });
  }
  if (inputs.initialBalance && inputs.initialBalance > 10000000) {
    errors.push({ field: 'initialBalance', message: 'Initial balance cannot exceed $10,000,000' });
  }

  // Expected Annual Return Validation
  if (inputs.expectedAnnualReturn < -10 || inputs.expectedAnnualReturn > 50) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected annual return must be between -10% and 50%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5 || inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Tax Bracket Validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 100) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be between 0% and 100%' });
  }

  // Number of Beneficiaries Validation
  if (!inputs.numberOfBeneficiaries || inputs.numberOfBeneficiaries < 1) {
    errors.push({ field: 'numberOfBeneficiaries', message: 'Number of beneficiaries must be at least 1' });
  }
  if (inputs.numberOfBeneficiaries > 10) {
    errors.push({ field: 'numberOfBeneficiaries', message: 'Number of beneficiaries cannot exceed 10' });
  }

  // Beneficiary Ages Validation
  if (inputs.beneficiaryAges) {
    inputs.beneficiaryAges.forEach((age, index) => {
      if (age < 0 || age > 120) {
        errors.push({ field: `beneficiaryAges[${index}]`, message: `Beneficiary age must be between 0 and 120` });
      }
    });
  }

  // Analysis Period Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period must be at least 1 year' });
  }
  if (inputs.analysisPeriod > 100) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period cannot exceed 100 years' });
  }

  // Current Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  // Withdrawal Strategy Specific Validation
  if (inputs.withdrawalStrategy === 'fixed_amount' && (!inputs.fixedWithdrawalAmount || inputs.fixedWithdrawalAmount <= 0)) {
    errors.push({ field: 'fixedWithdrawalAmount', message: 'Fixed withdrawal amount must be greater than 0' });
  }

  if (inputs.withdrawalStrategy === 'fixed_percentage' && (!inputs.fixedWithdrawalPercentage || inputs.fixedWithdrawalPercentage <= 0 || inputs.fixedWithdrawalPercentage > 100)) {
    errors.push({ field: 'fixedWithdrawalPercentage', message: 'Fixed withdrawal percentage must be between 0% and 100%' });
  }

  return errors;
}

export function validateStretchIRABusinessRules(inputs: StretchIRAInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Age Warnings
  if (inputs.currentAge && inputs.currentAge < 59.5) {
    warnings.push({ field: 'currentAge', message: 'Early withdrawal penalties may apply before age 59½' });
  }

  // Beneficiary Age Warnings
  if (inputs.beneficiaryAges) {
    inputs.beneficiaryAges.forEach((age, index) => {
      if (age < 18) {
        warnings.push({ field: `beneficiaryAges[${index}]`, message: 'Minor beneficiaries may have different distribution rules' });
      }
    });
  }

  // Balance Size Warnings
  if (inputs.initialBalance > 1000000) {
    warnings.push({ field: 'initialBalance', message: 'Large balances may trigger higher scrutiny from IRS' });
  }

  // Tax Bracket Warnings
  if (inputs.taxBracket > 35) {
    warnings.push({ field: 'taxBracket', message: 'High tax bracket may reduce stretch IRA effectiveness' });
  }

  // Return Expectations Warnings
  if (inputs.expectedAnnualReturn > 10) {
    warnings.push({ field: 'expectedAnnualReturn', message: 'High return expectations may not be sustainable' });
  }

  // Beneficiary Count Warnings
  if (inputs.numberOfBeneficiaries > 3) {
    warnings.push({ field: 'numberOfBeneficiaries', message: 'Multiple beneficiaries can complicate estate planning' });
  }

  // Withdrawal Strategy Warnings
  if (inputs.withdrawalStrategy === 'fixed_amount' && inputs.fixedWithdrawalAmount! > inputs.initialBalance * 0.1) {
    warnings.push({ field: 'fixedWithdrawalAmount', message: 'Large fixed withdrawals may deplete funds quickly' });
  }

  if (inputs.withdrawalStrategy === 'fixed_percentage' && inputs.fixedWithdrawalPercentage! > 10) {
    warnings.push({ field: 'fixedWithdrawalPercentage', message: 'High percentage withdrawals may not be sustainable' });
  }

  return warnings;
}