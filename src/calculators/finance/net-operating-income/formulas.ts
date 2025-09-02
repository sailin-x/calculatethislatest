import { NetOperatingIncomeInputs, NetOperatingIncomeOutputs, NetOperatingIncomeAnalysis, NetOperatingIncomeMetrics } from './types';

export function calculateNetOperatingIncome(inputs: NetOperatingIncomeInputs): NetOperatingIncomeOutputs {
  // Calculate total gross income
  const totalGrossIncome = calculateTotalGrossIncome(inputs);
  
  // Calculate vacancy and credit losses
  const vacancyLoss = totalGrossIncome * (inputs.vacancyRate / 100);
  const creditLoss = totalGrossIncome * (inputs.creditLossRate / 100);
  
  // Calculate effective gross income
  const effectiveGrossIncome = totalGrossIncome - vacancyLoss - creditLoss;
  
  // Calculate net rental income
  const netRentalIncome = effectiveGrossIncome;
  
  // Calculate total operating expenses
  const totalOperatingExpenses = calculateTotalOperatingExpenses(inputs);
  
  // Calculate total capital expenditures
  const totalCapitalExpenditures = calculateTotalCapitalExpenditures(inputs);
  
  // Calculate total expenses
  const totalExpenses = totalOperatingExpenses + totalCapitalExpenditures;
  
  // Calculate Net Operating Income
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;
  
  // Calculate NOI margin
  const noiMargin = effectiveGrossIncome > 0 ? (netOperatingIncome / effectiveGrossIncome) * 100 : 0;
  
  // Calculate NOI per square foot
  const noiPerSquareFoot = inputs.propertySize > 0 ? netOperatingIncome / inputs.propertySize : 0;
  
  // Calculate NOI per unit (assuming 1 unit for non-multifamily properties)
  const noiPerUnit = netOperatingIncome; // Simplified for now
  
  // Calculate performance ratios
  const expenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;
  const incomeRatio = effectiveGrossIncome > 0 ? (netRentalIncome / effectiveGrossIncome) * 100 : 0;
  const vacancyLossRatio = totalGrossIncome > 0 ? (vacancyLoss / totalGrossIncome) * 100 : 0;
  const creditLossRatio = totalGrossIncome > 0 ? (creditLoss / totalGrossIncome) * 100 : 0;
  
  // Calculate efficiency metrics
  const operatingEfficiency = effectiveGrossIncome > 0 ? (netOperatingIncome / effectiveGrossIncome) * 100 : 0;
  const expenseEfficiency = totalOperatingExpenses > 0 ? (netOperatingIncome / totalOperatingExpenses) * 100 : 0;
  const incomeEfficiency = totalGrossIncome > 0 ? (effectiveGrossIncome / totalGrossIncome) * 100 : 0;
  
  // Calculate market comparison metrics
  const noiVsMarket = inputs.comparableNOI > 0 ? ((netOperatingIncome - inputs.comparableNOI) / inputs.comparableNOI) * 100 : 0;
  const efficiencyVsMarket = inputs.comparableCapRate > 0 ? ((noiMargin - inputs.comparableCapRate) / inputs.comparableCapRate) * 100 : 0;
  
  // Determine market position
  const marketPosition = determineMarketPosition(noiVsMarket, efficiencyVsMarket);
  
  // Calculate trend analysis
  const noiTrend = determineNOITrend(inputs);
  const projectedNOI = calculateProjectedNOI(netOperatingIncome, inputs);
  const noiGrowthRate = calculateNOIGrowthRate(netOperatingIncome, projectedNOI, inputs.analysisPeriod);
  
  // Calculate sensitivity analysis
  const incomeSensitivity = calculateIncomeSensitivity(netOperatingIncome, effectiveGrossIncome);
  const expenseSensitivity = calculateExpenseSensitivity(netOperatingIncome, totalOperatingExpenses);
  const vacancySensitivity = calculateVacancySensitivity(netOperatingIncome, totalGrossIncome, inputs.vacancyRate);
  const breakEvenVacancy = calculateBreakEvenVacancy(totalGrossIncome, totalOperatingExpenses, inputs.vacancyRate);
  
  // Generate detailed analysis
  const analysis = generateAnalysis(inputs, {
    netOperatingIncome,
    noiMargin,
    effectiveGrossIncome,
    totalOperatingExpenses,
    noiVsMarket,
    efficiencyVsMarket,
    marketPosition,
    noiTrend,
    projectedNOI,
    incomeSensitivity,
    expenseSensitivity,
    vacancySensitivity,
    breakEvenVacancy
  });
  
  // Calculate metrics
  const metrics: NetOperatingIncomeMetrics = {
    totalGrossIncome,
    effectiveGrossIncome,
    vacancyLoss,
    creditLoss,
    netRentalIncome,
    totalOperatingExpenses,
    totalCapitalExpenditures,
    totalExpenses,
    netOperatingIncome,
    noiMargin,
    noiPerSquareFoot,
    noiPerUnit,
    expenseRatio,
    incomeRatio,
    vacancyLossRatio,
    creditLossRatio,
    operatingEfficiency,
    expenseEfficiency,
    incomeEfficiency
  };
  
  // Generate breakdowns
  const incomeBreakdown = generateIncomeBreakdown(inputs, totalGrossIncome);
  const expenseBreakdown = generateExpenseBreakdown(inputs, totalOperatingExpenses);
  const capitalExpenditureBreakdown = generateCapitalExpenditureBreakdown(inputs, totalCapitalExpenditures);
  
  // Generate projections
  const projections = generateProjections(inputs, netOperatingIncome, effectiveGrossIncome, totalOperatingExpenses);
  
  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs, netOperatingIncome, noiMargin);
  
  return {
    netOperatingIncome,
    noiMargin,
    noiPerSquareFoot,
    noiPerUnit,
    totalGrossIncome,
    effectiveGrossIncome,
    vacancyLoss,
    creditLoss,
    netRentalIncome,
    totalOperatingExpenses,
    totalCapitalExpenditures,
    totalExpenses,
    expenseRatio,
    incomeRatio,
    vacancyLossRatio,
    creditLossRatio,
    operatingEfficiency,
    noiVsMarket,
    efficiencyVsMarket,
    marketPosition,
    noiTrend,
    projectedNOI,
    noiGrowthRate,
    incomeSensitivity,
    expenseSensitivity,
    vacancySensitivity,
    breakEvenVacancy,
    analysis,
    metrics,
    incomeBreakdown,
    expenseBreakdown,
    capitalExpenditureBreakdown,
    projections,
    sensitivityMatrix
  };
}

