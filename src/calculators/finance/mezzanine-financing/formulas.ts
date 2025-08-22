import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculateMezzanineFinancing(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    projectValue,
    seniorLoanAmount,
    mezzanineLoanAmount,
    equityContribution,
    seniorLoanRate,
    mezzanineLoanRate,
    seniorLoanTerm,
    mezzanineLoanTerm,
    projectTimeline,
    expectedExitValue,
    exitTimeline,
    mezzanineFees,
    mezzanineEquityKicker,
    operatingExpenses,
    vacancyRate,
    propertyTaxRate,
    insuranceRate,
    managementFee,
    mezzanineLTV,
    seniorLTV,
    mezzanineDSCR,
    seniorDSCR,
    mezzaninePrepaymentPenalty,
    mezzanineOriginationFee,
    mezzanineExitFee
  } = inputs;

  // Convert percentages to decimals
  const seniorLoanRateDecimal = seniorLoanRate / 100;
  const mezzanineLoanRateDecimal = mezzanineLoanRate / 100;
  const vacancyRateDecimal = vacancyRate / 100;
  const propertyTaxRateDecimal = propertyTaxRate / 100;
  const insuranceRateDecimal = insuranceRate / 100;
  const managementFeeDecimal = managementFee / 100;
  const mezzanineLTVDecimal = mezzanineLTV / 100;
  const seniorLTVDecimal = seniorLTV / 100;
  const mezzanineEquityKickerDecimal = mezzanineEquityKicker / 100;
  const mezzaninePrepaymentPenaltyDecimal = mezzaninePrepaymentPenalty / 100;
  const mezzanineOriginationFeeDecimal = mezzanineOriginationFee / 100;
  const mezzanineExitFeeDecimal = mezzanineExitFee / 100;

  // Calculate total capitalization
  const totalCapitalization = seniorLoanAmount + mezzanineLoanAmount + equityContribution;

  // Calculate LTV ratios
  const seniorLTVRatio = (seniorLoanAmount / projectValue) * 100;
  const mezzanineLTVRatio = (mezzanineLoanAmount / projectValue) * 100;
  const totalLTVRatio = seniorLTVRatio + mezzanineLTVRatio;
  const equityPercentage = (equityContribution / totalCapitalization) * 100;

  // Calculate loan payments
  const seniorLoanPayment = calculateMonthlyPayment(seniorLoanAmount, seniorLoanRateDecimal, seniorLoanTerm * 12);
  const mezzanineLoanPayment = calculateMonthlyPayment(mezzanineLoanAmount, mezzanineLoanRateDecimal, mezzanineLoanTerm * 12);
  const totalDebtService = seniorLoanPayment + mezzanineLoanPayment;

  // Calculate net operating income
  const grossIncome = projectValue * 0.08; // Assume 8% gross income
  const vacancyLoss = grossIncome * vacancyRateDecimal;
  const effectiveGrossIncome = grossIncome - vacancyLoss;
  const propertyTaxes = projectValue * propertyTaxRateDecimal;
  const insurance = projectValue * insuranceRateDecimal;
  const managementFees = effectiveGrossIncome * managementFeeDecimal;
  const netOperatingIncome = effectiveGrossIncome - operatingExpenses - propertyTaxes - insurance - managementFees;

  // Calculate debt service coverage
  const debtServiceCoverage = netOperatingIncome / (totalDebtService * 12);

  // Calculate weighted average cost of capital
  const weightedAverageCost = calculateWACC(seniorLoanAmount, mezzanineLoanAmount, equityContribution, seniorLoanRateDecimal, mezzanineLoanRateDecimal);

  // Calculate cash-on-cash return
  const annualDebtService = totalDebtService * 12;
  const cashFlowAfterDebt = netOperatingIncome - annualDebtService;
  const cashOnCashReturn = (cashFlowAfterDebt / equityContribution) * 100;

  // Calculate IRR and equity multiple
  const { internalRateOfReturn, equityMultiple } = calculateIRRandMultiple(equityContribution, cashFlowAfterDebt, expectedExitValue, exitTimeline);

  // Calculate mezzanine cost of capital
  const mezzanineCost = calculateMezzanineCost(mezzanineLoanAmount, mezzanineLoanRateDecimal, mezzanineFees, mezzanineOriginationFeeDecimal, mezzanineExitFeeDecimal, mezzanineLoanTerm);
  const seniorCost = calculateSeniorCost(seniorLoanAmount, seniorLoanRateDecimal, seniorLoanTerm);

  // Calculate mezzanine equity value and total return
  const mezzanineEquityValue = expectedExitValue * mezzanineEquityKickerDecimal;
  const totalMezzanineReturn = calculateMezzanineTotalReturn(mezzanineLoanAmount, mezzanineLoanRateDecimal, mezzanineEquityValue, mezzanineLoanTerm);

  // Calculate break-even occupancy
  const breakEvenOccupancy = calculateBreakEvenOccupancy(totalDebtService, operatingExpenses, propertyTaxes, insurance, managementFeeDecimal, grossIncome);

  // Calculate risk scores
  const mezzanineRiskScore = calculateMezzanineRiskScore(totalLTVRatio, debtServiceCoverage, mezzanineLoanRateDecimal, mezzanineLoanTerm, projectTimeline);
  const capitalStructureScore = calculateCapitalStructureScore(seniorLTVRatio, mezzanineLTVRatio, equityPercentage, debtServiceCoverage);

  // Generate recommendations and analysis
  const mezzanineRecommendation = generateMezzanineRecommendation(mezzanineRiskScore, capitalStructureScore, debtServiceCoverage, totalLTVRatio);
  const sensitivityAnalysis = performSensitivityAnalysis(inputs, debtServiceCoverage, internalRateOfReturn);
  const refinanceAnalysis = performRefinanceAnalysis(inputs, mezzanineLoanTerm, mezzaninePrepaymentPenaltyDecimal);
  const exitStrategyAnalysis = performExitStrategyAnalysis(inputs, expectedExitValue, exitTimeline, mezzanineEquityKickerDecimal);
  const riskMitigation = generateRiskMitigation(inputs, mezzanineRiskScore);
  const mezzanineTerms = generateMezzanineTerms(inputs);
  const comparativeAnalysis = performComparativeAnalysis(inputs, mezzanineCost, seniorCost);

  return {
    totalCapitalization,
    seniorLTVRatio,
    mezzanineLTVRatio,
    totalLTVRatio,
    equityPercentage,
    weightedAverageCost,
    seniorLoanPayment,
    mezzanineLoanPayment,
    totalDebtService,
    netOperatingIncome,
    debtServiceCoverage,
    cashOnCashReturn,
    internalRateOfReturn,
    equityMultiple,
    mezzanineCost,
    seniorCost,
    mezzanineEquityValue,
    totalMezzanineReturn,
    breakEvenOccupancy,
    cashFlowAfterDebt,
    mezzanineRiskScore,
    capitalStructureScore,
    mezzanineRecommendation,
    sensitivityAnalysis,
    refinanceAnalysis,
    exitStrategyAnalysis,
    riskMitigation,
    mezzanineTerms,
    comparativeAnalysis
  };
}

