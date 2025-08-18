import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market factor constants
const MARKET_TYPE_FACTORS = {
  hot: 1.2,
  stable: 1.0,
  declining: 0.8,
  emerging: 1.1,
  balanced: 1.05
};

const LOCATION_FACTORS = {
  urban: 1.3,
  suburban: 1.0,
  rural: 0.7,
  coastal: 1.2,
  mountain: 0.9,
  downtown: 1.4,
  residential: 1.1
};

const PROPERTY_TYPE_FACTORS = {
  'single-family': 1.0,
  'multi-family': 1.1,
  apartment: 1.05,
  commercial: 1.2,
  industrial: 0.9,
  'mixed-use': 1.15,
  condo: 0.95,
  townhouse: 0.98
};

const CONDITION_FACTORS = {
  excellent: 1.2,
  good: 1.0,
  fair: 0.8,
  poor: 0.6,
  'needs-renovation': 0.7
};

const MARKET_LIQUIDITY_FACTORS = {
  high: 1.2,
  medium: 1.0,
  low: 0.8
};

// Typical GRM ranges by property type and location
const TYPICAL_GRM_RANGES = {
  'single-family': { min: 8, max: 15 },
  'multi-family': { min: 6, max: 12 },
  apartment: { min: 7, max: 13 },
  commercial: { min: 5, max: 10 },
  industrial: { min: 4, max: 8 },
  'mixed-use': { min: 6, max: 11 },
  condo: { min: 9, max: 16 },
  townhouse: { min: 8, max: 14 }
};

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 5; // Base risk score

  // Market type adjustment
  if (inputs.marketType) {
    const marketFactor = MARKET_TYPE_FACTORS[inputs.marketType as keyof typeof MARKET_TYPE_FACTORS] || 1.0;
    riskScore *= (2 - marketFactor); // Inverse relationship
  }

  // Location adjustment
  if (inputs.location) {
    const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
    riskScore *= (2 - locationFactor);
  }

  // Property type adjustment
  if (inputs.propertyType) {
    const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
    riskScore *= (2 - propertyFactor);
  }

  // Property condition adjustment
  if (inputs.condition) {
    const conditionFactor = CONDITION_FACTORS[inputs.condition as keyof typeof CONDITION_FACTORS] || 1.0;
    riskScore *= (2 - conditionFactor);
  }

  // Vacancy rate adjustment
  if (inputs.vacancyRate) {
    const vacancyFactor = 1 + (inputs.vacancyRate / 100);
    riskScore *= vacancyFactor;
  }

  // Property age adjustment
  if (inputs.propertyAge) {
    const ageFactor = Math.min(1.5, 1 + (inputs.propertyAge / 100));
    riskScore *= ageFactor;
  }

  // GRM adjustment (higher GRM = higher risk)
  const grm = (inputs.propertyValue || 0) / (inputs.grossAnnualRent || 1);
  if (grm > 15) riskScore *= 1.3;
  else if (grm > 12) riskScore *= 1.1;
  else if (grm < 6) riskScore *= 0.8;

  return Math.max(1, Math.min(10, riskScore));
}

function calculateLiquidityScore(inputs: CalculatorInputs): number {
  let liquidityScore = 5; // Base liquidity score

  // Market liquidity factor
  if (inputs.marketLiquidity) {
    const liquidityFactor = MARKET_LIQUIDITY_FACTORS[inputs.marketLiquidity as keyof typeof MARKET_LIQUIDITY_FACTORS] || 1.0;
    liquidityScore *= liquidityFactor;
  }

  // Property type factor
  if (inputs.propertyType) {
    const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
    liquidityScore *= propertyFactor;
  }

  // Location factor
  if (inputs.location) {
    const locationFactor = LOCATION_FACTORS[inputs.location as keyof typeof LOCATION_FACTORS] || 1.0;
    liquidityScore *= locationFactor;
  }

  // Property value factor (higher value = lower liquidity)
  if (inputs.propertyValue) {
    const valueFactor = Math.max(0.5, 1 - (inputs.propertyValue - 500000) / 2000000);
    liquidityScore *= valueFactor;
  }

  return Math.max(1, Math.min(10, liquidityScore));
}

