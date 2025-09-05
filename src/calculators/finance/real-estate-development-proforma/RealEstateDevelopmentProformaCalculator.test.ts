import { realEstateDevelopmentProformaCalculator } from './RealEstateDevelopmentProformaCalculator';
import { RealEstateDevelopmentProformaInputs } from './types';

describe('RealEstateDevelopmentProformaCalculator', () => {
  const baseInputs: RealEstateDevelopmentProformaInputs = {
    projectName: 'Test Development',
    projectType: 'residential',
    totalUnits: 100,
    averageUnitSize: 1000,
    constructionCost: 15000000,
    landCost: 5000000,
    softCosts: 2000000,
    financingCosts: 500000,
    contingency: 1000000,
    developmentPeriod: 2,
    stabilizationPeriod: 1,
    averageRent: 2000,
    occupancyRate: 0.95,
    operatingExpenses: 1200000,
    managementFees: 200000,
    propertyTaxes: 300000,
    insurance: 150000,
    utilities: 200000,
    maintenance: 250000,
    marketing: 100000,
    otherExpenses: 200000,
    exitCapRate: 5.5,
    appreciationRate: 3,
    financingRate: 6,
    loanToCostRatio: 75,
    interestOnlyPeriod: 2
  };

  test('should calculate basic development proforma correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    expect(result.totalProjectCost).toBe(23500000); // 15M + 5M + 2M + 0.5M + 1M
    expect(result.totalFinancing).toBe(17625000); // 75% of 23.5M
    expect(result.equityRequired).toBe(5875000); // 23.5M - 17.625M
    expect(result.constructionCosts.total).toBe(23500000);
    expect(result.constructionCosts.hardCosts).toBe(20000000); // 15M + 5M
    expect(result.constructionCosts.softCosts).toBe(2000000);
    expect(result.constructionCosts.financingCosts).toBe(500000);
    expect(result.constructionCosts.contingency).toBe(1000000);
  });

  test('should calculate revenue projection correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    const potentialGrossIncome = 100 * 2000 * 12; // 2.4M
    expect(result.revenueProjection.year1).toBeCloseTo(1200000, 0); // 50% occupancy in year 1
    expect(result.revenueProjection.year2).toBeCloseTo(2280000, 0); // 95% occupancy
    expect(result.revenueProjection.year3).toBeCloseTo(2348400, 0); // 95% occupancy + 3% growth
  });

  test('should calculate operating expenses breakdown correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    expect(result.operatingExpenses.management).toBe(200000);
    expect(result.operatingExpenses.propertyTaxes).toBe(300000);
    expect(result.operatingExpenses.insurance).toBe(150000);
    expect(result.operatingExpenses.utilities).toBe(200000);
    expect(result.operatingExpenses.maintenance).toBe(250000);
    expect(result.operatingExpenses.marketing).toBe(100000);
    expect(result.operatingExpenses.other).toBe(200000);
    expect(result.operatingExpenses.total).toBe(1400000);
  });

  test('should calculate NOI projection correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    // Year 1: 1.2M revenue - 1.4M expenses = -200k
    expect(result.netOperatingIncome.year1).toBeCloseTo(-200000, 0);
    // Year 2: 2.28M revenue - 1.4M expenses = 880k
    expect(result.netOperatingIncome.year2).toBeCloseTo(880000, 0);
    // Year 3: 2.35M revenue - 1.4M expenses = 950k
    expect(result.netOperatingIncome.year3).toBeCloseTo(950000, 0);
  });

  test('should calculate cash flow projection correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    // Cash flow = NOI - debt service
    expect(result.cashFlow.year1).toBeLessThan(0); // Negative NOI
    expect(result.cashFlow.year2).toBeGreaterThan(0); // Positive NOI
    expect(result.cashFlow.year3).toBeGreaterThan(0); // Positive NOI
  });

  test('should calculate exit value correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    // Exit value = Year 5 NOI / Cap Rate
    const year5NOI = result.netOperatingIncome.year5;
    const expectedExitValue = year5NOI / 0.055; // 5.5% cap rate
    expect(result.exitValue).toBeCloseTo(expectedExitValue, 0);
  });

  test('should calculate debt service coverage correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    expect(result.debtServiceCoverage).toBeGreaterThan(0);
    expect(result.debtServiceCoverage).toBeLessThan(5); // Reasonable range
  });

  test('should calculate break-even occupancy correctly', () => {
    const result = realEstateDevelopmentProformaCalculator.calculate(baseInputs);
    
    expect(result.breakEvenOccupancy).toBeGreaterThan(0);
    expect(result.breakEvenOccupancy).toBeLessThan(1);
  });

  test('should handle different project types', () => {
    const commercialInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      projectType: 'commercial'
    };

    const result = realEstateDevelopmentProformaCalculator.calculate(commercialInputs);
    
    expect(result.totalProjectCost).toBe(23500000);
    expect(result.constructionCosts.total).toBe(23500000);
  });

  test('should handle different financing scenarios', () => {
    const highLeverageInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      loanToCostRatio: 90
    };

    const result = realEstateDevelopmentProformaCalculator.calculate(highLeverageInputs);
    
    expect(result.totalFinancing).toBe(21150000); // 90% of 23.5M
    expect(result.equityRequired).toBe(2350000); // 10% of 23.5M
  });

  test('should handle different development periods', () => {
    const longDevelopmentInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      developmentPeriod: 3,
      stabilizationPeriod: 2
    };

    const result = realEstateDevelopmentProformaCalculator.calculate(longDevelopmentInputs);
    
    expect(result.totalProjectCost).toBe(23500000);
    // Should still calculate correctly with longer periods
    expect(result.revenueProjection.year1).toBeGreaterThan(0);
  });

  test('should validate inputs correctly', () => {
    const validInputs: RealEstateDevelopmentProformaInputs = {
      projectName: 'Valid Project',
      projectType: 'mixed-use',
      totalUnits: 50,
      averageUnitSize: 800,
      constructionCost: 10000000,
      landCost: 3000000,
      softCosts: 1500000,
      financingCosts: 300000,
      contingency: 800000,
      developmentPeriod: 1,
      stabilizationPeriod: 1,
      averageRent: 1500,
      occupancyRate: 0.90,
      operatingExpenses: 800000,
      managementFees: 150000,
      propertyTaxes: 200000,
      insurance: 100000,
      utilities: 150000,
      maintenance: 150000,
      marketing: 50000,
      otherExpenses: 100000,
      exitCapRate: 6.0,
      appreciationRate: 2,
      financingRate: 5,
      loanToCostRatio: 80,
      interestOnlyPeriod: 1
    };

    const validation = realEstateDevelopmentProformaCalculator.validate(validInputs);
    expect(validation.projectName).toBe(true);
    expect(validation.projectType).toBe(true);
    expect(validation.totalUnits).toBe(true);
    expect(validation.constructionCost).toBe(true);
  });

  test('should reject invalid project name', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      projectName: ''
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid project type', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      projectType: 'invalid' as any
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid total units', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      totalUnits: 0
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid construction cost', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      constructionCost: -1000000
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid occupancy rate', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      occupancyRate: 1.5 // Above 100%
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid exit cap rate', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      exitCapRate: 0 // Cannot be 0
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid loan-to-cost ratio', () => {
    const invalidInputs: RealEstateDevelopmentProformaInputs = {
      ...baseInputs,
      loanToCostRatio: 95 // Above 90%
    };

    expect(() => realEstateDevelopmentProformaCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should handle complex scenario with all parameters', () => {
    const complexInputs: RealEstateDevelopmentProformaInputs = {
      projectName: 'Luxury Mixed-Use Development',
      projectType: 'mixed-use',
      totalUnits: 200,
      averageUnitSize: 1200,
      constructionCost: 50000000,
      landCost: 15000000,
      softCosts: 8000000,
      financingCosts: 2000000,
      contingency: 3000000,
      developmentPeriod: 3,
      stabilizationPeriod: 2,
      averageRent: 3500,
      occupancyRate: 0.92,
      operatingExpenses: 3000000,
      managementFees: 500000,
      propertyTaxes: 800000,
      insurance: 400000,
      utilities: 600000,
      maintenance: 700000,
      marketing: 200000,
      otherExpenses: 400000,
      exitCapRate: 4.5,
      appreciationRate: 4,
      financingRate: 5.5,
      loanToCostRatio: 70,
      interestOnlyPeriod: 3
    };

    const result = realEstateDevelopmentProformaCalculator.calculate(complexInputs);
    
    expect(result.totalProjectCost).toBe(78000000); // 50M + 15M + 8M + 2M + 3M
    expect(result.totalFinancing).toBe(54600000); // 70% of 78M
    expect(result.equityRequired).toBe(23400000); // 30% of 78M
    expect(result.constructionCosts.total).toBe(78000000);
    expect(result.revenueProjection.year1).toBeGreaterThan(0);
    expect(result.exitValue).toBeGreaterThan(0);
    expect(result.irr).toBeGreaterThan(0);
    expect(result.multiple).toBeGreaterThan(1);
  });
});