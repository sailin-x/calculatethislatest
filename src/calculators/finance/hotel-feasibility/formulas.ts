import { HotelFeasibilityInputs, HotelFeasibilityOutputs, FinancialProjection } from './types';

export function calculateHotelFeasibility(inputs: HotelFeasibilityInputs): HotelFeasibilityOutputs {
  // Calculate total revenue
  const totalRevenue = inputs.roomRevenue + inputs.foodBeverageRevenue + 
                      inputs.meetingSpaceRevenue + inputs.otherRevenue;
  
  // Calculate total operating expenses
  const totalLaborCosts = Object.values(inputs.laborCosts).reduce((sum, cost) => sum + cost, 0);
  const totalUtilityCosts = Object.values(inputs.utilityCosts).reduce((sum, cost) => sum + cost, 0);
  const totalMaintenanceCosts = Object.values(inputs.maintenanceCosts).reduce((sum, cost) => sum + cost, 0);
  const totalInsuranceCosts = Object.values(inputs.insuranceCosts).reduce((sum, cost) => sum + cost, 0);
  const totalMarketingCosts = Object.values(inputs.marketingCosts).reduce((sum, cost) => sum + cost, 0);
  const totalOtherOperatingCosts = Object.values(inputs.otherOperatingCosts).reduce((sum, cost) => sum + cost, 0);
  
  const totalOperatingExpenses = totalLaborCosts + totalUtilityCosts + totalMaintenanceCosts + 
                                totalInsuranceCosts + totalMarketingCosts + totalOtherOperatingCosts;
  
  // Calculate net operating income
  const netOperatingIncome = totalRevenue - totalOperatingExpenses;
  
  // Calculate debt service
  const monthlyRate = inputs.interestRate / 12;
  const totalPayments = inputs.loanTerm * 12;
  const debtService = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                     (Math.pow(1 + monthlyRate, totalPayments) - 1) * 12;
  
  // Calculate cash flow
  const cashFlow = netOperatingIncome - debtService;
  
  // Calculate profit margin
  const profitMargin = (netOperatingIncome / totalRevenue) * 100;
  
  // Calculate key performance indicators
  const averageDailyRate = calculateWeightedADR(inputs);
  const occupancyRate = inputs.projectedOccupancy;
  const revenuePerAvailableRoom = (averageDailyRate * occupancyRate) / 100;
  const averageRevenuePerUser = totalRevenue / (inputs.totalRooms * occupancyRate / 100 * 365);
  const costPerOccupiedRoom = totalOperatingExpenses / (inputs.totalRooms * occupancyRate / 100 * 365);
  const grossOperatingProfit = totalRevenue - totalOperatingExpenses;
  const grossOperatingProfitMargin = (grossOperatingProfit / totalRevenue) * 100;
  
  // Calculate investment analysis
  const totalInvestment = inputs.acquisitionCost + inputs.renovationCost + 
                         inputs.furnitureFixturesEquipment + inputs.workingCapital;
  
  const netPresentValue = calculateNPV(cashFlow, inputs.interestRate, 10);
  const internalRateOfReturn = calculateIRR(totalInvestment, cashFlow, 10);
  const paybackPeriod = totalInvestment / cashFlow;
  const returnOnInvestment = (netOperatingIncome / totalInvestment) * 100;
  const returnOnEquity = (cashFlow / inputs.equityContribution) * 100;
  
  // Market analysis
  const marketPosition = analyzeMarketPosition(averageDailyRate, inputs.averageMarketADR);
  const competitivePosition = analyzeCompetitivePosition(inputs);
  const marketShare = calculateMarketShare(inputs);
  const priceElasticity = calculatePriceElasticity(inputs);
  
  // Risk assessment
  const overallRiskScore = calculateOverallRiskScore(inputs);
  const riskFactors = identifyRiskFactors(inputs);
  const riskMitigationStrategies = generateRiskMitigationStrategies(inputs);
  
  // Sensitivity analysis
  const breakevenOccupancy = calculateBreakevenOccupancy(totalOperatingExpenses, averageDailyRate, inputs.totalRooms);
  const breakevenADR = calculateBreakevenADR(totalOperatingExpenses, occupancyRate, inputs.totalRooms);
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs);
  
  // Generate recommendations
  const feasibilityRecommendation = determineFeasibility(cashFlow, returnOnInvestment, overallRiskScore);
  const keyRecommendations = generateKeyRecommendations(inputs, cashFlow, returnOnInvestment);
  const operationalRecommendations = generateOperationalRecommendations(inputs);
  const financialRecommendations = generateFinancialRecommendations(inputs, cashFlow);
  const marketingRecommendations = generateMarketingRecommendations(inputs);
  
  // Five-year projections
  const fiveYearProjections = generateFiveYearProjections(inputs);
  
  // Summary
  const summary = {
    totalAnnualRevenue: totalRevenue,
    totalAnnualExpenses: totalOperatingExpenses,
    netAnnualIncome: netOperatingIncome,
    keyStrengths: identifyKeyStrengths(inputs),
    keyChallenges: identifyKeyChallenges(inputs),
    nextSteps: generateNextSteps(feasibilityRecommendation)
  };
  
  return {
    totalRevenue,
    totalOperatingExpenses,
    netOperatingIncome,
    debtService,
    cashFlow,
    profitMargin,
    averageDailyRate,
    occupancyRate,
    revenuePerAvailableRoom,
    averageRevenuePerUser,
    costPerOccupiedRoom,
    grossOperatingProfit,
    grossOperatingProfitMargin,
    totalInvestment,
    netPresentValue,
    internalRateOfReturn,
    paybackPeriod,
    returnOnInvestment,
    returnOnEquity,
    marketPosition,
    competitivePosition,
    marketShare,
    priceElasticity,
    overallRiskScore,
    riskFactors,
    riskMitigationStrategies,
    breakevenOccupancy,
    breakevenADR,
    sensitivityAnalysis,
    feasibilityRecommendation,
    keyRecommendations,
    operationalRecommendations,
    financialRecommendations,
    marketingRecommendations,
    fiveYearProjections,
    summary
  };
}

