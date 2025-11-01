import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bareboat_charterCalculator } from './bareboat_charterCalculator';

export function registerbareboat_charterCalculator(): void {
  calculatorRegistry.register(new bareboat_charterCalculator());
}
