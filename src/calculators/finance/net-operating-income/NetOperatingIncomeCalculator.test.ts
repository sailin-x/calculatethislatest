import { describe, it, expect, beforeEach } from 'vitest';
import { calculateNetOperatingIncome } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';
import { validateField } from './quickValidation';
import { NetOperatingIncomeInputs } from './types';

describe('Net Operating Income (NOI) Calculator', () => {
  let validInputs: NetOperatingIncomeInputs;

  beforeEach(() => {
    validInputs = {
      // Property Information
      propertyValue: 1000000,
      propertyAddress: '123 Main St, Anytown, USA',
      propertyType: 'commercial',
      propertySize: 10000,
      propertyAge: 15,
      propertyClass: 'class_b',
      propertyCondition: 'good',
      
      // Income Information
      grossRentalIncome: 120000,
      otherIncome: 5000,
      vacancyRate: 5,
      creditLossRate: 2,
      lateFeeIncome: 1000,
      parkingIncome: 3000,
      storageIncome: 2000,
      laundryIncome: 1500,
      vendingIncome: 800,
      advertisingIncome: 500,
      utilityReimbursement: 2000,
      petFees: 1200,
      applicationFees: 800,
      leaseTerminationFees: 500,
      otherMiscellaneousIncome: 1000,
      
      // Operating Expenses
      propertyManagementFees: 6000,
      propertyTaxes: 15000,
      propertyInsurance: 8000,
      utilities: 12000,
      maintenanceAndRepairs: 10000,
      landscaping: 3000,
      janitorial: 5000,
      security: 4000,
      pestControl: 1500,
      trashRemoval: 2000,
      snowRemoval: 1000,
      advertising: 2000,
      legalFees: 1500,
      accountingFees: 2000,
      professionalServices: 1000,
      licensesAndPermits: 500,
      supplies: 1000,
      equipmentRental: 500,
      contractServices: 2000,
      otherOperatingExpenses: 1500,
      
      // Capital Expenditures
      roofReplacement: 5000,
      hvacReplacement: 3000,
      plumbingReplacement: 2000,
      electricalReplacement: 1500,
      flooringReplacement: 2000,
      painting: 1500,
      applianceReplacement: 1000,
      structuralRepairs: 2000,
      otherCapitalExpenditures: 1000,
      
      // Market Information
      marketLocation: 'urban',
      marketCondition: 'stable',
      marketGrowthRate: 3.0,
      comparableNOI: 85000,
      comparableCapRate: 8.5,
      
      // Analysis Parameters
      analysisPeriod: 10,
      inflationRate: 2.5,
      expenseGrowthRate: 3.0,
      incomeGrowthRate: 3.5,
      vacancyTrend: 0,
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
    };
  });

  describe('calculateNetOperatingIncome', () => {
    it('should calculate basic NOI metrics correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.noiMargin).toBeGreaterThan(0);
      expect(result.noiMargin).toBeLessThanOrEqual(100);
      expect(result.noiPerSquareFoot).toBeGreaterThan(0);
      expect(result.noiPerUnit).toBeGreaterThan(0);
    });

    it('should calculate income breakdown correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.totalGrossIncome).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeLessThanOrEqual(result.totalGrossIncome);
      expect(result.vacancyLoss).toBeGreaterThanOrEqual(0);
      expect(result.creditLoss).toBeGreaterThanOrEqual(0);
      expect(result.netRentalIncome).toBeGreaterThan(0);
    });

    it('should calculate expense breakdown correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.totalCapitalExpenditures).toBeGreaterThanOrEqual(0);
      expect(result.totalExpenses).toBeGreaterThan(0);
      expect(result.totalExpenses).toBe(result.totalOperatingExpenses + result.totalCapitalExpenditures);
    });

    it('should calculate performance ratios correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.expenseRatio).toBeGreaterThanOrEqual(0);
      expect(result.expenseRatio).toBeLessThanOrEqual(100);
      expect(result.incomeRatio).toBeGreaterThan(0);
      expect(result.incomeRatio).toBeLessThanOrEqual(100);
      expect(result.vacancyLossRatio).toBeGreaterThanOrEqual(0);
      expect(result.vacancyLossRatio).toBeLessThanOrEqual(100);
      expect(result.creditLossRatio).toBeGreaterThanOrEqual(0);
      expect(result.creditLossRatio).toBeLessThanOrEqual(100);
      expect(result.operatingEfficiency).toBeGreaterThan(0);
      expect(result.operatingEfficiency).toBeLessThanOrEqual(100);
    });

    it('should calculate market comparison metrics correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.noiVsMarket).toBeDefined();
      expect(result.efficiencyVsMarket).toBeDefined();
      expect(result.marketPosition).toBeDefined();
      expect(['Market Leader', 'Above Market', 'Market Average', 'Below Market', 'Market Laggard']).toContain(result.marketPosition);
    });

    it('should calculate trend analysis correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.noiTrend).toBeDefined();
      expect(['increasing', 'stable', 'decreasing']).toContain(result.noiTrend);
      expect(result.projectedNOI).toBeGreaterThan(0);
      expect(result.noiGrowthRate).toBeDefined();
    });

    it('should calculate sensitivity analysis correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.incomeSensitivity).toBeDefined();
      expect(result.expenseSensitivity).toBeDefined();
      expect(result.vacancySensitivity).toBeDefined();
      expect(result.breakEvenVacancy).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenVacancy).toBeLessThanOrEqual(100);
    });

    it('should generate analysis report correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.noiRating).toBeDefined();
      expect(['excellent', 'good', 'fair', 'poor']).toContain(result.analysis.noiRating);
      expect(result.analysis.efficiencyRating).toBeDefined();
      expect(['excellent', 'good', 'fair', 'poor']).toContain(result.analysis.efficiencyRating);
      expect(result.analysis.marketRating).toBeDefined();
      expect(['excellent', 'good', 'fair', 'poor']).toContain(result.analysis.marketRating);
      expect(result.analysis.confidenceRating).toBeDefined();
      expect(['high', 'medium', 'low']).toContain(result.analysis.confidenceRating);
    });

    it('should generate breakdowns correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.incomeBreakdown).toBeDefined();
      expect(Array.isArray(result.incomeBreakdown)).toBe(true);
      expect(result.expenseBreakdown).toBeDefined();
      expect(Array.isArray(result.expenseBreakdown)).toBe(true);
      expect(result.capitalExpenditureBreakdown).toBeDefined();
      expect(Array.isArray(result.capitalExpenditureBreakdown)).toBe(true);
    });

    it('should generate projections correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.projections).toBeDefined();
      expect(Array.isArray(result.projections)).toBe(true);
      expect(result.projections.length).toBe(validInputs.analysisPeriod);
      
      result.projections.forEach((projection, index) => {
        expect(projection.year).toBe(index + 1);
        expect(projection.grossIncome).toBeGreaterThan(0);
        expect(projection.operatingExpenses).toBeGreaterThan(0);
        expect(projection.noi).toBeDefined();
        expect(projection.noiMargin).toBeGreaterThanOrEqual(0);
        expect(projection.noiMargin).toBeLessThanOrEqual(100);
      });
    });

    it('should generate sensitivity matrix correctly', () => {
      const result = calculateNetOperatingIncome(validInputs);

      expect(result.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
      
      result.sensitivityMatrix.forEach(scenario => {
        expect(scenario.scenario).toBeDefined();
        expect(scenario.noi).toBeDefined();
        expect(scenario.noiMargin).toBeDefined();
        expect(scenario.change).toBeDefined();
      });
    });
  });

  describe('validateNetOperatingIncomeInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateNetOperatingIncomeInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property values', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should reject invalid property sizes', () => {
      const invalidInputs = { ...validInputs, propertySize: 0 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertySize).toBeDefined();
    });

    it('should reject invalid property ages', () => {
      const invalidInputs = { ...validInputs, propertyAge: -5 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAge).toBeDefined();
    });

    it('should reject invalid gross rental income', () => {
      const invalidInputs = { ...validInputs, grossRentalIncome: -50000 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.grossRentalIncome).toBeDefined();
    });

    it('should reject invalid vacancy rates', () => {
      const invalidInputs = { ...validInputs, vacancyRate: 150 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.vacancyRate).toBeDefined();
    });

    it('should reject invalid credit loss rates', () => {
      const invalidInputs = { ...validInputs, creditLossRate: -5 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.creditLossRate).toBeDefined();
    });

    it('should reject invalid property taxes', () => {
      const invalidInputs = { ...validInputs, propertyTaxes: -1000 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyTaxes).toBeDefined();
    });

    it('should reject invalid property insurance', () => {
      const invalidInputs = { ...validInputs, propertyInsurance: -500 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyInsurance).toBeDefined();
    });

    it('should reject invalid utilities', () => {
      const invalidInputs = { ...validInputs, utilities: -2000 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.utilities).toBeDefined();
    });

    it('should reject invalid property types', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid_type' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid property classes', () => {
      const invalidInputs = { ...validInputs, propertyClass: 'invalid_class' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyClass).toBeDefined();
    });

    it('should reject invalid property conditions', () => {
      const invalidInputs = { ...validInputs, propertyCondition: 'invalid_condition' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyCondition).toBeDefined();
    });

    it('should reject invalid market locations', () => {
      const invalidInputs = { ...validInputs, marketLocation: 'invalid_location' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketLocation).toBeDefined();
    });

    it('should reject invalid market conditions', () => {
      const invalidInputs = { ...validInputs, marketCondition: 'invalid_condition' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketCondition).toBeDefined();
    });

    it('should reject invalid market growth rates', () => {
      const invalidInputs = { ...validInputs, marketGrowthRate: 100 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketGrowthRate).toBeDefined();
    });

    it('should reject invalid comparable NOI', () => {
      const invalidInputs = { ...validInputs, comparableNOI: -50000 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.comparableNOI).toBeDefined();
    });

    it('should reject invalid comparable cap rates', () => {
      const invalidInputs = { ...validInputs, comparableCapRate: 75 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.comparableCapRate).toBeDefined();
    });

    it('should reject invalid analysis periods', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 60 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBeDefined();
    });

    it('should reject invalid inflation rates', () => {
      const invalidInputs = { ...validInputs, inflationRate: 50 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.inflationRate).toBeDefined();
    });

    it('should reject invalid expense growth rates', () => {
      const invalidInputs = { ...validInputs, expenseGrowthRate: -20 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.expenseGrowthRate).toBeDefined();
    });

    it('should reject invalid income growth rates', () => {
      const invalidInputs = { ...validInputs, incomeGrowthRate: 50 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.incomeGrowthRate).toBeDefined();
    });

    it('should reject invalid vacancy trends', () => {
      const invalidInputs = { ...validInputs, vacancyTrend: 30 };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.vacancyTrend).toBeDefined();
    });

    it('should reject invalid currencies', () => {
      const invalidInputs = { ...validInputs, currency: 'INVALID' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currency).toBeDefined();
    });

    it('should reject invalid display formats', () => {
      const invalidInputs = { ...validInputs, displayFormat: 'invalid_format' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.displayFormat).toBeDefined();
    });

    it('should reject invalid boolean values', () => {
      const invalidInputs = { ...validInputs, includeCharts: 'not_boolean' as any };
      const result = validateNetOperatingIncomeInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.includeCharts).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate property value', () => {
      const result = validateField('propertyValue', 1000000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property value', () => {
      const result = validateField('propertyValue', -1000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate property value with cross-field validation', () => {
      const result = validateField('propertyValue', 1000000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject property value when gross rental income is too high', () => {
      const modifiedInputs = { ...validInputs, grossRentalIncome: 600000 };
      const result = validateField('propertyValue', 1000000, modifiedInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('unusually high relative to property value');
    });

    it('should validate gross rental income', () => {
      const result = validateField('grossRentalIncome', 120000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid gross rental income', () => {
      const result = validateField('grossRentalIncome', -50000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate gross rental income with cross-field validation', () => {
      const result = validateField('grossRentalIncome', 120000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject gross rental income when too high relative to property value', () => {
      const result = validateField('grossRentalIncome', 600000, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('unusually high relative to property value');
    });

    it('should validate vacancy rate', () => {
      const result = validateField('vacancyRate', 5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid vacancy rate', () => {
      const result = validateField('vacancyRate', 150, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate vacancy rate with cross-field validation', () => {
      const result = validateField('vacancyRate', 5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject vacancy rate when combined with credit loss exceeds 50%', () => {
      const modifiedInputs = { ...validInputs, creditLossRate: 50 };
      const result = validateField('vacancyRate', 10, modifiedInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Combined vacancy and credit loss rates cannot exceed 50%');
    });

    it('should validate credit loss rate', () => {
      const result = validateField('creditLossRate', 2, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid credit loss rate', () => {
      const result = validateField('creditLossRate', -5, validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate credit loss rate with cross-field validation', () => {
      const result = validateField('creditLossRate', 2, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject credit loss rate when combined with vacancy exceeds 50%', () => {
      const modifiedInputs = { ...validInputs, vacancyRate: 50 };
      const result = validateField('creditLossRate', 10, modifiedInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Combined vacancy and credit loss rates cannot exceed 50%');
    });

    it('should validate property type', () => {
      const result = validateField('propertyType', 'commercial', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property type', () => {
      const result = validateField('propertyType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property type');
    });

    it('should validate property class', () => {
      const result = validateField('propertyClass', 'class_b', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property class', () => {
      const result = validateField('propertyClass', 'invalid_class', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property class');
    });

    it('should validate property condition', () => {
      const result = validateField('propertyCondition', 'good', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid property condition', () => {
      const result = validateField('propertyCondition', 'invalid_condition', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property condition');
    });

    it('should validate market location', () => {
      const result = validateField('marketLocation', 'urban', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid market location', () => {
      const result = validateField('marketLocation', 'invalid_location', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid market location');
    });

    it('should validate market condition', () => {
      const result = validateField('marketCondition', 'stable', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid market condition', () => {
      const result = validateField('marketCondition', 'invalid_condition', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid market condition');
    });

    it('should validate currency', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid currency', () => {
      const result = validateField('currency', 'INVALID', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid currency');
    });

    it('should validate display format', () => {
      const result = validateField('displayFormat', 'currency', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid display format', () => {
      const result = validateField('displayFormat', 'invalid_format', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid display format');
    });

    it('should validate boolean fields', () => {
      const result = validateField('includeCharts', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should reject non-boolean values for boolean fields', () => {
      const result = validateField('includeCharts', 'not_boolean', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be a boolean value');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero gross rental income', () => {
      const zeroIncomeInputs = { ...validInputs, grossRentalIncome: 0 };
      const result = calculateNetOperatingIncome(zeroIncomeInputs);
      expect(result.netOperatingIncome).toBeLessThanOrEqual(0);
      expect(result.noiMargin).toBe(0);
    });

    it('should handle zero operating expenses', () => {
      const zeroExpenseInputs = { ...validInputs, propertyTaxes: 0, propertyInsurance: 0, utilities: 0 };
      const result = calculateNetOperatingIncome(zeroExpenseInputs);
      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.noiMargin).toBe(100);
    });

    it('should handle zero vacancy rate', () => {
      const zeroVacancyInputs = { ...validInputs, vacancyRate: 0 };
      const result = calculateNetOperatingIncome(zeroVacancyInputs);
      expect(result.vacancyLoss).toBe(0);
      expect(result.effectiveGrossIncome).toBe(result.totalGrossIncome);
    });

    it('should handle 100% vacancy rate', () => {
      const fullVacancyInputs = { ...validInputs, vacancyRate: 100 };
      const result = calculateNetOperatingIncome(fullVacancyInputs);
      expect(result.effectiveGrossIncome).toBe(0);
      expect(result.netOperatingIncome).toBeLessThan(0);
    });

    it('should handle zero property size', () => {
      const zeroSizeInputs = { ...validInputs, propertySize: 0 };
      const result = calculateNetOperatingIncome(zeroSizeInputs);
      expect(result.noiPerSquareFoot).toBe(0);
    });

    it('should handle very high property values', () => {
      const highValueInputs = { ...validInputs, propertyValue: 50000000 };
      const result = calculateNetOperatingIncome(highValueInputs);
      expect(result.netOperatingIncome).toBeDefined();
      expect(result.noiMargin).toBeDefined();
    });

    it('should handle very low property values', () => {
      const lowValueInputs = { ...validInputs, propertyValue: 10000 };
      const result = calculateNetOperatingIncome(lowValueInputs);
      expect(result.netOperatingIncome).toBeDefined();
      expect(result.noiMargin).toBeDefined();
    });

    it('should handle negative growth rates', () => {
      const negativeGrowthInputs = { ...validInputs, incomeGrowthRate: -5, expenseGrowthRate: -2 };
      const result = calculateNetOperatingIncome(negativeGrowthInputs);
      expect(result.noiTrend).toBeDefined();
      expect(result.projectedNOI).toBeDefined();
    });

    it('should handle very short analysis periods', () => {
      const shortPeriodInputs = { ...validInputs, analysisPeriod: 1 };
      const result = calculateNetOperatingIncome(shortPeriodInputs);
      expect(result.projections.length).toBe(1);
    });

    it('should handle very long analysis periods', () => {
      const longPeriodInputs = { ...validInputs, analysisPeriod: 50 };
      const result = calculateNetOperatingIncome(longPeriodInputs);
      expect(result.projections.length).toBe(50);
    });
  });

  describe('Business Logic', () => {
    it('should validate property type constraints', () => {
      const result = validateField('propertyType', 'invalid_type', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property type');
    });

    it('should validate property class constraints', () => {
      const result = validateField('propertyClass', 'invalid_class', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property class');
    });

    it('should validate property condition constraints', () => {
      const result = validateField('propertyCondition', 'invalid_condition', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid property condition');
    });

    it('should validate market location constraints', () => {
      const result = validateField('marketLocation', 'invalid_location', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid market location');
    });

    it('should validate market condition constraints', () => {
      const result = validateField('marketCondition', 'invalid_condition', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid market condition');
    });

    it('should validate currency constraints', () => {
      const result = validateField('currency', 'INVALID', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid currency');
    });

    it('should validate display format constraints', () => {
      const result = validateField('displayFormat', 'invalid_format', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid display format');
    });

    it('should validate boolean fields', () => {
      const result = validateField('includeCharts', 'not_boolean', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be a boolean value');
    });
  });

  describe('Analysis Logic', () => {
    it('should generate appropriate recommendations for excellent performance', () => {
      const excellentInputs = {
        ...validInputs,
        grossRentalIncome: 200000,
        propertyTaxes: 10000,
        propertyInsurance: 5000,
        utilities: 8000,
        maintenanceAndRepairs: 5000
      };
      const result = calculateNetOperatingIncome(excellentInputs);
      expect(result.analysis.recommendation).toContain('Excellent performance');
    });

    it('should generate appropriate recommendations for poor performance', () => {
      const poorInputs = {
        ...validInputs,
        grossRentalIncome: 80000,
        propertyTaxes: 20000,
        propertyInsurance: 15000,
        utilities: 20000,
        maintenanceAndRepairs: 25000
      };
      const result = calculateNetOperatingIncome(poorInputs);
      expect(result.analysis.recommendation).toContain('Poor performance');
    });

    it('should identify key strengths correctly', () => {
      const strongInputs = {
        ...validInputs,
        vacancyRate: 2,
        propertyClass: 'class_a'
      };
      const result = calculateNetOperatingIncome(strongInputs);
      expect(result.analysis.keyStrengths.length).toBeGreaterThan(0);
    });

    it('should identify key weaknesses correctly', () => {
      const weakInputs = {
        ...validInputs,
        vacancyRate: 15,
        propertyClass: 'class_d'
      };
      const result = calculateNetOperatingIncome(weakInputs);
      expect(result.analysis.keyWeaknesses.length).toBeGreaterThan(0);
    });

    it('should calculate market position correctly', () => {
      const marketLeaderInputs = {
        ...validInputs,
        comparableNOI: 60000,
        comparableCapRate: 6.0
      };
      const result = calculateNetOperatingIncome(marketLeaderInputs);
      expect(['Market Leader', 'Above Market']).toContain(result.analysis.marketComparison.marketPosition);
    });
  });
});