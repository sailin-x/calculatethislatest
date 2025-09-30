import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fix_and_flipCalculatorCalculator } from './fix_and_flipCalculatorCalculator';

export function registerfix_and_flipCalculatorCalculator(): void {
  calculatorRegistry.register(new fix_and_flipCalculatorCalculator());
}
