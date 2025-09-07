import { Calculator } from '../../../types/calculator';

export const NetOperatingIncomeCalculator: Calculator = {
  id: 'net-operating-income-calculator',
  title: 'Net Operating Income (NOI) Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate the net operating income for a property by subtracting operating expenses from gross income.',
  usageInstructions: [
    'Enter the property\'s gross rental income and other income sources',
    'Input all operating expenses including property management, maintenance, and utilities',
    'Review the NOI calculation which represents the property\'s income before debt service',
    'Use NOI for property valuation, loan qualification, and investment analysis'
  ],
  inputs: [
    // Income Section
    { id: 'grossRentalIncome', label: 'Gross Rental Income', type: 'currency', required: true, placeholder: '50000', tooltip: 'Total annual rental income from all tenants' },
    { id: 'otherIncome', label: 'Other Income', type: 'currency', required: false, placeholder: '2000', tooltip: 'Laundry, parking, storage, and other miscellaneous income' },

    // Operating Expenses
    { id: 'propertyManagement', label: 'Property Management (%)', type: 'percentage', required: false, placeholder: '8.0', tooltip: 'Percentage of gross income for property management' },
    { id: 'propertyManagementFixed', label: 'Property Management (Fixed)', type: 'currency', required: false, placeholder: '0', tooltip: 'Fixed annual property management fee' },
    { id: 'maintenance', label: 'Maintenance & Repairs', type: 'currency', required: false, placeholder: '5000', tooltip: 'Annual maintenance and repair expenses' },
    { id: 'utilities', label: 'Utilities', type: 'currency', required: false, placeholder: '3000', tooltip: 'Electricity, gas, water, and other utilities' },
    { id: 'insurance', label: 'Insurance', type: 'currency', required: false, placeholder: '2000', tooltip: 'Property insurance premiums' },
    { id: 'propertyTaxes', label: 'Property Taxes', type: 'currency', required: false, placeholder: '8000', tooltip: 'Annual property tax assessment' },
    { id: 'legalFees', label: 'Legal & Accounting', type: 'currency', required: false, placeholder: '1000', tooltip: 'Legal and accounting fees' },
    { id: 'advertising', label: 'Advertising & Marketing', type: 'currency', required: false, placeholder: '500', tooltip: 'Marketing and advertising expenses' },
    { id: 'supplies', label: 'Office Supplies', type: 'currency', required: false, placeholder: '300', tooltip: 'Office and administrative supplies' },
    { id: 'miscellaneous', label: 'Miscellaneous Expenses', type: 'currency', required: false, placeholder: '1000', tooltip: 'Other operating expenses' },

    // Analysis Options
    { id: 'includePropertyManagement', label: 'Include Property Management', type: 'boolean', required: false, tooltip: 'Whether to include property management in calculations' },
    { id: 'usePercentageManagement', label: 'Use Percentage for Management', type: 'boolean', required: false, tooltip: 'Use percentage of gross income for property management' }
  ],
  outputs: [
    { id: 'grossIncome', label: 'Gross Income', type: 'currency', explanation: 'Total gross income from all sources' },
    { id: 'totalOperatingExpenses', label: 'Total Operating Expenses', type: 'currency', explanation: 'Sum of all operating expenses' },
    { id: 'netOperatingIncome', label: 'Net Operating Income (NOI)', type: 'currency', explanation: 'Income after operating expenses (before debt service)' },
    { id: 'noiMargin', label: 'NOI Margin (%)', type: 'percentage', explanation: 'NOI as a percentage of gross income' },
    { id: 'propertyManagementCost', label: 'Property Management Cost', type: 'currency', explanation: 'Calculated property management expense' },
    { id: 'effectiveGrossIncome', label: 'Effective Gross Income', type: 'currency', explanation: 'Gross income minus vacancy and credit losses' },
    { id: 'operatingExpenseRatio', label: 'Operating Expense Ratio (%)', type: 'percentage', explanation: 'Operating expenses as a percentage of gross income' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};