import { TimberlandInvestmentInputs, TimberlandInvestmentResults } from './types';

/**
 * Calculate timberland investment ROI and financial metrics
 */
export function calculateTimberlandInvestment(inputs: TimberlandInvestmentInputs): TimberlandInvestmentResults {
  const {
    acreage,
    timberType,
    ageOfTimber,
    timberVolumePerAcre,
    landCostPerAcre,
    timberValuePerAcre,
    totalAcquisitionCost,
    financingAmount,
    interestRate,
    loanTerm,
    annualManagementCost,
    annualInsuranceCost,
    annualPropertyTaxes,
    annualMaintenanceCost,
    harvestingCostPerAcre,
    timberPricePerUnit,
    annualAppreciationRate,
    harvestCycleYears,
    expectedHarvestVolume,
    analysisPeriod,
    discountRate,
    taxRate,
    inflationRate
  } = inputs;

  // Calculate total investment
  const landCost = acreage * landCostPerAcre;
  const timberCost = acreage * timberValuePerAcre;
  const totalInvestment = totalAcquisitionCost || (landCost + timberCost);

  // Calculate annual revenue (primarily from timber harvesting)
  const harvestCyclesPerYear = 1 / harvestCycleYears;
  const annualHarvestVolume = expectedHarvestVolume * harvestCyclesPerYear;
  const annualRevenue = annualHarvestVolume * timberPricePerUnit;

  // Calculate annual expenses
  const annualExpenses = annualManagementCost + annualInsuranceCost +
                        annualPropertyTaxes + annualMaintenanceCost +
                        (harvestingCostPerAcre * acreage * harvestCyclesPerYear);

  // Calculate NOI (Net Operating Income)
  const netOperatingIncome = annualRevenue - annualExpenses;

  // Calculate debt service
  const annualDebtService = financingAmount > 0 ?
    calculateAnnualDebtService(financingAmount, interestRate, loanTerm) : 0;

  // Calculate cash flow
  const cashFlow = netOperatingIncome - annualDebtService;

  // Calculate financial metrics
  const capRate = totalInvestment > 0 ? (netOperatingIncome / totalInvestment) * 100 : 0;
  const cashOnCashReturn = financingAmount > 0 ? (cashFlow / financingAmount) * 100 : 0;

  // Calculate IRR and NPV
  const { irr, npv } = calculateIRRAndNPV(totalInvestment, financingAmount, analysisPeriod, discountRate, cashFlow);

  // Calculate timber-specific metrics
  const totalTimberValue = acreage * timberValuePerAcre;
  const annualGrowthRate = calculateTimberGrowthRate(timberType, ageOfTimber);
  const harvestRevenue = expectedHarvestVolume * timberPricePerUnit;
  const harvestFrequency = harvestCycleYears;

  // Calculate investment analysis
  const paybackPeriod = totalInvestment > 0 ? totalInvestment / cashFlow : 0;
  const totalReturn = cashFlow * analysisPeriod;
  const roiPercentage = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;
  const profitMargin = annualRevenue > 0 ? (netOperatingIncome / annualRevenue) * 100 : 0;

  // Generate risk assessment and recommendation
  const riskAssessment = generateRiskAssessment(inputs, cashOnCashReturn, harvestCycleYears);
  const recommendation = generateRecommendation(inputs, roiPercentage, paybackPeriod);
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs);

  return {
    totalInvestment,
    annualRevenue,
    annualExpenses,
    netOperatingIncome,
    cashFlow,
    capRate,
    cashOnCashReturn,
    irr,
    npv,
    timberValuePerAcre,
    totalTimberValue,
    annualGrowthRate,
    harvestRevenue,
    harvestFrequency,
    paybackPeriod,
    totalReturn,
    roiPercentage,
    profitMargin,
    riskAssessment,
    recommendation,
    sensitivityAnalysis
  };
}

/**
 * Calculate annual debt service
 */
