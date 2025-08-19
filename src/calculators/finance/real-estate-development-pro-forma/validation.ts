import { ValidationRuleFactory } from '../../../utils/validation';
import { RealEstateDevelopmentProFormaInputs } from './formulas';

export function validateRealEstateDevelopmentProFormaInputs(inputs: RealEstateDevelopmentProFormaInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!inputs.projectType) errors.push('Project type is required');
  if (!inputs.totalUnits) errors.push('Total units is required');
  if (!inputs.landAcquisitionCost) errors.push('Land acquisition cost is required');
  if (!inputs.hardCosts) errors.push('Hard costs are required');
  if (!inputs.softCosts) errors.push('Soft costs are required');
  if (!inputs.contingency) errors.push('Contingency percentage is required');
  if (!inputs.carryingCosts) errors.push('Carrying costs are required');
  if (!inputs.developmentTimeline) errors.push('Development timeline is required');
  if (!inputs.salesPricePerUnit) errors.push('Sales price per unit is required');
  if (!inputs.financingAmount) errors.push('Financing amount is required');
  if (!inputs.interestRate) errors.push('Interest rate is required');
  if (!inputs.equityContribution) errors.push('Equity contribution is required');
  if (!inputs.exitStrategy) errors.push('Exit strategy is required');
  if (inputs.marketAppreciation === undefined || inputs.marketAppreciation === null) errors.push('Market appreciation rate is required');
  if (!inputs.taxRate) errors.push('Tax rate is required');

  // Range validations
  if (inputs.totalUnits < 1 || inputs.totalUnits > 10000) errors.push('Total units must be between 1 and 10,000');
  if (inputs.landAcquisitionCost < 0 || inputs.landAcquisitionCost > 1000000000) errors.push('Land acquisition cost must be between $0 and $1 billion');
  if (inputs.hardCosts < 0 || inputs.hardCosts > 1000000000) errors.push('Hard costs must be between $0 and $1 billion');
  if (inputs.softCosts < 0 || inputs.softCosts > 1000000000) errors.push('Soft costs must be between $0 and $1 billion');
  if (inputs.contingency < 0 || inputs.contingency > 50) errors.push('Contingency must be between 0% and 50%');
  if (inputs.carryingCosts < 0 || inputs.carryingCosts > 1000000) errors.push('Carrying costs must be between $0 and $1 million per month');
  if (inputs.developmentTimeline < 1 || inputs.developmentTimeline > 120) errors.push('Development timeline must be between 1 and 120 months');
  if (inputs.salesPricePerUnit < 0 || inputs.salesPricePerUnit > 10000000) errors.push('Sales price per unit must be between $0 and $10 million');
  if (inputs.financingAmount < 0 || inputs.financingAmount > 1000000000) errors.push('Financing amount must be between $0 and $1 billion');
  if (inputs.interestRate < 0 || inputs.interestRate > 50) errors.push('Interest rate must be between 0% and 50%');
  if (inputs.equityContribution < 0 || inputs.equityContribution > 1000000000) errors.push('Equity contribution must be between $0 and $1 billion');
  if (inputs.marketAppreciation < -50 || inputs.marketAppreciation > 50) errors.push('Market appreciation must be between -50% and 50%');
  if (inputs.taxRate < 0 || inputs.taxRate > 50) errors.push('Tax rate must be between 0% and 50%');

  // Optional field validations
  if (inputs.rentalIncomePerUnit !== undefined) {
    if (inputs.rentalIncomePerUnit < 0 || inputs.rentalIncomePerUnit > 100000) errors.push('Rental income per unit must be between $0 and $100,000');
  }
  if (inputs.vacancyRate !== undefined) {
    if (inputs.vacancyRate < 0 || inputs.vacancyRate > 100) errors.push('Vacancy rate must be between 0% and 100%');
  }
  if (inputs.operatingExpenses !== undefined) {
    if (inputs.operatingExpenses < 0 || inputs.operatingExpenses > 100) errors.push('Operating expenses must be between 0% and 100%');
  }
  if (inputs.salesCommission !== undefined) {
    if (inputs.salesCommission < 0 || inputs.salesCommission > 20) errors.push('Sales commission must be between 0% and 20%');
  }

  // Business logic validations
  validateBusinessLogic(inputs, errors);

  return errors;
}

