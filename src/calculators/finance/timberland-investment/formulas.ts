import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Timber type factors and adjustments
const TIMBER_TYPE_FACTORS = {
  pine: { priceMultiplier: 1.0, growthRate: 1.0, rotationAge: 25 },
  oak: { priceMultiplier: 1.3, growthRate: 0.8, rotationAge: 40 },
  maple: { priceMultiplier: 1.2, growthRate: 0.9, rotationAge: 35 },
  cherry: { priceMultiplier: 1.5, growthRate: 0.7, rotationAge: 45 },
  walnut: { priceMultiplier: 1.8, growthRate: 0.6, rotationAge: 50 },
  'mixed': { priceMultiplier: 1.1, growthRate: 0.85, rotationAge: 30 },
  'douglas-fir': { priceMultiplier: 1.1, growthRate: 1.1, rotationAge: 30 },
  redwood: { priceMultiplier: 2.0, growthRate: 0.5, rotationAge: 60 },
  cedar: { priceMultiplier: 1.4, growthRate: 0.9, rotationAge: 35 },
  other: { priceMultiplier: 1.0, growthRate: 1.0, rotationAge: 25 }
};

const HARVEST_SCHEDULE_FACTORS = {
  'clear-cut': { efficiency: 1.0, costMultiplier: 1.0 },
  selective: { efficiency: 0.8, costMultiplier: 1.2 },
  thinning: { efficiency: 0.9, costMultiplier: 1.1 },
  continuous: { efficiency: 0.7, costMultiplier: 1.3 }
};