function calculateAnnualDebtService(loanAmount: number, interestRate: number, loanTerm: number): number {
  if (loanAmount <= 0 || loanTerm <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment * 12;
}

/**
 * Calculate IRR and NPV
 */
function calculateIRRAndNPV(
  totalInvestment: number,
  financingAmount: number,
  analysisPeriod: number,
  discountRate: number,
  annualCashFlow: number
): { irr: number; npv: number } {
  // Simplified IRR calculation
  const initialInvestment = totalInvestment - financingAmount;
  const totalCashFlows = annualCashFlow * analysisPeriod;
  const irr = totalCashFlows > 0 ? ((totalCashFlows / initialInvestment) ** (1 / analysisPeriod) - 1) * 100 : 0;

  // Calculate NPV
  let npv = -initialInvestment;
  const discountFactor = discountRate / 100;

  for (let year = 1; year <= analysisPeriod; year++) {
    npv += annualCashFlow / Math.pow(1 + discountFactor, year);
  }

  return { irr, npv };
}

/**
 * Calculate timber growth rate based on type and age
 */
function calculateTimberGrowthRate(timberType: string, age: number): number {
  let baseGrowthRate = 0;

  switch (timberType) {
    case 'hardwood':
      baseGrowthRate = age < 20 ? 8 : age < 40 ? 4 : 2;
      break;
    case 'softwood':
      baseGrowthRate = age < 15 ? 12 : age < 30 ? 6 : 3;
      break;
    case 'mixed':
      baseGrowthRate = age < 20 ? 7 : age < 35 ? 4 : 2;
      break;
    default:
      baseGrowthRate = 5;
  }

  return baseGrowthRate;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(
  inputs: TimberlandInvestmentInputs,
  cashOnCashReturn: number,
  harvestCycleYears: number
): string {
  let riskLevel = 'Low';
  let concerns: string[] = [];

  if (harvestCycleYears > 10) {
    riskLevel = 'Medium';
    concerns.push('Long harvest cycles increase liquidity risk');
  }

  if (cashOnCashReturn < 3) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
    concerns.push('Low cash-on-cash return increases investment risk');
  }

  if (inputs.timberType === 'hardwood' && inputs.ageOfTimber > 30) {
    concerns.push('Older hardwood may have slower growth potential');
  }

  if (concerns.length === 0) {
    concerns.push('Generally favorable risk profile for long-term investment');
  }

  return `${riskLevel} Risk: ${concerns.join(', ')}`;
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  inputs: TimberlandInvestmentInputs,
  roiPercentage: number,
  paybackPeriod: number
): string {
  if (roiPercentage > 20 && paybackPeriod < 8) {
    return 'Strong investment opportunity - excellent returns with reasonable payback period. Consider for long-term portfolio diversification.';
  }

  if (roiPercentage > 15 && paybackPeriod < 12) {
    return 'Good investment opportunity - solid returns with acceptable payback period. Suitable for patient investors.';
  }

  if (roiPercentage > 10) {
    return 'Moderate investment opportunity - reasonable returns but longer payback period. Evaluate timber market conditions.';
  }

  if (roiPercentage > 5) {
    return 'Consider carefully - marginal returns may not justify the illiquidity. Review harvest cycles and market timing.';
  }

  return 'Poor investment opportunity - low returns and high risk due to long time horizons and market volatility.';
}

/**
 * Generate sensitivity analysis
 */
function generateSensitivityAnalysis(inputs: TimberlandInvestmentInputs): string {
  const { timberPricePerUnit, annualAppreciationRate, discountRate } = inputs;

  let analysis = 'Sensitivity Analysis:\n';

  // Test different timber prices
  const lowPrice = timberPricePerUnit * 0.8;
  const highPrice = timberPricePerUnit * 1.2;

  analysis += `• Timber price $${lowPrice.toFixed(0)}/unit: ${(calculateROIAtTimberPrice(inputs, lowPrice) * 0.8).toFixed(1)}% ROI\n`;
  analysis += `• Timber price $${highPrice.toFixed(0)}/unit: ${(calculateROIAtTimberPrice(inputs, highPrice) * 1.2).toFixed(1)}% ROI\n`;

  // Test different discount rates
  const lowDiscount = Math.max(0, discountRate - 2);
  const highDiscount = discountRate + 2;

  analysis += `• ${lowDiscount}% discount rate: ${calculateROIAtDiscountRate(inputs, lowDiscount).toFixed(1)}% ROI\n`;
  analysis += `• ${highDiscount}% discount rate: ${calculateROIAtDiscountRate(inputs, highDiscount).toFixed(1)}% ROI\n`;

  return analysis;
}

/**
 * Calculate ROI at different timber prices
 */
function calculateROIAtTimberPrice(inputs: TimberlandInvestmentInputs, timberPrice: number): number {
  const modifiedInputs = { ...inputs, timberPricePerUnit: timberPrice };
  const result = calculateTimberlandInvestment(modifiedInputs);
  return result.roiPercentage;
}

/**
 * Calculate ROI at different discount rates
 */
function calculateROIAtDiscountRate(inputs: TimberlandInvestmentInputs, discountRate: number): number {
  const modifiedInputs = { ...inputs, discountRate };
  const result = calculateTimberlandInvestment(modifiedInputs);
  return result.roiPercentage;
}

/**
 * Validate timberland investment inputs
 */
export function validateTimberlandInvestmentInputs(inputs: TimberlandInvestmentInputs): string[] {
  const errors: string[] = [];

  if (inputs.acreage <= 0) {
    errors.push('Acreage must be greater than 0');
  }

  if (inputs.ageOfTimber < 0 || inputs.ageOfTimber > 100) {
    errors.push('Age of timber must be between 0 and 100 years');
  }

  if (inputs.timberVolumePerAcre < 0) {
    errors.push('Timber volume per acre cannot be negative');
  }

  if (inputs.landCostPerAcre < 0) {
    errors.push('Land cost per acre cannot be negative');
  }

  if (inputs.timberValuePerAcre < 0) {
    errors.push('Timber value per acre cannot be negative');
  }

  if (inputs.totalAcquisitionCost < 0) {
    errors.push('Total acquisition cost cannot be negative');
  }

  if (inputs.financingAmount < 0) {
    errors.push('Financing amount cannot be negative');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.loanTerm < 0 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 0 and 50 years');
  }

  if (inputs.timberPricePerUnit <= 0) {
    errors.push('Timber price per unit must be greater than 0');
  }

  if (inputs.annualAppreciationRate < -10 || inputs.annualAppreciationRate > 20) {
    errors.push('Annual appreciation rate must be between -10% and 20%');
  }

  if (inputs.harvestCycleYears <= 0) {
    errors.push('Harvest cycle years must be greater than 0');
  }

  if (inputs.expectedHarvestVolume < 0) {
    errors.push('Expected harvest volume cannot be negative');
  }

  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 10) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  return errors;
}