interface CashFlowMetrics {
  monthlyPayment: number;
  monthlyRentalIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  totalReturn: number;
  breakEvenRent: number;
  profitabilityIndex: number;
  paybackPeriod: number;
}

interface CashFlowAnalysis {
  cashFlowAnalysis: string;
  riskAssessment: string;
  recommendations: string;
}

/**
 * Calculate comprehensive cash flow metrics
 */
export function calculateCashFlow(inputs: Record<string, any>): CashFlowMetrics {
  const {
    propertyValue,
    purchasePrice,
    downPayment,
    loanAmount,
    interestRate,
    loanTerm,
    monthlyRent,
    vacancyRate = 5.0,
    propertyTax = 0,
    insurance = 0,
    utilities = 0,
    maintenance = 0,
    propertyManagement = 8.0,
    hoaFees = 0,
    otherExpenses = 0,
    appreciationRate = 3.0,
    inflationRate = 2.5
  } = inputs;

  // Calculate monthly mortgage payment
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Calculate effective monthly rental income
  const vacancyLoss = monthlyRent * (vacancyRate / 100);
  const monthlyRentalIncome = monthlyRent - vacancyLoss;

  // Calculate monthly operating expenses
  const propertyManagementFee = monthlyRentalIncome * (propertyManagement / 100);
  const monthlyExpenses = (propertyTax + insurance + utilities + maintenance + hoaFees + otherExpenses) / 12 + propertyManagementFee;

  // Calculate monthly cash flow
  const monthlyCashFlow = monthlyRentalIncome - monthlyExpenses - monthlyPayment;

  // Calculate annual cash flow
  const annualCashFlow = monthlyCashFlow * 12;

  // Calculate cash-on-cash return
  const totalCashInvested = downPayment;
  const cashOnCashReturn = (annualCashFlow / totalCashInvested) * 100;

  // Calculate cap rate
  const annualNOI = (monthlyRentalIncome - monthlyExpenses) * 12;
  const capRate = (annualNOI / propertyValue) * 100;

  // Calculate total return (including appreciation)
  const annualAppreciation = propertyValue * (appreciationRate / 100);
  const totalReturn = ((annualCashFlow + annualAppreciation) / totalCashInvested) * 100;

  // Calculate break-even rent
  const breakEvenRent = monthlyExpenses + monthlyPayment;

  // Calculate profitability index (simplified)
  const discountRate = (inflationRate / 100) + 0.02; // Inflation + 2% risk premium
  const presentValueFactor = 1 / (1 + discountRate);
  const profitabilityIndex = calculateProfitabilityIndex(annualCashFlow, totalCashInvested, discountRate);

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(totalCashInvested, annualCashFlow, annualAppreciation);

  return {
    monthlyPayment,
    monthlyRentalIncome,
    monthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturn,
    capRate,
    totalReturn,
    breakEvenRent,
    profitabilityIndex,
    paybackPeriod
  };
}

/**
 * Calculate profitability index
 */
function calculateProfitabilityIndex(annualCashFlow: number, initialInvestment: number, discountRate: number): number {
  if (annualCashFlow <= 0) {
    return 0.5; // Default for negative cash flow
  }

  // Calculate present value of 10 years of cash flows
  let presentValue = 0;
  for (let year = 1; year <= 10; year++) {
    presentValue += annualCashFlow / Math.pow(1 + discountRate, year);
  }

  return presentValue / initialInvestment;
}

/**
 * Calculate payback period
 */
function calculatePaybackPeriod(initialInvestment: number, annualCashFlow: number, annualAppreciation: number): number {
  if (annualCashFlow + annualAppreciation <= 0) {
    return 999; // Very long payback for negative returns
  }

  return initialInvestment / (annualCashFlow + annualAppreciation);
}

/**
 * Generate comprehensive cash flow analysis
 */
export function generateCashFlowAnalysis(inputs: Record<string, any>, cashFlowMetrics: CashFlowMetrics): CashFlowAnalysis {
  const cashFlowAnalysis = generateCashFlowSummary(cashFlowMetrics);
  const riskAssessment = generateRiskAssessment(inputs, cashFlowMetrics);
  const recommendations = generateRecommendations(inputs, cashFlowMetrics);

  return {
    cashFlowAnalysis,
    riskAssessment,
    recommendations
  };
}

/**
 * Generate cash flow summary analysis
 */
