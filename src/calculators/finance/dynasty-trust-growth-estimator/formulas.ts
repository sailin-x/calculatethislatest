import {
  DynastyTrustGrowthEstimatorInputs,
  DynastyTrustGrowthEstimatorOutputs,
  DynastyTrustGrowthMetrics,
  DynastyTrustGrowthAnalysis
} from './types';

// Helper function to calculate compound growth
function calculateCompoundGrowth(
  principal: number,
  annualReturn: number,
  years: number,
  annualContributions: number = 0,
  contributionGrowthRate: number = 0
): number {
  let futureValue = principal * Math.pow(1 + annualReturn, years);

  // Add contributions with growth
  if (annualContributions > 0) {
    for (let i = 1; i <= years; i++) {
      const contribution = annualContributions * Math.pow(1 + contributionGrowthRate, i - 1);
      futureValue += contribution * Math.pow(1 + annualReturn, years - i);
    }
  }

  return futureValue;
}

// Helper function to calculate generation-skipping transfer tax
function calculateGST(
  transferAmount: number,
  gstExemptionAmount: number,
  gstTaxRate: number
): number {
  const taxableAmount = Math.max(0, transferAmount - gstExemptionAmount);
  return taxableAmount * gstTaxRate;
}

// Helper function to calculate estate tax
function calculateEstateTax(
  estateValue: number,
  estateTaxRate: number,
  exemptionAmount: number = 0
): number {
  const taxableAmount = Math.max(0, estateValue - exemptionAmount);
  return taxableAmount * estateTaxRate;
}

// Helper function to calculate distributions
function calculateDistributions(
  trustValue: number,
  distributionStrategy: string,
  annualDistributionRate: number,
  minimumDistributionAmount: number,
  years: number
): number {
  let totalDistributions = 0;
  let currentValue = trustValue;

  for (let i = 0; i < years; i++) {
    let distribution = 0;

    switch (distributionStrategy) {
      case 'equal':
        distribution = currentValue * annualDistributionRate;
        break;
      case 'percentage':
        distribution = currentValue * annualDistributionRate;
        break;
      case 'needs_based':
        distribution = Math.max(minimumDistributionAmount, currentValue * annualDistributionRate);
        break;
      case 'discretionary':
        distribution = minimumDistributionAmount;
        break;
      default:
        distribution = 0;
    }

    distribution = Math.min(distribution, currentValue); // Can't distribute more than available
    totalDistributions += distribution;
    currentValue -= distribution;
  }

  return totalDistributions;
}

// Helper function to calculate multi-generational value
function calculateGenerationalValue(
  initialValue: number,
  generations: number,
  generationInterval: number,
  annualReturn: number,
  gstExemptionAmount: number,
  gstTaxRate: number,
  estateTaxRate: number
): number[] {
  const values: number[] = [initialValue];
  let currentValue = initialValue;

  for (let gen = 1; gen < generations; gen++) {
    // Grow for generation interval
    currentValue = currentValue * Math.pow(1 + annualReturn, generationInterval);

    // Apply GST
    const gstTax = calculateGST(currentValue, gstExemptionAmount, gstTaxRate);
    currentValue -= gstTax;

    // Apply estate tax if applicable
    const estateTax = calculateEstateTax(currentValue, estateTaxRate);
    currentValue -= estateTax;

    values.push(currentValue);
  }

  return values;
}

// Helper function to calculate fees
function calculateTotalFees(
  initialValue: number,
  years: number,
  annualAdministrativeFees: number,
  investmentManagementFees: number,
  trusteeFees: number
): number {
  const totalAnnualFees = annualAdministrativeFees + investmentManagementFees + trusteeFees;
  return totalAnnualFees * years;
}

// Helper function to assess trust efficiency
function assessTrustEfficiency(
  finalValue: number,
  initialValue: number,
  totalTaxes: number,
  totalFees: number
): number {
  const grossGrowth = finalValue - initialValue;
  const netGrowth = grossGrowth - totalTaxes - totalFees;
  return netGrowth / grossGrowth;
}

