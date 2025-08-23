import { PaybackPeriodInputs, PaybackPeriodResults } from './types';

export class PaybackPeriodFormulas {
  // Simple payback period calculation
  static calculateSimplePaybackPeriod(
    initialInvestment: number,
    annualCashFlow: number
  ): number {
    return annualCashFlow > 0 ? initialInvestment / annualCashFlow : Infinity;
  }

  // Monthly payback period calculation
  static calculateMonthlyPaybackPeriod(
    initialInvestment: number,
    monthlyCashFlow: number
  ): number {
    return monthlyCashFlow > 0 ? initialInvestment / monthlyCashFlow : Infinity;
  }

  // Discounted payback period calculation
  static calculateDiscountedPaybackPeriod(
    inputs: PaybackPeriodInputs
  ): number {
    const { initialInvestment, cashFlows, discountRate } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) {
      return this.calculateSimplePaybackPeriod(initialInvestment, inputs.annualCashFlow);
    }
    
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

  // Adjusted payback period (accounting for inflation and taxes)
  static calculateAdjustedPaybackPeriod(
    inputs: PaybackPeriodInputs
  ): number {
    const { initialInvestment, annualCashFlow, inflationRate, taxRate } = inputs;
    
    if (annualCashFlow <= 0) return Infinity;
    
    // Adjust cash flow for inflation and taxes
    const afterTaxCashFlow = annualCashFlow * (1 - taxRate / 100);
    const inflationAdjustedCashFlow = afterTaxCashFlow / (1 + inflationRate / 100);
    
    return initialInvestment / inflationAdjustedCashFlow;
  }

  // Calculate payback date
  static calculatePaybackDate(
    startDate: string,
    paybackPeriod: number
  ): string {
    const start = new Date(startDate);
    const paybackDate = new Date(start);
    paybackDate.setMonth(paybackDate.getMonth() + Math.ceil(paybackPeriod));
    
    return paybackDate.toISOString().split('T')[0];
  }

  // Net Present Value calculation
  static calculateNPV(
    inputs: PaybackPeriodInputs
  ): number {
    const { initialInvestment, cashFlows, discountRate } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) {
      return -initialInvestment;
    }
    
    let npv = -initialInvestment;
    
    for (const cashFlow of cashFlows) {
      const discountFactor = Math.pow(1 + discountRate / 100, cashFlow.period / 12);
      const discountedAmount = cashFlow.type === 'inflow' ? cashFlow.amount : -cashFlow.amount;
      npv += discountedAmount / discountFactor;
    }
    