function calculateWeightedADR(inputs: HotelFeasibilityInputs): number {
  const totalRooms = inputs.totalRooms;
  const standardADR = inputs.projectedADR.standard * inputs.roomTypes.standard;
  const deluxeADR = inputs.projectedADR.deluxe * inputs.roomTypes.deluxe;
  const suiteADR = inputs.projectedADR.suite * inputs.roomTypes.suite;
  const presidentialADR = inputs.projectedADR.presidential * inputs.roomTypes.presidential;
  
  return (standardADR + deluxeADR + suiteADR + presidentialADR) / totalRooms;
}

function calculateNPV(cashFlow: number, discountRate: number, years: number): number {
  let npv = 0;
  for (let i = 1; i <= years; i++) {
    npv += cashFlow / Math.pow(1 + discountRate, i);
  }
  return npv;
}

function calculateIRR(initialInvestment: number, annualCashFlow: number, years: number): number {
  // Simplified IRR calculation
  const totalCashFlow = annualCashFlow * years;
  return Math.pow(totalCashFlow / initialInvestment, 1 / years) - 1;
}

function analyzeMarketPosition(projectedADR: number, marketADR: number): 'below_market' | 'at_market' | 'above_market' {
  const difference = (projectedADR - marketADR) / marketADR;
  if (difference < -0.1) return 'below_market';
  if (difference > 0.1) return 'above_market';
  return 'at_market';
}

function analyzeCompetitivePosition(inputs: HotelFeasibilityInputs): 'weak' | 'average' | 'strong' | 'dominant' {
  let score = 50; // Base score
  
  if (inputs.competitionLevel === 'low') score += 20;
  else if (inputs.competitionLevel === 'high') score -= 20;
  
  if (inputs.marketDemand === 'high') score += 15;
  else if (inputs.marketDemand === 'low') score -= 15;
  
  if (inputs.buildingAge < 10) score += 10;
  else if (inputs.buildingAge > 30) score -= 10;
  
  if (score >= 80) return 'dominant';
  if (score >= 60) return 'strong';
  if (score >= 40) return 'average';
  return 'weak';
}

