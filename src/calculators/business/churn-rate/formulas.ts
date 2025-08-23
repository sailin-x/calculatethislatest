import { ChurnRateInputs, ChurnRateResults } from './types';

export class ChurnRateFormulas {
  // Basic churn rate calculation
  static calculateCustomerChurnRate(
    churnedCustomers: number,
    totalCustomersStart: number
  ): number {
    return totalCustomersStart > 0 ? (churnedCustomers / totalCustomersStart) * 100 : 0;
  }

  // Revenue churn rate calculation
  static calculateRevenueChurnRate(
    churnedRevenue: number,
    monthlyRecurringRevenueStart: number
  ): number {
    return monthlyRecurringRevenueStart > 0 ? (churnedRevenue / monthlyRecurringRevenueStart) * 100 : 0;
  }

  // Net revenue retention
  static calculateNetRevenueRetention(
    monthlyRecurringRevenueEnd: number,
    monthlyRecurringRevenueStart: number,
    churnedRevenue: number
  ): number {
    const netRevenue = monthlyRecurringRevenueEnd + churnedRevenue;
    return monthlyRecurringRevenueStart > 0 ? (netRevenue / monthlyRecurringRevenueStart) * 100 : 0;
  }

  // Gross revenue retention
  static calculateGrossRevenueRetention(
    monthlyRecurringRevenueEnd: number,
    monthlyRecurringRevenueStart: number
  ): number {
    return monthlyRecurringRevenueStart > 0 ? (monthlyRecurringRevenueEnd / monthlyRecurringRevenueStart) * 100 : 0;
  }

  // Segment churn analysis
  static analyzeSegmentChurn(
    segments: ChurnRateInputs['customerSegments']
  ): ChurnRateResults['segmentChurnRates'] {
    if (!segments || segments.length === 0) {
      return [];
    }

    return segments.map(segment => {
      const churnRate = segment.customersStart > 0 ? 
        (segment.churnedCustomers / segment.customersStart) * 100 : 0;
      
      const revenueChurnRate = segment.segmentValue > 0 ? 
        (segment.churnedCustomers * segment.segmentValue / segment.segmentValue) * 100 : 0;
      
      let riskLevel: 'low' | 'medium' | 'high';
      if (churnRate < 5) riskLevel = 'low';
      else if (churnRate < 15) riskLevel = 'medium';
      else riskLevel = 'high';

      return {
        segment: segment.segment,
        churnRate: Math.round(churnRate * 100) / 100,
        revenueChurnRate: Math.round(revenueChurnRate * 100) / 100,
        customers: segment.customersEnd,
        segmentValue: segment.segmentValue,
        riskLevel
      };
    });
  }

  // Cohort analysis
  static analyzeCohorts(
    cohortData: ChurnRateInputs['cohortData']
  ): ChurnRateResults['cohortAnalysis'] {
    if (!cohortData || cohortData.length === 0) {
      return [];
    }

    return cohortData.map(cohort => {
      const retentionRate = 100 - cohort.churnRate;
      const lifetimeValue = cohort.retainedCustomers * (cohort.initialCustomers > 0 ? 
        cohort.initialCustomers / cohort.retainedCustomers : 0);

      return {
        cohort: cohort.cohort,
        startDate: cohort.startDate,
        initialCustomers: cohort.initialCustomers,
        churnedCustomers: cohort.churnedCustomers,
        retainedCustomers: cohort.retainedCustomers,
        churnRate: cohort.churnRate,
        retentionRate: Math.round(retentionRate * 100) / 100,
        lifetimeValue: Math.round(lifetimeValue)
      };
    });
  }

