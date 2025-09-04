import { describe, it, expect } from 'vitest';
import { opportunityZoneInvestmentROICalculator } from './OpportunityZoneInvestmentROICalculator';
import { opportunityZoneInvestmentFormulas } from './formulas';
import { opportunityZoneInvestmentValidationRules } from './validation';

describe('Opportunity Zone Investment ROI Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(opportunityZoneInvestmentROICalculator.id).toBe('opportunity-zone-investment-roi');
      expect(opportunityZoneInvestmentROICalculator.title).toBe('Opportunity Zone Investment ROI Calculator');
      expect(opportunityZoneInvestmentROICalculator.category).toBe('finance');
      expect(opportunityZoneInvestmentROICalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const requiredInputs = opportunityZoneInvestmentROICalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
      
      const requiredFields = requiredInputs.map(input => input.id);
      expect(requiredFields).toContain('initialInvestment');
      expect(requiredFields).toContain('investmentTimeline');
      expect(requiredFields).toContain('annualAppreciationRate');
      expect(requiredFields).toContain('currentTaxBracket');
      expect(requiredFields).toContain('capitalGainsTaxRate');
      expect(requiredFields).toContain('deferralPeriod');
      expect(requiredFields).toContain('alternativeInvestmentReturn');
      expect(requiredFields).toContain('inflationRate');
    });

    it('should have correct number of outputs', () => {
      expect(opportunityZoneInvestmentROICalculator.outputs).toHaveLength(15);
    });

    it('should have validation rules', () => {
      expect(opportunityZoneInvestmentROICalculator.validationRules).toBeDefined();
      expect(opportunityZoneInvestmentROICalculator.validationRules.length).toBeGreaterThan(0);
    });

    it('should have examples', () => {
      expect(opportunityZoneInvestmentROICalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRules = opportunityZoneInvestmentROICalculator.validationRules.filter(rule => rule.type === 'required');
      expect(requiredRules).toHaveLength(8);
      
      requiredRules.forEach(rule => {
        expect(rule.validator(null)).toBe(false);
        expect(rule.validator(undefined)).toBe(false);
      });
    });

    it('should validate range constraints', () => {
      const rangeRules = opportunityZoneInvestmentROICalculator.validationRules.filter(rule => rule.type === 'range');
      
      // Test initial investment range
      const initialInvestmentRule = rangeRules.find(rule => rule.field === 'initialInvestment');
      expect(initialInvestmentRule?.validator(5000)).toBe(false); // Below minimum
      expect(initialInvestmentRule?.validator(15000)).toBe(true); // Within range
      expect(initialInvestmentRule?.validator(15000000)).toBe(false); // Above maximum
      
      // Test investment timeline range
      const timelineRule = rangeRules.find(rule => rule.field === 'investmentTimeline');
      expect(timelineRule?.validator(3)).toBe(false); // Below minimum
      expect(timelineRule?.validator(15)).toBe(true); // Within range
      expect(timelineRule?.validator(35)).toBe(false); // Above maximum
    });

    it('should validate business rules', () => {
      const businessRules = opportunityZoneInvestmentROICalculator.validationRules.filter(rule => rule.type === 'business');
      
      // Test investment timeline business rule
      const timelineBusinessRule = businessRules.find(rule => rule.field === 'investmentTimeline');
      expect(timelineBusinessRule?.validator(8, {})).toBe(false); // Below 10 years
      expect(timelineBusinessRule?.validator(12, {})).toBe(true); // 10+ years
      
      // Test deferral period business rule
      const deferralBusinessRule = businessRules.find(rule => rule.field === 'deferralPeriod');
      expect(deferralBusinessRule?.validator(8, { investmentTimeline: 7 })).toBe(false); // Exceeds timeline
      expect(deferralBusinessRule?.validator(7, { investmentTimeline: 10 })).toBe(true); // Within timeline
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate total investment correctly', () => {
      const inputs = {
        initialInvestment: 100000,
        acquisitionCosts: 8000
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalInvestment).toBe(108000);
    });

    it('should calculate property value at exit correctly', () => {
      const inputs = {
        initialInvestment: 100000,
        annualAppreciationRate: 5,
        investmentTimeline: 10
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      const expectedValue = 100000 * Math.pow(1.05, 10);
      expect(result.outputs.propertyValueAtExit).toBe(Math.round(expectedValue));
    });

    it('should calculate rental income with growth correctly', () => {
      const inputs = {
        annualRentalIncome: 8000,
        rentalIncomeGrowthRate: 3,
        investmentTimeline: 5
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      // Year 1: 8000, Year 2: 8240, Year 3: 8487, Year 4: 8742, Year 5: 9004
      // Total: 8000 + 8240 + 8487 + 8742 + 9004 = 42473
      expect(result.outputs.totalRentalIncome).toBe(42473);
    });

    it('should calculate tax benefits correctly', () => {
      const inputs = {
        initialInvestment: 100000,
        currentTaxBracket: 24,
        deferralPeriod: 7,
        alternativeInvestmentReturn: 7,
        propertyValueAtExit: 148000,
        capitalGainsTaxRate: 15
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      expect(result.outputs.taxDeferralBenefit).toBeGreaterThan(0);
      expect(result.outputs.taxReductionBenefit).toBeGreaterThan(0);
      expect(result.outputs.totalTaxBenefits).toBe(result.outputs.taxDeferralBenefit + result.outputs.taxReductionBenefit);
    });

    it('should calculate ROI correctly', () => {
      const inputs = {
        initialInvestment: 100000,
        acquisitionCosts: 8000,
        propertyValueAtExit: 148000,
        annualRentalIncome: 8000,
        rentalIncomeGrowthRate: 2,
        investmentTimeline: 10,
        annualOperatingExpenses: 5000,
        annualPropertyTaxes: 3000,
        annualInsurance: 2000,
        exitCosts: 12000,
        currentTaxBracket: 24,
        capitalGainsTaxRate: 15,
        deferralPeriod: 7,
        alternativeInvestmentReturn: 7,
        inflationRate: 2.5
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      expect(result.outputs.roi).toBeGreaterThan(0);
      expect(result.outputs.annualizedROI).toBeGreaterThan(0);
      expect(result.outputs.totalReturn).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero appreciation rate', () => {
      const inputs = {
        initialInvestment: 100000,
        annualAppreciationRate: 0,
        investmentTimeline: 10
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      expect(result.outputs.propertyValueAtExit).toBe(100000);
    });

    it('should handle zero rental income', () => {
      const inputs = {
        annualRentalIncome: 0,
        rentalIncomeGrowthRate: 0,
        investmentTimeline: 10
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalRentalIncome).toBe(0);
    });

    it('should handle high appreciation rates', () => {
      const inputs = {
        initialInvestment: 100000,
        annualAppreciationRate: 20,
        investmentTimeline: 5
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      const expectedValue = 100000 * Math.pow(1.2, 5);
      expect(result.outputs.propertyValueAtExit).toBe(Math.round(expectedValue));
    });

    it('should handle missing optional inputs', () => {
      const inputs = {
        initialInvestment: 100000,
        investmentTimeline: 10,
        annualAppreciationRate: 5,
        currentTaxBracket: 24,
        capitalGainsTaxRate: 15,
        deferralPeriod: 7,
        alternativeInvestmentReturn: 7,
        inflationRate: 2.5
        // Missing optional inputs should default to 0
      };
      
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalRentalIncome).toBe(0);
      expect(result.outputs.totalOperatingExpenses).toBe(0);
      expect(result.outputs.acquisitionCosts).toBeUndefined(); // Not in outputs
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      opportunityZoneInvestmentROICalculator.examples.forEach(example => {
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
        expect(example.title).toBeDefined();
        expect(example.description).toBeDefined();
      });
    });

    it('should calculate conservative example correctly', () => {
      const conservativeExample = opportunityZoneInvestmentROICalculator.examples[0];
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(conservativeExample.inputs);
      
      // Verify key outputs match expected values
      expect(result.outputs.totalInvestment).toBe(conservativeExample.expectedOutputs.totalInvestment);
      expect(result.outputs.propertyValueAtExit).toBe(conservativeExample.expectedOutputs.propertyValueAtExit);
      expect(result.outputs.roi).toBeCloseTo(conservativeExample.expectedOutputs.roi, 0);
    });

    it('should calculate aggressive example correctly', () => {
      const aggressiveExample = opportunityZoneInvestmentROICalculator.examples[1];
      const result = opportunityZoneInvestmentROICalculator.formulas[0].calculate(aggressiveExample.inputs);
      
      // Verify key outputs match expected values
      expect(result.outputs.totalInvestment).toBe(aggressiveExample.expectedOutputs.totalInvestment);
      expect(result.outputs.propertyValueAtExit).toBe(aggressiveExample.expectedOutputs.propertyValueAtExit);
      expect(result.outputs.roi).toBeCloseTo(aggressiveExample.expectedOutputs.roi, 0);
    });
  });

  describe('Formulas Module', () => {
    it('should export formulas array', () => {
      expect(opportunityZoneInvestmentFormulas).toBeDefined();
      expect(Array.isArray(opportunityZoneInvestmentFormulas)).toBe(true);
    });

    it('should have correct formula structure', () => {
      opportunityZoneInvestmentFormulas.forEach(formula => {
        expect(formula.id).toBeDefined();
        expect(formula.name).toBeDefined();
        expect(formula.description).toBeDefined();
        expect(typeof formula.calculate).toBe('function');
      });
    });

    it('should calculate individual formulas correctly', () => {
      const totalInvestmentFormula = opportunityZoneInvestmentFormulas.find(f => f.id === 'total-investment-calculation');
      expect(totalInvestmentFormula).toBeDefined();
      
      const result = totalInvestmentFormula!.calculate({ initialInvestment: 100000, acquisitionCosts: 5000 });
      expect(result.outputs.totalInvestment).toBe(105000);
    });
  });

  describe('Validation Module', () => {
    it('should export validation rules array', () => {
      expect(opportunityZoneInvestmentValidationRules).toBeDefined();
      expect(Array.isArray(opportunityZoneInvestmentValidationRules)).toBe(true);
    });

    it('should have correct validation rule structure', () => {
      opportunityZoneInvestmentValidationRules.forEach(rule => {
        expect(rule.type).toBeDefined();
        expect(rule.field).toBeDefined();
        expect(rule.message).toBeDefined();
        expect(typeof rule.validator).toBe('function');
      });
    });

    it('should validate required fields correctly', () => {
      const requiredRules = opportunityZoneInvestmentValidationRules.filter(rule => rule.type === 'required');
      requiredRules.forEach(rule => {
        expect(rule.validator(0)).toBe(false);
        expect(rule.validator(100)).toBe(true);
      });
    });
  });
});