// Main calculation function
export function calculateDynastyTrustGrowthEstimator(inputs: DynastyTrustGrowthEstimatorInputs): DynastyTrustGrowthEstimatorOutputs {
  const {
    initialTrustValue,
    expectedAnnualReturn,
    inflationRate,
    annualContributions,
    contributionGrowthRate,
    generationSkippingTaxRate,
    estateTaxRate,
    gstExemptionAmount,
    numberOfGenerations,
    generationInterval,
    annualAdministrativeFees,
    investmentManagementFees,
    trusteeFees,
    distributionStrategy,
    annualDistributionRate,
    minimumDistributionAmount,
    analysisHorizon
  } = inputs;

  // Calculate growth projection
  const projectedValue = calculateCompoundGrowth(
    initialTrustValue,
    expectedAnnualReturn,
    analysisHorizon,
    annualContributions,
    contributionGrowthRate
  );

  // Calculate total growth
  const totalContributions = annualContributions > 0
    ? annualContributions * ((Math.pow(1 + contributionGrowthRate, analysisHorizon) - 1) / contributionGrowthRate)
    : 0;
  const totalGrowth = projectedValue - initialTrustValue - totalContributions;

  // Calculate CAGR
  const compoundAnnualGrowthRate = Math.pow(projectedValue / initialTrustValue, 1 / analysisHorizon) - 1;

  // Calculate real return
  const realReturn = compoundAnnualGrowthRate - inflationRate;

  // Calculate generational values
  const valuePerGeneration = calculateGenerationalValue(
    initialTrustValue,
    numberOfGenerations,
    generationInterval,
    expectedAnnualReturn,
    gstExemptionAmount,
    generationSkippingTaxRate,
    estateTaxRate
  );

  // Calculate GST paid
  let totalGSTPaid = 0;
  for (let i = 1; i < valuePerGeneration.length; i++) {
    const transferAmount = valuePerGeneration[i - 1];
    totalGSTPaid += calculateGST(transferAmount, gstExemptionAmount, generationSkippingTaxRate);
  }

  // Calculate estate tax (simplified)
  const totalEstateTaxPaid = valuePerGeneration.reduce((sum, value) =>
    sum + calculateEstateTax(value, estateTaxRate), 0
  );

  // Calculate income tax (simplified - assuming trust income is taxed)
  const estimatedAnnualIncome = projectedValue * expectedAnnualReturn;
  const totalIncomeTaxPaid = estimatedAnnualIncome * inputs.incomeTaxRate * analysisHorizon;

  // Calculate after-tax value
  const afterTaxValue = projectedValue - totalGSTPaid - totalEstateTaxPaid - totalIncomeTaxPaid;

  // Calculate distributions
  const totalDistributions = calculateDistributions(
    projectedValue,
    distributionStrategy,
    annualDistributionRate,
    minimumDistributionAmount,
    analysisHorizon
  );

  // Calculate remaining trust value
  const remainingTrustValue = projectedValue - totalDistributions;

  // Calculate distribution efficiency
  const distributionEfficiency = totalDistributions / projectedValue;

  // Calculate GST utilization
  const gstUtilization = totalGSTPaid / (gstExemptionAmount * numberOfGenerations);

  // Calculate exemption efficiency
  const exemptionEfficiency = gstExemptionAmount > 0 ? totalGSTPaid / gstExemptionAmount : 0;

  // Calculate fees
  const totalFeesPaid = calculateTotalFees(
    initialTrustValue,
    analysisHorizon,
    annualAdministrativeFees,
    investmentManagementFees,
    trusteeFees
  );

  // Calculate fee impact
  const feeImpact = totalFeesPaid / projectedValue;

  // Calculate net value
  const netValue = afterTaxValue - totalFeesPaid;

  // Calculate trust efficiency
  const trustEfficiency = assessTrustEfficiency(
    projectedValue,
    initialTrustValue,
    totalGSTPaid + totalEstateTaxPaid + totalIncomeTaxPaid,
    totalFeesPaid
  );

  // Risk analysis (simplified)
  const volatilityAdjustedValue = projectedValue * (1 - inputs.marketVolatility);
  const worstCaseScenario = projectedValue * (1 - inputs.marketVolatility * 2);
  const bestCaseScenario = projectedValue * (1 + inputs.marketVolatility);

  // Create metrics object
  const metrics: DynastyTrustGrowthMetrics = {
    projectedValue,
    totalGrowth,
    compoundAnnualGrowthRate,
    realReturn,
    totalGSTPaid,
    totalEstateTaxPaid,
    totalIncomeTaxPaid,
    afterTaxValue,
    totalDistributions,
    remainingTrustValue,
    distributionEfficiency,
    valuePerGeneration,
    gstUtilization,
    exemptionEfficiency,
    totalFeesPaid,
    feeImpact,
    netValue,
    volatilityAdjustedValue,
    worstCaseScenario,
    bestCaseScenario
  };

  // Assess overall trust rating
  const trustRating = trustEfficiency > 0.8 && gstUtilization < 0.5
    ? 'Excellent'
    : trustEfficiency > 0.7 && gstUtilization < 0.7
    ? 'Good'
    : trustEfficiency > 0.6
    ? 'Fair'
    : 'Poor';

  // Create analysis object
  const analysis: DynastyTrustGrowthAnalysis = {
    trustRating: trustRating as any,
    recommendation: trustRating === 'Excellent' || trustRating === 'Good'
      ? 'Your dynasty trust structure provides excellent wealth preservation and transfer efficiency'
      : 'Consider optimizing your trust structure to minimize taxes and maximize generational wealth transfer',
    keyInsights: [
      `Projected trust value: $${Math.round(projectedValue).toLocaleString()}`,
      `Multi-generational efficiency: ${Math.round(trustEfficiency * 100)}%`,
      `GST utilization: ${Math.round(gstUtilization * 100)}%`,
      `After-tax value: $${Math.round(afterTaxValue).toLocaleString()}`
    ],

    growthProjection: `Trust will grow from $${Math.round(initialTrustValue).toLocaleString()} to $${Math.round(projectedValue).toLocaleString()} over ${analysisHorizon} years`,
    returnAnalysis: `Compound annual growth rate: ${Math.round(compoundAnnualGrowthRate * 100)}% with real return of ${Math.round(realReturn * 100)}%`,
    riskAdjustedReturns: `Volatility-adjusted value: $${Math.round(volatilityAdjustedValue).toLocaleString()}`,

    gstStrategy: `GST exemption utilization: ${Math.round(exemptionEfficiency * 100)}% with total GST paid: $${Math.round(totalGSTPaid).toLocaleString()}`,
    estatePlanning: `Estate tax impact: $${Math.round(totalEstateTaxPaid).toLocaleString()} over ${numberOfGenerations} generations`,
    taxEfficiency: `Overall tax efficiency: ${Math.round((1 - (totalGSTPaid + totalEstateTaxPaid) / projectedValue) * 100)}%`,

    distributionPlan: `Total distributions: $${Math.round(totalDistributions).toLocaleString()} with ${Math.round(distributionEfficiency * 100)}% distribution rate`,
    beneficiaryImpact: `Remaining trust value: $${Math.round(remainingTrustValue).toLocaleString()} for future generations`,
    wealthPreservation: `Net generational wealth: $${Math.round(netValue).toLocaleString()}`,

    costAnalysis: `Total fees: $${Math.round(totalFeesPaid).toLocaleString()} (${Math.round(feeImpact * 100)}% of portfolio value)`,
    feeOptimization: annualAdministrativeFees + investmentManagementFees + trusteeFees > 0.01 * projectedValue
      ? 'Consider fee optimization strategies'
      : 'Fee structure is reasonable',
    valueForMoney: `Trust efficiency: ${Math.round(trustEfficiency * 100)}% after fees and taxes`,

    complianceStatus: 'Trust structure appears compliant with current regulations',
    regulatoryRisk: 'Monitor changes in GST and estate tax laws',
    legalConsiderations: 'Consult with estate planning attorney for specific jurisdiction requirements',

    generationalWealth: `Value per generation: ${valuePerGeneration.map(v => Math.round(v).toLocaleString()).join(' → ')}`,
    legacyPreservation: `Multi-generational wealth preservation: ${Math.round((valuePerGeneration[valuePerGeneration.length - 1] / initialTrustValue - 1) * 100)}% growth`,
    familyGovernance: 'Consider establishing family governance structures for long-term wealth management',

    immediateActions: [
      'Review current trust structure and documents',
      'Verify GST exemption utilization',
      'Assess fee structure and potential optimizations',
      'Update beneficiary designations and succession plans'
    ],

    longTermStrategy: `Maintain trust for ${analysisHorizon} years with ${Math.round(compoundAnnualGrowthRate * 100)}% growth target`,
    monitoringPlan: 'Annual review of trust performance, tax laws, and family circumstances',

    recommendedResources: [
      'Estate Planning Attorney consultation',
      'Trust administration services',
      'GST and estate tax planning guides',
      'Family wealth management advisors'
    ],

    nextSteps: [
      'Schedule consultation with estate planning professional',
      'Review and update trust documents',
      'Implement recommended fee optimization strategies',
      'Establish family governance and communication plans'
    ]
  };

  return {
    metrics,
    analysis,
    finalTrustValue: projectedValue,
    totalTaxesPaid: totalGSTPaid + totalEstateTaxPaid + totalIncomeTaxPaid,
    netGenerationalWealth: netValue,
    trustEfficiency
  };
}

