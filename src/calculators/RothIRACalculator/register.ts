import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RothIRACalculatorCalculator } from './RothIRACalculatorCalculator';

export function registerRothIRACalculatorCalculator(): void {
  calculatorRegistry.register(new RothIRACalculatorCalculator());
}
