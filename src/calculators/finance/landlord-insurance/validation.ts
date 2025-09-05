import { LandlordInsuranceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateLandlordInsuranceInputs(inputs: LandlordInsuranceInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue < 100000) {
    errors.push('Property value must be at least $100,000');
  }
  if (inputs.propertyValue > 50000000) {
    errors.push('Property value cannot exceed $50,000,000');
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
  if (!inputs.squareFootage || inputs.squareFootage < 500) {
    errors.push('Square footage must be at least 500 sq ft');
  }
  if (inputs.squareFootage > 100000) {
    errors.push('Square footage cannot exceed 100,000 sq ft');
  }

  // Number of units validation
  if (!inputs.numberOfUnits || inputs.numberOfUnits < 1) {
    errors.push('Number of units must be at least 1');
  }
  if (inputs.numberOfUnits > 100) {
    errors.push('Number of units cannot exceed 100');
  }

  // Coverage validation
  if (inputs.dwellingCoverage < 100000) {
    errors.push('Dwelling coverage must be at least $100,000');
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

  if (inputs.lossOfRentsCoverage < 10000) {
    errors.push('Loss of rents coverage must be at least $10,000');
  }

  if (inputs.deductible < 500) {
    errors.push('Deductible must be at least $500');
  }
  if (inputs.deductible > 25000) {
    errors.push('Deductible cannot exceed $25,000');
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

  // Landlord experience validation
  if (inputs.landlordExperience < 0) {
    errors.push('Landlord experience cannot be negative');
  }
  if (inputs.landlordExperience > 50) {
    errors.push('Landlord experience cannot exceed 50 years');
  }

  // Number of properties validation
  if (inputs.numberOfProperties < 0) {
    errors.push('Number of properties cannot be negative');
  }
  if (inputs.numberOfProperties > 1000) {
    errors.push('Number of properties cannot exceed 1000');
  }

  // Rental information validation
  if (inputs.monthlyRent < 0) {
    errors.push('Monthly rent cannot be negative');
  }
  if (inputs.monthlyRent > 100000) {
    errors.push('Monthly rent cannot exceed $100,000');
  }

  if (inputs.annualRent < 0) {
    errors.push('Annual rent cannot be negative');
  }
  if (inputs.annualRent > 1200000) {
    errors.push('Annual rent cannot exceed $1,200,000');
  }

  if (inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
    errors.push('Occupancy rate must be between 0% and 100%');
  }

  if (inputs.averageTenantLength < 0) {
    errors.push('Average tenant length cannot be negative');
  }
  if (inputs.averageTenantLength > 120) {
    errors.push('Average tenant length cannot exceed 120 months');
  }

  if (inputs.securityDeposit < 0) {
    errors.push('Security deposit cannot be negative');
  }
  if (inputs.securityDeposit > 100000) {
    errors.push('Security deposit cannot exceed $100,000');
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

  if (inputs.liabilityCoverage < 500000) {
    warnings.push('Consider increasing liability coverage to at least $500,000 for landlords');
  }

  if (inputs.lossOfRentsCoverage < inputs.annualRent) {
    warnings.push('Loss of rents coverage is less than annual rent');
  }

  // Rental-specific warnings
  if (inputs.occupancyRate < 70) {
    warnings.push('Low occupancy rate may indicate market challenges');
  }

  if (inputs.averageTenantLength < 12) {
    warnings.push('Short average tenant length may indicate tenant quality issues');
  }

  if (!inputs.tenantScreening) {
    warnings.push('No tenant screening may increase risk');
  }

  if (!inputs.leaseAgreement) {
    warnings.push('No lease agreement may increase risk');
  }

  if (inputs.securityDeposit < inputs.monthlyRent) {
    warnings.push('Security deposit is less than monthly rent');
  }

  if (inputs.landlordExperience < 2) {
    warnings.push('Limited landlord experience may increase risk');
  }

  if (inputs.numberOfProperties > 10) {
    warnings.push('Large number of properties may require specialized coverage');
  }

  if (inputs.vacantProperty) {
    warnings.push('Vacant property may require special coverage');
  }

  if (inputs.shortTermRental) {
    warnings.push('Short-term rental may require special coverage');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
