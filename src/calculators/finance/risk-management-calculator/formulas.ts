import { RiskManagementCalculatorInputs, RiskManagementCalculatorOutputs } from './types';

export function calculateRiskManagement(inputs: RiskManagementCalculatorInputs): RiskManagementCalculatorOutputs {
  // Calculate portfolio volatility
  const portfolioVolatility = calculatePortfolioVolatility(inputs);
  
  // Calculate Value at Risk metrics
  const valueAtRisk = calculateValueAtRisk(inputs, portfolioVolatility);
  const expectedShortfall = calculateExpectedShortfall(inputs, valueAtRisk);
  
  // Calculate downside risk metrics
  const downsideDeviation = calculateDownsideDeviation(inputs);
  const maxDrawdown = calculateMaxDrawdown(inputs);
  
  // Calculate risk-adjusted returns
  const sharpeRatio = calculateSharpeRatio(inputs);
  const informationRatio = calculateInformationRatio(inputs);
  const calmarRatio = calculateCalmarRatio(inputs, maxDrawdown);
  
  // Calculate beta and correlation metrics
  const portfolioBeta = calculatePortfolioBeta(inputs);
  const correlationMetrics = calculateCorrelationMetrics(inputs);
  
  // Calculate risk management score
  const riskManagementScore = calculateRiskManagementScore(inputs, {
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall,
    downsideDeviation,
    maxDrawdown,
    sharpeRatio,
    informationRatio,
    calmarRatio,
    portfolioBeta
  });
  
  // Generate recommendations
  const recommendations = generateRiskRecommendations(inputs, {
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall,
    downsideDeviation,
    maxDrawdown,
    sharpeRatio,
    informationRatio,
    calmarRatio,
    portfolioBeta,
    riskManagementScore
  });
  
  // Calculate key metrics
  const keyMetrics = calculateKeyMetrics(inputs, {
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall,
    downsideDeviation,
    maxDrawdown,
    sharpeRatio,
    informationRatio,
    calmarRatio,
    portfolioBeta
  });
  
  // Calculate risk analysis
  const riskAnalysis = calculateRiskAnalysis(inputs, {
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall,
    downsideDeviation,
    maxDrawdown,
    sharpeRatio,
    informationRatio,
    calmarRatio,
    portfolioBeta
  });
  
  // Calculate stress testing results
  const stressTesting = calculateStressTesting(inputs, {
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall
  });
  
  // Calculate monitoring metrics
  const monitoring = calculateMonitoringMetrics(inputs, {
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall,
    riskManagementScore
  });
  
  // Determine recommendation level
  const recommendation = determineRecommendation(riskManagementScore);
  
  return {
    // Core Risk Metrics
    portfolioVolatility,
    valueAtRisk,
    expectedShortfall,
    downsideDeviation,
    maxDrawdown,
    sharpeRatio,
    informationRatio,
    calmarRatio,
    portfolioBeta,
    riskManagementScore,
    recommendation,
    
    // Risk Analysis
    riskAnalysis,
    
    // Stress Testing
    stressTesting,
    
    // Key Metrics
    keyMetrics,
    
    // Monitoring
    monitoring,
    
    // Recommendations
    recommendations
  };
}

function calculatePortfolioVolatility(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 0;
  
  // Calculate weighted average volatility
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const weightedVolatility = holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    return sum + (weight * holding.volatility);
  }, 0);
  
  // Add correlation adjustment
  const correlationAdjustment = calculateCorrelationAdjustment(holdings);
  
  return Math.sqrt(weightedVolatility * weightedVolatility * correlationAdjustment);
}

function calculateCorrelationAdjustment(holdings: any[]): number {
  if (holdings.length <= 1) return 1;
  
  // Simplified correlation adjustment
  const avgCorrelation = holdings.reduce((sum, holding) => sum + holding.correlation, 0) / holdings.length;
  return 1 + (avgCorrelation * (holdings.length - 1)) / holdings.length;
}

