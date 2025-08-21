import { ValidationRuleFactory } from '../../../utils/validation/ValidationRuleFactory';
import { RentersInsuranceInputs } from './formulas';

export function validateRentersInsuranceInputs(inputs: RentersInsuranceInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required field validations
  if (!inputs.rentalValue) {
    errors.push('Rental property value is required');
  } else {
    ruleFactory
      .createRule('rentalValue')
      .isNumber()
      .min(50000, 'Rental property value must be at least $50,000')
      .max(5000000, 'Rental property value cannot exceed $5,000,000')
      .validate(inputs.rentalValue, errors);
  }

  if (!inputs.personalPropertyValue) {
    errors.push('Personal property value is required');
  } else {
    ruleFactory
      .createRule('personalPropertyValue')
      .isNumber()
      .min(1000, 'Personal property value must be at least $1,000')
      .max(500000, 'Personal property value cannot exceed $500,000')
      .validate(inputs.personalPropertyValue, errors);
  }

  // Rental type validation
  if (inputs.rentalType) {
    const validRentalTypes = ['apartment', 'house', 'condo', 'townhouse', 'studio', 'duplex', 'mobile-home'];
    if (!validRentalTypes.includes(inputs.rentalType)) {
      errors.push('Invalid rental type selected');
    }
  }

  // Square footage validation
  if (inputs.squareFootage) {
    ruleFactory
      .createRule('squareFootage')
      .isNumber()
      .min(100, 'Square footage must be at least 100 sq ft')
      .max(10000, 'Square footage cannot exceed 10,000 sq ft')
      .validate(inputs.squareFootage, errors);
  }

  // Location validation
  if (inputs.location) {
    const validLocations = ['urban', 'suburban', 'rural'];
    if (!validLocations.includes(inputs.location)) {
      errors.push('Invalid location type selected');
    }
  }

  // State validation
  if (inputs.state) {
    const validStates = ['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'];
    if (!validStates.includes(inputs.state)) {
      errors.push('Invalid state selected');
    }
  }

  // Zip code validation
  if (inputs.zipCode) {
    ruleFactory
      .createRule('zipCode')
      .isString()
      .pattern(/^\d{5}(-\d{4})?$/, 'Invalid zip code format')
      .validate(inputs.zipCode, errors);
  }

  // Crime rate validation
  if (inputs.crimeRate) {
    const validCrimeRates = ['low', 'medium', 'high'];
    if (!validCrimeRates.includes(inputs.crimeRate)) {
      errors.push('Invalid crime rate selected');
    }
  }

  // Fire station distance validation
  if (inputs.fireStationDistance) {
    ruleFactory
      .createRule('fireStationDistance')
      .isNumber()
      .min(0, 'Fire station distance cannot be negative')
      .max(50, 'Fire station distance cannot exceed 50 miles')
      .validate(inputs.fireStationDistance, errors);
  }

  // Natural disaster zone validations
  if (inputs.floodZone) {
    const validFloodZones = ['none', 'a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've', 'x'];
    if (!validFloodZones.includes(inputs.floodZone)) {
      errors.push('Invalid flood zone selected');
    }
  }

  if (inputs.earthquakeZone) {
    const validEarthquakeZones = ['none', 'low', 'moderate', 'high', 'very-high'];
    if (!validEarthquakeZones.includes(inputs.earthquakeZone)) {
      errors.push('Invalid earthquake zone selected');
    }
  }

  if (inputs.hurricaneZone) {
    const validHurricaneZones = ['none', 'low', 'moderate', 'high', 'very-high'];
    if (!validHurricaneZones.includes(inputs.hurricaneZone)) {
      errors.push('Invalid hurricane zone selected');
    }
  }

  if (inputs.tornadoZone) {
    const validTornadoZones = ['none', 'low', 'moderate', 'high', 'very-high'];
    if (!validTornadoZones.includes(inputs.tornadoZone)) {
      errors.push('Invalid tornado zone selected');
    }
  }

  if (inputs.wildfireZone) {
    const validWildfireZones = ['none', 'low', 'moderate', 'high', 'very-high'];
    if (!validWildfireZones.includes(inputs.wildfireZone)) {
      errors.push('Invalid wildfire zone selected');
    }
  }

  // Deductible validation
  if (inputs.deductible) {
    const validDeductibles = ['250', '500', '1000', '1500', '2000', '2500'];
    if (!validDeductibles.includes(inputs.deductible)) {
      errors.push('Invalid deductible amount selected');
    }
  }

  // Coverage level validation
  if (inputs.coverageLevel) {
    const validCoverageLevels = ['basic', 'standard', 'premium', 'comprehensive'];
    if (!validCoverageLevels.includes(inputs.coverageLevel)) {
      errors.push('Invalid coverage level selected');
    }
  }

  // Liability coverage validation
  if (inputs.liabilityCoverage) {
    ruleFactory
      .createRule('liabilityCoverage')
      .isNumber()
      .min(25000, 'Liability coverage must be at least $25,000')
      .max(1000000, 'Liability coverage cannot exceed $1,000,000')
      .validate(inputs.liabilityCoverage, errors);
  }

  // Medical payments validation
  if (inputs.medicalPayments) {
    ruleFactory
      .createRule('medicalPayments')
      .isNumber()
      .min(500, 'Medical payments must be at least $500')
      .max(10000, 'Medical payments cannot exceed $10,000')
      .validate(inputs.medicalPayments, errors);
  }

  // Loss of use validation
  if (inputs.lossOfUse) {
    ruleFactory
      .createRule('lossOfUse')
      .isNumber()
      .min(1000, 'Loss of use coverage must be at least $1,000')
      .max(50000, 'Loss of use coverage cannot exceed $50,000')
      .validate(inputs.lossOfUse, errors);
  }

  // Additional coverage validations
  if (inputs.jewelryCoverage) {
    ruleFactory
      .createRule('jewelryCoverage')
      .isNumber()
      .min(0, 'Jewelry coverage cannot be negative')
      .max(50000, 'Jewelry coverage cannot exceed $50,000')
      .validate(inputs.jewelryCoverage, errors);
  }

  if (inputs.electronicsCoverage) {
    ruleFactory
      .createRule('electronicsCoverage')
      .isNumber()
      .min(0, 'Electronics coverage cannot be negative')
      .max(25000, 'Electronics coverage cannot exceed $25,000')
      .validate(inputs.electronicsCoverage, errors);
  }

  if (inputs.businessEquipmentCoverage) {
    ruleFactory
      .createRule('businessEquipmentCoverage')
      .isNumber()
      .min(0, 'Business equipment coverage cannot be negative')
      .max(50000, 'Business equipment coverage cannot exceed $50,000')
      .validate(inputs.businessEquipmentCoverage, errors);
  }

  if (inputs.musicalInstrumentsCoverage) {
    ruleFactory
      .createRule('musicalInstrumentsCoverage')
      .isNumber()
      .min(0, 'Musical instruments coverage cannot be negative')
      .max(25000, 'Musical instruments coverage cannot exceed $25,000')
      .validate(inputs.musicalInstrumentsCoverage, errors);
  }

  if (inputs.sportsEquipmentCoverage) {
    ruleFactory
      .createRule('sportsEquipmentCoverage')
      .isNumber()
      .min(0, 'Sports equipment coverage cannot be negative')
      .max(10000, 'Sports equipment coverage cannot exceed $10,000')
      .validate(inputs.sportsEquipmentCoverage, errors);
  }

  if (inputs.artworkCoverage) {
    ruleFactory
      .createRule('artworkCoverage')
      .isNumber()
      .min(0, 'Artwork coverage cannot be negative')
      .max(25000, 'Artwork coverage cannot exceed $25,000')
      .validate(inputs.artworkCoverage, errors);
  }

  if (inputs.collectiblesCoverage) {
    ruleFactory
      .createRule('collectiblesCoverage')
      .isNumber()
      .min(0, 'Collectibles coverage cannot be negative')
      .max(25000, 'Collectibles coverage cannot exceed $25,000')
      .validate(inputs.collectiblesCoverage, errors);
  }

  // Credit score validation
  if (inputs.creditScore) {
    ruleFactory
      .createRule('creditScore')
      .isNumber()
      .min(300, 'Credit score must be at least 300')
      .max(850, 'Credit score cannot exceed 850')
      .validate(inputs.creditScore, errors);
  }

  // Claims history validation
  if (inputs.claimsHistory) {
    const validClaimsHistory = ['none', '1-2', '3-5', '5-plus'];
    if (!validClaimsHistory.includes(inputs.claimsHistory)) {
      errors.push('Invalid claims history selected');
    }
  }

  // Occupancy duration validation
  if (inputs.occupancyDuration) {
    ruleFactory
      .createRule('occupancyDuration')
      .isNumber()
      .min(0.1, 'Occupancy duration must be at least 0.1 years')
      .max(20, 'Occupancy duration cannot exceed 20 years')
      .validate(inputs.occupancyDuration, errors);
  }

  // Security features validation
  if (inputs.securityFeatures) {
    const validSecurityFeatures = ['alarm-system', 'smoke-detectors', 'deadbolts', 'security-cameras', 'gated-community', 'doorman', 'fire-sprinklers'];
    if (Array.isArray(inputs.securityFeatures)) {
      inputs.securityFeatures.forEach(feature => {
        if (!validSecurityFeatures.includes(feature)) {
          errors.push(`Invalid security feature: ${feature}`);
        }
      });
    } else {
      errors.push('Security features must be an array');
    }
  }

  // Building age validation
  if (inputs.buildingAge) {
    ruleFactory
      .createRule('buildingAge')
      .isNumber()
      .min(0, 'Building age cannot be negative')
      .max(100, 'Building age cannot exceed 100 years')
      .validate(inputs.buildingAge, errors);
  }

  // Floor level validation
  if (inputs.floorLevel) {
    ruleFactory
      .createRule('floorLevel')
      .isNumber()
      .min(1, 'Floor level must be at least 1')
      .max(100, 'Floor level cannot exceed 100')
      .validate(inputs.floorLevel, errors);
  }

  // Parking type validation
  if (inputs.parkingType) {
    const validParkingTypes = ['street', 'assigned', 'garage', 'covered', 'none'];
    if (!validParkingTypes.includes(inputs.parkingType)) {
      errors.push('Invalid parking type selected');
    }
  }

  // Pet ownership validation
  if (inputs.petOwnership) {
    const validPetOwnership = ['none', 'dog', 'cat', 'multiple', 'exotic'];
    if (!validPetOwnership.includes(inputs.petOwnership)) {
      errors.push('Invalid pet ownership selected');
    }
  }

  // Roommates validation
  if (inputs.roommates) {
    ruleFactory
      .createRule('roommates')
      .isNumber()
      .min(0, 'Number of roommates cannot be negative')
      .max(10, 'Number of roommates cannot exceed 10')
      .validate(inputs.roommates, errors);
  }

  // Water backup validation
  if (inputs.waterBackup) {
    ruleFactory
      .createRule('waterBackup')
      .isNumber()
      .min(0, 'Water backup coverage cannot be negative')
      .max(25000, 'Water backup coverage cannot exceed $25,000')
      .validate(inputs.waterBackup, errors);
  }

  // Identity theft validation
  if (inputs.identityTheft) {
    ruleFactory
      .createRule('identityTheft')
      .isNumber()
      .min(0, 'Identity theft coverage cannot be negative')
      .max(15000, 'Identity theft coverage cannot exceed $15,000')
      .validate(inputs.identityTheft, errors);
  }

  // Pet liability validation
  if (inputs.petLiability) {
    ruleFactory
      .createRule('petLiability')
      .isNumber()
      .min(0, 'Pet liability coverage cannot be negative')
      .max(50000, 'Pet liability coverage cannot exceed $50,000')
      .validate(inputs.petLiability, errors);
  }

  // Tax rate validation
  if (inputs.taxRate) {
    ruleFactory
      .createRule('taxRate')
      .isNumber()
      .min(0, 'Tax rate cannot be negative')
      .max(100, 'Tax rate cannot exceed 100%')
      .validate(inputs.taxRate, errors);
  }

  // Inflation rate validation
  if (inputs.inflationRate) {
    ruleFactory
      .createRule('inflationRate')
      .isNumber()
      .min(-50, 'Inflation rate cannot be less than -50%')
      .max(100, 'Inflation rate cannot exceed 100%')
      .validate(inputs.inflationRate, errors);
  }

  // Business logic validations
  if (inputs.personalPropertyValue && inputs.rentalValue) {
    if (inputs.personalPropertyValue > inputs.rentalValue * 0.5) {
      errors.push('Personal property value should not exceed 50% of rental property value');
    }
  }

  if (inputs.liabilityCoverage && inputs.personalPropertyValue) {
    if (inputs.liabilityCoverage < inputs.personalPropertyValue * 0.1) {
      errors.push('Liability coverage should be at least 10% of personal property value');
    }
  }

  if (inputs.lossOfUse && inputs.personalPropertyValue) {
    if (inputs.lossOfUse > inputs.personalPropertyValue * 0.2) {
      errors.push('Loss of use coverage should not exceed 20% of personal property value');
    }
  }

  return errors;
}