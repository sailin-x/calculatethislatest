import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

function calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateTotalInterest(principal: number, monthlyPayment: number, termYears: number): number {
  const totalPayments = monthlyPayment * termYears * 12;
  return totalPayments - principal;
}

function calculateIncomeBasedPayment(annualIncome: number, familySize: number, filingStatus: string, loanType: string): number {
  // 2024 Federal Poverty Guidelines (48 contiguous states)
  const povertyGuidelines = {
    1: 15060, 2: 20340, 3: 25620, 4: 30900, 5: 36180, 6: 41460, 7: 46740, 8: 52020
  };
  
  const povertyLevel = povertyGuidelines[Math.min(familySize, 8)] || (15060 + (familySize - 1) * 5280);
  const discretionaryIncome = Math.max(0, annualIncome - (povertyLevel * 1.5));
  
  let paymentPercentage = 0.1; // 10% for most income-based plans
  
  if (loanType === 'pay-as-you-earn') {
    paymentPercentage = 0.1;
  } else if (loanType === 'revised-pay-as-you-earn') {
    paymentPercentage = 0.1;
  } else if (loanType === 'income-contingent') {
    paymentPercentage = 0.2; // 20% for ICR
  }
  
  return Math.min(discretionaryIncome * paymentPercentage / 12, calculateStandardPayment(annualIncome, 6.8, 10));
}

function calculateStandardPayment(principal: number, rate: number, term: number): number {
  return calculateMonthlyPayment(principal, rate, term);
}

function calculateGraduatedPayment(principal: number, rate: number, term: number): number {
  // Graduated payments start at 50% of standard payment and increase every 2 years
  const standardPayment = calculateStandardPayment(principal, rate, term);
  return standardPayment * 0.5;
}

function calculateExtendedPayment(principal: number, rate: number): number {
  return calculateMonthlyPayment(principal, rate, 25);
}

