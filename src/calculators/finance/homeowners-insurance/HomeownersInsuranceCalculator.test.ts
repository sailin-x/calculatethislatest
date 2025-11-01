import { describe, it, expect } from 'vitest';
import { HomeownersInsuranceCalculator } from './HomeownersInsuranceCalculator';
import { calculateHomeownersInsurance } from './formulas';
import { validateHomeownersInsuranceInputs } from './validation';
import { validateAllHomeownersInsuranceInputs } from './quickValidation';

describe('Homeowners Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HomeownersInsuranceCalculator.id).toBe('HomeownersInsuranceCalculator');
      expect(HomeownersInsuranceCalculator.name).toBe('Homeowners Insurance Calculator');
      expect(HomeownersInsuranceCalculator.category).toBe('finance');
      expect(HomeownersInsuranceCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = HomeownersInsuranceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'homeValue')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = HomeownersInsuranceCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annualPremium');
      expect(outputIds).toContain('monthlyPremium');
      expect(outputIds).toContain('dwellingCoverage');
      expect(outputIds).toContain('totalCoverage');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('premiumScore');
      expect(outputIds).toContain('coverageScore');
    });

    it('should have calculate function', () => {
      expect(typeof HomeownersInsuranceCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof HomeownersInsuranceCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHomeownersInsuranceInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home value is required');
    });

    it('should validate home value range', () => {
      const result = validateHomeownersInsuranceInputs({ homeValue: 5000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home value must be between $10,000 and $10,000,000');
    });

    it('should validate property type', () => {
      const result = validateHomeownersInsuranceInputs({ 
        homeValue: 500000, 
        propertyType: 'invalid-type' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type');
    });

    it('should validate construction type', () => {
      const result = validateHomeownersInsuranceInputs({ 
        homeValue: 500000, 
        constructionType: 'invalid-construction' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid construction type');
    });

    it('should validate year built', () => {
      const result = validateHomeownersInsuranceInputs({ 
        homeValue: 500000, 
        yearBuilt: 1700 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Year built must be between 1800 and current year');
    });

    it('should validate deductible options', () => {
      const result = validateHomeownersInsuranceInputs({ 
        homeValue: 500000, 
        deductible: 750 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Deductible must be one of: 500, 1000, 1500, 2000, 2500, 5000');
    });

    it('should validate credit score range', () => {
      const result = validateHomeownersInsuranceInputs({ 
        homeValue: 500000, 
        creditScore: 200 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit score must be between 300 and 850');
    });

    it('should accept valid inputs', () => {
      const validInputs = {
        homeValue: 500000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      const result = validateHomeownersInsuranceInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic premium correctly', () => {
      const inputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.dwellingCoverage).toBe(450000);
      expect(outputs.personalPropertyCoverage).toBe(225000);
      expect(outputs.totalCoverage).toBeGreaterThan(outputs.dwellingCoverage);
    });

    it('should calculate different premiums for different states', () => {
      const baseInputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        deductible: 1000,
        coverageLevel: 'standard'
      };

      const californiaOutputs = calculateHomeownersInsurance({ ...baseInputs, state: 'california' });
      const floridaOutputs = calculateHomeownersInsurance({ ...baseInputs, state: 'florida' });

      expect(floridaOutputs.annualPremium).toBeGreaterThan(californiaOutputs.annualPremium);
    });

    it('should calculate different premiums for different locations', () => {
      const baseInputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };

      const suburbanOutputs = calculateHomeownersInsurance({ ...baseInputs, location: 'suburban' });
      const urbanOutputs = calculateHomeownersInsurance({ ...baseInputs, location: 'urban' });

      expect(urbanOutputs.annualPremium).toBeGreaterThan(suburbanOutputs.annualPremium);
    });

    it('should calculate different premiums for different construction types', () => {
      const baseInputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };

      const frameOutputs = calculateHomeownersInsurance({ ...baseInputs, constructionType: 'frame' });
      const brickOutputs = calculateHomeownersInsurance({ ...baseInputs, constructionType: 'brick' });

      expect(frameOutputs.annualPremium).toBeGreaterThan(brickOutputs.annualPremium);
    });

    it('should apply deductible discounts correctly', () => {
      const baseInputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        coverageLevel: 'standard'
      };

      const lowDeductibleOutputs = calculateHomeownersInsurance({ ...baseInputs, deductible: 500 });
      const highDeductibleOutputs = calculateHomeownersInsurance({ ...baseInputs, deductible: 2500 });

      expect(lowDeductibleOutputs.annualPremium).toBeGreaterThan(highDeductibleOutputs.annualPremium);
    });

    it('should calculate coverage scores correctly', () => {
      const inputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      
      expect(outputs.coverageScore).toBeGreaterThanOrEqual(0);
      expect(outputs.coverageScore).toBeLessThanOrEqual(100);
      expect(outputs.replacementCostRatio).toBe(100); // Should be 100% when dwelling coverage equals replacement cost
    });

    it('should calculate risk scores correctly', () => {
      const lowRiskInputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'brick',
        yearBuilt: 2010,
        location: 'rural',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard',
        claimsHistory: 'none'
      };

      const highRiskInputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1950,
        location: 'urban',
        state: 'florida',
        deductible: 1000,
        coverageLevel: 'standard',
        claimsHistory: '5-plus',
        floodZone: 'ae',
        crimeRate: 'high'
      };

      const lowRiskOutputs = calculateHomeownersInsurance(lowRiskInputs);
      const highRiskOutputs = calculateHomeownersInsurance(highRiskInputs);

      expect(highRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
    });
  });

  describe('Homeowners Insurance Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      const report = HomeownersInsuranceCalculator.generateReport(inputs, outputs);
      
      expect(report).toContain('Homeowners Insurance Analysis');
      expect(report).toContain('Summary');
      expect(report).toContain('Coverage Breakdown');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Cost Analysis');
      expect(report).toContain('Risk Factors');
      expect(report).toContain('Available Discounts');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include premium information in report', () => {
      const inputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      const report = HomeownersInsuranceCalculator.generateReport(inputs, outputs);
      
      expect(report).toContain(`$${outputs.annualPremium.toLocaleString()}`);
      expect(report).toContain(`$${outputs.monthlyPremium.toLocaleString()}`);
    });

    it('should include coverage information in report', () => {
      const inputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      const report = HomeownersInsuranceCalculator.generateReport(inputs, outputs);
      
      expect(report).toContain(`$${outputs.dwellingCoverage.toLocaleString()}`);
      expect(report).toContain(`$${outputs.totalCoverage.toLocaleString()}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum home value', () => {
      const inputs = {
        homeValue: 10000,
        replacementCost: 9000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.dwellingCoverage).toBe(9000);
    });

    it('should handle maximum home value', () => {
      const inputs = {
        homeValue: 10000000,
        replacementCost: 9000000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.dwellingCoverage).toBe(9000000);
    });

    it('should handle high risk properties', () => {
      const inputs = {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1950,
        location: 'urban',
        state: 'florida',
        deductible: 1000,
        coverageLevel: 'standard',
        floodZone: 'ae',
        hurricaneZone: 'high',
        crimeRate: 'high',
        claimsHistory: '5-plus'
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      
      expect(outputs.riskScore).toBeGreaterThan(50);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle missing optional inputs', () => {
      const inputs = {
        homeValue: 500000
      };
      
      const outputs = calculateHomeownersInsurance(inputs);
      
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.dwellingCoverage).toBeGreaterThan(0);
      expect(outputs.replacementCostRatio).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const homeValueResult = validateAllHomeownersInsuranceInputs({ homeValue: 500000 });
      expect(homeValueResult.isValid).toBe(true);

      const invalidHomeValueResult = validateAllHomeownersInsuranceInputs({ homeValue: 5000 });
      expect(invalidHomeValueResult.isValid).toBe(false);
      expect(invalidHomeValueResult.errors).toContain('Must be between $10,000 and $10,000,000');
    });

    it('should validate multiple fields', () => {
      const inputs = {
        homeValue: 500000,
        propertyType: 'single-family',
        constructionType: 'frame',
        deductible: 1000
      };
      
      const result = validateAllHomeownersInsuranceInputs(inputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch multiple validation errors', () => {
      const inputs = {
        homeValue: 5000,
        propertyType: 'invalid-type',
        deductible: 750
      };
      
      const result = validateAllHomeownersInsuranceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
