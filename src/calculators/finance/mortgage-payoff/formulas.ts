import { MortgagePayoffInputs, MortgagePayoffOutputs } from './types';

/**
 * Calculate mortgage payoff strategies and analysis
 */
export function calculateMortgagePayoff(inputs: MortgagePayoffInputs): MortgagePayoffOutputs {
  // Calculate standard payoff scenario
  const standardPayoffDate = calculateStandardPayoffDate(inputs);
  const standardTotalInterest = calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining);
  
  // Calculate accelerated payoff scenario
  const acceleratedPayoffDate = calculateAcceleratedPayoffDate(inputs);
  const acceleratedTotalInterest = calculateAcceleratedTotalInterest(inputs);
  
  // Calculate savings and time differences
  const timeSaved = calculateTimeSaved(inputs.yearsRemaining, acceleratedPayoffDate);
  const interestSaved = standardTotalInterest - acceleratedTotalInterest;
  const totalCostSavings = calculateTotalCostSavings(inputs, interestSaved);
  const monthlyPaymentIncrease = calculateMonthlyPaymentIncrease(inputs);
  const opportunityCost = calculateOpportunityCost(inputs, interestSaved);
  
  // Generate analysis reports
  const payoffStrategy = generatePayoffStrategy(inputs, timeSaved, interestSaved);
  const refinanceAnalysis = generateRefinanceAnalysis(inputs, interestSaved);
  const investmentComparison = generateInvestmentComparison(inputs, interestSaved, opportunityCost);
  const cashFlowImpact = generateCashFlowImpact(inputs, monthlyPaymentIncrease);
  const taxImplications = generateTaxImplications(inputs, interestSaved);
  const riskAssessment = generateRiskAssessment(inputs);
  const breakEvenAnalysis = generateBreakEvenAnalysis(inputs, interestSaved, opportunityCost);
  const scenarioComparison = generateScenarioComparison(inputs, timeSaved, interestSaved);
  const recommendations = generateRecommendations(inputs, timeSaved, interestSaved, opportunityCost);
  const implementationPlan = generateImplementationPlan(inputs);
  const milestoneTimeline = generateMilestoneTimeline(inputs, acceleratedPayoffDate);
  const financialImpact = generateFinancialImpact(inputs, interestSaved, opportunityCost);
  const nextSteps = generateNextSteps(inputs, recommendations);

  return {
    standardPayoffDate,
    acceleratedPayoffDate,
    timeSaved,
    interestSaved,
    totalCostSavings,
    monthlyPaymentIncrease,
    payoffStrategy,
    refinanceAnalysis,
    investmentComparison,
    cashFlowImpact,
    taxImplications,
    riskAssessment,
    opportunityCost,
    breakEvenAnalysis,
    scenarioComparison,
    recommendations,
    implementationPlan,
    milestoneTimeline,
    financialImpact,
    nextSteps
  };
}

/**
 * Calculate standard payoff date
 */
function calculateStandardPayoffDate(inputs: MortgagePayoffInputs): string {
  const currentDate = new Date();
  const payoffDate = new Date(currentDate);
  payoffDate.setFullYear(payoffDate.getFullYear() + inputs.yearsRemaining);
  return payoffDate.toISOString().split('T')[0];
}

/**
 * Calculate accelerated payoff date
 */
