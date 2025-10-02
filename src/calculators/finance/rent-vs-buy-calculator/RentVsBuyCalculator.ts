import { Calculator, Formula } from '../../types/calculator';
import { calculateRentVsBuy, validateRentVsBuyInputs } from './formulas';
import { getRentVsBuyValidationRules } from './validation';

/**
 * Rent vs. buy formula implementation
 */
const rentVsBuyFormula: Formula = {
  id: 'rent-vs-buy',
  name: 'Rent vs. Buy',
  description: 'Compare renting vs. buying costs and determine the better financial option',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRentVsBuy(inputs as any);
    return {
      outputs: result,
      explanation: 'Rent vs. buy analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading rent vs. buy calculator with comprehensive features
 */
export const rentVsBuyCalculator: Calculator = {
  id: 'rent-vs-buy-calculator',
  title: 'Rent vs. Buy Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive rent vs. buy analysis comparing total costs, break-even points, and long-term financial implications of renting versus buying a home with industry-standard calculations.',

  usageInstructions: [
    'Enter your current rent and expected rent increases',
    'Input home price, down payment, and financing details',
    'Specify all owning costs (taxes, insurance, maintenance, etc.)',
    'Include investment assumptions and analysis period',
    'Review detailed cost comparison and recommendation'
  ],

  inputs: [
    {
      id: 'monthlyRent',
      label: 'Monthly Rent',
      type: 'currency',
      required: true,
      placeholder: '2000',
      tooltip: 'Your current monthly rent payment',
      defaultValue: 2000
    },
    {
      id: 'annualRentIncrease',
      label: 'Annual Rent Increase (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual rent increase',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'rentersInsurance',
      label: 'Annual Renters Insurance',
      type: 'currency',
      required: false,
      placeholder: '400',
      tooltip: 'Annual renters insurance cost',
      defaultValue: 400
    },
    {
      id: 'securityDeposit',
      label: 'Security Deposit',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Initial security deposit (refundable)',
      defaultValue: 2000
    },
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'Purchase price of the home',
      defaultValue: 300000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      placeholder: '60000',
      tooltip: 'Initial down payment amount',
      defaultValue: 60000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '6.5',
      tooltip: 'Mortgage interest rate',
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
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '3600',
      tooltip: 'Annual property tax amount',
      defaultValue: 3600
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 1200
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Monthly homeowners association fees',
      defaultValue: 200
    },
    {
      id: 'maintenanceCost',
      label: 'Annual Maintenance',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual maintenance and repair costs',
      defaultValue: 3000
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: false,
      placeholder: '6000',
      tooltip: 'One-time closing costs for purchase',
      defaultValue: 6000
    },
    {
      id: 'expectedAppreciation',
      label: 'Expected Annual Appreciation (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual home value increase',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'investmentReturn',
      label: 'Alternative Investment Return (%)',
      type: 'percentage',
      required: false,
      placeholder: '7',
      tooltip: 'Expected return on alternative investments',
      defaultValue: 7,
      min: 0,
      max: 20
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Number of years to analyze',
      defaultValue: 10,
      min: 1,
      max: 50
    },
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Your marginal tax rate for tax calculations',
      defaultValue: 25,
      min: 0,
      max: 50
    }
  ],

  outputs: [
    {
      id: 'totalRentingCost',
      label: 'Total Renting Cost',
      type: 'currency',
      explanation: 'Total cost of renting over analysis period'
    },
    {
      id: 'monthlyRentingCost',
      label: 'Monthly Renting Cost',
      type: 'currency',
      explanation: 'Average monthly cost of renting'
    },
    {
      id: 'annualRentingCost',
      label: 'Annual Renting Cost',
      type: 'currency',
      explanation: 'Average annual cost of renting'
    },
    {
      id: 'totalBuyingCost',
      label: 'Total Buying Cost',
      type: 'currency',
      explanation: 'Total cost of buying over analysis period'
    },
    {
      id: 'monthlyBuyingCost',
      label: 'Monthly Buying Cost',
      type: 'currency',
      explanation: 'Average monthly cost of buying'
    },
    {
      id: 'annualBuyingCost',
      label: 'Annual Buying Cost',
      type: 'currency',
      explanation: 'Average annual cost of buying'
    },
    {
      id: 'totalMortgagePayment',
      label: 'Total Mortgage Payments',
      type: 'currency',
      explanation: 'Total mortgage payments over analysis period'
    },
    {
      id: 'totalEquityBuilt',
      label: 'Total Equity Built',
      type: 'currency',
      explanation: 'Total equity accumulated through principal payments'
    },
    {
      id: 'totalAppreciation',
      label: 'Total Appreciation',
      type: 'currency',
      explanation: 'Total home value appreciation'
    },
    {
      id: 'costDifference',
      label: 'Cost Difference',
      type: 'currency',
      explanation: 'Difference in total costs (positive = buying cheaper)'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years needed for buying costs to equal renting costs'
    },
    {
      id: 'rentVsBuyRatio',
      label: 'Rent vs. Buy Ratio',
      type: 'number',
      explanation: 'Ratio of buying cost to renting cost'
    },
    {
      id: 'netAdvantage',
      label: 'Net Advantage',
      type: 'text',
      explanation: 'Whether renting or buying has the advantage'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Detailed recommendation based on analysis'
    },
    {
      id: 'opportunityCost',
      label: 'Opportunity Cost',
      type: 'currency',
      explanation: 'Potential earnings from investing down payment'
    },
    {
      id: 'netWorthDifference',
      label: 'Net Worth Difference',
      type: 'currency',
      explanation: 'Difference in net worth between scenarios'
    },
    {
      id: 'roiDifference',
      label: 'ROI Difference (%)',
      type: 'percentage',
      explanation: 'Difference in return on investment'
    }
  ],

  formulas: [rentVsBuyFormula],

  validationRules: getRentVsBuyValidationRules(),

  examples: [
    {
      title: 'Urban Professional Analysis',
      description: 'Analysis for a city professional considering buying vs. continuing to rent',
      inputs: {
        monthlyRent: 2500,
        annualRentIncrease: 3,
        rentersInsurance: 500,
        securityDeposit: 2500,
        homePrice: 500000,
        downPayment: 100000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyTaxes: 6000,
        homeownersInsurance: 1500,
        hoaFees: 0,
        maintenanceCost: 5000,
        closingCosts: 10000,
        expectedAppreciation: 3,
        investmentReturn: 7,
        analysisPeriod: 10,
        marginalTaxRate: 25
      },
      expectedOutputs: {
        totalRentingCost: 330000,
        monthlyRentingCost: 2750,
        annualRentingCost: 33000,
        totalBuyingCost: 420000,
        monthlyBuyingCost: 3500,
        annualBuyingCost: 42000,
        totalMortgagePayment: 280000,
        totalEquityBuilt: 35000,
        totalAppreciation: 55000,
        costDifference: -90000,
        breakEvenYears: 15,
        rentVsBuyRatio: 1.27,
        netAdvantage: 'Renting',
        recommendation: 'Renting is more cost-effective for your 10-year horizon. Buying becomes advantageous after 15 years.',
        opportunityCost: 96715,
        netWorthDifference: -41715,
        roiDifference: -4.2
      }
    }
  ]
};