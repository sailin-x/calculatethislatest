import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { executiveDeferredCompensationCalculator } from './ExecutiveDeferredCompensationCalculator';

/**
 * Register the Executive Deferred Compensation Calculator
 */
export function registerExecutiveDeferredCompensationCalculator(): void {
  calculatorRegistry.register(executiveDeferredCompensationCalculator);
}