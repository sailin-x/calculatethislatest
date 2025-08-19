import { describe, it, expect } from 'vitest';
import { pricePerSquareFootCalculator } from './PricePerSquareFootCalculator';
import { calculatePricePerSquareFoot, calculateYearsBetween, calculateMonthsBetween } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Price Per Square Foot Calculator', () => {
  describe('calculatePricePerSquareFoot', () => {
    it('should calculate basic price per square foot correctly', () => {
      const inputs = {
        propertyPrice: 500000,
        totalSquareFootage: 2500,
        propertyType: 'single_family' as const,
        calculationType: 'basic' as const
      };

      const result = calculatePricePerSquareFoot(inputs);

      expect(result.basicPricePerSqFt).toBe(200); // 500000 / 2500
      expect(result.adjustedPricePerSqFt).toBe(200); // Same as basic when no adjustments
      expect(result.marketComparison).toBe(0); // No market average provided
      expect(result.valueRating).toBe('Good Value');
      expect(result.featureAdjustments).toBe(0);
      expect(result.conditionAdjustment).toBe(0);
      expect(result.locationAdjustment).toBe(0);
      expect(result.totalAdjustments).toBe(0);
      expect(result.adjustedPropertyValue).toBe(500000);
      expect(result.priceRange).toBe('$450k - $550k');
    });

    it('should calculate adjusted price per square foot with features', () => {
      const inputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2200,
        propertyType: 'single_family' as const,
        condition: 'good' as const,
        location: 'suburban' as const,
        features: ['garage', 'basement', 'central_air'],
        calculationType: 'adjusted' as const
      };

      const result = calculatePricePerSquareFoot(inputs);

      expect(result.basicPricePerSqFt).toBeCloseTo(204.55, 2); // 450000 / 2200
      expect(result.featureAdjustments).toBe(45000); // 15000 + 20000 + 10000
      expect(result.conditionAdjustment).toBe(0); // Good condition = no adjustment
      expect(result.locationAdjustment).toBe(0); // Suburban = no adjustment
      expect(result.totalAdjustments).toBe(45000);
      expect(result.adjustedPropertyValue).toBe(495000);
      expect(result.adjustedPricePerSqFt).toBeCloseTo(225, 2); // 495000 / 2200
    });

    it('should calculate market comparison correctly', () => {
      const inputs = {
        propertyPrice: 850000,
        totalSquareFootage: 1800,
        propertyType: 'condo' as const,
        condition: 'excellent' as const,
        location: 'urban' as const,
        marketAverage: 450,
        features: ['granite_countertops', 'stainless_steel_appliances'],
        calculationType: 'comparison' as const
      };

      const result = calculatePricePerSquareFoot(inputs);

      expect(result.basicPricePerSqFt).toBeCloseTo(472.22, 2); // 850000 / 1800
      expect(result.featureAdjustments).toBe(18400); // (15000 + 8000) * 0.8 for condo
      expect(result.conditionAdjustment).toBe(85000); // 850000 * 0.10
      expect(result.locationAdjustment).toBe(85000); // 850000 * 0.10
      expect(result.totalAdjustments).toBe(188400);
      expect(result.adjustedPropertyValue).toBe(1038400);
      expect(result.adjustedPricePerSqFt).toBeCloseTo(576.89, 2); // 1038400 / 1800
      expect(result.marketComparison).toBeCloseTo(28.20, 2); // (576.89 - 450) / 450 * 100
      expect(result.valueRating).toBe('Premium Value');
    });

    it('should handle investment property analysis', () => {
      const inputs = {
        propertyPrice: 650000,
        totalSquareFootage: 3200,
        propertyType: 'multi_family' as const,
        condition: 'fair' as const,
        location: 'suburban' as const,
        marketAverage: 180,
        features: ['garage', 'basement'],
        adjustmentFactors: -10,
        calculationType: 'investment' as const
      };

      const result = calculatePricePerSquareFoot(inputs);

      expect(result.basicPricePerSqFt).toBeCloseTo(203.13, 2); // 650000 / 3200
      expect(result.featureAdjustments).toBe(24500); // (15000 + 20000) * 0.7 for multi-family
      expect(result.conditionAdjustment).toBe(-32500); // 650000 * -0.05
      expect(result.locationAdjustment).toBe(0); // Suburban = no adjustment
      expect(result.totalAdjustments).toBe(-73000); // 24500 - 32500 - 65000 (adjustment factors)
      expect(result.adjustedPropertyValue).toBe(577000);
      expect(result.adjustedPricePerSqFt).toBeCloseTo(180.31, 2); // 577000 / 3200
      expect(result.marketComparison).toBeCloseTo(0.17, 2); // (180.31 - 180) / 180 * 100
      expect(result.valueRating).toBe('Good Value');
    });

    it('should handle land properties correctly', () => {
      const inputs = {
        propertyPrice: 200000,
        totalSquareFootage: 5000,
        propertyType: 'land' as const,
        lotSize: 5000,
        calculationType: 'basic' as const
      };

      const result = calculatePricePerSquareFoot(inputs);

      expect(result.basicPricePerSqFt).toBe(40); // 200000 / 5000
      expect(result.featureAdjustments).toBe(0); // Land has no building features
      expect(result.conditionAdjustment).toBe(0);
      expect(result.locationAdjustment).toBe(0);
      expect(result.totalAdjustments).toBe(0);
      expect(result.adjustedPropertyValue).toBe(200000);
      expect(result.adjustedPricePerSqFt).toBe(40);
    });

    it('should handle zero square footage gracefully', () => {
      const inputs = {
        propertyPrice: 100000,
        totalSquareFootage: 0,
        propertyType: 'single_family' as const,
        calculationType: 'basic' as const
      };

      const result = calculatePricePerSquareFoot(inputs);

      expect(result.basicPricePerSqFt).toBe(Infinity); // Division by zero
      expect(result.adjustedPricePerSqFt).toBe(Infinity);
    });
  });

  describe('Additional calculation functions', () => {
    it('should calculate years between dates', () => {
      const years = calculateYearsBetween('2020-01-01', '2024-01-01');
      expect(years).toBeCloseTo(4, 1);
    });

    it('should calculate months between dates', () => {
      const months = calculateMonthsBetween('2023-01-01', '2024-06-01');
      expect(months).toBe(17);
    });
  });

  describe('validatePricePerSquareFootInputs', () => {
    it('should validate required fields', () => {
      const inputs = {};
      const errors = validatePricePerSquareFootInputs(inputs);
      expect(errors).toContain('Property Price is required');
      expect(errors).toContain('Total Square Footage is required');
      expect(errors).toContain('Property Type is required');
      expect(errors).toContain('Calculation Type is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        propertyPrice: -1000,
        totalSquareFootage: 50,
        bedrooms: -1,
        bathrooms: 25,
        yearBuilt: 1700,
        lotSize: 2000000,
        marketAverage: 5,
        comparableProperties: 60,
        adjustmentFactors: -60
      };
      const errors = validatePricePerSquareFootInputs(inputs);
      expect(errors).toContain('Property Price must be positive');
      expect(errors).toContain('Total Square Footage must be between 100 and 50,000 sq ft');
      expect(errors).toContain('Bedrooms cannot be negative');
      expect(errors).toContain('Bathrooms must be between 0 and 20');
      expect(errors).toContain('Year Built must be between 1800 and 2030');
      expect(errors).toContain('Lot Size must be between 0 and 1,000,000 sq ft');
      expect(errors).toContain('Market Average must be between $10 and $2,000 per sq ft');
      expect(errors).toContain('Comparable Properties must be between 0 and 50');
      expect(errors).toContain('Adjustment Factors must be between -50% and 100%');
    });

    it('should validate business logic', () => {
      const inputs = {
        propertyPrice: 5000,
        totalSquareFootage: 1000,
        propertyType: 'single_family' as const,
        calculationType: 'basic' as const
      };
      const errors = validatePricePerSquareFootInputs(inputs);
      expect(errors).toContain('Price per square foot seems unusually low. Please verify the property price and square footage');
    });

    it('should validate property type specific rules', () => {
      const inputs = {
        propertyPrice: 500000,
        totalSquareFootage: 2500,
        propertyType: 'land' as const,
        bedrooms: 3,
        bathrooms: 2,
        calculationType: 'basic' as const
      };
      const errors = validatePricePerSquareFootInputs(inputs);
      expect(errors).toContain('Land properties should not have bedrooms');
      expect(errors).toContain('Land properties should not have bathrooms');
    });

    it('should validate market comparison', () => {
      const inputs = {
        propertyPrice: 1000000,
        totalSquareFootage: 1000,
        propertyType: 'single_family' as const,
        marketAverage: 200,
        calculationType: 'basic' as const
      };
      const errors = validatePricePerSquareFootInputs(inputs);
      expect(errors).toContain('Price per square foot differs significantly from market average. Please verify the data');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        propertyPrice: 500000,
        totalSquareFootage: 2500,
        propertyType: 'single_family' as const,
        bedrooms: 3,
        bathrooms: 2.5,
        yearBuilt: 2000,
        condition: 'good' as const,
        location: 'suburban' as const,
        calculationType: 'basic' as const
      };

      const errors = validatePricePerSquareFootInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        propertyPrice: 500000,
        totalSquareFootage: 2500,
        propertyType: 'single_family' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(17); // All input fields
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        propertyPrice: -1000, // Invalid
        totalSquareFootage: 2500,
        propertyType: 'single_family' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      const propertyPriceResult = results[0];
      expect(propertyPriceResult.isValid).toBe(false);
      expect(propertyPriceResult.message).toContain('must be positive');
    });

    it('should validate price per square foot calculation', () => {
      const inputs = {
        propertyPrice: 500000,
        totalSquareFootage: 2500,
        propertyType: 'single_family' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      const pricePerSqFtResult = results[15]; // Price per sq ft calculation
      expect(pricePerSqFtResult.isValid).toBe(true);
      expect(pricePerSqFtResult.message).toContain('Price per sq ft: $200.00');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(pricePerSquareFootCalculator.id).toBe('price-per-square-foot');
      expect(pricePerSquareFootCalculator.title).toBe('Price Per Square Foot Calculator');
      expect(pricePerSquareFootCalculator.category).toBe('finance');
      expect(pricePerSquareFootCalculator.subcategory).toBe('real-estate');
      expect(pricePerSquareFootCalculator.inputs).toHaveLength(15);
      expect(pricePerSquareFootCalculator.outputs).toHaveLength(12);
      expect(pricePerSquareFootCalculator.formulas).toHaveLength(1);
      expect(pricePerSquareFootCalculator.validationRules).toBeDefined();
      expect(pricePerSquareFootCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = pricePerSquareFootCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(4); // propertyPrice, totalSquareFootage, propertyType, calculationType
    });

    it('should have correct output structure', () => {
      const outputs = pricePerSquareFootCalculator.outputs;
      expect(outputs.find(o => o.id === 'basicPricePerSqFt')).toBeDefined();
      expect(outputs.find(o => o.id === 'adjustedPricePerSqFt')).toBeDefined();
      expect(outputs.find(o => o.id === 'marketComparison')).toBeDefined();
      expect(outputs.find(o => o.id === 'valueRating')).toBeDefined();
      expect(outputs.find(o => o.id === 'featureAdjustments')).toBeDefined();
      expect(outputs.find(o => o.id === 'conditionAdjustment')).toBeDefined();
      expect(outputs.find(o => o.id === 'locationAdjustment')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalAdjustments')).toBeDefined();
      expect(outputs.find(o => o.id === 'adjustedPropertyValue')).toBeDefined();
      expect(outputs.find(o => o.id === 'priceRange')).toBeDefined();
      expect(outputs.find(o => o.id === 'investmentMetrics')).toBeDefined();
      expect(outputs.find(o => o.id === 'recommendations')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = pricePerSquareFootCalculator.examples[0];
      const result = calculatePricePerSquareFoot(example.inputs);

      expect(result.basicPricePerSqFt).toBeGreaterThan(0);
      expect(result.adjustedPricePerSqFt).toBeGreaterThan(0);
      expect(result.marketComparison).toBeGreaterThanOrEqual(-100);
      expect(result.valueRating).toBeDefined();
      expect(result.featureAdjustments).toBeGreaterThanOrEqual(0);
      expect(result.conditionAdjustment).toBeGreaterThanOrEqual(-100000);
      expect(result.locationAdjustment).toBeGreaterThanOrEqual(-100000);
      expect(result.totalAdjustments).toBeGreaterThanOrEqual(-100000);
      expect(result.adjustedPropertyValue).toBeGreaterThan(0);
      expect(result.priceRange).toBeDefined();
      expect(result.investmentMetrics).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should validate calculator examples', () => {
      pricePerSquareFootCalculator.examples.forEach(example => {
        const errors = validatePricePerSquareFootInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      pricePerSquareFootCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});