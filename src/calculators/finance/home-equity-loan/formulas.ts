import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Helper function to calculate monthly loan payment
function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Helper function to calculate feasibility score
function calculateFeasibilityScore(
  currentLTV: number,
  proposedCLTV: number,
  monthlyPayment: number,
  monthlyIncome: number,
  creditScore: number,
  debtToIncomeRatio: number
): number {
  let score = 0;

  // LTV factor
  if (currentLTV <= 60) score += 25;
  else if (currentLTV <= 70) score += 20;
  else if (currentLTV <= 80) score += 15;
  else if (currentLTV <= 85) score += 10;

  // CLTV factor
  if (proposedCLTV <= 70) score += 25;
  else if (proposedCLTV <= 80) score += 20;
  else if (proposedCLTV <= 85) score += 15;
  else if (proposedCLTV <= 90) score += 10;

  // Payment-to-income factor
  if (monthlyIncome > 0) {
    const paymentRatio = (monthlyPayment / monthlyIncome) * 100;
    if (paymentRatio <= 10) score += 25;
    else if (paymentRatio <= 15) score += 20;
    else if (paymentRatio <= 20) score += 15;
    else if (paymentRatio <= 25) score += 10;
  }

  // Credit score factor
  if (creditScore >= 750) score += 15;
  else if (creditScore >= 700) score += 12;
  else if (creditScore >= 650) score += 10;
  else if (creditScore >= 600) score += 5;

  // DTI factor
  if (debtToIncomeRatio <= 30) score += 10;
  else if (debtToIncomeRatio <= 40) score += 8;
  else if (debtToIncomeRatio <= 50) score += 5;

  return Math.min(score, 100);
}

// Helper function to calculate risk score
function calculateRiskScore(
  currentLTV: number,
  proposedCLTV: number,
  monthlyPayment: number,
  monthlyIncome: number,
  creditScore: number,
  debtToIncomeRatio: number
): number {
  let riskScore = 0;

  // LTV risk
  if (currentLTV > 80) riskScore += 25;
  else if (currentLTV > 70) riskScore += 15;
  else if (currentLTV > 60) riskScore += 10;

  // CLTV risk
  if (proposedCLTV > 85) riskScore += 25;
  else if (proposedCLTV > 80) riskScore += 15;
  else if (proposedCLTV > 70) riskScore += 10;

  // Payment risk
  if (monthlyIncome > 0) {
    const paymentRatio = (monthlyPayment / monthlyIncome) * 100;
    if (paymentRatio > 25) riskScore += 20;
    else if (paymentRatio > 20) riskScore += 15;
    else if (paymentRatio > 15) riskScore += 10;
  }

  // Credit risk
  if (creditScore < 620) riskScore += 20;
  else if (creditScore < 680) riskScore += 15;
  else if (creditScore < 720) riskScore += 10;

  // DTI risk
  if (debtToIncomeRatio > 50) riskScore += 10;
  else if (debtToIncomeRatio > 40) riskScore += 5;

  return Math.min(riskScore, 100);
}

