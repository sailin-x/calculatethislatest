import { Calculator } from '../../types/calculator';
import { calculateCashOnCashReturn, generateInvestmentAnalysis } from './formulas';
import { validateCashOnCashReturnInputs } from './validation';

export const CashOnCashReturnCalculator: Calculator = {
  id: 'cash-on-cash-return-calculator',
  name: 'Cash-on-Cash Return Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate cash-on-cash return for real estate investments, measuring annual return on cash invested.',
  
  inputs: [
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total purchase price of the property',
      placeholder: '300000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Initial cash investment (down payment)',
      placeholder: '60000',
      min: 10000,
      max: 2000000
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Total closing costs and fees',
      placeholder: '8000',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'renovationCosts',
      name: 'Renovation Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Initial renovation and improvement costs',
      placeholder: '15000',
      min: 0,
      max: 500000,
      default: 0
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
      placeholder: '6000',
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
      placeholder: '2400',
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
      placeholder: '3600',
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
      placeholder: '1200',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Mortgage loan amount',
      placeholder: '240000',
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
      id: 'totalCashInvested',
      name: 'Total Cash Invested',
      type: 'number',
      unit: 'USD',
      description: 'Total cash investment (down payment + closing costs + renovations)'
    },
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
      name: 'Cash-on-Cash Return',
      type: 'number',
      unit: '%',
      description: 'Annual return on cash investment'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total annual return including appreciation'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate (NOI / Property Value)'
    },
    {
      id: 'breakEvenRent',
      name: 'Break-Even Rent',
      type: 'number',
      unit: 'USD',
      description: 'Minimum monthly rent needed to break even'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Time to recover initial cash investment'
    },
    {
      id: 'investmentGrade',
      name: 'Investment Grade',
      type: 'string',
      description: 'Investment quality assessment'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'string',
      description: 'Assessment of investment risks'
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
    const validation = validateCashOnCashReturnInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }
    
    // Calculate cash-on-cash return metrics
    const cashOnCashMetrics = calculateCashOnCashReturn(inputs);
    
    // Generate analysis
    const analysis = generateInvestmentAnalysis(inputs, cashOnCashMetrics);
    
    return {
      totalCashInvested: cashOnCashMetrics.totalCashInvested,
      monthlyPayment: cashOnCashMetrics.monthlyPayment,
      monthlyRentalIncome: cashOnCashMetrics.monthlyRentalIncome,
      monthlyExpenses: cashOnCashMetrics.monthlyExpenses,
      monthlyCashFlow: cashOnCashMetrics.monthlyCashFlow,
      annualCashFlow: cashOnCashMetrics.annualCashFlow,
      cashOnCashReturn: cashOnCashMetrics.cashOnCashReturn,
      totalReturn: cashOnCashMetrics.totalReturn,
      capRate: cashOnCashMetrics.capRate,
      breakEvenRent: cashOnCashMetrics.breakEvenRent,
      paybackPeriod: cashOnCashMetrics.paybackPeriod,
      investmentGrade: analysis.investmentGrade,
      riskAssessment: analysis.riskAssessment,
      recommendations: analysis.recommendations
    };
  },
  
  formulas: [
    {
      name: 'Cash-on-Cash Return',
      formula: 'Cash-on-Cash = (Annual Cash Flow / Total Cash Invested) × 100',
      description: 'Measures annual return on cash investment'
    },
    {
      name: 'Total Cash Invested',
      formula: 'Total Cash = Down Payment + Closing Costs + Renovation Costs',
      description: 'Sum of all cash investments in the property'
    },
    {
      name: 'Monthly Mortgage Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = payment, L = loan amount, c = monthly interest rate, n = total payments'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (Net Operating Income / Property Value) × 100',
      description: 'Measures unleveraged return on property value'
    },
    {
      name: 'Payback Period',
      formula: 'Payback = Total Cash Invested / (Annual Cash Flow + Annual Appreciation)',
      description: 'Time to recover initial investment'
    }
  ],
  
  examples: [
    {
      name: 'Single-Family Rental Investment',
      description: 'A typical single-family home rental investment with 20% down payment',
      inputs: {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 8000,
        renovationCosts: 15000,
        monthlyRent: 2500,
        vacancyRate: 5.0,
        propertyTax: 6000,
        insurance: 2400,
        utilities: 0,
        maintenance: 3600,
        propertyManagement: 8.0,
        hoaFees: 0,
        otherExpenses: 1200,
        loanAmount: 240000,
        interestRate: 4.5,
        loanTerm: 30,
        appreciationRate: 3.0,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalCashInvested: 83000,
        monthlyPayment: 1216,
        monthlyRentalIncome: 2375,
        monthlyExpenses: 1100,
        monthlyCashFlow: 59,
        annualCashFlow: 708,
        cashOnCashReturn: 0.9,
        totalReturn: 3.9,
        capRate: 5.1,
        breakEvenRent: 2316,
        paybackPeriod: 25.6
      }
    },
    {
      name: 'High Cash-on-Cash Return Property',
      description: 'A property with strong positive cash flow and high returns',
      inputs: {
        purchasePrice: 200000,
        downPayment: 40000,
        closingCosts: 5000,
        renovationCosts: 10000,
        monthlyRent: 2200,
        vacancyRate: 3.0,
        propertyTax: 4000,
        insurance: 1800,
        utilities: 0,
        maintenance: 2400,
        propertyManagement: 7.0,
        hoaFees: 0,
        otherExpenses: 800,
        loanAmount: 160000,
        interestRate: 4.0,
        loanTerm: 30,
        appreciationRate: 3.5,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalCashInvested: 55000,
        monthlyPayment: 764,
        monthlyRentalIncome: 2134,
        monthlyExpenses: 917,
        monthlyCashFlow: 453,
        annualCashFlow: 5436,
        cashOnCashReturn: 9.9,
        totalReturn: 13.4,
        capRate: 6.5,
        breakEvenRent: 1681,
        paybackPeriod: 7.4
      }
    }
  ]
};
