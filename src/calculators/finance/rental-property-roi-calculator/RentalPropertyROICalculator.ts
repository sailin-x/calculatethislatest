import { Calculator, Formula } from '../../../types/calculator';
import { calculateRentalPropertyROI, validateRentalPropertyROIInputs } from './formulas';
import { getRentalPropertyROIValidationRules } from './validation';

/**
 * Rental property ROI formula implementation
 */
const rentalPropertyROIFormula: Formula = {
  id: 'rental-property-roi',
  name: 'Rental Property ROI',
  description: 'Calculate return on investment for rental properties',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRentalPropertyROI(inputs as any);
    return {
      outputs: result,
      explanation: 'Rental property ROI calculated',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading rental property ROI calculator with comprehensive features
 */
export const rentalPropertyROICalculator: Calculator = {
  id: 'rental-property-roi-calculator',
  title: 'Rental Property ROI Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive rental property investment analysis calculator including cash flow, cap rates, cash-on-cash returns, IRR, and total ROI with industry-standard metrics.',

  usageInstructions: [
    'Enter property purchase details and financing information',
    'Input rental income and vacancy assumptions',
    'Add all operating expenses and costs',
    'Include appreciation and holding period assumptions',
    'Review comprehensive ROI analysis and investment metrics'
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
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      placeholder: '60000',
      tooltip: 'Initial cash investment (down payment)',
      defaultValue: 60000
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: false,
      placeholder: '240000',
      tooltip: 'Amount financed with mortgage',
      defaultValue: 240000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '6.5',
      tooltip: 'Annual mortgage interest rate',
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
    },
    {
      id: 'monthlyRent',
      label: 'Monthly Rent',
      type: 'currency',
      required: true,
      placeholder: '2500',
      tooltip: 'Monthly rental income',
      defaultValue: 2500
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Expected vacancy rate',
      defaultValue: 5,
      min: 0,
      max: 50
    },
    {
      id: 'propertyManagementFee',
      label: 'Property Management Fee (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'Property management fee as percentage of rent',
      defaultValue: 8,
      min: 0,
      max: 50
    },
    {
      id: 'maintenanceCost',
      label: 'Monthly Maintenance',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Monthly maintenance and repair costs',
      defaultValue: 200
    },
    {
      id: 'propertyTaxes',
      label: 'Monthly Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '300',
      tooltip: 'Monthly property tax payment',
      defaultValue: 300
    },
    {
      id: 'insurance',
      label: 'Monthly Insurance',
      type: 'currency',
      required: false,
      placeholder: '150',
      tooltip: 'Monthly homeowners insurance',
      defaultValue: 150
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Monthly homeowners association fees',
      defaultValue: 0
    },
    {
      id: 'otherExpenses',
      label: 'Other Monthly Expenses',
      type: 'currency',
      required: false,
      placeholder: '100',
      tooltip: 'Other monthly operating expenses',
      defaultValue: 100
    },
    {
      id: 'appreciationRate',
      label: 'Annual Appreciation (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual property appreciation',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'holdingPeriod',
      label: 'Holding Period (Years)',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Number of years to hold the investment',
      defaultValue: 10,
      min: 1,
      max: 50
    },
    {
      id: 'sellingCosts',
      label: 'Selling Costs (%)',
      type: 'percentage',
      required: false,
      placeholder: '6',
      tooltip: 'Real estate agent commission and closing costs',
      defaultValue: 6,
      min: 0,
      max: 20
    }
  ],

  outputs: [
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'currency',
      explanation: 'Effective monthly rental income after vacancy'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'currency',
      explanation: 'Total monthly operating expenses'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      explanation: 'Monthly cash flow after all expenses and loan payment'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      explanation: 'Annual cash flow from rental income'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Capitalization rate (NOI / Property Value)'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'Annual cash flow divided by initial investment'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      explanation: 'Total return over holding period'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return (%)',
      type: 'percentage',
      explanation: 'Compound annual growth rate of investment'
    },
    {
      id: 'irr',
      label: 'IRR (%)',
      type: 'percentage',
      explanation: 'Internal rate of return on investment'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      explanation: 'Annual income after operating expenses'
    },
    {
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'NOI divided by annual debt service'
    },
    {
      id: 'breakEvenRatio',
      label: 'Break-Even Ratio (%)',
      type: 'percentage',
      explanation: 'Operating expenses as percentage of gross income'
    },
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Initial cash investment required'
    },
    {
      id: 'equityBuildUp',
      label: 'Equity Build-Up',
      type: 'currency',
      explanation: 'Equity gained through loan principal reduction'
    },
    {
      id: 'totalProfit',
      label: 'Total Profit',
      type: 'currency',
      explanation: 'Total profit from investment'
    },
    {
      id: 'roiPercentage',
      label: 'ROI (%)',
      type: 'percentage',
      explanation: 'Return on investment percentage'
    }
  ],

  formulas: [rentalPropertyROIFormula],

  validationRules: getRentalPropertyROIValidationRules(),

  examples: [
    {
      title: 'Single-Family Rental Property',
      description: 'Analysis of a typical single-family rental property investment',
      inputs: {
        propertyPrice: 300000,
        downPayment: 60000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        vacancyRate: 5,
        propertyManagementFee: 8,
        maintenanceCost: 200,
        propertyTaxes: 300,
        insurance: 150,
        hoaFees: 0,
        otherExpenses: 100,
        appreciationRate: 3,
        holdingPeriod: 10,
        sellingCosts: 6
      },
      expectedOutputs: {
        monthlyIncome: 2375,
        monthlyExpenses: 758,
        monthlyCashFlow: 1617,
        annualCashFlow: 19404,
        capRate: 8.2,
        cashOnCashReturn: 32.3,
        totalReturn: 194040,
        annualizedReturn: 12.5,
        irr: 11.8,
        netOperatingIncome: 24330,
        debtServiceCoverageRatio: 1.45,
        breakEvenRatio: 32.0,
        totalInvestment: 60000,
        equityBuildUp: 45000,
        totalProfit: 134040,
        roiPercentage: 223.4
      }
    }
  ]
};