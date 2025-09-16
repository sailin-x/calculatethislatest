import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { grantorRetainedAnnuityTrustCalculator } from './GrantorRetainedAnnuityTrustCalculator';

/**
 * Register the Grantor Retained Annuity Trust (GRAT) Calculator
 */
export function registerGrantorRetainedAnnuityTrustCalculator(): void {
  calculatorRegistry.register(grantorRetainedAnnuityTrustCalculator);
}