import { calculateInterestOnlyMortgage } from './formulas';
import { validateInterestOnlyMortgageInputs } from './validation';
import { InterestOnlyMortgageInputs } from './types';

describe('InterestOnlyMortgageCalculator', () => {
  const mockInputs: InterestOnlyMortgageInputs = {
    loanAmount: 400000,
    interestRate: 0.065,
    interestOnlyPeriod: 10,
    totalLoanTerm: 30,
    loanType: 'fixed',
    propertyValue: 500000,
    propertyAddress: '123 Main St, City, State 12345',
    propertyType: 'primary_residence',
    creditScore: 'good',
    debtToIncomeRatio: 0.35,
    downPayment: 100000,
    loanToValueRatio: 0.8,
    interestOnlyPayment: 2167,
    principalAndInterestPayment: 2528,
    totalMonthlyPayment: 3200,
    propertyTaxes: 6000,
    homeownersInsurance: 1200,
    privateMortgageInsurance: 0,
    hoaFees: 2400,
    otherMonthlyExpenses: 0,
    refinanceAfterInterestOnly: false,
    refinanceRate: 0.055,
    refinanceTerm: 30,
    expectedPropertyAppreciation: 0.03,
    rentalIncome: 0,
    taxDeductionBenefit: 5000,
    opportunityCost: 0.08
  };

  describe('calculateInterestOnlyMortgage', () => {
    it('should calculate basic payment metrics', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.interestOnlyPayment).toBeGreaterThan(0);
      expect(result.principalAndInterestPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(0);
      expect(result.totalAnnualPayment).toBeGreaterThan(0);
    });

    it('should calculate interest-only period analysis', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.interestOnlyPeriodPayments).toBeGreaterThan(0);
      expect(result.totalInterestPaidDuringIO).toBeGreaterThan(0);
      expect(result.remainingBalanceAfterIO).toBe(mockInputs.loanAmount);
    });

    it('should calculate full loan analysis', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.totalPrincipalPaid).toBe(mockInputs.loanAmount);
      expect(result.totalPayments).toBeGreaterThan(0);
      expect(result.loanPayoffDate).toBeDefined();
    });

    it('should generate payment schedule', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(Array.isArray(result.paymentSchedule)).toBe(true);
      expect(result.paymentSchedule.length).toBeGreaterThan(0);
      
      const firstPayment = result.paymentSchedule[0];
      expect(firstPayment.paymentNumber).toBe(1);
      expect(firstPayment.interestPayment).toBeGreaterThan(0);
      expect(firstPayment.principalPayment).toBe(0); // First payment should be interest-only
      expect(firstPayment.remainingBalance).toBe(mockInputs.loanAmount);
    });

    it('should provide traditional mortgage comparison', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.traditionalMortgageComparison).toBeDefined();
      expect(result.traditionalMortgageComparison.traditionalPayment).toBeGreaterThan(0);
      expect(result.traditionalMortgageComparison.interestOnlyPayment).toBeGreaterThan(0);
      expect(result.traditionalMortgageComparison.paymentDifference).toBeGreaterThan(0);
      expect(result.traditionalMortgageComparison.totalInterestDifference).toBeGreaterThan(0);
      expect(result.traditionalMortgageComparison.breakEvenPoint).toBeGreaterThan(0);
    });

    it('should calculate investment analysis', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.investmentAnalysis).toBeDefined();
      expect(result.investmentAnalysis.monthlySavings).toBeGreaterThan(0);
      expect(result.investmentAnalysis.annualSavings).toBeGreaterThan(0);
      expect(result.investmentAnalysis.totalSavingsOverIO).toBeGreaterThan(0);
      expect(result.investmentAnalysis.potentialInvestmentReturn).toBeGreaterThan(0);
      expect(result.investmentAnalysis.netBenefit).toBeDefined();
    });

    it('should assess risks', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(Array.isArray(result.riskFactors)).toBe(true);
      expect(Array.isArray(result.riskMitigationStrategies)).toBe(true);
      expect(result.riskFactors.length).toBeGreaterThan(0);
      expect(result.riskMitigationStrategies.length).toBeGreaterThan(0);
    });

    it('should provide refinancing analysis', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.refinancingAnalysis).toBeDefined();
      expect(result.refinancingAnalysis.shouldRefinance).toBeDefined();
      expect(result.refinancingAnalysis.refinancePayment).toBeGreaterThanOrEqual(0);
      expect(result.refinancingAnalysis.paymentReduction).toBeGreaterThanOrEqual(0);
      expect(result.refinancingAnalysis.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.refinancingAnalysis.totalSavings).toBeGreaterThanOrEqual(0);
    });

    it('should calculate tax implications', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.taxImplications).toBeDefined();
      expect(result.taxImplications.annualInterestDeduction).toBeGreaterThan(0);
      expect(result.taxImplications.estimatedTaxSavings).toBeGreaterThan(0);
      expect(result.taxImplications.netAfterTaxCost).toBeGreaterThan(0);
    });

    it('should generate recommendations', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.suitability).toBeDefined();
      expect(Array.isArray(result.recommendations.keyRecommendations)).toBe(true);
      expect(Array.isArray(result.recommendations.riskWarnings)).toBe(true);
      expect(Array.isArray(result.recommendations.optimizationTips)).toBe(true);
    });

    it('should provide summary', () => {
      const result = calculateInterestOnlyMortgage(mockInputs);
      
      expect(result.summary).toBeDefined();
      expect(result.summary.totalLoanCost).toBeGreaterThan(0);
      expect(result.summary.monthlyPayment).toBeGreaterThan(0);
      expect(Array.isArray(result.summary.keyBenefits)).toBe(true);
      expect(Array.isArray(result.summary.keyRisks)).toBe(true);
      expect(Array.isArray(result.summary.nextSteps)).toBe(true);
    });
  });

  describe('validateInterestOnlyMortgageInputs', () => {
    it('should validate valid inputs', () => {
      const result = validateInterestOnlyMortgageInputs(mockInputs);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid loan amount', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 10000 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $50,000');
    });

    it('should catch invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: 0.6 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 50%');
    });

    it('should catch invalid interest-only period', () => {
      const invalidInputs = { ...mockInputs, interestOnlyPeriod: 0 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest-only period must be at least 1 year');
    });

    it('should catch invalid total loan term', () => {
      const invalidInputs = { ...mockInputs, totalLoanTerm: 5 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total loan term must be greater than interest-only period');
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 50000 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $100,000');
    });

    it('should catch invalid property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '123' };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid debt-to-income ratio', () => {
      const invalidInputs = { ...mockInputs, debtToIncomeRatio: 1.5 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Debt-to-income ratio must be between 0% and 100%');
    });

    it('should catch invalid loan-to-value ratio', () => {
      const invalidInputs = { ...mockInputs, loanToValueRatio: 1.2 };
      const result = validateInterestOnlyMortgageInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan-to-value ratio must be between 0% and 100%');
    });

    it('should provide warnings for high-risk scenarios', () => {
      const highRiskInputs = { 
        ...mockInputs, 
        interestOnlyPeriod: 15,
        debtToIncomeRatio: 0.5,
        loanToValueRatio: 0.9,
        creditScore: 'poor' as const,
        loanType: 'adjustable' as const
      };
      const result = validateInterestOnlyMortgageInputs(highRiskInputs);
      
      expect(result.warnings).toContain('Interest-only period over 10 years increases payment shock risk');
      expect(result.warnings).toContain('Debt-to-income ratio above 40% may limit borrowing capacity');
      expect(result.warnings).toContain('Loan-to-value ratio above 80% may require PMI');
      expect(result.warnings).toContain('Lower credit score may result in higher interest rates');
      expect(result.warnings).toContain('Adjustable rate mortgages carry interest rate risk');
      expect(result.warnings).toContain('Interest-only period is more than half of total loan term');
    });
  });
});
