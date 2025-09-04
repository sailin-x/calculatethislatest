import { ValidationRule } from '../../../types/calculator';

export const mortgageRateLockValidationRules: ValidationRule[] = [
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'lockedRate',
    type: 'required',
    message: 'Locked rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'currentMarketRate',
    type: 'required',
    message: 'Current market rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'loanTerm',
    type: 'required',
    message: 'Loan term is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'loanType',
    type: 'required',
    message: 'Loan type is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'paymentType',
    type: 'required',
    message: 'Payment type is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'lockDate',
    type: 'required',
    message: 'Lock date is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'lockExpirationDate',
    type: 'required',
    message: 'Lock expiration date is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'lockType',
    type: 'required',
    message: 'Lock type is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'propertyValue',
    type: 'required',
    message: 'Property value is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'propertyType',
    type: 'required',
    message: 'Property type is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'estimatedClosingDate',
    type: 'required',
    message: 'Estimated closing date is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'loanAmount',
    type: 'range',
    message: 'Loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'lockedRate',
    type: 'range',
    message: 'Locked rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'currentMarketRate',
    type: 'range',
    message: 'Current market rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'loanTerm',
    type: 'range',
    message: 'Loan term must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    field: 'propertyValue',
    type: 'range',
    message: 'Property value must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'lockDuration',
    type: 'range',
    message: 'Lock duration must be between 1 and 365 days',
    validator: (value: any) => value === null || value === undefined || (value >= 1 && value <= 365)
  },
  {
    field: 'lockFee',
    type: 'range',
    message: 'Lock fee must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'maxRateIncrease',
    type: 'range',
    message: 'Maximum rate increase must be between 0% and 10%',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10)
  },
  {
    field: 'lockExpirationDate',
    type: 'business',
    message: 'Lock expiration date should be after lock date',
    validator: (value: any, allInputs: Record<string, any>) => {
      const lockDate = allInputs?.lockDate ? new Date(allInputs.lockDate) : null;
      const expirationDate = value ? new Date(value) : null;
      if (!lockDate || !expirationDate) return true;
      return expirationDate > lockDate;
    }
  },
  {
    field: 'estimatedClosingDate',
    type: 'business',
    message: 'Estimated closing date should be before lock expiration',
    validator: (value: any, allInputs: Record<string, any>) => {
      const expirationDate = allInputs?.lockExpirationDate ? new Date(allInputs.lockExpirationDate) : null;
      const closingDate = value ? new Date(value) : null;
      if (!expirationDate || !closingDate) return true;
      return closingDate <= expirationDate;
    }
  },
  {
    field: 'lockDate',
    type: 'business',
    message: 'Lock date should not be in the future',
    validator: (value: any) => {
      const lockDate = value ? new Date(value) : null;
      const today = new Date();
      if (!lockDate) return true;
      return lockDate <= today;
    }
  },
  {
    field: 'propertyValue',
    type: 'business',
    message: 'Property value should be greater than loan amount',
    validator: (value: any, allInputs: Record<string, any>) => {
      const loanAmount = allInputs?.loanAmount || 0;
      if (value === 0) return true; // Property value not provided
      return value >= loanAmount;
    }
  },
  {
    field: 'lockedRate',
    type: 'business',
    message: 'Locked rate seems unusually high',
    validator: (value: any) => value <= 15 // Warning for rates above 15%
  },
  {
    field: 'currentMarketRate',
    type: 'business',
    message: 'Current market rate seems unusually high',
    validator: (value: any) => value <= 15 // Warning for rates above 15%
  }
];