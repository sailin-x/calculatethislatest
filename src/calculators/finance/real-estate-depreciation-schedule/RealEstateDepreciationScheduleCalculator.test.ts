import { realEstateDepreciationScheduleCalculator } from './RealEstateDepreciationScheduleCalculator';
import { RealEstateDepreciationScheduleInputs } from './types';

describe('RealEstateDepreciationScheduleCalculator', () => {
  const baseInputs: RealEstateDepreciationScheduleInputs = {
    propertyCost: 1000000,
    landValue: 200000,
    placedInServiceDate: '2023-01-01',
    propertyType: 'residential',
    depreciationMethod: 'straight-line',
    bonusDepreciationPercentage: 0,
    section179Deduction: 0,
    costSegregation: false,
    costSegregationAmount: 0,
    costSegregationBreakdown: {
      fiveYear: 0,
      sevenYear: 0,
      fifteenYear: 0,
      twentySevenPointFiveYear: 0,
      thirtyNineYear: 0
    },
    taxYear: 2023,
    disposalDate: undefined,
    disposalValue: undefined,
    recaptureRate: 0.25
  };

  test('should calculate basic residential depreciation correctly', () => {
    const result = realEstateDepreciationScheduleCalculator.calculate(baseInputs);
    
    expect(result.depreciableBasis).toBe(800000); // 1M - 200k
    expect(result.annualDepreciation).toBeCloseTo(29091, 0); // 800k / 27.5
    expect(result.accumulatedDepreciation).toBeCloseTo(29091, 0);
    expect(result.remainingBasis).toBeCloseTo(770909, 0);
    expect(result.bonusDepreciation.amount).toBe(0);
    expect(result.section179Deduction.amount).toBe(0);
  });

  test('should calculate commercial depreciation correctly', () => {
    const commercialInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      propertyType: 'commercial'
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(commercialInputs);
    
    expect(result.depreciableBasis).toBe(800000);
    expect(result.annualDepreciation).toBeCloseTo(20513, 0); // 800k / 39
    expect(result.accumulatedDepreciation).toBeCloseTo(20513, 0);
  });

  test('should calculate bonus depreciation correctly', () => {
    const bonusInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      bonusDepreciationPercentage: 100
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(bonusInputs);
    
    expect(result.bonusDepreciation.amount).toBe(800000); // 100% of depreciable basis
    expect(result.bonusDepreciation.percentage).toBe(100);
    expect(result.remainingBasis).toBe(0); // All basis used up
    expect(result.annualDepreciation).toBe(0); // No remaining basis to depreciate
  });

  test('should calculate Section 179 deduction correctly', () => {
    const section179Inputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      section179Deduction: 100000
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(section179Inputs);
    
    expect(result.section179Deduction.amount).toBe(100000);
    expect(result.section179Deduction.eligible).toBe(true);
    expect(result.remainingBasis).toBe(700000); // 800k - 100k
  });

  test('should calculate cost segregation correctly', () => {
    const costSegregationInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      costSegregation: true,
      costSegregationAmount: 100000,
      costSegregationBreakdown: {
        fiveYear: 20000,
        sevenYear: 30000,
        fifteenYear: 25000,
        twentySevenPointFiveYear: 15000,
        thirtyNineYear: 10000
      }
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(costSegregationInputs);
    
    expect(result.costSegregation.totalAmount).toBe(100000);
    expect(result.costSegregation.breakdown.fiveYear).toBe(20000);
    expect(result.costSegregation.breakdown.sevenYear).toBe(30000);
    expect(result.costSegregation.annualDepreciation.fiveYear).toBe(4000); // 20k * 20%
    expect(result.costSegregation.annualDepreciation.sevenYear).toBeCloseTo(4287, 0); // 30k * 14.29%
  });

  test('should calculate tax savings correctly', () => {
    const result = realEstateDepreciationScheduleCalculator.calculate(baseInputs);
    
    expect(result.taxSavings.year1).toBeCloseTo(7273, 0); // 29091 * 25%
    expect(result.taxSavings.year2).toBeCloseTo(7273, 0);
    expect(result.taxSavings.year3).toBeCloseTo(7273, 0);
    expect(result.taxSavings.year4).toBeCloseTo(7273, 0);
    expect(result.taxSavings.year5).toBeCloseTo(7273, 0);
    expect(result.taxSavings.total).toBeCloseTo(36365, 0);
  });

  test('should calculate disposal analysis correctly', () => {
    const disposalInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      disposalDate: '2028-01-01',
      disposalValue: 1200000
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(disposalInputs);
    
    expect(result.disposalAnalysis.gainOrLoss).toBeGreaterThan(0);
    expect(result.disposalAnalysis.recaptureAmount).toBeGreaterThan(0);
    expect(result.disposalAnalysis.capitalGain).toBeGreaterThan(0);
    expect(result.disposalAnalysis.totalTax).toBeGreaterThan(0);
  });

  test('should calculate depreciation schedule correctly', () => {
    const result = realEstateDepreciationScheduleCalculator.calculate(baseInputs);
    
    expect(result.depreciationSchedule).toHaveLength(28); // 27.5 years rounded up
    expect(result.depreciationSchedule[0].year).toBe(1);
    expect(result.depreciationSchedule[0].beginningBasis).toBe(800000);
    expect(result.depreciationSchedule[0].depreciation).toBeCloseTo(29091, 0);
    expect(result.depreciationSchedule[0].accumulatedDepreciation).toBeCloseTo(29091, 0);
    expect(result.depreciationSchedule[0].endingBasis).toBeCloseTo(770909, 0);
  });

  test('should handle mixed-use property correctly', () => {
    const mixedUseInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      propertyType: 'mixed-use'
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(mixedUseInputs);
    
    expect(result.depreciableBasis).toBe(800000);
    expect(result.annualDepreciation).toBeCloseTo(20513, 0); // 39-year depreciation
  });

  test('should validate inputs correctly', () => {
    const validInputs: RealEstateDepreciationScheduleInputs = {
      propertyCost: 500000,
      landValue: 100000,
      placedInServiceDate: '2023-06-01',
      propertyType: 'commercial',
      depreciationMethod: 'accelerated',
      bonusDepreciationPercentage: 50,
      section179Deduction: 50000,
      costSegregation: true,
      costSegregationAmount: 50000,
      costSegregationBreakdown: {
        fiveYear: 10000,
        sevenYear: 15000,
        fifteenYear: 10000,
        twentySevenPointFiveYear: 10000,
        thirtyNineYear: 5000
      },
      taxYear: 2023,
      disposalDate: '2030-01-01',
      disposalValue: 600000,
      recaptureRate: 0.25
    };

    const validation = realEstateDepreciationScheduleCalculator.validate(validInputs);
    expect(validation.propertyCost).toBe(true);
    expect(validation.landValue).toBe(true);
    expect(validation.propertyType).toBe(true);
    expect(validation.depreciationMethod).toBe(true);
  });

  test('should reject invalid property cost', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      propertyCost: -1000000
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject land value exceeding property cost', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      landValue: 1500000 // Exceeds property cost
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid property type', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      propertyType: 'invalid' as any
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid depreciation method', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      depreciationMethod: 'invalid' as any
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid bonus depreciation percentage', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      bonusDepreciationPercentage: 150 // Exceeds 100%
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid Section 179 deduction', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      section179Deduction: 2000000 // Exceeds limit
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject disposal date before placed in service date', () => {
    const invalidInputs: RealEstateDepreciationScheduleInputs = {
      ...baseInputs,
      disposalDate: '2022-01-01' // Before placed in service
    };

    expect(() => realEstateDepreciationScheduleCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should handle complex scenario with all features', () => {
    const complexInputs: RealEstateDepreciationScheduleInputs = {
      propertyCost: 2000000,
      landValue: 400000,
      placedInServiceDate: '2023-03-15',
      propertyType: 'commercial',
      depreciationMethod: 'accelerated',
      bonusDepreciationPercentage: 80,
      section179Deduction: 100000,
      costSegregation: true,
      costSegregationAmount: 200000,
      costSegregationBreakdown: {
        fiveYear: 40000,
        sevenYear: 60000,
        fifteenYear: 50000,
        twentySevenPointFiveYear: 30000,
        thirtyNineYear: 20000
      },
      taxYear: 2023,
      disposalDate: '2035-01-01',
      disposalValue: 2500000,
      recaptureRate: 0.25
    };

    const result = realEstateDepreciationScheduleCalculator.calculate(complexInputs);
    
    expect(result.depreciableBasis).toBe(1600000); // 2M - 400k
    expect(result.bonusDepreciation.amount).toBe(1280000); // 80% of 1.6M
    expect(result.section179Deduction.amount).toBe(100000);
    expect(result.costSegregation.totalAmount).toBe(200000);
    expect(result.disposalAnalysis.gainOrLoss).toBeGreaterThan(0);
    expect(result.taxSavings.total).toBeGreaterThan(0);
  });
});