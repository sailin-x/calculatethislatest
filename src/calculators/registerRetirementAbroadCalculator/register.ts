import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRetirementAbroadCalculatorCalculator } from './registerRetirementAbroadCalculatorCalculator';

export function registerregisterRetirementAbroadCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRetirementAbroadCalculatorCalculator());
}
