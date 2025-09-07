import { MortgageVsRentCalculator } from './MortgageVsRentCalculator';
import { getMortgageVsRentValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('MortgageVsRentCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(MortgageVsRentCalculator.id).toBe('mortgage-vs-rent-calculator');
      expect(MortgageVsRentCalculator.title).toBe('Mortgage vs. Rent Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(MortgageVsRentCalculator.category).toBe('finance');
      expect(MortgageVsRentCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(MortgageVsRentCalculator.usageInstructions).toBeDefined();
      expect(MortgageVsRentCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(MortgageVsRentCalculator.inputs).toBeDefined();
      expect(MortgageVsRentCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(MortgageVsRentCalculator.outputs).toBeDefined();
      expect(MortgageVsRentCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Home Price Validation', () => {
      it('should validate home price correctly', () => {
        const result = quickValidation.validateHomePrice(500000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative home price', () => {
        const result = quickValidation.validateHomePrice(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.homePrice).toBeDefined();
      });

      it('should reject home price below minimum', () => {
        const result = quickValidation.validateHomePrice(5000);
        expect(result.isValid).toBe(false);
        expect(result.errors.homePrice).toContain('at least $10,000');
      });

      it('should reject home price above maximum', () => {
        const result = quickValidation.validateHomePrice(20000000);
        expect(result.isValid).toBe(false);
        expect(result.errors.homePrice).toContain('cannot exceed $10,000,000');
      });
    });

    describe('Down Payment Validation', () => {
      it('should validate down payment correctly', () => {
        const result = quickValidation.validateDownPayment(100000, { homePrice: 500000 });
        expect(result.isValid).toBe(true);
      });

      it('should reject down payment exceeding home price', () => {
        const result = quickValidation.validateDownPayment(600000, { homePrice: 500000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.downPayment).toContain('cannot exceed home price');
      });
    });

    describe('Loan Term Validation', () => {
      it('should validate loan term correctly', () => {
        const result = quickValidation.validateLoanTerm(30);
        expect(result.isValid).toBe(true);
      });

      it('should reject loan term below minimum', () => {
        const result = quickValidation.validateLoanTerm(0);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanTerm).toContain('at least 1 year');
      });

      it('should reject loan term above maximum', () => {
        const result = quickValidation.validateLoanTerm(60);
        expect(result.isValid).toBe(false);
        expect(result.errors.loanTerm).toContain('cannot exceed 50 years');
      });
    });

    describe('Interest Rate Validation', () => {
      it('should validate interest rate correctly', () => {
        const result = quickValidation.validateInterestRate(7.5);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative interest rate', () => {
        const result = quickValidation.validateInterestRate(-1);
        expect(result.isValid).toBe(false);
        expect(result.errors.interestRate).toContain('must be 0% or greater');
      });

      it('should reject interest rate above maximum', () => {
        const result = quickValidation.validateInterestRate(25);
        expect(result.isValid).toBe(false);
        expect(result.errors.interestRate).toContain('cannot exceed 20%');
      });
    });

    describe('Monthly Rent Validation', () => {
      it('should validate monthly rent correctly', () => {
        const result = quickValidation.validateMonthlyRent(2500);
        expect(result.isValid).toBe(true);
      });

      it('should reject monthly rent below minimum', () => {
        const result = quickValidation.validateMonthlyRent(50);
        expect(result.isValid).toBe(false);
        expect(result.errors.monthlyRent).toContain('at least $100');
      });

      it('should reject monthly rent above maximum', () => {
        const result = quickValidation.validateMonthlyRent(60000);
        expect(result.isValid).toBe(false);
        expect(result.errors.monthlyRent).toContain('cannot exceed $50,000');
      });
    });

    describe('Optional Field Validation', () => {
      it('should allow undefined values for optional fields', () => {
        const result = quickValidation.validatePropertyTax(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should validate rent increase rate range', () => {
        const result = quickValidation.validateRentIncreaseRate(25);
        expect(result.isValid).toBe(false);
        expect(result.errors.rentIncreaseRate).toContain('cannot exceed 20%');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getMortgageVsRentValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getMortgageVsRentValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getMortgageVsRentValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(MortgageVsRentCalculator.id).toBeDefined();
      expect(MortgageVsRentCalculator.title).toBeDefined();
      expect(MortgageVsRentCalculator.category).toBeDefined();
      expect(MortgageVsRentCalculator.description).toBeDefined();
      expect(MortgageVsRentCalculator.inputs).toBeDefined();
      expect(MortgageVsRentCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = MortgageVsRentCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = MortgageVsRentCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});