import { Calculator } from '../../types/calculator';

export const errors_omissions_insurance_calculator: Calculator = {
  id: 'ErrorsOmissionsInsurance-calculator-calculator',
  title: 'Errors Omissions Insurance Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Errors Omissions Insurance Calculator',
  description: 'Calculate errors omissions insurance calculator values.',
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
