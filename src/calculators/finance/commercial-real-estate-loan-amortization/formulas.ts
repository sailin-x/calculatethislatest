import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Calculate monthly payment using amortization formula
function calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Calculate payment frequency multiplier
function getPaymentFrequencyMultiplier(frequency: string): number {
  switch (frequency) {
    case 'weekly': return 52;
    case 'biweekly': return 26;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'annually': return 1;
    default: return 12;
  }
}

// Calculate total payments
function calculateTotalPayments(monthlyPayment: number, loanTerm: number, balloonPayment: number): number {
  const totalRegularPayments = monthlyPayment * loanTerm * 12;
  return totalRegularPayments + balloonPayment;
}

// Calculate total interest paid
function calculateTotalInterest(loanAmount: number, totalPayments: number): number {
  return totalPayments - loanAmount;
}

// Calculate total principal paid
function calculateTotalPrincipal(loanAmount: number, balloonPayment: number): number {
  return loanAmount - balloonPayment;
}

// Calculate effective interest rate including fees
function calculateEffectiveInterestRate(
  loanAmount: number,
  totalPayments: number,
  originationFee: number,
  closingCosts: number
): number {
  const totalCost = totalPayments + originationFee + closingCosts;
  const effectiveLoanAmount = loanAmount - originationFee - closingCosts;
  
  // Use approximation for effective rate
  const totalInterest = totalCost - effectiveLoanAmount;
  return (totalInterest / effectiveLoanAmount) * 100;
}

// Calculate debt service coverage ratio
function calculateDebtServiceCoverageRatio(annualNOI: number, monthlyPayment: number): number {
  const annualDebtService = monthlyPayment * 12;
  return annualNOI / annualDebtService;
}

// Calculate actual loan-to-value ratio
function calculateActualLoanToValue(loanAmount: number, propertyValue: number): number {
  return (loanAmount / propertyValue) * 100;
}

// Calculate break-even point (when principal payments exceed interest payments)
function calculateBreakEvenPoint(loanAmount: number, interestRate: number, monthlyPayment: number): number {
  const monthlyRate = interestRate / 100 / 12;
  let remainingBalance = loanAmount;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let month = 0;
  
  while (remainingBalance > 0 && month < 360) { // Max 30 years
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment;
    remainingBalance -= principalPayment;
    month++;
    
    // Check if we've reached break-even
    if (totalPrincipalPaid > totalInterestPaid) {
      return month / 12; // Convert to years
    }
  }
  
  return loanAmount / (monthlyPayment * 12); // Fallback calculation
}

// Generate prepayment analysis
function generatePrepaymentAnalysis(prepaymentPenalty: number, balloonPayment: number): string {
  if (prepaymentPenalty === 0) {
    return 'No prepayment penalty - flexible prepayment options available';
  } else if (prepaymentPenalty <= 2) {
    return `${prepaymentPenalty}% prepayment penalty - moderate cost for early payoff`;
  } else {
    return `${prepaymentPenalty}% prepayment penalty - high cost, consider timing of prepayments`;
  }
}

// Generate refinancing analysis
function generateRefinancingAnalysis(
  interestRate: number,
  balloonPayment: number,
  loanTerm: number,
  inflationRate: number
): string {
  const breakEvenRate = interestRate - 1.0; // 1% lower to make refinancing worthwhile
  
  if (balloonPayment > 0) {
    return `Balloon payment of $${balloonPayment.toLocaleString()} requires refinancing or sale in ${loanTerm} years`;
  } else if (interestRate > 7) {
    return `Consider refinancing if rates drop below ${breakEvenRate.toFixed(1)}%`;
  } else {
    return 'Current rate is competitive - refinancing may not be beneficial';
  }
}

// Calculate annual tax benefits
function calculateTaxBenefits(totalInterest: number, loanTerm: number, taxRate: number): number {
  const annualInterest = totalInterest / loanTerm;
  return annualInterest * (taxRate / 100);
}

// Calculate total loan cost
function calculateTotalCost(
  totalPayments: number,
  originationFee: number,
  closingCosts: number
): number {
  return totalPayments + originationFee + closingCosts;
}

