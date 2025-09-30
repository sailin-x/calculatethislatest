import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fera_settlement_calculatorCalculatorCalculator } from './fera_settlement_calculatorCalculatorCalculator';

export function registerfera_settlement_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new fera_settlement_calculatorCalculatorCalculator());
}
