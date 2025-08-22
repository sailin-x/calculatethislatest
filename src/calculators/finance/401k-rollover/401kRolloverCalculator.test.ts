import { describe, it, expect } from 'vitest';
import { calculate401kRollover } from './formulas';
import { generate401kRolloverAnalysis } from './formulas';
import { validateAllFourZeroOneKRolloverInputs } from './quickValidation';

describe('401(k) Rollover Calculator', () => {
  const baseInputs = {
    current401kBalance: 100000,
    currentAge: 35,
    retirementAge: 65,
    currentTaxRate: 25,
    retirementTaxRate: 20,
    rolloverType: 'traditional-ira',
    currentPlanFees: 1.2,
    newPlanFees: 0.5,
    currentInvestmentOptions: 'good',
    newInvestmentOptions: 'excellent',
    expectedReturn: 7,
    yearsToRetirement: 30,
    rolloverFees: 0,
    earlyWithdrawalPenalty: false,
    employerMatch: 3,
    employerMatchLimit: 6,
    annualContribution: 19500,
    stateTaxRate: 5,
    netUnrealizedAppreciation: 0,
    hasAfterTaxContributions: false,
    afterTaxAmount: 0,
    hasRoth401k: false,
    roth401kAmount: 0,
    hasOutstandingLoan: false,
    loanBalance: 0,
    loanRepaymentPeriod: 0
  };

  describe('Basic Rollover Analysis', () => {
    it('should calculate traditional IRA rollover correctly', () => {
      const inputs = { ...baseInputs, rolloverType: 'traditional-ira' };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.rolloverRecommendation).toBeDefined();
      expect(outputs.rolloverScore).toBeGreaterThan(0);
      expect(outputs.rolloverScore).toBeLessThanOrEqual(100);
      expect(outputs.feeSavings).toBeGreaterThan(0);
      expect(outputs.taxImpact).toBe(0); // Traditional IRA has no immediate tax impact
      expect(outputs.projectedValueDifference).toBeDefined();
      expect(outputs.breakEvenYears).toBeDefined();
    });

    it('should calculate Roth IRA conversion correctly', () => {
      const inputs = { ...baseInputs, rolloverType: 'roth-ira' };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.taxImpact).toBeGreaterThan(0); // Roth conversion has tax impact
      expect(outputs.conversionTax).toBeGreaterThan(0);
      expect(outputs.rolloverRecommendation).toBeDefined();
    });

    it('should calculate new 401(k) rollover correctly', () => {
      const inputs = { ...baseInputs, rolloverType: 'new-401k' };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.taxImpact).toBe(0); // New 401(k) has no immediate tax impact
      expect(outputs.rolloverRecommendation).toBeDefined();
    });
  });

  describe('Fee Analysis', () => {
    it('should calculate fee savings when new plan has lower fees', () => {
      const inputs = { ...baseInputs, currentPlanFees: 1.5, newPlanFees: 0.3 };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.feeSavings).toBeGreaterThan(0);
      expect(outputs.totalFeeSavings).toBeGreaterThan(outputs.feeSavings);
      expect(outputs.feeEfficiencyScore).toBeGreaterThan(50);
    });

    it('should handle higher fees in new plan', () => {
      const inputs = { ...baseInputs, currentPlanFees: 0.5, newPlanFees: 1.2 };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.feeSavings).toBeLessThan(0);
      expect(outputs.feeEfficiencyScore).toBe(0);
    });
  });

  describe('Tax Impact Analysis', () => {
    it('should calculate Roth conversion tax correctly', () => {
      const inputs = { ...baseInputs, rolloverType: 'roth-ira', currentTaxRate: 30, stateTaxRate: 5 };
      const outputs = calculate401kRollover(inputs);

      const expectedTax = (inputs.current401kBalance - inputs.afterTaxAmount - inputs.roth401kAmount) * 0.35;
      expect(outputs.taxImpact).toBeCloseTo(expectedTax, -2);
    });

    it('should handle after-tax contributions in Roth conversion', () => {
      const inputs = { 
        ...baseInputs, 
        rolloverType: 'roth-ira', 
        hasAfterTaxContributions: true, 
        afterTaxAmount: 20000 
      };
      const outputs = calculate401kRollover(inputs);

      const taxableAmount = inputs.current401kBalance - inputs.afterTaxAmount;
      const expectedTax = taxableAmount * (inputs.currentTaxRate + inputs.stateTaxRate) / 100;
      expect(outputs.taxImpact).toBeCloseTo(expectedTax, -2);
    });
  });

  describe('Investment Options Analysis', () => {
    it('should score improvement in investment options', () => {
      const inputs = { ...baseInputs, currentInvestmentOptions: 'poor', newInvestmentOptions: 'excellent' };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.investmentOptionsScore).toBeGreaterThan(50);
    });

    it('should handle no improvement in investment options', () => {
      const inputs = { ...baseInputs, currentInvestmentOptions: 'excellent', newInvestmentOptions: 'good' };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.investmentOptionsScore).toBe(0);
    });
  });

  describe('Loan Impact Analysis', () => {
    it('should calculate loan repayment impact', () => {
      const inputs = { 
        ...baseInputs, 
        hasOutstandingLoan: true, 
        loanBalance: 25000, 
        loanRepaymentPeriod: 24 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.loanRepaymentImpact).toBeDefined();
      expect(outputs.administrativeComplexity).toBe('High');
    });

    it('should handle no outstanding loan', () => {
      const inputs = { ...baseInputs, hasOutstandingLoan: false };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.loanRepaymentImpact).toBe(0);
      expect(outputs.administrativeComplexity).toBe('Low');
    });
  });

  describe('Roth 401(k) Analysis', () => {
    it('should handle Roth 401(k) amounts', () => {
      const inputs = { 
        ...baseInputs, 
        hasRoth401k: true, 
        roth401kAmount: 15000 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.rothRolloverValue).toBeGreaterThan(inputs.roth401kAmount);
    });
  });

  describe('After-tax Contributions Analysis', () => {
    it('should handle after-tax contributions', () => {
      const inputs = { 
        ...baseInputs, 
        hasAfterTaxContributions: true, 
        afterTaxAmount: 10000 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.afterTaxRolloverValue).toBeGreaterThan(inputs.afterTaxAmount);
    });
  });

  describe('Break-even Analysis', () => {
    it('should calculate break-even years correctly', () => {
      const inputs = { 
        ...baseInputs, 
        rolloverFees: 500, 
        currentPlanFees: 1.5, 
        newPlanFees: 0.5 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.breakEvenYears).toBeGreaterThan(0);
      expect(outputs.breakEvenYears).toBeLessThan(20);
    });

    it('should handle high rollover costs', () => {
      const inputs = { 
        ...baseInputs, 
        rolloverFees: 5000, 
        currentPlanFees: 1.0, 
        newPlanFees: 0.8 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.breakEvenYears).toBeGreaterThan(5);
    });
  });

  describe('Risk Assessment', () => {
    it('should assess risk for Roth conversion', () => {
      const inputs = { ...baseInputs, rolloverType: 'roth-ira' };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.riskAssessment).toBeDefined();
      expect(['Low', 'Medium', 'High']).toContain(outputs.riskAssessment);
    });

    it('should assess risk for long-term planning', () => {
      const inputs = { ...baseInputs, yearsToRetirement: 35 };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.riskAssessment).toBeDefined();
    });
  });

  describe('Timeline Recommendations', () => {
    it('should recommend immediate rollover for quick break-even', () => {
      const inputs = { 
        ...baseInputs, 
        rolloverFees: 100, 
        currentPlanFees: 1.5, 
        newPlanFees: 0.3 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.timelineRecommendation).toContain('immediately');
    });

    it('should recommend loan repayment first', () => {
      const inputs = { 
        ...baseInputs, 
        hasOutstandingLoan: true, 
        loanBalance: 30000 
      };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.timelineRecommendation).toContain('loan repayment');
    });
  });

  describe('Financial Metrics', () => {
    it('should calculate cost-benefit ratio', () => {
      const inputs = { ...baseInputs };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.costBenefitRatio).toBeGreaterThan(0);
      expect(outputs.netPresentValue).toBeDefined();
    });

    it('should perform sensitivity analysis', () => {
      const inputs = { ...baseInputs };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.sensitivityAnalysis).toBeDefined();
      expect(outputs.sensitivityAnalysis).toContain('Higher Returns');
      expect(outputs.sensitivityAnalysis).toContain('Lower Returns');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = { ...baseInputs };
      const outputs = calculate401kRollover(inputs);
      const report = generate401kRolloverAnalysis(inputs, outputs);

      expect(report).toContain('401(k) Rollover Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Financial Impact');
      expect(report).toContain('Fee Analysis');
      expect(report).toContain('Tax Impact');
      expect(report).toContain('Component Scores');
      expect(report).toContain('Risk & Complexity Assessment');
      expect(report).toContain('Detailed Recommendations');
      expect(report).toContain('Next Steps');
      expect(report).toContain('Sensitivity Analysis');
    });

    it('should include rollover recommendation in report', () => {
      const inputs = { ...baseInputs };
      const outputs = calculate401kRollover(inputs);
      const report = generate401kRolloverAnalysis(inputs, outputs);

      expect(report).toContain(outputs.rolloverRecommendation);
      expect(report).toContain(outputs.rolloverScore.toString());
    });
  });

  describe('Validation', () => {
    it('should validate all inputs correctly', () => {
      const validationResult = validateAllFourZeroOneKRolloverInputs(baseInputs);
      expect(validationResult.isValid).toBe(true);
    });

    it('should reject invalid current age', () => {
      const invalidInputs = { ...baseInputs, currentAge: 15 };
      const validationResult = validateAllFourZeroOneKRolloverInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Current age');
    });

    it('should reject retirement age less than current age', () => {
      const invalidInputs = { ...baseInputs, currentAge: 50, retirementAge: 45 };
      const validationResult = validateAllFourZeroOneKRolloverInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Retirement age');
    });

    it('should reject invalid rollover type', () => {
      const invalidInputs = { ...baseInputs, rolloverType: 'invalid-type' };
      const validationResult = validateAllFourZeroOneKRolloverInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Rollover type');
    });

    it('should reject negative fees', () => {
      const invalidInputs = { ...baseInputs, currentPlanFees: -1 };
      const validationResult = validateAllFourZeroOneKRolloverInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Current plan fees');
    });

    it('should reject after-tax amount exceeding balance', () => {
      const invalidInputs = { 
        ...baseInputs, 
        hasAfterTaxContributions: true, 
        afterTaxAmount: 150000 
      };
      const validationResult = validateAllFourZeroOneKRolloverInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('After-tax amount');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero balance', () => {
      const inputs = { ...baseInputs, current401kBalance: 0 };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.feeSavings).toBe(0);
      expect(outputs.taxImpact).toBe(0);
      expect(outputs.projectedValueDifference).toBeDefined();
    });

    it('should handle very high fees', () => {
      const inputs = { ...baseInputs, currentPlanFees: 4.5, newPlanFees: 0.1 };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.feeEfficiencyScore).toBe(100);
      expect(outputs.feeSavings).toBeGreaterThan(0);
    });

    it('should handle very low expected returns', () => {
      const inputs = { ...baseInputs, expectedReturn: -5 };
      const outputs = calculate401kRollover(inputs);

      expect(outputs.projectedValueDifference).toBeDefined();
      expect(outputs.breakEvenYears).toBeDefined();
    });
  });
});
