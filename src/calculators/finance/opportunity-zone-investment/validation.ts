import { ValidationRule } from '../../../types/calculator';

export const getOpportunityZoneInvestmentValidationRules = (): ValidationRule[] => [
  {
    field: 'initialInvestment',
    type: 'required',
    message: 'Initial investment is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'initialInvestment',
    type: 'range',
    message: 'Initial investment must be between $1,000 and $10,000,000',
    validator: (value) => value >= 1000 && value <= 10000000
  },
  {
    field: 'holdingPeriod',
    type: 'required',
    message: 'Holding period is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'holdingPeriod',
    type: 'range',
    message: 'Holding period must be between 1 and 10 years',
    validator: (value) => value >= 1 && value <= 10
  },
  {
    field: 'appreciationRate',
    type: 'range',
    message: 'Appreciation rate must be between -10% and 30%',
    validator: (value) => value === undefined || (value >= -10 && value <= 30)
  },
  {
    field: 'rentalYield',
    type: 'range',
    message: 'Rental yield must be between 0% and 20%',
    validator: (value) => value === undefined || (value >= 0 && value <= 20)
  },
  {
    field: 'capitalGainsTax',
    type: 'range',
    message: 'Capital gains tax rate must be between 0% and 40%',
    validator: (value) => value === undefined || (value >= 0 && value <= 40)
  },
  {
    field: 'stateTaxRate',
    type: 'range',
    message: 'State tax rate must be between 0% and 15%',
    validator: (value) => value === undefined || (value >= 0 && value <= 15)
  },
  {
    field: 'deferralPeriod',
    type: 'range',
    message: 'Deferral period must be between 1 and 10 years',
    validator: (value) => value === undefined || (value >= 1 && value <= 10)
  },
  {
    field: 'stepUpPercentage',
    type: 'range',
    message: 'Step-up percentage must be between 0% and 20%',
    validator: (value) => value === undefined || (value >= 0 && value <= 20)
  },
  {
    field: 'fullExclusionPercentage',
    type: 'range',
    message: 'Full exclusion percentage must be between 0% and 20%',
    validator: (value) => value === undefined || (value >= 0 && value <= 20)
  },
  {
    field: 'leverageRatio',
    type: 'range',
    message: 'Leverage ratio must be between 0% and 90%',
    validator: (value) => value === undefined || (value >= 0 && value <= 90)
  },
  {
    field: 'interestRate',
    type: 'range',
    message: 'Interest rate must be between 0% and 15%',
    validator: (value) => value === undefined || (value >= 0 && value <= 15)
  },
  {
    field: 'managementFees',
    type: 'range',
    message: 'Management fees must be between 0% and 5%',
    validator: (value) => value === undefined || (value >= 0 && value <= 5)
  },
  {
    field: 'transactionFees',
    type: 'range',
    message: 'Transaction fees must be between 0% and 5%',
    validator: (value) => value === undefined || (value >= 0 && value <= 5)
  },
  {
    field: 'holdingPeriod',
    type: 'business',
    message: 'Holding period must be at least 5 years for Opportunity Zone benefits',
    validator: (value) => value >= 5
  },
  {
    field: 'holdingPeriod',
    type: 'business',
    message: 'Holding period must be at least 7 years for full tax benefits',
    validator: (value) => value >= 7
  }
];