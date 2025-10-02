import { ValidationRule } from '../../types/calculator';

export const getPmiCancellationValidationRules = (): ValidationRule[] => [
  {
    field: 'originalLoanAmount',
    type: 'required',
    message: 'Original loan amount is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'originalLoanAmount',
    type: 'range',
    message: 'Original loan amount must be between $25,000 and $10,000,000',
    validator: (value) => value >= 25000 && value <= 10000000
  },
  {
    field: 'currentLoanBalance',
    type: 'required',
    message: 'Current loan balance is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'currentLoanBalance',
    type: 'range',
    message: 'Current loan balance must be between $10,000 and $10,000,000',
    validator: (value) => value >= 10000 && value <= 10000000
  },
  {
    field: 'currentHomeValue',
    type: 'required',
    message: 'Current home value is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'currentHomeValue',
    type: 'range',
    message: 'Current home value must be between $25,000 and $20,000,000',
    validator: (value) => value >= 25000 && value <= 20000000
  },
  {
    field: 'pmiRate',
    type: 'required',
    message: 'PMI rate is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'pmiRate',
    type: 'range',
    message: 'PMI rate must be between 0.1% and 2%',
    validator: (value) => value >= 0.1 && value <= 2
  },
  {
    field: 'monthlyPmiPayment',
    type: 'range',
    message: 'Monthly PMI payment must be between $10 and $500',
    validator: (value) => value === undefined || (value >= 10 && value <= 500)
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
    message: 'Loan term must be between 5 and 50 years',
    validator: (value) => value >= 5 && value <= 50
  },
  {
    field: 'yearsOwned',
    type: 'required',
    message: 'Years owned is required',
    validator: (value) => value !== undefined && value !== null && value >= 0
  },
  {
    field: 'yearsOwned',
    type: 'range',
    message: 'Years owned must be between 0 and 50',
    validator: (value) => value >= 0 && value <= 50
  },
  {
    field: 'cancellationType',
    type: 'required',
    message: 'Cancellation type is required',
    validator: (value) => value !== undefined && value !== null && value !== ''
  },
  {
    field: 'homeAppreciation',
    type: 'range',
    message: 'Home appreciation must be between -10% and 20%',
    validator: (value) => value === undefined || (value >= -10 && value <= 20)
  },
  {
    field: 'yearsToCancel',
    type: 'range',
    message: 'Years to cancel must be between 0 and 30',
    validator: (value) => value === undefined || (value >= 0 && value <= 30)
  },
  {
    field: 'currentLoanBalance',
    type: 'business',
    message: 'Current loan balance cannot exceed home value',
    validator: (value, allInputs) => {
      if (allInputs?.currentHomeValue && value > allInputs.currentHomeValue) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'yearsOwned',
    type: 'business',
    message: 'Years owned cannot exceed loan term',
    validator: (value, allInputs) => {
      if (allInputs?.loanTerm && value > allInputs.loanTerm) {
        return false;
      }
      return true;
    }
  }
];