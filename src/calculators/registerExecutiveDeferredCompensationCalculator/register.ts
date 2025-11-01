import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerExecutiveDeferredCompensationCalculator } from './registerExecutiveDeferredCompensationCalculator';

export function registerregisterExecutiveDeferredCompensationCalculator(): void {
  calculatorRegistry.register(new registerExecutiveDeferredCompensationCalculator());
}
