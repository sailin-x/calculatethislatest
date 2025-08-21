import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculateVineyardProfitability(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    acreage,
    vineType,
    plantingCosts,
    annualOperatingCosts,
    yieldPerAcre,
    pricePerTon,
    establishmentPeriod,
    productionLifespan,
    discountRate,
    laborCosts,
    equipmentCosts,
    irrigationCosts,
    pestControlCosts,
    harvestingCosts,
    marketingCosts,
    insuranceCosts,
    taxRate,
    landValue,
    replantingCosts
  } = inputs;

  // Convert percentages to decimals
  const discountRateDecimal = (discountRate as number) / 100;
  const taxRateDecimal = (taxRate as number) / 100;

  // Calculate establishment costs
  const totalEstablishmentCosts = calculateEstablishmentCosts(
    acreage as number,
    plantingCosts as number,
    irrigationCosts as number,
    equipmentCosts as number
  );

  // Calculate annual production costs
  const totalAnnualCosts = calculateAnnualOperatingCosts(
    acreage as number,
    annualOperatingCosts as number,
    laborCosts as number,
    pestControlCosts as number,
    harvestingCosts as number,
    marketingCosts as number,
    insuranceCosts as number
  );

  // Calculate annual revenue
  const annualRevenue = calculateAnnualRevenue(
    acreage as number,
    yieldPerAcre as number,
    pricePerTon as number,
    vineType as string
  );

  // Calculate annual net income
  const annualNetIncome = annualRevenue - totalAnnualCosts;
  const annualNetIncomeAfterTax = annualNetIncome * (1 - taxRateDecimal);

  // Calculate NPV and IRR
  const npvAnalysis = calculateNPV(
    totalEstablishmentCosts,
    annualNetIncomeAfterTax,
    establishmentPeriod as number,
    productionLifespan as number,
    discountRateDecimal,
    replantingCosts as number,
    landValue as number
  );

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(
    totalEstablishmentCosts,
    annualNetIncomeAfterTax
  );

  // Calculate profitability ratios
  const profitabilityRatios = calculateProfitabilityRatios(
    annualRevenue,
    totalAnnualCosts,
    totalEstablishmentCosts,
    annualNetIncomeAfterTax
  );

  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(
    totalAnnualCosts,
    pricePerTon as number,
    yieldPerAcre as number,
    acreage as number
  );

  // Calculate sensitivity analysis
  const sensitivityAnalysis = calculateSensitivityAnalysis(
    inputs,
    npvAnalysis.npv
  );

  return {
    // Establishment costs
    totalEstablishmentCosts,
    establishmentCostPerAcre: totalEstablishmentCosts / (acreage as number),

    // Annual operations
    totalAnnualCosts,
    annualCostPerAcre: totalAnnualCosts / (acreage as number),
    annualRevenue,
    revenuePerAcre: annualRevenue / (acreage as number),

    // Profitability metrics
    annualNetIncome,
    annualNetIncomeAfterTax,
    netIncomePerAcre: annualNetIncomeAfterTax / (acreage as number),

    // Financial analysis
    npv: npvAnalysis.npv,
    irr: npvAnalysis.irr,
    paybackPeriod,

    // Ratios
    profitMargin: profitabilityRatios.profitMargin,
    returnOnInvestment: profitabilityRatios.returnOnInvestment,
    costOfProduction: profitabilityRatios.costOfProduction,

    // Break-even analysis
    breakEvenPrice: breakEvenAnalysis.breakEvenPrice,
    breakEvenYield: breakEvenAnalysis.breakEvenYield,
    breakEvenAcreage: breakEvenAnalysis.breakEvenAcreage,

    // Sensitivity analysis
    priceVariation10Percent: sensitivityAnalysis.priceVariation10Percent,
    yieldVariation10Percent: sensitivityAnalysis.yieldVariation10Percent,
    costVariation10Percent: sensitivityAnalysis.costVariation10Percent,

    // Risk metrics
    riskScore: calculateRiskScore(inputs),
    recommendedInsurance: calculateRecommendedInsurance(annualRevenue, vineType as string)
  };
}

