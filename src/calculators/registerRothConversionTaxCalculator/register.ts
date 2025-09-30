import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRothConversionTaxCalculatorCalculator } from './registerRothConversionTaxCalculatorCalculator';

export function registerregisterRothConversionTaxCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRothConversionTaxCalculatorCalculator());
}
