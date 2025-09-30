import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roundup_settlement_calculatorCalculatorCalculator } from './roundup_settlement_calculatorCalculatorCalculator';

export function registerroundup_settlement_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new roundup_settlement_calculatorCalculatorCalculator());
}
