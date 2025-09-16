import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { annuityBuyoutCalculator } from './AnnuityBuyoutCalculator';

/**
 * Register the Annuity Buyout Calculator
 */
export function registerAnnuityBuyoutCalculator(): void {
  calculatorRegistry.register(annuityBuyoutCalculator);
}