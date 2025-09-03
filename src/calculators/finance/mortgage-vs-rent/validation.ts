import { ValidationRule } from '../../../types/calculator';

export const mortgageVsRentValidationRules: ValidationRule[] = [
  // Required field validations
  {
    type: 'required',
    field: 'currentRent',
    message: 'Current monthly rent is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'rentIncreaseRate',
    message: 'Annual rent increase rate is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    type: 'required',
    field: 'homePrice',
    message: 'Home purchase price is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'downPayment',
    message: 'Down payment amount is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'interestRate',
    message: 'Interest rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'loanTerm',
    message: 'Loan term is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'propertyTaxRate',
    message: 'Property tax rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'homeownersInsuranceRate',
    message: 'Homeowners insurance rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'maintenanceRate',
    message: 'Maintenance rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'closingCosts',
    message: 'Closing costs are required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'investmentReturnRate',
    message: 'Investment return rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'taxBracket',
    message: 'Tax bracket is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'timeHorizon',
    message: 'Time horizon is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'homeAppreciationRate',
    message: 'Home appreciation rate is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    type: 'required',
    field: 'inflationRate',
    message: 'Inflation rate is required',
    validator: (value: any) => value !== null && value !== undefined
  },

  // Range validations
  {
    type: 'range',
    field: 'currentRent',
    message: 'Current rent must be between $100 and $50,000',
    validator: (value: any) => value >= 100 && value <= 50000
  },
  {
    type: 'range',
    field: 'rentIncreaseRate',
    message: 'Rent increase rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    type: 'range',
    field: 'homePrice',
    message: 'Home price must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    type: 'range',
    field: 'downPayment',
    message: 'Down payment must be between $0 and home price',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePrice = allInputs.homePrice || 0;
      return value >= 0 && value <= homePrice;
    }
  },
  {
    type: 'range',
    field: 'interestRate',
    message: 'Interest rate must be between 0.1% and 20%',
    validator: (value: any) => value >= 0.1 && value <= 20
  },
  {
    type: 'range',
    field: 'loanTerm',
    message: 'Loan term must be between 10 and 50 years',
    validator: (value: any) => value >= 10 && value <= 50
  },
  {
    type: 'range',
    field: 'propertyTaxRate',
    message: 'Property tax rate must be between 0% and 5%',
    validator: (value: any) => value >= 0 && value <= 5
  },
  {
    type: 'range',
    field: 'homeownersInsuranceRate',
    message: 'Homeowners insurance rate must be between 0% and 2%',
    validator: (value: any) => value >= 0 && value <= 2
  },
  {
    type: 'range',
    field: 'maintenanceRate',
    message: 'Maintenance rate must be between 0% and 5%',
    validator: (value: any) => value >= 0 && value <= 5
  },
  {
    type: 'range',
    field: 'hoaFees',
    message: 'HOA fees must be between $0 and $5,000',
    validator: (value: any) => value >= 0 && value <= 5000
  },
  {
    type: 'range',
    field: 'closingCosts',
    message: 'Closing costs must be between $0 and $100,000',
    validator: (value: any) => value >= 0 && value <= 100000
  },
  {
    type: 'range',
    field: 'investmentReturnRate',
    message: 'Investment return rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    type: 'range',
    field: 'taxBracket',
    message: 'Tax bracket must be between 0% and 50%',
    validator: (value: any) => value >= 0 && value <= 50
  },
  {
    type: 'range',
    field: 'timeHorizon',
    message: 'Time horizon must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    type: 'range',
    field: 'homeAppreciationRate',
    message: 'Home appreciation rate must be between -10% and 20%',
    validator: (value: any) => value >= -10 && value <= 20
  },
  {
    type: 'range',
    field: 'inflationRate',
    message: 'Inflation rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },

  // Business rule validations
  {
    type: 'business',
    field: 'downPayment',
    message: 'Down payment should typically be at least 20% of home price to avoid PMI',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePrice = allInputs.homePrice || 0;
      return value >= homePrice * 0.2;
    }
  },
  {
    type: 'business',
    field: 'timeHorizon',
    message: 'Consider a longer time horizon for homeownership to be financially beneficial',
    validator: (value: any, allInputs: Record<string, any>) => {
      return value >= 5;
    }
  },
  {
    type: 'business',
    field: 'rentIncreaseRate',
    message: 'Rent increase rate should be realistic for your market area',
    validator: (value: any, allInputs: Record<string, any>) => {
      return value >= 0 && value <= 10;
    }
  },
  {
    type: 'business',
    field: 'homeAppreciationRate',
    message: 'Home appreciation rate should be realistic for your market area',
    validator: (value: any, allInputs: Record<string, any>) => {
      return value >= -5 && value <= 8;
    }
  },
  {
    type: 'business',
    field: 'investmentReturnRate',
    message: 'Investment return rate should be realistic for diversified portfolio',
    validator: (value: any, allInputs: Record<string, any>) => {
      return value >= 4 && value <= 12;
    }
  }
];