import { calculatorRegistry } from '../../data/calculatorRegistry';
import { life_insurance_needs_calculatorCalculatorCalculator } from './life_insurance_needs_calculatorCalculatorCalculator';

export function registerlife_insurance_needs_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new life_insurance_needs_calculatorCalculatorCalculator());
}
