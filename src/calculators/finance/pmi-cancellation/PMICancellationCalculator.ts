import { Calculator } from '../../../types/calculator';
import { calculatePMICancellation, generatePMICancellationAnalysis } from './formulas';
import { validatePMICancellationInputs } from './validation';
import { quickValidatePMICancellation } from './quickValidation';
import { PMICancellationInputs } from './validation';

export const PMICancellationCalculator: Calculator = {
  id: 'pmi-cancellation',
  name: 'PMI Cancellation Calculator',
  category: 'finance',
  description: 'Calculate when PMI can be cancelled and the potential savings from early PMI removal.',
  tags: ['mortgage', 'PMI', 'insurance', 'cancellation', 'savings', 'equity', 'LTV'],
  inputs: [
    {
      id: 'originalLoanAmount',
      name: 'Original Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Original mortgage loan amount',
      placeholder: '300000'
    },
    {
      id: 'currentLoanBalance',
      name: 'Current Loan Balance',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current outstanding loan balance',
      placeholder: '280000'
    },
    {
      id: 'originalPropertyValue',
      name: 'Original Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Property value at time of purchase',
      placeholder: '375000'
    },
    {
      id: 'currentPropertyValue',
      name: 'Current Property Value',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Current estimated property value',
      placeholder: '400000'
    },
    {
      id: 'pmiRate',
      name: 'PMI Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Annual PMI rate as percentage of loan balance',
      placeholder: '0.5'
    },
    {
      id: 'monthlyPMI',
      name: 'Monthly PMI Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Current monthly PMI payment amount',
      placeholder: '116.67'
    },
    {
      id: 'loanType',
      name: 'Loan Type',
      type: 'select',
      required: true,
      description: 'Type of mortgage loan',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'usda', label: 'USDA' },
        { value: 'va', label: 'VA' }
      ],
      default: 'conventional'
    },
    {
      id: 'loanStartDate',
      name: 'Loan Start Date',
      type: 'date',
      required: true,
      description: 'Date when the loan was originated',
      placeholder: '2020-01-15'
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Original down payment amount',
      placeholder: '75000'
    },
    {
      id: 'downPaymentPercentage',
      name: 'Down Payment Percentage',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Original down payment as percentage of property value',
      placeholder: '20'
    },
    {
      id: 'monthlyPayment',
      name: 'Monthly Mortgage Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Current monthly mortgage payment (excluding PMI)',
      placeholder: '1500'
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Current mortgage interest rate',
      placeholder: '4.5'
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: false,
      description: 'Original loan term in years',
      placeholder: '30',
      default: 30
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
    },
    {
      id: 'cancellationMethod',
      name: 'Cancellation Method',
      type: 'select',
      required: false,
      description: 'Method for PMI cancellation',
      options: [
        { value: 'automatic', label: 'Automatic (80% LTV)' },
        { value: 'request', label: 'Request (80% LTV)' },
        { value: 'automatic_78', label: 'Automatic (78% LTV)' },
        { value: 'request_75', label: 'Request (75% LTV)' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'home_improvement', label: 'Home Improvement' }
      ],
      default: 'automatic'
    },
    {
      id: 'appraisalCost',
      name: 'Appraisal Cost',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Cost of property appraisal for PMI cancellation',
      placeholder: '500'
    },
    {
      id: 'refinanceCosts',
      name: 'Refinance Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Total costs to refinance (if applicable)',
      placeholder: '3000'
    },
    {
      id: 'newInterestRate',
      name: 'New Interest Rate',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'New interest rate if refinancing',
      placeholder: '4.0'
    },
    {
      id: 'includeAppreciation',
      name: 'Include Property Appreciation',
      type: 'boolean',
      required: false,
      description: 'Include property appreciation in calculations',
      default: true
    },
    {
      id: 'includeAdditionalPayments',
      name: 'Include Additional Payments',
      type: 'boolean',
      required: false,
      description: 'Include additional payments in calculations',
      default: false
    },
    {
      id: 'includeRefinance',
      name: 'Include Refinance Option',
      type: 'boolean',
      required: false,
      description: 'Include refinance analysis',
      default: false
    },
    {
      id: 'includeBreakEven',
      name: 'Include Break-Even Analysis',
      type: 'boolean',
      required: false,
      description: 'Include break-even analysis for cancellation costs',
      default: true
    }
  ],
  outputs: [
    {
      id: 'currentLTV',
      name: 'Current LTV',
      type: 'number',
      unit: 'percentage',
      description: 'Current loan-to-value ratio'
    },
    {
      id: 'cancellationLTV',
      name: 'Cancellation LTV',
      type: 'number',
      unit: 'percentage',
      description: 'LTV required for PMI cancellation'
    },
    {
      id: 'monthsToCancellation',
      name: 'Months to Cancellation',
      type: 'number',
      unit: 'months',
      description: 'Estimated months until PMI can be cancelled'
    },
    {
      id: 'cancellationDate',
      name: 'Cancellation Date',
      type: 'string',
      description: 'Estimated date when PMI can be cancelled'
    },
    {
      id: 'pmiSavings',
      name: 'PMI Savings',
      type: 'object',
      description: 'Total PMI savings from cancellation'
    },
    {
      id: 'monthlySavings',
      name: 'Monthly Savings',
      type: 'number',
      unit: 'USD',
      description: 'Monthly savings after PMI cancellation'
    },
    {
      id: 'annualSavings',
      name: 'Annual Savings',
      type: 'number',
      unit: 'USD',
      description: 'Annual savings after PMI cancellation'
    },
    {
      id: 'totalSavings',
      name: 'Total Savings',
      type: 'number',
      unit: 'USD',
      description: 'Total savings over remaining loan term'
    },
    {
      id: 'breakEvenMonths',
      name: 'Break-Even Months',
      type: 'number',
      unit: 'months',
      description: 'Months to break even on cancellation costs'
    },
    {
      id: 'equityAnalysis',
      name: 'Equity Analysis',
      type: 'object',
      description: 'Current and projected equity analysis'
    },
    {
      id: 'paymentAnalysis',
      name: 'Payment Analysis',
      type: 'object',
      description: 'Payment reduction analysis'
    },
    {
      id: 'refinanceAnalysis',
      name: 'Refinance Analysis',
      type: 'object',
      description: 'Refinance option analysis'
    },
    {
      id: 'cancellationOptions',
      name: 'Cancellation Options',
      type: 'array',
      description: 'Available PMI cancellation options'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'array',
      description: 'Recommendations for PMI cancellation'
    },
    {
      id: 'timelineAnalysis',
      name: 'Timeline Analysis',
      type: 'object',
      description: 'Timeline for PMI cancellation scenarios'
    },
    {
      id: 'costBenefitAnalysis',
      name: 'Cost-Benefit Analysis',
      type: 'object',
      description: 'Cost-benefit analysis of cancellation options'
    }
  ],
  calculate: (inputs: PMICancellationInputs) => {
    return calculatePMICancellation(inputs);
  },
  validate: validatePMICancellationInputs,
  quickValidate: quickValidatePMICancellation,
  generateAnalysis: (inputs: PMICancellationInputs, outputs: any) => {
    return generatePMICancellationAnalysis(inputs, outputs);
  }
};