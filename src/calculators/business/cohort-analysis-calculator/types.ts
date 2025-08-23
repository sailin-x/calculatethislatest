export interface CohortAnalysisInputs {
  // Cohort information
  cohortInfo: {
    cohortName: string; // Cohort name
    cohortType: 'acquisition' | 'behavioral' | 'temporal' | 'custom';
    cohortDefinition: string; // Cohort definition
    cohortSize: number; // Initial cohort size
    cohortDate: Date; // Cohort start date
    cohortPeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    analysisPeriod: number; // Analysis period in periods
  };
  
  // Customer data
  customers: {
    customerId: string; // Unique customer identifier
    cohortDate: Date; // Date customer joined cohort
    acquisitionChannel: string; // Acquisition channel
    acquisitionCost: number; // Customer acquisition cost
    firstPurchaseDate: Date; // First purchase date
    firstPurchaseValue: number; // First purchase value
    customerSegment: string; // Customer segment
    demographics: {
      age: number; // Customer age
      gender: string; // Customer gender
      location: string; // Customer location
      income: number; // Customer income
    };
  }[];
  
  // Transaction data
  transactions: {
    customerId: string; // Customer identifier
    transactionDate: Date; // Transaction date
    transactionValue: number; // Transaction value
    transactionType: 'purchase' | 'subscription' | 'renewal' | 'upgrade' | 'downgrade' | 'cancellation';
    productCategory: string; // Product category
    paymentMethod: string; // Payment method
    discountApplied: number; // Discount applied
    taxAmount: number; // Tax amount
  }[];
  
  // Behavioral data
  behaviorData: {
    customerId: string; // Customer identifier
    date: Date; // Behavior date
    behaviorType: 'login' | 'purchase' | 'view' | 'click' | 'download' | 'share' | 'review' | 'support';
    behaviorValue: number; // Behavior value/score
    sessionDuration: number; // Session duration in minutes
    pageViews: number; // Number of page views
    bounceRate: number; // Bounce rate
    conversionRate: number; // Conversion rate
  }[];
  
  // Cohort analysis parameters
  analysisParameters: {
    retentionMetric: 'users' | 'revenue' | 'transactions' | 'engagement' | 'custom';
    churnDefinition: 'no-activity' | 'no-purchase' | 'cancellation' | 'unsubscribe' | 'custom';
    churnThreshold: number; // Days/periods without activity
    minimumCohortSize: number; // Minimum cohort size for analysis
    confidenceLevel: number; // Confidence level for statistical analysis
    significanceLevel: number; // Significance level for testing
  };
  
  // Cohort segmentation
  cohortSegmentation: {
    segments: {
      segmentName: string; // Segment name
      segmentCriteria: string; // Segment criteria
      segmentSize: number; // Segment size
      segmentValue: number; // Segment value
    }[];
    segmentationType: 'demographic' | 'behavioral' | 'acquisition' | 'value' | 'custom';
    enableSegmentation: boolean; // Enable cohort segmentation
  };
  
  // Time-based analysis
  timeAnalysis: {
    timeGranularity: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    seasonality: {
      hasSeasonality: boolean; // Whether data has seasonality
      seasonalPattern: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
      seasonalStrength: number; // Strength of seasonality (0-1)
    };
    trends: {
      hasTrend: boolean; // Whether data has trend
      trendDirection: 'increasing' | 'decreasing' | 'stable';
      trendStrength: number; // Strength of trend (0-1)
    };
  };
  
  // Comparative analysis
  comparativeAnalysis: {
    enableComparison: boolean; // Enable comparative analysis
    comparisonCohorts: {
      cohortName: string; // Comparison cohort name
      cohortDate: Date; // Comparison cohort date
      cohortSize: number; // Comparison cohort size
    }[];
    benchmarkData: {
      industry: string; // Industry benchmark
      averageRetention: number; // Industry average retention
      averageLTV: number; // Industry average LTV
      averageChurn: number; // Industry average churn
    };
  };
  
  // Predictive analytics
  predictiveAnalytics: {
    enablePredictive: boolean; // Enable predictive analytics
    predictionHorizon: number; // Prediction horizon in periods
    predictionMetrics: ('retention' | 'churn' | 'ltv' | 'revenue')[];
    modelType: 'regression' | 'classification' | 'time-series' | 'survival';
    confidenceInterval: number; // Confidence interval
  };
  
  // Advanced analytics
  advancedAnalytics: {
    enableSurvivalAnalysis: boolean; // Enable survival analysis
    enableLTVPrediction: boolean; // Enable LTV prediction
    enableChurnPrediction: boolean; // Enable churn prediction
    enableCohortClustering: boolean; // Enable cohort clustering
    machineLearning: {
      algorithm: 'random-forest' | 'gradient-boosting' | 'neural-network' | 'support-vector-machine';
      features: string[]; // Features used in model
      hyperparameters: Record<string, any>; // Model hyperparameters
    };
  };
  
  // Reporting preferences
  reporting: {
    includeRetentionAnalysis: boolean; // Include retention analysis
    includeChurnAnalysis: boolean; // Include churn analysis
    includeLTVAnalysis: boolean; // Include LTV analysis
    includeSegmentationAnalysis: boolean; // Include segmentation analysis
    includeComparativeAnalysis: boolean; // Include comparative analysis
    includePredictiveAnalytics: boolean; // Include predictive analytics
    includeRecommendations: boolean; // Include recommendations
    includeActionItems: boolean; // Include action items
  };
  
  // Business context
  businessContext: {
    industry: string; // Industry type
    businessModel: 'b2c' | 'b2b' | 'marketplace' | 'subscription' | 'ecommerce' | 'saas';
    averageOrderValue: number; // Average order value
    customerLifespan: number; // Average customer lifespan in months
    acquisitionCost: number; // Average customer acquisition cost
    profitMargin: number; // Average profit margin
  };
}

