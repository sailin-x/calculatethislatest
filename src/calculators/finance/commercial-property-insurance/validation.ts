import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyValue', 'buildingValue', 'contentsValue', 'businessIncome',
    'propertyType', 'constructionType', 'yearBuilt', 'squareFootage',
    'location', 'deductible', 'coverageLimits', 'claimsHistory', 'occupancy'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Property value validation
  const propertyValue = inputs.propertyValue as number;
  if (typeof propertyValue !== 'number' || isNaN(propertyValue)) {
    errors.push('Property value must be a valid number');
  } else if (propertyValue < 100000 || propertyValue > 100000000) {
    errors.push('Property value must be between $100,000 and $100,000,000');
  }

  // Building value validation
  const buildingValue = inputs.buildingValue as number;
  if (typeof buildingValue !== 'number' || isNaN(buildingValue)) {
    errors.push('Building value must be a valid number');
  } else if (buildingValue < 50000 || buildingValue > 80000000) {
    errors.push('Building value must be between $50,000 and $80,000,000');
  }

  // Contents value validation
  const contentsValue = inputs.contentsValue as number;
  if (typeof contentsValue !== 'number' || isNaN(contentsValue)) {
    errors.push('Contents value must be a valid number');
  } else if (contentsValue < 0 || contentsValue > 20000000) {
    errors.push('Contents value must be between $0 and $20,000,000');
  }

  // Business income validation
  const businessIncome = inputs.businessIncome as number;
  if (typeof businessIncome !== 'number' || isNaN(businessIncome)) {
    errors.push('Business income must be a valid number');
  } else if (businessIncome < 0 || businessIncome > 100000000) {
    errors.push('Business income must be between $0 and $100,000,000');
  }

  // Property type validation
  const validPropertyTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use'];
  const propertyType = inputs.propertyType as string;
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Construction type validation
  const validConstructionTypes = ['frame', 'joisted-masonry', 'non-combustible', 'masonry-non-combustible', 'modified-fire-resistive', 'fire-resistive'];
  const constructionType = inputs.constructionType as string;
  if (!validConstructionTypes.includes(constructionType)) {
    errors.push('Invalid construction type selected');
  }

  // Year built validation
  const yearBuilt = inputs.yearBuilt as number;
  if (typeof yearBuilt !== 'number' || isNaN(yearBuilt)) {
    errors.push('Year built must be a valid number');
  } else if (yearBuilt < 1900 || yearBuilt > new Date().getFullYear()) {
    errors.push(`Year built must be between 1900 and ${new Date().getFullYear()}`);
  }

  // Square footage validation
  const squareFootage = inputs.squareFootage as number;
  if (typeof squareFootage !== 'number' || isNaN(squareFootage)) {
    errors.push('Square footage must be a valid number');
  } else if (squareFootage < 1000 || squareFootage > 1000000) {
    errors.push('Square footage must be between 1,000 and 1,000,000 sq ft');
  }

  // Location validation
  const validLocations = ['low-risk', 'medium-risk', 'high-risk', 'coastal', 'earthquake', 'flood', 'wildfire'];
  const location = inputs.location as string;
  if (!validLocations.includes(location)) {
    errors.push('Invalid location selected');
  }

  // Deductible validation
  const deductible = inputs.deductible as number;
  if (typeof deductible !== 'number' || isNaN(deductible)) {
    errors.push('Deductible must be a valid number');
  } else if (deductible < 1000 || deductible > 100000) {
    errors.push('Deductible must be between $1,000 and $100,000');
  }

  // Coverage limits validation
  const validCoverageLimits = ['80-percent', '90-percent', '100-percent', 'agreed-value'];
  const coverageLimits = inputs.coverageLimits as string;
  if (!validCoverageLimits.includes(coverageLimits)) {
    errors.push('Invalid coverage limits selected');
  }

  // Claims history validation
  const validClaimsHistory = ['0', '1', '2', '3+'];
  const claimsHistory = inputs.claimsHistory as string;
  if (!validClaimsHistory.includes(claimsHistory)) {
    errors.push('Invalid claims history selected');
  }

  // Occupancy validation
  const validOccupancy = ['owner-occupied', 'tenant-occupied', 'vacant', 'under-construction'];
  const occupancy = inputs.occupancy as string;
  if (!validOccupancy.includes(occupancy)) {
    errors.push('Invalid occupancy selected');
  }

  // Additional coverages validation (optional)
  if ('additionalCoverages' in inputs && inputs.additionalCoverages !== undefined) {
    const additionalCoverages = inputs.additionalCoverages as string[];
    const validAdditionalCoverages = [
      'earthquake', 'flood', 'windstorm', 'terrorism', 'equipment-breakdown',
      'cyber-liability', 'employment-practices', 'directors-officers'
    ];
    
    if (Array.isArray(additionalCoverages)) {
      additionalCoverages.forEach(coverage => {
        if (!validAdditionalCoverages.includes(coverage)) {
          errors.push(`Invalid additional coverage: ${coverage}`);
        }
      });
    } else {
      errors.push('Additional coverages must be an array');
    }
  }

  // Safety features validation (optional)
  if ('safetyFeatures' in inputs && inputs.safetyFeatures !== undefined) {
    const safetyFeatures = inputs.safetyFeatures as string[];
    const validSafetyFeatures = [
      'sprinkler-system', 'fire-alarm', 'security-system', 'backup-generator',
      'storm-shutters', 'elevated-foundation'
    ];
    
    if (Array.isArray(safetyFeatures)) {
      safetyFeatures.forEach(feature => {
        if (!validSafetyFeatures.includes(feature)) {
          errors.push(`Invalid safety feature: ${feature}`);
        }
      });
    } else {
      errors.push('Safety features must be an array');
    }
  }

  // Logical validation
  if (buildingValue > propertyValue) {
    errors.push('Building value cannot exceed total property value');
  }

  if (contentsValue > propertyValue) {
    errors.push('Contents value cannot exceed total property value');
  }

  if (buildingValue + contentsValue > propertyValue * 1.1) {
    errors.push('Sum of building and contents values should not significantly exceed property value');
  }

  if (deductible > propertyValue * 0.1) {
    errors.push('Deductible should not exceed 10% of property value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Quick validation for real-time input checking
export function quickValidateInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Property value must be a valid number';
      }
      if (value < 100000 || value > 100000000) {
        return 'Property value must be between $100,000 and $100,000,000';
      }
      break;

    case 'buildingValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Building value must be a valid number';
      }
      if (value < 50000 || value > 80000000) {
        return 'Building value must be between $50,000 and $80,000,000';
      }
      break;

    case 'contentsValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Contents value must be a valid number';
      }
      if (value < 0 || value > 20000000) {
        return 'Contents value must be between $0 and $20,000,000';
      }
      break;

    case 'businessIncome':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Business income must be a valid number';
      }
      if (value < 0 || value > 100000000) {
        return 'Business income must be between $0 and $100,000,000';
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

    case 'squareFootage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Square footage must be a valid number';
      }
      if (value < 1000 || value > 1000000) {
        return 'Square footage must be between 1,000 and 1,000,000 sq ft';
      }
      break;

    case 'deductible':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Deductible must be a valid number';
      }
      if (value < 1000 || value > 100000) {
        return 'Deductible must be between $1,000 and $100,000';
      }
      break;
  }

  return null;
}
