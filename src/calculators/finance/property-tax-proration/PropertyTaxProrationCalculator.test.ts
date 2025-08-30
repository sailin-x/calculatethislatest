import { describe, it, expect, beforeEach } from 'vitest';
import { calculatePropertyTaxProration } from './formulas';
import { validatePropertyTaxProrationInputs } from './validation';
import { validateField } from './quickValidation';
import { PropertyTaxProrationInputs } from './types';

describe('Property Tax Proration Calculator', () => {
  let validInputs: PropertyTaxProrationInputs;

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
      
      // Proration Specific Information
      closingDate: '2024-06-15',
      taxYear: 2024,
      prorationMethod: '365_day',
      sellerOccupiedUntil: '2024-06-14',
      buyerOccupiedFrom: '2024-06-15',
      taxPaymentSchedule: 'annual',
      lastTaxPaymentDate: '2024-01-01',
      nextTaxPaymentDate: '2025-01-01',
      lastTaxPaymentAmount: 15000,
      nextTaxPaymentAmount: 15000,
      
      // Escrow Information
      escrowAccount: true,
      escrowMonthlyPayment: 500,
      escrowBalance: 2000,
      escrowProrationMethod: 'split_50_50',
      customEscrowSplit: 50,
      
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
        { year: 2023, assessedValue: 480000, taxAmount: 15000, taxRate: 3.125, paymentDate: '2023-01-01' },
        { year: 2022, assessedValue: 460000, taxAmount: 14375, taxRate: 3.125, paymentDate: '2022-01-01' },
        { year: 2021, assessedValue: 440000, taxAmount: 13750, taxRate: 3.125, paymentDate: '2021-01-01' }
      ],
      
      // Proration Analysis Parameters
      includeInflation: true,
      includeAppreciation: true,
      includeExemptions: true,
      includeSpecialAssessments: true,
      prorationAccuracy: 'exact',
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
      includeComparisons: true,
      includeTimeline: true,
    };
  });

  describe('calculatePropertyTaxProration', () => {
    it('should calculate basic proration metrics correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.propertyValue).toBe(500000);
      expect(result.assessedValue).toBe(500000);
      expect(result.taxableValue).toBe(493000); // 500000 - 7000 homestead exemption
      expect(result.closingDate).toBe('2024-06-15');
      expect(result.taxYear).toBe(2024);
    });

    it('should calculate proration days correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.totalDaysInYear).toBe(365);
      expect(result.sellerDays).toBeGreaterThan(0);
      expect(result.buyerDays).toBeGreaterThan(0);
      expect(result.sellerDays + result.buyerDays).toBe(365);
      expect(result.sellerPercentage + result.buyerPercentage).toBeCloseTo(100, 1);
    });

    it('should calculate tax responsibilities correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      const totalTaxRate = validInputs.countyTaxRate + validInputs.cityTaxRate + validInputs.schoolTaxRate + validInputs.specialDistrictTaxRate;
      const expectedTotalTax = (result.taxableValue / 1000) * totalTaxRate;

      expect(result.totalAnnualTax).toBeCloseTo(expectedTotalTax, 2);
      expect(result.sellerTaxResponsibility + result.buyerTaxResponsibility).toBeCloseTo(result.totalAnnualTax, 2);
    });

    it('should calculate tax breakdown correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.countyTax).toBeCloseTo((result.taxableValue / 1000) * validInputs.countyTaxRate, 2);
      expect(result.cityTax).toBeCloseTo((result.taxableValue / 1000) * validInputs.cityTaxRate, 2);
      expect(result.schoolTax).toBeCloseTo((result.taxableValue / 1000) * validInputs.schoolTaxRate, 2);
      expect(result.specialDistrictTax).toBeCloseTo((result.taxableValue / 1000) * validInputs.specialDistrictTaxRate, 2);
    });

    it('should calculate exemptions correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.totalExemptions).toBe(7000);
      expect(result.exemptionPercentage).toBeCloseTo((7000 / validInputs.assessedValue) * 100, 2);
    });

    it('should calculate payment analysis correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.lastPaymentDate).toBe('2024-01-01');
      expect(result.nextPaymentDate).toBe('2025-01-01');
      expect(result.daysSinceLastPayment).toBeGreaterThan(0);
      expect(result.daysUntilNextPayment).toBeGreaterThan(0);
    });

    it('should calculate escrow analysis correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.escrowProrationAmount).toBe(2000);
      expect(result.sellerEscrowCredit).toBe(1000); // 50% split
      expect(result.buyerEscrowDebit).toBe(1000); // 50% split
    });

    it('should calculate proration summary correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.netSellerCredit).toBeGreaterThan(0);
      expect(result.netBuyerDebit).toBeGreaterThan(0);
      expect(result.prorationBalance).toBeCloseTo(result.netBuyerDebit - result.netSellerCredit, 2);
    });

    it('should generate timeline analysis', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(Array.isArray(result.prorationTimeline)).toBe(true);
      expect(result.prorationTimeline.length).toBeGreaterThan(0);
      expect(result.prorationTimeline[0]).toHaveProperty('date');
      expect(result.prorationTimeline[0]).toHaveProperty('event');
      expect(result.prorationTimeline[0]).toHaveProperty('sellerAmount');
      expect(result.prorationTimeline[0]).toHaveProperty('buyerAmount');
    });

    it('should generate payment schedule', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(Array.isArray(result.paymentSchedule)).toBe(true);
      expect(result.paymentSchedule.length).toBeGreaterThan(0);
      expect(result.paymentSchedule[0]).toHaveProperty('date');
      expect(result.paymentSchedule[0]).toHaveProperty('amount');
      expect(result.paymentSchedule[0]).toHaveProperty('responsibleParty');
    });

    it('should generate analysis object', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.prorationRating).toBeDefined();
      expect(result.analysis.accuracyRating).toBeDefined();
      expect(result.analysis.fairnessRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(Array.isArray(result.analysis.keyStrengths)).toBe(true);
      expect(Array.isArray(result.analysis.keyWeaknesses)).toBe(true);
    });

    it('should calculate settlement summary correctly', () => {
      const result = calculatePropertyTaxProration(validInputs);

      expect(result.settlementSummary).toBeDefined();
      expect(result.settlementSummary.totalCredits).toBeGreaterThan(0);
      expect(result.settlementSummary.totalDebits).toBeGreaterThan(0);
      expect(result.settlementSummary.netAmount).toBeGreaterThan(0);
      expect(result.settlementSummary.responsibleParty).toBeDefined();
      expect(result.settlementSummary.dueDate).toBe(validInputs.closingDate);
    });

    it('should handle different proration methods', () => {
      const inputs360 = { ...validInputs, prorationMethod: '360_day' as const };
      const result360 = calculatePropertyTaxProration(inputs360);
      expect(result360.totalDaysInYear).toBe(360);

      const inputsActual = { ...validInputs, prorationMethod: 'actual_days' as const };
      const resultActual = calculatePropertyTaxProration(inputsActual);
      expect(resultActual.totalDaysInYear).toBe(366); // 2024 is a leap year
    });

    it('should handle special assessments', () => {
      const inputsWithAssessments = {
        ...validInputs,
        specialAssessments: [
          {
            description: 'Street Improvement',
            amount: 5000,
            duration: 10,
            annualAmount: 500,
            startDate: '2024-01-01',
            endDate: '2034-01-01',
            prorationIncluded: true
          }
        ]
      };

      const result = calculatePropertyTaxProration(inputsWithAssessments);
      expect(result.specialAssessmentsTotal).toBe(500);
    });

    it('should handle different escrow proration methods', () => {
      const inputsSellerPays = { ...validInputs, escrowProrationMethod: 'seller_pays_all' as const };
      const resultSellerPays = calculatePropertyTaxProration(inputsSellerPays);
      expect(resultSellerPays.sellerEscrowCredit).toBe(2000);
      expect(resultSellerPays.buyerEscrowDebit).toBe(0);

      const inputsBuyerPays = { ...validInputs, escrowProrationMethod: 'buyer_pays_all' as const };
      const resultBuyerPays = calculatePropertyTaxProration(inputsBuyerPays);
      expect(resultBuyerPays.sellerEscrowCredit).toBe(0);
      expect(resultBuyerPays.buyerEscrowDebit).toBe(2000);

      const inputsCustom = { ...validInputs, escrowProrationMethod: 'custom_split' as const, customEscrowSplit: 75 };
      const resultCustom = calculatePropertyTaxProration(inputsCustom);
      expect(resultCustom.sellerEscrowCredit).toBe(1500);
      expect(resultCustom.buyerEscrowDebit).toBe(500);
    });
  });

  describe('validatePropertyTaxProrationInputs', () => {
    it('should validate valid inputs', () => {
      const result = validatePropertyTaxProrationInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000 };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBe('Property value must be greater than 0');
    });

    it('should reject invalid property address', () => {
      const invalidInputs = { ...validInputs, propertyAddress: '' };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyAddress).toBe('Property address is required');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid_type' as any };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBe('Property type is required');
    });

    it('should reject invalid tax rates', () => {
      const invalidInputs = { ...validInputs, countyTaxRate: -1 };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.countyTaxRate).toBe('County tax rate cannot be negative');
    });

    it('should reject invalid assessed value', () => {
      const invalidInputs = { ...validInputs, assessedValue: 0 };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.assessedValue).toBe('Assessed value must be greater than 0');
    });

    it('should reject invalid closing date', () => {
      const invalidInputs = { ...validInputs, closingDate: 'invalid-date' };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.closingDate).toBe('Closing date must be a valid date');
    });

    it('should reject invalid tax year', () => {
      const invalidInputs = { ...validInputs, taxYear: 1800 };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxYear).toBe('Tax year must be 1900 or later');
    });

    it('should reject invalid proration method', () => {
      const invalidInputs = { ...validInputs, prorationMethod: 'invalid_method' as any };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.prorationMethod).toBe('Proration method is required');
    });

    it('should reject invalid date logic', () => {
      const invalidInputs = {
        ...validInputs,
        sellerOccupiedUntil: '2024-06-16',
        buyerOccupiedFrom: '2024-06-15'
      };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.dates).toBe('Seller occupied until date must be before or equal to buyer occupied from date');
    });

    it('should reject invalid exemptions', () => {
      const invalidInputs = { ...validInputs, homesteadExemptionAmount: 1000000 };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.homesteadExemptionAmount).toBe('Homestead exemption cannot exceed assessed value');
    });

    it('should reject invalid ZIP code format', () => {
      const invalidInputs = { ...validInputs, zipCode: 'invalid' };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.zipCode).toBe('ZIP code must be in valid format (e.g., 12345 or 12345-6789)');
    });

    it('should reject invalid special assessments', () => {
      const invalidInputs = {
        ...validInputs,
        specialAssessments: [
          {
            description: '',
            amount: -100,
            duration: 10,
            annualAmount: 50,
            startDate: '2024-01-01',
            endDate: '2034-01-01',
            prorationIncluded: true
          }
        ]
      };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['specialAssessments.0.description']).toBe('Special assessment description is required');
      expect(result.errors?.['specialAssessments.0.amount']).toBe('Special assessment amount cannot be negative');
    });

    it('should reject invalid tax history', () => {
      const invalidInputs = {
        ...validInputs,
        taxHistory: [
          {
            year: 1800,
            assessedValue: -1000,
            taxAmount: 15000,
            taxRate: 3.125,
            paymentDate: 'invalid-date'
          }
        ]
      };
      const result = validatePropertyTaxProrationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.['taxHistory.0.year']).toBe('Tax history year must be between 1900 and 2100');
      expect(result.errors?.['taxHistory.0.assessedValue']).toBe('Tax history assessed value cannot be negative');
      expect(result.errors?.['taxHistory.0.paymentDate']).toBe('Tax history payment date must be a valid date');
    });
  });

  describe('validateField', () => {
    it('should validate property value correctly', () => {
      const result = validateField('propertyValue', 500000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyValue', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property value must be greater than 0');
    });

    it('should validate property address correctly', () => {
      const result = validateField('propertyAddress', '123 Main St', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyAddress', '', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property address is required');
    });

    it('should validate property type correctly', () => {
      const result = validateField('propertyType', 'single_family', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyType', 'invalid_type', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property type is required and must be valid');
    });

    it('should validate property size correctly', () => {
      const result = validateField('propertySize', 2500, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertySize', -100, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Property size must be greater than 0');
    });

    it('should validate tax rates correctly', () => {
      const result = validateField('countyTaxRate', 1.25, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('countyTaxRate', -1, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('County tax rate cannot be negative');
    });

    it('should validate assessed value correctly', () => {
      const result = validateField('assessedValue', 500000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('assessedValue', 0, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Assessed value must be greater than 0');
    });

    it('should validate closing date correctly', () => {
      const result = validateField('closingDate', '2024-06-15', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('closingDate', 'invalid-date', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Closing date must be a valid date');
    });

    it('should validate tax year correctly', () => {
      const result = validateField('taxYear', 2024, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('taxYear', 1800, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Tax year must be 1900 or later');
    });

    it('should validate proration method correctly', () => {
      const result = validateField('prorationMethod', '365_day', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('prorationMethod', 'invalid_method', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Proration method is required and must be valid');
    });

    it('should validate exemptions correctly', () => {
      const result = validateField('homesteadExemptionAmount', 7000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('homesteadExemptionAmount', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Homestead exemption amount cannot be negative');
    });

    it('should validate ZIP code correctly', () => {
      const result = validateField('zipCode', '90210', validInputs);
      expect(result.isValid).toBe(true);

      const resultWithExtension = validateField('zipCode', '90210-1234', validInputs);
      expect(resultWithExtension.isValid).toBe(true);

      const invalidResult = validateField('zipCode', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('ZIP code must be in valid format (e.g., 12345 or 12345-6789)');
    });

    it('should validate special assessments correctly', () => {
      const validAssessments = [
        {
          description: 'Street Improvement',
          amount: 5000,
          duration: 10,
          annualAmount: 500,
          startDate: '2024-01-01',
          endDate: '2034-01-01',
          prorationIncluded: true
        }
      ];
      const result = validateField('specialAssessments', validAssessments, validInputs);
      expect(result.isValid).toBe(true);

      const invalidAssessments = [
        {
          description: '',
          amount: -100,
          duration: 10,
          annualAmount: 50,
          startDate: '2024-01-01',
          endDate: '2034-01-01',
          prorationIncluded: true
        }
      ];
      const invalidResult = validateField('specialAssessments', invalidAssessments, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Special assessment 1 description is required');
    });

    it('should validate tax history correctly', () => {
      const validHistory = [
        {
          year: 2023,
          assessedValue: 480000,
          taxAmount: 15000,
          taxRate: 3.125,
          paymentDate: '2023-01-01'
        }
      ];
      const result = validateField('taxHistory', validHistory, validInputs);
      expect(result.isValid).toBe(true);

      const invalidHistory = [
        {
          year: 1800,
          assessedValue: -1000,
          taxAmount: 15000,
          taxRate: 3.125,
          paymentDate: 'invalid-date'
        }
      ];
      const invalidResult = validateField('taxHistory', invalidHistory, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBe('Tax history entry 1 year must be between 1900 and 2100');
    });

    it('should validate cross-field dependencies', () => {
      // Test property value vs assessed value
      const result = validateField('propertyValue', 100000, { ...validInputs, assessedValue: 500000 });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Property value seems too low compared to assessed value');

      // Test property size vs property type
      const result2 = validateField('propertySize', 50000, { ...validInputs, propertyType: 'single_family' });
      expect(result2.isValid).toBe(false);
      expect(result2.error).toBe('Property size seems too large for a single family home');

      // Test closing date vs occupancy dates
      const result3 = validateField('closingDate', '2024-06-10', {
        ...validInputs,
        sellerOccupiedUntil: '2024-06-14',
        buyerOccupiedFrom: '2024-06-15'
      });
      expect(result3.isValid).toBe(false);
      expect(result3.error).toBe('Closing date must be after or equal to seller occupied until date');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle leap year calculations correctly', () => {
      const leapYearInputs = { ...validInputs, taxYear: 2024, prorationMethod: 'actual_days' as const };
      const result = calculatePropertyTaxProration(leapYearInputs);
      expect(result.totalDaysInYear).toBe(366);
    });

    it('should handle zero exemptions', () => {
      const noExemptionsInputs = {
        ...validInputs,
        homesteadExemption: false,
        homesteadExemptionAmount: 0
      };
      const result = calculatePropertyTaxProration(noExemptionsInputs);
      expect(result.totalExemptions).toBe(0);
      expect(result.taxableValue).toBe(validInputs.assessedValue);
    });

    it('should handle maximum exemptions', () => {
      const maxExemptionsInputs = {
        ...validInputs,
        homesteadExemptionAmount: validInputs.assessedValue
      };
      const result = calculatePropertyTaxProration(maxExemptionsInputs);
      expect(result.taxableValue).toBe(0);
      expect(result.totalAnnualTax).toBe(0);
    });

    it('should handle different payment schedules', () => {
      const monthlyInputs = { ...validInputs, taxPaymentSchedule: 'monthly' as const };
      const result = calculatePropertyTaxProration(monthlyInputs);
      expect(result.paymentSchedule.length).toBe(12);

      const quarterlyInputs = { ...validInputs, taxPaymentSchedule: 'quarterly' as const };
      const result2 = calculatePropertyTaxProration(quarterlyInputs);
      expect(result2.paymentSchedule.length).toBe(4);
    });

    it('should handle empty arrays gracefully', () => {
      const emptyArraysInputs = {
        ...validInputs,
        specialAssessments: [],
        improvementAssessments: [],
        bondAssessments: [],
        taxHistory: []
      };
      const result = calculatePropertyTaxProration(emptyArraysInputs);
      expect(result.specialAssessmentsTotal).toBe(0);
      expect(result.improvementAssessmentsTotal).toBe(0);
      expect(result.bondAssessmentsTotal).toBe(0);
    });

    it('should handle extreme values', () => {
      const extremeInputs = {
        ...validInputs,
        propertyValue: 100000000,
        assessedValue: 100000000,
        countyTaxRate: 50,
        cityTaxRate: 50,
        schoolTaxRate: 50,
        specialDistrictTaxRate: 50
      };
      const result = calculatePropertyTaxProration(extremeInputs);
      expect(result.totalAnnualTax).toBeGreaterThan(0);
      expect(result.totalAnnualTax).toBeLessThan(Infinity);
    });
  });
});