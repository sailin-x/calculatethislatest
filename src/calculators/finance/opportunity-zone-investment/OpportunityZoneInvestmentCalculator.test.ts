import { OpportunityZoneInvestmentCalculator } from './OpportunityZoneInvestmentCalculator';
import { getOpportunityZoneInvestmentValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('OpportunityZoneInvestmentCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(OpportunityZoneInvestmentCalculator.id).toBe('OpportunityZoneInvestment-calculator');
      expect(OpportunityZoneInvestmentCalculator.title).toBe('Opportunity Zone Investment ROI Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(OpportunityZoneInvestmentCalculator.category).toBe('finance');
      expect(OpportunityZoneInvestmentCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(OpportunityZoneInvestmentCalculator.usageInstructions).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(OpportunityZoneInvestmentCalculator.inputs).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(OpportunityZoneInvestmentCalculator.outputs).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Initial Investment Validation', () => {
      it('should validate initial investment correctly', () => {
        const result = quickValidation.validateInitialInvestment(100000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative initial investment', () => {
        const result = quickValidation.validateInitialInvestment(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.initialInvestment).toBeDefined();
      });

      it('should reject initial investment below minimum', () => {
        const result = quickValidation.validateInitialInvestment(500);
        expect(result.isValid).toBe(false);
        expect(result.errors.initialInvestment).toContain('at least $1,000');
      });

      it('should reject initial investment above maximum', () => {
        const result = quickValidation.validateInitialInvestment(20000000);
        expect(result.isValid).toBe(false);
        expect(result.errors.initialInvestment).toContain('cannot exceed $10,000,000');
      });
    });

    describe('Holding Period Validation', () => {
      it('should validate holding period correctly', () => {
        const result = quickValidation.validateHoldingPeriod(7);
        expect(result.isValid).toBe(true);
      });

      it('should reject holding period below minimum for benefits', () => {
        const result = quickValidation.validateHoldingPeriod(3);
        expect(result.isValid).toBe(false);
        expect(result.errors.holdingPeriod).toContain('at least 5 years');
      });

      it('should reject holding period below minimum for full benefits', () => {
        const result = quickValidation.validateHoldingPeriod(6);
        expect(result.isValid).toBe(false);
        expect(result.errors.holdingPeriod).toContain('at least 7 years');
      });

      it('should reject holding period above maximum', () => {
        const result = quickValidation.validateHoldingPeriod(15);
        expect(result.isValid).toBe(false);
        expect(result.errors.holdingPeriod).toContain('cannot exceed 10 years');
      });
    });

    describe('Optional Field Validation', () => {
      it('should allow undefined values for optional fields', () => {
        const result = quickValidation.validateAppreciationRate(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should validate appreciation rate range', () => {
        const result = quickValidation.validateAppreciationRate(35);
        expect(result.isValid).toBe(false);
        expect(result.errors.appreciationRate).toContain('cannot exceed 30%');
      });

      it('should validate rental yield range', () => {
        const result = quickValidation.validateRentalYield(25);
        expect(result.isValid).toBe(false);
        expect(result.errors.rentalYield).toContain('cannot exceed 20%');
      });

      it('should validate leverage ratio range', () => {
        const result = quickValidation.validateLeverageRatio(95);
        expect(result.isValid).toBe(false);
        expect(result.errors.leverageRatio).toContain('cannot exceed 90%');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getOpportunityZoneInvestmentValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getOpportunityZoneInvestmentValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getOpportunityZoneInvestmentValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getOpportunityZoneInvestmentValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(OpportunityZoneInvestmentCalculator.id).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.title).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.category).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.description).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.inputs).toBeDefined();
      expect(OpportunityZoneInvestmentCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = OpportunityZoneInvestmentCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = OpportunityZoneInvestmentCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});