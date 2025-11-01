import { Calculator } from '../../types/calculator';

export const self_storage_facility_roi_calculator: Calculator = {
  id: 'SelfStorageFacility-RoiCalculatorCalculator',
  title: 'Self Storage Facility Roi Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Self Storage Facility Roi Calculator',
  description: 'Calculate self storage facility roi calculator values.',
  usageInstructions: [
    'Enter the required input values',
    'Review the calculated results'
  ],

  inputs: [
    {
      id: 'value',
      label: 'Value',
      type: 'number',
      required: true,
      min: 0
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result',
      type: 'number',
      explanation: 'Calculated result'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [
    {
      title: 'Example Calculation',
      description: 'Basic calculation example',
      inputs: {
        value: 100
      },
      expectedOutputs: {
        result: 100
      }
    }
  ]
};
