import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Warehouse type cost factors
const WAREHOUSE_TYPE_FACTORS = {
  'distribution-center': 1.0,
  'fulfillment-center': 1.15,
  'cold-storage': 1.4,
  'bulk-storage': 0.9,
  'cross-dock': 1.1,
  'flex-space': 1.05,
  'manufacturing': 1.2,
  'logistics-hub': 1.1
};

// Location type factors
const LOCATION_FACTORS = {
  'urban': 1.2,
  'suburban': 1.0,
  'rural': 0.8,
  'airport-proximity': 1.15,
  'port-proximity': 1.25,
  'highway-access': 1.1,
  'rail-access': 1.05
};

// Market type factors
const MARKET_FACTORS = {
  'primary': 1.0,
  'secondary': 0.9,
  'tertiary': 0.8,
  'emerging': 0.95,
  'mature': 1.05,
  'declining': 0.7
};

// Competition level factors
const COMPETITION_FACTORS = {
  'low': 1.1,
  'medium': 1.0,
  'high': 0.9,
  'very-high': 0.8
};

// Demand growth factors
const DEMAND_FACTORS = {
  'declining': 0.8,
  'stable': 1.0,
  'growing': 1.1,
  'rapid-growth': 1.25
};

// Energy efficiency factors
const ENERGY_EFFICIENCY_FACTORS = {
  'basic': 1.0,
  'standard': 1.05,
  'efficient': 1.1,
  'green': 1.15,
  'leed-certified': 1.2
};

// Accessibility factors
const ACCESSIBILITY_FACTORS = {
  'excellent': 1.1,
  'good': 1.0,
  'fair': 0.9,
  'poor': 0.8
};

// Infrastructure factors
const INFRASTRUCTURE_FACTORS = {
  'excellent': 1.1,
  'good': 1.0,
  'fair': 0.9,
  'poor': 0.8
};

// Workforce availability factors
const WORKFORCE_FACTORS = {
  'excellent': 1.05,
  'good': 1.0,
  'fair': 0.95,
  'poor': 0.9
};

// Regulatory environment factors
const REGULATORY_FACTORS = {
  'business-friendly': 1.1,
  'moderate': 1.0,
  'restrictive': 0.9,
  'very-restrictive': 0.8
};

// Helper function to calculate monthly payment
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) return principal / totalPayments;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

// Helper function to calculate profitability score
function calculateProfitabilityScore(capRate: number, cashOnCashReturn: number, irr: number): number {
  const capRateScore = Math.min(capRate * 10, 40); // Cap rate contributes up to 40 points
  const cashOnCashScore = Math.min(cashOnCashReturn * 2, 30); // Cash-on-cash contributes up to 30 points
  const irrScore = Math.min(irr * 2, 30); // IRR contributes up to 30 points
  
  return Math.round(capRateScore + cashOnCashScore + irrScore);
}

// Helper function to calculate risk score
function calculateRiskScore(
  marketType: string,
  competitionLevel: string,
  demandGrowth: string,
  vacancyRate: number,
  financingRate: number,
  constructionTime: number,
  regulatoryEnvironment: string
): number {
  let riskScore = 0;
  
  // Market risk (25% weight)
  switch (marketType) {
    case 'primary': riskScore += 5; break;
    case 'secondary': riskScore += 10; break;
    case 'tertiary': riskScore += 15; break;
    case 'emerging': riskScore += 12; break;
    case 'mature': riskScore += 8; break;
    case 'declining': riskScore += 20; break;
    default: riskScore += 10;
  }
  
  // Competition risk (20% weight)
  switch (competitionLevel) {
    case 'low': riskScore += 5; break;
    case 'medium': riskScore += 10; break;
    case 'high': riskScore += 15; break;
    case 'very-high': riskScore += 20; break;
    default: riskScore += 10;
  }
  
  // Demand risk (20% weight)
  switch (demandGrowth) {
    case 'declining': riskScore += 20; break;
    case 'stable': riskScore += 10; break;
    case 'growing': riskScore += 5; break;
    case 'rapid-growth': riskScore += 0; break;
    default: riskScore += 10;
  }
  
  // Vacancy risk (15% weight)
  if (vacancyRate > 15) riskScore += 15;
  else if (vacancyRate > 10) riskScore += 12;
  else if (vacancyRate > 5) riskScore += 8;
  else if (vacancyRate > 2) riskScore += 5;
  else riskScore += 2;
  
  // Financing risk (10% weight)
  if (financingRate > 8) riskScore += 10;
  else if (financingRate > 6) riskScore += 7;
  else if (financingRate > 4) riskScore += 4;
  else riskScore += 2;
  
  // Construction risk (5% weight)
  if (constructionTime > 18) riskScore += 5;
  else if (constructionTime > 12) riskScore += 3;
  else if (constructionTime > 6) riskScore += 2;
  else riskScore += 1;
  
  // Regulatory risk (5% weight)
  switch (regulatoryEnvironment) {
    case 'business-friendly': riskScore += 1; break;
    case 'moderate': riskScore += 3; break;
    case 'restrictive': riskScore += 4; break;
    case 'very-restrictive': riskScore += 5; break;
    default: riskScore += 3;
  }
  
  return Math.min(riskScore, 100);
}