export function calculateHomeEquityLoan(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const homeValue = inputs.homeValue || 0;
  const currentMortgageBalance = inputs.currentMortgageBalance || 0;
  const loanAmount = inputs.loanAmount || 0;
  const interestRate = inputs.interestRate || 7.5;
  const loanTerm = inputs.loanTerm || 15;
  const maxLTV = inputs.maxLTV || 85;
  const maxCLTV = inputs.maxCLTV || 90;
  const originationFee = inputs.originationFee || 500;
  const appraisalFee = inputs.appraisalFee || 400;
  const titleFees = inputs.titleFees || 800;
  const closingCosts = inputs.closingCosts || 1000;
  const creditScore = inputs.creditScore || 750;
  const debtToIncomeRatio = inputs.debtToIncomeRatio || 35;
  const monthlyIncome = inputs.monthlyIncome || 8000;
  const monthlyDebtPayments = inputs.monthlyDebtPayments || 1500;
  const propertyType = inputs.propertyType || 'single-family';
  const occupancyType = inputs.occupancyType || 'primary-residence';
  const propertyLocation = inputs.propertyLocation || 'suburban';
  const marketType = inputs.marketType || 'stable';
  const loanPurpose = inputs.loanPurpose || 'home-improvement';
  const propertyTaxes = inputs.propertyTaxes || 5000;
  const homeownersInsurance = inputs.homeownersInsurance || 2000;
  const hoaFees = inputs.hoaFees || 200;
  const prepaymentPenalty = inputs.prepaymentPenalty || 2;
  const lateFees = inputs.lateFees || 50;
  const taxRate = inputs.taxRate || 22;
  const inflationRate = inputs.inflationRate || 2.5;

  // Calculate basic metrics
  const availableEquity = homeValue - currentMortgageBalance;
  const currentLTV = (currentMortgageBalance / homeValue) * 100;
  
  // Calculate maximum loan amounts
  const maxLoanByLTV = (homeValue * maxLTV / 100) - currentMortgageBalance;
  const maxLoanByCLTV = (homeValue * maxCLTV / 100) - currentMortgageBalance;
  const maxLoanAmount = Math.min(maxLoanByLTV, maxLoanByCLTV);
  
  // Determine approved loan amount
  const approvedLoanAmount = Math.min(loanAmount, maxLoanAmount);
  const proposedCLTV = ((currentMortgageBalance + approvedLoanAmount) / homeValue) * 100;
  
  // Calculate payments and costs
  const monthlyPayment = calculateMonthlyPayment(approvedLoanAmount, interestRate, loanTerm);
  const totalFees = originationFee + appraisalFee + titleFees + closingCosts;
  const totalInterest = (monthlyPayment * loanTerm * 12) - approvedLoanAmount;
  const totalCost = approvedLoanAmount + totalInterest + totalFees;
  
  // Calculate APR
  const apr = ((Math.pow(totalCost / approvedLoanAmount, 1 / loanTerm)) - 1) * 100;
  
  // Calculate effective rate (after tax benefits)
  const annualInterest = totalInterest / loanTerm;
  const taxBenefits = annualInterest * (taxRate / 100);
  const effectiveRate = apr - (taxBenefits / approvedLoanAmount) * 100;
  
  // Calculate debt service metrics
  const debtServiceCoverage = monthlyIncome / (monthlyPayment + monthlyDebtPayments);
  const paymentToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;
  
  // Calculate break-even months
  const breakEvenMonths = totalFees / (monthlyPayment * 0.1); // Assuming 10% of payment goes to principal initially
  
  // Calculate scores
  const feasibilityScore = calculateFeasibilityScore(
    currentLTV, proposedCLTV, monthlyPayment, monthlyIncome, creditScore, debtToIncomeRatio
  );
  
  const riskScore = calculateRiskScore(
    currentLTV, proposedCLTV, monthlyPayment, monthlyIncome, creditScore, debtToIncomeRatio
  );
  
  // Calculate cash flow impact
  const monthlyCashFlow = monthlyIncome - monthlyPayment - monthlyDebtPayments;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate equity utilization
  const equityUtilization = (approvedLoanAmount / availableEquity) * 100;
  
  // Calculate cost of borrowing
  const costOfBorrowing = (totalCost / approvedLoanAmount - 1) * 100;
  
  // Determine investment grade
  let investmentGrade = 'C';
  if (feasibilityScore >= 80) investmentGrade = 'A';
  else if (feasibilityScore >= 70) investmentGrade = 'B';
  else if (feasibilityScore >= 60) investmentGrade = 'C';
  else if (feasibilityScore >= 50) investmentGrade = 'D';
  else investmentGrade = 'F';
  
  // Determine recommended action
  let recommendedAction = 'Proceed with loan';
  if (feasibilityScore < 50) recommendedAction = 'Consider alternative financing or reduce loan amount';
  else if (feasibilityScore < 70) recommendedAction = 'Proceed with caution and consider improving credit score';
  else if (feasibilityScore < 80) recommendedAction = 'Proceed with loan but monitor debt levels';
  
  // Calculate recommended loan amount (80% of maximum for safety)
  const recommendedLoanAmount = maxLoanAmount * 0.8;
  
  // Calculate liquidity score (simplified)
  const liquidityScore = Math.max(0, 100 - riskScore);
  
  // Calculate inflation hedge score
  const inflationHedgeScore = Math.min(100, Math.max(0, 100 - (inflationRate * 10)));
  
  return {
    availableEquity: Math.round(availableEquity),
    maxLoanAmount: Math.round(maxLoanAmount),
    approvedLoanAmount: Math.round(approvedLoanAmount),
    currentLTV: Math.round(currentLTV * 100) / 100,
    proposedCLTV: Math.round(proposedCLTV * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment),
    totalFees: Math.round(totalFees),
    apr: Math.round(apr * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost),
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    paymentToIncomeRatio: Math.round(paymentToIncomeRatio * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
    taxBenefits: Math.round(taxBenefits),
    inflationHedgeScore,
    liquidityScore,
    riskScore,
    feasibilityScore,
    maxBorrowingAmount: Math.round(maxLoanAmount),
    recommendedLoanAmount: Math.round(recommendedLoanAmount),
    monthlyCashFlow: Math.round(monthlyCashFlow),
    annualCashFlow: Math.round(annualCashFlow),
    equityUtilization: Math.round(equityUtilization * 100) / 100,
    costOfBorrowing: Math.round(costOfBorrowing * 100) / 100,
    investmentGrade,
    recommendedAction,
    homeEquityLoanAnalysis: 'Comprehensive home equity loan analysis completed'
  };
}

export function generateHomeEquityLoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Home Equity Loan Analysis

## Summary
Based on your home equity and financial profile, you can borrow up to **$${outputs.maxLoanAmount.toLocaleString()}** with an approved amount of **$${outputs.approvedLoanAmount.toLocaleString()}**.

## Key Metrics
- **Available Equity:** $${outputs.availableEquity.toLocaleString()}
- **Maximum Loan Amount:** $${outputs.maxLoanAmount.toLocaleString()}
- **Approved Loan Amount:** $${outputs.approvedLoanAmount.toLocaleString()}
- **Monthly Payment:** $${outputs.monthlyPayment.toLocaleString()}
- **Current LTV:** ${outputs.currentLTV}%
- **Proposed CLTV:** ${outputs.proposedCLTV}%
- **APR:** ${outputs.apr}%
- **Feasibility Score:** ${outputs.feasibilityScore}/100
- **Risk Score:** ${outputs.riskScore}/100

## Loan Terms
- **Interest Rate:** ${inputs.interestRate}%
- **Loan Term:** ${inputs.loanTerm} years
- **Total Fees:** $${outputs.totalFees.toLocaleString()}
- **Total Interest:** $${outputs.totalInterest.toLocaleString()}
- **Total Cost:** $${outputs.totalCost.toLocaleString()}

## Financial Impact
- **Monthly Cash Flow Impact:** $${outputs.monthlyCashFlow.toLocaleString()}
- **Payment-to-Income Ratio:** ${outputs.paymentToIncomeRatio}%
- **Debt Service Coverage:** ${outputs.debtServiceCoverage}
- **Break-Even Months:** ${outputs.breakEvenMonths} months
- **Annual Tax Benefits:** $${outputs.taxBenefits.toLocaleString()}

## Assessment
- **Investment Grade:** ${outputs.investmentGrade}
- **Equity Utilization:** ${outputs.equityUtilization}%
- **Cost of Borrowing:** ${outputs.costOfBorrowing}%
- **Liquidity Score:** ${outputs.liquidityScore}/100
- **Inflation Hedge Score:** ${outputs.inflationHedgeScore}/100

## Recommendations
**${outputs.recommendedAction}**

## Next Steps
1. Review your credit score and consider improving it if below 700
2. Compare rates from multiple lenders
3. Consider the impact on your monthly budget
4. Factor in potential property value changes
5. Plan for the break-even period on closing costs`;
}
