import { calculatorRegistry } from '../../data/calculatorRegistry';
import { catastrophe_bond_pricing_modelCalculator } from './catastrophe_bond_pricing_modelCalculator';

export function registercatastrophe_bond_pricing_modelCalculator(): void {
  calculatorRegistry.register(new catastrophe_bond_pricing_modelCalculator());
}
