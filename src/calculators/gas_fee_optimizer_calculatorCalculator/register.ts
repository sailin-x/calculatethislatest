import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gas_fee_optimizer_calculatorCalculatorCalculator } from './gas_fee_optimizer_calculatorCalculatorCalculator';

export function registergas_fee_optimizer_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new gas_fee_optimizer_calculatorCalculatorCalculator());
}