function calculateAffordabilityScore(monthlyPayment: number, annualIncome: number, otherDebts: number, monthlyExpenses: number): number {
  const monthlyIncome = annualIncome / 12;
  const totalDebtPayments = monthlyPayment + (otherDebts || 0);
  const debtToIncomeRatio = totalDebtPayments / monthlyIncome;
  const remainingIncome = monthlyIncome - totalDebtPayments - (monthlyExpenses || 0);
  
  let score = 100;
  
  // Debt-to-income ratio penalty
  if (debtToIncomeRatio > 0.43) score -= 40;
  else if (debtToIncomeRatio > 0.36) score -= 20;
  else if (debtToIncomeRatio > 0.28) score -= 10;
  
  // Remaining income penalty
  if (remainingIncome < 0) score -= 30;
  else if (remainingIncome < 500) score -= 15;
  else if (remainingIncome < 1000) score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

function calculateRepaymentEfficiency(repaymentStrategy: string, interestRate: number, extraPayment: number): number {
  let efficiency = 50; // Base efficiency
  
  // Strategy efficiency
  switch (repaymentStrategy) {
    case 'aggressive-payoff':
      efficiency += 30;
      break;
    case 'debt-avalanche':
      efficiency += 25;
      break;
    case 'debt-snowball':
      efficiency += 15;
      break;
    case 'minimum-payments':
      efficiency -= 20;
      break;
  }
  
  // Extra payment bonus
  if (extraPayment > 0) {
    efficiency += Math.min(20, extraPayment / 100);
  }
  
  // Interest rate factor
  if (interestRate > 8) efficiency += 10;
  else if (interestRate > 6) efficiency += 5;
  
  return Math.max(0, Math.min(100, efficiency));
}

function calculateRefinanceSavings(
  currentPrincipal: number, 
  currentRate: number, 
  currentTerm: number,
  refinanceRate: number, 
  refinanceTerm: number,
  refinanceFees: number
): number {
  const currentPayment = calculateMonthlyPayment(currentPrincipal, currentRate, currentTerm);
  const currentTotal = currentPayment * currentTerm * 12;
  
  const refinancePayment = calculateMonthlyPayment(currentPrincipal, refinanceRate, refinanceTerm);
  const refinanceTotal = refinancePayment * refinanceTerm * 12 + refinanceFees;
  
  return currentTotal - refinanceTotal;
}

function calculateForgivenessAmount(principal: number, repaymentPlan: string, annualIncome: number): number {
  let forgivenessYears = 25; // Default for most plans
  
  if (repaymentPlan === 'pay-as-you-earn') forgivenessYears = 20;
  else if (repaymentPlan === 'revised-pay-as-you-earn') forgivenessYears = 20;
  else if (repaymentPlan === 'income-based') forgivenessYears = 25;
  else if (repaymentPlan === 'income-contingent') forgivenessYears = 25;
  
  // Simple calculation - in reality, this is much more complex
  const monthlyPayment = calculateIncomeBasedPayment(annualIncome, 1, 'single', repaymentPlan);
  const totalPaid = monthlyPayment * 12 * forgivenessYears;
  
  return Math.max(0, principal - totalPaid);
}

export function calculateStudentLoan(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract and set defaults
  const loanAmount = inputs.loanAmount || 0;
  const interestRate = inputs.interestRate || 0;
  const loanTerm = inputs.loanTerm || 10;
  const loanType = inputs.loanType || 'federal-unsubsidized';
  const gracePeriod = inputs.gracePeriod || 6;
  const repaymentPlan = inputs.repaymentPlan || 'standard';
  const fixedMonthlyPayment = inputs.monthlyPayment;
  
  const annualIncome = inputs.annualIncome || 45000;
  const familySize = inputs.familySize || 1;
  const filingStatus = inputs.filingStatus || 'single';
  const stateOfResidence = inputs.stateOfResidence || 'ca';
  
  const otherDebts = inputs.otherDebts || 0;
  const monthlyExpenses = inputs.monthlyExpenses || 1500;
  const emergencyFund = inputs.emergencyFund || 5000;
  const monthlySavings = inputs.monthlySavings || 500;
  
  const repaymentStrategy = inputs.repaymentStrategy || 'minimum-payments';
  const extraPayment = inputs.extraPayment || 0;
  const lumpSumPayment = inputs.lumpSumPayment || 0;
  
  const refinanceRate = inputs.refinanceRate;
  const refinanceTerm = inputs.refinanceTerm;
  const refinanceFees = inputs.refinanceFees || 0;
  
  // Calculate monthly payment based on repayment plan
  let monthlyPayment = 0;
  
  if (fixedMonthlyPayment) {
    monthlyPayment = fixedMonthlyPayment;
  } else {
    switch (repaymentPlan) {
      case 'standard':
        monthlyPayment = calculateStandardPayment(loanAmount, interestRate, 10);
        break;
      case 'extended':
        monthlyPayment = calculateExtendedPayment(loanAmount, interestRate);
        break;
      case 'graduated':
        monthlyPayment = calculateGraduatedPayment(loanAmount, interestRate, 10);
        break;
      case 'income-based':
      case 'pay-as-you-earn':
      case 'revised-pay-as-you-earn':
      case 'income-contingent':
        monthlyPayment = calculateIncomeBasedPayment(annualIncome, familySize, filingStatus, repaymentPlan);
        break;
      default:
        monthlyPayment = calculateStandardPayment(loanAmount, interestRate, loanTerm);
    }
  }
  
  // Add extra payment
  const totalMonthlyPayment = monthlyPayment + extraPayment;
  
  // Calculate total interest and payments
  const totalInterest = calculateTotalInterest(loanAmount, totalMonthlyPayment, loanTerm);
  const totalPayments = loanAmount + totalInterest;
  
  // Calculate payoff date
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() + gracePeriod);
  const payoffDate = new Date(startDate);
  payoffDate.setFullYear(payoffDate.getFullYear() + loanTerm);
  
  // Calculate amortization schedule
  const amortizationSchedule = [];
  let remainingBalance = loanAmount - lumpSumPayment;
  let totalInterestPaid = 0;
  
  for (let year = 1; year <= loanTerm; year++) {
    const yearlyPayment = totalMonthlyPayment * 12;
    const yearlyInterest = remainingBalance * (interestRate / 100);
    const yearlyPrincipal = yearlyPayment - yearlyInterest;
    
    remainingBalance = Math.max(0, remainingBalance - yearlyPrincipal);
    totalInterestPaid += yearlyInterest;
    
    amortizationSchedule.push({
      year,
      payment: yearlyPayment,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      remainingBalance
    });
  }
  
  // Calculate ratios and scores
  const interestToPrincipalRatio = totalInterest / loanAmount;
  const debtToIncomeRatio = (totalMonthlyPayment + otherDebts) / (annualIncome / 12) * 100;
  const affordabilityScore = calculateAffordabilityScore(totalMonthlyPayment, annualIncome, otherDebts, monthlyExpenses);
  const repaymentEfficiency = calculateRepaymentEfficiency(repaymentStrategy, interestRate, extraPayment);
  
  // Calculate impacts
  const savingsImpact = monthlySavings - totalMonthlyPayment;
  const emergencyFundImpact = emergencyFund - totalMonthlyPayment * 6; // 6 months emergency fund
  
  // Calculate refinance savings
  let refinanceSavings = 0;
  let refinancePayoffDate = '';
  if (refinanceRate && refinanceTerm) {
    refinanceSavings = calculateRefinanceSavings(loanAmount, interestRate, loanTerm, refinanceRate, refinanceTerm, refinanceFees);
    
    const refinanceDate = new Date(startDate);
    refinanceDate.setFullYear(refinanceDate.getFullYear() + refinanceTerm);
    refinancePayoffDate = refinanceDate.toLocaleDateString();
  }
  
  // Calculate income-based payment
  const incomeBasedPayment = calculateIncomeBasedPayment(annualIncome, familySize, filingStatus, 'income-based');
  
  // Calculate forgiveness
  const forgivenessAmount = calculateForgivenessAmount(loanAmount, repaymentPlan, annualIncome);
  const forgivenessDate = new Date(startDate);
  forgivenessDate.setFullYear(forgivenessDate.getFullYear() + (repaymentPlan.includes('pay-as-you-earn') ? 20 : 25));
  
  // Generate repayment plan comparison
  const repaymentPlanComparison = [
    {
      plan: 'Standard (10 years)',
      monthlyPayment: calculateStandardPayment(loanAmount, interestRate, 10),
      totalInterest: calculateTotalInterest(loanAmount, calculateStandardPayment(loanAmount, interestRate, 10), 10),
      term: 10
    },
    {
      plan: 'Extended (25 years)',
      monthlyPayment: calculateExtendedPayment(loanAmount, interestRate),
      totalInterest: calculateTotalInterest(loanAmount, calculateExtendedPayment(loanAmount, interestRate), 25),
      term: 25
    },
    {
      plan: 'Income-Based Repayment',
      monthlyPayment: incomeBasedPayment,
      totalInterest: calculateTotalInterest(loanAmount, incomeBasedPayment, 25),
      term: 25
    }
  ];
  
  // Generate recommendations
  let recommendedStrategy = 'Standard Repayment';
  let keyBenefits = '';
  let keyRisks = '';
  
  if (affordabilityScore < 40) {
    recommendedStrategy = 'Income-Based Repayment';
    keyBenefits = 'Lower monthly payments, potential loan forgiveness, protection during financial hardship';
    keyRisks = 'Longer repayment period, higher total interest, tax implications on forgiven amounts';
  } else if (interestRate > 7) {
    recommendedStrategy = 'Aggressive Payoff';
    keyBenefits = 'Faster debt elimination, significant interest savings, improved credit score';
    keyRisks = 'Higher monthly payments, reduced cash flow, potential impact on other financial goals';
  } else if (refinanceSavings > 5000) {
    recommendedStrategy = 'Refinance';
    keyBenefits = 'Lower interest rate, reduced monthly payments, faster payoff';
    keyRisks = 'Loss of federal loan benefits, potential fees, credit requirements';
  } else {
    recommendedStrategy = 'Standard Repayment';
    keyBenefits = 'Fastest payoff, lowest total interest, predictable payments';
    keyRisks = 'Higher monthly payments, less flexibility during financial hardship';
  }
  
  return {
    monthlyPayment: totalMonthlyPayment,
    totalInterest,
    totalPayments,
    payoffDate: payoffDate.toLocaleDateString(),
    amortizationSchedule,
    interestToPrincipalRatio,
    debtToIncomeRatio,
    affordabilityScore,
    repaymentEfficiency,
    savingsImpact,
    emergencyFundImpact,
    refinanceSavings,
    refinancePayoffDate,
    incomeBasedPayment,
    forgivenessAmount,
    forgivenessDate: forgivenessDate.toLocaleDateString(),
    repaymentPlanComparison,
    recommendedStrategy,
    keyBenefits,
    keyRisks,
    studentLoanAnalysis: generateStudentLoanAnalysis(inputs, {
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      totalPayments,
      payoffDate: payoffDate.toLocaleDateString(),
      amortizationSchedule,
      interestToPrincipalRatio,
      debtToIncomeRatio,
      affordabilityScore,
      repaymentEfficiency,
      savingsImpact,
      emergencyFundImpact,
      refinanceSavings,
      refinancePayoffDate,
      incomeBasedPayment,
      forgivenessAmount,
      forgivenessDate: forgivenessDate.toLocaleDateString(),
      repaymentPlanComparison,
      recommendedStrategy,
      keyBenefits,
      keyRisks
    })
  };
}

