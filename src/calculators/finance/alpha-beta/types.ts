export interface AlphaBetaInputs {
  // Portfolio Data
  portfolioReturns: number[]; // Historical portfolio returns (monthly/quarterly)
  benchmarkReturns: number[]; // Historical benchmark returns (same period)
  riskFreeRate: number; // Risk-free rate (annualized)
  
  // Analysis Parameters
  analysisPeriod: 'monthly' | 'quarterly' | 'yearly';
  confidenceLevel: number; // Confidence level for statistical tests (e.g., 95)
  lookbackPeriod: number; // Number of periods for analysis
  
  // Market Data
  marketReturns: number[]; // Market returns (if different from benchmark)
  marketVolatility: number; // Market volatility (annualized)
  
  // Portfolio Information
  portfolioValue: number; // Current portfolio value
  benchmarkName: string; // Name of benchmark (e.g., 'S&P 500', 'Russell 2000')
  portfolioName: string; // Name of portfolio
  
  // Risk Metrics
  targetVolatility: number; // Target portfolio volatility
  maxDrawdown: number; // Maximum acceptable drawdown
  
  // Performance Attribution
  sectorAllocation: {
    sector: string;
    weight: number;
    return: number;
  }[];
  
  // Factor Analysis
  factorExposures: {
    factor: string;
    exposure: number;
    factorReturn: number;
  }[];
  
  // Transaction Costs
  tradingCosts: number; // Average trading costs as percentage
  managementFees: number; // Annual management fees
  performanceFees: number; // Performance fees (if applicable)
  
  // Rebalancing
  rebalancingFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  rebalancingThreshold: number; // Threshold for rebalancing
  
  // Advanced Parameters
  regressionMethod: 'ols' | 'robust' | 'rolling';
  rollingWindow: number; // Rolling window size for dynamic analysis
  outlierTreatment: 'include' | 'exclude' | 'winsorize';
  
  // Benchmark Customization
  customBenchmark: boolean;
  benchmarkWeights: number[]; // Custom benchmark weights
  benchmarkComponents: string[]; // Custom benchmark components
  
  // Risk Management
  varConfidence: number; // Value at Risk confidence level
  stressTestScenarios: {
    scenario: string;
    marketShock: number;
    correlationShock: number;
  }[];
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
  
  // Data Quality
  dataStartDate: string; // Start date for analysis
  dataEndDate: string; // End date for analysis
  dataFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  missingDataTreatment: 'interpolate' | 'exclude' | 'forward-fill';
}

export interface AlphaBetaMetrics {
  // Basic Metrics
  alpha: number; // Jensen's Alpha (excess return)
  beta: number; // Systematic risk (market sensitivity)
  rSquared: number; // Coefficient of determination
  correlation: number; // Correlation with benchmark
  
  // Risk Metrics
  portfolioVolatility: number; // Portfolio standard deviation
  benchmarkVolatility: number; // Benchmark standard deviation
  trackingError: number; // Active risk
  informationRatio: number; // Risk-adjusted excess return
  
  // Performance Metrics
  totalReturn: number; // Total portfolio return
  excessReturn: number; // Return in excess of benchmark
  sharpeRatio: number; // Risk-adjusted return
  sortinoRatio: number; // Downside risk-adjusted return
  
  // Advanced Metrics
  treynorRatio: number; // Beta-adjusted return
  calmarRatio: number; // Return to maximum drawdown
  omegaRatio: number; // Probability-weighted return ratio
  upCaptureRatio: number; // Upside capture ratio
  downCaptureRatio: number; // Downside capture ratio
  
  // Statistical Metrics
  tStatistic: number; // T-statistic for alpha
  pValue: number; // P-value for alpha significance
  standardError: number; // Standard error of alpha
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  
  // Risk Decomposition
  systematicRisk: number; // Beta-related risk
  idiosyncraticRisk: number; // Alpha-related risk
  totalRisk: number; // Total portfolio risk
  
  // Factor Analysis
  factorContributions: {
    factor: string;
    contribution: number;
    weight: number;
  }[];
  
  // Attribution Analysis
  allocationEffect: number; // Asset allocation contribution
  selectionEffect: number; // Security selection contribution
  interactionEffect: number; // Interaction effect
  
  // Rolling Analysis
  rollingAlpha: number[];
  rollingBeta: number[];
  rollingSharpe: number[];
  
  // Stress Testing
  stressTestResults: {
    scenario: string;
    expectedReturn: number;
    expectedRisk: number;
    expectedAlpha: number;
  }[];
  
