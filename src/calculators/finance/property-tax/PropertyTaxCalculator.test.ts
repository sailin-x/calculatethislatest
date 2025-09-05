import { propertyTaxCalculator } from './PropertyTaxCalculator';
import { PropertyTaxInputs } from './types';

describe('PropertyTaxCalculator', () => {
  const baseInputs: PropertyTaxInputs = {
    propertyValue: 500000,
    taxRate: 1.2,
    exemptions: 0,
    assessmentRatio: 1.0,
    homesteadExemption: 0,
    seniorExemption: 0,
    disabilityExemption: 0,
    veteranExemption: 0,
    localTaxes: 0,
    specialAssessments: 0
  };

  test('should calculate basic property tax correctly', () => {
    const result = propertyTaxCalculator.calculate(baseInputs);
    
    expect(result.assessedValue).toBe(500000);
    expect(result.taxableValue).toBe(500000);
    expect(result.annualPropertyTax).toBe(6000); // 500000 * 0.012
    expect(result.monthlyPropertyTax).toBe(500);
    expect(result.effectiveTaxRate).toBe(1.2);
    expect(result.totalExemptions).toBe(0);
    expect(result.taxSavings).toBe(0);
  });

  test('should calculate property tax with exemptions', () => {
    const inputs: PropertyTaxInputs = {
      ...baseInputs,
      homesteadExemption: 50000,
      seniorExemption: 25000
    };

    const result = propertyTaxCalculator.calculate(inputs);
    
    expect(result.assessedValue).toBe(500000);
    expect(result.taxableValue).toBe(425000); // 500000 - 75000
    expect(result.annualPropertyTax).toBe(5100); // 425000 * 0.012
    expect(result.totalExemptions).toBe(75000);
    expect(result.taxSavings).toBe(900); // 75000 * 0.012
  });

  test('should calculate property tax with assessment ratio', () => {
    const inputs: PropertyTaxInputs = {
      ...baseInputs,
      assessmentRatio: 0.8
    };

    const result = propertyTaxCalculator.calculate(inputs);
    
    expect(result.assessedValue).toBe(400000); // 500000 * 0.8
    expect(result.taxableValue).toBe(400000);
    expect(result.annualPropertyTax).toBe(4800); // 400000 * 0.012
  });

  test('should calculate property tax with local taxes and special assessments', () => {
    const inputs: PropertyTaxInputs = {
      ...baseInputs,
      localTaxes: 500,
      specialAssessments: 300
    };

    const result = propertyTaxCalculator.calculate(inputs);
    
    expect(result.annualPropertyTax).toBe(6800); // 6000 + 500 + 300
    expect(result.breakdown.baseTax).toBe(6000);
    expect(result.breakdown.localTaxes).toBe(500);
    expect(result.breakdown.specialAssessments).toBe(300);
  });

  test('should handle zero taxable value with high exemptions', () => {
    const inputs: PropertyTaxInputs = {
      ...baseInputs,
      homesteadExemption: 500000
    };

    const result = propertyTaxCalculator.calculate(inputs);
    
    expect(result.taxableValue).toBe(0);
    expect(result.annualPropertyTax).toBe(0);
    expect(result.taxSavings).toBe(6000);
  });

  test('should validate inputs correctly', () => {
    const validInputs: PropertyTaxInputs = {
      propertyValue: 300000,
      taxRate: 1.5,
      exemptions: 10000,
      assessmentRatio: 0.9,
      homesteadExemption: 25000,
      seniorExemption: 0,
      disabilityExemption: 0,
      veteranExemption: 0,
      localTaxes: 200,
      specialAssessments: 100
    };

    const validation = propertyTaxCalculator.validate(validInputs);
    expect(validation.propertyValue).toBe(true);
    expect(validation.taxRate).toBe(true);
    expect(validation.exemptions).toBe(true);
    expect(validation.assessmentRatio).toBe(true);
  });

  test('should reject invalid property value', () => {
    const invalidInputs: PropertyTaxInputs = {
      ...baseInputs,
      propertyValue: -1000
    };

    expect(() => propertyTaxCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid tax rate', () => {
    const invalidInputs: PropertyTaxInputs = {
      ...baseInputs,
      taxRate: 60
    };

    expect(() => propertyTaxCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject negative exemptions', () => {
    const invalidInputs: PropertyTaxInputs = {
      ...baseInputs,
      homesteadExemption: -1000
    };

    expect(() => propertyTaxCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should calculate complex scenario with all exemptions', () => {
    const inputs: PropertyTaxInputs = {
      propertyValue: 750000,
      taxRate: 1.8,
      exemptions: 15000,
      assessmentRatio: 0.85,
      homesteadExemption: 75000,
      seniorExemption: 30000,
      disabilityExemption: 20000,
      veteranExemption: 10000,
      localTaxes: 800,
      specialAssessments: 500
    };

    const result = propertyTaxCalculator.calculate(inputs);
    
    expect(result.assessedValue).toBe(637500); // 750000 * 0.85
    expect(result.totalExemptions).toBe(150000); // 15000 + 75000 + 30000 + 20000 + 10000
    expect(result.taxableValue).toBe(487500); // 637500 - 150000
    expect(result.annualPropertyTax).toBe(9575); // (487500 * 0.018) + 800 + 500
    expect(result.taxSavings).toBe(2700); // 150000 * 0.018
  });
});