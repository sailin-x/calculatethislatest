import { Calculator } from '../../../types/calculator';
import { calculateMortgageAPRComparison, generateMortgageAPRComparisonAnalysis } from './formulas';
import { validateMortgageAPRComparisonInputs } from './validation';

export const MortgageAPRComparisonCalculator: Calculator = {
  id: 'mortgage-apr-comparison-calculator',
  name: 'Mortgage APR Comparison Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Compare multiple mortgage options including APR, total costs, monthly payments, and long-term savings to find the best mortgage deal.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Total loan amount', placeholder: '300000', min: 10000, max: 5000000 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: false, description: 'Property purchase price or value', placeholder: '375000', min: 10000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '75000', min: 0, max: 5000000 },
    { id: 'downPaymentPercentage', name: 'Down Payment Percentage', type: 'number', unit: '%', required: false, description: 'Down payment as percentage of property value', placeholder: '20', min: 0, max: 100 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Select property type', options: ['Primary Residence', 'Secondary Home', 'Investment Property', 'Condominium', 'Townhouse', 'Manufactured Home', 'Multi-Family', 'Commercial'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'Occupancy status', placeholder: 'Select occupancy type', options: ['Owner Occupied', 'Non-Owner Occupied', 'Investment', 'Second Home'] },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of mortgage loan', placeholder: 'Select loan type', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'ARM', 'Interest Only', 'Balloon'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'Property state', placeholder: 'Select state', options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'] },
    { id: 'propertyTaxRate', name: 'Property Tax Rate', type: 'number', unit: '%/year', required: false, description: 'Annual property tax rate', placeholder: '1.2', min: 0, max: 10 },
    { id: 'homeownersInsuranceRate', name: 'Homeowners Insurance Rate', type: 'number', unit: '%/year', required: false, description: 'Annual homeowners insurance rate', placeholder: '0.5', min: 0, max: 5 },
    { id: 'pmiRate', name: 'PMI Rate', type: 'number', unit: '%/year', required: false, description: 'Private mortgage insurance rate', placeholder: '0.5', min: 0, max: 2 },
    { id: 'mortgageOptions', name: 'Mortgage Options', type: 'array', required: true, description: 'Array of mortgage options to compare', placeholder: 'Enter mortgage options' }
  ],
  outputs: [
    { id: 'comparisonTable', name: 'Comparison Table', type: 'object', description: 'Detailed comparison table of all mortgage options' },
    { id: 'bestOption', name: 'Best Option', type: 'object', description: 'Recommended mortgage option based on analysis' },
    { id: 'totalCostComparison', name: 'Total Cost Comparison', type: 'object', description: 'Total cost comparison over loan term' },
    { id: 'monthlyPaymentComparison', name: 'Monthly Payment Comparison', type: 'object', description: 'Monthly payment comparison' },
    { id: 'aprComparison', name: 'APR Comparison', type: 'object', description: 'APR comparison across all options' },
    { id: 'breakEvenAnalysis', name: 'Break-Even Analysis', type: 'object', description: 'Break-even analysis for different options' },
    { id: 'savingsAnalysis', name: 'Savings Analysis', type: 'object', description: 'Potential savings analysis' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Detailed recommendation based on analysis' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key comparison metrics' },
    { id: 'mortgageAPRComparisonAnalysis', name: 'Mortgage APR Comparison Analysis', type: 'string', description: 'Comprehensive mortgage APR comparison analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgageAPRComparison(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageAPRComparisonAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'APR Calculation',
      formula: 'APR = ((Total Finance Charges / Loan Amount) / Loan Term) × 100',
      description: 'Calculates the Annual Percentage Rate including all costs'
    },
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1] where P=payment, L=loan, c=monthly rate, n=total payments',
      description: 'Standard mortgage payment formula'
    },
    {
      name: 'Total Cost',
      formula: 'Total Cost = (Monthly Payment × Total Payments) + Closing Costs + Other Fees',
      description: 'Calculates total cost over the loan term'
    },
    {
      name: 'Break-Even Point',
      formula: 'Break-Even = (Higher Closing Costs - Lower Closing Costs) / (Lower Monthly Payment - Higher Monthly Payment)',
      description: 'Calculates months to break even between options'
    },
    {
      name: 'Total Savings',
      formula: 'Total Savings = (Higher Total Cost - Lower Total Cost)',
      description: 'Calculates total savings over loan term'
    }
  ]
};