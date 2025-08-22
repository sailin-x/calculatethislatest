import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculate401kRollover(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    current401kBalance,
    currentAge,
    retirementAge,
    currentTaxRate,
    retirementTaxRate,
    rolloverType,
    currentPlanFees,
    newPlanFees,
    currentInvestmentOptions,
    newInvestmentOptions,
    expectedReturn,
    yearsToRetirement,
    rolloverFees,
    earlyWithdrawalPenalty,
    employerMatch,
    employerMatchLimit,
    annualContribution,
    stateTaxRate,
    netUnrealizedAppreciation,
    hasAfterTaxContributions,
    afterTaxAmount,
    hasRoth401k,
    roth401kAmount,
    hasOutstandingLoan,
    loanBalance,
    loanRepaymentPeriod
  } = inputs;

  // Convert percentages to decimals
  const currentTaxRateDecimal = currentTaxRate / 100;
  const retirementTaxRateDecimal = retirementTaxRate / 100;
  const currentPlanFeesDecimal = currentPlanFees / 100;
  const newPlanFeesDecimal = newPlanFees / 100;
  const expectedReturnDecimal = expectedReturn / 100;
  const stateTaxRateDecimal = stateTaxRate / 100;
  const employerMatchDecimal = employerMatch / 100;
  const employerMatchLimitDecimal = employerMatchLimit / 100;

  // Calculate fee savings
  const feeDifference = currentPlanFeesDecimal - newPlanFeesDecimal;
  const annualFeeSavings = current401kBalance * feeDifference;
  const totalFeeSavings = calculateTotalFeeSavings(current401kBalance, annualContribution, feeDifference, expectedReturnDecimal, yearsToRetirement);

  // Calculate tax impact
  const taxImpact = calculateTaxImpact(rolloverType, current401kBalance, currentTaxRateDecimal, stateTaxRateDecimal, hasAfterTaxContributions, afterTaxAmount, hasRoth401k, roth401kAmount);
  const conversionTax = calculateConversionTax(rolloverType, current401kBalance, currentTaxRateDecimal, stateTaxRateDecimal, hasAfterTaxContributions, afterTaxAmount);

  // Calculate projected values
  const currentPlanValue = calculateProjectedValue(current401kBalance, annualContribution, currentPlanFeesDecimal, expectedReturnDecimal, yearsToRetirement);
  const rolloverPlanValue = calculateProjectedValue(current401kBalance - taxImpact - rolloverFees, annualContribution, newPlanFeesDecimal, expectedReturnDecimal, yearsToRetirement);
  const projectedValueDifference = rolloverPlanValue - currentPlanValue;

  // Calculate break-even analysis
  const breakEvenYears = calculateBreakEvenYears(rolloverFees, taxImpact, annualFeeSavings, expectedReturnDecimal);

  // Calculate scores
  const feeEfficiencyScore = calculateFeeEfficiencyScore(currentPlanFeesDecimal, newPlanFeesDecimal);
  const investmentOptionsScore = calculateInvestmentOptionsScore(currentInvestmentOptions, newInvestmentOptions);
  const taxEfficiencyScore = calculateTaxEfficiencyScore(rolloverType, currentTaxRateDecimal, retirementTaxRateDecimal, yearsToRetirement);
  const liquidityScore = calculateLiquidityScore(rolloverType, earlyWithdrawalPenalty, hasOutstandingLoan);

  // Calculate rollover recommendation
  const rolloverScore = calculateRolloverScore(feeEfficiencyScore, investmentOptionsScore, taxEfficiencyScore, liquidityScore, projectedValueDifference, breakEvenYears);
  const rolloverRecommendation = generateRolloverRecommendation(rolloverScore, projectedValueDifference, breakEvenYears);

  // Calculate additional values
  const employerMatchValue = calculateEmployerMatchValue(annualContribution, employerMatchDecimal, employerMatchLimitDecimal, expectedReturnDecimal, yearsToRetirement);
  const loanRepaymentImpact = calculateLoanRepaymentImpact(hasOutstandingLoan, loanBalance, loanRepaymentPeriod, expectedReturnDecimal);
  const afterTaxRolloverValue = calculateAfterTaxRolloverValue(hasAfterTaxContributions, afterTaxAmount, expectedReturnDecimal, yearsToRetirement);
  const rothRolloverValue = calculateRothRolloverValue(hasRoth401k, roth401kAmount, expectedReturnDecimal, yearsToRetirement);
  const nuaTaxSavings = calculateNUATaxSavings(netUnrealizedAppreciation, currentTaxRateDecimal, retirementTaxRateDecimal);
  const earlyWithdrawalPenaltyAmount = calculateEarlyWithdrawalPenalty(earlyWithdrawalPenalty, current401kBalance);
  const requiredMinimumDistributions = calculateRMImpact(rolloverType, current401kBalance, retirementAge, expectedReturnDecimal);
  const estatePlanningBenefits = calculateEstatePlanningBenefits(rolloverType, current401kBalance, expectedReturnDecimal, yearsToRetirement);

  // Calculate complexity and risk
  const administrativeComplexity = calculateAdministrativeComplexity(rolloverType, hasAfterTaxContributions, hasRoth401k, hasOutstandingLoan);
  const riskAssessment = calculateRiskAssessment(rolloverType, currentAge, yearsToRetirement, projectedValueDifference);
  const timelineRecommendation = calculateTimelineRecommendation(rolloverType, hasOutstandingLoan, breakEvenYears);

  // Calculate financial metrics
  const costBenefitRatio = calculateCostBenefitRatio(rolloverFees + taxImpact, totalFeeSavings + projectedValueDifference);
  const netPresentValue = calculateNetPresentValue(rolloverFees + taxImpact, totalFeeSavings, projectedValueDifference, expectedReturnDecimal, yearsToRetirement);
  const sensitivityAnalysis = performSensitivityAnalysis(inputs, projectedValueDifference);

  return {
    rolloverRecommendation,
    rolloverScore,
    feeSavings: annualFeeSavings,
    totalFeeSavings,
    taxImpact,
    conversionTax,
    projectedValueDifference,
    breakEvenYears,
    currentPlanValue,
    rolloverPlanValue,
    feeEfficiencyScore,
    investmentOptionsScore,
    taxEfficiencyScore,
    liquidityScore,
    employerMatchValue,
    loanRepaymentImpact,
    afterTaxRolloverValue,
    rothRolloverValue,
    nuaTaxSavings,
    earlyWithdrawalPenalty: earlyWithdrawalPenaltyAmount,
    requiredMinimumDistributions,
    estatePlanningBenefits,
    administrativeComplexity,
    riskAssessment,
    timelineRecommendation,
    costBenefitRatio,
    netPresentValue,
    sensitivityAnalysis
  };
}