function calculateValueAtRisk(inputs: RiskManagementCalculatorInputs, portfolioVolatility: number): number {
  const { varConfidenceLevel, varTimeHorizon } = inputs.riskMetrics.valueAtRisk;
  const totalValue = inputs.portfolioInfo.basicInfo.totalValue;
  
  // Parametric VaR calculation
  const zScore = getZScore(varConfidenceLevel);
  const timeAdjustment = Math.sqrt(varTimeHorizon / 252); // Assuming 252 trading days
  
  return totalValue * portfolioVolatility * zScore * timeAdjustment;
}

function getZScore(confidenceLevel: number): number {
  const zScores: Record<number, number> = {
    0.90: 1.282,
    0.95: 1.645,
    0.99: 2.326,
    0.995: 2.576
  };
  return zScores[confidenceLevel] || 1.645;
}

function calculateExpectedShortfall(inputs: RiskManagementCalculatorInputs, valueAtRisk: number): number {
  // Expected Shortfall (Conditional VaR) is typically 1.25-1.5x VaR
  const esMultiplier = 1.4;
  return valueAtRisk * esMultiplier;
}

function calculateDownsideDeviation(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 0;
  
  // Calculate weighted average downside deviation
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const riskFreeRate = 0.03; // Assuming 3% risk-free rate
  
  return holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    const downsideReturn = Math.min(0, holding.expectedReturn - riskFreeRate);
    return sum + (weight * Math.abs(downsideReturn));
  }, 0);
}

function calculateMaxDrawdown(inputs: RiskManagementCalculatorInputs): number {
  // Simplified max drawdown calculation based on volatility
  const portfolioVolatility = calculatePortfolioVolatility(inputs);
  return portfolioVolatility * 2.5; // Rough estimate
}

function calculateSharpeRatio(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 0;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const portfolioReturn = holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    return sum + (weight * holding.expectedReturn);
  }, 0);
  
  const portfolioVolatility = calculatePortfolioVolatility(inputs);
  const riskFreeRate = 0.03;
  
  return portfolioVolatility > 0 ? (portfolioReturn - riskFreeRate) / portfolioVolatility : 0;
}

function calculateInformationRatio(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 0;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const portfolioReturn = holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    return sum + (weight * holding.expectedReturn);
  }, 0);
  
  const benchmarkReturn = 0.08; // Assuming 8% benchmark return
  const trackingError = 0.05; // Assuming 5% tracking error
  
  return trackingError > 0 ? (portfolioReturn - benchmarkReturn) / trackingError : 0;
}

function calculateCalmarRatio(inputs: RiskManagementCalculatorInputs, maxDrawdown: number): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0 || maxDrawdown === 0) return 0;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const portfolioReturn = holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    return sum + (weight * holding.expectedReturn);
  }, 0);
  
  return portfolioReturn / maxDrawdown;
}

function calculatePortfolioBeta(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 1;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  
  return holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    return sum + (weight * holding.beta);
  }, 0);
}

function calculateCorrelationMetrics(inputs: RiskManagementCalculatorInputs): any {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return { averageCorrelation: 0, correlationMatrix: [] };
  
  const correlations = holdings.map(holding => holding.correlation);
  const averageCorrelation = correlations.reduce((sum, corr) => sum + corr, 0) / correlations.length;
  
  return {
    averageCorrelation,
    correlationMatrix: generateCorrelationMatrix(holdings)
  };
}

function generateCorrelationMatrix(holdings: any[]): number[][] {
  const matrix: number[][] = [];
  
  for (let i = 0; i < holdings.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < holdings.length; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = (holdings[i].correlation + holdings[j].correlation) / 2;
      }
    }
  }
  
  return matrix;
}

