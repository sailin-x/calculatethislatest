import { PropertyTaxCalculator } from './PropertyTaxCalculator';
import { getPropertyTaxValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('PropertyTaxCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(PropertyTaxCalculator.id).toBe('PropertyTaxCalculator');
      expect(PropertyTaxCalculator.title).toBe('Property Tax Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(PropertyTaxCalculator.category).toBe('finance');
      expect(PropertyTaxCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(PropertyTaxCalculator.usageInstructions).toBeDefined();
      expect(PropertyTaxCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(PropertyTaxCalculator.inputs).toBeDefined();
      expect(PropertyTaxCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(PropertyTaxCalculator.outputs).toBeDefined();
      expect(PropertyTaxCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Assessed Value Validation', () => {
      it('should validate assessed value correctly', () => {
        const result = quickValidation.validateAssessedValue(300000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative assessed value', () => {
        const result = quickValidation.validateAssessedValue(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.assessedValue).toBeDefined();
      });

      it('should reject assessed value below minimum', () => {
        const result = quickValidation.validateAssessedValue(5000);
        expect(result.isValid).toBe(false);
        expect(result.errors.assessedValue).toContain('at least $10,000');
      });
    });

    describe('Market Value Validation', () => {
      it('should validate market value correctly', () => {
        const result = quickValidation.validateMarketValue(350000, { assessedValue: 300000 });
        expect(result.isValid).toBe(true);
      });

      it('should allow undefined market value', () => {
        const result = quickValidation.validateMarketValue(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should reject market value below 50% of assessed value', () => {
        const result = quickValidation.validateMarketValue(100000, { assessedValue: 300000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.marketValue).toContain('50% of assessed value');
      });
    });

    describe('Tax Rate Validation', () => {
      it('should validate tax rate correctly', () => {
        const result = quickValidation.validateTaxRate(1.2);
        expect(result.isValid).toBe(true);
      });

      it('should reject tax rate below minimum', () => {
        const result = quickValidation.validateTaxRate(0.05);
        expect(result.isValid).toBe(false);
        expect(result.errors.taxRate).toContain('at least 0.1%');
      });

      it('should reject tax rate above maximum', () => {
        const result = quickValidation.validateTaxRate(6);
        expect(result.isValid).toBe(false);
        expect(result.errors.taxRate).toContain('cannot exceed 5%');
      });
    });

    describe('Exemption Validation', () => {
      it('should validate homestead exemption correctly', () => {
        const result = quickValidation.validateHomesteadExemption(25000, { assessedValue: 300000 });
        expect(result.isValid).toBe(true);
      });

      it('should reject homestead exemption exceeding assessed value', () => {
        const result = quickValidation.validateHomesteadExemption(400000, { assessedValue: 300000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.homesteadExemption).toContain('cannot exceed assessed value');
      });

      it('should validate senior exemption correctly', () => {
        const result = quickValidation.validateSeniorExemption(5000, { assessedValue: 300000, homesteadExemption: 25000 });
        expect(result.isValid).toBe(true);
      });
    });

    describe('Payment Frequency Validation', () => {
      it('should validate payment frequency correctly', () => {
        const result = quickValidation.validatePaymentFrequency('annual');
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid payment frequency', () => {
        const result = quickValidation.validatePaymentFrequency('invalid');
        expect(result.isValid).toBe(false);
        expect(result.errors.paymentFrequency).toContain('Invalid payment frequency');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getPropertyTaxValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getPropertyTaxValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getPropertyTaxValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getPropertyTaxValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(PropertyTaxCalculator.id).toBeDefined();
      expect(PropertyTaxCalculator.title).toBeDefined();
      expect(PropertyTaxCalculator.category).toBeDefined();
      expect(PropertyTaxCalculator.description).toBeDefined();
      expect(PropertyTaxCalculator.inputs).toBeDefined();
      expect(PropertyTaxCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = PropertyTaxCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = PropertyTaxCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});