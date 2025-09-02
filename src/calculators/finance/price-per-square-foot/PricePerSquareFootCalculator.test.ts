import { describe, it, expect, beforeEach } from 'vitest';
import { calculatePricePerSquareFoot } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';
import { validateField } from './quickValidation';
import { PricePerSquareFootInputs } from './types';

describe('Price Per Square Foot Calculator', () => {
  let validInputs: PricePerSquareFootInputs;

  beforeEach(() => {
    validInputs = {
      // Property Information
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'single_family',
      propertySize: 2000,
      propertyAge: 15,
      numberOfUnits: 1,
      numberOfBedrooms: 3,
      numberOfBathrooms: 2,

      // Price Information
      propertyPrice: 400000,
      listPrice: 425000,
      salePrice: 0,
      appraisalValue: 410000,
      assessedValue: 380000,

      // Comparable Properties
      comparableProperties: [
        {
          address: '456 Oak Ave, Anytown, USA',
          salePrice: 380000,
          size: 1900,
          age: 12,
          bedrooms: 3,
          bathrooms: 2,
          saleDate: new Date('2024-01-15'),
          condition: 'good',
          location: 'similar',
          adjustments: 5000
        },
        {
          address: '789 Pine St, Anytown, USA',
          salePrice: 420000,
          size: 2100,
          age: 18,
          bedrooms: 3,
          bathrooms: 2.5,
          saleDate: new Date('2024-02-20'),
          condition: 'excellent',
          location: 'similar',
          adjustments: -3000
        }
      ],

      // Market Information
      marketLocation: 'Anytown, USA',
      marketCondition: 'growing',
      marketGrowthRate: 5.2,
      daysOnMarket: 45,

      // Property Features
      propertyCondition: 'good',
      propertyStyle: 'traditional',
      lotSize: 8000,
      garageSpaces: 2,
      parkingSpaces: 4,

      // Amenities
      amenities: [
        { amenity: 'Pool', value: 15000, included: false },
        { amenity: 'Fireplace', value: 5000, included: true },
        { amenity: 'Updated Kitchen', value: 25000, included: true }
      ],

      // Location Factors
      schoolDistrict: 'Anytown School District',
      schoolRating: 8.5,
      crimeRate: 'low',
      walkScore: 75,
      transitScore: 65,
      bikeScore: 80,

      // Analysis Parameters
      analysisPeriod: 60,
      inflationRate: 2.5,
      propertyAppreciationRate: 4.0,
      discountRate: 6.0,

      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true
    };
  });

  describe('calculatePricePerSquareFoot', () => {
    it('should calculate basic price per square foot correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.pricePerSquareFoot).toBe(200); // 400000 / 2000
      expect(result.listPricePerSquareFoot).toBe(212.5); // 425000 / 2000
      expect(result.salePricePerSquareFoot).toBe(0); // 0 / 2000
      expect(result.appraisalPricePerSquareFoot).toBe(205); // 410000 / 2000
      expect(result.assessedPricePerSquareFoot).toBe(190); // 380000 / 2000
    });

    it('should calculate comparable analysis correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      // Comparable 1: (380000 + 5000) / 1900 = 202.63
      // Comparable 2: (420000 - 3000) / 2100 = 198.57
      // Average: (202.63 + 198.57) / 2 = 200.60
      expect(result.averageComparablePrice).toBeCloseTo(200.60, 1);
      expect(result.medianComparablePrice).toBeCloseTo(200.60, 1);
      expect(result.comparablePriceRange.min).toBeCloseTo(198.57, 1);
      expect(result.comparablePriceRange.max).toBeCloseTo(202.63, 1);
    });

    it('should calculate price position correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      // Property price per sq ft: 200
      // Average comparable: 200.60
      // Position: slightly below average
      expect(result.pricePosition).toBe('average');
      expect(result.pricePercentile).toBeCloseTo(50, 0);
    });

    it('should calculate estimated value correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      // Should be close to average comparable price * property size
      const expectedValue = result.averageComparablePrice * validInputs.propertySize;
      expect(result.estimatedValue).toBeCloseTo(expectedValue, -2);
    });

    it('should calculate over/under priced percentage correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      // Property: 200, Average comparable: 200.60
      // Difference: (200 - 200.60) / 200.60 * 100 = -0.3%
      expect(result.overUnderPricedPercentage).toBeCloseTo(-0.3, 1);
    });

    it('should calculate risk score correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.riskScore).toBeGreaterThan(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(result.marketRisk).toBeGreaterThan(0);
      expect(result.valuationRisk).toBeGreaterThan(0);
    });

    it('should generate analysis correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.analysis.priceRating).toBeDefined();
      expect(result.analysis.valueRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.summary).toBeDefined();
      expect(result.analysis.details).toBeDefined();
    });

    it('should calculate performance metrics correctly', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.pricePerformance).toBeGreaterThan(0);
      expect(result.marketPerformance).toBeGreaterThan(0);
      expect(result.relativePerformance).toBeDefined();
    });

    it('should generate price trend data', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.priceTrend).toBeInstanceOf(Array);
      expect(result.priceTrend.length).toBeGreaterThan(0);
      expect(result.priceTrend[0]).toHaveProperty('month');
      expect(result.priceTrend[0]).toHaveProperty('price');
    });

    it('should generate sensitivity matrix', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.sensitivityMatrix).toBeInstanceOf(Array);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
      expect(result.sensitivityMatrix[0]).toHaveProperty('scenario');
      expect(result.sensitivityMatrix[0]).toHaveProperty('impact');
    });

    it('should generate scenarios', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.scenarios).toBeInstanceOf(Array);
      expect(result.scenarios.length).toBeGreaterThan(0);
      expect(result.scenarios[0]).toHaveProperty('name');
      expect(result.scenarios[0]).toHaveProperty('probability');
      expect(result.scenarios[0]).toHaveProperty('outcome');
    });

    it('should generate comparison analysis', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
      expect(result.comparisonAnalysis[0]).toHaveProperty('metric');
      expect(result.comparisonAnalysis[0]).toHaveProperty('value');
      expect(result.comparisonAnalysis[0]).toHaveProperty('benchmark');
    });

    it('should generate benchmark analysis', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      
      expect(result.benchmarkAnalysis).toBeInstanceOf(Array);
      expect(result.benchmarkAnalysis.length).toBeGreaterThan(0);
      expect(result.benchmarkAnalysis[0]).toHaveProperty('benchmark');
      expect(result.benchmarkAnalysis[0]).toHaveProperty('value');
      expect(result.benchmarkAnalysis[0]).toHaveProperty('performance');
    });
  });

  describe('validatePricePerSquareFootInputs', () => {
    it('should validate correct inputs successfully', () => {
      const result = validatePricePerSquareFootInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject missing property address', () => {
      const invalidInputs = { ...validInputs, propertyAddress: '' };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAddress).toBe('Property address is required');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid_type' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBe('Valid property type is required');
    });

    it('should reject negative property size', () => {
      const invalidInputs = { ...validInputs, propertySize: -100 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBe('Property size must be greater than 0');
    });

    it('should reject property size too large for single family', () => {
      const invalidInputs = { ...validInputs, propertySize: 15000 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBe('Property size seems unusually large for single family home');
    });

    it('should reject invalid number of units for property type', () => {
      const invalidInputs = { ...validInputs, numberOfUnits: 2 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.numberOfUnits).toBe('Single family properties should have 1 unit');
    });

    it('should reject property price too low relative to size', () => {
      const invalidInputs = { ...validInputs, propertyPrice: 1000 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyPrice).toBe('Property price seems unusually low relative to property size');
    });

    it('should reject list price too high relative to property price', () => {
      const invalidInputs = { ...validInputs, listPrice: 1000000 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.listPrice).toBe('List price seems unusually high relative to property price');
    });

    it('should reject empty comparable properties', () => {
      const invalidInputs = { ...validInputs, comparableProperties: [] };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.comparableProperties).toBe('At least one comparable property is required');
    });

    it('should reject invalid market condition', () => {
      const invalidInputs = { ...validInputs, marketCondition: 'invalid' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketCondition).toBe('Valid market condition is required');
    });

    it('should reject market growth rate too high', () => {
      const invalidInputs = { ...validInputs, marketGrowthRate: 150 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketGrowthRate).toBe('Market growth rate cannot exceed 100%');
    });

    it('should reject invalid property condition', () => {
      const invalidInputs = { ...validInputs, propertyCondition: 'invalid' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyCondition).toBe('Valid property condition is required');
    });

    it('should reject lot size smaller than property size', () => {
      const invalidInputs = { ...validInputs, lotSize: 1000 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.lotSize).toBe('Lot size should typically be larger than property size');
    });

    it('should reject invalid amenities structure', () => {
      const invalidInputs = { ...validInputs, amenities: [{ amenity: '', value: -100, included: 'yes' as any }] };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['amenities.0.amenity']).toBe('Amenity name is required');
    });

    it('should reject school rating too high', () => {
      const invalidInputs = { ...validInputs, schoolRating: 15 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.schoolRating).toBe('School rating cannot exceed 10');
    });

    it('should reject invalid crime rate', () => {
      const invalidInputs = { ...validInputs, crimeRate: 'invalid' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.crimeRate).toBe('Valid crime rate is required');
    });

    it('should reject accessibility scores too high', () => {
      const invalidInputs = { ...validInputs, walkScore: 150, transitScore: 150, bikeScore: 150 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.walkScore).toBe('Total accessibility scores cannot exceed 300');
    });

    it('should reject analysis period too long', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 150 };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBe('Analysis period cannot exceed 120 months');
    });

    it('should reject invalid currency', () => {
      const invalidInputs = { ...validInputs, currency: 'INVALID' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currency).toBe('Valid currency is required');
    });

    it('should reject invalid display format', () => {
      const invalidInputs = { ...validInputs, displayFormat: 'invalid' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.displayFormat).toBe('Valid display format is required');
    });

    it('should reject invalid includeCharts type', () => {
      const invalidInputs = { ...validInputs, includeCharts: 'yes' as any };
      const result = validatePricePerSquareFootInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.includeCharts).toBe('Include charts must be true or false');
    });
  });

  describe('validateField', () => {
    it('should validate property address correctly', () => {
      const result = validateField('propertyAddress', '123 Main St', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyAddress', '', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property address is required');
    });

    it('should validate property type correctly', () => {
      const result = validateField('propertyType', 'single_family', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyType', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid property type is required');
    });

    it('should validate property size with cross-field validation', () => {
      const result = validateField('propertySize', 2000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertySize', 15000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property size seems unusually large for single family home');
    });

    it('should validate property price with cross-field validation', () => {
      const result = validateField('propertyPrice', 400000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyPrice', 1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property price seems unusually low relative to property size');
    });

    it('should validate list price with cross-field validation', () => {
      const result = validateField('listPrice', 425000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('listPrice', 1000000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('List price seems unusually high relative to property price');
    });

    it('should validate comparable properties correctly', () => {
      const result = validateField('comparableProperties', validInputs.comparableProperties, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('comparableProperties', [], validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('At least one comparable property is required');
    });

    it('should validate market condition correctly', () => {
      const result = validateField('marketCondition', 'growing', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('marketCondition', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid market condition is required');
    });

    it('should validate market growth rate correctly', () => {
      const result = validateField('marketGrowthRate', 5.2, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('marketGrowthRate', 150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Market growth rate cannot exceed 100%');
    });

    it('should validate property condition correctly', () => {
      const result = validateField('propertyCondition', 'good', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyCondition', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid property condition is required');
    });

    it('should validate lot size with cross-field validation', () => {
      const result = validateField('lotSize', 8000, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('lotSize', 1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Lot size should typically be larger than property size');
    });

    it('should validate amenities correctly', () => {
      const result = validateField('amenities', validInputs.amenities, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('amenities', [{ amenity: '', value: -100, included: 'yes' as any }], validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Amenity 1 name is required');
    });

    it('should validate school rating correctly', () => {
      const result = validateField('schoolRating', 8.5, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('schoolRating', 15, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('School rating cannot exceed 10');
    });

    it('should validate crime rate correctly', () => {
      const result = validateField('crimeRate', 'low', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('crimeRate', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid crime rate is required');
    });

    it('should validate accessibility scores with cross-field validation', () => {
      const result = validateField('walkScore', 75, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('walkScore', 150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Total accessibility scores cannot exceed 300');
    });

    it('should validate analysis period correctly', () => {
      const result = validateField('analysisPeriod', 60, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('analysisPeriod', 150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Analysis period cannot exceed 120 months');
    });

    it('should validate inflation rate correctly', () => {
      const result = validateField('inflationRate', 2.5, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('inflationRate', 150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Inflation rate cannot exceed 100%');
    });

    it('should validate property appreciation rate correctly', () => {
      const result = validateField('propertyAppreciationRate', 4.0, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('propertyAppreciationRate', 150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property appreciation rate cannot exceed 100%');
    });

    it('should validate discount rate correctly', () => {
      const result = validateField('discountRate', 6.0, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('discountRate', 1500, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Discount rate cannot exceed 1000%');
    });

    it('should validate currency correctly', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('currency', 'INVALID', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid currency is required');
    });

    it('should validate display format correctly', () => {
      const result = validateField('displayFormat', 'currency', validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('displayFormat', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Valid display format is required');
    });

    it('should validate includeCharts correctly', () => {
      const result = validateField('includeCharts', true, validInputs);
      expect(result.isValid).toBe(true);
      
      const invalidResult = validateField('includeCharts', 'yes' as any, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Include charts must be true or false');
    });

    it('should handle unknown field gracefully', () => {
      const result = validateField('unknownField' as any, 'value', validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property price', () => {
      const inputs = { ...validInputs, propertyPrice: 0 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyPrice).toBe('Property price must be greater than 0');
    });

    it('should handle very large property size', () => {
      const inputs = { ...validInputs, propertySize: 200000 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBe('Property size cannot exceed 100,000 sq ft');
    });

    it('should handle very old property', () => {
      const inputs = { ...validInputs, propertyAge: 250 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAge).toBe('Property age cannot exceed 200 years');
    });

    it('should handle negative market growth rate', () => {
      const inputs = { ...validInputs, marketGrowthRate: -60 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketGrowthRate).toBe('Market growth rate must be -50% or greater');
    });

    it('should handle very long days on market', () => {
      const inputs = { ...validInputs, daysOnMarket: 1500 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.daysOnMarket).toBe('Days on market cannot exceed 1,000');
    });
  });

  describe('Business Logic', () => {
    it('should validate multi-family property has multiple units', () => {
      const inputs = { ...validInputs, propertyType: 'multi_family', numberOfUnits: 1 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.numberOfUnits).toBe('Multi-family properties should have 2 or more units');
    });

    it('should validate condo size limits', () => {
      const inputs = { ...validInputs, propertyType: 'condo', propertySize: 8000 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBe('Property size seems unusually large for condominium');
    });

    it('should validate lot size relative to property size', () => {
      const inputs = { ...validInputs, lotSize: 50000 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.lotSize).toBe('Lot size seems unusually large relative to property size');
    });

    it('should validate accessibility scores total', () => {
      const inputs = { ...validInputs, walkScore: 100, transitScore: 100, bikeScore: 100 };
      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.walkScore).toBe('Total accessibility scores cannot exceed 300');
    });
  });

  describe('Analysis Generation', () => {
    it('should generate appropriate price rating for average price', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      expect(['excellent', 'good', 'average', 'fair', 'poor']).toContain(result.analysis.priceRating);
    });

    it('should generate appropriate value rating', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      expect(['excellent', 'good', 'average', 'fair', 'poor']).toContain(result.analysis.valueRating);
    });

    it('should generate recommendation', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.recommendation.length).toBeGreaterThan(0);
    });

    it('should generate detailed analysis', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      expect(result.analysis.details).toBeDefined();
      expect(result.analysis.details.length).toBeGreaterThan(0);
    });

    it('should generate summary', () => {
      const result = calculatePricePerSquareFoot(validInputs);
      expect(result.analysis.summary).toBeDefined();
      expect(result.analysis.summary.length).toBeGreaterThan(0);
    });
  });
});