import { Calculator } from '../../types/calculator';

export const gpu_mining_profitabilityCalculator: Calculator = {
  id: 'GpuMiningProfitability-calculator',
  title: 'Gpu Mining Profitability Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Gpu Mining Profitability',
  description: 'Calculate gpu mining profitability values.',
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
