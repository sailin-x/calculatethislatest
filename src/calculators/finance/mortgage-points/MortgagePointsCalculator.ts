import { Calculator } from '../../../types/calculator';
import { calculateMortgagePoints, generateMortgagePointsAnalysis } from './formulas';
import { validateMortgagePointsInputs } from './validation';

export const MortgagePointsCalculator: Calculator = {
  id: 'mortgage-points-calculator',
  name: 'Mortgage Points Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage points costs, rate reductions, and break-even analysis to determine if buying points makes financial sense.',
  inputs: [
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '250000',
      description: 'Total loan amount in dollars'
    },
    {
      id: 'originalRate',
      name: 'Original Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.125,
      placeholder: '4.5',
      description: 'Interest rate without points'
    },
    {
      id: 'reducedRate',
      name: 'Reduced Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.125,
      placeholder: '4.25',
      description: 'Interest rate after buying points'
    },
    {
      id: 'loanTerm',
      name: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'Length of loan in years'
    },
    {
      id: 'pointsCost',
      name: 'Points Cost',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2500',
      description: 'Total cost of points in dollars'
    },
    {
      id: 'pointsPercentage',
      name: 'Points Percentage',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.125,
      placeholder: '1',
      description: 'Percentage of loan amount for points'
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '8000',
      description: 'Total closing costs excluding points'
    },
    {
      id: 'propertyTax',
      name: 'Annual Property Tax',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000',
      description: 'Annual property tax amount'
    },
    {
      id: 'homeInsurance',
      name: 'Annual Home Insurance',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1200',
      description: 'Annual homeowners insurance premium'
    },
    {
      id: 'pmi',
      name: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '0.5',
      description: 'Private mortgage insurance rate'
    },
    {
      id: 'hoaFees',
      name: 'Monthly HOA Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 2000,
      step: 10,
      placeholder: '200',
      description: 'Monthly homeowners association fees'
    },
    {
      id: 'taxRate',
      name: 'Marginal Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '25',
      description: 'Your marginal federal tax rate'
    },
    {
      id: 'investmentReturn',
      name: 'Investment Return Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      placeholder: '7',
      description: 'Expected annual return on alternative investments'
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    {
      id: 'plannedOwnership',
      name: 'Planned Ownership Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '10',
      description: 'How long you plan to own the property'
    },
    {
      id: 'refinanceLikelihood',
      name: 'Likelihood of Refinancing',
      type: 'select',
      required: false,
      options: [
        { value: 'low', label: 'Low (Unlikely to refinance)' },
        { value: 'medium', label: 'Medium (May refinance in 5-10 years)' },
        { value: 'high', label: 'High (Likely to refinance soon)' }
      ],
      placeholder: 'medium',
      description: 'Probability of refinancing before loan maturity'
    },
    {
      id: 'includeTaxBenefits',
      name: 'Include Tax Benefits',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include tax benefits in calculations'
    },
    {
      id: 'includeOpportunityCost',
      name: 'Include Opportunity Cost',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include opportunity cost of points in calculations'
    },
    {
      id: 'compareScenarios',
      name: 'Compare Multiple Scenarios',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Compare different points scenarios'
    },
    {
      id: 'analysisPeriod',
      name: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '10',
      description: 'Period for detailed analysis'
    },
    {
      id: 'pointsOptions',
      name: 'Points Options to Compare',
      type: 'multiselect',
      required: false,
      options: [
        { value: '0', label: '0 Points' },
        { value: '0.5', label: '0.5 Points' },
        { value: '1', label: '1 Point' },
        { value: '1.5', label: '1.5 Points' },
        { value: '2', label: '2 Points' },
        { value: '2.5', label: '2.5 Points' },
        { value: '3', label: '3 Points' }
      ],
      placeholder: ['0', '1', '2'],
      description: 'Different points scenarios to compare'
    }
  ],
  outputs: [
    {
      id: 'pointsCost',
      name: 'Points Cost',
      type: 'number',
      description: 'Total cost of points'
    },
    {
      id: 'rateReduction',
      name: 'Rate Reduction',
      type: 'number',
      description: 'Interest rate reduction in percentage points'
    },
    {
      id: 'monthlySavings',
      name: 'Monthly Payment Savings',
      type: 'number',
      description: 'Monthly payment reduction'
    },
    {
      id: 'annualSavings',
      name: 'Annual Savings',
      type: 'number',
      description: 'Annual payment savings'
    },
    {
      id: 'breakEvenMonths',
      name: 'Break-Even Months',
      type: 'number',
      description: 'Number of months to break even on points cost'
    },
    {
      id: 'breakEvenYears',
      name: 'Break-Even Years',
      type: 'number',
      description: 'Number of years to break even on points cost'
    },
    {
      id: 'totalSavings',
      name: 'Total Savings',
      type: 'number',
      description: 'Total savings over loan term'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      description: 'Net present value of points investment'
    },
    {
      id: 'roi',
      name: 'Return on Investment',
      type: 'number',
      description: 'Return on investment percentage'
    },
    {
      id: 'scenarioComparison',
      name: 'Scenario Comparison',
      type: 'object',
      description: 'Comparison of different points scenarios'
    },
    {
      id: 'breakEvenAnalysis',
      name: 'Break-Even Analysis',
      type: 'object',
      description: 'Detailed break-even analysis'
    },
    {
      id: 'costBenefitAnalysis',
      name: 'Cost-Benefit Analysis',
      type: 'object',
      description: 'Comprehensive cost-benefit analysis'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'array',
      description: 'Recommendations based on analysis'
    }
  ],
  calculate: (inputs) => {
    return calculateMortgagePoints(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgagePointsAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Points Cost',
      formula: 'Points Cost = Loan Amount × Points Percentage',
      description: 'Cost of buying points as percentage of loan amount'
    },
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = monthly payment, L = loan amount, c = monthly interest rate, n = total number of payments'
    },
    {
      name: 'Break-Even Period',
      formula: 'Break-Even = Points Cost ÷ Monthly Savings',
      description: 'Number of months to recover points cost through payment savings'
    },
    {
      name: 'Total Savings',
      formula: 'Total Savings = Monthly Savings × Total Payments',
      description: 'Total savings over the entire loan term'
    },
    {
      name: 'Net Present Value',
      formula: 'NPV = -Points Cost + Σ(Monthly Savings ÷ (1 + r)^t)',
      description: 'Present value of all future savings minus points cost'
    }
  ]
};