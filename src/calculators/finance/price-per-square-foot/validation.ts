import { ValidationRule } from '../../../types/calculator';

export const pricePerSquareFootValidationRules: ValidationRule[] = [
  // Required validations
  {
    type: 'required',
    field: 'propertyPrice',
    message: 'Property price is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'totalSquareFootage',
    message: 'Total square footage is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'propertyType',
    message: 'Property type is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },

  // Range validations
  {
    type: 'range',
    field: 'propertyPrice',
    message: 'Property price must be between $10,000 and $100,000,000',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 10000 && num <= 100000000;
    }
  },
  {
    type: 'range',
    field: 'totalSquareFootage',
    message: 'Total square footage must be between 100 and 100,000 sq ft',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 100 && num <= 100000;
    }
  },
  {
    type: 'range',
    field: 'bedrooms',
    message: 'Number of bedrooms must be between 0 and 20',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 20;
    }
  },
  {
    type: 'range',
    field: 'bathrooms',
    message: 'Number of bathrooms must be between 0 and 20',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 20;
    }
  },
  {
    type: 'range',
    field: 'lotSize',
    message: 'Lot size must be between 0 and 1,000,000 sq ft',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 1000000;
    }
  },
  {
    type: 'range',
    field: 'yearBuilt',
    message: 'Year built must be between 1800 and current year',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      const currentYear = new Date().getFullYear();
      return !isNaN(num) && num >= 1800 && num <= currentYear;
    }
  },
  {
    type: 'range',
    field: 'locationFactor',
    message: 'Location factor must be one of: poor, fair, good, very-good, excellent',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      return ['poor', 'fair', 'good', 'very-good', 'excellent'].includes(value);
    }
  },
  {
    type: 'range',
    field: 'conditionRating',
    message: 'Condition rating must be one of: poor, fair, good, very-good, excellent',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      return ['poor', 'fair', 'good', 'very-good', 'excellent'].includes(value);
    }
  },
  {
    type: 'range',
    field: 'marketAveragePSF',
    message: 'Market average PSF must be between $10 and $10,000',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 10 && num <= 10000;
    }
  },
  {
    type: 'range',
    field: 'comparablePSF1',
    message: 'Comparable PSF 1 must be between $10 and $10,000',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 10 && num <= 10000;
    }
  },
  {
    type: 'range',
    field: 'inflationRate',
    message: 'Inflation rate must be between -10% and 50%',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= -10 && num <= 50;
    }
  },
  {
    type: 'range',
    field: 'projectionYears',
    message: 'Projection years must be between 1 and 30',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 1 && num <= 30;
    }
  },

  // Business rule validations
  {
    type: 'business',
    field: 'propertyPrice',
    message: 'Property price per square foot must be reasonable (between $50 and $5,000)',
    validator: (value: any, allInputs: Record<string, any>) => {
      const propertyPrice = Number(value);
      const totalSquareFootage = Number(allInputs.totalSquareFootage);
      
      if (isNaN(propertyPrice) || isNaN(totalSquareFootage) || totalSquareFootage <= 0) {
        return true; // Skip validation if we don't have valid data
      }
      
      const pricePerSquareFoot = propertyPrice / totalSquareFootage;
      return pricePerSquareFoot >= 50 && pricePerSquareFoot <= 5000;
    }
  },
  {
    type: 'business',
    field: 'lotSize',
    message: 'Lot size should not be smaller than building square footage',
    validator: (value: any, allInputs: Record<string, any>) => {
      const lotSize = Number(value);
      const totalSquareFootage = Number(allInputs.totalSquareFootage);
      
      if (lotSize === 0 || totalSquareFootage === 0) {
        return true; // Skip validation if either is 0
      }
      
      return lotSize >= totalSquareFootage;
    }
  }
];