function generateCashFlowSummary(cashFlowMetrics: CashFlowMetrics): string {
  const { monthlyCashFlow, annualCashFlow, cashOnCashReturn, capRate, totalReturn, breakEvenRent } = cashFlowMetrics;

  let analysis = `Cash Flow Analysis: `;

  if (monthlyCashFlow > 0) {
    analysis += `Positive monthly cash flow of $${monthlyCashFlow.toFixed(0)}. `;
    analysis += `Annual cash flow: $${annualCashFlow.toLocaleString()}. `;
    analysis += `Cash-on-cash return: ${cashOnCashReturn.toFixed(1)}%. `;
  } else {
    analysis += `Negative monthly cash flow of $${Math.abs(monthlyCashFlow).toFixed(0)}. `;
    analysis += `Annual cash flow: -$${Math.abs(annualCashFlow).toLocaleString()}. `;
    analysis += `Cash-on-cash return: ${cashOnCashReturn.toFixed(1)}%. `;
  }

  analysis += `Cap rate: ${capRate.toFixed(1)}%. `;
  analysis += `Total return (including appreciation): ${totalReturn.toFixed(1)}%. `;
  analysis += `Break-even rent: $${breakEvenRent.toFixed(0)}/month. `;

  // Cash flow quality assessment
  if (cashOnCashReturn >= 8) {
    analysis += `Excellent cash-on-cash return indicates strong investment potential.`;
  } else if (cashOnCashReturn >= 5) {
    analysis += `Good cash-on-cash return suggests solid investment.`;
  } else if (cashOnCashReturn >= 2) {
    analysis += `Moderate cash-on-cash return, consider appreciation potential.`;
  } else if (cashOnCashReturn >= 0) {
    analysis += `Low cash-on-cash return, primarily appreciation play.`;
  } else {
    analysis += `Negative cash-on-cash return, high risk investment.`;
  }

  return analysis;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, cashFlowMetrics: CashFlowMetrics): string {
  const risks: string[] = [];

  // Vacancy risk
  if (inputs.vacancyRate > 10) {
    risks.push('High vacancy rate increases income volatility');
  }

  // Cash flow risk
  if (cashFlowMetrics.monthlyCashFlow < 0) {
    risks.push('Negative cash flow requires additional funding');
  }

  // Leverage risk
  const loanToValue = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (loanToValue > 80) {
    risks.push('High leverage increases risk of negative equity');
  }

  // Interest rate risk
  if (inputs.interestRate > 6) {
    risks.push('High interest rate reduces cash flow potential');
  }

  // Property value risk
  if (inputs.appreciationRate < 2) {
    risks.push('Low appreciation rate limits total return potential');
  }

  // Expense risk
  const expenseRatio = (cashFlowMetrics.monthlyExpenses / cashFlowMetrics.monthlyRentalIncome) * 100;
  if (expenseRatio > 60) {
    risks.push('High expense ratio reduces profitability');
  }

  if (risks.length === 0) {
    risks.push('Standard real estate investment risks apply');
  }

  return `Risk Assessment: ${risks.join(', ')}. Monitor market conditions, property performance, and economic factors.`;
}

/**
 * Generate investment recommendations
 */
function generateRecommendations(inputs: Record<string, any>, cashFlowMetrics: CashFlowMetrics): string {
  const recommendations: string[] = [];

  // Cash flow recommendations
  if (cashFlowMetrics.monthlyCashFlow < 0) {
    recommendations.push('Consider increasing rent or reducing expenses to achieve positive cash flow');
    recommendations.push('Build cash reserves to cover negative cash flow periods');
  } else if (cashFlowMetrics.cashOnCashReturn < 5) {
    recommendations.push('Consider strategies to improve cash-on-cash return');
  }

  // Financing recommendations
  if (inputs.interestRate > 5) {
    recommendations.push('Monitor interest rates for refinancing opportunities');
  }

  // Property management recommendations
  if (inputs.propertyManagement > 10) {
    recommendations.push('Consider self-management to reduce expenses');
  }

  // Investment strategy recommendations
  if (cashFlowMetrics.capRate < 5) {
    recommendations.push('Focus on appreciation potential rather than cash flow');
  } else if (cashFlowMetrics.capRate > 8) {
    recommendations.push('Strong cash flow property, consider portfolio expansion');
  }

  // Risk management recommendations
  if (cashFlowMetrics.monthlyCashFlow < 0) {
    recommendations.push('Maintain adequate cash reserves for unexpected expenses');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring property performance and market conditions');
    recommendations.push('Consider tax implications and consult with financial advisor');
  }

  return `Recommendations: ${recommendations.join('. ')}. Regular review and adjustment of strategy recommended.`;
}
