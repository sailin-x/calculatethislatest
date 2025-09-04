import { pricePerSquareFootValidationRules } from './validation';

// Required validations
export const validatePropertyPrice = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'propertyPrice' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTotalSquareFootage = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'totalSquareFootage' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyType = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'propertyType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

// Range validations
export const validatePropertyPriceRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'propertyPrice' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTotalSquareFootageRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'totalSquareFootage' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBedroomsRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'bedrooms' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBathroomsRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'bathrooms' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLotSizeRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'lotSize' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateYearBuiltRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'yearBuilt' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLocationFactorRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'locationFactor' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateConditionRatingRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'conditionRating' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMarketAveragePSFRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'marketAveragePSF' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateComparablePSFRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'comparablePSF1' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInflationRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'inflationRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateProjectionYearsRange = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'projectionYears' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

// Business rule validations
export const validatePropertyPriceSquareFootageRatio = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'propertyPrice' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLotSizePropertyRatio = (value: any, allInputs: Record<string, any>) => {
  const rule = pricePerSquareFootValidationRules.find(r => r.field === 'lotSize' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};