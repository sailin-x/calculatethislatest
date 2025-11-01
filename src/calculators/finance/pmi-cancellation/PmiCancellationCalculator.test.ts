import { PmiCancellationCalculator } from './PmiCancellationCalculator';
import { getPmiCancellationValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('PmiCancellationCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(PmiCancellationCalculator.id).toBe('PmiCancellationCalculator');
      expect(PmiCancellationCalculator.title).toBe('PMI Cancellation Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(PmiCancellationCalculator.category).toBe('finance');
      expect(PmiCancellationCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(PmiCancellationCalculator.usageInstructions).toBeDefined();
      expect(PmiCancellationCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(PmiCancellationCalculator.inputs).toBeDefined();
      expect(PmiCancellationCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(PmiCancellationCalculator.outputs).toBeDefined();
      expect(PmiCancellationCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Original Loan Amount Validation', () => {
      it('should validate original loan amount correctly', () => {
        const result = quickValidation.validateOriginalLoanAmount(300000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative original loan amount', () => {
        const result = quickValidation.validateOriginalLoanAmount(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.originalLoanAmount).toBeDefined();
      });

      it('should reject original loan amount below minimum', () => {
        const result = quickValidation.validateOriginalLoanAmount(10000);
        expect(result.isValid).toBe(false);
        expect(result.errors.originalLoanAmount).toContain('at least $25,000');
      });
    });

    describe('Current Loan Balance Validation', () => {
      it('should validate current loan balance correctly', () => {
        const result = quickValidation.validateCurrentLoanBalance(250000, { currentHomeValue: 350000 });
        expect(result.isValid).toBe(true);
      });

      it('should reject current loan balance exceeding home value', () => {
        const result = quickValidation.validateCurrentLoanBalance(400000, { currentHomeValue: 350000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.currentLoanBalance).toContain('cannot exceed home value');
      });
    });

    describe('PMI Rate Validation', () => {
      it('should validate PMI rate correctly', () => {
        const result = quickValidation.validatePmiRate(0.5);
        expect(result.isValid).toBe(true);
      });

      it('should reject PMI rate below minimum', () => {
        const result = quickValidation.validatePmiRate(0.05);
        expect(result.isValid).toBe(false);
        expect(result.errors.pmiRate).toContain('at least 0.1%');
      });

      it('should reject PMI rate above maximum', () => {
        const result = quickValidation.validatePmiRate(3);
        expect(result.isValid).toBe(false);
        expect(result.errors.pmiRate).toContain('cannot exceed 2%');
      });
    });

    describe('Years Owned Validation', () => {
      it('should validate years owned correctly', () => {
        const result = quickValidation.validateYearsOwned(3, { loanTerm: 30 });
        expect(result.isValid).toBe(true);
      });

      it('should reject years owned exceeding loan term', () => {
        const result = quickValidation.validateYearsOwned(35, { loanTerm: 30 });
        expect(result.isValid).toBe(false);
        expect(result.errors.yearsOwned).toContain('cannot exceed loan term');
      });
    });

    describe('Cancellation Type Validation', () => {
      it('should validate cancellation type correctly', () => {
        const result = quickValidation.validateCancellationType('automatic');
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid cancellation type', () => {
        const result = quickValidation.validateCancellationType('invalid');
        expect(result.isValid).toBe(false);
        expect(result.errors.cancellationType).toContain('Invalid cancellation type');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getPmiCancellationValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getPmiCancellationValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getPmiCancellationValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getPmiCancellationValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(PmiCancellationCalculator.id).toBeDefined();
      expect(PmiCancellationCalculator.title).toBeDefined();
      expect(PmiCancellationCalculator.category).toBeDefined();
      expect(PmiCancellationCalculator.description).toBeDefined();
      expect(PmiCancellationCalculator.inputs).toBeDefined();
      expect(PmiCancellationCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = PmiCancellationCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = PmiCancellationCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});