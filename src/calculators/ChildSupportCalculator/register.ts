import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ChildSupportCalculatorCalculator } from './ChildSupportCalculatorCalculator';

export function registerChildSupportCalculatorCalculator(): void {
  calculatorRegistry.register(new ChildSupportCalculatorCalculator());
}