  // Churn types analysis
  static analyzeChurnTypes(
    voluntaryChurn: number,
    involuntaryChurn: number,
    totalChurned: number
  ): ChurnRateResults['churnTypes'] {
    const voluntaryPercentage = totalChurned > 0 ? (voluntaryChurn / totalChurned) * 100 : 0;
    const involuntaryPercentage = totalChurned > 0 ? (involuntaryChurn / totalChurned) * 100 : 0;

    return [
      {
        type: 'Voluntary Churn',
        customers: voluntaryChurn,
        percentage: Math.round(voluntaryPercentage * 100) / 100,
        revenue: voluntaryChurn * 100, // Estimate average revenue per customer
        reasons: [
          'Poor product fit',
          'Better competitor offering',
          'Price sensitivity',
          'Lack of value realization',
          'Poor customer experience'
        ]
      },
      {
        type: 'Involuntary Churn',
        customers: involuntaryChurn,
        percentage: Math.round(involuntaryPercentage * 100) / 100,
        revenue: involuntaryChurn * 100, // Estimate average revenue per customer
        reasons: [
          'Payment failures',
          'Billing issues',
          'Account suspension',
          'Technical problems',
          'Service cancellation'
        ]
      }
    ];
  }

  // Predictive churn analysis
  static predictChurn(
    inputs: ChurnRateInputs
  ): ChurnRateResults['churnPrediction'] {
    const predictions: ChurnRateResults['churnPrediction'] = [];

    // High churn risk customers
    if (inputs.customerSatisfactionScore && inputs.customerSatisfactionScore < 6) {
      predictions.push({
        riskScore: 85,
        probability: 0.85,
        factors: ['Low customer satisfaction', 'Poor product experience'],
        recommendations: [
          'Improve customer support',
          'Enhance product features',
          'Implement customer success programs'
        ]
      });
    }

    // Low usage customers
    if (inputs.usageFrequency < 2) {
      predictions.push({
        riskScore: 70,
        probability: 0.70,
        factors: ['Low usage frequency', 'Poor engagement'],
        recommendations: [
          'Improve onboarding process',
          'Increase feature adoption',
          'Implement usage reminders'
        ]
      });
    }

    // High support ticket customers
    if (inputs.supportTickets > 5) {
      predictions.push({
        riskScore: 75,
        probability: 0.75,
        factors: ['High support needs', 'Product issues'],
        recommendations: [
          'Improve product quality',
          'Enhance self-service options',
          'Proactive issue resolution'
        ]
      });
    }

    // Payment failure customers
    if (inputs.paymentFailures > 2) {
      predictions.push({
        riskScore: 90,
        probability: 0.90,
        factors: ['Payment issues', 'Billing problems'],
        recommendations: [
          'Improve billing process',
          'Implement payment reminders',
          'Offer flexible payment options'
        ]
      });
    }

    return predictions;
  }

  // Industry benchmarking
  static getIndustryBenchmarks(
    industry: ChurnRateInputs['industry'],
    customerChurnRate: number,
    revenueChurnRate: number,
    netRevenueRetention: number
  ): ChurnRateResults['industryBenchmarks'] {
    const benchmarks: Record<string, { churn: number; revenueChurn: number; netRetention: number }> = {
      ecommerce: { churn: 8, revenueChurn: 6, netRetention: 95 },
      saas: { churn: 5, revenueChurn: 4, netRetention: 110 },
      subscription: { churn: 7, revenueChurn: 5, netRetention: 105 },
      retail: { churn: 12, revenueChurn: 10, netRetention: 90 },
      b2b: { churn: 3, revenueChurn: 2, netRetention: 115 },
      marketplace: { churn: 10, revenueChurn: 8, netRetention: 100 }
    };

    const benchmark = benchmarks[industry || 'ecommerce'];
    
    const getPercentile = (value: number, average: number, excellent: number, poor: number): number => {
      if (value <= excellent) return 90;
      if (value <= average) return 50 + ((average - value) / (average - excellent)) * 40;
      if (value <= poor) return 10 + ((poor - value) / (poor - average)) * 40;
      return 10;
    };

    const getPerformance = (percentile: number): 'excellent' | 'good' | 'average' | 'below_average' | 'poor' => {
      if (percentile >= 80) return 'excellent';
      if (percentile >= 60) return 'good';
      if (percentile >= 40) return 'average';
      if (percentile >= 20) return 'below_average';
      return 'poor';
    };

    return [
      {
        metric: 'Customer Churn Rate',
        yourValue: customerChurnRate,
        industryAverage: benchmark.churn,
        percentile: getPercentile(customerChurnRate, benchmark.churn, benchmark.churn * 0.6, benchmark.churn * 1.8),
        performance: getPerformance(getPercentile(customerChurnRate, benchmark.churn, benchmark.churn * 0.6, benchmark.churn * 1.8))
      },
      {
        metric: 'Revenue Churn Rate',
        yourValue: revenueChurnRate,
        industryAverage: benchmark.revenueChurn,
        percentile: getPercentile(revenueChurnRate, benchmark.revenueChurn, benchmark.revenueChurn * 0.6, benchmark.revenueChurn * 1.8),
        performance: getPerformance(getPercentile(revenueChurnRate, benchmark.revenueChurn, benchmark.revenueChurn * 0.6, benchmark.revenueChurn * 1.8))
      },
      {
        metric: 'Net Revenue Retention',
        yourValue: netRevenueRetention,
        industryAverage: benchmark.netRetention,
        percentile: getPercentile(netRevenueRetention, benchmark.netRetention, benchmark.netRetention * 1.1, benchmark.netRetention * 0.8),
        performance: getPerformance(getPercentile(netRevenueRetention, benchmark.netRetention, benchmark.netRetention * 1.1, benchmark.netRetention * 0.8))
      }
    ];
  }

