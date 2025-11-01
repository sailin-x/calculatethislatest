import { calculatorRegistry } from '../../data/calculatorRegistry';
import { immediateAnnuityPayoutCalculator } from './immediateAnnuityPayoutCalculator';

export function registerimmediateAnnuityPayoutCalculator(): void {
  calculatorRegistry.register(new immediateAnnuityPayoutCalculator());
}
