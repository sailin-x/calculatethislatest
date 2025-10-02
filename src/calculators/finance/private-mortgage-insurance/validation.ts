import { ValidationRule } from '../../types/calculator';

export const getPrivateMortgageInsuranceValidationRules = (): ValidationRule[] => [
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
    field: 'downPayment',
    type: 'required',
    message: 'Down payment is required',
    validator: (value) => value !== undefined && value !== null && value >= 0
  },
  {
    field: 'homeValue',
    type: 'required',
    message: 'Home value is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'homeValue',
    type: 'range',
    message: 'Home value must be between $25,000 and $20,000,000',
    validator: (value) => value >= 25000 && value <= 20000000
  },
  {
    field: 'downPayment',
    type: 'business',
    message: 'Down payment cannot exceed home value',
    validator: (value, allInputs) => {
      if (allInputs?.homeValue && value > allInputs.homeValue) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'loanAmount',
    type: 'business',
    message: 'Loan amount cannot exceed home value',
    validator: (value, allInputs) => {
      if (allInputs?.homeValue && value > allInputs.homeValue) {
        return false;
      }
      return true;
    }
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
    message: 'PMI rate must be between 0.1% and 2.0%',
    validator: (value) => value >= 0.1 && value <= 2.0
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
    field: 'currentLoanBalance',
    type: 'range',
    message: 'Current loan balance must be between $10,000 and $10,000,000',
    validator: (value) => value === undefined || (value >= 10000 && value <= 10000000)
  },
  {
    field: 'yearsOwned',
    type: 'range',
    message: 'Years owned must be between 0 and 50',
    validator: (value) => value === undefined || (value >= 0 && value <= 50)
  },
  {
    field: 'compareRate1',
    type: 'range',
    message: 'Comparison PMI rate 1 must be between 0.1% and 2.0%',
    validator: (value) => value === undefined || (value >= 0.1 && value <= 2.0)
  },
  {
    field: 'compareRate2',
    type: 'range',
    message: 'Comparison PMI rate 2 must be between 0.1% and 2.0%',
    validator: (value) => value === undefined || (value >= 0.1 && value <= 2.0)
  },
  {
    field: 'currentLoanBalance',
    type: 'business',
    message: 'Current loan balance cannot exceed original loan amount',
    validator: (value, allInputs) => {
      if (allInputs?.loanAmount && value > allInputs.loanAmount) {
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