function calculateMonthlyPayment(principal: number, rate: number, term: number): number {
  if (rate === 0) return principal / term;
  const monthlyRate = rate / 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
}

function calculateWACC(seniorLoan: number, mezzanineLoan: number, equity: number, seniorRate: number, mezzanineRate: number): number {
  const totalCapital = seniorLoan + mezzanineLoan + equity;
  const seniorWeight = seniorLoan / totalCapital;
  const mezzanineWeight = mezzanineLoan / totalCapital;
  const equityWeight = equity / totalCapital;
  
  // Assume 15% cost of equity
  const equityCost = 0.15;
  
  return (seniorWeight * seniorRate) + (mezzanineWeight * mezzanineRate) + (equityWeight * equityCost);
}

function calculateIRRandMultiple(equity: number, annualCashFlow: number, exitValue: number, exitYears: number): { internalRateOfReturn: number; equityMultiple: number } {
  // Simplified IRR calculation
  const totalCashFlow = annualCashFlow * exitYears;
  const totalReturn = exitValue - equity + totalCashFlow;
  const internalRateOfReturn = Math.pow(totalReturn / equity, 1 / exitYears) - 1;
  const equityMultiple = totalReturn / equity;
  
  return {
    internalRateOfReturn: internalRateOfReturn * 100,
    equityMultiple
  };
}

