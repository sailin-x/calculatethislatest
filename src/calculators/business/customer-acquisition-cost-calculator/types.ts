export interface CustomerAcquisitionCostInputs {
  // Marketing campaign information
  marketingCampaigns: {
    campaignId: string; // Unique campaign identifier
    campaignName: string; // Campaign name
    campaignType: 'digital' | 'traditional' | 'social' | 'content' | 'email' | 'affiliate' | 'referral' | 'influencer' | 'retargeting' | 'brand';
    startDate: Date; // Campaign start date
    endDate: Date; // Campaign end date
    status: 'active' | 'paused' | 'completed' | 'draft' | 'scheduled';
    targetAudience: string; // Target audience description
    geographicTarget: string; // Geographic targeting
    channel: string; // Marketing channel
    platform: string; // Platform used
  }[];
  
  // Marketing spend data
  marketingSpend: {
    campaignId: string; // Associated campaign ID
    spendDate: Date; // Spend date
    spendAmount: number; // Spend amount
    spendType: 'advertising' | 'content' | 'tools' | 'agency' | 'events' | 'promotions' | 'influencer' | 'affiliate' | 'referral' | 'other';
    spendCategory: string; // Spend category
    currency: string; // Currency
    paymentMethod: string; // Payment method
    vendor: string; // Vendor/agency name
    notes: string; // Additional notes
  }[];
  
  // Customer acquisition data
  customerAcquisitions: {
    customerId: string; // Customer identifier
    acquisitionDate: Date; // Acquisition date
    campaignId: string; // Associated campaign ID
    acquisitionChannel: string; // Acquisition channel
    acquisitionSource: string; // Acquisition source
    acquisitionType: 'organic' | 'paid' | 'referral' | 'affiliate' | 'influencer' | 'direct' | 'social' | 'email' | 'content' | 'other';
    customerSegment: string; // Customer segment
    customerValue: number; // Initial customer value
    conversionPath: string[]; // Conversion path touchpoints
    timeToConversion: number; // Time to conversion in days
    conversionValue: number; // Conversion value
  }[];
  
  // Lead generation data
  leadGeneration: {
    leadId: string; // Lead identifier
    leadDate: Date; // Lead generation date
    campaignId: string; // Associated campaign ID
    leadSource: string; // Lead source
    leadType: 'cold' | 'warm' | 'hot' | 'qualified' | 'unqualified';
    leadScore: number; // Lead score (1-100)
    leadValue: number; // Lead value
    conversionRate: number; // Lead conversion rate
    timeToQualify: number; // Time to qualify in days
    qualificationCost: number; // Cost to qualify lead
  }[];
  
  // Attribution data
  attributionData: {
    customerId: string; // Customer identifier
    touchpointId: string; // Touchpoint identifier
    touchpointDate: Date; // Touchpoint date
    touchpointType: string; // Touchpoint type
    touchpointChannel: string; // Touchpoint channel
    touchpointCost: number; // Touchpoint cost
    attributionWeight: number; // Attribution weight
    attributionModel: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'data-driven';
    conversionCredit: number; // Conversion credit
  }[];
  
  // CAC calculation parameters
  cacParameters: {
    calculationMethod: 'simple' | 'attributed' | 'weighted' | 'incremental' | 'custom';
    timePeriod: {
      startDate: Date; // Analysis start date
      endDate: Date; // Analysis end date
      periodType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    };
    attributionModel: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'data-driven' | 'custom';
    includeOrganic: boolean; // Include organic acquisitions
    includeReferrals: boolean; // Include referral acquisitions
    includeRetargeting: boolean; // Include retargeting costs
    includeOverhead: boolean; // Include overhead costs
    overheadAllocation: number; // Overhead allocation percentage
  };
  
  // Marketing mix analysis
  marketingMix: {
    channels: {
      channel: string; // Marketing channel
      spend: number; // Channel spend
      acquisitions: number; // Acquisitions from channel
      cac: number; // CAC for channel
      conversionRate: number; // Conversion rate
      roi: number; // Return on investment
      efficiency: number; // Channel efficiency
    }[];
    channelComparison: {
      channel1: string; // First channel
      channel2: string; // Second channel
      cacDifference: number; // CAC difference
      efficiencyDifference: number; // Efficiency difference
      significance: boolean; // Statistical significance
    }[];
  };
  
  // Customer segmentation
  customerSegmentation: {
    segments: {
      segmentName: string; // Segment name
      segmentCriteria: string; // Segment criteria
      segmentSize: number; // Segment size
      averageCac: number; // Average CAC for segment
      conversionRate: number; // Conversion rate for segment
      customerValue: number; // Average customer value
      ltv: number; // Customer lifetime value
      ltvCacRatio: number; // LTV:CAC ratio
    }[];
    segmentAnalysis: {
      segment1: string; // First segment
      segment2: string; // Second segment
      cacDifference: number; // CAC difference
      efficiencyDifference: number; // Efficiency difference
      valueDifference: number; // Value difference
    }[];
  };
  
  // Campaign performance
  campaignPerformance: {
    campaigns: {
      campaignId: string; // Campaign identifier
      campaignName: string; // Campaign name
      totalSpend: number; // Total campaign spend
      totalAcquisitions: number; // Total acquisitions
      cac: number; // Campaign CAC
      conversionRate: number; // Conversion rate
      roi: number; // Return on investment
      efficiency: number; // Campaign efficiency
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'underperforming';
    }[];
    campaignComparison: {
      campaign1: string; // First campaign
      campaign2: string; // Second campaign
      cacDifference: number; // CAC difference
      efficiencyDifference: number; // Efficiency difference
      roiDifference: number; // ROI difference
    }[];
  };
  
  // Time-based analysis
  timeBasedAnalysis: {
    cacByPeriod: {
      period: Date; // Period date
      spend: number; // Period spend
      acquisitions: number; // Period acquisitions
      cac: number; // Period CAC
      trend: 'improving' | 'declining' | 'stable';
    }[];
    seasonalityAnalysis: {
      season: string; // Season name
      averageCac: number; // Average CAC for season
      trend: 'higher' | 'lower' | 'similar';
      factor: number; // Seasonal factor
    }[];
    trendAnalysis: {
      trend: 'improving' | 'declining' | 'stable';
      trendStrength: number; // Trend strength
      trendSlope: number; // Trend slope
      seasonality: boolean; // Whether seasonality exists
    };
  };
  
  // Competitive analysis
  competitiveAnalysis: {
    enableCompetitive: boolean; // Enable competitive analysis
    industry: string; // Industry type
    averageIndustryCac: number; // Industry average CAC
    competitorCac: {
      competitor: string; // Competitor name
      averageCac: number; // Competitor average CAC
      marketShare: number; // Competitor market share
      efficiency: number; // Competitor efficiency
    }[];
    marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
    competitiveAdvantage: string; // Competitive advantage
  };
  
  // LTV:CAC analysis
  ltvCacAnalysis: {
    ltvCacRatio: number; // Overall LTV:CAC ratio
    ltvCacBySegment: {
      segment: string; // Segment name
      ltvCacRatio: number; // LTV:CAC ratio for segment
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'concerning';
    }[];
    ltvCacByChannel: {
      channel: string; // Channel name
      ltvCacRatio: number; // LTV:CAC ratio for channel
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'concerning';
    }[];
    ltvCacByCampaign: {
      campaign: string; // Campaign name
      ltvCacRatio: number; // LTV:CAC ratio for campaign
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'concerning';
    }[];
    paybackPeriod: number; // CAC payback period
    breakEvenPoint: number; // Break-even point
  };
  
  // Efficiency analysis
  efficiencyAnalysis: {
    overallEfficiency: number; // Overall acquisition efficiency
    efficiencyByChannel: {
      channel: string; // Channel name
      efficiency: number; // Channel efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    efficiencyBySegment: {
      segment: string; // Segment name
      efficiency: number; // Segment efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    efficiencyTrends: {
      period: Date; // Period date
      efficiency: number; // Period efficiency
      trend: 'improving' | 'declining' | 'stable';
    }[];
  };
  
  // Risk analysis
  riskAnalysis: {
    cacRisks: {
      risk: string; // Risk description
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
    competitiveRisks: {
      risk: string; // Competitive risk
      probability: number; // Risk probability
      impact: number; // Risk impact
      mitigation: string; // Risk mitigation
    }[];
    overallRiskScore: number; // Overall risk score
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Business context
  businessContext: {
    businessModel: 'b2c' | 'b2b' | 'marketplace' | 'subscription' | 'ecommerce' | 'saas';
    industry: string; // Industry type
    marketSize: number; // Total addressable market
    marketGrowth: number; // Market growth rate
    competitiveIntensity: number; // Competitive intensity (1-10)
    customerLifespan: number; // Average customer lifespan in months
    averageOrderValue: number; // Average order value
    repeatPurchaseRate: number; // Repeat purchase rate
  };
  
  // Optimization parameters
  optimizationParameters: {
    targetCac: number; // Target CAC
    targetLtvCacRatio: number; // Target LTV:CAC ratio
    budgetConstraints: number; // Budget constraints
    scalingLimits: number; // Scaling limits
    efficiencyTargets: {
      channel: string; // Channel name
      targetEfficiency: number; // Target efficiency
      currentEfficiency: number; // Current efficiency
      improvement: number; // Required improvement
    }[];
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedBreakdown: boolean; // Include detailed breakdown
    includeAttributionAnalysis: boolean; // Include attribution analysis
    includeSegmentationAnalysis: boolean; // Include segmentation analysis
    includeComparativeAnalysis: boolean; // Include comparative analysis
    includeRiskAnalysis: boolean; // Include risk analysis
    includeOptimizationRecommendations: boolean; // Include optimization recommendations
    includeActionItems: boolean; // Include action items
  };
  
  // Analysis parameters
  analysisParameters: {
    minimumDataPoints: number; // Minimum data points for analysis
    outlierThreshold: number; // Outlier threshold
    significanceLevel: number; // Significance level for testing
    confidenceInterval: number; // Confidence interval
    smoothingFactor: number; // Smoothing factor for trends
  };
}

export interface CustomerAcquisitionCostResults {
  // Core CAC metrics
  customerAcquisitionCost: number; // Overall customer acquisition cost
  attributedCac: number; // Attributed CAC
  weightedCac: number; // Weighted CAC
  incrementalCac: number; // Incremental CAC
  cacRange: {
    min: number; // Minimum CAC
    max: number; // Maximum CAC
    q1: number; // First quartile
    q3: number; // Third quartile
  };
  
  // CAC breakdown
  cacBreakdown: {
    marketingSpend: {
      totalSpend: number; // Total marketing spend
      spendByChannel: {
        channel: string; // Channel name
        spend: number; // Channel spend
        percentage: number; // Spend percentage
      }[];
      spendByCampaign: {
        campaign: string; // Campaign name
        spend: number; // Campaign spend
        percentage: number; // Spend percentage
      }[];
    };
    acquisitions: {
      totalAcquisitions: number; // Total acquisitions
      acquisitionsByChannel: {
        channel: string; // Channel name
        acquisitions: number; // Channel acquisitions
        percentage: number; // Acquisition percentage
      }[];
      acquisitionsByCampaign: {
        campaign: string; // Campaign name
        acquisitions: number; // Campaign acquisitions
        percentage: number; // Acquisition percentage
      }[];
    };
    efficiency: {
      overallEfficiency: number; // Overall efficiency
      efficiencyByChannel: {
        channel: string; // Channel name
        efficiency: number; // Channel efficiency
        cac: number; // Channel CAC
        conversionRate: number; // Conversion rate
      }[];
    };
  };
  
  // Channel analysis
  channelAnalysis: {
    channels: {
      channel: string; // Channel name
      spend: number; // Channel spend
      acquisitions: number; // Channel acquisitions
      cac: number; // Channel CAC
      conversionRate: number; // Conversion rate
      roi: number; // Return on investment
      efficiency: number; // Channel efficiency
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'underperforming';
    }[];
    channelComparison: {
      channel1: string; // First channel
      channel2: string; // Second channel
      cacDifference: number; // CAC difference
      efficiencyDifference: number; // Efficiency difference
      significance: boolean; // Statistical significance
    }[];
    channelInsights: string[]; // Channel insights
  };
  
  // Campaign analysis
  campaignAnalysis: {
    campaigns: {
      campaignId: string; // Campaign identifier
      campaignName: string; // Campaign name
      totalSpend: number; // Total campaign spend
      totalAcquisitions: number; // Total acquisitions
      cac: number; // Campaign CAC
      conversionRate: number; // Conversion rate
      roi: number; // Return on investment
      efficiency: number; // Campaign efficiency
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'underperforming';
    }[];
    campaignComparison: {
      campaign1: string; // First campaign
      campaign2: string; // Second campaign
      cacDifference: number; // CAC difference
      efficiencyDifference: number; // Efficiency difference
      roiDifference: number; // ROI difference
    }[];
    campaignInsights: string[]; // Campaign insights
  };
  
  // Attribution analysis
  attributionAnalysis: {
    attributionModel: string; // Attribution model used
    attributionBreakdown: {
      touchpoint: string; // Touchpoint name
      attributionWeight: number; // Attribution weight
      conversionCredit: number; // Conversion credit
      cost: number; // Touchpoint cost
    }[];
    attributionComparison: {
      model1: string; // First attribution model
      model2: string; // Second attribution model
      cacDifference: number; // CAC difference
      accuracy: number; // Model accuracy
    }[];
    attributionInsights: string[]; // Attribution insights
  };
  
  // Time-based analysis
  timeBasedAnalysis: {
    cacByPeriod: {
      period: Date; // Period date
      spend: number; // Period spend
      acquisitions: number; // Period acquisitions
      cac: number; // Period CAC
      trend: 'improving' | 'declining' | 'stable';
    }[];
    cacTrends: {
      trend: 'improving' | 'declining' | 'stable';
      trendStrength: number; // Trend strength
      trendSlope: number; // Trend slope
      seasonality: boolean; // Whether seasonality exists
    };
    seasonalityAnalysis: {
      season: string; // Season name
      averageCac: number; // Average CAC for season
      trend: 'higher' | 'lower' | 'similar';
      factor: number; // Seasonal factor
    }[];
  };
  
  // Customer segmentation analysis
  segmentationAnalysis: {
    segments: {
      segmentName: string; // Segment name
      segmentSize: number; // Segment size
      averageCac: number; // Average CAC
      conversionRate: number; // Conversion rate
      customerValue: number; // Average customer value
      ltv: number; // Customer lifetime value
      ltvCacRatio: number; // LTV:CAC ratio
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'underperforming';
    }[];
    segmentComparison: {
      segment1: string; // First segment
      segment2: string; // Second segment
      cacDifference: number; // CAC difference
      efficiencyDifference: number; // Efficiency difference
      valueDifference: number; // Value difference
    }[];
    segmentInsights: string[]; // Segment insights
  };
  
  // LTV:CAC analysis
  ltvCacAnalysis: {
    ltvCacRatio: number; // Overall LTV:CAC ratio
    ltvCacBySegment: {
      segment: string; // Segment name
      ltvCacRatio: number; // LTV:CAC ratio for segment
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'concerning';
    }[];
    ltvCacByChannel: {
      channel: string; // Channel name
      ltvCacRatio: number; // LTV:CAC ratio for channel
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'concerning';
    }[];
    ltvCacByCampaign: {
      campaign: string; // Campaign name
      ltvCacRatio: number; // LTV:CAC ratio for campaign
      performance: 'excellent' | 'good' | 'average' | 'poor' | 'concerning';
    }[];
    paybackPeriod: number; // CAC payback period
    breakEvenPoint: number; // Break-even point
    ltvCacInsights: string[]; // LTV:CAC insights
  };
  
  // Efficiency analysis
  efficiencyAnalysis: {
    overallEfficiency: number; // Overall acquisition efficiency
    efficiencyByChannel: {
      channel: string; // Channel name
      efficiency: number; // Channel efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    efficiencyBySegment: {
      segment: string; // Segment name
      efficiency: number; // Segment efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    efficiencyTrends: {
      period: Date; // Period date
      efficiency: number; // Period efficiency
      trend: 'improving' | 'declining' | 'stable';
    }[];
    efficiencyInsights: string[]; // Efficiency insights
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
      competitorCac: number; // Competitor CAC
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
    cacRisks: {
      risk: string; // Risk description
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
    competitiveRisks: {
      risk: string; // Competitive risk
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
  
  // CAC efficiency
  cacEfficiency: {
    overallEfficiency: number; // Overall CAC efficiency
    efficiencyByChannel: {
      channel: string; // Channel name
      efficiency: number; // Channel efficiency
      improvement: number; // Efficiency improvement
      potential: number; // Efficiency potential
    }[];
    efficiencyByPeriod: {
      period: Date; // Period date
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
