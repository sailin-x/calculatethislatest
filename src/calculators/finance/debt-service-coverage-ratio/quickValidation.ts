import { CalculatorInputs } from '../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateGrossRentalIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Gross rental income is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Gross rental income must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Gross rental income cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, message: 'Gross rental income cannot exceed $100,000,000' };
  }

  return { isValid: true };
}

export function validateOtherIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Other income is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Other income must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Other income cannot be negative' };
  }

  if (numValue > 50000000) {
    return { isValid: false, message: 'Other income cannot exceed $50,000,000' };
  }

  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Vacancy rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Vacancy rate must be a valid number' };
  }

  if (numValue < 0 || numValue > 100) {
    return { isValid: false, message: 'Vacancy rate must be between 0% and 100%' };
  }

  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Operating expenses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Operating expenses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Operating expenses cannot be negative' };
  }

  if (numValue > 50000000) {
    return { isValid: false, message: 'Operating expenses cannot exceed $50,000,000' };
  }

  return { isValid: true };
}

export function validatePropertyManagementFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property management fee is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property management fee must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Property management fee cannot be negative' };
  }

  if (numValue > 5000000) {
    return { isValid: false, message: 'Property management fee cannot exceed $5,000,000' };
  }

  return { isValid: true };
}

export function validateMaintenanceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Maintenance costs are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Maintenance costs must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Maintenance costs cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, message: 'Maintenance costs cannot exceed $10,000,000' };
  }

  return { isValid: true };
}

export function validateInsuranceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Insurance costs are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Insurance costs must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Insurance costs cannot be negative' };
  }

  if (numValue > 5000000) {
    return { isValid: false, message: 'Insurance costs cannot exceed $5,000,000' };
  }

  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property taxes are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property taxes must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, message: 'Property taxes cannot exceed $10,000,000' };
  }

  return { isValid: true };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Utilities are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Utilities must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Utilities cannot be negative' };
  }

  if (numValue > 5000000) {
    return { isValid: false, message: 'Utilities cannot exceed $5,000,000' };
  }

  return { isValid: true };
}

export function validateRepairs(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Repairs are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Repairs must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Repairs cannot be negative' };
  }

  if (numValue > 5000000) {
    return { isValid: false, message: 'Repairs cannot exceed $5,000,000' };
  }

  return { isValid: true };
}

export function validateLandscaping(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Landscaping is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Landscaping must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Landscaping cannot be negative' };
  }

  if (numValue > 2000000) {
    return { isValid: false, message: 'Landscaping cannot exceed $2,000,000' };
  }

  return { isValid: true };
}

export function validateSecurity(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Security is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Security must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Security cannot be negative' };
  }

  if (numValue > 2000000) {
    return { isValid: false, message: 'Security cannot exceed $2,000,000' };
  }

  return { isValid: true };
}

export function validateAdvertising(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Advertising is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Advertising must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Advertising cannot be negative' };
  }

  if (numValue > 1000000) {
    return { isValid: false, message: 'Advertising cannot exceed $1,000,000' };
  }

  return { isValid: true };
}

export function validateLegalFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Legal fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Legal fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Legal fees cannot be negative' };
  }

  if (numValue > 1000000) {
    return { isValid: false, message: 'Legal fees cannot exceed $1,000,000' };
  }

  return { isValid: true };
}

export function validateAccountingFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Accounting fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Accounting fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, message: 'Accounting fees cannot be negative' };
  }

  if (numValue > 500000) {
    return { isValid: false, message: 'Accounting fees cannot exceed $500,000' };
  }

  return { isValid: true };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan amount is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan amount must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }

  if (numValue > 100000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $100,000,000' };
  }

  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Interest rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }

  if (numValue < 0 || numValue > 25) {
    return { isValid: false, message: 'Interest rate must be between 0% and 25%' };
  }

  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan term is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }

  if (numValue < 1 || numValue > 50) {
    return { isValid: false, message: 'Loan term must be between 1 and 50 years' };
  }

  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }

  if (numValue > 500000000) {
    return { isValid: false, message: 'Property value cannot exceed $500,000,000' };
  }

  return { isValid: true };
}

export function validateRequiredDSCR(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Required DSCR is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Required DSCR must be a valid number' };
  }

  if (numValue < 1.0 || numValue > 3.0) {
    return { isValid: false, message: 'Required DSCR must be between 1.0 and 3.0' };
  }

  return { isValid: true };
}

export function validateMarketCapRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Market cap rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Market cap rate must be a valid number' };
  }

  if (numValue < 0 || numValue > 20) {
    return { isValid: false, message: 'Market cap rate must be between 0% and 20%' };
  }

  return { isValid: true };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property age is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property age must be a valid number' };
  }

  if (numValue < 0 || numValue > 100) {
    return { isValid: false, message: 'Property age must be between 0 and 100 years' };
  }

  return { isValid: true };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Occupancy rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Occupancy rate must be a valid number' };
  }

  if (numValue < 0 || numValue > 100) {
    return { isValid: false, message: 'Occupancy rate must be between 0% and 100%' };
  }

  return { isValid: true };
}

export function validateAllDSCRInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate all required fields
  const validations = [
    { field: 'grossRentalIncome', validate: validateGrossRentalIncome },
    { field: 'otherIncome', validate: validateOtherIncome },
    { field: 'vacancyRate', validate: validateVacancyRate },
    { field: 'operatingExpenses', validate: validateOperatingExpenses },
    { field: 'propertyManagementFee', validate: validatePropertyManagementFee },
    { field: 'maintenanceCosts', validate: validateMaintenanceCosts },
    { field: 'insuranceCosts', validate: validateInsuranceCosts },
    { field: 'propertyTaxes', validate: validatePropertyTaxes },
    { field: 'utilities', validate: validateUtilities },
    { field: 'repairs', validate: validateRepairs },
    { field: 'landscaping', validate: validateLandscaping },
    { field: 'security', validate: validateSecurity },
    { field: 'advertising', validate: validateAdvertising },
    { field: 'legalFees', validate: validateLegalFees },
    { field: 'accountingFees', validate: validateAccountingFees },
    { field: 'loanAmount', validate: validateLoanAmount },
    { field: 'interestRate', validate: validateInterestRate },
    { field: 'loanTerm', validate: validateLoanTerm },
    { field: 'propertyValue', validate: validatePropertyValue },
    { field: 'requiredDSCR', validate: validateRequiredDSCR },
    { field: 'marketCapRate', validate: validateMarketCapRate },
    { field: 'propertyAge', validate: validatePropertyAge },
    { field: 'occupancyRate', validate: validateOccupancyRate }
  ];

  validations.forEach(({ field, validate }) => {
    if (inputs[field] !== undefined) {
      const result = validate(inputs[field]);
      if (!result.isValid && result.message) {
        errors.push(result.message);
      }
    }
  });

  // Additional logical validations if we have the necessary inputs
  if (inputs.loanAmount && inputs.propertyValue) {
    if (inputs.loanAmount > inputs.propertyValue) {
      errors.push('Loan amount cannot exceed property value');
    }
  }

  if (inputs.vacancyRate && inputs.occupancyRate) {
    if (inputs.vacancyRate + inputs.occupancyRate > 100) {
      errors.push('Vacancy rate plus occupancy rate cannot exceed 100%');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
