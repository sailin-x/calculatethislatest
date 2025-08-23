import { RealEstateInvestmentInputs, RealEstateInvestmentResults } from './types';

export function calculateRealEstateInvestment(inputs: RealEstateInvestmentInputs, allInputs?: Record<string, any>): RealEstateInvestmentResults {
  // Basic calculations
  const loanAmount = inputs.purchasePrice - inputs.downPayment;
  const totalInvestment = inputs.downPayment + inputs.closingCosts + (inputs.renovationCosts || 0);
  
  // Monthly mortgage payment
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Income calculations
  const grossMonthlyIncome = inputs.monthlyRent + (inputs.otherIncome || 0);
  const vacancyLoss = grossMonthlyIncome * (inputs.vacancyRate / 100);
  const effectiveGrossIncome = grossMonthlyIncome - vacancyLoss;
  
  // Expense calculations
  const monthlyExpenses = {
    mortgage: monthlyPayment,
    propertyTax: inputs.propertyTax / 12,
    insurance: inputs.insurance / 12,
    hoaFees: (inputs.hoaFees || 0) / 12,
    propertyManagement: (inputs.propertyManagement || 0) / 12,
    maintenance: inputs.maintenance / 12,
    utilities: (inputs.utilities || 0) / 12,
    landscaping: (inputs.landscaping || 0) / 12,
    pestControl: (inputs.pestControl || 0) / 12
  };
  
  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((sum, expense) => sum + expense, 0);
  const monthlyCashFlow = effectiveGrossIncome - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Key metrics
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
  const netOperatingIncome = (effectiveGrossIncome - (totalMonthlyExpenses - monthlyExpenses.mortgage)) * 12;
  const capRate = (netOperatingIncome / inputs.purchasePrice) * 100;
  const grossRentMultiplier = inputs.purchasePrice / (grossMonthlyIncome * 12);
  
  // ROI calculations
  const totalROI = calculateTotalROI(inputs, annualCashFlow, totalInvestment);
  const annualizedROI = calculateAnnualizedROI(totalROI, inputs.holdingPeriod);
  const internalRateOfReturn = calculateIRR(inputs, annualCashFlow, totalInvestment);
  const paybackPeriod = totalInvestment / annualCashFlow;
  
  // Property analysis
  const breakEvenRent = totalMonthlyExpenses / (1 - inputs.vacancyRate / 100);
  const maximumPurchasePrice = calculateMaxPurchasePrice(inputs, annualCashFlow);
  const optimalRent = calculateOptimalRent(inputs, totalMonthlyExpenses);
  
  // Market analysis
  const marketValue = inputs.purchasePrice * Math.pow(1 + inputs.appreciationRate / 100, inputs.holdingPeriod);
  const equityBuildUp = calculateEquityBuildUp(inputs, monthlyPayment, inputs.holdingPeriod);
  const appreciationGain = marketValue - inputs.purchasePrice;
  
  // Risk metrics
  const debtServiceCoverageRatio = netOperatingIncome / (monthlyPayment * 12);
  const loanToValueRatio = (loanAmount / inputs.purchasePrice) * 100;
  const riskScore = calculateRiskScore(inputs, cashOnCashReturn, debtServiceCoverageRatio);
  
  // Five-year projection
  const fiveYearProjection = calculateFiveYearProjection(inputs, monthlyCashFlow, marketValue);
  
  // Exit analysis
  const saleProceeds = marketValue - inputs.sellingCosts;
  const totalProfit = saleProceeds - inputs.purchasePrice + (annualCashFlow * inputs.holdingPeriod);
  const profitMargin = (totalProfit / totalInvestment) * 100;
  
  // Generate comprehensive report
  const report = generateInvestmentReport(inputs, {
    cashOnCashReturn,
    capRate,
    totalROI,
    monthlyCashFlow,
    marketValue,
    riskScore
  });
  
  // Generate recommendations and analysis
  const recommendations = generateRecommendations(inputs, cashOnCashReturn, capRate, riskScore);
  const riskFactors = identifyRiskFactors(inputs, cashOnCashReturn, debtServiceCoverageRatio);
  const opportunities = identifyOpportunities(inputs, marketValue, appreciationGain);
  
  // Market comparison
  const marketComparison = generateMarketComparison(inputs, cashOnCashReturn, capRate, grossRentMultiplier);
  
  // Sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs, cashOnCashReturn, totalROI);
  
  return {
    totalInvestment,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturn,
    capRate,
    grossRentMultiplier,
    netOperatingIncome,
    totalROI,
    annualizedROI,
    internalRateOfReturn,
    paybackPeriod,
    breakEvenRent,
    maximumPurchasePrice,
    optimalRent,
    marketValue,
    equityBuildUp,
    appreciationGain,
    monthlyExpenses: totalMonthlyExpenses,
    monthlyIncome: effectiveGrossIncome,
    netCashFlow: monthlyCashFlow,
    debtServiceCoverageRatio,
    loanToValueRatio,
    riskScore,
    fiveYearProjection,
    saleProceeds,
    totalProfit,
    profitMargin,
    report,
    recommendations,
    riskFactors,
    opportunities,
    marketComparison,
    sensitivityAnalysis
  };
}