function calculateEstablishmentCosts(
  acreage: number,
  plantingCosts: number,
  irrigationCosts: number,
  equipmentCosts: number
): number {
  return acreage * plantingCosts + irrigationCosts + equipmentCosts;
}

function calculateAnnualOperatingCosts(
  acreage: number,
  baseOperatingCosts: number,
  laborCosts: number,
  pestControlCosts: number,
  harvestingCosts: number,
  marketingCosts: number,
  insuranceCosts: number
): number {
  return acreage * baseOperatingCosts + laborCosts + pestControlCosts + 
         harvestingCosts + marketingCosts + insuranceCosts;
}

function calculateAnnualRevenue(
  acreage: number,
  yieldPerAcre: number,
  pricePerTon: number,
  vineType: string
): number {
  // Apply premium/discount based on vine type
  let priceMultiplier = 1;
  switch (vineType.toLowerCase()) {
    case 'premium':
      priceMultiplier = 1.25;
      break;
    case 'organic':
      priceMultiplier = 1.15;
      break;
    case 'standard':
      priceMultiplier = 1.0;
      break;
    default:
      priceMultiplier = 1.0;
  }

  return acreage * yieldPerAcre * pricePerTon * priceMultiplier;
}

function calculateNPV(
  establishmentCosts: number,
  annualNetIncome: number,
  establishmentPeriod: number,
  productionLifespan: number,
  discountRate: number,
  replantingCosts: number,
  landValue: number
): { npv: number; irr: number } {
  let npv = -establishmentCosts;
  const totalYears = establishmentPeriod + productionLifespan;
  
  // No income during establishment period
  for (let year = 1; year <= establishmentPeriod; year++) {
    npv += 0 / Math.pow(1 + discountRate, year);
  }
  
  // Production years
  for (let year = establishmentPeriod + 1; year <= totalYears; year++) {
    let yearlyIncome = annualNetIncome;
    
    // Replanting costs in middle of production
    if (year === Math.floor(totalYears / 2)) {
      yearlyIncome -= replantingCosts;
    }
    
    npv += yearlyIncome / Math.pow(1 + discountRate, year);
  }
  
  // Add residual land value
  npv += landValue / Math.pow(1 + discountRate, totalYears);

  // Calculate IRR (simplified approximation)
  const irr = calculateIRR(establishmentCosts, annualNetIncome, totalYears);

  return { npv, irr };
}

function calculateIRR(
  initialInvestment: number,
  annualCashFlow: number,
  years: number
): number {
  // Simplified IRR calculation using approximation
  if (annualCashFlow <= 0) return 0;
  
  let rate = 0.1; // Starting guess
  let npv = 0;
  
  for (let iteration = 0; iteration < 20; iteration++) {
    npv = -initialInvestment;
    for (let year = 1; year <= years; year++) {
      npv += annualCashFlow / Math.pow(1 + rate, year);
    }
    
    if (Math.abs(npv) < 100) break;
    
    // Adjust rate based on NPV
    if (npv > 0) {
      rate += 0.01;
    } else {
      rate -= 0.01;
    }
    
    if (rate < 0) rate = 0;
  }
  
  return rate * 100; // Return as percentage
}

function calculatePaybackPeriod(
  initialInvestment: number,
  annualNetIncome: number
): number {
  if (annualNetIncome <= 0) return Infinity;
  return initialInvestment / annualNetIncome;
}

function calculateProfitabilityRatios(
  revenue: number,
  costs: number,
  investment: number,
  netIncome: number
): {
  profitMargin: number;
  returnOnInvestment: number;
  costOfProduction: number;
} {
  return {
    profitMargin: revenue > 0 ? (netIncome / revenue) * 100 : 0,
    returnOnInvestment: investment > 0 ? (netIncome / investment) * 100 : 0,
    costOfProduction: revenue > 0 ? (costs / revenue) * 100 : 0
  };
}

