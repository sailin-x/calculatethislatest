import { calculatorRegistry } from '../../data/calculatorRegistry';
import { auto_insurance_calculatorCalculatorCalculator } from './auto_insurance_calculatorCalculatorCalculator';

export function registerauto_insurance_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new auto_insurance_calculatorCalculatorCalculator());
}
