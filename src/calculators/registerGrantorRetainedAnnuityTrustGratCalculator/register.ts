import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGrantorRetainedAnnuityTrustGratCalculatorCalculator } from './registerGrantorRetainedAnnuityTrustGratCalculatorCalculator';

export function registerregisterGrantorRetainedAnnuityTrustGratCalculatorCalculator(): void {
  calculatorRegistry.register(new registerGrantorRetainedAnnuityTrustGratCalculatorCalculator());
}
