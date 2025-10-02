import { CalculatorInputs } from '../../types/calculator';

export function validateLandCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Land cost is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Construction cost is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 10000 || value > 50000000) return { isValid: false, message: 'Must be between $10,000 and $50,000,000' };
  return { isValid: true };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  return { isValid: true };
}

export function validateFurnitureFixturesEquipment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 5000000) return { isValid: false, message: 'Must be $5,000,000 or less' };
  return { isValid: true };
}

export function validateContingency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 5000000) return { isValid: false, message: 'Must be $5,000,000 or less' };
  return { isValid: true };
}

export function validateLtcRatio(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'LTC ratio is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 50 || value > 95) return { isValid: false, message: 'Must be between 50% and 95%' };
  return { isValid: true };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 300 || value > 850)) return { isValid: false, message: 'Must be between 300 and 850' };
  return { isValid: true };
}

export function validateProjectTimeline(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 3 || value > 60)) return { isValid: false, message: 'Must be between 3 and 60 months' };
  return { isValid: true };
}

export function validatePreLeasingPercentage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 100) return { isValid: false, message: 'Must be 100% or less' };
  return { isValid: true };
}

export function validateProjectType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Hospitality', 'Healthcare', 'Educational', 'Retail', 'Office', 'Warehouse'].includes(value)) {
    return { isValid: false, message: 'Invalid project type' };
  }
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Single Family', 'Multi-Family', 'Apartment', 'Condominium', 'Townhouse', 'Office Building', 'Shopping Center', 'Hotel', 'Hospital', 'School', 'Factory', 'Warehouse', 'Mixed-Use Building'].includes(value)) {
    return { isValid: false, message: 'Invalid property type' };
  }
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone'].includes(value)) {
    return { isValid: false, message: 'Invalid location' };
  }
  return { isValid: true };
}

export function validateMarketCondition(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'].includes(value)) {
    return { isValid: false, message: 'Invalid market condition' };
  }
  return { isValid: true };
}

export function validateLenderType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Commercial Bank', 'Credit Union', 'Private Lender', 'Hard Money Lender', 'CMBS Lender', 'Life Insurance Company', 'Government Agency', 'Regional Bank', 'National Bank', 'Investment Fund'].includes(value)) {
    return { isValid: false, message: 'Invalid lender type' };
  }
  return { isValid: true };
}

export function validateBorrowerExperience(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Novice', 'Experienced', 'Expert', 'Institutional'].includes(value)) {
    return { isValid: false, message: 'Invalid borrower experience' };
  }
  return { isValid: true };
}

export function validatePreLeasing(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['None', 'Partial', 'Substantial', 'Fully Leased'].includes(value)) {
    return { isValid: false, message: 'Invalid pre-leasing status' };
  }
  return { isValid: true };
}

export function validateEnvironmentalIssues(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Unknown'].includes(value)) {
    return { isValid: false, message: 'Invalid environmental issues' };
  }
  return { isValid: true };
}

export function validateZoningIssues(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Pending Approval'].includes(value)) {
    return { isValid: false, message: 'Invalid zoning issues' };
  }
  return { isValid: true };
}

export function validateConstructionRisk(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Low', 'Moderate', 'High', 'Very High'].includes(value)) {
    return { isValid: false, message: 'Invalid construction risk' };
  }
  return { isValid: true };
}

export function validateMarketRisk(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Low', 'Moderate', 'High', 'Very High'].includes(value)) {
    return { isValid: false, message: 'Invalid market risk' };
  }
  return { isValid: true };
}

export function validateAllLoanToCostRatioInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const landCostResult = validateLandCost(inputs.landCost);
  if (!landCostResult.isValid) errors.push(landCostResult.message!);

  const constructionCostResult = validateConstructionCost(inputs.constructionCost);
  if (!constructionCostResult.isValid) errors.push(constructionCostResult.message!);

  const softCostsResult = validateSoftCosts(inputs.softCosts);
  if (!softCostsResult.isValid) errors.push(softCostsResult.message!);

  const furnitureFixturesEquipmentResult = validateFurnitureFixturesEquipment(inputs.furnitureFixturesEquipment);
  if (!furnitureFixturesEquipmentResult.isValid) errors.push(furnitureFixturesEquipmentResult.message!);

  const contingencyResult = validateContingency(inputs.contingency);
  if (!contingencyResult.isValid) errors.push(contingencyResult.message!);

  const ltcRatioResult = validateLtcRatio(inputs.ltcRatio);
  if (!ltcRatioResult.isValid) errors.push(ltcRatioResult.message!);

  const borrowerCreditScoreResult = validateBorrowerCreditScore(inputs.borrowerCreditScore);
  if (!borrowerCreditScoreResult.isValid) errors.push(borrowerCreditScoreResult.message!);

  const projectTimelineResult = validateProjectTimeline(inputs.projectTimeline);
  if (!projectTimelineResult.isValid) errors.push(projectTimelineResult.message!);

  const preLeasingPercentageResult = validatePreLeasingPercentage(inputs.preLeasingPercentage);
  if (!preLeasingPercentageResult.isValid) errors.push(preLeasingPercentageResult.message!);

  const projectTypeResult = validateProjectType(inputs.projectType);
  if (!projectTypeResult.isValid) errors.push(projectTypeResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const marketConditionResult = validateMarketCondition(inputs.marketCondition);
  if (!marketConditionResult.isValid) errors.push(marketConditionResult.message!);

  const lenderTypeResult = validateLenderType(inputs.lenderType);
  if (!lenderTypeResult.isValid) errors.push(lenderTypeResult.message!);

  const borrowerExperienceResult = validateBorrowerExperience(inputs.borrowerExperience);
  if (!borrowerExperienceResult.isValid) errors.push(borrowerExperienceResult.message!);

  const preLeasingResult = validatePreLeasing(inputs.preLeasing);
  if (!preLeasingResult.isValid) errors.push(preLeasingResult.message!);

  const environmentalIssuesResult = validateEnvironmentalIssues(inputs.environmentalIssues);
  if (!environmentalIssuesResult.isValid) errors.push(environmentalIssuesResult.message!);

  const zoningIssuesResult = validateZoningIssues(inputs.zoningIssues);
  if (!zoningIssuesResult.isValid) errors.push(zoningIssuesResult.message!);

  const constructionRiskResult = validateConstructionRisk(inputs.constructionRisk);
  if (!constructionRiskResult.isValid) errors.push(constructionRiskResult.message!);

  const marketRiskResult = validateMarketRisk(inputs.marketRisk);
  if (!marketRiskResult.isValid) errors.push(marketRiskResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
