import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSimpleIRACalculatorCalculator } from './registerSimpleIRACalculatorCalculator';

export function registerregisterSimpleIRACalculatorCalculator(): void {
  calculatorRegistry.register(new registerSimpleIRACalculatorCalculator());
}