function calculateTotalROI(inputs: RealEstateInvestmentInputs, annualCashFlow: number, totalInvestment: number): number {
  const futureValue = inputs.purchasePrice * Math.pow(1 + inputs.appreciationRate / 100, inputs.holdingPeriod);
  const totalCashFlow = annualCashFlow * inputs.holdingPeriod;
  const totalGain = (futureValue - inputs.purchasePrice) + totalCashFlow;
  return (totalGain / totalInvestment) * 100;
}

function calculateAnnualizedROI(totalROI: number, holdingPeriod: number): number {
  return Math.pow(1 + totalROI / 100, 1 / holdingPeriod) - 1;
}

function calculateIRR(inputs: RealEstateInvestmentInputs, annualCashFlow: number, totalInvestment: number): number {
  // Simplified IRR calculation
  const futureValue = inputs.purchasePrice * Math.pow(1 + inputs.appreciationRate / 100, inputs.holdingPeriod);
  const totalCashFlow = annualCashFlow * inputs.holdingPeriod;
  const totalReturn = futureValue + totalCashFlow;
  
  return Math.pow(totalReturn / totalInvestment, 1 / inputs.holdingPeriod) - 1;
}

function calculateMaxPurchasePrice(inputs: RealEstateInvestmentInputs, annualCashFlow: number): number {
  const targetCashOnCash = 8; // 8% target return
  return annualCashFlow / (targetCashOnCash / 100);
}

function calculateOptimalRent(inputs: RealEstateInvestmentInputs, totalMonthlyExpenses: number): number {
  const targetVacancyRate = inputs.vacancyRate / 100;
  return totalMonthlyExpenses / (1 - targetVacancyRate);
}

function calculateEquityBuildUp(inputs: RealEstateInvestmentInputs, monthlyPayment: number, holdingPeriod: number): number {
  const loanAmount = inputs.purchasePrice - inputs.downPayment;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  
  let remainingBalance = loanAmount;
  for (let i = 0; i < holdingPeriod * 12; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
  }
  
  return loanAmount - remainingBalance;
}

function calculateRiskScore(inputs: RealEstateInvestmentInputs, cashOnCashReturn: number, dscr: number): number {
  let riskScore = 50; // Base score
  
  // Cash on cash return adjustment
  if (cashOnCashReturn < 5) riskScore += 20;
  else if (cashOnCashReturn < 8) riskScore += 10;
  else if (cashOnCashReturn > 12) riskScore -= 10;
  
  // DSCR adjustment
  if (dscr < 1.2) riskScore += 20;
  else if (dscr < 1.5) riskScore += 10;
  else if (dscr > 2.0) riskScore -= 10;
  
  // Location adjustment
  const locationRisk = { 'a': -10, 'b': 0, 'c': 15, 'd': 25 };
  riskScore += locationRisk[inputs.location] || 0;
  
  // Market condition adjustment
  const marketRisk = { 'hot': 10, 'stable': 0, 'declining': 20, 'recovering': 5 };
  riskScore += marketRisk[inputs.marketCondition] || 0;
  
  // Property condition adjustment
  const conditionRisk = { 'excellent': -10, 'good': 0, 'fair': 15, 'poor': 25 };
  riskScore += conditionRisk[inputs.condition] || 0;
  
  return Math.max(0, Math.min(100, riskScore));
}

