import { Calculator } from '../../../types/calculator';
import { calculateMortgageVsRent, generateMortgageVsRentAnalysis } from './formulas';
import { validateMortgageVsRentInputs } from './validation';

export const MortgageVsRentCalculator: Calculator = {
  name: 'Mortgage vs. Rent Calculator',
  category: 'finance',
  description: 'Compare the costs of buying a home with a mortgage versus renting, including long-term financial implications and break-even analysis.',
  
  inputs: [
    {
      name: 'homePrice',
      label: 'Home Purchase Price ($)',
      type: 'number',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      placeholder: '350000'
    },
    {
      name: 'downPayment',
      label: 'Down Payment ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '70000'
    },
    {
      name: 'interestRate',
      label: 'Mortgage Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 0.01,
      placeholder: '4.5'
    },
    {
      name: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    {
      name: 'monthlyRent',
      label: 'Monthly Rent ($)',
      type: 'number',
      required: true,
      min: 100,
      max: 50000,
      step: 10,
      placeholder: '2000'
    },
    {
      name: 'rentIncreaseRate',
      label: 'Annual Rent Increase Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected annual increase in rent'
    },
    {
      name: 'propertyTax',
      label: 'Annual Property Tax ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3500'
    },
    {
      name: 'homeInsurance',
      label: 'Annual Home Insurance ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '1200'
    },
    {
      name: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 5000,
      step: 10,
      placeholder: '0'
    },
    {
      name: 'maintenanceCosts',
      label: 'Annual Maintenance Costs ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '3000',
      description: 'Estimated annual maintenance and repairs'
    },
    {
      name: 'closingCosts',
      label: 'Closing Costs ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '7000'
    },
    {
      name: 'homeAppreciationRate',
      label: 'Annual Home Appreciation Rate (%)',
      type: 'number',
      required: false,
      min: -20,
      max: 20,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected annual home value increase'
    },
    {
      name: 'investmentReturn',
      label: 'Investment Return Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '7.0',
      description: 'Expected return on alternative investments'
    },
    {
      name: 'taxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '24',
      description: 'Your federal marginal tax rate'
    },
    {
      name: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '10',
      description: 'Period to compare buying vs. renting'
    },
    {
      name: 'includePMI',
      label: 'Include PMI',
      type: 'boolean',
      required: false,
      default: false
    },
    {
      name: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '0.5',
      description: 'Private mortgage insurance rate'
    },
    {
      name: 'includeUtilities',
      label: 'Include Utilities Comparison',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'buyerUtilities',
      label: 'Monthly Utilities (Buying) ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 2000,
      step: 10,
      placeholder: '300'
    },
    {
      name: 'renterUtilities',
      label: 'Monthly Utilities (Renting) ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 2000,
      step: 10,
      placeholder: '200'
    },
    {
      name: 'includeTaxBenefits',
      label: 'Include Tax Benefits',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeOpportunityCost',
      label: 'Include Opportunity Cost Analysis',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeLiquidity',
      label: 'Include Liquidity Analysis',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeFlexibility',
      label: 'Include Flexibility Analysis',
      type: 'boolean',
      required: false,
      default: true
    }
  ],

  outputs: [
    {
      name: 'recommendation',
      label: 'Recommendation',
      type: 'string',
      description: 'Recommended action based on analysis'
    },
    {
      name: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      description: 'Years until buying becomes cheaper than renting'
    },
    {
      name: 'monthlyCostDifference',
      label: 'Monthly Cost Difference ($)',
      type: 'number',
      description: 'Difference in monthly costs (positive = buying costs more)'
    },
    {
      name: 'totalCostComparison',
      label: 'Total Cost Comparison ($)',
      type: 'number',
      description: 'Total cost difference over analysis period'
    },
    {
      name: 'netWorthComparison',
      label: 'Net Worth Comparison ($)',
      type: 'number',
      description: 'Net worth difference after analysis period'
    },
    {
      name: 'monthlyMortgagePayment',
      label: 'Monthly Mortgage Payment ($)',
      type: 'number',
      description: 'Principal and interest payment'
    },
    {
      name: 'totalMonthlyCost',
      label: 'Total Monthly Cost (Buying) ($)',
      type: 'number',
      description: 'Total monthly cost including all expenses'
    },
    {
      name: 'totalMonthlyRent',
      label: 'Total Monthly Cost (Renting) ($)',
      type: 'number',
      description: 'Total monthly cost including rent and utilities'
    },
    {
      name: 'equityBuildUp',
      label: 'Equity Build-Up ($)',
      type: 'number',
      description: 'Equity accumulated over analysis period'
    },
    {
      name: 'opportunityCost',
      label: 'Opportunity Cost ($)',
      type: 'number',
      description: 'Investment returns lost on down payment and closing costs'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'array',
      description: 'Actionable recommendations'
    },
    {
      name: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'object',
      description: 'Detailed breakdown of all costs'
    },
    {
      name: 'financialAnalysis',
      label: 'Financial Analysis',
      type: 'object',
      description: 'Comprehensive financial comparison'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'object',
      description: 'Risks and considerations for each option'
    },
    {
      name: 'scenarioAnalysis',
      label: 'Scenario Analysis',
      type: 'object',
      description: 'Analysis under different market conditions'
    }
  ],

  calculate: calculateMortgageVsRent,
  validate: validateMortgageVsRentInputs,
  generateAnalysis: generateMortgageVsRentAnalysis
};