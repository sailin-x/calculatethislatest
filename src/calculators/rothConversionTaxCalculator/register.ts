import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rothConversionTaxCalculatorCalculator } from './rothConversionTaxCalculatorCalculator';

export function registerrothConversionTaxCalculatorCalculator(): void {
  calculatorRegistry.register(new rothConversionTaxCalculatorCalculator());
}
