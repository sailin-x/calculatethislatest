import { describe, it, expect } from 'vitest';
import { IndustrialWarehouseProfitabilityCalculator } from './IndustrialWarehouseProfitabilityCalculator';
import { calculateIndustrialWarehouseProfitability } from './formulas';
import { validateIndustrialWarehouseProfitabilityInputs } from './validation';
import { validateAllIndustrialWarehouseProfitabilityInputs } from './quickValidation';

describe('Industrial Warehouse Profitability Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(IndustrialWarehouseProfitabilityCalculator.id).toBe('industrial-warehouse-profitability-calculator');
      expect(IndustrialWarehouseProfitabilityCalculator.name).toBe('Industrial Warehouse Profitability Calculator');
      expect(IndustrialWarehouseProfitabilityCalculator.category).toBe('finance');
      expect(IndustrialWarehouseProfitabilityCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = IndustrialWarehouseProfitabilityCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'totalSquareFootage')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = IndustrialWarehouseProfitabilityCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalInvestment');
      expect(outputIds).toContain('netOperatingIncome');
      expect(outputIds).toContain('capRate');
      expect(outputIds).toContain('cashOnCashReturn');
      expect(outputIds).toContain('profitabilityScore');
      expect(outputIds).toContain('riskScore');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof IndustrialWarehouseProfitabilityCalculator.calculate).toBe('function');
      expect(typeof IndustrialWarehouseProfitabilityCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateIndustrialWarehouseProfitabilityInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total square footage is required');
    });

    it('should validate total square footage range', () => {
      const result = validateIndustrialWarehouseProfitabilityInputs({
        totalSquareFootage: 500
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total square footage must be between 1,000 and 1,000,000 sqft');
    });

    it('should validate warehouse type', () => {
      const result = validateIndustrialWarehouseProfitabilityInputs({
        totalSquareFootage: 50000,
        warehouseType: 'invalid-type'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid warehouse type');
    });

    it('should validate rental rate range', () => {
      const result = validateIndustrialWarehouseProfitabilityInputs({
        totalSquareFootage: 50000,
        rentalRate: 60
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rental rate must be between $1 and $50 per sqft/year');
    });

    it('should validate financing rate range', () => {
      const result = validateIndustrialWarehouseProfitabilityInputs({
        totalSquareFootage: 50000,
        financingRate: 25
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Financing rate must be 20% or less');
    });

    it('should accept valid inputs', () => {
      const result = validateIndustrialWarehouseProfitabilityInputs({
        totalSquareFootage: 50000,
        warehouseType: 'distribution-center',
        rentalRate: 8,
        financingRate: 6
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic metrics correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        warehouseType: 'distribution-center',
        rentalRate: 8,
        vacancyRate: 5,
        constructionCost: 80,
        landCost: 2000000,
        financingRate: 6,
        downPayment: 25
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);

      expect(outputs.totalInvestment).toBeGreaterThan(0);
      expect(outputs.annualRevenue).toBeGreaterThan(0);
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
      expect(outputs.capRate).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
      expect(outputs.profitabilityScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
    });

    it('should calculate construction costs correctly', () => {
      const inputs = {
        totalSquareFootage: 100000,
        constructionCost: 100
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.constructionCostTotal).toBe(10000000); // 100,000 * 100
    });

    it('should calculate revenue correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        rentalRate: 10,
        vacancyRate: 10
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      const expectedRevenue = 50000 * 10 * (1 - 10 / 100); // 450,000
      expect(outputs.annualRevenue).toBe(Math.round(expectedRevenue));
    });

    it('should calculate cap rate correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 5,
        constructionCost: 80,
        landCost: 2000000
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.capRate).toBeGreaterThan(0);
      expect(outputs.capRate).toBeLessThan(20); // Should be reasonable cap rate
    });

    it('should handle different warehouse types', () => {
      const baseInputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 5
      };

      const distributionResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        warehouseType: 'distribution-center'
      });

      const coldStorageResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        warehouseType: 'cold-storage'
      });

      expect(distributionResult.totalInvestment).toBeLessThan(coldStorageResult.totalInvestment);
    });

    it('should calculate profitability score correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 5,
        constructionCost: 80,
        landCost: 2000000,
        financingRate: 6,
        downPayment: 25
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.profitabilityScore).toBeGreaterThan(0);
      expect(outputs.profitabilityScore).toBeLessThanOrEqual(100);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        marketType: 'primary',
        competitionLevel: 'low',
        demandGrowth: 'growing',
        vacancyRate: 5,
        financingRate: 6,
        constructionTime: 12,
        regulatoryEnvironment: 'business-friendly'
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });
  });

  describe('Industrial Warehouse Profitability Analysis', () => {
    it('should generate analysis report', () => {
      const inputs = {
        totalSquareFootage: 50000,
        warehouseType: 'distribution-center',
        rentalRate: 8,
        vacancyRate: 5
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      const report = IndustrialWarehouseProfitabilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Industrial Warehouse Profitability Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Investment Overview');
      expect(report).toContain('Financial Performance');
      expect(report).toContain('Key Metrics');
    });

    it('should include recommendation in report', () => {
      const inputs = {
        totalSquareFootage: 50000,
        warehouseType: 'distribution-center',
        rentalRate: 8,
        vacancyRate: 5
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      const report = IndustrialWarehouseProfitabilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Recommendation:');
      expect(outputs.recommendation).toBeTruthy();
    });

    it('should include cost breakdown in report', () => {
      const inputs = {
        totalSquareFootage: 50000,
        constructionCost: 80,
        landCost: 2000000
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      const report = IndustrialWarehouseProfitabilityCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Cost Breakdown');
      expect(report).toContain('Land Cost:');
      expect(report).toContain('Construction Cost:');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero vacancy rate', () => {
      const inputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 0
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.annualRevenue).toBe(50000 * 8);
    });

    it('should handle high vacancy rate', () => {
      const inputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 20
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.annualRevenue).toBe(50000 * 8 * 0.8);
    });

    it('should handle zero financing rate', () => {
      const inputs = {
        totalSquareFootage: 50000,
        financingRate: 0,
        downPayment: 25
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });

    it('should handle 100% down payment', () => {
      const inputs = {
        totalSquareFootage: 50000,
        downPayment: 100
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.loanAmount).toBe(0);
      expect(outputs.monthlyPayment).toBe(0);
    });

    it('should handle minimum square footage', () => {
      const inputs = {
        totalSquareFootage: 1000,
        rentalRate: 8
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.annualRevenue).toBe(1000 * 8);
    });

    it('should handle maximum square footage', () => {
      const inputs = {
        totalSquareFootage: 1000000,
        rentalRate: 8
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.annualRevenue).toBe(1000000 * 8);
    });
  });

  describe('Quick Validation', () => {
    it('should validate total square footage quickly', () => {
      const result = validateTotalSquareFootage(500);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between 1,000 and 1,000,000 sqft');

      const validResult = validateTotalSquareFootage(50000);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate warehouse type quickly', () => {
      const result = validateWarehouseType('invalid-type');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Invalid warehouse type');

      const validResult = validateWarehouseType('distribution-center');
      expect(validResult.isValid).toBe(true);
    });

    it('should validate rental rate quickly', () => {
      const result = validateRentalRate(60);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('between $1 and $50');

      const validResult = validateRentalRate(8);
      expect(validResult.isValid).toBe(true);
    });

    it('should validate all inputs quickly', () => {
      const inputs = {
        totalSquareFootage: 500,
        warehouseType: 'invalid-type',
        rentalRate: 60
      };

      const result = validateAllIndustrialWarehouseProfitabilityInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass validation for valid inputs', () => {
      const inputs = {
        totalSquareFootage: 50000,
        warehouseType: 'distribution-center',
        rentalRate: 8,
        financingRate: 6
      };

      const result = validateAllIndustrialWarehouseProfitabilityInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Market Factors', () => {
    it('should handle different market types', () => {
      const baseInputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 5
      };

      const primaryResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        marketType: 'primary'
      });

      const secondaryResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        marketType: 'secondary'
      });

      expect(primaryResult.riskScore).toBeLessThan(secondaryResult.riskScore);
    });

    it('should handle different competition levels', () => {
      const baseInputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 5
      };

      const lowCompetitionResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        competitionLevel: 'low'
      });

      const highCompetitionResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        competitionLevel: 'high'
      });

      expect(lowCompetitionResult.riskScore).toBeLessThan(highCompetitionResult.riskScore);
    });

    it('should handle different demand growth scenarios', () => {
      const baseInputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        vacancyRate: 5
      };

      const growingResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        demandGrowth: 'growing'
      });

      const decliningResult = calculateIndustrialWarehouseProfitability({
        ...baseInputs,
        demandGrowth: 'declining'
      });

      expect(growingResult.riskScore).toBeLessThan(decliningResult.riskScore);
    });
  });

  describe('Financial Metrics', () => {
    it('should calculate break-even occupancy correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        rentalRate: 8,
        operatingExpenses: 2.5,
        propertyTaxes: 1.2,
        insurance: 0.3,
        maintenance: 0.8,
        annualUtilities: 0.2
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      const totalExpenses = 50000 * (2.5 + 1.2 + 0.3 + 0.8 + 0.2);
      const expectedBreakEven = (totalExpenses / (50000 * 8)) * 100;

      expect(outputs.breakEvenOccupancy).toBeCloseTo(expectedBreakEven, 1);
    });

    it('should calculate break-even rent correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        vacancyRate: 5,
        operatingExpenses: 2.5,
        propertyTaxes: 1.2,
        insurance: 0.3,
        maintenance: 0.8,
        annualUtilities: 0.2
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      const totalExpenses = 50000 * (2.5 + 1.2 + 0.3 + 0.8 + 0.2);
      const expectedBreakEvenRent = totalExpenses / (50000 * (1 - 5 / 100));

      expect(outputs.breakEvenRent).toBeCloseTo(expectedBreakEvenRent, 1);
    });

    it('should calculate payback period correctly', () => {
      const inputs = {
        totalSquareFootage: 50000,
        constructionCost: 80,
        landCost: 2000000,
        rentalRate: 8,
        vacancyRate: 5
      };

      const outputs = calculateIndustrialWarehouseProfitability(inputs);
      expect(outputs.paybackPeriod).toBeGreaterThan(0);
    });
  });
});
