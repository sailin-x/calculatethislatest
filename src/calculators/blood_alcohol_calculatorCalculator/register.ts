import { calculatorRegistry } from '../../data/calculatorRegistry';
import { blood_alcohol_calculatorCalculatorCalculator } from './blood_alcohol_calculatorCalculatorCalculator';

export function registerblood_alcohol_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new blood_alcohol_calculatorCalculatorCalculator());
}
