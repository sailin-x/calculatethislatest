import { describe, it, expect } from 'vitest';
import { FloodInsuranceCalculator } from './FloodInsuranceCalculator';
import { calculateFloodInsurance } from './formulas';
import { validateFloodInsuranceInputs } from './validation';
import { validateAllFloodInsuranceInputs } from './quickValidation';

describe('Flood Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(FloodInsuranceCalculator.id).toBe('flood-insurance-calculator');
      expect(FloodInsuranceCalculator.name).toBe('Flood Insurance Calculator');
      expect(FloodInsuranceCalculator.category).toBe('finance');
      expect(FloodInsuranceCalculator.subcategory).toBe('insurance');
    });

    it('should have required inputs', () => {
      const requiredInputs = ['propertyValue', 'buildingValue', 'contentsValue', 'floodZone', 'deductible', 'policyType', 'propertyType', 'occupancyType'];
      requiredInputs.forEach(inputId => {
        const input = FloodInsuranceCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputs = ['annualPremium', 'monthlyPremium', 'buildingCoverage', 'contentsCoverage', 'totalCoverage', 'riskScore', 'premiumRate'];
      expectedOutputs.forEach(outputId => {
        const output = FloodInsuranceCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateFloodInsuranceInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value is required');
      expect(result.errors).toContain('Building value is required');
      expect(result.errors).toContain('Contents value is required');
      expect(result.errors).toContain('Flood zone is required');
      expect(result.errors).toContain('Deductible is required');
      expect(result.errors).toContain('Policy type is required');
      expect(result.errors).toContain('Property type is required');
      expect(result.errors).toContain('Occupancy type is required');
    });

    it('should validate data types', () => {
      const result = validateFloodInsuranceInputs({
        propertyValue: 'invalid' as any,
        buildingValue: 'invalid' as any,
        contentsValue: 'invalid' as any,
        deductible: 'invalid' as any,
        floodZone: 'A',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be a number');
      expect(result.errors).toContain('Building value must be a number');
      expect(result.errors).toContain('Contents value must be a number');
      expect(result.errors).toContain('Deductible must be a number');
    });

    it('should validate ranges', () => {
      const result = validateFloodInsuranceInputs({
        propertyValue: 5000, // Too low
        buildingValue: 2000000, // Valid
        contentsValue: 500, // Too low
        deductible: 50000, // Valid
        floodZone: 'A',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $10,000 and $10,000,000');
      expect(result.errors).toContain('Contents value must be between $1,000 and $5,000,000');
    });

    it('should validate logical relationships', () => {
      const result = validateFloodInsuranceInputs({
        propertyValue: 200000,
        buildingValue: 250000, // Exceeds property value
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'A',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Building value cannot exceed property value');
    });

    it('should validate enum values', () => {
      const result = validateFloodInsuranceInputs({
        propertyValue: 200000,
        buildingValue: 150000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'INVALID',
        policyType: 'invalid',
        propertyType: 'invalid',
        occupancyType: 'invalid'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid flood zone');
      expect(result.errors).toContain('Invalid policy type');
      expect(result.errors).toContain('Invalid property type');
      expect(result.errors).toContain('Invalid occupancy type');
    });

    it('should pass validation with valid inputs', () => {
      const result = validateFloodInsuranceInputs({
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary',
        buildingElevation: 5,
        baseFloodElevation: 0
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic NFIP premiums correctly', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.buildingCoverage).toBe(200000);
      expect(outputs.contentsCoverage).toBe(50000);
      expect(outputs.totalCoverage).toBe(250000);
    });

    it('should calculate private insurance premiums correctly', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'X',
        policyType: 'private',
        propertyType: 'single-family',
        occupancyType: 'primary'
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.premiumRate).toBeGreaterThan(0);
    });

    it('should calculate risk scores correctly', () => {
      const highRiskInputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'V', // High risk zone
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary',
        buildingElevation: -5, // Below base flood elevation
        baseFloodElevation: 0
      };

      const lowRiskInputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'X', // Low risk zone
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary',
        buildingElevation: 10, // Above base flood elevation
        baseFloodElevation: 0
      };

      const highRiskOutputs = calculateFloodInsurance(highRiskInputs);
      const lowRiskOutputs = calculateFloodInsurance(lowRiskInputs);

      expect(highRiskOutputs.riskScore).toBeGreaterThan(lowRiskOutputs.riskScore);
    });

    it('should calculate affordability scores correctly', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.affordabilityScore).toBeGreaterThanOrEqual(1);
      expect(outputs.affordabilityScore).toBeLessThanOrEqual(10);
    });

    it('should calculate coverage ratios correctly', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.coverageRatio).toBeGreaterThan(0);
      expect(outputs.coverageRatio).toBeLessThanOrEqual(1);
    });
  });

  describe('Flood Insurance Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary',
        buildingElevation: 5,
        baseFloodElevation: 0
      };

      const outputs = calculateFloodInsurance(inputs);
      const analysis = FloodInsuranceCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Flood Insurance Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Coverage Analysis');
      expect(analysis).toContain('Cost Breakdown');
      expect(analysis).toContain('Recommendations');
    });

    it('should include flood zone risk analysis', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'V',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      };

      const outputs = calculateFloodInsurance(inputs);
      const analysis = FloodInsuranceCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Flood Zone V');
      expect(analysis).toContain('High Risk');
    });

    it('should include elevation analysis when provided', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary',
        buildingElevation: 5,
        baseFloodElevation: 0
      };

      const outputs = calculateFloodInsurance(inputs);
      const analysis = FloodInsuranceCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Elevation Analysis');
      expect(analysis).toContain('5 feet above base flood elevation');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        propertyValue: 10000,
        buildingValue: 5000,
        contentsValue: 1000,
        deductible: 1000,
        floodZone: 'X',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
    });

    it('should handle maximum values', () => {
      const inputs = {
        propertyValue: 10000000,
        buildingValue: 10000000,
        contentsValue: 5000000,
        deductible: 100000,
        floodZone: 'X',
        policyType: 'private',
        propertyType: 'commercial',
        occupancyType: 'business'
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
    });

    it('should handle zero optional values', () => {
      const inputs = {
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary',
        additionalLivingExpenses: 0,
        businessInterruption: 0,
        ordinanceLaw: 0,
        umbrellaLiability: 0
      };

      const outputs = calculateFloodInsurance(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.additionalLivingExpenses).toBe(0);
      expect(outputs.businessInterruption).toBe(0);
      expect(outputs.ordinanceLaw).toBe(0);
      expect(outputs.umbrellaLiability).toBe(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllFloodInsuranceInputs({
        propertyValue: 300000,
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch individual field errors', () => {
      const result = validateAllFloodInsuranceInputs({
        propertyValue: 5000, // Too low
        buildingValue: 200000,
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'INVALID',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $10,000 and $10,000,000');
      expect(result.errors).toContain('Invalid flood zone');
    });

    it('should validate logical relationships', () => {
      const result = validateAllFloodInsuranceInputs({
        propertyValue: 200000,
        buildingValue: 250000, // Exceeds property value
        contentsValue: 50000,
        deductible: 10000,
        floodZone: 'AE',
        policyType: 'nfip',
        propertyType: 'single-family',
        occupancyType: 'primary'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Building value cannot exceed property value');
    });
  });
});
