import { describe, it, expect } from 'vitest';
import { realEstateTaxDeductionsCalculator } from './RealEstateTaxDeductionsCalculator';
import { calculateRealEstateTaxDeductions } from './formulas';
import { validateRealEstateTaxDeductionsInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Real Estate Tax Deductions Calculator', () => {
  describe('calculateRealEstateTaxDeductions', () => {
    it('should calculate residential rental property correctly', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const result = calculateRealEstateTaxDeductions(inputs);

      expect(result.depreciableBasis).toBe(450000);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalExpenses).toBe(40500);
      expect(result.netRentalIncome).toBeLessThan(0);
      expect(result.passiveLoss).toBeLessThan(0);
      expect(result.deductibleLoss).toBe(0);
      expect(result.suspendedLoss).toBeGreaterThan(0);
      expect(result.taxSavings).toBe(0);
      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.cashFlowAfterTax).toBeLessThan(0);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.section179Deduction).toBe(0);
    });

    it('should calculate commercial property with material participation correctly', () => {
      const inputs = {
        propertyType: 'commercial',
        purchasePrice: 1000000,
        landValue: 200000,
        improvements: 100000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 80000,
        operatingExpenses: 25000,
        propertyTaxes: 12000,
        insurance: 4800,
        mortgageInterest: 30000,
        managementFees: 4000,
        repairs: 6000,
        utilities: 2000,
        advertising: 1200,
        legalFees: 1000,
        travelExpenses: 600,
        otherExpenses: 400,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'married_joint',
        adjustedGrossIncome: 150000,
        otherPassiveIncome: 0,
        materialParticipation: 'yes',
        realEstateProfessional: 'no'
      };

      const result = calculateRealEstateTaxDeductions(inputs);

      expect(result.depreciableBasis).toBe(900000);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalExpenses).toBe(78000);
      expect(result.netRentalIncome).toBeLessThan(0);
      expect(result.passiveLoss).toBe(0);
      expect(result.deductibleLoss).toBeLessThan(0);
      expect(result.suspendedLoss).toBe(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.cashFlowAfterTax).toBeLessThan(0);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.section179Deduction).toBeGreaterThan(0);
    });

    it('should calculate real estate professional correctly', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 750000,
        landValue: 150000,
        improvements: 75000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 54000,
        operatingExpenses: 18000,
        propertyTaxes: 9000,
        insurance: 3600,
        mortgageInterest: 22500,
        managementFees: 2700,
        repairs: 4500,
        utilities: 0,
        advertising: 900,
        legalFees: 750,
        travelExpenses: 450,
        otherExpenses: 300,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 120000,
        otherPassiveIncome: 0,
        materialParticipation: 'yes',
        realEstateProfessional: 'yes'
      };

      const result = calculateRealEstateTaxDeductions(inputs);

      expect(result.depreciableBasis).toBe(675000);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalExpenses).toBe(60750);
      expect(result.netRentalIncome).toBeLessThan(0);
      expect(result.passiveLoss).toBe(0);
      expect(result.deductibleLoss).toBeLessThan(0);
      expect(result.suspendedLoss).toBe(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.cashFlowAfterTax).toBeLessThan(0);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.section179Deduction).toBe(0);
    });
  });

  describe('Additional utility functions', () => {
    it('should calculate depreciation correctly for different property types', () => {
      const residentialInputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const commercialInputs = {
        ...residentialInputs,
        propertyType: 'commercial'
      };

      const residentialResult = calculateRealEstateTaxDeductions(residentialInputs);
      const commercialResult = calculateRealEstateTaxDeductions(commercialInputs);

      // Commercial property should have lower annual depreciation due to longer recovery period
      expect(commercialResult.annualDepreciation).toBeLessThan(residentialResult.annualDepreciation);
    });

    it('should handle personal use days correctly', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 30,
        rentalDays: 335,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const result = calculateRealEstateTaxDeductions(inputs);
      
      // Net rental income should be reduced due to personal use
      expect(result.netRentalIncome).toBeLessThan(-20000);
    });
  });

  describe('validateRealEstateTaxDeductionsInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        propertyType: '',
        purchasePrice: 0,
        landValue: -1000,
        improvements: 0,
        acquisitionDate: '',
        placedInServiceDate: '',
        annualRentalIncome: 0,
        operatingExpenses: 0,
        propertyTaxes: 0,
        insurance: 0,
        mortgageInterest: 0,
        managementFees: 0,
        repairs: 0,
        utilities: 0,
        advertising: 0,
        legalFees: 0,
        travelExpenses: 0,
        otherExpenses: 0,
        personalUseDays: 0,
        rentalDays: 0,
        taxYear: 0,
        filingStatus: '',
        adjustedGrossIncome: 0,
        otherPassiveIncome: 0,
        materialParticipation: '',
        realEstateProfessional: ''
      };

      const errors = validateRealEstateTaxDeductionsInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Property type is required');
      expect(errors).toContain('Purchase price is required');
      expect(errors).toContain('Land value is required');
    });

    it('should validate business logic', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 600000, // Exceeds purchase price
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const errors = validateRealEstateTaxDeductionsInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Land value cannot exceed purchase price');
    });

    it('should validate date logic', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2023-12-31', // Before acquisition date
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const errors = validateRealEstateTaxDeductionsInputs(inputs);
      expect(errors).toContain('Placed in service date cannot be before acquisition date');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const errors = validateRealEstateTaxDeductionsInputs(inputs);
      expect(errors.length).toBe(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(28);
      expect(results.every(r => r.status === 'success')).toBe(true);
    });

    it('should validate property type correctly', () => {
      const inputs = {
        propertyType: 'residential',
        purchasePrice: 500000,
        landValue: 100000,
        improvements: 50000,
        acquisitionDate: '2024-01-01',
        placedInServiceDate: '2024-01-01',
        annualRentalIncome: 36000,
        operatingExpenses: 12000,
        propertyTaxes: 6000,
        insurance: 2400,
        mortgageInterest: 15000,
        managementFees: 1800,
        repairs: 3000,
        utilities: 0,
        advertising: 600,
        legalFees: 500,
        travelExpenses: 300,
        otherExpenses: 200,
        personalUseDays: 0,
        rentalDays: 365,
        taxYear: 2024,
        filingStatus: 'single',
        adjustedGrossIncome: 100000,
        otherPassiveIncome: 0,
        materialParticipation: 'no',
        realEstateProfessional: 'no'
      };

      const results = quickValidateAllInputs(inputs);
      const propertyTypeResult = results.find(r => r.field === 'propertyType');
      expect(propertyTypeResult?.status).toBe('success');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(realEstateTaxDeductionsCalculator.id).toBe('real-estate-tax-deductions');
      expect(realEstateTaxDeductionsCalculator.name).toBe('Real Estate Tax Deductions Calculator');
      expect(realEstateTaxDeductionsCalculator.category).toBe('Finance');
      expect(realEstateTaxDeductionsCalculator.inputs).toHaveLength(28);
      expect(realEstateTaxDeductionsCalculator.outputs).toHaveLength(12);
      expect(realEstateTaxDeductionsCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = realEstateTaxDeductionsCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(28);
    });

    it('should have valid input types', () => {
      const inputs = realEstateTaxDeductionsCalculator.inputs;
      const validTypes = ['number', 'select', 'text', 'date', 'object'];
      
      inputs.forEach(input => {
        expect(validTypes).toContain(input.type);
      });
    });

    it('should have valid output types', () => {
      const outputs = realEstateTaxDeductionsCalculator.outputs;
      const validTypes = ['currency', 'percentage', 'number', 'array'];
      
      outputs.forEach(output => {
        expect(validTypes).toContain(output.type);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should process example 1 correctly', () => {
      const example = realEstateTaxDeductionsCalculator.examples[0];
      const result = calculateRealEstateTaxDeductions(example.inputs);
      
      expect(result.depreciableBasis).toBe(example.expectedOutputs.depreciableBasis);
      expect(result.annualDepreciation).toBeCloseTo(example.expectedOutputs.annualDepreciation, 0);
      expect(result.totalExpenses).toBe(example.expectedOutputs.totalExpenses);
      expect(result.netRentalIncome).toBeCloseTo(example.expectedOutputs.netRentalIncome, 0);
      expect(result.passiveLoss).toBeCloseTo(example.expectedOutputs.passiveLoss, 0);
      expect(result.deductibleLoss).toBe(example.expectedOutputs.deductibleLoss);
      expect(result.suspendedLoss).toBeCloseTo(example.expectedOutputs.suspendedLoss, 0);
      expect(result.taxSavings).toBe(example.expectedOutputs.taxSavings);
      expect(result.effectiveTaxRate).toBeCloseTo(example.expectedOutputs.effectiveTaxRate, 2);
      expect(result.cashFlowAfterTax).toBeCloseTo(example.expectedOutputs.cashFlowAfterTax, 0);
      expect(result.depreciationRecapture).toBeCloseTo(example.expectedOutputs.depreciationRecapture, 0);
      expect(result.section179Deduction).toBe(example.expectedOutputs.section179Deduction);
    });

    it('should process example 2 correctly', () => {
      const example = realEstateTaxDeductionsCalculator.examples[1];
      const result = calculateRealEstateTaxDeductions(example.inputs);
      
      expect(result.depreciableBasis).toBe(example.expectedOutputs.depreciableBasis);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalExpenses).toBe(example.expectedOutputs.totalExpenses);
      expect(result.netRentalIncome).toBeLessThan(0);
      expect(result.passiveLoss).toBe(0);
      expect(result.deductibleLoss).toBeLessThan(0);
      expect(result.suspendedLoss).toBe(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.cashFlowAfterTax).toBeLessThan(0);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.section179Deduction).toBeGreaterThan(0);
    });

    it('should process example 3 correctly', () => {
      const example = realEstateTaxDeductionsCalculator.examples[2];
      const result = calculateRealEstateTaxDeductions(example.inputs);
      
      expect(result.depreciableBasis).toBe(example.expectedOutputs.depreciableBasis);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalExpenses).toBe(example.expectedOutputs.totalExpenses);
      expect(result.netRentalIncome).toBeLessThan(0);
      expect(result.passiveLoss).toBe(0);
      expect(result.deductibleLoss).toBeLessThan(0);
      expect(result.suspendedLoss).toBe(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.cashFlowAfterTax).toBeLessThan(0);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.section179Deduction).toBe(0);
    });
  });
});