export function generateStudentLoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Student Loan Analysis Report

## Summary
**Recommended Strategy: ${outputs.recommendedStrategy}**

This analysis evaluates your student loan repayment options and provides personalized recommendations. Your affordability score is **${outputs.affordabilityScore.toFixed(1)}/100** with a repayment efficiency of **${outputs.repaymentEfficiency.toFixed(1)}%**.

## Loan Overview

### Basic Information
- **Loan Amount:** $${inputs.loanAmount?.toLocaleString()}
- **Interest Rate:** ${inputs.interestRate}%
- **Loan Term:** ${inputs.loanTerm} years
- **Loan Type:** ${inputs.loanType || 'Federal Unsubsidized'}

### Payment Analysis
- **Monthly Payment:** $${outputs.monthlyPayment.toLocaleString()}
- **Total Interest:** $${outputs.totalInterest.toLocaleString()}
- **Total Payments:** $${outputs.totalPayments.toLocaleString()}
- **Payoff Date:** ${outputs.payoffDate}
- **Interest to Principal Ratio:** ${outputs.interestToPrincipalRatio.toFixed(2)}

## Financial Impact

### Debt-to-Income Analysis
- **Debt-to-Income Ratio:** ${outputs.debtToIncomeRatio.toFixed(1)}%
- **Monthly Income:** $${(inputs.annualIncome || 45000 / 12).toLocaleString()}
- **Total Monthly Debt Payments:** $${(outputs.monthlyPayment + (inputs.otherDebts || 0)).toLocaleString()}

