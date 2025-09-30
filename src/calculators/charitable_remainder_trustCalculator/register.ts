import { calculatorRegistry } from '../../data/calculatorRegistry';
import { charitable_remainder_trustCalculatorCalculator } from './charitable_remainder_trustCalculatorCalculator';

export function registercharitable_remainder_trustCalculatorCalculator(): void {
  calculatorRegistry.register(new charitable_remainder_trustCalculatorCalculator());
}
