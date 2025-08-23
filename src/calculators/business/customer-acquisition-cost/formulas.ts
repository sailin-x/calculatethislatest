import { CustomerAcquisitionCostInputs, CustomerAcquisitionCostResults } from './types';

export class CACFormulas {
  // Basic CAC calculation
  static calculateTotalCAC(
    totalMarketingSpend: number,
    salesTeamCosts: number,
    salesCommission: number,
    salesToolsCosts: number,
    leadGenerationCosts: number,
    marketingTeamCosts: number,
    marketingToolsCosts: number,
    creativeAgencyCosts: number,
    analyticsToolsCosts: number,
    newCustomersAcquired: number
  ): number {
    const totalCosts = totalMarketingSpend + salesTeamCosts + salesCommission + 
                      salesToolsCosts + leadGenerationCosts + marketingTeamCosts + 
                      marketingToolsCosts + creativeAgencyCosts + analyticsToolsCosts;
    
    return newCustomersAcquired > 0 ? totalCosts / newCustomersAcquired : 0;
  }

  // Channel-specific CAC calculation
  static calculateChannelCAC(
    channelBreakdown: CustomerAcquisitionCostInputs['channelBreakdown']
  ): CustomerAcquisitionCostResults['channelCAC'] {
    if (!channelBreakdown || channelBreakdown.length === 0) {
      return [];
    }

    return channelBreakdown.map(channel => {
      const cac = channel.customers > 0 ? channel.spend / channel.customers : 0;
      
      // Determine efficiency based on CAC and conversion rate
      let efficiency: 'excellent' | 'good' | 'average' | 'poor' | 'inefficient';
      if (cac < 50 && channel.conversionRate > 5) efficiency = 'excellent';
      else if (cac < 100 && channel.conversionRate > 3) efficiency = 'good';
      else if (cac < 200 && channel.conversionRate > 1) efficiency = 'average';
      else if (cac < 500) efficiency = 'poor';
      else efficiency = 'inefficient';

      return {
        channel: channel.channel,
        cac: Math.round(cac),
        spend: channel.spend,
        customers: channel.customers,
        conversionRate: channel.conversionRate,
        efficiency
      };
    });
  }

  // Cost breakdown analysis
  static analyzeCostBreakdown(inputs: CustomerAcquisitionCostInputs): CustomerAcquisitionCostResults['costBreakdown'] {
    const totalCosts = inputs.totalMarketingSpend + inputs.salesTeamCosts + inputs.salesCommission + 
                      inputs.salesToolsCosts + inputs.leadGenerationCosts + inputs.marketingTeamCosts + 
                      inputs.marketingToolsCosts + inputs.creativeAgencyCosts + inputs.analyticsToolsCosts;

    const categories = [
      { name: 'Advertising', amount: inputs.advertisingSpend },
      { name: 'Content Marketing', amount: inputs.contentMarketingSpend },
      { name: 'Social Media', amount: inputs.socialMediaSpend },
      { name: 'Email Marketing', amount: inputs.emailMarketingSpend },
      { name: 'SEO/SEM', amount: inputs.seoSemSpend },
      { name: 'Influencer Marketing', amount: inputs.influencerSpend },
      { name: 'Affiliate Marketing', amount: inputs.affiliateSpend },
      { name: 'Events', amount: inputs.eventSpend },
      { name: 'PR', amount: inputs.prSpend },
      { name: 'Sales Team', amount: inputs.salesTeamCosts },
      { name: 'Sales Commission', amount: inputs.salesCommission },
      { name: 'Sales Tools', amount: inputs.salesToolsCosts },
      { name: 'Lead Generation', amount: inputs.leadGenerationCosts },
      { name: 'Marketing Team', amount: inputs.marketingTeamCosts },
      { name: 'Marketing Tools', amount: inputs.marketingToolsCosts },
      { name: 'Creative Agency', amount: inputs.creativeAgencyCosts },
      { name: 'Analytics Tools', amount: inputs.analyticsToolsCosts }
    ];

    return categories.map(category => ({
      category: category.name,
      amount: category.amount,
      percentage: totalCosts > 0 ? (category.amount / totalCosts) * 100 : 0,
      efficiency: this.calculateCategoryEfficiency(category.name, category.amount, inputs)
    }));
  }

