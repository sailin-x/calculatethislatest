interface CharterMetrics {
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  roi: number;
  dailyProfit: number;
  costBreakdown: {
    operating: number;
    insurance: number;
    maintenance: number;
    fuel: number;
    crew: number;
    port: number;
  };
}

interface CharterComparison {
  profitDifference: number;
  recommendation: string;
  breakEvenUtilization: number;
  riskAnalysis: string;
  sensitivityAnalysis: {
    fuelPriceImpact: number;
    utilizationImpact: number;
    rateImpact: number;
  };
}

/**
 * Calculate bareboat charter financial metrics
 */
export function calculateBareboatCharter(inputs: Record<string, any>): CharterMetrics {
  const {
    vesselValue,
    charterDuration,
    bareboatRate,
    operatingCosts,
    insuranceCosts,
    maintenanceReserve,
    utilizationRate
  } = inputs;

  // Convert duration to days
  const durationDays = charterDuration * 30.44; // Average days per month
  
  // Calculate effective operating days
  const effectiveDays = durationDays * (utilizationRate / 100);
  
  // Calculate revenue
  const totalRevenue = bareboatRate * effectiveDays;
  
  // Calculate costs
  const operatingCostsTotal = operatingCosts * effectiveDays;
  const insuranceCostsTotal = insuranceCosts * effectiveDays;
  const maintenanceCostsTotal = maintenanceReserve * effectiveDays;
  
  const totalCosts = operatingCostsTotal + insuranceCostsTotal + maintenanceCostsTotal;
  
  // Calculate profit and ROI
  const netProfit = totalRevenue - totalCosts;
  const roi = (netProfit / vesselValue) * 100;
  const dailyProfit = netProfit / effectiveDays;
  
  return {
    totalRevenue,
    totalCosts,
    netProfit,
    roi,
    dailyProfit,
    costBreakdown: {
      operating: operatingCostsTotal,
      insurance: insuranceCostsTotal,
      maintenance: maintenanceCostsTotal,
      fuel: 0, // Not applicable for bareboat
      crew: 0, // Not applicable for bareboat
      port: 0  // Not applicable for bareboat
    }
  };
}

/**
 * Calculate time charter financial metrics
 */
export function calculateTimeCharter(inputs: Record<string, any>): CharterMetrics {
  const {
    vesselValue,
    charterDuration,
    timeCharterRate,
    fuelPrice,
    fuelConsumption,
    crewCosts,
    portCharges,
    utilizationRate
  } = inputs;

  // Convert duration to days
  const durationDays = charterDuration * 30.44;
  
  // Calculate effective operating days
  const effectiveDays = durationDays * (utilizationRate / 100);
  
  // Calculate revenue
  const totalRevenue = timeCharterRate * effectiveDays;
  
  // Calculate costs
  const fuelCostsTotal = fuelPrice * fuelConsumption * effectiveDays;
  const crewCostsTotal = crewCosts * effectiveDays;
  const portCostsTotal = portCharges * effectiveDays;
  
  const totalCosts = fuelCostsTotal + crewCostsTotal + portCostsTotal;
  
  // Calculate profit and ROI
  const netProfit = totalRevenue - totalCosts;
  const roi = (netProfit / vesselValue) * 100;
  const dailyProfit = netProfit / effectiveDays;
  
  return {
    totalRevenue,
    totalCosts,
    netProfit,
    roi,
    dailyProfit,
    costBreakdown: {
      operating: 0, // Not applicable for time charter
      insurance: 0, // Not applicable for time charter
      maintenance: 0, // Not applicable for time charter
      fuel: fuelCostsTotal,
      crew: crewCostsTotal,
      port: portCostsTotal
    }
  };
}

/**
 * Compare bareboat vs time charter options
 */
export function compareCharterOptions(
  bareboatMetrics: CharterMetrics,
  timeCharterMetrics: CharterMetrics,
  inputs: Record<string, any>
): CharterComparison {
  const profitDifference = timeCharterMetrics.netProfit - bareboatMetrics.netProfit;
  
  // Determine recommendation
  let recommendation: string;
  if (profitDifference > 0) {
    recommendation = 'Time Charter';
  } else if (profitDifference < 0) {
    recommendation = 'Bareboat Charter';
  } else {
    recommendation = 'Both options are equivalent';
  }
  
  // Calculate break-even utilization rate
  const breakEvenUtilization = calculateBreakEvenUtilization(inputs);
  
  // Risk analysis
  const riskAnalysis = generateRiskAnalysis(bareboatMetrics, timeCharterMetrics, inputs);
  
  // Sensitivity analysis
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs);
  
  return {
    profitDifference,
    recommendation,
    breakEvenUtilization,
    riskAnalysis,
    sensitivityAnalysis
  };
}

/**
 * Calculate break-even utilization rate for time charter to match bareboat profit
 */
