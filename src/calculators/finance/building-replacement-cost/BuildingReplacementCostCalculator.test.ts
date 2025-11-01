import { describe, it, expect, beforeEach } from 'vitest';
import { BuildingReplacementCostCalculator } from './BuildingReplacementCostCalculator';
import { calculateReplacementCost, calculateInsuranceCoverage, generateCostBreakdown } from './formulas';
import { validateBuildingReplacementCostInputs } from './validation';

describe('Building Replacement Cost Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      buildingType: 'single-family',
      constructionQuality: 'standard',
      totalSquareFootage: 2500,
      numberOfStories: 2,
      yearBuilt: 2010,
      location: 'midwest',
      foundationType: 'basement',
      roofType: 'asphalt-shingle',
      exteriorMaterial: 'vinyl-siding',
      heatingSystem: 'forced-air',
      coolingSystem: 'central-ac',
      kitchenQuality: 'standard',
      bathroomCount: 3,
      bedroomCount: 4,
      garageSpaces: 2,
      specialFeatures: ['fireplace', 'deck'],
      inflationRate: 3.0,
      demolitionCost: 15000,
      sitePreparation: 25000
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(BuildingReplacementCostCalculator.id).toBe('BuildingReplacementCost-calculator');
      expect(BuildingReplacementCostCalculator.name).toBe('Building Replacement Cost Calculator');
      expect(BuildingReplacementCostCalculator.category).toBe('finance');
      expect(BuildingReplacementCostCalculator.subcategory).toBe('construction');
    });

    it('should have all required inputs', () => {
      const inputIds = BuildingReplacementCostCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'buildingType', 'constructionQuality', 'totalSquareFootage', 'numberOfStories',
        'yearBuilt', 'location', 'foundationType', 'roofType', 'exteriorMaterial',
        'heatingSystem', 'coolingSystem', 'kitchenQuality', 'bathroomCount', 'bedroomCount',
        'garageSpaces', 'specialFeatures', 'inflationRate', 'demolitionCost', 'sitePreparation'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = BuildingReplacementCostCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'baseReplacementCost', 'totalReplacementCost', 'costPerSquareFoot', 'insuranceCoverage',
        'materialsCost', 'laborCost', 'overheadCost', 'costBreakdown', 'inflationAdjustment',
        'regionalAdjustment', 'qualityMultiplier', 'replacementTimeframe'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(BuildingReplacementCostCalculator.examples.length).toBeGreaterThan(0);
      BuildingReplacementCostCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { buildingType: 'single-family' };
      const result = validateBuildingReplacementCostInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate building type', () => {
      const invalidBuildingTypeInputs = { ...validInputs, buildingType: 'invalid-type' };
      const result = validateBuildingReplacementCostInputs(invalidBuildingTypeInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('building type'))).toBe(true);
    });

    it('should validate square footage range', () => {
      const lowSqFtInputs = { ...validInputs, totalSquareFootage: 50 };
      const result = validateBuildingReplacementCostInputs(lowSqFtInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('square footage'))).toBe(true);
    });

    it('should validate year built range', () => {
      const futureYearInputs = { ...validInputs, yearBuilt: 2050 };
      const result = validateBuildingReplacementCostInputs(futureYearInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('year built'))).toBe(true);
    });

    it('should validate location', () => {
      const invalidLocationInputs = { ...validInputs, location: 'invalid-location' };
      const result = validateBuildingReplacementCostInputs(invalidLocationInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('location'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highSqFtInputs = { ...validInputs, totalSquareFootage: 15000 };
      const result = validateBuildingReplacementCostInputs(highSqFtInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateBuildingReplacementCostInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate replacement cost metrics correctly', () => {
      const metrics = calculateReplacementCost(validInputs);
      
      expect(metrics.baseCost).toBeGreaterThan(0);
      expect(metrics.totalCost).toBeGreaterThan(0);
      expect(metrics.costPerSqFt).toBeGreaterThan(0);
      expect(metrics.materialsCost).toBeGreaterThan(0);
      expect(metrics.laborCost).toBeGreaterThan(0);
      expect(metrics.overheadCost).toBeGreaterThan(0);
      expect(metrics.inflationAdjustment).toBeGreaterThanOrEqual(0);
      expect(metrics.regionalFactor).toBeGreaterThan(0);
      expect(metrics.qualityMultiplier).toBeGreaterThan(0);
      expect(metrics.timeframe).toBeDefined();
    });

    it('should calculate insurance coverage correctly', () => {
      const replacementCost = calculateReplacementCost(validInputs);
      const insuranceCoverage = calculateInsuranceCoverage(replacementCost);
      
      expect(insuranceCoverage.recommendedCoverage).toBeGreaterThan(replacementCost.totalCost);
      expect(insuranceCoverage.minimumCoverage).toBeGreaterThan(0);
      expect(insuranceCoverage.bufferAmount).toBeGreaterThan(0);
      expect(insuranceCoverage.coverageFactors.length).toBeGreaterThan(0);
    });

    it('should calculate cost breakdown correctly', () => {
      const replacementCost = calculateReplacementCost(validInputs);
      const costBreakdown = generateCostBreakdown(validInputs, replacementCost);
      
      expect(costBreakdown.categories.length).toBeGreaterThan(0);
      expect(costBreakdown.summary).toBeDefined();
      
      const totalPercentage = costBreakdown.categories.reduce((sum, category) => sum + category.percentage, 0);
      expect(Math.abs(totalPercentage - 100)).toBeLessThan(1); // Should total approximately 100%
    });

    it('should calculate cost per square foot correctly', () => {
      const metrics = calculateReplacementCost(validInputs);
      const expectedCostPerSqFt = metrics.totalCost / validInputs.totalSquareFootage;
      
      expect(Math.abs(metrics.costPerSqFt - expectedCostPerSqFt)).toBeLessThan(0.01);
    });

    it('should handle different building types correctly', () => {
      const singleFamilyInputs = { ...validInputs, buildingType: 'single-family' };
      const commercialInputs = { ...validInputs, buildingType: 'commercial' };
      
      const singleFamilyResult = calculateReplacementCost(singleFamilyInputs);
      const commercialResult = calculateReplacementCost(commercialInputs);
      
      // Commercial buildings should generally cost more per square foot
      expect(commercialResult.costPerSqFt).toBeGreaterThan(singleFamilyResult.costPerSqFt);
    });

    it('should handle different quality levels correctly', () => {
      const standardInputs = { ...validInputs, constructionQuality: 'standard' };
      const luxuryInputs = { ...validInputs, constructionQuality: 'luxury' };
      
      const standardResult = calculateReplacementCost(standardInputs);
      const luxuryResult = calculateReplacementCost(luxuryInputs);
      
      // Luxury construction should cost more
      expect(luxuryResult.totalCost).toBeGreaterThan(standardResult.totalCost);
    });

    it('should handle different locations correctly', () => {
      const midwestInputs = { ...validInputs, location: 'midwest' };
      const westCoastInputs = { ...validInputs, location: 'west-coast' };
      
      const midwestResult = calculateReplacementCost(midwestInputs);
      const westCoastResult = calculateReplacementCost(westCoastInputs);
      
      // West coast should cost more than midwest
      expect(westCoastResult.totalCost).toBeGreaterThan(midwestResult.totalCost);
    });

    it('should handle special features correctly', () => {
      const noFeaturesInputs = { ...validInputs, specialFeatures: [] };
      const withFeaturesInputs = { ...validInputs, specialFeatures: ['pool', 'fireplace'] };
      
      const noFeaturesResult = calculateReplacementCost(noFeaturesInputs);
      const withFeaturesResult = calculateReplacementCost(withFeaturesInputs);
      
      // Features should increase total cost
      expect(withFeaturesResult.totalCost).toBeGreaterThan(noFeaturesResult.totalCost);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = BuildingReplacementCostCalculator.calculate(validInputs);
      
      expect(result.baseReplacementCost).toBeGreaterThan(0);
      expect(result.totalReplacementCost).toBeGreaterThan(0);
      expect(result.costPerSquareFoot).toBeGreaterThan(0);
      expect(result.insuranceCoverage).toBeGreaterThan(0);
      expect(result.materialsCost).toBeGreaterThan(0);
      expect(result.laborCost).toBeGreaterThan(0);
      expect(result.overheadCost).toBeGreaterThan(0);
      expect(result.costBreakdown).toBeDefined();
      expect(result.inflationAdjustment).toBeGreaterThanOrEqual(0);
      expect(result.regionalAdjustment).toBeGreaterThan(0);
      expect(result.qualityMultiplier).toBeGreaterThan(0);
      expect(result.replacementTimeframe).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, totalSquareFootage: -1000 };
      
      expect(() => {
        BuildingReplacementCostCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, totalSquareFootage: 100, numberOfStories: 1 };
      const result = BuildingReplacementCostCalculator.calculate(edgeCaseInputs);
      
      expect(result.totalReplacementCost).toBeGreaterThan(0);
      expect(result.costPerSquareFoot).toBeGreaterThan(0);
    });

    it('should match example calculations within tolerance', () => {
      const example = BuildingReplacementCostCalculator.examples[0];
      const result = BuildingReplacementCostCalculator.calculate(example.inputs);
      
      const baseCostAccuracy = Math.abs((result.baseReplacementCost - example.expectedOutputs.baseReplacementCost) / example.expectedOutputs.baseReplacementCost) * 100;
      const totalCostAccuracy = Math.abs((result.totalReplacementCost - example.expectedOutputs.totalReplacementCost) / example.expectedOutputs.totalReplacementCost) * 100;
      
      expect(baseCostAccuracy).toBeLessThan(15);
      expect(totalCostAccuracy).toBeLessThan(15);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        BuildingReplacementCostCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic construction costs', () => {
      const result = BuildingReplacementCostCalculator.calculate(validInputs);
      
      // Cost per square foot should be reasonable
      expect(result.costPerSquareFoot).toBeGreaterThan(50);
      expect(result.costPerSquareFoot).toBeLessThan(500);
    });

    it('should handle different property sizes correctly', () => {
      const smallPropertyInputs = { ...validInputs, totalSquareFootage: 1000 };
      const largePropertyInputs = { ...validInputs, totalSquareFootage: 5000 };
      
      const smallPropertyResult = BuildingReplacementCostCalculator.calculate(smallPropertyInputs);
      const largePropertyResult = BuildingReplacementCostCalculator.calculate(largePropertyInputs);
      
      // Larger properties should have higher total costs
      expect(largePropertyResult.totalReplacementCost).toBeGreaterThan(smallPropertyResult.totalReplacementCost);
      
      // But cost per square foot should be similar
      const costPerSqFtDifference = Math.abs(largePropertyResult.costPerSquareFoot - smallPropertyResult.costPerSquareFoot);
      expect(costPerSqFtDifference).toBeLessThan(50);
    });

    it('should calculate insurance coverage appropriately', () => {
      const result = BuildingReplacementCostCalculator.calculate(validInputs);
      
      // Insurance coverage should be higher than replacement cost
      expect(result.insuranceCoverage).toBeGreaterThan(result.totalReplacementCost);
      
      // But not excessively higher (should be around 110% of replacement cost)
      const coverageRatio = result.insuranceCoverage / result.totalReplacementCost;
      expect(coverageRatio).toBeGreaterThan(1.05);
      expect(coverageRatio).toBeLessThan(1.2);
    });

    it('should provide meaningful cost breakdown', () => {
      const result = BuildingReplacementCostCalculator.calculate(validInputs);
      
      // Materials should be the largest component
      expect(result.materialsCost).toBeGreaterThan(result.laborCost);
      expect(result.materialsCost).toBeGreaterThan(result.overheadCost);
      
      // Labor should be the second largest component
      expect(result.laborCost).toBeGreaterThan(result.overheadCost);
      
      // Total should equal sum of components
      const totalFromComponents = result.materialsCost + result.laborCost + result.overheadCost;
      expect(Math.abs(result.totalReplacementCost - totalFromComponents)).toBeLessThan(1);
    });

    it('should handle inflation adjustments correctly', () => {
      const oldBuildingInputs = { ...validInputs, yearBuilt: 1990 };
      const newBuildingInputs = { ...validInputs, yearBuilt: 2020 };
      
      const oldBuildingResult = BuildingReplacementCostCalculator.calculate(oldBuildingInputs);
      const newBuildingResult = BuildingReplacementCostCalculator.calculate(newBuildingInputs);
      
      // Older buildings should have higher inflation adjustments
      expect(oldBuildingResult.inflationAdjustment).toBeGreaterThan(newBuildingResult.inflationAdjustment);
    });
  });
});
