import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CorporateTaxShieldCalculator } from './CorporateTaxShieldCalculator';

export function registerCorporateTaxShieldCalculator(): void {
  calculatorRegistry.register(CorporateTaxShieldCalculator);
}

export { CorporateTaxShieldCalculator };
