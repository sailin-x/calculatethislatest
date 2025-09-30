import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGiftTaxCalculatorCalculator } from './registerGiftTaxCalculatorCalculator';

export function registerregisterGiftTaxCalculatorCalculator(): void {
  calculatorRegistry.register(new registerGiftTaxCalculatorCalculator());
}
