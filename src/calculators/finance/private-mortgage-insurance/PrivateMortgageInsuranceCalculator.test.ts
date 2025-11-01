import { PrivateMortgageInsuranceCalculator } from './PrivateMortgageInsuranceCalculator';
import { getPrivateMortgageInsuranceValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('PrivateMortgageInsuranceCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(PrivateMortgageInsuranceCalculator.id).toBe('PrivateMortgageInsurance-calculator');
      expect(PrivateMortgageInsuranceCalculator.title).toBe('Private Mortgage Insurance Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(PrivateMortgageInsuranceCalculator.category).toBe('finance');
      expect(PrivateMortgageInsuranceCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(PrivateMortgageInsuranceCalculator.usageInstructions).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(PrivateMortgageInsuranceCalculator.inputs).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(PrivateMortgageInsuranceCalculator.outputs).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.outputs.length).toBeGreaterThan(0);
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

      it('should reject loan amount exceeding home value', () => {
        const result = quickValidation.validateLoanAmount(400000, { homeValue: 350000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.loanAmount).toContain('cannot exceed home value');
      });
    });

    describe('Down Payment Validation', () => {
      it('should validate down payment correctly', () => {
        const result = quickValidation.validateDownPayment(30000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative down payment', () => {
        const result = quickValidation.validateDownPayment(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.downPayment).toBeDefined();
      });

      it('should reject down payment exceeding home value', () => {
        const result = quickValidation.validateDownPayment(400000, { homeValue: 350000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.downPayment).toContain('cannot exceed home value');
      });
    });

    describe('PMI Rate Validation', () => {
      it('should validate PMI rate correctly', () => {
        const result = quickValidation.validatePmiRate(0.55);
        expect(result.isValid).toBe(true);
      });

      it('should reject PMI rate below minimum', () => {
        const result = quickValidation.validatePmiRate(0.05);
        expect(result.isValid).toBe(false);
        expect(result.errors.pmiRate).toContain('at least 0.1%');
      });

      it('should reject PMI rate above maximum', () => {
        const result = quickValidation.validatePmiRate(3.0);
        expect(result.isValid).toBe(false);
        expect(result.errors.pmiRate).toContain('cannot exceed 2.0%');
      });
    });

    describe('Loan Term Validation', () => {
      it('should validate loan term correctly', () => {
        const result = quickValidation.validateLoanTerm(30);
        expect(result.isValid).toBe(true);
      });

      it('should reject loan term below minimum', () => {
        const result = quickValidation.validateLoanTerm(3);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanTerm).toContain('at least 5 years');
      });

      it('should reject loan term above maximum', () => {
        const result = quickValidation.validateLoanTerm(60);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanTerm).toContain('cannot exceed 50 years');
      });
    });

    describe('Current Loan Balance Validation', () => {
      it('should validate current loan balance correctly', () => {
        const result = quickValidation.validateCurrentLoanBalance(295000, { loanAmount: 300000 });
        expect(result.isValid).toBe(true);
      });

      it('should allow undefined current loan balance', () => {
        const result = quickValidation.validateCurrentLoanBalance(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should reject current balance exceeding original loan amount', () => {
        const result = quickValidation.validateCurrentLoanBalance(350000, { loanAmount: 300000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.currentLoanBalance).toContain('cannot exceed original loan amount');
      });
    });

    describe('Years Owned Validation', () => {
      it('should validate years owned correctly', () => {
        const result = quickValidation.validateYearsOwned(3, { loanTerm: 30 });
        expect(result.isValid).toBe(true);
      });

      it('should allow undefined years owned', () => {
        const result = quickValidation.validateYearsOwned(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should reject years owned exceeding loan term', () => {
        const result = quickValidation.validateYearsOwned(35, { loanTerm: 30 });
        expect(result.isValid).toBe(false);
        expect(result.errors.yearsOwned).toContain('cannot exceed loan term');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getPrivateMortgageInsuranceValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getPrivateMortgageInsuranceValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getPrivateMortgageInsuranceValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should include business rule validations', () => {
      const rules = getPrivateMortgageInsuranceValidationRules();
      const businessRules = rules.filter(rule => rule.type === 'business');
      expect(businessRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(PrivateMortgageInsuranceCalculator.id).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.title).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.category).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.description).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.inputs).toBeDefined();
      expect(PrivateMortgageInsuranceCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = PrivateMortgageInsuranceCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = PrivateMortgageInsuranceCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});