// Helper function to generate recommendation
function generateRecommendation(profitabilityScore: number, riskScore: number, capRate: number): string {
  if (profitabilityScore >= 80 && riskScore <= 20) {
    return 'Excellent investment opportunity with high profitability and low risk. Highly recommended.';
  } else if (profitabilityScore >= 70 && riskScore <= 30) {
    return 'Strong investment opportunity with good profitability and acceptable risk. Recommended.';
  } else if (profitabilityScore >= 60 && riskScore <= 40) {
    return 'Good investment opportunity with moderate profitability and manageable risk. Consider carefully.';
  } else if (profitabilityScore >= 50 && riskScore <= 50) {
    return 'Fair investment opportunity with marginal profitability and elevated risk. Proceed with caution.';
  } else if (riskScore > 70) {
    return 'High risk investment regardless of profitability. Not recommended.';
  } else if (profitabilityScore < 40) {
    return 'Low profitability investment. Consider alternatives or renegotiate terms.';
  } else {
    return 'Mixed assessment. Review all factors carefully before proceeding.';
  }
}

export function calculateIndustrialWarehouseProfitability(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const totalSquareFootage = inputs.totalSquareFootage || 50000;
  const warehouseType = inputs.warehouseType || 'distribution-center';
  const clearHeight = inputs.clearHeight || 32;
  const loadingDocks = inputs.loadingDocks || 10;
  const parkingSpaces = inputs.parkingSpaces || 50;
  const officeSpace = inputs.officeSpace || 2000;
  const landArea = inputs.landArea || 10;
  const locationType = inputs.locationType || 'suburban';
  const marketType = inputs.marketType || 'primary';
  const competitionLevel = inputs.competitionLevel || 'medium';
  const demandGrowth = inputs.demandGrowth || 'growing';
  const vacancyRate = inputs.vacancyRate || 5;
  const rentalRate = inputs.rentalRate || 8;
  const rentalEscalation = inputs.rentalEscalation || 3;
  const landCost = inputs.landCost || 2000000;
  const landCostPerAcre = inputs.landCostPerAcre || 200000;
  const constructionCost = inputs.constructionCost || 80;
  const softCosts = inputs.softCosts || 1000000;
  const softCostPercentage = inputs.softCostPercentage || 15;
  const siteWork = inputs.siteWork || 500000;
  const utilityConnectionCosts = inputs.utilityConnectionCosts || 200000;
  const permits = inputs.permits || 100000;
  const financingCosts = inputs.financingCosts || 300000;
  const contingency = inputs.contingency || 10;
  const operatingExpenses = inputs.operatingExpenses || 2.5;
  const propertyTaxes = inputs.propertyTaxes || 1.2;
  const insurance = inputs.insurance || 0.3;
  const maintenance = inputs.maintenance || 0.8;
  const annualUtilities = inputs.annualUtilities || 0.2;
  const managementFees = inputs.managementFees || 5;
  const financingRate = inputs.financingRate || 6;
  const loanTerm = inputs.loanTerm || 25;
  const downPayment = inputs.downPayment || 25;
  const taxRate = inputs.taxRate || 25;
  const depreciationPeriod = inputs.depreciationPeriod || 39;
  const inflationRate = inputs.inflationRate || 3;
  const exitYear = inputs.exitYear || 10;
  const exitCapRate = inputs.exitCapRate || 6;
  const marketRentGrowth = inputs.marketRentGrowth || 2;
  const expenseGrowth = inputs.expenseGrowth || 2.5;
  const constructionTime = inputs.constructionTime || 12;
  const stabilizationTime = inputs.stabilizationTime || 6;
  const energyEfficiency = inputs.energyEfficiency || 'efficient';
  const accessibility = inputs.accessibility || 'good';
  const infrastructure = inputs.infrastructure || 'good';
  const workforceAvailability = inputs.workforceAvailability || 'good';
  const regulatoryEnvironment = inputs.regulatoryEnvironment || 'business-friendly';

  // Calculate construction cost total
  const constructionCostTotal = totalSquareFootage * constructionCost;
  
  // Calculate soft costs if not provided
  const calculatedSoftCosts = softCosts || (constructionCostTotal * softCostPercentage / 100);
  
  // Calculate land cost if not provided
  const calculatedLandCost = landCost || (landArea * landCostPerAcre);
  
  // Calculate contingency amount
  const contingencyAmount = (constructionCostTotal + calculatedSoftCosts + siteWork + utilityConnectionCosts + permits) * contingency / 100;
  
  // Calculate total investment
  const totalInvestment = calculatedLandCost + constructionCostTotal + calculatedSoftCosts + siteWork + utilityConnectionCosts + permits + financingCosts + contingencyAmount;
  
  // Calculate total project cost
  const totalProjectCost = totalInvestment;
  
  // Calculate annual revenue
  const annualRevenue = totalSquareFootage * rentalRate * (1 - vacancyRate / 100);
  
  // Calculate annual expenses
  const annualExpenses = totalSquareFootage * (operatingExpenses + propertyTaxes + insurance + maintenance + annualUtilities);
  
  // Calculate net operating income
  const netOperatingIncome = annualRevenue - annualExpenses;
  
  // Calculate loan amount
  const loanAmount = totalInvestment * (1 - downPayment / 100);
  
  // Calculate monthly and annual debt service
  const monthlyPayment = calculateMonthlyPayment(loanAmount, financingRate, loanTerm);
  const annualDebtService = monthlyPayment * 12;
  
  // Calculate cash flow
  const cashFlow = netOperatingIncome - annualDebtService;
  
  // Calculate cap rate
  const capRate = (netOperatingIncome / totalInvestment) * 100;
  
  // Calculate cash-on-cash return
  const cashOnCashReturn = (cashFlow / (totalInvestment * downPayment / 100)) * 100;
  
  // Calculate break-even occupancy
  const breakEvenOccupancy = (annualExpenses / (totalSquareFootage * rentalRate)) * 100;
  
  // Calculate break-even rent
  const breakEvenRent = annualExpenses / (totalSquareFootage * (1 - vacancyRate / 100));
  
  // Calculate IRR (simplified)
  const irr = capRate + (marketRentGrowth - expenseGrowth);
  
  // Calculate payback period (simplified)
  const paybackPeriod = totalInvestment / cashFlow;
  
  // Calculate profitability score
  const profitabilityScore = calculateProfitabilityScore(capRate, cashOnCashReturn, irr);
  
  // Calculate risk score
  const riskScore = calculateRiskScore(marketType, competitionLevel, demandGrowth, vacancyRate, financingRate, constructionTime, regulatoryEnvironment);
  
  // Generate recommendation
  const recommendation = generateRecommendation(profitabilityScore, riskScore, capRate);

  // Generate detailed breakdowns
  const costBreakdown = `Land Cost: $${calculatedLandCost.toLocaleString()}
Construction Cost: $${constructionCostTotal.toLocaleString()}
Soft Costs: $${calculatedSoftCosts.toLocaleString()}
Site Work: $${siteWork.toLocaleString()}
Utility Connections: $${utilityConnectionCosts.toLocaleString()}
Permits: $${permits.toLocaleString()}
Financing Costs: $${financingCosts.toLocaleString()}
Contingency: $${contingencyAmount.toLocaleString()}
Total Investment: $${totalInvestment.toLocaleString()}`;

  const keyMetrics = `Warehouse Type: ${warehouseType}
Location Type: ${locationType}
Market Type: ${marketType}
Competition Level: ${competitionLevel}
Demand Growth: ${demandGrowth}
Vacancy Rate: ${vacancyRate}%
Clear Height: ${clearHeight} ft
Loading Docks: ${loadingDocks}
Parking Spaces: ${parkingSpaces}
Office Space: ${officeSpace} sqft
Land Area: ${landArea} acres
Energy Efficiency: ${energyEfficiency}
Accessibility: ${accessibility}
Infrastructure: ${infrastructure}
Workforce Availability: ${workforceAvailability}
Regulatory Environment: ${regulatoryEnvironment}`;

  const revenueProjections = `Revenue Projections (${rentalEscalation}% annual escalation):
Year 1: $${Math.round(annualRevenue).toLocaleString()}
Year 5: $${Math.round(annualRevenue * Math.pow(1 + rentalEscalation / 100, 4)).toLocaleString()}
Year 10: $${Math.round(annualRevenue * Math.pow(1 + rentalEscalation / 100, 9)).toLocaleString()}
Year 15: $${Math.round(annualRevenue * Math.pow(1 + rentalEscalation / 100, 14)).toLocaleString()}`;

  const sensitivityAnalysis = `Sensitivity Analysis:
- 10% Rent Increase: ${((netOperatingIncome * 1.1 / totalInvestment) * 100).toFixed(2)}% Cap Rate
- 10% Rent Decrease: ${((netOperatingIncome * 0.9 / totalInvestment) * 100).toFixed(2)}% Cap Rate
- 10% Cost Increase: ${((netOperatingIncome / (totalInvestment * 1.1)) * 100).toFixed(2)}% Cap Rate
- 10% Cost Decrease: ${((netOperatingIncome / (totalInvestment * 0.9)) * 100).toFixed(2)}% Cap Rate`;

  const marketAnalysis = `Market Analysis:
Market Type: ${marketType}
Competition Level: ${competitionLevel}
Demand Growth: ${demandGrowth}
Vacancy Rate: ${vacancyRate}%
Rental Rate: $${rentalRate}/sqft/year
Market Rent Growth: ${marketRentGrowth}%
Expense Growth: ${expenseGrowth}%`;

  const competitiveAnalysis = `Competitive Analysis:
Location Advantage: ${LOCATION_FACTORS[locationType] || 1.0}x
Market Position: ${MARKET_FACTORS[marketType] || 1.0}x
Competition Impact: ${COMPETITION_FACTORS[competitionLevel] || 1.0}x
Demand Factor: ${DEMAND_FACTORS[demandGrowth] || 1.0}x
Energy Efficiency: ${ENERGY_EFFICIENCY_FACTORS[energyEfficiency] || 1.0}x
Accessibility: ${ACCESSIBILITY_FACTORS[accessibility] || 1.0}x
Infrastructure: ${INFRASTRUCTURE_FACTORS[infrastructure] || 1.0}x
Workforce: ${WORKFORCE_FACTORS[workforceAvailability] || 1.0}x
Regulatory: ${REGULATORY_FACTORS[regulatoryEnvironment] || 1.0}x`;

  return {
    totalInvestment: Math.round(totalInvestment),
    constructionCostTotal: Math.round(constructionCostTotal),
    totalProjectCost: Math.round(totalProjectCost),
    annualRevenue: Math.round(annualRevenue),
    annualExpenses: Math.round(annualExpenses),
    netOperatingIncome: Math.round(netOperatingIncome),
    cashFlow: Math.round(cashFlow),
    monthlyPayment: Math.round(monthlyPayment),
    annualDebtService: Math.round(annualDebtService),
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    IRR: Math.round(irr * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
    breakEvenRent: Math.round(breakEvenRent * 100) / 100,
    profitabilityScore,
    riskScore,
    recommendation,
    keyMetrics,
    costBreakdown,
    revenueProjections,
    sensitivityAnalysis,
    marketAnalysis,
    competitiveAnalysis,
    industrialWarehouseProfitabilityAnalysis: 'Comprehensive industrial warehouse profitability analysis completed'
  };
}

export function generateIndustrialWarehouseProfitabilityAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Industrial Warehouse Profitability Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Profitability Score:** ${outputs.profitabilityScore}/100
**Risk Score:** ${outputs.riskScore}/100

## Investment Overview
- **Total Investment:** $${outputs.totalInvestment.toLocaleString()}
- **Construction Cost:** $${outputs.constructionCostTotal.toLocaleString()}
- **Total Project Cost:** $${outputs.totalProjectCost.toLocaleString()}

## Financial Performance
- **Annual Revenue:** $${outputs.annualRevenue.toLocaleString()}
- **Annual Expenses:** $${outputs.annualExpenses.toLocaleString()}
- **Net Operating Income:** $${outputs.netOperatingIncome.toLocaleString()}
- **Cash Flow:** $${outputs.cashFlow.toLocaleString()}

## Key Metrics
- **Cap Rate:** ${outputs.capRate}%
- **Cash-on-Cash Return:** ${outputs.cashOnCashReturn}%
- **IRR:** ${outputs.IRR}%
- **Payback Period:** ${outputs.paybackPeriod} years
- **Break-Even Occupancy:** ${outputs.breakEvenOccupancy}%
- **Break-Even Rent:** $${outputs.breakEvenRent}/sqft/year

## Cost Breakdown
${outputs.costBreakdown}

## Key Metrics
${outputs.keyMetrics}

## Revenue Projections
${outputs.revenueProjections}

## Sensitivity Analysis
${outputs.sensitivityAnalysis}

## Market Analysis
${outputs.marketAnalysis}

## Competitive Analysis
${outputs.competitiveAnalysis}

## Risk Assessment
- **Risk Score:** ${outputs.riskScore}/100
- **Primary Risk Factors:** ${outputs.riskScore > 50 ? 'High competition, poor market conditions, or financing risks' : 'Low risk factors identified'}

## Recommendations
1. Review market conditions and competition
2. Assess financing terms and rates
3. Consider construction timeline and costs
4. Evaluate location advantages
5. Analyze regulatory environment
6. Review energy efficiency options
7. Assess workforce availability
8. Consider technology integration

## Next Steps
1. Conduct detailed market research
2. Obtain construction estimates
3. Secure financing commitments
4. Review zoning and permitting requirements
5. Assess environmental considerations
6. Evaluate tenant demand
7. Review exit strategies
8. Consider value-add opportunities`;
}
