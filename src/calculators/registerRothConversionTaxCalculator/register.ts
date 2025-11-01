import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRothConversionTaxCalculator } from './registerRothConversionTaxCalculator';

export function registerregisterRothConversionTaxCalculator(): void {
  calculatorRegistry.register(new registerRothConversionTaxCalculator());
}
