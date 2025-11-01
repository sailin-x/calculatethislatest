import { describe, it, expect } from 'vitest';
import { CapitalStructureOptimizationCalculator } from './CapitalStructureOptimizationCalculator';
import { calculateCapitalStructureOptimization } from './formulas';
import { validateCapitalStructureOptimizationInputs } from './validation';
import { validateAllCapitalStructureOptimizationInputs } from './quickValidation';

describe('Capital Structure Optimization Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CapitalStructureOptimizationCalculator.id).toBe('capital-structure-optimization');
      expect(CapitalStructureOptimizationCalculator.title).toBe('Capital Structure Optimization Calculator');
      expect(CapitalStructureOptimizationCalculator.category).toBe('finance');
      expect(CapitalStructureOptimizationCalculator.subcategory).toBe('corporate-finance');
    });

    it('should have required inputs', () => {
      const requiredInputs = CapitalStructureOptimizationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'totalAssets')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = CapitalStructureOptimizationCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('optimalDebtRatio');
      expect(outputIds).toContain('weightedAverageCostOfCapital');
      expect(outputIds).toContain('enterpriseValue');
    });

    it('should have calculate function', () => {
      expect(typeof CapitalStructureOptimizationCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof CapitalStructureOptimizationCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateAllCapitalStructureOptimizationInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate total assets range', () => {
      const result = validateAllCapitalStructureOptimizationInputs({ totalAssets: 50000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between $100,000 and $100,000,000,000');
    });

    it('should validate beta range', () => {
      const result = validateAllCapitalStructureOptimizationInputs({
        totalAssets: 1000000,
        beta: 6
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be less than or equal to 5');
    });

    it('should accept valid inputs', () => {
      const validInputs = {
        totalAssets: 10000000,
        totalDebt: 3000000,
        totalEquity: 7000000,
        costOfDebt: 0.05,
        costOfEquity: 0.12,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        targetDebtRatio: 0.4,
        currentDebtRatio: 0.3,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Technology',
        creditRating: 'BBB'
      };
      const result = validateAllCapitalStructureOptimizationInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate optimal capital structure correctly', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 3000000,
        totalEquity: 7000000,
        costOfDebt: 0.05,
        costOfEquity: 0.12,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        targetDebtRatio: 0.4,
        currentDebtRatio: 0.3,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Technology',
        creditRating: 'BBB'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);

      expect(outputs.optimalDebtRatio).toBeGreaterThanOrEqual(0);
      expect(outputs.optimalDebtRatio).toBeLessThanOrEqual(1);
      expect(outputs.weightedAverageCostOfCapital).toBeGreaterThan(0);
      expect(outputs.costOfEquity).toBeGreaterThan(0);
      expect(outputs.costOfDebtAfterTax).toBeGreaterThan(0);
      expect(outputs.enterpriseValue).toBeGreaterThan(0);
    });

    it('should calculate WACC correctly', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 4000000,
        totalEquity: 6000000,
        costOfDebt: 0.06,
        costOfEquity: 0.10,
        taxRate: 0.30,
        riskFreeRate: 0.04,
        marketRiskPremium: 0.06,
        beta: 1.0,
        targetDebtRatio: 0.4,
        currentDebtRatio: 0.4,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Manufacturing',
        creditRating: 'A'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);

      // WACC should be between cost of debt and cost of equity
      expect(outputs.weightedAverageCostOfCapital).toBeGreaterThan(outputs.costOfDebtAfterTax);
      expect(outputs.weightedAverageCostOfCapital).toBeLessThan(outputs.costOfEquity);
    });

    it('should generate sensitivity analysis', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 3000000,
        totalEquity: 7000000,
        costOfDebt: 0.05,
        costOfEquity: 0.12,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        targetDebtRatio: 0.4,
        currentDebtRatio: 0.3,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Technology',
        creditRating: 'BBB'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);

      expect(outputs.sensitivityAnalysis.debtRatioRange).toBeDefined();
      expect(outputs.sensitivityAnalysis.waccRange).toBeDefined();
      expect(outputs.sensitivityAnalysis.firmValueRange).toBeDefined();
      expect(outputs.sensitivityAnalysis.debtRatioRange.length).toBeGreaterThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive report', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 3000000,
        totalEquity: 7000000,
        costOfDebt: 0.05,
        costOfEquity: 0.12,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        targetDebtRatio: 0.4,
        currentDebtRatio: 0.3,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Technology',
        creditRating: 'BBB'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);
      const report = CapitalStructureOptimizationCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Capital Structure Optimization Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Findings');
      expect(report).toContain('Recommendations');
    });

    it('should include optimal debt ratio in report', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 3000000,
        totalEquity: 7000000,
        costOfDebt: 0.05,
        costOfEquity: 0.12,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        targetDebtRatio: 0.4,
        currentDebtRatio: 0.3,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Technology',
        creditRating: 'BBB'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);
      const report = CapitalStructureOptimizationCalculator.generateReport(inputs, outputs);

      expect(report).toContain(`${(outputs.optimalDebtRatio * 100).toFixed(1)}%`);
      expect(report).toContain(`${(outputs.weightedAverageCostOfCapital * 100).toFixed(2)}%`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero debt scenario', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 0,
        totalEquity: 10000000,
        costOfDebt: 0.05,
        costOfEquity: 0.12,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        targetDebtRatio: 0.0,
        currentDebtRatio: 0.0,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'private',
        industry: 'Consulting',
        creditRating: 'AAA'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);

      expect(outputs.optimalDebtRatio).toBeGreaterThanOrEqual(0);
      expect(outputs.enterpriseValue).toBeGreaterThan(0);
    });

    it('should handle high debt scenario', () => {
      const inputs = {
        totalAssets: 10000000,
        totalDebt: 8000000,
        totalEquity: 2000000,
        costOfDebt: 0.08,
        costOfEquity: 0.15,
        taxRate: 0.25,
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.5,
        targetDebtRatio: 0.8,
        currentDebtRatio: 0.8,
        analysisPeriod: 5,
        inflationRate: 0.02,
        growthRate: 0.03,
        companyType: 'public',
        industry: 'Real Estate',
        creditRating: 'BB'
      };

      const outputs = calculateCapitalStructureOptimization(inputs);

      expect(outputs.optimalDebtRatio).toBeLessThanOrEqual(1);
      expect(outputs.enterpriseValue).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const totalAssetsResult = validateAllCapitalStructureOptimizationInputs({ totalAssets: 10000000 });
      expect(totalAssetsResult.isValid).toBe(false); // Should fail because other required fields are missing

      const invalidBetaResult = validateAllCapitalStructureOptimizationInputs({
        totalAssets: 10000000,
        beta: 6
      });
      expect(invalidBetaResult.isValid).toBe(false);
    });

    it('should catch multiple validation errors', () => {
      const inputs = {
        totalAssets: 50000, // Too low
        beta: 6, // Too high
        taxRate: 1.5 // Too high
      };

      const result = validateAllCapitalStructureOptimizationInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});