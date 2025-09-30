import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRetirementCalculatorCalculator } from './registerRetirementCalculatorCalculator';

export function registerregisterRetirementCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRetirementCalculatorCalculator());
}
