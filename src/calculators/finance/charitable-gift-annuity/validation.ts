import { CharitableGiftAnnuityInputs } from './types';

export function validateCharitableGiftAnnuityInputs(inputs: CharitableGiftAnnuityInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information Validation
  if (!inputs.donorAge || inputs.donorAge < 18 || inputs.donorAge > 100) {
    errors.push('Donor age must be between 18 and 100');
  }

  if (!inputs.annuityAge || inputs.annuityAge < inputs.donorAge || inputs.annuityAge > 100) {
    errors.push('Annuity age must be greater than or equal to donor age');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.donorAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than donor age and less than 120');
  }

  // Gift Information Validation
  if (!inputs.giftAmount || inputs.giftAmount <= 0) {
    errors.push('Gift amount must be greater than 0');
  }

  if (!inputs.fairMarketValue || inputs.fairMarketValue <= 0) {
    errors.push('Fair market value must be greater than 0');
  }

  if (inputs.costBasis !== undefined && inputs.costBasis < 0) {
    errors.push('Cost basis cannot be negative');
  }

  if (inputs.fairMarketValue < inputs.costBasis) {
    errors.push('Fair market value cannot be less than cost basis');
  }

  // Annuity Information Validation
  if (inputs.annuityRate !== undefined && (inputs.annuityRate <= 0 || inputs.annuityRate > 20)) {
    errors.push('Annuity rate must be between 0 and 20 percent');
  }

  if (!inputs.paymentFrequency || !['monthly', 'quarterly', 'semi_annual', 'annual'].includes(inputs.paymentFrequency)) {
    errors.push('Payment frequency must be valid');
  }

  if (!inputs.annuityType || !['immediate', 'deferred'].includes(inputs.annuityType)) {
    errors.push('Annuity type must be immediate or deferred');
  }

  if (inputs.annuityType === 'deferred' && (!inputs.deferralPeriod || inputs.deferralPeriod < 1 || inputs.deferralPeriod > 30)) {
    errors.push('Deferral period must be between 1 and 30 years for deferred annuities');
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

export function validateCharitableGiftAnnuityBusinessRules(inputs: CharitableGiftAnnuityInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.donorAge && inputs.donorAge >= 70) {
    warnings.push('Age 70½+ may trigger Required Minimum Distributions - consider tax implications');
  }

  if (inputs.annuityRate && inputs.annuityRate < 4) {
    warnings.push('Low annuity rate may result in modest payments relative to gift amount');
  }

  if (inputs.annuityRate && inputs.annuityRate > 8) {
    warnings.push('High annuity rate may indicate higher risk or limited availability');
  }

  if (inputs.giftAmount && inputs.giftAmount < 10000) {
    warnings.push('Small gift amounts may have limited tax benefits and annuity payments');
  }

  if (inputs.giftAmount && inputs.giftAmount > 1000000) {
    warnings.push('Large gift amounts may require special tax considerations');
  }

  if (inputs.fairMarketValue && inputs.costBasis && (inputs.fairMarketValue - inputs.costBasis) > 500000) {
    warnings.push('Large capital gains may result in significant tax implications');
  }

  if (inputs.marginalTaxRate && inputs.marginalTaxRate > 35) {
    warnings.push('High marginal tax rate maximizes tax benefits of charitable deduction');
  }

  if (inputs.expectedReturn && inputs.expectedReturn < 3) {
    warnings.push('Low expected return may make alternative investments more attractive');
  }

  if (inputs.expectedReturn && inputs.expectedReturn > 10) {
    warnings.push('High expected return assumptions may be unrealistic');
  }

  if (inputs.inflationRate && inputs.inflationRate > 4) {
    warnings.push('High inflation may erode the real value of fixed annuity payments');
  }

  if (inputs.discountRate && inputs.discountRate > 8) {
    warnings.push('High discount rate may undervalue long-term annuity benefits');
  }

  if (inputs.analysisPeriod && inputs.analysisPeriod < 10) {
    warnings.push('Short analysis period may not capture long-term tax and philanthropic benefits');
  }

  if (inputs.analysisPeriod && inputs.analysisPeriod > 30) {
    warnings.push('Long analysis period increases uncertainty in projections');
  }

  if (inputs.annuityType === 'deferred' && inputs.deferralPeriod && inputs.deferralPeriod > 10) {
    warnings.push('Long deferral periods may reduce the present value of payments');
  }

  if (inputs.charityType === 'private_foundation') {
    warnings.push('Private foundations may have different tax deduction limits');
  }

  if (inputs.survivorBenefit) {
    warnings.push('Survivor benefits may reduce initial payment amounts');
  }

  if (inputs.giftType === 'real_estate' || inputs.giftType === 'other_appreciated_property') {
    warnings.push('Appreciated property gifts may have complex tax implications');
  }

  if (inputs.stateTaxRate && inputs.stateTaxRate > 8) {
    warnings.push('High state tax rate may reduce overall tax benefits');
  }

  if (inputs.donorAge && inputs.lifeExpectancy && (inputs.lifeExpectancy - inputs.donorAge) < 10) {
    warnings.push('Short life expectancy may limit total annuity payments received');
  }

  if (inputs.donorAge && inputs.lifeExpectancy && (inputs.lifeExpectancy - inputs.donorAge) > 40) {
    warnings.push('Long life expectancy may result in lower periodic payments');
  }

  if (inputs.paymentFrequency === 'annual') {
    warnings.push('Annual payments may create cash flow challenges');
  }

  if (inputs.paymentFrequency === 'monthly') {
    warnings.push('Monthly payments may result in lower periodic amounts');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}