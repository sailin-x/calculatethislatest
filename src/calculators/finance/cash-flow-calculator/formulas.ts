import { CashFlowInputs, CashFlowOutputs, CashFlowMetrics, CashFlowProjection, ExpenseBreakdown, InvestmentAnalysis, MarketAnalysis } from './types';

export function calculateCashFlow(inputs: CashFlowInputs): CashFlowOutputs {
  // Calculate key metrics
  const metrics = calculateCashFlowMetrics(inputs);

  // Generate cash flow projections
  const cashFlowProjections = generateCashFlowProjections(inputs, metrics);

  // Generate expense breakdown
  const expenseBreakdown = generateExpenseBreakdown(inputs, metrics);

  // Generate investment analysis
  const investmentAnalysis = generateInvestmentAnalysis(inputs, metrics);

  // Generate market analysis
  const marketAnalysis = generateMarketAnalysis(inputs, metrics);

  return {
    metrics,
    cashFlowProjections,
    expenseBreakdown,
    investmentAnalysis,
    marketAnalysis
  };
}

export function calculateCashFlowMetrics(inputs: CashFlowInputs): CashFlowMetrics {
  // Calculate income
  const grossRentalIncome = inputs.monthlyRent * 12;
  const vacancyLoss = grossRentalIncome * (inputs.vacancyRate / 100);
  const otherIncome = inputs.otherIncome;
  const effectiveGrossIncome = grossRentalIncome - vacancyLoss + otherIncome;

  // Calculate operating expenses
  const totalOperatingExpenses = inputs.propertyTaxes + inputs.insurance + inputs.maintenance + 
                                 inputs.propertyManagement + inputs.utilities + inputs.hoaFees + 
                                 inputs.landscaping + inputs.pestControl + inputs.advertising + 
                                 inputs.legalFees + inputs.accountingFees + inputs.otherExpenses;

  // Calculate net operating income
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;

  // Calculate debt service
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const debtService = monthlyPayment * 12;

  // Calculate cash flow
  const cashFlowBeforeTax = netOperatingIncome - debtService;
  const monthlyCashFlow = cashFlowBeforeTax / 12;
  const annualCashFlow = cashFlowBeforeTax;

  // Calculate investment metrics
  const totalInvestment = inputs.downPayment + inputs.closingCosts + inputs.points + 
                         inputs.escrowAccount + inputs.prepaidItems;
  const cashOnCashReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  const capRate = inputs.propertyValue > 0 ? (netOperatingIncome / inputs.propertyValue) * 100 : 0;
  const roi = totalInvestment > 0 ? ((annualCashFlow + (inputs.propertyValue - inputs.purchasePrice)) / totalInvestment) * 100 : 0;

  // Calculate expense ratio
  const expenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;

  // Calculate vacancy risk
  const vacancyRisk = inputs.vacancyRate;

  // Calculate market risk
  const marketRisk = calculateMarketRisk(inputs);

  // Calculate projected values
  const projectedNOI = netOperatingIncome * Math.pow(1 + (inputs.rentGrowthRate / 100), inputs.analysisPeriod);
  const projectedCapRate = inputs.propertyValue > 0 ? (projectedNOI / inputs.propertyValue) * 100 : 0;
  const valueAppreciation = inputs.propertyValue * Math.pow(1 + (inputs.appreciationRate / 100), inputs.analysisPeriod) - inputs.propertyValue;

  return {
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturn,
    capRate,
    roi,
    grossRentalIncome,
    vacancyLoss,
    otherIncome,
    effectiveGrossIncome,
    totalOperatingExpenses,
    netOperatingIncome,
    debtService,
    cashFlowBeforeTax,
    expenseRatio,
    vacancyRisk,
    marketRisk,
    projectedNOI,
    projectedCapRate,
    valueAppreciation
  };
}

function generateCashFlowProjections(inputs: CashFlowInputs, metrics: CashFlowMetrics): CashFlowProjection[] {
  const projections: CashFlowProjection[] = [];
  let cumulativeCashFlow = 0;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    // Calculate projected rental income with growth
    const projectedRentalIncome = inputs.monthlyRent * 12 * Math.pow(1 + (inputs.rentGrowthRate / 100), year - 1);
    
    // Calculate projected vacancy loss
    const projectedVacancyLoss = projectedRentalIncome * (inputs.vacancyRate / 100);
    
    // Calculate projected other income
    const projectedOtherIncome = inputs.otherIncome * Math.pow(1 + (inputs.inflationRate / 100), year - 1);
    
    // Calculate projected operating expenses with inflation
    const projectedOperatingExpenses = metrics.totalOperatingExpenses * Math.pow(1 + (inputs.inflationRate / 100), year - 1);
    
    // Calculate projected NOI
    const projectedNOI = projectedRentalIncome - projectedVacancyLoss + projectedOtherIncome - projectedOperatingExpenses;
    
    // Debt service remains constant (assuming fixed-rate loan)
    const projectedDebtService = metrics.debtService;
    
    // Calculate projected cash flow
    const projectedCashFlow = projectedNOI - projectedDebtService;
    cumulativeCashFlow += projectedCashFlow;

    projections.push({
      year,
      rentalIncome: projectedRentalIncome,
      vacancyLoss: projectedVacancyLoss,
      otherIncome: projectedOtherIncome,
      operatingExpenses: projectedOperatingExpenses,
      netOperatingIncome: projectedNOI,
      debtService: projectedDebtService,
      cashFlow: projectedCashFlow,
      cumulativeCashFlow
    });
  }

  return projections;
}

