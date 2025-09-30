import { calculatorRegistry } from '../../data/calculatorRegistry';
import { net_worth_calculatorCalculatorCalculator } from './net_worth_calculatorCalculatorCalculator';

export function registernet_worth_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new net_worth_calculatorCalculatorCalculator());
}