function calculateAcceleratedPayoffDate(inputs: MortgagePayoffInputs): string {
  const monthlyRate = inputs.interestRate / 100 / 12;
  let balance = inputs.currentBalance;
  let months = 0;
  
  // Apply lump sum payment
  balance -= inputs.lumpSumPayment;
  
  // Calculate additional payment amount
  let additionalPayment = inputs.additionalMonthlyPayment;
  if (inputs.biweeklyPayment) {
    additionalPayment += inputs.monthlyPayment / 24; // Extra payment from biweekly
  }
  
  // Adjust for payment frequency
  switch (inputs.extraPaymentFrequency) {
    case 'quarterly':
      additionalPayment = additionalPayment * 3;
      break;
    case 'annually':
      additionalPayment = additionalPayment * 12;
      break;
    case 'one-time':
      additionalPayment = 0; // Already applied as lump sum
      break;
  }
  
  const totalMonthlyPayment = inputs.monthlyPayment + additionalPayment;
  
  while (balance > 0 && months < inputs.yearsRemaining * 12) {
    const interest = balance * monthlyRate;
    const principal = totalMonthlyPayment - interest;
    balance -= principal;
    months++;
  }
  
  const currentDate = new Date();
  const payoffDate = new Date(currentDate);
  payoffDate.setMonth(payoffDate.getMonth() + months);
  return payoffDate.toISOString().split('T')[0];
}

/**
 * Calculate total interest for standard payments
 */
function calculateTotalInterest(balance: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  return (monthlyPayment * totalPayments) - balance;
}

/**
 * Calculate total interest for accelerated payments
 */
function calculateAcceleratedTotalInterest(inputs: MortgagePayoffInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  let balance = inputs.currentBalance - inputs.lumpSumPayment;
  let totalInterest = 0;
  let months = 0;
  
  let additionalPayment = inputs.additionalMonthlyPayment;
  if (inputs.biweeklyPayment) {
    additionalPayment += inputs.monthlyPayment / 24;
  }
  
  switch (inputs.extraPaymentFrequency) {
    case 'quarterly':
      additionalPayment = additionalPayment * 3;
      break;
    case 'annually':
      additionalPayment = additionalPayment * 12;
      break;
    case 'one-time':
      additionalPayment = 0;
      break;
  }
  
  const totalMonthlyPayment = inputs.monthlyPayment + additionalPayment;
  
  while (balance > 0 && months < inputs.yearsRemaining * 12) {
    const interest = balance * monthlyRate;
    const principal = totalMonthlyPayment - interest;
    balance -= principal;
    totalInterest += interest;
    months++;
  }
  
  return totalInterest;
}

/**
 * Calculate time saved in years
 */
function calculateTimeSaved(yearsRemaining: number, acceleratedPayoffDate: string): number {
  const currentDate = new Date();
  const payoffDate = new Date(acceleratedPayoffDate);
  const acceleratedYears = (payoffDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, yearsRemaining - acceleratedYears);
}

/**
 * Calculate total cost savings
 */
function calculateTotalCostSavings(inputs: MortgagePayoffInputs, interestSaved: number): number {
  const penaltyCost = inputs.prepaymentPenalty ? inputs.penaltyAmount : 0;
  return interestSaved - penaltyCost;
}

/**
 * Calculate monthly payment increase
 */
function calculateMonthlyPaymentIncrease(inputs: MortgagePayoffInputs): number {
  let increase = inputs.additionalMonthlyPayment;
  if (inputs.biweeklyPayment) {
    increase += inputs.monthlyPayment / 24;
  }
  return increase;
}

/**
 * Calculate opportunity cost
 */
function calculateOpportunityCost(inputs: MortgagePayoffInputs, interestSaved: number): number {
  const afterTaxReturn = inputs.investmentReturn * (1 - inputs.taxRate / 100);
  const yearsToPayoff = inputs.yearsRemaining - calculateTimeSaved(inputs.yearsRemaining, calculateAcceleratedPayoffDate(inputs));
  const opportunityCost = (inputs.additionalMonthlyPayment * 12 * yearsToPayoff) * Math.pow(1 + afterTaxReturn / 100, yearsToPayoff);
  return opportunityCost - interestSaved;
}

/**
 * Generate payoff strategy analysis
 */
