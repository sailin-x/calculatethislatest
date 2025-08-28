import { MatrixCalculator } from './MatrixCalculator';

describe('MatrixCalculator', () => {
  let calculator: MatrixCalculator;

  beforeEach(() => {
    calculator = new MatrixCalculator();
  });

  describe('calculate', () => {
    it('should add matrices correctly', () => {
      const inputs = {
        operation: 'add' as const,
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[5, 6], [7, 8]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toEqual([[6, 8], [10, 12]]);
      expect(result.operation).toBe('add');
      expect(result.analysis).toBeDefined();
    });

    it('should multiply matrices correctly', () => {
      const inputs = {
        operation: 'multiply' as const,
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[5, 6], [7, 8]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toEqual([[19, 22], [43, 50]]);
      expect(result.operation).toBe('multiply');
      expect(result.analysis).toBeDefined();
    });

    it('should calculate determinant correctly', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [[1, 2], [3, 4]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBe(-2);
      expect(result.operation).toBe('determinant');
      expect(result.analysis).toBeDefined();
    });

    it('should calculate transpose correctly', () => {
      const inputs = {
        operation: 'transpose' as const,
        matrixA: [[1, 2, 3], [4, 5, 6]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toEqual([[1, 4], [2, 5], [3, 6]]);
      expect(result.operation).toBe('transpose');
      expect(result.analysis).toBeDefined();
    });

    it('should calculate trace correctly', () => {
      const inputs = {
        operation: 'trace' as const,
        matrixA: [[1, 2], [3, 4]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBe(5);
      expect(result.operation).toBe('trace');
      expect(result.analysis).toBeDefined();
    });

    it('should calculate matrix power correctly', () => {
      const inputs = {
        operation: 'power' as const,
        matrixA: [[1, 1], [1, 0]],
        power: 2,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toEqual([[2, 1], [1, 1]]);
      expect(result.operation).toBe('power');
      expect(result.analysis).toBeDefined();
    });

    it('should handle identity matrix', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [[1, 0], [0, 1]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBe(1);
      expect(result.analysis.properties.isIdentity).toBe(true);
    });

    it('should handle zero matrix', () => {
      const inputs = {
        operation: 'trace' as const,
        matrixA: [[0, 0], [0, 0]],
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBe(0);
      expect(result.analysis.properties.isZero).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        operation: 'add' as const,
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[5, 6], [7, 8]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject invalid operation', () => {
      const inputs = {
        operation: 'invalid' as any,
        matrixA: [[1, 2], [3, 4]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid operation specified');
    });

    it('should reject empty matrix', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Matrix A must be a non-empty array');
    });

    it('should reject invalid matrix elements', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [[1, NaN], [3, 4]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Element at [0][1] must be a valid number');
    });

    it('should reject matrices with different row lengths', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [[1, 2], [3]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('All rows must have the same length');
    });

    it('should reject invalid precision', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [[1, 2], [3, 4]],
        precision: -1
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Precision must be non-negative');
    });

    it('should reject incompatible matrix dimensions for addition', () => {
      const inputs = {
        operation: 'add' as const,
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[1, 2, 3], [4, 5, 6]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Matrices must have the same dimensions for addition/subtraction');
    });

    it('should reject incompatible matrix dimensions for multiplication', () => {
      const inputs = {
        operation: 'multiply' as const,
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Matrix A columns must equal Matrix B rows for multiplication');
    });

    it('should reject non-square matrix for determinant', () => {
      const inputs = {
        operation: 'determinant' as const,
        matrixA: [[1, 2, 3], [4, 5, 6]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Matrix must be square for this operation');
    });

    it('should reject power operation without power value', () => {
      const inputs = {
        operation: 'power' as const,
        matrixA: [[1, 2], [3, 4]],
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Power is required for power operation');
    });
  });
});
