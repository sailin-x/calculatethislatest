import { Calculator } from '../../types/calculator';

export const rental_property_roiCalculator: Calculator = {
  id: 'RentalPropertyRoi-calculator',
  title: 'Rental Property Roi Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Rental Property Roi',
  description: 'Calculate rental property roi values.',
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