  // Calculate efficiency for different cost categories
  static calculateCategoryEfficiency(category: string, amount: number, inputs: CustomerAcquisitionCostInputs): number {
    const totalCustomers = inputs.newCustomersAcquired;
    if (totalCustomers === 0) return 0;

    // Define efficiency benchmarks for different categories
    const benchmarks: Record<string, { min: number; max: number }> = {
      'Advertising': { min: 50, max: 200 },
      'Content Marketing': { min: 20, max: 100 },
      'Social Media': { min: 30, max: 150 },
      'Email Marketing': { min: 10, max: 50 },
      'SEO/SEM': { min: 40, max: 180 },
      'Influencer Marketing': { min: 60, max: 250 },
      'Affiliate Marketing': { min: 25, max: 120 },
      'Events': { min: 80, max: 300 },
      'PR': { min: 100, max: 400 },
      'Sales Team': { min: 200, max: 800 },
      'Sales Commission': { min: 50, max: 200 },
      'Sales Tools': { min: 20, max: 100 },
      'Lead Generation': { min: 30, max: 150 },
      'Marketing Team': { min: 150, max: 600 },
      'Marketing Tools': { min: 15, max: 80 },
      'Creative Agency': { min: 100, max: 400 },
      'Analytics Tools': { min: 10, max: 50 }
    };

    const benchmark = benchmarks[category] || { min: 50, max: 200 };
    const costPerCustomer = amount / totalCustomers;
    
    if (costPerCustomer <= benchmark.min) return 100;
    if (costPerCustomer >= benchmark.max) return 0;
    
    return Math.max(0, 100 - ((costPerCustomer - benchmark.min) / (benchmark.max - benchmark.min)) * 100);
  }

  // Calculate efficiency metrics
  static calculateEfficiencyMetrics(inputs: CustomerAcquisitionCostInputs): {
    marketingEfficiency: number;
    salesEfficiency: number;
    overallEfficiency: number;
  } {
    const totalMarketingCosts = inputs.totalMarketingSpend + inputs.marketingTeamCosts + 
                               inputs.marketingToolsCosts + inputs.creativeAgencyCosts + 
                               inputs.analyticsToolsCosts;
    
    const totalSalesCosts = inputs.salesTeamCosts + inputs.salesCommission + 
                           inputs.salesToolsCosts + inputs.leadGenerationCosts;

    const marketingEfficiency = inputs.newCustomersAcquired > 0 ? 
      (inputs.newCustomersAcquired / totalMarketingCosts) * 1000 : 0;
    
    const salesEfficiency = inputs.newCustomersAcquired > 0 ? 
      (inputs.newCustomersAcquired / totalSalesCosts) * 1000 : 0;
    
    const overallEfficiency = inputs.newCustomersAcquired > 0 ? 
      (inputs.newCustomersAcquired / (totalMarketingCosts + totalSalesCosts)) * 1000 : 0;

    return {
      marketingEfficiency: Math.round(marketingEfficiency * 100) / 100,
      salesEfficiency: Math.round(salesEfficiency * 100) / 100,
      overallEfficiency: Math.round(overallEfficiency * 100) / 100
    };
  }

