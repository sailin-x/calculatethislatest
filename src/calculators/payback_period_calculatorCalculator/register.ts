import { calculatorRegistry } from '../../data/calculatorRegistry';
import { payback_period_calculatorCalculatorCalculator } from './payback_period_calculatorCalculatorCalculator';

export function registerpayback_period_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new payback_period_calculatorCalculatorCalculator());
}
