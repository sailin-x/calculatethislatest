import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCreditDefaultSwapCalculator } from './registerCreditDefaultSwapCalculator';

export function registerregisterCreditDefaultSwapCalculator(): void {
  calculatorRegistry.register(new registerCreditDefaultSwapCalculator());
}
