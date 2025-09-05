import { describe, it, expect } from 'vitest';
import { realEstateWaterfallModelCalculator } from './RealEstateWaterfallModelCalculator';
import { RealEstateWaterfallModelInputs } from './types';

describe('RealEstateWaterfallModelCalculator', () => {
  const validInputs: RealEstateWaterfallModelInputs = {
    totalInvestment: 10000000,
    sponsorEquity: 1000000,
    investorEquity: 4000000,
    preferredReturn: 8,
    catchUpPercentage: 10,
    promotePercentage: 20,
    waterfallStructure: 'simple',
    holdPeriod: 5,
    annualCashFlow: 500000,
    exitValue: 15000000,
    managementFees: 100000,
    acquisitionFees: 200000,
    dispositionFees: 150000,
    operatingExpenses: 200000,
    debtService: 300000,
    propertyValue: 12000000,
    loanAmount: 5000000,
    interestRate: 4.5,
    loanTerm: 30,
    interestOnlyPeriod: 5,
    depreciation: 400000,
    taxBenefits: 50000,
    investorCount: 50,
    minimumInvestment: 50000,
    maximumInvestment: 500000,
    investorType: 'accredited',
    stateRegulations: ['CA', 'NY'],
    secCompliance: true,
    offeringDocument: true,
    dueDiligence: true
  };

  it('should calculate waterfall model with valid inputs', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result).toBeDefined();
    expect(result.capitalStructure).toBeDefined();
    expect(result.feeStructure).toBeDefined();
    expect(result.waterfallAnalysis).toBeDefined();
    expect(result.cashFlowProjection).toBeDefined();
    expect(result.returnProjections).toBeDefined();
    expect(result.taxAnalysis).toBeDefined();
    expect(result.investorAnalysis).toBeDefined();
    expect(result.complianceAnalysis).toBeDefined();
    expect(result.riskAssessment).toBeDefined();
    expect(result.summary).toBeDefined();
  });

  it('should calculate capital structure correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.capitalStructure.totalInvestment).toBe(10000000);
    expect(result.capitalStructure.sponsorEquity).toBe(1000000);
    expect(result.capitalStructure.investorEquity).toBe(4000000);
    expect(result.capitalStructure.debtAmount).toBe(5000000);
    expect(result.capitalStructure.loanToValue).toBeCloseTo(41.67, 2);
  });

  it('should calculate fee structure correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.feeStructure.managementFees).toBe(100000);
    expect(result.feeStructure.acquisitionFees).toBe(200000);
    expect(result.feeStructure.dispositionFees).toBe(150000);
    expect(result.feeStructure.totalFees).toBe(450000);
  });

  it('should calculate waterfall analysis correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.waterfallAnalysis.preferredReturn).toBe(8);
    expect(result.waterfallAnalysis.catchUpPercentage).toBe(10);
    expect(result.waterfallAnalysis.promotePercentage).toBe(20);
    expect(result.waterfallAnalysis.sponsorShare).toBe(20);
    expect(result.waterfallAnalysis.investorShare).toBe(80);
    expect(result.waterfallAnalysis.breakEvenPoint).toBe(8);
  });

  it('should calculate return projections correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.returnProjections.annualCashFlow).toBe(500000);
    expect(result.returnProjections.expectedIRR).toBeGreaterThan(0);
    expect(result.returnProjections.expectedMultiple).toBeGreaterThan(1);
    expect(result.returnProjections.totalReturn).toBeGreaterThan(0);
    expect(result.returnProjections.netIRR).toBeGreaterThan(0);
  });

  it('should calculate tax analysis correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.taxAnalysis.depreciation).toBe(400000);
    expect(result.taxAnalysis.taxBenefits).toBe(50000);
    expect(result.taxAnalysis.taxSavings).toBeGreaterThan(0);
    expect(result.taxAnalysis.afterTaxReturn).toBeGreaterThan(0);
  });

  it('should calculate investor analysis correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.investorAnalysis.investorCount).toBe(50);
    expect(result.investorAnalysis.averageInvestment).toBe(80000);
    expect(result.investorAnalysis.minimumInvestment).toBe(50000);
    expect(result.investorAnalysis.maximumInvestment).toBe(500000);
    expect(result.investorAnalysis.investorType).toBe('accredited');
  });

  it('should calculate compliance analysis correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.complianceAnalysis.secCompliance).toBe(true);
    expect(result.complianceAnalysis.stateRegulations).toEqual(['CA', 'NY']);
    expect(result.complianceAnalysis.offeringDocument).toBe(true);
    expect(result.complianceAnalysis.dueDiligence).toBe(true);
    expect(result.complianceAnalysis.complianceCost).toBeGreaterThan(0);
  });

  it('should calculate risk assessment correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.riskAssessment.leverageRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.marketRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.liquidityRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.regulatoryRisk).toBeGreaterThan(0);
    expect(result.riskAssessment.overallRisk).toBeGreaterThan(0);
  });

  it('should calculate summary correctly', () => {
    const result = realEstateWaterfallModelCalculator.calculate(validInputs);
    
    expect(result.summary.totalFees).toBe(450000);
    expect(result.summary.netReturn).toBeGreaterThan(0);
    expect(result.summary.sponsorPromote).toBe(20);
    expect(result.summary.investorReturn).toBe(80);
    expect(result.summary.successProbability).toBeGreaterThan(0);
  });

  it('should handle complex waterfall structure', () => {
    const complexInputs = { ...validInputs, waterfallStructure: 'complex' as const };
    const result = realEstateWaterfallModelCalculator.calculate(complexInputs);
    
    expect(result.waterfallAnalysis.sponsorShare).toBeGreaterThan(20);
    expect(result.waterfallAnalysis.breakEvenPoint).toBeGreaterThan(8);
  });

  it('should handle different investor types', () => {
    const retailInputs = { ...validInputs, investorType: 'retail' as const };
    const result = realEstateWaterfallModelCalculator.calculate(retailInputs);
    
    expect(result.investorAnalysis.investorType).toBe('retail');
    expect(result.complianceAnalysis.secCompliance).toBe(true);
  });

  it('should handle different hold periods', () => {
    const longTermInputs = { ...validInputs, holdPeriod: 10 };
    const result = realEstateWaterfallModelCalculator.calculate(longTermInputs);
    
    expect(result.riskAssessment.liquidityRisk).toBeGreaterThan(50);
    expect(result.returnProjections.expectedIRR).toBeGreaterThan(0);
  });

  it('should handle high leverage scenarios', () => {
    const highLeverageInputs = { ...validInputs, loanAmount: 8000000 };
    const result = realEstateWaterfallModelCalculator.calculate(highLeverageInputs);
    
    expect(result.capitalStructure.loanToValue).toBeCloseTo(66.67, 2);
    expect(result.riskAssessment.leverageRisk).toBeGreaterThan(50);
  });

  it('should handle low cash flow scenarios', () => {
    const lowCashFlowInputs = { ...validInputs, annualCashFlow: 100000 };
    const result = realEstateWaterfallModelCalculator.calculate(lowCashFlowInputs);
    
    expect(result.riskAssessment.marketRisk).toBeGreaterThan(50);
    expect(result.returnProjections.expectedIRR).toBeLessThan(10);
  });

  it('should handle multiple state regulations', () => {
    const multiStateInputs = { 
      ...validInputs, 
      stateRegulations: ['CA', 'NY', 'TX', 'FL', 'IL'] 
    };
    const result = realEstateWaterfallModelCalculator.calculate(multiStateInputs);
    
    expect(result.complianceAnalysis.stateRegulations).toHaveLength(5);
    expect(result.complianceAnalysis.complianceCost).toBeGreaterThan(100000);
  });

  it('should handle no SEC compliance', () => {
    const noSecInputs = { ...validInputs, secCompliance: false };
    const result = realEstateWaterfallModelCalculator.calculate(noSecInputs);
    
    expect(result.complianceAnalysis.secCompliance).toBe(false);
    expect(result.complianceAnalysis.complianceCost).toBeLessThan(50000);
  });

  it('should handle different fee structures', () => {
    const highFeeInputs = { 
      ...validInputs, 
      managementFees: 200000,
      acquisitionFees: 400000,
      dispositionFees: 300000
    };
    const result = realEstateWaterfallModelCalculator.calculate(highFeeInputs);
    
    expect(result.feeStructure.totalFees).toBe(900000);
    expect(result.summary.totalFees).toBe(900000);
  });

  it('should handle different tax scenarios', () => {
    const highTaxInputs = { 
      ...validInputs, 
      depreciation: 600000,
      taxBenefits: 100000
    };
    const result = realEstateWaterfallModelCalculator.calculate(highTaxInputs);
    
    expect(result.taxAnalysis.depreciation).toBe(600000);
    expect(result.taxAnalysis.taxBenefits).toBe(100000);
    expect(result.taxAnalysis.taxSavings).toBeGreaterThan(100000);
  });

  it('should handle edge case inputs', () => {
    const edgeCaseInputs = { 
      ...validInputs, 
      holdPeriod: 1,
      annualCashFlow: 1000000,
      exitValue: 20000000
    };
    const result = realEstateWaterfallModelCalculator.calculate(edgeCaseInputs);
    
    expect(result.returnProjections.expectedIRR).toBeGreaterThan(0);
    expect(result.riskAssessment.liquidityRisk).toBeLessThan(20);
  });

  it('should validate required inputs', () => {
    const invalidInputs = { ...validInputs, totalInvestment: 0 };
    
    expect(() => {
      realEstateWaterfallModelCalculator.calculate(invalidInputs);
    }).toThrow('Validation failed');
  });

  it('should validate input ranges', () => {
    const invalidInputs = { ...validInputs, preferredReturn: 25 };
    
    expect(() => {
      realEstateWaterfallModelCalculator.calculate(invalidInputs);
    }).toThrow('Validation failed');
  });

  it('should validate equity constraints', () => {
    const invalidInputs = { 
      ...validInputs, 
      sponsorEquity: 15000000,
      investorEquity: 10000000
    };
    
    expect(() => {
      realEstateWaterfallModelCalculator.calculate(invalidInputs);
    }).toThrow('Validation failed');
  });

  it('should validate loan constraints', () => {
    const invalidInputs = { ...validInputs, loanAmount: 15000000 };
    
    expect(() => {
      realEstateWaterfallModelCalculator.calculate(invalidInputs);
    }).toThrow('Validation failed');
  });

  it('should validate investor constraints', () => {
    const invalidInputs = { ...validInputs, investorCount: 0 };
    
    expect(() => {
      realEstateWaterfallModelCalculator.calculate(invalidInputs);
    }).toThrow('Validation failed');
  });

  it('should validate investment range constraints', () => {
    const invalidInputs = { 
      ...validInputs, 
      minimumInvestment: 100000,
      maximumInvestment: 50000
    };
    
    expect(() => {
      realEstateWaterfallModelCalculator.calculate(invalidInputs);
    }).toThrow('Validation failed');
  });
});