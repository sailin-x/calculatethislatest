import { realEstateDepreciationScheduleCalculator } from './RealEstateDepreciationScheduleCalculator';
import { calculateRealEstateDepreciation } from './formulas';

describe('Real Estate Depreciation Schedule Calculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(realEstateDepreciationScheduleCalculator.id).toBe('real-estate-depreciation-schedule-calculator');
      expect(realEstateDepreciationScheduleCalculator.title).toBe('Real Estate Depreciation Schedule Calculator');
      expect(realEstateDepreciationScheduleCalculator.category).toBe('finance');
      expect(realEstateDepreciationScheduleCalculator.subcategory).toBe('Mortgage & Real Estate');
    });

    it('should have required inputs', () => {
      const requiredInputs = realEstateDepreciationScheduleCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'propertyCost')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'depreciationStartDate')).toBe(true);
    });

    it('should have outputs', () => {
      expect(realEstateDepreciationScheduleCalculator.outputs.length).toBeGreaterThan(0);
      expect(realEstateDepreciationScheduleCalculator.outputs.some(output => output.id === 'annualDepreciation')).toBe(true);
    });
  });

  describe('Depreciation Calculations', () => {
    it('should calculate straight-line depreciation correctly', () => {
      const inputs = {
        calculationType: 'straight_line',
        costBasis: 400000,
        salvageValue: 0,
        usefulLife: 27.5,
        currentYear: 1
      };

      const result = calculateRealEstateDepreciation(inputs);

      expect(result).toBeDefined();
      expect(result.annualDepreciation).toBeCloseTo(14545.45, 2);
      expect(result.depreciableBasis).toBe(400000);
    });

    it('should calculate bonus depreciation correctly', () => {
      const inputs = {
        calculationType: 'bonus_depreciation',
        qualifiedPropertyCost: 200000,
        bonusPercentage: 80,
        businessUsePercentage: 100,
        taxYear: 2024
      };

      const result = calculateRealEstateDepreciation(inputs);

      expect(result).toBeDefined();
      expect(result.bonusDepreciation).toBe(160000); // 80% of 200,000
      expect(result.remainingBasis).toBe(40000);
    });

    it('should calculate Section 179 deduction correctly', () => {
      const inputs = {
        calculationType: 'section_179',
        equipmentCost: 100000,
        businessUsePercentage: 100,
        section179Limit: 1080000
      };

      const result = calculateRealEstateDepreciation(inputs);

      expect(result).toBeDefined();
      expect(result.section179Deduction).toBe(100000);
      expect(result.businessUseCost).toBe(100000);
    });

    it('should handle comprehensive analysis', () => {
      const inputs = {
        calculationType: 'comprehensive',
        costBasis: 400000,
        qualifiedPropertyCost: 200000,
        equipmentCost: 50000,
        bonusPercentage: 80,
        businessUsePercentage: 100,
        section179Limit: 1080000
      };

      const result = calculateRealEstateDepreciation(inputs);

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.summary.totalFirstYearDepreciation).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required inputs', () => {
      const validationRules = realEstateDepreciationScheduleCalculator.validationRules;
      expect(validationRules).toBeDefined();
      expect(Array.isArray(validationRules)).toBe(true);
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      const examples = realEstateDepreciationScheduleCalculator.examples;
      expect(examples.length).toBeGreaterThan(0);

      examples.forEach(example => {
        expect(example.title).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });
});