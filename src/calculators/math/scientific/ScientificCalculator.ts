import { Calculator } from '../../../types/calculator';
import { scientificCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const scientificCalculator: Calculator = {
  id: 'scientific-calculator',
  title: 'Advanced Scientific Calculator',
  category: 'math',
  subcategory: 'Scientific Computing',
  description: 'High-precision scientific calculator supporting advanced mathematical functions, constants, number systems, and specialized computations with arbitrary precision arithmetic.',
  
  usageInstructions: [
    'Select the type of calculation (basic arithmetic, advanced functions, or number system conversion)',
    'Enter your mathematical expression or values',
    'Choose precision level for high-accuracy calculations',
    'For number system conversions, select source and target bases',
    'Review results with full precision and step-by-step explanations'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'expression', label: 'Mathematical Expression' },
        { value: 'function', label: 'Advanced Functions' },
        { value: 'conversion', label: 'Number System Conversion' },
        { value: 'constants', label: 'Mathematical Constants' },
        { value: 'combinatorics', label: 'Combinatorics & Probability' },
        { value: 'sequences', label: 'Sequences & Series' }
      ],
      tooltip: 'Choose the type of scientific calculation'
    },
    {
      id: 'expression',
      label: 'Mathematical Expression',
      type: 'select', // Custom component for expression input
      required: false,
      placeholder: 'sin(π/4) + cos(π/3) * ln(e)',
      tooltip: 'Enter mathematical expression using standard notation'
    },
    {
      id: 'functionType',
      label: 'Function Type',
      type: 'select',
      required: false,
      options: [
        { value: 'trigonometric', label: 'Trigonometric Functions' },
        { value: 'hyperbolic', label: 'Hyperbolic Functions' },
        { value: 'logarithmic', label: 'Logarithmic Functions' },
        { value: 'exponential', label: 'Exponential Functions' },
        { value: 'gamma', label: 'Gamma & Special Functions' },
        { value: 'bessel', label: 'Bessel Functions' }
      ],
      tooltip: 'Select the category of advanced function'
    },
    {
      id: 'inputValue',
      label: 'Input Value',
      type: 'number',
      required: false,
      placeholder: '1.5',
      tooltip: 'Input value for function calculation'
    },
    {
      id: 'sourceBase',
      label: 'Source Number Base',
      type: 'select',
      required: false,
      options: [
        { value: '2', label: 'Binary (Base 2)' },
        { value: '8', label: 'Octal (Base 8)' },
        { value: '10', label: 'Decimal (Base 10)' },
        { value: '16', label: 'Hexadecimal (Base 16)' },
        { value: 'custom', label: 'Custom Base' }
      ],
      tooltip: 'Base of the input number'
    },
    {
      id: 'targetBase',
      label: 'Target Number Base',
      type: 'select',
      required: false,
      options: [
        { value: '2', label: 'Binary (Base 2)' },
        { value: '8', label: 'Octal (Base 8)' },
        { value: '10', label: 'Decimal (Base 10)' },
        { value: '16', label: 'Hexadecimal (Base 16)' },
        { value: 'custom', label: 'Custom Base' }
      ],
      tooltip: 'Base to convert the number to'
    },
    {
      id: 'numberToConvert',
      label: 'Number to Convert',
      type: 'select', // Custom component for number input
      required: false,
      placeholder: '1010.101',
      tooltip: 'Number to convert between bases'
    },
    {
      id: 'precision',
      label: 'Decimal Precision',
      type: 'select',
      required: true,
      options: [
        { value: '6', label: '6 decimal places' },
        { value: '10', label: '10 decimal places' },
        { value: '15', label: '15 decimal places' },
        { value: '20', label: '20 decimal places' }
      ],
      defaultValue: '15',
      tooltip: 'Number of decimal places for high-precision calculations'
    },
    {
      id: 'angleUnit',
      label: 'Angle Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'radians', label: 'Radians' },
        { value: 'degrees', label: 'Degrees' },
        { value: 'gradians', label: 'Gradians' }
      ],
      defaultValue: 'radians',
      tooltip: 'Unit for trigonometric calculations'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result',
      type: 'text',
      explanation: 'The calculated result with full precision'
    },
    {
      id: 'scientificNotation',
      label: 'Scientific Notation',
      type: 'text',
      explanation: 'Result expressed in scientific notation'
    },
    {
      id: 'binaryRepresentation',
      label: 'Binary',
      type: 'text',
      explanation: 'Binary representation of the result'
    },
    {
      id: 'hexadecimalRepresentation',
      label: 'Hexadecimal',
      type: 'text',
      explanation: 'Hexadecimal representation of the result'
    },
    {
      id: 'fractionApproximation',
      label: 'Fraction Approximation',
      type: 'text',
      explanation: 'Rational approximation of the result'
    },
    {
      id: 'relatedConstants',
      label: 'Related Constants',
      type: 'text',
      explanation: 'Mathematical constants related to the calculation'
    }
  ],

  formulas: [scientificCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('calculationType', 'Calculation type is required'),
    ValidationRuleFactory.required('precision', 'Precision is required'),
    ValidationRuleFactory.required('angleUnit', 'Angle unit is required'),
    
    ValidationRuleFactory.businessRule(
      'expression',
      (expr, inputs) => {
        if (inputs?.calculationType === 'expression' && !expr) {
          return false;
        }
        return true;
      },
      'Mathematical expression is required for expression calculations'
    ),
    
    ValidationRuleFactory.businessRule(
      'inputValue',
      (value, inputs) => {
        if (inputs?.calculationType === 'function' && value === undefined) {
          return false;
        }
        return true;
      },
      'Input value is required for function calculations'
    ),
    
    ValidationRuleFactory.businessRule(
      'numberToConvert',
      (number, inputs) => {
        if (inputs?.calculationType === 'conversion' && !number) {
          return false;
        }
        return true;
      },
      'Number to convert is required for conversion calculations'
    )
  ],

  examples: [
    {
      title: 'Trigonometric Expression',
      description: 'Calculate sin(π/4) + cos(π/3)',
      inputs: {
        calculationType: 'expression',
        expression: 'sin(π/4) + cos(π/3)',
        precision: 15,
        angleUnit: 'radians'
      },
      expectedOutputs: {
        result: '1.207106781186547',
        scientificNotation: '1.207106781186547e+0'
      }
    },
    {
      title: 'Number Base Conversion',
      description: 'Convert binary 1010.101 to decimal',
      inputs: {
        calculationType: 'conversion',
        sourceBase: '2',
        targetBase: '10',
        numberToConvert: '1010.101',
        precision: 15
      },
      expectedOutputs: {
        result: '10.625'
      }
    }
  ]
};