// Generate monthly payment breakdown
function generateMonthlyBreakdown(monthlyPayment: number, loanAmount: number, interestRate: number): string {
  const monthlyRate = interestRate / 100 / 12;
  const firstMonthInterest = loanAmount * monthlyRate;
  const firstMonthPrincipal = monthlyPayment - firstMonthInterest;
  
  return `Principal: $${Math.round(firstMonthPrincipal).toLocaleString()}, Interest: $${Math.round(firstMonthInterest).toLocaleString()}`;
}

// Generate loan summary
function generateLoanSummary(
  propertyType: string,
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  balloonPayment: number,
  prepaymentPenalty: number
): string {
  const summary = [];
  
  summary.push(`${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} loan`);
  summary.push(`$${loanAmount.toLocaleString()} at ${interestRate}% for ${loanTerm} years`);
  
  if (balloonPayment > 0) {
    summary.push('with balloon payment');
  } else {
    summary.push('fully amortized');
  }
  
  if (prepaymentPenalty > 0) {
    summary.push(`with ${prepaymentPenalty}% prepayment penalty`);
  } else {
    summary.push('with flexible prepayment options');
  }
  
  return summary.join(' ');
}

// Generate amortization schedule summary
function generateAmortizationSchedule(
  loanTerm: number,
  paymentFrequency: string,
  balloonPayment: number
): string {
  const totalPayments = loanTerm * 12;
  
  if (balloonPayment > 0) {
    return `${totalPayments} payments with balloon payment of $${balloonPayment.toLocaleString()} at end`;
  } else {
    return `${totalPayments} payments with decreasing interest and increasing principal`;
  }
}

export function calculateAmortization(inputs: CalculatorInputs): CalculatorOutputs {
  const loanAmount = inputs.loanAmount as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const paymentFrequency = inputs.paymentFrequency as string;
  const balloonPayment = inputs.balloonPayment as number;
  const prepaymentPenalty = inputs.prepaymentPenalty as number;
  const originationFee = inputs.originationFee as number;
  const closingCosts = inputs.closingCosts as number;
  const propertyValue = inputs.propertyValue as number;
  const loanToValue = inputs.loanToValue as number;
  const debtServiceCoverage = inputs.debtServiceCoverage as number;
  const annualNOI = inputs.annualNOI as number;
  const taxRate = inputs.taxRate as number;
  const inflationRate = inputs.inflationRate as number;
  const appreciationRate = inputs.appreciationRate as number;
  
  // Calculate basic loan metrics
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const totalPayments = calculateTotalPayments(monthlyPayment, loanTerm, balloonPayment);
  const totalInterest = calculateTotalInterest(loanAmount, totalPayments);
  const totalPrincipal = calculateTotalPrincipal(loanAmount, balloonPayment);
  
  // Calculate ratios and metrics
  const interestToPrincipalRatio = totalInterest / totalPrincipal;
  const effectiveInterestRate = calculateEffectiveInterestRate(loanAmount, totalPayments, originationFee, closingCosts);
  const debtServiceCoverageRatio = calculateDebtServiceCoverageRatio(annualNOI, monthlyPayment);
  const actualLoanToValue = calculateActualLoanToValue(loanAmount, propertyValue);
  const breakEvenPoint = calculateBreakEvenPoint(loanAmount, interestRate, monthlyPayment);
  
  // Calculate costs and benefits
  const taxBenefits = calculateTaxBenefits(totalInterest, loanTerm, taxRate);
  const totalCost = calculateTotalCost(totalPayments, originationFee, closingCosts);
  
  // Generate analysis
  const prepaymentAnalysis = generatePrepaymentAnalysis(prepaymentPenalty, balloonPayment);
  const refinancingAnalysis = generateRefinancingAnalysis(interestRate, balloonPayment, loanTerm, inflationRate);
  const monthlyBreakdown = generateMonthlyBreakdown(monthlyPayment, loanAmount, interestRate);
  const loanSummary = generateLoanSummary(
    inputs.propertyType as string,
    loanAmount,
    interestRate,
    loanTerm,
    balloonPayment,
    prepaymentPenalty
  );
  const amortizationSchedule = generateAmortizationSchedule(loanTerm, paymentFrequency, balloonPayment);
  
  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayments: Math.round(totalPayments),
    totalInterest: Math.round(totalInterest),
    totalPrincipal: Math.round(totalPrincipal),
    amortizationSchedule,
    interestToPrincipalRatio: Math.round(interestToPrincipalRatio * 1000) / 1000,
    effectiveInterestRate: Math.round(effectiveInterestRate * 10) / 10,
    debtServiceCoverageRatio: Math.round(debtServiceCoverageRatio * 100) / 100,
    loanToValueRatio: Math.round(actualLoanToValue * 10) / 10,
    breakEvenPoint: Math.round(breakEvenPoint * 10) / 10,
    prepaymentAnalysis,
    refinancingAnalysis,
    taxBenefits: Math.round(taxBenefits),
    totalCost: Math.round(totalCost),
    monthlyBreakdown,
    loanSummary
  };
}

