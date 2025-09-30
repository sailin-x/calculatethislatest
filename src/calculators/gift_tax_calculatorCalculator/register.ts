import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gift_tax_calculatorCalculatorCalculator } from './gift_tax_calculatorCalculatorCalculator';

export function registergift_tax_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new gift_tax_calculatorCalculatorCalculator());
}
