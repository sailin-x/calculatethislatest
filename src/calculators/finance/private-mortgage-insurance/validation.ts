import { ValidationRule } from '../../../types/calculator';

export const privateMortgageInsuranceValidationRules: ValidationRule[] = [
  // Required validations
  {
    type: 'required',
    field: 'loanAmount',
    message: 'Loan amount is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'homeValue',
    message: 'Home value is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'downPayment',
    message: 'Down payment is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'pmiRate',
    message: 'PMI rate is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'loanType',
    message: 'Loan type is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },
  {
    type: 'required',
    field: 'loanTerm',
    message: 'Loan term is required',
    validator: (value: any) => value !== undefined && value !== null && value !== ''
  },

  // Range validations
  {
    type: 'range',
    field: 'loanAmount',
    message: 'Loan amount must be between $10,000 and $10,000,000',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 10000 && num <= 10000000;
    }
  },
  {
    type: 'range',
    field: 'homeValue',
    message: 'Home value must be between $10,000 and $50,000,000',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 10000 && num <= 50000000;
    }
  },
  {
    type: 'range',
    field: 'downPayment',
    message: 'Down payment must be between $0 and home value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const downPayment = Number(value);
      const homeValue = Number(allInputs.homeValue);
      return !isNaN(downPayment) && downPayment >= 0 && downPayment <= homeValue;
    }
  },
  {
    type: 'range',
    field: 'pmiRate',
    message: 'PMI rate must be between 0.1% and 2.0%',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 0.1 && num <= 2.0;
    }
  },
  {
    type: 'range',
    field: 'creditScore',
    message: 'Credit score must be between 300 and 850',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 300 && num <= 850;
    }
  },
  {
    type: 'range',
    field: 'loanTerm',
    message: 'Loan term must be between 10 and 50 years',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 10 && num <= 50;
    }
  },
  {
    type: 'range',
    field: 'annualAppreciation',
    message: 'Annual appreciation rate must be between -10% and 20%',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= -10 && num <= 20;
    }
  },
  {
    type: 'range',
    field: 'monthlyPayment',
    message: 'Monthly payment must be between $0 and $50,000',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 50000;
    }
  },
  {
    type: 'range',
    field: 'interestRate',
    message: 'Interest rate must be between 0.1% and 20%',
    validator: (value: any) => {
      if (value === undefined || value === null || value === '') return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 0.1 && num <= 20;
    }
  },

  // Business rule validations
  {
    type: 'business',
    field: 'loanAmount',
    message: 'Loan amount cannot exceed home value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const loanAmount = Number(value);
      const homeValue = Number(allInputs.homeValue);
      return !isNaN(loanAmount) && !isNaN(homeValue) && loanAmount <= homeValue;
    }
  },
  {
    type: 'business',
    field: 'downPayment',
    message: 'Down payment plus loan amount should equal home value',
    validator: (value: any, allInputs: Record<string, any>) => {
      const downPayment = Number(value);
      const loanAmount = Number(allInputs.loanAmount);
      const homeValue = Number(allInputs.homeValue);
      
      if (isNaN(downPayment) || isNaN(loanAmount) || isNaN(homeValue)) {
        return true; // Skip validation if we don't have valid data
      }
      
      const difference = Math.abs((downPayment + loanAmount) - homeValue);
      return difference <= 1000; // Allow $1000 tolerance for rounding
    }
  },
  {
    type: 'business',
    field: 'pmiRate',
    message: 'PMI rate should be appropriate for the loan type and credit score',
    validator: (value: any, allInputs: Record<string, any>) => {
      const pmiRate = Number(value);
      const creditScore = Number(allInputs.creditScore);
      const loanType = allInputs.loanType;
      
      if (isNaN(pmiRate)) return true;
      
      // FHA loans typically have higher MIP rates
      if (loanType === 'fha' && pmiRate < 0.5) {
        return false; // FHA MIP is usually higher
      }
      
      // Conventional loans with excellent credit should have lower PMI rates
      if (loanType === 'conventional' && creditScore >= 750 && pmiRate > 1.0) {
        return false; // Excellent credit should get lower PMI rate
      }
      
      return true;
    }
  }
];