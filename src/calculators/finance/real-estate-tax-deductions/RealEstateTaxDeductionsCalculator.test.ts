import { realEstateTaxDeductionsCalculator } from './RealEstateTaxDeductionsCalculator';
import { RealEstateTaxDeductionsInputs } from './types';

describe('RealEstateTaxDeductionsCalculator', () => {
  const baseInputs: RealEstateTaxDeductionsInputs = {
    propertyType: 'rental',
    propertyValue: 500000,
    landValue: 100000,
    placedInServiceDate: '2023-01-01',
    businessUsePercentage: 100,
    annualRent: 36000,
    operatingExpenses: 5000,
    mortgageInterest: 15000,
    propertyTaxes: 6000,
    insurance: 2000,
    utilities: 3000,
    maintenance: 4000,
    managementFees: 2000,
    advertising: 1000,
    legalFees: 500,
    accountingFees: 1000,
    travelExpenses: 500,
    homeOfficeExpenses: 1000,
    depreciation: 14545,
    bonusDepreciation: 0,
    section179Deduction: 0,
    costSegregation: 0,
    passiveActivityLoss: 0,
    atRiskAmount: 400000,
    materialParticipation: true,
    realEstateProfessional: false,
    taxYear: 2023,
    filingStatus: 'single',
    adjustedGrossIncome: 75000,
    otherPassiveIncome: 0,
    otherPassiveLosses: 0
  };

  test('should calculate basic tax deductions correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.deductibleExpenses.totalOperating).toBeGreaterThan(0);
    expect(result.depreciationDeductions.totalDepreciation).toBe(14545);
    expect(result.taxSavings.totalTaxSavings).toBeGreaterThan(0);
    expect(result.netRentalIncome.grossRentalIncome).toBe(36000);
    expect(result.summary.totalDeductions).toBeGreaterThan(0);
  });

  test('should calculate deductible expenses correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.deductibleExpenses.operatingExpenses).toBe(5000);
    expect(result.deductibleExpenses.mortgageInterest).toBe(15000);
    expect(result.deductibleExpenses.propertyTaxes).toBe(6000);
    expect(result.deductibleExpenses.insurance).toBe(2000);
    expect(result.deductibleExpenses.utilities).toBe(3000);
    expect(result.deductibleExpenses.maintenance).toBe(4000);
    expect(result.deductibleExpenses.managementFees).toBe(2000);
    expect(result.deductibleExpenses.advertising).toBe(1000);
    expect(result.deductibleExpenses.legalFees).toBe(500);
    expect(result.deductibleExpenses.accountingFees).toBe(1000);
    expect(result.deductibleExpenses.travelExpenses).toBe(500);
    expect(result.deductibleExpenses.homeOfficeExpenses).toBe(1000);
  });

  test('should calculate depreciation deductions correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.depreciationDeductions.regularDepreciation).toBe(14545);
    expect(result.depreciationDeductions.bonusDepreciation).toBe(0);
    expect(result.depreciationDeductions.section179Deduction).toBe(0);
    expect(result.depreciationDeductions.costSegregation).toBe(0);
    expect(result.depreciationDeductions.totalDepreciation).toBe(14545);
  });

  test('should calculate passive activity analysis correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.passiveActivityAnalysis.passiveActivityLoss).toBe(0);
    expect(result.passiveActivityAnalysis.atRiskAmount).toBe(400000);
    expect(result.passiveActivityAnalysis.materialParticipation).toBe(true);
    expect(result.passiveActivityAnalysis.realEstateProfessional).toBe(false);
    expect(result.passiveActivityAnalysis.deductibleLoss).toBe(0);
    expect(result.passiveActivityAnalysis.suspendedLoss).toBe(0);
  });

  test('should calculate tax savings correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.taxSavings.operatingExpenseSavings).toBeGreaterThan(0);
    expect(result.taxSavings.depreciationSavings).toBeGreaterThan(0);
    expect(result.taxSavings.totalTaxSavings).toBeGreaterThan(0);
    expect(result.taxSavings.effectiveTaxRate).toBeGreaterThan(0);
  });

  test('should calculate net rental income correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.netRentalIncome.grossRentalIncome).toBe(36000);
    expect(result.netRentalIncome.totalDeductions).toBeGreaterThan(0);
    expect(result.netRentalIncome.netRentalIncome).toBeLessThan(36000);
    expect(result.netRentalIncome.taxableIncome).toBeGreaterThanOrEqual(0);
  });

  test('should calculate carryover analysis correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.carryoverAnalysis.suspendedLosses).toBe(0);
    expect(result.carryoverAnalysis.carryoverYears).toBe(0);
    expect(result.carryoverAnalysis.futureTaxSavings).toBe(0);
  });

  test('should calculate summary correctly', () => {
    const result = realEstateTaxDeductionsCalculator.calculate(baseInputs);
    
    expect(result.summary.totalDeductions).toBeGreaterThan(0);
    expect(result.summary.netTaxableIncome).toBeGreaterThanOrEqual(0);
    expect(result.summary.totalTaxSavings).toBeGreaterThan(0);
    expect(result.summary.afterTaxCashFlow).toBeGreaterThan(0);
    expect(result.summary.taxEfficiency).toBeGreaterThan(0);
  });

  test('should handle different property types correctly', () => {
    const commercialInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      propertyType: 'commercial'
    };

    const result = realEstateTaxDeductionsCalculator.calculate(commercialInputs);
    
    expect(result.depreciationDeductions.regularDepreciation).toBeCloseTo(10256, 0); // 400k / 39
    expect(result.depreciationDeductions.totalDepreciation).toBeCloseTo(10256, 0);
  });

  test('should handle bonus depreciation correctly', () => {
    const bonusInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      bonusDepreciation: 50000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(bonusInputs);
    
    expect(result.depreciationDeductions.bonusDepreciation).toBe(50000);
    expect(result.depreciationDeductions.totalDepreciation).toBe(64545); // 14545 + 50000
  });

  test('should handle Section 179 deduction correctly', () => {
    const section179Inputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      section179Deduction: 25000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(section179Inputs);
    
    expect(result.depreciationDeductions.section179Deduction).toBe(25000);
    expect(result.depreciationDeductions.totalDepreciation).toBe(39545); // 14545 + 25000
  });

  test('should handle cost segregation correctly', () => {
    const costSegregationInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      costSegregation: 15000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(costSegregationInputs);
    
    expect(result.depreciationDeductions.costSegregation).toBe(15000);
    expect(result.depreciationDeductions.totalDepreciation).toBe(29545); // 14545 + 15000
  });

  test('should handle passive activity loss correctly', () => {
    const passiveLossInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      passiveActivityLoss: 10000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(passiveLossInputs);
    
    expect(result.passiveActivityAnalysis.passiveActivityLoss).toBe(10000);
    expect(result.passiveActivityAnalysis.deductibleLoss).toBeGreaterThan(0);
    expect(result.passiveActivityAnalysis.suspendedLoss).toBeGreaterThanOrEqual(0);
  });

  test('should handle real estate professional correctly', () => {
    const realEstateProfessionalInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      realEstateProfessional: true,
      passiveActivityLoss: 30000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(realEstateProfessionalInputs);
    
    expect(result.passiveActivityAnalysis.realEstateProfessional).toBe(true);
    expect(result.passiveActivityAnalysis.deductibleLoss).toBeGreaterThan(0);
  });

  test('should handle different filing statuses correctly', () => {
    const marriedInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      filingStatus: 'married-joint',
      adjustedGrossIncome: 150000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(marriedInputs);
    
    expect(result.taxSavings.effectiveTaxRate).toBeGreaterThan(0);
    expect(result.taxSavings.totalTaxSavings).toBeGreaterThan(0);
  });

  test('should handle different business use percentages correctly', () => {
    const partialUseInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      businessUsePercentage: 50
    };

    const result = realEstateTaxDeductionsCalculator.calculate(partialUseInputs);
    
    expect(result.deductibleExpenses.operatingExpenses).toBe(2500); // 5000 * 50%
    expect(result.deductibleExpenses.mortgageInterest).toBe(7500); // 15000 * 50%
    expect(result.deductibleExpenses.propertyTaxes).toBe(3000); // 6000 * 50%
  });

  test('should validate inputs correctly', () => {
    const validInputs: RealEstateTaxDeductionsInputs = {
      propertyType: 'commercial',
      propertyValue: 1000000,
      landValue: 200000,
      placedInServiceDate: '2023-06-01',
      businessUsePercentage: 75,
      annualRent: 72000,
      operatingExpenses: 10000,
      mortgageInterest: 30000,
      propertyTaxes: 12000,
      insurance: 4000,
      utilities: 6000,
      maintenance: 8000,
      managementFees: 4000,
      advertising: 2000,
      legalFees: 1000,
      accountingFees: 2000,
      travelExpenses: 1000,
      homeOfficeExpenses: 2000,
      depreciation: 20513,
      bonusDepreciation: 10000,
      section179Deduction: 5000,
      costSegregation: 8000,
      passiveActivityLoss: 5000,
      atRiskAmount: 800000,
      materialParticipation: false,
      realEstateProfessional: true,
      taxYear: 2023,
      filingStatus: 'married-joint',
      adjustedGrossIncome: 120000,
      otherPassiveIncome: 10000,
      otherPassiveLosses: 5000
    };

    const validation = realEstateTaxDeductionsCalculator.validate(validInputs);
    expect(validation.propertyType).toBe(true);
    expect(validation.propertyValue).toBe(true);
    expect(validation.landValue).toBe(true);
    expect(validation.businessUsePercentage).toBe(true);
  });

  test('should reject invalid property type', () => {
    const invalidInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      propertyType: 'invalid' as any
    };

    expect(() => realEstateTaxDeductionsCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid property value', () => {
    const invalidInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      propertyValue: -100000
    };

    expect(() => realEstateTaxDeductionsCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject land value exceeding property value', () => {
    const invalidInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      landValue: 600000 // Exceeds property value
    };

    expect(() => realEstateTaxDeductionsCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid business use percentage', () => {
    const invalidInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      businessUsePercentage: 150 // Exceeds 100%
    };

    expect(() => realEstateTaxDeductionsCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid Section 179 deduction', () => {
    const invalidInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      section179Deduction: 2000000 // Exceeds limit
    };

    expect(() => realEstateTaxDeductionsCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid filing status', () => {
    const invalidInputs: RealEstateTaxDeductionsInputs = {
      ...baseInputs,
      filingStatus: 'invalid' as any
    };

    expect(() => realEstateTaxDeductionsCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should handle complex scenario with all parameters', () => {
    const complexInputs: RealEstateTaxDeductionsInputs = {
      propertyType: 'mixed-use',
      propertyValue: 2000000,
      landValue: 400000,
      placedInServiceDate: '2023-03-15',
      businessUsePercentage: 80,
      annualRent: 144000,
      operatingExpenses: 20000,
      mortgageInterest: 60000,
      propertyTaxes: 24000,
      insurance: 8000,
      utilities: 12000,
      maintenance: 16000,
      managementFees: 8000,
      advertising: 4000,
      legalFees: 2000,
      accountingFees: 4000,
      travelExpenses: 2000,
      homeOfficeExpenses: 4000,
      depreciation: 41026,
      bonusDepreciation: 20000,
      section179Deduction: 10000,
      costSegregation: 16000,
      passiveActivityLoss: 15000,
      atRiskAmount: 1600000,
      materialParticipation: true,
      realEstateProfessional: true,
      taxYear: 2023,
      filingStatus: 'married-joint',
      adjustedGrossIncome: 200000,
      otherPassiveIncome: 20000,
      otherPassiveLosses: 10000
    };

    const result = realEstateTaxDeductionsCalculator.calculate(complexInputs);
    
    expect(result.deductibleExpenses.totalOperating).toBeGreaterThan(0);
    expect(result.depreciationDeductions.totalDepreciation).toBe(87026); // 41026 + 20000 + 10000 + 16000
    expect(result.passiveActivityAnalysis.deductibleLoss).toBeGreaterThan(0);
    expect(result.taxSavings.totalTaxSavings).toBeGreaterThan(0);
    expect(result.netRentalIncome.grossRentalIncome).toBe(144000);
    expect(result.summary.totalDeductions).toBeGreaterThan(0);
    expect(result.summary.taxEfficiency).toBeGreaterThan(0);
  });
});