function calculateTotalGrossIncome(inputs: NetOperatingIncomeInputs): number {
  return (
    inputs.grossRentalIncome +
    inputs.otherIncome +
    inputs.lateFeeIncome +
    inputs.parkingIncome +
    inputs.storageIncome +
    inputs.laundryIncome +
    inputs.vendingIncome +
    inputs.advertisingIncome +
    inputs.utilityReimbursement +
    inputs.petFees +
    inputs.applicationFees +
    inputs.leaseTerminationFees +
    inputs.otherMiscellaneousIncome
  );
}

function calculateTotalOperatingExpenses(inputs: NetOperatingIncomeInputs): number {
  return (
    inputs.propertyManagementFees +
    inputs.propertyTaxes +
    inputs.propertyInsurance +
    inputs.utilities +
    inputs.maintenanceAndRepairs +
    inputs.landscaping +
    inputs.janitorial +
    inputs.security +
    inputs.pestControl +
    inputs.trashRemoval +
    inputs.snowRemoval +
    inputs.advertising +
    inputs.legalFees +
    inputs.accountingFees +
    inputs.professionalServices +
    inputs.licensesAndPermits +
    inputs.supplies +
    inputs.equipmentRental +
    inputs.contractServices +
    inputs.otherOperatingExpenses
  );
}

function calculateTotalCapitalExpenditures(inputs: NetOperatingIncomeInputs): number {
  return (
    inputs.roofReplacement +
    inputs.hvacReplacement +
    inputs.plumbingReplacement +
    inputs.electricalReplacement +
    inputs.flooringReplacement +
    inputs.painting +
    inputs.applianceReplacement +
    inputs.structuralRepairs +
    inputs.otherCapitalExpenditures
  );
}

