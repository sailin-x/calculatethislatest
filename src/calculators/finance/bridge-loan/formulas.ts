interface BridgeLoanMetrics {
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  netProceeds: number;
  monthlyCashFlow: number;
  breakEvenTime: number;
  equityUtilization: number;
  debtToIncomeRatio: number;
  loanToValueRatio: number;
  totalFees: number;
}

interface ComparisonMetrics {
  costSavings: number;
  riskAssessment: string;
  recommendation: string;
  alternativeCost: number;
  breakevenAnalysis: {
    timeToBreakeven: number;
    totalSavings: number;
    riskLevel: string;
  };
}

interface PaymentSchedule {
  summary: string;
  payments: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }>;
}

/**
 * Calculate bridge loan financial metrics
 */
export function calculateBridgeLoan(inputs: Record<string, any>): BridgeLoanMetrics {
  const {
    currentHomeValue,
    currentMortgageBalance,
    bridgeLoanAmount,
    bridgeLoanRate,
    bridgeLoanTerm,
    expectedSalePrice,
    expectedSaleTime,
    closingCosts = 0,
    originationFee = 0,
    monthlyRentalIncome = 0,
    monthlyRentalExpenses = 0
  } = inputs;

  // Convert annual interest rate to monthly
  const monthlyInterestRate = bridgeLoanRate / 100 / 12;
  
  // Calculate monthly payment using standard loan formula
  const monthlyPayment = calculateMonthlyPayment(bridgeLoanAmount, monthlyInterestRate, bridgeLoanTerm);
  
  // Calculate total interest paid
  const totalInterest = (monthlyPayment * bridgeLoanTerm) - bridgeLoanAmount;
  
  // Calculate fees
  const originationFeeAmount = bridgeLoanAmount * (originationFee / 100);
  const totalFees = closingCosts + originationFeeAmount;
  
  // Calculate total cost
  const totalCost = totalInterest + totalFees;
  
  // Calculate net proceeds from sale
  const bridgeLoanBalanceAtSale = calculateRemainingBalance(bridgeLoanAmount, monthlyInterestRate, monthlyPayment, expectedSaleTime);
  const netProceeds = expectedSalePrice - currentMortgageBalance - bridgeLoanBalanceAtSale;
  
  // Calculate monthly cash flow
  const monthlyCashFlow = monthlyRentalIncome - monthlyRentalExpenses - monthlyPayment;
  
  // Calculate break-even time
  const breakEvenTime = calculateBreakEvenTime(totalCost, monthlyCashFlow, monthlyRentalIncome);
  
  // Calculate equity utilization
  const availableEquity = currentHomeValue - currentMortgageBalance;
  const equityUtilization = (bridgeLoanAmount / availableEquity) * 100;
  
  // Calculate debt-to-income ratio (assuming $100k annual income for calculation)
  const annualIncome = 100000; // Default assumption
  const monthlyIncome = annualIncome / 12;
  const totalMonthlyDebt = monthlyPayment + (currentMortgageBalance * 0.005); // Approximate current mortgage payment
  const debtToIncomeRatio = (totalMonthlyDebt / monthlyIncome) * 100;
  
  // Calculate loan-to-value ratio
  const loanToValueRatio = (bridgeLoanAmount / currentHomeValue) * 100;
  
  return {
    monthlyPayment,
    totalCost,
    totalInterest,
    netProceeds,
    monthlyCashFlow,
    breakEvenTime,
    equityUtilization,
    debtToIncomeRatio,
    loanToValueRatio,
    totalFees
  };
}

/**
 * Calculate monthly payment using standard loan formula
 */
function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, totalPayments);
  return principal * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Calculate remaining balance after specified number of payments
 */
function calculateRemainingBalance(principal: number, monthlyRate: number, monthlyPayment: number, paymentsMade: number): number {
  if (monthlyRate === 0) {
    return principal - (monthlyPayment * paymentsMade);
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, paymentsMade);
  return principal * rateFactor - monthlyPayment * (rateFactor - 1) / monthlyRate;
}

/**
 * Calculate break-even time
 */
function calculateBreakEvenTime(totalCost: number, monthlyCashFlow: number, monthlyRentalIncome: number): number {
  if (monthlyCashFlow >= 0) {
    // Positive cash flow - break even through rental income
    return totalCost / monthlyCashFlow;
  } else {
    // Negative cash flow - break even through sale proceeds
    return totalCost / Math.abs(monthlyCashFlow);
  }
}