function calculateRiskManagementScore(inputs: RiskManagementCalculatorInputs, metrics: any): number {
  let score = 0;
  let maxScore = 0;
  
  // Volatility score (lower is better)
  const volatilityScore = Math.max(0, 1 - metrics.portfolioVolatility);
  score += volatilityScore * 20;
  maxScore += 20;
  
  // Sharpe ratio score (higher is better)
  const sharpeScore = Math.min(1, Math.max(0, metrics.sharpeRatio / 2));
  score += sharpeScore * 20;
  maxScore += 20;
  
  // VaR score (lower is better relative to portfolio value)
  const portfolioValue = inputs.portfolioInfo.basicInfo.totalValue;
  const varRatio = portfolioValue > 0 ? metrics.valueAtRisk / portfolioValue : 0;
  const varScore = Math.max(0, 1 - varRatio);
  score += varScore * 20;
  maxScore += 20;
  
  // Drawdown score (lower is better)
  const drawdownScore = Math.max(0, 1 - metrics.maxDrawdown);
  score += drawdownScore * 20;
  maxScore += 20;
  
  // Diversification score
  const diversificationScore = calculateDiversificationScore(inputs);
  score += diversificationScore * 20;
  maxScore += 20;
  
  return maxScore > 0 ? score / maxScore : 0;
}

function calculateDiversificationScore(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length <= 1) return 0;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const weights = holdings.map(holding => holding.marketValue / totalValue);
  
  // Calculate Herfindahl-Hirschman Index (HHI)
  const hhi = weights.reduce((sum, weight) => sum + weight * weight, 0);
  
  // Convert to diversification score (lower HHI = higher diversification)
  return Math.max(0, 1 - hhi);
}

function generateRiskRecommendations(inputs: RiskManagementCalculatorInputs, metrics: any): any[] {
  const recommendations: any[] = [];
  
  // Volatility recommendations
  if (metrics.portfolioVolatility > 0.25) {
    recommendations.push({
      category: 'Volatility Management',
      recommendation: 'Consider reducing portfolio volatility through diversification or defensive positioning',
      expectedImprovement: 0.05,
      priority: 'high'
    });
  }
  
  // VaR recommendations
  const portfolioValue = inputs.portfolioInfo.basicInfo.totalValue;
  const varRatio = portfolioValue > 0 ? metrics.valueAtRisk / portfolioValue : 0;
  if (varRatio > 0.15) {
    recommendations.push({
      category: 'Risk Reduction',
      recommendation: 'High Value at Risk detected. Consider hedging strategies or position sizing',
      expectedImprovement: 0.08,
      priority: 'high'
    });
  }
  
  // Sharpe ratio recommendations
  if (metrics.sharpeRatio < 0.5) {
    recommendations.push({
      category: 'Return Optimization',
      recommendation: 'Low risk-adjusted returns. Review asset allocation and investment strategy',
      expectedImprovement: 0.10,
      priority: 'medium'
    });
  }
  
  // Diversification recommendations
  const diversificationScore = calculateDiversificationScore(inputs);
  if (diversificationScore < 0.6) {
    recommendations.push({
      category: 'Diversification',
      recommendation: 'Portfolio appears concentrated. Consider adding uncorrelated assets',
      expectedImprovement: 0.07,
      priority: 'medium'
    });
  }
  
  return recommendations;
}

function calculateKeyMetrics(inputs: RiskManagementCalculatorInputs, metrics: any): any {
  return {
    totalRisk: metrics.portfolioVolatility,
    systematicRisk: metrics.portfolioBeta * 0.15, // Assuming 15% market volatility
    idiosyncraticRisk: Math.sqrt(Math.max(0, metrics.portfolioVolatility * metrics.portfolioVolatility - (metrics.portfolioBeta * 0.15) * (metrics.portfolioBeta * 0.15))),
    riskContribution: calculateRiskContribution(inputs),
    concentrationRisk: calculateConcentrationRisk(inputs),
    liquidityRisk: calculateLiquidityRisk(inputs)
  };
}

function calculateRiskContribution(inputs: RiskManagementCalculatorInputs): any[] {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return [];
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  
  return holdings.map(holding => ({
    asset: holding.asset,
    riskContribution: (holding.marketValue / totalValue) * holding.volatility,
    percentage: (holding.marketValue / totalValue) * 100
  }));
}

