import { AssetAllocationCalculatorInputs, AssetAllocationCalculatorOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateAssetAllocationCalculatorInputs(inputs: AssetAllocationCalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Portfolio Information Validation
  if (inputs.portfolioInfo.basicInfo.portfolioName && inputs.portfolioInfo.basicInfo.portfolioName.trim().length === 0) {
    errors.portfolioName = 'Portfolio name cannot be empty';
  }

  if (inputs.portfolioInfo.basicInfo.portfolioName && inputs.portfolioInfo.basicInfo.portfolioName.length > 100) {
    errors.portfolioName = 'Portfolio name cannot exceed 100 characters';
  }

  if (!['individual', 'institutional', 'endowment', 'pension', 'foundation'].includes(inputs.portfolioInfo.basicInfo.portfolioType)) {
    errors.portfolioType = 'Invalid portfolio type';
  }

  if (inputs.portfolioInfo.basicInfo.totalValue <= 0) {
    errors.totalValue = 'Total portfolio value must be greater than 0';
  }

  if (inputs.portfolioInfo.basicInfo.totalValue > 10000000000) {
    errors.totalValue = 'Total portfolio value seems unusually high, please verify';
  }

  if (inputs.portfolioInfo.basicInfo.investmentHorizon <= 0) {
    errors.investmentHorizon = 'Investment horizon must be greater than 0';
  }

  if (inputs.portfolioInfo.basicInfo.investmentHorizon > 50) {
    errors.investmentHorizon = 'Investment horizon cannot exceed 50 years';
  }

  if (!['very_conservative', 'conservative', 'moderate', 'aggressive', 'very_aggressive'].includes(inputs.portfolioInfo.basicInfo.riskTolerance)) {
    errors.riskTolerance = 'Invalid risk tolerance level';
  }

  if (!['high', 'medium', 'low'].includes(inputs.portfolioInfo.basicInfo.liquidityRequirements)) {
    errors.liquidityRequirements = 'Invalid liquidity requirements level';
  }

  if (!['taxable', 'tax_deferred', 'tax_free'].includes(inputs.portfolioInfo.basicInfo.taxStatus)) {
    errors.taxStatus = 'Invalid tax status';
  }

  // Optimization Settings Validation
  if (!['mean-variance', 'black-litterman', 'risk-parity', 'maximum-sharpe', 'minimum-variance'].includes(inputs.optimizationSettings.optimizationMethod)) {
    errors.optimizationMethod = 'Invalid optimization method';
  }

  if (inputs.optimizationSettings.riskFreeRate < -10) {
    errors.riskFreeRate = 'Risk-free rate cannot be less than -10%';
  }

  if (inputs.optimizationSettings.riskFreeRate > 20) {
    errors.riskFreeRate = 'Risk-free rate cannot exceed 20%';
  }

  if (inputs.optimizationSettings.targetReturn < -50) {
    errors.targetReturn = 'Target return cannot be less than -50%';
  }

  if (inputs.optimizationSettings.targetReturn > 100) {
    errors.targetReturn = 'Target return cannot exceed 100%';
  }

  if (inputs.optimizationSettings.targetVolatility < 0) {
    errors.targetVolatility = 'Target volatility cannot be negative';
  }

  if (inputs.optimizationSettings.targetVolatility > 100) {
    errors.targetVolatility = 'Target volatility cannot exceed 100%';
  }

  if (inputs.optimizationSettings.transactionCosts < 0) {
    errors.transactionCosts = 'Transaction costs cannot be negative';
  }

  if (inputs.optimizationSettings.transactionCosts > 10) {
    errors.transactionCosts = 'Transaction costs cannot exceed 10%';
  }

  if (inputs.optimizationSettings.taxRate < 0) {
    errors.taxRate = 'Tax rate cannot be negative';
  }

  if (inputs.optimizationSettings.taxRate > 100) {
    errors.taxRate = 'Tax rate cannot exceed 100%';
  }

  if (inputs.optimizationSettings.inflationRate < -10) {
    errors.inflationRate = 'Inflation rate cannot be less than -10%';
  }

  if (inputs.optimizationSettings.inflationRate > 50) {
    errors.inflationRate = 'Inflation rate cannot exceed 50%';
  }

  // Monte Carlo Settings Validation
  if (inputs.optimizationSettings.monteCarloSettings.numberOfSimulations < 1000) {
    errors.numberOfSimulations = 'Number of simulations must be at least 1000';
  }

  if (inputs.optimizationSettings.monteCarloSettings.numberOfSimulations > 100000) {
    errors.numberOfSimulations = 'Number of simulations cannot exceed 100000';
  }

  if (inputs.optimizationSettings.monteCarloSettings.timeHorizon <= 0) {
    errors.timeHorizon = 'Time horizon must be greater than 0';
  }

  if (inputs.optimizationSettings.monteCarloSettings.timeHorizon > 50) {
    errors.timeHorizon = 'Time horizon cannot exceed 50 years';
  }

  if (inputs.optimizationSettings.monteCarloSettings.confidenceLevel < 0.5) {
    errors.confidenceLevel = 'Confidence level must be at least 0.5';
  }

  if (inputs.optimizationSettings.monteCarloSettings.confidenceLevel > 0.999) {
    errors.confidenceLevel = 'Confidence level cannot exceed 0.999';
  }

  // Asset Classes Validation
  validateAssetClass(inputs.assetClasses.equity.domesticLargeCap, 'domesticLargeCap', errors);
  validateAssetClass(inputs.assetClasses.equity.domesticMidCap, 'domesticMidCap', errors);
  validateAssetClass(inputs.assetClasses.equity.domesticSmallCap, 'domesticSmallCap', errors);
  validateAssetClass(inputs.assetClasses.equity.internationalDeveloped, 'internationalDeveloped', errors);
  validateAssetClass(inputs.assetClasses.equity.internationalEmerging, 'internationalEmerging', errors);

  validateAssetClass(inputs.assetClasses.fixedIncome.governmentBonds, 'governmentBonds', errors);
  validateAssetClass(inputs.assetClasses.fixedIncome.corporateBonds, 'corporateBonds', errors);
  validateAssetClass(inputs.assetClasses.fixedIncome.highYieldBonds, 'highYieldBonds', errors);
  validateAssetClass(inputs.assetClasses.fixedIncome.municipalBonds, 'municipalBonds', errors);

  validateAssetClass(inputs.assetClasses.cash.moneyMarket, 'moneyMarket', errors);
  validateAssetClass(inputs.assetClasses.cash.savingsAccount, 'savingsAccount', errors);

  validateAssetClass(inputs.assetClasses.realEstate.reits, 'reits', errors);
  validateAssetClass(inputs.assetClasses.realEstate.directRealEstate, 'directRealEstate', errors);

  validateAssetClass(inputs.assetClasses.commodities.gold, 'gold', errors);
  validateAssetClass(inputs.assetClasses.commodities.oil, 'oil', errors);

  validateAssetClass(inputs.assetClasses.alternatives.hedgeFunds, 'hedgeFunds', errors);
  validateAssetClass(inputs.assetClasses.alternatives.privateEquity, 'privateEquity', errors);

  // Business Logic Validation
  if (inputs.optimizationSettings.targetReturn < inputs.optimizationSettings.riskFreeRate) {
    errors.targetReturn = 'Target return should be greater than risk-free rate';
  }

  if (inputs.optimizationSettings.targetVolatility < 1) {
    errors.targetVolatility = 'Target volatility seems unusually low for a diversified portfolio';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateAssetAllocationCalculatorOutputs(outputs: AssetAllocationCalculatorOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Optimized Allocation Validation
  if (outputs.optimizedAllocation.expectedReturn < -100) {
    errors.expectedReturn = 'Expected return cannot be less than -100%';
  }

  if (outputs.optimizedAllocation.expectedReturn > 100) {
    errors.expectedReturn = 'Expected return cannot exceed 100%';
  }

  if (outputs.optimizedAllocation.expectedVolatility < 0) {
    errors.expectedVolatility = 'Expected volatility cannot be negative';
  }

  if (outputs.optimizedAllocation.expectedVolatility > 100) {
    errors.expectedVolatility = 'Expected volatility cannot exceed 100%';
  }

  if (outputs.optimizedAllocation.sharpeRatio < -10) {
    errors.sharpeRatio = 'Sharpe ratio cannot be less than -10';
  }

  if (outputs.optimizedAllocation.sharpeRatio > 10) {
    errors.sharpeRatio = 'Sharpe ratio cannot exceed 10';
  }

  if (outputs.optimizedAllocation.maxDrawdown < -100) {
    errors.maxDrawdown = 'Maximum drawdown cannot be less than -100%';
  }

  if (outputs.optimizedAllocation.maxDrawdown > 0) {
    errors.maxDrawdown = 'Maximum drawdown should be negative';
  }

  // Asset Allocation Validation
  if (outputs.optimizedAllocation.assetAllocation.length === 0) {
    errors.assetAllocation = 'Asset allocation array cannot be empty';
  }

  let totalWeight = 0;
  for (const allocation of outputs.optimizedAllocation.assetAllocation) {
    if (allocation.weight < 0) {
      errors.assetWeight = 'Asset weight cannot be negative';
    }

    if (allocation.weight > 100) {
      errors.assetWeight = 'Asset weight cannot exceed 100%';
    }

    if (allocation.expectedReturn < -100) {
      errors.assetExpectedReturn = 'Asset expected return cannot be less than -100%';
    }

    if (allocation.expectedReturn > 100) {
      errors.assetExpectedReturn = 'Asset expected return cannot exceed 100%';
    }

    if (allocation.volatility < 0) {
      errors.assetVolatility = 'Asset volatility cannot be negative';
    }

    if (allocation.volatility > 100) {
      errors.assetVolatility = 'Asset volatility cannot exceed 100%';
    }

    if (allocation.sharpeRatio < -10) {
      errors.assetSharpeRatio = 'Asset Sharpe ratio cannot be less than -10';
    }

    if (allocation.sharpeRatio > 10) {
      errors.assetSharpeRatio = 'Asset Sharpe ratio cannot exceed 10';
    }

    if (allocation.maxDrawdown < -100) {
      errors.assetMaxDrawdown = 'Asset maximum drawdown cannot be less than -100%';
    }

    if (allocation.maxDrawdown > 0) {
      errors.assetMaxDrawdown = 'Asset maximum drawdown should be negative';
    }

    if (allocation.correlation < -1) {
      errors.assetCorrelation = 'Asset correlation cannot be less than -1';
    }

    if (allocation.correlation > 1) {
      errors.assetCorrelation = 'Asset correlation cannot exceed 1';
    }

    if (allocation.marketValue < 0) {
      errors.assetMarketValue = 'Asset market value cannot be negative';
    }

    totalWeight += allocation.weight;
  }

  if (Math.abs(totalWeight - 100) > 0.01) {
    errors.totalWeight = 'Total asset weights must equal 100%';
  }

  // Risk Analysis Validation
  if (outputs.riskAnalysis.var95 < 0) {
    errors.var95 = 'VaR (95%) cannot be negative';
  }

  if (outputs.riskAnalysis.cvar95 < 0) {
    errors.cvar95 = 'CVaR (95%) cannot be negative';
  }

  if (outputs.riskAnalysis.cvar95 < outputs.riskAnalysis.var95) {
    errors.cvarVaR = 'CVaR (95%) should be greater than VaR (95%)';
  }

  if (outputs.riskAnalysis.beta < -5) {
    errors.beta = 'Beta cannot be less than -5';
  }

  if (outputs.riskAnalysis.beta > 5) {
    errors.beta = 'Beta cannot exceed 5';
  }

  if (outputs.riskAnalysis.correlationWithMarket < -1) {
    errors.correlationWithMarket = 'Correlation with market cannot be less than -1';
  }

  if (outputs.riskAnalysis.correlationWithMarket > 1) {
    errors.correlationWithMarket = 'Correlation with market cannot exceed 1';
  }

  // Risk Contribution Validation
  if (outputs.riskAnalysis.riskContribution.length === 0) {
    errors.riskContribution = 'Risk contribution array cannot be empty';
  }

  let totalRiskContribution = 0;
  for (const contribution of outputs.riskAnalysis.riskContribution) {
    if (contribution.contribution < 0) {
      errors.riskContributionValue = 'Risk contribution cannot be negative';
    }

    if (contribution.contribution > 100) {
      errors.riskContributionValue = 'Risk contribution cannot exceed 100%';
    }

    totalRiskContribution += contribution.contribution;
  }

  if (Math.abs(totalRiskContribution - 100) > 0.01) {
    errors.totalRiskContribution = 'Total risk contributions must equal 100%';
  }

  // Scenario Analysis Validation
  if (outputs.scenarioAnalysis.scenarios.length === 0) {
    errors.scenarios = 'Scenarios array cannot be empty';
  }

  for (const scenario of outputs.scenarioAnalysis.scenarios) {
    if (scenario.expectedReturn < -100) {
      errors.scenarioExpectedReturn = 'Scenario expected return cannot be less than -100%';
    }

    if (scenario.expectedReturn > 100) {
      errors.scenarioExpectedReturn = 'Scenario expected return cannot exceed 100%';
    }

    if (scenario.volatility < 0) {
      errors.scenarioVolatility = 'Scenario volatility cannot be negative';
    }

    if (scenario.volatility > 100) {
      errors.scenarioVolatility = 'Scenario volatility cannot exceed 100%';
    }

    if (scenario.sharpeRatio < -10) {
      errors.scenarioSharpeRatio = 'Scenario Sharpe ratio cannot be less than -10';
    }

    if (scenario.sharpeRatio > 10) {
      errors.scenarioSharpeRatio = 'Scenario Sharpe ratio cannot exceed 10';
    }

    if (scenario.maxDrawdown < -100) {
      errors.scenarioMaxDrawdown = 'Scenario maximum drawdown cannot be less than -100%';
    }

    if (scenario.maxDrawdown > 0) {
      errors.scenarioMaxDrawdown = 'Scenario maximum drawdown should be negative';
    }
  }

  // Rebalancing Strategy Validation
  if (!['monthly', 'quarterly', 'semi-annually', 'annually'].includes(outputs.rebalancingStrategy.recommendedFrequency)) {
    errors.recommendedFrequency = 'Invalid recommended frequency';
  }

  if (outputs.rebalancingStrategy.rebalancingThreshold < 0) {
    errors.rebalancingThreshold = 'Rebalancing threshold cannot be negative';
  }

  if (outputs.rebalancingStrategy.rebalancingThreshold > 50) {
    errors.rebalancingThreshold = 'Rebalancing threshold cannot exceed 50%';
  }

  if (outputs.rebalancingStrategy.expectedRebalancingCost < 0) {
    errors.expectedRebalancingCost = 'Expected rebalancing cost cannot be negative';
  }

  // Allocation Comparison Validation
  if (outputs.rebalancingStrategy.allocationComparison.length === 0) {
    errors.allocationComparison = 'Allocation comparison array cannot be empty';
  }

  for (const comparison of outputs.rebalancingStrategy.allocationComparison) {
    if (comparison.currentWeight < 0) {
      errors.currentWeight = 'Current weight cannot be negative';
    }

    if (comparison.currentWeight > 100) {
      errors.currentWeight = 'Current weight cannot exceed 100%';
    }

    if (comparison.targetWeight < 0) {
      errors.targetWeight = 'Target weight cannot be negative';
    }

    if (comparison.targetWeight > 100) {
      errors.targetWeight = 'Target weight cannot exceed 100%';
    }

    if (Math.abs(comparison.difference - (comparison.targetWeight - comparison.currentWeight)) > 0.01) {
      errors.difference = 'Difference should equal target weight minus current weight';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

function validateAssetClass(assetClass: any, assetName: string, errors: Record<string, string>): void {
  if (assetClass.expectedReturn < -100) {
    errors[`${assetName}ExpectedReturn`] = `${assetName} expected return cannot be less than -100%`;
  }

  if (assetClass.expectedReturn > 100) {
    errors[`${assetName}ExpectedReturn`] = `${assetName} expected return cannot exceed 100%`;
  }

  if (assetClass.volatility < 0) {
    errors[`${assetName}Volatility`] = `${assetName} volatility cannot be negative`;
  }

  if (assetClass.volatility > 100) {
    errors[`${assetName}Volatility`] = `${assetName} volatility cannot exceed 100%`;
  }

  if (assetClass.correlation < -1) {
    errors[`${assetName}Correlation`] = `${assetName} correlation cannot be less than -1`;
  }

  if (assetClass.correlation > 1) {
    errors[`${assetName}Correlation`] = `${assetName} correlation cannot exceed 1`;
  }

  if (assetClass.beta < -5) {
    errors[`${assetName}Beta`] = `${assetName} beta cannot be less than -5`;
  }

  if (assetClass.beta > 5) {
    errors[`${assetName}Beta`] = `${assetName} beta cannot exceed 5`;
  }

  if (assetClass.sharpeRatio < -10) {
    errors[`${assetName}SharpeRatio`] = `${assetName} Sharpe ratio cannot be less than -10`;
  }

  if (assetClass.sharpeRatio > 10) {
    errors[`${assetName}SharpeRatio`] = `${assetName} Sharpe ratio cannot exceed 10`;
  }

  if (assetClass.maxDrawdown < -100) {
    errors[`${assetName}MaxDrawdown`] = `${assetName} maximum drawdown cannot be less than -100%`;
  }

  if (assetClass.maxDrawdown > 0) {
    errors[`${assetName}MaxDrawdown`] = `${assetName} maximum drawdown should be negative`;
  }

  if (!['high', 'medium', 'low'].includes(assetClass.liquidity)) {
    errors[`${assetName}Liquidity`] = `${assetName} liquidity must be high, medium, or low`;
  }

  if (assetClass.taxEfficiency < 0) {
    errors[`${assetName}TaxEfficiency`] = `${assetName} tax efficiency cannot be negative`;
  }

  if (assetClass.taxEfficiency > 1) {
    errors[`${assetName}TaxEfficiency`] = `${assetName} tax efficiency cannot exceed 1`;
  }

  if (assetClass.minimumInvestment < 0) {
    errors[`${assetName}MinimumInvestment`] = `${assetName} minimum investment cannot be negative`;
  }

  if (assetClass.maximumInvestment <= 0) {
    errors[`${assetName}MaximumInvestment`] = `${assetName} maximum investment must be greater than 0`;
  }

  if (assetClass.minimumInvestment >= assetClass.maximumInvestment) {
    errors[`${assetName}InvestmentRange`] = `${assetName} minimum investment must be less than maximum investment`;
  }
}