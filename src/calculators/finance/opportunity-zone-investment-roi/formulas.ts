import { OpportunityZoneInputs, OpportunityZoneMetrics, OpportunityZoneAnalysis } from './types';

// Calculate deferred tax savings from Opportunity Zone investment
export function calculateDeferredTaxSavings(capitalGainAmount: number, capitalGainsTaxRate: number): number {
  return capitalGainAmount * (capitalGainsTaxRate / 100);
}

// Calculate step-up tax savings (10% at 5 years, 5% at 7 years)
export function calculateStepUpTaxSavings(
  initialInvestment: number,
  stepUpPercentage: number,
  capitalGainsTaxRate: number
): number {
  const stepUpValue = initialInvestment * (stepUpPercentage / 100);
  return stepUpValue * (capitalGainsTaxRate / 100);
}

// Calculate tax exclusion savings (0% tax after 10 years)
export function calculateExclusionTaxSavings(
  projectedValue: number,
  capitalGainsTaxRate: number
): number {
  return projectedValue * (capitalGainsTaxRate / 100);
}

// Calculate projected investment value with appreciation
export function calculateProjectedValue(
  initialInvestment: number,
  expectedAnnualAppreciation: number,
  holdingPeriodYears: number
): number {
  const growthRate = expectedAnnualAppreciation / 100;
  return initialInvestment * Math.pow(1 + growthRate, holdingPeriodYears);
}

// Calculate total cash flow over holding period
export function calculateTotalCashFlow(
  expectedAnnualIncome: number,
  holdingPeriodYears: number
): number {
  return expectedAnnualIncome * holdingPeriodYears;
}

// Calculate leveraged return considering financing
export function calculateLeveragedReturn(
  projectedValue: number,
  initialInvestment: number,
  leveragePercentage: number,
  totalCashFlow: number
): number {
  const equityInvested = initialInvestment * (1 - leveragePercentage / 100);
  const totalReturn = projectedValue - initialInvestment + totalCashFlow;
  return equityInvested > 0 ? (totalReturn / equityInvested) * 100 : 0;
}

// Calculate Internal Rate of Return (IRR)
export function calculateIRR(
  initialInvestment: number,
  cashFlows: number[],
  holdingPeriodYears: number
): number {
  // Simplified IRR calculation - in practice would use more sophisticated methods
  const totalCashFlow = cashFlows.reduce((sum, flow) => sum + flow, 0);
  const totalReturn = totalCashFlow - initialInvestment;

  if (holdingPeriodYears === 0) return 0;
  return Math.pow(1 + totalReturn / initialInvestment, 1 / holdingPeriodYears) - 1;
}

// Calculate Net Present Value (NPV)
export function calculateNPV(
  initialInvestment: number,
  cashFlows: number[],
  discountRate: number
): number {
  let npv = -initialInvestment;
  const rate = discountRate / 100;

  cashFlows.forEach((flow, year) => {
    npv += flow / Math.pow(1 + rate, year + 1);
  });

  return npv;
}

// Calculate effective tax rate after Opportunity Zone benefits
export function calculateEffectiveTaxRate(
  capitalGainAmount: number,
  totalTaxSavings: number
): number {
  if (capitalGainAmount === 0) return 0;
  return ((capitalGainAmount - totalTaxSavings) / capitalGainAmount) * 100;
}

// Calculate after-tax IRR
export function calculateAfterTaxIRR(
  irr: number,
  effectiveTaxRate: number
): number {
  return irr * (1 - effectiveTaxRate / 100);
}