function calculateDiversificationScore(inputs: CalculatorInputs): number {
  let diversificationScore = 5; // Base score

  // Property type diversification
  if (inputs.propertyType) {
    const propertyTypes = ['single-family', 'multi-family', 'apartment', 'commercial', 'industrial', 'mixed-use', 'condo', 'townhouse'];
    const typeIndex = propertyTypes.indexOf(inputs.propertyType);
    diversificationScore += (typeIndex + 1) * 0.3;
  }

  // Location diversification
  if (inputs.location) {
    const locations = ['urban', 'suburban', 'rural', 'coastal', 'mountain', 'downtown', 'residential'];
    const locationIndex = locations.indexOf(inputs.location);
    diversificationScore += (locationIndex + 1) * 0.2;
  }

  // Property value diversification
  if (inputs.propertyValue) {
    if (inputs.propertyValue < 200000) diversificationScore += 1;
    else if (inputs.propertyValue > 1000000) diversificationScore += 1;
    else diversificationScore += 0.5;
  }

  return Math.max(1, Math.min(10, diversificationScore));
}

function calculateInflationHedgeScore(inputs: CalculatorInputs): number {
  const appreciationRate = inputs.appreciationRate || 3.0;
  const inflationRate = inputs.inflationRate || 2.0;
  const hedgeScore = Math.max(1, Math.min(10, (appreciationRate - inflationRate) / 2 + 5));
  return hedgeScore;
}

function generateGrossRentMultiplierAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let analysis = `# Gross Rent Multiplier Analysis\n\n`;

  // Executive Summary
  analysis += `## Executive Summary\n`;
  analysis += `**Gross Rent Multiplier:** ${outputs.grossRentMultiplier?.toFixed(2)}\n`;
  analysis += `**Net Rent Multiplier:** ${outputs.netRentMultiplier?.toFixed(2)}\n`;
  analysis += `**Cash-on-Cash Return:** ${outputs.cashOnCashReturn?.toFixed(2)}%\n`;
  analysis += `**Cap Rate:** ${outputs.capRate?.toFixed(2)}%\n`;
  analysis += `**Investment Grade:** ${outputs.investmentGrade}\n\n`;

  // Property Analysis
  analysis += `## Property Analysis\n`;
  analysis += `**Property Value:** $${inputs.propertyValue?.toLocaleString()}\n`;
  analysis += `**Gross Annual Rent:** $${inputs.grossAnnualRent?.toLocaleString()}\n`;
  analysis += `**Property Type:** ${inputs.propertyType}\n`;
  analysis += `**Location:** ${inputs.location}\n`;
  analysis += `**Market Type:** ${inputs.marketType}\n`;
  if (inputs.squareFootage) analysis += `**Square Footage:** ${inputs.squareFootage.toLocaleString()} sq ft\n`;
  if (inputs.bedrooms) analysis += `**Bedrooms:** ${inputs.bedrooms}\n`;
  if (inputs.bathrooms) analysis += `**Bathrooms:** ${inputs.bathrooms}\n`;
  analysis += `\n`;

  // Financial Metrics
  analysis += `## Financial Metrics\n`;
  analysis += `**Monthly Rent:** $${outputs.monthlyRent?.toLocaleString()}\n`;
  analysis += `**Net Annual Rent:** $${outputs.netAnnualRent?.toLocaleString()}\n`;
  analysis += `**Net Monthly Rent:** $${outputs.netMonthlyRent?.toLocaleString()}\n`;
  analysis += `**Total Expenses:** $${outputs.totalExpenses?.toLocaleString()}\n`;
  analysis += `**Expense Ratio:** ${outputs.expenseRatio?.toFixed(2)}%\n`;
  analysis += `**Profit Margin:** ${outputs.profitMargin?.toFixed(2)}%\n`;
  analysis += `**Break-Even Rent:** $${outputs.breakEvenRent?.toLocaleString()}/month\n`;
  analysis += `**Rental Yield:** ${outputs.rentalYield?.toFixed(2)}%\n`;
  analysis += `\n`;

  // Investment Analysis
  analysis += `## Investment Analysis\n`;
  analysis += `**Total Return:** ${outputs.totalReturn?.toFixed(2)}%\n`;
  analysis += `**Tax Benefits:** $${outputs.taxBenefits?.toLocaleString()}/year\n`;
  analysis += `**Equity Build-Up:** $${outputs.equityBuildUp?.toLocaleString()}/year\n`;
  analysis += `**Price per Square Foot:** $${outputs.pricePerSquareFoot?.toFixed(2)}\n`;
  analysis += `**Rent per Square Foot:** $${outputs.rentPerSquareFoot?.toFixed(2)}\n`;
  analysis += `\n`;

  // Risk Assessment
  analysis += `## Risk Assessment\n`;
  analysis += `**Risk Score:** ${outputs.riskAssessment}\n`;
  analysis += `**Sensitivity Score:** ${outputs.sensitivityScore?.toFixed(1)}/10\n`;
  analysis += `**Liquidity Score:** ${outputs.liquidityScore?.toFixed(1)}/10\n`;
  analysis += `**Diversification Score:** ${outputs.diversificationScore?.toFixed(1)}/10\n`;
  analysis += `**Inflation Hedge Score:** ${outputs.inflationHedge?.toFixed(1)}/10\n`;
  analysis += `\n`;

  // Market Analysis
  analysis += `## Market Analysis\n`;
  analysis += `**Market Comparison:** ${outputs.marketComparison}\n`;
  analysis += `**Value Analysis:** ${outputs.valueAnalysis}\n`;
  analysis += `**Income Analysis:** ${outputs.incomeAnalysis}\n`;
  analysis += `**Market Analysis:** ${outputs.marketAnalysis}\n`;
  analysis += `\n`;

  // Recommendations
  analysis += `## Recommendations\n`;
  analysis += `**Recommended Action:** ${outputs.recommendedAction}\n\n`;

  // GRM Interpretation
  const grm = outputs.grossRentMultiplier || 0;
  if (grm < 8) {
    analysis += `✅ **LOW GRM:** This property has a low Gross Rent Multiplier, indicating it may be undervalued or have strong rental income potential.\n\n`;
  } else if (grm < 12) {
    analysis += `✅ **MODERATE GRM:** This property has a moderate Gross Rent Multiplier, suggesting fair market value and reasonable rental income.\n\n`;
  } else {
    analysis += `⚠️ **HIGH GRM:** This property has a high Gross Rent Multiplier, indicating it may be overvalued or have lower rental income potential.\n\n`;
  }

  // Cash Flow Analysis
  if (outputs.cashOnCashReturn && outputs.cashOnCashReturn > 8) {
    analysis += `✅ **STRONG CASH FLOW:** The cash-on-cash return indicates strong annual cash flow generation.\n\n`;
  } else if (outputs.cashOnCashReturn && outputs.cashOnCashReturn > 5) {
    analysis += `✅ **GOOD CASH FLOW:** The cash-on-cash return indicates good annual cash flow generation.\n\n`;
  } else {
    analysis += `⚠️ **MODEST CASH FLOW:** The cash-on-cash return indicates modest annual cash flow generation.\n\n`;
  }

  // Market Position
  if (outputs.marketComparison && outputs.marketComparison.includes('above')) {
    analysis += `✅ **ABOVE MARKET:** This property performs above market averages for its type and location.\n\n`;
  } else if (outputs.marketComparison && outputs.marketComparison.includes('below')) {
    analysis += `⚠️ **BELOW MARKET:** This property performs below market averages for its type and location.\n\n`;
  } else {
    analysis += `✅ **MARKET AVERAGE:** This property performs at market averages for its type and location.\n\n`;
  }

  return analysis;
}

