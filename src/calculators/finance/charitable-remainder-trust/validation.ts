import { CharitableRemainderTrustInputs } from './types';

export function validateCharitableRemainderTrustInputs(inputs: CharitableRemainderTrustInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information Validation
  if (!inputs.donorAge || inputs.donorAge < 18 || inputs.donorAge > 100) {
    errors.push('Donor age must be between 18 and 100');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.donorAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than donor age and less than 120');
  }

  // Trust Information Validation
  if (!inputs.trustValue || inputs.trustValue <= 0) {
    errors.push('Trust value must be greater than 0');
  }

  if (inputs.payoutRate !== undefined && (inputs.payoutRate <= 0 || inputs.payoutRate > 50)) {
    errors.push('Payout rate must be between 0 and 50 percent');
  }

  if (!inputs.trustTerm || inputs.trustTerm < 1 || inputs.trustTerm > 100) {
    errors.push('Trust term must be between 1 and 100 years');
  }

  if (!inputs.trustType || !['charitable_remainder_annuity_trust', 'charitable_remainder_unitrust'].includes(inputs.trustType)) {
    errors.push('Please select a valid trust type');
  }

  // Asset Information Validation
  if (!inputs.fairMarketValue || inputs.fairMarketValue <= 0) {
    errors.push('Fair market value must be greater than 0');
  }

  if (inputs.costBasis !== undefined && inputs.costBasis < 0) {
    errors.push('Cost basis cannot be negative');
  }

  if (inputs.fairMarketValue < inputs.costBasis) {
    errors.push('Fair market value cannot be less than cost basis');
  }

  if (!inputs.assetType || !['cash', 'securities', 'real_estate', 'business_interests', 'other_appreciated_property'].includes(inputs.assetType)) {
    errors.push('Please select a valid asset type');
  }

  // Tax Information Validation
  if (inputs.marginalTaxRate !== undefined && (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50)) {
    errors.push('Marginal tax rate must be between 0 and 50 percent');
  }

  if (inputs.stateTaxRate !== undefined && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 40)) {
    errors.push('State tax rate must be between 0 and 40 percent');
  }

  if (inputs.capitalGainsTaxRate !== undefined && (inputs.capitalGainsTaxRate < 0 || inputs.capitalGainsTaxRate > 50)) {
    errors.push('Capital gains tax rate must be between 0 and 50 percent');
  }

  // Financial Information Validation
  if (inputs.expectedReturn !== undefined && (inputs.expectedReturn < -20 || inputs.expectedReturn > 30)) {
    errors.push('Expected return must be between -20% and 30%');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.discountRate !== undefined && (inputs.discountRate < 0 || inputs.discountRate > 20)) {
    errors.push('Discount rate must be between 0 and 20 percent');
  }

  // Trust Administration Validation
  if (inputs.trusteeFees !== undefined && (inputs.trusteeFees < 0 || inputs.trusteeFees > 5)) {
    errors.push('Trustee fees must be between 0 and 5 percent');
  }

  if (inputs.administrativeCosts !== undefined && inputs.administrativeCosts < 0) {
    errors.push('Administrative costs cannot be negative');
  }

  if (inputs.taxPreparationFees !== undefined && inputs.taxPreparationFees < 0) {
    errors.push('Tax preparation fees cannot be negative');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.survivorBenefit && (!inputs.survivorAge || inputs.survivorAge < 0 || inputs.survivorAge > 120)) {
    errors.push('Survivor age must be between 0 and 120');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCharitableRemainderTrustBusinessRules(inputs: CharitableRemainderTrustInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.donorAge && inputs.donorAge >= 70) {
    warnings.push('Age 70½+ may trigger Required Minimum Distributions - consider tax implications');
  }

  if (inputs.payoutRate && inputs.payoutRate < 5) {
    warnings.push('Low payout rate may result in modest income relative to trust value');
  }

  if (inputs.payoutRate && inputs.payoutRate > 10) {
    warnings.push('High payout rate may reduce long-term trust growth');
  }

  if (inputs.trustValue && inputs.trustValue < 100000) {
    warnings.push('Small trust values may have limited tax benefits and administrative costs may be disproportionate');
  }

  if (inputs.trustValue && inputs.trustValue > 5000000) {
    warnings.push('Large trust values may require special tax considerations and professional management');
  }

  if (inputs.fairMarketValue && inputs.costBasis && (inputs.fairMarketValue - inputs.costBasis) > 1000000) {
    warnings.push('Large capital gains may result in significant tax implications and require careful planning');
  }

  if (inputs.marginalTaxRate && inputs.marginalTaxRate > 35) {
    warnings.push('High marginal tax rate maximizes tax benefits of charitable deduction');
  }

  if (inputs.expectedReturn && inputs.expectedReturn < 4) {
    warnings.push('Low expected return may make alternative investments more attractive');
  }

  if (inputs.expectedReturn && inputs.expectedReturn > 12) {
    warnings.push('High expected return assumptions may be unrealistic for trust investments');
  }

  if (inputs.inflationRate && inputs.inflationRate > 4) {
    warnings.push('High inflation may erode the real value of fixed annuity payouts');
  }

  if (inputs.discountRate && inputs.discountRate > 8) {
    warnings.push('High discount rate may undervalue long-term trust benefits');
  }

  if (inputs.analysisPeriod && inputs.analysisPeriod < 10) {
    warnings.push('Short analysis period may not capture long-term tax and charitable benefits');
  }

  if (inputs.analysisPeriod && inputs.analysisPeriod > 30) {
    warnings.push('Long analysis period increases uncertainty in projections');
  }

  if (inputs.trustTerm && inputs.trustTerm > 20) {
    warnings.push('Long trust terms may reduce the present value of charitable remainder');
  }

  if (inputs.trusteeFees && inputs.trusteeFees > 1) {
    warnings.push('High trustee fees may significantly reduce net payouts');
  }

  if (inputs.administrativeCosts && inputs.administrativeCosts > 5000) {
    warnings.push('High administrative costs may reduce trust efficiency');
  }

  if (inputs.assetType === 'real_estate' || inputs.assetType === 'business_interests') {
    warnings.push('Complex assets may require special trust administration and valuation considerations');
  }

  if (inputs.stateTaxRate && inputs.stateTaxRate > 8) {
    warnings.push('High state tax rate may reduce overall tax benefits');
  }

  if (inputs.donorAge && inputs.lifeExpectancy && (inputs.lifeExpectancy - inputs.donorAge) < 10) {
    warnings.push('Short life expectancy may limit total trust payouts received');
  }

  if (inputs.donorAge && inputs.lifeExpectancy && (inputs.lifeExpectancy - inputs.donorAge) > 30) {
    warnings.push('Long life expectancy may result in lower periodic payouts');
  }

  if (inputs.trustType === 'charitable_remainder_unitrust') {
    warnings.push('Unitrust payouts fluctuate with trust value - consider volatility tolerance');
  }

  if (inputs.survivorBenefit) {
    warnings.push('Survivor benefits may reduce initial payout amounts');
  }

  if (inputs.remainderBeneficiary === '') {
    warnings.push('Specify remainder beneficiary to ensure charitable intent is clear');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}