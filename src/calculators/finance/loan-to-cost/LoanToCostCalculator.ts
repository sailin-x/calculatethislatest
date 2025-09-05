import { Calculator } from '../../../data/calculatorRegistry';
import { LoanToCostInputs, LoanToCostOutputs, LoanToCostMetrics, LoanToCostAnalysis } from './types';
import { calculateLoanToCostMetrics } from './formulas';
import { validateLoanToCostInputs } from './validation';

export class LoanToCostCalculator implements Calculator<LoanToCostInputs, LoanToCostOutputs> {
  name = 'Loan to Cost (LTC) Ratio Calculator';
  description = 'Calculate loan-to-cost ratios for real estate development projects with comprehensive risk analysis and profitability assessment';
  category = 'Finance';
  tags = ['real estate', 'development', 'construction', 'financing', 'ltc', 'leverage', 'risk analysis'];
  icon = '🏗️';
  version = '1.0.0';
  author = 'CalculateThis.ai';
  url = 'loan-to-cost-ratio';
  documentation = 'https://calculatethis.ai/docs/loan-to-cost-ratio';
  examples = [
    {
      name: 'Residential Development Project',
      inputs: {
        loanAmount: 800000,
        interestRate: 0.065,
        loanTerm: 24,
        loanType: 'construction' as const,
        paymentType: 'construction_draw' as const,
        projectType: 'residential' as const,
        projectSize: 2500,
        projectAddress: '123 Main St, Anytown, ST 12345',
        projectDescription: 'Single-family home development',
        landCost: 150000,
        constructionCost: 400000,
        softCosts: 75000,
        contingencyCost: 25000,
        totalProjectCost: 650000,
        siteWorkCost: 25000,
        foundationCost: 45000,
        structuralCost: 120000,
        exteriorCost: 80000,
        interiorCost: 100000,
        mechanicalCost: 35000,
        electricalCost: 25000,
        plumbingCost: 20000,
        finishCost: 40000,
        architecturalFees: 20000,
        engineeringFees: 15000,
        permitFees: 5000,
        legalFees: 8000,
        insuranceCost: 12000,
        appraisalFees: 3000,
        surveyFees: 2000,
        environmentalFees: 5000,
        otherSoftCosts: 5000,
        constructionStartDate: '2024-01-01',
        constructionEndDate: '2024-12-31',
        constructionDuration: 12,
        drawSchedule: [
          { draw: 1, percentage: 0.15, amount: 120000, date: '2024-01-15' },
          { draw: 2, percentage: 0.25, amount: 200000, date: '2024-03-15' },
          { draw: 3, percentage: 0.30, amount: 240000, date: '2024-06-15' },
          { draw: 4, percentage: 0.20, amount: 160000, date: '2024-09-15' },
          { draw: 5, percentage: 0.10, amount: 80000, date: '2024-12-15' }
        ],
        borrowerEquity: 200000,
        borrowerExperience: 'moderate' as const,
        borrowerCreditScore: 750,
        borrowerNetWorth: 1000000,
        borrowerLiquidity: 300000,
        marketLocation: 'Anytown, ST',
        marketCondition: 'growing' as const,
        marketGrowthRate: 0.04,
        comparableProjects: [
          { project: 'Oak Street Development', cost: 620000, completionDate: '2023-08-15', performance: 'excellent' },
          { project: 'Pine Avenue Homes', cost: 680000, completionDate: '2023-11-20', performance: 'good' },
          { project: 'Elm Court Project', cost: 640000, completionDate: '2024-02-10', performance: 'excellent' }
        ],
        exitStrategy: 'sell' as const,
        expectedExitValue: 750000,
        expectedExitDate: '2025-01-01',
        exitTimeline: 12,
        constructionRisk: 'medium' as const,
        marketRisk: 'low' as const,
        borrowerRisk: 'low' as const,
        projectRisk: 'medium' as const,
        personalGuarantee: true,
        completionGuarantee: true,
        additionalCollateral: 0,
        crossCollateralization: false,
        analysisPeriod: 24,
        inflationRate: 0.03,
        constructionInflationRate: 0.04,
        discountRate: 0.08,
        currency: 'USD' as const,
        displayFormat: 'percentage' as const,
        includeCharts: true
      }
    }
  ];

