import { calculatorRegistry } from '../../data/calculatorRegistry';
import { grantorRetainedAnnuityTrustGratCalculator } from './GrantorRetainedAnnuityTrustGratCalculator';

export function registerGrantorRetainedAnnuityTrustGratCalculator(): void {
  calculatorRegistry.register(grantorRetainedAnnuityTrustGratCalculator);
}
