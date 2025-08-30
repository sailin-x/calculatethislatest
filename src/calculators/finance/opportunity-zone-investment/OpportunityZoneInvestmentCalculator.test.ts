import { describe, it, expect, beforeEach } from 'vitest';
import { calculateOpportunityZoneInvestment } from './formulas';
import { validateOpportunityZoneInvestmentInputs } from './validation';
import { validateField } from './quickValidation';
import { OpportunityZoneInvestmentInputs } from './types';

describe('Opportunity Zone Investment ROI Calculator', () => {
  let validInputs: OpportunityZoneInvestmentInputs;

  beforeEach(() => {
    validInputs = {
      // Investment Information
      investmentAmount: 1000000,
      investmentDate: '2023-01-01',
      investmentType: 'real_estate',
      investmentStructure: 'direct',
      
      // Property Information
      propertyValue: 1500000,
      propertyAddress: '123 Opportunity St, Zone City, USA',
      propertyType: 'mixed_use',
      propertySize: 20000,
      propertyAge: 10,
      numberOfUnits: 50,
      
      // Opportunity Zone Information
      opportunityZoneLocation: 'Zone City, State',
      opportunityZoneDesignation: 'OZ-2023-001',
      opportunityZoneTier: 'tier_1',
      opportunityZoneBenefits: [
        { benefit: 'Tax Deferral', applicable: true, details: 'Defer capital gains until 2026' },
        { benefit: 'Tax Exclusion', applicable: true, details: 'Exclude 10% of gains after 5 years' },
        { benefit: 'Basis Step-Up', applicable: true, details: 'Step-up basis to fair market value after 10 years' }
      ],
      
      // Tax Information
      originalGainAmount: 500000,
      originalGainDate: '2023-01-01',
      originalGainType: 'capital_gain',
      investorTaxRate: 23.8,
      stateTaxRate: 5.0,
      localTaxRate: 2.0,
      
      // Investment Timeline
      investmentPeriod: 10,
      deferralPeriod: 7,
      exclusionPeriod: 5,
      basisStepUpPeriod: 10,
      exitDate: '2033-01-01',
      
      // Revenue Projections
      revenueProjections: [
        { year: 1, revenue: 200000, expenses: 80000, noi: 120000, appreciation: 3.0 },
        { year: 2, revenue: 210000, expenses: 84000, noi: 126000, appreciation: 3.5 },
        { year: 3, revenue: 220500, expenses: 88200, noi: 132300, appreciation: 4.0 },
        { year: 4, revenue: 231525, expenses: 92610, noi: 138915, appreciation: 4.5 },
        { year: 5, revenue: 243101, expenses: 97240, noi: 145861, appreciation: 5.0 },
        { year: 6, revenue: 255256, expenses: 102102, noi: 153154, appreciation: 5.5 },
        { year: 7, revenue: 268019, expenses: 107208, noi: 160811, appreciation: 6.0 },
        { year: 8, revenue: 281420, expenses: 112568, noi: 168852, appreciation: 6.5 },
        { year: 9, revenue: 295491, expenses: 118196, noi: 177295, appreciation: 7.0 },
        { year: 10, revenue: 310266, expenses: 124106, noi: 186160, appreciation: 7.5 }
      ],
      
      // Tax Benefits
      taxDeferral: true,
      taxExclusion: true,
      basisStepUp: true,
      deferralPercentage: 100,
      exclusionPercentage: 10,
      basisStepUpPercentage: 100,
      
      // Investment Returns
      expectedAnnualReturn: 12.0,
      expectedAppreciation: 5.0,
      expectedCashFlow: 8.0,
      expectedExitValue: 2500000,
      
      // Market Information
      marketLocation: 'urban',
      marketCondition: 'growing',
      marketGrowthRate: 4.0,
      comparableInvestments: [
        { investment: 'Traditional Real Estate', roi: 8.5, irr: 10.2, capRate: 6.5 },
        { investment: 'REIT', roi: 7.2, irr: 8.8, capRate: 5.8 },
        { investment: 'Private Equity', roi: 15.0, irr: 18.5, capRate: 8.2 }
      ],
      
      // Risk Factors
      marketRisk: 'medium',
      regulatoryRisk: 'low',
      liquidityRisk: 'high',
      developmentRisk: 'medium',
      
      // Analysis Parameters
      analysisPeriod: 10,
      inflationRate: 2.5,
      discountRate: 10.0,
      taxDeductionPeriod: 10,
      
      // Reporting Preferences
      currency: 'USD',
      displayFormat: 'percentage',
      includeCharts: true
    };
  });

  describe('calculateOpportunityZoneInvestment', () => {
    it('should calculate basic investment metrics correctly', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.afterTaxReturn).toBeGreaterThan(result.totalReturn);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.netPresentValue).toBeDefined();
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate tax benefits correctly', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.taxDeferralBenefit).toBeGreaterThan(0);
      expect(result.taxExclusionBenefit).toBeGreaterThan(0);
      expect(result.basisStepUpBenefit).toBeGreaterThan(0);
      expect(result.totalTaxBenefit).toBe(result.taxDeferralBenefit + result.taxExclusionBenefit + result.basisStepUpBenefit);
    });

    it('should generate analysis correctly', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.investmentRating).toBeDefined();
      expect(result.analysis.taxBenefitRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeInstanceOf(Array);
      expect(result.analysis.keyWeaknesses).toBeInstanceOf(Array);
      expect(result.analysis.marketRisk).toBeDefined();
      expect(result.analysis.regulatoryRisk).toBeDefined();
      expect(result.analysis.liquidityRisk).toBeDefined();
      expect(result.analysis.developmentRisk).toBeDefined();
    });

    it('should generate comparison analysis correctly', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
      
      result.comparisonAnalysis.forEach(comparison => {
        expect(comparison.metric).toBeDefined();
        expect(comparison.opportunityZone).toBeDefined();
        expect(comparison.traditional).toBeDefined();
        expect(comparison.difference).toBeDefined();
      });
    });

    it('should generate metrics breakdown correctly', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.metrics).toBeDefined();
      expect(result.metrics.totalInvestment).toBe(validInputs.investmentAmount);
      expect(result.metrics.exitValue).toBeGreaterThan(validInputs.propertyValue);
      expect(result.metrics.totalCashFlow).toBeGreaterThan(0);
      expect(result.metrics.totalTaxBenefit).toBeGreaterThan(0);
      expect(result.metrics.netProfit).toBeDefined();
      expect(result.metrics.afterTaxProfit).toBeGreaterThan(result.metrics.netProfit);
      expect(result.metrics.annualizedReturn).toBeDefined();
      expect(result.metrics.taxBenefitPercentage).toBeGreaterThan(0);
      expect(result.metrics.returnOnEquity).toBeDefined();
      expect(result.metrics.afterTaxROE).toBeGreaterThan(result.metrics.returnOnEquity);
    });

    it('should handle zero tax benefits correctly', () => {
      const inputsWithNoTaxBenefits = {
        ...validInputs,
        taxDeferral: false,
        taxExclusion: false,
        basisStepUp: false
      };

      const result = calculateOpportunityZoneInvestment(inputsWithNoTaxBenefits);

      expect(result.taxDeferralBenefit).toBe(0);
      expect(result.taxExclusionBenefit).toBe(0);
      expect(result.basisStepUpBenefit).toBe(0);
      expect(result.totalTaxBenefit).toBe(0);
      expect(result.afterTaxReturn).toBe(result.totalReturn);
    });

    it('should handle different investment periods correctly', () => {
      const shortTermInputs = { ...validInputs, investmentPeriod: 5 };
      const longTermInputs = { ...validInputs, investmentPeriod: 15 };

      const shortTermResult = calculateOpportunityZoneInvestment(shortTermInputs);
      const longTermResult = calculateOpportunityZoneInvestment(longTermInputs);

      expect(shortTermResult.paybackPeriod).toBeLessThanOrEqual(5);
      expect(longTermResult.paybackPeriod).toBeLessThanOrEqual(15);
    });

    it('should handle different risk levels correctly', () => {
      const lowRiskInputs = {
        ...validInputs,
        marketRisk: 'low',
        regulatoryRisk: 'low',
        liquidityRisk: 'low',
        developmentRisk: 'low'
      };

      const highRiskInputs = {
        ...validInputs,
        marketRisk: 'high',
        regulatoryRisk: 'high',
        liquidityRisk: 'high',
        developmentRisk: 'high'
      };

      const lowRiskResult = calculateOpportunityZoneInvestment(lowRiskInputs);
      const highRiskResult = calculateOpportunityZoneInvestment(highRiskInputs);

      expect(lowRiskResult.riskScore).toBeLessThan(highRiskResult.riskScore);
    });
  });

  describe('validateOpportunityZoneInvestmentInputs', () => {
    it('should validate correct inputs successfully', () => {
      const result = validateOpportunityZoneInvestmentInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid investment amount', () => {
      const invalidInputs = { ...validInputs, investmentAmount: -1000 };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should reject invalid property value', () => {
      const invalidInputs = { ...validInputs, propertyValue: 0 };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.propertyValue).toBeDefined();
    });

    it('should reject invalid tax rates', () => {
      const invalidInputs = { ...validInputs, investorTaxRate: 150 };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.investorTaxRate).toBeDefined();
    });

    it('should reject invalid investment period', () => {
      const invalidInputs = { ...validInputs, investmentPeriod: 0 };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentPeriod).toBeDefined();
    });

    it('should reject invalid opportunity zone tier', () => {
      const invalidInputs = { ...validInputs, opportunityZoneTier: 'invalid' as any };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.opportunityZoneTier).toBeDefined();
    });

    it('should reject invalid market risk', () => {
      const invalidInputs = { ...validInputs, marketRisk: 'invalid' as any };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.marketRisk).toBeDefined();
    });

    it('should reject invalid revenue projections', () => {
      const invalidInputs = {
        ...validInputs,
        revenueProjections: [
          { year: 1, revenue: -1000, expenses: 80000, noi: 120000, appreciation: 3.0 }
        ]
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.['revenueProjections.0.revenue']).toBeDefined();
    });

    it('should validate business logic constraints', () => {
      const invalidInputs = {
        ...validInputs,
        investmentAmount: 3000000, // More than 1.5x property value
        propertyValue: 1500000
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should validate tax benefit consistency', () => {
      const invalidInputs = {
        ...validInputs,
        taxDeferral: true,
        deferralPercentage: 0
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.deferralPercentage).toBeDefined();
    });

    it('should validate timeline consistency', () => {
      const invalidInputs = {
        ...validInputs,
        deferralPeriod: 8,
        exclusionPeriod: 3 // Less than deferral period
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors?.exclusionPeriod).toBeDefined();
    });
  });

  describe('validateField', () => {
    it('should validate investment amount correctly', () => {
      const result = validateField('investmentAmount', 1000000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('investmentAmount', -1000, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate property value with cross-field validation', () => {
      const result = validateField('propertyValue', 1500000, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('propertyValue', 500000, {
        ...validInputs,
        investmentAmount: 1000000
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate tax rates correctly', () => {
      const result = validateField('investorTaxRate', 23.8, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('investorTaxRate', 150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate investment period correctly', () => {
      const result = validateField('investmentPeriod', 10, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('investmentPeriod', 0, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate deferral period with cross-field validation', () => {
      const result = validateField('deferralPeriod', 7, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('deferralPeriod', 15, {
        ...validInputs,
        investmentPeriod: 10
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate exclusion period with cross-field validation', () => {
      const result = validateField('exclusionPeriod', 5, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('exclusionPeriod', 3, {
        ...validInputs,
        deferralPeriod: 7
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate basis step-up period with cross-field validation', () => {
      const result = validateField('basisStepUpPeriod', 10, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('basisStepUpPeriod', 3, {
        ...validInputs,
        exclusionPeriod: 5
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate expected returns correctly', () => {
      const result = validateField('expectedAnnualReturn', 12.0, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('expectedAnnualReturn', -150, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate market information correctly', () => {
      const result = validateField('marketLocation', 'urban', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('marketLocation', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate risk factors correctly', () => {
      const result = validateField('marketRisk', 'medium', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('marketRisk', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate analysis parameters correctly', () => {
      const result = validateField('analysisPeriod', 10, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('analysisPeriod', 0, validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate reporting preferences correctly', () => {
      const result = validateField('currency', 'USD', validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('currency', 'INVALID', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate boolean fields correctly', () => {
      const result = validateField('taxDeferral', true, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('taxDeferral', 'invalid', validInputs);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });

    it('should validate tax benefit percentages with cross-field validation', () => {
      const result = validateField('deferralPercentage', 100, validInputs);
      expect(result.isValid).toBe(true);

      const invalidResult = validateField('deferralPercentage', 0, {
        ...validInputs,
        taxDeferral: true
      });
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.error).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero investment amount', () => {
      const zeroInputs = { ...validInputs, investmentAmount: 0 };
      const result = validateOpportunityZoneInvestmentInputs(zeroInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should handle very large values', () => {
      const largeInputs = { ...validInputs, investmentAmount: 2000000000 };
      const result = validateOpportunityZoneInvestmentInputs(largeInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should handle negative tax rates', () => {
      const negativeInputs = { ...validInputs, investorTaxRate: -10 };
      const result = validateOpportunityZoneInvestmentInputs(negativeInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investorTaxRate).toBeDefined();
    });

    it('should handle empty strings', () => {
      const emptyInputs = { ...validInputs, opportunityZoneLocation: '' };
      const result = validateOpportunityZoneInvestmentInputs(emptyInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.opportunityZoneLocation).toBeDefined();
    });

    it('should handle invalid dates', () => {
      const invalidInputs = { ...validInputs, investmentDate: 'invalid-date' };
      const result = validateField('investmentDate', 'invalid-date', validInputs);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Business Logic', () => {
    it('should validate that total operating expenses do not exceed total gross income', () => {
      const invalidInputs = {
        ...validInputs,
        revenueProjections: [
          { year: 1, revenue: 100000, expenses: 150000, noi: -50000, appreciation: 3.0 }
        ]
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.revenueProjections).toBeDefined();
    });

    it('should validate investment amount relative to property value', () => {
      const invalidInputs = {
        ...validInputs,
        investmentAmount: 3000000,
        propertyValue: 1500000
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.investmentAmount).toBeDefined();
    });

    it('should validate tax benefit consistency', () => {
      const invalidInputs = {
        ...validInputs,
        taxExclusion: true,
        exclusionPercentage: 0
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.exclusionPercentage).toBeDefined();
    });

    it('should validate timeline consistency', () => {
      const invalidInputs = {
        ...validInputs,
        basisStepUpPeriod: 3,
        exclusionPeriod: 5
      };
      const result = validateOpportunityZoneInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors?.basisStepUpPeriod).toBeDefined();
    });
  });

  describe('Analysis Logic', () => {
    it('should generate appropriate investment rating based on returns', () => {
      const highReturnInputs = { ...validInputs, expectedAnnualReturn: 25.0 };
      const lowReturnInputs = { ...validInputs, expectedAnnualReturn: 3.0 };

      const highReturnResult = calculateOpportunityZoneInvestment(highReturnInputs);
      const lowReturnResult = calculateOpportunityZoneInvestment(lowReturnInputs);

      expect(highReturnResult.analysis.investmentRating).toBe('Excellent');
      expect(lowReturnResult.analysis.investmentRating).toBe('Poor');
    });

    it('should generate appropriate tax benefit rating', () => {
      const highBenefitInputs = { ...validInputs, originalGainAmount: 2000000 };
      const lowBenefitInputs = { ...validInputs, originalGainAmount: 100000 };

      const highBenefitResult = calculateOpportunityZoneInvestment(highBenefitInputs);
      const lowBenefitResult = calculateOpportunityZoneInvestment(lowBenefitInputs);

      expect(highBenefitResult.analysis.taxBenefitRating).toBe('High Benefit');
      expect(lowBenefitResult.analysis.taxBenefitRating).toBe('Low Benefit');
    });

    it('should generate appropriate recommendation based on risk and return', () => {
      const goodInputs = {
        ...validInputs,
        expectedAnnualReturn: 15.0,
        marketRisk: 'low',
        regulatoryRisk: 'low',
        liquidityRisk: 'low',
        developmentRisk: 'low'
      };

      const riskyInputs = {
        ...validInputs,
        expectedAnnualReturn: 5.0,
        marketRisk: 'high',
        regulatoryRisk: 'high',
        liquidityRisk: 'high',
        developmentRisk: 'high'
      };

      const goodResult = calculateOpportunityZoneInvestment(goodInputs);
      const riskyResult = calculateOpportunityZoneInvestment(riskyInputs);

      expect(goodResult.analysis.recommendation).toBe('Proceed');
      expect(riskyResult.analysis.recommendation).toBe('Do Not Proceed');
    });

    it('should generate key strengths and weaknesses', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.analysis.keyStrengths.length).toBeGreaterThan(0);
      expect(result.analysis.keyWeaknesses.length).toBeGreaterThan(0);
    });

    it('should generate risk assessments', () => {
      const result = calculateOpportunityZoneInvestment(validInputs);

      expect(result.analysis.marketRisk).toContain('risk');
      expect(result.analysis.regulatoryRisk).toContain('risk');
      expect(result.analysis.liquidityRisk).toContain('risk');
      expect(result.analysis.developmentRisk).toContain('risk');
    });
  });
});