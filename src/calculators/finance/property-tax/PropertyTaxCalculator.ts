import { Calculator } from '../../types/calculator';

export const PropertyTaxCalculator: Calculator = {
  id: 'PropertyTaxCalculator',
  title: 'Property Tax Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate property taxes based on assessed value, tax rate, and exemptions. Compare tax burdens across different properties and locations.',
  usageInstructions: [
    'Enter your property assessed value and local tax rate',
    'Include any applicable exemptions or deductions',
    'Compare tax amounts for different scenarios',
    'Calculate annual and monthly property tax payments'
  ],
  inputs: [
    // Property Information
    { id: 'assessedValue', label: 'Assessed Property Value', type: 'currency', required: true, placeholder: '300000', tooltip: 'The assessed value of your property by the local tax authority' },
    { id: 'marketValue', label: 'Market Value (Optional)', type: 'currency', required: false, placeholder: '350000', tooltip: 'Current market value of your property' },

    // Tax Rate Information
    { id: 'taxRate', label: 'Property Tax Rate (%)', type: 'percentage', required: true, placeholder: '1.2', tooltip: 'Local property tax rate (mills or percentage)' },
    { id: 'taxRateType', label: 'Tax Rate Type', type: 'select', required: true, options: [
      { value: 'percentage', label: 'Percentage (%)' },
      { value: 'mills', label: 'Mills (per $1,000)' }
    ], tooltip: 'How the tax rate is expressed in your area' },

    // Exemptions and Deductions
    { id: 'homesteadExemption', label: 'Homestead Exemption', type: 'currency', required: false, placeholder: '25000', tooltip: 'Amount exempted for primary residence' },
    { id: 'seniorExemption', label: 'Senior Citizen Exemption', type: 'currency', required: false, placeholder: '5000', tooltip: 'Additional exemption for seniors' },
    { id: 'disabilityExemption', label: 'Disability Exemption', type: 'currency', required: false, placeholder: '10000', tooltip: 'Exemption for disability-related needs' },
    { id: 'otherExemptions', label: 'Other Exemptions', type: 'currency', required: false, placeholder: '0', tooltip: 'Any other applicable exemptions' },

    // Payment Information
    { id: 'paymentFrequency', label: 'Payment Frequency', type: 'select', required: true, options: [
      { value: 'annual', label: 'Annual' },
      { value: 'semi-annual', label: 'Semi-Annual' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'monthly', label: 'Monthly' }
    ], tooltip: 'How often property taxes are billed' },

    // Assessment Information
    { id: 'assessmentRatio', label: 'Assessment Ratio (%)', type: 'percentage', required: false, placeholder: '100', tooltip: 'Percentage of market value used for assessment' },
    { id: 'lastAssessmentYear', label: 'Last Assessment Year', type: 'number', required: false, placeholder: '2023', tooltip: 'Year of last property assessment' }
  ],
  outputs: [
    { id: 'taxableValue', label: 'Taxable Value', type: 'currency', explanation: 'Property value after exemptions are applied' },
    { id: 'annualPropertyTax', label: 'Annual Property Tax', type: 'currency', explanation: 'Total property tax due annually' },
    { id: 'monthlyPropertyTax', label: 'Monthly Property Tax', type: 'currency', explanation: 'Monthly property tax amount' },
    { id: 'effectiveTaxRate', label: 'Effective Tax Rate (%)', type: 'percentage', explanation: 'Actual tax rate after exemptions' },
    { id: 'totalExemptions', label: 'Total Exemptions Applied', type: 'currency', explanation: 'Sum of all applicable exemptions' },
    { id: 'taxSavings', label: 'Tax Savings from Exemptions', type: 'currency', explanation: 'Amount saved due to exemptions' },
    { id: 'taxPerThousand', label: 'Tax per $1,000 of Value', type: 'currency', explanation: 'Tax amount per thousand dollars of property value' },
    { id: 'comparisonRate', label: 'Comparison Rate (%)', type: 'percentage', explanation: 'Tax rate compared to similar properties' },
    { id: 'assessmentRatioUsed', label: 'Assessment Ratio Used (%)', type: 'percentage', explanation: 'Assessment ratio applied to market value' },
    { id: 'taxBurdenRatio', label: 'Tax Burden Ratio (%)', type: 'percentage', explanation: 'Property tax as percentage of income' },
    { id: 'breakEvenValue', label: 'Break-Even Property Value', type: 'currency', explanation: 'Value where tax burden equals comparison' },
    { id: 'recommendation', label: 'Tax Planning Recommendation', type: 'text', explanation: 'Suggestions for tax optimization' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};