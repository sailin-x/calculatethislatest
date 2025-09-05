import { Calculator } from '../../types';
import { RealEstateDepreciationScheduleInputs, RealEstateDepreciationScheduleOutputs } from './types';
import { calculateRealEstateDepreciationSchedule } from './formulas';
import { validateRealEstateDepreciationScheduleInputs, getValidationErrors } from './validation';

export const realEstateDepreciationScheduleCalculator: Calculator<RealEstateDepreciationScheduleInputs, RealEstateDepreciationScheduleOutputs> = {
  name: 'Real Estate Depreciation Schedule Calculator',
  description: 'Calculate depreciation schedules for real estate investments with bonus depreciation and cost segregation',
  category: 'Finance',
  tags: ['real estate', 'depreciation', 'tax', 'schedule', 'bonus depreciation', 'cost segregation'],
  inputs: [
    {
      id: 'propertyCost',
      label: 'Property Cost',
      type: 'currency',
      placeholder: 'Enter property cost',
      required: true,
      description: 'Total cost of the property'
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
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      placeholder: 'Select property type',
      required: true,
      description: 'Type of real estate property',
      options: [
        { value: 'residential', label: 'Residential (27.5 years)' },
        { value: 'commercial', label: 'Commercial (39 years)' },
        { value: 'mixed-use', label: 'Mixed-Use (39 years)' }
      ]
    },
    {
      id: 'depreciationMethod',
      label: 'Depreciation Method',
      type: 'select',
      placeholder: 'Select depreciation method',
      required: true,
      description: 'Method used to calculate depreciation',
      options: [
        { value: 'straight-line', label: 'Straight-Line' },
        { value: 'accelerated', label: 'Accelerated (MACRS)' },
        { value: 'bonus', label: 'Bonus Depreciation' }
      ]
    },
    {
      id: 'bonusDepreciationPercentage',
      label: 'Bonus Depreciation (%)',
      type: 'percentage',
      placeholder: 'Enter bonus depreciation percentage',
      required: true,
      description: 'Percentage of bonus depreciation to apply'
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
      type: 'boolean',
      placeholder: 'Enable cost segregation',
      required: true,
      description: 'Whether to use cost segregation analysis'
    },
    {
      id: 'costSegregationAmount',
      label: 'Cost Segregation Amount',
      type: 'currency',
      placeholder: 'Enter cost segregation amount',
      required: true,
      description: 'Total amount eligible for cost segregation'
    },
    {
      id: 'costSegregationBreakdown',
      label: 'Cost Segregation Breakdown',
      type: 'object',
      placeholder: 'Enter breakdown',
      required: false,
      description: 'Breakdown of cost segregation by asset class'
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
      id: 'disposalDate',
      label: 'Disposal Date',
      type: 'date',
      placeholder: 'Select disposal date',
      required: false,
      description: 'Date the property was disposed of (optional)'
    },
    {
      id: 'disposalValue',
      label: 'Disposal Value',
      type: 'currency',
      placeholder: 'Enter disposal value',
      required: false,
      description: 'Value received upon disposal (optional)'
    },
    {
      id: 'recaptureRate',
      label: 'Recapture Rate (%)',
      type: 'percentage',
      placeholder: 'Enter recapture rate',
      required: true,
      description: 'Tax rate for depreciation recapture'
    }
  ],
  outputs: [
    {
      id: 'depreciableBasis',
      label: 'Depreciable Basis',
      type: 'currency',
      description: 'Property cost minus land value'
    },
    {
      id: 'annualDepreciation',
      label: 'Annual Depreciation',
      type: 'currency',
      description: 'Annual depreciation amount'
    },
    {
      id: 'accumulatedDepreciation',
      label: 'Accumulated Depreciation',
      type: 'currency',
      description: 'Total depreciation taken to date'
    },
    {
      id: 'remainingBasis',
      label: 'Remaining Basis',
      type: 'currency',
      description: 'Remaining depreciable basis'
    },
    {
      id: 'bonusDepreciation',
      label: 'Bonus Depreciation',
      type: 'currency',
      description: 'Bonus depreciation amount'
    },
    {
      id: 'section179Deduction',
      label: 'Section 179 Deduction',
      type: 'currency',
      description: 'Section 179 deduction amount'
    },
    {
      id: 'costSegregation',
      label: 'Cost Segregation',
      type: 'currency',
      description: 'Cost segregation depreciation'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      description: 'Total tax savings from depreciation'
    },
    {
      id: 'disposalAnalysis',
      label: 'Disposal Analysis',
      type: 'currency',
      description: 'Tax implications of disposal'
    }
  ],
  calculate: (inputs: RealEstateDepreciationScheduleInputs): RealEstateDepreciationScheduleOutputs => {
    const validation = validateRealEstateDepreciationScheduleInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculateRealEstateDepreciationSchedule(inputs);
  },
  validate: validateRealEstateDepreciationScheduleInputs
};