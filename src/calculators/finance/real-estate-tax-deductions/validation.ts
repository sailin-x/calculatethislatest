import { RealEstateTaxDeductionsInputs } from './formulas';

export function validateRealEstateTaxDeductionsInputs(inputs: RealEstateTaxDeductionsInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!inputs.propertyType) errors.push('Property type is required');
  if (!inputs.purchasePrice) errors.push('Purchase price is required');
  if (inputs.landValue === undefined || inputs.landValue === null) errors.push('Land value is required');
  if (inputs.improvements === undefined || inputs.improvements === null) errors.push('Improvements is required');
  if (!inputs.acquisitionDate) errors.push('Acquisition date is required');
  if (!inputs.placedInServiceDate) errors.push('Placed in service date is required');
  if (inputs.annualRentalIncome === undefined || inputs.annualRentalIncome === null) errors.push('Annual rental income is required');
  if (inputs.operatingExpenses === undefined || inputs.operatingExpenses === null) errors.push('Operating expenses is required');
  if (inputs.propertyTaxes === undefined || inputs.propertyTaxes === null) errors.push('Property taxes is required');
  if (inputs.insurance === undefined || inputs.insurance === null) errors.push('Insurance is required');
  if (inputs.mortgageInterest === undefined || inputs.mortgageInterest === null) errors.push('Mortgage interest is required');
  if (inputs.managementFees === undefined || inputs.managementFees === null) errors.push('Management fees is required');
  if (inputs.repairs === undefined || inputs.repairs === null) errors.push('Repairs is required');
  if (inputs.utilities === undefined || inputs.utilities === null) errors.push('Utilities is required');
  if (inputs.advertising === undefined || inputs.advertising === null) errors.push('Advertising is required');
  if (inputs.legalFees === undefined || inputs.legalFees === null) errors.push('Legal fees is required');
  if (inputs.travelExpenses === undefined || inputs.travelExpenses === null) errors.push('Travel expenses is required');
  if (inputs.otherExpenses === undefined || inputs.otherExpenses === null) errors.push('Other expenses is required');
  if (inputs.personalUseDays === undefined || inputs.personalUseDays === null) errors.push('Personal use days is required');
  if (inputs.rentalDays === undefined || inputs.rentalDays === null) errors.push('Rental days is required');
  if (!inputs.taxYear) errors.push('Tax year is required');
  if (!inputs.filingStatus) errors.push('Filing status is required');
  if (!inputs.adjustedGrossIncome) errors.push('Adjusted gross income is required');
  if (inputs.otherPassiveIncome === undefined || inputs.otherPassiveIncome === null) errors.push('Other passive income is required');
  if (!inputs.materialParticipation) errors.push('Material participation is required');
  if (!inputs.realEstateProfessional) errors.push('Real estate professional status is required');

  // Range validations
  if (inputs.purchasePrice < 0 || inputs.purchasePrice > 1000000000) errors.push('Purchase price must be between $0 and $1 billion');
  if (inputs.landValue < 0 || inputs.landValue > 1000000000) errors.push('Land value must be between $0 and $1 billion');
  if (inputs.improvements < 0 || inputs.improvements > 1000000000) errors.push('Improvements must be between $0 and $1 billion');
  if (inputs.annualRentalIncome < 0 || inputs.annualRentalIncome > 10000000) errors.push('Annual rental income must be between $0 and $10 million');
  if (inputs.operatingExpenses < 0 || inputs.operatingExpenses > 10000000) errors.push('Operating expenses must be between $0 and $10 million');
  if (inputs.propertyTaxes < 0 || inputs.propertyTaxes > 1000000) errors.push('Property taxes must be between $0 and $1 million');
  if (inputs.insurance < 0 || inputs.insurance > 1000000) errors.push('Insurance must be between $0 and $1 million');
  if (inputs.mortgageInterest < 0 || inputs.mortgageInterest > 1000000) errors.push('Mortgage interest must be between $0 and $1 million');
  if (inputs.managementFees < 0 || inputs.managementFees > 1000000) errors.push('Management fees must be between $0 and $1 million');
  if (inputs.repairs < 0 || inputs.repairs > 1000000) errors.push('Repairs must be between $0 and $1 million');
  if (inputs.utilities < 0 || inputs.utilities > 1000000) errors.push('Utilities must be between $0 and $1 million');
  if (inputs.advertising < 0 || inputs.advertising > 1000000) errors.push('Advertising must be between $0 and $1 million');
  if (inputs.legalFees < 0 || inputs.legalFees > 1000000) errors.push('Legal fees must be between $0 and $1 million');
  if (inputs.travelExpenses < 0 || inputs.travelExpenses > 1000000) errors.push('Travel expenses must be between $0 and $1 million');
  if (inputs.otherExpenses < 0 || inputs.otherExpenses > 1000000) errors.push('Other expenses must be between $0 and $1 million');
  if (inputs.personalUseDays < 0 || inputs.personalUseDays > 365) errors.push('Personal use days must be between 0 and 365');
  if (inputs.rentalDays < 0 || inputs.rentalDays > 365) errors.push('Rental days must be between 0 and 365');
  if (inputs.taxYear < 2020 || inputs.taxYear > 2030) errors.push('Tax year must be between 2020 and 2030');
  if (inputs.adjustedGrossIncome < 0 || inputs.adjustedGrossIncome > 10000000) errors.push('Adjusted gross income must be between $0 and $10 million');
  if (inputs.otherPassiveIncome < -1000000 || inputs.otherPassiveIncome > 1000000) errors.push('Other passive income must be between -$1 million and $1 million');

  // Business logic validations
  validateBusinessLogic(inputs, errors);

  return errors;
}

