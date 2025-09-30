import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FelaSettlementCalculator } from './FelaSettlementCalculator';

export function registerFelaSettlementCalculator(): void {
  calculatorRegistry.register(FelaSettlementCalculator);
}

export { FelaSettlementCalculator };