export interface CohortAnalysisResults {
  // Core cohort metrics
  totalCohorts: number; // Total number of cohorts
  totalCustomers: number; // Total number of customers
  averageCohortSize: number; // Average cohort size
  overallRetentionRate: number; // Overall retention rate
  overallChurnRate: number; // Overall churn rate
  
  // Cohort retention analysis
  cohortRetention: {
    cohortName: string; // Cohort name
    cohortDate: Date; // Cohort date
    initialSize: number; // Initial cohort size
    retentionByPeriod: {
      period: number; // Period number
      retainedCustomers: number; // Retained customers
      retentionRate: number; // Retention rate
      churnRate: number; // Churn rate
      cumulativeRetention: number; // Cumulative retention
    }[];
    averageRetention: number; // Average retention rate
    retentionDecay: number; // Retention decay rate
    halfLife: number; // Cohort half-life in periods
  }[];
  
  // Cohort churn analysis
  cohortChurn: {
    cohortName: string; // Cohort name
    cohortDate: Date; // Cohort date
    churnByPeriod: {
      period: number; // Period number
      churnedCustomers: number; // Churned customers
      churnRate: number; // Churn rate
      churnReason: string; // Primary churn reason
      churnValue: number; // Value of churned customers
    }[];
    averageChurn: number; // Average churn rate
    churnPattern: 'early' | 'gradual' | 'late' | 'sporadic';
    churnPredictors: string[]; // Churn predictors
  }[];
  
  // Customer lifetime value analysis
  cohortLTV: {
    cohortName: string; // Cohort name
    cohortDate: Date; // Cohort date
    ltvByPeriod: {
      period: number; // Period number
      cumulativeRevenue: number; // Cumulative revenue
      averageLTV: number; // Average LTV
      ltvGrowth: number; // LTV growth rate
      revenuePerCustomer: number; // Revenue per customer
    }[];
    totalLTV: number; // Total cohort LTV
    averageLTV: number; // Average customer LTV
    ltvPrediction: number; // Predicted LTV
    paybackPeriod: number; // Payback period in periods
  }[];
  
  // Cohort segmentation analysis
  cohortSegmentation: {
    segmentName: string; // Segment name
    segmentSize: number; // Segment size
    retentionBySegment: {
      period: number; // Period number
      retentionRate: number; // Retention rate
      segmentContribution: number; // Segment contribution
    }[];
    ltvBySegment: {
      period: number; // Period number
      averageLTV: number; // Average LTV
      segmentValue: number; // Segment value
    }[];
    churnBySegment: {
      period: number; // Period number
      churnRate: number; // Churn rate
      churnValue: number; // Churn value
    }[];
    segmentPerformance: 'excellent' | 'good' | 'average' | 'poor' | 'underperforming';
  }[];
  
  // Time-based analysis
  timeAnalysis: {
    timeGranularity: string; // Time granularity
    retentionTrends: {
      period: string; // Time period
      averageRetention: number; // Average retention
      retentionTrend: 'improving' | 'declining' | 'stable';
      trendStrength: number; // Trend strength
    }[];
    seasonality: {
      hasSeasonality: boolean; // Whether seasonality exists
      seasonalPattern: string; // Seasonal pattern
      seasonalStrength: number; // Seasonal strength
      seasonalPeaks: string[]; // Seasonal peaks
      seasonalTroughs: string[]; // Seasonal troughs
    };
    trends: {
      hasTrend: boolean; // Whether trend exists
      trendDirection: string; // Trend direction
      trendStrength: number; // Trend strength
      trendSlope: number; // Trend slope
    };
  };
  
