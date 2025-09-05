import { Calculator } from '../../../data/calculatorRegistry';
import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceOutputs, PrivateMortgageInsuranceMetrics, PrivateMortgageInsuranceAnalysis } from './types';
import { calculatePrivateMortgageInsuranceMetrics } from './formulas';
import { validatePrivateMortgageInsuranceInputs } from './validation';

export class PrivateMortgageInsuranceCalculator implements Calculator<PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceOutputs> {
  name = 'Private Mortgage Insurance (PMI) Calculator';
  description = 'Calculate PMI costs, cancellation eligibility, and savings opportunities for mortgage loans with comprehensive analysis';
  category = 'Finance';
  tags = ['mortgage', 'pmi', 'insurance', 'cancellation', 'savings', 'equity', 'ltv'];
  icon = '🛡️';
  version = '1.0.0';
  author = 'CalculateThis.ai';
  url = 'private-mortgage-insurance';
  documentation = 'https://calculatethis.ai/docs/private-mortgage-insurance';
  examples = [
    {
      name: 'Conventional Loan with PMI',
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
        downPayment: 50000,
        downPaymentPercentage: 0.10,
        downPaymentSource: 'savings' as const,
        pmiRequired: true,
        pmiRate: 0.005,
        pmiType: 'monthly' as const,
        pmiCancellationMethod: 'automatic' as const,
        borrowerIncome: 120000,
        borrowerCreditScore: 750,
        borrowerDebtToIncomeRatio: 0.35,
        borrowerEmploymentType: 'employed' as const,
        borrowerTaxRate: 0.25,
        loanStartDate: '2024-01-01',
        paymentsMade: 12,
        monthsSinceLoanStart: 12,
        currentPrincipalBalance: 395000,
        marketLocation: 'Anytown, ST',
        marketCondition: 'growing' as const,
        marketGrowthRate: 0.04,
        propertyAppreciationRate: 0.03,
        ltvThreshold: 0.80,
        paymentHistory: [
          { paymentNumber: 1, paymentDate: '2024-02-01', paymentAmount: 2500, principal: 500, interest: 2000, balance: 399500, onTime: true },
          { paymentNumber: 2, paymentDate: '2024-03-01', paymentAmount: 2500, principal: 505, interest: 1995, balance: 398995, onTime: true },
          { paymentNumber: 3, paymentDate: '2024-04-01', paymentAmount: 2500, principal: 510, interest: 1990, balance: 398485, onTime: true }
        ],
        analysisPeriod: 30,
        inflationRate: 0.03,
        discountRate: 0.05,
        currency: 'USD' as const,
        displayFormat: 'currency' as const,
        includeCharts: true
      }
    }
  ];

  calculate(inputs: PrivateMortgageInsuranceInputs): PrivateMortgageInsuranceOutputs {
    // Validate inputs
    const validation = validatePrivateMortgageInsuranceInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Calculate metrics
    const metrics = calculatePrivateMortgageInsuranceMetrics(inputs);

    // Generate analysis
    const analysis = this.generateAnalysis(inputs, metrics);

    return {
      // Core Metrics
      pmiRequired: metrics.pmiRequired,
      pmiMonthlyPayment: metrics.pmiMonthlyPayment,
      pmiAnnualCost: metrics.pmiAnnualCost,
      loanToValueRatio: metrics.loanToValueRatio,
      cancellationEligibility: metrics.cancellationEligibility,
      breakEvenMonths: metrics.breakEvenMonths,
      riskScore: metrics.riskScore,
      totalPMICost: metrics.totalPMICost,
      
      // Analysis
      analysis,
      
      // Additional Metrics
      pmiRate: metrics.pmiRate,
      pmiTotalCost: metrics.pmiTotalCost,
      currentLtvRatio: metrics.currentLtvRatio,
      ltvGap: metrics.ltvGap,
      equityPosition: metrics.equityPosition,
      equityPercentage: metrics.equityPercentage,
      monthlyPayment: metrics.monthlyPayment,
      monthlyPaymentWithoutPMI: metrics.monthlyPaymentWithoutPMI,
      paymentIncrease: metrics.paymentIncrease,
      paymentIncreasePercentage: metrics.paymentIncreasePercentage,
      pmiSavings: metrics.pmiSavings,
      effectiveInterestRate: metrics.effectiveInterestRate,
      totalLoanCost: metrics.totalLoanCost,
      automaticCancellationDate: metrics.automaticCancellationDate,
      requestCancellationDate: metrics.requestCancellationDate,
      monthsToAutomaticCancellation: metrics.monthsToAutomaticCancellation,
      monthsToRequestCancellation: metrics.monthsToRequestCancellation,
      breakEvenPoint: metrics.breakEvenPoint,
      breakEvenCost: metrics.breakEvenCost,
      netSavings: metrics.netSavings,
      timelineAnalysis: metrics.timelineAnalysis,
      sensitivityMatrix: metrics.sensitivityMatrix,
      scenarios: metrics.scenarios,
      comparisonAnalysis: metrics.comparisonAnalysis,
      probabilityOfCancellation: metrics.probabilityOfCancellation,
      worstCaseScenario: metrics.worstCaseScenario,
      bestCaseScenario: metrics.bestCaseScenario,
      taxDeduction: metrics.taxDeduction,
      afterTaxCost: metrics.afterTaxCost,
      taxBenefit: metrics.taxBenefit,
      marketAnalysis: metrics.marketAnalysis
    };
  }

  private generateAnalysis(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): PrivateMortgageInsuranceAnalysis {
    // PMI Rating
    const pmiRating = this.getPMIRating(metrics.pmiRequired, metrics.cancellationEligibility);
    const costRating = this.getCostRating(metrics.pmiAnnualCost);
    const recommendation = this.getRecommendation(pmiRating, costRating, metrics);

    // Key Insights
    const keyStrengths = this.getKeyStrengths(inputs, metrics);
    const keyWeaknesses = this.getKeyWeaknesses(inputs, metrics);
    const costFactors = this.getCostFactors(inputs, metrics);
    const opportunities = this.getOpportunities(inputs, metrics);

    // Analysis Sections
    const pmiSummary = this.generatePMISummary(metrics);
    const costAnalysis = this.generateCostAnalysis(metrics);
    const requirementAnalysis = this.generateRequirementAnalysis(inputs, metrics);
    const cancellationSummary = this.generateCancellationSummary(metrics);
    const equitySummary = this.generateEquitySummary(metrics);
    const paymentSummary = this.generatePaymentSummary(metrics);
    const riskAssessment = this.generateRiskAssessment(inputs, metrics);
    const marketAnalysis = this.generateMarketAnalysis(inputs, metrics);
    const taxSummary = this.generateTaxSummary(metrics);

    // Recommendations
    const pmiRecommendations = this.getPMIRecommendations(pmiRating, costRating, metrics);
    const cancellationRecommendations = this.getCancellationRecommendations(metrics);
    const optimizationSuggestions = this.getOptimizationSuggestions(inputs, metrics);

    return {
      pmiRating,
      costRating,
      recommendation,
      keyStrengths,
      keyWeaknesses,
      costFactors,
      opportunities,
      pmiSummary,
      costAnalysis,
      requirementAnalysis,
      cancellationSummary,
      eligibilityAnalysis: this.generateEligibilityAnalysis(metrics),
      timelineAnalysis: this.generateTimelineAnalysis(metrics),
      costSummary: this.generateCostSummary(metrics),
      savingsAnalysis: this.generateSavingsAnalysis(metrics),
      breakEvenAnalysis: this.generateBreakEvenAnalysis(metrics),
      paymentSummary,
      impactAnalysis: this.generateImpactAnalysis(metrics),
      cashFlowAnalysis: this.generateCashFlowAnalysis(metrics),
      equitySummary,
      equityGrowthAnalysis: this.generateEquityGrowthAnalysis(metrics),
      ltvAnalysis: this.generateLTVAnalysis(metrics),
      riskAssessment,
      cancellationRisk: this.getCancellationRisk(metrics),
      marketRisk: this.getMarketRisk(inputs, metrics),
      timingRisk: this.getTimingRisk(metrics),
      marketAnalysis,
      appreciationAnalysis: this.generateAppreciationAnalysis(inputs, metrics),
      competitiveAnalysis: this.generateCompetitiveAnalysis(metrics),
      taxSummary,
      deductionAnalysis: this.generateDeductionAnalysis(metrics),
      benefitAnalysis: this.generateBenefitAnalysis(metrics),
      pmiRecommendations,
      cancellationRecommendations,
      optimizationSuggestions,
      implementationPlan: this.generateImplementationPlan(inputs, metrics),
      nextSteps: this.getNextSteps(pmiRating, costRating, metrics),
      timeline: this.generateTimeline(inputs, metrics),
      monitoringPlan: this.generateMonitoringPlan(inputs, metrics),
      keyMetrics: this.getKeyMetrics(metrics),
      reviewSchedule: this.generateReviewSchedule(inputs, metrics),
      riskManagement: this.generateRiskManagement(inputs, metrics),
      mitigationStrategies: this.getMitigationStrategies(inputs, metrics),
      contingencyPlans: this.getContingencyPlans(inputs, metrics),
      performanceBenchmarks: this.getPerformanceBenchmarks(inputs, metrics),
      decisionRecommendation: this.getDecisionRecommendation(pmiRating, costRating, metrics),
      presentationPoints: this.getPresentationPoints(inputs, metrics),
      decisionFactors: this.getDecisionFactors(inputs, metrics)
    };
  }

  private getPMIRating(pmiRequired: boolean, cancellationEligibility: boolean): 'Required' | 'Not Required' | 'Eligible for Cancellation' | 'Consider Refinance' | 'Requires Review' {
    if (!pmiRequired) return 'Not Required';
    if (cancellationEligibility) return 'Eligible for Cancellation';
    return 'Required';
  }

  private getCostRating(pmiAnnualCost: number): 'High Cost' | 'Moderate Cost' | 'Low Cost' | 'No Cost' {
    if (pmiAnnualCost === 0) return 'No Cost';
    if (pmiAnnualCost > 3000) return 'High Cost';
    if (pmiAnnualCost > 1500) return 'Moderate Cost';
    return 'Low Cost';
  }

  private getRecommendation(
    pmiRating: string,
    costRating: string,
    metrics: PrivateMortgageInsuranceMetrics
  ): 'Keep PMI' | 'Cancel PMI' | 'Refinance' | 'Requires Review' {
    if (pmiRating === 'Not Required') return 'Keep PMI';
    if (pmiRating === 'Eligible for Cancellation') return 'Cancel PMI';
    if (costRating === 'High Cost' && metrics.breakEvenMonths < 24) return 'Refinance';
    return 'Requires Review';
  }

  private getKeyStrengths(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const strengths: string[] = [];
    
    if (!metrics.pmiRequired) {
      strengths.push('No PMI required - significant monthly savings');
    }
    
    if (metrics.cancellationEligibility) {
      strengths.push('Eligible for PMI cancellation - immediate savings opportunity');
    }
    
    if (metrics.equityPercentage >= 0.20) {
      strengths.push('Strong equity position provides financial security');
    }
    
    if (inputs.borrowerCreditScore >= 750) {
      strengths.push('Excellent credit score may qualify for better PMI rates');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      strengths.push('Favorable market conditions support property appreciation');
    }
    
    if (metrics.breakEvenMonths < 12) {
      strengths.push('Quick break-even point for PMI cancellation');
    }
    
    return strengths;
  }

  private getKeyWeaknesses(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const weaknesses: string[] = [];
    
    if (metrics.pmiRequired && !metrics.cancellationEligibility) {
      weaknesses.push('PMI required with no immediate cancellation option');
    }
    
    if (metrics.pmiAnnualCost > 3000) {
      weaknesses.push('High PMI cost significantly impacts monthly budget');
    }
    
    if (metrics.equityPercentage < 0.10) {
      weaknesses.push('Low equity position increases risk exposure');
    }
    
    if (inputs.borrowerCreditScore < 650) {
      weaknesses.push('Below-average credit score may result in higher PMI rates');
    }
    
    if (inputs.marketCondition === 'declining') {
      weaknesses.push('Declining market conditions may delay PMI cancellation');
    }
    
    if (metrics.breakEvenMonths > 36) {
      weaknesses.push('Long break-even period for PMI cancellation');
    }
    
    return weaknesses;
  }

  private getCostFactors(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const factors: string[] = [];
    
    factors.push(`PMI rate of ${(metrics.pmiRate * 100).toFixed(2)}% affects monthly cost`);
    factors.push(`Loan amount of ${(inputs.loanAmount).toLocaleString()} determines PMI base`);
    factors.push(`Property value of ${(inputs.propertyValue).toLocaleString()} affects LTV calculation`);
    factors.push(`Current LTV of ${(metrics.currentLtvRatio * 100).toFixed(1)}% determines PMI requirement`);
    
    if (inputs.pmiType === 'single_premium') {
      factors.push('Single premium PMI requires upfront payment');
    } else if (inputs.pmiType === 'lender_paid') {
      factors.push('Lender-paid PMI may result in higher interest rate');
    }
    
    return factors;
  }

  private getOpportunities(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const opportunities: string[] = [];
    
    if (metrics.cancellationEligibility) {
      opportunities.push('Immediate PMI cancellation can save thousands annually');
    }
    
    if (inputs.propertyAppreciationRate > 0.05) {
      opportunities.push('Strong appreciation rate may accelerate PMI cancellation');
    }
    
    if (inputs.borrowerCreditScore >= 750) {
      opportunities.push('High credit score may qualify for PMI rate reduction');
    }
    
    if (metrics.breakEvenMonths < 18) {
      opportunities.push('Quick break-even point makes PMI cancellation attractive');
    }
    
    if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
      opportunities.push('Market appreciation may accelerate equity growth');
    }
    
    return opportunities;
  }

  private generatePMISummary(metrics: PrivateMortgageInsuranceMetrics): string {
    return `PMI analysis shows ${metrics.pmiRequired ? 'required' : 'not required'} status with ${metrics.pmiRequired ? `monthly payment of ${(metrics.pmiMonthlyPayment).toLocaleString()}` : 'no monthly cost'}. ${metrics.pmiRequired ? `Annual cost is ${(metrics.pmiAnnualCost).toLocaleString()} with total cost of ${(metrics.totalPMICost).toLocaleString()}` : 'No PMI costs apply'}. ${metrics.cancellationEligibility ? 'Eligible for cancellation' : 'Not eligible for cancellation'} based on current LTV ratio.`;
  }

  private generateCostAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Cost analysis shows PMI rate of ${(metrics.pmiRate * 100).toFixed(2)}% resulting in ${metrics.pmiRequired ? `monthly payment of ${(metrics.pmiMonthlyPayment).toLocaleString()}` : 'no monthly payment'}. ${metrics.pmiRequired ? `Annual cost is ${(metrics.pmiAnnualCost).toLocaleString()} with total projected cost of ${(metrics.totalPMICost).toLocaleString()}` : 'No PMI costs apply'}. Effective interest rate including PMI is ${(metrics.effectiveInterestRate * 100).toFixed(2)}%.`;
  }

  private generateRequirementAnalysis(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `PMI requirement analysis shows current LTV ratio of ${(metrics.currentLtvRatio * 100).toFixed(1)}% compared to threshold of ${(inputs.ltvThreshold * 100).toFixed(0)}%. ${metrics.pmiRequired ? 'PMI is required' : 'PMI is not required'} based on current loan-to-value ratio. ${metrics.cancellationEligibility ? 'Eligible for cancellation' : 'Not eligible for cancellation'} at this time.`;
  }

  private generateCancellationSummary(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Cancellation analysis shows ${metrics.cancellationEligibility ? 'eligibility for immediate cancellation' : 'no current eligibility'}. ${metrics.cancellationEligibility ? `Automatic cancellation expected in ${metrics.monthsToAutomaticCancellation} months` : `Automatic cancellation expected in ${metrics.monthsToAutomaticCancellation} months`}. ${metrics.cancellationEligibility ? `Request cancellation available now` : `Request cancellation available in ${metrics.monthsToRequestCancellation} months`}.`;
  }

  private generateEquitySummary(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Equity analysis shows current equity position of ${(metrics.equityPosition).toLocaleString()} representing ${(metrics.equityPercentage * 100).toFixed(1)}% of property value. LTV gap to cancellation is ${(metrics.ltvGap * 100).toFixed(1)} percentage points. ${metrics.equityPercentage >= 0.20 ? 'Strong equity position' : 'Adequate equity position'} provides ${metrics.equityPercentage >= 0.20 ? 'excellent' : 'good'} financial security.`;
  }

  private generatePaymentSummary(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Payment analysis shows monthly payment of ${(metrics.monthlyPayment).toLocaleString()} including PMI, compared to ${(metrics.monthlyPaymentWithoutPMI).toLocaleString()} without PMI. PMI increases payment by ${(metrics.paymentIncrease).toLocaleString()} (${(metrics.paymentIncreasePercentage * 100).toFixed(1)}%). Total payment impact over loan term is ${(metrics.pmiTotalCost).toLocaleString()}.`;
  }

  private generateRiskAssessment(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Risk assessment shows overall risk score of ${(metrics.riskScore * 100).toFixed(1)}% indicating ${this.getRiskLevel(metrics.riskScore)} risk. Probability of cancellation is ${(metrics.probabilityOfCancellation * 100).toFixed(1)}%. Worst case scenario shows ${(metrics.worstCaseScenario).toLocaleString()} in additional costs, while best case scenario shows ${(metrics.bestCaseScenario).toLocaleString()} in savings.`;
  }

  private generateMarketAnalysis(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Market analysis shows ${inputs.marketCondition} market conditions in ${inputs.marketLocation} with growth rate of ${(inputs.marketGrowthRate * 100).toFixed(1)}%. Property appreciation rate of ${(inputs.propertyAppreciationRate * 100).toFixed(1)}% ${inputs.propertyAppreciationRate > 0.03 ? 'supports' : 'may delay'} PMI cancellation timeline. Market conditions ${inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'favor' : 'challenge'} equity growth.`;
  }

  private generateTaxSummary(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Tax analysis shows annual PMI deduction of ${(metrics.taxDeduction).toLocaleString()} with after-tax cost of ${(metrics.afterTaxCost).toLocaleString()}. Tax benefit of ${(metrics.taxBenefit).toLocaleString()} reduces effective PMI cost. ${metrics.taxDeduction > 0 ? 'PMI may be tax deductible' : 'PMI is not tax deductible'} based on current tax law and borrower income.`;
  }

  private getRiskLevel(riskScore: number): string {
    if (riskScore <= 0.3) return 'low';
    if (riskScore <= 0.5) return 'moderate';
    if (riskScore <= 0.7) return 'high';
    return 'very high';
  }

  private generateEligibilityAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Eligibility analysis shows ${metrics.cancellationEligibility ? 'current eligibility for PMI cancellation' : 'no current eligibility for PMI cancellation'}. ${metrics.cancellationEligibility ? 'Borrower can request cancellation immediately' : `Borrower must wait ${metrics.monthsToRequestCancellation} months for eligibility`}. Automatic cancellation will occur in ${metrics.monthsToAutomaticCancellation} months.`;
  }

  private generateTimelineAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Timeline analysis shows PMI cancellation timeline with automatic cancellation in ${metrics.monthsToAutomaticCancellation} months and request cancellation ${metrics.cancellationEligibility ? 'available now' : `in ${metrics.monthsToRequestCancellation} months`}. Break-even point is reached in ${metrics.breakEvenMonths} months with break-even cost of ${(metrics.breakEvenCost).toLocaleString()}.`;
  }

  private generateCostSummary(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Cost summary shows total PMI cost of ${(metrics.totalPMICost).toLocaleString()} over loan term with annual cost of ${(metrics.pmiAnnualCost).toLocaleString()}. PMI savings of ${(metrics.pmiSavings).toLocaleString()} available through cancellation. Net savings after break-even is ${(metrics.netSavings).toLocaleString()}.`;
  }

  private generateSavingsAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Savings analysis shows potential PMI savings of ${(metrics.pmiSavings).toLocaleString()} through cancellation. Break-even point is reached in ${metrics.breakEvenMonths} months with break-even cost of ${(metrics.breakEvenCost).toLocaleString()}. Net savings after break-even is ${(metrics.netSavings).toLocaleString()}.`;
  }

  private generateBreakEvenAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Break-even analysis shows break-even point at ${metrics.breakEvenMonths} months with break-even cost of ${(metrics.breakEvenCost).toLocaleString()}. ${metrics.breakEvenMonths <= 12 ? 'Quick break-even makes cancellation attractive' : metrics.breakEvenMonths <= 24 ? 'Moderate break-even period' : 'Long break-even period requires careful consideration'}.`;
  }

  private generateImpactAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Impact analysis shows PMI increases monthly payment by ${(metrics.paymentIncrease).toLocaleString()} (${(metrics.paymentIncreasePercentage * 100).toFixed(1)}%). Total payment impact over loan term is ${(metrics.pmiTotalCost).toLocaleString()}. Effective interest rate including PMI is ${(metrics.effectiveInterestRate * 100).toFixed(2)}%.`;
  }

  private generateCashFlowAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Cash flow analysis shows monthly payment of ${(metrics.monthlyPayment).toLocaleString()} including PMI, compared to ${(metrics.monthlyPaymentWithoutPMI).toLocaleString()} without PMI. PMI impact on cash flow is ${(metrics.paymentIncrease).toLocaleString()} per month, representing ${(metrics.paymentIncreasePercentage * 100).toFixed(1)}% increase.`;
  }

  private generateEquityGrowthAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Equity growth analysis shows current equity position of ${(metrics.equityPosition).toLocaleString()} representing ${(metrics.equityPercentage * 100).toFixed(1)}% of property value. LTV gap to cancellation is ${(metrics.ltvGap * 100).toFixed(1)} percentage points. ${metrics.equityPercentage >= 0.20 ? 'Strong equity growth' : 'Adequate equity growth'} supports PMI cancellation timeline.`;
  }

  private generateLTVAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `LTV analysis shows current loan-to-value ratio of ${(metrics.currentLtvRatio * 100).toFixed(1)}% compared to original LTV of ${(metrics.loanToValueRatio * 100).toFixed(1)}%. LTV gap to cancellation is ${(metrics.ltvGap * 100).toFixed(1)} percentage points. ${metrics.currentLtvRatio <= 0.80 ? 'Current LTV meets cancellation threshold' : 'Current LTV exceeds cancellation threshold'}.`;
  }

  private getCancellationRisk(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Cancellation risk is ${metrics.cancellationEligibility ? 'low' : 'moderate'} based on current eligibility status. ${metrics.cancellationEligibility ? 'Immediate cancellation available' : `Cancellation available in ${metrics.monthsToRequestCancellation} months`}. Automatic cancellation in ${metrics.monthsToAutomaticCancellation} months provides fallback option.`;
  }

  private getMarketRisk(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Market risk is ${inputs.marketCondition === 'declining' ? 'high' : inputs.marketCondition === 'stable' ? 'moderate' : 'low'} based on current market conditions. ${inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'Favorable market conditions support equity growth' : 'Market conditions may delay equity growth'}. Property appreciation rate of ${(inputs.propertyAppreciationRate * 100).toFixed(1)}% affects cancellation timeline.`;
  }

  private getTimingRisk(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Timing risk is ${metrics.breakEvenMonths <= 12 ? 'low' : metrics.breakEvenMonths <= 24 ? 'moderate' : 'high'} based on break-even timeline. Break-even point at ${metrics.breakEvenMonths} months with break-even cost of ${(metrics.breakEvenCost).toLocaleString()}. ${metrics.breakEvenMonths <= 12 ? 'Quick break-even minimizes timing risk' : 'Extended break-even period increases timing risk'}.`;
  }

  private generateAppreciationAnalysis(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Appreciation analysis shows property appreciation rate of ${(inputs.propertyAppreciationRate * 100).toFixed(1)}% annually. ${inputs.propertyAppreciationRate > 0.05 ? 'Strong appreciation rate' : inputs.propertyAppreciationRate > 0.03 ? 'Moderate appreciation rate' : 'Below-average appreciation rate'} ${inputs.propertyAppreciationRate > 0.03 ? 'supports' : 'may delay'} PMI cancellation timeline.`;
  }

  private generateCompetitiveAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Competitive analysis shows PMI rate of ${(metrics.pmiRate * 100).toFixed(2)}% compared to industry average. ${metrics.pmiRate <= 0.005 ? 'Competitive PMI rate' : metrics.pmiRate <= 0.01 ? 'Average PMI rate' : 'Above-average PMI rate'} affects overall cost. Effective interest rate including PMI is ${(metrics.effectiveInterestRate * 100).toFixed(2)}%.`;
  }

  private generateDeductionAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Deduction analysis shows annual PMI deduction of ${(metrics.taxDeduction).toLocaleString()} based on current tax law. ${metrics.taxDeduction > 0 ? 'PMI may be tax deductible' : 'PMI is not tax deductible'} depending on borrower income and tax situation. Tax benefit reduces effective PMI cost.`;
  }

  private generateBenefitAnalysis(metrics: PrivateMortgageInsuranceMetrics): string {
    return `Benefit analysis shows tax benefit of ${(metrics.taxBenefit).toLocaleString()} annually, reducing effective PMI cost to ${(metrics.afterTaxCost).toLocaleString()}. ${metrics.taxBenefit > 0 ? 'Tax benefits provide significant cost reduction' : 'No tax benefits available'} for PMI payments.`;
  }

  private getPMIRecommendations(pmiRating: string, costRating: string, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const recommendations: string[] = [];
    
    if (pmiRating === 'Eligible for Cancellation') {
      recommendations.push('Request PMI cancellation immediately to save thousands annually');
      recommendations.push('Contact lender to initiate cancellation process');
    } else if (pmiRating === 'Required') {
      recommendations.push('Monitor LTV ratio for cancellation eligibility');
      recommendations.push('Consider making additional principal payments to accelerate cancellation');
    }
    
    if (costRating === 'High Cost') {
      recommendations.push('High PMI cost makes cancellation or refinancing attractive');
      recommendations.push('Consider refinancing to eliminate PMI if rates are favorable');
    }
    
    if (metrics.breakEvenMonths <= 12) {
      recommendations.push('Quick break-even point makes PMI cancellation very attractive');
    }
    
    return recommendations;
  }

  private getCancellationRecommendations(metrics: PrivateMortgageInsuranceMetrics): string[] {
    const recommendations: string[] = [];
    
    if (metrics.cancellationEligibility) {
      recommendations.push('Request PMI cancellation immediately');
      recommendations.push('Provide updated property appraisal to lender');
      recommendations.push('Ensure payment history meets lender requirements');
    } else {
      recommendations.push(`Wait ${metrics.monthsToRequestCancellation} months for eligibility`);
      recommendations.push('Make additional principal payments to accelerate eligibility');
      recommendations.push('Monitor property value for appreciation');
    }
    
    return recommendations;
  }

  private getOptimizationSuggestions(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const suggestions: string[] = [];
    
    if (metrics.pmiRequired && !metrics.cancellationEligibility) {
      suggestions.push('Make additional principal payments to accelerate PMI cancellation');
      suggestions.push('Consider refinancing if interest rates are favorable');
    }
    
    if (metrics.pmiRate > 0.01) {
      suggestions.push('Shop for better PMI rates with other lenders');
      suggestions.push('Improve credit score to qualify for lower PMI rates');
    }
    
    if (inputs.pmiType === 'monthly' && metrics.breakEvenMonths > 24) {
      suggestions.push('Consider single premium PMI if available');
      suggestions.push('Evaluate lender-paid PMI options');
    }
    
    return suggestions;
  }

  private generateImplementationPlan(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Implementation plan includes ${metrics.cancellationEligibility ? 'immediate PMI cancellation request' : 'monitoring for cancellation eligibility'}. ${metrics.cancellationEligibility ? 'Contact lender within 30 days' : `Check eligibility in ${metrics.monthsToRequestCancellation} months`}. Provide updated appraisal and payment history documentation.`;
  }

  private getNextSteps(pmiRating: string, costRating: string, metrics: PrivateMortgageInsuranceMetrics): string[] {
    const steps: string[] = [];
    
    if (pmiRating === 'Eligible for Cancellation') {
      steps.push('Contact lender to request PMI cancellation');
      steps.push('Obtain updated property appraisal');
      steps.push('Provide payment history documentation');
    } else if (pmiRating === 'Required') {
      steps.push('Monitor LTV ratio monthly');
      steps.push('Consider additional principal payments');
      steps.push('Track property value changes');
    }
    
    steps.push('Review PMI costs annually');
    steps.push('Compare with refinancing options');
    
    return steps;
  }

  private generateTimeline(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Timeline shows PMI cancellation ${metrics.cancellationEligibility ? 'available immediately' : `in ${metrics.monthsToRequestCancellation} months`} with automatic cancellation in ${metrics.monthsToAutomaticCancellation} months. Break-even point reached in ${metrics.breakEvenMonths} months. Total PMI cost projected at ${(metrics.totalPMICost).toLocaleString()}.`;
  }

  private generateMonitoringPlan(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Monitoring plan includes monthly LTV ratio tracking, quarterly property value assessments, and annual PMI cost reviews. Key metrics to monitor include current LTV ratio, property appreciation, and cancellation eligibility status.`;
  }

  private getKeyMetrics(metrics: PrivateMortgageInsuranceMetrics): string[] {
    return [
      'Current LTV Ratio',
      'PMI Monthly Payment',
      'Cancellation Eligibility',
      'Break-Even Timeline',
      'Total PMI Cost',
      'Property Value',
      'Equity Position'
    ];
  }

  private generateReviewSchedule(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Review schedule includes monthly LTV ratio checks, quarterly property value updates, and annual PMI cost analysis. Additional reviews triggered by significant property value changes or market conditions.`;
  }

  private generateRiskManagement(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string {
    return `Risk management includes regular monitoring of LTV ratio, property value, and market conditions. Contingency plans address potential delays in PMI cancellation and market value changes.`;
  }

  private getMitigationStrategies(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    return [
      'Regular LTV ratio monitoring',
      'Property value tracking',
      'Payment history maintenance',
      'Market condition assessment',
      'Refinancing evaluation'
    ];
  }

  private getContingencyPlans(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    return [
      'PMI cancellation delay plan',
      'Property value decline response',
      'Market deterioration strategy',
      'Refinancing alternative plan',
      'Payment increase management'
    ];
  }

  private getPerformanceBenchmarks(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): any[] {
    return [
      { metric: 'PMI Rate', target: 0.005, benchmark: metrics.pmiRate, industry: 'Conventional Mortgage' },
      { metric: 'LTV Ratio', target: 0.80, benchmark: metrics.currentLtvRatio, industry: 'Conventional Mortgage' },
      { metric: 'Break-Even Timeline', target: 24, benchmark: metrics.breakEvenMonths, industry: 'PMI Cancellation' }
    ];
  }

  private getDecisionRecommendation(pmiRating: string, costRating: string, metrics: PrivateMortgageInsuranceMetrics): string {
    if (pmiRating === 'Eligible for Cancellation') {
      return 'Strong recommendation to cancel PMI immediately';
    } else if (pmiRating === 'Not Required') {
      return 'No PMI required - maintain current loan structure';
    } else if (costRating === 'High Cost' && metrics.breakEvenMonths < 24) {
      return 'Consider refinancing to eliminate high PMI costs';
    } else {
      return 'Monitor for cancellation eligibility and consider optimization';
    }
  }

  private getPresentationPoints(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    return [
      `PMI ${metrics.pmiRequired ? 'required' : 'not required'} with ${metrics.pmiRequired ? `monthly cost of ${(metrics.pmiMonthlyPayment).toLocaleString()}` : 'no monthly cost'}`,
      `Current LTV ratio of ${(metrics.currentLtvRatio * 100).toFixed(1)}% ${metrics.cancellationEligibility ? 'meets' : 'exceeds'} cancellation threshold`,
      `Break-even point at ${metrics.breakEvenMonths} months with potential savings of ${(metrics.pmiSavings).toLocaleString()}`,
      `Total PMI cost of ${(metrics.totalPMICost).toLocaleString()} over loan term`
    ];
  }

  private getDecisionFactors(inputs: PrivateMortgageInsuranceInputs, metrics: PrivateMortgageInsuranceMetrics): string[] {
    return [
      'PMI Cancellation Eligibility',
      'Current LTV Ratio',
      'Break-Even Timeline',
      'Total PMI Cost',
      'Property Appreciation Rate',
      'Market Conditions'
    ];
  }
}