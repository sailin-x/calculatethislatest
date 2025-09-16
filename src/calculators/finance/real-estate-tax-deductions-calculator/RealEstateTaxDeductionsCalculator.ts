import { Calculator, Formula } from '../../../types/calculator';
import { calculateRealEstateTaxDeductions } from './formulas';
import { getRealEstateTaxDeductionsValidationRules } from './validation';

/**
 * Real estate tax deductions formula implementation
 */
const realEstateTaxDeductionsFormula: Formula = {
  id: 'real-estate-tax-deductions',
  name: 'Real Estate Tax Deductions',
  description: 'Calculate comprehensive tax deductions for real estate investments',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRealEstateTaxDeductions(inputs);
    return {
      outputs: result,
      explanation: 'Real estate tax deductions calculated',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading real estate tax deductions calculator with comprehensive features
 */
export const realEstateTaxDeductionsCalculator: Calculator = {
  id: 'real-estate-tax-deductions-calculator',
  title: 'Real Estate Tax Deductions Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive real estate tax deductions calculator including mortgage interest, property taxes, depreciation, operating expenses, and passive loss limitations with industry-standard accuracy.',

  usageInstructions: [
    'Select your property type and filing status',
    'Enter your annual income and tax rate',
    'Input mortgage interest, property taxes, and operating expenses',
    'Include depreciation and other deductible expenses',
    'Review comprehensive tax deduction analysis and savings'
  ],

  inputs: [
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Primary Residence' },
        { value: 'commercial', label: 'Commercial Property' },
        { value: 'rental', label: 'Rental Property' },
        { value: 'vacation', label: 'Vacation Home' }
      ],
      tooltip: 'Type of real estate property',
      defaultValue: 'rental'
    },
    {
      id: 'annualIncome',
      label: 'Annual Income',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Your total annual income before deductions',
      defaultValue: 100000
    },
    {
      id: 'mortgageInterest',
      label: 'Mortgage Interest',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Annual mortgage interest paid',
      defaultValue: 8000
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '4000',
      tooltip: 'Annual property taxes paid',
      defaultValue: 4000
    },
    {
      id: 'insurance',
      label: 'Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual property insurance premium',
      defaultValue: 1200
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Annual maintenance and repairs',
      defaultValue: 2000
    },
    {
      id: 'repairs',
      label: 'Repairs',
      type: 'currency',
      required: false,
      placeholder: '1500',
      tooltip: 'Annual repair expenses',
      defaultValue: 1500
    },
    {
      id: 'utilities',
      label: 'Utilities',
      type: 'currency',
      required: false,
      placeholder: '1800',
      tooltip: 'Annual utility expenses',
      defaultValue: 1800
    },
    {
      id: 'hoaFees',
      label: 'HOA Fees',
      type: 'currency',
      required: false,
      placeholder: '2400',
      tooltip: 'Annual homeowners association fees',
      defaultValue: 2400
    },
    {
      id: 'depreciation',
      label: 'Depreciation',
      type: 'currency',
      required: false,
      placeholder: '12000',
      tooltip: 'Annual depreciation deduction',
      defaultValue: 12000
    },
    {
      id: 'managementFees',
      label: 'Management Fees',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual property management fees',
      defaultValue: 3000
    },
    {
      id: 'vacancyAllowance',
      label: 'Vacancy Allowance',
      type: 'currency',
      required: false,
      placeholder: '1000',
      tooltip: 'Allowance for vacancy periods',
      defaultValue: 1000
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '32',
      tooltip: 'Your marginal tax rate',
      defaultValue: 32,
      min: 10,
      max: 50,
      step: 1
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married-joint', label: 'Married Filing Jointly' },
        { value: 'married-separate', label: 'Married Filing Separately' },
        { value: 'head-household', label: 'Head of Household' }
      ],
      tooltip: 'Your tax filing status',
      defaultValue: 'single'
    },
    {
      id: 'state',
      label: 'State',
      type: 'select',
      required: true,
      options: [
        { value: 'California', label: 'California' },
        { value: 'Texas', label: 'Texas' },
        { value: 'Florida', label: 'Florida' },
        { value: 'New York', label: 'New York' },
        { value: 'Other', label: 'Other' }
      ],
      tooltip: 'State where property is located',
      defaultValue: 'California'
    },
    {
      id: 'rentalIncome',
      label: 'Rental Income',
      type: 'currency',
      required: false,
      placeholder: '24000',
      tooltip: 'Annual rental income (for rental properties)',
      defaultValue: 24000
    },
    {
      id: 'personalUsePercentage',
      label: 'Personal Use (%)',
      type: 'percentage',
      required: false,
      placeholder: '10',
      tooltip: 'Percentage of personal use (for vacation homes)',
      defaultValue: 10,
      min: 0,
      max: 100
    }
  ],

  outputs: [
    {
      id: 'totalDeductions',
      label: 'Total Deductions',
      type: 'currency',
      explanation: 'Sum of all deductible expenses'
    },
    {
      id: 'taxableIncome',
      label: 'Taxable Income',
      type: 'currency',
      explanation: 'Income after deductions'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from deductions'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      explanation: 'Effective tax rate after deductions'
    },
    {
      id: 'cashFlow',
      label: 'Cash Flow',
      type: 'currency',
      explanation: 'Net cash flow after expenses and taxes'
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%)',
      type: 'percentage',
      explanation: 'Capitalization rate based on net income'
    },
    {
      id: 'roi',
      label: 'ROI (%)',
      type: 'percentage',
      explanation: 'Return on investment after tax benefits'
    },
    {
      id: 'taxCredits',
      label: 'Tax Credits',
      type: 'currency',
      explanation: 'Available tax credits'
    },
    {
      id: 'netIncome',
      label: 'Net Income',
      type: 'currency',
      explanation: 'Net income after all deductions and taxes'
    }
  ],

  formulas: [realEstateTaxDeductionsFormula],

  validationRules: getRealEstateTaxDeductionsValidationRules(),

  examples: [
    {
      title: 'Rental Property Tax Deductions',
      description: 'Complete tax analysis for a rental property investment',
      inputs: {
        propertyType: 'rental',
        annualIncome: 100000,
        mortgageInterest: 8000,
        propertyTaxes: 4000,
        insurance: 1200,
        maintenance: 2000,
        repairs: 1500,
        utilities: 1800,
        hoaFees: 0,
        depreciation: 12000,
        managementFees: 3000,
        vacancyAllowance: 1000,
        taxRate: 32,
        filingStatus: 'single',
        state: 'California',
        rentalIncome: 24000,
        personalUsePercentage: 0
      },
      expectedOutputs: {
        totalDeductions: 34100,
        taxableIncome: 65900,
        taxSavings: 10912,
        effectiveTaxRate: 21.1,
        cashFlow: 13100,
        capRate: 8.5,
        roi: 15.2,
        taxCredits: 0,
        netIncome: 13100
      }
    },
    {
      title: 'Primary Residence Deductions',
      description: 'Tax deductions for primary residence with mortgage',
      inputs: {
        propertyType: 'residential',
        annualIncome: 120000,
        mortgageInterest: 6000,
        propertyTaxes: 5000,
        insurance: 1500,
        maintenance: 1000,
        repairs: 500,
        utilities: 0,
        hoaFees: 0,
        depreciation: 0,
        managementFees: 0,
        vacancyAllowance: 0,
        taxRate: 28,
        filingStatus: 'married-joint',
        state: 'Texas',
        rentalIncome: 0,
        personalUsePercentage: 100
      },
      expectedOutputs: {
        totalDeductions: 13000,
        taxableIncome: 107000,
        taxSavings: 3640,
        effectiveTaxRate: 23.4,
        cashFlow: 107000,
        capRate: 0,
        roi: 0,
        taxCredits: 0,
        netIncome: 107000
      }
    }
  ]
};