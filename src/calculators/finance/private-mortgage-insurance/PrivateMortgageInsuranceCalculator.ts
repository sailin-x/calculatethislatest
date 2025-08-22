import { Calculator } from '../../../types/calculator';
import { calculatePrivateMortgageInsurance, generatePrivateMortgageInsuranceAnalysis } from './formulas';
import { validatePrivateMortgageInsuranceInputs } from './validation';
import { quickValidatePrivateMortgageInsurance } from './quickValidation';
import { PrivateMortgageInsuranceInputs } from './validation';

export const PrivateMortgageInsuranceCalculator: Calculator = {
  id: 'private-mortgage-insurance',
  name: 'Private Mortgage Insurance Calculator',
  category: 'finance',
  description: 'Calculate PMI costs, requirements, and cancellation scenarios for conventional mortgages with less than 20% down payment.',
  tags: ['mortgage', 'PMI', 'insurance', 'down payment', 'LTV', 'conventional', 'cancellation'],
  inputs: [
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total mortgage loan amount',
      placeholder: '300000'
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Property purchase price or appraised value',
      placeholder: '375000'
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Down payment amount',
      placeholder: '75000'
    },
    {
      id: 'downPaymentPercentage',
      name: 'Down Payment Percentage',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Down payment as percentage of property value',
      placeholder: '20'
    },
    {
      id: 'creditScore',
      name: 'Credit Score',
      type: 'number',
      required: true,
      description: 'Borrower credit score (FICO)',
      placeholder: '750'
    },
    {
      id: 'loanType',
      name: 'Loan Type',
      type: 'select',
      required: true,
      description: 'Type of conventional loan',
      options: [
        { value: 'conventional_30', label: 'Conventional 30-Year Fixed' },
        { value: 'conventional_15', label: 'Conventional 15-Year Fixed' },
        { value: 'conventional_arm', label: 'Conventional ARM' },
        { value: 'jumbo', label: 'Jumbo Loan' },
        { value: 'conforming', label: 'Conforming Loan' }
      ],
      default: 'conventional_30'
    },
    {
      id: 'occupancyType',
      name: 'Occupancy Type',
      type: 'select',
      required: true,
      description: 'Property occupancy type',
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      default: 'primary'
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property',
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi_family', label: 'Multi-Family (2-4 units)' },
        { value: 'manufactured', label: 'Manufactured Home' }
      ],
      default: 'single_family'
    },
    {
      id: 'pmiType',
      name: 'PMI Type',
      type: 'select',
      required: true,
      description: 'Type of PMI coverage',
      options: [
        { value: 'monthly', label: 'Monthly PMI' },
        { value: 'single_premium', label: 'Single Premium PMI' },
        { value: 'split_premium', label: 'Split Premium PMI' },
        { value: 'lender_paid', label: 'Lender-Paid PMI' }
      ],
      default: 'monthly'
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Mortgage interest rate',
      placeholder: '4.5'
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: false,
      description: 'Loan term in years',
      placeholder: '30',
      default: 30
    },
    {
      id: 'debtToIncomeRatio',
      name: 'Debt-to-Income Ratio',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Borrower debt-to-income ratio',
      placeholder: '35'
    },
    {
      id: 'loanPurpose',
      name: 'Loan Purpose',
      type: 'select',
      required: false,
      description: 'Purpose of the loan',
      options: [
        { value: 'purchase', label: 'Purchase' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'cash_out', label: 'Cash-Out Refinance' }
      ],
      default: 'purchase'
    },
    {
      id: 'pmiRate',
      name: 'PMI Rate',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Annual PMI rate (if known)',
      placeholder: '0.5'
    },
    {
      id: 'pmiProvider',
      name: 'PMI Provider',
      type: 'select',
      required: false,
      description: 'PMI insurance provider',
      options: [
        { value: 'genworth', label: 'Genworth' },
        { value: 'mgic', label: 'MGIC' },
        { value: 'radian', label: 'Radian' },
        { value: 'essent', label: 'Essent' },
        { value: 'national', label: 'National MI' },
        { value: 'other', label: 'Other' }
      ],
      default: 'other'
    },
    {
      id: 'includeCancellation',
      name: 'Include Cancellation Analysis',
      type: 'boolean',
      required: false,
      description: 'Include PMI cancellation timeline analysis',
      default: true
    },
    {
      id: 'includeComparison',
      name: 'Include Comparison Analysis',
      type: 'boolean',
      required: false,
      description: 'Include comparison with 20% down payment',
      default: true
    },
    {
      id: 'includeBreakEven',
      name: 'Include Break-Even Analysis',
      type: 'boolean',
      required: false,
      description: 'Include break-even analysis for PMI vs. higher down payment',
      default: true
    },
    {
      id: 'propertyAppreciation',
      name: 'Property Appreciation Rate',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Expected annual property appreciation rate',
      placeholder: '3.0',
      default: 3.0
    },
    {
      id: 'additionalPayments',
      name: 'Additional Monthly Payments',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Additional principal payments per month',
      placeholder: '100'
    },
    {
      id: 'lumpSumPayment',
      name: 'Lump Sum Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'One-time lump sum payment to reduce principal',
      placeholder: '5000'
    }
  ],
  outputs: [
    {
      id: 'loanToValueRatio',
      name: 'Loan-to-Value Ratio',
      type: 'number',
      unit: 'percentage',
      description: 'Calculated LTV ratio'
    },
    {
      id: 'pmiRequired',
      name: 'PMI Required',
      type: 'boolean',
      description: 'Whether PMI is required'
    },
    {
      id: 'pmiCosts',
      name: 'PMI Costs',
      type: 'object',
      description: 'Detailed PMI cost breakdown'
    },
    {
      id: 'monthlyPMI',
      name: 'Monthly PMI Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly PMI payment amount'
    },
    {
      id: 'annualPMI',
      name: 'Annual PMI Cost',
      type: 'number',
      unit: 'USD',
      description: 'Annual PMI cost'
    },
    {
      id: 'totalPMI',
      name: 'Total PMI Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total PMI cost over loan term'
    },
    {
      id: 'cancellationAnalysis',
      name: 'Cancellation Analysis',
      type: 'object',
      description: 'PMI cancellation timeline and requirements'
    },
    {
      id: 'comparisonAnalysis',
      name: 'Comparison Analysis',
      type: 'object',
      description: 'Comparison with 20% down payment scenario'
    },
    {
      id: 'breakEvenAnalysis',
      type: 'object',
      name: 'Break-Even Analysis',
      description: 'Break-even analysis for PMI vs. higher down payment'
    },
    {
      id: 'paymentAnalysis',
      name: 'Payment Analysis',
      type: 'object',
      description: 'Monthly payment breakdown with and without PMI'
    },
    {
      id: 'costSavings',
      name: 'Cost Savings',
      type: 'object',
      description: 'Potential cost savings from PMI cancellation'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'array',
      description: 'Recommendations for PMI management'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'object',
      description: 'Risk assessment for PMI scenarios'
    },
    {
      id: 'timelineAnalysis',
      name: 'Timeline Analysis',
      type: 'object',
      description: 'Timeline for PMI cancellation scenarios'
    }
  ],
  calculate: (inputs: PrivateMortgageInsuranceInputs) => {
    return calculatePrivateMortgageInsurance(inputs);
  },
  validate: validatePrivateMortgageInsuranceInputs,
  quickValidate: quickValidatePrivateMortgageInsurance,
  generateAnalysis: (inputs: PrivateMortgageInsuranceInputs, outputs: any) => {
    return generatePrivateMortgageInsuranceAnalysis(inputs, outputs);
  }
};