function calculateConcentrationRisk(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 0;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const weights = holdings.map(holding => holding.marketValue / totalValue);
  
  // Calculate concentration using HHI
  return weights.reduce((sum, weight) => sum + weight * weight, 0);
}

function calculateLiquidityRisk(inputs: RiskManagementCalculatorInputs): number {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return 0;
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  
  // Simplified liquidity risk calculation
  return holdings.reduce((sum, holding) => {
    const weight = holding.marketValue / totalValue;
    const liquidityScore = holding.assetType === 'stock' ? 0.8 : 0.4; // Simplified
    return sum + (weight * (1 - liquidityScore));
  }, 0);
}

function calculateRiskAnalysis(inputs: RiskManagementCalculatorInputs, metrics: any): any {
  return {
    riskDecomposition: {
      marketRisk: metrics.portfolioBeta * 0.15,
      specificRisk: Math.sqrt(Math.max(0, metrics.portfolioVolatility * metrics.portfolioVolatility - (metrics.portfolioBeta * 0.15) * (metrics.portfolioBeta * 0.15))),
      factorRisk: calculateFactorRisk(inputs),
      sectorRisk: calculateSectorRisk(inputs),
      geographicRisk: calculateGeographicRisk(inputs)
    },
    riskBudgeting: calculateRiskBudgeting(inputs, metrics),
    scenarioAnalysis: generateScenarioAnalysis(inputs, metrics)
  };
}

function calculateFactorRisk(inputs: RiskManagementCalculatorInputs): number {
  // Simplified factor risk calculation
  return inputs.riskFactors.factorRisk.sizeRisk + 
         inputs.riskFactors.factorRisk.valueRisk + 
         inputs.riskFactors.factorRisk.momentumRisk;
}

function calculateSectorRisk(inputs: RiskManagementCalculatorInputs): number {
  // Simplified sector risk calculation
  return inputs.riskFactors.sectorRisk.technologyRisk + 
         inputs.riskFactors.sectorRisk.healthcareRisk + 
         inputs.riskFactors.sectorRisk.financialRisk;
}

function calculateGeographicRisk(inputs: RiskManagementCalculatorInputs): number {
  // Simplified geographic risk calculation
  return inputs.riskFactors.geographicRisk.domesticRisk + 
         inputs.riskFactors.geographicRisk.developedMarketRisk + 
         inputs.riskFactors.geographicRisk.emergingMarketRisk;
}

function calculateRiskBudgeting(inputs: RiskManagementCalculatorInputs, metrics: any): any {
  const holdings = inputs.portfolioInfo.portfolioHoldings;
  if (holdings.length === 0) return [];
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  
  return holdings.map(holding => ({
    asset: holding.asset,
    currentRisk: (holding.marketValue / totalValue) * holding.volatility,
    targetRisk: (holding.marketValue / totalValue) * metrics.portfolioVolatility,
    riskBudget: (holding.marketValue / totalValue) * metrics.portfolioVolatility * 0.8 // 80% of portfolio risk
  }));
}

function generateScenarioAnalysis(inputs: RiskManagementCalculatorInputs, metrics: any): any[] {
  return [
    {
      scenario: 'Bull Market',
      probability: 0.25,
      impact: metrics.portfolioBeta * 0.20,
      description: '20% market increase'
    },
    {
      scenario: 'Bear Market',
      probability: 0.25,
      impact: -metrics.portfolioBeta * 0.20,
      description: '20% market decline'
    },
    {
      scenario: 'High Volatility',
      probability: 0.20,
      impact: -metrics.portfolioVolatility * 0.15,
      description: 'Increased market volatility'
    },
    {
      scenario: 'Interest Rate Shock',
      probability: 0.15,
      impact: -0.05,
      description: 'Rising interest rates'
    },
    {
      scenario: 'Normal Market',
      probability: 0.15,
      impact: metrics.portfolioBeta * 0.08,
      description: 'Normal market conditions'
    }
  ];
}

