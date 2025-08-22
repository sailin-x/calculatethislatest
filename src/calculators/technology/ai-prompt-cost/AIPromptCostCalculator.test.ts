import { describe, it, expect } from 'vitest';
import { AIPromptCostCalculator } from './AIPromptCostCalculator';
import type { AIPromptCostInputs } from './types';

describe('AIPromptCostCalculator', () => {
  const calculator = new AIPromptCostCalculator();

  describe('Basic Functionality', () => {
    it('should calculate basic AI prompt costs correctly', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'one-time'
      };

      const result = calculator.calculate(inputs);

      expect(result.totalCost).toBeCloseTo(2.0, 6); // 1000 * 0.00002 * 100
      expect(result.costPerRequest).toBeCloseTo(0.02, 6);
      expect(result.totalTokens).toBe(100000);
      expect(result.costPerToken).toBeCloseTo(0.00002, 8);
    });

    it('should handle model presets correctly', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002, // This will be overridden by GPT-4 preset
        numberOfRequests: 100,
        modelType: 'gpt-4',
        usagePattern: 'daily'
      };

      const result = calculator.calculate(inputs);

      // GPT-4 has different input/output pricing
      expect(result.totalCost).toBeGreaterThan(2.0);
      expect(result.dailyCost).toBeGreaterThan(0);
      expect(result.monthlyCost).toBeGreaterThan(0);
      expect(result.costEfficiency).toContain('Premium');
    });

    it('should calculate separate input/output pricing', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000, // This will be ignored
        pricePerToken: 0.00002, // This will be ignored
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'monthly',
        inputTokens: 600,
        outputTokens: 400,
        inputPricePerToken: 0.000015,
        outputPricePerToken: 0.000060
      };

      const result = calculator.calculate(inputs);

      const expectedInputCost = 600 * 0.000015 * 100; // 0.9
      const expectedOutputCost = 400 * 0.000060 * 100; // 2.4
      const expectedTotal = expectedInputCost + expectedOutputCost; // 3.3

      expect(result.totalCost).toBeCloseTo(expectedTotal, 6);
      expect(result.totalTokens).toBe(100000); // (600 + 400) * 100
    });
  });

  describe('Usage Pattern Projections', () => {
    it('should calculate daily usage projections correctly', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'daily'
      };

      const result = calculator.calculate(inputs);

      expect(result.dailyCost).toBeCloseTo(2.0, 6);
      expect(result.monthlyCost).toBeCloseTo(60.0, 2); // 2 * 30
      expect(result.yearlyCost).toBeCloseTo(730.0, 2); // 2 * 365
    });

    it('should calculate weekly usage projections correctly', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 700, // Weekly batch
        modelType: 'custom',
        usagePattern: 'weekly'
      };

      const result = calculator.calculate(inputs);

      expect(result.dailyCost).toBeCloseTo(2.0, 2); // 14 / 7
      expect(result.monthlyCost).toBeCloseTo(60.0, 2); // 14 * (30/7)
      expect(result.yearlyCost).toBeCloseTo(728.0, 2); // 14 * 52
    });

    it('should handle one-time usage pattern', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'one-time'
      };

      const result = calculator.calculate(inputs);

      expect(result.dailyCost).toBe(0);
      expect(result.monthlyCost).toBe(0);
      expect(result.yearlyCost).toBe(0);
    });
  });

  describe('Cost Efficiency Assessment', () => {
    it('should assess cost efficiency for different models', () => {
      const cheapInputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.000001,
        numberOfRequests: 100,
        modelType: 'claude-3-haiku',
        usagePattern: 'daily'
      };

      const expensiveInputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.0001,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'daily'
      };

      const cheapResult = calculator.calculate(cheapInputs);
      const expensiveResult = calculator.calculate(expensiveInputs);

      expect(cheapResult.costEfficiency).toContain('Excellent');
      expect(expensiveResult.costEfficiency).toContain('Expensive');
    });
  });

  describe('Validation', () => {
    it('should throw error for invalid inputs', () => {
      const invalidInputs: AIPromptCostInputs = {
        tokensPerRequest: -1000, // Invalid: negative
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'daily'
      };

      expect(() => calculator.calculate(invalidInputs)).toThrow();
    });

    it('should throw error for missing required fields', () => {
      const invalidInputs = {
        tokensPerRequest: 1000,
        // Missing pricePerToken
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'daily'
      } as AIPromptCostInputs;

      expect(() => calculator.calculate(invalidInputs)).toThrow();
    });

    it('should throw error for incomplete separate pricing', () => {
      const invalidInputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'daily',
        inputTokens: 600,
        // Missing outputTokens, inputPricePerToken, outputPricePerToken
      };

      expect(() => calculator.calculate(invalidInputs)).toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small token counts', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1,
        pricePerToken: 0.000001,
        numberOfRequests: 1,
        modelType: 'custom',
        usagePattern: 'one-time'
      };

      const result = calculator.calculate(inputs);

      expect(result.totalCost).toBeCloseTo(0.000001, 8);
      expect(result.costPerRequest).toBeCloseTo(0.000001, 8);
    });

    it('should handle very large token counts', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 50000,
        pricePerToken: 0.00005,
        numberOfRequests: 1000,
        modelType: 'custom',
        usagePattern: 'monthly'
      };

      const result = calculator.calculate(inputs);

      expect(result.totalCost).toBeCloseTo(2500, 2);
      expect(result.totalTokens).toBe(50000000);
    });

    it('should handle zero optional values correctly', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'custom',
        usagePattern: 'daily',
        inputTokens: 0,
        outputTokens: 1000,
        inputPricePerToken: 0.000015,
        outputPricePerToken: 0.000060
      };

      const result = calculator.calculate(inputs);

      // Should only calculate output costs
      expect(result.totalCost).toBeCloseTo(6.0, 6); // 1000 * 0.000060 * 100
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive reports', () => {
      const inputs: AIPromptCostInputs = {
        tokensPerRequest: 1000,
        pricePerToken: 0.00002,
        numberOfRequests: 100,
        modelType: 'gpt-4',
        usagePattern: 'daily'
      };

      const result = calculator.calculate(inputs);

      expect(result.report).toContain('AI Prompt Cost & Token Analysis Report');
      expect(result.report).toContain('Executive Summary');
      expect(result.report).toContain('Configuration Details');
      expect(result.report).toContain('Cost Projections');
      expect(result.report).toContain('Budget Recommendations');
      expect(result.report).toContain('Risk Assessment');
    });
  });
});
