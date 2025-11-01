import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerImmediateAnnuityPayoutCalculator } from './registerImmediateAnnuityPayoutCalculator';

export function registerregisterImmediateAnnuityPayoutCalculator(): void {
  calculatorRegistry.register(new registerImmediateAnnuityPayoutCalculator());
}
