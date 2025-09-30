import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roth_conversion_tax_calculatorCalculatorCalculator } from './roth_conversion_tax_calculatorCalculatorCalculator';

export function registerroth_conversion_tax_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new roth_conversion_tax_calculatorCalculatorCalculator());
}
