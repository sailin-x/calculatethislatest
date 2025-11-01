import { Calculator } from '../../types/calculator';
import { NetOperatingIncomeInputs, NetOperatingIncomeOutputs } from './types';
import {
  calculateGrossOperatingIncome,
  calculateEffectiveGrossIncome,
  calculateTotalOperatingExpenses,
  calculateNetOperatingIncome,
  calculateOperatingExpenseRatio,
  calculateNetIncomeRatio,
  calculateBreakEvenRatio,
  generateNoiAnalysis
} from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';

export const NetOperatingIncomeCalculator: Calculator = {
  id: 'net-operating-income-calculator',
  title: 'Net Operating Income (NOI) Calculator',
  category: 'finance',
  subcategory: 'Real Estate Investment',
  description: 'Calculate Net Operating Income (NOI) for real estate investments with comprehensive expense analysis and performance metrics.',
  usageInstructions: [
    'Enter rental income and other income sources',
    'Input all operating expenses (management, maintenance, taxes, etc.)',
    'Configure vacancy allowance and replacement reserve settings',
    'Review NOI calculation, expense ratios, and investment analysis'
  ],

  inputs: [
    {
      id: 'rentalIncome',
      label: 'Rental Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total annual rental income from tenants'
    },
    {
      id: 'otherIncome',
      label: 'Other Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Additional income (laundry, parking, vending, etc.)'
    },
    {
      id: 'propertyManagement',
      label: 'Property Management ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual property management fees'
    },
    {
      id: 'maintenance',
      label: 'Maintenance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual maintenance and upkeep costs'
    },
    {
      id: 'repairs',
      label: 'Repairs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual repair costs'
    },
    {
      id: 'utilities',
      label: 'Utilities ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual utility costs (if not paid by tenants)'
    },
    {
      id: 'insurance',
      label: 'Insurance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual property insurance premium'
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual property tax assessment'
    },
    {
      id: 'legalFees',
      label: 'Legal Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual legal and accounting fees'
    },
    {
      id: 'advertising',
      label: 'Advertising ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual marketing and advertising costs'
    },
    {
      id: 'supplies',
      label: 'Supplies ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual office and maintenance supplies'
    },
    {
      id: 'otherExpenses',
      label: 'Other Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Miscellaneous operating expenses'
    },
    {
      id: 'includeVacancyAllowance',
      label: 'Include Vacancy Allowance',
      type: 'boolean',
      required: false,
      tooltip: 'Account for potential vacancy periods'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Expected annual vacancy rate'
    },
    {
      id: 'includeReplacementReserve',
      label: 'Include Replacement Reserve',
      type: 'boolean',
      required: false,
      tooltip: 'Set aside funds for future capital improvements'
    },
    {
      id: 'replacementReserveRate',
      label: 'Replacement Reserve Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      tooltip: 'Percentage of gross income for replacement reserve'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'Time period for analysis'
    }
  ],

  outputs: [
    {
      id: 'grossOperatingIncome',
      label: 'Gross Operating Income',
      type: 'currency',
      explanation: 'Total income before operating expenses'
    },
    {
      id: 'effectiveGrossIncome',
      label: 'Effective Gross Income',
      type: 'currency',
      explanation: 'Income after vacancy allowance'
    },
    {
      id: 'totalOperatingExpenses',
      label: 'Total Operating Expenses',
      type: 'currency',
      explanation: 'Sum of all operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income (NOI)',
      type: 'currency',
      explanation: 'Income available for debt service and profit'
    },
    {
      id: 'operatingExpenseRatio',
      label: 'Operating Expense Ratio',
      type: 'percentage',
      explanation: 'Operating expenses as percentage of effective gross income'
    },
    {
      id: 'netIncomeRatio',
      label: 'Net Income Ratio',
      type: 'percentage',
      explanation: 'NOI as percentage of effective gross income'
    },
    {
      id: 'breakEvenRatio',
      label: 'Break-Even Ratio',
      type: 'percentage',
      explanation: 'Minimum occupancy needed to break even'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Multi-Family Investment Property',
      description: 'Calculate NOI for a 10-unit apartment building',
      inputs: {
        rentalIncome: 120000,
        otherIncome: 5000,
        propertyManagement: 12000,
        maintenance: 8000,
        repairs: 6000,
        utilities: 0,
        insurance: 4000,
        propertyTaxes: 15000,
        legalFees: 2000,
        advertising: 1000,
        supplies: 500,
        otherExpenses: 1000,
        includeVacancyAllowance: true,
        vacancyRate: 5,
        includeReplacementReserve: true,
        replacementReserveRate: 2,
        analysisPeriod: 'annual'
      },
      expectedOutputs: {
        grossOperatingIncome: 125000,
        effectiveGrossIncome: 118750,
        totalOperatingExpenses: 39750,
        netOperatingIncome: 79000,
        operatingExpenseRatio: 33.47,
        netIncomeRatio: 66.53,
        breakEvenRatio: 33.47
      }
    },
    {
      title: 'Commercial Office Building',
      description: 'Calculate NOI for a small office building',
      inputs: {
        rentalIncome: 85000,
        otherIncome: 2000,
        propertyManagement: 8500,
        maintenance: 4000,
        repairs: 3000,
        utilities: 2000,
        insurance: 2500,
        propertyTaxes: 12000,
        legalFees: 1500,
        advertising: 800,
        supplies: 300,
        otherExpenses: 600,
        includeVacancyAllowance: true,
        vacancyRate: 8,
        includeReplacementReserve: true,
        replacementReserveRate: 1.5,
        analysisPeriod: 'annual'
      },
      expectedOutputs: {
        grossOperatingIncome: 87000,
        effectiveGrossIncome: 80240,
        totalOperatingExpenses: 28200,
        netOperatingIncome: 52040,
        operatingExpenseRatio: 35.14,
        netIncomeRatio: 64.86,
        breakEvenRatio: 35.14
      }
    }
  ]
};