function calculateTotalFeeSavings(balance: number, annualContribution: number, feeDifference: number, returnRate: number, years: number): number {
  let totalSavings = 0;
  let currentBalance = balance;
  
  for (let year = 1; year <= years; year++) {
    const feeSavings = currentBalance * feeDifference;
    totalSavings += feeSavings * Math.pow(1 + returnRate, years - year);
    currentBalance = (currentBalance + annualContribution) * (1 + returnRate);
  }
  
  return totalSavings;
}

function calculateTaxImpact(rolloverType: string, balance: number, currentTaxRate: number, stateTaxRate: number, hasAfterTax: boolean, afterTaxAmount: number, hasRoth: boolean, rothAmount: number): number {
  let taxableAmount = balance;
  
  // Subtract after-tax contributions (not taxable)
  if (hasAfterTax) {
    taxableAmount -= afterTaxAmount;
  }
  
  // Subtract Roth 401(k) amount (not taxable)
  if (hasRoth) {
    taxableAmount -= rothAmount;
  }
  
  // Apply tax rates based on rollover type
  switch (rolloverType) {
    case 'traditional-ira':
      return 0; // No immediate tax impact
    case 'roth-ira':
      return taxableAmount * (currentTaxRate + stateTaxRate);
    case 'new-401k':
      return 0; // No immediate tax impact
    case 'roth-401k':
      return taxableAmount * (currentTaxRate + stateTaxRate);
    default:
      return 0;
  }
}

