import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface MortgageEquityInputs extends CalculatorInputs {
  homeValue: number;
  originalPurchasePrice: number;
  purchaseDate: string;
  originalLoanAmount: number;
  currentLoanBalance: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  propertyTaxRate: number;
  homeownersInsuranceAnnual: number;
  homeImprovements: number;
  marketAppreciationRate: number;
  closingCosts: number;
  downPayment: number;
  pmiMonthly: number;
  helocBalance: number;
  secondMortgageBalance: number;
  otherLiens: number;
  rentalIncome: number;
  rentalExpenses: number;
  refinanceHistory: string;
  refinanceCosts: number;
  propertyType: string;
  locationType: string;
  propertyAge: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
}

export interface MortgageEquityOutputs extends CalculatorOutputs {
  currentEquity: number;
  equityPercentage: number;
  loanToValueRatio: number;
  totalDebt: number;
  equityGrowth: number;
  equityGrowthPercentage: number;
  appreciationGain: number;
  principalPaid: number;
  totalInvestment: number;
  returnOnInvestment: number;
  annualizedReturn: number;
  monthlyEquityBuild: number;
  yearsToOwnership: number;
  equityBreakdown: string;
  borrowingCapacity: number;
  helocEligibility: string;
  cashOutRefinance: string;
  investmentAnalysis: string;
  marketComparison: string;
  equityProjection: string;
  recommendations: string;
  riskAssessment: string;
  taxImplications: string;
  refinanceAnalysis: string;
}

export function calculateMortgageEquity(inputs: MortgageEquityInputs): MortgageEquityOutputs {
  // Calculate total debt against the property
  const totalDebt = inputs.currentLoanBalance + inputs.helocBalance + 
                   inputs.secondMortgageBalance + inputs.otherLiens;

  // Calculate current equity
  const currentEquity = inputs.homeValue - totalDebt;
  const equityPercentage = (currentEquity / inputs.homeValue) * 100;
  const loanToValueRatio = (totalDebt / inputs.homeValue) * 100;

  // Calculate time since purchase
  const purchaseDate = new Date(inputs.purchaseDate);
  const currentDate = new Date();
  const yearsSincePurchase = (currentDate.getTime() - purchaseDate.getTime()) / 
                            (1000 * 60 * 60 * 24 * 365.25);

  // Calculate principal paid
  const principalPaid = inputs.originalLoanAmount - inputs.currentLoanBalance;

  // Calculate appreciation gain
  const appreciationGain = inputs.homeValue - inputs.originalPurchasePrice;

  // Calculate total equity growth
  const equityGrowth = currentEquity - inputs.downPayment;
  const equityGrowthPercentage = (equityGrowth / inputs.downPayment) * 100;

  // Calculate total investment
  const totalInvestment = inputs.downPayment + inputs.closingCosts + 
                         inputs.homeImprovements + inputs.refinanceCosts;

  // Calculate ROI
  const returnOnInvestment = ((currentEquity - totalInvestment) / totalInvestment) * 100;

  // Calculate annualized return
  const annualizedReturn = yearsSincePurchase > 0 ? 
    Math.pow((currentEquity / totalInvestment), (1 / yearsSincePurchase)) - 1 : 0;

  // Calculate monthly equity build
  const monthlyEquityBuild = yearsSincePurchase > 0 ? 
    equityGrowth / (yearsSincePurchase * 12) : 0;

  // Calculate years to full ownership
  const yearsToOwnership = inputs.loanTerm - yearsSincePurchase;

  // Calculate borrowing capacity (typically 80-85% of equity)
  const borrowingCapacity = currentEquity * 0.8;

  // Generate detailed analysis
  const equityBreakdown = generateEquityBreakdown(inputs, currentEquity, principalPaid, appreciationGain);
  const helocEligibility = generateHELOCAnalysis(inputs, currentEquity, borrowingCapacity);
  const cashOutRefinance = generateCashOutRefinanceAnalysis(inputs, currentEquity, loanToValueRatio);
  const investmentAnalysis = generateInvestmentAnalysis(inputs, returnOnInvestment, annualizedReturn);
  const marketComparison = generateMarketComparison(inputs, appreciationGain, yearsSincePurchase);
  const equityProjection = generateEquityProjection(inputs, currentEquity, yearsSincePurchase);
  const recommendations = generateRecommendations(inputs, currentEquity, loanToValueRatio, borrowingCapacity);
  const riskAssessment = generateRiskAssessment(inputs, currentEquity, loanToValueRatio);
  const taxImplications = generateTaxImplications(inputs, currentEquity, appreciationGain);
  const refinanceAnalysis = generateRefinanceAnalysis(inputs, currentEquity, loanToValueRatio);

  return {
    currentEquity,
    equityPercentage,
    loanToValueRatio,
    totalDebt,
    equityGrowth,
    equityGrowthPercentage,
    appreciationGain,
    principalPaid,
    totalInvestment,
    returnOnInvestment,
    annualizedReturn: annualizedReturn * 100,
    monthlyEquityBuild,
    yearsToOwnership,
    equityBreakdown,
    borrowingCapacity,
    helocEligibility,
    cashOutRefinance,
    investmentAnalysis,
    marketComparison,
    equityProjection,
    recommendations,
    riskAssessment,
    taxImplications,
    refinanceAnalysis
  };
}

