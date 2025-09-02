import { OpportunityZoneInvestmentInputs, OpportunityZoneInvestmentOutputs, OpportunityZoneInvestmentAnalysis, OpportunityZoneInvestmentMetrics } from './types';

export function calculateOpportunityZoneInvestment(inputs: OpportunityZoneInvestmentInputs): OpportunityZoneInvestmentOutputs {
  // Calculate basic investment metrics
  const totalInvestment = inputs.investmentAmount;
  const exitValue = calculateExitValue(inputs);
  const totalCashFlow = calculateTotalCashFlow(inputs);
  
  // Calculate tax benefits
  const taxDeferralBenefit = calculateTaxDeferralBenefit(inputs);
  const taxExclusionBenefit = calculateTaxExclusionBenefit(inputs);
  const basisStepUpBenefit = calculateBasisStepUpBenefit(inputs);
  const totalTaxBenefit = taxDeferralBenefit + taxExclusionBenefit + basisStepUpBenefit;
  
  // Calculate returns
  const totalReturn = ((exitValue + totalCashFlow - totalInvestment) / totalInvestment) * 100;
  const afterTaxReturn = ((exitValue + totalCashFlow - totalInvestment + totalTaxBenefit) / totalInvestment) * 100;
  const internalRateOfReturn = calculateIRR(inputs);
  const cashOnCashReturn = (totalCashFlow / totalInvestment) * 100;
  const equityMultiple = (exitValue + totalCashFlow) / totalInvestment;
  
  // Calculate additional metrics
  const netPresentValue = calculateNPV(inputs);
  const paybackPeriod = calculatePaybackPeriod(inputs);
  const effectiveTaxRate = calculateEffectiveTaxRate(inputs, totalTaxBenefit);
  const riskScore = calculateRiskScore(inputs);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    totalReturn,
    afterTaxReturn,
    internalRateOfReturn,
    totalTaxBenefit,
    riskScore
  });
  
  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, {
    totalReturn,
    afterTaxReturn,
    internalRateOfReturn,
    cashOnCashReturn
  });
  
  // Generate metrics breakdown
  const metrics = generateMetrics(inputs, {
    totalReturn,
    afterTaxReturn,
    internalRateOfReturn,
    cashOnCashReturn,
    equityMultiple,
    netPresentValue,
    paybackPeriod,
    effectiveTaxRate,
    riskScore
  });

  return {
    totalReturn,
    afterTaxReturn,
    internalRateOfReturn,
    totalTaxBenefit,
    taxDeferralBenefit,
    taxExclusionBenefit,
    basisStepUpBenefit,
    cashOnCashReturn,
    equityMultiple,
    netPresentValue,
    paybackPeriod,
    effectiveTaxRate,
    riskScore,
    analysis,
    comparisonAnalysis,
    metrics
  };
}

function calculateExitValue(inputs: OpportunityZoneInvestmentInputs): number {
  const baseValue = inputs.propertyValue;
  const appreciationRate = inputs.expectedAppreciation / 100;
  const years = inputs.investmentPeriod;
  
  return baseValue * Math.pow(1 + appreciationRate, years);
}

function calculateTotalCashFlow(inputs: OpportunityZoneInvestmentInputs): number {
  return inputs.revenueProjections.reduce((total, projection) => {
    return total + projection.noi;
  }, 0);
}

function calculateTaxDeferralBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  if (!inputs.taxDeferral) return 0;
  
  const originalGain = inputs.originalGainAmount;
  const deferralPercentage = inputs.deferralPercentage / 100;
  const deferralPeriod = inputs.deferralPeriod;
  const taxRate = inputs.investorTaxRate / 100;
  const discountRate = inputs.discountRate / 100;
  
  const deferredTax = originalGain * deferralPercentage * taxRate;
  const presentValueDeferredTax = deferredTax / Math.pow(1 + discountRate, deferralPeriod);
  const immediateTax = originalGain * deferralPercentage * taxRate;
  
  return immediateTax - presentValueDeferredTax;
}

function calculateTaxExclusionBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  if (!inputs.taxExclusion) return 0;
  
  const originalGain = inputs.originalGainAmount;
  const exclusionPercentage = inputs.exclusionPercentage / 100;
  const taxRate = inputs.investorTaxRate / 100;
  
  return originalGain * exclusionPercentage * taxRate;
}

function calculateBasisStepUpBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  if (!inputs.basisStepUp) return 0;
  
  const exitValue = calculateExitValue(inputs);
  const originalBasis = inputs.investmentAmount;
  const stepUpPercentage = inputs.basisStepUpPercentage / 100;
  const taxRate = inputs.investorTaxRate / 100;
  
  const stepUpAmount = (exitValue - originalBasis) * stepUpPercentage;
  return stepUpAmount * taxRate;
}

function calculateIRR(inputs: OpportunityZoneInvestmentInputs): number {
  // Simplified IRR calculation using Newton-Raphson method
  const cashFlows = [-inputs.investmentAmount];
  
  // Add annual cash flows
  inputs.revenueProjections.forEach(projection => {
    cashFlows.push(projection.noi);
  });
  
  // Add exit value at the end
  const exitValue = calculateExitValue(inputs);
  cashFlows[cashFlows.length - 1] += exitValue;
  
  // Use a simplified approach for IRR
  let guess = 0.1; // 10% initial guess
  const maxIterations = 100;
  const tolerance = 0.0001;
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPVFromCashFlows(cashFlows, guess);
    const derivative = calculateNPVDerivative(cashFlows, guess);
    
    if (Math.abs(derivative) < tolerance) break;
    
    const newGuess = guess - npv / derivative;
    if (Math.abs(newGuess - guess) < tolerance) break;
    
    guess = newGuess;
  }
  
  return Math.max(0, guess * 100); // Convert to percentage and ensure non-negative
}

function calculateNPVFromCashFlows(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((npv, cashFlow, period) => {
    return npv + cashFlow / Math.pow(1 + rate, period);
  }, 0);
}

function calculateNPVDerivative(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((derivative, cashFlow, period) => {
    if (period === 0) return derivative;
    return derivative - (period * cashFlow) / Math.pow(1 + rate, period + 1);
  }, 0);
}

function calculateNPV(inputs: OpportunityZoneInvestmentInputs): number {
  const cashFlows = [-inputs.investmentAmount];
  
  inputs.revenueProjections.forEach(projection => {
    cashFlows.push(projection.noi);
  });
  
  const exitValue = calculateExitValue(inputs);
  cashFlows[cashFlows.length - 1] += exitValue;
  
  const discountRate = inputs.discountRate / 100;
  return calculateNPVFromCashFlows(cashFlows, discountRate);
}

function calculatePaybackPeriod(inputs: OpportunityZoneInvestmentInputs): number {
  const initialInvestment = inputs.investmentAmount;
  let cumulativeCashFlow = 0;
  
  for (let i = 0; i < inputs.revenueProjections.length; i++) {
    cumulativeCashFlow += inputs.revenueProjections[i].noi;
    if (cumulativeCashFlow >= initialInvestment) {
      return i + 1;
    }
  }
  
  return inputs.investmentPeriod; // If never paid back
}

function calculateEffectiveTaxRate(inputs: OpportunityZoneInvestmentInputs, totalTaxBenefit: number): number {
  const totalReturn = calculateExitValue(inputs) + calculateTotalCashFlow(inputs) - inputs.investmentAmount;
  const afterTaxReturn = totalReturn + totalTaxBenefit;
  
  if (totalReturn <= 0) return 0;
  
  return ((totalReturn - afterTaxReturn) / totalReturn) * 100;
}

function calculateRiskScore(inputs: OpportunityZoneInvestmentInputs): number {
  let riskScore = 50; // Base score
  
  // Market risk
  switch (inputs.marketRisk) {
    case 'low': riskScore -= 10; break;
    case 'medium': break;
    case 'high': riskScore += 15; break;
  }
  
  // Regulatory risk
  switch (inputs.regulatoryRisk) {
    case 'low': riskScore -= 5; break;
    case 'medium': break;
    case 'high': riskScore += 10; break;
  }
  
  // Liquidity risk
  switch (inputs.liquidityRisk) {
    case 'low': riskScore -= 5; break;
    case 'medium': break;
    case 'high': riskScore += 15; break;
  }
  
  // Development risk
  switch (inputs.developmentRisk) {
    case 'low': riskScore -= 5; break;
    case 'medium': break;
    case 'high': riskScore += 10; break;
  }
  
  // Investment period risk
  if (inputs.investmentPeriod > 10) riskScore += 10;
  else if (inputs.investmentPeriod > 5) riskScore += 5;
  
  // Market condition risk
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 15; break;
    case 'stable': break;
    case 'growing': riskScore -= 5; break;
  }
  
  return Math.max(0, Math.min(100, riskScore));
}

