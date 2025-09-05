import { LoanToCostCalculator } from './LoanToCostCalculator';
import { LoanToCostInputs } from './types';

describe('LoanToCostCalculator', () => {
  let calculator: LoanToCostCalculator;

  beforeEach(() => {
    calculator = new LoanToCostCalculator();
  });

  const createValidInputs = (): LoanToCostInputs => ({
    loanAmount: 800000,
    interestRate: 0.065,
    loanTerm: 24,
    loanType: 'construction',
    paymentType: 'construction_draw',
    projectType: 'residential',
    projectSize: 2500,
    projectAddress: '123 Main St, Anytown, ST 12345',
    projectDescription: 'Single-family home development',
    landCost: 150000,
    constructionCost: 400000,
    softCosts: 75000,
    contingencyCost: 25000,
    totalProjectCost: 650000,
    siteWorkCost: 25000,
    foundationCost: 45000,
    structuralCost: 120000,
    exteriorCost: 80000,
    interiorCost: 100000,
    mechanicalCost: 35000,
    electricalCost: 25000,
    plumbingCost: 20000,
    finishCost: 40000,
    architecturalFees: 20000,
    engineeringFees: 15000,
    permitFees: 5000,
    legalFees: 8000,
    insuranceCost: 12000,
    appraisalFees: 3000,
    surveyFees: 2000,
    environmentalFees: 5000,
    otherSoftCosts: 5000,
    constructionStartDate: '2024-01-01',
    constructionEndDate: '2024-12-31',
    constructionDuration: 12,
    drawSchedule: [
      { draw: 1, percentage: 0.15, amount: 120000, date: '2024-01-15' },
      { draw: 2, percentage: 0.25, amount: 200000, date: '2024-03-15' },
      { draw: 3, percentage: 0.30, amount: 240000, date: '2024-06-15' },
      { draw: 4, percentage: 0.20, amount: 160000, date: '2024-09-15' },
      { draw: 5, percentage: 0.10, amount: 80000, date: '2024-12-15' }
    ],
    borrowerEquity: 200000,
    borrowerExperience: 'moderate',
    borrowerCreditScore: 750,
    borrowerNetWorth: 1000000,
    borrowerLiquidity: 300000,
    marketLocation: 'Anytown, ST',
    marketCondition: 'growing',
    marketGrowthRate: 0.04,
    comparableProjects: [
      { project: 'Oak Street Development', cost: 620000, completionDate: '2023-08-15', performance: 'excellent' },
      { project: 'Pine Avenue Homes', cost: 680000, completionDate: '2023-11-20', performance: 'good' },
      { project: 'Elm Court Project', cost: 640000, completionDate: '2024-02-10', performance: 'excellent' }
    ],
    exitStrategy: 'sell',
    expectedExitValue: 750000,
    expectedExitDate: '2025-01-01',
    exitTimeline: 12,
    constructionRisk: 'medium',
    marketRisk: 'low',
    borrowerRisk: 'low',
    projectRisk: 'medium',
    personalGuarantee: true,
    completionGuarantee: true,
    additionalCollateral: 0,
    crossCollateralization: false,
    analysisPeriod: 24,
    inflationRate: 0.03,
    constructionInflationRate: 0.04,
    discountRate: 0.08,
    currency: 'USD',
    displayFormat: 'percentage',
    includeCharts: true
  });

  describe('Basic Calculation', () => {
    it('should calculate LTC ratio correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.loanToCostRatio).toBeGreaterThan(0);
      expect(result.loanToCostRatio).toBeLessThan(1);
      expect(result.equityContribution).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.leverageRatio).toBeGreaterThan(0);
    });

    it('should calculate LTC ratio as loan amount divided by total project cost', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedLTC = inputs.loanAmount / inputs.totalProjectCost;
      expect(result.loanToCostRatio).toBeCloseTo(expectedLTC, 4);
    });

    it('should calculate equity contribution correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedEquity = inputs.totalProjectCost - inputs.loanAmount;
      expect(result.equityContribution).toBeCloseTo(expectedEquity, 2);
    });

    it('should calculate equity percentage correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedEquityPercentage = (inputs.totalProjectCost - inputs.loanAmount) / inputs.totalProjectCost;
      expect(result.equityPercentage).toBeCloseTo(expectedEquityPercentage, 4);
    });
  });

  describe('Cost Analysis', () => {
    it('should calculate cost breakdown correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.costBreakdown).toBeDefined();
      expect(Array.isArray(result.costBreakdown)).toBe(true);
      expect(result.costBreakdown.length).toBeGreaterThan(0);
    });

    it('should calculate cost per square foot correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      const expectedCostPerSqFt = inputs.totalProjectCost / inputs.projectSize;
      expect(result.costPerSquareFoot).toBeCloseTo(expectedCostPerSqFt, 2);
    });

    it('should calculate cost variance', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.costVariance).toBeDefined();
      expect(typeof result.costVariance).toBe('number');
    });
  });

  describe('Loan Analysis', () => {
    it('should calculate loan metrics correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.loanAmount).toBe(inputs.loanAmount);
      expect(result.loanPercentage).toBeGreaterThan(0);
      expect(result.interestExpense).toBeGreaterThan(0);
      expect(result.totalLoanCost).toBeGreaterThan(inputs.loanAmount);
    });

    it('should calculate construction cash flow', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.constructionCashFlow).toBeDefined();
      expect(Array.isArray(result.constructionCashFlow)).toBe(true);
      expect(result.constructionCashFlow.length).toBe(inputs.drawSchedule.length);
    });

    it('should calculate monthly interest expense', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.monthlyInterestExpense).toBeGreaterThan(0);
      expect(result.totalInterestExpense).toBeGreaterThan(0);
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate risk score', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
    });

    it('should calculate probability of completion', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.probabilityOfCompletion).toBeGreaterThan(0);
      expect(result.probabilityOfCompletion).toBeLessThanOrEqual(1);
    });

    it('should calculate probability of default', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.probabilityOfDefault).toBeGreaterThanOrEqual(0);
      expect(result.probabilityOfDefault).toBeLessThanOrEqual(1);
    });

    it('should calculate expected loss', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.expectedLoss).toBeGreaterThanOrEqual(0);
    });

    it('should adjust risk score for different borrower experience levels', () => {
      const inputs1 = createValidInputs();
      inputs1.borrowerExperience = 'extensive';

      const inputs2 = createValidInputs();
      inputs2.borrowerExperience = 'none';

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result1.riskScore).toBeLessThan(result2.riskScore);
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

  describe('Profitability Analysis', () => {
    it('should calculate expected profit', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.expectedProfit).toBeDefined();
      expect(typeof result.expectedProfit).toBe('number');
    });

    it('should calculate profit margin', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.profitMargin).toBeDefined();
      expect(typeof result.profitMargin).toBe('number');
    });

    it('should calculate return on equity', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.returnOnEquity).toBeDefined();
      expect(typeof result.returnOnEquity).toBe('number');
    });

    it('should calculate return on cost', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.returnOnCost).toBeDefined();
      expect(typeof result.returnOnCost).toBe('number');
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.ltcRating).toBeDefined();
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

    it('should include benchmark analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.industryBenchmarks).toBeDefined();
      expect(Array.isArray(result.industryBenchmarks)).toBe(true);
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

    it('should throw error for missing project address', () => {
      const inputs = createValidInputs();
      inputs.projectAddress = '';

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid loan type', () => {
      const inputs = createValidInputs();
      inputs.loanType = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for loan amount exceeding total project cost', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost + 100000;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid draw schedule', () => {
      const inputs = createValidInputs();
      inputs.drawSchedule = [];

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
  });

  describe('LTC Rating', () => {
    it('should rate excellent LTC ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.65; // 65% LTC

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltcRating).toBe('Excellent');
    });

    it('should rate good LTC ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.72; // 72% LTC

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltcRating).toBe('Good');
    });

    it('should rate average LTC ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.78; // 78% LTC

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltcRating).toBe('Average');
    });

    it('should rate poor LTC ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.82; // 82% LTC

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltcRating).toBe('Poor');
    });

    it('should rate very poor LTC ratio correctly', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.90; // 90% LTC

      const result = calculator.calculate(inputs);
      expect(result.analysis.ltcRating).toBe('Very Poor');
    });
  });

  describe('Risk Rating', () => {
    it('should rate low risk correctly', () => {
      const inputs = createValidInputs();
      inputs.borrowerExperience = 'extensive';
      inputs.borrowerCreditScore = 800;
      inputs.marketCondition = 'hot';
      inputs.constructionRisk = 'low';
      inputs.projectRisk = 'low';

      const result = calculator.calculate(inputs);
      expect(result.analysis.riskRating).toBe('Low');
    });

    it('should rate moderate risk correctly', () => {
      const inputs = createValidInputs();
      inputs.borrowerExperience = 'moderate';
      inputs.borrowerCreditScore = 720;
      inputs.marketCondition = 'growing';
      inputs.constructionRisk = 'medium';
      inputs.projectRisk = 'medium';

      const result = calculator.calculate(inputs);
      expect(result.analysis.riskRating).toBe('Moderate');
    });

    it('should rate high risk correctly', () => {
      const inputs = createValidInputs();
      inputs.borrowerExperience = 'limited';
      inputs.borrowerCreditScore = 650;
      inputs.marketCondition = 'stable';
      inputs.constructionRisk = 'high';
      inputs.projectRisk = 'high';

      const result = calculator.calculate(inputs);
      expect(result.analysis.riskRating).toBe('High');
    });
  });

  describe('Recommendations', () => {
    it('should recommend approval for excellent LTC and low risk', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.65;
      inputs.borrowerExperience = 'extensive';
      inputs.borrowerCreditScore = 800;
      inputs.marketCondition = 'hot';

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Approve');
    });

    it('should recommend conditional approval for average LTC and low risk', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.78;
      inputs.borrowerExperience = 'moderate';
      inputs.borrowerCreditScore = 750;
      inputs.marketCondition = 'growing';

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Conditional');
    });

    it('should recommend rejection for very poor LTC', () => {
      const inputs = createValidInputs();
      inputs.loanAmount = inputs.totalProjectCost * 0.95;

      const result = calculator.calculate(inputs);
      expect(result.analysis.recommendation).toBe('Reject');
    });
  });
});