  // Risk assessment
  static assessRisk(
    inputs: ChurnRateInputs,
    customerChurnRate: number
  ): ChurnRateResults['riskAssessment'] {
    const riskFactors: string[] = [];
    const highRiskSegments: string[] = [];
    const mitigationStrategies: string[] = [];

    // High churn risk
    if (customerChurnRate > 10) {
      riskFactors.push('High customer churn rate');
      mitigationStrategies.push('Implement comprehensive retention strategies');
    }

    // Low customer satisfaction
    if (inputs.customerSatisfactionScore && inputs.customerSatisfactionScore < 6) {
      riskFactors.push('Low customer satisfaction');
      mitigationStrategies.push('Improve product quality and customer support');
    }

    // High support tickets
    if (inputs.supportTickets > 10) {
      riskFactors.push('High support ticket volume');
      mitigationStrategies.push('Enhance product usability and self-service options');
    }

    // Payment failures
    if (inputs.paymentFailures > 5) {
      riskFactors.push('High payment failure rate');
      mitigationStrategies.push('Improve billing process and payment options');
    }

    // Low usage
    if (inputs.usageFrequency < 1) {
      riskFactors.push('Low product usage');
      mitigationStrategies.push('Improve onboarding and feature adoption');
    }

    // Competitive pressure
    if (inputs.competitivePressure > 7) {
      riskFactors.push('High competitive pressure');
      mitigationStrategies.push('Differentiate product and improve value proposition');
    }

    const riskLevel = riskFactors.length >= 4 ? 'high' : riskFactors.length >= 2 ? 'medium' : 'low';

    return {
      riskLevel,
      riskFactors,
      highRiskSegments,
      mitigationStrategies
    };
  }

  // Retention analysis
  static analyzeRetention(
    inputs: ChurnRateInputs,
    customerChurnRate: number
  ): ChurnRateResults['retentionAnalysis'] {
    const retentionRate = 100 - customerChurnRate;
    const averageLifespan = inputs.averageCustomerLifespan || 12;
    const lifetimeValue = inputs.averageRevenuePerUser * averageLifespan;
    const retentionCost = inputs.retentionSpend;
    const retentionROI = retentionCost > 0 ? (lifetimeValue - retentionCost) / retentionCost * 100 : 0;

    return {
      retentionRate: Math.round(retentionRate * 100) / 100,
      averageLifespan: Math.round(averageLifespan * 100) / 100,
      lifetimeValue: Math.round(lifetimeValue),
      retentionCost: Math.round(retentionCost),
      retentionROI: Math.round(retentionROI * 100) / 100
    };
  }

