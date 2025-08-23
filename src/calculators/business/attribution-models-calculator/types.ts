export interface AttributionModelsInputs {
  // Campaign information
  campaigns: {
    campaignId: string;
    campaignName: string;
    campaignType: 'digital' | 'traditional' | 'social' | 'content' | 'email' | 'affiliate';
    startDate: Date;
    endDate: Date;
    budget: number;
    channel: string;
    platform: string;
    targetAudience: string;
  }[];
  
  // Touchpoint data
  touchpoints: {
    touchpointId: string;
    customerId: string;
    campaignId: string;
    touchpointDate: Date;
    touchpointType: string;
    touchpointChannel: string;
    touchpointCost: number;
    touchpointValue: number;
    touchpointPosition: number;
    timeToConversion: number;
    conversionValue: number;
    conversionType: string;
  }[];
  
  // Customer journey data
  customerJourneys: {
    journeyId: string;
    customerId: string;
    startDate: Date;
    endDate: Date;
    conversionDate: Date;
    conversionValue: number;
    conversionType: string;
    journeyLength: number;
    touchpoints: {
      touchpointId: string;
      touchpointDate: Date;
      touchpointType: string;
      touchpointChannel: string;
      touchpointCost: number;
      touchpointPosition: number;
    }[];
  }[];
  
  // Attribution model parameters
  attributionParameters: {
    modelType: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'data-driven' | 'markov-chain' | 'shapley-value' | 'custom';
    timeWindow: number;
    decayRate: number;
    positionWeights: {
      first: number;
      middle: number;
      last: number;
    };
    dataDrivenParameters: {
      algorithm: 'logistic-regression' | 'random-forest' | 'neural-network' | 'gradient-boosting';
      features: string[];
      trainingData: {
        startDate: Date;
        endDate: Date;
        sampleSize: number;
      };
      validationMethod: 'cross-validation' | 'holdout' | 'time-series';
    };
    markovChainParameters: {
      states: string[];
      transitionMatrix: number[][];
      removalEffect: boolean;
      order: number;
    };
    shapleyValueParameters: {
      coalitionSize: number;
      samplingMethod: 'exhaustive' | 'monte-carlo' | 'approximation';
      iterations: number;
    };
  };
  
  // Conversion data
  conversions: {
    conversionId: string;
    customerId: string;
    conversionDate: Date;
    conversionValue: number;
    conversionType: string;
    conversionSource: string;
    attributionPath: string[];
    assistedConversions: number;
    directConversions: number;
  }[];
  
  // Channel data
  channels: {
    channelId: string;
    channelName: string;
    channelType: string;
    channelCost: number;
    channelRevenue: number;
    channelConversions: number;
    channelEfficiency: number;
    channelROI: number;
  }[];
  
  // Campaign performance
  campaignPerformance: {
    campaignId: string;
    campaignName: string;
    totalSpend: number;
    totalRevenue: number;
    totalConversions: number;
    conversionRate: number;
    costPerConversion: number;
    revenuePerConversion: number;
    roi: number;
    efficiency: number;
  }[];
  
  // Time-based analysis
  timeBasedAnalysis: {
    timePeriods: {
      period: Date;
      conversions: number;
      revenue: number;
      spend: number;
      efficiency: number;
    }[];
    seasonality: {
      season: string;
      factor: number;
      impact: number;
    }[];
    trends: {
      trend: string;
      direction: 'increasing' | 'decreasing' | 'stable';
      strength: number;
    }[];
  };
  
  // Customer segmentation
  customerSegmentation: {
    segments: {
      segmentId: string;
      segmentName: string;
      segmentCriteria: string;
      segmentSize: number;
      conversionRate: number;
      averageOrderValue: number;
      customerLifetimeValue: number;
    }[];
    segmentAttribution: {
      segmentId: string;
      modelType: string;
      attributionBreakdown: {
        channel: string;
        attribution: number;
        percentage: number;
      }[];
    }[];
  };
  
  // Cross-device tracking
  crossDeviceTracking: {
    devicePaths: {
      customerId: string;
      devices: {
        deviceId: string;
        deviceType: string;
        touchpoints: {
          touchpointId: string;
          touchpointDate: Date;
          touchpointType: string;
        }[];
      }[];
      conversion: {
        deviceId: string;
        conversionDate: Date;
        conversionValue: number;
      };
    }[];
    deviceAttribution: {
      deviceType: string;
      attribution: number;
      conversionRate: number;
      averageOrderValue: number;
    }[];
  };
  
  // Offline attribution
  offlineAttribution: {
    offlineData: {
      customerId: string;
      offlineTouchpoint: string;
      offlineDate: Date;
      offlineValue: number;
      onlineTouchpoints: {
        touchpointId: string;
        touchpointDate: Date;
        touchpointType: string;
      }[];
      conversion: {
        conversionDate: Date;
        conversionValue: number;
        conversionType: string;
      };
    }[];
    offlineAttribution: {
      offlineChannel: string;
      attribution: number;
      conversionRate: number;
      averageOrderValue: number;
    }[];
  };
  
  // Model comparison
  modelComparison: {
    models: {
      modelName: string;
      modelType: string;
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
      mape: number;
    }[];
    comparisonMetrics: {
      metric: string;
      model1: string;
      model2: string;
      difference: number;
      significance: boolean;
    }[];
  };
  
  // Validation parameters
  validationParameters: {
    validationMethod: 'holdout' | 'cross-validation' | 'time-series' | 'bootstrap';
    validationPeriod: {
      startDate: Date;
      endDate: Date;
    };
    validationMetrics: string[];
    confidenceLevel: number;
    significanceLevel: number;
  };
  
  // Business context
  businessContext: {
    businessModel: 'b2c' | 'b2b' | 'marketplace' | 'subscription' | 'ecommerce';
    industry: string;
    averageOrderValue: number;
    customerLifespan: number;
    conversionCycle: number;
    attributionWindow: number;
  };
  
  // Analysis parameters
  analysisParameters: {
    includeTimeDecay: boolean;
    includePositionBias: boolean;
    includeChannelInteraction: boolean;
    includeCustomerSegmentation: boolean;
    includeCrossDevice: boolean;
    includeOfflineData: boolean;
    minimumTouchpoints: number;
    maximumTouchpoints: number;
    outlierHandling: 'remove' | 'cap' | 'transform' | 'ignore';
  };
  
  // Reporting preferences
  reporting: {
    includeModelComparison: boolean;
    includeChannelAnalysis: boolean;
    includeCampaignAnalysis: boolean;
    includeCustomerAnalysis: boolean;
    includeTimeAnalysis: boolean;
    includeValidationResults: boolean;
    includeRecommendations: boolean;
    includeVisualizations: boolean;
  };
}

