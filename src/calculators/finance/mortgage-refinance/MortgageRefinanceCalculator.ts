import { Calculator } from '../../../types/calculator';
import { calculateMortgageRefinance, generateMortgageRefinanceAnalysis } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';

export const MortgageRefinanceCalculator: Calculator = {
  name: 'Mortgage Refinance Calculator',
  category: 'finance',
  description: 'Calculate the costs and benefits of refinancing a mortgage, including break-even analysis, monthly savings, and total cost comparison.',
  
  inputs: [
    {
      name: 'currentLoanAmount',
      label: 'Current Loan Balance ($)',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '250000'
    },
    {
      name: 'currentRate',
      label: 'Current Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 0.01,
      placeholder: '5.5'
    },
    {
      name: 'currentTerm',
      label: 'Current Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    {
      name: 'currentMonthlyPayment',
      label: 'Current Monthly Payment ($)',
      type: 'number',
      required: true,
      min: 100,
      max: 50000,
      step: 10,
      placeholder: '1420'
    },
    {
      name: 'newRate',
      label: 'New Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 0.01,
      placeholder: '4.0'
    },
    {
      name: 'newTerm',
      label: 'New Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    {
      name: 'refinanceCosts',
      label: 'Refinance Closing Costs ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '5000'
    },
    {
      name: 'cashOutAmount',
      label: 'Cash-Out Amount ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0'
    },
    {
      name: 'propertyValue',
      label: 'Current Property Value ($)',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '350000'
    },
    {
      name: 'remainingPayments',
      label: 'Remaining Payments on Current Loan',
      type: 'number',
      required: false,
      min: 1,
      max: 600,
      step: 1,
      placeholder: '300',
      description: 'Number of payments left on current loan'
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
      name: 'refinanceType',
      label: 'Refinance Type',
      type: 'select',
      required: true,
      options: [
        { value: 'rate-term', label: 'Rate & Term Refinance' },
        { value: 'cash-out', label: 'Cash-Out Refinance' },
        { value: 'streamline', label: 'Streamline Refinance' },
        { value: 'fha-to-conventional', label: 'FHA to Conventional' },
        { value: 'va-irrrl', label: 'VA IRRRL' }
      ],
      placeholder: 'rate-term'
    },
    {
      name: 'loanType',
      label: 'New Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      placeholder: 'conventional'
    },
    {
      name: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
    {
      name: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '35'
    },
    {
      name: 'includePMI',
      label: 'Include PMI in New Loan',
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
      name: 'includePropertyTax',
      label: 'Include Property Tax',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'propertyTax',
      label: 'Annual Property Tax ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3500'
    },
    {
      name: 'includeHomeInsurance',
      label: 'Include Home Insurance',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'homeInsurance',
      label: 'Annual Home Insurance ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '1200'
    },
    {
      name: 'includeHOA',
      label: 'Include HOA Fees',
      type: 'boolean',
      required: false,
      default: false
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
      name: 'breakEvenPeriod',
      label: 'Break-Even Analysis Period (years)',
      type: 'number',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5',
      description: 'Period to analyze for break-even'
    },
    {
      name: 'includeAmortization',
      label: 'Include Amortization Schedule',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeTaxSavings',
      label: 'Include Tax Savings Analysis',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeInvestmentComparison',
      label: 'Include Investment Comparison',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'investmentReturn',
      label: 'Expected Investment Return (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '7',
      description: 'Expected return if investing savings'
    }
  ],

  outputs: [
    {
      name: 'refinanceDecision',
      label: 'Refinance Decision',
      type: 'string',
      description: 'Recommended action based on analysis'
    },
    {
      name: 'monthlySavings',
      label: 'Monthly Payment Savings ($)',
      type: 'number',
      description: 'Difference in monthly payments'
    },
    {
      name: 'totalInterestSavings',
      label: 'Total Interest Savings ($)',
      type: 'number',
      description: 'Total interest saved over loan term'
    },
    {
      name: 'breakEvenMonths',
      label: 'Break-Even Months',
      type: 'number',
      description: 'Months until refinance costs are recovered'
    },
    {
      name: 'newMonthlyPayment',
      label: 'New Monthly Payment ($)',
      type: 'number',
      description: 'Monthly payment on new loan'
    },
    {
      name: 'newLoanAmount',
      label: 'New Loan Amount ($)',
      type: 'number',
      description: 'Total new loan amount including cash-out'
    },
    {
      name: 'loanToValueRatio',
      label: 'New Loan-to-Value Ratio (%)',
      type: 'number',
      description: 'LTV ratio after refinance'
    },
    {
      name: 'refinanceValue',
      label: 'Refinance Value ($)',
      type: 'number',
      description: 'Net value of refinancing decision'
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
      description: 'Detailed breakdown of costs and savings'
    },
    {
      name: 'amortizationComparison',
      label: 'Amortization Comparison',
      type: 'object',
      description: 'Comparison of payment schedules'
    },
    {
      name: 'taxAnalysis',
      label: 'Tax Analysis',
      type: 'object',
      description: 'Tax implications and savings'
    },
    {
      name: 'investmentAnalysis',
      label: 'Investment Analysis',
      type: 'object',
      description: 'Comparison with investment alternatives'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'object',
      description: 'Risks and considerations'
    }
  ],

  calculate: calculateMortgageRefinance,
  validate: validateMortgageRefinanceInputs,
  generateAnalysis: generateMortgageRefinanceAnalysis
};