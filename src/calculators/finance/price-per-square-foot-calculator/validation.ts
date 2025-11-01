import { PricePerSquareFootInputs } from './types';

export function validatePricePerSquareFootInputs(inputs: PricePerSquareFootInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Property price validation
  if (!inputs.propertyPrice || inputs.propertyPrice <= 0) {
    errors.push({ field: 'propertyPrice', message: 'Property price must be greater than 0' });
  }
  if (inputs.propertyPrice && inputs.propertyPrice > 100000000) {
    errors.push({ field: 'propertyPrice', message: 'Property price cannot exceed $100,000,000' });
  }

  // Square footage validation
  if (!inputs.totalSquareFootage || inputs.totalSquareFootage <= 0) {
    errors.push({ field: 'totalSquareFootage', message: 'Total square footage must be greater than 0' });
  }
  if (inputs.totalSquareFootage && inputs.totalSquareFootage > 100000) {
    errors.push({ field: 'totalSquareFootage', message: 'Total square footage cannot exceed 100,000 sq ft' });
  }

  if (inputs.livingAreaSquareFootage && inputs.livingAreaSquareFootage <= 0) {
    errors.push({ field: 'livingAreaSquareFootage', message: 'Living area square footage must be greater than 0' });
  }
  if (inputs.livingAreaSquareFootage && inputs.totalSquareFootage && inputs.livingAreaSquareFootage > inputs.totalSquareFootage) {
    errors.push({ field: 'livingAreaSquareFootage', message: 'Living area cannot exceed total square footage' });
  }

  if (inputs.lotSizeSquareFootage && inputs.lotSizeSquareFootage <= 0) {
    errors.push({ field: 'lotSizeSquareFootage', message: 'Lot size square footage must be greater than 0' });
  }

  // Location validation
  if (!inputs.zipCode || inputs.zipCode.trim().length === 0) {
    errors.push({ field: 'zipCode', message: 'Zip code is required' });
  }
  if (inputs.zipCode && !/^\d{5}(-\d{4})?$/.test(inputs.zipCode)) {
    errors.push({ field: 'zipCode', message: 'Zip code must be in valid format (12345 or 12345-6789)' });
  }

  if (!inputs.city || inputs.city.trim().length === 0) {
    errors.push({ field: 'city', message: 'City is required' });
  }

  if (!inputs.state || inputs.state.trim().length === 0) {
    errors.push({ field: 'state', message: 'State is required' });
  }

  // Property features validation
  if (inputs.bedrooms < 0) {
    errors.push({ field: 'bedrooms', message: 'Number of bedrooms cannot be negative' });
  }
  if (inputs.bedrooms > 20) {
    errors.push({ field: 'bedrooms', message: 'Number of bedrooms cannot exceed 20' });
  }

  if (inputs.bathrooms < 0) {
    errors.push({ field: 'bathrooms', message: 'Number of bathrooms cannot be negative' });
  }
  if (inputs.bathrooms > 20) {
    errors.push({ field: 'bathrooms', message: 'Number of bathrooms cannot exceed 20' });
  }

  if (inputs.garageSpaces < 0) {
    errors.push({ field: 'garageSpaces', message: 'Number of garage spaces cannot be negative' });
  }
  if (inputs.garageSpaces > 10) {
    errors.push({ field: 'garageSpaces', message: 'Number of garage spaces cannot exceed 10' });
  }

  if (!inputs.yearBuilt || inputs.yearBuilt < 1800) {
    errors.push({ field: 'yearBuilt', message: 'Year built must be 1800 or later' });
  }
  const currentYear = new Date().getFullYear();
  if (inputs.yearBuilt && inputs.yearBuilt > currentYear + 1) {
    errors.push({ field: 'yearBuilt', message: 'Year built cannot be in the future' });
  }

  if (inputs.lotSizeAcres && inputs.lotSizeAcres < 0) {
    errors.push({ field: 'lotSizeAcres', message: 'Lot size in acres cannot be negative' });
  }
  if (inputs.lotSizeAcres && inputs.lotSizeAcres > 1000) {
    errors.push({ field: 'lotSizeAcres', message: 'Lot size in acres cannot exceed 1,000' });
  }

  // Market data validation
  if (inputs.averagePricePerSqFt < 0) {
    errors.push({ field: 'averagePricePerSqFt', message: 'Average price per sq ft cannot be negative' });
  }
  if (inputs.averagePricePerSqFt > 10000) {
    errors.push({ field: 'averagePricePerSqFt', message: 'Average price per sq ft cannot exceed $10,000' });
  }

  if (inputs.medianPricePerSqFt < 0) {
    errors.push({ field: 'medianPricePerSqFt', message: 'Median price per sq ft cannot be negative' });
  }
  if (inputs.medianPricePerSqFt > 10000) {
    errors.push({ field: 'medianPricePerSqFt', message: 'Median price per sq ft cannot exceed $10,000' });
  }

  if (inputs.pricePerSqFtRangeLow < 0) {
    errors.push({ field: 'pricePerSqFtRangeLow', message: 'Price per sq ft range low cannot be negative' });
  }
  if (inputs.pricePerSqFtRangeHigh < 0) {
    errors.push({ field: 'pricePerSqFtRangeHigh', message: 'Price per sq ft range high cannot be negative' });
  }
  if (inputs.pricePerSqFtRangeLow && inputs.pricePerSqFtRangeHigh && inputs.pricePerSqFtRangeLow > inputs.pricePerSqFtRangeHigh) {
    errors.push({ field: 'pricePerSqFtRangeLow', message: 'Price per sq ft range low cannot be higher than range high' });
  }

  // Market conditions validation
  if (inputs.daysOnMarket < 0) {
    errors.push({ field: 'daysOnMarket', message: 'Days on market cannot be negative' });
  }
  if (inputs.daysOnMarket > 10000) {
    errors.push({ field: 'daysOnMarket', message: 'Days on market cannot exceed 10,000' });
  }

  if (inputs.comparableSalesCount < 0) {
    errors.push({ field: 'comparableSalesCount', message: 'Comparable sales count cannot be negative' });
  }
  if (inputs.comparableSalesCount > 1000) {
    errors.push({ field: 'comparableSalesCount', message: 'Comparable sales count cannot exceed 1,000' });
  }

  // Financial validation
  if (inputs.annualPropertyTaxes < 0) {
    errors.push({ field: 'annualPropertyTaxes', message: 'Annual property taxes cannot be negative' });
  }
  if (inputs.annualPropertyTaxes > 100000) {
    errors.push({ field: 'annualPropertyTaxes', message: 'Annual property taxes cannot exceed $100,000' });
  }

  if (inputs.homeownersInsurance < 0) {
    errors.push({ field: 'homeownersInsurance', message: 'Homeowners insurance cannot be negative' });
  }
  if (inputs.homeownersInsurance > 50000) {
    errors.push({ field: 'homeownersInsurance', message: 'Homeowners insurance cannot exceed $50,000' });
  }

  if (inputs.hoaFees < 0) {
    errors.push({ field: 'hoaFees', message: 'HOA fees cannot be negative' });
  }
  if (inputs.hoaFees > 10000) {
    errors.push({ field: 'hoaFees', message: 'HOA fees cannot exceed $10,000 per month' });
  }

  // Comparison properties validation
  if (inputs.comparisonProperties) {
    inputs.comparisonProperties.forEach((comp, index) => {
      if (comp.price <= 0) {
        errors.push({ field: `comparisonProperties[${index}].price`, message: `Comparable ${index + 1} price must be greater than 0` });
      }
      if (comp.squareFootage <= 0) {
        errors.push({ field: `comparisonProperties[${index}].squareFootage`, message: `Comparable ${index + 1} square footage must be greater than 0` });
      }
      if (comp.distance < 0) {
        errors.push({ field: `comparisonProperties[${index}].distance`, message: `Comparable ${index + 1} distance cannot be negative` });
      }
      if (comp.distance > 50) {
        errors.push({ field: `comparisonProperties[${index}].distance`, message: `Comparable ${index + 1} distance cannot exceed 50 miles` });
      }
    });
  }

  return errors;
}

