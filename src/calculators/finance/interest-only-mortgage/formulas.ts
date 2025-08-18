import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Helper function to calculate monthly payment for amortizing loan
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) return principal / totalPayments;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

// Helper function to calculate total interest paid for amortizing loan
function calculateTotalInterest(principal: number, monthlyPayment: number, years: number): number {
  return (monthlyPayment * years * 12) - principal;
}

// Helper function to calculate affordability score
function calculateAffordabilityScore(
  monthlyPITI: number,
  monthlyIncome: number,
  monthlyDebts: number,
  emergencyFund: number,
  monthlyTotalHousing: number
): number {
  let score = 0;
  
  // Front-end DTI (25% weight)
  const frontEndDTI = (monthlyPITI / monthlyIncome) * 100;
  if (frontEndDTI <= 28) score += 25;
  else if (frontEndDTI <= 31) score += 20;
  else if (frontEndDTI <= 36) score += 15;
  else if (frontEndDTI <= 43) score += 10;
  else score += 5;
  
  // Back-end DTI (25% weight)
  const backEndDTI = ((monthlyPITI + monthlyDebts) / monthlyIncome) * 100;
  if (backEndDTI <= 36) score += 25;
  else if (backEndDTI <= 41) score += 20;
  else if (backEndDTI <= 45) score += 15;
  else if (backEndDTI <= 50) score += 10;
  else score += 5;
  
  // Emergency fund coverage (20% weight)
  const emergencyFundMonths = emergencyFund / monthlyTotalHousing;
  if (emergencyFundMonths >= 6) score += 20;
  else if (emergencyFundMonths >= 4) score += 15;
  else if (emergencyFundMonths >= 3) score += 10;
  else if (emergencyFundMonths >= 2) score += 5;
  else score += 0;
  
  // Income stability (15% weight)
  if (monthlyIncome >= 10000) score += 15;
  else if (monthlyIncome >= 7000) score += 12;
  else if (monthlyIncome >= 5000) score += 8;
  else if (monthlyIncome >= 3000) score += 4;
  else score += 0;
  
  // Housing cost ratio (15% weight)
  const housingRatio = (monthlyTotalHousing / monthlyIncome) * 100;
  if (housingRatio <= 30) score += 15;
  else if (housingRatio <= 35) score += 12;
  else if (housingRatio <= 40) score += 8;
  else if (housingRatio <= 45) score += 4;
  else score += 0;
  
  return Math.min(score, 100);
}

// Helper function to calculate risk score
function calculateRiskScore(
  loanAmount: number,
  propertyValue: number,
  interestOnlyPeriod: number,
  totalLoanTerm: number,
  monthlyIncome: number,
  monthlyPITI: number,
  monthlyDebts: number,
  emergencyFund: number,
  creditScore: number,
  exitStrategy: string,
  riskTolerance: string,
  refinanceRate: number,
  appreciationRate: number,
  inflationRate: number
): number {
  let riskScore = 0;
  
  // LTV risk (20% weight)
  const ltv = (loanAmount / propertyValue) * 100;
  if (ltv > 90) riskScore += 20;
  else if (ltv > 80) riskScore += 15;
  else if (ltv > 70) riskScore += 10;
  else if (ltv > 60) riskScore += 5;
  else riskScore += 0;
  
  // DTI risk (20% weight)
  const dti = ((monthlyPITI + monthlyDebts) / monthlyIncome) * 100;
  if (dti > 50) riskScore += 20;
  else if (dti > 45) riskScore += 15;
  else if (dti > 40) riskScore += 10;
  else if (dti > 35) riskScore += 5;
  else riskScore += 0;
  
  // Interest-only period risk (15% weight)
  if (interestOnlyPeriod > 10) riskScore += 15;
  else if (interestOnlyPeriod > 7) riskScore += 12;
  else if (interestOnlyPeriod > 5) riskScore += 8;
  else if (interestOnlyPeriod > 3) riskScore += 4;
  else riskScore += 0;
  
  // Credit score risk (10% weight)
  if (creditScore < 650) riskScore += 10;
  else if (creditScore < 700) riskScore += 8;
  else if (creditScore < 750) riskScore += 5;
  else if (creditScore < 800) riskScore += 2;
  else riskScore += 0;
  
  // Emergency fund risk (10% weight)
  const emergencyFundMonths = emergencyFund / monthlyPITI;
  if (emergencyFundMonths < 2) riskScore += 10;
  else if (emergencyFundMonths < 3) riskScore += 8;
  else if (emergencyFundMonths < 4) riskScore += 5;
  else if (emergencyFundMonths < 6) riskScore += 2;
  else riskScore += 0;
  
  // Exit strategy risk (10% weight)
  switch (exitStrategy) {
    case 'sell': riskScore += 8; break;
    case 'refinance': riskScore += 5; break;
    case 'pay-off': riskScore += 2; break;
    case 'extend': riskScore += 10; break;
    default: riskScore += 5;
  }
  
  // Risk tolerance mismatch (5% weight)
  const highRiskFactors = (ltv > 80) + (dti > 45) + (interestOnlyPeriod > 7) + (creditScore < 700);
  if (riskTolerance === 'conservative' && highRiskFactors >= 2) riskScore += 5;
  else if (riskTolerance === 'moderate' && highRiskFactors >= 3) riskScore += 5;
  
  // Market risk (5% weight)
  if (appreciationRate < inflationRate) riskScore += 5;
  else if (appreciationRate < inflationRate + 1) riskScore += 3;
  else if (appreciationRate < inflationRate + 2) riskScore += 1;
  else riskScore += 0;
  
  // Refinance risk (5% weight)
  if (refinanceRate > 8) riskScore += 5;
  else if (refinanceRate > 7) riskScore += 3;
  else if (refinanceRate > 6) riskScore += 1;
  else riskScore += 0;
  
  return Math.min(riskScore, 100);
}

