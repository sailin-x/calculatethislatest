import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CorporateBondCalculatorCalculator } from './CorporateBondCalculatorCalculator';

export function registerCorporateBondCalculatorCalculator(): void {
  calculatorRegistry.register(new CorporateBondCalculatorCalculator());
}
