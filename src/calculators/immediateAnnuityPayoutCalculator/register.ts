import { calculatorRegistry } from '../../data/calculatorRegistry';
import { immediateAnnuityPayoutCalculatorCalculator } from './immediateAnnuityPayoutCalculatorCalculator';

export function registerimmediateAnnuityPayoutCalculatorCalculator(): void {
  calculatorRegistry.register(new immediateAnnuityPayoutCalculatorCalculator());
}
