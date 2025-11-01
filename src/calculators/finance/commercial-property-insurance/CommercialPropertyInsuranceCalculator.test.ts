import { describe, it, expect } from 'vitest';
import { CommercialPropertyInsuranceCalculator } from './CommercialPropertyInsuranceCalculator';
import { calculateInsuranceCosts } from './formulas';
import { validateInsuranceInputs } from './validation';
import { validateAllInsuranceInputs } from './quickValidation';

describe('Commercial Property Insurance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CommercialPropertyInsuranceCalculator.id).toBe('CommercialPropertyInsurance-calculator');
      expect(CommercialPropertyInsuranceCalculator.name).toBe('Commercial Property Insurance Calculator');
      expect(CommercialPropertyInsuranceCalculator.category).toBe('finance');
      expect(CommercialPropertyInsuranceCalculator.subcategory).toBe('business');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'propertyValue', 'buildingValue', 'contentsValue', 'businessIncome',
        'propertyType', 'constructionType', 'yearBuilt', 'squareFootage',
        'location', 'deductible', 'coverageLimits', 'claimsHistory', 'occupancy'
      ];

      const inputIds = CommercialPropertyInsuranceCalculator.inputs.map(input => input.id);
      requiredInputs.forEach(required => {
        expect(inputIds).toContain(required);
      });
    });

    it('should have required output fields', () => {
      const requiredOutputs = [
        'annualPremium', 'monthlyPremium', 'propertyCoverage', 'businessInterruption',
        'liabilityCoverage', 'premiumRate', 'costPerSqFt', 'riskScore',
        'recommendedCoverage', 'savingsOpportunities'
      ];

      const outputIds = CommercialPropertyInsuranceCalculator.outputs.map(output => output.id);
      requiredOutputs.forEach(required => {
        expect(outputIds).toContain(required);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validInputs = {
        propertyValue: 2500000,
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        additionalCoverages: ['equipment-breakdown'],
        claimsHistory: '0',
        safetyFeatures: ['sprinkler-system'],
        occupancy: 'owner-occupied'
      };

      const validation = validateInsuranceInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid property value', () => {
      const invalidInputs = {
        propertyValue: 50000, // Too low
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Property value must be between $100,000 and $100,000,000');
    });

    it('should reject building value exceeding property value', () => {
      const invalidInputs = {
        propertyValue: 1000000,
        buildingValue: 1200000, // Exceeds property value
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Building value cannot exceed total property value');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = {
        propertyValue: 2500000,
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'invalid-type',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const validation = validateInsuranceInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid property type selected');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate office building insurance correctly', () => {
      const inputs = {
        propertyValue: 2500000,
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        additionalCoverages: ['equipment-breakdown'],
        claimsHistory: '0',
        safetyFeatures: ['sprinkler-system'],
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.propertyCoverage).toBe(2500000);
      expect(outputs.businessInterruption).toBe(1800000);
      expect(outputs.liabilityCoverage).toBe(1000000);
      expect(outputs.premiumRate).toBeGreaterThan(0);
      expect(outputs.costPerSqFt).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(typeof outputs.recommendedCoverage).toBe('string');
      expect(typeof outputs.savingsOpportunities).toBe('string');
    });

    it('should calculate retail store insurance correctly', () => {
      const inputs = {
        propertyValue: 800000,
        buildingValue: 600000,
        contentsValue: 200000,
        businessIncome: 600000,
        propertyType: 'retail',
        constructionType: 'joisted-masonry',
        yearBuilt: 1985,
        squareFootage: 5000,
        location: 'high-risk',
        deductible: 2500,
        coverageLimits: '90-percent',
        additionalCoverages: ['windstorm'],
        claimsHistory: '1',
        safetyFeatures: ['fire-alarm'],
        occupancy: 'tenant-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);

      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.monthlyPremium).toBeGreaterThan(0);
      expect(outputs.propertyCoverage).toBe(720000); // 90% of 800000
      expect(outputs.businessInterruption).toBe(900000); // 1.5 * 600000
      expect(outputs.liabilityCoverage).toBe(1000000);
      expect(outputs.premiumRate).toBeGreaterThan(0);
      expect(outputs.costPerSqFt).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should handle different coverage limits correctly', () => {
      const baseInputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      // Test 80% coverage
      const inputs80 = { ...baseInputs, coverageLimits: '80-percent' };
      const outputs80 = calculateInsuranceCosts(inputs80);
      expect(outputs80.propertyCoverage).toBe(800000);

      // Test 90% coverage
      const inputs90 = { ...baseInputs, coverageLimits: '90-percent' };
      const outputs90 = calculateInsuranceCosts(inputs90);
      expect(outputs90.propertyCoverage).toBe(900000);

      // Test 100% coverage
      const inputs100 = { ...baseInputs, coverageLimits: '100-percent' };
      const outputs100 = calculateInsuranceCosts(inputs100);
      expect(outputs100.propertyCoverage).toBe(1000000);
    });

    it('should apply location risk factors correctly', () => {
      const baseInputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      // Low risk location
      const lowRiskInputs = { ...baseInputs, location: 'low-risk' };
      const lowRiskOutputs = calculateInsuranceCosts(lowRiskInputs);

      // High risk location
      const highRiskInputs = { ...baseInputs, location: 'high-risk' };
      const highRiskOutputs = calculateInsuranceCosts(highRiskInputs);

      // High risk should have higher premium
      expect(highRiskOutputs.annualPremium).toBeGreaterThan(lowRiskOutputs.annualPremium);
    });

    it('should apply construction type factors correctly', () => {
      const baseInputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      // Frame construction (higher risk)
      const frameInputs = { ...baseInputs, constructionType: 'frame' };
      const frameOutputs = calculateInsuranceCosts(frameInputs);

      // Fire resistive construction (lower risk)
      const fireResistiveInputs = { ...baseInputs, constructionType: 'fire-resistive' };
      const fireResistiveOutputs = calculateInsuranceCosts(fireResistiveInputs);

      // Frame should have higher premium than fire resistive
      expect(frameOutputs.annualPremium).toBeGreaterThan(fireResistiveOutputs.annualPremium);
    });

    it('should apply safety feature discounts correctly', () => {
      const baseInputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      // No safety features
      const noSafetyInputs = { ...baseInputs, safetyFeatures: [] };
      const noSafetyOutputs = calculateInsuranceCosts(noSafetyInputs);

      // With sprinkler system
      const sprinklerInputs = { ...baseInputs, safetyFeatures: ['sprinkler-system'] };
      const sprinklerOutputs = calculateInsuranceCosts(sprinklerInputs);

      // Sprinkler system should reduce premium
      expect(sprinklerOutputs.annualPremium).toBeLessThan(noSafetyOutputs.annualPremium);
    });

    it('should apply claims history factors correctly', () => {
      const baseInputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        occupancy: 'owner-occupied'
      };

      // No claims
      const noClaimsInputs = { ...baseInputs, claimsHistory: '0' };
      const noClaimsOutputs = calculateInsuranceCosts(noClaimsInputs);

      // Multiple claims
      const multipleClaimsInputs = { ...baseInputs, claimsHistory: '3+' };
      const multipleClaimsOutputs = calculateInsuranceCosts(multipleClaimsInputs);

      // Multiple claims should have higher premium
      expect(multipleClaimsOutputs.annualPremium).toBeGreaterThan(noClaimsOutputs.annualPremium);
    });
  });

  describe('Risk Score Calculation', () => {
    it('should calculate risk score within valid range', () => {
      const inputs = {
        propertyValue: 2500000,
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should reflect higher risk for coastal properties', () => {
      const baseInputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const mediumRiskInputs = { ...baseInputs, location: 'medium-risk' };
      const coastalInputs = { ...baseInputs, location: 'coastal' };

      const mediumRiskOutputs = calculateInsuranceCosts(mediumRiskInputs);
      const coastalOutputs = calculateInsuranceCosts(coastalInputs);

      expect(coastalOutputs.riskScore).toBeGreaterThan(mediumRiskOutputs.riskScore);
    });
  });

  describe('Business Logic', () => {
    it('should calculate monthly premium as annual premium divided by 12', () => {
      const inputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      expect(outputs.monthlyPremium).toBeCloseTo(outputs.annualPremium / 12, 2);
    });

    it('should calculate premium rate as percentage of property value', () => {
      const inputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      const expectedRate = (outputs.annualPremium / inputs.propertyValue) * 100;
      expect(outputs.premiumRate).toBeCloseTo(expectedRate, 2);
    });

    it('should calculate cost per square foot correctly', () => {
      const inputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      const expectedCostPerSqFt = outputs.annualPremium / inputs.squareFootage;
      expect(outputs.costPerSqFt).toBeCloseTo(expectedCostPerSqFt, 2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum property values', () => {
      const inputs = {
        propertyValue: 100000,
        buildingValue: 80000,
        contentsValue: 20000,
        businessIncome: 100000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 1000,
        location: 'medium-risk',
        deductible: 1000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(1);
    });

    it('should handle maximum property values', () => {
      const inputs = {
        propertyValue: 100000000,
        buildingValue: 80000000,
        contentsValue: 20000000,
        businessIncome: 50000000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2020,
        squareFootage: 100000,
        location: 'low-risk',
        deductible: 100000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should handle zero contents value', () => {
      const inputs = {
        propertyValue: 1000000,
        buildingValue: 1000000,
        contentsValue: 0,
        businessIncome: 500000,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });

    it('should handle zero business income', () => {
      const inputs = {
        propertyValue: 1000000,
        buildingValue: 800000,
        contentsValue: 200000,
        businessIncome: 0,
        propertyType: 'office',
        constructionType: 'non-combustible',
        yearBuilt: 2000,
        squareFootage: 10000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const outputs = calculateInsuranceCosts(inputs);
      expect(outputs.businessInterruption).toBe(0);
      expect(outputs.annualPremium).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validatePropertyValue, validateBuildingValue } = require('./quickValidation');

      expect(validatePropertyValue(100000).isValid).toBe(true);
      expect(validatePropertyValue(50000).isValid).toBe(false);
      expect(validateBuildingValue(800000, 1000000).isValid).toBe(true);
      expect(validateBuildingValue(1200000, 1000000).isValid).toBe(false);
    });

    it('should validate all inputs comprehensively', () => {
      const validInputs = {
        propertyValue: 2500000,
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        claimsHistory: '0',
        occupancy: 'owner-occupied'
      };

      const validation = validateAllInsuranceInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });
});
