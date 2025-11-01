import { Calculator } from '../../types/calculator';

export const it_outsourcing_vs_in_house_cost_benefit_analysisCalculator: Calculator = {
  id: 'ItOutsourcingVs-InHouseCost-BenefitAnalysisCalculator',
  title: 'It Outsourcing Vs In House Cost Benefit Analysis Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'It Outsourcing Vs In House Cost Benefit Analysis',
  description: 'Calculate it outsourcing vs in house cost benefit analysis values.',
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
