import { describe, it, expect } from 'vitest';
import { calculateStockOptions } from './formulas';
import { validateStockOptionsInputs } from './validation';
import { quickValidateStrikePrice, quickValidateOptionPrice, quickValidateVolatility } from './quickValidation';
import { StockOptionsInputs } from './types';

describe('Stock Options Calculator', () => {
  const validInputs: StockOptionsInputs = {
    optionType: 'call',
    strikePrice: 100,
    currentStockPrice: 110,
    optionPrice: 15,
    expirationDate: '20241220',
    numberOfContracts: 1,
    contractsPerOption: 100,
    volatility: 30,
    riskFreeRate: 2.5,
    dividendYield: 1.5,
    strategy: 'long-call',
    maxLoss: -1500,
    maxProfit: 5000,
    breakEvenPrice: 115,
    daysToExpiration: 45,
    timeValue: 5,
    intrinsicValue: 10,
    delta: 0.7,
    gamma: 0.02,
    theta: -0.5,
    vega: 0.3,
    rho: 0.1,
    portfolioValue: 100000,
    positionSize: 1500,
    marginRequirement: 0,
    priceScenarios: []
  };

  describe('calculateStockOptions', () => {
    it('should calculate basic option metrics correctly', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.totalValue).toBeDefined();
      expect(result.profitLoss).toBeDefined();
      expect(result.returnPercentage).toBeDefined();
      expect(result.intrinsicValue).toBeGreaterThan(0);
      expect(result.timeValue).toBeGreaterThan(0);
    });

    it('should calculate Greeks correctly', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.delta).toBeGreaterThan(-1);
      expect(result.delta).toBeLessThan(1);
      expect(result.gamma).toBeGreaterThan(0);
      expect(result.theta).toBeLessThan(0);
      expect(result.vega).toBeGreaterThan(0);
      expect(result.rho).toBeDefined();
    });

    it('should handle different option types', () => {
      const callInputs = { ...validInputs, optionType: 'call' as const };
      const putInputs = { ...validInputs, optionType: 'put' as const };
      
      const callResult = calculateStockOptions(callInputs);
      const putResult = calculateStockOptions(putInputs);
      
      expect(callResult.delta).toBeGreaterThan(0);
      expect(putResult.delta).toBeLessThan(0);
    });

    it('should handle different strategies', () => {
      const longCallInputs = { ...validInputs, strategy: 'long-call' as const };
      const shortCallInputs = { ...validInputs, strategy: 'short-call' as const };
      const coveredCallInputs = { ...validInputs, strategy: 'covered-call' as const };
      
      const longCallResult = calculateStockOptions(longCallInputs);
      const shortCallResult = calculateStockOptions(shortCallInputs);
      const coveredCallResult = calculateStockOptions(coveredCallInputs);
      
      expect(longCallResult.maxLoss).toBeLessThan(0);
      expect(shortCallResult.maxLoss).toBeLessThan(0);
      expect(coveredCallResult.maxProfit).toBeGreaterThan(0);
    });

    it('should calculate risk metrics correctly', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.maxLoss).toBeLessThan(0);
      expect(result.maxProfit).toBeGreaterThan(0);
      expect(result.breakEvenPrice).toBeGreaterThan(0);
      expect(result.probabilityOfProfit).toBeGreaterThan(0);
      expect(result.probabilityOfProfit).toBeLessThan(100);
      expect(result.expectedValue).toBeDefined();
    });

    it('should analyze strategy correctly', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.strategyRisk).toBeDefined();
      expect(result.strategyOutlook).toBeDefined();
      expect(result.optimalExitPrice).toBeGreaterThan(0);
    });

    it('should calculate time decay analysis', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.timeDecay).toBeLessThan(0);
      expect(result.daysToExpiration).toBe(45);
      expect(result.expirationImpact).toBeDefined();
    });

    it('should analyze volatility correctly', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.volatilityImpact).toBeDefined();
      expect(result.volatilityRisk).toBeDefined();
      expect(result.volatilityOpportunity).toBeDefined();
    });

    it('should generate profit/loss scenarios', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.scenarios).toHaveLength.greaterThan(0);
      expect(result.scenarios[0]).toHaveProperty('scenario');
      expect(result.scenarios[0]).toHaveProperty('stockPrice');
      expect(result.scenarios[0]).toHaveProperty('optionValue');
      expect(result.scenarios[0]).toHaveProperty('profitLoss');
      expect(result.scenarios[0]).toHaveProperty('return');
      expect(result.scenarios[0]).toHaveProperty('probability');
    });

    it('should calculate risk management metrics', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.positionSize).toBeGreaterThan(0);
      expect(result.portfolioImpact).toBeGreaterThan(0);
      expect(result.marginRequirement).toBeGreaterThanOrEqual(0);
      expect(result.riskRewardRatio).toBeGreaterThan(0);
    });

    it('should generate comprehensive report', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.report).toContain('Stock Options Analysis Report');
      expect(result.report).toContain('Position Overview');
      expect(result.report).toContain('Key Metrics');
      expect(result.report).toContain('Risk Analysis');
    });

    it('should provide recommendations and analysis', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.recommendations).toHaveLength.greaterThan(0);
      expect(result.riskFactors).toHaveLength.greaterThan(0);
      expect(result.opportunities).toHaveLength.greaterThan(0);
    });

    it('should provide market analysis', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.marketOutlook).toBeDefined();
      expect(result.volatilityForecast).toBeDefined();
      expect(result.timingRecommendation).toBeDefined();
    });

    it('should compare strategies', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.strategyComparison).toHaveLength.greaterThan(0);
      expect(result.strategyComparison[0]).toHaveProperty('strategy');
      expect(result.strategyComparison[0]).toHaveProperty('maxProfit');
      expect(result.strategyComparison[0]).toHaveProperty('maxLoss');
      expect(result.strategyComparison[0]).toHaveProperty('probabilityOfProfit');
      expect(result.strategyComparison[0]).toHaveProperty('riskLevel');
    });

    it('should provide sensitivity analysis', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.sensitivityAnalysis).toHaveLength.greaterThan(0);
      expect(result.sensitivityAnalysis[0]).toHaveProperty('factor');
      expect(result.sensitivityAnalysis[0]).toHaveProperty('currentValue');
      expect(result.sensitivityAnalysis[0]).toHaveProperty('impact');
      expect(result.sensitivityAnalysis[0]).toHaveProperty('direction');
    });
  });

  describe('validateStockOptionsInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateStockOptionsInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).strikePrice;
      
      const result = validateStockOptionsInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Strike price is required');
    });

    it('should validate strike price range', () => {
      const lowStrikeInputs = { ...validInputs, strikePrice: 0.001 };
      const highStrikeInputs = { ...validInputs, strikePrice: 15000 };
      
      const lowResult = validateStockOptionsInputs(lowStrikeInputs);
      const highResult = validateStockOptionsInputs(highStrikeInputs);
      
      expect(lowResult.isValid).toBe(false);
      expect(highResult.isValid).toBe(false);
    });

    it('should validate option price range', () => {
      const negativePriceInputs = { ...validInputs, optionPrice: -5 };
      const highPriceInputs = { ...validInputs, optionPrice: 2000 };
      
      const negativeResult = validateStockOptionsInputs(negativePriceInputs);
      const highResult = validateStockOptionsInputs(highPriceInputs);
      
      expect(negativeResult.isValid).toBe(false);
      expect(highResult.isValid).toBe(false);
    });

    it('should validate volatility range', () => {
      const lowVolInputs = { ...validInputs, volatility: 0.05 };
      const highVolInputs = { ...validInputs, volatility: 600 };
      
      const lowResult = validateStockOptionsInputs(lowVolInputs);
      const highResult = validateStockOptionsInputs(highVolInputs);
      
      expect(lowResult.isValid).toBe(false);
      expect(highResult.isValid).toBe(false);
    });

    it('should validate intrinsic value consistency', () => {
      const invalidIntrinsicInputs = { ...validInputs, intrinsicValue: 50 }; // Should be 10 for this setup
      const result = validateStockOptionsInputs(invalidIntrinsicInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Intrinsic value seems inconsistent');
    });

    it('should validate time value consistency', () => {
      const invalidTimeValueInputs = { ...validInputs, timeValue: 20 }; // Should be 5 for this setup
      const result = validateStockOptionsInputs(invalidTimeValueInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Time value seems inconsistent');
    });

    it('should validate max loss for long strategy', () => {
      const invalidMaxLossInputs = { ...validInputs, maxLoss: -5000 }; // Too high for this position
      const result = validateStockOptionsInputs(invalidMaxLossInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Maximum loss for long strategy seems too high');
    });

    it('should validate break-even price consistency', () => {
      const invalidBreakEvenInputs = { ...validInputs, breakEvenPrice: 200 }; // Should be 115 for this setup
      const result = validateStockOptionsInputs(invalidBreakEvenInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Break-even price seems inconsistent');
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidateStrikePrice', () => {
      it('should validate correct strike price', () => {
        const result = quickValidateStrikePrice(100);
        expect(result.isValid).toBe(true);
      });

      it('should reject invalid strike price', () => {
        const result = quickValidateStrikePrice(0.001);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least $0.01');
      });

      it('should validate strike price relative to stock price', () => {
        const result = quickValidateStrikePrice(5, { currentStockPrice: 100 });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('too low relative to stock price');
      });
    });

    describe('quickValidateOptionPrice', () => {
      it('should validate correct option price', () => {
        const result = quickValidateOptionPrice(15);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative option price', () => {
        const result = quickValidateOptionPrice(-5);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be negative');
      });

      it('should validate option price relative to stock and strike', () => {
        const result = quickValidateOptionPrice(100, { currentStockPrice: 110, strikePrice: 100 });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('unreasonably high');
      });
    });

    describe('quickValidateVolatility', () => {
      it('should validate correct volatility', () => {
        const result = quickValidateVolatility(30);
        expect(result.isValid).toBe(true);
      });

      it('should reject OutOfRange volatility', () => {
        const result = quickValidateVolatility(600);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot exceed 500%');
      });

      it('should validate volatility for ATM options', () => {
        const result = quickValidateVolatility(5, { currentStockPrice: 100, strikePrice: 100, optionType: 'call' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('moderate volatility');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle deep InTheMoney options', () => {
      const deepITMInputs = { ...validInputs, strikePrice: 50, currentStockPrice: 110 };
      const result = calculateStockOptions(deepITMInputs);
      
      expect(result.delta).toBeGreaterThan(0.9);
      expect(result.intrinsicValue).toBe(60);
    });

    it('should handle deep OutOfThe-money options', () => {
      const deepOTMInputs = { ...validInputs, strikePrice: 200, currentStockPrice: 110 };
      const result = calculateStockOptions(deepOTMInputs);
      
      expect(result.delta).toBeLessThan(0.1);
      expect(result.intrinsicValue).toBe(0);
    });

    it('should handle very short-term options', () => {
      const shortTermInputs = { ...validInputs, daysToExpiration: 1 };
      const result = calculateStockOptions(shortTermInputs);
      
      expect(result.timeDecay).toBeLessThan(0);
      expect(result.theta).toBeLessThan(0);
    });

    it('should handle very long-term options', () => {
      const longTermInputs = { ...validInputs, daysToExpiration: 1000 };
      const result = calculateStockOptions(longTermInputs);
      
      expect(result.timeDecay).toBeLessThan(0);
      expect(result.vega).toBeGreaterThan(0);
    });

    it('should handle high volatility scenarios', () => {
      const highVolInputs = { ...validInputs, volatility: 100 };
      const result = calculateStockOptions(highVolInputs);
      
      expect(result.vega).toBeGreaterThan(0);
      expect(result.probabilityOfProfit).toBeDefined();
    });

    it('should handle zero volatility scenarios', () => {
      const zeroVolInputs = { ...validInputs, volatility: 0.1 };
      const result = calculateStockOptions(zeroVolInputs);
      
      expect(result.timeValue).toBeCloseTo(0, 1);
      expect(result.intrinsicValue).toBeCloseTo(result.totalValue, 1);
    });
  });

  describe('Performance Tests', () => {
    it('should handle complex calculations efficiently', () => {
      const complexInputs = { 
        ...validInputs, 
        numberOfContracts: 100,
        volatility: 50,
        daysToExpiration: 365
      };
      
      const startTime = Date.now();
      const result = calculateStockOptions(complexInputs);
      const endTime = Date.now();
      
      expect(result.totalCost).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle all option types', () => {
      const optionTypes = ['call', 'put'];
      
      optionTypes.forEach(type => {
        const inputs = { ...validInputs, optionType: type as any };
        const result = calculateStockOptions(inputs);
        expect(result.delta).toBeDefined();
      });
    });

    it('should handle all strategy types', () => {
      const strategies = ['long-call', 'long-put', 'short-call', 'short-put', 'covered-call', 'protective-put'];
      
      strategies.forEach(strategy => {
        const inputs = { ...validInputs, strategy: strategy as any };
        const result = calculateStockOptions(inputs);
        expect(result.maxLoss).toBeDefined();
        expect(result.maxProfit).toBeDefined();
      });
    });
  });

  describe('Risk Analysis', () => {
    it('should provide accurate probability of profit', () => {
      const atmInputs = { ...validInputs, strikePrice: 110, currentStockPrice: 110 };
      const itmInputs = { ...validInputs, strikePrice: 100, currentStockPrice: 120 };
      const otmInputs = { ...validInputs, strikePrice: 120, currentStockPrice: 110 };
      
      const atmResult = calculateStockOptions(atmInputs);
      const itmResult = calculateStockOptions(itmInputs);
      const otmResult = calculateStockOptions(otmInputs);
      
      expect(itmResult.probabilityOfProfit).toBeGreaterThan(atmResult.probabilityOfProfit);
      expect(atmResult.probabilityOfProfit).toBeGreaterThan(otmResult.probabilityOfProfit);
    });

    it('should calculate risk-reward ratios correctly', () => {
      const result = calculateStockOptions(validInputs);
      
      expect(result.riskRewardRatio).toBeGreaterThan(0);
      expect(result.riskRewardRatio).toBe(Math.abs(result.maxProfit / result.maxLoss));
    });

    it('should provide realistic scenario probabilities', () => {
      const result = calculateStockOptions(validInputs);
      
      const totalProbability = result.scenarios.reduce((sum, scenario) => sum + scenario.probability, 0);
      expect(totalProbability).toBeGreaterThan(0);
      expect(totalProbability).toBeLessThanOrEqual(100);
    });
  });
});
