import { calculatorRegistry } from '../../data/calculatorRegistry';
import { daily_calorie_calculatorCalculatorCalculator } from './daily_calorie_calculatorCalculatorCalculator';

export function registerdaily_calorie_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new daily_calorie_calculatorCalculatorCalculator());
}
