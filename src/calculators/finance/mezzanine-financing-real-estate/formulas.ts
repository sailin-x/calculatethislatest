import { MezzanineFinancingRealEstateInputs, MezzanineFinancingMetrics } from './types';

export function calculateMezzanineFinancingMetrics(inputs: MezzanineFinancingRealEstateInputs): MezzanineFinancingMetrics {
  const {
    propertyValue,
    seniorDebtAmount,
    seniorDebtRate,
    mezzanineAmount,
    mezzanineRate,
    mezzanineTerm,
    equityKicker,
    netOperatingIncome,
    projectedValueIncrease,
    marketRiskAdjustment,
    exitStrategy
  } = inputs;

  // Basic Financial Metrics
  const totalDebt = seniorDebtAmount + mezzanineAmount;
  const totalLeverageRatio = (totalDebt / propertyValue) * 100;
  const mezzanineLTV = (mezzanineAmount / propertyValue) * 100;
  const loanToValueRatio = totalLeverageRatio;
  const equityBuffer = 100 - totalLeverageRatio;

  // Annual Payments
  const annualInterestPayment = mezzanineAmount * (mezzanineRate / 100);
  const seniorDebtService = seniorDebtAmount * (seniorDebtRate / 100); // Interest-only assumption
  const totalDebtService = seniorDebtService + annualInterestPayment;

  // Current Yield
  const mezzanineCurrentYield = mezzanineRate;

  // Coverage Ratios
  const debtServiceCoverage = totalDebtService > 0 ? netOperatingIncome / totalDebtService : 0;
  const interestCoverage = debtServiceCoverage; // Same for interest-only

  // Property Value Projection
  const projectedPropertyValue = propertyValue * Math.pow(1 + projectedValueIncrease / 100, mezzanineTerm);
  const propertyAppreciation = projectedPropertyValue - propertyValue;

  // Equity Kicker Calculation
  const equityKickerValue = (equityKicker / 100) * propertyAppreciation;

  // Total Return Calculation
  const totalInterestIncome = annualInterestPayment * mezzanineTerm;
  const totalReturn = totalInterestIncome + equityKickerValue;

  // IRR Calculation (simplified)
  const cashFlows = [];
  cashFlows.push(-mezzanineAmount); // Initial investment
  
  // Annual interest payments
  for (let year = 1; year <= mezzanineTerm; year++) {
    if (year < mezzanineTerm) {
      cashFlows.push(annualInterestPayment);
    } else {
      // Final year: interest + principal + equity kicker
      cashFlows.push(annualInterestPayment + mezzanineAmount + equityKickerValue);
    }
  }

  const mezzanineIRR = calculateIRR(cashFlows);

  // Cash-on-Cash Return
  const cashOnCashReturn = (annualInterestPayment / mezzanineAmount) * 100;

  // Risk-Adjusted Return
  const riskAdjustedReturn = mezzanineIRR - marketRiskAdjustment;

  // Break-even Occupancy (simplified)
  const breakEvenOccupancy = totalDebtService > 0 ? Math.min(100, (totalDebtService / netOperatingIncome) * 100) : 0;

  // Risk Assessment
  const riskLevel = assessRiskLevel(totalLeverageRatio, debtServiceCoverage, mezzanineIRR, marketRiskAdjustment);

  // Investment Score
  const recommendationScore = calculateInvestmentScore({
    irr: mezzanineIRR,
    dscr: debtServiceCoverage,
    ltv: totalLeverageRatio,
    currentYield: mezzanineCurrentYield,
    equityBuffer,
    riskAdjustedReturn
  });

  return {
    totalLeverageRatio,
    mezzanineLTV,
    mezzanineCurrentYield,
    mezzanineIRR,
    totalReturn,
    debtServiceCoverage,
    interestCoverage,
    loanToValueRatio,
    equityBuffer,
    breakEvenOccupancy,
    recommendationScore,
    riskLevel,
    annualInterestPayment,
    seniorDebtService,
    totalDebtService,
    equityKickerValue,
    projectedPropertyValue,
    cashOnCashReturn,
    riskAdjustedReturn
  };
}

