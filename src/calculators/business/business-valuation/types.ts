export interface BusinessValuationInputs {
  // Financial metrics
  annualRevenue: number;
  annualProfit: number;
  ebitda: number; // Earnings Before Interest, Taxes, Depreciation, and Amortization
  netIncome: number;
  freeCashFlow: number;
  
  // Balance sheet metrics
  totalAssets: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  workingCapital: number;
  bookValue: number;
  
  // Growth metrics
  revenueGrowthRate: number; // percentage
  profitGrowthRate: number; // percentage
  historicalGrowthRate: number; // percentage
  projectedGrowthRate: number; // percentage
  
  // Market metrics
  marketCap?: number;
  sharePrice?: number;
  numberOfShares?: number;
  priceToEarningsRatio?: number;
  priceToBookRatio?: number;
  enterpriseValue?: number;
  
  // Industry and market data
  industry: 'technology' | 'healthcare' | 'finance' | 'retail' | 'manufacturing' | 'services' | 'real-estate' | 'energy' | 'other';
  businessStage: 'startup' | 'growth' | 'mature' | 'scale' | 'decline';
  businessModel: 'b2b' | 'b2c' | 'marketplace' | 'subscription' | 'transactional' | 'franchise' | 'saas';
  marketSize: number; // total addressable market
  marketShare: number; // percentage
  
  // Risk factors
  riskLevel: 'low' | 'medium' | 'high';
  marketConditions: 'recession' | 'stable' | 'growth' | 'boom';
  competitivePressure: number; // 1-10
  regulatoryRisk: number; // 1-10
  technologyRisk: number; // 1-10
  
  // Valuation multiples
  revenueMultiple: number;
  ebitdaMultiple: number;
  earningsMultiple: number;
  bookValueMultiple: number;
  cashFlowMultiple: number;
  
  // Discount rates
  discountRate: number; // percentage
  costOfCapital: number; // percentage
  riskFreeRate: number; // percentage
  marketRiskPremium: number; // percentage
  beta: number; // for CAPM
  
  // Qualitative factors
  strategicValue: number; // 1-10
  marketPositioning: number; // 1-10
  competitiveAdvantage: number; // 1-10
  managementQuality: number; // 1-10
  brandValue: number; // 1-10
  intellectualProperty: number; // 1-10
  
  // Customer metrics
  customerBase: number;
  customerLifetimeValue: number;
  customerAcquisitionCost: number;
  churnRate: number; // percentage
  retentionRate: number; // percentage
  
  // Operational metrics
  employeeCount: number;
  revenuePerEmployee: number;
  profitMargin: number; // percentage
  operatingMargin: number; // percentage
  returnOnEquity: number; // percentage
  returnOnAssets: number; // percentage
  
  // Geographic and market factors
  geographicDiversification: number; // 1-10
  marketDiversification: number; // 1-10
  seasonalityFactor: number; // 1-10
  economicSensitivity: number; // 1-10
  
  // Future projections
  projectionPeriod: number; // years
  projectedRevenue: number[];
  projectedProfit: number[];
  projectedCashFlow: number[];
  
  // Comparable companies
  comparableCompanies?: {
    name: string;
    revenue: number;
    ebitda: number;
    marketCap: number;
    revenueMultiple: number;
    ebitdaMultiple: number;
  }[];
  
  // Transaction data
  recentTransactions?: {
    company: string;
    transactionValue: number;
    revenue: number;
    ebitda: number;
    multiple: number;
    date: string;
  }[];
  
  // Analysis parameters
  valuationMethod: 'dcf' | 'comparable' | 'asset-based' | 'multiple' | 'hybrid';
  terminalGrowthRate: number; // percentage
  exitMultiple: number;
  controlPremium: number; // percentage
  illiquidityDiscount: number; // percentage
}

export interface BusinessValuationResults {
  // Valuation results
  enterpriseValue: number;
  equityValue: number;
  perShareValue: number;
  totalValue: number;
  
  // Method-specific valuations
  dcfValuation: number;
  comparableValuation: number;
  assetBasedValuation: number;
  multipleValuation: number;
  
  // Valuation ranges
  valuationRange: {
    low: number;
    high: number;
    mid: number;
    confidence: number;
  };
  
  // Financial ratios
  financialRatios: {
    priceToEarnings: number;
    priceToBook: number;
    priceToSales: number;
    evToEbitda: number;
    returnOnEquity: number;
    returnOnAssets: number;
    debtToEquity: number;
    currentRatio: number;
  };
  
  // Comparable analysis
  comparableAnalysis: {
    company: string;
    revenue: number;
    ebitda: number;
    marketCap: number;
    revenueMultiple: number;
    ebitdaMultiple: number;
    impliedValue: number;
  }[];
  
  // DCF analysis
  dcfAnalysis: {
    year: number;
    projectedRevenue: number;
    projectedEbitda: number;
    projectedCashFlow: number;
    discountedCashFlow: number;
    cumulativeValue: number;
  }[];
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    scenario: string;
    discountRate: number;
    growthRate: number;
    terminalValue: number;
    enterpriseValue: number;
    equityValue: number;
  }[];
  
  // Risk assessment
  riskAssessment: {
    riskLevel: 'low' | 'medium' | 'high';
    riskFactors: string[];
    riskScore: number;
    riskAdjustments: {
      factor: string;
      adjustment: number;
      impact: string;
    }[];
  };
  
  // Industry benchmarking
  industryBenchmarks: {
    metric: string;
    yourValue: number;
    industryAverage: number;
    percentile: number;
    performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  }[];
  
  // Value drivers
  valueDrivers: {
    driver: string;
    currentValue: number;
    potentialValue: number;
    impact: number;
    priority: 'high' | 'medium' | 'low';
  }[];
  
  // Strategic analysis
  strategicAnalysis: {
    strategicValue: number;
    marketPositioning: number;
    competitiveAdvantage: number;
    managementQuality: number;
    brandValue: number;
    intellectualProperty: number;
    overallScore: number;
  };
  
  // Market analysis
  marketAnalysis: {
    marketSize: number;
    marketShare: number;
    growthPotential: number;
    competitivePosition: string;
    marketOpportunities: string[];
    marketThreats: string[];
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    area: string;
    currentValue: number;
    potentialValue: number;
    improvement: number;
    recommendations: string[];
  }[];
  
  // Transaction analysis
  transactionAnalysis: {
    comparableTransactions: {
      company: string;
      transactionValue: number;
      multiple: number;
      impliedValue: number;
      relevance: 'high' | 'medium' | 'low';
    }[];
    averageMultiple: number;
    medianMultiple: number;
    impliedValuation: number;
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementationTime: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
  }[];
}