function calculateBreakEvenAnalysis(
  totalCosts: number,
  pricePerTon: number,
  yieldPerAcre: number,
  acreage: number
): {
  breakEvenPrice: number;
  breakEvenYield: number;
  breakEvenAcreage: number;
} {
  const totalProduction = acreage * yieldPerAcre;
  
  return {
    breakEvenPrice: totalProduction > 0 ? totalCosts / totalProduction : 0,
    breakEvenYield: pricePerTon > 0 ? totalCosts / (acreage * pricePerTon) : 0,
    breakEvenAcreage: (pricePerTon * yieldPerAcre) > 0 ? totalCosts / (pricePerTon * yieldPerAcre) : 0
  };
}

function calculateSensitivityAnalysis(
  inputs: CalculatorInputs,
  baseNPV: number
): {
  priceVariation10Percent: number;
  yieldVariation10Percent: number;
  costVariation10Percent: number;
} {
  // Price sensitivity (+10%)
  const priceUpInputs = { ...inputs, pricePerTon: (inputs.pricePerTon as number) * 1.1 };
  const priceUpNPV = calculateVineyardProfitability(priceUpInputs).npv as number;
  
  // Yield sensitivity (+10%)
  const yieldUpInputs = { ...inputs, yieldPerAcre: (inputs.yieldPerAcre as number) * 1.1 };
  const yieldUpNPV = calculateVineyardProfitability(yieldUpInputs).npv as number;
  
  // Cost sensitivity (+10%)
  const costUpInputs = { ...inputs, annualOperatingCosts: (inputs.annualOperatingCosts as number) * 1.1 };
  const costUpNPV = calculateVineyardProfitability(costUpInputs).npv as number;
  
  return {
    priceVariation10Percent: ((priceUpNPV - baseNPV) / baseNPV) * 100,
    yieldVariation10Percent: ((yieldUpNPV - baseNPV) / baseNPV) * 100,
    costVariation10Percent: ((costUpNPV - baseNPV) / baseNPV) * 100
  };
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 0;
  
  // High establishment costs increase risk
  const establishmentCostRatio = (inputs.plantingCosts as number) / (inputs.pricePerTon as number * inputs.yieldPerAcre as number);
  if (establishmentCostRatio > 3) riskScore += 2;
  else if (establishmentCostRatio > 2) riskScore += 1;
  
  // Low yield increases risk
  if ((inputs.yieldPerAcre as number) < 3) riskScore += 2;
  else if ((inputs.yieldPerAcre as number) < 5) riskScore += 1;
  
  // Premium varieties may have market risk
  if ((inputs.vineType as string).toLowerCase() === 'premium') riskScore += 1;
  
  // Long establishment period increases risk
  if ((inputs.establishmentPeriod as number) > 4) riskScore += 1;
  
  return Math.min(riskScore, 5); // Cap at 5
}

function calculateRecommendedInsurance(revenue: number, vineType: string): number {
  let baseRate = 0.02; // 2% of revenue
  
  // Adjust based on vine type
  switch (vineType.toLowerCase()) {
    case 'premium':
      baseRate = 0.025; // Higher insurance for premium
      break;
    case 'organic':
      baseRate = 0.022; // Slightly higher for organic
      break;
  }
  
  return revenue * baseRate;
}