  // Revenue impact analysis
  static analyzeRevenueImpact(
    inputs: ChurnRateInputs,
    customerChurnRate: number
  ): ChurnRateResults['revenueImpact'] {
    const lostRevenue = inputs.churnedRevenue;
    const potentialRevenue = inputs.monthlyRecurringRevenueStart * (customerChurnRate / 100);
    const recoveryRevenue = inputs.reactivationRate > 0 ? 
      inputs.churnedRevenue * (inputs.reactivationRate / 100) : 0;
    const netImpact = lostRevenue - recoveryRevenue;

    return {
      lostRevenue: Math.round(lostRevenue),
      potentialRevenue: Math.round(potentialRevenue),
      recoveryRevenue: Math.round(recoveryRevenue),
      netImpact: Math.round(netImpact)
    };
  }

  // Customer health scoring
  static calculateCustomerHealthScores(
    inputs: ChurnRateInputs
  ): ChurnRateResults['customerHealthScores'] {
    const segments = inputs.customerSegments || [];
    
    return segments.map(segment => {
      let healthScore = 100;
      const riskFactors: string[] = [];
      const recommendations: string[] = [];

      // Usage-based scoring
      if (inputs.usageFrequency < 2) {
        healthScore -= 20;
        riskFactors.push('Low usage frequency');
        recommendations.push('Improve onboarding and feature adoption');
      }

      // Support-based scoring
      if (inputs.supportTickets > 5) {
        healthScore -= 15;
        riskFactors.push('High support needs');
        recommendations.push('Enhance product quality and self-service');
      }

      // Satisfaction-based scoring
      if (inputs.customerSatisfactionScore && inputs.customerSatisfactionScore < 7) {
        healthScore -= 25;
        riskFactors.push('Low satisfaction');
        recommendations.push('Improve customer experience and support');
      }

      // Payment-based scoring
      if (inputs.paymentFailures > 2) {
        healthScore -= 30;
        riskFactors.push('Payment issues');
        recommendations.push('Improve billing process and payment options');
      }

      healthScore = Math.max(0, healthScore);

      let engagementLevel: 'high' | 'medium' | 'low';
      if (healthScore >= 80) engagementLevel = 'high';
      else if (healthScore >= 50) engagementLevel = 'medium';
      else engagementLevel = 'low';

      return {
        segment: segment.segment,
        healthScore: Math.round(healthScore),
        riskFactors,
        engagementLevel,
        recommendations
      };
    });
  }

  // Optimization opportunities
  static identifyOptimizationOpportunities(
    inputs: ChurnRateInputs,
    customerChurnRate: number
  ): ChurnRateResults['optimizationOpportunities'] {
    const opportunities: ChurnRateResults['optimizationOpportunities'] = [];

    // High churn rate optimization
    if (customerChurnRate > 10) {
      opportunities.push({
        area: 'Churn Rate Reduction',
        currentValue: customerChurnRate,
        potentialValue: customerChurnRate * 0.6,
        improvement: customerChurnRate * 0.4,
        priority: 'high',
        recommendations: [
          'Implement customer success programs',
          'Improve onboarding process',
          'Enhance product quality',
          'Optimize pricing strategy'
        ]
      });
    }

    // Low satisfaction optimization
    if (inputs.customerSatisfactionScore && inputs.customerSatisfactionScore < 7) {
      opportunities.push({
        area: 'Customer Satisfaction',
        currentValue: inputs.customerSatisfactionScore,
        potentialValue: inputs.customerSatisfactionScore + 2,
        improvement: 2,
        priority: 'high',
        recommendations: [
          'Improve customer support',
          'Enhance product features',
          'Implement feedback loops',
          'Create customer success programs'
        ]
      });
    }

    // Low usage optimization
    if (inputs.usageFrequency < 2) {
      opportunities.push({
        area: 'Product Usage',
        currentValue: inputs.usageFrequency,
        potentialValue: inputs.usageFrequency * 2,
        improvement: inputs.usageFrequency,
        priority: 'medium',
        recommendations: [
          'Improve onboarding',
          'Increase feature adoption',
          'Implement usage reminders',
          'Create engagement campaigns'
        ]
      });
    }

    // Support optimization
    if (inputs.supportTickets > 5) {
      opportunities.push({
        area: 'Support Optimization',
        currentValue: inputs.supportTickets,
        potentialValue: inputs.supportTickets * 0.5,
        improvement: inputs.supportTickets * 0.5,
        priority: 'medium',
        recommendations: [
          'Improve product quality',
          'Enhance self-service options',
          'Implement proactive support',
          'Optimize support processes'
        ]
      });
    }

    return opportunities;
  }

