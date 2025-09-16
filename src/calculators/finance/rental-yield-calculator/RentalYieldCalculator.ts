import { Calculator, Formula } from '../../../types/calculator';
import { calculateRentalYield, validateRentalYieldInputs } from './formulas';
import { getRentalYieldValidationRules } from './validation';

/**
 * Rental yield formula implementation
 */
const rentalYieldFormula: Formula = {
  id: 'rental-yield',
  name: 'Rental Yield',
  description: 'Calculate rental yield and investment returns for rental properties',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRentalYield(inputs as any);
    return {
      outputs: result,
      explanation: 'Rental yield calculated',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading rental yield calculator with comprehensive features
 */
export const rentalYieldCalculator: Calculator = {
  id: 'rental-yield-calculator',
  title: 'Rental Yield Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive rental yield analysis calculator including gross/net rental yields, cap rates, cash-on-cash returns, and debt service coverage ratios with industry-standard metrics.',

  usageInstructions: [
    'Enter property price and monthly rental income',
    'Specify vacancy rate and all operating expenses',
    'Choose financing type (cash or financed)',
    'Include financing details if applicable',
    'Review comprehensive yield analysis and investment metrics'
  ],

  inputs: [
    {
      id: 'propertyPrice',
      label: 'Property Price',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'Total purchase price of the rental property',
      defaultValue: 300000
    },
    {
      id: 'monthlyRent',
      label: 'Monthly Rent',
      type: 'currency',
      required: true,
      placeholder: '2500',
      tooltip: 'Monthly rental income from tenants',
      defaultValue: 2500
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Expected percentage of time the property is vacant',
      defaultValue: 5,
      min: 0,
      max: 50
    },
    {
      id: 'annualOperatingExpenses',
      label: 'Annual Operating Expenses',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual operating expenses (utilities, repairs, etc.)',
      defaultValue: 3000
    },
    {
      id: 'annualPropertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '3600',
      tooltip: 'Annual property tax amount',
      defaultValue: 3600
    },
    {
      id: 'annualInsurance',
      label: 'Annual Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual property insurance premium',
      defaultValue: 1200
    },
    {
      id: 'annualMaintenance',
      label: 'Annual Maintenance',
      type: 'currency',
      required: false,
      placeholder: '2400',
      tooltip: 'Annual maintenance and repair costs',
      defaultValue: 2400
    },
    {
      id: 'annualManagementFees',
      label: 'Annual Management Fees',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual property management fees',
      defaultValue: 3000
    },
    {
      id: 'otherAnnualCosts',
      label: 'Other Annual Costs',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Other annual costs (legal, accounting, etc.)',
      defaultValue: 500
    },
    {
      id: 'financingType',
      label: 'Financing Type',
      type: 'select',
      required: true,
      options: [
        { value: 'cash', label: 'Cash Purchase' },
        { value: 'financed', label: 'Financed Purchase' }
      ],
      tooltip: 'Whether the property is purchased with cash or financed',
      defaultValue: 'financed'
    },
    {
      id: 'downPaymentPercentage',
      label: 'Down Payment (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Percentage of property price paid as down payment',
      defaultValue: 20,
      min: 0,
      max: 95
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '6.5',
      tooltip: 'Annual interest rate on the mortgage',
      defaultValue: 6.5,
      min: 0,
      max: 20,
      step: 0.125
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Mortgage term in years',
      defaultValue: 30,
      min: 1,
      max: 50
    }
  ],

  outputs: [
    {
      id: 'grossRentalYield',
      label: 'Gross Rental Yield (%)',
      type: 'percentage',
      explanation: 'Annual rent divided by property price (before expenses)'
    },
    {
      id: 'netRentalYield',
      label: 'Net Rental Yield (%)',
      type: 'percentage',
      explanation: 'Net operating income divided by property price'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'Annual cash flow divided by initial investment'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Net operating income divided by property value'
    },
    {
      id: 'totalAnnualIncome',
      label: 'Total Annual Income',
      type: 'currency',
      explanation: 'Effective annual rental income after vacancy'
    },
    {
      id: 'totalAnnualExpenses',
      label: 'Total Annual Expenses',
      type: 'currency',
      explanation: 'Sum of all annual operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      explanation: 'Annual income after operating expenses'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      explanation: 'Monthly cash flow after all expenses and financing'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      explanation: 'Annual cash flow from rental operations'
    },
    {
      id: 'breakEvenRatio',
      label: 'Break-Even Ratio (%)',
      type: 'percentage',
      explanation: 'Operating expenses as percentage of gross income'
    },
    {
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'NOI divided by annual debt service (financed only)'
    },
    {
      id: 'returnOnInvestment',
      label: 'Return on Investment (%)',
      type: 'percentage',
      explanation: 'Annual return on initial investment'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Internal rate of return on investment'
    },
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Initial cash investment required'
    },
    {
      id: 'financingCosts',
      label: 'Annual Financing Costs',
      type: 'currency',
      explanation: 'Annual mortgage payment (financed only)'
    },
    {
      id: 'loanPayment',
      label: 'Monthly Loan Payment',
      type: 'currency',
      explanation: 'Monthly mortgage payment (financed only)'
    },
    {
      id: 'equityPercentage',
      label: 'Equity Percentage (%)',
      type: 'percentage',
      explanation: 'Percentage of property owned (cash portion)'
    }
  ],

  formulas: [rentalYieldFormula],

  validationRules: getRentalYieldValidationRules(),

  examples: [
    {
      title: 'Cash Purchase Single-Family Rental',
      description: 'Analysis of a rental property purchased with cash',
      inputs: {
        propertyPrice: 300000,
        monthlyRent: 2500,
        vacancyRate: 5,
        annualOperatingExpenses: 3000,
        annualPropertyTaxes: 3600,
        annualInsurance: 1200,
        annualMaintenance: 2400,
        annualManagementFees: 3000,
        otherAnnualCosts: 500,
        financingType: 'cash',
        downPaymentPercentage: 100,
        interestRate: 0,
        loanTerm: 0
      },
      expectedOutputs: {
        grossRentalYield: 10.0,
        netRentalYield: 6.8,
        cashOnCashReturn: 6.8,
        capRate: 6.8,
        totalAnnualIncome: 28500,
        totalAnnualExpenses: 14700,
        netOperatingIncome: 13800,
        monthlyCashFlow: 1150,
        annualCashFlow: 13800,
        breakEvenRatio: 51.6,
        debtServiceCoverageRatio: 0,
        returnOnInvestment: 4.6,
        internalRateOfReturn: 4.6,
        totalInvestment: 300000,
        financingCosts: 0,
        loanPayment: 0,
        equityPercentage: 100
      }
    }
  ]
};