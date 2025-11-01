import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'DentalMalpracticeSettlement-calculator-calculator',
  title: 'Dental Malpractice Settlement Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Dental Malpractice Settlement Calculator',
  description: 'Calculate dental malpractice settlement calculator values.',
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