function calculateStressTesting(inputs: RiskManagementCalculatorInputs, metrics: any): any {
  const scenarios = inputs.stressTesting.scenarios;
  const stressResults = scenarios.map(scenario => ({
    name: scenario.name,
    impact: calculateScenarioImpact(scenario, metrics),
    probability: scenario.probability,
    severity: 'high'
  }));
  
  return {
    scenarios: stressResults,
    worstCase: Math.min(...stressResults.map(r => r.impact)),
    bestCase: Math.max(...stressResults.map(r => r.impact)),
    expectedCase: stressResults.reduce((sum, r) => sum + r.impact * r.probability, 0)
  };
}

function calculateScenarioImpact(scenario: any, metrics: any): number {
  const baseImpact = scenario.marketShock * metrics.portfolioBeta;
  const interestImpact = scenario.interestRateShock * 0.5; // Simplified interest rate sensitivity
  const currencyImpact = scenario.currencyShock * 0.3; // Simplified currency sensitivity
  
  return baseImpact + interestImpact + currencyImpact;
}

function calculateMonitoringMetrics(inputs: RiskManagementCalculatorInputs, metrics: any): any {
  return {
    alerts: generateAlerts(inputs, metrics),
    reports: generateReports(inputs, metrics),
    dashboards: generateDashboards(inputs, metrics),
    monitoringScore: calculateMonitoringScore(inputs, metrics)
  };
}

function generateAlerts(inputs: RiskManagementCalculatorInputs, metrics: any): any[] {
  const alerts: any[] = [];
  
  if (metrics.portfolioVolatility > 0.30) {
    alerts.push({
      type: 'warning',
      message: 'High portfolio volatility detected',
      severity: 'medium',
      timestamp: new Date().toISOString()
    });
  }
  
  if (metrics.valueAtRisk > inputs.portfolioInfo.basicInfo.totalValue * 0.20) {
    alerts.push({
      type: 'critical',
      message: 'VaR exceeds 20% of portfolio value',
      severity: 'high',
      timestamp: new Date().toISOString()
    });
  }
  
  return alerts;
}

function generateReports(inputs: RiskManagementCalculatorInputs, metrics: any): any[] {
  return [
    {
      name: 'Daily Risk Report',
      frequency: 'daily',
      metrics: ['portfolioVolatility', 'valueAtRisk', 'maxDrawdown']
    },
    {
      name: 'Weekly Risk Summary',
      frequency: 'weekly',
      metrics: ['sharpeRatio', 'informationRatio', 'calmarRatio']
    },
    {
      name: 'Monthly Risk Analysis',
      frequency: 'monthly',
      metrics: ['riskAnalysis', 'stressTesting', 'recommendations']
    }
  ];
}

function generateDashboards(inputs: RiskManagementCalculatorInputs, metrics: any): any[] {
  return [
    {
      name: 'Risk Overview',
      widgets: ['portfolioVolatility', 'valueAtRisk', 'sharpeRatio']
    },
    {
      name: 'Risk Decomposition',
      widgets: ['riskAnalysis', 'riskContribution', 'concentrationRisk']
    },
    {
      name: 'Stress Testing',
      widgets: ['stressTesting', 'scenarioAnalysis', 'alerts']
    }
  ];
}

function calculateMonitoringScore(inputs: RiskManagementCalculatorInputs, metrics: any): number {
  let score = 0;
  
  // Alert coverage
  const alerts = generateAlerts(inputs, metrics);
  score += Math.min(1, alerts.length / 5) * 25;
  
  // Report frequency
  score += 25;
  
  // Dashboard coverage
  score += 25;
  
  // Risk management effectiveness
  score += metrics.riskManagementScore * 25;
  
  return score;
}

function determineRecommendation(riskManagementScore: number): 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement' {
  if (riskManagementScore >= 0.8) return 'excellent';
  if (riskManagementScore >= 0.6) return 'good';
  if (riskManagementScore >= 0.4) return 'fair';
  if (riskManagementScore >= 0.2) return 'poor';
  return 'needs_improvement';
}