function generateExpenseBreakdown(inputs: CashFlowInputs, metrics: CashFlowMetrics): ExpenseBreakdown[] {
  const breakdown: ExpenseBreakdown[] = [];

  // Property Taxes
  if (inputs.propertyTaxes > 0) {
    breakdown.push({
      category: 'Property Taxes',
      amount: inputs.propertyTaxes,
      percentage: (inputs.propertyTaxes / metrics.totalOperatingExpenses) * 100,
      description: 'Annual property tax assessment',
      isVariable: false,
      annualGrowth: inputs.inflationRate
    });
  }

  // Insurance
  if (inputs.insurance > 0) {
    breakdown.push({
      category: 'Insurance',
      amount: inputs.insurance,
      percentage: (inputs.insurance / metrics.totalOperatingExpenses) * 100,
      description: 'Property and liability insurance',
      isVariable: true,
      annualGrowth: inputs.inflationRate + 2 // Insurance typically grows faster than inflation
    });
  }

  // Maintenance
  if (inputs.maintenance > 0) {
    breakdown.push({
      category: 'Maintenance',
      amount: inputs.maintenance,
      percentage: (inputs.maintenance / metrics.totalOperatingExpenses) * 100,
      description: 'Regular maintenance and repairs',
      isVariable: true,
      annualGrowth: inputs.inflationRate + 1
    });
  }

  // Property Management
  if (inputs.propertyManagement > 0) {
    breakdown.push({
      category: 'Property Management',
      amount: inputs.propertyManagement,
      percentage: (inputs.propertyManagement / metrics.totalOperatingExpenses) * 100,
      description: 'Professional property management fees',
      isVariable: false,
      annualGrowth: inputs.inflationRate
    });
  }

  // HOA Fees
  if (inputs.hoaFees > 0) {
    breakdown.push({
      category: 'HOA Fees',
      amount: inputs.hoaFees,
      percentage: (inputs.hoaFees / metrics.totalOperatingExpenses) * 100,
      description: 'Homeowners association fees',
      isVariable: false,
      annualGrowth: inputs.inflationRate
    });
  }

  // Utilities
  if (inputs.utilities > 0) {
    breakdown.push({
      category: 'Utilities',
      amount: inputs.utilities,
      percentage: (inputs.utilities / metrics.totalOperatingExpenses) * 100,
      description: 'Water, electricity, gas, etc.',
      isVariable: true,
      annualGrowth: inputs.inflationRate + 1.5
    });
  }

  // Other Expenses
  const otherExpenses = inputs.landscaping + inputs.pestControl + inputs.advertising + 
                       inputs.legalFees + inputs.accountingFees + inputs.otherExpenses;
  if (otherExpenses > 0) {
    breakdown.push({
      category: 'Other Expenses',
      amount: otherExpenses,
      percentage: (otherExpenses / metrics.totalOperatingExpenses) * 100,
      description: 'Miscellaneous operating expenses',
      isVariable: true,
      annualGrowth: inputs.inflationRate
    });
  }

  return breakdown;
}

