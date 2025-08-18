import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Soil quality factors for yield adjustments
const SOIL_QUALITY_FACTORS = {
  'excellent': 1.2,
  'good': 1.0,
  'average': 0.8,
  'poor': 0.6,
  'marginal': 0.4
};

// Irrigation type factors
const IRRIGATION_FACTORS = {
  'none': 0.7,
  'drip': 1.1,
  'sprinkler': 1.0,
  'flood': 0.9,
  'center-pivot': 1.05,
  'subsurface': 1.15
};

// Climate zone factors
const CLIMATE_FACTORS = {
  'arid': 0.6,
  'semi-arid': 0.8,
  'temperate': 1.0,
  'humid': 1.1,
  'tropical': 1.2,
  'mediterranean': 1.05
};

// Market access factors
const MARKET_ACCESS_FACTORS = {
  'excellent': 1.1,
  'good': 1.0,
  'average': 0.9,
  'poor': 0.8,
  'remote': 0.7
};

// Conservation program benefits
const CONSERVATION_BENEFITS = {
  'none': 0,
  'crop-insurance': 0.05,
  'conservation-reserve': 0.1,
  'wetlands-reserve': 0.15,
  'environmental-quality-incentives': 0.08
};

// Organic certification premiums
const ORGANIC_PREMIUMS = {
  'none': 0,
  'certified-organic': 0.25,
  'transitioning': 0.1,
  'conventional': 0
};

// Water rights factors
const WATER_RIGHTS_FACTORS = {
  'owned': 1.1,
  'leased': 0.9,
  'shared': 0.8,
  'none': 0.6,
  'restricted': 0.7
};

// Mineral rights factors
const MINERAL_RIGHTS_FACTORS = {
  'owned': 1.05,
  'leased': 0.95,
  'shared': 0.9,
  'none': 0.85,
  'sold': 0.8
};

function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateAdjustedRevenue(inputs: CalculatorInputs): number {
  const baseRevenue = Number(inputs.annualCropRevenue);
  const soilFactor = SOIL_QUALITY_FACTORS[inputs.soilQuality as keyof typeof SOIL_QUALITY_FACTORS] || 1.0;
  const irrigationFactor = IRRIGATION_FACTORS[inputs.irrigationType as keyof typeof IRRIGATION_FACTORS] || 1.0;
  const climateFactor = CLIMATE_FACTORS[inputs.climateZone as keyof typeof CLIMATE_FACTORS] || 1.0;
  const marketFactor = MARKET_ACCESS_FACTORS[inputs.marketAccess as keyof typeof MARKET_ACCESS_FACTORS] || 1.0;
  const waterFactor = WATER_RIGHTS_FACTORS[inputs.waterRights as keyof typeof WATER_RIGHTS_FACTORS] || 1.0;
  const mineralFactor = MINERAL_RIGHTS_FACTORS[inputs.mineralRights as keyof typeof MINERAL_RIGHTS_FACTORS] || 1.0;
  
  // Apply organic premium if applicable
  const organicPremium = ORGANIC_PREMIUMS[inputs.organicCertification as keyof typeof ORGANIC_PREMIUMS] || 0;
  
  // Apply conservation benefits
  const conservationBenefit = CONSERVATION_BENEFITS[inputs.conservationPrograms as keyof typeof CONSERVATION_BENEFITS] || 0;
  
  const totalFactor = soilFactor * irrigationFactor * climateFactor * marketFactor * waterFactor * mineralFactor;
  const adjustedRevenue = baseRevenue * totalFactor * (1 + organicPremium + conservationBenefit);
  
  return adjustedRevenue;
}

function calculateTotalOperatingCosts(inputs: CalculatorInputs): number {
  const baseOperatingCosts = Number(inputs.operatingCosts);
  const landTaxes = Number(inputs.landTaxes);
  const insuranceCosts = Number(inputs.insuranceCosts);
  const maintenanceCosts = Number(inputs.maintenanceCosts);
  const energyCosts = Number(inputs.energyCosts) || 0;
  const laborCosts = Number(inputs.laborCosts) || 0;
  const equipmentCosts = Number(inputs.equipmentCosts) || 0;
  
  return baseOperatingCosts + landTaxes + insuranceCosts + maintenanceCosts + 
         energyCosts + laborCosts + equipmentCosts;
}

