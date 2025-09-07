import { Calculator } from '../../../types/calculator';

export const PmiCancellationCalculator: Calculator = {
  id: 'pmi-cancellation-calculator',
  title: 'PMI Cancellation Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate when you can cancel private mortgage insurance (PMI) and how much you can save by removing PMI from your mortgage payments.',
  usageInstructions: [
    'Enter your loan details and current home value',
    'Specify your PMI rate and loan-to-value ratio',
    'Determine automatic vs. lender-paid PMI cancellation',
    'Calculate savings from PMI removal'
  ],
  inputs: [
    // Loan Information
    { id: 'originalLoanAmount', label: 'Original Loan Amount', type: 'currency', required: true, placeholder: '300000', tooltip: 'The original amount of your mortgage loan' },
    { id: 'currentLoanBalance', label: 'Current Loan Balance', type: 'currency', required: true, placeholder: '250000', tooltip: 'Your current remaining loan balance' },
    { id: 'currentHomeValue', label: 'Current Home Value', type: 'currency', required: true, placeholder: '350000', tooltip: 'Current market value of your home' },

    // PMI Information
    { id: 'pmiRate', label: 'PMI Rate (%)', type: 'percentage', required: true, placeholder: '0.5', tooltip: 'Your current private mortgage insurance rate' },
    { id: 'monthlyPmiPayment', label: 'Monthly PMI Payment', type: 'currency', required: false, placeholder: '125', tooltip: 'Your current monthly PMI payment' },

    // Loan Terms
    { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', required: true, placeholder: '30', tooltip: 'Original term of your mortgage' },
    { id: 'yearsOwned', label: 'Years Owned', type: 'number', required: true, placeholder: '3', tooltip: 'How many years you have owned the home' },

    // Cancellation Options
    { id: 'cancellationType', label: 'Cancellation Type', type: 'select', required: true, options: [
      { value: 'automatic', label: 'Automatic (78% LTV)' },
      { value: 'lender', label: 'Lender-Paid (80% LTV)' },
      { value: 'borrower', label: 'Borrower-Paid (78% LTV)' }
    ], tooltip: 'Type of PMI cancellation you want to calculate' },

    // Additional Options
    { id: 'homeAppreciation', label: 'Annual Home Appreciation (%)', type: 'percentage', required: false, placeholder: '3', tooltip: 'Expected annual home value increase' },
    { id: 'yearsToCancel', label: 'Years Until Cancellation', type: 'number', required: false, placeholder: '2', tooltip: 'Years until you plan to cancel PMI' }
  ],
  outputs: [
    { id: 'currentLtvRatio', label: 'Current Loan-to-Value Ratio (%)', type: 'percentage', explanation: 'Your current LTV ratio based on home value' },
    { id: 'automaticCancellationLtv', label: 'Automatic Cancellation LTV (%)', type: 'percentage', explanation: 'LTV ratio required for automatic PMI cancellation' },
    { id: 'lenderCancellationLtv', label: 'Lender Cancellation LTV (%)', type: 'percentage', explanation: 'LTV ratio required for lender-paid PMI cancellation' },
    { id: 'canCancelNow', label: 'Can Cancel PMI Now?', type: 'text', explanation: 'Whether you can cancel PMI based on current LTV' },
    { id: 'monthsToAutomatic', label: 'Months to Automatic Cancellation', type: 'number', explanation: 'Months until automatic PMI cancellation eligibility' },
    { id: 'monthsToLender', label: 'Months to Lender Cancellation', type: 'number', explanation: 'Months until lender-paid PMI cancellation eligibility' },
    { id: 'futureHomeValue', label: 'Future Home Value', type: 'currency', explanation: 'Projected home value at cancellation time' },
    { id: 'futureLtvRatio', label: 'Future LTV Ratio (%)', type: 'percentage', explanation: 'Projected LTV ratio at cancellation time' },
    { id: 'totalPmiPaid', label: 'Total PMI Paid to Date', type: 'currency', explanation: 'Total PMI payments made so far' },
    { id: 'futurePmiSavings', label: 'Future PMI Savings', type: 'currency', explanation: 'Total PMI savings from cancellation' },
    { id: 'monthlySavings', label: 'Monthly Savings', type: 'currency', explanation: 'Monthly savings after PMI cancellation' },
    { id: 'breakEvenYears', label: 'Break-Even Years', type: 'number', explanation: 'Years to break even on PMI cancellation costs' },
    { id: 'recommendation', label: 'Cancellation Recommendation', type: 'text', explanation: 'Recommended timing for PMI cancellation' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};