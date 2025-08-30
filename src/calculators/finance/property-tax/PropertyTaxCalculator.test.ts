import { describe, it, expect, beforeEach } from 'vitest';
import { calculatePropertyTax } from './formulas';
import { validatePropertyTaxInputs } from './validation';
import { validateField } from './quickValidation';
import { PropertyTaxInputs } from './types';

describe('Property Tax Calculator', () => {
  let validInputs: PropertyTaxInputs;

  beforeEach(() => {
    validInputs = {
      // Property Information
      propertyValue: 500000,
      propertyAddress: '123 Main St, Anytown, CA 90210',
      propertyType: 'single_family',
      propertySize: 2500,
      propertyAge: 15,
      propertyUse: 'primary_residence',
      propertyCondition: 'good',
      
      // Location Information
      state: 'CA',
      county: 'Los Angeles',
      city: 'Anytown',
      zipCode: '90210',
      schoolDistrict: 'Anytown Unified',
      
      // Tax Rates and Assessments
      countyTaxRate: 1.25,
      cityTaxRate: 0.5,
      schoolTaxRate: 1.0,
      specialDistrictTaxRate: 0.25,
      assessmentRatio: 100,
      
      // Exemptions
      homesteadExemption: true,
      homesteadExemptionAmount: 7000,
      seniorExemption: false,
      seniorExemptionAmount: 0,
      veteranExemption: false,
      veteranExemptionAmount: 0,
      disabilityExemption: false,
      disabilityExemptionAmount: 0,
      
      // Assessment Information
      assessedValue: 500000,
      previousAssessedValue: 480000,
      assessmentDate: '2024-01-01',
      lastReassessmentDate: '2020-01-01',
      reassessmentCycle: 4,
      
      // Tax Calculation Parameters
      taxYear: 2024,
      paymentSchedule: 'annual',
      escrowAccount: true,
      escrowMonthlyPayment: 500,
      escrowBalance: 2000,
      
      // Additional Taxes and Fees
      specialAssessments: [],
      improvementAssessments: [],
      bondAssessments: [],
      
      // Market and Economic Factors
      marketAppreciationRate: 3.5,
      inflationRate: 2.5,
      localEconomicGrowth: 2.0,
      propertyTaxCap: 2.0,
      
      // Historical Data
      previousYearTax: 15000,
      fiveYearAverageTax: 14500,
      tenYearAverageTax: 14000,
      taxHistory: [
        { year: 2023, assessedValue: 480000, taxAmount: 15000, taxRate: 3.125 },
        { year: 2022, assessedValue: 460000, taxAmount: 14375, taxRate: 3.125 },
        { year: 2021, assessedValue: 440000, taxAmount: 13750, taxRate: 3.125 }
      ],
      
      // Analysis Parameters
      analysisPeriod: 10,
      includeInflation: true,
      includeAppreciation: true,
      includeExemptions: true,
      includeSpecialAssessments: true,
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
      includeComparisons: true
    };
  });

  describe('calculatePropertyTax', () => {
    it('should calculate basic property tax metrics correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.propertyValue).toBe(500000);
      expect(result.assessedValue).toBe(500000);
      expect(result.taxableValue).toBe(493000); // 500000 - 7000 homestead exemption
      expect(result.totalAnnualTax).toBeGreaterThan(0);
      expect(result.totalMonthlyTax).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.totalTaxRate).toBe(3.0); // 1.25 + 0.5 + 1.0 + 0.25
    });

    it('should calculate tax breakdown correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.countyTax).toBeGreaterThan(0);
      expect(result.cityTax).toBeGreaterThan(0);
      expect(result.schoolTax).toBeGreaterThan(0);
      expect(result.specialDistrictTax).toBeGreaterThan(0);
      expect(result.specialAssessmentsTotal).toBe(0);
      expect(result.improvementAssessmentsTotal).toBe(0);
      expect(result.bondAssessmentsTotal).toBe(0);
    });

    it('should calculate exemptions correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.totalExemptions).toBe(7000);
      expect(result.exemptionSavings).toBeGreaterThan(0);
      expect(result.exemptionPercentage).toBe(1.4); // 7000 / 500000 * 100
    });

    it('should calculate payment amounts correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.paymentAmounts.annual).toBeGreaterThan(0);
      expect(result.paymentAmounts.semiAnnual).toBeGreaterThan(0);
      expect(result.paymentAmounts.quarterly).toBeGreaterThan(0);
      expect(result.paymentAmounts.monthly).toBeGreaterThan(0);
    });

    it('should calculate escrow analysis correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.escrowAnalysis.requiredMonthlyPayment).toBeGreaterThan(0);
      expect(result.escrowAnalysis.currentEscrowPayment).toBe(500);
      expect(result.escrowAnalysis.escrowDeficit).toBeDefined();
      expect(result.escrowAnalysis.escrowSurplus).toBeDefined();
    });

    it('should calculate assessment analysis correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.assessmentToMarketRatio).toBe(100);
      expect(result.assessmentChange).toBe(20000);
      expect(result.assessmentChangePercentage).toBe(4.17); // 20000 / 480000 * 100
    });

    it('should calculate historical analysis correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.taxGrowthRate).toBeGreaterThan(0);
      expect(result.fiveYearProjection).toBeGreaterThan(0);
      expect(result.tenYearProjection).toBeGreaterThan(0);
      expect(['increasing', 'decreasing', 'stable']).toContain(result.taxBurdenTrend);
    });

    it('should calculate comparative analysis correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.stateAverageTaxRate).toBeGreaterThan(0);
      expect(result.countyAverageTaxRate).toBeGreaterThan(0);
      expect(result.cityAverageTaxRate).toBeGreaterThan(0);
      expect(result.comparisonPercentile).toBeGreaterThan(0);
      expect(result.comparisonPercentile).toBeLessThanOrEqual(100);
      expect(['low', 'medium', 'high']).toContain(result.taxEfficiency);
    });

    it('should generate timeline analysis', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(Array.isArray(result.timelineAnalysis)).toBe(true);
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
      
      const firstYear = result.timelineAnalysis[0];
      expect(firstYear.year).toBe(2024);
      expect(firstYear.assessedValue).toBeGreaterThan(0);
      expect(firstYear.taxAmount).toBeGreaterThan(0);
    });

    it('should generate sensitivity matrix', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should generate scenarios', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(Array.isArray(result.scenarios)).toBe(true);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it('should generate comparison analysis', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });

    it('should generate market analysis', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(Array.isArray(result.marketAnalysis)).toBe(true);
      expect(result.marketAnalysis.length).toBeGreaterThan(0);
    });

    it('should generate comprehensive analysis', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.analysis.taxRating).toBeDefined();
      expect(['Low', 'Medium', 'High', 'Very High']).toContain(result.analysis.taxRating);
      expect(result.analysis.affordabilityRating).toBeDefined();
      expect(['Excellent', 'Good', 'Fair', 'Poor']).toContain(result.analysis.affordabilityRating);
      expect(result.analysis.recommendation).toBeDefined();
      expect(typeof result.analysis.recommendation).toBe('string');
    });

    it('should calculate additional metrics correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.taxPerSquareFoot).toBeGreaterThan(0);
      expect(result.taxPerBedroom).toBeGreaterThan(0);
      expect(result.taxPerBathroom).toBeGreaterThan(0);
      expect(result.taxBurdenRatio).toBeGreaterThan(0);
      expect(result.affordabilityIndex).toBeGreaterThan(0);
      expect(result.taxEfficiencyScore).toBeGreaterThan(0);
    });

    it('should calculate projections correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.fiveYearTaxProjection).toBeGreaterThan(0);
      expect(result.tenYearTaxProjection).toBeGreaterThan(0);
      expect(result.lifetimeTaxProjection).toBeGreaterThan(0);
    });

    it('should calculate risk assessment correctly', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.taxRiskScore).toBeGreaterThan(0);
      expect(['low', 'medium', 'high']).toContain(result.assessmentRisk);
      expect(['low', 'medium', 'high']).toContain(result.rateChangeRisk);
      expect(['low', 'medium', 'high']).toContain(result.exemptionRisk);
    });

    it('should calculate optimization opportunities', () => {
      const result = calculatePropertyTax(validInputs);
      
      expect(result.potentialSavings).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(result.optimizationOpportunities)).toBe(true);
      expect(Array.isArray(result.exemptionOpportunities)).toBe(true);
      expect(Array.isArray(result.appealOpportunities)).toBe(true);
    });
  });

  describe('validatePropertyTaxInputs', () => {
    it('should validate valid inputs successfully', () => {
      const result = validatePropertyTaxInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should reject missing property address', () => {
      const invalidInputs = { ...validInputs, propertyAddress: '' };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAddress).toBeDefined();
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid_type' };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid tax rates', () => {
      const invalidInputs = { ...validInputs, countyTaxRate: -1 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.countyTaxRate).toBeDefined();
    });

    it('should reject invalid assessment ratio', () => {
      const invalidInputs = { ...validInputs, assessmentRatio: 300 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.assessmentRatio).toBeDefined();
    });

    it('should reject invalid exemption amounts', () => {
      const invalidInputs = { ...validInputs, homesteadExemptionAmount: -1000 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.homesteadExemptionAmount).toBeDefined();
    });

    it('should reject invalid assessed value', () => {
      const invalidInputs = { ...validInputs, assessedValue: 0 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.assessedValue).toBeDefined();
    });

    it('should reject invalid tax year', () => {
      const invalidInputs = { ...validInputs, taxYear: 1999 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxYear).toBeDefined();
    });

    it('should reject invalid payment schedule', () => {
      const invalidInputs = { ...validInputs, paymentSchedule: 'invalid' };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.paymentSchedule).toBeDefined();
    });

    it('should reject invalid analysis period', () => {
      const invalidInputs = { ...validInputs, analysisPeriod: 0 };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBeDefined();
    });

    it('should reject invalid currency', () => {
      const invalidInputs = { ...validInputs, currency: 'INVALID' };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.currency).toBeDefined();
    });

    it('should reject invalid display format', () => {
      const invalidInputs = { ...validInputs, displayFormat: 'invalid' };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.displayFormat).toBeDefined();
    });

    it('should validate business logic constraints', () => {
      const invalidInputs = { 
        ...validInputs, 
        assessedValue: 800000, // 160% of property value
        propertyValue: 500000 
      };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.assessedValue).toBeDefined();
    });

    it('should validate total exemptions constraint', () => {
      const invalidInputs = { 
        ...validInputs, 
        homesteadExemptionAmount: 600000, // Exceeds assessed value
        assessedValue: 500000 
      };
      const result = validatePropertyTaxInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.homesteadExemptionAmount).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate property value correctly', () => {
      const result = validateField('propertyValue', 500000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property address correctly', () => {
      const result = validateField('propertyAddress', '123 Main St', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property type correctly', () => {
      const result = validateField('propertyType', 'single_family', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property size correctly', () => {
      const result = validateField('propertySize', 2500, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property age correctly', () => {
      const result = validateField('propertyAge', 15, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property use correctly', () => {
      const result = validateField('propertyUse', 'primary_residence', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property condition correctly', () => {
      const result = validateField('propertyCondition', 'good', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate state correctly', () => {
      const result = validateField('state', 'CA', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate county correctly', () => {
      const result = validateField('county', 'Los Angeles', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate city correctly', () => {
      const result = validateField('city', 'Anytown', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate zip code correctly', () => {
      const result = validateField('zipCode', '90210', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate school district correctly', () => {
      const result = validateField('schoolDistrict', 'Anytown Unified', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate county tax rate correctly', () => {
      const result = validateField('countyTaxRate', 1.25, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate city tax rate correctly', () => {
      const result = validateField('cityTaxRate', 0.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate school tax rate correctly', () => {
      const result = validateField('schoolTaxRate', 1.0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate special district tax rate correctly', () => {
      const result = validateField('specialDistrictTaxRate', 0.25, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate assessment ratio correctly', () => {
      const result = validateField('assessmentRatio', 100, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate homestead exemption correctly', () => {
      const result = validateField('homesteadExemption', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate homestead exemption amount correctly', () => {
      const result = validateField('homesteadExemptionAmount', 7000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate senior exemption correctly', () => {
      const result = validateField('seniorExemption', false, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate senior exemption amount correctly', () => {
      const result = validateField('seniorExemptionAmount', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate veteran exemption correctly', () => {
      const result = validateField('veteranExemption', false, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate veteran exemption amount correctly', () => {
      const result = validateField('veteranExemptionAmount', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate disability exemption correctly', () => {
      const result = validateField('disabilityExemption', false, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate disability exemption amount correctly', () => {
      const result = validateField('disabilityExemptionAmount', 0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate assessed value correctly', () => {
      const result = validateField('assessedValue', 500000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate previous assessed value correctly', () => {
      const result = validateField('previousAssessedValue', 480000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate assessment date correctly', () => {
      const result = validateField('assessmentDate', '2024-01-01', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate last reassessment date correctly', () => {
      const result = validateField('lastReassessmentDate', '2020-01-01', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate reassessment cycle correctly', () => {
      const result = validateField('reassessmentCycle', 4, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate tax year correctly', () => {
      const result = validateField('taxYear', 2024, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate payment schedule correctly', () => {
      const result = validateField('paymentSchedule', 'annual', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate escrow account correctly', () => {
      const result = validateField('escrowAccount', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate escrow monthly payment correctly', () => {
      const result = validateField('escrowMonthlyPayment', 500, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate escrow balance correctly', () => {
      const result = validateField('escrowBalance', 2000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate special assessments correctly', () => {
      const result = validateField('specialAssessments', [], validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate improvement assessments correctly', () => {
      const result = validateField('improvementAssessments', [], validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate bond assessments correctly', () => {
      const result = validateField('bondAssessments', [], validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate market appreciation rate correctly', () => {
      const result = validateField('marketAppreciationRate', 3.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate inflation rate correctly', () => {
      const result = validateField('inflationRate', 2.5, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate local economic growth correctly', () => {
      const result = validateField('localEconomicGrowth', 2.0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate property tax cap correctly', () => {
      const result = validateField('propertyTaxCap', 2.0, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate previous year tax correctly', () => {
      const result = validateField('previousYearTax', 15000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate five year average tax correctly', () => {
      const result = validateField('fiveYearAverageTax', 14500, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate ten year average tax correctly', () => {
      const result = validateField('tenYearAverageTax', 14000, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate tax history correctly', () => {
      const result = validateField('taxHistory', validInputs.taxHistory, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate analysis period correctly', () => {
      const result = validateField('analysisPeriod', 10, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate include inflation correctly', () => {
      const result = validateField('includeInflation', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate include appreciation correctly', () => {
      const result = validateField('includeAppreciation', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate include exemptions correctly', () => {
      const result = validateField('includeExemptions', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate include special assessments correctly', () => {
      const result = validateField('includeSpecialAssessments', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate currency correctly', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate display format correctly', () => {
      const result = validateField('displayFormat', 'currency', validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate include charts correctly', () => {
      const result = validateField('includeCharts', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should validate include comparisons correctly', () => {
      const result = validateField('includeComparisons', true, validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should handle cross-field validation for property value and assessed value', () => {
      const result = validateField('propertyValue', 300000, { ...validInputs, assessedValue: 500000 });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('low relative to assessed value');
    });

    it('should handle cross-field validation for property type and size', () => {
      const result = validateField('propertySize', 15000, { ...validInputs, propertyType: 'single_family' });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('unusually large for single family home');
    });

    it('should handle cross-field validation for total tax rate', () => {
      const result = validateField('countyTaxRate', 25, { 
        ...validInputs, 
        cityTaxRate: 10, 
        schoolTaxRate: 10, 
        specialDistrictTaxRate: 10 
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('unusually high');
    });

    it('should handle cross-field validation for exemptions', () => {
      const result = validateField('homesteadExemptionAmount', 600000, { 
        ...validInputs, 
        assessedValue: 500000 
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('exceed assessed value');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property value', () => {
      const inputs = { ...validInputs, propertyValue: 0 };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should handle very large property values', () => {
      const inputs = { ...validInputs, propertyValue: 15000000 };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should handle negative tax rates', () => {
      const inputs = { ...validInputs, countyTaxRate: -1 };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.countyTaxRate).toBeDefined();
    });

    it('should handle very high tax rates', () => {
      const inputs = { ...validInputs, countyTaxRate: 60 };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.countyTaxRate).toBeDefined();
    });

    it('should handle invalid dates', () => {
      const inputs = { ...validInputs, assessmentDate: 'invalid-date' };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.assessmentDate).toBeDefined();
    });

    it('should handle future tax years', () => {
      const inputs = { ...validInputs, taxYear: 2030 };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxYear).toBeDefined();
    });

    it('should handle very long analysis periods', () => {
      const inputs = { ...validInputs, analysisPeriod: 40 };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.analysisPeriod).toBeDefined();
    });

    it('should handle invalid special assessments', () => {
      const inputs = { 
        ...validInputs, 
        specialAssessments: [{ description: '', amount: -100, duration: 0, annualAmount: -10 }] 
      };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['specialAssessments.0.description']).toBeDefined();
    });

    it('should handle invalid tax history', () => {
      const inputs = { 
        ...validInputs, 
        taxHistory: [{ year: 1999, assessedValue: 0, taxAmount: -100, taxRate: -1 }] 
      };
      const result = validatePropertyTaxInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['taxHistory.0.year']).toBeDefined();
    });
  });
});