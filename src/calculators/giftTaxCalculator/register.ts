import { calculatorRegistry } from '../../data/calculatorRegistry';
import { GiftTaxCalculatorCalculator } from './GiftTaxCalculatorCalculator';

export function registerGiftTaxCalculatorCalculator(): void {
  calculatorRegistry.register(new GiftTaxCalculatorCalculator());
}
