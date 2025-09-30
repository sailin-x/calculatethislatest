import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerImmediateAnnuityPayoutCalculatorCalculator } from './registerImmediateAnnuityPayoutCalculatorCalculator';

export function registerregisterImmediateAnnuityPayoutCalculatorCalculator(): void {
  calculatorRegistry.register(new registerImmediateAnnuityPayoutCalculatorCalculator());
}
