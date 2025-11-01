import { MortgageVsRentInputs } from './types';

export function validateMortgageVsRentInputs(inputs: MortgageVsRentInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }
  if (inputs.propertyValue && inputs.propertyValue > 10000000) {
    errors.push({ field: 'propertyValue', message: 'Property value cannot exceed $10,000,000' });
  }

  // Down payment validation
  if (inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }
  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment >= inputs.propertyValue) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be greater than or equal to property value' });
  }

  // Loan term validation
  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be greater than 0 years' });
  }
  if (inputs.loanTerm && inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Interest rate validation
  if (inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate > 30) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 30%' });
  }

  // Rent validation
  if (!inputs.monthlyRent || inputs.monthlyRent <= 0) {
    errors.push({ field: 'monthlyRent', message: 'Monthly rent must be greater than 0' });
  }

  // Rent increase validation
  if (inputs.annualRentIncrease < -10 || inputs.annualRentIncrease > 20) {
    errors.push({ field: 'annualRentIncrease', message: 'Annual rent increase must be between -10% and 20%' });
  }

  // Cost validation
  if (inputs.annualPropertyTaxes < 0) {
    errors.push({ field: 'annualPropertyTaxes', message: 'Annual property taxes cannot be negative' });
  }

  if (inputs.annualHomeownersInsurance < 0) {
    errors.push({ field: 'annualHomeownersInsurance', message: 'Annual homeowners insurance cannot be negative' });
  }

  if (inputs.monthlyHOAFees < 0) {
    errors.push({ field: 'monthlyHOAFees', message: 'Monthly HOA fees cannot be negative' });
  }

  if (inputs.annualMaintenance < 0 || inputs.annualMaintenance > 10) {
    errors.push({ field: 'annualMaintenance', message: 'Annual maintenance must be between 0% and 10% of property value' });
  }

  if (inputs.closingCosts < 0) {
    errors.push({ field: 'closingCosts', message: 'Closing costs cannot be negative' });
  }

  // Investment return validation
  if (inputs.expectedHomeAppreciation < -10 || inputs.expectedHomeAppreciation > 30) {
    errors.push({ field: 'expectedHomeAppreciation', message: 'Expected home appreciation must be between -10% and 30%' });
  }

  if (inputs.alternativeInvestmentReturn < -10 || inputs.alternativeInvestmentReturn > 50) {
    errors.push({ field: 'alternativeInvestmentReturn', message: 'Alternative investment return must be between -10% and 50%' });
  }

  // Tax rate validation
  if (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50) {
    errors.push({ field: 'marginalTaxRate', message: 'Marginal tax rate must be between 0% and 50%' });
  }

  // Time period validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period must be greater than 0 years' });
  }
  if (inputs.analysisPeriod && inputs.analysisPeriod > 50) {
    errors.push({ field: 'analysisPeriod', message: 'Analysis period cannot exceed 50 years' });
  }

  // Additional costs validation
  if (inputs.oneTimeMovingCosts < 0) {
    errors.push({ field: 'oneTimeMovingCosts', message: 'One-time moving costs cannot be negative' });
  }

  if (inputs.rentDeposit < 0) {
    errors.push({ field: 'rentDeposit', message: 'Rent deposit cannot be negative' });
  }

  if (inputs.mortgagePoints < 0) {
    errors.push({ field: 'mortgagePoints', message: 'Mortgage points cannot be negative' });
  }

  if (inputs.mortgageOriginationFees < 0) {
    errors.push({ field: 'mortgageOriginationFees', message: 'Mortgage origination fees cannot be negative' });
  }

  return errors;
}

export function validateMortgageVsRentBusinessRules(inputs: MortgageVsRentInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Down payment percentage warning
  if (inputs.downPayment && inputs.propertyValue) {
    const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
    if (downPaymentPercent < 3) {
      warnings.push({ field: 'downPayment', message: 'Down payment below 3% may require PMI and affect qualification' });
    }
  }

  // Rent vs mortgage payment comparison
  const loanAmount = inputs.propertyValue - inputs.downPayment;
  const monthlyMortgage = loanAmount > 0 ?
    loanAmount * (inputs.interestRate / 100 / 12 * Math.pow(1 + inputs.interestRate / 100 / 12, inputs.loanTerm * 12)) /
    (Math.pow(1 + inputs.interestRate / 100 / 12, inputs.loanTerm * 12) - 1) : 0;

  const monthlyOwnershipCost = monthlyMortgage +
    inputs.annualPropertyTaxes / 12 +
    inputs.annualHomeownersInsurance / 12 +
    inputs.monthlyHOAFees +
    (inputs.annualMaintenance / 100 * inputs.propertyValue) / 12;

  if (monthlyOwnershipCost > inputs.monthlyRent * 1.3) {
    warnings.push({ field: 'monthlyRent', message: 'Monthly ownership costs significantly higher than rent - consider affordability' });
  }

  // Short analysis period warning
  if (inputs.analysisPeriod < 3) {
    warnings.push({ field: 'analysisPeriod', message: 'Short analysis period may not capture long-term benefits of homeownership' });
  }

  // High maintenance costs warning
  if (inputs.annualMaintenance > 2) {
    warnings.push({ field: 'annualMaintenance', message: 'High maintenance costs may reduce ownership benefits' });
  }

  // High rent increase warning
  if (inputs.annualRentIncrease > 5) {
    warnings.push({ field: 'annualRentIncrease', message: 'High rent increases may make ownership more attractive over time' });
  }

  // Low appreciation warning
  if (inputs.expectedHomeAppreciation < 2) {
    warnings.push({ field: 'expectedHomeAppreciation', message: 'Low expected appreciation may favor renting over buying' });
  }

  // High closing costs warning
  if (inputs.closingCosts > inputs.propertyValue * 0.03) {
    warnings.push({ field: 'closingCosts', message: 'Closing costs exceed 3% of property value - shop around for better terms' });
  }

  // Tax benefit consideration
  if (inputs.marginalTaxRate < 15) {
    warnings.push({ field: 'marginalTaxRate', message: 'Low tax rate reduces tax benefits of homeownership' });
  }

  // Investment return comparison
  if (inputs.alternativeInvestmentReturn > inputs.expectedHomeAppreciation + 5) {
    warnings.push({ field: 'alternativeInvestmentReturn', message: 'Alternative investments may outperform home appreciation' });
  }

  // Break-even analysis warning
  const upfrontCosts = inputs.closingCosts + inputs.mortgagePoints + inputs.mortgageOriginationFees +
                      inputs.oneTimeMovingCosts - inputs.rentDeposit;
  const monthlySavings = Math.max(0, inputs.monthlyRent - monthlyOwnershipCost);

  if (monthlySavings > 0) {
    const breakEvenYears = upfrontCosts / (monthlySavings * 12);
    if (breakEvenYears > inputs.analysisPeriod) {
      warnings.push({ field: 'analysisPeriod', message: `Break-even period (${breakEvenYears.toFixed(1)} years) exceeds analysis timeframe` });
    }
  }

  // Market condition warnings
  if (inputs.expectedHomeAppreciation < 0) {
    warnings.push({ field: 'expectedHomeAppreciation', message: 'Expected depreciation may make renting more attractive' });
  }

  // Moving costs consideration
  if (inputs.oneTimeMovingCosts > inputs.propertyValue * 0.01) {
    warnings.push({ field: 'oneTimeMovingCosts', message: 'High moving costs may impact break-even analysis' });
  }

  return warnings;
}