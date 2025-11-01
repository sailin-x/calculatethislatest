import { CapitalGainsInputs } from './types';

export function validateCapitalGainsInputs(inputs: CapitalGainsInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Acquisition Price Validation
  if (!inputs.acquisitionPrice || inputs.acquisitionPrice <= 0) {
    errors.push({ field: 'acquisitionPrice', message: 'Acquisition price must be a positive number' });
  }
  if (inputs.acquisitionPrice > 10000000) {
    errors.push({ field: 'acquisitionPrice', message: 'Acquisition price cannot exceed $10,000,000' });
  }

  // Sale Price Validation
  if (!inputs.salePrice || inputs.salePrice <= 0) {
    errors.push({ field: 'salePrice', message: 'Sale price must be a positive number' });
  }
  if (inputs.salePrice > 10000000) {
    errors.push({ field: 'salePrice', message: 'Sale price cannot exceed $10,000,000' });
  }

  // Quantity Validation
  if (!inputs.quantity || inputs.quantity <= 0) {
    errors.push({ field: 'quantity', message: 'Quantity must be a positive number' });
  }
  if (inputs.quantity > 1000000) {
    errors.push({ field: 'quantity', message: 'Quantity cannot exceed 1,000,000 shares/units' });
  }

  // Date Validation
  if (!inputs.acquisitionDate) {
    errors.push({ field: 'acquisitionDate', message: 'Acquisition date is required' });
  } else {
    const acquisitionDate = new Date(inputs.acquisitionDate);
    if (isNaN(acquisitionDate.getTime())) {
      errors.push({ field: 'acquisitionDate', message: 'Acquisition date must be a valid date' });
    }
  }

  if (!inputs.saleDate) {
    errors.push({ field: 'saleDate', message: 'Sale date is required' });
  } else {
    const saleDate = new Date(inputs.saleDate);
    if (isNaN(saleDate.getTime())) {
      errors.push({ field: 'saleDate', message: 'Sale date must be a valid date' });
    }
    if (inputs.acquisitionDate) {
      const acquisitionDate = new Date(inputs.acquisitionDate);
      const saleDateObj = new Date(inputs.saleDate);
      if (saleDateObj < acquisitionDate) {
        errors.push({ field: 'saleDate', message: 'Sale date cannot be before acquisition date' });
      }
    }
  }

  // Cost Validation
  if (inputs.acquisitionCosts < 0) {
    errors.push({ field: 'acquisitionCosts', message: 'Acquisition costs cannot be negative' });
  }
  if (inputs.acquisitionCosts > inputs.acquisitionPrice * inputs.quantity) {
    errors.push({ field: 'acquisitionCosts', message: 'Acquisition costs seem unreasonably high' });
  }

  if (inputs.saleCosts < 0) {
    errors.push({ field: 'saleCosts', message: 'Sale costs cannot be negative' });
  }
  if (inputs.saleCosts > inputs.salePrice * inputs.quantity) {
    errors.push({ field: 'saleCosts', message: 'Sale costs seem unreasonably high' });
  }

  // Tax Rate Validation
  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0% and 50%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -10% and 20%' });
  }

  return errors;
}

export function validateCapitalGainsBusinessRules(inputs: CapitalGainsInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Holding Period Warnings
  const holdingDays = calculateHoldingPeriodDays(inputs);
  if (holdingDays < 30) {
    warnings.push({ field: 'saleDate', message: 'Very short holding period may trigger wash sale rules' });
  }
  if (holdingDays > 3650) { // 10 years
    warnings.push({ field: 'acquisitionDate', message: 'Very long holding period - consider estate planning implications' });
  }

  // Tax Rate Warnings
  if (inputs.taxRate > 37) {
    warnings.push({ field: 'taxRate', message: 'Very high tax rate - consider tax-efficient strategies' });
  }

  // Loss Warnings
  const netGain = calculateNetCapitalGain(inputs);
  if (netGain < -10000) {
    warnings.push({ field: 'salePrice', message: 'Large capital loss - verify transaction details and tax implications' });
  }

  // Cost Basis Warnings
  const totalCosts = inputs.acquisitionCosts + inputs.saleCosts;
  const grossGain = (inputs.salePrice - inputs.acquisitionPrice) * inputs.quantity;
  if (totalCosts > Math.abs(grossGain) * 0.5) {
    warnings.push({ field: 'acquisitionCosts', message: 'Transaction costs are unusually high relative to gain/loss' });
  }

  return warnings;
}

// Helper functions for validation
function calculateHoldingPeriodDays(inputs: CapitalGainsInputs): number {
  const acquisitionDate = new Date(inputs.acquisitionDate);
  const saleDate = new Date(inputs.saleDate);
  const timeDiff = saleDate.getTime() - acquisitionDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function calculateNetCapitalGain(inputs: CapitalGainsInputs): number {
  const grossGain = (inputs.salePrice - inputs.acquisitionPrice) * inputs.quantity;
  return grossGain - inputs.acquisitionCosts - inputs.saleCosts;
}