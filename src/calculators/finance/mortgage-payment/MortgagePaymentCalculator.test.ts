import { calculateMortgagePayment } from './formulas';
import { validateMortgagePaymentInputs } from './validation';
import { MortgagePaymentInputs } from './types';

describe('MortgagePaymentCalculator', () => {
  const mockInputs: MortgagePaymentInputs = {
    loanAmount: 400000,
    interestRate: 0.065,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    armType: '5_1',
    initialFixedPeriod: 5,
    adjustmentPeriod: 12,
    margin: 0.025,
    indexRate: 0.03,
    lifetimeCap: 0.05,
    periodicCap: 0.02,
    floorRate: 0.03,
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
    paymentFrequency: 'monthly',
    firstPaymentDate: '2024-02-01',
    paymentDay: 1,
    discountPoints: 0,
    originationPoints: 1,
    lenderCredits: 0,
    sellerCredits: 0,
    borrowerIncome: 100000,
    borrowerCreditScore: 720,
    borrowerDebtToIncomeRatio: 0.35,
    borrowerEmploymentType: 'employed',
    marketLocation: 'Los Angeles, CA',
    marketCondition: 'stable',
    marketGrowthRate: 0.03,
    analysisPeriod: 30,
    inflationRate: 0.025,
    propertyAppreciationRate: 0.03,
    discountRate: 0.05,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  };

  describe('calculateMortgagePayment', () => {
    it('should calculate basic mortgage payment', () => {
      const result = calculateMortgagePayment(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.principalPayment).toBeGreaterThan(0);
      expect(result.interestPayment).toBeGreaterThan(0);
      expect(result.totalPayments).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.effectiveInterestRate).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should handle different payment types', () => {
      const interestOnlyInputs = { ...mockInputs, paymentType: 'interest_only' as const };
      const result = calculateMortgagePayment(interestOnlyInputs);
      
      expect(result.principalPayment).toBe(0);
      expect(result.interestPayment).toBeGreaterThan(0);
    });

    it('should handle ARM loans', () => {
      const armInputs = { ...mockInputs, paymentType: 'arm' as const };
      const result = calculateMortgagePayment(armInputs);
      
      expect(result.armSchedule).toBeDefined();
      expect(result.paymentShockRisk).toBeGreaterThanOrEqual(0);
      expect(result.interestRateRisk).toBeGreaterThanOrEqual(0);
    });

    it('should calculate risk metrics', () => {
      const result = calculateMortgagePayment(mockInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeLessThanOrEqual(1);
    });

    it('should generate amortization schedule', () => {
      const result = calculateMortgagePayment(mockInputs);
      
      expect(result.amortizationSchedule).toBeInstanceOf(Array);
      expect(result.amortizationSchedule.length).toBeGreaterThan(0);
    });

    it('should generate sensitivity analysis', () => {
      const result = calculateMortgagePayment(mockInputs);
      
      expect(result.sensitivityMatrix).toBeInstanceOf(Array);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should generate scenarios', () => {
      const result = calculateMortgagePayment(mockInputs);
      
      expect(result.scenarios).toBeInstanceOf(Array);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it('should generate comparison analysis', () => {
      const result = calculateMortgagePayment(mockInputs);
      
      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });
  });

  describe('validateMortgagePaymentInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgagePaymentInputs(mockInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid loan amount', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 5000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $10,000');
    });

    it('should catch invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: -0.01 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 50%');
    });

    it('should catch invalid loan term', () => {
      const invalidInputs = { ...mockInputs, loanTerm: 0 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 5000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $10,000');
    });

    it('should catch missing property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '' };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid down payment', () => {
      const invalidInputs = { ...mockInputs, downPayment: -1000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot be negative');
    });

    it('should catch invalid down payment percentage', () => {
      const invalidInputs = { ...mockInputs, downPaymentPercentage: 150 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment percentage must be between 0% and 100%');
    });

    it('should catch invalid property size', () => {
      const invalidInputs = { ...mockInputs, propertySize: 50 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be at least 100 sq ft');
    });

    it('should catch invalid property age', () => {
      const invalidInputs = { ...mockInputs, propertyAge: -5 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property age must be between 0 and 200 years');
    });

    it('should catch invalid borrower income', () => {
      const invalidInputs = { ...mockInputs, borrowerIncome: -1000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower income cannot be negative');
    });

    it('should catch invalid credit score', () => {
      const invalidInputs = { ...mockInputs, borrowerCreditScore: 200 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should catch invalid debt-to-income ratio', () => {
      const invalidInputs = { ...mockInputs, borrowerDebtToIncomeRatio: 1.5 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower debt-to-income ratio must be between 0% and 100%');
    });

    it('should catch invalid discount points', () => {
      const invalidInputs = { ...mockInputs, discountPoints: 15 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount points must be between 0 and 10');
    });

    it('should catch invalid origination points', () => {
      const invalidInputs = { ...mockInputs, originationPoints: 15 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Origination points must be between 0 and 10');
    });

    it('should catch invalid lender credits', () => {
      const invalidInputs = { ...mockInputs, lenderCredits: -1000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lender credits cannot be negative');
    });

    it('should catch invalid seller credits', () => {
      const invalidInputs = { ...mockInputs, sellerCredits: -1000 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Seller credits cannot be negative');
    });

    it('should catch invalid property insurance', () => {
      const invalidInputs = { ...mockInputs, propertyInsurance: -100 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property insurance cannot be negative');
    });

    it('should catch invalid property taxes', () => {
      const invalidInputs = { ...mockInputs, propertyTaxes: -100 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property taxes cannot be negative');
    });

    it('should catch invalid HOA fees', () => {
      const invalidInputs = { ...mockInputs, hoaFees: -100 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('HOA fees cannot be negative');
    });

    it('should catch invalid flood insurance', () => {
      const invalidInputs = { ...mockInputs, floodInsurance: -100 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Flood insurance cannot be negative');
    });

    it('should catch invalid mortgage insurance', () => {
      const invalidInputs = { ...mockInputs, mortgageInsurance: -100 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage insurance cannot be negative');
    });

    it('should catch invalid mortgage insurance rate', () => {
      const invalidInputs = { ...mockInputs, mortgageInsuranceRate: 0.15 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage insurance rate must be between 0% and 10%');
    });

    it('should catch invalid payment day', () => {
      const invalidInputs = { ...mockInputs, paymentDay: 35 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment day must be between 1 and 31');
    });

    it('should catch invalid analysis period', () => {
      const invalidInputs = { ...mockInputs, analysisPeriod: 0 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period must be between 1 and 50 years');
    });

    it('should catch invalid inflation rate', () => {
      const invalidInputs = { ...mockInputs, inflationRate: -0.15 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Inflation rate must be between -10% and 20%');
    });

    it('should catch invalid property appreciation rate', () => {
      const invalidInputs = { ...mockInputs, propertyAppreciationRate: -0.25 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property appreciation rate must be between -20% and 30%');
    });

    it('should catch invalid discount rate', () => {
      const invalidInputs = { ...mockInputs, discountRate: -0.05 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount rate must be between 0% and 30%');
    });

    it('should catch invalid market location', () => {
      const invalidInputs = { ...mockInputs, marketLocation: 'A' };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market location is required and must be at least 2 characters');
    });

    it('should catch invalid market growth rate', () => {
      const invalidInputs = { ...mockInputs, marketGrowthRate: -0.25 };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market growth rate must be between -20% and 30%');
    });

    it('should catch invalid ARM parameters', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        initialFixedPeriod: 0 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Initial fixed period must be between 1 and 30 years');
    });

    it('should catch invalid adjustment period', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        adjustmentPeriod: 0 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Adjustment period must be between 1 and 12 months');
    });

    it('should catch invalid margin', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        margin: 0.15 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Margin must be between 0% and 10%');
    });

    it('should catch invalid index rate', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        indexRate: 0.25 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Index rate must be between 0% and 20%');
    });

    it('should catch invalid lifetime cap', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        lifetimeCap: 0.25 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lifetime cap must be between 0% and 20%');
    });

    it('should catch invalid periodic cap', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        periodicCap: 0.15 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Periodic cap must be between 0% and 10%');
    });

    it('should catch invalid floor rate', () => {
      const invalidInputs = { 
        ...mockInputs, 
        paymentType: 'arm' as const,
        floorRate: 0.15 
      };
      const result = validateMortgagePaymentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Floor rate must be between 0% and 10%');
    });
  });
});