  // Generate comprehensive report
  static generateReport(
    inputs: ChurnRateInputs,
    results: ChurnRateResults
  ): string {
    return `# Churn Rate Analysis Report

## Executive Summary
Your churn rate analysis reveals a customer churn rate of ${results.customerChurnRate.toFixed(1)}% with a revenue churn rate of ${results.revenueChurnRate.toFixed(1)}%. Your net revenue retention is ${results.netRevenueRetention.toFixed(1)}%, indicating ${results.netRevenueRetention >= 100 ? 'positive' : 'negative'} revenue growth.

## Key Metrics
- **Customer Churn Rate**: ${results.customerChurnRate.toFixed(1)}%
- **Revenue Churn Rate**: ${results.revenueChurnRate.toFixed(1)}%
- **Net Revenue Retention**: ${results.netRevenueRetention.toFixed(1)}%
- **Gross Revenue Retention**: ${results.grossRevenueRetention.toFixed(1)}%
- **Retention Rate**: ${results.retentionAnalysis.retentionRate.toFixed(1)}%

## Segment Analysis
${results.segmentChurnRates.map(segment => `- **${segment.segment}**: ${segment.churnRate.toFixed(1)}% churn rate - ${segment.riskLevel} risk`).join('\n')}

## Churn Types
${results.churnTypes.map(type => `- **${type.type}**: ${type.customers} customers (${type.percentage.toFixed(1)}%) - $${type.revenue.toLocaleString()} revenue impact`).join('\n')}

## Industry Comparison
${results.industryBenchmarks.map(bench => `- **${bench.metric}**: ${bench.yourValue.toFixed(1)}% (${bench.performance} - ${bench.percentile}th percentile)`).join('\n')}

## Risk Assessment
- **Risk Level**: ${results.riskAssessment.riskLevel}
- **Risk Factors**: ${results.riskAssessment.riskFactors.join(', ')}
- **Mitigation Strategies**: ${results.riskAssessment.mitigationStrategies.join(', ')}

## Revenue Impact
- **Lost Revenue**: $${results.revenueImpact.lostRevenue.toLocaleString()}
- **Potential Revenue**: $${results.revenueImpact.potentialRevenue.toLocaleString()}
- **Recovery Revenue**: $${results.revenueImpact.recoveryRevenue.toLocaleString()}
- **Net Impact**: $${results.revenueImpact.netImpact.toLocaleString()}

## Optimization Opportunities
${results.optimizationOpportunities.map(opp => `### ${opp.area}
- **Current**: ${opp.currentValue.toFixed(1)}
- **Potential**: ${opp.potentialValue.toFixed(1)}
- **Improvement**: ${opp.improvement.toFixed(1)}
- **Priority**: ${opp.priority}
- **Recommendations**: ${opp.recommendations.join(', ')}`).join('\n\n')}

## Customer Health Scores
${results.customerHealthScores.map(health => `- **${health.segment}**: ${health.healthScore}% health score - ${health.engagementLevel} engagement`).join('\n')}

## Strategic Recommendations
${results.strategyRecommendations.map(rec => `### ${rec.category}
${rec.recommendations.map(r => `- ${r}`).join('\n')}
**Expected Impact**: ${rec.expectedImpact.toFixed(1)}% improvement
**Implementation Time**: ${rec.implementationTime}`).join('\n\n')}

## Performance Metrics
- **Customer Lifetime Value**: $${results.performanceMetrics.customerLifetimeValue.toLocaleString()}
- **Customer Acquisition Cost**: $${results.performanceMetrics.customerAcquisitionCost.toLocaleString()}
- **LTV/CAC Ratio**: ${results.performanceMetrics.ltvCacRatio.toFixed(2)}
- **Payback Period**: ${results.performanceMetrics.paybackPeriod.toFixed(1)} months
- **Retention ROI**: ${results.performanceMetrics.retentionROI.toFixed(1)}%

This analysis provides a comprehensive view of your churn patterns and identifies key opportunities for improvement and growth.`;
  }

