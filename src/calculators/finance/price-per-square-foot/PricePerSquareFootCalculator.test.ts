import { PricePerSquareFootCalculator } from './PricePerSquareFootCalculator';
import { PricePerSquareFootInputs } from './types';

describe('PricePerSquareFootCalculator', () => {
  let calculator: PricePerSquareFootCalculator;

  beforeEach(() => {
    calculator = new PricePerSquareFootCalculator();
  });

  const createValidInputs = (): PricePerSquareFootInputs => ({
    propertyAddress: '123 Main St, Anytown, ST 12345',
    propertyType: 'single_family',
    propertySize: 2500,
    propertyAge: 10,
    numberOfUnits: 1,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    propertyPrice: 500000,
    listPrice: 500000,
    salePrice: 500000,
    appraisalValue: 510000,
    assessedValue: 480000,
    comparableProperties: [
      { address: '456 Oak St', salePrice: 480000, size: 2400, age: 8, bedrooms: 3, bathrooms: 2, saleDate: '2024-01-01', condition: 'good', location: 'same', adjustments: 0 },
      { address: '789 Pine St', salePrice: 520000, size: 2600, age: 12, bedrooms: 4, bathrooms: 3, saleDate: '2024-02-01', condition: 'excellent', location: 'same', adjustments: 0 },
      { address: '321 Elm St', salePrice: 490000, size: 2450, age: 9, bedrooms: 3, bathrooms: 2, saleDate: '2024-03-01', condition: 'good', location: 'same', adjustments: 0 }
    ],
    marketLocation: 'Anytown, ST',
    marketCondition: 'growing',
    marketGrowthRate: 0.04,
    daysOnMarket: 30,
    propertyCondition: 'good',
    propertyStyle: 'traditional',
    lotSize: 8000,
    garageSpaces: 2,
    parkingSpaces: 4,
    amenities: [
      { amenity: 'Swimming Pool', value: 15000, included: true },
      { amenity: 'Fireplace', value: 5000, included: true },
      { amenity: 'Hardwood Floors', value: 8000, included: true }
    ],
    schoolDistrict: 'Anytown School District',
    schoolRating: 8,
    crimeRate: 'low',
    walkScore: 75,
    transitScore: 60,
    bikeScore: 70,
    analysisPeriod: 12,
    inflationRate: 0.03,
    propertyAppreciationRate: 0.03,
    discountRate: 0.05,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  });

  describe('Basic Calculation', () => {
    it('should calculate price per square foot metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pricePerSquareFoot).toBeGreaterThan(0);
      expect(result.averageComparablePrice).toBeGreaterThan(0);
      expect(result.medianComparablePrice).toBeGreaterThan(0);
      expect(result.estimatedValue).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
    });

    it('should calculate price per square foot correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedPricePerSqFt = inputs.propertyPrice / inputs.propertySize;
      expect(result.pricePerSquareFoot).toBeCloseTo(expectedPricePerSqFt, 2);
    });

    it('should calculate comparable analysis correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.averageComparablePrice).toBeGreaterThan(0);
      expect(result.medianComparablePrice).toBeGreaterThan(0);
      expect(result.comparablePriceRange).toBeDefined();
      expect(result.comparablePriceRange.min).toBeGreaterThan(0);
      expect(result.comparablePriceRange.max).toBeGreaterThan(0);
    });

    it('should calculate market position correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pricePosition).toBeDefined();
      expect(result.pricePercentile).toBeGreaterThanOrEqual(0);
      expect(result.pricePercentile).toBeLessThanOrEqual(100);
    });
  });

  describe('Validation', () => {
    it('should throw error for missing property address', () => {
      const inputs = createValidInputs();
      inputs.propertyAddress = '';

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid property type', () => {
      const inputs = createValidInputs();
      inputs.propertyType = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for negative property size', () => {
      const inputs = createValidInputs();
      inputs.propertySize = -100;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for negative property price', () => {
      const inputs = createValidInputs();
      inputs.propertyPrice = -100000;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid market condition', () => {
      const inputs = createValidInputs();
      inputs.marketCondition = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.priceRating).toBeDefined();
      expect(result.analysis.valueRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should include price trend analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.priceTrend).toBeDefined();
      expect(Array.isArray(result.priceTrend)).toBe(true);
      expect(result.priceTrend.length).toBeGreaterThan(0);
    });

    it('should include sensitivity analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
    });

    it('should include scenario analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.scenarios).toBeDefined();
      expect(Array.isArray(result.scenarios)).toBe(true);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it('should include comparison analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.comparisonAnalysis).toBeDefined();
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate risk score based on factors', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
      expect(result.priceVolatility).toBeGreaterThanOrEqual(0);
      expect(result.marketRisk).toBeGreaterThanOrEqual(0);
      expect(result.valuationRisk).toBeGreaterThanOrEqual(0);
    });

    it('should adjust risk score for poor property condition', () => {
      const inputs1 = createValidInputs();
      inputs1.propertyCondition = 'excellent';

      const inputs2 = createValidInputs();
      inputs2.propertyCondition = 'poor';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result2.riskScore).toBeGreaterThan(result1.riskScore);
    });

    it('should adjust risk score for high crime rate', () => {
      const inputs1 = createValidInputs();
      inputs1.crimeRate = 'low';

      const inputs2 = createValidInputs();
      inputs2.crimeRate = 'high';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result2.riskScore).toBeGreaterThan(result1.riskScore);
    });

    it('should adjust risk score for declining market', () => {
      const inputs1 = createValidInputs();
      inputs1.marketCondition = 'growing';

      const inputs2 = createValidInputs();
      inputs2.marketCondition = 'declining';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result2.riskScore).toBeGreaterThan(result1.riskScore);
    });
  });

  describe('Value Analysis', () => {
    it('should calculate estimated value correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.estimatedValue).toBeGreaterThan(0);
      expect(result.valueRange).toBeDefined();
      expect(result.valueRange.low).toBeGreaterThan(0);
      expect(result.valueRange.high).toBeGreaterThan(0);
      expect(result.valueRange.confidence).toBeGreaterThan(0);
    });

    it('should calculate over/under priced percentage', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.overUnderPricedPercentage).toBeDefined();
      expect(result.overUnderPriced).toBeDefined();
    });

    it('should adjust value for property condition', () => {
      const inputs1 = createValidInputs();
      inputs1.propertyCondition = 'excellent';

      const inputs2 = createValidInputs();
      inputs2.propertyCondition = 'poor';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.estimatedValue).toBeGreaterThan(result2.estimatedValue);
    });
  });

  describe('Market Analysis', () => {
    it('should analyze market conditions', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.marketAveragePrice).toBeGreaterThan(0);
      expect(result.marketMedianPrice).toBeGreaterThan(0);
      expect(result.marketPriceRange).toBeDefined();
      expect(result.marketPosition).toBeDefined();
    });

    it('should adjust for different market conditions', () => {
      const inputs1 = createValidInputs();
      inputs1.marketCondition = 'growing';
      inputs1.marketGrowthRate = 0.05;

      const inputs2 = createValidInputs();
      inputs2.marketCondition = 'declining';
      inputs2.marketGrowthRate = -0.02;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.marketRisk).toBeLessThan(result2.marketRisk);
    });
  });

  describe('Performance Metrics', () => {
    it('should calculate performance metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pricePerformance).toBeDefined();
      expect(result.marketPerformance).toBeDefined();
      expect(result.relativePerformance).toBeDefined();
    });

    it('should calculate relative performance correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedRelativePerformance = result.pricePerformance - result.marketPerformance;
      expect(result.relativePerformance).toBeCloseTo(expectedRelativePerformance, 4);
    });
  });

  describe('Benchmark Analysis', () => {
    it('should generate benchmark analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.benchmarkAnalysis).toBeDefined();
      expect(Array.isArray(result.benchmarkAnalysis)).toBe(true);
      expect(result.benchmarkAnalysis.length).toBeGreaterThan(0);
    });
  });
});