// Generate Opportunity Zone analysis
export function generateOpportunityZoneAnalysis(
  inputs: OpportunityZoneInputs,
  metrics: OpportunityZoneMetrics
): OpportunityZoneAnalysis {
  const { holdingPeriodYears, capitalGainsTaxRate, riskAdjustedDiscountRate } = inputs;
  const { afterTaxIrr, effectiveTaxRate, totalTaxSavings } = metrics;

  // Determine investment rating
  let investmentRating: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (afterTaxIrr > 15 && effectiveTaxRate < 10) investmentRating = 'excellent';
  else if (afterTaxIrr > 10 && effectiveTaxRate < 15) investmentRating = 'good';
  else if (afterTaxIrr > 5) investmentRating = 'fair';

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' = 'high';
  if (riskAdjustedDiscountRate < 8) riskLevel = 'low';
  else if (riskAdjustedDiscountRate < 12) riskLevel = 'moderate';

  // Determine tax efficiency
  let taxEfficiency: 'high' | 'moderate' | 'low' = 'low';
  if (effectiveTaxRate < 5) taxEfficiency = 'high';
  else if (effectiveTaxRate < 10) taxEfficiency = 'moderate';

  // Calculate deferral effectiveness
  const deferralEffectiveness = (totalTaxSavings / (inputs.capitalGainAmount * capitalGainsTaxRate / 100)) * 100;

  // Calculate exclusion effectiveness (simplified)
  const exclusionEffectiveness = holdingPeriodYears >= 10 ? 100 : (holdingPeriodYears / 10) * 100;

  // Generate recommendations
  const recommendations = [];
  if (holdingPeriodYears < 5) {
    recommendations.push('Consider extending holding period to qualify for step-up benefits');
  }
  if (holdingPeriodYears >= 10) {
    recommendations.push('Eligible for complete tax exclusion - maximize this benefit');
  }
  if (riskLevel === 'high') {
    recommendations.push('High risk-adjusted discount rate suggests reviewing investment assumptions');
  }

  // Optimal holding period
  const optimalHoldingPeriod = 10; // Maximum tax benefits

  // Tax strategy optimization
  const taxStrategyOptimization = [
    'Maximize 10-year holding period for complete exclusion',
    'Time investments to meet 5-year and 7-year step-up deadlines',
    'Consider qualified Opportunity Zone properties'
  ];

  // Compliance requirements
  const complianceRequirements = [
    'Invest in Qualified Opportunity Zone within 180 days',
    'Hold investment for at least 5 years for step-up benefits',
    'Hold investment for 7 years for additional step-up',
    'Hold investment for 10 years for complete tax exclusion'
  ];

  // Deadline reminders
  const deadlineReminders = [];
  if (holdingPeriodYears < 5) {
    deadlineReminders.push('5-year step-up deadline approaching');
  }
  if (holdingPeriodYears >= 5 && holdingPeriodYears < 7) {
    deadlineReminders.push('7-year additional step-up deadline approaching');
  }
  if (holdingPeriodYears >= 7 && holdingPeriodYears < 10) {
    deadlineReminders.push('10-year complete exclusion deadline approaching');
  }

  // Market analysis (simplified)
  const zoneDesignation = 'Qualified Opportunity Zone';
  const marketTrends = [
    'Increasing property values in designated zones',
    'Growing investor interest in tax-advantaged investments',
    'Economic development in targeted areas'
  ];

  const economicIndicators = [
    { indicator: 'Zone Appreciation Rate', value: inputs.expectedAnnualAppreciation, trend: 'positive' as const },
    { indicator: 'Tax Savings Percentage', value: (totalTaxSavings / inputs.capitalGainAmount) * 100, trend: 'positive' as const },
    { indicator: 'Risk-Adjusted Return', value: afterTaxIrr, trend: afterTaxIrr > 10 ? 'positive' as const : 'neutral' as const }
  ];

  return {
    investmentRating,
    riskLevel,
    taxEfficiency,
    deferralEffectiveness,
    exclusionEffectiveness,
    recommendations,
    optimalHoldingPeriod,
    taxStrategyOptimization,
    complianceRequirements,
    deadlineReminders,
    zoneDesignation,
    marketTrends,
    economicIndicators
  };
}