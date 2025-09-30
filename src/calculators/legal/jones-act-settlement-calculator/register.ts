import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { JonesActSettlementCalculator } from './JonesActSettlementCalculator';

export function registerJonesActSettlementCalculator(): void {
  calculatorRegistry.register(JonesActSettlementCalculator);
}

export { JonesActSettlementCalculator };