function calculateNetPresentValue(cashFlows: number[], discountRate: number, initialInvestment: number): number {
  let npv = -initialInvestment;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + discountRate / 100, i + 1);
  }
  return npv;
}

function calculateInternalRateOfReturn(cashFlows: number[], initialInvestment: number): number {
  // Simplified IRR calculation using trial and error
  let irr = 0;
  let npv = -initialInvestment;
  
  for (let rate = 0; rate <= 100; rate += 0.1) {
    npv = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate / 100, i + 1);
    }
    if (Math.abs(npv) < 100) {
      irr = rate;
      break;
    }
  }
  
  return irr;
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 50; // Base risk score
  
  // Soil quality risk
  const soilQualityRisk = {
    'excellent': -10,
    'good': -5,
    'average': 0,
    'poor': 10,
    'marginal': 20
  };
  riskScore += soilQualityRisk[inputs.soilQuality as keyof typeof soilQualityRisk] || 0;
  
  // Climate risk
  const climateRisk = {
    'arid': 15,
    'semi-arid': 10,
    'temperate': 0,
    'humid': -5,
    'tropical': 5,
    'mediterranean': -5
  };
  riskScore += climateRisk[inputs.climateZone as keyof typeof climateRisk] || 0;
  
  // Market access risk
  const marketRisk = {
    'excellent': -10,
    'good': -5,
    'average': 0,
    'poor': 10,
    'remote': 20
  };
  riskScore += marketRisk[inputs.marketAccess as keyof typeof marketRisk] || 0;
  
  // Water rights risk
  const waterRisk = {
    'owned': -5,
    'leased': 5,
    'shared': 10,
    'none': 20,
    'restricted': 15
  };
  riskScore += waterRisk[inputs.waterRights as keyof typeof waterRisk] || 0;
  
  // Debt service coverage risk
  const loanAmount = Number(inputs.purchasePrice) - Number(inputs.downPayment);
  const monthlyPayment = calculateMonthlyPayment(loanAmount, Number(inputs.interestRate), Number(inputs.loanTerm));
  const annualDebtService = monthlyPayment * 12;
  const adjustedRevenue = calculateAdjustedRevenue(inputs);
  const totalOperatingCosts = calculateTotalOperatingCosts(inputs);
  const netOperatingIncome = adjustedRevenue - totalOperatingCosts;
  const dscr = netOperatingIncome / annualDebtService;
  
  if (dscr < 1.0) riskScore += 20;
  else if (dscr < 1.25) riskScore += 10;
  else if (dscr < 1.5) riskScore += 5;
  else riskScore -= 5;
  
  // Clamp risk score between 0 and 100
  return Math.max(0, Math.min(100, riskScore));
}

function generateInvestmentRecommendation(riskScore: number, cashOnCashReturn: number, totalROI: number): string {
  if (riskScore < 30 && cashOnCashReturn > 8 && totalROI > 15) {
    return 'STRONG BUY - Excellent risk-adjusted returns with low risk profile';
  } else if (riskScore < 50 && cashOnCashReturn > 6 && totalROI > 12) {
    return 'BUY - Good investment opportunity with favorable risk-return profile';
  } else if (riskScore < 70 && cashOnCashReturn > 4 && totalROI > 8) {
    return 'HOLD - Moderate investment with acceptable returns, consider improvements';
  } else if (riskScore < 80 && cashOnCashReturn > 2 && totalROI > 5) {
    return 'CAUTIOUS - Higher risk investment, requires careful consideration';
  } else {
    return 'AVOID - High risk with poor returns, not recommended';
  }
}