  // Calculate ROI and profitability metrics
  static calculateROIMetrics(
    inputs: CustomerAcquisitionCostInputs,
    totalCAC: number
  ): {
    cacROI: number;
    paybackPeriod: number;
    profitabilityScore: number;
  } {
    const totalCosts = inputs.totalMarketingSpend + inputs.salesTeamCosts + inputs.salesCommission + 
                      inputs.salesToolsCosts + inputs.leadGenerationCosts + inputs.marketingTeamCosts + 
                      inputs.marketingToolsCosts + inputs.creativeAgencyCosts + inputs.analyticsToolsCosts;

    const cacROI = inputs.customerLifetimeValue && totalCosts > 0 ? 
      ((inputs.customerLifetimeValue - totalCAC) / totalCosts) * 100 : 0;
    
    const paybackPeriod = inputs.customerLifetimeValue && totalCAC > 0 ? 
      totalCAC / (inputs.customerLifetimeValue / 12) : 0; // months
    
    const profitabilityScore = Math.min(100, Math.max(0, 
      (inputs.customerLifetimeValue ? inputs.customerLifetimeValue / totalCAC : 0) * 20
    ));

    return {
      cacROI: Math.round(cacROI * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 100) / 100,
      profitabilityScore: Math.round(profitabilityScore * 100) / 100
    };
  }

