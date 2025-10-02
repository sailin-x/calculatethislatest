import { Calculator, Formula } from '../../types/calculator';
import { calculateRealEstateDepreciation } from './formulas';
import { getRealEstateDepreciationValidationRules } from './validation';

/**
 * Real estate depreciation schedule formula implementation
 */
const realEstateDepreciationFormula: Formula = {
  id: 'real-estate-depreciation-schedule',
  name: 'Real Estate Depreciation Schedule',
  description: 'Calculate depreciation schedules for real estate investments',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRealEstateDepreciation(inputs);
    return {
      outputs: result,
      explanation: 'Real estate depreciation schedule calculated',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading real estate depreciation schedule calculator with comprehensive features
 */
export const realEstateDepreciationScheduleCalculator: Calculator = {
  id: 'real-estate-depreciation-schedule-calculator',
  title: 'Real Estate Depreciation Schedule Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate comprehensive depreciation schedules for real estate investments including straight-line, cost segregation, Section 179, bonus depreciation, and tax recapture analysis with industry-standard accuracy.',

  usageInstructions: [
    'Select the depreciation method you need (Straight-Line, Cost Segregation, etc.)',
    'Enter property details including cost, land value, and useful life',
    'Specify depreciation parameters and tax year',
    'Review detailed depreciation schedule and tax benefits'
  ],

  inputs: [
    {
      id: 'depreciationMethod',
      label: 'Depreciation Method',
      type: 'select',
      required: true,
      options: [
        { value: 'straight-line', label: 'Straight-Line Depreciation' },
        { value: 'declining-balance', label: 'Declining Balance' },
        { value: 'section-179', label: 'Section 179 Deduction' },
        { value: 'bonus-depreciation', label: 'Bonus Depreciation' },
        { value: 'comprehensive', label: 'Comprehensive Analysis' }
      ],
      tooltip: 'Choose the depreciation method to calculate',
      defaultValue: 'straight-line'
    },
    {
      id: 'propertyCost',
      label: 'Property Cost',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Total cost of the property',
      defaultValue: 500000
    },
    {
      id: 'landValue',
      label: 'Land Value',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Value of the land component',
      defaultValue: 100000
    },
    {
      id: 'usefulLife',
      label: 'Useful Life (Years)',
      type: 'number',
      required: true,
      placeholder: '27.5',
      tooltip: 'Useful life of the property for depreciation',
      defaultValue: 27.5,
      min: 1,
      max: 50,
      step: 0.5
    },
    {
      id: 'depreciationStartDate',
      label: 'Depreciation Start Date',
      type: 'date',
      required: true,
      tooltip: 'Date when depreciation begins',
      defaultValue: '2024-01-01'
    },
    {
      id: 'calculationYears',
      label: 'Calculation Years',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Number of years to calculate depreciation',
      defaultValue: 10,
      min: 1,
      max: 50
    },
    {
      id: 'salvageValue',
      label: 'Salvage Value',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Estimated salvage value at end of useful life',
      defaultValue: 0
    },
    {
      id: 'bonusDepreciationPercentage',
      label: 'Bonus Depreciation (%)',
      type: 'percentage',
      required: false,
      placeholder: '80',
      tooltip: 'Bonus depreciation percentage for qualified property',
      defaultValue: 80,
      min: 0,
      max: 100
    },
    {
      id: 'section179Deduction',
      label: 'Section 179 Deduction',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Section 179 immediate deduction amount',
      defaultValue: 0
    }
  ],

  outputs: [
    {
      id: 'depreciableBasis',
      label: 'Depreciable Basis',
      type: 'currency',
      explanation: 'Property cost minus land value and salvage value'
    },
    {
      id: 'annualDepreciation',
      label: 'Annual Depreciation',
      type: 'currency',
      explanation: 'Annual depreciation expense'
    },
    {
      id: 'totalDepreciation',
      label: 'Total Depreciation',
      type: 'currency',
      explanation: 'Total accumulated depreciation'
    },
    {
      id: 'remainingBasis',
      label: 'Remaining Basis',
      type: 'currency',
      explanation: 'Remaining depreciable basis'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Annual tax savings from depreciation'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of depreciation tax benefits'
    }
  ],

  formulas: [realEstateDepreciationFormula],

  validationRules: getRealEstateDepreciationValidationRules(),

  examples: [
    {
      title: 'Commercial Property Straight-Line Depreciation',
      description: 'Calculate depreciation for a $500,000 commercial property over 27.5 years',
      inputs: {
        depreciationMethod: 'straight-line',
        propertyCost: 500000,
        landValue: 100000,
        usefulLife: 27.5,
        depreciationStartDate: '2024-01-01',
        calculationYears: 10,
        salvageValue: 0
      },
      expectedOutputs: {
        depreciableBasis: 400000,
        annualDepreciation: 14545.45,
        totalDepreciation: 145454.55,
        remainingBasis: 254545.45,
        taxSavings: 5371.11,
        netPresentValue: 45000
      }
    },
    {
      title: 'Bonus Depreciation Analysis',
      description: 'Calculate bonus depreciation for qualified improvement property',
      inputs: {
        depreciationMethod: 'bonus-depreciation',
        propertyCost: 200000,
        landValue: 0,
        usefulLife: 15,
        depreciationStartDate: '2024-01-01',
        calculationYears: 5,
        bonusDepreciationPercentage: 80
      },
      expectedOutputs: {
        depreciableBasis: 200000,
        annualDepreciation: 40000,
        totalDepreciation: 160000,
        remainingBasis: 40000,
        taxSavings: 14800,
        netPresentValue: 120000
      }
    }
  ]
};