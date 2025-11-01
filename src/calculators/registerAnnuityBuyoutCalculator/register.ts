import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAnnuityBuyoutCalculator } from './registerAnnuityBuyoutCalculator';

export function registerregisterAnnuityBuyoutCalculator(): void {
  calculatorRegistry.register(new registerAnnuityBuyoutCalculator());
}
