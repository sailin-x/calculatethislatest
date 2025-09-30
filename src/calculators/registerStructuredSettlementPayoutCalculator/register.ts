import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStructuredSettlementPayoutCalculatorCalculator } from './registerStructuredSettlementPayoutCalculatorCalculator';

export function registerregisterStructuredSettlementPayoutCalculatorCalculator(): void {
  calculatorRegistry.register(new registerStructuredSettlementPayoutCalculatorCalculator());
}
