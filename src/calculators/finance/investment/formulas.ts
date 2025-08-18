import { Formula, CalculationResult } from '../../../types/calculator';

export interface PortfolioInputs {
  assets: AssetAllocation[];
  totalInvestment: number;
  timeHorizon: number; // years
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  rebalanceFrequency: 'monthly' | 'quarterly' | 'annually' | 'never';
  expectedInflation: number; // annual percentage
  taxRate?: number; // capital gains tax rate
}

export interface AssetAllocation {
  symbol: string;
  name: string;
  allocation: number; // percentage
  expectedReturn: number; // annual percentage
  standardDeviation: number; // annual volatility
  assetClass: 'stocks' | 'bonds' | 'commodities' | 'reits' | 'cash' | 'alternatives';
}

export interface PortfolioMetrics {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  maxDrawdown: number;
  valueAtRisk: number; // 95% confidence
  beta: number;
  alpha: number;
  informationRatio: number;
}

export interface MonteCarloResult {
  percentile10: number;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  percentile90: number;
  probabilityOfLoss: number;
  expectedValue: number;
}

/**
 * Advanced portfolio optimization and analysis formulas
 */
export class PortfolioFormulas {
  
  /**
   * Calculate portfolio expected return (weighted average)
   */
  static calculateExpectedReturn(assets: AssetAllocation[]): number {
    return assets.reduce((total, asset) => {
      return total + (asset.allocation / 100) * (asset.expectedReturn / 100);
    }, 0) * 100;
  }

