export interface IndustryBenchmarkingInputs {
  // Company information
  companyInfo: {
    companyName: string; // Company name
    industry: string; // Primary industry
    subIndustry: string; // Sub-industry
    companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
    revenueRange: string; // Revenue range
    employeeCount: number; // Number of employees
    geographicRegion: string; // Geographic region
    marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
    businessModel: 'b2c' | 'b2b' | 'marketplace' | 'subscription' | 'ecommerce' | 'saas' | 'manufacturing' | 'retail' | 'services';
    yearsInBusiness: number; // Years in business
  };
  
  // Financial metrics
  financialMetrics: {
    revenue: {
      totalRevenue: number; // Total revenue
      revenueGrowth: number; // Revenue growth rate
      recurringRevenue: number; // Recurring revenue
      revenuePerEmployee: number; // Revenue per employee
      revenueBySegment: {
        segment: string; // Revenue segment
        amount: number; // Segment revenue
        percentage: number; // Revenue percentage
      }[];
    };
    profitability: {
      grossProfit: number; // Gross profit
      grossMargin: number; // Gross margin percentage
      operatingIncome: number; // Operating income
      operatingMargin: number; // Operating margin percentage
      netIncome: number; // Net income
      netMargin: number; // Net margin percentage
      ebitda: number; // EBITDA
      ebitdaMargin: number; // EBITDA margin percentage
    };
    efficiency: {
      assetTurnover: number; // Asset turnover ratio
      inventoryTurnover: number; // Inventory turnover ratio
      receivablesTurnover: number; // Receivables turnover ratio
      payablesTurnover: number; // Payables turnover ratio
      workingCapitalRatio: number; // Working capital ratio
      cashConversionCycle: number; // Cash conversion cycle
    };
    liquidity: {
      currentRatio: number; // Current ratio
      quickRatio: number; // Quick ratio
      cashRatio: number; // Cash ratio
      operatingCashFlow: number; // Operating cash flow
      freeCashFlow: number; // Free cash flow
      cashFlowMargin: number; // Cash flow margin
    };
    solvency: {
      debtToEquity: number; // Debt-to-equity ratio
      debtToAssets: number; // Debt-to-assets ratio
      interestCoverage: number; // Interest coverage ratio
      debtServiceCoverage: number; // Debt service coverage ratio
      totalDebt: number; // Total debt
      totalAssets: number; // Total assets
      totalEquity: number; // Total equity
    };
  };
  
  // Operational metrics
  operationalMetrics: {
    customerMetrics: {
      customerCount: number; // Total customer count
      customerGrowth: number; // Customer growth rate
      customerAcquisitionCost: number; // Customer acquisition cost
      customerLifetimeValue: number; // Customer lifetime value
      churnRate: number; // Customer churn rate
      retentionRate: number; // Customer retention rate
      netPromoterScore: number; // Net Promoter Score
      customerSatisfaction: number; // Customer satisfaction score
    };
    employeeMetrics: {
      employeeCount: number; // Total employee count
      employeeGrowth: number; // Employee growth rate
      revenuePerEmployee: number; // Revenue per employee
      profitPerEmployee: number; // Profit per employee
      employeeTurnover: number; // Employee turnover rate
      employeeSatisfaction: number; // Employee satisfaction score
      trainingHours: number; // Training hours per employee
      productivityScore: number; // Productivity score
    };
    productMetrics: {
      productCount: number; // Number of products/services
      productQuality: number; // Product quality score
      timeToMarket: number; // Time to market in months
      productSuccessRate: number; // Product success rate
      innovationIndex: number; // Innovation index
      patentCount: number; // Number of patents
      rndInvestment: number; // R&D investment
      rndPercentage: number; // R&D as percentage of revenue
    };
    processMetrics: {
      cycleTime: number; // Process cycle time
      defectRate: number; // Defect rate
      onTimeDelivery: number; // On-time delivery percentage
      processEfficiency: number; // Process efficiency score
      automationLevel: number; // Automation level percentage
      digitalTransformation: number; // Digital transformation score
    };
  };
  
