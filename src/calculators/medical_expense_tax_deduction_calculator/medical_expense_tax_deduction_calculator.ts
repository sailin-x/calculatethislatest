import { Calculator } from '../../types/calculator';

export const medical_expense_tax_deduction_calculator: Calculator = {
  id: 'MedicalExpenseTax-DeductionCalculatorCalculator',
  title: 'Medical Expense Tax Deduction Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Medical Expense Tax Deduction Calculator',
  description: 'Calculate medical expense tax deduction calculator values.',
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
