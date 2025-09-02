import { describe, it, expect, beforeEach } from 'vitest';
import { calculateRealEstateCrowdfunding } from './formulas';
import { validateRealEstateCrowdfundingInputs } from './validation';
import { validateField } from './quickValidation';
import { RealEstateCrowdfundingInputs } from './types';

describe('Real Estate Crowdfunding Calculator', () => {
  let validInputs: RealEstateCrowdfundingInputs;

  beforeEach(() => {
    validInputs = {
      // Investment Information
      investmentAmount: 50000,
      minimumInvestment: 1000,
      maximumInvestment: 1000000,
      investmentType: 'equity',
      investmentTerm: 60,
      targetIRR: 12,
      targetCashOnCash: 8,
      targetEquityMultiple: 2.5,

      // Property Information
      propertyValue: 2000000,
      propertyType: 'multifamily',
      propertySize: 50000,
      propertyLocation: 'Austin, TX',
      propertyCondition: 'good',
      propertyAge: 10,
      occupancyRate: 95,
      capRate: 6.5,

      // Financial Metrics
      purchasePrice: 2000000,
      downPayment: 400000,
      loanAmount: 1600000,
      interestRate: 5.5,
      loanTerm: 30,
      monthlyRent: 150000,
      annualRent: 1800000,
      operatingExpenses: 720000,
      propertyManagementFee: 5,
      vacancyRate: 5,
      maintenanceReserve: 90000,
      insuranceCost: 24000,
      propertyTaxRate: 1.2,

      // Crowdfunding Platform Information
      platformFee: 2,
      platformFeeType: 'percentage',
      minimumHoldPeriod: 12,
      liquidityOptions: 'secondary_market',
      secondaryMarketFee: 1,
      earlyExitPenalty: 5,

      // Market and Economic Factors
      marketAppreciationRate: 3,
      inflationRate: 2.5,
      localEconomicGrowth: 2,
      interestRateEnvironment: 'moderate',
      marketVolatility: 'medium',

      // Risk Factors
      propertyMarketRisk: 'medium',
      tenantCreditRisk: 'medium',
      interestRateRisk: 'medium',
      liquidityRisk: 'high',
      regulatoryRisk: 'low',
      sponsorTrackRecord: 'good',

      // Tax Considerations
      taxBracket: 24,
      stateTaxRate: 5,
      localTaxRate: 1,
      depreciationRecapture: true,
      section1031Eligible: false,
      qualifiedBusinessIncome: true,

      // Exit Strategy
      exitStrategy: 'sale',
      projectedExitValue: 2500000,
      projectedExitYear: 5,
      exitCosts: 125000,

      // Additional Investment Options
      leverageRatio: 80,
      preferredReturn: 8,
      promoteStructure: false,
      promotePercentage: 20,
      waterfallStructure: 'simple',

      // Analysis Parameters
      includeTaxes: true,
      includeInflation: true,
      includeAppreciation: true,
      includeLiquidity: true,
      riskAdjustment: true,
      scenarioAnalysis: true,

      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'currency',
      includeCharts: true,
      includeComparisons: true,
      includeTimeline: true,
    };
  });

  describe('calculateRealEstateCrowdfunding', () => {
    it('should calculate basic investment metrics correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.investmentAmount).toBe(50000);
      expect(result.effectiveInvestment).toBe(49000); // 50000 - 2% platform fee
      expect(result.investmentType).toBe('equity');
      expect(result.propertyType).toBe('multifamily');
      expect(result.propertyValue).toBe(2000000);
    });

    it('should calculate return metrics correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.annualizedReturn).toBeGreaterThan(0);
      expect(result.irr).toBeGreaterThan(0);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
    });

    it('should calculate risk metrics correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.sharpeRatio).toBeGreaterThan(0);
      expect(result.maximumDrawdown).toBeGreaterThan(0);
      expect(result.valueAtRisk).toBeGreaterThan(0);
    });

    it('should calculate cash flow analysis correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.monthlyCashFlow).toBeGreaterThan(0);
      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.cashFlowYield).toBeGreaterThan(0);
    });

    it('should calculate tax analysis correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.taxableIncome).toBeGreaterThanOrEqual(0);
      expect(result.taxLiability).toBeGreaterThanOrEqual(0);
      expect(result.afterTaxReturn).toBeGreaterThan(0);
      expect(result.taxEfficiency).toBeGreaterThan(0);
    });

    it('should calculate platform analysis correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.platformFees).toBe(1000); // 2% of 50000
      expect(result.totalFees).toBe(1000);
      expect(result.netInvestment).toBe(49000);
      expect(result.feeImpact).toBe(2); // 2%
    });

    it('should calculate liquidity analysis correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.liquidityScore).toBeGreaterThan(0);
      expect(result.timeToLiquidity).toBe(12);
      expect(result.secondaryMarketValue).toBeGreaterThan(0);
    });

    it('should generate cash flow projections', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.cashFlowProjections).toBeInstanceOf(Array);
      expect(result.cashFlowProjections.length).toBeGreaterThan(0);
      expect(result.cashFlowProjections[0]).toHaveProperty('period');
      expect(result.cashFlowProjections[0]).toHaveProperty('rentalIncome');
      expect(result.cashFlowProjections[0]).toHaveProperty('netCashFlow');
    });

    it('should generate exit scenarios', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.exitScenarios).toBeInstanceOf(Array);
      expect(result.exitScenarios.length).toBe(3); // Base, Optimistic, Pessimistic
      expect(result.exitScenarios[0]).toHaveProperty('scenario');
      expect(result.exitScenarios[0]).toHaveProperty('probability');
      expect(result.exitScenarios[0]).toHaveProperty('exitValue');
    });

    it('should generate risk scenarios', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.riskScenarios).toBeInstanceOf(Array);
      expect(result.riskScenarios.length).toBeGreaterThan(0);
      expect(result.riskScenarios[0]).toHaveProperty('scenario');
      expect(result.riskScenarios[0]).toHaveProperty('probability');
      expect(result.riskScenarios[0]).toHaveProperty('impact');
    });

    it('should generate analysis object', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.investmentRating).toBeDefined();
      expect(result.analysis.riskRating).toBeDefined();
      expect(result.analysis.liquidityRating).toBeDefined();
      expect(result.analysis.taxEfficiencyRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeInstanceOf(Array);
      expect(result.analysis.keyWeaknesses).toBeInstanceOf(Array);
    });

    it('should calculate investment summary correctly', () => {
      const result = calculateRealEstateCrowdfunding(validInputs);

      expect(result.investmentSummary).toBeDefined();
      expect(result.investmentSummary.totalInvestment).toBe(50000);
      expect(result.investmentSummary.projectedReturn).toBeGreaterThan(0);
      expect(result.investmentSummary.riskLevel).toBeDefined();
      expect(result.investmentSummary.liquidityLevel).toBeDefined();
      expect(result.investmentSummary.recommendation).toBeDefined();
    });
  });

  describe('validateRealEstateCrowdfundingInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateRealEstateCrowdfundingInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid investment amount', () => {
      const invalidInputs = { ...validInputs, investmentAmount: -1000 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should reject investment amount below minimum', () => {
      const invalidInputs = { ...validInputs, investmentAmount: 500 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should reject investment amount above maximum', () => {
      const invalidInputs = { ...validInputs, investmentAmount: 2000000 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should reject invalid investment type', () => {
      const invalidInputs = { ...validInputs, investmentType: 'invalid' as any };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentType).toBeDefined();
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid' as any };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyType).toBeDefined();
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: -1000000 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should reject invalid loan amount', () => {
      const invalidInputs = { ...validInputs, loanAmount: 3000000 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });

    it('should reject invalid interest rate', () => {
      const invalidInputs = { ...validInputs, interestRate: 25 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.interestRate).toBeDefined();
    });

    it('should reject invalid platform fee', () => {
      const invalidInputs = { ...validInputs, platformFee: 15 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.platformFee).toBeDefined();
    });

    it('should reject invalid occupancy rate', () => {
      const invalidInputs = { ...validInputs, occupancyRate: 150 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.occupancyRate).toBeDefined();
    });

    it('should reject invalid cap rate', () => {
      const invalidInputs = { ...validInputs, capRate: 25 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.capRate).toBeDefined();
    });

    it('should reject invalid tax bracket', () => {
      const invalidInputs = { ...validInputs, taxBracket: 60 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.taxBracket).toBeDefined();
    });

    it('should reject invalid projected exit value', () => {
      const invalidInputs = { ...validInputs, projectedExitValue: 500000 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.projectedExitValue).toBeDefined();
    });

    it('should reject invalid projected exit year', () => {
      const invalidInputs = { ...validInputs, projectedExitYear: 25 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.projectedExitYear).toBeDefined();
    });

    it('should validate land property constraints', () => {
      const landInputs = { ...validInputs, propertyType: 'land', occupancyRate: 50, capRate: 5 };
      const result = validateRealEstateCrowdfundingInputs(landInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.occupancyRate).toBeDefined();
      expect(result.errors?.capRate).toBeDefined();
    });

    it('should validate cross-field constraints', () => {
      const invalidInputs = { ...validInputs, downPayment: 100000, loanAmount: 2000000 };
      const result = validateRealEstateCrowdfundingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.loanAmount).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate investment amount correctly', () => {
      const result = validateField('investmentAmount', 50000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('investmentAmount', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate property value correctly', () => {
      const result = validateField('propertyValue', 2000000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyValue', -1000000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate investment type correctly', () => {
      const result = validateField('investmentType', 'equity', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('investmentType', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate property type correctly', () => {
      const result = validateField('propertyType', 'multifamily', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyType', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate loan amount with cross-field validation', () => {
      const result = validateField('loanAmount', 1600000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('loanAmount', 3000000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate interest rate with cross-field validation', () => {
      const result = validateField('interestRate', 5.5, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('interestRate', 0, { ...validInputs, loanAmount: 1000000 });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate platform fee with cross-field validation', () => {
      const result = validateField('platformFee', 2, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('platformFee', 60000, { ...validInputs, platformFeeType: 'flat' });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate property size with property type constraints', () => {
      const result = validateField('propertySize', 50000, validInputs);
      expect(result.isValid).toBe(true);

      const landResult = validateField('propertySize', 500, { ...validInputs, propertyType: 'land' });
      expect(landResult.isValid).toBe(false);
      expect(landResult.error).toBeDefined();
    });

    it('should validate occupancy rate with property type constraints', () => {
      const result = validateField('occupancyRate', 95, validInputs);
      expect(result.isValid).toBe(true);

      const landResult = validateField('occupancyRate', 50, { ...validInputs, propertyType: 'land' });
      expect(landResult.isValid).toBe(false);
      expect(landResult.error).toBeDefined();
    });

    it('should validate cap rate with property type constraints', () => {
      const result = validateField('capRate', 6.5, validInputs);
      expect(result.isValid).toBe(true);

      const landResult = validateField('capRate', 5, { ...validInputs, propertyType: 'land' });
      expect(landResult.isValid).toBe(false);
      expect(landResult.error).toBeDefined();
    });

    it('should validate boolean fields correctly', () => {
      const result = validateField('includeTaxes', true, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('includeTaxes', 'yes', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate currency correctly', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('currency', 'INVALID', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate display format correctly', () => {
      const result = validateField('displayFormat', 'currency', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('displayFormat', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle zero values appropriately', () => {
      const zeroInputs = { ...validInputs, investmentAmount: 0 };
      const result = validateRealEstateCrowdfundingInputs(zeroInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should handle very large values', () => {
      const largeInputs = { ...validInputs, propertyValue: 1000000000 };
      const result = calculateRealEstateCrowdfunding(largeInputs);
      expect(result.propertyValue).toBe(1000000000);
      expect(result.effectiveInvestment).toBeDefined();
    });

    it('should handle very small values', () => {
      const smallInputs = { ...validInputs, investmentAmount: 1000 };
      const result = calculateRealEstateCrowdfunding(smallInputs);
      expect(result.investmentAmount).toBe(1000);
      expect(result.effectiveInvestment).toBe(980); // 1000 - 2% platform fee
    });

    it('should handle maximum investment term', () => {
      const maxTermInputs = { ...validInputs, investmentTerm: 120 };
      const result = calculateRealEstateCrowdfunding(maxTermInputs);
      expect(result.investmentTerm).toBe(120);
    });

    it('should handle minimum investment term', () => {
      const minTermInputs = { ...validInputs, investmentTerm: 1 };
      const result = calculateRealEstateCrowdfunding(minTermInputs);
      expect(result.investmentTerm).toBe(1);
    });

    it('should handle different investment types', () => {
      const debtInputs = { ...validInputs, investmentType: 'debt' };
      const result = calculateRealEstateCrowdfunding(debtInputs);
      expect(result.investmentType).toBe('debt');
    });

    it('should handle different property types', () => {
      const commercialInputs = { ...validInputs, propertyType: 'commercial' };
      const result = calculateRealEstateCrowdfunding(commercialInputs);
      expect(result.propertyType).toBe('commercial');
    });

    it('should handle different liquidity options', () => {
      const noLiquidityInputs = { ...validInputs, liquidityOptions: 'none' };
      const result = calculateRealEstateCrowdfunding(noLiquidityInputs);
      expect(result.liquidityScore).toBeLessThan(validInputs.liquidityOptions === 'secondary_market' ? 80 : 100);
    });

    it('should handle different risk levels', () => {
      const highRiskInputs = { ...validInputs, propertyMarketRisk: 'high', liquidityRisk: 'high' };
      const result = calculateRealEstateCrowdfunding(highRiskInputs);
      expect(result.analysis.riskRating).toBe('High');
    });

    it('should handle different sponsor track records', () => {
      const excellentSponsorInputs = { ...validInputs, sponsorTrackRecord: 'excellent' };
      const result = calculateRealEstateCrowdfunding(excellentSponsorInputs);
      expect(result.analysis.keyStrengths).toContain('Experienced sponsor with good track record');
    });

    it('should handle tax considerations', () => {
      const noTaxInputs = { ...validInputs, includeTaxes: false };
      const result = calculateRealEstateCrowdfunding(noTaxInputs);
      expect(result.taxEfficiency).toBeDefined();
    });

    it('should handle inflation considerations', () => {
      const noInflationInputs = { ...validInputs, includeInflation: false };
      const result = calculateRealEstateCrowdfunding(noInflationInputs);
      expect(result.cashFlowProjections).toBeDefined();
    });

    it('should handle appreciation considerations', () => {
      const noAppreciationInputs = { ...validInputs, includeAppreciation: false };
      const result = calculateRealEstateCrowdfunding(noAppreciationInputs);
      expect(result.propertyAppreciation).toBeDefined();
    });

    it('should handle different exit strategies', () => {
      const refinanceInputs = { ...validInputs, exitStrategy: 'refinance' };
      const result = calculateRealEstateCrowdfunding(refinanceInputs);
      expect(result.exitScenarios).toBeDefined();
    });

    it('should handle promote structure', () => {
      const promoteInputs = { ...validInputs, promoteStructure: true, promotePercentage: 20 };
      const result = calculateRealEstateCrowdfunding(promoteInputs);
      expect(result.analysis).toBeDefined();
    });

    it('should handle different waterfall structures', () => {
      const complexWaterfallInputs = { ...validInputs, waterfallStructure: 'complex' };
      const result = calculateRealEstateCrowdfunding(complexWaterfallInputs);
      expect(result.analysis).toBeDefined();
    });

    it('should handle different currencies', () => {
      const eurInputs = { ...validInputs, currency: 'EUR' };
      const result = calculateRealEstateCrowdfunding(eurInputs);
      expect(result.investmentSummary).toBeDefined();
    });

    it('should handle different display formats', () => {
      const percentageInputs = { ...validInputs, displayFormat: 'percentage' };
      const result = calculateRealEstateCrowdfunding(percentageInputs);
      expect(result.investmentSummary).toBeDefined();
    });
  });
});