export interface AttributionModelsResults {
  // Attribution results
  attributionResults: {
    modelType: string;
    totalConversions: number;
    totalRevenue: number;
    totalSpend: number;
    overallROI: number;
    attributionBreakdown: {
      channel: string;
      attribution: number;
      percentage: number;
      conversions: number;
      revenue: number;
      spend: number;
      roi: number;
      efficiency: number;
    }[];
  };
  
  // Model comparison
  modelComparison: {
    models: {
      modelName: string;
      modelType: string;
      totalAttribution: number;
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
      mape: number;
      attributionBreakdown: {
        channel: string;
        attribution: number;
        percentage: number;
      }[];
    }[];
    bestModel: {
      modelName: string;
      modelType: string;
      rationale: string;
      advantages: string[];
      limitations: string[];
    };
  };
  
  // Channel analysis
  channelAnalysis: {
    channels: {
      channelName: string;
      totalAttribution: number;
      attributionPercentage: number;
      conversions: number;
      revenue: number;
      spend: number;
      roi: number;
      efficiency: number;
      performance: 'excellent' | 'good' | 'average' | 'poor';
    }[];
    channelComparison: {
      channel1: string;
      channel2: string;
      attributionDifference: number;
      efficiencyDifference: number;
      roiDifference: number;
      significance: boolean;
    }[];
    channelInsights: string[];
  };
  
  // Campaign analysis
  campaignAnalysis: {
    campaigns: {
      campaignName: string;
      campaignType: string;
      totalAttribution: number;
      attributionPercentage: number;
      conversions: number;
      revenue: number;
      spend: number;
      roi: number;
      efficiency: number;
      performance: 'excellent' | 'good' | 'average' | 'poor';
    }[];
    campaignComparison: {
      campaign1: string;
      campaign2: string;
      attributionDifference: number;
      efficiencyDifference: number;
      roiDifference: number;
      significance: boolean;
    }[];
    campaignInsights: string[];
  };
  