function determineMarketPosition(noiVsMarket: number, efficiencyVsMarket: number): string {
  if (noiVsMarket > 10 && efficiencyVsMarket > 10) {
    return 'Market Leader';
  } else if (noiVsMarket > 5 && efficiencyVsMarket > 5) {
    return 'Above Market';
  } else if (noiVsMarket > -5 && efficiencyVsMarket > -5) {
    return 'Market Average';
  } else if (noiVsMarket > -10 && efficiencyVsMarket > -10) {
    return 'Below Market';
  } else {
    return 'Market Laggard';
  }
}

function determineNOITrend(inputs: NetOperatingIncomeInputs): string {
  if (inputs.incomeGrowthRate > inputs.expenseGrowthRate + 2) {
    return 'increasing';
  } else if (inputs.incomeGrowthRate < inputs.expenseGrowthRate - 2) {
    return 'decreasing';
  } else {
    return 'stable';
  }
}

function calculateProjectedNOI(currentNOI: number, inputs: NetOperatingIncomeInputs): number {
  const netGrowthRate = inputs.incomeGrowthRate - inputs.expenseGrowthRate;
  return currentNOI * Math.pow(1 + netGrowthRate / 100, inputs.analysisPeriod);
}

function calculateNOIGrowthRate(currentNOI: number, projectedNOI: number, years: number): number {
  if (currentNOI <= 0 || years <= 0) return 0;
  return (Math.pow(projectedNOI / currentNOI, 1 / years) - 1) * 100;
}

function calculateIncomeSensitivity(noi: number, effectiveGrossIncome: number): number {
  if (effectiveGrossIncome <= 0) return 0;
  return (noi / effectiveGrossIncome) * 100;
}

function calculateExpenseSensitivity(noi: number, totalOperatingExpenses: number): number {
  if (totalOperatingExpenses <= 0) return 0;
  return (noi / totalOperatingExpenses) * 100;
}

function calculateVacancySensitivity(noi: number, totalGrossIncome: number, vacancyRate: number): number {
  if (totalGrossIncome <= 0 || vacancyRate <= 0) return 0;
  const vacancyLoss = totalGrossIncome * (vacancyRate / 100);
  return (noi / vacancyLoss) * 100;
}

function calculateBreakEvenVacancy(totalGrossIncome: number, totalOperatingExpenses: number, currentVacancyRate: number): number {
  if (totalGrossIncome <= 0) return 0;
  const breakEvenIncome = totalOperatingExpenses;
  const breakEvenVacancyRate = ((totalGrossIncome - breakEvenIncome) / totalGrossIncome) * 100;
  return Math.max(0, Math.min(100, breakEvenVacancyRate));
}

function generateAnalysis(inputs: NetOperatingIncomeInputs, metrics: any): NetOperatingIncomeAnalysis {
  const noiRating = determineNOIRating(metrics.noiMargin);
  const efficiencyRating = determineEfficiencyRating(metrics.operatingEfficiency);
  const marketRating = determineMarketRating(metrics.noiVsMarket);
  const confidenceRating = determineConfidenceRating(inputs);
  
  const recommendation = generateRecommendation(noiRating, efficiencyRating, marketRating, metrics);
  const keyStrengths = generateKeyStrengths(metrics, inputs);
  const keyWeaknesses = generateKeyWeaknesses(metrics, inputs);
  const improvementOpportunities = generateImprovementOpportunities(metrics, inputs);
  const riskFactors = generateRiskFactors(metrics, inputs);
  
  return {
    recommendation,
    noiRating,
    efficiencyRating,
    marketRating,
    confidenceRating,
    keyStrengths,
    keyWeaknesses,
    improvementOpportunities,
    riskFactors,
    marketComparison: {
      noiVsMarket: metrics.noiVsMarket,
      efficiencyVsMarket: metrics.efficiencyVsMarket,
      marketPosition: metrics.marketPosition
    },
    trendAnalysis: {
      noiTrend: metrics.noiTrend,
      expenseTrend: inputs.expenseGrowthRate > inputs.incomeGrowthRate ? 'increasing' : 'stable',
      incomeTrend: inputs.incomeGrowthRate > inputs.expenseGrowthRate ? 'increasing' : 'stable',
      projectedNOI: metrics.projectedNOI
    },
    sensitivityAnalysis: {
      incomeSensitivity: metrics.incomeSensitivity,
      expenseSensitivity: metrics.expenseSensitivity,
      vacancySensitivity: metrics.vacancySensitivity,
      breakEvenVacancy: metrics.breakEvenVacancy
    }
  };
}