function calculateIRR(cashFlows: number[]): number {
  // Simple IRR calculation using Newton-Raphson method
  let rate = 0.1; // Initial guess
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let j = 0; j < cashFlows.length; j++) {
      const period = j;
      npv += cashFlows[j] / Math.pow(1 + rate, period);
      if (period > 0) {
        dnpv -= (period * cashFlows[j]) / Math.pow(1 + rate, period + 1);
      }
    }

    if (Math.abs(npv) < tolerance) {
      return rate * 100;
    }

    if (dnpv === 0) {
      break;
    }

    rate = rate - npv / dnpv;

    if (rate < -0.99) {
      rate = -0.99;
    }
  }

  return rate * 100;
}

function assessRiskLevel(ltv: number, dscr: number, irr: number, marketRisk: number): string {
  let riskScore = 0;

  // LTV Risk
  if (ltv > 85) riskScore += 3;
  else if (ltv > 75) riskScore += 2;
  else if (ltv > 65) riskScore += 1;

  // DSCR Risk
  if (dscr < 1.1) riskScore += 3;
  else if (dscr < 1.25) riskScore += 2;
  else if (dscr < 1.5) riskScore += 1;

  // IRR Risk
  if (irr < 10) riskScore += 2;
  else if (irr < 12) riskScore += 1;

  // Market Risk
  if (marketRisk > 3) riskScore += 2;
  else if (marketRisk > 2) riskScore += 1;

  if (riskScore >= 6) return 'High Risk';
  if (riskScore >= 4) return 'Moderate-High Risk';
  if (riskScore >= 2) return 'Moderate Risk';
  return 'Low-Moderate Risk';
}

function calculateInvestmentScore(metrics: {
  irr: number;
  dscr: number;
  ltv: number;
  currentYield: number;
  equityBuffer: number;
  riskAdjustedReturn: number;
}): number {
  let score = 50; // Base score

  // IRR scoring
  if (metrics.irr >= 15) score += 20;
  else if (metrics.irr >= 12) score += 15;
  else if (metrics.irr >= 10) score += 10;
  else if (metrics.irr >= 8) score += 5;
  else score -= 10;

  // DSCR scoring
  if (metrics.dscr >= 1.5) score += 15;
  else if (metrics.dscr >= 1.25) score += 10;
  else if (metrics.dscr >= 1.1) score += 5;
  else score -= 15;

  // LTV scoring (lower is better for mezzanine)
  if (metrics.ltv <= 70) score += 10;
  else if (metrics.ltv <= 80) score += 5;
  else if (metrics.ltv <= 85) score += 0;
  else score -= 10;

  // Current yield scoring
  if (metrics.currentYield >= 12) score += 10;
  else if (metrics.currentYield >= 10) score += 5;
  else score -= 5;

  // Equity buffer scoring
  if (metrics.equityBuffer >= 30) score += 10;
  else if (metrics.equityBuffer >= 20) score += 5;
  else if (metrics.equityBuffer >= 15) score += 0;
  else score -= 10;

  // Risk-adjusted return
  if (metrics.riskAdjustedReturn >= 10) score += 5;
  else if (metrics.riskAdjustedReturn >= 8) score += 2;
  else if (metrics.riskAdjustedReturn < 5) score -= 5;

  return Math.max(0, Math.min(100, score));
}