  // Market metrics
  marketMetrics: {
    marketShare: {
      totalMarketSize: number; // Total addressable market size
      marketShare: number; // Market share percentage
      marketShareRank: number; // Market share ranking
      marketGrowth: number; // Market growth rate
      marketPosition: string; // Market position
    };
    competitiveMetrics: {
      competitorCount: number; // Number of competitors
      competitiveIntensity: number; // Competitive intensity score
      competitiveAdvantage: string[]; // Competitive advantages
      competitiveDisadvantage: string[]; // Competitive disadvantages
      pricingPower: number; // Pricing power score
      brandValue: number; // Brand value
      brandRecognition: number; // Brand recognition percentage
    };
    growthMetrics: {
      organicGrowth: number; // Organic growth rate
      inorganicGrowth: number; // Inorganic growth rate
      marketExpansion: number; // Market expansion rate
      productExpansion: number; // Product expansion rate
      geographicExpansion: number; // Geographic expansion rate
      acquisitionGrowth: number; // Growth from acquisitions
    };
  };
  
  // Technology metrics
  technologyMetrics: {
    digitalMetrics: {
      digitalMaturity: number; // Digital maturity score
      technologyInvestment: number; // Technology investment
      technologyROI: number; // Technology ROI
      cloudAdoption: number; // Cloud adoption percentage
      automationLevel: number; // Automation level
      dataAnalytics: number; // Data analytics maturity
      cybersecurity: number; // Cybersecurity score
      innovationIndex: number; // Innovation index
    };
    performanceMetrics: {
      systemUptime: number; // System uptime percentage
      responseTime: number; // Average response time
      scalabilityScore: number; // Scalability score
      integrationLevel: number; // Integration level
      dataQuality: number; // Data quality score
      userExperience: number; // User experience score
    };
  };
  
  // Sustainability metrics
  sustainabilityMetrics: {
    environmentalMetrics: {
      carbonFootprint: number; // Carbon footprint
      energyEfficiency: number; // Energy efficiency score
      wasteReduction: number; // Waste reduction percentage
      renewableEnergy: number; // Renewable energy usage
      waterConservation: number; // Water conservation score
      environmentalCompliance: number; // Environmental compliance score
    };
    socialMetrics: {
      diversityScore: number; // Diversity score
      inclusionIndex: number; // Inclusion index
      communityInvestment: number; // Community investment
      employeeWellness: number; // Employee wellness score
      socialImpact: number; // Social impact score
      ethicalPractices: number; // Ethical practices score
    };
    governanceMetrics: {
      boardDiversity: number; // Board diversity percentage
      transparencyScore: number; // Transparency score
      complianceScore: number; // Compliance score
      riskManagement: number; // Risk management score
      stakeholderEngagement: number; // Stakeholder engagement score
    };
  };
  
  // Benchmarking parameters
  benchmarkingParameters: {
    benchmarkScope: {
      industry: string; // Target industry
      subIndustry: string; // Target sub-industry
      companySize: string[]; // Target company sizes
      geographicRegion: string[]; // Target geographic regions
      timePeriod: {
        startDate: Date; // Analysis start date
        endDate: Date; // Analysis end date
      };
    };
    comparisonMetrics: {
      financialMetrics: boolean; // Include financial metrics
      operationalMetrics: boolean; // Include operational metrics
      marketMetrics: boolean; // Include market metrics
      technologyMetrics: boolean; // Include technology metrics
      sustainabilityMetrics: boolean; // Include sustainability metrics
    };
    benchmarkType: 'competitive' | 'industry' | 'best-in-class' | 'peer' | 'historical' | 'custom';
    dataSource: 'public' | 'private' | 'industry-reports' | 'consulting-firms' | 'government' | 'custom';
    confidenceLevel: number; // Confidence level for analysis
  };
  
  // Competitor information
  competitors: {
    competitorId: string; // Competitor identifier
    competitorName: string; // Competitor name
    industry: string; // Competitor industry
    companySize: string; // Competitor size
    marketShare: number; // Competitor market share
    revenue: number; // Competitor revenue
    employeeCount: number; // Competitor employee count
    geographicPresence: string[]; // Geographic presence
    businessModel: string; // Business model
    competitivePosition: string; // Competitive position
    strengths: string[]; // Competitor strengths
    weaknesses: string[]; // Competitor weaknesses
    opportunities: string[]; // Competitor opportunities
    threats: string[]; // Competitor threats
  }[];
  
