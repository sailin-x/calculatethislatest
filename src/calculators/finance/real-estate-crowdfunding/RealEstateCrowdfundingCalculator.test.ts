import { describe, it, expect } from 'vitest';
import { RealEstateCrowdfundingCalculator } from './RealEstateCrowdfundingCalculator';
import { calculateRealEstateCrowdfunding } from './formulas';
import { validateRealEstateCrowdfundingInputs } from './validation';

describe('RealEstateCrowdfundingCalculator', () => {
  const testInputs = {
    investmentAmount: 50000,
    totalProjectCost: 2000000,
    minimumInvestment: 1000,
    maximumInvestment: 100000,
    numberOfInvestors: 50,
    investorEquity: 500000,
    propertyValue: 2500000,
    propertyType: 'residential' as const,
    propertyLocation: 'downtown',
    projectStage: 'pre_construction' as const,
    expectedHoldPeriod: 60,
    expectedExitValue: 3000000,
    annualRentIncome: 150000,
    operatingExpenses: 45000,
    managementFees: 12000,
    maintenanceReserve: 8000,
    insuranceCosts: 15000,
    propertyTaxes: 25000,
    platformFee: 2.5,
    transactionFee: 1.0,
    servicingFee: 0.5,
    exitFee: 2.0,
    loanToValue: 70,
    interestRate: 6.5,
    loanTerm: 60,
    debtServiceCoverage: 1.5,
    marketRentGrowth: 3.0,
    propertyAppreciation: 4.0,
    capRate: 6.0,
    marketCapRate: 5.5,
    occupancyRate: 95,
    tenantQuality: 'B' as const,
    locationRisk: 'medium' as const,
    marketRisk: 'medium' as const,
    regulatoryRisk: 'low' as const,
    depreciationSchedule: 27.5,
    depreciationBonus: 0,
    taxRate: 30,
    analysisPeriod: 10,
    discountRate: 8,
    inflationRate: 2.5,
    currency: 'USD' as const
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(RealEstateCrowdfundingCalculator.id).toBe('real-estate-crowdfunding-calculator');
      expect(RealEstateCrowdfundingCalculator.title).toBe('Real Estate Crowdfunding Calculator');
      expect(RealEstateCrowdfundingCalculator.category).toBe('finance');
      expect(RealEstateCrowdfundingCalculator.description).toBeTruthy();
      expect(RealEstateCrowdfundingCalculator.inputs).toBeInstanceOf(Array);
      expect(RealEstateCrowdfundingCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = RealEstateCrowdfundingCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('investmentAmount');
      expect(inputIds).toContain('totalProjectCost');
      expect(inputIds).toContain('annualRentIncome');
      expect(inputIds).toContain('expectedExitValue');
    });

    it('should have required output fields', () => {
      const outputIds = RealEstateCrowdfundingCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('cashOnCashReturn');
      expect(outputIds).toContain('totalReturn');
      expect(outputIds).toContain('IRR');
      expect(outputIds).toContain('riskScore');
    });
  });

  describe('Formulas', () => {
    it('should calculate equity percentage correctly', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeLessThanOrEqual(100);
    });

    it('should calculate cash-on-cash return', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(typeof result.cashOnCashReturn).toBe('number');
    });

    it('should calculate total return', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.totalReturn).toBeGreaterThan(0);
      expect(typeof result.totalReturn).toBe('number');
    });

    it('should calculate IRR', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.IRR).toBeGreaterThan(0);
      expect(typeof result.IRR).toBe('number');
    });

    it('should calculate risk score', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateRealEstateCrowdfundingInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject negative investment amount', () => {
      const invalidInputs = { ...testInputs, investmentAmount: -1000 };
      const validation = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Investment amount must be greater than 0');
    });

    it('should reject investment amount exceeding project cost', () => {
      const invalidInputs = { ...testInputs, investmentAmount: 3000000 };
      const validation = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Investment amount cannot exceed total project cost');
    });

    it('should reject invalid loan-to-value ratio', () => {
      const invalidInputs = { ...testInputs, loanToValue: 150 };
      const validation = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Loan-to-value ratio must be between 0 and 100');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero operating expenses', () => {
      const edgeCaseInputs = { ...testInputs, operatingExpenses: 0 };
      const result = calculateRealEstateCrowdfunding(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
    });

    it('should handle high occupancy rate', () => {
      const edgeCaseInputs = { ...testInputs, occupancyRate: 100 };
      const result = calculateRealEstateCrowdfunding(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.riskScore).toBeLessThan(50); // Lower risk with perfect occupancy
    });

    it('should handle low occupancy rate', () => {
      const edgeCaseInputs = { ...testInputs, occupancyRate: 50 };
      const result = calculateRealEstateCrowdfunding(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.riskScore).toBeGreaterThan(50); // Higher risk with low occupancy
    });
  });

  describe('Analysis', () => {
    it('should provide investment analysis', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.investmentRating).toBeDefined();
      expect(result.analysis.riskRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
    });

    it('should provide risk assessment', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.analysis.riskAssessment).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should provide investment recommendations', () => {
      const result = calculateRealEstateCrowdfunding(testInputs);
      expect(result.analysis.investmentRecommendations).toBeInstanceOf(Array);
      expect(result.analysis.investmentRecommendations.length).toBeGreaterThan(0);
    });
  });
});