function generateAnalysis(
  inputs: OpportunityZoneInvestmentInputs,
  metrics: {
    totalReturn: number;
    afterTaxReturn: number;
    internalRateOfReturn: number;
    totalTaxBenefit: number;
    riskScore: number;
  }
): OpportunityZoneInvestmentAnalysis {
  const { totalReturn, afterTaxReturn, internalRateOfReturn, totalTaxBenefit, riskScore } = metrics;
  
  // Determine investment rating
  let investmentRating = 'Poor';
  if (afterTaxReturn >= 20) investmentRating = 'Excellent';
  else if (afterTaxReturn >= 15) investmentRating = 'Very Good';
  else if (afterTaxReturn >= 10) investmentRating = 'Good';
  else if (afterTaxReturn >= 5) investmentRating = 'Fair';
  
  // Determine tax benefit rating
  let taxBenefitRating = 'Low Benefit';
  const taxBenefitPercentage = (totalTaxBenefit / inputs.investmentAmount) * 100;
  if (taxBenefitPercentage >= 15) taxBenefitRating = 'High Benefit';
  else if (taxBenefitPercentage >= 10) taxBenefitRating = 'Medium Benefit';
  else if (taxBenefitPercentage >= 5) taxBenefitRating = 'Moderate Benefit';
  
  // Determine recommendation
  let recommendation = 'Do Not Proceed';
  if (afterTaxReturn >= 12 && riskScore <= 60) recommendation = 'Proceed';
  else if (afterTaxReturn >= 8 && riskScore <= 50) recommendation = 'Consider';
  else if (afterTaxReturn >= 5) recommendation = 'Proceed with Caution';
  
  // Generate key strengths
  const keyStrengths: string[] = [];
  if (afterTaxReturn >= 15) keyStrengths.push('High after-tax returns');
  if (taxBenefitPercentage >= 10) keyStrengths.push('Significant tax benefits');
  if (internalRateOfReturn >= 15) keyStrengths.push('Strong IRR performance');
  if (riskScore <= 40) keyStrengths.push('Low risk profile');
  if (inputs.opportunityZoneTier === 'tier_1') keyStrengths.push('Tier 1 opportunity zone benefits');
  
  // Generate key weaknesses
  const keyWeaknesses: string[] = [];
  if (afterTaxReturn < 8) keyWeaknesses.push('Below-average returns');
  if (taxBenefitPercentage < 5) keyWeaknesses.push('Limited tax benefits');
  if (riskScore >= 70) keyWeaknesses.push('High risk profile');
  if (inputs.investmentPeriod > 10) keyWeaknesses.push('Long investment horizon');
  if (inputs.liquidityRisk === 'high') keyWeaknesses.push('Limited liquidity');
  
  // Generate risk assessments
  const marketRisk = generateRiskAssessment(inputs.marketRisk, 'market conditions');
  const regulatoryRisk = generateRiskAssessment(inputs.regulatoryRisk, 'regulatory changes');
  const liquidityRisk = generateRiskAssessment(inputs.liquidityRisk, 'liquidity constraints');
  const developmentRisk = generateRiskAssessment(inputs.developmentRisk, 'development challenges');
  
  return {
    investmentRating,
    taxBenefitRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    marketRisk,
    regulatoryRisk,
    liquidityRisk,
    developmentRisk
  };
}

function generateRiskAssessment(riskLevel: string, riskType: string): string {
  switch (riskLevel) {
    case 'low':
      return `Low ${riskType} risk with minimal impact on investment performance.`;
    case 'medium':
      return `Moderate ${riskType} risk that should be monitored but is manageable.`;
    case 'high':
      return `High ${riskType} risk that could significantly impact investment returns.`;
    default:
      return `Standard ${riskType} risk assessment.`;
  }
}

