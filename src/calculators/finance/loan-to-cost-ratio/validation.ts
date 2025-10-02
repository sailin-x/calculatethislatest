import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateLoanToCostRatioInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.landCost) {
    errors.push('Land cost is required');
  } else if (typeof inputs.landCost !== 'number' || inputs.landCost <= 0) {
    errors.push('Land cost must be a positive number');
  } else if (inputs.landCost < 10000 || inputs.landCost > 10000000) {
    errors.push('Land cost must be between $10,000 and $10,000,000');
  }

  if (!inputs.constructionCost) {
    errors.push('Construction cost is required');
  } else if (typeof inputs.constructionCost !== 'number' || inputs.constructionCost <= 0) {
    errors.push('Construction cost must be a positive number');
  } else if (inputs.constructionCost < 10000 || inputs.constructionCost > 50000000) {
    errors.push('Construction cost must be between $10,000 and $50,000,000');
  }

  if (!inputs.ltcRatio) {
    errors.push('LTC ratio is required');
  } else if (typeof inputs.ltcRatio !== 'number' || inputs.ltcRatio <= 0) {
    errors.push('LTC ratio must be a positive number');
  } else if (inputs.ltcRatio < 50 || inputs.ltcRatio > 95) {
    errors.push('LTC ratio must be between 50% and 95%');
  }

  // Optional field validation
  if (inputs.softCosts !== undefined) {
    if (typeof inputs.softCosts !== 'number' || inputs.softCosts < 0) {
      errors.push('Soft costs must be a non-negative number');
    } else if (inputs.softCosts > 10000000) {
      errors.push('Soft costs must be $10,000,000 or less');
    }
  }

  if (inputs.furnitureFixturesEquipment !== undefined) {
    if (typeof inputs.furnitureFixturesEquipment !== 'number' || inputs.furnitureFixturesEquipment < 0) {
      errors.push('Furniture, fixtures & equipment must be a non-negative number');
    } else if (inputs.furnitureFixturesEquipment > 5000000) {
      errors.push('Furniture, fixtures & equipment must be $5,000,000 or less');
    }
  }

  if (inputs.contingency !== undefined) {
    if (typeof inputs.contingency !== 'number' || inputs.contingency < 0) {
      errors.push('Contingency must be a non-negative number');
    } else if (inputs.contingency > 5000000) {
      errors.push('Contingency must be $5,000,000 or less');
    }
  }

  if (inputs.borrowerCreditScore !== undefined) {
    if (typeof inputs.borrowerCreditScore !== 'number' || inputs.borrowerCreditScore <= 0) {
      errors.push('Borrower credit score must be a positive number');
    } else if (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
      errors.push('Borrower credit score must be between 300 and 850');
    }
  }

  if (inputs.projectTimeline !== undefined) {
    if (typeof inputs.projectTimeline !== 'number' || inputs.projectTimeline <= 0) {
      errors.push('Project timeline must be a positive number');
    } else if (inputs.projectTimeline < 3 || inputs.projectTimeline > 60) {
      errors.push('Project timeline must be between 3 and 60 months');
    }
  }

  if (inputs.preLeasingPercentage !== undefined) {
    if (typeof inputs.preLeasingPercentage !== 'number' || inputs.preLeasingPercentage < 0) {
      errors.push('Pre-leasing percentage must be a non-negative number');
    } else if (inputs.preLeasingPercentage > 100) {
      errors.push('Pre-leasing percentage must be 100% or less');
    }
  }

  // Enum validation
  const validProjectTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Hospitality', 'Healthcare', 'Educational', 'Retail', 'Office', 'Warehouse'];
  if (inputs.projectType && !validProjectTypes.includes(inputs.projectType)) {
    errors.push(`Project type must be one of: ${validProjectTypes.join(', ')}`);
  }

  const validPropertyTypes = ['Single Family', 'Multi-Family', 'Apartment', 'Condominium', 'Townhouse', 'Office Building', 'Shopping Center', 'Hotel', 'Hospital', 'School', 'Factory', 'Warehouse', 'Mixed-Use Building'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push(`Property type must be one of: ${validPropertyTypes.join(', ')}`);
  }

  const validLocations = ['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push(`Location must be one of: ${validLocations.join(', ')}`);
  }

  const validMarketConditions = ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'];
  if (inputs.marketCondition && !validMarketConditions.includes(inputs.marketCondition)) {
    errors.push(`Market condition must be one of: ${validMarketConditions.join(', ')}`);
  }

  const validLenderTypes = ['Commercial Bank', 'Credit Union', 'Private Lender', 'Hard Money Lender', 'CMBS Lender', 'Life Insurance Company', 'Government Agency', 'Regional Bank', 'National Bank', 'Investment Fund'];
  if (inputs.lenderType && !validLenderTypes.includes(inputs.lenderType)) {
    errors.push(`Lender type must be one of: ${validLenderTypes.join(', ')}`);
  }

  const validBorrowerExperiences = ['Novice', 'Experienced', 'Expert', 'Institutional'];
  if (inputs.borrowerExperience && !validBorrowerExperiences.includes(inputs.borrowerExperience)) {
    errors.push(`Borrower experience must be one of: ${validBorrowerExperiences.join(', ')}`);
  }

  const validPreLeasingStatuses = ['None', 'Partial', 'Substantial', 'Fully Leased'];
  if (inputs.preLeasing && !validPreLeasingStatuses.includes(inputs.preLeasing)) {
    errors.push(`Pre-leasing status must be one of: ${validPreLeasingStatuses.join(', ')}`);
  }

  const validEnvironmentalIssues = ['None', 'Minor', 'Moderate', 'Significant', 'Unknown'];
  if (inputs.environmentalIssues && !validEnvironmentalIssues.includes(inputs.environmentalIssues)) {
    errors.push(`Environmental issues must be one of: ${validEnvironmentalIssues.join(', ')}`);
  }

  const validZoningIssues = ['None', 'Minor', 'Moderate', 'Significant', 'Pending Approval'];
  if (inputs.zoningIssues && !validZoningIssues.includes(inputs.zoningIssues)) {
    errors.push(`Zoning issues must be one of: ${validZoningIssues.join(', ')}`);
  }

  const validConstructionRisks = ['Low', 'Moderate', 'High', 'Very High'];
  if (inputs.constructionRisk && !validConstructionRisks.includes(inputs.constructionRisk)) {
    errors.push(`Construction risk must be one of: ${validConstructionRisks.join(', ')}`);
  }

  const validMarketRisks = ['Low', 'Moderate', 'High', 'Very High'];
  if (inputs.marketRisk && !validMarketRisks.includes(inputs.marketRisk)) {
    errors.push(`Market risk must be one of: ${validMarketRisks.join(', ')}`);
  }

  // Logical consistency validation
  const totalCost = (inputs.landCost || 0) + (inputs.constructionCost || 0) + (inputs.softCosts || 0) + (inputs.furnitureFixturesEquipment || 0) + (inputs.contingency || 0);
  
  if (totalCost > 0) {
    const landCostPercentage = ((inputs.landCost || 0) / totalCost) * 100;
    if (landCostPercentage > 50) {
      errors.push('Land cost should not exceed 50% of total project cost');
    }

    const constructionCostPercentage = ((inputs.constructionCost || 0) / totalCost) * 100;
    if (constructionCostPercentage < 30) {
      errors.push('Construction cost should be at least 30% of total project cost');
    }

    const softCostsPercentage = ((inputs.softCosts || 0) / totalCost) * 100;
    if (softCostsPercentage > 25) {
      errors.push('Soft costs should not exceed 25% of total project cost');
    }

    const contingencyPercentage = ((inputs.contingency || 0) / totalCost) * 100;
    if (contingencyPercentage > 15) {
      errors.push('Contingency should not exceed 15% of total project cost');
    }
  }

  // Pre-leasing consistency validation
  if (inputs.preLeasing && inputs.preLeasingPercentage !== undefined) {
    if (inputs.preLeasing === 'None' && inputs.preLeasingPercentage > 0) {
      errors.push('Pre-leasing percentage should be 0% when status is None');
    } else if (inputs.preLeasing === 'Fully Leased' && inputs.preLeasingPercentage < 100) {
      errors.push('Pre-leasing percentage should be 100% when status is Fully Leased');
    } else if (inputs.preLeasing === 'Substantial' && inputs.preLeasingPercentage < 50) {
      errors.push('Pre-leasing percentage should be at least 50% when status is Substantial');
    } else if (inputs.preLeasing === 'Partial' && inputs.preLeasingPercentage < 10) {
      errors.push('Pre-leasing percentage should be at least 10% when status is Partial');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateLoanToCostRatioInput(field: string, value: any): string | null {
  switch (field) {
    case 'landCost':
      if (!value) return 'Land cost is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 10000000) return 'Must be between $10,000 and $10,000,000';
      break;

    case 'constructionCost':
      if (!value) return 'Construction cost is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 50000000) return 'Must be between $10,000 and $50,000,000';
      break;

    case 'softCosts':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 10000000) return 'Must be $10,000,000 or less';
      break;

    case 'furnitureFixturesEquipment':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'contingency':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 5000000) return 'Must be $5,000,000 or less';
      break;

    case 'ltcRatio':
      if (!value) return 'LTC ratio is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 50 || value > 95) return 'Must be between 50% and 95%';
      break;

    case 'borrowerCreditScore':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 300 || value > 850)) return 'Must be between 300 and 850';
      break;

    case 'projectTimeline':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 3 || value > 60)) return 'Must be between 3 and 60 months';
      break;

    case 'preLeasingPercentage':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 100) return 'Must be 100% or less';
      break;

    case 'projectType':
      if (value && !['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Hospitality', 'Healthcare', 'Educational', 'Retail', 'Office', 'Warehouse'].includes(value)) {
        return 'Invalid project type';
      }
      break;

    case 'propertyType':
      if (value && !['Single Family', 'Multi-Family', 'Apartment', 'Condominium', 'Townhouse', 'Office Building', 'Shopping Center', 'Hotel', 'Hospital', 'School', 'Factory', 'Warehouse', 'Mixed-Use Building'].includes(value)) {
        return 'Invalid property type';
      }
      break;

    case 'location':
      if (value && !['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone'].includes(value)) {
        return 'Invalid location';
      }
      break;

    case 'marketCondition':
      if (value && !['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'].includes(value)) {
        return 'Invalid market condition';
      }
      break;

    case 'lenderType':
      if (value && !['Commercial Bank', 'Credit Union', 'Private Lender', 'Hard Money Lender', 'CMBS Lender', 'Life Insurance Company', 'Government Agency', 'Regional Bank', 'National Bank', 'Investment Fund'].includes(value)) {
        return 'Invalid lender type';
      }
      break;

    case 'borrowerExperience':
      if (value && !['Novice', 'Experienced', 'Expert', 'Institutional'].includes(value)) {
        return 'Invalid borrower experience';
      }
      break;

    case 'preLeasing':
      if (value && !['None', 'Partial', 'Substantial', 'Fully Leased'].includes(value)) {
        return 'Invalid pre-leasing status';
      }
      break;

    case 'environmentalIssues':
      if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Unknown'].includes(value)) {
        return 'Invalid environmental issues';
      }
      break;

    case 'zoningIssues':
      if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Pending Approval'].includes(value)) {
        return 'Invalid zoning issues';
      }
      break;

    case 'constructionRisk':
      if (value && !['Low', 'Moderate', 'High', 'Very High'].includes(value)) {
        return 'Invalid construction risk';
      }
      break;

    case 'marketRisk':
      if (value && !['Low', 'Moderate', 'High', 'Very High'].includes(value)) {
        return 'Invalid market risk';
      }
      break;
  }

  return null;
}
