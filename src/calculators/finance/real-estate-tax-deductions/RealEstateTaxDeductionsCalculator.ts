import { Calculator } from '../../../types/Calculator';
import { calculateRealEstateTaxDeductions } from './formulas';
import { validateRealEstateTaxDeductionsInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const realEstateTaxDeductionsCalculator: Calculator = {
  id: 'real-estate-tax-deductions',
  name: 'Real Estate Tax Deductions Calculator',
  description: 'Comprehensive calculator for real estate tax deductions including depreciation, expenses, and passive activity losses.',
  category: 'Finance',
  tags: ['real estate', 'tax deductions', 'depreciation', 'expenses', 'passive activity', 'investment'],
  inputs: [
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential Rental' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed_use', label: 'Mixed Use' },
        { value: 'vacation_rental', label: 'Vacation Rental' },
        { value: 'short_term_rental', label: 'Short-term Rental' },
        { value: 'land', label: 'Land Development' }
      ],
      tooltip: 'Type of real estate property',
      defaultValue: 'residential'
    },
    {
      id: 'purchasePrice',
      label: 'Purchase Price ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total purchase price of the property',
      defaultValue: 500000
    },
    {
      id: 'landValue',
      label: 'Land Value ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Value of the land (not depreciable)',
      defaultValue: 100000
    },
    {
      id: 'improvements',
      label: 'Improvements ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Cost of improvements and renovations',
      defaultValue: 50000
    },
    {
      id: 'acquisitionDate',
      label: 'Acquisition Date',
      type: 'date',
      required: true,
      tooltip: 'Date property was acquired',
      defaultValue: '2024-01-01'
    },
    {
      id: 'placedInServiceDate',
      label: 'Placed in Service Date',
      type: 'date',
      required: true,
      tooltip: 'Date property was placed in service for rental',
      defaultValue: '2024-01-01'
    },
    {
      id: 'annualRentalIncome',
      label: 'Annual Rental Income ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Annual rental income received',
      defaultValue: 36000
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Annual operating expenses (utilities, maintenance, etc.)',
      defaultValue: 12000
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual property taxes',
      defaultValue: 6000
    },
    {
      id: 'insurance',
      label: 'Insurance ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual insurance premiums',
      defaultValue: 2400
    },
    {
      id: 'mortgageInterest',
      label: 'Mortgage Interest ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual mortgage interest paid',
      defaultValue: 15000
    },
    {
      id: 'managementFees',
      label: 'Management Fees ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual property management fees',
      defaultValue: 1800
    },
    {
      id: 'repairs',
      label: 'Repairs & Maintenance ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual repairs and maintenance costs',
      defaultValue: 3000
    },
    {
      id: 'utilities',
      label: 'Utilities ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual utility costs paid by landlord',
      defaultValue: 0
    },
    {
      id: 'advertising',
      label: 'Advertising ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual advertising and marketing costs',
      defaultValue: 600
    },
    {
      id: 'legalFees',
      label: 'Legal & Professional Fees ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual legal and professional fees',
      defaultValue: 500
    },
    {
      id: 'travelExpenses',
      label: 'Travel Expenses ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Annual travel expenses for property management',
      defaultValue: 300
    },
    {
      id: 'otherExpenses',
      label: 'Other Expenses ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Other deductible expenses',
      defaultValue: 200
    },
    {
      id: 'personalUseDays',
      label: 'Personal Use Days',
      type: 'number',
      required: true,
      min: 0,
      max: 365,
      tooltip: 'Number of days property used personally',
      defaultValue: 0
    },
    {
      id: 'rentalDays',
      label: 'Rental Days',
      type: 'number',
      required: true,
      min: 0,
      max: 365,
      tooltip: 'Number of days property rented',
      defaultValue: 365
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      required: true,
      min: 2020,
      max: 2030,
      tooltip: 'Tax year for calculations',
      defaultValue: 2024
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married_joint', label: 'Married Filing Jointly' },
        { value: 'married_separate', label: 'Married Filing Separately' },
        { value: 'head_of_household', label: 'Head of Household' },
        { value: 'qualifying_widow', label: 'Qualifying Widow(er)' }
      ],
      tooltip: 'Tax filing status',
      defaultValue: 'single'
    },
    {
      id: 'adjustedGrossIncome',
      label: 'Adjusted Gross Income ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Total adjusted gross income for tax year',
      defaultValue: 100000
    },
    {
      id: 'otherPassiveIncome',
      label: 'Other Passive Income ($)',
      type: 'number',
      required: true,
      min: -1000000,
      max: 1000000,
      tooltip: 'Other passive income or losses',
      defaultValue: 0
    },
    {
      id: 'materialParticipation',
      label: 'Material Participation',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Materially Participate' },
        { value: 'no', label: 'No - Passive Activity' }
      ],
      tooltip: 'Whether you materially participate in the rental activity',
      defaultValue: 'no'
    },
    {
      id: 'realEstateProfessional',
      label: 'Real Estate Professional',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Real Estate Professional' },
        { value: 'no', label: 'No - Not a Real Estate Professional' }
      ],
      tooltip: 'Whether you qualify as a real estate professional',
      defaultValue: 'no'
    }
  ],
  outputs: [
    {
      id: 'depreciableBasis',
      label: 'Depreciable Basis',
      type: 'currency',
      format: 'USD',
      explanation: 'Total depreciable basis of the property'
    },
    {
      id: 'annualDepreciation',
      label: 'Annual Depreciation',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual depreciation deduction'
    },
    {
      id: 'totalExpenses',
      label: 'Total Expenses',
      type: 'currency',
      format: 'USD',
      explanation: 'Total deductible expenses'
    },
    {
      id: 'netRentalIncome',
      label: 'Net Rental Income',
      type: 'currency',
      format: 'USD',
      explanation: 'Net rental income after expenses and depreciation'
    },
    {
      id: 'passiveLoss',
      label: 'Passive Loss',
      type: 'currency',
      format: 'USD',
      explanation: 'Passive activity loss (if any)'
    },
    {
      id: 'deductibleLoss',
      label: 'Deductible Loss',
      type: 'currency',
      format: 'USD',
      explanation: 'Loss deductible against other income'
    },
    {
      id: 'suspendedLoss',
      label: 'Suspended Loss',
      type: 'currency',
      format: 'USD',
      explanation: 'Loss suspended to future years'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Estimated tax savings from deductions'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Effective tax rate after deductions'
    },
    {
      id: 'cashFlowAfterTax',
      label: 'Cash Flow After Tax',
      type: 'currency',
      format: 'USD',
      explanation: 'Cash flow after accounting for tax benefits'
    },
    {
      id: 'depreciationRecapture',
      label: 'Depreciation Recapture',
      type: 'currency',
      format: 'USD',
      explanation: 'Potential depreciation recapture on sale'
    },
    {
      id: 'section179Deduction',
      label: 'Section 179 Deduction',
      type: 'currency',
      format: 'USD',
      explanation: 'Section 179 deduction for qualifying improvements'
    }
  ],
  formulas: calculateRealEstateTaxDeductions,
  validate: validateRealEstateTaxDeductionsInputs,
  quickValidate: quickValidateAllInputs,
  examples: [
    {
      name: 'Residential Rental Property',
      description: 'Standard residential rental property with typical deductions',
      inputs: {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      },
      expectedOutputs: {
        depreciableBasis: 450000,
        annualDepreciation: 16364,
        totalExpenses: 40500,
        netRentalIncome: -20864,
        passiveLoss: -20864,
        deductibleLoss: 0,
        suspendedLoss: -20864,
        taxSavings: 0,
        effectiveTaxRate: 0.22,
        cashFlowAfterTax: -20864,
        depreciationRecapture: 16364,
        section179Deduction: 0
      }
    },
    {
      name: 'Commercial Property with Material Participation',
      description: 'Commercial property where owner materially participates',
      inputs: {
        propertyType: 'commercial',
        purchasePrice: 1000000,
        landValue: 200000,
        improvements: 100000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 80000,
        operatingExpenses: 25000,
        propertyTaxes: 12000,
        insurance: 4800,
        mortgageInterest: 30000,
        managementFees: 4000,
        repairs: 6000,
        utilities: 2000,
        advertising: 1200,
        legalFees: 1000,
        travelExpenses: 600,
        otherExpenses: 400,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'married_joint',
        adjustedGrossIncome: 150000,
        otherPassiveIncome: 0,
        materialParticipation: 'yes',
        realEstateProfessional: 'no'
      },
      expectedOutputs: {
        depreciableBasis: 900000,
        annualDepreciation: 25641,
        totalExpenses: 78000,
        netRentalIncome: -25641,
        passiveLoss: 0,
        deductibleLoss: -25641,
        suspendedLoss: 0,
        taxSavings: 6400,
        effectiveTaxRate: 0.18,
        cashFlowAfterTax: -19241,
        depreciationRecapture: 25641,
        section179Deduction: 0
      }
    },
    {
      name: 'Real Estate Professional',
      description: 'Property owned by a real estate professional',
      inputs: {
        propertyType: 'residential',
        purchasePrice: 750000,
        landValue: 150000,
        improvements: 75000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 54000,
        operatingExpenses: 18000,
        propertyTaxes: 9000,
        insurance: 3600,
        mortgageInterest: 22500,
        managementFees: 2700,
        repairs: 4500,
        utilities: 0,
        advertising: 900,
        legalFees: 750,
        travelExpenses: 450,
        otherExpenses: 300,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 120000,
        otherPassiveIncome: 0,
        materialParticipation: 'yes',
        realEstateProfessional: 'yes'
      },
      expectedOutputs: {
        depreciableBasis: 675000,
        annualDepreciation: 24545,
        totalExpenses: 60750,
        netRentalIncome: -31295,
        passiveLoss: 0,
        deductibleLoss: -31295,
        suspendedLoss: 0,
        taxSavings: 7824,
        effectiveTaxRate: 0.18,
        cashFlowAfterTax: -23471,
        depreciationRecapture: 24545,
        section179Deduction: 0
      }
    }
  ]
};