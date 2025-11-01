import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'ManagedSecurityService-ProviderMsspVs-InHouseSoc-calculator-calculator',
  title: 'Managed Security Service Provider Mssp Vs In House Soc Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Managed Security Service Provider Mssp Vs In House Soc Calculator',
  description: 'Calculate managed security service provider mssp vs in house soc calculator values.',
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
