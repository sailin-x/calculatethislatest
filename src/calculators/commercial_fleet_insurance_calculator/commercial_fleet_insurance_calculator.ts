import { Calculator } from '../../types/calculator';

export const commercial_fleet_insurance_calculator: Calculator = {
  id: 'CommercialFleetInsurance-calculator-calculator',
  title: 'Commercial Fleet Insurance Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Commercial Fleet Insurance Calculator',
  description: 'Calculate commercial fleet insurance calculator values.',
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
