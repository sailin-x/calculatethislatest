import { calculatorRegistry } from '../../data/calculatorRegistry';
import { net_operating_incomeCalculator } from './net_operating_incomeCalculator';

export function registernet_operating_incomeCalculator(): void {
  calculatorRegistry.register(new net_operating_incomeCalculator());
}
