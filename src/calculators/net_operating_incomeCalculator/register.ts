import { calculatorRegistry } from '../../data/calculatorRegistry';
import { net_operating_incomeCalculatorCalculator } from './net_operating_incomeCalculatorCalculator';

export function registernet_operating_incomeCalculatorCalculator(): void {
  calculatorRegistry.register(new net_operating_incomeCalculatorCalculator());
}
