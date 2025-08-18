import { Calculator } from '../../../types/calculator';
import { calculusCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const calculusCalculator: Calculator = {
  id: 'calculus-calculator',
  title: 'Advanced Calculus Calculator',
  category: 'math',
  subcategory: 'Calculus & Analysis',
  description: 'Comprehensive calculus calculator supporting derivatives, integrals, limits, and series with step-by-step solutions and graphical analysis.',
  
  usageInstructions: [
    'Select the type of calculus operation (derivative, integral, limit, or series)',
    'Enter your function using standard mathematical notation',
    'Specify the variable of integration/differentiation',
    'Set bounds for definite integrals or limits',
    'Review step-by-step solution and graphical representation'
  ],

  inputs: [
    {
      id: 'operationType',
      label: 'Operation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'derivative', label: 'Derivative (dy/dx)' },
        { value: 'integral', label: 'Integral (∫f(x)dx)' },
        { value: 'definiteIntegral', label: 'Definite Integral' },
        { value: 'limit', label: 'Limit' },
        { value: 'series', label: 'Series Expansion' },
        { value: 'partialDerivative', label: 'Partial Derivative' }
      ],
      tooltip: 'Choose the calculus operation to perform'
    },
    {
      id: 'functionExpression',
      label: 'Function f(x)',
      type: 'select', // Custom component for function input
      required: true,
      placeholder: 'x^2 + 3*x + 2',
      tooltip: 'Enter function using standard notation (^, *, +, -, /, sin, cos, ln, etc.)'
    },
    {
      id: 'variable',
      label: 'Variable',
      type: 'select',
      required: true,
      options: [
        { value: 'x', label: 'x' },
        { value: 'y', label: 'y' },
        { value: 't', label: 't' },
        { value: 'u', label: 'u' }
      ],
      defaultValue: 'x',
      tooltip: 'Variable with respect to which operation is performed'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result',
      type: 'text',
      explanation: 'The calculated result of the calculus operation'
    },
    {
      id: 'stepByStep',
      label: 'Step-by-Step Solution',
      type: 'text',
      explanation: 'Detailed solution steps'
    }
  ],

  formulas: [calculusCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('operationType', 'Operation type is required'),
    ValidationRuleFactory.required('functionExpression', 'Function expression is required'),
    ValidationRuleFactory.required('variable', 'Variable is required')
  ],

  examples: [
    {
      title: 'Polynomial Derivative',
      description: 'Find derivative of x³ + 2x² - 5x + 1',
      inputs: {
        operationType: 'derivative',
        functionExpression: 'x^3 + 2*x^2 - 5*x + 1',
        variable: 'x'
      },
      expectedOutputs: {
        result: '3x² + 4x - 5'
      }
    }
  ]
};