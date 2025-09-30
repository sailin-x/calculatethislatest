import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAnnuityBuyoutCalculatorCalculator } from './registerAnnuityBuyoutCalculatorCalculator';

export function registerregisterAnnuityBuyoutCalculatorCalculator(): void {
  calculatorRegistry.register(new registerAnnuityBuyoutCalculatorCalculator());
}
