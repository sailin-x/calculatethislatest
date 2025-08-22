import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface MortgageInsuranceInputs extends CalculatorInputs {
  homeValue: number;
  loanAmount: number;
  currentLoanBalance: number;
  downPayment: number;
  creditScore: number;
  loanType: string;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  purchaseDate: string;
  propertyType: string;
  occupancyType: string;
  propertyTaxRate: number;
  homeownersInsuranceAnnual: number;
  monthlyPrincipalPayment: number;
  additionalPrincipalPayments: number;
  homeImprovements: number;
  marketAppreciationRate: number;
  refinanceHistory: string;
  paymentHistory: string;
  bankruptcyHistory: string;
  foreclosureHistory: string;
  debtToIncomeRatio: number;
  annualIncome: number;
  otherMonthlyDebts: number;
  state: string;
  county: string;
}

export interface MortgageInsuranceOutputs extends CalculatorOutputs {
  loanToValueRatio: number;
  originalLTV: number;
  pmiRate: number;
  monthlyPMI: number;
  annualPMI: number;
  totalPMICost: number;
  pmiCancellationDate: string;
  monthsToCancellation: number;
  equityNeeded: number;
  principalNeeded: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  fhaMIPRate: number;
  monthlyFHA: number;
  fhaCancellation: string;
  insuranceComparison: string;
  cancellationStrategies: string;
  refinanceAnalysis: string;
  costBenefitAnalysis: string;
  recommendations: string;
  riskAssessment: string;
  timeline: string;
  legalRequirements: string;
}

export function calculateMortgageInsurance(inputs: MortgageInsuranceInputs): MortgageInsuranceOutputs {
  // Calculate LTV ratios
  const originalLTV = (inputs.loanAmount / (inputs.loanAmount + inputs.downPayment)) * 100;
  const loanToValueRatio = (inputs.currentLoanBalance / inputs.homeValue) * 100;

  // Calculate time since purchase
  const purchaseDate = new Date(inputs.purchaseDate);
  const currentDate = new Date();
  const monthsSincePurchase = (currentDate.getTime() - purchaseDate.getTime()) / 
                              (1000 * 60 * 60 * 24 * 30.44);

  // Calculate PMI rate based on credit score and LTV
  const pmiRate = calculatePMIRate(inputs.creditScore, originalLTV, inputs.loanType);
  const monthlyPMI = (inputs.currentLoanBalance * (pmiRate / 100)) / 12;
  const annualPMI = monthlyPMI * 12;

  // Calculate total PMI cost to date
  const totalPMICost = monthlyPMI * monthsSincePurchase;

  // Calculate PMI cancellation requirements
  const cancellationThreshold = 0.78; // 78% LTV for automatic cancellation
  const currentLTVDecimal = loanToValueRatio / 100;
  const equityNeeded = inputs.currentLoanBalance - (inputs.homeValue * cancellationThreshold);
  const principalNeeded = equityNeeded > 0 ? equityNeeded : 0;

  // Calculate time to cancellation
  const totalMonthlyPrincipal = inputs.monthlyPrincipalPayment + inputs.additionalPrincipalPayments;
  const monthsToCancellation = principalNeeded > 0 ? 
    Math.ceil(principalNeeded / totalMonthlyPrincipal) : 0;

  // Calculate cancellation date
  const cancellationDate = new Date();
  cancellationDate.setMonth(cancellationDate.getMonth() + monthsToCancellation);
  const pmiCancellationDate = cancellationDate.toISOString().split('T')[0];

  // Calculate savings
  const monthlySavings = monthlyPMI;
  const annualSavings = monthlySavings * 12;
  const totalSavings = monthlyPMI * monthsToCancellation;

  // Calculate FHA MIP rates
  const fhaMIPRate = calculateFHAMIPRate(inputs.loanAmount, inputs.downPayment, inputs.loanTerm);
  const monthlyFHA = (inputs.currentLoanBalance * (fhaMIPRate / 100)) / 12;

  // Generate detailed analysis
  const fhaCancellation = generateFHACancellationAnalysis(inputs, loanToValueRatio);
  const insuranceComparison = generateInsuranceComparison(inputs, pmiRate, fhaMIPRate, monthlyPMI, monthlyFHA);
  const cancellationStrategies = generateCancellationStrategies(inputs, equityNeeded, principalNeeded, monthsToCancellation);
  const refinanceAnalysis = generateRefinanceAnalysis(inputs, loanToValueRatio, monthlyPMI);
  const costBenefitAnalysis = generateCostBenefitAnalysis(inputs, totalSavings, principalNeeded, monthsToCancellation);
  const recommendations = generateRecommendations(inputs, loanToValueRatio, monthlyPMI, monthsToCancellation);
  const riskAssessment = generateRiskAssessment(inputs, loanToValueRatio, pmiRate);
  const timeline = generateTimeline(inputs, monthsToCancellation, pmiCancellationDate);
  const legalRequirements = generateLegalRequirements(inputs, loanToValueRatio);

  return {
    loanToValueRatio,
    originalLTV,
    pmiRate,
    monthlyPMI,
    annualPMI,
    totalPMICost,
    pmiCancellationDate,
    monthsToCancellation,
    equityNeeded,
    principalNeeded,
    monthlySavings,
    annualSavings,
    totalSavings,
    fhaMIPRate,
    monthlyFHA,
    fhaCancellation,
    insuranceComparison,
    cancellationStrategies,
    refinanceAnalysis,
    costBenefitAnalysis,
    recommendations,
    riskAssessment,
    timeline,
    legalRequirements
  };
}