  // Industry benchmarking
  static getIndustryBenchmarks(
    industry: CustomerAcquisitionCostInputs['industry'],
    totalCAC: number,
    conversionRate: number,
    ltvCacRatio: number
  ): CustomerAcquisitionCostResults['industryBenchmarks'] {
    const benchmarks: Record<string, { cac: number; conversion: number; ltvCac: number }> = {
      ecommerce: { cac: 150, conversion: 2.5, ltvCac: 3.5 },
      saas: { cac: 300, conversion: 1.8, ltvCac: 4.2 },
      subscription: { cac: 250, conversion: 2.0, ltvCac: 3.8 },
      retail: { cac: 100, conversion: 3.0, ltvCac: 2.8 },
      b2b: { cac: 500, conversion: 1.2, ltvCac: 5.0 },
      marketplace: { cac: 200, conversion: 2.2, ltvCac: 3.2 }
    };

    const benchmark = benchmarks[industry || 'ecommerce'];
    
    const getPercentile = (value: number, average: number, excellent: number, poor: number): number => {
      if (value >= excellent) return 90;
      if (value >= average) return 50 + ((value - average) / (excellent - average)) * 40;
      if (value >= poor) return 10 + ((value - poor) / (average - poor)) * 40;
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
        metric: 'Customer Acquisition Cost',
        yourValue: totalCAC,
        industryAverage: benchmark.cac,
        percentile: getPercentile(totalCAC, benchmark.cac, benchmark.cac * 0.6, benchmark.cac * 1.8),
        performance: getPerformance(getPercentile(totalCAC, benchmark.cac, benchmark.cac * 0.6, benchmark.cac * 1.8))
      },
      {
        metric: 'Conversion Rate',
        yourValue: conversionRate,
        industryAverage: benchmark.conversion,
        percentile: getPercentile(conversionRate, benchmark.conversion, benchmark.conversion * 1.5, benchmark.conversion * 0.5),
        performance: getPerformance(getPercentile(conversionRate, benchmark.conversion, benchmark.conversion * 1.5, benchmark.conversion * 0.5))
      },
      {
        metric: 'LTV/CAC Ratio',
        yourValue: ltvCacRatio,
        industryAverage: benchmark.ltvCac,
        percentile: getPercentile(ltvCacRatio, benchmark.ltvCac, benchmark.ltvCac * 1.3, benchmark.ltvCac * 0.6),
        performance: getPerformance(getPercentile(ltvCacRatio, benchmark.ltvCac, benchmark.ltvCac * 1.3, benchmark.ltvCac * 0.6))
      }
    ];
  }

  // Identify optimization opportunities
  static identifyOptimizationOpportunities(
    inputs: CustomerAcquisitionCostInputs,
    totalCAC: number,
    channelCAC: CustomerAcquisitionCostResults['channelCAC']
  ): CustomerAcquisitionCostResults['optimizationOpportunities'] {
    const opportunities: CustomerAcquisitionCostResults['optimizationOpportunities'] = [];

    // High CAC optimization
    if (totalCAC > 300) {
      opportunities.push({
        area: 'Overall CAC Reduction',
        currentValue: totalCAC,
        potentialValue: totalCAC * 0.7,
        improvement: totalCAC * 0.3,
        priority: 'high',
        recommendations: [
          'Optimize underperforming channels',
          'Improve conversion rates',
          'Reduce marketing waste',
          'Implement better targeting'
        ]
      });
    }

    // Low conversion rate optimization
    if (inputs.conversionRate < 2) {
      opportunities.push({
        area: 'Conversion Rate Improvement',
        currentValue: inputs.conversionRate,
        potentialValue: inputs.conversionRate * 1.5,
        improvement: inputs.conversionRate * 0.5,
        priority: 'high',
        recommendations: [
          'Optimize landing pages',
          'Improve lead quality',
          'Enhance sales process',
          'Implement A/B testing'
        ]
      });
    }

    // Channel optimization
    const inefficientChannels = channelCAC.filter(ch => ch.efficiency === 'poor' || ch.efficiency === 'inefficient');
    if (inefficientChannels.length > 0) {
      opportunities.push({
        area: 'Channel Optimization',
        currentValue: inefficientChannels.reduce((sum, ch) => sum + ch.cac, 0) / inefficientChannels.length,
        potentialValue: inefficientChannels.reduce((sum, ch) => sum + ch.cac * 0.6, 0) / inefficientChannels.length,
        improvement: inefficientChannels.reduce((sum, ch) => sum + ch.cac * 0.4, 0) / inefficientChannels.length,
        priority: 'medium',
        recommendations: [
          'Optimize underperforming channels',
          'Reallocate budget to efficient channels',
          'Improve channel-specific strategies',
          'Implement better attribution'
        ]
      });
    }

    // Lead quality optimization
    if (inputs.leadToCustomerRate < 20) {
      opportunities.push({
        area: 'Lead Quality Improvement',
        currentValue: inputs.leadToCustomerRate,
        potentialValue: inputs.leadToCustomerRate * 1.4,
        improvement: inputs.leadToCustomerRate * 0.4,
        priority: 'medium',
        recommendations: [
          'Improve lead scoring',
          'Enhance qualification criteria',
          'Better targeting',
          'Implement lead nurturing'
        ]
      });
    }

    return opportunities;
  }

  // Channel analysis
  static analyzeChannels(
    channelCAC: CustomerAcquisitionCostResults['channelCAC']
  ): CustomerAcquisitionCostResults['channelAnalysis'] {
    const bestPerforming = channelCAC
      .filter(ch => ch.efficiency === 'excellent' || ch.efficiency === 'good')
      .map(ch => ch.channel);
    
    const worstPerforming = channelCAC
      .filter(ch => ch.efficiency === 'poor' || ch.efficiency === 'inefficient')
      .map(ch => ch.channel);
    
    const scalingOpportunities = channelCAC
      .filter(ch => ch.efficiency === 'excellent' && ch.customers < 100)
      .map(ch => ch.channel);
    
    const channelsToOptimize = channelCAC
      .filter(ch => ch.efficiency === 'average' || ch.efficiency === 'poor')
      .map(ch => ch.channel);

    return {
      bestPerforming,
      worstPerforming,
      scalingOpportunities,
      channelsToOptimize
    };
  }

  // Budget optimization
  static optimizeBudget(
    channelCAC: CustomerAcquisitionCostResults['channelCAC'],
    totalBudget: number
  ): CustomerAcquisitionCostResults['budgetOptimization'] {
    const efficientChannels = channelCAC.filter(ch => ch.efficiency === 'excellent' || ch.efficiency === 'good');
    const inefficientChannels = channelCAC.filter(ch => ch.efficiency === 'poor' || ch.efficiency === 'inefficient');
    
    const recommendedAllocation = channelCAC.map(channel => {
      const currentSpend = channel.spend;
      let recommendedSpend = currentSpend;
      
      if (channel.efficiency === 'excellent') {
        recommendedSpend = currentSpend * 1.5; // Increase by 50%
      } else if (channel.efficiency === 'good') {
        recommendedSpend = currentSpend * 1.2; // Increase by 20%
      } else if (channel.efficiency === 'poor') {
        recommendedSpend = currentSpend * 0.7; // Decrease by 30%
      } else if (channel.efficiency === 'inefficient') {
        recommendedSpend = currentSpend * 0.5; // Decrease by 50%
      }
      
      const expectedImprovement = (currentSpend - recommendedSpend) / currentSpend * 100;
      
      return {
        channel: channel.channel,
        currentSpend,
        recommendedSpend: Math.round(recommendedSpend),
        expectedImprovement: Math.round(expectedImprovement)
      };
    });

    const totalRecommendedSpend = recommendedAllocation.reduce((sum, ch) => sum + ch.recommendedSpend, 0);
    const expectedCACReduction = 15; // Estimated 15% reduction through optimization

    return {
      recommendedAllocation,
      totalBudget: totalRecommendedSpend,
      expectedCACReduction
    };
  }

  // Performance metrics
  static calculatePerformanceMetrics(
    inputs: CustomerAcquisitionCostInputs,
    totalCAC: number
  ): CustomerAcquisitionCostResults['performanceMetrics'] {
    const ltvCacRatio = inputs.customerLifetimeValue && totalCAC > 0 ? 
      inputs.customerLifetimeValue / totalCAC : 0;
    
    const customerEquity = inputs.customerLifetimeValue ? 
      inputs.customerLifetimeValue - totalCAC : 0;
    
    const acquisitionEfficiency = inputs.newCustomersAcquired > 0 ? 
      (inputs.qualifiedLeads / inputs.newCustomersAcquired) * 100 : 0;
    
    const conversionEfficiency = inputs.qualifiedLeads > 0 ? 
      (inputs.newCustomersAcquired / inputs.qualifiedLeads) * 100 : 0;
    
    const costPerLead = inputs.qualifiedLeads > 0 ? 
      (inputs.totalMarketingSpend + inputs.leadGenerationCosts) / inputs.qualifiedLeads : 0;
    
    const leadQualityScore = inputs.customerQualityScore || 5;

    return {
      ltvCacRatio: Math.round(ltvCacRatio * 100) / 100,
      customerEquity: Math.round(customerEquity),
      acquisitionEfficiency: Math.round(acquisitionEfficiency * 100) / 100,
      conversionEfficiency: Math.round(conversionEfficiency * 100) / 100,
      costPerLead: Math.round(costPerLead * 100) / 100,
      leadQualityScore: Math.round(leadQualityScore * 100) / 100
    };
  }

  // Generate comprehensive report
  static generateReport(
    inputs: CustomerAcquisitionCostInputs,
    results: CustomerAcquisitionCostResults
  ): string {
    return `# Customer Acquisition Cost Analysis Report

## Executive Summary
Your customer acquisition cost analysis reveals a CAC of $${results.totalCAC.toLocaleString()} with an LTV/CAC ratio of ${results.performanceMetrics.ltvCacRatio.toFixed(2)}. This indicates ${results.performanceMetrics.ltvCacRatio >= 3 ? 'strong' : 'moderate'} customer profitability.

## Key Metrics
- **Total CAC**: $${results.totalCAC.toLocaleString()}
- **Average CAC**: $${results.averageCAC.toLocaleString()}
- **Payback Period**: ${results.paybackPeriod.toFixed(1)} months
- **CAC ROI**: ${results.cacROI.toFixed(1)}%
- **Conversion Rate**: ${inputs.conversionRate.toFixed(1)}%

## Cost Breakdown
${results.costBreakdown.map(cost => `- **${cost.category}**: $${cost.amount.toLocaleString()} (${cost.percentage.toFixed(1)}%) - Efficiency: ${cost.efficiency.toFixed(1)}%`).join('\n')}

## Channel Performance
${results.channelCAC.map(channel => `- **${channel.channel}**: $${channel.cac.toLocaleString()} CAC - ${channel.efficiency} efficiency`).join('\n')}

## Efficiency Analysis
- **Marketing Efficiency**: ${results.marketingEfficiency}
- **Sales Efficiency**: ${results.salesEfficiency}
- **Overall Efficiency**: ${results.overallEfficiency}

## Industry Comparison
${results.industryBenchmarks.map(bench => `- **${bench.metric}**: $${bench.yourValue.toLocaleString()} (${bench.performance} - ${bench.percentile}th percentile)`).join('\n')}

## Optimization Opportunities
${results.optimizationOpportunities.map(opp => `### ${opp.area}
- **Current**: $${opp.currentValue.toLocaleString()}
- **Potential**: $${opp.potentialValue.toLocaleString()}
- **Improvement**: $${opp.improvement.toLocaleString()}
- **Priority**: ${opp.priority}
- **Recommendations**: ${opp.recommendations.join(', ')}`).join('\n\n')}

## Channel Analysis
- **Best Performing**: ${results.channelAnalysis.bestPerforming.join(', ')}
- **Worst Performing**: ${results.channelAnalysis.worstPerforming.join(', ')}
- **Scaling Opportunities**: ${results.channelAnalysis.scalingOpportunities.join(', ')}
- **Channels to Optimize**: ${results.channelAnalysis.channelsToOptimize.join(', ')}

## Budget Optimization
${results.budgetOptimization.recommendedAllocation.map(alloc => `- **${alloc.channel}**: $${alloc.currentSpend.toLocaleString()} → $${alloc.recommendedSpend.toLocaleString()} (${alloc.expectedImprovement > 0 ? '+' : ''}${alloc.expectedImprovement.toFixed(1)}%)`).join('\n')}

## Risk Assessment
- **Risk Level**: ${results.riskAssessment.riskLevel}
- **Risk Factors**: ${results.riskAssessment.riskFactors.join(', ')}
- **Mitigation Strategies**: ${results.riskAssessment.mitigationStrategies.join(', ')}

## Strategic Recommendations
${results.strategyRecommendations.map(rec => `### ${rec.category}
${rec.recommendations.map(r => `- ${r}`).join('\n')}
**Expected Impact**: ${rec.expectedImpact.toFixed(1)}% improvement
**Implementation Time**: ${rec.implementationTime}`).join('\n\n')}

This analysis provides a comprehensive view of your customer acquisition costs and identifies key opportunities for optimization and growth.`;
  }

  // Generate strategy recommendations
  static generateStrategyRecommendations(
    inputs: CustomerAcquisitionCostInputs,
    results: Partial<CustomerAcquisitionCostResults>
  ): CustomerAcquisitionCostResults['strategyRecommendations'] {
    const recommendations: CustomerAcquisitionCostResults['strategyRecommendations'] = [];

    // High CAC recommendations
    if (results.totalCAC && results.totalCAC > 300) {
      recommendations.push({
        category: 'CAC Reduction',
        recommendations: [
          'Optimize underperforming marketing channels',
          'Improve conversion rates through A/B testing',
          'Implement better targeting and segmentation',
          'Reduce marketing waste through better attribution'
        ],
        priority: 'high',
        expectedImpact: 25,
        implementationTime: '3-6 months'
      });
    }

    // Low conversion rate recommendations
    if (inputs.conversionRate < 2) {
      recommendations.push({
        category: 'Conversion Optimization',
        recommendations: [
          'Optimize landing pages and user experience',
          'Improve lead qualification process',
          'Enhance sales process and follow-up',
          'Implement lead nurturing campaigns'
        ],
        priority: 'high',
        expectedImpact: 40,
        implementationTime: '2-4 months'
      });
    }

    // Channel optimization recommendations
    recommendations.push({
      category: 'Channel Strategy',
      recommendations: [
        'Reallocate budget to high-performing channels',
        'Optimize channel-specific messaging',
        'Implement multi-touch attribution',
        'Develop channel-specific KPIs'
      ],
      priority: 'medium',
      expectedImpact: 20,
      implementationTime: '1-3 months'
    });

    // Lead quality recommendations
    if (inputs.leadToCustomerRate < 20) {
      recommendations.push({
        category: 'Lead Quality',
        recommendations: [
          'Improve lead scoring models',
          'Enhance qualification criteria',
          'Implement better targeting',
          'Create lead nurturing programs'
        ],
        priority: 'medium',
        expectedImpact: 30,
        implementationTime: '2-5 months'
      });
    }

    return recommendations;
  }

  // Risk assessment
  static assessRisk(
    inputs: CustomerAcquisitionCostInputs,
    results: Partial<CustomerAcquisitionCostResults>
  ): CustomerAcquisitionCostResults['riskAssessment'] {
    const riskFactors: string[] = [];
    const mitigationStrategies: string[] = [];
    const monitoringMetrics: string[] = [];

    // High CAC risk
    if (results.totalCAC && results.totalCAC > 500) {
      riskFactors.push('High customer acquisition costs');
      mitigationStrategies.push('Optimize marketing channels and improve conversion rates');
      monitoringMetrics.push('CAC by channel', 'Conversion rates', 'Marketing ROI');
    }

    // Low conversion risk
    if (inputs.conversionRate < 1) {
      riskFactors.push('Low conversion rates');
      mitigationStrategies.push('Improve landing pages and sales process');
      monitoringMetrics.push('Conversion rates by channel', 'Lead quality scores');
    }

    // High churn risk
    if (inputs.churnRate && inputs.churnRate > 20) {
      riskFactors.push('High customer churn');
      mitigationStrategies.push('Improve customer onboarding and retention programs');
      monitoringMetrics.push('Churn rate', 'Customer satisfaction', 'Retention rates');
    }

    // Market condition risk
    if (inputs.marketConditions === 'recession') {
      riskFactors.push('Economic downturn impact');
      mitigationStrategies.push('Focus on efficient channels and customer retention');
      monitoringMetrics.push('Market conditions', 'Customer behavior changes');
    }

    const riskLevel = riskFactors.length >= 3 ? 'high' : riskFactors.length >= 2 ? 'medium' : 'low';

    return {
      riskLevel,
      riskFactors,
      mitigationStrategies,
      monitoringMetrics
    };
  }
}

