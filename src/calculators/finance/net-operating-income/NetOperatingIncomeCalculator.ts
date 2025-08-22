import { Calculator } from '../../../types/calculator';
import { calculateNetOperatingIncome, generateNetOperatingIncomeAnalysis } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';
import { quickValidateNetOperatingIncome } from './quickValidation';
import { NetOperatingIncomeInputs } from './validation';

export const NetOperatingIncomeCalculator: Calculator = {
  id: 'net-operating-income',
  name: 'Net Operating Income (NOI) Calculator',
  category: 'finance',
  description: 'Calculate Net Operating Income for real estate investments by analyzing gross income and operating expenses.',
  tags: ['real estate', 'investment', 'income', 'expenses', 'NOI', 'property management'],
  inputs: [
    {
      id: 'grossRentalIncome',
      name: 'Gross Rental Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total rental income before any deductions',
      placeholder: '120000'
    },
    {
      id: 'otherIncome',
      name: 'Other Income',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Additional income from parking, laundry, storage, etc.',
      placeholder: '5000'
    },
    {
      id: 'vacancyLoss',
      name: 'Vacancy Loss',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Loss of income due to vacant units',
      placeholder: '6000'
    },
    {
      id: 'concessions',
      name: 'Rent Concessions',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Discounts or concessions given to tenants',
      placeholder: '2000'
    },
    {
      id: 'propertyTax',
      name: 'Property Tax',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property tax expense',
      placeholder: '8000'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property insurance expense',
      placeholder: '3000'
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual utility expenses paid by owner',
      placeholder: '4000'
    },
    {
      id: 'maintenance',
      name: 'Maintenance & Repairs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual maintenance and repair costs',
      placeholder: '6000'
    },
    {
      id: 'propertyManagement',
      name: 'Property Management',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Property management fees',
      placeholder: '9000'
    },
    {
      id: 'landscaping',
      name: 'Landscaping',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual landscaping and grounds maintenance',
      placeholder: '2000'
    },
    {
      id: 'janitorial',
      name: 'Janitorial Services',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Cleaning and janitorial services',
      placeholder: '3000'
    },
    {
      id: 'security',
      name: 'Security',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Security system and services',
      placeholder: '1500'
    },
    {
      id: 'advertising',
      name: 'Advertising & Marketing',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Marketing and advertising expenses',
      placeholder: '1000'
    },
    {
      id: 'legal',
      name: 'Legal & Professional',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Legal fees and professional services',
      placeholder: '2000'
    },
    {
      id: 'accounting',
      name: 'Accounting',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Accounting and bookkeeping fees',
      placeholder: '1500'
    },
    {
      id: 'licenses',
      name: 'Licenses & Permits',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Business licenses and permits',
      placeholder: '500'
    },
    {
      id: 'supplies',
      name: 'Office Supplies',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Office supplies and administrative costs',
      placeholder: '800'
    },
    {
      id: 'trash',
      name: 'Trash Removal',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Garbage collection and waste removal',
      placeholder: '1200'
    },
    {
      id: 'snowRemoval',
      name: 'Snow Removal',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Snow removal and winter maintenance',
      placeholder: '1000'
    },
    {
      id: 'pool',
      name: 'Pool Maintenance',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Pool cleaning and maintenance',
      placeholder: '1800'
    },
    {
      id: 'elevator',
      name: 'Elevator Maintenance',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Elevator service and maintenance',
      placeholder: '2400'
    },
    {
      id: 'parking',
      name: 'Parking Maintenance',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Parking lot maintenance and repairs',
      placeholder: '1500'
    },
    {
      id: 'roofing',
      name: 'Roofing',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Roof maintenance and repairs',
      placeholder: '3000'
    },
    {
      id: 'hvac',
      name: 'HVAC Maintenance',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Heating, ventilation, and air conditioning maintenance',
      placeholder: '2500'
    },
    {
      id: 'pestControl',
      name: 'Pest Control',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Pest control services',
      placeholder: '800'
    },
    {
      id: 'reserves',
      name: 'Reserves',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Reserve fund contributions for future repairs',
      placeholder: '5000'
    },
    {
      id: 'hoaFees',
      name: 'HOA Fees',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Homeowners association fees',
      placeholder: '2400'
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Current market value of the property',
      placeholder: '800000'
    },
    {
      id: 'analysisPeriod',
      name: 'Analysis Period',
      type: 'number',
      unit: 'years',
      required: false,
      description: 'Period for NOI analysis and projections',
      placeholder: '1',
      default: 1
    },
    {
      id: 'includeCapRate',
      name: 'Include Cap Rate Analysis',
      type: 'boolean',
      required: false,
      description: 'Calculate capitalization rate based on NOI',
      default: true
    },
    {
      id: 'includeExpenseRatio',
      name: 'Include Expense Ratio',
      type: 'boolean',
      required: false,
      description: 'Calculate operating expense ratio',
      default: true
    },
    {
      id: 'includeBreakdown',
      name: 'Include Detailed Breakdown',
      type: 'boolean',
      required: false,
      description: 'Provide detailed income and expense breakdown',
      default: true
    }
  ],
  outputs: [
    {
      id: 'netOperatingIncome',
      name: 'Net Operating Income (NOI)',
      type: 'number',
      unit: 'USD',
      description: 'Annual net operating income'
    },
    {
      id: 'grossOperatingIncome',
      name: 'Gross Operating Income',
      type: 'number',
      unit: 'USD',
      description: 'Total income after vacancy and concessions'
    },
    {
      id: 'totalOperatingExpenses',
      name: 'Total Operating Expenses',
      type: 'number',
      unit: 'USD',
      description: 'Sum of all operating expenses'
    },
    {
      id: 'operatingExpenseRatio',
      name: 'Operating Expense Ratio',
      type: 'number',
      unit: 'percentage',
      description: 'Operating expenses as percentage of gross income'
    },
    {
      id: 'capRate',
      name: 'Capitalization Rate',
      type: 'number',
      unit: 'percentage',
      description: 'NOI divided by property value'
    },
    {
      id: 'incomeBreakdown',
      name: 'Income Breakdown',
      type: 'object',
      description: 'Detailed breakdown of income sources'
    },
    {
      id: 'expenseBreakdown',
      name: 'Expense Breakdown',
      type: 'object',
      description: 'Detailed breakdown of operating expenses'
    },
    {
      id: 'monthlyNOI',
      name: 'Monthly NOI',
      type: 'number',
      unit: 'USD',
      description: 'Average monthly net operating income'
    },
    {
      id: 'noiPerUnit',
      name: 'NOI per Unit',
      type: 'number',
      unit: 'USD',
      description: 'Net operating income per rental unit'
    },
    {
      id: 'profitabilityAnalysis',
      name: 'Profitability Analysis',
      type: 'object',
      description: 'Analysis of property profitability metrics'
    },
    {
      id: 'expenseEfficiency',
      name: 'Expense Efficiency',
      type: 'object',
      description: 'Analysis of expense efficiency and ratios'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'array',
      description: 'Recommendations for improving NOI'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'object',
      description: 'Assessment of NOI risks and stability'
    },
    {
      id: 'comparisonMetrics',
      name: 'Comparison Metrics',
      type: 'object',
      description: 'Metrics for comparing with similar properties'
    }
  ],
  calculate: (inputs: NetOperatingIncomeInputs) => {
    return calculateNetOperatingIncome(inputs);
  },
  validate: validateNetOperatingIncomeInputs,
  quickValidate: quickValidateNetOperatingIncome,
  generateAnalysis: (inputs: NetOperatingIncomeInputs, outputs: any) => {
    return generateNetOperatingIncomeAnalysis(inputs, outputs);
  }
};