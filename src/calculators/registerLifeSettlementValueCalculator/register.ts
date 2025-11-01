import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerLifeSettlementValueCalculator } from './registerLifeSettlementValueCalculator';

export function registerregisterLifeSettlementValueCalculator(): void {
  calculatorRegistry.register(new registerLifeSettlementValueCalculator());
}