function generateComparisonAnalysis(
  inputs: OpportunityZoneInvestmentInputs,
  metrics: {
    totalReturn: number;
    afterTaxReturn: number;
    internalRateOfReturn: number;
    cashOnCashReturn: number;
  }
): Array<{ metric: string; opportunityZone: number; traditional: number; difference: number }> {
  const { totalReturn, afterTaxReturn, internalRateOfReturn, cashOnCashReturn } = metrics;
  
  // Get traditional investment benchmarks
  const traditionalROI = inputs.comparableInvestments.find(c => c.investment === 'Traditional Real Estate')?.roi || 8.5;
  const traditionalIRR = inputs.comparableInvestments.find(c => c.investment === 'Traditional Real Estate')?.irr || 10.2;
  const reitROI = inputs.comparableInvestments.find(c => c.investment === 'REIT')?.roi || 7.2;
  const privateEquityROI = inputs.comparableInvestments.find(c => c.investment === 'Private Equity')?.roi || 15.0;
  
  return [
    {
      metric: 'Total Return',
      opportunityZone: totalReturn,
      traditional: traditionalROI,
      difference: totalReturn - traditionalROI
    },
    {
      metric: 'After-Tax Return',
      opportunityZone: afterTaxReturn,
      traditional: traditionalROI * 0.85, // Assume 15% tax drag
      difference: afterTaxReturn - (traditionalROI * 0.85)
    },
    {
      metric: 'IRR',
      opportunityZone: internalRateOfReturn,
      traditional: traditionalIRR,
      difference: internalRateOfReturn - traditionalIRR
    },
    {
      metric: 'Cash-on-Cash Return',
      opportunityZone: cashOnCashReturn,
      traditional: traditionalROI * 0.8, // Assume 20% goes to expenses
      difference: cashOnCashReturn - (traditionalROI * 0.8)
    }
  ];
}

function generateMetrics(
  inputs: OpportunityZoneInvestmentInputs,
  metrics: {
    totalReturn: number;
    afterTaxReturn: number;
    internalRateOfReturn: number;
    cashOnCashReturn: number;
    equityMultiple: number;
    netPresentValue: number;
    paybackPeriod: number;
    effectiveTaxRate: number;
    riskScore: number;
  }
): OpportunityZoneInvestmentMetrics {
  const exitValue = calculateExitValue(inputs);
  const totalCashFlow = calculateTotalCashFlow(inputs);
  const totalTaxBenefit = calculateTaxDeferralBenefit(inputs) + calculateTaxExclusionBenefit(inputs) + calculateBasisStepUpBenefit(inputs);
  
  return {
    totalInvestment: inputs.investmentAmount,
    exitValue,
    totalCashFlow,
    totalTaxBenefit,
    netProfit: exitValue + totalCashFlow - inputs.investmentAmount,
    afterTaxProfit: exitValue + totalCashFlow - inputs.investmentAmount + totalTaxBenefit,
    totalReturn: metrics.totalReturn,
    afterTaxReturn: metrics.afterTaxReturn,
    internalRateOfReturn: metrics.internalRateOfReturn,
    cashOnCashReturn: metrics.cashOnCashReturn,
    equityMultiple: metrics.equityMultiple,
    netPresentValue: metrics.netPresentValue,
    paybackPeriod: metrics.paybackPeriod,
    effectiveTaxRate: metrics.effectiveTaxRate,
    riskScore: metrics.riskScore,
    annualizedReturn: Math.pow((exitValue + totalCashFlow) / inputs.investmentAmount, 1 / inputs.investmentPeriod) - 1,
    taxBenefitPercentage: (totalTaxBenefit / inputs.investmentAmount) * 100,
    returnOnEquity: ((exitValue + totalCashFlow - inputs.investmentAmount) / inputs.investmentAmount) * 100,
    afterTaxROE: ((exitValue + totalCashFlow - inputs.investmentAmount + totalTaxBenefit) / inputs.investmentAmount) * 100
  };
}