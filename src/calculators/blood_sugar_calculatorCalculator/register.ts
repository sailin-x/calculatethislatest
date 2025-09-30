import { calculatorRegistry } from '../../data/calculatorRegistry';
import { blood_sugar_calculatorCalculatorCalculator } from './blood_sugar_calculatorCalculatorCalculator';

export function registerblood_sugar_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new blood_sugar_calculatorCalculatorCalculator());
}
