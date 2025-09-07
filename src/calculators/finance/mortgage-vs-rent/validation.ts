import { ValidationRule } from '../../../types/calculator';

export const getMortgageVsRentValidationRules = (): ValidationRule[] => [
  {
    field: 'homePrice',
    type: 'required',
    message: 'Home price is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'homePrice',
    type: 'range',
    message: 'Home price must be between $10,000 and $10,000,000',
    validator: (value) => value >= 10000 && value <= 10000000
  },
  {
    field: 'downPayment',
    type: 'required',
    message: 'Down payment is required',
    validator: (value) => value !== undefined && value !== null && value >= 0
  },
  {
    field: 'downPayment',
    type: 'business',
    message: 'Down payment cannot exceed home price',
    validator: (value, allInputs) => value <= (allInputs?.homePrice || 0)
  },
  {
    field: 'loanTerm',
    type: 'required',
    message: 'Loan term is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'loanTerm',
    type: 'range',
    message: 'Loan term must be between 1 and 50 years',
    validator: (value) => value >= 1 && value <= 50
  },
  {
    field: 'interestRate',
    type: 'required',
    message: 'Interest rate is required',
    validator: (value) => value !== undefined && value !== null && value >= 0
  },
  {
    field: 'interestRate',
    type: 'range',
    message: 'Interest rate must be between 0% and 20%',
    validator: (value) => value >= 0 && value <= 20
  },
  {
    field: 'monthlyRent',
    type: 'required',
    message: 'Monthly rent is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'monthlyRent',
    type: 'range',
    message: 'Monthly rent must be between $100 and $50,000',
    validator: (value) => value >= 100 && value <= 50000
  },
  {
    field: 'rentIncreaseRate',
    type: 'range',
    message: 'Rent increase rate must be between -5% and 20%',
    validator: (value) => value === undefined || (value >= -5 && value <= 20)
  },
  {
    field: 'propertyTax',
    type: 'range',
    message: 'Property tax must be between $0 and $100,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 100000)
  },
  {
    field: 'homeInsurance',
    type: 'range',
    message: 'Home insurance must be between $0 and $10,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'hoaFees',
    type: 'range',
    message: 'HOA fees must be between $0 and $5,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 5000)
  },
  {
    field: 'maintenanceRate',
    type: 'range',
    message: 'Maintenance rate must be between 0% and 5%',
    validator: (value) => value === undefined || (value >= 0 && value <= 5)
  },
  {
    field: 'analysisPeriod',
    type: 'range',
    message: 'Analysis period must be between 1 and 50 years',
    validator: (value) => value === undefined || (value >= 1 && value <= 50)
  },
  {
    field: 'homeAppreciation',
    type: 'range',
    message: 'Home appreciation must be between -10% and 20%',
    validator: (value) => value === undefined || (value >= -10 && value <= 20)
  },
  {
    field: 'investmentReturn',
    type: 'range',
    message: 'Investment return must be between -10% and 25%',
    validator: (value) => value === undefined || (value >= -10 && value <= 25)
  },
  {
    field: 'inflationRate',
    type: 'range',
    message: 'Inflation rate must be between -5% and 10%',
    validator: (value) => value === undefined || (value >= -5 && value <= 10)
  }
];