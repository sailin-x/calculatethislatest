import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RetirementAbroadCalculatorCalculator } from './RetirementAbroadCalculatorCalculator';

export function registerRetirementAbroadCalculatorCalculator(): void {
  calculatorRegistry.register(new RetirementAbroadCalculatorCalculator());
}
