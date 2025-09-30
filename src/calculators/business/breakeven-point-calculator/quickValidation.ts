import { BreakevenPointCalculatorInputs } from './types';

// Field-level validation functions for breakeven analysis
export function quickValidateFixedCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Fixed costs are required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Fixed costs must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Fixed costs cannot be negative' };
  }
  if (value > 100000000) { // $100M limit
    return { isValid: false, message: 'Fixed costs seem unusually high' };
  }
  return { isValid: true };
}

export function quickValidateVariableCostPerUnit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Variable cost per unit is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Variable cost per unit must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Variable cost per unit cannot be negative' };
  }
  if (allInputs?.sellingPricePerUnit && value >= allInputs.sellingPricePerUnit) {
    return { isValid: false, message: 'Variable cost cannot exceed selling price' };
  }
  return { isValid: true };
}

export function quickValidateSellingPricePerUnit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Selling price per unit is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Selling price per unit must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Selling price per unit must be greater than zero' };
  }
  if (allInputs?.variableCostPerUnit && value <= allInputs.variableCostPerUnit) {
    return { isValid: false, message: 'Selling price must exceed variable cost' };
  }
  return { isValid: true };
}

export function quickValidateTargetProfit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Target profit must be a valid number' };
  }
  // Target profit can be negative (for planning purposes)
  return { isValid: true };
}
