import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRothIRACalculatorCalculator } from './registerRothIRACalculatorCalculator';

export function registerregisterRothIRACalculatorCalculator(): void {
  calculatorRegistry.register(new registerRothIRACalculatorCalculator());
}
