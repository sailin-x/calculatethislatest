import { describe, it, expect } from 'vitest';
import { realEstateDepreciationScheduleCalculator } from './RealEstateDepreciationScheduleCalculator';
import { calculateRealEstateDepreciationSchedule } from './formulas';
import { validateRealEstateDepreciationScheduleInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Real Estate Depreciation Schedule Calculator', () => {
  describe('calculateRealEstateDepreciationSchedule', () => {
    it('should calculate MACRS residential depreciation correctly', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const result = calculateRealEstateDepreciationSchedule(inputs);

      expect(result.depreciableBasis).toBe(400000);
      expect(result.annualDepreciation).toBeCloseTo(11757.4, 1);
      expect(result.totalDepreciation).toBeCloseTo(117574, -2);
      expect(result.remainingBasis).toBeCloseTo(282426, -2);
      expect(result.taxBenefit).toBeCloseTo(29393.5, 0);
      expect(result.presentValueTaxBenefit).toBeGreaterThan(0);
      expect(result.depreciationSchedule).toHaveLength(10);
      expect(result.costSegregationBenefit).toBe(0);
      expect(result.effectiveTaxRate).toBe(25);
      expect(result.depreciationRecapture).toBeCloseTo(117574, -2);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });

    it('should calculate cost segregation depreciation correctly', () => {
      const inputs = {
        propertyType: 'commercial',
        propertyValue: 2000000,
        landValue: 400000,
        improvementValue: 1600000,
        placedInServiceDate: '2024-06-01',
        depreciationMethod: 'cost_segregation',
        costSegregationPercentages: {
          '5_year': 15,
          '7_year': 10,
          '15-year': 5,
          '27.5-year': 70
        },
        convention: 'mid-quarter',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 30,
        inflationRate: 2.5,
        holdingPeriod: 15
      };

      const result = calculateRealEstateDepreciationSchedule(inputs);

      expect(result.depreciableBasis).toBe(1600000);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalDepreciation).toBeGreaterThan(0);
      expect(result.remainingBasis).toBeGreaterThan(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
      expect(result.presentValueTaxBenefit).toBeGreaterThan(0);
      expect(result.depreciationSchedule).toHaveLength(15);
      expect(result.costSegregationBenefit).toBeGreaterThanOrEqual(0);
      expect(result.effectiveTaxRate).toBe(30);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });

    it('should calculate bonus depreciation and Section 179 correctly', () => {
      const inputs = {
        propertyType: 'hotel',
        propertyValue: 5000000,
        landValue: 1000000,
        improvementValue: 4000000,
        placedInServiceDate: '2024-03-01',
        depreciationMethod: 'macrs_commercial',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 20,
        section179Deduction: 1000000,
        taxRate: 35,
        inflationRate: 2.5,
        holdingPeriod: 20
      };

      const result = calculateRealEstateDepreciationSchedule(inputs);

      expect(result.depreciableBasis).toBe(4000000);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalDepreciation).toBeGreaterThan(0);
      expect(result.remainingBasis).toBeGreaterThan(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
      expect(result.presentValueTaxBenefit).toBeGreaterThan(0);
      expect(result.depreciationSchedule).toHaveLength(20);
      expect(result.costSegregationBenefit).toBe(0);
      expect(result.effectiveTaxRate).toBe(35);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });
  });

  describe('Additional utility functions', () => {
    it('should calculate convention multipliers correctly', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const result = calculateRealEstateDepreciationSchedule(inputs);
      
      // First year depreciation should be different from average due to convention
      const firstYearDepreciation = result.depreciationSchedule[0].depreciation;
      const averageDepreciation = result.annualDepreciation;
      expect(firstYearDepreciation).toBeGreaterThan(0);
      expect(averageDepreciation).toBeGreaterThan(0);
    });

    it('should handle personal use percentage correctly', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 20, // 20% personal use
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const result = calculateRealEstateDepreciationSchedule(inputs);
      
      // Depreciable basis should be reduced by personal use percentage
      expect(result.depreciableBasis).toBe(320000); // 400000 * 0.8
    });
  });

  describe('validateRealEstateDepreciationScheduleInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        propertyType: '',
        propertyValue: 0,
        landValue: -1000,
        improvementValue: 0,
        placedInServiceDate: '',
        depreciationMethod: '',
        convention: '',
        taxYear: 0,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 0,
        inflationRate: 0,
        holdingPeriod: 0
      };

      const errors = validateRealEstateDepreciationScheduleInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Property type is required');
      expect(errors).toContain('Property value is required');
      expect(errors).toContain('Land value must be between $0 and $1 billion');
    });

    it('should validate business logic', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 450000, // Too high compared to property value
        improvementValue: 100000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const errors = validateRealEstateDepreciationScheduleInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Land value seems unusually high compared to total property value');
    });

    it('should validate cost segregation requirements', () => {
      const inputs = {
        propertyType: 'commercial',
        propertyValue: 2000000,
        landValue: 400000,
        improvementValue: 1600000,
        placedInServiceDate: '2024-06-01',
        depreciationMethod: 'cost_segregation',
        convention: 'mid-quarter',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 30,
        inflationRate: 2.5,
        holdingPeriod: 15
      };

      const errors = validateRealEstateDepreciationScheduleInputs(inputs);
      expect(errors).toContain('Cost segregation percentages are required for cost segregation method');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const errors = validateRealEstateDepreciationScheduleInputs(inputs);
      expect(errors.length).toBe(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(15);
      expect(results.every(r => r.status === 'success')).toBe(true);
    });

    it('should validate property value consistency', () => {
      const inputs = {
        propertyType: 'residential_rental',
        propertyValue: 500000,
        landValue: 100000,
        improvementValue: 400000,
        placedInServiceDate: '2024-01-15',
        depreciationMethod: 'macrs_residential',
        convention: 'mid-month',
        taxYear: 2024,
        personalUsePercentage: 0,
        bonusDepreciation: 0,
        section179Deduction: 0,
        taxRate: 25,
        inflationRate: 2.5,
        holdingPeriod: 10
      };

      const results = quickValidateAllInputs(inputs);
      const propertyValueResult = results.find(r => r.field === 'propertyValue');
      expect(propertyValueResult?.status).toBe('success');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(realEstateDepreciationScheduleCalculator.id).toBe('real-estate-depreciation-schedule');
      expect(realEstateDepreciationScheduleCalculator.name).toBe('Real Estate Depreciation Schedule Calculator');
      expect(realEstateDepreciationScheduleCalculator.category).toBe('Finance');
      expect(realEstateDepreciationScheduleCalculator.inputs).toHaveLength(15);
      expect(realEstateDepreciationScheduleCalculator.outputs).toHaveLength(12);
      expect(realEstateDepreciationScheduleCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = realEstateDepreciationScheduleCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(14);
    });

    it('should have valid input types', () => {
      const inputs = realEstateDepreciationScheduleCalculator.inputs;
      const validTypes = ['number', 'select', 'text', 'date', 'object'];
      
      inputs.forEach(input => {
        expect(validTypes).toContain(input.type);
      });
    });

    it('should have valid output types', () => {
      const outputs = realEstateDepreciationScheduleCalculator.outputs;
      const validTypes = ['currency', 'percentage', 'number', 'array'];
      
      outputs.forEach(output => {
        expect(validTypes).toContain(output.type);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should process example 1 correctly', () => {
      const example = realEstateDepreciationScheduleCalculator.examples[0];
      const result = calculateRealEstateDepreciationSchedule(example.inputs);
      
      expect(result.depreciableBasis).toBe(example.expectedOutputs.depreciableBasis);
      expect(result.annualDepreciation).toBeCloseTo(example.expectedOutputs.annualDepreciation, 0);
      expect(result.totalDepreciation).toBeCloseTo(example.expectedOutputs.totalDepreciation, -2);
      expect(result.remainingBasis).toBeCloseTo(example.expectedOutputs.remainingBasis, -2);
      expect(result.taxBenefit).toBeCloseTo(example.expectedOutputs.taxBenefit, 0);
      expect(result.presentValueTaxBenefit).toBeGreaterThan(0);
      expect(result.costSegregationBenefit).toBe(example.expectedOutputs.costSegregationBenefit);
      expect(result.effectiveTaxRate).toBe(example.expectedOutputs.effectiveTaxRate);
      expect(result.depreciationRecapture).toBeCloseTo(example.expectedOutputs.depreciationRecapture, -2);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });

    it('should process example 2 correctly', () => {
      const example = realEstateDepreciationScheduleCalculator.examples[1];
      const result = calculateRealEstateDepreciationSchedule(example.inputs);
      
      expect(result.depreciableBasis).toBe(example.expectedOutputs.depreciableBasis);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalDepreciation).toBeGreaterThan(0);
      expect(result.remainingBasis).toBeGreaterThan(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
      expect(result.presentValueTaxBenefit).toBeGreaterThan(0);
      expect(result.costSegregationBenefit).toBeGreaterThanOrEqual(0);
      expect(result.effectiveTaxRate).toBe(example.expectedOutputs.effectiveTaxRate);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });

    it('should process example 3 correctly', () => {
      const example = realEstateDepreciationScheduleCalculator.examples[2];
      const result = calculateRealEstateDepreciationSchedule(example.inputs);
      
      expect(result.depreciableBasis).toBe(example.expectedOutputs.depreciableBasis);
      expect(result.annualDepreciation).toBeGreaterThan(0);
      expect(result.totalDepreciation).toBeGreaterThan(0);
      expect(result.remainingBasis).toBeGreaterThan(0);
      expect(result.taxBenefit).toBeGreaterThan(0);
      expect(result.presentValueTaxBenefit).toBeGreaterThan(0);
      expect(result.costSegregationBenefit).toBe(example.expectedOutputs.costSegregationBenefit);
      expect(result.effectiveTaxRate).toBe(example.expectedOutputs.effectiveTaxRate);
      expect(result.depreciationRecapture).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });
  });
});