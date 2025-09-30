import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StructuredSettlementPayoutCalculatorCalculator } from './StructuredSettlementPayoutCalculatorCalculator';

export function registerStructuredSettlementPayoutCalculatorCalculator(): void {
  calculatorRegistry.register(new StructuredSettlementPayoutCalculatorCalculator());
}