  // Industry data
  industryData: {
    industryName: string; // Industry name
    industrySize: number; // Industry size
    industryGrowth: number; // Industry growth rate
    keyDrivers: string[]; // Key industry drivers
    challenges: string[]; // Industry challenges
    trends: string[]; // Industry trends
    regulations: string[]; // Industry regulations
    technologyTrends: string[]; // Technology trends
    marketStructure: string; // Market structure
    entryBarriers: string[]; // Entry barriers
    exitBarriers: string[]; // Exit barriers
  };
  
  // Performance targets
  performanceTargets: {
    financialTargets: {
      revenueGrowth: number; // Target revenue growth
      profitMargin: number; // Target profit margin
      returnOnEquity: number; // Target ROE
      returnOnAssets: number; // Target ROA
      debtToEquity: number; // Target debt-to-equity
    };
    operationalTargets: {
      customerSatisfaction: number; // Target customer satisfaction
      employeeSatisfaction: number; // Target employee satisfaction
      processEfficiency: number; // Target process efficiency
      qualityScore: number; // Target quality score
    };
    marketTargets: {
      marketShare: number; // Target market share
      brandRecognition: number; // Target brand recognition
      customerRetention: number; // Target customer retention
    };
  };
  
  // Analysis parameters
  analysisParameters: {
    weightingFactors: {
      financialWeight: number; // Financial metrics weight
      operationalWeight: number; // Operational metrics weight
      marketWeight: number; // Market metrics weight
      technologyWeight: number; // Technology metrics weight
      sustainabilityWeight: number; // Sustainability metrics weight
    };
    normalizationMethod: 'z-score' | 'min-max' | 'percentile' | 'custom';
    outlierHandling: 'remove' | 'cap' | 'transform' | 'ignore';
    significanceLevel: number; // Significance level for testing
    minimumSampleSize: number; // Minimum sample size
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedAnalysis: boolean; // Include detailed analysis
    includeGapAnalysis: boolean; // Include gap analysis
    includeTrendAnalysis: boolean; // Include trend analysis
    includeRecommendations: boolean; // Include recommendations
    includeActionPlan: boolean; // Include action plan
    includeVisualizations: boolean; // Include visualizations
    includeExecutiveSummary: boolean; // Include executive summary
  };
}

export interface IndustryBenchmarkingResults {
  // Overall benchmarking score
  overallScore: {
    score: number; // Overall benchmarking score
    percentile: number; // Percentile rank
    grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';
    performance: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
    trend: 'improving' | 'declining' | 'stable';
  };
  
  // Category benchmarking scores
  categoryScores: {
    financial: {
      score: number; // Financial score
      percentile: number; // Financial percentile
      grade: string; // Financial grade
      performance: string; // Financial performance
      keyMetrics: {
        metric: string; // Metric name
        companyValue: number; // Company value
        benchmarkValue: number; // Benchmark value
        difference: number; // Difference from benchmark
        percentile: number; // Metric percentile
      }[];
    };
    operational: {
      score: number; // Operational score
      percentile: number; // Operational percentile
      grade: string; // Operational grade
      performance: string; // Operational performance
      keyMetrics: {
        metric: string; // Metric name
        companyValue: number; // Company value
        benchmarkValue: number; // Benchmark value
        difference: number; // Difference from benchmark
        percentile: number; // Metric percentile
      }[];
    };
    market: {
      score: number; // Market score
      percentile: number; // Market percentile
      grade: string; // Market grade
      performance: string; // Market performance
      keyMetrics: {
        metric: string; // Metric name
        companyValue: number; // Company value
        benchmarkValue: number; // Benchmark value
        difference: number; // Difference from benchmark
        percentile: number; // Metric percentile
      }[];
    };
    technology: {
      score: number; // Technology score
      percentile: number; // Technology percentile
      grade: string; // Technology grade
      performance: string; // Technology performance
      keyMetrics: {
        metric: string; // Metric name
        companyValue: number; // Company value
        benchmarkValue: number; // Benchmark value
        difference: number; // Difference from benchmark
        percentile: number; // Metric percentile
      }[];
    };
    sustainability: {
      score: number; // Sustainability score
      percentile: number; // Sustainability percentile
      grade: string; // Sustainability grade
      performance: string; // Sustainability performance
      keyMetrics: {
        metric: string; // Metric name
        companyValue: number; // Company value
        benchmarkValue: number; // Benchmark value
        difference: number; // Difference from benchmark
        percentile: number; // Metric percentile
      }[];
    };
  };
  
