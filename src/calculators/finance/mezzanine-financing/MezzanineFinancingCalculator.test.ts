import { describe, it, expect } from 'vitest';
import { calculateMezzanineFinancing } from './formulas';
import { validateMezzanineFinancingInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Mezzanine Financing for Real Estate Calculator', () => {
  describe('Core Calculations', () => {
    it('should calculate basic mezzanine financing structure correctly', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalCapitalization).toBe(10000000);
      expect(result.seniorLeverage).toBe(60);
      expect(result.mezzanineLeverage).toBe(20);
      expect(result.totalLeverage).toBe(80);
      expect(result.equityPercentage).toBe(20);
    });

    it('should calculate debt service correctly', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectedNOI: 800000
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.mezzanineCost).toBe(240000);
      expect(result.totalDebtService).toBe(630000);
      expect(result.debtServiceCoverage).toBe(1.27);
    });

    it('should calculate mezzanine yield correctly', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        originationFee: 2,
        exitFee: 1,
        warrantCoverage: 10,
        exitTimeline: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.mezzanineYield).toBeGreaterThan(12);
      expect(result.mezzanineYield).toBeLessThan(20);
    });

    it('should calculate IRR correctly', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectedNOI: 800000,
        projectedCapRate: 6.5,
        exitTimeline: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.sponsorIRR).toBeGreaterThan(0);
      expect(result.mezzanineIRR).toBeGreaterThan(0);
    });
  });

  describe('Leverage Calculations', () => {
    it('should handle conservative leverage structure', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 5000000,
        equityInvestment: 3000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalLeverage).toBe(70);
      expect(result.equityPercentage).toBe(30);
    });

    it('should handle aggressive leverage structure', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6500000,
        equityInvestment: 1500000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalLeverage).toBe(85);
      expect(result.equityPercentage).toBe(15);
    });

    it('should handle very high leverage structure', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 7000000,
        equityInvestment: 1000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalLeverage).toBe(90);
      expect(result.equityPercentage).toBe(10);
    });
  });

  describe('Risk Assessment', () => {
    it('should assess low risk for conservative structure', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 5000000,
        equityInvestment: 3000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectedNOI: 800000,
        sponsorTrackRecord: 'Top-Tier',
        marketCondition: 'Strong',
        location: 'Primary Market'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Low Risk');
      expect(result.feasibilityScore).toBeGreaterThan(80);
    });

    it('should assess moderate risk for standard structure', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectedNOI: 800000,
        sponsorTrackRecord: 'Experienced',
        marketCondition: 'Stable',
        location: 'Primary Market'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
      expect(result.feasibilityScore).toBeGreaterThan(70);
    });

    it('should assess higher risk for aggressive structure', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 7000000,
        equityInvestment: 1000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectedNOI: 800000,
        sponsorTrackRecord: 'First-Time',
        marketCondition: 'Weak',
        location: 'Tertiary Market'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Higher Risk');
      expect(result.feasibilityScore).toBeLessThan(70);
    });
  });

  describe('Project Stage Impact', () => {
    it('should handle pre-development projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectStage: 'Pre-Development',
        constructionRisk: 'High',
        preLeasing: 'None'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Higher Risk');
      expect(result.feasibilityScore).toBeLessThan(75);
    });

    it('should handle construction projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectStage: 'Construction',
        constructionRisk: 'Moderate',
        preLeasing: 'Partial'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
    });

    it('should handle stabilization projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        projectStage: 'Stabilization',
        constructionRisk: 'Low',
        preLeasing: 'Substantial'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Low Risk');
      expect(result.feasibilityScore).toBeGreaterThan(75);
    });
  });

  describe('Location Impact', () => {
    it('should handle primary market projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        location: 'Primary Market',
        marketRisk: 'Low'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.feasibilityScore).toBeGreaterThan(70);
    });

    it('should handle secondary market projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        location: 'Secondary Market',
        marketRisk: 'Moderate'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.feasibilityScore).toBeLessThan(75);
    });

    it('should handle tertiary market projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        location: 'Tertiary Market',
        marketRisk: 'High'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Higher Risk');
      expect(result.feasibilityScore).toBeLessThan(70);
    });
  });

  describe('Sponsor Track Record Impact', () => {
    it('should handle top-tier sponsors', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        sponsorTrackRecord: 'Top-Tier'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.feasibilityScore).toBeGreaterThan(80);
    });

    it('should handle first-time sponsors', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        sponsorTrackRecord: 'First-Time'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
      expect(result.feasibilityScore).toBeLessThan(75);
    });
  });

  describe('Market Condition Impact', () => {
    it('should handle strong market conditions', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        marketCondition: 'Strong'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.feasibilityScore).toBeGreaterThan(75);
    });

    it('should handle weak market conditions', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        marketCondition: 'Weak'
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Higher Risk');
      expect(result.feasibilityScore).toBeLessThan(70);
    });
  });

  describe('Pre-Leasing Impact', () => {
    it('should handle fully leased projects', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        preLeasing: 'Fully Leased',
        preLeasingPercentage: 100
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.feasibilityScore).toBeGreaterThan(80);
    });

    it('should handle projects with no pre-leasing', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        preLeasing: 'None',
        preLeasingPercentage: 0
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.riskAssessment).toBe('Moderate Risk');
      expect(result.feasibilityScore).toBeLessThan(75);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs = {
        projectValue: 0,
        seniorDebt: undefined,
        equityInvestment: 0,
        mezzanineAmount: undefined
      };
      
      const errors = validateMezzanineFinancingInputs(inputs as any);
      
      expect(errors).toContain('Project value is required');
      expect(errors).toContain('Senior debt amount is required');
      expect(errors).toContain('Equity investment is required');
      expect(errors).toContain('Mezzanine amount is required');
    });

    it('should validate leverage limits', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 8000000,
        equityInvestment: 1000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const errors = validateMezzanineFinancingInputs(inputs);
      
      expect(errors).toContain('Senior debt leverage should not exceed 75% of project value');
    });

    it('should validate interest rate relationships', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 6.0,
        mezzanineTerm: 5
      };
      
      const errors = validateMezzanineFinancingInputs(inputs);
      
      expect(errors).toContain('Mezzanine interest rate should be higher than senior debt interest rate');
    });

    it('should validate capital stack consistency', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 3000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const errors = validateMezzanineFinancingInputs(inputs);
      
      expect(errors).toContain('Total capitalization should equal project value (within $100,000 tolerance)');
    });
  });

  describe('Quick Validation', () => {
    it('should provide real-time validation for project value', () => {
      const results = quickValidateAllInputs({ projectValue: 500000 });
      
      const projectValueResult = results.find(r => r.message?.includes('Project value should be at least $1,000,000'));
      expect(projectValueResult?.severity).toBe('warning');
    });

    it('should provide real-time validation for leverage', () => {
      const results = quickValidateAllInputs({ 
        projectValue: 10000000,
        seniorDebt: 8000000,
        mezzanineAmount: 2000000 
      });
      
      const leverageResult = results.find(r => r.message?.includes('Senior debt should not exceed 75%'));
      expect(leverageResult?.severity).toBe('error');
    });

    it('should provide real-time validation for interest rates', () => {
      const results = quickValidateAllInputs({ 
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 6.0 
      });
      
      const rateResult = results.find(r => r.message?.includes('Mezzanine interest rate should be higher'));
      expect(rateResult?.severity).toBe('error');
    });

    it('should provide real-time validation for total leverage', () => {
      const results = quickValidateAllInputs({ 
        projectValue: 10000000,
        seniorDebt: 7000000,
        mezzanineAmount: 2500000 
      });
      
      const leverageResult = results.find(r => r.message?.includes('Total leverage should not exceed 90%'));
      expect(leverageResult?.severity).toBe('error');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum project values', () => {
      const inputs = {
        projectValue: 1000000,
        seniorDebt: 600000,
        equityInvestment: 200000,
        mezzanineAmount: 200000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalCapitalization).toBe(1000000);
      expect(result.totalLeverage).toBe(80);
    });

    it('should handle maximum project values', () => {
      const inputs = {
        projectValue: 100000000,
        seniorDebt: 60000000,
        equityInvestment: 20000000,
        mezzanineAmount: 20000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalCapitalization).toBe(100000000);
      expect(result.totalLeverage).toBe(80);
    });

    it('should handle missing optional fields', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalCapitalization).toBe(10000000);
      expect(result.riskAssessment).toBe('Moderate Risk');
    });
  });

  describe('Integration Tests', () => {
    it('should provide complete analysis for residential development', () => {
      const inputs = {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        originationFee: 2,
        exitFee: 1,
        warrantCoverage: 10,
        projectType: 'Residential Development',
        projectStage: 'Construction',
        location: 'Primary Market',
        sponsorTrackRecord: 'Experienced',
        marketCondition: 'Strong',
        preLeasing: 'None',
        preLeasingPercentage: 0,
        constructionRisk: 'Moderate',
        marketRisk: 'Low',
        exitStrategy: 'Sale',
        exitTimeline: 5,
        projectedNOI: 800000,
        projectedCapRate: 6.5
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalCapitalization).toBe(10000000);
      expect(result.seniorLeverage).toBe(60);
      expect(result.mezzanineLeverage).toBe(20);
      expect(result.totalLeverage).toBe(80);
      expect(result.equityPercentage).toBe(20);
      expect(result.mezzanineCost).toBe(240000);
      expect(result.totalDebtService).toBe(630000);
      expect(result.debtServiceCoverage).toBe(1.27);
      expect(result.mezzanineYield).toBeGreaterThan(12);
      expect(result.sponsorIRR).toBeGreaterThan(0);
      expect(result.mezzanineIRR).toBeGreaterThan(0);
      expect(result.riskAssessment).toBe('Moderate Risk');
      expect(result.feasibilityScore).toBeGreaterThan(70);
      expect(result.recommendations).toBeTruthy();
      expect(result.mezzanineAnalysis).toBeTruthy();
    });

    it('should provide complete analysis for commercial office development', () => {
      const inputs = {
        projectValue: 25000000,
        seniorDebt: 15000000,
        equityInvestment: 5000000,
        mezzanineAmount: 5000000,
        seniorInterestRate: 7.2,
        mezzanineInterestRate: 14,
        mezzanineTerm: 7,
        originationFee: 2.5,
        exitFee: 1.5,
        warrantCoverage: 15,
        projectType: 'Office',
        projectStage: 'Pre-Development',
        location: 'Secondary Market',
        sponsorTrackRecord: 'Institutional',
        marketCondition: 'Stable',
        preLeasing: 'Partial',
        preLeasingPercentage: 30,
        constructionRisk: 'High',
        marketRisk: 'Moderate',
        exitStrategy: 'Refinance',
        exitTimeline: 7,
        projectedNOI: 2000000,
        projectedCapRate: 7.2
      };
      
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.totalCapitalization).toBe(25000000);
      expect(result.seniorLeverage).toBe(60);
      expect(result.mezzanineLeverage).toBe(20);
      expect(result.totalLeverage).toBe(80);
      expect(result.equityPercentage).toBe(20);
      expect(result.mezzanineCost).toBe(700000);
      expect(result.totalDebtService).toBe(1780000);
      expect(result.debtServiceCoverage).toBe(1.12);
      expect(result.mezzanineYield).toBeGreaterThan(15);
      expect(result.riskAssessment).toBe('Higher Risk');
      expect(result.feasibilityScore).toBeLessThan(75);
    });
  });
});