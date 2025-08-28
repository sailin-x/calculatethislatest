import { UnitConversionInputs } from './types';

export function validateValue(value: number, allInputs?: Record<string, any>): string | null {
  if (isNaN(value)) return 'Value must be a valid number';
  if (!isFinite(value)) return 'Value must be finite';
  if (value > 1e15) return 'Value seems unusually large';
  if (value < -1e15) return 'Value seems unusually small';
  return null;
}

export function validateFromUnit(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim() === '') return 'From unit is required';
  if (value.length > 50) return 'From unit name is too long';
  return null;
}

export function validateToUnit(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim() === '') return 'To unit is required';
  if (value.length > 50) return 'To unit name is too long';
  return null;
}

export function validateCategory(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim() === '') return 'Category is required';
  const validCategories = ['length', 'area', 'volume', 'weight', 'temperature', 'pressure', 'energy', 'power', 'speed', 'time'];
  if (!validCategories.includes(value.toLowerCase())) {
    return 'Category must be one of: length, area, volume, weight, temperature, pressure, energy, power, speed, time';
  }
  return null;
}

export function validatePrecision(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Precision must be non-negative';
  if (value > 20) return 'Precision cannot exceed 20 decimal places';
  if (!Number.isInteger(value)) return 'Precision must be an integer';
  return null;
}

export function validateTemperature(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -273.15) return 'Temperature cannot be below absolute zero';
  if (value > 10000) return 'Temperature seems unusually high';
  return null;
}

export function validatePressure(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Pressure must be non-negative';
  if (value > 1e12) return 'Pressure seems unusually high';
  return null;
}

export function validateDensity(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Density must be non-negative';
  if (value > 1e6) return 'Density seems unusually high';
  return null;
}

export function validateMolecularWeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Molecular weight must be non-negative';
  if (value > 1e6) return 'Molecular weight seems unusually high';
  return null;
}
