import { TenantImprovementAllowanceInputs, TenantImprovementAllowanceResults } from './types';

/**
 * Calculate tenant improvement allowance costs and financial impact
 */
export function calculateTenantImprovementAllowance(inputs: TenantImprovementAllowanceInputs): TenantImprovementAllowanceResults {
  const {
    leaseTermYears,
    annualRent,
    tenantImprovementAllowance,
    landlordContributionPercentage,
    totalConstructionCost,
    constructionPeriodMonths,
    financingRate,
    holdingPeriodYears,
    discountRate,
    taxRate,
    depreciationYears,
    expectedAppreciation,
    includeFinancing,
    includeDepreciation,
    includeTaxBenefits
  } = inputs;

  // Calculate cost distribution
  const landlordContribution = tenantImprovementAllowance * (landlordContributionPercentage / 100);
  const tenantContribution = tenantImprovementAllowance - landlordContribution;

  // Calculate financing costs if applicable
  let monthlyFinancingCost = 0;
  let annualFinancingCost = 0;

  if (includeFinancing && financingRate > 0) {
    const financedAmount = landlordContribution;
    const monthlyRate = financingRate / 100 / 12;
    const numPayments = constructionPeriodMonths;

    if (monthlyRate > 0) {
      monthlyFinancingCost = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyFinancingCost = financedAmount / numPayments;
    }

    annualFinancingCost = monthlyFinancingCost * 12;
  }

  // Calculate depreciation
  let annualDepreciation = 0;
  if (includeDepreciation && depreciationYears > 0) {
    annualDepreciation = landlordContribution / depreciationYears;
  }

  // Calculate tax savings
  let annualTaxSavings = 0;
  if (includeTaxBenefits && taxRate > 0) {
    annualTaxSavings = (annualDepreciation + annualFinancingCost) * (taxRate / 100);
  }

  // Calculate net annual cost to landlord
  const netAnnualCost = annualFinancingCost + landlordContribution - annualTaxSavings;

  // Calculate NPV of costs
  let npvOfCosts = landlordContribution;
  const discountFactor = discountRate / 100;

  for (let year = 1; year <= holdingPeriodYears; year++) {
    const annualCost = netAnnualCost;
    npvOfCosts += annualCost / Math.pow(1 + discountFactor, year);
  }

  // Calculate IRR (simplified)
  const totalCashFlows = annualRent * leaseTermYears;
  const totalCosts = landlordContribution + (netAnnualCost * leaseTermYears);
  const irrOfInvestment = totalCashFlows > 0 ? ((totalCashFlows / totalCosts) - 1) * 100 : 0;

  // Calculate payback period
  const paybackPeriodYears = netAnnualCost > 0 ? landlordContribution / netAnnualCost : 0;

  // Calculate ROI
  const totalRentOverLease = annualRent * leaseTermYears;
  const roiPercentage = landlordContribution > 0 ? ((totalRentOverLease - totalCosts) / landlordContribution) * 100 : 0;

  // Calculate lease impact
  const effectiveRentIncrease = tenantImprovementAllowance > 0 ? (tenantContribution / leaseTermYears) / annualRent * 100 : 0;

  // Assume square footage for cost per square foot calculation
  const assumedSquareFootage = 1000; // This would typically be an input
  const costPerSquareFoot = assumedSquareFootage > 0 ? landlordContribution / assumedSquareFootage : 0;

  // Calculate allowance utilization
  const allowanceUtilizationRate = tenantImprovementAllowance > 0 ? (landlordContribution / tenantImprovementAllowance) * 100 : 0;

  // Calculate break-even occupancy (simplified)
  const breakEvenOccupancy = annualRent > 0 ? (netAnnualCost / annualRent) * 100 : 0;

  // Generate sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs);

  // Generate recommendation
  const recommendation = generateRecommendation(inputs, roiPercentage, paybackPeriodYears);

  return {
    landlordTotalCost: landlordContribution,
    tenantTotalCost: tenantContribution,
    totalProjectCost: totalConstructionCost,
    monthlyFinancingCost,
    annualFinancingCost,
    annualDepreciation,
    annualTaxSavings,
    netAnnualCost,
    npvOfCosts,
    irrOfInvestment,
    paybackPeriodYears,
    roiPercentage,
    effectiveRentIncrease,
    costPerSquareFoot,
    allowanceUtilizationRate,
    breakEvenOccupancy,
    sensitivityAnalysis,
    recommendation
  };
}

