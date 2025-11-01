import { MortgageRefinanceCalculator } from './MortgageRefinanceCalculator';
import { getMortgageRefinanceValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('MortgageRefinanceCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(MortgageRefinanceCalculator.id).toBe('MortgageRefinanceCalculator');
      expect(MortgageRefinanceCalculator.title).toBe('Mortgage Refinance Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(MortgageRefinanceCalculator.category).toBe('finance');
      expect(MortgageRefinanceCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(MortgageRefinanceCalculator.usageInstructions).toBeDefined();
      expect(MortgageRefinanceCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(MortgageRefinanceCalculator.inputs).toBeDefined();
      expect(MortgageRefinanceCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(MortgageRefinanceCalculator.outputs).toBeDefined();
      expect(MortgageRefinanceCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Current Loan Balance Validation', () => {
      it('should validate current loan balance correctly', () => {
        const result = quickValidation.validateCurrentLoanBalance(250000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative current loan balance', () => {
        const result = quickValidation.validateCurrentLoanBalance(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.currentLoanBalance).toBeDefined();
      });

      it('should reject current loan balance below minimum', () => {
        const result = quickValidation.validateCurrentLoanBalance(5000);
        expect(result.isValid).toBe(false);
        expect(result.errors.currentLoanBalance).toContain('at least $10,000');
      });

      it('should reject current loan balance above maximum', () => {
        const result = quickValidation.validateCurrentLoanBalance(15000000);
        expect(result.isValid).toBe(false);
        expect(result.errors.currentLoanBalance).toContain('cannot exceed $10,000,000');
      });
    });

    describe('Rate Validation', () => {
      it('should validate current rate correctly', () => {
        const result = quickValidation.validateCurrentRate(6.5);
        expect(result.isValid).toBe(true);
      });

      it('should validate new rate correctly', () => {
        const result = quickValidation.validateNewRate(5.5);
        expect(result.isValid).toBe(true);
      });

      it('should reject rate below minimum', () => {
        const result = quickValidation.validateCurrentRate(0.5);
        expect(result.isValid).toBe(false);
        expect(result.errors.currentRate).toContain('at least 1%');
      });

      it('should reject rate above maximum', () => {
        const result = quickValidation.validateNewRate(25);
        expect(result.isValid).toBe(false);
        expect(result.errors.newRate).toContain('cannot exceed 20%');
      });
    });

    describe('Term Validation', () => {
      it('should validate current term remaining correctly', () => {
        const result = quickValidation.validateCurrentTermRemaining(25);
        expect(result.isValid).toBe(true);
      });

      it('should validate new term correctly', () => {
        const result = quickValidation.validateNewTerm(30);
        expect(result.isValid).toBe(true);
      });

      it('should reject new term below minimum', () => {
        const result = quickValidation.validateNewTerm(3);
        expect(result.isValid).toBe(false);
        expect(result.errors.newTerm).toContain('at least 5 years');
      });
    });

    describe('New Loan Amount Validation', () => {
      it('should validate new loan amount correctly', () => {
        const result = quickValidation.validateNewLoanAmount(250000, { homeValue: 350000 });
        expect(result.isValid).toBe(true);
      });

      it('should reject new loan amount exceeding home value', () => {
        const result = quickValidation.validateNewLoanAmount(400000, { homeValue: 350000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.newLoanAmount).toContain('cannot exceed home value');
      });
    });

    describe('Cash Out Validation', () => {
      it('should validate cash out amount correctly', () => {
        const result = quickValidation.validateCashOut(20000, {
          homeValue: 350000,
          currentLoanBalance: 250000,
          newLoanAmount: 250000
        });
        expect(result.isValid).toBe(true);
      });

      it('should reject cash out exceeding available equity', () => {
        const result = quickValidation.validateCashOut(150000, {
          homeValue: 350000,
          currentLoanBalance: 250000,
          newLoanAmount: 250000
        });
        expect(result.isValid).toBe(false);
        expect(result.errors.cashOut).toContain('cannot exceed available equity');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getMortgageRefinanceValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getMortgageRefinanceValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getMortgageRefinanceValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getMortgageRefinanceValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(MortgageRefinanceCalculator.id).toBeDefined();
      expect(MortgageRefinanceCalculator.title).toBeDefined();
      expect(MortgageRefinanceCalculator.category).toBeDefined();
      expect(MortgageRefinanceCalculator.description).toBeDefined();
      expect(MortgageRefinanceCalculator.inputs).toBeDefined();
      expect(MortgageRefinanceCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = MortgageRefinanceCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = MortgageRefinanceCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});