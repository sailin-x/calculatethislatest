import { Calculator } from '../../../types/Calculator';
import { calculateRealEstateDepreciationSchedule } from './formulas';
import { validateRealEstateDepreciationScheduleInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const realEstateDepreciationScheduleCalculator: Calculator = {
  id: 'real-estate-depreciation-schedule',
  name: 'Real Estate Depreciation Schedule Calculator',
  description: 'Comprehensive depreciation schedule calculator for real estate investments including MACRS, straight-line, and cost segregation analysis.',
  category: 'Finance',
  tags: ['real estate', 'depreciation', 'tax', 'investment', 'macrs', 'cost segregation'],
  inputs: [
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential_rental', label: 'Residential Rental' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'office', label: 'Office' },
        { value: 'retail', label: 'Retail' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'land', label: 'Land Only' }
      ],
      tooltip: 'Type of real estate property',
      defaultValue: 'residential_rental'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Total value of the property',
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
      id: 'improvementValue',
      label: 'Improvement Value ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      tooltip: 'Value of building improvements (depreciable)',
      defaultValue: 400000
    },
    {
      id: 'placedInServiceDate',
      label: 'Placed in Service Date',
      type: 'date',
      required: true,
      tooltip: 'Date when property was placed in service for business use',
      defaultValue: '2024-01-01'
    },
    {
      id: 'depreciationMethod',
      label: 'Depreciation Method',
      type: 'select',
      required: true,
      options: [
        { value: 'macrs_residential', label: 'MACRS Residential (27.5 years)' },
        { value: 'macrs_commercial', label: 'MACRS Commercial (39 years)' },
        { value: 'straight_line', label: 'Straight Line' },
        { value: 'cost_segregation', label: 'Cost Segregation Study' }
      ],
      tooltip: 'Depreciation method to use',
      defaultValue: 'macrs_residential'
    },
    {
      id: 'costSegregationPercentages',
      label: 'Cost Segregation Percentages',
      type: 'object',
      required: false,
      tooltip: 'Percentage breakdown for cost segregation study',
      defaultValue: {
        '5_year': 15,
        '7_year': 10,
        '15-year': 5,
        '27.5-year': 70
      }
    },
    {
      id: 'convention',
      label: 'Depreciation Convention',
      type: 'select',
      required: true,
      options: [
        { value: 'mid_month', label: 'Mid-Month Convention' },
        { value: 'mid-quarter', label: 'Mid-Quarter Convention' },
        { value: 'half-year', label: 'Half-Year Convention' }
      ],
      tooltip: 'Depreciation convention for the first year',
      defaultValue: 'mid-month'
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      required: true,
      min: 1900,
      max: 2100,
      tooltip: 'Tax year for calculations',
      defaultValue: 2024
    },
    {
      id: 'personalUsePercentage',
      label: 'Personal Use Percentage (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Percentage of property used for personal purposes',
      defaultValue: 0
    },
    {
      id: 'bonusDepreciation',
      label: 'Bonus Depreciation (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Bonus depreciation percentage (if applicable)',
      defaultValue: 0
    },
    {
      id: 'section179Deduction',
      label: 'Section 179 Deduction ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Section 179 deduction amount (if applicable)',
      defaultValue: 0
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Effective tax rate for tax benefit calculations',
      defaultValue: 25
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%/year)',
      type: 'number',
      required: true,
      min: -10,
      max: 20,
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5
    },
    {
      id: 'holdingPeriod',
      label: 'Expected Holding Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Expected number of years to hold the property',
      defaultValue: 10
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
      explanation: 'Annual depreciation expense'
    },
    {
      id: 'totalDepreciation',
      label: 'Total Depreciation',
      type: 'currency',
      format: 'USD',
      explanation: 'Total depreciation over holding period'
    },
    {
      id: 'remainingBasis',
      label: 'Remaining Basis',
      type: 'currency',
      format: 'USD',
      explanation: 'Remaining basis after depreciation'
    },
    {
      id: 'taxBenefit',
      label: 'Total Tax Benefit',
      type: 'currency',
      format: 'USD',
      explanation: 'Total tax benefit from depreciation'
    },
    {
      id: 'presentValueTaxBenefit',
      label: 'Present Value Tax Benefit',
      type: 'currency',
      format: 'USD',
      explanation: 'Present value of tax benefits'
    },
    {
      id: 'depreciationSchedule',
      label: 'Depreciation Schedule',
      type: 'array',
      format: 'object',
      explanation: 'Year-by-year depreciation schedule'
    },
    {
      id: 'costSegregationBenefit',
      label: 'Cost Segregation Benefit',
      type: 'currency',
      format: 'USD',
      explanation: 'Additional tax benefit from cost segregation'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Effective tax rate after depreciation benefits'
    },
    {
      id: 'depreciationRecapture',
      label: 'Depreciation Recapture',
      type: 'currency',
      format: 'USD',
      explanation: 'Potential depreciation recapture on sale'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Net present value of depreciation benefits'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Internal rate of return on depreciation benefits'
    }
  ],
  formulas: calculateRealEstateDepreciationSchedule,
  validate: validateRealEstateDepreciationScheduleInputs,
  quickValidate: quickValidateAllInputs,
  examples: [
    {
      name: 'Residential Rental Property',
      description: 'Standard residential rental property with MACRS depreciation',
      inputs: {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      },
                    expectedOutputs: {
                depreciableBasis: 400000,
                annualDepreciation: 11757.4,
                totalDepreciation: 117574,
                remainingBasis: 282426,
                taxBenefit: 29393.5,
                presentValueTaxBenefit: 26250.1,
                costSegregationBenefit: 0,
                effectiveTaxRate: 25,
                depreciationRecapture: 117574,
                netPresentValue: 26250.1,
                internalRateOfReturn: 7.2
              }
    },
    {
      name: 'Commercial Property with Cost Segregation',
      description: 'Commercial property with cost segregation study',
      inputs: {
        propertyType: 'commercial',
        propertyValue: 2000000,
        landValue: 400000,
        improvementValue: 1600000,
        placedInServiceDate: '2024-06-01',
        depreciationMethod: 'cost_segregation',
        costSegregationPercentages: {
          '5_year': 15,
          '7_year': 10,
          '15-year': 5,
          '27.5-year': 70
        },
        convention: 'mid-quarter',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 30,
        inflationRate: 2.5,
        holdingPeriod: 15
      },
      expectedOutputs: {
        depreciableBasis: 1600000,
        annualDepreciation: 85000,
        totalDepreciation: 1275000,
        remainingBasis: 325000,
        taxBenefit: 382500,
        presentValueTaxBenefit: 298750.3,
        costSegregationBenefit: 45000,
        effectiveTaxRate: 30,
        depreciationRecapture: 1275000,
        netPresentValue: 298750.3,
        internalRateOfReturn: 12.3
      }
    },
    {
      name: 'Hotel Property with Bonus Depreciation',
      description: 'Hotel property with bonus depreciation and Section 179',
      inputs: {
        propertyType: 'hotel',
        propertyValue: 5000000,
        landValue: 1000000,
        improvementValue: 4000000,
        placedInServiceDate: '2024-03-01',
        depreciationMethod: 'macrs_commercial',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 20,
        section179Deduction: 1000000,
        taxRate: 35,
        inflationRate: 2.5,
        holdingPeriod: 20
      },
      expectedOutputs: {
        depreciableBasis: 4000000,
        annualDepreciation: 102564,
        totalDepreciation: 2051280,
        remainingBasis: 1948720,
        taxBenefit: 717948,
        presentValueTaxBenefit: 485250.1,
        costSegregationBenefit: 0,
        effectiveTaxRate: 35,
        depreciationRecapture: 2051280,
        netPresentValue: 485250.1,
        internalRateOfReturn: 15.8
      }
    }
  ]
};