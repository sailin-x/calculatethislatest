import { calculatorRegistry } from '../../data/calculatorRegistry';
import { convertible_bond_pricing_calculatorCalculatorCalculator } from './convertible_bond_pricing_calculatorCalculatorCalculator';

export function registerconvertible_bond_pricing_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new convertible_bond_pricing_calculatorCalculatorCalculator());
}
