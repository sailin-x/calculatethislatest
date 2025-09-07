import { NetOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';
import { getNetOperatingIncomeValidationRules } from './validation';
import * as quickValidation from './quickValidation';

describe('NetOperatingIncomeCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct id and title', () => {
      expect(NetOperatingIncomeCalculator.id).toBe('net-operating-income-calculator');
      expect(NetOperatingIncomeCalculator.title).toBe('Net Operating Income (NOI) Calculator');
    });

    it('should have correct category and subcategory', () => {
      expect(NetOperatingIncomeCalculator.category).toBe('finance');
      expect(NetOperatingIncomeCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have usage instructions', () => {
      expect(NetOperatingIncomeCalculator.usageInstructions).toBeDefined();
      expect(NetOperatingIncomeCalculator.usageInstructions.length).toBeGreaterThan(0);
    });

    it('should have inputs defined', () => {
      expect(NetOperatingIncomeCalculator.inputs).toBeDefined();
      expect(NetOperatingIncomeCalculator.inputs.length).toBeGreaterThan(0);
    });

    it('should have outputs defined', () => {
      expect(NetOperatingIncomeCalculator.outputs).toBeDefined();
      expect(NetOperatingIncomeCalculator.outputs.length).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    describe('Gross Rental Income Validation', () => {
      it('should validate gross rental income correctly', () => {
        const result = quickValidation.validateGrossRentalIncome(50000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative gross rental income', () => {
        const result = quickValidation.validateGrossRentalIncome(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.grossRentalIncome).toBeDefined();
      });

      it('should reject gross rental income below minimum', () => {
        const result = quickValidation.validateGrossRentalIncome(500);
        expect(result.isValid).toBe(false);
        expect(result.errors.grossRentalIncome).toContain('at least $1,000');
      });

      it('should reject gross rental income above maximum', () => {
        const result = quickValidation.validateGrossRentalIncome(20000000);
        expect(result.isValid).toBe(false);
        expect(result.errors.grossRentalIncome).toContain('cannot exceed $10,000,000');
      });
    });

    describe('Other Income Validation', () => {
      it('should validate other income correctly', () => {
        const result = quickValidation.validateOtherIncome(5000);
        expect(result.isValid).toBe(true);
      });

      it('should allow undefined other income', () => {
        const result = quickValidation.validateOtherIncome(undefined);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative other income', () => {
        const result = quickValidation.validateOtherIncome(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.otherIncome).toContain('cannot be negative');
      });
    });

    describe('Property Management Validation', () => {
      it('should validate property management percentage correctly', () => {
        const result = quickValidation.validatePropertyManagement(8.5);
        expect(result.isValid).toBe(true);
      });

      it('should reject property management above maximum', () => {
        const result = quickValidation.validatePropertyManagement(25);
        expect(result.isValid).toBe(false);
        expect(result.errors.propertyManagement).toContain('cannot exceed 20%');
      });

      it('should reject both percentage and fixed management fees', () => {
        const result = quickValidation.validatePropertyManagement(8, { propertyManagementFixed: 5000 });
        expect(result.isValid).toBe(false);
        expect(result.errors.propertyManagement).toContain('Cannot specify both');
      });
    });

    describe('Operating Expense Validation', () => {
      it('should validate maintenance expenses correctly', () => {
        const result = quickValidation.validateMaintenance(5000);
        expect(result.isValid).toBe(true);
      });

      it('should validate utilities correctly', () => {
        const result = quickValidation.validateUtilities(3000);
        expect(result.isValid).toBe(true);
      });

      it('should validate insurance correctly', () => {
        const result = quickValidation.validateInsurance(2000);
        expect(result.isValid).toBe(true);
      });

      it('should validate property taxes correctly', () => {
        const result = quickValidation.validatePropertyTaxes(8000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative operating expenses', () => {
        const result = quickValidation.validateMaintenance(-1000);
        expect(result.isValid).toBe(false);
        expect(result.errors.maintenance).toContain('cannot be negative');
      });
    });
  });

  describe('Validation Rules', () => {
    it('should have validation rules defined', () => {
      const rules = getNetOperatingIncomeValidationRules();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include required field validations', () => {
      const rules = getNetOperatingIncomeValidationRules();
      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBeGreaterThan(0);
    });

    it('should include range validations', () => {
      const rules = getNetOperatingIncomeValidationRules();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Structure', () => {
    it('should have all required calculator properties', () => {
      expect(NetOperatingIncomeCalculator.id).toBeDefined();
      expect(NetOperatingIncomeCalculator.title).toBeDefined();
      expect(NetOperatingIncomeCalculator.category).toBeDefined();
      expect(NetOperatingIncomeCalculator.description).toBeDefined();
      expect(NetOperatingIncomeCalculator.inputs).toBeDefined();
      expect(NetOperatingIncomeCalculator.outputs).toBeDefined();
    });

    it('should have proper input structure', () => {
      const inputs = NetOperatingIncomeCalculator.inputs;
      inputs.forEach(input => {
        expect(input.id).toBeDefined();
        expect(input.label).toBeDefined();
        expect(input.type).toBeDefined();
      });
    });

    it('should have proper output structure', () => {
      const outputs = NetOperatingIncomeCalculator.outputs;
      outputs.forEach(output => {
        expect(output.id).toBeDefined();
        expect(output.label).toBeDefined();
        expect(output.type).toBeDefined();
      });
    });
  });
});