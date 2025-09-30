import { calculatorRegistry } from '../../data/calculatorRegistry';
import { blockchain_gas_fee_calculatorCalculatorCalculator } from './blockchain_gas_fee_calculatorCalculatorCalculator';

export function registerblockchain_gas_fee_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new blockchain_gas_fee_calculatorCalculatorCalculator());
}