// Validation function
export function validateDynastyTrustGrowthEstimatorInputs(inputs: DynastyTrustGrowthEstimatorInputs): string[] {
  const errors: string[] = [];

  if (!inputs.initialTrustValue || inputs.initialTrustValue <= 0) {
    errors.push('Initial trust value must be greater than 0');
  }

  if (!inputs.expectedAnnualReturn || inputs.expectedAnnualReturn < -0.1 || inputs.expectedAnnualReturn > 0.2) {
    errors.push('Expected annual return must be between -10% and 20%');
  }

  if (!inputs.numberOfGenerations || inputs.numberOfGenerations < 1 || inputs.numberOfGenerations > 10) {
    errors.push('Number of generations must be between 1 and 10');
  }

  if (!inputs.generationInterval || inputs.generationInterval < 20 || inputs.generationInterval > 50) {
    errors.push('Generation interval must be between 20 and 50 years');
  }

  if (inputs.generationSkippingTaxRate !== undefined && (inputs.generationSkippingTaxRate < 0 || inputs.generationSkippingTaxRate > 0.5)) {
    errors.push('GST tax rate must be between 0% and 50%');
  }

  if (inputs.estateTaxRate !== undefined && (inputs.estateTaxRate < 0 || inputs.estateTaxRate > 0.5)) {
    errors.push('Estate tax rate must be between 0% and 50%');
  }

  if (!inputs.analysisHorizon || inputs.analysisHorizon < 10 || inputs.analysisHorizon > 200) {
    errors.push('Analysis horizon must be between 10 and 200 years');
  }

  if (inputs.annualDistributionRate !== undefined && (inputs.annualDistributionRate < 0 || inputs.annualDistributionRate > 0.1)) {
    errors.push('Annual distribution rate must be between 0% and 10%');
  }

  return errors;
}