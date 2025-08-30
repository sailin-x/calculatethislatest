import { describe, it, expect, beforeEach } from 'vitest';
import { calculateRealEstateDepreciationSchedule } from './formulas';
import { validateRealEstateDepreciationScheduleInputs } from './validation';
import { validateField } from './quickValidation';
import { RealEstateDepreciationScheduleInputs } from './types';

describe('Real Estate Depreciation Schedule Calculator', () => {
  let validInputs: RealEstateDepreciationScheduleInputs;

  beforeEach(() => {
    validInputs = {
      // Property Information
      propertyName: 'Test Property',
      propertyType: 'residential',
      propertyAddress: '123 Main St, City, State 12345',
      acquisitionDate: '2020-01-01',
      placedInServiceDate: '2020-02-01',
      totalCost: 500000,
      landValue: 100000,
      buildingValue: 350000,
      improvementsValue: 50000,
      personalPropertyValue: 0,
      
      // Depreciation Method
      depreciationMethod: 'straight-line',
      recoveryPeriod: 27.5,
      convention: 'mid-month',
      salvageValue: 0,
      salvageValuePercentage: 0,
      
      // Cost Segregation Details
      costSegregationStudy: false,
      costSegregationStudyDate: '',
      costSegregationStudyCost: 0,
      segregatedComponents: [],
      
      // Bonus Depreciation
      bonusDepreciationEligible: false,
      bonusDepreciationPercentage: 100,
      bonusDepreciationYear: 2024,
      
      // Section 179
      section179Eligible: false,
      section179Deduction: 0,
      section179Year: 2024,
      
      // Property Improvements
      improvements: [],
      renovations: [],
      additions: [],
      
      // Disposition Information
      dispositionDate: '',
      dispositionType: 'sale',
      dispositionAmount: 0,
      adjustedBasis: 0,
      
      // Tax Information
      taxYear: 2024,
      taxRate: 24,
      stateTaxRate: 5,
      localTaxRate: 2,
      
      // Alternative Minimum Tax
      amtEligible: false,
      amtAdjustments: 0,
      
      // Passive Activity
      passiveActivity: false,
      materialParticipation: false,
      realEstateProfessional: false,
      
      // Reporting Preferences
      reportFormat: 'detailed',
      includeCharts: true,
      includeCalculations: true,
      includeTaxImpact: true,
      currency: 'USD',
      displayFormat: 'currency',
    };
  });

  describe('calculateRealEstateDepreciationSchedule', () => {
    it('should calculate basic metrics correctly', () => {
      const results = calculateRealEstateDepreciationSchedule(validInputs);
      
      expect(results.metrics.totalDepreciableBasis).toBe(400000); // totalCost - landValue
      expect(results.metrics.annualDepreciation).toBeCloseTo(14545.45, 2); // (400000 - 0) / 27.5
      expect(results.metrics.monthlyDepreciation).toBeCloseTo(1212.12, 2); // annualDepreciation / 12
      expect(results.metrics.effectiveTaxRate).toBe(31); // taxRate + stateTaxRate + localTaxRate
    });

    it('should calculate tax savings correctly', () => {
      const results = calculateRealEstateDepreciationSchedule(validInputs);
      
      // For 4 years of depreciation (2020-2024)
      const expectedDepreciation = 14545.45 * 4;
      const expectedTaxSavings = expectedDepreciation * 0.31;
      
      expect(results.metrics.totalDepreciationTaken).toBeCloseTo(expectedDepreciation, 0);
      expect(results.metrics.taxSavings).toBeCloseTo(expectedTaxSavings, 0);
    });

    it('should generate depreciation schedule with correct years', () => {
      const results = calculateRealEstateDepreciationSchedule(validInputs);
      
      expect(results.depreciationSchedule.years).toHaveLength(28); // 27.5 years rounded up
      expect(results.depreciationSchedule.years[0].year).toBe(2020);
      expect(results.depreciationSchedule.years[27].year).toBe(2047);
    });

    it('should calculate recovery percentage correctly', () => {
      const results = calculateRealEstateDepreciationSchedule(validInputs);
      
      // For 4 years of depreciation
      const expectedPercentage = (results.metrics.totalDepreciationTaken / results.metrics.totalDepreciableBasis) * 100;
      expect(results.metrics.recoveryPercentage).toBeCloseTo(expectedPercentage, 2);
    });

    it('should handle bonus depreciation correctly', () => {
      const bonusInputs = { ...validInputs, bonusDepreciationEligible: true, bonusDepreciationPercentage: 100 };
      const results = calculateRealEstateDepreciationSchedule(bonusInputs);
      
      expect(results.metrics.bonusDepreciationTaken).toBe(400000); // 100% of depreciable basis
      expect(results.bonusDepreciationAnalysis.eligible).toBe(true);
      expect(results.bonusDepreciationAnalysis.maximumDeduction).toBe(400000);
    });

    it('should handle Section 179 correctly', () => {
      const section179Inputs = { ...validInputs, section179Eligible: true, section179Deduction: 50000 };
      const results = calculateRealEstateDepreciationSchedule(section179Inputs);
      
      expect(results.metrics.section179DeductionTaken).toBe(50000);
      expect(results.section179Analysis.eligible).toBe(true);
      expect(results.section179Analysis.maximumDeduction).toBe(50000);
    });

    it('should calculate cost segregation analysis correctly', () => {
      const costSegInputs = { ...validInputs, totalCost: 1000000, costSegregationStudy: true };
      const results = calculateRealEstateDepreciationSchedule(costSegInputs);
      
      expect(results.costSegregationAnalysis.eligible).toBe(true);
      expect(results.costSegregationAnalysis.potentialSavings).toBe(135000); // 15% of 900000
      expect(results.costSegregationAnalysis.recommended).toBe(true);
    });

    it('should handle commercial property correctly', () => {
      const commercialInputs = { ...validInputs, propertyType: 'commercial', recoveryPeriod: 39 };
      const results = calculateRealEstateDepreciationSchedule(commercialInputs);
      
      expect(results.metrics.annualDepreciation).toBeCloseTo(10256.41, 2); // (400000 - 0) / 39
      expect(results.depreciationSchedule.recoveryPeriod).toBe(39);
    });

    it('should calculate disposition analysis correctly', () => {
      const dispositionInputs = {
        ...validInputs,
        dispositionDate: '2025-01-01',
        dispositionAmount: 600000,
        adjustedBasis: 350000
      };
      const results = calculateRealEstateDepreciationSchedule(dispositionInputs);
      
      expect(results.dispositionAnalysis.dispositionType).toBe('sale');
      expect(results.dispositionAnalysis.recaptureAmount).toBeGreaterThan(0);
      expect(results.dispositionAnalysis.capitalGainAmount).toBeGreaterThan(0);
    });

    it('should generate tax impacts correctly', () => {
      const results = calculateRealEstateDepreciationSchedule(validInputs);
      
      expect(results.taxImpacts).toHaveLength(28);
      expect(results.taxImpacts[0].year).toBe(2020);
      expect(results.taxImpacts[0].depreciationDeduction).toBeGreaterThan(0);
      expect(results.taxImpacts[0].taxSavings).toBeGreaterThan(0);
    });

    it('should provide analysis and recommendations', () => {
      const results = calculateRealEstateDepreciationSchedule(validInputs);
      
      expect(results.analysis.depreciationStrategy).toBe('conservative');
      expect(results.analysis.strategyScore).toBe(30);
      expect(results.analysis.keyBenefits).toHaveLength(4);
      expect(results.analysis.keyRisks).toHaveLength(4);
      expect(results.analysis.recommendations).toHaveLength(4);
    });
  });

  describe('validateRealEstateDepreciationScheduleInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateRealEstateDepreciationScheduleInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject missing property name', () => {
      const invalidInputs = { ...validInputs, propertyName: '' };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyName).toBe('Property name is required');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid' as any };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBe('Property type is required');
    });

    it('should reject negative total cost', () => {
      const invalidInputs = { ...validInputs, totalCost: -1000 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.totalCost).toBe('Total cost must be greater than 0');
    });

    it('should reject land value exceeding total cost', () => {
      const invalidInputs = { ...validInputs, landValue: 600000 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.landValue).toBe('Land value cannot exceed total cost');
    });

    it('should reject invalid recovery period for residential property', () => {
      const invalidInputs = { ...validInputs, recoveryPeriod: 39 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.recoveryPeriod).toBe('Residential property typically uses 27.5-year recovery period');
    });

    it('should reject invalid recovery period for commercial property', () => {
      const commercialInputs = { ...validInputs, propertyType: 'commercial', recoveryPeriod: 27.5 };
      const result = validateRealEstateDepreciationScheduleInputs(commercialInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.recoveryPeriod).toBe('Commercial property typically uses 39-year recovery period');
    });

    it('should reject negative tax rates', () => {
      const invalidInputs = { ...validInputs, taxRate: -5 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxRate).toBe('Federal tax rate cannot be negative');
    });

    it('should reject excessive combined tax rate', () => {
      const invalidInputs = { ...validInputs, taxRate: 50, stateTaxRate: 20, localTaxRate: 10 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxRate).toBe('Combined tax rate (federal + state + local) cannot exceed 70%');
    });

    it('should reject invalid dates', () => {
      const invalidInputs = { ...validInputs, acquisitionDate: 'invalid-date' };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.acquisitionDate).toBe('Acquisition date must be a valid date');
    });

    it('should reject placed in service date before acquisition date', () => {
      const invalidInputs = { ...validInputs, placedInServiceDate: '2019-12-31' };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.placedInServiceDate).toBe('Placed in service date cannot be before acquisition date');
    });

    it('should validate cost segregation study requirements', () => {
      const invalidInputs = { ...validInputs, costSegregationStudy: true, costSegregationStudyCost: -1000 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.costSegregationStudyCost).toBe('Cost segregation study cost cannot be negative');
    });

    it('should validate bonus depreciation requirements', () => {
      const invalidInputs = { ...validInputs, bonusDepreciationPercentage: 150 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.bonusDepreciationPercentage).toBe('Bonus depreciation percentage cannot exceed 100%');
    });

    it('should validate Section 179 requirements', () => {
      const invalidInputs = { ...validInputs, section179Deduction: 2000000 };
      const result = validateRealEstateDepreciationScheduleInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.section179Deduction).toBe('Section 179 deduction cannot exceed $1,000,000');
    });
  });

  describe('validateField', () => {
    it('should validate property name correctly', () => {
      expect(validateField('propertyName', '', {})).toEqual({ isValid: false, error: 'Property name is required' });
      expect(validateField('propertyName', 'Valid Name', {})).toEqual({ isValid: true });
      expect(validateField('propertyName', 'a'.repeat(101), {})).toEqual({ isValid: false, error: 'Property name must be 100 characters or less' });
    });

    it('should validate property type correctly', () => {
      expect(validateField('propertyType', '', {})).toEqual({ isValid: false, error: 'Property type is required' });
      expect(validateField('propertyType', 'residential', {})).toEqual({ isValid: true });
      expect(validateField('propertyType', 'invalid', {})).toEqual({ isValid: false, error: 'Invalid property type' });
    });

    it('should validate total cost correctly', () => {
      expect(validateField('totalCost', 0, {})).toEqual({ isValid: false, error: 'Total cost must be greater than 0' });
      expect(validateField('totalCost', -1000, {})).toEqual({ isValid: false, error: 'Total cost must be greater than 0' });
      expect(validateField('totalCost', 1000000001, {})).toEqual({ isValid: false, error: 'Total cost cannot exceed $1 billion' });
      expect(validateField('totalCost', 500000, {})).toEqual({ isValid: true });
    });

    it('should validate land value with cross-field validation', () => {
      expect(validateField('landValue', -1000, {})).toEqual({ isValid: false, error: 'Land value cannot be negative' });
      expect(validateField('landValue', 600000, { totalCost: 500000 })).toEqual({ isValid: false, error: 'Land value cannot exceed total cost' });
      expect(validateField('landValue', 100000, { totalCost: 500000 })).toEqual({ isValid: true });
    });

    it('should validate building value with cross-field validation', () => {
      expect(validateField('buildingValue', -1000, {})).toEqual({ isValid: false, error: 'Building value cannot be negative' });
      expect(validateField('buildingValue', 500000, { 
        totalCost: 500000, 
        landValue: 100000, 
        improvementsValue: 50000, 
        personalPropertyValue: 0 
      })).toEqual({ isValid: false, error: 'Building + Improvements + Personal Property cannot exceed Total Cost - Land Value' });
      expect(validateField('buildingValue', 350000, { 
        totalCost: 500000, 
        landValue: 100000, 
        improvementsValue: 50000, 
        personalPropertyValue: 0 
      })).toEqual({ isValid: true });
    });

    it('should validate recovery period with property type validation', () => {
      expect(validateField('recoveryPeriod', 0, {})).toEqual({ isValid: false, error: 'Recovery period must be greater than 0' });
      expect(validateField('recoveryPeriod', 51, {})).toEqual({ isValid: false, error: 'Recovery period cannot exceed 50 years' });
      expect(validateField('recoveryPeriod', 39, { propertyType: 'residential' })).toEqual({ isValid: false, error: 'Residential property typically uses 27.5-year recovery period' });
      expect(validateField('recoveryPeriod', 27.5, { propertyType: 'residential' })).toEqual({ isValid: true });
    });

    it('should validate tax rates with combined rate validation', () => {
      expect(validateField('taxRate', -5, {})).toEqual({ isValid: false, error: 'Federal tax rate cannot be negative' });
      expect(validateField('taxRate', 51, {})).toEqual({ isValid: false, error: 'Federal tax rate cannot exceed 50%' });
      expect(validateField('taxRate', 50, { stateTaxRate: 20, localTaxRate: 10 })).toEqual({ isValid: false, error: 'Combined tax rate (federal + state + local) cannot exceed 70%' });
      expect(validateField('taxRate', 24, { stateTaxRate: 5, localTaxRate: 2 })).toEqual({ isValid: true });
    });

    it('should validate dates correctly', () => {
      expect(validateField('acquisitionDate', '', {})).toEqual({ isValid: false, error: 'Acquisition date is required' });
      expect(validateField('acquisitionDate', 'invalid-date', {})).toEqual({ isValid: false, error: 'Acquisition date must be a valid date' });
      expect(validateField('acquisitionDate', '2020-01-01', {})).toEqual({ isValid: true });
    });

    it('should validate placed in service date with cross-field validation', () => {
      expect(validateField('placedInServiceDate', '2019-12-31', { acquisitionDate: '2020-01-01' })).toEqual({ isValid: false, error: 'Placed in service date cannot be before acquisition date' });
      expect(validateField('placedInServiceDate', '2020-02-01', { acquisitionDate: '2020-01-01' })).toEqual({ isValid: true });
    });

    it('should validate bonus depreciation correctly', () => {
      expect(validateField('bonusDepreciationPercentage', -10, {})).toEqual({ isValid: false, error: 'Bonus depreciation percentage cannot be negative' });
      expect(validateField('bonusDepreciationPercentage', 150, {})).toEqual({ isValid: false, error: 'Bonus depreciation percentage cannot exceed 100%' });
      expect(validateField('bonusDepreciationPercentage', 100, {})).toEqual({ isValid: true });
    });

    it('should validate Section 179 correctly', () => {
      expect(validateField('section179Deduction', -1000, {})).toEqual({ isValid: false, error: 'Section 179 deduction cannot be negative' });
      expect(validateField('section179Deduction', 2000000, {})).toEqual({ isValid: false, error: 'Section 179 deduction cannot exceed $1,000,000' });
      expect(validateField('section179Deduction', 50000, {})).toEqual({ isValid: true });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle zero salvage value', () => {
      const zeroSalvageInputs = { ...validInputs, salvageValue: 0 };
      const results = calculateRealEstateDepreciationSchedule(zeroSalvageInputs);
      expect(results.metrics.annualDepreciation).toBeGreaterThan(0);
    });

    it('should handle maximum salvage value', () => {
      const maxSalvageInputs = { ...validInputs, salvageValue: 400000 };
      const results = calculateRealEstateDepreciationSchedule(maxSalvageInputs);
      expect(results.metrics.annualDepreciation).toBe(0);
    });

    it('should handle very large property values', () => {
      const largeInputs = { ...validInputs, totalCost: 10000000, landValue: 2000000 };
      const results = calculateRealEstateDepreciationSchedule(largeInputs);
      expect(results.metrics.totalDepreciableBasis).toBe(8000000);
      expect(results.metrics.annualDepreciation).toBeGreaterThan(0);
    });

    it('should handle very small property values', () => {
      const smallInputs = { ...validInputs, totalCost: 100000, landValue: 20000 };
      const results = calculateRealEstateDepreciationSchedule(smallInputs);
      expect(results.metrics.totalDepreciableBasis).toBe(80000);
      expect(results.metrics.annualDepreciation).toBeGreaterThan(0);
    });

    it('should handle different property types', () => {
      const propertyTypes = ['residential', 'commercial', 'mixed-use', 'industrial', 'retail', 'office', 'hotel', 'multifamily', 'single-family', 'land-development'];
      
      propertyTypes.forEach(propertyType => {
        const testInputs = { ...validInputs, propertyType: propertyType as any };
        const results = calculateRealEstateDepreciationSchedule(testInputs);
        expect(results.depreciationSchedule.propertyType).toBe(propertyType);
      });
    });

    it('should handle different depreciation methods', () => {
      const methods = ['straight-line', 'accelerated', 'bonus', 'cost-segregation', 'section-179', 'bonus-depreciation'];
      
      methods.forEach(method => {
        const testInputs = { ...validInputs, depreciationMethod: method as any };
        const results = calculateRealEstateDepreciationSchedule(testInputs);
        expect(results.depreciationSchedule.depreciationMethod).toBe(method);
      });
    });

    it('should handle different conventions', () => {
      const conventions = ['mid-month', 'mid-quarter', 'half-year', 'full-year'];
      
      conventions.forEach(convention => {
        const testInputs = { ...validInputs, convention: convention as any };
        const results = calculateRealEstateDepreciationSchedule(testInputs);
        expect(results.depreciationSchedule.convention).toBe(convention);
      });
    });

    it('should handle future acquisition dates', () => {
      const futureInputs = { ...validInputs, acquisitionDate: '2030-01-01', placedInServiceDate: '2030-02-01' };
      const results = calculateRealEstateDepreciationSchedule(futureInputs);
      expect(results.metrics.totalDepreciationTaken).toBe(0);
      expect(results.metrics.yearsRemaining).toBe(27.5);
    });

    it('should handle past acquisition dates', () => {
      const pastInputs = { ...validInputs, acquisitionDate: '1990-01-01', placedInServiceDate: '1990-02-01' };
      const results = calculateRealEstateDepreciationSchedule(pastInputs);
      expect(results.metrics.totalDepreciationTaken).toBeGreaterThan(0);
      expect(results.metrics.yearsRemaining).toBe(0);
    });
  });
});