function calculateConversionTax(rolloverType: string, balance: number, currentTaxRate: number, stateTaxRate: number, hasAfterTax: boolean, afterTaxAmount: number): number {
  if (rolloverType !== 'roth-ira' && rolloverType !== 'roth-401k') {
    return 0;
  }
  
  let taxableAmount = balance;
  if (hasAfterTax) {
    taxableAmount -= afterTaxAmount;
  }
  
  return taxableAmount * (currentTaxRate + stateTaxRate);
}

function calculateProjectedValue(initialBalance: number, annualContribution: number, fees: number, returnRate: number, years: number): number {
  let balance = initialBalance;
  
  for (let year = 1; year <= years; year++) {
    const netReturn = returnRate - fees;
    balance = (balance + annualContribution) * (1 + netReturn);
  }
  
  return balance;
}

function calculateBreakEvenYears(rolloverFees: number, taxImpact: number, annualFeeSavings: number, returnRate: number): number {
  const totalCost = rolloverFees + taxImpact;
  if (annualFeeSavings <= 0) return Infinity;
  
  let cumulativeSavings = 0;
  let years = 0;
  
  while (cumulativeSavings < totalCost && years < 50) {
    years++;
    cumulativeSavings += annualFeeSavings * Math.pow(1 + returnRate, years - 1);
  }
  
  return years;
}

function calculateFeeEfficiencyScore(currentFees: number, newFees: number): number {
  const feeReduction = currentFees - newFees;
  if (feeReduction <= 0) return 0;
  
  if (feeReduction >= 0.01) return 100; // 1% or more reduction
  if (feeReduction >= 0.005) return 80; // 0.5% reduction
  if (feeReduction >= 0.002) return 60; // 0.2% reduction
  if (feeReduction >= 0.001) return 40; // 0.1% reduction
  return 20;
}

function calculateInvestmentOptionsScore(currentOptions: string, newOptions: string): number {
  const optionScores = { 'excellent': 100, 'good': 75, 'fair': 50, 'poor': 25 };
  const currentScore = optionScores[currentOptions as keyof typeof optionScores] || 50;
  const newScore = optionScores[newOptions as keyof typeof optionScores] || 50;
  
  return Math.max(0, newScore - currentScore);
}

function calculateTaxEfficiencyScore(rolloverType: string, currentTaxRate: number, retirementTaxRate: number, yearsToRetirement: number): number {
  if (rolloverType === 'roth-ira' || rolloverType === 'roth-401k') {
    // Roth conversion: pay tax now vs later
    if (currentTaxRate < retirementTaxRate) return 100;
    if (currentTaxRate === retirementTaxRate) return 50;
    return 0;
  }
  
  // Traditional rollover: defer taxes
  if (currentTaxRate > retirementTaxRate) return 100;
  if (currentTaxRate === retirementTaxRate) return 50;
  return 0;
}

function calculateLiquidityScore(rolloverType: string, earlyWithdrawal: boolean, hasLoan: boolean): number {
  let score = 50; // Base score
  
  // Roth IRAs offer better liquidity
  if (rolloverType === 'roth-ira') score += 30;
  
  // Early withdrawal penalty reduces liquidity
  if (earlyWithdrawal) score -= 20;
  
  // Outstanding loans reduce liquidity
  if (hasLoan) score -= 15;
  
  return Math.max(0, Math.min(100, score));
}

