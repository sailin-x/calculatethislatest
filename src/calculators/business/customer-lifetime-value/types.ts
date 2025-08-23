export interface CustomerLifetimeValueInputs {
  // Basic customer metrics
  averageOrderValue: number;
  purchaseFrequency: number; // purchases per year
  customerLifespan: number; // years
  acquisitionCost: number;
  
  // Revenue and cost metrics
  grossMargin: number; // percentage
  retentionRate: number; // percentage
  churnRate: number; // percentage
  discountRate: number; // percentage for NPV calculations
  
  // Advanced metrics
  referralValue?: number;
  crossSellValue?: number;
  upSellValue?: number;
  supportCost?: number;
  marketingCost?: number;
  
  // Cohort analysis
  cohortData?: {
    month: number;
    customers: number;
    revenue: number;
    churnRate: number;
  }[];
  
  // Customer segments
  customerSegments?: {
    segment: string;
    percentage: number;
    averageOrderValue: number;
    purchaseFrequency: number;
    lifespan: number;
    retentionRate: number;
  }[];
  
  // Seasonality and trends
  seasonalityFactor?: number;
  growthRate?: number; // annual growth rate
  inflationRate?: number;
  
  // Business context
  industry?: 'ecommerce' | 'saas' | 'subscription' | 'retail' | 'b2b' | 'marketplace' | 'other';
  businessModel?: 'subscription' | 'transactional' | 'hybrid' | 'marketplace' | 'franchise';
  customerType?: 'b2c' | 'b2b' | 'enterprise' | 'sme' | 'startup';
  
  // Time horizon
  analysisPeriod?: number; // years
  projectionMonths?: number;
  
  // Risk factors
  marketRisk?: number; // percentage
  competitiveRisk?: number; // percentage
  economicRisk?: number; // percentage
}

export interface CustomerLifetimeValueResults {
  // Basic CLV calculations
  basicCLV: number;
  discountedCLV: number;
  adjustedCLV: number;
  
  // Revenue metrics
  totalRevenue: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  
  // Customer metrics
  customerValue: number;
  customerEquity: number;
  customerROI: number;
  
  // Advanced metrics
  referralCLV: number;
  crossSellCLV: number;
  upSellCLV: number;
  totalCLV: number;
  
  // Cohort analysis
  cohortAnalysis: {
    month: number;
    activeCustomers: number;
    revenue: number;
    cumulativeRevenue: number;
    churnRate: number;
    retentionRate: number;
    clv: number;
  }[];
  
  // Segment analysis
  segmentAnalysis: {
    segment: string;
    clv: number;
    percentage: number;
    revenue: number;
    customers: number;
    roi: number;
  }[];
  
  // Financial metrics
  paybackPeriod: number;
  breakEvenPoint: number;
  customerEquityRatio: number;
  
  // Risk analysis
  riskAdjustedCLV: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  riskFactors: {
    factor: string;
    impact: number;
    probability: number;
    riskScore: number;
  }[];
  
  // Projections
  projections: {
    month: number;
    customers: number;
    revenue: number;
    clv: number;
    cumulativeValue: number;
  }[];
  
  // Benchmarking
  industryBenchmarks: {
    metric: string;
    yourValue: number;
    industryAverage: number;
    percentile: number;
    performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  }[];
  
  // Optimization insights
  optimizationOpportunities: {
    area: string;
    currentValue: number;
    potentialValue: number;
    improvement: number;
    priority: 'high' | 'medium' | 'low';
    recommendations: string[];
  }[];
  
  // Business impact
  businessImpact: {
    metric: string;
    currentValue: number;
    projectedValue: number;
    impact: number;
    timeframe: string;
  }[];
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
  }[];
  
  // Risk assessment
  riskAssessment: {
    riskLevel: 'low' | 'medium' | 'high';
    riskFactors: string[];
    mitigationStrategies: string[];
    monitoringMetrics: string[];
  };
  
  // Market analysis
  marketAnalysis: {
    marketSize: number;
    marketShare: number;
    growthPotential: number;
    competitivePosition: string;
    marketOpportunities: string[];
  };
  
  // Strategy insights
  strategyInsights: {
    customerAcquisition: {
      optimalCAC: number;
      channelEffectiveness: string[];
      targetingRecommendations: string[];
    };
    customerRetention: {
      retentionStrategies: string[];
      churnPrevention: string[];
      loyaltyPrograms: string[];
    };
    customerExpansion: {
      upSellOpportunities: string[];
      crossSellStrategies: string[];
      referralPrograms: string[];
    };
  };
  
  // Performance metrics
  performanceMetrics: {
    ltvCacRatio: number;
    customerEquityGrowth: number;
    revenuePerCustomer: number;
    profitPerCustomer: number;
    customerSatisfactionScore?: number;
    netPromoterScore?: number;
  };
}
