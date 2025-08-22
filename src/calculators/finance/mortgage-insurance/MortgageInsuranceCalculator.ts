import { Calculator } from '../../../types/calculator';
import { calculateMortgageInsurance, generateMortgageInsuranceAnalysis } from './formulas';
import { validateMortgageInsuranceInputs } from './validation';

export const MortgageInsuranceCalculator: Calculator = {
  id: 'mortgage-insurance-calculator',
  name: 'Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage insurance costs including PMI, MIP, and other insurance premiums, with cancellation analysis and cost comparison.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Mortgage loan amount', placeholder: '300000', min: 10000, max: 5000000 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Property purchase price or appraised value', placeholder: '375000', min: 10000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '75000', min: 0, max: 5000000 },
    { id: 'downPaymentPercentage', name: 'Down Payment Percentage', type: 'number', unit: '%', required: false, description: 'Down payment as percentage of property value', placeholder: '20', min: 0, max: 100 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: true, description: 'Type of mortgage loan', placeholder: 'Select loan type', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'ARM', 'Interest Only', 'Balloon'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Debt-to-income ratio', placeholder: '35', min: 0, max: 100 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Select property type', options: ['Primary Residence', 'Secondary Home', 'Investment Property', 'Condominium', 'Townhouse', 'Manufactured Home', 'Multi-Family', 'Commercial'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'Occupancy status', placeholder: 'Select occupancy type', options: ['Owner Occupied', 'Non-Owner Occupied', 'Investment', 'Second Home'] },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%/year', required: false, description: 'Mortgage interest rate', placeholder: '4.5', min: 0, max: 25 },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', required: false, description: 'Monthly mortgage payment', placeholder: '1520', min: 0, max: 50000 },
    { id: 'fhaUpfrontMIP', name: 'FHA Upfront MIP', type: 'number', unit: '%', required: false, description: 'FHA upfront MIP percentage', placeholder: '1.75', min: 0, max: 10 },
    { id: 'fhaAnnualMIP', name: 'FHA Annual MIP', type: 'number', unit: '%', required: false, description: 'FHA annual MIP percentage', placeholder: '0.85', min: 0, max: 5 },
    { id: 'vaFundingFee', name: 'VA Funding Fee', type: 'number', unit: '%', required: false, description: 'VA funding fee percentage', placeholder: '2.3', min: 0, max: 10 },
    { id: 'usdaGuaranteeFee', name: 'USDA Guarantee Fee', type: 'number', unit: '%', required: false, description: 'USDA guarantee fee percentage', placeholder: '1', min: 0, max: 5 },
    { id: 'pmiRate', name: 'PMI Rate', type: 'number', unit: '%/year', required: false, description: 'Private mortgage insurance rate', placeholder: '0.5', min: 0, max: 2 },
    { id: 'pmiCancellationThreshold', name: 'PMI Cancellation Threshold', type: 'number', unit: '%', required: false, description: 'LTV threshold for PMI cancellation', placeholder: '78', min: 70, max: 85 },
    { id: 'propertyAppreciationRate', name: 'Property Appreciation Rate', type: 'number', unit: '%/year', required: false, description: 'Expected annual property appreciation', placeholder: '3', min: -10, max: 20 },
    { id: 'additionalPrincipalPayment', name: 'Additional Principal Payment', type: 'number', unit: 'USD/month', required: false, description: 'Additional monthly principal payment', placeholder: '100', min: 0, max: 10000 },
    { id: 'refinanceOption', name: 'Refinance Option', type: 'select', required: false, description: 'Consider refinancing to remove insurance', placeholder: 'Select refinance option', options: ['No Refinance', 'Conventional Refinance', 'FHA Streamline', 'VA IRRRL', 'USDA Streamline'] },
    { id: 'refinanceRate', name: 'Refinance Rate', type: 'number', unit: '%/year', required: false, description: 'Refinance interest rate', placeholder: '4.0', min: 0, max: 25 },
    { id: 'refinanceClosingCosts', name: 'Refinance Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Refinance closing costs', placeholder: '5000', min: 0, max: 50000 },
    { id: 'timeHorizon', name: 'Time Horizon', type: 'number', unit: 'years', required: false, description: 'Analysis time horizon', placeholder: '5', min: 1, max: 30 }
  ],
  outputs: [
    { id: 'loanToValueRatio', name: 'Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Current LTV ratio' },
    { id: 'insuranceRequired', name: 'Insurance Required', type: 'boolean', description: 'Whether mortgage insurance is required' },
    { id: 'insuranceType', name: 'Insurance Type', type: 'string', description: 'Type of insurance required' },
    { id: 'annualInsuranceCost', name: 'Annual Insurance Cost', type: 'number', unit: 'USD', description: 'Annual insurance premium' },
    { id: 'monthlyInsuranceCost', name: 'Monthly Insurance Cost', type: 'number', unit: 'USD', description: 'Monthly insurance premium' },
    { id: 'upfrontInsuranceCost', name: 'Upfront Insurance Cost', type: 'number', unit: 'USD', description: 'Upfront insurance cost' },
    { id: 'totalInsuranceCost', name: 'Total Insurance Cost', type: 'number', unit: 'USD', description: 'Total insurance cost over loan term' },
    { id: 'cancellationAnalysis', name: 'Cancellation Analysis', type: 'object', description: 'Analysis of when insurance can be cancelled' },
    { id: 'refinanceAnalysis', name: 'Refinance Analysis', type: 'object', description: 'Analysis of refinancing to remove insurance' },
    { id: 'costComparison', name: 'Cost Comparison', type: 'object', description: 'Comparison of different insurance options' },
    { id: 'savingsAnalysis', name: 'Savings Analysis', type: 'object', description: 'Potential savings from insurance removal' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Recommendations for insurance management' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key insurance metrics and analysis' },
    { id: 'mortgageInsuranceAnalysis', name: 'Mortgage Insurance Analysis', type: 'string', description: 'Comprehensive mortgage insurance analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgageInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Loan Amount / Property Value) × 100',
      description: 'Calculates the loan-to-value ratio'
    },
    {
      name: 'PMI Annual Cost',
      formula: 'Annual PMI = Loan Amount × PMI Rate',
      description: 'Calculates annual PMI cost'
    },
    {
      name: 'FHA MIP Annual Cost',
      formula: 'Annual MIP = Loan Amount × Annual MIP Rate',
      description: 'Calculates annual FHA MIP cost'
    },
    {
      name: 'FHA Upfront MIP Cost',
      formula: 'Upfront MIP = Loan Amount × Upfront MIP Rate',
      description: 'Calculates FHA upfront MIP cost'
    },
    {
      name: 'VA Funding Fee',
      formula: 'VA Funding Fee = Loan Amount × Funding Fee Rate',
      description: 'Calculates VA funding fee'
    },
    {
      name: 'USDA Guarantee Fee',
      formula: 'USDA Guarantee Fee = Loan Amount × Guarantee Fee Rate',
      description: 'Calculates USDA guarantee fee'
    },
    {
      name: 'Insurance Cancellation',
      formula: 'Cancellation LTV = 78% (automatic) or 80% (request)',
      description: 'Determines when insurance can be cancelled'
    },
    {
      name: 'Total Insurance Cost',
      formula: 'Total Cost = Upfront Cost + (Annual Cost × Years)',
      description: 'Calculates total insurance cost over loan term'
    }
  ]
};