import { Calculator } from '../../types/calculator';
import { matrixCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const matrixCalculator: Calculator = {
  id: 'matrix-calculator',
  title: 'Advanced Matrix Calculator',
  category: 'math',
  subcategory: 'Linear Algebra & Matrices',
  description: 'Comprehensive matrix calculator supporting all matrix operations including determinants, inverses, eigenvalues, decompositions, and system solving with step-by-step solutions.',
  
  usageInstructions: [
    'Select the matrix operation you want to perform',
    'Enter matrix dimensions (rows × columns)',
    'Input matrix elements row by row, separated by commas',
    'For binary operations, enter both matrices',
    'Review results with detailed calculation steps and explanations'
  ],

  inputs: [
    {
      id: 'operation',
      label: 'Matrix Operation',
      type: 'select',
      required: true,
      options: [
        { value: 'add', label: 'Addition (A + B)' },
        { value: 'subtract', label: 'Subtraction (A - B)' },
        { value: 'multiply', label: 'Multiplication (A × B)' },
        { value: 'scalar_multiply', label: 'Scalar Multiplication (k × A)' },
        { value: 'transpose', label: 'Transpose (Aᵀ)' },
        { value: 'determinant', label: 'Determinant (det A)' },
        { value: 'inverse', label: 'Inverse (A⁻¹)' },
        { value: 'rank', label: 'Rank' },
        { value: 'trace', label: 'Trace (tr A)' },
        { value: 'eigenvalues', label: 'Eigenvalues' },
        { value: 'eigenvectors', label: 'Eigenvectors' },
        { value: 'lu_decomposition', label: 'LU Decomposition' },
        { value: 'solve_system', label: 'Solve Linear System (Ax = b)' }
      ],
      tooltip: 'Choose the matrix operation to perform'
    },
    {
      id: 'matrixARows',
      label: 'Matrix A - Rows',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      placeholder: '3',
      tooltip: 'Number of rows in matrix A'
    },
    {
      id: 'matrixACols',
      label: 'Matrix A - Columns',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      placeholder: '3',
      tooltip: 'Number of columns in matrix A'
    },
    {
      id: 'matrixAElements',
      label: 'Matrix A Elements',
      type: 'select', // Custom component for matrix input
      required: true,
      placeholder: '1,2,3,4,5,6,7,8,9',
      tooltip: 'Enter matrix elements row by row, separated by commas'
    },
    {
      id: 'matrixBRows',
      label: 'Matrix B - Rows',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      placeholder: '3',
      tooltip: 'Number of rows in matrix B (for binary operations)'
    },
    {
      id: 'matrixBCols',
      label: 'Matrix B - Columns',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      placeholder: '3',
      tooltip: 'Number of columns in matrix B (for binary operations)'
    },
    {
      id: 'matrixBElements',
      label: 'Matrix B Elements',
      type: 'select', // Custom component for matrix input
      required: false,
      placeholder: '9,8,7,6,5,4,3,2,1',
      tooltip: 'Enter matrix B elements row by row, separated by commas'
    },
    {
      id: 'scalarValue',
      label: 'Scalar Value',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Scalar value for scalar multiplication'
    },
    {
      id: 'vectorB',
      label: 'Vector b (for system solving)',
      type: 'select', // Custom component for vector input
      required: false,
      placeholder: '1,2,3',
      tooltip: 'Right-hand side vector for solving Ax = b'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result Matrix/Value',
      type: 'text',
      explanation: 'The calculated result matrix or scalar value'
    },
    {
      id: 'determinant',
      label: 'Determinant',
      type: 'number',
      explanation: 'Determinant of the matrix'
    },
    {
      id: 'rank',
      label: 'Rank',
      type: 'number',
      explanation: 'Rank of the matrix'
    },
    {
      id: 'trace',
      label: 'Trace',
      type: 'number',
      explanation: 'Sum of diagonal elements'
    },
    {
      id: 'eigenvalues',
      label: 'Eigenvalues',
      type: 'text',
      explanation: 'Eigenvalues of the matrix'
    },
    {
      id: 'eigenvectors',
      label: 'Eigenvectors',
      type: 'text',
      explanation: 'Eigenvectors corresponding to eigenvalues'
    },
    {
      id: 'isInvertible',
      label: 'Invertible',
      type: 'text',
      explanation: 'Whether the matrix is invertible'
    },
    {
      id: 'condition',
      label: 'Condition Number',
      type: 'number',
      explanation: 'Condition number (for numerical stability)'
    }
  ],

  formulas: [matrixCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('operation', 'Operation is required'),
    ValidationRuleFactory.required('matrixARows', 'Matrix A rows is required'),
    ValidationRuleFactory.required('matrixACols', 'Matrix A columns is required'),
    ValidationRuleFactory.required('matrixAElements', 'Matrix A elements are required'),
    
    ValidationRuleFactory.businessRule(
      'matrixAElements',
      (elements, inputs) => {
        if (!Array.isArray(elements)) return false;
        const expectedSize = (inputs?.matrixARows || 0) * (inputs?.matrixACols || 0);
        return elements.length === expectedSize;
      },
      'Number of elements must match matrix dimensions'
    ),
    
    ValidationRuleFactory.businessRule(
      'matrixBElements',
      (elements, inputs) => {
        const binaryOps = ['add', 'subtract', 'multiply'];
        if (binaryOps.includes(inputs?.operation)) {
          if (!Array.isArray(elements)) return false;
          const expectedSize = (inputs?.matrixBRows || 0) * (inputs?.matrixBCols || 0);
          return elements.length === expectedSize;
        }
        return true;
      },
      'Matrix B elements required for binary operations'
    ),
    
    ValidationRuleFactory.businessRule(
      'matrixACols',
      (aCols, inputs) => {
        if (inputs?.operation === 'determinant' || inputs?.operation === 'inverse') {
          return aCols === inputs?.matrixARows;
        }
        return true;
      },
      'Matrix must be square for determinant and inverse operations'
    ),
    
    ValidationRuleFactory.businessRule(
      'scalarValue',
      (value, inputs) => {
        if (inputs?.operation === 'scalar_multiply' && value === undefined) {
          return false;
        }
        return true;
      },
      'Scalar value is required for scalar multiplication'
    )
  ],

  examples: [
    {
      title: '3×3 Matrix Determinant',
      description: 'Calculate determinant of a 3×3 matrix',
      inputs: {
        operation: 'determinant',
        matrixARows: 3,
        matrixACols: 3,
        matrixAElements: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      expectedOutputs: {
        determinant: 0,
        result: '0'
      }
    },
    {
      title: 'Matrix Multiplication',
      description: 'Multiply two 2×2 matrices',
      inputs: {
        operation: 'multiply',
        matrixARows: 2,
        matrixACols: 2,
        matrixAElements: [1, 2, 3, 4],
        matrixBRows: 2,
        matrixBCols: 2,
        matrixBElements: [5, 6, 7, 8]
      },
      expectedOutputs: {
        result: '[[19, 22], [43, 50]]'
      }
    }
  ]
};