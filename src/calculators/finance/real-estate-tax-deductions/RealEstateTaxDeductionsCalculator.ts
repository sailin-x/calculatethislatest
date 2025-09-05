import { Calculator } from '../../types';
import { RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsOutputs } from './types';
import { calculateRealEstateTaxDeductions } from './formulas';
import { validateRealEstateTaxDeductionsInputs, getValidationErrors } from './validation';

export const realEstateTaxDeductionsCalculator: Calculator<RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsOutputs> = {
  name: 'Real Estate Tax Deductions Calculator',
  description: 'Calculate tax deductions and savings for real estate investments',
  category: 'Finance',
  tags: ['real estate', 'tax', 'deductions', 'depreciation', 'passive activity', 'tax savings'],
  inputs: [
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      placeholder: 'Select property type',
      required: true,
      description: 'Type of real estate property',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'rental', label: 'Rental' },
        { value: 'vacation', label: 'Vacation' }
      ]
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      placeholder: 'Enter property value',
      required: true,
      description: 'Total value of the property'
    },
    {
      id: 'landValue',
      label: 'Land Value',
      type: 'currency',
      placeholder: 'Enter land value',
      required: true,
      description: 'Value of the land (not depreciable)'
    },
    {
      id: 'placedInServiceDate',
      label: 'Placed in Service Date',
      type: 'date',
      placeholder: 'Select date',
      required: true,
      description: 'Date the property was placed in service'
    },
    {
      id: 'businessUsePercentage',
      label: 'Business Use Percentage (%)',
      type: 'percentage',
      placeholder: 'Enter business use percentage',
      required: true,
      description: 'Percentage of property used for business'
    },
    {
      id: 'annualRent',
      label: 'Annual Rent',
      type: 'currency',
      placeholder: 'Enter annual rent',
      required: true,
      description: 'Annual rental income'
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses',
      type: 'currency',
      placeholder: 'Enter operating expenses',
      required: true,
      description: 'Annual operating expenses'
    },
    {
      id: 'mortgageInterest',
      label: 'Mortgage Interest',
      type: 'currency',
      placeholder: 'Enter mortgage interest',
      required: true,
      description: 'Annual mortgage interest paid'
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes',
      type: 'currency',
      placeholder: 'Enter property taxes',
      required: true,
      description: 'Annual property taxes paid'
    },
    {
      id: 'insurance',
      label: 'Insurance',
      type: 'currency',
      placeholder: 'Enter insurance',
      required: true,
      description: 'Annual insurance costs'
    },
    {
      id: 'utilities',
      label: 'Utilities',
      type: 'currency',
      placeholder: 'Enter utilities',
      required: true,
      description: 'Annual utility costs'
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      type: 'currency',
      placeholder: 'Enter maintenance',
      required: true,
      description: 'Annual maintenance costs'
    },
    {
      id: 'managementFees',
      label: 'Management Fees',
      type: 'currency',
      placeholder: 'Enter management fees',
      required: true,
      description: 'Annual property management fees'
    },
    {
      id: 'advertising',
      label: 'Advertising',
      type: 'currency',
      placeholder: 'Enter advertising',
      required: true,
      description: 'Annual advertising costs'
    },
    {
      id: 'legalFees',
      label: 'Legal Fees',
      type: 'currency',
      placeholder: 'Enter legal fees',
      required: true,
      description: 'Annual legal fees'
    },
    {
      id: 'accountingFees',
      label: 'Accounting Fees',
      type: 'currency',
      placeholder: 'Enter accounting fees',
      required: true,
      description: 'Annual accounting fees'
    },
    {
      id: 'travelExpenses',
      label: 'Travel Expenses',
      type: 'currency',
      placeholder: 'Enter travel expenses',
      required: true,
      description: 'Annual travel expenses related to property'
    },
    {
      id: 'homeOfficeExpenses',
      label: 'Home Office Expenses',
      type: 'currency',
      placeholder: 'Enter home office expenses',
      required: true,
      description: 'Annual home office expenses'
    },
    {
      id: 'depreciation',
      label: 'Depreciation',
      type: 'currency',
      placeholder: 'Enter depreciation',
      required: true,
      description: 'Annual depreciation amount'
    },
    {
      id: 'bonusDepreciation',
      label: 'Bonus Depreciation',
      type: 'currency',
      placeholder: 'Enter bonus depreciation',
      required: true,
      description: 'Annual bonus depreciation amount'
    },
    {
      id: 'section179Deduction',
      label: 'Section 179 Deduction',
      type: 'currency',
      placeholder: 'Enter Section 179 deduction',
      required: true,
      description: 'Section 179 deduction amount'
    },
    {
      id: 'costSegregation',
      label: 'Cost Segregation',
      type: 'currency',
      placeholder: 'Enter cost segregation',
      required: true,
      description: 'Cost segregation depreciation amount'
    },
    {
      id: 'passiveActivityLoss',
      label: 'Passive Activity Loss',
      type: 'currency',
      placeholder: 'Enter passive activity loss',
      required: true,
      description: 'Passive activity loss amount'
    },
    {
      id: 'atRiskAmount',
      label: 'At-Risk Amount',
      type: 'currency',
      placeholder: 'Enter at-risk amount',
      required: true,
      description: 'Amount at risk in the investment'
    },
    {
      id: 'materialParticipation',
      label: 'Material Participation',
      type: 'boolean',
      placeholder: 'Enable material participation',
      required: true,
      description: 'Whether you materially participate in the activity'
    },
    {
      id: 'realEstateProfessional',
      label: 'Real Estate Professional',
      type: 'boolean',
      placeholder: 'Enable real estate professional',
      required: true,
      description: 'Whether you qualify as a real estate professional'
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      placeholder: 'Enter tax year',
      required: true,
      description: 'Tax year for the calculation'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      placeholder: 'Select filing status',
      required: true,
      description: 'Tax filing status',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married-joint', label: 'Married Filing Jointly' },
        { value: 'married-separate', label: 'Married Filing Separately' },
        { value: 'head-of-household', label: 'Head of Household' }
      ]
    },
    {
      id: 'adjustedGrossIncome',
      label: 'Adjusted Gross Income',
      type: 'currency',
      placeholder: 'Enter adjusted gross income',
      required: true,
      description: 'Your adjusted gross income'
    },
    {
      id: 'otherPassiveIncome',
      label: 'Other Passive Income',
      type: 'currency',
      placeholder: 'Enter other passive income',
      required: true,
      description: 'Other passive income from other sources'
    },
    {
      id: 'otherPassiveLosses',
      label: 'Other Passive Losses',
      type: 'currency',
      placeholder: 'Enter other passive losses',
      required: true,
      description: 'Other passive losses from other sources'
    }
  ],
  outputs: [
    {
      id: 'deductibleExpenses',
      label: 'Deductible Expenses',
      type: 'object',
      description: 'Breakdown of deductible operating expenses'
    },
    {
      id: 'depreciationDeductions',
      label: 'Depreciation Deductions',
      type: 'object',
      description: 'Breakdown of depreciation deductions'
    },
    {
      id: 'passiveActivityAnalysis',
      label: 'Passive Activity Analysis',
      type: 'object',
      description: 'Analysis of passive activity rules'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'object',
      description: 'Tax savings from deductions'
    },
    {
      id: 'netRentalIncome',
      label: 'Net Rental Income',
      type: 'object',
      description: 'Net rental income after deductions'
    },
    {
      id: 'carryoverAnalysis',
      label: 'Carryover Analysis',
      type: 'object',
      description: 'Analysis of suspended losses and carryovers'
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      description: 'Overall summary of tax deductions'
    }
  ],
  calculate: (inputs: RealEstateTaxDeductionsInputs): RealEstateTaxDeductionsOutputs => {
    const validation = validateRealEstateTaxDeductionsInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculateRealEstateTaxDeductions(inputs);
  },
  validate: validateRealEstateTaxDeductionsInputs
};