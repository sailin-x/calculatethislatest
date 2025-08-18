interface LeaseBuyoutMetrics {
  monthlyPayment: number;
  totalCashInvested: number;
  monthlyExpenses: number;
  netOperatingIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  rentSavings: number;
  annualRentSavings: number;
  breakEvenMonths: number;
  loanToValue: number;
  debtServiceCoverage: number;
}

interface BuyoutAnalysis {
  buyoutGrade: string;
  riskAssessment: string;
  recommendations: string;
}

/**
 * Calculate comprehensive commercial lease buyout metrics
 */
export function calculateLeaseBuyout(inputs: Record<string, any>): LeaseBuyoutMetrics {
  const {
    propertyValue,
    buyoutPrice,
    downPayment,
    loanAmount,
    interestRate,
    loanTerm,
    currentRent,
    marketRent,
    remainingLeaseTerm,
    closingCosts = 0,
    propertyTax = 0,
    insurance = 0,
    maintenance = 0,
    propertyManagement = 5.0,
    hoaFees = 0,
    otherExpenses = 0,
    appreciationRate = 3.0,
    inflationRate = 2.5,
    taxRate = 25.0
  } = inputs;

  // Calculate monthly mortgage payment
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Calculate total cash invested
  const totalCashInvested = downPayment + closingCosts;

  // Calculate monthly operating expenses
  const propertyManagementFee = marketRent * (propertyManagement / 100);
  const monthlyExpenses = (propertyTax + insurance + maintenance + hoaFees + otherExpenses) / 12 + propertyManagementFee;

  // Calculate Net Operating Income (NOI)
  const annualMarketRent = marketRent * 12;
  const annualExpenses = monthlyExpenses * 12;
  const netOperatingIncome = annualMarketRent - annualExpenses;

  // Calculate monthly and annual cash flow
  const annualDebtService = monthlyPayment * 12;
  const annualCashFlow = netOperatingIncome - annualDebtService;
  const monthlyCashFlow = annualCashFlow / 12;

  // Calculate cap rate
  const capRate = (netOperatingIncome / propertyValue) * 100;

  // Calculate cash-on-cash return
  const cashOnCashReturn = (annualCashFlow / totalCashInvested) * 100;

  // Calculate total return (including appreciation)
  const annualAppreciation = propertyValue * (appreciationRate / 100);
  const totalReturn = ((annualCashFlow + annualAppreciation) / totalCashInvested) * 100;

  // Calculate rent savings
  const rentSavings = currentRent - monthlyPayment - monthlyExpenses;
  const annualRentSavings = rentSavings * 12;

  // Calculate break-even months
  const breakEvenMonths = rentSavings > 0 ? totalCashInvested / rentSavings : 0;

  // Calculate loan-to-value ratio
  const loanToValue = (loanAmount / propertyValue) * 100;

  // Calculate debt service coverage ratio
  const debtServiceCoverage = netOperatingIncome / annualDebtService;

  return {
    monthlyPayment,
    totalCashInvested,
    monthlyExpenses,
    netOperatingIncome,
    monthlyCashFlow,
    annualCashFlow,
    capRate,
    cashOnCashReturn,
    totalReturn,
    rentSavings,
    annualRentSavings,
    breakEvenMonths,
    loanToValue,
    debtServiceCoverage
  };
}

/**
 * Generate comprehensive buyout analysis
 */
export function generateBuyoutAnalysis(inputs: Record<string, any>, buyoutMetrics: LeaseBuyoutMetrics): BuyoutAnalysis {
  const buyoutGrade = generateBuyoutGrade(inputs, buyoutMetrics);
  const riskAssessment = generateRiskAssessment(inputs, buyoutMetrics);
  const recommendations = generateRecommendations(inputs, buyoutMetrics);

  return {
    buyoutGrade,
    riskAssessment,
    recommendations
  };
}

/**
 * Generate buyout grade assessment
 */
