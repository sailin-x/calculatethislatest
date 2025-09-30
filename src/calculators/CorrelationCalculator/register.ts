import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CorrelationCalculatorCalculator } from './CorrelationCalculatorCalculator';

export function registerCorrelationCalculatorCalculator(): void {
  calculatorRegistry.register(new CorrelationCalculatorCalculator());
}
