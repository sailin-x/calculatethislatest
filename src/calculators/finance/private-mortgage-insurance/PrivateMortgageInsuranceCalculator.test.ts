import { PrivateMortgageInsuranceCalculator } from './PrivateMortgageInsuranceCalculator';
import { PrivateMortgageInsuranceInputs } from './types';

describe('PrivateMortgageInsuranceCalculator', () => {
  let calculator: PrivateMortgageInsuranceCalculator;

  beforeEach(() => {
    calculator = new PrivateMortgageInsuranceCalculator();
  });

  const createValidInputs = (): PrivateMortgageInsuranceInputs => ({
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
    downPayment: 100000,
    downPaymentPercentage: 0.20,
    downPaymentSource: 'savings',
    pmiRequired: true,
    pmiRate: 0.005,
    pmiType: 'monthly',
    pmiCancellationMethod: 'automatic',
    borrowerIncome: 120000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 0.35,
    borrowerEmploymentType: 'employed',
    borrowerTaxRate: 0.25,
    loanStartDate: '2024-01-01',
    paymentsMade: 12,
    monthsSinceLoanStart: 12,
    currentPrincipalBalance: 395000,
    marketLocation: 'Anytown, ST',
    marketCondition: 'growing',
    marketGrowthRate: 0.04,
    propertyAppreciationRate: 0.03,
    ltvThreshold: 0.80,
    paymentHistory: [
      { paymentNumber: 1, paymentDate: '2024-02-01', paymentAmount: 2500, principal: 500, interest: 2000, balance: 399500, onTime: true },
      { paymentNumber: 2, paymentDate: '2024-03-01', paymentAmount: 2500, principal: 505, interest: 1995, balance: 398995, onTime: true },
      { paymentNumber: 3, paymentDate: '2024-04-01', paymentAmount: 2500, principal: 510, interest: 1990, balance: 398485, onTime: true }
    ],
    analysisPeriod: 30,
    inflationRate: 0.03,
    discountRate: 0.05,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  });

  describe('Basic Calculation', () => {
    it('should calculate PMI metrics correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pmiRequired).toBeDefined();
      expect(result.pmiMonthlyPayment).toBeGreaterThanOrEqual(0);
      expect(result.pmiAnnualCost).toBeGreaterThanOrEqual(0);
      expect(result.loanToValueRatio).toBeGreaterThan(0);
      expect(result.loanToValueRatio).toBeLessThan(1);
      expect(result.currentLtvRatio).toBeGreaterThan(0);
      expect(result.currentLtvRatio).toBeLessThan(1);
    });

    it('should calculate loan-to-value ratio correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedLTV = inputs.loanAmount / inputs.propertyValue;
      expect(result.loanToValueRatio).toBeCloseTo(expectedLTV, 4);
    });

    it('should calculate current LTV ratio correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.currentLtvRatio).toBeGreaterThan(0);
      expect(result.currentLtvRatio).toBeLessThan(1);
      expect(result.ltvGap).toBeGreaterThanOrEqual(0);
    });

    it('should calculate equity position correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.equityPosition).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeLessThan(1);
    });
  });

  describe('PMI Analysis', () => {
    it('should calculate PMI monthly payment correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      if (result.pmiRequired) {
        expect(result.pmiMonthlyPayment).toBeGreaterThan(0);
        expect(result.pmiAnnualCost).toBeCloseTo(result.pmiMonthlyPayment * 12, 2);
      }
    });

    it('should calculate PMI total cost', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pmiTotalCost).toBeGreaterThanOrEqual(0);
      expect(result.totalPMICost).toBeGreaterThanOrEqual(0);
    });

    it('should calculate PMI rate correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pmiRate).toBe(inputs.pmiRate);
    });

    it('should handle different PMI types', () => {
      const inputs1 = createValidInputs();
      inputs1.pmiType = 'monthly';

      const inputs2 = createValidInputs();
      inputs2.pmiType = 'single_premium';

      const inputs3 = createValidInputs();
      inputs3.pmiType = 'lender_paid';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);
      const result3 = calculator.calculate(inputs3);

      expect(result1.pmiMonthlyPayment).toBeGreaterThan(0);
      expect(result2.pmiMonthlyPayment).toBe(0);
      expect(result3.pmiMonthlyPayment).toBe(0);
    });
  });

  describe('Payment Analysis', () => {
    it('should calculate monthly payment correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.monthlyPaymentWithoutPMI).toBeGreaterThan(0);
      expect(result.paymentIncrease).toBeGreaterThanOrEqual(0);
      expect(result.paymentIncreasePercentage).toBeGreaterThanOrEqual(0);
    });

    it('should calculate payment increase correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedIncrease = result.monthlyPayment - result.monthlyPaymentWithoutPMI;
      expect(result.paymentIncrease).toBeCloseTo(expectedIncrease, 2);
    });

    it('should calculate payment increase percentage correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedPercentage = result.paymentIncrease / result.monthlyPaymentWithoutPMI;
      expect(result.paymentIncreasePercentage).toBeCloseTo(expectedPercentage, 4);
    });
  });

  describe('Cost Analysis', () => {
    it('should calculate total cost correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.totalLoanCost).toBeGreaterThan(0);
      expect(result.effectiveInterestRate).toBeGreaterThan(inputs.interestRate);
    });

    it('should calculate PMI savings correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pmiSavings).toBeGreaterThanOrEqual(0);
    });

    it('should calculate effective interest rate including PMI', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.effectiveInterestRate).toBeGreaterThan(inputs.interestRate);
    });
  });

  describe('Cancellation Analysis', () => {
    it('should calculate cancellation eligibility', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(typeof result.cancellationEligibility).toBe('boolean');
    });

    it('should calculate cancellation dates', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.automaticCancellationDate).toBeDefined();
      expect(result.requestCancellationDate).toBeDefined();
      expect(result.monthsToAutomaticCancellation).toBeGreaterThanOrEqual(0);
      expect(result.monthsToRequestCancellation).toBeGreaterThanOrEqual(0);
    });

    it('should calculate months to cancellation correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.monthsToAutomaticCancellation).toBeGreaterThanOrEqual(0);
      expect(result.monthsToRequestCancellation).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Break-Even Analysis', () => {
    it('should calculate break-even metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.breakEvenPoint).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenCost).toBeGreaterThanOrEqual(0);
      expect(result.netSavings).toBeGreaterThanOrEqual(0);
    });

    it('should calculate break-even months correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.breakEvenMonths).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenCost).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate risk score', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
    });

    it('should calculate probability of cancellation', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.probabilityOfCancellation).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfCancellation).toBeLessThanOrEqual(1);
    });

    it('should calculate scenario analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.worstCaseScenario).toBeGreaterThanOrEqual(0);
      expect(result.bestCaseScenario).toBeGreaterThanOrEqual(0);
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

    it('should adjust risk score for different LTV ratios', () => {
      const inputs1 = createValidInputs();
      inputs1.currentPrincipalBalance = inputs1.propertyValue * 0.70; // 70% LTV

      const inputs2 = createValidInputs();
      inputs2.currentPrincipalBalance = inputs2.propertyValue * 0.90; // 90% LTV

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.riskScore).toBeLessThan(result2.riskScore);
    });
  });

  describe('Tax Analysis', () => {
    it('should calculate tax metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.taxDeduction).toBeGreaterThanOrEqual(0);
      expect(result.afterTaxCost).toBeGreaterThanOrEqual(0);
      expect(result.taxBenefit).toBeGreaterThanOrEqual(0);
    });

    it('should calculate after-tax cost correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedAfterTaxCost = result.pmiAnnualCost - result.taxDeduction;
      expect(result.afterTaxCost).toBeCloseTo(expectedAfterTaxCost, 2);
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.pmiRating).toBeDefined();
      expect(result.analysis.costRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should include timeline analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.timelineAnalysis).toBeDefined();
      expect(Array.isArray(result.timelineAnalysis)).toBe(true);
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

    it('should include comparison analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.comparisonAnalysis).toBeDefined();
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
    });

    it('should include market analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.marketAnalysis).toBeDefined();
      expect(Array.isArray(result.marketAnalysis)).toBe(true);
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

    it('should throw error for invalid PMI type', () => {
      const inputs = createValidInputs();
      inputs.pmiType = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid payment history', () => {
      const inputs = createValidInputs();
      inputs.paymentHistory = [];

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });
  });

  describe('PMI Rating', () => {
    it('should rate PMI correctly based on requirement', () => {
      const inputs1 = createValidInputs();
      inputs1.pmiRequired = false;

      const inputs2 = createValidInputs();
      inputs2.pmiRequired = true;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.analysis.pmiRating).toBe('Not Required');
      expect(result2.analysis.pmiRating).toBe('Required');
    });

    it('should rate cost correctly based on annual cost', () => {
      const inputs1 = createValidInputs();
      inputs1.pmiRate = 0.001; // Low rate

      const inputs2 = createValidInputs();
      inputs2.pmiRate = 0.01; // High rate

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.analysis.costRating).toBe('Low Cost');
      expect(result2.analysis.costRating).toBe('High Cost');
    });
  });

  describe('Recommendations', () => {
    it('should recommend cancellation for eligible borrowers', () => {
      const inputs = createValidInputs();
      inputs.currentPrincipalBalance = inputs.propertyValue * 0.75; // 75% LTV
      inputs.paymentsMade = 30; // 2.5 years of payments

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Cancel PMI');
    });

    it('should recommend keeping PMI for ineligible borrowers', () => {
      const inputs = createValidInputs();
      inputs.currentPrincipalBalance = inputs.propertyValue * 0.85; // 85% LTV
      inputs.paymentsMade = 12; // 1 year of payments

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Requires Review');
    });
  });
});