function generatePayoffStrategy(inputs: MortgagePayoffInputs, timeSaved: number, interestSaved: number): string {
  const timeSavedPercent = (timeSaved / inputs.yearsRemaining) * 100;
  const interestSavedPercent = (interestSaved / calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining)) * 100;
  
  return `## Payoff Strategy Analysis

### Current Situation
- **Loan Balance**: $${inputs.currentBalance.toLocaleString()}
- **Interest Rate**: ${inputs.interestRate}%
- **Years Remaining**: ${inputs.yearsRemaining} years
- **Monthly Payment**: $${inputs.monthlyPayment.toLocaleString()}

### Accelerated Payoff Impact
- **Time Saved**: ${timeSaved.toFixed(1)} years (${timeSavedPercent.toFixed(1)}% reduction)
- **Interest Saved**: $${interestSaved.toLocaleString()} (${interestSavedPercent.toFixed(1)}% reduction)
- **Additional Monthly Payment**: $${calculateMonthlyPaymentIncrease(inputs).toLocaleString()}

### Strategy Effectiveness
${timeSavedPercent > 20 ? '**High Impact**: Significant time and interest savings' :
  timeSavedPercent > 10 ? '**Moderate Impact**: Noticeable time and interest savings' :
  '**Low Impact**: Minimal time and interest savings'}

### Recommended Approach
Based on your payoff goal (${inputs.payoffGoal}), the accelerated payment strategy provides ${timeSavedPercent > 15 ? 'excellent' : timeSavedPercent > 8 ? 'good' : 'modest'} benefits for your situation.`;
}

/**
 * Generate refinance analysis
 */
function generateRefinanceAnalysis(inputs: MortgagePayoffInputs, interestSaved: number): string {
  const rateDifference = inputs.interestRate - inputs.refinanceRate;
  const refinanceSavings = calculateRefinanceSavings(inputs);
  const breakEvenMonths = inputs.refinanceCosts / (refinanceSavings / 12);
  
  return `## Refinance Analysis

### Current vs. Refinance Rates
- **Current Rate**: ${inputs.interestRate}%
- **Available Refinance Rate**: ${inputs.refinanceRate}%
- **Rate Difference**: ${rateDifference.toFixed(2)}%

### Refinance Benefits
- **Monthly Payment Savings**: $${(refinanceSavings / 12).toFixed(0)}
- **Total Interest Savings**: $${refinanceSavings.toLocaleString()}
- **Break-even Period**: ${breakEvenMonths.toFixed(1)} months

### Comparison with Payoff Strategy
- **Payoff Strategy Savings**: $${interestSaved.toLocaleString()}
- **Refinance Strategy Savings**: $${refinanceSavings.toLocaleString()}
- **Combined Strategy**: Consider refinancing first, then accelerating payments

### Recommendation
${rateDifference > 1 ? 
  '**Refinance First**: Significant rate reduction makes refinancing highly beneficial' :
  rateDifference > 0.5 ?
  '**Consider Refinancing**: Moderate rate reduction may be worthwhile' :
  '**Focus on Payoff**: Rate difference is minimal, prioritize payoff strategy'}`;
}

/**
 * Calculate refinance savings
 */
function calculateRefinanceSavings(inputs: MortgagePayoffInputs): number {
  const currentInterest = calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining);
  const refinanceInterest = calculateTotalInterest(inputs.currentBalance, inputs.refinanceRate, inputs.yearsRemaining);
  return currentInterest - refinanceInterest - inputs.refinanceCosts;
}

/**
 * Generate investment comparison
 */
