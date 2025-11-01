import { Calculator } from '../../types/calculator';

export const motorcycle_accident_compensation_calculator: Calculator = {
  id: 'MotorcycleAccidentCompensation-calculator-calculator',
  title: 'Motorcycle Accident Compensation Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Motorcycle Accident Compensation Calculator',
  description: 'Calculate motorcycle accident compensation calculator values.',
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
