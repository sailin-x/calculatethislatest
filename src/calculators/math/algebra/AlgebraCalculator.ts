import { Calculator } from '../../types/calculator';
import { algebraCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const algebraCalculator: Calculator = {
  id: 'algebra-calculator',
  title: 'Advanced Algebra Calculator',
  category: 'math',
  subcategory: 'Algebra & Equations',
  description: 'Comprehensive algebraic equation solver supporting linear, quadratic, cubic, and polynomial equations with StepByStep solutions and graphing capabilities.',
  
  usageInstructions: [
    'Select the type of equation you want to solve',
    'Enter coefficients for your equation',
    'For polynomial equations, enter coefficients from highest to lowest degree',
    'Review StepByStep solution and graphical representation',
    'Use the factoring tool for polynomial factorization'
  ],

  inputs: [
    {
      id: 'equationType',
      label: 'Equation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'linear', label: 'Linear (ax + b = 0)' },
        { value: 'quadratic', label: 'Quadratic (ax² + bx + c = 0)' },
        { value: 'cubic', label: 'Cubic (ax³ + bx² + cx + d = 0)' },
        { value: 'polynomial', label: 'General Polynomial' },
        { value: 'system', label: 'System of Linear Equations' }
      ],
      tooltip: 'Choose the type of algebraic equation to solve'
    },
    {
      id: 'coefficientA',
      label: 'Coefficient a',
      type: 'number',
      required: true,
      placeholder: '1',
      tooltip: 'Leading coefficient (cannot be 0 for polynomial equations)'
    },
    {
      id: 'coefficientB',
      label: 'Coefficient b',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Second coefficient'
    },
    {
      id: 'coefficientC',
      label: 'Coefficient c',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Third coefficient'
    },
    {
      id: 'coefficientD',
      label: 'Coefficient d',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Fourth coefficient (for cubic equations)'
    },
    {
      id: 'polynomialCoefficients',
      label: 'Polynomial Coefficients (comma-separated)',
      type: 'select', // Custom component for array input
      required: false,
      placeholder: '1, -3, 2, 0',
      tooltip: 'Enter coefficients from highest to lowest degree, separated by commas'
    },
    {
      id: 'systemMatrix',
      label: 'System Matrix (for 2x2 or 3x3 systems)',
      type: 'select', // Custom component for matrix input
      required: false,
      placeholder: '[[2,1,3],[1,-1,1],[1,2,-1]]',
      tooltip: 'Enter augmented matrix for system of equations'
    },
    {
      id: 'precision',
      label: 'Decimal Precision',
      type: 'select',
      required: true,
      options: [
        { value: '4', label: '4 decimal places' },
        { value: '6', label: '6 decimal places' },
        { value: '8', label: '8 decimal places' },
        { value: '10', label: '10 decimal places' }
      ],
      defaultValue: '6',
      tooltip: 'Number of decimal places for results'
    }
  ],

  outputs: [
    {
      id: 'solutions',
      label: 'Solutions',
      type: 'text',
      explanation: 'All real and complex solutions to the equation'
    },
    {
      id: 'realSolutions',
      label: 'Real Solutions',
      type: 'text',
      explanation: 'Real number solutions only'
    },
    {
      id: 'complexSolutions',
      label: 'Complex Solutions',
      type: 'text',
      explanation: 'Complex number solutions (if any)'
    },
    {
      id: 'discriminant',
      label: 'Discriminant',
      type: 'number',
      explanation: 'Discriminant value (for quadratic equations)'
    },
    {
      id: 'vertex',
      label: 'Vertex',
      type: 'text',
      explanation: 'Vertex coordinates (for quadratic equations)'
    },
    {
      id: 'axisOfSymmetry',
      label: 'Axis of Symmetry',
      type: 'text',
      explanation: 'Line of symmetry (for quadratic equations)'
    },
    {
      id: 'factorization',
      label: 'Factored Form',
      type: 'text',
      explanation: 'Factored form of the polynomial'
    },
    {
      id: 'domain',
      label: 'Domain',
      type: 'text',
      explanation: 'Domain of the function'
    },
    {
      id: 'range',
      label: 'Range',
      type: 'text',
      explanation: 'Range of the function'
    },
    {
      id: 'yIntercept',
      label: 'Y-Intercept',
      type: 'number',
      explanation: 'Y-intercept of the function'
    },
    {
      id: 'xIntercepts',
      label: 'X-Intercepts',
      type: 'text',
      explanation: 'X-intercepts (roots) of the function'
    }
  ],

  formulas: [algebraCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('equationType', 'Equation type is required'),
    ValidationRuleFactory.required('coefficientA', 'Leading coefficient is required'),
    ValidationRuleFactory.required('precision', 'Precision is required'),
    
    ValidationRuleFactory.businessRule(
      'coefficientA',
      (value, inputs) => {
        if (inputs?.equationType === 'linear') return true;
        return value !== 0;
      },
      'Leading coefficient cannot be zero for polynomial equations'
    ),
    
    ValidationRuleFactory.businessRule(
      'polynomialCoefficients',
      (coefficients) => {
        if (!Array.isArray(coefficients)) return true;
        return coefficients.length >= 2 && coefficients.length <= 10;
      },
      'Polynomial must have between 2 and 10 coefficients'
    ),
    
    ValidationRuleFactory.businessRule(
      'systemMatrix',
      (matrix) => {
        if (!Array.isArray(matrix)) return true;
        return matrix.length >= 2 && matrix.length <= 3;
      },
      'System matrix must be 2x2 or 3x3'
    )
  ],

  examples: [
    {
      title: 'Quadratic Equation',
      description: 'Solve x² - 5x + 6 = 0',
      inputs: {
        equationType: 'quadratic',
        coefficientA: 1,
        coefficientB: -5,
        coefficientC: 6,
        precision: 6
      },
      expectedOutputs: {
        solutions: 'x = 2, x = 3',
        discriminant: 1,
        vertex: '(2.5, -0.25)',
        factorization: '(x - 2)(x - 3)'
      }
    },
    {
      title: 'Cubic Equation',
      description: 'Solve x³ - 6x² + 11x - 6 = 0',
      inputs: {
        equationType: 'cubic',
        coefficientA: 1,
        coefficientB: -6,
        coefficientC: 11,
        coefficientD: -6,
        precision: 6
      },
      expectedOutputs: {
        solutions: 'x = 1, x = 2, x = 3',
        factorization: '(x - 1)(x - 2)(x - 3)'
      }
    }
  ]
};