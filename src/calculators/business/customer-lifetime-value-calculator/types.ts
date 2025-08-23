export interface CustomerLifetimeValueInputs {
  // Customer information
  customerInfo: {
    customerId: string; // Unique customer identifier
    customerSegment: string; // Customer segment
    acquisitionDate: Date; // Customer acquisition date
    acquisitionChannel: string; // Acquisition channel
    acquisitionCost: number; // Customer acquisition cost
    customerType: 'new' | 'returning' | 'vip' | 'enterprise' | 'subscription' | 'one-time';
    customerStatus: 'active' | 'inactive' | 'churned' | 'suspended' | 'pending';
  };
  
  // Transaction data
  transactions: {
    transactionId: string; // Unique transaction identifier
    transactionDate: Date; // Transaction date
    transactionValue: number; // Transaction value
    transactionType: 'purchase' | 'subscription' | 'renewal' | 'upgrade' | 'downgrade' | 'refund' | 'cancellation';
    productCategory: string; // Product category
    productName: string; // Product name
    quantity: number; // Quantity purchased
    unitPrice: number; // Unit price
    discountAmount: number; // Discount amount
    taxAmount: number; // Tax amount
    shippingCost: number; // Shipping cost
    paymentMethod: string; // Payment method
  }[];
  
  // Subscription data
  subscriptions: {
    subscriptionId: string; // Subscription identifier
    subscriptionType: string; // Subscription type
    startDate: Date; // Subscription start date
    endDate: Date | null; // Subscription end date (null if active)
    billingCycle: 'monthly' | 'quarterly' | 'yearly' | 'custom';
    billingAmount: number; // Billing amount
    status: 'active' | 'cancelled' | 'suspended' | 'expired' | 'pending';
    autoRenew: boolean; // Auto-renewal enabled
    renewalRate: number; // Renewal rate
    upgradeHistory: {
      date: Date; // Upgrade date
      fromPlan: string; // Previous plan
      toPlan: string; // New plan
      priceChange: number; // Price change
    }[];
  }[];
  
  // Customer behavior data
  behaviorData: {
    date: Date; // Behavior date
    behaviorType: 'login' | 'purchase' | 'view' | 'click' | 'download' | 'share' | 'review' | 'support' | 'referral';
    behaviorValue: number; // Behavior value/score
    sessionDuration: number; // Session duration in minutes
    pageViews: number; // Number of page views
    bounceRate: number; // Bounce rate
    conversionRate: number; // Conversion rate
    engagementScore: number; // Engagement score
  }[];
  
  // Customer service data
  customerService: {
    ticketId: string; // Support ticket identifier
    ticketDate: Date; // Ticket creation date
    ticketType: string; // Ticket type
    ticketStatus: 'open' | 'resolved' | 'closed' | 'escalated';
    resolutionTime: number; // Resolution time in hours
    satisfactionScore: number; // Satisfaction score (1-10)
    cost: number; // Support cost
    category: string; // Support category
  }[];
  
  // Referral data
  referrals: {
    referralId: string; // Referral identifier
    referralDate: Date; // Referral date
    referredCustomerId: string; // Referred customer ID
    referralValue: number; // Referral value
    referralStatus: 'pending' | 'converted' | 'failed' | 'expired';
    commission: number; // Referral commission
  }[];
  
  // LTV calculation parameters
  ltvParameters: {
    calculationMethod: 'historical' | 'predictive' | 'hybrid' | 'custom';
    timeHorizon: number; // Time horizon in months
    discountRate: number; // Discount rate for present value
    churnRate: number; // Expected churn rate
    growthRate: number; // Expected growth rate
    inflationRate: number; // Expected inflation rate
    confidenceLevel: number; // Confidence level for predictions
  };
  
  // Revenue analysis
  revenueAnalysis: {
    averageOrderValue: number; // Average order value
    purchaseFrequency: number; // Purchase frequency (per month)
    revenueGrowth: number; // Revenue growth rate
    marginPercentage: number; // Profit margin percentage
    costOfGoodsSold: number; // Cost of goods sold
    operatingExpenses: number; // Operating expenses
    customerServiceCost: number; // Customer service cost per customer
    marketingCost: number; // Marketing cost per customer
  };
  
  // Churn analysis
  churnAnalysis: {
    churnDefinition: 'no-activity' | 'no-purchase' | 'cancellation' | 'unsubscribe' | 'custom';
    churnThreshold: number; // Days/periods without activity
    churnRate: number; // Historical churn rate
    churnPredictors: string[]; // Churn predictors
    retentionRate: number; // Historical retention rate
    averageLifespan: number; // Average customer lifespan in months
  };
  
  // Cohort analysis
  cohortAnalysis: {
    cohortDate: Date; // Cohort date
    cohortSize: number; // Cohort size
    cohortRetention: {
      period: number; // Period number
      retentionRate: number; // Retention rate
      revenuePerCustomer: number; // Revenue per customer
    }[];
    cohortLTV: {
      period: number; // Period number
      cumulativeLTV: number; // Cumulative LTV
      averageLTV: number; // Average LTV
    }[];
  };
  
  // Predictive modeling
  predictiveModeling: {
    enablePredictive: boolean; // Enable predictive modeling
    modelType: 'regression' | 'classification' | 'time-series' | 'survival' | 'machine-learning';
    features: string[]; // Features used in model
    trainingData: {
      startDate: Date; // Training data start date
      endDate: Date; // Training data end date
      sampleSize: number; // Training sample size
    };
    predictionHorizon: number; // Prediction horizon in months
    confidenceInterval: number; // Confidence interval
  };
  
  // Segmentation analysis
  segmentationAnalysis: {
    segments: {
      segmentName: string; // Segment name
      segmentCriteria: string; // Segment criteria
      segmentSize: number; // Segment size
      averageLTV: number; // Average LTV for segment
    }[];
    segmentationType: 'demographic' | 'behavioral' | 'value' | 'acquisition' | 'custom';
    enableSegmentation: boolean; // Enable segmentation analysis
  };
  
  // Competitive analysis
  competitiveAnalysis: {
    enableCompetitive: boolean; // Enable competitive analysis
    industry: string; // Industry type
    averageIndustryLTV: number; // Industry average LTV
    competitorLTV: {
      competitor: string; // Competitor name
      averageLTV: number; // Competitor average LTV
      marketShare: number; // Competitor market share
    }[];
    marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
  };
  
  // Risk analysis
  riskAnalysis: {
    riskFactors: {
      factor: string; // Risk factor
      probability: number; // Risk probability
      impact: number; // Risk impact
      mitigation: string; // Risk mitigation
    }[];
    churnRisk: number; // Churn risk score
    creditRisk: number; // Credit risk score
    marketRisk: number; // Market risk score
    overallRiskScore: number; // Overall risk score
  };
  
  // Business context
  businessContext: {
    businessModel: 'b2c' | 'b2b' | 'marketplace' | 'subscription' | 'ecommerce' | 'saas';
    industry: string; // Industry type
    marketSize: number; // Total addressable market
    marketGrowth: number; // Market growth rate
    competitiveIntensity: number; // Competitive intensity (1-10)
    regulatoryEnvironment: string; // Regulatory environment
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedBreakdown: boolean; // Include detailed breakdown
    includePredictiveAnalysis: boolean; // Include predictive analysis
    includeSegmentationAnalysis: boolean; // Include segmentation analysis
    includeComparativeAnalysis: boolean; // Include comparative analysis
    includeRiskAnalysis: boolean; // Include risk analysis
    includeRecommendations: boolean; // Include recommendations
    includeActionItems: boolean; // Include action items
  };
  
  // Analysis parameters
  analysisParameters: {
    minimumDataPoints: number; // Minimum data points for analysis
    outlierThreshold: number; // Outlier threshold
    smoothingFactor: number; // Smoothing factor for trends
    significanceLevel: number; // Significance level for testing
    maximumPredictionPeriod: number; // Maximum prediction period
  };
}