function calculateFiveYearProjection(inputs: RealEstateInvestmentInputs, monthlyCashFlow: number, marketValue: number): any[] {
  const projection = [];
  let currentValue = inputs.purchasePrice;
  let currentEquity = inputs.downPayment;
  
  for (let year = 1; year <= 5; year++) {
    currentValue *= (1 + inputs.appreciationRate / 100);
    const annualCashFlow = monthlyCashFlow * 12 * Math.pow(1 + inputs.rentGrowthRate / 100, year - 1);
    currentEquity += annualCashFlow;
    
    projection.push({
      year,
      marketValue: currentValue,
      equity: currentEquity,
      cashFlow: annualCashFlow,
      totalReturn: ((currentValue - inputs.purchasePrice) + (annualCashFlow * year)) / inputs.downPayment * 100
    });
  }
  
  return projection;
}

function generateInvestmentReport(inputs: RealEstateInvestmentInputs, metrics: any): string {
  return `# Real Estate Investment Analysis Report

## Property Overview
- **Property Type:** ${inputs.propertyType.replace('-', ' ').toUpperCase()}
- **Purchase Price:** $${inputs.purchasePrice.toLocaleString()}
- **Down Payment:** $${inputs.downPayment.toLocaleString()}
- **Total Investment:** $${(inputs.downPayment + inputs.closingCosts + (inputs.renovationCosts || 0)).toLocaleString()}

## Key Financial Metrics
- **Cash-on-Cash Return:** ${metrics.cashOnCashReturn.toFixed(2)}%
- **Cap Rate:** ${metrics.capRate.toFixed(2)}%
- **Total ROI:** ${metrics.totalROI.toFixed(2)}%
- **Monthly Cash Flow:** $${metrics.monthlyCashFlow.toLocaleString()}
- **Risk Score:** ${metrics.riskScore.toFixed(0)}/100

## Investment Analysis
This ${inputs.propertyType.replace('-', ' ')} property in a ${inputs.location.toUpperCase()} location shows ${metrics.cashOnCashReturn > 8 ? 'strong' : metrics.cashOnCashReturn > 5 ? 'moderate' : 'weak'} investment potential.

**Strengths:**
- ${metrics.capRate > 6 ? 'Above-average cap rate' : 'Competitive cap rate'}
- ${metrics.monthlyCashFlow > 0 ? 'Positive cash flow' : 'Cash flow needs improvement'}
- ${inputs.appreciationRate > 3 ? 'Strong appreciation potential' : 'Moderate appreciation potential'}

**Considerations:**
- Market condition: ${inputs.marketCondition}
- Property condition: ${inputs.condition}
- Zoning: ${inputs.zoning}

## Recommendations
${metrics.cashOnCashReturn > 8 ? '✅ Strong investment opportunity' : metrics.cashOnCashReturn > 5 ? '⚠️ Moderate investment with room for improvement' : '❌ Consider renegotiating terms or looking elsewhere'}

## Risk Assessment
Risk Level: ${metrics.riskScore < 30 ? 'Low' : metrics.riskScore < 60 ? 'Moderate' : 'High'}
${metrics.riskScore > 60 ? '⚠️ Consider additional due diligence and risk mitigation strategies.' : ''}
`;
}

