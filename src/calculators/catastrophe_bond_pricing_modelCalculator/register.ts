import { calculatorRegistry } from '../../data/calculatorRegistry';
import { catastrophe_bond_pricing_modelCalculatorCalculator } from './catastrophe_bond_pricing_modelCalculatorCalculator';

export function registercatastrophe_bond_pricing_modelCalculatorCalculator(): void {
  calculatorRegistry.register(new catastrophe_bond_pricing_modelCalculatorCalculator());
}
