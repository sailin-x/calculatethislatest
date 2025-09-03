import { ValidationRule } from '../../../types/calculator';

export const mortgagePointsValidationRules: ValidationRule[] = [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'baseInterestRate',
    type: 'required',
    message: 'Base interest rate is required',
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
    field: 'baseInterestRate',
    type: 'range',
    message: 'Base interest rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'loanTerm',
    type: 'range',
    message: 'Loan term must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    field: 'discountPoints',
    type: 'range',
    message: 'Discount points must be between 0 and 5',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 5)
  },
  {
    field: 'originationPoints',
    type: 'range',
    message: 'Origination points must be between 0 and 3',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 3)
  },
  {
    field: 'pointCost',
    type: 'range',
    message: 'Cost per point must be between $100 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 100 && value <= 10000)
  },
  {
    field: 'propertyValue',
    type: 'range',
    message: 'Property value must be between $10,000 and $10,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 10000 && value <= 10000000)
  },
  {
    field: 'downPayment',
    type: 'range',
    message: 'Down payment must be between $0 and $10,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000000)
  },
  {
    field: 'borrowerCreditScore',
    type: 'range',
    message: 'Credit score must be between 300 and 850',
    validator: (value: any) => value === null || value === undefined || (value >= 300 && value <= 850)
  },
  {
    field: 'borrowerTaxRate',
    type: 'range',
    message: 'Tax rate must be between 0% and 50%',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50)
  },
  {
    field: 'analysisPeriod',
    type: 'range',
    message: 'Analysis period must be between 1 and 30 years',
    validator: (value: any) => value === null || value === undefined || (value >= 1 && value <= 30)
  },
  {
    field: 'loanAmount',
    type: 'business',
    message: 'Loan amount should not exceed property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const propertyValue = allInputs?.propertyValue || 0;
      if (propertyValue === 0) return true; // Property value not provided
      return value <= propertyValue;
    }
  },
  {
    field: 'downPayment',
    type: 'business',
    message: 'Down payment should not exceed property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const propertyValue = allInputs?.propertyValue || 0;
      if (propertyValue === 0) return true; // Property value not provided
      return value <= propertyValue;
    }
  },
  {
    field: 'baseInterestRate',
    type: 'business',
    message: 'Interest rate seems unusually high',
    validator: (value: any) => value <= 15 // Warning for rates above 15%
  },
  {
    field: 'discountPoints',
    type: 'business',
    message: 'High number of discount points may not be cost-effective',
    validator: (value: any) => value <= 3 // Warning for more than 3 discount points
  },
  {
    field: 'analysisPeriod',
    type: 'business',
    message: 'Analysis period should be reasonable for point evaluation',
    validator: (value: any) => value >= 3 && value <= 15 // Most common analysis periods
  }
];