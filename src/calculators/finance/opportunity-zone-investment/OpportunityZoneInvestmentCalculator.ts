import { Calculator } from '../../types';
import { OpportunityZoneInvestmentInputs, OpportunityZoneInvestmentOutputs, OpportunityZoneInvestmentAnalysis } from './types';
import { calculateOpportunityZoneInvestment } from './formulas';
import { validateOpportunityZoneInvestmentInputs } from './validation';

export class OpportunityZoneInvestmentCalculator implements Calculator<OpportunityZoneInvestmentInputs, OpportunityZoneInvestmentOutputs> {
  name = 'Opportunity Zone Investment ROI Calculator';
  description = 'Calculate ROI and tax benefits for Opportunity Zone investments including deferral, exclusion, and basis step-up benefits';
  category = 'Finance & Investment';
  tags = ['opportunity zone', 'tax benefits', 'real estate', 'investment', 'ROI', 'tax deferral', 'tax exclusion'];
  
  calculate(inputs: OpportunityZoneInvestmentInputs): OpportunityZoneInvestmentOutputs {
    const validation = validateOpportunityZoneInvestmentInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const metrics = calculateOpportunityZoneInvestment(inputs);
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      totalReturn: metrics.totalReturn,
      internalRateOfReturn: metrics.internalRateOfReturn,
      totalTaxBenefit: metrics.totalTaxBenefit,
      afterTaxReturn: metrics.afterTaxReturn,
      riskScore: metrics.riskScore,
      cashOnCashReturn: metrics.cashOnCashReturn,
      equityMultiple: metrics.equityMultiple,
      netPresentValue: metrics.netPresentValue,
      analysis,
      taxDeferralBenefit: metrics.taxDeferralBenefit,
      taxExclusionBenefit: metrics.taxExclusionBenefit,
      basisStepUpBenefit: metrics.basisStepUpBenefit,
      effectiveTaxRate: metrics.effectiveTaxRate,
      annualizedReturn: metrics.annualizedReturn,
      paybackPeriod: metrics.paybackPeriod,
      annualCashFlow: metrics.annualCashFlow,
      totalCashFlow: metrics.totalCashFlow,
      taxSavings: metrics.taxSavings,
      taxEfficiency: metrics.taxEfficiency,
      taxAdvantage: metrics.taxAdvantage,
      probabilityOfSuccess: metrics.probabilityOfSuccess,
      worstCaseScenario: metrics.worstCaseScenario,
      bestCaseScenario: metrics.bestCaseScenario,
      comparisonAnalysis: metrics.comparisonAnalysis,
      sensitivityMatrix: metrics.sensitivityMatrix,
      scenarios: metrics.scenarios,
      timelineAnalysis: metrics.timelineAnalysis,
      marketAnalysis: metrics.marketAnalysis,
      performanceBenchmarks: metrics.performanceBenchmarks
    };
  }

  private generateAnalysis(inputs: OpportunityZoneInvestmentInputs, metrics: any): OpportunityZoneInvestmentAnalysis {
    const investmentRating = this.calculateInvestmentRating(metrics);
    const taxBenefitRating = this.calculateTaxBenefitRating(metrics);
    const recommendation = this.generateRecommendation(metrics, investmentRating, taxBenefitRating);

    return {
      investmentRating,
      taxBenefitRating,
      recommendation,
      keyStrengths: this.identifyStrengths(inputs, metrics),
      keyWeaknesses: this.identifyWeaknesses(inputs, metrics),
      valueFactors: this.identifyValueFactors(inputs, metrics),
      opportunities: this.identifyOpportunities(inputs, metrics),
      investmentSummary: this.generateInvestmentSummary(inputs, metrics),
      returnAnalysis: this.generateReturnAnalysis(metrics),
      cashFlowAnalysis: this.generateCashFlowAnalysis(metrics),
      taxBenefitSummary: this.generateTaxBenefitSummary(metrics),
      deferralAnalysis: this.generateDeferralAnalysis(metrics),
      exclusionAnalysis: this.generateExclusionAnalysis(metrics),
      basisStepUpAnalysis: this.generateBasisStepUpAnalysis(metrics),
      riskAssessment: this.generateRiskAssessment(inputs, metrics),
      marketRisk: this.assessMarketRisk(inputs, metrics),
      regulatoryRisk: this.assessRegulatoryRisk(inputs, metrics),
      liquidityRisk: this.assessLiquidityRisk(inputs, metrics),
      developmentRisk: this.assessDevelopmentRisk(inputs, metrics),
      marketAnalysis: this.generateMarketAnalysis(inputs, metrics),
      opportunityZoneAnalysis: this.generateOpportunityZoneAnalysis(inputs, metrics),
      competitiveAnalysis: this.generateCompetitiveAnalysis(inputs, metrics),
      comparisonSummary: this.generateComparisonSummary(metrics),
      traditionalComparison: this.generateTraditionalComparison(metrics),
      advantageAnalysis: this.generateAdvantageAnalysis(metrics),
      timelineSummary: this.generateTimelineSummary(inputs, metrics),
      benefitTimeline: this.generateBenefitTimeline(inputs, metrics),
      exitStrategy: this.generateExitStrategy(inputs, metrics),
      investmentRecommendations: this.generateInvestmentRecommendations(inputs, metrics),
      optimizationSuggestions: this.generateOptimizationSuggestions(inputs, metrics),
      riskMitigation: this.generateRiskMitigation(inputs, metrics),
      implementationPlan: this.generateImplementationPlan(inputs, metrics),
      nextSteps: this.generateNextSteps(inputs, metrics),
      timeline: this.generateTimeline(inputs, metrics),
      monitoringPlan: this.generateMonitoringPlan(inputs, metrics),
      keyMetrics: this.generateKeyMetrics(metrics),
      reviewSchedule: this.generateReviewSchedule(inputs, metrics),
      riskManagement: this.generateRiskManagement(inputs, metrics),
      mitigationStrategies: this.generateMitigationStrategies(inputs, metrics),
      contingencyPlans: this.generateContingencyPlans(inputs, metrics),
      performanceBenchmarks: metrics.performanceBenchmarks,
      decisionRecommendation: this.generateDecisionRecommendation(metrics, recommendation),
      presentationPoints: this.generatePresentationPoints(inputs, metrics),
      decisionFactors: this.generateDecisionFactors(inputs, metrics)
    };
  }

  private calculateInvestmentRating(metrics: any): 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' {
    const irr = metrics.internalRateOfReturn;
    const riskScore = metrics.riskScore;
    
    if (irr >= 0.15 && riskScore <= 0.3) return 'Excellent';
    if (irr >= 0.12 && riskScore <= 0.4) return 'Good';
    if (irr >= 0.08 && riskScore <= 0.6) return 'Average';
    if (irr >= 0.05 && riskScore <= 0.8) return 'Poor';
    return 'Very Poor';
  }

  private calculateTaxBenefitRating(metrics: any): 'High Benefit' | 'Good Benefit' | 'Moderate Benefit' | 'Low Benefit' | 'No Benefit' {
    const taxBenefit = metrics.totalTaxBenefit;
    const investmentAmount = 1000000; // Default for rating calculation
    
    const benefitPercentage = (taxBenefit / investmentAmount) * 100;
    
    if (benefitPercentage >= 20) return 'High Benefit';
    if (benefitPercentage >= 15) return 'Good Benefit';
    if (benefitPercentage >= 10) return 'Moderate Benefit';
    if (benefitPercentage >= 5) return 'Low Benefit';
    return 'No Benefit';
  }

  private generateRecommendation(metrics: any, investmentRating: string, taxBenefitRating: string): 'Proceed' | 'Consider' | 'Reconsider' | 'Requires Review' {
    if (investmentRating === 'Excellent' && taxBenefitRating === 'High Benefit') return 'Proceed';
    if (investmentRating === 'Good' && taxBenefitRating !== 'No Benefit') return 'Consider';
    if (investmentRating === 'Average' && taxBenefitRating === 'High Benefit') return 'Consider';
    if (investmentRating === 'Poor' || investmentRating === 'Very Poor') return 'Reconsider';
    return 'Requires Review';
  }

  private identifyStrengths(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const strengths: string[] = [];
    
    if (metrics.totalTaxBenefit > 0) {
      strengths.push('Significant tax benefits available through Opportunity Zone program');
    }
    
    if (metrics.internalRateOfReturn > 0.12) {
      strengths.push('Strong projected returns above market average');
    }
    
    if (inputs.opportunityZoneTier === 'tier_1') {
      strengths.push('Located in high-priority Opportunity Zone with maximum benefits');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      strengths.push('Favorable market conditions with growth potential');
    }
    
    if (metrics.cashOnCashReturn > 0.08) {
      strengths.push('Strong cash flow generation potential');
    }
    
    return strengths;
  }

  private identifyWeaknesses(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const weaknesses: string[] = [];
    
    if (metrics.riskScore > 0.6) {
      weaknesses.push('High risk profile requires careful consideration');
    }
    
    if (inputs.marketCondition === 'declining') {
      weaknesses.push('Challenging market conditions may impact returns');
    }
    
    if (inputs.liquidityRisk === 'high') {
      weaknesses.push('Limited liquidity may restrict exit options');
    }
    
    if (metrics.paybackPeriod > 10) {
      weaknesses.push('Long payback period may not suit all investors');
    }
    
    if (inputs.regulatoryRisk === 'high') {
      weaknesses.push('Regulatory changes could impact tax benefits');
    }
    
    return weaknesses;
  }

  private identifyValueFactors(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const factors: string[] = [];
    
    factors.push(`Tax deferral benefit: $${metrics.taxDeferralBenefit.toLocaleString()}`);
    factors.push(`Tax exclusion benefit: $${metrics.taxExclusionBenefit.toLocaleString()}`);
    factors.push(`Basis step-up benefit: $${metrics.basisStepUpBenefit.toLocaleString()}`);
    factors.push(`Projected IRR: ${(metrics.internalRateOfReturn * 100).toFixed(1)}%`);
    factors.push(`Cash-on-cash return: ${(metrics.cashOnCashReturn * 100).toFixed(1)}%`);
    
    return factors;
  }

  private identifyOpportunities(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const opportunities: string[] = [];
    
    if (inputs.marketGrowthRate > 0.05) {
      opportunities.push('Market growth provides upside potential');
    }
    
    if (inputs.opportunityZoneTier === 'tier_1') {
      opportunities.push('Maximum Opportunity Zone benefits available');
    }
    
    if (metrics.taxEfficiency > 0.8) {
      opportunities.push('High tax efficiency maximizes after-tax returns');
    }
    
    if (inputs.investmentType === 'development') {
      opportunities.push('Development potential may create additional value');
    }
    
    return opportunities;
  }

  private generateInvestmentSummary(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `This Opportunity Zone investment in ${inputs.opportunityZoneLocation} offers a projected IRR of ${(metrics.internalRateOfReturn * 100).toFixed(1)}% with total tax benefits of $${metrics.totalTaxBenefit.toLocaleString()}. The investment structure provides ${inputs.investmentStructure} exposure to ${inputs.investmentType} assets with a ${inputs.investmentPeriod}-year hold period.`;
  }

  private generateReturnAnalysis(metrics: any): string {
    return `The investment projects strong returns with an IRR of ${(metrics.internalRateOfReturn * 100).toFixed(1)}% and cash-on-cash return of ${(metrics.cashOnCashReturn * 100).toFixed(1)}%. The equity multiple of ${metrics.equityMultiple.toFixed(2)}x indicates significant value creation potential over the investment period.`;
  }

  private generateCashFlowAnalysis(metrics: any): string {
    return `Annual cash flow of $${metrics.annualCashFlow.toLocaleString()} provides steady income, with total cash flow of $${metrics.totalCashFlow.toLocaleString()} over the investment period. The payback period of ${metrics.paybackPeriod.toFixed(1)} years indicates reasonable capital recovery timeline.`;
  }

  private generateTaxBenefitSummary(metrics: any): string {
    return `Total tax benefits of $${metrics.totalTaxBenefit.toLocaleString()} include deferral benefits of $${metrics.taxDeferralBenefit.toLocaleString()}, exclusion benefits of $${metrics.taxExclusionBenefit.toLocaleString()}, and basis step-up benefits of $${metrics.basisStepUpBenefit.toLocaleString()}. This results in an effective tax rate of ${(metrics.effectiveTaxRate * 100).toFixed(1)}%.`;
  }

  private generateDeferralAnalysis(metrics: any): string {
    return `Tax deferral provides immediate cash flow benefit of $${metrics.taxDeferralBenefit.toLocaleString()} by allowing investors to defer capital gains taxes until 2026, improving near-term liquidity and investment capacity.`;
  }

  private generateExclusionAnalysis(metrics: any): string {
    return `Tax exclusion benefit of $${metrics.taxExclusionBenefit.toLocaleString()} is achieved through the 10-year hold period, providing permanent tax savings on appreciation and eliminating capital gains taxes on the investment growth.`;
  }

  private generateBasisStepUpAnalysis(metrics: any): string {
    return `Basis step-up benefit of $${metrics.basisStepUpBenefit.toLocaleString()} is achieved through the 5-year hold period, reducing the tax burden on the original gain by 10% and providing additional tax efficiency.`;
  }

  private generateRiskAssessment(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Overall risk score of ${(metrics.riskScore * 100).toFixed(0)}% reflects ${inputs.marketRisk} market risk, ${inputs.regulatoryRisk} regulatory risk, ${inputs.liquidityRisk} liquidity risk, and ${inputs.developmentRisk} development risk. The probability of success is ${(metrics.probabilityOfSuccess * 100).toFixed(0)}%.`;
  }

  private assessMarketRisk(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Market risk is ${inputs.marketRisk} due to ${inputs.marketCondition} market conditions in ${inputs.marketLocation}. Market growth rate of ${(inputs.marketGrowthRate * 100).toFixed(1)}% provides ${inputs.marketGrowthRate > 0.05 ? 'strong' : 'moderate'} growth potential.`;
  }

  private assessRegulatoryRisk(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Regulatory risk is ${inputs.regulatoryRisk} as Opportunity Zone regulations are subject to potential changes. Current tax benefits are secured through existing legislation, but future modifications could impact program benefits.`;
  }

  private assessLiquidityRisk(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Liquidity risk is ${inputs.liquidityRisk} due to the ${inputs.investmentPeriod}-year hold period requirement for maximum tax benefits. Exit options may be limited during the investment period.`;
  }

  private assessDevelopmentRisk(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Development risk is ${inputs.developmentRisk} for ${inputs.investmentType} investments. ${inputs.investmentType === 'development' ? 'Development projects carry additional execution and market risks.' : 'Established assets provide more predictable risk profiles.'}`;
  }

  private generateMarketAnalysis(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `The ${inputs.marketLocation} market shows ${inputs.marketCondition} conditions with ${(inputs.marketGrowthRate * 100).toFixed(1)}% growth rate. Comparable investments show average ROI of ${metrics.comparisonAnalysis.find(c => c.metric === 'ROI')?.traditional || 0}%, providing context for this investment's projected returns.`;
  }

  private generateOpportunityZoneAnalysis(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Located in ${inputs.opportunityZoneTier} Opportunity Zone in ${inputs.opportunityZoneLocation}, this investment qualifies for maximum tax benefits including deferral, exclusion, and basis step-up provisions. The zone designation provides additional economic development incentives.`;
  }

  private generateCompetitiveAnalysis(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Compared to traditional investments, this Opportunity Zone investment provides ${metrics.taxAdvantage > 0 ? 'significant' : 'moderate'} tax advantages. The after-tax return of ${(metrics.afterTaxReturn * 100).toFixed(1)}% compares favorably to traditional investment alternatives.`;
  }

  private generateComparisonSummary(metrics: any): string {
    return `Opportunity Zone investment provides ${metrics.taxAdvantage > 0 ? 'superior' : 'comparable'} returns compared to traditional investments, with total tax benefits of $${metrics.totalTaxBenefit.toLocaleString()} creating significant value for investors.`;
  }

  private generateTraditionalComparison(metrics: any): string {
    return `Traditional investment would generate ${(metrics.comparisonAnalysis.find(c => c.metric === 'After-Tax Return')?.traditional * 100 || 0).toFixed(1)}% after-tax return, while this Opportunity Zone investment provides ${(metrics.afterTaxReturn * 100).toFixed(1)}% after-tax return, representing a ${((metrics.afterTaxReturn - (metrics.comparisonAnalysis.find(c => c.metric === 'After-Tax Return')?.traditional || 0)) * 100).toFixed(1)}% advantage.`;
  }

  private generateAdvantageAnalysis(metrics: any): string {
    return `The primary advantage is the tax benefit package worth $${metrics.totalTaxBenefit.toLocaleString()}, which includes deferral, exclusion, and basis step-up benefits. This creates a tax-efficient investment structure that maximizes after-tax returns.`;
  }

  private generateTimelineSummary(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Investment timeline spans ${inputs.investmentPeriod} years with tax benefits phased over the hold period. Deferral benefits are realized immediately, basis step-up at 5 years, and exclusion benefits at 10 years.`;
  }

  private generateBenefitTimeline(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Tax benefits are realized in phases: immediate deferral benefit, 10% basis step-up at 5 years, and full exclusion benefit at 10 years. This creates a structured benefit realization timeline.`;
  }

  private generateExitStrategy(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Optimal exit strategy involves holding for the full ${inputs.investmentPeriod}-year period to maximize tax benefits. Exit options include sale, refinancing, or 1031 exchange, with tax-free appreciation after 10 years.`;
  }

  private generateInvestmentRecommendations(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (metrics.internalRateOfReturn > 0.12) {
      recommendations.push('Proceed with investment due to strong projected returns');
    }
    
    if (metrics.totalTaxBenefit > 100000) {
      recommendations.push('Maximize tax benefits through proper structuring');
    }
    
    if (inputs.opportunityZoneTier === 'tier_1') {
      recommendations.push('Leverage maximum Opportunity Zone benefits available');
    }
    
    if (metrics.riskScore > 0.6) {
      recommendations.push('Implement risk mitigation strategies');
    }
    
    return recommendations;
  }

  private generateOptimizationSuggestions(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const suggestions: string[] = [];
    
    suggestions.push('Consider longer hold period to maximize tax benefits');
    suggestions.push('Optimize investment structure for tax efficiency');
    suggestions.push('Implement proper documentation for tax compliance');
    suggestions.push('Consider additional Opportunity Zone investments for diversification');
    
    return suggestions;
  }

  private generateRiskMitigation(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    const mitigation: string[] = [];
    
    if (inputs.marketRisk === 'high') {
      mitigation.push('Diversify across multiple markets and asset types');
    }
    
    if (inputs.regulatoryRisk === 'high') {
      mitigation.push('Monitor regulatory changes and maintain compliance');
    }
    
    if (inputs.liquidityRisk === 'high') {
      mitigation.push('Maintain adequate liquidity reserves');
    }
    
    if (inputs.developmentRisk === 'high') {
      mitigation.push('Implement strong project management and oversight');
    }
    
    return mitigation;
  }

  private generateImplementationPlan(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Implementation involves: 1) Complete due diligence on Opportunity Zone designation, 2) Structure investment for maximum tax benefits, 3) Execute investment within 180 days of gain recognition, 4) Implement monitoring and reporting systems, 5) Plan for optimal exit timing.`;
  }

  private generateNextSteps(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    return [
      'Complete detailed due diligence on Opportunity Zone designation',
      'Finalize investment structure and legal documentation',
      'Execute investment within required timeframe',
      'Implement monitoring and reporting systems',
      'Plan for tax benefit optimization'
    ];
  }

  private generateTimeline(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Investment timeline: Immediate execution required within 180 days of gain recognition, 5-year basis step-up benefit, 10-year exclusion benefit, and ${inputs.investmentPeriod}-year optimal hold period.`;
  }

  private generateMonitoringPlan(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Monitoring plan includes quarterly performance reviews, annual tax benefit assessments, market condition updates, and regulatory change monitoring. Key metrics to track include cash flow, appreciation, and tax benefit realization.`;
  }

  private generateKeyMetrics(metrics: any): string[] {
    return [
      'Internal Rate of Return (IRR)',
      'Cash-on-Cash Return',
      'Total Tax Benefits',
      'After-Tax Return',
      'Risk Score',
      'Equity Multiple',
      'Payback Period'
    ];
  }

  private generateReviewSchedule(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Review schedule: Quarterly performance reviews, annual tax benefit assessments, and comprehensive review at 5-year and 10-year milestones for tax benefit optimization.`;
  }

  private generateRiskManagement(inputs: OpportunityZoneInvestmentInputs, metrics: any): string {
    return `Risk management strategy includes diversification, regular monitoring, compliance oversight, and contingency planning. Risk tolerance should align with the ${metrics.riskScore > 0.6 ? 'higher' : 'moderate'} risk profile of this investment.`;
  }

  private generateMitigationStrategies(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    return [
      'Diversify across multiple Opportunity Zone investments',
      'Maintain strong local market knowledge',
      'Implement robust project management',
      'Monitor regulatory changes closely',
      'Maintain adequate liquidity reserves'
    ];
  }

  private generateContingencyPlans(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    return [
      'Plan for early exit if market conditions deteriorate',
      'Prepare for regulatory changes affecting tax benefits',
      'Maintain alternative exit strategies',
      'Consider partial liquidation options',
      'Plan for tax benefit recapture scenarios'
    ];
  }

  private generateDecisionRecommendation(metrics: any, recommendation: string): string {
    return `Based on the analysis, the recommendation is to ${recommendation.toLowerCase()}. The investment offers ${metrics.internalRateOfReturn > 0.12 ? 'strong' : 'moderate'} returns with ${metrics.totalTaxBenefit > 100000 ? 'significant' : 'moderate'} tax benefits, making it ${recommendation === 'Proceed' ? 'an attractive' : 'a consideration for'} Opportunity Zone investment.`;
  }

  private generatePresentationPoints(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    return [
      `Projected IRR of ${(metrics.internalRateOfReturn * 100).toFixed(1)}%`,
      `Total tax benefits of $${metrics.totalTaxBenefit.toLocaleString()}`,
      `Cash-on-cash return of ${(metrics.cashOnCashReturn * 100).toFixed(1)}%`,
      `Located in ${inputs.opportunityZoneTier} Opportunity Zone`,
      `${inputs.investmentPeriod}-year investment horizon`,
      `Risk score of ${(metrics.riskScore * 100).toFixed(0)}%`
    ];
  }

  private generateDecisionFactors(inputs: OpportunityZoneInvestmentInputs, metrics: any): string[] {
    return [
      'Tax benefit optimization potential',
      'Market growth and appreciation prospects',
      'Risk tolerance and investment horizon',
      'Liquidity requirements and constraints',
      'Regulatory and compliance considerations',
      'Portfolio diversification benefits'
    ];
  }
}