function generateInvestmentAnalysis(inputs: CashFlowInputs, metrics: CashFlowMetrics): InvestmentAnalysis {
  // Determine investment grade
  let investmentGrade: 'A' | 'B' | 'C' | 'D';
  if (metrics.cashOnCashReturn >= 8 && metrics.capRate >= 6) {
    investmentGrade = 'A';
  } else if (metrics.cashOnCashReturn >= 6 && metrics.capRate >= 5) {
    investmentGrade = 'B';
  } else if (metrics.cashOnCashReturn >= 4 && metrics.capRate >= 4) {
    investmentGrade = 'C';
  } else {
    investmentGrade = 'D';
  }

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (metrics.vacancyRisk <= 3 && metrics.expenseRatio <= 40 && metrics.marketRisk <= 2) {
    riskLevel = 'low';
  } else if (metrics.vacancyRisk <= 7 && metrics.expenseRatio <= 50 && metrics.marketRisk <= 4) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (metrics.cashOnCashReturn < 6) {
    recommendations.push('Consider negotiating a lower purchase price to improve cash flow');
  }
  if (metrics.vacancyRisk > 5) {
    recommendations.push('Implement strategies to reduce vacancy risk');
  }
  if (metrics.expenseRatio > 50) {
    recommendations.push('Review and optimize operating expenses');
  }
  if (metrics.capRate < inputs.marketCapRate - 1) {
    recommendations.push('Property may be overpriced relative to market');
  }
  if (metrics.monthlyCashFlow < 0) {
    recommendations.push('Property has negative cash flow - consider alternative investments');
  }

  // Generate risk factors
  const riskFactors: string[] = [];
  if (metrics.vacancyRisk > 5) {
    riskFactors.push('High vacancy risk');
  }
  if (metrics.expenseRatio > 50) {
    riskFactors.push('High expense ratio');
  }
  if (metrics.marketRisk > 3) {
    riskFactors.push('Market volatility risk');
  }
  if (inputs.propertyAge > 20) {
    riskFactors.push('Older property may require more maintenance');
  }
  if (inputs.isCommercialProperty) {
    riskFactors.push('Commercial properties have higher vacancy risk');
  }

  return {
    cashOnCashReturn: metrics.cashOnCashReturn,
    totalReturn: metrics.roi,
    breakEvenCapRate: calculateBreakEvenCapRate(inputs),
    riskLevel,
    investmentGrade,
    recommendations,
    riskFactors
  };
}

function generateMarketAnalysis(inputs: CashFlowInputs, metrics: CashFlowMetrics): MarketAnalysis {
  // Determine market position
  let marketPosition: 'above' | 'below' | 'at';
  if (metrics.capRate > inputs.marketCapRate + 1) {
    marketPosition = 'above';
  } else if (metrics.capRate < inputs.marketCapRate - 1) {
    marketPosition = 'below';
  } else {
    marketPosition = 'at';
  }

  // Determine market risk
  let marketRisk: 'low' | 'medium' | 'high';
  const marketRiskScore = calculateMarketRiskScore(inputs);
  if (marketRiskScore <= 2) {
    marketRisk = 'low';
  } else if (marketRiskScore <= 4) {
    marketRisk = 'medium';
  } else {
    marketRisk = 'high';
  }

  // Generate market recommendations
  const recommendations: string[] = [];
  if (marketPosition === 'above') {
    recommendations.push('Property performs above market average');
  } else if (marketPosition === 'below') {
    recommendations.push('Consider market conditions and property improvements');
  }
  if (inputs.marketRent > inputs.monthlyRent * 1.1) {
    recommendations.push('Rent may be below market - consider rent increases');
  }
  if (inputs.marketVacancy < inputs.vacancyRate) {
    recommendations.push('Vacancy rate is higher than market average');
  }

  return {
    marketCapRate: inputs.marketCapRate,
    comparableCount: inputs.comparableProperties || 0,
    marketTrend: inputs.marketTrend,
    marketPosition,
    capRateSpread: metrics.capRate - inputs.marketCapRate,
    marketRisk,
    recommendations
  };
}

// Helper functions
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateMarketRisk(inputs: CashFlowInputs): number {
  let riskScore = 0;
  
  // Market trend risk
  if (inputs.marketTrend === 'decreasing') riskScore += 2;
  else if (inputs.marketTrend === 'stable') riskScore += 1;
  
  // Property type risk
  if (inputs.propertyType === 'commercial') riskScore += 2;
  else if (inputs.propertyType === 'mixed-use') riskScore += 1;
  
  // Vacancy risk
  if (inputs.vacancyRate > 10) riskScore += 2;
  else if (inputs.vacancyRate > 5) riskScore += 1;
  
  // Property age risk
  if (inputs.propertyAge > 30) riskScore += 2;
  else if (inputs.propertyAge > 20) riskScore += 1;
  
  return Math.min(riskScore, 10);
}

function calculateMarketRiskScore(inputs: CashFlowInputs): number {
  let score = 0;
  
  if (inputs.marketTrend === 'decreasing') score += 2;
  if (inputs.vacancyRate > inputs.marketVacancy) score += 1;
  if (inputs.propertyType === 'commercial') score += 1;
  if (inputs.propertyAge > 25) score += 1;
  
  return score;
}

function calculateBreakEvenCapRate(inputs: CashFlowInputs): number {
  const totalInvestment = inputs.downPayment + inputs.closingCosts + inputs.points + 
                         inputs.escrowAccount + inputs.prepaidItems;
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const annualDebtService = monthlyPayment * 12;
  const totalOperatingExpenses = inputs.propertyTaxes + inputs.insurance + inputs.maintenance + 
                                 inputs.propertyManagement + inputs.utilities + inputs.hoaFees + 
                                 inputs.landscaping + inputs.pestControl + inputs.advertising + 
                                 inputs.legalFees + inputs.accountingFees + inputs.otherExpenses;
  
  const breakEvenNOI = annualDebtService;
  return inputs.propertyValue > 0 ? (breakEvenNOI / inputs.propertyValue) * 100 : 0;
}