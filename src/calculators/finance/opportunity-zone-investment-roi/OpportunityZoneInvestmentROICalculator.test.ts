import { describe, it, expect } from 'vitest';
import { calculateOpportunityZoneInvestmentROI, generateOpportunityZoneInvestmentROIAnalysis } from './formulas';
import { validateOpportunityZoneInvestmentROIInputs } from './validation';
import { quickValidateOpportunityZoneInvestmentROI } from './quickValidation';
import { OpportunityZoneInvestmentROIInputs } from './validation';

describe('Opportunity Zone Investment ROI Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = validateOpportunityZoneInvestmentROIInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000
        // Missing other required fields
      };

      const result = validateOpportunityZoneInvestmentROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject negative initial investment', () => {
      const inputs: Partial<OpportunityZoneInvestmentROIInputs> = {
        initialInvestment: -100000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = validateOpportunityZoneInvestmentROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Initial investment is required and must be greater than 0');
    });

    it('should reject capital gains exceeding initial investment', () => {
      const inputs: Partial<OpportunityZoneInvestmentROIInputs> = {
        initialInvestment: 500000,
        capitalGainsAmount: 600000, // Exceeds initial investment
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = validateOpportunityZoneInvestmentROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Capital gains amount cannot exceed initial investment');
    });

    it('should reject investment period less than 5 years', () => {
      const inputs: Partial<OpportunityZoneInvestmentROIInputs> = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 3, // Less than 5 years
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = validateOpportunityZoneInvestmentROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Investment period less than 5 years may not qualify for full Opportunity Zone benefits');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<OpportunityZoneInvestmentROIInputs> = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      expect(quickValidateOpportunityZoneInvestmentROI(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<OpportunityZoneInvestmentROIInputs> = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000
        // Missing other required fields
      };

      expect(quickValidateOpportunityZoneInvestmentROI(inputs)).toBe(false);
    });

    it('should fail quick validation with invalid investment period', () => {
      const inputs: Partial<OpportunityZoneInvestmentROIInputs> = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 3, // Less than 5 years
        annualReturn: 8.5,
        taxRate: 23.8
      };

      expect(quickValidateOpportunityZoneInvestmentROI(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate basic ROI correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.totalROI).toBeGreaterThan(0);
      expect(result.annualizedROI).toBeGreaterThan(0);
      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.taxBenefits.totalTaxSavings).toBeGreaterThan(0);
    });

    it('should calculate tax benefits correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        stateTaxRate: 5.0
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.deferredTaxSavings).toBeGreaterThan(0);
      expect(result.eliminatedTaxSavings).toBeGreaterThan(0); // 10+ year holding
      expect(result.basisStepUpSavings).toBeGreaterThan(0);
      expect(result.taxBenefits.totalTaxSavings).toBe(result.deferredTaxSavings + result.eliminatedTaxSavings + result.basisStepUpSavings);
    });

    it('should calculate investment growth correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.investmentGrowth.finalValue).toBeCloseTo(500000 * Math.pow(1.085, 10), 0);
      expect(result.investmentGrowth.totalGrowth).toBe(result.investmentGrowth.finalValue - 500000);
      expect(result.investmentGrowth.annualGrowth).toBe(result.investmentGrowth.totalGrowth / 10);
    });

    it('should calculate cash flow correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        annualIncome: 60000,
        operatingExpenses: 20000
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.cashFlowAnalysis.netOperatingIncome).toBe(40000); // 60000 - 20000
      expect(result.cashFlowAnalysis.annualCashFlow).toBeGreaterThan(0);
      expect(result.cashFlowAnalysis.totalCashFlow).toBe(result.cashFlowAnalysis.annualCashFlow * 10);
      expect(result.cashFlowAnalysis.cashOnCashReturn).toBe((result.cashFlowAnalysis.annualCashFlow / 500000) * 100);
    });

    it('should calculate exit analysis correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        exitStrategy: 'sale',
        exitValue: 1200000,
        exitCosts: 50000
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.exitAnalysis.exitValue).toBe(1200000);
      expect(result.exitAnalysis.netProceeds).toBe(1150000); // 1200000 - 50000
      expect(result.exitAnalysis.capitalGainsTax).toBe(0); // 10+ year holding eliminates tax
      expect(result.exitAnalysis.afterTaxProceeds).toBe(1150000);
    });
  });

  describe('Tax Benefits', () => {
    it('should calculate deferred tax savings correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        deferralPeriod: 7,
        alternativeInvestmentReturn: 6.0
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      const originalTaxLiability = 300000 * 0.238;
      const deferredTaxLiability = originalTaxLiability * Math.pow(1.06, 7);
      const expectedDeferredSavings = deferredTaxLiability - originalTaxLiability;
      
      expect(result.deferredTaxSavings).toBeCloseTo(expectedDeferredSavings, 0);
    });

    it('should calculate eliminated tax savings for 10+ year holding', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      const expectedEliminatedSavings = 300000 * 0.238; // Full elimination
      expect(result.eliminatedTaxSavings).toBeCloseTo(expectedEliminatedSavings, 0);
    });

    it('should calculate basis step-up savings correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        basisStepUp: 15
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      const expectedBasisStepUpSavings = 300000 * 0.15 * 0.238;
      expect(result.basisStepUpSavings).toBeCloseTo(expectedBasisStepUpSavings, 0);
    });

    it('should not eliminate taxes for holding period less than 10 years', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 7, // Less than 10 years
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.eliminatedTaxSavings).toBe(0);
    });
  });

  describe('Comparison Analysis', () => {
    it('should calculate advantage over alternative investment', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        alternativeInvestmentReturn: 6.0
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.comparisonAnalysis.alternativeReturn).toBe(6.0);
      expect(result.comparisonAnalysis.opportunityZoneAdvantage).toBeGreaterThan(0);
      expect(result.comparisonAnalysis.advantagePercentage).toBeGreaterThan(0);
    });

    it('should calculate breakeven years correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 10.0, // Higher than alternative
        taxRate: 23.8,
        alternativeInvestmentReturn: 6.0
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.comparisonAnalysis.breakevenYears).toBeGreaterThan(0);
      expect(result.comparisonAnalysis.breakevenYears).toBeLessThanOrEqual(10);
    });
  });

  describe('Risk Assessment', () => {
    it('should identify market risks for low returns', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 4.0, // Low return
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.riskAssessment.marketRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.marketRisks.some(risk => risk.includes('Low expected return'))).toBe(true);
    });

    it('should identify tax risks for short holding periods', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 7, // Less than 10 years
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.riskAssessment.taxRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.taxRisks.some(risk => risk.includes('10 years'))).toBe(true);
    });

    it('should identify compliance risks', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.riskAssessment.complianceRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.complianceRisks.some(risk => risk.includes('180 days'))).toBe(true);
      expect(result.riskAssessment.complianceRisks.some(risk => risk.includes('Opportunity Zone'))).toBe(true);
    });

    it('should assess overall risk level correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(['Low', 'Medium', 'High']).toContain(result.riskAssessment.overallRiskLevel);
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for 10+ year holding', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('10+ year'))).toBe(true);
    });

    it('should provide recommendations for high tax benefits', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 400000, // High capital gains
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('tax benefits'))).toBe(true);
    });

    it('should provide recommendations for high returns', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 12.0, // High return
        taxRate: 23.8,
        alternativeInvestmentReturn: 6.0
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('High return potential'))).toBe(true);
    });
  });

  describe('Compliance Checklist', () => {
    it('should provide comprehensive compliance checklist', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.complianceChecklist.length).toBeGreaterThan(0);
      expect(result.complianceChecklist.some(item => item.includes('180 days'))).toBe(true);
      expect(result.complianceChecklist.some(item => item.includes('Opportunity Zone'))).toBe(true);
      expect(result.complianceChecklist.some(item => item.includes('substantial improvement'))).toBe(true);
    });
  });

  describe('Timeline Analysis', () => {
    it('should calculate key dates correctly', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8,
        deferralPeriod: 7
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.timelineAnalysis.keyMilestones.length).toBeGreaterThan(0);
      expect(result.timelineAnalysis.keyMilestones.some(milestone => milestone.includes('Year 5'))).toBe(true);
      expect(result.timelineAnalysis.keyMilestones.some(milestone => milestone.includes('Year 7'))).toBe(true);
      expect(result.timelineAnalysis.keyMilestones.some(milestone => milestone.includes('Year 10'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      const analysis = generateOpportunityZoneInvestmentROIAnalysis(inputs, result);
      
      expect(analysis).toContain('Opportunity Zone Investment ROI Analysis');
      expect(analysis).toContain('Summary');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Tax Benefits Breakdown');
      expect(analysis).toContain('Investment Growth');
      expect(analysis).toContain('Cash Flow Analysis');
      expect(analysis).toContain('Exit Analysis');
      expect(analysis).toContain('Comparison Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Recommendations');
      expect(analysis).toContain('Compliance Checklist');
      expect(analysis).toContain('Timeline Analysis');
    });

    it('should include correct values in report', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      const analysis = generateOpportunityZoneInvestmentROIAnalysis(inputs, result);
      
      expect(analysis).toContain('$500,000'); // Initial Investment
      expect(analysis).toContain('$300,000'); // Capital Gains Amount
      expect(analysis).toContain('10 years'); // Investment Period
      expect(analysis).toContain('8.5%'); // Annual Return
      expect(analysis).toContain('23.8%'); // Tax Rate
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero capital gains', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 0,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.taxBenefits.totalTaxSavings).toBe(0);
      expect(result.totalROI).toBeGreaterThan(0); // Still has investment returns
    });

    it('should handle zero annual return', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 0,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.investmentGrowth.finalValue).toBe(500000);
      expect(result.investmentGrowth.totalGrowth).toBe(0);
    });

    it('should handle very high tax rates', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 10,
        annualReturn: 8.5,
        taxRate: 50.0
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.taxBenefits.totalTaxSavings).toBeGreaterThan(0);
      expect(result.riskAssessment.taxRisks.some(risk => risk.includes('High tax rate'))).toBe(true);
    });

    it('should handle very long investment periods', () => {
      const inputs: OpportunityZoneInvestmentROIInputs = {
        initialInvestment: 500000,
        capitalGainsAmount: 300000,
        investmentPeriod: 30,
        annualReturn: 8.5,
        taxRate: 23.8
      };

      const result = calculateOpportunityZoneInvestmentROI(inputs);
      
      expect(result.investmentGrowth.finalValue).toBeGreaterThan(5000000);
      expect(result.eliminatedTaxSavings).toBeGreaterThan(0);
    });
  });
});