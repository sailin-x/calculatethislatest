import { ValidationRule } from '../../types/calculator';

export const getPropertyTaxValidationRules = (): ValidationRule[] => [
  {
    field: 'assessedValue',
    type: 'required',
    message: 'Assessed property value is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'assessedValue',
    type: 'range',
    message: 'Assessed value must be between $10,000 and $20,000,000',
    validator: (value) => value >= 10000 && value <= 20000000
  },
  {
    field: 'marketValue',
    type: 'range',
    message: 'Market value must be between $10,000 and $20,000,000',
    validator: (value) => value === undefined || (value >= 10000 && value <= 20000000)
  },
  {
    field: 'taxRate',
    type: 'required',
    message: 'Property tax rate is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'taxRate',
    type: 'range',
    message: 'Tax rate must be between 0.1% and 5%',
    validator: (value) => value >= 0.1 && value <= 5
  },
  {
    field: 'taxRateType',
    type: 'required',
    message: 'Tax rate type is required',
    validator: (value) => value !== undefined && value !== null && value !== ''
  },
  {
    field: 'homesteadExemption',
    type: 'range',
    message: 'Homestead exemption must be between $0 and $100,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 100000)
  },
  {
    field: 'seniorExemption',
    type: 'range',
    message: 'Senior exemption must be between $0 and $50,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 50000)
  },
  {
    field: 'disabilityExemption',
    type: 'range',
    message: 'Disability exemption must be between $0 and $100,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 100000)
  },
  {
    field: 'otherExemptions',
    type: 'range',
    message: 'Other exemptions must be between $0 and $100,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 100000)
  },
  {
    field: 'paymentFrequency',
    type: 'required',
    message: 'Payment frequency is required',
    validator: (value) => value !== undefined && value !== null && value !== ''
  },
  {
    field: 'assessmentRatio',
    type: 'range',
    message: 'Assessment ratio must be between 50% and 150%',
    validator: (value) => value === undefined || (value >= 50 && value <= 150)
  },
  {
    field: 'lastAssessmentYear',
    type: 'range',
    message: 'Last assessment year must be between 1900 and current year',
    validator: (value) => {
      if (value === undefined) return true;
      const currentYear = new Date().getFullYear();
      return value >= 1900 && value <= currentYear;
    }
  },
  {
    field: 'marketValue',
    type: 'business',
    message: 'Market value should typically be higher than assessed value',
    validator: (value, allInputs) => {
      if (!value || !allInputs?.assessedValue) return true;
      // Allow market value to be up to 50% lower than assessed (for declining markets)
      return value >= allInputs.assessedValue * 0.5;
    }
  },
  {
    field: 'homesteadExemption',
    type: 'business',
    message: 'Homestead exemption cannot exceed assessed value',
    validator: (value, allInputs) => {
      if (!value || !allInputs?.assessedValue) return true;
      return value <= allInputs.assessedValue;
    }
  },
  {
    field: 'seniorExemption',
    type: 'business',
    message: 'Senior exemption cannot exceed remaining value after homestead exemption',
    validator: (value, allInputs) => {
      if (!value || !allInputs?.assessedValue) return true;
      const homesteadExemption = allInputs.homesteadExemption || 0;
      return value <= (allInputs.assessedValue - homesteadExemption);
    }
  }
];