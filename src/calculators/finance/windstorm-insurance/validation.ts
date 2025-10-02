import { CalculatorInputs } from '../../types/calculator';

export interface WindstormInsuranceValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export function validateWindstormInsuranceInputs(inputs: CalculatorInputs): WindstormInsuranceValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // Property Value validation
  if (!inputs.propertyValue || typeof inputs.propertyValue !== 'number') {
    errors.propertyValue = 'Property value is required and must be a number';
  } else if (inputs.propertyValue < 10000) {
    errors.propertyValue = 'Property value must be at least $10,000';
  } else if (inputs.propertyValue > 10000000) {
    errors.propertyValue = 'Property value cannot exceed $10,000,000';
  }

  // Property Type validation
  if (!inputs.propertyType || typeof inputs.propertyType !== 'string') {
    errors.propertyType = 'Property type is required';
  } else if (!['residential', 'commercial', 'industrial', 'agricultural'].includes(inputs.propertyType)) {
    errors.propertyType = 'Property type must be residential, commercial, industrial, or agricultural';
  }

  // Construction Type validation
  if (!inputs.constructionType || typeof inputs.constructionType !== 'string') {
    errors.constructionType = 'Construction type is required';
  } else if (!['frame', 'masonry', 'steel', 'concrete'].includes(inputs.constructionType)) {
    errors.constructionType = 'Construction type must be frame, masonry, steel, or concrete';
  }

  // Roof Type validation
  if (!inputs.roofType || typeof inputs.roofType !== 'string') {
    errors.roofType = 'Roof type is required';
  } else if (!['asphalt_shingle', 'metal', 'tile', 'flat', 'hip', 'gable'].includes(inputs.roofType)) {
    errors.roofType = 'Roof type must be asphalt_shingle, metal, tile, flat, hip, or gable';
  }

  // Wind Zone validation
  if (!inputs.windZone || typeof inputs.windZone !== 'string') {
    errors.windZone = 'Wind zone is required';
  } else if (!['low', 'medium', 'high', 'extreme'].includes(inputs.windZone)) {
    errors.windZone = 'Wind zone must be low, medium, high, or extreme';
  }

  // Distance from Coast validation
  if (!inputs.distanceFromCoast || typeof inputs.distanceFromCoast !== 'number') {
    errors.distanceFromCoast = 'Distance from coast is required and must be a number';
  } else if (inputs.distanceFromCoast < 0) {
    errors.distanceFromCoast = 'Distance from coast cannot be negative';
  } else if (inputs.distanceFromCoast > 100) {
    errors.distanceFromCoast = 'Distance from coast cannot exceed 100 miles';
  }

  // Building Age validation
  if (!inputs.buildingAge || typeof inputs.buildingAge !== 'number') {
    errors.buildingAge = 'Building age is required and must be a number';
  } else if (inputs.buildingAge < 0) {
    errors.buildingAge = 'Building age cannot be negative';
  } else if (inputs.buildingAge > 100) {
    errors.buildingAge = 'Building age cannot exceed 100 years';
  }

  // Deductible validation
  if (!inputs.deductible || typeof inputs.deductible !== 'number') {
    errors.deductible = 'Deductible is required and must be a number';
  } else if (inputs.deductible < 100) {
    errors.deductible = 'Deductible must be at least $100';
  } else if (inputs.deductible > (inputs.propertyValue as number)) {
    errors.deductible = 'Deductible cannot exceed property value';
  }

  // Coverage Type validation
  if (!inputs.coverageType || typeof inputs.coverageType !== 'string') {
    errors.coverageType = 'Coverage type is required';
  } else if (!['basic', 'standard', 'comprehensive', 'premium'].includes(inputs.coverageType)) {
    errors.coverageType = 'Coverage type must be basic, standard, comprehensive, or premium';
  }

  // Additional Coverages validation
  if (!inputs.additionalCoverages || !Array.isArray(inputs.additionalCoverages)) {
    errors.additionalCoverages = 'Additional coverages must be an array';
  } else {
    const validCoverages = ['contents', 'loss_of_use', 'debris_removal', 'code_upgrades', 'ordinance_law'];
    for (const coverage of inputs.additionalCoverages) {
      if (!validCoverages.includes(coverage)) {
        errors.additionalCoverages = `Invalid coverage type: ${coverage}`;
        break;
      }
    }
  }

  // Mitigation Features validation
  if (!inputs.mitigationFeatures || !Array.isArray(inputs.mitigationFeatures)) {
    errors.mitigationFeatures = 'Mitigation features must be an array';
  } else {
    const validFeatures = ['impact_windows', 'storm_shutters', 'reinforced_roof', 'wind_mitigation', 'elevated_foundation'];
    for (const feature of inputs.mitigationFeatures) {
      if (!validFeatures.includes(feature)) {
        errors.mitigationFeatures = `Invalid mitigation feature: ${feature}`;
        break;
      }
    }
  }

  // Claims History validation
  if (!inputs.claimsHistory || typeof inputs.claimsHistory !== 'string') {
    errors.claimsHistory = 'Claims history is required';
  } else if (!['none', 'one', 'two', 'three_plus'].includes(inputs.claimsHistory)) {
    errors.claimsHistory = 'Claims history must be none, one, two, or three_plus';
  }

  // Policy Term validation
  if (!inputs.policyTerm || typeof inputs.policyTerm !== 'number') {
    errors.policyTerm = 'Policy term is required and must be a number';
  } else if (inputs.policyTerm < 1) {
    errors.policyTerm = 'Policy term must be at least 1 month';
  } else if (inputs.policyTerm > 12) {
    errors.policyTerm = 'Policy term cannot exceed 12 months';
  }

  // Insurance Company validation
  if (!inputs.insuranceCompany || typeof inputs.insuranceCompany !== 'string') {
    errors.insuranceCompany = 'Insurance company is required';
  } else if (inputs.insuranceCompany.trim().length < 2) {
    errors.insuranceCompany = 'Insurance company name must be at least 2 characters';
  }

  // Agent Commission validation
  if (!inputs.agentCommission || typeof inputs.agentCommission !== 'number') {
    errors.agentCommission = 'Agent commission is required and must be a number';
  } else if (inputs.agentCommission < 0) {
    errors.agentCommission = 'Agent commission cannot be negative';
  } else if (inputs.agentCommission > 20) {
    errors.agentCommission = 'Agent commission cannot exceed 20%';
  }

  // Cross-field validations
  if (inputs.propertyValue && inputs.deductible) {
    const deductiblePercentage = (inputs.deductible as number) / (inputs.propertyValue as number);
    if (deductiblePercentage > 0.15) {
      warnings.deductible = 'Deductible is very high relative to property value';
    }
  }

  if (inputs.windZone === 'extreme' && inputs.distanceFromCoast && (inputs.distanceFromCoast as number) > 5) {
    warnings.windZone = 'Extreme wind zone may not apply to properties far from coast';
  }

  if (inputs.buildingAge && (inputs.buildingAge as number) > 50) {
    warnings.buildingAge = 'Older buildings may have higher insurance costs';
  }

  if (inputs.claimsHistory === 'three_plus') {
    warnings.claimsHistory = 'Multiple claims may result in higher premiums';
  }

  // Business logic warnings
  if (inputs.propertyType === 'industrial' && inputs.windZone === 'extreme') {
    warnings.propertyType = 'Industrial properties in extreme wind zones may have limited coverage options';
  }

  if (inputs.constructionType === 'frame' && inputs.windZone === 'high') {
    warnings.constructionType = 'Frame construction in high wind zones may result in higher premiums';
  }

  if (inputs.mitigationFeatures && (inputs.mitigationFeatures as string[]).length === 0) {
    warnings.mitigationFeatures = 'No mitigation features may result in higher premiums';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
