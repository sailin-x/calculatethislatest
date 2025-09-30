import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 1031_exchangeCalculatorCalculator } from './1031_exchangeCalculatorCalculator';

export function register1031_exchangeCalculatorCalculator(): void {
  calculatorRegistry.register(new 1031_exchangeCalculatorCalculator());
}
