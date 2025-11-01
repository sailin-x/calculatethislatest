import { Calculator } from '../../types/calculator';

export const crowdfunding_equity_offering_calculator: Calculator = {
  id: 'CrowdfundingEquityOffering-calculator-calculator',
  title: 'Crowdfunding Equity Offering Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Crowdfunding Equity Offering Calculator',
  description: 'Calculate crowdfunding equity offering calculator values.',
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
