import { OpportunityZoneCalculator } from './OpportunityZoneCalculator';
import {
  calculateDeferredTaxSavings,
  calculateStepUpTaxSavings,
  calculateExclusionTaxSavings,
  calculateProjectedValue,
  calculateTotalCashFlow,
  calculateLeveragedReturn,
  calculateIRR,
  calculateNPV,
  calculateEffectiveTaxRate,
  calculateAfterTaxIRR
} from './formulas';
import { validateOpportunityZoneInputs } from './validation';

describe('OpportunityZoneCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(OpportunityZoneCalculator.id).toBe('opportunity-zone-investment-roi-calculator');
      expect(OpportunityZoneCalculator.title).toBe('Opportunity Zone Investment ROI Calculator');
      expect(OpportunityZoneCalculator.category).toBe('finance');
      expect(OpportunityZoneCalculator.subcategory).toBe('Tax-Advantaged Investing');
    });

    it('should have required inputs', () => {
      const requiredInputs = OpportunityZoneCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(13); // Most inputs are required
      expect(requiredInputs.map(i => i.id)).toEqual([
        'initialInvestment', 'investmentDate', 'holdingPeriodYears',
        'capitalGainsTaxRate', 'ordinaryIncomeTaxRate', 'expectedAnnualAppreciation',
        'expectedAnnualIncome', 'capitalGainAmount', 'deferralPeriodYears',
        'stepUpPercentage', 'exitYear', 'exitMultiple', 'riskAdjustedDiscountRate'
      ]);
    });

    it('should have correct outputs', () => {
      expect(OpportunityZoneCalculator.outputs).toHaveLength(10);
      expect(OpportunityZoneCalculator.outputs.map(o => o.id)).toEqual([
        'totalTaxSavings', 'projectedValue', 'afterTaxIrr', 'effectiveTaxRate',
        'deferredTaxSavings', 'stepUpTaxSavings', 'exclusionTaxSavings',
        'totalCashFlow', 'leveragedReturn', 'npv'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateDeferredTaxSavings', () => {
      it('should calculate deferred tax savings correctly', () => {
        const result = calculateDeferredTaxSavings(300000, 20);
        expect(result).toBe(60000);
      });
    });

    describe('calculateStepUpTaxSavings', () => {
      it('should calculate step-up tax savings correctly', () => {
        const result = calculateStepUpTaxSavings(500000, 15, 20);
        expect(result).toBe(15000);
      });
    });

    describe('calculateExclusionTaxSavings', () => {
      it('should calculate exclusion tax savings correctly', () => {
        const result = calculateExclusionTaxSavings(1000000, 20);
        expect(result).toBe(200000);
      });
    });

    describe('calculateProjectedValue', () => {
      it('should calculate projected value with appreciation', () => {
        const result = calculateProjectedValue(500000, 8, 7);
        expect(result).toBeCloseTo(791000, 0);
      });
    });

    describe('calculateTotalCashFlow', () => {
      it('should calculate total cash flow correctly', () => {
        const result = calculateTotalCashFlow(25000, 7);
        expect(result).toBe(175000);
      });
    });

    describe('calculateLeveragedReturn', () => {
      it('should calculate leveraged return correctly', () => {
        const result = calculateLeveragedReturn(900000, 500000, 60, 175000);
        expect(result).toBeGreaterThan(0);
      });
    });

    describe('calculateEffectiveTaxRate', () => {
      it('should calculate effective tax rate correctly', () => {
        const result = calculateEffectiveTaxRate(300000, 135000);
        expect(result).toBeCloseTo(55, 0); // (300000-135000)/300000 * 100
      });
    });

    describe('calculateAfterTaxIRR', () => {
      it('should calculate after-tax IRR correctly', () => {
        const result = calculateAfterTaxIRR(25, 10);
        expect(result).toBe(22.5);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2024-01-01',
        holdingPeriodYears: 7,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 35,
        expectedAnnualAppreciation: 8,
        expectedAnnualIncome: 25000,
        capitalGainAmount: 300000,
        deferralPeriodYears: 5,
        stepUpPercentage: 15,
        exitYear: 7,
        exitMultiple: 1.8,
        leveragePercentage: 60,
        interestRate: 6.5,
        includeTaxDeferral: true,
        includeStepUp: true,
        includeExclusion: false,
        riskAdjustedDiscountRate: 12
      };
      const errors = validateOpportunityZoneInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative initial investment', () => {
      const inputs = {
        initialInvestment: -1000,
        investmentDate: '2024-01-01',
        holdingPeriodYears: 7,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 35,
        expectedAnnualAppreciation: 8,
        expectedAnnualIncome: 25000,
        capitalGainAmount: 300000,
        deferralPeriodYears: 5,
        stepUpPercentage: 15,
        exitYear: 7,
        exitMultiple: 1.8,
        leveragePercentage: 60,
        interestRate: 6.5,
        includeTaxDeferral: true,
        includeStepUp: true,
        includeExclusion: false,
        riskAdjustedDiscountRate: 12
      };
      const errors = validateOpportunityZoneInputs(inputs);
      expect(errors).toContainEqual({
        field: 'initialInvestment',
        message: 'Initial investment must be greater than 0'
      });
    });

    it('should reject holding period less than 1 year', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2024-01-01',
        holdingPeriodYears: 0,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 35,
        expectedAnnualAppreciation: 8,
        expectedAnnualIncome: 25000,
        capitalGainAmount: 300000,
        deferralPeriodYears: 5,
        stepUpPercentage: 15,
        exitYear: 7,
        exitMultiple: 1.8,
        leveragePercentage: 60,
        interestRate: 6.5,
        includeTaxDeferral: true,
        includeStepUp: true,
        includeExclusion: false,
        riskAdjustedDiscountRate: 12
      };
      const errors = validateOpportunityZoneInputs(inputs);
      expect(errors).toContainEqual({
        field: 'holdingPeriodYears',
        message: 'Holding period must be greater than 0 years'
      });
    });

    it('should warn about short holding periods', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2024-01-01',
        holdingPeriodYears: 3,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 35,
        expectedAnnualAppreciation: 8,
        expectedAnnualIncome: 25000,
        capitalGainAmount: 300000,
        deferralPeriodYears: 5,
        stepUpPercentage: 15,
        exitYear: 7,
        exitMultiple: 1.8,
        leveragePercentage: 60,
        interestRate: 6.5,
        includeTaxDeferral: true,
        includeStepUp: true,
        includeExclusion: false,
        riskAdjustedDiscountRate: 12
      };
      const warnings = validateOpportunityZoneBusinessRules(inputs);
      expect(warnings).toContainEqual({
        field: 'holdingPeriodYears',
        message: 'Holding period less than 5 years will not qualify for step-up benefits'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(OpportunityZoneCalculator.examples).toHaveLength(2);

      const sevenYear = OpportunityZoneCalculator.examples[0];
      expect(sevenYear.title).toBe('7-Year Opportunity Zone Investment');
      expect(sevenYear.inputs.initialInvestment).toBe(500000);
      expect(sevenYear.inputs.holdingPeriodYears).toBe(7);
      expect(sevenYear.expectedOutputs.totalTaxSavings).toBe(135000);
    });
  });
});