function generateEquityBreakdown(inputs: MortgageEquityInputs, currentEquity: number, principalPaid: number, appreciationGain: number): string {
  const downPaymentContribution = inputs.downPayment;
  const principalContribution = principalPaid;
  const appreciationContribution = appreciationGain;
  const improvementsContribution = inputs.homeImprovements;

  return `**Equity Breakdown:**
- **Down Payment**: $${downPaymentContribution.toLocaleString()} (${((downPaymentContribution / currentEquity) * 100).toFixed(1)}%)
- **Principal Paid**: $${principalContribution.toLocaleString()} (${((principalContribution / currentEquity) * 100).toFixed(1)}%)
- **Market Appreciation**: $${appreciationContribution.toLocaleString()} (${((appreciationContribution / currentEquity) * 100).toFixed(1)}%)
- **Home Improvements**: $${improvementsContribution.toLocaleString()} (${((improvementsContribution / currentEquity) * 100).toFixed(1)}%)

**Total Equity**: $${currentEquity.toLocaleString()}`;
}

function generateHELOCAnalysis(inputs: MortgageEquityInputs, currentEquity: number, borrowingCapacity: number): string {
  const maxHELOC = Math.min(borrowingCapacity, currentEquity * 0.85);
  const helocRate = 6.5; // Estimated HELOC rate
  const monthlyPayment = (maxHELOC * (helocRate / 100)) / 12;

  return `**HELOC Eligibility Analysis:**
- **Maximum HELOC Amount**: $${maxHELOC.toLocaleString()}
- **Estimated Interest Rate**: ${helocRate}%
- **Estimated Monthly Payment**: $${monthlyPayment.toFixed(2)}
- **Available for Borrowing**: $${(maxHELOC - inputs.helocBalance).toLocaleString()}

**Requirements**: 
- Minimum 20% equity remaining after HELOC
- Good credit score (680+)
- Stable income and employment`;
}

function generateCashOutRefinanceAnalysis(inputs: MortgageEquityInputs, currentEquity: number, ltvRatio: number): string {
  const maxCashOut = currentEquity * 0.8;
  const newLoanAmount = inputs.currentLoanBalance + maxCashOut;
  const newLTV = (newLoanAmount / inputs.homeValue) * 100;

  return `**Cash-Out Refinance Options:**
- **Maximum Cash-Out**: $${maxCashOut.toLocaleString()}
- **New Loan Amount**: $${newLoanAmount.toLocaleString()}
- **New LTV Ratio**: ${newLTV.toFixed(1)}%
- **Estimated Closing Costs**: $${(newLoanAmount * 0.03).toLocaleString()}

**Considerations**:
- Current LTV: ${ltvRatio.toFixed(1)}%
- Refinance only if new rate is 0.5%+ lower
- Factor in closing costs vs. benefits`;
}

function generateInvestmentAnalysis(inputs: MortgageEquityInputs, roi: number, annualizedReturn: number): string {
  const propertyValuePerSqFt = inputs.homeValue / inputs.squareFootage;
  const marketValue = inputs.originalPurchasePrice * Math.pow(1 + inputs.marketAppreciationRate / 100, 3);
  const overUnderValued = inputs.homeValue > marketValue ? 'Overvalued' : 'Undervalued';

  return `**Investment Performance:**
- **Total ROI**: ${roi.toFixed(1)}%
- **Annualized Return**: ${(annualizedReturn * 100).toFixed(1)}%
- **Value per Sq Ft**: $${propertyValuePerSqFt.toFixed(0)}
- **Market Position**: ${overUnderValued}

**Property Details**:
- Type: ${inputs.propertyType.replace('-', ' ').toUpperCase()}
- Location: ${inputs.locationType.toUpperCase()}
- Age: ${inputs.propertyAge} years
- Size: ${inputs.squareFootage} sq ft`;
}