### Savings Impact
- **Monthly Savings Impact:** $${outputs.savingsImpact.toLocaleString()}
- **Emergency Fund Impact:** $${outputs.emergencyFundImpact.toLocaleString()}
- **Recommended Emergency Fund:** $${(outputs.monthlyPayment * 6).toLocaleString()}

## Repayment Plan Comparison

| Plan | Monthly Payment | Total Interest | Term |
|------|----------------|----------------|------|
${outputs.repaymentPlanComparison.map(plan => 
  `| ${plan.plan} | $${plan.monthlyPayment.toLocaleString()} | $${plan.totalInterest.toLocaleString()} | ${plan.term} years |`
).join('\n')}

## Income-Based Repayment Analysis

### Income-Based Payment Details
- **Annual Income:** $${inputs.annualIncome?.toLocaleString()}
- **Family Size:** ${inputs.familySize || 1}
- **Filing Status:** ${inputs.filingStatus || 'Single'}
- **Income-Based Payment:** $${outputs.incomeBasedPayment.toLocaleString()}

### Loan Forgiveness Potential
- **Forgiveness Amount:** $${outputs.forgivenessAmount.toLocaleString()}
- **Forgiveness Date:** ${outputs.forgivenessDate}
- **Years to Forgiveness:** ${outputs.forgivenessAmount > 0 ? (repaymentPlan.includes('pay-as-you-earn') ? 20 : 25) : 'N/A'}

