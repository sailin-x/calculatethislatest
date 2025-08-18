import { TestSuite, TestCase } from '../TestFramework';

/**
 * Comprehensive test suite for mathematical calculators
 * Includes validation against Wolfram Alpha, MATLAB, and academic mathematical standards
 */
export const mathTestSuite: TestSuite = {
  calculatorId: 'algebra-calculator',
  name: 'Mathematics Calculator Test Suite',
  description: 'Validation against mathematical standards including Wolfram Alpha, MATLAB, and academic references',
  
  testCases: [
    // Algebra tests
    {
      id: 'quadratic-real-roots',
      name: 'Quadratic Equation - Real Roots',
      description: 'Standard quadratic with two real roots',
      inputs: {
        equationType: 'quadratic',
        coefficientA: 1,
        coefficientB: -5,
        coefficientC: 6
      },
      expectedOutputs: {
        solutions: '3, 2',
        discriminant: 1,
        vertex: '(2.5, -0.25)',
        factorization: '(x - 3)(x - 2)'
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'critical',
      industryBenchmark: {
        source: 'Wolfram Alpha',
        tool: 'Equation Solver',
        expectedResult: [3, 2],
        notes: 'Standard quadratic factorization'
      }
    },

    {
      id: 'quadratic-complex-roots',
      name: 'Quadratic Equation - Complex Roots',
      description: 'Quadratic with complex conjugate roots',
      inputs: {
        equationType: 'quadratic',
        coefficientA: 1,
        coefficientB: 0,
        coefficientC: 1
      },
      expectedOutputs: {
        solutions: 'i, -i',
        discriminant: -4,
        realSolutions: 'No real solutions',
        complexSolutions: 'i, -i'
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high'
    },

    {
      id: 'cubic-equation',
      name: 'Cubic Equation',
      description: 'Cubic equation with three real roots',
      inputs: {
        equationType: 'cubic',
        coefficientA: 1,
        coefficientB: -6,
        coefficientC: 11,
        coefficientD: -6
      },
      expectedOutputs: {
        solutions: '1, 2, 3',
        factorization: '(x - 1)(x - 2)(x - 3)'
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high',
      industryBenchmark: {
        source: 'Wolfram Alpha',
        tool: 'Polynomial Solver',
        expectedResult: [1, 2, 3]
      }
    },

    // Calculus tests
    {
      id: 'polynomial-derivative',
      name: 'Polynomial Derivative',
      description: 'Derivative of polynomial function',
      inputs: {
        operationType: 'derivative',
        functionExpression: 'x^3 + 2*x^2 - 5*x + 1',
        variable: 'x'
      },
      expectedOutputs: {
        result: '3*x^2 + 4*x - 5',
        stepByStep: 'Power rule applied to each term'
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high',
      industryBenchmark: {
        source: 'Wolfram Alpha',
        tool: 'Derivative Calculator',
        expectedResult: '3*x^2 + 4*x - 5'
      }
    },

    {
      id: 'polynomial-integral',
      name: 'Polynomial Integral',
      description: 'Indefinite integral of polynomial',
      inputs: {
        operationType: 'integral',
        functionExpression: '3*x^2 + 4*x - 5',
        variable: 'x'
      },
      expectedOutputs: {
        result: 'x^3 + 2*x^2 - 5*x + C',
        stepByStep: 'Power rule for integration'
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high'
    },

    {
      id: 'definite-integral',
      name: 'Definite Integral',
      description: 'Definite integral with bounds',
      inputs: {
        operationType: 'definiteIntegral',
        functionExpression: 'x^2',
        variable: 'x',
        lowerBound: 0,
        upperBound: 2
      },
      expectedOutputs: {
        result: '2.666667',
        exactResult: '8/3'
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high',
      industryBenchmark: {
        source: 'MATLAB',
        tool: 'Symbolic Math Toolbox',
        expectedResult: 2.666667
      }
    },

    // Geometry tests
    {
      id: 'triangle-area-heron',
      name: 'Triangle Area - Heron\'s Formula',
      description: 'Triangle area using Heron\'s formula',
      inputs: {
        calculationType: 'triangle',
        sideA: 3,
        sideB: 4,
        sideC: 5
      },
      expectedOutputs: {
        area: 6,
        perimeter: 12,
        angles: 'A: 36.87°, B: 53.13°, C: 90°',
        type: 'Right Triangle'
      },
      tolerance: 0.01,
      category: 'accuracy',
      priority: 'high'
    },

    {
      id: 'circle-calculations',
      name: 'Circle Calculations',
      description: 'Circle area and circumference',
      inputs: {
        calculationType: 'circle',
        sideA: 5 // radius
      },
      expectedOutputs: {
        area: 78.5398,
        perimeter: 31.4159,
        diameter: 10
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'medium'
    },

    // Statistics tests
    {
      id: 'descriptive-statistics',
      name: 'Descriptive Statistics',
      description: 'Basic statistical measures',
      inputs: {
        dataset: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        confidenceLevel: 95
      },
      expectedOutputs: {
        mean: 5.5,
        median: 5.5,
        mode: 'No mode',
        sampleStandardDeviation: 3.0277,
        variance: 9.1667,
        range: 9
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high',
      industryBenchmark: {
        source: 'R Statistical Software',
        tool: 'Base Statistics',
        expectedResult: 5.5
      }
    },

    {
      id: 'confidence-interval',
      name: 'Confidence Interval',
      description: 'Confidence interval for population mean',
      inputs: {
        dataset: [23, 25, 28, 30, 32, 35, 38, 40, 42, 45],
        confidenceLevel: 95
      },
      expectedOutputs: {
        mean: 33.8,
        lowerBound: 28.95,
        upperBound: 38.65,
        marginOfError: 4.85
      },
      tolerance: 0.01,
      category: 'accuracy',
      priority: 'high'
    },

    // Matrix operations
    {
      id: 'matrix-determinant-2x2',
      name: '2x2 Matrix Determinant',
      description: 'Determinant of 2x2 matrix',
      inputs: {
        operation: 'determinant',
        matrixARows: 2,
        matrixACols: 2,
        matrixAElements: [1, 2, 3, 4]
      },
      expectedOutputs: {
        result: '-2',
        determinant: -2
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high',
      industryBenchmark: {
        source: 'MATLAB',
        tool: 'Matrix Operations',
        expectedResult: -2
      }
    },

    {
      id: 'matrix-determinant-3x3',
      name: '3x3 Matrix Determinant',
      description: 'Determinant of 3x3 matrix',
      inputs: {
        operation: 'determinant',
        matrixARows: 3,
        matrixACols: 3,
        matrixAElements: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      expectedOutputs: {
        result: '0',
        determinant: 0
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'medium'
    },

    {
      id: 'matrix-multiplication',
      name: 'Matrix Multiplication',
      description: '2x2 matrix multiplication',
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
      },
      tolerance: 0.0001,
      category: 'accuracy',
      priority: 'high'
    },

    // Complex number operations
    {
      id: 'complex-addition',
      name: 'Complex Number Addition',
      description: 'Addition of complex numbers',
      inputs: {
        operation: 'add',
        z1Real: 3,
        z1Imaginary: 4,
        z2Real: 1,
        z2Imaginary: 2,
        inputFormat: 'rectangular'
      },
      expectedOutputs: {
        resultRectangular: '4+6i',
        modulus: 7.211,
        argument: '56.31°'
      },
      tolerance: 0.001,
      category: 'accuracy',
      priority: 'medium'
    },

    {
      id: 'complex-multiplication',
      name: 'Complex Number Multiplication',
      description: 'Multiplication of complex numbers',
      inputs: {
        operation: 'multiply',
        z1Real: 1,
        z1Imaginary: 1,
        z2Real: 1,
        z2Imaginary: -1,
        inputFormat: 'rectangular'
      },
      expectedOutputs: {
        resultRectangular: '2+0i',
        resultPolar: '2∠0°'
      },
      tolerance: 0.001,
      category: 'accuracy',
      priority: 'medium'
    },

    // Unit conversion tests
    {
      id: 'length-conversion',
      name: 'Length Unit Conversion',
      description: 'Meters to feet conversion',
      inputs: {
        category: 'length',
        fromUnit: 'meter',
        toUnit: 'foot',
        value: 100,
        precision: 4
      },
      expectedOutputs: {
        result: '328.084',
        formula: '1 meter = 3.28084 feet'
      },
      tolerance: 0.001,
      category: 'accuracy',
      priority: 'medium'
    },

    {
      id: 'temperature-conversion',
      name: 'Temperature Conversion',
      description: 'Celsius to Fahrenheit conversion',
      inputs: {
        category: 'temperature',
        fromUnit: 'celsius',
        toUnit: 'fahrenheit',
        value: 100,
        precision: 2
      },
      expectedOutputs: {
        result: '212.00',
        formula: '°F = (°C × 9/5) + 32'
      },
      tolerance: 0.01,
      category: 'accuracy',
      priority: 'medium'
    },

    // Edge cases
    {
      id: 'division-by-zero',
      name: 'Division by Zero Handling',
      description: 'Proper error handling for division by zero',
      inputs: {
        equationType: 'linear',
        coefficientA: 0,
        coefficientB: 5
      },
      expectedOutputs: {
        error: 'No solution (contradiction)',
        solutions: 'No solutions found'
      },
      tolerance: 0.0001,
      category: 'edge-case',
      priority: 'high'
    },

    // Performance tests
    {
      id: 'large-matrix-determinant',
      name: 'Large Matrix Performance',
      description: 'Performance test with 10x10 matrix',
      inputs: {
        operation: 'determinant',
        matrixARows: 10,
        matrixACols: 10,
        matrixAElements: Array.from({length: 100}, (_, i) => i + 1)
      },
      expectedOutputs: {
        executionTime: 100 // milliseconds
      },
      tolerance: 0.01,
      category: 'performance',
      priority: 'low'
    }
  ],

  setup: async () => {
    console.log('Setting up mathematics calculator tests...');
  },

  teardown: async () => {
    console.log('Cleaning up mathematics calculator tests...');
  }
};