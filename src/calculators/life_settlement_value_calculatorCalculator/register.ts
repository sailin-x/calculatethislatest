import { calculatorRegistry } from '../../data/calculatorRegistry';
import { life_settlement_value_calculatorCalculatorCalculator } from './life_settlement_value_calculatorCalculatorCalculator';

export function registerlife_settlement_value_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new life_settlement_value_calculatorCalculatorCalculator());
}