/**
 * Calculate comparison with alternative financing
 */
export function calculateComparison(inputs: Record<string, any>, bridgeMetrics: BridgeLoanMetrics): ComparisonMetrics {
  const { alternativeFinancingRate = 6.5, bridgeLoanAmount, bridgeLoanTerm } = inputs;
  
  // Calculate alternative financing cost (HELOC, etc.)
  const alternativeMonthlyRate = alternativeFinancingRate / 100 / 12;
  const alternativeMonthlyPayment = calculateMonthlyPayment(bridgeLoanAmount, alternativeMonthlyRate, bridgeLoanTerm);
  const alternativeTotalInterest = (alternativeMonthlyPayment * bridgeLoanTerm) - bridgeLoanAmount;
  const alternativeCost = alternativeTotalInterest;
  
  // Calculate cost savings
  const costSavings = alternativeCost - bridgeMetrics.totalCost;
  
  // Risk assessment
  const riskAssessment = generateRiskAssessment(inputs, bridgeMetrics);
  
  // Generate recommendation
  const recommendation = generateRecommendation(inputs, bridgeMetrics, costSavings);
  
  // Breakeven analysis
  const breakevenAnalysis = calculateBreakevenAnalysis(inputs, bridgeMetrics, costSavings);
  
  return {
    costSavings,
    riskAssessment,
    recommendation,
    alternativeCost,
    breakevenAnalysis
  };
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, metrics: BridgeLoanMetrics): string {
  const { expectedSaleTime, bridgeLoanTerm, expectedSalePrice, currentHomeValue } = inputs;
  
  let riskLevel = 'Low';
  let risks: string[] = [];
  
  // Sale timeline risk
  if (expectedSaleTime > bridgeLoanTerm * 0.8) {
    riskLevel = 'High';
    risks.push('Sale timeline may exceed bridge loan term');
  } else if (expectedSaleTime > bridgeLoanTerm * 0.6) {
    riskLevel = 'Medium';
    risks.push('Sale timeline is tight');
  }
  
  // Market value risk
  const priceDifference = Math.abs(expectedSalePrice - currentHomeValue) / currentHomeValue * 100;
  if (priceDifference > 10) {
    risks.push('Expected sale price differs significantly from current value');
  }
  
  // Equity utilization risk
  if (metrics.equityUtilization > 80) {
    risks.push('High equity utilization increases risk');
  }
  
  // Debt-to-income risk
  if (metrics.debtToIncomeRatio > 43) {
    risks.push('High debt-to-income ratio may affect qualification');
  }
  
  // Cash flow risk
  if (metrics.monthlyCashFlow < -2000) {
    risks.push('Significant negative monthly cash flow');
  }
  
  if (risks.length === 0) {
    risks.push('Standard bridge loan risks apply');
  }
  
  return `${riskLevel} Risk: ${risks.join(', ')}. Consider market conditions and personal financial stability.`;
}

/**
 * Generate recommendation
 */
function generateRecommendation(inputs: Record<string, any>, metrics: BridgeLoanMetrics, costSavings: number): string {
  const { expectedSaleTime, bridgeLoanTerm, monthlyRentalIncome } = inputs;
  
  let recommendation = '';
  
  if (costSavings > 0) {
    recommendation += 'Bridge loan appears cost-effective compared to alternatives. ';
  } else {
    recommendation += 'Consider alternative financing options for potential cost savings. ';
  }
  
  if (expectedSaleTime < bridgeLoanTerm * 0.7) {
    recommendation += 'Sale timeline looks realistic. ';
  } else {
    recommendation += 'Ensure realistic sale timeline or consider longer bridge loan term. ';
  }
  
  if (metrics.monthlyCashFlow > 0) {
    recommendation += 'Positive cash flow from rental income provides buffer. ';
  } else if (metrics.monthlyCashFlow > -1000) {
    recommendation += 'Manageable negative cash flow with proper planning. ';
  } else {
    recommendation += 'Significant negative cash flow requires careful financial planning. ';
  }
  
  if (metrics.equityUtilization < 70) {
    recommendation += 'Conservative equity utilization reduces risk. ';
  }
  
  recommendation += 'Consult with financial advisor before proceeding.';
  
  return recommendation;
}

/**
 * Calculate breakeven analysis
 */
