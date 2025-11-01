import { calculatorRegistry } from '../../data/calculatorRegistry';
import { giftTaxCalculator } from './GiftTaxCalculator';

export function registerGiftTaxCalculator(): void {
  calculatorRegistry.register(giftTaxCalculator);
}
