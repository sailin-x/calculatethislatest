import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerIRACalculatorCalculator } from './registerIRACalculatorCalculator';

export function registerregisterIRACalculatorCalculator(): void {
  calculatorRegistry.register(new registerIRACalculatorCalculator());
}
