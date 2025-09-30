import { calculatorRegistry } from '../../data/calculatorRegistry';
import { prescription_cost_calculatorCalculatorCalculator } from './prescription_cost_calculatorCalculatorCalculator';

export function registerprescription_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new prescription_cost_calculatorCalculatorCalculator());
}
