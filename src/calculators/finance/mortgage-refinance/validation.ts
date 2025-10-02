import { ValidationRule } from '../../types/calculator';

export const getMortgageRefinanceValidationRules = (): ValidationRule[] => [
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
    field: 'currentRate',
    type: 'required',
    message: 'Current interest rate is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'currentRate',
    type: 'range',
    message: 'Current rate must be between 1% and 20%',
    validator: (value) => value >= 1 && value <= 20
  },
  {
    field: 'currentTermRemaining',
    type: 'required',
    message: 'Current term remaining is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'currentTermRemaining',
    type: 'range',
    message: 'Current term remaining must be between 1 and 50 years',
    validator: (value) => value >= 1 && value <= 50
  },
  {
    field: 'newLoanAmount',
    type: 'required',
    message: 'New loan amount is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'newLoanAmount',
    type: 'range',
    message: 'New loan amount must be between $10,000 and $10,000,000',
    validator: (value) => value >= 10000 && value <= 10000000
  },
  {
    field: 'newRate',
    type: 'required',
    message: 'New interest rate is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'newRate',
    type: 'range',
    message: 'New rate must be between 1% and 20%',
    validator: (value) => value >= 1 && value <= 20
  },
  {
    field: 'newTerm',
    type: 'required',
    message: 'New loan term is required',
    validator: (value) => value !== undefined && value !== null && value > 0
  },
  {
    field: 'newTerm',
    type: 'range',
    message: 'New loan term must be between 5 and 50 years',
    validator: (value) => value >= 5 && value <= 50
  },
  {
    field: 'closingCosts',
    type: 'range',
    message: 'Closing costs must be between $0 and $50,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 50000)
  },
  {
    field: 'appraisalFee',
    type: 'range',
    message: 'Appraisal fee must be between $0 and $2,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 2000)
  },
  {
    field: 'titleInsurance',
    type: 'range',
    message: 'Title insurance must be between $0 and $5,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 5000)
  },
  {
    field: 'originationFee',
    type: 'range',
    message: 'Origination fee must be between $0 and $10,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'cashOut',
    type: 'range',
    message: 'Cash out amount must be between $0 and $500,000',
    validator: (value) => value === undefined || (value >= 0 && value <= 500000)
  },
  {
    field: 'points',
    type: 'range',
    message: 'Discount points must be between 0 and 5',
    validator: (value) => value === undefined || (value >= 0 && value <= 5)
  },
  {
    field: 'pointCost',
    type: 'range',
    message: 'Cost per point must be between $1,000 and $5,000',
    validator: (value) => value === undefined || (value >= 1000 && value <= 5000)
  },
  {
    field: 'homeValue',
    type: 'range',
    message: 'Home value must be between $25,000 and $20,000,000',
    validator: (value) => value === undefined || (value >= 25000 && value <= 20000000)
  },
  {
    field: 'yearsToStay',
    type: 'range',
    message: 'Years to stay must be between 1 and 50',
    validator: (value) => value === undefined || (value >= 1 && value <= 50)
  },
  {
    field: 'newLoanAmount',
    type: 'business',
    message: 'New loan amount cannot exceed home value',
    validator: (value, allInputs) => {
      if (allInputs?.homeValue && value > allInputs.homeValue) {
        return false;
      }
      return true;
    }
  },
  {
    field: 'cashOut',
    type: 'business',
    message: 'Cash out amount cannot exceed available equity',
    validator: (value, allInputs) => {
      if (allInputs?.homeValue && allInputs?.currentLoanBalance && allInputs?.newLoanAmount) {
        const availableEquity = allInputs.homeValue - allInputs.currentLoanBalance;
        const maxCashOut = availableEquity - (allInputs.newLoanAmount - allInputs.currentLoanBalance);
        if (value > maxCashOut) {
          return false;
        }
      }
      return true;
    }
  }
];