export function generateAmortizationAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType as string;
  const loanAmount = inputs.loanAmount as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const monthlyPayment = outputs.monthlyPayment as number;
  const totalPayments = outputs.totalPayments as number;
  const totalInterest = outputs.totalInterest as number;
  const debtServiceCoverageRatio = outputs.debtServiceCoverageRatio as number;
  const loanToValueRatio = outputs.loanToValueRatio as number;
  
  let analysis = `## Commercial Real Estate Loan Amortization Analysis\n\n`;
  
  analysis += `### Loan Overview\n`;
  analysis += `- **Property Type**: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Loan Amount**: $${loanAmount.toLocaleString()}\n`;
  analysis += `- **Interest Rate**: ${interestRate}%\n`;
  analysis += `- **Loan Term**: ${loanTerm} years\n`;
  analysis += `- **Monthly Payment**: $${monthlyPayment.toLocaleString()}\n\n`;
  
  analysis += `### Payment Summary\n`;
  analysis += `- **Total Payments**: $${totalPayments.toLocaleString()}\n`;
  analysis += `- **Total Interest**: $${totalInterest.toLocaleString()}\n`;
  analysis += `- **Total Principal**: $${(outputs.totalPrincipal as number).toLocaleString()}\n`;
  analysis += `- **Interest to Principal Ratio**: ${outputs.interestToPrincipalRatio as number}\n\n`;
  
  analysis += `### Loan Metrics\n`;
  analysis += `- **Effective Interest Rate**: ${outputs.effectiveInterestRate as number}%\n`;
  analysis += `- **Debt Service Coverage**: ${debtServiceCoverageRatio}\n`;
  analysis += `- **Loan-to-Value Ratio**: ${loanToValueRatio}%\n`;
  analysis += `- **Break-Even Point**: ${outputs.breakEvenPoint as number} years\n\n`;
  
  analysis += `### Financial Analysis\n`;
  analysis += `- **Annual Tax Benefits**: $${(outputs.taxBenefits as number).toLocaleString()}\n`;
  analysis += `- **Total Loan Cost**: $${(outputs.totalCost as number).toLocaleString()}\n`;
  analysis += `- **Monthly Breakdown**: ${outputs.monthlyBreakdown as string}\n\n`;
  
  analysis += `### Loan Features\n`;
  analysis += `- **Amortization**: ${outputs.amortizationSchedule as string}\n`;
  analysis += `- **Prepayment**: ${outputs.prepaymentAnalysis as string}\n`;
  analysis += `- **Refinancing**: ${outputs.refinancingAnalysis as string}\n\n`;
  
  analysis += `### Performance Assessment\n`;
  if (debtServiceCoverageRatio >= 1.25) {
    analysis += `**Strong Debt Service Coverage**: The property generates sufficient income to cover debt payments.\n`;
  } else if (debtServiceCoverageRatio >= 1.0) {
    analysis += `**Adequate Debt Service Coverage**: The property barely covers debt payments.\n`;
  } else {
    analysis += `**Weak Debt Service Coverage**: The property does not generate enough income to cover debt payments.\n`;
  }
  
  if (loanToValueRatio <= 75) {
    analysis += `**Conservative LTV**: Low loan-to-value ratio provides good equity cushion.\n`;
  } else if (loanToValueRatio <= 85) {
    analysis += `**Standard LTV**: Typical commercial loan terms.\n`;
  } else {
    analysis += `**High LTV**: Higher risk with minimal equity cushion.\n`;
  }
  
  analysis += `\n### Summary\n`;
  analysis += `${outputs.loanSummary as string}\n`;
  
  return analysis;
}