function generateKeyRiskFactors(inputs: CalculatorInputs, riskScore: number): string {
  const risks: string[] = [];
  
  if (riskScore > 70) risks.push('High overall investment risk');
  if (inputs.soilQuality === 'poor' || inputs.soilQuality === 'marginal') {
    risks.push('Poor soil quality affecting crop yields');
  }
  if (inputs.climateZone === 'arid' || inputs.climateZone === 'semi-arid') {
    risks.push('Arid climate conditions requiring irrigation');
  }
  if (inputs.marketAccess === 'poor' || inputs.marketAccess === 'remote') {
    risks.push('Limited market access affecting sales and transportation costs');
  }
  if (inputs.waterRights === 'none' || inputs.waterRights === 'restricted') {
    risks.push('Limited or no water rights affecting irrigation capabilities');
  }
  if (inputs.irrigationType === 'none') {
    risks.push('No irrigation system limiting crop options and yields');
  }
  
  const loanAmount = Number(inputs.purchasePrice) - Number(inputs.downPayment);
  const monthlyPayment = calculateMonthlyPayment(loanAmount, Number(inputs.interestRate), Number(inputs.loanTerm));
  const annualDebtService = monthlyPayment * 12;
  const adjustedRevenue = calculateAdjustedRevenue(inputs);
  const totalOperatingCosts = calculateTotalOperatingCosts(inputs);
  const netOperatingIncome = adjustedRevenue - totalOperatingCosts;
  const dscr = netOperatingIncome / annualDebtService;
  
  if (dscr < 1.25) {
    risks.push('Low debt service coverage ratio indicating cash flow risk');
  }
  
  return risks.length > 0 ? risks.join('; ') : 'Low risk factors identified';
}

function generateOptimizationOpportunities(inputs: CalculatorInputs): string {
  const opportunities: string[] = [];
  
  if (inputs.irrigationType === 'none') {
    opportunities.push('Install irrigation system to improve yields and crop options');
  }
  if (inputs.organicCertification === 'conventional') {
    opportunities.push('Consider organic certification for premium pricing');
  }
  if (inputs.conservationPrograms === 'none') {
    opportunities.push('Explore conservation programs for additional income streams');
  }
  if (inputs.soilQuality === 'average' || inputs.soilQuality === 'poor') {
    opportunities.push('Implement soil improvement practices to enhance productivity');
  }
  if (inputs.marketAccess === 'average' || inputs.marketAccess === 'poor') {
    opportunities.push('Develop direct marketing channels to improve market access');
  }
  
  return opportunities.length > 0 ? opportunities.join('; ') : 'Limited optimization opportunities identified';
}

function generateMarketAnalysis(inputs: CalculatorInputs): string {
  const cropType = inputs.cropType;
  const marketAccess = inputs.marketAccess;
  const climateZone = inputs.climateZone;
  
  let analysis = `Market analysis for ${cropType} production in ${climateZone} climate zone. `;
  
  if (marketAccess === 'excellent' || marketAccess === 'good') {
    analysis += 'Strong market access provides competitive advantage for sales and distribution. ';
  } else {
    analysis += 'Limited market access may require additional transportation and marketing costs. ';
  }
  
  if (inputs.organicCertification === 'certified-organic') {
    analysis += 'Organic certification provides access to premium markets and higher pricing. ';
  }
  
  if (inputs.conservationPrograms !== 'none') {
    analysis += 'Conservation program participation provides additional income stability. ';
  }
  
  analysis += 'Consider local and regional market trends, crop price volatility, and demand forecasts.';
  
  return analysis;
}

function generateSustainabilityMetrics(inputs: CalculatorInputs): string {
  const metrics: string[] = [];
  
  if (inputs.organicCertification === 'certified-organic') {
    metrics.push('Organic certification reduces environmental impact');
  }
  if (inputs.conservationPrograms !== 'none') {
    metrics.push('Conservation programs promote sustainable land management');
  }
  if (inputs.irrigationType === 'drip' || inputs.irrigationType === 'subsurface') {
    metrics.push('Efficient irrigation systems reduce water consumption');
  }
  if (inputs.soilQuality === 'excellent' || inputs.soilQuality === 'good') {
    metrics.push('Good soil quality supports sustainable agricultural practices');
  }
  
  const landAcres = Number(inputs.landAcres);
  if (landAcres > 100) {
    metrics.push('Large acreage provides opportunities for crop rotation and biodiversity');
  }
  
  return metrics.length > 0 ? metrics.join('; ') : 'Standard agricultural sustainability practices apply';
}

