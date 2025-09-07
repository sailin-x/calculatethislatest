import { Calculator } from '../../../types/calculator';

export const PrivateMortgageInsuranceCalculator: Calculator = {
  id: 'private-mortgage-insurance-calculator',
  title: 'Private Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate private mortgage insurance (PMI) costs, cancellation timing, and savings from PMI cancellation.',
  usageInstructions: [
    'Enter your loan amount and down payment to calculate PMI requirements',
    'Use the calculator to determine when you can cancel PMI',
    'Compare different PMI rates and terms',
    'Calculate potential savings from PMI cancellation'
  ],
  inputs: [
    // Loan Information
    { id: 'loanAmount', label: 'Loan Amount', type: 'currency', required: true, placeholder: '300000', tooltip: 'Total mortgage loan amount' },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', required: true, placeholder: '30000', tooltip: 'Initial down payment amount' },
    { id: 'homeValue', label: 'Home Value', type: 'currency', required: true, placeholder: '330000', tooltip: 'Current appraised value of the home' },

    // PMI Details
    { id: 'pmiRate', label: 'PMI Rate (%)', type: 'percentage', required: true, placeholder: '0.55', tooltip: 'Annual PMI rate as percentage' },
    { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', required: true, placeholder: '30', tooltip: 'Original loan term in years' },

    // Current Status
    { id: 'currentLoanBalance', label: 'Current Loan Balance', type: 'currency', required: false, placeholder: '295000', tooltip: 'Current remaining loan balance' },
    { id: 'yearsOwned', label: 'Years Owned', type: 'number', required: false, placeholder: '3', tooltip: 'Number of years you have owned the home' },

    // Comparison Options
    { id: 'compareRate1', label: 'Compare PMI Rate 1 (%)', type: 'percentage', required: false, placeholder: '0.45', tooltip: 'Alternative PMI rate for comparison' },
    { id: 'compareRate2', label: 'Compare PMI Rate 2 (%)', type: 'percentage', required: false, placeholder: '0.65', tooltip: 'Second alternative PMI rate for comparison' },

    // Lender PMI Cancellation Rules
    { id: 'lenderRule', label: 'Lender PMI Rule', type: 'select', required: false, options: [
      { value: 'automatic', label: 'Automatic at 78% LTV' },
      { value: 'request', label: 'Request at 80% LTV' },
      { value: 'manual', label: 'Manual Review Required' },
      { value: 'never', label: 'No Automatic Cancellation' }
    ], tooltip: 'Your lender\'s PMI cancellation policy' }
  ],
  outputs: [
    { id: 'ltvRatio', label: 'LTV Ratio (%)', type: 'percentage', explanation: 'Loan-to-value ratio based on current home value' },
    { id: 'pmiRequired', label: 'PMI Required', type: 'text', explanation: 'Whether PMI is required based on LTV' },
    { id: 'monthlyPmi', label: 'Monthly PMI Payment', type: 'currency', explanation: 'Current monthly PMI payment' },
    { id: 'annualPmi', label: 'Annual PMI Cost', type: 'currency', explanation: 'Total annual PMI cost' },
    { id: 'totalPmiPaid', label: 'Total PMI Paid to Date', type: 'currency', explanation: 'Total PMI paid since loan origination' },
    { id: 'cancellationEligible', label: 'Cancellation Eligible', type: 'text', explanation: 'Whether you are eligible to cancel PMI' },
    { id: 'cancellationLtv', label: 'Cancellation LTV Threshold', type: 'percentage', explanation: 'LTV ratio needed for PMI cancellation' },
    { id: 'monthsToCancellation', label: 'Months to Cancellation', type: 'number', explanation: 'Estimated months until PMI cancellation eligibility' },
    { id: 'savingsFromCancellation', label: 'Annual Savings from Cancellation', type: 'currency', explanation: 'Money saved annually by canceling PMI' },
    { id: 'totalSavings', label: 'Total Savings Over Loan', type: 'currency', explanation: 'Total PMI savings over remaining loan term' },
    { id: 'compareSavings1', label: 'Savings with Rate 1', type: 'currency', explanation: 'Annual savings with alternative PMI rate 1' },
    { id: 'compareSavings2', label: 'Savings with Rate 2', type: 'currency', explanation: 'Annual savings with alternative PMI rate 2' },
    { id: 'breakEvenAnalysis', label: 'Break-Even Analysis', type: 'text', explanation: 'When lower PMI rate becomes cost-effective' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};