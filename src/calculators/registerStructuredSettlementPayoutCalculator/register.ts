import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStructuredSettlementPayoutCalculator } from './registerStructuredSettlementPayoutCalculator';

export function registerregisterStructuredSettlementPayoutCalculator(): void {
  calculatorRegistry.register(new registerStructuredSettlementPayoutCalculator());
}
