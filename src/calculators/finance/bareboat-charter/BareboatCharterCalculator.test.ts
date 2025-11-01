import { describe, it, expect, beforeEach } from 'vitest';
import { BareboatCharterCalculator } from './BareboatCharterCalculator';
import { calculateBareboatCharter, calculateTimeCharter, compareCharterOptions } from './formulas';
import { validateBareboatCharterInputs } from './validation';

describe('Bareboat Charter Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      vesselValue: 25000000,
      charterDuration: 24,
      bareboatRate: 12000,
      timeCharterRate: 22000,
      operatingCosts: 6000,
      insuranceCosts: 400,
      maintenanceReserve: 800,
      utilizationRate: 88,
      fuelPrice: 650,
      fuelConsumption: 18,
      crewCosts: 2500,
      portCharges: 600
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(BareboatCharterCalculator.id).toBe('BareboatCharterCalculator');
      expect(BareboatCharterCalculator.name).toBe('Bareboat Charter vs. Time Charter Calculator');
      expect(BareboatCharterCalculator.category).toBe('finance');
      expect(BareboatCharterCalculator.subcategory).toBe('maritime-finance');
    });

    it('should have all required inputs', () => {
      const inputIds = BareboatCharterCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'vesselValue', 'charterDuration', 'bareboatRate', 'timeCharterRate',
        'operatingCosts', 'insuranceCosts', 'maintenanceReserve', 'utilizationRate',
        'fuelPrice', 'fuelConsumption', 'crewCosts', 'portCharges'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = BareboatCharterCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'bareboatRevenue', 'bareboatProfit', 'bareboatROI',
        'timeCharterRevenue', 'timeCharterProfit', 'timeCharterROI',
        'profitDifference', 'recommendation', 'breakEvenUtilization', 'riskAnalysis'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(BareboatCharterCalculator.examples.length).toBeGreaterThan(0);
      BareboatCharterCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { vesselValue: 25000000 };
      const result = validateBareboatCharterInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate vessel value range', () => {
      const lowValueInputs = { ...validInputs, vesselValue: 50000 };
      const result = validateBareboatCharterInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('vessel value'))).toBe(true);
    });

    it('should validate charter duration range', () => {
      const shortDurationInputs = { ...validInputs, charterDuration: 0.5 };
      const result = validateBareboatCharterInputs(shortDurationInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('duration'))).toBe(true);
    });

    it('should validate utilization rate range', () => {
      const lowUtilizationInputs = { ...validInputs, utilizationRate: 30 };
      const result = validateBareboatCharterInputs(lowUtilizationInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('utilization'))).toBe(true);
    });

    it('should validate charter rates', () => {
      const lowRateInputs = { ...validInputs, bareboatRate: 500 };
      const result = validateBareboatCharterInputs(lowRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('rate'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highCostInputs = { ...validInputs, operatingCosts: 15000 };
      const result = validateBareboatCharterInputs(highCostInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateBareboatCharterInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate bareboat charter metrics correctly', () => {
      const metrics = calculateBareboatCharter(validInputs);
      
      expect(metrics.totalRevenue).toBeGreaterThan(0);
      expect(metrics.totalCosts).toBeGreaterThan(0);
      expect(metrics.netProfit).toBeDefined();
      expect(metrics.roi).toBeDefined();
      expect(metrics.dailyProfit).toBeDefined();
      
      // Verify revenue calculation
      const expectedRevenue = validInputs.bareboatRate * (validInputs.charterDuration * 30.44) * (validInputs.utilizationRate / 100);
      expect(Math.abs(metrics.totalRevenue - expectedRevenue)).toBeLessThan(1);
    });

    it('should calculate time charter metrics correctly', () => {
      const metrics = calculateTimeCharter(validInputs);
      
      expect(metrics.totalRevenue).toBeGreaterThan(0);
      expect(metrics.totalCosts).toBeGreaterThan(0);
      expect(metrics.netProfit).toBeDefined();
      expect(metrics.roi).toBeDefined();
      expect(metrics.dailyProfit).toBeDefined();
      
      // Verify revenue calculation
      const expectedRevenue = validInputs.timeCharterRate * (validInputs.charterDuration * 30.44) * (validInputs.utilizationRate / 100);
      expect(Math.abs(metrics.totalRevenue - expectedRevenue)).toBeLessThan(1);
    });

    it('should calculate cost breakdown correctly', () => {
      const bareboatMetrics = calculateBareboatCharter(validInputs);
      const timeCharterMetrics = calculateTimeCharter(validInputs);
      
      // Bareboat costs should include operating, insurance, and maintenance
      expect(bareboatMetrics.costBreakdown.operating).toBeGreaterThan(0);
      expect(bareboatMetrics.costBreakdown.insurance).toBeGreaterThan(0);
      expect(bareboatMetrics.costBreakdown.maintenance).toBeGreaterThan(0);
      
      // Time charter costs should include fuel, crew, and port charges
      expect(timeCharterMetrics.costBreakdown.fuel).toBeGreaterThan(0);
      expect(timeCharterMetrics.costBreakdown.crew).toBeGreaterThan(0);
      expect(timeCharterMetrics.costBreakdown.port).toBeGreaterThan(0);
    });

    it('should calculate ROI correctly', () => {
      const bareboatMetrics = calculateBareboatCharter(validInputs);
      const timeCharterMetrics = calculateTimeCharter(validInputs);
      
      const expectedBareboatROI = (bareboatMetrics.netProfit / validInputs.vesselValue) * 100;
      const expectedTimeCharterROI = (timeCharterMetrics.netProfit / validInputs.vesselValue) * 100;
      
      expect(Math.abs(bareboatMetrics.roi - expectedBareboatROI)).toBeLessThan(0.1);
      expect(Math.abs(timeCharterMetrics.roi - expectedTimeCharterROI)).toBeLessThan(0.1);
    });
  });

  describe('Comparison Logic', () => {
    it('should compare charter options correctly', () => {
      const bareboatMetrics = calculateBareboatCharter(validInputs);
      const timeCharterMetrics = calculateTimeCharter(validInputs);
      const comparison = compareCharterOptions(bareboatMetrics, timeCharterMetrics, validInputs);
      
      expect(comparison.profitDifference).toBeDefined();
      expect(comparison.recommendation).toBeDefined();
      expect(comparison.breakEvenUtilization).toBeDefined();
      expect(comparison.riskAnalysis).toBeDefined();
      
      // Verify profit difference calculation
      const expectedDifference = timeCharterMetrics.netProfit - bareboatMetrics.netProfit;
      expect(Math.abs(comparison.profitDifference - expectedDifference)).toBeLessThan(1);
    });

    it('should recommend time charter when more profitable', () => {
      const highTimeCharterInputs = { ...validInputs, timeCharterRate: 30000 };
      const bareboatMetrics = calculateBareboatCharter(highTimeCharterInputs);
      const timeCharterMetrics = calculateTimeCharter(highTimeCharterInputs);
      const comparison = compareCharterOptions(bareboatMetrics, timeCharterMetrics, highTimeCharterInputs);
      
      expect(comparison.recommendation).toBe('Time Charter');
    });

    it('should recommend bareboat when more profitable', () => {
      const lowTimeCharterInputs = { ...validInputs, timeCharterRate: 13000 };
      const bareboatMetrics = calculateBareboatCharter(lowTimeCharterInputs);
      const timeCharterMetrics = calculateTimeCharter(lowTimeCharterInputs);
      const comparison = compareCharterOptions(bareboatMetrics, timeCharterMetrics, lowTimeCharterInputs);
      
      expect(comparison.recommendation).toBe('Bareboat Charter');
    });

    it('should calculate break-even utilization correctly', () => {
      const bareboatMetrics = calculateBareboatCharter(validInputs);
      const timeCharterMetrics = calculateTimeCharter(validInputs);
      const comparison = compareCharterOptions(bareboatMetrics, timeCharterMetrics, validInputs);
      
      expect(comparison.breakEvenUtilization).toBeGreaterThan(0);
      expect(comparison.breakEvenUtilization).toBeLessThanOrEqual(100);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = BareboatCharterCalculator.calculate(validInputs);
      
      expect(result.bareboatRevenue).toBeGreaterThan(0);
      expect(result.bareboatProfit).toBeDefined();
      expect(result.bareboatROI).toBeDefined();
      expect(result.timeCharterRevenue).toBeGreaterThan(0);
      expect(result.timeCharterProfit).toBeDefined();
      expect(result.timeCharterROI).toBeDefined();
      expect(result.profitDifference).toBeDefined();
      expect(result.recommendation).toBeDefined();
      expect(result.breakEvenUtilization).toBeDefined();
      expect(result.riskAnalysis).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, vesselValue: -1000 };
      
      expect(() => {
        BareboatCharterCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, utilizationRate: 100 };
      const result = BareboatCharterCalculator.calculate(edgeCaseInputs);
      
      expect(result.bareboatRevenue).toBeGreaterThan(0);
      expect(result.timeCharterRevenue).toBeGreaterThan(0);
    });

    it('should match example calculations within tolerance', () => {
      const example = BareboatCharterCalculator.examples[0];
      const result = BareboatCharterCalculator.calculate(example.inputs);
      
      const bareboatProfitAccuracy = Math.abs((result.bareboatProfit - example.expectedOutputs.bareboatProfit) / example.expectedOutputs.bareboatProfit) * 100;
      const timeCharterProfitAccuracy = Math.abs((result.timeCharterProfit - example.expectedOutputs.timeCharterProfit) / example.expectedOutputs.timeCharterProfit) * 100;
      
      expect(bareboatProfitAccuracy).toBeLessThan(5);
      expect(timeCharterProfitAccuracy).toBeLessThan(5);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        BareboatCharterCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should handle different vessel types correctly', () => {
      const containerVesselInputs = { ...validInputs, vesselValue: 50000000, bareboatRate: 20000, timeCharterRate: 35000 };
      const bulkCarrierInputs = { ...validInputs, vesselValue: 15000000, bareboatRate: 8000, timeCharterRate: 14000 };
      
      const containerResult = BareboatCharterCalculator.calculate(containerVesselInputs);
      const bulkResult = BareboatCharterCalculator.calculate(bulkCarrierInputs);
      
      expect(containerResult.bareboatRevenue).toBeGreaterThan(bulkResult.bareboatRevenue);
      expect(containerResult.timeCharterRevenue).toBeGreaterThan(bulkResult.timeCharterRevenue);
    });

    it('should reflect fuel price sensitivity', () => {
      const lowFuelInputs = { ...validInputs, fuelPrice: 400 };
      const highFuelInputs = { ...validInputs, fuelPrice: 800 };
      
      const lowFuelResult = BareboatCharterCalculator.calculate(lowFuelInputs);
      const highFuelResult = BareboatCharterCalculator.calculate(highFuelInputs);
      
      // Time charter profit should be lower with higher fuel prices
      expect(highFuelResult.timeCharterProfit).toBeLessThan(lowFuelResult.timeCharterProfit);
    });

    it('should handle utilization rate impact', () => {
      const lowUtilInputs = { ...validInputs, utilizationRate: 75 };
      const highUtilInputs = { ...validInputs, utilizationRate: 95 };
      
      const lowUtilResult = BareboatCharterCalculator.calculate(lowUtilInputs);
      const highUtilResult = BareboatCharterCalculator.calculate(highUtilInputs);
      
      expect(highUtilResult.bareboatRevenue).toBeGreaterThan(lowUtilResult.bareboatRevenue);
      expect(highUtilResult.timeCharterRevenue).toBeGreaterThan(lowUtilResult.timeCharterRevenue);
    });
  });
});
