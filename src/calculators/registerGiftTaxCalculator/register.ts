import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGiftTaxCalculator } from './registerGiftTaxCalculator';

export function registerregisterGiftTaxCalculator(): void {
  calculatorRegistry.register(new registerGiftTaxCalculator());
}
