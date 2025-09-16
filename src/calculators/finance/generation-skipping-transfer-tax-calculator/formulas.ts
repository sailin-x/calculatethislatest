import { GSTTaxInputs, GSTTaxResults, GSTTaxMetrics } from './types';

export function calculateGSTTax(inputs: GSTTaxInputs): GSTTaxResults {
  const {
    transferAmount,
    gstTaxRate,
    gstExemptionUsed,
    gstExemptionLimit,
    numberOfSkipGenerations,
    isDirectSkip,
    isTrustDistribution,
    includeStateTax,
    stateTaxRate,
    inflationRate,
    planningHorizon
  } = inputs;

  // Calculate remaining GST exemption
  const remainingGSTExemption = Math.max(0, gstExemptionLimit - gstExemptionUsed);

  // Calculate taxable GST amount
  const taxableGSTAmount = Math.max(0, transferAmount - remainingGSTExemption);

  // Calculate GST tax liability
  const gstTaxLiability = taxableGSTAmount * (gstTaxRate / 100);

  // Calculate effective GST tax rate
  const effectiveGSTTaxRate = transferAmount > 0 ? (gstTaxLiability / transferAmount) * 100 : 0;

  // Calculate state tax liability if applicable
  const stateTaxLiability = includeStateTax ? gstTaxLiability * (stateTaxRate / 100) : 0;

  // Calculate total tax liability
  const totalTaxLiability = gstTaxLiability + stateTaxLiability;

  // Calculate total GST tax savings
  const totalGSTTaxSavings = (transferAmount - taxableGSTAmount) * (gstTaxRate / 100);

  // Calculate projected future value
  const projectedFutureValue = transferAmount * Math.pow(1 + inflationRate / 100, planningHorizon);

  // Determine optimal transfer strategy
  let optimalTransferStrategy = 'Direct generation-skipping transfer';
  if (isTrustDistribution) {
    optimalTransferStrategy = 'Trust-based generation-skipping transfer';
  } else if (numberOfSkipGenerations > 1) {
    optimalTransferStrategy = 'Multi-generation trust structure';
  } else if (transferAmount > remainingGSTExemption) {
    optimalTransferStrategy = 'Split transfers to maximize exemption usage';
  }

  return {
    taxableGSTAmount,
    gstTaxLiability,
    effectiveGSTTaxRate,
    remainingGSTExemption,
    totalGSTTaxSavings,
    projectedFutureValue,
    optimalTransferStrategy,
    stateTaxLiability,
    totalTaxLiability
  };
}

export function calculateGSTTaxMetrics(
  inputs: GSTTaxInputs,
  results: GSTTaxResults
): GSTTaxMetrics {
  const { gstExemptionLimit, gstExemptionUsed, transferAmount, numberOfSkipGenerations } = inputs;
  const { gstTaxLiability, totalGSTTaxSavings } = results;

  // Calculate exemption utilization rate
  const exemptionUtilizationRate = gstExemptionLimit > 0
    ? (gstExemptionUsed / gstExemptionLimit) * 100
    : 0;

  // Calculate tax efficiency score (0-100, higher is better)
  const taxEfficiencyScore = Math.max(0, Math.min(100,
    100 - (gstTaxLiability / Math.max(transferAmount, 1)) * 100
  ));

  // Calculate generation skip benefit
  const generationSkipBenefit = totalGSTTaxSavings * numberOfSkipGenerations;

  // Assess risk level
  let riskAssessment: 'low' | 'medium' | 'high' = 'low';
  if (exemptionUtilizationRate > 80) {
    riskAssessment = 'high';
  } else if (exemptionUtilizationRate > 50) {
    riskAssessment = 'medium';
  }

  return {
    exemptionUtilizationRate,
    taxEfficiencyScore,
    generationSkipBenefit,
    riskAssessment
  };
}

export function validateGSTTaxInputs(inputs: GSTTaxInputs): string[] {
  const errors: string[] = [];

  if (inputs.transferAmount <= 0) {
    errors.push('Transfer amount must be greater than $0');
  }

  if (inputs.gstTaxRate < 0 || inputs.gstTaxRate > 100) {
    errors.push('GST tax rate must be between 0% and 100%');
  }

  if (inputs.gstExemptionUsed < 0) {
    errors.push('GST exemption used cannot be negative');
  }

  if (inputs.gstExemptionLimit <= 0) {
    errors.push('GST exemption limit must be greater than $0');
  }

  if (inputs.numberOfSkipGenerations < 1) {
    errors.push('Number of skip generations must be at least 1');
  }

  if (inputs.planningHorizon < 0) {
    errors.push('Planning horizon cannot be negative');
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  return errors;
}