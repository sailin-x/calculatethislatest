export interface CustomerAcquisitionCostInputs {
  // Marketing spend
  totalMarketingSpend: number;
  advertisingSpend: number;
  contentMarketingSpend: number;
  socialMediaSpend: number;
  emailMarketingSpend: number;
  seoSemSpend: number;
  influencerSpend: number;
  affiliateSpend: number;
  eventSpend: number;
  prSpend: number;
  
  // Sales costs
  salesTeamCosts: number;
  salesCommission: number;
  salesToolsCosts: number;
  leadGenerationCosts: number;
  
  // Operational costs
  marketingTeamCosts: number;
  marketingToolsCosts: number;
  creativeAgencyCosts: number;
  analyticsToolsCosts: number;
  
  // Customer acquisition metrics
  newCustomersAcquired: number;
  qualifiedLeads: number;
  conversionRate: number; // percentage
  leadToCustomerRate: number; // percentage
  
  // Channel breakdown
  channelBreakdown?: {
    channel: string;
    spend: number;
    customers: number;
    conversionRate: number;
  }[];
  
  // Time period
  timePeriod: 'month' | 'quarter' | 'year';
  periodLength: number; // number of periods
  
  // Business context
  industry?: 'ecommerce' | 'saas' | 'subscription' | 'retail' | 'b2b' | 'marketplace' | 'other';
  businessModel?: 'subscription' | 'transactional' | 'hybrid' | 'marketplace' | 'franchise';
  customerType?: 'b2c' | 'b2b' | 'enterprise' | 'sme' | 'startup';
  businessStage?: 'startup' | 'growth' | 'mature' | 'scale';
  
  // Advanced metrics
  customerLifetimeValue?: number;
  paybackPeriod?: number;
  targetCAC?: number;
  
  // Seasonality and trends
  seasonalityFactor?: number;
  growthRate?: number; // percentage
  marketConditions?: 'recession' | 'stable' | 'growth' | 'boom';
  
  // Quality metrics
  customerQualityScore?: number; // 1-10
  churnRate?: number; // percentage
  retentionRate?: number; // percentage
  
  // Attribution
  attributionModel?: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based';
  multiTouchAttribution?: boolean;
  
  // Optimization parameters
  targetConversionRate?: number;
  targetLeadQuality?: number;
  optimizationBudget?: number;
}

export interface CustomerAcquisitionCostResults {
  // Basic CAC calculations
  totalCAC: number;
  averageCAC: number;
  marginalCAC: number;
  
  // Channel-specific CAC
  channelCAC: {
    channel: string;
    cac: number;
    spend: number;
    customers: number;
    conversionRate: number;
    efficiency: 'excellent' | 'good' | 'average' | 'poor' | 'inefficient';
  }[];
  
  // Cost breakdown
  costBreakdown: {
    category: string;
    amount: number;
    percentage: number;
    efficiency: number;
  }[];
  
  // Efficiency metrics
  marketingEfficiency: number;
  salesEfficiency: number;
  overallEfficiency: number;
  
  // ROI and profitability
  cacROI: number;
  paybackPeriod: number;
  profitabilityScore: number;
  
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
  
  // Channel analysis
  channelAnalysis: {
    bestPerforming: string[];
    worstPerforming: string[];
    scalingOpportunities: string[];
    channelsToOptimize: string[];
  };
  
  // Trend analysis
  trendAnalysis: {
    period: string;
    cac: number;
    trend: 'improving' | 'stable' | 'declining';
    factors: string[];
  }[];
  
  // Risk assessment
  riskAssessment: {
    riskLevel: 'low' | 'medium' | 'high';
    riskFactors: string[];
    mitigationStrategies: string[];
    monitoringMetrics: string[];
  };
  
  // Budget optimization
  budgetOptimization: {
    recommendedAllocation: {
      channel: string;
      currentSpend: number;
      recommendedSpend: number;
      expectedImprovement: number;
    }[];
    totalBudget: number;
    expectedCACReduction: number;
  };
  
  // Performance metrics
  performanceMetrics: {
    ltvCacRatio: number;
    customerEquity: number;
    acquisitionEfficiency: number;
    conversionEfficiency: number;
    costPerLead: number;
    leadQualityScore: number;
  };
  
  // Attribution insights
  attributionInsights: {
    model: string;
    channelContribution: {
      channel: string;
      contribution: number;
      touchpoints: number;
      influence: number;
    }[];
    conversionPath: {
      path: string;
      frequency: number;
      conversionRate: number;
      cac: number;
    }[];
  };
  
  // Competitive analysis
  competitiveAnalysis: {
    marketPosition: string;
    competitiveAdvantage: string[];
    competitiveDisadvantages: string[];
    marketOpportunities: string[];
  };
  
  // Strategy recommendations
  strategyRecommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementationTime: string;
  }[];
  
  // Forecasting
  forecasting: {
    projectedCAC: {
      month: number;
      cac: number;
      confidence: number;
    }[];
    scenarios: {
      scenario: string;
      cac: number;
      probability: number;
      factors: string[];
    }[];
  };
  
  // Comprehensive report
  report: string;
  
  // Business impact
  businessImpact: {
    metric: string;
    currentValue: number;
    projectedValue: number;
    impact: number;
    timeframe: string;
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
