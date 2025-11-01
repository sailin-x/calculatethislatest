import { TaxLossHarvestingInputs } from './types';

export function validateTaxLossHarvestingInputs(inputs: TaxLossHarvestingInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Portfolio value validation
  if (!inputs.currentPortfolioValue || inputs.currentPortfolioValue <= 0) {
    errors.push({ field: 'currentPortfolioValue', message: 'Portfolio value must be greater than 0' });
  }
  if (inputs.currentPortfolioValue && inputs.currentPortfolioValue > 100000000) {
    errors.push({ field: 'currentPortfolioValue', message: 'Portfolio value cannot exceed $100,000,000' });
  }

  // Gains and losses validation
  if (inputs.realizedGains && inputs.realizedGains < 0) {
    errors.push({ field: 'realizedGains', message: 'Realized gains cannot be negative' });
  }
  if (inputs.realizedLosses && inputs.realizedLosses < 0) {
    errors.push({ field: 'realizedLosses', message: 'Realized losses cannot be negative' });
  }
  if (inputs.shortTermGains && inputs.shortTermGains < 0) {
    errors.push({ field: 'shortTermGains', message: 'Short-term gains cannot be negative' });
  }
  if (inputs.shortTermLosses && inputs.shortTermLosses < 0) {
    errors.push({ field: 'shortTermLosses', message: 'Short-term losses cannot be negative' });
  }
  if (inputs.longTermGains && inputs.longTermGains < 0) {
    errors.push({ field: 'longTermGains', message: 'Long-term gains cannot be negative' });
  }
  if (inputs.longTermLosses && inputs.longTermLosses < 0) {
    errors.push({ field: 'longTermLosses', message: 'Long-term losses cannot be negative' });
  }

  // Tax rate validation
  if (!inputs.taxRate || inputs.taxRate < 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be 0 or greater' });
  }
  if (inputs.taxRate && inputs.taxRate > 50) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 50%' });
  }

  // Wash sale period validation
  if (inputs.washSalePeriod && inputs.washSalePeriod < 0) {
    errors.push({ field: 'washSalePeriod', message: 'Wash sale period cannot be negative' });
  }
  if (inputs.washSalePeriod && inputs.washSalePeriod > 365) {
    errors.push({ field: 'washSalePeriod', message: 'Wash sale period cannot exceed 365 days' });
  }

  // Investment horizon validation
  if (!inputs.investmentHorizon || inputs.investmentHorizon < 1) {
    errors.push({ field: 'investmentHorizon', message: 'Investment horizon must be at least 1 year' });
  }
  if (inputs.investmentHorizon && inputs.investmentHorizon > 50) {
    errors.push({ field: 'investmentHorizon', message: 'Investment horizon cannot exceed 50 years' });
  }

  // Expected return validation
  if (inputs.expectedReturn && (inputs.expectedReturn < -20 || inputs.expectedReturn > 50)) {
    errors.push({ field: 'expectedReturn', message: 'Expected return must be between -20% and 50%' });
  }

  // Volatility validation
  if (inputs.volatility && (inputs.volatility < 0 || inputs.volatility > 100)) {
    errors.push({ field: 'volatility', message: 'Volatility must be between 0% and 100%' });
  }

  // Transaction costs validation
  if (inputs.transactionCosts && inputs.transactionCosts < 0) {
    errors.push({ field: 'transactionCosts', message: 'Transaction costs cannot be negative' });
  }
  if (inputs.transactionCosts && inputs.transactionCosts > 1000) {
    errors.push({ field: 'transactionCosts', message: 'Transaction costs cannot exceed $1,000' });
  }

  // Minimum harvest amount validation
  if (!inputs.minimumHarvestAmount || inputs.minimumHarvestAmount <= 0) {
    errors.push({ field: 'minimumHarvestAmount', message: 'Minimum harvest amount must be greater than 0' });
  }
  if (inputs.minimumHarvestAmount && inputs.minimumHarvestAmount > inputs.currentPortfolioValue) {
    errors.push({ field: 'minimumHarvestAmount', message: 'Minimum harvest amount cannot exceed portfolio value' });
  }

  return errors;
}

export function validateTaxLossHarvestingBusinessRules(inputs: TaxLossHarvestingInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Net loss validation
  const netLosses = (inputs.shortTermLosses + inputs.longTermLosses) - (inputs.shortTermGains + inputs.longTermGains);
  if (netLosses <= 0) {
    warnings.push({ field: 'realizedLosses', message: 'No net losses available for harvesting' });
  }

  // Wash sale rule warnings
  if (inputs.washSalePeriod < 30) {
    warnings.push({ field: 'washSalePeriod', message: 'Wash sale period should be at least 30 days to avoid IRS violations' });
  }

  // Transaction cost warnings
  if (inputs.transactionCosts > 50) {
    warnings.push({ field: 'transactionCosts', message: 'High transaction costs may reduce harvesting benefits' });
  }

  // Volatility warnings
  if (inputs.volatility > 30) {
    warnings.push({ field: 'volatility', message: 'High volatility increases risk of harvest-and-hold strategy' });
  }

  // Investment horizon warnings
  if (inputs.investmentHorizon < 3) {
    warnings.push({ field: 'investmentHorizon', message: 'Short investment horizon may not justify harvesting costs' });
  }

  // Tax rate warnings
  if (inputs.taxRate < 10) {
    warnings.push({ field: 'taxRate', message: 'Low tax rate reduces tax-loss harvesting benefits' });
  }

  // Portfolio size warnings
  if (inputs.currentPortfolioValue < 50000) {
    warnings.push({ field: 'currentPortfolioValue', message: 'Small portfolio may have limited harvesting opportunities' });
  }

  // Harvest frequency warnings
  if (inputs.harvestFrequency === 'monthly' && inputs.minimumHarvestAmount < 1000) {
    warnings.push({ field: 'harvestFrequency', message: 'Monthly harvesting with small amounts may incur excessive transaction costs' });
  }

  // Risk tolerance warnings
  if (inputs.riskTolerance === 'conservative' && inputs.volatility > 20) {
    warnings.push({ field: 'riskTolerance', message: 'Conservative risk tolerance may not align with current market volatility' });
  }

  // Expected return warnings
  if (inputs.expectedReturn < 3) {
    warnings.push({ field: 'expectedReturn', message: 'Low expected returns may reduce harvesting effectiveness' });
  }

  return warnings;
}