function calculatePMIRate(creditScore: number, ltv: number, loanType: string): number {
  if (loanType !== 'conventional') return 0;

  // Base PMI rates based on credit score and LTV
  let baseRate = 0.5; // Base rate of 0.5%

  // Adjust for credit score
  if (creditScore >= 760) baseRate -= 0.1;
  else if (creditScore >= 720) baseRate -= 0.05;
  else if (creditScore >= 680) baseRate += 0.1;
  else if (creditScore >= 640) baseRate += 0.3;
  else baseRate += 0.5;

  // Adjust for LTV
  if (ltv > 95) baseRate += 0.2;
  else if (ltv > 90) baseRate += 0.1;
  else if (ltv > 85) baseRate += 0.05;

  return Math.max(0.1, Math.min(1.5, baseRate)); // Clamp between 0.1% and 1.5%
}

function calculateFHAMIPRate(loanAmount: number, downPayment: number, loanTerm: number): number {
  const downPaymentPercent = (downPayment / (loanAmount + downPayment)) * 100;
  
  // FHA MIP rates (as of 2024)
  if (loanTerm <= 15) {
    if (downPaymentPercent >= 10) return 0.15;
    else return 0.55;
  } else {
    if (downPaymentPercent >= 10) return 0.15;
    else return 0.55;
  }
}