## Refinancing Analysis

${outputs.refinanceSavings > 0 ? `
### Refinancing Opportunity
- **Current Rate:** ${inputs.interestRate}%
- **Refinance Rate:** ${inputs.refinanceRate}%
- **Potential Savings:** $${outputs.refinanceSavings.toLocaleString()}
- **New Payoff Date:** ${outputs.refinancePayoffDate}
- **Refinance Fees:** $${inputs.refinanceFees?.toLocaleString()}
` : '### Refinancing
No refinancing opportunity identified with current rates.'}

## Amortization Schedule

| Year | Payment | Principal | Interest | Remaining Balance |
|------|---------|-----------|----------|-------------------|
${outputs.amortizationSchedule.slice(0, 10).map(year => 
  `| ${year.year} | $${year.payment.toLocaleString()} | $${year.principal.toLocaleString()} | $${year.interest.toLocaleString()} | $${year.remainingBalance.toLocaleString()} |`
).join('\n')}
${outputs.amortizationSchedule.length > 10 ? `... | ... | ... | ... | ... |` : ''}

## Key Benefits

${outputs.keyBenefits}

## Key Risks

${outputs.keyRisks}

## Recommendations

### Immediate Actions
1. **Emergency Fund:** Build a 6-month emergency fund of $${(outputs.monthlyPayment * 6).toLocaleString()}
2. **Budget Review:** Ensure monthly budget accommodates $${outputs.monthlyPayment.toLocaleString()} payment
3. **Extra Payments:** Consider additional $${Math.max(50, outputs.monthlyPayment * 0.1).toLocaleString()}/month for faster payoff

### Long-term Strategy
1. **Repayment Plan:** ${outputs.recommendedStrategy}
2. **Refinancing:** ${outputs.refinanceSavings > 5000 ? 'Consider refinancing to save $' + outputs.refinanceSavings.toLocaleString() : 'Monitor refinancing opportunities'}
3. **Forgiveness:** ${outputs.forgivenessAmount > 0 ? 'Track progress toward $' + outputs.forgivenessAmount.toLocaleString() + ' forgiveness' : 'Not applicable for your situation'}

### Financial Planning
1. **Debt-to-Income:** Keep total debt payments below 36% of income
2. **Savings:** Maintain $${inputs.monthlySavings?.toLocaleString() || '500'}/month savings goal
3. **Credit Score:** Make all payments on time to build credit history

## Next Steps

1. **Contact Loan Servicer:** Discuss repayment plan options
2. **Income Certification:** Submit annual income documentation for income-based plans
3. **Refinancing Research:** Compare rates from multiple lenders
4. **Budget Adjustment:** Modify monthly budget to accommodate payments
5. **Emergency Fund:** Prioritize building emergency savings

## Important Considerations

- **Federal Loan Benefits:** Income-based repayment, deferment, and forgiveness options
- **Tax Implications:** Student loan interest may be tax-deductible
- **Credit Impact:** Consistent payments improve credit score
- **Life Changes:** Update repayment plan when income or family size changes
- **Loan Consolidation:** Consider consolidating multiple federal loans

*This analysis is based on current loan terms and assumptions. Actual payments and benefits may vary based on individual circumstances and program changes.*`;
}