  // Detailed metric analysis
  metricAnalysis: {
    financialMetrics: {
      revenue: {
        companyValue: number; // Company revenue
        benchmarkValue: number; // Benchmark revenue
        difference: number; // Revenue difference
        percentile: number; // Revenue percentile
        performance: string; // Revenue performance
        trend: string; // Revenue trend
      };
      profitability: {
        companyValue: number; // Company profitability
        benchmarkValue: number; // Benchmark profitability
        difference: number; // Profitability difference
        percentile: number; // Profitability percentile
        performance: string; // Profitability performance
        trend: string; // Profitability trend
      };
      efficiency: {
        companyValue: number; // Company efficiency
        benchmarkValue: number; // Benchmark efficiency
        difference: number; // Efficiency difference
        percentile: number; // Efficiency percentile
        performance: string; // Efficiency performance
        trend: string; // Efficiency trend
      };
      liquidity: {
        companyValue: number; // Company liquidity
        benchmarkValue: number; // Benchmark liquidity
        difference: number; // Liquidity difference
        percentile: number; // Liquidity percentile
        performance: string; // Liquidity performance
        trend: string; // Liquidity trend
      };
      solvency: {
        companyValue: number; // Company solvency
        benchmarkValue: number; // Benchmark solvency
        difference: number; // Solvency difference
        percentile: number; // Solvency percentile
        performance: string; // Solvency performance
        trend: string; // Solvency trend
      };
    };
    operationalMetrics: {
      customerMetrics: {
        companyValue: number; // Company customer metrics
        benchmarkValue: number; // Benchmark customer metrics
        difference: number; // Customer metrics difference
        percentile: number; // Customer metrics percentile
        performance: string; // Customer metrics performance
        trend: string; // Customer metrics trend
      };
      employeeMetrics: {
        companyValue: number; // Company employee metrics
        benchmarkValue: number; // Benchmark employee metrics
        difference: number; // Employee metrics difference
        percentile: number; // Employee metrics percentile
        performance: string; // Employee metrics performance
        trend: string; // Employee metrics trend
      };
      productMetrics: {
        companyValue: number; // Company product metrics
        benchmarkValue: number; // Benchmark product metrics
        difference: number; // Product metrics difference
        percentile: number; // Product metrics percentile
        performance: string; // Product metrics performance
        trend: string; // Product metrics trend
      };
      processMetrics: {
        companyValue: number; // Company process metrics
        benchmarkValue: number; // Benchmark process metrics
        difference: number; // Process metrics difference
        percentile: number; // Process metrics percentile
        performance: string; // Process metrics performance
        trend: string; // Process metrics trend
      };
    };
  };
  
  // Competitive analysis
  competitiveAnalysis: {
    competitivePosition: {
      position: string; // Competitive position
      marketShare: number; // Market share
      marketShareRank: number; // Market share ranking
      competitiveAdvantages: string[]; // Competitive advantages
      competitiveDisadvantages: string[]; // Competitive disadvantages
      competitiveGaps: string[]; // Competitive gaps
    };
    competitorComparison: {
      competitors: {
        competitor: string; // Competitor name
        overallScore: number; // Competitor overall score
        financialScore: number; // Competitor financial score
        operationalScore: number; // Competitor operational score
        marketScore: number; // Competitor market score
        technologyScore: number; // Competitor technology score
        sustainabilityScore: number; // Competitor sustainability score
        relativePosition: string; // Relative position
      }[];
      competitiveInsights: string[]; // Competitive insights
    };
  };
  
