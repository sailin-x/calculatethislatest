import { RealEstateDevelopmentProformaInputs, RealEstateDevelopmentProformaValidation } from './types';

export function validateRealEstateDevelopmentProformaInputs(inputs: RealEstateDevelopmentProformaInputs): RealEstateDevelopmentProformaValidation {
  return {
    projectName: validateProjectName(inputs.projectName),
    projectType: validateProjectType(inputs.projectType),
    totalUnits: validateTotalUnits(inputs.totalUnits),
    averageUnitSize: validateAverageUnitSize(inputs.averageUnitSize),
    constructionCost: validateCost(inputs.constructionCost),
    landCost: validateCost(inputs.landCost),
    softCosts: validateCost(inputs.softCosts),
    financingCosts: validateCost(inputs.financingCosts),
    contingency: validateCost(inputs.contingency),
    developmentPeriod: validatePeriod(inputs.developmentPeriod),
    stabilizationPeriod: validatePeriod(inputs.stabilizationPeriod),
    averageRent: validateRent(inputs.averageRent),
    occupancyRate: validateOccupancyRate(inputs.occupancyRate),
    operatingExpenses: validateCost(inputs.operatingExpenses),
    managementFees: validateCost(inputs.managementFees),
    propertyTaxes: validateCost(inputs.propertyTaxes),
    insurance: validateCost(inputs.insurance),
    utilities: validateCost(inputs.utilities),
    maintenance: validateCost(inputs.maintenance),
    marketing: validateCost(inputs.marketing),
    otherExpenses: validateCost(inputs.otherExpenses),
    exitCapRate: validateCapRate(inputs.exitCapRate),
    appreciationRate: validateAppreciationRate(inputs.appreciationRate),
    financingRate: validateFinancingRate(inputs.financingRate),
    loanToCostRatio: validateLoanToCostRatio(inputs.loanToCostRatio),
    interestOnlyPeriod: validateInterestOnlyPeriod(inputs.interestOnlyPeriod)
  };
}

export function validateProjectName(name: string): boolean {
  return name.length > 0 && name.length <= 100;
}

export function validateProjectType(type: string): boolean {
  return ['residential', 'commercial', 'mixed-use', 'industrial', 'retail'].includes(type);
}

export function validateTotalUnits(units: number): boolean {
  return units > 0 && units <= 10000;
}

export function validateAverageUnitSize(size: number): boolean {
  return size > 0 && size <= 10000; // Max 10,000 sq ft
}

export function validateCost(cost: number): boolean {
  return cost >= 0 && cost <= 1000000000; // Max $1 billion
}

export function validatePeriod(period: number): boolean {
  return period >= 0 && period <= 10; // Max 10 years
}

export function validateRent(rent: number): boolean {
  return rent > 0 && rent <= 50000; // Max $50,000 per unit per month
}

export function validateOccupancyRate(rate: number): boolean {
  return rate > 0 && rate <= 1; // 0% to 100%
}

export function validateCapRate(rate: number): boolean {
  return rate > 0 && rate <= 20; // 0% to 20%
}

export function validateAppreciationRate(rate: number): boolean {
  return rate >= -10 && rate <= 20; // -10% to 20%
}

export function validateFinancingRate(rate: number): boolean {
  return rate >= 0 && rate <= 20; // 0% to 20%
}

export function validateLoanToCostRatio(ratio: number): boolean {
  return ratio >= 0 && ratio <= 90; // 0% to 90%
}

export function validateInterestOnlyPeriod(period: number): boolean {
  return period >= 0 && period <= 5; // Max 5 years
}

export function getValidationErrors(inputs: RealEstateDevelopmentProformaInputs): string[] {
  const errors: string[] = [];
  const validation = validateRealEstateDevelopmentProformaInputs(inputs);

  if (!validation.projectName) {
    errors.push('Project name must be between 1 and 100 characters');
  }

  if (!validation.projectType) {
    errors.push('Project type must be residential, commercial, mixed-use, industrial, or retail');
  }

  if (!validation.totalUnits) {
    errors.push('Total units must be between 1 and 10,000');
  }

  if (!validation.averageUnitSize) {
    errors.push('Average unit size must be between 1 and 10,000 square feet');
  }

  if (!validation.constructionCost) {
    errors.push('Construction cost must be between $0 and $1 billion');
  }

  if (!validation.landCost) {
    errors.push('Land cost must be between $0 and $1 billion');
  }

  if (!validation.softCosts) {
    errors.push('Soft costs must be between $0 and $1 billion');
  }

  if (!validation.financingCosts) {
    errors.push('Financing costs must be between $0 and $1 billion');
  }

  if (!validation.contingency) {
    errors.push('Contingency must be between $0 and $1 billion');
  }

  if (!validation.developmentPeriod) {
    errors.push('Development period must be between 0 and 10 years');
  }

  if (!validation.stabilizationPeriod) {
    errors.push('Stabilization period must be between 0 and 10 years');
  }

  if (!validation.averageRent) {
    errors.push('Average rent must be between $1 and $50,000 per unit per month');
  }

  if (!validation.occupancyRate) {
    errors.push('Occupancy rate must be between 0% and 100%');
  }

  if (!validation.operatingExpenses) {
    errors.push('Operating expenses must be between $0 and $1 billion');
  }

  if (!validation.managementFees) {
    errors.push('Management fees must be between $0 and $1 billion');
  }

  if (!validation.propertyTaxes) {
    errors.push('Property taxes must be between $0 and $1 billion');
  }

  if (!validation.insurance) {
    errors.push('Insurance must be between $0 and $1 billion');
  }

  if (!validation.utilities) {
    errors.push('Utilities must be between $0 and $1 billion');
  }

  if (!validation.maintenance) {
    errors.push('Maintenance must be between $0 and $1 billion');
  }

  if (!validation.marketing) {
    errors.push('Marketing must be between $0 and $1 billion');
  }

  if (!validation.otherExpenses) {
    errors.push('Other expenses must be between $0 and $1 billion');
  }

  if (!validation.exitCapRate) {
    errors.push('Exit cap rate must be between 0% and 20%');
  }

  if (!validation.appreciationRate) {
    errors.push('Appreciation rate must be between -10% and 20%');
  }

  if (!validation.financingRate) {
    errors.push('Financing rate must be between 0% and 20%');
  }

  if (!validation.loanToCostRatio) {
    errors.push('Loan-to-cost ratio must be between 0% and 90%');
  }

  if (!validation.interestOnlyPeriod) {
    errors.push('Interest-only period must be between 0 and 5 years');
  }

  // Additional business logic validations
  if (inputs.loanToCostRatio > 0 && inputs.financingRate <= 0) {
    errors.push('Financing rate must be greater than 0% when using debt financing');
  }

  if (inputs.interestOnlyPeriod > inputs.developmentPeriod + inputs.stabilizationPeriod) {
    errors.push('Interest-only period cannot exceed total development and stabilization period');
  }

  return errors;
}

export function validateRealEstateDevelopmentProformaCalculation(inputs: RealEstateDevelopmentProformaInputs): boolean {
  const validation = validateRealEstateDevelopmentProformaInputs(inputs);
  return Object.values(validation).every(Boolean);
}