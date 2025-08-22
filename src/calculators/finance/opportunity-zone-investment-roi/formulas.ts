import { OpportunityZoneInvestmentROIInputs } from './validation';

export interface OpportunityZoneROIResult {
  totalROI: number;
  annualizedROI: number;
  totalReturn: number;
  taxBenefits: {
    deferredTaxSavings: number;
    eliminatedTaxSavings: number;
    basisStepUpSavings: number;
    totalTaxSavings: number;
    effectiveTaxRate: number;
  };
  deferredTaxSavings: number;
  eliminatedTaxSavings: number;
  basisStepUpSavings: number;
  investmentGrowth: {
    finalValue: number;
    totalGrowth: number;
    annualGrowth: number;
    inflationAdjustedValue: number;
    realReturn: number;
  };
  cashFlowAnalysis: {
    annualCashFlow: number;
    totalCashFlow: number;
    cashOnCashReturn: number;
    netOperatingIncome: number;
    cashFlowTimeline: number[];
  };
  exitAnalysis: {
    exitValue: number;
    netProceeds: number;
    capitalGainsTax: number;
    afterTaxProceeds: number;
    exitROI: number;
  };
  comparisonAnalysis: {
    alternativeReturn: number;
    opportunityZoneAdvantage: number;
    breakevenYears: number;
    advantagePercentage: number;
  };
  riskAssessment: {
    marketRisks: string[];
    taxRisks: string[];
    complianceRisks: string[];
    overallRiskLevel: string;
  };
  recommendations: string[];
  complianceChecklist: string[];
  timelineAnalysis: {
    deferralEndDate: string;
    basisStepUpDate: string;
    eliminationDate: string;
    keyMilestones: string[];
  };
}

