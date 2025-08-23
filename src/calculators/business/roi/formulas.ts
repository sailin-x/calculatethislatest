import { ROIInputs, ROIResults } from './types';

export class ROIFormulas {
  // Basic ROI calculation
  static calculateBasicROI(
    totalReturn: number,
    initialInvestment: number
  ): number {
    return initialInvestment > 0 ? ((totalReturn - initialInvestment) / initialInvestment) * 100 : 0;
  }

  // Annualized ROI calculation
  static calculateAnnualizedROI(
    totalReturn: number,
    initialInvestment: number,
    investmentPeriod: number
  ): number {
    if (initialInvestment <= 0 || investmentPeriod <= 0) return 0;
    
    const totalROI = (totalReturn - initialInvestment) / initialInvestment;
    const years = investmentPeriod / 12;
    
    return years > 0 ? (Math.pow(1 + totalROI, 1 / years) - 1) * 100 : 0;
  }

  // Adjusted ROI (accounting for time value of money)
  static calculateAdjustedROI(
    inputs: ROIInputs
  ): number {
    const { initialInvestment, discountRate, investmentPeriod } = inputs;
    
    if (initialInvestment <= 0) return 0;
    
    const discountFactor = Math.pow(1 + discountRate / 100, investmentPeriod / 12);
    const adjustedInvestment = initialInvestment * discountFactor;
    
    return ((inputs.finalValue - adjustedInvestment) / adjustedInvestment) * 100;
  }

  // Net ROI (after taxes and costs)
  static calculateNetROI(
    inputs: ROIInputs
  ): number {
    const { initialInvestment, totalReturn, taxRate, operationalCosts, maintenanceCosts } = inputs;
    
    if (initialInvestment <= 0) return 0;
    
    const totalCosts = operationalCosts + maintenanceCosts;
    const afterTaxReturn = totalReturn * (1 - taxRate / 100);
    const netReturn = afterTaxReturn - totalCosts;
    
    return ((netReturn - initialInvestment) / initialInvestment) * 100;
  }

  // Payback period calculation
  static calculatePaybackPeriod(
    inputs: ROIInputs
  ): number {
    const { initialInvestment, additionalRevenue, costSavings } = inputs;
    
    if (initialInvestment <= 0) return 0;
    
    const monthlyCashFlow = additionalRevenue + costSavings;
    return monthlyCashFlow > 0 ? initialInvestment / monthlyCashFlow : Infinity;
  }

  // Discounted payback period
  static calculateDiscountedPaybackPeriod(
    inputs: ROIInputs
  ): number {
    const { initialInvestment, discountRate, cashFlows } = inputs;
    
    if (initialInvestment <= 0 || !cashFlows || cashFlows.length === 0) return 0;
    
    let cumulativeDiscountedCashFlow = 0;
    let paybackPeriod = 0;
    
    for (const cashFlow of cashFlows) {
      const discountFactor = Math.pow(1 + discountRate / 100, cashFlow.period / 12);
      const discountedAmount = cashFlow.type === 'inflow' ? cashFlow.amount : -cashFlow.amount;
      const discountedCashFlow = discountedAmount / discountFactor;
      
      cumulativeDiscountedCashFlow += discountedCashFlow;
      paybackPeriod = cashFlow.period;
      
      if (cumulativeDiscountedCashFlow >= initialInvestment) {
        break;
      }
    }
    
    return cumulativeDiscountedCashFlow >= initialInvestment ? paybackPeriod : Infinity;
  }

  // Net Present Value (NPV)
  static calculateNPV(
    inputs: ROIInputs
  ): number {
    const { initialInvestment, discountRate, cashFlows } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) return 0;
    
    let npv = -initialInvestment;
    
    for (const cashFlow of cashFlows) {
      const discountFactor = Math.pow(1 + discountRate / 100, cashFlow.period / 12);
      const discountedAmount = cashFlow.type === 'inflow' ? cashFlow.amount : -cashFlow.amount;
      npv += discountedAmount / discountFactor;
    }
    
