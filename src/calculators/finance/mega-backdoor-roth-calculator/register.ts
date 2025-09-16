import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { megaBackdoorRothCalculator } from './MegaBackdoorRothCalculator';

/**
 * Register the Mega Backdoor Roth Calculator
 */
export function registerMegaBackdoorRothCalculator(): void {
  calculatorRegistry.register(megaBackdoorRothCalculator);
}