// Helper function to calculate suitability score
function calculateSuitabilityScore(affordabilityScore: number, riskScore: number, investmentHorizon: number, exitStrategy: string): number {
  let suitabilityScore = 0;
  
  // Affordability component (40% weight)
  suitabilityScore += (affordabilityScore * 0.4);
  
  // Risk component (30% weight)
  suitabilityScore += ((100 - riskScore) * 0.3);
  
  // Investment horizon alignment (20% weight)
  if (investmentHorizon >= 10) suitabilityScore += 20;
  else if (investmentHorizon >= 7) suitabilityScore += 15;
  else if (investmentHorizon >= 5) suitabilityScore += 10;
  else if (investmentHorizon >= 3) suitabilityScore += 5;
  else suitabilityScore += 0;
  
  // Exit strategy alignment (10% weight)
  switch (exitStrategy) {
    case 'refinance': suitabilityScore += 10; break;
    case 'sell': suitabilityScore += 8; break;
    case 'pay-off': suitabilityScore += 6; break;
    case 'extend': suitabilityScore += 4; break;
    default: suitabilityScore += 5;
  }
  
  return Math.round(suitabilityScore);
}

// Helper function to generate recommendation
function generateRecommendation(suitabilityScore: number, riskScore: number, affordabilityScore: number): string {
  if (suitabilityScore >= 80 && riskScore <= 20) {
    return 'Excellent choice for interest-only mortgage. High suitability with low risk. Strongly recommended.';
  } else if (suitabilityScore >= 70 && riskScore <= 30) {
    return 'Good choice for interest-only mortgage. Good suitability with acceptable risk. Recommended.';
  } else if (suitabilityScore >= 60 && riskScore <= 40) {
    return 'Moderate choice for interest-only mortgage. Consider carefully and ensure solid exit strategy.';
  } else if (suitabilityScore >= 50 && riskScore <= 50) {
    return 'Marginal choice for interest-only mortgage. Proceed with caution and strong risk mitigation.';
  } else if (riskScore > 70) {
    return 'High risk for interest-only mortgage. Not recommended without significant changes.';
  } else if (affordabilityScore < 40) {
    return 'Poor affordability for interest-only mortgage. Consider traditional mortgage or lower loan amount.';
  } else {
    return 'Mixed assessment. Review all factors carefully and consider alternatives.';
  }
}

