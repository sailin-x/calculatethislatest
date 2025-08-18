import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factor adjustments
const MARKET_FACTORS = {
  'business': 1.0,
  'leisure': 0.9,
  'mixed': 1.05,
  'convention': 1.1,
  'airport': 0.95,
  'resort': 0.85
};

// Location factor adjustments
const LOCATION_FACTORS = {
  'urban': 1.0,
  'suburban': 0.9,
  'airport': 0.95,
  'resort': 0.85,
  'highway': 0.8,
  'downtown': 1.1,
  'business-district': 1.05
};

// Seasonality adjustments
const SEASONALITY_FACTORS = {
  'low': 0.95,
  'moderate': 1.0,
  'high': 0.9,
  'extreme': 0.8
};

// Competition level adjustments
const COMPETITION_FACTORS = {
  'low': 1.1,
  'medium': 1.0,
  'high': 0.9,
  'very-high': 0.8
};

// Market demand adjustments
const DEMAND_FACTORS = {
  'weak': 0.8,
  'moderate': 0.9,
  'strong': 1.0,
  'very-strong': 1.1
};

// Additional revenue multipliers by source
const ADDITIONAL_REVENUE_MULTIPLIERS = {
  'restaurant': 0.15,
  'bar': 0.08,
  'spa': 0.12,
  'fitness-center': 0.03,
  'conference-rooms': 0.20,
  'parking': 0.05,
  'shuttle-service': 0.02,
  'gift-shop': 0.03,
  'laundry-service': 0.02,
  'room-service': 0.10
};

// Helper function to calculate monthly payment
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Helper function to calculate feasibility score
function calculateFeasibilityScore(
  cashOnCashReturn: number, 
  capRate: number, 
  debtServiceCoverage: number,
  breakEvenOccupancy: number,
  marketDemand: string,
  competitionLevel: string
): number {
  let score = 0;

  // Cash-on-cash return factor (30%)
  if (cashOnCashReturn >= 12) score += 30;
  else if (cashOnCashReturn >= 10) score += 25;
  else if (cashOnCashReturn >= 8) score += 20;
  else if (cashOnCashReturn >= 6) score += 15;
  else if (cashOnCashReturn >= 4) score += 10;
  else score += 5;

  // Cap rate factor (25%)
  if (capRate >= 10) score += 25;
  else if (capRate >= 8) score += 20;
  else if (capRate >= 6) score += 15;
  else if (capRate >= 4) score += 10;
  else score += 5;

  // Debt service coverage factor (20%)
  if (debtServiceCoverage >= 1.5) score += 20;
  else if (debtServiceCoverage >= 1.3) score += 15;
  else if (debtServiceCoverage >= 1.2) score += 10;
  else if (debtServiceCoverage >= 1.1) score += 5;
  else score += 0;

  // Break-even occupancy factor (15%)
  if (breakEvenOccupancy <= 50) score += 15;
  else if (breakEvenOccupancy <= 60) score += 12;
  else if (breakEvenOccupancy <= 70) score += 8;
  else if (breakEvenOccupancy <= 80) score += 4;
  else score += 0;

  // Market demand factor (10%)
  const demandFactor = DEMAND_FACTORS[marketDemand] || 1.0;
  score += demandFactor * 10;

  return Math.min(score, 100);
}

// Helper function to calculate risk score
function calculateRiskScore(
  debtServiceCoverage: number,
  breakEvenOccupancy: number,
  competitionLevel: string,
  seasonality: string,
  marketDemand: string,
  totalInvestment: number
): number {
  let riskScore = 0;

  // Debt service coverage risk
  if (debtServiceCoverage < 1.1) riskScore += 25;
  else if (debtServiceCoverage < 1.3) riskScore += 15;
  else if (debtServiceCoverage < 1.5) riskScore += 10;

  // Break-even occupancy risk
  if (breakEvenOccupancy > 80) riskScore += 20;
  else if (breakEvenOccupancy > 70) riskScore += 15;
  else if (breakEvenOccupancy > 60) riskScore += 10;

  // Competition risk
  if (competitionLevel === 'very-high') riskScore += 20;
  else if (competitionLevel === 'high') riskScore += 15;
  else if (competitionLevel === 'medium') riskScore += 10;

  // Seasonality risk
  if (seasonality === 'extreme') riskScore += 15;
  else if (seasonality === 'high') riskScore += 10;

  // Market demand risk
  if (marketDemand === 'weak') riskScore += 20;
  else if (marketDemand === 'moderate') riskScore += 10;

  return Math.min(riskScore, 100);
}