function calculateMezzanineCost(loanAmount: number, rate: number, fees: number, originationFee: number, exitFee: number, term: number): number {
  const originationCost = loanAmount * originationFee;
  const exitCost = loanAmount * exitFee;
  const totalFees = fees + originationCost + exitCost;
  const annualInterest = loanAmount * rate;
  const totalInterest = annualInterest * term;
  const totalCost = totalInterest + totalFees;
  
  return (totalCost / loanAmount / term) * 100;
}

function calculateSeniorCost(loanAmount: number, rate: number, term: number): number {
  return rate * 100;
}

function calculateMezzanineTotalReturn(loanAmount: number, rate: number, equityValue: number, term: number): number {
  const totalInterest = loanAmount * rate * term;
  const totalReturn = totalInterest + equityValue;
  return (totalReturn / loanAmount / term) * 100;
}

function calculateBreakEvenOccupancy(monthlyDebtService: number, operatingExpenses: number, propertyTaxes: number, insurance: number, managementFee: number, grossIncome: number): number {
  const annualDebtService = monthlyDebtService * 12;
  const totalExpenses = operatingExpenses + propertyTaxes + insurance + annualDebtService;
  const requiredGrossIncome = totalExpenses / (1 - managementFee);
  return (requiredGrossIncome / grossIncome) * 100;
}

function calculateMezzanineRiskScore(totalLTV: number, dscr: number, mezzanineRate: number, term: number, timeline: number): number {
  let riskScore = 50; // Base score
  
  // LTV risk
  if (totalLTV > 85) riskScore += 30;
  else if (totalLTV > 75) riskScore += 20;
  else if (totalLTV > 65) riskScore += 10;
  
  // DSCR risk
  if (dscr < 1.1) riskScore += 25;
  else if (dscr < 1.2) riskScore += 15;
  else if (dscr < 1.3) riskScore += 5;
  
  // Rate risk
  if (mezzanineRate > 0.15) riskScore += 15;
  else if (mezzanineRate > 0.12) riskScore += 10;
  
  // Term risk
  if (term < 3) riskScore += 10;
  else if (term > 7) riskScore += 5;
  
  // Timeline risk
  if (timeline > 36) riskScore += 10;
  
  return Math.min(100, Math.max(0, riskScore));
}

function calculateCapitalStructureScore(seniorLTV: number, mezzanineLTV: number, equityPercentage: number, dscr: number): number {
  let score = 50; // Base score
  
  // Senior LTV optimization
  if (seniorLTV >= 60 && seniorLTV <= 70) score += 20;
  else if (seniorLTV >= 50 && seniorLTV <= 80) score += 10;
  
  // Mezzanine LTV optimization
  if (mezzanineLTV >= 10 && mezzanineLTV <= 20) score += 20;
  else if (mezzanineLTV >= 5 && mezzanineLTV <= 25) score += 10;
  
  // Equity percentage
  if (equityPercentage >= 15 && equityPercentage <= 25) score += 20;
  else if (equityPercentage >= 10 && equityPercentage <= 30) score += 10;
  
  // DSCR
  if (dscr >= 1.25) score += 10;
  else if (dscr >= 1.15) score += 5;
  
  return Math.min(100, Math.max(0, score));
}

function generateMezzanineRecommendation(riskScore: number, structureScore: number, dscr: number, totalLTV: number): string {
  if (riskScore >= 80) return 'High Risk - Consider Alternative Financing';
  if (riskScore >= 60) return 'Moderate Risk - Proceed with Caution';
  if (structureScore >= 80 && dscr >= 1.25) return 'Strong Recommendation - Proceed with Mezzanine Financing';
  if (structureScore >= 60 && dscr >= 1.15) return 'Good Recommendation - Proceed with Mezzanine Financing';
  if (totalLTV > 85) return 'High Leverage - Consider Reducing Debt';
  return 'Moderate Recommendation - Review Terms and Conditions';
}

