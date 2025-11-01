import { Calculator } from '../../types/calculator';

export const digital_transformation_business_case_calculator: Calculator = {
  id: 'DigitalTransformationBusiness-CaseCalculatorCalculator',
  title: 'Digital Transformation Business Case Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Digital Transformation Business Case Calculator',
  description: 'Calculate digital transformation business case calculator values.',
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