function validateBusinessLogic(inputs: RealEstateTaxDeductionsInputs, errors: string[]): void {
  // Land value validation
  if (inputs.landValue > inputs.purchasePrice) {
    errors.push('Land value cannot exceed purchase price');
  }

  // Total days validation
  const totalDays = inputs.personalUseDays + inputs.rentalDays;
  if (totalDays > 365) {
    errors.push('Total days (personal + rental) cannot exceed 365');
  }

  // Date validations
  const acquisitionDate = new Date(inputs.acquisitionDate);
  const placedInServiceDate = new Date(inputs.placedInServiceDate);
  const currentDate = new Date();
  
  if (isNaN(acquisitionDate.getTime())) {
    errors.push('Invalid acquisition date');
  }
  
  if (isNaN(placedInServiceDate.getTime())) {
    errors.push('Invalid placed in service date');
  }
  
  if (placedInServiceDate < acquisitionDate) {
    errors.push('Placed in service date cannot be before acquisition date');
  }
  
  if (acquisitionDate > currentDate) {
    errors.push('Acquisition date cannot be in the future');
  }

  // Property type specific validations
  if (inputs.propertyType === 'land' && inputs.annualRentalIncome > 0) {
    errors.push('Land development properties typically have zero rental income during development');
  }

  if (inputs.propertyType === 'short_term_rental' && inputs.personalUseDays > 14) {
    errors.push('Short-term rentals with more than 14 days personal use may have different tax treatment');
  }

  // Expense reasonableness checks
  const totalExpenses = inputs.operatingExpenses + inputs.propertyTaxes + inputs.insurance + 
                       inputs.mortgageInterest + inputs.managementFees + inputs.repairs + 
                       inputs.utilities + inputs.advertising + inputs.legalFees + 
                       inputs.travelExpenses + inputs.otherExpenses;
  
  if (totalExpenses > inputs.annualRentalIncome * 2) {
    errors.push('Total expenses seem unusually high relative to rental income');
  }

  if (inputs.propertyTaxes > inputs.purchasePrice * 0.03) {
    errors.push('Property taxes seem unusually high');
  }

  if (inputs.insurance > inputs.purchasePrice * 0.01) {
    errors.push('Insurance costs seem unusually high');
  }

  // Income reasonableness checks
  if (inputs.annualRentalIncome > inputs.purchasePrice * 0.15) {
    errors.push('Rental income seems unusually high relative to purchase price');
  }

  if (inputs.annualRentalIncome < inputs.purchasePrice * 0.02) {
    errors.push('Rental income seems unusually low relative to purchase price');
  }

  // Filing status validation
  const validFilingStatuses = ['single', 'married_joint', 'married_separate', 'head_of_household', 'qualifying_widow'];
  if (!validFilingStatuses.includes(inputs.filingStatus)) {
    errors.push('Invalid filing status');
  }

  // Property type validation
  const validPropertyTypes = ['residential', 'commercial', 'mixed_use', 'vacation_rental', 'short_term_rental', 'land'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  // Material participation validation
  const validParticipation = ['yes', 'no'];
  if (!validParticipation.includes(inputs.materialParticipation)) {
    errors.push('Invalid material participation value');
  }

  const validProfessional = ['yes', 'no'];
  if (!validProfessional.includes(inputs.realEstateProfessional)) {
    errors.push('Invalid real estate professional value');
  }

  // Tax year validation
  if (inputs.taxYear < 2020 || inputs.taxYear > 2030) {
    errors.push('Tax year must be between 2020 and 2030');
  }

  // AGI validation
  if (inputs.adjustedGrossIncome < 0) {
    errors.push('Adjusted gross income cannot be negative');
  }

  // Rental use percentage validation
  const rentalUsePercentage = totalDays > 0 ? inputs.rentalDays / totalDays : 0;
  if (rentalUsePercentage < 0.1) {
    errors.push('Property must be rented for at least 10% of the year to qualify as rental property');
  }
}