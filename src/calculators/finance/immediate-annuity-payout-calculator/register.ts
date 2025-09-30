import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ImmediateAnnuityPayoutCalculator } from './ImmediateAnnuityPayoutCalculator';

export function registerImmediateAnnuityPayoutCalculator(): void {
  calculatorRegistry.register(ImmediateAnnuityPayoutCalculator);
}

export { ImmediateAnnuityPayoutCalculator };
