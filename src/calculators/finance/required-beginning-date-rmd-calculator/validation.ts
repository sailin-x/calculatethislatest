import { RequiredBeginningDateRmdInputs } from './types';

export function validateRequiredBeginningDateRmdInputs(inputs: RequiredBeginningDateRmdInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 120) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 120' });
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy < inputs.currentAge) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy must be greater than current age' });
  }
  if (inputs.lifeExpectancy && inputs.lifeExpectancy > 130) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy cannot exceed 130' });
  }

  // Account Balance Validation
  if (!inputs.accountBalance || inputs.accountBalance < 0) {
    errors.push({ field: 'accountBalance', message: 'Account balance cannot be negative' });
  }
  if (inputs.accountBalance && inputs.accountBalance > 100000000) {
    errors.push({ field: 'accountBalance', message: 'Account balance cannot exceed $100,000,000' });
  }

  // Tax Rate Validation
  if (inputs.marginalTaxRate < 0) {
    errors.push({ field: 'marginalTaxRate', message: 'Marginal tax rate cannot be negative' });
  }
  if (inputs.marginalTaxRate > 50) {
    errors.push({ field: 'marginalTaxRate', message: 'Marginal tax rate cannot exceed 50%' });
  }

  if (inputs.stateTaxRate < 0) {
    errors.push({ field: 'stateTaxRate', message: 'State tax rate cannot be negative' });
  }
  if (inputs.stateTaxRate > 20) {
    errors.push({ field: 'stateTaxRate', message: 'State tax rate cannot exceed 20%' });
  }

  // Investment Rate Validation
  if (inputs.expectedReturnRate < -20) {
    errors.push({ field: 'expectedReturnRate', message: 'Expected return rate cannot be less than -20%' });
  }
  if (inputs.expectedReturnRate > 50) {
    errors.push({ field: 'expectedReturnRate', message: 'Expected return rate cannot exceed 50%' });
  }

  if (inputs.inflationRate < -5) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate cannot be less than -5%' });
  }
  if (inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate cannot exceed 20%' });
  }

  // Spouse Information Validation
  if (inputs.includeSpouse) {
    if (!inputs.spouseAge || inputs.spouseAge < 18) {
      errors.push({ field: 'spouseAge', message: 'Spouse age must be at least 18' });
    }
    if (inputs.spouseAge && inputs.spouseAge > 120) {
      errors.push({ field: 'spouseAge', message: 'Spouse age cannot exceed 120' });
    }
  }

  // Inherited Account Validation
  if (inputs.accountType === 'inherited_ira') {
    if (!inputs.inheritanceDate) {
      errors.push({ field: 'inheritanceDate', message: 'Inheritance date is required for inherited IRAs' });
    }
    if (!inputs.decedentBirthDate) {
      errors.push({ field: 'decedentBirthDate', message: 'Decedent birth date is required for inherited IRAs' });
    }
    if (!inputs.decedentDeathDate) {
      errors.push({ field: 'decedentDeathDate', message: 'Decedent death date is required for inherited IRAs' });
    }
  }

  // Birth Date Validation
  if (!inputs.birthDate) {
    errors.push({ field: 'birthDate', message: 'Birth date is required' });
  } else {
    const birthDate = new Date(inputs.birthDate);
    const currentDate = new Date();
    if (birthDate > currentDate) {
      errors.push({ field: 'birthDate', message: 'Birth date cannot be in the future' });
    }
  }

  return errors;
}

export function validateRequiredBeginningDateRmdBusinessRules(inputs: RequiredBeginningDateRmdInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Age Warnings
  const yearsUntilRmd = Math.max(0, calculateRmdAge(inputs) - inputs.currentAge);
  if (yearsUntilRmd < 2) {
    warnings.push({ field: 'currentAge', message: 'RMDs will begin soon - plan for required distributions' });
  }

  // Account Balance Warnings
  if (inputs.accountBalance < 100000) {
    warnings.push({ field: 'accountBalance', message: 'Low account balance may result in small RMD amounts' });
  }

  // Tax Rate Warnings
  if (inputs.marginalTaxRate > 35) {
    warnings.push({ field: 'marginalTaxRate', message: 'High tax bracket may significantly impact RMD taxation' });
  }

  // Investment Return Warnings
  if (inputs.expectedReturnRate < 4) {
    warnings.push({ field: 'expectedReturnRate', message: 'Low expected returns may reduce account growth before RMDs' });
  }

  // Spouse Warnings
  if (inputs.includeSpouse && inputs.spouseAge && inputs.spouseAge < 70) {
    warnings.push({ field: 'spouseAge', message: 'Younger spouse may allow for spousal rollover strategies' });
  }

  // Inherited Account Warnings
  if (inputs.accountType === 'inherited_ira') {
    const inheritanceDate = new Date(inputs.inheritanceDate || '2020-01-01');
    const ruleChangeDate = new Date('2020-01-01');

    if (inheritanceDate >= ruleChangeDate) {
      warnings.push({ field: 'inheritanceDate', message: 'Inherited after 2019 - 10-year rule applies instead of stretch IRA' });
    }
  }

  // Roth IRA Warnings
  if (inputs.accountType === 'roth_ira') {
    warnings.push({ field: 'accountType', message: 'Roth IRAs are not subject to RMDs during owner\'s lifetime' });
  }

  // Still Working Warnings
  if (inputs.stillWorking && inputs.employerPlan) {
    warnings.push({ field: 'stillWorking', message: 'Still working for plan sponsor may allow delayed RMDs from this plan' });
  }

  // Disability Warnings
  if (inputs.disability) {
    warnings.push({ field: 'disability', message: 'Disability may allow waiver of RMD requirements' });
  }

  return warnings;
}

// Helper function for RMD age calculation
function calculateRmdAge(inputs: RequiredBeginningDateRmdInputs): number {
  const birthYear = new Date(inputs.birthDate).getFullYear();
  if (birthYear < 1951) {
    return 70.5;
  }
  return 73;
}