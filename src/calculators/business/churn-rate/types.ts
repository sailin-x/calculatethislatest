export interface ChurnRateInputs {
  // Basic churn metrics
  totalCustomersStart: number;
  totalCustomersEnd: number;
  churnedCustomers: number;
  newCustomers: number;
  
  // Time period
  timePeriod: 'day' | 'week' | 'month' | 'quarter' | 'year';
  periodLength: number; // number of periods
  
  // Customer segments
  customerSegments?: {
    segment: string;
    customersStart: number;
    customersEnd: number;
    churnedCustomers: number;
    newCustomers: number;
    segmentValue: number;
  }[];
  
  // Revenue churn
  monthlyRecurringRevenueStart: number;
  monthlyRecurringRevenueEnd: number;
  churnedRevenue: number;
  expansionRevenue: number;
  contractionRevenue: number;
  
  // Cohort analysis
  cohortData?: {
    cohort: string;
    startDate: string;
    initialCustomers: number;
    churnedCustomers: number;
    retainedCustomers: number;
    churnRate: number;
  }[];
  
  // Business context
  industry?: 'ecommerce' | 'saas' | 'subscription' | 'retail' | 'b2b' | 'marketplace' | 'other';
  businessModel?: 'subscription' | 'transactional' | 'hybrid' | 'marketplace' | 'franchise';
  customerType?: 'b2c' | 'b2b' | 'enterprise' | 'sme' | 'startup';
  businessStage?: 'startup' | 'growth' | 'mature' | 'scale';
  
  // Advanced metrics
  voluntaryChurn: number;
  involuntaryChurn: number;
  reactivationRate: number; // percentage
  winBackRate: number; // percentage
  
  // Customer lifecycle
  averageCustomerLifespan: number; // months
  timeToFirstValue: number; // days
  onboardingDuration: number; // days
  
  // Quality metrics
  customerSatisfactionScore?: number; // 1-10
  netPromoterScore?: number; // -100 to 100
  customerEffortScore?: number; // 1-7
  
  // Usage metrics
  activeUsers: number;
  totalUsers: number;
  usageFrequency: number; // times per month
  featureAdoptionRate: number; // percentage
  
  // Support metrics
  supportTickets: number;
  averageResolutionTime: number; // hours
  customerSuccessTouchpoints: number;
  
  // Pricing and billing
  averageRevenuePerUser: number;
  priceIncreaseRate: number; // percentage
  billingIssues: number;
  paymentFailures: number;
  
  // Product metrics
  productUpdates: number;
  featureReleases: number;
  bugReports: number;
  downtimeHours: number;
  
  // Market factors
  competitivePressure: number; // 1-10
  marketConditions: 'recession' | 'stable' | 'growth' | 'boom';
  seasonalityFactor: number;
  
  // Retention strategies
  retentionSpend: number;
  loyaltyPrograms: boolean;
  customerSuccessProgram: boolean;
  proactiveSupport: boolean;
  
  // Analysis parameters
  analysisPeriod: number; // months
  predictionHorizon: number; // months
  confidenceLevel: number; // percentage
}

export interface ChurnRateResults {
  // Basic churn calculations
  customerChurnRate: number;
  revenueChurnRate: number;
  netRevenueRetention: number;
  grossRevenueRetention: number;
  
  // Segment analysis
  segmentChurnRates: {
    segment: string;
    churnRate: number;
    revenueChurnRate: number;
    customers: number;
    segmentValue: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  // Cohort analysis
  cohortAnalysis: {
    cohort: string;
    startDate: string;
    initialCustomers: number;
    churnedCustomers: number;
    retainedCustomers: number;
    churnRate: number;
    retentionRate: number;
    lifetimeValue: number;
  }[];
  
  // Churn types analysis
  churnTypes: {
    type: string;
    customers: number;
    percentage: number;
    revenue: number;
    reasons: string[];
  }[];
  
  // Predictive analytics
  churnPrediction: {
    riskScore: number;
    probability: number;
    factors: string[];
    recommendations: string[];
  }[];
  
  // Benchmarking
  industryBenchmarks: {
    metric: string;
    yourValue: number;
    industryAverage: number;
    percentile: number;
    performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  }[];
  
  // Risk assessment
  riskAssessment: {
    riskLevel: 'low' | 'medium' | 'high';
    riskFactors: string[];
    highRiskSegments: string[];
    mitigationStrategies: string[];
  };
  
  // Retention analysis
  retentionAnalysis: {
    retentionRate: number;
    averageLifespan: number;
    lifetimeValue: number;
    retentionCost: number;
    retentionROI: number;
  };
  
  // Revenue impact
  revenueImpact: {
    lostRevenue: number;
    potentialRevenue: number;
    recoveryRevenue: number;
    netImpact: number;
  };
  
  // Customer health scoring
  customerHealthScores: {
    segment: string;
    healthScore: number;
    riskFactors: string[];
    engagementLevel: 'high' | 'medium' | 'low';
    recommendations: string[];
  }[];
  
  // Optimization opportunities
  optimizationOpportunities: {
    area: string;
    currentValue: number;
    potentialValue: number;
    improvement: number;
    priority: 'high' | 'medium' | 'low';
    recommendations: string[];
  }[];
  
  // Trend analysis
  trendAnalysis: {
    period: string;
    churnRate: number;
    trend: 'improving' | 'stable' | 'declining';
    factors: string[];
  }[];
  
  // Forecasting
  forecasting: {
    projectedChurn: {
      month: number;
      churnRate: number;
      customers: number;
      revenue: number;
    }[];
    scenarios: {
      scenario: string;
      churnRate: number;
      probability: number;
      impact: number;
    }[];
  };
  
  // Strategy recommendations
  strategyRecommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementationTime: string;
  }[];
  
  // Performance metrics
  performanceMetrics: {
    customerLifetimeValue: number;
    customerAcquisitionCost: number;
    ltvCacRatio: number;
    paybackPeriod: number;
    retentionROI: number;
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
