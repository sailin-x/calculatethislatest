import { DynastyTrustGrowthEstimatorInputs } from './types';

export function validateDynastyTrustGrowthEstimatorInputs(inputs: DynastyTrustGrowthEstimatorInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Trust Information Validation
  if (!inputs.initialTrustValue || inputs.initialTrustValue <= 0) {
    errors.push('Initial trust value must be greater than 0');
  }

  if (!inputs.trustType || !['grantor', 'non_grantor', 'perpetual', 'rule_against_perpetuities'].includes(inputs.trustType)) {
    errors.push('Please select a valid trust type');
  }

  if (!inputs.trustDuration || inputs.trustDuration < 1 || inputs.trustDuration > 360) {
    errors.push('Trust duration must be between 1 and 360 years');
  }

  // Growth Parameters Validation
  if (!inputs.expectedAnnualReturn || inputs.expectedAnnualReturn < -0.1 || inputs.expectedAnnualReturn > 0.2) {
    errors.push('Expected annual return must be between -10% and 20%');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  if (inputs.annualContributions !== undefined && inputs.annualContributions < 0) {
    errors.push('Annual contributions cannot be negative');
  }

  if (inputs.contributionGrowthRate !== undefined && (inputs.contributionGrowthRate < -0.1 || inputs.contributionGrowthRate > 0.2)) {
    errors.push('Contribution growth rate must be between -10% and 20%');
  }

  // Tax Information Validation
  if (inputs.generationSkippingTaxRate !== undefined && (inputs.generationSkippingTaxRate < 0 || inputs.generationSkippingTaxRate > 0.5)) {
    errors.push('GST tax rate must be between 0% and 50%');
  }

  if (inputs.estateTaxRate !== undefined && (inputs.estateTaxRate < 0 || inputs.estateTaxRate > 0.5)) {
    errors.push('Estate tax rate must be between 0% and 50%');
  }

  if (inputs.incomeTaxRate !== undefined && (inputs.incomeTaxRate < 0 || inputs.incomeTaxRate > 0.5)) {
    errors.push('Income tax rate must be between 0% and 50%');
  }

  if (inputs.gstExemptionAmount !== undefined && inputs.gstExemptionAmount < 0) {
    errors.push('GST exemption amount cannot be negative');
  }

  // Beneficiary Information Validation
  if (!inputs.numberOfGenerations || inputs.numberOfGenerations < 1 || inputs.numberOfGenerations > 10) {
    errors.push('Number of generations must be between 1 and 10');
  }

  if (!inputs.generationInterval || inputs.generationInterval < 20 || inputs.generationInterval > 50) {
    errors.push('Generation interval must be between 20 and 50 years');
  }

  if (!inputs.beneficiaryLifeExpectancy || inputs.beneficiaryLifeExpectancy < 70 || inputs.beneficiaryLifeExpectancy > 120) {
    errors.push('Beneficiary life expectancy must be between 70 and 120');
  }

  // Trust Administration Validation
  if (inputs.annualAdministrativeFees !== undefined && inputs.annualAdministrativeFees < 0) {
    errors.push('Annual administrative fees cannot be negative');
  }

  if (inputs.investmentManagementFees !== undefined && inputs.investmentManagementFees < 0) {
    errors.push('Investment management fees cannot be negative');
  }

  if (inputs.trusteeFees !== undefined && inputs.trusteeFees < 0) {
    errors.push('Trustee fees cannot be negative');
  }

  // Distribution Strategy Validation
  if (!inputs.distributionStrategy || !['equal', 'needs_based', 'percentage', 'discretionary'].includes(inputs.distributionStrategy)) {
    errors.push('Please select a valid distribution strategy');
  }

  if (inputs.annualDistributionRate !== undefined && (inputs.annualDistributionRate < 0 || inputs.annualDistributionRate > 0.1)) {
    errors.push('Annual distribution rate must be between 0% and 10%');
  }

  if (inputs.minimumDistributionAmount !== undefined && inputs.minimumDistributionAmount < 0) {
    errors.push('Minimum distribution amount cannot be negative');
  }

  // Risk Factors Validation
  if (inputs.marketVolatility !== undefined && (inputs.marketVolatility < 0 || inputs.marketVolatility > 0.5)) {
    errors.push('Market volatility must be between 0% and 50%');
  }

  if (inputs.longevityRisk !== undefined && (inputs.longevityRisk < 0 || inputs.longevityRisk > 0.5)) {
    errors.push('Longevity risk must be between 0% and 50%');
  }

  if (inputs.regulatoryRisk !== undefined && (inputs.regulatoryRisk < 0 || inputs.regulatoryRisk > 0.5)) {
    errors.push('Regulatory risk must be between 0% and 50%');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisHorizon || inputs.analysisHorizon < 10 || inputs.analysisHorizon > 200) {
    errors.push('Analysis horizon must be between 10 and 200 years');
  }

  if (inputs.discountRate !== undefined && (inputs.discountRate < 0 || inputs.discountRate > 0.2)) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDynastyTrustGrowthEstimatorBusinessRules(inputs: DynastyTrustGrowthEstimatorInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.expectedAnnualReturn > 0.12) {
    warnings.push('High expected return may be unrealistic for long-term planning');
  }

  if (inputs.expectedAnnualReturn < 0.04) {
    warnings.push('Low expected return may not keep pace with inflation and taxes');
  }

  if (inputs.generationSkippingTaxRate > 0.4) {
    warnings.push('High GST rate may significantly impact multi-generational wealth transfer');
  }

  if (inputs.estateTaxRate > 0.4) {
    warnings.push('High estate tax rate may erode trust value over generations');
  }

  if (inputs.numberOfGenerations > 5) {
    warnings.push('Planning for many generations increases uncertainty and regulatory risk');
  }

  if (inputs.trustDuration > 100) {
    warnings.push('Very long trust duration may face rule against perpetuities challenges');
  }

  if (inputs.annualDistributionRate > 0.05) {
    warnings.push('High distribution rate may deplete trust principal over time');
  }

  if (inputs.annualAdministrativeFees + inputs.investmentManagementFees + inputs.trusteeFees > inputs.initialTrustValue * 0.005) {
    warnings.push('High fee structure may significantly impact long-term growth');
  }

  if (inputs.marketVolatility > 0.2) {
    warnings.push('High market volatility increases risk of significant value fluctuations');
  }

  if (inputs.gstExemptionAmount < inputs.initialTrustValue * 0.1) {
    warnings.push('GST exemption may be insufficient for trust value growth');
  }

  if (inputs.analysisHorizon < 50) {
    warnings.push('Short analysis horizon may not capture full multi-generational impact');
  }

  if (inputs.contributionGrowthRate > inputs.expectedAnnualReturn) {
    warnings.push('Contribution growth rate exceeds investment return - review assumptions');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}