function generateRecommendations(inputs: RealEstateInvestmentInputs, cashOnCashReturn: number, capRate: number, riskScore: number): string[] {
  const recommendations = [];
  
  if (cashOnCashReturn < 6) {
    recommendations.push('Consider negotiating a lower purchase price to improve cash-on-cash return');
    recommendations.push('Explore ways to increase rental income or reduce expenses');
  }
  
  if (capRate < 5) {
    recommendations.push('Cap rate is below market average - consider value-add opportunities');
  }
  
  if (riskScore > 60) {
    recommendations.push('High risk score - consider additional insurance or risk mitigation strategies');
    recommendations.push('Review property condition and consider renovation budget');
  }
  
  if (inputs.vacancyRate > 8) {
    recommendations.push('High vacancy rate assumption - consider market research for more accurate projections');
  }
  
  if (inputs.appreciationRate < 2) {
    recommendations.push('Low appreciation assumption - verify with local market data');
  }
  
  return recommendations;
}

function identifyRiskFactors(inputs: RealEstateInvestmentInputs, cashOnCashReturn: number, dscr: number): string[] {
  const risks = [];
  
  if (cashOnCashReturn < 5) risks.push('Low cash-on-cash return may not cover unexpected expenses');
  if (dscr < 1.2) risks.push('Low debt service coverage ratio increases default risk');
  if (inputs.vacancyRate > 10) risks.push('High vacancy rate assumption may be optimistic');
  if (inputs.location === 'c' || inputs.location === 'd') risks.push('Lower-grade location may have higher tenant turnover');
  if (inputs.condition === 'poor') risks.push('Poor property condition may require significant repairs');
  if (inputs.marketCondition === 'declining') risks.push('Declining market may reduce property value');
  
  return risks;
}

function identifyOpportunities(inputs: RealEstateInvestmentInputs, marketValue: number, appreciationGain: number): string[] {
  const opportunities = [];
  
  if (inputs.appreciationRate > 4) opportunities.push('Strong appreciation potential in growing market');
  if (inputs.renovationCosts && inputs.renovationCosts > 0) opportunities.push('Renovation potential to increase property value');
  if (inputs.shortTermRental) opportunities.push('Short-term rental potential for higher income');
  if (inputs.airbnbPotential) opportunities.push('Airbnb potential for premium rental rates');
  if (inputs.section1031) opportunities.push('1031 exchange potential for tax-deferred growth');
  
  return opportunities;
}

function generateMarketComparison(inputs: RealEstateInvestmentInputs, cashOnCashReturn: number, capRate: number, grm: number): any[] {
  const marketAverages = {
    'single-family': { cashOnCash: 6.5, capRate: 5.8, grm: 15.2 },
    'multi-family': { cashOnCash: 7.2, capRate: 6.1, grm: 14.8 },
    'condo': { cashOnCash: 5.8, capRate: 5.2, grm: 16.5 },
    'commercial': { cashOnCash: 8.1, capRate: 6.8, grm: 13.2 }
  };
  
  const averages = marketAverages[inputs.propertyType as keyof typeof marketAverages] || marketAverages['single-family'];
  
  return [
    {
      metric: 'Cash-on-Cash Return',
      yourProperty: cashOnCashReturn,
      marketAverage: averages.cashOnCash,
      percentile: cashOnCashReturn > averages.cashOnCash ? 75 : 25
    },
    {
      metric: 'Cap Rate',
      yourProperty: capRate,
      marketAverage: averages.capRate,
      percentile: capRate > averages.capRate ? 70 : 30
    },
    {
      metric: 'Gross Rent Multiplier',
      yourProperty: grm,
      marketAverage: averages.grm,
      percentile: grm < averages.grm ? 80 : 20
    }
  ];
}

function generateSensitivityAnalysis(inputs: RealEstateInvestmentInputs, cashOnCashReturn: number, totalROI: number): any[] {
  return [
    {
      scenario: 'Optimistic (High Rent, Low Vacancy)',
      cashOnCashReturn: cashOnCashReturn * 1.3,
      totalROI: totalROI * 1.25,
      riskLevel: 'Low'
    },
    {
      scenario: 'Base Case',
      cashOnCashReturn: cashOnCashReturn,
      totalROI: totalROI,
      riskLevel: 'Moderate'
    },
    {
      scenario: 'Pessimistic (Low Rent, High Vacancy)',
      cashOnCashReturn: cashOnCashReturn * 0.7,
      totalROI: totalROI * 0.75,
      riskLevel: 'High'
    }
  ];
}