  /**
   * Calculate portfolio volatility using correlation matrix
   */
  static calculatePortfolioVolatility(
    assets: AssetAllocation[],
    correlationMatrix?: number[][]
  ): number {
    const n = assets.length;
    
    // If no correlation matrix provided, assume default correlations
    if (!correlationMatrix) {
      correlationMatrix = this.getDefaultCorrelationMatrix(assets);
    }

    let variance = 0;
    
    // Calculate portfolio variance
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const weightI = assets[i].allocation / 100;
        const weightJ = assets[j].allocation / 100;
        const volI = assets[i].standardDeviation / 100;
        const volJ = assets[j].standardDeviation / 100;
        const correlation = correlationMatrix[i][j];
        
        variance += weightI * weightJ * volI * volJ * correlation;
      }
    }
    
    return Math.sqrt(variance) * 100;
  }

  /**
   * Generate default correlation matrix based on asset classes
   */
  static getDefaultCorrelationMatrix(assets: AssetAllocation[]): number[][] {
    const n = assets.length;
    const matrix: number[][] = [];
    
    // Default correlations between asset classes
    const correlations = {
      'stocks-stocks': 0.85,
      'stocks-bonds': -0.15,
      'stocks-commodities': 0.25,
      'stocks-reits': 0.70,
      'stocks-cash': 0.05,
      'stocks-alternatives': 0.40,
      'bonds-bonds': 0.90,
      'bonds-commodities': -0.10,
      'bonds-reits': 0.20,
      'bonds-cash': 0.15,
      'bonds-alternatives': 0.10,
      'commodities-commodities': 0.60,
      'commodities-reits': 0.30,
      'commodities-cash': 0.05,
      'commodities-alternatives': 0.35,
      'reits-reits': 0.80,
      'reits-cash': 0.10,
      'reits-alternatives': 0.50,
      'cash-cash': 1.00,
      'cash-alternatives': 0.05,
      'alternatives-alternatives': 0.45
    };

    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        if (i === j) {
          matrix[i][j] = 1.0; // Perfect correlation with itself
        } else {
          const key1 = `${assets[i].assetClass}-${assets[j].assetClass}`;
          const key2 = `${assets[j].assetClass}-${assets[i].assetClass}`;
          matrix[i][j] = correlations[key1 as keyof typeof correlations] || 
                        correlations[key2 as keyof typeof correlations] || 0.30;
        }
      }
    }
    
    return matrix;
  }

  /**
   * Calculate Sharpe Ratio
   */
  static calculateSharpeRatio(
    portfolioReturn: number,
    portfolioVolatility: number,
    riskFreeRate: number = 3.0
  ): number {
    return (portfolioReturn - riskFreeRate) / portfolioVolatility;
  }

  /**
   * Calculate Sortino Ratio (downside deviation only)
   */
  static calculateSortinoRatio(
    portfolioReturn: number,
    downsideDeviation: number,
    riskFreeRate: number = 3.0
  ): number {
    return (portfolioReturn - riskFreeRate) / downsideDeviation;
  }

  /**
   * Estimate downside deviation (simplified)
   */
  static estimateDownsideDeviation(volatility: number): number {
    // Downside deviation is typically 60-70% of total volatility
    return volatility * 0.65;
  }

  /**
   * Calculate Value at Risk (95% confidence, normal distribution assumption)
   */
  static calculateValueAtRisk(
    portfolioValue: number,
    expectedReturn: number,
    volatility: number,
    confidenceLevel: number = 0.95,
    timeHorizon: number = 1
  ): number {
    // Z-score for 95% confidence level
    const zScore = confidenceLevel === 0.95 ? 1.645 : 
                   confidenceLevel === 0.99 ? 2.326 : 1.645;
    
    const expectedGrowth = expectedReturn / 100;
    const vol = volatility / 100;
    
    // Adjust for time horizon
    const adjustedReturn = expectedGrowth * timeHorizon;
    const adjustedVol = vol * Math.sqrt(timeHorizon);
    
    const worstCaseReturn = adjustedReturn - (zScore * adjustedVol);
    const worstCaseValue = portfolioValue * (1 + worstCaseReturn);
    
    return portfolioValue - worstCaseValue;
  }

  /**
   * Estimate maximum drawdown
   */
  static estimateMaxDrawdown(volatility: number, timeHorizon: number): number {
    // Empirical relationship: MaxDD ≈ 2 * volatility * sqrt(time)
    return 2 * (volatility / 100) * Math.sqrt(timeHorizon) * 100;
  }

  /**
   * Calculate portfolio beta (vs market)
   */
  static calculatePortfolioBeta(assets: AssetAllocation[]): number {
    // Default betas by asset class
    const defaultBetas = {
      'stocks': 1.0,
      'bonds': 0.2,
      'commodities': 0.8,
      'reits': 0.9,
      'cash': 0.0,
      'alternatives': 0.6
    };

    return assets.reduce((totalBeta, asset) => {
      const weight = asset.allocation / 100;
      const beta = defaultBetas[asset.assetClass] || 0.5;
      return totalBeta + (weight * beta);
    }, 0);
  }

  /**
   * Calculate portfolio alpha (excess return vs expected based on beta)
   */
  static calculatePortfolioAlpha(
    portfolioReturn: number,
    portfolioBeta: number,
    marketReturn: number = 10.0,
    riskFreeRate: number = 3.0
  ): number {
    const expectedReturn = riskFreeRate + portfolioBeta * (marketReturn - riskFreeRate);
    return portfolioReturn - expectedReturn;
  }

  /**
   * Run Monte Carlo simulation
   */
  static runMonteCarloSimulation(
    initialValue: number,
    expectedReturn: number,
    volatility: number,
    timeHorizon: number,
    simulations: number = 10000
  ): MonteCarloResult {
    const results: number[] = [];
    const annualReturn = expectedReturn / 100;
    const annualVol = volatility / 100;
    
    for (let i = 0; i < simulations; i++) {
      let value = initialValue;
      
      for (let year = 0; year < timeHorizon; year++) {
        // Generate random return using normal distribution (Box-Muller)
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        
        const yearlyReturn = annualReturn + (annualVol * z);
        value *= (1 + yearlyReturn);
      }
      
      results.push(value);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const getPercentile = (p: number) => {
      const index = Math.floor(p * simulations);
      return results[Math.min(index, simulations - 1)];
    };
    
    const lossCount = results.filter(r => r < initialValue).length;
    
    return {
      percentile10: getPercentile(0.10),
      percentile25: getPercentile(0.25),
      percentile50: getPercentile(0.50),
      percentile75: getPercentile(0.75),
      percentile90: getPercentile(0.90),
      probabilityOfLoss: (lossCount / simulations) * 100,
      expectedValue: results.reduce((sum, val) => sum + val, 0) / simulations
    };
  }

  /**
   * Optimize portfolio using simplified mean-variance optimization
   */
  static optimizePortfolio(
    assets: AssetAllocation[],
    targetReturn?: number,
    riskTolerance: 'conservative' | 'moderate' | 'aggressive' = 'moderate'
  ): AssetAllocation[] {
    // Risk tolerance mappings
    const riskMappings = {
      conservative: { stocks: 30, bonds: 60, alternatives: 10 },
      moderate: { stocks: 60, bonds: 30, alternatives: 10 },
      aggressive: { stocks: 80, bonds: 10, alternatives: 10 }
    };
    
    const targetAllocation = riskMappings[riskTolerance];
    
    // Redistribute allocations based on risk tolerance
    const optimizedAssets = assets.map(asset => {
      let newAllocation = asset.allocation;
      
      // Adjust based on asset class and risk tolerance
      if (asset.assetClass === 'stocks') {
        newAllocation = targetAllocation.stocks * (asset.allocation / 
          assets.filter(a => a.assetClass === 'stocks')
                .reduce((sum, a) => sum + a.allocation, 0) || 1);
      } else if (asset.assetClass === 'bonds') {
        newAllocation = targetAllocation.bonds * (asset.allocation / 
          assets.filter(a => a.assetClass === 'bonds')
                .reduce((sum, a) => sum + a.allocation, 0) || 1);
      } else {
        newAllocation = targetAllocation.alternatives * (asset.allocation / 
          assets.filter(a => !['stocks', 'bonds'].includes(a.assetClass))
                .reduce((sum, a) => sum + a.allocation, 0) || 1);
      }
      
      return {
        ...asset,
        allocation: Math.max(0, Math.min(100, newAllocation))
      };
    });
    
    // Normalize to 100%
    const totalAllocation = optimizedAssets.reduce((sum, asset) => sum + asset.allocation, 0);
    return optimizedAssets.map(asset => ({
      ...asset,
      allocation: (asset.allocation / totalAllocation) * 100
    }));
  }

  /**
   * Calculate rebalancing frequency impact
   */
  static calculateRebalancingImpact(
    frequency: 'monthly' | 'quarterly' | 'annually' | 'never',
    portfolioValue: number,
    volatility: number
  ): { transactionCosts: number; driftImpact: number; netBenefit: number } {
    const costPerRebalance = portfolioValue * 0.001; // 0.1% transaction cost
    
    const rebalancesPerYear = {
      monthly: 12,
      quarterly: 4,
      annually: 1,
      never: 0
    };
    
    const annualTransactionCosts = costPerRebalance * rebalancesPerYear[frequency];
    
    // Drift impact (higher volatility = more benefit from rebalancing)
    const driftImpact = frequency === 'never' ? 
      -(volatility / 100) * portfolioValue * 0.02 : // 2% drag from drift
      (volatility / 100) * portfolioValue * 0.01 * rebalancesPerYear[frequency] / 12; // Benefit from rebalancing
    
    return {
      transactionCosts: annualTransactionCosts,
      driftImpact,
      netBenefit: driftImpact - annualTransactionCosts
    };
  }
}

