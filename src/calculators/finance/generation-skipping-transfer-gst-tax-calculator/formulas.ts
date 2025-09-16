import { GenerationSkippingTransferInputs, GenerationSkippingTransferResults, GenerationSkippingTransferMetrics } from './types';

export function calculateGenerationSkippingTransferTax(inputs: GenerationSkippingTransferInputs): GenerationSkippingTransferResults {
  const {
    transferAmount,
    gstTaxRate,
    annualExclusionAmount,
    gstExemptionAmount,
    gstExemptionUsed,
    numberOfSkipBeneficiaries,
    includeStateGstTax,
    stateGstTaxRate,
    inflationAdjustment,
    planningHorizon,
    expectedGrowthRate,
    discountRate
  } = inputs;

  // Calculate GST taxable amount after exemptions
  const annualExclusionTotal = annualExclusionAmount * numberOfSkipBeneficiaries;
  const gstExemptionRemaining = Math.max(0, gstExemptionAmount - gstExemptionUsed);
  const gstTaxableAmount = Math.max(0, transferAmount - annualExclusionTotal - gstExemptionRemaining);

  // Calculate GST tax liability
  const federalGstTaxLiability = gstTaxableAmount * (gstTaxRate / 100);
  const stateGstTaxLiability = includeStateGstTax ? gstTaxableAmount * (stateGstTaxRate / 100) : 0;
  const totalGstTaxLiability = federalGstTaxLiability + stateGstTaxLiability;

  // Calculate tax savings and efficiency
  const gstTaxSavings = Math.min(transferAmount, gstExemptionRemaining + annualExclusionTotal) * (gstTaxRate / 100);
  const effectiveGstTaxRate = transferAmount > 0 ? (totalGstTaxLiability / transferAmount) * 100 : 0;

  // Calculate after-tax transfer value
  const afterTaxTransferValue = transferAmount - totalGstTaxLiability;

  // Calculate per beneficiary amounts
  const gstTaxPerBeneficiary = numberOfSkipBeneficiaries > 0 ? totalGstTaxLiability / numberOfSkipBeneficiaries : 0;

  // Calculate present value of tax liability
  const presentValueOfTaxLiability = totalGstTaxLiability / Math.pow(1 + discountRate / 100, planningHorizon);

  // Calculate break-even analysis
  const breakEvenAnalysis = gstExemptionRemaining / (gstTaxRate / 100);

  // Calculate optimal transfer amount
  const optimalTransferAmount = gstExemptionRemaining + annualExclusionTotal;

  // Calculate tax efficiency score (0-100)
  const taxEfficiencyScore = Math.max(0, Math.min(100, 100 - effectiveGstTaxRate));

  // Generate planning recommendations
  const planningRecommendations = generatePlanningRecommendations(inputs, gstTaxableAmount, totalGstTaxLiability);

  return {
    gstTaxableAmount,
    gstTaxLiability: totalGstTaxLiability,
    gstExemptionRemaining,
    gstTaxSavings,
    effectiveGstTaxRate,
    totalTaxLiability: totalGstTaxLiability,
    afterTaxTransferValue,
    gstTaxPerBeneficiary,
    presentValueOfTaxLiability,
    breakEvenAnalysis,
    optimalTransferAmount,
    taxEfficiencyScore,
    planningRecommendations
  };
}

