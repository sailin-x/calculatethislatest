import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Timberland investment validation rules
 */
export const timberlandInvestmentValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('acreage', 'Acreage is required'),
  ValidationRuleFactory.required('timberType', 'Timber type is required'),
  ValidationRuleFactory.required('ageOfTimber', 'Age of timber is required'),
  ValidationRuleFactory.required('timberVolumePerAcre', 'Timber volume per acre is required'),
  ValidationRuleFactory.required('timberPricePerUnit', 'Timber price per unit is required'),
  ValidationRuleFactory.required('analysisPeriod', 'Analysis period is required'),

  // Property validations
  ValidationRuleFactory.range('acreage', 1, 100000, 'Acreage must be between 1 and 100,000 acres'),
  ValidationRuleFactory.range('ageOfTimber', 0, 100, 'Age of timber must be between 0 and 100 years'),
  ValidationRuleFactory.range('timberVolumePerAcre', 0, 10000, 'Timber volume per acre must be between 0 and 10,000 units'),

  // Financial validations
  ValidationRuleFactory.range('landCostPerAcre', 0, 100000, 'Land cost per acre must be between $0 and $100,000'),
  ValidationRuleFactory.range('timberValuePerAcre', 0, 50000, 'Timber value per acre must be between $0 and $50,000'),
  ValidationRuleFactory.range('totalAcquisitionCost', 0, 100000000, 'Total acquisition cost must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('financingAmount', 0, 100000000, 'Financing amount must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('loanTerm', 0, 50, 'Loan term must be between 0 and 50 years'),

  // Operating cost validations
  ValidationRuleFactory.range('annualManagementCost', 0, 1000000, 'Annual management cost must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('annualInsuranceCost', 0, 500000, 'Annual insurance cost must be between $0 and $500,000'),
  ValidationRuleFactory.range('annualPropertyTaxes', 0, 1000000, 'Annual property taxes must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('annualMaintenanceCost', 0, 500000, 'Annual maintenance cost must be between $0 and $500,000'),
  ValidationRuleFactory.range('harvestingCostPerAcre', 0, 1000, 'Harvesting cost per acre must be between $0 and $1,000'),

  // Revenue validations
  ValidationRuleFactory.range('timberPricePerUnit', 0.01, 1000, 'Timber price per unit must be between $0.01 and $1,000'),
  ValidationRuleFactory.range('annualAppreciationRate', -10, 20, 'Annual appreciation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('harvestCycleYears', 1, 50, 'Harvest cycle years must be between 1 and 50 years'),
  ValidationRuleFactory.range('expectedHarvestVolume', 0, 1000000, 'Expected harvest volume must be between 0 and 1,000,000 units'),

  // Analysis parameter validations
  ValidationRuleFactory.range('analysisPeriod', 1, 50, 'Analysis period must be between 1 and 50 years'),
  ValidationRuleFactory.range('discountRate', 0, 20, 'Discount rate must be between 0% and 20%'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('inflationRate', -5, 10, 'Inflation rate must be between -5% and 10%'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'totalAcquisitionCost',
    (totalAcquisitionCost, allInputs) => {
      if (!allInputs?.acreage || !allInputs?.landCostPerAcre || !allInputs?.timberValuePerAcre) return true;
      const calculatedCost = allInputs.acreage * (allInputs.landCostPerAcre + allInputs.timberValuePerAcre);
      const tolerance = calculatedCost * 0.2; // 20% tolerance
      return Math.abs(totalAcquisitionCost - calculatedCost) <= tolerance;
    },
    'Total acquisition cost should approximately equal acreage × (land cost + timber value) per acre'
  ),

  ValidationRuleFactory.businessRule(
    'financingAmount',
    (financingAmount, allInputs) => {
      if (!allInputs?.totalAcquisitionCost) return true;
      return financingAmount <= allInputs.totalAcquisitionCost;
    },
    'Financing amount cannot exceed total acquisition cost'
  ),

  ValidationRuleFactory.businessRule(
    'expectedHarvestVolume',
    (expectedHarvestVolume, allInputs) => {
      if (!allInputs?.acreage || !allInputs?.timberVolumePerAcre) return true;
      const maxPossibleVolume = allInputs.acreage * allInputs.timberVolumePerAcre;
      return expectedHarvestVolume <= maxPossibleVolume;
    },
    'Expected harvest volume cannot exceed total timber volume on property'
  ),

  ValidationRuleFactory.businessRule(
    'harvestCycleYears',
    (harvestCycleYears, allInputs) => {
      if (!allInputs?.ageOfTimber) return true;
      // Harvest cycle should be reasonable relative to timber age
      return harvestCycleYears >= 5 && harvestCycleYears <= allInputs.ageOfTimber + 20;
    },
    'Harvest cycle should be between 5 years and timber age + 20 years'
  ),

  ValidationRuleFactory.businessRule(
    'timberPricePerUnit',
    (timberPricePerUnit, allInputs) => {
      if (!allInputs?.timberType) return true;

      // Price ranges by timber type
      const priceRanges = {
        hardwood: { min: 100, max: 800 },
        softwood: { min: 50, max: 400 },
        mixed: { min: 75, max: 600 }
      };

      const range = priceRanges[allInputs.timberType as keyof typeof priceRanges];
      if (!range) return true;

      return timberPricePerUnit >= range.min && timberPricePerUnit <= range.max;
    },
    'Timber price seems outside typical range for selected timber type'
  ),

  ValidationRuleFactory.businessRule(
    'annualAppreciationRate',
    (annualAppreciationRate, allInputs) => {
      if (!allInputs?.timberType) return true;

      // Appreciation rate ranges by timber type
      const appreciationRanges = {
        hardwood: { min: 2, max: 8 },
        softwood: { min: 1, max: 6 },
        mixed: { min: 1.5, max: 7 }
      };

      const range = appreciationRanges[allInputs.timberType as keyof typeof appreciationRanges];
      if (!range) return true;

      return annualAppreciationRate >= range.min && annualAppreciationRate <= range.max;
    },
    'Appreciation rate seems outside typical range for selected timber type'
  ),

  ValidationRuleFactory.businessRule(
    'discountRate',
    (discountRate, allInputs) => {
      if (!allInputs?.interestRate) return true;
      // Discount rate should typically be higher than risk-free rate but reasonable
      return discountRate >= allInputs.interestRate && discountRate <= allInputs.interestRate + 10;
    },
    'Discount rate should be between interest rate and interest rate + 10%'
  ),

  ValidationRuleFactory.businessRule(
    'analysisPeriod',
    (analysisPeriod, allInputs) => {
      if (!allInputs?.harvestCycleYears) return true;
      // Analysis period should cover at least 2 harvest cycles
      return analysisPeriod >= allInputs.harvestCycleYears * 2;
    },
    'Analysis period should cover at least 2 harvest cycles'
  )
];

/**
 * Get validation rules for timberland investment calculator
 */
export function getTimberlandInvestmentValidationRules(): ValidationRule[] {
  return timberlandInvestmentValidationRules;
}