/**
 * Main Customer Acquisition Cost calculator formula
 */
export function calculateCustomerAcquisitionCost(
  inputs: CustomerAcquisitionCostInputs,
  allInputs?: Record<string, any>
): CustomerAcquisitionCostResults {
  // Basic CAC calculations
  const totalCAC = CACFormulas.calculateTotalCAC(
    inputs.totalMarketingSpend,
    inputs.salesTeamCosts,
    inputs.salesCommission,
    inputs.salesToolsCosts,
    inputs.leadGenerationCosts,
    inputs.marketingTeamCosts,
    inputs.marketingToolsCosts,
    inputs.creativeAgencyCosts,
    inputs.analyticsToolsCosts,
    inputs.newCustomersAcquired
  );

  const averageCAC = totalCAC;
  const marginalCAC = totalCAC * 1.2; // Estimate marginal CAC as 20% higher

  // Channel-specific CAC
  const channelCAC = CACFormulas.calculateChannelCAC(inputs.channelBreakdown);

  // Cost breakdown
  const costBreakdown = CACFormulas.analyzeCostBreakdown(inputs);

  // Efficiency metrics
  const efficiencyMetrics = CACFormulas.calculateEfficiencyMetrics(inputs);

  // ROI and profitability
  const roiMetrics = CACFormulas.calculateROIMetrics(inputs, totalCAC);

  // Performance metrics
  const performanceMetrics = CACFormulas.calculatePerformanceMetrics(inputs, totalCAC);

  // Industry benchmarks
  const industryBenchmarks = CACFormulas.getIndustryBenchmarks(
    inputs.industry,
    totalCAC,
    inputs.conversionRate,
    performanceMetrics.ltvCacRatio
  );

  // Optimization opportunities
  const optimizationOpportunities = CACFormulas.identifyOptimizationOpportunities(
    inputs,
    totalCAC,
    channelCAC
  );

  // Channel analysis
  const channelAnalysis = CACFormulas.analyzeChannels(channelCAC);

  // Budget optimization
  const budgetOptimization = CACFormulas.optimizeBudget(
    channelCAC,
    inputs.totalMarketingSpend + inputs.salesTeamCosts + inputs.salesCommission
  );

  // Generate comprehensive results
  const results: CustomerAcquisitionCostResults = {
    totalCAC,
    averageCAC,
    marginalCAC,
    channelCAC,
    costBreakdown,
    marketingEfficiency: efficiencyMetrics.marketingEfficiency,
    salesEfficiency: efficiencyMetrics.salesEfficiency,
    overallEfficiency: efficiencyMetrics.overallEfficiency,
    cacROI: roiMetrics.cacROI,
    paybackPeriod: roiMetrics.paybackPeriod,
    profitabilityScore: roiMetrics.profitabilityScore,
    industryBenchmarks,
    optimizationOpportunities,
    channelAnalysis,
    trendAnalysis: [],
    riskAssessment: { riskLevel: 'low', riskFactors: [], mitigationStrategies: [], monitoringMetrics: [] },
    budgetOptimization,
    performanceMetrics,
    attributionInsights: { model: '', channelContribution: [], conversionPath: [] },
    competitiveAnalysis: { marketPosition: '', competitiveAdvantage: [], competitiveDisadvantages: [], marketOpportunities: [] },
    strategyRecommendations: [],
    forecasting: { projectedCAC: [], scenarios: [] },
    report: '',
    businessImpact: [],
    actionItems: []
  };

  // Generate additional insights
  results.strategyRecommendations = CACFormulas.generateStrategyRecommendations(inputs, results);
  results.riskAssessment = CACFormulas.assessRisk(inputs, results);
  results.report = CACFormulas.generateReport(inputs, results);

  // Business impact
  results.businessImpact = [
    {
      metric: 'Customer Acquisition Cost',
      currentValue: totalCAC,
      projectedValue: totalCAC * 0.8,
      impact: -20,
      timeframe: '6 months'
    },
    {
      metric: 'Conversion Rate',
      currentValue: inputs.conversionRate,
      projectedValue: inputs.conversionRate * 1.3,
      impact: 30,
      timeframe: '3 months'
    },
    {
      metric: 'LTV/CAC Ratio',
      currentValue: performanceMetrics.ltvCacRatio,
      projectedValue: performanceMetrics.ltvCacRatio * 1.2,
      impact: 20,
      timeframe: '12 months'
    }
  ];

  // Action items
  results.actionItems = [
    {
      priority: 'immediate',
      action: 'Optimize underperforming channels',
      owner: 'Marketing Team',
      timeline: '2 weeks',
      expectedOutcome: '10% CAC reduction'
    },
    {
      priority: 'short-term',
      action: 'Implement A/B testing for conversion optimization',
      owner: 'Growth Team',
      timeline: '1 month',
      expectedOutcome: '15% conversion rate improvement'
    },
    {
      priority: 'long-term',
      action: 'Develop comprehensive attribution model',
      owner: 'Analytics Team',
      timeline: '3 months',
      expectedOutcome: 'Better budget allocation and 20% efficiency improvement'
    }
  ];

  return results;
}
