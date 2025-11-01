import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateValuationInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyType', 'squareFootage', 'landArea', 'yearBuilt', 'constructionQuality',
    'location', 'marketCondition', 'annualRent', 'operatingExpenses', 'vacancyRate',
    'capRate', 'comparableSales', 'landValue', 'replacementCost', 'depreciation',
    'zoning', 'accessibility', 'condition', 'tenantQuality', 'leaseTerms'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Square footage validation
  const squareFootage = inputs.squareFootage as number;
  if (typeof squareFootage !== 'number' || isNaN(squareFootage)) {
    errors.push('Square footage must be a valid number');
  } else if (squareFootage < 1000 || squareFootage > 1000000) {
    errors.push('Square footage must be between 1,000 and 1,000,000 sq ft');
  }

  // Land area validation
  const landArea = inputs.landArea as number;
  if (typeof landArea !== 'number' || isNaN(landArea)) {
    errors.push('Land area must be a valid number');
  } else if (landArea < 0.1 || landArea > 1000) {
    errors.push('Land area must be between 0.1 and 1,000 acres');
  }

  // Year built validation
  const yearBuilt = inputs.yearBuilt as number;
  if (typeof yearBuilt !== 'number' || isNaN(yearBuilt)) {
    errors.push('Year built must be a valid number');
  } else if (yearBuilt < 1900 || yearBuilt > new Date().getFullYear()) {
    errors.push(`Year built must be between 1900 and ${new Date().getFullYear()}`);
  }

  // Annual rent validation
  const annualRent = inputs.annualRent as number;
  if (typeof annualRent !== 'number' || isNaN(annualRent)) {
    errors.push('Annual rent must be a valid number');
  } else if (annualRent < 0 || annualRent > 10000000) {
    errors.push('Annual rent must be between $0 and $10,000,000');
  }

  // Operating expenses validation
  const operatingExpenses = inputs.operatingExpenses as number;
  if (typeof operatingExpenses !== 'number' || isNaN(operatingExpenses)) {
    errors.push('Operating expenses must be a valid number');
  } else if (operatingExpenses < 0 || operatingExpenses > 5000000) {
    errors.push('Operating expenses must be between $0 and $5,000,000');
  }

  // Vacancy rate validation
  const vacancyRate = inputs.vacancyRate as number;
  if (typeof vacancyRate !== 'number' || isNaN(vacancyRate)) {
    errors.push('Vacancy rate must be a valid number');
  } else if (vacancyRate < 0 || vacancyRate > 50) {
    errors.push('Vacancy rate must be between 0% and 50%');
  }

  // Cap rate validation
  const capRate = inputs.capRate as number;
  if (typeof capRate !== 'number' || isNaN(capRate)) {
    errors.push('Cap rate must be a valid number');
  } else if (capRate < 2 || capRate > 15) {
    errors.push('Cap rate must be between 2% and 15%');
  }

  // Comparable sales validation
  const comparableSales = inputs.comparableSales as number;
  if (typeof comparableSales !== 'number' || isNaN(comparableSales)) {
    errors.push('Comparable sales must be a valid number');
  } else if (comparableSales < 10 || comparableSales > 1000) {
    errors.push('Comparable sales must be between $10 and $1,000 per sq ft');
  }

  // Land value validation
  const landValue = inputs.landValue as number;
  if (typeof landValue !== 'number' || isNaN(landValue)) {
    errors.push('Land value must be a valid number');
  } else if (landValue < 1000 || landValue > 1000000) {
    errors.push('Land value must be between $1,000 and $1,000,000 per acre');
  }

  // Replacement cost validation
  const replacementCost = inputs.replacementCost as number;
  if (typeof replacementCost !== 'number' || isNaN(replacementCost)) {
    errors.push('Replacement cost must be a valid number');
  } else if (replacementCost < 20 || replacementCost > 500) {
    errors.push('Replacement cost must be between $20 and $500 per sq ft');
  }

  // Depreciation validation
  const depreciation = inputs.depreciation as number;
  if (typeof depreciation !== 'number' || isNaN(depreciation)) {
    errors.push('Depreciation must be a valid number');
  } else if (depreciation < 0 || depreciation > 90) {
    errors.push('Depreciation must be between 0% and 90%');
  }

  // Property type validation
  const validPropertyTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use', 'apartment', 'self-storage'];
  const propertyType = inputs.propertyType as string;
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Construction quality validation
  const validConstructionQualities = ['economy', 'standard', 'custom', 'luxury'];
  const constructionQuality = inputs.constructionQuality as string;
  if (!validConstructionQualities.includes(constructionQuality)) {
    errors.push('Invalid construction quality selected');
  }

  // Location validation
  const validLocations = ['rural', 'suburban', 'urban', 'cbd', 'airport', 'highway'];
  const location = inputs.location as string;
  if (!validLocations.includes(location)) {
    errors.push('Invalid location selected');
  }

  // Market condition validation
  const validMarketConditions = ['declining', 'stable', 'growing', 'hot'];
  const marketCondition = inputs.marketCondition as string;
  if (!validMarketConditions.includes(marketCondition)) {
    errors.push('Invalid market condition selected');
  }

  // Zoning validation
  const validZoning = ['residential', 'commercial', 'industrial', 'mixed', 'agricultural'];
  const zoning = inputs.zoning as string;
  if (!validZoning.includes(zoning)) {
    errors.push('Invalid zoning selected');
  }

  // Accessibility validation
  const validAccessibility = ['poor', 'fair', 'good', 'excellent'];
  const accessibility = inputs.accessibility as string;
  if (!validAccessibility.includes(accessibility)) {
    errors.push('Invalid accessibility selected');
  }

  // Condition validation
  const validConditions = ['poor', 'fair', 'good', 'excellent'];
  const condition = inputs.condition as string;
  if (!validConditions.includes(condition)) {
    errors.push('Invalid condition selected');
  }

  // Tenant quality validation
  const validTenantQualities = ['poor', 'fair', 'good', 'excellent'];
  const tenantQuality = inputs.tenantQuality as string;
  if (!validTenantQualities.includes(tenantQuality)) {
    errors.push('Invalid tenant quality selected');
  }

  // Lease terms validation
  const validLeaseTerms = ['MonthToMonth', 'short-term', 'medium-term', 'long-term'];
  const leaseTerms = inputs.leaseTerms as string;
  if (!validLeaseTerms.includes(leaseTerms)) {
    errors.push('Invalid lease terms selected');
  }

  // Logical validation
  if (operatingExpenses > annualRent) {
    errors.push('Operating expenses cannot exceed annual rent');
  }

  if (vacancyRate > 100) {
    errors.push('Vacancy rate cannot exceed 100%');
  }

  if (depreciation > 100) {
    errors.push('Depreciation cannot exceed 100%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Quick validation for real-time input checking
export function quickValidateValuationInput(field: string, value: any): string | null {
  switch (field) {
    case 'squareFootage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Square footage must be a valid number';
      }
      if (value < 1000 || value > 1000000) {
        return 'Square footage must be between 1,000 and 1,000,000 sq ft';
      }
      break;

    case 'landArea':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Land area must be a valid number';
      }
      if (value < 0.1 || value > 1000) {
        return 'Land area must be between 0.1 and 1,000 acres';
      }
      break;

    case 'yearBuilt':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Year built must be a valid number';
      }
      if (value < 1900 || value > new Date().getFullYear()) {
        return `Year built must be between 1900 and ${new Date().getFullYear()}`;
      }
      break;

    case 'annualRent':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Annual rent must be a valid number';
      }
      if (value < 0 || value > 10000000) {
        return 'Annual rent must be between $0 and $10,000,000';
      }
      break;

    case 'operatingExpenses':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Operating expenses must be a valid number';
      }
      if (value < 0 || value > 5000000) {
        return 'Operating expenses must be between $0 and $5,000,000';
      }
      break;

    case 'vacancyRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Vacancy rate must be a valid number';
      }
      if (value < 0 || value > 50) {
        return 'Vacancy rate must be between 0% and 50%';
      }
      break;

    case 'capRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Cap rate must be a valid number';
      }
      if (value < 2 || value > 15) {
        return 'Cap rate must be between 2% and 15%';
      }
      break;

    case 'comparableSales':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Comparable sales must be a valid number';
      }
      if (value < 10 || value > 1000) {
        return 'Comparable sales must be between $10 and $1,000 per sq ft';
      }
      break;

    case 'landValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Land value must be a valid number';
      }
      if (value < 1000 || value > 1000000) {
        return 'Land value must be between $1,000 and $1,000,000 per acre';
      }
      break;

    case 'replacementCost':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Replacement cost must be a valid number';
      }
      if (value < 20 || value > 500) {
        return 'Replacement cost must be between $20 and $500 per sq ft';
      }
      break;

    case 'depreciation':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Depreciation must be a valid number';
      }
      if (value < 0 || value > 90) {
        return 'Depreciation must be between 0% and 90%';
      }
      break;
  }

  return null;
}