    return npv;
  }

  // Internal Rate of Return (simplified)
  static calculateIRR(
    inputs: PaybackPeriodInputs
  ): number {
    const { initialInvestment, cashFlows } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) return 0;
    
    // Simplified IRR calculation
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
      
      irr += npv > 0 ? 0.01 : -0.01;
    }
    
    return irr * 100;
  }

  // Risk-adjusted payback period
  static calculateRiskAdjustedPaybackPeriod(
    inputs: PaybackPeriodInputs,
    simplePaybackPeriod: number
  ): number {
    const { riskLevel, marketConditions, competitivePressure, regulatoryRisk } = inputs;
    
    let riskAdjustment = 1;
    
    // Risk level adjustment
    switch (riskLevel) {
      case 'high': riskAdjustment *= 1.5; break;
      case 'medium': riskAdjustment *= 1.2; break;
      case 'low': riskAdjustment *= 1.0; break;
    }
    
    // Market conditions adjustment
    switch (marketConditions) {
      case 'recession': riskAdjustment *= 1.3; break;
      case 'stable': riskAdjustment *= 1.0; break;
      case 'growth': riskAdjustment *= 0.9; break;
      case 'boom': riskAdjustment *= 0.8; break;
    }
    
    // Competitive pressure adjustment
    riskAdjustment *= (1 + competitivePressure / 20);
    
    // Regulatory risk adjustment
    riskAdjustment *= (1 + regulatoryRisk / 20);
    
    return simplePaybackPeriod * riskAdjustment;
  }

  // Calculate probability of payback
  static calculateProbabilityOfPayback(
    inputs: PaybackPeriodInputs,
    paybackPeriod: number
  ): number {
    const { projectDuration, riskLevel, marketConditions } = inputs;
    
    let baseProbability = 0.8; // 80% base probability
    
    // Adjust for project duration
    if (paybackPeriod > projectDuration * 0.8) {
      baseProbability *= 0.7;
    } else if (paybackPeriod < projectDuration * 0.3) {
      baseProbability *= 1.2;
    }
    
    // Adjust for risk level
    switch (riskLevel) {
      case 'high': baseProbability *= 0.6; break;
      case 'medium': baseProbability *= 0.8; break;
      case 'low': baseProbability *= 1.0; break;
    }
    
    // Adjust for market conditions
    switch (marketConditions) {
      case 'recession': baseProbability *= 0.7; break;
      case 'stable': baseProbability *= 1.0; break;
      case 'growth': baseProbability *= 1.1; break;
      case 'boom': baseProbability *= 1.2; break;
    }
    
    return Math.min(1, Math.max(0, baseProbability));
  }

  // Cash flow analysis
  static analyzeCashFlows(
    inputs: PaybackPeriodInputs
  ): PaybackPeriodResults['cashFlowAnalysis'] {
    const { initialInvestment, cashFlows, discountRate } = inputs;
    
    if (!cashFlows || cashFlows.length === 0) {
      return [];
    }
    
    let cumulativeCashFlow = -initialInvestment;
    let cumulativeDiscountedCashFlow = -initialInvestment;
    const analysis: PaybackPeriodResults['cashFlowAnalysis'] = [];
    
    for (const cashFlow of cashFlows) {
      const amount = cashFlow.type === 'inflow' ? cashFlow.amount : -cashFlow.amount;
      cumulativeCashFlow += amount;
      
      const discountFactor = Math.pow(1 + discountRate / 100, cashFlow.period / 12);
      const discountedAmount = amount / discountFactor;
      cumulativeDiscountedCashFlow += discountedAmount;
      
      analysis.push({
        period: cashFlow.period,
        cashFlow: amount,
        cumulativeCashFlow,
        discountedCashFlow: discountedAmount,
        cumulativeDiscountedCashFlow,
        paybackStatus: cumulativeCashFlow >= 0 ? 'paid' : 'unpaid',
        remainingBalance: Math.max(0, -cumulativeCashFlow)
      });
    }
    
    return analysis;
  }

  // Sensitivity analysis
  static performSensitivityAnalysis(
    inputs: PaybackPeriodInputs,
    simplePaybackPeriod: number
  ): PaybackPeriodResults['sensitivityAnalysis'] {
    const { bestCaseScenario, worstCaseScenario, mostLikelyScenario } = inputs;
    
    return [
      {
        scenario: 'Best Case',
        paybackPeriod: simplePaybackPeriod * (bestCaseScenario / 100),
        npv: inputs.initialInvestment * (bestCaseScenario / 100),
        probability: 0.25,
        riskLevel: 'low'
      },
      {
        scenario: 'Most Likely',
        paybackPeriod: simplePaybackPeriod * (mostLikelyScenario / 100),
        npv: inputs.initialInvestment * (mostLikelyScenario / 100),
        probability: 0.50,
        riskLevel: 'medium'
      },
      {
        scenario: 'Worst Case',
        paybackPeriod: simplePaybackPeriod * (worstCaseScenario / 100),
        npv: inputs.initialInvestment * (worstCaseScenario / 100),
        probability: 0.25,
        riskLevel: 'high'
      }
    ];
  }

  // Comparative analysis
  static performComparativeAnalysis(
    inputs: PaybackPeriodInputs,
    simplePaybackPeriod: number
  ): PaybackPeriodResults['comparativeAnalysis'] {
    const analysis: PaybackPeriodResults['comparativeAnalysis'] = [];
    
    if (inputs.industryAveragePayback) {
      analysis.push({
        metric: 'Industry Average Payback',
        yourValue: simplePaybackPeriod,
        benchmark: inputs.industryAveragePayback,
        difference: simplePaybackPeriod - inputs.industryAveragePayback,
        performance: simplePaybackPeriod <= inputs.industryAveragePayback * 0.8 ? 'excellent' :
                   simplePaybackPeriod <= inputs.industryAveragePayback * 0.9 ? 'good' :
                   simplePaybackPeriod <= inputs.industryAveragePayback ? 'average' :
                   simplePaybackPeriod <= inputs.industryAveragePayback * 1.2 ? 'below_average' : 'poor'
      });
    }
    
    if (inputs.competitorPayback) {
      analysis.push({
        metric: 'Competitor Payback',
        yourValue: simplePaybackPeriod,
        benchmark: inputs.competitorPayback,
        difference: simplePaybackPeriod - inputs.competitorPayback,
        performance: simplePaybackPeriod <= inputs.competitorPayback * 0.85 ? 'excellent' :
                   simplePaybackPeriod <= inputs.competitorPayback * 0.95 ? 'good' :
                   simplePaybackPeriod <= inputs.competitorPayback ? 'average' :
                   simplePaybackPeriod <= inputs.competitorPayback * 1.15 ? 'below_average' : 'poor'
      });
    }
    
    if (inputs.benchmarkPayback) {
      analysis.push({
        metric: 'Benchmark Payback',
        yourValue: simplePaybackPeriod,
        benchmark: inputs.benchmarkPayback,
        difference: simplePaybackPeriod - inputs.benchmarkPayback,
        performance: simplePaybackPeriod <= inputs.benchmarkPayback * 0.8 ? 'excellent' :
                   simplePaybackPeriod <= inputs.benchmarkPayback * 0.9 ? 'good' :
                   simplePaybackPeriod <= inputs.benchmarkPayback ? 'average' :
                   simplePaybackPeriod <= inputs.benchmarkPayback * 1.2 ? 'below_average' : 'poor'
      });
    }
    
    return analysis;
  }

  // Risk assessment
  static assessRisk(
    inputs: PaybackPeriodInputs
  ): PaybackPeriodResults['riskAssessment'] {
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
    
    // Long payback period
    if (inputs.projectDuration > 60) {
      riskScore += 10;
      riskFactors.push('Long project duration');
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
    inputs: PaybackPeriodInputs
  ): PaybackPeriodResults['performanceBreakdown'] {
    const breakdown: PaybackPeriodResults['performanceBreakdown'] = [];
    
    if (inputs.annualRevenue > 0) {
      breakdown.push({
        category: 'Annual Revenue',
        amount: inputs.annualRevenue,
        percentage: (inputs.annualRevenue / (inputs.annualRevenue + inputs.annualSavings)) * 100,
        impact: 'positive'
      });
    }
    
    if (inputs.annualSavings > 0) {
      breakdown.push({
        category: 'Annual Savings',
        amount: inputs.annualSavings,
        percentage: (inputs.annualSavings / (inputs.annualRevenue + inputs.annualSavings)) * 100,
        impact: 'positive'
      });
    }
    
    if (inputs.annualCosts > 0) {
      breakdown.push({
        category: 'Annual Costs',
        amount: inputs.annualCosts,
        percentage: (inputs.annualCosts / (inputs.annualRevenue + inputs.annualSavings)) * 100,
        impact: 'negative'
      });
    }
    
    if (inputs.annualExpenses > 0) {
      breakdown.push({
        category: 'Annual Expenses',
        amount: inputs.annualExpenses,
        percentage: (inputs.annualExpenses / (inputs.annualRevenue + inputs.annualSavings)) * 100,
        impact: 'negative'
      });
    }
    
    return breakdown;
  }

  // Projection analysis
  static analyzeProjections(
    inputs: PaybackPeriodInputs,
    simplePaybackPeriod: number
  ): PaybackPeriodResults['projectionAnalysis'] {
    const projections: PaybackPeriodResults['projectionAnalysis'] = [];
    const { projectionPeriod, expectedGrowthRate, expectedDecayRate, confidenceLevel } = inputs;
    
    for (let period = 1; period <= projectionPeriod; period++) {
      const growthFactor = Math.pow(1 + expectedGrowthRate / 100, period / 12);
      const decayFactor = Math.pow(1 - expectedDecayRate / 100, period / 12);
      const projectedCashFlow = inputs.annualCashFlow * growthFactor * decayFactor;
      const cumulativeProjectedCashFlow = projectedCashFlow * period;
      const projectedPaybackPeriod = inputs.initialInvestment / projectedCashFlow;
      const confidence = confidenceLevel * (1 - period / projectionPeriod);
      
      projections.push({
        period,
        projectedCashFlow: Math.round(projectedCashFlow),
        cumulativeProjectedCashFlow: Math.round(cumulativeProjectedCashFlow),
        projectedPaybackPeriod: Math.round(projectedPaybackPeriod * 100) / 100,
        confidence: Math.round(confidence)
      });
    }
    
    return projections;
  }

  // Break-even analysis
  static analyzeBreakEven(
    inputs: PaybackPeriodInputs
  ): PaybackPeriodResults['breakEvenAnalysis'] {
    const { initialInvestment, annualCashFlow, annualCosts, annualRevenue } = inputs;
    
    const contributionMargin = annualRevenue > 0 ? (annualRevenue - annualCosts) / annualRevenue : 0;
    const breakEvenPoint = contributionMargin > 0 ? initialInvestment / (annualCashFlow * contributionMargin) : Infinity;
    const breakEvenDate = this.calculatePaybackDate(inputs.startDate, breakEvenPoint);
    const marginOfSafety = annualCashFlow > 0 ? (annualCashFlow - (initialInvestment / breakEvenPoint)) / annualCashFlow * 100 : 0;
    
    return {
      breakEvenPoint: Math.round(breakEvenPoint * 100) / 100,
      breakEvenDate,
      marginOfSafety: Math.round(marginOfSafety * 100) / 100,
      contributionMargin: Math.round(contributionMargin * 100) / 100
    };
  }

  // Optimization insights
  static generateOptimizationInsights(
    inputs: PaybackPeriodInputs,
    simplePaybackPeriod: number
  ): PaybackPeriodResults['optimizationInsights'] {
    const insights: PaybackPeriodResults['optimizationInsights'] = [];
    
    // Long payback period optimization
    if (simplePaybackPeriod > 36) {
      insights.push({
        area: 'Payback Period Reduction',
        currentValue: simplePaybackPeriod,
        potentialValue: simplePaybackPeriod * 0.7,
        improvement: simplePaybackPeriod * 0.3,
        recommendations: [
          'Increase cash flow generation',
          'Reduce initial investment costs',
          'Improve operational efficiency',
          'Optimize pricing strategy'
        ]
      });
    }
    
    // Low cash flow optimization
    if (inputs.annualCashFlow < inputs.initialInvestment * 0.2) {
      insights.push({
        area: 'Cash Flow Optimization',
        currentValue: inputs.annualCashFlow,
        potentialValue: inputs.annualCashFlow * 1.5,
        improvement: inputs.annualCashFlow * 0.5,
        recommendations: [
          'Improve revenue generation',
          'Reduce operational costs',
          'Enhance market penetration',
          'Optimize resource allocation'
        ]
      });
    }
    
    // High cost optimization
    if (inputs.annualCosts > inputs.annualRevenue * 0.8) {
      insights.push({
        area: 'Cost Optimization',
        currentValue: inputs.annualCosts,
        potentialValue: inputs.annualCosts * 0.8,
        improvement: inputs.annualCosts * 0.2,
        recommendations: [
          'Streamline operations',
          'Negotiate better vendor contracts',
          'Implement automation',
          'Optimize resource allocation'
        ]
      });
    }
    
    return insights;
  }

  // Generate comprehensive report
  static generateReport(
    inputs: PaybackPeriodInputs,
    results: PaybackPeriodResults
  ): string {
    return `# Payback Period Analysis Report

## Executive Summary
Your investment analysis shows a simple payback period of ${results.simplePaybackPeriod.toFixed(1)} months with a discounted payback period of ${results.discountedPaybackPeriod.toFixed(1)} months. The risk-adjusted payback period is ${results.riskAdjustedPaybackPeriod.toFixed(1)} months, indicating ${results.simplePaybackPeriod <= 24 ? 'strong' : results.simplePaybackPeriod <= 48 ? 'moderate' : 'weak'} investment performance.

## Key Metrics
- **Simple Payback Period**: ${results.simplePaybackPeriod.toFixed(1)} months
- **Discounted Payback Period**: ${results.discountedPaybackPeriod.toFixed(1)} months
- **Risk-Adjusted Payback Period**: ${results.riskAdjustedPaybackPeriod.toFixed(1)} months
- **Payback Date**: ${results.paybackDate}
- **NPV**: $${results.netPresentValue.toLocaleString()}
- **IRR**: ${results.internalRateOfReturn.toFixed(1)}%
- **Probability of Payback**: ${(results.probabilityOfPayback * 100).toFixed(1)}%

## Investment Performance
- **Investment Type**: ${inputs.investmentType}
- **Investment Category**: ${inputs.investmentCategory}
- **Project Duration**: ${inputs.projectDuration} months
- **Initial Investment**: $${inputs.initialInvestment.toLocaleString()}
- **Annual Cash Flow**: $${inputs.annualCashFlow.toLocaleString()}

## Risk Assessment
- **Risk Level**: ${results.riskAssessment.riskLevel}
- **Risk Score**: ${results.riskAssessment.riskScore}/100
- **Risk Factors**: ${results.riskAssessment.riskFactors.join(', ')}
- **Mitigation Strategies**: ${results.riskAssessment.mitigationStrategies.join(', ')}

## Performance Breakdown
${results.performanceBreakdown.map(item => `- **${item.category}**: $${item.amount.toLocaleString()} (${item.percentage.toFixed(1)}%) - ${item.impact} impact`).join('\n')}

## Comparative Analysis
${results.comparativeAnalysis.map(comp => `- **${comp.metric}**: ${comp.yourValue.toFixed(1)} months vs ${comp.benchmark.toFixed(1)} months (${comp.difference > 0 ? '+' : ''}${comp.difference.toFixed(1)} months) - ${comp.performance} performance`).join('\n')}

## Sensitivity Analysis
${results.sensitivityAnalysis.map(sens => `- **${sens.scenario}**: ${sens.paybackPeriod.toFixed(1)} months payback, $${sens.npv.toLocaleString()} NPV (${(sens.probability * 100).toFixed(0)}% probability)`).join('\n')}

## Break-Even Analysis
- **Break-Even Point**: ${results.breakEvenAnalysis.breakEvenPoint.toFixed(1)} months
- **Break-Even Date**: ${results.breakEvenAnalysis.breakEvenDate}
- **Margin of Safety**: ${results.breakEvenAnalysis.marginOfSafety.toFixed(1)}%
- **Contribution Margin**: ${results.breakEvenAnalysis.contributionMargin.toFixed(1)}%

## Strategic Analysis
- **Strategic Value**: ${results.strategicAnalysis.strategicValue}/10
- **Operational Efficiency**: ${results.strategicAnalysis.operationalEfficiency}/10
- **Market Demand**: ${results.strategicAnalysis.marketDemand}/10
- **Competitive Advantage**: ${results.strategicAnalysis.competitiveAdvantage}/10
- **Overall Score**: ${results.strategicAnalysis.overallScore}/10

## Optimization Opportunities
${results.optimizationInsights.map(insight => `### ${insight.area}
- **Current**: ${insight.currentValue.toFixed(1)} months
- **Potential**: ${insight.potentialValue.toFixed(1)} months
- **Improvement**: ${insight.improvement.toFixed(1)} months
- **Recommendations**: ${insight.recommendations.join(', ')}`).join('\n\n')}

## Projection Analysis
${results.projectionAnalysis.slice(0, 5).map(proj => `- **Month ${proj.period}**: $${proj.projectedCashFlow.toLocaleString()} cash flow, ${proj.projectedPaybackPeriod.toFixed(1)} months payback (${proj.confidence}% confidence)`).join('\n')}

## Business Impact
${results.businessImpact.map(impact => `- **${impact.metric}**: ${impact.currentValue.toFixed(1)} → ${impact.projectedValue.toFixed(1)} (${impact.impact > 0 ? '+' : ''}${impact.impact.toFixed(1)}% in ${impact.timeframe})`).join('\n')}

## Recommendations
${results.recommendations.map(rec => `### ${rec.category}
${rec.recommendations.map(r => `- ${r}`).join('\n')}
**Expected Impact**: ${rec.expectedImpact.toFixed(1)}% improvement
**Implementation Time**: ${rec.implementationTime}`).join('\n\n')}

This comprehensive payback period analysis provides insights into your investment timeline and identifies opportunities for optimization and risk mitigation.`;
  }

  // Generate recommendations
  static generateRecommendations(
    inputs: PaybackPeriodInputs,
    results: Partial<PaybackPeriodResults>
  ): PaybackPeriodResults['recommendations'] {
    const recommendations: PaybackPeriodResults['recommendations'] = [];
    
    // Long payback period recommendations
    if (results.simplePaybackPeriod && results.simplePaybackPeriod > 36) {
      recommendations.push({
        category: 'Payback Period Reduction',
        recommendations: [
          'Increase cash flow generation',
          'Reduce initial investment costs',
          'Improve operational efficiency',
          'Optimize pricing strategy'
        ],
        priority: 'high',
        expectedImpact: 30,
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
        expectedImpact: 25,
        implementationTime: '2-4 months'
      });
    }
    
    // Cash flow optimization recommendations
    if (inputs.annualCashFlow < inputs.initialInvestment * 0.2) {
      recommendations.push({
        category: 'Cash Flow Optimization',
        recommendations: [
          'Improve revenue generation',
          'Reduce operational costs',
          'Enhance market penetration',
          'Optimize resource allocation'
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
 * Main Payback Period calculator formula
 */
export function calculatePaybackPeriod(
  inputs: PaybackPeriodInputs,
  allInputs?: Record<string, any>
): PaybackPeriodResults {
  // Basic payback calculations
  const simplePaybackPeriod = PaybackPeriodFormulas.calculateSimplePaybackPeriod(
    inputs.initialInvestment,
    inputs.annualCashFlow
  );

  const discountedPaybackPeriod = PaybackPeriodFormulas.calculateDiscountedPaybackPeriod(inputs);
  const adjustedPaybackPeriod = PaybackPeriodFormulas.calculateAdjustedPaybackPeriod(inputs);

  // Time-based metrics
  const paybackDate = PaybackPeriodFormulas.calculatePaybackDate(inputs.startDate, simplePaybackPeriod);
  const remainingInvestment = Math.max(0, inputs.initialInvestment - inputs.annualCashFlow);
  const cumulativeCashFlow = inputs.annualCashFlow;

  // Advanced financial metrics
  const netPresentValue = PaybackPeriodFormulas.calculateNPV(inputs);
  const internalRateOfReturn = PaybackPeriodFormulas.calculateIRR(inputs);
  const profitabilityIndex = netPresentValue > 0 ? (netPresentValue + inputs.initialInvestment) / inputs.initialInvestment : 0;
  const modifiedInternalRateOfReturn = internalRateOfReturn * 0.9; // Simplified MIRR

  // Risk-adjusted metrics
  const riskAdjustedPaybackPeriod = PaybackPeriodFormulas.calculateRiskAdjustedPaybackPeriod(inputs, simplePaybackPeriod);
  const probabilityOfPayback = PaybackPeriodFormulas.calculateProbabilityOfPayback(inputs, simplePaybackPeriod);
  const confidenceInterval = {
    lower: simplePaybackPeriod * 0.8,
    upper: simplePaybackPeriod * 1.2
  };

  // Additional analyses
  const cashFlowAnalysis = PaybackPeriodFormulas.analyzeCashFlows(inputs);
  const sensitivityAnalysis = PaybackPeriodFormulas.performSensitivityAnalysis(inputs, simplePaybackPeriod);
  const comparativeAnalysis = PaybackPeriodFormulas.performComparativeAnalysis(inputs, simplePaybackPeriod);
  const riskAssessment = PaybackPeriodFormulas.assessRisk(inputs);
  const performanceBreakdown = PaybackPeriodFormulas.analyzePerformanceBreakdown(inputs);
  const projectionAnalysis = PaybackPeriodFormulas.analyzeProjections(inputs, simplePaybackPeriod);
  const optimizationInsights = PaybackPeriodFormulas.generateOptimizationInsights(inputs, simplePaybackPeriod);
  const breakEvenAnalysis = PaybackPeriodFormulas.analyzeBreakEven(inputs);

  // Strategic analysis
  const strategicAnalysis = {
    strategicValue: inputs.strategicValue,
    operationalEfficiency: inputs.operationalEfficiency,
    marketDemand: inputs.marketDemand,
    competitiveAdvantage: inputs.competitiveAdvantage,
    overallScore: (inputs.strategicValue + inputs.operationalEfficiency + inputs.marketDemand + inputs.competitiveAdvantage) / 4
  };

  // Generate comprehensive results
  const results: PaybackPeriodResults = {
    simplePaybackPeriod,
    discountedPaybackPeriod,
    adjustedPaybackPeriod,
    paybackDate,
    remainingInvestment,
    cumulativeCashFlow,
    netPresentValue,
    internalRateOfReturn,
    profitabilityIndex,
    modifiedInternalRateOfReturn,
    riskAdjustedPaybackPeriod,
    confidenceInterval,
    probabilityOfPayback,
    cashFlowAnalysis,
    sensitivityAnalysis,
    comparativeAnalysis,
    riskAssessment,
    performanceBreakdown,
    projectionAnalysis,
    optimizationInsights,
    businessImpact: [],
    strategicAnalysis,
    breakEvenAnalysis,
    report: '',
    recommendations: [],
    actionItems: []
  };

  // Generate additional insights
  results.recommendations = PaybackPeriodFormulas.generateRecommendations(inputs, results);
  results.report = PaybackPeriodFormulas.generateReport(inputs, results);

  // Business impact
  results.businessImpact = [
    {
      metric: 'Payback Period',
      currentValue: simplePaybackPeriod,
      projectedValue: simplePaybackPeriod * 0.8,
      impact: -20,
      timeframe: '6 months'
    },
    {
      metric: 'Cash Flow',
      currentValue: inputs.annualCashFlow,
      projectedValue: inputs.annualCashFlow * 1.2,
      impact: 20,
      timeframe: '12 months'
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
      action: 'Implement cash flow optimization strategies',
      owner: 'Finance Team',
      timeline: '2 weeks',
      expectedOutcome: '15% cash flow improvement'
    },
    {
      priority: 'short-term',
      action: 'Develop risk mitigation plan',
      owner: 'Risk Management Team',
      timeline: '1 month',
      expectedOutcome: '20% risk reduction'
    },
    {
      priority: 'long-term',
      action: 'Establish comprehensive monitoring system',
      owner: 'Operations Team',
      timeline: '3 months',
      expectedOutcome: '25% performance improvement'
    }
  ];

  return results;
}
