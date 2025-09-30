import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TaxCalculator } from './TaxCalculator';

export function registerTaxCalculator(): void {
  calculatorRegistry.register(TaxCalculator);
}

export { TaxCalculator };
