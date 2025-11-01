import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGrantorRetainedAnnuityTrustGratCalculator } from './registerGrantorRetainedAnnuityTrustGratCalculator';

export function registerregisterGrantorRetainedAnnuityTrustGratCalculator(): void {
  calculatorRegistry.register(new registerGrantorRetainedAnnuityTrustGratCalculator());
}
