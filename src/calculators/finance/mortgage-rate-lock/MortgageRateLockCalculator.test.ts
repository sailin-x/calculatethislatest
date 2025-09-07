import { MortgageRateLockCalculator } from './MortgageRateLockCalculator';
import { getMortgageRateLockValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('MortgageRateLockCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(MortgageRateLockCalculator.id).toBe('mortgage-rate-lock-calculator');
      expect(MortgageRateLockCalculator.title).toBe('Mortgage Rate Lock Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(MortgageRateLockCalculator.category).toBe('finance');
      expect(MortgageRateLockCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(MortgageRateLockCalculator.usageInstructions).toBeDefined();
      expect(MortgageRateLockCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(MortgageRateLockCalculator.inputs).toBeDefined();
      expect(MortgageRateLockCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(MortgageRateLockCalculator.outputs).toBeDefined();
      expect(MortgageRateLockCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Loan Amount Validation', () => {
      it('should validate loan amount correctly', () => {
        const result = quickValidation.validateLoanAmount(300000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative loan amount', () => {
        const result = quickValidation.validateLoanAmount(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanAmount).toBeDefined();
      });

      it('should reject loan amount below minimum', () => {
        const result = quickValidation.validateLoanAmount(10000);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanAmount).toContain('at least $25,000');
      });

      it('should reject loan amount above maximum', () => {
        const result = quickValidation.validateLoanAmount(15000000);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanAmount).toContain('cannot exceed $10,000,000');
      });
    });

    describe('Rate Validation', () => {
      it('should validate current rate correctly', () => {
        const result = quickValidation.validateCurrentRate(6.5);
        expect(result.isValid).toBe(true);
      });

      it('should validate market rate correctly', () => {
        const result = quickValidation.validateMarketRate(6.25);
        expect(result.isValid).toBe(true);
      });

      it('should reject rate below minimum', () => {
        const result = quickValidation.validateCurrentRate(0.5);
        expect(result.isValid).toBe(false);
        expect(result.errors.currentRate).toContain('at least 1%');
      });

      it('should reject rate above maximum', () => {
        const result = quickValidation.validateMarketRate(25);
        expect(result.isValid).toBe(false);
        expect(result.errors.marketRate).toContain('cannot exceed 20%');
      });
    });

    describe('Lock Period Validation', () => {
      it('should validate lock period correctly', () => {
        const result = quickValidation.validateLockPeriod(60);
        expect(result.isValid).toBe(true);
      });

      it('should reject lock period below minimum', () => {
        const result = quickValidation.validateLockPeriod(0);
        expect(result.isValid).toBe(false);
        expect(result.errors.lockPeriod).toContain('at least 1 day');
      });

      it('should reject lock period above maximum', () => {
        const result = quickValidation.validateLockPeriod(200);
        expect(result.isValid).toBe(false);
        expect(result.errors.lockPeriod).toContain('cannot exceed 180 days');
      });
    });

    describe('Closing Days Validation', () => {
      it('should validate closing days correctly', () => {
        const result = quickValidation.validateClosingDays(45, { lockPeriod: 60 });
        expect(result.isValid).toBe(true);
      });

      it('should reject closing days exceeding lock period', () => {
        const result = quickValidation.validateClosingDays(70, { lockPeriod: 60 });
        expect(result.isValid).toBe(false);
        expect(result.errors.closingDays).toContain('cannot exceed lock period');
      });
    });

    describe('Lock Cost Validation', () => {
      it('should validate lock cost correctly', () => {
        const result = quickValidation.validateLockCost(1500);
        expect(result.isValid).toBe(true);
      });

      it('should allow undefined lock cost', () => {
        const result = quickValidation.validateLockCost(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative lock cost', () => {
        const result = quickValidation.validateLockCost(-100);
        expect(result.isValid).toBe(false);
        expect(result.errors.lockCost).toContain('cannot be negative');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getMortgageRateLockValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getMortgageRateLockValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getMortgageRateLockValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getMortgageRateLockValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(MortgageRateLockCalculator.id).toBeDefined();
      expect(MortgageRateLockCalculator.title).toBeDefined();
      expect(MortgageRateLockCalculator.category).toBeDefined();
      expect(MortgageRateLockCalculator.description).toBeDefined();
      expect(MortgageRateLockCalculator.inputs).toBeDefined();
      expect(MortgageRateLockCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = MortgageRateLockCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = MortgageRateLockCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});