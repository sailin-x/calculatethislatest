import { calculateMortgageQualification } from './formulas';
import { validateMortgageQualificationInputs } from './validation';
import { MortgageQualificationInputs } from './types';

describe('MortgageQualificationCalculator', () => {
  const mockInputs: MortgageQualificationInputs = {
    borrowerIncome: 75000,
    coBorrowerIncome: 50000,
    borrowerCreditScore: 720,
    coBorrowerCreditScore: 680,
    borrowerEmploymentType: 'employed',
    coBorrowerEmploymentType: 'employed',
    borrowerEmploymentLength: 5,
    coBorrowerEmploymentLength: 3,
    baseSalary: 60000,
    overtimeIncome: 5000,
    bonusIncome: 3000,
    commissionIncome: 2000,
    rentalIncome: 0,
    investmentIncome: 1000,
    otherIncome: 0,
    borrowerAssets: 100000,
    coBorrowerAssets: 50000,
    borrowerLiquidity: 25000,
    coBorrowerLiquidity: 15000,
    borrowerDebts: 15000,
    coBorrowerDebts: 10000,
    propertyValue: 400000,
    propertyAddress: '123 Main St, City, State 12345',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    loanAmount: 320000,
    interestRate: 0.065,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    downPayment: 80000,
    downPaymentPercentage: 20,
    downPaymentSource: 'savings',
    propertyInsurance: 1200,
    propertyTaxes: 4800,
    hoaFees: 0,
    floodInsurance: 0,
    mortgageInsurance: 0,
    mortgageInsuranceRate: 0.005,
    creditCardDebt: 5000,
    autoLoanDebt: 15000,
    studentLoanDebt: 20000,
    personalLoanDebt: 5000,
    otherDebt: 0,
    maxDebtToIncomeRatio: 0.43,
    maxHousingExpenseRatio: 0.28,
    minCreditScore: 620,
    minDownPayment: 0.05,
    maxLoanAmount: 800000,
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

  describe('calculateMortgageQualification', () => {
    it('should calculate basic mortgage qualification', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.qualificationScore).toBeGreaterThan(0);
      expect(result.qualificationStatus).toBeDefined();
      expect(result.debtToIncomeRatio).toBeGreaterThan(0);
      expect(result.housingExpenseRatio).toBeGreaterThan(0);
      expect(result.averageCreditScore).toBeGreaterThan(0);
      expect(result.maxAffordableLoan).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.probabilityOfApproval).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should handle different employment types', () => {
      const selfEmployedInputs = { ...mockInputs, borrowerEmploymentType: 'self_employed' as const };
      const result = calculateMortgageQualification(selfEmployedInputs);
      
      expect(result.qualificationScore).toBeDefined();
      expect(result.riskScore).toBeGreaterThan(0);
    });

    it('should handle different loan types', () => {
      const fhaInputs = { ...mockInputs, loanType: 'fha' as const };
      const result = calculateMortgageQualification(fhaInputs);
      
      expect(result.qualificationScore).toBeDefined();
      expect(result.probabilityOfApproval).toBeGreaterThan(0);
    });

    it('should calculate qualification factors', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.qualificationFactors).toBeInstanceOf(Array);
      expect(result.qualificationFactors.length).toBeGreaterThan(0);
    });

    it('should calculate risk metrics', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeLessThanOrEqual(1);
      expect(result.riskFactors).toBeInstanceOf(Array);
    });

    it('should calculate affordability metrics', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.maxAffordablePayment).toBeGreaterThan(0);
      expect(result.maxAffordableLoan).toBeGreaterThan(0);
      expect(result.maxAffordableProperty).toBeGreaterThan(0);
      expect(result.affordabilityMargin).toBeDefined();
    });

    it('should generate sensitivity analysis', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.sensitivityMatrix).toBeInstanceOf(Array);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should generate scenarios', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.scenarios).toBeInstanceOf(Array);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it('should generate comparison analysis', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.comparisonAnalysis).toBeInstanceOf(Array);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });

    it('should generate timeline analysis', () => {
      const result = calculateMortgageQualification(mockInputs);
      
      expect(result.timelineAnalysis).toBeInstanceOf(Array);
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
    });
  });

  describe('validateMortgageQualificationInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateMortgageQualificationInputs(mockInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid borrower income', () => {
      const invalidInputs = { ...mockInputs, borrowerIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower income cannot be negative');
    });

    it('should catch invalid co-borrower income', () => {
      const invalidInputs = { ...mockInputs, coBorrowerIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Co-borrower income cannot be negative');
    });

    it('should catch invalid credit score', () => {
      const invalidInputs = { ...mockInputs, borrowerCreditScore: 200 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower credit score must be between 300 and 850');
    });

    it('should catch invalid co-borrower credit score', () => {
      const invalidInputs = { ...mockInputs, coBorrowerCreditScore: 200 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Co-borrower credit score must be between 300 and 850');
    });

    it('should catch invalid employment length', () => {
      const invalidInputs = { ...mockInputs, borrowerEmploymentLength: -1 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower employment length must be between 0 and 50 years');
    });

    it('should catch invalid co-borrower employment length', () => {
      const invalidInputs = { ...mockInputs, coBorrowerEmploymentLength: -1 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Co-borrower employment length must be between 0 and 50 years');
    });

    it('should catch invalid base salary', () => {
      const invalidInputs = { ...mockInputs, baseSalary: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Base salary cannot be negative');
    });

    it('should catch invalid overtime income', () => {
      const invalidInputs = { ...mockInputs, overtimeIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Overtime income cannot be negative');
    });

    it('should catch invalid bonus income', () => {
      const invalidInputs = { ...mockInputs, bonusIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Bonus income cannot be negative');
    });

    it('should catch invalid commission income', () => {
      const invalidInputs = { ...mockInputs, commissionIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Commission income cannot be negative');
    });

    it('should catch invalid rental income', () => {
      const invalidInputs = { ...mockInputs, rentalIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rental income cannot be negative');
    });

    it('should catch invalid investment income', () => {
      const invalidInputs = { ...mockInputs, investmentIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Investment income cannot be negative');
    });

    it('should catch invalid other income', () => {
      const invalidInputs = { ...mockInputs, otherIncome: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Other income cannot be negative');
    });

    it('should catch invalid borrower assets', () => {
      const invalidInputs = { ...mockInputs, borrowerAssets: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower assets cannot be negative');
    });

    it('should catch invalid co-borrower assets', () => {
      const invalidInputs = { ...mockInputs, coBorrowerAssets: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Co-borrower assets cannot be negative');
    });

    it('should catch invalid borrower liquidity', () => {
      const invalidInputs = { ...mockInputs, borrowerLiquidity: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower liquidity cannot be negative');
    });

    it('should catch invalid co-borrower liquidity', () => {
      const invalidInputs = { ...mockInputs, coBorrowerLiquidity: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Co-borrower liquidity cannot be negative');
    });

    it('should catch invalid borrower debts', () => {
      const invalidInputs = { ...mockInputs, borrowerDebts: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Borrower debts cannot be negative');
    });

    it('should catch invalid co-borrower debts', () => {
      const invalidInputs = { ...mockInputs, coBorrowerDebts: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Co-borrower debts cannot be negative');
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 5000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $10,000');
    });

    it('should catch missing property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '' };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid property size', () => {
      const invalidInputs = { ...mockInputs, propertySize: 50 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be at least 100 sq ft');
    });

    it('should catch invalid property age', () => {
      const invalidInputs = { ...mockInputs, propertyAge: -5 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property age must be between 0 and 200 years');
    });

    it('should catch invalid loan amount', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 5000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan amount must be at least $10,000');
    });

    it('should catch invalid interest rate', () => {
      const invalidInputs = { ...mockInputs, interestRate: -0.01 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 50%');
    });

    it('should catch invalid loan term', () => {
      const invalidInputs = { ...mockInputs, loanTerm: 0 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should catch invalid down payment', () => {
      const invalidInputs = { ...mockInputs, downPayment: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot be negative');
    });

    it('should catch invalid down payment percentage', () => {
      const invalidInputs = { ...mockInputs, downPaymentPercentage: 150 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment percentage must be between 0% and 100%');
    });

    it('should catch invalid property insurance', () => {
      const invalidInputs = { ...mockInputs, propertyInsurance: -100 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property insurance cannot be negative');
    });

    it('should catch invalid property taxes', () => {
      const invalidInputs = { ...mockInputs, propertyTaxes: -100 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property taxes cannot be negative');
    });

    it('should catch invalid HOA fees', () => {
      const invalidInputs = { ...mockInputs, hoaFees: -100 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('HOA fees cannot be negative');
    });

    it('should catch invalid flood insurance', () => {
      const invalidInputs = { ...mockInputs, floodInsurance: -100 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Flood insurance cannot be negative');
    });

    it('should catch invalid mortgage insurance', () => {
      const invalidInputs = { ...mockInputs, mortgageInsurance: -100 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage insurance cannot be negative');
    });

    it('should catch invalid mortgage insurance rate', () => {
      const invalidInputs = { ...mockInputs, mortgageInsuranceRate: 0.15 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mortgage insurance rate must be between 0% and 10%');
    });

    it('should catch invalid credit card debt', () => {
      const invalidInputs = { ...mockInputs, creditCardDebt: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Credit card debt cannot be negative');
    });

    it('should catch invalid auto loan debt', () => {
      const invalidInputs = { ...mockInputs, autoLoanDebt: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Auto loan debt cannot be negative');
    });

    it('should catch invalid student loan debt', () => {
      const invalidInputs = { ...mockInputs, studentLoanDebt: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Student loan debt cannot be negative');
    });

    it('should catch invalid personal loan debt', () => {
      const invalidInputs = { ...mockInputs, personalLoanDebt: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Personal loan debt cannot be negative');
    });

    it('should catch invalid other debt', () => {
      const invalidInputs = { ...mockInputs, otherDebt: -1000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Other debt cannot be negative');
    });

    it('should catch invalid max debt-to-income ratio', () => {
      const invalidInputs = { ...mockInputs, maxDebtToIncomeRatio: 1.5 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Max debt-to-income ratio must be between 0% and 100%');
    });

    it('should catch invalid max housing expense ratio', () => {
      const invalidInputs = { ...mockInputs, maxHousingExpenseRatio: 1.5 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Max housing expense ratio must be between 0% and 100%');
    });

    it('should catch invalid min credit score', () => {
      const invalidInputs = { ...mockInputs, minCreditScore: 200 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Min credit score must be between 300 and 850');
    });

    it('should catch invalid min down payment', () => {
      const invalidInputs = { ...mockInputs, minDownPayment: 150 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Min down payment must be between 0% and 100%');
    });

    it('should catch invalid max loan amount', () => {
      const invalidInputs = { ...mockInputs, maxLoanAmount: 5000 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Max loan amount must be at least $10,000');
    });

    it('should catch invalid market location', () => {
      const invalidInputs = { ...mockInputs, marketLocation: 'A' };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market location is required and must be at least 2 characters');
    });

    it('should catch invalid market growth rate', () => {
      const invalidInputs = { ...mockInputs, marketGrowthRate: -0.25 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Market growth rate must be between -20% and 30%');
    });

    it('should catch invalid analysis period', () => {
      const invalidInputs = { ...mockInputs, analysisPeriod: 0 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period must be between 1 and 50 years');
    });

    it('should catch invalid inflation rate', () => {
      const invalidInputs = { ...mockInputs, inflationRate: -0.15 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Inflation rate must be between -10% and 20%');
    });

    it('should catch invalid property appreciation rate', () => {
      const invalidInputs = { ...mockInputs, propertyAppreciationRate: -0.25 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property appreciation rate must be between -20% and 30%');
    });

    it('should catch invalid discount rate', () => {
      const invalidInputs = { ...mockInputs, discountRate: -0.05 };
      const result = validateMortgageQualificationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Discount rate must be between 0% and 30%');
    });
  });
});
