import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCostSegregationInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'propertyType', 'totalPropertyCost', 'landCost', 'buildingCost', 'siteImprovements',
    'personalProperty', 'landImprovements', 'acquisitionDate', 'studyCost', 'taxYear',
    'marginalTaxRate', 'stateTaxRate', 'propertyAge', 'renovationCost', 'renovationDate',
    'propertyUse', 'ownershipType', 'bonusDepreciation', 'section179', 'priorDepreciation',
    'recoveryPeriod', 'depreciationMethod', 'convention'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Extract values for validation
  const totalPropertyCost = inputs.totalPropertyCost as number;
  const landCost = inputs.landCost as number;
  const buildingCost = inputs.buildingCost as number;
  const siteImprovements = inputs.siteImprovements as number;
  const personalProperty = inputs.personalProperty as number;
  const landImprovements = inputs.landImprovements as number;
  const studyCost = inputs.studyCost as number;
  const taxYear = inputs.taxYear as number;
  const marginalTaxRate = inputs.marginalTaxRate as number;
  const stateTaxRate = inputs.stateTaxRate as number;
  const propertyAge = inputs.propertyAge as number;
  const renovationCost = inputs.renovationCost as number;
  const section179 = inputs.section179 as number;
  const priorDepreciation = inputs.priorDepreciation as number;
  const propertyType = inputs.propertyType as string;
  const propertyUse = inputs.propertyUse as string;
  const ownershipType = inputs.ownershipType as string;
  const bonusDepreciation = inputs.bonusDepreciation as string;
  const recoveryPeriod = inputs.recoveryPeriod as string;
  const depreciationMethod = inputs.depreciationMethod as string;
  const convention = inputs.convention as string;
  const acquisitionDate = inputs.acquisitionDate as string;
  const renovationDate = inputs.renovationDate as string;

  // Validate total property cost
  if (totalPropertyCost < 100000) {
    errors.push('Total property cost must be at least $100,000');
  }
  if (totalPropertyCost > 100000000) {
    errors.push('Total property cost cannot exceed $100,000,000');
  }

  // Validate land cost
  if (landCost < 0) {
    errors.push('Land cost cannot be negative');
  }
  if (landCost > 50000000) {
    errors.push('Land cost cannot exceed $50,000,000');
  }

  // Validate building cost
  if (buildingCost < 50000) {
    errors.push('Building cost must be at least $50,000');
  }
  if (buildingCost > 80000000) {
    errors.push('Building cost cannot exceed $80,000,000');
  }

  // Validate site improvements
  if (siteImprovements < 0) {
    errors.push('Site improvements cannot be negative');
  }
  if (siteImprovements > 20000000) {
    errors.push('Site improvements cannot exceed $20,000,000');
  }

  // Validate personal property
  if (personalProperty < 0) {
    errors.push('Personal property cannot be negative');
  }
  if (personalProperty > 10000000) {
    errors.push('Personal property cannot exceed $10,000,000');
  }

  // Validate land improvements
  if (landImprovements < 0) {
    errors.push('Land improvements cannot be negative');
  }
  if (landImprovements > 15000000) {
    errors.push('Land improvements cannot exceed $15,000,000');
  }

  // Validate study cost
  if (studyCost < 5000) {
    errors.push('Study cost must be at least $5,000');
  }
  if (studyCost > 50000) {
    errors.push('Study cost cannot exceed $50,000');
  }

  // Validate tax year
  if (taxYear < 2015) {
    errors.push('Tax year must be at least 2015');
  }
  if (taxYear > 2030) {
    errors.push('Tax year cannot exceed 2030');
  }

  // Validate marginal tax rate
  if (marginalTaxRate < 10) {
    errors.push('Marginal tax rate must be at least 10%');
  }
  if (marginalTaxRate > 50) {
    errors.push('Marginal tax rate cannot exceed 50%');
  }

  // Validate state tax rate
  if (stateTaxRate < 0) {
    errors.push('State tax rate cannot be negative');
  }
  if (stateTaxRate > 15) {
    errors.push('State tax rate cannot exceed 15%');
  }

  // Validate property age
  if (propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }
  if (propertyAge > 50) {
    errors.push('Property age cannot exceed 50 years');
  }

  // Validate renovation cost
  if (renovationCost < 0) {
    errors.push('Renovation cost cannot be negative');
  }
  if (renovationCost > 20000000) {
    errors.push('Renovation cost cannot exceed $20,000,000');
  }

  // Validate section 179
  if (section179 < 0) {
    errors.push('Section 179 deduction cannot be negative');
  }
  if (section179 > 1000000) {
    errors.push('Section 179 deduction cannot exceed $1,000,000');
  }

  // Validate prior depreciation
  if (priorDepreciation < 0) {
    errors.push('Prior depreciation cannot be negative');
  }
  if (priorDepreciation > 50000000) {
    errors.push('Prior depreciation cannot exceed $50,000,000');
  }

  // Validate property type
  const validPropertyTypes = ['office', 'retail', 'warehouse', 'hotel', 'apartment', 'restaurant', 'medical', 'mixed-use'];
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Please select a valid property type');
  }

  // Validate property use
  const validPropertyUses = ['business', 'rental', 'investment', 'mixed'];
  if (!validPropertyUses.includes(propertyUse)) {
    errors.push('Please select a valid property use');
  }

  // Validate ownership type
  const validOwnershipTypes = ['individual', 'partnership', 'corporation', 'llc', 'trust'];
  if (!validOwnershipTypes.includes(ownershipType)) {
    errors.push('Please select a valid ownership type');
  }

  // Validate bonus depreciation
  const validBonusDepreciation = ['100', '80', '60', '40', '20', '0'];
  if (!validBonusDepreciation.includes(bonusDepreciation)) {
    errors.push('Please select a valid bonus depreciation percentage');
  }

  // Validate recovery period
  const validRecoveryPeriods = ['27.5', '39', '31.5'];
  if (!validRecoveryPeriods.includes(recoveryPeriod)) {
    errors.push('Please select a valid recovery period');
  }

  // Validate depreciation method
  const validDepreciationMethods = ['straight-line', 'declining-balance', 'SumOfYears'];
  if (!validDepreciationMethods.includes(depreciationMethod)) {
    errors.push('Please select a valid depreciation method');
  }

  // Validate convention
  const validConventions = ['mid-month', 'mid-quarter', 'half-year'];
  if (!validConventions.includes(convention)) {
    errors.push('Please select a valid depreciation convention');
  }

  // Validate dates
  const acquisitionDateObj = new Date(acquisitionDate);
  const renovationDateObj = new Date(renovationDate);
  const currentDate = new Date();

  if (isNaN(acquisitionDateObj.getTime())) {
    errors.push('Invalid acquisition date');
  }
  if (isNaN(renovationDateObj.getTime())) {
    errors.push('Invalid renovation date');
  }
  if (renovationDateObj < acquisitionDateObj) {
    errors.push('Renovation date must be after acquisition date');
  }

  // Logical validation
  const calculatedTotalCost = landCost + buildingCost + siteImprovements + personalProperty + landImprovements;
  if (Math.abs(calculatedTotalCost - totalPropertyCost) > 1000) {
    errors.push('Total property cost should equal sum of all cost components');
  }

  if (landCost > totalPropertyCost) {
    errors.push('Land cost cannot exceed total property cost');
  }

  if (buildingCost > totalPropertyCost) {
    errors.push('Building cost cannot exceed total property cost');
  }

  if (priorDepreciation > calculatedTotalCost) {
    errors.push('Prior depreciation cannot exceed total depreciable cost');
  }

  if (section179 > personalProperty) {
    errors.push('Section 179 deduction cannot exceed personal property cost');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateCostSegregationInput(field: string, value: any): string | null {
  switch (field) {
    case 'totalPropertyCost':
      if (value === undefined || value === null || value === '') {
        return 'Total property cost is required';
      }
      const totalPropertyCost = Number(value);
      if (isNaN(totalPropertyCost)) {
        return 'Total property cost must be a valid number';
      }
      if (totalPropertyCost < 100000) {
        return 'Total property cost must be at least $100,000';
      }
      if (totalPropertyCost > 100000000) {
        return 'Total property cost cannot exceed $100,000,000';
      }
      break;

    case 'buildingCost':
      if (value === undefined || value === null || value === '') {
        return 'Building cost is required';
      }
      const buildingCost = Number(value);
      if (isNaN(buildingCost)) {
        return 'Building cost must be a valid number';
      }
      if (buildingCost < 50000) {
        return 'Building cost must be at least $50,000';
      }
      if (buildingCost > 80000000) {
        return 'Building cost cannot exceed $80,000,000';
      }
      break;

    case 'studyCost':
      if (value === undefined || value === null || value === '') {
        return 'Study cost is required';
      }
      const studyCost = Number(value);
      if (isNaN(studyCost)) {
        return 'Study cost must be a valid number';
      }
      if (studyCost < 5000) {
        return 'Study cost must be at least $5,000';
      }
      if (studyCost > 50000) {
        return 'Study cost cannot exceed $50,000';
      }
      break;

    case 'taxYear':
      if (value === undefined || value === null || value === '') {
        return 'Tax year is required';
      }
      const taxYear = Number(value);
      if (isNaN(taxYear)) {
        return 'Tax year must be a valid number';
      }
      if (taxYear < 2015) {
        return 'Tax year must be at least 2015';
      }
      if (taxYear > 2030) {
        return 'Tax year cannot exceed 2030';
      }
      break;

    case 'marginalTaxRate':
      if (value === undefined || value === null || value === '') {
        return 'Marginal tax rate is required';
      }
      const marginalTaxRate = Number(value);
      if (isNaN(marginalTaxRate)) {
        return 'Marginal tax rate must be a valid number';
      }
      if (marginalTaxRate < 10) {
        return 'Marginal tax rate must be at least 10%';
      }
      if (marginalTaxRate > 50) {
        return 'Marginal tax rate cannot exceed 50%';
      }
      break;

    case 'propertyAge':
      if (value === undefined || value === null || value === '') {
        return 'Property age is required';
      }
      const propertyAge = Number(value);
      if (isNaN(propertyAge)) {
        return 'Property age must be a valid number';
      }
      if (propertyAge < 0) {
        return 'Property age cannot be negative';
      }
      if (propertyAge > 50) {
        return 'Property age cannot exceed 50 years';
      }
      break;

    case 'propertyType':
      if (!value) {
        return 'Property type is required';
      }
      const validPropertyTypes = ['office', 'retail', 'warehouse', 'hotel', 'apartment', 'restaurant', 'medical', 'mixed-use'];
      if (!validPropertyTypes.includes(value)) {
        return 'Please select a valid property type';
      }
      break;

    case 'propertyUse':
      if (!value) {
        return 'Property use is required';
      }
      const validPropertyUses = ['business', 'rental', 'investment', 'mixed'];
      if (!validPropertyUses.includes(value)) {
        return 'Please select a valid property use';
      }
      break;

    case 'ownershipType':
      if (!value) {
        return 'Ownership type is required';
      }
      const validOwnershipTypes = ['individual', 'partnership', 'corporation', 'llc', 'trust'];
      if (!validOwnershipTypes.includes(value)) {
        return 'Please select a valid ownership type';
      }
      break;

    case 'bonusDepreciation':
      if (!value) {
        return 'Bonus depreciation is required';
      }
      const validBonusDepreciation = ['100', '80', '60', '40', '20', '0'];
      if (!validBonusDepreciation.includes(value)) {
        return 'Please select a valid bonus depreciation percentage';
      }
      break;

    case 'recoveryPeriod':
      if (!value) {
        return 'Recovery period is required';
      }
      const validRecoveryPeriods = ['27.5', '39', '31.5'];
      if (!validRecoveryPeriods.includes(value)) {
        return 'Please select a valid recovery period';
      }
      break;

    case 'depreciationMethod':
      if (!value) {
        return 'Depreciation method is required';
      }
      const validDepreciationMethods = ['straight-line', 'declining-balance', 'SumOfYears'];
      if (!validDepreciationMethods.includes(value)) {
        return 'Please select a valid depreciation method';
      }
      break;

    case 'convention':
      if (!value) {
        return 'Depreciation convention is required';
      }
      const validConventions = ['mid-month', 'mid-quarter', 'half-year'];
      if (!validConventions.includes(value)) {
        return 'Please select a valid depreciation convention';
      }
      break;
  }

  return null;
}