function determineNOIRating(noiMargin: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (noiMargin >= 70) return 'excellent';
  if (noiMargin >= 50) return 'good';
  if (noiMargin >= 30) return 'fair';
  return 'poor';
}

function determineEfficiencyRating(operatingEfficiency: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (operatingEfficiency >= 60) return 'excellent';
  if (operatingEfficiency >= 40) return 'good';
  if (operatingEfficiency >= 20) return 'fair';
  return 'poor';
}

function determineMarketRating(noiVsMarket: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (noiVsMarket >= 15) return 'excellent';
  if (noiVsMarket >= 5) return 'good';
  if (noiVsMarket >= -5) return 'fair';
  return 'poor';
}

function determineConfidenceRating(inputs: NetOperatingIncomeInputs): 'high' | 'medium' | 'low' {
  // Simple confidence rating based on data completeness
  const requiredFields = [
    inputs.grossRentalIncome,
    inputs.propertyTaxes,
    inputs.propertyInsurance,
    inputs.utilities,
    inputs.maintenanceAndRepairs
  ];
  
  const filledFields = requiredFields.filter(field => field > 0).length;
  const completeness = filledFields / requiredFields.length;
  
  if (completeness >= 0.8) return 'high';
  if (completeness >= 0.6) return 'medium';
  return 'low';
}

function generateRecommendation(noiRating: string, efficiencyRating: string, marketRating: string, metrics: any): string {
  if (noiRating === 'excellent' && efficiencyRating === 'excellent' && marketRating === 'excellent') {
    return 'Excellent performance - Maintain current operations and consider expansion opportunities';
  } else if (noiRating === 'good' && efficiencyRating === 'good') {
    return 'Good performance - Focus on operational efficiency improvements';
  } else if (noiRating === 'fair' || efficiencyRating === 'fair') {
    return 'Fair performance - Implement cost reduction strategies and revenue optimization';
  } else {
    return 'Poor performance - Requires immediate attention to operations and market positioning';
  }
}

function generateKeyStrengths(metrics: any, inputs: NetOperatingIncomeInputs): string[] {
  const strengths: string[] = [];
  
  if (metrics.noiMargin >= 50) {
    strengths.push('Strong NOI margin indicates good profitability');
  }
  if (metrics.operatingEfficiency >= 40) {
    strengths.push('High operating efficiency shows good expense management');
  }
  if (metrics.noiVsMarket > 5) {
    strengths.push('Above-market NOI performance');
  }
  if (inputs.vacancyRate <= 5) {
    strengths.push('Low vacancy rate indicates strong tenant demand');
  }
  if (inputs.propertyClass === 'class_a') {
    strengths.push('Class A property typically commands premium rents');
  }
  
  return strengths.length > 0 ? strengths : ['Property has potential for improvement'];
}

function generateKeyWeaknesses(metrics: any, inputs: NetOperatingIncomeInputs): string[] {
  const weaknesses: string[] = [];
  
  if (metrics.noiMargin < 30) {
    weaknesses.push('Low NOI margin indicates poor profitability');
  }
  if (metrics.operatingEfficiency < 20) {
    weaknesses.push('Low operating efficiency suggests high expenses');
  }
  if (metrics.noiVsMarket < -5) {
    weaknesses.push('Below-market NOI performance');
  }
  if (inputs.vacancyRate > 10) {
    weaknesses.push('High vacancy rate indicates weak tenant demand');
  }
  if (inputs.propertyClass === 'class_c' || inputs.propertyClass === 'class_d') {
    weaknesses.push('Lower property class may limit rental income potential');
  }
  
  return weaknesses.length > 0 ? weaknesses : ['No major weaknesses identified'];
}