export function calculateHotelFeasibility(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const totalRooms = inputs.totalRooms || 100;
  const hotelType = inputs.hotelType || 'midscale';
  const starRating = inputs.starRating || '3';
  const location = inputs.location || 'urban';
  const market = inputs.market || 'business';
  const seasonality = inputs.seasonality || 'moderate';
  const competitionLevel = inputs.competitionLevel || 'medium';
  const marketDemand = inputs.marketDemand || 'strong';
  const occupancyRate = inputs.occupancyRate || 75;
  const baseADR = inputs.baseADR || 150;
  const constructionCost = inputs.constructionCost || 150000;
  const landCost = inputs.landCost || 5000000;
  const softCosts = inputs.softCosts || 2000000;
  const furnitureCost = inputs.furnitureCost || 25000;
  const operatingExpenses = inputs.operatingExpenses || 25000;
  const laborCosts = inputs.laborCosts || 35000;
  const utilityCosts = inputs.utilityCosts || 8000;
  const maintenanceCosts = inputs.maintenanceCosts || 5000;
  const insuranceCosts = inputs.insuranceCosts || 3000;
  const propertyTaxes = inputs.propertyTaxes || 4000;
  const managementFees = inputs.managementFees || 3;
  const franchiseFees = inputs.franchiseFees || 5;
  const financingRate = inputs.financingRate || 6.5;
  const loanTerm = inputs.loanTerm || 25;
  const downPayment = inputs.downPayment || 25;
  const taxRate = inputs.taxRate || 25;
  const inflationRate = inputs.inflationRate || 2.5;
  const revenueGrowth = inputs.revenueGrowth || 3;
  const expenseGrowth = inputs.expenseGrowth || 2.5;
  const exitYear = inputs.exitYear || 10;
  const exitCapRate = inputs.exitCapRate || 7;

  // Calculate total investment
  const constructionCostTotal = totalRooms * constructionCost;
  const furnitureCostTotal = totalRooms * furnitureCost;
  const totalProjectCost = landCost + constructionCostTotal + softCosts + furnitureCostTotal;
  const totalInvestment = totalProjectCost;

  // Calculate adjusted ADR based on market factors
  const marketFactor = MARKET_FACTORS[market] || 1.0;
  const locationFactor = LOCATION_FACTORS[location] || 1.0;
  const seasonalityFactor = SEASONALITY_FACTORS[seasonality] || 1.0;
  const competitionFactor = COMPETITION_FACTORS[competitionLevel] || 1.0;
  const demandFactor = DEMAND_FACTORS[marketDemand] || 1.0;

  const adjustedADR = baseADR * marketFactor * locationFactor * seasonalityFactor * 
                     competitionFactor * demandFactor;

  // Calculate annual revenue
  const roomRevenue = totalRooms * (occupancyRate / 100) * adjustedADR * 365;
  
  // Calculate additional revenue
  let additionalRevenue = 0;
  if (inputs.additionalRevenue && Array.isArray(inputs.additionalRevenue)) {
    for (const source of inputs.additionalRevenue) {
      const multiplier = ADDITIONAL_REVENUE_MULTIPLIERS[source] || 0;
      additionalRevenue += roomRevenue * multiplier;
    }
  }

  const annualRevenue = roomRevenue + additionalRevenue;

  // Calculate annual expenses
  const totalOperatingExpenses = totalRooms * (
    operatingExpenses + laborCosts + utilityCosts + maintenanceCosts + 
    insuranceCosts + propertyTaxes
  );

  const managementFeesAmount = annualRevenue * (managementFees / 100);
  const franchiseFeesAmount = annualRevenue * (franchiseFees / 100);
  const annualExpenses = totalOperatingExpenses + managementFeesAmount + franchiseFeesAmount;

  // Calculate NOI
  const netOperatingIncome = annualRevenue - annualExpenses;

  // Calculate financing
  const loanAmount = totalInvestment * (1 - downPayment / 100);
  const equityRequired = totalInvestment * (downPayment / 100);
  const monthlyPayment = calculateMonthlyPayment(loanAmount, financingRate, loanTerm);
  const annualDebtService = monthlyPayment * 12;

  // Calculate cash flow and returns
  const cashFlow = netOperatingIncome - annualDebtService;
  const cashOnCashReturn = (cashFlow / equityRequired) * 100;
  const capRate = (netOperatingIncome / totalInvestment) * 100;
  const debtServiceCoverage = netOperatingIncome / annualDebtService;

  // Calculate break-even metrics
  const breakEvenOccupancy = ((annualExpenses + annualDebtService) / (adjustedADR * 365)) * 100;
  const breakEvenADR = (annualExpenses + annualDebtService) / (totalRooms * (occupancyRate / 100) * 365);

  // Calculate profit margin
  const profitMargin = (cashFlow / annualRevenue) * 100;

  // Calculate IRR (simplified)
  const irr = cashOnCashReturn + (revenueGrowth - expenseGrowth);

  // Calculate payback period
  const paybackPeriod = equityRequired / cashFlow;

  // Calculate exit value
  const exitValue = netOperatingIncome * (1 + revenueGrowth / 100) ** exitYear / (exitCapRate / 100);
  const totalReturn = ((exitValue - equityRequired) / equityRequired) * 100;

  // Calculate scores
  const feasibilityScore = calculateFeasibilityScore(
    cashOnCashReturn, capRate, debtServiceCoverage, breakEvenOccupancy, marketDemand, competitionLevel
  );

  const riskScore = calculateRiskScore(
    debtServiceCoverage, breakEvenOccupancy, competitionLevel, seasonality, marketDemand, totalInvestment
  );

  // Generate recommendation
  let recommendation = 'Proceed with caution';
  if (feasibilityScore >= 80 && riskScore <= 30) recommendation = 'Strong buy recommendation';
  else if (feasibilityScore >= 70 && riskScore <= 40) recommendation = 'Buy recommendation';
  else if (feasibilityScore >= 60 && riskScore <= 50) recommendation = 'Consider with modifications';
  else if (feasibilityScore < 50 || riskScore > 70) recommendation = 'Not recommended';

  // Generate key metrics
  const keyMetrics = `RevPAR: $${(adjustedADR * (occupancyRate / 100)).toFixed(2)} | 
                     ADR: $${adjustedADR.toFixed(2)} | 
                     Occupancy: ${occupancyRate}% | 
                     DSCR: ${debtServiceCoverage.toFixed(2)}`;

  // Generate sensitivity analysis
  const sensitivityAnalysis = `ADR ±10%: ${(cashOnCashReturn * 0.1).toFixed(1)}% | 
                              Occupancy ±10%: ${(cashOnCashReturn * 0.15).toFixed(1)}% | 
                              Expenses ±10%: ${(cashOnCashReturn * 0.08).toFixed(1)}%`;

  return {
    totalInvestment: Math.round(totalInvestment),
    constructionCostTotal: Math.round(constructionCostTotal),
    totalProjectCost: Math.round(totalProjectCost),
    annualRevenue: Math.round(annualRevenue),
    annualExpenses: Math.round(annualExpenses),
    netOperatingIncome: Math.round(netOperatingIncome),
    cashFlow: Math.round(cashFlow),
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    irr: Math.round(irr * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
    breakEvenADR: Math.round(breakEvenADR * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    loanAmount: Math.round(loanAmount),
    monthlyPayment: Math.round(monthlyPayment),
    annualDebtService: Math.round(annualDebtService),
    equityRequired: Math.round(equityRequired),
    exitValue: Math.round(exitValue),
    totalReturn: Math.round(totalReturn * 100) / 100,
    feasibilityScore,
    riskScore,
    recommendation,
    keyMetrics,
    sensitivityAnalysis,
    hotelFeasibilityAnalysis: 'Comprehensive hotel feasibility analysis completed'
  };
}

export function generateHotelFeasibilityAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Hotel Feasibility & ADR Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Feasibility Score:** ${outputs.feasibilityScore}/100
**Risk Score:** ${outputs.riskScore}/100

## Investment Overview
- **Total Investment:** $${outputs.totalInvestment.toLocaleString()}
- **Equity Required:** $${outputs.equityRequired.toLocaleString()}
- **Loan Amount:** $${outputs.loanAmount.toLocaleString()}
- **Monthly Payment:** $${outputs.monthlyPayment.toLocaleString()}

## Financial Performance
- **Annual Revenue:** $${outputs.annualRevenue.toLocaleString()}
- **Net Operating Income:** $${outputs.netOperatingIncome.toLocaleString()}
- **Annual Cash Flow:** $${outputs.cashFlow.toLocaleString()}
- **Cash-on-Cash Return:** ${outputs.cashOnCashReturn}%
- **Cap Rate:** ${outputs.capRate}%
- **IRR:** ${outputs.irr}%

## Key Metrics
**${outputs.keyMetrics}**

## Break-Even Analysis
- **Break-Even Occupancy:** ${outputs.breakEvenOccupancy}%
- **Break-Even ADR:** $${outputs.breakEvenADR.toFixed(2)}
- **Debt Service Coverage:** ${outputs.debtServiceCoverage}
- **Payback Period:** ${outputs.paybackPeriod} years

## Risk Assessment
- **Risk Score:** ${outputs.riskScore}/100
- **Profit Margin:** ${outputs.profitMargin}%
- **Sensitivity Analysis:** ${outputs.sensitivityAnalysis}

## Exit Strategy
- **Exit Year:** ${inputs.exitYear || 10} years
- **Exit Value:** $${outputs.exitValue.toLocaleString()}
- **Total Return:** ${outputs.totalReturn}%

## Next Steps
1. Conduct detailed market analysis
2. Review competitive landscape
3. Validate construction costs
4. Secure financing commitments
5. Develop operational plan
6. Consider franchise options
7. Plan for market fluctuations`;
}
