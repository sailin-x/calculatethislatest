import { PropertyTaxProrationCalculator } from './PropertyTaxProrationCalculator';
import { getPropertyTaxProrationValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('PropertyTaxProrationCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(PropertyTaxProrationCalculator.id).toBe('property-tax-proration-calculator');
      expect(PropertyTaxProrationCalculator.title).toBe('Property Tax Proration Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(PropertyTaxProrationCalculator.category).toBe('finance');
      expect(PropertyTaxProrationCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(PropertyTaxProrationCalculator.usageInstructions).toBeDefined();
      expect(PropertyTaxProrationCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(PropertyTaxProrationCalculator.inputs).toBeDefined();
      expect(PropertyTaxProrationCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(PropertyTaxProrationCalculator.outputs).toBeDefined();
      expect(PropertyTaxProrationCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Annual Property Tax Validation', () => {
      it('should validate annual property tax correctly', () => {
        const result = quickValidation.validateAnnualPropertyTax(5000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative annual property tax', () => {
        const result = quickValidation.validateAnnualPropertyTax(-100);
        expect(result.isValid).toBe(false);
        expect(result.errors.annualPropertyTax).toContain('greater than $0');
      });

      it('should reject annual property tax below minimum', () => {
        const result = quickValidation.validateAnnualPropertyTax(50);
        expect(result.isValid).toBe(false);
        expect(result.errors.annualPropertyTax).toContain('at least $100');
      });
    });

    describe('Date Validation', () => {
      it('should validate tax year start date correctly', () => {
        const result = quickValidation.validateTaxYearStart('2024-01-01', { taxYearEnd: '2024-12-31' });
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid date format', () => {
        const result = quickValidation.validateTaxYearStart('invalid-date');
        expect(result.isValid).toBe(false);
        expect(result.errors.taxYearStart).toContain('Invalid date format');
      });

      it('should reject start date after end date', () => {
        const result = quickValidation.validateTaxYearStart('2024-12-31', { taxYearEnd: '2024-01-01' });
        expect(result.isValid).toBe(false);
        expect(result.errors.taxYearStart).toContain('before end date');
      });
    });

    describe('Closing Date Validation', () => {
      it('should validate closing date within tax year', () => {
        const result = quickValidation.validateClosingDate('2024-06-15', {
          taxYearStart: '2024-01-01',
          taxYearEnd: '2024-12-31'
        });
        expect(result.isValid).toBe(true);
      });

      it('should reject closing date outside tax year', () => {
        const result = quickValidation.validateClosingDate('2025-01-01', {
          taxYearStart: '2024-01-01',
          taxYearEnd: '2024-12-31'
        });
        expect(result.isValid).toBe(false);
        expect(result.errors.closingDate).toContain('within the tax year period');
      });
    });

    describe('Proration Method Validation', () => {
      it('should validate proration method correctly', () => {
        const result = quickValidation.validateProrationMethod('365-day');
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid proration method', () => {
        const result = quickValidation.validateProrationMethod('invalid-method');
        expect(result.isValid).toBe(false);
        expect(result.errors.prorationMethod).toContain('Invalid proration method');
      });
    });

    describe('Interest Amount Validation', () => {
      it('should validate interest amount correctly', () => {
        const result = quickValidation.validateInterestAmount(100, { annualPropertyTax: 5000 });
        expect(result.isValid).toBe(true);
      });

      it('should reject interest amount exceeding 10% of annual tax', () => {
        const result = quickValidation.validateInterestAmount(600, { annualPropertyTax: 5000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.interestAmount).toContain('10% of annual property tax');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getPropertyTaxProrationValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getPropertyTaxProrationValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getPropertyTaxProrationValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(PropertyTaxProrationCalculator.id).toBeDefined();
      expect(PropertyTaxProrationCalculator.title).toBeDefined();
      expect(PropertyTaxProrationCalculator.category).toBeDefined();
      expect(PropertyTaxProrationCalculator.description).toBeDefined();
      expect(PropertyTaxProrationCalculator.inputs).toBeDefined();
      expect(PropertyTaxProrationCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = PropertyTaxProrationCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = PropertyTaxProrationCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});