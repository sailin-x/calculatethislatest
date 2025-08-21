import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validatePropertyValue(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Property value is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Property value must be a valid number' };
  }
  if (value < 10000) {
    return { isValid: false, error: 'Property value must be at least $10,000' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Property value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validatePropertyType(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Property type is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Property type must be a string' };
  }
  if (!['residential', 'commercial', 'industrial', 'agricultural'].includes(value)) {
    return { isValid: false, error: 'Property type must be residential, commercial, industrial, or agricultural' };
  }
  return { isValid: true };
}

export function validateConstructionType(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Construction type is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Construction type must be a string' };
  }
  if (!['frame', 'masonry', 'steel', 'concrete'].includes(value)) {
    return { isValid: false, error: 'Construction type must be frame, masonry, steel, or concrete' };
  }
  return { isValid: true };
}

export function validateRoofType(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Roof type is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Roof type must be a string' };
  }
  if (!['asphalt_shingle', 'metal', 'tile', 'flat', 'hip', 'gable'].includes(value)) {
    return { isValid: false, error: 'Roof type must be asphalt_shingle, metal, tile, flat, hip, or gable' };
  }
  return { isValid: true };
}

export function validateWindZone(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Wind zone is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Wind zone must be a string' };
  }
  if (!['low', 'medium', 'high', 'extreme'].includes(value)) {
    return { isValid: false, error: 'Wind zone must be low, medium, high, or extreme' };
  }
  return { isValid: true };
}

export function validateDistanceFromCoast(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Distance from coast is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Distance from coast must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Distance from coast cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Distance from coast cannot exceed 100 miles' };
  }
  return { isValid: true };
}

export function validateBuildingAge(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Building age is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Building age must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Building age cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Building age cannot exceed 100 years' };
  }
  if (value > 50) {
    return { isValid: true, warning: 'Older buildings may have higher insurance costs' };
  }
  return { isValid: true };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Deductible is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Deductible must be a valid number' };
  }
  if (value < 100) {
    return { isValid: false, error: 'Deductible must be at least $100' };
  }
  
  if (allInputs?.propertyValue) {
    const deductiblePercentage = value / allInputs.propertyValue;
    if (deductiblePercentage > 1) {
      return { isValid: false, error: 'Deductible cannot exceed property value' };
    }
    if (deductiblePercentage > 0.15) {
      return { isValid: true, warning: 'Deductible is very high relative to property value' };
    }
  }
  
  return { isValid: true };
}

export function validateCoverageType(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Coverage type is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Coverage type must be a string' };
  }
  if (!['basic', 'standard', 'comprehensive', 'premium'].includes(value)) {
    return { isValid: false, error: 'Coverage type must be basic, standard, comprehensive, or premium' };
  }
  return { isValid: true };
}

export function validateAdditionalCoverages(value: any): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, error: 'Additional coverages must be specified' };
  }
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Additional coverages must be an array' };
  }
  
  const validCoverages = ['contents', 'loss_of_use', 'debris_removal', 'code_upgrades', 'ordinance_law'];
  for (const coverage of value) {
    if (!validCoverages.includes(coverage)) {
      return { isValid: false, error: `Invalid coverage type: ${coverage}` };
    }
  }
  
  return { isValid: true };
}

export function validateMitigationFeatures(value: any): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, error: 'Mitigation features must be specified' };
  }
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Mitigation features must be an array' };
  }
  
  const validFeatures = ['impact_windows', 'storm_shutters', 'reinforced_roof', 'wind_mitigation', 'elevated_foundation'];
  for (const feature of value) {
    if (!validFeatures.includes(feature)) {
      return { isValid: false, error: `Invalid mitigation feature: ${feature}` };
    }
  }
  
  if (value.length === 0) {
    return { isValid: true, warning: 'No mitigation features may result in higher premiums' };
  }
  
  return { isValid: true };
}

export function validateClaimsHistory(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Claims history is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Claims history must be a string' };
  }
  if (!['none', 'one', 'two', 'three_plus'].includes(value)) {
    return { isValid: false, error: 'Claims history must be none, one, two, or three_plus' };
  }
  if (value === 'three_plus') {
    return { isValid: true, warning: 'Multiple claims may result in higher premiums' };
  }
  return { isValid: true };
}

export function validatePolicyTerm(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Policy term is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Policy term must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, error: 'Policy term must be at least 1 month' };
  }
  if (value > 12) {
    return { isValid: false, error: 'Policy term cannot exceed 12 months' };
  }
  return { isValid: true };
}

export function validateInsuranceCompany(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Insurance company is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Insurance company must be a string' };
  }
  if (value.trim().length < 2) {
    return { isValid: false, error: 'Insurance company name must be at least 2 characters' };
  }
  return { isValid: true };
}

export function validateAgentCommission(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Agent commission is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Agent commission must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Agent commission cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Agent commission cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateAllWindstormInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    { field: 'propertyValue', validator: validatePropertyValue },
    { field: 'propertyType', validator: validatePropertyType },
    { field: 'constructionType', validator: validateConstructionType },
    { field: 'roofType', validator: validateRoofType },
    { field: 'windZone', validator: validateWindZone },
    { field: 'distanceFromCoast', validator: validateDistanceFromCoast },
    { field: 'buildingAge', validator: validateBuildingAge },
    { field: 'deductible', validator: validateDeductible },
    { field: 'coverageType', validator: validateCoverageType },
    { field: 'additionalCoverages', validator: validateAdditionalCoverages },
    { field: 'mitigationFeatures', validator: validateMitigationFeatures },
    { field: 'claimsHistory', validator: validateClaimsHistory },
    { field: 'policyTerm', validator: validatePolicyTerm },
    { field: 'insuranceCompany', validator: validateInsuranceCompany },
    { field: 'agentCommission', validator: validateAgentCommission }
  ];

  for (const validation of validations) {
    const result = validation.validator(inputs[validation.field], inputs);
    if (!result.isValid) {
      return result;
    }
  }

  // Cross-field validations
  if (inputs.windZone === 'extreme' && inputs.distanceFromCoast && (inputs.distanceFromCoast as number) > 5) {
    return { isValid: true, warning: 'Extreme wind zone may not apply to properties far from coast' };
  }

  if (inputs.propertyType === 'industrial' && inputs.windZone === 'extreme') {
    return { isValid: true, warning: 'Industrial properties in extreme wind zones may have limited coverage options' };
  }

  if (inputs.constructionType === 'frame' && inputs.windZone === 'high') {
    return { isValid: true, warning: 'Frame construction in high wind zones may result in higher premiums' };
  }

  return { isValid: true };
}