export function calculateTimberlandInvestment(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract input values
  const propertySize = inputs.propertySize as number;
  const purchasePrice = inputs.purchasePrice as number;
  const downPayment = inputs.downPayment as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const timberType = inputs.timberType as string;
  const currentStandAge = inputs.currentStandAge as number;
  const rotationAge = inputs.rotationAge as number;
  const currentVolume = inputs.currentVolume as number;
  const matureVolume = inputs.matureVolume as number;
  const timberPrice = inputs.timberPrice as number;
  const priceGrowthRate = inputs.priceGrowthRate as number;
  const volumeGrowthRate = inputs.volumeGrowthRate as number;
  const harvestCosts = inputs.harvestCosts as number;
  const replantingCosts = inputs.replantingCosts as number;
  const annualExpenses = inputs.annualExpenses as number;
  const propertyTaxes = inputs.propertyTaxes as number;
  const insurance = inputs.insurance as number;
  const managementFee = inputs.managementFee as number;
  const appreciationRate = inputs.appreciationRate as number;
  const analysisPeriod = inputs.analysisPeriod as number;
  const harvestSchedule = inputs.harvestSchedule as string;
  const thinningVolume = inputs.thinningVolume as number;
  const thinningAge = inputs.thinningAge as number;
  const thinningPrice = inputs.thinningPrice as number;

  // Calculate loan amount and monthly payment
  const loanAmount = purchasePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
                        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  const annualDebtService = monthlyPayment * 12;

  // Apply timber type adjustments
  const timberFactors = TIMBER_TYPE_FACTORS[timberType as keyof typeof TIMBER_TYPE_FACTORS] || TIMBER_TYPE_FACTORS.other;
  const adjustedTimberPrice = timberPrice * timberFactors.priceMultiplier;
  const adjustedVolumeGrowthRate = volumeGrowthRate * timberFactors.growthRate;
  const adjustedRotationAge = rotationAge * timberFactors.rotationAge / 25;

  // Calculate harvest schedule
  const harvestScheduleData = generateHarvestSchedule(inputs, adjustedRotationAge, adjustedTimberPrice, adjustedVolumeGrowthRate);
  const nextHarvestYear = harvestScheduleData.nextHarvestYear;
  const totalHarvestRevenue = harvestScheduleData.totalRevenue;

  // Calculate annual operating income
  const totalAnnualExpenses = propertySize * annualExpenses + propertyTaxes + insurance;
  const managementFeeAmount = totalHarvestRevenue / analysisPeriod * (managementFee / 100);
  const annualOperatingIncome = (totalHarvestRevenue / analysisPeriod) - totalAnnualExpenses - managementFeeAmount;

  // Calculate cash flow
  const annualCashFlow = annualOperatingIncome - annualDebtService;

  // Calculate key metrics
  const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
  const debtServiceCoverage = annualOperatingIncome / annualDebtService;

  // Calculate projected land value and total return
  const projectedLandValue = purchasePrice * Math.pow(1 + appreciationRate / 100, analysisPeriod);
  const totalReturn = projectedLandValue - purchasePrice + totalHarvestRevenue;
  const totalROI = (totalReturn / downPayment) * 100;

  // Calculate NPV and IRR
  const discountRate = interestRate / 100;
  let npv = -downPayment;
  for (let year = 1; year <= analysisPeriod; year++) {
    const harvestRevenueThisYear = harvestScheduleData.revenueByYear[year] || 0;
    const annualCost = totalAnnualExpenses + annualDebtService;
    npv += (harvestRevenueThisYear - annualCost) / Math.pow(1 + discountRate, year);
  }
  npv += projectedLandValue / Math.pow(1 + discountRate, analysisPeriod);

  const irr = calculateIRR(downPayment, harvestScheduleData.revenueByYear, totalAnnualExpenses, annualDebtService, projectedLandValue, analysisPeriod);

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(downPayment, harvestScheduleData.revenueByYear, totalAnnualExpenses, annualDebtService);

  // Calculate annualized return
  const annualizedReturn = Math.pow((totalReturn + downPayment) / downPayment, 1 / analysisPeriod) - 1;
  const annualizedReturnPercent = annualizedReturn * 100;

  // Calculate scoring metrics
  const profitabilityScore = calculateProfitabilityScore(cashOnCashReturn, totalROI, debtServiceCoverage);
  const investmentScore = calculateInvestmentScore(totalROI, irr, paybackPeriod, annualizedReturnPercent);
  const riskScore = calculateRiskScore(nextHarvestYear, debtServiceCoverage, currentStandAge, rotationAge);
  const valueScore = calculateValueScore(purchasePrice, propertySize, currentVolume, matureVolume, adjustedTimberPrice);

  // Generate recommendation
  const recommendation = generateRecommendation(inputs, {
    totalROI,
    cashOnCashReturn,
    debtServiceCoverage,
    nextHarvestYear,
    profitabilityScore,
    investmentScore,
    riskScore,
    valueScore,
    recommendation: ''
  });

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    annualOperatingIncome: Math.round(annualOperatingIncome * 100) / 100,
    annualCashFlow: Math.round(annualCashFlow * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    totalROI: Math.round(totalROI * 100) / 100,
    internalRateOfReturn: Math.round(irr * 100) / 100,
    netPresentValue: Math.round(npv * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    harvestRevenue: Math.round(totalHarvestRevenue * 100) / 100,
    landValue: Math.round(projectedLandValue * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    annualizedReturn: Math.round(annualizedReturnPercent * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    profitabilityScore: Math.round(profitabilityScore),
    investmentScore: Math.round(investmentScore),
    riskScore: Math.round(riskScore),
    valueScore: Math.round(valueScore),
    nextHarvestYear: Math.round(nextHarvestYear),
    harvestSchedule: harvestScheduleData.schedule,
    recommendation: recommendation
  };
}

function generateHarvestSchedule(inputs: CalculatorInputs, adjustedRotationAge: number, adjustedTimberPrice: number, adjustedVolumeGrowthRate: number): any {
  const propertySize = inputs.propertySize as number;
  const currentStandAge = inputs.currentStandAge as number;
  const currentVolume = inputs.currentVolume as number;
  const matureVolume = inputs.matureVolume as number;
  const priceGrowthRate = inputs.priceGrowthRate as number;
  const harvestCosts = inputs.harvestCosts as number;
  const replantingCosts = inputs.replantingCosts as number;
  const analysisPeriod = inputs.analysisPeriod as number;
  const harvestSchedule = inputs.harvestSchedule as string;
  const thinningVolume = inputs.thinningVolume as number;
  const thinningAge = inputs.thinningAge as number;
  const thinningPrice = inputs.thinningPrice as number;

  const schedule = [];
  const revenueByYear: { [key: number]: number } = {};
  let totalRevenue = 0;
  let nextHarvestYear = 0;

  // Calculate years until first harvest
  const yearsToFirstHarvest = Math.max(0, adjustedRotationAge - currentStandAge);
  nextHarvestYear = yearsToFirstHarvest;

  if (harvestSchedule === 'thinning') {
    // Thinning harvest
    if (currentStandAge >= thinningAge) {
      const thinningRevenue = propertySize * thinningVolume * thinningPrice;
      const thinningCosts = propertySize * harvestCosts * 0.6; // Thinning costs are lower
      const netThinningRevenue = thinningRevenue - thinningCosts;
      
      schedule.push({
        year: 1,
        type: 'Thinning',
        volume: propertySize * thinningVolume,
        revenue: Math.round(thinningRevenue * 100) / 100,
        costs: Math.round(thinningCosts * 100) / 100,
        netRevenue: Math.round(netThinningRevenue * 100) / 100
      });
      
      revenueByYear[1] = netThinningRevenue;
      totalRevenue += netThinningRevenue;
    }

    // Final harvest
    const finalHarvestYear = yearsToFirstHarvest + 1;
    if (finalHarvestYear <= analysisPeriod) {
      const finalVolume = matureVolume * Math.pow(1 + adjustedVolumeGrowthRate / 100, yearsToFirstHarvest);
      const finalPrice = adjustedTimberPrice * Math.pow(1 + priceGrowthRate / 100, finalHarvestYear - 1);
      const finalRevenue = propertySize * finalVolume * finalPrice;
      const finalCosts = propertySize * (harvestCosts + replantingCosts);
      const netFinalRevenue = finalRevenue - finalCosts;

      schedule.push({
        year: finalHarvestYear,
        type: 'Final Harvest',
        volume: propertySize * finalVolume,
        revenue: Math.round(finalRevenue * 100) / 100,
        costs: Math.round(finalCosts * 100) / 100,
        netRevenue: Math.round(netFinalRevenue * 100) / 100
      });

      revenueByYear[finalHarvestYear] = netFinalRevenue;
      totalRevenue += netFinalRevenue;
    }
  } else if (harvestSchedule === 'clear-cut') {
    // Clear cut harvest
    const harvestYear = yearsToFirstHarvest + 1;
    if (harvestYear <= analysisPeriod) {
      const harvestVolume = matureVolume * Math.pow(1 + adjustedVolumeGrowthRate / 100, yearsToFirstHarvest);
      const harvestPrice = adjustedTimberPrice * Math.pow(1 + priceGrowthRate / 100, harvestYear - 1);
      const harvestRevenue = propertySize * harvestVolume * harvestPrice;
      const harvestCostsTotal = propertySize * (harvestCosts + replantingCosts);
      const netHarvestRevenue = harvestRevenue - harvestCostsTotal;

      schedule.push({
        year: harvestYear,
        type: 'Clear Cut',
        volume: propertySize * harvestVolume,
        revenue: Math.round(harvestRevenue * 100) / 100,
        costs: Math.round(harvestCostsTotal * 100) / 100,
        netRevenue: Math.round(netHarvestRevenue * 100) / 100
      });

      revenueByYear[harvestYear] = netHarvestRevenue;
      totalRevenue += netHarvestRevenue;
    }
  } else if (harvestSchedule === 'selective') {
    // Selective harvest (multiple smaller harvests)
    let currentAge = currentStandAge;
    let year = 1;
    
    while (year <= analysisPeriod && currentAge < adjustedRotationAge) {
      const selectiveVolume = matureVolume * 0.3 * Math.pow(1 + adjustedVolumeGrowthRate / 100, currentAge - currentStandAge);
      const selectivePrice = adjustedTimberPrice * Math.pow(1 + priceGrowthRate / 100, year - 1);
      const selectiveRevenue = propertySize * selectiveVolume * selectivePrice;
      const selectiveCosts = propertySize * harvestCosts * 0.8; // Selective harvest costs are lower
      const netSelectiveRevenue = selectiveRevenue - selectiveCosts;

      schedule.push({
        year: year,
        type: 'Selective Harvest',
        volume: propertySize * selectiveVolume,
        revenue: Math.round(selectiveRevenue * 100) / 100,
        costs: Math.round(selectiveCosts * 100) / 100,
        netRevenue: Math.round(netSelectiveRevenue * 100) / 100
      });

      revenueByYear[year] = netSelectiveRevenue;
      totalRevenue += netSelectiveRevenue;
      
      currentAge += 5; // Selective harvest every 5 years
      year += 5;
    }
  } else if (harvestSchedule === 'continuous') {
    // Continuous harvest (small annual harvests)
    for (let year = 1; year <= analysisPeriod; year++) {
      const continuousVolume = matureVolume * 0.05 * Math.pow(1 + adjustedVolumeGrowthRate / 100, year - 1);
      const continuousPrice = adjustedTimberPrice * Math.pow(1 + priceGrowthRate / 100, year - 1);
      const continuousRevenue = propertySize * continuousVolume * continuousPrice;
      const continuousCosts = propertySize * harvestCosts * 0.5; // Continuous harvest costs are lower
      const netContinuousRevenue = continuousRevenue - continuousCosts;

      schedule.push({
        year: year,
        type: 'Continuous Harvest',
        volume: propertySize * continuousVolume,
        revenue: Math.round(continuousRevenue * 100) / 100,
        costs: Math.round(continuousCosts * 100) / 100,
        netRevenue: Math.round(netContinuousRevenue * 100) / 100
      });

      revenueByYear[year] = netContinuousRevenue;
      totalRevenue += netContinuousRevenue;
    }
  }

  return {
    schedule,
    revenueByYear,
    totalRevenue,
    nextHarvestYear
  };
}

function calculateIRR(initialInvestment: number, revenueByYear: { [key: number]: number }, annualExpenses: number, annualDebtService: number, finalLandValue: number, analysisPeriod: number): number {
  // Simplified IRR calculation using trial and error
  let rate = 0.1; // Start with 10%
  let npv = -initialInvestment;
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const revenue = revenueByYear[year] || 0;
    const annualCost = annualExpenses + annualDebtService;
    const netCashFlow = revenue - annualCost;
    npv += netCashFlow / Math.pow(1 + rate, year);
  }
  npv += finalLandValue / Math.pow(1 + rate, analysisPeriod);
  
  // Simple adjustment based on NPV
  if (npv > 0) {
    rate += 0.02;
  } else {
    rate -= 0.02;
  }
  
  return Math.max(0, Math.min(1, rate)); // Clamp between 0% and 100%
}

function calculatePaybackPeriod(initialInvestment: number, revenueByYear: { [key: number]: number }, annualExpenses: number, annualDebtService: number): number {
  let cumulativeCashFlow = 0;
  let year = 0;
  
  while (cumulativeCashFlow < initialInvestment && year < 50) {
    year++;
    const revenue = revenueByYear[year] || 0;
    const annualCost = annualExpenses + annualDebtService;
    const netCashFlow = revenue - annualCost;
    cumulativeCashFlow += netCashFlow;
  }
  
  if (cumulativeCashFlow >= initialInvestment) {
    const remainingAmount = initialInvestment - (cumulativeCashFlow - (revenueByYear[year] || 0) + annualExpenses + annualDebtService);
    const lastNetCashFlow = (revenueByYear[year] || 0) - annualExpenses - annualDebtService;
    const partialYear = remainingAmount / lastNetCashFlow;
    return year - 1 + partialYear;
  }
  
  return 999; // Never payback
}

function calculateProfitabilityScore(cashOnCashReturn: number, totalROI: number, debtServiceCoverage: number): number {
  let score = 0;
  
  // Cash-on-cash return scoring (0-30 points)
  if (cashOnCashReturn >= 8) score += 30;
  else if (cashOnCashReturn >= 6) score += 25;
  else if (cashOnCashReturn >= 4) score += 20;
  else if (cashOnCashReturn >= 2) score += 15;
  else if (cashOnCashReturn >= 0) score += 10;
  else if (cashOnCashReturn >= -2) score += 5;
  
  // Total ROI scoring (0-40 points)
  if (totalROI >= 150) score += 40;
  else if (totalROI >= 100) score += 35;
  else if (totalROI >= 75) score += 30;
  else if (totalROI >= 50) score += 25;
  else if (totalROI >= 25) score += 20;
  else if (totalROI >= 10) score += 15;
  else if (totalROI >= 0) score += 10;
  
  // Debt service coverage scoring (0-30 points)
  if (debtServiceCoverage >= 1.5) score += 30;
  else if (debtServiceCoverage >= 1.3) score += 25;
  else if (debtServiceCoverage >= 1.2) score += 20;
  else if (debtServiceCoverage >= 1.1) score += 15;
  else if (debtServiceCoverage >= 1.0) score += 10;
  else if (debtServiceCoverage >= 0.8) score += 5;
  
  return Math.min(100, score);
}

function calculateInvestmentScore(totalROI: number, irr: number, paybackPeriod: number, annualizedReturn: number): number {
  let score = 0;
  
  // Total ROI scoring (0-30 points)
  if (totalROI >= 200) score += 30;
  else if (totalROI >= 150) score += 25;
  else if (totalROI >= 100) score += 20;
  else if (totalROI >= 75) score += 15;
  else if (totalROI >= 50) score += 10;
  else if (totalROI >= 25) score += 5;
  
  // IRR scoring (0-30 points)
  const irrPercent = irr * 100;
  if (irrPercent >= 15) score += 30;
  else if (irrPercent >= 12) score += 25;
  else if (irrPercent >= 10) score += 20;
  else if (irrPercent >= 8) score += 15;
  else if (irrPercent >= 6) score += 10;
  else if (irrPercent >= 4) score += 5;
  
  // Payback period scoring (0-20 points)
  if (paybackPeriod <= 5) score += 20;
  else if (paybackPeriod <= 8) score += 15;
  else if (paybackPeriod <= 12) score += 10;
  else if (paybackPeriod <= 15) score += 5;
  
  // Annualized return scoring (0-20 points)
  if (annualizedReturn >= 12) score += 20;
  else if (annualizedReturn >= 10) score += 15;
  else if (annualizedReturn >= 8) score += 10;
  else if (annualizedReturn >= 6) score += 5;
  
  return Math.min(100, score);
}

function calculateRiskScore(nextHarvestYear: number, debtServiceCoverage: number, currentStandAge: number, rotationAge: number): number {
  let score = 100; // Start with perfect score, subtract for risks
  
  // Time to harvest risk (0-30 points deducted)
  if (nextHarvestYear > 15) score -= 30;
  else if (nextHarvestYear > 10) score -= 20;
  else if (nextHarvestYear > 5) score -= 15;
  else if (nextHarvestYear > 2) score -= 10;
  
  // Debt service coverage risk (0-30 points deducted)
  if (debtServiceCoverage < 1.0) score -= 30;
  else if (debtServiceCoverage < 1.2) score -= 20;
  else if (debtServiceCoverage < 1.3) score -= 15;
  else if (debtServiceCoverage < 1.5) score -= 10;
  
  // Stand age risk (0-25 points deducted)
  const standAgeRatio = currentStandAge / rotationAge;
  if (standAgeRatio > 0.8) score -= 25;
  else if (standAgeRatio > 0.6) score -= 15;
  else if (standAgeRatio > 0.4) score -= 10;
  else if (standAgeRatio > 0.2) score -= 5;
  
  // Rotation age risk (0-15 points deducted)
  if (rotationAge > 50) score -= 15;
  else if (rotationAge > 40) score -= 10;
  else if (rotationAge > 30) score -= 5;
  
  return Math.max(0, score);
}

function calculateValueScore(purchasePrice: number, propertySize: number, currentVolume: number, matureVolume: number, timberPrice: number): number {
  let score = 0;
  
  // Price per acre scoring (0-25 points)
  const pricePerAcre = purchasePrice / propertySize;
  if (pricePerAcre <= 1500) score += 25;
  else if (pricePerAcre <= 2500) score += 20;
  else if (pricePerAcre <= 3500) score += 15;
  else if (pricePerAcre <= 5000) score += 10;
  else if (pricePerAcre <= 7500) score += 5;
  
  // Current volume scoring (0-25 points)
  if (currentVolume >= 8000) score += 25;
  else if (currentVolume >= 6000) score += 20;
  else if (currentVolume >= 4000) score += 15;
  else if (currentVolume >= 2000) score += 10;
  else if (currentVolume >= 1000) score += 5;
  
  // Mature volume potential scoring (0-25 points)
  if (matureVolume >= 20000) score += 25;
  else if (matureVolume >= 15000) score += 20;
  else if (matureVolume >= 10000) score += 15;
  else if (matureVolume >= 8000) score += 10;
  else if (matureVolume >= 5000) score += 5;
  
  // Timber price scoring (0-25 points)
  if (timberPrice >= 0.5) score += 25;
  else if (timberPrice >= 0.4) score += 20;
  else if (timberPrice >= 0.3) score += 15;
  else if (timberPrice >= 0.2) score += 10;
  else if (timberPrice >= 0.1) score += 5;
  
  return Math.min(100, score);
}

function generateRecommendation(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const recommendations = [];
  
  // Cash flow recommendations
  if (outputs.annualCashFlow < 0) {
    recommendations.push("⚠️ **Critical**: Negative cash flow detected. Consider longer loan term or larger down payment.");
  } else if (outputs.cashOnCashReturn < 4) {
    recommendations.push("📊 **Low Returns**: Cash-on-cash return below 4%. Consider alternative investments or renegotiate terms.");
  }
  
  // Harvest timing recommendations
  if (outputs.nextHarvestYear > 10) {
    recommendations.push("🌳 **Long Wait**: Extended period until first harvest. Consider properties with more mature stands.");
  } else if (outputs.nextHarvestYear <= 2) {
    recommendations.push("✅ **Immediate Opportunity**: Harvest opportunity available soon. Good for cash flow.");
  }
  
  // Debt service recommendations
  if (outputs.debtServiceCoverage < 1.2) {
    recommendations.push("💳 **Tight Coverage**: Debt service coverage below 1.2x. Consider larger down payment or longer term.");
  }
  
  // Investment quality recommendations
  if (outputs.investmentScore >= 80) {
    recommendations.push("✅ **Strong Investment**: High investment score indicates excellent potential returns.");
  } else if (outputs.investmentScore < 50) {
    recommendations.push("❌ **Poor Investment**: Low investment score suggests reconsidering this opportunity.");
  }
  
  // Risk management recommendations
  if (outputs.riskScore < 60) {
    recommendations.push("⚠️ **High Risk**: Risk score indicates significant investment risks. Consider mitigation strategies.");
  }
  
  // Value recommendations
  if (outputs.valueScore >= 80) {
    recommendations.push("💎 **Excellent Value**: High value score suggests favorable purchase terms and timber quality.");
  }
  
  // Timber type specific recommendations
  const timberType = inputs.timberType as string;
  if (timberType === 'redwood' || timberType === 'walnut') {
    recommendations.push("🌲 **Premium Timber**: High-value timber species. Consider longer holding period for maximum returns.");
  } else if (timberType === 'pine') {
    recommendations.push("🌲 **Fast Growth**: Pine offers quicker rotation cycles. Good for regular cash flow.");
  }
  
  return recommendations.join('\n\n');
}

export function generateTimberlandInvestmentAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const harvestSchedule = outputs.harvestSchedule as any[];
  
  return `# Timberland Investment Analysis

## Executive Summary
This analysis evaluates the financial performance of a ${inputs.propertySize?.toLocaleString()} acre timberland property with ${inputs.timberType} timber.

### Key Metrics
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%
- **Total ROI**: ${outputs.totalROI}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%
- **Debt Service Coverage**: ${outputs.debtServiceCoverage}x
- **Next Harvest**: ${outputs.nextHarvestYear} years

## Financial Performance

### Investment Returns
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn}%
- **Total ROI**: ${outputs.totalROI}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn}%
- **Annualized Return**: ${outputs.annualizedReturn}%
- **Payback Period**: ${outputs.paybackPeriod} years

### Cash Flow Analysis
- **Annual Operating Income**: $${outputs.annualOperatingIncome?.toLocaleString()}
- **Annual Cash Flow**: $${outputs.annualCashFlow?.toLocaleString()}
- **Monthly Mortgage Payment**: $${outputs.monthlyPayment?.toLocaleString()}

### Harvest Revenue
- **Total Harvest Revenue**: $${outputs.harvestRevenue?.toLocaleString()}
- **Projected Land Value**: $${outputs.landValue?.toLocaleString()}
- **Total Return**: $${outputs.totalReturn?.toLocaleString()}

## Harvest Schedule

| Year | Type | Volume (board feet) | Revenue | Costs | Net Revenue |
|------|------|-------------------|---------|-------|-------------|
${harvestSchedule.map(h => `| ${h.year} | ${h.type} | ${h.volume?.toLocaleString()} | $${h.revenue?.toLocaleString()} | $${h.costs?.toLocaleString()} | $${h.netRevenue?.toLocaleString()} |`).join('\n')}

## Property Details
- **Property Size**: ${inputs.propertySize?.toLocaleString()} acres
- **Timber Type**: ${inputs.timberType}
- **Current Stand Age**: ${inputs.currentStandAge} years
- **Rotation Age**: ${inputs.rotationAge} years
- **Current Volume**: ${inputs.currentVolume?.toLocaleString()} board feet/acre
- **Mature Volume**: ${inputs.matureVolume?.toLocaleString()} board feet/acre

## Financial Terms
- **Purchase Price**: $${inputs.purchasePrice?.toLocaleString()}
- **Down Payment**: $${inputs.downPayment?.toLocaleString()}
- **Loan Amount**: $${(inputs.purchasePrice as number - inputs.downPayment as number)?.toLocaleString()}
- **Interest Rate**: ${inputs.interestRate}%
- **Loan Term**: ${inputs.loanTerm} years

## Market Assumptions
- **Timber Price**: $${inputs.timberPrice}/board foot
- **Price Growth Rate**: ${inputs.priceGrowthRate}%
- **Volume Growth Rate**: ${inputs.volumeGrowthRate}%
- **Land Appreciation**: ${inputs.appreciationRate}%

## Assessment Scores
- **Profitability Score**: ${outputs.profitabilityScore}/100
- **Investment Score**: ${outputs.investmentScore}/100
- **Risk Score**: ${outputs.riskScore}/100
- **Value Score**: ${outputs.valueScore}/100

## Recommendations

${outputs.recommendation}

## Investment Decision
Based on the analysis:
- **Overall Score**: ${Math.round((outputs.profitabilityScore + outputs.investmentScore + outputs.riskScore + outputs.valueScore) / 4)}/100
- **Recommendation**: ${outputs.investmentScore >= 70 ? 'Consider proceeding with investment' : 'Reconsider or renegotiate terms'}

---
*Analysis generated on ${new Date().toLocaleDateString()}*
`;
}