function calculateRolloverScore(feeScore: number, investmentScore: number, taxScore: number, liquidityScore: number, valueDifference: number, breakEvenYears: number): number {
  let score = 50; // Base score
  
  // Weight the component scores
  score += (feeScore * 0.3);
  score += (investmentScore * 0.25);
  score += (taxScore * 0.25);
  score += (liquidityScore * 0.2);
  
  // Adjust based on value difference
  if (valueDifference > 0) score += 10;
  if (valueDifference < 0) score -= 10;
  
  // Adjust based on break-even time
  if (breakEvenYears <= 2) score += 10;
  if (breakEvenYears > 10) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function generateRolloverRecommendation(score: number, valueDifference: number, breakEvenYears: number): string {
  if (score >= 80) return 'Strongly Recommend Rollover';
  if (score >= 60) return 'Recommend Rollover';
  if (score >= 40) return 'Consider Rollover';
  if (score >= 20) return 'Consider Keeping Current Plan';
  return 'Recommend Keeping Current Plan';
}

function calculateEmployerMatchValue(annualContribution: number, matchRate: number, matchLimit: number, returnRate: number, years: number): number {
  const matchAmount = Math.min(annualContribution * matchRate, annualContribution * matchLimit);
  return calculateProjectedValue(matchAmount, 0, 0, returnRate, years);
}

function calculateLoanRepaymentImpact(hasLoan: boolean, loanBalance: number, repaymentPeriod: number, returnRate: number): number {
  if (!hasLoan) return 0;
  
  const monthlyPayment = loanBalance / repaymentPeriod;
  const totalPayments = monthlyPayment * repaymentPeriod;
  const opportunityCost = loanBalance * Math.pow(1 + returnRate, repaymentPeriod / 12) - totalPayments;
  
  return opportunityCost;
}

function calculateAfterTaxRolloverValue(hasAfterTax: boolean, afterTaxAmount: number, returnRate: number, years: number): number {
  if (!hasAfterTax) return 0;
  return afterTaxAmount * Math.pow(1 + returnRate, years);
}

function calculateRothRolloverValue(hasRoth: boolean, rothAmount: number, returnRate: number, years: number): number {
  if (!hasRoth) return 0;
  return rothAmount * Math.pow(1 + returnRate, years);
}

function calculateNUATaxSavings(nuaAmount: number, currentTaxRate: number, retirementTaxRate: number): number {
  if (nuaAmount <= 0) return 0;
  return nuaAmount * (currentTaxRate - retirementTaxRate);
}

function calculateEarlyWithdrawalPenalty(earlyWithdrawal: boolean, balance: number): number {
  if (!earlyWithdrawal) return 0;
  return balance * 0.1; // 10% penalty
}

function calculateRMImpact(rolloverType: string, balance: number, retirementAge: number, returnRate: number): number {
  if (rolloverType === 'roth-ira') return 0; // No RMDs for Roth IRAs
  
  const rmdAge = 73; // Current RMD age
  const yearsToRMD = Math.max(0, rmdAge - retirementAge);
  const projectedBalance = balance * Math.pow(1 + returnRate, yearsToRMD);
  
  // Simplified RMD calculation
  return projectedBalance * 0.04; // Approximate RMD rate
}

function calculateEstatePlanningBenefits(rolloverType: string, balance: number, returnRate: number, years: number): number {
  if (rolloverType === 'roth-ira') {
    // Roth IRAs have better estate planning benefits
    const projectedBalance = balance * Math.pow(1 + returnRate, years);
    return projectedBalance * 0.3; // 30% of balance as estate planning benefit
  }
  return 0;
}

function calculateAdministrativeComplexity(rolloverType: string, hasAfterTax: boolean, hasRoth: boolean, hasLoan: boolean): string {
  let complexity = 0;
  
  if (rolloverType === 'roth-ira') complexity += 2;
  if (hasAfterTax) complexity += 2;
  if (hasRoth) complexity += 1;
  if (hasLoan) complexity += 3;
  
  if (complexity >= 6) return 'High';
  if (complexity >= 3) return 'Medium';
  return 'Low';
}

function calculateRiskAssessment(rolloverType: string, currentAge: number, yearsToRetirement: number, valueDifference: number): string {
  let risk = 0;
  
  if (rolloverType === 'roth-ira') risk += 1; // Tax rate risk
  if (yearsToRetirement > 20) risk += 1; // Long-term risk
  if (valueDifference < 0) risk += 2; // Value risk
  
  if (risk >= 3) return 'High';
  if (risk >= 1) return 'Medium';
  return 'Low';
}

function calculateTimelineRecommendation(rolloverType: string, hasLoan: boolean, breakEvenYears: number): string {
  if (hasLoan) return 'Complete loan repayment first';
  if (breakEvenYears <= 1) return 'Execute rollover immediately';
  if (breakEvenYears <= 3) return 'Execute rollover within 6 months';
  if (breakEvenYears <= 5) return 'Execute rollover within 1 year';
  return 'Consider timing based on market conditions';
}

function calculateCostBenefitRatio(costs: number, benefits: number): number {
  if (costs <= 0) return benefits > 0 ? 10 : 1;
  return benefits / costs;
}

function calculateNetPresentValue(costs: number, annualBenefits: number, terminalValue: number, discountRate: number, years: number): number {
  let npv = -costs; // Initial cost
  
  // Present value of annual benefits
  for (let year = 1; year <= years; year++) {
    npv += annualBenefits / Math.pow(1 + discountRate, year);
  }
  
  // Present value of terminal value
  npv += terminalValue / Math.pow(1 + discountRate, years);
  
  return npv;
}

function performSensitivityAnalysis(inputs: CalculatorInputs, baseValueDifference: number): string {
  const scenarios = [
    { name: 'Higher Returns', adjustment: 1.2 },
    { name: 'Lower Returns', adjustment: 0.8 },
    { name: 'Higher Fees', adjustment: 0.9 },
    { name: 'Lower Fees', adjustment: 1.1 }
  ];
  
  const results = scenarios.map(scenario => {
    const adjustedValue = baseValueDifference * scenario.adjustment;
    const recommendation = adjustedValue > 0 ? 'Rollover' : 'Keep Current';
    return `${scenario.name}: ${recommendation}`;
  });
  
  return results.join('; ');
}

export function generate401kRolloverAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    current401kBalance,
    rolloverType,
    currentPlanFees,
    newPlanFees,
    currentInvestmentOptions,
    newInvestmentOptions
  } = inputs;

  const {
    rolloverRecommendation,
    rolloverScore,
    feeSavings,
    totalFeeSavings,
    taxImpact,
    projectedValueDifference,
    breakEvenYears,
    currentPlanValue,
    rolloverPlanValue,
    feeEfficiencyScore,
    investmentOptionsScore,
    taxEfficiencyScore,
    liquidityScore,
    administrativeComplexity,
    riskAssessment,
    timelineRecommendation,
    costBenefitRatio,
    netPresentValue
  } = outputs;

  return `# 401(k) Rollover Analysis Report

## Executive Summary
**Recommendation:** ${rolloverRecommendation}

Your rollover analysis shows a **${rolloverScore.toFixed(0)}/100** overall score. ${projectedValueDifference > 0 ? `Rolling over would increase your projected value by **$${projectedValueDifference.toLocaleString()}**` : `Keeping your current plan would preserve **$${Math.abs(projectedValueDifference).toLocaleString()}** more in value`}.

## Key Metrics

### Financial Impact
- **Current Plan Value:** $${currentPlanValue.toLocaleString()}
- **Rollover Plan Value:** $${rolloverPlanValue.toLocaleString()}
- **Value Difference:** $${projectedValueDifference.toLocaleString()}
- **Break-Even Period:** ${breakEvenYears.toFixed(1)} years
- **Cost-Benefit Ratio:** ${costBenefitRatio.toFixed(2)}:1

### Fee Analysis
- **Current Plan Fees:** ${currentPlanFees}%
- **New Plan Fees:** ${newPlanFees}%
- **Annual Fee Savings:** $${feeSavings.toLocaleString()}
- **Total Fee Savings:** $${totalFeeSavings.toLocaleString()}
- **Fee Efficiency Score:** ${feeEfficiencyScore.toFixed(0)}/100

### Tax Impact
- **Immediate Tax Cost:** $${taxImpact.toLocaleString()}
- **Tax Efficiency Score:** ${taxEfficiencyScore.toFixed(0)}/100

## Component Scores

### Investment Options Comparison
- **Current Options:** ${currentInvestmentOptions}
- **New Options:** ${newInvestmentOptions}
- **Improvement Score:** ${investmentOptionsScore.toFixed(0)}/100

### Liquidity Assessment
- **Liquidity Score:** ${liquidityScore.toFixed(0)}/100
- **Early Withdrawal Considerations:** ${inputs.earlyWithdrawalPenalty ? 'May need early access' : 'No early access needed'}

## Risk & Complexity Assessment

### Administrative Complexity
- **Level:** ${administrativeComplexity}
- **Risk Assessment:** ${riskAssessment}
- **Timeline Recommendation:** ${timelineRecommendation}

### Rollover Type Analysis
- **Selected Rollover:** ${rolloverType === 'traditional-ira' ? 'Traditional IRA' : rolloverType === 'roth-ira' ? 'Roth IRA Conversion' : rolloverType === 'new-401k' ? 'New Employer 401(k)' : 'Roth 401(k)'}

## Detailed Recommendations

### Immediate Actions
${rolloverScore >= 60 ? 
  `1. **Proceed with Rollover:** The analysis strongly supports rolling over your 401(k).
   2. **Timeline:** ${timelineRecommendation}
   3. **Tax Planning:** ${taxImpact > 0 ? `Prepare for $${taxImpact.toLocaleString()} in taxes` : 'No immediate tax impact'}` :
  `1. **Consider Keeping Current Plan:** The analysis suggests keeping your current 401(k).
   2. **Monitor Changes:** Re-evaluate if fees or investment options improve.
   3. **Alternative Options:** Consider partial rollover or waiting for better conditions`}

### Long-term Strategy
1. **Fee Optimization:** ${feeEfficiencyScore >= 80 ? 'Excellent fee reduction opportunity' : feeEfficiencyScore >= 60 ? 'Good fee improvement' : 'Limited fee benefits'}
2. **Investment Diversification:** ${investmentOptionsScore >= 80 ? 'Significant improvement in investment options' : investmentOptionsScore >= 60 ? 'Moderate improvement in options' : 'Limited improvement in options'}
3. **Tax Strategy:** ${taxEfficiencyScore >= 80 ? 'Excellent tax efficiency improvement' : taxEfficiencyScore >= 60 ? 'Good tax efficiency' : 'Limited tax benefits'}

## Risk Considerations

### Market Risk
- **Investment Risk:** Moderate (depends on investment allocation)
- **Timing Risk:** ${breakEvenYears <= 2 ? 'Low' : breakEvenYears <= 5 ? 'Moderate' : 'High'} (${breakEvenYears.toFixed(1)} year break-even)
- **Tax Rate Risk:** ${rolloverType.includes('roth') ? 'High (tax rates may change)' : 'Low (tax deferral maintained)'}

### Administrative Risk
- **Complexity:** ${administrativeComplexity}
- **Processing Time:** 2-4 weeks typical
- **Documentation:** Ensure proper rollover documentation

## Next Steps

### If Proceeding with Rollover
1. **Contact New Provider:** Initiate rollover process
2. **Tax Planning:** ${taxImpact > 0 ? `Set aside $${taxImpact.toLocaleString()} for taxes` : 'No immediate tax planning needed'}
3. **Timeline:** ${timelineRecommendation}
4. **Documentation:** Keep all rollover documentation

### If Keeping Current Plan
1. **Monitor Fees:** Track for fee reductions
2. **Investment Review:** Periodically review investment options
3. **Re-evaluation:** Re-analyze when circumstances change

## Sensitivity Analysis
**${outputs.sensitivityAnalysis}**

---
*This analysis is based on current assumptions and market conditions. Actual results may vary. Consider consulting with a financial professional for personalized advice.*`;
}
