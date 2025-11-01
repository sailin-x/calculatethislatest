import { Calculator } from '../../types/calculator';

export const portfolio_company_ebitda_growth_calculator: Calculator = {
  id: 'PortfolioCompanyEbitda-GrowthCalculatorCalculator',
  title: 'Portfolio Company Ebitda Growth Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Portfolio Company Ebitda Growth Calculator',
  description: 'Calculate portfolio company ebitda growth calculator values.',
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
