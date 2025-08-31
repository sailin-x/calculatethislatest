import { RiskManagementCalculatorInputs, RiskManagementCalculatorOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRiskManagementCalculatorInputs(inputs: RiskManagementCalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  validatePortfolioInfo(inputs.portfolioInfo, errors);
  validateRiskMetrics(inputs.riskMetrics, errors);
  validateRiskFactors(inputs.riskFactors, errors);
  validateStressTesting(inputs.stressTesting, errors);
  validateRiskLimits(inputs.riskLimits, errors);
  validateMonitoring(inputs.monitoring, errors);
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRiskManagementCalculatorOutputs(outputs: RiskManagementCalculatorOutputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Validate core metrics
  if (outputs.portfolioVolatility < 0 || outputs.portfolioVolatility > 1) {
    errors.portfolioVolatility = 'Portfolio volatility must be between 0 and 1';
  }
  
  if (outputs.valueAtRisk < 0) {
    errors.valueAtRisk = 'Value at Risk must be non-negative';
  }
  
  if (outputs.expectedShortfall < 0) {
    errors.expectedShortfall = 'Expected Shortfall must be non-negative';
  }
  
  if (outputs.downsideDeviation < 0) {
    errors.downsideDeviation = 'Downside deviation must be non-negative';
  }
  
  if (outputs.maxDrawdown < 0 || outputs.maxDrawdown > 1) {
    errors.maxDrawdown = 'Maximum drawdown must be between 0 and 1';
  }
  
  if (outputs.sharpeRatio < -5 || outputs.sharpeRatio > 5) {
    errors.sharpeRatio = 'Sharpe ratio must be between -5 and 5';
  }
  
  if (outputs.informationRatio < -5 || outputs.informationRatio > 5) {
    errors.informationRatio = 'Information ratio must be between -5 and 5';
  }
  
  if (outputs.calmarRatio < -10 || outputs.calmarRatio > 10) {
    errors.calmarRatio = 'Calmar ratio must be between -10 and 10';
  }
  
  if (outputs.portfolioBeta < -3 || outputs.portfolioBeta > 3) {
    errors.portfolioBeta = 'Portfolio beta must be between -3 and 3';
  }
  
  if (outputs.riskManagementScore < 0 || outputs.riskManagementScore > 1) {
    errors.riskManagementScore = 'Risk management score must be between 0 and 1';
  }
  
  // Validate recommendation
  const validRecommendations = ['excellent', 'good', 'fair', 'poor', 'needs_improvement'];
  if (!validRecommendations.includes(outputs.recommendation)) {
    errors.recommendation = 'Invalid recommendation value';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

function validatePortfolioInfo(portfolioInfo: any, errors: Record<string, string>): void {
  // Basic info validation
  if (!portfolioInfo.basicInfo.portfolioName || portfolioInfo.basicInfo.portfolioName.trim().length === 0) {
    errors['portfolioInfo.basicInfo.portfolioName'] = 'Portfolio name is required';
  }
  
  if (portfolioInfo.basicInfo.portfolioName && portfolioInfo.basicInfo.portfolioName.length > 100) {
    errors['portfolioInfo.basicInfo.portfolioName'] = 'Portfolio name must be 100 characters or less';
  }
  
  const validPortfolioTypes = ['equity', 'fixed_income', 'balanced', 'alternative', 'multi_asset'];
  if (!validPortfolioTypes.includes(portfolioInfo.basicInfo.portfolioType)) {
    errors['portfolioInfo.basicInfo.portfolioType'] = 'Invalid portfolio type';
  }
  
  if (portfolioInfo.basicInfo.totalValue < 0) {
    errors['portfolioInfo.basicInfo.totalValue'] = 'Total portfolio value must be non-negative';
  }
  
  if (portfolioInfo.basicInfo.totalValue > 1000000000000) {
    errors['portfolioInfo.basicInfo.totalValue'] = 'Total portfolio value must be less than 1 trillion';
  }
  
  const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  if (!validCurrencies.includes(portfolioInfo.basicInfo.currency)) {
    errors['portfolioInfo.basicInfo.currency'] = 'Invalid currency';
  }
  
  if (portfolioInfo.basicInfo.investmentHorizon < 1 || portfolioInfo.basicInfo.investmentHorizon > 50) {
    errors['portfolioInfo.basicInfo.investmentHorizon'] = 'Investment horizon must be between 1 and 50 years';
  }
  
  const validRiskTolerances = ['conservative', 'moderate', 'aggressive', 'very_aggressive'];
  if (!validRiskTolerances.includes(portfolioInfo.basicInfo.riskTolerance)) {
    errors['portfolioInfo.basicInfo.riskTolerance'] = 'Invalid risk tolerance';
  }
  
  const validLiquidityRequirements = ['high', 'medium', 'low'];
  if (!validLiquidityRequirements.includes(portfolioInfo.basicInfo.liquidityRequirements)) {
    errors['portfolioInfo.basicInfo.liquidityRequirements'] = 'Invalid liquidity requirements';
  }
  
  // Holdings validation
  if (!Array.isArray(portfolioInfo.portfolioHoldings)) {
    errors['portfolioInfo.portfolioHoldings'] = 'Portfolio holdings must be an array';
  } else {
    portfolioInfo.portfolioHoldings.forEach((holding: any, index: number) => {
      validateHolding(holding, errors, index);
    });
  }
}

function validateHolding(holding: any, errors: Record<string, string>, index: number): void {
  if (!holding.asset || holding.asset.trim().length === 0) {
    errors[`portfolioInfo.portfolioHoldings[${index}].asset`] = 'Asset name is required';
  }
  
  if (holding.asset && holding.asset.length > 50) {
    errors[`portfolioInfo.portfolioHoldings[${index}].asset`] = 'Asset name must be 50 characters or less';
  }
  
  if (!holding.symbol || holding.symbol.trim().length === 0) {
    errors[`portfolioInfo.portfolioHoldings[${index}].symbol`] = 'Asset symbol is required';
  }
  
  if (holding.symbol && holding.symbol.length > 10) {
    errors[`portfolioInfo.portfolioHoldings[${index}].symbol`] = 'Asset symbol must be 10 characters or less';
  }
  
  const validAssetTypes = ['stock', 'bond', 'etf', 'mutual_fund', 'commodity', 'real_estate', 'alternative'];
  if (!validAssetTypes.includes(holding.assetType)) {
    errors[`portfolioInfo.portfolioHoldings[${index}].assetType`] = 'Invalid asset type';
  }
  
  if (holding.quantity <= 0) {
    errors[`portfolioInfo.portfolioHoldings[${index}].quantity`] = 'Quantity must be positive';
  }
  
  if (holding.price <= 0) {
    errors[`portfolioInfo.portfolioHoldings[${index}].price`] = 'Price must be positive';
  }
  
  if (holding.marketValue <= 0) {
    errors[`portfolioInfo.portfolioHoldings[${index}].marketValue`] = 'Market value must be positive';
  }
  
  if (holding.weight < 0 || holding.weight > 1) {
    errors[`portfolioInfo.portfolioHoldings[${index}].weight`] = 'Weight must be between 0 and 1';
  }
  
  if (holding.beta < -5 || holding.beta > 5) {
    errors[`portfolioInfo.portfolioHoldings[${index}].beta`] = 'Beta must be between -5 and 5';
  }
  
  if (holding.volatility < 0 || holding.volatility > 1) {
    errors[`portfolioInfo.portfolioHoldings[${index}].volatility`] = 'Volatility must be between 0 and 1';
  }
  
  if (holding.correlation < -1 || holding.correlation > 1) {
    errors[`portfolioInfo.portfolioHoldings[${index}].correlation`] = 'Correlation must be between -1 and 1';
  }
  
  if (holding.expectedReturn < -1 || holding.expectedReturn > 1) {
    errors[`portfolioInfo.portfolioHoldings[${index}].expectedReturn`] = 'Expected return must be between -1 and 1';
  }
}

function validateRiskMetrics(riskMetrics: any, errors: Record<string, string>): void {
  // VaR validation
  if (riskMetrics.valueAtRisk.varConfidenceLevel < 0.5 || riskMetrics.valueAtRisk.varConfidenceLevel > 0.999) {
    errors['riskMetrics.valueAtRisk.varConfidenceLevel'] = 'VaR confidence level must be between 0.5 and 0.999';
  }
  
  if (riskMetrics.valueAtRisk.varTimeHorizon < 1 || riskMetrics.valueAtRisk.varTimeHorizon > 365) {
    errors['riskMetrics.valueAtRisk.varTimeHorizon'] = 'VaR time horizon must be between 1 and 365 days';
  }
  
  // Volatility metrics validation
  if (riskMetrics.volatilityMetrics.portfolioVolatility < 0 || riskMetrics.volatilityMetrics.portfolioVolatility > 1) {
    errors['riskMetrics.volatilityMetrics.portfolioVolatility'] = 'Portfolio volatility must be between 0 and 1';
  }
  
  if (riskMetrics.volatilityMetrics.annualizedVolatility < 0 || riskMetrics.volatilityMetrics.annualizedVolatility > 1) {
    errors['riskMetrics.volatilityMetrics.annualizedVolatility'] = 'Annualized volatility must be between 0 and 1';
  }
  
  // Downside risk validation
  if (riskMetrics.downsideRisk.downsideDeviation < 0) {
    errors['riskMetrics.downsideRisk.downsideDeviation'] = 'Downside deviation must be non-negative';
  }
  
  if (riskMetrics.downsideRisk.semiDeviation < 0) {
    errors['riskMetrics.downsideRisk.semiDeviation'] = 'Semi-deviation must be non-negative';
  }
  
  // Drawdown metrics validation
  if (riskMetrics.drawdownMetrics.maxDrawdown < 0 || riskMetrics.drawdownMetrics.maxDrawdown > 1) {
    errors['riskMetrics.drawdownMetrics.maxDrawdown'] = 'Maximum drawdown must be between 0 and 1';
  }
  
  if (riskMetrics.drawdownMetrics.currentDrawdown < 0 || riskMetrics.drawdownMetrics.currentDrawdown > 1) {
    errors['riskMetrics.drawdownMetrics.currentDrawdown'] = 'Current drawdown must be between 0 and 1';
  }
  
  if (riskMetrics.drawdownMetrics.calmarRatio < -10 || riskMetrics.drawdownMetrics.calmarRatio > 10) {
    errors['riskMetrics.drawdownMetrics.calmarRatio'] = 'Calmar ratio must be between -10 and 10';
  }
  
  // Correlation metrics validation
  if (riskMetrics.correlationMetrics.portfolioCorrelation < -1 || riskMetrics.correlationMetrics.portfolioCorrelation > 1) {
    errors['riskMetrics.correlationMetrics.portfolioCorrelation'] = 'Portfolio correlation must be between -1 and 1';
  }
  
  if (riskMetrics.correlationMetrics.averageCorrelation < -1 || riskMetrics.correlationMetrics.averageCorrelation > 1) {
    errors['riskMetrics.correlationMetrics.averageCorrelation'] = 'Average correlation must be between -1 and 1';
  }
  
  // Beta metrics validation
  if (riskMetrics.betaMetrics.portfolioBeta < -5 || riskMetrics.betaMetrics.portfolioBeta > 5) {
    errors['riskMetrics.betaMetrics.portfolioBeta'] = 'Portfolio beta must be between -5 and 5';
  }
  
  if (riskMetrics.betaMetrics.weightedBeta < -5 || riskMetrics.betaMetrics.weightedBeta > 5) {
    errors['riskMetrics.betaMetrics.weightedBeta'] = 'Weighted beta must be between -5 and 5';
  }
}

function validateRiskFactors(riskFactors: any, errors: Record<string, string>): void {
  // Market risk validation
  if (riskFactors.marketRisk.equityRisk < 0 || riskFactors.marketRisk.equityRisk > 1) {
    errors['riskFactors.marketRisk.equityRisk'] = 'Equity risk must be between 0 and 1';
  }
  
  if (riskFactors.marketRisk.interestRateRisk < 0 || riskFactors.marketRisk.interestRateRisk > 1) {
    errors['riskFactors.marketRisk.interestRateRisk'] = 'Interest rate risk must be between 0 and 1';
  }
  
  if (riskFactors.marketRisk.currencyRisk < 0 || riskFactors.marketRisk.currencyRisk > 1) {
    errors['riskFactors.marketRisk.currencyRisk'] = 'Currency risk must be between 0 and 1';
  }
  
  if (riskFactors.marketRisk.commodityRisk < 0 || riskFactors.marketRisk.commodityRisk > 1) {
    errors['riskFactors.marketRisk.commodityRisk'] = 'Commodity risk must be between 0 and 1';
  }
  
  if (riskFactors.marketRisk.creditRisk < 0 || riskFactors.marketRisk.creditRisk > 1) {
    errors['riskFactors.marketRisk.creditRisk'] = 'Credit risk must be between 0 and 1';
  }
  
  if (riskFactors.marketRisk.volatilityRisk < 0 || riskFactors.marketRisk.volatilityRisk > 1) {
    errors['riskFactors.marketRisk.volatilityRisk'] = 'Volatility risk must be between 0 and 1';
  }
  
  // Factor risk validation
  if (riskFactors.factorRisk.sizeRisk < 0 || riskFactors.factorRisk.sizeRisk > 1) {
    errors['riskFactors.factorRisk.sizeRisk'] = 'Size risk must be between 0 and 1';
  }
  
  if (riskFactors.factorRisk.valueRisk < 0 || riskFactors.factorRisk.valueRisk > 1) {
    errors['riskFactors.factorRisk.valueRisk'] = 'Value risk must be between 0 and 1';
  }
  
  if (riskFactors.factorRisk.momentumRisk < 0 || riskFactors.factorRisk.momentumRisk > 1) {
    errors['riskFactors.factorRisk.momentumRisk'] = 'Momentum risk must be between 0 and 1';
  }
  
  if (riskFactors.factorRisk.qualityRisk < 0 || riskFactors.factorRisk.qualityRisk > 1) {
    errors['riskFactors.factorRisk.qualityRisk'] = 'Quality risk must be between 0 and 1';
  }
  
  if (riskFactors.factorRisk.lowVolatilityRisk < 0 || riskFactors.factorRisk.lowVolatilityRisk > 1) {
    errors['riskFactors.factorRisk.lowVolatilityRisk'] = 'Low volatility risk must be between 0 and 1';
  }
  
  if (riskFactors.factorRisk.dividendRisk < 0 || riskFactors.factorRisk.dividendRisk > 1) {
    errors['riskFactors.factorRisk.dividendRisk'] = 'Dividend risk must be between 0 and 1';
  }
  
  // Sector risk validation
  if (riskFactors.sectorRisk.technologyRisk < 0 || riskFactors.sectorRisk.technologyRisk > 1) {
    errors['riskFactors.sectorRisk.technologyRisk'] = 'Technology risk must be between 0 and 1';
  }
  
  if (riskFactors.sectorRisk.healthcareRisk < 0 || riskFactors.sectorRisk.healthcareRisk > 1) {
    errors['riskFactors.sectorRisk.healthcareRisk'] = 'Healthcare risk must be between 0 and 1';
  }
  
  if (riskFactors.sectorRisk.financialRisk < 0 || riskFactors.sectorRisk.financialRisk > 1) {
    errors['riskFactors.sectorRisk.financialRisk'] = 'Financial risk must be between 0 and 1';
  }
  
  if (riskFactors.sectorRisk.consumerRisk < 0 || riskFactors.sectorRisk.consumerRisk > 1) {
    errors['riskFactors.sectorRisk.consumerRisk'] = 'Consumer risk must be between 0 and 1';
  }
  
  if (riskFactors.sectorRisk.energyRisk < 0 || riskFactors.sectorRisk.energyRisk > 1) {
    errors['riskFactors.sectorRisk.energyRisk'] = 'Energy risk must be between 0 and 1';
  }
  
  if (riskFactors.sectorRisk.industrialRisk < 0 || riskFactors.sectorRisk.industrialRisk > 1) {
    errors['riskFactors.sectorRisk.industrialRisk'] = 'Industrial risk must be between 0 and 1';
  }
  
  // Geographic risk validation
  if (riskFactors.geographicRisk.domesticRisk < 0 || riskFactors.geographicRisk.domesticRisk > 1) {
    errors['riskFactors.geographicRisk.domesticRisk'] = 'Domestic risk must be between 0 and 1';
  }
  
  if (riskFactors.geographicRisk.developedMarketRisk < 0 || riskFactors.geographicRisk.developedMarketRisk > 1) {
    errors['riskFactors.geographicRisk.developedMarketRisk'] = 'Developed market risk must be between 0 and 1';
  }
  
  if (riskFactors.geographicRisk.emergingMarketRisk < 0 || riskFactors.geographicRisk.emergingMarketRisk > 1) {
    errors['riskFactors.geographicRisk.emergingMarketRisk'] = 'Emerging market risk must be between 0 and 1';
  }
  
  if (riskFactors.geographicRisk.frontierMarketRisk < 0 || riskFactors.geographicRisk.frontierMarketRisk > 1) {
    errors['riskFactors.geographicRisk.frontierMarketRisk'] = 'Frontier market risk must be between 0 and 1';
  }
  
  // Liquidity risk validation
  if (riskFactors.liquidityRisk.bidAskSpread < 0 || riskFactors.liquidityRisk.bidAskSpread > 1) {
    errors['riskFactors.liquidityRisk.bidAskSpread'] = 'Bid-ask spread must be between 0 and 1';
  }
  
  if (riskFactors.liquidityRisk.marketDepth < 0) {
    errors['riskFactors.liquidityRisk.marketDepth'] = 'Market depth must be non-negative';
  }
  
  if (riskFactors.liquidityRisk.tradingVolume < 0) {
    errors['riskFactors.liquidityRisk.tradingVolume'] = 'Trading volume must be non-negative';
  }
  
  if (riskFactors.liquidityRisk.liquidityScore < 0 || riskFactors.liquidityRisk.liquidityScore > 1) {
    errors['riskFactors.liquidityRisk.liquidityScore'] = 'Liquidity score must be between 0 and 1';
  }
  
  if (riskFactors.liquidityRisk.illiquidAssets < 0 || riskFactors.liquidityRisk.illiquidAssets > 1) {
    errors['riskFactors.liquidityRisk.illiquidAssets'] = 'Illiquid assets must be between 0 and 1';
  }
  
  // Concentration risk validation
  if (riskFactors.concentrationRisk.topHoldingsConcentration < 0 || riskFactors.concentrationRisk.topHoldingsConcentration > 1) {
    errors['riskFactors.concentrationRisk.topHoldingsConcentration'] = 'Top holdings concentration must be between 0 and 1';
  }
  
  if (riskFactors.concentrationRisk.sectorConcentration < 0 || riskFactors.concentrationRisk.sectorConcentration > 1) {
    errors['riskFactors.concentrationRisk.sectorConcentration'] = 'Sector concentration must be between 0 and 1';
  }
  
  if (riskFactors.concentrationRisk.geographicConcentration < 0 || riskFactors.concentrationRisk.geographicConcentration > 1) {
    errors['riskFactors.concentrationRisk.geographicConcentration'] = 'Geographic concentration must be between 0 and 1';
  }
  
  if (riskFactors.concentrationRisk.currencyConcentration < 0 || riskFactors.concentrationRisk.currencyConcentration > 1) {
    errors['riskFactors.concentrationRisk.currencyConcentration'] = 'Currency concentration must be between 0 and 1';
  }
  
  if (riskFactors.concentrationRisk.issuerConcentration < 0 || riskFactors.concentrationRisk.issuerConcentration > 1) {
    errors['riskFactors.concentrationRisk.issuerConcentration'] = 'Issuer concentration must be between 0 and 1';
  }
}

function validateStressTesting(stressTesting: any, errors: Record<string, string>): void {
  if (!Array.isArray(stressTesting.scenarios)) {
    errors['stressTesting.scenarios'] = 'Stress testing scenarios must be an array';
  } else {
    stressTesting.scenarios.forEach((scenario: any, index: number) => {
      validateScenario(scenario, errors, index);
    });
  }
  
  if (!Array.isArray(stressTesting.sensitivityAnalysis)) {
    errors['stressTesting.sensitivityAnalysis'] = 'Sensitivity analysis must be an array';
  }
  
  // Stress test results validation
  if (stressTesting.stressTestResults.worstCaseScenario < -1 || stressTesting.stressTestResults.worstCaseScenario > 1) {
    errors['stressTesting.stressTestResults.worstCaseScenario'] = 'Worst case scenario must be between -1 and 1';
  }
  
  if (stressTesting.stressTestResults.bestCaseScenario < -1 || stressTesting.stressTestResults.bestCaseScenario > 1) {
    errors['stressTesting.stressTestResults.bestCaseScenario'] = 'Best case scenario must be between -1 and 1';
  }
  
  if (stressTesting.stressTestResults.expectedScenario < -1 || stressTesting.stressTestResults.expectedScenario > 1) {
    errors['stressTesting.stressTestResults.expectedScenario'] = 'Expected scenario must be between -1 and 1';
  }
  
  if (stressTesting.stressTestResults.stressTestScore < 0 || stressTesting.stressTestResults.stressTestScore > 1) {
    errors['stressTesting.stressTestResults.stressTestScore'] = 'Stress test score must be between 0 and 1';
  }
}

function validateScenario(scenario: any, errors: Record<string, string>, index: number): void {
  if (!scenario.name || scenario.name.trim().length === 0) {
    errors[`stressTesting.scenarios[${index}].name`] = 'Scenario name is required';
  }
  
  if (scenario.name && scenario.name.length > 100) {
    errors[`stressTesting.scenarios[${index}].name`] = 'Scenario name must be 100 characters or less';
  }
  
  if (scenario.description && scenario.description.length > 500) {
    errors[`stressTesting.scenarios[${index}].description`] = 'Scenario description must be 500 characters or less';
  }
  
  if (scenario.marketShock < -1 || scenario.marketShock > 1) {
    errors[`stressTesting.scenarios[${index}].marketShock`] = 'Market shock must be between -1 and 1';
  }
  
  if (scenario.interestRateShock < -1 || scenario.interestRateShock > 1) {
    errors[`stressTesting.scenarios[${index}].interestRateShock`] = 'Interest rate shock must be between -1 and 1';
  }
  
  if (scenario.currencyShock < -1 || scenario.currencyShock > 1) {
    errors[`stressTesting.scenarios[${index}].currencyShock`] = 'Currency shock must be between -1 and 1';
  }
  
  if (scenario.commodityShock < -1 || scenario.commodityShock > 1) {
    errors[`stressTesting.scenarios[${index}].commodityShock`] = 'Commodity shock must be between -1 and 1';
  }
  
  if (scenario.probability < 0 || scenario.probability > 1) {
    errors[`stressTesting.scenarios[${index}].probability`] = 'Probability must be between 0 and 1';
  }
  
  if (scenario.impact < -1 || scenario.impact > 1) {
    errors[`stressTesting.scenarios[${index}].impact`] = 'Impact must be between -1 and 1';
  }
}

function validateRiskLimits(riskLimits: any, errors: Record<string, string>): void {
  if (!Array.isArray(riskLimits.positionLimits)) {
    errors['riskLimits.positionLimits'] = 'Position limits must be an array';
  }
  
  if (!Array.isArray(riskLimits.sectorLimits)) {
    errors['riskLimits.sectorLimits'] = 'Sector limits must be an array';
  }
  
  if (!Array.isArray(riskLimits.geographicLimits)) {
    errors['riskLimits.geographicLimits'] = 'Geographic limits must be an array';
  }
  
  if (!Array.isArray(riskLimits.riskLimits)) {
    errors['riskLimits.riskLimits'] = 'Risk limits must be an array';
  }
  
  if (!Array.isArray(riskLimits.limitBreaches)) {
    errors['riskLimits.limitBreaches'] = 'Limit breaches must be an array';
  }
}

function validateMonitoring(monitoring: any, errors: Record<string, string>): void {
  if (!Array.isArray(monitoring.alerts)) {
    errors['monitoring.alerts'] = 'Alerts must be an array';
  }
  
  if (!Array.isArray(monitoring.reports)) {
    errors['monitoring.reports'] = 'Reports must be an array';
  }
  
  if (!Array.isArray(monitoring.dashboards)) {
    errors['monitoring.dashboards'] = 'Dashboards must be an array';
  }
  
  if (monitoring.monitoringScore < 0 || monitoring.monitoringScore > 1) {
    errors['monitoring.monitoringScore'] = 'Monitoring score must be between 0 and 1';
  }
}