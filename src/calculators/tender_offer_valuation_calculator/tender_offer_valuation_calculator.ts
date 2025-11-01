import { Calculator } from '../../types/calculator';

export const tender_offer_valuation_calculator: Calculator = {
  id: 'TenderOfferValuation-calculator-calculator',
  title: 'Tender Offer Valuation Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Tender Offer Valuation Calculator',
  description: 'Calculate tender offer valuation calculator values.',
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
