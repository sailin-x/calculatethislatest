import { calculatorRegistry } from '../../data/calculatorRegistry';
import { calories_burned_calculatorCalculatorCalculator } from './calories_burned_calculatorCalculatorCalculator';

export function registercalories_burned_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new calories_burned_calculatorCalculatorCalculator());
}
