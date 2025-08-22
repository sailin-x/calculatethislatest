import { CalculatorInputs } from '../../../types/calculator';

export interface PricePerSquareFootInputs extends CalculatorInputs {
  // Required inputs
  propertyPrice: number;
  totalSquareFootage: number;
  propertyType: 'single_family' | 'townhouse' | 'condo' | 'multi_family' | 'commercial' | 'land' | 'apartment' | 'duplex' | 'triplex' | 'fourplex';
  
  // Optional inputs
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  lotSize?: number;
  condition?: 'excellent' | 'very_good' | 'good' | 'fair' | 'poor' | 'needs_work';
  features?: string[];
  marketData?: any[];
  averageMarketPrice?: number;
  medianMarketPrice?: number;
  marketTrend?: 'appreciating' | 'stable' | 'declining' | 'volatile';
  daysOnMarket?: number;
  priceHistory?: any[];
  propertyTaxes?: number;
  hoaFees?: number;
  utilities?: number;
  rentalIncome?: number;
  
  // Analysis options
  includeComparables?: boolean;
  includeMarketTrends?: boolean;
  includeROI?: boolean;
  includeRentalAnalysis?: boolean;
}

export const validatePricePerSquareFootInputs = (inputs: Partial<PricePerSquareFootInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyPrice || inputs.propertyPrice <= 0) {
    errors.push('Property price is required and must be greater than 0');
  }

  if (!inputs.totalSquareFootage || inputs.totalSquareFootage <= 0) {
    errors.push('Total square footage is required and must be greater than 0');
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }

  // Range validation
  if (inputs.propertyPrice && (inputs.propertyPrice < 10000 || inputs.propertyPrice > 100000000)) {
    errors.push('Property price must be between $10,000 and $100,000,000');
  }

  if (inputs.totalSquareFootage && (inputs.totalSquareFootage < 100 || inputs.totalSquareFootage > 50000)) {
    errors.push('Total square footage must be between 100 and 50,000 sq ft');
  }

  if (inputs.bedrooms && (inputs.bedrooms < 0 || inputs.bedrooms > 20)) {
    errors.push('Number of bedrooms must be between 0 and 20');
  }

  if (inputs.bathrooms && (inputs.bathrooms < 0 || inputs.bathrooms > 15)) {
    errors.push('Number of bathrooms must be between 0 and 15');
  }

  if (inputs.yearBuilt && (inputs.yearBuilt < 1800 || inputs.yearBuilt > new Date().getFullYear() + 1)) {
    errors.push('Year built must be between 1800 and next year');
  }

  if (inputs.lotSize && (inputs.lotSize < 100 || inputs.lotSize > 1000000)) {
    errors.push('Lot size must be between 100 and 1,000,000 sq ft');
  }

  if (inputs.averageMarketPrice && (inputs.averageMarketPrice < 10 || inputs.averageMarketPrice > 5000)) {
    errors.push('Average market price per sq ft must be between $10 and $5,000');
  }

  if (inputs.medianMarketPrice && (inputs.medianMarketPrice < 10 || inputs.medianMarketPrice > 5000)) {
    errors.push('Median market price per sq ft must be between $10 and $5,000');
  }

  if (inputs.daysOnMarket && (inputs.daysOnMarket < 0 || inputs.daysOnMarket > 1000)) {
    errors.push('Days on market must be between 0 and 1,000');
  }

  if (inputs.propertyTaxes && inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }

  if (inputs.hoaFees && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }

  if (inputs.utilities && inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  }

  if (inputs.rentalIncome && inputs.rentalIncome < 0) {
    errors.push('Rental income cannot be negative');
  }

  // Logical validation
  if (inputs.propertyPrice && inputs.totalSquareFootage) {
    const calculatedPricePerSqFt = inputs.propertyPrice / inputs.totalSquareFootage;
    if (calculatedPricePerSqFt < 10) {
      errors.push('Calculated price per square foot seems unusually low - please verify inputs');
    }
    if (calculatedPricePerSqFt > 5000) {
      errors.push('Calculated price per square foot seems unusually high - please verify inputs');
    }
  }

  if (inputs.lotSize && inputs.totalSquareFootage && inputs.lotSize < inputs.totalSquareFootage) {
    errors.push('Lot size cannot be smaller than total square footage');
  }

  if (inputs.bedrooms && inputs.totalSquareFootage) {
    const sqFtPerBedroom = inputs.totalSquareFootage / inputs.bedrooms;
    if (sqFtPerBedroom < 50) {
      errors.push('Square footage per bedroom seems unusually low - please verify inputs');
    }
    if (sqFtPerBedroom > 2000) {
      errors.push('Square footage per bedroom seems unusually high - please verify inputs');
    }
  }

  if (inputs.bathrooms && inputs.bedrooms && inputs.bathrooms > inputs.bedrooms * 2) {
    errors.push('Number of bathrooms seems unusually high compared to bedrooms - please verify inputs');
  }

  if (inputs.averageMarketPrice && inputs.medianMarketPrice) {
    const priceDifference = Math.abs(inputs.averageMarketPrice - inputs.medianMarketPrice);
    const priceRatio = priceDifference / inputs.averageMarketPrice;
    if (priceRatio > 0.5) {
      errors.push('Significant difference between average and median market prices - please verify data');
    }
  }

  if (inputs.rentalIncome && inputs.propertyPrice) {
    const annualRent = inputs.rentalIncome * 12;
    const rentToPriceRatio = annualRent / inputs.propertyPrice;
    if (rentToPriceRatio > 0.25) {
      errors.push('Rental income seems unusually high compared to property price - please verify inputs');
    }
    if (rentToPriceRatio < 0.02) {
      errors.push('Rental income seems unusually low compared to property price - please verify inputs');
    }
  }

  // Property type specific validation
  if (inputs.propertyType === 'land' && inputs.totalSquareFootage && inputs.totalSquareFootage < 1000) {
    errors.push('Land properties typically have larger square footage - please verify inputs');
  }

  if (inputs.propertyType === 'commercial' && inputs.bedrooms && inputs.bedrooms > 0) {
    errors.push('Commercial properties typically do not have bedrooms - please verify property type');
  }

  if (inputs.propertyType === 'single_family' && inputs.totalSquareFootage && inputs.totalSquareFootage < 500) {
    errors.push('Single family homes typically have at least 500 sq ft - please verify inputs');
  }

  // Market data validation
  if (inputs.marketData && inputs.marketData.length > 0) {
    const invalidComparables = inputs.marketData.filter(prop => 
      !prop.pricePerSquareFoot || prop.pricePerSquareFoot <= 0
    );
    if (invalidComparables.length > 0) {
      errors.push('Some comparable properties have invalid price per square foot data');
    }
  }

  // Price history validation
  if (inputs.priceHistory && inputs.priceHistory.length > 0) {
    const invalidHistory = inputs.priceHistory.filter(entry => 
      !entry.price || entry.price <= 0 || !entry.date
    );
    if (invalidHistory.length > 0) {
      errors.push('Some price history entries have invalid data');
    }
  }

  // Feature validation
  if (inputs.features && inputs.features.length > 0) {
    const validFeatures = [
      'pool', 'garage', 'basement', 'fireplace', 'hardwood_floors', 'granite_countertops',
      'stainless_steel_appliances', 'updated_kitchen', 'updated_bathrooms', 'energy_efficient',
      'smart_home', 'mountain_view', 'ocean_view', 'city_view', 'garden', 'deck',
      'fenced_yard', 'central_air', 'central_heat', 'walk_in_closet'
    ];
    
    const invalidFeatures = inputs.features.filter(feature => !validFeatures.includes(feature));
    if (invalidFeatures.length > 0) {
      errors.push(`Invalid features: ${invalidFeatures.join(', ')}`);
    }
  }

  // Location validation
  if (inputs.location && inputs.location.length > 100) {
    errors.push('Location description is too long (max 100 characters)');
  }

  // Cost validation
  if (inputs.propertyTaxes && inputs.propertyPrice) {
    const taxRate = inputs.propertyTaxes / inputs.propertyPrice;
    if (taxRate > 0.1) {
      errors.push('Property tax rate seems unusually high (over 10%) - please verify inputs');
    }
  }

  if (inputs.hoaFees && inputs.propertyPrice) {
    const annualHOA = inputs.hoaFees * 12;
    const hoaRate = annualHOA / inputs.propertyPrice;
    if (hoaRate > 0.05) {
      errors.push('HOA fees seem unusually high (over 5% of property value) - please verify inputs');
    }
  }

  // Market trend validation
  if (inputs.marketTrend && !['appreciating', 'stable', 'declining', 'volatile'].includes(inputs.marketTrend)) {
    errors.push('Invalid market trend value');
  }

  // Condition validation
  if (inputs.condition && !['excellent', 'very_good', 'good', 'fair', 'poor', 'needs_work'].includes(inputs.condition)) {
    errors.push('Invalid property condition value');
  }

  // Property type validation
  const validPropertyTypes = [
    'single_family', 'townhouse', 'condo', 'multi_family', 'commercial', 
    'land', 'apartment', 'duplex', 'triplex', 'fourplex'
  ];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};