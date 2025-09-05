import { Calculator } from '../../types';
import { NetOperatingIncomeInputs, NetOperatingIncomeOutputs, NetOperatingIncomeAnalysis } from './types';
import { calculateNetOperatingIncome } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';

export class NetOperatingIncomeCalculator implements Calculator<NetOperatingIncomeInputs, NetOperatingIncomeOutputs> {
  name = 'Net Operating Income (NOI) Calculator';
  description = 'Calculate and analyze net operating income for commercial and residential rental properties';
  category = 'Finance & Investment';
  tags = ['real estate', 'NOI', 'commercial', 'rental', 'property', 'income'];
  
  calculate(inputs: NetOperatingIncomeInputs): NetOperatingIncomeOutputs {
    const validation = validateNetOperatingIncomeInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const metrics = calculateNetOperatingIncome(inputs);
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      totalGrossIncome: metrics.totalGrossIncome,
      vacancyLoss: metrics.vacancyLoss,
      collectionLoss: metrics.collectionLoss,
      totalVacancyAndCollectionLoss: metrics.totalVacancyAndCollectionLoss,
      effectiveGrossIncome: metrics.effectiveGrossIncome,
      totalOperatingExpenses: metrics.totalOperatingExpenses,
      netOperatingIncome: metrics.netOperatingIncome,
      noiMargin: metrics.noiMargin,
      expenseRatio: metrics.expenseRatio,
      vacancyRate: metrics.vacancyRate,
      noiPerUnit: metrics.noiPerUnit,
      grossIncomePerUnit: metrics.grossIncomePerUnit,
      expensesPerUnit: metrics.expensesPerUnit,
      noiPerSqFt: metrics.noiPerSqFt,
      grossIncomePerSqFt: metrics.grossIncomePerSqFt,
      expensesPerSqFt: metrics.expensesPerSqFt,
      occupiedUnits: metrics.occupiedUnits,
      vacantUnits: metrics.vacantUnits,
      potentialRentalIncome: metrics.potentialRentalIncome,
      lostRentalIncome: metrics.lostRentalIncome,
      analysis,
      expenseBreakdown: metrics.expenseBreakdown,
      incomeBreakdown: metrics.incomeBreakdown,
      marketAnalysis: metrics.marketAnalysis,
      performanceMetrics: metrics.performanceMetrics,
      trendAnalysis: metrics.trendAnalysis,
      sensitivityAnalysis: metrics.sensitivityAnalysis,
      benchmarking: metrics.benchmarking
    };
  }

  private generateAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): NetOperatingIncomeAnalysis {
    return {
      noiSummary: this.generateNOISummary(inputs, metrics),
      incomeAnalysis: this.generateIncomeAnalysis(inputs, metrics),
      expenseAnalysis: this.generateExpenseAnalysis(inputs, metrics),
      occupancyAnalysis: this.generateOccupancyAnalysis(inputs, metrics),
      marketAnalysis: this.generateMarketAnalysis(inputs, metrics),
      performanceAnalysis: this.generatePerformanceAnalysis(inputs, metrics),
      trendAnalysis: this.generateTrendAnalysis(inputs, metrics),
      benchmarkingAnalysis: this.generateBenchmarkingAnalysis(inputs, metrics),
      recommendations: this.generateRecommendations(inputs, metrics),
      nextSteps: this.generateNextSteps(inputs, metrics),
      keyInsights: this.generateKeyInsights(inputs, metrics),
      decisionFactors: this.generateDecisionFactors(inputs, metrics),
      presentationPoints: this.generatePresentationPoints(inputs, metrics),
      implementationPlan: this.generateImplementationPlan(inputs, metrics),
      monitoringPlan: this.generateMonitoringPlan(inputs, metrics),
      performanceBenchmarks: this.generatePerformanceBenchmarks(inputs, metrics),
      riskAssessment: this.generateRiskAssessment(inputs, metrics),
      optimizationOpportunities: this.generateOptimizationOpportunities(inputs, metrics),
      financialProjections: this.generateFinancialProjections(inputs, metrics),
      investmentAnalysis: this.generateInvestmentAnalysis(inputs, metrics),
      operationalEfficiency: this.generateOperationalEfficiency(inputs, metrics),
      marketPositioning: this.generateMarketPositioning(inputs, metrics),
      competitiveAnalysis: this.generateCompetitiveAnalysis(inputs, metrics)
    };
  }

  private generateNOISummary(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Net Operating Income (NOI) analysis for ${inputs.propertyName} shows $${metrics.netOperatingIncome.toLocaleString()} in annual NOI with a ${metrics.noiMargin.toFixed(1)}% NOI margin. Effective gross income of $${metrics.effectiveGrossIncome.toLocaleString()} after ${metrics.totalVacancyAndCollectionLoss.toLocaleString()} in vacancy and collection losses.`;
  }

  private generateIncomeAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Income analysis: Total gross income of $${metrics.totalGrossIncome.toLocaleString()} with ${inputs.occupancyRate}% occupancy rate. Primary income from rental ($${inputs.grossRentalIncome.toLocaleString()}) with additional income from parking, laundry, and other sources totaling $${(metrics.totalGrossIncome - inputs.grossRentalIncome).toLocaleString()}.`;
  }

  private generateExpenseAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Expense analysis: Total operating expenses of $${metrics.totalOperatingExpenses.toLocaleString()} representing ${metrics.expenseRatio.toFixed(1)}% of effective gross income. Major expense categories include property taxes ($${inputs.propertyTaxes.toLocaleString()}), insurance ($${inputs.propertyInsurance.toLocaleString()}), and maintenance ($${inputs.maintenance.toLocaleString()}).`;
  }

  private generateOccupancyAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Occupancy analysis: ${metrics.occupiedUnits} occupied units out of ${inputs.numberOfUnits} total units (${inputs.occupancyRate}% occupancy rate). ${metrics.vacantUnits} vacant units resulting in $${metrics.lostRentalIncome.toLocaleString()} in lost rental income. Potential rental income of $${metrics.potentialRentalIncome.toLocaleString()} if fully occupied.`;
  }

  private generateMarketAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Market analysis: Property located in ${inputs.marketLocation} with ${inputs.marketCondition} market conditions and ${inputs.marketGrowthRate}% growth rate. Market position: ${metrics.marketAnalysis.marketPosition}. Competitive advantage: ${metrics.marketAnalysis.competitiveAdvantage}.`;
  }

  private generatePerformanceAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Performance analysis: NOI per unit of $${metrics.noiPerUnit.toLocaleString()} and NOI per square foot of $${metrics.noiPerSqFt.toFixed(2)}. Revenue growth of ${metrics.performanceMetrics.revenueGrowth.toFixed(1)}% with expense growth of ${metrics.performanceMetrics.expenseGrowth.toFixed(1)}%, resulting in ${metrics.performanceMetrics.noiGrowth.toFixed(1)}% NOI growth.`;
  }

  private generateTrendAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Trend analysis: Projected NOI growth of ${metrics.performanceMetrics.noiGrowth.toFixed(1)}% annually over ${inputs.analysisPeriod} years. Current occupancy rate of ${inputs.occupancyRate}% with potential for improvement to 95%+ through targeted marketing and property improvements.`;
  }

  private generateBenchmarkingAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    const noiMarginBenchmark = metrics.benchmarking.industryBenchmarks.find(b => b.metric === 'NOI Margin');
    const expenseRatioBenchmark = metrics.benchmarking.industryBenchmarks.find(b => b.metric === 'Expense Ratio');
    const occupancyBenchmark = metrics.benchmarking.industryBenchmarks.find(b => b.metric === 'Occupancy Rate');
    
    return `Benchmarking analysis: NOI margin of ${metrics.noiMargin.toFixed(1)}% is ${noiMarginBenchmark?.performance || 'average'} compared to industry average of ${noiMarginBenchmark?.industryAverage}%. Expense ratio of ${metrics.expenseRatio.toFixed(1)}% is ${expenseRatioBenchmark?.performance || 'average'}. Occupancy rate of ${inputs.occupancyRate}% is ${occupancyBenchmark?.performance || 'average'}.`;
  }

  private generateRecommendations(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (inputs.occupancyRate < 90) {
      recommendations.push('Implement aggressive marketing strategy to increase occupancy rate');
    }
    
    if (metrics.vacancyRate > 8) {
      recommendations.push('Review pricing strategy and property condition to reduce vacancy');
    }
    
    if (metrics.expenseRatio > 60) {
      recommendations.push('Focus on expense management and operational efficiency');
    }
    
    if (metrics.collectionLossRate > 3) {
      recommendations.push('Improve tenant screening and collection processes');
    }
    
    if (metrics.noiMargin < 50) {
      recommendations.push('Consider rent increases or expense reductions to improve NOI margin');
    }
    
    if (inputs.otherIncome < inputs.grossRentalIncome * 0.05) {
      recommendations.push('Develop additional income streams (parking, storage, amenities)');
    }
    
    return recommendations;
  }

  private generateNextSteps(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    const steps: string[] = [];
    
    if (inputs.occupancyRate < 90) {
      steps.push('Develop marketing plan to increase occupancy');
      steps.push('Review competitive pricing in the market');
    }
    
    if (metrics.expenseRatio > 60) {
      steps.push('Conduct expense audit to identify cost reduction opportunities');
      steps.push('Negotiate better rates with service providers');
    }
    
    steps.push('Implement monthly NOI tracking and reporting');
    steps.push('Set up automated rent collection system');
    steps.push('Develop preventive maintenance program');
    
    if (inputs.marketCondition === 'hot' && inputs.occupancyRate > 95) {
      steps.push('Consider rent increases to maximize revenue');
    }
    
    return steps;
  }

  private generateKeyInsights(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    const insights: string[] = [];
    
    insights.push(`NOI: $${metrics.netOperatingIncome.toLocaleString()} (${metrics.noiMargin.toFixed(1)}% margin)`);
    insights.push(`Occupancy: ${inputs.occupancyRate}% (${metrics.vacantUnits} vacant units)`);
    insights.push(`Expense ratio: ${metrics.expenseRatio.toFixed(1)}%`);
    insights.push(`NOI per unit: $${metrics.noiPerUnit.toLocaleString()}`);
    insights.push(`NOI per sq ft: $${metrics.noiPerSqFt.toFixed(2)}`);
    insights.push(`Lost rental income: $${metrics.lostRentalIncome.toLocaleString()}`);
    
    return insights;
  }

  private generateDecisionFactors(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    return [
      'NOI margin and profitability',
      'Occupancy rate and vacancy trends',
      'Expense ratio and operational efficiency',
      'Market conditions and growth prospects',
      'Property condition and maintenance needs',
      'Competitive positioning in market',
      'Income diversification opportunities',
      'Tenant quality and retention rates',
      'Property management effectiveness',
      'Capital improvement requirements'
    ];
  }

  private generatePresentationPoints(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    return [
      `Annual NOI of $${metrics.netOperatingIncome.toLocaleString()} with ${metrics.noiMargin.toFixed(1)}% margin`,
      `${inputs.occupancyRate}% occupancy rate with ${metrics.vacantUnits} vacant units`,
      `$${metrics.noiPerUnit.toLocaleString()} NOI per unit and $${metrics.noiPerSqFt.toFixed(2)} per sq ft`,
      `Expense ratio of ${metrics.expenseRatio.toFixed(1)}% vs industry average`,
      `Potential for $${metrics.lostRentalIncome.toLocaleString()} additional income at full occupancy`
    ];
  }

  private generateImplementationPlan(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Implementation plan: Focus on ${inputs.occupancyRate < 90 ? 'increasing occupancy through marketing and pricing optimization' : 'expense management and operational efficiency'}. Implement monthly NOI tracking, automated rent collection, and preventive maintenance program. ${inputs.marketCondition === 'hot' ? 'Consider rent increases to maximize revenue.' : 'Monitor market conditions for optimization opportunities.'}`;
  }

  private generateMonitoringPlan(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Monitoring plan: Track monthly NOI, occupancy rates, expense ratios, and collection rates. Review performance quarterly against industry benchmarks. Monitor market conditions and competitive positioning. Set up automated alerts for occupancy drops below 85% or expense ratio above 65%.`;
  }

  private generatePerformanceBenchmarks(inputs: NetOperatingIncomeInputs, metrics: any): Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }> {
    return [
      {
        metric: 'NOI Margin',
        target: metrics.noiMargin,
        benchmark: 60,
        industry: 'Industry average'
      },
      {
        metric: 'Expense Ratio',
        target: metrics.expenseRatio,
        benchmark: 40,
        industry: 'Industry average'
      },
      {
        metric: 'Occupancy Rate',
        target: inputs.occupancyRate,
        benchmark: 90,
        industry: 'Industry average'
      },
      {
        metric: 'NOI per Unit',
        target: metrics.noiPerUnit,
        benchmark: inputs.grossRentalIncome / inputs.numberOfUnits * 0.6,
        industry: '60% of gross rent per unit'
      }
    ];
  }

  private generateRiskAssessment(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    const risks: string[] = [];
    
    if (inputs.occupancyRate < 80) {
      risks.push('Low occupancy rate increases vacancy risk');
    }
    
    if (metrics.expenseRatio > 70) {
      risks.push('High expense ratio reduces profitability');
    }
    
    if (inputs.marketCondition === 'declining') {
      risks.push('Declining market may affect property values and rents');
    }
    
    if (metrics.collectionLossRate > 5) {
      risks.push('High collection loss rate indicates tenant quality issues');
    }
    
    if (inputs.propertyAge > 30) {
      risks.push('Aging property may require increased maintenance costs');
    }
    
    return risks;
  }

  private generateOptimizationOpportunities(inputs: NetOperatingIncomeInputs, metrics: any): string[] {
    const opportunities: string[] = [];
    
    if (inputs.occupancyRate < 95) {
      opportunities.push('Increase occupancy to 95%+ through marketing and pricing');
    }
    
    if (metrics.expenseRatio > 50) {
      opportunities.push('Reduce expenses through operational efficiency');
    }
    
    if (inputs.otherIncome < inputs.grossRentalIncome * 0.1) {
      opportunities.push('Develop additional income streams');
    }
    
    if (inputs.marketCondition === 'hot' && inputs.occupancyRate > 95) {
      opportunities.push('Implement rent increases to maximize revenue');
    }
    
    if (metrics.collectionLossRate > 2) {
      opportunities.push('Improve tenant screening to reduce collection losses');
    }
    
    return opportunities;
  }

  private generateFinancialProjections(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Financial projections: Based on ${inputs.marketGrowthRate}% market growth rate, NOI is projected to grow to $${(metrics.netOperatingIncome * Math.pow(1 + inputs.marketGrowthRate / 100, inputs.analysisPeriod)).toLocaleString()} over ${inputs.analysisPeriod} years. Occupancy rate projected to improve to 95%+ with targeted marketing efforts.`;
  }

  private generateInvestmentAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    const capRate = inputs.propertyValue > 0 ? (metrics.netOperatingIncome / inputs.propertyValue) * 100 : 0;
    return `Investment analysis: Property generates ${capRate.toFixed(2)}% cap rate based on current NOI of $${metrics.netOperatingIncome.toLocaleString()} and property value of $${inputs.propertyValue.toLocaleString()}. NOI per dollar invested is $${(metrics.netOperatingIncome / inputs.propertyValue).toFixed(4)}.`;
  }

  private generateOperationalEfficiency(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Operational efficiency: Expense ratio of ${metrics.expenseRatio.toFixed(1)}% indicates ${metrics.expenseRatio < 50 ? 'efficient' : metrics.expenseRatio < 65 ? 'moderate' : 'inefficient'} operations. Key efficiency metrics: $${metrics.expensesPerUnit.toLocaleString()} expenses per unit and $${metrics.expensesPerSqFt.toFixed(2)} expenses per square foot.`;
  }

  private generateMarketPositioning(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Market positioning: Property positioned in ${inputs.marketCondition} market with ${inputs.occupancyRate}% occupancy rate. Market analysis shows ${metrics.marketAnalysis.marketPosition}. Competitive advantage includes ${metrics.marketAnalysis.competitiveAdvantage}.`;
  }

  private generateCompetitiveAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): string {
    return `Competitive analysis: Compared to ${metrics.benchmarking.peerComparison.length} comparable properties, this property shows ${metrics.noiMargin > 60 ? 'above-average' : 'below-average'} NOI margin of ${metrics.noiMargin.toFixed(1)}%. Occupancy rate of ${inputs.occupancyRate}% is ${inputs.occupancyRate > 90 ? 'competitive' : 'below market average'}.`;
  }
}