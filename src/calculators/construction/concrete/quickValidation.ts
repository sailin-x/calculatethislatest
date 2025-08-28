import { ConcreteInputs } from './types';

export function validateLength(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Length must be non-negative';
  if (value > 1000) return 'Length seems unusually high';
  return null;
}

export function validateWidth(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Width must be non-negative';
  if (value > 1000) return 'Width seems unusually high';
  return null;
}

export function validateHeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Height must be non-negative';
  if (value > 100) return 'Height seems unusually high';
  return null;
}

export function validateThickness(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Thickness must be non-negative';
  if (value > 50) return 'Thickness seems unusually high';
  return null;
}

export function validateConcreteStrength(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Concrete strength must be non-negative';
  if (value > 100) return 'Concrete strength seems unusually high';
  return null;
}

export function validateReinforcementRatio(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Reinforcement ratio must be non-negative';
  if (value > 1) return 'Reinforcement ratio cannot exceed 100%';
  return null;
}

export function validateLoad(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Load must be non-negative';
  if (value > 1000000) return 'Load seems unusually high';
  return null;
}

export function validateSafetyFactor(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Safety factor must be at least 1';
  if (value > 10) return 'Safety factor seems unusually high';
  return null;
}

export function validateCostPerCubicMeter(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Cost per cubic meter must be non-negative';
  if (value > 10000) return 'Cost per cubic meter seems unusually high';
  return null;
}

export function validateLaborCost(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Labor cost must be non-negative';
  if (value > 1000000) return 'Labor cost seems unusually high';
  return null;
}
