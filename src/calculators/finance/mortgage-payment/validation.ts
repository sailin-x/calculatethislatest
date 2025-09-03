import { ValidationRule } from '../../../types/calculator';

export const mortgagePaymentValidationRules: ValidationRule[] = [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'interestRate',
    type: 'required',
    message: 'Interest rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'loanTerm',
    type: 'required',
    message: 'Loan term is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'loanAmount',
    type: 'range',
    message: 'Loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'interestRate',
    type: 'range',
    message: 'Interest rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'loanTerm',
    type: 'range',
    message: 'Loan term must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    field: 'downPayment',
    type: 'range',
    message: 'Down payment must be between $0 and $10,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000000)
  },
  {
    field: 'homePrice',
    type: 'range',
    message: 'Home price must be between $10,000 and $10,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 10000 && value <= 10000000)
  },
  {
    field: 'propertyTaxes',
    type: 'range',
    message: 'Property taxes must be between $0 and $50,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50000)
  },
  {
    field: 'homeownersInsurance',
    type: 'range',
    message: 'Homeowners insurance must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'pmi',
    type: 'range',
    message: 'PMI must be between $0 and $1,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 1000)
  },
  {
    field: 'hoaFees',
    type: 'range',
    message: 'HOA fees must be between $0 and $2,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 2000)
  },
  {
    field: 'extraPayment',
    type: 'range',
    message: 'Extra payment must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'loanAmount',
    type: 'business',
    message: 'Loan amount plus down payment should equal home price',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePrice = allInputs?.homePrice || 0;
      const downPayment = allInputs?.downPayment || 0;
      if (homePrice === 0) return true; // Home price not provided
      return Math.abs((value + downPayment) - homePrice) < 1000; // Allow small rounding differences
    }
  },
  {
    field: 'downPayment',
    type: 'business',
    message: 'Down payment should not exceed home price',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePrice = allInputs?.homePrice || 0;
      if (homePrice === 0) return true; // Home price not provided
      return value <= homePrice;
    }
  },
  {
    field: 'loanAmount',
    type: 'business',
    message: 'Loan amount should not exceed home price',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePrice = allInputs?.homePrice || 0;
      if (homePrice === 0) return true; // Home price not provided
      return value <= homePrice;
    }
  },
  {
    field: 'interestRate',
    type: 'business',
    message: 'Interest rate seems unusually high',
    validator: (value: any) => value <= 15 // Warning for rates above 15%
  },
  {
    field: 'loanTerm',
    type: 'business',
    message: 'Loan term should be reasonable for mortgage financing',
    validator: (value: any) => value >= 5 && value <= 40 // Most common mortgage terms
  }
];