import { ValidationRule } from '../../../types/calculator';

export const mortgageQualificationValidationRules: ValidationRule[] = [
  {
    field: 'borrowerIncome',
    type: 'required',
    message: 'Borrower income is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'borrowerCreditScore',
    type: 'required',
    message: 'Borrower credit score is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'propertyValue',
    type: 'required',
    message: 'Property value is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'loanAmount',
    type: 'required',
    message: 'Loan amount is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'interestRate',
    type: 'required',
    message: 'Interest rate is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'loanTerm',
    type: 'required',
    message: 'Loan term is required',
    validator: (value: any) => value !== null && value !== undefined && value > 0
  },
  {
    field: 'downPayment',
    type: 'required',
    message: 'Down payment is required',
    validator: (value: any) => value !== null && value !== undefined && value >= 0
  },
  {
    field: 'borrowerIncome',
    type: 'range',
    message: 'Borrower income must be between $10,000 and $1,000,000',
    validator: (value: any) => value >= 10000 && value <= 1000000
  },
  {
    field: 'coBorrowerIncome',
    type: 'range',
    message: 'Co-borrower income must be between $0 and $1,000,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 1000000)
  },
  {
    field: 'borrowerCreditScore',
    type: 'range',
    message: 'Credit score must be between 300 and 850',
    validator: (value: any) => value >= 300 && value <= 850
  },
  {
    field: 'coBorrowerCreditScore',
    type: 'range',
    message: 'Co-borrower credit score must be between 300 and 850',
    validator: (value: any) => value === null || value === undefined || (value >= 300 && value <= 850)
  },
  {
    field: 'borrowerEmploymentLength',
    type: 'range',
    message: 'Employment length must be between 0 and 50 years',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50)
  },
  {
    field: 'propertyValue',
    type: 'range',
    message: 'Property value must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'loanAmount',
    type: 'range',
    message: 'Loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => value >= 10000 && value <= 10000000
  },
  {
    field: 'interestRate',
    type: 'range',
    message: 'Interest rate must be between 0% and 20%',
    validator: (value: any) => value >= 0 && value <= 20
  },
  {
    field: 'loanTerm',
    type: 'range',
    message: 'Loan term must be between 1 and 50 years',
    validator: (value: any) => value >= 1 && value <= 50
  },
  {
    field: 'downPayment',
    type: 'range',
    message: 'Down payment must be between $0 and $10,000,000',
    validator: (value: any) => value >= 0 && value <= 10000000
  },
  {
    field: 'propertyTaxes',
    type: 'range',
    message: 'Property taxes must be between $0 and $50,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 50000)
  },
  {
    field: 'propertyInsurance',
    type: 'range',
    message: 'Property insurance must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'hoaFees',
    type: 'range',
    message: 'HOA fees must be between $0 and $2,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 2000)
  },
  {
    field: 'creditCardDebt',
    type: 'range',
    message: 'Credit card debt must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'autoLoanDebt',
    type: 'range',
    message: 'Auto loan debt must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'studentLoanDebt',
    type: 'range',
    message: 'Student loan debt must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'otherDebt',
    type: 'range',
    message: 'Other debt must be between $0 and $10,000',
    validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 10000)
  },
  {
    field: 'loanAmount',
    type: 'business',
    message: 'Loan amount plus down payment should equal property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const propertyValue = allInputs?.propertyValue || 0;
      const downPayment = allInputs?.downPayment || 0;
      if (propertyValue === 0) return true; // Property value not provided
      return Math.abs((value + downPayment) - propertyValue) < 1000; // Allow small rounding differences
    }
  },
  {
    field: 'downPayment',
    type: 'business',
    message: 'Down payment should not exceed property value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const propertyValue = allInputs?.propertyValue || 0;
      if (propertyValue === 0) return true; // Property value not provided
      return value <= propertyValue;
    }
  },
  {
    field: 'borrowerIncome',
    type: 'business',
    message: 'Income seems unusually low for mortgage qualification',
    validator: (value: any) => value >= 25000 // Warning for very low income
  },
  {
    field: 'borrowerCreditScore',
    type: 'business',
    message: 'Credit score may limit loan options',
    validator: (value: any) => value >= 620 // Warning for scores below conventional minimum
  },
  {
    field: 'interestRate',
    type: 'business',
    message: 'Interest rate seems unusually high',
    validator: (value: any) => value <= 15 // Warning for rates above 15%
  }
];