function calculateMarketShare(inputs: HotelFeasibilityInputs): number {
  // Simplified market share calculation
  const totalMarketRooms = inputs.totalRooms * 10; // Assume 10x market size
  return (inputs.totalRooms / totalMarketRooms) * 100;
}

function calculatePriceElasticity(inputs: HotelFeasibilityInputs): number {
  // Simplified price elasticity calculation
  return -1.5; // Typical hotel price elasticity
}

function calculateOverallRiskScore(inputs: HotelFeasibilityInputs): number {
  let score = 50; // Base score
  
  // Market risk
  switch (inputs.marketRisk) {
    case 'low': score -= 10; break;
    case 'moderate': break;
    case 'high': score += 15; break;
    case 'very_high': score += 25; break;
  }
  
  // Operational risk
  switch (inputs.operationalRisk) {
    case 'low': score -= 10; break;
    case 'moderate': break;
    case 'high': score += 15; break;
    case 'very_high': score += 25; break;
  }
  
  // Financial risk
  switch (inputs.financialRisk) {
    case 'low': score -= 10; break;
    case 'moderate': break;
    case 'high': score += 15; break;
    case 'very_high': score += 25; break;
  }
  
  // Regulatory risk
  switch (inputs.regulatoryRisk) {
    case 'low': score -= 5; break;
    case 'moderate': break;
    case 'high': score += 10; break;
    case 'very_high': score += 20; break;
  }
  
  return Math.min(Math.max(score, 1), 100);
}

function identifyRiskFactors(inputs: HotelFeasibilityInputs): string[] {
  const factors: string[] = [];
  
  if (inputs.marketRisk === 'high' || inputs.marketRisk === 'very_high') {
    factors.push('High market risk');
  }
  if (inputs.operationalRisk === 'high' || inputs.operationalRisk === 'very_high') {
    factors.push('High operational risk');
  }
  if (inputs.financialRisk === 'high' || inputs.financialRisk === 'very_high') {
    factors.push('High financial risk');
  }
  if (inputs.regulatoryRisk === 'high' || inputs.regulatoryRisk === 'very_high') {
    factors.push('High regulatory risk');
  }
  if (inputs.competitionLevel === 'high' || inputs.competitionLevel === 'very_high') {
    factors.push('High competition');
  }
  if (inputs.buildingAge > 30) {
    factors.push('Older building requiring maintenance');
  }
  if (inputs.seasonality === 'high' || inputs.seasonality === 'extreme') {
    factors.push('High seasonality');
  }
  
  return factors;
}

function generateRiskMitigationStrategies(inputs: HotelFeasibilityInputs): string[] {
  const strategies: string[] = [];
  
  if (inputs.marketRisk === 'high' || inputs.marketRisk === 'very_high') {
    strategies.push('Diversify revenue streams');
    strategies.push('Develop strong brand positioning');
  }
  if (inputs.operationalRisk === 'high' || inputs.operationalRisk === 'very_high') {
    strategies.push('Implement robust operational systems');
    strategies.push('Invest in staff training');
  }
  if (inputs.financialRisk === 'high' || inputs.financialRisk === 'very_high') {
    strategies.push('Maintain adequate cash reserves');
    strategies.push('Consider insurance coverage');
  }
  if (inputs.seasonality === 'high' || inputs.seasonality === 'extreme') {
    strategies.push('Develop off-season programs');
    strategies.push('Target business travelers');
  }
  
  return strategies;
}

function calculateBreakevenOccupancy(totalExpenses: number, adr: number, totalRooms: number): number {
  return (totalExpenses / (adr * totalRooms * 365)) * 100;
}

function calculateBreakevenADR(totalExpenses: number, occupancy: number, totalRooms: number): number {
  return totalExpenses / (totalRooms * occupancy / 100 * 365);
}

function calculateSensitivityAnalysis(inputs: HotelFeasibilityInputs) {
  return {
    occupancyImpact: 0.15, // 15% impact for 1% occupancy change
    adrImpact: 0.20, // 20% impact for 1% ADR change
    costImpact: -0.10 // -10% impact for 1% cost change
  };
}

