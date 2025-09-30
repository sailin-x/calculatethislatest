import { calculatorRegistry } from '../../data/calculatorRegistry';
import { capital_gains_calculatorCalculatorCalculator } from './capital_gains_calculatorCalculatorCalculator';

export function registercapital_gains_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new capital_gains_calculatorCalculatorCalculator());
}
