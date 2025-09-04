import { ValidationRule } from '../../../types/calculator';

export const pmiCancellationValidationRules: ValidationRule[] = [
  // Required field validations
  {
    type: 'required',
    field: 'originalLoanAmount',
    message: 'Original loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'currentLoanBalance',
    message: 'Current loan balance is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'homePurchasePrice',
    message: 'Home purchase price is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'currentHomeValue',
    message: 'Current home value is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    type: 'required',
    field: 'loanType',
    message: 'Loan type is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    type: 'required',
    field: 'loanStartDate',
    message: 'Loan start date is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    type: 'required',
    field: 'originalDownPayment',
    message: 'Original down payment is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    type: 'required',
    field: 'monthlyPMIPayment',
    message: 'Monthly PMI payment is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },

  // Range validations
  {
    type: 'range',
    field: 'originalLoanAmount',
    message: 'Original loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    type: 'range',
    field: 'currentLoanBalance',
    message: 'Current loan balance must be between $0 and $10,000,000',
    validator: (value: any) => value >= 0 && value <= 10000000
  },
  {
    type: 'range',
    field: 'homePurchasePrice',
    message: 'Home purchase price must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    type: 'range',
    field: 'currentHomeValue',
    message: 'Current home value must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    type: 'range',
    field: 'annualPMIRate',
    message: 'Annual PMI rate must be between 0% and 5%',
    validator: (value: any) => value >= 0 && value <= 5
  },
  {
    type: 'range',
    field: 'creditScore',
    message: 'Credit score must be between 300 and 850',
    validator: (value: any) => value >= 300 && value <= 850
  },
  {
    type: 'range',
    field: 'appreciationRate',
    message: 'Annual appreciation rate must be between -10% and 20%',
    validator: (value: any) => value >= -10 && value <= 20
  },

  // Business rule validations
  {
    type: 'business',
    field: 'currentLoanBalance',
    message: 'Current loan balance should not exceed original loan amount',
    validator: (value: any, allInputs: Record<string, any>) => {
      const originalLoanAmount = allInputs.originalLoanAmount || 0;
      return value <= originalLoanAmount;
    }
  },
  {
    type: 'business',
    field: 'originalDownPayment',
    message: 'Down payment should be reasonable relative to home price',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePurchasePrice = allInputs.homePurchasePrice || 0;
      if (homePurchasePrice === 0) return true;
      const downPaymentPercentage = (value / homePurchasePrice) * 100;
      return downPaymentPercentage >= 3 && downPaymentPercentage <= 50;
    }
  },
  {
    type: 'business',
    field: 'monthlyPMIPayment',
    message: 'PMI payment should be reasonable relative to loan amount',
    validator: (value: any, allInputs: Record<string, any>) => {
      const originalLoanAmount = allInputs.originalLoanAmount || 0;
      if (originalLoanAmount === 0) return true;
      const pmiPercentage = (value * 12 / originalLoanAmount) * 100;
      return pmiPercentage >= 0.1 && pmiPercentage <= 2;
    }
  },
  {
    type: 'business',
    field: 'currentHomeValue',
    message: 'Current home value should be reasonable relative to purchase price',
    validator: (value: any, allInputs: Record<string, any>) => {
      const homePurchasePrice = allInputs.homePurchasePrice || 0;
      if (homePurchasePrice === 0) return true;
      const valueChange = ((value - homePurchasePrice) / homePurchasePrice) * 100;
      // Allow for reasonable appreciation/depreciation over time
      return valueChange >= -30 && valueChange <= 200;
    }
  },
  {
    type: 'business',
    field: 'loanStartDate',
    message: 'Loan start date should be in the past',
    validator: (value: any) => {
      const startDate = new Date(value);
      const now = new Date();
      return startDate <= now;
    }
  },
  {
    type: 'business',
    field: 'creditScore',
    message: 'Credit score should be realistic for PMI qualification',
    validator: (value: any) => {
      // PMI typically requires credit scores above 620
      return value >= 620;
    }
  },
  {
    type: 'business',
    field: 'appreciationRate',
    message: 'Appreciation rate should be realistic for long-term planning',
    validator: (value: any) => {
      // Historical appreciation rates and reasonable projections
      return value >= -5 && value <= 15;
    }
  }
];