export function calculateGrossRentMultiplier(inputs: CalculatorInputs): CalculatorOutputs {
  const propertyValue = inputs.propertyValue || 0;
  const grossAnnualRent = inputs.grossAnnualRent || 0;
  const squareFootage = inputs.squareFootage || 0;

  // Calculate basic GRM metrics
  const grossRentMultiplier = propertyValue / grossAnnualRent;
  const monthlyRent = grossAnnualRent / 12;
  const pricePerSquareFoot = squareFootage > 0 ? propertyValue / squareFootage : 0;
  const rentPerSquareFoot = squareFootage > 0 ? grossAnnualRent / squareFootage : 0;

  // Calculate expenses
  const totalExpenses = (inputs.operatingExpenses || 0) + (inputs.propertyTaxes || 0) + 
                       (inputs.insurance || 0) + (inputs.maintenance || 0) + 
                       (inputs.managementFees || 0) + (inputs.utilities || 0) + 
                       (inputs.hoaFees || 0);

  // Calculate net income
  const netAnnualRent = grossAnnualRent - totalExpenses;
  const netMonthlyRent = netAnnualRent / 12;

  // Calculate multipliers and returns
  const netRentMultiplier = netAnnualRent > 0 ? propertyValue / netAnnualRent : 0;
  const cashOnCashReturn = (netAnnualRent / propertyValue) * 100;
  const capRate = (netAnnualRent / propertyValue) * 100;
  const expenseRatio = (totalExpenses / grossAnnualRent) * 100;
  const profitMargin = (netAnnualRent / grossAnnualRent) * 100;
  const breakEvenRent = totalExpenses / 12;
  const rentalYield = (grossAnnualRent / propertyValue) * 100;

  // Calculate additional metrics
  const appreciationRate = inputs.appreciationRate || 3.0;
  const totalReturn = rentalYield + appreciationRate;
  const taxRate = inputs.taxRate || 25;
  const taxBenefits = (netAnnualRent * taxRate) / 100;
  const equityBuildUp = (propertyValue * appreciationRate) / 100;

  // Determine investment grade
  let investmentGrade = 'C';
  if (grossRentMultiplier < 8 && cashOnCashReturn > 8) investmentGrade = 'A';
  else if (grossRentMultiplier < 10 && cashOnCashReturn > 6) investmentGrade = 'B';
  else if (grossRentMultiplier < 12 && cashOnCashReturn > 4) investmentGrade = 'C';
  else investmentGrade = 'D';

  // Determine recommended action
  let recommendedAction = 'Consider alternative investments';
  if (grossRentMultiplier < 10 && cashOnCashReturn > 6) {
    if (investmentGrade === 'A') recommendedAction = 'Strong buy recommendation';
    else if (investmentGrade === 'B') recommendedAction = 'Buy recommendation';
    else recommendedAction = 'Consider with caution';
  }

  // Market comparison analysis
  let marketComparison = 'At market average';
  const typicalRange = TYPICAL_GRM_RANGES[inputs.propertyType as keyof typeof TYPICAL_GRM_RANGES];
  if (typicalRange) {
    if (grossRentMultiplier < typicalRange.min) {
      marketComparison = `Above market average (typical range: ${typicalRange.min}-${typicalRange.max})`;
    } else if (grossRentMultiplier > typicalRange.max) {
      marketComparison = `Below market average (typical range: ${typicalRange.min}-${typicalRange.max})`;
    }
  }

  // Risk assessment
  const riskScore = calculateRiskScore(inputs);
  let riskAssessment = 'Moderate risk';
  if (riskScore < 4) riskAssessment = 'Low risk investment';
  else if (riskScore > 7) riskAssessment = 'High risk investment';

  // Value analysis
  let valueAnalysis = 'Fair market value';
  if (grossRentMultiplier < 8) valueAnalysis = 'Potentially undervalued';
  else if (grossRentMultiplier > 12) valueAnalysis = 'Potentially overvalued';

  // Income analysis
  let incomeAnalysis = 'Moderate rental income';
  if (rentalYield > 8) incomeAnalysis = 'Strong rental income potential';
  else if (rentalYield < 5) incomeAnalysis = 'Limited rental income potential';

  // Market analysis
  let marketAnalysis = 'Stable market position';
  if (inputs.marketType === 'hot') marketAnalysis = 'Strong market position';
  else if (inputs.marketType === 'declining') marketAnalysis = 'Weak market position';

  // Calculate sensitivity score
  const sensitivityScore = Math.max(1, Math.min(10, 10 - Math.abs(grossRentMultiplier - 10) / 2));

  // Calculate additional scores
  const liquidityScore = calculateLiquidityScore(inputs);
  const diversificationScore = calculateDiversificationScore(inputs);
  const inflationHedge = calculateInflationHedgeScore(inputs);

  return {
    grossRentMultiplier: Math.round(grossRentMultiplier * 100) / 100,
    netRentMultiplier: Math.round(netRentMultiplier * 100) / 100,
    pricePerSquareFoot: Math.round(pricePerSquareFoot * 100) / 100,
    rentPerSquareFoot: Math.round(rentPerSquareFoot * 100) / 100,
    monthlyRent: Math.round(monthlyRent),
    netAnnualRent: Math.round(netAnnualRent),
    netMonthlyRent: Math.round(netMonthlyRent),
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    totalExpenses: Math.round(totalExpenses),
    expenseRatio: Math.round(expenseRatio * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100,
    breakEvenRent: Math.round(breakEvenRent),
    rentalYield: Math.round(rentalYield * 100) / 100,
    investmentGrade,
    marketComparison,
    recommendedAction,
    riskAssessment,
    valueAnalysis,
    incomeAnalysis,
    marketAnalysis,
    sensitivityScore: Math.round(sensitivityScore * 10) / 10,
    liquidityScore: Math.round(liquidityScore * 10) / 10,
    diversificationScore: Math.round(diversificationScore * 10) / 10,
    inflationHedge: Math.round(inflationHedge * 10) / 10,
    taxBenefits: Math.round(taxBenefits),
    equityBuildUp: Math.round(equityBuildUp),
    totalReturn: Math.round(totalReturn * 100) / 100,
    grossRentMultiplierAnalysis: 'Comprehensive GRM analysis completed'
  };
}

export { generateGrossRentMultiplierAnalysis };
