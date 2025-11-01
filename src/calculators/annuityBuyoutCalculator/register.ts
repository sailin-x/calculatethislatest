import { calculatorRegistry } from '../../data/calculatorRegistry';
import { annuityBuyoutCalculator } from './annuityBuyoutCalculator';

export function registerannuityBuyoutCalculator(): void {
  calculatorRegistry.register(new annuityBuyoutCalculator());
}