  // Customer journey analysis
  customerJourneyAnalysis: {
    journeyPatterns: {
      pattern: string;
      frequency: number;
      conversionRate: number;
      averageOrderValue: number;
      attribution: number;
    }[];
    touchpointAnalysis: {
      touchpointType: string;
      frequency: number;
      conversionRate: number;
      attribution: number;
      position: {
        first: number;
        middle: number;
        last: number;
      };
    }[];
    journeyInsights: string[];
  };
  
  // Time-based analysis
  timeBasedAnalysis: {
    attributionByTime: {
      period: Date;
      conversions: number;
      revenue: number;
      attribution: number;
      efficiency: number;
    }[];
    seasonalityAnalysis: {
      season: string;
      attribution: number;
      conversionRate: number;
      averageOrderValue: number;
      factor: number;
    }[];
    trendAnalysis: {
      trend: string;
      direction: 'increasing' | 'decreasing' | 'stable';
      strength: number;
      attribution: number;
    }[];
  };
  
  // Customer segmentation analysis
  segmentationAnalysis: {
    segments: {
      segmentName: string;
      segmentSize: number;
      attribution: number;
      conversionRate: number;
      averageOrderValue: number;
      customerLifetimeValue: number;
      attributionBreakdown: {
        channel: string;
        attribution: number;
        percentage: number;
      }[];
    }[];
    segmentComparison: {
      segment1: string;
      segment2: string;
      attributionDifference: number;
      conversionRateDifference: number;
      valueDifference: number;
      significance: boolean;
    }[];
    segmentInsights: string[];
  };
  
  // Cross-device analysis
  crossDeviceAnalysis: {
    deviceAttribution: {
      deviceType: string;
      attribution: number;
      conversionRate: number;
      averageOrderValue: number;
      touchpoints: number;
    }[];
    devicePaths: {
      path: string;
      frequency: number;
      conversionRate: number;
      attribution: number;
    }[];
    deviceInsights: string[];
  };
  
  // Offline attribution analysis
  offlineAttributionAnalysis: {
    offlineChannels: {
      channel: string;
      attribution: number;
      conversionRate: number;
      averageOrderValue: number;
      onlineAssist: number;
    }[];
    onlineOfflineInteraction: {
      onlineChannel: string;
      offlineChannel: string;
      interaction: number;
      attribution: number;
    }[];
    offlineInsights: string[];
  };
  
  // Model validation
  modelValidation: {
    validationResults: {
      modelName: string;
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
      mape: number;
      confidence: number;
    }[];
    validationComparison: {
      model1: string;
      model2: string;
      accuracyDifference: number;
      precisionDifference: number;
      recallDifference: number;
      significance: boolean;
    }[];
    validationInsights: string[];
  };
  
  // Attribution efficiency
  attributionEfficiency: {
    overallEfficiency: number;
    efficiencyByChannel: {
      channel: string;
      efficiency: number;
      improvement: number;
      potential: number;
    }[];
    efficiencyByCampaign: {
      campaign: string;
      efficiency: number;
      improvement: number;
      potential: number;
    }[];
    efficiencyTrends: {
      period: Date;
      efficiency: number;
      trend: 'improving' | 'declining' | 'stable';
    }[];
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    channelOptimization: {
      channel: string;
      currentAttribution: number;
      potentialAttribution: number;
      improvement: number;
      recommendations: string[];
      implementation: string;
    }[];
    campaignOptimization: {
      campaign: string;
      currentAttribution: number;
      potentialAttribution: number;
      improvement: number;
      recommendations: string[];
      implementation: string;
    }[];
    modelOptimization: {
      currentModel: string;
      recommendedModel: string;
      improvement: number;
      rationale: string;
      implementation: string;
    }[];
  };
  
  // Business impact
  businessImpact: {
    revenueImpact: {
      currentRevenue: number;
      potentialRevenue: number;
      revenueOpportunity: number;
      impact: number;
    };
    efficiencyImpact: {
      currentEfficiency: number;
      potentialEfficiency: number;
      efficiencyOpportunity: number;
      impact: number;
    };
    roiImpact: {
      currentROI: number;
      potentialROI: number;
      roiOpportunity: number;
      impact: number;
    };
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementation: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
    cost: number;
  }[];
}
