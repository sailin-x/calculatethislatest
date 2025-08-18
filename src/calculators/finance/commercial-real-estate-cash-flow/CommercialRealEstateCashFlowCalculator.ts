import { Calculator } from '../../types/calculator';
import { calculateCashFlow, generateCashFlowAnalysis } from './formulas';
import { validateCashFlowInputs } from './validation';

export const CommercialRealEstateCashFlowCalculator: Calculator = {
  id: 'commercial-real-estate-cash-flow-calculator',
  name: 'Commercial Real Estate Cash Flow Calculator',
  category: 'finance',
  subcategory: 'business',
  description: 'Calculate and analyze commercial real estate cash flow performance, including NOI, cash-on-cash return, and investment metrics.',
  
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of commercial property',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Store' },
        { value: 'warehouse', label: 'Warehouse/Industrial' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'self-storage', label: 'Self-Storage Facility' }
      ]
    },
    {
      id: 'totalUnits',
      name: 'Total Units',
      type: 'number',
      required: true,
      description: 'Total number of units or spaces',
      placeholder: '50',
      min: 1,
      max: 10000
    },
    {
      id: 'occupiedUnits',
      name: 'Occupied Units',
      type: 'number',
      required: true,
      description: 'Number of occupied units',
      placeholder: '45',
      min: 0,
      max: 10000
    },
    {
      id: 'averageRent',
      name: 'Average Rent per Unit',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Average monthly rent per unit',
      placeholder: '2000',
      min: 100,
      max: 50000
    },
    {
      id: 'otherIncome',
      name: 'Other Income',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Additional income (parking, utilities, etc.)',
      placeholder: '5000',
      min: 0,
      max: 100000
    },
    {
      id: 'propertyTax',
      name: 'Property Tax',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual property tax',
      placeholder: '25000',
      min: 0,
      max: 1000000
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual insurance premium',
      placeholder: '15000',
      min: 0,
      max: 500000
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Monthly utility expenses',
      placeholder: '8000',
      min: 0,
      max: 100000
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Monthly maintenance expenses',
      placeholder: '6000',
      min: 0,
      max: 100000
    },
    {
      id: 'propertyManagement',
      name: 'Property Management',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Property management fee percentage',
      placeholder: '5',
      min: 0,
      max: 20
    },
    {
      id: 'hoaFees',
      name: 'HOA Fees',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Monthly HOA or association fees',
      placeholder: '0',
      min: 0,
      max: 50000
    },
    {
      id: 'otherExpenses',
      name: 'Other Expenses',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Other monthly expenses',
      placeholder: '3000',
      min: 0,
      max: 100000
    },
    {
      id: 'purchasePrice',
      name: 'Purchase Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Property purchase price',
      placeholder: '2000000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Initial down payment',
      placeholder: '400000',
      min: 20000,
      max: 20000000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Mortgage loan amount',
      placeholder: '1600000',
      min: 0,
      max: 80000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate',
      placeholder: '5.5',
      min: 1,
      max: 15
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Loan term in years',
      placeholder: '25',
      min: 5,
      max: 30
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total closing costs',
      placeholder: '50000',
      min: 0,
      max: 1000000
    },
    {
      id: 'renovationCosts',
      name: 'Renovation Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Initial renovation costs',
      placeholder: '100000',
      min: 0,
      max: 5000000
    },
    {
      id: 'appreciationRate',
      name: 'Appreciation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual appreciation rate',
      placeholder: '3.0',
      min: -10,
      max: 15
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10
    },
    {
      id: 'taxRate',
      name: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Effective tax rate',
      placeholder: '25.0',
      min: 0,
      max: 50
    },
    {
      id: 'depreciationPeriod',
      name: 'Depreciation Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Depreciation period for tax purposes',
      placeholder: '27.5',
      min: 15,
      max: 39
    }
  ],

  outputs: [
    {
      id: 'grossRentalIncome',
      name: 'Gross Rental Income',
      type: 'number',
      unit: 'USD/month',
      description: 'Total monthly rental income'
    },
    {
      id: 'effectiveGrossIncome',
      name: 'Effective Gross Income',
      type: 'number',
      unit: 'USD/month',
      description: 'Gross income after vacancy allowance'
    },
    {
      id: 'totalOperatingExpenses',
      name: 'Total Operating Expenses',
      type: 'number',
      unit: 'USD/month',
      description: 'Total monthly operating expenses'
    },
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income',
      type: 'number',
      unit: 'USD/month',
      description: 'Monthly net operating income'
    },
    {
      id: 'annualNOI',
      name: 'Annual NOI',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income'
    },
    {
      id: 'monthlyMortgagePayment',
      name: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly mortgage payment'
    },
    {
      id: 'monthlyCashFlow',
      name: 'Monthly Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Monthly cash flow after mortgage'
    },
    {
      id: 'annualCashFlow',
      name: 'Annual Cash Flow',
      type: 'number',
      unit: 'USD',
      description: 'Annual cash flow after mortgage'
    },
    {
      id: 'cashOnCashReturn',
      name: 'Cash-on-Cash Return',
      type: 'number',
      unit: '%',
      description: 'Annual cash flow as percentage of cash invested'
    },
    {
      id: 'capRate',
      name: 'Cap Rate',
      type: 'number',
      unit: '%',
      description: 'Capitalization rate'
    },
    {
      id: 'totalCashInvested',
      name: 'Total Cash Invested',
      type: 'number',
      unit: 'USD',
      description: 'Total cash invested in property'
    },
    {
      id: 'debtServiceCoverage',
      name: 'Debt Service Coverage',
      type: 'number',
      description: 'NOI to debt service ratio'
    },
    {
      id: 'operatingExpenseRatio',
      name: 'Operating Expense Ratio',
      type: 'number',
      unit: '%',
      description: 'Operating expenses as percentage of gross income'
    },
    {
      id: 'vacancyRate',
      name: 'Vacancy Rate',
      type: 'number',
      unit: '%',
      description: 'Current vacancy rate'
    },
    {
      id: 'breakEvenOccupancy',
      name: 'Break-Even Occupancy',
      type: 'number',
      unit: '%',
      description: 'Occupancy rate needed to break even'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: '%',
      description: 'Total return including appreciation'
    },
    {
      id: 'cashFlowProjection',
      name: '5-Year Cash Flow Projection',
      type: 'string',
      description: 'Projected cash flow over 5 years'
    },
    {
      id: 'investmentAnalysis',
      name: 'Investment Analysis',
      type: 'string',
      description: 'Overall investment performance analysis'
    }
  ],

  calculate: (inputs) => {
    const validation = validateCashFlowInputs(inputs);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return calculateCashFlow(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateCashFlowAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Gross Rental Income',
      formula: 'Gross Rental Income = Occupied Units × Average Rent per Unit',
      description: 'Calculates total monthly rental income'
    },
    {
      name: 'Effective Gross Income',
      formula: 'Effective Gross Income = Gross Rental Income + Other Income',
      description: 'Calculates total monthly income including other sources'
    },
    {
      name: 'Net Operating Income',
      formula: 'NOI = Effective Gross Income - Total Operating Expenses',
      description: 'Calculates monthly net operating income'
    },
    {
      name: 'Cash Flow',
      formula: 'Cash Flow = NOI - Monthly Mortgage Payment',
      description: 'Calculates monthly cash flow after debt service'
    },
    {
      name: 'Cash-on-Cash Return',
      formula: 'Cash-on-Cash = (Annual Cash Flow / Total Cash Invested) × 100',
      description: 'Calculates return on cash invested'
    },
    {
      name: 'Cap Rate',
      formula: 'Cap Rate = (Annual NOI / Purchase Price) × 100',
      description: 'Calculates capitalization rate'
    }
  ],

  examples: [
    {
      name: 'Apartment Building Cash Flow',
      description: 'A 50-unit apartment building with strong cash flow',
      inputs: {
        propertyType: 'apartment',
        totalUnits: 50,
        occupiedUnits: 48,
        averageRent: 1800,
        otherIncome: 5000,
        propertyTax: 30000,
        insurance: 18000,
        utilities: 8000,
        maintenance: 6000,
        propertyManagement: 5.0,
        hoaFees: 0,
        otherExpenses: 4000,
        purchasePrice: 3500000,
        downPayment: 700000,
        loanAmount: 2800000,
        interestRate: 5.5,
        loanTerm: 25,
        closingCosts: 70000,
        renovationCosts: 150000,
        appreciationRate: 3.0,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 27.5
      },
      expectedOutputs: {
        grossRentalIncome: 86400,
        effectiveGrossIncome: 91400,
        totalOperatingExpenses: 28500,
        netOperatingIncome: 62900,
        annualNOI: 754800,
        monthlyMortgagePayment: 17150,
        monthlyCashFlow: 45750,
        annualCashFlow: 549000,
        cashOnCashReturn: 7.8,
        capRate: 8.6,
        totalCashInvested: 920000,
        debtServiceCoverage: 3.67,
        operatingExpenseRatio: 31.2,
        vacancyRate: 4.0,
        breakEvenOccupancy: 28.5,
        totalReturn: 10.8,
        cashFlowProjection: 'Positive cash flow growth projected over 5 years',
        investmentAnalysis: 'Strong cash flow with excellent debt service coverage'
      }
    },
    {
      name: 'Office Building Cash Flow',
      description: 'A small office building with moderate cash flow',
      inputs: {
        propertyType: 'office',
        totalUnits: 12,
        occupiedUnits: 10,
        averageRent: 3500,
        otherIncome: 2000,
        propertyTax: 25000,
        insurance: 15000,
        utilities: 4000,
        maintenance: 3000,
        propertyManagement: 4.0,
        hoaFees: 0,
        otherExpenses: 2000,
        purchasePrice: 1800000,
        downPayment: 360000,
        loanAmount: 1440000,
        interestRate: 6.0,
        loanTerm: 25,
        closingCosts: 45000,
        renovationCosts: 80000,
        appreciationRate: 2.5,
        inflationRate: 2.5,
        taxRate: 25.0,
        depreciationPeriod: 39.0
      },
      expectedOutputs: {
        grossRentalIncome: 35000,
        effectiveGrossIncome: 37000,
        totalOperatingExpenses: 12500,
        netOperatingIncome: 24500,
        annualNOI: 294000,
        monthlyMortgagePayment: 9270,
        monthlyCashFlow: 15230,
        annualCashFlow: 182760,
        cashOnCashReturn: 6.2,
        capRate: 6.5,
        totalCashInvested: 545000,
        debtServiceCoverage: 2.64,
        operatingExpenseRatio: 33.8,
        vacancyRate: 16.7,
        breakEvenOccupancy: 42.3,
        totalReturn: 8.7,
        cashFlowProjection: 'Stable cash flow with moderate growth potential',
        investmentAnalysis: 'Good cash flow with room for improvement in occupancy'
      }
    }
  ]
};
