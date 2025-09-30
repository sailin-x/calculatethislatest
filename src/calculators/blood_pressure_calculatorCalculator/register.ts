import { calculatorRegistry } from '../../data/calculatorRegistry';
import { blood_pressure_calculatorCalculatorCalculator } from './blood_pressure_calculatorCalculatorCalculator';

export function registerblood_pressure_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new blood_pressure_calculatorCalculatorCalculator());
}
