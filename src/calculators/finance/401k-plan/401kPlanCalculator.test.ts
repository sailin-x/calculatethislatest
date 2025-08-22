import { describe, it, expect } from 'vitest';
import { calculate401kPlan } from './formulas';
import { generate401kPlanAnalysis } from './formulas';
import { FourZeroOneKPlanCalculator } from './401kPlanCalculator';

describe('401(k) Plan Calculator', () => {
  const mockInputs = {
    currentAge: 30,
    retirementAge: 65,
    currentSalary: 75000,
    current401kBalance: 25000,
    employeeContribution: 6,
    employerMatch: 3,
    employerMatchLimit: 6,
    planFees: 0.5,
    investmentFees: 0.8,
    salaryGrowthRate: 3,
    investmentReturn: 7,
    inflationRate: 2.5,
    contributionIncrease: 1,
    catchUpContribution: false,
    taxRate: 22,
    retirementTaxRate: 15,
    lifeExpectancy: 85,
    socialSecurityIncome: 25000,
    otherRetirementIncome: 10000,
    planType: 'traditional',
    rothPercentage: 0,
    loanBalance: 0,
    hardshipWithdrawals: 0,
    investmentAllocation: 'moderate',
    rebalanceFrequency: 'annually'
  };

  describe('calculate401kPlan', () => {
    it('should calculate basic 401(k) projections correctly', () => {
      const result = calculate401kPlan(mockInputs);

      expect(result.total401kBalance).toBeGreaterThan(mockInputs.current401kBalance);
      expect(result.totalContributions).toBeGreaterThan(0);
      expect(result.totalEmployerMatch).toBeGreaterThan(0);
      expect(result.totalFees).toBeGreaterThan(0);
      expect(result.monthlyRetirementIncome).toBeGreaterThan(0);
      expect(result.replacementRatio).toBeGreaterThan(0);
      expect(result.retirementScore).toBeGreaterThanOrEqual(0);
      expect(result.retirementScore).toBeLessThanOrEqual(100);
    });

    it('should handle Roth 401(k) calculations', () => {
      const rothInputs = {
        ...mockInputs,
        planType: 'roth',
        rothPercentage: 100
      };

      const result = calculate401kPlan(rothInputs);

      expect(result.rothBalance).toBeGreaterThan(0);
      expect(result.traditionalBalance).toBe(0);
      expect(result.rothTaxFreeIncome).toBeGreaterThan(0);
    });

    it('should handle split Traditional/Roth calculations', () => {
      const splitInputs = {
        ...mockInputs,
        planType: 'both',
        rothPercentage: 30
      };

      const result = calculate401kPlan(splitInputs);

      expect(result.rothBalance).toBeGreaterThan(0);
      expect(result.traditionalBalance).toBeGreaterThan(0);
      expect(result.rothTaxFreeIncome).toBeGreaterThan(0);
    });

    it('should calculate catch-up contributions correctly', () => {
      const catchUpInputs = {
        ...mockInputs,
        currentAge: 55,
        catchUpContribution: true
      };

      const result = calculate401kPlan(catchUpInputs);

      expect(result.catchUpAmount).toBe(7500);
      expect(result.maxContribution).toBe(30000); // 22500 + 7500
    });

    it('should handle high fee scenarios', () => {
      const highFeeInputs = {
        ...mockInputs,
        planFees: 2.0,
        investmentFees: 1.5
      };

      const result = calculate401kPlan(highFeeInputs);

      expect(result.totalFees).toBeGreaterThan(0);
      expect(result.feeEfficiencyScore).toBeLessThan(60);
      expect(result.feeImpact).toBeGreaterThan(0);
    });

    it('should calculate loan and hardship withdrawal impacts', () => {
      const loanInputs = {
        ...mockInputs,
        loanBalance: 10000,
        hardshipWithdrawals: 5000
      };

      const result = calculate401kPlan(loanInputs);

      expect(result.loanRepaymentImpact).toBeGreaterThan(0);
      expect(result.hardshipImpact).toBeGreaterThan(0);
    });

    it('should handle different investment allocations', () => {
      const aggressiveInputs = {
        ...mockInputs,
        investmentAllocation: 'aggressive'
      };

      const conservativeInputs = {
        ...mockInputs,
        investmentAllocation: 'conservative'
      };

      const aggressiveResult = calculate401kPlan(aggressiveInputs);
      const conservativeResult = calculate401kPlan(conservativeInputs);

      expect(aggressiveResult.investmentScore).toBeGreaterThan(conservativeResult.investmentScore);
    });

    it('should handle different rebalancing frequencies', () => {
      const quarterlyInputs = {
        ...mockInputs,
        rebalanceFrequency: 'quarterly'
      };

      const neverInputs = {
        ...mockInputs,
        rebalanceFrequency: 'never'
      };

      const quarterlyResult = calculate401kPlan(quarterlyInputs);
      const neverResult = calculate401kPlan(neverInputs);

      expect(quarterlyResult.investmentScore).toBeGreaterThan(neverResult.investmentScore);
      expect(quarterlyResult.rebalanceBenefit).toBeGreaterThan(neverResult.rebalanceBenefit);
    });
  });

  describe('generate401kPlanAnalysis', () => {
    it('should generate a comprehensive analysis report', () => {
      const result = calculate401kPlan(mockInputs);
      const report = generate401kPlanAnalysis(mockInputs, result);

      expect(report).toContain('401(k) Plan Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Next Steps');
    });

    it('should include specific values in the report', () => {
      const result = calculate401kPlan(mockInputs);
      const report = generate401kPlanAnalysis(mockInputs, result);

      expect(report).toContain(result.total401kBalance.toLocaleString());
      expect(report).toContain(result.monthlyRetirementIncome.toLocaleString());
      expect(report).toContain(result.replacementRatio.toFixed(1));
      expect(report).toContain(result.retirementScore.toFixed(0));
    });

    it('should provide appropriate recommendations based on contribution gap', () => {
      const lowContributionInputs = {
        ...mockInputs,
        employeeContribution: 2
      };

      const result = calculate401kPlan(lowContributionInputs);
      const report = generate401kPlanAnalysis(lowContributionInputs, result);

      expect(report).toContain('Increase Contributions');
      expect(report).toContain('unused contribution room');
    });

    it('should provide appropriate recommendations for fee efficiency', () => {
      const highFeeInputs = {
        ...mockInputs,
        planFees: 2.0,
        investmentFees: 1.5
      };

      const result = calculate401kPlan(highFeeInputs);
      const report = generate401kPlanAnalysis(highFeeInputs, result);

      expect(report).toContain('Fee Optimization');
      expect(report).toContain('lower-cost investment options');
    });
  });

  describe('Calculator Configuration', () => {
    it('should have correct calculator metadata', () => {
      expect(FourZeroOneKPlanCalculator.id).toBe('401k-plan-calculator');
      expect(FourZeroOneKPlanCalculator.name).toBe('401(k) Plan Calculator');
      expect(FourZeroOneKPlanCalculator.category).toBe('finance');
      expect(FourZeroOneKPlanCalculator.subcategory).toBe('retirement');
    });

    it('should have all required inputs', () => {
      const requiredInputs = [
        'currentAge', 'retirementAge', 'currentSalary', 'current401kBalance',
        'employeeContribution', 'employerMatch', 'employerMatchLimit',
        'planFees', 'investmentFees', 'salaryGrowthRate', 'investmentReturn',
        'inflationRate', 'contributionIncrease', 'catchUpContribution',
        'taxRate', 'retirementTaxRate', 'lifeExpectancy',
        'socialSecurityIncome', 'otherRetirementIncome', 'planType',
        'rothPercentage', 'loanBalance', 'hardshipWithdrawals',
        'investmentAllocation', 'rebalanceFrequency'
      ];

      requiredInputs.forEach(input => {
        expect(FourZeroOneKPlanCalculator.inputs).toHaveProperty(input);
      });
    });

    it('should have all required outputs', () => {
      const requiredOutputs = [
        'totalContributions', 'totalEmployerMatch', 'totalFees',
        'total401kBalance', 'annualContribution', 'annualEmployerMatch',
        'annualFees', 'taxSavings', 'totalTaxSavings',
        'monthlyRetirementIncome', 'annualRetirementIncome',
        'totalRetirementIncome', 'replacementRatio', 'yearsOfIncome',
        'maxContribution', 'catchUpAmount', 'contributionGap',
        'retirementScore', 'savingsScore', 'investmentScore',
        'feeEfficiencyScore', 'projectedValue', 'monthlyContribution',
        'employerMatchRate', 'totalGrowth', 'contributionEfficiency',
        'feeImpact', 'rothBalance', 'traditionalBalance',
        'rothTaxFreeIncome', 'loanRepaymentImpact', 'hardshipImpact',
        'rebalanceBenefit'
      ];

      requiredOutputs.forEach(output => {
        const outputObj = FourZeroOneKPlanCalculator.outputs.find(o => o.id === output);
        expect(outputObj).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof FourZeroOneKPlanCalculator.calculate).toBe('function');
      expect(typeof FourZeroOneKPlanCalculator.generateReport).toBe('function');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero contributions', () => {
      const zeroContributionInputs = {
        ...mockInputs,
        employeeContribution: 0,
        employerMatch: 0
      };

      const result = calculate401kPlan(zeroContributionInputs);

      expect(result.totalContributions).toBe(0);
      expect(result.totalEmployerMatch).toBe(0);
      expect(result.contributionGap).toBeGreaterThan(0);
      expect(result.savingsScore).toBe(0);
    });

    it('should handle maximum contributions', () => {
      const maxContributionInputs = {
        ...mockInputs,
        employeeContribution: 100,
        currentSalary: 100000
      };

      const result = calculate401kPlan(maxContributionInputs);

      expect(result.contributionGap).toBe(0);
      expect(result.contributionEfficiency).toBe(100);
    });

    it('should handle very high investment returns', () => {
      const highReturnInputs = {
        ...mockInputs,
        investmentReturn: 15
      };

      const result = calculate401kPlan(highReturnInputs);

      expect(result.total401kBalance).toBeGreaterThan(0);
      expect(result.totalGrowth).toBeGreaterThan(0);
    });

    it('should handle very low investment returns', () => {
      const lowReturnInputs = {
        ...mockInputs,
        investmentReturn: 1
      };

      const result = calculate401kPlan(lowReturnInputs);

      expect(result.total401kBalance).toBeGreaterThan(mockInputs.current401kBalance);
      expect(result.totalGrowth).toBeGreaterThan(0);
    });
  });
});
