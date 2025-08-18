import { describe, it, expect, beforeEach } from 'vitest';
import { CapRateCalculator } from './CapRateCalculator';
import { calculateCapRate, calculateNOI, generateInvestmentAnalysis } from './formulas';
import { validateCapRateInputs } from './validation';

describe('Cap Rate Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      propertyValue: 350000,
      grossRent: 42000,
      vacancyRate: 5.0,
      propertyTax: 7000,
      insurance: 2500,
      utilities: 0,
      maintenance: 4000,
      propertyManagement: 8.0,
      hoaFees: 0,
      otherExpenses: 1500,
      propertyType: 'single-family',
      location: 'suburban',
      propertyAge: 12,
      propertyCondition: 'good',
      marketCapRate: 6.5
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(CapRateCalculator.id).toBe('cap-rate-calculator');
      expect(CapRateCalculator.name).toBe('Cap Rate Calculator');
      expect(CapRateCalculator.category).toBe('finance');
      expect(CapRateCalculator.subcategory).toBe('investment');
    });

    it('should have all required inputs', () => {
      const inputIds = CapRateCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'propertyValue', 'grossRent', 'vacancyRate', 'propertyTax', 'insurance',
        'utilities', 'maintenance', 'propertyManagement', 'hoaFees', 'otherExpenses',
        'propertyType', 'location', 'propertyAge', 'propertyCondition', 'marketCapRate'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = CapRateCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'capRate', 'netOperatingIncome', 'effectiveGrossIncome', 'totalExpenses',
        'vacancyLoss', 'operatingExpenseRatio', 'cashOnCashReturn', 'marketComparison',
        'investmentGrade', 'riskAssessment', 'breakEvenAnalysis', 'sensitivityAnalysis'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(CapRateCalculator.examples.length).toBeGreaterThan(0);
      CapRateCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { propertyValue: 350000 };
      const result = validateCapRateInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate property value range', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 25000 };
      const result = validateCapRateInputs(lowValueInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('property value'))).toBe(true);
    });

    it('should validate gross rent range', () => {
      const lowRentInputs = { ...validInputs, grossRent: 500 };
      const result = validateCapRateInputs(lowRentInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('gross rent'))).toBe(true);
    });

    it('should validate vacancy rate range', () => {
      const highVacancyInputs = { ...validInputs, vacancyRate: 60 };
      const result = validateCapRateInputs(highVacancyInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('vacancy rate'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highExpenseInputs = { ...validInputs, propertyTax: 50000 };
      const result = validateCapRateInputs(highExpenseInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateCapRateInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate cap rate metrics correctly', () => {
      const metrics = calculateCapRate(validInputs);
      
      expect(metrics.capRate).toBeGreaterThan(0);
      expect(metrics.noi).toBeGreaterThan(0);
      expect(metrics.cashOnCashReturn).toBeGreaterThan(0);
      expect(metrics.totalReturn).toBeGreaterThan(0);
    });

    it('should calculate NOI breakdown correctly', () => {
      const noiBreakdown = calculateNOI(validInputs);
      
      expect(noiBreakdown.effectiveGrossIncome).toBeGreaterThan(0);
      expect(noiBreakdown.totalExpenses).toBeGreaterThan(0);
      expect(noiBreakdown.vacancyLoss).toBeGreaterThan(0);
      expect(noiBreakdown.operatingExpenseRatio).toBeGreaterThan(0);
    });

    it('should calculate cap rate correctly', () => {
      const metrics = calculateCapRate(validInputs);
      const expectedCapRate = (metrics.noi / validInputs.propertyValue) * 100;
      
      expect(Math.abs(metrics.capRate - expectedCapRate)).toBeLessThan(0.01);
    });

    it('should handle different property types correctly', () => {
      const singleFamilyInputs = { ...validInputs, propertyType: 'single-family' };
      const commercialInputs = { ...validInputs, propertyType: 'commercial' };
      
      const singleFamilyResult = calculateCapRate(singleFamilyInputs);
      const commercialResult = calculateCapRate(commercialInputs);
      
      // Should have same cap rate for same inputs (property type doesn't affect calculation)
      expect(singleFamilyResult.capRate).toBe(commercialResult.capRate);
    });

    it('should handle different vacancy rates correctly', () => {
      const lowVacancyInputs = { ...validInputs, vacancyRate: 2.0 };
      const highVacancyInputs = { ...validInputs, vacancyRate: 10.0 };
      
      const lowVacancyResult = calculateCapRate(lowVacancyInputs);
      const highVacancyResult = calculateCapRate(highVacancyInputs);
      
      // Lower vacancy should result in higher cap rate
      expect(lowVacancyResult.capRate).toBeGreaterThan(highVacancyResult.capRate);
    });

    it('should handle different expense levels correctly', () => {
      const lowExpenseInputs = { ...validInputs, propertyTax: 3000 };
      const highExpenseInputs = { ...validInputs, propertyTax: 12000 };
      
      const lowExpenseResult = calculateCapRate(lowExpenseInputs);
      const highExpenseResult = calculateCapRate(highExpenseInputs);
      
      // Lower expenses should result in higher cap rate
      expect(lowExpenseResult.capRate).toBeGreaterThan(highExpenseResult.capRate);
    });
  });

  describe('Investment Analysis', () => {
    it('should generate investment analysis', () => {
      const capRateMetrics = calculateCapRate(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, capRateMetrics);
      
      expect(analysis.marketComparison).toBeDefined();
      expect(analysis.investmentGrade).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.breakEvenAnalysis).toBeDefined();
      expect(analysis.sensitivityAnalysis).toBeDefined();
    });

    it('should provide meaningful market comparison', () => {
      const capRateMetrics = calculateCapRate(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, capRateMetrics);
      
      expect(analysis.marketComparison).toContain('Cap rate');
      expect(analysis.marketComparison.length).toBeGreaterThan(50);
    });

    it('should provide investment grade assessment', () => {
      const capRateMetrics = calculateCapRate(validInputs);
      const analysis = generateInvestmentAnalysis(validInputs, capRateMetrics);
      
      expect(analysis.investmentGrade).toMatch(/[A-C][+-]?/);
      expect(analysis.investmentGrade.length).toBeGreaterThan(20);
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = CapRateCalculator.calculate(validInputs);
      
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeGreaterThan(0);
      expect(result.totalExpenses).toBeGreaterThan(0);
      expect(result.vacancyLoss).toBeGreaterThan(0);
      expect(result.operatingExpenseRatio).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.marketComparison).toBeDefined();
      expect(result.investmentGrade).toBeDefined();
      expect(result.riskAssessment).toBeDefined();
      expect(result.breakEvenAnalysis).toBeDefined();
      expect(result.sensitivityAnalysis).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      
      expect(() => {
        CapRateCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, grossRent: 1000, propertyValue: 50000 };
      const result = CapRateCalculator.calculate(edgeCaseInputs);
      
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeDefined();
    });

    it('should match example calculations within tolerance', () => {
      const example = CapRateCalculator.examples[0];
      const result = CapRateCalculator.calculate(example.inputs);
      
      const capRateAccuracy = Math.abs((result.capRate - example.expectedOutputs.capRate) / example.expectedOutputs.capRate) * 100;
      const noiAccuracy = Math.abs((result.netOperatingIncome - example.expectedOutputs.netOperatingIncome) / example.expectedOutputs.netOperatingIncome) * 100;
      
      expect(capRateAccuracy).toBeLessThan(15);
      expect(noiAccuracy).toBeLessThan(15);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        CapRateCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show realistic cap rates', () => {
      const result = CapRateCalculator.calculate(validInputs);
      
      // Cap rate should be reasonable
      expect(result.capRate).toBeGreaterThan(2);
      expect(result.capRate).toBeLessThan(15);
    });

    it('should handle different property values correctly', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 150000, grossRent: 18000 };
      const highValueInputs = { ...validInputs, propertyValue: 800000, grossRent: 96000 };
      
      const lowValueResult = CapRateCalculator.calculate(lowValueInputs);
      const highValueResult = CapRateCalculator.calculate(highValueInputs);
      
      // Cap rates should be similar for similar rent-to-value ratios
      const lowValueRatio = lowValueInputs.grossRent / lowValueInputs.propertyValue;
      const highValueRatio = highValueInputs.grossRent / highValueInputs.propertyValue;
      
      if (Math.abs(lowValueRatio - highValueRatio) < 0.01) {
        expect(Math.abs(lowValueResult.capRate - highValueResult.capRate)).toBeLessThan(2);
      }
    });

    it('should calculate cash-on-cash return appropriately', () => {
      const result = CapRateCalculator.calculate(validInputs);
      
      // Cash-on-cash return should be higher than cap rate due to leverage
      expect(result.cashOnCashReturn).toBeGreaterThan(result.capRate);
    });

    it('should provide meaningful operating expense ratio', () => {
      const result = CapRateCalculator.calculate(validInputs);
      
      // Operating expense ratio should be reasonable
      expect(result.operatingExpenseRatio).toBeGreaterThan(20);
      expect(result.operatingExpenseRatio).toBeLessThan(80);
    });
  });
});
