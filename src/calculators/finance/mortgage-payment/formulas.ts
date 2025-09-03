import { Formula, CalculationResult } from '../../../types/calculator';

export const mortgagePaymentFormulas: Formula[] = [
  {
    id: 'monthly-payment',
    name: 'Monthly Payment Calculation',
    description: 'Calculate monthly mortgage payment using standard amortization formula',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      if (monthlyRate === 0) {
        const monthlyPayment = loanAmount / totalPayments;
        return {
          outputs: { monthlyPayment: Math.round(monthlyPayment) },
          explanation: `Monthly payment with 0% interest: $${monthlyPayment.toLocaleString()}`,
          intermediateSteps: { monthlyRate, totalPayments }
        };
      }
      
      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      return {
        outputs: { monthlyPayment: Math.round(monthlyPayment) },
        explanation: `Monthly payment: $${monthlyPayment.toLocaleString()}`,
        intermediateSteps: { monthlyRate, totalPayments }
      };
    }
  },
  
  {
    id: 'total-interest',
    name: 'Total Interest Calculation',
    description: 'Calculate total interest paid over the loan term',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      if (monthlyRate === 0) {
        return {
          outputs: { totalInterest: 0 },
          explanation: 'No interest paid with 0% interest rate',
          intermediateSteps: { monthlyRate, totalPayments }
        };
      }
      
      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
      
      return {
        outputs: { totalInterest: Math.round(totalInterest) },
        explanation: `Total interest paid: $${totalInterest.toLocaleString()}`,
        intermediateSteps: { monthlyPayment: Math.round(monthlyPayment), totalPayments }
      };
    }
  },
  
  {
    id: 'loan-to-value',
    name: 'Loan-to-Value Ratio',
    description: 'Calculate LTV ratio as percentage of loan to property value',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const homePrice = inputs.homePrice || 0;
      
      if (homePrice === 0) {
        return {
          outputs: { ltv: 0 },
          explanation: 'Home price not provided, cannot calculate LTV',
          intermediateSteps: { loanAmount, homePrice }
        };
      }
      
      const ltv = (loanAmount / homePrice) * 100;
      
      return {
        outputs: { ltv: Math.round(ltv * 100) / 100 },
        explanation: `Loan-to-Value ratio: ${ltv.toFixed(1)}%`,
        intermediateSteps: { loanAmount, homePrice }
      };
    }
  },
  
  {
    id: 'total-monthly-payment',
    name: 'Total Monthly Payment',
    description: 'Calculate total monthly payment including taxes, insurance, and fees',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const propertyTaxes = inputs.propertyTaxes || 0;
      const homeownersInsurance = inputs.homeownersInsurance || 0;
      const pmi = inputs.pmi || 0;
      const hoaFees = inputs.hoaFees || 0;
      
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        monthlyPayment = loanAmount / totalPayments;
      }
      
      const monthlyPropertyTaxes = propertyTaxes / 12;
      const monthlyHomeownersInsurance = homeownersInsurance / 12;
      
      const totalMonthlyPayment = monthlyPayment + monthlyPropertyTaxes + monthlyHomeownersInsurance + pmi + hoaFees;
      
      return {
        outputs: { totalMonthlyPayment: Math.round(totalMonthlyPayment) },
        explanation: `Total monthly payment: $${totalMonthlyPayment.toLocaleString()}`,
        intermediateSteps: { 
          monthlyPayment: Math.round(monthlyPayment), 
          monthlyPropertyTaxes: Math.round(monthlyPropertyTaxes),
          monthlyHomeownersInsurance: Math.round(monthlyHomeownersInsurance)
        }
      };
    }
  },
  
  {
    id: 'payoff-time-extra-payments',
    name: 'Payoff Time with Extra Payments',
    description: 'Calculate how long it takes to pay off loan with additional monthly payments',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const loanAmount = inputs.loanAmount || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const extraPayment = inputs.extraPayment || 0;
      
      if (extraPayment <= 0) {
        return {
          outputs: { payoffTime: loanTerm },
          explanation: `No extra payments, loan will be paid off in ${loanTerm} years`,
          intermediateSteps: { extraPayment, loanTerm }
        };
      }
      
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        monthlyPayment = loanAmount / totalPayments;
      }
      
      const totalMonthlyPayment = monthlyPayment + extraPayment;
      const monthlyPrincipalPayment = totalMonthlyPayment - (loanAmount * monthlyRate);
      
      if (monthlyPrincipalPayment <= 0) {
        return {
          outputs: { payoffTime: 999 },
          explanation: 'Extra payment too small to make meaningful difference',
          intermediateSteps: { monthlyPayment: Math.round(monthlyPayment), extraPayment }
        };
      }
      
      const payoffTime = Math.log(totalMonthlyPayment / monthlyPrincipalPayment) / Math.log(1 + monthlyRate) / 12;
      
      return {
        outputs: { payoffTime: Math.round(payoffTime * 10) / 10 },
        explanation: `Loan will be paid off in ${payoffTime.toFixed(1)} years with extra payments`,
        intermediateSteps: { 
          monthlyPayment: Math.round(monthlyPayment), 
          extraPayment,
          monthlyPrincipalPayment: Math.round(monthlyPrincipalPayment)
        }
      };
    }
  }
];