  // Comparative analysis
  comparativeAnalysis: {
    cohortComparison: {
      cohort1: string; // First cohort
      cohort2: string; // Second cohort
      metric: string; // Comparison metric
      difference: number; // Difference between cohorts
      significance: boolean; // Statistical significance
      confidence: number; // Confidence level
    }[];
    benchmarkComparison: {
      metric: string; // Metric name
      cohortValue: number; // Cohort value
      benchmarkValue: number; // Benchmark value
      difference: number; // Difference from benchmark
      percentile: number; // Percentile rank
    }[];
    performanceRanking: {
      cohort: string; // Cohort name
      rank: number; // Performance rank
      score: number; // Performance score
      category: 'top' | 'above-average' | 'average' | 'below-average' | 'bottom';
    }[];
  };
  
  // Predictive analytics
  predictiveAnalytics: {
    retentionPredictions: {
      cohort: string; // Cohort name
      period: number; // Prediction period
      predictedRetention: number; // Predicted retention
      confidence: number; // Prediction confidence
      upperBound: number; // Upper confidence bound
      lowerBound: number; // Lower confidence bound
    }[];
    churnPredictions: {
      cohort: string; // Cohort name
      period: number; // Prediction period
      churnProbability: number; // Churn probability
      riskLevel: 'low' | 'medium' | 'high' | 'critical';
      confidence: number; // Prediction confidence
    }[];
    ltvPredictions: {
      cohort: string; // Cohort name
      period: number; // Prediction period
      predictedLTV: number; // Predicted LTV
      confidence: number; // Prediction confidence
      growthRate: number; // Predicted growth rate
    }[];
    modelPerformance: {
      accuracy: number; // Model accuracy
      precision: number; // Model precision
      recall: number; // Model recall
      f1Score: number; // F1 score
      mape: number; // Mean absolute percentage error
    };
  };
  
  // Survival analysis
  survivalAnalysis: {
    survivalCurves: {
      cohort: string; // Cohort name
      periods: number[]; // Time periods
      survivalRates: number[]; // Survival rates
      hazardRates: number[]; // Hazard rates
      medianSurvival: number; // Median survival time
    }[];
    survivalComparison: {
      cohort1: string; // First cohort
      cohort2: string; // Second cohort
      logRankTest: number; // Log-rank test p-value
      significance: boolean; // Statistical significance
    }[];
    survivalInsights: string[]; // Survival analysis insights
  };
  
  // Cohort clustering
  cohortClustering: {
    clusters: {
      clusterId: number; // Cluster identifier
      clusterName: string; // Cluster name
      clusterSize: number; // Cluster size
      characteristics: string[]; // Cluster characteristics
      retentionPattern: string; // Retention pattern
      ltvPattern: string; // LTV pattern
      churnPattern: string; // Churn pattern
    }[];
    clusterAnalysis: {
      cluster: string; // Cluster name
      averageRetention: number; // Average retention
      averageLTV: number; // Average LTV
      averageChurn: number; // Average churn
      performance: 'excellent' | 'good' | 'average' | 'poor';
    }[];
    clusteringInsights: string[]; // Clustering insights
  };
  
  // Cohort efficiency
  cohortEfficiency: {
    overallEfficiency: number; // Overall cohort efficiency
    efficiencyByCohort: {
      cohort: string; // Cohort name
      efficiency: number; // Cohort efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    optimizationOpportunities: {
      opportunity: string; // Optimization opportunity
      impact: number; // Potential impact
      implementation: string; // Implementation strategy
      priority: 'high' | 'medium' | 'low';
    }[];
  };
  
  // Business impact analysis
  businessImpact: {
    revenueImpact: {
      cohort: string; // Cohort name
      totalRevenue: number; // Total revenue
      revenueGrowth: number; // Revenue growth
      revenuePotential: number; // Revenue potential
      impact: number; // Business impact
    }[];
    customerImpact: {
      cohort: string; // Cohort name
      customerValue: number; // Customer value
      customerLifespan: number; // Customer lifespan
      customerSatisfaction: number; // Customer satisfaction
      impact: number; // Customer impact
    }[];
    operationalImpact: {
      cohort: string; // Cohort name
      acquisitionCost: number; // Acquisition cost
      retentionCost: number; // Retention cost
      operationalEfficiency: number; // Operational efficiency
      impact: number; // Operational impact
    }[];
  };
  
  // Risk analysis
  riskAnalysis: {
    cohortRisks: {
      risk: string; // Risk description
      probability: number; // Risk probability
      impact: number; // Risk impact
      mitigation: string; // Risk mitigation
    }[];
    churnRisks: {
      cohort: string; // Cohort name
      churnRisk: number; // Churn risk score
      riskFactors: string[]; // Risk factors
      mitigation: string; // Mitigation strategy
    }[];
    overallRiskScore: number; // Overall risk score
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string; // Recommendation category
    recommendations: string[]; // Recommendations
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number; // Expected impact
    implementation: string; // Implementation strategy
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string; // Action description
    owner: string; // Action owner
    timeline: string; // Implementation timeline
    expectedOutcome: string; // Expected outcome
    cost: number; // Implementation cost
  }[];
}
