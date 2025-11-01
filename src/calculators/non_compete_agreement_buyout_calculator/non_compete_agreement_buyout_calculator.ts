import { Calculator } from '../../types/calculator';

export const non_compete_agreement_buyout_calculator: Calculator = {
  id: 'NonCompeteAgreement-BuyoutCalculatorCalculator',
  title: 'Non Compete Agreement Buyout Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Non Compete Agreement Buyout Calculator',
  description: 'Calculate non compete agreement buyout calculator values.',
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
