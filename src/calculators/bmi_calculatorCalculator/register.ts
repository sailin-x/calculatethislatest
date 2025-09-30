import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bmi_calculatorCalculatorCalculator } from './bmi_calculatorCalculatorCalculator';

export function registerbmi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new bmi_calculatorCalculatorCalculator());
}