/**
 * Generate sensitivity analysis
 */
function generateSensitivityAnalysis(inputs: TenantImprovementAllowanceInputs): string {
  const { landlordContributionPercentage, financingRate, discountRate } = inputs;

  let analysis = 'Sensitivity Analysis:\n';

  // Test different contribution percentages
  const lowContribution = Math.max(0, landlordContributionPercentage - 10);
  const highContribution = Math.min(100, landlordContributionPercentage + 10);

  analysis += `• ${lowContribution}% landlord contribution: ${calculateROIAtContribution(inputs, lowContribution).toFixed(1)}% ROI\n`;
  analysis += `• ${highContribution}% landlord contribution: ${calculateROIAtContribution(inputs, highContribution).toFixed(1)}% ROI\n`;

  // Test different financing rates
  const lowRate = Math.max(0, financingRate - 1);
  const highRate = financingRate + 1;

  analysis += `• ${lowRate}% financing rate: ${calculateROIAtFinancingRate(inputs, lowRate).toFixed(1)}% ROI\n`;
  analysis += `• ${highRate}% financing rate: ${calculateROIAtFinancingRate(inputs, highRate).toFixed(1)}% ROI\n`;

  return analysis;
}

/**
 * Calculate ROI at different contribution percentages
 */
function calculateROIAtContribution(inputs: TenantImprovementAllowanceInputs, contributionPct: number): number {
  const modifiedInputs = { ...inputs, landlordContributionPercentage: contributionPct };
  const result = calculateTenantImprovementAllowance(modifiedInputs);
  return result.roiPercentage;
}

/**
 * Calculate ROI at different financing rates
 */
function calculateROIAtFinancingRate(inputs: TenantImprovementAllowanceInputs, financingRate: number): number {
  const modifiedInputs = { ...inputs, financingRate };
  const result = calculateTenantImprovementAllowance(modifiedInputs);
  return result.roiPercentage;
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  inputs: TenantImprovementAllowanceInputs,
  roiPercentage: number,
  paybackPeriodYears: number
): string {
  if (roiPercentage > 15 && paybackPeriodYears < 5) {
    return 'Strong investment opportunity - high ROI with reasonable payback period. Consider increasing allowance to attract premium tenants.';
  }

  if (roiPercentage > 10 && paybackPeriodYears < 7) {
    return 'Good investment opportunity - solid returns with acceptable payback period. Monitor market conditions for optimal timing.';
  }

  if (roiPercentage > 5) {
    return 'Moderate investment opportunity - acceptable returns but longer payback period. Consider negotiating better lease terms.';
  }

  if (roiPercentage > 0) {
    return 'Marginal investment - low returns may not justify the capital outlay. Review construction costs and lease terms.';
  }

  return 'Poor investment opportunity - negative ROI indicates potential losses. Reconsider the improvement scope or negotiate higher rent.';
}

/**
 * Validate tenant improvement allowance inputs
 */
export function validateTenantImprovementAllowanceInputs(inputs: TenantImprovementAllowanceInputs): string[] {
  const errors: string[] = [];

  if (inputs.leaseTermYears <= 0) {
    errors.push('Lease term must be greater than 0 years');
  }

  if (inputs.annualRent < 0) {
    errors.push('Annual rent cannot be negative');
  }

  if (inputs.tenantImprovementAllowance < 0) {
    errors.push('Tenant improvement allowance cannot be negative');
  }

  if (inputs.landlordContributionPercentage < 0 || inputs.landlordContributionPercentage > 100) {
    errors.push('Landlord contribution percentage must be between 0% and 100%');
  }

  if (inputs.totalConstructionCost < 0) {
    errors.push('Total construction cost cannot be negative');
  }

  if (inputs.constructionPeriodMonths < 0) {
    errors.push('Construction period cannot be negative');
  }

  if (inputs.financingRate < 0 || inputs.financingRate > 30) {
    errors.push('Financing rate must be between 0% and 30%');
  }

  if (inputs.holdingPeriodYears < 0) {
    errors.push('Holding period cannot be negative');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.depreciationYears <= 0) {
    errors.push('Depreciation years must be greater than 0');
  }

  if (inputs.expectedAppreciation < -10 || inputs.expectedAppreciation > 20) {
    errors.push('Expected appreciation must be between -10% and 20%');
  }

  return errors;
}