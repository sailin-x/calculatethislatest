import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCorporateBondCalculatorCalculator } from './registerCorporateBondCalculatorCalculator';

export function registerregisterCorporateBondCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCorporateBondCalculatorCalculator());
}