function generateFHACancellationAnalysis(inputs: MortgageInsuranceInputs, ltv: number): string {
  if (inputs.loanType !== 'fha') {
    return '**FHA MIP Analysis**: Not applicable - this is not an FHA loan.';
  }

  const downPaymentPercent = (inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100;
  const yearsSincePurchase = (new Date().getTime() - new Date(inputs.purchaseDate).getTime()) / 
                            (1000 * 60 * 60 * 24 * 365.25);

  let cancellationRequirements = '**FHA MIP Cancellation Requirements**:\n';
  
  if (downPaymentPercent >= 10) {
    cancellationRequirements += '- **Eligible for cancellation** after 11 years\n';
    cancellationRequirements += '- **Current LTV**: ' + ltv.toFixed(1) + '%\n';
    cancellationRequirements += '- **Years since purchase**: ' + yearsSincePurchase.toFixed(1) + ' years\n';
    
    if (yearsSincePurchase >= 11) {
      cancellationRequirements += '- **Status**: Eligible for cancellation\n';
    } else {
      const yearsRemaining = 11 - yearsSincePurchase;
      cancellationRequirements += '- **Years remaining**: ' + yearsRemaining.toFixed(1) + ' years\n';
    }
  } else {
    cancellationRequirements += '- **Not eligible for cancellation** (down payment < 10%)\n';
    cancellationRequirements += '- **MIP is permanent** for the life of the loan\n';
    cancellationRequirements += '- **Consider refinancing** to conventional loan when LTV reaches 80%\n';
  }

  return cancellationRequirements;
}

function generateInsuranceComparison(inputs: MortgageInsuranceInputs, pmiRate: number, fhaMIPRate: number, monthlyPMI: number, monthlyFHA: number): string {
  const conventionalCost = monthlyPMI * 12;
  const fhaCost = monthlyFHA * 12;
  const vaCost = 0; // VA loans typically don't have monthly insurance
  const usdaCost = (inputs.currentLoanBalance * 0.35) / 12 * 12; // USDA annual fee

  return `**Insurance Type Comparison:**
- **Conventional PMI**: $${conventionalCost.toFixed(0)}/year (${pmiRate.toFixed(2)}% rate)
- **FHA MIP**: $${fhaCost.toFixed(0)}/year (${fhaMIPRate.toFixed(2)}% rate)
- **VA Funding Fee**: $${vaCost.toFixed(0)}/year (one-time fee)
- **USDA Annual Fee**: $${usdaCost.toFixed(0)}/year (0.35% rate)

**Key Differences**:
- **Conventional PMI**: Cancellable at 78% LTV, credit-based rates
- **FHA MIP**: May be permanent, higher rates but lower credit requirements
- **VA**: No monthly insurance, one-time funding fee
- **USDA**: Annual fee for life of loan, no down payment required`;
}

function generateCancellationStrategies(inputs: MortgageInsuranceInputs, equityNeeded: number, principalNeeded: number, monthsToCancellation: number): string {
  const strategies = [];

  if (equityNeeded > 0) {
    strategies.push(`**Principal Reduction**: Pay an additional $${principalNeeded.toLocaleString()} in principal`);
    strategies.push(`**Timeline**: ${monthsToCancellation} months with current payment schedule`);
  }

  if (inputs.additionalPrincipalPayments > 0) {
    const acceleratedMonths = Math.ceil(principalNeeded / (inputs.monthlyPrincipalPayment + inputs.additionalPrincipalPayments));
    strategies.push(`**Accelerated Timeline**: ${acceleratedMonths} months with additional payments`);
  }

  if (inputs.homeImprovements > 0) {
    strategies.push(`**Home Improvements**: $${inputs.homeImprovements.toLocaleString()} in improvements may increase home value`);
  }

  if (inputs.marketAppreciationRate > 0) {
    const appreciationMonths = Math.ceil(principalNeeded / (inputs.homeValue * (inputs.marketAppreciationRate / 100) / 12));
    strategies.push(`**Market Appreciation**: Natural appreciation may reach 78% LTV in ${appreciationMonths} months`);
  }

  strategies.push(`**Refinancing**: Consider refinancing to conventional loan when LTV reaches 80%`);
  strategies.push(`**Lump Sum Payment**: Make a one-time payment of $${principalNeeded.toLocaleString()} to eliminate PMI immediately`);

  return `**Cancellation Strategies:**
${strategies.map(strategy => `- ${strategy}`).join('\n')}

**Recommended Approach**:
1. Continue regular payments
2. Make additional principal payments if possible
3. Monitor home value appreciation
4. Consider refinancing when rates are favorable`;
}

function generateRefinanceAnalysis(inputs: MortgageInsuranceInputs, ltv: number, monthlyPMI: number): string {
  const refinanceThreshold = 80; // 80% LTV for refinancing
  const equityNeededForRefinance = inputs.currentLoanBalance - (inputs.homeValue * 0.8);
  const currentMarketRate = 6.5; // Estimated current market rate
  const rateDifference = inputs.interestRate - currentMarketRate;
  const monthlySavings = monthlyPMI;
  const refinanceCosts = inputs.currentLoanBalance * 0.03; // 3% of loan amount
  const breakEvenMonths = refinanceCosts / monthlySavings;

  return `**Refinance Analysis:**
- **Current LTV**: ${ltv.toFixed(1)}%
- **Refinance Threshold**: ${refinanceThreshold}%
- **Equity Needed**: $${Math.max(0, equityNeededForRefinance).toLocaleString()}
- **Current Rate**: ${inputs.interestRate}%
- **Market Rate**: ${currentMarketRate}%
- **Rate Difference**: ${rateDifference.toFixed(2)}%
- **Monthly PMI Savings**: $${monthlySavings.toFixed(2)}
- **Refinance Costs**: $${refinanceCosts.toLocaleString()}
- **Break-even Period**: ${breakEvenMonths.toFixed(1)} months

**Refinance Recommendation**: ${rateDifference > 0.5 ? 'Consider refinancing' : 'Not recommended at this time'}

**Considerations**:
- Factor in closing costs vs. PMI savings
- Current interest rate environment
- Credit score impact on new rate
- Loan term implications`;
}

function generateCostBenefitAnalysis(inputs: MortgageInsuranceInputs, totalSavings: number, principalNeeded: number, monthsToCancellation: number): string {
  const opportunityCost = principalNeeded * 0.05; // 5% opportunity cost
  const netBenefit = totalSavings - opportunityCost;
  const roi = principalNeeded > 0 ? (totalSavings / principalNeeded) * 100 : 0;

  return `**Cost-Benefit Analysis:**
- **Total PMI Cost Until Cancellation**: $${totalSavings.toLocaleString()}
- **Principal Reduction Needed**: $${principalNeeded.toLocaleString()}
- **Opportunity Cost (5% return)**: $${opportunityCost.toLocaleString()}
- **Net Benefit**: $${netBenefit.toLocaleString()}
- **ROI on Principal Reduction**: ${roi.toFixed(1)}%
- **Time to Break-even**: ${monthsToCancellation} months

**Analysis**:
- **Positive ROI**: ${roi > 5 ? 'Yes' : 'No'} (exceeds 5% opportunity cost)
- **Time Value**: ${monthsToCancellation < 24 ? 'Good' : 'Consider alternatives'}
- **Recommendation**: ${roi > 5 ? 'Proceed with principal reduction' : 'Consider other investment options'}`;
}

function generateRecommendations(inputs: MortgageInsuranceInputs, ltv: number, monthlyPMI: number, monthsToCancellation: number): string {
  const recommendations = [];

  if (ltv > 90) {
    recommendations.push('Focus on principal reduction to reach 80% LTV quickly');
  } else if (ltv > 80) {
    recommendations.push('Continue regular payments and consider additional principal payments');
  } else {
    recommendations.push('Contact lender to request PMI cancellation');
  }

  if (monthlyPMI > 100) {
    recommendations.push('High PMI cost - prioritize principal reduction');
  }

  if (monthsToCancellation > 60) {
    recommendations.push('Long timeline - consider refinancing or lump sum payment');
  }

  if (inputs.creditScore > 740) {
    recommendations.push('Good credit score - may qualify for better rates on refinance');
  }

  recommendations.push('Monitor home value appreciation for natural LTV reduction');
  recommendations.push('Review PMI cancellation requirements with lender annually');

  return `**Recommendations:**
${recommendations.map(rec => `- ${rec}`).join('\n')}

**Next Steps**:
1. Calculate exact principal reduction needed
2. Set up automatic additional principal payments
3. Monitor home value changes
4. Review refinancing options when rates improve
5. Contact lender for PMI cancellation when eligible`;
}

function generateRiskAssessment(inputs: MortgageInsuranceInputs, ltv: number, pmiRate: number): string {
  let riskLevel = 'Low';
  let riskFactors = [];

  if (ltv > 95) {
    riskLevel = 'High';
    riskFactors.push('Very high LTV ratio');
  } else if (ltv > 90) {
    riskLevel = 'Medium';
    riskFactors.push('High LTV ratio');
  }

  if (pmiRate > 1.0) {
    riskFactors.push('High PMI rate');
  }

  if (inputs.paymentHistory !== 'perfect') {
    riskFactors.push('Payment history issues');
  }

  if (inputs.bankruptcyHistory !== 'none') {
    riskFactors.push('Bankruptcy history');
  }

  if (inputs.foreclosureHistory !== 'none') {
    riskFactors.push('Foreclosure history');
  }

  if (inputs.debtToIncomeRatio > 43) {
    riskFactors.push('High debt-to-income ratio');
  }

  return `**Risk Assessment: ${riskLevel.toUpperCase()}**
- **Current LTV**: ${ltv.toFixed(1)}%
- **PMI Rate**: ${pmiRate.toFixed(2)}%
- **Risk Factors**: ${riskFactors.length > 0 ? riskFactors.join(', ') : 'None identified'}

**Risk Mitigation**:
- Maintain excellent payment history
- Reduce debt-to-income ratio
- Build emergency fund
- Consider additional principal payments
- Monitor credit score improvements`;
}

function generateTimeline(inputs: MortgageInsuranceInputs, monthsToCancellation: number, cancellationDate: string): string {
  const purchaseDate = new Date(inputs.purchaseDate);
  const currentDate = new Date();
  const monthsSincePurchase = (currentDate.getTime() - purchaseDate.getTime()) / 
                              (1000 * 60 * 60 * 24 * 30.44);

  return `**PMI Cancellation Timeline:**
- **Purchase Date**: ${purchaseDate.toLocaleDateString()}
- **Months Since Purchase**: ${monthsSincePurchase.toFixed(0)} months
- **Current LTV**: ${((inputs.currentLoanBalance / inputs.homeValue) * 100).toFixed(1)}%
- **Target LTV**: 78%
- **Months to Cancellation**: ${monthsToCancellation} months
- **Estimated Cancellation Date**: ${cancellationDate}

**Milestones**:
- **80% LTV**: Request PMI cancellation (manual)
- **78% LTV**: Automatic PMI cancellation
- **75% LTV**: Optimal equity position

**Progress**: ${((inputs.currentLoanBalance / inputs.homeValue) * 100).toFixed(1)}% → 78% (${monthsToCancellation} months remaining)`;
}

function generateLegalRequirements(inputs: MortgageInsuranceInputs, ltv: number): string {
  return `**Legal Requirements for PMI Cancellation:**

**Automatic Cancellation (78% LTV)**:
- Must be current on payments
- No late payments in last 12 months
- Property must be primary residence
- No subordinate liens

**Manual Cancellation (80% LTV)**:
- Must be current on payments
- No late payments in last 24 months
- Property must be primary residence
- May require property appraisal
- No subordinate liens

**Current Status**:
- **LTV**: ${ltv.toFixed(1)}%
- **Payment History**: ${inputs.paymentHistory}
- **Occupancy**: ${inputs.occupancyType}
- **Eligible for Manual Cancellation**: ${ltv <= 80 ? 'Yes' : 'No'}
- **Eligible for Automatic Cancellation**: ${ltv <= 78 ? 'Yes' : 'No'}

**Required Actions**:
${ltv <= 80 ? '- Contact lender to request PMI cancellation' : '- Continue building equity to reach 80% LTV'}

**Documentation Needed**:
- Payment history verification
- Property appraisal (if required)
- Occupancy affidavit
- Request letter to lender`;
}

export function generateMortgageInsuranceAnalysis(inputs: MortgageInsuranceInputs, outputs: MortgageInsuranceOutputs): string {
  return `# Mortgage Insurance Analysis Report

## Executive Summary
Your current loan-to-value ratio is **${outputs.loanToValueRatio.toFixed(1)}%**, which means you ${outputs.loanToValueRatio <= 78 ? 'are eligible for PMI cancellation' : 'still require mortgage insurance'}. The monthly PMI cost is **$${outputs.monthlyPMI.toFixed(2)}**, totaling **$${outputs.annualPMI.toFixed(0)}** annually.

## Key Metrics
- **Current LTV**: ${outputs.loanToValueRatio.toFixed(1)}%
- **Original LTV**: ${outputs.originalLTV.toFixed(1)}%
- **PMI Rate**: ${outputs.pmiRate.toFixed(2)}%
- **Monthly PMI**: $${outputs.monthlyPMI.toFixed(2)}
- **Annual PMI**: $${outputs.annualPMI.toFixed(0)}
- **Total PMI Paid**: $${outputs.totalPMICost.toFixed(0)}

## Cancellation Analysis
- **Equity Needed**: $${outputs.equityNeeded.toLocaleString()}
- **Principal Reduction Needed**: $${outputs.principalNeeded.toLocaleString()}
- **Months to Cancellation**: ${outputs.monthsToCancellation}
- **Estimated Cancellation Date**: ${outputs.pmiCancellationDate}
- **Monthly Savings After Cancellation**: $${outputs.monthlySavings.toFixed(2)}
- **Annual Savings After Cancellation**: $${outputs.annualSavings.toFixed(0)}

## Detailed Analysis

### FHA MIP Analysis
${outputs.fhaCancellation}

### Insurance Comparison
${outputs.insuranceComparison}

### Cancellation Strategies
${outputs.cancellationStrategies}

### Refinance Analysis
${outputs.refinanceAnalysis}

### Cost-Benefit Analysis
${outputs.costBenefitAnalysis}

## Risk Assessment
${outputs.riskAssessment}

## Timeline
${outputs.timeline}

## Legal Requirements
${outputs.legalRequirements}

## Recommendations
${outputs.recommendations}

## Next Steps
1. **Immediate Actions**:
   - ${outputs.loanToValueRatio <= 80 ? 'Contact lender to request PMI cancellation' : 'Continue building equity through principal payments'}
   - Set up automatic additional principal payments if possible
   - Monitor home value appreciation

2. **Short-term Goals** (3-6 months):
   - Reduce LTV to 80% for manual cancellation eligibility
   - Improve credit score if below 740
   - Build emergency fund to support additional payments

3. **Long-term Strategy** (6-12 months):
   - Reach 78% LTV for automatic cancellation
   - Consider refinancing if rates improve significantly
   - Evaluate lump sum payment options

---
*This analysis is based on current market conditions and should be reviewed regularly. Consult with your lender for specific cancellation requirements.*`;
}