function generateInvestmentComparison(inputs: MortgagePayoffInputs, interestSaved: number, opportunityCost: number): string {
  const afterTaxReturn = inputs.investmentReturn * (1 - inputs.taxRate / 100);
  const mortgageRate = inputs.interestRate;
  
  return `## Investment vs. Payoff Comparison

### Investment Strategy
- **Expected Return**: ${inputs.investmentReturn}% annually
- **After-tax Return**: ${afterTaxReturn.toFixed(2)}% annually
- **Opportunity Cost**: $${opportunityCost.toLocaleString()}

### Payoff Strategy
- **Mortgage Rate**: ${mortgageRate}% annually
- **Interest Saved**: $${interestSaved.toLocaleString()}
- **Net Benefit**: $${(interestSaved - opportunityCost).toLocaleString()}

### Break-even Analysis
${afterTaxReturn > mortgageRate ? 
  '**Investment Favored**: After-tax return exceeds mortgage rate' :
  afterTaxReturn < mortgageRate ?
  '**Payoff Favored**: Mortgage rate exceeds after-tax return' :
  '**Neutral**: Returns are approximately equal'}

### Risk Considerations
- **Investment Risk**: Market volatility and potential losses
- **Payoff Risk**: Reduced liquidity and emergency fund access
- **Recommendation**: ${afterTaxReturn > mortgageRate + 2 ? 'Consider investment strategy' : 'Payoff strategy provides guaranteed return'}`
}

/**
 * Generate cash flow impact analysis
 */
function generateCashFlowImpact(inputs: MortgagePayoffInputs, monthlyPaymentIncrease: number): string {
  const monthlyIncome = inputs.annualIncome / 12;
  const paymentRatio = (inputs.monthlyPayment + monthlyPaymentIncrease) / monthlyIncome;
  
  return `## Cash Flow Impact Analysis

### Current Cash Flow
- **Monthly Income**: $${monthlyIncome.toLocaleString()}
- **Current Payment**: $${inputs.monthlyPayment.toLocaleString()}
- **Payment-to-Income Ratio**: ${((inputs.monthlyPayment / monthlyIncome) * 100).toFixed(1)}%

### Accelerated Payment Impact
- **New Payment**: $${(inputs.monthlyPayment + monthlyPaymentIncrease).toLocaleString()}
- **Payment Increase**: $${monthlyPaymentIncrease.toLocaleString()}
- **New Payment-to-Income Ratio**: ${(paymentRatio * 100).toFixed(1)}%

### Cash Flow Assessment
${paymentRatio < 0.25 ? '**Excellent**: Very manageable payment increase' :
  paymentRatio < 0.35 ? '**Good**: Reasonable payment increase' :
  paymentRatio < 0.45 ? '**Moderate**: Manageable but requires budgeting' :
  '**High**: Significant impact on cash flow, consider smaller increase'}

### Emergency Fund Impact
- **Current Emergency Fund**: $${inputs.emergencyFund.toLocaleString()}
- **Months of Coverage**: ${(inputs.emergencyFund / (inputs.monthlyPayment + monthlyPaymentIncrease)).toFixed(1)} months
- **Recommendation**: ${inputs.emergencyFund > (inputs.monthlyPayment + monthlyPaymentIncrease) * 6 ? 'Adequate emergency fund' : 'Consider building emergency fund first'}`
}

/**
 * Generate tax implications
 */
