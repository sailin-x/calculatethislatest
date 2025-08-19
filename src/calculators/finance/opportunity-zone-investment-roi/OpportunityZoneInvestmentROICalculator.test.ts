import { describe, it, expect } from 'vitest';
import { calculateOpportunityZoneROI, calculateYearsBetween, calculatePresentValue, calculateFutureValue } from './formulas';
import { validateOpportunityZoneInvestmentInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { opportunityZoneInvestmentROICalculator } from './OpportunityZoneInvestmentROICalculator';

describe('Opportunity Zone Investment ROI Calculator', () => {
  describe('calculateOpportunityZoneROI', () => {
    it('should calculate ROI correctly with basic inputs', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const result = calculateOpportunityZoneROI(inputs);

      expect(result.totalInvestment).toBe(500000);
      expect(result.annualCashFlow).toBe(30000); // 48000 - 18000
      expect(result.totalCashFlow).toBe(300000); // 30000 * 10
      expect(result.propertyValueAtExit).toBeGreaterThan(600000);
      expect(result.totalReturn).toBeGreaterThan(300000);
      expect(result.totalROI).toBeGreaterThan(0);
      expect(result.annualizedROI).toBeGreaterThan(0);
      expect(result.taxDeferralBenefit).toBeGreaterThan(0);
      expect(result.taxExclusionBenefit).toBeGreaterThan(0);
      expect(result.totalTaxBenefits).toBeGreaterThan(0);
      expect(result.afterTaxReturn).toBeGreaterThan(result.totalReturn);
      expect(result.afterTaxROI).toBeGreaterThan(result.totalROI);
      expect(result.analysis).toContain('Opportunity Zone Investment Analysis');
    });

    it('should calculate ROI with all optional inputs', () => {
      const inputs = {
        initialInvestment: 750000,
        investmentDate: '2023-06-01',
        propertyValue: 900000,
        annualRentalIncome: 72000,
        annualOperatingExpenses: 27000,
        annualAppreciation: 4.0,
        holdingPeriod: 15,
        originalCapitalGain: 150000,
        originalGainDate: '2023-05-01',
        taxBracket: 32,
        stateTaxRate: 7.0,
        exitStrategy: 'hold' as const,
        managementFees: 6.0,
        financingCosts: 20000,
        renovationCosts: 75000,
        inflationRate: 2.0
      };

      const result = calculateOpportunityZoneROI(inputs);

      expect(result.totalInvestment).toBe(845000); // 750000 + 20000 + 75000
      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.propertyValueAtExit).toBeGreaterThan(900000);
      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.totalROI).toBeGreaterThan(0);
      expect(result.annualizedROI).toBeGreaterThan(0);
      expect(result.taxDeferralBenefit).toBeGreaterThan(0);
      expect(result.taxExclusionBenefit).toBeGreaterThan(0);
      expect(result.totalTaxBenefits).toBeGreaterThan(0);
      expect(result.afterTaxReturn).toBeGreaterThan(result.totalReturn);
      expect(result.afterTaxROI).toBeGreaterThan(result.totalROI);
    });

    it('should handle zero rental income', () => {
      const inputs = {
        initialInvestment: 300000,
        investmentDate: '2023-03-01',
        propertyValue: 400000,
        annualRentalIncome: 0,
        annualOperatingExpenses: 0,
        annualAppreciation: 5.0,
        holdingPeriod: 5,
        originalCapitalGain: 75000,
        originalGainDate: '2023-02-01',
        taxBracket: 22,
        exitStrategy: 'sale' as const
      };

      const result = calculateOpportunityZoneROI(inputs);

      expect(result.annualCashFlow).toBe(0);
      expect(result.totalCashFlow).toBe(0);
      expect(result.totalReturn).toBeGreaterThan(0); // Only appreciation
      expect(result.totalROI).toBeGreaterThan(0);
    });

    it('should handle negative appreciation', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: -2.0,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const result = calculateOpportunityZoneROI(inputs);

      expect(result.propertyValueAtExit).toBeLessThan(600000);
      expect(result.totalReturn).toBeGreaterThan(0); // Still positive due to cash flow
      expect(result.totalROI).toBeGreaterThan(0);
    });
  });

  describe('Additional calculation functions', () => {
    it('should calculate years between dates', () => {
      const result = calculateYearsBetween('2020-01-01', '2023-01-01');
      expect(result).toBeCloseTo(3, 1);
    });

    it('should calculate present value', () => {
      const result = calculatePresentValue(1000, 0.05, 10);
      expect(result).toBeCloseTo(613.91, 1);
    });

    it('should calculate future value', () => {
      const result = calculateFutureValue(1000, 0.05, 10);
      expect(result).toBeCloseTo(1628.89, 1);
    });
  });

  describe('validateOpportunityZoneInvestmentInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        initialInvestment: undefined,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const errors = validateOpportunityZoneInvestmentInputs(inputs);
      expect(errors).toContain('Initial Investment Amount is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 50, // Invalid: > 30%
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const errors = validateOpportunityZoneInvestmentInputs(inputs);
      expect(errors).toContain('Annual Appreciation Rate must be between -20% and 30%');
    });

    it('should validate business logic', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2022-01-15', // Before original gain date
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const errors = validateOpportunityZoneInvestmentInputs(inputs);
      expect(errors).toContain('Investment Date must be after Original Gain Date');
    });

    it('should validate 180-day rule', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2024-01-15', // More than 180 days after gain
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2023-01-01',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const errors = validateOpportunityZoneInvestmentInputs(inputs);
      expect(errors).toContain('Investment must be made within 180 days of capital gain realization for Opportunity Zone benefits');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale' as const
      };

      const errors = validateOpportunityZoneInvestmentInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        initialInvestment: 500000,
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale'
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(16); // All input fields
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        initialInvestment: -1000, // Invalid
        investmentDate: '2023-01-15',
        propertyValue: 600000,
        annualRentalIncome: 48000,
        annualOperatingExpenses: 18000,
        annualAppreciation: 3.5,
        holdingPeriod: 10,
        originalCapitalGain: 100000,
        originalGainDate: '2022-12-15',
        taxBracket: 24,
        exitStrategy: 'sale'
      };

      const results = quickValidateAllInputs(inputs);
      const initialInvestmentResult = results[0];
      expect(initialInvestmentResult.isValid).toBe(false);
      expect(initialInvestmentResult.message).toContain('must be positive');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(opportunityZoneInvestmentROICalculator.id).toBe('opportunity-zone-investment-roi');
      expect(opportunityZoneInvestmentROICalculator.title).toBe('Opportunity Zone Investment ROI Calculator');
      expect(opportunityZoneInvestmentROICalculator.category).toBe('finance');
      expect(opportunityZoneInvestmentROICalculator.subcategory).toBe('real-estate');
      expect(opportunityZoneInvestmentROICalculator.inputs).toHaveLength(16);
      expect(opportunityZoneInvestmentROICalculator.outputs).toHaveLength(13);
      expect(opportunityZoneInvestmentROICalculator.formulas).toHaveLength(1);
      expect(opportunityZoneInvestmentROICalculator.validationRules).toBeDefined();
      expect(opportunityZoneInvestmentROICalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = opportunityZoneInvestmentROICalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(11); // All required fields
    });

    it('should have correct output structure', () => {
      const outputs = opportunityZoneInvestmentROICalculator.outputs;
      expect(outputs.find(o => o.id === 'totalInvestment')).toBeDefined();
      expect(outputs.find(o => o.id === 'annualCashFlow')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalCashFlow')).toBeDefined();
      expect(outputs.find(o => o.id === 'propertyValueAtExit')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalROI')).toBeDefined();
      expect(outputs.find(o => o.id === 'annualizedROI')).toBeDefined();
      expect(outputs.find(o => o.id === 'taxDeferralBenefit')).toBeDefined();
      expect(outputs.find(o => o.id === 'taxExclusionBenefit')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalTaxBenefits')).toBeDefined();
      expect(outputs.find(o => o.id === 'afterTaxReturn')).toBeDefined();
      expect(outputs.find(o => o.id === 'afterTaxROI')).toBeDefined();
      expect(outputs.find(o => o.id === 'analysis')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = opportunityZoneInvestmentROICalculator.examples[0];
      const result = calculateOpportunityZoneROI(example.inputs);

      expect(result.totalInvestment).toBeGreaterThan(0);
      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.propertyValueAtExit).toBeGreaterThan(0);
      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.totalROI).toBeGreaterThan(0);
      expect(result.annualizedROI).toBeGreaterThan(0);
      expect(result.taxDeferralBenefit).toBeGreaterThan(0);
      expect(result.taxExclusionBenefit).toBeGreaterThan(0);
      expect(result.totalTaxBenefits).toBeGreaterThan(0);
      expect(result.afterTaxReturn).toBeGreaterThan(0);
      expect(result.afterTaxROI).toBeGreaterThan(0);
      expect(result.analysis).toContain('Opportunity Zone Investment Analysis');
    });

    it('should validate calculator examples', () => {
      opportunityZoneInvestmentROICalculator.examples.forEach(example => {
        const errors = validateOpportunityZoneInvestmentInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      opportunityZoneInvestmentROICalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});