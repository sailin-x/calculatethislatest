import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LifeSettlementValueCalculator } from './LifeSettlementValueCalculator';

export function registerLifeSettlementValueCalculator(): void {
  calculatorRegistry.register(LifeSettlementValueCalculator);
}

export { LifeSettlementValueCalculator };