  // Benchmark Comparison
  benchmarkComparison: {
    metric: string;
    portfolio: number;
    benchmark: number;
    difference: number;
  }[];
}

export interface AlphaBetaAnalysis {
  // Executive Summary
  performanceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Buy' | 'Hold' | 'Sell' | 'Strong Buy' | 'Strong Sell';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Performance Analysis
  performanceSummary: string;
  riskAnalysis: string;
  attributionAnalysis: string;
  
  // Statistical Significance
  alphaSignificance: 'Highly Significant' | 'Significant' | 'Marginally Significant' | 'Not Significant';
  betaStability: 'Very Stable' | 'Stable' | 'Moderately Stable' | 'Unstable';
  
  // Risk Assessment
  riskProfile: string;
  downsideProtection: string;
  upsidePotential: string;
  
  // Factor Analysis
  factorExposure: string;
  sectorAnalysis: string;
  styleAnalysis: string;
  
  // Benchmark Analysis
  benchmarkFit: string;
  benchmarkComparison: string;
  benchmarkRecommendation: string;
  
  // Portfolio Construction
  optimizationSuggestions: string[];
  rebalancingRecommendations: string[];
  riskManagementSuggestions: string[];
  
  // Market Context
  marketEnvironment: string;
  economicOutlook: string;
  sectorOutlook: string;
  
  // Performance Attribution
  returnAttribution: {
    source: string;
    contribution: number;
    explanation: string;
  }[];
  
  // Risk Attribution
  riskAttribution: {
    source: string;
    contribution: number;
    explanation: string;
  }[];
  
  // Forward-Looking Analysis
  expectedAlpha: number;
  expectedBeta: number;
  expectedReturn: number;
  expectedRisk: number;
  
  // Sensitivity Analysis
  sensitivityFactors: {
    factor: string;
    impact: number;
    direction: 'positive' | 'negative';
  }[];
  
  // Implementation Considerations
  tradingImplications: string[];
  costConsiderations: string[];
  operationalRequirements: string[];
  
  // Regulatory and Compliance
  regulatoryConsiderations: string[];
  complianceRequirements: string[];
  reportingRequirements: string[];
  
  // Monitoring and Review
  monitoringFrequency: string;
  reviewTriggers: string[];
  performanceThresholds: {
    metric: string;
    threshold: number;
    action: string;
  }[];
}

export interface AlphaBetaOutputs extends AlphaBetaMetrics {
  analysis: AlphaBetaAnalysis;
  
  // Additional Output Metrics
  dataQuality: number; // Data quality score (0-100)
  modelAccuracy: number; // Model accuracy score (0-100)
  confidenceLevel: number; // Overall confidence level (0-100)
  
  // Time Series Analysis
  timeSeriesData: {
    date: string;
    portfolioReturn: number;
    benchmarkReturn: number;
    cumulativeAlpha: number;
    cumulativeBeta: number;
  }[];
  
  // Rolling Window Analysis
  rollingMetrics: {
    period: string;
    alpha: number;
    beta: number;
    sharpeRatio: number;
    informationRatio: number;
  }[];
  
  // Factor Decomposition
  factorDecomposition: {
    factor: string;
    exposure: number;
    contribution: number;
    riskContribution: number;
  }[];
  
  // Risk Metrics Over Time
  riskMetrics: {
    period: string;
    volatility: number;
    var: number;
    maxDrawdown: number;
    calmarRatio: number;
  }[];
  
  // Performance Attribution Over Time
  attributionOverTime: {
    period: string;
    allocationEffect: number;
    selectionEffect: number;
    interactionEffect: number;
    totalEffect: number;
  }[];
  
  // Benchmark Comparison Over Time
  benchmarkComparisonOverTime: {
    period: string;
    portfolioReturn: number;
    benchmarkReturn: number;
    excessReturn: number;
    trackingError: number;
  }[];
  
  // Stress Test Results
  stressTestScenarios: {
    scenario: string;
    portfolioReturn: number;
    benchmarkReturn: number;
    alpha: number;
    beta: number;
    sharpeRatio: number;
  }[];
  
  // Optimization Recommendations
  optimizationSuggestions: {
    action: string;
    expectedImpact: number;
    implementation: string;
    risk: string;
  }[];
  
  // Risk Management Recommendations
  riskManagementSuggestions: {
    action: string;
    expectedBenefit: number;
    implementation: string;
    cost: string;
  }[];
}