function generateBuyoutGrade(inputs: Record<string, any>, buyoutMetrics: LeaseBuyoutMetrics): string {
  const { rentSavings, breakEvenMonths, capRate, cashOnCashReturn, debtServiceCoverage } = buyoutMetrics;
  const { marketRent, currentRent } = inputs;

  let grade = '';

  // Rent savings assessment
  if (rentSavings > 1000) {
    grade = 'A+ - Excellent buyout with significant rent savings';
  } else if (rentSavings > 500) {
    grade = 'A - Good buyout with substantial rent savings';
  } else if (rentSavings > 0) {
    grade = 'B+ - Positive buyout with moderate rent savings';
  } else if (rentSavings > -500) {
    grade = 'B - Neutral buyout, minimal cost difference';
  } else if (rentSavings > -1000) {
    grade = 'C+ - Higher cost but provides ownership benefits';
  } else {
    grade = 'C - Expensive buyout, consider alternatives';
  }

  // Break-even assessment
  if (breakEvenMonths > 0 && breakEvenMonths < 60) {
    grade += ' (Fast break-even)';
  } else if (breakEvenMonths > 120) {
    grade += ' (Long break-even period)';
  }

  // Cap rate assessment
  if (capRate >= 6.0) {
    grade += ' (Strong cap rate)';
  } else if (capRate < 4.0) {
    grade += ' (Low cap rate)';
  }

  // Cash-on-cash return assessment
  if (cashOnCashReturn >= 8) {
    grade += ' (Strong cash-on-cash return)';
  } else if (cashOnCashReturn < 0) {
    grade += ' (Negative cash-on-cash return)';
  }

  // Debt service coverage assessment
  if (debtServiceCoverage >= 1.25) {
    grade += ' (Strong debt coverage)';
  } else if (debtServiceCoverage < 1.0) {
    grade += ' (Weak debt coverage)';
  }

  // Market rent vs current rent assessment
  const rentRatio = marketRent / currentRent;
  if (rentRatio > 1.2) {
    grade += ' (Below market rent)';
  } else if (rentRatio < 0.8) {
    grade += ' (Above market rent)';
  }

  return grade;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, buyoutMetrics: LeaseBuyoutMetrics): string {
  const risks: string[] = [];

  // Cash flow risk
  if (buyoutMetrics.monthlyCashFlow < 0) {
    risks.push('Negative cash flow requires additional funding');
  }

  // Debt service coverage risk
  if (buyoutMetrics.debtServiceCoverage < 1.0) {
    risks.push('Insufficient debt service coverage increases default risk');
  } else if (buyoutMetrics.debtServiceCoverage < 1.1) {
    risks.push('Low debt service coverage ratio increases risk');
  }

  // Loan-to-value risk
  if (buyoutMetrics.loanToValue > 80) {
    risks.push('High loan-to-value ratio increases default risk');
  }

  // Break-even risk
  if (buyoutMetrics.breakEvenMonths > 120) {
    risks.push('Long break-even period increases investment risk');
  }

  // Cap rate risk
  if (buyoutMetrics.capRate < 4.0) {
    risks.push('Low cap rate may indicate overvaluation');
  } else if (buyoutMetrics.capRate > 12.0) {
    risks.push('Very high cap rate may indicate high-risk area');
  }

  // Rent market risk
  const rentRatio = inputs.marketRent / inputs.currentRent;
  if (rentRatio < 0.8) {
    risks.push('Current rent above market may not be sustainable');
  }

  // Interest rate risk
  if (inputs.interestRate > 7) {
    risks.push('High interest rate reduces cash flow potential');
  }

  // Property type specific risks
  if (inputs.propertyType === 'office' && inputs.remainingLeaseTerm < 3) {
    risks.push('Short remaining lease term may limit buyout benefits');
  }

  if (inputs.propertyType === 'retail' && buyoutMetrics.capRate < 5) {
    risks.push('Low cap rate for retail property may indicate market challenges');
  }

  // Market risk
  if (inputs.appreciationRate < 0) {
    risks.push('Negative appreciation rate increases investment risk');
  }

  if (risks.length === 0) {
    risks.push('Standard commercial property investment risks apply');
  }

  return `Risk Assessment: ${risks.join(', ')}. Monitor market conditions, property performance, and economic factors.`;
}

/**
 * Generate buyout recommendations
 */
function generateRecommendations(inputs: Record<string, any>, buyoutMetrics: LeaseBuyoutMetrics): string {
  const recommendations: string[] = [];

  // Rent savings recommendations
  if (buyoutMetrics.rentSavings > 1000) {
    recommendations.push('Strong rent savings - proceed with buyout');
  } else if (buyoutMetrics.rentSavings < 0) {
    recommendations.push('Consider if ownership benefits justify higher costs');
  }

  // Break-even recommendations
  if (buyoutMetrics.breakEvenMonths > 0 && buyoutMetrics.breakEvenMonths < 60) {
    recommendations.push('Fast break-even period makes buyout attractive');
  } else if (buyoutMetrics.breakEvenMonths > 120) {
    recommendations.push('Consider alternatives due to long break-even period');
  }

  // Financing recommendations
  if (buyoutMetrics.loanToValue > 75) {
    recommendations.push('Consider additional down payment to reduce LTV');
  }

  if (buyoutMetrics.debtServiceCoverage < 1.2) {
    recommendations.push('Consider shorter loan term or larger down payment');
  }

  // Cap rate recommendations
  if (buyoutMetrics.capRate < 5) {
    recommendations.push('Low cap rate - focus on appreciation potential');
  } else if (buyoutMetrics.capRate > 8) {
    recommendations.push('Strong cap rate - consider portfolio expansion');
  }

  // Market rent recommendations
  const rentRatio = inputs.marketRent / inputs.currentRent;
  if (rentRatio > 1.2) {
    recommendations.push('Current rent below market - buyout provides immediate value');
  } else if (rentRatio < 0.8) {
    recommendations.push('Current rent above market - negotiate better buyout terms');
  }

  // Property type specific recommendations
  if (inputs.propertyType === 'office') {
    recommendations.push('Consider long-term business stability before buyout');
  } else if (inputs.propertyType === 'retail') {
    recommendations.push('Evaluate retail market trends and location stability');
  } else if (inputs.propertyType === 'industrial') {
    recommendations.push('Assess industrial market demand and infrastructure needs');
  }

  // Lease term recommendations
  if (inputs.remainingLeaseTerm < 3) {
    recommendations.push('Short remaining lease - buyout provides immediate control');
  } else if (inputs.remainingLeaseTerm > 10) {
    recommendations.push('Long remaining lease - consider timing of buyout');
  }

  // Investment strategy recommendations
  if (buyoutMetrics.cashOnCashReturn < 5) {
    recommendations.push('Consider if appreciation potential justifies low cash return');
  }

  if (buyoutMetrics.totalReturn > 10) {
    recommendations.push('Strong total return - buyout provides good investment opportunity');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring market conditions and property performance');
    recommendations.push('Consult with commercial real estate advisor for personalized guidance');
  }

  return `Recommendations: ${recommendations.join('. ')}. Regular review of business and market conditions recommended.`;
}
