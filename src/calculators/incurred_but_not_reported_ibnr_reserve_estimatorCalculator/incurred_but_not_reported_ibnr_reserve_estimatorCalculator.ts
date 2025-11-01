import { Calculator } from '../../types/calculator';

export const incurred_but_not_reported_ibnr_reserve_estimatorCalculator: Calculator = {
  id: 'IncurredButNot-ReportedIbnrReserve-estimator-calculator',
  title: 'Incurred But Not Reported Ibnr Reserve Estimator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Incurred But Not Reported Ibnr Reserve Estimator',
  description: 'Calculate incurred but not reported ibnr reserve estimator values.',
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