function performSensitivityAnalysis(inputs: CalculatorInputs, baseDSCR: number, baseIRR: number): string {
  const scenarios = [
    { name: 'Interest Rate +1%', dscrAdjustment: 0.9, irrAdjustment: 0.85 },
    { name: 'Interest Rate -1%', dscrAdjustment: 1.1, irrAdjustment: 1.15 },
    { name: 'NOI +10%', dscrAdjustment: 1.1, irrAdjustment: 1.2 },
    { name: 'NOI -10%', dscrAdjustment: 0.9, irrAdjustment: 0.8 },
    { name: 'Exit Value +10%', dscrAdjustment: 1.0, irrAdjustment: 1.3 },
    { name: 'Exit Value -10%', dscrAdjustment: 1.0, irrAdjustment: 0.7 }
  ];
  
  const results = scenarios.map(scenario => {
    const adjustedDSCR = baseDSCR * scenario.dscrAdjustment;
    const adjustedIRR = baseIRR * scenario.irrAdjustment;
    const dscrStatus = adjustedDSCR >= 1.15 ? 'Good' : adjustedDSCR >= 1.0 ? 'Acceptable' : 'Poor';
    const irrStatus = adjustedIRR >= 15 ? 'Excellent' : adjustedIRR >= 10 ? 'Good' : 'Poor';
    return `${scenario.name}: DSCR ${dscrStatus}, IRR ${irrStatus}`;
  });
  
  return results.join('; ');
}

function performRefinanceAnalysis(inputs: CalculatorInputs, mezzanineTerm: number, prepaymentPenalty: number): string {
  const refinanceScenarios = [];
  
  if (mezzanineTerm <= 3) {
    refinanceScenarios.push('Short-term mezzanine - plan for refinance within 2-3 years');
  } else if (mezzanineTerm <= 5) {
    refinanceScenarios.push('Medium-term mezzanine - consider refinance at 3-4 years');
  } else {
    refinanceScenarios.push('Long-term mezzanine - refinance optional based on market conditions');
  }
  
  if (prepaymentPenalty > 0) {
    refinanceScenarios.push(`Prepayment penalty of ${prepaymentPenalty}% applies`);
  }
  
  refinanceScenarios.push('Monitor interest rate trends for optimal refinance timing');
  refinanceScenarios.push('Consider permanent financing to replace mezzanine debt');
  
  return refinanceScenarios.join('; ');
}

function performExitStrategyAnalysis(inputs: CalculatorInputs, exitValue: number, exitTimeline: number, equityKicker: number): string {
  const strategies = [];
  
  if (exitTimeline <= 24) {
    strategies.push('Short-term hold - focus on quick value-add and sale');
  } else if (exitTimeline <= 60) {
    strategies.push('Medium-term hold - balance value-add with market timing');
  } else {
    strategies.push('Long-term hold - focus on cash flow and appreciation');
  }
  
  if (equityKicker > 0.1) {
    strategies.push(`Mezzanine lender participates in ${(equityKicker * 100).toFixed(1)}% of upside`);
  }
  
  strategies.push('Consider 1031 exchange for tax-deferred exit');
  strategies.push('Monitor market conditions for optimal exit timing');
  
  return strategies.join('; ');
}

function generateRiskMitigation(inputs: CalculatorInputs, riskScore: number): string {
  const mitigations = [];
  
  if (riskScore >= 70) {
    mitigations.push('Consider reducing mezzanine loan amount');
    mitigations.push('Increase equity contribution');
    mitigations.push('Negotiate lower mezzanine interest rate');
  }
  
  if (inputs.mezzanineLoanRate > 15) {
    mitigations.push('Explore alternative mezzanine lenders');
    mitigations.push('Consider preferred equity instead of mezzanine debt');
  }
  
  if (inputs.totalLTVRatio > 85) {
    mitigations.push('Reduce total leverage to below 80%');
    mitigations.push('Increase equity contribution');
  }
  
  mitigations.push('Maintain strong property management');
  mitigations.push('Monitor market conditions closely');
  mitigations.push('Have contingency plans for refinance');
  
  return mitigations.join('; ');
}

function generateMezzanineTerms(inputs: CalculatorInputs): string {
  return `Mezzanine Loan: $${inputs.mezzanineLoanAmount.toLocaleString()} at ${inputs.mezzanineLoanRate}% for ${inputs.mezzanineLoanTerm} years. ` +
         `Fees: $${inputs.mezzanineFees.toLocaleString()}. ` +
         `Equity Kicker: ${inputs.mezzanineEquityKicker}%. ` +
         `LTV: ${inputs.mezzanineLTV}%. ` +
         `DSCR: ${inputs.mezzanineDSCR}. ` +
         `Prepayment Penalty: ${inputs.mezzaninePrepaymentPenalty}%. ` +
         `Origination Fee: ${inputs.mezzanineOriginationFee}%. ` +
         `Exit Fee: ${inputs.mezzanineExitFee}%.`;
}

