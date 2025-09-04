import { ValidationRule } from '../../../types/calculator';

export const netOperatingIncomeValidationRules: ValidationRule[] = [
  // Required field validations
  {
    type: 'required',
    field: 'baseRent',
    message: 'Base monthly rent is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'vacancyRate',
    message: 'Vacancy rate is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'propertyManagementFee',
    message: 'Property management fee is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'maintenanceCosts',
    message: 'Monthly maintenance costs are required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'propertyTaxes',
    message: 'Annual property taxes are required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'propertyInsurance',
    message: 'Annual property insurance is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },

  // Range validations
  {
    type: 'range',
    field: 'baseRent',
    message: 'Base rent must be between $100 and $100,000',
    validator: (value: any) => value >= 100 && value <= 100000
  },
  {
    type: 'range',
    field: 'additionalIncome',
    message: 'Additional income must be between $0 and $50,000',
    validator: (value: any) => value >= 0 && value <= 50000
  },
  {
    type: 'range',
    field: 'vacancyRate',
    message: 'Vacancy rate must be between 0% and 100%',
    validator: (value: any) => value >= 0 && value <= 100
  },
  {
    type: 'range',
    field: 'propertyManagementFee',
    message: 'Property management fee must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    type: 'range',
    field: 'maintenanceCosts',
    message: 'Maintenance costs must be between $0 and $50,000',
    validator: (value: any) => value >= 0 && value <= 50000
  },
  {
    type: 'range',
    field: 'propertyTaxes',
    message: 'Property taxes must be between $0 and $500,000',
    validator: (value: any) => value >= 0 && value <= 500000
  },
  {
    type: 'range',
    field: 'propertyInsurance',
    message: 'Property insurance must be between $0 and $100,000',
    validator: (value: any) => value >= 0 && value <= 100000
  },
  {
    type: 'range',
    field: 'utilities',
    message: 'Utilities must be between $0 and $10,000',
    validator: (value: any) => value >= 0 && value <= 10000
  },
  {
    type: 'range',
    field: 'hoaFees',
    message: 'HOA fees must be between $0 and $5,000',
    validator: (value: any) => value >= 0 && value <= 5000
  },
  {
    type: 'range',
    field: 'legalFees',
    message: 'Legal fees must be between $0 and $10,000',
    validator: (value: any) => value >= 0 && value <= 10000
  },
  {
    type: 'range',
    field: 'accountingFees',
    message: 'Accounting fees must be between $0 and $10,000',
    validator: (value: any) => value >= 0 && value <= 10000
  },
  {
    type: 'range',
    field: 'advertisingCosts',
    message: 'Advertising costs must be between $0 and $5,000',
    validator: (value: any) => value >= 0 && value <= 5000
  },
  {
    type: 'range',
    field: 'otherExpenses',
    message: 'Other expenses must be between $0 and $50,000',
    validator: (value: any) => value >= 0 && value <= 50000
  },
  {
    type: 'range',
    field: 'propertyValue',
    message: 'Property value must be between $10,000 and $50,000,000',
    validator: (value: any) => value === 0 || (value >= 10000 && value <= 50000000)
  },

  // Business rule validations
  {
    type: 'business',
    field: 'vacancyRate',
    message: 'Vacancy rate should typically be between 2% and 15% for most markets',
    validator: (value: any) => value >= 2 && value <= 15
  },
  {
    type: 'business',
    field: 'operatingExpenseRatio',
    message: 'Operating expense ratio should typically be between 35% and 65%',
    validator: (value: any, allInputs: Record<string, any>) => {
      const baseRent = allInputs.baseRent || 0;
      const additionalIncome = allInputs.additionalIncome || 0;
      const vacancyRate = allInputs.vacancyRate || 0;
      const effectiveGrossIncome = (baseRent + additionalIncome) * (1 - vacancyRate / 100);
      
      if (effectiveGrossIncome === 0) return true;
      
      const totalExpenses = calculateTotalExpenses(allInputs);
      const ratio = (totalExpenses / effectiveGrossIncome) * 100;
      return ratio >= 35 && ratio <= 65;
    }
  },
  {
    type: 'business',
    field: 'propertyManagementFee',
    message: 'Property management fees typically range from 6% to 12%',
    validator: (value: any) => value >= 6 && value <= 12
  },
  {
    type: 'business',
    field: 'maintenanceCosts',
    message: 'Maintenance costs should typically be 1-3% of gross income annually',
    validator: (value: any, allInputs: Record<string, any>) => {
      const baseRent = allInputs.baseRent || 0;
      const additionalIncome = allInputs.additionalIncome || 0;
      const grossIncome = baseRent + additionalIncome;
      
      if (grossIncome === 0) return true;
      
      const annualMaintenance = value * 12;
      const maintenanceRatio = (annualMaintenance / grossIncome) * 100;
      return maintenanceRatio >= 1 && maintenanceRatio <= 3;
    }
  }
];

// Helper function for calculating total expenses
function calculateTotalExpenses(inputs: Record<string, any>): number {
  const {
    propertyManagementFee = 0,
    maintenanceCosts = 0,
    propertyTaxes = 0,
    propertyInsurance = 0,
    utilities = 0,
    hoaFees = 0,
    legalFees = 0,
    accountingFees = 0,
    advertisingCosts = 0,
    otherExpenses = 0
  } = inputs;
  
  const baseRent = inputs.baseRent || 0;
  const additionalIncome = inputs.additionalIncome || 0;
  const vacancyRate = inputs.vacancyRate || 0;
  const effectiveGrossIncome = (baseRent + additionalIncome) * (1 - vacancyRate / 100);
  
  const propertyManagementCost = effectiveGrossIncome * (propertyManagementFee / 100);
  
  return propertyManagementCost + maintenanceCosts + (propertyTaxes / 12) + (propertyInsurance / 12) + utilities + hoaFees + legalFees + accountingFees + advertisingCosts + otherExpenses;
}