    return npv;
  }

  // Internal Rate of Return (IRR) - simplified calculation
  static calculateIRR(
    inputs: ROIInputs
  ): number {
    const { initialInvestment, cashFlows } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) return 0;
    
    // Simplified IRR calculation using trial and error
    let irr = 0.1; // Start with 10%
    const tolerance = 0.0001;
    const maxIterations = 100;
    
    for (let i = 0; i < maxIterations; i++) {
      let npv = -initialInvestment;
      
      for (const cashFlow of cashFlows) {
        const discountFactor = Math.pow(1 + irr, cashFlow.period / 12);
        const amount = cashFlow.type === 'inflow' ? cashFlow.amount : -cashFlow.amount;
        npv += amount / discountFactor;
      }
      
      if (Math.abs(npv) < tolerance) {
        break;
      }
      
      // Simple adjustment for next iteration
      irr += npv > 0 ? 0.01 : -0.01;
    }
    
    return irr * 100;
  }

  // Risk-adjusted ROI
  static calculateRiskAdjustedROI(
    inputs: ROIInputs,
    basicROI: number
  ): number {
    const { riskLevel, marketConditions, competitivePressure, regulatoryRisk } = inputs;
    
    let riskAdjustment = 1;
    
    // Risk level adjustment
    switch (riskLevel) {
      case 'high': riskAdjustment *= 0.7; break;
      case 'medium': riskAdjustment *= 0.85; break;
      case 'low': riskAdjustment *= 1.0; break;
    }
    
    // Market conditions adjustment
    switch (marketConditions) {
      case 'recession': riskAdjustment *= 0.8; break;
      case 'stable': riskAdjustment *= 1.0; break;
      case 'growth': riskAdjustment *= 1.1; break;
      case 'boom': riskAdjustment *= 1.2; break;
    }
    
    // Competitive pressure adjustment
    riskAdjustment *= (11 - competitivePressure) / 10;
    
    // Regulatory risk adjustment
    riskAdjustment *= (11 - regulatoryRisk) / 10;
    
    return basicROI * riskAdjustment;
  }

  // Sharpe Ratio (simplified)
  static calculateSharpeRatio(
    inputs: ROIInputs,
    expectedReturn: number
  ): number {
    const { opportunityCost } = inputs;
    
    // Simplified volatility calculation
    const volatility = 15; // Assume 15% volatility
    const riskFreeRate = opportunityCost;
    
    return volatility > 0 ? (expectedReturn - riskFreeRate) / volatility : 0;
  }

  // Value at Risk (VaR) - simplified
  static calculateValueAtRisk(
    inputs: ROIInputs,
    expectedReturn: number
  ): number {
    const { initialInvestment, riskLevel } = inputs;
    
    let confidenceLevel = 0.95; // 95% confidence
    
    switch (riskLevel) {
      case 'high': confidenceLevel = 0.99; break;
      case 'medium': confidenceLevel = 0.95; break;
      case 'low': confidenceLevel = 0.90; break;
    }
    
    // Simplified VaR calculation
    const volatility = 15; // Assume 15% volatility
    const zScore = 1.645; // For 95% confidence level
    
    return initialInvestment * (expectedReturn / 100 - zScore * volatility / 100);
  }

  // Cash flow analysis
  static analyzeCashFlows(
    inputs: ROIInputs
  ): ROIResults['cashFlowAnalysis'] {
    const { initialInvestment, cashFlows } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) {
      return [];
    }
    
    let cumulativeCashFlow = -initialInvestment;
    const analysis: ROIResults['cashFlowAnalysis'] = [];
    
    for (const cashFlow of cashFlows) {
      const amount = cashFlow.type === 'inflow' ? cashFlow.amount : -cashFlow.amount;
      cumulativeCashFlow += amount;
      
      analysis.push({
        period: cashFlow.period,
        cumulativeCashFlow,
        discountedCashFlow: 0, // Would need discount rate calculation
        paybackStatus: cumulativeCashFlow >= 0 ? 'paid' : 'unpaid'
      });
    }
    
    return analysis;
  }

  // Sensitivity analysis
  static performSensitivityAnalysis(
    inputs: ROIInputs,
    basicROI: number
  ): ROIResults['sensitivityAnalysis'] {
    const { bestCaseScenario, worstCaseScenario, mostLikelyScenario } = inputs;
    
    return [
      {
        scenario: 'Best Case',
        roi: bestCaseScenario,
        npv: bestCaseScenario * inputs.initialInvestment / 100,
        paybackPeriod: inputs.initialInvestment / (bestCaseScenario * inputs.initialInvestment / 100 / 12),
        probability: 0.25
      },
      {
        scenario: 'Most Likely',
        roi: mostLikelyScenario,
        npv: mostLikelyScenario * inputs.initialInvestment / 100,
        paybackPeriod: inputs.initialInvestment / (mostLikelyScenario * inputs.initialInvestment / 100 / 12),
        probability: 0.50
      },
      {
        scenario: 'Worst Case',
        roi: worstCaseScenario,
        npv: worstCaseScenario * inputs.initialInvestment / 100,
        paybackPeriod: inputs.initialInvestment / (worstCaseScenario * inputs.initialInvestment / 100 / 12),
        probability: 0.25
      }
    ];
  }

  // Comparative analysis
  static performComparativeAnalysis(
    inputs: ROIInputs,
    basicROI: number
  ): ROIResults['comparativeAnalysis'] {
    const analysis: ROIResults['comparativeAnalysis'] = [];
    
    if (inputs.benchmarkROI) {
      analysis.push({
        metric: 'Benchmark ROI',
        yourValue: basicROI,
        benchmark: inputs.benchmarkROI,
        difference: basicROI - inputs.benchmarkROI,
        performance: basicROI >= inputs.benchmarkROI * 1.1 ? 'excellent' :
                   basicROI >= inputs.benchmarkROI ? 'good' :
                   basicROI >= inputs.benchmarkROI * 0.8 ? 'average' :
                   basicROI >= inputs.benchmarkROI * 0.6 ? 'below_average' : 'poor'
      });
    }
    
    if (inputs.industryAverageROI) {
      analysis.push({
        metric: 'Industry Average ROI',
        yourValue: basicROI,
        benchmark: inputs.industryAverageROI,
        difference: basicROI - inputs.industryAverageROI,
        performance: basicROI >= inputs.industryAverageROI * 1.2 ? 'excellent' :
                   basicROI >= inputs.industryAverageROI * 1.1 ? 'good' :
                   basicROI >= inputs.industryAverageROI ? 'average' :
                   basicROI >= inputs.industryAverageROI * 0.8 ? 'below_average' : 'poor'
      });
    }
    
    if (inputs.competitorROI) {
      analysis.push({
        metric: 'Competitor ROI',
        yourValue: basicROI,
        benchmark: inputs.competitorROI,
        difference: basicROI - inputs.competitorROI,
        performance: basicROI >= inputs.competitorROI * 1.15 ? 'excellent' :
                   basicROI >= inputs.competitorROI ? 'good' :
                   basicROI >= inputs.competitorROI * 0.85 ? 'average' :
                   basicROI >= inputs.competitorROI * 0.7 ? 'below_average' : 'poor'
      });
    }
    
    return analysis;
  }

  // Risk assessment
  static assessRisk(
    inputs: ROIInputs
  ): ROIResults['riskAssessment'] {
    const riskFactors: string[] = [];
    const mitigationStrategies: string[] = [];
    let riskScore = 0;
    
    // Risk level assessment
    switch (inputs.riskLevel) {
      case 'high':
        riskScore += 30;
        riskFactors.push('High risk investment');
        mitigationStrategies.push('Implement comprehensive risk management');
        break;
      case 'medium':
        riskScore += 15;
        riskFactors.push('Medium risk investment');
        mitigationStrategies.push('Monitor key risk indicators');
        break;
      case 'low':
        riskScore += 5;
        break;
    }
    
    // Market conditions
    if (inputs.marketConditions === 'recession') {
      riskScore += 20;
      riskFactors.push('Recessionary market conditions');
      mitigationStrategies.push('Diversify investment portfolio');
    }
    
    // Competitive pressure
    if (inputs.competitivePressure > 7) {
      riskScore += 15;
      riskFactors.push('High competitive pressure');
      mitigationStrategies.push('Strengthen competitive advantages');
    }
    
    // Regulatory risk
    if (inputs.regulatoryRisk > 7) {
      riskScore += 15;
      riskFactors.push('High regulatory risk');
      mitigationStrategies.push('Ensure compliance and regulatory monitoring');
    }
    
    // Investment period
    if (inputs.investmentPeriod > 24) {
      riskScore += 10;
      riskFactors.push('Long investment period');
      mitigationStrategies.push('Implement milestone-based monitoring');
    }
    
    const riskLevel = riskScore >= 50 ? 'high' : riskScore >= 25 ? 'medium' : 'low';
    
    return {
      riskLevel,
      riskFactors,
      riskScore,
      mitigationStrategies
    };
  }

  // Performance breakdown
  static analyzePerformanceBreakdown(
    inputs: ROIInputs
  ): ROIResults['performanceBreakdown'] {
    const breakdown: ROIResults['performanceBreakdown'] = [];
    
    if (inputs.additionalRevenue > 0) {
      breakdown.push({
        category: 'Additional Revenue',
        amount: inputs.additionalRevenue,
        percentage: (inputs.additionalRevenue / inputs.totalReturn) * 100,
        impact: 'positive'
      });
    }
    
    if (inputs.costSavings > 0) {
      breakdown.push({
        category: 'Cost Savings',
        amount: inputs.costSavings,
        percentage: (inputs.costSavings / inputs.totalReturn) * 100,
        impact: 'positive'
      });
    }
    
    if (inputs.operationalCosts > 0) {
      breakdown.push({
        category: 'Operational Costs',
        amount: inputs.operationalCosts,
        percentage: (inputs.operationalCosts / inputs.totalReturn) * 100,
        impact: 'negative'
      });
    }
    
    if (inputs.maintenanceCosts > 0) {
      breakdown.push({
        category: 'Maintenance Costs',
        amount: inputs.maintenanceCosts,
        percentage: (inputs.maintenanceCosts / inputs.totalReturn) * 100,
        impact: 'negative'
      });
    }
    
    return breakdown;
  }

  // Projection analysis
  static analyzeProjections(
    inputs: ROIInputs,
    basicROI: number
  ): ROIResults['projectionAnalysis'] {
    const projections: ROIResults['projectionAnalysis'] = [];
    const { projectionPeriod, growthRate, initialInvestment } = inputs;
    
    for (let period = 1; period <= projectionPeriod; period++) {
      const projectedValue = initialInvestment * Math.pow(1 + (basicROI + growthRate) / 100, period / 12);
      const projectedROI = ((projectedValue - initialInvestment) / initialInvestment) * 100;
      const cumulativeReturn = projectedValue - initialInvestment;
      
      projections.push({
        period,
        projectedValue: Math.round(projectedValue),
        projectedROI: Math.round(projectedROI * 100) / 100,
        cumulativeReturn: Math.round(cumulativeReturn)
      });
    }
    
    return projections;
  }

  // Optimization insights
  static generateOptimizationInsights(
    inputs: ROIInputs,
    basicROI: number
  ): ROIResults['optimizationInsights'] {
    const insights: ROIResults['optimizationInsights'] = [];
    
    // Cost optimization
    if (inputs.operationalCosts > inputs.additionalRevenue * 0.3) {
      insights.push({
        area: 'Cost Optimization',
        currentValue: inputs.operationalCosts,
        potentialValue: inputs.operationalCosts * 0.8,
        improvement: inputs.operationalCosts * 0.2,
        recommendations: [
          'Streamline operational processes',
          'Implement automation',
          'Negotiate better vendor contracts',
          'Optimize resource allocation'
        ]
      });
    }
    
    // Revenue optimization
    if (inputs.additionalRevenue < inputs.initialInvestment * 0.5) {
      insights.push({
        area: 'Revenue Optimization',
        currentValue: inputs.additionalRevenue,
        potentialValue: inputs.additionalRevenue * 1.5,
        improvement: inputs.additionalRevenue * 0.5,
        recommendations: [
          'Improve marketing effectiveness',
          'Enhance product value proposition',
          'Expand market reach',
          'Optimize pricing strategy'
        ]
      });
    }
    
    // Risk mitigation
    if (inputs.riskLevel === 'high') {
      insights.push({
        area: 'Risk Mitigation',
        currentValue: 100,
        potentialValue: 70,
        improvement: 30,
        recommendations: [
          'Implement comprehensive risk management',
          'Diversify investment portfolio',
          'Strengthen competitive advantages',
          'Enhance regulatory compliance'
        ]
      });
    }
    
    return insights;
  }

  // Generate comprehensive report
  static generateReport(
    inputs: ROIInputs,
    results: ROIResults
  ): string {
    return `# ROI Analysis Report

## Executive Summary
Your investment analysis shows a basic ROI of ${results.basicROI.toFixed(1)}% with an annualized ROI of ${results.annualizedROI.toFixed(1)}%. The risk-adjusted ROI is ${results.riskAdjustedROI.toFixed(1)}%, indicating ${results.riskAdjustedROI >= 15 ? 'strong' : results.riskAdjustedROI >= 8 ? 'moderate' : 'weak'} performance relative to risk.

## Key Metrics
- **Basic ROI**: ${results.basicROI.toFixed(1)}%
- **Annualized ROI**: ${results.annualizedROI.toFixed(1)}%
- **Risk-Adjusted ROI**: ${results.riskAdjustedROI.toFixed(1)}%
- **Net ROI**: ${results.netROI.toFixed(1)}%
- **Payback Period**: ${results.paybackPeriod.toFixed(1)} months
- **NPV**: $${results.netPresentValue.toLocaleString()}
- **IRR**: ${results.internalRateOfReturn.toFixed(1)}%

## Investment Performance
- **Investment Type**: ${inputs.investmentType}
- **Investment Category**: ${inputs.investmentCategory}
- **Investment Period**: ${inputs.investmentPeriod} months
- **Initial Investment**: $${inputs.initialInvestment.toLocaleString()}
- **Total Return**: $${inputs.totalReturn.toLocaleString()}

## Risk Assessment
- **Risk Level**: ${results.riskAssessment.riskLevel}
- **Risk Score**: ${results.riskAssessment.riskScore}/100
- **Risk Factors**: ${results.riskAssessment.riskFactors.join(', ')}
- **Mitigation Strategies**: ${results.riskAssessment.mitigationStrategies.join(', ')}

## Performance Breakdown
${results.performanceBreakdown.map(item => `- **${item.category}**: $${item.amount.toLocaleString()} (${item.percentage.toFixed(1)}%) - ${item.impact} impact`).join('\n')}

## Comparative Analysis
${results.comparativeAnalysis.map(comp => `- **${comp.metric}**: ${comp.yourValue.toFixed(1)}% vs ${comp.benchmark.toFixed(1)}% (${comp.difference > 0 ? '+' : ''}${comp.difference.toFixed(1)}%) - ${comp.performance} performance`).join('\n')}

## Sensitivity Analysis
${results.sensitivityAnalysis.map(sens => `- **${sens.scenario}**: ${sens.roi.toFixed(1)}% ROI, $${sens.npv.toLocaleString()} NPV, ${sens.paybackPeriod.toFixed(1)} months payback (${(sens.probability * 100).toFixed(0)}% probability)`).join('\n')}

## Strategic Analysis
- **Strategic Value**: ${results.strategicAnalysis.strategicValue}/10
- **Market Positioning**: ${results.strategicAnalysis.marketPositioning}/10
- **Competitive Advantage**: ${results.strategicAnalysis.competitiveAdvantage}/10
- **Scalability**: ${results.strategicAnalysis.scalability}/10
- **Overall Score**: ${results.strategicAnalysis.overallScore}/10

## Optimization Opportunities
${results.optimizationInsights.map(insight => `### ${insight.area}
- **Current**: $${insight.currentValue.toLocaleString()}
- **Potential**: $${insight.potentialValue.toLocaleString()}
- **Improvement**: $${insight.improvement.toLocaleString()}
- **Recommendations**: ${insight.recommendations.join(', ')}`).join('\n\n')}

## Projection Analysis
${results.projectionAnalysis.slice(0, 5).map(proj => `- **Month ${proj.period}**: $${proj.projectedValue.toLocaleString()} value, ${proj.projectedROI.toFixed(1)}% ROI, $${proj.cumulativeReturn.toLocaleString()} cumulative return`).join('\n')}

## Business Impact
${results.businessImpact.map(impact => `- **${impact.metric}**: ${impact.currentValue.toFixed(1)} → ${impact.projectedValue.toFixed(1)} (${impact.impact > 0 ? '+' : ''}${impact.impact.toFixed(1)}% in ${impact.timeframe})`).join('\n')}

## Recommendations
${results.recommendations.map(rec => `### ${rec.category}
${rec.recommendations.map(r => `- ${r}`).join('\n')}
**Expected Impact**: ${rec.expectedImpact.toFixed(1)}% improvement
**Implementation Time**: ${rec.implementationTime}`).join('\n\n')}

This comprehensive ROI analysis provides insights into your investment performance and identifies opportunities for optimization and growth.`;
  }

  // Generate recommendations
  static generateRecommendations(
    inputs: ROIInputs,
    results: Partial<ROIResults>
  ): ROIResults['recommendations'] {
    const recommendations: ROIResults['recommendations'] = [];
    
    // ROI improvement recommendations
    if (results.basicROI && results.basicROI < 15) {
      recommendations.push({
        category: 'ROI Improvement',
        recommendations: [
          'Optimize operational efficiency',
          'Increase revenue generation',
          'Reduce unnecessary costs',
          'Improve resource allocation'
        ],
        priority: 'high',
        expectedImpact: 25,
        implementationTime: '3-6 months'
      });
    }
    
    // Risk mitigation recommendations
    if (results.riskAssessment && results.riskAssessment.riskLevel === 'high') {
      recommendations.push({
        category: 'Risk Mitigation',
        recommendations: [
          'Implement comprehensive risk management',
          'Diversify investment portfolio',
          'Strengthen competitive advantages',
          'Enhance regulatory compliance'
        ],
        priority: 'high',
        expectedImpact: 30,
        implementationTime: '2-4 months'
      });
    }
    
    // Performance optimization recommendations
    if (results.paybackPeriod && results.paybackPeriod > 24) {
      recommendations.push({
        category: 'Performance Optimization',
        recommendations: [
          'Accelerate revenue generation',
          'Reduce initial investment costs',
          'Improve operational efficiency',
          'Optimize cash flow management'
        ],
        priority: 'medium',
        expectedImpact: 20,
        implementationTime: '4-8 months'
      });
    }
    
    return recommendations;
  }
}

