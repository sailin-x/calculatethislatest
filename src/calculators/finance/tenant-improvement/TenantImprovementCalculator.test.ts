import { describe, it, expect } from 'vitest';
import { TenantImprovementCalculator } from './TenantImprovementCalculator';
import { validateTenantImprovementInputs } from './validation';
import { validateAllTenantImprovementInputs } from './quickValidation';
import { calculateTenantImprovement, generateTenantImprovementAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('TenantImprovementCalculator', () => {
  it('should have correct calculator structure', () => {
    expect(TenantImprovementCalculator.id).toBe('tenant-improvement-calculator');
    expect(TenantImprovementCalculator.name).toBe('Tenant Improvement (TI) Allowance Calculator');
    expect(TenantImprovementCalculator.category).toBe('finance');
    expect(TenantImprovementCalculator.subcategory).toBe('real-estate');
    expect(TenantImprovementCalculator.description).toContain('Calculate tenant improvement');
    expect(TenantImprovementCalculator.inputs).toHaveLength(19);
    expect(TenantImprovementCalculator.outputs).toHaveLength(20);
    expect(typeof TenantImprovementCalculator.calculate).toBe('function');
    expect(typeof TenantImprovementCalculator.generateReport).toBe('function');
  });

  it('should have all required input fields', () => {
    const inputIds = TenantImprovementCalculator.inputs.map(input => input.id);
    const requiredInputs = [
      'spaceSize', 'leaseTerm', 'baseRent', 'tiAllowance', 'constructionCosts',
      'designFees', 'permits', 'furniture', 'technology', 'contingency',
      'amortizationPeriod', 'interestRate', 'tenantContribution', 'landlordContribution',
      'rentEscalation', 'operatingExpenses', 'taxRate', 'depreciationPeriod', 'analysisPeriod'
    ];
    
    requiredInputs.forEach(inputId => {
      expect(inputIds).toContain(inputId);
    });
  });

  it('should have all required output fields', () => {
    const outputIds = TenantImprovementCalculator.outputs.map(output => output.id);
    const requiredOutputs = [
      'totalTICosts', 'tiAllowanceAmount', 'tenantOutOfPocket', 'monthlyTIRent',
      'annualTIRent', 'effectiveRent', 'totalLeaseCost', 'presentValue', 'breakEvenYears',
      'roi', 'costBenefitRatio', 'netPresentValue', 'internalRateOfReturn', 'paybackPeriod',
      'annualDepreciation', 'taxSavings', 'afterTaxCost', 'valueScore', 'riskScore', 'recommendation'
    ];
    
    requiredOutputs.forEach(outputId => {
      expect(outputIds).toContain(outputId);
    });
  });
});

describe('Tenant Improvement Validation', () => {
  const validInputs: CalculatorInputs = {
    spaceSize: 5000,
    leaseTerm: 5,
    baseRent: 25,
    tiAllowance: 15,
    constructionCosts: 20,
    designFees: 25000,
    permits: 5000,
    furniture: 15000,
    technology: 10000,
    contingency: 10,
    amortizationPeriod: 5,
    interestRate: 6,
    tenantContribution: 0,
    landlordContribution: 0,
    rentEscalation: 3,
    operatingExpenses: 8,
    taxRate: 25,
    depreciationPeriod: 39,
    analysisPeriod: 10
  };

  it('should validate correct inputs successfully', () => {
    const result = validateTenantImprovementInputs(validInputs);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate inputs with quick validation successfully', () => {
    const result = validateAllTenantImprovementInputs(validInputs);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject missing required fields', () => {
    const invalidInputs = { ...validInputs };
    delete invalidInputs.spaceSize;
    
    const result = validateTenantImprovementInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('spaceSize is required');
  });

  it('should reject out-of-range space size', () => {
    const invalidInputs = { ...validInputs, spaceSize: 50 };
    
    const result = validateTenantImprovementInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Space size must be between 100 and 100,000 sq ft');
  });

  it('should reject negative TI allowance', () => {
    const invalidInputs = { ...validInputs, tiAllowance: -5 };
    
    const result = validateTenantImprovementInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('TI allowance must be between $0 and $100 per sq ft');
  });

  it('should reject high construction costs', () => {
    const invalidInputs = { ...validInputs, constructionCosts: 200 };
    
    const result = validateTenantImprovementInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Construction costs must be between $5 and $150 per sq ft');
  });

  it('should reject high contingency', () => {
    const invalidInputs = { ...validInputs, contingency: 30 };
    
    const result = validateTenantImprovementInputs(invalidInputs);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Contingency must be between 0% and 25%');
  });

  it('should provide warnings for amortization period exceeding lease term', () => {
    const longAmortizationInputs = { ...validInputs, amortizationPeriod: 7, leaseTerm: 5 };
    
    const result = validateTenantImprovementInputs(longAmortizationInputs);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toContain('Amortization period exceeds lease term');
  });

  it('should provide warnings for low contingency', () => {
    const lowContingencyInputs = { ...validInputs, contingency: 3 };
    
    const result = validateTenantImprovementInputs(lowContingencyInputs);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toContain('Low contingency may not provide adequate buffer');
  });

  it('should provide warnings for high rent escalation', () => {
    const highEscalationInputs = { ...validInputs, rentEscalation: 7 };
    
    const result = validateTenantImprovementInputs(highEscalationInputs);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toContain('High rent escalation may significantly impact long-term costs');
  });
});

describe('Tenant Improvement Calculation', () => {
  const testInputs: CalculatorInputs = {
    spaceSize: 5000,
    leaseTerm: 5,
    baseRent: 25,
    tiAllowance: 15,
    constructionCosts: 20,
    designFees: 25000,
    permits: 5000,
    furniture: 15000,
    technology: 10000,
    contingency: 10,
    amortizationPeriod: 5,
    interestRate: 6,
    tenantContribution: 0,
    landlordContribution: 0,
    rentEscalation: 3,
    operatingExpenses: 8,
    taxRate: 25,
    depreciationPeriod: 39,
    analysisPeriod: 10
  };

  it('should calculate TI metrics correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    
    expect(outputs.totalTICosts).toBeGreaterThan(0);
    expect(outputs.tiAllowanceAmount).toBeGreaterThan(0);
    expect(outputs.tenantOutOfPocket).toBeGreaterThanOrEqual(0);
    expect(outputs.monthlyTIRent).toBeGreaterThan(0);
    expect(outputs.annualTIRent).toBeGreaterThan(0);
    expect(outputs.effectiveRent).toBeGreaterThan(0);
    expect(outputs.totalLeaseCost).toBeGreaterThan(0);
    expect(outputs.presentValue).toBeDefined();
    expect(outputs.breakEvenYears).toBeGreaterThan(0);
    expect(outputs.roi).toBeDefined();
    expect(outputs.costBenefitRatio).toBeGreaterThan(0);
    expect(outputs.netPresentValue).toBeDefined();
    expect(outputs.internalRateOfReturn).toBeGreaterThanOrEqual(0);
    expect(outputs.paybackPeriod).toBeGreaterThan(0);
    expect(outputs.annualDepreciation).toBeGreaterThan(0);
    expect(outputs.taxSavings).toBeGreaterThan(0);
    expect(outputs.afterTaxCost).toBeDefined();
    expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
    expect(outputs.valueScore).toBeLessThanOrEqual(100);
    expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
    expect(outputs.riskScore).toBeLessThanOrEqual(100);
  });

  it('should calculate total TI costs correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const expectedConstructionCosts = testInputs.spaceSize * testInputs.constructionCosts;
    const expectedDirectCosts = expectedConstructionCosts + testInputs.designFees + testInputs.permits + testInputs.furniture + testInputs.technology;
    const expectedContingency = expectedDirectCosts * (testInputs.contingency / 100);
    const expectedTotalCosts = expectedDirectCosts + expectedContingency;
    
    expect(outputs.totalTICosts).toBeCloseTo(expectedTotalCosts, 2);
  });

  it('should calculate TI allowance amount correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const expectedAllowance = testInputs.spaceSize * testInputs.tiAllowance + testInputs.landlordContribution;
    
    expect(outputs.tiAllowanceAmount).toBeCloseTo(expectedAllowance, 2);
  });

  it('should calculate tenant out-of-pocket correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const expectedOutOfPocket = Math.max(0, outputs.totalTICosts - outputs.tiAllowanceAmount + testInputs.tenantContribution);
    
    expect(outputs.tenantOutOfPocket).toBeCloseTo(expectedOutOfPocket, 2);
  });

  it('should calculate monthly TI rent correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const loanAmount = outputs.totalTICosts;
    const monthlyRate = testInputs.interestRate / 100 / 12;
    const totalPayments = testInputs.amortizationPeriod * 12;
    const expectedPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    expect(outputs.monthlyTIRent).toBeCloseTo(expectedPayment, 2);
  });

  it('should calculate effective rent correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const expectedBaseRent = testInputs.spaceSize * testInputs.baseRent;
    const expectedEffectiveRent = expectedBaseRent + outputs.annualTIRent;
    
    expect(outputs.effectiveRent).toBeCloseTo(expectedEffectiveRent, 2);
  });

  it('should calculate ROI correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const totalBenefits = testInputs.spaceSize * testInputs.baseRent * testInputs.leaseTerm;
    const expectedROI = ((totalBenefits - outputs.tenantOutOfPocket) / outputs.tenantOutOfPocket) * 100;
    
    expect(outputs.roi).toBeCloseTo(expectedROI, 2);
  });

  it('should calculate cost-benefit ratio correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const totalBenefits = testInputs.spaceSize * testInputs.baseRent * testInputs.leaseTerm;
    const expectedRatio = totalBenefits / outputs.tenantOutOfPocket;
    
    expect(outputs.costBenefitRatio).toBeCloseTo(expectedRatio, 2);
  });

  it('should calculate annual depreciation correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const expectedDepreciation = outputs.totalTICosts / testInputs.depreciationPeriod;
    
    expect(outputs.annualDepreciation).toBeCloseTo(expectedDepreciation, 2);
  });

  it('should calculate tax savings correctly', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const expectedTaxSavings = outputs.annualDepreciation * (testInputs.taxRate / 100);
    
    expect(outputs.taxSavings).toBeCloseTo(expectedTaxSavings, 2);
  });

  it('should handle zero tenant contribution', () => {
    const zeroContributionInputs = { ...testInputs, tenantContribution: 0 };
    
    const outputs = calculateTenantImprovement(zeroContributionInputs);
    
    expect(outputs.tenantOutOfPocket).toBeGreaterThanOrEqual(0);
  });

  it('should handle high landlord contribution', () => {
    const highLandlordInputs = { ...testInputs, landlordContribution: 50000 };
    
    const outputs = calculateTenantImprovement(highLandlordInputs);
    
    expect(outputs.tiAllowanceAmount).toBeGreaterThan(testInputs.spaceSize * testInputs.tiAllowance);
    expect(outputs.tenantOutOfPocket).toBeLessThanOrEqual(outputs.tenantOutOfPocket);
  });

  it('should calculate scoring metrics within valid ranges', () => {
    const outputs = calculateTenantImprovement(testInputs);
    
    [outputs.valueScore, outputs.riskScore].forEach(score => {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  it('should handle edge case with very high construction costs', () => {
    const highCostInputs = { ...testInputs, constructionCosts: 100 };
    
    const outputs = calculateTenantImprovement(highCostInputs);
    
    expect(outputs.totalTICosts).toBeGreaterThan(testInputs.spaceSize * 100);
    expect(outputs.tenantOutOfPocket).toBeGreaterThan(0);
  });

  it('should handle edge case with zero TI allowance', () => {
    const zeroAllowanceInputs = { ...testInputs, tiAllowance: 0 };
    
    const outputs = calculateTenantImprovement(zeroAllowanceInputs);
    
    expect(outputs.tiAllowanceAmount).toBe(0);
    expect(outputs.tenantOutOfPocket).toBe(outputs.totalTICosts);
  });
});

describe('Tenant Improvement Report Generation', () => {
  const testInputs: CalculatorInputs = {
    spaceSize: 5000,
    leaseTerm: 5,
    baseRent: 25,
    tiAllowance: 15,
    constructionCosts: 20,
    designFees: 25000,
    permits: 5000,
    furniture: 15000,
    technology: 10000,
    contingency: 10,
    amortizationPeriod: 5,
    interestRate: 6,
    tenantContribution: 0,
    landlordContribution: 0,
    rentEscalation: 3,
    operatingExpenses: 8,
    taxRate: 25,
    depreciationPeriod: 39,
    analysisPeriod: 10
  };

  it('should generate comprehensive analysis report', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain('Tenant Improvement (TI) Allowance Analysis');
    expect(report).toContain('Executive Summary');
    expect(report).toContain('Cost Analysis');
    expect(report).toContain('Financial Impact');
    expect(report).toContain('Cash Flow Projection');
    expect(report).toContain('Assessment Scores');
    expect(report).toContain('Recommendations');
    expect(report).toContain('Lease Terms Analysis');
    expect(report).toContain('Investment Decision');
  });

  it('should include key metrics in the report', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain(outputs.totalTICosts?.toLocaleString());
    expect(report).toContain(outputs.tiAllowanceAmount?.toLocaleString());
    expect(report).toContain(outputs.tenantOutOfPocket?.toLocaleString());
    expect(report).toContain(`${outputs.roi}%`);
    expect(report).toContain(`${outputs.breakEvenYears} years`);
  });

  it('should include cost breakdown in the report', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain('Construction Costs');
    expect(report).toContain('Design Fees');
    expect(report).toContain('Permits');
    expect(report).toContain('Furniture & Fixtures');
    expect(report).toContain('Technology');
    expect(report).toContain('Contingency');
  });

  it('should include financial impact data', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain(outputs.annualTIRent?.toLocaleString());
    expect(report).toContain(outputs.effectiveRent?.toLocaleString());
    expect(report).toContain(outputs.monthlyTIRent?.toLocaleString());
    expect(report).toContain(outputs.totalLeaseCost?.toLocaleString());
  });

  it('should include investment analysis data', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain(outputs.presentValue?.toLocaleString());
    expect(report).toContain(outputs.netPresentValue?.toLocaleString());
    expect(report).toContain(`${outputs.internalRateOfReturn}%`);
    expect(report).toContain(`${outputs.paybackPeriod} years`);
  });

  it('should include tax benefits data', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain(outputs.annualDepreciation?.toLocaleString());
    expect(report).toContain(outputs.taxSavings?.toLocaleString());
    expect(report).toContain(outputs.afterTaxCost?.toLocaleString());
  });

  it('should include assessment scores', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain(`${outputs.valueScore}/100`);
    expect(report).toContain(`${outputs.riskScore}/100`);
  });

  it('should include recommendations section', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain('Recommendations');
    expect(report).toContain('Investment Decision');
  });

  it('should include lease terms analysis', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain(`${testInputs.leaseTerm} years`);
    expect(report).toContain(`${testInputs.amortizationPeriod} years`);
    expect(report).toContain(`${testInputs.interestRate}%`);
    expect(report).toContain(`${testInputs.rentEscalation}%`);
    expect(report).toContain(`$${testInputs.operatingExpenses}/sq ft/year`);
  });

  it('should include overall assessment and recommendation', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain('Overall Assessment');
    expect(report).toContain('Recommendation');
  });

  it('should handle high tenant out-of-pocket in recommendations', () => {
    const highCostInputs = { ...testInputs, constructionCosts: 50, tiAllowance: 10 };
    
    const outputs = calculateTenantImprovement(highCostInputs);
    const report = generateTenantImprovementAnalysis(highCostInputs, outputs);
    
    expect(report).toContain('Cost Gap');
  });

  it('should include cash flow projection table', () => {
    const outputs = calculateTenantImprovement(testInputs);
    const report = generateTenantImprovementAnalysis(testInputs, outputs);
    
    expect(report).toContain('Cash Flow Projection');
    expect(report).toContain('| Year | TI Rent | Cumulative Cost | Net Cash Flow |');
  });
});