export function generateMezzanineFinancingReport(
  inputs: MezzanineFinancingRealEstateInputs,
  metrics: MezzanineFinancingMetrics
): string {
  const {
    propertyValue,
    seniorDebtAmount,
    mezzanineAmount,
    mezzanineRate,
    mezzanineTerm,
    equityKicker,
    netOperatingIncome,
    exitStrategy
  } = inputs;

  const {
    totalLeverageRatio,
    mezzanineLTV,
    mezzanineIRR,
    debtServiceCoverage,
    equityBuffer,
    recommendationScore,
    riskLevel,
    totalReturn,
    equityKickerValue,
    projectedPropertyValue,
    riskAdjustedReturn
  } = metrics;

  return `# Mezzanine Financing for Real Estate Analysis Report

## Executive Summary

**Property Value:** $${propertyValue.toLocaleString()}
**Mezzanine Investment:** $${mezzanineAmount.toLocaleString()}
**Investment Score:** ${recommendationScore}/100 (${getScoreDescription(recommendationScore)})
**Risk Level:** ${riskLevel}

## Investment Structure

### Financing Stack
- **Senior Debt:** $${seniorDebtAmount.toLocaleString()} (${((seniorDebtAmount/propertyValue)*100).toFixed(1)}% LTV)
- **Mezzanine Financing:** $${mezzanineAmount.toLocaleString()} (${mezzanineLTV.toFixed(1)}% LTV)
- **Total Leverage:** ${totalLeverageRatio.toFixed(1)}%
- **Equity Buffer:** ${equityBuffer.toFixed(1)}%

### Terms
- **Mezzanine Rate:** ${mezzanineRate}% per annum
- **Term:** ${mezzanineTerm} years
- **Equity Kicker:** ${equityKicker}% of appreciation
- **Exit Strategy:** ${exitStrategy.charAt(0).toUpperCase() + exitStrategy.slice(1)}

## Financial Performance

### Returns Analysis
- **Current Yield:** ${mezzanineRate.toFixed(2)}%
- **Projected IRR:** ${mezzanineIRR.toFixed(2)}%
- **Risk-Adjusted Return:** ${riskAdjustedReturn.toFixed(2)}%
- **Total Return:** $${totalReturn.toLocaleString()}

### Return Components
- **Interest Income:** $${(mezzanineAmount * (mezzanineRate/100) * mezzanineTerm).toLocaleString()}
- **Equity Kicker Value:** $${equityKickerValue.toLocaleString()}
- **Projected Property Value:** $${projectedPropertyValue.toLocaleString()}

## Risk Assessment

### Coverage Metrics
- **Debt Service Coverage Ratio:** ${debtServiceCoverage.toFixed(2)}x
- **Net Operating Income:** $${netOperatingIncome.toLocaleString()}
- **Total Debt Service:** $${metrics.totalDebtService.toLocaleString()}

### Risk Factors
${getRiskAnalysis(metrics, inputs)}

## Investment Recommendation

${getInvestmentRecommendation(recommendationScore, metrics, inputs)}

### Key Strengths
${getKeyStrengths(metrics, inputs)}

### Areas of Concern
${getAreasOfConcern(metrics, inputs)}

## Sensitivity Analysis

### Scenarios
- **Base Case IRR:** ${mezzanineIRR.toFixed(2)}%
- **Conservative Case:** ${(mezzanineIRR - 2).toFixed(2)}% (2% lower appreciation)
- **Optimistic Case:** ${(mezzanineIRR + 2).toFixed(2)}% (2% higher appreciation)

### Break-even Analysis
- **Minimum NOI for 1.0x DSCR:** $${metrics.totalDebtService.toLocaleString()}
- **Current NOI Cushion:** ${((netOperatingIncome - metrics.totalDebtService)/metrics.totalDebtService * 100).toFixed(1)}%

---

*This analysis is based on the provided assumptions and current market conditions. Actual results may vary based on property performance, market changes, and execution of the business plan.*`;
}

function getScoreDescription(score: number): string {
  if (score >= 80) return 'Excellent Investment';
  if (score >= 70) return 'Strong Investment';
  if (score >= 60) return 'Good Investment';
  if (score >= 50) return 'Fair Investment';
  if (score >= 40) return 'Below Average';
  return 'Poor Investment';
}