function calculateBreakevenAnalysis(inputs: Record<string, any>, metrics: BridgeLoanMetrics, costSavings: number): {
  timeToBreakeven: number;
  totalSavings: number;
  riskLevel: string;
} {
  const { expectedSaleTime, bridgeLoanTerm } = inputs;
  
  let timeToBreakeven = metrics.breakEvenTime;
  let totalSavings = costSavings;
  let riskLevel = 'Low';
  
  // Adjust for sale timeline
  if (expectedSaleTime > bridgeLoanTerm) {
    timeToBreakeven = bridgeLoanTerm;
    riskLevel = 'High';
  } else if (expectedSaleTime > bridgeLoanTerm * 0.8) {
    riskLevel = 'Medium';
  }
  
  // Calculate total savings over time
  if (costSavings > 0) {
    totalSavings = costSavings + (metrics.monthlyCashFlow * timeToBreakeven);
  } else {
    totalSavings = costSavings - (Math.abs(metrics.monthlyCashFlow) * timeToBreakeven);
  }
  
  return {
    timeToBreakeven,
    totalSavings,
    riskLevel
  };
}

/**
 * Generate payment schedule
 */
export function generatePaymentSchedule(inputs: Record<string, any>, metrics: BridgeLoanMetrics): PaymentSchedule {
  const { bridgeLoanAmount, bridgeLoanRate, bridgeLoanTerm, expectedSaleTime } = inputs;
  
  const monthlyRate = bridgeLoanRate / 100 / 12;
  const monthlyPayment = metrics.monthlyPayment;
  
  const payments = [];
  let remainingBalance = bridgeLoanAmount;
  
  for (let month = 1; month <= bridgeLoanTerm; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    if (remainingBalance < 0) remainingBalance = 0;
    
    payments.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance
    });
  }
  
  // Generate summary
  const saleMonth = Math.min(expectedSaleTime, bridgeLoanTerm);
  const balanceAtSale = payments[saleMonth - 1]?.remainingBalance || 0;
  
  const summary = `Bridge loan: $${bridgeLoanAmount.toLocaleString()} at ${bridgeLoanRate}% for ${bridgeLoanTerm} months. Monthly payment: $${monthlyPayment.toFixed(2)}. Expected balance at sale (month ${saleMonth}): $${balanceAtSale.toFixed(2)}.`;
  
  return {
    summary,
    payments
  };
}

/**
 * Calculate bridge loan vs HELOC comparison
 */
export function calculateHELOCComparison(
  bridgeLoanAmount: number,
  bridgeLoanRate: number,
  bridgeLoanTerm: number,
  helocRate: number,
  helocTerm: number
): {
  bridgeLoanCost: number;
  helocCost: number;
  savings: number;
  recommendation: string;
} {
  const bridgeMetrics = calculateBridgeLoan({
    bridgeLoanAmount,
    bridgeLoanRate,
    bridgeLoanTerm,
    expectedSaleTime: bridgeLoanTerm
  });
  
  const helocMonthlyRate = helocRate / 100 / 12;
  const helocMonthlyPayment = calculateMonthlyPayment(bridgeLoanAmount, helocMonthlyRate, helocTerm);
  const helocTotalInterest = (helocMonthlyPayment * helocTerm) - bridgeLoanAmount;
  
  const savings = helocTotalInterest - bridgeMetrics.totalCost;
  
  let recommendation = '';
  if (savings > 0) {
    recommendation = `HELOC saves $${savings.toFixed(2)} but consider flexibility and qualification requirements.`;
  } else {
    recommendation = `Bridge loan costs $${Math.abs(savings).toFixed(2)} less than HELOC.`;
  }
  
  return {
    bridgeLoanCost: bridgeMetrics.totalCost,
    helocCost: helocTotalInterest,
    savings,
    recommendation
  };
}

/**
 * Calculate market risk analysis
 */
export function calculateMarketRiskAnalysis(
  currentHomeValue: number,
  expectedSalePrice: number,
  marketVolatility: number
): {
  priceRisk: number;
  timelineRisk: number;
  overallRisk: string;
} {
  const priceDifference = Math.abs(expectedSalePrice - currentHomeValue) / currentHomeValue * 100;
  const priceRisk = priceDifference * marketVolatility;
  
  let timelineRisk = 0;
  if (priceDifference > 5) {
    timelineRisk = priceDifference * 0.5;
  }
  
  let overallRisk = 'Low';
  if (priceRisk > 20 || timelineRisk > 15) {
    overallRisk = 'High';
  } else if (priceRisk > 10 || timelineRisk > 8) {
    overallRisk = 'Medium';
  }
  
  return {
    priceRisk,
    timelineRisk,
    overallRisk
  };
}
