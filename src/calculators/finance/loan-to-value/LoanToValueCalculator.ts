import { Calculator } from '../../../data/calculatorRegistry';
import { LoanToValueInputs, LoanToValueOutputs, LoanToValueMetrics, LoanToValueAnalysis } from './types';
import { calculateLoanToValueMetrics } from './formulas';
import { validateLoanToValueInputs } from './validation';

export class LoanToValueCalculator implements Calculator<LoanToValueInputs, LoanToValueOutputs> {
  name = 'Loan-to-Value (LTV) Ratio Calculator';
  description = 'Calculate loan-to-value ratios for real estate financing with comprehensive risk analysis and insurance assessment';
  category = 'Finance';
  tags = ['real estate', 'mortgage', 'ltv', 'financing', 'risk analysis', 'insurance', 'equity'];
  icon = '🏠';
  version = '1.0.0';
  author = 'CalculateThis.ai';
  url = 'loan-to-value-ratio';
  documentation = 'https://calculatethis.ai/docs/loan-to-value-ratio';
  examples = [
    {
      name: 'Conventional Home Purchase',
      inputs: {
        loanAmount: 400000,
        interestRate: 0.065,
        loanTerm: 360,
        loanType: 'conventional' as const,
        paymentType: 'principal_interest' as const,
        propertyValue: 500000,
        propertyAddress: '123 Main St, Anytown, ST 12345',
        propertyType: 'single_family' as const,
        propertySize: 2500,
        propertyAge: 10,
        propertyCondition: 'good' as const,
        appraisalValue: 500000,
        marketValue: 510000,
        assessedValue: 480000,
        purchasePrice: 500000,
        downPayment: 100000,
        downPaymentPercentage: 0.20,
        downPaymentSource: 'savings' as const,
        borrowerIncome: 120000,
        borrowerCreditScore: 750,
        borrowerDebtToIncomeRatio: 0.35,
        borrowerEmploymentType: 'employed' as const,
        borrowerAssets: 200000,
        borrowerLiquidity: 150000,
        propertyInsurance: 1200,
        propertyTaxes: 6000,
        hoaFees: 0,
        floodInsurance: 0,
        marketLocation: 'Anytown, ST',
        marketCondition: 'growing' as const,
        marketGrowthRate: 0.04,
        daysOnMarket: 30,
        marketRisk: 'low' as const,
        propertyRisk: 'low' as const,
        borrowerRisk: 'low' as const,
        loanRisk: 'low' as const,
        maxLtvRatio: 0.80,
        minDownPayment: 0.20,
        pmiRequired: false,
        pmiRate: 0.005,
        pmiThreshold: 0.80,
        additionalCollateral: 0,
        crossCollateralization: false,
        personalGuarantee: false,
        analysisPeriod: 30,
        inflationRate: 0.03,
        propertyAppreciationRate: 0.03,
        discountRate: 0.05,
        currency: 'USD' as const,
        displayFormat: 'percentage' as const,
        includeCharts: true
      }
    }
  ];

