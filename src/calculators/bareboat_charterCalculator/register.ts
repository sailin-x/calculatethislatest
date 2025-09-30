import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bareboat_charterCalculatorCalculator } from './bareboat_charterCalculatorCalculator';

export function registerbareboat_charterCalculatorCalculator(): void {
  calculatorRegistry.register(new bareboat_charterCalculatorCalculator());
}
