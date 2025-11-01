import { OpportunityZoneInputs } from './types';

export function validateOpportunityZoneInputs(inputs: OpportunityZoneInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate investment amount
  if (!inputs.initialInvestment || inputs.initialInvestment <= 0) {
    errors.push({ field: 'initialInvestment', message: 'Initial investment must be greater than 0' });
  }
  if (inputs.initialInvestment && inputs.initialInvestment > 10000000) {
    errors.push({ field: 'initialInvestment', message: 'Initial investment cannot exceed $10,000,000' });
  }

  // Validate dates
  if (!inputs.investmentDate) {
    errors.push({ field: 'investmentDate', message: 'Investment date is required' });
  }

  // Validate holding period
  if (!inputs.holdingPeriodYears || inputs.holdingPeriodYears <= 0) {
    errors.push({ field: 'holdingPeriodYears', message: 'Holding period must be greater than 0 years' });
  }
  if (inputs.holdingPeriodYears && inputs.holdingPeriodYears > 30) {
    errors.push({ field: 'holdingPeriodYears', message: 'Holding period cannot exceed 30 years' });
  }

  // Validate tax rates
  if (inputs.capitalGainsTaxRate === undefined || inputs.capitalGainsTaxRate < 0) {
    errors.push({ field: 'capitalGainsTaxRate', message: 'Capital gains tax rate cannot be negative' });
  }
  if (inputs.capitalGainsTaxRate && inputs.capitalGainsTaxRate > 50) {
    errors.push({ field: 'capitalGainsTaxRate', message: 'Capital gains tax rate seems unusually high (>50%)' });
  }

  if (inputs.ordinaryIncomeTaxRate === undefined || inputs.ordinaryIncomeTaxRate < 0) {
    errors.push({ field: 'ordinaryIncomeTaxRate', message: 'Ordinary income tax rate cannot be negative' });
  }
  if (inputs.ordinaryIncomeTaxRate && inputs.ordinaryIncomeTaxRate > 50) {
    errors.push({ field: 'ordinaryIncomeTaxRate', message: 'Ordinary income tax rate seems unusually high (>50%)' });
  }

  // Validate appreciation and income rates
  if (inputs.expectedAnnualAppreciation === undefined || inputs.expectedAnnualAppreciation < -50) {
    errors.push({ field: 'expectedAnnualAppreciation', message: 'Expected annual appreciation cannot be less than -50%' });
  }
  if (inputs.expectedAnnualAppreciation && inputs.expectedAnnualAppreciation > 100) {
    errors.push({ field: 'expectedAnnualAppreciation', message: 'Expected annual appreciation seems unusually high (>100%)' });
  }

  if (inputs.expectedAnnualIncome === undefined || inputs.expectedAnnualIncome < 0) {
    errors.push({ field: 'expectedAnnualIncome', message: 'Expected annual income cannot be negative' });
  }

  // Validate capital gain amount
  if (inputs.capitalGainAmount === undefined || inputs.capitalGainAmount < 0) {
    errors.push({ field: 'capitalGainAmount', message: 'Capital gain amount cannot be negative' });
  }

  // Validate deferral period
  if (!inputs.deferralPeriodYears || inputs.deferralPeriodYears <= 0) {
    errors.push({ field: 'deferralPeriodYears', message: 'Deferral period must be greater than 0 years' });
  }
  if (inputs.deferralPeriodYears && inputs.deferralPeriodYears > 10) {
    errors.push({ field: 'deferralPeriodYears', message: 'Deferral period cannot exceed 10 years' });
  }

  // Validate step-up percentage
  if (inputs.stepUpPercentage === undefined || inputs.stepUpPercentage < 0) {
    errors.push({ field: 'stepUpPercentage', message: 'Step-up percentage cannot be negative' });
  }
  if (inputs.stepUpPercentage && inputs.stepUpPercentage > 20) {
    errors.push({ field: 'stepUpPercentage', message: 'Step-up percentage seems unusually high (>20%)' });
  }

  // Validate exit year
  if (!inputs.exitYear || inputs.exitYear <= 0) {
    errors.push({ field: 'exitYear', message: 'Exit year must be greater than 0' });
  }

  // Validate exit multiple
  if (!inputs.exitMultiple || inputs.exitMultiple <= 0) {
    errors.push({ field: 'exitMultiple', message: 'Exit multiple must be greater than 0' });
  }
  if (inputs.exitMultiple && inputs.exitMultiple > 10) {
    errors.push({ field: 'exitMultiple', message: 'Exit multiple seems unusually high (>10x)' });
  }

  // Validate leverage
  if (inputs.leveragePercentage === undefined || inputs.leveragePercentage < 0) {
    errors.push({ field: 'leveragePercentage', message: 'Leverage percentage cannot be negative' });
  }
  if (inputs.leveragePercentage && inputs.leveragePercentage > 90) {
    errors.push({ field: 'leveragePercentage', message: 'Leverage percentage cannot exceed 90%' });
  }

  // Validate interest rate
  if (inputs.interestRate === undefined || inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate && inputs.interestRate > 25) {
    errors.push({ field: 'interestRate', message: 'Interest rate seems unusually high (>25%)' });
  }

  // Validate risk-adjusted discount rate
  if (!inputs.riskAdjustedDiscountRate || inputs.riskAdjustedDiscountRate <= 0) {
    errors.push({ field: 'riskAdjustedDiscountRate', message: 'Risk-adjusted discount rate must be greater than 0' });
  }
  if (inputs.riskAdjustedDiscountRate && inputs.riskAdjustedDiscountRate > 50) {
    errors.push({ field: 'riskAdjustedDiscountRate', message: 'Risk-adjusted discount rate seems unusually high (>50%)' });
  }

  return errors;
}

export function validateOpportunityZoneBusinessRules(inputs: OpportunityZoneInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.holdingPeriodYears < 5) {
    warnings.push({
      field: 'holdingPeriodYears',
      message: 'Holding period less than 5 years will not qualify for step-up benefits'
    });
  }

  if (inputs.holdingPeriodYears >= 5 && inputs.holdingPeriodYears < 7) {
    warnings.push({
      field: 'holdingPeriodYears',
      message: 'Consider extending to 7 years for additional 5% step-up benefit'
    });
  }

  if (inputs.holdingPeriodYears >= 7 && inputs.holdingPeriodYears < 10) {
    warnings.push({
      field: 'holdingPeriodYears',
      message: 'Consider holding to 10 years for complete tax exclusion'
    });
  }

  if (inputs.leveragePercentage > 75) {
    warnings.push({
      field: 'leveragePercentage',
      message: 'High leverage increases risk - ensure debt service coverage'
    });
  }

  if (inputs.expectedAnnualAppreciation < 3) {
    warnings.push({
      field: 'expectedAnnualAppreciation',
      message: 'Low expected appreciation may not justify Opportunity Zone benefits'
    });
  }

  if (inputs.capitalGainsTaxRate < 15) {
    warnings.push({
      field: 'capitalGainsTaxRate',
      message: 'Low capital gains tax rate reduces the value of tax deferral benefits'
    });
  }

  if (inputs.deferralPeriodYears > 7) {
    warnings.push({
      field: 'deferralPeriodYears',
      message: 'Long deferral periods may not be optimal - consider tax planning strategies'
    });
  }

  return warnings;
}