function generateImprovementOpportunities(metrics: any, inputs: NetOperatingIncomeInputs): string[] {
  const opportunities: string[] = [];
  
  if (metrics.vacancyLossRatio > 5) {
    opportunities.push('Reduce vacancy rate through better marketing and tenant retention');
  }
  if (metrics.expenseRatio > 60) {
    opportunities.push('Optimize operating expenses through vendor negotiations');
  }
  if (inputs.propertyCondition === 'fair' || inputs.propertyCondition === 'poor') {
    opportunities.push('Property improvements could justify rent increases');
  }
  if (metrics.incomeSensitivity < 50) {
    opportunities.push('Explore additional income streams (parking, storage, etc.)');
  }
  
  return opportunities.length > 0 ? opportunities : ['Maintain current performance levels'];
}

function generateRiskFactors(metrics: any, inputs: NetOperatingIncomeInputs): string[] {
  const risks: string[] = [];
  
  if (inputs.vacancyRate > 10) {
    risks.push('High vacancy risk could further reduce income');
  }
  if (inputs.marketCondition === 'declining') {
    risks.push('Declining market conditions may impact future performance');
  }
  if (metrics.breakEvenVacancy < 5) {
    risks.push('Low break-even vacancy rate indicates vulnerability to market changes');
  }
  if (inputs.propertyAge > 20) {
    risks.push('Older property may require increased maintenance costs');
  }
  
  return risks.length > 0 ? risks : ['Standard market risks apply'];
}

function generateIncomeBreakdown(inputs: NetOperatingIncomeInputs, totalGrossIncome: number) {
  const breakdown = [
    { category: 'Gross Rental Income', amount: inputs.grossRentalIncome, percentage: (inputs.grossRentalIncome / totalGrossIncome) * 100 },
    { category: 'Other Income', amount: inputs.otherIncome, percentage: (inputs.otherIncome / totalGrossIncome) * 100 },
    { category: 'Parking Income', amount: inputs.parkingIncome, percentage: (inputs.parkingIncome / totalGrossIncome) * 100 },
    { category: 'Storage Income', amount: inputs.storageIncome, percentage: (inputs.storageIncome / totalGrossIncome) * 100 },
    { category: 'Laundry Income', amount: inputs.laundryIncome, percentage: (inputs.laundryIncome / totalGrossIncome) * 100 },
    { category: 'Late Fees', amount: inputs.lateFeeIncome, percentage: (inputs.lateFeeIncome / totalGrossIncome) * 100 },
    { category: 'Utility Reimbursement', amount: inputs.utilityReimbursement, percentage: (inputs.utilityReimbursement / totalGrossIncome) * 100 },
    { category: 'Pet Fees', amount: inputs.petFees, percentage: (inputs.petFees / totalGrossIncome) * 100 },
    { category: 'Application Fees', amount: inputs.applicationFees, percentage: (inputs.applicationFees / totalGrossIncome) * 100 },
    { category: 'Other Miscellaneous', amount: inputs.otherMiscellaneousIncome, percentage: (inputs.otherMiscellaneousIncome / totalGrossIncome) * 100 }
  ];
  
  return breakdown.filter(item => item.amount > 0);
}

function generateExpenseBreakdown(inputs: NetOperatingIncomeInputs, totalOperatingExpenses: number) {
  const breakdown = [
    { category: 'Property Taxes', amount: inputs.propertyTaxes, percentage: (inputs.propertyTaxes / totalOperatingExpenses) * 100 },
    { category: 'Property Insurance', amount: inputs.propertyInsurance, percentage: (inputs.propertyInsurance / totalOperatingExpenses) * 100 },
    { category: 'Utilities', amount: inputs.utilities, percentage: (inputs.utilities / totalOperatingExpenses) * 100 },
    { category: 'Maintenance & Repairs', amount: inputs.maintenanceAndRepairs, percentage: (inputs.maintenanceAndRepairs / totalOperatingExpenses) * 100 },
    { category: 'Property Management', amount: inputs.propertyManagementFees, percentage: (inputs.propertyManagementFees / totalOperatingExpenses) * 100 },
    { category: 'Janitorial', amount: inputs.janitorial, percentage: (inputs.janitorial / totalOperatingExpenses) * 100 },
    { category: 'Security', amount: inputs.security, percentage: (inputs.security / totalOperatingExpenses) * 100 },
    { category: 'Landscaping', amount: inputs.landscaping, percentage: (inputs.landscaping / totalOperatingExpenses) * 100 },
    { category: 'Advertising', amount: inputs.advertising, percentage: (inputs.advertising / totalOperatingExpenses) * 100 },
    { category: 'Legal & Accounting', amount: inputs.legalFees + inputs.accountingFees, percentage: ((inputs.legalFees + inputs.accountingFees) / totalOperatingExpenses) * 100 },
    { category: 'Other Operating', amount: inputs.otherOperatingExpenses, percentage: (inputs.otherOperatingExpenses / totalOperatingExpenses) * 100 }
  ];
  
  return breakdown.filter(item => item.amount > 0);
}