  // Gap analysis
  gapAnalysis: {
    performanceGaps: {
      category: string; // Performance category
      currentScore: number; // Current score
      targetScore: number; // Target score
      gap: number; // Performance gap
      priority: 'high' | 'medium' | 'low';
      impact: number; // Gap impact
    }[];
    improvementOpportunities: {
      opportunity: string; // Improvement opportunity
      category: string; // Opportunity category
      currentValue: number; // Current value
      targetValue: number; // Target value
      improvement: number; // Improvement potential
      effort: 'low' | 'medium' | 'high';
      timeline: string; // Implementation timeline
      priority: 'high' | 'medium' | 'low';
    }[];
    bestPractices: {
      practice: string; // Best practice
      category: string; // Practice category
      description: string; // Practice description
      implementation: string; // Implementation approach
      expectedImpact: number; // Expected impact
      effort: 'low' | 'medium' | 'high';
    }[];
  };
  
  // Trend analysis
  trendAnalysis: {
    historicalTrends: {
      period: Date; // Analysis period
      overallScore: number; // Overall score
      financialScore: number; // Financial score
      operationalScore: number; // Operational score
      marketScore: number; // Market score
      technologyScore: number; // Technology score
      sustainabilityScore: number; // Sustainability score
      trend: string; // Score trend
    }[];
    futureProjections: {
      period: Date; // Projection period
      projectedScore: number; // Projected score
      confidence: number; // Projection confidence
      factors: string[]; // Influencing factors
    }[];
    industryTrends: {
      trend: string; // Industry trend
      impact: 'positive' | 'negative' | 'neutral';
      description: string; // Trend description
      implications: string[]; // Trend implications
    }[];
  };
  
  // Benchmarking insights
  benchmarkingInsights: {
    strengths: {
      strength: string; // Company strength
      category: string; // Strength category
      impact: number; // Strength impact
      sustainability: string; // Strength sustainability
    }[];
    weaknesses: {
      weakness: string; // Company weakness
      category: string; // Weakness category
      impact: number; // Weakness impact
      urgency: 'high' | 'medium' | 'low';
    }[];
    opportunities: {
      opportunity: string; // Market opportunity
      category: string; // Opportunity category
      potential: number; // Opportunity potential
      feasibility: 'high' | 'medium' | 'low';
    }[];
    threats: {
      threat: string; // Market threat
      category: string; // Threat category
      probability: number; // Threat probability
      impact: number; // Threat impact
    }[];
  };
  
  // Recommendations
  recommendations: {
    strategicRecommendations: {
      recommendation: string; // Strategic recommendation
      category: string; // Recommendation category
      priority: 'high' | 'medium' | 'low';
      impact: number; // Expected impact
      effort: 'low' | 'medium' | 'high';
      timeline: string; // Implementation timeline
      resources: string[]; // Required resources
    }[];
    operationalRecommendations: {
      recommendation: string; // Operational recommendation
      category: string; // Recommendation category
      priority: 'high' | 'medium' | 'low';
      impact: number; // Expected impact
      effort: 'low' | 'medium' | 'high';
      timeline: string; // Implementation timeline
      resources: string[]; // Required resources
    }[];
    quickWins: {
      win: string; // Quick win
      category: string; // Win category
      impact: number; // Expected impact
      effort: 'low' | 'medium' | 'high';
      timeline: string; // Implementation timeline
    }[];
  };
  
  // Action plan
  actionPlan: {
    immediateActions: {
      action: string; // Immediate action
      owner: string; // Action owner
      timeline: string; // Action timeline
      expectedOutcome: string; // Expected outcome
      successMetrics: string[]; // Success metrics
    }[];
    shortTermActions: {
      action: string; // Short-term action
      owner: string; // Action owner
      timeline: string; // Action timeline
      expectedOutcome: string; // Expected outcome
      successMetrics: string[]; // Success metrics
    }[];
    longTermActions: {
      action: string; // Long-term action
      owner: string; // Action owner
      timeline: string; // Action timeline
      expectedOutcome: string; // Expected outcome
      successMetrics: string[]; // Success metrics
    }[];
  };
  
  // Comprehensive report
  report: string;
  
  // Executive summary
  executiveSummary: {
    overallPerformance: string; // Overall performance summary
    keyStrengths: string[]; // Key strengths
    keyWeaknesses: string[]; // Key weaknesses
    criticalGaps: string[]; // Critical gaps
    topPriorities: string[]; // Top priorities
    expectedOutcomes: string[]; // Expected outcomes
  };
}