export function generateVineyardProfitabilityAnalysis(
  inputs: CalculatorInputs,
  outputs: CalculatorOutputs
): string {
  const analysis = `# Vineyard Profitability Analysis Report

## Executive Summary
This analysis evaluates the financial viability of a ${inputs.acreage}-acre ${inputs.vineType} vineyard operation over a ${inputs.productionLifespan}-year production period.

## Key Financial Metrics
- **Net Present Value (NPV)**: $${(outputs.npv as number).toLocaleString()}
- **Internal Rate of Return (IRR)**: ${(outputs.irr as number).toFixed(1)}%
- **Payback Period**: ${(outputs.paybackPeriod as number).toFixed(1)} years
- **Annual Net Income**: $${(outputs.annualNetIncomeAfterTax as number).toLocaleString()}

## Investment Overview
- **Total Establishment Costs**: $${(outputs.totalEstablishmentCosts as number).toLocaleString()}
- **Cost per Acre**: $${(outputs.establishmentCostPerAcre as number).toLocaleString()}
- **Annual Operating Costs**: $${(outputs.totalAnnualCosts as number).toLocaleString()}

## Revenue Analysis
- **Annual Revenue**: $${(outputs.annualRevenue as number).toLocaleString()}
- **Revenue per Acre**: $${(outputs.revenuePerAcre as number).toLocaleString()}
- **Profit Margin**: ${(outputs.profitMargin as number).toFixed(1)}%

## Break-Even Analysis
- **Break-Even Price**: $${(outputs.breakEvenPrice as number).toFixed(0)} per ton
- **Break-Even Yield**: ${(outputs.breakEvenYield as number).toFixed(1)} tons per acre
- **Break-Even Acreage**: ${(outputs.breakEvenAcreage as number).toFixed(1)} acres

## Risk Assessment
- **Risk Score**: ${outputs.riskScore}/5 ${getRiskLevel(outputs.riskScore as number)}
- **Recommended Insurance**: $${(outputs.recommendedInsurance as number).toLocaleString()} annually

## Sensitivity Analysis
Price sensitivity shows a ${(outputs.priceVariation10Percent as number).toFixed(1)}% NPV change for 10% price variation.
Yield sensitivity shows a ${(outputs.yieldVariation10Percent as number).toFixed(1)}% NPV change for 10% yield variation.
Cost sensitivity shows a ${(outputs.costVariation10Percent as number).toFixed(1)}% NPV change for 10% cost variation.

## Investment Recommendation
${generateInvestmentRecommendation(inputs, outputs)}

## Key Success Factors
${generateSuccessFactors(inputs, outputs)}

---
*This analysis is based on the provided assumptions and should be supplemented with local market research and expert consultation.*`;

  return analysis;
}

function getRiskLevel(score: number): string {
  if (score <= 1) return "(Low Risk)";
  if (score <= 2) return "(Moderate Risk)";
  if (score <= 3) return "(Medium Risk)";
  if (score <= 4) return "(High Risk)";
  return "(Very High Risk)";
}

function generateInvestmentRecommendation(
  inputs: CalculatorInputs,
  outputs: CalculatorOutputs
): string {
  const npv = outputs.npv as number;
  const irr = outputs.irr as number;
  const payback = outputs.paybackPeriod as number;
  const profitMargin = outputs.profitMargin as number;

  if (npv > 0 && irr > 15 && payback < 8 && profitMargin > 20) {
    return "**STRONG BUY**: This vineyard investment shows excellent financial returns with strong NPV, high IRR, and reasonable payback period. The profit margins are healthy and the investment appears financially sound.";
  } else if (npv > 0 && irr > 10 && payback < 12) {
    return "**MODERATE BUY**: This vineyard investment shows positive returns but requires careful management. Monitor market conditions closely and consider implementing cost optimization strategies.";
  } else if (npv > 0 && irr > 8) {
    return "**CAUTIOUS CONSIDERATION**: While the investment shows positive NPV, returns are modest. Consider this only if you have strong expertise in viticulture and secure market channels.";
  } else {
    return "**NOT RECOMMENDED**: Current projections show inadequate returns for the risk involved. Consider revising assumptions, reducing costs, or exploring alternative investment opportunities.";
  }
}

function generateSuccessFactors(
  inputs: CalculatorInputs,
  outputs: CalculatorOutputs
): string {
  const factors = [];
  
  if ((inputs.yieldPerAcre as number) < 5) {
    factors.push("Focus on improving yield per acre through better vineyard management");
  }
  
  if ((outputs.profitMargin as number) < 15) {
    factors.push("Implement cost reduction strategies to improve profit margins");
  }
  
  if ((inputs.vineType as string).toLowerCase() === 'premium') {
    factors.push("Develop strong marketing and distribution channels for premium products");
  }
  
  factors.push("Maintain consistent quality to command premium pricing");
  factors.push("Diversify revenue streams (direct sales, tourism, events)");
  factors.push("Stay informed about market trends and consumer preferences");
  
  return factors.map((factor, index) => `${index + 1}. ${factor}`).join('\n');
}
