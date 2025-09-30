import { calculatorRegistry } from '../../data/calculatorRegistry';
import { annuity_calculatorCalculatorCalculator } from './annuity_calculatorCalculatorCalculator';

export function registerannuity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new annuity_calculatorCalculatorCalculator());
}
