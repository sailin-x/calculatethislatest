import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSepIRACalculatorCalculator } from './registerSepIRACalculatorCalculator';

export function registerregisterSepIRACalculatorCalculator(): void {
  calculatorRegistry.register(new registerSepIRACalculatorCalculator());
}
