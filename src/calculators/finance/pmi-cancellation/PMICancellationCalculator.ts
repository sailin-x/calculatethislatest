import { Calculator } from '../../types';
import { PMICancellationInputs, PMICancellationOutputs, PMICancellationAnalysis } from './types';
import { calculatePMICancellation } from './formulas';
import { validatePMICancellationInputs } from './validation';

export class PMICancellationCalculator implements Calculator<PMICancellationInputs, PMICancellationOutputs> {
  name = 'PMI Cancellation Calculator';
  description = 'Calculate PMI cancellation eligibility, savings, and optimal timing for mortgage insurance removal';
  category = 'Finance & Investment';
  tags = ['PMI', 'mortgage insurance', 'cancellation', 'savings', 'LTV', 'equity', 'mortgage'];
  
  calculate(inputs: PMICancellationInputs): PMICancellationOutputs {
    const validation = validatePMICancellationInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const metrics = calculatePMICancellation(inputs);
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      pmiEligibility: metrics.pmiEligibility,
      currentLtvRatio: metrics.currentLtvRatio,
      monthlyPMISavings: metrics.monthlyPMISavings,
      totalPMISavings: metrics.pmiSavings,
      breakEvenMonths: metrics.breakEvenMonths,
      automaticCancellationDate: metrics.automaticCancellationDate,
      requestCancellationDate: metrics.requestCancellationDate,
      riskScore: metrics.riskScore,
      analysis,
      requiredLtvRatio: metrics.requiredLtvRatio,
      ltvGap: metrics.ltvGap,
      totalPMIPaid: metrics.totalPMIPaid,
      remainingPMICost: metrics.remainingPMICost,
      monthsToAutomaticCancellation: metrics.monthsToAutomaticCancellation,
      monthsToRequestCancellation: metrics.monthsToRequestCancellation,
      monthlyPayment: metrics.monthlyPayment,
      monthlyPaymentWithoutPMI: metrics.monthlyPaymentWithoutPMI,
      paymentReduction: metrics.paymentReduction,
      totalPaymentSavings: metrics.totalPaymentSavings,
      currentEquity: metrics.currentEquity,
      equityPercentage: metrics.equityPercentage,
      equityGrowth: metrics.equityGrowth,
      equityRequired: metrics.equityRequired,
      breakEvenPoint: metrics.breakEvenPoint,
      breakEvenCost: metrics.breakEvenCost,
      netSavings: metrics.netSavings,
      sensitivityMatrix: metrics.sensitivityMatrix,
      scenarios: metrics.scenarios,
      timelineAnalysis: metrics.timelineAnalysis,
      comparisonAnalysis: metrics.comparisonAnalysis,
      probabilityOfCancellation: metrics.probabilityOfCancellation,
      worstCaseScenario: metrics.worstCaseScenario,
      bestCaseScenario: metrics.bestCaseScenario,
      marketAnalysis: metrics.marketAnalysis
    };
  }

  private generateAnalysis(inputs: PMICancellationInputs, metrics: any): PMICancellationAnalysis {
    const cancellationRating = this.calculateCancellationRating(metrics);
    const savingsRating = this.calculateSavingsRating(metrics);
    const recommendation = this.generateRecommendation(metrics, cancellationRating, savingsRating);

    return {
      cancellationRating,
      savingsRating,
      recommendation,
      keyStrengths: this.identifyStrengths(inputs, metrics),
      keyWeaknesses: this.identifyWeaknesses(inputs, metrics),
      eligibilityFactors: this.identifyEligibilityFactors(inputs, metrics),
      opportunities: this.identifyOpportunities(inputs, metrics),
      cancellationSummary: this.generateCancellationSummary(inputs, metrics),
      eligibilityAnalysis: this.generateEligibilityAnalysis(metrics),
      timelineAnalysis: this.generateTimelineAnalysis(metrics),
      costSummary: this.generateCostSummary(metrics),
      savingsAnalysis: this.generateSavingsAnalysis(metrics),
      breakEvenAnalysis: this.generateBreakEvenAnalysis(metrics),
      equitySummary: this.generateEquitySummary(metrics),
      equityGrowthAnalysis: this.generateEquityGrowthAnalysis(metrics),
      ltvAnalysis: this.generateLTVAnalysis(metrics),
      paymentSummary: this.generatePaymentSummary(metrics),
      reductionAnalysis: this.generateReductionAnalysis(metrics),
      cashFlowAnalysis: this.generateCashFlowAnalysis(metrics),
      marketSummary: this.generateMarketSummary(inputs, metrics),
      appreciationAnalysis: this.generateAppreciationAnalysis(inputs, metrics),
      comparableAnalysis: this.generateComparableAnalysis(inputs, metrics),
      riskAssessment: this.generateRiskAssessment(inputs, metrics),
      marketRisk: this.assessMarketRisk(inputs, metrics),
      appraisalRisk: this.assessAppraisalRisk(inputs, metrics),
      timingRisk: this.assessTimingRisk(inputs, metrics),
      cancellationRecommendations: this.generateCancellationRecommendations(inputs, metrics),
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

  private calculateCancellationRating(metrics: any): 'Eligible Now' | 'Eligible Soon' | 'Not Yet Eligible' | 'Requires Action' | 'Not Eligible' {
    if (metrics.pmiEligibility) {
      return 'Eligible Now';
    }
    
    if (metrics.monthsToRequestCancellation <= 6) {
      return 'Eligible Soon';
    }
    
    if (metrics.monthsToRequestCancellation <= 12) {
      return 'Not Yet Eligible';
    }
    
    if (metrics.ltvGap <= 0.05) {
      return 'Requires Action';
    }
    
    return 'Not Eligible';
  }

  private calculateSavingsRating(metrics: any): 'High Savings' | 'Good Savings' | 'Moderate Savings' | 'Low Savings' | 'No Savings' {
    const monthlySavings = metrics.monthlyPMISavings;
    
    if (monthlySavings >= 200) return 'High Savings';
    if (monthlySavings >= 100) return 'Good Savings';
    if (monthlySavings >= 50) return 'Moderate Savings';
    if (monthlySavings > 0) return 'Low Savings';
    return 'No Savings';
  }

  private generateRecommendation(metrics: any, cancellationRating: string, savingsRating: string): 'Cancel Now' | 'Request Cancellation' | 'Wait' | 'Refinance' | 'Requires Review' {
    if (cancellationRating === 'Eligible Now') {
      return 'Cancel Now';
    }
    
    if (cancellationRating === 'Eligible Soon' && savingsRating !== 'No Savings') {
      return 'Request Cancellation';
    }
    
    if (cancellationRating === 'Not Yet Eligible' && metrics.monthsToRequestCancellation <= 12) {
      return 'Wait';
    }
    
    if (metrics.breakEvenMonths > 24) {
      return 'Refinance';
    }
    
    return 'Requires Review';
  }

  private identifyStrengths(inputs: PMICancellationInputs, metrics: any): string[] {
    const strengths: string[] = [];
    
    if (metrics.pmiEligibility) {
      strengths.push('Currently eligible for PMI cancellation');
    }
    
    if (metrics.monthlyPMISavings > 100) {
      strengths.push('Significant monthly savings available');
    }
    
    if (metrics.currentLtvRatio < 0.8) {
      strengths.push('Strong equity position with LTV below 80%');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      strengths.push('Favorable market conditions supporting property appreciation');
    }
    
    if (metrics.breakEvenMonths < 12) {
      strengths.push('Quick break-even point for cancellation costs');
    }
    
    return strengths;
  }

  private identifyWeaknesses(inputs: PMICancellationInputs, metrics: any): string[] {
    const weaknesses: string[] = [];
    
    if (!metrics.pmiEligibility && metrics.monthsToRequestCancellation > 24) {
      weaknesses.push('Long timeline to PMI cancellation eligibility');
    }
    
    if (metrics.monthlyPMISavings < 50) {
      weaknesses.push('Limited monthly savings from PMI cancellation');
    }
    
    if (metrics.currentLtvRatio > 0.9) {
      weaknesses.push('High LTV ratio limits cancellation options');
    }
    
    if (inputs.marketCondition === 'declining') {
      weaknesses.push('Declining market conditions may delay equity growth');
    }
    
    if (metrics.breakEvenMonths > 24) {
      weaknesses.push('Long break-even period for cancellation costs');
    }
    
    return weaknesses;
  }

  private identifyEligibilityFactors(inputs: PMICancellationInputs, metrics: any): string[] {
    const factors: string[] = [];
    
    factors.push(`Current LTV: ${(metrics.currentLtvRatio * 100).toFixed(1)}%`);
    factors.push(`Required LTV: ${(metrics.requiredLtvRatio * 100).toFixed(1)}%`);
    factors.push(`LTV Gap: ${(metrics.ltvGap * 100).toFixed(1)}%`);
    factors.push(`Current Equity: $${metrics.currentEquity.toLocaleString()}`);
    factors.push(`Equity Percentage: ${(metrics.equityPercentage * 100).toFixed(1)}%`);
    
    return factors;
  }

  private identifyOpportunities(inputs: PMICancellationInputs, metrics: any): string[] {
    const opportunities: string[] = [];
    
    if (inputs.propertyAppreciationRate > 0.03) {
      opportunities.push('Strong property appreciation rate supports equity growth');
    }
    
    if (metrics.monthsToRequestCancellation <= 12) {
      opportunities.push('Near-term eligibility for PMI cancellation');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      opportunities.push('Market growth provides additional equity appreciation');
    }
    
    if (metrics.monthlyPMISavings > 150) {
      opportunities.push('High monthly savings potential from cancellation');
    }
    
    return opportunities;
  }

  private generateCancellationSummary(inputs: PMICancellationInputs, metrics: any): string {
    return `PMI cancellation analysis shows ${metrics.pmiEligibility ? 'current eligibility' : 'eligibility in ' + metrics.monthsToRequestCancellation + ' months'} with potential monthly savings of $${metrics.monthlyPMISavings.toLocaleString()}. Current LTV ratio is ${(metrics.currentLtvRatio * 100).toFixed(1)}% with a gap of ${(metrics.ltvGap * 100).toFixed(1)}% to reach the required ${(metrics.requiredLtvRatio * 100).toFixed(1)}% threshold.`;
  }

  private generateEligibilityAnalysis(metrics: any): string {
    return `PMI cancellation eligibility is ${metrics.pmiEligibility ? 'achieved' : 'pending'} based on LTV ratio requirements. Current LTV of ${(metrics.currentLtvRatio * 100).toFixed(1)}% ${metrics.pmiEligibility ? 'meets' : 'is ' + (metrics.ltvGap * 100).toFixed(1) + '% above'} the required ${(metrics.requiredLtvRatio * 100).toFixed(1)}% threshold.`;
  }

  private generateTimelineAnalysis(metrics: any): string {
    return `Timeline analysis shows automatic cancellation in ${metrics.monthsToAutomaticCancellation} months (${metrics.automaticCancellationDate}) and request-based cancellation in ${metrics.monthsToRequestCancellation} months (${metrics.requestCancellationDate}). The break-even point for cancellation costs is ${metrics.breakEvenMonths} months.`;
  }

  private generateCostSummary(metrics: any): string {
    return `Cost analysis shows total PMI paid of $${metrics.totalPMIPaid.toLocaleString()} with remaining cost of $${metrics.remainingPMICost.toLocaleString()}. Potential savings of $${metrics.pmiSavings.toLocaleString()} with monthly savings of $${metrics.monthlyPMISavings.toLocaleString()}.`;
  }

  private generateSavingsAnalysis(metrics: any): string {
    return `Savings analysis indicates monthly PMI savings of $${metrics.monthlyPMISavings.toLocaleString()} and annual savings of $${metrics.annualPMISavings.toLocaleString()}. Total payment reduction of $${metrics.paymentReduction.toLocaleString()} per month with cumulative savings of $${metrics.totalPaymentSavings.toLocaleString()}.`;
  }

  private generateBreakEvenAnalysis(metrics: any): string {
    return `Break-even analysis shows a break-even point of ${metrics.breakEvenMonths} months with break-even cost of $${metrics.breakEvenCost.toLocaleString()}. Net savings of $${metrics.netSavings.toLocaleString()} after accounting for cancellation costs.`;
  }

  private generateEquitySummary(metrics: any): string {
    return `Equity analysis shows current equity of $${metrics.currentEquity.toLocaleString()} representing ${(metrics.equityPercentage * 100).toFixed(1)}% of property value. Equity growth of $${metrics.equityGrowth.toLocaleString()} with required equity of $${metrics.equityRequired.toLocaleString()} for PMI cancellation.`;
  }

  private generateEquityGrowthAnalysis(metrics: any): string {
    return `Equity growth analysis indicates ${metrics.equityGrowth > 0 ? 'positive' : 'negative'} equity growth of $${metrics.equityGrowth.toLocaleString()}. Current equity position of ${(metrics.equityPercentage * 100).toFixed(1)}% provides ${metrics.equityPercentage >= 0.2 ? 'strong' : 'moderate'} foundation for PMI cancellation.`;
  }

  private generateLTVAnalysis(metrics: any): string {
    return `LTV analysis shows current ratio of ${(metrics.currentLtvRatio * 100).toFixed(1)}% compared to required ${(metrics.requiredLtvRatio * 100).toFixed(1)}%. The LTV gap of ${(metrics.ltvGap * 100).toFixed(1)}% ${metrics.ltvGap <= 0 ? 'indicates eligibility' : 'requires additional equity growth'} for PMI cancellation.`;
  }

  private generatePaymentSummary(metrics: any): string {
    return `Payment analysis shows current monthly payment of $${metrics.monthlyPayment.toLocaleString()} and payment without PMI of $${metrics.monthlyPaymentWithoutPMI.toLocaleString()}. Payment reduction of $${metrics.paymentReduction.toLocaleString()} per month with total payment savings of $${metrics.totalPaymentSavings.toLocaleString()}.`;
  }

  private generateReductionAnalysis(metrics: any): string {
    return `Payment reduction analysis indicates monthly savings of $${metrics.paymentReduction.toLocaleString()} representing ${((metrics.paymentReduction / metrics.monthlyPayment) * 100).toFixed(1)}% reduction in monthly payment. Annual payment savings of $${(metrics.paymentReduction * 12).toLocaleString()}.`;
  }

  private generateCashFlowAnalysis(metrics: any): string {
    return `Cash flow analysis shows improved monthly cash flow of $${metrics.paymentReduction.toLocaleString()} from PMI cancellation. This represents ${((metrics.paymentReduction / (inputs.borrowerIncome / 12)) * 100).toFixed(1)}% of monthly income, providing significant cash flow improvement.`;
  }

  private generateMarketSummary(inputs: PMICancellationInputs, metrics: any): string {
    return `Market analysis for ${inputs.marketLocation} shows ${inputs.marketCondition} conditions with ${(inputs.marketGrowthRate * 100).toFixed(1)}% growth rate. Property appreciation rate of ${(inputs.propertyAppreciationRate * 100).toFixed(1)}% supports equity growth and PMI cancellation timeline.`;
  }

  private generateAppreciationAnalysis(inputs: PMICancellationInputs, metrics: any): string {
    return `Property appreciation analysis indicates ${(inputs.propertyAppreciationRate * 100).toFixed(1)}% annual appreciation rate. This appreciation rate ${inputs.propertyAppreciationRate > 0.03 ? 'strongly supports' : 'moderately supports'} equity growth and PMI cancellation timeline.`;
  }

  private generateComparableAnalysis(inputs: PMICancellationInputs, metrics: any): string {
    return `Comparable sales analysis shows ${inputs.comparableSales.length} comparable properties with average sale price of $${(inputs.comparableSales.reduce((sum, sale) => sum + sale.salePrice, 0) / inputs.comparableSales.length).toLocaleString()}. This supports current property valuation and PMI cancellation analysis.`;
  }

  private generateRiskAssessment(inputs: PMICancellationInputs, metrics: any): string {
    return `Risk assessment shows overall risk score of ${(metrics.riskScore * 100).toFixed(0)}% with ${(metrics.probabilityOfCancellation * 100).toFixed(0)}% probability of successful cancellation. Market risk is ${inputs.marketCondition === 'declining' ? 'elevated' : 'moderate'} due to ${inputs.marketCondition} market conditions.`;
  }

  private assessMarketRisk(inputs: PMICancellationInputs, metrics: any): string {
    return `Market risk assessment indicates ${inputs.marketCondition} market conditions in ${inputs.marketLocation} with ${(inputs.marketGrowthRate * 100).toFixed(1)}% growth rate. This creates ${inputs.marketCondition === 'declining' ? 'higher' : 'lower'} risk for PMI cancellation timeline.`;
  }

  private assessAppraisalRisk(inputs: PMICancellationInputs, metrics: any): string {
    return `Appraisal risk assessment shows ${inputs.appraisalRequired ? 'required' : 'optional'} appraisal with cost of $${inputs.appraisalCost.toLocaleString()}. Appraisal value of $${inputs.appraisalValue.toLocaleString()} ${inputs.appraisalValue >= inputs.currentPropertyValue ? 'supports' : 'may challenge'} PMI cancellation eligibility.`;
  }

  private assessTimingRisk(inputs: PMICancellationInputs, metrics: any): string {
    return `Timing risk assessment indicates ${metrics.monthsToRequestCancellation <= 6 ? 'low' : metrics.monthsToRequestCancellation <= 12 ? 'moderate' : 'high'} timing risk with ${metrics.monthsToRequestCancellation} months to eligibility. Market conditions and property appreciation will impact timing.`;
  }

  private generateCancellationRecommendations(inputs: PMICancellationInputs, metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (metrics.pmiEligibility) {
      recommendations.push('Proceed with PMI cancellation immediately');
    } else if (metrics.monthsToRequestCancellation <= 6) {
      recommendations.push('Prepare for PMI cancellation request in the near term');
    } else if (metrics.monthsToRequestCancellation <= 12) {
      recommendations.push('Monitor equity growth and prepare for future cancellation');
    } else {
      recommendations.push('Consider strategies to accelerate equity growth');
    }
    
    if (metrics.monthlyPMISavings > 100) {
      recommendations.push('High savings potential justifies cancellation efforts');
    }
    
    if (metrics.breakEvenMonths < 12) {
      recommendations.push('Quick break-even point supports immediate action');
    }
    
    return recommendations;
  }

  private generateOptimizationSuggestions(inputs: PMICancellationInputs, metrics: any): string[] {
    const suggestions: string[] = [];
    
    suggestions.push('Consider making additional principal payments to accelerate equity growth');
    suggestions.push('Monitor property value through regular appraisals or market analysis');
    suggestions.push('Optimize payment timing to maximize equity accumulation');
    suggestions.push('Consider refinancing if interest rates are favorable');
    
    return suggestions;
  }

  private generateRiskMitigation(inputs: PMICancellationInputs, metrics: any): string[] {
    const mitigation: string[] = [];
    
    if (inputs.marketCondition === 'declining') {
      mitigation.push('Monitor market conditions closely for equity impact');
    }
    
    if (metrics.breakEvenMonths > 18) {
      mitigation.push('Consider alternative strategies if break-even period is too long');
    }
    
    if (inputs.appraisalRequired) {
      mitigation.push('Ensure appraisal supports current property valuation');
    }
    
    mitigation.push('Maintain good payment history to support cancellation request');
    
    return mitigation;
  }

  private generateImplementationPlan(inputs: PMICancellationInputs, metrics: any): string {
    return `Implementation plan: 1) Verify current LTV ratio and eligibility, 2) ${inputs.appraisalRequired ? 'Obtain required appraisal' : 'Consider optional appraisal for verification'}, 3) Prepare cancellation request with supporting documentation, 4) Submit request to lender, 5) Monitor approval process and follow up as needed.`;
  }

  private generateNextSteps(inputs: PMICancellationInputs, metrics: any): string[] {
    const steps: string[] = [];
    
    if (metrics.pmiEligibility) {
      steps.push('Contact lender to initiate PMI cancellation');
      steps.push('Gather required documentation');
      steps.push('Submit cancellation request');
    } else {
      steps.push('Monitor equity growth monthly');
      steps.push('Consider additional principal payments');
      steps.push('Prepare for future cancellation request');
    }
    
    return steps;
  }

  private generateTimeline(inputs: PMICancellationInputs, metrics: any): string {
    return `Timeline: ${metrics.pmiEligibility ? 'Immediate cancellation possible' : metrics.monthsToRequestCancellation + ' months to eligibility'}, automatic cancellation in ${metrics.monthsToAutomaticCancellation} months, break-even in ${metrics.breakEvenMonths} months.`;
  }

  private generateMonitoringPlan(inputs: PMICancellationInputs, metrics: any): string {
    return `Monitoring plan: Track LTV ratio monthly, monitor property value quarterly, review market conditions annually, and assess cancellation eligibility every 6 months.`;
  }

  private generateKeyMetrics(metrics: any): string[] {
    return [
      'Current LTV Ratio',
      'PMI Eligibility Status',
      'Monthly PMI Savings',
      'Break-Even Timeline',
      'Total Potential Savings',
      'Equity Percentage',
      'Risk Score'
    ];
  }

  private generateReviewSchedule(inputs: PMICancellationInputs, metrics: any): string {
    return `Review schedule: Monthly LTV monitoring, quarterly property value assessment, annual market condition review, and cancellation eligibility check every 6 months.`;
  }

  private generateRiskManagement(inputs: PMICancellationInputs, metrics: any): string {
    return `Risk management strategy includes regular monitoring of LTV ratio, property value tracking, market condition assessment, and contingency planning for delayed cancellation.`;
  }

  private generateMitigationStrategies(inputs: PMICancellationInputs, metrics: any): string[] {
    return [
      'Maintain regular payment schedule',
      'Monitor property value through market analysis',
      'Consider additional principal payments',
      'Stay informed about market conditions',
      'Prepare alternative strategies if needed'
    ];
  }

  private generateContingencyPlans(inputs: PMICancellationInputs, metrics: any): string[] {
    return [
      'Plan for delayed cancellation if market conditions worsen',
      'Consider refinancing if PMI cancellation is not feasible',
      'Prepare for additional appraisal costs if required',
      'Have backup documentation ready for cancellation request',
      'Consider alternative equity-building strategies'
    ];
  }

  private generateDecisionRecommendation(metrics: any, recommendation: string): string {
    return `Based on the analysis, the recommendation is to ${recommendation.toLowerCase()}. The PMI cancellation offers ${metrics.monthlyPMISavings > 100 ? 'significant' : 'moderate'} monthly savings of $${metrics.monthlyPMISavings.toLocaleString()} with a break-even period of ${metrics.breakEvenMonths} months.`;
  }

  private generatePresentationPoints(inputs: PMICancellationInputs, metrics: any): string[] {
    return [
      `Current LTV: ${(metrics.currentLtvRatio * 100).toFixed(1)}%`,
      `Monthly PMI Savings: $${metrics.monthlyPMISavings.toLocaleString()}`,
      `Break-Even Period: ${metrics.breakEvenMonths} months`,
      `Total Potential Savings: $${metrics.pmiSavings.toLocaleString()}`,
      `Cancellation Timeline: ${metrics.monthsToRequestCancellation} months`,
      `Risk Score: ${(metrics.riskScore * 100).toFixed(0)}%`
    ];
  }

  private generateDecisionFactors(inputs: PMICancellationInputs, metrics: any): string[] {
    return [
      'PMI cancellation eligibility and timeline',
      'Monthly and total savings potential',
      'Break-even analysis and cost-benefit',
      'Market conditions and property appreciation',
      'Risk factors and mitigation strategies',
      'Implementation timeline and requirements'
    ];
  }
}