  // Generate strategy recommendations
  static generateStrategyRecommendations(
    inputs: ChurnRateInputs,
    results: Partial<ChurnRateResults>
  ): ChurnRateResults['strategyRecommendations'] {
    const recommendations: ChurnRateResults['strategyRecommendations'] = [];

    // High churn recommendations
    if (results.customerChurnRate && results.customerChurnRate > 10) {
      recommendations.push({
        category: 'Churn Reduction',
        recommendations: [
          'Implement comprehensive customer success programs',
          'Improve onboarding and time-to-value',
          'Enhance product quality and user experience',
          'Develop proactive retention strategies'
        ],
        priority: 'high',
        expectedImpact: 40,
        implementationTime: '3-6 months'
      });
    }

    // Low satisfaction recommendations
    if (inputs.customerSatisfactionScore && inputs.customerSatisfactionScore < 7) {
      recommendations.push({
        category: 'Customer Satisfaction',
        recommendations: [
          'Improve customer support quality',
          'Enhance product features and usability',
          'Implement customer feedback loops',
          'Create customer success programs'
        ],
        priority: 'high',
        expectedImpact: 30,
        implementationTime: '2-4 months'
      });
    }

    // Low usage recommendations
    if (inputs.usageFrequency < 2) {
      recommendations.push({
        category: 'Product Engagement',
        recommendations: [
          'Improve onboarding process',
          'Increase feature adoption',
          'Implement usage reminders',
          'Create engagement campaigns'
        ],
        priority: 'medium',
        expectedImpact: 25,
        implementationTime: '1-3 months'
      });
    }

    // Support optimization recommendations
    if (inputs.supportTickets > 5) {
      recommendations.push({
        category: 'Support Optimization',
        recommendations: [
          'Improve product quality and reduce bugs',
          'Enhance self-service options',
          'Implement proactive support',
          'Optimize support processes'
        ],
        priority: 'medium',
        expectedImpact: 20,
        implementationTime: '2-5 months'
      });
    }

    return recommendations;
  }
}

/**
 * Main Churn Rate calculator formula
 */
