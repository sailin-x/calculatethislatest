import { describe, it, expect } from 'vitest';
import { CommercialPropertyValuationCalculator } from './CommercialPropertyValuationCalculator';
import { calculatePropertyValue } from './formulas';
import { validateValuationInputs } from './validation';
import { validateAllValuationInputs } from './quickValidation';

describe('Commercial Property Valuation Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CommercialPropertyValuationCalculator.id).toBe('CommercialPropertyValuation-calculator');
      expect(CommercialPropertyValuationCalculator.name).toBe('Commercial Property Valuation Calculator');
      expect(CommercialPropertyValuationCalculator.category).toBe('finance');
      expect(CommercialPropertyValuationCalculator.subcategory).toBe('business');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'propertyType', 'squareFootage', 'landArea', 'yearBuilt', 'constructionQuality',
        'location', 'marketCondition', 'annualRent', 'operatingExpenses', 'vacancyRate',
        'capRate', 'comparableSales', 'landValue', 'replacementCost', 'depreciation',
        'zoning', 'accessibility', 'condition', 'tenantQuality', 'leaseTerms'
      ];

      const inputIds = CommercialPropertyValuationCalculator.inputs.map(input => input.id);
      requiredInputs.forEach(required => {
        expect(inputIds).toContain(required);
      });
    });

    it('should have required output fields', () => {
      const requiredOutputs = [
        'incomeApproachValue', 'salesComparisonValue', 'costApproachValue', 'finalValue',
        'valuePerSqFt', 'valuePerAcre', 'netOperatingIncome', 'effectiveGrossIncome',
        'operatingExpenseRatio', 'valueRange', 'confidenceLevel', 'keyFactors'
      ];

      const outputIds = CommercialPropertyValuationCalculator.outputs.map(output => output.id);
      requiredOutputs.forEach(required => {
        expect(outputIds).toContain(required);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validInputs = {
        propertyType: 'office',
        squareFootage: 15000,
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 180000,
        operatingExpenses: 45000,
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      };

      const validation = validateValuationInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid square footage', () => {
      const invalidInputs = {
        propertyType: 'office',
        squareFootage: 500, // Too low
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 180000,
        operatingExpenses: 45000,
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      };

      const validation = validateValuationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Square footage must be between 1,000 and 1,000,000 sq ft');
    });

    it('should reject operating expenses exceeding annual rent', () => {
      const invalidInputs = {
        propertyType: 'office',
        squareFootage: 15000,
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 100000,
        operatingExpenses: 120000, // Exceeds annual rent
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      };

      const validation = validateValuationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Operating expenses cannot exceed annual rent');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = {
        propertyType: 'invalid-type',
        squareFootage: 15000,
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 180000,
        operatingExpenses: 45000,
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      };

      const validation = validateValuationInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid property type selected');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate office building valuation correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 15000,
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 180000,
        operatingExpenses: 45000,
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      };

      const outputs = calculatePropertyValue(inputs);

      expect(outputs.incomeApproachValue).toBeGreaterThan(0);
      expect(outputs.salesComparisonValue).toBeGreaterThan(0);
      expect(outputs.costApproachValue).toBeGreaterThan(0);
      expect(outputs.finalValue).toBeGreaterThan(0);
      expect(outputs.valuePerSqFt).toBeGreaterThan(0);
      expect(outputs.valuePerAcre).toBeGreaterThan(0);
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
      expect(outputs.effectiveGrossIncome).toBeGreaterThan(0);
      expect(outputs.operatingExpenseRatio).toBeGreaterThan(0);
      expect(typeof outputs.valueRange).toBe('string');
      expect(typeof outputs.confidenceLevel).toBe('string');
      expect(typeof outputs.keyFactors).toBe('string');
    });

    it('should calculate retail property valuation correctly', () => {
      const inputs = {
        propertyType: 'retail',
        squareFootage: 8000,
        landArea: 1.2,
        yearBuilt: 1995,
        constructionQuality: 'standard',
        location: 'suburban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 8,
        capRate: 8.0,
        comparableSales: 125,
        landValue: 35000,
        replacementCost: 100,
        depreciation: 25,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);

      expect(outputs.incomeApproachValue).toBeGreaterThan(0);
      expect(outputs.salesComparisonValue).toBeGreaterThan(0);
      expect(outputs.costApproachValue).toBeGreaterThan(0);
      expect(outputs.finalValue).toBeGreaterThan(0);
      expect(outputs.valuePerSqFt).toBeGreaterThan(0);
      expect(outputs.valuePerAcre).toBeGreaterThan(0);
    });

    it('should calculate income approach correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      
      // Manual calculation verification
      const effectiveGrossIncome = 120000 * (1 - 5 / 100); // $114,000
      const netOperatingIncome = effectiveGrossIncome - 30000; // $84,000
      const expectedIncomeValue = netOperatingIncome / (8.0 / 100); // $1,050,000
      
      expect(outputs.incomeApproachValue).toBeCloseTo(expectedIncomeValue, -3);
    });

    it('should calculate sales comparison approach correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      
      // Base calculation: 10000 * 100 = $1,000,000
      // Then adjusted by various factors
      expect(outputs.salesComparisonValue).toBeGreaterThan(0);
    });

    it('should calculate cost approach correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      
      // Manual calculation verification
      const landValue = 2.0 * 40000; // $80,000
      const buildingValue = 10000 * 100 * (1 - 20 / 100); // $800,000
      const expectedCostValue = landValue + buildingValue; // $880,000
      
      expect(outputs.costApproachValue).toBeCloseTo(expectedCostValue, -3);
    });
  });

  describe('Valuation Approaches', () => {
    it('should weight approaches differently based on property type', () => {
      const baseInputs = {
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      // Office property (should favor income approach)
      const officeInputs = { ...baseInputs, propertyType: 'office' };
      const officeOutputs = calculatePropertyValue(officeInputs);

      // Warehouse property (should favor cost approach)
      const warehouseInputs = { ...baseInputs, propertyType: 'warehouse' };
      const warehouseOutputs = calculatePropertyValue(warehouseInputs);

      // Values should be different due to different weighting
      expect(officeOutputs.finalValue).not.toBe(warehouseOutputs.finalValue);
    });

    it('should adjust weights based on market conditions', () => {
      const baseInputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      // Stable market
      const stableInputs = { ...baseInputs, marketCondition: 'stable' };
      const stableOutputs = calculatePropertyValue(stableInputs);

      // Hot market
      const hotInputs = { ...baseInputs, marketCondition: 'hot' };
      const hotOutputs = calculatePropertyValue(hotInputs);

      // Values should be different due to market condition adjustments
      expect(hotOutputs.finalValue).not.toBe(stableOutputs.finalValue);
    });
  });

  describe('Confidence Level Calculation', () => {
    it('should calculate confidence level based on value variance', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      expect(['High', 'Medium', 'Low']).toContain(outputs.confidenceLevel);
    });

    it('should generate appropriate value range based on confidence', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      expect(outputs.valueRange).toMatch(/\$\d{1,3}(,\d{3})* - \$\d{1,3}(,\d{3})*/);
    });
  });

  describe('Business Logic', () => {
    it('should calculate value per square foot correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      const expectedValuePerSqFt = outputs.finalValue / inputs.squareFootage;
      expect(outputs.valuePerSqFt).toBeCloseTo(expectedValuePerSqFt, 2);
    });

    it('should calculate value per acre correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      const expectedValuePerAcre = outputs.finalValue / inputs.landArea;
      expect(outputs.valuePerAcre).toBeCloseTo(expectedValuePerAcre, 0);
    });

    it('should calculate operating expense ratio correctly', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      const effectiveGrossIncome = 120000 * (1 - 5 / 100); // $114,000
      const expectedRatio = (30000 / effectiveGrossIncome) * 100; // 26.32%
      expect(outputs.operatingExpenseRatio).toBeCloseTo(expectedRatio, 1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum square footage', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 1000,
        landArea: 0.5,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 50000,
        operatingExpenses: 15000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      expect(outputs.finalValue).toBeGreaterThan(0);
      expect(outputs.valuePerSqFt).toBeGreaterThan(0);
    });

    it('should handle zero vacancy rate', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 0,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 20,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      expect(outputs.effectiveGrossIncome).toBe(120000);
      expect(outputs.netOperatingIncome).toBe(90000);
    });

    it('should handle zero depreciation', () => {
      const inputs = {
        propertyType: 'office',
        squareFootage: 10000,
        landArea: 2.0,
        yearBuilt: 2000,
        constructionQuality: 'standard',
        location: 'urban',
        marketCondition: 'stable',
        annualRent: 120000,
        operatingExpenses: 30000,
        vacancyRate: 5,
        capRate: 8.0,
        comparableSales: 100,
        landValue: 40000,
        replacementCost: 100,
        depreciation: 0,
        zoning: 'commercial',
        accessibility: 'good',
        condition: 'good',
        tenantQuality: 'good',
        leaseTerms: 'medium-term'
      };

      const outputs = calculatePropertyValue(inputs);
      expect(outputs.costApproachValue).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validateSquareFootage, validateAnnualRent } = require('./quickValidation');

      expect(validateSquareFootage(1000).isValid).toBe(true);
      expect(validateSquareFootage(500).isValid).toBe(false);
      expect(validateAnnualRent(100000).isValid).toBe(true);
      expect(validateAnnualRent(-1000).isValid).toBe(false);
    });

    it('should validate all inputs comprehensively', () => {
      const validInputs = {
        propertyType: 'office',
        squareFootage: 15000,
        landArea: 2.5,
        yearBuilt: 2010,
        constructionQuality: 'custom',
        location: 'urban',
        marketCondition: 'growing',
        annualRent: 180000,
        operatingExpenses: 45000,
        vacancyRate: 5,
        capRate: 7.5,
        comparableSales: 150,
        landValue: 50000,
        replacementCost: 120,
        depreciation: 15,
        zoning: 'commercial',
        accessibility: 'excellent',
        condition: 'excellent',
        tenantQuality: 'excellent',
        leaseTerms: 'long-term'
      };

      const validation = validateAllValuationInputs(validInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });
});
