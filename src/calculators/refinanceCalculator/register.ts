import { calculatorRegistry } from '../../data/calculatorRegistry';
import { refinanceCalculatorCalculator } from './refinanceCalculatorCalculator';

export function registerrefinanceCalculatorCalculator(): void {
  calculatorRegistry.register(new refinanceCalculatorCalculator());
}