export function calculateInterestOnlyMortgage(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const loanAmount = inputs.loanAmount || 500000;
  const interestRate = inputs.interestRate || 5.5;
  const interestOnlyPeriod = inputs.interestOnlyPeriod || 10;
  const totalLoanTerm = inputs.totalLoanTerm || 30;
  const propertyValue = inputs.propertyValue || 600000;
  const downPayment = inputs.downPayment || 100000;
  const downPaymentPercentage = inputs.downPaymentPercentage || 20;
  const propertyTaxes = inputs.propertyTaxes || 6000;
  const propertyTaxRate = inputs.propertyTaxRate || 1.2;
  const homeownersInsurance = inputs.homeownersInsurance || 1200;
  const insuranceRate = inputs.insuranceRate || 0.2;
  const pmi = inputs.pmi || 0;
  const pmiRate = inputs.pmiRate || 0.5;
  const hoaFees = inputs.hoaFees || 0;
  const utilities = inputs.utilities || 200;
  const maintenance = inputs.maintenance || 100;
  const appreciationRate = inputs.appreciationRate || 3;
  const inflationRate = inputs.inflationRate || 2.5;
  const incomeTaxRate = inputs.incomeTaxRate || 24;
  const alternativeInvestmentReturn = inputs.alternativeInvestmentReturn || 7;
  const refinanceRate = inputs.refinanceRate || 6;
  const refinanceCosts = inputs.refinanceCosts || 5000;
  const sellingCosts = inputs.sellingCosts || 6;
  const exitStrategy = inputs.exitStrategy || 'refinance';
  const riskTolerance = inputs.riskTolerance || 'moderate';
  const investmentHorizon = inputs.investmentHorizon || 10;
  const monthlyIncome = inputs.monthlyIncome || 8000;
  const monthlyDebts = inputs.monthlyDebts || 500;
  const emergencyFund = inputs.emergencyFund || 25000;
  const creditScore = inputs.creditScore || 750;
  const loanType = inputs.loanType || 'fixed-rate';
  const armIndex = inputs.armIndex || 3.5;
  const armMargin = inputs.armMargin || 2.5;
  const armAdjustmentPeriod = inputs.armAdjustmentPeriod || 12;
  const armCaps = inputs.armCaps || '2-2-5';
  const prepaymentPenalty = inputs.prepaymentPenalty || 0;
  const prepaymentPenaltyPeriod = inputs.prepaymentPenaltyPeriod || 0;
  const lenderFees = inputs.lenderFees || 2000;
  const titleInsurance = inputs.titleInsurance || 1000;
  const appraisalFee = inputs.appraisalFee || 500;
  const escrowAccount = inputs.escrowAccount || 'yes';
  const escrowAmount = inputs.escrowAmount || 3000;

  // Calculate derived values
  const calculatedPropertyValue = propertyValue || (loanAmount + downPayment);
  const calculatedDownPayment = downPayment || (calculatedPropertyValue * downPaymentPercentage / 100);
  const calculatedPropertyTaxes = propertyTaxes || (calculatedPropertyValue * propertyTaxRate / 100);
  const calculatedHomeownersInsurance = homeownersInsurance || (calculatedPropertyValue * insuranceRate / 100);
  const calculatedPMI = pmi || (loanAmount * pmiRate / 100);

  // Calculate monthly payments
  const monthlyInterestPayment = (loanAmount * interestRate / 100) / 12;
  const monthlyPropertyTaxes = calculatedPropertyTaxes / 12;
  const monthlyHomeownersInsurance = calculatedHomeownersInsurance / 12;
  const monthlyPMI = calculatedPMI / 12;
  
  // Calculate PITI
  const monthlyPITI = monthlyInterestPayment + monthlyPropertyTaxes + monthlyHomeownersInsurance + monthlyPMI;
  
  // Calculate total monthly housing cost
  const monthlyTotalHousing = monthlyPITI + hoaFees + utilities + maintenance;
  
  // Calculate balloon payment (same as original loan amount)
  const balloonPayment = loanAmount;
  
  // Calculate amortizing loan comparison
  const amortizingMonthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, totalLoanTerm);
  const amortizingTotalInterest = calculateTotalInterest(loanAmount, amortizingMonthlyPayment, totalLoanTerm);
  
  // Calculate interest-only total interest
  const interestOnlyTotalInterest = (monthlyInterestPayment * interestOnlyPeriod * 12) + 
    calculateTotalInterest(loanAmount, calculateMonthlyPayment(loanAmount, interestRate, totalLoanTerm - interestOnlyPeriod), totalLoanTerm - interestOnlyPeriod);
  
  // Calculate total cost
  const totalCost = loanAmount + interestOnlyTotalInterest + lenderFees + titleInsurance + appraisalFee + escrowAmount;
  
  // Calculate savings and investment opportunity
  const savingsDuringInterestOnly = amortizingMonthlyPayment - monthlyInterestPayment;
  const totalSavings = savingsDuringInterestOnly * interestOnlyPeriod * 12;
  const investmentOpportunity = totalSavings * Math.pow(1 + alternativeInvestmentReturn / 100, interestOnlyPeriod);
  
  // Calculate ratios
  const debtToIncomeRatio = (monthlyPITI / monthlyIncome) * 100;
  const debtToIncomeRatioBack = ((monthlyPITI + monthlyDebts) / monthlyIncome) * 100;
  const loanToValueRatio = (loanAmount / calculatedPropertyValue) * 100;
  
  // Calculate equity build-up
  const equityBuildUp = calculatedPropertyValue * Math.pow(1 + appreciationRate / 100, interestOnlyPeriod) - calculatedPropertyValue;
  
  // Calculate tax savings
  const annualInterestPaid = monthlyInterestPayment * 12;
  const taxSavings = (annualInterestPaid * incomeTaxRate / 100);
  const afterTaxCost = monthlyPITI - (taxSavings / 12);
  
  // Calculate break-even point
  const breakEvenPoint = totalCost / (savingsDuringInterestOnly * 12);
  
  // Calculate scores
  const affordabilityScore = calculateAffordabilityScore(monthlyPITI, monthlyIncome, monthlyDebts, emergencyFund, monthlyTotalHousing);
  const riskScore = calculateRiskScore(loanAmount, calculatedPropertyValue, interestOnlyPeriod, totalLoanTerm, monthlyIncome, monthlyPITI, monthlyDebts, emergencyFund, creditScore, exitStrategy, riskTolerance, refinanceRate, appreciationRate, inflationRate);
  const suitabilityScore = calculateSuitabilityScore(affordabilityScore, riskScore, investmentHorizon, exitStrategy);
  
  // Generate recommendation
  const recommendation = generateRecommendation(suitabilityScore, riskScore, affordabilityScore);

  // Generate detailed breakdowns
  const keyMetrics = `Loan Amount: $${loanAmount.toLocaleString()}
Interest Rate: ${interestRate}%
Interest-Only Period: ${interestOnlyPeriod} years
Total Loan Term: ${totalLoanTerm} years
Property Value: $${calculatedPropertyValue.toLocaleString()}
Down Payment: $${calculatedDownPayment.toLocaleString()}
Monthly Interest Payment: $${Math.round(monthlyInterestPayment).toLocaleString()}
Balloon Payment: $${balloonPayment.toLocaleString()}
Loan-to-Value Ratio: ${loanToValueRatio.toFixed(1)}%
Debt-to-Income Ratio: ${debtToIncomeRatio.toFixed(1)}%
Back-End DTI: ${debtToIncomeRatioBack.toFixed(1)}%`;

  const paymentSchedule = `Interest-Only Period (Years 1-${interestOnlyPeriod}):
- Monthly Payment: $${Math.round(monthlyInterestPayment).toLocaleString()}
- Principal Paid: $0
- Interest Paid: $${Math.round(monthlyInterestPayment).toLocaleString()}
- Remaining Balance: $${loanAmount.toLocaleString()}

Amortization Period (Years ${interestOnlyPeriod + 1}-${totalLoanTerm}):
- Monthly Payment: $${Math.round(amortizingMonthlyPayment).toLocaleString()}
- Principal + Interest: $${Math.round(amortizingMonthlyPayment).toLocaleString()}
- Total Interest Paid: $${Math.round(interestOnlyTotalInterest).toLocaleString()}`;

  const comparisonAnalysis = `Interest-Only vs Traditional Mortgage:
- Interest-Only Monthly Payment: $${Math.round(monthlyInterestPayment).toLocaleString()}
- Traditional Monthly Payment: $${Math.round(amortizingMonthlyPayment).toLocaleString()}
- Monthly Savings: $${Math.round(savingsDuringInterestOnly).toLocaleString()}
- Total Savings Over ${interestOnlyPeriod} Years: $${Math.round(totalSavings).toLocaleString()}
- Investment Opportunity: $${Math.round(investmentOpportunity).toLocaleString()}
- Total Interest Paid (Interest-Only): $${Math.round(interestOnlyTotalInterest).toLocaleString()}
- Total Interest Paid (Traditional): $${Math.round(amortizingTotalInterest).toLocaleString()}
- Interest Difference: $${Math.round(interestOnlyTotalInterest - amortizingTotalInterest).toLocaleString()}`;

  const scenarioAnalysis = `Scenario Analysis:
- Best Case (High Appreciation): Equity build-up of $${Math.round(equityBuildUp * 1.5).toLocaleString()}
- Base Case: Equity build-up of $${Math.round(equityBuildUp).toLocaleString()}
- Worst Case (No Appreciation): Equity build-up of $0
- Refinance Scenario: New payment of $${Math.round(calculateMonthlyPayment(loanAmount, refinanceRate, totalLoanTerm - interestOnlyPeriod)).toLocaleString()}
- Tax Savings: $${Math.round(taxSavings).toLocaleString()}/year
- After-Tax Monthly Cost: $${Math.round(afterTaxCost).toLocaleString()}`;

  const exitStrategyAnalysis = `Exit Strategy Analysis:
Planned Exit: ${exitStrategy}
- Refinance: New rate ${refinanceRate}%, costs $${refinanceCosts.toLocaleString()}
- Sell: Selling costs ${sellingCosts}% of property value
- Pay-off: Requires $${balloonPayment.toLocaleString()} at end of interest-only period
- Extend: May require additional fees and higher rates
Risk Factors: ${riskScore > 50 ? 'High risk factors identified' : 'Low risk factors'}`;

  const refinanceAnalysis = `Refinance Analysis:
Current Rate: ${interestRate}%
Expected Refinance Rate: ${refinanceRate}%
Rate Difference: ${(refinanceRate - interestRate).toFixed(2)}%
Refinance Costs: $${refinanceCosts.toLocaleString()}
New Monthly Payment: $${Math.round(calculateMonthlyPayment(loanAmount, refinanceRate, totalLoanTerm - interestOnlyPeriod)).toLocaleString()}
Break-Even on Refinance: ${(refinanceCosts / (monthlyInterestPayment - calculateMonthlyPayment(loanAmount, refinanceRate, totalLoanTerm - interestOnlyPeriod)) / 12).toFixed(1)} years`;

  const riskAssessment = `Risk Assessment:
Risk Score: ${riskScore}/100
Primary Risk Factors:
${riskScore > 70 ? '- Very high risk: Consider alternatives' : ''}
${riskScore > 50 ? '- High risk: Implement risk mitigation strategies' : ''}
${riskScore > 30 ? '- Moderate risk: Monitor closely' : ''}
${riskScore <= 30 ? '- Low risk: Generally acceptable' : ''}
- LTV Ratio: ${loanToValueRatio.toFixed(1)}% ${loanToValueRatio > 80 ? '(High)' : loanToValueRatio > 70 ? '(Moderate)' : '(Low)'}
- DTI Ratio: ${debtToIncomeRatio.toFixed(1)}% ${debtToIncomeRatio > 43 ? '(High)' : debtToIncomeRatio > 31 ? '(Moderate)' : '(Low)'}
- Interest-Only Period: ${interestOnlyPeriod} years ${interestOnlyPeriod > 10 ? '(Long)' : interestOnlyPeriod > 7 ? '(Moderate)' : '(Short)'}
- Credit Score: ${creditScore} ${creditScore < 700 ? '(Below optimal)' : '(Good)'}
- Emergency Fund: ${Math.round(emergencyFund / monthlyPITI).toFixed(1)} months of payments ${(emergencyFund / monthlyPITI) < 3 ? '(Insufficient)' : '(Adequate)'}`;

  return {
    monthlyInterestPayment: Math.round(monthlyInterestPayment),
    monthlyPrincipalPayment: Math.round(amortizingMonthlyPayment - monthlyInterestPayment),
    monthlyTotalPayment: Math.round(amortizingMonthlyPayment),
    monthlyPITI: Math.round(monthlyPITI),
    monthlyTotalHousing: Math.round(monthlyTotalHousing),
    balloonPayment: Math.round(balloonPayment),
    totalInterestPaid: Math.round(interestOnlyTotalInterest),
    totalCost: Math.round(totalCost),
    amortizationComparison: Math.round(amortizingMonthlyPayment),
    savingsDuringInterestOnly: Math.round(savingsDuringInterestOnly),
    totalSavings: Math.round(totalSavings),
    investmentOpportunity: Math.round(investmentOpportunity),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    debtToIncomeRatioBack: Math.round(debtToIncomeRatioBack * 100) / 100,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    equityBuildUp: Math.round(equityBuildUp),
    taxSavings: Math.round(taxSavings),
    afterTaxCost: Math.round(afterTaxCost),
    breakEvenPoint: Math.round(breakEvenPoint * 100) / 100,
    refinanceAnalysis,
    riskAssessment,
    recommendation,
    affordabilityScore,
    riskScore,
    suitabilityScore,
    keyMetrics,
    paymentSchedule,
    comparisonAnalysis,
    scenarioAnalysis,
    exitStrategyAnalysis,
    interestOnlyMortgageAnalysis: 'Comprehensive interest-only mortgage analysis completed'
  };
}

export function generateInterestOnlyMortgageAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Interest-Only Mortgage Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Suitability Score:** ${outputs.suitabilityScore}/100
**Affordability Score:** ${outputs.affordabilityScore}/100
**Risk Score:** ${outputs.riskScore}/100

## Payment Overview
- **Monthly Interest Payment:** $${outputs.monthlyInterestPayment.toLocaleString()}
- **Monthly PITI:** $${outputs.monthlyPITI.toLocaleString()}
- **Total Monthly Housing Cost:** $${outputs.monthlyTotalHousing.toLocaleString()}
- **Balloon Payment:** $${outputs.balloonPayment.toLocaleString()}

## Key Metrics
${outputs.keyMetrics}

## Payment Schedule
${outputs.paymentSchedule}

## Comparison Analysis
${outputs.comparisonAnalysis}

## Scenario Analysis
${outputs.scenarioAnalysis}

## Exit Strategy Analysis
${outputs.exitStrategyAnalysis}

## Refinance Analysis
${outputs.refinanceAnalysis}

## Risk Assessment
${outputs.riskAssessment}

## Financial Impact
- **Total Interest Paid:** $${outputs.totalInterestPaid.toLocaleString()}
- **Total Cost:** $${outputs.totalCost.toLocaleString()}
- **Tax Savings:** $${outputs.taxSavings.toLocaleString()}/year
- **After-Tax Monthly Cost:** $${outputs.afterTaxCost.toLocaleString()}
- **Investment Opportunity:** $${outputs.investmentOpportunity.toLocaleString()}
- **Break-Even Point:** ${outputs.breakEvenPoint} years

## Recommendations
1. **Monitor Interest Rates:** Track refinance opportunities
2. **Build Emergency Fund:** Maintain 6+ months of payments
3. **Plan Exit Strategy:** Have clear plan for end of interest-only period
4. **Consider Investment:** Invest monthly savings for better returns
5. **Review Annually:** Reassess suitability as circumstances change
6. **Prepare for Balloon:** Plan for balloon payment or refinance
7. **Tax Planning:** Maximize interest deduction benefits
8. **Risk Management:** Implement strategies to mitigate identified risks

## Next Steps
1. **Secure Financing:** Lock in current rates if proceeding
2. **Set Up Escrow:** Arrange for tax and insurance payments
3. **Investment Strategy:** Develop plan for monthly savings
4. **Exit Planning:** Begin planning for end of interest-only period
5. **Regular Review:** Schedule annual mortgage review
6. **Rate Monitoring:** Set up alerts for refinance opportunities
7. **Emergency Fund:** Build adequate emergency reserves
8. **Professional Advice:** Consult with financial advisor`;
}