/**
 * Main ROI calculator formula
 */
export function calculateROI(
  inputs: ROIInputs,
  allInputs?: Record<string, any>
): ROIResults {
  // Basic ROI calculations
  const basicROI = ROIFormulas.calculateBasicROI(
    inputs.totalReturn,
    inputs.initialInvestment
  );

  const annualizedROI = ROIFormulas.calculateAnnualizedROI(
    inputs.totalReturn,
    inputs.initialInvestment,
    inputs.investmentPeriod
  );

  const adjustedROI = ROIFormulas.calculateAdjustedROI(inputs);
  const netROI = ROIFormulas.calculateNetROI(inputs);

  // Time-based metrics
  const paybackPeriod = ROIFormulas.calculatePaybackPeriod(inputs);
  const discountedPaybackPeriod = ROIFormulas.calculateDiscountedPaybackPeriod(inputs);
  const breakEvenPoint = paybackPeriod;

  // Advanced financial metrics
  const netPresentValue = ROIFormulas.calculateNPV(inputs);
  const internalRateOfReturn = ROIFormulas.calculateIRR(inputs);
  const modifiedInternalRateOfReturn = internalRateOfReturn * 0.9; // Simplified MIRR
  const profitabilityIndex = netPresentValue > 0 ? (netPresentValue + inputs.initialInvestment) / inputs.initialInvestment : 0;

  // Risk-adjusted metrics
  const riskAdjustedROI = ROIFormulas.calculateRiskAdjustedROI(inputs, basicROI);
  const expectedReturn = basicROI;
  const sharpeRatio = ROIFormulas.calculateSharpeRatio(inputs, expectedReturn);
  const valueAtRisk = ROIFormulas.calculateValueAtRisk(inputs, expectedReturn);

  // Additional analyses
  const cashFlowAnalysis = ROIFormulas.analyzeCashFlows(inputs);
  const sensitivityAnalysis = ROIFormulas.performSensitivityAnalysis(inputs, basicROI);
  const comparativeAnalysis = ROIFormulas.performComparativeAnalysis(inputs, basicROI);
  const riskAssessment = ROIFormulas.assessRisk(inputs);
  const performanceBreakdown = ROIFormulas.analyzePerformanceBreakdown(inputs);
  const projectionAnalysis = ROIFormulas.analyzeProjections(inputs, basicROI);
  const optimizationInsights = ROIFormulas.generateOptimizationInsights(inputs, basicROI);

  // Strategic analysis
  const strategicAnalysis = {
    strategicValue: inputs.strategicValue,
    marketPositioning: inputs.marketPositioning,
    competitiveAdvantage: inputs.competitiveAdvantage,
    scalability: inputs.scalability,
    overallScore: (inputs.strategicValue + inputs.marketPositioning + inputs.competitiveAdvantage + inputs.scalability) / 4
  };

  // Generate comprehensive results
  const results: ROIResults = {
    basicROI,
    annualizedROI,
    adjustedROI,
    netROI,
    paybackPeriod,
    discountedPaybackPeriod,
    breakEvenPoint,
    netPresentValue,
    internalRateOfReturn,
    modifiedInternalRateOfReturn,
    profitabilityIndex,
    riskAdjustedROI,
    sharpeRatio,
    valueAtRisk,
    expectedReturn,
    cashFlowAnalysis,
    sensitivityAnalysis,
    comparativeAnalysis,
    riskAssessment,
    performanceBreakdown,
    projectionAnalysis,
    optimizationInsights,
    businessImpact: [],
    strategicAnalysis,
    report: '',
    recommendations: [],
    actionItems: []
  };

  // Generate additional insights
  results.recommendations = ROIFormulas.generateRecommendations(inputs, results);
  results.report = ROIFormulas.generateReport(inputs, results);

  // Business impact
  results.businessImpact = [
    {
      metric: 'ROI',
      currentValue: basicROI,
      projectedValue: basicROI * 1.2,
      impact: 20,
      timeframe: '12 months'
    },
    {
      metric: 'Payback Period',
      currentValue: paybackPeriod,
      projectedValue: paybackPeriod * 0.8,
      impact: -20,
      timeframe: '6 months'
    },
    {
      metric: 'NPV',
      currentValue: netPresentValue,
      projectedValue: netPresentValue * 1.3,
      impact: 30,
      timeframe: '12 months'
    }
  ];

  // Action items
  results.actionItems = [
    {
      priority: 'immediate',
      action: 'Implement cost optimization strategies',
      owner: 'Operations Team',
      timeline: '2 weeks',
      expectedOutcome: '10% cost reduction'
    },
    {
      priority: 'short-term',
      action: 'Develop revenue enhancement plan',
      owner: 'Sales Team',
      timeline: '1 month',
      expectedOutcome: '15% revenue increase'
    },
    {
      priority: 'long-term',
      action: 'Establish comprehensive risk management',
      owner: 'Risk Management Team',
      timeline: '3 months',
      expectedOutcome: '20% risk reduction'
    }
  ];

  return results;
}