function generateTaxImplications(inputs: MortgagePayoffInputs, interestSaved: number): string {
  const annualInterestDeduction = (calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining) / inputs.yearsRemaining);
  const taxSavingsLost = annualInterestDeduction * (inputs.taxRate / 100);
  
  return `## Tax Implications

### Current Tax Benefits
- **Annual Interest Deduction**: $${annualInterestDeduction.toLocaleString()}
- **Tax Savings**: $${taxSavingsLost.toLocaleString()} annually
- **Effective Interest Rate**: ${(inputs.interestRate * (1 - inputs.taxRate / 100)).toFixed(2)}%

### Accelerated Payoff Impact
- **Reduced Interest Deduction**: $${(interestSaved / inputs.yearsRemaining).toLocaleString()} annually
- **Tax Savings Lost**: $${(taxSavingsLost * (interestSaved / (annualInterestDeduction * inputs.yearsRemaining))).toLocaleString()} annually
- **Net Benefit**: $${(interestSaved - (taxSavingsLost * (interestSaved / (annualInterestDeduction * inputs.yearsRemaining)))).toLocaleString()}

### Tax Considerations
- **Standard Deduction**: Consider if you itemize deductions
- **State Taxes**: ${inputs.state} may have different mortgage interest treatment
- **Alternative Minimum Tax**: May affect deduction benefits

### Recommendation
The tax implications reduce the net benefit by approximately ${((taxSavingsLost * (interestSaved / (annualInterestDeduction * inputs.yearsRemaining))) / interestSaved * 100).toFixed(1)}%, but the payoff strategy remains beneficial.`
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: MortgagePayoffInputs): string {
  const risks = [];
  
  if (inputs.emergencyFund < inputs.monthlyPayment * 3) {
    risks.push('**Low Emergency Fund**: Insufficient emergency savings');
  }
  
  if (inputs.otherDebts > inputs.annualIncome * 0.4) {
    risks.push('**High Debt Load**: Significant other debts may be higher priority');
  }
  
  if (inputs.additionalMonthlyPayment > inputs.annualIncome * 0.1) {
    risks.push('**High Payment Increase**: Large increase may strain cash flow');
  }
  
  return `## Risk Assessment

### Identified Risks
${risks.length > 0 ? risks.join('\n') : '- No significant risks identified'}

### Risk Mitigation Strategies
1. **Emergency Fund**: Maintain 3-6 months of expenses
2. **Debt Priority**: Consider paying higher-interest debts first
3. **Gradual Increase**: Start with smaller payment increases
4. **Flexibility**: Ensure payments can be reduced if needed

### Risk Level
${risks.length === 0 ? '**Low Risk**: Strategy appears safe to implement' :
  risks.length === 1 ? '**Moderate Risk**: Address identified risk before proceeding' :
  '**High Risk**: Multiple concerns should be addressed first'}

### Recommendations
${risks.length > 0 ? 
  'Address the identified risks before implementing the payoff strategy' :
  'The payoff strategy appears appropriate for your financial situation'}`
}

/**
 * Generate break-even analysis
 */
function generateBreakEvenAnalysis(inputs: MortgagePayoffInputs, interestSaved: number, opportunityCost: number): string {
  const netBenefit = interestSaved - opportunityCost;
  const breakEvenYears = inputs.additionalMonthlyPayment > 0 ? 
    (inputs.additionalMonthlyPayment * 12) / (netBenefit / inputs.yearsRemaining) : 0;
  
  return `## Break-Even Analysis

### Cost-Benefit Summary
- **Interest Saved**: $${interestSaved.toLocaleString()}
- **Opportunity Cost**: $${opportunityCost.toLocaleString()}
- **Net Benefit**: $${netBenefit.toLocaleString()}

### Break-Even Timeline
- **Additional Payments**: $${(inputs.additionalMonthlyPayment * 12).toLocaleString()}/year
- **Annual Net Benefit**: $${(netBenefit / inputs.yearsRemaining).toLocaleString()}
- **Break-even Period**: ${breakEvenYears.toFixed(1)} years

### Analysis
${netBenefit > 0 ? 
  '**Positive Net Benefit**: The payoff strategy provides financial benefits' :
  '**Negative Net Benefit**: Consider investment strategy instead'}

${breakEvenYears < 5 ? 
  '**Quick Break-even**: Strategy pays for itself relatively quickly' :
  breakEvenYears < 10 ?
  '**Moderate Break-even**: Reasonable timeline for benefits' :
  '**Long Break-even**: Consider if long-term benefits align with goals'}`
}

/**
 * Generate scenario comparison
 */
