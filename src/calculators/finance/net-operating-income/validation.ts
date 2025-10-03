import { ValidationRule } from '../../../types/calculator';

export const getNetOperatingIncomeValidationRules = (): ValidationRule[] => [
  {
    field: 'grossRentalIncome',
    type: 'required',
    message: 'Gross rental income is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'grossRentalIncome',
    type: 'range',
    message: 'Gross rental income must be between $1,000 and $10,000,000',
    validator: (value) => value >= 1000 && value <= 10000000
  },
  {
    field: 'otherIncome',
    type: 'range',
    message: 'Other income must be between $0 and $1,000,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 1000000)
  },
  {
    field: 'propertyManagement',
    type: 'range',
    message: 'Property management percentage must be between 0% and 20%',
    validator: (value) => value === undefined || (value >= 0 && value <= 20)
  },
  {
    field: 'propertyManagementFixed',
    type: 'range',
    message: 'Fixed property management fee must be between $0 and $500,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 500000)
  },
  {
    field: 'maintenance',
    type: 'range',
    message: 'Maintenance expenses must be between $0 and $1,000,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 1000000)
  },
  {
    field: 'utilities',
    type: 'range',
    message: 'Utilities must be between $0 and $500,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 500000)
  },
  {
    field: 'insurance',
    type: 'range',
    message: 'Insurance must be between $0 and $500,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 500000)
  },
  {
    field: 'propertyTaxes',
    type: 'range',
    message: 'Property taxes must be between $0 and $2,000,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 2000000)
  },
  {
    field: 'legalFees',
    type: 'range',
    message: 'Legal and accounting fees must be between $0 and $100,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 100000)
  },
  {
    field: 'advertising',
    type: 'range',
    message: 'Advertising expenses must be between $0 and $50,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 50000)
  },
  {
    field: 'supplies',
    type: 'range',
    message: 'Office supplies must be between $0 and $10,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'miscellaneous',
    type: 'range',
    message: 'Miscellaneous expenses must be between $0 and $100,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 100000)
  },
  {
    field: 'propertyManagement',
    type: 'business',
    message: 'Cannot specify both percentage and fixed property management fees',
    validator: (value, allInputs) => {
      if (value && allInputs?.propertyManagementFixed) {
        return false;
      }
      return true;
    }
  }
];