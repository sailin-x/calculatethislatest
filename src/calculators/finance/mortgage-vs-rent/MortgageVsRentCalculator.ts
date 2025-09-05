import { Calculator } from '../../types';
import { MortgageVsRentInputs, MortgageVsRentOutputs, MortgageVsRentAnalysis } from './types';
import { calculateMortgageVsRent } from './formulas';
import { validateMortgageVsRentInputs } from './validation';

export class MortgageVsRentCalculator implements Calculator<MortgageVsRentInputs, MortgageVsRentOutputs> {
  name = 'Mortgage vs Rent Calculator';
  description = 'Compare the financial implications of buying vs renting a property over time';
  category = 'Finance & Investment';
  tags = ['mortgage', 'rent', 'real estate', 'buying', 'renting', 'comparison'];
  
  calculate(inputs: MortgageVsRentInputs): MortgageVsRentOutputs {
    const validation = validateMortgageVsRentInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const metrics = calculateMortgageVsRent(inputs);
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      monthlyMortgagePayment: metrics.monthlyMortgagePayment,
      totalMonthlyBuyingCosts: metrics.totalMonthlyBuyingCosts,
      totalMonthlyRentingCosts: metrics.totalMonthlyRentingCosts,
      monthlyDifference: metrics.monthlyDifference,
      annualBuyingCosts: metrics.annualBuyingCosts,
      annualRentingCosts: metrics.annualRentingCosts,
      annualDifference: metrics.annualDifference,
      totalBuyingCosts: metrics.totalBuyingCosts,
      totalRentingCosts: metrics.totalRentingCosts,
      totalDifference: metrics.totalDifference,
      equityBuildup: metrics.equityBuildup,
      propertyAppreciation: metrics.propertyAppreciation,
      netWorthBuying: metrics.netWorthBuying,
      netWorthRenting: metrics.netWorthRenting,
      netWorthDifference: metrics.netWorthDifference,
      breakEvenPoint: metrics.breakEvenPoint,
      opportunityCost: metrics.opportunityCost,
      taxBenefits: metrics.taxBenefits,
      totalCostOfOwnership: metrics.totalCostOfOwnership,
      buyingCostPerSqFt: metrics.buyingCostPerSqFt,
      rentingCostPerSqFt: metrics.rentingCostPerSqFt,
      costPerSqFtDifference: metrics.costPerSqFtDifference,
      debtToIncomeRatio: metrics.debtToIncomeRatio,
      housingExpenseRatio: metrics.housingExpenseRatio,
      monthlyCashFlowBuying: metrics.monthlyCashFlowBuying,
      monthlyCashFlowRenting: metrics.monthlyCashFlowRenting,
      cashFlowDifference: metrics.cashFlowDifference,
      investmentReturnBuying: metrics.investmentReturnBuying,
      investmentReturnRenting: metrics.investmentReturnRenting,
      investmentReturnDifference: metrics.investmentReturnDifference,
      analysis,
      scenarios: metrics.scenarios,
      sensitivityAnalysis: metrics.sensitivityAnalysis,
      timelineAnalysis: metrics.timelineAnalysis
    };
  }

  private generateAnalysis(inputs: MortgageVsRentInputs, metrics: any): MortgageVsRentAnalysis {
    const recommendation = this.generateRecommendation(inputs, metrics);
    const financialSummary = this.generateFinancialSummary(inputs, metrics);
    const costBreakdown = this.generateCostBreakdown(inputs, metrics);
    const equityAnalysis = this.generateEquityAnalysis(inputs, metrics);
    const cashFlowAnalysis = this.generateCashFlowAnalysis(inputs, metrics);
    const investmentAnalysis = this.generateInvestmentAnalysis(inputs, metrics);
    const riskAssessment = this.generateRiskAssessment(inputs, metrics);
    const marketAnalysis = this.generateMarketAnalysis(inputs, metrics);
    const taxAnalysis = this.generateTaxAnalysis(inputs, metrics);
    const breakEvenAnalysis = this.generateBreakEvenAnalysis(inputs, metrics);
    const opportunityCostAnalysis = this.generateOpportunityCostAnalysis(inputs, metrics);
    const affordabilityAnalysis = this.generateAffordabilityAnalysis(inputs, metrics);
    const timelineAnalysis = this.generateTimelineAnalysis(inputs, metrics);
    const recommendations = this.generateRecommendations(inputs, metrics);
    const nextSteps = this.generateNextSteps(inputs, metrics);
    const keyInsights = this.generateKeyInsights(inputs, metrics);
    const decisionFactors = this.generateDecisionFactors(inputs, metrics);
    const presentationPoints = this.generatePresentationPoints(inputs, metrics);
    const implementationPlan = this.generateImplementationPlan(inputs, metrics);
    const monitoringPlan = this.generateMonitoringPlan(inputs, metrics);
    const performanceBenchmarks = this.generatePerformanceBenchmarks(inputs, metrics);
    const riskMitigation = this.generateRiskMitigation(inputs, metrics);
    const contingencyPlans = this.generateContingencyPlans(inputs, metrics);

    return {
      recommendation,
      financialSummary,
      costBreakdown,
      equityAnalysis,
      cashFlowAnalysis,
      investmentAnalysis,
      riskAssessment,
      marketAnalysis,
      taxAnalysis,
      breakEvenAnalysis,
      opportunityCostAnalysis,
      affordabilityAnalysis,
      timelineAnalysis,
      recommendations,
      nextSteps,
      keyInsights,
      decisionFactors,
      presentationPoints,
      implementationPlan,
      monitoringPlan,
      performanceBenchmarks,
      riskMitigation,
      contingencyPlans
    };
  }

  private generateRecommendation(inputs: MortgageVsRentInputs, metrics: any): 'Buy' | 'Rent' | 'Consider Both' | 'Requires Analysis' {
    if (metrics.netWorthDifference > 50000) return 'Buy';
    if (metrics.netWorthDifference < -50000) return 'Rent';
    if (metrics.breakEvenPoint <= 5) return 'Buy';
    if (metrics.breakEvenPoint > 10) return 'Rent';
    return 'Consider Both';
  }

  private generateFinancialSummary(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Financial analysis over ${inputs.analysisPeriod} years shows ${metrics.netWorthDifference > 0 ? 'buying' : 'renting'} provides ${Math.abs(metrics.netWorthDifference).toLocaleString()} in ${metrics.netWorthDifference > 0 ? 'additional' : 'reduced'} net worth. Monthly difference is $${Math.abs(metrics.monthlyDifference).toLocaleString()} with break-even at ${metrics.breakEvenPoint} years.`;
  }

  private generateCostBreakdown(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Cost breakdown: Buying costs $${metrics.totalBuyingCosts.toLocaleString()} vs renting costs $${metrics.totalRentingCosts.toLocaleString()} over ${inputs.analysisPeriod} years. Monthly buying costs: $${metrics.totalMonthlyBuyingCosts.toLocaleString()}, monthly renting costs: $${metrics.totalMonthlyRentingCosts.toLocaleString()}.`;
  }

  private generateEquityAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Equity analysis: Buying builds $${metrics.equityBuildup.toLocaleString()} in equity and $${metrics.propertyAppreciation.toLocaleString()} in appreciation over ${inputs.analysisPeriod} years. Total equity gain: $${(metrics.equityBuildup + metrics.propertyAppreciation).toLocaleString()}.`;
  }

  private generateCashFlowAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Cash flow analysis: Monthly cash flow for buying: $${metrics.monthlyCashFlowBuying.toLocaleString()}, for renting: $${metrics.monthlyCashFlowRenting.toLocaleString()}. Difference: $${metrics.cashFlowDifference.toLocaleString()} per month.`;
  }

  private generateInvestmentAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Investment analysis: Buying provides ${metrics.investmentReturnBuying.toFixed(1)}% return vs renting with investment provides ${metrics.investmentReturnRenting.toFixed(1)}% return. Difference: ${metrics.investmentReturnDifference.toFixed(1)} percentage points.`;
  }

  private generateRiskAssessment(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Risk assessment: Buying involves property market risk, maintenance costs, and interest rate risk. Renting involves rent increase risk and lack of equity building. Current market conditions favor ${metrics.netWorthDifference > 0 ? 'buying' : 'renting'}.`;
  }

  private generateMarketAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Market analysis: Property appreciation rate of ${inputs.propertyAppreciationRate}% vs rent increase rate of ${inputs.rentIncreaseRate}%. Investment return rate of ${inputs.investmentReturnRate}% for alternative investments.`;
  }

  private generateTaxAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Tax analysis: Buying provides $${metrics.taxBenefits.toLocaleString()} in tax benefits over ${inputs.analysisPeriod} years through mortgage interest and property tax deductions at ${inputs.marginalTaxRate}% marginal tax rate.`;
  }

  private generateBreakEvenAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Break-even analysis: Break-even point occurs at ${metrics.breakEvenPoint} years when the benefits of buying (equity + appreciation + tax benefits) exceed the additional costs of buying vs renting.`;
  }

  private generateOpportunityCostAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Opportunity cost analysis: Down payment of $${inputs.downPayment.toLocaleString()} could earn $${metrics.opportunityCost.toLocaleString()} if invested at ${inputs.investmentReturnRate}% return over ${inputs.analysisPeriod} years.`;
  }

  private generateAffordabilityAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Affordability analysis: Housing expense ratio is ${(metrics.housingExpenseRatio * 100).toFixed(1)}% and debt-to-income ratio is ${(metrics.debtToIncomeRatio * 100).toFixed(1)}%. ${metrics.housingExpenseRatio <= 0.28 ? 'Within' : 'Exceeds'} recommended 28% housing expense ratio.`;
  }

  private generateTimelineAnalysis(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Timeline analysis: Over ${inputs.analysisPeriod} years, buying provides cumulative net worth of $${metrics.netWorthBuying.toLocaleString()} vs renting provides $${metrics.netWorthRenting.toLocaleString()}. The advantage of ${metrics.netWorthDifference > 0 ? 'buying' : 'renting'} becomes apparent after ${metrics.breakEvenPoint} years.`;
  }

  private generateRecommendations(inputs: MortgageVsRentInputs, metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (metrics.netWorthDifference > 0) {
      recommendations.push('Consider buying - provides better long-term financial outcome');
    } else {
      recommendations.push('Consider renting - provides better long-term financial outcome');
    }
    
    if (metrics.breakEvenPoint <= 5) {
      recommendations.push('Short break-even period favors buying');
    } else if (metrics.breakEvenPoint > 10) {
      recommendations.push('Long break-even period favors renting');
    }
    
    if (metrics.housingExpenseRatio > 0.28) {
      recommendations.push('High housing expense ratio - consider reducing purchase price or increasing down payment');
    }
    
    if (metrics.debtToIncomeRatio > 0.36) {
      recommendations.push('High debt-to-income ratio - consider improving financial position before buying');
    }
    
    return recommendations;
  }

  private generateNextSteps(inputs: MortgageVsRentInputs, metrics: any): string[] {
    const steps: string[] = [];
    
    if (this.generateRecommendation(inputs, metrics) === 'Buy') {
      steps.push('Get pre-approved for mortgage');
      steps.push('Find a qualified real estate agent');
      steps.push('Start property search within budget');
    } else if (this.generateRecommendation(inputs, metrics) === 'Rent') {
      steps.push('Research rental market in desired area');
      steps.push('Consider investing down payment in diversified portfolio');
      steps.push('Monitor market conditions for future buying opportunity');
    } else {
      steps.push('Gather more information about local market conditions');
      steps.push('Consider personal factors beyond financial analysis');
      steps.push('Re-evaluate in 6-12 months');
    }
    
    return steps;
  }

  private generateKeyInsights(inputs: MortgageVsRentInputs, metrics: any): string[] {
    const insights: string[] = [];
    
    insights.push(`Monthly cost difference: $${Math.abs(metrics.monthlyDifference).toLocaleString()}`);
    insights.push(`Break-even point: ${metrics.breakEvenPoint} years`);
    insights.push(`Net worth difference: $${Math.abs(metrics.netWorthDifference).toLocaleString()}`);
    insights.push(`Equity buildup: $${metrics.equityBuildup.toLocaleString()}`);
    insights.push(`Property appreciation: $${metrics.propertyAppreciation.toLocaleString()}`);
    insights.push(`Tax benefits: $${metrics.taxBenefits.toLocaleString()}`);
    
    return insights;
  }

  private generateDecisionFactors(inputs: MortgageVsRentInputs, metrics: any): string[] {
    return [
      'Financial outcome over analysis period',
      'Monthly cash flow impact',
      'Break-even timeline',
      'Market appreciation assumptions',
      'Interest rate environment',
      'Tax situation and benefits',
      'Personal lifestyle preferences',
      'Job stability and location flexibility',
      'Maintenance and responsibility preferences',
      'Investment alternatives'
    ];
  }

  private generatePresentationPoints(inputs: MortgageVsRentInputs, metrics: any): string[] {
    return [
      `Over ${inputs.analysisPeriod} years, ${metrics.netWorthDifference > 0 ? 'buying' : 'renting'} provides $${Math.abs(metrics.netWorthDifference).toLocaleString()} more in net worth`,
      `Monthly cost difference: $${Math.abs(metrics.monthlyDifference).toLocaleString()}`,
      `Break-even point: ${metrics.breakEvenPoint} years`,
      `Equity and appreciation: $${(metrics.equityBuildup + metrics.propertyAppreciation).toLocaleString()}`,
      `Tax benefits: $${metrics.taxBenefits.toLocaleString()}`
    ];
  }

  private generateImplementationPlan(inputs: MortgageVsRentInputs, metrics: any): string {
    const recommendation = this.generateRecommendation(inputs, metrics);
    return `Implementation plan: ${recommendation === 'Buy' ? 'Proceed with home purchase process including mortgage pre-approval and property search' : recommendation === 'Rent' ? 'Focus on renting and investing the down payment in diversified portfolio' : 'Gather additional information and re-evaluate decision factors'}.`;
  }

  private generateMonitoringPlan(inputs: MortgageVsRentInputs, metrics: any): string {
    return `Monitoring plan: Review decision annually considering changes in property values, interest rates, rent costs, and personal circumstances. Key metrics to track: market appreciation rates, rent increases, and investment returns.`;
  }

  private generatePerformanceBenchmarks(inputs: MortgageVsRentInputs, metrics: any): Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }> {
    return [
      {
        metric: 'Housing Expense Ratio',
        target: metrics.housingExpenseRatio * 100,
        benchmark: 28,
        industry: 'Recommended maximum'
      },
      {
        metric: 'Debt-to-Income Ratio',
        target: metrics.debtToIncomeRatio * 100,
        benchmark: 36,
        industry: 'Recommended maximum'
      },
      {
        metric: 'Break-Even Point',
        target: metrics.breakEvenPoint,
        benchmark: 7,
        industry: 'Typical break-even'
      }
    ];
  }

  private generateRiskMitigation(inputs: MortgageVsRentInputs, metrics: any): string[] {
    const mitigation: string[] = [];
    
    if (metrics.housingExpenseRatio > 0.28) {
      mitigation.push('Consider larger down payment to reduce monthly costs');
    }
    
    if (inputs.propertyAppreciationRate > 5) {
      mitigation.push('High appreciation assumption - consider conservative scenarios');
    }
    
    if (inputs.rentIncreaseRate > 5) {
      mitigation.push('High rent increase assumption - consider rent control areas');
    }
    
    mitigation.push('Maintain emergency fund for unexpected costs');
    mitigation.push('Consider insurance for property protection');
    
    return mitigation;
  }

  private generateContingencyPlans(inputs: MortgageVsRentInputs, metrics: any): string[] {
    return [
      'If interest rates rise significantly, re-evaluate buying decision',
      'If property values decline, consider waiting for better market conditions',
      'If rent increases exceed projections, buying may become more attractive',
      'If job situation changes, consider impact on housing decision',
      'If investment returns exceed projections, renting may become more attractive'
    ];
  }
}