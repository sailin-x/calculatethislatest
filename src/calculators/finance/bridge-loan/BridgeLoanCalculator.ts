import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../types/calculator';
import { calculateBridgeLoan, calculateComparison, generatePaymentSchedule } from './formulas';
import { validateBridgeLoanInputs } from './validation';

export const BridgeLoanCalculator: Calculator = {
  id: 'BridgeLoanCalculator',
  name: 'Bridge Loan Calculator',
  description: 'Calculate bridge loan payments, costs, and compare with alternative financing options to determine if a bridge loan is the right choice for your situation.',
  category: 'finance',
  subcategory: 'mortgage',
  tags: ['bridge-loan', 'mortgage', 'real-estate', 'financing', 'transitional', 'short-term', 'investment'],
  
  inputs: [
    {
      id: 'currentHomeValue',
      label: 'Current Home Value ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      tooltip: 'Estimated current market value of your existing home',
      placeholder: '450000'
    },
    {
      id: 'currentMortgageBalance',
      label: 'Current Mortgage Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      tooltip: 'Remaining balance on your current mortgage',
      placeholder: '280000'
    },
    {
      id: 'newHomePrice',
      label: 'New Home Price ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      tooltip: 'Purchase price of the new home',
      placeholder: '650000'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 5000000,
      step: 1000,
      tooltip: 'Down payment for the new home',
      placeholder: '130000'
    },
    {
      id: 'bridgeLoanAmount',
      label: 'Bridge Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 5000000,
      step: 1000,
      tooltip: 'Amount needed from bridge loan',
      placeholder: '320000'
    },
    {
      id: 'bridgeLoanRate',
      label: 'Bridge Loan Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 3,
      max: 15,
      step: 0.1,
      tooltip: 'Annual interest rate for the bridge loan',
      placeholder: '8.5'
    },
    {
      id: 'bridgeLoanTerm',
      label: 'Bridge Loan Term (months)',
      type: 'number',
      required: true,
      min: 3,
      max: 24,
      step: 1,
      tooltip: 'Duration of the bridge loan in months',
      placeholder: '12'
    },
    {
      id: 'expectedSalePrice',
      label: 'Expected Sale Price ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      tooltip: 'Expected selling price of current home',
      placeholder: '450000'
    },
    {
      id: 'expectedSaleTime',
      label: 'Expected Sale Time (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 24,
      step: 1,
      tooltip: 'Expected time to sell current home in months',
      placeholder: '6'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Estimated closing costs for bridge loan',
      placeholder: '5000'
    },
    {
      id: 'originationFee',
      label: 'Origination Fee (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.1,
      tooltip: 'Origination fee as percentage of loan amount',
      placeholder: '1.0'
    },
    {
      id: 'monthlyRentalIncome',
      label: 'Monthly Rental Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Monthly rental income if renting out current home',
      placeholder: '2500'
    },
    {
      id: 'monthlyRentalExpenses',
      label: 'Monthly Rental Expenses ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      tooltip: 'Monthly expenses for maintaining rental property',
      placeholder: '800'
    },
    {
      id: 'alternativeFinancingRate',
      label: 'Alternative Financing Rate (%)',
      type: 'percentage',
      required: false,
      min: 3,
      max: 15,
      step: 0.1,
      tooltip: 'Interest rate for alternative financing (HELOC, etc.)',
      placeholder: '6.5'
    }
  ],

  outputs: [
    {
      id: 'monthlyBridgePayment',
      label: 'Monthly Bridge Loan Payment',
      type: 'currency',
      explanation: 'Monthly payment for the bridge loan'
    },
    {
      id: 'totalBridgeCost',
      label: 'Total Bridge Loan Cost',
      type: 'currency',
      explanation: 'Total cost including interest and fees'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the bridge loan term'
    },
    {
      id: 'netProceeds',
      label: 'Net Proceeds from Sale',
      type: 'currency',
      explanation: 'Net proceeds after paying off bridge loan and current mortgage'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      explanation: 'Monthly cash flow including rental income and expenses'
    },
    {
      id: 'breakEvenTime',
      label: 'Break-even Time (months)',
      type: 'number',
      explanation: 'Time needed to break even on bridge loan costs'
    },
    {
      id: 'totalCostSavings',
      label: 'Total Cost Savings vs Alternative',
      type: 'currency',
      explanation: 'Savings compared to alternative financing options'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of risks associated with bridge loan'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommendation based on financial analysis'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule',
      type: 'text',
      explanation: 'Summary of payment schedule and key dates'
    },
    {
      id: 'equityUtilization',
      label: 'Equity Utilization (%)',
      type: 'percentage',
      explanation: 'Percentage of current home equity being utilized'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'DebtToIncome Ratio',
      type: 'percentage',
      explanation: 'Combined DebtToIncome ratio with bridge loan'
    }
  ],

  calculate: (inputs: Record<string, any>) => {
    // Validate inputs
    const validationResult = validateBridgeLoanInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Calculate bridge loan metrics
    const bridgeMetrics = calculateBridgeLoan(inputs);
    
    // Calculate comparison with alternatives
    const comparisonMetrics = calculateComparison(inputs, bridgeMetrics);
    
    // Generate payment schedule
    const paymentSchedule = generatePaymentSchedule(inputs, bridgeMetrics);

    return {
      monthlyBridgePayment: bridgeMetrics.monthlyPayment,
      totalBridgeCost: bridgeMetrics.totalCost,
      totalInterest: bridgeMetrics.totalInterest,
      netProceeds: bridgeMetrics.netProceeds,
      monthlyCashFlow: bridgeMetrics.monthlyCashFlow,
      breakEvenTime: bridgeMetrics.breakEvenTime,
      totalCostSavings: comparisonMetrics.costSavings,
      riskAssessment: comparisonMetrics.riskAssessment,
      recommendation: comparisonMetrics.recommendation,
      paymentSchedule: paymentSchedule.summary,
      equityUtilization: bridgeMetrics.equityUtilization,
      debtToIncomeRatio: bridgeMetrics.debtToIncomeRatio
    };
  },

  formulas: [
    {
      name: 'Bridge Loan Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = payment, L = loan amount, c = monthly interest rate, n = total payments'
    },
    {
      name: 'Total Interest',
      formula: 'Total Interest = (Monthly Payment × Term) - Loan Amount',
      description: 'Total interest paid over the bridge loan term'
    },
    {
      name: 'Net Proceeds',
      formula: 'Net Proceeds = Sale Price - Current Mortgage - Bridge Loan Balance',
      description: 'Net proceeds after paying off all loans'
    },
    {
      name: 'Monthly Cash Flow',
      formula: 'Cash Flow = Rental Income - Rental Expenses - Bridge Payment',
      description: 'Monthly cash flow from rental property minus bridge loan payment'
    },
    {
      name: 'Equity Utilization',
      formula: 'Equity % = (Bridge Loan Amount / (Home Value - Mortgage Balance)) × 100',
      description: 'Percentage of available equity being utilized'
    }
  ],

  examples: [
    {
      name: 'Standard Bridge Loan Scenario',
      description: 'Typical bridge loan for upgrading to a larger home',
      inputs: {
        currentHomeValue: 450000,
        currentMortgageBalance: 280000,
        newHomePrice: 650000,
        downPayment: 130000,
        bridgeLoanAmount: 320000,
        bridgeLoanRate: 8.5,
        bridgeLoanTerm: 12,
        expectedSalePrice: 450000,
        expectedSaleTime: 6,
        closingCosts: 5000,
        originationFee: 1.0,
        monthlyRentalIncome: 2500,
        monthlyRentalExpenses: 800,
        alternativeFinancingRate: 6.5
      },
      expectedOutputs: {
        monthlyBridgePayment: 2950.45,
        totalBridgeCost: 35405.40,
        totalInterest: 3405.40,
        netProceeds: 130000,
        monthlyCashFlow: -1250.45,
        breakEvenTime: 8.5
      }
    },
    {
      name: 'High-Value Property Bridge Loan',
      description: 'Bridge loan for luxury property transition',
      inputs: {
        currentHomeValue: 1200000,
        currentMortgageBalance: 600000,
        newHomePrice: 1800000,
        downPayment: 360000,
        bridgeLoanAmount: 840000,
        bridgeLoanRate: 7.5,
        bridgeLoanTerm: 18,
        expectedSalePrice: 1200000,
        expectedSaleTime: 12,
        closingCosts: 12000,
        originationFee: 1.5,
        monthlyRentalIncome: 6000,
        monthlyRentalExpenses: 1500,
        alternativeFinancingRate: 5.5
      },
      expectedOutputs: {
        monthlyBridgePayment: 6950.67,
        totalBridgeCost: 125112.06,
        totalInterest: 11112.06,
        netProceeds: 360000,
        monthlyCashFlow: -2450.67,
        breakEvenTime: 15.2
      }
    },
    {
      name: 'Quick Sale Bridge Loan',
      description: 'Short-term bridge loan with quick expected sale',
      inputs: {
        currentHomeValue: 350000,
        currentMortgageBalance: 200000,
        newHomePrice: 500000,
        downPayment: 100000,
        bridgeLoanAmount: 200000,
        bridgeLoanRate: 9.0,
        bridgeLoanTerm: 6,
        expectedSalePrice: 350000,
        expectedSaleTime: 3,
        closingCosts: 3000,
        originationFee: 0.5,
        monthlyRentalIncome: 2000,
        monthlyRentalExpenses: 600,
        alternativeFinancingRate: 7.0
      },
      expectedOutputs: {
        monthlyBridgePayment: 3450.23,
        totalBridgeCost: 20701.38,
        totalInterest: 701.38,
        netProceeds: 100000,
        monthlyCashFlow: -1050.23,
        breakEvenTime: 4.2
      }
    }
  ],

  usageInstructions: [
    'Enter your current home value and remaining mortgage balance',
    'Specify the new home price and required down payment',
    'Input the bridge loan amount, interest rate, and term',
    'Provide expected sale price and timeline for current home',
    'Include closing costs, origination fees, and rental income if applicable',
    'Review the monthly payments and total costs',
    'Compare with alternative financing options',
    'Consider the risk assessment and recommendations',
    'Evaluate if the bridge loan fits your financial situation'
  ]
};
