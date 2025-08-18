interface CashOnCashMetrics {
  totalCashInvested: number;
  monthlyPayment: number;
  monthlyRentalIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  totalReturn: number;
  capRate: number;
  breakEvenRent: number;
  paybackPeriod: number;
}

interface InvestmentAnalysis {
  investmentGrade: string;
  riskAssessment: string;
  recommendations: string;
}

/**
 * Calculate comprehensive cash-on-cash return metrics
 */
export function calculateCashOnCashReturn(inputs: Record<string, any>): CashOnCashMetrics {
  const {
    purchasePrice,
    downPayment,
    closingCosts = 0,
    renovationCosts = 0,
    monthlyRent,
    vacancyRate = 5.0,
    propertyTax = 0,
    insurance = 0,
    utilities = 0,
    maintenance = 0,
    propertyManagement = 8.0,
    hoaFees = 0,
    otherExpenses = 0,
    loanAmount,
    interestRate,
    loanTerm,
    appreciationRate = 3.0,
    inflationRate = 2.5
  } = inputs;

  // Calculate total cash invested
  const totalCashInvested = downPayment + closingCosts + renovationCosts;

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
  const cashOnCashReturn = (annualCashFlow / totalCashInvested) * 100;

  // Calculate total return (including appreciation)
  const annualAppreciation = purchasePrice * (appreciationRate / 100);
  const totalReturn = ((annualCashFlow + annualAppreciation) / totalCashInvested) * 100;

  // Calculate cap rate
  const annualNOI = (monthlyRentalIncome - monthlyExpenses) * 12;
  const capRate = (annualNOI / purchasePrice) * 100;

  // Calculate break-even rent
  const breakEvenRent = monthlyExpenses + monthlyPayment;

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(totalCashInvested, annualCashFlow, annualAppreciation);

  return {
    totalCashInvested,
    monthlyPayment,
    monthlyRentalIncome,
    monthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturn,
    totalReturn,
    capRate,
    breakEvenRent,
    paybackPeriod
  };
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
 * Generate comprehensive investment analysis
 */
export function generateInvestmentAnalysis(inputs: Record<string, any>, cashOnCashMetrics: CashOnCashMetrics): InvestmentAnalysis {
  const investmentGrade = generateInvestmentGrade(cashOnCashMetrics);
  const riskAssessment = generateRiskAssessment(inputs, cashOnCashMetrics);
  const recommendations = generateRecommendations(inputs, cashOnCashMetrics);

  return {
    investmentGrade,
    riskAssessment,
    recommendations
  };
}

/**
 * Generate investment grade assessment
 */
function generateInvestmentGrade(cashOnCashMetrics: CashOnCashMetrics): string {
  const { cashOnCashReturn, totalReturn, capRate, paybackPeriod } = cashOnCashMetrics;

  let grade = '';

  if (cashOnCashReturn >= 10) {
    grade = 'A+ - Excellent cash-on-cash return with strong investment potential';
  } else if (cashOnCashReturn >= 8) {
    grade = 'A - Strong cash-on-cash return with good investment potential';
  } else if (cashOnCashReturn >= 6) {
    grade = 'B+ - Good cash-on-cash return with solid investment potential';
  } else if (cashOnCashReturn >= 4) {
    grade = 'B - Average cash-on-cash return with moderate investment potential';
  } else if (cashOnCashReturn >= 2) {
    grade = 'C+ - Below average cash-on-cash return, consider appreciation potential';
  } else if (cashOnCashReturn >= 0) {
    grade = 'C - Low cash-on-cash return, primarily appreciation play';
  } else {
    grade = 'D - Negative cash-on-cash return, high risk investment';
  }

  // Add additional context
  if (paybackPeriod < 10) {
    grade += ' (Fast payback period)';
  } else if (paybackPeriod > 20) {
    grade += ' (Long payback period)';
  }

  if (capRate > 7) {
    grade += ' (Strong cap rate)';
  } else if (capRate < 4) {
    grade += ' (Low cap rate)';
  }

  return grade;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, cashOnCashMetrics: CashOnCashMetrics): string {
  const risks: string[] = [];

  // Cash flow risk
  if (cashOnCashMetrics.monthlyCashFlow < 0) {
    risks.push('Negative cash flow requires additional funding');
  }

  // Vacancy risk
  if (inputs.vacancyRate > 10) {
    risks.push('High vacancy rate increases income volatility');
  }

  // Leverage risk
  const loanToValue = (inputs.loanAmount / inputs.purchasePrice) * 100;
  if (loanToValue > 80) {
    risks.push('High leverage increases risk of negative equity');
  }

  // Interest rate risk
  if (inputs.interestRate > 6) {
    risks.push('High interest rate reduces cash flow potential');
  }

  // Cash-on-cash return risk
  if (cashOnCashMetrics.cashOnCashReturn < 0) {
    risks.push('Negative cash-on-cash return indicates high-risk investment');
  } else if (cashOnCashMetrics.cashOnCashReturn > 15) {
    risks.push('Very high cash-on-cash return may indicate unrealistic assumptions');
  }

  // Payback period risk
  if (cashOnCashMetrics.paybackPeriod > 15) {
    risks.push('Long payback period increases investment risk');
  }

  // Expense risk
  const expenseRatio = (cashOnCashMetrics.monthlyExpenses / cashOnCashMetrics.monthlyRentalIncome) * 100;
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
function generateRecommendations(inputs: Record<string, any>, cashOnCashMetrics: CashOnCashMetrics): string {
  const recommendations: string[] = [];

  // Cash flow recommendations
  if (cashOnCashMetrics.monthlyCashFlow < 0) {
    recommendations.push('Consider increasing rent or reducing expenses to achieve positive cash flow');
    recommendations.push('Build cash reserves to cover negative cash flow periods');
  } else if (cashOnCashMetrics.cashOnCashReturn < 5) {
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
  if (cashOnCashMetrics.capRate < 5) {
    recommendations.push('Focus on appreciation potential rather than cash flow');
  } else if (cashOnCashMetrics.capRate > 8) {
    recommendations.push('Strong cash flow property, consider portfolio expansion');
  }

  // Risk management recommendations
  if (cashOnCashMetrics.monthlyCashFlow < 0) {
    recommendations.push('Maintain adequate cash reserves for unexpected expenses');
  }

  // Payback period recommendations
  if (cashOnCashMetrics.paybackPeriod > 15) {
    recommendations.push('Consider strategies to improve payback period');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring property performance and market conditions');
    recommendations.push('Consider tax implications and consult with financial advisor');
  }

  return `Recommendations: ${recommendations.join('. ')}. Regular review and adjustment of strategy recommended.`;
}
