import { LoanToValueCalculator } from './LoanToValueCalculator';
import { LoanToValueInputs } from './types';

describe('LoanToValueCalculator', () => {
  let calculator: LoanToValueCalculator;

  beforeEach(() => {
    calculator = new LoanToValueCalculator();
  });

  const createValidInputs = (): LoanToValueInputs => ({
    loanAmount: 400000,
    interestRate: 0.065,
    loanTerm: 360,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    propertyValue: 500000,
    propertyAddress: '123 Main St, Anytown, ST 12345',
    propertyType: 'single_family',
    propertySize: 2500,
    propertyAge: 10,
    propertyCondition: 'good',
    appraisalValue: 500000,
    marketValue: 510000,
    assessedValue: 480000,
    purchasePrice: 500000,
    downPayment: 100000,
    downPaymentPercentage: 0.20,
    downPaymentSource: 'savings',
    borrowerIncome: 120000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 0.35,
    borrowerEmploymentType: 'employed',
    borrowerAssets: 200000,
    borrowerLiquidity: 150000,
    propertyInsurance: 1200,
    propertyTaxes: 6000,
    hoaFees: 0,
    floodInsurance: 0,
    marketLocation: 'Anytown, ST',
    marketCondition: 'growing',
    marketGrowthRate: 0.04,
    daysOnMarket: 30,
    marketRisk: 'low',
    propertyRisk: 'low',
    borrowerRisk: 'low',
    loanRisk: 'low',
    maxLtvRatio: 0.80,
    minDownPayment: 0.20,
    pmiRequired: false,
    pmiRate: 0.005,
    pmiThreshold: 0.80,
    additionalCollateral: 0,
    crossCollateralization: false,
    personalGuarantee: false,
    analysisPeriod: 30,
    inflationRate: 0.03,
    propertyAppreciationRate: 0.03,
    discountRate: 0.05,
    currency: 'USD',
    displayFormat: 'percentage',
    includeCharts: true
  });

  describe('Basic Calculation', () => {
    it('should calculate LTV ratio correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.loanToValueRatio).toBeGreaterThan(0);
      expect(result.loanToValueRatio).toBeLessThan(1);
      expect(result.equityPosition).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
    });

    it('should calculate LTV ratio as loan amount divided by property value', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedLTV = inputs.loanAmount / inputs.propertyValue;
      expect(result.loanToValueRatio).toBeCloseTo(expectedLTV, 4);
    });

    it('should calculate equity position correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedEquity = inputs.propertyValue - inputs.loanAmount;
      expect(result.equityPosition).toBeCloseTo(expectedEquity, 2);
    });

    it('should calculate equity percentage correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedEquityPercentage = (inputs.propertyValue - inputs.loanAmount) / inputs.propertyValue;
      expect(result.equityPercentage).toBeCloseTo(expectedEquityPercentage, 4);
    });

    it('should calculate combined LTV ratio', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.combinedLtvRatio).toBeDefined();
      expect(result.combinedLtvRatio).toBeGreaterThanOrEqual(result.loanToValueRatio);
    });

    it('should calculate effective LTV ratio', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.effectiveLtvRatio).toBeDefined();
      expect(result.effectiveLtvRatio).toBeGreaterThanOrEqual(result.loanToValueRatio);
    });
  });

  describe('Loan Analysis', () => {
    it('should calculate loan metrics correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.loanAmount).toBe(inputs.loanAmount);
      expect(result.loanPercentage).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalPayments).toBeGreaterThan(inputs.loanAmount);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
    });

    it('should calculate monthly payment correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeLessThan(inputs.loanAmount / 10); // Should be reasonable
    });

    it('should calculate total interest paid', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeLessThan(inputs.loanAmount * 2); // Should be reasonable
    });
  });

  describe('Cost Analysis', () => {
    it('should calculate total cost', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.costOfCredit).toBeGreaterThan(0);
      expect(result.effectiveInterestRate).toBeGreaterThan(0);
    });

    it('should calculate cost of credit', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.costOfCredit).toBeGreaterThan(result.totalInterestPaid);
    });

    it('should calculate effective interest rate', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.effectiveInterestRate).toBeGreaterThan(inputs.interestRate);
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate risk score', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
    });

    it('should calculate probability of default', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeLessThanOrEqual(1);
    });

    it('should calculate loss given default', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.lossGivenDefault).toBeGreaterThanOrEqual(0);
      expect(result.lossGivenDefault).toBeLessThanOrEqual(1);
    });

    it('should calculate expected loss', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.expectedLoss).toBeGreaterThanOrEqual(0);
    });

    it('should adjust risk score for different credit scores', () => {
      const inputs1 = createValidInputs();
      inputs1.borrowerCreditScore = 800;

      const inputs2 = createValidInputs();
      inputs2.borrowerCreditScore = 600;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.riskScore).toBeLessThan(result2.riskScore);
    });

    it('should adjust risk score for different debt-to-income ratios', () => {
      const inputs1 = createValidInputs();
      inputs1.borrowerDebtToIncomeRatio = 0.25;

      const inputs2 = createValidInputs();
      inputs2.borrowerDebtToIncomeRatio = 0.50;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.riskScore).toBeLessThan(result2.riskScore);
    });

    it('should adjust risk score for different market conditions', () => {
      const inputs1 = createValidInputs();
      inputs1.marketCondition = 'hot';

      const inputs2 = createValidInputs();
      inputs2.marketCondition = 'declining';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.riskScore).toBeLessThan(result2.riskScore);
    });
  });

  describe('Insurance Analysis', () => {
    it('should calculate PMI requirements correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pmiRequired).toBeDefined();
      expect(typeof result.pmiRequired).toBe('boolean');
    });

    it('should calculate PMI cost when required', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.85; // High LTV
      inputs.pmiThreshold = 0.80;

      const result = calculator.calculate(inputs);

      if (result.pmiRequired) {
        expect(result.pmiCost).toBeGreaterThan(0);
        expect(result.pmiDuration).toBeGreaterThan(0);
      }
    });

    it('should calculate total insurance cost', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.totalInsuranceCost).toBeGreaterThan(0);
      expect(result.totalInsuranceCost).toBeGreaterThanOrEqual(inputs.propertyInsurance + inputs.propertyTaxes);
    });
  });

  describe('Cash Flow Analysis', () => {
    it('should calculate monthly cash flow', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.monthlyCashFlow).toBeDefined();
      expect(typeof result.monthlyCashFlow).toBe('number');
    });

    it('should calculate annual cash flow', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.annualCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeCloseTo(result.monthlyCashFlow * 12, 2);
    });

    it('should calculate break-even point', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.breakEvenPoint).toBeDefined();
      expect(result.breakEvenPoint).toBeGreaterThan(0);
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.ltvRating).toBeDefined();
      expect(result.analysis.riskRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should include sensitivity analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
    });

    it('should include scenario analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.scenarios).toBeDefined();
      expect(Array.isArray(result.scenarios)).toBe(true);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it('should include valuation breakdown', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.valuationBreakdown).toBeDefined();
      expect(Array.isArray(result.valuationBreakdown)).toBe(true);
    });

    it('should include comparable analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.comparableAnalysis).toBeDefined();
      expect(Array.isArray(result.comparableAnalysis)).toBe(true);
    });
  });

  describe('Validation', () => {
    it('should throw error for missing loan amount', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = 0;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid interest rate', () => {
      const inputs = createValidInputs();
      inputs.interestRate = 1.5;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for missing property address', () => {
      const inputs = createValidInputs();
      inputs.propertyAddress = '';

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid loan type', () => {
      const inputs = createValidInputs();
      inputs.loanType = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for loan amount exceeding property value', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue + 100000;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid borrower credit score', () => {
      const inputs = createValidInputs();
      inputs.borrowerCreditScore = 200;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid market condition', () => {
      const inputs = createValidInputs();
      inputs.marketCondition = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for down payment not matching purchase price', () => {
      const inputs = createValidInputs();
      inputs.downPayment = 50000; // Should be 100000

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });
  });

  describe('LTV Rating', () => {
    it('should rate excellent LTV ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.65; // 65% LTV

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltvRating).toBe('Excellent');
    });

    it('should rate good LTV ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.72; // 72% LTV

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltvRating).toBe('Good');
    });

    it('should rate average LTV ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.78; // 78% LTV

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltvRating).toBe('Average');
    });

    it('should rate poor LTV ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.82; // 82% LTV

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltvRating).toBe('Poor');
    });

    it('should rate very poor LTV ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.90; // 90% LTV

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltvRating).toBe('Very Poor');
    });
  });

  describe('Risk Rating', () => {
    it('should rate low risk correctly', () => {
      const inputs = createValidInputs();
      inputs.borrowerCreditScore = 800;
      inputs.borrowerDebtToIncomeRatio = 0.25;
      inputs.marketCondition = 'hot';
      inputs.propertyCondition = 'excellent';

      const result = calculator.calculate(inputs);
      expect(result.analysis.riskRating).toBe('Low');
    });

    it('should rate moderate risk correctly', () => {
      const inputs = createValidInputs();
      inputs.borrowerCreditScore = 720;
      inputs.borrowerDebtToIncomeRatio = 0.35;
      inputs.marketCondition = 'growing';
      inputs.propertyCondition = 'good';

      const result = calculator.calculate(inputs);
      expect(result.analysis.riskRating).toBe('Moderate');
    });

    it('should rate high risk correctly', () => {
      const inputs = createValidInputs();
      inputs.borrowerCreditScore = 650;
      inputs.borrowerDebtToIncomeRatio = 0.45;
      inputs.marketCondition = 'stable';
      inputs.propertyCondition = 'average';

      const result = calculator.calculate(inputs);
      expect(result.analysis.riskRating).toBe('High');
    });
  });

  describe('Recommendations', () => {
    it('should recommend approval for excellent LTV and low risk', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.65;
      inputs.borrowerCreditScore = 800;
      inputs.borrowerDebtToIncomeRatio = 0.25;
      inputs.marketCondition = 'hot';

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Approve');
    });

    it('should recommend conditional approval for average LTV and low risk', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.78;
      inputs.borrowerCreditScore = 750;
      inputs.borrowerDebtToIncomeRatio = 0.35;
      inputs.marketCondition = 'growing';

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Conditional');
    });

    it('should recommend rejection for very poor LTV', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.propertyValue * 0.95;

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Reject');
    });
  });
});