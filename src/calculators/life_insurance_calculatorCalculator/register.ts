import { calculatorRegistry } from '../../data/calculatorRegistry';
import { life_insurance_calculatorCalculatorCalculator } from './life_insurance_calculatorCalculatorCalculator';

export function registerlife_insurance_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new life_insurance_calculatorCalculatorCalculator());
}
