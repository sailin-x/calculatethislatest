import { calculatorRegistry } from '../../data/calculatorRegistry';
import { lifeSettlementValueCalculatorCalculator } from './lifeSettlementValueCalculatorCalculator';

export function registerlifeSettlementValueCalculatorCalculator(): void {
  calculatorRegistry.register(new lifeSettlementValueCalculatorCalculator());
}
