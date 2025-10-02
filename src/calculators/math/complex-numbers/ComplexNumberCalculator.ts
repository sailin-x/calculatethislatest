import { Calculator } from '../../types/calculator';
import { complexNumberCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const complexNumberCalculator: Calculator = {
  id: 'complex-number-calculator',
  title: 'Advanced Complex Number Calculator',
  category: 'math',
  subcategory: 'Complex Numbers',
  description: 'Comprehensive complex number calculator supporting arithmetic operations, polar/rectangular conversions, roots, powers, and advanced functions with step-by-step solutions.',
  
  usageInstructions: [
    'Select the operation you want to perform on complex numbers',
    'Enter complex numbers in rectangular form (a + bi) or polar form (r∠θ)',
    'For single number operations, enter the first complex number only',
    'For binary operations, enter both complex numbers',
    'Review results in both rectangular and polar forms with detailed steps'
  ],

  inputs: [
    {
      id: 'operation',
      label: 'Operation',
      type: 'select',
      required: true,
      options: [
        { value: 'add', label: 'Addition (z₁ + z₂)' },
        { value: 'subtract', label: 'Subtraction (z₁ - z₂)' },
        { value: 'multiply', label: 'Multiplication (z₁ × z₂)' },
        { value: 'divide', label: 'Division (z₁ ÷ z₂)' },
        { value: 'power', label: 'Power (z^n)' },
        { value: 'root', label: 'nth Root (ⁿ√z)' },
        { value: 'conjugate', label: 'Complex Conjugate' },
        { value: 'modulus', label: 'Modulus/Magnitude' },
        { value: 'argument', label: 'Argument/Phase' },
        { value: 'convert', label: 'Polar ↔ Rectangular' },
        { value: 'exponential', label: 'Exponential (e^z)' },
        { value: 'logarithm', label: 'Natural Logarithm (ln z)' }
      ],
      tooltip: 'Choose the complex number operation to perform'
    },
    {
      id: 'z1Real',
      label: 'First Number - Real Part (a)',
      type: 'number',
      required: true,
      placeholder: '3',
      tooltip: 'Real part of the first complex number'
    },
    {
      id: 'z1Imaginary',
      label: 'First Number - Imaginary Part (b)',
      type: 'number',
      required: true,
      placeholder: '4',
      tooltip: 'Imaginary part of the first complex number'
    },
    {
      id: 'z2Real',
      label: 'Second Number - Real Part (c)',
      type: 'number',
      required: false,
      placeholder: '1',
      tooltip: 'Real part of the second complex number (for binary operations)'
    },
    {
      id: 'z2Imaginary',
      label: 'Second Number - Imaginary Part (d)',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Imaginary part of the second complex number (for binary operations)'
    },
    {
      id: 'powerExponent',
      label: 'Exponent (n)',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Exponent for power operations or root index'
    },
    {
      id: 'inputFormat',
      label: 'Input Format',
      type: 'select',
      required: true,
      options: [
        { value: 'rectangular', label: 'Rectangular (a + bi)' },
        { value: 'polar', label: 'Polar (r∠θ)' }
      ],
      defaultValue: 'rectangular',
      tooltip: 'Format of input complex numbers'
    },
    {
      id: 'angleUnit',
      label: 'Angle Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'degrees', label: 'Degrees' },
        { value: 'radians', label: 'Radians' }
      ],
      defaultValue: 'degrees',
      tooltip: 'Unit for angles in polar form'
    }
  ],

  outputs: [
    {
      id: 'resultRectangular',
      label: 'Result (Rectangular)',
      type: 'text',
      explanation: 'Result in rectangular form (a + bi)'
    },
    {
      id: 'resultPolar',
      label: 'Result (Polar)',
      type: 'text',
      explanation: 'Result in polar form (r∠θ)'
    },
    {
      id: 'modulus',
      label: 'Modulus/Magnitude',
      type: 'number',
      explanation: 'Distance from origin |z| = √(a² + b²)'
    },
    {
      id: 'argument',
      label: 'Argument/Phase',
      type: 'text',
      explanation: 'Angle from positive real axis'
    },
    {
      id: 'conjugate',
      label: 'Complex Conjugate',
      type: 'text',
      explanation: 'Complex conjugate z* = a - bi'
    },
    {
      id: 'allRoots',
      label: 'All Roots',
      type: 'text',
      explanation: 'All nth roots (for root operations)'
    }
  ],

  formulas: [complexNumberCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('operation', 'Operation is required'),
    ValidationRuleFactory.required('z1Real', 'First number real part is required'),
    ValidationRuleFactory.required('z1Imaginary', 'First number imaginary part is required'),
    ValidationRuleFactory.required('inputFormat', 'Input format is required'),
    ValidationRuleFactory.required('angleUnit', 'Angle unit is required'),
    
    ValidationRuleFactory.businessRule(
      'z2Real',
      (value, inputs) => {
        const binaryOps = ['add', 'subtract', 'multiply', 'divide'];
        if (binaryOps.includes(inputs?.operation) && value === undefined) {
          return false;
        }
        return true;
      },
      'Second number is required for binary operations'
    ),
    
    ValidationRuleFactory.businessRule(
      'powerExponent',
      (value, inputs) => {
        const powerOps = ['power', 'root'];
        if (powerOps.includes(inputs?.operation) && value === undefined) {
          return false;
        }
        return true;
      },
      'Exponent is required for power and root operations'
    ),
    
    ValidationRuleFactory.businessRule(
      'z1Real',
      (real, inputs) => {
        if (inputs?.inputFormat === 'polar' && real < 0) {
          return false;
        }
        return true;
      },
      'Modulus (r) must be non-negative in polar form'
    )
  ],

  examples: [
    {
      title: 'Complex Addition',
      description: 'Add (3 + 4i) + (1 + 2i)',
      inputs: {
        operation: 'add',
        z1Real: 3,
        z1Imaginary: 4,
        z2Real: 1,
        z2Imaginary: 2,
        inputFormat: 'rectangular',
        angleUnit: 'degrees'
      },
      expectedOutputs: {
        resultRectangular: '4 + 6i',
        modulus: 7.211
      }
    },
    {
      title: 'Complex Power',
      description: 'Calculate (1 + i)²',
      inputs: {
        operation: 'power',
        z1Real: 1,
        z1Imaginary: 1,
        powerExponent: 2,
        inputFormat: 'rectangular',
        angleUnit: 'degrees'
      },
      expectedOutputs: {
        resultRectangular: '0 + 2i',
        resultPolar: '2∠90°'
      }
    }
  ]
};