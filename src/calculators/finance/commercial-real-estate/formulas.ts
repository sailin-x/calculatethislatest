interface CommercialRealEstateMetrics {
  monthlyPayment: number;
  effectiveGrossIncome: number;
  totalExpenses: number;
  netOperatingIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  operatingExpenseRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenOccupancy: number;
}

interface CommercialAnalysis {
  investmentGrade: string;
  riskAssessment: string;
  recommendations: string;
}

/**
 * Calculate comprehensive commercial real estate metrics
 */
export function calculateCommercialRealEstate(inputs: Record<string, any>): CommercialRealEstateMetrics {
  const {
    propertyValue,
    purchasePrice,
    downPayment,
    loanAmount,
    interestRate,
    loanTerm,
    annualRent,
    vacancyRate = 8.0,
    propertyTax = 0,
    insurance = 0,
    utilities = 0,
    maintenance = 0,
    propertyManagement = 5.0,
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

  // Calculate effective gross income
  const vacancyLoss = annualRent * (vacancyRate / 100);
  const effectiveGrossIncome = annualRent - vacancyLoss;

  // Calculate total operating expenses
  const propertyManagementFee = effectiveGrossIncome * (propertyManagement / 100);
  const totalExpenses = propertyTax + insurance + utilities + maintenance + 
    propertyManagementFee + hoaFees + otherExpenses;

  // Calculate Net Operating Income (NOI)
  const netOperatingIncome = effectiveGrossIncome - totalExpenses;

  // Calculate monthly and annual cash flow
  const annualDebtService = monthlyPayment * 12;
  const annualCashFlow = netOperatingIncome - annualDebtService;
  const monthlyCashFlow = annualCashFlow / 12;

  // Calculate cap rate
  const capRate = (netOperatingIncome / propertyValue) * 100;

  // Calculate cash-on-cash return
  const cashOnCashReturn = (annualCashFlow / downPayment) * 100;

  // Calculate total return (including appreciation)
  const annualAppreciation = propertyValue * (appreciationRate / 100);
  const totalReturn = ((annualCashFlow + annualAppreciation) / downPayment) * 100;

  // Calculate operating expense ratio
  const operatingExpenseRatio = (totalExpenses / effectiveGrossIncome) * 100;

  // Calculate debt service coverage ratio
  const debtServiceCoverageRatio = netOperatingIncome / annualDebtService;

  // Calculate break-even occupancy
  const breakEvenOccupancy = calculateBreakEvenOccupancy(
    annualRent, vacancyRate, totalExpenses, annualDebtService
  );

  return {
    monthlyPayment,
    effectiveGrossIncome,
    totalExpenses,
    netOperatingIncome,
    monthlyCashFlow,
    annualCashFlow,
    capRate,
    cashOnCashReturn,
    totalReturn,
    operatingExpenseRatio,
    debtServiceCoverageRatio,
    breakEvenOccupancy
  };
}

/**
 * Calculate break-even occupancy rate
 */
function calculateBreakEvenOccupancy(
  annualRent: number,
  vacancyRate: number,
  totalExpenses: number,
  annualDebtService: number
): number {
  const totalRequiredIncome = totalExpenses + annualDebtService;
  const breakEvenRent = totalRequiredIncome;
  const breakEvenOccupancy = (breakEvenRent / annualRent) * 100;
  
  return Math.min(breakEvenOccupancy, 100);
}

/**
 * Generate comprehensive commercial real estate analysis
 */
export function generateCommercialAnalysis(inputs: Record<string, any>, commercialMetrics: CommercialRealEstateMetrics): CommercialAnalysis {
  const investmentGrade = generateInvestmentGrade(commercialMetrics);
  const riskAssessment = generateRiskAssessment(inputs, commercialMetrics);
  const recommendations = generateRecommendations(inputs, commercialMetrics);

  return {
    investmentGrade,
    riskAssessment,
    recommendations
  };
}

/**
 * Generate investment grade assessment
 */
function generateInvestmentGrade(commercialMetrics: CommercialRealEstateMetrics): string {
  const { capRate, cashOnCashReturn, debtServiceCoverageRatio, operatingExpenseRatio } = commercialMetrics;

  let grade = '';

  // Cap rate assessment
  if (capRate >= 8.0) {
    grade = 'A+ - Excellent cap rate with strong investment potential';
  } else if (capRate >= 6.5) {
    grade = 'A - Strong cap rate with good investment potential';
  } else if (capRate >= 5.5) {
    grade = 'B+ - Good cap rate with solid investment potential';
  } else if (capRate >= 4.5) {
    grade = 'B - Average cap rate with moderate investment potential';
  } else if (capRate >= 3.5) {
    grade = 'C+ - Below average cap rate, consider appreciation potential';
  } else {
    grade = 'C - Low cap rate, primarily appreciation play';
  }

  // Cash-on-cash return assessment
  if (cashOnCashReturn >= 8) {
    grade += ' (Strong cash-on-cash return)';
  } else if (cashOnCashReturn < 2) {
    grade += ' (Low cash-on-cash return)';
  }

  // Debt service coverage ratio assessment
  if (debtServiceCoverageRatio >= 1.25) {
    grade += ' (Strong debt coverage)';
  } else if (debtServiceCoverageRatio < 1.1) {
    grade += ' (Weak debt coverage)';
  }

  // Operating expense ratio assessment
  if (operatingExpenseRatio < 45) {
    grade += ' (Efficient operations)';
  } else if (operatingExpenseRatio > 65) {
    grade += ' (High operating expenses)';
  }

  return grade;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, commercialMetrics: CommercialRealEstateMetrics): string {
  const risks: string[] = [];

  // Vacancy risk
  if (inputs.vacancyRate > 15) {
    risks.push('High vacancy rate increases income volatility');
  }

  // Cash flow risk
  if (commercialMetrics.monthlyCashFlow < 0) {
    risks.push('Negative cash flow requires additional funding');
  }

  // Leverage risk
  const loanToValue = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (loanToValue > 75) {
    risks.push('High leverage increases risk of negative equity');
  }

  // Interest rate risk
  if (inputs.interestRate > 7) {
    risks.push('High interest rate reduces cash flow potential');
  }

  // Debt service coverage risk
  if (commercialMetrics.debtServiceCoverageRatio < 1.1) {
    risks.push('Low debt service coverage ratio increases default risk');
  }

  // Cap rate risk
  if (commercialMetrics.capRate < 4.0) {
    risks.push('Low cap rate may indicate overvaluation');
  } else if (commercialMetrics.capRate > 12.0) {
    risks.push('Very high cap rate may indicate high-risk area or property issues');
  }

  // Operating expense risk
  if (commercialMetrics.operatingExpenseRatio > 70) {
    risks.push('High operating expense ratio reduces profitability');
  }

  // Property type specific risks
  if (inputs.propertyType === 'office' && inputs.location === 'rural') {
    risks.push('Rural office properties may have limited tenant pool');
  }

  if (inputs.propertyType === 'retail' && inputs.vacancyRate > 10) {
    risks.push('High vacancy rate in retail may indicate market challenges');
  }

  if (risks.length === 0) {
    risks.push('Standard commercial real estate investment risks apply');
  }

  return `Risk Assessment: ${risks.join(', ')}. Monitor market conditions, tenant quality, and economic factors.`;
}

/**
 * Generate investment recommendations
 */
function generateRecommendations(inputs: Record<string, any>, commercialMetrics: CommercialRealEstateMetrics): string {
  const recommendations: string[] = [];

  // Cash flow recommendations
  if (commercialMetrics.monthlyCashFlow < 0) {
    recommendations.push('Consider increasing rent or reducing expenses to achieve positive cash flow');
    recommendations.push('Build cash reserves to cover negative cash flow periods');
  } else if (commercialMetrics.cashOnCashReturn < 5) {
    recommendations.push('Consider strategies to improve cash-on-cash return');
  }

  // Financing recommendations
  if (inputs.interestRate > 6) {
    recommendations.push('Monitor interest rates for refinancing opportunities');
  }

  // Property management recommendations
  if (inputs.propertyManagement > 8) {
    recommendations.push('Consider self-management to reduce expenses');
  }

  // Investment strategy recommendations
  if (commercialMetrics.capRate < 5) {
    recommendations.push('Focus on appreciation potential rather than cash flow');
  } else if (commercialMetrics.capRate > 8) {
    recommendations.push('Strong cash flow property, consider portfolio expansion');
  }

  // Risk management recommendations
  if (commercialMetrics.debtServiceCoverageRatio < 1.2) {
    recommendations.push('Consider reducing leverage to improve debt coverage');
  }

  // Property type specific recommendations
  if (inputs.propertyType === 'office') {
    recommendations.push('Focus on long-term leases with creditworthy tenants');
  } else if (inputs.propertyType === 'retail') {
    recommendations.push('Diversify tenant mix to reduce concentration risk');
  } else if (inputs.propertyType === 'industrial') {
    recommendations.push('Consider location accessibility and infrastructure');
  }

  // Location specific recommendations
  if (inputs.location === 'urban') {
    recommendations.push('Monitor urban development trends and transportation access');
  } else if (inputs.location === 'rural') {
    recommendations.push('Consider local economic factors and tenant availability');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring property performance and market conditions');
    recommendations.push('Consider tax implications and consult with commercial real estate advisor');
  }

  return `Recommendations: ${recommendations.join('. ')}. Regular review and adjustment of strategy recommended.`;
}
