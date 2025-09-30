import { calculatorRegistry } from '../../data/calculatorRegistry';
import { renters_insurance_calculatorCalculatorCalculator } from './renters_insurance_calculatorCalculatorCalculator';

export function registerrenters_insurance_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new renters_insurance_calculatorCalculatorCalculator());
}
