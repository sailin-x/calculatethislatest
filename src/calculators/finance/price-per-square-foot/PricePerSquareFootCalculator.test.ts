import { PricePerSquareFootCalculator } from './PricePerSquareFootCalculator';
import { getPricePerSquareFootValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('PricePerSquareFootCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(PricePerSquareFootCalculator.id).toBe('PricePerSquare-foot-calculator');
      expect(PricePerSquareFootCalculator.title).toBe('Price Per Square Foot Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(PricePerSquareFootCalculator.category).toBe('finance');
      expect(PricePerSquareFootCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(PricePerSquareFootCalculator.usageInstructions).toBeDefined();
      expect(PricePerSquareFootCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(PricePerSquareFootCalculator.inputs).toBeDefined();
      expect(PricePerSquareFootCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(PricePerSquareFootCalculator.outputs).toBeDefined();
      expect(PricePerSquareFootCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Property Price Validation', () => {
      it('should validate property price correctly', () => {
        const result = quickValidation.validatePropertyPrice(500000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative property price', () => {
        const result = quickValidation.validatePropertyPrice(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.propertyPrice).toBeDefined();
      });

      it('should reject property price below minimum', () => {
        const result = quickValidation.validatePropertyPrice(5000);
        expect(result.isValid).toBe(false);
        expect(result.errors.propertyPrice).toContain('at least $10,000');
      });

      it('should reject property price above maximum', () => {
        const result = quickValidation.validatePropertyPrice(60000000);
        expect(result.isValid).toBe(false);
        expect(result.errors.propertyPrice).toContain('cannot exceed $50,000,000');
      });
    });

    describe('Square Footage Validation', () => {
      it('should validate square footage correctly', () => {
        const result = quickValidation.validateSquareFootage(2500);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative square footage', () => {
        const result = quickValidation.validateSquareFootage(-100);
        expect(result.isValid).toBe(false);
        expect(result.errors.squareFootage).toContain('greater than 0');
      });

      it('should reject square footage below minimum', () => {
        const result = quickValidation.validateSquareFootage(50);
        expect(result.isValid).toBe(false);
        expect(result.errors.squareFootage).toContain('at least 100 sq ft');
      });

      it('should reject square footage above maximum', () => {
        const result = quickValidation.validateSquareFootage(150000);
        expect(result.isValid).toBe(false);
        expect(result.errors.squareFootage).toContain('cannot exceed 100,000 sq ft');
      });
    });

    describe('Comparison Property Validation', () => {
      it('should validate comparison property price correctly', () => {
        const result = quickValidation.validateComparePrice1(450000, { compareSqft1: 2200 });
        expect(result.isValid).toBe(true);
      });

      it('should reject comparison price without square footage', () => {
        const result = quickValidation.validateComparePrice1(450000);
        expect(result.isValid).toBe(false);
        expect(result.errors.comparePrice1).toContain('Square footage is required');
      });

      it('should validate comparison square footage correctly', () => {
        const result = quickValidation.validateCompareSqft1(2200, { comparePrice1: 450000 });
        expect(result.isValid).toBe(true);
      });

      it('should reject comparison square footage without price', () => {
        const result = quickValidation.validateCompareSqft1(2200);
        expect(result.isValid).toBe(false);
        expect(result.errors.compareSqft1).toContain('Price is required');
      });
    });

    describe('Market Average Validation', () => {
      it('should validate market average correctly', () => {
        const result = quickValidation.validateMarketAverage(200);
        expect(result.isValid).toBe(true);
      });

      it('should allow undefined market average', () => {
        const result = quickValidation.validateMarketAverage(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should reject market average below minimum', () => {
        const result = quickValidation.validateMarketAverage(5);
        expect(result.isValid).toBe(false);
        expect(result.errors.marketAverage).toContain('at least $10');
      });

      it('should reject market average above maximum', () => {
        const result = quickValidation.validateMarketAverage(15000);
        expect(result.isValid).toBe(false);
        expect(result.errors.marketAverage).toContain('cannot exceed $10,000');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getPricePerSquareFootValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getPricePerSquareFootValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getPricePerSquareFootValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getPricePerSquareFootValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(PricePerSquareFootCalculator.id).toBeDefined();
      expect(PricePerSquareFootCalculator.title).toBeDefined();
      expect(PricePerSquareFootCalculator.category).toBeDefined();
      expect(PricePerSquareFootCalculator.description).toBeDefined();
      expect(PricePerSquareFootCalculator.inputs).toBeDefined();
      expect(PricePerSquareFootCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = PricePerSquareFootCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = PricePerSquareFootCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});