export const calculateOpportunityZoneInvestmentROI = (inputs: OpportunityZoneInvestmentROIInputs): OpportunityZoneROIResult => {
  // Basic calculations
  const initialInvestment = inputs.initialInvestment || 0;
  const capitalGainsAmount = inputs.capitalGainsAmount || 0;
  const investmentPeriod = inputs.investmentPeriod || 10;
  const annualReturn = inputs.annualReturn || 0;
  const taxRate = inputs.taxRate || 0;
  const stateTaxRate = inputs.stateTaxRate || 0;
  const deferralPeriod = inputs.deferralPeriod || 7;
  const basisStepUp = inputs.basisStepUp || 15;
  const inflationRate = inputs.inflationRate || 2.5;
  const alternativeReturn = inputs.alternativeInvestmentReturn || 6.0;

  // Calculate investment growth
  const finalValue = initialInvestment * Math.pow(1 + annualReturn / 100, investmentPeriod);
  const totalGrowth = finalValue - initialInvestment;
  const annualGrowth = totalGrowth / investmentPeriod;
  
  // Inflation adjustments
  const inflationAdjustedValue = finalValue / Math.pow(1 + inflationRate / 100, investmentPeriod);
  const realReturn = ((inflationAdjustedValue / initialInvestment) - 1) * 100;

  // Tax benefit calculations
  const totalTaxRate = taxRate + (inputs.includeStateTaxes ? stateTaxRate : 0);
  const originalTaxLiability = capitalGainsAmount * (totalTaxRate / 100);
  
  // Deferred tax savings (time value of money)
  const deferredTaxLiability = originalTaxLiability * Math.pow(1 + alternativeReturn / 100, deferralPeriod);
  const deferredTaxSavings = deferredTaxLiability - originalTaxLiability;
  
  // Eliminated tax savings (if held 10+ years)
  const eliminationPercentage = investmentPeriod >= 10 ? 100 : 0;
  const eliminatedTaxSavings = originalTaxLiability * (eliminationPercentage / 100);
  
  // Basis step-up savings
  const basisStepUpAmount = capitalGainsAmount * (basisStepUp / 100);
  const basisStepUpSavings = basisStepUpAmount * (totalTaxRate / 100);
  
  const totalTaxSavings = deferredTaxSavings + eliminatedTaxSavings + basisStepUpSavings;
  const effectiveTaxRate = totalTaxRate * (1 - (totalTaxSavings / originalTaxLiability));

  // Cash flow analysis
  const annualIncome = inputs.annualIncome || 0;
  const operatingExpenses = inputs.operatingExpenses || 0;
  const depreciation = inputs.depreciation || 0;
  const managementFees = inputs.managementFees || 0;
  const legalFees = inputs.legalFees || 0;
  const accountingFees = inputs.accountingFees || 0;
  
  const netOperatingIncome = annualIncome - operatingExpenses;
  const taxableIncome = netOperatingIncome - depreciation - managementFees - legalFees - accountingFees;
  const annualTax = Math.max(0, taxableIncome * (totalTaxRate / 100));
  const annualCashFlow = netOperatingIncome - annualTax - managementFees - legalFees - accountingFees;
  const totalCashFlow = annualCashFlow * investmentPeriod;
  const cashOnCashReturn = (annualCashFlow / initialInvestment) * 100;

  // Generate cash flow timeline
  const cashFlowTimeline: number[] = [];
  for (let year = 1; year <= investmentPeriod; year++) {
    const yearCashFlow = annualCashFlow * Math.pow(1 + inflationRate / 100, year - 1);
    cashFlowTimeline.push(yearCashFlow);
  }

  // Exit analysis
  const exitValue = inputs.exitValue || finalValue;
  const exitCosts = inputs.exitCosts || 0;
  const netProceeds = exitValue - exitCosts;
  
  // Calculate capital gains tax at exit
  let capitalGainsTax = 0;
  if (inputs.exitStrategy === 'sale') {
    const capitalGain = netProceeds - initialInvestment;
    if (investmentPeriod >= 10) {
      // No tax on appreciation if held 10+ years
      capitalGainsTax = 0;
    } else if (investmentPeriod >= 5) {
      // 10% basis step-up
      const adjustedBasis = initialInvestment + (capitalGainsAmount * 0.1);
      const taxableGain = Math.max(0, netProceeds - adjustedBasis);
      capitalGainsTax = taxableGain * (totalTaxRate / 100);
    } else {
      // Deferred tax becomes due
      capitalGainsTax = originalTaxLiability;
    }
  }
  
  const afterTaxProceeds = netProceeds - capitalGainsTax;
  const exitROI = ((afterTaxProceeds - initialInvestment) / initialInvestment) * 100;

  // Comparison analysis
  const alternativeFinalValue = initialInvestment * Math.pow(1 + alternativeReturn / 100, investmentPeriod);
  const alternativeTaxLiability = (alternativeFinalValue - initialInvestment) * (totalTaxRate / 100);
  const alternativeAfterTaxValue = alternativeFinalValue - alternativeTaxLiability;
  const opportunityZoneAdvantage = afterTaxProceeds - alternativeAfterTaxValue;
  const advantagePercentage = (opportunityZoneAdvantage / alternativeAfterTaxValue) * 100;
  
  // Calculate breakeven years
  let breakevenYears = 0;
  for (let year = 1; year <= investmentPeriod; year++) {
    const ozValue = initialInvestment * Math.pow(1 + annualReturn / 100, year);
    const altValue = initialInvestment * Math.pow(1 + alternativeReturn / 100, year);
    if (ozValue > altValue) {
      breakevenYears = year;
      break;
    }
  }

  // Risk assessment
  const marketRisks: string[] = [];
  const taxRisks: string[] = [];
  const complianceRisks: string[] = [];

  if (annualReturn < 6) {
    marketRisks.push('Low expected return may not justify investment complexity');
  }

  if (investmentPeriod < 10) {
    taxRisks.push('Holding period less than 10 years reduces tax elimination benefits');
    complianceRisks.push('Must maintain compliance for full holding period');
  }

  if (totalTaxRate > 30) {
    taxRisks.push('High tax rate increases benefit of deferral and elimination');
  }

  if (capitalGainsAmount < initialInvestment * 0.5) {
    taxRisks.push('Low capital gains amount reduces tax benefit impact');
  }

  complianceRisks.push('Must invest within 180 days of capital gains realization');
  complianceRisks.push('Investment must be in qualified Opportunity Zone property');
  complianceRisks.push('Must maintain substantial improvement requirements');

  let overallRiskLevel = 'Low';
  if (marketRisks.length + taxRisks.length + complianceRisks.length > 5) {
    overallRiskLevel = 'High';
  } else if (marketRisks.length + taxRisks.length + complianceRisks.length > 2) {
    overallRiskLevel = 'Medium';
  }

  // Generate recommendations
  const recommendations: string[] = [];

  if (investmentPeriod >= 10) {
    recommendations.push('Excellent: 10+ year holding period maximizes tax elimination benefits');
  } else if (investmentPeriod >= 7) {
    recommendations.push('Good: 7+ year holding period provides basis step-up benefits');
  } else {
    recommendations.push('Consider extending holding period to maximize tax benefits');
  }

  if (totalTaxSavings > totalGrowth * 0.2) {
    recommendations.push('Strong tax benefits significantly enhance overall returns');
  }

  if (opportunityZoneAdvantage > 0) {
    recommendations.push(`Opportunity Zone investment provides ${advantagePercentage.toFixed(1)}% advantage over alternative`);
  }

  if (annualReturn > alternativeReturn + 2) {
    recommendations.push('High return potential justifies investment complexity');
  }

  if (capitalGainsAmount > initialInvestment * 0.7) {
    recommendations.push('High capital gains amount maximizes tax deferral benefits');
  }

  // Compliance checklist
  const complianceChecklist = [
    'Invest within 180 days of capital gains realization',
    'Investment must be in qualified Opportunity Zone',
    'Property must be used in a trade or business',
    'Substantial improvement requirement (100% of basis)',
    '90% of assets must be qualified Opportunity Zone property',
    'Annual compliance reporting required',
    'Maintain investment for required holding period',
    'Monitor regulatory changes and compliance requirements'
  ];

  // Timeline analysis
  const currentDate = new Date();
  const deferralEndDate = new Date(currentDate.getFullYear() + deferralPeriod, currentDate.getMonth(), currentDate.getDate()).toLocaleDateString();
  const basisStepUpDate = new Date(currentDate.getFullYear() + 5, currentDate.getMonth(), currentDate.getDate()).toLocaleDateString();
  const eliminationDate = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate()).toLocaleDateString();

  const keyMilestones = [
    `Year 5: 10% basis step-up available (${basisStepUpDate})`,
    `Year 7: Deferral period ends (${deferralEndDate})`,
    `Year 10: Capital gains elimination available (${eliminationDate})`
  ];

  // Calculate total ROI
  const totalReturn = afterTaxProceeds + totalCashFlow - initialInvestment;
  const totalROI = (totalReturn / initialInvestment) * 100;
  const annualizedROI = (Math.pow(1 + totalROI / 100, 1 / investmentPeriod) - 1) * 100;

  return {
    totalROI,
    annualizedROI,
    totalReturn,
    taxBenefits: {
      deferredTaxSavings,
      eliminatedTaxSavings,
      basisStepUpSavings,
      totalTaxSavings,
      effectiveTaxRate
    },
    deferredTaxSavings,
    eliminatedTaxSavings,
    basisStepUpSavings,
    investmentGrowth: {
      finalValue,
      totalGrowth,
      annualGrowth,
      inflationAdjustedValue,
      realReturn
    },
    cashFlowAnalysis: {
      annualCashFlow,
      totalCashFlow,
      cashOnCashReturn,
      netOperatingIncome,
      cashFlowTimeline
    },
    exitAnalysis: {
      exitValue,
      netProceeds,
      capitalGainsTax,
      afterTaxProceeds,
      exitROI
    },
    comparisonAnalysis: {
      alternativeReturn,
      opportunityZoneAdvantage,
      breakevenYears,
      advantagePercentage
    },
    riskAssessment: {
      marketRisks,
      taxRisks,
      complianceRisks,
      overallRiskLevel
    },
    recommendations,
    complianceChecklist,
    timelineAnalysis: {
      deferralEndDate,
      basisStepUpDate,
      eliminationDate,
      keyMilestones
    }
  };
};

