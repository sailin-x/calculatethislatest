import { RetirementAbroadInputs } from './types';

export function validateRetirementAbroadInputs(inputs: RetirementAbroadInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current Annual Income Validation
  if (!inputs.currentAnnualIncome || inputs.currentAnnualIncome <= 0) {
    errors.push({ field: 'currentAnnualIncome', message: 'Current annual income must be greater than 0' });
  }
  if (inputs.currentAnnualIncome && inputs.currentAnnualIncome > 10000000) {
    errors.push({ field: 'currentAnnualIncome', message: 'Current annual income cannot exceed $10,000,000' });
  }

  // Current Annual Expenses Validation
  if (!inputs.currentAnnualExpenses || inputs.currentAnnualExpenses < 0) {
    errors.push({ field: 'currentAnnualExpenses', message: 'Current annual expenses cannot be negative' });
  }

  // Country Validation
  if (!inputs.targetCountry || inputs.targetCountry.trim() === '') {
    errors.push({ field: 'targetCountry', message: 'Target country is required' });
  }
  if (!inputs.currentCountry || inputs.currentCountry.trim() === '') {
    errors.push({ field: 'currentCountry', message: 'Current country is required' });
  }

  // Years to Retirement Validation
  if (!inputs.yearsToRetirement || inputs.yearsToRetirement < 0) {
    errors.push({ field: 'yearsToRetirement', message: 'Years to retirement cannot be negative' });
  }
  if (inputs.yearsToRetirement && inputs.yearsToRetirement > 50) {
    errors.push({ field: 'yearsToRetirement', message: 'Years to retirement cannot exceed 50' });
  }

  // Rate Validations
  if (inputs.expectedInflationRate < -5 || inputs.expectedInflationRate > 20) {
    errors.push({ field: 'expectedInflationRate', message: 'Expected inflation rate must be between -5% and 20%' });
  }
  if (inputs.expectedInvestmentReturn < -10 || inputs.expectedInvestmentReturn > 50) {
    errors.push({ field: 'expectedInvestmentReturn', message: 'Expected investment return must be between -10% and 50%' });
  }

  // Savings and Contribution Validation
  if (inputs.currentSavings < 0) {
    errors.push({ field: 'currentSavings', message: 'Current savings cannot be negative' });
  }
  if (inputs.monthlyRetirementContribution < 0) {
    errors.push({ field: 'monthlyRetirementContribution', message: 'Monthly retirement contribution cannot be negative' });
  }

  // Cost Validations
  const costFields = ['healthcareCosts', 'housingCosts', 'transportationCosts', 'foodCosts', 'entertainmentCosts'];
  costFields.forEach(field => {
    if ((inputs as any)[field] < 0) {
      errors.push({ field, message: `${field.replace('Costs', ' costs')} cannot be negative` });
    }
  });

  // Tax Rate Validation
  if (inputs.taxRate < 0 || inputs.taxRate > 100) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0% and 100%' });
  }

  // Exchange Rate Validation
  if (!inputs.exchangeRate || inputs.exchangeRate <= 0) {
    errors.push({ field: 'exchangeRate', message: 'Exchange rate must be greater than 0' });
  }

  return errors;
}

export function validateRetirementAbroadBusinessRules(inputs: RetirementAbroadInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Low Savings Warning
  if (inputs.currentSavings < inputs.currentAnnualExpenses * 2) {
    warnings.push({
      field: 'currentSavings',
      message: 'Current savings are less than 2 years of expenses. Consider building an emergency fund.'
    });
  }

  // High Inflation Expectation Warning
  if (inputs.expectedInflationRate > 10) {
    warnings.push({
      field: 'expectedInflationRate',
      message: 'High inflation rate may significantly impact retirement planning'
    });
  }

  // Unrealistic Investment Return Warning
  if (inputs.expectedInvestmentReturn > 15) {
    warnings.push({
      field: 'expectedInvestmentReturn',
      message: 'Investment returns above 15% are difficult to sustain long-term'
    });
  }

  // Short Time to Retirement Warning
  if (inputs.yearsToRetirement < 5) {
    warnings.push({
      field: 'yearsToRetirement',
      message: 'With less than 5 years to retirement, consider conservative investment strategies'
    });
  }

  // High Cost of Living Adjustment Warning
  const costOfLivingRatio = inputs.costOfLivingAdjustment;
  if (costOfLivingRatio > 2) {
    warnings.push({
      field: 'targetCountry',
      message: 'Target country has significantly higher cost of living. Ensure accurate cost estimates.'
    });
  }

  // Low Monthly Contribution Warning
  if (inputs.monthlyRetirementContribution < 500 && inputs.yearsToRetirement > 10) {
    warnings.push({
      field: 'monthlyRetirementContribution',
      message: 'Monthly contribution may be insufficient for comfortable retirement abroad'
    });
  }

  // Healthcare Cost Warning
  if (inputs.healthcareCosts < 2000) {
    warnings.push({
      field: 'healthcareCosts',
      message: 'Healthcare costs abroad may be higher than estimated. Research thoroughly.'
    });
  }

  return warnings;
}