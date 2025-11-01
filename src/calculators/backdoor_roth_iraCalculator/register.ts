import { calculatorRegistry } from '../../data/calculatorRegistry';
import { backdoor_roth_iraCalculator } from './backdoor_roth_iraCalculator';

export function registerbackdoor_roth_iraCalculator(): void {
  calculatorRegistry.register(new backdoor_roth_iraCalculator());
}
