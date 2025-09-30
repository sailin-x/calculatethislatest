import { calculatorRegistry } from '../../data/calculatorRegistry';
import { structured_settlement_payout_calculatorCalculatorCalculator } from './structured_settlement_payout_calculatorCalculatorCalculator';

export function registerstructured_settlement_payout_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new structured_settlement_payout_calculatorCalculatorCalculator());
}