function generateScenarioComparison(inputs: MortgagePayoffInputs, timeSaved: number, interestSaved: number): string {
  return `## Scenario Comparison

### Scenario 1: Standard Payments
- **Payoff Date**: ${calculateStandardPayoffDate(inputs)}
- **Total Interest**: $${calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining).toLocaleString()}
- **Monthly Payment**: $${inputs.monthlyPayment.toLocaleString()}

### Scenario 2: Accelerated Payments
- **Payoff Date**: ${calculateAcceleratedPayoffDate(inputs)}
- **Total Interest**: $${(calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining) - interestSaved).toLocaleString()}
- **Monthly Payment**: $${(inputs.monthlyPayment + calculateMonthlyPaymentIncrease(inputs)).toLocaleString()}
- **Time Saved**: ${timeSaved.toFixed(1)} years
- **Interest Saved**: $${interestSaved.toLocaleString()}

### Scenario 3: Refinance + Payoff
- **Refinance Savings**: $${calculateRefinanceSavings(inputs).toLocaleString()}
- **Combined Savings**: $${(interestSaved + calculateRefinanceSavings(inputs)).toLocaleString()}
- **Strategy**: Refinance first, then accelerate payments

### Recommendation
${calculateRefinanceSavings(inputs) > interestSaved * 0.5 ? 
  'Consider refinancing first, then implementing payoff strategy' :
  'Focus on payoff strategy, refinancing benefits are minimal'}`
}

/**
 * Generate recommendations
 */
function generateRecommendations(inputs: MortgagePayoffInputs, timeSaved: number, interestSaved: number, opportunityCost: number): string {
  const recommendations = [];
  
  if (calculateRefinanceSavings(inputs) > interestSaved * 0.3) {
    recommendations.push('**Refinance First**: Consider refinancing to lower rate before accelerating payments');
  }
  
  if (inputs.emergencyFund < inputs.monthlyPayment * 6) {
    recommendations.push('**Build Emergency Fund**: Ensure 6 months of expenses before accelerating payments');
  }
  
  if (inputs.otherDebts > inputs.annualIncome * 0.3) {
    recommendations.push('**Address Other Debts**: Consider paying higher-interest debts first');
  }
  
  if (opportunityCost > interestSaved * 0.5) {
    recommendations.push('**Consider Investment**: Investment returns may exceed mortgage savings');
  }
  
  recommendations.push('**Start Small**: Begin with smaller payment increases and adjust as comfortable');
  recommendations.push('**Monitor Progress**: Regularly review payoff progress and adjust strategy');
  
  return `## Recommendations

### Priority Actions
${recommendations.join('\n')}

### Implementation Strategy
1. **Immediate**: ${calculateRefinanceSavings(inputs) > interestSaved * 0.3 ? 'Explore refinancing options' : 'Begin with small payment increases'}
2. **Short-term**: Build emergency fund to 6 months of expenses
3. **Medium-term**: Gradually increase payment amounts
4. **Long-term**: Monitor and adjust strategy based on financial changes

### Success Metrics
- **Time to Payoff**: Target ${calculateAcceleratedPayoffDate(inputs)}
- **Interest Savings**: Achieve $${interestSaved.toLocaleString()} in savings
- **Cash Flow**: Maintain comfortable monthly budget`
}

/**
 * Generate implementation plan
 */
function generateImplementationPlan(inputs: MortgagePayoffInputs): string {
  return `## Implementation Plan

### Phase 1: Preparation (Months 1-2)
1. **Assess Financial Situation**
   - Review emergency fund adequacy
   - Evaluate other debt priorities
   - Confirm refinancing opportunities

2. **Set Up Infrastructure**
   - Contact lender about prepayment policies
   - Set up automatic payment increases
   - Create tracking system for progress

### Phase 2: Initial Implementation (Months 3-6)
1. **Start Small**
   - Begin with $${Math.min(inputs.additionalMonthlyPayment, 100).toLocaleString()}/month increase
   - Monitor cash flow impact
   - Adjust as needed

2. **Build Momentum**
   - Gradually increase payment amounts
   - Apply windfalls to principal
   - Track progress monthly

### Phase 3: Optimization (Months 7-12)
1. **Evaluate and Adjust**
   - Review strategy effectiveness
   - Consider refinancing if rates improve
   - Adjust payment amounts based on comfort

2. **Scale Up**
   - Increase payment amounts as comfortable
   - Apply bonuses and tax refunds
   - Consider biweekly payments

### Phase 4: Maintenance (Ongoing)
1. **Monitor Progress**
   - Track payoff timeline
   - Review strategy quarterly
   - Adjust for life changes

2. **Stay Motivated**
   - Celebrate milestones
   - Visualize debt-free future
   - Share progress with family`
}

