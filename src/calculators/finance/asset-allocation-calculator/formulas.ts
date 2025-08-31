import { AssetAllocationCalculatorInputs, AssetAllocationCalculatorOutputs, OptimizedAllocation, RiskAnalysis, ScenarioAnalysis, RebalancingStrategy, AssetAllocation, RiskContribution, Scenario, AllocationComparison } from './types';

export function calculateAssetAllocation(inputs: AssetAllocationCalculatorInputs): AssetAllocationCalculatorOutputs {
  // Calculate optimized allocation
  const optimizedAllocation = calculateOptimizedAllocation(inputs);

  // Calculate risk analysis
  const riskAnalysis = calculateRiskAnalysis(inputs, optimizedAllocation);

  // Calculate scenario analysis
  const scenarioAnalysis = calculateScenarioAnalysis(inputs, optimizedAllocation);

  // Calculate rebalancing strategy
  const rebalancingStrategy = calculateRebalancingStrategy(inputs, optimizedAllocation);

  return {
    optimizedAllocation,
    riskAnalysis,
    scenarioAnalysis,
    rebalancingStrategy
  };
}

function calculateOptimizedAllocation(inputs: AssetAllocationCalculatorInputs): OptimizedAllocation {
  const { optimizationSettings, assetClasses } = inputs;
  
  // Get all asset classes and their characteristics
  const assets = getAllAssetClasses(assetClasses);
  
  // Calculate expected returns and volatilities
  const expectedReturns = assets.map(asset => asset.expectedReturn);
  const volatilities = assets.map(asset => asset.volatility);
  
  // Calculate correlation matrix
  const correlationMatrix = calculateCorrelationMatrix(assets);
  
  // Calculate covariance matrix
  const covarianceMatrix = calculateCovarianceMatrix(volatilities, correlationMatrix);
  
  // Perform optimization based on method
  let weights: number[];
  
  switch (optimizationSettings.optimizationMethod) {
    case 'mean-variance':
      weights = meanVarianceOptimization(expectedReturns, covarianceMatrix, optimizationSettings);
      break;
    case 'black-litterman':
      weights = blackLittermanOptimization(expectedReturns, covarianceMatrix, optimizationSettings);
      break;
    case 'risk-parity':
      weights = riskParityOptimization(covarianceMatrix, optimizationSettings);
      break;
    case 'maximum-sharpe':
      weights = maximumSharpeOptimization(expectedReturns, covarianceMatrix, optimizationSettings);
      break;
    case 'minimum-variance':
      weights = minimumVarianceOptimization(covarianceMatrix, optimizationSettings);
      break;
    default:
      weights = meanVarianceOptimization(expectedReturns, covarianceMatrix, optimizationSettings);
  }
  
  // Apply constraints
  weights = applyConstraints(weights, assets, inputs);
  
  // Calculate portfolio metrics
  const expectedReturn = calculatePortfolioReturn(expectedReturns, weights);
  const expectedVolatility = calculatePortfolioVolatility(covarianceMatrix, weights);
  const sharpeRatio = (expectedReturn - optimizationSettings.riskFreeRate) / expectedVolatility;
  const maxDrawdown = calculateMaxDrawdown(expectedReturn, expectedVolatility);
  
  // Create asset allocation array
  const assetAllocation: AssetAllocation[] = assets.map((asset, index) => ({
    assetClass: asset.name,
    subAssetClass: asset.subAssetClass,
    weight: weights[index] * 100,
    expectedReturn: asset.expectedReturn,
    volatility: asset.volatility,
    sharpeRatio: asset.sharpeRatio,
    maxDrawdown: asset.maxDrawdown,
    correlation: asset.correlation,
    marketValue: weights[index] * inputs.portfolioInfo.basicInfo.totalValue
  }));
  
  return {
    expectedReturn,
    expectedVolatility,
    sharpeRatio,
    maxDrawdown,
    assetAllocation
  };
}

function calculateRiskAnalysis(inputs: AssetAllocationCalculatorInputs, optimizedAllocation: OptimizedAllocation): RiskAnalysis {
  const assets = getAllAssetClasses(inputs.assetClasses);
  const weights = optimizedAllocation.assetAllocation.map(allocation => allocation.weight / 100);
  const volatilities = assets.map(asset => asset.volatility);
  const correlationMatrix = calculateCorrelationMatrix(assets);
  const covarianceMatrix = calculateCovarianceMatrix(volatilities, correlationMatrix);
  
  // Calculate VaR and CVaR
  const var95 = calculateVaR(optimizedAllocation.expectedReturn, optimizedAllocation.expectedVolatility, 0.95);
  const cvar95 = calculateCVaR(optimizedAllocation.expectedReturn, optimizedAllocation.expectedVolatility, 0.95);
  
  // Calculate beta
  const beta = calculatePortfolioBeta(assets, weights);
  
  // Calculate correlation with market
  const correlationWithMarket = calculateCorrelationWithMarket(assets, weights);
  
  // Calculate risk contribution
  const riskContribution = calculateRiskContribution(assets, weights, covarianceMatrix, optimizedAllocation.expectedVolatility);
  
  return {
    var95,
    cvar95,
    beta,
    correlationWithMarket,
    riskContribution
  };
}