export function validatePricePerSquareFootBusinessRules(inputs: PricePerSquareFootInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Price per sq ft reasonableness check
  const basicPricePerSqFt = inputs.totalSquareFootage > 0 ? inputs.propertyPrice / inputs.totalSquareFootage : 0;
  if (basicPricePerSqFt > 5000) {
    warnings.push({ field: 'propertyPrice', message: 'Price per square foot is very high - verify property details and location' });
  } else if (basicPricePerSqFt < 10) {
    warnings.push({ field: 'propertyPrice', message: 'Price per square foot is very low - verify property details and location' });
  }

  // Market data consistency check
  if (inputs.averagePricePerSqFt > 0 && inputs.medianPricePerSqFt > 0) {
    const avgMedianDiff = Math.abs(inputs.averagePricePerSqFt - inputs.medianPricePerSqFt) / inputs.medianPricePerSqFt;
    if (avgMedianDiff > 0.5) {
      warnings.push({ field: 'averagePricePerSqFt', message: 'Large difference between average and median price per sq ft - verify market data' });
    }
  }

  // Property size warnings
  if (inputs.totalSquareFootage < 500) {
    warnings.push({ field: 'totalSquareFootage', message: 'Property size is very small - verify measurements' });
  } else if (inputs.totalSquareFootage > 50000) {
    warnings.push({ field: 'totalSquareFootage', message: 'Property size is very large - verify measurements and property type' });
  }

  // Age warnings
  const propertyAge = new Date().getFullYear() - inputs.yearBuilt;
  if (propertyAge > 100) {
    warnings.push({ field: 'yearBuilt', message: 'Property is very old - consider condition and potential renovation costs' });
  } else if (propertyAge < 0) {
    warnings.push({ field: 'yearBuilt', message: 'Property appears to be built in the future - verify year built' });
  }

  // Market conditions warnings
  if (inputs.daysOnMarket > 180) {
    warnings.push({ field: 'daysOnMarket', message: 'Property has been on market for an extended period - consider price adjustment' });
  }

  if (inputs.comparableSalesCount < 3) {
    warnings.push({ field: 'comparableSalesCount', message: 'Limited comparable sales data - market analysis may be less reliable' });
  }

  // Financial warnings
  if (inputs.annualPropertyTaxes > inputs.propertyPrice * 0.02) {
    warnings.push({ field: 'annualPropertyTaxes', message: 'Property taxes are high relative to property value' });
  }

  if (inputs.homeownersInsurance > inputs.propertyPrice * 0.005) {
    warnings.push({ field: 'homeownersInsurance', message: 'Homeowners insurance is high relative to property value' });
  }

  // Comparison properties warnings
  if (inputs.comparisonProperties && inputs.comparisonProperties.length > 0) {
    const avgDistance = inputs.comparisonProperties.reduce((sum, comp) => sum + comp.distance, 0) / inputs.comparisonProperties.length;
    if (avgDistance > 5) {
      warnings.push({ field: 'comparisonProperties', message: 'Comparable properties are relatively far away - consider local market variations' });
    }

    // Check for sale date recency
    const recentComparables = inputs.comparisonProperties.filter(comp => {
      const saleDate = new Date(comp.saleDate);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return saleDate >= sixMonthsAgo;
    });

    if (recentComparables.length < inputs.comparisonProperties.length * 0.5) {
      warnings.push({ field: 'comparisonProperties', message: 'Many comparable sales are older than 6 months - market may have changed' });
    }
  }

  // Property type and features consistency
  if (inputs.propertyType === 'Condo' && inputs.lotSizeSquareFootage > 10000) {
    warnings.push({ field: 'lotSizeSquareFootage', message: 'Condo with large lot size - verify property type' });
  }

  if (inputs.propertyType === 'Land' && inputs.bedrooms > 0) {
    warnings.push({ field: 'bedrooms', message: 'Land property should not have bedrooms - verify property type' });
  }

  // Market trend warnings
  if (inputs.marketTrend === 'Buyers' && inputs.daysOnMarket < 30) {
    warnings.push({ field: 'marketTrend', message: 'Buyers market but quick sale - may indicate underpricing or unique property' });
  }

  if (inputs.marketTrend === 'Sellers' && inputs.daysOnMarket > 90) {
    warnings.push({ field: 'marketTrend', message: 'Sellers market but slow sale - may indicate overpricing or property issues' });
  }

  // Quality and condition warnings
  if (inputs.propertyCondition === 'Poor' && (inputs.kitchenQuality === 'Luxury' || inputs.bathroomQuality === 'Luxury')) {
    warnings.push({ field: 'propertyCondition', message: 'Property condition marked as poor but has luxury features - verify assessment' });
  }

  // Size and bedroom/bathroom ratio warnings
  if (inputs.totalSquareFootage > 0 && inputs.bedrooms > 0) {
    const sqFtPerBedroom = inputs.totalSquareFootage / inputs.bedrooms;
    if (sqFtPerBedroom < 200) {
      warnings.push({ field: 'bedrooms', message: 'Very small square footage per bedroom - verify measurements' });
    } else if (sqFtPerBedroom > 1000) {
      warnings.push({ field: 'bedrooms', message: 'Very large square footage per bedroom - consider property type' });
    }
  }

  // HOA fees for condos/townhouses
  if ((inputs.propertyType === 'Condo' || inputs.propertyType === 'Townhouse') && inputs.hoaFees === 0) {
    warnings.push({ field: 'hoaFees', message: 'Condo/townhouse with no HOA fees - verify this is correct' });
  }

  // Single family home with high HOA fees
  if (inputs.propertyType === 'Single Family' && inputs.hoaFees > 200) {
    warnings.push({ field: 'hoaFees', message: 'Single family home with high HOA fees - verify this is correct' });
  }

  return warnings;
}