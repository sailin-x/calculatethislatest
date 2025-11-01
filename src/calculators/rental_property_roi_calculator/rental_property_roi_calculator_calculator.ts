import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'RentalPropertyRoi-calculator-calculator',
  title: 'Rental Property Roi Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Rental Property Roi Calculator',
  description: 'Calculate rental property roi calculator values.',
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
