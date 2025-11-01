import { Calculator } from '../../types/calculator';

export const government_contract_bid_no_bid_decision_calculator: Calculator = {
  id: 'GovernmentContractBid-NoBidDecision-calculator-calculator',
  title: 'Government Contract Bid No Bid Decision Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Government Contract Bid No Bid Decision Calculator',
  description: 'Calculate government contract bid no bid decision calculator values.',
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