function validateBusinessLogic(inputs: RealEstateDevelopmentProFormaInputs, errors: string[]): void {
  // Total project cost validation
  const baseCosts = inputs.landAcquisitionCost + inputs.hardCosts + inputs.softCosts;
  const contingencyAmount = baseCosts * (inputs.contingency / 100);
  const totalProjectCost = baseCosts + contingencyAmount;

  if (totalProjectCost <= 0) {
    errors.push('Total project cost must be greater than zero');
  }

  // Financing validation
  if (inputs.financingAmount > totalProjectCost) {
    errors.push('Financing amount cannot exceed total project cost');
  }

  if (inputs.equityContribution + inputs.financingAmount < totalProjectCost * 0.8) {
    errors.push('Total funding (equity + financing) should cover at least 80% of project costs');
  }

  // Exit strategy specific validations
  if (inputs.exitStrategy === 'sell_all' || inputs.exitStrategy === 'sell_partial') {
    if (inputs.salesPricePerUnit <= 0) {
      errors.push('Sales price per unit must be greater than zero for sell strategies');
    }
  }

  if (inputs.exitStrategy === 'hold_all' || inputs.exitStrategy === 'sell_partial') {
    if (!inputs.rentalIncomePerUnit || inputs.rentalIncomePerUnit <= 0) {
      errors.push('Rental income per unit is required for hold strategies');
    }
    if (!inputs.vacancyRate) {
      errors.push('Vacancy rate is required for hold strategies');
    }
    if (!inputs.operatingExpenses) {
      errors.push('Operating expenses percentage is required for hold strategies');
    }
  }

  // Project type specific validations
  if (inputs.projectType === 'residential' && inputs.totalUnits > 1000) {
    errors.push('Residential projects typically have fewer than 1,000 units');
  }

  if (inputs.projectType === 'hotel' && inputs.totalUnits > 500) {
    errors.push('Hotel projects typically have fewer than 500 rooms');
  }

  // Timeline validation
  if (inputs.developmentTimeline < 6) {
    errors.push('Development timeline should be at least 6 months for most projects');
  }

  if (inputs.developmentTimeline > 60 && inputs.projectType !== 'land_development') {
    errors.push('Development timeline should typically be less than 5 years for built projects');
  }

  // Cost reasonableness checks
  const costPerUnit = totalProjectCost / inputs.totalUnits;
  if (costPerUnit < 50000 && inputs.projectType !== 'land_development') {
    errors.push('Cost per unit seems unusually low for this project type');
  }

  if (costPerUnit > 2000000 && inputs.projectType === 'residential') {
    errors.push('Cost per unit seems unusually high for residential development');
  }

  // Revenue reasonableness checks
  if (inputs.exitStrategy === 'sell_all' || inputs.exitStrategy === 'sell_partial') {
    const revenuePerUnit = inputs.salesPricePerUnit;
    if (revenuePerUnit < costPerUnit * 0.8) {
      errors.push('Sales price per unit should typically exceed cost per unit');
    }
  }

  // Interest rate reasonableness
  if (inputs.interestRate < 3) {
    errors.push('Interest rate seems unusually low for development financing');
  }

  if (inputs.interestRate > 25) {
    errors.push('Interest rate seems unusually high for development financing');
  }

  // Market appreciation reasonableness
  if (Math.abs(inputs.marketAppreciation) > 20) {
    errors.push('Market appreciation rate seems unusually high or low');
  }

  // Tax rate reasonableness
  if (inputs.taxRate < 10) {
    errors.push('Tax rate seems unusually low for real estate development');
  }

  if (inputs.taxRate > 40) {
    errors.push('Tax rate seems unusually high for real estate development');
  }
}