import { describe, it, expect } from 'vitest';
import { customerAcquisitionCostCalculator } from './CustomerAcquisitionCostCalculator';
import { CustomerAcquisitionCostInputs } from './types';

describe('CustomerAcquisitionCostCalculator', () => {
  const validInputs: CustomerAcquisitionCostInputs = {
    totalMarketingSpend: 50000,
    advertisingSpend: 25000,
    contentMarketingSpend: 5000,
    socialMediaSpend: 10000,
    emailMarketingSpend: 5000,
    seoSemSpend: 10000,
    influencerSpend: 5000,
    affiliateSpend: 3000,
    eventSpend: 2000,
    prSpend: 1000,
    salesTeamCosts: 30000,
    salesCommission: 15000,
    salesToolsCosts: 5000,
    leadGenerationCosts: 8000,
    marketingTeamCosts: 25000,
    marketingToolsCosts: 3000,
    creativeAgencyCosts: 10000,
    analyticsToolsCosts: 2000,
    newCustomersAcquired: 200,
    qualifiedLeads: 800,
    conversionRate: 2.5,
    leadToCustomerRate: 25,
    timePeriod: 'month',
    periodLength: 1,
    industry: 'saas',
    customerLifetimeValue: 2400
  };

  describe('Basic CAC Calculation', () => {
    it('should calculate basic CAC correctly', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.totalCAC).toBe(400); // (50000 + 30000) / 200
      expect(result.averageCAC).toBe(400);
      expect(result.marginalCAC).toBe(480); // 400 * 1.2
    });

    it('should handle zero customers gracefully', () => {
      const inputsWithZeroCustomers = { ...validInputs, newCustomersAcquired: 0 };
      expect(() => customerAcquisitionCostCalculator.calculate(inputsWithZeroCustomers)).toThrow();
    });
  });

  describe('Efficiency Metrics', () => {
    it('should calculate efficiency metrics', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.marketingEfficiency).toBeGreaterThan(0);
      expect(result.salesEfficiency).toBeGreaterThan(0);
      expect(result.overallEfficiency).toBeGreaterThan(0);
    });
  });

  describe('ROI and Profitability', () => {
    it('should calculate ROI metrics with LTV', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.cacROI).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.profitabilityScore).toBeGreaterThan(0);
    });

    it('should handle missing LTV gracefully', () => {
      const inputsWithoutLTV = { ...validInputs, customerLifetimeValue: undefined };
      const result = customerAcquisitionCostCalculator.calculate(inputsWithoutLTV);

      expect(result.cacROI).toBe(0);
      expect(result.paybackPeriod).toBe(0);
    });
  });

  describe('Performance Metrics', () => {
    it('should calculate LTV/CAC ratio', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.performanceMetrics.ltvCacRatio).toBe(6); // 2400 / 400
      expect(result.performanceMetrics.costPerLead).toBe(100); // (50000 + 30000) / 800
    });
  });

  describe('Cost Breakdown', () => {
    it('should analyze cost breakdown', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.costBreakdown).toBeDefined();
      expect(result.costBreakdown.length).toBeGreaterThan(0);
      expect(result.costBreakdown[0]).toHaveProperty('category');
      expect(result.costBreakdown[0]).toHaveProperty('amount');
      expect(result.costBreakdown[0]).toHaveProperty('percentage');
    });
  });

  describe('Industry Benchmarks', () => {
    it('should provide SaaS industry benchmarks', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.industryBenchmarks).toBeDefined();
      expect(result.industryBenchmarks.length).toBeGreaterThan(0);
      expect(result.industryBenchmarks[0]).toHaveProperty('metric');
      expect(result.industryBenchmarks[0]).toHaveProperty('yourValue');
      expect(result.industryBenchmarks[0]).toHaveProperty('industryAverage');
    });
  });

  describe('Optimization Opportunities', () => {
    it('should identify optimization opportunities', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.optimizationOpportunities).toBeDefined();
      expect(Array.isArray(result.optimizationOpportunities)).toBe(true);
    });
  });

  describe('Strategy Recommendations', () => {
    it('should provide strategic recommendations', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.strategyRecommendations).toBeDefined();
      expect(result.strategyRecommendations.length).toBeGreaterThan(0);
      expect(result.strategyRecommendations[0]).toHaveProperty('category');
      expect(result.strategyRecommendations[0]).toHaveProperty('recommendations');
    });
  });

  describe('Comprehensive Report', () => {
    it('should generate a comprehensive report', () => {
      const result = customerAcquisitionCostCalculator.calculate(validInputs);

      expect(result.report).toBeDefined();
      expect(typeof result.report).toBe('string');
      expect(result.report.length).toBeGreaterThan(0);
      expect(result.report).toContain('Customer Acquisition Cost Analysis Report');
    });
  });

  describe('Input Validation', () => {
    it('should reject invalid inputs', () => {
      const invalidInputs = { ...validInputs, totalMarketingSpend: -1000 };
      expect(() => customerAcquisitionCostCalculator.calculate(invalidInputs)).toThrow();
    });

    it('should reject zero customers', () => {
      const invalidInputs = { ...validInputs, newCustomersAcquired: 0 };
      expect(() => customerAcquisitionCostCalculator.calculate(invalidInputs)).toThrow();
    });

    it('should reject negative conversion rate', () => {
      const invalidInputs = { ...validInputs, conversionRate: -5 };
      expect(() => customerAcquisitionCostCalculator.calculate(invalidInputs)).toThrow();
    });
  });

  describe('Calculator Properties', () => {
    it('should have correct calculator properties', () => {
      expect(customerAcquisitionCostCalculator.id).toBe('customer-acquisition-cost');
      expect(customerAcquisitionCostCalculator.title).toBe('Customer Acquisition Cost Calculator');
      expect(customerAcquisitionCostCalculator.category).toBe('business');
      expect(customerAcquisitionCostCalculator.inputs).toBeDefined();
      expect(customerAcquisitionCostCalculator.outputs).toBeDefined();
    });

    it('should have proper input definitions', () => {
      expect(customerAcquisitionCostCalculator.inputs.length).toBeGreaterThan(0);
      const totalMarketingSpendInput = customerAcquisitionCostCalculator.inputs.find(
        input => input.id === 'totalMarketingSpend'
      );
      expect(totalMarketingSpendInput).toBeDefined();
      expect(totalMarketingSpendInput?.required).toBe(true);
    });

    it('should have proper output definitions', () => {
      expect(customerAcquisitionCostCalculator.outputs.length).toBeGreaterThan(0);
      const totalCACOutput = customerAcquisitionCostCalculator.outputs.find(
        output => output.id === 'totalCAC'
      );
      expect(totalCACOutput).toBeDefined();
      expect(totalCACOutput?.type).toBe('currency');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very high CAC', () => {
      const highCACInputs = { ...validInputs, totalMarketingSpend: 200000, newCustomersAcquired: 10 };
      const result = customerAcquisitionCostCalculator.calculate(highCACInputs);

      expect(result.totalCAC).toBe(23000); // (200000 + 30000) / 10
      expect(result.optimizationOpportunities.length).toBeGreaterThan(0);
    });

    it('should handle very low conversion rate', () => {
      const lowConversionInputs = { ...validInputs, conversionRate: 0.1 };
      const result = customerAcquisitionCostCalculator.calculate(lowConversionInputs);

      expect(result.optimizationOpportunities.length).toBeGreaterThan(0);
    });

    it('should handle missing optional fields', () => {
      const minimalInputs: CustomerAcquisitionCostInputs = {
        totalMarketingSpend: 50000,
        advertisingSpend: 0,
        contentMarketingSpend: 0,
        socialMediaSpend: 0,
        emailMarketingSpend: 0,
        seoSemSpend: 0,
        influencerSpend: 0,
        affiliateSpend: 0,
        eventSpend: 0,
        prSpend: 0,
        salesTeamCosts: 30000,
        salesCommission: 0,
        salesToolsCosts: 0,
        leadGenerationCosts: 0,
        marketingTeamCosts: 0,
        marketingToolsCosts: 0,
        creativeAgencyCosts: 0,
        analyticsToolsCosts: 0,
        newCustomersAcquired: 200,
        qualifiedLeads: 0,
        conversionRate: 2.5,
        leadToCustomerRate: 0,
        timePeriod: 'month',
        periodLength: 1
      };
      const result = customerAcquisitionCostCalculator.calculate(minimalInputs);

      expect(result.totalCAC).toBeDefined();
      expect(result.report).toBeDefined();
    });
  });
});