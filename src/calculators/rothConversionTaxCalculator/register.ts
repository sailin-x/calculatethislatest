import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rothConversionTaxCalculator } from './rothConversionTaxCalculator';

export function registerrothConversionTaxCalculator(): void {
  calculatorRegistry.register(new rothConversionTaxCalculator());
}
