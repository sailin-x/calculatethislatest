/**
 * Calorie Calculator Registration
 * Registers the calorie calculator with the calculator registry
 */

import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { calorieCalculator } from './CalorieCalculator';

/**
 * Register the calorie calculator
 */
export function registerCalorieCalculator(): void {
  calculatorRegistry.register(calorieCalculator);
}

/**
 * Unregister the calorie calculator
 */
export function unregisterCalorieCalculator(): boolean {
  return calculatorRegistry.unregister('calorie-calculator');
}

// Auto-register when this module is imported
registerCalorieCalculator();

export default registerCalorieCalculator;