import { calculateMortgagePoints } from './formulas';
import { validateMortgagePointsInputs } from './validation';
import { MortgagePointsInputs } from './types';

describe('MortgagePointsCalculator', () => {
  const mockInputs: MortgagePointsInputs = {
    loanAmount: 400000,
    baseInterestRate: 0.065,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    discountPoints: 1,
    originationPoints: 1,
    pointCost: 4000,
    pointValue: 1000,
    rateOptions: [],
    propertyValue: 500000,
    propertyAddress: '123 Main St, City, State 12345',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 20,
    downPayment: 100000,
    downPaymentPercentage: 20,
    downPaymentSource: 'savings',
    propertyInsurance: 1200,
    propertyTaxes: 6000,
    hoaFees: 2400,
    floodInsurance: 0,
    mortgageInsurance: 0,
    mortgageInsuranceRate: 0.005,
    borrowerIncome: 100000,
    borrowerCreditScore: 720,
    borrowerDebtToIncomeRatio: 0.35,
    borrowerEmploymentType: 'employed',
    borrowerTaxRate: 25,
    marketLocation: 'Los Angeles, CA',
    marketCondition: 'stable',
    marketGrowthRate: 0.03,
    analysisPeriod: 30,
    inflationRate: 0.025,
    propertyAppreciationRate: 0.03,
    discountRate: 0.05,
    taxDeductionPeriod: 30,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  };

  describe('calculateMortgagePoints', () => {
    it('should calculate basic mortgage points analysis', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.totalPoints).toBeGreaterThan(0);
      expect(result.totalPointCost).toBeGreaterThan(0);
      expect(result.effectiveRate).toBeLessThan(mockInputs.baseInterestRate);
      expect(result.monthlyPaymentSavings).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should handle different point amounts', () => {
      const highPointsInputs = { ...mockInputs, discountPoints: 3 };
      const result = calculateMortgagePoints(highPointsInputs);
      
      expect(result.totalPoints).toBe(4); // 3 discount + 1 origination
      expect(result.totalPointCost).toBeGreaterThan(mockInputs.pointCost);
    });

    it('should calculate break-even analysis correctly', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenYears).toBeGreaterThan(0);
      expect(result.breakEvenPoint).toBe(result.breakEvenMonths);
    });

    it('should calculate tax benefits', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.taxDeduction).toBeGreaterThan(0);
      expect(result.afterTaxCost).toBeLessThan(result.totalPointCost);
      expect(result.afterTaxSavings).toBeGreaterThan(0);
    });

    it('should calculate ROI metrics', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.returnOnInvestment).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeDefined();
      expect(result.internalRateOfReturn).toBeGreaterThanOrEqual(0);
    });

    it('should generate comparison analysis', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });

    it('should generate sensitivity analysis', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.sensitivityMatrix).toBeInstanceOf(Array);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should generate scenarios', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.scenarios).toBeInstanceOf(Array);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it('should generate amortization comparison', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.amortizationComparison).toBeInstanceOf(Array);
      expect(result.amortizationComparison.length).toBeGreaterThan(0);
    });

    it('should calculate risk metrics', () => {
      const result = calculateMortgagePoints(mockInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfBenefit).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfBenefit).toBeLessThanOrEqual(1);
      expect(result.worstCaseScenario).toBeLessThanOrEqual(0);
      expect(result.bestCaseScenario).toBeGreaterThan(0);
    });
  });

  describe('validateMortgagePointsInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePointsInputs(mockInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid loan amount', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 5000 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $10,000');
    });

    it('should catch invalid base interest rate', () => {
      const invalidInputs = { ...mockInputs, baseInterestRate: -0.01 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Base interest rate must be between 0% and 50%');
    });

    it('should catch invalid loan term', () => {
      const invalidInputs = { ...mockInputs, loanTerm: 0 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should catch invalid discount points', () => {
      const invalidInputs = { ...mockInputs, discountPoints: 15 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount points must be between 0 and 10');
    });

    it('should catch invalid origination points', () => {
      const invalidInputs = { ...mockInputs, originationPoints: 15 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Origination points must be between 0 and 10');
    });

    it('should catch invalid point cost', () => {
      const invalidInputs = { ...mockInputs, pointCost: -1000 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Point cost cannot be negative');
    });

    it('should catch invalid point value', () => {
      const invalidInputs = { ...mockInputs, pointValue: -1000 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Point value cannot be negative');
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 5000 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $10,000');
    });

    it('should catch missing property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '' };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid down payment', () => {
      const invalidInputs = { ...mockInputs, downPayment: -1000 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot be negative');
    });

    it('should catch invalid down payment percentage', () => {
      const invalidInputs = { ...mockInputs, downPaymentPercentage: 150 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment percentage must be between 0% and 100%');
    });

    it('should catch invalid property size', () => {
      const invalidInputs = { ...mockInputs, propertySize: 50 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be at least 100 sq ft');
    });

    it('should catch invalid property age', () => {
      const invalidInputs = { ...mockInputs, propertyAge: -5 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property age must be between 0 and 200 years');
    });

    it('should catch invalid borrower income', () => {
      const invalidInputs = { ...mockInputs, borrowerIncome: -1000 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower income cannot be negative');
    });

    it('should catch invalid credit score', () => {
      const invalidInputs = { ...mockInputs, borrowerCreditScore: 200 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should catch invalid debt-to-income ratio', () => {
      const invalidInputs = { ...mockInputs, borrowerDebtToIncomeRatio: 1.5 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower debt-to-income ratio must be between 0% and 100%');
    });

    it('should catch invalid tax rate', () => {
      const invalidInputs = { ...mockInputs, borrowerTaxRate: 150 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower tax rate must be between 0% and 100%');
    });

    it('should catch invalid property insurance', () => {
      const invalidInputs = { ...mockInputs, propertyInsurance: -100 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property insurance cannot be negative');
    });

    it('should catch invalid property taxes', () => {
      const invalidInputs = { ...mockInputs, propertyTaxes: -100 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property taxes cannot be negative');
    });

    it('should catch invalid HOA fees', () => {
      const invalidInputs = { ...mockInputs, hoaFees: -100 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('HOA fees cannot be negative');
    });

    it('should catch invalid flood insurance', () => {
      const invalidInputs = { ...mockInputs, floodInsurance: -100 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Flood insurance cannot be negative');
    });

    it('should catch invalid mortgage insurance', () => {
      const invalidInputs = { ...mockInputs, mortgageInsurance: -100 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage insurance cannot be negative');
    });

    it('should catch invalid mortgage insurance rate', () => {
      const invalidInputs = { ...mockInputs, mortgageInsuranceRate: 0.15 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage insurance rate must be between 0% and 10%');
    });

    it('should catch invalid analysis period', () => {
      const invalidInputs = { ...mockInputs, analysisPeriod: 0 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period must be between 1 and 50 years');
    });

    it('should catch invalid inflation rate', () => {
      const invalidInputs = { ...mockInputs, inflationRate: -0.15 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Inflation rate must be between -10% and 20%');
    });

    it('should catch invalid property appreciation rate', () => {
      const invalidInputs = { ...mockInputs, propertyAppreciationRate: -0.25 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property appreciation rate must be between -20% and 30%');
    });

    it('should catch invalid discount rate', () => {
      const invalidInputs = { ...mockInputs, discountRate: -0.05 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount rate must be between 0% and 30%');
    });

    it('should catch invalid tax deduction period', () => {
      const invalidInputs = { ...mockInputs, taxDeductionPeriod: 0 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tax deduction period must be between 1 and 50 years');
    });

    it('should catch invalid market location', () => {
      const invalidInputs = { ...mockInputs, marketLocation: 'A' };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market location is required and must be at least 2 characters');
    });

    it('should catch invalid market growth rate', () => {
      const invalidInputs = { ...mockInputs, marketGrowthRate: -0.25 };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market growth rate must be between -20% and 30%');
    });

    it('should catch invalid rate options', () => {
      const invalidInputs = { 
        ...mockInputs, 
        rateOptions: [
          { points: 15, rate: 0.05, payment: 2000, totalInterest: 100000 }
        ]
      };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rate option points must be between 0 and 10');
    });

    it('should catch invalid rate option rate', () => {
      const invalidInputs = { 
        ...mockInputs, 
        rateOptions: [
          { points: 1, rate: 0.6, payment: 2000, totalInterest: 100000 }
        ]
      };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rate option rate must be between 0% and 50%');
    });

    it('should catch invalid rate option payment', () => {
      const invalidInputs = { 
        ...mockInputs, 
        rateOptions: [
          { points: 1, rate: 0.05, payment: -2000, totalInterest: 100000 }
        ]
      };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rate option payment cannot be negative');
    });

    it('should catch invalid rate option total interest', () => {
      const invalidInputs = { 
        ...mockInputs, 
        rateOptions: [
          { points: 1, rate: 0.05, payment: 2000, totalInterest: -100000 }
        ]
      };
      const result = validateMortgagePointsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rate option total interest cannot be negative');
    });
  });
});
