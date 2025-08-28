import { ComplexNumberCalculator } from './ComplexNumberCalculator';

describe('ComplexNumberCalculator', () => {
  let calculator: ComplexNumberCalculator;

  beforeEach(() => {
    calculator = new ComplexNumberCalculator();
  });

  describe('calculate', () => {
    it('should add complex numbers correctly', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'add' as const,
        secondRealPart: 1,
        secondImaginaryPart: 2,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.realPart).toBe(4);
      expect(result.result.imaginaryPart).toBe(6);
      expect(result.result.magnitude).toBeGreaterThan(0);
      expect(result.result.argument).toBeDefined();
      expect(result.operation).toBe('add');
      expect(result.analysis).toBeDefined();
    });

    it('should multiply complex numbers correctly', () => {
      const inputs = {
        realPart: 1,
        imaginaryPart: 1,
        operation: 'multiply' as const,
        secondRealPart: 2,
        secondImaginaryPart: 3,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.realPart).toBe(-1);
      expect(result.result.imaginaryPart).toBe(5);
      expect(result.result.magnitude).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should calculate conjugate correctly', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'conjugate' as const,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.realPart).toBe(3);
      expect(result.result.imaginaryPart).toBe(-4);
      expect(result.result.conjugate.realPart).toBe(3);
      expect(result.result.conjugate.imaginaryPart).toBe(-4);
      expect(result.analysis).toBeDefined();
    });

    it('should calculate absolute value correctly', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'absolute' as const,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.magnitude).toBe(5);
      expect(result.analysis).toBeDefined();
    });

    it('should calculate power correctly', () => {
      const inputs = {
        realPart: 1,
        imaginaryPart: 1,
        operation: 'power' as const,
        power: 2,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.realPart).toBe(0);
      expect(result.result.imaginaryPart).toBe(2);
      expect(result.analysis).toBeDefined();
    });

    it('should handle trigonometric functions', () => {
      const inputs = {
        realPart: 0,
        imaginaryPart: 1,
        operation: 'trigonometric' as const,
        trigonometricFunction: 'sin' as const,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.realPart).toBeDefined();
      expect(result.result.imaginaryPart).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero complex number', () => {
      const inputs = {
        realPart: 0,
        imaginaryPart: 0,
        operation: 'absolute' as const,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.magnitude).toBe(0);
      expect(result.result.argument).toBe(0);
      expect(result.analysis.isZero).toBe(true);
    });

    it('should handle real numbers', () => {
      const inputs = {
        realPart: 5,
        imaginaryPart: 0,
        operation: 'conjugate' as const,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.imaginaryPart).toBe(0);
      expect(result.analysis.isReal).toBe(true);
      expect(result.analysis.isImaginary).toBe(false);
    });

    it('should handle pure imaginary numbers', () => {
      const inputs = {
        realPart: 0,
        imaginaryPart: 3,
        operation: 'absolute' as const,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result.realPart).toBe(0);
      expect(result.analysis.isReal).toBe(false);
      expect(result.analysis.isImaginary).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'add' as const,
        secondRealPart: 1,
        secondImaginaryPart: 2,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject invalid real part', () => {
      const inputs = {
        realPart: NaN,
        imaginaryPart: 4,
        operation: 'add' as const,
        secondRealPart: 1,
        secondImaginaryPart: 2,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Real part must be a valid number');
    });

    it('should reject invalid operation', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'invalid' as any,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Operation must be one of: add, subtract, multiply, divide, power, root, conjugate, absolute, argument, exponential, logarithm, trigonometric');
    });

    it('should reject division by zero', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'divide' as const,
        secondRealPart: 0,
        secondImaginaryPart: 0,
        angleUnit: 'radians' as const,
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Cannot divide by zero');
    });

    it('should reject invalid precision', () => {
      const inputs = {
        realPart: 3,
        imaginaryPart: 4,
        operation: 'absolute' as const,
        angleUnit: 'radians' as const,
        precision: -1
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Precision must be non-negative');
    });
  });
});
