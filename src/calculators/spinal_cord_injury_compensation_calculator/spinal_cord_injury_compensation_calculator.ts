import { Calculator } from '../../types/calculator';

export const spinal_cord_injury_compensation_calculator: Calculator = {
  id: 'SpinalCordInjury-CompensationCalculatorCalculator',
  title: 'Spinal Cord Injury Compensation Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Spinal Cord Injury Compensation Calculator',
  description: 'Calculate spinal cord injury compensation calculator values.',
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
