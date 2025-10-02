import { ValidationRule } from '../../types/calculator';

export const getMortgageRateLockValidationRules = (): ValidationRule[] => [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'loanAmount',
    type: 'range',
    message: 'Loan amount must be between $25,000 and $10,000,000',
    validator: (value) => value >= 25000 && value <= 10000000
  },
  {
    field: 'currentRate',
    type: 'required',
    message: 'Current rate is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'currentRate',
    type: 'range',
    message: 'Current rate must be between 1% and 20%',
    validator: (value) => value >= 1 && value <= 20
  },
  {
    field: 'marketRate',
    type: 'required',
    message: 'Market rate is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'marketRate',
    type: 'range',
    message: 'Market rate must be between 1% and 20%',
    validator: (value) => value >= 1 && value <= 20
  },
  {
    field: 'lockPeriod',
    type: 'required',
    message: 'Lock period is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'lockPeriod',
    type: 'range',
    message: 'Lock period must be between 1 and 180 days',
    validator: (value) => value >= 1 && value <= 180
  },
  {
    field: 'lockCost',
    type: 'range',
    message: 'Lock cost must be between $0 and $10,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'closingDays',
    type: 'required',
    message: 'Days to closing is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'closingDays',
    type: 'range',
    message: 'Days to closing must be between 1 and 365',
    validator: (value) => value >= 1 && value <= 365
  },
  {
    field: 'closingDays',
    type: 'business',
    message: 'Days to closing cannot exceed lock period',
    validator: (value, allInputs) => {
      if (allInputs?.lockPeriod && value > allInputs.lockPeriod) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'expectedRateChange',
    type: 'range',
    message: 'Expected rate change must be between -5% and 5%',
    validator: (value) => value === undefined || (value >= -5 && value <= 5)
  },
  {
    field: 'compareLockPeriod1',
    type: 'range',
    message: 'Comparison lock period 1 must be between 1 and 180 days',
    validator: (value) => value === undefined || (value >= 1 && value <= 180)
  },
  {
    field: 'compareLockPeriod2',
    type: 'range',
    message: 'Comparison lock period 2 must be between 1 and 180 days',
    validator: (value) => value === undefined || (value >= 1 && value <= 180)
  },
  {
    field: 'rateVolatility',
    type: 'range',
    message: 'Rate volatility must be between 0% and 5%',
    validator: (value) => value === undefined || (value >= 0 && value <= 5)
  }
];