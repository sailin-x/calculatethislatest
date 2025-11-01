import { AccretionDilutionCalculator } from './AccretionDilutionCalculator';
import { calculateAccretionDilution } from './formulas';
import { AccretionDilutionInputs } from './types';

describe('AccretionDilutionCalculator', () => {
  const validInputs: AccretionDilutionInputs = {
    // Target Company
    targetRevenue: 500000000,
    targetEBITDA: 100000000,
    targetNetIncome: 50000000,
    targetSharesOutstanding: 50000000,
    targetSharePrice: 45.00,
    targetDebt: 200000000,
    targetCash: 50000000,
    
    // Acquirer Company
    acquirerRevenue: 2000000000,
    acquirerEBITDA: 400000000,
    acquirerNetIncome: 200000000,
    acquirerSharesOutstanding: 100000000,
    acquirerSharePrice: 80.00,
    acquirerDebt: 800000000,
    acquirerCash: 300000000,
    
    // Deal Structure
    purchasePrice: 2750000000,
    cashPortion: 60,
    stockPortion: 40,
    debtFinancing: 1000000000,
    
    // Transaction Details
    transactionCosts: 50000000,
    integrationCosts: 100000000,
    synergiesRevenue: 75000000,
    synergiesCost: 125000000,
    synergyRampPeriod: 3,
    
    // Financing Terms
    debtInterestRate: 5.5,
    taxRate: 25,
    
    // Analysis Parameters
    analysisYears: 5,
    discountRate: 10,
    terminalGrowthRate: 3,
    
    // Premium Analysis
    controlPremium: 25,
    marketMultiple: 12,
    
    // Deal Type
    dealType: 'acquisition',
    paymentMethod: 'mixed'
  };

  describe('Calculator Definition', () => {
    test('should have correct calculator properties', () => {
      expect(AccretionDilutionCalculator.id).toBe('AccretionDilutionCalculator');
      expect(AccretionDilutionCalculator.name).toBe('Accretion/Dilution (M&A) Model Calculator');
      expect(AccretionDilutionCalculator.category).toBe('finance');
      expect(AccretionDilutionCalculator.subcategory).toBe('investment');
    });

    test('should have comprehensive inputs', () => {
      expect(AccretionDilutionCalculator.inputs).toHaveLength(34);
      
      // Check key inputs exist
      const inputIds = AccretionDilutionCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('targetRevenue');
      expect(inputIds).toContain('acquirerRevenue');
      expect(inputIds).toContain('purchasePrice');
      expect(inputIds).toContain('synergiesRevenue');
      expect(inputIds).toContain('synergiesCost');
    });

    test('should have comprehensive outputs', () => {
      expect(AccretionDilutionCalculator.outputs).toHaveLength(26);
      
      // Check key outputs exist
      const outputIds = AccretionDilutionCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('epsAccretionDilution');
      expect(outputIds).toContain('totalSynergies');
      expect(outputIds).toContain('internalRateOfReturn');
      expect(outputIds).toContain('proFormaEPS');
    });

    test('should have formulas defined', () => {
      expect(AccretionDilutionCalculator.formulas).toHaveLength(8);
      expect(AccretionDilutionCalculator.formulas[0].name).toBe('Enterprise Value');
    });
  });

  describe('Calculation Function', () => {
    test('should calculate basic metrics correctly', () => {
      const result = calculateAccretionDilution(validInputs);
      
      // Check enterprise values
      expect(result.targetEnterpriseValue).toBeGreaterThan(0);
      expect(result.acquirerEnterpriseValue).toBeGreaterThan(0);
      
      // Check transaction metrics
      expect(result.totalTransactionValue).toBe(validInputs.purchasePrice + validInputs.transactionCosts);
      expect(result.premiumPaid).toBeGreaterThan(0);
      expect(result.premiumPercentage).toBeGreaterThan(0);
    });

    test('should calculate pro forma metrics correctly', () => {
      const result = calculateAccretionDilution(validInputs);
      
      // Pro forma revenue should be sum of both companies
      expect(result.proFormaRevenue).toBe(validInputs.acquirerRevenue + validInputs.targetRevenue);
      
      // Pro forma EBITDA should include synergies
      expect(result.proFormaEBITDA).toBeGreaterThan(validInputs.acquirerEBITDA + validInputs.targetEBITDA);
      
      // Pro forma shares should include new shares issued
      expect(result.proFormaSharesOutstanding).toBeGreaterThan(validInputs.acquirerSharesOutstanding);
    });

    test('should calculate accretion/dilution correctly', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(typeof result.epsAccretionDilution).toBe('number');
      expect(result.epsBreakevenPrice).toBeGreaterThan(0);
    });

    test('should calculate synergy metrics correctly', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.totalSynergies).toBe(validInputs.synergiesRevenue + validInputs.synergiesCost);
      expect(result.netPresentValueSynergies).toBeGreaterThan(0);
      expect(result.synergyMultiple).toBeGreaterThan(0);
    });

    test('should calculate returns metrics correctly', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
    });

    test('should calculate financing impact correctly', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.proFormaLeverage).toBeGreaterThan(0);
      expect(result.interestCoverageRatio).toBeGreaterThan(0);
    });

    test('should handle edge cases', () => {
      // Test with minimal synergies
      const minimalSynergiesInputs = {
        ...validInputs,
        synergiesRevenue: 0,
        synergiesCost: 1000000
      };
      
      const result = calculateAccretionDilution(minimalSynergiesInputs);
      expect(result.totalSynergies).toBe(1000000);
      expect(result.epsAccretionDilution).toBeDefined();
    });

    test('should handle all-cash transaction', () => {
      const allCashInputs = {
        ...validInputs,
        cashPortion: 100,
        stockPortion: 0,
        paymentMethod: 'cash' as const
      };
      
      const result = calculateAccretionDilution(allCashInputs);
      expect(result.newSharesIssued).toBe(0);
      expect(result.proFormaSharesOutstanding).toBe(validInputs.acquirerSharesOutstanding);
    });

    test('should handle all-stock transaction', () => {
      const allStockInputs = {
        ...validInputs,
        cashPortion: 0,
        stockPortion: 100,
        paymentMethod: 'stock' as const
      };
      
      const result = calculateAccretionDilution(allStockInputs);
      expect(result.newSharesIssued).toBeGreaterThan(0);
      expect(result.proFormaSharesOutstanding).toBeGreaterThan(validInputs.acquirerSharesOutstanding);
    });
  });

  describe('Analysis Generation', () => {
    test('should generate comprehensive analysis', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.analysis).toBeDefined();
      expect(result.analysis.recommendationRating).toMatch(/Strong Buy|Buy|Hold|Sell|Strong Sell/);
      expect(result.analysis.keyDrivers).toHaveLength(3);
      expect(result.analysis.majorRisks).toHaveLength(4);
      expect(result.analysis.criticalSuccessFactors).toHaveLength(4);
    });

    test('should provide scenario analysis', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.scenarioAnalysis.base).toBeDefined();
      expect(result.scenarioAnalysis.optimistic).toBeGreaterThan(result.scenarioAnalysis.base);
      expect(result.scenarioAnalysis.pessimistic).toBeLessThan(result.scenarioAnalysis.base);
    });

    test('should generate projections', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.projectedMetrics).toHaveLength(5);
      expect(result.projectedMetrics[0].year).toBe(1);
      expect(result.projectedMetrics[4].year).toBe(5);
      
      // Check that projections show growth
      expect(result.projectedMetrics[4].revenue).toBeGreaterThan(result.projectedMetrics[0].revenue);
    });

    test('should assess integration complexity', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.integrationComplexity).toBeGreaterThanOrEqual(1);
      expect(result.integrationComplexity).toBeLessThanOrEqual(10);
      expect(result.culturalFit).toBeGreaterThanOrEqual(1);
      expect(result.culturalFit).toBeLessThanOrEqual(10);
      expect(result.operationalOverlap).toBeGreaterThanOrEqual(1);
      expect(result.operationalOverlap).toBeLessThanOrEqual(10);
    });
  });

  describe('Risk Assessment', () => {
    test('should provide risk profile', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.riskProfile).toHaveLength(4);
      expect(result.riskProfile[0].category).toBe('Integration Risk');
      expect(result.riskProfile[0].probability).toBeGreaterThanOrEqual(0);
      expect(result.riskProfile[0].probability).toBeLessThanOrEqual(100);
      expect(result.riskProfile[0].impact).toBeGreaterThanOrEqual(1);
      expect(result.riskProfile[0].impact).toBeLessThanOrEqual(10);
    });

    test('should identify value drivers', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.valueDrivers).toHaveLength(4);
      expect(result.valueDrivers[0].source).toBe('Cost Synergies');
      expect(result.valueDrivers[0].potential).toBe(validInputs.synergiesCost);
      expect(result.valueDrivers[0].probability).toBeGreaterThan(0);
    });
  });

  describe('Quality Metrics', () => {
    test('should provide confidence and accuracy metrics', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.confidenceLevel).toBeGreaterThanOrEqual(50);
      expect(result.confidenceLevel).toBeLessThanOrEqual(95);
      expect(result.modelAccuracy).toBeGreaterThanOrEqual(70);
      expect(result.modelAccuracy).toBeLessThanOrEqual(95);
      expect(result.dataQuality).toBeGreaterThanOrEqual(60);
      expect(result.dataQuality).toBeLessThanOrEqual(100);
    });
  });

  describe('Transaction Timeline', () => {
    test('should provide transaction timeline', () => {
      const result = calculateAccretionDilution(validInputs);
      
      expect(result.timeline).toHaveLength(4);
      expect(result.timeline[0].phase).toBe('Due Diligence');
      expect(result.timeline[0].duration).toBe(2);
      expect(result.timeline[0].keyActivities).toContain('Financial analysis');
    });
  });

  describe('Report Generation', () => {
    test('should generate comprehensive report', () => {
      const result = calculateAccretionDilution(validInputs);
      const report = AccretionDilutionCalculator.generateReport!(validInputs, result);
      
      expect(report).toContain('M&A Accretion/Dilution Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Transaction Overview');
      expect(report).toContain('Financial Impact Analysis');
      expect(report).toContain('Synergy Analysis');
      expect(report).toContain('Investment Recommendation');
    });

    test('should include key metrics in report', () => {
      const result = calculateAccretionDilution(validInputs);
      const report = AccretionDilutionCalculator.generateReport!(validInputs, result);
      
      expect(report).toContain(result.epsAccretionDilution.toFixed(1));
      expect(report).toContain(result.premiumPercentage.toFixed(1));
      expect(report).toContain(result.internalRateOfReturn.toFixed(1));
    });
  });

  describe('Error Handling', () => {
    test('should handle zero EBITDA gracefully', () => {
      const zeroEBITDAInputs = {
        ...validInputs,
        targetEBITDA: 0
      };
      
      const result = calculateAccretionDilution(zeroEBITDAInputs);
      expect(result.targetEVEBITDA).toBe(0);
      expect(result.impliedEVEBITDA).toBe(0);
    });

    test('should handle negative net income', () => {
      const negativeIncomeInputs = {
        ...validInputs,
        targetNetIncome: -10000000
      };
      
      const result = calculateAccretionDilution(negativeIncomeInputs);
      expect(result.targetPERatio).toBe(0);
      expect(result.impliedPERatio).toBeDefined();
    });

    test('should handle extreme leverage scenarios', () => {
      const highLeverageInputs = {
        ...validInputs,
        debtFinancing: 5000000000
      };
      
      const result = calculateAccretionDilution(highLeverageInputs);
      expect(result.proFormaLeverage).toBeGreaterThan(10);
      expect(result.interestCoverageRatio).toBeGreaterThan(0);
    });
  });
});
