import { describe, it, expect } from 'vitest';
import { ConservationEasementTaxBenefitCalculator } from './ConservationEasementTaxBenefitCalculator';
import { calculateTaxBenefits } from './formulas';
import { validateTaxBenefitInputs } from './validation';
import { validateAllTaxBenefitInputs } from './quickValidation';

describe('Conservation Easement Tax Benefit Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(ConservationEasementTaxBenefitCalculator.id).toBe('conservation-easement-tax-benefit-calculator');
      expect(ConservationEasementTaxBenefitCalculator.name).toBe('Conservation Easement Tax Benefit Calculator');
      expect(ConservationEasementTaxBenefitCalculator.category).toBe('finance');
      expect(ConservationEasementTaxBenefitCalculator.subcategory).toBe('tax');
    });

    it('should have required inputs', () => {
      const inputIds = ConservationEasementTaxBenefitCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('propertyValue');
      expect(inputIds).toContain('easementValue');
      expect(inputIds).toContain('propertyValueAfter');
      expect(inputIds).toContain('acres');
      expect(inputIds).toContain('easementAcres');
      expect(inputIds).toContain('taxYear');
      expect(inputIds).toContain('adjustedGrossIncome');
      expect(inputIds).toContain('marginalTaxRate');
      expect(inputIds).toContain('stateTaxRate');
      expect(inputIds).toContain('otherCharitableDeductions');
      expect(inputIds).toContain('appraisalCost');
      expect(inputIds).toContain('legalCost');
      expect(inputIds).toContain('surveyCost');
      expect(inputIds).toContain('easementDuration');
      expect(inputIds).toContain('propertyType');
      expect(inputIds).toContain('easementType');
      expect(inputIds).toContain('easementHolder');
      expect(inputIds).toContain('donorType');
      expect(inputIds).toContain('developmentRights');
      expect(inputIds).toContain('publicAccess');
      expect(inputIds).toContain('conservationPurpose');
    });

    it('should have required outputs', () => {
      const outputIds = ConservationEasementTaxBenefitCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('charitableDeduction');
      expect(outputIds).toContain('federalTaxSavings');
      expect(outputIds).toContain('stateTaxSavings');
      expect(outputIds).toContain('totalTaxSavings');
      expect(outputIds).toContain('deductionLimit');
      expect(outputIds).toContain('carryforwardAmount');
      expect(outputIds).toContain('carryforwardYears');
      expect(outputIds).toContain('netBenefit');
      expect(outputIds).toContain('benefitCostRatio');
      expect(outputIds).toContain('easementValuePerAcre');
      expect(outputIds).toContain('propertyValueReduction');
      expect(outputIds).toContain('estateTaxBenefit');
      expect(outputIds).toContain('annualTaxSavings');
      expect(outputIds).toContain('transactionCosts');
      expect(outputIds).toContain('easementAnalysis');
    });

    it('should have calculate function', () => {
      expect(typeof ConservationEasementTaxBenefitCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof ConservationEasementTaxBenefitCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    const validInputs = {
      propertyValue: 1000000,
      easementValue: 300000,
      propertyValueAfter: 700000,
      acres: 100,
      easementAcres: 80,
      taxYear: 2024,
      adjustedGrossIncome: 200000,
      marginalTaxRate: 32,
      stateTaxRate: 5,
      otherCharitableDeductions: 50000,
      appraisalCost: 5000,
      legalCost: 10000,
      surveyCost: 3000,
      easementDuration: 50,
      propertyType: 'farmland',
      easementType: 'perpetual',
      easementHolder: 'land-trust',
      donorType: 'individual',
      developmentRights: ['residential', 'commercial'],
      publicAccess: 'limited',
      conservationPurpose: ['wildlife', 'agricultural']
    };

    it('should validate correct inputs', () => {
      const result = validateTaxBenefitInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.propertyValue;
      
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('propertyValue is required');
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: 5000 };
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $10,000');
    });

    it('should reject easement acres exceeding total acres', () => {
      const invalidInputs = { ...validInputs, easementAcres: 150 };
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Easement acres cannot exceed total property acres');
    });

    it('should reject invalid tax year', () => {
      const invalidInputs = { ...validInputs, taxYear: 2010 };
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tax year must be at least 2015');
    });

    it('should reject negative income', () => {
      const invalidInputs = { ...validInputs, adjustedGrossIncome: -1000 };
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Adjusted gross income cannot be negative');
    });

    it('should reject invalid tax rates', () => {
      const invalidInputs = { ...validInputs, marginalTaxRate: 5 };
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Marginal tax rate must be at least 10%');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid' };
      const result = validateTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid property type');
    });
  });

  describe('Calculation Logic', () => {
    const testInputs = {
      propertyValue: 1000000,
      easementValue: 300000,
      propertyValueAfter: 700000,
      acres: 100,
      easementAcres: 80,
      taxYear: 2024,
      adjustedGrossIncome: 200000,
      marginalTaxRate: 32,
      stateTaxRate: 5,
      otherCharitableDeductions: 50000,
      appraisalCost: 5000,
      legalCost: 10000,
      surveyCost: 3000,
      easementDuration: 50,
      propertyType: 'farmland',
      easementType: 'perpetual',
      easementHolder: 'land-trust',
      donorType: 'individual',
      developmentRights: ['residential', 'commercial'],
      publicAccess: 'limited',
      conservationPurpose: ['wildlife', 'agricultural']
    };

    it('should calculate charitable deduction correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      expect(outputs.charitableDeduction).toBe(300000);
    });

    it('should calculate federal tax savings correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 300,000 * 0.32 = 96,000
      expect(outputs.federalTaxSavings).toBe(96000);
    });

    it('should calculate state tax savings correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 300,000 * 0.05 = 15,000
      expect(outputs.stateTaxSavings).toBe(15000);
    });

    it('should calculate total tax savings correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 96,000 + 15,000 = 111,000
      expect(outputs.totalTaxSavings).toBe(111000);
    });

    it('should calculate deduction limit correctly for individual', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 200,000 * 0.30 = 60,000
      expect(outputs.deductionLimit).toBe(60000);
    });

    it('should calculate carryforward amount correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 300,000 - 60,000 = 240,000
      expect(outputs.carryforwardAmount).toBe(240000);
    });

    it('should calculate carryforward years correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 240,000 / 60,000 = 4 years
      expect(outputs.carryforwardYears).toBe(4);
    });

    it('should calculate transaction costs correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 5,000 + 10,000 + 3,000 = 18,000
      expect(outputs.transactionCosts).toBe(18000);
    });

    it('should calculate net benefit correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 111,000 - 18,000 = 93,000
      expect(outputs.netBenefit).toBe(93000);
    });

    it('should calculate benefit-cost ratio correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 111,000 / 18,000 = 6.17
      expect(outputs.benefitCostRatio).toBe(6.2);
    });

    it('should calculate easement value per acre correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 300,000 / 80 = 3,750
      expect(outputs.easementValuePerAcre).toBe(3750);
    });

    it('should calculate property value reduction correctly', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // (1,000,000 - 700,000) / 1,000,000 * 100 = 30%
      expect(outputs.propertyValueReduction).toBe(30);
    });
  });

  describe('Tax Benefit Analysis', () => {
    const testInputs = {
      propertyValue: 2000000,
      easementValue: 600000,
      propertyValueAfter: 1400000,
      acres: 200,
      easementAcres: 150,
      taxYear: 2024,
      adjustedGrossIncome: 500000,
      marginalTaxRate: 37,
      stateTaxRate: 7,
      otherCharitableDeductions: 100000,
      appraisalCost: 8000,
      legalCost: 15000,
      surveyCost: 5000,
      easementDuration: 75,
      propertyType: 'forest',
      easementType: 'perpetual',
      easementHolder: 'government',
      donorType: 'corporation',
      developmentRights: ['logging', 'mining'],
      publicAccess: 'full',
      conservationPurpose: ['forest', 'wildlife']
    };

    it('should calculate higher tax savings for higher income', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 600,000 * 0.37 = 222,000 federal
      // 600,000 * 0.07 = 42,000 state
      // Total: 264,000
      expect(outputs.federalTaxSavings).toBe(222000);
      expect(outputs.stateTaxSavings).toBe(42000);
      expect(outputs.totalTaxSavings).toBe(264000);
    });

    it('should calculate different deduction limits for corporations', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 500,000 * 0.10 = 50,000
      expect(outputs.deductionLimit).toBe(50000);
    });

    it('should calculate longer carryforward for corporations', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // 600,000 - 50,000 = 550,000 carryforward
      // 550,000 / 50,000 = 11 years
      expect(outputs.carryforwardAmount).toBe(550000);
      expect(outputs.carryforwardYears).toBe(11);
    });

    it('should calculate estate tax benefits', () => {
      const outputs = calculateTaxBenefits(testInputs);
      // Estate tax benefit should be calculated based on property value reduction
      expect(outputs.estateTaxBenefit).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero easement value', () => {
      const inputs = {
        propertyValue: 1000000,
        easementValue: 0,
        propertyValueAfter: 1000000,
        acres: 100,
        easementAcres: 50,
        taxYear: 2024,
        adjustedGrossIncome: 100000,
        marginalTaxRate: 24,
        stateTaxRate: 5,
        otherCharitableDeductions: 0,
        appraisalCost: 0,
        legalCost: 0,
        surveyCost: 0,
        easementDuration: 30,
        propertyType: 'farmland',
        easementType: 'perpetual',
        easementHolder: 'land-trust',
        donorType: 'individual',
        developmentRights: ['none'],
        publicAccess: 'none',
        conservationPurpose: ['agricultural']
      };

      const outputs = calculateTaxBenefits(inputs);
      expect(outputs.charitableDeduction).toBe(0);
      expect(outputs.federalTaxSavings).toBe(0);
      expect(outputs.stateTaxSavings).toBe(0);
      expect(outputs.totalTaxSavings).toBe(0);
    });

    it('should handle maximum easement value', () => {
      const inputs = {
        propertyValue: 100000000,
        easementValue: 50000000,
        propertyValueAfter: 50000000,
        acres: 1000,
        easementAcres: 800,
        taxYear: 2024,
        adjustedGrossIncome: 10000000,
        marginalTaxRate: 37,
        stateTaxRate: 15,
        otherCharitableDeductions: 0,
        appraisalCost: 50000,
        legalCost: 100000,
        surveyCost: 50000,
        easementDuration: 100,
        propertyType: 'wildlife-habitat',
        easementType: 'perpetual',
        easementHolder: 'government',
        donorType: 'corporation',
        developmentRights: ['none'],
        publicAccess: 'full',
        conservationPurpose: ['wildlife', 'scenic']
      };

      const outputs = calculateTaxBenefits(inputs);
      expect(outputs.charitableDeduction).toBe(50000000);
      expect(outputs.federalTaxSavings).toBe(18500000); // 50M * 0.37
      expect(outputs.stateTaxSavings).toBe(7500000); // 50M * 0.15
    });

    it('should handle minimum property values', () => {
      const inputs = {
        propertyValue: 10000,
        easementValue: 3000,
        propertyValueAfter: 7000,
        acres: 1,
        easementAcres: 0.5,
        taxYear: 2024,
        adjustedGrossIncome: 50000,
        marginalTaxRate: 22,
        stateTaxRate: 5,
        otherCharitableDeductions: 0,
        appraisalCost: 1000,
        legalCost: 2000,
        surveyCost: 500,
        easementDuration: 30,
        propertyType: 'open-space',
        easementType: 'perpetual',
        easementHolder: 'land-trust',
        donorType: 'individual',
        developmentRights: ['none'],
        publicAccess: 'limited',
        conservationPurpose: ['open-space']
      };

      const outputs = calculateTaxBenefits(inputs);
      expect(outputs.charitableDeduction).toBe(3000);
      expect(outputs.federalTaxSavings).toBe(660); // 3000 * 0.22
      expect(outputs.stateTaxSavings).toBe(150); // 3000 * 0.05
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validatePropertyValue } = require('./quickValidation');
      
      expect(validatePropertyValue(1000000).isValid).toBe(true);
      expect(validatePropertyValue(5000).isValid).toBe(false);
      expect(validatePropertyValue('invalid').isValid).toBe(false);
      expect(validatePropertyValue('').isValid).toBe(false);
    });

    it('should validate all inputs correctly', () => {
      const validInputs = {
        propertyValue: 1000000,
        easementValue: 300000,
        propertyValueAfter: 700000,
        acres: 100,
        easementAcres: 80,
        taxYear: 2024,
        adjustedGrossIncome: 200000,
        marginalTaxRate: 32,
        stateTaxRate: 5,
        otherCharitableDeductions: 50000,
        appraisalCost: 5000,
        legalCost: 10000,
        surveyCost: 3000,
        easementDuration: 50,
        propertyType: 'farmland',
        easementType: 'perpetual',
        easementHolder: 'land-trust',
        donorType: 'individual',
        developmentRights: ['residential', 'commercial'],
        publicAccess: 'limited',
        conservationPurpose: ['wildlife', 'agricultural']
      };

      const result = validateAllTaxBenefitInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch validation errors in quick validation', () => {
      const invalidInputs = {
        propertyValue: 5000, // Too low
        easementValue: 300000,
        propertyValueAfter: 700000,
        acres: 100,
        easementAcres: 150, // Exceeds total acres
        taxYear: 2010, // Too old
        adjustedGrossIncome: 200000,
        marginalTaxRate: 32,
        stateTaxRate: 5,
        otherCharitableDeductions: 50000,
        appraisalCost: 5000,
        legalCost: 10000,
        surveyCost: 3000,
        easementDuration: 50,
        propertyType: 'invalid', // Invalid type
        easementType: 'perpetual',
        easementHolder: 'land-trust',
        donorType: 'individual',
        developmentRights: ['residential', 'commercial'],
        publicAccess: 'limited',
        conservationPurpose: ['wildlife', 'agricultural']
      };

      const result = validateAllTaxBenefitInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
