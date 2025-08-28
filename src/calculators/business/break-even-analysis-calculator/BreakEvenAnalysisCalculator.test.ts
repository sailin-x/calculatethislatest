import { BreakEvenAnalysisCalculator } from './BreakEvenAnalysisCalculator';

describe('BreakEvenAnalysisCalculator', () => {
  let calculator: BreakEvenAnalysisCalculator;

  beforeEach(() => {
    calculator = new BreakEvenAnalysisCalculator();
  });

  describe('calculate', () => {
    it('should calculate break-even analysis correctly', () => {
      const inputs = {
        fixedCosts: 50000,
        variableCostsPerUnit: 10,
        sellingPricePerUnit: 25,
        targetProfit: 10000,
        currentSales: 2000,
        capacity: 5000,
        marketDemand: 3000,
        competitorPrice: 30,
        priceElasticity: -1.5,
        costStructure: {
          laborCosts: 20000,
          materialCosts: 15000,
          overheadCosts: 10000,
          marketingCosts: 5000
        },
        revenueStreams: {
          primaryProduct: 0.7,
          secondaryProduct: 0.2,
          services: 0.1
        },
        seasonality: {
          q1: 0.2,
          q2: 0.25,
          q3: 0.3,
          q4: 0.25
        }
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.breakEvenUnits).toBeGreaterThan(0);
      expect(result.breakEvenRevenue).toBeGreaterThan(0);
      expect(result.contributionMargin).toBeGreaterThan(0);
      expect(result.contributionMarginRatio).toBeGreaterThan(0);
      expect(result.contributionMarginRatio).toBeLessThan(1);
      expect(result.safetyMargin).toBeDefined();
      expect(result.safetyMarginRatio).toBeDefined();
      expect(result.targetProfitUnits).toBeGreaterThan(result.breakEvenUnits);
      expect(result.targetProfitRevenue).toBeGreaterThan(result.breakEvenRevenue);
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero fixed costs', () => {
      const inputs = {
        fixedCosts: 0,
        variableCostsPerUnit: 10,
        sellingPricePerUnit: 25,
        targetProfit: 10000,
        currentSales: 2000,
        capacity: 5000,
        marketDemand: 3000,
        competitorPrice: 30,
        priceElasticity: -1.5,
        costStructure: {
          laborCosts: 0,
          materialCosts: 0,
          overheadCosts: 0,
          marketingCosts: 0
        },
        revenueStreams: {
          primaryProduct: 0.7,
          secondaryProduct: 0.2,
          services: 0.1
        },
        seasonality: {
          q1: 0.2,
          q2: 0.25,
          q3: 0.3,
          q4: 0.25
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.breakEvenUnits).toBe(0);
      expect(result.breakEvenRevenue).toBe(0);
      expect(result.contributionMargin).toBeGreaterThan(0);
      expect(result.contributionMarginRatio).toBeGreaterThan(0);
    });

    it('should handle high profit margin scenario', () => {
      const inputs = {
        fixedCosts: 100000,
        variableCostsPerUnit: 5,
        sellingPricePerUnit: 50,
        targetProfit: 50000,
        currentSales: 5000,
        capacity: 10000,
        marketDemand: 8000,
        competitorPrice: 45,
        priceElasticity: -2.0,
        costStructure: {
          laborCosts: 40000,
          materialCosts: 20000,
          overheadCosts: 30000,
          marketingCosts: 10000
        },
        revenueStreams: {
          primaryProduct: 0.8,
          secondaryProduct: 0.15,
          services: 0.05
        },
        seasonality: {
          q1: 0.2,
          q2: 0.25,
          q3: 0.3,
          q4: 0.25
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.contributionMarginRatio).toBeGreaterThan(0.8);
      expect(result.breakEvenUnits).toBeLessThan(3000);
      expect(result.safetyMarginRatio).toBeGreaterThan(0.5);
      expect(result.analysis.isProfitable).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        fixedCosts: 50000,
        variableCostsPerUnit: 10,
        sellingPricePerUnit: 25,
        targetProfit: 10000,
        currentSales: 2000,
        capacity: 5000,
        marketDemand: 3000,
        competitorPrice: 30,
        priceElasticity: -1.5,
        costStructure: {
          laborCosts: 20000,
          materialCosts: 15000,
          overheadCosts: 10000,
          marketingCosts: 5000
        },
        revenueStreams: {
          primaryProduct: 0.7,
          secondaryProduct: 0.2,
          services: 0.1
        },
        seasonality: {
          q1: 0.2,
          q2: 0.25,
          q3: 0.3,
          q4: 0.25
        }
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        fixedCosts: -50000,
        variableCostsPerUnit: 10,
        sellingPricePerUnit: 25,
        targetProfit: 10000,
        currentSales: 2000,
        capacity: 5000,
        marketDemand: 3000,
        competitorPrice: 30,
        priceElasticity: -1.5,
        costStructure: {
          laborCosts: 20000,
          materialCosts: 15000,
          overheadCosts: 10000,
          marketingCosts: 5000
        },
        revenueStreams: {
          primaryProduct: 0.7,
          secondaryProduct: 0.2,
          services: 0.1
        },
        seasonality: {
          q1: 0.2,
          q2: 0.25,
          q3: 0.3,
          q4: 0.25
        }
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Fixed costs must be non-negative');
    });
  });
});
