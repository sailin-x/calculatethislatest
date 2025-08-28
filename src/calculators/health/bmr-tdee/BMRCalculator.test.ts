import { BMRCalculator } from './BMRCalculator';

describe('BMRCalculator', () => {
  let calculator: BMRCalculator;

  beforeEach(() => {
    calculator = new BMRCalculator();
  });

  describe('calculate', () => {
    it('should calculate BMR and TDEE correctly for male', () => {
      const inputs = {
        age: 30,
        weight: 70,
        height: 175,
        gender: 'male',
        activityLevel: 'moderately_active',
        bodyFatPercentage: 15,
        leanBodyMass: 59.5,
        targetWeight: 65,
        calorieDeficit: 500,
        calorieSurplus: 300
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.bmr).toBeGreaterThan(0);
      expect(result.tdee).toBeGreaterThan(result.bmr);
      expect(result.bmi).toBeGreaterThan(0);
      expect(result.bodyFatMass).toBeGreaterThan(0);
      expect(result.leanBodyMass).toBeGreaterThan(0);
      expect(result.weightLossCalories).toBeGreaterThan(0);
      expect(result.weightGainCalories).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should calculate BMR and TDEE correctly for female', () => {
      const inputs = {
        age: 25,
        weight: 60,
        height: 165,
        gender: 'female',
        activityLevel: 'lightly_active',
        bodyFatPercentage: 25,
        leanBodyMass: 45,
        targetWeight: 55,
        calorieDeficit: 300,
        calorieSurplus: 200
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.bmr).toBeGreaterThan(0);
      expect(result.tdee).toBeGreaterThan(result.bmr);
      expect(result.bmi).toBeGreaterThan(0);
      expect(result.bodyFatMass).toBeGreaterThan(0);
      expect(result.leanBodyMass).toBeGreaterThan(0);
      expect(result.weightLossCalories).toBeGreaterThan(0);
      expect(result.weightGainCalories).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero values appropriately', () => {
      const inputs = {
        age: 0,
        weight: 0,
        height: 0,
        gender: 'male',
        activityLevel: 'sedentary',
        bodyFatPercentage: 0,
        leanBodyMass: 0,
        targetWeight: 0,
        calorieDeficit: 0,
        calorieSurplus: 0
      };

      const result = calculator.calculate(inputs);

      expect(result.bmr).toBe(0);
      expect(result.tdee).toBe(0);
      expect(result.bmi).toBe(0);
      expect(result.bodyFatMass).toBe(0);
      expect(result.leanBodyMass).toBe(0);
      expect(result.weightLossCalories).toBe(0);
      expect(result.weightGainCalories).toBe(0);
    });

    it('should handle high activity level', () => {
      const inputs = {
        age: 35,
        weight: 80,
        height: 180,
        gender: 'male',
        activityLevel: 'extremely_active',
        bodyFatPercentage: 10,
        leanBodyMass: 72,
        targetWeight: 75,
        calorieDeficit: 1000,
        calorieSurplus: 500
      };

      const result = calculator.calculate(inputs);

      expect(result.tdee).toBeGreaterThan(result.bmr * 1.5);
      expect(result.activityMultiplier).toBeGreaterThan(1.5);
      expect(result.analysis.activityLevel).toBe('extremely_active');
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        age: 30,
        weight: 70,
        height: 175,
        gender: 'male',
        activityLevel: 'moderately_active',
        bodyFatPercentage: 15,
        leanBodyMass: 59.5,
        targetWeight: 65,
        calorieDeficit: 500,
        calorieSurplus: 300
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        age: -30,
        weight: 70,
        height: 175,
        gender: 'male',
        activityLevel: 'moderately_active',
        bodyFatPercentage: 15,
        leanBodyMass: 59.5,
        targetWeight: 65,
        calorieDeficit: 500,
        calorieSurplus: 300
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Age must be non-negative');
    });

    it('should reject invalid gender', () => {
      const inputs = {
        age: 30,
        weight: 70,
        height: 175,
        gender: 'invalid',
        activityLevel: 'moderately_active',
        bodyFatPercentage: 15,
        leanBodyMass: 59.5,
        targetWeight: 65,
        calorieDeficit: 500,
        calorieSurplus: 300
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Gender must be either male or female');
    });

    it('should reject invalid activity level', () => {
      const inputs = {
        age: 30,
        weight: 70,
        height: 175,
        gender: 'male',
        activityLevel: 'invalid',
        bodyFatPercentage: 15,
        leanBodyMass: 59.5,
        targetWeight: 65,
        calorieDeficit: 500,
        calorieSurplus: 300
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Activity level must be one of: sedentary, lightly_active, moderately_active, very_active, extremely_active');
    });
  });
});