  calculate(inputs: LoanToCostInputs): LoanToCostOutputs {
    // Validate inputs
    const validation = validateLoanToCostInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Calculate metrics
    const metrics = calculateLoanToCostMetrics(inputs);

    // Generate analysis
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      // Core Metrics
      loanToCostRatio: metrics.loanToCostRatio,
      equityContribution: metrics.equityContribution,
      equityPercentage: metrics.equityPercentage,
      leverageRatio: metrics.leverageRatio,
      riskScore: metrics.riskScore,
      expectedProfit: metrics.expectedProfit,
      profitMargin: metrics.profitMargin,
      
      // Analysis
      analysis,
      
      // Additional Metrics
      costBreakdown: metrics.costBreakdown,
      costPerSquareFoot: metrics.costPerSquareFoot,
      costVariance: metrics.costVariance,
      loanAmount: metrics.loanAmount,
      loanPercentage: metrics.loanPercentage,
      interestExpense: metrics.interestExpense,
      totalLoanCost: metrics.totalLoanCost,
      constructionCashFlow: metrics.constructionCashFlow,
      monthlyInterestExpense: metrics.monthlyInterestExpense,
      totalInterestExpense: metrics.totalInterestExpense,
      probabilityOfCompletion: metrics.probabilityOfCompletion,
      probabilityOfDefault: metrics.probabilityOfDefault,
      expectedLoss: metrics.expectedLoss,
      returnOnEquity: metrics.returnOnEquity,
      returnOnCost: metrics.returnOnCost,
      sensitivityMatrix: metrics.sensitivityMatrix,
      scenarios: metrics.scenarios,
      industryBenchmarks: metrics.industryBenchmarks
    };
  }

  private generateAnalysis(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): LoanToCostAnalysis {
    // LTC Rating
    const ltcRating = this.getLTCRating(metrics.loanToCostRatio);
    const riskRating = this.getRiskRating(metrics.riskScore);
    const recommendation = this.getRecommendation(ltcRating, riskRating, metrics);

    // Key Insights
    const keyStrengths = this.getKeyStrengths(inputs, metrics);
    const keyWeaknesses = this.getKeyWeaknesses(inputs, metrics);
    const riskFactors = this.getRiskFactors(inputs, metrics);
    const opportunities = this.getOpportunities(inputs, metrics);

    // Analysis Sections
    const ltcSummary = this.generateLTCSummary(metrics);
    const costAnalysis = this.generateCostAnalysis(metrics);
    const loanAnalysis = this.generateLoanAnalysis(metrics);
    const riskAssessment = this.generateRiskAssessment(inputs, metrics);
    const financialSummary = this.generateFinancialSummary(metrics);
    const marketAssessment = this.generateMarketAssessment(inputs, metrics);

    // Recommendations
    const approvalRecommendations = this.getApprovalRecommendations(ltcRating, riskRating, metrics);
    const riskMitigation = this.getRiskMitigation(inputs, metrics);
    const optimizationSuggestions = this.getOptimizationSuggestions(inputs, metrics);

    return {
      ltcRating,
      riskRating,
      recommendation,
      keyStrengths,
      keyWeaknesses,
      riskFactors,
      opportunities,
      ltcSummary,
      costAnalysis,
      loanAnalysis,
      riskAssessment,
      constructionRisk: this.getConstructionRiskAssessment(inputs, metrics),
      marketRisk: this.getMarketRiskAssessment(inputs, metrics),
      borrowerRisk: this.getBorrowerRiskAssessment(inputs, metrics),
      projectRisk: this.getProjectRiskAssessment(inputs, metrics),
      financialSummary,
      cashFlowAnalysis: this.generateCashFlowAnalysis(metrics),
      profitabilityAnalysis: this.generateProfitabilityAnalysis(metrics),
      marketAssessment,
      comparableAnalysis: this.generateComparableAnalysis(inputs, metrics),
      marketPosition: this.generateMarketPosition(inputs, metrics),
      approvalRecommendations,
      riskMitigation,
      optimizationSuggestions,
      implementationPlan: this.generateImplementationPlan(inputs, metrics),
      nextSteps: this.getNextSteps(ltcRating, riskRating, metrics),
      timeline: this.generateTimeline(inputs, metrics),
      monitoringPlan: this.generateMonitoringPlan(inputs, metrics),
      keyMetrics: this.getKeyMetrics(metrics),
      reviewSchedule: this.generateReviewSchedule(inputs, metrics),
      riskManagement: this.generateRiskManagement(inputs, metrics),
      mitigationStrategies: this.getMitigationStrategies(inputs, metrics),
      contingencyPlans: this.getContingencyPlans(inputs, metrics),
      performanceBenchmarks: this.getPerformanceBenchmarks(inputs, metrics),
      decisionRecommendation: this.getDecisionRecommendation(ltcRating, riskRating, metrics),
      presentationPoints: this.getPresentationPoints(inputs, metrics),
      decisionFactors: this.getDecisionFactors(inputs, metrics)
    };
  }

  private getLTCRating(ltcRatio: number): 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' {
    if (ltcRatio <= 0.70) return 'Excellent';
    if (ltcRatio <= 0.75) return 'Good';
    if (ltcRatio <= 0.80) return 'Average';
    if (ltcRatio <= 0.85) return 'Poor';
    return 'Very Poor';
  }

  private getRiskRating(riskScore: number): 'Low' | 'Moderate' | 'High' | 'Very High' {
    if (riskScore <= 0.3) return 'Low';
    if (riskScore <= 0.5) return 'Moderate';
    if (riskScore <= 0.7) return 'High';
    return 'Very High';
  }

  private getRecommendation(
    ltcRating: string,
    riskRating: string,
    metrics: LoanToCostMetrics
  ): 'Approve' | 'Conditional' | 'Reject' | 'Requires Review' {
    if (ltcRating === 'Excellent' && riskRating === 'Low') return 'Approve';
    if (ltcRating === 'Good' && riskRating === 'Low') return 'Approve';
    if (ltcRating === 'Average' && riskRating === 'Low') return 'Conditional';
    if (ltcRating === 'Good' && riskRating === 'Moderate') return 'Conditional';
    if (ltcRating === 'Poor' && riskRating === 'High') return 'Reject';
    if (ltcRating === 'Very Poor') return 'Reject';
    if (riskRating === 'Very High') return 'Reject';
    return 'Requires Review';
  }

  private getKeyStrengths(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    const strengths: string[] = [];
    
    if (metrics.loanToCostRatio <= 0.75) {
      strengths.push('Conservative LTC ratio provides strong equity cushion');
    }
    
    if (inputs.borrowerExperience === 'extensive') {
      strengths.push('Experienced borrower with proven track record');
    }
    
    if (inputs.borrowerCreditScore >= 750) {
      strengths.push('Excellent borrower credit profile');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      strengths.push('Favorable market conditions support project success');
    }
    
    if (inputs.personalGuarantee && inputs.completionGuarantee) {
      strengths.push('Strong guarantee structure reduces lender risk');
    }
    
    if (metrics.expectedProfit > 0 && metrics.profitMargin > 0.15) {
      strengths.push('Strong projected profitability');
    }
    
    return strengths;
  }

  private getKeyWeaknesses(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    const weaknesses: string[] = [];
    
    if (metrics.loanToCostRatio > 0.80) {
      weaknesses.push('High LTC ratio increases lender risk exposure');
    }
    
    if (inputs.borrowerExperience === 'none' || inputs.borrowerExperience === 'limited') {
      weaknesses.push('Limited borrower experience in similar projects');
    }
    
    if (inputs.borrowerCreditScore < 650) {
      weaknesses.push('Below-average borrower credit score');
    }
    
    if (inputs.marketCondition === 'declining') {
      weaknesses.push('Challenging market conditions may impact project success');
    }
    
    if (inputs.constructionRisk === 'high' || inputs.projectRisk === 'high') {
      weaknesses.push('High construction or project risk factors');
    }
    
    if (metrics.expectedProfit <= 0) {
      weaknesses.push('Projected negative profitability');
    }
    
    return weaknesses;
  }

  private getRiskFactors(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    const risks: string[] = [];
    
    if (inputs.constructionRisk === 'high') {
      risks.push('High construction risk due to project complexity or market conditions');
    }
    
    if (inputs.marketRisk === 'high') {
      risks.push('High market risk due to economic uncertainty or oversupply');
    }
    
    if (inputs.borrowerRisk === 'high') {
      risks.push('High borrower risk due to limited experience or financial capacity');
    }
    
    if (inputs.projectRisk === 'high') {
      risks.push('High project risk due to location, design, or regulatory factors');
    }
    
    if (metrics.probabilityOfDefault > 0.15) {
      risks.push('Elevated probability of default based on risk assessment');
    }
    
    if (inputs.constructionDuration > 18) {
      risks.push('Extended construction timeline increases interest and market risk');
    }
    
    return risks;
  }

  private getOpportunities(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    const opportunities: string[] = [];
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      opportunities.push('Strong market conditions may support higher exit values');
    }
    
    if (metrics.returnOnEquity > 0.20) {
      opportunities.push('Attractive return on equity for borrower');
    }
    
    if (inputs.marketGrowthRate > 0.05) {
      opportunities.push('Above-average market growth rate supports appreciation');
    }
    
    if (inputs.exitStrategy === 'refinance' && inputs.expectedExitValue > inputs.totalProjectCost * 1.2) {
      opportunities.push('Refinance strategy may provide additional value creation');
    }
    
    return opportunities;
  }

  private generateLTCSummary(metrics: LoanToCostMetrics): string {
    return `The loan-to-cost ratio of ${(metrics.loanToCostRatio * 100).toFixed(1)}% indicates ${this.getLTCRating(metrics.loanToCostRatio).toLowerCase()} leverage for this project. The borrower is contributing ${(metrics.equityPercentage * 100).toFixed(1)}% equity, providing a ${(metrics.leverageRatio * 100).toFixed(1)}% leverage ratio. This structure ${metrics.loanToCostRatio <= 0.75 ? 'provides strong protection' : 'requires careful monitoring'} for the lender.`;
  }

  private generateCostAnalysis(metrics: LoanToCostMetrics): string {
    const totalCost = metrics.costBreakdown.reduce((sum, item) => sum + item.amount, 0);
    const largestCost = metrics.costBreakdown.reduce((max, item) => item.amount > max.amount ? item : max);
    
    return `Total project cost of $${totalCost.toLocaleString()} breaks down with ${largestCost.category} representing the largest component at ${(largestCost.percentage * 100).toFixed(1)}%. Cost per square foot of $${metrics.costPerSquareFoot.toFixed(2)} is ${metrics.costVariance > 0 ? 'above' : 'below'} market average by ${Math.abs(metrics.costVariance).toFixed(1)}%.`;
  }

  private generateLoanAnalysis(metrics: LoanToCostMetrics): string {
    return `Loan amount of $${metrics.loanAmount.toLocaleString()} represents ${(metrics.loanPercentage * 100).toFixed(1)}% of total project cost. Total interest expense of $${metrics.totalInterestExpense.toLocaleString()} over the construction period results in a total loan cost of $${metrics.totalLoanCost.toLocaleString()}. Monthly interest expense averages $${metrics.monthlyInterestExpense.toLocaleString()}.`;
  }

  private generateRiskAssessment(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Overall risk score of ${(metrics.riskScore * 100).toFixed(1)}% indicates ${this.getRiskRating(metrics.riskScore).toLowerCase()} risk. Probability of completion is ${(metrics.probabilityOfCompletion * 100).toFixed(1)}%, while probability of default is ${(metrics.probabilityOfDefault * 100).toFixed(1)}%. Expected loss in default scenario is $${metrics.expectedLoss.toLocaleString()}.`;
  }

  private generateFinancialSummary(metrics: LoanToCostMetrics): string {
    return `Project shows ${metrics.expectedProfit > 0 ? 'positive' : 'negative'} expected profit of $${Math.abs(metrics.expectedProfit).toLocaleString()} with a profit margin of ${(metrics.profitMargin * 100).toFixed(1)}%. Return on equity is ${(metrics.returnOnEquity * 100).toFixed(1)}% and return on cost is ${(metrics.returnOnCost * 100).toFixed(1)}%.`;
  }

  private generateMarketAssessment(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Market conditions in ${inputs.marketLocation} are ${inputs.marketCondition} with a growth rate of ${(inputs.marketGrowthRate * 100).toFixed(1)}%. Comparable projects show ${inputs.comparableProjects.length} similar developments with ${inputs.comparableProjects.filter(p => p.performance === 'excellent').length} achieving excellent performance.`;
  }

  private generateCashFlowAnalysis(metrics: LoanToCostMetrics): string {
    const totalDraws = metrics.constructionCashFlow.reduce((sum, period) => sum + period.drawAmount, 0);
    const totalInterest = metrics.constructionCashFlow.reduce((sum, period) => sum + period.interestExpense, 0);
    
    return `Construction cash flow shows ${metrics.constructionCashFlow.length} draw periods totaling $${totalDraws.toLocaleString()} in loan proceeds. Total interest expense during construction is $${totalInterest.toLocaleString()}, with peak monthly interest of $${Math.max(...metrics.constructionCashFlow.map(p => p.interestExpense)).toLocaleString()}.`;
  }

  private generateProfitabilityAnalysis(metrics: LoanToCostMetrics): string {
    return `Profitability analysis indicates ${metrics.expectedProfit > 0 ? 'strong' : 'weak'} project economics. Expected profit of $${Math.abs(metrics.expectedProfit).toLocaleString()} represents a ${(metrics.profitMargin * 100).toFixed(1)}% margin, providing ${(metrics.returnOnEquity * 100).toFixed(1)}% return on equity investment.`;
  }

  private generateComparableAnalysis(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    const avgComparableCost = inputs.comparableProjects.reduce((sum, p) => sum + p.cost, 0) / inputs.comparableProjects.length;
    const costDifference = ((metrics.costPerSquareFoot * inputs.projectSize - avgComparableCost) / avgComparableCost) * 100;
    
    return `Comparable analysis shows average project cost of $${avgComparableCost.toLocaleString()} for similar developments. This project is ${Math.abs(costDifference).toFixed(1)}% ${costDifference > 0 ? 'above' : 'below'} the comparable average.`;
  }

  private generateMarketPosition(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Market position analysis indicates this project is positioned in a ${inputs.marketCondition} market with ${inputs.marketGrowthRate > 0.03 ? 'strong' : 'moderate'} growth prospects. The ${inputs.projectType} project type aligns with current market demand.`;
  }

  private getApprovalRecommendations(ltcRating: string, riskRating: string, metrics: LoanToCostMetrics): string[] {
    const recommendations: string[] = [];
    
    if (ltcRating === 'Excellent' && riskRating === 'Low') {
      recommendations.push('Approve with standard terms and conditions');
      recommendations.push('Consider competitive pricing due to low risk profile');
    } else if (ltcRating === 'Good' && riskRating === 'Low') {
      recommendations.push('Approve with standard terms');
      recommendations.push('Monitor construction progress closely');
    } else if (ltcRating === 'Average' && riskRating === 'Low') {
      recommendations.push('Approve with enhanced monitoring requirements');
      recommendations.push('Require monthly progress reports');
    } else if (riskRating === 'Moderate') {
      recommendations.push('Conditional approval with risk mitigation measures');
      recommendations.push('Require additional guarantees or collateral');
    } else {
      recommendations.push('Require comprehensive risk mitigation plan');
      recommendations.push('Consider higher pricing or additional security');
    }
    
    return recommendations;
  }

  private getRiskMitigation(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    const mitigations: string[] = [];
    
    if (inputs.constructionRisk === 'high') {
      mitigations.push('Require construction completion guarantee from qualified contractor');
      mitigations.push('Implement monthly draw inspections and approvals');
    }
    
    if (inputs.marketRisk === 'high') {
      mitigations.push('Require market analysis updates every quarter');
      mitigations.push('Consider interest rate cap or hedging strategy');
    }
    
    if (inputs.borrowerRisk === 'high') {
      mitigations.push('Require personal guarantee from all principals');
      mitigations.push('Implement monthly financial reporting requirements');
    }
    
    if (metrics.loanToCostRatio > 0.80) {
      mitigations.push('Require additional equity contribution or collateral');
      mitigations.push('Implement stricter draw controls and approvals');
    }
    
    return mitigations;
  }

  private getOptimizationSuggestions(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    const suggestions: string[] = [];
    
    if (metrics.loanToCostRatio > 0.75) {
      suggestions.push('Consider reducing loan amount to improve LTC ratio');
      suggestions.push('Explore additional equity sources to strengthen position');
    }
    
    if (inputs.constructionDuration > 12) {
      suggestions.push('Optimize construction timeline to reduce interest expense');
      suggestions.push('Consider phased construction approach');
    }
    
    if (metrics.expectedProfit < inputs.totalProjectCost * 0.15) {
      suggestions.push('Review cost structure for optimization opportunities');
      suggestions.push('Consider value engineering to improve profitability');
    }
    
    return suggestions;
  }

  private generateImplementationPlan(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Implementation plan includes ${inputs.drawSchedule.length} construction draws over ${inputs.constructionDuration} months, with monthly monitoring and quarterly reviews. Key milestones include foundation completion, structural completion, and final inspection.`;
  }

  private getNextSteps(ltcRating: string, riskRating: string, metrics: LoanToCostMetrics): string[] {
    const steps: string[] = [];
    
    if (ltcRating === 'Excellent' || ltcRating === 'Good') {
      steps.push('Proceed with loan documentation and closing');
      steps.push('Schedule pre-construction meeting with borrower');
    } else {
      steps.push('Complete additional due diligence requirements');
      steps.push('Finalize risk mitigation measures');
    }
    
    steps.push('Establish monitoring and reporting schedule');
    steps.push('Coordinate with construction management team');
    
    return steps;
  }

  private generateTimeline(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Project timeline spans ${inputs.constructionDuration} months from ${inputs.constructionStartDate} to ${inputs.constructionEndDate}, with expected exit by ${inputs.expectedExitDate}. Key milestones include foundation (Month 2), structural completion (Month 6), and final inspection (Month 12).`;
  }

  private generateMonitoringPlan(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Monitoring plan includes monthly draw inspections, quarterly financial reviews, and semi-annual market assessments. Key metrics to track include construction progress, cost overruns, market conditions, and borrower financial capacity.`;
  }

  private getKeyMetrics(metrics: LoanToCostMetrics): string[] {
    return [
      'Loan-to-Cost Ratio',
      'Equity Contribution Percentage',
      'Construction Progress',
      'Cost Variance',
      'Interest Expense',
      'Market Conditions',
      'Borrower Financial Capacity'
    ];
  }

  private generateReviewSchedule(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Review schedule includes monthly construction progress reviews, quarterly financial assessments, and annual market condition updates. Additional reviews may be triggered by significant changes in project status or market conditions.`;
  }

  private generateRiskManagement(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Risk management framework includes regular monitoring of construction progress, market conditions, and borrower financial capacity. Contingency plans address potential delays, cost overruns, and market deterioration.`;
  }

  private getMitigationStrategies(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    return [
      'Regular construction progress monitoring',
      'Monthly financial reporting requirements',
      'Market condition assessments',
      'Contingency fund requirements',
      'Completion guarantee requirements'
    ];
  }

  private getContingencyPlans(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    return [
      'Construction delay contingency plan',
      'Cost overrun management plan',
      'Market deterioration response plan',
      'Borrower default resolution plan',
      'Project completion alternative plan'
    ];
  }

  private getPerformanceBenchmarks(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): any[] {
    return [
      { metric: 'LTC Ratio', target: 0.75, benchmark: metrics.loanToCostRatio, industry: 'Real Estate Development' },
      { metric: 'Return on Equity', target: 0.20, benchmark: metrics.returnOnEquity, industry: 'Real Estate Development' },
      { metric: 'Profit Margin', target: 0.15, benchmark: metrics.profitMargin, industry: 'Real Estate Development' }
    ];
  }

  private getDecisionRecommendation(ltcRating: string, riskRating: string, metrics: LoanToCostMetrics): string {
    if (ltcRating === 'Excellent' && riskRating === 'Low') {
      return 'Strong recommendation for approval with competitive terms';
    } else if (ltcRating === 'Good' && riskRating === 'Low') {
      return 'Recommendation for approval with standard terms';
    } else if (ltcRating === 'Average' && riskRating === 'Low') {
      return 'Conditional approval recommendation with enhanced monitoring';
    } else if (riskRating === 'Moderate') {
      return 'Conditional approval with risk mitigation measures required';
    } else {
      return 'Requires additional review and risk mitigation before approval';
    }
  }

  private getPresentationPoints(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    return [
      `LTC ratio of ${(metrics.loanToCostRatio * 100).toFixed(1)}% is ${this.getLTCRating(metrics.loanToCostRatio).toLowerCase()}`,
      `Equity contribution of ${(metrics.equityPercentage * 100).toFixed(1)}% provides strong borrower commitment`,
      `Expected profit of $${metrics.expectedProfit.toLocaleString()} with ${(metrics.profitMargin * 100).toFixed(1)}% margin`,
      `Risk score of ${(metrics.riskScore * 100).toFixed(1)}% indicates ${this.getRiskRating(metrics.riskScore).toLowerCase()} risk profile`
    ];
  }

  private getDecisionFactors(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string[] {
    return [
      'Loan-to-Cost Ratio',
      'Borrower Experience and Credit',
      'Market Conditions',
      'Construction Risk',
      'Project Profitability',
      'Exit Strategy Viability'
    ];
  }

  private getConstructionRiskAssessment(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Construction risk is assessed as ${inputs.constructionRisk} based on project complexity, timeline, and market conditions. Key factors include ${inputs.constructionDuration}-month timeline and ${inputs.projectType} project type.`;
  }

  private getMarketRiskAssessment(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Market risk is assessed as ${inputs.marketRisk} based on current market conditions (${inputs.marketCondition}) and growth rate of ${(inputs.marketGrowthRate * 100).toFixed(1)}%. Location in ${inputs.marketLocation} provides ${inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'favorable' : 'challenging'} market dynamics.`;
  }

  private getBorrowerRiskAssessment(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Borrower risk is assessed as ${inputs.borrowerRisk} based on experience level (${inputs.borrowerExperience}), credit score of ${inputs.borrowerCreditScore}, and financial capacity. Net worth of $${inputs.borrowerNetWorth.toLocaleString()} and liquidity of $${inputs.borrowerLiquidity.toLocaleString()} provide ${inputs.borrowerRisk === 'low' ? 'strong' : 'adequate'} financial support.`;
  }

  private getProjectRiskAssessment(inputs: LoanToCostInputs, metrics: LoanToCostMetrics): string {
    return `Project risk is assessed as ${inputs.projectRisk} based on project type (${inputs.projectType}), size (${inputs.projectSize} sq ft), and location factors. Exit strategy of ${inputs.exitStrategy} with expected value of $${inputs.expectedExitValue.toLocaleString()} provides ${inputs.projectRisk === 'low' ? 'strong' : 'moderate'} exit viability.`;
  }
}