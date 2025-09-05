import { PMICancellationCalculator } from './PMICancellationCalculator';
import { PMICancellationInputs } from './types';

describe('PMICancellationCalculator', () => {
  let calculator: PMICancellationCalculator;

  beforeEach(() => {
    calculator = new PMICancellationCalculator();
  });

  const createValidInputs = (): PMICancellationInputs => ({
    originalLoanAmount: 400000,
    currentLoanBalance: 350000,
    interestRate: 0.045,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    originalPropertyValue: 500000,
    currentPropertyValue: 550000,
    propertyAddress: '123 Main St, Anytown, ST 12345',
    propertyType: 'single_family',
    propertySize: 2500,
    propertyAge: 5,
    pmiRate: 0.005,
    pmiMonthlyPayment: 200,
    pmiStartDate: '2022-01-01',
    pmiCancellationDate: '2024-01-01',
    pmiCancellationMethod: 'request',
    loanStartDate: '2022-01-01',
    originalDownPayment: 100000,
    originalDownPaymentPercentage: 0.2,
    paymentsMade: 24,
    monthsSinceLoanStart: 24,
    appraisalValue: 550000,
    appraisalDate: '2024-01-01',
    appraisalCost: 500,
    appraisalRequired: true,
    marketLocation: 'Anytown, ST',
    marketCondition: 'growing',
    marketGrowthRate: 0.04,
    comparableSales: [
      { address: '456 Oak St', salePrice: 540000, saleDate: '2023-12-01', condition: 'good' },
      { address: '789 Pine St', salePrice: 560000, saleDate: '2023-11-01', condition: 'excellent' }
    ],
    borrowerIncome: 120000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 0.35,
    borrowerEmploymentType: 'employed',
    ltvThreshold: 0.8,
    paymentHistory: [
      { paymentNumber: 1, paymentDate: '2022-02-01', paymentAmount: 2027, principal: 527, interest: 1500, balance: 399473, onTime: true },
      { paymentNumber: 2, paymentDate: '2022-03-01', paymentAmount: 2027, principal: 529, interest: 1498, balance: 398944, onTime: true }
    ],
    analysisPeriod: 12,
    inflationRate: 0.03,
    propertyAppreciationRate: 0.03,
    discountRate: 0.05,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  });

  describe('Basic Calculation', () => {
    it('should calculate PMI cancellation metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.pmiEligibility).toBeDefined();
      expect(result.currentLtvRatio).toBeGreaterThan(0);
      expect(result.monthlyPMISavings).toBeGreaterThan(0);
      expect(result.totalPMISavings).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
    });

    it('should calculate LTV ratio correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedLtv = inputs.currentLoanBalance / inputs.currentPropertyValue;
      expect(result.currentLtvRatio).toBeCloseTo(expectedLtv, 4);
    });

    it('should calculate PMI savings correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.monthlyPMISavings).toBe(inputs.pmiMonthlyPayment);
      expect(result.totalPMISavings).toBeGreaterThan(0);
    });

    it('should calculate timeline correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.automaticCancellationDate).toBeDefined();
      expect(result.requestCancellationDate).toBeDefined();
      expect(result.monthsToAutomaticCancellation).toBeGreaterThanOrEqual(0);
      expect(result.monthsToRequestCancellation).toBeGreaterThanOrEqual(0);
    });
  });

  describe('PMI Eligibility', () => {
    it('should identify eligible PMI cancellation', () => {
      const inputs = createValidInputs();
      inputs.currentLoanBalance = 400000; // 80% LTV
      inputs.currentPropertyValue = 500000;
      
      const result = calculator.calculate(inputs);
      expect(result.pmiEligibility).toBe(true);
    });

    it('should identify ineligible PMI cancellation', () => {
      const inputs = createValidInputs();
      inputs.currentLoanBalance = 450000; // 90% LTV
      inputs.currentPropertyValue = 500000;
      
      const result = calculator.calculate(inputs);
      expect(result.pmiEligibility).toBe(false);
    });

    it('should handle FHA loans correctly', () => {
      const inputs = createValidInputs();
      inputs.loanType = 'fha';
      inputs.currentLoanBalance = 400000;
      inputs.currentPropertyValue = 500000;
      
      const result = calculator.calculate(inputs);
      expect(result.pmiEligibility).toBe(false); // FHA loans typically don't allow PMI cancellation
    });
  });

  describe('Validation', () => {
    it('should throw error for negative loan amount', () => {
      const inputs = createValidInputs();
      inputs.originalLoanAmount = -100000;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid loan type', () => {
      const inputs = createValidInputs();
      inputs.loanType = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for current balance exceeding original loan', () => {
      const inputs = createValidInputs();
      inputs.currentLoanBalance = 500000;
      inputs.originalLoanAmount = 400000;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid interest rate', () => {
      const inputs = createValidInputs();
      inputs.interestRate = 1.5;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.cancellationRating).toBeDefined();
      expect(result.analysis.savingsRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should include timeline analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.timelineAnalysis).toBeDefined();
      expect(Array.isArray(result.timelineAnalysis)).toBe(true);
      expect(result.timelineAnalysis.length).toBeGreaterThan(0);
    });

    it('should include comparison analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.comparisonAnalysis).toBeDefined();
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
    });

    it('should include scenario analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.scenarios).toBeDefined();
      expect(Array.isArray(result.scenarios)).toBe(true);
      expect(result.scenarios.length).toBeGreaterThan(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate risk score based on factors', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
      expect(result.probabilityOfCancellation).toBeGreaterThan(0);
      expect(result.probabilityOfCancellation).toBeLessThanOrEqual(1);
    });

    it('should adjust risk score for declining market', () => {
      const inputs = createValidInputs();
      inputs.marketCondition = 'declining';
      inputs.propertyAppreciationRate = -0.02;

      const result = calculator.calculate(inputs);
      expect(result.riskScore).toBeGreaterThan(0.3);
    });

    it('should adjust risk score for high LTV', () => {
      const inputs = createValidInputs();
      inputs.currentLoanBalance = 450000;
      inputs.currentPropertyValue = 500000;

      const result = calculator.calculate(inputs);
      expect(result.riskScore).toBeGreaterThan(0.2);
    });
  });

  describe('Break-Even Analysis', () => {
    it('should calculate break-even months', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenCost).toBeGreaterThan(0);
      expect(result.netSavings).toBeGreaterThan(0);
    });

    it('should handle high appraisal costs', () => {
      const inputs = createValidInputs();
      inputs.appraisalCost = 1000;
      inputs.appraisalRequired = true;

      const result = calculator.calculate(inputs);
      expect(result.breakEvenCost).toBeGreaterThan(500);
    });
  });

  describe('Market Analysis', () => {
    it('should analyze market conditions', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.marketAnalysis).toBeDefined();
      expect(Array.isArray(result.marketAnalysis)).toBe(true);
      expect(result.marketAnalysis.length).toBeGreaterThan(0);
    });

    it('should adjust for different market conditions', () => {
      const inputs1 = createValidInputs();
      inputs1.marketCondition = 'growing';
      inputs1.marketGrowthRate = 0.05;

      const inputs2 = createValidInputs();
      inputs2.marketCondition = 'declining';
      inputs2.marketGrowthRate = -0.02;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.riskScore).toBeLessThan(result2.riskScore);
    });
  });

  describe('Sensitivity Analysis', () => {
    it('should generate sensitivity matrix', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.sensitivityMatrix).toBeDefined();
      expect(Array.isArray(result.sensitivityMatrix)).toBe(true);
      expect(result.sensitivityMatrix.length).toBeGreaterThan(0);
    });

    it('should show impact of property appreciation changes', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const appreciationSensitivity = result.sensitivityMatrix.find(
        item => item.variable === 'Property Appreciation Rate'
      );
      expect(appreciationSensitivity).toBeDefined();
      expect(appreciationSensitivity.values.length).toBe(3);
      expect(appreciationSensitivity.impacts.length).toBe(3);
    });
  });
});