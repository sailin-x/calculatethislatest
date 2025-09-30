import { calculatorRegistry } from '../../data/calculatorRegistry';
import { GrantorRetainedAnnuityTrustGratCalculatorCalculator } from './GrantorRetainedAnnuityTrustGratCalculatorCalculator';

export function registerGrantorRetainedAnnuityTrustGratCalculatorCalculator(): void {
  calculatorRegistry.register(new GrantorRetainedAnnuityTrustGratCalculatorCalculator());
}