function calculateScenarioAnalysis(inputs: AssetAllocationCalculatorInputs, optimizedAllocation: OptimizedAllocation): ScenarioAnalysis {
  const scenarios: Scenario[] = [
    {
      name: 'Bull Market',
      expectedReturn: optimizedAllocation.expectedReturn * 1.5,
      volatility: optimizedAllocation.expectedVolatility * 0.8,
      sharpeRatio: (optimizedAllocation.expectedReturn * 1.5 - inputs.optimizationSettings.riskFreeRate) / (optimizedAllocation.expectedVolatility * 0.8),
      maxDrawdown: optimizedAllocation.maxDrawdown * 0.6
    },
    {
      name: 'Bear Market',
      expectedReturn: optimizedAllocation.expectedReturn * 0.5,
      volatility: optimizedAllocation.expectedVolatility * 1.3,
      sharpeRatio: (optimizedAllocation.expectedReturn * 0.5 - inputs.optimizationSettings.riskFreeRate) / (optimizedAllocation.expectedVolatility * 1.3),
      maxDrawdown: optimizedAllocation.maxDrawdown * 1.8
    },
    {
      name: 'High Inflation',
      expectedReturn: optimizedAllocation.expectedReturn * 0.8,
      volatility: optimizedAllocation.expectedVolatility * 1.1,
      sharpeRatio: (optimizedAllocation.expectedReturn * 0.8 - inputs.optimizationSettings.riskFreeRate) / (optimizedAllocation.expectedVolatility * 1.1),
      maxDrawdown: optimizedAllocation.maxDrawdown * 1.2
    },
    {
      name: 'Low Growth',
      expectedReturn: optimizedAllocation.expectedReturn * 0.7,
      volatility: optimizedAllocation.expectedVolatility * 0.9,
      sharpeRatio: (optimizedAllocation.expectedReturn * 0.7 - inputs.optimizationSettings.riskFreeRate) / (optimizedAllocation.expectedVolatility * 0.9),
      maxDrawdown: optimizedAllocation.maxDrawdown * 1.1
    }
  ];
  
  return { scenarios };
}

function calculateRebalancingStrategy(inputs: AssetAllocationCalculatorInputs, optimizedAllocation: OptimizedAllocation): RebalancingStrategy {
  // Determine recommended frequency based on portfolio characteristics
  let recommendedFrequency: string;
  if (inputs.portfolioInfo.basicInfo.liquidityRequirements === 'high') {
    recommendedFrequency = 'monthly';
  } else if (inputs.portfolioInfo.basicInfo.liquidityRequirements === 'low') {
    recommendedFrequency = 'annually';
  } else {
    recommendedFrequency = 'quarterly';
  }
  
  // Calculate rebalancing threshold based on transaction costs
  const rebalancingThreshold = Math.max(2.0, inputs.optimizationSettings.transactionCosts * 4);
  
  // Calculate expected rebalancing cost
  const expectedRebalancingCost = inputs.portfolioInfo.basicInfo.totalValue * (inputs.optimizationSettings.transactionCosts / 100) * 0.5;
  
  // Create allocation comparison (assuming current allocation is equal weight for demonstration)
  const assetCount = optimizedAllocation.assetAllocation.length;
  const equalWeight = 100 / assetCount;
  
  const allocationComparison: AllocationComparison[] = optimizedAllocation.assetAllocation.map(allocation => ({
    assetClass: allocation.assetClass,
    currentWeight: equalWeight,
    targetWeight: allocation.weight,
    difference: allocation.weight - equalWeight
  }));
  
  return {
    recommendedFrequency,
    rebalancingThreshold,
    expectedRebalancingCost,
    allocationComparison
  };
}

