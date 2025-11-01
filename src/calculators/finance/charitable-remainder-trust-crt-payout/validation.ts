import { CharitableRemainderTrustInputs } from './types';

export function validateCharitableRemainderTrustInputs(inputs: CharitableRemainderTrustInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate initial contribution
  if (!inputs.initialContribution || inputs.initialContribution <= 0) {
    errors.push({ field: 'initialContribution', message: 'Initial contribution must be greater than 0' });
  }
  if (inputs.initialContribution && inputs.initialContribution > 10000000) {
    errors.push({ field: 'initialContribution', message: 'Initial contribution seems unusually high' });
  }

  // Validate trust type
  const validTrustTypes = ['charitable_remainder_annuity_trust', 'charitable_remainder_unitrust'];
  if (!inputs.trustType || !validTrustTypes.includes(inputs.trustType)) {
    errors.push({ field: 'trustType', message: 'Trust type must be annuity trust or unitrust' });
  }

  // Validate payout rate (IRC Section 664 requires 5-50% for CRTs)
  if (!inputs.payoutRate || inputs.payoutRate < 5) {
    errors.push({ field: 'payoutRate', message: 'Payout rate must be at least 5%' });
  }
  if (inputs.payoutRate && inputs.payoutRate > 50) {
    errors.push({ field: 'payoutRate', message: 'Payout rate cannot exceed 50%' });
  }

  // Validate beneficiary age
  if (!inputs.beneficiaryAge || inputs.beneficiaryAge < 18) {
    errors.push({ field: 'beneficiaryAge', message: 'Beneficiary age must be at least 18' });
  }
  if (inputs.beneficiaryAge && inputs.beneficiaryAge > 100) {
    errors.push({ field: 'beneficiaryAge', message: 'Beneficiary age cannot exceed 100' });
  }

  // Validate life expectancy
  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= 0) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy must be greater than 0' });
  }
  if (inputs.lifeExpectancy && inputs.lifeExpectancy > 50) {
    errors.push({ field: 'lifeExpectancy', message: 'Life expectancy seems unusually high' });
  }

  // Validate number of beneficiaries
  if (!inputs.numberOfBeneficiaries || inputs.numberOfBeneficiaries <= 0) {
    errors.push({ field: 'numberOfBeneficiaries', message: 'Number of beneficiaries must be at least 1' });
  }
  if (inputs.numberOfBeneficiaries && inputs.numberOfBeneficiaries > 10) {
    errors.push({ field: 'numberOfBeneficiaries', message: 'Number of beneficiaries seems unusually high' });
  }

  // Validate investment return
  if (inputs.expectedAnnualReturn === undefined || inputs.expectedAnnualReturn < -10) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected annual return cannot be less than -10%' });
  }
  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn > 30) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected annual return seems unusually high (>30%)' });
  }

  // Validate investment fees
  if (inputs.investmentFees === undefined || inputs.investmentFees < 0) {
    errors.push({ field: 'investmentFees', message: 'Investment fees cannot be negative' });
  }
  if (inputs.investmentFees && inputs.investmentFees > 5) {
    errors.push({ field: 'investmentFees', message: 'Investment fees seem unusually high (>5%)' });
  }

  // Validate tax rates
  if (inputs.currentTaxRate === undefined || inputs.currentTaxRate < 0) {
    errors.push({ field: 'currentTaxRate', message: 'Current tax rate cannot be negative' });
  }
  if (inputs.currentTaxRate && inputs.currentTaxRate > 50) {
    errors.push({ field: 'currentTaxRate', message: 'Current tax rate cannot exceed 50%' });
  }

  if (inputs.ordinaryIncomeTaxRate === undefined || inputs.ordinaryIncomeTaxRate < 0) {
    errors.push({ field: 'ordinaryIncomeTaxRate', message: 'Ordinary income tax rate cannot be negative' });
  }
  if (inputs.ordinaryIncomeTaxRate && inputs.ordinaryIncomeTaxRate > 50) {
    errors.push({ field: 'ordinaryIncomeTaxRate', message: 'Ordinary income tax rate cannot exceed 50%' });
  }

  if (inputs.charitableDeductionRate === undefined || inputs.charitableDeductionRate < 0) {
    errors.push({ field: 'charitableDeductionRate', message: 'Charitable deduction rate cannot be negative' });
  }
  if (inputs.charitableDeductionRate && inputs.charitableDeductionRate > 50) {
    errors.push({ field: 'charitableDeductionRate', message: 'Charitable deduction rate cannot exceed 50%' });
  }

  // Validate trust duration
  if (!inputs.trustDuration || inputs.trustDuration <= 0) {
    errors.push({ field: 'trustDuration', message: 'Trust duration must be greater than 0 years' });
  }
  if (inputs.trustDuration && inputs.trustDuration > 30) {
    errors.push({ field: 'trustDuration', message: 'Trust duration cannot exceed 30 years' });
  }

  // Validate remainder beneficiary
  if (!inputs.remainderBeneficiary || inputs.remainderBeneficiary.trim().length === 0) {
    errors.push({ field: 'remainderBeneficiary', message: 'Remainder beneficiary is required' });
  }

  // Validate inflation rate
  if (inputs.includeInflation && (inputs.inflationRate === undefined || inputs.inflationRate < -5)) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate cannot be less than -5%' });
  }
  if (inputs.inflationRate && inputs.inflationRate > 10) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate seems unusually high (>10%)' });
  }

  return errors;
}

export function validateCharitableRemainderTrustBusinessRules(inputs: CharitableRemainderTrustInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.payoutRate < 6) {
    warnings.push({
      field: 'payoutRate',
      message: 'Low payout rate may not provide sufficient income - consider 6-8% range'
    });
  }

  if (inputs.payoutRate > 10) {
    warnings.push({
      field: 'payoutRate',
      message: 'High payout rate may deplete trust principal over time'
    });
  }

  if (inputs.expectedAnnualReturn < 4) {
    warnings.push({
      field: 'expectedAnnualReturn',
      message: 'Low expected return may result in trust depletion with current payout rate'
    });
  }

  if (inputs.investmentFees > 1.5) {
    warnings.push({
      field: 'investmentFees',
      message: 'High fees will significantly reduce trust growth and charitable remainder'
    });
  }

  if (inputs.trustDuration > inputs.lifeExpectancy) {
    warnings.push({
      field: 'trustDuration',
      message: 'Trust duration exceeds life expectancy - consider shorter duration'
    });
  }

  if (inputs.beneficiaryAge >= 70 && inputs.beneficiaryAge < 72) {
    warnings.push({
      field: 'beneficiaryAge',
      message: 'Consider Qualified Charitable Distribution (QCD) as alternative to CRT'
    });
  }

  if (inputs.currentTaxRate < 24) {
    warnings.push({
      field: 'currentTaxRate',
      message: 'Lower tax bracket may reduce CRT tax benefits - consider other strategies'
    });
  }

  if (inputs.includeInflation && inputs.inflationRate > 3) {
    warnings.push({
      field: 'inflationRate',
      message: 'High inflation may erode purchasing power of fixed payouts'
    });
  }

  if (inputs.initialContribution < 100000) {
    warnings.push({
      field: 'initialContribution',
      message: 'Small contribution may not justify CRT complexity - consider direct donation'
    });
  }

  return warnings;
}