export function calculateChurnRate(
  inputs: ChurnRateInputs,
  allInputs?: Record<string, any>
): ChurnRateResults {
  // Basic churn calculations
  const customerChurnRate = ChurnRateFormulas.calculateCustomerChurnRate(
    inputs.churnedCustomers,
    inputs.totalCustomersStart
  );

  const revenueChurnRate = ChurnRateFormulas.calculateRevenueChurnRate(
    inputs.churnedRevenue,
    inputs.monthlyRecurringRevenueStart
  );

  const netRevenueRetention = ChurnRateFormulas.calculateNetRevenueRetention(
    inputs.monthlyRecurringRevenueEnd,
    inputs.monthlyRecurringRevenueStart,
    inputs.churnedRevenue
  );

  const grossRevenueRetention = ChurnRateFormulas.calculateGrossRevenueRetention(
    inputs.monthlyRecurringRevenueEnd,
    inputs.monthlyRecurringRevenueStart
  );

  // Segment analysis
  const segmentChurnRates = ChurnRateFormulas.analyzeSegmentChurn(inputs.customerSegments);

  // Cohort analysis
  const cohortAnalysis = ChurnRateFormulas.analyzeCohorts(inputs.cohortData);

  // Churn types analysis
  const churnTypes = ChurnRateFormulas.analyzeChurnTypes(
    inputs.voluntaryChurn,
    inputs.involuntaryChurn,
    inputs.churnedCustomers
  );

  // Predictive analytics
  const churnPrediction = ChurnRateFormulas.predictChurn(inputs);

  // Industry benchmarks
  const industryBenchmarks = ChurnRateFormulas.getIndustryBenchmarks(
    inputs.industry,
    customerChurnRate,
    revenueChurnRate,
    netRevenueRetention
  );

  // Risk assessment
  const riskAssessment = ChurnRateFormulas.assessRisk(inputs, customerChurnRate);

  // Retention analysis
  const retentionAnalysis = ChurnRateFormulas.analyzeRetention(inputs, customerChurnRate);

  // Revenue impact
  const revenueImpact = ChurnRateFormulas.analyzeRevenueImpact(inputs, customerChurnRate);

  // Customer health scores
  const customerHealthScores = ChurnRateFormulas.calculateCustomerHealthScores(inputs);

  // Optimization opportunities
  const optimizationOpportunities = ChurnRateFormulas.identifyOptimizationOpportunities(
    inputs,
    customerChurnRate
  );

  // Performance metrics
  const performanceMetrics = {
    customerLifetimeValue: inputs.averageRevenuePerUser * (inputs.averageCustomerLifespan || 12),
    customerAcquisitionCost: 200, // Estimate
    ltvCacRatio: (inputs.averageRevenuePerUser * (inputs.averageCustomerLifespan || 12)) / 200,
    paybackPeriod: 200 / (inputs.averageRevenuePerUser || 1),
    retentionROI: inputs.retentionSpend > 0 ? 
      ((inputs.averageRevenuePerUser * (inputs.averageCustomerLifespan || 12)) - inputs.retentionSpend) / inputs.retentionSpend * 100 : 0
  };

  // Generate comprehensive results
  const results: ChurnRateResults = {
    customerChurnRate,
    revenueChurnRate,
    netRevenueRetention,
    grossRevenueRetention,
    segmentChurnRates,
    cohortAnalysis,
    churnTypes,
    churnPrediction,
    industryBenchmarks,
    riskAssessment,
    retentionAnalysis,
    revenueImpact,
    customerHealthScores,
    optimizationOpportunities,
    trendAnalysis: [],
    forecasting: { projectedChurn: [], scenarios: [] },
    strategyRecommendations: [],
    performanceMetrics,
    report: '',
    businessImpact: [],
    actionItems: []
  };

  // Generate additional insights
  results.strategyRecommendations = ChurnRateFormulas.generateStrategyRecommendations(inputs, results);
  results.report = ChurnRateFormulas.generateReport(inputs, results);

  // Business impact
  results.businessImpact = [
    {
      metric: 'Customer Churn Rate',
      currentValue: customerChurnRate,
      projectedValue: customerChurnRate * 0.7,
      impact: -30,
      timeframe: '6 months'
    },
    {
      metric: 'Revenue Retention',
      currentValue: netRevenueRetention,
      projectedValue: netRevenueRetention * 1.1,
      impact: 10,
      timeframe: '12 months'
    },
    {
      metric: 'Customer Lifetime Value',
      currentValue: performanceMetrics.customerLifetimeValue,
      projectedValue: performanceMetrics.customerLifetimeValue * 1.2,
      impact: 20,
      timeframe: '12 months'
    }
  ];

  // Action items
  results.actionItems = [
    {
      priority: 'immediate',
      action: 'Implement customer success programs',
      owner: 'Customer Success Team',
      timeline: '2 weeks',
      expectedOutcome: '15% churn reduction'
    },
    {
      priority: 'short-term',
      action: 'Improve onboarding process',
      owner: 'Product Team',
      timeline: '1 month',
      expectedOutcome: '20% improvement in time-to-value'
    },
    {
      priority: 'long-term',
      action: 'Develop comprehensive retention strategy',
      owner: 'Growth Team',
      timeline: '3 months',
      expectedOutcome: '30% overall churn reduction'
    }
  ];

  return results;
}
