import { Calculator } from '../../types/calculator';
import { Four01kCalculatorCalculatorInputs, Four01kCalculatorCalculatorResults } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export const Four01kCalculatorCalculatorCalculator: Calculator & {
  calculate: (inputs: Four01kCalculatorCalculatorInputs) => Four01kCalculatorCalculatorResults;
} = {
  id: '401k_calculatorCalculator',
  title: '401k Calculator Calculator',
  category: 'finance',
  subcategory: 'retirement',
  description: 'Calculate 401k calculator values',
  usageInstructions: [
    'Enter your 401k details',
    'Review calculation results'
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
      explanation: 'Calculation result'
    }
  ],

  formulas: [],
  validationRules: [],
  examples: [],

  calculate(inputs: Four01kCalculatorCalculatorInputs): Four01kCalculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const analysis = generateAnalysis(inputs, { result });

    return {
      result,
      analysis: analysis.recommendation
    };
  }
};