  calculate(inputs: LoanToValueInputs): LoanToValueOutputs {
    // Validate inputs
    const validation = validateLoanToValueInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Calculate metrics
    const metrics = calculateLoanToValueMetrics(inputs);

    // Generate analysis
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      // Core Metrics
      loanToValueRatio: metrics.loanToValueRatio,
      combinedLtvRatio: metrics.combinedLtvRatio,
      effectiveLtvRatio: metrics.effectiveLtvRatio,
      equityPosition: metrics.equityPosition,
      equityPercentage: metrics.equityPercentage,
      riskScore: metrics.riskScore,
      pmiRequired: metrics.pmiRequired,
      pmiCost: metrics.pmiCost,
      
      // Analysis
      analysis,
      
      // Additional Metrics
      loanAmount: metrics.loanAmount,
      loanPercentage: metrics.loanPercentage,
      monthlyPayment: metrics.monthlyPayment,
      totalPayments: metrics.totalPayments,
      totalInterestPaid: metrics.totalInterestPaid,
      totalCost: metrics.totalCost,
      costOfCredit: metrics.costOfCredit,
      effectiveInterestRate: metrics.effectiveInterestRate,
      probabilityOfDefault: metrics.probabilityOfDefault,
      lossGivenDefault: metrics.lossGivenDefault,
      expectedLoss: metrics.expectedLoss,
      pmiDuration: metrics.pmiDuration,
      totalInsuranceCost: metrics.totalInsuranceCost,
      monthlyCashFlow: metrics.monthlyCashFlow,
      annualCashFlow: metrics.annualCashFlow,
      breakEvenPoint: metrics.breakEvenPoint,
      sensitivityMatrix: metrics.sensitivityMatrix,
      scenarios: metrics.scenarios,
      valuationBreakdown: metrics.valuationBreakdown,
      marketPosition: metrics.marketPosition,
      comparableAnalysis: metrics.comparableAnalysis
    };
  }

  private generateAnalysis(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): LoanToValueAnalysis {
    // LTV Rating
    const ltvRating = this.getLTVRating(metrics.loanToValueRatio);
    const riskRating = this.getRiskRating(metrics.riskScore);
    const recommendation = this.getRecommendation(ltvRating, riskRating, metrics);

    // Key Insights
    const keyStrengths = this.getKeyStrengths(inputs, metrics);
    const keyWeaknesses = this.getKeyWeaknesses(inputs, metrics);
    const riskFactors = this.getRiskFactors(inputs, metrics);
    const opportunities = this.getOpportunities(inputs, metrics);

    // Analysis Sections
    const ltvSummary = this.generateLTVSummary(metrics);
    const equityAnalysis = this.generateEquityAnalysis(metrics);
    const loanAnalysis = this.generateLoanAnalysis(metrics);
    const riskAssessment = this.generateRiskAssessment(inputs, metrics);
    const financialSummary = this.generateFinancialSummary(metrics);
    const valuationAssessment = this.generateValuationAssessment(inputs, metrics);
    const insuranceAnalysis = this.generateInsuranceAnalysis(inputs, metrics);

    // Recommendations
    const approvalRecommendations = this.getApprovalRecommendations(ltvRating, riskRating, metrics);
    const riskMitigation = this.getRiskMitigation(inputs, metrics);
    const optimizationSuggestions = this.getOptimizationSuggestions(inputs, metrics);

    return {
      ltvRating,
      riskRating,
      recommendation,
      keyStrengths,
      keyWeaknesses,
      riskFactors,
      opportunities,
      ltvSummary,
      equityAnalysis,
      loanAnalysis,
      riskAssessment,
      marketRisk: this.getMarketRiskAssessment(inputs, metrics),
      propertyRisk: this.getPropertyRiskAssessment(inputs, metrics),
      borrowerRisk: this.getBorrowerRiskAssessment(inputs, metrics),
      loanRisk: this.getLoanRiskAssessment(inputs, metrics),
      financialSummary,
      cashFlowAnalysis: this.generateCashFlowAnalysis(metrics),
      costAnalysis: this.generateCostAnalysis(metrics),
      valuationAssessment,
      marketAnalysis: this.generateMarketAnalysis(inputs, metrics),
      comparableAnalysis: this.generateComparableAnalysis(inputs, metrics),
      insuranceAnalysis,
      pmiAnalysis: this.generatePMIAnalysis(inputs, metrics),
      costAnalysis: this.generateCostAnalysis(metrics),
      approvalRecommendations,
      riskMitigation,
      optimizationSuggestions,
      implementationPlan: this.generateImplementationPlan(inputs, metrics),
      nextSteps: this.getNextSteps(ltvRating, riskRating, metrics),
      timeline: this.generateTimeline(inputs, metrics),
      monitoringPlan: this.generateMonitoringPlan(inputs, metrics),
      keyMetrics: this.getKeyMetrics(metrics),
      reviewSchedule: this.generateReviewSchedule(inputs, metrics),
      riskManagement: this.generateRiskManagement(inputs, metrics),
      mitigationStrategies: this.getMitigationStrategies(inputs, metrics),
      contingencyPlans: this.getContingencyPlans(inputs, metrics),
      performanceBenchmarks: this.getPerformanceBenchmarks(inputs, metrics),
      decisionRecommendation: this.getDecisionRecommendation(ltvRating, riskRating, metrics),
      presentationPoints: this.getPresentationPoints(inputs, metrics),
      decisionFactors: this.getDecisionFactors(inputs, metrics)
    };
  }

  private getLTVRating(ltvRatio: number): 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' {
    if (ltvRatio <= 0.70) return 'Excellent';
    if (ltvRatio <= 0.75) return 'Good';
    if (ltvRatio <= 0.80) return 'Average';
    if (ltvRatio <= 0.85) return 'Poor';
    return 'Very Poor';
  }

  private getRiskRating(riskScore: number): 'Low' | 'Moderate' | 'High' | 'Very High' {
    if (riskScore <= 0.3) return 'Low';
    if (riskScore <= 0.5) return 'Moderate';
    if (riskScore <= 0.7) return 'High';
    return 'Very High';
  }

  private getRecommendation(
    ltvRating: string,
    riskRating: string,
    metrics: LoanToValueMetrics
  ): 'Approve' | 'Conditional' | 'Reject' | 'Requires Review' {
    if (ltvRating === 'Excellent' && riskRating === 'Low') return 'Approve';
    if (ltvRating === 'Good' && riskRating === 'Low') return 'Approve';
    if (ltvRating === 'Average' && riskRating === 'Low') return 'Conditional';
    if (ltvRating === 'Good' && riskRating === 'Moderate') return 'Conditional';
    if (ltvRating === 'Poor' && riskRating === 'High') return 'Reject';
    if (ltvRating === 'Very Poor') return 'Reject';
    if (riskRating === 'Very High') return 'Reject';
    return 'Requires Review';
  }

  private getKeyStrengths(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    const strengths: string[] = [];
    
    if (metrics.loanToValueRatio <= 0.75) {
      strengths.push('Conservative LTV ratio provides strong equity cushion');
    }
    
    if (inputs.borrowerCreditScore >= 750) {
      strengths.push('Excellent borrower credit profile');
    }
    
    if (inputs.borrowerDebtToIncomeRatio <= 0.35) {
      strengths.push('Strong debt-to-income ratio indicates good payment capacity');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      strengths.push('Favorable market conditions support property value stability');
    }
    
    if (inputs.propertyCondition === 'excellent' || inputs.propertyCondition === 'good') {
      strengths.push('Property in good condition reduces maintenance risk');
    }
    
    if (metrics.equityPercentage >= 0.25) {
      strengths.push('Strong equity position provides borrower commitment');
    }
    
    if (!metrics.pmiRequired) {
      strengths.push('No PMI required reduces monthly payment burden');
    }
    
    return strengths;
  }

  private getKeyWeaknesses(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    const weaknesses: string[] = [];
    
    if (metrics.loanToValueRatio > 0.80) {
      weaknesses.push('High LTV ratio increases lender risk exposure');
    }
    
    if (inputs.borrowerCreditScore < 650) {
      weaknesses.push('Below-average borrower credit score');
    }
    
    if (inputs.borrowerDebtToIncomeRatio > 0.45) {
      weaknesses.push('High debt-to-income ratio may strain payment capacity');
    }
    
    if (inputs.marketCondition === 'declining') {
      weaknesses.push('Challenging market conditions may impact property value');
    }
    
    if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_repair') {
      weaknesses.push('Property condition issues may require additional investment');
    }
    
    if (metrics.pmiRequired) {
      weaknesses.push('PMI requirement increases monthly payment cost');
    }
    
    if (inputs.daysOnMarket > 90) {
      weaknesses.push('Property has been on market for extended period');
    }
    
    return weaknesses;
  }

  private getRiskFactors(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    const risks: string[] = [];
    
    if (inputs.marketRisk === 'high') {
      risks.push('High market risk due to economic uncertainty or oversupply');
    }
    
    if (inputs.propertyRisk === 'high') {
      risks.push('High property risk due to location, condition, or market factors');
    }
    
    if (inputs.borrowerRisk === 'high') {
      risks.push('High borrower risk due to credit, income, or employment factors');
    }
    
    if (inputs.loanRisk === 'high') {
      risks.push('High loan risk due to terms, structure, or program factors');
    }
    
    if (metrics.probabilityOfDefault > 0.10) {
      risks.push('Elevated probability of default based on risk assessment');
    }
    
    if (inputs.propertyAge > 30) {
      risks.push('Older property may require significant maintenance or updates');
    }
    
    return risks;
  }

  private getOpportunities(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    const opportunities: string[] = [];
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      opportunities.push('Strong market conditions may support property appreciation');
    }
    
    if (metrics.equityPercentage > 0.30) {
      opportunities.push('Strong equity position provides refinancing flexibility');
    }
    
    if (inputs.propertyAppreciationRate > 0.05) {
      opportunities.push('Above-average appreciation rate supports long-term value');
    }
    
    if (inputs.loanType === 'va' || inputs.loanType === 'fha') {
      opportunities.push('Government loan program may provide favorable terms');
    }
    
    return opportunities;
  }

  private generateLTVSummary(metrics: LoanToValueMetrics): string {
    return `The loan-to-value ratio of ${(metrics.loanToValueRatio * 100).toFixed(1)}% indicates ${this.getLTVRating(metrics.loanToValueRatio).toLowerCase()} leverage for this property. The borrower has ${(metrics.equityPercentage * 100).toFixed(1)}% equity position, providing a ${(metrics.equityPosition).toLocaleString()} equity cushion. This structure ${metrics.loanToValueRatio <= 0.75 ? 'provides strong protection' : 'requires careful monitoring'} for the lender.`;
  }

  private generateEquityAnalysis(metrics: LoanToValueMetrics): string {
    return `Equity analysis shows ${(metrics.equityPercentage * 100).toFixed(1)}% equity position with ${(metrics.equityPosition).toLocaleString()} in equity value. This ${metrics.equityPercentage >= 0.25 ? 'strong' : 'adequate'} equity position ${metrics.equityPercentage >= 0.25 ? 'provides excellent borrower commitment' : 'meets minimum requirements'} and reduces lender risk exposure.`;
  }

  private generateLoanAnalysis(metrics: LoanToValueMetrics): string {
    return `Loan analysis shows ${(metrics.loanPercentage * 100).toFixed(1)}% of property value financed with monthly payment of ${(metrics.monthlyPayment).toLocaleString()}. Total interest expense over loan term is ${(metrics.totalInterestPaid).toLocaleString()}, resulting in effective interest rate of ${(metrics.effectiveInterestRate * 100).toFixed(2)}%.`;
  }

  private generateRiskAssessment(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Overall risk score of ${(metrics.riskScore * 100).toFixed(1)}% indicates ${this.getRiskRating(metrics.riskScore).toLowerCase()} risk. Probability of default is ${(metrics.probabilityOfDefault * 100).toFixed(1)}%, with expected loss of ${(metrics.expectedLoss).toLocaleString()} in default scenario. Loss given default is ${(metrics.lossGivenDefault * 100).toFixed(1)}%.`;
  }

  private generateFinancialSummary(metrics: LoanToValueMetrics): string {
    return `Financial analysis shows total cost of ${(metrics.totalCost).toLocaleString()} with cost of credit at ${(metrics.costOfCredit).toLocaleString()}. Monthly cash flow is ${(metrics.monthlyCashFlow).toLocaleString()} with annual cash flow of ${(metrics.annualCashFlow).toLocaleString()}. Break-even point is reached at ${(metrics.breakEvenPoint).toFixed(1)} months.`;
  }

  private generateValuationAssessment(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Valuation assessment shows property value of ${(inputs.propertyValue).toLocaleString()} with appraisal value of ${(inputs.appraisalValue).toLocaleString()}. Market value of ${(inputs.marketValue).toLocaleString()} and assessed value of ${(inputs.assessedValue).toLocaleString()} provide ${inputs.propertyValue >= inputs.appraisalValue ? 'strong' : 'adequate'} valuation support.`;
  }

  private generateInsuranceAnalysis(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Insurance analysis shows total annual insurance cost of ${(metrics.totalInsuranceCost).toLocaleString()} including property insurance of ${(inputs.propertyInsurance).toLocaleString()}, property taxes of ${(inputs.propertyTaxes).toLocaleString()}, and HOA fees of ${(inputs.hoaFees).toLocaleString()}. ${metrics.pmiRequired ? `PMI is required at ${(metrics.pmiCost).toLocaleString()} annually for ${(metrics.pmiDuration).toFixed(1)} years.` : 'No PMI is required.'}`;
  }

  private generatePMIAnalysis(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    if (!metrics.pmiRequired) {
      return 'No PMI is required for this loan due to LTV ratio below threshold.';
    }
    
    return `PMI is required at rate of ${(inputs.pmiRate * 100).toFixed(2)}% annually, costing ${(metrics.pmiCost).toLocaleString()} per year. PMI will be required for approximately ${(metrics.pmiDuration).toFixed(1)} years until LTV ratio reaches ${(inputs.pmiThreshold * 100).toFixed(0)}%.`;
  }

  private generateCostAnalysis(metrics: LoanToValueMetrics): string {
    return `Cost analysis shows total cost of ${(metrics.totalCost).toLocaleString()} with cost of credit at ${(metrics.costOfCredit).toLocaleString()}. Effective interest rate is ${(metrics.effectiveInterestRate * 100).toFixed(2)}%, including all fees and insurance costs.`;
  }

  private generateCashFlowAnalysis(metrics: LoanToValueMetrics): string {
    return `Cash flow analysis shows monthly cash flow of ${(metrics.monthlyCashFlow).toLocaleString()} and annual cash flow of ${(metrics.annualCashFlow).toLocaleString()}. Break-even point is reached at ${(metrics.breakEvenPoint).toFixed(1)} months, indicating ${metrics.breakEvenPoint <= 12 ? 'strong' : 'adequate'} cash flow performance.`;
  }

  private generateMarketAnalysis(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Market analysis shows ${inputs.marketCondition} market conditions in ${inputs.marketLocation} with growth rate of ${(inputs.marketGrowthRate * 100).toFixed(1)}%. Property has been on market for ${inputs.daysOnMarket} days, indicating ${inputs.daysOnMarket <= 30 ? 'strong' : 'moderate'} market demand.`;
  }

  private generateComparableAnalysis(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Comparable analysis shows property positioned ${metrics.marketPosition} in the market. Key metrics include LTV ratio of ${(metrics.loanToValueRatio * 100).toFixed(1)}%, equity position of ${(metrics.equityPercentage * 100).toFixed(1)}%, and risk score of ${(metrics.riskScore * 100).toFixed(1)}%.`;
  }

  private getApprovalRecommendations(ltvRating: string, riskRating: string, metrics: LoanToValueMetrics): string[] {
    const recommendations: string[] = [];
    
    if (ltvRating === 'Excellent' && riskRating === 'Low') {
      recommendations.push('Approve with standard terms and conditions');
      recommendations.push('Consider competitive pricing due to low risk profile');
    } else if (ltvRating === 'Good' && riskRating === 'Low') {
      recommendations.push('Approve with standard terms');
      recommendations.push('Monitor property value and market conditions');
    } else if (ltvRating === 'Average' && riskRating === 'Low') {
      recommendations.push('Approve with enhanced monitoring requirements');
      recommendations.push('Require annual property value assessments');
    } else if (riskRating === 'Moderate') {
      recommendations.push('Conditional approval with risk mitigation measures');
      recommendations.push('Require additional collateral or guarantees');
    } else {
      recommendations.push('Require comprehensive risk mitigation plan');
      recommendations.push('Consider higher pricing or additional security');
    }
    
    return recommendations;
  }

  private getRiskMitigation(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    const mitigations: string[] = [];
    
    if (inputs.marketRisk === 'high') {
      mitigations.push('Require market analysis updates every quarter');
      mitigations.push('Consider interest rate cap or hedging strategy');
    }
    
    if (inputs.propertyRisk === 'high') {
      mitigations.push('Require property inspection and condition assessment');
      mitigations.push('Implement maintenance and improvement requirements');
    }
    
    if (inputs.borrowerRisk === 'high') {
      mitigations.push('Require personal guarantee from all borrowers');
      mitigations.push('Implement monthly financial reporting requirements');
    }
    
    if (metrics.loanToValueRatio > 0.80) {
      mitigations.push('Require additional equity contribution or collateral');
      mitigations.push('Implement stricter payment monitoring');
    }
    
    return mitigations;
  }

  private getOptimizationSuggestions(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    const suggestions: string[] = [];
    
    if (metrics.loanToValueRatio > 0.75) {
      suggestions.push('Consider increasing down payment to improve LTV ratio');
      suggestions.push('Explore additional equity sources to strengthen position');
    }
    
    if (metrics.pmiRequired) {
      suggestions.push('Consider increasing down payment to eliminate PMI requirement');
      suggestions.push('Explore PMI alternatives or lender-paid PMI options');
    }
    
    if (inputs.borrowerDebtToIncomeRatio > 0.40) {
      suggestions.push('Consider debt consolidation to improve DTI ratio');
      suggestions.push('Explore co-borrower or guarantor options');
    }
    
    return suggestions;
  }

  private generateImplementationPlan(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Implementation plan includes loan closing within 30 days, with monthly payment of ${(metrics.monthlyPayment).toLocaleString()} beginning in month 1. Key milestones include property inspection, appraisal completion, and final underwriting approval.`;
  }

  private getNextSteps(ltvRating: string, riskRating: string, metrics: LoanToValueMetrics): string[] {
    const steps: string[] = [];
    
    if (ltvRating === 'Excellent' || ltvRating === 'Good') {
      steps.push('Proceed with loan documentation and closing');
      steps.push('Schedule property inspection and appraisal');
    } else {
      steps.push('Complete additional due diligence requirements');
      steps.push('Finalize risk mitigation measures');
    }
    
    steps.push('Establish monitoring and reporting schedule');
    steps.push('Coordinate with title company and closing agent');
    
    return steps;
  }

  private generateTimeline(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Loan timeline includes 30-day closing period with monthly payments of ${(metrics.monthlyPayment).toLocaleString()} over ${inputs.loanTerm} months. Key milestones include underwriting approval (Day 10), appraisal completion (Day 15), and final closing (Day 30).`;
  }

  private generateMonitoringPlan(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Monitoring plan includes monthly payment tracking, quarterly property value assessments, and annual borrower financial reviews. Key metrics to track include payment history, property value changes, and borrower financial capacity.`;
  }

  private getKeyMetrics(metrics: LoanToValueMetrics): string[] {
    return [
      'Loan-to-Value Ratio',
      'Equity Position',
      'Monthly Payment',
      'Risk Score',
      'Property Value',
      'Borrower Credit Score',
      'Market Conditions'
    ];
  }

  private generateReviewSchedule(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Review schedule includes monthly payment reviews, quarterly property value assessments, and annual borrower financial reviews. Additional reviews may be triggered by significant changes in property value or borrower financial capacity.`;
  }

  private generateRiskManagement(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Risk management framework includes regular monitoring of payment history, property value, and borrower financial capacity. Contingency plans address potential payment defaults, property value declines, and borrower financial distress.`;
  }

  private getMitigationStrategies(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    return [
      'Regular payment monitoring and reporting',
      'Property value assessment and updates',
      'Borrower financial capacity reviews',
      'Market condition monitoring',
      'Insurance coverage verification'
    ];
  }

  private getContingencyPlans(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    return [
      'Payment default resolution plan',
      'Property value decline response plan',
      'Borrower financial distress support plan',
      'Market deterioration contingency plan',
      'Property maintenance and improvement plan'
    ];
  }

  private getPerformanceBenchmarks(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): any[] {
    return [
      { metric: 'LTV Ratio', target: 0.75, benchmark: metrics.loanToValueRatio, industry: 'Residential Mortgage' },
      { metric: 'Equity Position', target: 0.25, benchmark: metrics.equityPercentage, industry: 'Residential Mortgage' },
      { metric: 'Risk Score', target: 0.30, benchmark: metrics.riskScore, industry: 'Residential Mortgage' }
    ];
  }

  private getDecisionRecommendation(ltvRating: string, riskRating: string, metrics: LoanToValueMetrics): string {
    if (ltvRating === 'Excellent' && riskRating === 'Low') {
      return 'Strong recommendation for approval with competitive terms';
    } else if (ltvRating === 'Good' && riskRating === 'Low') {
      return 'Recommendation for approval with standard terms';
    } else if (ltvRating === 'Average' && riskRating === 'Low') {
      return 'Conditional approval recommendation with enhanced monitoring';
    } else if (riskRating === 'Moderate') {
      return 'Conditional approval with risk mitigation measures required';
    } else {
      return 'Requires additional review and risk mitigation before approval';
    }
  }

  private getPresentationPoints(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    return [
      `LTV ratio of ${(metrics.loanToValueRatio * 100).toFixed(1)}% is ${this.getLTVRating(metrics.loanToValueRatio).toLowerCase()}`,
      `Equity position of ${(metrics.equityPercentage * 100).toFixed(1)}% provides strong borrower commitment`,
      `Monthly payment of ${(metrics.monthlyPayment).toLocaleString()} is ${inputs.borrowerDebtToIncomeRatio <= 0.35 ? 'affordable' : 'manageable'} for borrower`,
      `Risk score of ${(metrics.riskScore * 100).toFixed(1)}% indicates ${this.getRiskRating(metrics.riskScore).toLowerCase()} risk profile`
    ];
  }

  private getDecisionFactors(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string[] {
    return [
      'Loan-to-Value Ratio',
      'Borrower Credit Score',
      'Debt-to-Income Ratio',
      'Property Value and Condition',
      'Market Conditions',
      'Equity Position'
    ];
  }

  private getMarketRiskAssessment(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Market risk is assessed as ${inputs.marketRisk} based on current market conditions (${inputs.marketCondition}) and growth rate of ${(inputs.marketGrowthRate * 100).toFixed(1)}%. Location in ${inputs.marketLocation} provides ${inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'favorable' : 'challenging'} market dynamics.`;
  }

  private getPropertyRiskAssessment(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Property risk is assessed as ${inputs.propertyRisk} based on property type (${inputs.propertyType}), condition (${inputs.propertyCondition}), and age (${inputs.propertyAge} years). Property size of ${inputs.propertySize} sq ft and location factors contribute to risk assessment.`;
  }

  private getBorrowerRiskAssessment(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Borrower risk is assessed as ${inputs.borrowerRisk} based on credit score of ${inputs.borrowerCreditScore}, debt-to-income ratio of ${(inputs.borrowerDebtToIncomeRatio * 100).toFixed(1)}%, and employment type (${inputs.borrowerEmploymentType}). Income of ${(inputs.borrowerIncome).toLocaleString()} and assets of ${(inputs.borrowerAssets).toLocaleString()} provide ${inputs.borrowerRisk === 'low' ? 'strong' : 'adequate'} financial support.`;
  }

  private getLoanRiskAssessment(inputs: LoanToValueInputs, metrics: LoanToValueMetrics): string {
    return `Loan risk is assessed as ${inputs.loanRisk} based on loan type (${inputs.loanType}), payment type (${inputs.paymentType}), and terms. Interest rate of ${(inputs.interestRate * 100).toFixed(2)}% and term of ${inputs.loanTerm} months provide ${inputs.loanRisk === 'low' ? 'favorable' : 'adequate'} loan structure.`;
  }
}