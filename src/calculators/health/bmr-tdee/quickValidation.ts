import { BMRInputs } from './types';

export function validateAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Age must be non-negative';
  if (value > 120) return 'Age seems unusually high';
  return null;
}

export function validateWeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Weight must be non-negative';
  if (value > 500) return 'Weight seems unusually high';
  return null;
}

export function validateHeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Height must be non-negative';
  if (value > 300) return 'Height seems unusually high';
  return null;
}

export function validateActivityLevel(value: string, allInputs?: Record<string, any>): string | null {
  const validLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
  if (!validLevels.includes(value)) {
    return 'Activity level must be one of: sedentary, lightly_active, moderately_active, very_active, extremely_active';
  }
  return null;
}

export function validateGender(value: string, allInputs?: Record<string, any>): string | null {
  const validGenders = ['male', 'female'];
  if (!validGenders.includes(value)) {
    return 'Gender must be either male or female';
  }
  return null;
}

export function validateBodyFatPercentage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Body fat percentage must be non-negative';
  if (value > 100) return 'Body fat percentage cannot exceed 100%';
  return null;
}

export function validateLeanBodyMass(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Lean body mass must be non-negative';
  if (allInputs && value > (allInputs.weight || 0)) {
    return 'Lean body mass cannot exceed total weight';
  }
  return null;
}

export function validateTargetWeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Target weight must be non-negative';
  if (value > 500) return 'Target weight seems unusually high';
  return null;
}

export function validateCalorieDeficit(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Calorie deficit must be non-negative';
  if (value > 2000) return 'Calorie deficit seems unusually high';
  return null;
}

export function validateCalorieSurplus(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Calorie surplus must be non-negative';
  if (value > 2000) return 'Calorie surplus seems unusually high';
  return null;
}