function generateMarketComparison(inputs: MortgageEquityInputs, appreciationGain: number, yearsSincePurchase: number): string {
  const annualAppreciation = yearsSincePurchase > 0 ? (appreciationGain / inputs.originalPurchasePrice) / yearsSincePurchase * 100 : 0;
  const marketAverage = 3.5; // Historical average
  const performance = annualAppreciation > marketAverage ? 'Above Average' : 'Below Average';

  return `**Market Performance Comparison:**
- **Your Annual Appreciation**: ${annualAppreciation.toFixed(1)}%
- **Market Average**: ${marketAverage}%
- **Performance**: ${performance}
- **Total Appreciation**: $${appreciationGain.toLocaleString()}

**Market Context**:
- Location Type: ${inputs.locationType.toUpperCase()}
- Property Type: ${inputs.propertyType.replace('-', ' ').toUpperCase()}
- Years Owned: ${yearsSincePurchase.toFixed(1)} years`;
}

function generateEquityProjection(inputs: MortgageEquityInputs, currentEquity: number, yearsSincePurchase: number): string {
  const yearsToProject = 5;
  const projectedAppreciation = inputs.homeValue * Math.pow(1 + inputs.marketAppreciationRate / 100, yearsToProject);
  const projectedEquity = projectedAppreciation - inputs.currentLoanBalance;
  const monthlyPrincipalPayment = inputs.monthlyPayment * 0.4; // Rough estimate
  const additionalPrincipalPaid = monthlyPrincipalPayment * 12 * yearsToProject;
  const totalProjectedEquity = projectedEquity + additionalPrincipalPaid;

  return `**5-Year Equity Projection:**
- **Current Equity**: $${currentEquity.toLocaleString()}
- **Projected Home Value**: $${projectedAppreciation.toLocaleString()}
- **Additional Principal Paid**: $${additionalPrincipalPaid.toLocaleString()}
- **Projected Total Equity**: $${totalProjectedEquity.toLocaleString()}
- **Equity Growth**: $${(totalProjectedEquity - currentEquity).toLocaleString()}

**Assumptions**:
- Annual appreciation: ${inputs.marketAppreciationRate}%
- Monthly principal payments continue
- No additional debt taken`;
}

function generateRecommendations(inputs: MortgageEquityInputs, currentEquity: number, ltvRatio: number, borrowingCapacity: number): string {
  const recommendations = [];

  if (ltvRatio > 80) {
    recommendations.push("Consider paying down principal to reach 80% LTV and eliminate PMI");
  }

  if (currentEquity > 100000) {
    recommendations.push("Strong equity position - consider HELOC for home improvements or investments");
  }

  if (inputs.interestRate > 6) {
    recommendations.push("High interest rate - explore refinancing options if rates are lower");
  }

  if (inputs.homeImprovements < 10000) {
    recommendations.push("Consider strategic home improvements to increase property value");
  }

  if (borrowingCapacity > 50000) {
    recommendations.push("Significant borrowing capacity available for investment opportunities");
  }

  return `**Recommendations:**
${recommendations.map(rec => `- ${rec}`).join('\n')}

**Next Steps**:
1. Review current mortgage terms and rates
2. Consider home improvement projects
3. Explore investment opportunities using available equity
4. Monitor market conditions for refinancing opportunities`;
}

function generateRiskAssessment(inputs: MortgageEquityInputs, currentEquity: number, ltvRatio: number): string {
  let riskLevel = 'Low';
  let riskFactors = [];

  if (ltvRatio > 90) {
    riskLevel = 'High';
    riskFactors.push('Very high LTV ratio');
  } else if (ltvRatio > 80) {
    riskLevel = 'Medium';
    riskFactors.push('High LTV ratio');
  }

  if (inputs.helocBalance + inputs.secondMortgageBalance > currentEquity * 0.5) {
    riskLevel = 'High';
    riskFactors.push('High secondary debt');
  }

  if (inputs.marketAppreciationRate < 0) {
    riskFactors.push('Declining market');
  }

  if (inputs.interestRate > 7) {
    riskFactors.push('High interest rate');
  }

  return `**Risk Assessment: ${riskLevel.toUpperCase()}**
- **Current LTV**: ${ltvRatio.toFixed(1)}%
- **Equity Buffer**: $${currentEquity.toLocaleString()}
- **Risk Factors**: ${riskFactors.length > 0 ? riskFactors.join(', ') : 'None identified'}

**Risk Mitigation**:
- Maintain emergency fund
- Consider additional principal payments
- Monitor market conditions
- Review insurance coverage`;
}