function determineFeasibility(cashFlow: number, roi: number, riskScore: number): 'not_feasible' | 'marginal' | 'feasible' | 'highly_feasible' {
  if (cashFlow < 0 || roi < 5 || riskScore > 80) return 'not_feasible';
  if (cashFlow < 50000 || roi < 10 || riskScore > 60) return 'marginal';
  if (cashFlow > 200000 && roi > 15 && riskScore < 40) return 'highly_feasible';
  return 'feasible';
}

function generateKeyRecommendations(inputs: HotelFeasibilityInputs, cashFlow: number, roi: number): string[] {
  const recommendations: string[] = [];
  
  if (cashFlow < 0) {
    recommendations.push('Improve operational efficiency to achieve positive cash flow');
  }
  if (roi < 10) {
    recommendations.push('Optimize revenue management and cost control');
  }
  if (inputs.competitionLevel === 'high') {
    recommendations.push('Develop unique value proposition to differentiate from competitors');
  }
  if (inputs.buildingAge > 20) {
    recommendations.push('Plan for major renovation to maintain competitiveness');
  }
  
  return recommendations;
}

function generateOperationalRecommendations(inputs: HotelFeasibilityInputs): string[] {
  const recommendations: string[] = [];
  
  recommendations.push('Implement revenue management system');
  recommendations.push('Optimize staffing levels based on demand patterns');
  recommendations.push('Develop standard operating procedures');
  recommendations.push('Invest in technology for operational efficiency');
  
  return recommendations;
}

function generateFinancialRecommendations(inputs: HotelFeasibilityInputs, cashFlow: number): string[] {
  const recommendations: string[] = [];
  
  if (cashFlow < 100000) {
    recommendations.push('Review and optimize cost structure');
  }
  recommendations.push('Maintain adequate working capital reserves');
  recommendations.push('Consider refinancing if interest rates improve');
  recommendations.push('Implement regular financial reporting and analysis');
  
  return recommendations;
}

function generateMarketingRecommendations(inputs: HotelFeasibilityInputs): string[] {
  const recommendations: string[] = [];
  
  recommendations.push('Develop strong online presence and digital marketing strategy');
  recommendations.push('Build relationships with corporate clients and travel agents');
  recommendations.push('Implement loyalty program to increase repeat business');
  recommendations.push('Focus on direct bookings to reduce commission costs');
  
  return recommendations;
}