function performComparativeAnalysis(inputs: CalculatorInputs, mezzanineCost: number, seniorCost: number): string {
  const comparisons = [];
  
  const costDifference = mezzanineCost - seniorCost;
  comparisons.push(`Mezzanine cost is ${costDifference.toFixed(1)}% higher than senior debt`);
  
  if (mezzanineCost > 15) {
    comparisons.push('Consider preferred equity as alternative to high-cost mezzanine');
  }
  
  if (inputs.mezzanineLoanAmount > inputs.seniorLoanAmount * 0.5) {
    comparisons.push('Mezzanine debt is high relative to senior debt - consider reducing');
  }
  
  comparisons.push('Mezzanine provides additional leverage without personal guarantees');
  comparisons.push('Mezzanine debt is typically non-recourse to borrower');
  comparisons.push('Consider bridge loan as alternative for short-term needs');
  
  return comparisons.join('; ');
}

export function generateMezzanineFinancingAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    projectValue,
    seniorLoanAmount,
    mezzanineLoanAmount,
    equityContribution,
    seniorLoanRate,
    mezzanineLoanRate
  } = inputs;

  const {
    totalCapitalization,
    totalLTVRatio,
    equityPercentage,
    weightedAverageCost,
    debtServiceCoverage,
    cashOnCashReturn,
    internalRateOfReturn,
    equityMultiple,
    mezzanineRiskScore,
    capitalStructureScore,
    mezzanineRecommendation,
    breakEvenOccupancy,
    mezzanineCost,
    totalMezzanineReturn
  } = outputs;

  return `# Mezzanine Financing Analysis Report

## Executive Summary
**Recommendation:** ${mezzanineRecommendation}

Your mezzanine financing analysis shows a **${mezzanineRiskScore.toFixed(0)}/100** risk score and **${capitalStructureScore.toFixed(0)}/100** capital structure score. The project has a **${totalLTVRatio.toFixed(1)}%** total leverage ratio with **${equityPercentage.toFixed(1)}%** equity contribution.

## Key Metrics

### Capital Structure
- **Total Capitalization:** $${totalCapitalization.toLocaleString()}
- **Senior Debt:** $${seniorLoanAmount.toLocaleString()} (${(seniorLoanAmount/projectValue*100).toFixed(1)}% of project value)
- **Mezzanine Debt:** $${mezzanineLoanAmount.toLocaleString()} (${(mezzanineLoanAmount/projectValue*100).toFixed(1)}% of project value)
- **Equity:** $${equityContribution.toLocaleString()} (${equityPercentage.toFixed(1)}% of capitalization)
- **Total LTV Ratio:** ${totalLTVRatio.toFixed(1)}%

### Cost Analysis
- **Senior Loan Rate:** ${seniorLoanRate}%
- **Mezzanine Loan Rate:** ${mezzanineLoanRate}%
- **Weighted Average Cost:** ${weightedAverageCost.toFixed(2)}%
- **Mezzanine Cost of Capital:** ${mezzanineCost.toFixed(2)}%
- **Total Mezzanine Return:** ${totalMezzanineReturn.toFixed(2)}%

### Performance Metrics
- **Debt Service Coverage Ratio:** ${debtServiceCoverage.toFixed(2)}
- **Cash-on-Cash Return:** ${cashOnCashReturn.toFixed(2)}%
- **Internal Rate of Return:** ${internalRateOfReturn.toFixed(2)}%
- **Equity Multiple:** ${equityMultiple.toFixed(2)}x
- **Break-Even Occupancy:** ${breakEvenOccupancy.toFixed(1)}%

## Risk Assessment

### Risk Score: ${mezzanineRiskScore.toFixed(0)}/100
${mezzanineRiskScore >= 80 ? '**High Risk** - Significant concerns with this financing structure' :
  mezzanineRiskScore >= 60 ? '**Moderate Risk** - Some concerns that should be addressed' :
  '**Acceptable Risk** - Financing structure appears reasonable'}

### Capital Structure Score: ${capitalStructureScore.toFixed(0)}/100
${capitalStructureScore >= 80 ? '**Excellent Structure** - Well-balanced capital stack' :
  capitalStructureScore >= 60 ? '**Good Structure** - Reasonable balance of debt and equity' :
  '**Needs Improvement** - Consider adjusting capital structure'}

## Detailed Analysis

### Debt Service Coverage
- **Current DSCR:** ${debtServiceCoverage.toFixed(2)}
- **Senior DSCR Requirement:** ${inputs.seniorDSCR}
- **Mezzanine DSCR Requirement:** ${inputs.mezzanineDSCR}
- **Status:** ${debtServiceCoverage >= 1.25 ? 'Strong' : debtServiceCoverage >= 1.15 ? 'Acceptable' : 'Weak'}

### Leverage Analysis
- **Senior LTV:** ${outputs.seniorLTVRatio.toFixed(1)}%
- **Mezzanine LTV:** ${outputs.mezzanineLTVRatio.toFixed(1)}%
- **Total LTV:** ${totalLTVRatio.toFixed(1)}%
- **Leverage Assessment:** ${totalLTVRatio > 85 ? 'High leverage - consider reducing' : totalLTVRatio > 75 ? 'Moderate leverage' : 'Conservative leverage'}

### Return Analysis
- **Projected IRR:** ${internalRateOfReturn.toFixed(2)}%
- **Equity Multiple:** ${equityMultiple.toFixed(2)}x
- **Cash-on-Cash Return:** ${cashOnCashReturn.toFixed(2)}%
- **Return Assessment:** ${internalRateOfReturn >= 15 ? 'Excellent returns' : internalRateOfReturn >= 10 ? 'Good returns' : 'Moderate returns'}

## Mezzanine Financing Terms

### Loan Structure
- **Mezzanine Loan Amount:** $${mezzanineLoanAmount.toLocaleString()}
- **Interest Rate:** ${mezzanineLoanRate}%
- **Term:** ${inputs.mezzanineLoanTerm} years
- **Monthly Payment:** $${outputs.mezzanineLoanPayment.toLocaleString()}

### Fees and Costs
- **Origination Fee:** ${inputs.mezzanineOriginationFee}%
- **Exit Fee:** ${inputs.mezzanineExitFee}%
- **Prepayment Penalty:** ${inputs.mezzaninePrepaymentPenalty}%
- **Upfront Fees:** $${inputs.mezzanineFees.toLocaleString()}

### Equity Participation
- **Equity Kicker:** ${inputs.mezzanineEquityKicker}%
- **Participation Value:** $${outputs.mezzanineEquityValue.toLocaleString()}
- **Total Return to Lender:** ${totalMezzanineReturn.toFixed(2)}%

## Recommendations

### Immediate Actions
${mezzanineRiskScore >= 70 ? 
  `1. **Reduce Mezzanine Amount:** Consider reducing mezzanine debt by 10-20%
   2. **Increase Equity:** Add additional equity to improve capital structure
   3. **Negotiate Terms:** Work with lender to improve terms and conditions` :
  `1. **Proceed with Financing:** The mezzanine structure appears reasonable
   2. **Monitor Performance:** Track key metrics throughout the project
   3. **Plan for Refinance:** Develop refinance strategy for mezzanine debt`}

### Long-term Strategy
1. **Performance Monitoring:** Track DSCR, occupancy, and cash flow monthly
2. **Refinance Planning:** Begin planning for mezzanine refinance 6-12 months before maturity
3. **Exit Strategy:** Align mezzanine maturity with planned exit timeline
4. **Risk Management:** Maintain strong property management and market monitoring

## Sensitivity Analysis
**${outputs.sensitivityAnalysis}**

## Refinance Analysis
**${outputs.refinanceAnalysis}**

## Exit Strategy Analysis
**${outputs.exitStrategyAnalysis}**

## Risk Mitigation Strategies
**${outputs.riskMitigation}**

## Comparative Analysis
**${outputs.comparativeAnalysis}**

---
*This analysis is based on current assumptions and market conditions. Actual results may vary. Consider consulting with a real estate finance professional for personalized advice.*`;
}
