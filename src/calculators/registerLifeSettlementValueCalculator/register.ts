import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerLifeSettlementValueCalculatorCalculator } from './registerLifeSettlementValueCalculatorCalculator';

export function registerregisterLifeSettlementValueCalculatorCalculator(): void {
  calculatorRegistry.register(new registerLifeSettlementValueCalculatorCalculator());
}
