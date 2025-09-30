import { calculatorRegistry } from '../../data/calculatorRegistry';
import { slip_and_fall_settlement_calculatorCalculatorCalculator } from './slip_and_fall_settlement_calculatorCalculatorCalculator';

export function registerslip_and_fall_settlement_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new slip_and_fall_settlement_calculatorCalculatorCalculator());
}