export function calculateGenerationSkippingTransferMetrics(
  inputs: GenerationSkippingTransferInputs,
  results: GenerationSkippingTransferResults
): GenerationSkippingTransferMetrics {
  const { transferAmount, gstExemptionAmount, gstExemptionUsed, planningHorizon, expectedGrowthRate, discountRate } = inputs;
  const { gstTaxLiability, gstTaxableAmount } = results;

  // Calculate GST tax burden
  const gstTaxBurden = transferAmount > 0 ? (gstTaxLiability / transferAmount) * 100 : 0;

  // Calculate exemption utilization
  const exemptionUtilization = gstExemptionAmount > 0 ? (gstExemptionUsed / gstExemptionAmount) * 100 : 0;

  // Calculate intergenerational wealth transfer
  const futureValue = transferAmount * Math.pow(1 + expectedGrowthRate / 100, planningHorizon);
  const intergenerationalWealthTransfer = futureValue - gstTaxLiability;

  // Calculate tax optimization potential
  const maxPossibleSavings = transferAmount * 0.40; // Assuming 40% GST tax rate
  const taxOptimizationPotential = maxPossibleSavings > 0 ? (results.gstTaxSavings / maxPossibleSavings) * 100 : 0;

  // Calculate risk-adjusted return
  const riskAdjustedReturn = intergenerationalWealthTransfer / Math.pow(1 + discountRate / 100, planningHorizon);

  return {
    gstTaxBurden,
    exemptionUtilization,
    intergenerationalWealthTransfer,
    taxOptimizationPotential,
    riskAdjustedReturn
  };
}

function generatePlanningRecommendations(
  inputs: GenerationSkippingTransferInputs,
  gstTaxableAmount: number,
  totalGstTaxLiability: number
): string[] {
  const recommendations: string[] = [];

  const gstExemptionRemaining = Math.max(0, inputs.gstExemptionAmount - inputs.gstExemptionUsed);

  if (gstExemptionRemaining > 0) {
    recommendations.push(`Utilize remaining GST exemption of $${gstExemptionRemaining.toLocaleString()} to reduce taxable amount`);
  }

  if (gstTaxableAmount > 0) {
    recommendations.push(`Consider annual exclusion gifts of $${inputs.annualExclusionAmount.toLocaleString()} per beneficiary to reduce taxable transfers`);
  }

  if (inputs.transferType === 'trust') {
    recommendations.push('GST trust structures can provide additional tax planning flexibility');
  }

  if (inputs.includeStateGstTax && inputs.stateGstTaxRate > 0) {
    recommendations.push(`Consider state tax implications with ${inputs.stateGstTaxRate}% state GST tax rate`);
  }

  if (inputs.planningHorizon > 10) {
    recommendations.push('Long-term planning horizon allows for strategic exemption utilization');
  }

  if (totalGstTaxLiability > inputs.transferAmount * 0.3) {
    recommendations.push('High tax burden suggests need for comprehensive tax planning strategies');
  }

  return recommendations;
}

export function validateGenerationSkippingTransferInputs(inputs: GenerationSkippingTransferInputs): string[] {
  const errors: string[] = [];

  if (inputs.transferAmount <= 0) {
    errors.push('Transfer amount must be greater than $0');
  }

  if (inputs.gstTaxRate < 0 || inputs.gstTaxRate > 100) {
    errors.push('GST tax rate must be between 0% and 100%');
  }

  if (inputs.annualExclusionAmount < 0) {
    errors.push('Annual exclusion amount cannot be negative');
  }

  if (inputs.gstExemptionAmount < 0) {
    errors.push('GST exemption amount cannot be negative');
  }

  if (inputs.gstExemptionUsed < 0) {
    errors.push('GST exemption used cannot be negative');
  }

  if (inputs.gstExemptionUsed > inputs.gstExemptionAmount) {
    errors.push('GST exemption used cannot exceed total exemption amount');
  }

  if (inputs.numberOfSkipBeneficiaries < 1) {
    errors.push('Number of skip beneficiaries must be at least 1');
  }

  if (inputs.includeStateGstTax && (inputs.stateGstTaxRate < 0 || inputs.stateGstTaxRate > 50)) {
    errors.push('State GST tax rate must be between 0% and 50%');
  }

  if (inputs.planningHorizon < 0 || inputs.planningHorizon > 100) {
    errors.push('Planning horizon must be between 0 and 100 years');
  }

  if (inputs.expectedGrowthRate < -10 || inputs.expectedGrowthRate > 20) {
    errors.push('Expected growth rate must be between -10% and 20%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 15) {
    errors.push('Discount rate must be between 0% and 15%');
  }

  return errors;
}