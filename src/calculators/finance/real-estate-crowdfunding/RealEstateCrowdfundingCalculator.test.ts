import { realEstateCrowdfundingCalculator } from './RealEstateCrowdfundingCalculator';
import { RealEstateCrowdfundingInputs } from './types';

describe('RealEstateCrowdfundingCalculator', () => {
  const baseInputs: RealEstateCrowdfundingInputs = {
    investmentAmount: 100000,
    projectValue: 2000000,
    expectedHoldPeriod: 5,
    expectedAnnualReturn: 12,
    managementFees: 2,
    platformFees: 1,
    exitFees: 3,
    minimumInvestment: 25000,
    maximumInvestment: 500000,
    projectType: 'residential',
    location: 'Major City',
    expectedAppreciation: 3,
    expectedCashFlow: 120000,
    taxBenefits: 5000,
    liquidityPeriod: 3
  };

  test('should calculate basic crowdfunding investment correctly', () => {
    const result = realEstateCrowdfundingCalculator.calculate(baseInputs);
    
    expect(result.totalFees).toBe(6000); // 2% + 1% + 3% = 6% of 100000
    expect(result.netInvestment).toBe(94000); // 100000 - 6000
    expect(result.expectedAnnualCashFlow).toBe(6000); // 5% ownership * 120000
    expect(result.expectedTotalReturn).toBe(60); // 12% * 5 years
    expect(result.expectedMultiple).toBe(1.6); // 1 + 60%
    expect(result.expectedIRR).toBeCloseTo(12, 1);
    expect(result.expectedExitValue).toBeCloseTo(160000, 0); // 100000 * 1.6 * appreciation
    expect(result.expectedNetProfit).toBeCloseTo(60000, 0);
    expect(result.annualizedReturn).toBeCloseTo(12, 1);
  });

  test('should calculate fees breakdown correctly', () => {
    const result = realEstateCrowdfundingCalculator.calculate(baseInputs);
    
    expect(result.feeBreakdown.managementFees).toBe(2000); // 2% of 100000
    expect(result.feeBreakdown.platformFees).toBe(1000); // 1% of 100000
    expect(result.feeBreakdown.exitFees).toBe(3000); // 3% of 100000
    expect(result.feeBreakdown.totalFees).toBe(6000);
  });

  test('should calculate risk metrics correctly', () => {
    const result = realEstateCrowdfundingCalculator.calculate(baseInputs);
    
    expect(result.riskMetrics.leverageRatio).toBe(0.75); // Residential leverage
    expect(result.riskMetrics.capRate).toBe(6); // 120000 / 2000000 * 100
    expect(result.riskMetrics.occupancyRate).toBe(1.0); // 95% + 5% for major city
    expect(result.riskMetrics.debtServiceCoverage).toBeCloseTo(2.0, 1);
  });

  test('should calculate cash flow projection correctly', () => {
    const result = realEstateCrowdfundingCalculator.calculate(baseInputs);
    
    expect(result.cashFlowProjection.year1).toBeCloseTo(6000, 0);
    expect(result.cashFlowProjection.year2).toBeCloseTo(6180, 0); // 6000 * 1.03
    expect(result.cashFlowProjection.year3).toBeCloseTo(6365, 0); // 6000 * 1.03^2
    expect(result.cashFlowProjection.year4).toBeCloseTo(6556, 0); // 6000 * 1.03^3
    expect(result.cashFlowProjection.year5).toBeCloseTo(6753, 0); // 6000 * 1.03^4
  });

  test('should handle different project types', () => {
    const commercialInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      projectType: 'commercial'
    };

    const result = realEstateCrowdfundingCalculator.calculate(commercialInputs);
    
    expect(result.riskMetrics.leverageRatio).toBe(0.70); // Commercial leverage
    expect(result.riskMetrics.occupancyRate).toBe(0.95); // Commercial base rate
  });

  test('should handle different investment amounts', () => {
    const largeInvestmentInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      investmentAmount: 500000
    };

    const result = realEstateCrowdfundingCalculator.calculate(largeInvestmentInputs);
    
    expect(result.totalFees).toBe(30000); // 6% of 500000
    expect(result.netInvestment).toBe(470000);
    expect(result.expectedAnnualCashFlow).toBe(30000); // 25% ownership * 120000
  });

  test('should handle different hold periods', () => {
    const longTermInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      expectedHoldPeriod: 10
    };

    const result = realEstateCrowdfundingCalculator.calculate(longTermInputs);
    
    expect(result.expectedTotalReturn).toBe(120); // 12% * 10 years
    expect(result.expectedMultiple).toBe(2.2); // 1 + 120%
    expect(result.expectedExitValue).toBeCloseTo(220000, 0);
  });

  test('should validate inputs correctly', () => {
    const validInputs: RealEstateCrowdfundingInputs = {
      investmentAmount: 50000,
      projectValue: 1000000,
      expectedHoldPeriod: 3,
      expectedAnnualReturn: 8,
      managementFees: 1.5,
      platformFees: 0.5,
      exitFees: 2,
      minimumInvestment: 10000,
      maximumInvestment: 200000,
      projectType: 'industrial',
      location: 'Suburban Area',
      expectedAppreciation: 2,
      expectedCashFlow: 80000,
      taxBenefits: 2000,
      liquidityPeriod: 2
    };

    const validation = realEstateCrowdfundingCalculator.validate(validInputs);
    expect(validation.investmentAmount).toBe(true);
    expect(validation.projectValue).toBe(true);
    expect(validation.expectedHoldPeriod).toBe(true);
    expect(validation.projectType).toBe(true);
  });

  test('should reject invalid investment amount', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      investmentAmount: -1000
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject investment below minimum', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      investmentAmount: 10000 // Below minimum of 25000
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject investment above maximum', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      investmentAmount: 600000 // Above maximum of 500000
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject investment above project value', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      investmentAmount: 3000000 // Above project value of 2000000
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid project type', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      projectType: 'invalid' as any
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid hold period', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      expectedHoldPeriod: 25 // Above maximum of 20
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid annual return', () => {
    const invalidInputs: RealEstateCrowdfundingInputs = {
      ...baseInputs,
      expectedAnnualReturn: 60 // Above maximum of 50%
    };

    expect(() => realEstateCrowdfundingCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should handle complex scenario with all parameters', () => {
    const complexInputs: RealEstateCrowdfundingInputs = {
      investmentAmount: 250000,
      projectValue: 5000000,
      expectedHoldPeriod: 7,
      expectedAnnualReturn: 15,
      managementFees: 2.5,
      platformFees: 1.5,
      exitFees: 4,
      minimumInvestment: 50000,
      maximumInvestment: 1000000,
      projectType: 'mixed-use',
      location: 'Major Metropolitan Area',
      expectedAppreciation: 4,
      expectedCashFlow: 300000,
      taxBenefits: 15000,
      liquidityPeriod: 5
    };

    const result = realEstateCrowdfundingCalculator.calculate(complexInputs);
    
    expect(result.totalFees).toBe(20000); // 8% of 250000
    expect(result.netInvestment).toBe(230000);
    expect(result.expectedAnnualCashFlow).toBe(15000); // 5% ownership * 300000
    expect(result.expectedTotalReturn).toBe(105); // 15% * 7 years
    expect(result.expectedMultiple).toBe(2.05); // 1 + 105%
    expect(result.riskMetrics.leverageRatio).toBe(0.70); // Mixed-use leverage
    expect(result.riskMetrics.occupancyRate).toBe(0.97); // 92% + 5% for major metro
  });
});