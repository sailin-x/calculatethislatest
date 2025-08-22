import { describe, it, expect } from 'vitest';
import { calculatePricePerSquareFoot, generatePricePerSquareFootAnalysis } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';
import { quickValidatePricePerSquareFoot } from './quickValidation';
import { PricePerSquareFootInputs } from './validation';

describe('Price Per Square Foot Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family'
      };

      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        propertyPrice: 450000
        // Missing other required fields
      };

      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject negative property price', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: -100000,
        totalSquareFootage: 2500,
        propertyType: 'single_family'
      };

      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property price is required and must be greater than 0');
    });

    it('should reject zero square footage', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: 450000,
        totalSquareFootage: 0,
        propertyType: 'single_family'
      };

      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total square footage is required and must be greater than 0');
    });

    it('should reject unusually low price per square foot', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: 450000,
        totalSquareFootage: 50000, // Creates $9/sq ft
        propertyType: 'single_family'
      };

      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Calculated price per square foot seems unusually low');
    });

    it('should reject unusually high price per square foot', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: 450000,
        totalSquareFootage: 50, // Creates $9,000/sq ft
        propertyType: 'single_family'
      };

      const result = validatePricePerSquareFootInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Calculated price per square foot seems unusually high');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family'
      };

      expect(quickValidatePricePerSquareFoot(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: 450000
        // Missing other required fields
      };

      expect(quickValidatePricePerSquareFoot(inputs)).toBe(false);
    });

    it('should fail quick validation with invalid price per square foot', () => {
      const inputs: Partial<PricePerSquareFootInputs> = {
        propertyPrice: 450000,
        totalSquareFootage: 50, // Creates $9,000/sq ft
        propertyType: 'single_family'
      };

      expect(quickValidatePricePerSquareFoot(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate price per square foot correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family'
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.pricePerSquareFoot).toBe(180); // 450000 / 2500
    });

    it('should calculate market comparison correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        averageMarketPrice: 175,
        medianMarketPrice: 170
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketComparison.averageMarketPrice).toBe(175);
      expect(result.marketComparison.medianMarketPrice).toBe(170);
      expect(result.marketComparison.priceDifference).toBe(5); // 180 - 175
      expect(result.marketComparison.priceDifferencePercentage).toBeCloseTo(2.86, 1); // (5/175)*100
      expect(result.marketComparison.marketPosition).toBe('At Market');
    });

    it('should identify above market position', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        averageMarketPrice: 150
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketComparison.marketPosition).toBe('Above Market');
    });

    it('should identify below market position', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        averageMarketPrice: 200
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketComparison.marketPosition).toBe('Below Market');
    });

    it('should calculate valuation analysis correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        averageMarketPrice: 175,
        condition: 'excellent',
        features: ['pool', 'garage']
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.valuationAnalysis.estimatedValue).toBeGreaterThan(0);
      expect(result.valuationAnalysis.confidenceLevel).toBe('Medium');
      expect(result.valuationAnalysis.valuationFactors.length).toBeGreaterThan(0);
    });

    it('should calculate comparable analysis correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        marketData: [
          { pricePerSquareFoot: 170 },
          { pricePerSquareFoot: 175 },
          { pricePerSquareFoot: 180 }
        ]
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.comparableAnalysis.comparableCount).toBe(3);
      expect(result.comparableAnalysis.averageComparablePrice).toBe(175);
      expect(result.comparableAnalysis.medianComparablePrice).toBe(175);
    });

    it('should calculate market trends correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        priceHistory: [
          { date: '2023-01-01', price: 400000 },
          { date: '2023-06-01', price: 450000 }
        ],
        daysOnMarket: 45
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketTrends.trendDirection).toBe('Increasing');
      expect(result.marketTrends.priceChange).toBe(50000);
      expect(result.marketTrends.priceChangePercentage).toBe(12.5);
      expect(result.marketTrends.daysOnMarketAnalysis).toBe('Normal Market');
    });

    it('should calculate ROI analysis correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        rentalIncome: 2800,
        propertyTaxes: 8500,
        hoaFees: 250,
        utilities: 200
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.roiAnalysis.potentialROI).toBeCloseTo(7.47, 1); // (2800*12)/450000*100
      expect(result.roiAnalysis.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.roiAnalysis.capRate).toBeGreaterThan(0);
      expect(result.roiAnalysis.investmentScore).toBe('Fair');
    });

    it('should calculate rental analysis correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        rentalIncome: 2800,
        propertyTaxes: 8500,
        hoaFees: 250,
        utilities: 200
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.rentalAnalysis.rentalYield).toBeCloseTo(7.47, 1);
      expect(result.rentalAnalysis.grossRentMultiplier).toBeCloseTo(13.39, 1);
      expect(result.rentalAnalysis.netOperatingIncome).toBeGreaterThan(0);
      expect(result.rentalAnalysis.rentalScore).toBe('Fair');
    });
  });

  describe('Property Scoring', () => {
    it('should calculate property score correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        condition: 'excellent',
        features: ['pool', 'garage', 'updated_kitchen']
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.propertyScore.overallScore).toBeGreaterThan(0);
      expect(result.propertyScore.rating).toBeDefined();
      expect(result.propertyScore.strengths.length).toBeGreaterThan(0);
    });

    it('should identify property strengths', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        features: ['pool', 'garage', 'updated_kitchen']
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.propertyScore.strengths).toContain('Has pool');
      expect(result.propertyScore.strengths).toContain('Has garage');
      expect(result.propertyScore.strengths).toContain('Has updated kitchen');
    });
  });

  describe('Investment Metrics', () => {
    it('should calculate investment metrics correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        rentalIncome: 2800,
        marketTrend: 'appreciating'
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.investmentMetrics.priceToRentRatio).toBeCloseTo(13.39, 1);
      expect(result.investmentMetrics.investmentGrade).toBeDefined();
      expect(result.investmentMetrics.riskLevel).toBeDefined();
      expect(result.investmentMetrics.marketTiming).toBeDefined();
    });

    it('should assess investment grade correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        rentalIncome: 4000, // High rental income for better cap rate
        propertyTaxes: 5000,
        hoaFees: 100,
        utilities: 150
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.investmentMetrics.investmentGrade).toBe('A');
    });
  });

  describe('Cost Breakdown', () => {
    it('should calculate cost breakdown correctly', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        bedrooms: 3,
        bathrooms: 2.5,
        lotSize: 8000,
        propertyTaxes: 8500,
        hoaFees: 250,
        utilities: 200
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.costBreakdown.pricePerBedroom).toBe(150000); // 450000 / 3
      expect(result.costBreakdown.pricePerBathroom).toBe(180000); // 450000 / 2.5
      expect(result.costBreakdown.pricePerAcre).toBeCloseTo(2445750, 0); // 450000 / (8000/43560)
      expect(result.costBreakdown.monthlyCost).toBeCloseTo(1208.33, 1); // (8500/12) + 250 + 200
      expect(result.costBreakdown.annualCost).toBe(13500); // 8500 + (250*12) + (200*12)
    });
  });

  describe('Price Recommendations', () => {
    it('should generate price recommendations for overpriced property', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        averageMarketPrice: 150, // Property is overpriced
        daysOnMarket: 120
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.priceRecommendations.length).toBeGreaterThan(0);
      expect(result.priceRecommendations.some(rec => rec.includes('reducing price'))).toBe(true);
    });

    it('should generate price recommendations for underpriced property', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        averageMarketPrice: 200, // Property is underpriced
        rentalIncome: 3500 // High rental income
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.priceRecommendations.length).toBeGreaterThan(0);
      expect(result.priceRecommendations.some(rec => rec.includes('value proposition'))).toBe(true);
    });
  });

  describe('Market Insights', () => {
    it('should generate market insights for appreciating market', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        marketTrend: 'appreciating',
        daysOnMarket: 25
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketInsights.length).toBeGreaterThan(0);
      expect(result.marketInsights.some(insight => insight.includes('appreciating'))).toBe(true);
    });

    it('should generate market insights for slow market', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        daysOnMarket: 95
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketInsights.length).toBeGreaterThan(0);
      expect(result.marketInsights.some(insight => insight.includes('Slow market'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        location: 'Austin, TX 78701',
        bedrooms: 3,
        bathrooms: 2.5,
        yearBuilt: 2010,
        condition: 'excellent',
        features: ['pool', 'garage']
      };

      const result = calculatePricePerSquareFoot(inputs);
      const analysis = generatePricePerSquareFootAnalysis(inputs, result);
      
      expect(analysis).toContain('Price Per Square Foot Analysis');
      expect(analysis).toContain('Summary');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Market Comparison');
      expect(analysis).toContain('Valuation Analysis');
      expect(analysis).toContain('Comparable Analysis');
      expect(analysis).toContain('Market Trends');
      expect(analysis).toContain('ROI Analysis');
      expect(analysis).toContain('Rental Analysis');
      expect(analysis).toContain('Price Recommendations');
      expect(analysis).toContain('Market Insights');
      expect(analysis).toContain('Property Score');
      expect(analysis).toContain('Investment Metrics');
      expect(analysis).toContain('Cost Breakdown');
    });

    it('should include correct values in report', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        location: 'Austin, TX 78701'
      };

      const result = calculatePricePerSquareFoot(inputs);
      const analysis = generatePricePerSquareFootAnalysis(inputs, result);
      
      expect(analysis).toContain('$450,000'); // Property Price
      expect(analysis).toContain('2,500 sq ft'); // Total Square Footage
      expect(analysis).toContain('$180.00'); // Price Per Square Foot
      expect(analysis).toContain('single family'); // Property Type
      expect(analysis).toContain('Austin, TX 78701'); // Location
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero rental income', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        rentalIncome: 0
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.roiAnalysis.potentialROI).toBe(0);
      expect(result.rentalAnalysis.rentalYield).toBe(0);
      expect(result.rentalAnalysis.rentalScore).toBe('Poor');
    });

    it('should handle missing market data', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family'
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.marketComparison.marketPosition).toBe('Unknown');
      expect(result.valuationAnalysis.confidenceLevel).toBe('Low');
    });

    it('should handle very small properties', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 200000,
        totalSquareFootage: 800,
        propertyType: 'condo'
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.pricePerSquareFoot).toBe(250); // 200000 / 800
      expect(result.costBreakdown.pricePerBedroom).toBe(0); // No bedrooms specified
    });

    it('should handle very large properties', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 2000000,
        totalSquareFootage: 8000,
        propertyType: 'single_family'
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.pricePerSquareFoot).toBe(250); // 2000000 / 8000
    });

    it('should handle properties with many features', () => {
      const inputs: PricePerSquareFootInputs = {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        features: ['pool', 'garage', 'basement', 'fireplace', 'hardwood_floors', 'granite_countertops', 'updated_kitchen', 'energy_efficient', 'smart_home', 'mountain_view']
      };

      const result = calculatePricePerSquareFoot(inputs);
      
      expect(result.propertyScore.strengths.length).toBe(10);
      expect(result.valuationAnalysis.adjustmentFactors.features).toBeGreaterThan(0);
    });
  });
});