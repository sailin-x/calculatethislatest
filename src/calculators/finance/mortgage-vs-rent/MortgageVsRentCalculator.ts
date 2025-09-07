import { Calculator } from '../../../types/calculator';

export const MortgageVsRentCalculator: Calculator = {
  id: 'mortgage-vs-rent-calculator',
  title: 'Mortgage vs. Rent Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Compare the costs of buying a home vs. renting to determine which option is more financially beneficial over time.',
  usageInstructions: [
    'Enter your home purchase details including price, down payment, and loan terms',
    'Input your current or expected rent amount and annual rent increases',
    'Include additional costs like property taxes, insurance, maintenance, and HOA fees',
    'Review the comparison results to see which option saves more money over time'
  ],
  inputs: [
    // Home Purchase Information
    { id: 'homePrice', label: 'Home Price', type: 'currency', required: true, placeholder: '500000', tooltip: 'Total purchase price of the home' },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', required: true, placeholder: '100000', tooltip: 'Amount you will pay upfront' },
    { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', required: true, placeholder: '30', tooltip: 'Length of the mortgage loan' },
    { id: 'interestRate', label: 'Mortgage Interest Rate (%)', type: 'percentage', required: true, placeholder: '7.0', tooltip: 'Annual mortgage interest rate' },

    // Rent Information
    { id: 'monthlyRent', label: 'Monthly Rent', type: 'currency', required: true, placeholder: '2500', tooltip: 'Current monthly rent payment' },
    { id: 'rentIncreaseRate', label: 'Annual Rent Increase (%)', type: 'percentage', required: false, placeholder: '3.0', tooltip: 'Expected annual rent increase' },

    // Additional Costs
    { id: 'propertyTax', label: 'Annual Property Tax', type: 'currency', required: false, placeholder: '8000', tooltip: 'Annual property tax amount' },
    { id: 'homeInsurance', label: 'Annual Home Insurance', type: 'currency', required: false, placeholder: '2000', tooltip: 'Annual homeowners insurance' },
    { id: 'hoaFees', label: 'Monthly HOA Fees', type: 'currency', required: false, placeholder: '200', tooltip: 'Monthly homeowners association fees' },
    { id: 'maintenanceRate', label: 'Annual Maintenance (%)', type: 'percentage', required: false, placeholder: '1.0', tooltip: 'Annual maintenance as percentage of home value' },

    // Investment Assumptions
    { id: 'analysisPeriod', label: 'Analysis Period (Years)', type: 'number', required: false, placeholder: '10', tooltip: 'Number of years to analyze' },
    { id: 'homeAppreciation', label: 'Annual Home Appreciation (%)', type: 'percentage', required: false, placeholder: '3.0', tooltip: 'Expected annual home value increase' },
    { id: 'investmentReturn', label: 'Investment Return (%)', type: 'percentage', required: false, placeholder: '7.0', tooltip: 'Expected return on down payment if invested' },
    { id: 'inflationRate', label: 'Inflation Rate (%)', type: 'percentage', required: false, placeholder: '2.5', tooltip: 'Expected annual inflation rate' }
  ],
  outputs: [
    { id: 'totalMortgageCost', label: 'Total Mortgage Cost', type: 'currency', explanation: 'Total cost of owning the home over analysis period' },
    { id: 'totalRentCost', label: 'Total Rent Cost', type: 'currency', explanation: 'Total cost of renting over analysis period' },
    { id: 'costDifference', label: 'Cost Difference', type: 'currency', explanation: 'Difference between owning and renting costs' },
    { id: 'monthlyMortgagePayment', label: 'Monthly Mortgage Payment', type: 'currency', explanation: 'Monthly principal and interest payment' },
    { id: 'monthlyOwnershipCost', label: 'Monthly Ownership Cost', type: 'currency', explanation: 'Total monthly cost of home ownership' },
    { id: 'breakEvenPoint', label: 'Break-Even Point (Years)', type: 'number', explanation: 'Years until owning becomes cheaper than renting' },
    { id: 'homeEquity', label: 'Home Equity Built', type: 'currency', explanation: 'Equity accumulated through mortgage payments' },
    { id: 'investmentValue', label: 'Investment Value', type: 'currency', explanation: 'Value of down payment if invested instead' },
    { id: 'recommendation', label: 'Recommendation', type: 'text', explanation: 'Whether buying or renting is recommended' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};