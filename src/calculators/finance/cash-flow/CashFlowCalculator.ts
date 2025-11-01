import { Calculator } from '../../types/calculator';
import { calculateCashFlow, generateCashFlowAnalysis } from './formulas';
import { validateCashFlowInputs } from './validation';

export const CashFlowCalculator: Calculator = {
  id: 'CashFlowCalculator',
  name: 'Cash Flow Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate real estate investment cash flow, including rental income, expenses, and profitability metrics.',
  
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of the property',
      placeholder: '350000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Original purchase price of the property',
      placeholder: '320000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Initial down payment amount',
      placeholder: '64000',
      min: 10000,
      max: 2000000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Mortgage loan amount',
      placeholder: '256000',
      min: 10000,
      max: 8000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate on the mortgage',
      placeholder: '4.5',
      min: 1,
      max: 15
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Length of the mortgage in years',
      placeholder: '30',
      min: 5,
      max: 50
    },
    {
      id: 'monthlyRent',
      name: 'Monthly Rent',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Monthly rental income',
      placeholder: '2500',
      min: 500,
      max: 50000
    },
    {
      id: 'vacancyRate',
      name: 'Vacancy Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected vacancy rate (percentage of time property is unoccupied)',
      placeholder: '5.0',
      min: 0,
      max: 50,
      default: 5.0
    },
    {
      id: 'propertyTax',
      name: 'Property Tax',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property tax',
      placeholder: '7000',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property insurance',
      placeholder: '2500',
      min: 0,
      max: 50000,
      default: 0
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual utilities (if paid by landlord)',
      placeholder: '0',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual maintenance and repairs',
      placeholder: '4000',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'propertyManagement',
      name: 'Property Management',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Property management fee percentage',
      placeholder: '8.0',
      min: 0,
      max: 20,
      default: 8.0
    },
    {
      id: 'hoaFees',
      name: 'HOA Fees',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual HOA fees',
      placeholder: '0',
      min: 0,
      max: 50000,
      default: 0
    },
    {
      id: 'otherExpenses',
      name: 'Other Expenses',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Other annual expenses',
      placeholder: '1500',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'appreciationRate',
      name: 'Appreciation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual property appreciation rate',
      placeholder: '3.0',
      min: -10,
      max: 15,
      default: 3.0
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10,
      default: 2.5
    }
  ],
  
  outputs: [
    {
      id: 'monthlyPayment',
      name: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly principal and interest payment'
    },
    {
      id: 'monthlyRentalIncome',
      name: 'Monthly Rental Income',
      type: 'number',
      unit: 'USD',
      description: 'Effective monthly rental income after vacancy'
    },
    {
      id: 'monthlyExpenses',
      name: 'Monthly Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Total monthly operating expenses'
    },
    {
      id: 'monthlyCashFlow',
      name: 'Monthly Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Net monthly cash flow (income - expenses - mortgage)'
    },
    {
      id: 'annualCashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Net annual cash flow'
    },
    {
      id: 'cashOnCashReturn',
      name: 'CashOnCash Return',
      type: 'number',
      unit: '%',
      description: 'Annual return on cash investment'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate (NOI / Property Value)'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total annual return including appreciation'
    },
    {
      id: 'breakEvenRent',
      name: 'Break-Even Rent',
      type: 'number',
      unit: 'USD',
      description: 'Minimum monthly rent needed to break even'
    },
    {
      id: 'profitabilityIndex',
      name: 'Profitability Index',
      type: 'number',
      unit: '',
      description: 'Ratio of present value of cash flows to initial investment'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Time to recover initial investment'
    },
    {
      id: 'cashFlowAnalysis',
      name: 'Cash Flow Analysis',
      type: 'string',
      description: 'Detailed analysis of cash flow performance'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'string',
      description: 'Assessment of investment risks and considerations'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'string',
      description: 'Investment recommendations and strategies'
    }
  ],
  
  calculate: (inputs: Record<string, any>): Record<string, any> => {
    // Validate inputs
    const validation = validateCashFlowInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }
    
    // Calculate cash flow metrics
    const cashFlowMetrics = calculateCashFlow(inputs);
    
    // Generate analysis
    const analysis = generateCashFlowAnalysis(inputs, cashFlowMetrics);
    
    return {
      monthlyPayment: cashFlowMetrics.monthlyPayment,
      monthlyRentalIncome: cashFlowMetrics.monthlyRentalIncome,
      monthlyExpenses: cashFlowMetrics.monthlyExpenses,
      monthlyCashFlow: cashFlowMetrics.monthlyCashFlow,
      annualCashFlow: cashFlowMetrics.annualCashFlow,
      cashOnCashReturn: cashFlowMetrics.cashOnCashReturn,
      capRate: cashFlowMetrics.capRate,
      totalReturn: cashFlowMetrics.totalReturn,
      breakEvenRent: cashFlowMetrics.breakEvenRent,
      profitabilityIndex: cashFlowMetrics.profitabilityIndex,
      paybackPeriod: cashFlowMetrics.paybackPeriod,
      cashFlowAnalysis: analysis.cashFlowAnalysis,
      riskAssessment: analysis.riskAssessment,
      recommendations: analysis.recommendations
    };
  },
  
  formulas: [
    {
      name: 'Monthly Mortgage Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = payment, L = loan amount, c = monthly interest rate, n = total payments'
    },
    {
      name: 'CashOnCash Return',
      formula: 'CashOnCash = (Annual Cash Flow / Total Cash Invested) × 100',
      description: 'Measures annual return on cash investment'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (Net Operating Income / Property Value) × 100',
      description: 'Measures unleveraged return on property value'
    },
    {
      name: 'Break-Even Rent',
      formula: 'Break-Even = Monthly Expenses + Monthly Mortgage Payment',
      description: 'Minimum rent needed to cover all costs'
    },
    {
      name: 'Profitability Index',
      formula: 'PI = Present Value of Cash Flows / Initial Investment',
      description: 'Ratio of present value to initial investment'
    }
  ],
  
  examples: [
    {
      name: 'Single-Family Rental Property',
      description: 'A typical single-family home rental investment with 20% down payment',
      inputs: {
        propertyValue: 350000,
        purchasePrice: 320000,
        downPayment: 64000,
        loanAmount: 256000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2500,
        vacancyRate: 5.0,
        propertyTax: 7000,
        insurance: 2500,
        utilities: 0,
        maintenance: 4000,
        propertyManagement: 8.0,
        hoaFees: 0,
        otherExpenses: 1500,
        appreciationRate: 3.0,
        inflationRate: 2.5
      },
      expectedOutputs: {
        monthlyPayment: 1297,
        monthlyRentalIncome: 2375,
        monthlyExpenses: 1250,
        monthlyCashFlow: -172,
        annualCashFlow: -2064,
        cashOnCashReturn: -3.2,
        capRate: 4.8,
        totalReturn: 1.6,
        breakEvenRent: 2547,
        profitabilityIndex: 0.97,
        paybackPeriod: 31.0
      }
    },
    {
      name: 'Positive Cash Flow Property',
      description: 'A property with strong positive cash flow',
      inputs: {
        propertyValue: 250000,
        purchasePrice: 220000,
        downPayment: 44000,
        loanAmount: 176000,
        interestRate: 4.0,
        loanTerm: 30,
        monthlyRent: 2200,
        vacancyRate: 3.0,
        propertyTax: 5000,
        insurance: 2000,
        utilities: 0,
        maintenance: 3000,
        propertyManagement: 7.0,
        hoaFees: 0,
        otherExpenses: 1000,
        appreciationRate: 3.5,
        inflationRate: 2.5
      },
      expectedOutputs: {
        monthlyPayment: 840,
        monthlyRentalIncome: 2134,
        monthlyExpenses: 1008,
        monthlyCashFlow: 286,
        annualCashFlow: 3432,
        cashOnCashReturn: 7.8,
        capRate: 6.2,
        totalReturn: 9.7,
        breakEvenRent: 1848,
        profitabilityIndex: 1.08,
        paybackPeriod: 12.8
      }
    }
  ]
};