export function calculateFarmlandInvestmentROI(inputs: CalculatorInputs): CalculatorOutputs {
  const landAcres = Number(inputs.landAcres);
  const purchasePrice = Number(inputs.purchasePrice);
  const downPayment = Number(inputs.downPayment);
  const interestRate = Number(inputs.interestRate);
  const loanTerm = Number(inputs.loanTerm);
  const holdingPeriod = Number(inputs.holdingPeriod);
  const landAppreciation = Number(inputs.landAppreciation);
  const inflationRate = Number(inputs.inflationRate);
  
  // Calculate loan details
  const loanAmount = purchasePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const annualDebtService = monthlyPayment * 12;
  
  // Calculate adjusted revenue and costs
  const adjustedRevenue = calculateAdjustedRevenue(inputs);
  const totalOperatingCosts = calculateTotalOperatingCosts(inputs);
  const governmentSubsidies = Number(inputs.governmentSubsidies) || 0;
  
  // Calculate annual cash flow
  const annualCashFlow = adjustedRevenue + governmentSubsidies - totalOperatingCosts - annualDebtService;
  
  // Calculate total investment (including closing costs estimate)
  const closingCosts = purchasePrice * 0.03; // 3% closing costs estimate
  const totalInvestment = downPayment + closingCosts;
  
  // Calculate ROI metrics
  const annualROI = (annualCashFlow / totalInvestment) * 100;
  const cashOnCashReturn = annualROI;
  
  // Calculate land appreciation
  const landValueAppreciation = purchasePrice * Math.pow(1 + landAppreciation / 100, holdingPeriod) - purchasePrice;
  
  // Calculate total ROI over holding period
  const totalCashFlow = annualCashFlow * holdingPeriod;
  const finalLandValue = purchasePrice * Math.pow(1 + landAppreciation / 100, holdingPeriod);
  const totalROI = ((totalCashFlow + landValueAppreciation) / totalInvestment) * 100;
  
  // Calculate break-even years
  const breakEvenYears = totalInvestment / annualCashFlow;
  
  // Calculate NPV and IRR
  const cashFlows = Array(holdingPeriod).fill(annualCashFlow);
  cashFlows[holdingPeriod - 1] += landValueAppreciation; // Add land appreciation in final year
  const discountRate = inflationRate + 3; // Risk-adjusted discount rate
  const netPresentValue = calculateNetPresentValue(cashFlows, discountRate, totalInvestment);
  const internalRateOfReturn = calculateInternalRateOfReturn(cashFlows, totalInvestment);
  
  // Calculate additional metrics
  const operatingExpenseRatio = (totalOperatingCosts / adjustedRevenue) * 100;
  const debtServiceCoverageRatio = (adjustedRevenue - totalOperatingCosts) / annualDebtService;
  const profitMargin = ((adjustedRevenue - totalOperatingCosts) / adjustedRevenue) * 100;
  const yieldEfficiency = (adjustedRevenue - totalOperatingCosts) / landAcres;
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs);
  
  // Generate analysis components
  const investmentRecommendation = generateInvestmentRecommendation(riskScore, cashOnCashReturn, totalROI);
  const keyRiskFactors = generateKeyRiskFactors(inputs, riskScore);
  const optimizationOpportunities = generateOptimizationOpportunities(inputs);
  const marketAnalysis = generateMarketAnalysis(inputs);
  const sustainabilityMetrics = generateSustainabilityMetrics(inputs);
  
  return {
    totalInvestment: Math.round(totalInvestment),
    annualCashFlow: Math.round(annualCashFlow),
    monthlyPayment: Math.round(monthlyPayment),
    annualROI: Math.round(annualROI * 10) / 10,
    totalROI: Math.round(totalROI * 10) / 10,
    cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
    breakEvenYears: Math.round(breakEvenYears * 10) / 10,
    netPresentValue: Math.round(netPresentValue),
    internalRateOfReturn: Math.round(internalRateOfReturn * 10) / 10,
    landValueAppreciation: Math.round(landValueAppreciation),
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 10) / 10,
    debtServiceCoverageRatio: Math.round(debtServiceCoverageRatio * 10) / 10,
    profitMargin: Math.round(profitMargin * 10) / 10,
    yieldEfficiency: Math.round(yieldEfficiency * 10) / 10,
    riskScore: Math.round(riskScore),
    investmentRecommendation,
    keyRiskFactors,
    optimizationOpportunities,
    marketAnalysis,
    sustainabilityMetrics,
    farmlandInvestmentAnalysis: 'Comprehensive farmland investment analysis completed'
  };
}

export function generateFarmlandInvestmentAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const landAcres = Number(inputs.landAcres);
  const purchasePrice = Number(inputs.purchasePrice);
  const cropType = inputs.cropType;
  
  let analysis = `# Farmland Investment Analysis Report\n\n`;
  
  analysis += `## Investment Overview\n`;
  analysis += `- **Property**: ${landAcres.toLocaleString()} acres of ${cropType} farmland\n`;
  analysis += `- **Purchase Price**: $${purchasePrice.toLocaleString()}\n`;
  analysis += `- **Total Investment**: $${outputs.totalInvestment.toLocaleString()}\n`;
  analysis += `- **Annual Cash Flow**: $${outputs.annualCashFlow.toLocaleString()}\n`;
  analysis += `- **Monthly Payment**: $${outputs.monthlyPayment.toLocaleString()}\n\n`;
  
  analysis += `## Financial Performance\n`;
  analysis += `- **Annual ROI**: ${outputs.annualROI}%\n`;
  analysis += `- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%\n`;
  analysis += `- **Total ROI (${inputs.holdingPeriod} years)**: ${outputs.totalROI}%\n`;
  analysis += `- **Break-Even Period**: ${outputs.breakEvenYears} years\n`;
  analysis += `- **Net Present Value**: $${outputs.netPresentValue.toLocaleString()}\n`;
  analysis += `- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%\n\n`;
  
  analysis += `## Key Metrics\n`;
  analysis += `- **Land Value Appreciation**: $${outputs.landValueAppreciation.toLocaleString()}\n`;
  analysis += `- **Operating Expense Ratio**: ${outputs.operatingExpenseRatio}%\n`;
  analysis += `- **Debt Service Coverage Ratio**: ${outputs.debtServiceCoverageRatio}\n`;
  analysis += `- **Profit Margin**: ${outputs.profitMargin}%\n`;
  analysis += `- **Yield Efficiency**: $${outputs.yieldEfficiency}/acre\n`;
  analysis += `- **Risk Score**: ${outputs.riskScore}/100\n\n`;
  
  analysis += `## Investment Recommendation\n`;
  analysis += `${outputs.investmentRecommendation}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `**Key Risk Factors**: ${outputs.keyRiskFactors}\n\n`;
  
  analysis += `## Optimization Opportunities\n`;
  analysis += `${outputs.optimizationOpportunities}\n\n`;
  
  analysis += `## Market Analysis\n`;
  analysis += `${outputs.marketAnalysis}\n\n`;
  
  analysis += `## Sustainability Considerations\n`;
  analysis += `${outputs.sustainabilityMetrics}\n\n`;
  
  analysis += `## Property Characteristics\n`;
  analysis += `- **Soil Quality**: ${inputs.soilQuality}\n`;
  analysis += `- **Irrigation**: ${inputs.irrigationType}\n`;
  analysis += `- **Climate Zone**: ${inputs.climateZone}\n`;
  analysis += `- **Market Access**: ${inputs.marketAccess}\n`;
  analysis += `- **Water Rights**: ${inputs.waterRights}\n`;
  analysis += `- **Mineral Rights**: ${inputs.mineralRights}\n`;
  analysis += `- **Zoning**: ${inputs.zoningRestrictions}\n\n`;
  
  analysis += `## Conclusion\n`;
  if (outputs.riskScore < 50 && outputs.cashOnCashReturn > 6) {
    analysis += `This farmland investment presents a favorable risk-return profile with strong cash flow potential and moderate risk. The property's characteristics support sustainable agricultural operations with opportunities for value appreciation.`;
  } else if (outputs.riskScore < 70 && outputs.cashOnCashReturn > 4) {
    analysis += `This investment offers moderate returns with acceptable risk levels. Consider implementing the suggested optimization opportunities to improve performance.`;
  } else {
    analysis += `This investment carries higher risk with limited returns. Careful consideration of the risk factors and potential improvements is recommended before proceeding.`;
  }
  
  return analysis;
}
