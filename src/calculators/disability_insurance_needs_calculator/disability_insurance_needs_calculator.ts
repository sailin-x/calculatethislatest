import { Calculator } from '../../types/calculator';

export const disability_insurance_needs_calculator: Calculator = {
  id: 'DisabilityInsuranceNeeds-calculator-calculator',
  title: 'Disability Insurance Needs Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Disability Insurance Needs Calculator',
  description: 'Calculate disability insurance needs calculator values.',
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
