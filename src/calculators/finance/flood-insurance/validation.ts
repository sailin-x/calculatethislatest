import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFloodInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  }
  if (!inputs.buildingValue) {
    errors.push('Building value is required');
  }
  if (!inputs.contentsValue) {
    errors.push('Contents value is required');
  }
  if (!inputs.floodZone) {
    errors.push('Flood zone is required');
  }
  if (!inputs.deductible) {
    errors.push('Deductible is required');
  }
  if (!inputs.policyType) {
    errors.push('Policy type is required');
  }
  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }
  if (!inputs.occupancyType) {
    errors.push('Occupancy type is required');
  }

  // Data type validation
  if (inputs.propertyValue && typeof inputs.propertyValue !== 'number') {
    errors.push('Property value must be a number');
  }
  if (inputs.buildingValue && typeof inputs.buildingValue !== 'number') {
    errors.push('Building value must be a number');
  }
  if (inputs.contentsValue && typeof inputs.contentsValue !== 'number') {
    errors.push('Contents value must be a number');
  }
  if (inputs.deductible && typeof inputs.deductible !== 'number') {
    errors.push('Deductible must be a number');
  }
  if (inputs.buildingElevation && typeof inputs.buildingElevation !== 'number') {
    errors.push('Building elevation must be a number');
  }
  if (inputs.baseFloodElevation && typeof inputs.baseFloodElevation !== 'number') {
    errors.push('Base flood elevation must be a number');
  }
  if (inputs.contentsDeductible && typeof inputs.contentsDeductible !== 'number') {
    errors.push('Contents deductible must be a number');
  }
  if (inputs.additionalLivingExpenses && typeof inputs.additionalLivingExpenses !== 'number') {
    errors.push('Additional living expenses must be a number');
  }
  if (inputs.businessInterruption && typeof inputs.businessInterruption !== 'number') {
    errors.push('Business interruption must be a number');
  }
  if (inputs.ordinanceLaw && typeof inputs.ordinanceLaw !== 'number') {
    errors.push('Ordinance and law coverage must be a number');
  }
  if (inputs.umbrellaLiability && typeof inputs.umbrellaLiability !== 'number') {
    errors.push('Umbrella liability must be a number');
  }
  if (inputs.riskScore && typeof inputs.riskScore !== 'number') {
    errors.push('Risk score must be a number');
  }
  if (inputs.affordabilityScore && typeof inputs.affordabilityScore !== 'number') {
    errors.push('Affordability score must be a number');
  }

  // Range validation
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $10,000 and $10,000,000');
  }
  if (inputs.buildingValue && (inputs.buildingValue < 5000 || inputs.buildingValue > 10000000)) {
    errors.push('Building value must be between $5,000 and $10,000,000');
  }
  if (inputs.contentsValue && (inputs.contentsValue < 1000 || inputs.contentsValue > 5000000)) {
    errors.push('Contents value must be between $1,000 and $5,000,000');
  }
  if (inputs.deductible && (inputs.deductible < 1000 || inputs.deductible > 100000)) {
    errors.push('Deductible must be between $1,000 and $100,000');
  }
  if (inputs.buildingElevation && (inputs.buildingElevation < -50 || inputs.buildingElevation > 100)) {
    errors.push('Building elevation must be between -50 and 100 feet');
  }
  if (inputs.baseFloodElevation && (inputs.baseFloodElevation < -50 || inputs.baseFloodElevation > 100)) {
    errors.push('Base flood elevation must be between -50 and 100 feet');
  }
  if (inputs.contentsDeductible && (inputs.contentsDeductible < 500 || inputs.contentsDeductible > 50000)) {
    errors.push('Contents deductible must be between $500 and $50,000');
  }
  if (inputs.additionalLivingExpenses && (inputs.additionalLivingExpenses < 0 || inputs.additionalLivingExpenses > 100000)) {
    errors.push('Additional living expenses must be between $0 and $100,000');
  }
  if (inputs.businessInterruption && (inputs.businessInterruption < 0 || inputs.businessInterruption > 500000)) {
    errors.push('Business interruption must be between $0 and $500,000');
  }
  if (inputs.ordinanceLaw && (inputs.ordinanceLaw < 0 || inputs.ordinanceLaw > 100000)) {
    errors.push('Ordinance and law coverage must be between $0 and $100,000');
  }
  if (inputs.umbrellaLiability && (inputs.umbrellaLiability < 0 || inputs.umbrellaLiability > 10000000)) {
    errors.push('Umbrella liability must be between $0 and $10,000,000');
  }
  if (inputs.riskScore && (inputs.riskScore < 1 || inputs.riskScore > 10)) {
    errors.push('Risk score must be between 1 and 10');
  }
  if (inputs.affordabilityScore && (inputs.affordabilityScore < 1 || inputs.affordabilityScore > 10)) {
    errors.push('Affordability score must be between 1 and 10');
  }

  // Logical validation
  if (inputs.buildingValue && inputs.propertyValue && inputs.buildingValue > inputs.propertyValue) {
    errors.push('Building value cannot exceed property value');
  }
  if (inputs.contentsValue && inputs.propertyValue && inputs.contentsValue > inputs.propertyValue) {
    errors.push('Contents value cannot exceed property value');
  }
  if (inputs.deductible && inputs.buildingValue && inputs.deductible > inputs.buildingValue) {
    errors.push('Deductible cannot exceed building value');
  }
  if (inputs.contentsDeductible && inputs.contentsValue && inputs.contentsDeductible > inputs.contentsValue) {
    errors.push('Contents deductible cannot exceed contents value');
  }
  if (inputs.buildingElevation && inputs.baseFloodElevation) {
    const elevationDiff = inputs.buildingElevation - inputs.baseFloodElevation;
    if (elevationDiff < -20) {
      errors.push('Building elevation is significantly below base flood elevation');
    }
  }

  // Enum validation
  const validFloodZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'X', 'D'];
  if (inputs.floodZone && !validFloodZones.includes(inputs.floodZone)) {
    errors.push('Invalid flood zone. Must be one of: A, AE, AH, AO, AR, A99, V, VE, X, D');
  }

  const validPolicyTypes = ['nfip', 'private', 'excess'];
  if (inputs.policyType && !validPolicyTypes.includes(inputs.policyType)) {
    errors.push('Invalid policy type. Must be one of: nfip, private, excess');
  }

  const validPropertyTypes = ['single-family', 'multi-family', 'condo', 'commercial', 'manufactured'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type. Must be one of: single-family, multi-family, condo, commercial, manufactured');
  }

  const validOccupancyTypes = ['primary', 'secondary', 'rental', 'business'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type. Must be one of: primary, secondary, rental, business');
  }

  const validElevationCertStatuses = ['yes', 'no', 'pending'];
  if (inputs.elevationCertStatus && !validElevationCertStatuses.includes(inputs.elevationCertStatus)) {
    errors.push('Invalid elevation certificate status. Must be one of: yes, no, pending');
  }

  const validMitigationMeasures = ['elevation', 'floodwalls', 'dry-floodproofing', 'wet-floodproofing', 'none'];
  if (inputs.mitigationMeasures && !validMitigationMeasures.includes(inputs.mitigationMeasures)) {
    errors.push('Invalid mitigation measures. Must be one of: elevation, floodwalls, dry-floodproofing, wet-floodproofing, none');
  }

  const validCommunityRatings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'none'];
  if (inputs.communityRating && !validCommunityRatings.includes(inputs.communityRating)) {
    errors.push('Invalid community rating. Must be one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, none');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateFloodInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number') return 'Property value must be a number';
      if (value < 10000 || value > 10000000) return 'Property value must be between $10,000 and $10,000,000';
      return null;

    case 'buildingValue':
      if (!value) return 'Building value is required';
      if (typeof value !== 'number') return 'Building value must be a number';
      if (value < 5000 || value > 10000000) return 'Building value must be between $5,000 and $10,000,000';
      return null;

    case 'contentsValue':
      if (!value) return 'Contents value is required';
      if (typeof value !== 'number') return 'Contents value must be a number';
      if (value < 1000 || value > 5000000) return 'Contents value must be between $1,000 and $5,000,000';
      return null;

    case 'floodZone':
      if (!value) return 'Flood zone is required';
      const validZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'X', 'D'];
      if (!validZones.includes(value)) return 'Invalid flood zone';
      return null;

    case 'deductible':
      if (!value) return 'Deductible is required';
      if (typeof value !== 'number') return 'Deductible must be a number';
      if (value < 1000 || value > 100000) return 'Deductible must be between $1,000 and $100,000';
      return null;

    case 'policyType':
      if (!value) return 'Policy type is required';
      const validTypes = ['nfip', 'private', 'excess'];
      if (!validTypes.includes(value)) return 'Invalid policy type';
      return null;

    case 'propertyType':
      if (!value) return 'Property type is required';
      const validPropertyTypes = ['single-family', 'multi-family', 'condo', 'commercial', 'manufactured'];
      if (!validPropertyTypes.includes(value)) return 'Invalid property type';
      return null;

    case 'occupancyType':
      if (!value) return 'Occupancy type is required';
      const validOccupancyTypes = ['primary', 'secondary', 'rental', 'business'];
      if (!validOccupancyTypes.includes(value)) return 'Invalid occupancy type';
      return null;

    case 'buildingElevation':
      if (value && typeof value !== 'number') return 'Building elevation must be a number';
      if (value && (value < -50 || value > 100)) return 'Building elevation must be between -50 and 100 feet';
      return null;

    case 'baseFloodElevation':
      if (value && typeof value !== 'number') return 'Base flood elevation must be a number';
      if (value && (value < -50 || value > 100)) return 'Base flood elevation must be between -50 and 100 feet';
      return null;

    case 'contentsDeductible':
      if (value && typeof value !== 'number') return 'Contents deductible must be a number';
      if (value && (value < 500 || value > 50000)) return 'Contents deductible must be between $500 and $50,000';
      return null;

    case 'additionalLivingExpenses':
      if (value && typeof value !== 'number') return 'Additional living expenses must be a number';
      if (value && (value < 0 || value > 100000)) return 'Additional living expenses must be between $0 and $100,000';
      return null;

    case 'businessInterruption':
      if (value && typeof value !== 'number') return 'Business interruption must be a number';
      if (value && (value < 0 || value > 500000)) return 'Business interruption must be between $0 and $500,000';
      return null;

    case 'ordinanceLaw':
      if (value && typeof value !== 'number') return 'Ordinance and law coverage must be a number';
      if (value && (value < 0 || value > 100000)) return 'Ordinance and law coverage must be between $0 and $100,000';
      return null;

    case 'umbrellaLiability':
      if (value && typeof value !== 'number') return 'Umbrella liability must be a number';
      if (value && (value < 0 || value > 10000000)) return 'Umbrella liability must be between $0 and $10,000,000';
      return null;

    case 'elevationCertStatus':
      if (value) {
        const validStatuses = ['yes', 'no', 'pending'];
        if (!validStatuses.includes(value)) return 'Invalid elevation certificate status';
      }
      return null;

    case 'mitigationMeasures':
      if (value) {
        const validMeasures = ['elevation', 'floodwalls', 'dry-floodproofing', 'wet-floodproofing', 'none'];
        if (!validMeasures.includes(value)) return 'Invalid mitigation measures';
      }
      return null;

    case 'communityRating':
      if (value) {
        const validRatings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'none'];
        if (!validRatings.includes(value)) return 'Invalid community rating';
      }
      return null;

    case 'riskScore':
      if (value && typeof value !== 'number') return 'Risk score must be a number';
      if (value && (value < 1 || value > 10)) return 'Risk score must be between 1 and 10';
      return null;

    case 'affordabilityScore':
      if (value && typeof value !== 'number') return 'Affordability score must be a number';
      if (value && (value < 1 || value > 10)) return 'Affordability score must be between 1 and 10';
      return null;

    default:
      return null;
  }
}