/**
 * Generate milestone timeline
 */
function generateMilestoneTimeline(inputs: MortgagePayoffInputs, acceleratedPayoffDate: string): string {
  const currentDate = new Date();
  const payoffDate = new Date(acceleratedPayoffDate);
  const totalMonths = Math.ceil((payoffDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  
  const milestones = [];
  const quarterPoints = [0.25, 0.5, 0.75, 1.0];
  
  quarterPoints.forEach((quarter, index) => {
    const milestoneMonths = Math.floor(totalMonths * quarter);
    const milestoneDate = new Date(currentDate);
    milestoneDate.setMonth(milestoneDate.getMonth() + milestoneMonths);
    const milestoneBalance = inputs.currentBalance * (1 - quarter);
    
    milestones.push(`**${(quarter * 100).toFixed(0)}% Complete** (${milestoneDate.toLocaleDateString()}): $${milestoneBalance.toLocaleString()} remaining`);
  });
  
  return `## Milestone Timeline

### Payoff Progress Milestones
${milestones.join('\n')}

### Key Dates
- **Start Date**: ${currentDate.toLocaleDateString()}
- **Target Payoff**: ${payoffDate.toLocaleDateString()}
- **Total Duration**: ${totalMonths} months

### Motivation Tips
- **25% Milestone**: Celebrate first quarter completion
- **50% Milestone**: You're halfway there!
- **75% Milestone**: Final stretch begins
- **100% Milestone**: Debt-free celebration!

### Progress Tracking
- Monitor balance monthly
- Update payoff timeline quarterly
- Adjust strategy as needed
- Celebrate each milestone achieved`
}

/**
 * Generate financial impact analysis
 */
function generateFinancialImpact(inputs: MortgagePayoffInputs, interestSaved: number, opportunityCost: number): string {
  const netBenefit = interestSaved - opportunityCost;
  const monthlyBenefit = netBenefit / (inputs.yearsRemaining * 12);
  
  return `## Financial Impact Analysis

### Overall Financial Impact
- **Total Interest Saved**: $${interestSaved.toLocaleString()}
- **Opportunity Cost**: $${opportunityCost.toLocaleString()}
- **Net Financial Benefit**: $${netBenefit.toLocaleString()}

### Monthly Impact
- **Additional Payment**: $${calculateMonthlyPaymentIncrease(inputs).toLocaleString()}/month
- **Monthly Benefit**: $${monthlyBenefit.toLocaleString()}/month
- **Net Monthly Impact**: $${(monthlyBenefit - calculateMonthlyPaymentIncrease(inputs)).toLocaleString()}/month

### Long-term Benefits
- **Retirement Impact**: Additional $${(netBenefit * Math.pow(1 + inputs.investmentReturn / 100, 20)).toLocaleString()} in 20 years
- **Financial Freedom**: Achieved ${calculateTimeSaved(inputs.yearsRemaining, calculateAcceleratedPayoffDate(inputs)).toFixed(1)} years earlier
- **Reduced Risk**: Lower debt burden and improved financial security

### Wealth Building
- **Immediate**: Reduced debt burden
- **Short-term**: Improved cash flow after payoff
- **Long-term**: Enhanced wealth accumulation potential

### Recommendation
The payoff strategy provides a net benefit of $${netBenefit.toLocaleString()} and accelerates financial freedom by ${calculateTimeSaved(inputs.yearsRemaining, calculateAcceleratedPayoffDate(inputs)).toFixed(1)} years.`
}

/**
 * Generate next steps
 */
function generateNextSteps(inputs: MortgagePayoffInputs, recommendations: string): string {
  return `## Next Steps

### Immediate Actions (This Week)
1. **Contact Your Lender**
   - Confirm prepayment policies
   - Verify payment application to principal
   - Set up automatic payment increases

2. **Review Financial Plan**
   - Assess emergency fund adequacy
   - Evaluate other debt priorities
   - Confirm refinancing opportunities

### Short-term Actions (Next Month)
1. **Begin Implementation**
   - Start with small payment increase
   - Set up automatic payments
   - Create progress tracking system

2. **Monitor and Adjust**
   - Track cash flow impact
   - Adjust payment amounts as needed
   - Review strategy effectiveness

### Medium-term Actions (Next 6 Months)
1. **Optimize Strategy**
   - Evaluate refinancing options
   - Increase payment amounts gradually
   - Apply windfalls to principal

2. **Build Momentum**
   - Celebrate milestones
   - Share progress with family
   - Stay motivated and focused

### Long-term Actions (Next Year)
1. **Scale Up**
   - Increase payment amounts as comfortable
   - Consider biweekly payments
   - Apply bonuses and tax refunds

2. **Review and Adjust**
   - Assess strategy effectiveness
   - Adjust for life changes
   - Plan for post-payoff goals

### Success Metrics
- **Timeline**: Achieve payoff by ${calculateAcceleratedPayoffDate(inputs)}
- **Savings**: Save $${(calculateTotalInterest(inputs.currentBalance, inputs.interestRate, inputs.yearsRemaining) - calculateAcceleratedTotalInterest(inputs)).toLocaleString()} in interest
- **Freedom**: Gain ${calculateTimeSaved(inputs.yearsRemaining, calculateAcceleratedPayoffDate(inputs)).toFixed(1)} years of financial freedom

**Remember**: Every extra payment brings you closer to financial freedom. Stay consistent and celebrate your progress!`
}

/**
 * Generate comprehensive mortgage payoff analysis report
 */
export function generateMortgagePayoffAnalysis(inputs: MortgagePayoffInputs, outputs: MortgagePayoffOutputs): string {
  return `# Mortgage Payoff Strategy Analysis Report

## Executive Summary
This analysis evaluates mortgage payoff strategies to help you pay off your mortgage faster while optimizing for your financial goals and situation.

### Key Findings
- **Standard Payoff Date**: ${outputs.standardPayoffDate}
- **Accelerated Payoff Date**: ${outputs.acceleratedPayoffDate}
- **Time Saved**: ${outputs.timeSaved.toFixed(1)} years
- **Interest Saved**: $${outputs.interestSaved.toLocaleString()}
- **Net Benefit**: $${outputs.totalCostSavings.toLocaleString()}

### Primary Recommendation
${outputs.totalCostSavings > 0 ? 
  '**Accelerated Payoff Strategy** is recommended due to significant interest savings and faster debt freedom.' :
  '**Consider Alternative Strategies** as the payoff strategy may not provide optimal returns for your situation.'
}

---

${outputs.payoffStrategy}

---

${outputs.refinanceAnalysis}

---

${outputs.investmentComparison}

---

${outputs.cashFlowImpact}

---

${outputs.taxImplications}

---

${outputs.riskAssessment}

---

${outputs.breakEvenAnalysis}

---

${outputs.scenarioComparison}

---

${outputs.recommendations}

---

${outputs.implementationPlan}

---

${outputs.milestoneTimeline}

---

${outputs.financialImpact}

---

${outputs.nextSteps}

---

*This analysis is for informational purposes only. Consult with a financial advisor for personalized advice and to develop a comprehensive financial plan.*`;
}
