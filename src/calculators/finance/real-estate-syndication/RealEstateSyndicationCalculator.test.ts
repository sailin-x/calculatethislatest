import { realEstateSyndicationCalculator } from './RealEstateSyndicationCalculator';
import { RealEstateSyndicationInputs } from './types';

describe('RealEstateSyndicationCalculator', () => {
  const baseInputs: RealEstateSyndicationInputs = {
    totalInvestment: 10000000,
    sponsorEquity: 1000000,
    investorEquity: 5000000,
    preferredReturn: 8,
    promotePercentage: 20,
    waterfallStructure: 'simple',
    holdPeriod: 5,
    expectedIRR: 15,
    expectedMultiple: 2.0,
    managementFees: 100000,
    acquisitionFees: 200000,
    dispositionFees: 150000,
    operatingExpenses: 500000,
    debtService: 400000,
    propertyValue: 12000000,
    exitValue: 20000000,
    depreciation: 300000,
    taxBenefits: 100000,
    investorCount: 25,
    minimumInvestment: 100000,
    maximumInvestment: 500000,
    investorType: 'accredited',
    stateRegulations: ['CA', 'NY', 'TX'],
    secCompliance: true,
    offeringDocument: true,
    dueDiligence: true
  };

  test('should calculate basic syndication correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.capitalStructure.totalInvestment).toBe(10000000);
    expect(result.capitalStructure.sponsorEquity).toBe(1000000);
    expect(result.capitalStructure.investorEquity).toBe(5000000);
    expect(result.capitalStructure.debtAmount).toBe(4000000); // 10M - 1M - 5M
    expect(result.capitalStructure.loanToValue).toBeCloseTo(33.33, 2); // 4M / 12M * 100
  });

  test('should calculate fee structure correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.feeStructure.managementFees).toBe(100000);
    expect(result.feeStructure.acquisitionFees).toBe(200000);
    expect(result.feeStructure.dispositionFees).toBe(150000);
    expect(result.feeStructure.totalFees).toBe(450000);
  });

  test('should calculate waterfall analysis correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.waterfallAnalysis.preferredReturn).toBe(8);
    expect(result.waterfallAnalysis.promotePercentage).toBe(20);
    expect(result.waterfallAnalysis.sponsorShare).toBe(20);
    expect(result.waterfallAnalysis.investorShare).toBe(80);
    expect(result.waterfallAnalysis.breakEvenPoint).toBe(8);
  });

  test('should calculate return projections correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.returnProjections.expectedIRR).toBe(15);
    expect(result.returnProjections.expectedMultiple).toBe(2.0);
    expect(result.returnProjections.annualCashFlow).toBeGreaterThan(0);
    expect(result.returnProjections.totalReturn).toBeGreaterThan(0);
    expect(result.returnProjections.netIRR).toBeLessThan(15); // Adjusted for fees
  });

  test('should calculate tax analysis correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.taxAnalysis.depreciation).toBe(300000);
    expect(result.taxAnalysis.taxBenefits).toBe(100000);
    expect(result.taxAnalysis.taxSavings).toBeGreaterThan(0);
    expect(result.taxAnalysis.afterTaxReturn).toBeGreaterThan(15);
  });

  test('should calculate investor analysis correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.investorAnalysis.investorCount).toBe(25);
    expect(result.investorAnalysis.averageInvestment).toBe(200000); // 5M / 25
    expect(result.investorAnalysis.minimumInvestment).toBe(100000);
    expect(result.investorAnalysis.maximumInvestment).toBe(500000);
    expect(result.investorAnalysis.investorType).toBe('accredited');
  });

  test('should calculate compliance analysis correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.complianceAnalysis.secCompliance).toBe(true);
    expect(result.complianceAnalysis.stateRegulations).toEqual(['CA', 'NY', 'TX']);
    expect(result.complianceAnalysis.offeringDocument).toBe(true);
    expect(result.complianceAnalysis.dueDiligence).toBe(true);
    expect(result.complianceAnalysis.complianceCost).toBeGreaterThan(0);
  });

  test('should calculate risk assessment correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.riskAssessment.leverageRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.marketRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.liquidityRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.regulatoryRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.overallRisk).toBeGreaterThan(0);
  });

  test('should calculate summary correctly', () => {
    const result = realEstateSyndicationCalculator.calculate(baseInputs);
    
    expect(result.summary.totalFees).toBe(450000);
    expect(result.summary.netReturn).toBeGreaterThan(0);
    expect(result.summary.sponsorPromote).toBe(20);
    expect(result.summary.investorReturn).toBe(80);
    expect(result.summary.successProbability).toBeGreaterThan(0);
  });

  test('should handle different waterfall structures', () => {
    const complexInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      waterfallStructure: 'complex'
    };

    const result = realEstateSyndicationCalculator.calculate(complexInputs);
    
    expect(result.waterfallAnalysis.sponsorShare).toBe(30); // 20% * 1.5
    expect(result.waterfallAnalysis.investorShare).toBe(70);
    expect(result.waterfallAnalysis.breakEvenPoint).toBe(9.6); // 8% * 1.2
  });

  test('should handle different investor types', () => {
    const nonAccreditedInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      investorType: 'non-accredited'
    };

    const result = realEstateSyndicationCalculator.calculate(nonAccreditedInputs);
    
    expect(result.investorAnalysis.investorType).toBe('non-accredited');
    expect(result.complianceAnalysis.complianceCost).toBeGreaterThan(0);
  });

  test('should handle different hold periods', () => {
    const longTermInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      holdPeriod: 10
    };

    const result = realEstateSyndicationCalculator.calculate(longTermInputs);
    
    expect(result.returnProjections.expectedIRR).toBe(15);
    expect(result.returnProjections.expectedMultiple).toBe(2.0);
    expect(result.riskAssessment.liquidityRisk).toBeGreaterThan(50); // Higher for longer hold
  });

  test('should validate inputs correctly', () => {
    const validInputs: RealEstateSyndicationInputs = {
      totalInvestment: 5000000,
      sponsorEquity: 500000,
      investorEquity: 2500000,
      preferredReturn: 6,
      promotePercentage: 15,
      waterfallStructure: 'simple',
      holdPeriod: 3,
      expectedIRR: 12,
      expectedMultiple: 1.5,
      managementFees: 50000,
      acquisitionFees: 100000,
      dispositionFees: 75000,
      operatingExpenses: 250000,
      debtService: 200000,
      propertyValue: 6000000,
      exitValue: 7500000,
      depreciation: 150000,
      taxBenefits: 50000,
      investorCount: 15,
      minimumInvestment: 50000,
      maximumInvestment: 250000,
      investorType: 'both',
      stateRegulations: ['FL', 'GA'],
      secCompliance: false,
      offeringDocument: false,
      dueDiligence: true
    };

    const validation = realEstateSyndicationCalculator.validate(validInputs);
    expect(validation.totalInvestment).toBe(true);
    expect(validation.sponsorEquity).toBe(true);
    expect(validation.investorEquity).toBe(true);
    expect(validation.waterfallStructure).toBe(true);
  });

  test('should reject invalid total investment', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      totalInvestment: -1000000
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject equity exceeding total investment', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      sponsorEquity: 6000000,
      investorEquity: 6000000 // Total equity exceeds total investment
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid preferred return', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      preferredReturn: 25 // Exceeds 20%
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid promote percentage', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      promotePercentage: 60 // Exceeds 50%
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid waterfall structure', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      waterfallStructure: 'invalid' as any
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid hold period', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      holdPeriod: 25 // Exceeds 20 years
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid expected IRR', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      expectedIRR: 60 // Exceeds 50%
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid expected multiple', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      expectedMultiple: 15 // Exceeds 10x
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject invalid investor count', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      investorCount: 0
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should reject minimum investment exceeding maximum', () => {
    const invalidInputs: RealEstateSyndicationInputs = {
      ...baseInputs,
      minimumInvestment: 600000,
      maximumInvestment: 500000
    };

    expect(() => realEstateSyndicationCalculator.calculate(invalidInputs)).toThrow();
  });

  test('should handle complex scenario with all parameters', () => {
    const complexInputs: RealEstateSyndicationInputs = {
      totalInvestment: 25000000,
      sponsorEquity: 2500000,
      investorEquity: 12500000,
      preferredReturn: 10,
      promotePercentage: 25,
      waterfallStructure: 'complex',
      holdPeriod: 7,
      expectedIRR: 18,
      expectedMultiple: 2.5,
      managementFees: 250000,
      acquisitionFees: 500000,
      dispositionFees: 375000,
      operatingExpenses: 1250000,
      debtService: 1000000,
      propertyValue: 30000000,
      exitValue: 50000000,
      depreciation: 750000,
      taxBenefits: 250000,
      investorCount: 50,
      minimumInvestment: 200000,
      maximumInvestment: 1000000,
      investorType: 'both',
      stateRegulations: ['CA', 'NY', 'TX', 'FL', 'GA'],
      secCompliance: true,
      offeringDocument: true,
      dueDiligence: true
    };

    const result = realEstateSyndicationCalculator.calculate(complexInputs);
    
    expect(result.capitalStructure.totalInvestment).toBe(25000000);
    expect(result.capitalStructure.debtAmount).toBe(10000000); // 25M - 2.5M - 12.5M
    expect(result.feeStructure.totalFees).toBe(1125000);
    expect(result.waterfallAnalysis.sponsorShare).toBe(37.5); // 25% * 1.5
    expect(result.investorAnalysis.averageInvestment).toBe(250000); // 12.5M / 50
    expect(result.complianceAnalysis.complianceCost).toBeGreaterThan(0);
    expect(result.riskAssessment.overallRisk).toBeGreaterThan(0);
    expect(result.summary.successProbability).toBeGreaterThan(0);
  });
});