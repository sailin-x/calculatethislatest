import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StructuredSettlementPayoutCalculator } from './StructuredSettlementPayoutCalculator';

export function registerStructuredSettlementPayoutCalculator(): void {
  calculatorRegistry.register(new StructuredSettlementPayoutCalculator());
}