/**
 * Main portfolio optimization calculator formula
 */
export const portfolioCalculatorFormula: Formula = {
  id: 'portfolio-calculator',
  name: 'Advanced Portfolio Optimization Calculator',
  description: 'Modern Portfolio Theory optimization with risk metrics, Monte Carlo simulation, and rebalancing analysis',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const portfolioInputs = inputs as PortfolioInputs;
    
    try {
      // Calculate basic portfolio metrics
      const expectedReturn = PortfolioFormulas.calculateExpectedReturn(portfolioInputs.assets);
      const volatility = PortfolioFormulas.calculatePortfolioVolatility(portfolioInputs.assets);
      const sharpeRatio = PortfolioFormulas.calculateSharpeRatio(expectedReturn, volatility);
      const downsideDeviation = PortfolioFormulas.estimateDownsideDeviation(volatility);
      const sortinoRatio = PortfolioFormulas.calculateSortinoRatio(expectedReturn, downsideDeviation);
      
      // Risk metrics
      const valueAtRisk = PortfolioFormulas.calculateValueAtRisk(
        portfolioInputs.totalInvestment,
        expectedReturn,
        volatility,
        0.95,
        1
      );
      const maxDrawdown = PortfolioFormulas.estimateMaxDrawdown(volatility, portfolioInputs.timeHorizon);
      const portfolioBeta = PortfolioFormulas.calculatePortfolioBeta(portfolioInputs.assets);
      const portfolioAlpha = PortfolioFormulas.calculatePortfolioAlpha(expectedReturn, portfolioBeta);
      
      // Monte Carlo simulation
      const monteCarloResults = PortfolioFormulas.runMonteCarloSimulation(
        portfolioInputs.totalInvestment,
        expectedReturn,
        volatility,
        portfolioInputs.timeHorizon,
        5000
      );
      
      // Portfolio optimization
      const optimizedPortfolio = PortfolioFormulas.optimizePortfolio(
        portfolioInputs.assets,
        undefined,
        portfolioInputs.riskTolerance
      );
      
      // Rebalancing analysis
      const rebalancingImpact = PortfolioFormulas.calculateRebalancingImpact(
        portfolioInputs.rebalanceFrequency,
        portfolioInputs.totalInvestment,
        volatility
      );
      
      // Future value calculations
      const nominalFutureValue = portfolioInputs.totalInvestment * 
        Math.pow(1 + expectedReturn / 100, portfolioInputs.timeHorizon);
      const realFutureValue = nominalFutureValue / 
        Math.pow(1 + portfolioInputs.expectedInflation / 100, portfolioInputs.timeHorizon);
      
      return {
        outputs: {
          expectedReturn,
          volatility,
          sharpeRatio,
          sortinoRatio,
          valueAtRisk,
          maxDrawdown,
          portfolioBeta,
          portfolioAlpha,
          nominalFutureValue,
          realFutureValue,
          monteCarloMedian: monteCarloResults.percentile50,
          monteCarloWorstCase: monteCarloResults.percentile10,
          monteCarloBestCase: monteCarloResults.percentile90,
          probabilityOfLoss: monteCarloResults.probabilityOfLoss,
          optimizedPortfolio,
          rebalancingCost: rebalancingImpact.transactionCosts,
          rebalancingBenefit: rebalancingImpact.netBenefit
        },
        explanation: `Portfolio expected return: ${expectedReturn.toFixed(2)}% with ${volatility.toFixed(2)}% volatility. Sharpe ratio: ${sharpeRatio.toFixed(2)}. Monte Carlo simulation shows median outcome of ${monteCarloResults.percentile50.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} after ${portfolioInputs.timeHorizon} years, with ${monteCarloResults.probabilityOfLoss.toFixed(1)}% probability of loss.`,
        intermediateSteps: {
          'Portfolio Return': `Weighted average: ${expectedReturn.toFixed(2)}%`,
          'Portfolio Risk': `Volatility: ${volatility.toFixed(2)}%`,
          'Risk-Adjusted Return': `Sharpe Ratio: ${sharpeRatio.toFixed(2)}`,
          'Downside Protection': `Sortino Ratio: ${sortinoRatio.toFixed(2)}`,
          'Market Exposure': `Beta: ${portfolioBeta.toFixed(2)}`,
          'Excess Return': `Alpha: ${portfolioAlpha.toFixed(2)}%`
        }
      };
    } catch (error) {
      throw new Error(`Portfolio calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};