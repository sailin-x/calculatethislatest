import { Calculator } from '../../types/calculator';

export const irs_offer_in_compromise_oic_calculator: Calculator = {
  id: 'IrsOfferIn-CompromiseOicCalculator-calculator',
  title: 'Irs Offer In Compromise Oic Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Irs Offer In Compromise Oic Calculator',
  description: 'Calculate irs offer in compromise oic calculator values.',
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
