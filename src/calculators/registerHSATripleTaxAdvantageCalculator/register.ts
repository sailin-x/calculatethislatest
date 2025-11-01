import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerHSATripleTaxAdvantageCalculator } from './registerHSATripleTaxAdvantageCalculator';

export function registerregisterHSATripleTaxAdvantageCalculator(): void {
  calculatorRegistry.register(new registerHSATripleTaxAdvantageCalculator());
}
