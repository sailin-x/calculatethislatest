import { calculatorRegistry } from '../../data/calculatorRegistry';
import { SimpleIRACalculatorCalculator } from './SimpleIRACalculatorCalculator';

export function registerSimpleIRACalculatorCalculator(): void {
  calculatorRegistry.register(new SimpleIRACalculatorCalculator());
}