function generateCapitalExpenditureBreakdown(inputs: NetOperatingIncomeInputs, totalCapitalExpenditures: number) {
  const breakdown = [
    { category: 'Roof Replacement', amount: inputs.roofReplacement, percentage: (inputs.roofReplacement / totalCapitalExpenditures) * 100 },
    { category: 'HVAC Replacement', amount: inputs.hvacReplacement, percentage: (inputs.hvacReplacement / totalCapitalExpenditures) * 100 },
    { category: 'Plumbing Replacement', amount: inputs.plumbingReplacement, percentage: (inputs.plumbingReplacement / totalCapitalExpenditures) * 100 },
    { category: 'Electrical Replacement', amount: inputs.electricalReplacement, percentage: (inputs.electricalReplacement / totalCapitalExpenditures) * 100 },
    { category: 'Flooring Replacement', amount: inputs.flooringReplacement, percentage: (inputs.flooringReplacement / totalCapitalExpenditures) * 100 },
    { category: 'Painting', amount: inputs.painting, percentage: (inputs.painting / totalCapitalExpenditures) * 100 },
    { category: 'Appliance Replacement', amount: inputs.applianceReplacement, percentage: (inputs.applianceReplacement / totalCapitalExpenditures) * 100 },
    { category: 'Structural Repairs', amount: inputs.structuralRepairs, percentage: (inputs.structuralRepairs / totalCapitalExpenditures) * 100 },
    { category: 'Other CapEx', amount: inputs.otherCapitalExpenditures, percentage: (inputs.otherCapitalExpenditures / totalCapitalExpenditures) * 100 }
  ];
  
  return breakdown.filter(item => item.amount > 0);
}

function generateProjections(inputs: NetOperatingIncomeInputs, currentNOI: number, currentIncome: number, currentExpenses: number) {
  const projections = [];
  
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const projectedIncome = currentIncome * Math.pow(1 + inputs.incomeGrowthRate / 100, year);
    const projectedExpenses = currentExpenses * Math.pow(1 + inputs.expenseGrowthRate / 100, year);
    const projectedNOI = projectedIncome - projectedExpenses;
    const projectedNOIMargin = projectedIncome > 0 ? (projectedNOI / projectedIncome) * 100 : 0;
    
    projections.push({
      year,
      grossIncome: projectedIncome,
      operatingExpenses: projectedExpenses,
      noi: projectedNOI,
      noiMargin: projectedNOIMargin
    });
  }
  
  return projections;
}

function generateSensitivityMatrix(inputs: NetOperatingIncomeInputs, baseNOI: number, baseNOIMargin: number) {
  const scenarios = [
    { scenario: 'Base Case', noi: baseNOI, noiMargin: baseNOIMargin, change: 0 },
    { scenario: 'Income +10%', noi: baseNOI * 1.1, noiMargin: baseNOIMargin * 1.1, change: 10 },
    { scenario: 'Income -10%', noi: baseNOI * 0.9, noiMargin: baseNOIMargin * 0.9, change: -10 },
    { scenario: 'Expenses +10%', noi: baseNOI * 0.9, noiMargin: baseNOIMargin * 0.9, change: -10 },
    { scenario: 'Expenses -10%', noi: baseNOI * 1.1, noiMargin: baseNOIMargin * 1.1, change: 10 },
    { scenario: 'Vacancy +5%', noi: baseNOI * 0.95, noiMargin: baseNOIMargin * 0.95, change: -5 },
    { scenario: 'Vacancy -5%', noi: baseNOI * 1.05, noiMargin: baseNOIMargin * 1.05, change: 5 }
  ];
  
  return scenarios;
}