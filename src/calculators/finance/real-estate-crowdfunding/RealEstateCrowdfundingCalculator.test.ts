import { describe, it, expect } from 'vitest';
import { realEstateCrowdfundingCalculator } from './RealEstateCrowdfundingCalculator';
import { calculateRealEstateCrowdfunding, calculateYearsBetween, calculateMonthsBetween } from './formulas';
import { validateRealEstateCrowdfundingInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Real Estate Crowdfunding Calculator', () => {
  describe('calculateRealEstateCrowdfunding', () => {
    it('should calculate basic equity investment correctly', () => {
      const inputs = {
        investmentAmount: 50000,
        projectType: 'equity' as const,
        investmentTerm: 5,
        expectedAnnualReturn: 12,
        propertyValue: 2000000,
        propertyType: 'residential' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'medium' as const,
        liquidity: 'low' as const,
        calculationType: 'basic' as const
      };

      const result = calculateRealEstateCrowdfunding(inputs);

      expect(result.totalReturn).toBeCloseTo(60000, 0);
      expect(result.totalReturnPercentage).toBeCloseTo(120, 0);
      expect(result.annualizedReturn).toBeCloseTo(17.1, 1);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeCloseTo(12, 0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeGreaterThan(0);
      expect(result.exitValue).toBeCloseTo(80000, 0);
      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.investmentAnalysis).toBeDefined();
    });

    it('should calculate debt investment correctly', () => {
      const inputs = {
        investmentAmount: 100000,
        projectType: 'debt' as const,
        investmentTerm: 3,
        expectedAnnualReturn: 8,
        propertyValue: 1500000,
        propertyType: 'commercial' as const,
        location: 'secondary_market' as const,
        cashFlowFrequency: 'monthly' as const,
        exitStrategy: 'refinance' as const,
        riskLevel: 'medium_low' as const,
        liquidity: 'medium' as const,
        calculationType: 'detailed' as const
      };

      const result = calculateRealEstateCrowdfunding(inputs);

      expect(result.totalReturn).toBeCloseTo(35600, 0);
      expect(result.totalReturnPercentage).toBeCloseTo(35.6, 0);
      expect(result.annualizedReturn).toBeCloseTo(10.7, 1);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeCloseTo(8, 0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeGreaterThan(0);
      expect(result.exitValue).toBeCloseTo(111600, 0);
      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.investmentAnalysis).toBeDefined();
    });

    it('should handle exit-only cash flow correctly', () => {
      const inputs = {
        investmentAmount: 25000,
        projectType: 'equity' as const,
        investmentTerm: 4,
        expectedAnnualReturn: 15,
        propertyValue: 800000,
        propertyType: 'land' as const,
        location: 'tertiary_market' as const,
        cashFlowFrequency: 'exit_only' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'high' as const,
        liquidity: 'illiquid' as const,
        calculationType: 'risk_adjusted' as const
      };

      const result = calculateRealEstateCrowdfunding(inputs);

      expect(result.totalReturn).toBeCloseTo(15000, 0);
      expect(result.totalReturnPercentage).toBeCloseTo(60, 0);
      expect(result.annualizedReturn).toBeCloseTo(12.5, 1);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeCloseTo(0, 0); // Exit-only means no cash flow during term
      expect(result.totalCashFlow).toBeCloseTo(0, 0); // Exit-only means no cash flow during term
      expect(result.monthlyCashFlow).toBeCloseTo(0, 0); // Exit-only means no cash flow during term
      expect(result.exitValue).toBeCloseTo(40000, 0);
      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBe(Infinity); // Payback period is Infinity for exit-only investments
      expect(result.investmentAnalysis).toBeDefined();
    });

    it('should calculate risk-adjusted returns correctly', () => {
      const inputs = {
        investmentAmount: 75000,
        projectType: 'preferred_equity' as const,
        investmentTerm: 6,
        expectedAnnualReturn: 10,
        propertyValue: 3000000,
        propertyType: 'mixed_use' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'ipo' as const,
        riskLevel: 'medium_high' as const,
        liquidity: 'low' as const,
        calculationType: 'risk_adjusted' as const
      };

      const result = calculateRealEstateCrowdfunding(inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.totalReturnPercentage).toBeGreaterThan(0);
      expect(result.annualizedReturn).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeGreaterThan(0);
      expect(result.exitValue).toBeGreaterThan(0);
      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.investmentAnalysis).toBeDefined();
    });

    it('should handle different exit strategies correctly', () => {
      const inputs = {
        investmentAmount: 60000,
        projectType: 'equity' as const,
        investmentTerm: 7,
        expectedAnnualReturn: 14,
        propertyValue: 2500000,
        propertyType: 'office' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'semi_annual' as const,
        exitStrategy: 'merger' as const,
        riskLevel: 'high' as const,
        liquidity: 'illiquid' as const,
        calculationType: 'comparison' as const
      };

      const result = calculateRealEstateCrowdfunding(inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.totalReturnPercentage).toBeGreaterThan(0);
      expect(result.annualizedReturn).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeGreaterThan(0);
      expect(result.exitValue).toBeGreaterThan(0);
      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.investmentAnalysis).toBeDefined();
    });
  });

  describe('Additional calculation functions', () => {
    it('should calculate years between dates', () => {
      const years = calculateYearsBetween('2020-01-01', '2024-01-01');
      expect(years).toBeCloseTo(4, 1);
    });

    it('should calculate months between dates', () => {
      const months = calculateMonthsBetween('2023-01-01', '2024-06-01');
      expect(months).toBe(17);
    });
  });

  describe('validateRealEstateCrowdfundingInputs', () => {
    it('should validate required fields', () => {
      const inputs = {};
      const errors = validateRealEstateCrowdfundingInputs(inputs);
      expect(errors).toContain('Investment Amount is required');
      expect(errors).toContain('Project Type is required');
      expect(errors).toContain('Investment Term is required');
      expect(errors).toContain('Expected Annual Return is required');
      expect(errors).toContain('Property Value is required');
      expect(errors).toContain('Property Type is required');
      expect(errors).toContain('Location is required');
      expect(errors).toContain('Cash Flow Frequency is required');
      expect(errors).toContain('Exit Strategy is required');
      expect(errors).toContain('Risk Level is required');
      expect(errors).toContain('Liquidity is required');
      expect(errors).toContain('Calculation Type is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        investmentAmount: -1000,
        investmentTerm: 0.5,
        expectedAnnualReturn: 3,
        propertyValue: 50000,
        platformFees: 15,
        managementFees: 8,
        marketAppreciation: -15,
        inflationRate: 12
      };
      const errors = validateRealEstateCrowdfundingInputs(inputs);
      expect(errors).toContain('Investment Amount must be positive');
      expect(errors).toContain('Investment Term must be between 1 and 20 years');
      expect(errors).toContain('Expected Annual Return must be between 5% and 25%');
      expect(errors).toContain('Property Value must be between $100,000 and $10,000,000');
      expect(errors).toContain('Platform Fees must be between 0% and 10%');
      expect(errors).toContain('Management Fees must be between 0% and 5%');
      expect(errors).toContain('Market Appreciation must be between -10% and 15%');
      expect(errors).toContain('Inflation Rate must be between 0% and 10%');
    });

    it('should validate business logic', () => {
      const inputs = {
        investmentAmount: 500, // Small amount to trigger "too small" error
        projectType: 'debt' as const,
        investmentTerm: 5,
        expectedAnnualReturn: 30,
        propertyValue: 1000000,
        propertyType: 'residential' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'low' as const,
        liquidity: 'low' as const,
        calculationType: 'basic' as const
      };
      const errors = validateRealEstateCrowdfundingInputs(inputs);
      expect(errors).toContain('Investment amount seems unusually low compared to property value');
      expect(errors).toContain('Debt investments typically have lower returns than equity investments');
      expect(errors).toContain('Expected return seems inconsistent with low risk level');
    });

    it('should validate cross-field consistency', () => {
      const inputs = {
        investmentAmount: 100000,
        propertyValue: 2000000,
        platformFees: 8,
        managementFees: 4,
        expectedAnnualReturn: 25,
        inflationRate: 8
      };
      const errors = validateRealEstateCrowdfundingInputs(inputs);
      expect(errors).toContain('Total fees seem unusually high');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        investmentAmount: 50000,
        projectType: 'equity' as const,
        investmentTerm: 5,
        expectedAnnualReturn: 12,
        propertyValue: 2000000,
        propertyType: 'residential' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'medium' as const,
        liquidity: 'low' as const,
        calculationType: 'basic' as const
      };

      const errors = validateRealEstateCrowdfundingInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        investmentAmount: 50000,
        projectType: 'equity' as const,
        investmentTerm: 5,
        expectedAnnualReturn: 12,
        propertyValue: 2000000,
        propertyType: 'residential' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'medium' as const,
        liquidity: 'low' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(21); // All input fields plus additional validations
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        investmentAmount: -1000, // Invalid
        projectType: 'equity' as const,
        investmentTerm: 5,
        expectedAnnualReturn: 12,
        propertyValue: 2000000,
        propertyType: 'residential' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'medium' as const,
        liquidity: 'low' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      const investmentAmountResult = results[0];
      expect(investmentAmountResult.isValid).toBe(false);
      expect(investmentAmountResult.message).toContain('must be positive');
    });

    it('should validate investment ratio', () => {
      const inputs = {
        investmentAmount: 50000,
        projectType: 'equity' as const,
        investmentTerm: 5,
        expectedAnnualReturn: 12,
        propertyValue: 2000000,
        propertyType: 'residential' as const,
        location: 'primary_market' as const,
        cashFlowFrequency: 'quarterly' as const,
        exitStrategy: 'sale' as const,
        riskLevel: 'medium' as const,
        liquidity: 'low' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      const investmentRatioResult = results[17]; // Investment ratio calculation
      expect(investmentRatioResult.isValid).toBe(true);
      expect(investmentRatioResult.message).toContain('Investment ratio: 2.5%');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(realEstateCrowdfundingCalculator.id).toBe('real-estate-crowdfunding');
      expect(realEstateCrowdfundingCalculator.title).toBe('Real Estate Crowdfunding Calculator');
      expect(realEstateCrowdfundingCalculator.category).toBe('finance');
      expect(realEstateCrowdfundingCalculator.subcategory).toBe('real-estate');
      expect(realEstateCrowdfundingCalculator.inputs).toHaveLength(17);
      expect(realEstateCrowdfundingCalculator.outputs).toHaveLength(12);
      expect(realEstateCrowdfundingCalculator.formulas).toHaveLength(1);
      expect(realEstateCrowdfundingCalculator.validationRules).toBeDefined();
      expect(realEstateCrowdfundingCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = realEstateCrowdfundingCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(12); // All required fields
    });

    it('should have correct output structure', () => {
      const outputs = realEstateCrowdfundingCalculator.outputs;
      expect(outputs.find(o => o.id === 'totalReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalReturnPercentage')).toBeDefined();
      expect(outputs.find(o => o.id === 'annualizedReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'netPresentValue')).toBeDefined();
      expect(outputs.find(o => o.id === 'internalRateOfReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'cashOnCashReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalCashFlow')).toBeDefined();
      expect(outputs.find(o => o.id === 'monthlyCashFlow')).toBeDefined();
      expect(outputs.find(o => o.id === 'exitValue')).toBeDefined();
      expect(outputs.find(o => o.id === 'riskAdjustedReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'paybackPeriod')).toBeDefined();
      expect(outputs.find(o => o.id === 'investmentAnalysis')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = realEstateCrowdfundingCalculator.examples[0];
      const result = calculateRealEstateCrowdfunding(example.inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.totalReturnPercentage).toBeGreaterThan(0);
      expect(result.annualizedReturn).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(-100000);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThanOrEqual(0);
      expect(result.totalCashFlow).toBeGreaterThanOrEqual(0);
      expect(result.monthlyCashFlow).toBeGreaterThanOrEqual(0);
      expect(result.exitValue).toBeGreaterThan(0);
      expect(result.riskAdjustedReturn).toBeGreaterThanOrEqual(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.investmentAnalysis).toBeDefined();
    });

    it('should validate calculator examples', () => {
      realEstateCrowdfundingCalculator.examples.forEach(example => {
        const errors = validateRealEstateCrowdfundingInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      realEstateCrowdfundingCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});