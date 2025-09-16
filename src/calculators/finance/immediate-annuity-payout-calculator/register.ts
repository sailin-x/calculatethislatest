import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { immediateAnnuityPayoutCalculator } from './ImmediateAnnuityPayoutCalculator';

/**
 * Register the Immediate Annuity Payout Calculator
 */
export function registerImmediateAnnuityPayoutCalculator(): void {
  calculatorRegistry.register(immediateAnnuityPayoutCalculator);
}