import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCorporateBondCalculator } from './registerCorporateBondCalculator';

export function registerregisterCorporateBondCalculator(): void {
  calculatorRegistry.register(new registerCorporateBondCalculator());
}
