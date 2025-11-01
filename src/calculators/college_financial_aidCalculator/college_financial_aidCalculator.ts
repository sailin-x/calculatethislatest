import { Calculator } from '../../types/calculator';

export const college_financial_aidCalculator: Calculator = {
  id: 'CollegeFinancialAid-calculator',
  title: 'College Financial Aid Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'College Financial Aid',
  description: 'Calculate college financial aid values.',
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
