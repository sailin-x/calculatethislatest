import { ValidationRule } from '../../types/calculator';

export const getPricePerSquareFootValidationRules = (): ValidationRule[] => [
  {
    field: 'propertyPrice',
    type: 'required',
    message: 'Property price is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'propertyPrice',
    type: 'range',
    message: 'Property price must be between $10,000 and $50,000,000',
    validator: (value) => value >= 10000 && value <= 50000000
  },
  {
    field: 'squareFootage',
    type: 'required',
    message: 'Square footage is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'squareFootage',
    type: 'range',
    message: 'Square footage must be between 100 and 100,000 square feet',
    validator: (value) => value >= 100 && value <= 100000
  },
  {
    field: 'comparePrice1',
    type: 'range',
    message: 'Comparison property 1 price must be between $10,000 and $50,000,000',
    validator: (value) => value === undefined || (value >= 10000 && value <= 50000000)
  },
  {
    field: 'compareSqft1',
    type: 'range',
    message: 'Comparison property 1 square footage must be between 100 and 100,000',
    validator: (value) => value === undefined || (value >= 100 && value <= 100000)
  },
  {
    field: 'comparePrice2',
    type: 'range',
    message: 'Comparison property 2 price must be between $10,000 and $50,000,000',
    validator: (value) => value === undefined || (value >= 10000 && value <= 50000000)
  },
  {
    field: 'compareSqft2',
    type: 'range',
    message: 'Comparison property 2 square footage must be between 100 and 100,000',
    validator: (value) => value === undefined || (value >= 100 && value <= 100000)
  },
  {
    field: 'comparePrice3',
    type: 'range',
    message: 'Comparison property 3 price must be between $10,000 and $50,000,000',
    validator: (value) => value === undefined || (value >= 10000 && value <= 50000000)
  },
  {
    field: 'compareSqft3',
    type: 'range',
    message: 'Comparison property 3 square footage must be between 100 and 100,000',
    validator: (value) => value === undefined || (value >= 100 && value <= 100000)
  },
  {
    field: 'marketAverage',
    type: 'range',
    message: 'Market average must be between $10 and $10,000 per square foot',
    validator: (value) => value === undefined || (value >= 10 && value <= 10000)
  },
  {
    field: 'compareSqft1',
    type: 'business',
    message: 'Square footage is required when comparison price is provided',
    validator: (value, allInputs) => {
      if (allInputs?.comparePrice1 && !value) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'comparePrice1',
    type: 'business',
    message: 'Price is required when comparison square footage is provided',
    validator: (value, allInputs) => {
      if (allInputs?.compareSqft1 && !value) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'compareSqft2',
    type: 'business',
    message: 'Square footage is required when comparison price is provided',
    validator: (value, allInputs) => {
      if (allInputs?.comparePrice2 && !value) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'comparePrice2',
    type: 'business',
    message: 'Price is required when comparison square footage is provided',
    validator: (value, allInputs) => {
      if (allInputs?.compareSqft2 && !value) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'compareSqft3',
    type: 'business',
    message: 'Square footage is required when comparison price is provided',
    validator: (value, allInputs) => {
      if (allInputs?.comparePrice3 && !value) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'comparePrice3',
    type: 'business',
    message: 'Price is required when comparison square footage is provided',
    validator: (value, allInputs) => {
      if (allInputs?.compareSqft3 && !value) {
        return false;
      }
      return true;
    }
  }
];