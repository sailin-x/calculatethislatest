import { describe, it, expect } from 'vitest';
import { privateMortgageInsuranceCalculator } from './PrivateMortgageInsuranceCalculator';
import { privateMortgageInsuranceFormulas } from './formulas';
import { privateMortgageInsuranceValidationRules } from './validation';

describe('Private Mortgage Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have the correct basic properties', () => {
      expect(privateMortgageInsuranceCalculator.id).toBe('private-mortgage-insurance');
      expect(privateMortgageInsuranceCalculator.title).toBe('Private Mortgage Insurance Calculator');
      expect(privateMortgageInsuranceCalculator.category).toBe('finance');
      expect(privateMortgageInsuranceCalculator.subcategory).toBe('mortgage');
    });

    it('should have the correct number of inputs', () => {
      expect(privateMortgageInsuranceCalculator.inputs).toHaveLength(12);
    });

    it('should have the correct number of outputs', () => {
      expect(privateMortgageInsuranceCalculator.outputs).toHaveLength(12);
    });

    it('should have the correct number of formulas', () => {
      expect(privateMortgageInsuranceCalculator.formulas).toHaveLength(1);
    });

    it('should have the correct number of validation rules', () => {
      expect(privateMortgageInsuranceCalculator.validationRules).toHaveLength(18);
    });

    it('should have examples', () => {
      expect(privateMortgageInsuranceCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    describe('Required validations', () => {
      it('should validate required loan amount', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
        expect(rule).toBeDefined();
        expect(rule!.validator('', {})).toBe(false);
        expect(rule!.validator(undefined, {})).toBe(false);
        expect(rule!.validator(null, {})).toBe(false);
        expect(rule!.validator(300000, {})).toBe(true);
      });

      it('should validate required home value', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'homeValue' && r.type === 'required');
        expect(rule).toBeDefined();
        expect(rule!.validator('', {})).toBe(false);
        expect(rule!.validator(undefined, {})).toBe(false);
        expect(rule!.validator(null, {})).toBe(false);
        expect(rule!.validator(375000, {})).toBe(true);
      });

      it('should validate required down payment', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'downPayment' && r.type === 'required');
        expect(rule).toBeDefined();
        expect(rule!.validator('', {})).toBe(false);
        expect(rule!.validator(undefined, {})).toBe(false);
        expect(rule!.validator(null, {})).toBe(false);
        expect(rule!.validator(75000, {})).toBe(true);
      });
    });

    describe('Range validations', () => {
      it('should validate loan amount range', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanAmount' && r.type === 'range');
        expect(rule).toBeDefined();
        expect(rule!.validator(5000, {})).toBe(false); // Too low
        expect(rule!.validator(300000, {})).toBe(true); // Valid
        expect(rule!.validator(15000000, {})).toBe(false); // Too high
      });

      it('should validate home value range', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'homeValue' && r.type === 'range');
        expect(rule).toBeDefined();
        expect(rule!.validator(5000, {})).toBe(false); // Too low
        expect(rule!.validator(375000, {})).toBe(true); // Valid
        expect(rule!.validator(75000000, {})).toBe(false); // Too high
      });

      it('should validate PMI rate range', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'pmiRate' && r.type === 'range');
        expect(rule).toBeDefined();
        expect(rule!.validator(0.05, {})).toBe(false); // Too low
        expect(rule!.validator(0.5, {})).toBe(true); // Valid
        expect(rule!.validator(2.5, {})).toBe(false); // Too high
      });

      it('should validate credit score range', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'creditScore' && r.type === 'range');
        expect(rule).toBeDefined();
        expect(rule!.validator(250, {})).toBe(false); // Too low
        expect(rule!.validator(720, {})).toBe(true); // Valid
        expect(rule!.validator(900, {})).toBe(false); // Too high
        expect(rule!.validator('', {})).toBe(true); // Optional
      });
    });

    describe('Business rule validations', () => {
      it('should validate loan amount cannot exceed home value', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
        expect(rule).toBeDefined();
        
        // Valid: loan amount < home value
        expect(rule!.validator(300000, { homeValue: 375000 })).toBe(true);
        
        // Invalid: loan amount > home value
        expect(rule!.validator(400000, { homeValue: 375000 })).toBe(false);
      });

      it('should validate down payment plus loan amount equals home value', () => {
        const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'downPayment' && r.type === 'business');
        expect(rule).toBeDefined();
        
        // Valid: down payment + loan amount = home value
        expect(rule!.validator(75000, { loanAmount: 300000, homeValue: 375000 })).toBe(true);
        
        // Valid: within tolerance
        expect(rule!.validator(76000, { loanAmount: 300000, homeValue: 375000 })).toBe(true);
        
        // Invalid: too much difference
        expect(rule!.validator(80000, { loanAmount: 300000, homeValue: 375000 })).toBe(false);
      });
    });
  });

  describe('Calculation Logic', () => {
    describe('LTV calculation', () => {
      it('should calculate LTV ratio correctly', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'ltv-calculation');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({ loanAmount: 300000, homeValue: 375000 });
        expect(result.outputs.loanToValueRatio).toBe(80);
        expect(result.explanation).toContain('80.00%');
      });

      it('should handle zero home value', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'ltv-calculation');
        const result = formula!.calculate({ loanAmount: 300000, homeValue: 0 });
        expect(result.outputs.loanToValueRatio).toBe(0);
      });
    });

    describe('PMI requirement determination', () => {
      it('should determine PMI requirement for conventional loans', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'pmi-requirement-determination');
        expect(formula).toBeDefined();
        
        // LTV > 80% - PMI required
        const result1 = formula!.calculate({ loanAmount: 300000, homeValue: 375000, loanType: 'conventional' });
        expect(result1.outputs.pmiRequired).toBe('Yes');
        
        // LTV <= 80% - PMI not required
        const result2 = formula!.calculate({ loanAmount: 300000, homeValue: 400000, loanType: 'conventional' });
        expect(result2.outputs.pmiRequired).toBe('No');
      });

      it('should handle different loan types correctly', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'pmi-requirement-determination');
        
        // FHA loans always require MIP
        const fhaResult = formula!.calculate({ loanAmount: 300000, homeValue: 400000, loanType: 'fha' });
        expect(fhaResult.outputs.pmiRequired).toBe('Yes');
        
        // VA loans never require PMI
        const vaResult = formula!.calculate({ loanAmount: 300000, homeValue: 375000, loanType: 'va' });
        expect(vaResult.outputs.pmiRequired).toBe('No');
      });
    });

    describe('PMI cost calculation', () => {
      it('should calculate PMI costs correctly', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'pmi-cost-calculation');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({ 
          loanAmount: 300000, 
          pmiRate: 0.5, 
          homeValue: 375000, 
          loanType: 'conventional' 
        });
        
        const expectedMonthlyPMI = (300000 * 0.5 / 100) / 12;
        expect(result.outputs.monthlyPMI).toBe(Math.round(expectedMonthlyPMI));
        expect(result.outputs.annualPMI).toBe(Math.round(expectedMonthlyPMI * 12));
      });

      it('should return zero PMI when not required', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'pmi-cost-calculation');
        const result = formula!.calculate({ 
          loanAmount: 300000, 
          pmiRate: 0.5, 
          homeValue: 400000, 
          loanType: 'conventional' 
        });
        
        expect(result.outputs.monthlyPMI).toBe(0);
        expect(result.outputs.annualPMI).toBe(0);
      });
    });

    describe('PMI cancellation analysis', () => {
      it('should calculate cancellation timeline correctly', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'pmi-cancellation-analysis');
        expect(formula).toBeDefined();
        
        const result = formula!.calculate({
          loanAmount: 300000,
          homeValue: 375000,
          loanType: 'conventional',
          annualAppreciation: 3.0,
          pmiRate: 0.5
        });
        
        expect(result.outputs.pmiCancellationLTV).toBe(78);
        expect(result.outputs.monthsToCancellation).toBeGreaterThan(0);
        expect(result.outputs.totalPMICost).toBeGreaterThan(0);
      });

      it('should handle already eligible case', () => {
        const formula = privateMortgageInsuranceFormulas.find(f => f.id === 'pmi-cancellation-analysis');
        const result = formula!.calculate({
          loanAmount: 300000,
          homeValue: 400000,
          loanType: 'conventional',
          annualAppreciation: 3.0,
          pmiRate: 0.5
        });
        
        expect(result.outputs.monthsToCancellation).toBe(0);
        expect(result.outputs.totalPMICost).toBe(0);
      });
    });
  });

  describe('Helper Functions', () => {
    describe('PMI requirement determination', () => {
      it('should correctly determine PMI requirements for different scenarios', () => {
        // Conventional loan with LTV > 80%
        expect(determinePMIRequirement(85, 'conventional', 'single_family', 'primary')).toBe(true);
        
        // Conventional loan with LTV <= 80%
        expect(determinePMIRequirement(75, 'conventional', 'single_family', 'primary')).toBe(false);
        
        // FHA loan always requires MIP
        expect(determinePMIRequirement(60, 'fha', 'single_family', 'primary')).toBe(true);
        
        // VA loan never requires PMI
        expect(determinePMIRequirement(90, 'va', 'single_family', 'primary')).toBe(false);
      });
    });

    describe('PMI cancellation threshold', () => {
      it('should return correct thresholds for different loan types', () => {
        expect(getPMICancellationThreshold('conventional')).toBe(78);
        expect(getPMICancellationThreshold('fha')).toBe(78);
        expect(getPMICancellationThreshold('usda')).toBe(78);
        expect(getPMICancellationThreshold('va')).toBe(0);
      });
    });

    describe('Months to cancellation calculation', () => {
      it('should calculate months correctly with appreciation', () => {
        const months = calculateMonthsToCancellation(85, 78, 3.0, 300000, 375000);
        expect(months).toBeGreaterThan(0);
        expect(months).toBeLessThan(999);
      });

      it('should return 0 for already eligible LTV', () => {
        const months = calculateMonthsToCancellation(75, 78, 3.0, 300000, 375000);
        expect(months).toBe(0);
      });

      it('should handle zero appreciation', () => {
        const months = calculateMonthsToCancellation(85, 78, 0, 300000, 375000);
        expect(months).toBe(999);
      });
    });
  });

  describe('Examples', () => {
    it('should have valid example data', () => {
      const example1 = privateMortgageInsuranceCalculator.examples[0];
      expect(example1.title).toBe('Conventional Loan with PMI');
      expect(example1.inputs).toBeDefined();
      expect(example1.expectedOutputs).toBeDefined();

      const example2 = privateMortgageInsuranceCalculator.examples[1];
      expect(example2.title).toBe('FHA Loan with MIP');
      expect(example2.inputs).toBeDefined();
      expect(example2.expectedOutputs).toBeDefined();
    });

    it('should have realistic example values', () => {
      const example1 = privateMortgageInsuranceCalculator.examples[0];
      expect(Number(example1.inputs.loanAmount)).toBeGreaterThan(0);
      expect(Number(example1.inputs.homeValue)).toBeGreaterThan(0);
      expect(example1.inputs.loanType).toBe('conventional');
      
      // Verify LTV calculation in example
      const ltv = (example1.inputs.loanAmount / example1.inputs.homeValue) * 100;
      expect(ltv).toBe(80); // 300,000 / 375,000 = 80%
    });
  });

  describe('Integration', () => {
    it('should work with the main calculator formulas array', () => {
      expect(privateMortgageInsuranceCalculator.formulas).toContainEqual(
        expect.objectContaining({ id: 'pmi-analysis' })
      );
    });

    it('should have validation rules that match the calculator inputs', () => {
      const inputFields = privateMortgageInsuranceCalculator.inputs.map(input => input.id);
      const validationFields = privateMortgageInsuranceCalculator.validationRules.map(rule => rule.field);
      
      // All required inputs should have validation rules
      const requiredInputs = privateMortgageInsuranceCalculator.inputs.filter(input => input.required);
      requiredInputs.forEach(input => {
        expect(validationFields).toContain(input.id);
      });
    });
  });
});

// Import helper functions for testing
import { determinePMIRequirement, getPMICancellationThreshold, calculateMonthsToCancellation } from './formulas';