function generateTaxImplications(inputs: MortgageEquityInputs, currentEquity: number, appreciationGain: number): string {
  const primaryResidenceExclusion = 250000; // Single filer
  const taxableGain = Math.max(0, appreciationGain - primaryResidenceExclusion);
  const propertyTaxDeduction = inputs.homeValue * (inputs.propertyTaxRate / 100);
  const mortgageInterestDeduction = inputs.currentLoanBalance * (inputs.interestRate / 100);

  return `**Tax Implications:**
- **Capital Gains Exclusion**: $${primaryResidenceExclusion.toLocaleString()}
- **Potential Taxable Gain**: $${taxableGain.toLocaleString()}
- **Annual Property Tax Deduction**: $${propertyTaxDeduction.toLocaleString()}
- **Annual Mortgage Interest Deduction**: $${mortgageInterestDeduction.toLocaleString()}

**Tax Benefits**:
- Primary residence capital gains exclusion
- Property tax deductions
- Mortgage interest deductions
- Home improvement tax benefits (if applicable)`;
}

function generateRefinanceAnalysis(inputs: MortgageEquityInputs, currentEquity: number, ltvRatio: number): string {
  const currentRate = inputs.interestRate;
  const marketRate = 6.5; // Current market rate estimate
  const rateDifference = currentRate - marketRate;
  const refinanceThreshold = 0.5;

  let refinanceRecommendation = 'Not recommended';
  if (rateDifference > refinanceThreshold) {
    refinanceRecommendation = 'Consider refinancing';
  }

  const monthlySavings = rateDifference > 0 ? 
    (inputs.currentLoanBalance * (rateDifference / 100)) / 12 : 0;

  return `**Refinance Analysis:**
- **Current Rate**: ${currentRate}%
- **Market Rate**: ${marketRate}%
- **Rate Difference**: ${rateDifference.toFixed(2)}%
- **Monthly Savings**: $${monthlySavings.toFixed(2)}
- **Recommendation**: ${refinanceRecommendation}

**Refinance Considerations**:
- Closing costs: ~3% of loan amount
- Break-even period: ${monthlySavings > 0 ? (inputs.currentLoanBalance * 0.03 / monthlySavings / 12).toFixed(1) : 'N/A'} years
- LTV requirement: 80% or less for best rates`;
}

export function generateMortgageEquityAnalysis(inputs: MortgageEquityInputs, outputs: MortgageEquityOutputs): string {
  return `# Mortgage Equity Analysis Report

## Executive Summary
Your property has built significant equity of **$${outputs.currentEquity.toLocaleString()}** (${outputs.equityPercentage.toFixed(1)}% of home value). This represents a strong investment position with multiple opportunities for leveraging this equity.

## Key Metrics
- **Current Equity**: $${outputs.currentEquity.toLocaleString()}
- **Equity Percentage**: ${outputs.equityPercentage.toFixed(1)}%
- **Loan-to-Value Ratio**: ${outputs.loanToValueRatio.toFixed(1)}%
- **Total Debt**: $${outputs.totalDebt.toLocaleString()}
- **Equity Growth**: $${outputs.equityGrowth.toLocaleString()} (${outputs.equityGrowthPercentage.toFixed(1)}%)

## Investment Performance
- **Total ROI**: ${outputs.returnOnInvestment.toFixed(1)}%
- **Annualized Return**: ${outputs.annualizedReturn.toFixed(1)}%
- **Monthly Equity Build**: $${outputs.monthlyEquityBuild.toFixed(0)}
- **Years to Full Ownership**: ${outputs.yearsToOwnership.toFixed(1)} years

## Equity Sources
${outputs.equityBreakdown}

## Borrowing Opportunities
- **Available for HELOC**: $${outputs.borrowingCapacity.toLocaleString()}
- **Cash-Out Refinance Potential**: $${(outputs.currentEquity * 0.8).toLocaleString()}

## Detailed Analysis

### HELOC Eligibility
${outputs.helocEligibility}

### Cash-Out Refinance Options
${outputs.cashOutRefinance}

### Investment Performance
${outputs.investmentAnalysis}

### Market Comparison
${outputs.marketComparison}

### Future Projections
${outputs.equityProjection}

## Risk Assessment
${outputs.riskAssessment}

## Tax Implications
${outputs.taxImplications}

## Refinance Analysis
${outputs.refinanceAnalysis}

## Recommendations
${outputs.recommendations}

## Next Steps
1. **Review Current Position**: Your strong equity position provides multiple options
2. **Consider HELOC**: For home improvements or investment opportunities
3. **Monitor Rates**: Watch for refinancing opportunities if rates improve
4. **Plan Improvements**: Strategic upgrades can further increase property value
5. **Diversify**: Consider using equity for other investment opportunities

---
*This analysis is based on current market conditions and should be reviewed regularly. Consult with financial professionals for personalized advice.*`;
}