function generateFiveYearProjections(inputs: HotelFeasibilityInputs): {
  year1: FinancialProjection;
  year2: FinancialProjection;
  year3: FinancialProjection;
  year4: FinancialProjection;
  year5: FinancialProjection;
} {
  const baseRevenue = inputs.roomRevenue + inputs.foodBeverageRevenue + inputs.meetingSpaceRevenue + inputs.otherRevenue;
  const baseExpenses = Object.values(inputs.laborCosts).reduce((sum, cost) => sum + cost, 0) +
                      Object.values(inputs.utilityCosts).reduce((sum, cost) => sum + cost, 0) +
                      Object.values(inputs.maintenanceCosts).reduce((sum, cost) => sum + cost, 0) +
                      Object.values(inputs.insuranceCosts).reduce((sum, cost) => sum + cost, 0) +
                      Object.values(inputs.marketingCosts).reduce((sum, cost) => sum + cost, 0) +
                      Object.values(inputs.otherOperatingCosts).reduce((sum, cost) => sum + cost, 0);
  
  const growthRate = 0.03; // 3% annual growth
  
  return {
    year1: {
      revenue: baseRevenue,
      expenses: baseExpenses,
      netIncome: baseRevenue - baseExpenses,
      occupancy: inputs.projectedOccupancy,
      adr: calculateWeightedADR(inputs),
      revpar: (calculateWeightedADR(inputs) * inputs.projectedOccupancy) / 100
    },
    year2: {
      revenue: baseRevenue * (1 + growthRate),
      expenses: baseExpenses * (1 + growthRate * 0.8),
      netIncome: baseRevenue * (1 + growthRate) - baseExpenses * (1 + growthRate * 0.8),
      occupancy: inputs.projectedOccupancy + 2,
      adr: calculateWeightedADR(inputs) * (1 + growthRate),
      revpar: (calculateWeightedADR(inputs) * (1 + growthRate) * (inputs.projectedOccupancy + 2)) / 100
    },
    year3: {
      revenue: baseRevenue * Math.pow(1 + growthRate, 2),
      expenses: baseExpenses * Math.pow(1 + growthRate * 0.8, 2),
      netIncome: baseRevenue * Math.pow(1 + growthRate, 2) - baseExpenses * Math.pow(1 + growthRate * 0.8, 2),
      occupancy: inputs.projectedOccupancy + 3,
      adr: calculateWeightedADR(inputs) * Math.pow(1 + growthRate, 2),
      revpar: (calculateWeightedADR(inputs) * Math.pow(1 + growthRate, 2) * (inputs.projectedOccupancy + 3)) / 100
    },
    year4: {
      revenue: baseRevenue * Math.pow(1 + growthRate, 3),
      expenses: baseExpenses * Math.pow(1 + growthRate * 0.8, 3),
      netIncome: baseRevenue * Math.pow(1 + growthRate, 3) - baseExpenses * Math.pow(1 + growthRate * 0.8, 3),
      occupancy: inputs.projectedOccupancy + 4,
      adr: calculateWeightedADR(inputs) * Math.pow(1 + growthRate, 3),
      revpar: (calculateWeightedADR(inputs) * Math.pow(1 + growthRate, 3) * (inputs.projectedOccupancy + 4)) / 100
    },
    year5: {
      revenue: baseRevenue * Math.pow(1 + growthRate, 4),
      expenses: baseExpenses * Math.pow(1 + growthRate * 0.8, 4),
      netIncome: baseRevenue * Math.pow(1 + growthRate, 4) - baseExpenses * Math.pow(1 + growthRate * 0.8, 4),
      occupancy: inputs.projectedOccupancy + 5,
      adr: calculateWeightedADR(inputs) * Math.pow(1 + growthRate, 4),
      revpar: (calculateWeightedADR(inputs) * Math.pow(1 + growthRate, 4) * (inputs.projectedOccupancy + 5)) / 100
    }
  };
}

function identifyKeyStrengths(inputs: HotelFeasibilityInputs): string[] {
  const strengths: string[] = [];
  
  if (inputs.competitionLevel === 'low') {
    strengths.push('Limited competition in market');
  }
  if (inputs.marketDemand === 'high' || inputs.marketDemand === 'very_high') {
    strengths.push('Strong market demand');
  }
  if (inputs.buildingAge < 10) {
    strengths.push('Modern, well-maintained property');
  }
  if (inputs.totalRooms > 100) {
    strengths.push('Economies of scale with room count');
  }
  
  return strengths;
}

function identifyKeyChallenges(inputs: HotelFeasibilityInputs): string[] {
  const challenges: string[] = [];
  
  if (inputs.competitionLevel === 'high' || inputs.competitionLevel === 'very_high') {
    challenges.push('Intense competition');
  }
  if (inputs.marketDemand === 'low') {
    challenges.push('Weak market demand');
  }
  if (inputs.buildingAge > 30) {
    challenges.push('Older property requiring significant investment');
  }
  if (inputs.seasonality === 'high' || inputs.seasonality === 'extreme') {
    challenges.push('High seasonality affecting cash flow');
  }
  
  return challenges;
}

function generateNextSteps(feasibility: string): string[] {
  const steps: string[] = [];
  
  switch (feasibility) {
    case 'highly_feasible':
      steps.push('Proceed with acquisition');
      steps.push('Secure financing');
      steps.push('Develop detailed business plan');
      break;
    case 'feasible':
      steps.push('Conduct detailed due diligence');
      steps.push('Negotiate purchase terms');
      steps.push('Develop risk mitigation strategies');
      break;
    case 'marginal':
      steps.push('Reconsider investment parameters');
      steps.push('Explore alternative strategies');
      steps.push('Conduct additional market research');
      break;
    case 'not_feasible':
      steps.push('Consider alternative investments');
      steps.push('Reassess market assumptions');
      steps.push('Look for other opportunities');
      break;
  }
  
  return steps;
}