export interface CustomerLifetimeValueResults {
  // Core LTV metrics
  customerLTV: number; // Customer lifetime value
  presentValueLTV: number; // Present value of LTV
  averageLTV: number; // Average LTV across customers
  medianLTV: number; // Median LTV across customers
  ltvRange: {
    min: number; // Minimum LTV
    max: number; // Maximum LTV
    q1: number; // First quartile
    q3: number; // Third quartile
  };
  
  // LTV breakdown
  ltvBreakdown: {
    revenue: {
      totalRevenue: number; // Total revenue
      averageRevenue: number; // Average revenue per period
      revenueGrowth: number; // Revenue growth rate
      revenueProjection: number; // Projected revenue
    };
    costs: {
      totalCosts: number; // Total costs
      acquisitionCost: number; // Acquisition cost
      serviceCost: number; // Service cost
      marketingCost: number; // Marketing cost
      operationalCost: number; // Operational cost
    };
    profit: {
      totalProfit: number; // Total profit
      profitMargin: number; // Profit margin
      profitGrowth: number; // Profit growth rate
      profitProjection: number; // Projected profit
    };
  };
  
  // Time-based LTV analysis
  timeBasedAnalysis: {
    ltvByPeriod: {
      period: number; // Period number
      cumulativeRevenue: number; // Cumulative revenue
      cumulativeCosts: number; // Cumulative costs
      cumulativeProfit: number; // Cumulative profit
      ltv: number; // LTV at period
      growthRate: number; // Growth rate
    }[];
    ltvTrends: {
      trend: 'increasing' | 'decreasing' | 'stable';
      trendStrength: number; // Trend strength
      trendSlope: number; // Trend slope
      seasonality: boolean; // Whether seasonality exists
    };
    paybackPeriod: number; // Payback period in months
    breakEvenPoint: number; // Break-even point in months
  };
  
