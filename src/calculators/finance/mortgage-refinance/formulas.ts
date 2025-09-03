import { Formula, CalculationResult } from '../../../types/calculator';

export const mortgageRefinanceFormulas: Formula[] = [
  {
    id: 'payment-savings-calculation',
    name: 'Payment Savings Calculation',
    description: 'Calculate monthly and annual payment savings from refinancing',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const currentMonthlyPayment = inputs.currentMonthlyPayment || 0;
      const newLoanAmount = inputs.newLoanAmount || 0;
      const newInterestRate = (inputs.newInterestRate || 0) / 100;
      const newLoanTerm = inputs.newLoanTerm || 30;
      
      const monthlyRate = newInterestRate / 12;
      const totalPayments = newLoanTerm * 12;
      
      let newMonthlyPayment = 0;
      if (monthlyRate > 0) {
        newMonthlyPayment = (newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        newMonthlyPayment = newLoanAmount / totalPayments;
      }
      
      const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
      const monthlyPaymentSavings = monthlyPaymentDifference > 0 ? monthlyPaymentDifference : 0;
      const annualPaymentSavings = monthlyPaymentSavings * 12;
      
      return {
        outputs: {
          currentMonthlyPayment: Math.round(currentMonthlyPayment),
          newMonthlyPayment: Math.round(newMonthlyPayment),
          monthlyPaymentDifference: Math.round(monthlyPaymentDifference),
          monthlyPaymentSavings: Math.round(monthlyPaymentSavings),
          annualPaymentSavings: Math.round(annualPaymentSavings)
        },
        explanation: `Monthly payment savings: $${monthlyPaymentSavings.toLocaleString()}. Annual savings: $${annualPaymentSavings.toLocaleString()}.`,
        intermediateSteps: {
          monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
          totalPayments
        }
      };
    }
  },
  {
    id: 'interest-savings-calculation',
    name: 'Interest Savings Calculation',
    description: 'Calculate total interest savings from refinancing',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const currentLoanAmount = inputs.currentLoanAmount || 0;
      const currentInterestRate = (inputs.currentInterestRate || 0) / 100;
      const currentRemainingTerm = inputs.currentRemainingTerm || 0;
      const newLoanAmount = inputs.newLoanAmount || 0;
      const newInterestRate = (inputs.newInterestRate || 0) / 100;
      const newLoanTerm = inputs.newLoanTerm || 30;
      
      const currentTotalInterest = calculateTotalInterest(currentLoanAmount, currentInterestRate, currentRemainingTerm);
      const newTotalInterest = calculateTotalInterest(newLoanAmount, newInterestRate, newLoanTerm);
      const interestSavings = currentTotalInterest - newTotalInterest;
      const interestSavingsPercentage = currentTotalInterest > 0 ? (interestSavings / currentTotalInterest) * 100 : 0;
      
      return {
        outputs: {
          currentTotalInterest: Math.round(currentTotalInterest),
          newTotalInterest: Math.round(newTotalInterest),
          interestSavings: Math.round(interestSavings),
          interestSavingsPercentage: Math.round(interestSavingsPercentage * 100) / 100
        },
        explanation: `Interest savings: $${interestSavings.toLocaleString()}. Savings percentage: ${interestSavingsPercentage.toFixed(1)}%.`,
        intermediateSteps: {
          currentInterestRate: Math.round(currentInterestRate * 1000000) / 1000000,
          newInterestRate: Math.round(newInterestRate * 1000000) / 1000000,
          currentRemainingTerm,
          newLoanTerm
        }
      };
    }
  },
  {
    id: 'break-even-analysis',
    name: 'Break-Even Analysis',
    description: 'Calculate break-even point for refinance costs',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const currentMonthlyPayment = inputs.currentMonthlyPayment || 0;
      const newLoanAmount = inputs.newLoanAmount || 0;
      const newInterestRate = (inputs.newInterestRate || 0) / 100;
      const newLoanTerm = inputs.newLoanTerm || 30;
      const closingCosts = inputs.closingCosts || 0;
      
      const monthlyRate = newInterestRate / 12;
      const totalPayments = newLoanTerm * 12;
      
      let newMonthlyPayment = 0;
      if (monthlyRate > 0) {
        newMonthlyPayment = (newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        newMonthlyPayment = newLoanAmount / totalPayments;
      }
      
      const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
      const monthlyPaymentSavings = monthlyPaymentDifference > 0 ? monthlyPaymentDifference : 0;
      
      const breakEvenMonths = monthlyPaymentSavings > 0 ? Math.ceil(closingCosts / monthlyPaymentSavings) : 0;
      const breakEvenYears = breakEvenMonths / 12;
      
      return {
        outputs: {
          breakEvenMonths,
          breakEvenYears: Math.round(breakEvenYears * 10) / 10,
          closingCosts: Math.round(closingCosts),
          monthlyPaymentSavings: Math.round(monthlyPaymentSavings)
        },
        explanation: `Break-even point: ${breakEvenMonths} months (${breakEvenYears.toFixed(1)} years). Monthly savings: $${monthlyPaymentSavings.toLocaleString()}.`,
        intermediateSteps: {
          monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
          totalPayments,
          newMonthlyPayment: Math.round(newMonthlyPayment)
        }
      };
    }
  },
  {
    id: 'roi-calculation',
    name: 'ROI Calculation',
    description: 'Calculate return on investment for refinancing',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const currentMonthlyPayment = inputs.currentMonthlyPayment || 0;
      const newLoanAmount = inputs.newLoanAmount || 0;
      const newInterestRate = (inputs.newInterestRate || 0) / 100;
      const newLoanTerm = inputs.newLoanTerm || 30;
      const closingCosts = inputs.closingCosts || 0;
      
      const monthlyRate = newInterestRate / 12;
      const totalPayments = newLoanTerm * 12;
      
      let newMonthlyPayment = 0;
      if (monthlyRate > 0) {
        newMonthlyPayment = (newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        newMonthlyPayment = newLoanAmount / totalPayments;
      }
      
      const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
      const monthlyPaymentSavings = monthlyPaymentDifference > 0 ? monthlyPaymentDifference : 0;
      
      const totalRefinanceCost = closingCosts;
      const netSavings = (monthlyPaymentSavings * newLoanTerm * 12) - totalRefinanceCost;
      const returnOnInvestment = totalRefinanceCost > 0 ? (netSavings / totalRefinanceCost) * 100 : 0;
      
      return {
        outputs: {
          returnOnInvestment: Math.round(returnOnInvestment * 100) / 100,
          netSavings: Math.round(netSavings),
          totalRefinanceCost: Math.round(totalRefinanceCost),
          totalSavings: Math.round(monthlyPaymentSavings * newLoanTerm * 12)
        },
        explanation: `ROI: ${returnOnInvestment.toFixed(1)}%. Net savings: $${netSavings.toLocaleString()}. Total cost: $${totalRefinanceCost.toLocaleString()}.`,
        intermediateSteps: {
          monthlyRate: Math.round(monthlyRate * 1000000) / 1000000,
          totalPayments,
          monthlyPaymentSavings: Math.round(monthlyPaymentSavings)
        }
      };
    }
  },
  {
    id: 'tax-benefit-calculation',
    name: 'Tax Benefit Calculation',
    description: 'Calculate tax benefits and after-tax savings from refinancing',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const currentMonthlyPayment = inputs.currentMonthlyPayment || 0;
      const newLoanAmount = inputs.newLoanAmount || 0;
      const newInterestRate = (inputs.newInterestRate || 0) / 100;
      const newLoanTerm = inputs.newLoanTerm || 30;
      const borrowerTaxRate = (inputs.borrowerTaxRate || 0) / 100;
      
      const monthlyRate = newInterestRate / 12;
      const totalPayments = newLoanTerm * 12;
      
      let newMonthlyPayment = 0;
      if (monthlyRate > 0) {
        newMonthlyPayment = (newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        newMonthlyPayment = newLoanAmount / totalPayments;
      }
      
      const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
      const monthlyPaymentSavings = monthlyPaymentDifference > 0 ? monthlyPaymentDifference : 0;
      
      const annualInterest = newInterestRate * newLoanAmount;
      const taxDeduction = annualInterest * borrowerTaxRate;
      const monthlyTaxBenefit = taxDeduction / 12;
      const afterTaxSavings = monthlyPaymentSavings + monthlyTaxBenefit;
      
      return {
        outputs: {
          taxDeduction: Math.round(taxDeduction),
          monthlyTaxBenefit: Math.round(monthlyTaxBenefit),
          afterTaxSavings: Math.round(afterTaxSavings),
          effectiveTaxRate: Math.round(borrowerTaxRate * 100)
        },
        explanation: `Annual tax deduction: $${taxDeduction.toLocaleString()}. Monthly tax benefit: $${monthlyTaxBenefit.toLocaleString()}. After-tax savings: $${afterTaxSavings.toLocaleString()}.`,
        intermediateSteps: {
          annualInterest: Math.round(annualInterest),
          borrowerTaxRate: Math.round(borrowerTaxRate * 1000000) / 1000000
        }
      };
    }
  }
];

// Helper function
function calculateTotalInterest(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return 0;
  }
  
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return (monthlyPayment * totalPayments) - loanAmount;
}