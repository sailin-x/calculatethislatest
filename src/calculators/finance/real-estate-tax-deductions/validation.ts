import { RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsValidation } from './types';

export function validateRealEstateTaxDeductionsInputs(inputs: RealEstateTaxDeductionsInputs): RealEstateTaxDeductionsValidation {
  return {
    propertyType: validatePropertyType(inputs.propertyType),
    propertyValue: validatePropertyValue(inputs.propertyValue),
    landValue: validateLandValue(inputs.landValue),
    placedInServiceDate: validatePlacedInServiceDate(inputs.placedInServiceDate),
    businessUsePercentage: validateBusinessUsePercentage(inputs.businessUsePercentage),
    annualRent: validateAnnualRent(inputs.annualRent),
    operatingExpenses: validateExpenses(inputs.operatingExpenses),
    mortgageInterest: validateExpenses(inputs.mortgageInterest),
    propertyTaxes: validateExpenses(inputs.propertyTaxes),
    insurance: validateExpenses(inputs.insurance),
    utilities: validateExpenses(inputs.utilities),
    maintenance: validateExpenses(inputs.maintenance),
    managementFees: validateExpenses(inputs.managementFees),
    advertising: validateExpenses(inputs.advertising),
    legalFees: validateExpenses(inputs.legalFees),
    accountingFees: validateExpenses(inputs.accountingFees),
    travelExpenses: validateExpenses(inputs.travelExpenses),
    homeOfficeExpenses: validateExpenses(inputs.homeOfficeExpenses),
    depreciation: validateExpenses(inputs.depreciation),
    bonusDepreciation: validateExpenses(inputs.bonusDepreciation),
    section179Deduction: validateExpenses(inputs.section179Deduction),
    costSegregation: validateExpenses(inputs.costSegregation),
    passiveActivityLoss: validateExpenses(inputs.passiveActivityLoss),
    atRiskAmount: validateExpenses(inputs.atRiskAmount),
    materialParticipation: validateMaterialParticipation(inputs.materialParticipation),
    realEstateProfessional: validateRealEstateProfessional(inputs.realEstateProfessional),
    taxYear: validateTaxYear(inputs.taxYear),
    filingStatus: validateFilingStatus(inputs.filingStatus),
    adjustedGrossIncome: validateAdjustedGrossIncome(inputs.adjustedGrossIncome),
    otherPassiveIncome: validateExpenses(inputs.otherPassiveIncome),
    otherPassiveLosses: validateExpenses(inputs.otherPassiveLosses)
  };
}

export function validatePropertyType(type: string): boolean {
  return ['residential', 'commercial', 'mixed-use', 'rental', 'vacation'].includes(type);
}

export function validatePropertyValue(value: number): boolean {
  return value > 0 && value <= 1000000000; // Max $1 billion
}

export function validateLandValue(value: number): boolean {
  return value >= 0 && value <= 1000000000; // Max $1 billion
}

export function validatePlacedInServiceDate(date: string): boolean {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const currentYear = new Date().getFullYear();
  
  return !isNaN(dateObj.getTime()) && 
         dateObj.getFullYear() >= 1900 && 
         dateObj.getFullYear() <= currentYear + 5;
}

export function validateBusinessUsePercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 100;
}

export function validateAnnualRent(rent: number): boolean {
  return rent >= 0 && rent <= 100000000; // Max $100 million
}

export function validateExpenses(expenses: number): boolean {
  return expenses >= 0 && expenses <= 100000000; // Max $100 million
}

export function validateMaterialParticipation(participation: boolean): boolean {
  return typeof participation === 'boolean';
}

export function validateRealEstateProfessional(professional: boolean): boolean {
  return typeof professional === 'boolean';
}

export function validateTaxYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 5;
}

export function validateFilingStatus(status: string): boolean {
  return ['single', 'married-joint', 'married-separate', 'head-of-household'].includes(status);
}

export function validateAdjustedGrossIncome(income: number): boolean {
  return income >= 0 && income <= 1000000000; // Max $1 billion
}

