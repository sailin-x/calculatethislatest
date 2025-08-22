import { PricePerSquareFootInputs } from './validation';

export const quickValidatePricePerSquareFoot = (inputs: Partial<PricePerSquareFootInputs>): boolean => {
  // Check required fields
  if (!inputs.propertyPrice || inputs.propertyPrice <= 0) {
    return false;
  }

  if (!inputs.totalSquareFootage || inputs.totalSquareFootage <= 0) {
    return false;
  }

  if (!inputs.propertyType) {
    return false;
  }

  // Check basic logical constraints
  if (inputs.propertyPrice && inputs.totalSquareFootage) {
    const calculatedPricePerSqFt = inputs.propertyPrice / inputs.totalSquareFootage;
    if (calculatedPricePerSqFt < 10 || calculatedPricePerSqFt > 5000) {
      return false;
    }
  }

  if (inputs.lotSize && inputs.totalSquareFootage && inputs.lotSize < inputs.totalSquareFootage) {
    return false;
  }

  if (inputs.bedrooms && inputs.bedrooms < 0) {
    return false;
  }

  if (inputs.bathrooms && inputs.bathrooms < 0) {
    return false;
  }

  if (inputs.yearBuilt && (inputs.yearBuilt < 1800 || inputs.yearBuilt > new Date().getFullYear() + 1)) {
    return false;
  }

  if (inputs.propertyTaxes && inputs.propertyTaxes < 0) {
    return false;
  }

  if (inputs.hoaFees && inputs.hoaFees < 0) {
    return false;
  }

  if (inputs.utilities && inputs.utilities < 0) {
    return false;
  }

  if (inputs.rentalIncome && inputs.rentalIncome < 0) {
    return false;
  }

  return true;
};