function calculateBreakEvenUtilization(inputs: Record<string, any>): number {
  const {
    vesselValue,
    charterDuration,
    bareboatRate,
    timeCharterRate,
    operatingCosts,
    insuranceCosts,
    maintenanceReserve,
    fuelPrice,
    fuelConsumption,
    crewCosts,
    portCharges
  } = inputs;

  const durationDays = charterDuration * 30.44;
  
  // Calculate bareboat profit per day
  const bareboatRevenuePerDay = bareboatRate;
  const bareboatCostsPerDay = operatingCosts + insuranceCosts + maintenanceReserve;
  const bareboatProfitPerDay = bareboatRevenuePerDay - bareboatCostsPerDay;
  
  // Calculate time charter costs per day
  const timeCharterCostsPerDay = (fuelPrice * fuelConsumption) + crewCosts + portCharges;
  
  // Calculate break-even rate
  const breakEvenRate = bareboatProfitPerDay + timeCharterCostsPerDay;
  
  // Calculate utilization needed for time charter to match bareboat profit
  const utilizationNeeded = (breakEvenRate / timeCharterRate) * 100;
  
  return Math.max(0, Math.min(100, utilizationNeeded));
}

/**
 * Generate risk analysis for both charter options
 */
function generateRiskAnalysis(
  bareboatMetrics: CharterMetrics,
  timeCharterMetrics: CharterMetrics,
  inputs: Record<string, any>
): string {
  const { fuelPrice, fuelConsumption, utilizationRate } = inputs;
  
  const bareboatRoi = bareboatMetrics.roi;
  const timeCharterRoi = timeCharterMetrics.roi;
  
  let analysis = '';
  
  // ROI comparison
  if (timeCharterRoi > bareboatRoi) {
    analysis += `Time Charter offers higher ROI (${timeCharterRoi.toFixed(1)}% vs ${bareboatRoi.toFixed(1)}%). `;
  } else {
    analysis += `Bareboat Charter offers higher ROI (${bareboatRoi.toFixed(1)}% vs ${timeCharterRoi.toFixed(1)}%). `;
  }
  
  // Fuel price risk for time charter
  const fuelCostPerDay = fuelPrice * fuelConsumption;
  const fuelCostPercentage = (fuelCostPerDay / timeCharterMetrics.totalRevenue) * 100;
  
  if (fuelCostPercentage > 30) {
    analysis += 'High fuel cost exposure in Time Charter. ';
  } else if (fuelCostPercentage > 20) {
    analysis += 'Moderate fuel cost exposure in Time Charter. ';
  } else {
    analysis += 'Low fuel cost exposure in Time Charter. ';
  }
  
  // Utilization risk
  if (utilizationRate < 70) {
    analysis += 'Low utilization rate increases operational risk. ';
  } else if (utilizationRate > 90) {
    analysis += 'High utilization rate reduces operational risk. ';
  }
  
  // Market volatility considerations
  analysis += 'Consider market volatility and charter rate fluctuations in your decision. ';
  
  return analysis;
}

/**
 * Calculate sensitivity analysis for key variables
 */
function calculateSensitivityAnalysis(inputs: Record<string, any>): {
  fuelPriceImpact: number;
  utilizationImpact: number;
  rateImpact: number;
} {
  const { fuelPrice, fuelConsumption, utilizationRate, timeCharterRate, charterDuration } = inputs;
  
  const durationDays = charterDuration * 30.44;
  const effectiveDays = durationDays * (utilizationRate / 100);
  
  // Fuel price impact (10% change)
  const fuelPriceChange = fuelPrice * 0.1;
  const fuelImpact = fuelPriceChange * fuelConsumption * effectiveDays;
  
  // Utilization impact (5% change)
  const utilizationChange = utilizationRate * 0.05;
  const utilizationImpact = timeCharterRate * (durationDays * utilizationChange / 100);
  
  // Rate impact (5% change)
  const rateChange = timeCharterRate * 0.05;
  const rateImpact = rateChange * effectiveDays;
  
  return {
    fuelPriceImpact: fuelImpact,
    utilizationImpact: utilizationImpact,
    rateImpact: rateImpact
  };
}

/**
 * Calculate vessel efficiency metrics
 */
export function calculateVesselEfficiency(inputs: Record<string, any>): {
  fuelEfficiency: number;
  costPerDay: number;
  revenuePerDay: number;
  profitMargin: number;
} {
  const {
    fuelConsumption,
    fuelPrice,
    crewCosts,
    portCharges,
    timeCharterRate,
    bareboatRate
  } = inputs;
  
  const fuelEfficiency = fuelConsumption; // tons per day
  const costPerDay = (fuelPrice * fuelConsumption) + crewCosts + portCharges;
  const revenuePerDay = Math.max(timeCharterRate, bareboatRate);
  const profitMargin = ((revenuePerDay - costPerDay) / revenuePerDay) * 100;
  
  return {
    fuelEfficiency,
    costPerDay,
    revenuePerDay,
    profitMargin
  };
}

/**
 * Calculate charter rate competitiveness
 */
export function calculateRateCompetitiveness(
  bareboatRate: number,
  timeCharterRate: number,
  marketRates: { bareboat: number; timeCharter: number }
): {
  bareboatCompetitiveness: number;
  timeCharterCompetitiveness: number;
  marketPosition: string;
} {
  const bareboatCompetitiveness = (bareboatRate / marketRates.bareboat) * 100;
  const timeCharterCompetitiveness = (timeCharterRate / marketRates.timeCharter) * 100;
  
  let marketPosition = '';
  if (bareboatCompetitiveness > 110) {
    marketPosition = 'Above market rates';
  } else if (bareboatCompetitiveness < 90) {
    marketPosition = 'Below market rates';
  } else {
    marketPosition = 'Market competitive rates';
  }
  
  return {
    bareboatCompetitiveness,
    timeCharterCompetitiveness,
    marketPosition
  };
}
