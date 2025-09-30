import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCorrelationCalculatorCalculator } from './registerCorrelationCalculatorCalculator';

export function registerregisterCorrelationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCorrelationCalculatorCalculator());
}
