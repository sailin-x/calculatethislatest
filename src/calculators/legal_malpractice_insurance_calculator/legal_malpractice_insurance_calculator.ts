import { Calculator } from '../../types/calculator';

export const legal_malpractice_insurance_calculator: Calculator = {
  id: 'LegalMalpracticeInsurance-calculator-calculator',
  title: 'Legal Malpractice Insurance Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Legal Malpractice Insurance Calculator',
  description: 'Calculate legal malpractice insurance calculator values.',
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
