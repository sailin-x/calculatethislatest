import { calculatorRegistry } from '../../data/calculatorRegistry';
import { lifeSettlementValueCalculator } from './lifeSettlementValueCalculator';

export function registerlifeSettlementValueCalculator(): void {
  calculatorRegistry.register(new lifeSettlementValueCalculator());
}