  // Predictive LTV analysis
  predictiveAnalysis: {
    predictedLTV: number; // Predicted LTV
    predictionConfidence: number; // Prediction confidence
    confidenceInterval: {
      lower: number; // Lower bound
      upper: number; // Upper bound
    };
    ltvProjections: {
      period: number; // Period number
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
  
  // Customer segmentation analysis
  segmentationAnalysis: {
    segments: {
      segmentName: string; // Segment name
      segmentSize: number; // Segment size
      averageLTV: number; // Average LTV
      medianLTV: number; // Median LTV
      ltvRange: {
        min: number; // Minimum LTV
        max: number; // Maximum LTV
      };
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'underperforming';
    }[];
    segmentComparison: {
      segment1: string; // First segment
      segment2: string; // Second segment
      ltvDifference: number; // LTV difference
      significance: boolean; // Statistical significance
      confidence: number; // Confidence level
    }[];
    segmentInsights: string[]; // Segment insights
  };
  
  // Cohort analysis
  cohortAnalysis: {
    cohorts: {
      cohortDate: Date; // Cohort date
      cohortSize: number; // Cohort size
      averageLTV: number; // Average LTV
      ltvByPeriod: {
        period: number; // Period number
        averageLTV: number; // Average LTV
        retentionRate: number; // Retention rate
        churnRate: number; // Churn rate
      }[];
      totalLTV: number; // Total cohort LTV
      performance: 'excellent' | 'good' | 'average' | 'poor';
    }[];
    cohortComparison: {
      cohort1: string; // First cohort
      cohort2: string; // Second cohort
      ltvDifference: number; // LTV difference
      significance: boolean; // Statistical significance
    }[];
  };
  
  // Churn and retention analysis
  churnRetentionAnalysis: {
    churnRate: number; // Overall churn rate
    retentionRate: number; // Overall retention rate
    averageLifespan: number; // Average customer lifespan
    churnByPeriod: {
      period: number; // Period number
      churnRate: number; // Churn rate
      retainedCustomers: number; // Retained customers
      churnedCustomers: number; // Churned customers
    }[];
    retentionByPeriod: {
      period: number; // Period number
      retentionRate: number; // Retention rate
      cumulativeRetention: number; // Cumulative retention
    }[];
    churnPredictors: {
      factor: string; // Churn predictor
      correlation: number; // Correlation with churn
      importance: number; // Importance score
    }[];
  };
  
  // Revenue analysis
  revenueAnalysis: {
    totalRevenue: number; // Total revenue
    averageRevenue: number; // Average revenue per customer
    revenueByPeriod: {
      period: number; // Period number
      revenue: number; // Revenue
      growthRate: number; // Growth rate
    }[];
    revenueByProduct: {
      product: string; // Product name
      revenue: number; // Product revenue
      percentage: number; // Revenue percentage
    }[];
    revenueByChannel: {
      channel: string; // Channel name
      revenue: number; // Channel revenue
      percentage: number; // Revenue percentage
    }[];
    revenueProjection: {
      period: number; // Period number
      projectedRevenue: number; // Projected revenue
      confidence: number; // Projection confidence
    }[];
  };
  
  // Cost analysis
  costAnalysis: {
    totalCosts: number; // Total costs
    costBreakdown: {
      category: string; // Cost category
      amount: number; // Cost amount
      percentage: number; // Cost percentage
    }[];
    costByPeriod: {
      period: number; // Period number
      costs: number; // Costs
      costPerCustomer: number; // Cost per customer
    }[];
    costEfficiency: {
      efficiency: number; // Cost efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    };
  };
  
  // Comparative analysis
  comparativeAnalysis: {
    industryComparison: {
      metric: string; // Metric name
      customerValue: number; // Customer value
      industryAverage: number; // Industry average
      difference: number; // Difference from industry
      percentile: number; // Percentile rank
    }[];
    competitorComparison: {
      competitor: string; // Competitor name
      competitorLTV: number; // Competitor LTV
      difference: number; // Difference from competitor
      marketPosition: string; // Market position
    }[];
    benchmarkAnalysis: {
      benchmark: string; // Benchmark name
      benchmarkValue: number; // Benchmark value
      customerValue: number; // Customer value
      gap: number; // Gap from benchmark
      opportunity: number; // Improvement opportunity
    }[];
  };
  
  // Risk analysis
  riskAnalysis: {
    ltvRisks: {
      risk: string; // Risk description
      probability: number; // Risk probability
      impact: number; // Risk impact
      mitigation: string; // Risk mitigation
    }[];
    churnRisks: {
      risk: string; // Churn risk
      probability: number; // Risk probability
      impact: number; // Risk impact
      mitigation: string; // Risk mitigation
    }[];
    marketRisks: {
      risk: string; // Market risk
      probability: number; // Risk probability
      impact: number; // Risk impact
      mitigation: string; // Risk mitigation
    }[];
    overallRiskScore: number; // Overall risk score
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Business impact analysis
  businessImpact: {
    revenueImpact: {
      currentRevenue: number; // Current revenue
      potentialRevenue: number; // Potential revenue
      revenueOpportunity: number; // Revenue opportunity
      impact: number; // Business impact
    };
    customerImpact: {
      currentCustomers: number; // Current customers
      potentialCustomers: number; // Potential customers
      customerOpportunity: number; // Customer opportunity
      impact: number; // Customer impact
    };
    operationalImpact: {
      currentEfficiency: number; // Current efficiency
      potentialEfficiency: number; // Potential efficiency
      efficiencyOpportunity: number; // Efficiency opportunity
      impact: number; // Operational impact
    };
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    opportunities: {
      opportunity: string; // Optimization opportunity
      impact: number; // Potential impact
      implementation: string; // Implementation strategy
      priority: 'high' | 'medium' | 'low';
      timeline: string; // Implementation timeline
    }[];
    totalOpportunity: number; // Total optimization opportunity
    roiAnalysis: {
      investment: number; // Required investment
      return: number; // Expected return
      roi: number; // Return on investment
      paybackPeriod: number; // Payback period
    };
  };
  
  // LTV efficiency
  ltvEfficiency: {
    overallEfficiency: number; // Overall LTV efficiency
    efficiencyBySegment: {
      segment: string; // Segment name
      efficiency: number; // Segment efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    efficiencyByPeriod: {
      period: number; // Period number
      efficiency: number; // Period efficiency
      trend: 'improving' | 'declining' | 'stable';
    }[];
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
