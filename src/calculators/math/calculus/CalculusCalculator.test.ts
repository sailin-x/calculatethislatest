import { CalculusCalculator } from './CalculusCalculator';

describe('CalculusCalculator', () => {
  let calculator: CalculusCalculator;

  beforeEach(() => {
    calculator = new CalculusCalculator();
  });

  describe('calculate', () => {
    it('should calculate derivative correctly', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: 'x^2',
        variable: 'x',
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.operation).toBe('derivative');
      expect(result.function).toBe('x^2');
      expect(result.variable).toBe('x');
      expect(result.analysis).toBeDefined();
    });

    it('should calculate integral correctly', () => {
      const inputs = {
        operation: 'integral' as const,
        function: 'x^2',
        variable: 'x',
        lowerBound: 0,
        upperBound: 1,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.operation).toBe('integral');
      expect(result.bounds).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should calculate limit correctly', () => {
      const inputs = {
        operation: 'limit' as const,
        function: '1/x',
        variable: 'x',
        point: 0,
        direction: 'right' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.operation).toBe('limit');
      expect(result.point).toBe(0);
      expect(result.analysis).toBeDefined();
    });

    it('should calculate Taylor series correctly', () => {
      const inputs = {
        operation: 'taylor' as const,
        function: 'sin(x)',
        variable: 'x',
        point: 0,
        order: 5,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.operation).toBe('taylor');
      expect(result.point).toBe(0);
      expect(result.order).toBe(5);
      expect(result.analysis).toBeDefined();
    });

    it('should handle complex functions', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: 'sin(x^2) * cos(x)',
        variable: 'x',
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should handle different variables', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: 'y^3 + 2*y',
        variable: 'y',
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.variable).toBe('y');
      expect(result.analysis).toBeDefined();
    });

    it('should handle different integration methods', () => {
      const inputs = {
        operation: 'integral' as const,
        function: 'x^2',
        variable: 'x',
        lowerBound: 0,
        upperBound: 1,
        method: 'simpson' as const,
        precision: 4
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.method).toBe('simpson');
      expect(result.analysis).toBeDefined();
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: 'x^2',
        variable: 'x',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject invalid operation', () => {
      const inputs = {
        operation: 'invalid' as any,
        function: 'x^2',
        variable: 'x',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid operation specified');
    });

    it('should reject empty function', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: '',
        variable: 'x',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Function expression is required');
    });

    it('should reject invalid variable', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: 'x^2',
        variable: 'xy',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Variable must be a single letter');
    });

    it('should reject invalid precision', () => {
      const inputs = {
        operation: 'derivative' as const,
        function: 'x^2',
        variable: 'x',
        precision: -1
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Precision must be non-negative');
    });

    it('should reject integral without bounds', () => {
      const inputs = {
        operation: 'integral' as const,
        function: 'x^2',
        variable: 'x',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Integral requires both lower and upper bounds');
    });

    it('should reject invalid bounds for integral', () => {
      const inputs = {
        operation: 'integral' as const,
        function: 'x^2',
        variable: 'x',
        lowerBound: 1,
        upperBound: 0,
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Lower bound must be less than upper bound');
    });

    it('should reject limit without point', () => {
      const inputs = {
        operation: 'limit' as const,
        function: '1/x',
        variable: 'x',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Limit requires a point');
    });

    it('should reject Taylor series without point and order', () => {
      const inputs = {
        operation: 'taylor' as const,
        function: 'sin(x)',
        variable: 'x',
        precision: 4
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Taylor series requires a point');
    });
  });
});