// Helper functions
function getAllAssetClasses(assetClasses: any): any[] {
  const assets: any[] = [];
  
  // Equity assets
  Object.entries(assetClasses.equity).forEach(([key, value]: [string, any]) => {
    assets.push({
      name: key,
      subAssetClass: 'equity',
      ...value
    });
  });
  
  // Fixed income assets
  Object.entries(assetClasses.fixedIncome).forEach(([key, value]: [string, any]) => {
    assets.push({
      name: key,
      subAssetClass: 'fixed_income',
      ...value
    });
  });
  
  // Cash assets
  Object.entries(assetClasses.cash).forEach(([key, value]: [string, any]) => {
    assets.push({
      name: key,
      subAssetClass: 'cash',
      ...value
    });
  });
  
  // Real estate assets
  Object.entries(assetClasses.realEstate).forEach(([key, value]: [string, any]) => {
    assets.push({
      name: key,
      subAssetClass: 'real_estate',
      ...value
    });
  });
  
  // Commodities assets
  Object.entries(assetClasses.commodities).forEach(([key, value]: [string, any]) => {
    assets.push({
      name: key,
      subAssetClass: 'commodities',
      ...value
    });
  });
  
  // Alternatives assets
  Object.entries(assetClasses.alternatives).forEach(([key, value]: [string, any]) => {
    assets.push({
      name: key,
      subAssetClass: 'alternatives',
      ...value
    });
  });
  
  return assets;
}

function calculateCorrelationMatrix(assets: any[]): number[][] {
  const n = assets.length;
  const correlationMatrix: number[][] = [];
  
  for (let i = 0; i < n; i++) {
    correlationMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        correlationMatrix[i][j] = 1.0;
      } else {
        // Use correlation from asset data or calculate based on asset classes
        correlationMatrix[i][j] = assets[i].correlation || 0.5;
      }
    }
  }
  
  return correlationMatrix;
}

function calculateCovarianceMatrix(volatilities: number[], correlationMatrix: number[][]): number[][] {
  const n = volatilities.length;
  const covarianceMatrix: number[][] = [];
  
  for (let i = 0; i < n; i++) {
    covarianceMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      covarianceMatrix[i][j] = volatilities[i] * volatilities[j] * correlationMatrix[i][j] / 10000; // Convert to decimal
    }
  }
  
  return covarianceMatrix;
}

function meanVarianceOptimization(expectedReturns: number[], covarianceMatrix: number[][], settings: any): number[] {
  // Simplified mean-variance optimization
  // In practice, this would use a quadratic programming solver
  
  const n = expectedReturns.length;
  const weights = new Array(n).fill(1 / n); // Equal weight as starting point
  
  // Simple optimization: adjust weights based on Sharpe ratios
  const sharpeRatios = expectedReturns.map((ret, i) => (ret - settings.riskFreeRate) / Math.sqrt(covarianceMatrix[i][i]));
  const totalSharpe = sharpeRatios.reduce((sum, sr) => sum + Math.max(0, sr), 0);
  
  if (totalSharpe > 0) {
    for (let i = 0; i < n; i++) {
      weights[i] = Math.max(0, sharpeRatios[i]) / totalSharpe;
    }
  }
  
  // Normalize weights
  const sum = weights.reduce((s, w) => s + w, 0);
  return weights.map(w => w / sum);
}

function blackLittermanOptimization(expectedReturns: number[], covarianceMatrix: number[][], settings: any): number[] {
  // Simplified Black-Litterman optimization
  // In practice, this would incorporate market equilibrium and views
  
  return meanVarianceOptimization(expectedReturns, covarianceMatrix, settings);
}

function riskParityOptimization(covarianceMatrix: number[][], settings: any): number[] {
  // Simplified risk parity optimization
  // In practice, this would equalize risk contributions
  
  const n = covarianceMatrix.length;
  const weights = new Array(n).fill(1 / n);
  
  // Adjust weights to equalize risk contributions
  const riskContributions = calculateRiskContributions(weights, covarianceMatrix);
  const avgRisk = riskContributions.reduce((sum, rc) => sum + rc.contribution, 0) / n;
  
  for (let i = 0; i < n; i++) {
    if (riskContributions[i].contribution > avgRisk) {
      weights[i] *= 0.9;
    } else {
      weights[i] *= 1.1;
    }
  }
  
  // Normalize weights
  const sum = weights.reduce((s, w) => s + w, 0);
  return weights.map(w => w / sum);
}

function maximumSharpeOptimization(expectedReturns: number[], covarianceMatrix: number[][], settings: any): number[] {
  // Simplified maximum Sharpe ratio optimization
  
  const n = expectedReturns.length;
  const weights = new Array(n).fill(1 / n);
  
  // Find asset with highest Sharpe ratio
  const sharpeRatios = expectedReturns.map((ret, i) => (ret - settings.riskFreeRate) / Math.sqrt(covarianceMatrix[i][i]));
  const maxSharpeIndex = sharpeRatios.indexOf(Math.max(...sharpeRatios));
  
  // Allocate more weight to highest Sharpe ratio asset
  weights[maxSharpeIndex] = 0.5;
  const remainingWeight = 0.5 / (n - 1);
  
  for (let i = 0; i < n; i++) {
    if (i !== maxSharpeIndex) {
      weights[i] = remainingWeight;
    }
  }
  
  return weights;
}

