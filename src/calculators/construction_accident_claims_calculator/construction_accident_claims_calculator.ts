import { Calculator } from '../../types/calculator';

export const construction_accident_claims_calculator: Calculator = {
  id: 'ConstructionAccidentClaims-calculator-calculator',
  title: 'Construction Accident Claims Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Construction Accident Claims Calculator',
  description: 'Calculate construction accident claims calculator values.',
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
