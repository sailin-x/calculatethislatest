import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ViaticalSettlementValueCalculator } from './ViaticalSettlementValueCalculator';

export function registerViaticalSettlementValueCalculator(): void {
  calculatorRegistry.register(ViaticalSettlementValueCalculator);
}

export { ViaticalSettlementValueCalculator };
