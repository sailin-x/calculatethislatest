import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bond_yield_calculatorCalculatorCalculator } from './bond_yield_calculatorCalculatorCalculator';

export function registerbond_yield_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new bond_yield_calculatorCalculatorCalculator());
}
