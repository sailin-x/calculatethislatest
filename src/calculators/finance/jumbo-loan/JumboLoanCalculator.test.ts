import { calculateJumboLoan } from './formulas';
import { validateJumboLoanInputs } from './validation';
import { JumboLoanInputs } from './types';

describe('JumboLoanCalculator', () => {
  const mockInputs: JumboLoanInputs = {
    loanAmount: 800000,
    interestRate: 0.065,
    loanTerm: 30,
    loanType: 'fixed',
    downPayment: 200000,
    loanToValueRatio: 0.8,
    propertyValue: 1000000,
    propertyAddress: '123 Main St, City, State 12345',
    propertyType: 'primary_residence',
    propertyState: 'CA',
    propertyCounty: 'Los Angeles',
    creditScore: 'good',
    debtToIncomeRatio: 0.35,
    annualIncome: 200000,
    employmentType: 'w2',
    employmentLength: 5,
    liquidAssets: 100000,
    reserves: 12,
    otherProperties: 0,
    existingDebt: 0,
    conformingLimit: 766550,
    jumboAmount: 33450,
    jumboPremium: 0.0025,
    propertyTaxes: 12000,
    homeownersInsurance: 2400,
    privateMortgageInsurance: 0,
    hoaFees: 4800,
    otherMonthlyExpenses: 0,
    interestOnlyOption: false,
    interestOnlyPeriod: 10,
    prepaymentPenalty: false,
    prepaymentPenaltyPeriod: 3,
    rateLockPeriod: 60,
    minimumCreditScore: 680,
    maximumDTI: 0.43,
    minimumReserves: 6,
    maximumLTV: 0.9,
    marketConditions: 'neutral',
    rateEnvironment: 'moderate',
    competitionLevel: 'moderate'
  };

  describe('calculateJumboLoan', () => {
    it('should calculate basic loan metrics', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.annualPayment).toBeGreaterThan(0);
      expect(result.totalPayments).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.totalPrincipal).toBe(mockInputs.loanAmount);
    });

    it('should calculate jumbo loan components', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.conformingPortion).toBeGreaterThan(0);
      expect(result.jumboPortion).toBeGreaterThan(0);
      expect(result.jumboPremiumCost).toBeGreaterThan(0);
      expect(result.blendedRate).toBeGreaterThan(0);
    });

    it('should analyze qualification', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.qualificationStatus).toBeDefined();
      expect(Array.isArray(result.qualificationFactors)).toBe(true);
      expect(Array.isArray(result.qualificationRecommendations)).toBe(true);
    });

    it('should provide cost analysis', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.totalLoanCost).toBeGreaterThan(0);
      expect(result.costPerThousand).toBeGreaterThan(0);
      expect(result.effectiveRate).toBeGreaterThan(0);
      expect(result.breakEvenPoint).toBeGreaterThan(0);
    });

    it('should provide conforming loan comparison', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.conformingLoanComparison).toBeDefined();
      expect(result.conformingLoanComparison.conformingPayment).toBeGreaterThan(0);
      expect(result.conformingLoanComparison.jumboPayment).toBeGreaterThan(0);
      expect(result.conformingLoanComparison.paymentDifference).toBeDefined();
      expect(result.conformingLoanComparison.totalCostDifference).toBeDefined();
      expect(result.conformingLoanComparison.breakEvenMonths).toBeGreaterThan(0);
    });

    it('should assess risks', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(Array.isArray(result.riskFactors)).toBe(true);
      expect(Array.isArray(result.riskMitigationStrategies)).toBe(true);
      expect(result.overallRiskScore).toBeGreaterThanOrEqual(1);
      expect(result.overallRiskScore).toBeLessThanOrEqual(100);
    });

    it('should provide alternative options', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.alternativeOptions).toBeDefined();
      expect(result.alternativeOptions.conformingLoan).toBeDefined();
      expect(result.alternativeOptions.piggybackLoan).toBeDefined();
      expect(result.alternativeOptions.portfolioLoan).toBeDefined();
      
      expect(result.alternativeOptions.conformingLoan.maxAmount).toBeGreaterThan(0);
      expect(result.alternativeOptions.conformingLoan.payment).toBeGreaterThan(0);
      expect(result.alternativeOptions.conformingLoan.totalCost).toBeGreaterThan(0);
      expect(Array.isArray(result.alternativeOptions.conformingLoan.pros)).toBe(true);
      expect(Array.isArray(result.alternativeOptions.conformingLoan.cons)).toBe(true);
    });

    it('should provide refinancing analysis', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.refinancingAnalysis).toBeDefined();
      expect(result.refinancingAnalysis.shouldConsiderRefinancing).toBeDefined();
      expect(Array.isArray(result.refinancingAnalysis.refinanceTriggers)).toBe(true);
      expect(Array.isArray(result.refinancingAnalysis.refinanceBenefits)).toBe(true);
      expect(result.refinancingAnalysis.refinanceCosts).toBeGreaterThan(0);
    });

    it('should calculate tax implications', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.taxImplications).toBeDefined();
      expect(result.taxImplications.annualInterestDeduction).toBeGreaterThan(0);
      expect(result.taxImplications.estimatedTaxSavings).toBeGreaterThan(0);
      expect(result.taxImplications.netAfterTaxCost).toBeGreaterThan(0);
      expect(result.taxImplications.taxBenefitRatio).toBeGreaterThan(0);
    });

    it('should generate recommendations', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.loanSuitability).toBeDefined();
      expect(Array.isArray(result.recommendations.keyRecommendations)).toBe(true);
      expect(Array.isArray(result.recommendations.optimizationStrategies)).toBe(true);
      expect(Array.isArray(result.recommendations.riskWarnings)).toBe(true);
    });

    it('should provide summary', () => {
      const result = calculateJumboLoan(mockInputs);
      
      expect(result.summary).toBeDefined();
      expect(result.summary.totalLoanAmount).toBe(mockInputs.loanAmount);
      expect(result.summary.monthlyPayment).toBeGreaterThan(0);
      expect(result.summary.totalLoanCost).toBeGreaterThan(0);
      expect(Array.isArray(result.summary.keyBenefits)).toBe(true);
      expect(Array.isArray(result.summary.keyRisks)).toBe(true);
      expect(Array.isArray(result.summary.nextSteps)).toBe(true);
    });
  });

  describe('validateJumboLoanInputs', () => {
    it('should validate valid inputs', () => {
      const result = validateJumboLoanInputs(mockInputs);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid loan amount', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 50000 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $100,000');
    });

    it('should catch invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: 0.6 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 50%');
    });

    it('should catch invalid loan term', () => {
      const invalidInputs = { ...mockInputs, loanTerm: 0 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 50000 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $100,000');
    });

    it('should catch invalid property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '123' };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid debt-to-income ratio', () => {
      const invalidInputs = { ...mockInputs, debtToIncomeRatio: 1.5 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Debt-to-income ratio must be between 0% and 100%');
    });

    it('should catch invalid loan-to-value ratio', () => {
      const invalidInputs = { ...mockInputs, loanToValueRatio: 1.2 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan-to-value ratio must be between 0% and 100%');
    });

    it('should catch invalid annual income', () => {
      const invalidInputs = { ...mockInputs, annualIncome: 25000 };
      const result = validateJumboLoanInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income must be at least $50,000');
    });

    it('should provide warnings for high-risk scenarios', () => {
      const highRiskInputs = { 
        ...mockInputs, 
        loanAmount: 2000000,
        debtToIncomeRatio: 0.5,
        loanToValueRatio: 0.95,
        creditScore: 'poor' as const,
        employmentType: 'self_employed' as const,
        reserves: 3,
        loanType: 'adjustable' as const,
        jumboPremium: 0.08
      };
      const result = validateJumboLoanInputs(highRiskInputs);
      
      expect(result.warnings).toContain('Loan amount significantly exceeds conforming limit');
      expect(result.warnings).toContain('Debt-to-income ratio above 43% may limit options');
      expect(result.warnings).toContain('Loan-to-value ratio above 90% may require additional documentation');
      expect(result.warnings).toContain('Lower credit score may result in higher rates');
      expect(result.warnings).toContain('Self-employed or business owner may require additional documentation');
      expect(result.warnings).toContain('Reserves below 6 months may limit options');
      expect(result.warnings).toContain('Adjustable rate mortgages carry interest rate risk');
      expect(result.warnings).toContain('High jumbo premium may impact affordability');
    });
  });
});
