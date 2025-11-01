import { CommodityInputs } from './types';

export function validateCommodityInputs(inputs: CommodityInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current Price Validation
  if (!inputs.currentPrice || inputs.currentPrice <= 0) {
    errors.push({ field: 'currentPrice', message: 'Current price must be greater than 0' });
  }
  if (inputs.currentPrice && inputs.currentPrice > 100000) {
    errors.push({ field: 'currentPrice', message: 'Current price cannot exceed $100,000' });
  }

  // Quantity Validation
  if (!inputs.quantity || inputs.quantity <= 0) {
    errors.push({ field: 'quantity', message: 'Quantity must be greater than 0' });
  }
  if (inputs.quantity && inputs.quantity > 1000000) {
    errors.push({ field: 'quantity', message: 'Quantity cannot exceed 1,000,000 units' });
  }

  // Purchase Price Validation
  if (!inputs.purchasePrice || inputs.purchasePrice <= 0) {
    errors.push({ field: 'purchasePrice', message: 'Purchase price must be greater than 0' });
  }
  if (inputs.purchasePrice && inputs.purchasePrice > 100000) {
    errors.push({ field: 'purchasePrice', message: 'Purchase price cannot exceed $100,000' });
  }

  // Leverage Ratio Validation
  if (inputs.leverageRatio && (inputs.leverageRatio < 1 || inputs.leverageRatio > 100)) {
    errors.push({ field: 'leverageRatio', message: 'Leverage ratio must be between 1 and 100' });
  }

  // Margin Requirement Validation
  if (inputs.marginRequirement && inputs.marginRequirement < 0) {
    errors.push({ field: 'marginRequirement', message: 'Margin requirement cannot be negative' });
  }
  if (inputs.marginRequirement && inputs.marginRequirement > 1000000) {
    errors.push({ field: 'marginRequirement', message: 'Margin requirement cannot exceed $1,000,000' });
  }

  // Contract Size Validation
  if (inputs.contractSize && inputs.contractSize <= 0) {
    errors.push({ field: 'contractSize', message: 'Contract size must be greater than 0' });
  }

  // Transaction Costs Validation
  if (inputs.transactionCosts && inputs.transactionCosts < 0) {
    errors.push({ field: 'transactionCosts', message: 'Transaction costs cannot be negative' });
  }

  // Storage Costs Validation
  if (inputs.storageCosts && inputs.storageCosts < 0) {
    errors.push({ field: 'storageCosts', message: 'Storage costs cannot be negative' });
  }

  // Insurance Costs Validation
  if (inputs.insuranceCosts && inputs.insuranceCosts < 0) {
    errors.push({ field: 'insuranceCosts', message: 'Insurance costs cannot be negative' });
  }

  // Holding Period Validation
  if (inputs.holdingPeriod && inputs.holdingPeriod < 0) {
    errors.push({ field: 'holdingPeriod', message: 'Holding period cannot be negative' });
  }
  if (inputs.holdingPeriod && inputs.holdingPeriod > 100) {
    errors.push({ field: 'holdingPeriod', message: 'Holding period cannot exceed 100 years' });
  }

  // Market Volatility Validation
  if (inputs.marketVolatility && (inputs.marketVolatility < 0 || inputs.marketVolatility > 5)) {
    errors.push({ field: 'marketVolatility', message: 'Market volatility must be between 0% and 500%' });
  }

  // Currency Exchange Rate Validation
  if (inputs.currencyExchangeRate && inputs.currencyExchangeRate <= 0) {
    errors.push({ field: 'currencyExchangeRate', message: 'Currency exchange rate must be greater than 0' });
  }

  // Tax Rate Validation
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 1)) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0% and 100%' });
  }

  return errors;
}

export function validateCommodityBusinessRules(inputs: CommodityInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // High leverage warning
  if (inputs.leverageRatio && inputs.leverageRatio > 10) {
    warnings.push({ field: 'leverageRatio', message: 'High leverage ratio increases risk of significant losses' });
  }

  // Low margin warning
  if (inputs.marginRequirement && inputs.leverageRatio && inputs.leverageRatio > 1) {
    const positionValue = inputs.currentPrice * inputs.quantity;
    const marginUsed = positionValue / inputs.leverageRatio;
    const marginUtilization = marginUsed / inputs.marginRequirement;
    if (marginUtilization > 0.8) {
      warnings.push({ field: 'marginRequirement', message: 'Margin utilization above 80% increases liquidation risk' });
    }
  }

  // High volatility warning
  if (inputs.marketVolatility && inputs.marketVolatility > 0.5) {
    warnings.push({ field: 'marketVolatility', message: 'High market volatility increases investment risk' });
  }

  // Long holding period warning
  if (inputs.holdingPeriod && inputs.holdingPeriod > 10) {
    warnings.push({ field: 'holdingPeriod', message: 'Long holding periods may be subject to additional costs and risks' });
  }

  // Negative return warning
  const currentValue = inputs.currentPrice * inputs.quantity;
  const costBasis = inputs.purchasePrice * inputs.quantity;
  if (currentValue < costBasis) {
    warnings.push({ field: 'currentPrice', message: 'Current position shows unrealized losses' });
  }

  return warnings;
}