function minimumVarianceOptimization(covarianceMatrix: number[][], settings: any): number[] {
  // Simplified minimum variance optimization
  
  const n = covarianceMatrix.length;
  const weights = new Array(n).fill(1 / n);
  
  // Find asset with lowest volatility
  const volatilities = covarianceMatrix.map((row, i) => Math.sqrt(row[i]));
  const minVolIndex = volatilities.indexOf(Math.min(...volatilities));
  
  // Allocate more weight to lowest volatility asset
  weights[minVolIndex] = 0.6;
  const remainingWeight = 0.4 / (n - 1);
  
  for (let i = 0; i < n; i++) {
    if (i !== minVolIndex) {
      weights[i] = remainingWeight;
    }
  }
  
  return weights;
}

function applyConstraints(weights: number[], assets: any[], inputs: AssetAllocationCalculatorInputs): number[] {
  const constrainedWeights = [...weights];
  const totalValue = inputs.portfolioInfo.basicInfo.totalValue;
  
  // Apply minimum investment constraints
  for (let i = 0; i < assets.length; i++) {
    const minInvestment = assets[i].minimumInvestment;
    const minWeight = minInvestment / totalValue;
    
    if (constrainedWeights[i] * totalValue < minInvestment) {
      constrainedWeights[i] = minWeight;
    }
  }
  
  // Apply maximum investment constraints
  for (let i = 0; i < assets.length; i++) {
    const maxInvestment = assets[i].maximumInvestment;
    const maxWeight = maxInvestment / totalValue;
    
    if (constrainedWeights[i] > maxWeight) {
      constrainedWeights[i] = maxWeight;
    }
  }
  
  // Normalize weights
  const sum = constrainedWeights.reduce((s, w) => s + w, 0);
  return constrainedWeights.map(w => w / sum);
}

function calculatePortfolioReturn(expectedReturns: number[], weights: number[]): number {
  return expectedReturns.reduce((sum, ret, i) => sum + ret * weights[i], 0);
}

function calculatePortfolioVolatility(covarianceMatrix: number[][], weights: number[]): number {
  let variance = 0;
  const n = weights.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      variance += weights[i] * weights[j] * covarianceMatrix[i][j];
    }
  }
  
  return Math.sqrt(variance);
}

function calculateMaxDrawdown(expectedReturn: number, expectedVolatility: number): number {
  // Simplified max drawdown calculation
  return expectedVolatility * 2.5; // Rough approximation
}

function calculateVaR(expectedReturn: number, expectedVolatility: number, confidenceLevel: number): number {
  const zScore = confidenceLevel === 0.95 ? 1.645 : 2.326;
  return expectedVolatility * zScore;
}

function calculateCVaR(expectedReturn: number, expectedVolatility: number, confidenceLevel: number): number {
  const varValue = calculateVaR(expectedReturn, expectedVolatility, confidenceLevel);
  return varValue * 1.5; // Rough approximation
}

function calculatePortfolioBeta(assets: any[], weights: number[]): number {
  return assets.reduce((sum, asset, i) => sum + asset.beta * weights[i], 0);
}

function calculateCorrelationWithMarket(assets: any[], weights: number[]): number {
  return assets.reduce((sum, asset, i) => sum + asset.correlation * weights[i], 0);
}

function calculateRiskContribution(assets: any[], weights: number[], covarianceMatrix: number[][], portfolioVolatility: number): RiskContribution[] {
  const riskContributions: RiskContribution[] = [];
  const n = weights.length;
  
  for (let i = 0; i < n; i++) {
    let contribution = 0;
    for (let j = 0; j < n; j++) {
      contribution += weights[j] * covarianceMatrix[i][j];
    }
    contribution = (weights[i] * contribution) / portfolioVolatility;
    
    riskContributions.push({
      assetClass: assets[i].name,
      contribution: contribution * 100 // Convert to percentage
    });
  }
  
  return riskContributions;
}

function calculateRiskContributions(weights: number[], covarianceMatrix: number[][]): any[] {
  const n = weights.length;
  const portfolioVolatility = calculatePortfolioVolatility(covarianceMatrix, weights);
  const riskContributions: any[] = [];
  
  for (let i = 0; i < n; i++) {
    let contribution = 0;
    for (let j = 0; j < n; j++) {
      contribution += weights[j] * covarianceMatrix[i][j];
    }
    contribution = (weights[i] * contribution) / portfolioVolatility;
    
    riskContributions.push({
      contribution: contribution * 100
    });
  }
  
  return riskContributions;
}