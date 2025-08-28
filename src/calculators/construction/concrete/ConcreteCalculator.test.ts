import { ConcreteCalculator } from './ConcreteCalculator';

describe('ConcreteCalculator', () => {
  let calculator: ConcreteCalculator;

  beforeEach(() => {
    calculator = new ConcreteCalculator();
  });

  describe('calculate', () => {
    it('should calculate concrete requirements correctly', () => {
      const inputs = {
        length: 10,
        width: 5,
        height: 3,
        thickness: 0.2,
        concreteStrength: 25,
        reinforcementRatio: 0.02,
        load: 5000,
        safetyFactor: 1.5,
        costPerCubicMeter: 150,
        laborCost: 5000
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.volume).toBeGreaterThan(0);
      expect(result.area).toBeGreaterThan(0);
      expect(result.weight).toBeGreaterThan(0);
      expect(result.reinforcementWeight).toBeGreaterThan(0);
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.materialCost).toBeGreaterThan(0);
      expect(result.laborCost).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero dimensions', () => {
      const inputs = {
        length: 0,
        width: 0,
        height: 0,
        thickness: 0,
        concreteStrength: 25,
        reinforcementRatio: 0.02,
        load: 0,
        safetyFactor: 1.5,
        costPerCubicMeter: 150,
        laborCost: 0
      };

      const result = calculator.calculate(inputs);

      expect(result.volume).toBe(0);
      expect(result.area).toBe(0);
      expect(result.weight).toBe(0);
      expect(result.reinforcementWeight).toBe(0);
      expect(result.totalCost).toBe(0);
      expect(result.materialCost).toBe(0);
      expect(result.laborCost).toBe(0);
    });

    it('should handle high strength concrete', () => {
      const inputs = {
        length: 20,
        width: 10,
        height: 5,
        thickness: 0.3,
        concreteStrength: 50,
        reinforcementRatio: 0.03,
        load: 10000,
        safetyFactor: 2.0,
        costPerCubicMeter: 300,
        laborCost: 15000
      };

      const result = calculator.calculate(inputs);

      expect(result.concreteStrength).toBe(50);
      expect(result.reinforcementRatio).toBe(0.03);
      expect(result.safetyFactor).toBe(2.0);
      expect(result.volume).toBeGreaterThan(0);
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.analysis.isStructural).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        length: 10,
        width: 5,
        height: 3,
        thickness: 0.2,
        concreteStrength: 25,
        reinforcementRatio: 0.02,
        load: 5000,
        safetyFactor: 1.5,
        costPerCubicMeter: 150,
        laborCost: 5000
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        length: -10,
        width: 5,
        height: 3,
        thickness: 0.2,
        concreteStrength: 25,
        reinforcementRatio: 0.02,
        load: 5000,
        safetyFactor: 1.5,
        costPerCubicMeter: 150,
        laborCost: 5000
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Length must be non-negative');
    });

    it('should reject invalid safety factor', () => {
      const inputs = {
        length: 10,
        width: 5,
        height: 3,
        thickness: 0.2,
        concreteStrength: 25,
        reinforcementRatio: 0.02,
        load: 5000,
        safetyFactor: 0.5,
        costPerCubicMeter: 150,
        laborCost: 5000
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Safety factor must be at least 1');
    });

    it('should reject invalid reinforcement ratio', () => {
      const inputs = {
        length: 10,
        width: 5,
        height: 3,
        thickness: 0.2,
        concreteStrength: 25,
        reinforcementRatio: 1.5,
        load: 5000,
        safetyFactor: 1.5,
        costPerCubicMeter: 150,
        laborCost: 5000
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Reinforcement ratio cannot exceed 100%');
    });
  });
});