function getRiskAnalysis(metrics: MezzanineFinancingMetrics, inputs: MezzanineFinancingRealEstateInputs): string {
  const risks = [];
  
  if (metrics.totalLeverageRatio > 85) {
    risks.push('• **High Leverage Risk**: Total LTV exceeds 85%, increasing default risk');
  }
  
  if (metrics.debtServiceCoverage < 1.25) {
    risks.push('• **Coverage Risk**: DSCR below 1.25x indicates tight cash flow coverage');
  }
  
  if (metrics.mezzanineIRR < 12) {
    risks.push('• **Return Risk**: IRR below 12% may not adequately compensate for mezzanine risk');
  }
  
  if (inputs.marketRiskAdjustment > 2) {
    risks.push('• **Market Risk**: High market risk adjustment indicates volatile conditions');
  }
  
  if (risks.length === 0) {
    return '• Risk profile appears manageable with adequate coverage and returns';
  }
  
  return risks.join('\n');
}

function getInvestmentRecommendation(score: number, metrics: MezzanineFinancingMetrics, inputs: MezzanineFinancingRealEstateInputs): string {
  if (score >= 70) {
    return `**RECOMMENDED**: This mezzanine financing opportunity presents attractive risk-adjusted returns with a ${metrics.mezzanineIRR.toFixed(1)}% IRR and strong coverage metrics. The ${metrics.equityBuffer.toFixed(1)}% equity buffer provides good downside protection.`;
  } else if (score >= 50) {
    return `**CONDITIONAL**: This opportunity merits consideration but requires careful due diligence. The ${metrics.mezzanineIRR.toFixed(1)}% IRR is reasonable, but monitor the ${metrics.debtServiceCoverage.toFixed(2)}x DSCR closely.`;
  } else {
    return `**NOT RECOMMENDED**: This opportunity presents elevated risks that may not be adequately compensated by the projected ${metrics.mezzanineIRR.toFixed(1)}% return. Consider restructuring terms or seeking better opportunities.`;
  }
}

function getKeyStrengths(metrics: MezzanineFinancingMetrics, inputs: MezzanineFinancingRealEstateInputs): string {
  const strengths = [];
  
  if (metrics.mezzanineIRR >= 15) {
    strengths.push('• Strong projected IRR of ' + metrics.mezzanineIRR.toFixed(1) + '%');
  }
  
  if (metrics.debtServiceCoverage >= 1.5) {
    strengths.push('• Robust debt service coverage of ' + metrics.debtServiceCoverage.toFixed(2) + 'x');
  }
  
  if (metrics.equityBuffer >= 25) {
    strengths.push('• Substantial equity buffer of ' + metrics.equityBuffer.toFixed(1) + '%');
  }
  
  if (inputs.equityKicker >= 10) {
    strengths.push('• Meaningful equity upside participation of ' + inputs.equityKicker + '%');
  }
  
  if (metrics.mezzanineCurrentYield >= 12) {
    strengths.push('• Attractive current yield of ' + metrics.mezzanineCurrentYield.toFixed(1) + '%');
  }
  
  return strengths.length > 0 ? strengths.join('\n') : '• Investment presents standard risk-return profile';
}

function getAreasOfConcern(metrics: MezzanineFinancingMetrics, inputs: MezzanineFinancingRealEstateInputs): string {
  const concerns = [];
  
  if (metrics.totalLeverageRatio > 80) {
    concerns.push('• High total leverage of ' + metrics.totalLeverageRatio.toFixed(1) + '%');
  }
  
  if (metrics.debtServiceCoverage < 1.25) {
    concerns.push('• Tight debt service coverage of ' + metrics.debtServiceCoverage.toFixed(2) + 'x');
  }
  
  if (metrics.riskAdjustedReturn < 8) {
    concerns.push('• Risk-adjusted return of ' + metrics.riskAdjustedReturn.toFixed(1) + '% may be insufficient');
  }
  
  if (inputs.mezzanineTerm > 5) {
    concerns.push('• Extended ' + inputs.mezzanineTerm + '-year term increases execution risk');
  }
  
  return concerns.length > 0 ? concerns.join('\n') : '• No major areas of concern identified';
}
