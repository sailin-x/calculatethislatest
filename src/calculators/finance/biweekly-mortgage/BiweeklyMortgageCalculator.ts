import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../types/calculator';
import { calculateBiweeklyMortgage, calculateSavings, generateAmortizationSchedule } from './formulas';
import { validateBiweeklyMortgageInputs } from './validation';

export const BiweeklyMortgageCalculator: Calculator = {
  id: 'biweekly-mortgage-calculator',
  name: 'Biweekly Mortgage Calculator',
  description: 'Calculate biweekly mortgage payments and compare with traditional monthly payments to see how much you can save in interest and time to pay off your loan.',
  category: 'finance',
  subcategory: 'mortgage',
  tags: ['mortgage', 'biweekly', 'payment', 'amortization', 'interest-savings', 'loan-payoff'],
  
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Total amount of the mortgage loan',
      placeholder: '300000'
    },
    {
      id: 'interestRate',
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
      tooltip: 'Annual interest rate for the mortgage',
      placeholder: '4.5'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      tooltip: 'Length of the mortgage in years',
      placeholder: '30'
    },
    {
      id: 'startDate',
      label: 'Loan Start Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the mortgage payments begin',
      placeholder: '2024-01-01'
    },
    {
      id: 'propertyTax',
      label: 'Annual Property Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual property tax amount (optional)',
      placeholder: '3600'
    },
    {
      id: 'homeInsurance',
      label: 'Annual Home Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      tooltip: 'Annual home insurance premium (optional)',
      placeholder: '1200'
    },
    {
      id: 'pmi',
      label: 'Monthly PMI ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 500,
      step: 10,
      tooltip: 'Monthly Private Mortgage Insurance (if applicable)',
      placeholder: '0'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 1000,
      step: 10,
      tooltip: 'Monthly Homeowners Association fees (if applicable)',
      placeholder: '0'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Traditional monthly mortgage payment (principal and interest only)'
    },
    {
      id: 'biweeklyPayment',
      label: 'Biweekly Payment',
      type: 'currency',
      explanation: 'Biweekly mortgage payment (half of monthly payment)'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      explanation: 'Complete monthly payment including taxes, insurance, PMI, and HOA'
    },
    {
      id: 'totalBiweeklyPayment',
      label: 'Total Biweekly Payment',
      type: 'currency',
      explanation: 'Complete biweekly payment including taxes, insurance, PMI, and HOA'
    },
    {
      id: 'monthlyPaymentWithEscrow',
      label: 'Monthly Payment with Escrow',
      type: 'currency',
      explanation: 'Monthly payment including escrow for taxes and insurance'
    },
    {
      id: 'biweeklyPaymentWithEscrow',
      label: 'Biweekly Payment with Escrow',
      type: 'currency',
      explanation: 'Biweekly payment including escrow for taxes and insurance'
    },
    {
      id: 'interestSavings',
      label: 'Total Interest Savings',
      type: 'currency',
      explanation: 'Total interest saved by making biweekly payments'
    },
    {
      id: 'timeSaved',
      label: 'Time Saved (years)',
      type: 'number',
      explanation: 'Years saved off the loan term with biweekly payments'
    },
    {
      id: 'payoffDate',
      label: 'Early Payoff Date',
      type: 'text',
      explanation: 'Date when the loan will be paid off with biweekly payments'
    },
    {
      id: 'totalPaymentsSaved',
      label: 'Payments Saved',
      type: 'number',
      explanation: 'Number of payments saved with biweekly schedule'
    },
    {
      id: 'annualSavings',
      label: 'Annual Interest Savings',
      type: 'currency',
      explanation: 'Average annual interest savings with biweekly payments'
    },
    {
      id: 'monthlyVsBiweeklyComparison',
      label: 'Monthly vs Biweekly Comparison',
      type: 'text',
      explanation: 'Summary comparison of payment schedules'
    }
  ],

  calculate: (inputs: Record<string, any>) => {
    // Validate inputs
    const validationResult = validateBiweeklyMortgageInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Calculate biweekly mortgage metrics
    const biweeklyMetrics = calculateBiweeklyMortgage(inputs);
    
    // Calculate savings comparison
    const savingsMetrics = calculateSavings(inputs, biweeklyMetrics);
    
    // Generate amortization schedule
    const amortizationSchedule = generateAmortizationSchedule(inputs, biweeklyMetrics);

    return {
      monthlyPayment: biweeklyMetrics.monthlyPayment,
      biweeklyPayment: biweeklyMetrics.biweeklyPayment,
      totalMonthlyPayment: biweeklyMetrics.totalMonthlyPayment,
      totalBiweeklyPayment: biweeklyMetrics.totalBiweeklyPayment,
      monthlyPaymentWithEscrow: biweeklyMetrics.monthlyPaymentWithEscrow,
      biweeklyPaymentWithEscrow: biweeklyMetrics.biweeklyPaymentWithEscrow,
      interestSavings: savingsMetrics.interestSavings,
      timeSaved: savingsMetrics.timeSaved,
      payoffDate: savingsMetrics.payoffDate,
      totalPaymentsSaved: savingsMetrics.totalPaymentsSaved,
      annualSavings: savingsMetrics.annualSavings,
      monthlyVsBiweeklyComparison: savingsMetrics.comparison
    };
  },

  formulas: [
    {
      name: 'Monthly Payment Formula',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = payment, L = loan amount, c = monthly interest rate, n = total number of payments'
    },
    {
      name: 'Biweekly Payment',
      formula: 'Biweekly Payment = Monthly Payment ÷ 2',
      description: 'Biweekly payment is exactly half of the monthly payment'
    },
    {
      name: 'Interest Savings',
      formula: 'Savings = Total Monthly Interest - Total Biweekly Interest',
      description: 'Difference in total interest paid between payment schedules'
    },
    {
      name: 'Time Saved',
      formula: 'Years Saved = Original Term - Biweekly Term',
      description: 'Reduction in loan term due to extra payments'
    },
    {
      name: 'Extra Payment Effect',
      formula: 'Extra Payment = Monthly Payment × 12 ÷ 26',
      description: 'Equivalent to one extra monthly payment per year'
    }
  ],

  examples: [
    {
      name: 'Standard 30-Year Fixed Mortgage',
      description: 'Analysis for a $300,000 mortgage at 4.5% interest',
      inputs: {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: 30,
        startDate: '2024-01-01',
        propertyTax: 3600,
        homeInsurance: 1200,
        pmi: 0,
        hoaFees: 0
      },
      expectedOutputs: {
        monthlyPayment: 1520.06,
        biweeklyPayment: 760.03,
        interestSavings: 67500,
        timeSaved: 4.5,
        totalPaymentsSaved: 54
      }
    },
    {
      name: 'High-Value Property with Escrow',
      description: 'Analysis for a $750,000 mortgage with taxes and insurance',
      inputs: {
        loanAmount: 750000,
        interestRate: 3.75,
        loanTerm: 30,
        startDate: '2024-01-01',
        propertyTax: 9000,
        homeInsurance: 2400,
        pmi: 150,
        hoaFees: 200
      },
      expectedOutputs: {
        monthlyPayment: 3473.23,
        biweeklyPayment: 1736.62,
        interestSavings: 168750,
        timeSaved: 4.2,
        totalPaymentsSaved: 50
      }
    },
    {
      name: 'Short-Term Mortgage',
      description: 'Analysis for a 15-year mortgage to maximize savings',
      inputs: {
        loanAmount: 200000,
        interestRate: 3.25,
        loanTerm: 15,
        startDate: '2024-01-01',
        propertyTax: 2400,
        homeInsurance: 800,
        pmi: 0,
        hoaFees: 0
      },
      expectedOutputs: {
        monthlyPayment: 1404.69,
        biweeklyPayment: 702.35,
        interestSavings: 22500,
        timeSaved: 1.8,
        totalPaymentsSaved: 22
      }
    }
  ],

  usageInstructions: [
    'Enter your loan amount, interest rate, and loan term',
    'Add your loan start date for accurate payoff calculations',
    'Include property taxes, insurance, PMI, and HOA fees if applicable',
    'Review the comparison between monthly and biweekly payments',
    'See how much interest you can save and time you can shave off your loan',
    'Consider the impact on your monthly budget and cash flow',
    'Use the results to decide if biweekly payments are right for you'
  ]
};
