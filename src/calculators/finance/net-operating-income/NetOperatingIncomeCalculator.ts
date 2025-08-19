import { Calculator } from '../../types/Calculator';
import { calculateNetOperatingIncome } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const netOperatingIncomeCalculator: Calculator = {
  id: 'net-operating-income',
  title: 'Net Operating Income (NOI) Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate the Net Operating Income for real estate investments, including all income sources and operating expenses.',
  usageInstructions: 'Enter your property income and operating expenses to calculate the Net Operating Income, a key metric for real estate investment analysis.',
  inputs: [
    {
      id: 'grossRentalIncome',
      label: 'Gross Rental Income',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 100,
      tooltip: 'Total rental income from all units before any deductions',
      placeholder: '120000',
      defaultValue: 120000
    },
    {
      id: 'otherIncome',
      label: 'Other Income',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 100,
      tooltip: 'Additional income from parking, laundry, storage, etc.',
      placeholder: '5000',
      defaultValue: 5000
    },
    {
      id: 'vacancyLoss',
      label: 'Vacancy Loss',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.5,
      tooltip: 'Percentage of gross rental income lost due to vacancies',
      placeholder: '5.0',
      defaultValue: 5.0
    },
    {
      id: 'propertyManagementFee',
      label: 'Property Management Fee (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Percentage fee paid to property management company',
      placeholder: '8.0',
      defaultValue: 8.0
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      tooltip: 'Annual property tax amount',
      placeholder: '15000',
      defaultValue: 15000
    },
    {
      id: 'insurance',
      label: 'Insurance',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual property insurance cost',
      placeholder: '8000',
      defaultValue: 8000
    },
    {
      id: 'utilities',
      label: 'Utilities',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual utility costs (electricity, water, gas, etc.)',
      placeholder: '12000',
      defaultValue: 12000
    },
    {
      id: 'maintenance',
      label: 'Maintenance & Repairs',
      type: 'number',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      tooltip: 'Annual maintenance and repair costs',
      placeholder: '10000',
      defaultValue: 10000
    },
    {
      id: 'landscaping',
      label: 'Landscaping',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual landscaping and grounds maintenance costs',
      placeholder: '3000',
      defaultValue: 3000
    },
    {
      id: 'cleaning',
      label: 'Cleaning Services',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual cleaning and janitorial services',
      placeholder: '2000',
      defaultValue: 2000
    },
    {
      id: 'advertising',
      label: 'Advertising & Marketing',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual advertising and marketing expenses',
      placeholder: '1500',
      defaultValue: 1500
    },
    {
      id: 'legalFees',
      label: 'Legal & Professional Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual legal and professional service fees',
      placeholder: '2000',
      defaultValue: 2000
    },
    {
      id: 'accountingFees',
      label: 'Accounting Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual accounting and bookkeeping fees',
      placeholder: '1500',
      defaultValue: 1500
    },
    {
      id: 'hoaFees',
      label: 'HOA Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual homeowners association fees',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'trashRemoval',
      label: 'Trash Removal',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual trash removal and waste management costs',
      placeholder: '1200',
      defaultValue: 1200
    },
    {
      id: 'security',
      label: 'Security Services',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Annual security services and monitoring costs',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'otherExpenses',
      label: 'Other Operating Expenses',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Any other operating expenses not listed above',
      placeholder: '1000',
      defaultValue: 1000
    }
  ],
  outputs: [
    {
      id: 'grossIncome',
      label: 'Gross Income',
      type: 'currency',
      format: 'USD',
      explanation: 'Total income from all sources before deductions'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      format: 'USD',
      explanation: 'Gross income minus vacancy loss'
    },
    {
      id: 'totalOperatingExpenses',
      label: 'Total Operating Expenses',
      type: 'currency',
      format: 'USD',
      explanation: 'Sum of all operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income (NOI)',
      type: 'currency',
      format: 'USD',
      explanation: 'Effective gross income minus total operating expenses'
    },
    {
      id: 'operatingExpenseRatio',
      label: 'Operating Expense Ratio',
      type: 'percentage',
      format: 'percent',
      explanation: 'Operating expenses as a percentage of effective gross income'
    },
    {
      id: 'netIncomeRatio',
      label: 'Net Income Ratio',
      type: 'percentage',
      format: 'percent',
      explanation: 'NOI as a percentage of effective gross income'
    },
    {
      id: 'analysis',
      label: 'Financial Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Detailed analysis of the property\'s financial performance'
    }
  ],
  formulas: [
    {
      id: 'noi-calculation',
      name: 'Net Operating Income Calculation',
      description: 'Calculate NOI and related financial metrics for real estate investment',
      calculate: calculateNetOperatingIncome
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validateNetOperatingIncomeInputs
    }
  ],
  examples: [
    {
      title: 'Standard Multi-Family Property',
      description: 'Typical NOI calculation for a multi-family rental property',
      inputs: {
        grossRentalIncome: 120000,
        otherIncome: 5000,
        vacancyLoss: 5.0,
        propertyManagementFee: 8.0,
        propertyTaxes: 15000,
        insurance: 8000,
        utilities: 12000,
        maintenance: 10000,
        landscaping: 3000,
        cleaning: 2000,
        advertising: 1500,
        legalFees: 2000,
        accountingFees: 1500,
        hoaFees: 0,
        trashRemoval: 1200,
        security: 0,
        otherExpenses: 1000
      },
      expectedOutputs: {
        grossIncome: 125000,
        effectiveGrossIncome: 118750,
        totalOperatingExpenses: 68200,
        netOperatingIncome: 50550,
        operatingExpenseRatio: 57.4,
        netIncomeRatio: 42.6,
        analysis: 'Property shows strong NOI performance'
      }
    },
    {
      title: 'Commercial Office Building',
      description: 'NOI calculation for a commercial office property',
      inputs: {
        grossRentalIncome: 500000,
        otherIncome: 25000,
        vacancyLoss: 8.0,
        propertyManagementFee: 6.0,
        propertyTaxes: 75000,
        insurance: 25000,
        utilities: 45000,
        maintenance: 35000,
        landscaping: 8000,
        cleaning: 15000,
        advertising: 5000,
        legalFees: 8000,
        accountingFees: 5000,
        hoaFees: 0,
        trashRemoval: 3000,
        security: 12000,
        otherExpenses: 5000
      },
      expectedOutputs: {
        grossIncome: 525000,
        effectiveGrossIncome: 483000,
        totalOperatingExpenses: 231000,
        netOperatingIncome: 252000,
        operatingExpenseRatio: 47.8,
        netIncomeRatio: 52.2,
        analysis: 'Commercial property with excellent NOI margins'
      }
    },
    {
      title: 'Single-Family Rental',
      description: 'NOI calculation for a single-family rental property',
      inputs: {
        grossRentalIncome: 24000,
        otherIncome: 0,
        vacancyLoss: 3.0,
        propertyManagementFee: 10.0,
        propertyTaxes: 3000,
        insurance: 1500,
        utilities: 2000,
        maintenance: 3000,
        landscaping: 800,
        cleaning: 0,
        advertising: 500,
        legalFees: 300,
        accountingFees: 200,
        hoaFees: 0,
        trashRemoval: 300,
        security: 0,
        otherExpenses: 200
      },
      expectedOutputs: {
        grossIncome: 24000,
        effectiveGrossIncome: 23280,
        totalOperatingExpenses: 11500,
        netOperatingIncome: 11780,
        operatingExpenseRatio: 49.4,
        netIncomeRatio: 50.6,
        analysis: 'Single-family property with good NOI performance'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};