export function getValidationErrors(inputs: RealEstateTaxDeductionsInputs): string[] {
  const errors: string[] = [];
  const validation = validateRealEstateTaxDeductionsInputs(inputs);

  if (!validation.propertyType) {
    errors.push('Property type must be residential, commercial, mixed-use, rental, or vacation');
  }

  if (!validation.propertyValue) {
    errors.push('Property value must be greater than $0 and less than $1 billion');
  }

  if (!validation.landValue) {
    errors.push('Land value must be between $0 and $1 billion');
  }

  if (!validation.placedInServiceDate) {
    errors.push('Placed in service date must be a valid date');
  }

  if (!validation.businessUsePercentage) {
    errors.push('Business use percentage must be between 0% and 100%');
  }

  if (!validation.annualRent) {
    errors.push('Annual rent must be between $0 and $100 million');
  }

  if (!validation.operatingExpenses) {
    errors.push('Operating expenses must be between $0 and $100 million');
  }

  if (!validation.mortgageInterest) {
    errors.push('Mortgage interest must be between $0 and $100 million');
  }

  if (!validation.propertyTaxes) {
    errors.push('Property taxes must be between $0 and $100 million');
  }

  if (!validation.insurance) {
    errors.push('Insurance must be between $0 and $100 million');
  }

  if (!validation.utilities) {
    errors.push('Utilities must be between $0 and $100 million');
  }

  if (!validation.maintenance) {
    errors.push('Maintenance must be between $0 and $100 million');
  }

  if (!validation.managementFees) {
    errors.push('Management fees must be between $0 and $100 million');
  }

  if (!validation.advertising) {
    errors.push('Advertising must be between $0 and $100 million');
  }

  if (!validation.legalFees) {
    errors.push('Legal fees must be between $0 and $100 million');
  }

  if (!validation.accountingFees) {
    errors.push('Accounting fees must be between $0 and $100 million');
  }

  if (!validation.travelExpenses) {
    errors.push('Travel expenses must be between $0 and $100 million');
  }

  if (!validation.homeOfficeExpenses) {
    errors.push('Home office expenses must be between $0 and $100 million');
  }

  if (!validation.depreciation) {
    errors.push('Depreciation must be between $0 and $100 million');
  }

  if (!validation.bonusDepreciation) {
    errors.push('Bonus depreciation must be between $0 and $100 million');
  }

  if (!validation.section179Deduction) {
    errors.push('Section 179 deduction must be between $0 and $100 million');
  }

  if (!validation.costSegregation) {
    errors.push('Cost segregation must be between $0 and $100 million');
  }

  if (!validation.passiveActivityLoss) {
    errors.push('Passive activity loss must be between $0 and $100 million');
  }

  if (!validation.atRiskAmount) {
    errors.push('At-risk amount must be between $0 and $100 million');
  }

  if (!validation.materialParticipation) {
    errors.push('Material participation must be a boolean value');
  }

  if (!validation.realEstateProfessional) {
    errors.push('Real estate professional must be a boolean value');
  }

  if (!validation.taxYear) {
    errors.push('Tax year must be between 1900 and current year + 5');
  }

  if (!validation.filingStatus) {
    errors.push('Filing status must be single, married-joint, married-separate, or head-of-household');
  }

  if (!validation.adjustedGrossIncome) {
    errors.push('Adjusted gross income must be between $0 and $1 billion');
  }

  if (!validation.otherPassiveIncome) {
    errors.push('Other passive income must be between $0 and $100 million');
  }

  if (!validation.otherPassiveLosses) {
    errors.push('Other passive losses must be between $0 and $100 million');
  }

  // Additional business logic validations
  if (inputs.landValue >= inputs.propertyValue) {
    errors.push('Land value cannot exceed property value');
  }

  if (inputs.section179Deduction > 1080000) {
    errors.push('Section 179 deduction cannot exceed $1,080,000');
  }

  if (inputs.businessUsePercentage > 0 && inputs.annualRent === 0) {
    errors.push('Annual rent must be greater than $0 when business use percentage is greater than 0%');
  }

  return errors;
}

export function validateRealEstateTaxDeductionsCalculation(inputs: RealEstateTaxDeductionsInputs): boolean {
  const validation = validateRealEstateTaxDeductionsInputs(inputs);
  return Object.values(validation).every(Boolean);
}