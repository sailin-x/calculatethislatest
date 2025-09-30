import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerExecutiveDeferredCompensationCalculatorCalculator } from './registerExecutiveDeferredCompensationCalculatorCalculator';

export function registerregisterExecutiveDeferredCompensationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerExecutiveDeferredCompensationCalculatorCalculator());
}
