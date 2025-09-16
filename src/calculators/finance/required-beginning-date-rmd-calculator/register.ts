import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { requiredBeginningDateRMDCalculator } from './RequiredBeginningDateRMDCalculator';

/**
 * Register the Required Beginning Date RMD Calculator
 */
export function registerRequiredBeginningDateRMDCalculator(): void {
  calculatorRegistry.register(requiredBeginningDateRMDCalculator);
}