import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CorporateBondCalculator } from './CorporateBondCalculator';

export function registerCorporateBondCalculator(): void {
  calculatorRegistry.register(new CorporateBondCalculator());
}
