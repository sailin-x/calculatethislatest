import { BreakevenPointCalculatorInputs } from './types';

export function validateBreakevenPointCalculatorInputs(inputs: BreakevenPointCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Required fields validation
  if (inputs.fixedCosts === undefined || inputs.fixedCosts === null) {
    errors.push({ field: 'fixedCosts', message: 'Fixed costs are required' });
  }
  if (inputs.variableCostPerUnit === undefined || inputs.variableCostPerUnit === null) {
    errors.push({ field: 'variableCostPerUnit', message: 'Variable cost per unit is required' });
  }
  if (inputs.sellingPricePerUnit === undefined || inputs.sellingPricePerUnit === null) {
    errors.push({ field: 'sellingPricePerUnit', message: 'Selling price per unit is required' });
  }

  // Numeric validation
  if (typeof inputs.fixedCosts === 'number' && (isNaN(inputs.fixedCosts) || !isFinite(inputs.fixedCosts))) {
    errors.push({ field: 'fixedCosts', message: 'Fixed costs must be a valid number' });
  }
  if (typeof inputs.variableCostPerUnit === 'number' && (isNaN(inputs.variableCostPerUnit) || !isFinite(inputs.variableCostPerUnit))) {
    errors.push({ field: 'variableCostPerUnit', message: 'Variable cost per unit must be a valid number' });
  }
  if (typeof inputs.sellingPricePerUnit === 'number' && (isNaN(inputs.sellingPricePerUnit) || !isFinite(inputs.sellingPricePerUnit))) {
    errors.push({ field: 'sellingPricePerUnit', message: 'Selling price per unit must be a valid number' });
  }
  if (inputs.targetProfit !== undefined && typeof inputs.targetProfit === 'number' && (isNaN(inputs.targetProfit) || !isFinite(inputs.targetProfit))) {
    errors.push({ field: 'targetProfit', message: 'Target profit must be a valid number' });
  }

  // Business logic validation
  if (inputs.fixedCosts !== undefined && inputs.fixedCosts < 0) {
    errors.push({ field: 'fixedCosts', message: 'Fixed costs cannot be negative' });
  }
  if (inputs.variableCostPerUnit !== undefined && inputs.variableCostPerUnit < 0) {
    errors.push({ field: 'variableCostPerUnit', message: 'Variable cost per unit cannot be negative' });
  }
  if (inputs.sellingPricePerUnit !== undefined && inputs.sellingPricePerUnit <= 0) {
    errors.push({ field: 'sellingPricePerUnit', message: 'Selling price per unit must be greater than zero' });
  }
  if (inputs.variableCostPerUnit !== undefined && inputs.sellingPricePerUnit !== undefined && inputs.variableCostPerUnit >= inputs.sellingPricePerUnit) {
    errors.push({ field: 'variableCostPerUnit', message: 'Variable cost per unit cannot be greater than or equal to selling price per unit' });
  }

  return errors;
}

export function validateBreakevenPointCalculatorBusinessRules(inputs: BreakevenPointCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations for breakeven analysis
  if (inputs.variableCostPerUnit && inputs.sellingPricePerUnit) {
    const contributionMargin = inputs.sellingPricePerUnit - inputs.variableCostPerUnit;
    const contributionMarginRatio = contributionMargin / inputs.sellingPricePerUnit;

    if (contributionMarginRatio < 0.2) {
      warnings.push({ field: 'contributionMargin', message: 'Very low contribution margin ratio may indicate pricing issues' });
    }

    if (contributionMargin <= 0) {
      warnings.push({ field: 'profitability', message: 'Business is operating at a loss per unit sold' });
    }
  }

  if (inputs.fixedCosts && inputs.variableCostPerUnit && inputs.sellingPricePerUnit) {
    const contributionMargin = inputs.sellingPricePerUnit - inputs.variableCostPerUnit;
    const breakevenUnits = inputs.fixedCosts / contributionMargin;

    if (breakevenUnits > 10000) {
      warnings.push({ field: 'breakevenPoint', message: 'High breakeven point suggests significant business risk' });
    }
  }

  return warnings;
}
