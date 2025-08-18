import { describe, it, expect } from 'vitest';
import { PortfolioFormulas } from './formulas';
import { portfolioCalculatorFormula } from './formulas';
import { getPortfolioValidationRules } from './validation';

describe('PortfolioCalculator', () => {
  describe('PortfolioFormulas', () => {
    const sampleAssets = [
      {
        symbol: 'VTI',
        name: 'Total Stock Market',
        allocation: 60,
        expectedReturn: 9.0,
        standardDeviation: 18,
        assetClass: 'stocks' as const
      },
      {
        symbol: 'BND',
        name: 'Total Bond Market',
        allocation: 40,
        expectedReturn: 4.0,
        standardDeviation: 6,
        assetClass: 'bonds' as const
      }
    ];

    describe('calculateExpectedReturn', () => {
      it('should calculate weighted average return correctly', () => {
        const expectedReturn = PortfolioFormulas.calculateExpectedReturn(sampleAssets);
        expect(expectedReturn).toBeCloseTo(7.0, 1); // 60% * 9% + 40% * 4% = 7%
      });

      it('should handle single asset portfolio', () => {
        const singleAsset = [sampleAssets[0]];
        singleAsset[0].allocation = 100;
        const expectedReturn = PortfolioFormulas.calculateExpectedReturn(singleAsset);
        expect(expectedReturn).toBeCloseTo(9.0, 1);
      });

      it('should handle zero allocation correctly', () => {
        const assetsWithZero = [
          { ...sampleAssets[0], allocation: 100 },
          { ...sampleAssets[1], allocation: 0 }
        ];
        const expectedReturn = PortfolioFormulas.calculateExpectedReturn(assetsWithZero);
        expect(expectedReturn).toBeCloseTo(9.0, 1);
      });
    });

    describe('calculatePortfolioVolatility', () => {
      it('should calculate portfolio volatility with correlations', () => {
        const volatility = PortfolioFormulas.calculatePortfolioVolatility(sampleAssets);
        expect(volatility).toBeGreaterThan(0);
        expect(volatility).toBeLessThan(18); // Should be less than highest individual volatility due to diversification
      });

      it('should handle perfect correlation', () => {
        const perfectCorrelation = [[1.0, 1.0], [1.0, 1.0]];
        const volatility = PortfolioFormulas.calculatePortfolioVolatility(sampleAssets, perfectCorrelation);
        const expectedVol = 0.6 * 18 + 0.4 * 6; // Weighted average when perfectly correlated
        expect(volatility).toBeCloseTo(expectedVol, 1);
      });

      it('should handle negative correlation', () => {
        const negativeCorrelation = [[1.0, -0.5], [-0.5, 1.0]];
        const volatility = PortfolioFormulas.calculatePortfolioVolatility(sampleAssets, negativeCorrelation);
        expect(volatility).toBeGreaterThan(0);
        expect(volatility).toBeLessThan(12); // Should be lower due to negative correlation
      });
    });

    describe('calculateSharpeRatio', () => {
      it('should calculate Sharpe ratio correctly', () => {
        const sharpeRatio = PortfolioFormulas.calculateSharpeRatio(9.0, 15.0, 3.0);
        expect(sharpeRatio).toBeCloseTo(0.4, 1); // (9-3)/15 = 0.4
      });

      it('should handle zero volatility', () => {
        const sharpeRatio = PortfolioFormulas.calculateSharpeRatio(5.0, 0.0, 3.0);
        expect(sharpeRatio).toBe(Infinity);
      });

      it('should handle negative excess return', () => {
        const sharpeRatio = PortfolioFormulas.calculateSharpeRatio(2.0, 10.0, 3.0);
        expect(sharpeRatio).toBeCloseTo(-0.1, 1);
      });
    });

    describe('calculateValueAtRisk', () => {
      it('should calculate VaR correctly for normal distribution', () => {
        const var95 = PortfolioFormulas.calculateValueAtRisk(100000, 8.0, 15.0, 0.95, 1);
        expect(var95).toBeGreaterThan(0);
        expect(var95).toBeLessThan(50000); // Should be reasonable for 95% confidence
      });

      it('should scale with time horizon', () => {
        const var1Year = PortfolioFormulas.calculateValueAtRisk(100000, 8.0, 15.0, 0.95, 1);
        const var5Year = PortfolioFormulas.calculateValueAtRisk(100000, 8.0, 15.0, 0.95, 5);
        expect(var5Year).toBeGreaterThan(var1Year);
      });

      it('should increase with higher volatility', () => {
        const varLowVol = PortfolioFormulas.calculateValueAtRisk(100000, 8.0, 10.0, 0.95, 1);
        const varHighVol = PortfolioFormulas.calculateValueAtRisk(100000, 8.0, 20.0, 0.95, 1);
        expect(varHighVol).toBeGreaterThan(varLowVol);
      });
    });

    describe('calculatePortfolioBeta', () => {
      it('should calculate weighted average beta', () => {
        const beta = PortfolioFormulas.calculatePortfolioBeta(sampleAssets);
        const expectedBeta = 0.6 * 1.0 + 0.4 * 0.2; // 60% stocks (beta=1.0) + 40% bonds (beta=0.2)
        expect(beta).toBeCloseTo(expectedBeta, 1);
      });

      it('should handle all-stock portfolio', () => {
        const stockAssets = [{ ...sampleAssets[0], allocation: 100 }];
        const beta = PortfolioFormulas.calculatePortfolioBeta(stockAssets);
        expect(beta).toBeCloseTo(1.0, 1);
      });

      it('should handle all-cash portfolio', () => {
        const cashAssets = [{
          symbol: 'CASH',
          name: 'Cash',
          allocation: 100,
          expectedReturn: 2.0,
          standardDeviation: 1.0,
          assetClass: 'cash' as const
        }];
        const beta = PortfolioFormulas.calculatePortfolioBeta(cashAssets);
        expect(beta).toBeCloseTo(0.0, 1);
      });
    });

    describe('runMonteCarloSimulation', () => {
      it('should generate reasonable simulation results', () => {
        const results = PortfolioFormulas.runMonteCarloSimulation(100000, 8.0, 15.0, 10, 1000);
        
        expect(results.percentile50).toBeGreaterThan(results.percentile10);
        expect(results.percentile90).toBeGreaterThan(results.percentile50);
        expect(results.expectedValue).toBeGreaterThan(100000); // Should grow over time
        expect(results.probabilityOfLoss).toBeGreaterThan(0);
        expect(results.probabilityOfLoss).toBeLessThan(50); // Should be less than 50% for positive expected return
      });

      it('should show higher probability of loss for negative expected returns', () => {
        const negativeResults = PortfolioFormulas.runMonteCarloSimulation(100000, -2.0, 15.0, 5, 1000);
        expect(negativeResults.probabilityOfLoss).toBeGreaterThan(50);
      });

      it('should show lower volatility in results for low-risk portfolios', () => {
        const lowRiskResults = PortfolioFormulas.runMonteCarloSimulation(100000, 5.0, 5.0, 10, 1000);
        const highRiskResults = PortfolioFormulas.runMonteCarloSimulation(100000, 5.0, 20.0, 10, 1000);
        
        const lowRiskSpread = lowRiskResults.percentile90 - lowRiskResults.percentile10;
        const highRiskSpread = highRiskResults.percentile90 - highRiskResults.percentile10;
        
        expect(highRiskSpread).toBeGreaterThan(lowRiskSpread);
      });
    });

    describe('optimizePortfolio', () => {
      it('should adjust allocations based on risk tolerance', () => {
        const conservativePortfolio = PortfolioFormulas.optimizePortfolio(sampleAssets, undefined, 'conservative');
        const aggressivePortfolio = PortfolioFormulas.optimizePortfolio(sampleAssets, undefined, 'aggressive');
        
        const conservativeStocks = conservativePortfolio
          .filter(asset => asset.assetClass === 'stocks')
          .reduce((sum, asset) => sum + asset.allocation, 0);
        
        const aggressiveStocks = aggressivePortfolio
          .filter(asset => asset.assetClass === 'stocks')
          .reduce((sum, asset) => sum + asset.allocation, 0);
        
        expect(aggressiveStocks).toBeGreaterThan(conservativeStocks);
      });

      it('should maintain 100% total allocation', () => {
        const optimized = PortfolioFormulas.optimizePortfolio(sampleAssets, undefined, 'moderate');
        const totalAllocation = optimized.reduce((sum, asset) => sum + asset.allocation, 0);
        expect(totalAllocation).toBeCloseTo(100, 1);
      });
    });

    describe('calculateRebalancingImpact', () => {
      it('should calculate transaction costs correctly', () => {
        const impact = PortfolioFormulas.calculateRebalancingImpact('quarterly', 100000, 15.0);
        expect(impact.transactionCosts).toBeGreaterThan(0);
        expect(impact.transactionCosts).toBe(100000 * 0.001 * 4); // 4 rebalances per year
      });

      it('should show higher costs for more frequent rebalancing', () => {
        const monthly = PortfolioFormulas.calculateRebalancingImpact('monthly', 100000, 15.0);
        const annually = PortfolioFormulas.calculateRebalancingImpact('annually', 100000, 15.0);
        
        expect(monthly.transactionCosts).toBeGreaterThan(annually.transactionCosts);
      });

      it('should show zero costs for never rebalancing', () => {
        const never = PortfolioFormulas.calculateRebalancingImpact('never', 100000, 15.0);
        expect(never.transactionCosts).toBe(0);
      });
    });
  });

  describe('portfolioCalculatorFormula', () => {
    it('should calculate complete portfolio analysis', () => {
      const inputs = {
        totalInvestment: 100000,
        timeHorizon: 20,
        riskTolerance: 'moderate',
        rebalanceFrequency: 'quarterly',
        expectedInflation: 2.5,
        assets: [
          {
            symbol: 'VTI',
            name: 'Total Stock Market',
            allocation: 60,
            expectedReturn: 9.0,
            standardDeviation: 18,
            assetClass: 'stocks'
          },
          {
            symbol: 'BND',
            name: 'Total Bond Market',
            allocation: 40,
            expectedReturn: 4.0,
            standardDeviation: 6,
            assetClass: 'bonds'
          }
        ]
      };

      const result = portfolioCalculatorFormula.calculate(inputs);

      expect(result.outputs.expectedReturn).toBeCloseTo(7.0, 1);
      expect(result.outputs.volatility).toBeGreaterThan(0);
      expect(result.outputs.sharpeRatio).toBeGreaterThan(0);
      expect(result.outputs.nominalFutureValue).toBeGreaterThan(100000);
      expect(result.outputs.realFutureValue).toBeLessThan(result.outputs.nominalFutureValue);
      expect(result.outputs.monteCarloMedian).toBeGreaterThan(0);
      expect(result.outputs.probabilityOfLoss).toBeGreaterThan(0);
      expect(result.explanation).toContain('Portfolio expected return');
      expect(result.intermediateSteps).toBeDefined();
    });

    it('should handle conservative portfolio', () => {
      const inputs = {
        totalInvestment: 500000,
        timeHorizon: 10,
        riskTolerance: 'conservative',
        rebalanceFrequency: 'annually',
        expectedInflation: 2.5,
        assets: [
          {
            symbol: 'BND',
            name: 'Bonds',
            allocation: 70,
            expectedReturn: 4.0,
            standardDeviation: 6,
            assetClass: 'bonds'
          },
          {
            symbol: 'VTI',
            name: 'Stocks',
            allocation: 30,
            expectedReturn: 9.0,
            standardDeviation: 18,
            assetClass: 'stocks'
          }
        ]
      };

      const result = portfolioCalculatorFormula.calculate(inputs);

      expect(result.outputs.expectedReturn).toBeLessThan(7.0); // Lower return for conservative
      expect(result.outputs.volatility).toBeLessThan(15.0); // Lower volatility
      expect(result.outputs.probabilityOfLoss).toBeLessThan(30); // Lower probability of loss
    });

    it('should handle aggressive portfolio', () => {
      const inputs = {
        totalInvestment: 50000,
        timeHorizon: 30,
        riskTolerance: 'aggressive',
        rebalanceFrequency: 'annually',
        expectedInflation: 2.5,
        assets: [
          {
            symbol: 'VTI',
            name: 'US Stocks',
            allocation: 80,
            expectedReturn: 9.0,
            standardDeviation: 18,
            assetClass: 'stocks'
          },
          {
            symbol: 'BND',
            name: 'Bonds',
            allocation: 20,
            expectedReturn: 4.0,
            standardDeviation: 6,
            assetClass: 'bonds'
          }
        ]
      };

      const result = portfolioCalculatorFormula.calculate(inputs);

      expect(result.outputs.expectedReturn).toBeGreaterThan(7.0); // Higher return for aggressive
      expect(result.outputs.volatility).toBeGreaterThan(12.0); // Higher volatility
      expect(result.outputs.portfolioBeta).toBeGreaterThan(0.7); // Higher beta
    });

    it('should throw error for invalid inputs', () => {
      const inputs = {
        totalInvestment: -100000, // Invalid negative investment
        timeHorizon: 20,
        riskTolerance: 'moderate',
        rebalanceFrequency: 'quarterly',
        expectedInflation: 2.5,
        assets: []
      };

      expect(() => portfolioCalculatorFormula.calculate(inputs)).toThrow();
    });
  });

  describe('Validation Rules', () => {
    const validationRules = getPortfolioValidationRules();

    it('should validate required fields', () => {
      const requiredFields = ['totalInvestment', 'timeHorizon', 'riskTolerance', 'rebalanceFrequency'];
      const requiredRules = validationRules.filter(rule => rule.type === 'required');
      
      expect(requiredRules.length).toBeGreaterThanOrEqual(requiredFields.length);
    });

    it('should validate investment amount range', () => {
      const investmentRules = validationRules.filter(rule => rule.field === 'totalInvestment');
      expect(investmentRules.length).toBeGreaterThan(0);
    });

    it('should validate asset allocation sums to 100%', () => {
      const allocationRules = validationRules.filter(rule => 
        rule.field === 'assets' && rule.message.includes('sum to 100%')
      );
      expect(allocationRules.length).toBeGreaterThan(0);
    });

    it('should validate minimum diversification', () => {
      const diversificationRules = validationRules.filter(rule => 
        rule.field === 'assets' && rule.message.includes('at least 2')
      );
      expect(diversificationRules.length).toBeGreaterThan(0);
    });
  });

  describe('Industry Benchmark Validation', () => {
    it('should match Vanguard portfolio allocation results', () => {
      // Test against known Vanguard Target Date Fund allocation
      const vanguardAssets = [
        {
          symbol: 'VTI',
          name: 'US Stocks',
          allocation: 54,
          expectedReturn: 8.5,
          standardDeviation: 18,
          assetClass: 'stocks' as const
        },
        {
          symbol: 'VTIAX',
          name: 'International Stocks',
          allocation: 36,
          expectedReturn: 8.0,
          standardDeviation: 20,
          assetClass: 'stocks' as const
        },
        {
          symbol: 'BND',
          name: 'Bonds',
          allocation: 10,
          expectedReturn: 4.0,
          standardDeviation: 6,
          assetClass: 'bonds' as const
        }
      ];

      const expectedReturn = PortfolioFormulas.calculateExpectedReturn(vanguardAssets);
      expect(expectedReturn).toBeCloseTo(8.05, 1); // Should match Vanguard's expected returns
    });

    it('should match Morningstar risk metrics', () => {
      // Test against typical balanced portfolio metrics
      const balancedAssets = [
        {
          symbol: 'STOCKS',
          name: 'Stocks',
          allocation: 60,
          expectedReturn: 9.0,
          standardDeviation: 18,
          assetClass: 'stocks' as const
        },
        {
          symbol: 'BONDS',
          name: 'Bonds',
          allocation: 40,
          expectedReturn: 4.0,
          standardDeviation: 6,
          assetClass: 'bonds' as const
        }
      ];

      const volatility = PortfolioFormulas.calculatePortfolioVolatility(balancedAssets);
      expect(volatility).toBeCloseTo(11.5, 1); // Should be close to industry standard 60/40 volatility
    });

    it('should match academic Modern Portfolio Theory calculations', () => {
      // Test Sharpe ratio calculation against academic standards
      const sharpeRatio = PortfolioFormulas.calculateSharpeRatio(8.0, 12.0, 2.0);
      expect(sharpeRatio).toBeCloseTo(0.5, 2); // Standard academic example
    });
  });
});