export const generateOpportunityZoneInvestmentROIAnalysis = (inputs: OpportunityZoneInvestmentROIInputs, outputs: OpportunityZoneROIResult): string => {
  const analysis = `# Opportunity Zone Investment ROI Analysis

## Summary
**Total ROI:** ${outputs.totalROI.toFixed(2)}%
**Annualized ROI:** ${outputs.annualizedROI.toFixed(2)}%
**Total Return:** $${outputs.totalReturn.toLocaleString()}
**Tax Benefits:** $${outputs.taxBenefits.totalTaxSavings.toLocaleString()}

## Key Metrics
- **Initial Investment:** $${inputs.initialInvestment.toLocaleString()}
- **Capital Gains Amount:** $${inputs.capitalGainsAmount.toLocaleString()}
- **Investment Period:** ${inputs.investmentPeriod} years
- **Annual Return:** ${inputs.annualReturn}%
- **Tax Rate:** ${inputs.taxRate}%${inputs.stateTaxRate ? ` + ${inputs.stateTaxRate}% state` : ''}

## Tax Benefits Breakdown
- **Deferred Tax Savings:** $${outputs.deferredTaxSavings.toLocaleString()}
- **Eliminated Tax Savings:** $${outputs.eliminatedTaxSavings.toLocaleString()}
- **Basis Step-Up Savings:** $${outputs.basisStepUpSavings.toLocaleString()}
- **Total Tax Savings:** $${outputs.taxBenefits.totalTaxSavings.toLocaleString()}
- **Effective Tax Rate:** ${outputs.taxBenefits.effectiveTaxRate.toFixed(1)}%

## Investment Growth
- **Final Value:** $${outputs.investmentGrowth.finalValue.toLocaleString()}
- **Total Growth:** $${outputs.investmentGrowth.totalGrowth.toLocaleString()}
- **Annual Growth:** $${outputs.investmentGrowth.annualGrowth.toLocaleString()}
- **Inflation-Adjusted Value:** $${outputs.investmentGrowth.inflationAdjustedValue.toLocaleString()}
- **Real Return:** ${outputs.investmentGrowth.realReturn.toFixed(2)}%

## Cash Flow Analysis
- **Annual Cash Flow:** $${outputs.cashFlowAnalysis.annualCashFlow.toLocaleString()}
- **Total Cash Flow:** $${outputs.cashFlowAnalysis.totalCashFlow.toLocaleString()}
- **Cash-on-Cash Return:** ${outputs.cashFlowAnalysis.cashOnCashReturn.toFixed(2)}%
- **Net Operating Income:** $${outputs.cashFlowAnalysis.netOperatingIncome.toLocaleString()}

## Exit Analysis
- **Exit Value:** $${outputs.exitAnalysis.exitValue.toLocaleString()}
- **Net Proceeds:** $${outputs.exitAnalysis.netProceeds.toLocaleString()}
- **Capital Gains Tax:** $${outputs.exitAnalysis.capitalGainsTax.toLocaleString()}
- **After-Tax Proceeds:** $${outputs.exitAnalysis.afterTaxProceeds.toLocaleString()}
- **Exit ROI:** ${outputs.exitAnalysis.exitROI.toFixed(2)}%

## Comparison Analysis
- **Alternative Investment Return:** ${outputs.comparisonAnalysis.alternativeReturn}%
- **Opportunity Zone Advantage:** $${outputs.comparisonAnalysis.opportunityZoneAdvantage.toLocaleString()}
- **Advantage Percentage:** ${outputs.comparisonAnalysis.advantagePercentage.toFixed(1)}%
- **Breakeven Years:** ${outputs.comparisonAnalysis.breakevenYears}

## Risk Assessment
**Overall Risk Level:** ${outputs.riskAssessment.overallRiskLevel}

### Market Risks
${outputs.riskAssessment.marketRisks.length > 0 ? outputs.riskAssessment.marketRisks.map(risk => `- ${risk}`).join('\n') : '- No significant market risks identified'}

### Tax Risks
${outputs.riskAssessment.taxRisks.length > 0 ? outputs.riskAssessment.taxRisks.map(risk => `- ${risk}`).join('\n') : '- No significant tax risks identified'}

### Compliance Risks
${outputs.riskAssessment.complianceRisks.map(risk => `- ${risk}`).join('\n')}

## Recommendations
${outputs.recommendations.map(rec => `- ${rec}`).join('\n')}

## Compliance Checklist
${outputs.complianceChecklist.map(item => `- ${item}`).join('\n')}

## Timeline Analysis
- **Deferral End Date:** ${outputs.timelineAnalysis.deferralEndDate}
- **Basis Step-Up Date:** ${outputs.timelineAnalysis.basisStepUpDate}
- **Elimination Date:** ${outputs.timelineAnalysis.eliminationDate}

### Key Milestones
${outputs.timelineAnalysis.keyMilestones.map(milestone => `- ${milestone}`).join('\n')}

## Investment Details
- **Deferral Period:** ${inputs.deferralPeriod} years
- **Basis Step-Up:** ${inputs.basisStepUp}%
- **Exit Strategy:** ${inputs.exitStrategy || 'Not specified'}
- **Inflation Rate:** ${inputs.inflationRate}%
- **Alternative Return:** ${inputs.alternativeReturn}%

## Cash Flow Timeline
${outputs.cashFlowAnalysis.cashFlowTimeline.map((flow, index) => `Year ${index + 1}: $${flow.toLocaleString()}`).join('\n')}

---
*This analysis provides a comprehensive view of Opportunity Zone investment potential and tax benefits. Always consult with tax and legal professionals before making investment decisions.*`;

  return analysis;
};