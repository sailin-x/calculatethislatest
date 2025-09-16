import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { giftTaxCalculator } from './GiftTaxCalculator';

/**
 * Register the Gift Tax Calculator
 */
export function registerGiftTaxCalculator(): void {
  calculatorRegistry.register(giftTaxCalculator);
}