// Calculator registry - imports and registers all calculators
import { calculatorRegistry } from '../data/calculatorRegistry';

// Import specific calculators
import { mortgageCalculator } from './finance/mortgage';

/**
 * Register all calculators with the system
 */
export function registerAllCalculators(): void {
  // Finance calculators
  calculatorRegistry.register(mortgageCalculator);
}

// Auto-register calculators when module is imported
// Ensure all imports are resolved before registration
Promise.resolve().then(() => {
  registerAllCalculators();
});
