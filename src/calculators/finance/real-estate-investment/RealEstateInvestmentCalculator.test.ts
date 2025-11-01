import { describe, it, expect } from 'vitest';
import { calculateRealEstateInvestment } from './formulas';
import { validateRealEstateInvestmentInputs } from './validation';
import { quickValidatePurchasePrice, quickValidateDownPayment, quickValidateMonthlyRent } from './quickValidation';
import { RealEstateInvestmentInputs } from './types';

describe('Real Estate Investment Calculator', () => {
  const validInputs: RealEstateInvestmentInputs = {
    propertyType: 'single-family',
    purchasePrice: 300000,
    downPayment: 60000,
    closingCosts: 9000,
    renovationCosts: 15000,
    loanType: 'conventional',
    interestRate: 4.5,
    loanTerm: 30,
    points: 1,
    monthlyRent: 2500,
    otherIncome: 200,
    vacancyRate: 5,
    propertyTax: 3600,
    insurance: 1200,
    hoaFees: 0,
    propertyManagement: 0,
    maintenance: 3000,
    utilities: 0,
    landscaping: 600,
    pestControl: 300,
    appreciationRate: 3,
    rentGrowthRate: 2,
    expenseGrowthRate: 1.5,
    holdingPeriod: 10,
    sellingCosts: 18000,
    location: 'b',
    marketCondition: 'stable',
    propertyAge: 15,
    condition: 'good',
    zoning: 'residential',
    taxRate: 25,
    depreciationRecapture: false,
    section1031: false,
    shortTermRental: false,
    airbnbPotential: false
  };

  describe('calculateRealEstateInvestment', () => {
    it('should calculate basic investment metrics correctly', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.totalInvestment).toBeGreaterThan(0);
      expect(result.monthlyCashFlow).toBeDefined();
      expect(result.annualCashFlow).toBeDefined();
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.capRate).toBeGreaterThan(0);
      expect(result.grossRentMultiplier).toBeGreaterThan(0);
    });

    it('should calculate ROI metrics correctly', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.totalROI).toBeGreaterThan(0);
      expect(result.annualizedROI).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeGreaterThan(0);
    });

    it('should handle different property types', () => {
      const singleFamilyInputs = { ...validInputs, propertyType: 'single-family' as const };
      const multiFamilyInputs = { ...validInputs, propertyType: 'multi-family' as const };
      const commercialInputs = { ...validInputs, propertyType: 'commercial' as const };
      
      const singleFamilyResult = calculateRealEstateInvestment(singleFamilyInputs);
      const multiFamilyResult = calculateRealEstateInvestment(multiFamilyInputs);
      const commercialResult = calculateRealEstateInvestment(commercialInputs);
      
      expect(singleFamilyResult.cashOnCashReturn).toBeDefined();
      expect(multiFamilyResult.cashOnCashReturn).toBeDefined();
      expect(commercialResult.cashOnCashReturn).toBeDefined();
    });

    it('should handle different market conditions', () => {
      const hotMarketInputs = { ...validInputs, marketCondition: 'hot' as const, appreciationRate: 8 };
      const decliningMarketInputs = { ...validInputs, marketCondition: 'declining' as const, appreciationRate: -2 };
      
      const hotMarketResult = calculateRealEstateInvestment(hotMarketInputs);
      const decliningMarketResult = calculateRealEstateInvestment(decliningMarketInputs);
      
      expect(hotMarketResult.totalROI).toBeGreaterThan(decliningMarketResult.totalROI);
    });

    it('should calculate risk metrics correctly', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.debtServiceCoverageRatio).toBeGreaterThan(0);
      expect(result.loanToValueRatio).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it('should generate five-year projection', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.fiveYearProjection).toHaveLength(5);
      expect(result.fiveYearProjection[0]).toHaveProperty('year');
      expect(result.fiveYearProjection[0]).toHaveProperty('marketValue');
      expect(result.fiveYearProjection[0]).toHaveProperty('equity');
      expect(result.fiveYearProjection[0]).toHaveProperty('cashFlow');
      expect(result.fiveYearProjection[0]).toHaveProperty('totalReturn');
    });

    it('should calculate exit analysis correctly', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.saleProceeds).toBeGreaterThan(0);
      expect(result.totalProfit).toBeDefined();
      expect(result.profitMargin).toBeGreaterThan(0);
    });

    it('should generate comprehensive report', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.report).toContain('Real Estate Investment Analysis Report');
      expect(result.report).toContain('Property Overview');
      expect(result.report).toContain('Key Financial Metrics');
      expect(result.report).toContain('Investment Analysis');
    });

    it('should provide recommendations and analysis', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.recommendations).toHaveLength.greaterThan(0);
      expect(result.riskFactors).toHaveLength.greaterThan(0);
      expect(result.opportunities).toHaveLength.greaterThan(0);
    });

    it('should compare with market averages', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.marketComparison).toHaveLength.greaterThan(0);
      expect(result.marketComparison[0]).toHaveProperty('metric');
      expect(result.marketComparison[0]).toHaveProperty('yourProperty');
      expect(result.marketComparison[0]).toHaveProperty('marketAverage');
      expect(result.marketComparison[0]).toHaveProperty('percentile');
    });

    it('should provide sensitivity analysis', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      expect(result.sensitivityAnalysis).toHaveLength(3);
      expect(result.sensitivityAnalysis[0]).toHaveProperty('scenario');
      expect(result.sensitivityAnalysis[0]).toHaveProperty('cashOnCashReturn');
      expect(result.sensitivityAnalysis[0]).toHaveProperty('totalROI');
      expect(result.sensitivityAnalysis[0]).toHaveProperty('riskLevel');
    });
  });

  describe('validateRealEstateInvestmentInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateRealEstateInvestmentInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).purchasePrice;
      
      const result = validateRealEstateInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price is required');
    });

    it('should validate purchase price range', () => {
      const lowPriceInputs = { ...validInputs, purchasePrice: 5000 };
      const highPriceInputs = { ...validInputs, purchasePrice: 15000000 };
      
      const lowResult = validateRealEstateInvestmentInputs(lowPriceInputs);
      const highResult = validateRealEstateInvestmentInputs(highPriceInputs);
      
      expect(lowResult.isValid).toBe(false);
      expect(highResult.isValid).toBe(false);
    });

    it('should validate down payment percentage', () => {
      const lowDownPaymentInputs = { ...validInputs, downPayment: 3000 }; // 1% of 300k
      const highDownPaymentInputs = { ...validInputs, downPayment: 200000 }; // 67% of 300k
      
      const lowResult = validateRealEstateInvestmentInputs(lowDownPaymentInputs);
      const highResult = validateRealEstateInvestmentInputs(highDownPaymentInputs);
      
      expect(lowResult.isValid).toBe(false);
      expect(highResult.isValid).toBe(false);
    });

    it('should validate market condition alignment', () => {
      const hotMarketInputs = { ...validInputs, marketCondition: 'hot' as const, appreciationRate: -5 };
      const decliningMarketInputs = { ...validInputs, marketCondition: 'declining' as const, appreciationRate: 10 };
      
      const hotResult = validateRealEstateInvestmentInputs(hotMarketInputs);
      const decliningResult = validateRealEstateInvestmentInputs(decliningMarketInputs);
      
      expect(hotResult.isValid).toBe(false);
      expect(decliningResult.isValid).toBe(false);
    });

    it('should validate property condition and age alignment', () => {
      const poorConditionInputs = { ...validInputs, condition: 'poor' as const, propertyAge: 5 };
      const excellentConditionInputs = { ...validInputs, condition: 'excellent' as const, propertyAge: 100 };
      
      const poorResult = validateRealEstateInvestmentInputs(poorConditionInputs);
      const excellentResult = validateRealEstateInvestmentInputs(excellentConditionInputs);
      
      expect(poorResult.isValid).toBe(false);
      expect(excellentResult.isValid).toBe(false);
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidatePurchasePrice', () => {
      it('should validate correct purchase price', () => {
        const result = quickValidatePurchasePrice(300000);
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid purchase price', () => {
        const result = quickValidatePurchasePrice(5000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least $10,000');
      });

      it('should reject non-numeric values', () => {
        const result = quickValidatePurchasePrice('invalid');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('valid number');
      });
    });

    describe('quickValidateDownPayment', () => {
      it('should validate correct down payment', () => {
        const result = quickValidateDownPayment(60000, { purchasePrice: 300000 });
        expect(result.isValid).toBe(true);
      });

      it('should validate down payment percentage', () => {
        const result = quickValidateDownPayment(3000, { purchasePrice: 300000 });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least 3%');
      });

      it('should reject excessive down payment', () => {
        const result = quickValidateDownPayment(200000, { purchasePrice: 300000 });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('not exceed 50%');
      });
    });

    describe('quickValidateMonthlyRent', () => {
      it('should validate correct monthly rent', () => {
        const result = quickValidateMonthlyRent(2500);
        expect(result.isValid).toBe(true);
      });

      it('should validate rent for property type and location', () => {
        const result = quickValidateMonthlyRent(500, { propertyType: 'single-family', location: 'a' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seems low');
      });

      it('should reject excessive rent', () => {
        const result = quickValidateMonthlyRent(15000, { propertyType: 'single-family', location: 'd' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seems high');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle cash purchase scenario', () => {
      const cashInputs = { ...validInputs, loanType: 'cash' as const, downPayment: 300000, interestRate: 0 };
      const result = calculateRealEstateInvestment(cashInputs);
      
      expect(result.totalInvestment).toBe(324000); // down + closing + renovation
      expect(result.monthlyCashFlow).toBeGreaterThan(0);
    });

    it('should handle high appreciation scenario', () => {
      const highAppreciationInputs = { ...validInputs, appreciationRate: 15 };
      const result = calculateRealEstateInvestment(highAppreciationInputs);
      
      expect(result.totalROI).toBeGreaterThan(validInputs.appreciationRate);
    });

    it('should handle negative cash flow scenario', () => {
      const negativeCashFlowInputs = { ...validInputs, monthlyRent: 1500, maintenance: 10000 };
      const result = calculateRealEstateInvestment(negativeCashFlowInputs);
      
      expect(result.monthlyCashFlow).toBeLessThan(0);
      expect(result.cashOnCashReturn).toBeLessThan(0);
    });

    it('should handle short holding period', () => {
      const shortHoldingInputs = { ...validInputs, holdingPeriod: 2 };
      const result = calculateRealEstateInvestment(shortHoldingInputs);
      
      expect(result.paybackPeriod).toBeGreaterThan(2);
    });

    it('should handle high vacancy rate', () => {
      const highVacancyInputs = { ...validInputs, vacancyRate: 20 };
      const result = calculateRealEstateInvestment(highVacancyInputs);
      
      expect(result.monthlyCashFlow).toBeLessThan(validInputs.monthlyRent * 0.8);
    });
  });

  describe('Performance Tests', () => {
    it('should handle complex calculations efficiently', () => {
      const complexInputs = { 
        ...validInputs, 
        propertyType: 'commercial',
        purchasePrice: 2000000,
        monthlyRent: 15000,
        renovationCosts: 500000
      };
      
      const startTime = Date.now();
      const result = calculateRealEstateInvestment(complexInputs);
      const endTime = Date.now();
      
      expect(result.totalROI).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle all property types', () => {
      const propertyTypes = ['single-family', 'multi-family', 'condo', 'commercial', 'industrial'];
      
      propertyTypes.forEach(type => {
        const inputs = { ...validInputs, propertyType: type as any };
        const result = calculateRealEstateInvestment(inputs);
        expect(result.cashOnCashReturn).toBeDefined();
      });
    });
  });

  describe('Market Analysis', () => {
    it('should provide accurate market comparison', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      const cashOnCashComparison = result.marketComparison.find(comp => comp.metric === 'CashOnCash Return');
      expect(cashOnCashComparison?.yourProperty).toBe(result.cashOnCashReturn);
      expect(cashOnCashComparison?.marketAverage).toBeGreaterThan(0);
    });

    it('should calculate risk score based on multiple factors', () => {
      const lowRiskInputs = { ...validInputs, location: 'a' as const, condition: 'excellent' as const, marketCondition: 'stable' as const };
      const highRiskInputs = { ...validInputs, location: 'd' as const, condition: 'poor' as const, marketCondition: 'declining' as const };
      
      const lowRiskResult = calculateRealEstateInvestment(lowRiskInputs);
      const highRiskResult = calculateRealEstateInvestment(highRiskInputs);
      
      expect(lowRiskResult.riskScore).toBeLessThan(highRiskResult.riskScore);
    });

    it('should provide realistic sensitivity analysis', () => {
      const result = calculateRealEstateInvestment(validInputs);
      
      const optimistic = result.sensitivityAnalysis.find(scenario => scenario.scenario.includes('Optimistic'));
      const pessimistic = result.sensitivityAnalysis.find(scenario => scenario.scenario.includes('Pessimistic'));
      
      expect(optimistic?.cashOnCashReturn).toBeGreaterThan(result.cashOnCashReturn);
      expect(pessimistic?.cashOnCashReturn).toBeLessThan(result.cashOnCashReturn);
    });
  });
});
