import { ValidationRule } from '../../../types/calculator';

export const mortgageRefinanceValidationRules: ValidationRule[] = [
  {
    field: 'currentLoanAmount',
    type: 'required',
    message: 'Current loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'currentInterestRate',
    type: 'required',
    message: 'Current interest rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'currentRemainingTerm',
    type: 'required',
    message: 'Current remaining term is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'currentMonthlyPayment',
    type: 'required',
    message: 'Current monthly payment is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'newLoanAmount',
    type: 'required',
    message: 'New loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'newInterestRate',
    type: 'required',
    message: 'New interest rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'newLoanTerm',
    type: 'required',
    message: 'New loan term is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'refinanceType',
    type: 'required',
    message: 'Refinance type is required',
    validator: (value: any) => value !== null && value !== undefined
  },
  {
    field: 'propertyValue',
    type: 'required',
    message: 'Property value is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'closingCosts',
    type: 'required',
    message: 'Closing costs are required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    field: 'currentLoanAmount',
    type: 'range',
    message: 'Current loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'currentInterestRate',
    type: 'range',
    message: 'Current interest rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'currentRemainingTerm',
    type: 'range',
    message: 'Current remaining term must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    field: 'newLoanAmount',
    type: 'range',
    message: 'New loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'newInterestRate',
    type: 'range',
    message: 'New interest rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'newLoanTerm',
    type: 'range',
    message: 'New loan term must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    field: 'propertyValue',
    type: 'range',
    message: 'Property value must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'closingCosts',
    type: 'range',
    message: 'Closing costs must be between $0 and $50,000',
    validator: (value: any) => value >= 0 && value <= 50000
  },
  {
    field: 'originationFee',
    type: 'range',
    message: 'Origination fee must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'appraisalFee',
    type: 'range',
    message: 'Appraisal fee must be between $0 and $5,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 5000)
  },
  {
    field: 'titleInsuranceFee',
    type: 'range',
    message: 'Title insurance fee must be between $0 and $5,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 5000)
  },
  {
    field: 'borrowerIncome',
    type: 'range',
    message: 'Borrower income must be between $10,000 and $1,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 10000 && value <= 1000000)
  },
  {
    field: 'borrowerCreditScore',
    type: 'range',
    message: 'Borrower credit score must be between 300 and 850',
    validator: (value: any) => value === null || value === undefined || (value >= 300 && value <= 850)
  },
  {
    field: 'borrowerTaxRate',
    type: 'range',
    message: 'Borrower tax rate must be between 0% and 50%',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50)
  },
  {
    field: 'targetMonthlySavings',
    type: 'range',
    message: 'Target monthly savings must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'cashOutAmount',
    type: 'range',
    message: 'Cash out amount must be between $0 and $1,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 1000000)
  },
  {
    field: 'newLoanAmount',
    type: 'business',
    message: 'New loan amount should not exceed property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const propertyValue = allInputs?.propertyValue || 0;
      if (propertyValue === 0) return true; // Property value not provided
      return value <= propertyValue;
    }
  },
  {
    field: 'newInterestRate',
    type: 'business',
    message: 'New interest rate should be lower than current rate for savings',
    validator: (value: any, allInputs: Record<string, any>) => {
      const currentRate = allInputs?.currentInterestRate || 0;
      if (currentRate === 0) return true; // Current rate not provided
      return value < currentRate;
    }
  },
  {
    field: 'closingCosts',
    type: 'business',
    message: 'Closing costs seem unusually high',
    validator: (value: any) => value <= 10000 // Warning for costs above $10,000
  },
  {
    field: 'currentRemainingTerm',
    type: 'business',
    message: 'Current remaining term should not exceed original loan term',
    validator: (value: any, allInputs: Record<string, any>) => {
      const currentLoanTerm = allInputs?.currentLoanTerm || 0;
      if (currentLoanTerm === 0) return true; // Current loan term not provided
      return value <= currentLoanTerm;
    }
  },
  {
    field: 'cashOutAmount',
    type: 'business',
    message: 'Cash out amount should not exceed new loan amount',
    validator: (value: any, allInputs: Record<string, any>) => {
      const newLoanAmount = allInputs?.newLoanAmount || 0;
      if (newLoanAmount === 0) return true; // New loan amount not provided
      return value <= newLoanAmount;
    }
  }
];