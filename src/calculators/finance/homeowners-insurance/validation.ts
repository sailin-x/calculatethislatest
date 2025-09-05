import { HomeownersInsuranceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHomeownersInsuranceInputs(inputs: HomeownersInsuranceInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue < 50000) {
    errors.push('Property value must be at least $50,000');
  }
  if (inputs.propertyValue > 10000000) {
    errors.push('Property value cannot exceed $10,000,000');
  }

  // Property address validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  // Property age validation
  if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }
  if (inputs.propertyAge > 200) {
    errors.push('Property age cannot exceed 200 years');
  }

  // Square footage validation
  if (!inputs.squareFootage || inputs.squareFootage < 100) {
    errors.push('Square footage must be at least 100 sq ft');
  }
  if (inputs.squareFootage > 50000) {
    errors.push('Square footage cannot exceed 50,000 sq ft');
  }

  // Coverage validation
  if (inputs.dwellingCoverage < 50000) {
    errors.push('Dwelling coverage must be at least $50,000');
  }
  if (inputs.dwellingCoverage > inputs.propertyValue * 2) {
    warnings.push('Dwelling coverage exceeds 200% of property value');
  }

  if (inputs.personalPropertyCoverage < 10000) {
    errors.push('Personal property coverage must be at least $10,000');
  }

  if (inputs.liabilityCoverage < 100000) {
    errors.push('Liability coverage must be at least $100,000');
  }

  if (inputs.medicalPaymentsCoverage < 1000) {
    errors.push('Medical payments coverage must be at least $1,000');
  }

  if (inputs.deductible < 250) {
    errors.push('Deductible must be at least $250');
  }
  if (inputs.deductible > 10000) {
    errors.push('Deductible cannot exceed $10,000');
  }

  // Age validation
  if (inputs.age < 18) {
    errors.push('Age must be at least 18');
  }
  if (inputs.age > 100) {
    errors.push('Age cannot exceed 100');
  }

  // Claims history validation
  if (inputs.claimsHistory < 0) {
    errors.push('Claims history cannot be negative');
  }
  if (inputs.claimsHistory > 10) {
    warnings.push('Claims history seems unusually high');
  }

  // Distance validations
  if (inputs.distanceToFireStation < 0) {
    errors.push('Distance to fire station cannot be negative');
  }
  if (inputs.distanceToFireStation > 50) {
    warnings.push('Distance to fire station is very far');
  }

  if (inputs.distanceToHydrant < 0) {
    errors.push('Distance to hydrant cannot be negative');
  }
  if (inputs.distanceToHydrant > 5000) {
    warnings.push('Distance to hydrant is very far');
  }

  // Coverage adequacy warnings
  if (inputs.dwellingCoverage < inputs.propertyValue * 0.8) {
    warnings.push('Dwelling coverage is less than 80% of property value');
  }

  if (inputs.personalPropertyCoverage < inputs.dwellingCoverage * 0.5) {
    warnings.push('Personal property coverage is less than 50% of dwelling coverage');
  }

  if (inputs.liabilityCoverage < 300000) {
    warnings.push('Consider increasing liability coverage to at least $300,000');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
