import { OpportunityZoneInvestmentCalculator } from './OpportunityZoneInvestmentCalculator';
import { OpportunityZoneInvestmentInputs } from './types';

describe('OpportunityZoneInvestmentCalculator', () => {
  let calculator: OpportunityZoneInvestmentCalculator;

  beforeEach(() => {
    calculator = new OpportunityZoneInvestmentCalculator();
  });

  const createValidInputs = (): OpportunityZoneInvestmentInputs => ({
    investmentAmount: 1000000,
    investmentDate: '2024-01-01',
    investmentType: 'real_estate',
    investmentStructure: 'direct',
    propertyValue: 1200000,
    propertyAddress: '123 Main St, Opportunity City, ST 12345',
    propertyType: 'multifamily',
    propertySize: 50000,
    propertyAge: 10,
    numberOfUnits: 50,
    opportunityZoneLocation: 'Opportunity City, ST',
    opportunityZoneDesignation: 'OZ-001',
    opportunityZoneTier: 'tier_1',
    opportunityZoneBenefits: [
      { benefit: 'Tax Deferral', applicable: true, details: 'Defer capital gains until 2026' },
      { benefit: 'Tax Exclusion', applicable: true, details: 'Exclude appreciation after 10 years' },
      { benefit: 'Basis Step-Up', applicable: true, details: '10% basis increase after 5 years' }
    ],
    originalGainAmount: 500000,
    originalGainDate: '2023-12-01',
    originalGainType: 'capital_gain',
    investorTaxRate: 0.37,
    stateTaxRate: 0.05,
    localTaxRate: 0.02,
    investmentPeriod: 10,
    deferralPeriod: 2,
    exclusionPeriod: 10,
    basisStepUpPeriod: 5,
    exitDate: '2034-01-01',
    revenueProjections: [
      { year: 1, revenue: 600000, expenses: 300000, noi: 300000, appreciation: 0.03 },
      { year: 2, revenue: 618000, expenses: 309000, noi: 309000, appreciation: 0.03 },
      { year: 3, revenue: 636540, expenses: 318270, noi: 318270, appreciation: 0.03 },
      { year: 4, revenue: 655636, expenses: 327819, noi: 327817, appreciation: 0.03 },
      { year: 5, revenue: 675305, expenses: 337653, noi: 337652, appreciation: 0.03 },
      { year: 6, revenue: 695564, expenses: 347782, noi: 347782, appreciation: 0.03 },
      { year: 7, revenue: 716431, expenses: 358216, noi: 358215, appreciation: 0.03 },
      { year: 8, revenue: 737924, expenses: 368962, noi: 368962, appreciation: 0.03 },
      { year: 9, revenue: 760062, expenses: 380031, noi: 380031, appreciation: 0.03 },
      { year: 10, revenue: 782864, expenses: 391432, noi: 391432, appreciation: 0.03 }
    ],
    taxDeferral: true,
    taxExclusion: true,
    basisStepUp: true,
    deferralPercentage: 1.0,
    exclusionPercentage: 1.0,
    basisStepUpPercentage: 0.1,
    expectedAnnualReturn: 0.12,
    expectedAppreciation: 0.03,
    expectedCashFlow: 300000,
    expectedExitValue: 1600000,
    marketLocation: 'Opportunity City, ST',
    marketCondition: 'growing',
    marketGrowthRate: 0.05,
    comparableInvestments: [
      { investment: 'Traditional Real Estate', roi: 0.10, irr: 0.08, capRate: 0.06 },
      { investment: 'REIT', roi: 0.08, irr: 0.07, capRate: 0.05 }
    ],
    marketRisk: 'medium',
    regulatoryRisk: 'low',
    liquidityRisk: 'high',
    developmentRisk: 'low',
    analysisPeriod: 10,
    inflationRate: 0.03,
    discountRate: 0.10,
    taxDeductionPeriod: 10,
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true
  });

  describe('Basic Calculation', () => {
    it('should calculate Opportunity Zone investment metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.totalTaxBenefit).toBeGreaterThan(0);
      expect(result.afterTaxReturn).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
    });

    it('should calculate tax benefits correctly', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.taxDeferralBenefit).toBeGreaterThan(0);
      expect(result.taxExclusionBenefit).toBeGreaterThan(0);
      expect(result.basisStepUpBenefit).toBeGreaterThan(0);
      expect(result.totalTaxBenefit).toBe(result.taxDeferralBenefit + result.taxExclusionBenefit + result.basisStepUpBenefit);
    });

    it('should calculate cash flow metrics', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.totalCashFlow).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.equityMultiple).toBeGreaterThan(1);
    });
  });

  describe('Validation', () => {
    it('should throw error for negative investment amount', () => {
      const inputs = createValidInputs();
      inputs.investmentAmount = -1000000;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for invalid investment type', () => {
      const inputs = createValidInputs();
      inputs.investmentType = 'invalid' as any;

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for investment date before gain date', () => {
      const inputs = createValidInputs();
      inputs.investmentDate = '2023-01-01';
      inputs.originalGainDate = '2023-12-01';

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for investment more than 180 days after gain', () => {
      const inputs = createValidInputs();
      inputs.investmentDate = '2024-07-01';
      inputs.originalGainDate = '2023-12-01';

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.investmentRating).toBeDefined();
      expect(result.analysis.taxBenefitRating).toBeDefined();
      expect(result.analysis.recommendation).toBeDefined();
      expect(result.analysis.keyStrengths).toBeDefined();
      expect(result.analysis.keyWeaknesses).toBeDefined();
    });

    it('should include comparison analysis', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.comparisonAnalysis).toBeDefined();
      expect(Array.isArray(result.comparisonAnalysis)).toBe(true);
      expect(result.comparisonAnalysis.length).toBeGreaterThan(0);
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
  });

  describe('Risk Assessment', () => {
    it('should calculate risk score based on risk factors', () => {
      const inputs = createValidInputs();
      const result = calculator.calculate(inputs);

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(1);
      expect(result.probabilityOfSuccess).toBeGreaterThan(0);
      expect(result.probabilityOfSuccess).toBeLessThanOrEqual(1);
    });

    it('should adjust risk score for high-risk factors', () => {
      const inputs = createValidInputs();
      inputs.marketRisk = 'high';
      inputs.regulatoryRisk = 'high';
      inputs.liquidityRisk = 'high';
      inputs.developmentRisk = 'high';

      const result = calculator.calculate(inputs);
      expect(result.riskScore).toBeGreaterThan(0.5);
    });
  });

  describe('Tax Benefits', () => {
    it('should calculate higher tax benefits for higher tax rates', () => {
      const inputs1 = createValidInputs();
      inputs1.investorTaxRate = 0.20;

      const inputs2 = createValidInputs();
      inputs2.investorTaxRate = 0.40;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result2.totalTaxBenefit).toBeGreaterThan(result1.totalTaxBenefit);
    });

    it('should calculate tax benefits for different investment periods', () => {
      const inputs1 = createValidInputs();
      inputs1.investmentPeriod = 5;

      const inputs2 = createValidInputs();
      inputs2.investmentPeriod = 15;

      const result1 = calculator.calculate(inputs1);
      const result2 = calculator.calculate(inputs2);

      expect(result2.taxExclusionBenefit).toBeGreaterThan(result1.taxExclusionBenefit);
    });
  });
});